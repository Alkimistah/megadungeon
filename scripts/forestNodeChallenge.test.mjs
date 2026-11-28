import assert from "node:assert/strict";
import { test } from "node:test";
import * as challenge from "../src/challenge.js";
import { forest11to20Profile } from "../src/floorProfiles/forest11to20.js";

const { getForestChallengeParts, updateForestChallengeTotal } = challenge;
const { challengeRules } = forest11to20Profile;

function forestNode() {
  return {
    generationVersion: 5,
    challenge: { encounter: 3, climate: 0.25, terrain: 0.25, creatures: 3, trap: 1, total: 3.5 },
    trap: { challengeRating: 1 }
  };
}

test("soma ambiente, alvo de criaturas e armadilha planejada", () => {
  const node = forestNode();
  updateForestChallengeTotal(node, challengeRules);
  assert.deepEqual(getForestChallengeParts(node), { environment: 0.5, creatures: 3, trap: 1 });
  assert.equal(node.challenge.total, 4.5);
  assert.equal(node.challenge.environment, 0.5);
  assert.equal(node.challenge.climate, 0.25);
  assert.equal(node.challenge.terrain, 0.25);
});

test("mostra o ND de combate resolvido e preserva o alvo de composição", () => {
  const node = forestNode();
  node.resolvedEncounter = { items: [
    { kind: "creature", challengeRating: 0.5, quantity: 2 },
    { kind: "creature", challengeRating: 0.5, quantity: 1 },
    { kind: "creature", challengeRating: 2, quantity: 1 }
  ] };
  // O grupo ND 1 contribui +1 à base ND 2. Um grupo só de ND 2 fica no ND 2.
  assert.equal(getForestChallengeParts(node).creatures, 3);
  node.resolvedEncounter.items.splice(0, 2);
  assert.deepEqual(getForestChallengeParts(node), { environment: 0.5, creatures: 2, trap: 0 });
  updateForestChallengeTotal(node, challengeRules);
  assert.equal(node.challenge.creatures, 3);
  assert.equal(node.challenge.total, 4.5);
});

test("soma o ND das fichas fixas de armadilhas após a resolução", () => {
  const node = forestNode();
  node.fixedComposition = { creatures: [], traps: ["alfa", "alfa", "beta"] };
  node.resolvedEncounter = { items: [
    { kind: "trap", trapId: "alfa", challengeRating: 0.25, quantity: 2 },
    { kind: "trap", trapId: "beta", challengeRating: 1, quantity: 1 }
  ] };
  assert.deepEqual(getForestChallengeParts(node), { environment: 0.5, creatures: 0, trap: 1.5 });
});

test("falso descanso preserva ND próprio até a resolução da emboscada", () => {
  const node = forestNode();
  node.scene = { kind: "falseRest", nd: 1 };
  node.challenge = { encounter: 1, climate: 0.25, terrain: 0.25, creatures: 0, trap: 0, total: 1.5 };
  node.trap = null;
  assert.equal(getForestChallengeParts(node), null);
  node.resolvedEncounter = { items: [] };
  assert.equal(getForestChallengeParts(node), null);
  node.resolvedEncounter.items.push({ kind: "creature", challengeRating: 0.25, quantity: 4 });
  assert.deepEqual(getForestChallengeParts(node), { environment: 0.5, creatures: 1, trap: 0 });
  updateForestChallengeTotal(node, challengeRules);
  assert.equal(node.challenge.total, 1.5);
});

test("mantém os limites do perfil no total planejado", () => {
  const node = forestNode();
  node.challenge.creatures = 8;
  updateForestChallengeTotal(node, challengeRules);
  assert.equal(node.challenge.total, 8);
  const emptyNode = { generationVersion: 5, challenge: {} };
  updateForestChallengeTotal(emptyNode, challengeRules);
  assert.equal(emptyNode.challenge.total, 0.25);
  assert.deepEqual(getForestChallengeParts(emptyNode), { environment: 0, creatures: 0, trap: 0 });
});

test("mantém ND especiais de criaturas resolvidas", () => {
  const node = forestNode();
  for (const rating of ["S", "S+", "–", "?"]) {
    node.resolvedEncounter = { items: [{ kind: "creature", challengeRating: rating, quantity: 1 }] };
    assert.equal(getForestChallengeParts(node).creatures, rating);
  }
});

test("retorna null para um nó legado", () => {
  const node = forestNode();
  delete node.generationVersion;
  assert.equal(getForestChallengeParts(node), null);
});

test("tesouro e acampamento v5 somam só o ambiente no agregado", async () => {
  const { generateMapData } = await import("../src/generator.js");
  const { createRng } = await import("../src/random.js");
  const nodes = generateMapData(8, 20, forest11to20Profile, 15, createRng("agg"), { version: 5, mapSeed: "agg" }).flat();
  const quiet = nodes.filter(node => ["treasure", "camp"].includes(node.contentType ?? node.type));
  assert.ok(quiet.length);
  for (const node of quiet) {
    if (node.scene?.nd != null) continue;
    const parts = getForestChallengeParts(node);
    assert.equal(parts.creatures, 0);
    assert.equal(parts.trap, 0);
    assert.equal(node.challenge.total, Math.max(parts.environment, challengeRules.minimum));
    assert.ok(!node.challenge.encounterBudgetLabel);
  }
});
