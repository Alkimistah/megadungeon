import { createRng, randomInt } from "./random.js";

const WIDTH = 20;
const HEIGHT = 14;
const PARTY_COUNT = 4;
const MAX_VISIBLE_ENEMIES = 12;

const WALKABLE_CELLS = new Set([
  "advantage",
  "clearing",
  "concealment",
  "current",
  "difficult",
  "floor",
  "foliage",
  "hidden",
  "party",
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

function getFeatureNames(node) {
  return (node.environment?.terrain?.features || []).map((feature) => feature.name);
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

function isWalkable(cell) {
  return WALKABLE_CELLS.has(cell);
}

function keyOf([x, y]) {
  return `${x},${y}`;
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
  return getPositions(cells, (cell) => [
    "advantage",
    "clearing",
    "concealment",
    "current",
    "difficult",
    "floor",
    "foliage",
    "hidden",
    "slope",
    "swamp",
    "trench",
    "water",
    "wet",
    "wind",
    "web"
  ].includes(cell));
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
  for (let placed = 0; placed < count; placed += 1) {
    const x = randomInt(rng, xMin, Math.max(xMin, xMax));
    const y = randomInt(rng, yMin, Math.max(yMin, yMax));

    for (let dy = 0; dy < height; dy += 1) {
      for (let dx = 0; dx < width; dx += 1) {
        if (rng() < 0.85) setCell(cells, x + dx, y + dy, marker, overwrite);
      }
    }
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

function applyTerrain(cells, node, rng) {
  const terrainName = node.environment?.terrain?.name;
  const featureNames = getFeatureNames(node);

  if (terrainName === "Floresta") {
    placeScattered(cells, rng, hasAnyName(featureNames, ["Árvores"]) ? "tree" : "obstacle", hasAnyName(featureNames, ["Árvores"]) ? 22 : 12);
    if (hasAnyName(featureNames, ["Folhagens"])) {
      placePatch(cells, rng, "foliage", { count: 3, height: 3, width: 4 });
    }
    if (hasAnyName(featureNames, ["Vegetação rasteira"])) {
      placePatch(cells, rng, "difficult", { count: 3, height: 3, width: 4, overwrite: ["floor", "foliage"] });
    }
    if (hasAnyName(featureNames, ["Clareira"])) {
      placePatch(cells, rng, "clearing", { count: 1, height: 4, width: 6, overwrite: ["floor", "foliage"] });
    }
    if (hasAnyName(featureNames, ["Inclinação suave", "Inclinação íngreme"])) {
      placePatch(cells, rng, "slope", { count: 2, height: 2, width: 4 });
      placePatch(cells, rng, "advantage", { count: 1, height: 2, width: 3 });
    }
    if (hasAnyName(featureNames, ["Penhasco"])) {
      placeLine(cells, rng, "pit", { horizontal: rng() < 0.5, length: 9, thickness: 1 });
    }
  } else if (terrainName === "Pântano") {
    placePatch(cells, rng, "water", { count: 3, height: 3, width: 5 });
    placePatch(cells, rng, "swamp", { count: 4, height: 2, width: 4, overwrite: ["floor", "water"] });
    placeScattered(cells, rng, "tree", 8);
    if (hasAnyName(featureNames, ["Lodaçal"])) placePatch(cells, rng, "swamp", { count: 2, height: 3, width: 4, overwrite: ["floor", "water"] });
    if (hasAnyName(featureNames, ["Vegetação alagada"])) placePatch(cells, rng, "foliage", { count: 2, height: 2, width: 4, overwrite: ["floor", "swamp"] });
    if (hasAnyName(featureNames, ["Árvores retorcidas"])) placeScattered(cells, rng, "tree", 6);
  } else if (terrainName === "Aquático") {
    const waterMarker = hasAnyName(featureNames, ["Água corrente"]) ? "current" : "water";
    placeLine(cells, rng, waterMarker, { horizontal: rng() < 0.55, length: 16, thickness: 3 });
    placePatch(cells, rng, "floor", { count: 2, height: 2, width: 4, overwrite: ["water", "current"] });
    if (hasAnyName(featureNames, ["Personagens submersos"])) placeScattered(cells, rng, "concealment", 6, ["water"]);
  } else if (terrainName === "Colinas") {
    placePatch(cells, rng, "slope", { count: 4, height: 2, width: 4 });
    placePatch(cells, rng, "advantage", { count: 2, height: 2, width: 3 });
    placeScattered(cells, rng, "obstacle", 12);
    if (hasAnyName(featureNames, ["Inclinação íngreme"])) placePatch(cells, rng, "difficult", { count: 3, height: 2, width: 4 });
    if (hasAnyName(featureNames, ["Penhasco"])) placeLine(cells, rng, "pit", { horizontal: rng() < 0.5, length: 8, thickness: 1 });
  } else if (terrainName === "Planície aberta") {
    if (hasAnyName(featureNames, ["Trincheira"])) {
      placeLine(cells, rng, "trench", { horizontal: rng() < 0.5, length: 12, thickness: 1 });
      placeScattered(cells, rng, "obstacle", 8);
    }
  }

  if (hasAnyName(featureNames, ["Solo encharcado"])) {
    placePatch(cells, rng, "wet", { count: 2, height: 2, width: 5, overwrite: ["floor", "water", "swamp"] });
  }
}

function applyClimate(cells, node, rng) {
  const climateNames = (node.environment?.climate || []).map((climate) => climate.name);

  if (hasAnyName(climateNames, ["Neblina"])) placeScattered(cells, rng, "concealment", 8, ["floor", "difficult", "water", "foliage", "swamp", "wet"]);
  if (hasAnyName(climateNames, ["Chuva", "Neve", "Granizo"])) {
    placeScattered(cells, rng, "wet", hasAnyName(climateNames, ["Neve", "Granizo"]) ? 14 : 8, ["floor"]);
  }
  if (hasAnyName(climateNames, ["Vento forte", "Vendaval"])) {
    placeScattered(cells, rng, "wind", 8, ["floor", "foliage", "wet"]);
  }
  if (hasAnyName(climateNames, ["Tempestade", "Furacão", "Tornado"])) {
    placeScattered(cells, rng, "trap", hasAnyName(climateNames, ["Tornado"]) ? 4 : 2, ["floor", "difficult", "water", "foliage", "swamp", "wet"]);
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

function placeParty(cells) {
  placeFormation(cells, [[2, 10], [3, 10], [2, 11], [3, 11]], "party", PARTY_COUNT);
}

function placeEnemies(cells, node, rng) {
  const count = Math.min(getEnemyCount(node), MAX_VISIBLE_ENEMIES);
  if (!count) return;

  const partyCenter = [2, 10];
  const candidates = shuffle(getFreePositions(cells), rng)
    .filter((position) => position[0] >= 10 && position[1] <= 9 && distance(position, partyCenter) >= 8);
  const marker = node.type === "boss" ? "boss" : "enemy";

  placeFormation(cells, candidates, marker, count);
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

function protectMarkers(cells) {
  getPositions(cells, (cell) => ["party", "enemy", "boss"].includes(cell)).forEach(([x, y]) => {
    if (!isWalkable(cells[y][x])) cells[y][x] = "floor";
  });
}

export function createNodeTacticalMap(node) {
  if (!node?.resolvedEncounter?.items?.length) return null;

  const rng = createRng(`${node.resolvedEncounter.seed || node.encounterSeed || node.id}:node-tactical-map`);
  const cells = createEmptyMap();

  applyTerrain(cells, node, rng);
  applyClimate(cells, node, rng);
  placeParty(cells);
  placeEnemies(cells, node, rng);
  placeTrapFeature(cells, node, rng);
  protectMarkers(cells);

  return {
    cells: cells.flat(),
    climate: node.environment?.climate || [],
    enemyCount: getEnemyCount(node),
    height: HEIGHT,
    terrain: node.environment?.terrain || null,
    template: normalizeText(node.environment?.terrain?.name || "aberto"),
    trapCount: getTrapCount(node),
    width: WIDTH
  };
}
