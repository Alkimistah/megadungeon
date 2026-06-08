import "./styles.css";
import { createExplorationState } from "./appState.js";
import { FLOOR_RANGES, applyTheme, getFloorRange } from "./floorRanges.js";
import { formatElapsedTime } from "./format.js";
import { generateMapData } from "./generator.js";
import { createMapRenderer } from "./mapRenderer.js";
import { createNodeDialogController } from "./nodeDialog.js";

const elements = {
  svg: document.getElementById("map"),
  info: document.getElementById("info"),
  timeTrackerValue: document.getElementById("timeTrackerValue"),
  floorRangeTitle: document.getElementById("floorRangeTitle"),
  floorInput: document.getElementById("floorInput"),
  depthInput: document.getElementById("depthInput"),
  baseDcInput: document.getElementById("baseDcInput"),
  unknownPathsInput: document.getElementById("unknownPathsInput"),
  generateButton: document.getElementById("generateButton"),
  reloadAppButton: document.getElementById("reloadAppButton"),
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
    state.chooseRoute(node);
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

function updateTimeTracker() {
  elements.timeTrackerValue.textContent = formatElapsedTime(state.getElapsedMinutes());
}

function updateInfo(levels) {
  const allNodes = levels.flat();
  const counts = {
    normal: 0,
    elite: 0,
    trap: 0,
    unknown: 0,
    treasure: 0,
    camp: 0,
    boss: 0
  };

  allNodes.forEach((node) => {
    counts[node.type]++;
  });

  const totalNodes = allNodes.length;
  const totalLinks = allNodes.reduce((sum, node) => sum + node.links.length, 0);
  const floor = elements.floorInput.value;
  const bossText = floor === "20" ? " | Boss após o mapa" : "";

  elements.info.textContent =
    `Andar ${floor} | ` +
    `Encontros: ${levels.length}${bossText} | ` +
    `Nós: ${totalNodes} | ` +
    `Conexões: ${totalLinks} | ` +
    `Normais: ${counts.normal} | ` +
    `Elites: ${counts.elite} | ` +
    `Armadilhas: ${counts.trap} | ` +
    `Desconhecidos: ${counts.unknown} | ` +
    `Tesouros: ${counts.treasure} | ` +
    `Acampamentos: ${counts.camp} | ` +
    `Chefões: ${counts.boss}`;
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
}

function setSettingsOpen(isOpen) {
  elements.settingsPanel.hidden = !isOpen;
  elements.settingsToggleIcon.setAttribute(
    "src",
    isOpen ? "/assets/icons/expand-up.svg" : "/assets/icons/expand-down.svg"
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

  const levels = generateMapData(depth, baseDC, activeFloorRange, Number(elements.floorInput.value));

  state.setLevels(levels);
  mapRenderer.drawMap(levels, activeFloorRange.theme.columnColors);
  refreshExplorationDisplay();
  updateInfo(levels);
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;

  window.addEventListener("load", () => {
    if (import.meta.env.PROD) {
      navigator.serviceWorker.register("/sw.js");
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

  elements.rangeConfirm.addEventListener("click", () => {
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
  registerServiceWorker();
  populateFloorRangeSelect();
  applyFloorRange(activeFloorRange.id);
  generateMap();

  window.addEventListener("load", () => {
    elements.rangeDialog.showModal();
  });
}

boot();
