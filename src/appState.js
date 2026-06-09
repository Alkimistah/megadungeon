export function createExplorationState() {
  let levels = [];
  let activeNodeIds = new Set();
  let chosenNodeIds = new Set();
  let chosenNodeByLevel = new Map();
  let exploredNodeIds = new Set();
  let attemptedNodeIds = new Set();
  let restedNodeIds = new Set();
  let elapsedMinutes = 0;
  let unknownPathsEnabled = false;

  function setLevels(nextLevels) {
    levels = nextLevels;
    chosenNodeIds = new Set();
    chosenNodeByLevel = new Map();
    exploredNodeIds = new Set();
    attemptedNodeIds = new Set();
    restedNodeIds = new Set();
    activeNodeIds = new Set(levels[0].map((node) => node.id));
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

    if (chosenNode && chosenNode.level < levels.length) {
      activeNodeIds = new Set(chosenNode.links.map((node) => node.id));
    }
  }

  function exportSessionState() {
    return {
      attempted: [...attemptedNodeIds],
      chosenByLevel: [...chosenNodeByLevel.entries()],
      elapsedMinutes,
      explored: [...exploredNodeIds],
      rested: [...restedNodeIds]
    };
  }

  function importSessionState(sessionState = {}) {
    chosenNodeByLevel = new Map(sessionState.chosenByLevel || []);
    chosenNodeIds = new Set([...chosenNodeByLevel.values()]);
    exploredNodeIds = new Set(sessionState.explored || []);
    attemptedNodeIds = new Set(sessionState.attempted || []);
    restedNodeIds = new Set(sessionState.rested || []);
    elapsedMinutes = sessionState.elapsedMinutes || 0;
    rebuildActiveNodesFromChosenRoutes();
  }

  function getLevels() {
    return levels;
  }

  function getElapsedMinutes() {
    return elapsedMinutes;
  }

  function addElapsedMinutes(minutes) {
    elapsedMinutes += minutes;
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

  function hasChosenRouteAfter(node) {
    return [...chosenNodeByLevel.keys()].some((level) => level > node.level);
  }

  function canRestAtNode(node) {
    return !isNodeRested(node) && !hasChosenRouteAfter(node);
  }

  function canOpenNode(node) {
    return isNodeActive(node) || isNodeChosen(node);
  }

  function isNodeRevealed(node) {
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
      explored,
      locked: !active && !chosen,
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
    addElapsedMinutes(15);
    return true;
  }

  function markExplored(node) {
    if (isNodeExplored(node) || isNodeAttempted(node) || isNodeChosen(node)) return false;

    exploredNodeIds.add(node.id);
    addElapsedMinutes(15);
    return true;
  }

  function chooseRoute(node) {
    if (!isNodeActive(node) || chosenNodeByLevel.has(node.level)) return false;

    const wasExplored = isNodeExplored(node);
    const routeMinutes = Math.max(node.investigationMinutes - (wasExplored ? 15 : 0), 0);

    if (!wasExplored) {
      exploredNodeIds.add(node.id);
    }

    addElapsedMinutes(routeMinutes);
    chosenNodeByLevel.set(node.level, node.id);
    chosenNodeIds.add(node.id);

    levels[node.level - 1].forEach((levelNode) => {
      activeNodeIds.delete(levelNode.id);
    });

    if (node.level < levels.length) {
      node.links.forEach((target) => activeNodeIds.add(target.id));
    }

    return true;
  }

  return {
    canOpenNode,
    canRestAtNode,
    chooseRoute,
    exportSessionState,
    getElapsedMinutes,
    getLevels,
    getLinkViewState,
    getNodeViewState,
    importSessionState,
    isNodeAttempted,
    isNodeChosen,
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
