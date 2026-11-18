export const CREATURE_REINFORCEMENT_BONUSES = { initiative: 2, attack: 1 };

export function getCreatureReinforcement(item, baseHitPoints) {
  const points = item.reinforcement?.hitPoints;
  return {
    initiative: item.reinforcement?.initiative ? CREATURE_REINFORCEMENT_BONUSES.initiative : 0,
    attack: item.reinforcement?.attack ? CREATURE_REINFORCEMENT_BONUSES.attack : 0,
    hitPoints: Number.isSafeInteger(points) && points > 0
      ? points
      : points === true && Number.isFinite(baseHitPoints) && baseHitPoints > 0 ? baseHitPoints : 0
  };
}

export function withCreatureReinforcement(encounter, item, stat, enabled) {
  const supported = stat === "hitPoints" || Object.hasOwn(CREATURE_REINFORCEMENT_BONUSES, stat);
  const value = stat === "hitPoints" && Number.isSafeInteger(enabled) && enabled > 0 ? enabled : enabled === true;
  if (item?.kind !== "creature" || !supported ||
    !encounter?.items.includes(item) || (item.reinforcement?.[stat] ?? false) === value) return encounter;

  const { reinforcement, ...baseItem } = item;
  const next = { ...reinforcement };
  if (value) next[stat] = value;
  else delete next[stat];
  const updated = Object.keys(next).length ? { ...baseItem, reinforcement: next } : baseItem;
  return { ...encounter, adjusted: true, items: encounter.items.map(candidate => candidate === item ? updated : candidate) };
}
