import "./styles.css";
import { assetUrl } from "./assetUrl.js";
import { createExplorationState } from "./appState.js";
import { FLOOR_RANGES, applyTheme, getFloorRange, getNextFloorRange } from "./floorRanges.js";
import { formatElapsedTime } from "./format.js";
import { generateMapData } from "./generator.js";
import { getNodeMapGuidance } from "./nodeProgressPresentation.js";
import { prepareForestExpedition, serializeForestExpedition, restoreForestExpedition, withForestExplorationTime } from "./forestExpedition.js";
import { createArchipelagoRenderer } from "./archipelagoRenderer.js";
import { createArchipelagoState } from "./archipelagoState.js";
import { canConfigureExtendedExplorationFloor } from "./extendedExplorationControls.js";
import { createExtendedExplorationRenderer } from "./extendedExplorationRenderer.js";
import { createExtendedExplorationState } from "./extendedExplorationState.js";
import { createRandomSeed, createRng } from "./random.js";
import { createMapRenderer } from "./mapRenderer.js";
import { createManualEncounterDialogController } from "./manualEncounterDialog.js";
import { createMissionDialogController } from "./missions/missionDialog.js";
import { createMissionGenerationContext, generateMissionOffers } from "./missions/missionGenerator.js";
import { materializeMissionsForCurrentContent } from "./missions/missionProfileAdapters.js";
import { createMissionState } from "./missions/missionState.js";
import { canRerollNodeCreatures, rerollNodeCreatures, resolveForestAmbush, resolveNodeEncounter } from "./encounterResolver.js";
import { creatureCatalog } from "./creatureCatalog/index.js";
import { withCreatureReinforcement } from "./creatureReinforcement.js";
import { createNodeDialogController } from "./nodeDialog.js";
import { decodeSessionCode, encodeSessionCode } from "./sessionCode.js";
import { createRangeEndActions } from "./rangeEndActions.js";
import { clearAutosave, loadAutosave, saveAutosave } from "./sessionAutosave.js";

const elements = {
  svg: document.getElementById("map"),
  extendedExploration: document.getElementById("extendedExploration"),
  info: document.getElementById("info"),
  timeTracker: document.getElementById("timeTracker"),
  timeTrackerLabel: document.getElementById("timeTrackerLabel"),
  timeTrackerValue: document.getElementById("timeTrackerValue"),
  totalTimeTracker: document.getElementById("totalTimeTracker"),
  totalTimeTrackerLabel: document.getElementById("totalTimeTrackerLabel"),
  totalTimeTrackerValue: document.getElementById("totalTimeTrackerValue"),
  autosaveError: document.getElementById("autosaveError"),
  floorRangeTitle: document.getElementById("floorRangeTitle"),
  floorInput: document.getElementById("floorInput"),
  depthInput: document.getElementById("depthInput"),
  baseDcInput: document.getElementById("baseDcInput"),
  sessionFile: document.getElementById("sessionFile"),
  importSessionFile: document.getElementById("importSessionFile"),
  unknownPathsInput: document.getElementById("unknownPathsInput"),
  generateButton: document.getElementById("generateButton"),
  installButton: document.getElementById("installButton"),
  reloadAppButton: document.getElementById("reloadAppButton"),
  missionButton: document.getElementById("missionButton"),
  treasureButton: document.getElementById("treasureButton"),
  treasureDialog: document.getElementById("treasureDialog"),
  missionClose: document.getElementById("missionClose"),
  missionDialog: document.getElementById("missionDialog"),
  missionDialogContent: document.getElementById("missionDialogContent"),
  manualEncounterButton: document.getElementById("manualEncounterButton"),
  manualEncounterChallengeInput: document.getElementById("manualEncounterChallengeInput"),
  manualEncounterClose: document.getElementById("manualEncounterClose"),
  manualEncounterCreatureTypeInput: document.getElementById("manualEncounterCreatureTypeInput"),
  manualEncounterCreatureInput: document.getElementById("manualEncounterCreatureInput"),
  manualEncounterDialog: document.getElementById("manualEncounterDialog"),
  manualEncounterForm: document.getElementById("manualEncounterForm"),
  manualEncounterResult: document.getElementById("manualEncounterResult"),
  manualEncounterTerrainInput: document.getElementById("manualEncounterTerrainInput"),
  manualEncounterTrapModeInput: document.getElementById("manualEncounterTrapModeInput"),
  advanceNodeFloorButton: document.getElementById("advanceNodeFloorButton"),
  nodeMapGuidance: document.getElementById("nodeMapGuidance"),
  rangeEndActions: document.getElementById("rangeEndActions"),
  settingsToggle: document.getElementById("settingsToggle"),
  settingsToggleIcon: document.getElementById("settingsToggleIcon"),
  settingsPanel: document.getElementById("settingsPanel"),
  encounterBooks: document.getElementById("encounterBooks"),
  encounterBookOptions: document.getElementById("encounterBookOptions"),
  encounterBooksStatus: document.getElementById("encounterBooksStatus"),
  legendToggle: document.getElementById("legendToggle"),
  legendPanel: document.getElementById("legendPanel"),
  legendClose: document.getElementById("legendClose"),
  rangeDialog: document.getElementById("rangeDialog"),
  aboutButton: document.getElementById("aboutButton"),
  aboutDialog: document.getElementById("aboutDialog"),
  aboutClose: document.getElementById("aboutClose"),
  rangeCards: document.getElementById("rangeCards"),
  resumeSection: document.getElementById("resumeSection"),
  resumeDetail: document.getElementById("resumeDetail"),
  initialUnknownPathsField: document.getElementById("initialUnknownPathsField"),
  initialUnknownPathsInput: document.getElementById("initialUnknownPathsInput"),
  quickEncounter: document.getElementById("quickEncounter"),
  quickTreasure: document.getElementById("quickTreasure"),
  rangeConfirm: document.getElementById("rangeConfirm"),
  resumeExpedition: document.getElementById("resumeExpedition"),
  sessionStatus: document.getElementById("sessionStatus"),
  nodeDialog: document.getElementById("nodeDialog"),
  nodeDialogTitle: document.getElementById("nodeDialogTitle"),
  nodeDialogType: document.getElementById("nodeDialogType"),
  nodeDialogMeta: document.getElementById("nodeDialogMeta"),
  nodeDialogContent: document.getElementById("nodeDialogContent"),
  nodeDialogFooter: document.getElementById("nodeDialogFooter")
};

const creatureBooks = [...new Set(creatureCatalog
  .flatMap(creature => (creature.sources ?? [creature.source]).map(source => source?.book))
  .filter(Boolean))]
  .sort((first, second) => first.localeCompare(second, "pt-BR"));
let disabledCreatureBooks = [];
let activeFloorRange = FLOOR_RANGES[0];
let currentMapSeed = createRandomSeed();
let infoMessageTimeout = null;
const state = createExplorationState();
const extendedState = createExtendedExplorationState(activeFloorRange, createRng(currentMapSeed));
const archipelagoState = createArchipelagoState(activeFloorRange, createRng(currentMapSeed));
const missionState = createMissionState();
let missionDialogController = null;
let renderedNodeMapFloor = null;
let renderedNodeMapSettings = null;
let forestExpedition = null;
let autosaveActive = false;
let savedExpedition;

function adjustMissionProgress(missionId, delta, eventKey = null) {
  if (eventKey) missionState.recordEncounterProgress(missionId, eventKey, delta);
  else missionState.adjustProgress(missionId, delta);
  refreshExplorationDisplay();
  nodeDialogController.rerenderCurrent();
  updateInfo();
}

function isPendingForestEncounter(node) {
  return activeFloorRange.id === "forest-11-20" && node.requiresCompletion &&
    state.isNodeChosen(node) && !state.isNodeCompleted(node);
}

function canReinforceCreatures(node) {
  return isPendingForestEncounter(node) && ((node.contentType || node.type) !== "boss" || Boolean(node.chimeraHeads));
}

function canRerollCreatures(node) {
  if (!isPendingForestEncounter(node) || !canRerollNodeCreatures(node)) return false;

  const encounterKey = `${node.resolvedEncounter.seed}:`;
  return !missionState.getSelected().some(mission =>
    mission.progress?.recordedEncounters?.some(key => key.startsWith(encounterKey))
  );
}

function openMissionById(missionId, node = null) {
  missionDialogController?.openMission(missionId, node ? { kind: "node", node } : null);
}

function getMissionContext(mission) {
  if (!isNodeMapMode()) return null;
  const bindings = (mission.integration?.bindings || []).filter(b => b.kind === "node");
  const currentBindings = bindings.filter(b => b.floor === renderedNodeMapFloor).sort((a, b) => {
    const nodes = state.getLevels().flat();
    return (nodes.find(n => n.id === b.nodeId)?.level || 0) - (nodes.find(n => n.id === a.nodeId)?.level || 0);
  });
  const currentNodes = currentBindings.map(b => state.getLevels().flat().find(n => n.id === b.nodeId)).filter(Boolean);
  const nodeBinding = currentBindings.find(b => {
    const candidate = currentNodes.find(n => n.id === b.nodeId);
    return candidate && state.isNodeChosen(candidate);
  }) || currentBindings[0];

  if (!nodeBinding) {
    const future = bindings.some(b => b.floor > renderedNodeMapFloor);
    return {
      kind: future || !bindings.length ? "pending-node" : "past-node",
      message: future ? "Os objetivos desta missão estão em andares seguintes."
        : bindings.length ? "Os objetivos desta missão ficaram em andares já percorridos. O mestre pode confirmar a entrega de algo já obtido."
        : "Aguardando o andar e o nodo da missão."
    };
  }

  const node = state.getLevels()
    .flat()
    .find((candidate) => candidate.id === nodeBinding.nodeId);

  if (!node) {
    return isNodeMapMode()
      ? { kind: "pending-node" }
      : null;
  }

  if (!state.isNodeChosen(node)) {
    const reachable = new Set();
    const pending = state.getLevels().flat().filter(n => state.getNodeViewState(n).active);
    // Uma cena escolhida ainda não concluída também possui saídas futuras.
    pending.push(...state.getLevels().flat().filter(n => state.isNodeChosen(n) && !state.isNodeCompleted(n)));
    while (pending.length) {
      const candidate = pending.pop();
      if (reachable.has(candidate.id)) continue;
      reachable.add(candidate.id);
      pending.push(...candidate.links);
    }
    return currentNodes.some(n => reachable.has(n.id))
      ? { kind: "pending-node", message: "Escolha e alcance um dos nodos vinculados para realizar esta missão." }
      : { kind: "past-node", message: "A rota escolhida deixou este objetivo para trás." };
  }

  resolveNodeEncounter(node, { mapSeed: currentMapSeed, profile: activeFloorRange });

  return {
    kind: "node",
    node
  };
}

function getActiveFloorIndex() {
  return activeFloorRange.floors.indexOf(Number(elements.floorInput.value));
}

function hasNextNodeMapFloor() {
  const index = getActiveFloorIndex();

  return index >= 0 && index < activeFloorRange.floors.length - 1;
}

function isTopLevelRouteChosen() {
  if (renderedNodeMapFloor !== Number(elements.floorInput.value)) return false;

  const levels = state.getLevels();
  const topLevel = levels[levels.length - 1] || [];

  return topLevel.some((node) => state.isNodeChosen(node) && (!node.requiresCompletion || state.isNodeCompleted(node)));
}

function syncNodeFloorAdvanceControl() {
  if (!elements.advanceNodeFloorButton) return;

  const canAdvance = isNodeMapMode() && hasNextNodeMapFloor() && isTopLevelRouteChosen();

  elements.advanceNodeFloorButton.disabled = !canAdvance;
  elements.advanceNodeFloorButton.textContent = hasNextNodeMapFloor()
    ? "Avançar andar"
    : isTopLevelRouteChosen() ? "Faixa concluída" : "Último andar";
  elements.nodeMapGuidance.textContent = isNodeMapMode()
    ? getNodeMapGuidance(state.getLevels(), state, hasNextNodeMapFloor(), renderedNodeMapFloor === Number(elements.floorInput.value)) : "";

  const rangeEnd = isNodeMapMode() && !hasNextNodeMapFloor() && isTopLevelRouteChosen() ? getRangeEnd() : null;
  elements.rangeEndActions.replaceChildren();
  elements.rangeEndActions.hidden = !rangeEnd;
  if (rangeEnd) elements.rangeEndActions.appendChild(createRangeEndActions(rangeEnd));
}

// Opções de fim de faixa: avançar para a próxima (se existir) ou encerrar a expedição.
function getRangeEnd() {
  const next = getNextFloorRange(activeFloorRange.id);

  return {
    nextName: next?.card.name || null,
    onAdvance: next ? () => advanceToNextRange() : null,
    onFinish: () => void finishExpedition()
  };
}

// Mesmo fluxo de uma expedição nova, sem a confirmação de substituição (a faixa anterior já terminou).
function advanceToNextRange() {
  const next = getNextFloorRange(activeFloorRange.id);

  if (!next) return;
  autosaveActive = false;
  savedExpedition = null;
  elements.resumeSection.hidden = true;
  closeOpenDialogs();
  startNewExpedition(next.id);
}

function closeOpenDialogs() {
  document.querySelectorAll("dialog[open]").forEach((dialog) => dialog.close());
}

async function finishExpedition() {
  autosaveActive = false;
  try {
    await clearAutosave();
  } catch {
    // Sem salvamento acessível, a tela inicial segue sem Continuar.
  }
  savedExpedition = null;
  elements.resumeSection.hidden = true;
  elements.sessionStatus.hidden = true;
  selectRange(FLOOR_RANGES[0].id);
  closeOpenDialogs();
  elements.rangeDialog.showModal();
  document.activeElement?.blur();
}

function advanceNodeMapFloor() {
  if (elements.advanceNodeFloorButton.disabled) return;

  const nextFloor = activeFloorRange.floors[getActiveFloorIndex() + 1];

  if (!nextFloor) return;

  if (forestExpedition) {
    const current = forestExpedition.floors.find(entry => entry.floor === renderedNodeMapFloor);
    current.state = state.exportSessionState();
  }

  elements.floorInput.value = String(nextFloor);
  syncRecommendationsWithFloor();
  generateMap({ reuseSeed: Boolean(forestExpedition) });
}

const nodeDialogController = createNodeDialogController({
  canReinforceCreatures,
  canRerollCreatures,
  contentElement: elements.nodeDialogContent,
  dialogElement: elements.nodeDialog,
  footerElement: elements.nodeDialogFooter,
  getActiveMissions: () => missionState.getSelected(),
  getProfileId: () => activeFloorRange.id,
  metaElement: elements.nodeDialogMeta,
  onAttempt: (node) => {
    state.markAttempted(node);
    refreshExplorationDisplay();
    nodeDialogController.open(node);
  },
  onChooseRoute: (node) => {
    const changed = state.chooseRoute(node);

    if (changed) {
      resolveNodeEncounter(node, { mapSeed: currentMapSeed, profile: activeFloorRange });
    }

    refreshExplorationDisplay();
    nodeDialogController.open(node);
  },
  onComplete: (node) => {
    state.completeNode(node);
    refreshExplorationDisplay();
    nodeDialogController.open(node);
  },
  onEncounterAdjusted: () => refreshExplorationDisplay(),
  onAdjustMissionProgress: adjustMissionProgress,
  onExplore: (node) => {
    state.markExplored(node);
    refreshExplorationDisplay();
    nodeDialogController.open(node);
  },
  onOpenMission: openMissionById,
  onSetCreatureReinforcement: (node, item, stat, enabled) => {
    if (!canReinforceCreatures(node)) return false;
    const current = node.resolvedEncounter;
    const updated = withCreatureReinforcement(current, item, stat, enabled);
    if (updated === current) return false;
    node.resolvedEncounter = updated;
    refreshExplorationDisplay();
    return true;
  },
  onRerollCreatures: (node) => {
    if (!canRerollCreatures(node)) return false;
    const encounter = rerollNodeCreatures(node, activeFloorRange);
    if (!encounter) return false;
    node.resolvedEncounter = encounter;
    refreshExplorationDisplay();
    return true;
  },
  onRest: (node) => {
    state.restAtNode(node);
    refreshExplorationDisplay();
    nodeDialogController.open(node);
  },
  onBeginHiddenRest: (node) => {
    if (!isPendingForestEncounter(node)) return false;
    if (node.scene?.kind === "falseRest") {
      const ambush = resolveForestAmbush(node, activeFloorRange, { mapSeed: currentMapSeed });
      if (!ambush) return false;
      node.resolvedEncounter = ambush;
    } else if (!state.restAtNode(node)) {
      return false;
    }
    refreshExplorationDisplay();
    return true;
  },
  state,
  titleElement: elements.nodeDialogTitle,
  typeElement: elements.nodeDialogType
});

const mapRenderer = createMapRenderer({
  svg: elements.svg,
  hiddenNodeIcon: activeFloorRange.hiddenNodeIcon,
  onNodeOpen: (node) => nodeDialogController.open(node)
});

const manualEncounterDialogController = createManualEncounterDialogController({
  challengeInput: elements.manualEncounterChallengeInput,
  closeButton: elements.manualEncounterClose,
  creatureInput: elements.manualEncounterCreatureInput,
  filters: {
    query: document.getElementById("manualEncounterSearchInput"),
    terrain: elements.manualEncounterTerrainInput,
    place: document.getElementById("manualEncounterPlaceInput"),
    condition: document.getElementById("manualEncounterConditionInput"),
    type: elements.manualEncounterCreatureTypeInput,
    challenge: document.getElementById("manualEncounterCatalogChallengeInput"),
    role: document.getElementById("manualEncounterRoleInput"),
    book: document.getElementById("manualEncounterBookInput")
  },
  catalogStatus: document.getElementById("manualEncounterCatalogStatus"),
  compositionInput: document.getElementById("manualEncounterCompositionInput"),
  quantityField: document.getElementById("manualEncounterQuantityField"),
  quantityInput: document.getElementById("manualEncounterQuantityInput"),
  dialogElement: elements.manualEncounterDialog,
  formElement: elements.manualEncounterForm,
  getActiveMissions: () => missionState.getSelected(),
  getProfile: () => activeFloorRange,
  onAdjustMissionProgress: (missionId, delta) => {
    missionState.adjustProgress(missionId, delta);
    refreshExplorationDisplay();
    updateInfo();
  },
  openButton: elements.manualEncounterButton,
  resultElement: elements.manualEncounterResult,
  trapModeInput: elements.manualEncounterTrapModeInput
});

missionDialogController = createMissionDialogController({
  closeButton: elements.missionClose,
  contentElement: elements.missionDialogContent,
  dialogElement: elements.missionDialog,
  getMissionContext,
  getOffers: () => missionState.getOffers(),
  getProfile: () => activeFloorRange,
  getSelected: () => missionState.getSelected(),
  onConfirmSelection: (selectedMissionIds) => {
    if (activeFloorRange.id === "forest-11-20") {
      const selected = missionState.getOffers().filter(m => selectedMissionIds.includes(m.id));
      const prepared = prepareForestExpedition({
        seed: currentMapSeed, profile: activeFloorRange, missions: selected,
        startFloor: Number(elements.floorInput.value),
        depth: Number(elements.depthInput.value), baseDc: Number(elements.baseDcInput.value)
      });
      missionState.confirmSelection(selectedMissionIds);
      missionState.replaceSelected(prepared.missions);
      forestExpedition = prepared;
      generateMap({ reuseSeed: true });
      return;
    }
    missionState.confirmSelection(selectedMissionIds);
    generateMap({ reuseSeed: true });
  },
  onAdjustProgress: adjustMissionProgress,
  onMarkCompleted: (missionId) => {
    missionState.markCompleted(missionId);
    refreshExplorationDisplay();
    updateInfo();
  },
  openButton: elements.missionButton
});

const extendedExplorationRenderer = createExtendedExplorationRenderer({
  container: elements.extendedExploration,
  getActiveMissions: () => missionState.getSelected(),
  getSnapshot: () => extendedState.getSnapshot(),
  getRangeEnd,
  getMissionsForFloor: (floor) => missionState.getMissionsForFloor(floor),
  onEncounterAdjusted: () => {
    if (autosaveActive) void saveCurrentExpedition();
  },
  onOpenMission: openMissionById,
  onAdjustMissionProgress: adjustMissionProgress,
  onAdvanceFloor: () => {
    extendedState.advanceFloor();
    elements.floorInput.value = String(extendedState.getSnapshot().floor);
    refreshExplorationDisplay();
    updateInfo();
  },
  onConfirmFloorReset: () => {
    extendedState.confirmFloorReset();
    refreshExplorationDisplay();
    updateInfo();
  },
  onConfirmPitDescent: () => {
    extendedState.confirmPitDescent();
    elements.floorInput.value = String(extendedState.getSnapshot().floor);
    refreshExplorationDisplay();
    updateInfo();
  },
  onDismissPitDescent: () => {
    extendedState.dismissPitDescent();
    refreshExplorationDisplay();
    updateInfo();
  },
  onOutcome: (outcome, approachId, manualRolls) => {
    extendedState.applyOutcome(outcome, approachId, manualRolls);
    refreshExplorationDisplay();
    updateInfo();
  },
  onResolveBossEncounter: () => {
    extendedState.resolveBossEncounter();
    refreshExplorationDisplay();
    updateInfo();
  },
  onResolveFinalEncounter: () => {
    extendedState.resolveFinalEncounter();
    refreshExplorationDisplay();
    updateInfo();
  },
  onRerollFinalEncounter: () => {
    extendedState.rerollFinalEncounter();
    refreshExplorationDisplay();
    updateInfo();
  },
  onRerollTacticalMap: (target) => {
    extendedState.rerollTacticalMap(target);
    refreshExplorationDisplay();
    updateInfo();
  }
});

const archipelagoRenderer = createArchipelagoRenderer({
  container: elements.extendedExploration,
  getUnknownPaths: () => state.isUnknownPathsEnabled(),
  onEncounterAdjusted: () => { if (autosaveActive) void saveCurrentExpedition(); },
  getMissionsForFloor: (floor) => missionState.getMissionsForFloor(floor),
  getSnapshot: () => archipelagoState.getSnapshot(),
  getMapSeed: () => currentMapSeed,
  getRangeEnd,
  onCompleteIsland: (floor) => {
    archipelagoState.completeIsland(floor);
    refreshExplorationDisplay();
    updateInfo();
  },
  onExploreIsland: (floor) => {
    archipelagoState.exploreIsland(floor, { mapSeed: currentMapSeed });
    refreshExplorationDisplay();
    updateInfo();
  },
  onOpenMission: openMissionById,
  onOpenSector: (floor, objectiveId) => {
    if (archipelagoState.openSector(floor, objectiveId) && autosaveActive) void saveCurrentExpedition();
  },
  onStartGuardian: (floor) => {
    archipelagoState.startGuardian(floor);
    refreshExplorationDisplay();
    updateInfo();
  },
  onLoseGuardian: (floor) => {
    archipelagoState.loseGuardian(floor);
    refreshExplorationDisplay();
    updateInfo();
  },
  onResolveObjective: (floor, objectiveId, outcome) => {
    archipelagoState.resolveObjective(floor, objectiveId, outcome);
    refreshExplorationDisplay();
    updateInfo();
  },
  onRestAtBoat: () => {
    archipelagoState.restAtBoat();
    refreshExplorationDisplay();
    updateInfo();
  }
});

function isExtendedExplorationMode() {
  return activeFloorRange.mode === "extended-exploration";
}

function isArchipelagoMode() {
  return activeFloorRange.mode === "archipelago";
}

function isNodeMapMode() {
  return activeFloorRange.mode === "node-map" || activeFloorRange.mode === undefined;
}

function canConfigureCurrentExtendedFloor() {
  return canConfigureExtendedExplorationFloor(activeFloorRange, extendedState.getSnapshot());
}

function syncExtendedFloorControls() {
  const locked = isExtendedExplorationMode() && !canConfigureCurrentExtendedFloor();

  if (locked) {
    elements.floorInput.value = String(extendedState.getSnapshot().floor);
  }
  const forestLocked = isNodeMapMode() && forestExpedition;
  const hasForestProgress = forestLocked && (
    forestExpedition.floors.some(entry => entry.state?.chosenByLevel?.length)
    || state.getLevels().flat().some(n => state.isNodeChosen(n) || state.isNodeAttempted(n) || state.isNodeExplored(n))
  );
  elements.floorInput.disabled = Boolean(locked || forestLocked);
  elements.generateButton.disabled = Boolean(locked || hasForestProgress);
  elements.depthInput.disabled = Boolean(hasForestProgress);
  elements.baseDcInput.disabled = Boolean(hasForestProgress);
}

function updateTimeTracker() {
  const elapsedMinutes = isArchipelagoMode()
    ? archipelagoState.getElapsedMinutes()
    : isExtendedExplorationMode()
    ? extendedState.getElapsedMinutes()
    : state.getElapsedMinutes();

  elements.timeTrackerValue.textContent = formatElapsedTime(elapsedMinutes);
  const fullLabel = forestExpedition ? "Desde o último descanso" : "Tempo de exploração";
  elements.timeTrackerLabel.textContent = forestExpedition ? "Desde descanso" : fullLabel;
  elements.timeTrackerLabel.title = fullLabel;
  elements.totalTimeTracker.hidden = !forestExpedition;
  if (!forestExpedition) elements.timeTracker.removeAttribute("aria-label");
  if (forestExpedition) {
    const { totalElapsedMinutes, totalElapsedPartial } = state.getExplorationTime();
    const fullTotal = totalElapsedPartial ? "Tempo total (parcial)" : "Tempo total de exploração";
    elements.totalTimeTrackerLabel.textContent = totalElapsedPartial ? "Total (parcial)" : "Total";
    elements.totalTimeTrackerLabel.title = fullTotal;
    elements.totalTimeTracker.title = fullTotal;
    elements.timeTracker.setAttribute("aria-label", `${fullLabel}: ${formatElapsedTime(elapsedMinutes)}. ${fullTotal}: ${formatElapsedTime(totalElapsedMinutes)}`);
    elements.totalTimeTrackerValue.textContent = formatElapsedTime(totalElapsedMinutes);
  }
}

function getCurrentSession() {
  if (isArchipelagoMode()) {
    const snapshot = archipelagoState.getSnapshot();

    return {
      v: 1,
      mode: activeFloorRange.mode,
      profile: activeFloorRange.id,
      floor: snapshot.activeExploration?.floor || 21,
      mapSeed: currentMapSeed,
      unknownPaths: state.isUnknownPathsEnabled(),
      disabledCreatureBooks,
      missions: missionState.exportSessionState(),
      archipelagoState: archipelagoState.exportSessionState()
    };
  }

  if (isExtendedExplorationMode()) {
    const snapshot = extendedState.getSnapshot();

    return {
      v: 1,
      mode: activeFloorRange.mode,
      profile: activeFloorRange.id,
      floor: snapshot.floor,
      mapSeed: currentMapSeed,
      disabledCreatureBooks,
      missions: missionState.exportSessionState(),
      extendedState: extendedState.exportSessionState()
    };
  }

  return {
    v: 1,
    mode: "node-map",
    profile: activeFloorRange.id,
    ...renderedNodeMapSettings,
    unknownPaths: state.isUnknownPathsEnabled(),
    mapSeed: currentMapSeed,
    disabledCreatureBooks,
    missions: missionState.exportSessionState(),
    state: state.exportSessionState(),
    ...(forestExpedition ? { forestExpedition: serializeForestExpedition(forestExpedition) } : {})
  };
}

async function saveCurrentExpedition() {
  try {
    await saveAutosave(getCurrentSession());
    elements.autosaveError.hidden = true;
  } catch {
    elements.autosaveError.hidden = false;
  }
}

function showSessionStatus(message) {
  elements.sessionStatus.textContent = message;
  elements.sessionStatus.hidden = false;
}

// Verdadeiro quando não há expedição salva ou o usuário aceita substituí-la.
function confirmReplaceExpedition() {
  if (!savedExpedition) return true;
  const profile = FLOOR_RANGES.find(({ id }) => id === savedExpedition.profile);
  return window.confirm(`A expedição em andamento (${profile.card.name}, Andar ${savedExpedition.floor}) será substituída. Continuar?`);
}

async function offerSavedExpedition() {
  elements.rangeConfirm.disabled = true;
  elements.importSessionFile.disabled = true;
  try {
    savedExpedition = await loadAutosave();
    if (!savedExpedition) return;
    const profile = FLOOR_RANGES.find(({ id }) => id === savedExpedition.profile);
    if (savedExpedition.v !== 1 || !profile?.floors.includes(savedExpedition.floor)) {
      throw new Error("Sessão incompatível.");
    }
    const { floors, card } = profile;
    elements.resumeDetail.textContent = `${card.name} · Andares ${floors[0]}–${floors[floors.length - 1]} · parado no Andar ${savedExpedition.floor}`;
    elements.resumeSection.hidden = false;
    selectRange(profile.id);
  } catch {
    savedExpedition = null;
    showSessionStatus("Não foi possível ler o salvamento automático. Você pode importar o arquivo de sessão.");
  } finally {
    elements.rangeConfirm.disabled = false;
    elements.importSessionFile.disabled = false;
  }
}

function updateInfo() {
  const modeLabel = isArchipelagoMode()
    ? "Arquipélago"
    : isExtendedExplorationMode()
    ? "Labirinto"
    : "Mapa";
  elements.info.textContent = `Exportar sessão (.txt) | ${modeLabel} | Seed: ${currentMapSeed}`;
}

function showInfoMessage(message) {
  if (infoMessageTimeout) {
    clearTimeout(infoMessageTimeout);
  }

  elements.info.textContent = message;
  infoMessageTimeout = setTimeout(() => {
    updateInfo(state.getLevels());
  }, 1800);
}

function exportCurrentSession() {
  const session = getCurrentSession();
  const file = new Blob([encodeSessionCode(session)], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.download = `mega-dungeon-andar-${session.floor}.txt`;
  document.body.appendChild(link);
  try {
    link.click();
  } finally {
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  showInfoMessage("Download do arquivo de sessão solicitado.");
}

function rememberRenderedMap() {
  renderedNodeMapFloor = Number(elements.floorInput.value);
  renderedNodeMapSettings = {
    floor: renderedNodeMapFloor,
    depth: Number(elements.depthInput.value),
    baseDc: Number(elements.baseDcInput.value)
  };
}

function drawGeneratedLevels(levels, startSession, { resetTime = false } = {}) {
  elements.svg.hidden = false;
  elements.extendedExploration.hidden = true;
  rememberRenderedMap();
  state.setLevels(levels, { resetTime });
  mapRenderer.drawMap(levels, activeFloorRange.theme.columnColors);
  refreshExplorationDisplay({ startSession });
  updateInfo(levels);
}

function resolveChosenRouteEncounters(levels, sessionState = {}) {
  const chosenNodeIds = new Set((sessionState.chosenByLevel || []).map(([, nodeId]) => nodeId));

  levels.flat().forEach((node) => {
    if (chosenNodeIds.has(node.id)) {
      resolveNodeEncounter(node, { mapSeed: currentMapSeed, profile: activeFloorRange });
    }
  });
}

function materializeActiveMissions({ floor = Number(elements.floorInput.value), levels = null } = {}) {
  if (forestExpedition && isNodeMapMode()) return;
  const selectedMissions = missionState.getSelected();

  if (!selectedMissions.length) return;

  const islands = isArchipelagoMode() ? archipelagoState.getSnapshot().islands : null;

  missionState.replaceSelected(materializeMissionsForCurrentContent({
    floor,
    islands,
    levels,
    missions: selectedMissions
  }));
}

function getMissionWorldDraft() {
  if (!isArchipelagoMode()) return null;

  const draftState = createArchipelagoState(activeFloorRange, createRng(currentMapSeed));
  const snapshot = draftState.getSnapshot();

  return {
    islands: snapshot.islands.map((island) => ({
      baseChallenge: island.baseChallenge,
      difficulty: island.difficulty,
      floor: island.floor,
      name: island.name,
      objectives: island.objectives,
      themeId: island.themeId,
      themeName: island.themeName
    }))
  };
}

function openMissionSelectionForNewExploration() {
  const context = createMissionGenerationContext({
    currentSeed: currentMapSeed,
    profile: activeFloorRange,
    worldDraft: getMissionWorldDraft()
  });
  const offers = generateMissionOffers(context);

  missionState.startBoard(activeFloorRange.id, offers);
  missionDialogController.openSelection();
}

function restoreSession(session) {
  const savedBooks = Array.isArray(session.disabledCreatureBooks) ? session.disabledCreatureBooks : [];
  disabledCreatureBooks = creatureBooks.filter(book => savedBooks.includes(book));
  applyFloorRange(session.profile);
  elements.floorInput.value = String(session.floor);
  currentMapSeed = session.mapSeed;
  missionState.importSessionState(session.missions);

  if (isExtendedExplorationMode()) {
    renderedNodeMapFloor = null;
    syncRecommendationsWithFloor();
    extendedState.initialize(
      activeFloorRange,
      session.floor,
      createRng(currentMapSeed),
      session.extendedState
    );
    materializeActiveMissions({ floor: session.floor });
    refreshExplorationDisplay({ startSession: true });
    updateInfo();
    return;
  }

  if (isArchipelagoMode()) {
    renderedNodeMapFloor = null;
    setUnknownPathsMode(Boolean(session.unknownPaths));
    archipelagoState.initialize(
      activeFloorRange,
      createRng(currentMapSeed),
      session.archipelagoState
    );
    materializeActiveMissions({ floor: session.floor });
    refreshExplorationDisplay({ startSession: true });
    updateInfo();
    return;
  }

  elements.depthInput.value = session.depth;
  elements.baseDcInput.value = session.baseDc;
  setUnknownPathsMode(Boolean(session.unknownPaths));

  if (session.forestExpedition) {
    forestExpedition = restoreForestExpedition(session.forestExpedition);
    const entry = forestExpedition.floors.find(f => f.floor === session.floor);
    if (!entry) throw new Error("Andar não encontrado na expedição salva.");
    state.setLevels(entry.levels);
    state.importSessionState(withForestExplorationTime(forestExpedition, session.floor, session.state));
    mapRenderer.drawMap(entry.levels, activeFloorRange.theme.columnColors);
    rememberRenderedMap();
    refreshExplorationDisplay({ startSession: true });
    updateInfo(entry.levels);
    return;
  }

  const levels = generateMapData(
    session.depth,
    session.baseDc,
    activeFloorRange,
    session.floor,
    createRng(currentMapSeed)
  );

  state.setLevels(levels);
  state.importSessionState(session.state);
  resolveChosenRouteEncounters(levels, session.state);
  materializeActiveMissions({ floor: session.floor, levels });
  mapRenderer.drawMap(levels, activeFloorRange.theme.columnColors);
  rememberRenderedMap();
  refreshExplorationDisplay({ startSession: true });
  updateInfo(levels);
}

async function importSessionFile() {
  const [file] = elements.sessionFile.files;
  if (!file) return;

  elements.sessionFile.value = "";
  if (!confirmReplaceExpedition()) return;
  elements.importSessionFile.disabled = true;
  elements.sessionStatus.hidden = true;
  try {
    const code = await file.text();
    if (!elements.rangeDialog.open) return;
    restoreSession(decodeSessionCode(code));
    elements.rangeDialog.close();
  } catch {
    if (elements.rangeDialog.open) {
      showSessionStatus("Não foi possível importar o arquivo. Selecione um .txt com o código MD1 completo.");
    }
  } finally {
    elements.importSessionFile.disabled = false;
  }
}

function refreshExplorationDisplay({ startSession = false } = {}) {
  syncExtendedFloorControls();

  if (isArchipelagoMode()) {
    elements.svg.hidden = true;
    elements.extendedExploration.hidden = false;
    archipelagoRenderer.render();
  } else if (isExtendedExplorationMode()) {
    elements.svg.hidden = true;
    elements.extendedExploration.hidden = false;
    elements.extendedExploration.className = "extended-exploration";
    extendedExplorationRenderer.render();
  } else {
    elements.svg.hidden = false;
    elements.extendedExploration.hidden = true;
    mapRenderer.updateDisplay(state.getLevels(), state);
  }

  syncNodeFloorAdvanceControl();
  updateTimeTracker();
  if (startSession) autosaveActive = true;
  if (autosaveActive) void saveCurrentExpedition();
}

let selectedRangeId = FLOOR_RANGES[0].id;

function getSelectedRangeId() {
  return selectedRangeId;
}

function renderRangeCards() {
  elements.rangeCards.innerHTML = "";

  FLOOR_RANGES.forEach((floorRange) => {
    const { card } = floorRange;
    const button = document.createElement("button");
    const icon = document.createElement("img");
    const name = document.createElement("b");
    const floors = document.createElement("span");
    const tagline = document.createElement("span");

    button.type = "button";
    button.className = "range-card";
    button.dataset.range = floorRange.id;
    button.style.setProperty("--c", floorRange.theme.action);
    button.setAttribute("aria-pressed", "false");
    icon.src = card.icon;
    icon.alt = "";
    name.textContent = card.name;
    floors.className = "range-floors";
    floors.textContent = `Andares ${floorRange.floors[0]}–${floorRange.floors[floorRange.floors.length - 1]}`;
    tagline.className = "range-tagline";
    tagline.textContent = card.tagline;
    button.append(icon, name, floors, tagline);
    button.addEventListener("click", () => selectRange(floorRange.id));
    elements.rangeCards.appendChild(button);
  });
}

function selectRange(rangeId) {
  const profile = getFloorRange(rangeId);

  selectedRangeId = profile.id;
  elements.rangeCards.querySelectorAll(".range-card").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.range === profile.id));
  });
  elements.rangeDialog.style.setProperty("--range-action", profile.theme.action);
  elements.rangeConfirm.textContent = `Iniciar ${profile.card.name.toLowerCase()} ›`;
  syncInitialUnknownPathsVisibility();
}

function populateFloorSelect(floorRange) {
  elements.floorInput.innerHTML = "";

  floorRange.floors.forEach((floor) => {
    const option = document.createElement("option");

    option.value = String(floor);
    option.textContent = String(floor);
    elements.floorInput.appendChild(option);
  });
}

function syncRecommendationsWithFloor() {
  const floor = Number(elements.floorInput.value);
  elements.depthInput.value = activeFloorRange.recommendations.encountersByFloor[floor];
  elements.baseDcInput.value = activeFloorRange.recommendations.baseDcByFloor[floor];
}

function applyFloorRange(floorRangeId) {
  forestExpedition = null;
  activeFloorRange = { ...getFloorRange(floorRangeId) };
  elements.encounterBooks.hidden = !activeFloorRange.creatureRules?.ecology;
  if (!elements.encounterBooks.hidden) activeFloorRange.disabledCreatureBooks = disabledCreatureBooks;
  syncEncounterBookOptions();
  elements.floorRangeTitle.textContent = activeFloorRange.label;
  populateFloorSelect(activeFloorRange);
  applyTheme(activeFloorRange.theme);
  mapRenderer.setHiddenNodeIcon(activeFloorRange.hiddenNodeIcon);
  syncRecommendationsWithFloor();
  document.body.classList.toggle("extended-exploration-mode", isExtendedExplorationMode());
  document.body.classList.toggle("archipelago-mode", isArchipelagoMode());
  elements.legendToggle.hidden = isExtendedExplorationMode() || isArchipelagoMode();
  if (isExtendedExplorationMode() || isArchipelagoMode()) {
    setLegendOpen(false);
  }
  elements.generateButton.textContent = isArchipelagoMode()
    ? "Gerar arquipélago"
    : isExtendedExplorationMode()
    ? "Iniciar andar"
    : "Gerar mapa";
  syncExtendedFloorControls();
  manualEncounterDialogController.syncProfileOptions();
}

function syncEncounterBookOptions() {
  for (const input of elements.encounterBookOptions.querySelectorAll("input")) {
    input.checked = !disabledCreatureBooks.includes(input.value);
  }
  elements.encounterBooksStatus.hidden = disabledCreatureBooks.length < creatureBooks.length;
}

function bindEncounterBookOptions() {
  for (const book of creatureBooks) {
    const label = document.createElement("label");
    label.className = "checkbox-field";
    const input = document.createElement("input");
    input.type = "checkbox";
    input.value = book;
    label.append(input, book);
    elements.encounterBookOptions.append(label);

    input.addEventListener("change", () => {
      const options = elements.encounterBookOptions.querySelectorAll("input:not(:checked)");
      disabledCreatureBooks = [...options].map(option => option.value);
      activeFloorRange.disabledCreatureBooks = disabledCreatureBooks;
      syncEncounterBookOptions();
      if (autosaveActive) void saveCurrentExpedition();
    });
  }
}

function setSettingsOpen(isOpen) {
  elements.settingsPanel.hidden = !isOpen;
  elements.settingsToggleIcon.setAttribute(
    "src",
    isOpen ? assetUrl("/assets/icons/expand-up.svg") : assetUrl("/assets/icons/expand-down.svg")
  );
  elements.settingsToggle.setAttribute("aria-expanded", String(isOpen));
  elements.settingsToggle.setAttribute(
    "aria-label",
    isOpen ? "Recolher configurações" : "Expandir configurações"
  );
}

function setLegendOpen(isOpen) {
  elements.legendPanel.hidden = !isOpen;
  elements.legendToggle.setAttribute("aria-expanded", String(isOpen));
  elements.legendToggle.setAttribute("aria-label", isOpen ? "Fechar legenda" : "Abrir legenda");
}

function setUnknownPathsMode(isEnabled) {
  state.setUnknownPathsEnabled(isEnabled);
  elements.unknownPathsInput.checked = isEnabled;
  elements.initialUnknownPathsInput.checked = isEnabled;
  document.body.classList.toggle("unknown-paths", isEnabled);
}

function generateMap({ reuseSeed = false, startSession = true } = {}) {
  if (isArchipelagoMode()) {
    if (!reuseSeed) currentMapSeed = createRandomSeed();
    renderedNodeMapFloor = null;
    archipelagoState.initialize(activeFloorRange, createRng(currentMapSeed));
    materializeActiveMissions({ floor: archipelagoState.getSnapshot().activeExploration?.floor || activeFloorRange.floors[0] });
    refreshExplorationDisplay({ startSession });
    updateInfo();
    return;
  }

  if (isExtendedExplorationMode()) {
    if (!canConfigureCurrentExtendedFloor()) {
      syncExtendedFloorControls();
      return;
    }
    if (!reuseSeed) currentMapSeed = createRandomSeed();
    renderedNodeMapFloor = null;
    extendedState.initialize(
      activeFloorRange,
      Number(elements.floorInput.value),
      createRng(currentMapSeed)
    );
    materializeActiveMissions({ floor: Number(elements.floorInput.value) });
    refreshExplorationDisplay({ startSession });
    updateInfo();
    return;
  }

  if (activeFloorRange.id === "forest-11-20") {
    if (!reuseSeed) {
      if (elements.generateButton.disabled) return;
      const nextSeed = createRandomSeed();
      const selected = missionState.getSelected().map(m => ({
        ...m, integration: { ...m.integration, bindings: [] }
      }));
      const prepared = prepareForestExpedition({
        seed: nextSeed, profile: activeFloorRange, missions: selected,
        startFloor: Number(elements.floorInput.value),
        depth: Math.max(3, Math.min(20, Number(elements.depthInput.value))),
        baseDc: Math.max(5, Math.min(40, Number(elements.baseDcInput.value)))
      });
      forestExpedition = prepared;
      currentMapSeed = nextSeed;
      missionState.replaceSelected(prepared.missions);
    }
    if (forestExpedition) {
      const entry = forestExpedition.floors.find(f => f.floor === Number(elements.floorInput.value));
      if (!entry) throw new Error("Andar não encontrado nesta expedição.");
      elements.depthInput.value = entry.depth;
      elements.baseDcInput.value = entry.baseDc;
      drawGeneratedLevels(entry.levels, startSession, { resetTime: entry.floor === forestExpedition.startFloor });
      return;
    }
  }

  let depth = Number(elements.depthInput.value);
  let baseDC = Number(elements.baseDcInput.value);

  if (depth < 3) depth = 3;
  if (depth > 20) depth = 20;

  if (baseDC < 5) baseDC = 5;
  if (baseDC > 40) baseDC = 40;

  elements.depthInput.value = depth;
  elements.baseDcInput.value = baseDC;
  if (!reuseSeed) currentMapSeed = createRandomSeed();

  const levels = generateMapData(
    depth,
    baseDC,
    activeFloorRange,
    Number(elements.floorInput.value),
    createRng(currentMapSeed)
  );

  materializeActiveMissions({ floor: Number(elements.floorInput.value), levels });
  drawGeneratedLevels(levels, startSession);
}

function setupInstallButton() {
  let deferredPrompt = null;

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredPrompt = event;
    elements.installButton.hidden = false;
  });

  elements.installButton.addEventListener("click", async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      elements.installButton.hidden = true;
    }
    deferredPrompt = null;
  });

  window.addEventListener("appinstalled", () => {
    elements.installButton.hidden = true;
    deferredPrompt = null;
  });
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;

  window.addEventListener("load", () => {
    if (import.meta.env.PROD) {
      navigator.serviceWorker.register(import.meta.env.BASE_URL + "sw.js");
      return;
    }

    Promise.all([
      navigator.serviceWorker.getRegistrations().then((registrations) =>
        Promise.all(registrations.map((registration) => registration.unregister()))
      ),
      caches.keys().then((cacheNames) =>
        Promise.all(cacheNames.map((cacheName) => caches.delete(cacheName)))
      )
    ]).then(() => {
      if (navigator.serviceWorker.controller && sessionStorage.getItem("dev-sw-cleared") !== "1") {
        sessionStorage.setItem("dev-sw-cleared", "1");
        window.location.reload();
      }
    });
  });
}

function bindEvents() {
  bindEncounterBookOptions();

  elements.floorInput.addEventListener("change", () => {
    if (isExtendedExplorationMode() && !canConfigureCurrentExtendedFloor()) {
      syncExtendedFloorControls();
      return;
    }
    syncRecommendationsWithFloor();
    syncNodeFloorAdvanceControl();
  });

  elements.generateButton.addEventListener("click", () => {
    try {
      generateMap();
    } catch (error) {
      const current = forestExpedition?.floors.find(entry => entry.floor === renderedNodeMapFloor);
      if (current) {
        elements.floorInput.value = String(current.floor);
        elements.depthInput.value = current.depth;
        elements.baseDcInput.value = current.baseDc;
      }
      showInfoMessage(error.message);
    }
  });

  elements.advanceNodeFloorButton.addEventListener("click", advanceNodeMapFloor);

  elements.info.addEventListener("click", () => {
    try {
      exportCurrentSession();
    } catch {
      showInfoMessage("Não foi possível exportar a sessão atual.");
    }
  });

  elements.reloadAppButton.addEventListener("click", () => {
    window.location.reload();
  });

  elements.settingsToggle.addEventListener("click", () => {
    setSettingsOpen(elements.settingsPanel.hidden);
  });

  elements.nodeDialog.addEventListener("click", (event) => {
    if (event.target === elements.nodeDialog) {
      elements.nodeDialog.close();
    }
  });

  elements.manualEncounterDialog.addEventListener("click", (event) => {
    if (event.target === elements.manualEncounterDialog) {
      elements.manualEncounterDialog.close();
    }
  });

  elements.treasureDialog.addEventListener("click", (event) => {
    if (event.target === elements.treasureDialog) {
      elements.treasureDialog.close();
    }
  });

  const showTreasureLoadError = () => {
    document.getElementById("treasureLoadError")?.remove();
    const notice = document.createElement("p");
    notice.id = "treasureLoadError";
    notice.setAttribute("role", "alert");
    notice.textContent = "Não foi possível carregar os tesouros. Verifique a conexão e tente de novo.";
    notice.style.cssText = "position:fixed;left:50%;bottom:16px;transform:translateX(-50%);z-index:1000;margin:0;padding:10px 14px;max-width:90vw;border-radius:8px;background:var(--surface-alt,#222);color:var(--text,#fff);border:1px solid currentColor;";
    document.body.append(notice);
    setTimeout(() => notice.remove(), 6000);
  };

  elements.treasureButton.addEventListener("click", async () => {
    try {
      const { openTreasureDialog } = await import("./treasure/treasureDialog.js");
      openTreasureDialog(elements.treasureDialog);
    } catch (error) {
      console.error("Falha ao carregar o módulo de tesouros", error);
      showTreasureLoadError();
    }
  });

  elements.nodeDialog.addEventListener("close", () => {
    nodeDialogController.clearCurrent();
  });

  elements.legendToggle.addEventListener("click", () => {
    setLegendOpen(elements.legendPanel.hidden);
  });

  elements.legendClose.addEventListener("click", () => {
    setLegendOpen(false);
  });

  elements.unknownPathsInput.addEventListener("change", () => {
    setUnknownPathsMode(elements.unknownPathsInput.checked);
    refreshExplorationDisplay();
    nodeDialogController.rerenderCurrent();
  });

  elements.initialUnknownPathsInput.addEventListener("change", () => {
    setUnknownPathsMode(elements.initialUnknownPathsInput.checked);
  });

  elements.aboutButton.addEventListener("click", () => elements.aboutDialog.showModal());
  elements.aboutClose.addEventListener("click", () => elements.aboutDialog.close());
  elements.aboutDialog.addEventListener("close", () => elements.aboutButton.focus());
  elements.importSessionFile.addEventListener("click", () => elements.sessionFile.click());
  elements.sessionFile.addEventListener("change", importSessionFile);

  const openQuickTool = (button, open) => {
    return open().finally(() => {
      const dialogs = [elements.treasureDialog, elements.manualEncounterDialog];
      const dialog = dialogs.find((item) => item.open);
      if (!dialog) return;
      // Aberta da tela inicial, a ferramenta usa a paleta bronze dela e não o tema da faixa ativa.
      dialog.classList.add("is-home-tool");
      dialog.addEventListener("close", () => {
        dialog.classList.remove("is-home-tool");
        button.focus();
      }, { once: true });
    });
  };

  elements.quickTreasure.addEventListener("click", () => {
    void openQuickTool(elements.quickTreasure, async () => {
      try {
        const { openTreasureDialog } = await import("./treasure/treasureDialog.js");
        openTreasureDialog(elements.treasureDialog);
      } catch (error) {
        console.error("Falha ao carregar o módulo de tesouros", error);
        showTreasureLoadError();
      }
    });
  });

  elements.quickEncounter.addEventListener("click", () => {
    void openQuickTool(elements.quickEncounter, async () => {
      manualEncounterDialogController.openStandalone(getFloorRange(getSelectedRangeId()));
    });
  });

  elements.rangeDialog.addEventListener("cancel", (event) => event.preventDefault());
  // O Chrome só deixa o "cancel" ser cancelado de novo após uma interação; um segundo Esc seguido fecharia a
  // tela inicial. Barrar a tecla na própria tela cobre esse caso. Modais abertas por cima recebem o Esc antes.
  elements.rangeDialog.addEventListener("keydown", (event) => {
    if (event.key === "Escape") event.preventDefault();
  });

  elements.resumeExpedition.addEventListener("click", () => {
    try {
      restoreSession(savedExpedition);
      elements.rangeDialog.close();
    } catch {
      showSessionStatus("Não foi possível continuar a expedição salva. Você pode importar o arquivo de sessão.");
    }
  });

  elements.rangeConfirm.addEventListener("click", (event) => {
    event.preventDefault();
    if (!confirmReplaceExpedition()) return;
    startNewExpedition(getSelectedRangeId());
  });

  document.addEventListener("click", (event) => {
    if (
      elements.legendPanel.hidden ||
      elements.legendPanel.contains(event.target) ||
      elements.legendToggle.contains(event.target)
    ) {
      return;
    }

    setLegendOpen(false);
  });
}

function startNewExpedition(rangeId) {
  applyFloorRange(rangeId);
  // Descarta fase "completed" de uma expedição anterior; senão o andar fica travado e o mapa não gera.
  if (activeFloorRange.mode === "extended-exploration") {
    extendedState.initialize(activeFloorRange, activeFloorRange.floors[0], createRng(createRandomSeed()));
    syncExtendedFloorControls();
    elements.floorInput.value = String(activeFloorRange.floors[0]);
  }
  setUnknownPathsMode(elements.initialUnknownPathsInput.checked);
  currentMapSeed = createRandomSeed();
  if (elements.rangeDialog.open) elements.rangeDialog.close();
  openMissionSelectionForNewExploration();
}

function syncInitialUnknownPathsVisibility() {
  const selectedProfile = getFloorRange(getSelectedRangeId());
  elements.initialUnknownPathsField.hidden = selectedProfile.mode === "extended-exploration";
  document.getElementById("initialUnknownPathsHint").textContent = selectedProfile.mode === "archipelago"
    ? "O tema e os objetivos de cada ilha se revelam ao iniciar a exploração."
    : "A rota de cada andar se revela conforme o grupo avança.";
}

function boot() {
  bindEvents();
  setupInstallButton();
  registerServiceWorker();
  renderRangeCards();
  selectRange(getSelectedRangeId());
  applyFloorRange(activeFloorRange.id);
  generateMap({ startSession: false });

  window.addEventListener("load", () => {
    elements.rangeDialog.showModal();
    document.activeElement?.blur();
    void offerSavedExpedition();
    prefetchTreasureModule();
  });
}

function prefetchTreasureModule() {
  const prefetch = () => import("./treasure/treasureDialog.js").catch((error) => {
    console.warn("Pré-carga do módulo de tesouros falhou", error);
  });
  if ("requestIdleCallback" in window) window.requestIdleCallback(prefetch);
  else setTimeout(prefetch, 2000);
}

boot();
