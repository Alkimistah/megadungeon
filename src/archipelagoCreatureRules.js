import { creatureCatalog } from "./creatureCatalog/index.js";

const coastAnimals = ["canceronte", "enxame-de-aguas-vivas", "peixe-recife", "selako", "selako-tigre", "pliorex"];
const coastalHumanoids = ["elfo-do-mar-pescador", "elfo-do-mar-chefe", "irukanjin", "homem-piranha",
  "homem-piranha-imediato", "sahuagin-metamorfo"];

const islandCreatures = {
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
