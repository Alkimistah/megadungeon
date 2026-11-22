// Divide as linhas do rascunho que precisam do livro em lotes e junta os lotes conferidos.
// Uso: npm run ecology:batches -- split [--force]   |   merge   |   review

import { existsSync, readdirSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, relative } from "node:path";
import { readCsv, writeCsv } from "./csv.mjs";
import { rawCreatures } from "./catalogIds.mjs";
import { TERRAINS, PLACES, CONDITIONS, GROUPS, RARITIES } from "../../src/creatureCatalog/ecologyVocabulary.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const DIR = join(ROOT, "tmp", "ecologia");
const DRAFT = join(DIR, "rascunho.csv");
const BATCH_DIR = join(DIR, "lotes");
const DONE_DIR = join(DIR, "conferido");
const MERGED = join(DIR, "conferido.csv");
const REVIEW = join(DIR, "revisao.csv");
const VOCAB = join(DIR, "vocabulario.csv");
export const BATCH_SIZE = 40;

const batchName = (n) => `lote-${String(n).padStart(2, "0")}.csv`;
const byText = (a, b) => a.localeCompare(b, "pt-BR");

// Linhas com precisa_livro = "sim", agrupadas por livro e família, em lotes de um só livro.
// Uma família só se divide entre lotes se sozinha passar do tamanho do lote.
export function splitRows(rows, size = BATCH_SIZE) {
  const books = new Map();
  for (const row of rows.filter((r) => r.precisa_livro === "sim")) {
    if (!books.has(row.livro)) books.set(row.livro, new Map());
    const families = books.get(row.livro);
    if (!families.has(row.familia)) families.set(row.familia, []);
    families.get(row.familia).push(row);
  }
  const batches = [];
  for (const book of [...books.keys()].sort(byText)) {
    let current = [];
    const flush = () => { if (current.length) batches.push(current); current = []; };
    for (const family of [...books.get(book).keys()].sort(byText)) {
      let group = books.get(book).get(family);
      if (group.length > size) {
        flush();
        while (group.length > size) { batches.push(group.slice(0, size)); group = group.slice(size); }
      }
      if (current.length + group.length > size) flush();
      current.push(...group);
    }
    flush();
  }
  return batches;
}

// Substitui cada linha do rascunho pela linha conferida de mesmo id, mantendo a ordem do rascunho.
export function mergeRows(draftRows, verifiedLists) {
  const columns = Object.keys(draftRows[0] ?? {});
  const draftIds = new Set(draftRows.map((r) => r.id));
  const verified = new Map();
  const problems = [];
  verifiedLists.forEach((list, i) => {
    for (const row of list) {
      const label = `lote ${i + 1}, id "${row.id}"`;
      if (Object.keys(row).join("|") !== columns.join("|")) problems.push(`${label}: colunas diferentes do rascunho`);
      if (!draftIds.has(row.id)) problems.push(`${label}: id fora do rascunho`);
      if (verified.has(row.id)) problems.push(`${label}: id duplicado`);
      verified.set(row.id, row);
    }
  });
  if (problems.length) throw new Error(problems.join("\n"));
  return draftRows.map((r) => verified.get(r.id) ?? r);
}

export const REVIEW_COLUMNS = ["familia", "nome", "nd", "terrenos", "lugares", "condicoes", "grupo", "raridade", "so_manual", "revisado", "confianca", "citacao", "id", "livro", "pagina_pdf"];

const TYPE_FAMILIES = { animal: "Animais", construct: "Construtos", spirit: "Espíritos", humanoid: "Humanoides", monster: "Monstros", undead: "Mortos-vivos", event: "Eventos", "???": "Outros" };
const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

// Nome amigável da família: tipo -> plural em português; subtipo -> capitalizado; variantOf -> nome da ficha base.
function familyName(raw, rows, namesById) {
  if (TYPE_FAMILIES[raw]) return TYPE_FAMILIES[raw];
  if (rows.some((r) => r.subtipo === raw)) return capitalize(raw);
  return namesById.get(raw) ?? capitalize(raw.replace(/-/g, " "));
}

const ndValue = (nd) => { const n = Number(String(nd).replace(",", ".")); return nd !== "" && Number.isFinite(n) ? n : Infinity; };

// Regras do PO, spec "Decisões do PO após a conferência (22/11/2026)". Só valem para terreno vazio
// (sem terreno citado no livro), então reaplicar não muda nada. Usam tipo/subtipo da ficha, não a família do CSV.
const OPEN_TERRAINS = "Aquático, Ártico, Colina, Deserto, Floresta, Montanha, Pântano, Planície";
const PO_RULES = [
  {
    applies: (creature) => /drag/i.test(creature.subtype || ""),
    terrenos: OPEN_TERRAINS,
    note: "regra do PO: dragões em qualquer lugar aberto",
  },
  {
    applies: (creature) => creature.type === "undead",
    terrenos: "Pântano",
    lugares: "Catacumbas/necrópole",
    condicoes: "Miasma",
    note: "regra do PO: mortos-vivos em qualquer lugar, mais em catacumbas, miasma e pântano",
  },
];
const addToList = (list, item) => { const parts = list ? list.split(", ") : []; if (!parts.includes(item)) parts.push(item); return parts.join(", "); };

// Devolve cópias das linhas com as regras aplicadas; catalogById é um Map id -> ficha (type, subtype).
export function applyPoRules(rows, catalogById) {
  return rows.map((row) => {
    const creature = row.id ? catalogById.get(row.id) : null;
    if (!creature || row.terrenos) return row;
    const rule = PO_RULES.find((r) => r.applies(creature));
    if (!rule) return row;
    const next = { ...row, terrenos: rule.terrenos, citacao: row.citacao ? `${row.citacao} | ${rule.note}` : rule.note };
    if (rule.lugares) next.lugares = addToList(row.lugares, rule.lugares);
    if (rule.condicoes) next.condicoes = addToList(row.condicoes, rule.condicoes);
    return next;
  });
}

// Planilha para o PO: um cabeçalho "== Família (n) ==" e depois as fichas da família, por ND e nome.
export function buildReviewRows(sourceRows, catalogById = new Map()) {
  const rows = applyPoRules(sourceRows, catalogById);
  const namesById = new Map(rows.map((r) => [r.id, r.nome]));
  const byFamily = new Map();
  for (const [raw, list] of Map.groupBy(rows, (r) => r.familia)) {
    const name = familyName(raw, list, namesById);
    byFamily.set(name, [...(byFamily.get(name) ?? []), ...list]);
  }
  const out = [];
  for (const name of [...byFamily.keys()].sort(byText)) {
    const members = byFamily.get(name).sort((a, b) => ndValue(a.nd) - ndValue(b.nd) || byText(a.nome, b.nome));
    out.push(Object.fromEntries(REVIEW_COLUMNS.map((c) => [c, c === "familia" ? `== ${name} (${members.length}) ==` : ""])));
    for (const r of members) out.push(Object.fromEntries(REVIEW_COLUMNS.map((c) => [c, c === "familia" ? name : c === "revisado" ? "" : r[c] ?? ""])));
  }
  return out;
}

// Palavras válidas de cada coluna, uma coluna por categoria, com os rótulos do vocabulário.
export function buildVocabularyRows() {
  const columns = { terrenos: TERRAINS, lugares: PLACES, condicoes: CONDITIONS, grupo: GROUPS, raridade: RARITIES };
  const values = Object.fromEntries(Object.entries(columns).map(([k, v]) => [k, v.map((e) => e.label)]));
  values.so_manual = ["sim"];
  values.revisado = ["x"];
  const names = Object.keys(values);
  const height = Math.max(...names.map((k) => values[k].length));
  return { names, rows: Array.from({ length: height }, (_, i) => Object.fromEntries(names.map((k) => [k, values[k][i] ?? ""]))) };
}

function review(force) {
  if (!existsSync(MERGED)) { console.error(`Falta ${relative(ROOT, MERGED)}. Rode merge.`); return 1; }
  if (existsSync(REVIEW) && !force) {
    console.error(`${relative(ROOT, REVIEW)} já existe e pode ter edições. Use --force para sobrescrever.`);
    return 1;
  }
  const rows = readCsv(MERGED);
  const sheet = buildReviewRows(rows, rawCreatures());
  writeCsv(sheet, REVIEW, REVIEW_COLUMNS);
  const vocab = buildVocabularyRows();
  writeCsv(vocab.rows, VOCAB, vocab.names);
  const headers = sheet.filter((r) => !r.id);
  console.log(`${relative(ROOT, REVIEW)}: ${rows.length} fichas em ${headers.length} famílias; ${relative(ROOT, VOCAB)} gravado.`);
  return 0;
}

function split(force) {
  if (!existsSync(DRAFT)) { console.error(`Falta ${relative(ROOT, DRAFT)}. Rode npm run ecology:draft.`); return 1; }
  const done = existsSync(DONE_DIR) ? readdirSync(DONE_DIR).filter((f) => f.endsWith(".csv")) : [];
  if (done.length && !force) {
    console.error(`${relative(ROOT, DONE_DIR)} já tem ${done.length} arquivo(s) conferido(s). Use --force para dividir de novo.`);
    return 1;
  }
  const rows = readCsv(DRAFT);
  const columns = Object.keys(rows[0]);
  if (existsSync(BATCH_DIR)) for (const f of readdirSync(BATCH_DIR)) if (/^lote-\d+\.csv$/.test(f)) rmSync(join(BATCH_DIR, f));
  const batches = splitRows(rows);
  batches.forEach((batch, i) => writeCsv(batch, join(BATCH_DIR, batchName(i + 1)), columns));
  console.log(`${batches.length} lotes em ${relative(ROOT, BATCH_DIR)}:`);
  batches.forEach((batch, i) => console.log(`  ${batchName(i + 1)}: ${batch[0].livro}, ${batch.length} linhas`));
  return 0;
}

function merge() {
  if (!existsSync(DRAFT)) { console.error(`Falta ${relative(ROOT, DRAFT)}.`); return 1; }
  const draft = readCsv(DRAFT);
  const total = existsSync(BATCH_DIR) ? readdirSync(BATCH_DIR).filter((f) => /^lote-\d+\.csv$/.test(f)).sort() : [];
  const present = total.filter((f) => existsSync(join(DONE_DIR, f)));
  let merged;
  try { merged = mergeRows(draft, present.map((f) => readCsv(join(DONE_DIR, f)))); }
  catch (error) { console.error(`Lotes conferidos com problemas:\n${error.message}`); return 1; }
  writeCsv(merged, MERGED, Object.keys(draft[0]));
  const replaced = merged.filter((r, i) => r !== draft[i]).length;
  const missing = total.filter((f) => !present.includes(f));
  const noCitation = merged.filter((r) => r.precisa_livro === "sim" && !r.citacao).length;
  console.log(`${relative(ROOT, MERGED)}: ${merged.length} linhas, ${replaced} conferidas.`);
  console.log(`Lotes presentes: ${present.length}/${total.length}${missing.length ? ` (faltam: ${missing.join(", ")})` : ""}.`);
  console.log(`Linhas precisa_livro = sim ainda sem citação: ${noCitation}.`);
  return 0;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const [command, ...flags] = process.argv.slice(2);
  if (command === "split") process.exitCode = split(flags.includes("--force"));
  else if (command === "merge") process.exitCode = merge();
  else if (command === "review") process.exitCode = review(flags.includes("--force"));
  else { console.error("Uso: node scripts/ecology/batches.mjs split [--force] | merge | review [--force]"); process.exitCode = 1; }
}
