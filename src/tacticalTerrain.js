export const TACTICAL_TERRAIN_LABELS = {
  floor: "Chão",
  water: "Água rasa",
  current: "Correnteza",
  swamp: "Solo de pântano/lodaçal",
  wet: "Solo encharcado",
  foliage: "Folhagem/vegetação",
  tree: "Árvore",
  obstacle: "Obstáculo/cobertura",
  difficult: "Terreno difícil",
  advantage: "Vantagem/elevação",
  slope: "Inclinação",
  mechanism: "Mecanismo",
  "deep-water": "Água profunda",
  cliff: "Penhasco",
  pit: "Fosso/vão",
  lava: "Lava intransitável",
  trench: "Trincheira",
  wall: "Parede",
  door: "Porta (entrada/saída)",
  clearing: "Clareira",
  deck: "Convés de madeira",
  bridge: "Ponte",
  canopy: "Toldo da popa",
  ice: "Gelo",
  "frozen-river": "Rio congelado",
  abyss: "Abismo",
  escarpment: "Paredão",
  pebbles: "Seixos",
  dunes: "Dunas",
  "gentle-slope": "Inclinação suave",
  "steep-slope": "Inclinação íngreme"
};

export const TACTICAL_FEATURE_LABELS = {
  web: "Teia/casulo",
  wind: "Vento forte",
  concealment: "Visibilidade reduzida",
  tree: TACTICAL_TERRAIN_LABELS.tree,
  obstacle: TACTICAL_TERRAIN_LABELS.obstacle,
  foliage: TACTICAL_TERRAIN_LABELS.foliage,
  pebbles: TACTICAL_TERRAIN_LABELS.pebbles,
  mechanism: TACTICAL_TERRAIN_LABELS.mechanism,
  advantage: TACTICAL_TERRAIN_LABELS.advantage
};

export const TACTICAL_MARKER_LABELS = {
  trap: "Armadilha",
  objective: "Objetivo/achado",
  reinforcement: "Entrada de reforço",
  hidden: "Inimigo oculto/em potencial",
  mechanism: TACTICAL_TERRAIN_LABELS.mechanism
};

export const TACTICAL_MARKER_GLYPHS = {
  trap: "△",
  objective: "!",
  reinforcement: "R",
  hidden: "?",
  mechanism: "M"
};

export const TERRAIN_AUTOTILE_JOINS = {
  advantage: ["advantage", "slope", "gentle-slope", "steep-slope"],
  slope: ["slope", "advantage"],
  "gentle-slope": ["gentle-slope", "advantage"],
  "steep-slope": ["steep-slope", "advantage"],
  pit: ["pit"],
  abyss: ["abyss"],
  trench: ["trench"],
  cliff: ["cliff", "escarpment"],
  escarpment: ["escarpment", "cliff"],
  canopy: ["canopy"]
};

// Lados sem vizinho do mesmo grupo, para uma lista de índices de feature (toldo), pela mesma regra do autotile.
export function getFeatureAutotileClasses(type, indices, width, index) {
  const joins = TERRAIN_AUTOTILE_JOINS[type] ?? [type];
  const set = new Set(indices);
  const x = index % width;
  const neighbors = {
    top: set.has(index - width),
    right: x < width - 1 && set.has(index + 1),
    bottom: set.has(index + width),
    left: x > 0 && set.has(index - 1)
  };
  const classes = ["is-auto"];
  for (const [side, joined] of Object.entries(neighbors)) if (!joined) classes.push(`edge-${side}`);
  return joins.includes(type) ? classes : [];
}

export function getTerrainTileClasses(terrain, width, index) {
  const type = terrain[index];
  const isAuto = type in TERRAIN_AUTOTILE_JOINS;
  if (!isAuto && type !== "door") return [];
  const x = index % width;
  const neighbors = {
    top: index >= width ? terrain[index - width] : null,
    right: x < width - 1 ? terrain[index + 1] : null,
    bottom: terrain[index + width] ?? null,
    left: x > 0 ? terrain[index - 1] : null
  };
  const classes = ["is-auto"];
  if (isAuto) {
    const joins = TERRAIN_AUTOTILE_JOINS[type];
    for (const [side, other] of Object.entries(neighbors)) {
      if (!other || !joins.includes(other)) classes.push(`edge-${side}`);
    }
    return classes;
  }
  const solid = (t) => t === "wall" || t === "door";
  const vertical = (solid(neighbors.top) || solid(neighbors.bottom)) && neighbors.left !== "wall" && neighbors.right !== "wall";
  classes.push(vertical ? "door-v" : "door-h");
  for (const [side, other] of Object.entries(neighbors)) if (other === "door") classes.push(`join-${side}`);
  return classes;
}
