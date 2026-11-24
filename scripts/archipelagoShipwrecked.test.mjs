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
  createIslandGuardian, createIslandSector, createIslandSectorCombat, getIslandThemeTerrain
} from "../src/archipelagoPilot.js";

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
  const objectives = [0, 1, 2, 3].map(sector => ({ ...createIslandSector(island, sector, 0, 22), }));
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

test("expedição nova pode sortear a Ilha dos Náufragos completa", async () => {
  const { hasIslandSectors } = await import("../src/archipelagoPilot.js");
  const { getArchipelagoMissionTheme } = await import("../src/missions/archipelagoMissionThemes.js");
  let found = null;
  for (let i = 0; i < 200 && !found; i += 1) {
    const seed = `naufragos-${i}`;
    const { islands } = createArchipelagoState(profile, createRng(seed)).getSnapshot();
    const hit = islands.find(item => item.themeId === "shipwrecked");
    if (hit) found = { seed, hit };
  }
  assert.ok(found, "nenhuma seed sorteou shipwrecked");
  const { hit } = found;
  console.log("SEED", found.seed, "floor", hit.floor);
  assert.ok(hit.floor >= 21 && hit.floor <= 24);
  assert.equal(hasIslandSectors(hit), true);
  assert.equal(hit.objectives.length, 4);
  assert.equal(new Set(hit.objectives.map(item => item.penaltyId)).size, 4);
  assert.equal(hit.arenaName, "Farol dos Acendedores");
  assert.ok(getArchipelagoMissionTheme("shipwrecked"));
});
