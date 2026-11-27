import assert from "node:assert/strict";
import test from "node:test";
import { withIslandTacticalLayout } from "../src/archipelagoTacticalMap.js";
import { createNodeTacticalMap } from "../src/nodeTacticalMap.js";

const tasks = [
  ["NO", "Travar o badalo", "Manter a passagem da proa"],
  ["NL", "Baixar a corda", "Sustentar a ponte de cabos"],
  ["O", "Retirar a chave", "Abrir a porta de serviço"],
  ["L", "Salvar o registro", "Isolar a enfermaria"],
  ["SO", "Baixar a carga suspensa", "Salvar o manifesto"],
  ["SL", "Liberar o leme", "Recuperar a carta de navegação"]
];

function mapFor(objective, creatures, seed = "navio") {
  const scene = withIslandTacticalLayout({
    id: seed,
    type: objective ? "combat" : "boss",
    environment: { terrain: { name: "Convés do navio", features: [] } },
    resolvedEncounter: { items: creatures.map(creatureId => ({ creatureId, kind: "creature", quantity: 1 })) }
  }, "abandoned-ship", objective);

  return { layout: scene.tacticalLayout, map: createNodeTacticalMap(scene) };
}

function assertEnemyPlacement(map, area, sizes) {
  const enemies = map.scene.pieces.filter(piece => piece.side === "enemy");
  assert.deepEqual(enemies.map(piece => piece.width), sizes);
  for (const piece of enemies) {
    assert.ok(piece.x >= area.minX && piece.x + piece.width - 1 <= area.maxX);
    assert.ok(piece.y >= area.minY && piece.y + piece.height - 1 <= area.maxY);
  }
}

test("Navio Abandonado tem 12 plantas próprias com marcos, formação e área inicial", () => {
  const plans = new Set();
  for (const [direction, ...titles] of tasks) {
    for (const title of titles) {
      for (let seed = 0; seed < 8; seed++) {
        const { layout, map } = mapFor({ direction, title }, ["entessombra-broto", "fantasma", "alma-acorrentada"], seed);
        assert.ok(map.landmark?.label, title);
        assert.equal(map.scene.pieces.filter(piece => piece.side === "ally").length, 4);
        assertEnemyPlacement(map, layout.enemyArea, [2, 1, 1]);
        plans.add(JSON.stringify(layout.zones));
      }
    }
  }
  assert.equal(plans.size, 12);
});

test("Cabine tem mesa, memento e caixão, e abriga a sombra ou a dupla", () => {
  for (const [creatures, sizes] of [
    [["entessombra-broto"], [2]],
    [["fantasma", "alma-acorrentada"], [1, 1]]
  ]) {
    const { layout, map } = mapFor(undefined, creatures);
    assert.equal(map.landmark.label, "Caixão da carga");
    assert.ok(map.scene.markers.some(({ label }) => label === "Ordem assinada (Memento)"));
    assert.ok(!map.scene.features.some(({ type }) => type.startsWith("solar-focus")));
    assertEnemyPlacement(map, layout.enemyArea, sizes);
  }
});
