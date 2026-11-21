import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { chromium } from "@playwright/test";

import { archipelago21to30Profile } from "../src/floorProfiles/archipelago21to30.js";
import { dungeon1to10Profile } from "../src/floorProfiles/dungeon1to10.js";
import { forest11to20Profile } from "../src/floorProfiles/forest11to20.js";
import { createArchipelagoState } from "../src/archipelagoState.js";
import { prepareForestExpedition, serializeForestExpedition } from "../src/forestExpedition.js";
import { createRng } from "../src/random.js";
import { encodeSessionCode } from "../src/sessionCode.js";

const APP_URL = process.env.QA_APP_URL || (process.argv.includes("--production") ? "http://localhost:4173/megadungeon/" : "http://localhost:5173/megadungeon/");
const SHOT_DIR = ".playwright-mcp/fim-de-faixa";
const VIEWPORT = { width: 1024, height: 768 };

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const missions = (profileId) => ({ history: [], profileId, selected: [], selectionLocked: true });

function dungeonCompletedSession() {
  return encodeSessionCode({
    v: 1, mode: dungeon1to10Profile.mode, profile: dungeon1to10Profile.id, floor: 10, mapSeed: "qa-fim-1-10",
    missions: missions(dungeon1to10Profile.id),
    extendedState: {
      descentPending: false, elapsedMinutes: 0, failures: 0, floor: 10, log: [], nextFloorTestEffects: [],
      pendingSceneEffects: [], pendingTestEffects: [], phase: "completed", resetPending: false, successes: 0, usedApproachIds: []
    }
  });
}

function firstLeafPath(entry) {
  function visit(node, path) {
    const next = [...path, node];
    if (!node.links.length) return next;
    for (const target of node.links) { const found = visit(target, next); if (found) return found; }
    return null;
  }
  for (const first of entry.levels[0]) { const found = visit(first, []); if (found) return found; }
  throw new Error("sem rota");
}

function forestCompletedSession() {
  const expedition = prepareForestExpedition({ seed: "qa-fim-11-20", profile: forest11to20Profile, startFloor: 20, depth: 3, missions: [] });
  const entry = expedition.floors[0];
  const path = firstLeafPath(entry);
  return encodeSessionCode({
    v: 1, mode: "node-map", profile: forest11to20Profile.id, floor: 20, depth: entry.depth, baseDc: entry.baseDc,
    mapSeed: expedition.seed, unknownPaths: false, forestExpedition: serializeForestExpedition(expedition),
    missions: { ...missions(forest11to20Profile.id), selected: expedition.missions },
    state: {
      chosenByLevel: path.map((node) => [node.level, node.id]), completed: path.map((node) => node.id),
      attempted: [], explored: path.map((node) => node.id), rested: [], elapsedMinutes: 0
    }
  });
}

function archipelagoBossSession() {
  const archipelago = createArchipelagoState(archipelago21to30Profile, createRng("qa-fim-21-30"));
  const saved = archipelago.exportSessionState();
  const boss = saved.islands[30] ?? saved.islands.find?.((island) => island.floor === 30);
  return encodeSessionCode({
    v: 1, mode: archipelago21to30Profile.mode, profile: archipelago21to30Profile.id, floor: 30, mapSeed: "qa-fim-21-30",
    missions: missions(archipelago21to30Profile.id),
    archipelagoState: {
      ...saved,
      visitedFloors: [30],
      completedFloors: archipelago21to30Profile.floors.filter((floor) => floor >= 21 && floor <= 29),
      activeExploration: { floor: 30, resolvedObjectiveIds: boss.objectives.map((objective) => objective.id) },
      daySpent: true
    }
  });
}

// Lê o IndexedDB direto (mesmo banco e chave de src/sessionAutosave.js) para funcionar também contra o build de produção.
const readAutosave = (page) => page.evaluate(() => new Promise((resolve, reject) => {
  const request = indexedDB.open("mega-dungeon", 1);
  request.onerror = () => reject(request.error);
  request.onsuccess = () => {
    const get = request.result.transaction("autosaves", "readonly").objectStore("autosaves").get("current");
    get.onsuccess = () => { request.result.close(); resolve(get.result ?? null); };
    get.onerror = () => reject(get.error);
  };
}));

async function openWithSession(browser, code) {
  const context = await browser.newContext({ viewport: VIEWPORT, serviceWorkers: "block" });
  const page = await context.newPage();
  const dialogs = [];
  page.on("pageerror", (error) => { throw error; });
  page.on("dialog", async (dialog) => { dialogs.push(dialog.message()); await dialog.dismiss(); });
  await page.goto(APP_URL);
  await page.locator("#rangeDialog[open]").waitFor();
  const dir = await mkdtemp(join(tmpdir(), "md-session-"));
  const file = join(dir, "sessao.txt");
  await writeFile(file, code);
  try {
    await page.locator("#sessionFile").setInputFiles(file);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
  await page.locator("#rangeDialog").waitFor({ state: "hidden" });
  await page.waitForFunction(() => true);
  return { page, dialogs, context };
}

async function waitForAutosave(page, profileId) {
  for (let i = 0; i < 40; i += 1) {
    const saved = await readAutosave(page);
    if (saved?.profile === profileId) return saved;
    await page.waitForTimeout(100);
  }
  throw new Error(`autosave de ${profileId} nao apareceu`);
}

async function checkFinish(page, resumeAbsentAfterReload = true) {
  await page.getByRole("button", { name: "Encerrar expedição" }).click();
  await page.locator("#rangeDialog[open]").waitFor();
  assert(await page.locator("#resumeExpedition").isHidden(), "Continuar deveria sumir ao encerrar");
  assert((await page.locator('button.range-card[data-range="dungeon-1-10"]').getAttribute("aria-pressed")) === "true", "Masmorra deveria vir escolhida");
  assert(await page.locator("dialog[open]").count() === 1, "so a tela inicial deveria estar aberta");
  await page.waitForTimeout(300);
  assert((await readAutosave(page)) === null, "autosave deveria ter sido apagado");
  if (resumeAbsentAfterReload) {
    await page.reload();
    await page.locator("#rangeDialog[open]").waitFor();
    await page.waitForTimeout(500);
    assert(await page.locator("#resumeExpedition").isHidden(), "Continuar nao deveria aparecer apos recarregar");
  }
}

async function advanceFlow(page, dialogs, fromProfile, toProfile, toName) {
  await waitForAutosave(page, fromProfile);
  await page.getByRole("button", { name: `Avançar para ${toName}` }).click();
  await page.locator("#missionDialog").waitFor({ state: "visible" });
  assert(dialogs.length === 0, `Avançar nao deveria pedir confirmacao: ${JSON.stringify(dialogs)}`);
  await page.getByRole("button", { name: "Continuar sem missões" }).click();
  await page.locator("#missionDialog").waitFor({ state: "hidden" });
  const saved = await waitForAutosave(page, toProfile);
  assert(saved.floor === Number(toProfile.match(/(\d+)-/)[1]), `andar inicial salvo: ${saved.floor}`);
  await page.reload();
  await page.locator("#rangeDialog[open]").waitFor();
  await page.locator("#resumeExpedition").waitFor({ state: "visible" });
  const resume = (await page.locator("#resumeExpedition").innerText()).replace(/\s+/g, " ");
  assert(resume.includes(toName), `Continuar deveria apontar para ${toName}: ${resume}`);
  assert((await page.locator(`button.range-card[data-range="${toProfile}"]`).getAttribute("aria-pressed")) === "true", "cartao da nova faixa deveria vir escolhido");
}

await mkdir(SHOT_DIR, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || "/usr/bin/google-chrome", args: ["--no-sandbox"] });
try {
  // 1-10: Avançar e Encerrar.
  for (const mode of ["avancar", "encerrar"]) {
    const { page, dialogs, context } = await openWithSession(browser, dungeonCompletedSession());
    await page.getByRole("button", { name: "Avançar para Floresta" }).waitFor();
    assert(await page.getByRole("button", { name: "Encerrar expedição" }).count() === 1, "Encerrar ausente em 1-10");
    if (mode === "avancar") {
      await page.screenshot({ path: `${SHOT_DIR}/faixa-1-10.png` });
      await advanceFlow(page, dialogs, "dungeon-1-10", "forest-11-20", "Floresta");
    } else {
      await waitForAutosave(page, "dungeon-1-10");
      await checkFinish(page);
    }
    await context.close();
    console.log(`ok 1-10 ${mode}`);
  }

  // Encerrar -> Iniciar masmorra na mesma sessao: o estado estendido concluido nao pode sobreviver.
  {
    const { page, context } = await openWithSession(browser, dungeonCompletedSession());
    await waitForAutosave(page, "dungeon-1-10");
    await checkFinish(page, false);
    await page.locator("#rangeConfirm").click();
    await page.locator("#missionDialog").waitFor({ state: "visible" });
    await page.getByRole("button", { name: "Continuar sem missões" }).click();
    await page.locator("#missionDialog").waitFor({ state: "hidden" });
    const saved = await waitForAutosave(page, "dungeon-1-10");
    assert(saved.floor === 1, `autosave deveria estar no andar 1: ${saved.floor}`);
    assert(saved.extendedState?.phase !== "completed", `fase nao deveria ser completed: ${saved.extendedState?.phase}`);
    const text = await page.locator("body").innerText();
    assert(/Andar 1\b/.test(text), "tela deveria mostrar Andar 1");
    assert(!text.includes("Andares 1-10 conquistados"), "tela nao deveria mostrar a faixa concluida");
    await context.close();
    console.log("ok 1-10 encerrar -> reiniciar masmorra");
  }

  // 11-20.
  for (const mode of ["avancar", "encerrar"]) {
    const { page, dialogs, context } = await openWithSession(browser, forestCompletedSession());
    assert((await page.locator("#advanceNodeFloorButton").innerText()) === "Faixa concluída", "bloco Faixa concluida ausente");
    await page.getByRole("button", { name: "Avançar para Arquipélago" }).waitFor();
    assert(await page.getByRole("button", { name: "Encerrar expedição" }).count() === 1, "Encerrar ausente em 11-20");
    if (mode === "avancar") {
      await page.screenshot({ path: `${SHOT_DIR}/faixa-11-20.png` });
      await advanceFlow(page, dialogs, "forest-11-20", "archipelago-21-30", "Arquipélago");
    } else {
      await waitForAutosave(page, "forest-11-20");
      await checkFinish(page);
    }
    await context.close();
    console.log(`ok 11-20 ${mode}`);
  }

  // 21-30: so Encerrar.
  {
    const { page, context } = await openWithSession(browser, archipelagoBossSession());
    await page.locator(".archipelago-island", { hasText: /^30/ }).click().catch(async () => {
      await page.locator(".archipelago-island").filter({ has: page.locator(".archipelago-island-floor", { hasText: /^30$/ }) }).click();
    });
    await page.locator(".archipelago-dialog[open]").waitFor();
    assert(await page.getByRole("button", { name: /Encerrar expedição/ }).count() === 0, "Encerrar so deve aparecer apos concluir o boss");
    await page.getByRole("button", { name: "Concluir boss" }).click();
    assert(await page.getByRole("button", { name: "Encerrar expedição" }).count() >= 1, "Encerrar ausente em 21-30");
    assert(await page.getByRole("button", { name: /Avançar para/ }).count() === 0, "21-30 nao deve oferecer Avancar");
    await page.screenshot({ path: `${SHOT_DIR}/faixa-21-30.png` });
    await waitForAutosave(page, "archipelago-21-30");
    await page.getByRole("button", { name: "Encerrar expedição" }).last().click();
    await page.locator("#rangeDialog[open]").waitFor();
    assert(await page.locator(".archipelago-dialog[open]").count() === 0, "dialogo da ilha deveria fechar");
    assert(await page.locator("#resumeExpedition").isHidden(), "Continuar deveria sumir");
    await page.waitForTimeout(300);
    assert((await readAutosave(page)) === null, "autosave deveria ter sido apagado");
    await page.reload();
    await page.locator("#rangeDialog[open]").waitFor();
    await page.waitForTimeout(500);
    assert(await page.locator("#resumeExpedition").isHidden(), "Continuar nao deveria aparecer apos recarregar");
    await context.close();
    console.log("ok 21-30 encerrar");
  }
  console.log("qa:range-end passou");
} finally {
  await browser.close();
}
