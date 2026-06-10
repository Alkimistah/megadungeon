import { formatChallengeRating } from "./challenge.js";
import { creatureCatalog, getCreatureById } from "./creatureCatalog/index.js";
import { createRng, pickWeighted } from "./random.js";

const ENCOUNTER_RESOLUTION_VERSION = 1;

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

function getCandidateWeight(creature, targetChallenge, terrainName, preferredIds = []) {
  let weight = getChallengeWeight(creature, targetChallenge);

  if (hasTerrainAffinity(creature, terrainName)) weight += 30;
  if (preferredIds.includes(creature.id)) weight += 18;
  if (creature.role === "minion" && targetChallenge <= 2) weight += 3;

  return weight;
}

function getCandidates(type, maximumChallenge, excludedIds = new Set()) {
  const typedCandidates = creatureCatalog.filter((creature) =>
    creature.type === type &&
    typeof creature.challengeRating === "number" &&
    creature.challengeRating <= maximumChallenge &&
    !excludedIds.has(creature.id)
  );

  if (typedCandidates.length > 0) return typedCandidates;

  return creatureCatalog.filter((creature) =>
    typeof creature.challengeRating === "number" &&
    creature.challengeRating <= maximumChallenge &&
    !excludedIds.has(creature.id)
  );
}

function pickCreatureForChallenge({ type, targetChallenge, terrainName, rng, excludedIds, preferredIds = [] }) {
  const candidates = getCandidates(type, targetChallenge, excludedIds);
  const options = candidates.map((creature) => ({
    creature,
    weight: getCandidateWeight(creature, targetChallenge, terrainName, preferredIds)
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

function getSupportQuantity(supportCreature, remainingChallenge) {
  if (!supportCreature?.challengeRating) return 1;

  const quantity = Math.floor((remainingChallenge + 0.001) / supportCreature.challengeRating);

  return Math.max(1, Math.min(quantity, 3));
}

function resolveCreatureGroup(node, rng) {
  if (!node.creature || !node.challenge || node.challenge.creatures <= 0) return [];

  const specificCreatureItems = resolveSpecificCreature(node);

  if (specificCreatureItems.length > 0) return specificCreatureItems;

  const targetChallenge = node.creature.targetChallenge ?? node.challenge.creatures;
  const terrainName = getTerrainName(node);
  const type = node.creature.type;
  const excludedIds = new Set();
  const lead = pickCreatureForChallenge({
    excludedIds,
    rng,
    targetChallenge,
    terrainName,
    type
  });

  if (!lead) return [];

  excludedIds.add(lead.id);

  const items = [getCreatureSummary(lead, 1)];
  let remainingChallenge = Math.round((targetChallenge - lead.challengeRating) * 4) / 4;

  while (remainingChallenge >= 0.25 && items.length < 3) {
    const support = pickCreatureForChallenge({
      excludedIds,
      preferredIds: SUPPORT_CREATURE_IDS_BY_TYPE[type] || [],
      rng,
      targetChallenge: remainingChallenge,
      terrainName,
      type
    });

    if (!support) break;

    const quantity = getSupportQuantity(support, remainingChallenge);
    items.push(getCreatureSummary(support, quantity));
    excludedIds.add(support.id);
    remainingChallenge = Math.round((remainingChallenge - support.challengeRating * quantity) * 4) / 4;
  }

  return items;
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

