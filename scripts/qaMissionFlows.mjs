import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

import { createRng } from "../src/random.js";
import { generateMapData } from "../src/generator.js";
import { generateMissionOffers, createMissionGenerationContext } from "../src/missions/missionGenerator.js";
import { materializeMissionsForCurrentContent } from "../src/missions/missionProfileAdapters.js";
import { encodeSessionCode } from "../src/sessionCode.js";
import { forest11to20Profile } from "../src/floorProfiles/forest11to20.js";

const CDP_PORT = process.env.QA_CDP_PORT || "9227";
const APP_URL = process.env.QA_APP_URL || "http://localhost:5173/megadungeon/";
const OUTPUT_DIR = resolve("tmp/mission-qa");
const CDP_ORIGIN = `http://127.0.0.1:${CDP_PORT}`;

class CdpClient {
  constructor(webSocketUrl) {
    this.id = 0;
    this.callbacks = new Map();
    this.events = [];
    this.socket = new WebSocket(webSocketUrl);
  }

  async ready() {
    if (this.socket.readyState === WebSocket.OPEN) return;
    await new Promise((resolveReady, rejectReady) => {
      this.socket.addEventListener("open", resolveReady, { once: true });
      this.socket.addEventListener("error", rejectReady, { once: true });
    });
    this.socket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      if (message.id && this.callbacks.has(message.id)) {
        const { resolveCommand, rejectCommand } = this.callbacks.get(message.id);
        this.callbacks.delete(message.id);
        if (message.error) rejectCommand(new Error(message.error.message));
        else resolveCommand(message.result || {});
        return;
      }
      this.events.push(message);
    });
  }

  async send(method, params = {}) {
    await this.ready();
    const id = ++this.id;
    const payload = JSON.stringify({ id, method, params });

    return new Promise((resolveCommand, rejectCommand) => {
      this.callbacks.set(id, { resolveCommand, rejectCommand });
      this.socket.send(payload);
    });
  }

  close() {
    this.socket.close();
  }
}

async function getPageTarget() {
  const response = await fetch(`${CDP_ORIGIN}/json/new?${encodeURIComponent(APP_URL)}`, { method: "PUT" });
  if (!response.ok) throw new Error(`Não foi possível abrir aba CDP: ${response.status}`);
  return response.json();
}

async function wait(ms) {
  await new Promise((resolveWait) => setTimeout(resolveWait, ms));
}

async function evaluate(client, expression) {
  const result = await client.send("Runtime.evaluate", {
    awaitPromise: true,
    expression,
    returnByValue: true
  });

  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.text || "Erro ao avaliar expressão no browser.");
  }

  return result.result?.value;
}

async function waitFor(client, expression, label, timeoutMs = 5000) {
  const started = Date.now();

  while (Date.now() - started < timeoutMs) {
    if (await evaluate(client, expression)) return;
    await wait(100);
  }

  throw new Error(`Timeout aguardando: ${label}`);
}

async function click(client, selector) {
  await waitFor(client, `Boolean(document.querySelector(${JSON.stringify(selector)}))`, selector);
  await evaluate(client, `
    (() => {
      const element = document.querySelector(${JSON.stringify(selector)});
      element.scrollIntoView({ block: "center", inline: "center" });
      element.click();
      return true;
    })()
  `);
  await wait(150);
}

async function clickCenter(client, selector) {
  await waitFor(client, `Boolean(document.querySelector(${JSON.stringify(selector)}))`, selector);
  const box = await evaluate(client, `
    (() => {
      const element = document.querySelector(${JSON.stringify(selector)});
      const target = element.closest?.('.node') || element;
      const rect = target.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };
    })()
  `);

  await client.send("Input.dispatchMouseEvent", {
    button: "left",
    clickCount: 1,
    type: "mousePressed",
    x: box.x,
    y: box.y
  });
  await client.send("Input.dispatchMouseEvent", {
    button: "left",
    clickCount: 1,
    type: "mouseReleased",
    x: box.x,
    y: box.y
  });
  await wait(150);
}

async function clickNodeByIndex(client, index) {
  const box = await evaluate(client, `
    (() => {
      const node = document.querySelectorAll('.node')[${index}];
      if (!node) return null;
      const rect = node.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };
    })()
  `);

  if (!box) throw new Error(`Nodo ${index} não encontrado.`);
  await client.send("Input.dispatchMouseEvent", {
    button: "left",
    clickCount: 1,
    type: "mousePressed",
    x: box.x,
    y: box.y
  });
  await client.send("Input.dispatchMouseEvent", {
    button: "left",
    clickCount: 1,
    type: "mouseReleased",
    x: box.x,
    y: box.y
  });
  await wait(150);
}

async function getPathToMissionNode(client) {
  return evaluate(client, `
    (() => {
      const parseTranslate = (value) => {
        const match = /translate\\(([-0-9.]+),\\s*([-0-9.]+)\\)/.exec(value || "");
        return match ? { x: Number(match[1]), y: Number(match[2]) } : null;
      };
      const key = (point) => point ? \`\${Math.round(point.x)},\${Math.round(point.y)}\` : "";
      const nodes = [...document.querySelectorAll('.node')].map((element, index) => ({
        active: element.classList.contains('is-active'),
        chosen: element.classList.contains('is-chosen'),
        index,
        mission: Boolean(element.querySelector('.mission-node-label')),
        point: parseTranslate(element.getAttribute('transform'))
      }));
      const nodeByPoint = new Map(nodes.map((node) => [key(node.point), node]));
      const links = [...document.querySelectorAll('path.link')].map((path) => {
        const numbers = (path.getAttribute('d') || '').match(/[-0-9.]+/g)?.map(Number) || [];
        if (numbers.length < 4) return null;
        const source = nodeByPoint.get(key({ x: numbers[0], y: numbers[1] + 22 }));
        const target = nodeByPoint.get(key({ x: numbers[2], y: numbers[3] - 22 }));
        return source && target ? { source: source.index, target: target.index } : null;
      }).filter(Boolean);
      const mission = nodes.find((node) => node.mission);
      const starts = nodes.filter((node) => node.active || node.chosen).map((node) => node.index);
      const queue = starts.map((index) => [index]);
      const seen = new Set(starts);

      if (!mission) return null;

      while (queue.length) {
        const path = queue.shift();
        const current = path[path.length - 1];
        if (current === mission.index) return path;

        links
          .filter((link) => link.source === current)
          .forEach((link) => {
            if (seen.has(link.target)) return;
            seen.add(link.target);
            queue.push([...path, link.target]);
          });
      }

      return null;
    })()
  `);
}

async function chooseRouteNode(client, nodeIndex) {
  await clickNodeByIndex(client, nodeIndex);
  await waitFor(client, "document.querySelector('#nodeDialog')?.open === true", `node dialog ${nodeIndex}`);
  await click(client, ".route-choice");
  await waitFor(client, "document.querySelector('#nodeDialog')?.open === true", `node chosen ${nodeIndex}`);
}

async function setValue(client, selector, value) {
  await waitFor(client, `Boolean(document.querySelector(${JSON.stringify(selector)}))`, selector);
  await evaluate(client, `
    (() => {
      const element = document.querySelector(${JSON.stringify(selector)});
      element.value = ${JSON.stringify(value)};
      element.dispatchEvent(new Event("input", { bubbles: true }));
      element.dispatchEvent(new Event("change", { bubbles: true }));
      return true;
    })()
  `);
}

async function screenshot(client, name) {
  await mkdir(OUTPUT_DIR, { recursive: true });
  const result = await client.send("Page.captureScreenshot", {
    captureBeyondViewport: true,
    format: "png"
  });
  const filePath = resolve(OUTPUT_DIR, `${name}.png`);
  await writeFile(filePath, Buffer.from(result.data, "base64"));
  return filePath;
}

async function setupPage(width = 1366, height = 900) {
  const target = await getPageTarget();
  const client = new CdpClient(target.webSocketDebuggerUrl);

  await client.ready();
  await client.send("Page.enable");
  await client.send("Runtime.enable");
  await client.send("Emulation.setDeviceMetricsOverride", {
    deviceScaleFactor: 1,
    height,
    mobile: width < 700,
    width
  });
  await client.send("Page.navigate", { url: APP_URL });
  await waitFor(client, "document.readyState === 'complete'", "page load");
  await waitFor(client, "document.querySelector('#rangeDialog')?.open === true", "range dialog");

  await evaluate(client, `
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async (text) => {
          window.__qaCopiedSession = text;
        }
      }
    });
  `);

  return client;
}

async function startExploration(client, profileId = "forest-11-20") {
  await setValue(client, "#floorRangeInput", profileId);
  await click(client, "#rangeConfirm");
  await waitFor(client, "document.querySelector('#missionDialog')?.open === true", "mission selection dialog");
}

async function confirmMissionSelection(client, count) {
  await waitFor(client, "document.querySelectorAll('.mission-card.is-selectable').length > 0", "mission offers");
  const available = await evaluate(client, "document.querySelectorAll('.mission-card.is-selectable').length");
  if (available < count) throw new Error(`Quadro gerou ${available} ofertas, mas o teste precisa de ${count}.`);

  for (let index = 0; index < count; index += 1) {
    await evaluate(client, `
      (() => {
        const card = document.querySelectorAll('.mission-card.is-selectable')[${index}];
        card.scrollIntoView({ block: "center" });
        card.click();
      })()
    `);
  }
  await click(client, ".mission-dialog-actions .generate-button");
  await waitFor(client, "document.querySelector('#missionDialog')?.open === false", "mission selection closed");
}

async function confirmMissionSelectionMatching(client, matcherExpression, label) {
  await waitFor(client, "document.querySelectorAll('.mission-card.is-selectable').length > 0", "mission offers");
  const selected = await evaluate(client, `
    (() => {
      const cards = [...document.querySelectorAll('.mission-card.is-selectable')];
      const card = cards.find((candidate) => ${matcherExpression});
      if (!card) return false;
      card.scrollIntoView({ block: "center" });
      card.click();
      return true;
    })()
  `);

  if (!selected) throw new Error(`Não encontrou oferta compatível: ${label}`);
  await click(client, ".mission-dialog-actions .generate-button");
  await waitFor(client, "document.querySelector('#missionDialog')?.open === false", "mission selection closed");
}

async function getOpenDialogText(client, selector) {
  return evaluate(client, `document.querySelector(${JSON.stringify(selector)})?.innerText || ""`);
}

async function assertNoHorizontalOverflow(client, selector, label) {
  const overflow = await evaluate(client, `
    (() => {
      const element = document.querySelector(${JSON.stringify(selector)});
      if (!element) return null;
      return {
        clientWidth: element.clientWidth,
        scrollWidth: element.scrollWidth
      };
    })()
  `);

  if (!overflow) throw new Error(`${label}: elemento não encontrado`);
  if (overflow.scrollWidth > overflow.clientWidth + 2) {
    throw new Error(`${label}: overflow horizontal (${overflow.scrollWidth} > ${overflow.clientWidth})`);
  }
}

async function runZeroMissionFlow(results) {
  const client = await setupPage();
  try {
    await startExploration(client);
    await screenshot(client, "zero-selection");
    await confirmMissionSelection(client, 0);
    await click(client, "#missionButton");
    await waitFor(client, "document.querySelector('#missionDialog')?.open === true", "mission tracking open");
    const text = await getOpenDialogText(client, "#missionDialog");
    if (!text.includes("Nenhuma missão selecionada")) {
      throw new Error("Fluxo 0 missões: estado vazio não apareceu.");
    }
    await assertNoHorizontalOverflow(client, "#missionDialog", "Fluxo 0 missões");
    await screenshot(client, "zero-tracking");
    results.push("0 missões: passou");
  } finally {
    client.close();
  }
}

async function runSelectedMissionFlow(results, count) {
  for (let attempt = 0; attempt < 8; attempt += 1) {
    const client = await setupPage();
    try {
      await startExploration(client);
      const available = await evaluate(client, "document.querySelectorAll('.mission-card.is-selectable').length");
      if (available < count) {
        client.close();
        continue;
      }
      await confirmMissionSelection(client, count);
      await click(client, "#missionButton");
      await waitFor(client, "document.querySelector('#missionDialog')?.open === true", "mission tracking open");
      const cards = await evaluate(client, "document.querySelectorAll('#missionDialog .mission-card').length");
      if (cards !== count) throw new Error(`Fluxo ${count} missões: esperado ${count}, recebido ${cards}.`);
      await assertNoHorizontalOverflow(client, "#missionDialog", `Fluxo ${count} missões`);
      await screenshot(client, `${count}-missions-tracking`);
      results.push(`${count} missão/missões: passou`);
      client.close();
      return;
    } catch (error) {
      client.close();
      if (attempt === 7) throw error;
    }
  }

  throw new Error(`Fluxo ${count} missões: não foi gerado quadro com ofertas suficientes.`);
}

function createNodeMissionSessionCode() {
  const profile = {
    ...forest11to20Profile,
    missionRules: {
      ...forest11to20Profile.missionRules,
      allowedCategories: ["collection"],
      offerCountMin: 1,
      offerCountMax: 1
    }
  };

  for (let index = 0; index < 200; index += 1) {
    const seed = `qa-node-mission-${index}`;
    const context = createMissionGenerationContext({
      currentSeed: seed,
      profile
    });
    const [mission] = generateMissionOffers(context);

    if (mission?.destination?.floor !== 11) continue;
    const levels = generateMapData(
      5,
      forest11to20Profile.recommendations.baseDcByFloor[11],
      forest11to20Profile,
      11,
      createRng(seed)
    );
    const [materialized] = materializeMissionsForCurrentContent({ floor: 11, levels, missions: [{ ...mission, status: "selected" }] });
    const binding = materialized.integration?.bindings?.[0];
    const boundNode = levels.flat().find((node) => node.id === binding?.nodeId);

    if (binding?.kind !== "node" || boundNode?.level !== 1) continue;

    return encodeSessionCode({
      v: 1,
      mode: "node-map",
      profile: forest11to20Profile.id,
      floor: 11,
      depth: 5,
      baseDc: forest11to20Profile.recommendations.baseDcByFloor[11],
      unknownPaths: false,
      mapSeed: seed,
      missions: {
        history: [],
        profileId: forest11to20Profile.id,
        selected: [{ ...mission, status: "selected" }],
        selectionLocked: true
      },
      state: {
        chosenByLevel: [],
        elapsedMinutes: 0,
        exploredNodeIds: [],
        attemptedNodeIds: [],
        unknownPathsEnabled: false
      }
    });
  }

  throw new Error("Não foi possível gerar sessão de QA com missão no Andar 11.");
}

async function runNodeMissionAndAdvanceFlow(results) {
  const sessionCode = createNodeMissionSessionCode();
  const client = await setupPage();
  try {
    await setValue(client, "#seedInput", sessionCode);
    await click(client, "#rangeConfirm");
    await waitFor(client, "Boolean(document.querySelector('.mission-node-label'))", "mission node label");
    const pathToMission = await getPathToMissionNode(client);
    if (!pathToMission?.length) {
      throw new Error("Não foi possível encontrar rota visual até o nodo de missão.");
    }

    for (const nodeIndex of pathToMission.slice(0, -1)) {
      await chooseRouteNode(client, nodeIndex);
      await click(client, "#nodeDialogClose");
      await waitFor(client, "document.querySelector('#nodeDialog')?.open === false", `node closed ${nodeIndex}`);
    }

    await clickNodeByIndex(client, pathToMission[pathToMission.length - 1]);
    await waitFor(client, "document.querySelector('#nodeDialog')?.open === true", "node dialog pending");
    let nodeText = await getOpenDialogText(client, "#nodeDialog");
    if (nodeText.includes("Realizar missão")) {
      throw new Error("Missão apareceu antes do nodo ser marcado como rota escolhida.");
    }

    await click(client, ".route-choice");
    await waitFor(client, "document.querySelector('#nodeDialog')?.innerText.includes('Realizar missão')", "mission action after chosen");
    const hasInlineMissionIndicator = await evaluate(client, "Boolean(document.querySelector('#nodeDialog .mission-inline-indicator'))");
    if (!hasInlineMissionIndicator) throw new Error("Indicador de missão não apareceu no nodo escolhido.");
    await screenshot(client, "node-mission-chosen");

    await click(client, ".mission-context-action");
    await waitFor(client, "document.querySelector('#missionDialog')?.open === true", "mission run dialog");
    const missionText = await getOpenDialogText(client, "#missionDialog");
    if (!missionText.includes("Mapa tático do nodo")) {
      throw new Error("Missão em nodo não abriu com mapa tático do próprio nodo.");
    }
    await screenshot(client, "node-mission-run");
    await click(client, "#missionClose");
    await waitFor(client, "document.querySelector('#missionDialog')?.open === false", "mission run closed");
    await click(client, "#nodeDialogClose");
    await waitFor(client, "document.querySelector('#nodeDialog')?.open === false", "node dialog closed");

    for (let step = 0; step < 8; step += 1) {
      const advanceDisabled = await evaluate(client, "document.querySelector('#advanceNodeFloorButton').disabled");
      if (!advanceDisabled) break;

      const nextActiveIndex = await evaluate(client, `
        (() => [...document.querySelectorAll('.node')]
          .findIndex((node) => node.classList.contains('is-active') && !node.classList.contains('is-chosen')))()
      `);
      if (nextActiveIndex < 0) break;
      await chooseRouteNode(client, nextActiveIndex);
      await click(client, "#nodeDialogClose");
      await waitFor(client, "document.querySelector('#nodeDialog')?.open === false", `advance helper node ${step}`);
    }

    const advanceBefore = await evaluate(client, "document.querySelector('#advanceNodeFloorButton').disabled");
    if (advanceBefore) throw new Error("Botão avançar andar não liberou após escolher rota até o topo.");
    await click(client, "#advanceNodeFloorButton");
    await waitFor(client, "document.querySelector('#floorInput')?.value === '12'", "floor advanced to 12");
    await screenshot(client, "advanced-floor-12");
    results.push("nodo escolhido + abrir missão + avançar andar: passou");
  } finally {
    client.close();
  }
}

async function runSaveLoadFlow(results) {
  const client = await setupPage();
  try {
    await startExploration(client, "forest-11-20");
    await confirmMissionSelection(client, 1);
    await click(client, "#missionButton");
    await waitFor(client, "document.querySelector('#missionDialog')?.open === true", "tracking before save");
    const before = await getOpenDialogText(client, "#missionDialog");
    await click(client, "#missionClose");
    await click(client, "#info");
    await waitFor(client, "window.__qaCopiedSession?.startsWith('MD1.')", "copied session code");
    const sessionCode = await evaluate(client, "window.__qaCopiedSession");

    await client.send("Page.navigate", { url: APP_URL });
    await waitFor(client, "document.querySelector('#rangeDialog')?.open === true", "range dialog after reload");
    await setValue(client, "#seedInput", sessionCode);
    await click(client, "#rangeConfirm");
    await waitFor(client, "document.querySelector('#rangeDialog')?.open === false", "session restored");
    await click(client, "#missionButton");
    await waitFor(client, "document.querySelector('#missionDialog')?.open === true", "tracking after load");
    const after = await getOpenDialogText(client, "#missionDialog");
    if (!after.includes("Recompensa") || !after.includes("Marcar como concluída")) {
      throw new Error("Salvar/carregar: missão não voltou em acompanhamento.");
    }
    if (!before.split("\n").find((line) => line.trim() && after.includes(line.trim()))) {
      throw new Error("Salvar/carregar: texto de missão não parece corresponder ao estado anterior.");
    }
    await screenshot(client, "save-load-restored");
    results.push("salvar/carregar por MD1: passou");
  } finally {
    client.close();
  }
}

async function runMobileSelectionSmoke(results) {
  const client = await setupPage(390, 844);
  try {
    await startExploration(client, "forest-11-20");
    await assertNoHorizontalOverflow(client, "#missionDialog", "Mobile selection");
    await screenshot(client, "mobile-selection");
    results.push("mobile seleção sem overflow horizontal: passou");
  } finally {
    client.close();
  }
}

const results = [];

await runZeroMissionFlow(results);
await runSelectedMissionFlow(results, 1);
await runSelectedMissionFlow(results, 3);
await runNodeMissionAndAdvanceFlow(results);
await runSaveLoadFlow(results);
await runMobileSelectionSmoke(results);

console.log(`Mission flow QA passed.\n${results.map((result) => `- ${result}`).join("\n")}\nScreenshots: ${OUTPUT_DIR}`);
