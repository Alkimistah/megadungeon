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
