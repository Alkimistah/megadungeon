export const CREATURE_REINFORCEMENT_BONUSES = { initiative: 2, attack: 1 };

export function getCreatureReinforcement(item, baseHitPoints) {
  return {
    initiative: item.reinforcement?.initiative ? CREATURE_REINFORCEMENT_BONUSES.initiative : 0,
    attack: item.reinforcement?.attack ? CREATURE_REINFORCEMENT_BONUSES.attack : 0,
    hitPoints: item.reinforcement?.hitPoints && Number.isFinite(baseHitPoints) && baseHitPoints > 0 ? baseHitPoints : 0
  };
}

export function withCreatureReinforcement(encounter, item, stat, enabled) {
  const supported = stat === "hitPoints" || Object.hasOwn(CREATURE_REINFORCEMENT_BONUSES, stat);
  if (item?.kind !== "creature" || !supported ||
    !encounter?.items.includes(item) || Boolean(item.reinforcement?.[stat]) === enabled) return encounter;

  const { reinforcement, ...baseItem } = item;
  const next = { ...reinforcement };
  if (enabled) next[stat] = true;
  else delete next[stat];
  const updated = Object.keys(next).length ? { ...baseItem, reinforcement: next } : baseItem;
  return { ...encounter, adjusted: true, items: encounter.items.map(candidate => candidate === item ? updated : candidate) };
}
