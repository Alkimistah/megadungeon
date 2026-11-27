import * as resolver from "../src/encounterResolver.js";
import assert from "node:assert/strict";
import test from "node:test";
import { calculateCombatND, getForestChallengeParts } from "../src/challenge.js";
import { forest11to20Profile as profile } from "../src/floorProfiles/forest11to20.js";
import { generateMapData } from "../src/generator.js";
import { createRng } from "../src/random.js";
import * as traps from "../src/traps.js";

function normalNode(encounter = 1) {
  return {
    type: "normal",
    generationVersion: 5,
    challenge: { encounter, climate: 0.25, terrain: 0.25 },
    trap: null
  };
}

test("classifies every trap according to the approved cards", () => {
  const requiresEscort = [
    "rede", "simbolo-do-medo", "simbolo-do-sono", "simbolo-da-dor",
    "bruma-da-insanidade", "simbolo-do-atordoamento", "armadilha-de-gaiola",
    "gas-putrido", "runa-de-teletransporte"
  ];
  assert.equal(traps.trapCatalog.length, 35);
  assert.deepEqual(traps.trapCatalog.filter(trap => trap.mode === "requiresEscort").map(trap => trap.id), requiresEscort);
  assert.equal(traps.trapCatalog.filter(trap => trap.mode === "standalone").length, 26);
  assert.equal(traps.getTrapById("rede").challengeRating, 0.25);
  assert.equal(traps.getTrapById("fosso-camuflado").mode, "standalone");
});

test("filters forest traps by source, ND ceiling and optional mode", () => {
  const basicOnly = { ...profile, trapRules: { ...profile.trapRules, sources: ["livroBasico"] } };
  const eligible = traps.getEligibleForestTraps(basicOnly, { maximumChallenge: 0.5, mode: "requiresEscort" });
  assert.deepEqual(eligible.map(trap => trap.id), ["rede"]);
  assert.deepEqual(traps.getEligibleForestTraps(profile, { maximumChallenge: 0.125 }), []);
});

test("includes the net as an incidental trap just below the 20% threshold", () => {
  const node = normalNode();
  const rolls = [0.199999, 0.65];
  traps.assignForestNormalTrap(node, profile, () => rolls.shift());
  assert.equal(node.trap.id, "rede");
  assert.equal(node.trap.role, "incidental");
  assert.match(node.trap.roleDescription, /mantém o ND das criaturas/);
  assert.deepEqual(getForestChallengeParts(node), { creatures: 1, trap: 0.25, environment: 0.5 });
  assert.equal(node.challenge.total, 1.75);
});

test("skips the trap at the 20% threshold", () => {
  const node = normalNode();
  traps.assignForestNormalTrap(node, profile, () => 0.2);
  assert.equal(node.trap, null);
  assert.equal(node.challenge.creatures, 1);
  assert.equal(node.challenge.total, 1.5);
});

test("leaves the normal creature target intact when no trap meets the source and ND rules", () => {
  const node = normalNode();
  const artonOnly = { ...profile, trapRules: { ...profile.trapRules, sources: ["ameacasArton"] } };
  traps.assignForestNormalTrap(node, artonOnly, () => 0);
  assert.equal(node.trap, null);
  assert.equal(node.challenge.trap, 0);
  assert.equal(node.challenge.creatures, 1);
});

test("uses the full floor ND for visible and hidden normal combats in a forest v5 map", () => {
  const ceilings = [0.25, 1, 2, 3, 4];
  for (const [index, maximum] of ceilings.entries()) {
    const target = index + 1;
    const floor = 11 + index * 2;
    const nodes = generateMapData(8, 20, profile, floor, createRng("forest-normal-v5-2"), { version: 5 }).flat();
    const normal = nodes.filter(node => node.contentType === "normal");
    assert.ok(nodes.every(node => node.generationVersion === 5));
    assert.ok(normal.some(node => node.type === "unknown" && node.trap));
    assert.ok(normal.some(node => node.type === "normal" && node.trap));
    for (const node of normal) {
      assert.equal(node.challenge.creatures, target);
      assert.equal(node.creature.targetChallenge, target);
      assert.ok((node.trap?.challengeRating ?? 0) <= maximum);
    }
  }
});

test("uses the v5 marker only when that version is requested for a forest", () => {
  const generate = (floorProfile, floor, options) =>
    generateMapData(5, 20, floorProfile, floor, createRng("forest-version"), options).flat();
  for (const version of [undefined, 1, 2, 3, 4, 6]) {
    assert.ok(generate(profile, 11, { version }).every(node => node.generationVersion === undefined));
  }
  const otherProfile = { ...profile, id: "other-profile" };
  assert.ok(generate(otherProfile, 11, { version: 5 }).every(node => node.generationVersion === undefined));
});


const trapNode = encounter => ({
  id: "T", encounterSeed: "11:T", type: "trap", generationVersion: 5,
  challenge: { encounter }, environment: { terrain: { name: "Floresta" } }
});

test("targets the escort from the selected trap rating", () => {
  assert.deepEqual([0.25, 0.5, 0.75, 1, 2, 3, 4, 5].map(traps.getForestEscortTarget),
    [0, 0.25, 0.25, 0.5, 1, 1, 2, 3]);
});

test("resolves a reproducible ND 1 humanoid escort for an ND 3 trap", () => {
  const node = trapNode(3);
  for (let i = 0; i < 128; i++) {
    const options = { seed: String(i) };
    const result = resolver.resolveForestTrapNode(node, profile, options);
    if (result.trap.challengeRating !== 3 || !result.items.length) continue;
    assert.equal(calculateCombatND(result.items), 1);
    assert.ok(result.items.every(item => item.type === "humanoid"));
    assert.deepEqual(result, resolver.resolveForestTrapNode(node, profile, options));
    return;
  }
  assert.fail("faltou armadilha ND 3 escoltada");
});

test("without eligible escorts, mandatory traps are replaced and optional traps remain alone", () => {
  const restricted = { ...profile, creatureRules: { ...profile.creatureRules, allowedCreatureIds: ["missing"] } };
  for (const [seed, mode] of [["1", "requiresEscort"], ["6", "standalone"]]) {
    const original = resolver.resolveForestTrapNode(trapNode(3), profile, { seed });
    assert.equal(original.trap.mode, mode);
    assert.ok(original.items.length);
    const fallback = resolver.resolveForestTrapNode(trapNode(3), restricted, { seed });
    assert.equal(fallback.items.length, 0);
    assert.equal(fallback.trap.id === original.trap.id, mode === "standalone");
  }
  for (const target of [0.25, 3]) {
    for (let i = 0; i < 32; i++) {
      const result = resolver.resolveForestTrapNode(trapNode(target), restricted, { seed: String(i) });
      assert.equal(result.trap.mode, "standalone");
      assert.ok(result.trap.challengeRating <= target);
      assert.equal(result.creatureTarget, 0);
      assert.deepEqual(result.items, []);
    }
  }
});

test("reroll keeps solitary traps autonomous and rejects a replacement when its escort cannot fit", () => {
  const node = trapNode(0.25);
  node.trap = { ...traps.getTrapById("fosso-camuflado"), role: "primary" };
  node.resolvedEncounter = { seed: "reroll", items: [{ kind: "trap", role: "primary", trapId: node.trap.id }] };
  const result = resolver.rerollNodeTrap(node, profile);
  assert.ok(!result || result.trap.mode === "standalone");
  const cageOnly = { ...profile, trapRules: { sources: ["ameacasArton"] } };
  const solitary = trapNode(0.5);
  solitary.trap = { ...traps.getTrapById("fosso-profundo"), role: "primary" };
  solitary.resolvedEncounter = { seed: "solitary", items: [{ kind: "trap", role: "primary", trapId: solitary.trap.id }] };
  assert.equal(resolver.rerollNodeTrap(solitary, cageOnly), null);
  node.resolvedEncounter.items.push({ kind: "creature", creatureId: "goblin", quantity: 10 });
  const before = structuredClone(node);
  const tacticalLayout = { zones: [], enemyArea: { minX: 12, maxX: 12, minY: 4, maxY: 4 } };
  assert.equal(resolver.rerollNodeTrap(node, profile, { tacticalLayout }), null);
  assert.deepEqual(node, before);
});

test("keeps an existing escort when switching a cage to an autonomous trap", () => {
  const node = trapNode(0.5);
  node.trap = { ...traps.getTrapById("armadilha-de-gaiola"), role: "primary" };
  node.resolvedEncounter = { seed: "cage", items: [
    { kind: "creature", creatureId: "goblin", quantity: 1 },
    { kind: "trap", trapId: node.trap.id, role: "primary" }
  ] };
  const result = resolver.rerollNodeTrap(node, profile);
  assert.equal(result.trap.mode, "standalone");
  assert.deepEqual(result.encounter.items[0], node.resolvedEncounter.items[0]);
});

test("preserves the encounter when both replacement traps occupy the crossing held by creatures", () => {
  const node = trapNode(1);
  node.encounterSeed = "14";
  node.environment = { terrain: { name: "Colinas", features: [{ name: "Penhasco" }] } };
  node.trap = { ...traps.getTrapById("runa-de-aceleracao"), role: "primary" };
  node.resolvedEncounter = { seed: "14", items: [
    { kind: "creature", creatureId: "jiboia", quantity: 8 },
    { kind: "trap", trapId: node.trap.id, role: "primary", quantity: 1 }
  ] };
  const before = structuredClone(node);
  assert.equal(resolver.rerollNodeTrap(node, profile), null);
  assert.deepEqual(node, before);
});

test("resolves the stored procedural escort with the seed validated during generation", () => {
  const nodes = generateMapData(8, 20, profile, 15, createRng("identity0"), { version: 5, mapSeed: "identity0" }).flat();
  const node = nodes.find(node => node.contentType === "trap" && node.forestComposition?.creatures.length);
  assert.ok(node);
  const restored = structuredClone(node);
  const encounter = resolver.resolveNodeEncounter(restored, { profile, mapSeed: "other" });
  assert.equal(encounter.seed, node.forestComposition.seed);
  assert.ok(node.encounterSeed.startsWith("15:"));
  const creatures = encounter.items.filter(item => item.kind === "creature");
  assert.equal(calculateCombatND(creatures), node.creature.targetChallenge);
  assert.deepEqual(creatures.map(item => ({ id: item.creatureId, quantity: item.quantity })), node.forestComposition.creatures);
  assert.equal(node.fixedComposition, undefined);
});

test("keeps the v5 incidental explanation after reroll and restoration", () => {
  const node = normalNode();
  traps.assignForestNormalTrap(node, profile, () => 0);
  const original = node.trap.roleDescription;
  node.resolvedEncounter = { seed: "incidental", items: [
    { kind: "trap", role: "incidental", trapId: node.trap.id, quantity: 1 },
    { kind: "creature", creatureId: "goblin", quantity: 1 }
  ] };
  const { trap, encounter } = resolver.rerollNodeTrap(node, profile);
  assert.equal(trap.roleDescription, original);
  node.resolvedEncounter = encounter;
  traps.syncRerolledTrapProfile(node);
  assert.equal(node.trap.id, trap.id);
  assert.equal(node.trap.roleDescription, original);
});
