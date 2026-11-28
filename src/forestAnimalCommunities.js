import { calculateCombatND } from "./challenge.js";
import { canUseEcologyQuantity, getEcologyGroupWeight, pickEcologyWeighted } from "./encounterEcology.js";
import { randomInt } from "./random.js";
import { THREAT_CHALLENGE_ORDER } from "./threatCreationRules.js";

// Comunidades de animais da floresta: famílias que dividem um terreno e caçam juntas
// ou se toleram. Formato: { id, name, families, maxSheets (1 a 3), weight }.

const MAX_CREATURES = 12;

// Ruling do gerente (Task 1): a quantidade de fichas é sorteada favorecendo grupos
// menores e, se não fechar, as outras quantidades são tentadas da menor para a maior.
// Tentar sempre uma ficha primeiro faria as comunidades de 2 ou 3 fichas sumirem.
const SHEET_COUNT_WEIGHTS = { 1: 3, 2: 2, 3: 1 };

export function getAnimalCommunities(profile, terrainName) {
  return profile?.creatureRules?.animalCommunities?.[terrainName] ?? [];
}

export function getCommunityAnimals(catalog, community, terrainTag) {
  return catalog.filter(creature => creature.type === "animal"
    && community.families.includes(creature.ecology?.family)
    && (creature.ecology?.forestTerrains ?? creature.ecology?.terrains ?? []).includes(terrainTag));
}

// Mesmo formato de getCreatureComposition em src/encounterResolver.js, replicado aqui
// para não importar o resolvedor (ciclo de importação).
function getEntriesComposition(entries) {
  const counts = new Map();
  for (const { creature, quantity } of entries) {
    const id = creature.baseCreatureId || creature.id;
    counts.set(id, (counts.get(id) || 0) + quantity);
  }
  return JSON.stringify([...counts.entries()].sort());
}

const groupND = ratings => calculateCombatND(ratings.map(challengeRating => ({ challengeRating, quantity: 1 })));

// Opções de ficha: `source` é a criatura cuja ecologia define os tamanhos de grupo
// (a própria ficha ou, na versão melhorada, a ficha original).
function nativeOptions(catalog, community, terrainTag, target) {
  return getCommunityAnimals(catalog, community, terrainTag)
    .filter(creature => Number.isFinite(creature.challengeRating)
      && creature.challengeRating > 0 && creature.challengeRating <= target)
    .map(creature => ({ creature, source: creature }));
}

// Teto do ND de grupo (Ameaças de Arton p. 9) a partir da "massa" Φ = Σ 2^(ND/2), com
// ND abaixo de 1 contado como 1. Um grupo de q ameaças iguais vale ND + 2⌊log2 q⌋, logo
// 2^(valor/2) ≤ q·2^(ND/2); reagrupar empates não aumenta Φ. Assim a base B tem
// 2^(B/2) ≤ Φ, e cada grupo menor que soma bônus (1 abaixo +1, 2 abaixo +½, 3 abaixo +¼,
// mais um grupo extra para o grupo abaixo de ND 1) consome a própria massa. A regra não
// é monótona ao trocar um ND por outro maior, por isso o teto usa a massa, e não
// "preencher com o maior ND".
const massOf = rating => 2 ** (Math.max(rating, 1) / 2);
const LOWER_GROUPS = [[1, 1], [2, 0.5], [3, 0.25], [1, 1]];
const BONUS_SETS = Array.from({ length: 2 ** LOWER_GROUPS.length }, (_, mask) => {
  const chosen = LOWER_GROUPS.filter((_, index) => mask & (1 << index));
  return {
    share: 1 + chosen.reduce((sum, [distance]) => sum + 2 ** (-distance / 2), 0),
    bonus: chosen.reduce((sum, [, bonus]) => sum + bonus, 0)
  };
});
function maxGroupND(mass) {
  return Math.max(...BONUS_SETS.map(({ share, bonus }) => Math.floor(2 * Math.log2(mass / share) + bonus + 1e-9)));
}

// Ordem aleatória sem repetição, favorecendo os maiores pesos.
function weightedOrder(rng, options) {
  const remaining = [...options];
  const ordered = [];
  while (remaining.length) {
    const option = pickEcologyWeighted(rng, remaining);
    remaining.splice(remaining.indexOf(option), 1);
    ordered.push(option);
  }
  return ordered;
}

// Grupos com exatamente `sheets` fichas distintas que fecham o alvo, produzidos sob
// demanda. Acrescentar ameaça nunca reduz o ND, então uma quantidade acima do alvo
// encerra as maiores. Um ramo cujo teto (todas as vagas restantes com o maior ND ainda
// disponível) fica abaixo do alvo é descartado, e um estado sem saída é lembrado.
// Com `rng`, as fichas vêm embaralhadas e as quantidades seguem os tamanhos de grupo da
// ecologia (`getEcologyGroupWeight`), para o primeiro grupo achado já ser um sorteio.
// Sem `rng`, as fichas vão do maior para o menor ND (busca de existência).
function* communityGroups(options, sheets, target, { required = null, rng = null } = {}) {
  const ordered = rng
    ? shuffle(rng, [...options])
    : [...options].sort((left, right) => right.creature.challengeRating - left.creature.challengeRating);
  const strongest = ordered.map(({ creature }) => creature.challengeRating);
  for (let index = strongest.length - 2; index >= 0; index--) strongest[index] = Math.max(strongest[index], strongest[index + 1]);
  const reachable = (ratings, chosen, start) => {
    const missing = sheets - chosen;
    const slots = MAX_CREATURES - ratings.length;
    if (missing > ordered.length - start || missing > slots) return false;
    const mass = ratings.reduce((sum, rating) => sum + massOf(rating), 0) + slots * massOf(strongest[start]);
    return maxGroupND(mass) >= target;
  };
  const quantities = (creature, source, ratings) => {
    const valid = [];
    for (let quantity = 1; ratings.length + quantity <= MAX_CREATURES && canUseEcologyQuantity(source, quantity); quantity++) {
      if (groupND([...ratings, ...Array(quantity).fill(creature.challengeRating)]) > target) break;
      valid.push(quantity);
    }
    if (!rng) return valid;
    return weightedOrder(rng, valid.map(quantity => ({ quantity, weight: getEcologyGroupWeight(source, quantity) })))
      .map(({ quantity }) => quantity);
  };
  const dead = new Set();
  function* search(start, entries, ratings) {
    if (entries.length === sheets) {
      if (groupND(ratings) === target) yield entries;
      return;
    }
    const key = `${start}|${entries.length}|${[...ratings].sort((left, right) => left - right).join(",")}`;
    if (dead.has(key)) return;
    let found = false;
    for (let index = start; index < ordered.length && reachable(ratings, entries.length, index); index++) {
      const { creature, source } = ordered[index];
      for (const quantity of quantities(creature, source, ratings)) {
        const next = [...ratings, ...Array(quantity).fill(creature.challengeRating)];
        for (const group of search(index + 1, [...entries, { creature, quantity, source }], next)) {
          found = true;
          yield group;
        }
      }
    }
    if (!found) dead.add(key);
  }
  if (!required) {
    yield* search(0, [], []);
    return;
  }
  const { creature, source } = required;
  for (const quantity of quantities(creature, source, [])) {
    yield* search(0, [{ creature, quantity, source }], Array(quantity).fill(creature.challengeRating));
  }
}

function sheetCountOrder(rng, maxSheets) {
  const allowed = [1, 2, 3].filter(count => count <= maxSheets);
  const first = pickEcologyWeighted(rng, allowed.map(count => ({ count, weight: SHEET_COUNT_WEIGHTS[count] }))).count;
  return [first, ...allowed.filter(count => count !== first)];
}

// Peso 0 (ou negativo) desliga a comunidade; sem peso numérico, vale 1.
const communityWeight = community => (Number.isFinite(community.weight) ? community.weight : 1);
const activeCommunities = communities => (communities ?? []).filter(community => communityWeight(community) > 0);

function orderCommunities(rng, communities) {
  return weightedOrder(rng, activeCommunities(communities).map(community => ({ community, weight: communityWeight(community) })))
    .map(({ community }) => community);
}

function shuffle(rng, values) {
  for (let index = values.length - 1; index > 0; index--) {
    const other = randomInt(rng, 0, index);
    [values[index], values[other]] = [values[other], values[index]];
  }
  return values;
}

// Primeiro grupo da busca embaralhada que não seja a composição excluída e que o mapa
// aceite; um grupo recusado dá lugar ao seguinte.
function pickGroup(groups, accepts, excludeComposition) {
  for (const group of groups) {
    const entries = group.map(({ creature, quantity }) => ({ creature, quantity }));
    if (excludeComposition && getEntriesComposition(entries) === excludeComposition) continue;
    const count = entries.reduce((sum, { quantity }) => sum + quantity, 0);
    if (!accepts || accepts(entries, count)) return entries;
  }
  return null;
}

function upgradeRatings(creature, target) {
  return THREAT_CHALLENGE_ORDER.filter(rating => typeof rating === "number"
    && rating > creature.challengeRating && rating <= target);
}

export function composeAnimalCommunityGroup({
  catalog, target, terrainTag, communities, rng, accepts = null, upgrade = null, excludeComposition = null
}) {
  const plans = orderCommunities(rng, communities).map(community => ({
    community,
    options: nativeOptions(catalog, community, terrainTag, target),
    sheetCounts: sheetCountOrder(rng, community.maxSheets)
  }));

  for (const { community, options, sheetCounts } of plans) {
    for (const sheets of sheetCounts) {
      const entries = pickGroup(communityGroups(options, sheets, target, { rng }), accepts, excludeComposition);
      if (entries) return { communityId: community.id, entries };
    }
  }

  if (!upgrade) return null;
  for (const { community, options, sheetCounts } of plans) {
    const animals = getCommunityAnimals(catalog, community, terrainTag)
      .filter(creature => Number.isFinite(creature.challengeRating) && creature.challengeRating > 0);
    const candidates = shuffle(rng, animals.flatMap(creature => upgradeRatings(creature, target)
      .map(rating => ({ creature, rating }))));
    for (const { creature, rating } of candidates) {
      const upgraded = upgrade(creature, rating);
      if (!upgraded || !(upgraded.challengeRating <= target)) continue;
      const required = { creature: upgraded, source: creature };
      const natives = options.filter(option => option.creature.id !== creature.id);
      for (const sheets of sheetCounts) {
        const entries = pickGroup(communityGroups(natives, sheets, target, { required, rng }), accepts, excludeComposition);
        if (entries) return { communityId: community.id, entries };
      }
    }
  }
  return null;
}

// A mesma busca sem o mapa nem a composição excluída: diz se o terreno tem grupo.
export function canComposeAnimalCommunity({ catalog, target, terrainTag, communities, upgrade = null }) {
  const sheetRange = community => [1, 2, 3].filter(count => count <= community.maxSheets);
  const plans = activeCommunities(communities)
    .map(community => ({ community, options: nativeOptions(catalog, community, terrainTag, target) }));
  for (const { community, options } of plans) {
    if (sheetRange(community).some(sheets => !communityGroups(options, sheets, target).next().done)) return true;
  }
  if (!upgrade) return false;
  // Do maior ND para o menor: uma versão melhorada no próprio alvo fecha sozinha.
  for (const { community, options } of plans) {
    const animals = getCommunityAnimals(catalog, community, terrainTag)
      .filter(creature => Number.isFinite(creature.challengeRating) && creature.challengeRating > 0);
    for (const creature of animals) {
      const natives = options.filter(option => option.creature.id !== creature.id);
      for (const rating of upgradeRatings(creature, target).reverse()) {
        const upgraded = upgrade(creature, rating);
        if (!upgraded || !(upgraded.challengeRating <= target)) continue;
        const required = { creature: upgraded, source: creature };
        if (sheetRange(community).some(sheets => !communityGroups(natives, sheets, target, { required }).next().done)) return true;
      }
    }
  }
  return false;
}
