import assert from "node:assert/strict";
import test from "node:test";
import { withIslandTacticalLayout } from "../src/archipelagoTacticalMap.js";
import { createNodeTacticalMap } from "../src/nodeTacticalMap.js";

const tasks = [
  ["NO", "Firmar a saída da galeria", "Resgatar na rachadura"],
  ["NL", "Defender a passagem", "Abrir caminho entre as farpas"],
  ["O", "Segurar a faixa firme", "Recuperar a mochila"],
  ["L", "Disputar a rota sombreada", "Retirar o explorador da bacia"],
  ["SO", "Defender a saída", "Romper a lâmina"],
  ["SL", "Recolher o fragmento", "Tomar os pontos de apoio"]
];

function createMap(objective, creatureId = "ameba-gigante", quantity = 1) {
  const node = {
    id: objective?.title ?? "prisma-da-mare",
    type: objective ? "combat" : "boss",
    environment: { terrain: { name: "Recife de cristal", features: [] } },
    resolvedEncounter: { items: [{ kind: "creature", creatureId, quantity, challengeRating: 7 }] }
  };
  const scene = withIslandTacticalLayout(node, "crystal", objective);
  return { layout: scene.tacticalLayout, map: createNodeTacticalMap(scene) };
}

function assertFits(piece, area) {
  assert.ok(piece.x >= area.minX && piece.x + piece.width - 1 <= area.maxX &&
    piece.y >= area.minY && piece.y + piece.height - 1 <= area.maxY, JSON.stringify({piece, area}));
}

test("Ilha de Cristal tem 12 plantas distintas e áreas capazes de iniciar uma peça 3x3", () => {
  const terrainKeys = new Set();
  for (const [direction, ...titles] of tasks) {
    for (const title of titles) {
      const { layout, map } = createMap({ direction, title });
      assert.ok(map.landmark?.label, title);
      assert.equal(layout.partyPositions.length, 4);
      assert.equal(map.scene.pieces.filter(piece => piece.side === "ally").length, 4);
      const enemies = map.scene.pieces.filter(piece => piece.side === "enemy");
      assert.equal(enemies.length, 1);
      assert.equal(enemies[0].width, 3);
      assertFits(enemies[0], layout.enemyArea);
      const { x, y } = layout.landmark;
      const gapX = Math.max(0, layout.enemyArea.minX - x, x - layout.enemyArea.maxX);
      const gapY = Math.max(0, layout.enemyArea.minY - y, y - layout.enemyArea.maxY);
      assert.ok(gapX + gapY >= 2, title);
      terrainKeys.add(JSON.stringify(layout.zones));
    }
  }
  assert.equal(terrainKeys.size, 12);
});

test("Prisma da Maré tem três focos distinguíveis, um marco e espaço para duas Amebas Gigantes", () => {
  const { layout, map } = createMap(undefined, "ameba-gigante", 2);
  assert.equal(map.landmark.label, "Passagem sob o prisma");
  const features = map.scene.features.filter(({ type }) => type.startsWith("solar-focus-"));
  assert.deepEqual(features.map(({ type }) => type).sort(), ["solar-focus-a", "solar-focus-b", "solar-focus-c"]);
  assert.equal(new Set(features.flatMap(({ indices }) => indices)).size,
    features.reduce((count, feature) => count + feature.indices.length, 0));
  const guardians = map.scene.pieces.filter(piece => piece.side === "enemy");
  assert.equal(guardians.length, 2);
  guardians.forEach(piece => assertFits(piece, layout.enemyArea));
});
