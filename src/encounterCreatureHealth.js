import { getCreatureById } from "./creatureCatalog/index.js";
import { getCreatureReinforcement } from "./creatureReinforcement.js";

function getMaxHitPoints(item) {
  const creature = item.creatureData ?? getCreatureById(item.creatureId);
  const base = creature?.stats?.hitPoints;
  return Number.isFinite(base) && base > 0 ? base + getCreatureReinforcement(item, base).hitPoints : null;
}

export function getCreatureUnits(item) {
  const max = getMaxHitPoints(item);
  if (max === null) return [];
  return Array.from({ length: item.quantity }, (_, index) => ({
    index,
    current: Math.max(0, max - (item.unitDamage?.[index] || 0)),
    max
  }));
}

export function hasEncounterAdjustments(encounter) {
  return Boolean(encounter?.adjusted || encounter?.temporaryAdjustments || encounter?.items?.some(item =>
    item.reinforcement || item.unitDamage || item.addedQuantity
  ));
}

export function canAddEncounterCreature(item, missions = []) {
  return item?.kind === "creature" && !missions.some(mission =>
    mission.category === "extermination" && mission.status !== "completed"
    && mission.objective?.targetType === "creature" && mission.objective.targetId === item.creatureId
  );
}

export function withCreatureAdded(encounter, item, missions = []) {
  const index = encounter.items.indexOf(item);
  if (index < 0 || !canAddEncounterCreature(item, missions)) return encounter;
  const items = [...encounter.items];
  items[index] = {
    ...item,
    quantity: item.quantity + 1,
    addedQuantity: (item.addedQuantity || 0) + 1
  };
  return { ...encounter, items, temporaryAdjustments: true };
}

export function getEncounterForSave(encounter) {
  if (!encounter?.temporaryAdjustments && !encounter?.lastHealthEdit &&
    !encounter?.items?.some(item => item.unitDamage || item.addedQuantity)) return encounter;

  const { temporaryAdjustments, lastHealthEdit, lastChimeraHit, ...snapshot } = encounter;
  snapshot.items = encounter.items.map(item => {
    if (!item.unitDamage && !item.addedQuantity) return item;
    const { unitDamage, addedQuantity, ...original } = item;
    original.quantity -= addedQuantity || 0;
    return original;
  });
  return snapshot;
}

function withUnitDamage(item, unitIndex, damage) {
  const unitDamage = { ...item.unitDamage };
  if (damage > 0) unitDamage[unitIndex] = damage;
  else delete unitDamage[unitIndex];
  const updated = { ...item };
  if (Object.keys(unitDamage).length) updated.unitDamage = unitDamage;
  else delete updated.unitDamage;
  return updated;
}

export function withCreatureHealthChange(encounter, item, unitIndex, damage) {
  const itemIndex = encounter.items.indexOf(item);
  if (item?.kind !== "creature" || itemIndex < 0 || !Number.isInteger(unitIndex) ||
    unitIndex < 0 || unitIndex >= item.quantity || !Number.isSafeInteger(damage)) return encounter;
  const max = getMaxHitPoints(item);
  if (max === null) return encounter;

  const previous = item.unitDamage?.[unitIndex] || 0;
  const next = damage > 0 ? Math.max(previous, Math.min(max, previous + damage)) : Math.max(0, previous + damage);
  if (previous === next) return encounter;
  const items = [...encounter.items];
  items[itemIndex] = withUnitDamage(item, unitIndex, next);
  return { ...encounter, items, temporaryAdjustments: true, lastHealthEdit: { itemIndex, unitIndex, previous } };
}

export function withLastHealthChangeUndone(encounter) {
  if (!encounter.lastHealthEdit) return encounter;
  const { lastHealthEdit, ...restored } = encounter;
  const { itemIndex, unitIndex, previous } = lastHealthEdit;
  const item = encounter.items[itemIndex];
  if (item?.kind !== "creature" || !Number.isInteger(unitIndex) || unitIndex < 0 ||
    unitIndex >= item.quantity || !Number.isSafeInteger(previous) || previous < 0) return encounter;
  const items = [...encounter.items];
  items[itemIndex] = withUnitDamage(item, unitIndex, previous);
  return { ...restored, items };
}
