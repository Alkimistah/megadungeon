import "./styles.css";
import { generateMapData } from "./generator.js";
import { baseDcByFloor, encountersByFloor } from "./tables.js";

const svg = document.getElementById("map");
const info = document.getElementById("info");
const floorInput = document.getElementById("floorInput");
const depthInput = document.getElementById("depthInput");
const baseDcInput = document.getElementById("baseDcInput");
const generateButton = document.getElementById("generateButton");
const nodeDialog = document.getElementById("nodeDialog");
const nodeDialogTitle = document.getElementById("nodeDialogTitle");
const nodeDialogType = document.getElementById("nodeDialogType");
const nodeDialogContent = document.getElementById("nodeDialogContent");

const NODE_RADIUS = 22;
const LEVEL_HEIGHT = 120;
const NODE_SPACING = 110;
const MARGIN = 90;
const GRID_WIDTH = 7;
const LINK_COLORS_BY_COLUMN = [
  "#f2c94c",
  "#eb5757",
  "#56ccf2",
  "#bdbdbd",
  "#6fcf97",
  "#bb6bd9",
  "#f2994a"
];
let currentLevels = [];
let activeNodeIds = new Set();
let chosenNodeIds = new Set();
let chosenNodeByLevel = new Map();
let nodeElements = new Map();
let linkElements = [];

const ICONS_BY_ROOM_TYPE = {
  normal: "/assets/icons/normal.svg",
  elite: "/assets/icons/elite.svg",
  trap: "/assets/icons/trap.svg",
  unknown: "/assets/icons/unknown.svg",
  treasure: "/assets/icons/treasure.svg",
  camp: "/assets/icons/camp.svg"
};

function positionNodes(levels) {
  const svgWidth = Math.max(700, (GRID_WIDTH - 1) * NODE_SPACING + MARGIN * 2);
  const svgHeight = (levels.length - 1) * LEVEL_HEIGHT + MARGIN * 2;
  const gridWidth = (GRID_WIDTH - 1) * NODE_SPACING;
  const startX = (svgWidth - gridWidth) / 2;

  levels.forEach((levelNodes, levelIndex) => {
    levelNodes.forEach((node) => {
      node.x = startX + node.column * NODE_SPACING;
      node.y = svgHeight - MARGIN - levelIndex * LEVEL_HEIGHT;
    });
  });

  return { svgWidth, svgHeight };
}

function drawLinks(levels) {
  linkElements = [];

  levels.flat().forEach((node) => {
    node.links.forEach((target) => {
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      const d = `M ${node.x} ${node.y - NODE_RADIUS} L ${target.x} ${target.y + NODE_RADIUS}`;

      path.setAttribute("d", d);
      path.setAttribute("class", "link");
      path.setAttribute("stroke", LINK_COLORS_BY_COLUMN[node.column]);
      linkElements.push({ path, source: node, target });
      svg.appendChild(path);
    });
  });
}

function drawNodes(levels) {
  nodeElements = new Map();

  levels.flat().forEach((node) => {
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.setAttribute("class", `node ${node.type}`);
    group.setAttribute("transform", `translate(${node.x}, ${node.y})`);

    group.style.setProperty("--column-color", LINK_COLORS_BY_COLUMN[node.column]);

    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("r", NODE_RADIUS);

    const icon = document.createElementNS("http://www.w3.org/2000/svg", "image");
    icon.setAttribute("href", ICONS_BY_ROOM_TYPE[node.type]);
    icon.setAttribute("x", "-16");
    icon.setAttribute("y", "-16");
    icon.setAttribute("width", "32");
    icon.setAttribute("height", "32");
    icon.setAttribute("class", "node-icon");

    group.appendChild(circle);
    group.appendChild(icon);

    if (node.skill && node.dc) {
      const check = document.createElementNS("http://www.w3.org/2000/svg", "text");
      check.textContent = `${node.skill} ${node.dc}`;
      check.setAttribute("y", "34");
      check.setAttribute("class", "check-text");
      group.appendChild(check);
    }

    group.setAttribute("role", "button");
    group.setAttribute("tabindex", "0");
    group.setAttribute("aria-label", `${node.label}, encontro ${node.level}, coluna ${node.column + 1}`);
    group.addEventListener("click", () => openNodeDialog(node));
    group.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openNodeDialog(node);
      }
    });

    nodeElements.set(node.id, group);
    svg.appendChild(group);
  });
}

function updateInfo(levels) {
  const allNodes = levels.flat();
  const counts = {
    normal: 0,
    elite: 0,
    trap: 0,
    unknown: 0,
    treasure: 0,
    camp: 0
  };

  allNodes.forEach((node) => {
    counts[node.type]++;
  });

  const totalNodes = allNodes.length;
  const totalLinks = allNodes.reduce((sum, node) => sum + node.links.length, 0);
  const floor = floorInput.value;
  const bossText = floor === "20" ? " | Boss após o mapa" : "";

  info.textContent =
    `Andar ${floor} | ` +
    `Encontros: ${levels.length}${bossText} | ` +
    `Nós: ${totalNodes} | ` +
    `Conexões: ${totalLinks} | ` +
    `Normais: ${counts.normal} | ` +
    `Elites: ${counts.elite} | ` +
    `Armadilhas: ${counts.trap} | ` +
    `Desconhecidos: ${counts.unknown} | ` +
    `Tesouros: ${counts.treasure} | ` +
    `Acampamentos: ${counts.camp}`;
}

function drawMap(levels) {
  const { svgWidth, svgHeight } = positionNodes(levels);

  svg.innerHTML = "";
  svg.setAttribute("width", svgWidth);
  svg.setAttribute("height", svgHeight);

  drawLinks(levels);
  drawNodes(levels);
  updateExplorationDisplay();
  updateInfo(levels);
}

function isNodeChosen(node) {
  return chosenNodeIds.has(node.id);
}

function isNodeActive(node) {
  return activeNodeIds.has(node.id);
}

function canOpenNode(node) {
  return isNodeActive(node) || isNodeChosen(node);
}

function initializeExploration(levels) {
  chosenNodeIds = new Set();
  chosenNodeByLevel = new Map();
  activeNodeIds = new Set(levels[0].map((node) => node.id));
}

function updateExplorationDisplay() {
  currentLevels.flat().forEach((node) => {
    const element = nodeElements.get(node.id);
    const chosen = isNodeChosen(node);
    const active = isNodeActive(node);

    if (!element) return;

    element.classList.toggle("is-chosen", chosen);
    element.classList.toggle("is-active", active && !chosen);
    element.classList.toggle("is-locked", !active && !chosen);
    element.setAttribute("aria-disabled", String(!canOpenNode(node)));
    element.setAttribute("tabindex", canOpenNode(node) ? "0" : "-1");
  });

  linkElements.forEach(({ path, source, target }) => {
    const routeLink = isNodeChosen(source) && isNodeActive(target);
    const traversedLink = isNodeChosen(source) && isNodeChosen(target);
    const visibleLink = routeLink || traversedLink || isNodeActive(source) || isNodeChosen(source);

    path.classList.toggle("is-route", routeLink || traversedLink);
    path.classList.toggle("is-dimmed", !visibleLink);
  });
}

function chooseRoute(node) {
  if (!isNodeActive(node) || chosenNodeByLevel.has(node.level)) return;

  chosenNodeByLevel.set(node.level, node.id);
  chosenNodeIds.add(node.id);

  currentLevels[node.level - 1].forEach((levelNode) => {
    activeNodeIds.delete(levelNode.id);
  });

  if (node.level < currentLevels.length) {
    node.links.forEach((target) => activeNodeIds.add(target.id));
  }

  updateExplorationDisplay();
}

function createEnvironmentGroup(title, items) {
  const section = document.createElement("section");
  const heading = document.createElement("h3");
  const list = document.createElement("ul");

  heading.textContent = title;
  section.className = "environment-group";
  list.className = "environment-list";

  items.forEach((item) => {
    const entry = document.createElement("li");
    const name = document.createElement("strong");
    const effect = document.createElement("span");

    name.textContent = item.name;
    effect.textContent = item.effect;

    entry.appendChild(name);
    entry.appendChild(effect);
    list.appendChild(entry);
  });

  section.appendChild(heading);
  section.appendChild(list);

  return section;
}

function createDetailLine(label, value) {
  const item = document.createElement("p");
  const name = document.createElement("strong");
  const text = document.createElement("span");

  item.className = "detail-line";
  name.textContent = `${label}: `;
  text.textContent = value;

  item.appendChild(name);
  item.appendChild(text);

  return item;
}

function createRouteChoiceControl(node) {
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  const text = document.createElement("span");

  label.className = "route-choice";
  checkbox.type = "checkbox";
  checkbox.checked = isNodeChosen(node);
  checkbox.disabled = isNodeChosen(node) || chosenNodeByLevel.has(node.level);
  text.textContent = isNodeChosen(node) ? "Rota escolhida" : "Marcar como rota escolhida";

  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      chooseRoute(node);
      nodeDialog.close();
    }
  });

  label.appendChild(checkbox);
  label.appendChild(text);

  return label;
}

function openNodeDialog(node) {
  if (!canOpenNode(node)) return;

  const checkText = node.skill && node.dc ? `${node.skill} ${node.dc}` : "Sem teste de descoberta";

  nodeDialogTitle.textContent = `Encontro ${node.level}`;
  nodeDialogType.textContent = node.label;
  nodeDialogContent.innerHTML = "";
  nodeDialogContent.appendChild(createDetailLine("Coluna", String(node.column + 1)));
  nodeDialogContent.appendChild(createDetailLine("Teste", checkText));

  nodeDialogContent.appendChild(createRouteChoiceControl(node));

  nodeDialogContent.appendChild(createEnvironmentGroup("Clima", node.environment.climate));
  nodeDialogContent.appendChild(
    createEnvironmentGroup("Terreno", [node.environment.terrain, ...node.environment.terrain.features])
  );

  nodeDialog.showModal();
}

function syncRecommendationsWithFloor() {
  const floor = Number(floorInput.value);
  depthInput.value = encountersByFloor[floor];
  baseDcInput.value = baseDcByFloor[floor];
}

function generateMap() {
  let depth = Number(depthInput.value);
  let baseDC = Number(baseDcInput.value);

  if (depth < 3) depth = 3;
  if (depth > 20) depth = 20;

  if (baseDC < 5) baseDC = 5;
  if (baseDC > 40) baseDC = 40;

  depthInput.value = depth;
  baseDcInput.value = baseDC;

  const levels = generateMapData(depth, baseDC);

  currentLevels = levels;
  initializeExploration(levels);
  drawMap(levels);
}

floorInput.addEventListener("change", () => {
  syncRecommendationsWithFloor();
});

generateButton.addEventListener("click", () => {
  generateMap();
});

nodeDialog.addEventListener("click", (event) => {
  if (event.target === nodeDialog) {
    nodeDialog.close();
  }
});

if ("serviceWorker" in navigator) {
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

syncRecommendationsWithFloor();
generateMap();
