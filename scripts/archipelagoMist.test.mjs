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

const fixture = JSON.parse(readFileSync(new URL("./fixtures/archipelago-sessao-antes-nevoa.json", import.meta.url), "utf8"));
const island = { floor: 21, themeId: "mist" };
const ownTitles = [
  ["Seguir a voz verdadeira", "Manter o sino do cais tocando", "Desmascarar os falsos náufragos"],
  ["Ouvir os Ouvintes da Bruma", "Guardar a lanterna da vigília", "Apagar o braseiro da escuta"],
  ["Atravessar sem seguir as luzes", "Recuperar a bússola do capitão", "Calar as harpias do charco"],
  ["Acalmar os que esperam", "Achar a lápide trocada", "Fechar a cripta aberta"]
];

test("sessão salva antes da Ilha de Névoa restaura igual", () => {
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
    assert.ok(!Object.values(exported.islands).some(entry => entry.themeId === "mist"), seed);
  }
});

test("névoa tem 4 setores com 3 variantes próprias e a compartilhada", () => {
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

test("combates de setor da névoa fecham ND 6 só com o elenco da ilha", () => {
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
        const map = createNodeTacticalMap(withIslandTacticalLayout(scene, "mist", objective));
        assert.equal(map.cells[map.landmark.index], "mechanism", objective.title);
      }
    }
  }
  assert.ok(combats >= 24, "oito variantes de combate, em três seeds");
});

const sineiroRule = "Memento do sineiro: o sino rachado é o que prende o fantasma a este mundo. Uma personagem adjacente ao sino gasta uma ação padrão em duas rodadas diferentes para tocá-lo. Depois da segunda badalada, o fantasma pode ser destruído normalmente. Se ele chegar a 0 PV antes disso, some e volta no início da rodada seguinte, adjacente ao sino, com todos os PV.";

test("guardiões da névoa somam ND 8 e a criatura principal tem penalidades suficientes", () => {
  const objectives = [0, 1, 2, 3].map(sector => createIslandSector(island, sector, 0, 22));
  const full = { ...island, baseChallenge: 8, objectives, outcomes: Object.fromEntries(objectives.map(({ id }) => [id, "failure"])) };
  const mains = ["fantasma", "duplo", "necromante"];
  for (const index of [0, 1, 2]) {
    const guardian = createIslandGuardian(full, index, profile, "centro");
    assert.equal(guardian.resolvedEncounter.budget.creatures, 8, `guardião ${index}`);
    assert.ok(guardian.briefing);
    if (index === 0) assert.equal(guardian.rule, sineiroRule);
    else assert.equal(guardian.rule, undefined, `guardião ${index}`);
    const map = createNodeTacticalMap(withIslandTacticalLayout(guardian, "mist"));
    assert.equal(map.cells[map.landmark.index], "mechanism");
    assert.equal(guardian.resolvedEncounter.items[0].creatureId, mains[index], `criatura principal ${index}`);
    assert.ok(getEligibleGuardianPenalties(getCreatureById(mains[index])).length >= 4, mains[index]);
  }
});

test("névoa tem terreno, ecologia e nome do Centro", () => {
  assert.equal(getIslandThemeTerrain("mist").name, "Bruma fria");
  assert.ok(archipelagoEcologyContexts.byTheme.mist);
  const theme = profile.archipelago.themePools.initial.find(({ id }) => id === "mist");
  assert.equal(theme.arenaName, "Campanário da Bruma");
});

const originsBefore = {
  lacedon: "storm", "zumbi-fantasmagorico": "shipwrecked", aparicao: "mangrove", imediato: "pirate-held",
  "capitao-pirata": "pirate-held", "come-sonhos": "tropical", pirata: "pirate-held",
  "harpia-saqueadora": "storm", "coruja-gigante": "storm"
};
const newOrigin = ["livido", "fantasma", "alma-acorrentada", "silfide-travessa", "duende-menor", "duende-maior",
  "vestigio-da-encruzilhada", "mastim-das-sombras", "corcel-das-trevas", "duplo", "falso-vidente", "bruxo-rural",
  "necromante", "estirge", "enxame-estirge"];

test("a origem das criaturas compartilhadas não passa para a névoa", () => {
  for (const [id, origin] of Object.entries(originsBefore)) {
    assert.ok(getIslandCreatureIds("mist").includes(id), id);
    assert.equal(getCreatureOriginThemeId(id), origin, id);
  }
  for (const id of newOrigin) {
    assert.ok(getIslandCreatureIds("mist").includes(id), id);
    assert.equal(getCreatureOriginThemeId(id), "mist", id);
  }
});

const combatLandmarks = {
  "Manter o sino do cais tocando": "Sino do cais",
  "Desmascarar os falsos náufragos": "Náufrago verdadeiro",
  "Guardar a lanterna da vigília": "Lanterna da vigília",
  "Apagar o braseiro da escuta": "Braseiro da escuta",
  "Calar as harpias do charco": "Ninho das harpias",
  "Interceptar a patrulha": "Saída pela trilha da bruma",
  "Fechar a cripta aberta": "Porta da cripta",
  "Defender a posição avançada": "Mausoléu do vigia"
};

function mistCombatMap(sector, variant) {
  const objective = createIslandSector(island, sector, variant, 22);
  if (objective.type !== "combate") return null;
  const scene = createIslandSectorCombat({ ...island, objectives: [objective] }, objective, profile, `${sector}:${variant}:a`);
  const withLayout = withIslandTacticalLayout(scene, "mist", objective);
  return { objective, withLayout, map: createNodeTacticalMap(withLayout) };
}

test("cada combate da névoa abre a planta da própria cena", () => {
  const seen = new Set();
  for (let sector = 0; sector < 4; sector += 1) {
    const zonesInSector = [];
    for (let variant = 0; variant < 4; variant += 1) {
      const result = mistCombatMap(sector, variant);
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

test("inimigos da névoa não começam colados ao ponto de interação", () => {
  const minDistances = {
    "Manter o sino do cais tocando": 2, "Desmascarar os falsos náufragos": 2,
    "Guardar a lanterna da vigília": 2, "Interceptar a patrulha": 3
  };
  const cases = [
    ["Manter o sino do cais tocando", 0, 1], ["Desmascarar os falsos náufragos", 0, 2],
    ["Guardar a lanterna da vigília", 1, 1], ["Interceptar a patrulha", 2, 3]
  ];
  for (const [title, sector, variant] of cases) {
    const objective = createIslandSector(island, sector, variant, 22);
    assert.equal(objective.title, title);
    for (let n = 0; n < 50; n += 1) {
      const scene = createIslandSectorCombat({ ...island, objectives: [objective] }, objective, profile, `p${n}`);
      const map = createNodeTacticalMap(withIslandTacticalLayout(scene, "mist", objective));
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

test("expedição nova pode sortear a Ilha de Névoa completa", () => {
  let found = null;
  for (let i = 0; i < 200 && !found; i += 1) {
    const seed = `nevoa-${i}`;
    const { islands } = createArchipelagoState(profile, createRng(seed)).getSnapshot();
    const hit = islands.find(item => item.themeId === "mist");
    if (hit) found = { seed, hit };
  }
  assert.ok(found, "nenhuma seed sorteou mist");
  const { hit } = found;
  assert.ok(hit.floor >= 21 && hit.floor <= 24);
  assert.equal(hasIslandSectors(hit), true);
  assert.equal(hit.objectives.length, 4);
  assert.equal(new Set(hit.objectives.map(item => item.penaltyId)).size, 4);
  assert.equal(hit.arenaName, "Campanário da Bruma");
  assert.ok(getArchipelagoMissionTheme("mist"));
  assert.ok(["sineiro", "rostos-emprestados", "mestre-dos-ouvintes"].includes(hit.guardianComposition), hit.guardianComposition);
});
