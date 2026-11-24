import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { createTacticalScene, getTacticalFootprint, readLegacyTacticalScene } from "../src/tacticalScene.js";
import { TACTICAL_FEATURE_LABELS, TACTICAL_TERRAIN_LABELS, getTerrainTileClasses } from "../src/tacticalTerrain.js";

test("keeps water beneath a piece, two effects and a location marker", () => {
  const scene = createTacticalScene({
    width: 2,
    height: 2,
    terrain: ["water", "deep-water", "floor", "cliff"],
    features: [
      { type: "web", label: "Teia", indices: [1] },
      { type: "wind", label: "Vento", indices: [1] }
    ],
    markers: [
      { type: "trap", label: "Armadilha", indices: [1] },
      { type: "objective", label: "Capturar", pieceId: "target" }
    ],
    pieces: [
      { id: "target", name: "Alvo", side: "enemy", kind: "enemy", x: 1, y: 0, width: 1, height: 1 }
    ],
    climate: [{ name: "Chuva", effect: "Tempo chuvoso." }]
  });

  assert.deepEqual(scene.terrain, ["water", "deep-water", "floor", "cliff"]);
  assert.deepEqual(scene.features.map(({ indices }) => indices), [[1], [1]]);
  assert.deepEqual(scene.markers[0].indices, [1]);
  assert.equal(scene.markers[1].pieceId, scene.pieces[0].id);
  assert.equal(scene.pieces[0].x, 1);
  assert.equal(scene.climate[0].name, "Chuva");
});

test("lifts legacy tokens and markers out of their original cells", () => {
  const legacy = {
    width: 4,
    height: 2,
    cells: ["wall", "party", "party", "water", "web", "trap", "enemy", "mechanism"],
    landmark: { index: 7, label: "Alavanca" },
    objectiveMarkers: [{ index: 2, label: "Bússola" }]
  };
  const scene = readLegacyTacticalScene(legacy);

  assert.equal(scene.width, 4);
  assert.equal(scene.height, 2);
  assert.deepEqual(scene.terrain, ["wall", "floor", "floor", "water", "floor", "floor", "floor", "mechanism"]);
  assert.deepEqual(scene.pieces.map(({ kind, x, y }) => [kind, x, y]), [
    ["party", 1, 0], ["party", 2, 0], ["enemy", 2, 1]
  ]);
  assert.deepEqual(scene.features.map(({ type, indices }) => [type, indices]), [["web", [4]]]);
  assert.deepEqual(scene.markers.map(({ type, label, indices }) => [type, label, indices]), [
    ["trap", "Armadilha", [5]], ["mechanism", "Alavanca", [7]], ["objective", "Bússola", [2]]
  ]);
});

test("collapses the four cells of a fixed legacy boss into a single piece", () => {
  const legacy = {
    width: 3,
    height: 2,
    cells: ["floor", "boss", "boss", "floor", "boss", "boss"],
    preset: true,
    enemyCount: 1
  };
  const { pieces } = readLegacyTacticalScene(legacy);
  assert.deepEqual(pieces.map(({ x, y, width, height }) => [x, y, width, height]), [[1, 0, 2, 2]]);
});

test("uses all six Tormenta20 creature footprints", () => {
  for (const [size, side] of [
    ["Minúsculo", 1], ["Pequena", 1], ["Média", 1], ["Grande", 2], ["Enorme", 3], ["Colossal", 6]
  ]) {
    assert.deepEqual(getTacticalFootprint(size), { width: side, height: side }, size);
  }
});

test("catalogues distinct atlas tiles for the terrain variants and transparent effects", () => {
  assert.ok(TACTICAL_TERRAIN_LABELS);
  assert.ok(TACTICAL_FEATURE_LABELS);
  assert.notEqual(TACTICAL_TERRAIN_LABELS.water, TACTICAL_TERRAIN_LABELS["deep-water"]);
  const required = [
    "water", "deep-water", "current", "pit", "cliff", "ice", "frozen-river", "abyss", "escarpment",
    "pebbles", "dunes", "gentle-slope", "steep-slope"
  ];
  for (const type of required) assert.ok(TACTICAL_TERRAIN_LABELS[type], type);
  for (const type of ["web", "wind", "concealment", "tree", "obstacle"]) assert.ok(TACTICAL_FEATURE_LABELS[type], type);
  const atlas = readFileSync(new URL("../public/assets/tactical-terrain.png", import.meta.url));
  assert.equal(atlas.readUInt32BE(20), 16, "single row of 16px pixel art");
  assert.ok(atlas.readUInt32BE(16) >= 16 * (30 + 5), "atlas has a tile for each terrain and overlay");
  assert.equal(atlas[25], 6, "RGBA enables transparent overlays");
});

test("terrenos agrupados só têm borda no contorno", () => {
  const width = 5;
  const terrain = Array(width * 4).fill("floor");
  for (let y = 1; y <= 2; y++) for (let x = 1; x <= 3; x++) terrain[y * width + x] = "advantage";
  const at = (x, y) => getTerrainTileClasses(terrain, width, y * width + x);
  const top = at(2, 1);
  assert.ok(top.includes("is-auto") && top.includes("edge-top"));
  for (const side of ["bottom", "left", "right"]) assert.ok(!top.includes(`edge-${side}`));
  const corner = at(1, 2);
  assert.ok(corner.includes("edge-bottom") && corner.includes("edge-left"));
  const alone = ["advantage"];
  assert.deepEqual(getTerrainTileClasses(alone, 1, 0).filter((c) => c.startsWith("edge-")).sort(), ["edge-bottom", "edge-left", "edge-right", "edge-top"]);
  assert.ok(!getTerrainTileClasses(["advantage", "slope"], 1, 0).includes("edge-bottom"));
  const pit = getTerrainTileClasses(["pit", "floor", "floor", "floor"], 2, 0);
  assert.ok(pit.includes("edge-top") && pit.includes("edge-left"));
  assert.deepEqual(getTerrainTileClasses(["floor"], 1, 0), []);
});

test("porta fica deitada ou em pé conforme as paredes", () => {
  assert.ok(getTerrainTileClasses(["wall", "door", "wall"], 3, 1).includes("door-h"));
  assert.ok(getTerrainTileClasses(["wall", "door", "wall"], 1, 1).includes("door-v"));
  const stack = ["wall", "door", "door", "wall"];
  const upper = getTerrainTileClasses(stack, 1, 1);
  const lower = getTerrainTileClasses(stack, 1, 2);
  assert.ok(upper.includes("door-v") && upper.includes("join-bottom") && !upper.includes("join-top"));
  assert.ok(lower.includes("door-v") && lower.includes("join-top") && !lower.includes("join-bottom"));
  const lone = getTerrainTileClasses(["floor", "door", "floor"], 3, 1);
  assert.ok(lone.includes("door-h") && !lone.some((c) => c.startsWith("join-")));
});
