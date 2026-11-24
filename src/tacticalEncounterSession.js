import { getTacticalFootprint, readLegacyTacticalScene } from "./tacticalScene.js";

const MAX_PARTY_SIZE = 8;
const DEFAULT_PARTY_SIZE = 4;
const partyBlocked = new Set(["wall", "pit", "abyss", "cliff", "escarpment", "obstacle", "lava"]);

function abbreviation(name) {
  const words = name.match(/[\p{L}\p{N}]+/gu) ?? [];
  const significant = words.filter(word => !/^(d[aeo]s?|e)$/iu.test(word));
  const parts = significant.length ? significant : words;
  return (parts.length > 1 ? parts[0][0] + parts[1][0] : parts[0]?.slice(0, 2) || "P")
    .toLocaleUpperCase("pt-BR");
}

function labelPieces(pieces) {
  const groups = new Map();
  for (const piece of pieces) {
    if (piece.kind === "party") continue;
    const label = abbreviation(piece.name);
    const key = piece.kind === "extra" ? `extra:${piece.side}:${label}` : `encounter:${piece.creatureId ?? piece.name}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push({ piece, label });
  }

  const glyphs = new Map();
  for (const group of groups.values()) {
    group.forEach(({ piece, label }, index) => {
      const glyph = group.length === 1 ? label
        : `${piece.kind === "extra" ? label : label[0]}${index + 1}`;
      glyphs.set(piece.id, glyph);
    });
  }
  return pieces.map(piece => ({ ...piece, glyph: glyphs.get(piece.id) ?? piece.glyph }));
}

function withParty(scene, count) {
  const startingParty = scene.pieces.filter(piece => piece.kind === "party").slice(0, count);
  const otherPieces = scene.pieces.filter(piece => piece.kind !== "party");
  const anchor = startingParty[0] ?? { x: 1, y: scene.height - 2 };
  const candidates = scene.terrain.flatMap((type, index) => {
    if (partyBlocked.has(type)) return [];
    const x = index % scene.width;
    const y = Math.floor(index / scene.width);
    const occupied = scene.pieces.some(piece =>
      x >= piece.x && x < piece.x + piece.width && y >= piece.y && y < piece.y + piece.height
    );
    return occupied ? [] : [{ x, y, distance: Math.abs(x - anchor.x) + Math.abs(y - anchor.y) }];
  }).sort((a, b) => a.distance - b.distance);
  const remaining = Math.min(count - startingParty.length, candidates.length);
  for (let index = 0; index < remaining; index++) {
    const { x, y } = candidates[index];
    startingParty.push({ id: `party-added:${index}`, kind: "party", side: "ally", x, y, width: 1, height: 1 });
  }
  return [...startingParty.map((piece, index) => ({
    ...piece, name: `Jogador ${index + 1}`, glyph: String(index + 1)
  })), ...otherPieces];
}

const difficultTerrain = new Set(["difficult", "foliage", "swamp", "wet"]);

function footprintIndices(piece, boardWidth) {
  const indices = [];
  for (let y = piece.y; y < piece.y + piece.height; y++) {
    for (let x = piece.x; x < piece.x + piece.width; x++) {
      indices.push(y * boardWidth + x);
    }
  }
  return indices;
}

function movementCost(scene, pieces, from, to) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const steps = Math.max(Math.abs(dx), Math.abs(dy));
  if (!steps) return 0;

  const difficult = new Set();
  for (const effect of scene.features ?? []) {
    if (difficultTerrain.has(effect.type)) {
      for (const index of effect.indices) difficult.add(index);
    }
  }
  for (const piece of pieces) {
    if ((piece.side === "enemy") !== (from.side === "enemy")) {
      for (const index of footprintIndices(piece, scene.width)) difficult.add(index);
    }
  }

  let cost = 0;
  let previous = from;
  let occupied = new Set(footprintIndices(from, scene.width));
  for (let step = 1; step <= steps; step++) {
    const current = {
      ...from,
      x: Math.round(from.x + dx * step / steps),
      y: Math.round(from.y + dy * step / steps)
    };
    const next = footprintIndices(current, scene.width);
    const entered = next.filter(index => !occupied.has(index));
    const leavesTrench = [...occupied].some(index => scene.terrain[index] === "trench") &&
      !next.some(index => scene.terrain[index] === "trench");
    const isDifficult = leavesTrench || entered.some(index =>
      difficult.has(index) || difficultTerrain.has(scene.terrain[index]));
    const diagonal = current.x !== previous.x && current.y !== previous.y;
    cost += (diagonal ? 2 : 1) * (isDifficult ? 2 : 1);
    previous = current;
    occupied = new Set(next);
  }
  return cost;
}

function createState(initialScene, initialPartySize) {
  let scene = initialScene;
  let partySize = initialPartySize;
  let pieces = labelPieces(withParty(scene, partySize));
  let selectedId = null;
  let movementSquares = 0;
  let nextId = 0;
  const moved = new Set();
  const removed = new Set();
  const listeners = new Set();

  function notify() {
    for (const listener of listeners) listener();
  }

  function fit(piece, x, y) {
    return {
      ...piece,
      x: Math.max(0, Math.min(scene.width - piece.width, Math.round(x))),
      y: Math.max(0, Math.min(scene.height - piece.height, Math.round(y)))
    };
  }

  function setSelection(id) {
    if (id !== selectedId) movementSquares = 0;
    selectedId = id;
  }

  return {
    get movementSquares() { return movementSquares; },
    previewMovement(x, y) {
      const piece = pieces.find(piece => piece.id === selectedId);
      if (!piece || !Number.isFinite(x) || !Number.isFinite(y)) return movementSquares;
      return movementSquares + movementCost(scene, pieces, piece, fit(piece, x, y));
    },
    get pieces() { return pieces; },
    get selectedId() { return selectedId; },

    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },

    reconcile(nextScene, count = partySize) {
      scene = nextScene;
      partySize = count;
      const existing = new Map(pieces.map(piece => [piece.id, piece]));
      const currentPieces = withParty(scene, partySize).filter(piece => !removed.has(piece.id)).map(piece => {
        const previous = existing.get(piece.id);
        return previous && moved.has(piece.id) ? fit(piece, previous.x, previous.y) : piece;
      });
      const extra = pieces.filter(piece => piece.kind === "extra").map(piece => fit(piece, piece.x, piece.y));
      pieces = labelPieces([...currentPieces, ...extra]);
      if (!pieces.some(piece => piece.id === selectedId)) setSelection(null);
      notify();
    },

    setPartySize(count) {
      this.reconcile(scene, count);
    },

    selectPiece(id) {
      setSelection(pieces.some(piece => piece.id === id) ? id : null);
      notify();
    },

    movePiece(id, x, y) {
      if (!Number.isFinite(x) || !Number.isFinite(y)) return;
      const index = pieces.findIndex(piece => piece.id === id);
      if (index < 0) return;
      const next = fit(pieces[index], x, y);
      if (next.x === pieces[index].x && next.y === pieces[index].y) return;
      if (id === selectedId) movementSquares += movementCost(scene, pieces, pieces[index], next);
      moved.add(id);
      pieces = pieces.map(piece => piece.id === id ? next : piece);
      notify();
    },

    addPiece({ name, size, side }) {
      const label = name?.trim();
      if (!label || !["ally", "enemy"].includes(side)) return null;
      const { width, height } = getTacticalFootprint(size);
      if (width > scene.width || height > scene.height) return null;
      const anchor = pieces.find(piece => piece.id === selectedId) ??
        pieces.find(piece => piece.side === side) ?? { x: 0, y: 0 };
      const id = `extra:${++nextId}`;
      const piece = fit({ id, name: label, size, side, kind: "extra", width, height }, anchor.x + 1, anchor.y);
      pieces = labelPieces([...pieces, piece]);
      setSelection(id);
      notify();
      return pieces.find(item => item.id === id);
    },

    removePiece(id) {
      const piece = pieces.find(piece => piece.id === id);
      if (!piece) return;
      if (piece.kind !== "extra") removed.add(id);
      moved.delete(id);
      pieces = labelPieces(pieces.filter(piece => piece.id !== id));
      if (selectedId === id) setSelection(null);
      notify();
    }
  };
}

export function createTacticalEncounterSession() {
  let activeKey = null;
  let currentState = null;
  let partySize = DEFAULT_PARTY_SIZE;

  return {
    activate(key) {
      if (key === activeKey) return;
      activeKey = key;
      currentState = null;
    },

    reset() {
      activeKey = null;
      currentState = null;
    },

    setPartySize(count) {
      if (!Number.isInteger(count) || count < 1 || count > MAX_PARTY_SIZE || count === partySize) return;
      partySize = count;
      currentState?.setPartySize(count);
    },

    openMap(key, map) {
      if (!map) return null;
      this.activate(key);
      const scene = map.scene ?? readLegacyTacticalScene(map);
      if (!scene) return null;
      if (currentState) currentState.reconcile(scene, partySize);
      else currentState = createState(scene, partySize);
      return currentState;
    }
  };
}

export const tacticalEncounterSession = createTacticalEncounterSession();
