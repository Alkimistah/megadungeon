import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { createArchipelagoState } from "../src/archipelagoState.js";
import { archipelago21to30Profile as profile } from "../src/floorProfiles/archipelago21to30.js";
import { createRng } from "../src/random.js";
import { calculateCombatND } from "../src/challenge.js";

test("expedições novas sorteiam a Ilha de Cristal na fileira intermediária", () => {
  assert.ok(profile.archipelago.enabledThemeIds.includes("crystal"));
  const islands = Array.from({ length: 20 }, (_, index) =>
    createArchipelagoState(profile, createRng(`cristal-${index}`)).getSnapshot().islands
  ).flat().filter(island => island.themeId === "crystal");
  assert.ok(islands.length);
  for (const island of islands) {
    assert.ok(island.floor >= 25 && island.floor <= 27);
    assert.equal(island.arenaName, "Prisma da Maré");
    assert.equal(island.objectives.length, 6);
  }
});

test("sessão anterior à ativação da Ilha de Cristal conserva as ilhas e os objetivos", () => {
  const saved = JSON.parse(readFileSync(new URL("./fixtures/archipelago-sessao-antes-cristal.json", import.meta.url), "utf8"));
  const state = createArchipelagoState(profile, () => 0.5);
  state.initialize(profile, () => 0.5, structuredClone(saved));
  assert.deepEqual(state.exportSessionState().islands, saved.islands);
});

test("estado da expedição rerrola um combate aberto na Ilha de Cristal", () => {
  const seed = Array.from({ length: 20 }, (_, index) => `cristal-${index}`).find(candidate =>
    createArchipelagoState(profile, createRng(candidate)).getSnapshot().islands.some(island =>
      island.themeId === "crystal" && island.objectives.some(objective => objective.type === "combate"))
  );
  assert.ok(seed);
  const state = createArchipelagoState(profile, createRng(seed));
  const getIsland = () => state.getSnapshot().islands.find(({ themeId }) => themeId === "crystal");
  const saved = state.exportSessionState();
  saved.completedFloors = [...profile.archipelago.unlockRules.intermediateRequires];
  state.initialize(profile, createRng(seed), saved);
  const { floor, objectives } = getIsland();
  const { id } = objectives.find(({ type }) => type === "combate");
  const encounter = () => getIsland().objectives.find(objective => objective.id === id).scene.resolvedEncounter;
  const composition = () => encounter().items.map(({ creatureId, quantity }) => [creatureId, quantity]).sort();
  assert.ok(state.exploreIsland(floor, { mapSeed: seed }));
  assert.ok(state.openSector(floor, id));
  const original = composition();
  assert.ok(state.rerollSector(floor, id));
  assert.notDeepEqual(composition(), original);
  assert.equal(calculateCombatND(encounter().items), 7);
});
