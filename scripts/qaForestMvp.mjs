import assert from "node:assert/strict";
import { mkdir, readFile } from "node:fs/promises";
import { chromium } from "@playwright/test";
import { forest11to20Profile as profile } from "../src/floorProfiles/forest11to20.js";
import { prepareForestExpedition, serializeForestExpedition } from "../src/forestExpedition.js";
import { encodeSessionCode, decodeSessionCode } from "../src/sessionCode.js";

const production = process.argv.includes("--production");
const url = process.env.QA_APP_URL || (production ? "http://localhost:4173/megadungeon/" : "http://localhost:5173/megadungeon/");
const browser = await chromium.launch({ headless: true, executablePath: process.env.QA_CHROME || "/usr/bin/google-chrome", args: ["--no-sandbox"] });
const errors = [];
await mkdir("tmp/forest-mvp-qa", { recursive: true });

function objective(category, targetName, targetId, quantity = 1, floor = 15) {
  return {
    id: `qa-${category}`, profileId: profile.id, title: `QA ${category}`, category, categoryLabel: category,
    status: "selected", description: `Objetivo: ${targetName}`, proofType: "Confirmação do mestre.",
    destination: category === "extermination" ? { kind: "progress", floor: null, floorMin: 11, floorMax: 19, label: "Andares 11–19" }
      : { kind: "floor", floor, label: `Andar ${floor}` },
    objective: { targetType: ["extermination", "specialHunt"].includes(category) ? "creature" : "material", targetName, targetId, quantity, condition: "Cumprir o objetivo" },
    integration: { bindings: [] }, reward: { totalPayout: 100 }
  };
}

function sessionFor(expedition, floor = expedition.startFloor) {
  const entry = expedition.floors.find(f => f.floor === floor);
  return {
    v: 1, mode: "node-map", profile: profile.id, floor,
    depth: entry.depth, baseDc: entry.baseDc, mapSeed: expedition.seed, unknownPaths: false,
    forestExpedition: serializeForestExpedition(expedition),
    missions: { profileId: profile.id, selected: expedition.missions, selectionLocked: true, history: [] },
    state: { chosenByLevel: [], completed: [], attempted: [], explored: [], rested: [], elapsedMinutes: 0 }
  };
}

function missionPath(entry) {
  const needed = new Set(entry.levels.flat().filter(n => n.missionBindings?.length).map(n => n.id));
  function visit(node, path) {
    const next = [...path, node];
    if (!node.links.length) return [...needed].every(id => next.some(n => n.id === id)) ? next : null;
    for (const target of node.links) { const found = visit(target, next); if (found) return found; }
    return null;
  }
  for (const first of entry.levels[0]) { const path = visit(first, []); if (path) return path; }
  throw new Error("Missões não compartilham uma rota válida.");
}

async function pageFor(code = null, viewport = { width: 1024, height: 768 }) {
  const page = await browser.newPage({ viewport, serviceWorkers: "block" });
  page.on("pageerror", error => errors.push(error.message));
  await page.goto(url);
  await page.locator("#rangeDialog[open]").waitFor();
  if (code) {
    await page.locator("#seedInput").fill(code);
    await page.locator("#rangeConfirm").click();
    await page.locator("#rangeDialog").waitFor({ state: "hidden" });
  }
  return page;
}

async function exportSession(page) {
  if (!(await page.locator("#info").isVisible())) await page.locator("#settingsToggle").click();
  const [download] = await Promise.all([
    page.waitForEvent("download", { timeout: 5000 }),
    page.locator("#info").click()
  ]);
  assert.match(download.suggestedFilename(), /^mega-dungeon-andar-\d+\.txt$/);
  const code = await readFile(await download.path(), "utf8");
  assert.ok(code.startsWith("MD1."));
  return code;
}

async function newSelection(count) {
  const page = await pageFor();
  await page.locator("#floorRangeInput").selectOption(profile.id);
  await page.locator("#rangeConfirm").click();
  await page.locator("#missionDialog[open]").waitFor();
  const available = await page.locator(".mission-card.is-selectable").count();
  const selected = Math.min(count, available);
  for (let i = 0; i < selected; i++) await page.locator(".mission-card.is-selectable").nth(i).click();
  await page.locator(".mission-dialog-actions .generate-button").click();
  await page.locator("#missionDialog").waitFor({ state: "hidden" });
  const saved = decodeSessionCode(await exportSession(page));
  assert.equal(saved.missions.selected.length, selected);
  assert.ok(saved.forestExpedition);
  for (const m of saved.missions.selected) assert.ok(m.integration.bindings.length);
  await page.close();
  console.log(`Seleção de ${selected} missão/missões: passou.`);
}

async function missionFlow() {
  const expedition = prepareForestExpedition({ seed: "qa-forest-live", profile, startFloor: 15, depth: 5, missions: [
    objective("specialHunt", "Sucuri", "sucuri"),
    objective("collection", "sementes de vegetação agressiva", "sementes", 4),
    objective("extermination", "Naja", "naja", 4)
  ] });
  const entry = expedition.floors.find(f => f.floor === 15);
  const page = await pageFor(encodeSessionCode(sessionFor(expedition)));
  const path = missionPath(entry);
  let credited = false;
  let exploredChecked = false;
  let pendingCaptured = false;
  assert.match(await page.locator("#nodeMapGuidance").innerText(), /Escolha um nodo/);
  for (const node of path) {
    const index = entry.levels.flat().findIndex(n => n.id === node.id);
    await page.locator(".node").nth(index).click();
    await page.locator("#nodeDialog[open]").waitFor();
    if (!exploredChecked && node.skill && node.type !== "unknown") {
      await page.locator(".explored-choice").click();
      assert.equal(await page.locator("#nodeDialog .node-progress-status").innerText(), "Exploração registrada");
      assert.equal(await page.locator(".node").nth(index).getAttribute("data-progress"), "explored");
      exploredChecked = true;
    }
    await page.locator(".route-choice").click();
    await page.locator(".complete-choice").waitFor();
    assert.equal(await page.locator("#nodeDialog .node-progress-status").innerText(), "Encontro pendente");
    assert.equal(await page.locator(".node").nth(index).getAttribute("data-progress"), "pending");
    assert.equal(await page.locator(".node").nth(index).locator(".node-progress-badge text").textContent(), "…");
    assert.match(await page.locator("#nodeMapGuidance").innerText(), /Conclua o encontro/);
    const badgeBox = await page.locator(".node").nth(index).locator(".node-progress-badge").boundingBox();
    for (const selector of [".mission-node-label", ".check-label", ".node-icon"]) {
      const part = page.locator(".node").nth(index).locator(selector);
      if (!await part.count()) continue;
      const box = await part.boundingBox();
      if (box && badgeBox) {
        const overlapWidth = Math.min(box.x + box.width, badgeBox.x + badgeBox.width) - Math.max(box.x, badgeBox.x);
        const overlapHeight = Math.min(box.y + box.height, badgeBox.y + badgeBox.height) - Math.max(box.y, badgeBox.y);
        assert.ok(overlapWidth <= 1 || overlapHeight <= 1, `Progress badge overlaps ${selector}`);
      }
    }
    if (!pendingCaptured) {
      await page.screenshot({ path: "tmp/forest-mvp-qa/pending-scene.png", fullPage: true });
      pendingCaptured = true;
    }
    assert.equal(await page.locator("#advanceNodeFloorButton").isDisabled(), true);
    const extermIndex = node.missionBindings?.findIndex(m => m.id === "qa-extermination") ?? -1;
    if (extermIndex >= 0 && !credited) {
      await page.locator(".mission-context-action").nth(extermIndex).click();
      await page.locator("#missionDialog[open]").waitFor();
      assert.match(await page.locator("#missionDialog").innerText(), /Mapa tático do nodo/);
      await page.locator("#missionDialog .encounter-mission-action").click();
      assert.equal(await page.locator("#missionDialog .encounter-mission-action").count(), 0);
      assert.match(await page.locator("#missionDialog").innerText(), /já registrados/);
      await page.locator("#missionClose").click();
      await page.locator(".mission-context-action").nth(extermIndex).click();
      assert.equal(await page.locator("#missionDialog .encounter-mission-action").count(), 0);
      await page.locator("#missionClose").click();
      credited = true;
    }
    if (node.contentType === "camp") {
      await page.locator(".rest-choice").click();
      assert.match(await page.locator("#nodeDialog").innerText(), /Descanso registrado/);
    }
    await page.locator(".complete-choice").click();
    assert.equal(await page.locator("#nodeDialog .node-progress-status").innerText(), "Encontro concluído");
    assert.equal(await page.locator(".node").nth(index).getAttribute("data-progress"), "completed");
    assert.equal(await page.locator(".node").nth(index).locator(".node-progress-badge text").textContent(), "✓");
    await page.locator("#nodeDialogClose").click();
  }
  assert.equal(exploredChecked, true);
  assert.equal(credited, true);
  assert.equal(await page.locator("#advanceNodeFloorButton").isDisabled(), false);
  assert.match(await page.locator("#nodeMapGuidance").innerText(), /Andar concluído/);
  const code = await exportSession(page);
  const saved = decodeSessionCode(code);
  assert.ok(saved.missions.selected.find(m => m.id === "qa-extermination").progress.current > 0);
  assert.equal(saved.state.completed.length, 5);
  await page.screenshot({ path: "tmp/forest-mvp-qa/mission-route.png", fullPage: true });
  await page.close();
  const restored = await pageFor();
  const [fileChooser] = await Promise.all([
    restored.waitForEvent("filechooser", { timeout: 5000 }),
    restored.getByRole("button", { name: "Importar arquivo de sessão" }).click()
  ]);
  await fileChooser.setFiles({
    name: "mega-dungeon-andar-15.txt",
    mimeType: "text/plain",
    buffer: Buffer.from(code)
  });
  await restored.locator("#rangeDialog").waitFor({ state: "hidden" });
  assert.equal(await restored.locator('.node[data-progress="completed"]').count(), 5);
  assert.equal(await restored.locator("#advanceNodeFloorButton").isDisabled(), false);
  const roundTrip = decodeSessionCode(await exportSession(restored));
  assert.deepEqual(roundTrip.missions, saved.missions);
  assert.deepEqual(roundTrip.state, saved.state);
  await restored.locator("#advanceNodeFloorButton").click();
  assert.equal(await restored.locator("#floorInput").inputValue(), "16");
  assert.match(await restored.locator("#nodeMapGuidance").innerText(), /Escolha um nodo/);
  const advanced = decodeSessionCode(await exportSession(restored));
  assert.deepEqual(advanced.missions, saved.missions);
  assert.equal(advanced.forestExpedition.floors.find(f => f.floor === 15).state.completed.length, 5);
  await restored.close();
  console.log("Objetivos, contador sem duplicação, descanso, conclusão, salvar/restaurar e avanço: passaram.");
}

async function bossFlow() {
  const expedition = prepareForestExpedition({ seed: "qa-boss", profile, startFloor: 20, depth: 3, missions: [] });
  const entry = expedition.floors[0];
  const page = await pageFor(encodeSessionCode(sessionFor(expedition)));
  const path = missionPath(entry);
  for (const node of path) {
    await page.locator(".node").nth(entry.levels.flat().findIndex(n => n.id === node.id)).click();
    await page.locator(".route-choice").click();
    if (node.type === "boss") {
      await page.locator("[aria-label='Mostrar criaturas e armadilhas']").click();
      assert.match(await page.locator("#nodeDialog").innerText(), /Quimera/);
      await page.locator("[aria-label='Abrir mapa tático']").click();
      await page.keyboard.press("Escape");
      assert.equal(await page.locator("#nodeDialog").evaluate(el => el.open), true, "Escape must close only the tactical map, keeping the encounter open");
    }
    await page.locator(".complete-choice").click();
    await page.locator("#nodeDialogClose").click();
  }
  assert.equal(await page.locator("#advanceNodeFloorButton").innerText(), "Faixa concluída");
  assert.equal(await page.locator("#nodeMapGuidance").innerText(), "Etapa concluída.");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator("#missionButton").click();
  const width = await page.locator("#missionDialog").evaluate(el => ({ scroll: el.scrollWidth, client: el.clientWidth }));
  assert.ok(width.scroll <= width.client + 2);
  await page.screenshot({ path: "tmp/forest-mvp-qa/mobile.png", fullPage: true });
  await page.locator("#missionClose").click();
  await page.locator("#legendToggle").click();
  await page.locator(".legend-progress").scrollIntoViewIfNeeded();
  const legend = await page.locator("#legendPanel").boundingBox();
  assert.ok(legend.y >= 0 && legend.y + legend.height <= 844);
  await page.screenshot({ path: "tmp/forest-mvp-qa/mobile-legend.png", fullPage: true });
  await page.close();
  console.log("Quimera fixa, conclusão da faixa e modal mobile: passaram.");
}

async function configurationFailure() {
  const expedition = prepareForestExpedition({ seed: "qa-config-base", profile, startFloor: 19, depth: 8, missions: [
    objective("specialHunt", "Serpe", "serpe", 1, 19),
    objective("extermination", "Infecto", "infecto", 8)
  ] });
  const page = await pageFor(encodeSessionCode(sessionFor(expedition)));
  const before = decodeSessionCode(await exportSession(page));
  await page.locator("#depthInput").fill("3");
  await page.evaluate(() => { Math.random = () => 0.25; Date.now = () => 1000; });
  await page.locator("#generateButton").click();
  assert.match(await page.locator("#info").innerText(), /Não há nodos suficientes/);
  const after = decodeSessionCode(await exportSession(page));
  assert.deepEqual(after, before, "A failed reconfiguration must preserve the entire expedition");
  await page.close();
  console.log("Configuração impossível é explicada e preserva a sessão anterior: passou.");
}

async function futureAndLegacyFlow() {
  const expedition = prepareForestExpedition({ seed: "qa-future-binding", profile, startFloor: 15, missions: [
    objective("recovery", "uma bússola desregulada", "bussola", 1, 16)
  ] });
  const binding = expedition.missions[0].integration.bindings[0];
  assert.equal(binding.nodeId, 0);
  const page = await pageFor(encodeSessionCode(sessionFor(expedition)));
  await page.locator(".node").first().click();
  await page.locator(".route-choice").click();
  await page.locator("#nodeDialogClose").click();
  await page.locator("#missionButton").click();
  assert.match(await page.locator("#missionDialog").innerText(), /andares seguintes/);
  assert.equal(await page.locator("#missionDialog").getByRole("button", { name: "Abrir encontro", exact: true }).count(), 0);
  await page.screenshot({ path: "tmp/forest-mvp-qa/future-mission.png", fullPage: true });
  await page.close();

  const legacy = await pageFor(encodeSessionCode({
    v: 1, mode: "node-map", profile: profile.id, floor: 11, depth: 3, baseDc: 15,
    mapSeed: "qa-legacy-forest", unknownPaths: false,
    state: { chosenByLevel: [], attempted: [], explored: [], rested: [], elapsedMinutes: 0 }
  }));
  await legacy.locator(".node.is-active").first().click();
  await legacy.locator(".route-choice").click();
  assert.equal(await legacy.locator(".complete-choice").count(), 0);
  assert.equal(await legacy.locator("#nodeDialog .node-progress-status").innerText(), "Rota percorrida");
  await legacy.locator("#nodeDialogClose").click();
  assert.ok(await legacy.locator(".node.is-active").count() > 0);
  const saved = decodeSessionCode(await exportSession(legacy));
  assert.equal(saved.baseDc, 15);
  assert.equal(saved.forestExpedition, undefined);
  await legacy.locator("#floorInput").selectOption("12");
  assert.equal(await legacy.locator("#advanceNodeFloorButton").isDisabled(), true);
  assert.match(await legacy.locator("#nodeMapGuidance").innerText(), /Gere o mapa do andar selecionado/);
  await legacy.close();
  console.log("Missão futura não colide com ID atual; sessão legada preserva geração e fluxo: passaram.");
}

async function offlineFlow() {
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 }, serviceWorkers: "allow" });
  page.on("pageerror", error => errors.push(error.message));
  await page.goto(url);
  await page.waitForFunction(() => Boolean(navigator.serviceWorker.controller));
  await page.reload();
  await page.waitForFunction(async () => {
    const cache = await caches.open("mega-dungeon-v3");
    const urls = (await cache.keys()).map(request => request.url);
    return urls.some(url => /\/assets\/.*\.js$/.test(url)) && urls.some(url => /\/assets\/.*\.css$/.test(url));
  });
  await page.context().setOffline(true);
  await page.reload();
  await page.locator("#rangeDialog[open]").waitFor();
  await page.locator("#floorRangeInput").selectOption(profile.id);
  await page.locator("#rangeConfirm").click();
  await page.locator(".mission-dialog-actions .generate-button").click();
  await page.locator("#missionDialog").waitFor({ state: "hidden" });
  assert.ok(await page.locator(".node.is-active").count() > 0);
  assert.equal(decodeSessionCode(await exportSession(page)).profile, profile.id);
  await page.close();
  console.log("Build de produção recarrega, inicia floresta e exporta sessão sem rede após cache: passou.");
}

try {
  await newSelection(0);
  await newSelection(3);
  await missionFlow();
  await bossFlow();
  await configurationFailure();
  await futureAndLegacyFlow();
  if (production) await offlineFlow();
  assert.deepEqual(errors, [], "Erros de JavaScript no navegador");
  console.log("QA do MVP 11–20 passou sem erros de JavaScript.");
} finally {
  await browser.close();
}
