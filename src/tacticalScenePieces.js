import { getCreatureById } from "./creatureCatalog/index.js";
import { getTacticalFootprint } from "./tacticalScene.js";

export function getTacticalEncounterUnits(items = [], { isBoss = false, bossCreatureId } = {}) {
  return items.flatMap((item, itemIndex) => {
    if (item.kind !== "creature") return [];
    const creature = item.creatureData ?? getCreatureById(item.creatureId);
    const isBossUnit = isBoss && (!bossCreatureId || item.creatureId === bossCreatureId);
    const name = item.name ?? creature?.name ?? item.creatureId ?? "Criatura";
    return Array.from({ length: item.quantity || 1 }, (_, unitIndex) => ({
      id: `creature:${itemIndex}:${item.creatureId}:${unitIndex}`,
      creatureId: item.creatureId,
      name,
      side: "enemy",
      kind: isBossUnit ? "boss" : "enemy",
      ...getTacticalFootprint(creature?.size)
    }));
  });
}

export function getTacticalPartyPieces(positions) {
  return positions.map(([x, y], index) => ({
    id: `party:${index}`,
    name: `Personagem ${index + 1}`,
    side: "ally",
    kind: "party",
    x, y, width: 1, height: 1
  }));
}

export function placeTacticalEncounterUnits(
  units, preferredPositions, fallbackPositions, size, occupiedPieces = [],
  { canOccupy = () => true, canPrefer = canOccupy, strict = false } = {}
) {
  const occupied = new Set();
  const occupy = ({ x, y, width, height }) => {
    for (let row = y; row < y + height; row += 1) {
      for (let column = x; column < x + width; column += 1) occupied.add(row * size.width + column);
    }
  };
  occupiedPieces.forEach(occupy);
  const candidates = [...preferredPositions, ...fallbackPositions];
  const fits = (x, y, width, height, accepts, avoidPieces) => {
    for (let row = y; row < y + height; row += 1) {
      for (let column = x; column < x + width; column += 1) {
        const index = row * size.width + column;
        if (!accepts(index) || (avoidPieces && occupied.has(index))) return false;
      }
    }
    return true;
  };
  return units.flatMap((unit, index) => {
    const start = preferredPositions[index];
    const clampedStart = start && [
      Math.min(start[0], size.width - unit.width),
      Math.min(start[1], size.height - unit.height)
    ];
    const inBounds = ([x, y]) => x >= 0 && y >= 0 && x + unit.width <= size.width && y + unit.height <= size.height;
    const valid = [clampedStart, ...candidates].filter(position => position && inBounds(position));
    const findPosition = (accepts, avoidPieces) => valid.find(([x, y]) =>
      fits(x, y, unit.width, unit.height, tile => accepts(tile, unit), avoidPieces));
    const preferred = findPosition(canPrefer, true);
    if (strict && !preferred) return [];
    const [x, y] = preferred ?? findPosition(canOccupy, true)
      ?? findPosition(canPrefer, false) ?? findPosition(canOccupy, false) ?? valid[0] ?? [0, 0];
    const piece = { ...unit, x, y };
    occupy(piece);
    return [piece];
  });
}
