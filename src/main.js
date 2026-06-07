import "./styles.css";
import { generateMapData } from "./generator.js";
import { encountersByFloor } from "./tables.js";

const svg = document.getElementById("map");
const info = document.getElementById("info");
const floorInput = document.getElementById("floorInput");
const depthInput = document.getElementById("depthInput");
const convergenceInput = document.getElementById("convergenceInput");
const generateButton = document.getElementById("generateButton");

const NODE_RADIUS = 22;
const LEVEL_HEIGHT = 120;
const NODE_SPACING = 110;
const MARGIN = 90;

function positionNodes(levels) {
  const maxNodesInAnyLevel = Math.max(...levels.map((level) => level.length));
  const svgWidth = Math.max(700, maxNodesInAnyLevel * NODE_SPACING + MARGIN * 2);
  const svgHeight = (levels.length - 1) * LEVEL_HEIGHT + MARGIN * 2;

  levels.forEach((levelNodes, levelIndex) => {
    const levelWidth = Math.max(1, levelNodes.length - 1) * NODE_SPACING;
    const startX = (svgWidth - levelWidth) / 2;

    levelNodes.forEach((node, index) => {
      node.x = startX + index * NODE_SPACING;
      node.y = svgHeight - MARGIN - levelIndex * LEVEL_HEIGHT;
    });
  });

  return { svgWidth, svgHeight };
}

function drawLinks(levels) {
  levels.flat().forEach((node) => {
    node.links.forEach((target) => {
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      const midY = (node.y + target.y) / 2;
      const d = `
        M ${node.x} ${node.y - NODE_RADIUS}
        C ${node.x} ${midY},
          ${target.x} ${midY},
          ${target.x} ${target.y + NODE_RADIUS}
      `;

      path.setAttribute("d", d);
      path.setAttribute("class", "link");
      svg.appendChild(path);
    });
  });
}

function drawNodes(levels) {
  levels.flat().forEach((node) => {
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.setAttribute("class", `node ${node.type}`);
    group.setAttribute("transform", `translate(${node.x}, ${node.y})`);

    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("r", NODE_RADIUS);

    const symbol = document.createElementNS("http://www.w3.org/2000/svg", "text");
    symbol.textContent = node.short;
    symbol.setAttribute("y", "-3");

    group.appendChild(circle);
    group.appendChild(symbol);

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
    treasure: 0
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
    `Tesouros: ${counts.treasure}`;
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

function syncEncountersWithFloor() {
  const floor = Number(floorInput.value);
  depthInput.value = encountersByFloor[floor];
}

function generateMap() {
  let depth = Number(depthInput.value);
  let convergencePercent = Number(convergenceInput.value);

  if (depth < 3) depth = 3;
  if (depth > 20) depth = 20;

  if (convergencePercent < 0) convergencePercent = 0;
  if (convergencePercent > 100) convergencePercent = 100;

  depthInput.value = depth;
  convergenceInput.value = convergencePercent;

  const convergenceChance = convergencePercent / 100;
  const floor = Number(floorInput.value);
  const levels = generateMapData(depth, convergenceChance, floor);

  drawMap(levels);
}

floorInput.addEventListener("change", () => {
  syncEncountersWithFloor();
});

generateButton.addEventListener("click", () => {
  generateMap();
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js");
  });
}

syncEncountersWithFloor();
generateMap();
