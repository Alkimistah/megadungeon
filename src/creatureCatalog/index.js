import { animalCreatures } from "./animals.js";
import { constructCreatures } from "./constructs.js";
import { humanoidCreatures } from "./humanoids.js";
import { monsterCreatures } from "./monsters.js";
import { spiritCreatures } from "./spirits.js";
import { undeadCreatures } from "./undead.js";
import { eventCreatures } from "./events.js";
import { basicBookRoleByCreatureId, sourceByCreatureId, threatsBookRoleByCreatureId } from "./sources.js";
import { ecologyByCreatureId } from "./ecology.js";
import { NEUTRAL_ECOLOGY, validateEcology } from "./ecologyVocabulary.js";
import { inferThreatRole, getThreatRole } from "../threatCreationRules.js";
export { animalCreatures } from "./animals.js";
export { constructCreatures } from "./constructs.js";
export { humanoidCreatures } from "./humanoids.js";
export { monsterCreatures } from "./monsters.js";
export { spiritCreatures } from "./spirits.js";
export { undeadCreatures } from "./undead.js";
export { eventCreatures } from "./events.js";
export { sourceByCreatureId } from "./sources.js";

const creaturesByTypeRaw = {
  animal: animalCreatures,
  construct: constructCreatures,
  spirit: spiritCreatures,
  humanoid: humanoidCreatures,
  monster: monsterCreatures,
  undead: undeadCreatures,
  event: eventCreatures
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
  const catalogSource = sourceByCreatureId[creature.id];
  const inlineSource = creature.source;
  const replacesInline = catalogSource?.edition && catalogSource.book === inlineSource?.book;
  const sources = uniqueSources([
    replacesInline ? catalogSource : inlineSource,
    catalogSource
  ]);

  if (sources.length === 0) return creature;

  return {
    ...creature,
    source: sources[0],
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

const printedRolesByBook = {
  "Livro Básico": basicBookRoleByCreatureId,
  "Ameaças de Arton": threatsBookRoleByCreatureId
};

function withThreatRoleMetadata(creature) {
  const printedRole = printedRolesByBook[creature.source?.book]?.[creature.id];
  const inference = inferThreatRole(printedRole ? { ...creature, role: printedRole, roleSource: "pdf-review" } : creature);
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

for (const [id, entry] of Object.entries(ecologyByCreatureId)) {
  const errors = validateEcology(entry);
  if (errors.length) throw new Error(`Ecologia inválida para ${id}: ${errors.join("; ")}`);
}

export function getCreatureEcology(id) {
  return Object.hasOwn(ecologyByCreatureId, id) ? ecologyByCreatureId[id] : NEUTRAL_ECOLOGY;
}

function withEcology(creature) {
  return { ...creature, ecology: getCreatureEcology(creature.id) };
}

export const creaturesByType = Object.fromEntries(
  Object.entries(creaturesByTypeRaw).map(([type, creatures]) => [
    type,
    dedupeById(creatures).map(withCreatureSources).map(withThreatRoleMetadata).map(withEcology)
  ])
);

export const creatureCatalog = Object.values(creaturesByType).flat();

const variantsByFamily = new Map();
for (const creature of creatureCatalog) {
  if (!creature.variantOf) continue;
  if (!variantsByFamily.has(creature.variantOf)) variantsByFamily.set(creature.variantOf, new Set([creature.variantOf]));
  variantsByFamily.get(creature.variantOf).add(creature.id);
}

function isLegacyAutomaticCreature(creature, profile) {
  const family = creature.variantOf || creature.id;
  const variants = variantsByFamily.get(family);
  if (!variants) return true;
  const preferred = profile?.creatureRules?.preferredCreatureIdsByFamily?.[family];
  return creature.id === (variants.has(preferred) ? preferred : family);
}

const creaturesById = new Map(creatureCatalog.map(creature => [creature.id, creature]));

function isEcologyEligible(creature, disabledBooks) {
  if (!creature || creature.type === "event" || !Number.isFinite(creature.challengeRating)
      || creature.challengeRating <= 0 || creature.ecology?.manualOnly) return false;

  const sources = creature.sources ?? [creature.source];
  return sources.some(source => !disabledBooks.has(source?.book));
}

function getEcologicalFamilyRepresentative(family, variants, profile, disabledBooks) {
  const preferred = profile.creatureRules.preferredCreatureIdsByFamily?.[family];
  const ids = variants.has(preferred) ? [preferred, ...variants] : variants;
  for (const id of ids) {
    const creature = creaturesById.get(id);
    if (isEcologyEligible(creature, disabledBooks)) return creature;
  }
  return null;
}

function isEcologicalAutomaticCreature(creature, profile, disabledBooks) {
  if (!isEcologyEligible(creature, disabledBooks)) return false;
  const family = creature.variantOf || creature.id;
  const variants = variantsByFamily.get(family);
  return !variants || getEcologicalFamilyRepresentative(family, variants, profile, disabledBooks)?.id === creature.id;
}

export function isAutomaticCreature(creature, profile) {
  if (!profile?.creatureRules?.ecology) return isLegacyAutomaticCreature(creature, profile);

  return isEcologicalAutomaticCreature(creature, profile, new Set(profile.disabledCreatureBooks));
}

export function getAutomaticCreatureCatalog(profile) {
  if (!profile?.creatureRules?.ecology) return creatureCatalog.filter(creature => isLegacyAutomaticCreature(creature, profile));

  const disabledBooks = new Set(profile.disabledCreatureBooks);
  return creatureCatalog.filter(creature => isEcologicalAutomaticCreature(creature, profile, disabledBooks));
}

export function formatCreatureCatalogName(creature, name = creature?.name) {
  const family = creature?.variantOf || creature?.id;
  return variantsByFamily.has(family) && creature.source?.book ? `${name} · ${creature.source.book}` : name;
}

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
