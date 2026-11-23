import assert from "node:assert/strict";
import test from "node:test";
import { archipelago21to30Profile } from "../src/floorProfiles/archipelago21to30.js";
import { createArchipelagoState } from "../src/archipelagoState.js";
import { createRng } from "../src/random.js";
import { guardianPenalties } from "../src/archipelagoGuardianPenalties.js";
import { withIslandTacticalLayout } from "../src/archipelagoTacticalMap.js";
import { createNodeTacticalMap } from "../src/nodeTacticalMap.js";
import { calculateCombatND } from "../src/challenge.js";
import { creatureCatalog, getCreatureById } from "../src/creatureCatalog/index.js";
import { withCreatureHealthChange } from "../src/encounterCreatureHealth.js";
import { createIslandGuardian, createIslandSector, createIslandSectorCombat } from "../src/archipelagoPilot.js";

test("as variantes das quatro ilhas têm combates ND 6 temáticos e mapas com pontos de interação", () => {
  const profile = archipelago21to30Profile;
  const objectiveCounts = { mangrove: [5, 5, 4, 5], tropical: [4, 4, 4, 4], atoll: [4, 4, 4, 4], "coral-coast": [4, 4, 4, 4] };
  const islands = createArchipelagoState(profile, createRng("variantes iniciais")).getSnapshot().islands.slice(0, 4);
  for (const island of islands) {
    objectiveCounts[island.themeId].forEach((count, sector) => {
      for (let variant = 0; variant < count; variant += 1) {
        const objective = createIslandSector(island, sector, variant, profile.recommendations.baseDcByFloor[island.floor]);
        if (objective.type !== "combate") continue;
        const seed = `${island.themeId}:${sector}:${variant}`;
        const scene = createIslandSectorCombat(island, objective, profile, seed);
        assert.ok(scene.creature.allowedCreatureIds.length, objective.title);
        const { items } = scene.resolvedEncounter;
        assert.equal(calculateCombatND(items), 6, objective.title);
        for (const item of items) {
          assert.ok(scene.creature.allowedCreatureIds.includes(item.creatureData?.baseCreatureId ?? item.creatureId), objective.title);
        }
        const map = createNodeTacticalMap(withIslandTacticalLayout(scene, island.themeId, objective));
        assert.equal(map.cells[map.landmark.index], "mechanism", objective.title);
        assert.ok(map.cells.some(cell => ["water", "current", "swamp", "obstacle", "slope"].includes(cell)), objective.title);
      }
    });

    const outcomes = Object.fromEntries(island.objectives.map(objective => [objective.id, "failure"]));
    const guardian = createIslandGuardian({ ...island, outcomes }, island.guardianComposition, profile, "centro");
    assert.equal(guardian.resolvedEncounter.budget.creatures, 8);
    assert.ok(guardian.briefing);
    const map = createNodeTacticalMap(withIslandTacticalLayout(guardian, island.themeId));
    assert.equal(map.cells[map.landmark.index], "mechanism");
  }
});

test("sessão anterior mantém a terceira composição original do Atol", () => {
  const profile = archipelago21to30Profile;
  const rng = () => 0.99;
  const state = createArchipelagoState(profile, rng);
  const getAtoll = () => state.getSnapshot().islands.find(island => island.themeId === "atoll");
  const { floor, objectives } = getAtoll();
  const saved = JSON.parse(JSON.stringify(state.exportSessionState()));
  saved.islands[floor].guardianComposition = 2;
  state.initialize(profile, rng, saved);
  assert.ok(state.exploreIsland(floor, { mapSeed: "atol antigo" }));
  for (const objective of objectives) assert.ok(state.resolveObjective(floor, objective.id, "failure"));
  assert.equal(getAtoll().guardian.preview.resolvedEncounter.items[0].creatureId, "armento-de-burafontes");
});

test("um setor sem composição elegível pode ser aberto novamente com outros livros habilitados", () => {
  const profile = {
    ...archipelago21to30Profile,
    disabledCreatureBooks: [...new Set(creatureCatalog.flatMap(item => (item.sources ?? [item.source]).map(source => source?.book)))]
  };
  const rng = () => 0.99;
  const state = createArchipelagoState(profile, rng);
  const getAtoll = () => state.getSnapshot().islands.find(island => island.themeId === "atoll");
  const { floor, objectives } = getAtoll();
  const objective = objectives.find(item => item.type === "combate");
  const getEncounter = () => getAtoll().objectives.find(item => item.id === objective.id).scene.resolvedEncounter;
  assert.ok(state.exploreIsland(floor, { mapSeed: "livros" }));
  assert.ok(state.openSector(floor, objective.id));
  assert.ok(!getEncounter());
  const saved = JSON.parse(JSON.stringify(state.exportSessionState()));
  profile.disabledCreatureBooks = [];
  state.initialize(profile, rng, saved);
  assert.ok(state.openSector(floor, objective.id));
  assert.equal(calculateCombatND(getEncounter().items), 6);
});

test("um combate antigo da Costa pode trocar o rinoceronte por criaturas do recife até sofrer dano", () => {
  const profile = archipelago21to30Profile;
  const rng = () => 0.99;
  const state = createArchipelagoState(profile, rng);
  const getCoast = () => state.getSnapshot().islands.find(island => island.themeId === "coral-coast");
  const { floor, objectives } = getCoast();
  const objective = objectives.find(item => item.type === "combate");
  assert.ok(state.exploreIsland(floor, { mapSeed: "recife salvo" }));
  assert.ok(state.openSector(floor, objective.id));
  const saved = JSON.parse(JSON.stringify(state.exportSessionState()));
  const oldScene = saved.islands[floor].scenes[objective.id];
  delete oldScene.creature.allowedCreatureIds;
  oldScene.resolvedEncounter.items = [{ kind: "creature", creatureId: "rinoceronte-lanoso", challengeRating: 6, quantity: 1 }];
  state.initialize(profile, rng, saved);
  assert.ok(state.rerollSector(floor, objective.id));
  const getScene = () => getCoast().objectives.find(item => item.id === objective.id).scene;
  assert.equal(calculateCombatND(getScene().resolvedEncounter.items), 6);
  assert.ok(getScene().resolvedEncounter.items.every(item => item.creatureId !== "rinoceronte-lanoso"));
  const rerolled = JSON.parse(JSON.stringify(state.exportSessionState()));
  state.initialize(profile, rng, rerolled);
  const scene = getScene();
  assert.equal(scene.resolvedEncounter.creatureRerolls, 1);
  scene.resolvedEncounter = withCreatureHealthChange(scene.resolvedEncounter, scene.resolvedEncounter.items[0], 0, 1);
  assert.equal(state.rerollSector(floor, objective.id), false);
});

test("combates da Tropical respeitam o tipo da cena e mostram seus mecanismos no mapa", () => {
  const profile = archipelago21to30Profile;
  const expected = { N: "Comporta", S: "Contrapeso de jade", L: "Pedestal do alarme", O: "Roda de trava" };
  const seen = new Set();
  for (let roll = 0; roll < 24; roll += 1) {
    const seed = `cenas tropicais ${roll}`;
    const state = createArchipelagoState(profile, createRng(seed));
    const getIsland = () => state.getSnapshot().islands.find(item => item.themeId === "tropical");
    const { floor, objectives } = getIsland();
    assert.ok(state.exploreIsland(floor, { mapSeed: seed }));
    for (const objective of objectives.filter(item => item.type === "combate")) {
      assert.ok(state.openSector(floor, objective.id));
      const { scene } = getIsland().objectives.find(item => item.id === objective.id);
      const { items } = scene.resolvedEncounter;
      assert.equal(calculateCombatND(items), 6);
      if (objective.preferredType) {
        assert.ok(items.every(item => (item.creatureData ?? getCreatureById(item.creatureId)).type === objective.preferredType));
      }
      const map = createNodeTacticalMap(withIslandTacticalLayout(scene, "tropical", objective));
      assert.equal(map.landmark.label, expected[objective.direction]);
      assert.equal(map.cells[map.landmark.index], "mechanism");
      seen.add(objective.direction);
    }
  }
  assert.deepEqual([...seen].sort(), Object.keys(expected).sort());
});

test("a Costa do Coral restaura as quatro cenas e tem três composições de combate ND 8", () => {
  const profile = archipelago21to30Profile;
  const guards = [[0, "elfo-do-mar-chefe"], [0.5, "lula-gigante"], [0.99, "reishid"]];
  for (const [roll, creatureId] of guards) {
    const rng = () => roll;
    const state = createArchipelagoState(profile, rng);
    const getCoast = () => state.getSnapshot().islands.find(island => island.themeId === "coral-coast");
    const { floor, objectives } = getCoast();
    assert.deepEqual(objectives.map(item => item.name), ["Jardim de corais", "Parede do recife", "Grutas inundadas", "Santuário das pérolas"]);
    assert.ok(state.exploreIsland(floor, { mapSeed: "recife" }));
    assert.equal(state.startGuardian(floor), false);
    for (const objective of objectives) assert.ok(state.resolveObjective(floor, objective.id, "success"));
    const saved = JSON.parse(JSON.stringify(state.exportSessionState()));
    state.initialize(profile, rng, saved);
    const { preview, effects } = getCoast().guardian;
    assert.equal(effects.length, 4);
    assert.equal(preview.environment.terrain.name, "Recife de coral");
    assert.equal(preview.resolvedEncounter.items[0].creatureId, creatureId);
    assert.equal(preview.resolvedEncounter.budget.creatures, 8);
    assert.ok(state.startGuardian(floor));
    assert.ok(state.completeIsland(floor));
    assert.equal(state.getSnapshot().fragments, 1);
  }
});

test("o Atol conclui a expedição com os três guardiões ND 8 possíveis", () => {
  const profile = archipelago21to30Profile;
  const guards = [[0, "agua-viva-gigante"], [0.5, "capitao-do-conclave-pirata"], [0.99, "selako-tigre"]];
  for (const [roll, creatureId] of guards) {
    const rng = () => roll;
    const state = createArchipelagoState(profile, rng);
    const getAtoll = () => state.getSnapshot().islands.find(island => island.themeId === "atoll");
    const { floor, objectives } = getAtoll();
    assert.deepEqual(objectives.map(item => item.direction), ["N", "S", "L", "O"]);
    assert.equal(new Set(objectives.map(item => item.penaltyId)).size, 4);
    assert.ok(state.exploreIsland(floor, { mapSeed: "atol" }));
    assert.equal(state.startGuardian(floor), false);
    for (const objective of objectives) assert.ok(state.resolveObjective(floor, objective.id, "success"));
    const saved = JSON.parse(JSON.stringify(state.exportSessionState()));
    state.initialize(profile, rng, saved);
    const preview = getAtoll().guardian.preview;
    assert.equal(preview.environment.terrain.name, "Atol");
    assert.equal(preview.resolvedEncounter.items[0].creatureId, creatureId);
    assert.equal(preview.resolvedEncounter.budget.creatures, 8);
    assert.ok(state.startGuardian(floor));
    assert.ok(state.completeIsland(floor));
    assert.equal(state.getSnapshot().fragments, 1);
  }
});

test("os setores sorteiam penalidades distintas do conjunto de 16 e o código de sessão as preserva", () => {
  const profile = archipelago21to30Profile;
  const idsSeenBySector = Array.from({ length: 4 }, () => new Set());
  for (let seed = 0; seed < 512; seed += 1) {
    const state = createArchipelagoState(profile, createRng(`penalidades-${seed}`));
    const getTropical = () => state.getSnapshot().islands.find(island => island.themeId === "tropical");
    const ids = getTropical().objectives.map(item => item.penaltyId);
    assert.equal(new Set(ids).size, 4);
    ids.forEach((id, index) => idsSeenBySector[index].add(id));
    const saved = JSON.parse(JSON.stringify(state.exportSessionState()));
    state.initialize(profile, createRng("restauração"), saved);
    assert.deepEqual(getTropical().objectives.map(item => item.penaltyId), ids);
  }
  assert.equal(guardianPenalties.length, 16);
  for (const ids of idsSeenBySector) assert.equal(ids.size, 16);
});

test("expedições novas sorteiam posições apenas entre os dez temas da primeira versão", () => {
  const expected = ["tropical", "mangrove", "atoll", "coral-coast", "volcanic", "sea-caves", "pirate-held", "floating", "storm", "dinosaurs"];
  for (const seed of ["primeira", "segunda", "terceira"]) {
    const { islands } = createArchipelagoState(archipelago21to30Profile, createRng(seed)).getSnapshot();
    assert.deepEqual(islands.map(island => island.themeId).sort(), [...expected].sort());
    assert.equal(islands.find(island => island.floor === 30).themeId, "dinosaurs");
  }
});

test("uma expedição salva mantém um tema fora do sorteio atual", () => {
  const profile = archipelago21to30Profile;
  const rng = createRng("legado");
  const state = createArchipelagoState(profile, rng);
  const saved = state.exportSessionState();
  const theme = profile.archipelago.themePools.initial.find(item => item.id === "mist");
  saved.islands[21] = { ...saved.islands[21], themeId: theme.id, name: theme.name, pilot: undefined, icon: "/antigo.svg" };
  state.initialize(profile, rng, saved);
  const island = state.getSnapshot().islands.find(item => item.floor === 21);
  assert.equal(island.themeId, theme.id);
  assert.equal(island.icon, theme.icon);
});

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

test("a Ilha Tropical sorteia três guardiões ND 8 e preserva os setores e a escolha na sessão", () => {
  const profile = archipelago21to30Profile;
  for (const [roll, name] of [[0, "Sentinela do Sol"], [0.5, "Defensor do Templo"], [0.99, "Serpe do Disco Solar"]]) {
    const rng = () => roll;
    const state = createArchipelagoState(profile, rng);
    const tropical = target => target.getSnapshot().islands.find(island => island.themeId === "tropical");
    const { floor, objectives } = tropical(state);
    assert.deepEqual(objectives.map(item => item.name), ["Calçada inundada", "Terraços de cultivo", "Praça do Templo", "Observatório"]);
    assert.ok(state.exploreIsland(floor, { mapSeed: "templo" }));
    assert.equal(state.startGuardian(floor), false);
    for (const item of objectives) assert.ok(state.resolveObjective(floor, item.id, "success"));
    const restored = createArchipelagoState(profile, rng);
    restored.initialize(profile, rng, JSON.parse(JSON.stringify(state.exportSessionState())));
    const { guardian } = tropical(restored);
    assert.equal(guardian.effects.length, 4);
    assert.equal(guardian.preview.resolvedEncounter.items[0].name, name);
    assert.equal(guardian.preview.resolvedEncounter.items[0].creatureData.challengeRating, 8);
    assert.ok(restored.startGuardian(floor));
    assert.ok(restored.completeIsland(floor));
    assert.equal(restored.getSnapshot().fragments, 1);
  }
});

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
  const { profile, state, floor, island } = setupPilot();
  const save = JSON.parse(JSON.stringify(state.exportSessionState()));
  for (const objective of save.islands[floor].objectives) delete objective.penaltyId;
  state.initialize(profile, () => 0.99, save);
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
