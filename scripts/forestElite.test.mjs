import assert from "node:assert/strict";
import test from "node:test";
import {
  canRerollNodeCreatures, resolveForestElite, resolveNodeEncounter, rerollNodeCreatures, rerollNodeTrap
} from "../src/encounterResolver.js";
import { calculateCombatND } from "../src/challenge.js";
import { getAutomaticCreatureCatalog } from "../src/creatureCatalog/index.js";
import { forest11to20Profile as profile } from "../src/floorProfiles/forest11to20.js";
import { generateMapData } from "../src/generator.js";
import { createRng } from "../src/random.js";

const node = { id: 8, level: 1, generationVersion: 5, type: "elite", challenge: { encounter: 7 } };
const catalog = getAutomaticCreatureCatalog(profile);
function subset(ratings, traps = false, filter = () => true) {
  return { ...profile, creatureRules: { ...profile.creatureRules,
    allowedCreatureIds: catalog.filter(c => ratings.includes(c.challengeRating) && filter(c)).map(c => c.id)
  }, trapRules: { ...profile.trapRules, sources: traps ? profile.trapRules.sources : [] } };
}
function sceneFrom(base, result, seed) {
  const scene = { ...base, challenge: { ...base.challenge, creatures: result.creatureTarget },
    creature: { targetChallenge: result.creatureTarget }, trap: result.trap,
    forestComposition: { seed, variant: result.variant, creatures: result.items.map(i => ({ id: i.creatureId, quantity: i.quantity })) } };
  return scene;
}
function assertSinglePrincipal(items) {
  const top = Math.max(...items.map(item => item.challengeRating));
  assert.equal(items.filter(item => item.challengeRating === top).reduce((sum, item) => sum + item.quantity, 0), 1);
}
const ratings = items => items.map(item => item.challengeRating).sort((a, b) => b - a);

test("elite target 7 closes as 6 + 5, 6 + trap 1 or a single ND 7 principal", () => {
  const group = resolveForestElite(node, subset([6, 5]), { seed: "elite-seven" });
  assert.deepEqual([group.variant, ratings(group.items), group.trap], ["eliteGroup", [6, 5], null]);
  const trap = resolveForestElite(node, subset([6], true), { seed: "elite-seven" });
  assert.deepEqual([trap.variant, ratings(trap.items), trap.trap.challengeRating, trap.trap.mode], ["eliteTrap", [6], 1, "standalone"]);
  assert.equal(trap.creatureTarget, 6);
  const single = resolveForestElite(node, subset([7]), { seed: "elite-seven" });
  assert.deepEqual([single.variant, ratings(single.items), single.creatureTarget], ["eliteSingle", [7], 7]);
});

test("elite uses one highest-rated principal and its chosen variant survives rerolls", () => {
  for (const [ratings, traps, variant] of [[[6, 5], false, "eliteGroup"], [[6], true, "eliteTrap"], [[7], false, "eliteSingle"]]) {
    const p = subset(ratings, traps);
    const result = resolveForestElite(node, p, { seed: "elite-seven" });
    assert.equal(result.variant, variant);
    assert.equal(calculateCombatND(result.items) + (result.trap?.challengeRating ?? 0), 7);
    const scene = sceneFrom(node, result, "elite-seven");
    resolveNodeEncounter(scene, { profile: p });
    for (let reroll = 0; reroll < 3; reroll++) {
      const next = rerollNodeCreatures(scene, p);
      assert.ok(next);
      const creatures = next.items.filter(i => i.kind === "creature");
      assert.equal(calculateCombatND(creatures), result.creatureTarget);
      assert.equal(creatures[0].quantity, 1);
      assert.ok(creatures.slice(1).every(i => i.challengeRating < creatures[0].challengeRating));
      assert.equal(creatures.length > 1, variant === "eliteGroup");
      assert.deepEqual(next.items.filter(i => i.kind === "trap"), scene.resolvedEncounter.items.filter(i => i.kind === "trap"));
      scene.resolvedEncounter = next;
    }
    if (traps) {
      for (let reroll = 0; reroll < 4; reroll++) {
        const next = rerollNodeTrap(scene, p);
        assert.equal(next.trap.mode, "standalone");
        assert.equal(next.trap.challengeRating, 1);
        scene.trap = next.trap;
        scene.resolvedEncounter = next.encounter;
      }
    }
  }
});

test("a reroll without an alternative inside the variant keeps the composition", () => {
  const only = catalog.find(c => c.challengeRating === 7);
  const p = subset([7], false, c => c.id === only.id);
  const result = resolveForestElite(node, p, { seed: "lonely" });
  assert.equal(result.variant, "eliteSingle");
  const scene = sceneFrom(node, result, "lonely");
  resolveNodeEncounter(scene, { profile: p });
  assert.equal(rerollNodeCreatures(scene, p), null);
});

test("degrades to the best viable elite above normal, then to the floor normal", () => {
  assert.equal(resolveForestElite(node, subset([6]), { seed: "lower" }).creatureTarget, 6);
  assert.equal(resolveForestElite(node, subset([6]), { seed: "lower" }).variant, "eliteSingle");
  assert.equal(resolveForestElite(node, subset([3]), { seed: "normal" }).effectiveType, "normal");
});

test("every procedural elite keeps one principal and never exceeds its target", () => {
  const terrains = [["Floresta", []], ["Pântano", []], ["Aquático", ["Água parada"]], ["Colinas", ["Paredão"]], ["Planície aberta", []]];
  for (const [name, features] of terrains) {
    for (let encounter = 3; encounter <= 7; encounter++) {
      for (let i = 0; i < 4; i++) {
        const elite = { ...node, challenge: { encounter },
          environment: { terrain: { name, features: features.map(feature => ({ name: feature })) }, climate: [] } };
        const result = resolveForestElite(elite, profile, { seed: `cap:${name}:${encounter}:${i}` });
        assert.equal(result.effectiveType, "elite");
        assertSinglePrincipal(result.items);
        const total = calculateCombatND(result.items) + (result.trap?.challengeRating ?? 0);
        assert.ok(total <= encounter && total >= encounter - 1, `${name} ${encounter}: ${total}`);
        if (name === "Aquático") assert.ok(result.items.every(item => getAquatic(item.creatureId)));
      }
    }
  }
});
const getAquatic = id => catalog.find(c => c.id === id)?.ecology?.terrains?.includes("aquatico");

test("the generator stores the elite variant and converts unviable elites to normal", () => {
  const seed = "elite-map-2";
  const full = generateMapData(8, 20, profile, 19, createRng(seed), { version: 5 }).flat();
  const elites = full.filter(n => n.contentType === "elite");
  assert.ok(elites.some(n => n.type === "elite") && elites.some(n => n.type === "unknown"));
  for (const elite of elites) {
    assert.match(elite.forestComposition.variant, /^elite(Group|Trap|Single)$/);
    assert.equal(elite.challenge.creatures + elite.challenge.trap, 7);
    assert.equal(elite.creature.targetChallenge, elite.challenge.creatures);
    const encounter = resolveNodeEncounter(elite, { profile, mapSeed: seed });
    assertSinglePrincipal(encounter.items.filter(item => item.kind === "creature"));
  }

  const weak = subset([0.25, 0.5, 1, 2]);
  const converted = generateMapData(8, 20, weak, 19, createRng(seed), { version: 5 }).flat();
  for (const before of elites) {
    const after = converted.find(n => n.id === before.id);
    assert.equal(after.contentType, "normal");
    assert.equal(after.forestComposition, undefined);
    assert.equal(after.challenge.creatures, 5);
    assert.equal(after.creature.targetChallenge, 5);
    if (before.type === "unknown") {
      assert.equal(after.type, "unknown");
      assert.equal(after.label, before.label);
      assert.equal(after.revealedLabel, "Encontro normal");
    } else {
      assert.deepEqual([after.type, after.label, after.short], ["normal", "Encontro normal", "N"]);
    }
    const encounter = resolveNodeEncounter(after, { profile: weak, mapSeed: seed });
    assert.ok(encounter.items.some(item => item.kind === "creature"));
  }
});

test("a mission's fixed composition wins over the procedural elite", () => {
  const result = resolveForestElite(node, subset([6, 5]), { seed: "mission" });
  const scene = { ...sceneFrom(node, result, "mission"), fixedComposition: { creatures: [{ id: "jiboia", quantity: 2 }], traps: [] } };
  const encounter = resolveNodeEncounter(scene, { profile });
  assert.deepEqual(encounter.items.map(item => [item.creatureId, item.quantity]), [["jiboia", 2]]);
  assert.equal(canRerollNodeCreatures(scene), false);
});
