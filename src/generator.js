import { getEncounterSeed, resolveForestElite, resolveForestTrapNode } from "./encounterResolver.js";
import { assignChallengeRating, formatChallengeRating, updateForestChallengeTotal } from "./challenge.js";
import { assignCreatureProfile } from "./creatures.js";
import { assignForestNormalTrap, assignTrapProfile } from "./traps.js";
import { generateEnvironmentContext } from "./environment.js";
import { createForestBossEncounter } from "./forestBossEncounter.js";
import { assignForestEnvironments } from "./forestEnvironment.js";
import { chooseForestUnknownScene, FOREST_UNKNOWN_REVEALS, isForestSceneReveal } from "./forestUnknownScenes.js";
import { pick, pickWeighted, randomInt } from "./random.js";
import {
  bossRoom,
  campRoom,
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
const UNKNOWN_REVEAL_OPTIONS_WITHOUT_CAMP = [
  "Encontro normal",
  "Encontro elite",
  "Armadilha",
  "Tesouro"
];
const UNKNOWN_REVEAL_OPTIONS = [...UNKNOWN_REVEAL_OPTIONS_WITHOUT_CAMP, "Acampamento"];

const COLUMN_TEMPLATES = {
  3: [[1, 3, 5], [0, 3, 6], [1, 2, 4]],
  4: [[1, 2, 4, 5], [0, 2, 4, 6], [1, 3, 4, 6]],
  5: [[0, 1, 3, 5, 6], [0, 2, 3, 4, 6], [1, 2, 3, 4, 5]],
  6: [[0, 1, 2, 4, 5, 6], [0, 1, 3, 4, 5, 6]],
  7: [[0, 1, 2, 3, 4, 5, 6]]
};

let nodeId = 0;

function getRoomTypeDCModifier(rng, type) {
  if (type === "elite") {
    return randomInt(rng, 2, 5);
  }

  return 0;
}

function getRandomDCVariation(rng) {
  return pickWeighted(rng, [
    { modifier: 0, weight: 40 },
    { modifier: -3, weight: 10 },
    { modifier: -2, weight: 10 },
    { modifier: -1, weight: 10 },
    { modifier: 1, weight: 10 },
    { modifier: 2, weight: 10 },
    { modifier: 3, weight: 10 }
  ]).modifier;
}

function pickWeightedSkill(rng, options) {
  return pickWeighted(rng, options).skill;
}

function pickWeightedRoomType(rng, profile) {
  return pickWeighted(rng, profile.encounterRules.roomTypes);
}

function assignEnvironments(levels, profile, rng) {
  levels.flat().forEach((node) => {
    node.environment = generateEnvironmentContext({
      avoidDamagingClimate: node.type === "camp",
      environmentRules: profile.environmentRules,
      rng
    });
  });
}

function pickUnknownReveal(rng, campChance) {
  if (campChance == null) return pick(rng, UNKNOWN_REVEAL_OPTIONS);

  const roll = rng();
  const otherChance = 1 - campChance;
  if (roll >= otherChance) return "Acampamento";
  const options = UNKNOWN_REVEAL_OPTIONS_WITHOUT_CAMP;
  return options[Math.floor(roll / otherChance * options.length)];
}

function assignUnknownReveals(levels, rng, campChance, outdoorScenes) {
  levels.flat().forEach((node) => {
    if (node.type !== "unknown") return;
    node.revealedLabel = outdoorScenes
      ? pickWeighted(rng, FOREST_UNKNOWN_REVEALS).label
      : pickUnknownReveal(rng, campChance);
  });
}


function assignChallengeRatings(levels, profile, floor) {
  levels.flat().forEach((node) => {
    assignChallengeRating(node, floor, profile);
  });
}

function assignTrapProfiles(levels, profile, rng, mapSeed, visibleTypes, floor) {
  levels.flat().forEach((node) => {
    if (node.generationVersion === 5 && node.type === "normal") {
      assignForestNormalTrap(node, profile, rng);
    } else if (node.generationVersion === 5 && ["trap", "elite"].includes(node.type)) {
      const seed = getEncounterSeed(node, mapSeed ?? String(rng()));
      const resolve = node.type === "elite" ? resolveForestElite : resolveForestTrapNode;
      const { trap, items, creatureTarget, variant = "trap", effectiveType } = resolve(node, profile, { seed });
      if (effectiveType === "normal") {
        node.type = node.contentType = "normal";
        const room = profile.encounterRules.roomTypes.find(room => room.type === "normal");
        if (visibleTypes.get(node.id) === "unknown") node.revealedLabel = room.label;
        else {
          node.label = room.label;
          node.short = room.short;
          visibleTypes.set(node.id, "normal");
        }
        assignChallengeRating(node, floor, profile);
        assignForestNormalTrap(node, profile, rng);
        return;
      }
      node.trap = trap;
      node.forestComposition = {
        variant, seed, creatures: items.map(({ creatureId, quantity }) => ({ id: creatureId, quantity }))
      };
      node.challenge.trap = trap?.challengeRating ?? 0;
      node.challenge.creatures = creatureTarget;
      const parts = trap ? [`ND ${formatChallengeRating(node.challenge.trap)} em armadilha`] : [];
      if (creatureTarget) parts.push(`ND ${formatChallengeRating(creatureTarget)} em criaturas`);
      node.challenge.encounterBudgetLabel = parts.join(" + ");
      updateForestChallengeTotal(node, profile.challengeRules);
    } else {
      assignTrapProfile(node, profile, rng);
      // Tesouro e acampamento v5 não têm ficha nem armadilha: zera as parcelas.
      if (node.generationVersion === 5 && ["treasure", "camp"].includes(node.contentType ?? node.type)) {
        node.challenge.creatures = 0;
        node.challenge.trap = 0;
      }
    }
  });
}

function assignCreatureProfiles(levels, profile, rng) {
  levels.flat().forEach((node) => {
    assignCreatureProfile(node, profile, rng);
  });
}

function assignDiscoveryCheck(node, baseDC, rng) {
  if (node.type === "unknown" || node.type === "camp" || node.type === "boss" || node.scene?.kind === "falseRest") {
    node.skill = null;
    node.dc = null;
    return;
  }

  const options = skillOptionsByRoomType[node.type] || skillOptionsByRoomType.normal;
  const modifier = getRoomTypeDCModifier(rng, node.type);
  const variation = node.type === "elite" ? 0 : getRandomDCVariation(rng);

  node.skill = node.scene?.skill || pickWeightedSkill(rng, options);
  node.dc = Math.max(baseDC + modifier + variation, 5);
}

function assignDiscoveryChecks(levels, baseDC, rng) {
  levels.flat().forEach((node) => {
    assignDiscoveryCheck(node, baseDC, rng);
  });
}

function getClimateEventCount(node) {
  return node.environment.climate.filter((climate) => climate.name !== "Clima normal").length;
}

function assignInvestigationTime(node, rule) {
  if (!node.skill || !node.dc) {
    node.investigationMinutes = rule.noCheckMinutes;
    return;
  }

  const climateEventCount = getClimateEventCount(node);
  const { minimumMinutes = rule.incrementMinutes, difficultTerrainNd = Infinity } = rule;
  const difficultTerrain = Number(node.challenge.terrain >= difficultTerrainNd);
  const minutes = minimumMinutes + rule.incrementMinutes * (climateEventCount + difficultTerrain);

  node.investigationMinutes = Math.min(minutes, rule.maxMinutes);
}

function assignInvestigationTimes(levels, profile, version) {
  const { timeRule, expeditionTimeRule } = profile.encounterRules;
  const rule = version >= 2 && expeditionTimeRule ? { ...timeRule, ...expeditionTimeRule } : timeRule;
  levels.flat().forEach((node) => {
    assignInvestigationTime(node, rule);
  });
}

function applyRoomType(node, roomData) {
  node.type = roomData.type;
  node.label = roomData.label;
  node.short = roomData.short;
  node.skill = null;
  node.dc = null;
  node.investigationMinutes = null;
  node.revealedLabel = null;
  node.challenge = null;
  node.creature = null;
  node.trap = null;
  node.resolvedEncounter = null;
}

function createNode(level, column, profile, rng) {
  const data = pickWeightedRoomType(rng, profile);
  const id = nodeId++;

  return {
    id,
    encounterSeed: `N${id}`,
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
    investigationMinutes: null,
    revealedLabel: null,
    environment: null,
    challenge: null,
    creature: null,
    trap: null,
    resolvedEncounter: null
  };
}

function guaranteeAtLeastOneTreasure(levels, rng) {
  const treasureExists = levels.flat().some((node) => node.type === "treasure");

  if (treasureExists) return;

  const preferredCandidates = levels.flat().filter((node) => node.type !== "boss" && node.type !== "camp");
  const fallbackCandidates = levels.flat().filter((node) => node.type !== "boss");
  const candidates = preferredCandidates.length > 0 ? preferredCandidates : fallbackCandidates;

  if (candidates.length === 0) return;

  const target = pick(rng, candidates);
  applyRoomType(target, treasureRoom);
}

function getCampRules(profile) {
  return profile.encounterRules?.camps || {
    fullLevelEvery: null,
    guaranteedOneEvery: 4,
    extraNodeChance: 0
  };
}

function getCampLevelIndexes(levels, every) {
  if (!every) return [];

  return levels
    .map((_, levelIndex) => levelIndex)
    .filter((levelIndex) => (levelIndex + 1) % every === 0);
}

function pickCampNode(levelNodes, rng) {
  const preferredCandidates = levelNodes.filter(
    (node) => node.type === "normal" || node.type === "trap"
  );
  const fallbackCandidates = levelNodes.filter(
    (node) => node.type !== "treasure" && node.type !== "camp" && node.type !== "boss"
  );
  const candidates = preferredCandidates.length > 0 ? preferredCandidates : fallbackCandidates;

  return candidates.length > 0 ? pick(rng, candidates) : pick(rng, levelNodes);
}

function addGuaranteedCampLevels(levels, rng, every) {
  getCampLevelIndexes(levels, every).forEach((levelIndex) => {
    const levelNodes = levels[levelIndex].filter((node) => node.type !== "boss");

    if (levelNodes.length > 0) {
      applyRoomType(pickCampNode(levelNodes, rng), campRoom);
    }
  });
}

function addFullCampLevels(levels, every) {
  getCampLevelIndexes(levels, every).forEach((levelIndex) => {
    levels[levelIndex]
      .filter((node) => node.type !== "boss")
      .forEach((node) => applyRoomType(node, campRoom));
  });
}

function addRandomExtraCamps(levels, rng, chance, excludedEvery) {
  if (!chance) return;

  levels.forEach((levelNodes, levelIndex) => {
    if (excludedEvery && (levelIndex + 1) % excludedEvery === 0) return;

    levelNodes.forEach((node) => {
      if (node.type !== "boss" && rng() < chance) {
        applyRoomType(node, campRoom);
      }
    });
  });
}

function addCampsIfEligible(levels, profile, rng) {
  const rules = getCampRules(profile);

  if (rules.fullLevelEvery) {
    addFullCampLevels(levels, rules.fullLevelEvery);
  } else {
    addGuaranteedCampLevels(levels, rng, rules.guaranteedOneEvery);
  }

  addRandomExtraCamps(levels, rng, rules.extraNodeChance, rules.fullLevelEvery);
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

function pickColumnsForNodeCount(nodeCount, rng) {
  const templates = COLUMN_TEMPLATES[nodeCount] || COLUMN_TEMPLATES[GRID_WIDTH];
  return [...pick(rng, templates)];
}

function createLevel(levelIndex, nodeCount, profile, rng) {
  return pickColumnsForNodeCount(nodeCount, rng).map((column) =>
    createNode(levelIndex + 1, column, profile, rng)
  );
}

function createCupLevels(depth, profile, rng) {
  const edgeNodeCount = randomInt(rng, MIN_EDGE_NODES, MAX_EDGE_NODES);
  const middleNodeCount = randomInt(
    rng,
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

    return createLevel(levelIndex, nodeCount, profile, rng);
  });
}

function getIncomingCount(previousLevel, target) {
  return previousLevel.filter((node) => node.links.includes(target)).length;
}

function sortByDistanceFromColumn(nodes, column, rng) {
  return [...nodes].sort((first, second) => {
    const firstDistance = Math.abs(first.column - column);
    const secondDistance = Math.abs(second.column - column);

    if (firstDistance !== secondDistance) {
      return firstDistance - secondDistance;
    }

    return rng() < 0.5 ? -1 : 1;
  });
}

function connectPrimaryPaths(currentLevel, nextLevel, rng) {
  currentLevel.forEach((source) => {
    const sortedTargets = sortByDistanceFromColumn(nextLevel, source.column, rng);
    const underusedTargets = sortedTargets.filter(
      (target) => getIncomingCount(currentLevel, target) === 0
    );
    const target = pick(rng, underusedTargets.slice(0, 2)) || sortedTargets[0];

    source.links.push(target);
  });
}

function ensureEveryNextNodeIsReachable(currentLevel, nextLevel, rng) {
  nextLevel.forEach((target) => {
    if (getIncomingCount(currentLevel, target) > 0) {
      return;
    }

    const source = sortByDistanceFromColumn(currentLevel, target.column, rng)[0];
    source.links.push(target);
  });
}

function addOptionalLinks(currentLevel, nextLevel, rng) {
  currentLevel.forEach((source) => {
    const nearbyTargets = sortByDistanceFromColumn(nextLevel, source.column, rng)
      .filter((target) => !source.links.includes(target))
      .slice(0, 2);

    nearbyTargets.forEach((target) => {
      if (rng() < EXTRA_LINK_CHANCE) {
        source.links.push(target);
      }
    });
  });
}

function connectCupLevels(levels, rng) {
  for (let levelIndex = 0; levelIndex < levels.length - 1; levelIndex++) {
    const currentLevel = levels[levelIndex];
    const nextLevel = levels[levelIndex + 1];

    connectPrimaryPaths(currentLevel, nextLevel, rng);
    ensureEveryNextNodeIsReachable(currentLevel, nextLevel, rng);
    addOptionalLinks(currentLevel, nextLevel, rng);
  }
}

function createSlayLikeMap(depth, profile, rng) {
  const levels = createCupLevels(depth, profile, rng);
  connectCupLevels(levels, rng);

  return levels;
}


function shouldAddBoss(profile, floor) {
  const bossRules = profile.encounterRules.boss;

  if (!bossRules?.enabled) return false;
  if (!bossRules.finalFloorOnly) return true;

  return floor === Math.max(...profile.floors);
}

function addFinalBoss(levels, profile, floor) {
  if (!shouldAddBoss(profile, floor)) return;

  const id = nodeId++;
  const boss = {
    id,
    encounterSeed: `N${id}`,
    level: levels.length,
    column: Math.floor(GRID_WIDTH / 2),
    type: bossRoom.type,
    label: bossRoom.label,
    short: bossRoom.short,
    x: 0,
    y: 0,
    links: [],
    skill: null,
    dc: null,
    investigationMinutes: null,
    revealedLabel: null,
    environment: null,
    challenge: null,
    creature: null,
    trap: null,
    resolvedEncounter: null
  };

  levels[levels.length - 1] = [boss];

  if (levels.length > 1) {
    levels[levels.length - 2].forEach((node) => {
      node.links = [boss];
    });
  }
}

function convertMergedPathsToUnknown(levels) {
  for (let level = 1; level < levels.length; level++) {
    const previousLevel = levels[level - 1];
    const currentLevel = levels[level];

    currentLevel.forEach((node) => {
      const incomingCount = previousLevel.filter((previousNode) =>
        previousNode.links.includes(node)
      ).length;

      if (node.type !== "boss" && incomingCount >= UNKNOWN_INCOMING_THRESHOLD) {
        applyRoomType(node, unknownRoom);
      }
    });
  }
}

export function generateMapData(depth, baseDC, floorProfile, floor, rng = Math.random, { version = 1, mapSeed } = {}) {
  const weights = version >= 3 ? floorProfile.encounterRules.expeditionRoomTypeWeights : null;
  const profile = weights ? {
    ...floorProfile,
    encounterRules: {
      ...floorProfile.encounterRules,
      roomTypes: floorProfile.encounterRules.roomTypes.map(room => ({ ...room, weight: weights[room.type] ?? room.weight }))
    }
  } : floorProfile;
  nodeId = 0;
  const levels = createSlayLikeMap(depth, profile, rng);

  addFinalBoss(levels, profile, floor);
  if (!weights) convertMergedPathsToUnknown(levels);
  addCampsIfEligible(levels, profile, rng);
  guaranteeAtLeastOneTreasure(levels, rng);
  assignUnknownReveals(levels, rng, version >= 2 ? profile.encounterRules.unknownCampChance : undefined, Boolean(weights));
  // A versão 1 mantém a ordem e as regras usadas por códigos de sessão antigos.
  // Na versão 2 o conteúdo real dirige toda a mecânica; o tipo visível continua ?.
  const visibleTypes = new Map();
  if (version >= 2) {
    const contentTypes = {
      "Encontro normal": "normal", "Encontro elite": "elite", "Armadilha": "trap",
      "Tesouro": "treasure", "Acampamento": "camp"
    };
    levels.flat().forEach((node) => {
      visibleTypes.set(node.id, node.type);
      if (node.type === "unknown") {
        node.contentType = isForestSceneReveal(node.revealedLabel) ? "scene" : contentTypes[node.revealedLabel];
      } else {
        node.contentType = node.type;
      }
      node.type = node.contentType;
      node.requiresCompletion = true;
      if (version === 5 && profile.id === "forest-11-20") {
        node.generationVersion = version;
        node.encounterSeed = `${floor}:${node.encounterSeed}`;
      }
    });
  }
  if (version >= 4 && profile.id === "forest-11-20") {
    assignForestEnvironments(levels, profile.environmentRules, rng);
  } else {
    assignEnvironments(levels, profile, rng);
  }
  if (weights) {
    for (const node of levels.flat().filter(node => node.contentType === "scene")) {
      node.scene = chooseForestUnknownScene(node.revealedLabel, node.environment, rng);
      node.revealedLabel = node.scene.title;
    }
  }
  assignChallengeRatings(levels, profile, floor);
  assignTrapProfiles(levels, profile, rng, mapSeed, visibleTypes, floor);
  assignCreatureProfiles(levels, profile, rng);
  assignDiscoveryChecks(levels, baseDC, rng);
  assignInvestigationTimes(levels, profile, version);

  if (version >= 2) {
    levels.flat().forEach((node) => {
      node.type = visibleTypes.get(node.id);
      if (node.contentType === "camp") {
        node.safeRest = {
          protectedFrom: ["climate", "terrain"],
          description: "Descanso verdadeiro: abrigo firme e protegido, fora da correnteza, de quedas e de outros riscos do terreno. Os efeitos de clima e terreno descritos ao redor não atingem o grupo durante o descanso neste acampamento."
        };
      }
      if (profile.id === "forest-11-20" && node.type === "boss") createForestBossEncounter(node);
    });
  }

  return levels;
}
