import { animalCreatures } from "./animals.js";
import { constructCreatures } from "./constructs.js";
import { humanoidCreatures } from "./humanoids.js";
import { monsterCreatures } from "./monsters.js";
import { spiritCreatures } from "./spirits.js";
import { undeadCreatures } from "./undead.js";
import { sourceByCreatureId } from "./sources.js";
import { inferThreatRole, getThreatRole } from "../threatCreationRules.js";
export { animalCreatures } from "./animals.js";
export { constructCreatures } from "./constructs.js";
export { humanoidCreatures } from "./humanoids.js";
export { monsterCreatures } from "./monsters.js";
export { spiritCreatures } from "./spirits.js";
export { undeadCreatures } from "./undead.js";
export { sourceByCreatureId } from "./sources.js";

const creaturesByTypeRaw = {
  animal: animalCreatures,
  construct: constructCreatures,
  spirit: spiritCreatures,
  humanoid: humanoidCreatures,
  monster: monsterCreatures,
  undead: undeadCreatures
};

function uniqueSources(sources) {
  const seen = new Set();

  return sources.filter((source) => {
    if (!source) return false;

    const key = `${source.book}|${source.pdfFile || ""}|${source.pdfPage || ""}|${source.bookPage || ""}`;
    if (seen.has(key)) return false;

    seen.add(key);
    return true;
  });
}

function withCreatureSources(creature) {
  const sources = uniqueSources([
    creature.source,
    sourceByCreatureId[creature.id]
  ]);

  if (sources.length === 0) return creature;

  return {
    ...creature,
    source: creature.source || sources[0],
    sources
  };
}

function dedupeById(creatures) {
  const seen = new Set();

  return creatures.filter((creature) => {
    if (seen.has(creature.id)) return false;

    seen.add(creature.id);
    return true;
  });
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
  Object.entries(creaturesByTypeRaw).map(([type, creatures]) => [
    type,
    dedupeById(creatures).map(withCreatureSources).map(withThreatRoleMetadata)
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
