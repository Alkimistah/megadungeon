import "./styles.css";
import { assetUrl } from "./assetUrl.js";
import { createExplorationState } from "./appState.js";
import { FLOOR_RANGES, applyTheme, getFloorRange } from "./floorRanges.js";
import { formatElapsedTime } from "./format.js";
import { generateMapData } from "./generator.js";
import { createArchipelagoRenderer } from "./archipelagoRenderer.js";
import { createArchipelagoState } from "./archipelagoState.js";
import { createExtendedExplorationRenderer } from "./extendedExplorationRenderer.js";
import { createExtendedExplorationState } from "./extendedExplorationState.js";
import { createRandomSeed, createRng } from "./random.js";
import { createMapRenderer } from "./mapRenderer.js";
import { createManualEncounterDialogController } from "./manualEncounterDialog.js";
import { createMissionDialogController } from "./missions/missionDialog.js";
import { createMissionGenerationContext, generateMissionOffers } from "./missions/missionGenerator.js";
import { materializeMissionsForCurrentContent } from "./missions/missionProfileAdapters.js";
import { createMissionState } from "./missions/missionState.js";
import { resolveNodeEncounter } from "./encounterResolver.js";
import { createNodeDialogController } from "./nodeDialog.js";
import { decodeSessionCode, encodeSessionCode, isSessionCode } from "./sessionCode.js";

const elements = {
  svg: document.getElementById("map"),
  extendedExploration: document.getElementById("extendedExploration"),
  info: document.getElementById("info"),
  timeTrackerValue: document.getElementById("timeTrackerValue"),
  floorRangeTitle: document.getElementById("floorRangeTitle"),
  floorInput: document.getElementById("floorInput"),
  depthInput: document.getElementById("depthInput"),
  baseDcInput: document.getElementById("baseDcInput"),
  seedInput: document.getElementById("seedInput"),
  unknownPathsInput: document.getElementById("unknownPathsInput"),
  generateButton: document.getElementById("generateButton"),
  installButton: document.getElementById("installButton"),
  reloadAppButton: document.getElementById("reloadAppButton"),
  missionButton: document.getElementById("missionButton"),
  missionClose: document.getElementById("missionClose"),
  missionDialog: document.getElementById("missionDialog"),
  missionDialogContent: document.getElementById("missionDialogContent"),
  manualEncounterButton: document.getElementById("manualEncounterButton"),
  manualEncounterChallengeInput: document.getElementById("manualEncounterChallengeInput"),
  manualEncounterClose: document.getElementById("manualEncounterClose"),
  manualEncounterCreatureTypeInput: document.getElementById("manualEncounterCreatureTypeInput"),
  manualEncounterDialog: document.getElementById("manualEncounterDialog"),
  manualEncounterForm: document.getElementById("manualEncounterForm"),
  manualEncounterResult: document.getElementById("manualEncounterResult"),
  manualEncounterTerrainInput: document.getElementById("manualEncounterTerrainInput"),
  manualEncounterTrapModeInput: document.getElementById("manualEncounterTrapModeInput"),
  advanceNodeFloorButton: document.getElementById("advanceNodeFloorButton"),
  settingsToggle: document.getElementById("settingsToggle"),
  settingsToggleIcon: document.getElementById("settingsToggleIcon"),
  settingsPanel: document.getElementById("settingsPanel"),
  legendToggle: document.getElementById("legendToggle"),
  legendPanel: document.getElementById("legendPanel"),
  legendClose: document.getElementById("legendClose"),
  rangeDialog: document.getElementById("rangeDialog"),
  floorRangeInput: document.getElementById("floorRangeInput"),
  initialUnknownPathsField: document.getElementById("initialUnknownPathsField"),
  initialUnknownPathsInput: document.getElementById("initialUnknownPathsInput"),
  rangeConfirm: document.getElementById("rangeConfirm"),
  nodeDialog: document.getElementById("nodeDialog"),
  nodeDialogTitle: document.getElementById("nodeDialogTitle"),
  nodeDialogType: document.getElementById("nodeDialogType"),
  nodeDialogMeta: document.getElementById("nodeDialogMeta"),
  nodeDialogContent: document.getElementById("nodeDialogContent")
};

let activeFloorRange = FLOOR_RANGES[0];
let currentMapSeed = createRandomSeed();
let infoMessageTimeout = null;
const state = createExplorationState();
const extendedState = createExtendedExplorationState(activeFloorRange, createRng(currentMapSeed));
const archipelagoState = createArchipelagoState(activeFloorRange, createRng(currentMapSeed));
const missionState = createMissionState();
let missionDialogController = null;
let renderedNodeMapFloor = null;

function openMissionById(missionId) {
  missionDialogController?.openMission(missionId);
}

function getMissionContext(mission) {
  const nodeBinding = (mission.integration?.bindings || [])
    .find((binding) => binding.kind === "node" && binding.nodeId !== undefined);

  if (!nodeBinding) {
    return isNodeMapMode()
      ? { kind: "pending-node" }
      : null;
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
    return { kind: "pending-node" };
  }

  resolveNodeEncounter(node, { mapSeed: currentMapSeed });

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

  return topLevel.some((node) => state.isNodeChosen(node));
}

function syncNodeFloorAdvanceControl() {
  if (!elements.advanceNodeFloorButton) return;

  const canAdvance = isNodeMapMode() && hasNextNodeMapFloor() && isTopLevelRouteChosen();

  elements.advanceNodeFloorButton.disabled = !canAdvance;
  elements.advanceNodeFloorButton.textContent = hasNextNodeMapFloor()
    ? "Avançar andar"
    : "Último andar";
}

function advanceNodeMapFloor() {
  if (elements.advanceNodeFloorButton.disabled) return;

  const nextFloor = activeFloorRange.floors[getActiveFloorIndex() + 1];

  if (!nextFloor) return;

  elements.floorInput.value = String(nextFloor);
  syncRecommendationsWithFloor();
  generateMap();
}

const nodeDialogController = createNodeDialogController({
  contentElement: elements.nodeDialogContent,
  dialogElement: elements.nodeDialog,
  getActiveMissions: () => missionState.getSelected(),
  metaElement: elements.nodeDialogMeta,
  onAttempt: (node) => {
    state.markAttempted(node);
    refreshExplorationDisplay();
    nodeDialogController.open(node);
  },
  onChooseRoute: (node) => {
    const changed = state.chooseRoute(node);

    if (changed) {
      resolveNodeEncounter(node, { mapSeed: currentMapSeed });
    }

    refreshExplorationDisplay();
    nodeDialogController.open(node);
  },
  onAdjustMissionProgress: (missionId, delta) => {
    missionState.adjustProgress(missionId, delta);
    refreshExplorationDisplay();
    updateInfo();
  },
  onExplore: (node) => {
    state.markExplored(node);
    refreshExplorationDisplay();
    nodeDialogController.open(node);
  },
  onOpenMission: openMissionById,
  onRest: (node) => {
    state.restAtNode(node);
    refreshExplorationDisplay();
    nodeDialogController.open(node);
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
  creatureTypeInput: elements.manualEncounterCreatureTypeInput,
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
  terrainInput: elements.manualEncounterTerrainInput,
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
    missionState.confirmSelection(selectedMissionIds);
    generateMap({ reuseSeed: true });
  },
  onAdjustProgress: (missionId, delta) => {
    missionState.adjustProgress(missionId, delta);
    refreshExplorationDisplay();
    updateInfo();
  },
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
  getMissionsForFloor: (floor) => missionState.getMissionsForFloor(floor),
  onOpenMission: openMissionById,
  onAdjustMissionProgress: (missionId, delta) => {
    missionState.adjustProgress(missionId, delta);
    refreshExplorationDisplay();
    updateInfo();
  },
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
  getMissionsForFloor: (floor) => missionState.getMissionsForFloor(floor),
  getSnapshot: () => archipelagoState.getSnapshot(),
  onCompleteIsland: (floor) => {
    archipelagoState.completeIsland(floor);
    refreshExplorationDisplay();
    updateInfo();
  },
  onExploreIsland: (floor) => {
    archipelagoState.exploreIsland(floor);
    refreshExplorationDisplay();
    updateInfo();
  },
  onOpenMission: openMissionById,
  onResolveObjective: (floor, objectiveId) => {
    archipelagoState.resolveObjective(floor, objectiveId);
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

function updateTimeTracker() {
  const elapsedMinutes = isArchipelagoMode()
    ? archipelagoState.getElapsedMinutes()
    : isExtendedExplorationMode()
    ? extendedState.getElapsedMinutes()
    : state.getElapsedMinutes();

  elements.timeTrackerValue.textContent = formatElapsedTime(elapsedMinutes);
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
      missions: missionState.exportSessionState(),
      extendedState: extendedState.exportSessionState()
    };
  }

  return {
    v: 1,
    mode: "node-map",
    profile: activeFloorRange.id,
    floor: Number(elements.floorInput.value),
    depth: Number(elements.depthInput.value),
    baseDc: Number(elements.baseDcInput.value),
    unknownPaths: state.isUnknownPathsEnabled(),
    mapSeed: currentMapSeed,
    missions: missionState.exportSessionState(),
    state: state.exportSessionState()
  };
}

function getCurrentSessionCode() {
  return encodeSessionCode(getCurrentSession());
}

function updateInfo() {
  const modeLabel = isArchipelagoMode()
    ? "Arquipélago"
    : isExtendedExplorationMode()
    ? "Labirinto"
    : "Mapa";
  elements.info.textContent = `${modeLabel} | Seed: ${currentMapSeed} | Clique para copiar sessão`;
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

async function copyTextToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

async function copyCurrentSessionCode() {
  const sessionCode = getCurrentSessionCode();

  await copyTextToClipboard(sessionCode);
  showInfoMessage("Mapa atual e todas as informações foram salvos no clipboard.");
}

function drawGeneratedLevels(levels) {
  elements.svg.hidden = false;
  elements.extendedExploration.hidden = true;
  renderedNodeMapFloor = Number(elements.floorInput.value);
  state.setLevels(levels);
  mapRenderer.drawMap(levels, activeFloorRange.theme.columnColors);
  refreshExplorationDisplay();
  updateInfo(levels);
}

function resolveChosenRouteEncounters(levels, sessionState = {}) {
  const chosenNodeIds = new Set((sessionState.chosenByLevel || []).map(([, nodeId]) => nodeId));

  levels.flat().forEach((node) => {
    if (chosenNodeIds.has(node.id)) {
      resolveNodeEncounter(node, { mapSeed: currentMapSeed });
    }
  });
}

function materializeActiveMissions({ floor = Number(elements.floorInput.value), levels = null } = {}) {
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
    refreshExplorationDisplay();
    updateInfo();
    return;
  }

  if (isArchipelagoMode()) {
    renderedNodeMapFloor = null;
    archipelagoState.initialize(
      activeFloorRange,
      createRng(currentMapSeed),
      session.archipelagoState
    );
    materializeActiveMissions({ floor: session.floor });
    refreshExplorationDisplay();
    updateInfo();
    return;
  }

  elements.depthInput.value = session.depth;
  elements.baseDcInput.value = session.baseDc;
  setUnknownPathsMode(Boolean(session.unknownPaths));

  const levels = generateMapData(
    session.depth,
    session.baseDc,
    activeFloorRange,
    session.floor,
    createRng(currentMapSeed)
  );

  state.setLevels(levels);
  renderedNodeMapFloor = session.floor;
  state.importSessionState(session.state);
  resolveChosenRouteEncounters(levels, session.state);
  materializeActiveMissions({ floor: session.floor, levels });
  mapRenderer.drawMap(levels, activeFloorRange.theme.columnColors);
  refreshExplorationDisplay();
  updateInfo(levels);
}

function refreshExplorationDisplay() {
  if (isArchipelagoMode()) {
    elements.svg.hidden = true;
    elements.extendedExploration.hidden = false;
    archipelagoRenderer.render();
    syncNodeFloorAdvanceControl();
    updateTimeTracker();
    return;
  }

  if (isExtendedExplorationMode()) {
    elements.svg.hidden = true;
    elements.extendedExploration.hidden = false;
    elements.extendedExploration.className = "extended-exploration";
    extendedExplorationRenderer.render();
    syncNodeFloorAdvanceControl();
    updateTimeTracker();
    return;
  }

  elements.svg.hidden = false;
  elements.extendedExploration.hidden = true;
  mapRenderer.updateDisplay(state.getLevels(), state);
  syncNodeFloorAdvanceControl();
  updateTimeTracker();
}

function populateFloorRangeSelect() {
  elements.floorRangeInput.innerHTML = "";

  FLOOR_RANGES.forEach((floorRange) => {
    const option = document.createElement("option");

    option.value = floorRange.id;
    option.textContent = floorRange.label;
    elements.floorRangeInput.appendChild(option);
  });
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
  activeFloorRange = getFloorRange(floorRangeId);
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
  manualEncounterDialogController.syncProfileOptions();
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

  if (isArchipelagoMode()) return;

  refreshExplorationDisplay();
  nodeDialogController.rerenderCurrent();
}

function generateMap({ reuseSeed = false } = {}) {
  if (isArchipelagoMode()) {
    if (!reuseSeed) currentMapSeed = createRandomSeed();
    renderedNodeMapFloor = null;
    archipelagoState.initialize(activeFloorRange, createRng(currentMapSeed));
    materializeActiveMissions({ floor: archipelagoState.getSnapshot().activeExploration?.floor || activeFloorRange.floors[0] });
    refreshExplorationDisplay();
    updateInfo();
    return;
  }

  if (isExtendedExplorationMode()) {
    if (!reuseSeed) currentMapSeed = createRandomSeed();
    renderedNodeMapFloor = null;
    extendedState.initialize(
      activeFloorRange,
      Number(elements.floorInput.value),
      createRng(currentMapSeed)
    );
    materializeActiveMissions({ floor: Number(elements.floorInput.value) });
    refreshExplorationDisplay();
    updateInfo();
    return;
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
  drawGeneratedLevels(levels);
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
  elements.floorInput.addEventListener("change", () => {
    syncRecommendationsWithFloor();
    syncNodeFloorAdvanceControl();
  });

  elements.generateButton.addEventListener("click", () => {
    generateMap();
  });

  elements.advanceNodeFloorButton.addEventListener("click", advanceNodeMapFloor);

  elements.info.addEventListener("click", () => {
    copyCurrentSessionCode().catch(() => {
      showInfoMessage("Não foi possível copiar a sessão atual.");
    });
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
  });

  elements.initialUnknownPathsInput.addEventListener("change", () => {
    setUnknownPathsMode(elements.initialUnknownPathsInput.checked);
  });

  elements.seedInput.addEventListener("input", () => {
    elements.seedInput.setCustomValidity("");
  });

  elements.rangeConfirm.addEventListener("click", (event) => {
    const seedValue = elements.seedInput.value.trim();

    elements.seedInput.setCustomValidity("");

    if (seedValue) {
      if (!isSessionCode(seedValue)) {
        event.preventDefault();
        elements.seedInput.setCustomValidity("Cole uma sessão válida iniciada por MD1 ou deixe o campo vazio.");
        elements.seedInput.reportValidity();
        return;
      }

      try {
        restoreSession(decodeSessionCode(seedValue));
      } catch {
        event.preventDefault();
        elements.seedInput.setCustomValidity("Seed de sessão inválida. Verifique o código informado.");
        elements.seedInput.reportValidity();
      }

      return;
    }

    event.preventDefault();
    applyFloorRange(elements.floorRangeInput.value);
    setUnknownPathsMode(elements.initialUnknownPathsInput.checked);
    currentMapSeed = createRandomSeed();
    elements.rangeDialog.close();
    openMissionSelectionForNewExploration();
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

function syncInitialUnknownPathsVisibility() {
  const selectedProfile = getFloorRange(elements.floorRangeInput.value);
  elements.initialUnknownPathsField.hidden = selectedProfile.mode !== "node-map" && selectedProfile.mode !== undefined;
}

function boot() {
  bindEvents();
  setupInstallButton();
  registerServiceWorker();
  populateFloorRangeSelect();
  elements.floorRangeInput.addEventListener("change", syncInitialUnknownPathsVisibility);
  syncInitialUnknownPathsVisibility();
  applyFloorRange(activeFloorRange.id);
  generateMap();

  window.addEventListener("load", () => {
    elements.rangeDialog.showModal();
  });
}

boot();
