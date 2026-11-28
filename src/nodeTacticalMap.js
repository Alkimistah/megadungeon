import { createForestTacticalLayout } from "./forestTacticalLayouts.js";
import { getForestTrapPresentation } from "./forestTrapPresentation.js";
import { createRng, randomInt } from "./random.js";
import { SOLAR_FOCUS_LABELS, TERRAIN_BASE_TYPES, TERRAIN_ITEM_TYPES } from "./tacticalTerrain.js";
import { createTacticalScene, readLegacyTacticalScene } from "./tacticalScene.js";
import { getTacticalEncounterUnits, getTacticalPartyPieces, placeTacticalEncounterUnits } from "./tacticalScenePieces.js";

const WIDTH = 20;
const HEIGHT = 14;
const PARTY_COUNT = 4;
const DEFAULT_PARTY_POSITIONS = [[2, 10], [3, 10], [2, 11], [3, 11]];
const MAX_VISIBLE_ENEMIES = 12;

const WALKABLE_CELLS = new Set([
  ...Object.keys(SOLAR_FOCUS_LABELS),
  "deep-water", "dunes", "frozen-river", "gentle-slope", "ice", "pebbles", "steep-slope",
  "advantage",
  "canopy",
  "clearing",
  "concealment",
  "current",
  "deck",
  "bridge",
  "difficult",
  "crystal-shards",
  "floor",
  "foliage",
  "hidden",
  "objective",
  "party",
  "polished-crystal",
  "enemy",
  "boss",
  "slope",
  "swamp",
  "trap",
  "trench",
  "water",
  "wet",
  "wind",
  "web"
]);

function normalizeText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR");
}

function hasAnyName(names, options) {
  const normalized = names.map(normalizeText);

  return options.some((option) => normalized.includes(normalizeText(option)));
}

function createEmptyMap() {
  return Array.from({ length: HEIGHT }, () =>
    Array.from({ length: WIDTH }, () => "floor")
  );
}

function inBounds(x, y) {
  return x >= 0 && y >= 0 && x < WIDTH && y < HEIGHT;
}

function setCell(cells, x, y, value, overwrite = ["floor"]) {
  if (!inBounds(x, y) || !overwrite.includes(cells[y][x])) return false;

  cells[y][x] = value;
  return true;
}

function shuffle(array, rng) {
  const result = [...array];

  for (let index = result.length - 1; index > 0; index -= 1) {
    const target = randomInt(rng, 0, index);
    [result[index], result[target]] = [result[target], result[index]];
  }

  return result;
}

function getPositions(cells, predicate) {
  const positions = [];

  for (let y = 0; y < HEIGHT; y += 1) {
    for (let x = 0; x < WIDTH; x += 1) {
      if (predicate(cells[y][x], x, y)) positions.push([x, y]);
    }
  }

  return positions;
}

function getFreePositions(cells) {
  return getPositions(cells, cell => WALKABLE_CELLS.has(cell) &&
    cell !== "party" && cell !== "enemy" && cell !== "boss" && cell !== "objective" && cell !== "trap");
}

function getMarkerPositions(cells, marker) {
  return getPositions(cells, (cell) => cell === marker);
}

function distance(first, second) {
  return Math.abs(first[0] - second[0]) + Math.abs(first[1] - second[1]);
}

function placePatch(cells, rng, marker, {
  count,
  height = 2,
  overwrite = ["floor"],
  width = 3,
  xMax = WIDTH - width - 1,
  xMin = 1,
  yMax = HEIGHT - height - 1,
  yMin = 1
}) {
  let painted = false;
  for (let placed = 0; placed < count; placed += 1) {
    const x = randomInt(rng, xMin, Math.max(xMin, xMax));
    const y = randomInt(rng, yMin, Math.max(yMin, yMax));

    for (let dy = 0; dy < height; dy += 1) {
      for (let dx = 0; dx < width; dx += 1) {
        if (rng() < 0.85 && setCell(cells, x + dx, y + dy, marker, overwrite)) painted = true;
      }
    }
  }
  if (!painted) {
    const [position] = getPositions(cells, (cell, x, y) => overwrite.includes(cell) &&
      x >= xMin && x < xMax + width && y >= yMin && y < yMax + height);
    if (position) cells[position[1]][position[0]] = marker;
  }
}

function placeScattered(cells, rng, marker, count, overwrite = ["floor"]) {
  const options = shuffle(
    getPositions(cells, (cell, x, y) => overwrite.includes(cell) && x > 0 && y > 0 && x < WIDTH - 1 && y < HEIGHT - 1),
    rng
  );

  options.slice(0, count).forEach(([x, y]) => {
    cells[y][x] = marker;
  });
}

function placeLine(cells, rng, marker, {
  horizontal = true,
  length,
  overwrite = ["floor"],
  thickness = 1
}) {
  if (horizontal) {
    const y = randomInt(rng, 2, HEIGHT - 3);
    const x = randomInt(rng, 1, Math.max(1, WIDTH - length - 1));

    for (let dy = 0; dy < thickness; dy += 1) {
      for (let dx = 0; dx < length; dx += 1) setCell(cells, x + dx, y + dy, marker, overwrite);
    }
  } else {
    const x = randomInt(rng, 2, WIDTH - 3);
    const y = randomInt(rng, 1, Math.max(1, HEIGHT - length - 1));

    for (let dx = 0; dx < thickness; dx += 1) {
      for (let dy = 0; dy < length; dy += 1) setCell(cells, x + dx, y + dy, marker, overwrite);
    }
  }
}

function applyTerrain(cells, node, rng, features, forestLayout) {
  const terrainName = node.environment?.terrain?.name;
  const featureNames = (node.environment?.terrain?.features || [])
    .filter(feature => !feature.area).map(feature => feature.name);

  if (!forestLayout && terrainName === "Floresta") {
    placeScattered(cells, rng, "tree", hasAnyName(featureNames, ["Árvores"]) ? 22 : 12);
    if (hasAnyName(featureNames, ["Folhagens"])) {
      placePatch(cells, rng, "foliage", { count: 3, height: 3, width: 4 });
    }
    if (hasAnyName(featureNames, ["Vegetação rasteira"])) {
      placePatch(cells, rng, "difficult", { count: 3, height: 3, width: 4, overwrite: ["floor", "foliage"] });
    }
    if (hasAnyName(featureNames, ["Clareira"])) {
      placePatch(cells, rng, "clearing", { count: 1, height: 4, width: 6, overwrite: ["floor", "foliage"] });
    }
    const gentle = hasAnyName(featureNames, ["Inclinação suave"]);
    const steep = hasAnyName(featureNames, ["Inclinação íngreme"]);
    if (gentle) placePatch(cells, rng, "gentle-slope", { count: 2, height: 2, width: 4 });
    if (steep) placePatch(cells, rng, "steep-slope", { count: 2, height: 2, width: 4 });
    if (gentle || steep) placePatch(cells, rng, "advantage", { count: 1, height: 2, width: 3 });
    if (hasAnyName(featureNames, ["Penhasco"])) {
      placeLine(cells, rng, "cliff", { horizontal: rng() < 0.5, length: 9, thickness: 1 });
    }
  } else if (!forestLayout && terrainName === "Pântano") {
    placePatch(cells, rng, "water", { count: 3, height: 3, width: 5 });
    placePatch(cells, rng, "swamp", { count: 4, height: 2, width: 4, overwrite: ["floor", "water"] });
    placeScattered(cells, rng, "tree", 8);
    if (hasAnyName(featureNames, ["Lodaçal"])) placePatch(cells, rng, "swamp", { count: 2, height: 3, width: 4, overwrite: ["floor", "water"] });
    if (hasAnyName(featureNames, ["Vegetação alagada"])) {
      const foliage = cells.map(row => [...row]);
      placePatch(foliage, rng, "foliage", { count: 2, height: 2, width: 4, overwrite: ["swamp", "water"] });
      addChangedLayers(features, cells.flat(), foliage, ["foliage"], "Vegetação alagada");
    }
    if (hasAnyName(featureNames, ["Árvores retorcidas"])) placeScattered(cells, rng, "tree", 6);
  }

  if ((!forestLayout && terrainName === "Aquático") || hasAnyName(featureNames, ["Água corrente", "Água parada"]) && !["Pântano", "Aquático"].includes(terrainName)) {
    const waterMarker = hasAnyName(featureNames, ["Água corrente"]) ? "current" : "water";
    placeLine(cells, rng, waterMarker, { horizontal: rng() < 0.55, length: 16, thickness: 3 });
    placePatch(cells, rng, "floor", { count: 2, height: 2, width: 4, overwrite: ["water", "current"] });
  }

  if (!forestLayout && terrainName === "Colinas") {
    placePatch(cells, rng, "gentle-slope", { count: 4, height: 2, width: 4 });
    placePatch(cells, rng, "advantage", { count: 2, height: 2, width: 3 });
    if (hasAnyName(featureNames, ["Inclinação íngreme"])) placePatch(cells, rng, "steep-slope", { count: 3, height: 2, width: 4 });
    if (hasAnyName(featureNames, ["Penhasco"])) placeLine(cells, rng, "cliff", { horizontal: rng() < 0.5, length: 8, thickness: 1 });
  } else if (!forestLayout && terrainName === "Planície aberta") {
    if (hasAnyName(featureNames, ["Trincheira"])) {
      placeLine(cells, rng, "trench", { horizontal: rng() < 0.5, length: 12, thickness: 1 });
    }
  }

  for (const [name, tile] of [["Abismo", "abyss"], ["Paredão", "escarpment"]]) {
    if (hasAnyName(featureNames, [name])) placeLine(cells, rng, tile, { horizontal: rng() < 0.5, length: 8 });
  }
  for (const [name, tile] of [["Gelo", "ice"], ["Rio congelado", "frozen-river"], ["Dunas", "dunes"]]) {
    if (hasAnyName(featureNames, [name])) {
      placePatch(cells, rng, tile, { count: 2, height: 2, width: 5, overwrite: ["floor", "water", "current", "steep-slope"] });
    }
  }

  if (hasAnyName(featureNames, ["Seixos"])) {
    if (!getMarkerPositions(cells, "steep-slope").length) {
      placePatch(cells, rng, "steep-slope", { count: 2, height: 2, width: 5 });
    }
    const slopes = cells.map(row => [...row]);
    placeScattered(slopes, rng, "pebbles", 6, ["steep-slope"]);
    addChangedLayers(features, cells.flat(), slopes, ["pebbles"], "Seixos");
  }

  if (hasAnyName(featureNames, ["Solo encharcado"])) {
    const wetCells = cells.map(row => [...row]);
    placePatch(wetCells, rng, "wet", { count: 2, height: 2, width: 5, overwrite: ["floor", "water", "swamp"] });
    addChangedLayers(features, cells.flat(), wetCells, ["wet"], "Solo encharcado");
  }
}

function applyLegacyClimate(cells, node, rng) {
  const climateNames = (node.environment?.climate || []).map((climate) => climate.name);

  if (hasAnyName(climateNames, ["Neblina"])) placeScattered(cells, rng, "concealment", 8, ["floor", "difficult", "water", "foliage", "swamp", "wet"]);
  if (hasAnyName(climateNames, ["Chuva", "Neve", "Granizo"])) {
    placeScattered(cells, rng, "wet", hasAnyName(climateNames, ["Neve", "Granizo"]) ? 14 : 8, ["floor"]);
  }
  if (hasAnyName(climateNames, ["Vento forte", "Vendaval"])) {
    placeScattered(cells, rng, "wind", 8, ["floor", "foliage", "wet"]);
  }
  if (hasAnyName(climateNames, ["Tempestade", "Furacão", "Tornado"])) {
    placeScattered(cells, rng, "wind", hasAnyName(climateNames, ["Tornado"]) ? 4 : 2, ["floor", "difficult", "water", "foliage", "swamp", "wet"]);
    placeScattered(cells, rng, "wind", 10, ["floor", "foliage", "wet"]);
  }
}

function getEnemyCount(node) {
  return (node.resolvedEncounter?.items || [])
    .filter((item) => item.kind === "creature")
    .reduce((total, item) => total + (item.quantity || 1), 0);
}

function getTrapCount(node) {
  return node.resolvedEncounter?.items?.some((item) => item.kind === "trap") ? 1 : 0;
}

function placeFormation(cells, positions, marker, count) {
  positions.slice(0, count).forEach(([x, y]) => {
    cells[y][x] = marker;
  });
}

function placeParty(cells, positions) {
  placeFormation(cells, positions, "party", PARTY_COUNT);
}

function placeEnemies(cells, node, rng) {
  const count = Math.min(getEnemyCount(node), MAX_VISIBLE_ENEMIES);
  if (!count) return { placements: [], candidates: [] };

  const [partyStart] = node.tacticalLayout?.partyPositions ?? DEFAULT_PARTY_POSITIONS;
  const { enemyTiles, enemyArea = { minX: 10, maxX: WIDTH - 1, minY: 0, maxY: 9 } } = node.tacticalLayout ?? {};
  const candidates = shuffle(getFreePositions(cells), rng)
    .filter(([x, y]) => !enemyTiles || enemyTiles.includes(cells[y][x]))
    .filter(([x, y]) => x >= enemyArea.minX && x <= enemyArea.maxX && y >= enemyArea.minY && y <= enemyArea.maxY)
    .filter(position => distance(position, partyStart) >= 8);
  const positions = candidates.slice(0, count);
  let firstPosition = 0;
  const placements = node.resolvedEncounter.items.filter(item => item.kind === "creature").flatMap(item => {
    const nextPosition = firstPosition + (item.quantity || 1);
    const placements = positions.slice(firstPosition, nextPosition);
    const isBoss = node.type === "boss" && (!node.bossCreatureId || item.creatureId === node.bossCreatureId);
    if (!node.tacticalLayout?.enemySurfaceByCreatureId) {
      placeFormation(cells, placements, isBoss ? "boss" : "enemy", placements.length);
    }
    firstPosition = nextPosition;
    return placements.map(([x, y]) => ({ index: y * WIDTH + x, creatureId: item.creatureId }));
  });
  return { placements, candidates };
}

function getThreatCenter(cells) {
  const party = getMarkerPositions(cells, "party");
  const enemies = [...getMarkerPositions(cells, "enemy"), ...getMarkerPositions(cells, "boss")];
  const first = party[0] || [2, 10];
  const second = enemies[0] || [15, 4];

  return [
    Math.round((first[0] + second[0]) / 2),
    Math.round((first[1] + second[1]) / 2)
  ];
}

function trapHasAnyTag(node, tags) {
  const haystack = normalizeText(`${node.trap?.id || ""} ${node.trap?.name || ""} ${(node.trap?.tags || []).join(" ")}`);

  return tags.some((tag) => haystack.includes(normalizeText(tag)));
}

function placeTrapFeature(cells, node, rng) {
  if (!getTrapCount(node)) return;

  const [x, y] = getThreatCenter(cells);
  const threatMarkers = ["trap", "pit", "web", "mechanism"];
  const beforeCount = getPositions(cells, (cell) => threatMarkers.includes(cell)).length;

  if (trapHasAnyTag(node, ["fosso", "queda", "estacas"])) {
    placeLine(cells, rng, "pit", { horizontal: true, length: 8, thickness: 1 });
  } else if (trapHasAnyTag(node, ["rede", "teia"])) {
    placePatch(cells, rng, "web", { count: 1, height: 3, width: 3, xMin: x - 1, xMax: x - 1, yMin: y - 1, yMax: y - 1, overwrite: ["floor", "difficult", "foliage", "concealment", "wet"] });
  } else if (trapHasAnyTag(node, ["runa", "simbolo", "magica"])) {
    placePatch(cells, rng, "mechanism", { count: 1, height: 2, width: 2, xMin: x, xMax: x, yMin: y, yMax: y, overwrite: ["floor", "difficult", "foliage", "concealment", "wet"] });
  } else {
    placePatch(cells, rng, "trap", { count: 1, height: 2, width: 3, xMin: x - 1, xMax: x - 1, yMin: y - 1, yMax: y - 1, overwrite: ["floor", "difficult", "foliage", "concealment", "swamp", "water", "wet"] });
  }

  const afterCount = getPositions(cells, (cell) => threatMarkers.includes(cell)).length;
  if (afterCount > beforeCount) return;

  const fallback = shuffle(getFreePositions(cells), rng)
    .find((position) => distance(position, [x, y]) <= 4) || getFreePositions(cells)[0];
  if (fallback) cells[fallback[1]][fallback[0]] = "trap";
}

function findObjectivePosition(cells, rng) {
  const center = getThreatCenter(cells);
  const candidates = shuffle(getFreePositions(cells), rng)
    .filter((position) => distance(position, center) <= 6)
    .sort((first, second) => distance(first, center) - distance(second, center));
  return candidates[0] || getFreePositions(cells)[0];
}

const FEATURE_TILES = {
  ...Object.fromEntries(Object.keys(SOLAR_FOCUS_LABELS).map(type => [type, type])),
  canopy: "canopy",
  concealment: "concealment",
  current: "current",
  wet: "wet",
  wind: "wind",
  web: "web"
};
const MARKER_TILES = new Set(["mechanism", "trap"]);
const TERRAIN_FEATURE_NAMES = {
  clearing: ["Clareira"],
  cliff: ["Penhasco"],
  current: ["Água corrente"],
  difficult: ["Vegetação rasteira"],
  dunes: ["Dunas"],
  escarpment: ["Paredão"],
  foliage: ["Folhagens", "Vegetação alagada"],
  "frozen-river": ["Rio congelado"],
  "gentle-slope": ["Inclinação suave"],
  ice: ["Gelo"],
  pebbles: ["Seixos"],
  "steep-slope": ["Inclinação íngreme"],
  swamp: ["Lodaçal"],
  tree: ["Árvores", "Árvores retorcidas"],
  trench: ["Trincheira"],
  wet: ["Solo encharcado", "Chuva", "Neve", "Granizo"],
  wind: ["Vento forte", "Vendaval", "Tempestade", "Furacão", "Tornado"],
  concealment: ["Neblina"],
  abyss: ["Abismo"]
};

function getZoneIndices({ x, y, width, height }) {
  const indices = [];
  for (let row = Math.max(0, y); row < Math.min(HEIGHT, y + height); row += 1) {
    for (let column = Math.max(0, x); column < Math.min(WIDTH, x + width); column += 1) {
      indices.push(row * WIDTH + column);
    }
  }
  return indices;
}

function getTileLabel(tile, features) {
  return features.find(feature => hasAnyName(TERRAIN_FEATURE_NAMES[tile] || [], [feature.name]))?.name;
}

function addLayer(layers, type, indices, label, id) {
  if (!indices.length) return;
  layers.push({ type, indices, ...(label ? { label } : {}), ...(id ? { id } : {}) });
}

function buildEnvironmentScene(cells, node, layout, features) {
  const terrain = cells.flat().map(() => "floor");
  const terrainBase = terrain.map(() => null);
  const paint = (index, type) => {
    const previous = terrain[index];
    terrainBase[index] = TERRAIN_ITEM_TYPES.includes(type) && (terrainBase[index] || TERRAIN_BASE_TYPES.includes(previous))
      ? terrainBase[index] ?? previous : null;
    terrain[index] = type;
  };
  const markers = [];
  const definitions = node.environment?.terrain?.features || [];
  const submersion = definitions.find(feature =>
    feature.id === "submersion" || hasAnyName([feature.name], ["Personagens submersos"]));
  const flooded = new Set(submersion?.area ? getZoneIndices(submersion.area) : submersion
    ? terrain.map((_, index) => index) : []);
  const baseCells = cells.flat();
  const layoutLayers = layout ? layout.zones : [...new Set(baseCells)].map(tile => ({
    tile,
    indices: baseCells.flatMap((cell, index) => cell === tile ? [index] : [])
  }));

  for (const zone of layoutLayers) {
    const { tile, terrainType = tile, featureType, label = getTileLabel(tile, definitions), id } = zone;
    const indices = zone.indices ?? getZoneIndices(zone);
    if (MARKER_TILES.has(tile)) {
      addLayer(markers, tile, indices, label, id);
    } else if (FEATURE_TILES[tile] || featureType) {
      addLayer(features, featureType ?? tile, indices, label, id);
      if (tile === "current" || terrainType !== tile) {
        for (const index of indices) paint(index, terrainType === "current" ? "deep-water" : terrainType);
      }
    } else {
      for (const index of indices) paint(index, terrainType);
      if (layout && (tile === "floor" || tile === "deck")) {
        const replaced = new Set(indices);
        for (const feature of features) feature.indices = feature.indices.filter(index => !replaced.has(index));
      }
    }
    if (layout && submersion && !submersion.area && ["floor", "deck", "clearing", "water"].includes(tile)) {
      for (const index of indices) flooded.delete(index);
    }
  }

  const localClimate = (node.environment?.climate || []).filter(condition => condition.area);
  const localDefinitions = [...definitions, ...localClimate];
  for (const definition of localDefinitions) {
    if (!definition.area || definition === submersion) continue;
    const indices = getZoneIndices(definition.area);
    const tile = definition.type ?? Object.keys(TERRAIN_FEATURE_NAMES)
      .find(key => hasAnyName(TERRAIN_FEATURE_NAMES[key], [definition.name]));
    if (!tile) continue;
    if (!FEATURE_TILES[tile]) {
      for (const index of indices) {
        paint(index, tile);
        if (submersion && !submersion.area && ["floor", "deck", "clearing", "water"].includes(tile)) {
          flooded.delete(index);
        }
      }
    } else {
      addLayer(features, tile, indices, definition.name, definition.id);
    }
  }
  const submergedFeatures = new Map();
  for (const index of flooded) {
    const tile = terrain[index];
    if (!["floor", "water", "deep-water"].includes(tile)) {
      if (!submergedFeatures.has(tile)) submergedFeatures.set(tile, []);
      submergedFeatures.get(tile).push(index);
    }
    terrainBase[index] = null;
    terrain[index] = "deep-water";
  }
  for (const [type, indices] of submergedFeatures) {
    addLayer(features, type, indices, getTileLabel(type, definitions));
  }

  if (layout?.landmark) {
    const { x, y, name, id } = layout.landmark;
    addLayer(markers, "mechanism", [y * WIDTH + x], name, id);
  }
  return { terrain, terrainBase, features: features.filter(feature => feature.indices.length), markers };
}

function addChangedLayers(layers, before, cells, types, label, id) {
  const after = cells.flat();
  for (const type of types) {
    addLayer(layers, type, after.flatMap((cell, index) => cell === type && before[index] !== type ? [index] : []), label, id);
  }
}

function getNodeUnits(node) {
  return getTacticalEncounterUnits(node.resolvedEncounter?.items, {
    isBoss: node.type === "boss" || Boolean(node.bossCreatureId),
    bossCreatureId: node.bossCreatureId
  });
}

function withFixedScene(node, objectives) {
  const map = structuredClone(node.fixedTacticalMap);
  const scene = readLegacyTacticalScene(map);
  if (!scene) return map;
  const party = scene.pieces.filter(piece => piece.kind === "party");
  const asPosition = ({ x, y }) => [x, y];
  const originalPositions = scene.pieces.filter(piece => piece.side === "enemy").map(asPosition);
  const fallback = scene.terrain.flatMap((tile, index) => WALKABLE_CELLS.has(tile)
    ? [[index % scene.width, Math.floor(index / scene.width)]] : []);
  const enemies = placeTacticalEncounterUnits(getNodeUnits(node), originalPositions, fallback, scene, party, {
    canOccupy: index => WALKABLE_CELLS.has(scene.terrain[index])
  });
  const objectiveMarkers = objectives.filter(objective => objective.targetType === "creature")
    .flatMap(objective => enemies.filter(piece => piece.creatureId === objective.targetId)
      .map(piece => ({ type: "objective", label: objective.targetName, pieceId: piece.id })));
  map.scene = createTacticalScene({
    ...scene,
    pieces: [...party, ...enemies],
    markers: [...scene.markers, ...objectiveMarkers]
  });
  return map;
}

export function createNodeTacticalMap(node, objectives = node?.missionObjectives || [], { profileId } = {}) {
  if (!node || (!node.resolvedEncounter?.items?.length && !objectives.length)) return null;
  if (node.fixedTacticalMap) return withFixedScene(node, objectives);

  const sceneSeed = `${node.resolvedEncounter?.seed || node.encounterSeed || node.id}:node-tactical-map`;
  const rng = createRng(sceneSeed);
  const size = { width: WIDTH, height: HEIGHT };
  const layout = node.tacticalLayout;
  const forestLayout = profileId === "forest-11-20" && !layout
    ? createForestTacticalLayout(node, objectives, size) : null;
  const cells = forestLayout?.cells ?? createEmptyMap();
  const terrainFeatures = [];

  if (layout) {
    for (const zone of layout.zones) {
      for (const index of getZoneIndices(zone)) cells[Math.floor(index / WIDTH)][index % WIDTH] = zone.tile;
    }
  } else {
    applyTerrain(cells, node, rng, terrainFeatures, forestLayout);
  }
  const { terrain: sceneTerrain, terrainBase, features, markers } = buildEnvironmentScene(cells, node, layout, terrainFeatures);
  if (layout?.landmark) cells[layout.landmark.y][layout.landmark.x] = "mechanism";
  applyLegacyClimate(cells, node, rng);
  const fallback = getFreePositions(cells);
  const partyPositions = layout?.partyPositions ?? forestLayout?.partyPositions ?? DEFAULT_PARTY_POSITIONS;
  const party = getTacticalPartyPieces(partyPositions);
  placeParty(cells, partyPositions);
  const { placements: enemies, candidates: enemyAreaCandidates } = placeEnemies(cells, node, rng);
  const beforeTrap = cells.flat();
  const trapItem = node.resolvedEncounter?.items.find(item => item.kind === "trap");
  const trapLabel = getForestTrapPresentation(profileId, node, trapItem)?.name ?? node.trap?.name ?? trapItem?.name;
  const trapMarkerId = node.generationVersion >= 5 ? trapItem?.trapId : undefined;
  if (forestLayout?.trapPositions.length) {
    addLayer(markers, "trap", forestLayout.trapPositions.map(([x, y]) => y * WIDTH + x), trapLabel, trapMarkerId);
  } else {
    placeTrapFeature(cells, node, rng);
    addChangedLayers(markers, beforeTrap, cells, ["trap", "pit", "web", "mechanism"], trapLabel, trapMarkerId);
  }
  const blockingFeatures = new Set(features.filter(feature => !WALKABLE_CELLS.has(feature.type))
    .flatMap(feature => feature.indices));
  const canOccupy = index => WALKABLE_CELLS.has(sceneTerrain[index]) && !blockingFeatures.has(index);
  const enemyTiles = layout?.enemyTiles;
  const enemySurfaces = layout?.enemySurfaceByCreatureId;
  const preferredArea = layout?.keepFootprintsInEnemyArea ? layout.enemyArea : null;
  const canPrefer = (index, unit) => {
    if (preferredArea) {
      const x = index % WIDTH;
      const y = Math.floor(index / WIDTH);
      if (x < preferredArea.minX || x > preferredArea.maxX || y < preferredArea.minY || y > preferredArea.maxY) return false;
    }
    const tile = sceneTerrain[index];
    if (enemySurfaces) {
      const surface = enemySurfaces[unit.creatureId];
      return canOccupy(index) && (surface === "any" || surface === tile);
    }
    const legacyTile = beforeTrap[index];
    return canOccupy(index) && (!enemyTiles || enemyTiles.includes(tile)
      || enemyTiles.includes("water") && tile === "deep-water" || enemyTiles.includes(legacyTile));
  };
  const units = getNodeUnits(node);
  if (enemySurfaces) units.sort((left, right) =>
    Number(enemySurfaces[left.creatureId] === "any") - Number(enemySurfaces[right.creatureId] === "any") ||
    right.width * right.height - left.width * left.height);
  const enemyPieces = placeTacticalEncounterUnits(units, enemies.map(({ index }) =>
    [index % WIDTH, Math.floor(index / WIDTH)]), [...enemyAreaCandidates, ...fallback], size, party,
  { canOccupy, canPrefer, strict: Boolean(enemySurfaces) });
  if (enemySurfaces) placeFormation(cells, enemyPieces.map(({ x, y }) => [x, y]), "enemy", enemyPieces.length);
  const objectiveMarkers = objectives.flatMap(objective => {
    if (objective.targetType === "creature") {
      for (const piece of enemyPieces.filter(piece => piece.creatureId === objective.targetId)) {
        markers.push({ type: "objective", pieceId: piece.id, label: objective.targetName });
      }
      return enemies.filter(enemy => enemy.creatureId === objective.targetId)
        .map(({ index }) => ({ index, label: objective.targetName }));
    }
    const position = forestLayout?.objectivePositions.get(objective) ??
      findObjectivePosition(cells, createRng(`${sceneSeed}:objectives:${objective.missionId}`));
    if (!position) return [];
    const [x, y] = position;
    const index = y * WIDTH + x;
    addLayer(markers, "objective", [index], objective.targetName);
    return [{ index, label: objective.targetName }];
  });
  const climate = node.environment?.climate || [];
  return {
    cells: cells.flat(),
    scene: createTacticalScene({ ...size, terrain: sceneTerrain, terrainBase, features, markers, pieces: [...party, ...enemyPieces], climate }),
    climate: node.environment?.climate || [],
    enemyCount: getEnemyCount(node),
    height: HEIGHT,
    objectiveCount: objectiveMarkers.length,
    objectiveMarkers,
    ...(layout?.landmark ? { landmark: { index: layout.landmark.y * WIDTH + layout.landmark.x, label: layout.landmark.name } } : {}),
    terrain: node.environment?.terrain || null,
    template: forestLayout?.id ?? normalizeText(node.environment?.terrain?.name || "aberto"),
    trapCount: getTrapCount(node),
    width: WIDTH
  };
}
