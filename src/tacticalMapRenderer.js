const TACTICAL_CELL_LABELS = {
  advantage: "Vantagem/elevação",
  boss: "Chefe Grande",
  clearing: "Clareira",
  concealment: "Visibilidade reduzida",
  current: "Água corrente",
  difficult: "Terreno difícil",
  door: "Porta (entrada/saída)",
  enemy: "Inimigo",
  floor: "Chão",
  foliage: "Folhagem/vegetação",
  hidden: "Inimigo oculto/em potencial",
  mechanism: "Mecanismo",
  objective: "Objetivo/achado",
  obstacle: "Obstáculo/cobertura",
  party: "Grupo",
  pit: "Fosso/vão",
  reinforcement: "Entrada de reforço",
  slope: "Inclinação",
  swamp: "Solo de pântano/lodaçal",
  trap: "Armadilha",
  trench: "Trincheira",
  tree: "Árvore",
  wall: "Parede",
  water: "Água",
  wet: "Solo encharcado",
  wind: "Vento forte",
  web: "Teia/casulo"
};

const TACTICAL_CELL_GLYPHS = {
  advantage: "✦",
  boss: "B",
  clearing: "C",
  concealment: "?",
  current: "≈",
  enemy: "E",
  foliage: "F",
  hidden: "?",
  mechanism: "M",
  objective: "!",
  party: "G",
  pit: "F",
  reinforcement: "R",
  slope: "I",
  swamp: "L",
  trap: "T",
  trench: "V",
  tree: "A",
  water: "~",
  wet: "U",
  wind: ">",
  web: "W"
};

const TACTICAL_LEGEND_ORDER = [
  "wall", "party", "boss", "enemy", "hidden", "trap", "pit", "web",
  "water", "current", "tree", "foliage", "swamp", "wet", "clearing",
  "slope", "trench", "wind", "concealment", "difficult", "mechanism",
  "objective", "door", "advantage", "obstacle", "reinforcement"
];

function createElement(tagName, className = null, text = null) {
  const element = document.createElement(tagName);

  if (className) element.className = className;
  if (text !== null) element.textContent = text;

  return element;
}

function createButton(label, className, onClick) {
  const button = createElement("button", className, label);

  button.type = "button";
  button.addEventListener("click", onClick);

  return button;
}

function getTacticalCellLabel(cell) {
  return TACTICAL_CELL_LABELS[cell] || cell;
}

export function createTacticalGrid(tacticalMap) {
  const grid = createElement("div", "tactical-grid");

  grid.style.setProperty("--tactical-width", String(tacticalMap.width));
  grid.style.setProperty("--tactical-height", String(tacticalMap.height));
  grid.style.setProperty("--tactical-aspect", `${tacticalMap.width} / ${tacticalMap.height}`);
  grid.style.setProperty("--tactical-fit-ratio", String(tacticalMap.width / tacticalMap.height));
  grid.style.setProperty("--tactical-max-width", `${tacticalMap.width * 40}px`);

  tacticalMap.cells.forEach((cell) => {
    const tile = createElement("span", `tactical-cell is-${cell}`);
    const glyph = TACTICAL_CELL_GLYPHS[cell];

    tile.title = getTacticalCellLabel(cell);
    if (glyph) tile.textContent = glyph;
    grid.appendChild(tile);
  });

  return grid;
}

export function createTacticalLegend(tacticalMap) {
  const legend = createElement("div", "tactical-legend");
  const presentCells = new Set(tacticalMap?.cells || []);
  const cells = TACTICAL_LEGEND_ORDER.filter((cell) => presentCells.has(cell));

  cells.forEach((cell) => {
    const item = createElement("span", "tactical-legend-item");
    const swatch = createElement("span", `tactical-swatch is-${cell}`);
    const glyph = TACTICAL_CELL_GLYPHS[cell];

    if (glyph) swatch.textContent = glyph;
    item.appendChild(swatch);
    item.appendChild(document.createTextNode(getTacticalCellLabel(cell)));
    legend.appendChild(item);
  });

  return legend;
}

function createEnvironmentList(title, items) {
  const section = createElement("section", "tactical-environment-section");
  const heading = createElement("h3", null, title);
  const list = createElement("ul", "tactical-environment-list");

  items.forEach((item) => {
    const entry = createElement("li");
    const name = createElement("strong", null, item.name);
    const effect = createElement("span", null, item.effect);

    entry.appendChild(name);
    entry.appendChild(effect);
    list.appendChild(entry);
  });

  section.appendChild(heading);
  section.appendChild(list);
  return section;
}

function createTacticalEnvironmentPanel(tacticalMap) {
  const panel = createElement("aside", "tactical-environment-panel");
  const terrainItems = tacticalMap.terrain
    ? [tacticalMap.terrain, ...(tacticalMap.terrain.features || [])]
    : [];
  const climateItems = tacticalMap.climate || [];

  if (!terrainItems.length && !climateItems.length) return null;

  if (terrainItems.length) panel.appendChild(createEnvironmentList("Terreno", terrainItems));
  if (climateItems.length) panel.appendChild(createEnvironmentList("Clima", climateItems));

  return panel;
}

export function openTacticalMapFullscreen(tacticalMap) {
  const overlay = createElement("dialog", "tactical-fullscreen tactical-map-fullscreen");
  const panel = createElement("div", "tactical-fullscreen-panel tactical-map-fullscreen-panel");
  const header = createElement("div", "tactical-map-header");
  const content = createElement("div", "tactical-map-content");
  const mapColumn = createElement("div", "tactical-map-column");
  const environmentPanel = createTacticalEnvironmentPanel(tacticalMap);
  const title = createElement(
    "strong",
    null,
    `Mapa ${tacticalMap.width}x${tacticalMap.height} | ${tacticalMap.enemyCount} inimigo(s) | ${tacticalMap.trapCount} zona(s) de risco`
  );

  function close() {
    document.removeEventListener("keydown", onKeyDown);
    if (overlay.open) overlay.close();
  }

  function onKeyDown(event) {
    if (event.key === "Escape") close();
  }

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) close();
  });
  overlay.addEventListener("close", () => {
    document.removeEventListener("keydown", onKeyDown);
    overlay.remove();
  });
  document.addEventListener("keydown", onKeyDown);

  header.appendChild(title);
  header.appendChild(createButton("Fechar", "extended-action is-compact", close));
  panel.appendChild(header);
  if (environmentPanel) content.appendChild(environmentPanel);
  mapColumn.appendChild(createTacticalGrid(tacticalMap));
  mapColumn.appendChild(createTacticalLegend(tacticalMap));
  content.appendChild(mapColumn);
  panel.appendChild(content);
  overlay.appendChild(panel);
  document.body.appendChild(overlay);
  overlay.showModal();
}

export function createTacticalMapPanel(tacticalMap, {
  extraActions = [],
  mapKind = null,
  onRerollMap = null
} = {}) {
  if (!tacticalMap) return null;

  const section = createElement("div", "tactical-map-panel");
  const header = createElement("div", "tactical-map-header");
  const title = createElement(
    "strong",
    null,
    `${mapKind || (tacticalMap.preset ? "Mapa da cena (fixo)" : "Mapa")} ${tacticalMap.width}x${tacticalMap.height} | ${tacticalMap.enemyCount} inimigo(s) | ${tacticalMap.trapCount} zona(s) de risco`
  );
  const actions = createElement("div", "tactical-map-actions");

  actions.appendChild(createButton("Expandir", "extended-action is-compact", () => openTacticalMapFullscreen(tacticalMap)));
  extraActions.forEach((action) => actions.appendChild(action));
  if (onRerollMap && !tacticalMap.preset) {
    actions.appendChild(createButton("Gerar outro mapa", "extended-action is-compact", onRerollMap));
  }

  header.appendChild(title);
  header.appendChild(actions);
  section.appendChild(header);
  section.appendChild(createTacticalGrid(tacticalMap));
  section.appendChild(createTacticalLegend(tacticalMap));

  return section;
}
