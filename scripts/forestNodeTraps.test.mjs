import assert from "node:assert/strict";
import test from "node:test";
import { getForestChallengeParts } from "../src/challenge.js";
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
