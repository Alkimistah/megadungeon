import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { archipelago21to30Profile as profile, archipelagoEcologyContexts } from "../src/floorProfiles/archipelago21to30.js";
import { createArchipelagoState } from "../src/archipelagoState.js";
import { createRng } from "../src/random.js";
import { withIslandTacticalLayout } from "../src/archipelagoTacticalMap.js";
import { createNodeTacticalMap } from "../src/nodeTacticalMap.js";
import { calculateCombatND } from "../src/challenge.js";
import { getCreatureById } from "../src/creatureCatalog/index.js";
import { getEligibleGuardianPenalties } from "../src/archipelagoGuardianPenalties.js";
import {
  createIslandGuardian, createIslandSector, createIslandSectorCombat, getIslandThemeTerrain, hasIslandSectors
} from "../src/archipelagoPilot.js";
import { getCreatureOriginThemeId, getIslandCreatureIds } from "../src/archipelagoCreatureRules.js";
import { getArchipelagoMissionTheme } from "../src/missions/archipelagoMissionThemes.js";

const fixture = JSON.parse(readFileSync(new URL("./fixtures/archipelago-sessao-antes-cemiterio.json", import.meta.url), "utf8"));
const island = { floor: 21, themeId: "ship-graveyard" };
const ownTitles = [
  ["Achar a entrada pelos cascos", "Segurar a prancha entre os cascos", "Limpar o ninho do cordame"],
  ["Resgatar a carga do porão", "Fechar o rombo do casco", "Tirar o grumete da sentina"],
  ["Negociar com os Desmanchadores", "Soltar a âncora presa", "Travar o guindaste dos Desmanchadores"],
  ["Abrir o cofre do almirante", "Apaziguar a carranca", "Fechar a escotilha da tripulação"]
];

test("sessão salva antes da Ilha-Cemitério de Navios restaura igual", () => {
  for (const [seed, saved] of Object.entries(fixture)) {
    const state = createArchipelagoState(profile, createRng("x"));
    state.initialize(profile, createRng("x"), JSON.parse(JSON.stringify(saved)));
    const restored = state.getSnapshot().islands;
    assert.equal(restored.length, Object.keys(saved.islands).length, seed);
    for (const { floor, themeId, objectives } of restored) {
      const original = saved.islands[floor];
      assert.equal(themeId, original.themeId, `${seed}:${floor}`);
      assert.deepEqual(objectives.map(({ id, title, type, variant }) => ({ id, title, type, variant })),
        original.objectives.map(({ id, title, type, variant }) => ({ id, title, type, variant })), `${seed}:${floor}`);
    }
    const exported = state.exportSessionState();
    assert.deepEqual(exported.islands, saved.islands, seed);
    assert.deepEqual(exported.visitedFloors, saved.visitedFloors, seed);
    assert.ok(!Object.values(exported.islands).some(entry => entry.themeId === "ship-graveyard"), seed);
  }
});

test("cemitério tem 4 setores com 3 variantes próprias e a compartilhada", () => {
  for (let sector = 0; sector < 4; sector += 1) {
    const types = [];
    let combats = 0;
    for (let variant = 0; variant < 4; variant += 1) {
      const objective = createIslandSector(island, sector, variant, 22);
      assert.ok(objective, `${sector}:${variant}`);
      if (variant < 3) assert.equal(objective.title, ownTitles[sector][variant]);
      if (objective.type === "combate") combats += 1;
      types.push(objective.type);
    }
    assert.ok(combats >= 2, `setor ${sector}`);
    assert.ok(types.some(type => type !== "combate"), `setor ${sector}`);
    assert.ok(!ownTitles[sector].includes(createIslandSector(island, sector, 3, 22).title), `setor ${sector}`);
  }
});

test("combates de setor do cemitério fecham ND 6 só com o elenco da ilha", () => {
  let combats = 0;
  for (let sector = 0; sector < 4; sector += 1) {
    for (let variant = 0; variant < 4; variant += 1) {
      const objective = createIslandSector(island, sector, variant, 22);
      if (objective.type !== "combate") continue;
      for (const seed of ["a", "b", "c"]) {
        combats += 1;
        const scene = createIslandSectorCombat({ ...island, objectives: [objective] }, objective, profile, `${sector}:${variant}:${seed}`);
        assert.ok(scene.creature.allowedCreatureIds.length, objective.title);
        const { items } = scene.resolvedEncounter;
        assert.equal(calculateCombatND(items), 6, `${objective.title} ${seed}`);
        for (const item of items) {
          assert.ok(scene.creature.allowedCreatureIds.includes(item.creatureData?.baseCreatureId ?? item.creatureId), objective.title);
        }
        const map = createNodeTacticalMap(withIslandTacticalLayout(scene, "ship-graveyard", objective));
        assert.equal(map.cells[map.landmark.index], "mechanism", objective.title);
      }
    }
  }
  assert.ok(combats >= 24, "oito variantes de combate, em três seeds");
});

test("guardiões do cemitério somam ND 8 e a criatura principal tem penalidades suficientes", () => {
  const objectives = [0, 1, 2, 3].map(sector => createIslandSector(island, sector, 0, 22));
  const full = { ...island, baseChallenge: 8, objectives, outcomes: Object.fromEntries(objectives.map(({ id }) => [id, "failure"])) };
  const mains = ["capitao-dos-ossos", "mimico", "gnoll-cacador-de-cabecas"];
  for (const index of [0, 1, 2]) {
    const guardian = createIslandGuardian(full, index, profile, "centro");
    assert.equal(guardian.resolvedEncounter.budget.creatures, 8, `guardião ${index}`);
    assert.ok(guardian.briefing);
    assert.equal(calculateCombatND(guardian.resolvedEncounter.items), 8, `guardião ${index}`);
    assert.equal(guardian.rule, undefined, `guardião ${index}`);
    const map = createNodeTacticalMap(withIslandTacticalLayout(guardian, "ship-graveyard"));
    assert.equal(map.cells[map.landmark.index], "mechanism");
    assert.equal(guardian.resolvedEncounter.items[0].creatureId, mains[index], `criatura principal ${index}`);
    assert.ok(getEligibleGuardianPenalties(getCreatureById(mains[index])).length >= 4, mains[index]);
  }
});

test("cemitério tem terreno, ecologia e nome do Centro", () => {
  assert.equal(getIslandThemeTerrain("ship-graveyard").name, "Cascos encalhados");
  assert.ok(archipelagoEcologyContexts.byTheme["ship-graveyard"]);
  const theme = profile.archipelago.themePools.initial.find(({ id }) => id === "ship-graveyard");
  assert.equal(theme.arenaName, "Nau Capitânia");
});

const originsBefore = {
  canceronte: "sea-caves", selako: "sea-caves", crocodilo: "mangrove", otyugh: "mangrove",
  esqueleto: "mangrove", "esqueleto-de-elite": "mangrove", lacedon: "storm", imediato: "pirate-held"
};
const newOrigin = ["rato-gigante", "aranhas-filhotes", "aranha-gigante", "aranha-matriarca", "mimico-menor", "mimico",
  "ganchador", "gnoll-capanga", "gnoll-saqueador", "gnoll-filibusteiro", "gnoll-lider-de-alcateia",
  "gnoll-xama-de-megalokk", "gnoll-cacador-de-cabecas"];

test("a origem das criaturas compartilhadas não passa para o cemitério", () => {
  for (const [id, origin] of Object.entries(originsBefore)) {
    assert.ok(getIslandCreatureIds("ship-graveyard").includes(id), id);
    assert.equal(getCreatureOriginThemeId(id), origin, id);
  }
  for (const id of newOrigin) {
    assert.ok(getIslandCreatureIds("ship-graveyard").includes(id), id);
    assert.equal(getCreatureOriginThemeId(id), "ship-graveyard", id);
  }
  // Saíram da lista com o Capitão dos Ossos próprio, mas as caçadas salvas mantêm a origem.
  for (const [id, origin] of [["capitao-pirata", "pirate-held"], ["amalgama-esqueleto", "ship-graveyard"]]) {
    assert.ok(!getIslandCreatureIds("ship-graveyard").includes(id), id);
    assert.equal(getCreatureOriginThemeId(id), origin, id);
  }
});

const combatLandmarks = {
  "Segurar a prancha entre os cascos": "Ponta da prancha",
  "Limpar o ninho do cordame": "Casulo do marinheiro",
  "Fechar o rombo do casco": "Rombo do casco",
  "Tirar o grumete da sentina": "Grumete preso",
  "Travar o guindaste dos Desmanchadores": "Manivela do guindaste",
  "Interceptar a patrulha": "Corda do bote",
  "Fechar a escotilha da tripulação": "Escotilha do porão",
  "Defender a posição avançada": "Barricada de barris"
};

function graveyardCombatMap(sector, variant) {
  const objective = createIslandSector(island, sector, variant, 22);
  if (objective.type !== "combate") return null;
  const scene = createIslandSectorCombat({ ...island, objectives: [objective] }, objective, profile, `${sector}:${variant}:a`);
  const withLayout = withIslandTacticalLayout(scene, "ship-graveyard", objective);
  return { objective, withLayout, map: createNodeTacticalMap(withLayout) };
}

test("cada combate do cemitério abre a planta da própria cena", () => {
  const seen = new Set();
  for (let sector = 0; sector < 4; sector += 1) {
    const zonesInSector = [];
    for (let variant = 0; variant < 4; variant += 1) {
      const result = graveyardCombatMap(sector, variant);
      if (!result) continue;
      const { objective, withLayout, map } = result;
      seen.add(objective.title);
      assert.equal(map.cells[map.landmark.index], "mechanism", objective.title);
      assert.equal(withLayout.tacticalLayout.landmark.name, combatLandmarks[objective.title], objective.title);
      assert.ok(withLayout.environment.terrain.features.some(feature => feature.name === combatLandmarks[objective.title]), objective.title);
      zonesInSector.push(JSON.stringify(withLayout.tacticalLayout.zones));
    }
    assert.equal(new Set(zonesInSector).size, zonesInSector.length, `zonas repetidas no setor ${sector}`);
  }
  assert.deepEqual([...seen].sort(), Object.keys(combatLandmarks).sort());
});

test("inimigos do cemitério não começam colados ao ponto de interação", () => {
  const minDistances = {
    "Segurar a prancha entre os cascos": 2, "Tirar o grumete da sentina": 2, "Interceptar a patrulha": 3,
    "Limpar o ninho do cordame": 2
  };
  const cases = [
    ["Segurar a prancha entre os cascos", 0, 1], ["Tirar o grumete da sentina", 1, 2], ["Interceptar a patrulha", 2, 3], ["Limpar o ninho do cordame", 0, 2]
  ];
  for (const [title, sector, variant] of cases) {
    const objective = createIslandSector(island, sector, variant, 22);
    assert.equal(objective.title, title);
    for (let n = 0; n < 50; n += 1) {
      const scene = createIslandSectorCombat({ ...island, objectives: [objective] }, objective, profile, `p${n}`);
      const map = createNodeTacticalMap(withIslandTacticalLayout(scene, "ship-graveyard", objective));
      const expected = scene.resolvedEncounter.items.filter(item => item.kind === "creature")
        .reduce((sum, item) => sum + (item.quantity || 1), 0);
      const enemies = map.scene.pieces.filter(piece => piece.side === "enemy");
      assert.equal(enemies.length, expected, `${title} p${n}: peças`);
      const lx = map.landmark.index % map.width;
      const ly = Math.floor(map.landmark.index / map.width);
      for (const piece of enemies) {
        const w = piece.width ?? 1;
        const h = piece.height ?? 1;
        const dx = Math.max(piece.x - lx, lx - (piece.x + w - 1), 0);
        const dy = Math.max(piece.y - ly, ly - (piece.y + h - 1), 0);
        assert.ok(Math.max(dx, dy) >= minDistances[title], `${title} p${n}: peça em ${piece.x},${piece.y} perto do marco`);
      }
    }
  }
});

test("expedição nova pode sortear a Ilha-Cemitério de Navios completa", () => {
  let found = null;
  for (let i = 0; i < 200 && !found; i += 1) {
    const seed = `cemiterio-${i}`;
    const { islands } = createArchipelagoState(profile, createRng(seed)).getSnapshot();
    const hit = islands.find(item => item.themeId === "ship-graveyard");
    if (hit) found = { seed, hit };
  }
  assert.ok(found, "nenhuma seed sorteou ship-graveyard");
  const { hit } = found;
  assert.ok(hit.floor >= 21 && hit.floor <= 24);
  assert.equal(hasIslandSectors(hit), true);
  assert.equal(hit.objectives.length, 4);
  assert.equal(new Set(hit.objectives.map(item => item.penaltyId)).size, 4);
  assert.equal(hit.arenaName, "Nau Capitânia");
  assert.ok(getArchipelagoMissionTheme("ship-graveyard"));
  assert.ok(["capitao-dos-ossos", "tesouro-que-morde", "cacador-de-cabecas"].includes(hit.guardianComposition), hit.guardianComposition);
});
