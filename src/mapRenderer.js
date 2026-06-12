import { assetUrl } from "./assetUrl.js";

const NODE_RADIUS = 22;
const LEVEL_HEIGHT = 120;
const NODE_SPACING = 110;
const MARGIN = 90;
const GRID_WIDTH = 7;
const ICONS_BY_ROOM_TYPE = {
  normal: assetUrl("/assets/icons/normal.svg"),
  elite: assetUrl("/assets/icons/elite.svg"),
  boss: assetUrl("/assets/icons/boss.svg"),
  trap: assetUrl("/assets/icons/trap.svg"),
  unknown: assetUrl("/assets/icons/unknown.svg"),
  treasure: assetUrl("/assets/icons/treasure.svg"),
  camp: assetUrl("/assets/icons/camp.svg"),
};

function createSvgElement(tagName) {
  return document.createElementNS("http://www.w3.org/2000/svg", tagName);
}

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

function createCheckLabel(node) {
  const checkGroup = createSvgElement("g");
  const checkBackground = createSvgElement("rect");
  const check = createSvgElement("text");

  check.textContent = `${node.skill} ${node.dc}`;
  check.setAttribute("y", "34");
  check.setAttribute("class", "check-text");

  const backgroundWidth = Math.max(62, check.textContent.length * 6 + 12);

  checkBackground.setAttribute("class", "check-background");
  checkBackground.setAttribute("x", String(-backgroundWidth / 2));
  checkBackground.setAttribute("y", "24");
  checkBackground.setAttribute("width", String(backgroundWidth));
  checkBackground.setAttribute("height", "18");
  checkBackground.setAttribute("rx", "4");

  checkGroup.setAttribute("class", "check-label");
  checkGroup.appendChild(checkBackground);
  checkGroup.appendChild(check);

  return checkGroup;
}

export function createMapRenderer({ svg, onNodeOpen, hiddenNodeIcon = assetUrl("/assets/icons/hidden-forest.svg") }) {
  let activeHiddenNodeIcon = hiddenNodeIcon;
  let nodeElements = new Map();
  let linkElements = [];

  function drawLinks(levels, columnColors) {
    linkElements = [];

    levels.flat().forEach((node) => {
      node.links.forEach((target) => {
        const path = createSvgElement("path");
        const d = `M ${node.x} ${node.y - NODE_RADIUS} L ${target.x} ${target.y + NODE_RADIUS}`;

        path.setAttribute("d", d);
        path.setAttribute("class", "link");
        path.setAttribute("stroke", columnColors[node.column]);
        linkElements.push({ path, source: node, target });
        svg.appendChild(path);
      });
    });
  }

  function drawNodes(levels, columnColors) {
    nodeElements = new Map();

    levels.flat().forEach((node) => {
      const group = createSvgElement("g");
      const circle = createSvgElement("circle");
      const icon = createSvgElement("image");

      group.setAttribute("class", `node ${node.type}`);
      group.setAttribute("transform", `translate(${node.x}, ${node.y})`);
      group.style.setProperty("--column-color", columnColors[node.column]);

      circle.setAttribute("r", NODE_RADIUS);

      icon.setAttribute("href", ICONS_BY_ROOM_TYPE[node.type]);
      icon.setAttribute("x", "-16");
      icon.setAttribute("y", "-16");
      icon.setAttribute("width", "32");
      icon.setAttribute("height", "32");
      icon.setAttribute("class", "node-icon");
      icon.dataset.revealedIcon = ICONS_BY_ROOM_TYPE[node.type];

      group.appendChild(circle);
      group.appendChild(icon);

      if (node.skill && node.dc) {
        group.appendChild(createCheckLabel(node));
      }

      group.setAttribute("role", "button");
      group.setAttribute("tabindex", "0");
      group.setAttribute("aria-label", `${node.label}, encontro ${node.level}, coluna ${node.column + 1}`);
      group.addEventListener("click", () => onNodeOpen(node));
      group.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onNodeOpen(node);
        }
      });

      nodeElements.set(node.id, group);
      svg.appendChild(group);
    });
  }

  function drawMap(levels, columnColors) {
    const { svgWidth, svgHeight } = positionNodes(levels);

    svg.innerHTML = "";
    svg.setAttribute("width", svgWidth);
    svg.setAttribute("height", svgHeight);

    drawLinks(levels, columnColors);
    drawNodes(levels, columnColors);
  }

  function updateDisplay(levels, state) {
    levels.flat().forEach((node) => {
      const element = nodeElements.get(node.id);

      if (!element) return;

      const nodeState = state.getNodeViewState(node);
      const icon = element.querySelector(".node-icon");

      element.classList.toggle("is-chosen", nodeState.chosen);
      element.classList.toggle("is-active", nodeState.active && !nodeState.chosen);
      element.classList.toggle("is-explored", nodeState.explored);
      element.classList.toggle("is-attempted", nodeState.attempted);
      element.classList.toggle("is-locked", nodeState.locked);
      element.classList.toggle("is-hidden-path", !nodeState.visible);
      element.classList.toggle("is-concealed", nodeState.visible && !nodeState.revealed);

      if (icon) {
        icon.setAttribute("href", nodeState.revealed ? icon.dataset.revealedIcon : activeHiddenNodeIcon);
      }

      element.setAttribute("aria-disabled", String(!nodeState.canOpen));
      element.setAttribute("tabindex", nodeState.canOpen ? "0" : "-1");
    });

    linkElements.forEach(({ path, source, target }) => {
      const linkState = state.getLinkViewState(source, target);

      path.classList.toggle("is-route", linkState.route);
      path.classList.toggle("is-dimmed", linkState.dimmed);
      path.classList.toggle("is-hidden-path", linkState.hidden);
    });
  }

  function setHiddenNodeIcon(nextHiddenNodeIcon) {
    activeHiddenNodeIcon = nextHiddenNodeIcon;
  }

  return {
    drawMap,
    setHiddenNodeIcon,
    updateDisplay
  };
}
