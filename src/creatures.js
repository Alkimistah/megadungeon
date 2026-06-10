import { formatChallengeRating } from "./challenge.js";
import { getCreatureById } from "./creatureCatalog/index.js";
import { pickWeighted } from "./random.js";

export const CREATURE_TYPES = {
  animal: {
    id: "animal",
    label: "Animal",
    description: "Bestas e feras irracionais sem poderes mágicos."
  },
  construct: {
    id: "construct",
    label: "Construto",
    description: "Objetos animados ou criaturas artificiais."
  },
  spirit: {
    id: "spirit",
    label: "Espírito",
    description: "Seres nativos de outros planos."
  },
  humanoid: {
    id: "humanoid",
    label: "Humanoide",
    description: "Seres racionais parecidos com humanos, normalmente com cultura própria."
  },
  monster: {
    id: "monster",
    label: "Monstro",
    description: "Criaturas de anatomia estranha ou com habilidades fantásticas."
  },
  undead: {
    id: "undead",
    label: "Morto-vivo",
    description: "Cadáveres animados por energia negativa."
  }
};

const DEFAULT_CREATURE_TYPE_WEIGHTS = [
  { type: "animal", weight: 20 },
  { type: "construct", weight: 10 },
  { type: "spirit", weight: 10 },
  { type: "humanoid", weight: 20 },
  { type: "monster", weight: 30 },
  { type: "undead", weight: 10 }
];

const NON_CREATURE_ROOM_TYPES = new Set(["camp", "trap", "treasure"]);
const NON_CREATURE_UNKNOWN_LABELS = new Set(["Acampamento", "Armadilha", "Tesouro"]);

function hasCreatureProfile(node) {
  if (NON_CREATURE_ROOM_TYPES.has(node.type)) return false;
  if (node.type === "unknown" && NON_CREATURE_UNKNOWN_LABELS.has(node.revealedLabel)) return false;
  if (node.challenge?.creatures === 0) return false;

  return true;
}

function getCreatureRules(profile) {
  return profile.creatureRules || {};
}

function getWeightedCreatureTypes(node, rules) {
  const terrainName = node.environment?.terrain?.name;

  return rules.typeWeightsByTerrain?.[terrainName] ||
    rules.defaultTypeWeights ||
    DEFAULT_CREATURE_TYPE_WEIGHTS;
}

function getSpecificCreature(node, rules) {
  if (node.type === "boss" && rules.bossCreatureId) {
    return getCreatureById(rules.bossCreatureId);
  }

  return null;
}

function getChallengeSource(node, rules) {
  const source = rules.challengeSource || "creatures";

  if (source === "total") return node.challenge.total;
  if (source === "encounter") return node.challenge.encounter;

  return node.challenge.creatures ?? node.challenge.encounter;
}

function getGroupGuidance(node, rules) {
  const partySize = rules.defaultPartySize || 4;

  return rules.groupGuidance || [
    `ND considera um grupo padrão de ${partySize} personagens.`,
    "Use uma criatura com este ND como encontro justo.",
    "Para grupos maiores, menores, veteranos, desgastados ou em circunstâncias favoráveis, ajuste o ND do encontro em 1 ou 2 pontos conforme a situação."
  ];
}

export function assignCreatureProfile(node, profile, rng) {
  if (!hasCreatureProfile(node)) {
    node.creature = null;
    return;
  }

  const rules = getCreatureRules(profile);
  const specificCreature = getSpecificCreature(node, rules);
  const typeOption = specificCreature ? { type: specificCreature.type } : pickWeighted(rng, getWeightedCreatureTypes(node, rules));
  const type = CREATURE_TYPES[typeOption.type] || CREATURE_TYPES.monster;
  const targetChallenge = specificCreature?.challengeRating ?? getChallengeSource(node, rules);

  node.creature = {
    type: type.id,
    typeLabel: type.label,
    typeDescription: type.description,
    creatureId: specificCreature?.id || null,
    creatureName: specificCreature?.name || null,
    creatureRole: specificCreature?.role || null,
    creatureRoleLabel: specificCreature?.roleMetadata?.label || null,
    targetChallenge,
    targetChallengeLabel: formatChallengeRating(targetChallenge),
    challengeSource: specificCreature ? "specific" : rules.challengeSource || "creatures",
    defaultPartySize: rules.defaultPartySize || 4,
    groupGuidance: getGroupGuidance(node, rules)
  };
}

