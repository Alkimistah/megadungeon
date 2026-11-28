import assert from "node:assert/strict";
import test from "node:test";
import { calculateCombatND } from "../src/challenge.js";
import { getAutomaticCreatureCatalog, getCreatureById } from "../src/creatureCatalog/index.js";
import * as vocabulary from "../src/creatureCatalog/ecologyVocabulary.js";
import {
  canComposeNodeAnimals, createEliteVariant, rerollNodeCreatures, resolveForestAmbush, resolveForestElite, resolveNodeEncounter
} from "../src/encounterResolver.js";
import { canComposeAnimalCommunity, getAnimalCommunities, getCommunityAnimals } from "../src/forestAnimalCommunities.js";
import { forest11to20Profile as profile } from "../src/floorProfiles/forest11to20.js";

const catalog = getAutomaticCreatureCatalog(profile);
const terrains = {
  Floresta: "floresta", Pântano: "pantano", Aquático: "aquatico", Colinas: "colina", "Planície aberta": "planicie"
};

for (const [terrainName, terrainTag] of Object.entries(terrains)) {
  test(`${terrainName} has animal communities that can fill ND 1–5`, () => {
    const communities = getAnimalCommunities(profile, terrainName);
    assert.ok(communities.length > 0, terrainName);
    const families = new Set(vocabulary.FAMILIES.map(({ id }) => id));
    for (const community of communities) {
      assert.ok(Number.isInteger(community.maxSheets) && community.maxSheets >= 1 && community.maxSheets <= 3, community.id);
      assert.ok(community.weight > 0, community.id);
      assert.ok(community.families.length > 0, community.id);
      const members = getCommunityAnimals(catalog, community, terrainTag);
      for (const family of community.families) {
        assert.ok(families.has(family), `${community.id}: ${family}`);
        assert.ok(members.some(animal => animal.ecology.family === family), `${community.id}: ${family} sem ficha`);
      }
      for (const target of [1, 2, 3, 4, 5]) {
        assert.ok(canComposeAnimalCommunity({ catalog, terrainTag, target, communities: [community], upgrade: createEliteVariant }),
          `${community.id}: ND ${target}`);
      }
    }
  });
}

test("each automatic forest animal has a family from the reviewed vocabulary", () => {
  const families = new Set(vocabulary.FAMILIES?.map(({ id }) => id));
  const animals = catalog.filter(creature => creature.type === "animal");
  assert.ok(animals.length > 0);
  for (const { id, ecology } of animals) assert.ok(families.has(ecology.family), id);
});

test("the reviewed habitat can clear a creature's old tags", () => {
  const { ecology } = getCreatureById("leoa-rainha");
  assert.deepEqual(ecology.forestTerrains, []);
  assert.deepEqual(ecology.terrains, ["montanha"]);
});

function aquaticNode(generationVersion) {
  return {
    id: "aquatic-node", level: 15, type: "normal", contentType: "normal", generationVersion,
    encounterSeed: "aquatic-community-data", environment: { terrain: { name: "Aquático", features: [] }, climate: [] },
    challenge: { creatures: 3, encounter: 3 },
    creature: { type: "animal", targetChallenge: 3, allowedCreatureIds: ["sucuri", "jiboia"] }
  };
}

test("a v6 aquatic node selects and rerolls snakes with the reviewed habitat", () => {
  const node = aquaticNode(6);
  assert.equal(canComposeNodeAnimals(node, profile), true);
  const encounter = resolveNodeEncounter(node, { profile });
  assert.ok(["aquatico-espreita-no-remanso", "aquatico-aguas-profundas"].includes(encounter?.animalCommunityId));
  assert.equal(calculateCombatND(encounter.items), 3);
  assert.ok(encounter.items.every(item => node.creature.allowedCreatureIds.includes(item.creatureId)));
  const rerolled = rerollNodeCreatures(node, profile);
  assert.equal(rerolled?.animalCommunityId, encounter.animalCommunityId);
  assert.equal(calculateCombatND(rerolled.items), 3);
  assert.notDeepEqual(rerolled.items, encounter.items);
});

test("a saved v5 aquatic node still filters by the original habitat tags", () => {
  assert.deepEqual(getCreatureById("sucuri").ecology.terrains, []);
  assert.equal(resolveNodeEncounter(aquaticNode(5), { profile }), null);
});

function snakesOnlyProfile() {
  return {
    ...profile,
    trapRules: { ...profile.trapRules, sources: [] },
    creatureRules: { ...profile.creatureRules, allowedCreatureIds: ["sucuri", "jiboia"] }
  };
}

test("an aquatic ambush can use the reviewed habitat in v6", () => {
  const node = { ...aquaticNode(6), type: "scene", scene: { kind: "falseRest" } };
  const encounter = resolveForestAmbush(node, snakesOnlyProfile());
  assert.ok(encounter?.animalCommunityId);
  assert.equal(calculateCombatND(encounter.items), 3);
});

test("an aquatic v6 elite can lead with a creature from the reviewed habitat", () => {
  const node = { ...aquaticNode(6), type: "elite", contentType: "elite" };
  const result = resolveForestElite(node, snakesOnlyProfile(), { seed: "aquatic-elite" });
  assert.ok(result?.animalCommunityId);
  assert.equal(result.items[0].type, "animal");
  assert.equal(calculateCombatND(result.items), 3);
});
