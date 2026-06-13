import { formatChallengeRating, roundToQuarter } from "./challenge.js";
import { creatureCatalog, getCreatureById } from "./creatureCatalog/index.js";
import { createRng, pickWeighted } from "./random.js";

const ENCOUNTER_RESOLUTION_VERSION = 2;

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

function getCandidates(type, maximumChallenge, excludedIds = new Set()) {
  const baseCandidates = creatureCatalog.filter((creature) =>
    typeof creature.challengeRating === "number" &&
    creature.challengeRating <= maximumChallenge &&
    !excludedIds.has(creature.id)
  );

  if (type === null) return baseCandidates;

  const typedCandidates = baseCandidates.filter((creature) => creature.type === type);
  return typedCandidates.length > 0 ? typedCandidates : baseCandidates;
}

function pickCreatureForChallenge({ type, targetChallenge, terrainName, rng, excludedIds, preferredIds = [], preferredSubtype = null }) {
  const candidates = getCandidates(type, targetChallenge, excludedIds);
  const options = candidates.map((creature) => ({
    creature,
    weight: getCandidateWeight(creature, targetChallenge, terrainName, preferredIds, preferredSubtype)
  }));

  return options.length > 0 ? pickWeighted(rng, options).creature : null;
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
// or target/count for sub-1 targets.
function getRequiredCreatureCR(targetChallenge, totalCount) {
  if (totalCount <= 1) return targetChallenge;

  if (targetChallenge < 1) {
    return roundToQuarter(targetChallenge / totalCount);
  }

  const doublings = Math.floor(Math.log2(totalCount));
  return Math.max(0.25, roundToQuarter(targetChallenge - 2 * doublings));
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
  if (totalCount === 1) return [getCreatureSummary(lead, 1)];

  // 75% homogeneous (all same creature), 25% mixed (lead + one support type)
  const { mixed } = pickWeighted(rng, [
    { mixed: false, weight: 15 },
    { mixed: true,  weight: 5  },
  ]);

  if (!mixed) {
    return [getCreatureSummary(lead, totalCount)];
  }

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

  if (!support) return [getCreatureSummary(lead, totalCount)];

  return [
    getCreatureSummary(lead, leadCount),
    getCreatureSummary(support, supportCount),
  ];
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

