import assert from "node:assert/strict";

import { calculateCombatND, roundToQuarter } from "../src/challenge.js";
import { assignCreatureProfile } from "../src/creatures.js";
import { getCreatureById } from "../src/creatureCatalog/index.js";
import { resolveNodeEncounter } from "../src/encounterResolver.js";
import { canConfigureExtendedExplorationFloor } from "../src/extendedExplorationControls.js";
import { createExtendedExplorationState } from "../src/extendedExplorationState.js";
import { dungeon1to10Profile } from "../src/floorProfiles/dungeon1to10.js";
import { dungeon1to10FinalEncounters } from "../src/floorProfiles/dungeon1to10FinalEncounters.js";
import { createRng } from "../src/random.js";
import { getTrapById } from "../src/traps.js";

const SAMPLE_COUNT = 500;
const COMBAT_CATEGORIES = ["easy", "medium", "hard"];

function getTier(floor) {
  return dungeon1to10Profile.extendedExploration.tiers
    .find((tier) => tier.floors.includes(floor));
}

function getCategoryChallenge(floor, categoryId) {
  const tier = getTier(floor);
  const challengeByTier = dungeon1to10Profile.extendedExploration
    .categories[categoryId].challengeByTier;

  return challengeByTier[tier.id] ?? challengeByTier.default ?? 0;
}

function createCombatNode(floor, categoryId, challenge, seed) {
  return {
    id: seed,
    encounterSeed: seed,
    type: "normal",
    label: categoryId,
    level: floor,
    environment: {
      terrain: { name: floor >= 7 ? "Covil aracnídeo" : "Labirinto", features: [] },
      climate: []
    },
    challenge: {
      climate: 0,
      creatures: challenge,
      encounter: challenge,
      terrain: 0,
      total: challenge,
      trap: 0
    },
    creature: null,
    trap: null,
    resolvedEncounter: null
  };
}

function assertCumulativeCreatureLists() {
  const lists = dungeon1to10Profile.creatureRules.allowedCreatureIdsByFloor;

  for (let floor = 1; floor <= 9; floor += 1) {
    const currentIds = lists[floor];

    assert.ok(currentIds.length > 0, `Andar ${floor}: lista de criaturas vazia`);
    assert.equal(new Set(currentIds).size, currentIds.length, `Andar ${floor}: criatura repetida na lista`);
    currentIds.forEach((creatureId) => {
      assert.ok(getCreatureById(creatureId), `Andar ${floor}: criatura desconhecida ${creatureId}`);
    });

    if (floor === 1) continue;
    lists[floor - 1].forEach((creatureId) => {
      assert.ok(currentIds.includes(creatureId), `Andar ${floor}: criatura anterior removida ${creatureId}`);
    });
  }
}

function assertGeneratedCombatEncounters() {
  let checkedEncounters = 0;

  for (let floor = 1; floor <= 9; floor += 1) {
    const allowedIds = new Set(dungeon1to10Profile.creatureRules.allowedCreatureIdsByFloor[floor]);

    for (const categoryId of COMBAT_CATEGORIES) {
      const targetChallenge = getCategoryChallenge(floor, categoryId);

      for (let sample = 0; sample < SAMPLE_COUNT; sample += 1) {
        const seed = `floors-1-10-${floor}-${categoryId}-${sample}`;
        const node = createCombatNode(floor, categoryId, targetChallenge, seed);

        assignCreatureProfile(node, dungeon1to10Profile, createRng(`${seed}-profile`));
        const encounter = resolveNodeEncounter(node, { mapSeed: seed });
        const creatures = encounter?.items?.filter((item) => item.kind === "creature") || [];

        assert.ok(encounter, `Andar ${floor}, ${categoryId}, amostra ${sample}: encontro vazio`);
        assert.ok(creatures.length > 0, `Andar ${floor}, ${categoryId}, amostra ${sample}: sem criaturas`);
        assert.equal(
          calculateCombatND(creatures),
          targetChallenge,
          `Andar ${floor}, ${categoryId}, amostra ${sample}: ND diferente do alvo`
        );
        creatures.forEach((creature) => {
          assert.ok(
            creature.generated || allowedIds.has(creature.creatureId),
            `Andar ${floor}: criatura fora da lista ${creature.creatureId}`
          );
        });
        checkedEncounters += 1;
      }
    }
  }

  return checkedEncounters;
}

function assertCuratedFinalEncounterBudgets() {
  let checkedVariants = 0;

  Object.values(dungeon1to10FinalEncounters.scenesByTier).forEach((scenes) => {
    scenes.forEach((scene) => {
      scene.variants.forEach((variant, variantIndex) => {
        const creatureItems = (variant.creatures || []).map(({ id, quantity = 1 }) => {
          const creature = getCreatureById(id);

          assert.ok(creature, `${scene.id}: criatura desconhecida ${id}`);
          return { challengeRating: creature.challengeRating, quantity };
        });
        const trapChallenge = (variant.traps || []).reduce((total, trapId) => {
          const trap = getTrapById(trapId);

          assert.ok(trap, `${scene.id}: armadilha desconhecida ${trapId}`);
          return total + trap.challengeRating;
        }, 0);

        if (creatureItems.length === 0 && trapChallenge === 0) return;

        const actualChallenge = roundToQuarter(calculateCombatND(creatureItems) + trapChallenge);
        assert.equal(actualChallenge, variant.challenge, `${scene.id}: composição não corresponde ao ND declarado`);

        const encounterNode = {
          id: `${scene.id}-${variantIndex}`,
          encounterSeed: `${scene.id}-${variantIndex}`,
          challenge: { total: variant.challenge },
          fixedComposition: {
            creatures: variant.creatures || [],
            traps: variant.traps || []
          }
        };
        const resolved = resolveNodeEncounter(encounterNode, { mapSeed: "curated-final-validation" });
        const resolvedTrapQuantity = resolved.items
          .filter((item) => item.kind === "trap")
          .reduce((total, item) => total + item.quantity, 0);

        assert.equal(resolved.budget.trap, roundToQuarter(trapChallenge), `${scene.id}: orçamento de armadilhas incorreto`);
        assert.equal(resolvedTrapQuantity, (variant.traps || []).length, `${scene.id}: quantidade de armadilhas incorreta`);
        checkedVariants += 1;
      });
    });
  });

  return checkedVariants;
}

function assertExtendedFloorConfigurationLock() {
  const freshSnapshot = {
    phase: "exploring",
    successes: 0,
    failures: 0,
    elapsedMinutes: 0,
    usedApproachIds: [],
    currentResults: [],
    resetPending: false,
    descentPending: false
  };

  assert.equal(
    canConfigureExtendedExplorationFloor(dungeon1to10Profile, freshSnapshot),
    true,
    "Configuração: estado inicial não permitiu escolher o andar"
  );

  const lockedStates = [
    { successes: 1 },
    { failures: 1 },
    { elapsedMinutes: 1 },
    { usedApproachIds: ["perception-observe"] },
    { currentResult: { id: "scene" } },
    { currentResults: [{ id: "scene" }] },
    { finalEncounter: { id: "final" } },
    { resetPending: true },
    { descentPending: true },
    { phase: "floorEncounter" },
    { phase: "readyToAdvance" },
    { phase: "boss" },
    { phase: "completed" }
  ];

  lockedStates.forEach((override) => {
    assert.equal(
      canConfigureExtendedExplorationFloor(dungeon1to10Profile, { ...freshSnapshot, ...override }),
      false,
      `Configuração: estado ativo não bloqueou o andar ${JSON.stringify(override)}`
    );
  });
}

function findFinalScene(floor, sceneId) {
  for (let sample = 0; sample < 1000; sample += 1) {
    const seed = `gimmick-${floor}-${sceneId}-${sample}`;
    const rng = createRng(seed);
    const state = createExtendedExplorationState(dungeon1to10Profile, rng);

    state.initialize(dungeon1to10Profile, floor, rng, {
      floor,
      phase: "floorEncounter",
      successes: 0,
      failures: 0,
      usedApproachIds: []
    });
    const scene = state.getSnapshot().finalEncounter;

    if (scene?.sceneId === sceneId) return scene;
  }

  throw new Error(`Gimmick: cena ${sceneId} não apareceu no andar ${floor}`);
}

function assertFinalGimmickApplicability() {
  const expectations = [
    { floor: 1, sceneId: "porta-emperrada", hasGimmick: false },
    { floor: 1, sceneId: "guardiao-relutante", hasGimmick: true },
    { floor: 4, sceneId: "matilha-na-descida", hasGimmick: false },
    { floor: 4, sceneId: "tributo-ao-chefe", hasGimmick: true },
    { floor: 5, sceneId: "preco-dos-saqueadores", hasGimmick: false },
    { floor: 8, sceneId: "cacadora-do-teto", hasGimmick: true }
  ];

  expectations.forEach(({ floor, sceneId, hasGimmick }) => {
    const scene = findFinalScene(floor, sceneId);

    assert.equal(Boolean(scene.gimmick), hasGimmick, `Gimmick: aplicabilidade incorreta em ${sceneId}`);
  });
}

assertCumulativeCreatureLists();
assertExtendedFloorConfigurationLock();
const checkedEncounters = assertGeneratedCombatEncounters();
const checkedVariants = assertCuratedFinalEncounterBudgets();
assertFinalGimmickApplicability();

console.log(
  `Andares 1-10 validados: ${checkedEncounters} encontros gerados sem vazios ou divergências de ND; ` +
  `${checkedVariants} composições finais, bloqueio de andar e gimmicks condicionais conferidos.`
);
