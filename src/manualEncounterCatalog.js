import { formatChallengeRating } from "./challenge.js";
import { creatureCatalog } from "./creatureCatalog/index.js";
import { normalizeTag } from "./creatureCatalog/ecologyVocabulary.js";
import { CREATURE_TYPES } from "./creatures.js";
import { getThreatRole } from "./threatCreationRules.js";

function fold(value) {
  return String(value ?? "").normalize("NFD").replace(/\p{M}/gu, "").trim().toLowerCase();
}

function getTypeId(value) {
  if (value === "evento") return "event";
  return Object.keys(CREATURE_TYPES).find(id => fold(CREATURE_TYPES[id].label) === value) ?? value;
}

export function filterManualEncounterCreatures(filters = {}, catalog = creatureCatalog) {
  const query = fold(filters.query);
  const challenge = fold(filters.challenge).replace(",", ".");
  const type = getTypeId(fold(filters.type));
  const role = fold(filters.role);
  const roleId = getThreatRole(role)?.id ?? role;
  const book = fold(filters.book);
  const terrain = normalizeTag("terrains", filters.terrain);
  const place = normalizeTag("places", filters.place);
  const condition = normalizeTag("conditions", filters.condition);
  const group = normalizeTag("groups", filters.group);

  return catalog.filter(creature => {
    const { ecology, challengeRating } = creature;
    const sources = creature.sources ?? [creature.source];

    return (!query || fold(creature.name).includes(query))
      && (!type || creature.type === type)
      && (!challenge || fold(challengeRating) === challenge || fold(formatChallengeRating(challengeRating)) === challenge)
      && (!role || creature.role === roleId)
      && (!book || sources.some(source => fold(source?.book) === book))
      && (!filters.terrain || ecology?.terrains?.includes(terrain))
      && (!filters.place || ecology?.places?.includes(place))
      && (!filters.condition || ecology?.conditions?.includes(condition))
      && (!filters.group || (group && ecology?.group === group));
  });
}
