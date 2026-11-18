import assert from "node:assert/strict";
import test from "node:test";
import { generateMapData } from "../src/generator.js";
import { forest11to20Profile as profile } from "../src/floorProfiles/forest11to20.js";
import { createRng } from "../src/random.js";
import { canRerollNodeCreatures, rerollNodeCreatures, resolveForestAmbush, resolveNodeEncounter } from "../src/encounterResolver.js";
import { creatureCatalog } from "../src/creatureCatalog/index.js";
import { createNodeTacticalMap } from "../src/nodeTacticalMap.js";
import { calculateCombatND } from "../src/challenge.js";
import { createMissionGenerationContext, generateMissionOffers } from "../src/missions/missionGenerator.js";
import { createExplorationState } from "../src/appState.js";
import { createMissionState } from "../src/missions/missionState.js";
import { getForestTrapPresentation } from "../src/forestTrapPresentation.js";
import { getCreatureReinforcement, withCreatureReinforcement } from "../src/creatureReinforcement.js";
import { canAddEncounterCreature, getCreatureUnits, hasEncounterAdjustments, withCreatureAdded, withCreatureHealthChange, withLastHealthChangeUndone } from "../src/encounterCreatureHealth.js";

const integration = await import("../src/missions/forestMissionIntegration.js").catch(() => ({}));
const expeditionModule = await import("../src/forestExpedition.js").catch(() => ({}));
const presentation = await import("../src/nodeProgressPresentation.js").catch(() => ({}));

test("outdoor trap presentations use the terrain and repeat after restoring the encounter", () => {
  const node = {
    encounterSeed: "14:N2",
    environment: { terrain: { name: "Pântano" } },
    resolvedEncounter: { seed: "BADNZX7EM1:14:N2:encounter-v9" }
  };
  const item = { kind: "trap", trapId: "pendulo-de-teto", name: "Pêndulo de Teto", challengeRating: 1 };
  const saved = structuredClone({ node, item });
  const variation = getForestTrapPresentation(profile.id, node, item);
  assert.match(variation.name, /lâmina|laminado/i);
  assert.match(variation.description, /pântano|alagad[ao]/i);
  assert.deepEqual(getForestTrapPresentation(profile.id, saved.node, saved.item), variation);
  assert.deepEqual({ node, item }, saved);
  assert.deepEqual(Object.keys(variation).sort(), ["description", "name"]);

  node.environment.terrain.name = "Floresta";
  assert.notEqual(getForestTrapPresentation(profile.id, node, item).name, variation.name);
  const forestNames = new Set(Array.from({ length: 20 }, (_, index) =>
    getForestTrapPresentation(profile.id, { ...node, resolvedEncounter: { seed: `node-${index}` } }, item).name
  ));
  assert.ok(forestNames.size > 1);
  assert.equal(getForestTrapPresentation("dungeon-1-10", node, item), null);
  assert.equal(getForestTrapPresentation(profile.id, node, { ...item, trapId: "runa-de-protecao" }), null);
  node.environment.terrain.name = "Urbano";
  assert.equal(getForestTrapPresentation(profile.id, node, item), null);
});

function mission(category, { floor = 15, targetId = "sucuri", targetName = "Sucuri", quantity = 1, ...extra } = {}) {
  return {
    id: `m-${category}`, profileId: profile.id, category, categoryLabel: category, title: category,
    status: "selected", description: targetName,
    destination: category === "extermination" ? { kind: "progress", floor: null, floorMin: 11, floorMax: 19 } : { kind: "floor", floor },
    objective: { targetId, targetName, targetType: ["specialHunt", "extermination"].includes(category) ? "creature" : "material", quantity, condition: "cumprir objetivo" },
    integration: { bindings: [], state: "pending" }, ...extra
  };
}

function chain(budgets = [3, 3, 3]) {
  const nodes = budgets.map((budget, i) => ({
    id: i, level: i + 1, column: 3, type: "normal", contentType: "normal", label: "Encontro normal", links: [],
    skill: "Sobrevivência", dc: 21, investigationMinutes: 15, encounterSeed: `fixture-${i}`,
    challenge: { encounter: budget, creatures: budget, total: budget + 0.25, terrain: 0.25, climate: 0, trap: 0 },
    environment: { climate: [{ name: "Clima normal" }], terrain: { name: "Floresta", features: [] } },
    creature: { type: "animal", targetChallenge: budget }, trap: null
  }));
  nodes.forEach((node, i) => { node.links = nodes[i + 1] ? [nodes[i + 1]] : []; });
  return nodes.map(n => [n]);
}

function materialize(args) {
  assert.equal(typeof integration.materializeForestFloorMissions, "function", "forest mission materializer must exist");
  return integration.materializeForestFloorMissions(args);
}

function map(floor, seed = "forest-mvp", depth = 8) {
  return generateMapData(depth, profile.recommendations.baseDcByFloor[floor], profile, floor, createRng(seed), { version: 2 });
}

function rerollFixture() {
  const allowed = creatureCatalog.filter(item => item.type === "animal" && item.challengeRating === 1).slice(0, 2);
  assert.equal(allowed.length, 2);
  const trap = { kind: "trap", trapId: "lamina-na-parede", challengeRating: 0.5, quantity: 1 };
  const node = {
    type: "unknown", contentType: "normal",
    environment: { terrain: { name: "Floresta" } },
    creature: { type: "animal", targetChallenge: 1, allowedCreatureIds: allowed.map(item => item.id) },
    challenge: { creatures: 1, total: 2.5, trap: 0.5 },
    resolvedEncounter: {
      seed: "saved:14:N1", version: 9, budget: { creatures: 1, total: 2.5, trap: 0.5 },
      items: [{ kind: "creature", creatureId: allowed[0].id, challengeRating: 1, quantity: 1 }, trap]
    }
  };
  return { node, trap, allowed };
}

test("reroll swaps creatures inside the node's restrictions and preserves the saved encounter identity", () => {
  const { node, trap, allowed } = rerollFixture();
  const before = structuredClone(node);
  const next = rerollNodeCreatures(node);
  assert.ok(next);
  assert.deepEqual(node, before);
  assert.equal(next.seed, before.resolvedEncounter.seed);
  assert.deepEqual(next.budget, before.resolvedEncounter.budget);
  const creatures = next.items.filter(item => item.kind === "creature");
  assert.deepEqual(creatures.map(item => item.creatureId), [allowed[1].id]);
  assert.equal(calculateCombatND(creatures), 1);
  assert.deepEqual(next.items.filter(item => item.kind === "trap"), [trap]);
  const restored = JSON.parse(JSON.stringify({ ...node, resolvedEncounter: next }));
  assert.deepEqual(resolveNodeEncounter(restored), restored.resolvedEncounter);
});

test("reroll protects mission and fixed encounters and preserves a group with no alternative", () => {
  const { node, allowed } = rerollFixture();
  const protectedNodes = [
    { ...node, missionBindings: [{ id: "mission" }] },
    { ...node, fixedComposition: {} },
    { ...node, contentType: "boss" },
    { ...node, creature: { ...node.creature, creatureId: allowed[0].id } }
  ];
  for (const protectedNode of protectedNodes) {
    assert.equal(canRerollNodeCreatures(protectedNode), false);
    assert.equal(rerollNodeCreatures(protectedNode), null);
  }
  node.creature.allowedCreatureIds = [allowed[0].id];
  const before = structuredClone(node);
  assert.equal(rerollNodeCreatures(node), null);
  assert.deepEqual(node, before);
});

test("creature reinforcements toggle independently and survive save without changing ND or other items", () => {
  const { node } = rerollFixture();
  const encounter = node.resolvedEncounter;
  const [creature, trap] = encounter.items;
  assert.deepEqual(getCreatureReinforcement(creature), { initiative: 0, attack: 0, hitPoints: 0 });
  const initiative = withCreatureReinforcement(encounter, creature, "initiative", true);
  const both = withCreatureReinforcement(initiative, initiative.items[0], "attack", true);
  assert.deepEqual(getCreatureReinforcement(both.items[0]), { initiative: 2, attack: 1, hitPoints: 0 });
  const all = withCreatureReinforcement(both, both.items[0], "hitPoints", true);
  assert.deepEqual(getCreatureReinforcement(all.items[0], 30), { initiative: 2, attack: 1, hitPoints: 30 });
  assert.equal(withCreatureReinforcement(all, all.items[0], "hitPoints", true), all);
  assert.deepEqual(all.budget, encounter.budget);
  assert.equal(withCreatureReinforcement(both, both.items[0], "attack", true), both);
  assert.deepEqual(both.budget, encounter.budget);
  assert.equal(both.seed, encounter.seed);
  assert.equal(both.items[0].challengeRating, creature.challengeRating);
  assert.equal(both.items[1], trap);
  assert.equal(withCreatureReinforcement(encounter, trap, "attack", true), encounter);
  assert.equal(withCreatureReinforcement(encounter, creature, "damage", true), encounter);

  const restored = JSON.parse(JSON.stringify({ ...node, resolvedEncounter: all }));
  const restoredEncounter = resolveNodeEncounter(restored);
  assert.deepEqual(getCreatureReinforcement(restoredEncounter.items[0], 30), { initiative: 2, attack: 1, hitPoints: 30 });
  const withoutInitiative = withCreatureReinforcement(restoredEncounter, restoredEncounter.items[0], "initiative", false);
  const onlyAttack = withCreatureReinforcement(withoutInitiative, withoutInitiative.items[0], "hitPoints", false);
  assert.deepEqual(getCreatureReinforcement(onlyAttack.items[0], 30), { initiative: 0, attack: 1, hitPoints: 0 });
  const original = withCreatureReinforcement(onlyAttack, onlyAttack.items[0], "attack", false);
  assert.deepEqual(original, { ...encounter, adjusted: true });
  assert.ok(hasEncounterAdjustments(original));
  assert.equal(rerollNodeCreatures({ ...node, resolvedEncounter: original }), null);
});

test("individual damage, healing and undo preserve repeated creatures in the current combat", () => {
  const { node } = rerollFixture();
  const original = node.resolvedEncounter;
  const group = { ...original.items[0], quantity: 2, creatureData: { stats: { hitPoints: 30 } } };
  const encounter = { ...original, items: [group, original.items[1]] };
  const display = state => getCreatureUnits(state.items[0]).map(unit => unit.current);
  const damaged = withCreatureHealthChange(encounter, group, 0, 20);
  assert.deepEqual(display(damaged), [10, 30]);
  assert.equal(canRerollNodeCreatures({ ...node, resolvedEncounter: damaged }), false);
  assert.equal(canRerollNodeCreatures({ ...node, resolvedEncounter: withLastHealthChangeUndone(damaged) }), false);
  const cured = withCreatureHealthChange(damaged, damaged.items[0], 0, -7);
  assert.deepEqual(display(cured), [17, 30]);
  const undone = withLastHealthChangeUndone(cured);
  assert.deepEqual(display(undone), [10, 30]);
  assert.equal(withLastHealthChangeUndone(undone), undone);
  const reinforced = withCreatureReinforcement(undone, undone.items[0], "hitPoints", true);
  assert.deepEqual(display(reinforced), [40, 60]);
  const originalHealth = withCreatureReinforcement(reinforced, reinforced.items[0], "hitPoints", false);
  assert.deepEqual(display(originalHealth), [10, 30]);
  assert.deepEqual(display(encounter), [30, 30]);
});

test("adding a creature preserves damaged units and blocks an active extermination target", () => {
  const { node } = rerollFixture();
  const encounter = node.resolvedEncounter;
  const zombie = { ...encounter.items[0], creatureId: "zumbi", quantity: 2, creatureData: { stats: { hitPoints: 30 } },
    reinforcement: { hitPoints: true }, unitDamage: { 0: 20 } };
  const rat = { kind: "creature", creatureId: "rato", challengeRating: 0.25, quantity: 1, creatureData: { stats: { hitPoints: 5 } } };
  const mixed = { ...encounter, items: [zombie, rat] };
  const missions = [mission("extermination", { targetId: "zumbi" })];
  assert.equal(canAddEncounterCreature(zombie, missions), false);
  assert.equal(withCreatureAdded(mixed, zombie, missions), mixed);
  const extraRat = withCreatureAdded(mixed, rat, missions);
  assert.equal(extraRat.items[0], zombie);
  assert.deepEqual(getCreatureUnits(extraRat.items[1]).map(unit => unit.current), [5, 5]);
  const extraZombie = withCreatureAdded(mixed, zombie);
  assert.deepEqual(getCreatureUnits(extraZombie.items[0]).map(unit => unit.current), [40, 60, 60]);
  assert.deepEqual(extraZombie.budget, mixed.budget);
  assert.ok(hasEncounterAdjustments(extraZombie));
});

test("save preserves the original encounter, progress and reinforcement without temporary PV or additional creatures", () => {
  const fixture = rerollFixture();
  const levels = chain();
  const [node] = levels[0];
  const original = { ...fixture.node.resolvedEncounter, bossSetup: { heads: ["hidra", "bode"] } };
  node.resolvedEncounter = original;
  const state = createExplorationState();
  state.setLevels(levels);
  state.chooseRoute(node);
  const damaged = withCreatureHealthChange(original, original.items[0], 0, 1);
  const added = withCreatureAdded(damaged, damaged.items[0]);
  node.resolvedEncounter = added;

  assert.deepEqual(state.exportSessionState().resolvedEncounters, [[node.id, original]]);
  assert.deepEqual(state.exportSessionState().chosenByLevel, [[node.level, node.id]]);
  assert.ok(hasEncounterAdjustments(added));
  assert.equal(added.items[0].quantity, original.items[0].quantity + 1);
  assert.equal(added.items[0].unitDamage[0], 1);
  const expedition = { profileId: profile.id, seed: "recorded", startFloor: 11, floors: [{ floor: 11, levels }] };
  const snapshot = expeditionModule.serializeForestExpedition(expedition);
  assert.deepEqual(snapshot.floors[0].levels[0][0].resolvedEncounter, original);
  assert.ok(!hasEncounterAdjustments(snapshot.floors[0].levels[0][0].resolvedEncounter));

  node.resolvedEncounter = withCreatureReinforcement(added, added.items[0], "initiative", true);
  const saved = new Map(state.exportSessionState().resolvedEncounters).get(node.id);
  assert.deepEqual(saved.items[0], { ...original.items[0], reinforcement: { initiative: true } });
  assert.equal(saved.adjusted, true);
});

test("unknown elite receives elite budget and discovery check", () => {
  let checked = 0;
  for (let i = 0; i < 30; i++) {
    for (const node of map(11, `unknown-${i}`).flat()) {
      if (node.type !== "unknown" || node.revealedLabel !== "Encontro elite") continue;
      assert.equal(node.challenge.encounter, 3);
      assert.ok(node.skill && node.dc >= 22 && node.dc <= 25);
      checked++;
    }
  }
  assert.ok(checked > 0);
});

test("unknown true camps do not receive damaging climate", () => {
  let checked = 0;
  for (let i = 0; i < 50; i++) {
    for (const node of map(15, `camp-${i}`).flat()) {
      if (node.type !== "unknown" || node.revealedLabel !== "Acampamento") continue;
      assert.equal(node.creature, null);
      assert.equal(node.trap, null);
      assert.equal(node.dc, null);
      assert.ok(node.environment.climate.every(c => !profile.environmentRules.climate.damagingClimateNames.includes(c.name)));
      checked++;
    }
  }
  assert.ok(checked > 0);
});

test("new forest maps reduce hidden camps and keep the existing visible camps and legacy maps", () => {
  const previousProfile = { ...profile, encounterRules: { ...profile.encounterRules } };
  delete previousProfile.encounterRules.unknownCampChance;
  let unknownCount = 0;
  let currentCamps = 0;
  let previousCamps = 0;

  for (let index = 0; index < 240; index++) {
    const floor = 11 + index % 10;
    const seed = `camp-frequency-${index}`;
    const depth = profile.recommendations.encountersByFloor[floor];
    const dc = profile.recommendations.baseDcByFloor[floor];
    const current = generateMapData(depth, dc, profile, floor, createRng(seed), { version: 2 }).flat();
    const previous = generateMapData(depth, dc, previousProfile, floor, createRng(seed), { version: 2 }).flat();
    const visibleCamps = nodes => nodes.filter(node => node.type === "camp").map(node => node.id);
    assert.deepEqual(visibleCamps(current), visibleCamps(previous));
    unknownCount += current.filter(node => node.type === "unknown").length;
    currentCamps += current.filter(node => node.type === "unknown" && node.contentType === "camp").length;
    previousCamps += previous.filter(node => node.type === "unknown" && node.contentType === "camp").length;

    if (index < 10) {
      const legacyReveals = mapProfile =>
        generateMapData(depth, dc, mapProfile, floor, createRng(seed)).flat().map(node => node.revealedLabel);
      assert.deepEqual(legacyReveals(profile), legacyReveals(previousProfile));
    }
  }

  assert.ok(unknownCount > 500);
  assert.ok(currentCamps / unknownCount >= 0.05 && currentCamps / unknownCount <= 0.10);
  assert.ok(currentCamps < previousCamps);
});

test("new expeditions reveal outdoor scenes only after choosing the route", () => {
  const kinds = new Set();
  let sampled = 0;
  let unknown = 0;
  for (let index = 0; index < 160; index++) {
    const levels = generateMapData(6, 21, profile, 15, createRng(`forest-scenes-${index}`), { version: 3 });
    sampled += levels.flat().length;
    unknown += levels.flat().filter(node => node.type === "unknown").length;
    for (const node of levels.flat().filter(node => node.scene)) {
      kinds.add(node.scene.kind);
      assert.equal(node.type, "unknown");
      assert.equal(node.contentType, "scene");
      assert.equal(node.revealedLabel, node.scene.title);
      assert.equal(node.creature, null);
      assert.equal(node.trap, null);
      assert.equal(node.challenge.creatures, 0);
      assert.ok(node.scene.approach && node.scene.success && node.scene.failure);
    }
  }
  assert.ok(unknown / sampled > 0.15);
  assert.deepEqual([...kinds].sort(), ["discovery", "exploration", "falseRest", "obstacle"]);

  const expedition = expeditionModule.prepareForestExpedition({ seed: "scene-round-trip", profile, missions: [] });
  const sceneFloor = expedition.floors.find(floor => floor.levels.flat().some(node => node.scene?.kind === "falseRest"));
  assert.ok(sceneFloor);
  const state = createExplorationState();
  state.setLevels(sceneFloor.levels);
  const scene = sceneFloor.levels.flat().find(node => node.scene?.kind === "falseRest");
  assert.equal(state.isNodeRevealed(scene), false);
  state.importSessionState({ chosenByLevel: [[scene.level, scene.id]] });
  assert.equal(state.isNodeRevealed(scene), true);
  assert.equal(state.canRestAtNode(scene), false);
  const snapshot = expeditionModule.serializeForestExpedition(expedition);
  const restored = expeditionModule.restoreForestExpedition(snapshot);
  assert.deepEqual(restored.floors.find(floor => floor.floor === sceneFloor.floor).levels.flat().find(node => node.id === scene.id).scene, scene.scene);
});

test("false rest generates one ambush with the scene's combat budget and preserves the total ND", () => {
  let checked = 0;
  for (let index = 0; index < 80; index++) {
    const seed = `ambush-${index}`;
    const levels = generateMapData(6, 21, profile, 15, createRng(seed), { version: 3 });
    for (const node of levels.flat()) {
      if (node.scene?.kind !== "falseRest") continue;
      const ambush = resolveForestAmbush(node, profile, { mapSeed: seed });
      assert.ok(ambush?.items.length);
      assert.ok(ambush.items.every(item => item.kind === "creature"));
      assert.equal(calculateCombatND(ambush.items), node.challenge.encounter);
      assert.equal(ambush.budget.creatures, node.challenge.encounter);
      assert.equal(ambush.budget.total, node.challenge.total);
      assert.equal(node.resolvedEncounter, null);
      assert.deepEqual(resolveForestAmbush(node, profile, { mapSeed: seed }), ambush);
      assert.equal(resolveForestAmbush({ ...node, resolvedEncounter: ambush }, profile, { mapSeed: seed }), null);
      checked++;
    }
  }
  assert.ok(checked > 20);
});

test("an unrevealed rest stop looks the same for real and false camps", () => {
  const { getNodeContentPresentation } = presentation;
  const safe = { type: "unknown", contentType: "camp", requiresCompletion: true, revealedLabel: "Acampamento" };
  const fake = {
    type: "unknown", contentType: "scene", requiresCompletion: true, revealedLabel: "Abrigo no leito de cheia",
    scene: { kind: "falseRest" }
  };
  const view = { chosen: true, revealed: true, rested: false };
  assert.deepEqual(getNodeContentPresentation(fake, view), getNodeContentPresentation(safe, view));
  assert.equal(getNodeContentPresentation(fake, view).label, "Acampamento");
  assert.equal(getNodeContentPresentation(fake, view).campUndecided, true);
  assert.equal(getNodeContentPresentation(safe, { ...view, rested: true }).campUndecided, false);
  const ambushed = { ...fake, resolvedEncounter: { items: [{ kind: "creature" }] } };
  assert.equal(getNodeContentPresentation(ambushed, view).label, "Emboscada");
  assert.equal(getNodeContentPresentation(ambushed, view).iconType, "normal");
});

test("forest continuity keeps terrain across more links and shares gradual weather by stage", () => {
  let repeatedBefore = 0;
  let repeatedAfter = 0;
  let plainWithoutFeatures = 0;
  let regionalRain = 0;
  let sheltered = 0;
  const precipitation = ["Chuva", "Tempestade"];
  const temperature = ["Frio extremo", "Frio", null, "Calor", "Calor extremo"];
  const regionalIndex = (node, names) => names.indexOf(names.find(name =>
    node.environment.climate.some(climate => climate.name === name)
  ) ?? null);

  for (let index = 0; index < 200; index++) {
    const seed = `continuity-${index}`;
    const generate = version => generateMapData(7, 22, profile, 17, createRng(seed), { version });
    const previous = generate(3);
    const current = generate(4);
    const footprint = levels => levels.map(row => row.map(node => [node.id, node.type, node.links.map(next => next.id)]));
    assert.deepEqual(footprint(current), footprint(previous));
    const matchingLinks = levels => levels.flat().reduce((total, node) =>
      total + node.links.filter(next => node.environment.terrain.name === next.environment.terrain.name).length, 0);
    repeatedBefore += matchingLinks(previous);
    repeatedAfter += matchingLinks(current);

    let lastWeather;
    let lastTemperature;
    for (const row of current) {
      const exposed = row.filter(node => node.contentType !== "camp");
      if (exposed.length) {
        const rain = regionalIndex(exposed[0], precipitation);
        const heat = regionalIndex(exposed[0], temperature);
        assert.ok(exposed.every(node => regionalIndex(node, precipitation) === rain && regionalIndex(node, temperature) === heat));
        if (lastWeather !== undefined) assert.ok(Math.abs(rain - lastWeather) <= 1);
        if (lastTemperature !== undefined) assert.ok(Math.abs(heat - lastTemperature) <= 1);
        lastWeather = rain;
        lastTemperature = heat;
        if (rain >= 0) regionalRain++;
      } else {
        lastWeather = undefined;
        lastTemperature = undefined;
      }
    }
    for (const node of current.flat()) {
      const { terrain, climate } = node.environment;
      if (terrain.name === "Planície aberta" && !terrain.features.length) plainWithoutFeatures++;
      if (node.contentType === "camp") {
        assert.ok(climate.every(event => !profile.environmentRules.climate.damagingClimateNames.includes(event.name)));
        sheltered++;
      }
    }
    if (index === 0) {
      assert.deepEqual(current.flat().map(node => node.environment), generate(4).flat().map(node => node.environment));
    }
  }
  assert.ok(repeatedAfter > repeatedBefore * 1.12);
  assert.ok(regionalRain > 0 && plainWithoutFeatures > 0 && sheltered > 0);
});

test("new forest maps spend 30 to 60 minutes per traversal according to weather and terrain", () => {
  const durations = new Set();
  let compared = 0;
  for (let index = 0; index < 40; index++) {
    const seed = `travel-time-${index}`;
    const levels = map(15, seed);
    for (const node of levels.flat()) {
      if (!node.skill || !node.dc) {
        assert.equal(node.investigationMinutes, 30);
        continue;
      }
      const climate = node.environment.climate.filter(event => event.name !== "Clima normal").length;
      const extra = climate + Number(node.challenge.terrain >= 1);
      assert.equal(node.investigationMinutes, Math.min(30 + 15 * extra, 60));
      durations.add(node.investigationMinutes);
    }
    const legacy = generateMapData(8, 22, profile, 15, createRng(seed)).flat();
    compared += legacy.filter(node => node.skill && node.investigationMinutes === 15).length;
  }
  assert.deepEqual([...durations].sort(), [30, 45, 60]);
  assert.ok(compared > 0);
});

test("the forest clocks survive rest, floor changes and save restore", () => {
  const levels = chain();
  levels[0][0].investigationMinutes = 45;
  levels[1][0].investigationMinutes = 30;
  levels[1][0].contentType = "camp";
  const state = createExplorationState();
  state.setLevels(levels);
  state.markExplored(levels[0][0]);
  state.chooseRoute(levels[0][0]);
  state.completeNode(levels[0][0]);
  state.chooseRoute(levels[1][0]);
  assert.equal(state.getElapsedMinutes(), 75);
  assert.ok(state.restAtNode(levels[1][0]));
  assert.equal(state.getElapsedMinutes(), 0);
  assert.equal(state.getExplorationTime().totalElapsedMinutes, 75);

  const freshFloor = chain();
  state.setLevels(freshFloor);
  state.chooseRoute(freshFloor[0][0]);
  const restored = createExplorationState();
  restored.setLevels(freshFloor);
  restored.importSessionState(JSON.parse(JSON.stringify(state.exportSessionState())));
  assert.equal(restored.getElapsedMinutes(), 15);
  assert.equal(restored.getExplorationTime().totalElapsedMinutes, 90);
  restored.setLevels(chain(), { resetTime: true });
  assert.equal(restored.getElapsedMinutes(), 0);
  assert.equal(restored.getExplorationTime().totalElapsedMinutes, 0);
});

test("legacy forest saves reconstruct known travel and indicate missing floor history", () => {
  const { withForestExplorationTime } = expeditionModule;
  const levels = chain();
  const current = { chosenByLevel: [[1, 0]], explored: [0, 1], attempted: [2], elapsedMinutes: 0 };
  const earlier = { chosenByLevel: [[1, 0], [2, 1]], elapsedMinutes: 30 };
  const expedition = {
    floors: [{ floor: 11, levels, state: earlier }, { floor: 12, levels }, { floor: 13, levels }]
  };
  const migrated = withForestExplorationTime(expedition, 13, current);
  assert.equal(migrated.totalElapsedMinutes, 75);
  assert.equal(migrated.totalElapsedPartial, true);
  assert.equal(migrated.elapsedMinutes, 0);
  expedition.floors[1].state = earlier;
  const complete = withForestExplorationTime(expedition, 13, current);
  assert.equal(complete.totalElapsedMinutes, 105);
  assert.equal(complete.totalElapsedPartial, false);
  assert.equal(withForestExplorationTime(expedition, 13, migrated), migrated);
});

test("Quimera is alone in the same simple arena for every seed", () => {
  let first;
  for (let i = 0; i < 30; i++) {
    const boss = map(20, `boss-${i}`).at(-1)[0];
    const encounter = resolveNodeEncounter(boss, { mapSeed: `boss-${i}` });
    assert.deepEqual(encounter.items.map(({ creatureId, quantity, kind }) => ({ creatureId, quantity, kind })), [
      { creatureId: "quimera", quantity: 1, kind: "creature" }
    ]);
    assert.equal(boss.trap, null);
    assert.equal(boss.challenge.total, 8);
    const tactical = createNodeTacticalMap(boss);
    assert.equal(tactical.cells.filter(c => c === "party").length, 4);
    assert.equal(tactical.cells.filter(c => c === "boss").length, 4);
    assert.ok(tactical.cells.every(c => ["floor", "party", "boss"].includes(c)));
    if (first) assert.deepEqual({ environment: boss.environment, tactical }, first);
    first = { environment: boss.environment, tactical };
  }
});

test("mission objectives mark the node map without replacing terrain or combat markers", () => {
  const node = map(15).flat().find(n => n.type === "normal");
  resolveNodeEncounter(node, { mapSeed: "same-scene" });
  const base = createNodeTacticalMap(node);
  node.missionObjectives = [{ missionId: "test-mission", targetType: "object", targetName: "Relicário" }];
  const withMission = createNodeTacticalMap(node);
  assert.equal(withMission.objectiveCount, 1);
  assert.deepEqual(withMission.cells, base.cells);
  const [target] = node.resolvedEncounter.items.filter(item => item.kind === "creature");
  assert.ok(target);
  node.missionObjectives = [{ missionId: "hunt", targetType: "creature", targetId: target.creatureId, targetName: target.name }];
  const hunt = createNodeTacticalMap(node);
  assert.deepEqual(hunt.cells, base.cells);
  assert.ok(hunt.objectiveMarkers.length > 0);
  assert.ok(hunt.objectiveMarkers.every(marker => hunt.cells[marker.index] === "enemy"));
});

test("special hunt places the promised creature inside the node encounter budget", () => {
  const levels = chain();
  const [out] = materialize({ floor: 15, levels, missions: [mission("specialHunt")] });
  const binding = out.integration.bindings[0];
  const node = levels.flat().find(n => n.id === binding.nodeId);
  const encounter = resolveNodeEncounter(node, { mapSeed: "hunt" });
  assert.equal(binding.floor, 15);
  assert.deepEqual(encounter.items.map(i => [i.creatureId, i.quantity]), [["sucuri", 1]]);
  assert.equal(encounter.budget.creatures, 3);
  assert.ok(calculateCombatND(encounter.items) <= 3);
});

test("extermination reserves eight real enemies across nodes without exceeding ND 3", () => {
  const levels = chain();
  const [out] = materialize({ floor: 15, levels, missions: [mission("extermination", { targetId: "naja", targetName: "Naja", quantity: 8 })] });
  const bindings = out.integration.bindings;
  assert.equal(bindings.reduce((sum, b) => sum + b.quantity, 0), 8);
  for (const binding of bindings) {
    const node = levels.flat().find(n => n.id === binding.nodeId);
    const encounter = resolveNodeEncounter(node, { mapSeed: "extermination" });
    assert.equal(encounter.items[0].creatureId, "naja");
    assert.ok(calculateCombatND(encounter.items) <= 3);
  }
});

test("mission allocation rejects incompatible branches instead of reporting false success", () => {
  const left = chain([3])[0][0];
  const right = { ...structuredClone(left), id: 1, column: 5 };
  right.environment = { climate: [{ name: "Neblina" }], terrain: { name: "Aquático", features: [{ name: "Água corrente" }] } };
  const levels = [[left, right]];
  const missions = [
    mission("collection", { targetName: "sementes de vegetação agressiva" }),
    mission("anomalous", { targetName: "neblina que apaga sons próximos" })
  ];
  assert.throws(() => materialize({ floor: 15, levels, missions }), /rota|compatível/i);
  assert.ok(levels.flat().every(n => !n.missionBindings));
});

test("noncombat mission adds the exact objective to a compatible scene", () => {
  const levels = chain();
  const [out] = materialize({ floor: 15, levels, missions: [mission("collection", { targetName: "sementes de vegetação agressiva", quantity: 4 })] });
  const node = levels.flat().find(n => n.id === out.integration.bindings[0].nodeId);
  assert.equal(node.missionObjectives[0].targetName, "sementes de vegetação agressiva");
  assert.equal(node.missionObjectives[0].quantity, 4);
  assert.ok(node.missionObjectives[0].description.includes("sementes de vegetação agressiva"));
  assert.equal(node.environment.terrain.name, "Floresta");
});

test("a prepared expedition has actual mission content and enough extermination targets", () => {
  assert.equal(typeof expeditionModule.prepareForestExpedition, "function");
  const seen = new Set();
  for (let i = 0; i < 80; i++) {
    const seed = `expedition-${i}`;
    const offers = generateMissionOffers(createMissionGenerationContext({ currentSeed: seed, profile }));
    const expedition = expeditionModule.prepareForestExpedition({ seed, profile, missions: offers.slice(0, 3) });
    for (const entry of expedition.floors) {
      assert.ok(entry.levels.flat().every(n => (n.missionBindings?.length || 0) <= 1), `${seed}: missions sharing a node`);
    }
    for (const m of expedition.missions) {
      seen.add(m.category);
      const bindings = m.integration.bindings;
      assert.ok(bindings.length > 0, `${seed}: ${m.category} without nodes`);
      if (m.category === "extermination") assert.equal(bindings.reduce((n, b) => n + b.quantity, 0), m.objective.quantity);
      for (const b of bindings) {
        const entry = expedition.floors.find(f => f.floor === b.floor);
        const node = entry.levels.flat().find(n => n.id === b.nodeId);
        assert.ok(node.missionObjectives.some(o => o.missionId === m.id));
        assert.ok(!["camp", "boss"].includes(node.contentType));
        if (m.objective.targetType === "creature") {
          const encounter = resolveNodeEncounter(node, { mapSeed: entry.mapSeed });
          assert.ok(encounter.items.some(item => item.creatureId === m.objective.targetId && item.quantity === b.quantity));
        }
      }
    }
  }
  assert.equal(seen.size, 10);
});

test("expedition snapshot restores graph links, fixed encounters and mission bindings", () => {
  assert.equal(typeof expeditionModule.prepareForestExpedition, "function");
  const original = expeditionModule.prepareForestExpedition({ seed: "snapshot", profile, missions: [mission("specialHunt")] });
  const entry = original.floors.find(f => f.floor === 15);
  const binding = original.missions[0].integration.bindings[0];
  const node = entry.levels.flat().find(n => n.id === binding.nodeId);
  resolveNodeEncounter(node, { mapSeed: entry.mapSeed });
  const saved = JSON.parse(JSON.stringify(expeditionModule.serializeForestExpedition(original)));
  const restored = expeditionModule.restoreForestExpedition(saved);
  const restoredNode = restored.floors.find(f => f.floor === 15).levels.flat().find(n => n.id === binding.nodeId);
  assert.deepEqual(restoredNode.resolvedEncounter, JSON.parse(JSON.stringify(node.resolvedEncounter)));
  assert.deepEqual(restoredNode.missionObjectives, node.missionObjectives);
  assert.deepEqual(expeditionModule.serializeForestExpedition(restored), saved);
  for (const f of restored.floors) {
    const all = new Set(f.levels.flat());
    assert.ok(f.levels.flat().every(n => n.links.every(next => all.has(next) && next.level === n.level + 1)));
  }
});

test("choosing a new scene does not unlock the next node before completion", () => {
  const levels = chain();
  levels.flat().forEach(n => { n.requiresCompletion = true; });
  const state = createExplorationState();
  state.setLevels(levels);
  assert.equal(state.chooseRoute(levels[0][0]), true);
  assert.equal(state.getNodeViewState(levels[1][0]).active, false);
  assert.equal(state.completeNode(levels[0][0]), true);
  assert.equal(state.getNodeViewState(levels[1][0]).active, true);
  const saved = state.exportSessionState();
  const restored = createExplorationState();
  restored.setLevels(levels);
  restored.importSessionState(saved);
  assert.equal(restored.isNodeCompleted(levels[0][0]), true);
  assert.equal(restored.getNodeViewState(levels[1][0]).active, true);
});

test("true rest requires the chosen camp and cannot be used from an old camp", () => {
  const levels = chain();
  levels[0][0].type = "camp";
  levels[0][0].contentType = "camp";
  levels.flat().forEach(n => { n.requiresCompletion = true; });
  const state = createExplorationState();
  state.setLevels(levels);
  assert.equal(state.restAtNode(levels[0][0]), false);
  state.chooseRoute(levels[0][0]);
  assert.equal(state.restAtNode(levels[0][0]), true);
  assert.equal(state.restAtNode(levels[0][0]), false);
  assert.equal(state.restAtNode(levels[1][0]), false);
});

test("the same defeated enemies cannot be credited twice, including after restoring", () => {
  const state = createMissionState();
  state.startBoard(profile.id, [mission("extermination", { quantity: 8 })]);
  state.confirmSelection(["m-extermination"]);
  assert.equal(typeof state.recordEncounterProgress, "function");
  assert.equal(state.recordEncounterProgress("m-extermination", "floor-15:node-2:sucuri", 2), true);
  assert.equal(state.recordEncounterProgress("m-extermination", "floor-15:node-2:sucuri", 2), false);
  assert.equal(state.getSelected()[0].progress.current, 2);
  const restored = createMissionState();
  restored.importSessionState(JSON.parse(JSON.stringify(state.exportSessionState())));
  assert.equal(restored.recordEncounterProgress("m-extermination", "floor-15:node-2:sucuri", 2), false);
  assert.equal(restored.recordEncounterProgress("m-extermination", "floor-16:node-2:sucuri", 2), true);
  assert.equal(restored.getSelected()[0].progress.current, 4);
});

test("unknown contents stay concealed until that route is chosen", () => {
  const node = chain([3])[0][0];
  Object.assign(node, { type: "unknown", contentType: "elite", revealedLabel: "Encontro elite", requiresCompletion: true });
  const state = createExplorationState();
  state.setLevels([[node]]);
  assert.equal(state.isNodeRevealed(node), false);
  state.chooseRoute(node);
  assert.equal(state.isNodeRevealed(node), true);
});

test("legacy generation retains the original route and unknown semantics", () => {
  const legacy = generateMapData(8, 15, profile, 11, createRng("unknown-0"));
  assert.ok(legacy.flat().every(n => !n.requiresCompletion && !n.contentType));
  const state = createExplorationState();
  state.setLevels(legacy);
  state.chooseRoute(legacy[0][0]);
  assert.ok(legacy[0][0].links.every(n => state.getNodeViewState(n).active));
});

test("investigation contains evidence and an answer, rather than only a mission label", () => {
  const levels = chain();
  materialize({ floor: 15, levels, missions: [mission("investigation", {
    targetName: "ossos marcados por ferramenta", targetId: "ossos", quantity: 1
  })] });
  const objective = levels.flat().find(n => n.missionObjectives)?.missionObjectives[0];
  assert.ok(objective.question?.includes("marcas"));
  assert.ok(objective.evidence?.length >= 2);
  assert.ok(objective.answer?.includes("ferramenta"));
  assert.ok(objective.onSuccess && objective.onFailure);
});

test("a mission trial defines approaches and success/failure using the existing terrain rules", () => {
  const levels = chain();
  levels.flat().forEach(n => { n.environment.terrain = { name: "Aquático", features: [{ name: "Água corrente", effect: "Atletismo CD 15 para nadar contra a corrente." }] }; });
  materialize({ floor: 15, levels, missions: [mission("trial", { targetName: "cruzar terreno inundado", targetId: "travessia" })] });
  const objective = levels.flat().find(n => n.missionObjectives)?.missionObjectives[0];
  assert.ok(objective.approaches?.some(a => a.includes("Atletismo")));
  assert.ok(objective.onSuccess?.includes("margem"));
  assert.ok(objective.onFailure?.includes("regra"));
});

test("a true camp explicitly shelters the group from surrounding water and terrain hazards", () => {
  const aquatic = profile.environmentRules.terrain.terrainOptions.find(option => option.value.name === "Aquático");
  const forced = { ...profile, environmentRules: { ...profile.environmentRules, terrain: {
    ...profile.environmentRules.terrain, terrainOptions: [aquatic]
  } } };
  const levels = generateMapData(4, 20, forced, 11, createRng("safe-riverside"), { version: 2 });
  for (const node of levels[3]) {
    assert.equal(node.contentType, "camp");
    assert.equal(node.environment.terrain.name, "Aquático");
    assert.ok(node.safeRest?.protectedFrom.includes("terrain"));
    assert.ok(node.safeRest?.description.includes("abrigo"));
  }
});

test("two missions for floor 15 occupy different nodes of the same route", () => {
  const levels = chain();
  const selected = [
    mission("collection", { id: "coleta-15", targetName: "sementes de vegetação agressiva" }),
    mission("recovery", { id: "recuperacao-15", targetName: "uma bússola desregulada" })
  ];
  const results = materialize({ floor: 15, levels, missions: selected });
  const ids = results.map(m => m.integration.bindings[0].nodeId);
  assert.equal(new Set(ids).size, 2);
  assert.ok(levels.flat().every(n => (n.missionBindings?.length || 0) <= 1));
});

test("combat and noncombat missions do not share a node with extermination", () => {
  const levels = chain([3, 3, 3, 3]);
  const results = materialize({ floor: 15, levels, missions: [
    mission("specialHunt"),
    mission("collection", { targetName: "sementes de vegetação agressiva" }),
    mission("extermination", { targetId: "naja", targetName: "Naja", quantity: 4 })
  ] });
  assert.equal(results.length, 3);
  assert.ok(levels.flat().every(n => (n.missionBindings?.length || 0) <= 1));
  assert.equal(results.find(m => m.category === "extermination").integration.bindings.reduce((n, b) => n + b.quantity, 0), 4);
});

test("a route with only one eligible node cannot accept two similar missions", () => {
  const levels = chain([3]);
  const selected = [
    mission("collection", { id: "coleta-a", targetName: "sementes de vegetação agressiva" }),
    mission("collection", { id: "coleta-b", targetName: "fungos luminescentes" })
  ];
  assert.throws(() => materialize({ floor: 15, levels, missions: selected }), /rota compatível/i);
  assert.ok(levels.flat().every(n => !n.missionBindings && !n.missionObjectives));
});

test("visual progress distinguishes exploration, pending scene and completed scene after restore", () => {
  const levels = chain();
  levels.flat().forEach(n => { n.requiresCompletion = true; });
  const state = createExplorationState();
  state.setLevels(levels);
  const node = levels[0][0];
  assert.equal(state.getNodeViewState(node).completed, false);
  assert.equal(typeof presentation.getNodeProgressPresentation, "function");
  assert.equal(presentation.getNodeProgressPresentation(node, state.getNodeViewState(node)).kind, "available");
  state.markExplored(node);
  assert.equal(presentation.getNodeProgressPresentation(node, state.getNodeViewState(node)).kind, "explored");
  state.chooseRoute(node);
  assert.equal(presentation.getNodeProgressPresentation(node, state.getNodeViewState(node)).kind, "pending");
  state.completeNode(node);
  assert.equal(presentation.getNodeProgressPresentation(node, state.getNodeViewState(node)).marker, "✓");
  const restored = createExplorationState();
  restored.setLevels(levels);
  restored.importSessionState(state.exportSessionState());
  assert.equal(presentation.getNodeProgressPresentation(node, restored.getNodeViewState(node)).kind, "completed");
  assert.equal(restored.canOpenNode(node), true);
});

test("a legacy chosen node is not presented as a pending or won encounter", () => {
  const levels = chain();
  const state = createExplorationState();
  state.setLevels(levels);
  state.chooseRoute(levels[0][0]);
  assert.equal(typeof presentation.getNodeProgressPresentation, "function");
  const status = presentation.getNodeProgressPresentation(levels[0][0], state.getNodeViewState(levels[0][0]));
  assert.equal(status.kind, "chosen");
  assert.equal(status.marker, null);
});

test("guidance follows the existing choice, completion and floor advance permissions", () => {
  const levels = chain([3, 3]);
  levels.flat().forEach(n => { n.requiresCompletion = true; });
  const state = createExplorationState();
  state.setLevels(levels);
  assert.equal(typeof presentation.getNodeMapGuidance, "function");
  assert.match(presentation.getNodeMapGuidance(levels, state, true), /Escolha um nodo/);
  state.chooseRoute(levels[0][0]);
  assert.match(presentation.getNodeMapGuidance(levels, state, true), /Conclua o encontro/);
  state.completeNode(levels[0][0]);
  assert.match(presentation.getNodeMapGuidance(levels, state, true), /Escolha um nodo/);
  state.chooseRoute(levels[1][0]);
  state.completeNode(levels[1][0]);
  assert.match(presentation.getNodeMapGuidance(levels, state, true), /Andar concluído/);
  assert.equal(presentation.getNodeMapGuidance(levels, state, false), "Etapa concluída.");
  assert.match(presentation.getNodeMapGuidance(levels, state, true, false), /Gere o mapa do andar selecionado/);
});
