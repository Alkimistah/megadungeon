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
    && (creature.ecology?.terrains ?? []).includes(terrainTag));
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

// Grupos com exatamente `sheets` fichas distintas que fecham o alvo. Acrescentar ameaça
// nunca reduz o ND, então uma quantidade acima do alvo encerra as maiores.
function* communityGroups(options, sheets, target, required = null) {
  function* search(start, entries, ratings) {
    if (entries.length === sheets) {
      if (groupND(ratings) === target) yield entries;
      return;
    }
    for (let index = start; index < options.length; index++) {
      const { creature, source } = options[index];
      for (let quantity = 1; ratings.length + quantity <= MAX_CREATURES && canUseEcologyQuantity(source, quantity); quantity++) {
        const next = [...ratings, ...Array(quantity).fill(creature.challengeRating)];
        if (groupND(next) > target) break;
        yield* search(index + 1, [...entries, { creature, quantity, source }], next);
      }
    }
  }
  if (!required) {
    yield* search(0, [], []);
    return;
  }
  const { creature, source } = required;
  for (let quantity = 1; quantity <= MAX_CREATURES && canUseEcologyQuantity(source, quantity); quantity++) {
    const ratings = Array(quantity).fill(creature.challengeRating);
    if (groupND(ratings) > target) break;
    yield* search(0, [{ creature, quantity, source }], ratings);
  }
}

function sheetCountOrder(rng, maxSheets) {
  const allowed = [1, 2, 3].filter(count => count <= maxSheets);
  const first = pickEcologyWeighted(rng, allowed.map(count => ({ count, weight: SHEET_COUNT_WEIGHTS[count] }))).count;
  return [first, ...allowed.filter(count => count !== first)];
}

function orderCommunities(rng, communities) {
  const remaining = communities.map(community => ({ community, weight: community.weight > 0 ? community.weight : 1 }));
  const ordered = [];
  while (remaining.length) {
    const option = pickEcologyWeighted(rng, remaining);
    remaining.splice(remaining.indexOf(option), 1);
    ordered.push(option.community);
  }
  return ordered;
}

function shuffle(rng, values) {
  for (let index = values.length - 1; index > 0; index--) {
    const other = randomInt(rng, 0, index);
    [values[index], values[other]] = [values[other], values[index]];
  }
  return values;
}

// Sorteia entre os grupos válidos pelos tamanhos de grupo da ecologia; um grupo recusado
// pelo mapa sai do sorteio.
function pickGroup(rng, groups, accepts, excludeComposition) {
  const options = groups
    .filter(entries => !excludeComposition || getEntriesComposition(entries) !== excludeComposition)
    .map(entries => ({
      entries,
      weight: entries.reduce((weight, { source, quantity }) => weight * getEcologyGroupWeight(source, quantity), 1)
    }));
  while (options.length) {
    const option = pickEcologyWeighted(rng, options);
    const entries = option.entries.map(({ creature, quantity }) => ({ creature, quantity }));
    const count = entries.reduce((sum, { quantity }) => sum + quantity, 0);
    if (!accepts || accepts(entries, count)) return entries;
    options.splice(options.indexOf(option), 1);
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
  const plans = orderCommunities(rng, communities ?? []).map(community => ({
    community,
    options: nativeOptions(catalog, community, terrainTag, target),
    sheetCounts: sheetCountOrder(rng, community.maxSheets)
  }));

  for (const { community, options, sheetCounts } of plans) {
    for (const sheets of sheetCounts) {
      const entries = pickGroup(rng, [...communityGroups(options, sheets, target)], accepts, excludeComposition);
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
        const entries = pickGroup(rng, [...communityGroups(natives, sheets, target, required)], accepts, excludeComposition);
        if (entries) return { communityId: community.id, entries };
      }
    }
  }
  return null;
}

// A mesma busca sem o mapa nem a composição excluída: diz se o terreno tem grupo.
export function canComposeAnimalCommunity({ catalog, target, terrainTag, communities, upgrade = null }) {
  const sheetRange = community => [1, 2, 3].filter(count => count <= community.maxSheets);
  for (const community of communities ?? []) {
    const options = nativeOptions(catalog, community, terrainTag, target);
    if (sheetRange(community).some(sheets => !communityGroups(options, sheets, target).next().done)) return true;
  }
  if (!upgrade) return false;
  for (const community of communities ?? []) {
    const animals = getCommunityAnimals(catalog, community, terrainTag)
      .filter(creature => Number.isFinite(creature.challengeRating) && creature.challengeRating > 0);
    for (const creature of animals) {
      for (const rating of upgradeRatings(creature, target)) {
        const upgraded = upgrade(creature, rating);
        if (!upgraded || !(upgraded.challengeRating <= target)) continue;
        const natives = nativeOptions(catalog, community, terrainTag, target)
          .filter(option => option.creature.id !== creature.id);
        const required = { creature: upgraded, source: creature };
        if (sheetRange(community).some(sheets => !communityGroups(natives, sheets, target, required).next().done)) return true;
      }
    }
  }
  return false;
}
