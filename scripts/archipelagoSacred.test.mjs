import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { archipelago21to30Profile as profile, archipelagoEcologyContexts } from "../src/floorProfiles/archipelago21to30.js";
import { createRng } from "../src/random.js";
import { createArchipelagoState } from "../src/archipelagoState.js";
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

const fixture = JSON.parse(readFileSync(new URL("./fixtures/archipelago-sessao-antes-sagrada.json", import.meta.url), "utf8"));
const island = { floor: 25, themeId: "sacred" };
const directions = ["NO", "NL", "O", "L", "SO", "SL"];

test("a Ilha Sagrada sorteia ao menos doze fichas sem misturar os tipos exigidos pelas tarefas", () => {
  const seen = new Set();
  for (const index of directions.keys()) {
    for (const variant of [1, 2]) {
      const objective = createIslandSector(island, index, variant, 24);
      for (let seed = 0; seed < 40; seed++) {
        const scene = createIslandSectorCombat(island, objective, profile, `elenco-sagrado-${seed}`);
        const { items } = scene.resolvedEncounter;
        assert.equal(calculateCombatND(items), 7);
        for (const item of items) {
          assert.equal(item.type, objective.preferredType);
          seen.add(item.creatureId);
        }
      }
    }
  }
  assert.ok(seen.size >= 12);
  for (const id of ["soldado-blindado", "shiradi", "unicornio", "dragonete", "ninfa"]) assert.ok(seen.has(id), id);
});

const ownTitles = [
  ["Cumprir o tabu do bosque", "Passar pela prova do guardião", "Defender o unicórnio ferido"],
  ["Passar pela muralha", "Derrubar o estandarte da pureza", "Abrir as gaiolas dos espíritos"],
  ["Ouvir a ninfa da fonte", "Lavar a fonte profanada", "Devolver o ovo ao ninho"],
  ["Sabotar as correntes de prata", "Interromper a missa de guerra", "Libertar os prisioneiros não humanos"],
  ["Subir sem pisar nas penas", "Vencer a prova do protetor", "Espantar os grifos da escadaria"],
  ["Reconsagrar o altar", "Impedir a profanação do altar", "Romper o selo do espírito do altar"]
];

test("sessão salva antes da Ilha Sagrada restaura igual", () => {
  for (const [seed, saved] of Object.entries(fixture)) {
    const state = createArchipelagoState(profile, () => 0.5);
    state.initialize(profile, () => 0.5, JSON.parse(JSON.stringify(saved)));
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
    assert.ok(!Object.values(exported.islands).some(entry => entry.themeId === "sacred"), seed);
  }
});

test("Ilha Sagrada tem 6 setores com 3 variantes próprias, 2 combates e 1 teste", () => {
  for (let sector = 0; sector < 6; sector += 1) {
    const types = [];
    for (let variant = 0; variant < 3; variant += 1) {
      const objective = createIslandSector(island, sector, variant, 28);
      assert.equal(objective.direction, directions[sector]);
      assert.equal(objective.title, ownTitles[sector][variant]);
      types.push(objective.type);
    }
    assert.equal(types.filter(type => type === "combate").length, 2, `setor ${sector}`);
    assert.equal(types.filter(type => type !== "combate").length, 1, `setor ${sector}`);
  }
});

test("os dois últimos setores removem bônus do guardião", () => {
  for (let sector = 0; sector < 6; sector += 1) {
    const objective = createIslandSector(island, sector, 0, 28);
    assert.equal(objective.guardianBuffId, sector === 4 ? "defense" : sector === 5 ? "hp" : undefined, `setor ${sector}`);
  }
});

test("combates da Ilha Sagrada fecham ND 7 só com o elenco da ilha", () => {
  let combats = 0;
  for (let sector = 0; sector < 6; sector += 1) {
    for (let variant = 0; variant < 3; variant += 1) {
      const objective = createIslandSector(island, sector, variant, 28);
      if (objective.type !== "combate") continue;
      for (const seed of ["a", "b", "c"]) {
        combats += 1;
        const scene = createIslandSectorCombat({ ...island, objectives: [objective] }, objective, profile, `${sector}:${variant}:${seed}`);
        assert.ok(scene.creature.allowedCreatureIds.length, objective.title);
        const { items } = scene.resolvedEncounter;
        assert.equal(calculateCombatND(items), 7, `${objective.title} ${seed}`);
        for (const item of items) {
          assert.ok(scene.creature.allowedCreatureIds.includes(item.creatureData?.baseCreatureId ?? item.creatureId), objective.title);
        }
        const map = createNodeTacticalMap(withIslandTacticalLayout(scene, "sacred", objective));
        assert.equal(map.cells[map.landmark.index], "mechanism", objective.title);
      }
    }
  }
  assert.equal(combats, 36);
});

test("guardiões da Ilha Sagrada somam ND 9 e a criatura principal tem penalidades suficientes", () => {
  const objectives = [0, 1, 2, 3, 4, 5].map(sector => createIslandSector(island, sector, 0, 28));
  const full = { ...island, baseChallenge: 9, objectives, outcomes: Object.fromEntries(objectives.map(({ id }) => [id, "failure"])) };
  const mains = ["protetor", "companhia-blindada-de-elite", "forjador-liturgico"];
  for (const index of [0, 1, 2]) {
    const guardian = createIslandGuardian(full, index, profile, "centro");
    assert.equal(guardian.resolvedEncounter.budget.creatures, 9, `guardião ${index}`);
    assert.ok(guardian.briefing);
    assert.equal(calculateCombatND(guardian.resolvedEncounter.items), 9, `guardião ${index}`);
    assert.equal(guardian.rule, undefined, `guardião ${index}`);
    const map = createNodeTacticalMap(withIslandTacticalLayout(guardian, "sacred"));
    assert.equal(map.cells[map.landmark.index], "mechanism");
    assert.equal(guardian.resolvedEncounter.items[0].creatureId, mains[index], `criatura principal ${index}`);
    assert.ok(getEligibleGuardianPenalties(getCreatureById(mains[index])).length >= 4, mains[index]);
  }
});

test("Ilha Sagrada tem terreno, ecologia e nome do Centro", () => {
  assert.equal(getIslandThemeTerrain("sacred").name, "Ilha dividida");
  assert.deepEqual(archipelagoEcologyContexts.byTheme.sacred.terrains, ["floresta", "colina"]);
  assert.deepEqual(archipelagoEcologyContexts.byTheme.sacred.places, ["costa-ilhas", "ruinas"]);
  const theme = profile.archipelago.themePools.intermediate.find(({ id }) => id === "sacred");
  assert.equal(theme.arenaName, "Altar da Trilha Branca");
});

const originsBefore = { grifo: "floating", "coruja-gigante": "storm", "capitao-baluarte": "pirate-held" };
const newOrigin = ["pegaso", "unicornio", "dragonete", "ninfa", "protetor", "eiradaan-guardiao", "hipogrifo",
  "recruta-purista", "soldado-purista", "purificado", "sargento-mor", "capelao-de-guerra", "arcano-de-guerra-adepto",
  "cacador-de-impuros", "bispo-de-guerra"];

test("a origem das criaturas compartilhadas não passa para a Ilha Sagrada", () => {
  for (const [id, origin] of Object.entries(originsBefore)) {
    assert.ok(getIslandCreatureIds("sacred").includes(id), id);
    assert.equal(getCreatureOriginThemeId(id), origin, id);
  }
  for (const id of newOrigin) {
    assert.ok(getIslandCreatureIds("sacred").includes(id), id);
    assert.equal(getCreatureOriginThemeId(id), "sacred", id);
  }
});

const combatLandmarks = {
  "Passar pela prova do guardião": ["Pilar dos espíritos", 2],
  "Defender o unicórnio ferido": ["Unicórnio ferido", 2],
  "Derrubar o estandarte da pureza": ["Mastro do estandarte"],
  "Abrir as gaiolas dos espíritos": ["Gaiola grande", 2],
  "Lavar a fonte profanada": ["Pedra da fonte", 2],
  "Devolver o ovo ao ninho": ["Ninho das aves", 2],
  "Interromper a missa de guerra": ["Altar de campanha"],
  "Libertar os prisioneiros não humanos": ["Tronco dos prisioneiros"],
  "Vencer a prova do protetor": ["Círculo de penas", 2],
  "Espantar os grifos da escadaria": ["Braseiro de penas"],
  "Impedir a profanação do altar": ["Altar antigo", 2],
  "Romper o selo do espírito do altar": ["Selo purista"]
};

function sacredCombatMap(sector, variant, seed = "a") {
  const objective = createIslandSector(island, sector, variant, 28);
  if (objective.type !== "combate") return null;
  const scene = createIslandSectorCombat({ ...island, objectives: [objective] }, objective, profile, `${sector}:${variant}:${seed}`);
  const withLayout = withIslandTacticalLayout(scene, "sacred", objective);
  return { objective, scene, withLayout, map: createNodeTacticalMap(withLayout) };
}

test("cada combate da Ilha Sagrada abre a planta da própria cena", () => {
  const seen = new Set();
  for (let sector = 0; sector < 6; sector += 1) {
    const zonesInSector = [];
    for (let variant = 0; variant < 3; variant += 1) {
      const result = sacredCombatMap(sector, variant);
      if (!result) continue;
      const { objective, withLayout, map } = result;
      seen.add(objective.title);
      const [landmark] = combatLandmarks[objective.title];
      assert.equal(map.cells[map.landmark.index], "mechanism", objective.title);
      assert.equal(withLayout.tacticalLayout.landmark.name, landmark, objective.title);
      assert.ok(withLayout.environment.terrain.features.some(feature => feature.name === landmark), objective.title);
      zonesInSector.push(JSON.stringify(withLayout.tacticalLayout.zones));
    }
    assert.equal(new Set(zonesInSector).size, zonesInSector.length, `zonas repetidas no setor ${sector}`);
  }
  assert.deepEqual([...seen].sort(), Object.keys(combatLandmarks).sort());
});

test("inimigos da Ilha Sagrada não começam colados ao ponto de interação", () => {
  for (let sector = 0; sector < 6; sector += 1) {
    for (let variant = 1; variant < 3; variant += 1) {
      const objective = createIslandSector(island, sector, variant, 28);
      const [, minDistance] = combatLandmarks[objective.title];
      if (!minDistance) continue;
      for (let n = 0; n < 50; n += 1) {
        const result = sacredCombatMap(sector, variant, `p${n}`);
        const { scene, map } = result;
        const expected = scene.resolvedEncounter.items.filter(item => item.kind === "creature")
          .reduce((sum, item) => sum + (item.quantity || 1), 0);
        const enemies = map.scene.pieces.filter(piece => piece.side === "enemy");
        assert.equal(enemies.length, expected, `${objective.title} p${n}: peças`);
        const lx = map.landmark.index % map.width;
        const ly = Math.floor(map.landmark.index / map.width);
        for (const piece of enemies) {
          const w = piece.width ?? 1;
          const h = piece.height ?? 1;
          const dx = Math.max(piece.x - lx, lx - (piece.x + w - 1), 0);
          const dy = Math.max(piece.y - ly, ly - (piece.y + h - 1), 0);
          assert.ok(Math.max(dx, dy) >= minDistance, `${objective.title} p${n}: peça em ${piece.x},${piece.y} perto do marco`);
        }
      }
    }
  }
});

test("expedição nova pode sortear a Ilha Sagrada completa", () => {
  let found = null;
  for (let i = 0; i < 200 && !found; i += 1) {
    const seed = `sagrada-${i}`;
    const { islands } = createArchipelagoState(profile, createRng(seed)).getSnapshot();
    const hit = islands.find(item => item.themeId === "sacred");
    if (hit) found = { seed, hit };
  }
  assert.ok(found, "nenhuma seed sorteou sacred");
  const { hit } = found;
  assert.ok(hit.floor >= 25 && hit.floor <= 27);
  assert.equal(hasIslandSectors(hit), true);
  assert.equal(hit.objectives.length, 6);
  assert.equal(new Set(hit.objectives.slice(0, 4).map(item => item.penaltyId)).size, 4);
  for (const objective of hit.objectives.slice(4)) assert.ok(objective.guardianBuffId, objective.id);
  assert.equal(hit.arenaName, "Altar da Trilha Branca");
  assert.ok(getArchipelagoMissionTheme("sacred"));
  assert.ok(["protetor-da-ilha", "companhia-blindada", "forjador-liturgico"].includes(hit.guardianComposition), hit.guardianComposition);
});
