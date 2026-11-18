import { CLIMATE_NORMAL, generateTerrain } from "./environment.js";
import { pickWeighted } from "./random.js";

const RELATED_TERRAINS = {
  Floresta: ["Pântano", "Aquático", "Colinas", "Planície aberta"],
  Pântano: ["Floresta", "Aquático"],
  Aquático: ["Pântano", "Floresta"],
  Colinas: ["Floresta", "Planície aberta"],
  "Planície aberta": ["Floresta", "Colinas"]
};

const PRECIPITATION = [null, "Chuva", "Tempestade"];
const PRECIPITATION_WEIGHTS = [
  [88, 12, 0],
  [36, 57, 7],
  [0, 75, 25]
];
const TEMPERATURES = ["Frio extremo", "Frio", null, "Calor", "Calor extremo"];
const TEMPERATURE_WEIGHTS = [
  [60, 40, 0, 0, 0],
  [4, 68, 28, 0, 0],
  [0, 4, 92, 4, 0],
  [0, 0, 28, 68, 4],
  [0, 0, 0, 40, 60]
];

function pickStageIndex(rng, weights) {
  return pickWeighted(rng, weights.map((weight, value) => ({ weight, value }))).value;
}

function terrainAffinity(from, to) {
  if (from === to) return 12;
  return RELATED_TERRAINS[from]?.includes(to) ? 5 : 1;
}

function getTerrainOptions(options, predecessors) {
  if (!predecessors?.length) return options;
  return options.map(option => ({
    ...option,
    weight: option.weight * predecessors.reduce((total, terrain) =>
      total + terrainAffinity(terrain, option.value.name), 0)
  }));
}

function getLocalClimate(terrain, rules, weather, sheltered, rng) {
  const climate = [...weather];
  const wetTerrain = ["Pântano", "Aquático"].includes(terrain.name);
  const openTerrain = ["Planície aberta", "Colinas", "Aquático"].includes(terrain.name);
  // Chuva e temporal já descrevem os efeitos de vento nessas condições.
  if (!weather.some(event => PRECIPITATION.includes(event.name))) {
    if (rng() < (wetTerrain ? 0.35 : 0.17)) {
      climate.push(rules.fog);
    } else if (rng() < (openTerrain ? 0.26 : 0.15)) {
      climate.push(pickWeighted(rng, rules.windOptions).value);
    }
  }

  const exposedClimate = sheltered
    ? climate.filter(event => !rules.damagingClimateNames.includes(event.name))
    : climate;
  return exposedClimate.length ? exposedClimate : [CLIMATE_NORMAL];
}

export function assignForestEnvironments(levels, environmentRules, rng) {
  const climateRules = environmentRules.climate;
  let precipitation = pickStageIndex(rng, [82, 18, 0]);
  let temperature = pickStageIndex(rng, [0, 3, 94, 3, 0]);
  let predecessors = new Map();

  for (const row of levels) {
    const weather = [
      climateRules.precipitationOptions.find(option => option.value.name === PRECIPITATION[precipitation])?.value,
      climateRules.temperatureOptions.find(option => option.value.name === TEMPERATURES[temperature])?.value
    ].filter(Boolean);
    const nextPredecessors = new Map();

    for (const node of row) {
      const terrain = generateTerrain({
        environmentRules,
        rng,
        terrainOptions: getTerrainOptions(environmentRules.terrain.terrainOptions, predecessors.get(node)),
        featureChanceByTerrain: { "Planície aberta": 35 }
      });
      node.environment = {
        terrain,
        climate: getLocalClimate(terrain, climateRules, weather, node.type === "camp", rng)
      };
      for (const next of node.links) {
        if (!nextPredecessors.has(next)) nextPredecessors.set(next, []);
        nextPredecessors.get(next).push(terrain.name);
      }
    }

    predecessors = nextPredecessors;
    precipitation = pickStageIndex(rng, PRECIPITATION_WEIGHTS[precipitation]);
    temperature = pickStageIndex(rng, TEMPERATURE_WEIGHTS[temperature]);
  }
}
