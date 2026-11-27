import assert from "node:assert/strict";
import test from "node:test";
import { createArchipelagoState } from "../src/archipelagoState.js";
import { calculateCombatND } from "../src/challenge.js";
import { archipelago21to30Profile as profile } from "../src/floorProfiles/archipelago21to30.js";
import { createRng } from "../src/random.js";

const themeId = "abandoned-ship";
const theme = profile.archipelago.themePools.intermediate.find(({ id }) => id === themeId);

function prepareCabin(composition) {
  const seed = Array.from({ length: 25 }, (_, index) => `navio-abandonado-${index}`).find(candidate =>
    createArchipelagoState(profile, createRng(candidate)).getSnapshot().islands.some(island => island.themeId === themeId)
  );
  assert.ok(seed, "Nenhuma expedição nova sorteou o Navio Abandonado.");
  const state = createArchipelagoState(profile, createRng(seed));
  const getIsland = () => state.getSnapshot().islands.find(island => island.themeId === themeId);
  const { floor } = getIsland();
  assert.ok(floor >= 25 && floor <= 27);
  const saved = state.exportSessionState();
  saved.completedFloors = [...profile.archipelago.unlockRules.intermediateRequires];
  saved.islands[floor].guardianComposition = composition;
  state.initialize(profile, createRng(seed), saved);
  assert.ok(state.exploreIsland(floor, { mapSeed: seed }));
  assert.equal(getIsland().arenaName, "Cabine do Capitão");
  assert.equal(getIsland().objectives.length, 6);
  assert.equal(getIsland().victoryNarrative, undefined);
  for (const objective of getIsland().objectives) assert.ok(state.resolveObjective(floor, objective.id, "success"));
  assert.ok(state.startGuardian(floor));
  assert.equal(calculateCombatND(getIsland().guardian.scene.resolvedEncounter.items), 9);
  assert.equal(getIsland().victoryNarrative, undefined);
  return { state, getIsland, floor, seed };
}

test("o tema está ativo e a noite eterna só termina no desfecho da ilha", () => {
  assert.ok(profile.archipelago.enabledThemeIds.includes(themeId));
  assert.match(theme.narrative, /noite eterna/);
  assert.match(theme.victoryNarrative, /sol.*caixão.*fragmento.*maldição/i);
});

for (const composition of ["passageiro-da-ultima-viagem", "capitao-e-vigia", "sombra-do-caixao"]) {
  test(`vitória contra ${composition} encerra a noite e revela um fragmento`, () => {
    const { state, getIsland, floor, seed } = prepareCabin(composition);
    const fragments = state.getSnapshot().fragments;

    assert.ok(state.completeIsland(floor));
    assert.ok(getIsland().completed);
    assert.equal(getIsland().victoryNarrative, theme.victoryNarrative);
    assert.ok(state.getSnapshot().log[0].includes(theme.victoryNarrative));
    assert.equal(state.getSnapshot().fragments, fragments + 1);
    assert.equal(state.completeIsland(floor), false);

    const restored = JSON.parse(JSON.stringify(state.exportSessionState()));
    state.initialize(profile, createRng(seed), restored);
    assert.equal(getIsland().victoryNarrative, theme.victoryNarrative);
    assert.equal(state.getSnapshot().fragments, fragments + 1);
  });
}

test("a derrota na cabine preserva a maldição e não entrega o fragmento", () => {
  const { state, getIsland, floor } = prepareCabin("sombra-do-caixao");
  const fragments = state.getSnapshot().fragments;
  assert.ok(state.loseGuardian(floor));
  assert.equal(getIsland().victoryNarrative, undefined);
  assert.equal(getIsland().completed, false);
  assert.equal(state.getSnapshot().fragments, fragments);
});
