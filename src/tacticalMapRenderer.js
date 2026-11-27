import { readLegacyTacticalScene } from "./tacticalScene.js";
import {
  TACTICAL_FEATURE_LABELS,
  TACTICAL_MARKER_GLYPHS,
  TACTICAL_MARKER_LABELS,
  TACTICAL_TERRAIN_LABELS,
  getFeatureAutotileClasses,
  getTerrainTileClasses
} from "./tacticalTerrain.js";

const PIECE_LABELS = { party: "Grupo", boss: "Chefe", enemy: "Inimigo", extra: "Peça temporária" };
const SIDE_LABELS = { ally: "Aliado", party: "Aliado", enemy: "Inimigo" };
const DIRECTIONS = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0] };
const WATER_TILES = new Set(["water", "deep-water", "current"]);
const SIZE_OPTIONS = ["Minúsculo", "Pequeno", "Médio", "Grande", "Enorme", "Colossal"];

export const TACTICAL_LEGEND_ORDER = [
  "wall", "party", "boss", "enemy", "hidden", "trap", "pit", "web",
  "water", "current", "lava", "deck", "bridge", "canopy", "tree", "foliage", "swamp", "wet", "clearing",
  "slope", "trench", "wind", "concealment", "difficult", "polished-crystal", "crystal-shards", "mechanism",
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

function readScene(tacticalMap) {
  return tacticalMap?.scene ?? readLegacyTacticalScene(tacticalMap);
}

function createOverlay(entry, layer) {
  const { type } = entry;
  const labels = layer === "marker" ? TACTICAL_MARKER_LABELS : TACTICAL_FEATURE_LABELS;
  const overlay = createElement("span", `tactical-overlay tactical-${layer} tactical-sprite tactical-${layer}-sprite is-${type}`);
  overlay.title = entry.label || labels[type] || type;
  if (layer === "marker") overlay.textContent = TACTICAL_MARKER_GLYPHS[type] || "•";
  return overlay;
}

function positionPiece(token, x, y) {
  token.style.setProperty("--piece-x", String(x));
  token.style.setProperty("--piece-y", String(y));
}

function pieceColor(piece) {
  if (piece.kind === "boss") return "is-boss";
  return piece.side === "enemy" ? "is-enemy" : "is-ally";
}

function installPieceInteractions(token, state, pieceId, layer, scene, showMovement) {
  const currentPiece = () => state.pieces.find((piece) => piece.id === pieceId);
  let drag = null;

  token.addEventListener("click", () => state.selectPiece(pieceId));
  token.addEventListener("keydown", (event) => {
    const direction = DIRECTIONS[event.key];
    const piece = currentPiece();
    if (!direction || !piece) return;
    event.preventDefault();
    state.selectPiece(pieceId);
    state.movePiece(pieceId, piece.x + direction[0], piece.y + direction[1]);
  });

  function destination(event) {
    const { piece, startX, startY, cellWidth, cellHeight } = drag;
    return [
      Math.max(0, Math.min(scene.width - piece.width, piece.x + Math.round((event.clientX - startX) / cellWidth))),
      Math.max(0, Math.min(scene.height - piece.height, piece.y + Math.round((event.clientY - startY) / cellHeight)))
    ];
  }

  token.addEventListener("pointerdown", (event) => {
    if (drag || event.button !== 0 || !event.isPrimary) return;
    const piece = currentPiece();
    if (!piece) return;
    const bounds = layer.getBoundingClientRect();
    const origin = createElement("span", "tactical-piece tactical-drag-origin", "×");
    origin.setAttribute("aria-hidden", "true");
    positionPiece(origin, piece.x, piece.y);
    origin.style.setProperty("--piece-width", String(piece.width));
    origin.style.setProperty("--piece-height", String(piece.height));
    layer.prepend(origin);
    drag = {
      origin, piece, id: event.pointerId, startX: event.clientX, startY: event.clientY,
      cellWidth: bounds.width / scene.width, cellHeight: bounds.height / scene.height
    };
    token.setPointerCapture(event.pointerId);
    token.focus({ preventScroll: true });
    state.selectPiece(pieceId);
    token.classList.add("is-dragging");
  });

  token.addEventListener("pointermove", (event) => {
    if (drag?.id !== event.pointerId) return;
    const target = destination(event);
    positionPiece(token, ...target);
    showMovement(currentPiece(), state.previewMovement(...target));
  });
  token.addEventListener("pointerup", (event) => {
    if (drag?.id !== event.pointerId) return;
    const [x, y] = destination(event);
    drag.origin.remove();
    drag = null;
    token.classList.remove("is-dragging");
    positionPiece(token, x, y);
    state.movePiece(pieceId, x, y);
    showMovement(currentPiece(), state.movementSquares);
  });
  function cancelDrag(event) {
    if (drag?.id !== event.pointerId) return;
    drag.origin.remove();
    drag = null;
    token.classList.remove("is-dragging");
    const piece = currentPiece();
    if (piece) positionPiece(token, piece.x, piece.y);
    showMovement(piece, state.movementSquares);
  }

  token.addEventListener("pointercancel", cancelDrag);
  token.addEventListener("lostpointercapture", cancelDrag);
}

function renderTacticalGrid(scene, state, updateLegend, updateControls) {
  const grid = createElement("div", "tactical-grid");
  grid.setAttribute("role", "group");
  grid.setAttribute("aria-label", "Grade tática");
  grid.style.setProperty("--tactical-width", String(scene.width));
  grid.style.setProperty("--tactical-height", String(scene.height));
  grid.style.setProperty("--tactical-aspect", `${scene.width} / ${scene.height}`);
  grid.style.setProperty("--tactical-fit-ratio", String(scene.width / scene.height));
  grid.style.setProperty("--tactical-max-width", `${scene.width * 40}px`);

  const tiles = scene.terrain.map((type, index) => {
    const base = scene.terrainBase?.[index] ?? null;
    const tile = createElement("span", `tactical-cell tactical-sprite is-${base ?? type}`);
    if (base) tile.classList.add("has-item", `item-${type}`);
    tile.title = TACTICAL_TERRAIN_LABELS[type] || type;
    tile.classList.add(...getTerrainTileClasses(scene.terrain, scene.width, index, scene.terrainBase));
    if (WATER_TILES.has(type)) {
      const x = index % scene.width;
      const neighbors = {
        top: index >= scene.width ? index - scene.width : -1,
        right: x < scene.width - 1 ? index + 1 : -1,
        bottom: index + scene.width < scene.terrain.length ? index + scene.width : -1,
        left: x > 0 ? index - 1 : -1
      };
      for (const [side, neighbor] of Object.entries(neighbors)) {
        if (neighbor >= 0 && !WATER_TILES.has(scene.terrain[neighbor])) tile.classList.add(`shore-${side}`);
      }
    }
    grid.appendChild(tile);
    return tile;
  });
  const attachedMarkers = new Map();
  const addOverlay = (entry, layer) => {
    for (const index of entry.indices || []) {
      const tile = tiles[index];
      if (!tile) continue;
      const overlay = createOverlay(entry, layer);
      tile.title += ` · ${overlay.title}`;
      tile.appendChild(overlay);
    }
  };
  scene.features.filter((entry) => entry.type !== "canopy").forEach((entry) => addOverlay(entry, "feature"));
  scene.markers.forEach((entry) => {
    if (!entry.pieceId) {
      addOverlay(entry, "marker");
      return;
    }
    if (!attachedMarkers.has(entry.pieceId)) attachedMarkers.set(entry.pieceId, []);
    attachedMarkers.get(entry.pieceId).push(entry);
  });

  const layer = createElement("div", "tactical-piece-layer");
  const tokens = new Map();
  grid.appendChild(layer);

  // Toldo: desenhado por cima das peças (sem capturar cliques), com contorno único por feature.
  const canopyCells = scene.features.filter((entry) => entry.type === "canopy").flatMap((entry) =>
    (entry.indices || []).map((index) => {
      const cell = createElement("span", "tactical-canopy-cell is-canopy");
      cell.classList.add(...getFeatureAutotileClasses("canopy", entry.indices, scene.width, index));
      cell.style.gridColumn = String(index % scene.width + 1);
      cell.style.gridRow = String(Math.floor(index / scene.width) + 1);
      cell.title = entry.label || TACTICAL_FEATURE_LABELS.canopy || "canopy";
      return cell;
    }));
  if (canopyCells.length) {
    const canopyLayer = createElement("div", "tactical-canopy-layer");
    canopyLayer.append(...canopyCells);
    grid.appendChild(canopyLayer);
  }

  function update() {
    const pieces = state?.pieces ?? scene.pieces;
    const ids = new Set(pieces.map((piece) => piece.id));
    for (const [id, token] of tokens) {
      if (!ids.has(id)) {
        token.remove();
        tokens.delete(id);
      }
    }
    for (const piece of pieces) {
      let token = tokens.get(piece.id);
      if (!token) {
        token = createElement(state ? "button" : "span", "tactical-piece");
        const disc = createElement("span", "tactical-piece-disc");
        token.appendChild(disc);
        for (const entry of attachedMarkers.get(piece.id) ?? []) token.appendChild(createOverlay(entry, "marker"));
        if (state) {
          token.type = "button";
          installPieceInteractions(token, state, piece.id, layer, scene, (piece, squares) => {
            if (piece?.id === state.selectedId) updateControls?.(piece, squares);
          });
        }
        layer.appendChild(token);
        tokens.set(piece.id, token);
      }
      const isSelected = piece.id === state?.selectedId;
      token.dataset.pieceId = piece.id;
      token.dataset.side = piece.side;
      token.classList.toggle("is-selected", isSelected);
      const color = pieceColor(piece);
      for (const name of ["is-ally", "is-enemy", "is-boss"]) token.classList.toggle(name, color === name);
      token.title = `${piece.name} · ${SIDE_LABELS[piece.side] || piece.side}`;
      token.setAttribute("aria-label", piece.name);
      if (state) token.setAttribute("aria-pressed", String(isSelected));
      token.style.setProperty("--piece-width", String(piece.width));
      token.style.setProperty("--piece-height", String(piece.height));
      if (!token.classList.contains("is-dragging")) positionPiece(token, piece.x, piece.y);
      token.firstElementChild.textContent = piece.glyph || piece.name.slice(0, 2).toLocaleUpperCase("pt-BR");
    }
    updateLegend?.(pieces);
    updateControls?.(pieces.find((piece) => piece.id === state?.selectedId), state?.movementSquares);
  }

  update();
  const unsubscribe = state?.subscribe(() => {
    if (grid.isConnected) update();
    else unsubscribe();
  });
  return { grid, unsubscribe };
}

export function createTacticalGrid(tacticalMap, { state } = {}) {
  return renderTacticalGrid(readScene(tacticalMap), state).grid;
}

function updateTacticalLegend(legend, scene, pieces) {
  const appendEntry = (label, swatch) => {
    const item = createElement("span", "tactical-legend-item");
    item.append(swatch, document.createTextNode(label));
    legend.appendChild(item);
  };
  const addOverlays = (entries, layer, labels) => {
    const byLabel = new Map(entries.map((entry) => [entry.label || labels[entry.type] || entry.type, entry]));
    for (const [label, entry] of byLabel) {
      const swatch = createElement("span", "tactical-swatch tactical-overlay-swatch");
      swatch.appendChild(createOverlay(entry, layer));
      appendEntry(label, swatch);
    }
  };

  legend.replaceChildren();
  for (const type of new Set(scene.terrain)) {
    appendEntry(TACTICAL_TERRAIN_LABELS[type] || type, createElement("span", `tactical-swatch tactical-sprite is-${type}`));
  }
  addOverlays(scene.features, "feature", TACTICAL_FEATURE_LABELS);
  const visibleIds = new Set(pieces.map((piece) => piece.id));
  addOverlays(scene.markers.filter((entry) => !entry.pieceId || visibleIds.has(entry.pieceId)), "marker", TACTICAL_MARKER_LABELS);

  const pieceTypes = new Map(pieces.map((piece) => [
    piece.kind === "extra" ? `Peça temporária · ${SIDE_LABELS[piece.side]}` : PIECE_LABELS[piece.kind],
    piece
  ]));
  for (const [label, piece] of pieceTypes) {
    appendEntry(label, createElement("span", `tactical-swatch tactical-piece-disc ${pieceColor(piece)}`, piece.glyph?.[0]));
  }
}

export function createTacticalLegend(tacticalMap) {
  const legend = createElement("div", "tactical-legend");
  const scene = readScene(tacticalMap);
  if (scene) updateTacticalLegend(legend, scene, scene.pieces);
  return legend;
}

function createPieceControls(state) {
  const selection = createElement("span", "tactical-selection", "Selecione uma peça");
  selection.setAttribute("aria-live", "polite");
  const editor = createElement("dialog", "tactical-piece-dialog");
  editor.setAttribute("aria-label", "Adicionar peça temporária");
  const trigger = createButton("Adicionar peça", "extended-action is-compact", () => {
    if (editor.open) return;
    status.textContent = "";
    editor.showModal();
    name.focus();
  });
  trigger.setAttribute("aria-haspopup", "dialog");
  const remove = createButton("Remover peça", "extended-action is-compact", () => {
    state.removePiece(state.selectedId);
    trigger.focus();
  });

  const form = createElement("div", "tactical-piece-form");
  form.setAttribute("role", "group");
  form.setAttribute("aria-label", "Adicionar peça temporária");
  const status = createElement("span", "tactical-piece-form-status");
  status.setAttribute("role", "status");
  const name = createElement("input");
  name.name = "name";
  name.required = true;
  name.maxLength = 60;
  name.placeholder = "Nome da peça";
  name.setAttribute("aria-label", "Nome da peça");
  function options(name, label, values, defaultValue) {
    const select = createElement("select");
    select.name = name;
    select.setAttribute("aria-label", label);
    for (const [value, text] of values) {
      const option = createElement("option", null, text);
      option.value = value;
      select.appendChild(option);
    }
    select.value = defaultValue;
    return select;
  }

  const size = options("size", "Porte da peça", SIZE_OPTIONS.map((size) => [size, size]), "Médio");
  const side = options("side", "Lado da peça", [["ally", "Aliado"], ["enemy", "Inimigo"]], "ally");
  function addPiece() {
    const piece = state.addPiece({ name: name.value, size: size.value, side: side.value });
    status.textContent = piece ? "" : "Informe um nome e um porte que caiba na grade.";
    if (piece) {
      name.value = "";
      editor.close();
    }
  }
  name.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    addPiece();
  });
  const actions = createElement("div", "tactical-piece-dialog-actions");
  actions.append(
    createButton("Cancelar", "extended-action is-compact", () => editor.close()),
    createButton("Adicionar", "extended-action is-compact", addPiece)
  );
  const optionsRow = createElement("div", "tactical-piece-options");
  optionsRow.append(size, side);
  form.append(name, optionsRow, status, actions);
  editor.append(createElement("h3", null, "Adicionar peça temporária"), createElement("hr"), form);
  editor.addEventListener("close", () => trigger.focus());
  const addControl = createElement("div", "tactical-add-piece");
  const buttons = createElement("div", "tactical-piece-buttons");
  buttons.append(trigger, remove);
  addControl.append(selection, buttons, editor);

  return { addControl, update(piece, squares) {
    const label = piece ? `${piece.name} · ${SIDE_LABELS[piece.side]} · ${piece.width}×${piece.height} · ${squares} ${squares === 1 ? "quadrado" : "quadrados"}` : "Selecione uma peça";
    if (selection.textContent !== label) selection.textContent = label;
    remove.hidden = !piece;
  } };
}

function createBoardContents(tacticalMap, state) {
  const scene = readScene(tacticalMap);
  const legend = createElement("div", "tactical-legend");
  const pieceControls = state ? createPieceControls(state) : null;
  const board = renderTacticalGrid(scene, state, (pieces) => updateTacticalLegend(legend, scene, pieces), pieceControls?.update);
  return { ...board, legend, addControl: pieceControls?.addControl };
}

function appendClimate(header, tacticalMap) {
  const climates = (tacticalMap.scene?.climate ?? tacticalMap.climate ?? []).map((climate) => climate.name).filter(Boolean);
  if (climates.length) header.appendChild(createElement("span", "tactical-climate", climates.join(" · ")));
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

function createTacticalEnvironmentPanel(tacticalMap, addControl) {
  const panel = createElement("aside", "tactical-environment-panel");
  const terrainItems = tacticalMap.terrain
    ? [tacticalMap.terrain, ...(tacticalMap.terrain.features || [])]
    : [];
  const climateItems = tacticalMap.scene?.climate ?? tacticalMap.climate ?? [];

  if (!terrainItems.length && !climateItems.length) return null;

  if (terrainItems.length) panel.appendChild(createEnvironmentList("Terreno", terrainItems));
  if (climateItems.length) panel.appendChild(createEnvironmentList("Clima", climateItems));
  if (addControl) panel.appendChild(addControl);

  return panel;
}

export function openTacticalMapFullscreen(tacticalMap, { state } = {}) {
  if (!tacticalMap) return;
  const overlay = createElement("dialog", "tactical-fullscreen tactical-map-fullscreen");
  const panel = createElement("div", "tactical-fullscreen-panel tactical-map-fullscreen-panel");
  const header = createElement("div", "tactical-map-header");
  const content = createElement("div", "tactical-map-content");
  const mapColumn = createElement("div", "tactical-map-column");
  const board = createBoardContents(tacticalMap, state);
  const environmentPanel = createTacticalEnvironmentPanel(tacticalMap, board.addControl);
  content.classList.toggle("has-environment", Boolean(environmentPanel));
  const title = createElement(
    "strong",
    null,
    `Mapa ${tacticalMap.width}x${tacticalMap.height} | ${tacticalMap.enemyCount} inimigo(s) | ${tacticalMap.trapCount} zona(s) de risco`
  );

  function close() {
    if (overlay.open) overlay.close();
  }

  overlay.addEventListener("cancel", event => {
    event.preventDefault();
    close();
  });

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) close();
  });
  overlay.addEventListener("close", () => {
    board.unsubscribe?.();
    overlay.remove();
  });

  header.appendChild(title);
  appendClimate(header, tacticalMap);
  header.appendChild(createButton("Fechar", "extended-action is-compact", close));
  panel.appendChild(header);
  if (environmentPanel) content.appendChild(environmentPanel);
  mapColumn.append(board.grid, board.legend);
  if (board.addControl && !board.addControl.parentElement) mapColumn.appendChild(board.addControl);
  content.appendChild(mapColumn);
  panel.appendChild(content);
  overlay.appendChild(panel);
  document.body.appendChild(overlay);
  overlay.showModal();
}

export function createTacticalMapPanel(tacticalMap, {
  extraActions = [],
  mapKind = null,
  onRerollMap = null,
  state
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

  actions.appendChild(createButton("Expandir", "extended-action is-compact", () => openTacticalMapFullscreen(tacticalMap, { state })));
  extraActions.forEach((action) => actions.appendChild(action));
  if (onRerollMap && !tacticalMap.preset) {
    actions.appendChild(createButton("Gerar outro mapa", "extended-action is-compact", onRerollMap));
  }

  header.appendChild(title);
  appendClimate(header, tacticalMap);
  header.appendChild(actions);
  section.appendChild(header);
  const board = createBoardContents(tacticalMap, state);
  section.append(board.grid, board.legend);
  if (board.addControl) section.appendChild(board.addControl);

  return section;
}
