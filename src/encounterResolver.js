import { calculateCombatND, formatChallengeRating, roundToQuarter } from "./challenge.js";
import { creatureCatalog, getCreatureById } from "./creatureCatalog/index.js";
import { createRng, pickWeighted } from "./random.js";
import { createModificationPlan, getThreatParameters, THREAT_CHALLENGE_ORDER } from "./threatCreationRules.js";

const ENCOUNTER_RESOLUTION_VERSION = 7;

const CREATURE_TYPE_LABELS = {
  animal: "Animal",
  construct: "Construto",
  spirit: "Espírito",
  humanoid: "Humanoide",
  monster: "Monstro",
  undead: "Morto-vivo"
};

const TERRAIN_AFFINITIES = {
  "Colinas": {
    ids: ["centauro-combatente", "centauro-chefe", "centauro-xama"],
    subtypes: ["centauro"]
  },
  "Floresta": {
    ids: ["lobo", "espada-da-floresta", "galhada-macho", "galhada-femea"],
    subtypes: ["orc", "goblin"]
  },
  "Pântano": {
    ids: ["glop", "glooop", "mamae-glop", "basilisco", "tendriculo"],
    subtypes: []
  },
  "Aquático": {
    ids: ["aquinne", "lacedon"],
    subtypes: ["elemental"]
  },
  "Planície aberta": {
    ids: ["orc-combatente", "gnoll-saqueador", "gnoll-filibusteiro"],
    subtypes: ["orc", "gnoll"]
  }
};

const ELITE_ADJECTIVES_BY_TYPE = {
  animal:    ["Enfurecido",  "Raivoso",   "Feroz"],
  construct: ["Reforçado",   "Blindado",  "Avançado"],
  spirit:    ["Perturbado",  "Furioso",   "Primordial"],
  humanoid:  ["Elite",       "Veterano",  "Campeão"],
  monster:   ["Mutante",     "Colossal",  "Ancestral"],
  undead:    ["Corrompido",  "Sombrio",   "Amaldiçoado"]
};

const SUPPORT_CREATURE_IDS_BY_TYPE = {
  animal: ["rato-gigante", "lobo"],
  construct: ["soldado-mecanico", "galhada-macho", "galhada-femea"],
  spirit: ["terrier", "aquinne", "stagh"],
  humanoid: ["orc-combatente", "bandido", "gnoll-saqueador"],
  monster: ["glop", "glooop", "cocatriz"],
  undead: ["zumbi", "garra-zumbi", "carnical"]
};

function getTerrainName(node) {
  return node.environment?.terrain?.name || null;
}

function hasTerrainAffinity(creature, terrainName) {
  const affinity = TERRAIN_AFFINITIES[terrainName];

  if (!affinity) return false;
  if (affinity.ids.includes(creature.id)) return true;

  return creature.subtype && affinity.subtypes.includes(creature.subtype);
}

function getChallengeWeight(creature, targetChallenge) {
  const distance = Math.abs(creature.challengeRating - targetChallenge);

  if (distance === 0) return 18;
  if (distance <= 0.5) return 12;
  if (distance <= 1) return 7;
  if (distance <= 2) return 3;
  return 1;
}

function getCandidateWeight(creature, targetChallenge, terrainName, preferredIds = [], preferredSubtype = null) {
  let weight = getChallengeWeight(creature, targetChallenge);

  if (hasTerrainAffinity(creature, terrainName)) weight += 30;
  if (preferredIds.includes(creature.id)) weight += 18;
  if (creature.role === "minion" && targetChallenge <= 2) weight += 3;
  if (preferredSubtype !== null && creature.subtype === preferredSubtype) weight += 25;

  return weight;
}

function getCandidates(type, maximumChallenge, excludedIds = new Set(), minimumChallenge = 0) {
  const matchesCR = (creature) =>
    typeof creature.challengeRating === "number" &&
    creature.challengeRating >= minimumChallenge &&
    creature.challengeRating <= maximumChallenge &&
    !excludedIds.has(creature.id);

  if (type === null) {
    const res = creatureCatalog.filter(matchesCR);
    if (res.length > 0) return res;
    return creatureCatalog.filter(c =>
      typeof c.challengeRating === "number" &&
      c.challengeRating <= maximumChallenge &&
      !excludedIds.has(c.id)
    );
  }

  const typed = creatureCatalog.filter(c => c.type === type && matchesCR(c));
  if (typed.length > 0) return typed;

  // Fallback 1: same type, ignore minimum CR
  const typedAnyCR = creatureCatalog.filter(c =>
    c.type === type &&
    typeof c.challengeRating === "number" &&
    c.challengeRating <= maximumChallenge &&
    !excludedIds.has(c.id)
  );
  if (typedAnyCR.length > 0) return typedAnyCR;

  // Fallback 2: any type, with CR range
  const anyTypeInRange = creatureCatalog.filter(matchesCR);
  if (anyTypeInRange.length > 0) return anyTypeInRange;

  // Fallback 3: any type, any CR
  return creatureCatalog.filter(c =>
    typeof c.challengeRating === "number" &&
    c.challengeRating <= maximumChallenge &&
    !excludedIds.has(c.id)
  );
}

function pickCreatureForChallenge({ type, targetChallenge, terrainName, rng, excludedIds, preferredIds = [], preferredSubtype = null }) {
  const minimumChallenge = Math.max(0.25, targetChallenge - 2);
  const candidates = getCandidates(type, targetChallenge, excludedIds, minimumChallenge);
  const options = candidates.map((creature) => ({
    creature,
    weight: getCandidateWeight(creature, targetChallenge, terrainName, preferredIds, preferredSubtype)
  }));

  return options.length > 0 ? pickWeighted(rng, options).creature : null;
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

function getEliteCreatureSummary(generatedCreature, quantity) {
  const roleLabel = generatedCreature.roleMetadata?.label || generatedCreature.role || "Papel não definido";
  const typeLabel = CREATURE_TYPE_LABELS[generatedCreature.type] || generatedCreature.type;

  return {
    challengeLabel: formatChallengeRating(generatedCreature.challengeRating),
    challengeRating: generatedCreature.challengeRating,
    creatureId: generatedCreature.id,
    creatureData: generatedCreature,
    generated: true,
    kind: "creature",
    name: generatedCreature.name,
    quantity,
    role: generatedCreature.role || null,
    roleLabel,
    type: generatedCreature.type,
    typeLabel
  };
}

function getCreatureSummary(creature, quantity) {
  const roleLabel = creature.roleMetadata?.label || creature.role || "Papel não definido";
  const typeLabel = CREATURE_TYPE_LABELS[creature.type] || creature.type;

  return {
    challengeLabel: formatChallengeRating(creature.challengeRating),
    challengeRating: creature.challengeRating,
    creatureId: creature.id,
    kind: "creature",
    name: creature.name,
    quantity,
    role: creature.role || null,
    roleLabel,
    type: creature.type,
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

function resolveSpecificCreature(node) {
  const creature = node.creature?.creatureId ? getCreatureById(node.creature.creatureId) : null;

  return creature ? [getCreatureSummary(creature, 1)] : [];
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

// Returns what CR a single added creature must have to bring the group's T20 ND
// to exactly targetChallenge. Returns null if the math yields no valid CR.
// Note: all-sub-1 groups with targetChallenge >= 1 use bulk-add in refineEncounterGroup instead.
function getRequiredAdditionCR(items, targetChallenge) {
  const allCRs = items.flatMap(i => Array(i.quantity).fill(i.challengeRating));
  const N = allCRs.length;
  const S = allCRs.reduce((a, b) => a + b, 0);
  const allSubOne = allCRs.every(cr => cr < 1);
  const newN = N + 1;
  const newDoublings = Math.floor(Math.log2(newN));

  if (allSubOne) {
    if (targetChallenge < 1) {
      // Linear sub-1: S + x = target, x must keep total < 1
      const x = roundToQuarter(targetChallenge - S);
      return (x >= 0.25 && S + x < 1) ? x : null;
    }
    // target >= 1 with all-sub-1 group: try adding CR ≥ 1 (switches to averaging formula)
    const newAvgNeeded = targetChallenge - 2 * newDoublings;
    if (newAvgNeeded <= 0) return null;
    const xAvg = roundToQuarter(newAvgNeeded * newN - S);
    return xAvg >= 1 ? xAvg : null;
  }

  // Has CR ≥ 1: averaging formula
  // (S + x) / newN + 2*newDoublings = target → x = (target - 2*newDoublings)*newN - S
  const newAvgNeeded = targetChallenge - 2 * newDoublings;
  if (newAvgNeeded <= 0) return null;
  const x = roundToQuarter(newAvgNeeded * newN - S);
  return x >= 0.25 ? x : null;
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
function refineEncounterGroup(items, targetChallenge, type, terrainName, rng) {
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

      if (allSubOne && targetChallenge >= 1) {
        // T20 two-phase rule: ND = 1+2k requires total ∈ [2^k, 2^(k+1)).
        // Add enough of the lead creature to reach the floor of the required tier.
        const k = Math.floor((targetChallenge - 1) / 2);
        const minTotal = Math.pow(2, k);
        const deficit = minTotal - S;
        if (deficit <= 0) break; // already at this tier; can't improve (even target unreachable)
        const leadItem = current[0];
        leadItem.quantity += Math.ceil(deficit / leadItem.challengeRating);
        continue;
      }

      const neededCR = getRequiredAdditionCR(current, targetChallenge);
      // Refuse to add a creature whose CR alone would already constitute the full
      // encounter (CR ≥ targetChallenge). That produces encounters where one creature
      // dominates while companions are just filler — remove the weakest instead.
      if (neededCR !== null && neededCR < targetChallenge) {
        const leadCreature = getCreatureById(current[0].creatureId) ?? current[0].creatureData ?? null;
        // Allow picking creatures already in the group so quantity++ is possible —
        // sometimes the right fix is more of the lead creature, not a new species.
        const added = pickCreatureForChallenge({
          type,
          targetChallenge: neededCR,
          terrainName,
          rng,
          excludedIds: new Set(),
          preferredSubtype: leadCreature?.subtype ?? null,
        });

        // Use the catalog creature only if it's reasonably close to the needed CR;
        // a large gap (> 0.5) means a catalog gap — fall through to elite generation.
        const catalogFits = added && (neededCR - added.challengeRating) <= 0.5;
        if (catalogFits) {
          const existing = current.find(i => i.creatureId === added.id);
          if (existing) {
            existing.quantity++;
          } else {
            current.push(getCreatureSummary(added, 1));
          }
          continue;
        }

        // Catalog gap: generate a scaled elite variant of the lead creature.
        // Only for CR ≥ 1 targets where the base creature is genuinely weaker.
        if (leadCreature && neededCR >= 1 && neededCR > leadCreature.challengeRating + 0.5) {
          const elite = createEliteVariant(leadCreature, neededCR);
          if (elite) {
            current.push(getEliteCreatureSummary(elite, 1));
            continue;
          }
        }
      }

      // Single-creature group that needs to reach a higher ND: upgrade the creature
      // itself to targetChallenge rather than trying (and failing) to add a companion.
      if (current.length === 1) {
        const solo = getCreatureById(current[0].creatureId) ?? current[0].creatureData ?? null;
        if (solo && targetChallenge > solo.challengeRating + 0.5) {
          const elite = createEliteVariant(solo, targetChallenge);
          if (elite) {
            current[0] = getEliteCreatureSummary(elite, 1);
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

function resolveCreatureGroup(node, rng) {
  if (!node.creature || !node.challenge || node.challenge.creatures <= 0) return [];

  const specificCreatureItems = resolveSpecificCreature(node);
  if (specificCreatureItems.length > 0) return specificCreatureItems;

  const targetChallenge = node.creature.targetChallenge ?? node.challenge.creatures;
  const terrainName = getTerrainName(node);
  const type = node.creature.type;

  // Each size option produces a group whose actual combat ND equals targetChallenge
  // (per T20 doubling rule) when all creatures have CR = requiredCR.
  const sizeOptions = [
    { totalCount: 1, weight: 10 },
    { totalCount: 2, weight: 8 },
    { totalCount: 3, weight: 6 },
    { totalCount: 4, weight: 5 },
    { totalCount: 6, weight: 3 },
  ].filter(opt => getRequiredCreatureCR(targetChallenge, opt.totalCount) >= 0.25);

  const { totalCount } = pickWeighted(rng, sizeOptions);
  const requiredCR = getRequiredCreatureCR(targetChallenge, totalCount);

  const lead = pickCreatureForChallenge({ type, targetChallenge: requiredCR, terrainName, rng, excludedIds: new Set() });
  if (!lead) return [];

  let rawItems;

  if (totalCount === 1) {
    rawItems = [getCreatureSummary(lead, 1)];
  } else {
    // 75% homogeneous (all same creature), 25% mixed (lead + one support type)
    const { mixed } = pickWeighted(rng, [
      { mixed: false, weight: 15 },
      { mixed: true,  weight: 5  },
    ]);

    if (!mixed) {
      rawItems = [getCreatureSummary(lead, totalCount)];
    } else {
      // Mixed: support gets ~1/3 of slots, lead gets the rest
      const supportCount = Math.max(1, Math.floor(totalCount / 3));
      const leadCount = totalCount - supportCount;
      const { crossType } = pickWeighted(rng, [
        { crossType: false, weight: 8 },
        { crossType: true,  weight: 2 },
      ]);

      const support = pickCreatureForChallenge({
        excludedIds: new Set([lead.id]),
        preferredIds: SUPPORT_CREATURE_IDS_BY_TYPE[type] || [],
        preferredSubtype: crossType ? null : lead.subtype,
        rng,
        targetChallenge: requiredCR,
        terrainName,
        type: crossType ? null : type,
      });

      rawItems = support
        ? [getCreatureSummary(lead, leadCount), getCreatureSummary(support, supportCount)]
        : [getCreatureSummary(lead, totalCount)];
    }
  }

  return refineEncounterGroup(rawItems, targetChallenge, type, terrainName, rng);
}

function getEncounterSeed(node, mapSeed) {
  return `${mapSeed || "map"}:${node.encounterSeed || node.id}:encounter-v${ENCOUNTER_RESOLUTION_VERSION}`;
}

export function resolveNodeEncounter(node, { mapSeed } = {}) {
  if (!node || node.resolvedEncounter) return node?.resolvedEncounter || null;
  if (!node.creature && !node.trap) return null;

  const seed = getEncounterSeed(node, mapSeed);
  const rng = createRng(seed);
  const creatureItems = resolveCreatureGroup(node, rng);
  const trapItems = node.trap ? [getTrapSummary(node.trap)] : [];
  const items = [...creatureItems, ...trapItems];

  if (items.length === 0) return null;

  node.resolvedEncounter = {
    budget: {
      creatures: node.challenge?.creatures || 0,
      creaturesLabel: formatChallengeRating(node.challenge?.creatures || 0),
      total: node.challenge?.total || 0,
      totalLabel: formatChallengeRating(node.challenge?.total || 0),
      trap: node.challenge?.trap || 0,
      trapLabel: formatChallengeRating(node.challenge?.trap || 0)
    },
    items,
    seed,
    version: ENCOUNTER_RESOLUTION_VERSION
  };

  return node.resolvedEncounter;
}

