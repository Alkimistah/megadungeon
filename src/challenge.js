const CHALLENGE_LABELS = new Map([
  [0, "0"],
  [0.25, "1/4"],
  [0.5, "1/2"],
  [0.75, "3/4"]
]);

const SPECIAL_CHALLENGE_RATINGS = new Set(["S", "S+"]);
// ND impressos sem valor: consulta pela escolha exata de ficha, fora do sorteio.
const UNRATED_CHALLENGE_RATINGS = new Set(["–", "?"]);

export function isSpecialChallengeRating(value) {
  return SPECIAL_CHALLENGE_RATINGS.has(value) || UNRATED_CHALLENGE_RATINGS.has(value);
}

export function getChallengeRatingForStatistics(value) {
  if (UNRATED_CHALLENGE_RATINGS.has(value)) return null;
  return SPECIAL_CHALLENGE_RATINGS.has(value) ? 20 : value;
}

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
  if (typeof value !== "number") return String(value ?? "0");

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

// ND de ameaças abaixo de 1 (regra em duas fases, decisão do PO no commit 2accaf5):
// soma os ND; abaixo de 1 vale a soma, a partir de 1 vale 1 + 2 por dobra do total.
// 4×ND¼ = ND 1, 8×ND¼ = ND 3; 2×ND½ = ND 1, 4×ND½ = ND 3.
function calculateSubOneND(total) {
  if (total < 1) return roundToQuarter(total);
  return roundToQuarter(1 + 2 * Math.floor(Math.log2(total)));
}

// Ameaças de ND igual (Ameaças de Arton p. 9): +2 a cada vez que a quantidade dobra.
function calculateEqualGroupND(challengeRating, quantity) {
  return challengeRating + 2 * Math.floor(Math.log2(quantity));
}

// Agrupa ND iguais e recalcula até não haver empate (Ameaças de Arton p. 9).
function mergeTiedGroups(groupNDs) {
  let groups = groupNDs;
  for (;;) {
    const counts = new Map();
    for (const value of groups) counts.set(value, (counts.get(value) ?? 0) + 1);
    if (counts.size === groups.length) return groups;
    groups = [...counts].map(([value, quantity]) => calculateEqualGroupND(value, quantity));
  }
}

// Acréscimo de cada grupo menor pela distância até a base (Ameaças de Arton p. 9):
// até 1 abaixo +1, 2 abaixo +½, 3 abaixo +¼, 4 ou mais abaixo nada.
function getLowerGroupBonus(difference) {
  if (difference <= 1) return 1;
  if (difference <= 2) return 0.5;
  if (difference <= 3) return 0.25;
  return 0;
}

// ND de combate de um encontro pela regra do livro (Ameaças de Arton p. 9).
export function calculateCombatND(items) {
  if (!items || items.length === 0) return 0;

  const allCRs = items.flatMap(({ challengeRating, quantity }) =>
    Array(quantity).fill(challengeRating)
  );
  const count = allCRs.length;
  if (count === 0) return 0;
  const specials = allCRs.filter(isSpecialChallengeRating);
  if (specials.length) {
    // Sem regra de soma para ND especial: sem ND domina, depois o maior entre S+ e S.
    const unrated = specials.filter(cr => UNRATED_CHALLENGE_RATINGS.has(cr));
    if (unrated.length) return unrated.length === count && unrated.every(cr => cr === "–") ? "–" : "?";
    return specials.includes("S+") ? "S+" : "S";
  }

  // Todas as ameaças abaixo de ND 1 formam um único grupo.
  const subOneCRs = allCRs.filter(cr => cr < 1);
  const subOneND = subOneCRs.length ? calculateSubOneND(subOneCRs.reduce((s, cr) => s + cr, 0)) : null;
  if (subOneCRs.length === count) return subOneND;

  // Passo 1: um grupo por ND (1 ou mais), com +2 por dobra da quantidade.
  const quantities = new Map();
  for (const cr of allCRs) if (cr >= 1) quantities.set(cr, (quantities.get(cr) ?? 0) + 1);
  const groupNDs = [...quantities].map(([cr, quantity]) => calculateEqualGroupND(cr, quantity));
  if (subOneND !== null) groupNDs.push(subOneND);

  // Passo 2: reagrupa empates; o maior ND é a base e os outros somam pela distância.
  const groups = mergeTiedGroups(groupNDs).sort((a, b) => b - a);
  const [base, ...others] = groups;
  const total = others.reduce((sum, value) => sum + getLowerGroupBonus(base - value), base);

  // Aqui a base é sempre 1 ou mais: o resultado é arredondado para baixo.
  return Math.floor(total);
}

function getForestEnvironmentChallenge(challenge) {
  return roundToQuarter((challenge.climate ?? 0) + (challenge.terrain ?? 0));
}

export function getForestChallengeParts(node) {
  if (node.generationVersion !== 5 || !node.challenge) return null;

  const { challenge } = node;
  const items = node.resolvedEncounter?.items;
  const environment = challenge.environment ?? getForestEnvironmentChallenge(challenge);
  const creatures = items
    ? calculateCombatND(items.filter(item => item.kind === "creature"))
    : challenge.creatures ?? 0;
  const trap = items
    ? roundToQuarter(items
      .filter(item => item.kind === "trap")
      .reduce((total, item) => total + item.challengeRating * (item.quantity ?? 1), 0))
    : node.trap?.challengeRating ?? challenge.trap ?? 0;

  if (node.scene?.nd != null && creatures === 0 && trap === 0) return null;
  return { environment, creatures, trap };
}

export function updateForestChallengeTotal(node, rules) {
  if (node.generationVersion !== 5 || !node.challenge) return;

  const { challenge } = node;
  challenge.environment = getForestEnvironmentChallenge(challenge);
  if (node.scene?.nd != null) return;

  const creatures = challenge.creatures ?? 0;
  const trap = node.trap?.challengeRating ?? challenge.trap ?? 0;
  const special = [creatures, trap].find(isSpecialChallengeRating);
  challenge.total = special ?? roundToQuarter(clamp(
    challenge.environment + creatures + trap, rules.minimum, rules.maximum
  ));
}

export function assignChallengeRating(node, floor, profile) {
  const rules = profile.challengeRules;
  const encounter = node.scene?.nd ?? getEncounterChallenge(node, floor, rules);
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
