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

const fixture = JSON.parse(readFileSync(new URL("./fixtures/archipelago-sessao-antes-naufragos.json", import.meta.url), "utf8"));
const island = { floor: 21, themeId: "shipwrecked" };
const ownTitles = [
  ["Vasculhar a linha da maré", "Afastar os carniceiros da praia", "Conter os afogados da arrebentação"],
  ["Ganhar a confiança dos sobreviventes", "Romper o cerco às barracas", "Libertar os cativos da paliçada"],
  ["Limpar a nascente", "Disputar a bacia", "Desviar o cano do farol"],
  ["Copiar as rotas da parede", "Proteger o cartógrafo", "Selar a boca da gruta"]
];

test("sessão salva antes da Ilha dos Náufragos restaura igual", () => {
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
    assert.ok(!Object.values(exported.islands).some(entry => entry.themeId === "shipwrecked"), seed);
  }
});

test("náufragos têm 4 setores com 3 variantes próprias e a compartilhada", () => {
  for (let sector = 0; sector < 4; sector += 1) {
    const types = [];
    for (let variant = 0; variant < 4; variant += 1) {
      const objective = createIslandSector(island, sector, variant, 22);
      assert.ok(objective, `${sector}:${variant}`);
      if (variant < 3) assert.equal(objective.title, ownTitles[sector][variant]);
      types.push(objective.type);
    }
    assert.ok(types.includes("combate"), `setor ${sector}`);
    assert.ok(types.some(type => type !== "combate"), `setor ${sector}`);
    assert.ok(!ownTitles[sector].includes(createIslandSector(island, sector, 3, 22).title), `setor ${sector}`);
  }
});

test("combates de setor dos náufragos fecham ND 6 só com o elenco da ilha", () => {
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
        const map = createNodeTacticalMap(withIslandTacticalLayout(scene, "shipwrecked", objective));
        assert.equal(map.cells[map.landmark.index], "mechanism", objective.title);
      }
    }
  }
  assert.ok(combats >= 15, "as cinco variantes de combate próprias, em três seeds");
});

test("guardiões dos náufragos somam ND 8 e a criatura principal tem penalidades suficientes", () => {
  const objectives = [0, 1, 2, 3].map(sector => createIslandSector(island, sector, 0, 22));
  const full = { ...island, baseChallenge: 8, objectives, outcomes: Object.fromEntries(objectives.map(({ id }) => [id, "failure"])) };
  const mains = ["legionario-insano", "cavaleiro-desonrado", "afogado"];
  for (const index of [0, 1, 2]) {
    const guardian = createIslandGuardian(full, index, profile, "centro");
    assert.equal(guardian.resolvedEncounter.budget.creatures, 8, `guardião ${index}`);
    assert.ok(guardian.briefing);
    const map = createNodeTacticalMap(withIslandTacticalLayout(guardian, "shipwrecked"));
    assert.equal(map.cells[map.landmark.index], "mechanism");
    assert.ok(getEligibleGuardianPenalties(getCreatureById(mains[index])).length >= 4, mains[index]);
  }
});

test("náufragos têm terreno, ecologia e nome do Centro", () => {
  assert.equal(getIslandThemeTerrain("shipwrecked").name, "Costa de destroços");
  assert.ok(archipelagoEcologyContexts.byTheme.shipwrecked);
  const theme = profile.archipelago.themePools.initial.find(({ id }) => id === "shipwrecked");
  assert.equal(theme.arenaName, "Farol dos Acendedores");
});

test("expedição nova pode sortear a Ilha dos Náufragos completa", () => {
  let found = null;
  for (let i = 0; i < 200 && !found; i += 1) {
    const seed = `naufragos-${i}`;
    const { islands } = createArchipelagoState(profile, createRng(seed)).getSnapshot();
    const hit = islands.find(item => item.themeId === "shipwrecked");
    if (hit) found = { seed, hit };
  }
  assert.ok(found, "nenhuma seed sorteou shipwrecked");
  const { hit } = found;
  assert.ok(hit.floor >= 21 && hit.floor <= 24);
  assert.equal(hasIslandSectors(hit), true);
  assert.equal(hit.objectives.length, 4);
  assert.equal(new Set(hit.objectives.map(item => item.penaltyId)).size, 4);
  assert.equal(hit.arenaName, "Farol dos Acendedores");
  assert.ok(getArchipelagoMissionTheme("shipwrecked"));
  assert.ok(["ultimo-legionario", "senhor-dos-acendedores", "primeiro-naufrago"].includes(hit.guardianComposition), hit.guardianComposition);
});

test("a origem das criaturas compartilhadas não passa para os náufragos", () => {
  const others = ["storm", "floating", "pirate-held", "sea-caves", "volcanic", "coral-coast", "atoll", "mangrove", "tropical"];
  for (const id of getIslandCreatureIds("shipwrecked")) {
    if (!others.some(theme => getIslandCreatureIds(theme).includes(id))) continue;
    assert.notEqual(getCreatureOriginThemeId(id), "shipwrecked", id);
  }
  for (const id of ["crocodilo", "aparicao", "turba-zumbi", "fobossuco"]) {
    assert.equal(getCreatureOriginThemeId(id), "mangrove", id);
  }
});

const combatLandmarks = {
  "Afastar os carniceiros da praia": "Bote de resgate",
  "Conter os afogados da arrebentação": "Casco virado",
  "Romper o cerco às barracas": "Porta da barraca dos feridos",
  "Libertar os cativos da paliçada": "Portão da paliçada",
  "Disputar a bacia": "Margem dos odres",
  "Interceptar a patrulha": "Saída da trilha",
  "Proteger o cartógrafo": "Cartógrafo",
  "Defender a posição avançada": "Barricada da boca"
};

function shipwreckedCombatMap(sector, variant) {
  const objective = createIslandSector(island, sector, variant, 22);
  if (objective.type !== "combate") return null;
  const scene = createIslandSectorCombat({ ...island, objectives: [objective] }, objective, profile, `${sector}:${variant}:a`);
  const withLayout = withIslandTacticalLayout(scene, "shipwrecked", objective);
  return { objective, withLayout, map: createNodeTacticalMap(withLayout) };
}

test("cada combate dos náufragos abre a planta da própria cena", () => {
  const seen = new Set();
  for (let sector = 0; sector < 4; sector += 1) {
    const zonesInSector = [];
    for (let variant = 0; variant < 4; variant += 1) {
      const result = shipwreckedCombatMap(sector, variant);
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

test("plantas por tarefa dos náufragos não vazam para outras ilhas", () => {
  const scene = { environment: { terrain: { features: [] } } };
  for (const [themeId, title] of [["atoll", "Interceptar a patrulha"], ["coral-coast", "Defender a posição avançada"]]) {
    const result = withIslandTacticalLayout(scene, themeId, { direction: "O", title }).tacticalLayout;
    const expected = withIslandTacticalLayout(scene, themeId, { direction: "O", title: "sem título" }).tacticalLayout;
    assert.deepEqual(result, expected, themeId);
  }
  assert.equal(withIslandTacticalLayout(scene, "atoll", { direction: "O", title: "Interceptar a patrulha" }).tacticalLayout.landmark.name, "Borda do poço");
  assert.equal(withIslandTacticalLayout(scene, "coral-coast", { direction: "O", title: "Defender a posição avançada" }).tacticalLayout.landmark.name, "Altar das pérolas");
  const leaky = withIslandTacticalLayout(scene, "atoll", { direction: "O", title: "Conter os afogados da arrebentação" }).tacticalLayout.landmark.name;
  assert.equal(leaky, "Borda do poço");
});

test("o acampamento tem dois combates", () => {
  const titles = [];
  for (let variant = 0; variant < 3; variant += 1) {
    const objective = createIslandSector(island, 1, variant, 22);
    if (objective.type === "combate") titles.push(objective.title);
  }
  assert.deepEqual(titles, ["Romper o cerco às barracas", "Libertar os cativos da paliçada"]);
});

const lensRule = "Lente do farol: uma personagem adjacente à lente pode gastar uma ação padrão para apontar o facho para a aparição, se ela estiver em linha de visão. Até o fim do próximo turno da aparição, ela conta como exposta à luz do dia e fica debilitada (Vulnerabilidade à Luz do Dia). A ação pode ser repetida nas rodadas seguintes.";

function fullIsland(base) {
  const objectives = [0, 1, 2, 3].map(sector => createIslandSector(base, sector, 0, 22));
  return { ...base, baseChallenge: 8, objectives, outcomes: Object.fromEntries(objectives.map(({ id }) => [id, "failure"])) };
}

test("só o Primeiro Náufrago traz a regra da lente", () => {
  const full = fullIsland(island);
  const first = createIslandGuardian(full, "primeiro-naufrago", profile, "centro");
  assert.equal(first.rule, lensRule);
  assert.ok(first.briefing.startsWith("O céu está encoberto"));
  for (const id of ["ultimo-legionario", "senhor-dos-acendedores"]) {
    assert.equal(createIslandGuardian(full, id, profile, "centro").rule, undefined, id);
  }
  const atoll = fullIsland({ floor: 21, themeId: "atoll" });
  assert.equal(createIslandGuardian(atoll, 0, profile, "centro").rule, undefined);
});

test("guardião salvo sem regra continua igual", () => {
  // O renderer depende de DOM; aqui só se garante que a cena não carrega a chave quando não há regra.
  const scene = createIslandGuardian(fullIsland(island), "ultimo-legionario", profile, "centro");
  assert.equal("rule" in scene, false);
  assert.ok(!JSON.stringify(scene).includes('"rule"'));
});

test("inimigos dos náufragos não começam colados ao ponto de interação", () => {
  const tasks = [
    ["Conter os afogados da arrebentação", 0, 2, 2],
    ["Romper o cerco às barracas", 1, 1, 2],
    ["Interceptar a patrulha", 2, 3, 3]
  ];
  for (const [title, sector, variant, minDistance] of tasks) {
    const objective = createIslandSector(island, sector, variant, 22);
    assert.equal(objective.title, title);
    for (let n = 0; n < 50; n += 1) {
      const scene = createIslandSectorCombat({ ...island, objectives: [objective] }, objective, profile, `p${n}`);
      const map = createNodeTacticalMap(withIslandTacticalLayout(scene, "shipwrecked", objective));
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
        assert.ok(Math.max(dx, dy) >= minDistance, `${title} p${n}: peça em ${piece.x},${piece.y} perto do marco`);
      }
    }
  }
});
