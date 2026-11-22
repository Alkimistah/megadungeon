import assert from "node:assert/strict";
import test from "node:test";
import { archipelago21to30Profile } from "../src/floorProfiles/archipelago21to30.js";
import { createArchipelagoState } from "../src/archipelagoState.js";
import { createRng } from "../src/random.js";

test("sessão salva com ícone .svg antigo restaura o .webp do tema", () => {
  const generated = createArchipelagoState(archipelago21to30Profile, createRng("icones"));
  const saved = generated.exportSessionState();
  const legacyIslands = Object.fromEntries(Object.entries(saved.islands).map(([floor, island]) => [
    floor,
    { ...island, icon: island.icon.replace(/\.webp$/, ".svg") }
  ]));

  const restored = createArchipelagoState(archipelago21to30Profile, createRng("outra"));
  restored.initialize(archipelago21to30Profile, createRng("outra"), { ...saved, islands: legacyIslands });

  for (const island of restored.getSnapshot().islands) {
    assert.match(island.icon, /\.webp$/, `ilha ${island.floor} manteve ${island.icon}`);
    assert.equal(island.icon, saved.islands[island.floor].icon);
  }
});

test("ícone de ilha sem tema conhecido é preservado", () => {
  const state = createArchipelagoState(archipelago21to30Profile, createRng("x"));
  const saved = state.exportSessionState();
  const islands = { ...saved.islands, 21: { ...saved.islands[21], themeId: "inexistente", icon: "/custom.webp" } };
  state.initialize(archipelago21to30Profile, createRng("x"), { ...saved, islands });
  assert.equal(state.getSnapshot().islands[0].icon, "/custom.webp");
});


function setupPilot() {
  const profile = archipelago21to30Profile;
  const state = createArchipelagoState(profile, () => 0.99);
  const island = (target = state) => target.getSnapshot().islands.find(entry => entry.themeId === "mangrove");
  return { profile, state, island, floor: island().floor };
}

test("Manguezal abre o Centro com quatro falhas e só concede fragmento após vitória", () => {
  const { state, island, floor } = setupPilot();
  assert.deepEqual(island().objectives.map(item => item.direction), ["N", "S", "L", "O"]);
  assert.ok(state.exploreIsland(floor, { mapSeed: "mesa" }));
  assert.equal(state.startGuardian(floor), false);
  for (const item of [...island().objectives].reverse()) assert.ok(state.resolveObjective(floor, item.id, "failure"));
  assert.equal(island().guardian.effects.length, 0);
  assert.ok(state.startGuardian(floor));
  assert.equal(state.restAtBoat(), false);
  assert.equal(state.getSnapshot().fragments, 0);
  assert.ok(state.completeIsland(floor));
  assert.equal(state.getSnapshot().fragments, 1);
  assert.equal(island().guardian.crystal.total, 1300);
});

test("Manguezal restaura sucessos e reabre um setor com outra tarefa ao retornar", () => {
  const { profile, state, island, floor } = setupPilot();
  assert.ok(state.exploreIsland(floor, { mapSeed: "mesa" }));
  for (const item of island().objectives) assert.ok(state.resolveObjective(floor, item.id, "success"));
  assert.equal(island().guardian.effects.length, 4);
  assert.equal(island().guardian.ready, true);
  const restored = createArchipelagoState(profile, () => 0.99);
  restored.initialize(profile, () => 0.99, JSON.parse(JSON.stringify(state.exportSessionState())));
  assert.ok(restored.restAtBoat());
  assert.ok(restored.exploreIsland(floor, { mapSeed: "mesa", rng: () => 0 }));
  const reopened = island(restored).objectives.find(item => !item.resolved);
  assert.notEqual(reopened.variant, island().objectives.find(item => item.id === reopened.id).variant);
  assert.equal(reopened.rewardEarned, true);
  assert.deepEqual(restored.getSnapshot().activeExploration.reopenedSector, { id: reopened.id, name: reopened.name, lostSuccess: true });
  assert.equal(restored.exportSessionState().activeExploration.reopenedSector.id, reopened.id);
  assert.equal(restored.startGuardian(floor), false);
  assert.ok(restored.resolveObjective(floor, reopened.id, "failure"));
  assert.equal(island(restored).guardian.effects.length, 3);
  assert.ok(restored.startGuardian(floor));
  assert.ok(restored.loseGuardian(floor));
  assert.equal(restored.completeIsland(floor), false);
  assert.equal(restored.getSnapshot().fragments, 0);
});

test("tarefas sem combate pagam menos que o combate e saves antigos recebem a calibragem", () => {
  const { profile, state, floor, island } = setupPilot();
  const save = JSON.parse(JSON.stringify(state.exportSessionState()));
  const variants = [0, 1, 1, 0];
  const old = save.islands[floor];
  old.objectives.forEach((item, index) => {
    item.variant = variants[index];
    item.description = "Teste antigo";
    item.challenge = 6;
  });
  old.outcomes = { [old.objectives[1].id]: "success" };
  old.earnedRewards = { [old.objectives[0].id]: true };
  state.initialize(profile, () => 0.99, save);
  const objectives = island().objectives;
  assert.deepEqual(objectives.map(item => item.challenge), [3, 6, 2, 3]);
  assert.match(objectives[0].description, /3 sucessos antes de 2 falhas/i);
  assert.equal(objectives[1].outcome, "success");
  assert.equal(objectives[0].rewardEarned, true);
});

test("quatro sucessos ajustam a ficha do capitão e preservam a ficha da Tempestade de Lagartos", () => {
  const { state, floor, island } = setupPilot();
  assert.ok(state.exploreIsland(floor));
  for (const objective of island().objectives) state.resolveObjective(floor, objective.id, "success");
  assert.ok(state.startGuardian(floor));
  const [leader, support] = island().guardian.scene.resolvedEncounter.items;
  const { hitPoints, defense, initiative, perception, fortitude, reflex, will } = leader.creatureData.stats;
  assert.deepEqual([hitPoints, defense, initiative, perception, fortitude, reflex, will], [247, 27, 8, 8, 18, 13, 8]);
  assert.equal(support.creatureId, "tempestade-de-lagartos");
  assert.equal(support.creatureData, undefined);
});

test("Manguezal prepara o combate ao abrir um setor ativo e calibra a recuperação", () => {
  const { profile, state, floor, island } = setupPilot();
  const save = JSON.parse(JSON.stringify(state.exportSessionState()));
  save.islands[floor].objectives[2].variant = 1;
  save.islands[floor].objectives[3].variant = 1;
  state.initialize(profile, () => 0.99, save);
  const [north, , east, west] = island().objectives;
  assert.equal(north.type, "combate");
  assert.equal(state.openSector(floor, north.id), false);
  assert.match(east.description, /CD 24/);
  assert.match(west.description, /3 sucessos antes de 2 falhas/);
  assert.match(west.description, /Investigação.*Religião.*Atletismo/);
  assert.equal(west.challenge, 2);
  assert.ok(state.exploreIsland(floor));
  assert.ok(state.openSector(floor, north.id));
  assert.ok(island().objectives[0].scene.resolvedEncounter.items.length > 0);
});

test("novos Manguezais favorecem combate em cada setor e ainda admitem zero ou quatro", () => {
  const counts = Array(5).fill(0);
  const optionsByDirection = new Map();
  for (let index = 0; index < 1000; index++) {
    const state = createArchipelagoState(archipelago21to30Profile, createRng(`variedade-${index}`));
    const island = state.getSnapshot().islands.find(entry => entry.pilot === "mangrove-sectors");
    if (!island) continue;
    const combats = island.objectives.filter(item => item.type === "combate");
    counts[combats.length]++;
    for (const { direction, title } of combats) {
      if (!optionsByDirection.has(direction)) optionsByDirection.set(direction, new Set());
      optionsByDirection.get(direction).add(title);
    }
  }
  const islands = counts.reduce((total, count) => total + count, 0);
  const average = counts.reduce((total, count, combats) => total + count * combats, 0) / islands;
  assert.ok(counts.every(count => count > 0), counts);
  assert.ok(average >= 2.65 && average <= 2.95, `média ${average}`);
  assert.deepEqual([...optionsByDirection.values()].map(options => options.size), [3, 3, 3, 3]);
});

test("composição sorteada do guardião pode ser inspecionada e fica estável até o início", () => {
  const { profile, state, floor, island } = setupPilot();
  assert.ok(state.exploreIsland(floor, { mapSeed: "guardiao" }));
  for (const objective of island().objectives) state.resolveObjective(floor, objective.id, "success");
  const preview = island().guardian.preview;
  assert.ok(preview.resolvedEncounter.items.length);
  assert.equal(island().guardian.scene, undefined);
  const restored = createArchipelagoState(profile, createRng("outra-semente"));
  restored.initialize(profile, createRng("outra-semente"), JSON.parse(JSON.stringify(state.exportSessionState())));
  assert.deepEqual(island(restored).guardian.preview, preview);
  assert.ok(restored.startGuardian(floor));
  assert.deepEqual(island(restored).guardian.scene, preview);
});
