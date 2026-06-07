import {
  roomTypes,
  skillOptionsByRoomType,
  treasureRoom,
  unknownRoom
} from "./tables.js";

const MIN_NODES_PER_LEVEL = 1;
const MAX_NODES_PER_LEVEL = 4;
const MIN_CONNECTIONS = 1;
const MAX_CONNECTIONS = 3;

let nodeId = 0;

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function chance(value) {
  return Math.random() < value;
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
  const variation = getRandomDCVariation();

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

function getNearbyTargets(index, currentLevelSize, nextLevel) {
  if (nextLevel.length <= 2) return nextLevel;

  const relativePosition = currentLevelSize === 1 ? 0.5 : index / (currentLevelSize - 1);
  const idealIndex = Math.round(relativePosition * (nextLevel.length - 1));
  const targets = [];

  for (let offset = -1; offset <= 1; offset++) {
    const targetIndex = idealIndex + offset;

    if (targetIndex >= 0 && targetIndex < nextLevel.length) {
      targets.push(nextLevel[targetIndex]);
    }
  }

  return targets;
}

function findSharedNeighborTarget(currentLevel, node, alreadyChosen) {
  const neighborLinks = [];

  currentLevel.forEach((otherNode) => {
    if (otherNode === node) return;

    otherNode.links.forEach((target) => {
      if (!alreadyChosen.includes(target)) {
        neighborLinks.push(target);
      }
    });
  });

  if (neighborLinks.length === 0) return null;

  return pick(neighborLinks);
}

function ensureEveryNextNodeIsReachable(currentLevel, nextLevel) {
  nextLevel.forEach((target) => {
    const hasIncomingLink = currentLevel.some((node) => node.links.includes(target));

    if (!hasIncomingLink) {
      const source = pick(currentLevel);
      source.links.push(target);
    }
  });
}

function connectLevels(levels, convergenceChance) {
  for (let level = 0; level < levels.length - 1; level++) {
    const currentLevel = levels[level];
    const nextLevel = levels[level + 1];

    currentLevel.forEach((node, index) => {
      const possibleTargets = getNearbyTargets(index, currentLevel.length, nextLevel);
      const connectionCount = Math.min(
        randomInt(MIN_CONNECTIONS, MAX_CONNECTIONS),
        possibleTargets.length
      );

      const chosenTargets = [];

      for (let i = 0; i < connectionCount; i++) {
        let target = null;

        if (chance(convergenceChance)) {
          target = findSharedNeighborTarget(currentLevel, node, chosenTargets);
        }

        if (!target) {
          target = pick(possibleTargets);
        }

        if (!chosenTargets.includes(target)) {
          chosenTargets.push(target);
        }
      }

      node.links = chosenTargets;
    });

    ensureEveryNextNodeIsReachable(currentLevel, nextLevel);
  }
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
  const levels = [];

  for (let level = 0; level < depth; level++) {
    levels[level] = [];
    let nodeCount;

    if (level === 0) {
      nodeCount = randomInt(2, 4);
    } else if (level === depth - 1) {
      nodeCount = randomInt(1, 3);
    } else {
      nodeCount = randomInt(MIN_NODES_PER_LEVEL, MAX_NODES_PER_LEVEL);
    }

    for (let i = 0; i < nodeCount; i++) {
      levels[level].push(createNode(level + 1));
    }
  }

  connectLevels(levels, convergenceChance);
  convertTotalConvergencesToUnknown(levels);
  guaranteeAtLeastOneTreasure(levels);
  assignDiscoveryChecks(levels, floor);

  return levels;
}
