const CHALLENGE_LABELS = new Map([
  [0, "0"],
  [0.25, "1/4"],
  [0.5, "1/2"],
  [0.75, "3/4"]
]);

export function roundToQuarter(value) {
  return Math.round(value * 4) / 4;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function getRuleValue(table, key, fallback = 0) {
  return table?.[key] ?? fallback;
}

export function formatChallengeRating(value) {
  const rounded = roundToQuarter(value);
  const whole = Math.floor(rounded);
  const fraction = roundToQuarter(rounded - whole);
  const fractionLabel = CHALLENGE_LABELS.get(fraction);

  if (CHALLENGE_LABELS.has(rounded)) return CHALLENGE_LABELS.get(rounded);
  if (fraction === 0) return String(whole);

  return `${whole} ${fractionLabel}`;
}

function getFloorChallengeBand(floor, rules) {
  return rules.floorBands.find((band) => floor >= band.floors[0] && floor <= band.floors[1]) || rules.floorBands[0];
}

function getEncounterChallenge(node, floor, rules) {
  if (node.type === "boss") return rules.bossByFloor[floor] ?? rules.defaultBoss;

  const floorBand = getFloorChallengeBand(floor, rules);
  const byType = floorBand.byType[node.type] ?? floorBand.byType.normal;

  return byType ?? rules.minimum;
}

function getClimateChallenge(node, rules) {
  return node.environment.climate.reduce((total, climate) => {
    return total + getRuleValue(rules.climateWeights, climate.name);
  }, 0);
}

function getTerrainChallenge(node, rules) {
  const terrain = node.environment.terrain;
  const terrainBase = getRuleValue(rules.terrainWeights, terrain.name);
  const featureTotal = terrain.features.reduce((total, feature) => {
    return total + getRuleValue(rules.terrainFeatureWeights, feature.name);
  }, 0);

  return terrainBase + featureTotal;
}

// Calculates actual combat ND from a list of encounter items per T20 rules:
// - All CR < 1: sum linearly (4×CR¼ = ND 1)
// - Any CR ≥ 1: average CR + 2 per doubling of count (floor(log2(count)) doublings)
export function calculateCombatND(items) {
  if (!items || items.length === 0) return 0;

  const allCRs = items.flatMap(({ challengeRating, quantity }) =>
    Array(quantity).fill(challengeRating)
  );
  const count = allCRs.length;
  const total = allCRs.reduce((s, cr) => s + cr, 0);

  if (!allCRs.some(cr => cr >= 1)) {
    return roundToQuarter(total);
  }

  const avgCR = total / count;
  const doublings = Math.floor(Math.log2(count));
  return roundToQuarter(avgCR + 2 * doublings);
}

export function assignChallengeRating(node, floor, profile) {
  const rules = profile.challengeRules;
  const encounter = getEncounterChallenge(node, floor, rules);
  const climate = node.type === "boss" ? 0 : getClimateChallenge(node, rules);
  const terrain = node.type === "boss" ? 0 : getTerrainChallenge(node, rules);
  const total = node.type === "boss"
    ? encounter
    : clamp(encounter + climate + terrain, rules.minimum, rules.maximum);

  node.challenge = {
    encounter: roundToQuarter(encounter),
    climate: roundToQuarter(climate),
    terrain: roundToQuarter(terrain),
    total: roundToQuarter(total)
  };
}
