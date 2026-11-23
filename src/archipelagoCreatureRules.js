import { creatureCatalog } from "./creatureCatalog/index.js";
import { dinosaurExploration } from "./archipelagoFinalBoss.js";
// Ciclo de módulos inofensivo: ambos só usam o outro dentro de funções.
import { getIslandOwnCreatureIds } from "./archipelagoPilot.js";

const coastAnimals = ["canceronte", "enxame-de-aguas-vivas", "peixe-recife", "selako", "selako-tigre", "pliorex"];
const coastalHumanoids = ["elfo-do-mar-pescador", "elfo-do-mar-chefe", "irukanjin", "homem-piranha",
  "homem-piranha-imediato", "sahuagin-metamorfo"];

const islandCreatures = {
  storm: ["lagarto-eletrico", "tempestade-de-lagartos", "hipogrifo-abissal", "lacedon",
    "serpe-ancia", "anciao-das-rochas", "grifo-celestial", "agua-viva-gigante", "harpia-saqueadora",
    "coruja-gigante"],
  floating: ["grifo", "grifo-celestial", "serpe-ancia", "gargula", "gargula-livro-basico",
    "gargula-assassina", "harpia-saqueadora", "abelha-grifo", "manticora", "manticora-ameacas-de-arton",
    "anciao-das-rochas", "defensor-rochoso"],
  "pirate-held": ["pirata", "bando-pirata", "capitao-pirata", "imediato", "galokk-capanga",
    "ogro-cacador", "capitao-baluarte", "chefe-bandido", "chefe-bandido-livro-basico"],
  "sea-caves": [...coastAnimals, ...coastalHumanoids, "aquinne", "lacedon", "lula-gigante",
    "homem-piranha-capitao", "sahuagin-predador"],
  volcanic: ["salamandra-plebeia", "salamandra-guerreira", "gargula-assassina", "gargula",
    "gargula-livro-basico", "cao-do-inferno", "centopeia-dragao", "kobold-veterano", "patrulha-kobold", "kobold-xama"],
  "coral-coast": [...coastAnimals, ...coastalHumanoids, "naiade", "aquinne", "lacedon"],
  atoll: [...coastAnimals, ...coastalHumanoids, "bando-pirata", "pirata", "naiade", "aquinne", "lacedon"],
  mangrove: [
    "lagarto-perseguidor", "crocodilo", "fobossuco", "hipopotamo", "pantera",
    "elemental-do-veneno-pequeno", "aquinne", "naiade",
    "nagah-guardiao", "nagah-dormente", "nagah-mistica", "nagah-mistica-ameacas-de-arton",
    "nagah-sacerdotisa", "tabrachi-campeao", "homem-piranha", "homem-piranha-imediato",
    "sapo-atroz", "alghari", "tempestade-de-lagartos", "otyugh", "otyugh-ameacas-de-arton", "troll",
    "esqueleto", "esqueleto-de-elite", "lacedon", "turba-zumbi", "aparicao", "empalhado-guardiao-ofidico"
  ],
  tropical: [
    "lagarto-perseguidor", "leao", "pantera", "tigre", "crocodilo", "deinonico", "abelha-grifo", "fobossuco",
    "gargula", "gargula-livro-basico", "gargula-assassina", "gargula-de-topiaria-media", "gargula-de-topiaria-grande",
    "espada-da-floresta", "galhada-macho", "galhada-femea", "guardiao-de-palha",
    "kobold-veterano", "patrulha-kobold", "kobold-xama", "tendriculo", "cipo-assassino", "come-sonhos"
  ]
};

export function getIslandCreatureRules(island, objective, rules) {
  const regionalIds = islandCreatures[island.themeId];
  if (!regionalIds) return rules;
  const allowedCreatureIds = creatureCatalog
    .filter(creature => regionalIds.includes(creature.id) &&
      (!objective.preferredType || creature.type === objective.preferredType))
    .map(creature => creature.id);
  return { ...rules, allowedCreatureIds };
}

export function getIslandCreatureIds(themeId) {
  return [...(islandCreatures[themeId] || [])];
}

export function getOutOfPlaceCreatureIds(themeId) {
  const own = new Set([...(islandCreatures[themeId] || []), ...getIslandOwnCreatureIds(themeId)]);
  const dinosaurIds = Object.values(dinosaurExploration.sectorCompositions)
    .flat(2)
    .map(entry => entry.id);
  const otherIds = Object.entries(islandCreatures)
    .filter(([id]) => id !== themeId)
    .flatMap(([, ids]) => ids);

  return [...new Set([...otherIds, ...dinosaurIds])].filter(id => !own.has(id));
}

// Elenco de origem de uma criatura: o primeiro tema que a contém ou, sem tema,
// as composições dos dinossauros. Serve à caçada de um alvo fora do lugar.
export function getCreatureOriginIds(creatureId) {
  const themeIds = Object.values(islandCreatures).find(ids => ids.includes(creatureId));
  if (themeIds) return [...themeIds];
  const dinosaurIds = [...new Set(Object.values(dinosaurExploration.sectorCompositions)
    .flat(2)
    .map(entry => entry.id))];
  return dinosaurIds.includes(creatureId) ? dinosaurIds : [];
}

export function getCreatureOriginThemeId(creatureId) {
  const entry = Object.entries(islandCreatures).find(([, ids]) => ids.includes(creatureId));
  if (entry) return entry[0];
  return getCreatureOriginIds(creatureId).length ? "dinosaurs" : null;
}
