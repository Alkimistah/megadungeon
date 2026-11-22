// Gera tmp/ecologia/rascunho.csv com as etiquetas sugeridas para todas as fichas do catálogo.
// Uso: npm run ecology:draft

import { fileURLToPath } from "node:url";
import { dirname, join, relative } from "node:path";
import { creatureCatalog } from "../../src/creatureCatalog/index.js";
import { TERRAINS, PLACES, CONDITIONS, GROUPS, RARITIES } from "../../src/creatureCatalog/ecologyVocabulary.js";
import { suggestEcology } from "./draftRules.mjs";
import { writeCsv } from "./csv.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const OUTPUT = join(ROOT, "tmp", "ecologia", "rascunho.csv");

const DRAFT_COLUMNS = ["familia", "id", "nome", "livro", "pagina_pdf", "tipo", "subtipo", "nd", "papel", "terrenos", "lugares", "condicoes", "grupo", "raridade", "so_manual", "confianca", "precisa_livro", "motivos", "citacao"];

const LABEL = Object.fromEntries([...TERRAINS, ...PLACES, ...CONDITIONS, ...GROUPS, ...RARITIES].map((t) => [t.id, t.label]));
const labelList = (ids) => ids.map((id) => LABEL[id]).join(", ");
// Vírgula decimal para o Excel em pt-BR não confundir 0.25 com data ou texto.
const formatNd = (nd) => (typeof nd === "number" ? String(nd).replace(".", ",") : String(nd ?? ""));
const ndSortKey = (nd) => (typeof nd === "number" ? nd : Number.POSITIVE_INFINITY);

function toRow(creature) {
  const s = suggestEcology(creature);
  return {
    familia: creature.variantOf ?? creature.subtype ?? creature.type,
    id: creature.id,
    nome: creature.name,
    livro: creature.source?.book ?? "",
    pagina_pdf: creature.source?.pdfPage ?? "",
    tipo: creature.type,
    subtipo: creature.subtype ?? "",
    nd: formatNd(creature.challengeRating),
    papel: creature.role ?? "",
    terrenos: labelList(s.tags.terrains),
    lugares: labelList(s.tags.places),
    condicoes: labelList(s.tags.conditions),
    grupo: s.tags.group ? LABEL[s.tags.group] : "",
    raridade: LABEL[s.tags.rarity],
    so_manual: s.tags.manualOnly ? "sim" : "",
    confianca: s.confidence,
    precisa_livro: s.needsBook ? "sim" : "não",
    motivos: s.reasons.join(" | "),
    citacao: "",
    _nd: ndSortKey(creature.challengeRating)
  };
}

const rows = creatureCatalog.map(toRow).sort((a, b) =>
  a.familia.localeCompare(b.familia, "pt-BR") || a._nd - b._nd || a.nome.localeCompare(b.nome, "pt-BR"));

writeCsv(rows, OUTPUT, DRAFT_COLUMNS);

const byConfidence = { alta: 0, media: 0, baixa: 0 };
for (const row of rows) byConfidence[row.confianca]++;
const needsBook = rows.filter((row) => row.precisa_livro === "sim").length;
const manualOnly = rows.filter((row) => row.so_manual === "sim").length;

console.log(`Rascunho gravado em ${relative(ROOT, OUTPUT)} (${rows.length} fichas).`);
console.log(`Confiança: alta ${byConfidence.alta}, média ${byConfidence.media}, baixa ${byConfidence.baixa}.`);
console.log(`Precisam do livro: ${needsBook}. Só manual: ${manualOnly}.`);
