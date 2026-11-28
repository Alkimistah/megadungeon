import assert from "node:assert/strict";
import test from "node:test";
import { calculateCombatND } from "../src/challenge.js";
import {
  canRerollNodeCreatures, canRerollNodeEscort, hasRecordedEncounterProgress, rerollNodeEscort, resolveNodeEncounter
} from "../src/encounterResolver.js";
import { forest11to20Profile as profile } from "../src/floorProfiles/forest11to20.js";
import { generateMapData } from "../src/generator.js";
import { createRng } from "../src/random.js";
import { getForestEscortTarget } from "../src/traps.js";

function escortNodes() {
  const found = [];
  for (const [floor, seed] of [[11, "identity0"], [15, "identity0"], [17, "identity1"], [19, "identity2"]]) {
    const nodes = generateMapData(8, 20, profile, floor, createRng(seed), { version: 5, mapSeed: seed }).flat();
    for (const node of nodes) {
      if (node.contentType !== "trap" || !node.forestComposition?.creatures.length) continue;
      resolveNodeEncounter(node, { profile, mapSeed: seed });
      found.push(node);
    }
  }
  return found;
}

const creaturesOf = encounter => encounter.items.filter(item => item.kind === "creature");
const clone = node => structuredClone(node);

function reroll(node) {
  return rerollNodeEscort(clone(node), profile);
}

function rerollableNode() {
  const node = escortNodes().find(candidate => reroll(candidate));
  assert.ok(node, "faltou nó de armadilha com escolta rerrolável");
  return node;
}

test("rerolls the escort and keeps the trap", () => {
  const node = rerollableNode();
  assert.equal(canRerollNodeEscort(node), true);
  assert.equal(canRerollNodeCreatures(node), false);
  const original = node.resolvedEncounter;
  const result = reroll(node);
  const originalTrap = original.items.find(item => item.kind === "trap");
  assert.deepEqual(result.items.find(item => item.kind === "trap"), originalTrap);
  const creatures = creaturesOf(result);
  assert.notDeepEqual(creatures.map(i => [i.creatureId, i.quantity]), creaturesOf(original).map(i => [i.creatureId, i.quantity]));
  const target = getForestEscortTarget(node.trap.challengeRating);
  assert.equal(calculateCombatND(creatures), target);
  assert.ok(target < node.trap.challengeRating);
  assert.ok(creatures.every(item => item.type === "humanoid"));
  assert.equal(result.escortRerolls, 1);
  assert.deepEqual(result.items.slice(creatures.length).map(item => item.kind), original.items.filter(i => i.kind !== "creature").map(i => i.kind));
});

test("is deterministic and counts successive rerolls", () => {
  const successive = candidate => {
    const first = reroll(candidate);
    return first && rerollNodeEscort({ ...clone(candidate), resolvedEncounter: first }, profile);
  };
  const node = escortNodes().find(successive);
  assert.ok(node, "faltou nó com duas rerrolagens seguidas possíveis");
  assert.deepEqual(reroll(node), reroll(node));
  assert.equal(successive(node).escortRerolls, 2);
});

test("survives a JSON round trip", () => {
  const node = rerollableNode();
  const result = reroll(node);
  const restored = JSON.parse(JSON.stringify(result));
  assert.equal(restored.escortRerolls, 1);
  assert.deepEqual(restored.items, JSON.parse(JSON.stringify(result.items)));
  assert.deepEqual(restored, JSON.parse(JSON.stringify(result)));
});

test("returns null without an alternative", () => {
  const restricted = id => ({ ...profile, creatureRules: { ...profile.creatureRules, allowedCreatureIds: [id], allowedCreatureIdsByFloor: undefined } });
  const cases = escortNodes().filter(node => creaturesOf(node.resolvedEncounter).length === 1)
    .map(node => ({ node, profile: restricted(creaturesOf(node.resolvedEncounter)[0].creatureId) }));
  const closed = cases.filter(({ node, profile: only }) => rerollNodeEscort(clone(node), only) === null);
  assert.ok(closed.length, "faltou catálogo que fecha uma única combinação");
  for (const { node, profile: only } of closed) assert.equal(canRerollNodeEscort(node), true);
});

test("blocks the reroll when the escort cannot or must not change", () => {
  const node = rerollableNode();
  const withEncounter = patch => ({ ...clone(node), ...patch });
  assert.equal(canRerollNodeEscort(node), true);
  const without = clone(node);
  without.resolvedEncounter.items = without.resolvedEncounter.items.filter(item => item.kind !== "creature");
  assert.equal(canRerollNodeEscort(without), false);
  const reinforced = clone(node);
  reinforced.resolvedEncounter.items[0] = { ...reinforced.resolvedEncounter.items[0], reinforcement: true };
  assert.equal(canRerollNodeEscort(reinforced), false);
  const adjusted = clone(node);
  adjusted.resolvedEncounter.adjusted = true;
  assert.equal(canRerollNodeEscort(adjusted), false);
  for (const blocked of [
    withEncounter({ missionBindings: [{ id: "m" }] }),
    withEncounter({ missionObjectives: [{ id: "m" }] }),
    withEncounter({ fixedComposition: { creatures: [] } }),
    withEncounter({ fixedTacticalMap: {} })
  ]) assert.equal(canRerollNodeEscort(blocked), false);
  const normal = generateMapData(8, 20, profile, 15, createRng("identity0"), { version: 5, mapSeed: "identity0" })
    .flat().find(candidate => candidate.contentType === "normal" && candidate.creature);
  resolveNodeEncounter(normal, { profile, mapSeed: "identity0" });
  assert.equal(canRerollNodeEscort(normal), false);
});

test("hasRecordedEncounterProgress detects recorded kills for the encounter seed", () => {
  const node = { resolvedEncounter: { seed: "s1" } };
  const mission = keys => ({ progress: { recordedEncounters: keys } });
  assert.equal(hasRecordedEncounterProgress(node, []), false);
  assert.equal(hasRecordedEncounterProgress(node, [mission(["s2:a:0"])]), false);
  assert.equal(hasRecordedEncounterProgress(node, [{}, mission([])]), false);
  assert.equal(hasRecordedEncounterProgress(node, [mission(["s2:a:0"]), mission(["s1:a:0"])]), true);
});
