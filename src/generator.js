import { generateEnvironmentContext } from "./environment.js";
import {
  campRoom,
  roomTypes,
  skillOptionsByRoomType,
  treasureRoom,
  unknownRoom
} from "./tables.js";

const GRID_WIDTH = 7;
const MIN_EDGE_NODES = 3;
const MAX_EDGE_NODES = 4;
const MIN_MIDDLE_NODES = 5;
const MAX_MIDDLE_NODES = 7;
const EXTRA_LINK_CHANCE = 0.18;
const UNKNOWN_INCOMING_THRESHOLD = 3;

const COLUMN_TEMPLATES = {
  3: [[1, 3, 5], [0, 3, 6], [1, 2, 4]],
  4: [[1, 2, 4, 5], [0, 2, 4, 6], [1, 3, 4, 6]],
  5: [[0, 1, 3, 5, 6], [0, 2, 3, 4, 6], [1, 2, 3, 4, 5]],
  6: [[0, 1, 2, 4, 5, 6], [0, 1, 3, 4, 5, 6]],
  7: [[0, 1, 2, 3, 4, 5, 6]]
};

let nodeId = 0;

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick(array) {
  return array[randomInt(0, array.length - 1)];
}

function pickWeighted(options) {
  const totalWeight = options.reduce((sum, option) => sum + option.weight, 0);
  let roll = randomInt(1, totalWeight);

  for (const option of options) {
    roll -= option.weight;

    if (roll <= 0) {
      return option;
    }
  }

  return options[0];
}

function getRoomTypeDCModifier(type) {
  if (type === "elite") {
    return randomInt(2, 5);
  }

  return 0;
}

function getRandomDCVariation() {
  return pickWeighted([
    { modifier: 0, weight: 40 },
    { modifier: -3, weight: 10 },
    { modifier: -2, weight: 10 },
    { modifier: -1, weight: 10 },
    { modifier: 1, weight: 10 },
    { modifier: 2, weight: 10 },
    { modifier: 3, weight: 10 }
  ]).modifier;
}

function pickWeightedSkill(options) {
  return pickWeighted(options).skill;
}

function pickWeightedRoomType() {
  return pickWeighted(roomTypes);
}

function assignEnvironments(levels) {
  levels.flat().forEach((node) => {
    node.environment = generateEnvironmentContext();
  });
}

function assignDiscoveryCheck(node, baseDC) {
  if (node.type === "unknown" || node.type === "camp") {
    node.skill = null;
    node.dc = null;
    return;
  }

  const options = skillOptionsByRoomType[node.type] || skillOptionsByRoomType.normal;
  const modifier = getRoomTypeDCModifier(node.type);
  const variation = node.type === "elite" ? 0 : getRandomDCVariation();

  node.skill = pickWeightedSkill(options);
  node.dc = Math.max(baseDC + modifier + variation, 5);
}

function assignDiscoveryChecks(levels, baseDC) {
  levels.flat().forEach((node) => {
    assignDiscoveryCheck(node, baseDC);
  });
}

function applyRoomType(node, roomData) {
  node.type = roomData.type;
  node.label = roomData.label;
  node.short = roomData.short;
  node.skill = null;
  node.dc = null;
}

function createNode(level, column) {
  const data = pickWeightedRoomType();

  return {
    id: nodeId++,
    level,
    column,
    type: data.type,
    label: data.label,
    short: data.short,
    x: 0,
    y: 0,
    links: [],
    skill: null,
    dc: null,
    environment: null
  };
}

function guaranteeAtLeastOneTreasure(levels) {
  const treasureExists = levels.flat().some((node) => node.type === "treasure");

  if (treasureExists) return;

  const target = pick(levels.flat());
  applyRoomType(target, treasureRoom);
}

function addCampIfEligible(levels) {
  if (levels.length < 5) return;

  const middleLevels = levels.slice(1, -1);
  const preferredCandidates = middleLevels
    .flat()
    .filter((node) => node.type === "normal" || node.type === "trap");
  const fallbackCandidates = middleLevels
    .flat()
    .filter((node) => node.type !== "unknown" && node.type !== "treasure");
  const candidates = preferredCandidates.length > 0 ? preferredCandidates : fallbackCandidates;

  if (candidates.length === 0) return;

  applyRoomType(pick(candidates), campRoom);
}

function getCupLevelNodeCount(levelIndex, depth, edgeNodeCount, middleNodeCount) {
  if (depth <= 1) return edgeNodeCount;

  const progress = levelIndex / (depth - 1);
  const middleWeight = Math.sin(Math.PI * progress);
  const nodeCount = Math.round(
    edgeNodeCount + (middleNodeCount - edgeNodeCount) * middleWeight
  );

  return Math.min(Math.max(nodeCount, MIN_EDGE_NODES), GRID_WIDTH);
}

function pickColumnsForNodeCount(nodeCount) {
  const templates = COLUMN_TEMPLATES[nodeCount] || COLUMN_TEMPLATES[GRID_WIDTH];
  return [...pick(templates)];
}

function createLevel(levelIndex, nodeCount) {
  return pickColumnsForNodeCount(nodeCount).map((column) =>
    createNode(levelIndex + 1, column)
  );
}

function createCupLevels(depth) {
  const edgeNodeCount = randomInt(MIN_EDGE_NODES, MAX_EDGE_NODES);
  const middleNodeCount = randomInt(
    Math.max(MIN_MIDDLE_NODES, edgeNodeCount + 2),
    MAX_MIDDLE_NODES
  );

  return Array.from({ length: depth }, (_, levelIndex) => {
    const nodeCount = getCupLevelNodeCount(
      levelIndex,
      depth,
      edgeNodeCount,
      middleNodeCount
    );

    return createLevel(levelIndex, nodeCount);
  });
}

function getIncomingCount(previousLevel, target) {
  return previousLevel.filter((node) => node.links.includes(target)).length;
}

function sortByDistanceFromColumn(nodes, column) {
  return [...nodes].sort((first, second) => {
    const firstDistance = Math.abs(first.column - column);
    const secondDistance = Math.abs(second.column - column);

    if (firstDistance !== secondDistance) {
      return firstDistance - secondDistance;
    }

    return Math.random() < 0.5 ? -1 : 1;
  });
}

function connectPrimaryPaths(currentLevel, nextLevel) {
  currentLevel.forEach((source) => {
    const sortedTargets = sortByDistanceFromColumn(nextLevel, source.column);
    const underusedTargets = sortedTargets.filter(
      (target) => getIncomingCount(currentLevel, target) === 0
    );
    const target = pick(underusedTargets.slice(0, 2)) || sortedTargets[0];

    source.links.push(target);
  });
}

function ensureEveryNextNodeIsReachable(currentLevel, nextLevel) {
  nextLevel.forEach((target) => {
    if (getIncomingCount(currentLevel, target) > 0) {
      return;
    }

    const source = sortByDistanceFromColumn(currentLevel, target.column)[0];
    source.links.push(target);
  });
}

function addOptionalLinks(currentLevel, nextLevel) {
  currentLevel.forEach((source) => {
    const nearbyTargets = sortByDistanceFromColumn(nextLevel, source.column)
      .filter((target) => !source.links.includes(target))
      .slice(0, 2);

    nearbyTargets.forEach((target) => {
      if (Math.random() < EXTRA_LINK_CHANCE) {
        source.links.push(target);
      }
    });
  });
}

function connectCupLevels(levels) {
  for (let levelIndex = 0; levelIndex < levels.length - 1; levelIndex++) {
    const currentLevel = levels[levelIndex];
    const nextLevel = levels[levelIndex + 1];

    connectPrimaryPaths(currentLevel, nextLevel);
    ensureEveryNextNodeIsReachable(currentLevel, nextLevel);
    addOptionalLinks(currentLevel, nextLevel);
  }
}

function createSlayLikeMap(depth) {
  const levels = createCupLevels(depth);
  connectCupLevels(levels);

  return levels;
}

function convertMergedPathsToUnknown(levels) {
  for (let level = 1; level < levels.length; level++) {
    const previousLevel = levels[level - 1];
    const currentLevel = levels[level];

    currentLevel.forEach((node) => {
      const incomingCount = previousLevel.filter((previousNode) =>
        previousNode.links.includes(node)
      ).length;

      if (incomingCount >= UNKNOWN_INCOMING_THRESHOLD) {
        applyRoomType(node, unknownRoom);
      }
    });
  }
}

export function generateMapData(depth, baseDC) {
  nodeId = 0;
  const levels = createSlayLikeMap(depth);

  guaranteeAtLeastOneTreasure(levels);
  convertMergedPathsToUnknown(levels);
  addCampIfEligible(levels);
  assignEnvironments(levels);
  assignDiscoveryChecks(levels, baseDC);

  return levels;
}
