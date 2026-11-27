import { getIslandCreatureIds } from "./archipelagoCreatureRules.js";
import { dinosaurExploration } from "./archipelagoFinalBoss.js";
import { calculateCombatND } from "./challenge.js";
import { getCreatureById } from "./creatureCatalog/index.js";
import { CLIMATE_NORMAL } from "./environment.js";
import { createNodeTacticalMap } from "./nodeTacticalMap.js";
import { resolveNodeEncounter } from "./encounterResolver.js";
import { hasEncounterAdjustments } from "./encounterCreatureHealth.js";
import { createRng, pick } from "./random.js";

const boatCreatureIds = {
  aquatic: ["selako", "selako-tigre", "canceronte", "pliorex", "lula-gigante", "agua-viva-gigante",
    "enxame-de-aguas-vivas", "peixe-recife", "cardume-de-selakos", "aquinne", "lacedon"],
  flying: ["coruja-gigante", "grifo", "harpia-saqueadora", "serpe", "manticora", "hipogrifo-abissal",
    "grifo-celestial", "tengu-bandoleiro"],
  pirates: ["pirata", "bando-pirata", "imediato", "capitao-pirata", "capitao-do-conclave-pirata",
    "galokk-capanga", "gnoll-filibusteiro", "capanga-minotauro", "chefe-bandido", "ogro-cacador"]
};

const weather = [
  CLIMATE_NORMAL,
  { name: "Neblina", effect: "A neblina marítima concede camuflagem." },
  { name: "Vento forte", effect: "-2 em ataques à distância. A cada rodada, 50% de chance de apagar chamas ou dissipar névoas." },
  { name: "Chuva", effect: "-5 em testes de Percepção. Também aplica os efeitos de vento forte (-2 em ataques à distância e 50% de chance por rodada de apagar chamas ou dissipar névoas)." }
];

const briefings = {
  aquatic: "A água se agita junto ao casco. As criaturas avançam pelas laterais do barco enquanto o grupo desperta no convés.",
  flying: "Sombras cruzam a vela quadrada. As criaturas descem em direção ao convés antes que a vigia consiga alertar todos.",
  pirates: "Um barco se aproxima na escuridão. Os piratas lançam cabos na amurada e saltam para o convés."
};

const mast = { id: "square-mast", name: "Mastro da vela quadrada", effect: "O mastro fica no centro do convés." };
const cargo = { id: "cargo", name: "Carga", effect: "Caixas e barris junto à amurada servem de cobertura." };
const canopy = { id: "stern-canopy", name: "Toldo da popa", effect: "A lona cobre os quadrados claros da popa, por onde se pode passar." };
const canopyMast = { id: "stern-canopy-mast", name: "Mastro do toldo", effect: "O mastro de apoio sustenta a lona no meio da popa." };

const deck = {
  name: "Convés da liburna",
  effect: "O casco estreito corre da proa, à esquerda, até a popa coberta, à direita. O grupo começa junto ao toldo.",
  features: [mast, cargo, canopy, canopyMast]
};

const tacticalLayout = {
  zones: [
    { x: 0, y: 0, width: 20, height: 14, tile: "water", terrainType: "deep-water" },
    { x: 1, y: 6, width: 18, height: 2, tile: "deck" },
    { x: 3, y: 5, width: 16, height: 4, tile: "deck" },
    { x: 6, y: 4, width: 11, height: 6, tile: "deck" },
    { x: 15, y: 5, width: 3, height: 4, tile: "canopy", id: canopy.id, label: canopy.name },
    { x: 16, y: 6, width: 1, height: 2, tile: "obstacle", featureType: "obstacle", id: canopyMast.id, label: canopyMast.name },
    { x: 7, y: 4, width: 2, height: 1, tile: "obstacle", featureType: "obstacle", id: cargo.id, label: cargo.name },
    { x: 12, y: 9, width: 2, height: 1, tile: "obstacle", featureType: "obstacle", id: cargo.id, label: cargo.name }
  ],
  landmark: { x: 9, y: 6, ...mast },
  partyPositions: [[13, 6], [14, 6], [13, 7], [14, 7]],
  enemyArea: { minX: 1, maxX: 9, minY: 2, maxY: 11 }
};

function spawnSurface(creatureId) {
  const speed = getCreatureById(creatureId)?.stats?.speedText ?? "";
  if (/\bvoo\b/i.test(speed)) return "any";
  if (/^\s*natação/i.test(speed)) return "deep-water";
  return "deck";
}

export function applyLiburnaLayout(scene) {
  scene.environment = { ...scene.environment, terrain: deck };
  if (scene.boatAmbushKind) {
    const ids = scene.creature.allowedCreatureIds;
    scene.tacticalLayout = {
      ...tacticalLayout,
      keepFootprintsInEnemyArea: true,
      enemySurfaceByCreatureId: Object.fromEntries(ids.map(id => [id, spawnSurface(id)]))
    };
  } else {
    const aquatic = scene.tacticalLayout?.enemyTiles?.includes("water");
    scene.tacticalLayout = { ...tacticalLayout, enemyTiles: [aquatic ? "water" : "deck"] };
  }
}

export function getBoatAmbushRules(fragments) {
  const challenge = fragments === 9 ? 9 : fragments >= 7 ? 8 : fragments >= 4 ? 7 : 6;
  return { chance: 15 + fragments * 5, challenge };
}

function getBoatAmbushPools(island) {
  const pools = Object.entries(boatCreatureIds);
  const localIds = island?.themeId === "dinosaurs"
    ? [...new Set(Object.values(dinosaurExploration.sectorCompositions).flat(2).map(({ id }) => id))]
    : getIslandCreatureIds(island?.themeId);
  if (localIds.length) pools.push(["island", localIds]);
  return pools;
}

function compositionKey(items) {
  return items.map(({ creatureId, quantity }) => `${creatureId}:${quantity}`).sort().join("|");
}

function generateBoatAmbush({ id, challenge, profile, seed, climate, island, previous, firstPool }) {
  const rng = createRng(`${seed}:categoria`);
  const pools = getBoatAmbushPools(island);
  const preferred = firstPool ?? pick(rng, pools);
  const alternatives = pools.filter(([kind]) => kind !== preferred[0]);
  const order = [preferred];
  while (alternatives.length) {
    const pool = pick(rng, alternatives);
    order.push(...alternatives.splice(alternatives.indexOf(pool), 1));
  }

  for (const [kind, ids] of order) {
    const briefing = kind === "island"
      ? `Criaturas da costa de ${island.name} chegam à liburna e atacam durante o descanso.`
      : briefings[kind];
    for (let attempt = 0; attempt < 20; attempt++) {
      const scene = {
        id,
        type: "normal",
        boatAmbushKind: kind,
        ...(island ? { boatAmbushIsland: island } : {}),
        briefing,
        environment: { terrain: deck, climate },
        challenge: { total: challenge, encounter: challenge, creatures: challenge, trap: 0 },
        creature: { targetChallenge: challenge, allowedCreatureIds: ids, preferAllowedVariants: true }
      };
      applyLiburnaLayout(scene);
      const encounter = resolveNodeEncounter(scene, { profile, mapSeed: `${seed}:${kind}:${attempt}` });
      const items = encounter?.items;
      if (calculateCombatND(items) !== challenge || items.some(item => !ids.includes(item.creatureId)) ||
          compositionKey(items) === previous) continue;
      const count = items.reduce((sum, item) => sum + item.quantity, 0);
      if (count > 12) continue;
      const map = createNodeTacticalMap(scene);
      if (map.scene.pieces.filter(piece => piece.side === "enemy").length === count) return scene;
    }
  }
  return null;
}

export function createBoatAmbush(fragments, night, profile, mapSeed, rng, island) {
  const { chance, challenge } = getBoatAmbushRules(fragments);
  if (rng() * 100 >= chance) return null;
  const id = `emboscada-barco-${night}`;
  const seed = `${mapSeed}:${id}`;
  return generateBoatAmbush({
    id, challenge, profile, seed, island,
    climate: [pick(createRng(`${seed}:clima`), weather)],
    firstPool: pick(rng, getBoatAmbushPools(island))
  });
}

export function canRerollBoatAmbush(scene) {
  return Boolean(scene?.resolvedEncounter?.items.some(item => item.kind === "creature") &&
    !hasEncounterAdjustments(scene.resolvedEncounter));
}

export function rerollBoatAmbush(scene, profile, mapSeed, island = scene?.boatAmbushIsland) {
  if (!canRerollBoatAmbush(scene)) return false;

  const rerolls = (scene.rerolls ?? 0) + 1;
  const seed = `${mapSeed}:${scene.id}:rerrolagem-${rerolls}`;
  const climate = scene.environment.climate?.length ? scene.environment.climate : [pick(createRng(`${seed}:clima`), weather)];
  const updated = generateBoatAmbush({
    id: scene.id, challenge: scene.challenge.creatures, profile, seed, island, climate,
    previous: compositionKey(scene.resolvedEncounter.items)
  });
  if (!updated) return false;
  delete scene.fixedComposition;
  Object.assign(scene, updated, { rerolls });
  return true;
}
