import "./styles.css";
import { generateMapData } from "./generator.js";
import { baseDcByFloor, encountersByFloor } from "./tables.js";

const svg = document.getElementById("map");
const info = document.getElementById("info");
const floorInput = document.getElementById("floorInput");
const depthInput = document.getElementById("depthInput");
const baseDcInput = document.getElementById("baseDcInput");
const generateButton = document.getElementById("generateButton");

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
  levels.flat().forEach((node) => {
    node.links.forEach((target) => {
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      const d = `M ${node.x} ${node.y - NODE_RADIUS} L ${target.x} ${target.y + NODE_RADIUS}`;

      path.setAttribute("d", d);
      path.setAttribute("class", "link");
      path.setAttribute("stroke", LINK_COLORS_BY_COLUMN[node.column]);
      svg.appendChild(path);
    });
  });
}

function drawNodes(levels) {
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
  updateInfo(levels);
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

  drawMap(levels);
}

floorInput.addEventListener("change", () => {
  syncRecommendationsWithFloor();
});

generateButton.addEventListener("click", () => {
  generateMap();
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
