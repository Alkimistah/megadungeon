const RARITY_WEIGHTS = { comum: 1, incomum: 0.65, rara: 0.25 };
const GROUP_SIZES = {
  solitaria: [1],
  enxame: [1],
  dupla: [2],
  bando: [3, 4],
  horda: [4, 5, 6]
};

export function getEncounterEcologyContext(node, rules = {}) {
  const { terrain, climate = [] } = node.environment ?? {};
  const { defaults = {}, terrainTagsByName = {}, conditionTagsByName = {} } = rules;
  const override = node.ecologyContext ?? {};
  const terrainTags = terrainTagsByName[terrain?.name];
  const conditionTags = climate.flatMap(({ name }) => conditionTagsByName[name] ?? []);

  return {
    terrains: override.terrains ?? terrainTags ?? defaults.terrains ?? [],
    places: override.places ?? defaults.places ?? [],
    conditions: override.conditions ?? [...new Set([...(defaults.conditions ?? []), ...conditionTags])]
  };
}

function getTagWeight(tags, activeTags, matchWeight) {
  if (!tags?.length || !activeTags.length) return 1;
  return tags.some(tag => activeTags.includes(tag)) ? matchWeight : 0.75;
}

function getPreferenceWeight(weights, key) {
  const weight = Object.hasOwn(weights ?? {}, key) ? weights[key] : 1;
  return Number.isFinite(weight) && weight > 0 ? weight : 1;
}

export function getCreatureEcologyWeight(creature, context, rules = {}, preferredType = null, preferredSubtype = null) {
  const { terrains, places, conditions, rarity } = creature.ecology ?? {};
  return getTagWeight(terrains, context.terrains, 3)
    * getTagWeight(places, context.places, 2)
    * getTagWeight(conditions, context.conditions, 2)
    * (RARITY_WEIGHTS[rarity] ?? 1)
    * getPreferenceWeight(rules.typeWeights, creature.type)
    * getPreferenceWeight(rules.subtypeWeights, creature.subtype)
    * (preferredType !== null && creature.type === preferredType ? 2 : 1)
    * (preferredSubtype !== null && creature.subtype === preferredSubtype ? 2 : 1);
}

export function getEcologyGroupWeight(creature, quantity) {
  const groupSizes = GROUP_SIZES[creature.ecology?.group];
  return groupSizes?.includes(quantity) ? 4 : 1;
}

export function canUseEcologyQuantity(creature, quantity) {
  return creature?.ecology?.group !== "enxame" || quantity === 1;
}

export function pickEcologyWeighted(rng, options) {
  const totalWeight = options.reduce((sum, option) => sum + option.weight, 0);
  let roll = rng() * totalWeight;

  for (const option of options) {
    roll -= option.weight;
    if (roll < 0) return option;
  }

  return options.at(-1);
}
