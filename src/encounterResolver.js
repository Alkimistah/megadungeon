import { calculateCombatND, formatChallengeRating, roundToQuarter } from "./challenge.js";
import { getAutomaticCreatureCatalog, getCreatureById } from "./creatureCatalog/index.js";
import { assignCreatureProfile } from "./creatures.js";
import {
  canUseEcologyQuantity, getCreatureEcologyWeight, getEcologyGroupWeight,
  getEncounterEcologyContext, pickEcologyWeighted
} from "./encounterEcology.js";
import { hasEncounterAdjustments } from "./encounterCreatureHealth.js";
import { pickEncounterGroupComposition } from "./encounterGroupComposition.js";
import { applyWeaponVariation } from "./equipment/weaponVariation.js";
import { getLegacyCandidateWeight, SUPPORT_CREATURE_IDS_BY_TYPE } from "./legacyEncounterPreferences.js";
import { createNodeTacticalMap } from "./nodeTacticalMap.js";
import { createRng, pickWeighted } from "./random.js";
import { createModificationPlan, getThreatParameters, THREAT_CHALLENGE_ORDER } from "./threatCreationRules.js";
import { getEligibleForestTraps, getForestEscortTarget, getTrapById, pickReplacementTrap, pickWeightedTrap, withTrapRole } from "./traps.js";

const ENCOUNTER_RESOLUTION_VERSION = 9;

const CREATURE_TYPE_LABELS = {
  animal: "Animal",
  construct: "Construto",
  spirit: "Espírito",
  humanoid: "Humanoide",
  monster: "Monstro",
  undead: "Morto-vivo",
  event: "Evento"
};

const ELITE_ADJECTIVES_BY_TYPE = {
  animal:    ["Enfurecido",  "Raivoso",   "Feroz"],
  construct: ["Reforçado",   "Blindado",  "Avançado"],
  spirit:    ["Perturbado",  "Furioso",   "Primordial"],
  humanoid:  ["Elite",       "Veterano",  "Campeão"],
  monster:   ["Mutante",     "Colossal",  "Ancestral"],
  undead:    ["Corrompido",  "Sombrio",   "Amaldiçoado"]
};

function getTerrainName(node) {
  return node.environment?.terrain?.name || null;
}

function getChallengeWeight(creature, targetChallenge) {
  const distance = Math.abs(creature.challengeRating - targetChallenge);

  if (distance === 0) return 18;
  if (distance <= 0.5) return 12;
  if (distance <= 1) return 7;
  if (distance <= 2) return 3;
  return 1;
}

function getAllowedCatalog(allowedIds, profile, preferAllowedVariants) {
  if (preferAllowedVariants && allowedIds?.length) {
    return getAutomaticCreatureCatalog(profile, allowedIds.map(getCreatureById).filter(Boolean));
  }
  const catalog = getAutomaticCreatureCatalog(profile);
  if (!allowedIds?.length) return catalog;

  const allowedSet = new Set(allowedIds);
  return catalog.filter((creature) => allowedSet.has(creature.id));
}

function getCandidates(catalog, type, maximumChallenge, excludedIds, minimumChallenge) {
  const matchesCR = (creature) =>
    typeof creature.challengeRating === "number" &&
    creature.challengeRating >= minimumChallenge &&
    creature.challengeRating <= maximumChallenge &&
    !excludedIds.has(creature.id);

  if (type === null) {
    const res = catalog.filter(matchesCR);
    if (res.length > 0) return res;
    return catalog.filter(c =>
      typeof c.challengeRating === "number" &&
      c.challengeRating <= maximumChallenge &&
      !excludedIds.has(c.id)
    );
  }

  const typed = catalog.filter(c => c.type === type && matchesCR(c));
  if (typed.length > 0) return typed;

  // Fallback 1: same type, ignore minimum CR
  const typedAnyCR = catalog.filter(c =>
    c.type === type &&
    typeof c.challengeRating === "number" &&
    c.challengeRating <= maximumChallenge &&
    !excludedIds.has(c.id)
  );
  if (typedAnyCR.length > 0) return typedAnyCR;

  // Fallback 2: any type, with CR range
  const anyTypeInRange = catalog.filter(matchesCR);
  if (anyTypeInRange.length > 0) return anyTypeInRange;

  // Fallback 3: any type, any CR
  return catalog.filter(c =>
    typeof c.challengeRating === "number" &&
    c.challengeRating <= maximumChallenge &&
    !excludedIds.has(c.id)
  );
}

function chooseCandidate(candidates, {
  type, targetChallenge, terrainName, rng, preferredIds = [], preferredSubtype = null, ecology, quantity = 1
}) {
  if (candidates.length === 0) return null;

  const options = candidates.map((creature) => {
    const challengeWeight = getChallengeWeight(creature, targetChallenge);
    const weight = ecology
      ? challengeWeight * getCreatureEcologyWeight(creature, ecology.context, ecology.rules, type, preferredSubtype)
        * getEcologyGroupWeight(creature, quantity)
      : getLegacyCandidateWeight(creature, challengeWeight, targetChallenge, terrainName, preferredIds, preferredSubtype);

    return { creature, weight };
  });
  return (ecology ? pickEcologyWeighted(rng, options) : pickWeighted(rng, options)).creature;
}

function pickCreatureForChallenge(options) {
  const { catalog, type, targetChallenge, excludedIds, ecology } = options;
  const minimumChallenge = Math.max(0.25, targetChallenge - 2);
  const candidates = getCandidates(catalog, ecology ? null : type, targetChallenge, excludedIds, minimumChallenge);
  const exact = ecology ? candidates.filter(creature => creature.challengeRating === targetChallenge) : [];
  return chooseCandidate(exact.length ? exact : candidates, options);
}

function getExactChallengeCandidates(catalog, type, targetChallenge, excludedIds = new Set()) {
  const candidates = catalog.filter((creature) =>
    creature.challengeRating === targetChallenge && !excludedIds.has(creature.id)
  );
  const typed = type === null ? candidates : candidates.filter((creature) => creature.type === type);

  return typed.length > 0 ? typed : candidates;
}

function pickExactCreatureForChallenge(options) {
  const { catalog, type, targetChallenge, excludedIds, ecology, quantity = 1 } = options;
  const pool = ecology ? catalog.filter(creature => canUseEcologyQuantity(creature, quantity)) : catalog;
  const candidates = getExactChallengeCandidates(pool, ecology ? null : type, targetChallenge, excludedIds);
  return chooseCandidate(candidates, options);
}

// Returns the smallest CR in THREAT_CHALLENGE_ORDER that is >= cr.
function snapToValidCRAtOrAbove(cr) {
  return THREAT_CHALLENGE_ORDER.find(v => v >= cr) ?? THREAT_CHALLENGE_ORDER[THREAT_CHALLENGE_ORDER.length - 1];
}

function getEliteAdjective(type, crDelta) {
  const adjectives = ELITE_ADJECTIVES_BY_TYPE[type] || ["Elite", "Avançado", "Ancestral"];
  if (crDelta <= 1) return adjectives[0];
  if (crDelta <= 3) return adjectives[1];
  return adjectives[2];
}

// Maps each creature save (fortitude/reflex/will) to its table slot (strong/medium/weak)
// and returns the corresponding target CR table value for each save.
function assignScaledSaves(baseStats, baseParams, targetParams) {
  const paramKeys = ["strong", "medium", "weak"];
  const result = {};
  for (const saveKey of ["fortitude", "reflex", "will"]) {
    const base = baseStats[saveKey];
    if (typeof base !== "number") { result[saveKey] = null; continue; }
    let bestParam = "medium";
    let bestDist = Infinity;
    for (const param of paramKeys) {
      const dist = Math.abs(base - baseParams.saves[param]);
      if (dist < bestDist) { bestDist = dist; bestParam = param; }
    }
    result[saveKey] = targetParams.saves[bestParam];
  }
  return result;
}

function extractAttackName(actionText) {
  if (!actionText) return null;
  const match = actionText.match(/^([A-Za-zÀ-ÿ\s]+?)(?=\s*[+-]\d)/);
  return match ? match[1].trim() : null;
}

// Generates a scaled "elite" variant of baseCreature at targetCR using T20 table parameters.
// Returns null if the required table entries are unavailable.
function createEliteVariant(baseCreature, targetCR) {
  const snappedTargetCR = snapToValidCRAtOrAbove(targetCR);
  const role = baseCreature.role || "solo";
  let plan, baseParams, targetParams;
  try {
    plan = createModificationPlan(baseCreature, {
      baseRole: role,
      targetChallengeRating: snappedTargetCR,
      targetRole: role
    });
    baseParams = getThreatParameters(role, snapToValidCRAtOrAbove(baseCreature.challengeRating));
    targetParams = getThreatParameters(role, snappedTargetCR);
  } catch {
    return null;
  }

  const baseStats = baseCreature.stats || {};
  const crDelta = snappedTargetCR - baseCreature.challengeRating;
  const adjective = getEliteAdjective(baseCreature.type, crDelta);
  const scaledSaves = assignScaledSaves(baseStats, baseParams, targetParams);

  const scaledActions = (baseCreature.actions ?? []).map(action => {
    const attackName = extractAttackName(action.text ?? "") ?? action.name ?? "Ataque";
    return {
      name: action.name ?? "Corpo a Corpo",
      text: `${attackName} +${targetParams.attack} (dano médio ${targetParams.averageDamage})`,
      originalText: action.text ?? null
    };
  });

  return {
    id: `${baseCreature.id}-elite-cr${snappedTargetCR}`,
    name: `${baseCreature.name} ${adjective}`,
    challengeRating: snappedTargetCR,
    type: baseCreature.type,
    subtype: baseCreature.subtype ?? null,
    role,
    roleMetadata: baseCreature.roleMetadata ?? null,
    roleSource: "generated",
    size: baseCreature.size ?? null,
    generated: true,
    baseCreatureId: baseCreature.id,
    baseCreatureName: baseCreature.name,
    stats: {
      defense: plan.target.stats.defense,
      hitPoints: plan.target.stats.hitPoints,
      ...scaledSaves,
      initiative: baseStats.initiative ?? null,
      perception: baseStats.perception ?? null,
      senses: baseStats.senses ?? null,
      speedText: baseStats.speedText ?? null,
      attributes: baseStats.attributes ?? null,
      defensesText: null,
    },
    actions: scaledActions,
    abilities: baseCreature.abilities ?? [],
    skillsText: baseCreature.skillsText ?? null,
    equipment: baseCreature.equipment ?? null,
    treasure: baseCreature.treasure ?? null,
    sourceRules: null,
  };
}

function getEliteCreatureSummary(generatedCreature, quantity, rng = null) {
  const encounterCreature = rng ? applyWeaponVariation(generatedCreature, rng) : generatedCreature;
  const roleLabel = encounterCreature.roleMetadata?.label || encounterCreature.role || "Papel não definido";
  const typeLabel = CREATURE_TYPE_LABELS[encounterCreature.type] || encounterCreature.type;

  return {
    challengeLabel: formatChallengeRating(encounterCreature.challengeRating),
    challengeRating: encounterCreature.challengeRating,
    creatureId: encounterCreature.id,
    creatureData: encounterCreature,
    generated: true,
    kind: "creature",
    name: encounterCreature.name,
    quantity,
    role: encounterCreature.role || null,
    roleLabel,
    type: encounterCreature.type,
    typeLabel
  };
}

function getCreatureSummary(creature, quantity, rng = null) {
  const encounterCreature = rng ? applyWeaponVariation(creature, rng) : creature;
  const roleLabel = encounterCreature.roleMetadata?.label || encounterCreature.role || "Papel não definido";
  const typeLabel = CREATURE_TYPE_LABELS[encounterCreature.type] || encounterCreature.type;

  return {
    challengeLabel: formatChallengeRating(encounterCreature.challengeRating),
    challengeRating: encounterCreature.challengeRating,
    creatureData: encounterCreature.weaponVariation ? encounterCreature : undefined,
    creatureId: creature.id,
    kind: "creature",
    name: encounterCreature.name,
    quantity,
    role: encounterCreature.role || null,
    roleLabel,
    type: encounterCreature.type,
    typeLabel
  };
}

function getTrapSummary(trap) {
  return {
    challengeLabel: trap.challengeLabel || formatChallengeRating(trap.challengeRating),
    challengeRating: trap.challengeRating,
    kind: "trap",
    name: trap.name,
    quantity: 1,
    role: trap.role,
    roleLabel: trap.roleLabel,
    trapId: trap.id
  };
}

function resolveSpecificCreature(node, rng) {
  const creature = node.creature?.creatureId ? getCreatureById(node.creature.creatureId) : null;

  return creature ? [getCreatureSummary(creature, 1, rng)] : [];
}

// Per T20 rules: to hit a target ND with `totalCount` creatures of equal CR,
// the required CR = target - 2×floor(log2(count)) for CR≥1,
// or target/count for sub-1 targets (linear rule).
function getRequiredCreatureCR(targetChallenge, totalCount) {
  if (totalCount <= 1) return targetChallenge;
  if (targetChallenge < 1) return roundToQuarter(targetChallenge / totalCount);

  const doublings = Math.floor(Math.log2(totalCount));
  const doublingCR = roundToQuarter(targetChallenge - 2 * doublings);
  if (doublingCR >= 1) return doublingCR;

  // Doubling formula would require CR < 1; fall back to linear rule
  return Math.max(0.25, roundToQuarter(targetChallenge / totalCount));
}

function homogeneousGroupMatchesTarget(targetChallenge, totalCount, creatureChallenge) {
  const actualChallenge = calculateCombatND([{
    challengeRating: creatureChallenge,
    quantity: totalCount
  }]);

  return roundToQuarter(actualChallenge) === roundToQuarter(targetChallenge);
}

// ND de grupo pela regra do livro (Ameaças de Arton p. 9): em vez de inverter uma
// fórmula, testa cada ND candidato acrescentado ao grupo com calculateCombatND.
// Note: all-sub-1 groups with targetChallenge >= 1 use bulk-add in refineEncounterGroup instead.
function getClosingAdditionCRs(items, targetChallenge, candidateCRs) {
  return [...new Set(candidateCRs)]
    .filter(cr => typeof cr === "number" && cr < targetChallenge)
    .sort((left, right) => left - right)
    .filter(cr => calculateCombatND([...items, { challengeRating: cr, quantity: 1 }]) === targetChallenge);
}

// Com base de ND 1 ou mais o ND de grupo do livro é inteiro (Ameaças de Arton p. 9):
// orçamento de criaturas fracionário a partir de 1 mira o inteiro abaixo. O ND da
// cena (clima e terreno) não muda.
function getCreatureGroupTarget(value) {
  return typeof value === "number" && value >= 1 ? Math.floor(value) : value;
}

function removeLeastCR(current) {
  const lowest = current.reduce((min, i) =>
    i.challengeRating < min.challengeRating ? i : min
  );
  if (lowest.quantity > 1) {
    lowest.quantity--;
  } else {
    current.splice(current.indexOf(lowest), 1);
  }
}

// Post-generation validation: adjust the group iteratively until its actual T20 ND
// matches targetChallenge. Adds creatures to fill a deficit; removes the lowest-CR
// creature to fix an excess or when addition is mathematically impossible.
export function refineEncounterGroup(items, targetChallenge, type, terrainName, rng, catalog, ecology) {
  if (items.length === 0) return items;
  const MAX_ITER = 10;
  const current = items.map(i => ({ ...i }));

  for (let iter = 0; iter < MAX_ITER; iter++) {
    const actualND = calculateCombatND(current);
    const diff = roundToQuarter(targetChallenge) - roundToQuarter(actualND);
    if (diff === 0) break;

    if (diff > 0) {
      const allCRs = current.flatMap(i => Array(i.quantity).fill(i.challengeRating));
      const allSubOne = allCRs.every(cr => cr < 1);
      const S = allCRs.reduce((a, b) => a + b, 0);

      const leadCreature = getCreatureById(current[0].creatureId) ?? current[0].creatureData ?? null;
      if (allSubOne && targetChallenge >= 1 && (!ecology || canUseEcologyQuantity(leadCreature, 2))) {
        // T20 two-phase rule: ND = 1+2k requires total ∈ [2^k, 2^(k+1)).
        // Add enough of the lead creature to reach the floor of the required tier.
        const k = Math.floor((targetChallenge - 1) / 2);
        const minTotal = Math.pow(2, k);
        const deficit = minTotal - S;
        if (deficit > 0) {
          const leadItem = current[0];
          leadItem.quantity += Math.ceil(deficit / leadItem.challengeRating);
          continue;
        }
        // Already at this tier (even target): copies cannot close it, try the catalog.
      }

      // Allow picking creatures already in the group so quantity++ is possible —
      // sometimes the right fix is more of the lead creature, not a new species.
      // Only CRs below targetChallenge: one creature must not be the whole encounter.
      const addable = ecology
        ? catalog.filter(creature => canUseEcologyQuantity(creature, 2) || !current.some(item => item.creatureId === creature.id))
        : catalog;
      const closingCRs = getClosingAdditionCRs(current, targetChallenge, addable.map(creature => creature.challengeRating));
      if (closingCRs.length) {
        const fitting = addable.filter(creature => closingCRs.includes(creature.challengeRating));
        const typed = !ecology && type ? fitting.filter(creature => creature.type === type) : [];
        const added = chooseCandidate(typed.length ? typed : fitting, {
          type,
          targetChallenge: closingCRs.at(-1),
          terrainName,
          rng,
          preferredSubtype: leadCreature?.subtype ?? null,
          ecology,
        });
        const existing = current.find(i => i.creatureId === added.id);
        if (existing) {
          existing.quantity++;
        } else {
          current.push(getCreatureSummary(added, 1, rng));
        }
        continue;
      }

      // Catalog gap: generate a scaled elite variant of the lead creature at a CR
      // that closes the target. Only CR ≥ 1 above the lead (elites scale up).
      if (leadCreature && (!ecology || canUseEcologyQuantity(leadCreature, 2))) {
        const eliteCRs = getClosingAdditionCRs(current, targetChallenge, THREAT_CHALLENGE_ORDER
          .filter(cr => cr >= 1 && cr > leadCreature.challengeRating + 0.5));
        const elite = eliteCRs.length ? createEliteVariant(leadCreature, eliteCRs[0]) : null;
        if (elite) {
          current.push(getEliteCreatureSummary(elite, 1, rng));
          continue;
        }
      }

      // Single-creature group that needs to reach a higher ND: upgrade the creature
      // itself to targetChallenge rather than trying (and failing) to add a companion.
      if (current.length === 1) {
        const solo = getCreatureById(current[0].creatureId) ?? current[0].creatureData ?? null;
        if (solo && targetChallenge > solo.challengeRating + 0.5) {
          const elite = createEliteVariant(solo, targetChallenge);
          // The elite snaps up to a valid CR; never let the upgrade exceed the target.
          if (elite && elite.challengeRating <= targetChallenge) {
            current[0] = getEliteCreatureSummary(elite, 1, rng);
            continue;
          }
        }
        break;
      }

      // Addition impossible, would require a solo-worthy creature, or yielded no
      // candidate: remove the weakest creature and retry with the stronger remainder.
      removeLeastCR(current);
    } else {
      removeLeastCR(current);
      if (current.length === 0) break;
    }
  }

  return current;
}

function getLegacySizeOptions(targetChallenge, catalog, type) {
  // Each size option produces a group whose actual combat ND equals targetChallenge
  // (per T20 doubling rule) when all creatures have CR = requiredCR.
  return [
    { totalCount: 1, weight: 10 },
    { totalCount: 2, weight: 8 },
    { totalCount: 3, weight: 6 },
    { totalCount: 4, weight: 5 },
    { totalCount: 6, weight: 3 },
  ].map((option) => ({
    ...option,
    requiredChallenge: getRequiredCreatureCR(targetChallenge, option.totalCount)
  })).filter((option) =>
    option.requiredChallenge >= 0.25 &&
    homogeneousGroupMatchesTarget(targetChallenge, option.totalCount, option.requiredChallenge) &&
    getExactChallengeCandidates(catalog, type, option.requiredChallenge).length > 0
  );
}

function getEcologicalSizeOptions(targetChallenge, catalog, type, ecology) {
  return [1, 2, 3, 4, 5, 6].flatMap(totalCount => {
    const leads = catalog
      .filter(creature => creature.challengeRating <= targetChallenge
        && canUseEcologyQuantity(creature, totalCount)
        && homogeneousGroupMatchesTarget(targetChallenge, totalCount, creature.challengeRating))
      .map(creature => ({
        creature,
        weight: getCreatureEcologyWeight(creature, ecology.context, ecology.rules, type)
          * getEcologyGroupWeight(creature, totalCount)
      }));
    if (!leads.length) return [];

    // Use the mean so the number of available sheets alone does not favor a size.
    const weight = leads.reduce((sum, lead) => sum + lead.weight, 0) / leads.length;
    return [{ totalCount, leads, weight }];
  });
}

function getNodeEcology(node, profile) {
  const rules = profile?.creatureRules?.ecology;
  return rules && node.creature?.challengeSource !== "manual"
    ? { rules, context: getEncounterEcologyContext(node, rules) }
    : null;
}

function filterEncounterCatalog(node, catalog, ecology) {
  const requiredTag = ecology?.rules.requiredTerrainTagByName?.[getTerrainName(node)];
  return requiredTag ? catalog.filter(creature => creature.ecology?.terrains?.includes(requiredTag)) : catalog;
}

function getMixedChallengePairs(catalog, targetChallenge, type, ecology) {
  const candidates = catalog.filter(creature => typeof creature.challengeRating === "number"
    && creature.challengeRating < targetChallenge
    && (ecology || !type || creature.type === type));
  const weight = creature => ecology
    ? getCreatureEcologyWeight(creature, ecology.context, ecology.rules, type)
      * getEcologyGroupWeight(creature, 1)
    : 1;

  return candidates.flatMap((first, index) => candidates.slice(index + 1).flatMap(second => {
    if (first.challengeRating === second.challengeRating) return [];
    const pair = [first, second];
    const encounter = pair.map(({ challengeRating }) => ({ challengeRating, quantity: 1 }));
    return calculateCombatND(encounter) === targetChallenge
      ? [{ pair, weight: weight(first) * weight(second) }]
      : [];
  }));
}

function groupFitsTacticalMap(node, layout, profileId, seed, entries, count) {
  const items = entries.map(({ creature, quantity }) => getCreatureSummary(creature, quantity));
  if (node.trap) items.push(getTrapSummary(node.trap));
  return encounterFitsMap(node, layout, profileId, seed, items, count);
}

function encounterFitsMap(node, layout, profileId, seed, items, count, objectives) {
  const map = createNodeTacticalMap({
    ...node, tacticalLayout: layout, resolvedEncounter: { seed, items }
  }, objectives, { profileId });
  const enemies = map.scene.pieces.filter(piece => piece.side === "enemy");
  const trapItem = items.find(item => item.kind === "trap");
  if (node.generationVersion === 5 && trapItem) {
    const trapTiles = new Set(map.scene.markers.filter(marker => marker.id === trapItem.trapId)
      .flatMap(marker => marker.indices ?? []));
    if (!trapTiles.size) return false;
    for (const enemy of enemies) {
      for (let y = enemy.y; y < enemy.y + enemy.height; y++) {
        for (let x = enemy.x; x < enemy.x + enemy.width; x++) {
          if (trapTiles.has(y * map.scene.width + x)) return false;
        }
      }
    }
  }
  const area = layout?.enemyArea;
  return enemies.length === count && (!area || enemies.every(piece =>
    piece.x >= area.minX && piece.y >= area.minY &&
    piece.x + piece.width - 1 <= area.maxX && piece.y + piece.height - 1 <= area.maxY));
}

function getEscortGroups(catalog, target, ecology) {
  const groups = catalog.flatMap(creature => {
    const options = [];
    for (let quantity = 1; quantity <= 12; quantity++) {
      const item = getCreatureSummary(creature, quantity);
      const rating = calculateCombatND([item]);
      if (rating > target) break;
      if (rating !== target || !canUseEcologyQuantity(creature, quantity)) continue;
      const weight = ecology ? getCreatureEcologyWeight(creature, ecology.context, ecology.rules, "humanoid")
        * getEcologyGroupWeight(creature, quantity) : 1;
      options.push({ items: [item], count: quantity, weight });
    }
    return options;
  });
  for (const { pair, weight } of getMixedChallengePairs(catalog, target, "humanoid", ecology)) {
    groups.push({ items: pair.map(creature => getCreatureSummary(creature, 1)), count: 2, weight });
  }
  return groups;
}

export function resolveForestTrapNode(node, profile, { seed, tacticalLayout = node.tacticalLayout }) {
  const rng = createRng(seed);
  const maximumChallenge = node.challenge.encounter;
  const candidates = getEligibleForestTraps(profile, { maximumChallenge });
  const ecology = getNodeEcology(node, profile);
  const rules = profile.creatureRules;
  const catalog = filterEncounterCatalog(node, getAllowedCatalog(
    rules.allowedCreatureIdsByFloor?.[node.level] ?? rules.allowedCreatureIds, profile
  ), ecology).filter(creature => creature.type === "humanoid");
  while (candidates.length) {
    const selected = pickWeightedTrap(candidates, maximumChallenge, rng);
    candidates.splice(candidates.indexOf(selected), 1);
    const trap = withTrapRole(selected, "primary", maximumChallenge);
    const required = trap.mode === "requiresEscort";
    const target = getForestEscortTarget(trap.challengeRating);
    if (target && (required || rng() < 0.25)) {
      const groups = getEscortGroups(catalog, target, ecology);
      while (groups.length) {
        const group = pickEcologyWeighted(rng, groups);
        groups.splice(groups.indexOf(group), 1);
        const items = [...group.items, getTrapSummary(trap)];
        if (encounterFitsMap({ ...node, trap }, tacticalLayout, profile.id, seed, items, group.count)) {
          return { trap, items: group.items, creatureTarget: target };
        }
      }
    }
    if (!required && encounterFitsMap({ ...node, trap }, tacticalLayout, profile.id, seed, [getTrapSummary(trap)], 0)) {
      return { trap, items: [], creatureTarget: 0 };
    }
  }
  return { trap: null, items: [], creatureTarget: 0 };
}

function resolveCreatureGroup(node, rng, catalog, ecology, { profileId, seed, compositionSeed = seed, tacticalLayout } = {}) {
  if (!node.creature || !node.challenge || node.challenge.creatures <= 0) return [];

  const specificCreatureItems = resolveSpecificCreature(node, rng);
  if (specificCreatureItems.length > 0) return specificCreatureItems;

  const targetChallenge = getCreatureGroupTarget(node.creature.targetChallenge ?? node.challenge.creatures);
  const terrainName = getTerrainName(node);
  const type = node.creature.type ?? null;
  if (["dungeon-1-10", "forest-11-20", "archipelago-21-30"].includes(profileId) &&
      node.creature.challengeSource !== "manual") {
    const compositionRng = createRng(`${compositionSeed}:group-composition`);
    if (compositionRng() < 0.45) {
      const layout = tacticalLayout ?? node.tacticalLayout;
      const canCheckMap = layout || profileId !== "archipelago-21-30";
      const accepts = canCheckMap ? (entries, count) => groupFitsTacticalMap(node, layout, profileId, seed, entries, count) : null;
      const group = pickEncounterGroupComposition({
        catalog, target: targetChallenge, type, ecology, profileId, rng: compositionRng, accepts
      });
      if (group) return group.map(({ creature, quantity }) => getCreatureSummary(creature, quantity, rng));
    }
  }
  if (node.creature.allowMixedChallengePairs) {
    const pairs = getMixedChallengePairs(catalog, targetChallenge, type, ecology);
    if (pairs.length && rng() < 0.25) {
      const { pair } = pickWeighted(rng, pairs);
      return pair.map(creature => getCreatureSummary(creature, 1, rng));
    }
  }
  const sizeOptions = ecology
    ? getEcologicalSizeOptions(targetChallenge, catalog, type, ecology)
    : getLegacySizeOptions(targetChallenge, catalog, type);

  if (sizeOptions.length === 0) {
    const fallback = pickCreatureForChallenge({
      type,
      targetChallenge,
      terrainName,
      rng,
      excludedIds: new Set(),
      catalog,
      ecology
    });

    return fallback
      ? refineEncounterGroup([getCreatureSummary(fallback, 1, rng)], targetChallenge, type, terrainName, rng, catalog, ecology)
      : [];
  }

  const { totalCount, requiredChallenge, leads } = ecology
    ? pickEcologyWeighted(rng, sizeOptions)
    : pickWeighted(rng, sizeOptions);

  const lead = ecology
    ? pickEcologyWeighted(rng, leads).creature
    : pickExactCreatureForChallenge({
      type,
      targetChallenge: requiredChallenge,
      terrainName,
      rng,
      excludedIds: new Set(),
      catalog
    });
  if (!lead) return [];

  let rawItems;

  if (totalCount === 1) {
    rawItems = [getCreatureSummary(lead, 1, rng)];
  } else {
    // 75% homogeneous (all same creature), 25% mixed (lead + one support type)
    const { mixed } = pickWeighted(rng, [
      { mixed: false, weight: 15 },
      { mixed: true,  weight: 5  },
    ]);

    if (!mixed) {
      rawItems = [getCreatureSummary(lead, totalCount, rng)];
    } else {
      // Mixed: support gets ~1/3 of slots, lead gets the rest
      const supportCount = Math.max(1, Math.floor(totalCount / 3));
      const leadCount = totalCount - supportCount;
      const { crossType } = pickWeighted(rng, [
        { crossType: false, weight: 8 },
        { crossType: true,  weight: 2 },
      ]);

      const support = pickExactCreatureForChallenge({
        excludedIds: new Set([lead.id]),
        preferredIds: ecology ? [] : SUPPORT_CREATURE_IDS_BY_TYPE[type] || [],
        preferredSubtype: crossType ? null : lead.subtype,
        rng,
        targetChallenge: lead.challengeRating,
        terrainName,
        type: crossType ? null : ecology ? lead.type : type,
        catalog,
        ecology,
        quantity: supportCount,
      });

      rawItems = support
        ? [getCreatureSummary(lead, leadCount, rng), getCreatureSummary(support, supportCount, rng)]
        : [getCreatureSummary(lead, totalCount, rng)];
    }
  }

  return refineEncounterGroup(rawItems, targetChallenge, type, terrainName, rng, catalog, ecology);
}

export function getEncounterSeed(node, mapSeed) {
  if (node.generationVersion === 5 && node.forestComposition?.seed) return node.forestComposition.seed;
  return `${mapSeed || "map"}:${node.encounterSeed || node.id}:encounter-v${ENCOUNTER_RESOLUTION_VERSION}`;
}

export function canRerollNodeCreatures(node) {
  return Boolean(node?.creature
    && ["normal", "elite"].includes(node.contentType || node.type)
    && !node.missionBindings?.length
    && !node.missionObjectives?.length
    && !node.fixedComposition
    && !node.fixedTacticalMap
    && !node.creature.creatureId
    && !hasEncounterAdjustments(node.resolvedEncounter)
    && node.resolvedEncounter?.items.some(item => item.kind === "creature"));
}

function getCreatureComposition(items) {
  const counts = new Map();
  for (const item of items) {
    const id = item.creatureData?.baseCreatureId || item.creatureId;
    counts.set(id, (counts.get(id) || 0) + item.quantity);
  }
  return JSON.stringify([...counts.entries()].sort());
}

export function rerollNodeCreatures(node, profile, { tacticalLayout } = {}) {
  if (!canRerollNodeCreatures(node)) return null;

  const encounter = node.resolvedEncounter;
  const original = encounter.items.filter(item => item.kind === "creature");
  const originalComposition = getCreatureComposition(original);
  // Com orçamento de criaturas, mira o mesmo alvo de resolveCreatureGroup: um grupo
  // gravado antes do ND de grupo do livro pode valer outro ND. Sem orçamento, mira
  // o ND do grupo efetivamente encontrado.
  const challenge = node.challenge?.creatures > 0
    ? getCreatureGroupTarget(node.creature.targetChallenge ?? node.challenge.creatures)
    : calculateCombatND(original);
  const { type, allowedCreatureIds } = node.creature;
  const ecology = getNodeEcology(node, profile);
  const catalog = filterEncounterCatalog(node, getAllowedCatalog(allowedCreatureIds, profile, node.creature.preferAllowedVariants), ecology)
    .filter(creature => ecology || !type || creature.type === type);
  if (!catalog.length || challenge <= 0) return null;

  // O orçamento e a identidade da cena continuam sendo os do encontro original.
  const searchNode = {
    ...node,
    creature: { ...node.creature, type: type || null, targetChallenge: challenge }
  };
  const reroll = (encounter.creatureRerolls || 0) + 1;
  const rng = createRng(`${encounter.seed}:creature-reroll:${reroll}`);
  for (let attempt = 0; attempt < 32; attempt++) {
    const candidate = resolveCreatureGroup(searchNode, rng, catalog, ecology, {
      profileId: profile?.id, seed: encounter.seed, tacticalLayout,
      compositionSeed: `${encounter.seed}:${reroll}:${attempt}`
    });
    if (calculateCombatND(candidate) === challenge && getCreatureComposition(candidate) !== originalComposition) {
      return {
        ...encounter,
        creatureRerolls: reroll,
        items: [...candidate, ...encounter.items.filter(item => item.kind !== "creature")]
      };
    }
  }
  return null;
}

function isNodeTrap(item, trap) {
  return item.kind === "trap" && item.trapId === trap.id && item.role === trap.role;
}

export function canRerollNodeTrap(node) {
  return Boolean(node?.trap
    && ["primary", "incidental"].includes(node.trap.role)
    && node.resolvedEncounter?.items.some(item => isNodeTrap(item, node.trap))
    && !node.fixedComposition
    && !node.fixedTacticalMap);
}

export function rerollNodeTrap(node, profile, { tacticalLayout = node?.tacticalLayout, objectives } = {}) {
  if (!canRerollNodeTrap(node)) return null;

  const current = node.resolvedEncounter;
  const trapRerolls = (current.trapRerolls || 0) + 1;
  const rng = createRng(`${current.seed}:trap-reroll:${trapRerolls}`);
  if (node.generationVersion === 5 && profile.id === "forest-11-20") {
    const count = current.items.filter(item => item.kind === "creature").reduce((sum, item) => sum + item.quantity, 0);
    const mode = count ? undefined : "standalone";
    const candidates = getEligibleForestTraps(profile, { maximumChallenge: node.trap.challengeRating, mode })
      .filter(candidate => candidate.challengeRating === node.trap.challengeRating && candidate.id !== node.trap.id);
    while (candidates.length) {
      const candidate = pickWeightedTrap(candidates, node.trap.challengeRating, rng);
      candidates.splice(candidates.indexOf(candidate), 1);
      const trap = withTrapRole(candidate, node.trap.role, node.trap.targetChallenge ?? node.trap.challengeRating);
      trap.roleDescription = node.trap.roleDescription ?? trap.roleDescription;
      const items = current.items.map(item => isNodeTrap(item, node.trap) ? getTrapSummary(trap) : item);
      if (encounterFitsMap({ ...node, trap }, tacticalLayout, profile.id, current.seed, items, count, objectives)) {
        return { trap, encounter: { ...current, trapRerolls, items } };
      }
    }
    return null;
  }
  const trap = pickReplacementTrap(node.trap, profile, rng);
  if (!trap) return null;

  const items = current.items.map(item => isNodeTrap(item, node.trap) ? getTrapSummary(trap) : item);
  return { trap, encounter: { ...current, trapRerolls, items } };
}

// Builds items from a fixed composition ({ creatures: [{ id, quantity }], traps: [trapId] })
// declared by cenas curadas (encontros finais). Creatures keep weapon variation via rng;
// traps are looked up in the catalog by id.
function resolveFixedComposition(fixedComposition, rng) {
  const weaponRng = fixedComposition.useWeaponVariation === false ? null : rng;
  const creatureItems = (fixedComposition.creatures || [])
    .map(({ id, quantity }) => {
      const creature = getCreatureById(id);
      return creature ? getCreatureSummary(creature, quantity || 1, weaponRng) : null;
    })
    .filter(Boolean);
  const trapQuantities = (fixedComposition.traps || []).reduce((quantities, trapId) => {
    quantities.set(trapId, (quantities.get(trapId) || 0) + 1);
    return quantities;
  }, new Map());
  const trapItems = [...trapQuantities.entries()]
    .map(([trapId, quantity]) => {
      const trap = getTrapById(trapId);
      return trap ? { ...getTrapSummary(trap), quantity } : null;
    })
    .filter(Boolean);

  return [...creatureItems, ...trapItems];
}

function createResolvedEncounter(node, items, seed) {
  // Composições fixas não passam pela divisão de orçamento dos perfis, então o
  // budget é derivado dos próprios itens (ND de combate real + soma das armadilhas).
  const creaturesBudget = node.fixedComposition
    ? calculateCombatND(items.filter((item) => item.kind === "creature"))
    : node.challenge?.creatures || 0;
  const trapBudget = node.fixedComposition
    ? roundToQuarter(items
      .filter((item) => item.kind === "trap")
      .reduce((total, item) => total + (item.challengeRating || 0) * (item.quantity || 1), 0))
    : node.challenge?.trap || 0;

  return {
    budget: {
      creatures: creaturesBudget,
      creaturesLabel: formatChallengeRating(creaturesBudget),
      total: node.challenge?.total || 0,
      totalLabel: formatChallengeRating(node.challenge?.total || 0),
      trap: trapBudget,
      trapLabel: formatChallengeRating(trapBudget)
    },
    items,
    seed,
    version: ENCOUNTER_RESOLUTION_VERSION
  };
}

export function resolveForestAmbush(node, profile, { mapSeed } = {}) {
  if (profile.id !== "forest-11-20" || node.scene?.kind !== "falseRest" || node.resolvedEncounter) return null;

  const target = node.challenge.encounter;
  const seed = `${getEncounterSeed(node, mapSeed)}:false-rest`;
  const rng = createRng(seed);
  const ambushNode = {
    ...node,
    type: "normal",
    challenge: { ...node.challenge, creatures: target }
  };
  assignCreatureProfile(ambushNode, profile, rng);
  const ecology = getNodeEcology(ambushNode, profile);
  const catalog = filterEncounterCatalog(ambushNode, getAllowedCatalog(ambushNode.creature?.allowedCreatureIds, profile), ecology);
  const items = resolveCreatureGroup(ambushNode, rng, catalog, ecology, { profileId: profile.id, seed });
  const groupTarget = getCreatureGroupTarget(target);
  if (items.length && calculateCombatND(items) === groupTarget) return createResolvedEncounter(ambushNode, items, seed);

  const creature = pickExactCreatureForChallenge({
    type: ambushNode.creature.type,
    targetChallenge: groupTarget,
    terrainName: getTerrainName(node),
    rng,
    catalog,
    ecology
  });
  return creature ? createResolvedEncounter(ambushNode, [getCreatureSummary(creature, 1, rng)], seed) : null;
}

export function resolveNodeEncounter(node, { mapSeed, profile, creatureCandidates, tacticalLayout } = {}) {
  if (!node) return null;
  if (node.resolvedEncounter?.version === ENCOUNTER_RESOLUTION_VERSION) return node.resolvedEncounter;
  if (node.resolvedEncounter) node.resolvedEncounter = null;
  if (!node.creature && !node.trap && !node.fixedComposition) return null;

  const seed = getEncounterSeed(node, mapSeed);
  const rng = createRng(seed);
  let items;
  if (node.fixedComposition) {
    items = resolveFixedComposition(node.fixedComposition, rng);
  } else if (node.generationVersion === 5 && node.forestComposition && node.creature?.challengeSource !== "manual") {
    items = resolveFixedComposition(node.forestComposition, rng);
    if (node.trap) items.push(getTrapSummary(node.trap));
  } else {
    const catalog = node.creature
      ? creatureCandidates ?? getAllowedCatalog(node.creature.allowedCreatureIds, profile, node.creature.preferAllowedVariants)
      : [];
    const ecology = getNodeEcology(node, profile);
    items = resolveCreatureGroup(node, rng, filterEncounterCatalog(node, catalog, ecology), ecology, {
      profileId: profile?.id, seed, tacticalLayout
    });
    if (node.trap) items.push(getTrapSummary(node.trap));
  }
  if (items.length === 0) return null;

  node.resolvedEncounter = createResolvedEncounter(node, items, seed);
  return node.resolvedEncounter;
}
