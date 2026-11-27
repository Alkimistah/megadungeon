import { creatureCatalog } from "./creatureCatalog/index.js";
import { dinosaurExploration } from "./archipelagoFinalBoss.js";
// Ciclo de módulos inofensivo: ambos só usam o outro dentro de funções.
import { getIslandOwnCreatureIds } from "./archipelagoPilot.js";

const coastAnimals = ["canceronte", "enxame-de-aguas-vivas", "peixe-recife", "selako", "selako-tigre", "pliorex"];
const coastalHumanoids = ["elfo-do-mar-pescador", "elfo-do-mar-chefe", "irukanjin", "homem-piranha",
  "homem-piranha-imediato", "sahuagin-metamorfo"];

// Temas novos entram no fim da lista para não mudar a origem de criaturas já usadas.
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
  volcanic: [
    "cao-do-inferno", "diabrete-explosivo", "soldado-mecanico", "salamandra-plebeia", "salamandra-guerreira",
    "uraghian-jovem", "dracomante", "mashin-samurai", "ninhada-de-dragoes-filhotes", "ganchador",
    "centopeia-dragao", "bulette"
  ],
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
  ],
  shipwrecked: [
    "canceronte", "tumarkhan", "selako", "pliorex", "fobossuco", "crocodilo", "bando-pirata", "chefe-de-quadrilha",
    "saqueador-lider-de-bando", "saqueador-pugilista", "jagunco", "homem-piranha-imediato", "cavaleiro-desonrado",
    "lacedon", "imediato", "zumbi-fantasmagorico", "turba-zumbi", "aparicao", "carnical", "harpia-saqueadora",
    "tempestade-de-lagartos"
  ],
  "giant-kelp": [
    "canceronte", "platan", "selako", "selako-tigre", "pliorex", "peixe-recife", "enxame-de-aguas-vivas", "agua-viva",
    "elfo-do-mar-pescador", "elfo-do-mar-chefe", "irukanjin", "sahuagin-metamorfo", "sahuagin-predador",
    "homem-piranha", "homem-piranha-imediato", "alghari", "cipo-assassino", "tendriculo", "naiade", "aquinne"
  ],
  mist: [
    "lacedon", "livido", "zumbi-fantasmagorico", "aparicao", "imediato", "capitao-pirata", "fantasma", "alma-acorrentada",
    "come-sonhos", "silfide-travessa", "duende-menor", "duende-maior", "vestigio-da-encruzilhada", "mastim-das-sombras", "corcel-das-trevas",
    "duplo", "falso-vidente", "bruxo-rural", "necromante", "pirata",
    "harpia-saqueadora", "coruja-gigante", "estirge", "enxame-estirge"
  ],
  "ship-graveyard": [
    "canceronte", "selako", "crocodilo", "rato-gigante", "lula-gigante", "aranhas-filhotes",
    "aranha-gigante", "aranha-matriarca", "mimico-menor", "mimico", "otyugh", "ameba-gigante", "ganchador",
    "gnoll-capanga", "gnoll-saqueador", "gnoll-filibusteiro", "gnoll-lider-de-alcateia", "gnoll-xama-de-megalokk", "gnoll-cacador-de-cabecas",
    "esqueleto", "esqueleto-de-elite", "lacedon", "imediato", "capitao-pirata", "amalgama-esqueleto"
  ],
  "cyclopean-ruins": [
    "canceronte", "selako", "selako-tigre", "pliorex", "lula-gigante", "crocodilo",
    "soldado-mecanico", "gargula-assassina", "cariatide-mecanica", "carrasco-oco", "instrumento-divino",
    "cocatriz", "basilisco", "gorgona", "cocatriz-real", "grifo", "serpe",
    "esqueleto", "esqueleto-de-elite", "ogro-esqueleto", "gigante-esqueleto",
    "capanga", "jagunco", "lider-mercenario-de-aslothia", "gigante-das-colinas", "necromante"
  ],
  sacred: [
    "pegaso", "unicornio", "dragonete", "ninfa", "protetor", "eiradaan-guardiao",
    "hipogrifo", "grifo", "coruja-gigante",
    "recruta-purista", "soldado-purista", "purificado", "sargento-mor", "capelao-de-guerra",
    "arcano-de-guerra-adepto", "capitao-baluarte", "cacador-de-impuros", "bispo-de-guerra"
  ],
  crystal: [
    "escorpiao-de-cristal", "ameba-gigante", "centopeia-dragao", "gargula-de-topiaria-grande", "gorgona",
    "besouros-facetados", "caranguejo-de-quartzo", "cocatriz-de-vidro", "ganchador-das-fendas",
    "zangao-prismatico", "bulette-de-geodo", "geodo-vivo"
  ],
  "abandoned-ship": [
    "livido", "ogro-esqueleto", "canceronte", "aparicao", "vampiro-neofito", "garra-zumbi-gigante", "ganchador",
    "fantasma", "alma-acorrentada", "afogado", "guerreiro-perpetuo"
  ]
};

export function getIslandCreatureRules(island, objective, rules) {
  const regionalIds = islandCreatures[island.themeId];
  if (!regionalIds) return rules;
  const crystalGallery = island.themeId === "crystal" && objective.direction === "NO";
  const allowedCreatureIds = creatureCatalog
    .filter(creature => regionalIds.includes(creature.id) &&
      (crystalGallery || creature.id !== "escorpiao-de-cristal") &&
      (!objective.preferredType || creature.type === objective.preferredType))
    .map(creature => creature.id);
  return {
    ...rules,
    allowedCreatureIds,
    ...(island.themeId === "crystal" ? { preferAllowedVariants: true } : {}),
    ...(crystalGallery || island.themeId === "volcanic" ? { allowMixedChallengePairs: true } : {})
  };
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

// Estas fichas já tinham origem antes de entrar no elenco vulcânico.
const existingOriginByCreatureId = new Map([
  ["soldado-mecanico", "cyclopean-ruins"],
  ["ganchador", "ship-graveyard"]
]);

function findCreatureOriginThemeId(creatureId) {
  return existingOriginByCreatureId.get(creatureId) ??
    Object.keys(islandCreatures).find(themeId => islandCreatures[themeId].includes(creatureId));
}

// A origem serve à caçada de um alvo fora do lugar.
export function getCreatureOriginIds(creatureId) {
  const themeId = findCreatureOriginThemeId(creatureId);
  if (themeId) return getIslandCreatureIds(themeId);
  const dinosaurIds = [...new Set(Object.values(dinosaurExploration.sectorCompositions)
    .flat(2)
    .map(entry => entry.id))];
  return dinosaurIds.includes(creatureId) ? dinosaurIds : [];
}

export function getCreatureOriginThemeId(creatureId) {
  return findCreatureOriginThemeId(creatureId) ??
    (getCreatureOriginIds(creatureId).length ? "dinosaurs" : null);
}
