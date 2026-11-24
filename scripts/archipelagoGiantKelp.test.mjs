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

const fixture = JSON.parse(readFileSync(new URL("./fixtures/archipelago-sessao-antes-algas.json", import.meta.url), "utf8"));
const island = { floor: 21, themeId: "giant-kelp" };
const ownTitles = [
  ["Abrir o canal entre as frondes", "Romper a emboscada nas frondes", "Cortar as redes dos sahuagin"],
  ["Negociar com os pastores de algas", "Romper a guarda do viveiro", "Impedir o roubo dos ovos"],
  ["Recolher a seiva das frondes", "Amarrar o bote no banco", "Soltar o pescador das gavinhas"],
  ["Resgatar a carga presa nas frondes", "Desenroscar o leme do casco", "Enfrentar os predadores do casco"]
];

test("sessão salva antes da Ilha de Algas Gigantes restaura igual", () => {
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
    assert.ok(!Object.values(exported.islands).some(entry => entry.themeId === "giant-kelp"), seed);
  }
});

test("algas têm 4 setores com 3 variantes próprias e a compartilhada", () => {
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

test("combates de setor das algas fecham ND 6 só com o elenco da ilha", () => {
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
        const map = createNodeTacticalMap(withIslandTacticalLayout(scene, "giant-kelp", objective));
        assert.equal(map.cells[map.landmark.index], "mechanism", objective.title);
      }
    }
  }
  assert.ok(combats >= 24, "oito variantes de combate, em três seeds");
});

test("guardiões das algas somam ND 8 e a criatura principal tem penalidades suficientes", () => {
  const objectives = [0, 1, 2, 3].map(sector => createIslandSector(island, sector, 0, 22));
  const full = { ...island, baseChallenge: 8, objectives, outcomes: Object.fromEntries(objectives.map(({ id }) => [id, "failure"])) };
  const mains = ["alghari", "peixe-recife", "elfo-do-mar-chefe"];
  for (const index of [0, 1, 2]) {
    const guardian = createIslandGuardian(full, index, profile, "centro");
    assert.equal(guardian.resolvedEncounter.budget.creatures, 8, `guardião ${index}`);
    assert.ok(guardian.briefing);
    const map = createNodeTacticalMap(withIslandTacticalLayout(guardian, "giant-kelp"));
    assert.equal(map.cells[map.landmark.index], "mechanism");
    assert.ok(getEligibleGuardianPenalties(getCreatureById(mains[index])).length >= 4, mains[index]);
  }
});

test("algas têm terreno, ecologia e nome do Centro", () => {
  assert.equal(getIslandThemeTerrain("giant-kelp").name, "Floresta de algas");
  assert.ok(archipelagoEcologyContexts.byTheme["giant-kelp"]);
  const theme = profile.archipelago.themePools.initial.find(({ id }) => id === "giant-kelp");
  assert.equal(theme.arenaName, "Coração das Frondes");
});

const originsBefore = {
  canceronte: "sea-caves", selako: "sea-caves", "selako-tigre": "sea-caves", pliorex: "sea-caves",
  "peixe-recife": "sea-caves", "enxame-de-aguas-vivas": "sea-caves", "elfo-do-mar-pescador": "sea-caves",
  "elfo-do-mar-chefe": "sea-caves", irukanjin: "sea-caves", "sahuagin-metamorfo": "sea-caves",
  "sahuagin-predador": "sea-caves", "homem-piranha": "sea-caves", "homem-piranha-imediato": "sea-caves",
  alghari: "mangrove", "cipo-assassino": "tropical", tendriculo: "tropical", naiade: "coral-coast", aquinne: "sea-caves"
};

test("a origem das criaturas compartilhadas não passa para as algas", () => {
  for (const [id, origin] of Object.entries(originsBefore)) {
    assert.ok(getIslandCreatureIds("giant-kelp").includes(id), id);
    assert.equal(getCreatureOriginThemeId(id), origin, id);
  }
  for (const id of ["platan", "agua-viva"]) assert.equal(getCreatureOriginThemeId(id), "giant-kelp", id);
});

const combatLandmarks = {
  "Romper a emboscada nas frondes": "Proa do bote",
  "Cortar as redes dos sahuagin": "Rede do canal",
  "Romper a guarda do viveiro": "Concha de alarme",
  "Impedir o roubo dos ovos": "Ninhal dos ovos",
  "Soltar o pescador das gavinhas": "Pescador preso",
  "Interceptar a patrulha": "Saída pelo canal fundo",
  "Enfrentar os predadores do casco": "Escotilha do porão",
  "Defender a posição avançada": "Jangada de frondes"
};

function kelpCombatMap(sector, variant) {
  const objective = createIslandSector(island, sector, variant, 22);
  if (objective.type !== "combate") return null;
  const scene = createIslandSectorCombat({ ...island, objectives: [objective] }, objective, profile, `${sector}:${variant}:a`);
  const withLayout = withIslandTacticalLayout(scene, "giant-kelp", objective);
  return { objective, withLayout, map: createNodeTacticalMap(withLayout) };
}

test("cada combate das algas abre a planta da própria cena", () => {
  const seen = new Set();
  for (let sector = 0; sector < 4; sector += 1) {
    const zonesInSector = [];
    for (let variant = 0; variant < 4; variant += 1) {
      const result = kelpCombatMap(sector, variant);
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

test("inimigos das algas não começam colados ao ponto de interação", () => {
  const minDistances = { "Romper a guarda do viveiro": 2, "Interceptar a patrulha": 3 };
  for (const [title, sector, variant] of [["Romper a guarda do viveiro", 1, 1], ["Interceptar a patrulha", 2, 3]]) {
    const objective = createIslandSector(island, sector, variant, 22);
    assert.equal(objective.title, title);
    for (let n = 0; n < 50; n += 1) {
      const scene = createIslandSectorCombat({ ...island, objectives: [objective] }, objective, profile, `p${n}`);
      const map = createNodeTacticalMap(withIslandTacticalLayout(scene, "giant-kelp", objective));
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

test("expedição nova pode sortear a Ilha de Algas Gigantes completa", () => {
  let found = null;
  for (let i = 0; i < 200 && !found; i += 1) {
    const seed = `algas-${i}`;
    const { islands } = createArchipelagoState(profile, createRng(seed)).getSnapshot();
    const hit = islands.find(item => item.themeId === "giant-kelp");
    if (hit) found = { seed, hit };
  }
  assert.ok(found, "nenhuma seed sorteou giant-kelp");
  const { hit } = found;
  assert.ok(hit.floor >= 21 && hit.floor <= 24);
  assert.equal(hasIslandSectors(hit), true);
  assert.equal(hit.objectives.length, 4);
  assert.equal(new Set(hit.objectives.map(item => item.penaltyId)).size, 4);
  assert.equal(hit.arenaName, "Coração das Frondes");
  assert.ok(getArchipelagoMissionTheme("giant-kelp"));
  assert.ok(["isca-do-coracao", "mare-urticante", "pastor-das-frondes"].includes(hit.guardianComposition), hit.guardianComposition);
});
