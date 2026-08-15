function bindMissionToFloor(mission) {
  const floor = mission.destination?.floor;

  if (!floor) return mission;

  return {
    ...mission,
    status: mission.status === "completed" ? "completed" : "materialized",
    integration: {
      ...mission.integration,
      bindings: [{
        kind: mission.destination.kind === "island" ? "island" : "floor",
        floor,
        label: mission.destination.label
      }],
      state: mission.status === "completed" ? "resolved" : "materialized"
    }
  };
}

const NODE_TYPE_SCORES_BY_CATEGORY = {
  anomalous: { trap: 8, unknown: 5, normal: 3, elite: 2, treasure: 1 },
  collection: { treasure: 8, normal: 5, unknown: 4, trap: 2, elite: 1 },
  escort: { treasure: 7, unknown: 5, normal: 4, trap: 3, elite: 1 },
  exploration: { unknown: 8, normal: 5, trap: 2, treasure: 2, elite: 1 },
  extermination: { elite: 8, normal: 6, unknown: 3, trap: 1, treasure: 0 },
  investigation: { unknown: 8, trap: 6, treasure: 4, normal: 3, elite: 1 },
  recovery: { treasure: 8, trap: 5, unknown: 4, normal: 3, elite: 1 },
  rescue: { treasure: 8, trap: 5, unknown: 4, normal: 3, elite: 1 },
  specialHunt: { elite: 9, normal: 6, unknown: 2, trap: 1, treasure: 0 },
  trial: { trap: 7, elite: 5, normal: 4, unknown: 3, treasure: 1 }
};

const SKILL_SCORES_BY_CATEGORY = {
  anomalous: { Misticismo: 5, Investigação: 3, Conhecimento: 2, Vontade: 1 },
  collection: { Sobrevivência: 4, Investigação: 3, Percepção: 2, Ofício: 1 },
  escort: { Furtividade: 4, Sobrevivência: 3, Percepção: 2, Reflexos: 1 },
  exploration: { Sobrevivência: 5, Percepção: 4, Conhecimento: 2, Atletismo: 1 },
  extermination: { Sobrevivência: 5, Percepção: 3, Guerra: 2, Intimidação: 1 },
  investigation: { Investigação: 5, Percepção: 3, Intuição: 2, Conhecimento: 1 },
  recovery: { Investigação: 5, Ladinagem: 3, Percepção: 2, Sobrevivência: 1 },
  rescue: { Investigação: 5, Percepção: 3, Ladinagem: 2, Sobrevivência: 1 },
  specialHunt: { Sobrevivência: 5, Percepção: 3, Guerra: 2, Intimidação: 1 },
  trial: { Acrobacia: 4, Atletismo: 4, Reflexos: 3, Fortitude: 2, Vontade: 2, Misticismo: 1 }
};

function getBindingLabel(node) {
  return node.label || node.revealedLabel || `Nodo ${node.id}`;
}

function getNodeChallengeValue(node) {
  return Number(node.challenge?.total || node.challenge?.encounter || 0);
}

function getChallengeScore(node, mission) {
  const nodeChallenge = getNodeChallengeValue(node);
  const missionChallenge = Number(mission.reward?.challenge || mission.objective?.challenge || 0);

  if (!nodeChallenge || !missionChallenge) return 0;

  return Math.max(0, 5 - Math.abs(nodeChallenge - missionChallenge));
}

function getSkillScore(node, mission) {
  return SKILL_SCORES_BY_CATEGORY[mission.category]?.[node.skill] || 0;
}

function getTypeScore(node, mission) {
  return NODE_TYPE_SCORES_BY_CATEGORY[mission.category]?.[node.type] || 0;
}

function getContentScore(node, mission) {
  const targetType = mission.objective?.targetType;

  if (targetType === "creature" && node.creature) return 4;
  if (targetType !== "creature" && node.type === "treasure") return 3;
  if (["clue", "memento", "object", "phenomenon"].includes(targetType) && node.trap) return 2;
  if (mission.category === "trial" && node.trap) return 3;
  if (mission.category === "anomalous" && node.environment?.climate?.some((climate) => climate.name !== "Clima normal")) return 2;

  return 0;
}

function getUsagePenalty(node, usedNodeIds) {
  if (usedNodeIds.has(node.id)) return 20;
  if (node.missionBindings?.length) return node.missionBindings.length * 4;

  return 0;
}

function scoreNodeForMission(node, mission, usedNodeIds) {
  if (["boss", "camp"].includes(node.type)) return -Infinity;

  return getTypeScore(node, mission)
    + getSkillScore(node, mission)
    + getChallengeScore(node, mission)
    + getContentScore(node, mission)
    - getUsagePenalty(node, usedNodeIds);
}

function getNodeBindingReason(node, mission) {
  const pieces = [
    getBindingLabel(node),
    node.skill && node.dc ? `${node.skill} CD ${node.dc}` : null,
    node.challenge?.total ? `ND ${node.challenge.total}` : null,
    node.trap ? `risco: ${node.trap.name}` : null,
    node.creature ? `ameaça: ${node.creature.name}` : null
  ].filter(Boolean);

  if (!pieces.length) return mission.destination?.label || "Ponto compatível";

  return pieces.join(" | ");
}

function pickBestNodeForMission(levels, mission, usedNodeIds) {
  return levels
    .flat()
    .map((node) => ({
      node,
      score: scoreNodeForMission(node, mission, usedNodeIds)
    }))
    .filter((candidate) => Number.isFinite(candidate.score))
    .sort((left, right) => {
      if (right.score !== left.score) return right.score - left.score;
      if (left.node.level !== right.node.level) return left.node.level - right.node.level;
      if (left.node.column !== right.node.column) return left.node.column - right.node.column;
      return left.node.id - right.node.id;
    })[0]?.node || null;
}

function clearMissionBindings(levels, missionIds) {
  if (!levels) return;

  levels.flat().forEach((node) => {
    if (!node.missionBindings?.length) return;

    node.missionBindings = node.missionBindings.filter((binding) => !missionIds.has(binding.id));
    if (!node.missionBindings.length) delete node.missionBindings;
  });
}

function materializeMissionOnNode(mission, node, floor) {
  const binding = {
    kind: "node",
    floor,
    nodeId: node.id,
    label: getBindingLabel(node),
    context: getNodeBindingReason(node, mission)
  };

  node.missionBindings = [...(node.missionBindings || []), {
    id: mission.id,
    title: mission.title,
    categoryLabel: mission.categoryLabel,
    context: binding.context
  }];

  return {
    ...mission,
    status: "materialized",
    integration: {
      ...mission.integration,
      bindings: [binding],
      state: "materialized"
    }
  };
}

const OBJECTIVE_TYPE_SCORES_BY_CATEGORY = {
  anomalous: { "objetivo principal": 7, "cena da ilha": 5, boss: 1 },
  collection: { "cena da ilha": 6, "objetivo principal": 4, boss: 0 },
  escort: { "cena da ilha": 6, "objetivo principal": 4, boss: 0 },
  exploration: { "objetivo principal": 7, "cena da ilha": 5, boss: 1 },
  investigation: { "cena da ilha": 7, "objetivo principal": 4, boss: 0 },
  recovery: { "cena da ilha": 6, "objetivo principal": 5, boss: 0 },
  rescue: { "cena da ilha": 6, "objetivo principal": 5, boss: 0 },
  trial: { "cena da ilha": 6, "objetivo principal": 5, boss: 1 }
};

function scoreObjectiveForMission(objective, mission, usedObjectiveKeys, islandFloor) {
  const key = `${islandFloor}:${objective.id}`;
  const typeScore = OBJECTIVE_TYPE_SCORES_BY_CATEGORY[mission.category]?.[objective.type] || 2;
  const missionChallenge = Number(mission.reward?.challenge || mission.objective?.challenge || 0);
  const objectiveChallenge = Number(objective.challenge || 0);
  const challengeScore = missionChallenge && objectiveChallenge
    ? Math.max(0, 5 - Math.abs(objectiveChallenge - missionChallenge))
    : 0;
  const mainTargetScore = objective.type === "objetivo principal" && mission.objective?.targetType === "location" ? 3 : 0;
  const usagePenalty = usedObjectiveKeys.has(key) ? 20 : 0;

  return typeScore + challengeScore + mainTargetScore - usagePenalty;
}

function pickBestObjectiveForMission(island, mission, usedObjectiveKeys) {
  return (island.objectives || [])
    .map((objective) => ({
      objective,
      score: scoreObjectiveForMission(objective, mission, usedObjectiveKeys, island.floor)
    }))
    .sort((left, right) => {
      if (right.score !== left.score) return right.score - left.score;
      return String(left.objective.id).localeCompare(String(right.objective.id));
    })[0]?.objective || null;
}

function getObjectiveBindingContext(island, objective) {
  return `${island.name || `Ilha ${island.floor}`} | ${objective.title} | ${objective.type} | ND ${objective.challenge}`;
}

function materializeMissionOnObjective(mission, island, objective) {
  const binding = {
    kind: "objective",
    floor: island.floor,
    objectiveId: objective.id,
    label: objective.title,
    context: getObjectiveBindingContext(island, objective)
  };

  return {
    ...mission,
    status: "materialized",
    integration: {
      ...mission.integration,
      bindings: [binding],
      state: "materialized"
    }
  };
}

function getIslandByFloor(islands, floor) {
  return (islands || []).find((island) => island.floor === floor) || null;
}

export function materializeMissionsForCurrentContent({ floor, islands = null, levels = null, missions }) {
  const missionIds = new Set(missions.map((mission) => mission.id));
  const usedNodeIds = new Set();
  const usedObjectiveKeys = new Set();

  clearMissionBindings(levels, missionIds);

  const nextMissions = missions.map((mission) => {
    if (mission.status === "completed") return mission;

    if (islands?.length && mission.destination?.floor) {
      const island = getIslandByFloor(islands, mission.destination.floor);
      const objective = island ? pickBestObjectiveForMission(island, mission, usedObjectiveKeys) : null;

      if (island && objective) {
        usedObjectiveKeys.add(`${island.floor}:${objective.id}`);
        return materializeMissionOnObjective(mission, island, objective);
      }
    }

    if (levels && mission.destination?.floor === floor) {
      const candidate = pickBestNodeForMission(levels, mission, usedNodeIds);
      if (candidate) {
        usedNodeIds.add(candidate.id);
        return materializeMissionOnNode(mission, candidate, floor);
      }
    }

    return bindMissionToFloor(mission);
  });

  return nextMissions;
}
