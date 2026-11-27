import { calculateCombatND } from "./challenge.js";
import { canUseEcologyQuantity, getCreatureEcologyWeight, getEcologyGroupWeight, pickEcologyWeighted } from "./encounterEcology.js";
import { pick, randomInt } from "./random.js";

function shuffleCounts(rng, values) {
  for (let index = values.length - 1; index > 0; index--) {
    const other = randomInt(rng, 0, index);
    [values[index], values[other]] = [values[other], values[index]];
  }
  return values;
}

// O ND de grupo do livro depende de quais ND foram escolhidos, não da soma:
// a memória usa o multiconjunto ordenado. Acrescentar ameaça nunca reduz o ND,
// então um prefixo acima do alvo é descartado sem testar os complementos.
export function selectRatings(buckets, count, target, rng) {
  const ratings = [...buckets.keys()].sort((left, right) => left - right);
  const viable = new Map();
  const groupND = multiset => calculateCombatND(multiset.map(challengeRating => ({ challengeRating, quantity: 1 })));
  const withRating = (multiset, rating) => {
    const index = multiset.findIndex(value => value > rating);
    return index === -1 ? [...multiset, rating] : [...multiset.slice(0, index), rating, ...multiset.slice(index)];
  };
  const canComplete = multiset => {
    const key = multiset.join(",");
    if (viable.has(key)) return viable.get(key);
    const challenge = groupND(multiset);
    const result = multiset.length === count
      ? challenge === target
      : challenge <= target && ratings.some(rating => canComplete(withRating(multiset, rating)));
    viable.set(key, result);
    return result;
  };
  const chosen = [];
  let multiset = [];
  while (chosen.length < count) {
    const options = ratings.filter(rating => canComplete(withRating(multiset, rating)));
    if (options.length === 0) return null;
    const rating = pick(rng, options);
    chosen.push(rating);
    multiset = withRating(multiset, rating);
  }
  return chosen;
}

function forestPool(catalog, type, rng) {
  const roll = rng();
  if (roll >= 0.9) return catalog;
  const types = [...new Set(catalog.map(creature => creature.type))];
  const preferred = types.includes(type) ? type : pick(rng, types);
  if (roll < 0.65) return catalog.filter(creature => creature.type === preferred);
  const otherTypes = types.filter(candidate => candidate !== "humanoid");
  const companion = preferred === "humanoid" ? pick(rng, otherTypes) : preferred;
  return catalog.filter(creature => creature.type === "humanoid" || creature.type === companion);
}

function selectCreatures(ratings, buckets, type, ecology, rng, humanoidFirst) {
  const group = new Map();
  for (const rating of ratings) {
    const candidates = buckets.get(rating).filter(creature => !ecology || canUseEcologyQuantity(
      creature, (group.get(creature.id)?.quantity ?? 0) + 1
    ));
    if (!candidates.length) return null;
    const leader = group.values().next().value?.creature;
    const { creature } = pickEcologyWeighted(rng, candidates.map(creature => {
      const quantity = (group.get(creature.id)?.quantity ?? 0) + 1;
      const ecologyWeight = ecology
        ? getCreatureEcologyWeight(creature, ecology.context, ecology.rules, type, leader?.subtype ?? null)
          * getEcologyGroupWeight(creature, quantity)
        : 1;
      const typeWeight = !ecology && (creature.type === (leader?.type ?? type)) ? 2 : 1;
      const roleWeight = leader?.role && creature.role && leader.role !== creature.role ? 1.25 : 1;
      return { creature, weight: ecologyWeight * typeWeight * roleWeight * (quantity === 1 ? 1.5 : 1) };
    }));
    group.set(creature.id, { creature, quantity: (group.get(creature.id)?.quantity ?? 0) + 1 });
  }
  const entries = [...group.values()];
  if (humanoidFirst) entries.sort((left, right) => Number(right.creature.type === "humanoid") - Number(left.creature.type === "humanoid"));
  return entries;
}

export function pickEncounterGroupComposition({ catalog, target, type, ecology, profileId, rng, accepts }) {
  const eligible = catalog.filter(creature => Number.isFinite(creature.challengeRating)
    && creature.challengeRating > 0 && creature.challengeRating < target);
  if (!eligible.length) return null;
  const forest = profileId === "forest-11-20";
  const pool = forest ? forestPool(eligible, type, rng) : eligible;
  const buckets = new Map();
  for (const creature of pool) {
    const rating = creature.challengeRating;
    if (!buckets.has(rating)) buckets.set(rating, []);
    buckets.get(rating).push(creature);
  }
  const counts = shuffleCounts(rng, [2, 3, 4, 5, 6]);
  if (accepts && rng() < 0.25) counts.unshift(...shuffleCounts(rng, [7, 8, 9, 10, 11, 12]));
  for (const count of counts) {
    const ratings = selectRatings(buckets, count, target, rng);
    if (!ratings) continue;
    const entries = selectCreatures(ratings, buckets, type, ecology, rng, forest);
    if (entries && (count <= 6 || accepts(entries, count))) return entries;
  }
  return null;
}
