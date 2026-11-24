import assert from "node:assert/strict";
import test from "node:test";
import { createExtendedTacticalMap } from "../src/extendedTacticalMap.js";

test("a versão em camadas conserva ameaças ocultas e liga as criaturas às fichas", () => {
  const width = 12;
  const height = 10;
  const cells = Array(width * height).fill("floor");
  cells[13] = "party";
  cells[41] = "enemy";
  cells[42] = "hidden";
  cells[43] = "reinforcement";
  cells[44] = "web";
  const encounterNode = { resolvedEncounter: { items: [
    { kind: "creature", creatureId: "deinonico", quantity: 1 },
    { kind: "creature", creatureId: "lobo", quantity: 1 }
  ] } };
  const map = createExtendedTacticalMap({ tacticalMap: { width, height, cells }, encounterNode });
  assert.equal(map.scene.pieces.filter(piece => piece.kind === "enemy").length, 2);
  assert.equal(map.scene.pieces.find(piece => piece.kind === "enemy").name, "Deinonico");
  assert.ok(map.scene.markers.some(marker => marker.type === "hidden" && marker.pieceId === "creature:1:lobo:0"));
  assert.ok(map.scene.markers.some(marker => marker.type === "reinforcement" && marker.indices.includes(43)));
  assert.ok(map.scene.features.some(feature => feature.type === "web" && feature.indices.includes(44)));
  assert.equal(map.scene.terrain[44], "floor");
});

test("as teias no mapa da Matriarca também existem sob a peça do chefe e nos ovos", () => {
  const width = 20;
  const height = 14;
  const cells = Array(width * height).fill("floor");
  for (const index of [133, 134, 153, 154]) cells[index] = "boss";
  cells[42] = "reinforcement";
  const encounterNode = { type: "boss", resolvedEncounter: { items: [
    { kind: "creature", creatureId: "aranha-matriarca", quantity: 1 }
  ] } };
  const map = createExtendedTacticalMap({ tacticalMap: { template: "boss-arachnid-arena", width, height, cells, enemyCount: 1 }, encounterNode });
  const boss = map.scene.pieces.find(piece => piece.kind === "boss");
  assert.deepEqual([boss.x, boss.y, boss.width, boss.height], [13, 6, 2, 2]);
  assert.ok(map.scene.features.some(feature => feature.type === "web" && feature.indices.includes(133) && feature.indices.includes(42)));
});
