import assert from "node:assert/strict";
import test from "node:test";
import { getIslandCreatureIds } from "../src/archipelagoCreatureRules.js";
import { createIslandGuardian, createIslandSector, createIslandSectorCombat } from "../src/archipelagoPilot.js";
import { createArchipelagoState } from "../src/archipelagoState.js";
import { withIslandTacticalLayout } from "../src/archipelagoTacticalMap.js";
import { calculateCombatND } from "../src/challenge.js";
import { getCreatureById } from "../src/creatureCatalog/index.js";
import { rerollNodeCreatures } from "../src/encounterResolver.js";
import { archipelago21to30Profile as profile } from "../src/floorProfiles/archipelago21to30.js";
import { createNodeTacticalMap } from "../src/nodeTacticalMap.js";
import { createRng } from "../src/random.js";

const themeId = "impossible-tide";

function prepareIsland() {
  for (let index = 0; index < 30; index++) {
    const seed = `mare-impossivel-${index}`;
    const state = createArchipelagoState(profile, createRng(seed));
    const getIsland = () => state.getSnapshot().islands.find(island => island.themeId === themeId);
    if (getIsland()) return { state, getIsland, seed };
  }
  assert.fail("Nenhuma expedição sorteou a Maré Impossível.");
}

test("os seis setores têm duas plantas de combate e sorteiam todo o elenco em ND 7", () => {
  const { getIsland } = prepareIsland();
  const island = getIsland();
  assert.equal(island.objectives.length, 6);
  const seen = new Set();
  const layouts = [];
  for (let index = 0; index < 6; index++) {
    const variants = [0, 1, 2].map(variant => createIslandSector(island, index, variant, 24));
    const combats = variants.filter(objective => objective.type === "combate");
    assert.equal(combats.length, 2);
    for (const objective of combats) {
      for (let roll = 0; roll < 40; roll++) {
        const scene = createIslandSectorCombat(island, objective, profile, `mare-${roll}`);
        assert.equal(calculateCombatND(scene.resolvedEncounter.items), 7);
        for (const item of scene.resolvedEncounter.items) seen.add(item.creatureId);
        const tactical = withIslandTacticalLayout(scene, themeId, objective);
        const map = createNodeTacticalMap(tactical);
        const enemies = map.scene.pieces.filter(piece => piece.side === "enemy");
        assert.equal(enemies.length, scene.resolvedEncounter.items.reduce((count, item) => count + item.quantity, 0));
        const { minX, maxX, minY, maxY } = tactical.tacticalLayout.enemyArea;
        for (const piece of enemies) {
          assert.ok(piece.x >= minX && piece.x + piece.width - 1 <= maxX);
          assert.ok(piece.y >= minY && piece.y + piece.height - 1 <= maxY);
        }
        if (roll === 0) {
          assert.ok(map.landmark);
          layouts.push(JSON.stringify(tactical.tacticalLayout.zones));
          assert.equal(calculateCombatND(rerollNodeCreatures(scene, profile)?.items), 7);
        }
      }
    }
  }
  assert.equal(new Set(layouts).size, 12);
  assert.equal(seen.size, 12);
  assert.deepEqual(seen, new Set(getIslandCreatureIds(themeId)));
});

test("o Poço das Duas Marés tem três guardiões ND 9 e conclui a ilha com um fragmento", () => {
  const { state, getIsland, seed } = prepareIsland();
  const island = getIsland();
  const { floor } = island;
  assert.equal(island.arenaName, "Poço das Duas Marés");
  for (const id of ["gigante-dos-mares", "cardume-de-selakos", "corgann-das-duas-mares"]) {
    const scene = createIslandGuardian(island, id, profile, seed);
    assert.equal(calculateCombatND(scene.resolvedEncounter.items), 9);
    assert.deepEqual(scene.resolvedEncounter.items.map(item => item.creatureId), [id]);
    assert.match(scene.rule, /calmaria/);
    const map = createNodeTacticalMap(withIslandTacticalLayout(scene, themeId));
    assert.ok(map.landmark);
    const enemy = map.scene.pieces.find(piece => piece.side === "enemy");
    assert.ok(enemy);
    if (id === "cardume-de-selakos") {
      for (let y = enemy.y; y < enemy.y + enemy.height; y++) {
        for (let x = enemy.x; x < enemy.x + enemy.width; x++) {
          assert.equal(map.scene.terrain[y * map.width + x], "deep-water");
        }
      }
    }
  }
  assert.equal(getCreatureById("corgann").challengeRating, 8);
  assert.equal(getCreatureById("corgann-das-duas-mares").stats.hitPoints, 360);
  const saved = state.exportSessionState();
  saved.completedFloors = [...profile.archipelago.unlockRules.intermediateRequires];
  saved.islands[floor].guardianComposition = "corgann-das-duas-mares";
  state.initialize(profile, createRng(seed), saved);
  assert.ok(state.exploreIsland(floor, { mapSeed: seed }));
  assert.equal(state.startGuardian(floor), false);
  for (const objective of getIsland().objectives) assert.ok(state.resolveObjective(floor, objective.id, "success"));
  assert.ok(state.startGuardian(floor));
  state.initialize(profile, createRng(seed), JSON.parse(JSON.stringify(state.exportSessionState())));
  assert.equal(getIsland().guardian.scene.bossCreatureId, "corgann-das-duas-mares");
  const fragments = state.getSnapshot().fragments;
  assert.ok(state.completeIsland(floor));
  assert.equal(state.getSnapshot().fragments, fragments + 1);
  assert.match(getIsland().victoryNarrative, /fragmento/);
});
