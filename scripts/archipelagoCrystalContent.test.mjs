import assert from "node:assert/strict";
import test from "node:test";
import { createIslandGuardian, createIslandSector, createIslandSectorCombat, hasIslandSectors } from "../src/archipelagoPilot.js";
import { getIslandCreatureIds } from "../src/archipelagoCreatureRules.js";
import { calculateCombatND } from "../src/challenge.js";
import { getCreatureById } from "../src/creatureCatalog/index.js";
import { rerollNodeCreatures } from "../src/encounterResolver.js";
import { archipelago21to30Profile as profile } from "../src/floorProfiles/archipelago21to30.js";
import { getArchipelagoMissionTheme } from "../src/missions/archipelagoMissionThemes.js";

const island = { floor: 25, themeId: "crystal", baseChallenge: 9 };
const scorpion = "escorpiao-de-cristal";
const directionOrder = ["NO", "NL", "O", "L", "SO", "SL"];

test("a Ilha de Cristal tem seis setores com duas variantes de combate e um teste de três etapas", () => {
  assert.ok(hasIslandSectors({ ...island, pilot: "crystal-sectors" }));
  for (const [index, direction] of directionOrder.entries()) {
    const tasks = [0, 1, 2].map(variant => createIslandSector(island, index, variant, 24));
    assert.deepEqual(tasks.map(task => task.direction), [direction, direction, direction]);
    assert.deepEqual(tasks.map(task => task.challenge), [3, 7, 7]);
    assert.equal(tasks[0].guardianBuffId, index === 4 ? "defense" : index === 5 ? "hp" : undefined);
  }
});

test("o escorpião é uma opção sorteável e rerrolável das galerias, com ND final 7", () => {
  const regionalIds = getIslandCreatureIds("crystal");
  assert.ok(regionalIds.includes(scorpion));
  const combats = directionOrder.flatMap((_, index) => [1, 2].map(variant => createIslandSector(island, index, variant, 24)));
  const companions = new Set();
  let rollsWithScorpion = 0;
  for (let index = 0; index < 64; index++) {
    for (const objective of combats) {
      const scene = createIslandSectorCombat({ ...island, objectives: [objective] }, objective, profile, `cristal-content-${index}`);
      assert.equal(scene.fixedComposition, undefined);
      const { items } = scene.resolvedEncounter;
      assert.equal(calculateCombatND(items), 7);
      assert.ok(items.every(item => regionalIds.includes(item.creatureId)));
      if (!items.some(item => item.creatureId === scorpion)) continue;
      assert.equal(objective.direction, "NO");
      assert.equal(items.find(item => item.creatureId === scorpion).challengeRating, 4);
      rollsWithScorpion++;
      for (const item of items) if (item.creatureId !== scorpion) companions.add(item.creatureId);
      const rerolled = rerollNodeCreatures(scene, profile);
      assert.equal(calculateCombatND(rerolled.items), 7);
      assert.notDeepEqual(rerolled.items.map(item => item.creatureId), items.map(item => item.creatureId));
    }
  }
  assert.ok(rollsWithScorpion > 0);
  assert.ok(rollsWithScorpion < 128);
  assert.ok(companions.size > 1);
});

test("o Centro tem três composições ND 9, ciclo solar e missão da passagem", () => {
  const objectives = directionOrder.map((_, index) => createIslandSector(island, index, 0, 24));
  for (const [index, id] of [[0, "golem-de-espelhos"], [1, "tausideros"], [2, "centopeia-solar"]]) {
    const scene = createIslandGuardian({ ...island, objectives }, index, profile, "prisma");
    assert.equal(calculateCombatND(scene.resolvedEncounter.items), 9);
    assert.equal(scene.bossCreatureId, id);
    assert.equal(scene.resolvedEncounter.items[0].quantity, 1);
    assert.match(scene.rule, /A → B → C/);
  }
  const savedSelection = createIslandGuardian({ ...island, objectives }, "amebas-do-prisma", profile, "prisma");
  assert.equal(savedSelection.bossCreatureId, "tausideros");
  assert.match(savedSelection.rule, /cristalização/);
  assert.deepEqual(savedSelection.resolvedEncounter.items[0].creatureData.abilities, getCreatureById("tausideros").abilities);
  assert.equal(getArchipelagoMissionTheme("crystal").featured.title, "Abrir uma passagem à sombra");
});

test("as 12 fichas regionais aparecem nos encontros ou nas rerrolagens com ND 7", () => {
  const expected = new Set(getIslandCreatureIds("crystal"));
  assert.equal(expected.size, 12);
  const objective = createIslandSector(island, 0, 1, 24);
  const sceneIsland = { ...island, objectives: [objective] };
  const seen = new Set();
  const seenOnReroll = new Set();
  for (let index = 0; index < 320; index++) {
    const scene = createIslandSectorCombat(sceneIsland, objective, profile, `elenco-cristal-${index}`);
    const first = scene.resolvedEncounter.items;
    const second = rerollNodeCreatures(scene, profile).items;
    for (const [items, recorded] of [[first, seen], [second, seenOnReroll]]) {
      assert.equal(calculateCombatND(items), 7);
      for (const { creatureId } of items) recorded.add(creatureId);
    }
  }
  assert.deepEqual(seen, expected);
  assert.deepEqual(seenOnReroll, expected);
});
