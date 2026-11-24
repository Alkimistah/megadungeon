import { resolveNodeEncounter } from "./encounterResolver.js";
import { hasEncounterAdjustments } from "./encounterCreatureHealth.js";
import { createRng, pick } from "./random.js";

const compositions = {
  6: [
    { kind: "aquatic", creatures: [{ id: "selako-tigre", quantity: 1 }] },
    { kind: "flying", creatures: [{ id: "harpia-saqueadora", quantity: 2 }] },
    { kind: "pirates", creatures: [{ id: "bando-pirata", quantity: 1 }] }
  ],
  7: [
    { kind: "aquatic", creatures: [{ id: "lula-gigante", quantity: 1 }] },
    { kind: "flying", creatures: [{ id: "serpe-ameacas-de-arton", quantity: 2 }] },
    { kind: "pirates", creatures: [{ id: "capitao-pirata", quantity: 1 }] }
  ],
  8: [
    { kind: "aquatic", creatures: [{ id: "agua-viva-gigante", quantity: 1 }] },
    { kind: "flying", creatures: [{ id: "manticora-ameacas-de-arton", quantity: 2 }] },
    { kind: "pirates", creatures: [{ id: "capitao-do-conclave-pirata", quantity: 1 }] }
  ],
  9: [
    { kind: "aquatic", creatures: [{ id: "lula-gigante", quantity: 2 }] },
    { kind: "flying", creatures: [{ id: "hipogrifo-abissal", quantity: 2 }] },
    { kind: "pirates", creatures: [{ id: "capitao-pirata", quantity: 2 }] }
  ]
};

const briefings = {
  aquatic: "A água se agita junto ao casco. As criaturas avançam pelas laterais do barco enquanto o grupo desperta no convés.",
  flying: "Sombras cruzam a vela quadrada. As criaturas descem em direção ao convés antes que a vigia consiga alertar todos.",
  pirates: "Um barco se aproxima na escuridão. Os piratas lançam cabos na amurada e saltam para o convés."
};

const mast = { id: "square-mast", name: "Mastro da vela quadrada", effect: "O mastro fica no centro do convés." };
const cargo = { id: "cargo", name: "Carga", effect: "Caixas e barris junto à amurada servem de cobertura." };
const canopy = { id: "stern-canopy", name: "Toldo da popa", effect: "A lona cobre os quadrados claros da popa, por onde se pode passar." };

const deck = {
  name: "Convés da liburna",
  effect: "O casco estreito corre da proa, à esquerda, até a popa coberta, à direita. O grupo começa junto ao toldo.",
  features: [mast, cargo, canopy]
};

const tacticalLayout = {
  zones: [
    { x: 0, y: 0, width: 20, height: 14, tile: "water", terrainType: "deep-water" },
    { x: 1, y: 6, width: 18, height: 2, tile: "deck" },
    { x: 3, y: 5, width: 16, height: 4, tile: "deck" },
    { x: 6, y: 4, width: 11, height: 6, tile: "deck" },
    { x: 15, y: 5, width: 3, height: 4, tile: "canopy", id: canopy.id, label: canopy.name },
    { x: 7, y: 4, width: 2, height: 1, tile: "obstacle", featureType: "obstacle", id: cargo.id, label: cargo.name },
    { x: 12, y: 9, width: 2, height: 1, tile: "obstacle", featureType: "obstacle", id: cargo.id, label: cargo.name }
  ],
  landmark: { x: 9, y: 6, ...mast },
  partyPositions: [[13, 6], [14, 6], [13, 7], [14, 7]],
  enemyArea: { minX: 1, maxX: 9, minY: 2, maxY: 11 }
};

export function applyLiburnaLayout(scene) {
  const aquatic = scene.tacticalLayout.enemyTiles.includes("water");
  scene.environment = { ...scene.environment, terrain: deck };
  scene.tacticalLayout = { ...tacticalLayout, enemyTiles: [aquatic ? "water" : "deck"] };
}

export function getBoatAmbushRules(fragments) {
  const challenge = fragments === 9 ? 9 : fragments >= 7 ? 8 : fragments >= 4 ? 7 : 6;
  return { chance: 15 + fragments * 5, challenge };
}

export function createBoatAmbush(fragments, night, profile, mapSeed, rng) {
  const { chance, challenge } = getBoatAmbushRules(fragments);
  if (rng() * 100 >= chance) return null;
  return createBoatAmbushScene(`emboscada-barco-${night}`, challenge, pick(rng, compositions[challenge]), profile, mapSeed);
}

export function canRerollBoatAmbush(scene) {
  return Boolean(scene?.resolvedEncounter?.items.some(item => item.kind === "creature") &&
    !hasEncounterAdjustments(scene.resolvedEncounter));
}

export function rerollBoatAmbush(scene, profile, mapSeed) {
  if (!canRerollBoatAmbush(scene)) return false;

  const challenge = scene.challenge.creatures;
  const currentId = scene.resolvedEncounter.items[0].creatureId;
  const alternatives = compositions[challenge].filter(composition => composition.creatures[0].id !== currentId);
  const rerolls = (scene.rerolls ?? 0) + 1;
  const rng = createRng(`${mapSeed}:${scene.id}:rerrolagem-${rerolls}`);
  const updated = createBoatAmbushScene(scene.id, challenge, pick(rng, alternatives), profile, mapSeed);
  Object.assign(scene, updated, { rerolls });
  return true;
}

function createBoatAmbushScene(id, challenge, { kind, creatures }, profile, mapSeed) {
  const scene = {
    id,
    type: "normal",
    briefing: briefings[kind],
    environment: { terrain: deck, climate: [] },
    tacticalLayout: { enemyTiles: [kind === "aquatic" ? "water" : "deck"] },
    challenge: { total: challenge, encounter: challenge, creatures: challenge, trap: 0 },
    fixedComposition: { creatures, useWeaponVariation: false }
  };
  applyLiburnaLayout(scene);
  resolveNodeEncounter(scene, { mapSeed, profile });
  return scene;
}
