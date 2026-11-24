import { getEncounterForSave } from "./encounterCreatureHealth.js";
import { syncRerolledTrapProfile } from "./traps.js";

export const DISCOVERY_MINUTES = 15;

export function getRecordedExplorationMinutes(levels, sessionState) {
  const chosen = new Set((sessionState.chosenByLevel || []).map(([, id]) => id));
  const scouting = new Set(sessionState.attempted || []);
  for (const id of sessionState.explored || []) {
    if (!chosen.has(id)) scouting.add(id);
  }
  const travelMinutes = levels.flat().reduce((minutes, node) =>
    minutes + (chosen.has(node.id) ? node.investigationMinutes || 0 : 0), 0
  );
  return travelMinutes + scouting.size * DISCOVERY_MINUTES;
}

export function createExplorationState() {
  let levels = [];
  let activeNodeIds = new Set();
  let chosenNodeIds = new Set();
  let chosenNodeByLevel = new Map();
  let exploredNodeIds = new Set();
  let attemptedNodeIds = new Set();
  let restedNodeIds = new Set();
  let completedNodeIds = new Set();
  let elapsedMinutes = 0;
  let totalElapsedMinutes = 0;
  let totalElapsedPartial = false;
  let unknownPathsEnabled = false;

  function setLevels(nextLevels, { resetTime = false } = {}) {
    levels = nextLevels;
    chosenNodeIds = new Set();
    chosenNodeByLevel = new Map();
    exploredNodeIds = new Set();
    attemptedNodeIds = new Set();
    restedNodeIds = new Set();
    completedNodeIds = new Set();
    activeNodeIds = new Set(levels[0].map((node) => node.id));
    if (resetTime) {
      elapsedMinutes = 0;
      totalElapsedMinutes = 0;
      totalElapsedPartial = false;
    }
  }


  function findNodeById(nodeId) {
    return levels.flat().find((node) => node.id === nodeId);
  }

  function rebuildActiveNodesFromChosenRoutes() {
    activeNodeIds = new Set();

    if (chosenNodeByLevel.size === 0) {
      activeNodeIds = new Set(levels[0].map((node) => node.id));
      return;
    }

    const highestChosenLevel = Math.max(...chosenNodeByLevel.keys());
    const chosenNode = findNodeById(chosenNodeByLevel.get(highestChosenLevel));

    if (chosenNode && (!chosenNode.requiresCompletion || isNodeCompleted(chosenNode)) && chosenNode.level < levels.length) {
      activeNodeIds = new Set(chosenNode.links.map((node) => node.id));
    }
  }

  function exportSessionState() {
    const resolvedEncounters = levels
      .flat()
      .filter((node) => node.resolvedEncounter)
      .map((node) => [node.id, getEncounterForSave(node.resolvedEncounter)]);

    return {
      attempted: [...attemptedNodeIds],
      chosenByLevel: [...chosenNodeByLevel.entries()],
      elapsedMinutes,
      ...getExplorationTime(),
      completed: [...completedNodeIds],
      explored: [...exploredNodeIds],
      resolvedEncounters,
      rested: [...restedNodeIds]
    };
  }

  function importSessionState(sessionState = {}) {
    chosenNodeByLevel = new Map(sessionState.chosenByLevel || []);
    chosenNodeIds = new Set([...chosenNodeByLevel.values()]);
    exploredNodeIds = new Set(sessionState.explored || []);
    attemptedNodeIds = new Set(sessionState.attempted || []);
    restedNodeIds = new Set(sessionState.rested || []);
    completedNodeIds = new Set(sessionState.completed || []);
    elapsedMinutes = sessionState.elapsedMinutes || 0;
    totalElapsedMinutes = sessionState.totalElapsedMinutes ?? elapsedMinutes;
    totalElapsedPartial = Boolean(sessionState.totalElapsedPartial);

    const resolvedEncounterByNode = new Map(sessionState.resolvedEncounters || []);
    levels.flat().forEach((node) => {
      node.resolvedEncounter = getEncounterForSave(resolvedEncounterByNode.get(node.id)) || null;
      syncRerolledTrapProfile(node);
    });

    rebuildActiveNodesFromChosenRoutes();
  }

  function getLevels() {
    return levels;
  }

  function getElapsedMinutes() {
    return elapsedMinutes;
  }

  function getExplorationTime() {
    return { totalElapsedMinutes, totalElapsedPartial };
  }

  function addElapsedMinutes(minutes) {
    elapsedMinutes += minutes;
    totalElapsedMinutes += minutes;
  }

  function resetElapsedMinutes() {
    elapsedMinutes = 0;
  }

  function restAtNode(node) {
    if (!canRestAtNode(node)) return false;

    restedNodeIds.add(node.id);
    resetElapsedMinutes();
    return true;
  }

  function isUnknownPathsEnabled() {
    return unknownPathsEnabled;
  }

  function setUnknownPathsEnabled(isEnabled) {
    unknownPathsEnabled = isEnabled;
  }

  function isNodeChosen(node) {
    return chosenNodeIds.has(node.id);
  }

  function isNodeActive(node) {
    return activeNodeIds.has(node.id);
  }

  function isNodeExplored(node) {
    return exploredNodeIds.has(node.id);
  }

  function isNodeAttempted(node) {
    return attemptedNodeIds.has(node.id);
  }

  function isNodeRested(node) {
    return restedNodeIds.has(node.id);
  }

  function isNodeCompleted(node) {
    return completedNodeIds.has(node.id);
  }

  function hasChosenRouteAfter(node) {
    return [...chosenNodeByLevel.keys()].some((level) => level > node.level);
  }

  function canRestAtNode(node) {
    const isCamp = node.contentType === "camp" || node.type === "camp"
      || (node.type === "unknown" && node.revealedLabel === "Acampamento");
    return isCamp && isNodeChosen(node) && !isNodeRested(node) && !hasChosenRouteAfter(node);
  }

  function canOpenNode(node) {
    return isNodeActive(node) || isNodeChosen(node);
  }

  function isNodeRevealed(node) {
    if (node.requiresCompletion && node.type === "unknown" && !isNodeChosen(node)) return false;
    return !unknownPathsEnabled || isNodeExplored(node) || isNodeChosen(node);
  }

  function isNodeVisibleOnMap(node) {
    if (!unknownPathsEnabled) return true;
    return isNodeActive(node) || isNodeChosen(node);
  }

  function getNodeViewState(node) {
    const chosen = isNodeChosen(node);
    const active = isNodeActive(node);
    const explored = isNodeExplored(node);
    const attempted = isNodeAttempted(node);
    const visible = isNodeVisibleOnMap(node);
    const revealed = isNodeRevealed(node);

    return {
      active,
      attempted,
      canOpen: canOpenNode(node),
      chosen,
      completed: isNodeCompleted(node),
      explored,
      locked: !active && !chosen,
      rested: isNodeRested(node),
      revealed,
      visible
    };
  }

  function getLinkViewState(source, target) {
    const sourceLevelHasChoice = chosenNodeByLevel.has(source.level);
    const routeLink = isNodeChosen(source) && isNodeActive(target);
    const traversedLink = isNodeChosen(source) && isNodeChosen(target);
    const pendingChoiceLink = isNodeActive(source) && !sourceLevelHasChoice;
    const visible = unknownPathsEnabled
      ? routeLink || traversedLink
      : routeLink || traversedLink || pendingChoiceLink;

    return {
      route: traversedLink,
      dimmed: !visible,
      hidden: unknownPathsEnabled && !visible
    };
  }

  function markAttempted(node) {
    if (isNodeAttempted(node) || isNodeExplored(node) || isNodeChosen(node)) return false;

    attemptedNodeIds.add(node.id);
    addElapsedMinutes(DISCOVERY_MINUTES);
    return true;
  }

  function markExplored(node) {
    if (isNodeExplored(node) || isNodeAttempted(node) || isNodeChosen(node)) return false;

    exploredNodeIds.add(node.id);
    addElapsedMinutes(DISCOVERY_MINUTES);
    return true;
  }

  function chooseRoute(node) {
    if (!isNodeActive(node) || chosenNodeByLevel.has(node.level)) return false;

    const wasExplored = isNodeExplored(node);
    const routeMinutes = Math.max(node.investigationMinutes - (wasExplored ? DISCOVERY_MINUTES : 0), 0);

    if (!wasExplored) {
      exploredNodeIds.add(node.id);
    }

    addElapsedMinutes(routeMinutes);
    chosenNodeByLevel.set(node.level, node.id);
    chosenNodeIds.add(node.id);

    levels[node.level - 1].forEach((levelNode) => {
      activeNodeIds.delete(levelNode.id);
    });

    if (!node.requiresCompletion && node.level < levels.length) {
      node.links.forEach((target) => activeNodeIds.add(target.id));
    }

    return true;
  }

  function completeNode(node) {
    if (!isNodeChosen(node) || isNodeCompleted(node)) return false;
    completedNodeIds.add(node.id);
    rebuildActiveNodesFromChosenRoutes();
    return true;
  }

  return {
    canOpenNode,
    canRestAtNode,
    chooseRoute,
    completeNode,
    exportSessionState,
    getElapsedMinutes,
    getExplorationTime,
    getLevels,
    getLinkViewState,
    getNodeViewState,
    importSessionState,
    isNodeAttempted,
    isNodeChosen,
    isNodeCompleted,
    isNodeExplored,
    isNodeRevealed,
    isNodeRested,
    isUnknownPathsEnabled,
    markAttempted,
    markExplored,
    restAtNode,
    setLevels,
    setUnknownPathsEnabled
  };
}
