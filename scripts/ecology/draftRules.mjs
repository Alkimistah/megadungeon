// Regras puras do rascunho automático de etiquetas de ecologia (sem I/O).
// suggestEcology(creature) devolve etiquetas sugeridas, confiança, motivos e se precisa do livro.

import { TERRAINS, PLACES, CONDITIONS, GROUPS } from "../../src/creatureCatalog/ecologyVocabulary.js";

const CONFIDENCE_ORDER = ["baixa", "media", "alta"];
const ORDER = {
  terrains: TERRAINS.map((t) => t.id),
  places: PLACES.map((t) => t.id),
  conditions: CONDITIONS.map((t) => t.id)
};
const LABEL = Object.fromEntries([...TERRAINS, ...PLACES, ...CONDITIONS, ...GROUPS].map((t) => [t.id, t.label]));

// Tira acentos e põe em minúsculas preservando o comprimento, para que os índices
// do texto dobrado sirvam para recortar o trecho original.
export function foldKeepingLength(text) {
  let out = "";
  for (const ch of String(text ?? "")) {
    const base = ch.normalize("NFD")[0].toLowerCase();
    out += base.length === ch.length ? base : ch.toLowerCase();
  }
  return out;
}

// Etiquetas-base por tipo/subtipo. `type` e `subtype` nulos casam com qualquer valor.
export const SUBTYPE_RULES = [
  // Mortos-vivos se concentram em túmulos e necrópoles, e costumam vir com ar viciado de morte.
  { name: "undead", type: "undead", subtype: null, places: ["catacumbas"], conditions: ["miasma"], confidence: "media" },
  // Elementais vêm dos planos elementais.
  { name: "spirit/elemental", type: "spirit", subtype: "elemental", places: ["planos-elementais"], confidence: "media" },
  // Abissais são espíritos dos planos infernais.
  { name: "spirit/abissal", type: "spirit", subtype: "abissal", places: ["infernal"], confidence: "media" },
  // Lefeu são as criaturas da Tormenta; lefou são os meios-demônios nascidos dela.
  { name: "lefeu", type: null, subtype: "lefeu", places: ["tormenta"], confidence: "media" },
  { name: "lefou", type: null, subtype: "lefou", places: ["tormenta"], confidence: "media" },
  // Dragões fazem covil em picos e lugares altos, de onde dominam o território.
  { name: "monster/dragão", type: "monster", subtype: "dragão", places: ["alturas"], confidence: "media" },
  // Nagahs são povos-serpente dos pântanos.
  { name: "humanoid/nagah", type: "humanoid", subtype: "nagah", terrains: ["pantano"], confidence: "media" },
  // Goblinoides vivem em túneis e nas florestas de Lamnor.
  { name: "goblin", type: null, subtype: "goblin", terrains: ["subterraneo", "floresta"], confidence: "media" },
  { name: "hobgoblin", type: null, subtype: "hobgoblin", terrains: ["subterraneo", "floresta"], confidence: "media" },
  { name: "bugbear", type: null, subtype: "bugbear", terrains: ["subterraneo", "floresta"], confidence: "media" },
  // Construtos guardam masmorras e minas, mas dependem de quem os fez: confiança baixa.
  { name: "construct", type: "construct", subtype: null, places: ["masmorra", "cavernas-profundas"], confidence: "baixa" }
];

// Palavras-chave sobre o texto dobrado (sem acento, minúsculas). Todas exigem início de palavra
// (e não depois de hífen, para não casar com nomes compostos como "lobos-das-cavernas");
// radicais curtos ou ambíguos também têm fim de palavra ou exclusões explícitas.
const W = "(?![a-z])"; // fim de palavra
export const KEYWORDS = [
  { category: "terrains", id: "pantano", pattern: `pantan|charcos?${W}|brejos?${W}` },
  { category: "terrains", id: "floresta", pattern: `florest|selvas?${W}|bosques?${W}|matas${W}|(?:na|da|pela) mata${W}|mata (?:fechada|densa|virgem|selvagem)` },
  { category: "terrains", id: "subterraneo", pattern: `subterr|cavern|galerias?${W}` },
  // "rio" e "mar" com fim de palavra: evita "riqueza", "marca", "marrom".
  { category: "terrains", id: "aquatico", pattern: `rios?${W}|lagos?${W}|lagoas?${W}|mar(?:es)?${W}|marinh|ocean|aquatic` },
  // "água" é indício fraco: sozinha não dá confiança alta.
  { category: "terrains", id: "aquatico", pattern: `aguas?${W}`, weak: true },
  // "neve" com fim de palavra para não casar com "névoa"; "ártico" sem "articulação".
  { category: "terrains", id: "artico", pattern: `geleira|neves?${W}|nevasca|gelad(?:o|a|os|as)${W}|artic(?:o|a|os|as)${W}` },
  // "deserto" sem "desertor".
  { category: "terrains", id: "deserto", pattern: `desert(?:o|os|ica|ico|icas|icos)${W}|dunas?${W}` },
  { category: "terrains", id: "montanha", pattern: `montanh|picos?${W}|cordilheira` },
  { category: "terrains", id: "colina", pattern: `colinas?${W}` },
  // "campo" sem os sentidos figurados mais comuns nas fichas.
  { category: "terrains", id: "planicie", pattern: `planicies?${W}|campos?${W}(?! (?:(?:de|da|do) )?(?:forca|batalha|visao|energia|treinamento|treino|militar))|pradaria` },
  { category: "places", id: "urbano", pattern: `cidades?${W}|esgoto|urban` },
  { category: "places", id: "ruinas", pattern: `ruinas?${W}` },
  { category: "places", id: "catacumbas", pattern: `cripta|cemiterio|catacumba|necropole` },
  { category: "places", id: "masmorra", pattern: `masmorras?${W}` },
  // Só lugares ligados à Tormenta, não o "Deus da Tormenta".
  { category: "places", id: "tormenta", pattern: `(?:areas?|focos?|fronteiras|locais|lugares)(?: [a-z]+){0,3} (?:da|de|pela) tormenta` },
  // "lava" sem "lavar"/"lavoura".
  { category: "places", id: "vulcanico", pattern: `vulc|lavas?${W}|magma` },
  // "costa" no singular: "costas" é quase sempre o dorso.
  { category: "places", id: "costa-ilhas", pattern: `costa${W}|costeir|litor|praias?${W}|ilhas?${W}` },
  { category: "conditions", id: "neblina", pattern: `nevoas?${W}|neblina|brumas?${W}` },
  { category: "conditions", id: "escuridao", pattern: `escurid|(?<!magias? de )trevas${W}|sem luz` },
  { category: "group", id: "enxame", pattern: `enxames?${W}` },
  { category: "group", id: "bando", pattern: `bandos?${W}|matilhas?${W}|alcateias?${W}` },
  { category: "group", id: "horda", pattern: `hordas?${W}` },
  // "tropa" e "legião" nas descrições quase sempre são tropas militares comandadas; só valem no nome.
  { category: "group", id: "horda", pattern: `tropas?${W}|legiao|legioes`, nameOnly: true }
].map((k) => ({ ...k, regex: new RegExp(`(?<![a-z-])(?:${k.pattern})`, "g") }));

const NEGATION = /raramente|nunca|ao contrario|fora de|exceto|longe de/;
const NEGATION_WINDOW = 30;
const SNIPPET_RADIUS = 40;

const ROLE_GROUP = { minion: "bando", solo: "solitaria", special: "dupla" };
const RARE_NAME = /(?<![a-z])(?:anciao|ancia|rainha|rei|lorde)(?![a-z])/;

function descriptionText(creature) {
  const d = creature.description;
  if (Array.isArray(d)) return d.filter(Boolean).join(" ").trim();
  return String(d ?? "").trim();
}

function snippet(text, start, end) {
  const from = Math.max(0, start - SNIPPET_RADIUS);
  const to = Math.min(text.length, end + SNIPPET_RADIUS);
  return `${from > 0 ? "…" : ""}${text.slice(from, to).replace(/\s+/g, " ").trim()}${to < text.length ? "…" : ""}`;
}

function findKeywordHits(text) {
  const folded = foldKeepingLength(text);
  const hits = [];
  for (const k of KEYWORDS) {
    if (k.nameOnly) continue;
    for (const m of folded.matchAll(k.regex)) {
      const start = m.index;
      const end = start + m[0].length;
      const before = folded.slice(Math.max(0, start - NEGATION_WINDOW), start);
      const negation = before.match(NEGATION);
      const wordEnd = start + folded.slice(start).match(/^[a-z]*/)[0].length;
      hits.push({ ...k, word: text.slice(start, Math.max(end, wordEnd)), start, snippet: snippet(text, start, end), negation: negation?.[0] ?? null });
    }
  }
  return hits.sort((a, b) => a.start - b.start);
}

function matchesRule(rule, creature) {
  return (rule.type === null || rule.type === creature.type) && (rule.subtype === null || rule.subtype === creature.subtype);
}

const ordered = (category, set) => ORDER[category].filter((id) => set.has(id));
const labels = (ids) => ids.map((id) => LABEL[id]).join(", ");

function isManualOnly(creature) {
  const nd = creature.challengeRating;
  if (typeof nd !== "number") return "ND não numérico";
  if (creature.type === "event") return "tipo evento";
  if (creature.type === "???") return "tipo ???";
  // Avatares e aspectos são deuses: só manual em qualquer livro (PO, 22/11/2026).
  if (/^(Avatar|Aspecto) /.test(creature.name ?? "")) return "avatar ou aspecto divino";
  return null;
}

export function suggestEcology(creature) {
  const reasons = [];
  const sets = { terrains: new Set(), places: new Set(), conditions: new Set() };

  // Regras de tipo/subtipo.
  const rules = SUBTYPE_RULES.filter((rule) => matchesRule(rule, creature));
  const ruleTerrains = new Set();
  for (const rule of rules) {
    const added = [];
    for (const category of ["terrains", "places", "conditions"]) {
      for (const id of rule[category] ?? []) {
        sets[category].add(id);
        added.push(id);
        if (category === "terrains") ruleTerrains.add(id);
      }
    }
    reasons.push(`regra de subtipo (${rule.name}): ${labels(added)}`);
  }

  // Palavras-chave na descrição.
  const text = descriptionText(creature);
  const hits = text ? findKeywordHits(text) : [];
  const descTags = new Set();
  const strongTerrains = new Set();
  let descGroup = null;
  let doubtful = false;
  for (const hit of hits) {
    if (hit.negation) {
      doubtful = true;
      reasons.push(`duvidoso: "${hit.word}" depois de "${hit.negation}": "${hit.snippet}"`);
      continue;
    }
    if (hit.category === "group") {
      descGroup ??= hit.id;
      reasons.push(`palavra-chave "${hit.word}" → grupo ${LABEL[hit.id]}: "${hit.snippet}"`);
      continue;
    }
    sets[hit.category].add(hit.id);
    descTags.add(`${hit.category}:${hit.id}`);
    if (hit.category === "terrains" && !hit.weak) strongTerrains.add(hit.id);
    reasons.push(`palavra-chave "${hit.word}"${hit.weak ? " (indício fraco)" : ""} → ${LABEL[hit.id]}: "${hit.snippet}"`);
  }

  // Conflito: a regra de subtipo aponta terrenos e a descrição aponta só outros.
  const descTerrains = [...sets.terrains].filter((id) => descTags.has(`terrains:${id}`));
  const conflict = ruleTerrains.size > 0 && descTerrains.length > 0 && !descTerrains.some((id) => ruleTerrains.has(id));
  if (conflict) reasons.push("conflito: os terrenos da regra de subtipo não aparecem na descrição");

  // Grupo: nome > descrição > papel.
  const foldedName = foldKeepingLength(creature.name ?? "");
  const nameGroup = KEYWORDS.find((k) => k.category === "group" && new RegExp(k.regex.source).test(foldedName));
  let group = null;
  if (nameGroup) {
    group = nameGroup.id;
    reasons.push(`grupo pelo nome: ${LABEL[group]}`);
  } else if (descGroup) {
    group = descGroup;
  } else if (ROLE_GROUP[creature.role]) {
    group = ROLE_GROUP[creature.role];
    reasons.push(`grupo pelo papel ${creature.role}: ${LABEL[group]}`);
  }

  // Raridade.
  const nd = creature.challengeRating;
  let rarity = "comum";
  if (creature.subtype === "dragão") {
    rarity = "rara";
    reasons.push("raridade rara: subtipo dragão");
  } else if (creature.role === "solo" && typeof nd === "number" && nd >= 10) {
    rarity = "rara";
    reasons.push("raridade rara: solo com ND 10 ou mais");
  } else if (RARE_NAME.test(foldedName)) {
    rarity = "rara";
    reasons.push("raridade rara: título no nome");
  } else if (creature.role === "solo" && typeof nd === "number") {
    rarity = "incomum";
    reasons.push("raridade incomum: solo com ND abaixo de 10");
  }

  const manualReason = isManualOnly(creature);
  if (manualReason) reasons.push(`só manual: ${manualReason}`);

  // Confiança.
  const descTagCount = descTags.size;
  let confidence;
  if (doubtful) confidence = "baixa";
  else if (strongTerrains.size > 0 && !conflict && (descTagCount >= 2 || rules.length > 0)) confidence = "alta";
  else if (descTagCount > 0) confidence = "media";
  else if (rules.length > 0) confidence = rules.map((r) => r.confidence).reduce((a, b) => (CONFIDENCE_ORDER.indexOf(b) > CONFIDENCE_ORDER.indexOf(a) ? b : a));
  else confidence = "baixa";

  return {
    tags: {
      terrains: ordered("terrains", sets.terrains),
      places: ordered("places", sets.places),
      conditions: ordered("conditions", sets.conditions),
      group,
      rarity,
      manualOnly: Boolean(manualReason),
      reviewed: false
    },
    confidence,
    reasons,
    needsBook: confidence === "baixa" || !text
  };
}
