import assert from "node:assert/strict";
import test from "node:test";
import { createExplorationState } from "../src/appState.js";
import { canRerollNodeTrap, rerollNodeTrap, resolveNodeEncounter } from "../src/encounterResolver.js";
import { forest11to20Profile as profile } from "../src/floorProfiles/forest11to20.js";
import { getTrapById } from "../src/traps.js";

function nodeWithRune() {
  const node = {
    id: "trap-start",
    level: 1,
    type: "trap",
    links: [],
    challenge: { encounter: 1, trap: 1, creatures: 0, terrain: 0.5, total: 1.5 },
    trap: { ...getTrapById("runa-de-aceleracao"), role: "primary", targetChallenge: 1 }
  };
  resolveNodeEncounter(node, { profile });
  return node;
}

test("rerolls a primary trap within its ND and allowed sources", () => {
  const node = nodeWithRune();
  const onlyBasic = { ...profile, trapRules: { ...profile.trapRules, sources: ["livroBasico"] } };
  const { trap, encounter } = rerollNodeTrap(node, onlyBasic);
  assert.equal(trap.source.id, "livroBasico");
  assert.equal(trap.challengeRating, 1);
  assert.equal(trap.role, "primary");
  assert.notEqual(trap.id, node.trap.id);
  assert.equal(encounter.items[0].trapId, trap.id);
  assert.equal(encounter.trapRerolls, 1);
  assert.equal(encounter.seed, node.resolvedEncounter.seed);
  assert.deepEqual(encounter.budget, node.resolvedEncounter.budget);
  assert.equal(node.trap.id, "runa-de-aceleracao");
});

test("fixed traps keep their compositions", () => {
  const node = nodeWithRune();
  assert.ok(canRerollNodeTrap(node));
  assert.equal(canRerollNodeTrap({ ...node, fixedTacticalMap: {} }), false);
  const profileWithoutAlternative = { ...profile, trapRules: { sources: ["ameacasArton"] } };
  assert.equal(rerollNodeTrap(node, profileWithoutAlternative), null);
});

test("restoring a regenerated node applies the saved trap to its map and stat block", () => {
  const node = nodeWithRune();
  const { trap, encounter } = rerollNodeTrap(node, profile);
  const restored = nodeWithRune();
  const state = createExplorationState();
  state.setLevels([[restored]]);
  state.importSessionState({ resolvedEncounters: [[restored.id, encounter]] });
  assert.equal(restored.trap.id, trap.id);
  assert.deepEqual(restored.trap.tags, trap.tags);
  assert.equal(restored.resolvedEncounter.items[0].trapId, trap.id);
});

test("rerolls an incidental trap without changing the creature, its adjustments, or the encounter budget", () => {
  const node = nodeWithRune();
  node.type = "normal";
  node.trap.role = "incidental";
  const original = node.resolvedEncounter;
  const creature = { kind: "creature", creatureId: "jiboia", quantity: 1, units: [{ hp: 4 }] };
  original.items.unshift(creature);
  original.items[1].role = "incidental";

  assert.ok(canRerollNodeTrap(node));
  const { encounter, trap } = rerollNodeTrap(node, profile);
  assert.equal(trap.role, "incidental");
  assert.equal(encounter.items[0], creature);
  assert.equal(encounter.items[1].trapId, trap.id);
  assert.equal(encounter.items[1].role, "incidental");
  assert.equal(encounter.budget, original.budget);

  const restored = nodeWithRune();
  restored.trap.role = "incidental";
  const state = createExplorationState();
  state.setLevels([[restored]]);
  state.importSessionState({ resolvedEncounters: [[restored.id, encounter]] });
  assert.equal(restored.trap.id, trap.id);
  assert.equal(restored.trap.role, "incidental");
});
