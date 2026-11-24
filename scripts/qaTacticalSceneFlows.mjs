import assert from "node:assert/strict";
import { chromium } from "@playwright/test";
import { createArchipelagoState } from "../src/archipelagoState.js";
import { archipelago21to30Profile as profile } from "../src/floorProfiles/archipelago21to30.js";
import { createMissionGenerationContext, generateMissionOffers } from "../src/missions/missionGenerator.js";
import { createRng } from "../src/random.js";
import { encodeSessionCode } from "../src/sessionCode.js";

const url = process.env.QA_APP_URL || "http://localhost:5173/megadungeon/";
const browser = await chromium.launch({ executablePath: process.env.QA_CHROME || "/usr/bin/google-chrome", args: ["--no-sandbox"] });
const seed = "grade-tatica-qa-arquipelago";
const state = createArchipelagoState(profile, createRng(seed));
const worldDraft = { islands: state.getSnapshot().islands };
const island = worldDraft.islands.find(item => item.available && item.objectives.some(objective => objective.type === "combate"));
const sector = island.objectives.find(objective => objective.type === "combate");
const mission = generateMissionOffers(createMissionGenerationContext({ currentSeed: seed, profile, worldDraft }))
  .find(offer => offer.destination.floor === island.floor);
assert.ok(mission);
assert.ok(state.exploreIsland(island.floor, { mapSeed: seed }));
assert.ok(state.openSector(island.floor, sector.id));

let page;
let board;
let encounter;
let islandDialog;
const errors = [];
const position = piece => piece.evaluate(element => element.style.getPropertyValue("--piece-x"));

async function load() {
  await page?.close();
  page = await browser.newPage({ viewport: { width: 940, height: 900 }, serviceWorkers: "block" });
  page.setDefaultTimeout(8000);
  page.on("pageerror", error => errors.push(error.message));
  board = page.locator(".tactical-map-fullscreen[open]");
  encounter = page.locator(".archipelago-encounter-dialog[open]");
  islandDialog = page.locator("dialog.archipelago-dialog:not(.archipelago-encounter-dialog)[open]");
  const session = encodeSessionCode({
    v: 1, mode: profile.mode, profile: profile.id, floor: island.floor,
    mapSeed: seed, unknownPaths: false, tacticalPartySize: 6,
    missions: { profileId: profile.id, selected: [{ ...mission, status: "selected" }], selectionLocked: true, history: [] },
    archipelagoState: state.exportSessionState()
  });
  await page.goto(url);
  await page.locator("#rangeDialog[open]").waitFor();
  await page.locator("#sessionFile").setInputFiles({ name: "grade-qa.txt", mimeType: "text/plain", buffer: Buffer.from(session) });
  await page.locator("#rangeDialog").waitFor({ state: "hidden" });
  await page.locator(".archipelago-island").first().waitFor();
}

async function openIsland() {
  await page.locator(".archipelago-island").filter({ has: page.getByText(island.name, { exact: true }) }).click();
}

async function openBoard() {
  await encounter.getByRole("button", { name: "Abrir mapa tático" }).click();
  await board.locator(".tactical-piece.is-ally").first().waitFor();
  assert.equal(await board.locator(".tactical-piece.is-ally").count(), 6);
}

try {
  await load();
  await openIsland();
  await islandDialog.locator(`[data-direction="${sector.direction}"]`).click();
  await openBoard();
  const player = board.getByRole("button", { name: "Jogador 1", exact: true });
  const original = await position(player);
  await player.press("ArrowRight");
  assert.notEqual(await position(player), original);
  const moved = await position(player);
  await board.getByRole("button", { name: "Fechar", exact: true }).click();
  await openBoard();
  assert.equal(await position(player), moved);
  await board.getByRole("button", { name: "Fechar", exact: true }).click();
  await encounter.getByRole("button", { name: "Voltar para a ilha" }).click();
  await islandDialog.locator(".archipelago-mission-access").first().click();
  const missionDialog = page.locator("#missionDialog[open]");
  await missionDialog.getByRole("button", { name: "Expandir" }).click();
  await board.getByRole("button", { name: "Jogador 1", exact: true }).waitFor();
  assert.ok(await board.locator(".tactical-overlay.is-objective, .tactical-overlay.is-mechanism").count());
  await board.getByRole("button", { name: "Fechar", exact: true }).click();
  await page.locator("#missionClose").click();
  await islandDialog.locator(`[data-direction="${sector.direction}"]`).click();
  await openBoard();
  assert.equal(await position(player), original);

  for (const objective of island.objectives) assert.ok(state.resolveObjective(island.floor, objective.id, "success"));
  assert.ok(state.startGuardian(island.floor));
  await load();
  if (!await encounter.isVisible()) await openIsland();
  await openBoard();
  assert.ok(await board.locator(".tactical-piece.is-boss").count());
  await board.getByRole("button", { name: "Fechar", exact: true }).click();

  assert.ok(state.loseGuardian(island.floor));
  assert.ok(state.restAtBoat({ rng: () => 0, mapSeed: seed }));
  await load();
  await openBoard();
  assert.ok(await board.locator(".tactical-cell.is-deck").count());
  assert.ok(await board.locator(".tactical-cell.is-deep-water").count());
  assert.deepEqual(errors, []);
  console.log("Setor, arena, liburna, mapa de missão, configuração em sessão antiga e troca de encontro: passaram.");
} finally {
  await browser.close();
}
