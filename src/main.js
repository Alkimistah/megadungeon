import "./styles.css";
import { assetUrl } from "./assetUrl.js";
import { createExplorationState } from "./appState.js";
import { FLOOR_RANGES, applyTheme, getFloorRange } from "./floorRanges.js";
import { formatElapsedTime } from "./format.js";
import { generateMapData } from "./generator.js";
import { createRandomSeed, createRng } from "./random.js";
import { createMapRenderer } from "./mapRenderer.js";
import { createManualEncounterDialogController } from "./manualEncounterDialog.js";
import { resolveNodeEncounter } from "./encounterResolver.js";
import { createNodeDialogController } from "./nodeDialog.js";
import { decodeSessionCode, encodeSessionCode, isSessionCode } from "./sessionCode.js";

const elements = {
  svg: document.getElementById("map"),
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
  initialUnknownPathsInput: document.getElementById("initialUnknownPathsInput"),
  rangeConfirm: document.getElementById("rangeConfirm"),
  nodeDialog: document.getElementById("nodeDialog"),
  nodeDialogTitle: document.getElementById("nodeDialogTitle"),
  nodeDialogType: document.getElementById("nodeDialogType"),
  nodeDialogMeta: document.getElementById("nodeDialogMeta"),
  nodeDialogContent: document.getElementById("nodeDialogContent")
};

const state = createExplorationState();
let activeFloorRange = FLOOR_RANGES[0];
let currentMapSeed = createRandomSeed();
let infoMessageTimeout = null;

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

function updateTimeTracker() {
  elements.timeTrackerValue.textContent = formatElapsedTime(state.getElapsedMinutes());
}

function getCurrentSession() {
  return {
    v: 1,
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
  elements.info.textContent = `Seed: ${currentMapSeed} | Clique para copiar sessão`;
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
  elements.depthInput.value = session.depth;
  elements.baseDcInput.value = session.baseDc;
  currentMapSeed = session.mapSeed;
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

    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => registration.unregister());
    });

    caches.keys().then((cacheNames) => {
      cacheNames.forEach((cacheName) => caches.delete(cacheName));
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

function boot() {
  bindEvents();
  setupInstallButton();
  registerServiceWorker();
  populateFloorRangeSelect();
  applyFloorRange(activeFloorRange.id);
  generateMap();

  window.addEventListener("load", () => {
    elements.rangeDialog.showModal();
  });
}

boot();
