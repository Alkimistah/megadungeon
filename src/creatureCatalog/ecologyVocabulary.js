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

const VOCABULARY = { terrains: TERRAINS, places: PLACES, conditions: CONDITIONS, groups: GROUPS, rarities: RARITIES };

export const NEUTRAL_ECOLOGY = Object.freeze({
  terrains: Object.freeze([]),
  places: Object.freeze([]),
  conditions: Object.freeze([]),
  group: null,
  rarity: "comum",
  manualOnly: false,
  reviewed: false
});

const ECOLOGY_KEYS = Object.keys(NEUTRAL_ECOLOGY);

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
  for (const key of ECOLOGY_KEYS) {
    if (!(key in entry)) errors.push(`chave ausente: ${key}`);
  }

  for (const key of ["terrains", "places", "conditions"]) {
    if (!(key in entry)) continue;
    if (!Array.isArray(entry[key])) {
      errors.push(`${key} deve ser uma lista`);
      continue;
    }
    for (const id of entry[key]) {
      if (!hasId(key, id)) errors.push(`${key}: etiqueta desconhecida "${id}"`);
    }
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
