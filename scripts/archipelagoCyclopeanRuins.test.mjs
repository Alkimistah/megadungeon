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

const fixture = JSON.parse(readFileSync(new URL("./fixtures/archipelago-sessao-antes-ruinas.json", import.meta.url), "utf8"));
const island = { floor: 25, themeId: "cyclopean-ruins" };
const directions = ["NO", "NL", "O", "L", "SO", "SL"];
const ownTitles = [
  ["Subir os degraus dos gigantes", "Erguer o bote acima da maré", "Apagar a runa do patamar"],
  ["Ler os rostos de pedra", "Virar o espelho de bronze", "Impedir o saque das estátuas"],
  ["Despertar o olho de pedra", "Refazer o selo do poço", "Travar a engrenagem do olho"],
  ["Espionar o acampamento", "Libertar o guia capturado", "Arrancar o cristal de comando"],
  ["Atravessar o arco partido", "Salvar o mercenário pendurado", "Proteger a leitura da inscrição"],
  ["Drenar a sala do trono", "Segurar a comporta do trono", "Render o capitão dos mercenários"]
];

test("sessão salva antes da Ilha das Ruínas Ciclópicas restaura igual", () => {
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
    assert.ok(!Object.values(exported.islands).some(entry => entry.themeId === "cyclopean-ruins"), seed);
  }
});

test("ruínas têm 6 setores com 3 variantes próprias, 2 combates e 1 teste", () => {
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

test("combates das ruínas fecham ND 7 só com o elenco da ilha", () => {
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
        const map = createNodeTacticalMap(withIslandTacticalLayout(scene, "cyclopean-ruins", objective));
        assert.equal(map.cells[map.landmark.index], "mechanism", objective.title);
      }
    }
  }
  assert.equal(combats, 36);
});

test("guardiões das ruínas somam ND 9 e a criatura principal tem penalidades suficientes", () => {
  const objectives = [0, 1, 2, 3, 4, 5].map(sector => createIslandSector(island, sector, 0, 28));
  const full = { ...island, baseChallenge: 9, objectives, outcomes: Object.fromEntries(objectives.map(({ id }) => [id, "failure"])) };
  const mains = ["gigante-dos-mares", "gorgona", "golem-de-bronze"];
  for (const index of [0, 1, 2]) {
    const guardian = createIslandGuardian(full, index, profile, "centro");
    assert.equal(guardian.resolvedEncounter.budget.creatures, 9, `guardião ${index}`);
    assert.ok(guardian.briefing);
    assert.equal(calculateCombatND(guardian.resolvedEncounter.items), 9, `guardião ${index}`);
    assert.equal(guardian.rule, undefined, `guardião ${index}`);
    const map = createNodeTacticalMap(withIslandTacticalLayout(guardian, "cyclopean-ruins"));
    assert.equal(map.cells[map.landmark.index], "mechanism");
    assert.equal(guardian.resolvedEncounter.items[0].creatureId, mains[index], `criatura principal ${index}`);
    assert.ok(getEligibleGuardianPenalties(getCreatureById(mains[index])).length >= 4, mains[index]);
  }
});

test("ruínas têm terreno, ecologia e nome do Centro", () => {
  assert.equal(getIslandThemeTerrain("cyclopean-ruins").name, "Ruínas ciclópicas");
  assert.ok(archipelagoEcologyContexts.byTheme["cyclopean-ruins"]);
  const theme = profile.archipelago.themePools.intermediate.find(({ id }) => id === "cyclopean-ruins");
  assert.equal(theme.arenaName, "Trono dos Gigantes");
});

const originsBefore = {
  canceronte: "sea-caves", selako: "sea-caves", "selako-tigre": "sea-caves", pliorex: "sea-caves", "lula-gigante": "sea-caves",
  crocodilo: "mangrove", esqueleto: "mangrove", "esqueleto-de-elite": "mangrove",
  "gargula-assassina": "floating", grifo: "floating", jagunco: "shipwrecked", necromante: "mist"
};
const newOrigin = ["soldado-mecanico", "cariatide-mecanica", "carrasco-oco", "instrumento-divino", "cocatriz", "basilisco",
  "gorgona", "cocatriz-real", "serpe", "ogro-esqueleto", "gigante-esqueleto", "capanga", "lider-mercenario-de-aslothia",
  "gigante-das-colinas"];

test("a origem das criaturas compartilhadas não passa para as ruínas", () => {
  for (const [id, origin] of Object.entries(originsBefore)) {
    assert.ok(getIslandCreatureIds("cyclopean-ruins").includes(id), id);
    assert.equal(getCreatureOriginThemeId(id), origin, id);
  }
  for (const id of newOrigin) {
    assert.ok(getIslandCreatureIds("cyclopean-ruins").includes(id), id);
    assert.equal(getCreatureOriginThemeId(id), "cyclopean-ruins", id);
  }
});

const combatLandmarks = {
  "Erguer o bote acima da maré": ["Cabrestante", 2],
  "Apagar a runa do patamar": ["Runa do patamar"],
  "Virar o espelho de bronze": ["Espelho de bronze"],
  "Impedir o saque das estátuas": ["Trilha do acampamento", 3],
  "Refazer o selo do poço": ["Selo do poço"],
  "Travar a engrenagem do olho": ["Alavanca da engrenagem", 2],
  "Libertar o guia capturado": ["Poste do guia", 2],
  "Arrancar o cristal de comando": ["Pilar do cristal"],
  "Salvar o mercenário pendurado": ["Mercenário pendurado", 2],
  "Proteger a leitura da inscrição": ["Inscrição do arco"],
  "Segurar a comporta do trono": ["Comporta do trono", 2],
  "Render o capitão dos mercenários": ["Degrau do trono", 3]
};

function ruinsCombatMap(sector, variant, seed = "a") {
  const objective = createIslandSector(island, sector, variant, 28);
  if (objective.type !== "combate") return null;
  const scene = createIslandSectorCombat({ ...island, objectives: [objective] }, objective, profile, `${sector}:${variant}:${seed}`);
  const withLayout = withIslandTacticalLayout(scene, "cyclopean-ruins", objective);
  return { objective, scene, withLayout, map: createNodeTacticalMap(withLayout) };
}

test("cada combate das ruínas abre a planta da própria cena", () => {
  const seen = new Set();
  for (let sector = 0; sector < 6; sector += 1) {
    const zonesInSector = [];
    for (let variant = 0; variant < 3; variant += 1) {
      const result = ruinsCombatMap(sector, variant);
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

test("inimigos das ruínas não começam colados ao ponto de interação", () => {
  for (let sector = 0; sector < 6; sector += 1) {
    for (let variant = 1; variant < 3; variant += 1) {
      const objective = createIslandSector(island, sector, variant, 28);
      const [, minDistance] = combatLandmarks[objective.title];
      if (!minDistance) continue;
      for (let n = 0; n < 50; n += 1) {
        const result = ruinsCombatMap(sector, variant, `p${n}`);
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

test("expedição nova pode sortear a Ilha das Ruínas Ciclópicas completa", () => {
  let found = null;
  for (let i = 0; i < 200 && !found; i += 1) {
    const seed = `ruinas-${i}`;
    const { islands } = createArchipelagoState(profile, createRng(seed)).getSnapshot();
    const hit = islands.find(item => item.themeId === "cyclopean-ruins");
    if (hit) found = { seed, hit };
  }
  assert.ok(found, "nenhuma seed sorteou cyclopean-ruins");
  const { hit } = found;
  assert.ok(hit.floor >= 25 && hit.floor <= 27);
  assert.equal(hasIslandSectors(hit), true);
  assert.equal(hit.objectives.length, 6);
  assert.equal(new Set(hit.objectives.slice(0, 4).map(item => item.penaltyId)).size, 4);
  for (const objective of hit.objectives.slice(4)) assert.ok(objective.guardianBuffId, objective.id);
  assert.equal(hit.arenaName, "Trono dos Gigantes");
  assert.ok(getArchipelagoMissionTheme("cyclopean-ruins"));
  assert.ok(["gigante-do-trono", "senhora-das-estatuas", "golem-religado"].includes(hit.guardianComposition), hit.guardianComposition);
});
