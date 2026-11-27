import test from "node:test";
import assert from "node:assert/strict";
import { calculateCombatND } from "../src/challenge.js";
import { selectRatings } from "../src/encounterGroupComposition.js";
import { refineEncounterGroup, resolveNodeEncounter } from "../src/encounterResolver.js";
import { assignCreatureProfile } from "../src/creatures.js";
import { generateMapData } from "../src/generator.js";
import { createIslandPilot, createIslandSectorCombat } from "../src/archipelagoPilot.js";
import { dungeon1to10Profile } from "../src/floorProfiles/dungeon1to10.js";
import { forest11to20Profile } from "../src/floorProfiles/forest11to20.js";
import { archipelago21to30Profile } from "../src/floorProfiles/archipelago21to30.js";
import { createRng } from "../src/random.js";

// Composições sorteadas pelo ND de grupo do livro (Ameaças de Arton p. 9).
const nd = ratings => calculateCombatND(ratings.map(challengeRating => ({ challengeRating, quantity: 1 })));
const bucketsOf = ratings => new Map(ratings.map(rating => [rating, [{ id: `nd-${rating}`, challengeRating: rating }]]));

// Busca exaustiva de referência: existe algum multiconjunto de `count` ND com o alvo?
function hasComposition(ratings, count, target) {
  const visit = (chosen, start) => {
    if (chosen.length === count) return nd(chosen) === target;
    if (nd(chosen) > target) return false;
    for (let index = start; index < ratings.length; index++) {
      if (visit([...chosen, ratings[index]], index)) return true;
    }
    return false;
  };
  return visit([], 0);
}

test("selectRatings acha 8 e quatro ND 3 para o alvo 9", () => {
  // A memória antiga juntava prefixos de mesma soma e recusava este alvo.
  assert.equal(hasComposition([0.5, 3, 8], 5, 9), true);
  for (let seed = 0; seed < 8; seed++) {
    const ratings = selectRatings(bucketsOf([0.5, 3, 8]), 5, 9, createRng(`nd-9-${seed}`));
    assert.ok(ratings, `seed ${seed}`);
    assert.equal(ratings.length, 5);
    assert.equal(nd(ratings), 9);
  }
});

test("selectRatings acha composição sempre que ela existe", () => {
  const pools = [[0.5, 1, 2], [0.5, 2, 5], [1, 2, 3], [0.25, 0.5, 1, 3], [2, 3, 5, 6], [0.5, 3, 8], [1, 3, 4, 7]];
  for (const pool of pools) {
    for (let target = 1; target <= 10; target++) {
      const ratings = pool.filter(rating => rating < target);
      if (!ratings.length) continue;
      for (let count = 2; count <= 6; count++) {
        const expected = hasComposition(ratings, count, target);
        for (let seed = 0; seed < 3; seed++) {
          const chosen = selectRatings(bucketsOf(ratings), count, target, createRng(`${pool}:${target}:${count}:${seed}`));
          const label = `[${ratings}] ×${count} → ND ${target}`;
          assert.equal(Boolean(chosen), expected, label);
          if (chosen) {
            assert.equal(chosen.length, count, label);
            assert.equal(nd(chosen), target, label);
          }
        }
      }
    }
  }
});

test("selectRatings continua rápido em grupos de 7 a 12", () => {
  const ratings = [0.25, 0.5, ...Array.from({ length: 13 }, (_, index) => index + 1)];
  const started = performance.now();
  for (const target of [3, 6, 9, 12, 14]) {
    for (let count = 7; count <= 12; count++) {
      const chosen = selectRatings(bucketsOf(ratings.filter(rating => rating < target)), count, target, createRng(`${target}:${count}`));
      if (chosen) assert.equal(nd(chosen), target);
    }
  }
  assert.ok(performance.now() - started < 2000);
});

test("refinamento acrescenta só ND que fecham o alvo", () => {
  const creature = challengeRating => ({
    id: `teste-nd-${challengeRating}`, name: `Teste ND ${challengeRating}`, challengeRating, type: "monster", role: "solo"
  });
  const catalog = [creature(3), creature(4), creature(5)];
  for (let seed = 0; seed < 8; seed++) {
    const lead = catalog[2];
    const items = [{ kind: "creature", creatureId: lead.id, creatureData: lead, challengeRating: 5, quantity: 1 }];
    const result = refineEncounterGroup(items, 6, "monster", null, createRng(`refino-${seed}`), catalog, null);
    // 5 e 4 → 6. A inversão da média pedia ND 3 (5 e 3 → 5).
    assert.equal(calculateCombatND(result), 6, `seed ${seed}`);
    assert.deepEqual(result.map(item => [item.challengeRating, item.quantity]), [[5, 1], [4, 1]], `seed ${seed}`);
  }
});

test("refinamento segue para o catálogo quando cópias abaixo de ND 1 não fecham alvo par", () => {
  const creature = challengeRating => ({
    id: `teste-nd-${challengeRating}`, name: `Teste ND ${challengeRating}`, challengeRating, type: "monster", role: "solo"
  });
  const catalog = [creature(0.5), creature(2), creature(3)];
  for (let seed = 0; seed < 4; seed++) {
    const lead = catalog[0];
    const items = [{ kind: "creature", creatureId: lead.id, creatureData: lead, challengeRating: 0.5, quantity: 1 }];
    const result = refineEncounterGroup(items, 4, "monster", null, createRng(`refino-par-${seed}`), catalog, null);
    // 4× ND 1/2 (grupo 3) e um ND 2 → 4. Só as cópias davam 3.
    assert.equal(calculateCombatND(result), 4, `seed ${seed}`);
    assert.deepEqual(result.map(item => [item.challengeRating, item.quantity]), [[0.5, 4], [2, 1]], `seed ${seed}`);
  }
});

function categoryChallenges() {
  const { categories, tiers } = dungeon1to10Profile.extendedExploration;
  return { categories, tiers };
}

test("andares 1–10: encontros sorteados fecham o ND alvo", () => {
  const { categories, tiers } = categoryChallenges();
  for (let floor = 1; floor <= 9; floor++) {
    const tier = tiers.find(item => item.floors.includes(floor));
    for (const categoryId of ["easy", "medium", "hard"]) {
      const byTier = categories[categoryId].challengeByTier;
      const target = byTier[tier.id] ?? byTier.default ?? 0;
      for (let sample = 0; sample < 25; sample++) {
        const seed = `nd-grupo-${floor}-${categoryId}-${sample}`;
        const node = {
          id: seed, encounterSeed: seed, type: "normal", level: floor,
          environment: { terrain: { name: floor >= 7 ? "Covil aracnídeo" : "Labirinto", features: [] }, climate: [] },
          challenge: { climate: 0, creatures: target, encounter: target, terrain: 0, total: target, trap: 0 },
          creature: null, trap: null, resolvedEncounter: null
        };
        assignCreatureProfile(node, dungeon1to10Profile, createRng(`${seed}-profile`));
        const encounter = resolveNodeEncounter(node, { mapSeed: seed, profile: dungeon1to10Profile });
        const creatures = encounter.items.filter(item => item.kind === "creature");
        assert.equal(calculateCombatND(creatures), target, seed);
      }
    }
  }
});

test("andares 11–20: encontros sorteados fecham o ND alvo", () => {
  const profile = forest11to20Profile;
  let checked = 0;
  let fractional = 0;
  for (let floor = 11; floor <= 20; floor++) {
    for (let sample = 0; sample < 30; sample++) {
      const seed = `nd-grupo-floresta-${floor}-${sample}`;
      const levels = generateMapData(5, profile.recommendations.baseDcByFloor[floor], profile, floor, createRng(seed), { version: 2 });
      for (const node of levels.flat()) {
        if (!node.creature || node.fixedComposition || node.creature.creatureId) continue;
        const target = node.creature.targetChallenge ?? node.challenge.creatures;
        if (!(target > 0)) continue;
        // Com base 1 ou mais o ND do livro é inteiro: alvo fracionário mira o inteiro abaixo.
        const expected = target >= 1 ? Math.floor(target) : target;
        const encounter = resolveNodeEncounter(node, { mapSeed: seed, profile });
        const creatures = (encounter?.items || []).filter(item => item.kind === "creature");
        assert.ok(creatures.length, `${seed} ${node.id}: encontro vazio (alvo ${target})`);
        assert.equal(calculateCombatND(creatures), expected, `${seed} ${node.id} (alvo ${target})`);
        if (expected !== target) fractional++;
        checked++;
      }
    }
  }
  assert.ok(checked > 300);
  assert.ok(fractional > 10, "a amostra precisa ter alvos fracionários");
});

test("setores do arquipélago: combates sorteados fecham o ND alvo", () => {
  const profile = archipelago21to30Profile;
  for (const row of ["initial", "intermediate"]) {
    for (const { id: themeId } of profile.archipelago.themePools[row]) {
      if (!profile.archipelago.enabledThemeIds.includes(themeId)) continue;
      const target = row === "initial" ? 6 : 7;
      const floor = row === "initial" ? 21 : 25;
      for (let roll = 0; roll < 4; roll++) {
        const { objectives } = createIslandPilot(floor, themeId, 24, () => (roll + 0.5) / 4);
        const island = { floor, themeId, baseChallenge: target + 2, objectives };
        for (const objective of objectives.filter(item => item.type === "combate")) {
          for (let sample = 0; sample < 3; sample++) {
            const scene = createIslandSectorCombat(island, objective, profile, `nd-grupo-${themeId}-${roll}-${sample}`);
            assert.equal(calculateCombatND(scene.resolvedEncounter?.items), target, `${themeId} ${objective.id}`);
          }
        }
      }
    }
  }
});
