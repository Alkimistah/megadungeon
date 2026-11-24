import assert from "node:assert/strict";
import test from "node:test";
import { createNodeTacticalMap } from "../src/nodeTacticalMap.js";

const options = { profileId: "forest-11-20" };
function node(terrain, features, trapId, id = terrain) {
  return {
    id,
    type: trapId ? "trap" : "normal",
    environment: { terrain: { name: terrain, features: features.map(name => ({ name })) }, climate: [] },
    resolvedEncounter: { items: trapId
      ? [{ kind: "trap", trapId, name: trapId }]
      : [{ kind: "creature", creatureId: "jiboia", quantity: 1 }] }
  };
}

test("the forest profile selects 20 recurring plans according to terrain and features", () => {
  const plans = new Set();
  const terrains = [
    ["Floresta", [[], ["Clareira"]]],
    ["Pântano", [[], ["Lodaçal", "Vegetação alagada"]]],
    ["Aquático", [["Água corrente"], ["Água parada"], ["Personagens submersos"]]],
    ["Colinas", [["Inclinação suave"], ["Inclinação suave", "Inclinação íngreme"], ["Penhasco"], ["Paredão"]]],
    ["Planície aberta", [[], ["Trincheira"]]]
  ];
  for (const [terrain, variants] of terrains) {
    for (const features of variants) {
      for (const trap of [null, "virote"]) {
        for (let i = 0; i < 32; i += 1) {
          const map = createNodeTacticalMap(node(terrain, features, trap, String(i)), [], options);
          plans.add(map.template);
          assert.equal(map.scene.pieces.filter(piece => piece.kind === "party").length, 4);
        }
      }
    }
  }
  assert.equal(plans.size, 20);
});

test("a crossing trap can cover a bridge over a continuous gorge", () => {
  const maps = Array.from({ length: 30 }, (_, index) => createNodeTacticalMap(
    node("Colinas", ["Penhasco"], "virote", `gorge-${index}`), [], options));
  const map = maps.find(({ template }) => template === "gorge-bridge");
  assert.ok(map);
  const { terrain, markers } = map.scene;
  const risk = markers.find(marker => marker.type === "trap");
  assert.ok(risk.indices.every(index => terrain[index] === "bridge"));
  for (let y = 0; y < map.height; y += 1) {
    assert.ok(terrain.slice(y * map.width, (y + 1) * map.width).some(tile => ["abyss", "bridge"].includes(tile)));
  }
});

test("mission scenes place the objective in its authored terrain and use only a resolved trap", () => {
  for (const [terrain, features, targetName, targetType, template, objectiveTile] of [
    ["Floresta", ["Clareira"], "cinzas frias em uma clareira", "clue", "mission-clearing", "clearing"],
    ["Pântano", [], "cruzar terreno inundado", "challenge", "mission-flooded-crossing", "floor"],
    ["Aquático", ["Água parada"], "uma caixa de instrumentos", "object", "mission-riverbed", "deep-water"],
    ["Colinas", ["Penhasco"], "uma caixa de instrumentos", "object", "mission-gorge", "floor"]
  ]) {
    const encounter = node(terrain, features);
    const objectives = [{ missionId: "mission", targetName, targetType }];
    const map = createNodeTacticalMap(encounter, objectives, options);
    assert.equal(map.template, template);
    const marker = map.scene.markers.find(marker => marker.type === "objective");
    assert.equal(map.scene.terrain[marker.indices[0]], objectiveTile);
    assert.equal(map.trapCount, 0);
    assert.deepEqual(map, createNodeTacticalMap(encounter, objectives, options));
    assert.ok(!map.scene.markers.some(marker => marker.type === "trap"));
  }
});

test("the fixed gorge recovery channels the land route through the trap's zone", () => {
  const encounter = node("Colinas", ["Penhasco"], "virote", "recovery-bridge");
  const objective = { missionId: "recover", targetName: "uma caixa de instrumentos", targetType: "object" };
  const { width, height, scene } = createNodeTacticalMap(encounter, [objective], options);
  const { terrain, markers, pieces } = scene;
  const risk = markers.find(marker => marker.type === "trap");
  const target = markers.find(marker => marker.type === "objective").indices[0];
  const start = pieces.find(piece => piece.kind === "party");
  const blocked = new Set(["abyss", "cliff", "wall"]);
  const reachable = avoid => {
    const first = start.y * width + start.x;
    const seen = new Set([first]);
    const queue = [first];
    for (const index of queue) {
      const x = index % width;
      const y = Math.floor(index / width);
      for (const [a, b] of [[x-1,y], [x+1,y], [x,y-1], [x,y+1]]) {
        const next = b * width + a;
        if (a < 0 || a >= width || b < 0 || b >= height ||
          seen.has(next) || avoid.includes(next) || blocked.has(terrain[next])) continue;
        seen.add(next);
        queue.push(next);
      }
    }
    return seen.has(target);
  };
  assert.ok(reachable([]));
  assert.equal(reachable(risk.indices), false);
});

test("global submersion puts deep water beneath the party", () => {
  const map = createNodeTacticalMap(node("Aquático", ["Personagens submersos"], "virote"), [], options);
  assert.equal(map.template, "submerged-bed");
  for (const piece of map.scene.pieces) {
    assert.equal(map.scene.terrain[piece.y * map.width + piece.x], "deep-water");
  }
});
