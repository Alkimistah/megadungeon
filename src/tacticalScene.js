import { TACTICAL_FEATURE_LABELS, TACTICAL_MARKER_LABELS } from "./tacticalTerrain.js";

const FOOTPRINT_SIDES = { grande: 2, enorme: 3, colossal: 6 };
const LEGACY_LOCAL_EFFECTS = new Set(["web", "wind", "concealment"]);
const LEGACY_PIN_TYPES = new Set(["trap", "objective", "hidden", "reinforcement"]);
const LEGACY_PIECE_TYPES = new Set(["party", "enemy", "boss"]);

function copyLocation(entry) {
  return entry.indices ? { ...entry, indices: [...entry.indices] } : { ...entry };
}

export function createTacticalScene({ width, height, terrain, features = [], markers = [], pieces = [], climate = [] }) {
  return {
    width,
    height,
    terrain: [...terrain],
    features: features.map(copyLocation),
    markers: markers.map(copyLocation),
    pieces: pieces.map((piece) => ({ ...piece })),
    climate: climate.map((entry) => ({ ...entry }))
  };
}

export function getTacticalFootprint(size) {
  const key = String(size || "").trim().toLowerCase();
  const side = Object.hasOwn(FOOTPRINT_SIDES, key) ? FOOTPRINT_SIDES[key] : 1;
  return { width: side, height: side };
}

function readLegacyPieces(cells, width, enemyCount) {
  const bossCells = cells.reduce((count, cell) => count + Number(cell === "boss"), 0);
  const enemyCells = cells.reduce((count, cell) => count + Number(cell === "enemy"), 0);
  const mayHaveBossArea = bossCells >= 4 && enemyCount < bossCells + enemyCells;
  const consumed = new Set();
  const counts = { party: 0, enemy: 0, boss: 0 };

  return cells.flatMap((kind, index) => {
    if (!LEGACY_PIECE_TYPES.has(kind) || consumed.has(index)) return [];
    const x = index % width;
    const y = Math.floor(index / width);
    const bossArea = [index + 1, index + width, index + width + 1];
    const isLargeBoss = kind === "boss" && mayHaveBossArea && x + 1 < width
      && bossArea.every((cellIndex) => cells[cellIndex] === "boss" && !consumed.has(cellIndex));
    if (isLargeBoss) bossArea.forEach((cellIndex) => consumed.add(cellIndex));

    const side = kind === "party" ? "ally" : "enemy";
    const ordinal = ++counts[kind];
    const name = { party: "Jogador", enemy: "Inimigo", boss: "Chefe" }[kind];
    const span = isLargeBoss ? 2 : 1;
    return [{ id: `${kind}-${ordinal}`, name: `${name} ${ordinal}`, side, kind, x, y, width: span, height: span }];
  });
}

export function readLegacyTacticalScene(tacticalMap) {
  if (!tacticalMap) return null;
  if (tacticalMap.scene) return tacticalMap.scene;

  const { cells, width, height, climate, enemyCount, landmark, objectiveMarkers = [] } = tacticalMap;
  if (!Array.isArray(cells)) return null;

  const featureIndices = new Map();
  const markers = [];
  const terrain = cells.map((type, index) => {
    if (LEGACY_LOCAL_EFFECTS.has(type)) {
      if (!featureIndices.has(type)) featureIndices.set(type, []);
      featureIndices.get(type).push(index);
      return "floor";
    }
    if (LEGACY_PIN_TYPES.has(type)) {
      markers.push({ type, label: TACTICAL_MARKER_LABELS[type], indices: [index] });
      return "floor";
    }
    return LEGACY_PIECE_TYPES.has(type) ? "floor" : type;
  });

  if (landmark) {
    markers.push({ type: "mechanism", label: landmark.label, indices: [landmark.index] });
  }
  objectiveMarkers.forEach(({ index, label, pieceId }) => {
    markers.push({ type: "objective", label, ...(pieceId ? { pieceId } : { indices: [index] }) });
  });

  const features = Array.from(featureIndices, ([type, indices]) => ({
    type,
    label: TACTICAL_FEATURE_LABELS[type],
    indices
  }));

  return createTacticalScene({
    width, height, terrain, features, markers, pieces: readLegacyPieces(cells, width, enemyCount), climate
  });
}
