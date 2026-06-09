import { animalCreatures } from "./animals.js";
import { constructCreatures } from "./constructs.js";
import { humanoidCreatures } from "./humanoids.js";
import { monsterCreatures } from "./monsters.js";
import { spiritCreatures } from "./spirits.js";
import { undeadCreatures } from "./undead.js";
import { inferThreatRole, getThreatRole } from "../threatCreationRules.js";
import { bookBasicCreaturesByType, livroBasicoSourceByCreatureId } from "./bookBasic/index.js";

export { animalCreatures } from "./animals.js";
export { constructCreatures } from "./constructs.js";
export { humanoidCreatures } from "./humanoids.js";
export { monsterCreatures } from "./monsters.js";
export { spiritCreatures } from "./spirits.js";
export { undeadCreatures } from "./undead.js";
export { bookBasicCreatureCatalog, bookBasicCreaturesByType, livroBasicoSourceByCreatureId } from "./bookBasic/index.js";

const manualCreaturesByType = {
  animal: animalCreatures,
  construct: constructCreatures,
  spirit: spiritCreatures,
  humanoid: humanoidCreatures,
  monster: monsterCreatures,
  undead: undeadCreatures
};

function withLivroBasicoSource(creature) {
  const source = livroBasicoSourceByCreatureId[creature.id];

  if (!source || creature.source) return creature;

  return { ...creature, source };
}

function withThreatRoleMetadata(creature) {
  const inference = inferThreatRole(creature);
  const roleMetadata = inference.role ? getThreatRole(inference.role) : null;

  return {
    ...creature,
    role: inference.role,
    roleConfidence: inference.confidence,
    roleInferenceReason: inference.reason,
    roleMetadata,
    roleSource: inference.source
  };
}

export const creaturesByType = Object.fromEntries(
  Object.entries(manualCreaturesByType).map(([type, creatures]) => [
    type,
    [
      ...creatures,
      ...(bookBasicCreaturesByType[type] || [])
    ].map(withLivroBasicoSource).map(withThreatRoleMetadata)
  ])
);

export const creatureCatalog = Object.values(creaturesByType).flat();

export function getCreatureById(id) {
  return creatureCatalog.find((creature) => creature.id === id) || null;
}

export function getCreaturesByType(type) {
  return creaturesByType[type] || [];
}

export function getCreaturesByChallengeRating(challengeRating) {
  return creatureCatalog.filter((creature) => creature.challengeRating === challengeRating);
}

export function getCreaturesByRole(role) {
  const roleMetadata = getThreatRole(role);

  if (!roleMetadata) return [];

  return creatureCatalog.filter((creature) => creature.role === roleMetadata.id);
}
