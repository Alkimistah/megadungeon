import assert from "node:assert/strict";
import { createIslandGuardian, createIslandPilot, createIslandSectorCombat, pickIslandGuardian } from "../src/archipelagoPilot.js";
import { getIslandCreatureIds } from "../src/archipelagoCreatureRules.js";
import { archipelago21to30Profile as profile } from "../src/floorProfiles/archipelago21to30.js";
import { calculateCombatND } from "../src/challenge.js";
import { rerollNodeCreatures } from "../src/encounterResolver.js";
import { withIslandTacticalLayout } from "../src/archipelagoTacticalMap.js";

const samples = 240;
let missing = 0;
let total = 0;
let rerolls = 0;
for (const row of ["initial", "intermediate"]) {
  for (const { id: themeId } of profile.archipelago.themePools[row]) {
    if (!profile.archipelago.enabledThemeIds.includes(themeId)) continue;
    const target = row === "initial" ? 6 : 7;
    const island = { floor: row === "initial" ? 21 : 25, themeId, baseChallenge: target + 2 };
    const registered = new Set(getIslandCreatureIds(themeId));
    const seen = new Set();
    const maps = new Set();
    const variantsBySector = new Map();

    // Percorre o seletor de tarefas com rolagens igualmente espaçadas.
    for (let roll = 0; roll < 40; roll++) {
      const { objectives } = createIslandPilot(island.floor, themeId, 24, () => (roll + 0.5) / 40);
      island.objectives ??= objectives;
      for (const objective of objectives) {
        if (!variantsBySector.has(objective.id)) variantsBySector.set(objective.id, new Map());
        variantsBySector.get(objective.id).set(objective.variant, objective);
      }
    }
    assert.equal(variantsBySector.size, target === 6 ? 4 : 6, themeId);
    for (const variantsById of variantsBySector.values()) {
      const variants = [...variantsById.values()];
      const combats = variants.filter(objective => objective.type === "combate");
      assert.ok(combats.length >= (target === 6 ? 1 : 2), themeId);
      assert.ok(variants.length >= (target === 6 ? 4 : 3), themeId);
      for (const objective of combats) {
        for (let roll = 0; roll < samples; roll++) {
          const scene = createIslandSectorCombat(island, objective, profile, `auditoria-final-${roll}`);
          total++;
          const items = scene.resolvedEncounter?.items;
          assert.equal(calculateCombatND(items), target, themeId);
          const layout = withIslandTacticalLayout(scene, themeId, objective).tacticalLayout;
          if (roll === 0) maps.add(JSON.stringify(layout?.zones));
          const record = entries => {
            for (const item of entries) {
              assert.ok(registered.has(item.creatureId), `${themeId}: ${item.creatureId}`);
              seen.add(item.creatureId);
            }
          };
          record(items);
          if (roll < 12) {
            rerolls++;
            const rerolled = rerollNodeCreatures(scene, profile, { tacticalLayout: layout });
            assert.equal(calculateCombatND(rerolled?.items), target, themeId);
            record(rerolled.items);
          }
        }
      }
    }
    if (target === 7) assert.equal(maps.size, 12, themeId);
    assert.ok(seen.size >= 12, themeId);
    const center = new Set();
    for (const roll of [0, 0.4, 0.8]) {
      const scene = createIslandGuardian(island, pickIslandGuardian(island, () => roll), profile, "auditoria-centro");
      assert.equal(calculateCombatND(scene.resolvedEncounter.items), island.baseChallenge, themeId);
      for (const item of scene.resolvedEncounter.items) center.add(item.creatureId);
    }

    const absent = [...registered].filter(id => !seen.has(id));
    const centerOnly = absent.filter(id => center.has(id));
    const noEncounter = absent.filter(id => !center.has(id));
    missing += noEncounter.length;
    console.log(`${themeId}: ${seen.size}/${registered.size} nos setores`,
      { apenasNoCentro: centerOnly, semEncontro: noEncounter });
  }
}
console.log({ sorteios: total, rerrolagens: rerolls, fichasSemEncontro: missing });
assert.equal(missing, 0, "Toda ficha regional precisa de um encontro observado na ilha.");
