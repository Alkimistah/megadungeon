import "./styles.css";
import { assetUrl } from "./assetUrl.js";
import { createExplorationState } from "./appState.js";
import { FLOOR_RANGES, applyTheme, getFloorRange } from "./floorRanges.js";
import { formatElapsedTime } from "./format.js";
import { generateMapData } from "./generator.js";
import { createExtendedExplorationRenderer } from "./extendedExplorationRenderer.js";
import { createExtendedExplorationState } from "./extendedExplorationState.js";
import { createRandomSeed, createRng } from "./random.js";
import { createMapRenderer } from "./mapRenderer.js";
import { createManualEncounterDialogController } from "./manualEncounterDialog.js";
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
  manualEncounterButton: document.getElementById("manualEncounterButton"),
  manualEncounterChallengeInput: document.getElementById("manualEncounterChallengeInput"),
  manualEncounterClose: document.getElementById("manualEncounterClose"),
  manualEncounterCreatureTypeInput: document.getElementById("manualEncounterCreatureTypeInput"),
  manualEncounterDialog: document.getElementById("manualEncounterDialog"),
  manualEncounterForm: document.getElementById("manualEncounterForm"),
  manualEncounterResult: document.getElementById("manualEncounterResult"),
  manualEncounterTerrainInput: document.getElementById("manualEncounterTerrainInput"),
  manualEncounterTrapModeInput: document.getElementById("manualEncounterTrapModeInput"),
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

const nodeDialogController = createNodeDialogController({
  contentElement: elements.nodeDialogContent,
  dialogElement: elements.nodeDialog,
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
  onExplore: (node) => {
    state.markExplored(node);
    refreshExplorationDisplay();
    nodeDialogController.open(node);
  },
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
  getProfile: () => activeFloorRange,
  openButton: elements.manualEncounterButton,
  resultElement: elements.manualEncounterResult,
  terrainInput: elements.manualEncounterTerrainInput,
  trapModeInput: elements.manualEncounterTrapModeInput
});

const extendedExplorationRenderer = createExtendedExplorationRenderer({
  container: elements.extendedExploration,
  getSnapshot: () => extendedState.getSnapshot(),
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

function isExtendedExplorationMode() {
  return activeFloorRange.mode === "extended-exploration";
}

function updateTimeTracker() {
  const elapsedMinutes = isExtendedExplorationMode()
    ? extendedState.getElapsedMinutes()
    : state.getElapsedMinutes();

  elements.timeTrackerValue.textContent = formatElapsedTime(elapsedMinutes);
}

function getCurrentSession() {
  if (isExtendedExplorationMode()) {
    const snapshot = extendedState.getSnapshot();

    return {
      v: 1,
      mode: activeFloorRange.mode,
      profile: activeFloorRange.id,
      floor: snapshot.floor,
      mapSeed: currentMapSeed,
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
    state: state.exportSessionState()
  };
}

function getCurrentSessionCode() {
  return encodeSessionCode(getCurrentSession());
}

function updateInfo() {
  const modeLabel = isExtendedExplorationMode() ? "Labirinto" : "Mapa";
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

function restoreSession(session) {
  applyFloorRange(session.profile);
  elements.floorInput.value = String(session.floor);
  currentMapSeed = session.mapSeed;

  if (isExtendedExplorationMode()) {
    syncRecommendationsWithFloor();
    extendedState.initialize(
      activeFloorRange,
      session.floor,
      createRng(currentMapSeed),
      session.extendedState
    );
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
  state.importSessionState(session.state);
  resolveChosenRouteEncounters(levels, session.state);
  mapRenderer.drawMap(levels, activeFloorRange.theme.columnColors);
  refreshExplorationDisplay();
  updateInfo(levels);
}

function refreshExplorationDisplay() {
  if (isExtendedExplorationMode()) {
    elements.svg.hidden = true;
    elements.extendedExploration.hidden = false;
    extendedExplorationRenderer.render();
    updateTimeTracker();
    return;
  }

  elements.svg.hidden = false;
  elements.extendedExploration.hidden = true;
  mapRenderer.updateDisplay(state.getLevels(), state);
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
  elements.legendToggle.hidden = isExtendedExplorationMode();
  if (isExtendedExplorationMode()) {
    setLegendOpen(false);
  }
  elements.generateButton.textContent = isExtendedExplorationMode() ? "Iniciar andar" : "Gerar mapa";
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
  refreshExplorationDisplay();
  nodeDialogController.rerenderCurrent();
}

function generateMap() {
  if (isExtendedExplorationMode()) {
    currentMapSeed = createRandomSeed();
    extendedState.initialize(
      activeFloorRange,
      Number(elements.floorInput.value),
      createRng(currentMapSeed)
    );
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
  currentMapSeed = createRandomSeed();

  const levels = generateMapData(
    depth,
    baseDC,
    activeFloorRange,
    Number(elements.floorInput.value),
    createRng(currentMapSeed)
  );

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
  });

  elements.generateButton.addEventListener("click", () => {
    generateMap();
  });

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

    applyFloorRange(elements.floorRangeInput.value);
    setUnknownPathsMode(elements.initialUnknownPathsInput.checked);
    generateMap();
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
  elements.initialUnknownPathsField.hidden = selectedProfile.mode === "extended-exploration";
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
