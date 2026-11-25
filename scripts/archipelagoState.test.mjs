import assert from "node:assert/strict";
import test from "node:test";
import { archipelago21to30Profile as productionProfile } from "../src/floorProfiles/archipelago21to30.js";
import { createArchipelagoState } from "../src/archipelagoState.js";
import { createRng } from "../src/random.js";
import { guardianPenalties } from "../src/archipelagoGuardianPenalties.js";
import { withIslandTacticalLayout } from "../src/archipelagoTacticalMap.js";
import { createNodeTacticalMap } from "../src/nodeTacticalMap.js";
import { calculateCombatND } from "../src/challenge.js";
import { creatureCatalog, getCreatureById } from "../src/creatureCatalog/index.js";
import { withCreatureHealthChange } from "../src/encounterCreatureHealth.js";
import { createIslandGuardian, createIslandSector, createIslandSectorCombat, reopenIslandSector } from "../src/archipelagoPilot.js";
import { canRerollBoatAmbush, createBoatAmbush, getBoatAmbushRules } from "../src/archipelagoBoatAmbush.js";

const archipelago21to30Profile = {
  ...productionProfile,
  archipelago: {
    ...productionProfile.archipelago,
    unlockRules: { ...productionProfile.archipelago.unlockRules, intermediateRequires: [], advancedRequires: [] }
  }
};

test("a chance da emboscada sobe 5 pontos por fragmento e o ND acompanha a expedição", () => {
  const expectedChallenges = [6, 6, 6, 6, 7, 7, 7, 8, 8, 9];
  for (const [fragments, challenge] of expectedChallenges.entries()) {
    const chance = 15 + 5 * fragments;
    assert.deepEqual(getBoatAmbushRules(fragments), { chance, challenge });
    const profile = archipelago21to30Profile;
    const atThreshold = createBoatAmbush(fragments, 1, profile, "limiar", () => chance / 100);
    assert.equal(atThreshold, null);
    for (const compositionRoll of [0, 0.5, 0.99]) {
      const rolls = [(chance - 1) / 100, compositionRoll];
      const scene = createBoatAmbush(fragments, 1, profile, "convés", () => rolls.shift());
      assert.equal(scene.resolvedEncounter.budget.creatures, challenge);
      const map = createNodeTacticalMap(scene);
      assert.equal(map.terrain.name, "Convés da liburna");
      assert.equal(map.cells[0], "water");
      assert.equal(map.scene.terrain[0], "deep-water");
      assert.equal(map.scene.terrain[6 * map.width + 15], "deck");
      assert.ok(map.scene.features.some(feature => feature.id === "stern-canopy"));
      assert.ok(map.scene.markers.some(marker => marker.id === "square-mast"));
      const sternMast = map.scene.features.find(feature => feature.id === "stern-canopy-mast");
      assert.equal(sternMast.type, "obstacle");
      assert.equal(sternMast.label, "Mastro do toldo");
      assert.deepEqual([...sternMast.indices].sort((a, b) => a - b), [6 * map.width + 16, 7 * map.width + 16]);
      assert.ok(scene.environment.terrain.features.some(feature => feature.id === "stern-canopy-mast"));
      for (const piece of map.scene.pieces) {
        for (let y = piece.y; y < piece.y + piece.height; y++) {
          for (let x = piece.x; x < piece.x + piece.width; x++) {
            assert.ok(!sternMast.indices.includes(y * map.width + x), `peça ${piece.id} sobre o mastro do toldo`);
          }
        }
      }
      assert.equal(map.cells.at(-1), "water");
      assert.equal(map.cells[map.landmark.index], "mechanism");
      assert.equal(map.landmark.label, "Mastro da vela quadrada");
      assert.equal(map.cells.filter(tile => tile === "party").length, 4);
      assert.equal(map.cells[6 * map.width + 15], "canopy");
      assert.equal(map.cells[7 * map.width + 13], "party");
      if (compositionRoll !== 0) assert.equal(map.cells[8 * map.width + 1], "water");
      assert.equal(map.cells[6 * map.width + 18], "deck");
      const enemyPositions = map.cells.flatMap((tile, index) => tile === "enemy" ? [index] : []);
      assert.equal(enemyPositions.length, map.enemyCount);
      for (const index of enemyPositions) {
        const x = index % map.width;
        const y = Math.floor(index / map.width);
        const onDeck = y >= 6 && y <= 7 && x >= 1 && x <= 18 ||
          y >= 5 && y <= 8 && x >= 3 && x <= 18 || y >= 4 && y <= 9 && x >= 6 && x <= 16;
        assert.equal(onDeck, compositionRoll !== 0);
      }
    }
  }
});

test("a emboscada só rola depois da exploração e o descanso aguarda sua conclusão, inclusive ao restaurar", () => {
  const profile = archipelago21to30Profile;
  const state = createArchipelagoState(profile, createRng("noite"));
  const noRoll = () => assert.fail("descanso redundante rolou emboscada");
  assert.ok(state.restAtBoat({ rng: noRoll }));
  assert.equal(state.exportSessionState().nightsAtBoat, 0);
  const island = state.getSnapshot().islands[0];
  assert.ok(state.exploreIsland(island.floor, { mapSeed: "noite" }));
  assert.ok(state.resolveObjective(island.floor, island.objectives[0].id, "success"));
  assert.ok(state.restAtBoat({ rng: () => 0 }));
  assert.equal(state.getSnapshot().daySpent, true);
  assert.equal(state.getElapsedMinutes(), 480);
  assert.equal(state.restAtBoat({ rng: noRoll }), false);
  assert.equal(state.resolveObjective(island.floor, island.objectives[1].id, "success"), false);
  const ambush = state.getSnapshot().boatAmbush;
  const initialCreature = ambush.resolvedEncounter.items[0].creatureId;
  assert.ok(canRerollBoatAmbush(ambush));
  assert.ok(state.rerollBoatAmbush("noite"));
  assert.equal(state.getSnapshot().boatAmbush, ambush);
  assert.notEqual(ambush.resolvedEncounter.items[0].creatureId, initialCreature);
  assert.equal(ambush.resolvedEncounter.budget.creatures, 6);
  assert.deepEqual(ambush.tacticalLayout.enemyTiles, ["deck"]);
  assert.equal(ambush.rerolls, 1);
  assert.equal(state.getElapsedMinutes(), 480);
  ambush.resolvedEncounter = withCreatureHealthChange(ambush.resolvedEncounter, ambush.resolvedEncounter.items[0], 0, 5);
  const saved = JSON.parse(JSON.stringify(state.exportSessionState()));
  saved.boatAmbush.tacticalLayout = { enemyTiles: ["floor"] };
  state.initialize(profile, createRng("outra"), saved);
  assert.deepEqual(state.getSnapshot().boatAmbush.resolvedEncounter, saved.boatAmbush.resolvedEncounter);
  assert.equal(state.getSnapshot().boatAmbush.tacticalLayout.landmark.name, "Mastro da vela quadrada");
  assert.equal(state.rerollBoatAmbush("noite"), false);
  assert.equal(state.exploreIsland(22), false);
  assert.ok(state.finishBoatAmbush());
  assert.equal(state.getSnapshot().boatAmbush, null);
  assert.equal(state.getSnapshot().daySpent, false);
  assert.equal(state.getElapsedMinutes(), 0);
  assert.equal(state.getSnapshot().islands[0].objectives[0].outcome, "success");
  assert.equal(state.exportSessionState().nightsAtBoat, 1);
  assert.equal(state.finishBoatAmbush(), false);
});

test("as variantes das quatro ilhas têm combates ND 6 temáticos e mapas com pontos de interação", () => {
  const profile = archipelago21to30Profile;
  const objectiveCounts = { mangrove: [5, 5, 4, 5], tropical: [4, 4, 4, 4], atoll: [4, 4, 4, 4], "coral-coast": [4, 4, 4, 4], shipwrecked: [4, 4, 4, 4], "giant-kelp": [4, 4, 4, 4], mist: [4, 4, 4, 4], "ship-graveyard": [4, 4, 4, 4] };
  const exercised = new Set();
  const islands = [];
  for (let i = 0; i < 200 && exercised.size < Object.keys(objectiveCounts).length; i += 1) {
    for (const island of createArchipelagoState(profile, createRng(`variantes iniciais ${i}`)).getSnapshot().islands.slice(0, 4)) {
      if (exercised.has(island.themeId)) continue;
      exercised.add(island.themeId);
      islands.push(island);
    }
  }
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
        assert.ok(map.cells.some(cell => ["water", "deep-water", "current", "swamp", "obstacle", "slope"].includes(cell)), objective.title);
      }
    });

    const outcomes = Object.fromEntries(island.objectives.map(objective => [objective.id, "failure"]));
    const guardian = createIslandGuardian({ ...island, outcomes }, island.guardianComposition, profile, "centro");
    assert.equal(guardian.resolvedEncounter.budget.creatures, 8);
    assert.ok(guardian.briefing);
    const map = createNodeTacticalMap(withIslandTacticalLayout(guardian, island.themeId));
    assert.equal(map.cells[map.landmark.index], "mechanism");
  }
  assert.deepEqual([...exercised].sort(), Object.keys(objectiveCounts).sort());
});

// A fileira inicial tem mais temas ativos do que as 4 vagas. Com rolagem fixa, os temas excluídos
// não são previsíveis, então estes testes usam uma fileira que mantém só os quatro
// temas iniciais originais, para que as rolagens fixas continuem determinísticas
// quando novos temas são adicionados.
const archipelagoBaseInitialRow = {
  ...archipelago21to30Profile,
  archipelago: {
    ...archipelago21to30Profile.archipelago,
    enabledThemeIds: archipelago21to30Profile.archipelago.enabledThemeIds.filter(id => id !== "shipwrecked" && id !== "giant-kelp" && id !== "mist" && id !== "ship-graveyard")
  }
};

const archipelagoBaseIntermediateRow = {
  ...archipelago21to30Profile,
  archipelago: {
    ...archipelago21to30Profile.archipelago,
    enabledThemeIds: archipelago21to30Profile.archipelago.enabledThemeIds.filter(id => id !== "cyclopean-ruins")
  }
};

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
  for (let roll = 0, visited = 0; visited < 24; roll += 1) {
    const seed = `cenas tropicais ${roll}`;
    const state = createArchipelagoState(profile, createRng(seed));
    const getIsland = () => state.getSnapshot().islands.find(item => item.themeId === "tropical");
    if (!getIsland()) continue;
    visited += 1;
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
  const profile = archipelagoBaseInitialRow;
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
  const profile = archipelagoBaseInitialRow;
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
    if (!getTropical()) continue;
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

test("expedições novas sorteiam posições apenas entre os quinze temas ativos", () => {
  const { enabledThemeIds, themePools } = archipelago21to30Profile.archipelago;
  assert.equal(enabledThemeIds.length, 15);
  assert.ok(enabledThemeIds.includes("shipwrecked"));
  assert.ok(enabledThemeIds.includes("giant-kelp"));
  assert.ok(enabledThemeIds.includes("mist"));
  assert.ok(enabledThemeIds.includes("ship-graveyard"));
  assert.ok(enabledThemeIds.includes("cyclopean-ruins"));
  const activeByRow = Object.fromEntries(Object.entries(themePools).map(([row, themes]) => [
    row, themes.map(theme => theme.id).filter(id => enabledThemeIds.includes(id))
  ]));
  const { islandDifficultyByFloor } = archipelago21to30Profile.archipelago;
  const rowOf = floor => islandDifficultyByFloor[floor];
  for (const seed of ["primeira", "segunda", "terceira"]) {
    const { islands } = createArchipelagoState(archipelago21to30Profile, createRng(seed)).getSnapshot();
    assert.equal(islands.length, 10);
    const ids = islands.map(island => island.themeId);
    assert.equal(new Set(ids).size, ids.length);
    for (const island of islands) {
      assert.ok(activeByRow[rowOf(island.floor)].includes(island.themeId), `${seed}: ${island.themeId} no andar ${island.floor}`);
    }
    for (const [row, active] of Object.entries(activeByRow)) {
      const rowIds = islands.filter(island => rowOf(island.floor) === row).map(island => island.themeId);
      if (row === "initial") assert.equal(new Set(rowIds).size, 4, seed);
      else if (row === "intermediate") assert.equal(new Set(rowIds).size, 3, seed);
      else assert.deepEqual([...rowIds].sort(), [...active].sort(), `${seed}: ${row}`);
    }
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
  const profile = archipelagoBaseInitialRow;
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

test("a Ilha Vulcânica só libera o guardião ND 9 após seis resultados e concede um fragmento", () => {
  const profile = archipelago21to30Profile;
  const rng = () => 0.99;
  const state = createArchipelagoState(profile, rng);
  const volcanic = () => state.getSnapshot().islands.find(island => island.themeId === "volcanic");
  const { floor, objectives } = volcanic();
  assert.equal(objectives.length, 6);
  const penalties = objectives.filter(item => item.penaltyId);
  assert.equal(new Set(penalties.map(item => item.penaltyId)).size, 4);
  const [forge, rim] = objectives.filter(item => item.guardianBuff);
  const legacyObjectives = objectives.map((item, index) => item.guardianBuff
    ? createIslandSector(volcanic(), index, item.variant, 24)
    : item);
  const statsFor = outcomes => createIslandGuardian(
    { ...volcanic(), objectives: legacyObjectives, outcomes }, volcanic().guardianComposition, profile, "caldeira"
  ).resolvedEncounter.items[0].creatureData.stats;
  const original = getCreatureById("salamandra-nobre").stats;
  const boosted = statsFor({ [forge.id]: "failure" });
  assert.equal(boosted.defense, original.defense + 2);
  assert.equal(boosted.hitPoints, Math.ceil(original.hitPoints * 1.15));
  const cleared = statsFor({ [forge.id]: "success", [rim.id]: "success" });
  assert.deepEqual(cleared, original);
  assert.ok(state.exploreIsland(floor, { mapSeed: "caldeira" }));
  for (const objective of objectives.slice(0, 5)) {
    assert.ok(state.openSector(floor, objective.id));
    const { scene } = volcanic().objectives.find(item => item.id === objective.id);
    assert.equal(calculateCombatND(scene.resolvedEncounter.items), 7);
    const map = createNodeTacticalMap(withIslandTacticalLayout(scene, "volcanic", objective));
    assert.ok(map.landmark);
    assert.ok(state.resolveObjective(floor, objective.id, "success"));
  }
  assert.equal(state.startGuardian(floor), false);
  assert.ok(state.restAtBoat({ rng }));
  assert.ok(state.exploreIsland(floor, { mapSeed: "caldeira", rng }));
  const last = objectives.at(-1);
  assert.ok(state.resolveObjective(floor, last.id, "failure"));
  const { buffs, effects, preview } = volcanic().guardian;
  assert.deepEqual(buffs, [rim.guardianBuff]);
  assert.equal(effects.length, 5);
  assert.equal(calculateCombatND(preview.resolvedEncounter.items), 9);
  assert.ok(createNodeTacticalMap(withIslandTacticalLayout(preview, "volcanic")).landmark);
  assert.ok(state.startGuardian(floor));
  state.initialize(profile, rng, JSON.parse(JSON.stringify(state.exportSessionState())));
  assert.deepEqual(volcanic().guardian.scene, JSON.parse(JSON.stringify(preview)));
  assert.ok(state.completeIsland(floor));
  assert.equal(state.getSnapshot().fragments, 1);
  assert.equal(state.completeIsland(floor), false);
});

test("os três guardiões vulcânicos têm ND 9 nos dois extremos de enfraquecimento", () => {
  const profile = archipelagoBaseIntermediateRow;
  for (const roll of [0, 0.5, 0.99]) {
    const state = createArchipelagoState(profile, () => roll);
    const island = state.getSnapshot().islands.find(item => item.themeId === "volcanic");
    const outcomes = Object.fromEntries(island.objectives.map(item => [item.id, "success"]));
    const preview = currentOutcomes => createIslandGuardian(
      { ...island, outcomes: currentOutcomes }, island.guardianComposition, profile, "caldeira"
    ).resolvedEncounter.items;
    const full = preview({});
    const weakened = preview(outcomes);
    assert.equal(calculateCombatND(full), 9);
    assert.equal(calculateCombatND(weakened), 9);
    assert.notDeepEqual(weakened[0].creatureData.stats, full[0].creatureData.stats);
    assert.deepEqual(weakened.slice(1), full.slice(1));
  }
});

test("sessões anteriores atualizam a Vulcânica antes da primeira visita e preservam explorações em andamento", () => {
  const profile = archipelago21to30Profile;
  const rng = () => 0.99;
  const state = createArchipelagoState(profile, rng);
  const session = state.exportSessionState();
  const island = state.getSnapshot().islands.find(item => item.themeId === "volcanic");
  const { floor } = island;
  const placeholder = { id: `${floor}-1`, name: "Objetivo provisório" };
  session.islands[floor] = { ...island, pilot: undefined, guardian: undefined, objectives: [placeholder] };

  state.initialize(profile, rng, session);
  assert.equal(state.getSnapshot().islands.find(item => item.floor === floor).objectives.length, 6);

  state.initialize(profile, rng, {
    ...session,
    visitedFloors: [floor],
    activeExploration: { floor, resolvedObjectiveIds: [placeholder.id] }
  });
  const restored = state.getSnapshot().islands.find(item => item.floor === floor);
  assert.equal(restored.objectives.length, 1);
  assert.equal(restored.objectives[0].resolved, true);
});

test("o acesso normal exige a conclusão de cada faixa e nove fragmentos para a ilha final", () => {
  const profile = productionProfile;
  const rng = createRng("acesso-ilhas");
  const state = createArchipelagoState(profile, rng);
  const available = () => state.getSnapshot().islands.filter(island => island.available).map(island => island.floor);
  assert.deepEqual(available(), [21, 22, 23, 24]);
  assert.equal(state.getSnapshot().fragments, 0);
  assert.equal(state.exploreIsland(25), false);
  assert.equal(state.exploreIsland(28), false);
  const fresh = JSON.parse(JSON.stringify(state.exportSessionState()));
  state.initialize(profile, rng, { ...fresh, completedFloors: [21, 22, 23, 24] });
  assert.deepEqual(available(), [21, 22, 23, 24, 25, 26, 27]);
  assert.ok(state.exploreIsland(25));
  state.initialize(profile, rng, { ...fresh, completedFloors: [21, 22, 23, 24, 25, 26, 27] });
  assert.deepEqual(available(), [21, 22, 23, 24, 25, 26, 27, 28, 29]);
  assert.ok(state.exploreIsland(28));
  state.initialize(profile, rng, { ...fresh, completedFloors: [21, 22, 23, 24, 25, 26, 27, 28] });
  assert.equal(state.getSnapshot().bossUnlocked, false);
  assert.equal(state.exploreIsland(30), false);
  state.initialize(profile, rng, { ...fresh, completedFloors: [21, 22, 23, 24, 25, 26, 27, 28, 29] });
  assert.equal(state.getSnapshot().bossUnlocked, true);
  assert.ok(state.exploreIsland(30));
});

test("a Vulcânica sorteia bônus variados sem repetição e restaura os mesmos bônus", () => {
  const profile = archipelagoBaseIntermediateRow;
  const observed = new Set();
  for (let seed = 0; seed < 30; seed++) {
    const rng = createRng(`bonus-vulcanicos-${seed}`);
    const state = createArchipelagoState(profile, rng);
    const getBuffs = () => state.getSnapshot().islands.find(item => item.themeId === "volcanic")
      .objectives.filter(item => item.guardianBuff).map(item => item.guardianBuff);
    const selected = getBuffs();
    assert.equal(new Set(selected).size, 2);
    selected.forEach(buff => observed.add(buff));
    state.initialize(profile, createRng("outra-seed"), JSON.parse(JSON.stringify(state.exportSessionState())));
    assert.deepEqual(getBuffs(), selected);
    const island = state.exportSessionState().islands[
      state.getSnapshot().islands.find(item => item.themeId === "volcanic").floor
    ];
    const buffSector = island.objectives.find(item => item.type !== "tesouro" && item.guardianBuffId && /RD|imunidade/i.test(item.guardianBuff));
    if (!buffSector) continue;
    const guardianNotes = () => createIslandGuardian(island, island.guardianComposition, profile, "caldeira")
      .resolvedEncounter.items[0].creatureData.stats.defensesText;
    assert.ok(guardianNotes().includes(buffSector.guardianBuff));
    island.outcomes = { [buffSector.id]: "success" };
    assert.ok(!guardianNotes().includes(buffSector.guardianBuff));
    assert.equal(reopenIslandSector(island, () => 0, 24).id, buffSector.id);
    assert.equal(island.objectives.find(item => item.id === buffSector.id).guardianBuffId, buffSector.guardianBuffId);
    assert.ok(guardianNotes().includes(buffSector.guardianBuff));
  }
  assert.ok([...observed].some(buff => /RD 5 contra/.test(buff)));
  assert.ok([...observed].some(buff => /aumenta em 5/i.test(buff)));
  assert.ok([...observed].some(buff => /imunidade.*2 turnos/i.test(buff)));
});

test("a Ilha-Labirinto conserva seis resultados até o Centro ND 9 e concede um fragmento", () => {
  const profile = archipelagoBaseIntermediateRow;
  for (const roll of [0, 0.5, 0.99]) {
    const rng = () => roll;
    const state = createArchipelagoState(profile, rng);
    const caves = () => state.getSnapshot().islands.find(island => island.themeId === "sea-caves");
    const { floor, objectives } = caves();
    assert.equal(objectives.length, 6);
    assert.equal(objectives.filter(item => item.penaltyId).length, 4);
    assert.equal(new Set(objectives.filter(item => item.guardianBuffId).map(item => item.guardianBuffId)).size, 2);
    assert.ok(state.exploreIsland(floor, { mapSeed: "maré" }));
    for (const objective of objectives) {
      assert.equal(state.startGuardian(floor), false);
      assert.ok(state.openSector(floor, objective.id));
      if (objective.type === "combate") {
        const scene = caves().objectives.find(item => item.id === objective.id).scene;
        assert.equal(calculateCombatND(scene.resolvedEncounter.items), 7);
        const map = createNodeTacticalMap(withIslandTacticalLayout(scene, "sea-caves", objective));
        assert.ok(map.landmark);
        assert.ok(map.cells.includes("water") || map.cells.includes("current"));
      }
      assert.ok(state.resolveObjective(floor, objective.id, "success"));
    }
    const { preview, buffs } = caves().guardian;
    assert.deepEqual(buffs, []);
    assert.equal(calculateCombatND(preview.resolvedEncounter.items), 9);
    assert.ok(createNodeTacticalMap(withIslandTacticalLayout(preview, "sea-caves")).landmark);
    assert.ok(state.startGuardian(floor));
    state.initialize(profile, rng, JSON.parse(JSON.stringify(state.exportSessionState())));
    assert.deepEqual(caves().guardian.scene, JSON.parse(JSON.stringify(preview)));
    assert.ok(state.completeIsland(floor));
    assert.equal(state.getSnapshot().fragments, 1);
  }
});

test("o fortim pirata tem seis setores, guarda as proteções sorteadas e concede um fragmento", () => {
  const profile = archipelagoBaseIntermediateRow;
  const leaders = ["capitao-do-conclave-pirata", "capitao-pirata", "ogro-das-sanguinarias"];
  for (const [index, roll] of [0, 0.5, 0.99].entries()) {
    const rng = () => roll;
    const state = createArchipelagoState(profile, rng);
    const fort = () => state.getSnapshot().islands.find(island => island.themeId === "pirate-held");
    const { floor, objectives } = fort();
    assert.equal(objectives.length, 6);
    assert.equal(objectives.filter(item => item.penaltyId).length, 4);
    const wardIds = objectives.filter(item => item.guardianBuffId).map(item => item.guardianBuffId);
    assert.equal(new Set(wardIds).size, 2);
    assert.ok(state.exploreIsland(floor, { mapSeed: "fortim" }));
    for (const objective of objectives) {
      assert.equal(state.startGuardian(floor), false);
      assert.ok(state.openSector(floor, objective.id));
      if (objective.type === "combate") {
        const scene = fort().objectives.find(item => item.id === objective.id).scene;
        assert.equal(calculateCombatND(scene.resolvedEncounter.items), 7);
        assert.ok(createNodeTacticalMap(withIslandTacticalLayout(scene, "pirate-held", objective)).landmark);
      }
      assert.ok(state.resolveObjective(floor, objective.id, objective.guardianBuff ? "failure" : "success"));
    }
    const { preview, buffs } = fort().guardian;
    assert.equal(buffs.length, 2);
    assert.equal(preview.resolvedEncounter.items[0].creatureId, leaders[index]);
    assert.equal(calculateCombatND(preview.resolvedEncounter.items), 9);
    assert.equal(createNodeTacticalMap(withIslandTacticalLayout(preview, "pirate-held")).landmark.label, "Mesa do leilão");
    state.initialize(profile, rng, JSON.parse(JSON.stringify(state.exportSessionState())));
    assert.deepEqual(fort().objectives.filter(item => item.guardianBuffId).map(item => item.guardianBuffId), wardIds);
    assert.ok(state.startGuardian(floor));
    assert.ok(state.completeIsland(floor));
    assert.equal(state.getSnapshot().fragments, 1);
  }
});

test("a Ilha Flutuante tem quatro penalidades e quatro bônus distintos e exige oito resultados", () => {
  const profile = archipelago21to30Profile;
  const rng = () => 0.99;
  const state = createArchipelagoState(profile, rng);
  const floating = () => state.getSnapshot().islands.find(island => island.themeId === "floating");
  const { floor, objectives } = floating();
  assert.equal(objectives.length, 8);
  assert.equal(new Set(objectives.filter(item => item.penaltyId).map(item => item.penaltyId)).size, 4);
  assert.equal(new Set(objectives.filter(item => item.guardianBuffId).map(item => item.guardianBuffId)).size, 4);
  assert.ok(state.exploreIsland(floor, { mapSeed: "alturas" }));
  for (const objective of objectives) {
    assert.equal(state.startGuardian(floor), false);
    assert.ok(state.openSector(floor, objective.id));
    const { scene } = floating().objectives.find(item => item.id === objective.id);
    assert.equal(calculateCombatND(scene.resolvedEncounter.items), 8);
    const map = createNodeTacticalMap(withIslandTacticalLayout(scene, "floating", objective));
    assert.ok(map.landmark);
    assert.ok(map.cells.includes("pit"));
    assert.ok(state.resolveObjective(floor, objective.id, objective.guardianBuff ? "failure" : "success"));
  }
  const { preview, buffs, effects } = floating().guardian;
  assert.equal(buffs.length, 4);
  assert.equal(effects.length, 4);
  assert.equal(calculateCombatND(preview.resolvedEncounter.items), 10);
  assert.ok(state.startGuardian(floor));
  state.initialize(profile, rng, JSON.parse(JSON.stringify(state.exportSessionState())));
  assert.deepEqual(floating().guardian.scene, JSON.parse(JSON.stringify(preview)));
  assert.ok(state.completeIsland(floor));
  assert.equal(state.getSnapshot().fragments, 1);
});

test("Tempestades Eternas preserva quatro bônus, quatro penalidades e o Centro ND 10", () => {
  const profile = archipelago21to30Profile;
  for (const roll of [0, 0.5, 0.99]) {
    const rng = () => roll;
    const state = createArchipelagoState(profile, rng);
    const storm = () => state.getSnapshot().islands.find(island => island.themeId === "storm");
    const { floor, objectives } = storm();
    assert.equal(objectives.length, 8);
    assert.equal(new Set(objectives.filter(item => item.penaltyId).map(item => item.penaltyId)).size, 4);
    assert.equal(new Set(objectives.filter(item => item.guardianBuffId).map(item => item.guardianBuffId)).size, 4);
    assert.ok(state.exploreIsland(floor, { mapSeed: "tempestade" }));
    for (const objective of objectives) {
      assert.equal(state.startGuardian(floor), false);
      assert.ok(state.openSector(floor, objective.id));
      if (objective.type === "combate") {
        const { scene } = storm().objectives.find(item => item.id === objective.id);
        assert.equal(calculateCombatND(scene.resolvedEncounter.items), 8);
        const map = createNodeTacticalMap(withIslandTacticalLayout(scene, "storm", objective));
        assert.ok(map.landmark);
        assert.ok(map.cells.includes("wind") || map.cells.includes("current"));
      }
      const outcome = objective.guardianBuff && objective.direction !== "L" ? "failure" : "success";
      assert.ok(state.resolveObjective(floor, objective.id, outcome));
    }
    const { preview, buffs } = storm().guardian;
    assert.equal(buffs.length, 3);
    assert.equal(calculateCombatND(preview.resolvedEncounter.items), 10);
    assert.equal(createNodeTacticalMap(withIslandTacticalLayout(preview, "storm")).landmark.label, "Marco do olho da tormenta");
    state.initialize(profile, rng, JSON.parse(JSON.stringify(state.exportSessionState())));
    assert.deepEqual(storm().guardian.buffs, buffs);
    assert.ok(state.startGuardian(floor));
    assert.ok(state.completeIsland(floor));
    assert.equal(state.getSnapshot().fragments, 1);
  }
});

test("um tesouro raro concede a recompensa do ND da ilha sem alterar o guardião", () => {
  const profile = {
    ...archipelago21to30Profile,
    archipelago: { ...archipelago21to30Profile.archipelago, sectorTreasureChance: 1 }
  };
  const rng = () => 0.99;
  const state = createArchipelagoState(profile, rng);
  const allIslands = state.getSnapshot().islands;
  assert.ok(allIslands.slice(0, 9).every(island => island.objectives.every(objective =>
    objective.type === "tesouro" && objective.challenge === island.baseChallenge
  )));
  assert.ok(allIslands.at(-1).objectives.every(objective => objective.type !== "tesouro"));

  const getIsland = () => state.getSnapshot().islands.find(island => island.themeId === "volcanic");
  const island = getIsland();
  const originalBuffs = island.guardian.buffs;
  const [first, ...remaining] = island.objectives;
  assert.ok(state.exploreIsland(island.floor, { mapSeed: "tesouro-raro" }));
  assert.ok(state.resolveObjective(island.floor, first.id, "success"));
  const reward = getIsland().objectives[0].treasureReward;
  assert.equal(reward.challenge, 9);
  assert.ok(reward.gains.length > 0);
  assert.equal(state.resolveObjective(island.floor, first.id, "success"), false);
  state.initialize(profile, rng, JSON.parse(JSON.stringify(state.exportSessionState())));
  assert.deepEqual(getIsland().objectives[0].treasureReward, reward);
  for (const objective of remaining) assert.ok(state.resolveObjective(island.floor, objective.id, "success"));
  assert.deepEqual(getIsland().guardian.buffs, originalBuffs);
  assert.deepEqual(getIsland().guardian.effects, []);
  assert.deepEqual(getIsland().guardian.preview.resolvedEncounter.items,
    createIslandGuardian({ ...getIsland(), outcomes: {} }, island.guardianComposition, profile, "tesouro-raro").resolvedEncounter.items);

  assert.ok(state.restAtBoat({ rng }));
  assert.ok(state.exploreIsland(island.floor, { mapSeed: "tesouro-raro", rng: () => 0 }));
  assert.equal(getIsland().objectives[0].type === "tesouro", false);
  assert.deepEqual(getIsland().objectives[0].treasureReward, reward);
  assert.ok(state.resolveObjective(island.floor, first.id, "success"));
  assert.deepEqual(getIsland().objectives[0].treasureReward, reward);
});

test("a Ilha dos Dinossauros exige nove fragmentos e só conclui após enfrentar o Rei Tirano ND 11", () => {
  const profile = archipelago21to30Profile;
  const rng = () => 0.99;
  const state = createArchipelagoState(profile, rng);
  const saved = () => JSON.parse(JSON.stringify(state.exportSessionState()));
  const boss = () => state.getSnapshot().islands.find(island => island.floor === 30);
  assert.equal(state.exploreIsland(30), false);
  state.initialize(profile, rng, { ...saved(), completedFloors: [21, 22, 23, 24, 25, 26, 27, 28, 29] });
  assert.ok(state.exploreIsland(30, { mapSeed: "vale" }));
  assert.equal(state.resolveObjective(30, "30-boss", "success"), false);
  assert.equal(state.completeIsland(30), false);
  const { preview } = boss().guardian;
  assert.equal(preview.resolvedEncounter.items[0].creatureId, "rei-tirano-nd-11");
  assert.equal(preview.resolvedEncounter.items[0].challengeRating, 11);
  assert.equal(getCreatureById("rei-tirano").challengeRating, 14);
  const arena = createNodeTacticalMap(withIslandTacticalLayout(preview, "dinosaurs"));
  assert.equal(arena.landmark.label, "Ossada do vale");
  assert.equal(arena.cells.filter(tile => tile === "boss").length, 1);
  assert.ok(state.startGuardian(30));
  assert.equal(state.restAtBoat({ rng }), false);
  const combat = saved();
  state.initialize(profile, rng, combat);
  assert.deepEqual(boss().guardian.scene, combat.activeExploration.guardianScene);
  assert.ok(state.loseGuardian(30));
  assert.equal(boss().defeated, true);
  assert.equal(state.completeIsland(30), false);
  state.initialize(profile, rng, combat);
  assert.ok(state.completeIsland(30));
  assert.equal(state.getSnapshot().fragments, 9);
  assert.equal(boss().completed, true);
  assert.equal(state.completeIsland(30), false);
});

function createStateWithNineFragments(profile, rng) {
  const state = createArchipelagoState(profile, rng);
  state.initialize(profile, rng, {
    ...state.exportSessionState(),
    completedFloors: [21, 22, 23, 24, 25, 26, 27, 28, 29]
  });
  return state;
}

test("um save dos atalhos de teste mantém fragmentos conquistados e encerra a exploração que voltou a ficar bloqueada", () => {
  const rng = () => 0.99;
  const state = createStateWithNineFragments(productionProfile, rng);
  assert.ok(state.exploreIsland(30));
  assert.ok(state.startGuardian(30));
  const save = JSON.parse(JSON.stringify(state.exportSessionState()));
  state.initialize(productionProfile, rng, { ...save, testingFragments: true, completedFloors: [21, 22] });
  assert.equal(state.getSnapshot().fragments, 2);
  assert.equal(state.getSnapshot().activeExploration, null);
  assert.equal(state.getSnapshot().bossUnlocked, false);
  assert.equal(state.completeIsland(30), false);
  assert.ok(state.restAtBoat({ rng }));
  assert.equal(state.exploreIsland(30), false);
  assert.equal("testingFragments" in state.exportSessionState(), false);
});

test("os quatro combates de dinossauros removem bônus até o próximo desembarque e protegem o tesouro raro", () => {
  const profile = {
    ...productionProfile,
    archipelago: { ...productionProfile.archipelago, boss: { ...productionProfile.archipelago.boss, treasureChance: 1 } }
  };
  const rng = () => 0.99;
  const state = createStateWithNineFragments(profile, rng);
  const boss = () => state.getSnapshot().islands.find(island => island.floor === 30);
  assert.ok(state.exploreIsland(30, { mapSeed: "dinossauros" }));
  assert.equal(boss().guardian.ready, true);
  assert.equal(new Set(boss().guardian.buffs).size, 4);
  assert.equal(boss().objectives.length, 4);
  const guardsTreasure = boss().objectives.filter(item => item.guardsTreasure);
  assert.equal(guardsTreasure.length, 1);
  const treasureId = guardsTreasure[0].id;
  assert.equal(guardsTreasure[0].treasureReward, undefined);
  const firstCompositions = new Map();
  for (const objective of boss().objectives) {
    assert.equal(objective.type, "combate");
    assert.ok(state.openSector(30, objective.id));
    const { scene } = boss().objectives.find(item => item.id === objective.id);
    assert.equal(calculateCombatND(scene.resolvedEncounter.items), 10);
    assert.ok(createNodeTacticalMap(withIslandTacticalLayout(scene, "dinosaurs", objective)).landmark);
    firstCompositions.set(objective.id, scene.resolvedEncounter.items);
    assert.ok(state.resolveObjective(30, objective.id, "success"));
  }
  assert.deepEqual(boss().guardian.buffs, []);
  const reward = boss().objectives.find(item => item.id === treasureId).treasureReward;
  assert.equal(reward.challenge, 11);
  assert.ok(reward.gains.length);
  assert.ok(state.restAtBoat({ rng }));
  assert.equal(boss().guardian.buffs.length, 4);
  assert.ok(state.exploreIsland(30, { mapSeed: "dinossauros" }));
  for (const objective of boss().objectives) {
    assert.equal(objective.resolved, false);
    assert.ok(state.openSector(30, objective.id));
    const { scene } = boss().objectives.find(item => item.id === objective.id);
    assert.notDeepEqual(scene.resolvedEncounter.items, firstCompositions.get(objective.id));
  }
  assert.ok(state.resolveObjective(30, treasureId, "success"));
  assert.deepEqual(boss().objectives.find(item => item.id === treasureId).treasureReward, reward);
});

test("os quatro bônus do Rei Tirano são fixos e os setores removem apenas o efeito correspondente", () => {
  const rng = createRng("bonus-fixos-do-rei");
  const state = createStateWithNineFragments(productionProfile, rng);
  const boss = () => state.getSnapshot().islands.find(island => island.floor === 30);
  const ids = () => boss().objectives.map(item => item.guardianBuffId);
  assert.deepEqual(ids(), ["stomp", "saves", "roar", "deinonychus-retinue"]);
  const original = getCreatureById("rei-tirano-nd-11");
  assert.ok(state.exploreIsland(30, { mapSeed: "pisao" }));
  const leader = () => boss().guardian.preview.resolvedEncounter.items[0].creatureData;
  assert.match(leader().actions[0].text, /pisão \+31 \(4d8\+15 de impacto\)/i);
  assert.equal(leader().stats.defense, original.stats.defense);
  assert.equal(leader().stats.defensesText, original.stats.defensesText);
  for (const stat of ["fortitude", "reflex", "will"]) assert.equal(leader().stats[stat], original.stats[stat] + 5);
  const [stomp, saves] = boss().objectives;
  assert.ok(state.resolveObjective(30, stomp.id, "success"));
  assert.deepEqual(leader().actions, original.actions);
  assert.equal(leader().stats.reflex, original.stats.reflex + 5);
  assert.ok(state.resolveObjective(30, saves.id, "success"));
  for (const stat of ["fortitude", "reflex", "will"]) assert.equal(leader().stats[stat], original.stats[stat]);
  assert.equal(leader().stats.defense, original.stats.defense);

  const saved = JSON.parse(JSON.stringify(state.exportSessionState()));
  saved.islands[30].objectives[0].guardianBuffId = "hp";
  state.initialize(productionProfile, rng, saved);
  assert.deepEqual(ids(), ["stomp", "saves", "roar", "deinonychus-retinue"]);
  assert.deepEqual(leader().actions, original.actions);
});


test("o rugido e os lacaios aparecem no confronto final até vencer seus setores", () => {
  const state = createStateWithNineFragments(productionProfile, createRng("rugido-e-lacaios"));
  assert.ok(state.exploreIsland(30, { mapSeed: "rugido-e-lacaios" }));
  const island = () => state.getSnapshot().islands.find(item => item.floor === 30);
  const preview = () => island().guardian.preview;
  const minions = () => preview().resolvedEncounter.items.filter(item => item.creatureId === "deinonico");
  const roar = () => preview().resolvedEncounter.items[0].creatureData.abilities.find(item => item.name === "Rugido Ensurdecedor");
  assert.equal(minions()[0]?.quantity, 2);
  assert.match(roar()?.text ?? "", /alcance médio.*confusas.*fim da cena.*Vontade CD 27/);
  const map = createNodeTacticalMap(withIslandTacticalLayout(preview(), "dinosaurs"));
  assert.equal(map.cells.filter(tile => tile === "boss").length, 1);
  assert.equal(map.cells.filter(tile => tile === "enemy").length, 2);
  const roarSector = island().objectives.find(item => item.guardianBuffId === "roar");
  assert.ok(state.resolveObjective(30, roarSector.id, "failure"));
  assert.ok(roar());
  const retinueSector = island().objectives.find(item => item.guardianBuffId === "deinonychus-retinue");
  assert.ok(state.resolveObjective(30, retinueSector.id, "success"));
  assert.equal(minions().length, 0);
  assert.ok(roar());
  assert.ok(state.restAtBoat({ rng: () => 0.99 }));
  assert.ok(state.exploreIsland(30, { mapSeed: "rugido-e-lacaios" }));
  assert.equal(minions()[0]?.quantity, 2);
  assert.ok(state.resolveObjective(30, roarSector.id, "success"));
  assert.equal(roar(), undefined);
  assert.equal(minions()[0]?.quantity, 2);
});

test("as dez arenas têm nomes temáticos, inclusive ao carregar expedições antigas", () => {
  const rng = createRng("nomes-das-arenas");
  const state = createArchipelagoState(productionProfile, rng);
  const arenas = () => state.getSnapshot().islands.map(island => island.arenaName);
  const names = arenas();
  assert.ok(names.every(Boolean));
  assert.equal(new Set(names).size, 10);
  assert.equal(names.at(-1), "Vale da Ossada");
  const legacy = JSON.parse(JSON.stringify(state.exportSessionState()));
  for (const island of Object.values(legacy.islands)) delete island.arenaName;
  state.initialize(productionProfile, rng, legacy);
  assert.deepEqual(arenas(), names);
});

test("a Mata dos Fetos corta reforços e rerrola entre composições ND 10 com Deinonicos", () => {
  const rng = createRng("reforcos-da-mata");
  const state = createStateWithNineFragments(productionProfile, rng);
  assert.ok(state.exploreIsland(30, { mapSeed: "reforcos" }));
  const forest = () => state.getSnapshot().islands.find(island => island.floor === 30)
    .objectives.find(item => item.direction === "O");
  assert.match(forest().title, /reforços/i);
  const { id } = forest();
  assert.ok(state.openSector(30, id));
  const composition = () => forest().scene.resolvedEncounter.items.map(item => [item.creatureId, item.quantity]);
  const previous = composition();
  assert.ok(state.rerollSector(30, id));
  const updated = composition();
  assert.notDeepEqual(updated, previous);
  assert.ok(updated.some(([creatureId]) => ["deinonico", "bando-de-deinonicos"].includes(creatureId)));
  assert.equal(calculateCombatND(forest().scene.resolvedEncounter.items), 10);
  state.initialize(productionProfile, rng, JSON.parse(JSON.stringify(state.exportSessionState())));
  assert.deepEqual(composition(), updated);
  const scene = forest().scene;
  scene.resolvedEncounter = withCreatureHealthChange(scene.resolvedEncounter, scene.resolvedEncounter.items[0], 0, 10);
  assert.equal(state.rerollSector(30, id), false);
  assert.ok(state.resolveObjective(30, id, "success"));
  assert.equal(state.rerollSector(30, id), false);
});

test("o barco acompanha o último desembarque, inclusive após descansar e revisitar uma ilha", () => {
  const rng = () => 0.99;
  const state = createArchipelagoState(productionProfile, rng);
  assert.equal(state.getSnapshot().lastVisitedFloor, null);
  for (const floor of [21, 22, 21]) {
    assert.ok(state.exploreIsland(floor));
    assert.equal(state.getSnapshot().lastVisitedFloor, floor);
    assert.ok(state.restAtBoat({ rng }));
    assert.equal(state.getSnapshot().activeExploration, null);
    assert.equal(state.getSnapshot().lastVisitedFloor, floor);
  }
  state.initialize(productionProfile, rng, JSON.parse(JSON.stringify(state.exportSessionState())));
  assert.equal(state.getSnapshot().lastVisitedFloor, 21);
});

test("costa do coral diferencia margem rasa e canal fundo no nicho", () => {
  const encounter = {
    id: "nicho-margem-e-canal",
    environment: { terrain: { name: "Costa do Coral", features: [] }, climate: [] },
    resolvedEncounter: { seed: "nicho-margem-e-canal", items: [{ kind: "creature", creatureId: "animal", name: "Animal" }] }
  };
  const map = createNodeTacticalMap(withIslandTacticalLayout(encounter, "coral-coast"));
  assert.ok(map.scene);
  assert.equal(map.scene.terrain[6 * 20 + 6], "water");
  assert.equal(map.scene.terrain[6 * 20 + 11], "deep-water");
  assert.ok(map.scene.markers.some(marker => marker.label === "Nicho do fragmento" && marker.indices.includes(5 * 20 + 15)));
});
