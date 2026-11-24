import assert from "node:assert/strict";
import test from "node:test";

import { createExtendedExplorationState } from "../src/extendedExplorationState.js";
import { createExtendedTacticalMap } from "../src/extendedTacticalMap.js";
import { dungeon1to10Profile } from "../src/floorProfiles/dungeon1to10.js";
import { createRng } from "../src/random.js";

const profile = dungeon1to10Profile;

test("d100 encounters use the twelve corridor and room plans with a party entrance", (t) => {
  t.mock.method(Date, "now", () => 1_795_560_000_000);
  const templates = new Set();
  const openings = new Set();

  for (let floor = 1; floor <= 9; floor += 1) {
    const state = createExtendedExplorationState(profile);
    const tier = profile.extendedExploration.tiers.find(({ floors }) => floors.includes(floor));

    for (const { min, category } of tier.d100.filter(({ category }) =>
      ["easy", "medium", "hard", "obstacle"].includes(category))) {
      for (let sample = 0; sample < 24; sample += 1) {
        state.initialize(profile, floor, createRng(`maps-${floor}-${category}-${sample}`));
        const result = state.resolveD100(min);
        const map = createExtendedTacticalMap(result);
        assert.ok(map, `Andar ${floor}, ${category}`);
        const { cells, width, height, template, scene } = map;
        assert.deepEqual([width, height], [16, 12]);
        templates.add(template);
        const edge = cells.flatMap((cell, index) => {
          const x = index % width;
          const y = Math.floor(index / width);
          return (cell === "floor" || cell === "door") &&
            (x === 0 || x === width - 1 || y === 0 || y === height - 1) ? [[x, y]] : [];
        });
        openings.add(edge.length);
        const party = scene.pieces.filter(piece => piece.kind === "party");
        assert.equal(party.length, 4);
        assert.ok(party.some(({ x, y }) => edge.some(([a, b]) => Math.abs(x - a) + Math.abs(y - b) === 1)));
        assert.equal(scene.pieces.filter(piece => piece.side === "enemy").length, map.enemyCount);
        const occupied = new Set();
        for (const piece of scene.pieces) {
          for (let y = piece.y; y < piece.y + piece.height; y += 1) {
            for (let x = piece.x; x < piece.x + piece.width; x += 1) {
              assert.ok(x >= 0 && x < width && y >= 0 && y < height, template);
              const index = y * width + x;
              assert.ok(!["wall", "pit", "obstacle", "reinforcement"].includes(cells[index]), template);
              assert.ok(!occupied.has(index), template);
              occupied.add(index);
            }
          }
        }
      }
    }
  }

  assert.equal(templates.size, 12);
  assert.ok(openings.has(2), "deve haver mapas só com a abertura de chegada");
  assert.ok(openings.has(6), "deve haver mapas com mais de uma abertura adicional");
});

test("an adjacent-threat omen brings a creature to the arrival formation", () => {
  const state = createExtendedExplorationState(profile);
  state.initialize(profile, 1, createRng("adjacent-omen"), {
    floor: 1,
    pendingSceneEffects: [{ type: "partyAdjacentToThreat", label: "Cristais falsos" }]
  });
  const { scene } = createExtendedTacticalMap(state.resolveD100(36));
  const party = scene.pieces.filter(piece => piece.kind === "party");
  const enemies = scene.pieces.filter(piece => piece.side === "enemy");
  assert.ok(party.some(ally => enemies.some(enemy => {
    const dx = Math.max(enemy.x - ally.x, ally.x - enemy.x - enemy.width + 1, 0);
    const dy = Math.max(enemy.y - ally.y, ally.y - enemy.y - enemy.height + 1, 0);
    return dx + dy === 1;
  })));
});

test("a saved encounter restores its generated tactical plan and keeps its composition on reroll", () => {
  const state = createExtendedExplorationState(profile);
  state.initialize(profile, 1, createRng("generated-map-save"));
  const generated = state.resolveD100(36);
  const originalMap = structuredClone(generated.tacticalMap);
  const session = JSON.parse(JSON.stringify(state.exportSessionState()));

  state.initialize(profile, 1, createRng("generated-map-restore"), session);
  const restored = state.getSnapshot().currentResult;
  assert.deepEqual(restored.tacticalMap, originalMap);
  const encounter = structuredClone(restored.encounterNode.resolvedEncounter);
  state.rerollTacticalMap();
  const rerolled = state.getSnapshot().currentResult;
  assert.deepEqual(rerolled.encounterNode.resolvedEncounter, encounter);
});

test("a curated final encounter uses its authored map", () => {
  const state = createExtendedExplorationState(profile);
  state.initialize(profile, 1, createRng("curated-map"), { floor: 1, phase: "floorEncounter" });
  const { finalEncounter } = state.getSnapshot();
  assert.ok(finalEncounter.sceneId);
  assert.equal(finalEncounter.tacticalMap.preset, true);
});

test("the tenth floor uses its fixed arena", () => {
  const state = createExtendedExplorationState(profile);
  state.initialize(profile, 10, createRng("boss-map"));
  const { tacticalMap } = state.getSnapshot().bossEncounter;
  assert.equal(tacticalMap.template, "boss-arachnid-arena");
  assert.equal(tacticalMap.preset, true);
  assert.deepEqual([tacticalMap.width, tacticalMap.height], [20, 14]);
});
