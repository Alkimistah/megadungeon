import { creatureCatalog } from "./creatureCatalog/index.js";

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
