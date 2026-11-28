// Vocabulário das etiquetas de ecologia das criaturas.
// Ids em minúsculas e sem acento; rótulos com acento.

const list = (entries) => Object.freeze(entries.map(([id, label]) => Object.freeze({ id, label })));

export const TERRAINS = list([
  ["aquatico", "Aquático"],
  ["artico", "Ártico"],
  ["colina", "Colina"],
  ["deserto", "Deserto"],
  ["floresta", "Floresta"],
  ["montanha", "Montanha"],
  ["pantano", "Pântano"],
  ["planicie", "Planície"],
  ["subterraneo", "Subterrâneo"]
]);

export const PLACES = list([
  ["masmorra", "Masmorra construída"],
  ["ruinas", "Ruínas"],
  ["catacumbas", "Catacumbas/necrópole"],
  ["cavernas-profundas", "Cavernas profundas/minas"],
  ["colmeia", "Colmeia/ninho"],
  ["urbano", "Urbano"],
  ["alturas", "Alturas"],
  ["vulcanico", "Vulcânico"],
  ["costa-ilhas", "Costa e ilhas"],
  ["mar-aberto", "Mar aberto"],
  ["planos-elementais", "Planos elementais"],
  ["infernal", "Infernal/abissal"],
  ["tormenta", "Tormenta"]
]);

export const CONDITIONS = list([
  ["neblina", "Neblina"],
  ["escuridao", "Escuridão"],
  ["calor", "Calor extremo"],
  ["frio", "Frio extremo"],
  ["tempestade", "Tempestade"],
  ["miasma", "Miasma"]
]);

export const GROUPS = list([
  ["solitaria", "Solitária"],
  ["dupla", "Dupla"],
  ["bando", "Bando"],
  ["enxame", "Enxame"],
  ["horda", "Horda"]
]);

export const RARITIES = list([
  ["comum", "Comum"],
  ["incomum", "Incomum"],
  ["rara", "Rara"]
]);

export const FAMILIES = list([
  ["abelhas-grifo", "Abelhas-grifo"],
  ["ankthyrs", "Ankthyrs"],
  ["aranhas", "Aranhas"],
  ["aves-de-rapina", "Aves de rapina"],
  ["baleotes", "Baleotes"],
  ["bovideos", "Bovídeos"],
  ["burafontes", "Burafontes"],
  ["camelideos", "Camelídeos"],
  ["capivaras", "Capivaras"],
  ["cervideos", "Cervídeos"],
  ["chacais", "Chacais"],
  ["crocodilianos", "Crocodilianos"],
  ["crustaceos-marinhos", "Crustáceos marinhos"],
  ["deinonicos", "Deinônicos"],
  ["equinos", "Equinos"],
  ["felinos-de-mata", "Felinos de mata"],
  ["gali-gali", "Gali-gali"],
  ["golfinhos-marinhos", "Golfinhos marinhos"],
  ["gorloggs", "Gorloggs"],
  ["grandes-sauropodes", "Grandes saurópodes"],
  ["grifos", "Grifos"],
  ["hienideos", "Hienídeos"],
  ["hipopotamos", "Hipopótamos"],
  ["hippossauros", "Hippossauros"],
  ["hipo-orcas", "Hipó-orcas"],
  ["kabutos", "Kabutos"],
  ["lagartos-perseguidores", "Lagartos perseguidores"],
  ["leoes", "Leões"],
  ["lobos", "Lobos"],
  ["lulas", "Lulas"],
  ["mariposas", "Mariposas"],
  ["mustelideos", "Mustelídeos"],
  ["peixes-recife", "Peixes-recife"],
  ["perdigueiros-vegetais", "Perdigueiros vegetais"],
  ["platan", "Platan"],
  ["pliorexes", "Pliorexes"],
  ["primatas", "Primatas"],
  ["proboscideos", "Proboscídeos"],
  ["raagorans", "Raagorans"],
  ["ratos", "Ratos"],
  ["rinocerontes", "Rinocerontes"],
  ["rodrocentares", "Rodrocentares"],
  ["selakos", "Selakos"],
  ["serpentes-constritoras", "Serpentes constritoras"],
  ["serpentes-peconhentas", "Serpentes peçonhentas"],
  ["suideos", "Suídeos"],
  ["tiranos", "Tiranos"],
  ["trobos", "Trobos"],
  ["tumarkhan", "Tumarkhân"],
  ["tuntrans", "Tuntrans"],
  ["ursideos", "Ursídeos"],
  ["aguas-vivas", "Águas-vivas"]
]);

const VOCABULARY = {
  terrains: TERRAINS, forestTerrains: TERRAINS, places: PLACES, conditions: CONDITIONS,
  families: FAMILIES, groups: GROUPS, rarities: RARITIES
};

export const NEUTRAL_ECOLOGY = Object.freeze({
  terrains: Object.freeze([]),
  places: Object.freeze([]),
  conditions: Object.freeze([]),
  family: null,
  group: null,
  rarity: "comum",
  manualOnly: false,
  reviewed: false
});

const REQUIRED_ECOLOGY_KEYS = Object.keys(NEUTRAL_ECOLOGY).filter(key => key !== "family");
const ECOLOGY_KEYS = [...REQUIRED_ECOLOGY_KEYS, "family", "forestTerrains"];

function fold(text) {
  return String(text ?? "").normalize("NFD").replace(/[̀-ͯ]/g, "").trim().toLowerCase();
}

// Aceita o id ou o rótulo, com ou sem acento, sem diferenciar maiúsculas. Devolve o id ou null.
export function normalizeTag(category, text) {
  const key = fold(text);
  if (!key) return null;
  const found = (VOCABULARY[category] || []).find((tag) => tag.id === key || fold(tag.label) === key);
  return found ? found.id : null;
}

const hasId = (category, id) => (VOCABULARY[category] || []).some((tag) => tag.id === id);

export function validateEcology(entry) {
  if (!entry || typeof entry !== "object" || Array.isArray(entry)) return ["ecologia deve ser um objeto"];
  const errors = [];

  for (const key of Object.keys(entry)) {
    if (!ECOLOGY_KEYS.includes(key)) errors.push(`chave desconhecida: ${key}`);
  }
  for (const key of REQUIRED_ECOLOGY_KEYS) {
    if (!(key in entry)) errors.push(`chave ausente: ${key}`);
  }

  for (const key of ["terrains", "forestTerrains", "places", "conditions"]) {
    if (!(key in entry)) continue;
    if (!Array.isArray(entry[key])) {
      errors.push(`${key} deve ser uma lista`);
      continue;
    }
    for (const id of entry[key]) {
      if (!hasId(key, id)) errors.push(`${key}: etiqueta desconhecida "${id}"`);
    }
  }
  if ("family" in entry && entry.family !== null && !hasId("families", entry.family)) {
    errors.push(`family: etiqueta desconhecida "${entry.family}"`);
  }
  if ("group" in entry && entry.group !== null && !hasId("groups", entry.group)) {
    errors.push(`group: etiqueta desconhecida "${entry.group}"`);
  }
  if ("rarity" in entry && !hasId("rarities", entry.rarity)) {
    errors.push(`rarity: etiqueta desconhecida "${entry.rarity}"`);
  }
  for (const key of ["manualOnly", "reviewed"]) {
    if (key in entry && typeof entry[key] !== "boolean") errors.push(`${key} deve ser booleano`);
  }
  return errors;
}
