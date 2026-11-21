import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { chromium } from "@playwright/test";

import { dungeon1to10Profile } from "../src/floorProfiles/dungeon1to10.js";
import { createMissionGenerationContext, generateMissionOffers } from "../src/missions/missionGenerator.js";
import { encodeSessionCode } from "../src/sessionCode.js";

const APP_URL = process.env.QA_APP_URL || (process.argv.includes("--production") ? "http://localhost:4173/megadungeon/" : "http://localhost:5173/megadungeon/");
const OUTPUT_DIR = "tmp/floors-1-10-qa";

function createExtendedSession({ floor, mapSeed, mission = null, phase = null }) {
  return encodeSessionCode({
    v: 1,
    mode: dungeon1to10Profile.mode,
    profile: dungeon1to10Profile.id,
    floor,
    mapSeed,
    missions: {
      history: [],
      profileId: dungeon1to10Profile.id,
      selected: mission ? [{ ...mission, status: "selected" }] : [],
      selectionLocked: true
    },
    extendedState: {
      descentPending: false,
      elapsedMinutes: 0,
      failures: 0,
      floor,
      log: [],
      nextFloorTestEffects: [],
      pendingSceneEffects: [],
      pendingTestEffects: [],
      phase: phase || (floor === 10 ? "boss" : "exploring"),
      resetPending: false,
      successes: 0,
      usedApproachIds: []
    }
  });
}

function findFloorOneMission() {
  for (let index = 0; index < 500; index += 1) {
    const seed = `qa-floor-one-mission-${index}`;
    const offers = generateMissionOffers(createMissionGenerationContext({
      currentSeed: seed,
      profile: dungeon1to10Profile
    }));
    const mission = offers.find((offer) => offer.destination?.floor === 1);

    if (mission) return { mission, seed };
  }

  throw new Error("Nao foi possivel gerar uma missao para o andar 1.");
}

async function importSessionCode(page, sessionCode) {
  const dir = await mkdtemp(join(tmpdir(), "md-session-"));
  const file = join(dir, "sessao.txt");
  await writeFile(file, sessionCode);
  try {
    await page.locator("#sessionFile").setInputFiles(file);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

async function loadSession(page, sessionCode) {
  await page.goto(APP_URL);
  await page.locator("#rangeDialog").waitFor({ state: "visible" });
  await importSessionCode(page, sessionCode);
  await page.locator("#rangeDialog").waitFor({ state: "hidden" });
}

async function assertNoHorizontalOverflow(page, selector) {
  const result = await page.locator(selector).evaluate((element) => ({
    clientWidth: element.clientWidth,
    scrollWidth: element.scrollWidth
  }));

  if (result.scrollWidth > result.clientWidth + 2) {
    throw new Error(`${selector} possui overflow horizontal: ${result.scrollWidth} > ${result.clientWidth}`);
  }
}

async function runMainFlow(browser) {
  const page = await browser.newPage({ viewport: { width: 1366, height: 900 } });
  await page.goto(APP_URL);
  await page.locator(`[data-range="${dungeon1to10Profile.id}"]`).click();
  await page.locator("#rangeConfirm").click();
  await page.locator("#missionDialog").waitFor({ state: "visible" });

  const offers = await page.locator(".mission-card.is-selectable").count();
  if (offers < 1 || offers > 8) throw new Error(`Quadro gerou ${offers} ofertas.`);
  await assertNoHorizontalOverflow(page, "#missionDialog");
  await page.getByRole("button", { name: "Continuar sem missões" }).click();

  await page.getByRole("heading", { name: "Andar 1" }).waitFor();
  if (await page.locator(".extended-controls select option").count() !== 10) {
    throw new Error("Andar 1 nao exibiu 10 acoes de exploracao.");
  }
  await assertNoHorizontalOverflow(page, "body");

  await page.locator("#settingsToggle").click();
  if (await page.locator("#floorInput").isDisabled()) {
    throw new Error("Seletor de andar iniciou bloqueado antes de qualquer acao.");
  }
  if (await page.locator("#generateButton").isDisabled()) {
    throw new Error("Botao de iniciar andar iniciou bloqueado antes de qualquer acao.");
  }

  const approach = page.locator(".extended-controls select");
  const success = page.getByRole("button", { name: "Sucesso", exact: true });
  for (let index = 0; index < 3; index += 1) {
    await approach.selectOption({ index });
    await success.click();

    if (index === 0) {
      if (!(await page.locator("#floorInput").isDisabled())) {
        throw new Error("Seletor de andar permaneceu liberado apos a primeira acao.");
      }
      if (!(await page.locator("#generateButton").isDisabled())) {
        throw new Error("Botao de iniciar andar permaneceu liberado apos a primeira acao.");
      }
    }
  }

  await page.getByRole("button", { name: "Marcar ameaça resolvida" }).waitFor();
  await page.getByRole("button", { name: "Abrir encontro completo" }).click();
  await page.locator(".scene-modal-panel").waitFor();
  await assertNoHorizontalOverflow(page, ".scene-modal-panel");
  await page.screenshot({ path: `${OUTPUT_DIR}/desktop-final-encounter.png`, fullPage: true });
  await page.keyboard.press("Escape");
  await page.locator(".scene-modal-panel").waitFor({ state: "detached" });

  await page.getByRole("button", { name: "Marcar ameaça resolvida" }).click();
  await page.getByRole("button", { name: "Descer para o próximo andar" }).click();
  await page.getByRole("heading", { name: "Andar 2" }).waitFor();
  await page.close();
}

async function runInitialFloorSelection(browser) {
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });

  await page.goto(APP_URL);
  await page.locator(`[data-range="${dungeon1to10Profile.id}"]`).click();
  await page.locator("#rangeConfirm").click();
  await page.locator("#missionDialog").waitFor({ state: "visible" });
  await page.getByRole("button", { name: "Continuar sem missões" }).click();
  await page.getByRole("heading", { name: "Andar 1" }).waitFor();
  await page.locator("#settingsToggle").click();
  await page.locator("#floorInput").selectOption("5");
  await page.locator("#generateButton").click();
  await page.getByRole("heading", { name: "Andar 5" }).waitFor();

  const approach = page.locator(".extended-controls select");
  await approach.selectOption({ index: 0 });
  await page.getByRole("button", { name: "Sucesso", exact: true }).click();
  if (!(await page.locator("#floorInput").isDisabled())) {
    throw new Error("Andar inicial alternativo nao foi bloqueado depois da primeira acao.");
  }
  if (await page.locator("#floorInput").inputValue() !== "5") {
    throw new Error("Bloqueio alterou o andar inicial escolhido.");
  }

  await page.close();
}

async function runMissionFlow(browser) {
  const { mission, seed } = findFloorOneMission();
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  await loadSession(page, createExtendedSession({ floor: 1, mapSeed: seed, mission }));

  await page.locator(".mission-inline-indicator").waitFor();
  await page.getByRole("button", { name: "Realizar missão" }).click();
  await page.locator("#missionDialog").waitFor({ state: "visible" });
  await page.getByText("Mapa tático da missão", { exact: false }).first().waitFor();
  await assertNoHorizontalOverflow(page, "#missionDialog");
  await page.screenshot({ path: `${OUTPUT_DIR}/tablet-floor-mission.png`, fullPage: true });
  await page.close();
}

async function runBossFlow(browser) {
  const page = await browser.newPage({ viewport: { width: 1366, height: 900 } });
  await loadSession(page, createExtendedSession({ floor: 10, mapSeed: "qa-boss" }));
  await page.getByRole("heading", { name: "Sala da Matriarca Aracnídea" }).waitFor();
  await page.getByRole("button", { name: "Abrir encontro da Matriarca" }).click();
  await page.locator(".scene-modal-panel").waitFor();
  await page.getByText(/20x14/).first().waitFor();
  await page.screenshot({ path: `${OUTPUT_DIR}/desktop-boss.png`, fullPage: true });
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "Marcar Matriarca derrotada" }).click();
  await page.getByRole("heading", { name: "Andares 1-10 conquistados!" }).waitFor();
  await page.close();
}

async function runMobileSmoke(browser) {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await loadSession(page, createExtendedSession({ floor: 1, mapSeed: "qa-mobile" }));
  await page.getByRole("heading", { name: "Andar 1" }).waitFor();
  await assertNoHorizontalOverflow(page, "body");
  await page.screenshot({ path: `${OUTPUT_DIR}/mobile-floor-1.png`, fullPage: true });
  await page.close();
}

async function runEmptyEncounterRegression(browser) {
  for (let attempt = 0; attempt < 20; attempt += 1) {
    const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
    await loadSession(page, createExtendedSession({ floor: 9, mapSeed: `qa-empty-${attempt}` }));
    await page.locator(".extended-controls input").fill("20");
    await page.getByRole("button", { name: "Falha", exact: true }).click();
    await page.getByText("Encontro fácil", { exact: false }).first().waitFor();
    const hasOpenButton = await page.getByRole("button", { name: "Abrir cena completa" }).count();

    if (!hasOpenButton) {
      await page.screenshot({ path: `${OUTPUT_DIR}/empty-encounter-floor-9.png`, fullPage: true });
      await page.close();
      throw new Error(`Encontro vazio reapareceu na amostra ${attempt + 1}.`);
    }

    await page.close();
  }
}

await mkdir(OUTPUT_DIR, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: process.env.QA_CHROME || "/usr/bin/google-chrome", args: ["--no-sandbox"] });

try {
  await runInitialFloorSelection(browser);
  await runMainFlow(browser);
  await runMissionFlow(browser);
  await runBossFlow(browser);
  await runMobileSmoke(browser);
  await runEmptyEncounterRegression(browser);
  console.log("QA visual 1-10 passou; 20 encontros fáceis do andar 9 abriram cenas completas.");
} finally {
  await browser.close();
}
