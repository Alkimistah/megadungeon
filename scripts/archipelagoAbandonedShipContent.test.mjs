import assert from "node:assert/strict";
import test from "node:test";
import {
  createIslandGuardian, createIslandPilot, createIslandSector, createIslandSectorCombat, getIslandThemeTerrain
} from "../src/archipelagoPilot.js";
import { getIslandCreatureIds } from "../src/archipelagoCreatureRules.js";
import { calculateCombatND } from "../src/challenge.js";
import { rerollNodeCreatures } from "../src/encounterResolver.js";
import { archipelago21to30Profile as profile } from "../src/floorProfiles/archipelago21to30.js";
import { getArchipelagoMissionTheme } from "../src/missions/archipelagoMissionThemes.js";

const island = { floor: 25, themeId: "abandoned-ship", baseChallenge: 9 };
const directions = ["NO", "NL", "O", "L", "SO", "SL"];

test("o Navio Abandonado tem seis setores, três variantes por setor e terreno de noite eterna", () => {
  const pilots = [0, 0.5, 0.99].map(roll => createIslandPilot(25, island.themeId, 24, () => roll));
  assert.deepEqual(pilots.map(pilot => pilot.guardianComposition),
    ["passageiro-da-ultima-viagem", "capitao-e-vigia", "sombra-do-caixao"]);
  for (const pilot of pilots) {
    assert.equal(pilot.pilot, "abandoned-ship-sectors");
    assert.equal(new Set(pilot.objectives.map(o => o.penaltyId).filter(Boolean)).size, 4);
  }
  const terrain = getIslandThemeTerrain(island.themeId);
  assert.match(terrain.name, /noite eterna/i);
  assert.match(terrain.features[0].effect, /portinhola/i);
  for (const [index, direction] of directions.entries()) {
    const objectives = [0, 1, 2].map(variant => createIslandSector(island, index, variant, 24));
    assert.deepEqual(objectives.map(o => o.direction), [direction, direction, direction]);
    assert.deepEqual(objectives.map(o => o.challenge), [3, 7, 7]);
    assert.equal(objectives[0].guardianBuffId, index === 4 ? "defense" : index === 5 ? "hp" : undefined);
  }
});

test("cada variante de combate sorteia e rerrola composições do elenco regional em ND 7", () => {
  const regionalIds = new Set(getIslandCreatureIds(island.themeId));
  assert.equal(regionalIds.size, 11);
  for (const sector of directions.keys()) {
    for (const variant of [1, 2]) {
      const objective = createIslandSector(island, sector, variant, 24);
      const compositions = new Set();
      for (let seed = 0; seed < 16; seed++) {
        const scene = createIslandSectorCombat({ ...island, objectives: [objective] }, objective, profile, `navio-${seed}`);
        assert.equal(scene.fixedComposition, undefined);
        const items = scene.resolvedEncounter.items;
        assert.equal(calculateCombatND(items), 7, objective.title);
        assert.ok(items.every(item => regionalIds.has(item.creatureId)), objective.title);
        const rerolled = rerollNodeCreatures(scene, profile);
        assert.equal(calculateCombatND(rerolled.items), 7, objective.title);
        assert.ok(rerolled.items.every(item => regionalIds.has(item.creatureId)), objective.title);
        const signature = entries => entries.map(({ creatureId, quantity }) => `${creatureId}:${quantity}`).sort().join(",");
        assert.notEqual(signature(items), signature(rerolled.items), objective.title);
        compositions.add(signature(items));
      }
      assert.ok(compositions.size > 2, objective.title);
    }
  }
});

test("as três composições de ND 9 incluem regras de combate e a missão do diário", () => {
  const objectives = directions.map((_, index) => createIslandSector(island, index, 0, 24));
  const expected = [["vampiro-passageiro-da-ultima-viagem"], ["fantasma", "alma-acorrentada"], ["entessombra-broto"]];
  for (const [index, ids] of expected.entries()) {
    const scene = createIslandGuardian({ ...island, objectives }, index, profile, "cabine");
    assert.deepEqual(scene.resolvedEncounter.items.map(item => item.creatureId), ids);
    assert.equal(calculateCombatND(scene.resolvedEncounter.items), 9);
    assert.match(scene.rule, /luz solar/i);
    if (index === 1) assert.match(scene.rule, /Memento/);
  }
  assert.equal(getArchipelagoMissionTheme(island.themeId).featured.title, "A Última Entrada");
});
