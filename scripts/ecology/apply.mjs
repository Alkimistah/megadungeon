// Valida a planilha de ecologia (tudo ou nada) e gera src/creatureCatalog/ecology.js.
// Uso: npm run ecology:apply -- recursos/ecologia/revisao.csv [--out caminho]

import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";
import { readFileSync, writeFileSync } from "node:fs";
import { readCsv } from "./csv.mjs";
import { catalogCreatureIds } from "./catalogIds.mjs";
import { TERRAINS, PLACES, CONDITIONS, NEUTRAL_ECOLOGY, normalizeTag, validateEcology } from "../../src/creatureCatalog/ecologyVocabulary.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const DEFAULT_OUT = join(ROOT, "src", "creatureCatalog", "ecology.js");
const HEADER = "// Etiquetas de ecologia por id de criatura.\n// Arquivo gerado por scripts/ecology/apply.mjs. Não edite à mão.\n";
const FOREST_REVIEW_HEADER = "// Contém famílias ou terrenos revisados para a floresta.";
const TRUE_VALUES = new Set(["sim", "x", "true", "s"]);
const LISTS = [
  ["terrenos", "terrains", TERRAINS], ["terrenos_floresta", "forestTerrains", TERRAINS],
  ["lugares", "places", PLACES], ["condicoes", "conditions", CONDITIONS]
];

const clean = (value) => String(value ?? "").trim();

function getLegacyGroups(rows) {
  // Nas planilhas antigas, familia repetia o nome do agrupamento em cada ficha.
  return new Set(rows.flatMap(row => {
    if (clean(row.id) || "agrupamento" in row) return [];
    const heading = /^== (.+) \(\d+\) ==$/.exec(clean(row.familia));
    return heading ? [heading[1]] : [];
  }));
}

// Devolve { entries, errors }. knownIds (opcional) é um Set de ids válidos do catálogo.
export function collectEcology(rows, knownIds = null) {
  const entries = {};
  const errors = [];
  const legacyGroups = getLegacyGroups(rows);
  rows.forEach((row, index) => {
    const id = clean(row.id);
    if (!id) return; // cabeçalho de família ou linha sem id
    const line = index + 2;
    const fail = (value, why) => errors.push(`linha ${line}, ${id}, "${value}": ${why}`);
    if (knownIds && !knownIds.has(id)) fail(id, "id não existe no catálogo");
    if (Object.hasOwn(entries, id)) fail(id, "id duplicado");
    const entry = { ...NEUTRAL_ECOLOGY };
    for (const [column, key, vocabulary] of LISTS) {
      const value = clean(row[column]);
      if (key === "forestTerrains" && !value) continue;
      // Campo vazio herda os terrenos gerais. "nenhum" grava uma lista vazia.
      const tags = key === "forestTerrains" && value.toLowerCase() === "nenhum" ? "" : value;
      const found = new Set();
      for (const part of tags.split(",").map((p) => p.trim()).filter(Boolean)) {
        const tagId = normalizeTag(key, part);
        if (tagId) found.add(tagId); else fail(part, `etiqueta desconhecida em ${column}`);
      }
      entry[key] = vocabulary.map((v) => v.id).filter((v) => found.has(v));
    }
    const family = clean(row.familia);
    if (family && !legacyGroups.has(family)) {
      entry.family = normalizeTag("families", family);
      if (!entry.family) fail(family, "família desconhecida em familia");
    }
    const group = clean(row.grupo);
    if (group) {
      entry.group = normalizeTag("groups", group);
      if (!entry.group) fail(group, "grupo desconhecido");
    }
    const rarity = clean(row.raridade);
    if (rarity) {
      entry.rarity = normalizeTag("rarities", rarity);
      if (!entry.rarity) fail(rarity, "raridade desconhecida");
    }
    for (const [column, key] of [["so_manual", "manualOnly"], ["revisado", "reviewed"]]) {
      const flag = clean(row[column]).toLowerCase();
      if (flag && !TRUE_VALUES.has(flag)) fail(clean(row[column]), `valor inválido em ${column} (use sim, s, x, true ou deixe vazio)`);
      entry[key] = TRUE_VALUES.has(flag);
    }
    if (!errors.some((e) => e.startsWith(`linha ${line},`))) {
      const problems = validateEcology(entry);
      problems.forEach((p) => fail(id, p));
    }
    if (!Object.hasOwn(entries, id)) entries[id] = entry;
  });
  return { entries, errors };
}

export function buildEcologyFromRows(rows, knownIds = null) {
  const { entries, errors } = collectEcology(rows, knownIds);
  if (errors.length) throw new Error(errors.join("\n"));
  return entries;
}

export function renderEcologyModule(entries) {
  const lines = Object.keys(entries).sort().map((id) => {
    const e = entries[id];
    const list = (items) => `[${items.map((i) => JSON.stringify(i)).join(", ")}]`;
    const forestTerrains = e.forestTerrains ? `, forestTerrains: ${list(e.forestTerrains)}` : "";
    const family = e.family ? `, family: ${JSON.stringify(e.family)}` : "";
    return `  ${JSON.stringify(id)}: { terrains: ${list(e.terrains)}${forestTerrains}, places: ${list(e.places)}, conditions: ${list(e.conditions)}${family}, group: ${JSON.stringify(e.group)}, rarity: ${JSON.stringify(e.rarity)}, manualOnly: ${e.manualOnly}, reviewed: ${e.reviewed} },`;
  });
  const includesForestReview = Object.values(entries).some(entry => entry.family || entry.forestTerrains);
  const forestReviewHeader = includesForestReview ? `${FOREST_REVIEW_HEADER}\n` : "";
  return `${HEADER}${forestReviewHeader}\nexport const ecologyByCreatureId = {\n${lines.join("\n")}${lines.length ? "\n" : ""}};\n`;
}

function hasForestReview(file) {
  try {
    return readFileSync(file, "utf8").split(/\r?\n/, 4).includes(FOREST_REVIEW_HEADER);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    return false;
  }
}

// Valida tudo antes de escrever; com qualquer erro, o arquivo de saída fica intacto.
export function applyEcologySheet(csvFile, outFile = DEFAULT_OUT) {
  const knownIds = catalogCreatureIds();
  const rows = readCsv(csvFile);
  const entries = buildEcologyFromRows(rows, knownIds);
  const columns = rows[0] ?? {};
  const supportsForestReview = "familia" in columns && "terrenos_floresta" in columns && !getLegacyGroups(rows).size;
  if (!supportsForestReview && hasForestReview(outFile)) {
    throw new Error("A saída já contém dados revisados da floresta. Use as colunas familia e terrenos_floresta da planilha de revisão atual e copie seus valores por id. Mova os títulos dos grupos para a coluna agrupamento.");
  }
  writeFileSync(outFile, renderEcologyModule(entries), "utf8");
  return entries;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const outIndex = args.indexOf("--out");
  const out = outIndex >= 0 ? resolve(args[outIndex + 1]) : DEFAULT_OUT;
  const csv = args.find((a, i) => !a.startsWith("--") && (outIndex < 0 || i !== outIndex + 1));
  if (!csv) { console.error("Uso: npm run ecology:apply -- <planilha.csv> [--out caminho]"); process.exit(2); }
  try {
    const entries = applyEcologySheet(resolve(csv), out);
    console.log(`${Object.keys(entries).length} entradas gravadas em ${out}`);
  } catch (error) {
    console.error(`Planilha inválida; nada foi gravado.\n${error.message}`);
    process.exit(1);
  }
}
