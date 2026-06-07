import {
  roomTypes,
  skillOptionsByRoomType,
  treasureRoom,
  unknownRoom
} from "./tables.js";

const MIN_INITIAL_NODES = 2;
const MAX_INITIAL_NODES = 4;
const MIN_CHILDREN_PER_NODE = 1;
const MAX_CHILDREN_PER_NODE = 4;

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

function getBaseDCByFloor(floor) {
  if (floor <= 12) return 15;
  if (floor <= 15) return 20;
  if (floor <= 18) return 25;
  return 30;
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

function assignDiscoveryCheck(node, floor) {
  if (node.type === "unknown") {
    node.skill = null;
    node.dc = null;
    return;
  }

  const options = skillOptionsByRoomType[node.type] || skillOptionsByRoomType.normal;
  const baseDC = getBaseDCByFloor(floor);
  const modifier = getRoomTypeDCModifier(node.type);
  const variation = node.type === "elite" ? 0 : getRandomDCVariation();

  node.skill = pickWeightedSkill(options);
  node.dc = Math.min(Math.max(baseDC + modifier + variation, 5), 40);
}

function assignDiscoveryChecks(levels, floor) {
  levels.flat().forEach((node) => {
    assignDiscoveryCheck(node, floor);
  });
}

function applyRoomType(node, roomData) {
  node.type = roomData.type;
  node.label = roomData.label;
  node.short = roomData.short;
  node.skill = null;
  node.dc = null;
}

function createNode(level) {
  const data = pickWeightedRoomType();

  return {
    id: nodeId++,
    level,
    type: data.type,
    label: data.label,
    short: data.short,
    x: 0,
    y: 0,
    links: [],
    skill: null,
    dc: null
  };
}

function guaranteeAtLeastOneTreasure(levels) {
  const treasureExists = levels.flat().some((node) => node.type === "treasure");

  if (treasureExists) return;

  const target = pick(levels.flat());
  applyRoomType(target, treasureRoom);
}

function createInitialLevel() {
  const nodeCount = randomInt(MIN_INITIAL_NODES, MAX_INITIAL_NODES);

  return Array.from({ length: nodeCount }, () => createNode(1));
}

function createNextLevel(currentLevel, nextLevelNumber, convergenceChance) {
  const nextLevel = [];
  const ownChildrenBySource = new Map();

  currentLevel.forEach((source) => {
    const childCount = randomInt(MIN_CHILDREN_PER_NODE, MAX_CHILDREN_PER_NODE);
    const children = Array.from({ length: childCount }, () => createNode(nextLevelNumber));

    source.links = [...children];
    ownChildrenBySource.set(source, children);
    nextLevel.push(...children);
  });

  currentLevel.forEach((source) => {
    const ownChildren = ownChildrenBySource.get(source);

    nextLevel.forEach((target) => {
      if (ownChildren.includes(target)) {
        return;
      }

      if (Math.random() < convergenceChance) {
        source.links.push(target);
      }
    });
  });

  return nextLevel;
}

function convertTotalConvergencesToUnknown(levels) {
  for (let level = 1; level < levels.length; level++) {
    const previousLevel = levels[level - 1];
    const currentLevel = levels[level];

    currentLevel.forEach((node) => {
      const incomingCount = previousLevel.filter((previousNode) =>
        previousNode.links.includes(node)
      ).length;

      const isTotalConvergence =
        previousLevel.length > 1 && incomingCount === previousLevel.length;

      if (isTotalConvergence) {
        applyRoomType(node, unknownRoom);
      }
    });
  }
}

export function generateMapData(depth, convergenceChance, floor) {
  nodeId = 0;
  const levels = [createInitialLevel()];

  for (let level = 1; level < depth; level++) {
    levels[level] = createNextLevel(levels[level - 1], level + 1, convergenceChance);
  }

  convertTotalConvergencesToUnknown(levels);
  guaranteeAtLeastOneTreasure(levels);
  assignDiscoveryChecks(levels, floor);

  return levels;
}
