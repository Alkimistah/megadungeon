import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync, writeFileSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { splitRows, mergeRows, buildReviewRows, buildVocabularyRows, applyPoRules, REVIEW_COLUMNS } from "./ecology/batches.mjs";
import { catalogCreatureIds } from "./ecology/catalogIds.mjs";
import { TERRAINS, PLACES, CONDITIONS, GROUPS, RARITIES, NEUTRAL_ECOLOGY, normalizeTag, validateEcology } from "../src/creatureCatalog/ecologyVocabulary.js";
import { ecologyByCreatureId } from "../src/creatureCatalog/ecology.js";
import { creatureCatalog, getCreatureById, getCreatureEcology } from "../src/creatureCatalog/index.js";

test("vocabulary matches the spec", () => {
  assert.deepEqual(TERRAINS.map((t) => t.id), ["aquatico","artico","colina","deserto","floresta","montanha","pantano","planicie","subterraneo"]);
  assert.equal(PLACES.length, 13); assert.equal(CONDITIONS.length, 6); assert.equal(GROUPS.length, 5); assert.equal(RARITIES.length, 3);
});
test("normalizeTag accepts ids, labels, accents and case", () => {
  assert.equal(normalizeTag("terrains", "Pântano"), "pantano");
  assert.equal(normalizeTag("terrains", " pantano "), "pantano");
  assert.equal(normalizeTag("places", "Costa e ilhas"), "costa-ilhas");
  assert.equal(normalizeTag("terrains", "lava"), null);
});
test("validateEcology flags unknown tags and bad shapes", () => {
  assert.deepEqual(validateEcology(NEUTRAL_ECOLOGY), []);
  assert.ok(validateEcology({ ...NEUTRAL_ECOLOGY, terrains: ["lava"] }).length > 0);
  assert.ok(validateEcology({ ...NEUTRAL_ECOLOGY, rarity: "lendaria" }).length > 0);
  assert.ok(validateEcology({ ...NEUTRAL_ECOLOGY, group: "manada" }).length > 0);
  assert.ok(validateEcology({ ...NEUTRAL_ECOLOGY, extra: 1 }).length > 0);
  assert.ok(validateEcology({ terrains: [] }).length > 0);
  assert.ok(validateEcology({ ...NEUTRAL_ECOLOGY, manualOnly: "sim" }).length > 0);
  assert.ok(validateEcology(null).length > 0);
});
test("every ecology entry points to a catalog creature and is valid", () => {
  for (const [id, entry] of Object.entries(ecologyByCreatureId)) {
    assert.ok(getCreatureById(id), `ecologia sem ficha: ${id}`);
    assert.deepEqual(validateEcology(entry), [], id);
  }
});
test("creatures without entry get the neutral ecology", () => {
  assert.deepEqual(getCreatureEcology("nao-existe"), NEUTRAL_ECOLOGY);
  assert.deepEqual(getCreatureEcology("constructor"), NEUTRAL_ECOLOGY);
  const withEntry = creatureCatalog.find((c) => Object.hasOwn(ecologyByCreatureId, c.id));
  if (withEntry) assert.deepEqual(withEntry.ecology, { family: null, ...ecologyByCreatureId[withEntry.id] });
  assert.equal(getCreatureEcology("glop").family, null);
});

// ---- Tarefa 2: rascunho automático ----
import { suggestEcology } from "./ecology/draftRules.mjs";
import { readCsv, writeCsv } from "./ecology/csv.mjs";

test("draft keeps every habitat mentioned", () => {
  const s = suggestEcology({ id: "x", type: "monster", subtype: null, challengeRating: 4, role: "solo",
    description: "Vivem perto de grandes corpos d'água em áreas sombrias, como pântanos, rios, florestas inundadas e até mesmo lagos subterrâneos." });
  for (const t of ["pantano", "aquatico", "floresta", "subterraneo"]) assert.ok(s.tags.terrains.includes(t), t);
});
test("negated or comparative mention lowers confidence", () => {
  const s = suggestEcology({ id: "y", type: "animal", challengeRating: 1, role: "minion", description: "Raramente vistas fora de florestas temperadas." });
  assert.equal(s.confidence, "baixa"); assert.ok(!s.tags.terrains.includes("floresta"));
});
test("non-numeric ND and events are manual-only", () => {
  assert.equal(suggestEcology({ id: "z", type: "spirit", challengeRating: "S", role: null }).tags.manualOnly, true);
  assert.equal(suggestEcology({ id: "w", type: "event", challengeRating: 2, role: null }).tags.manualOnly, true);
});
test("every suggested tag has a reason and passes validation", () => {
  for (const c of creatureCatalog) { const s = suggestEcology(c); assert.deepEqual(validateEcology(s.tags), [], c.id); if (s.tags.terrains.length || s.tags.places.length) assert.ok(s.reasons.length > 0, c.id); }
});
test("swarm name wins over role for group", () => {
  assert.equal(suggestEcology({ id: "e", name: "Enxame de mãos-garra", type: "undead", challengeRating: 3, role: "solo" }).tags.group, "enxame");
});
test("keywords need a word start: short stems do not match inside other words", () => {
  const s = suggestEcology({ id: "fp", type: "animal", challengeRating: 1, role: "special",
    description: "Tem uma marca amarela no território que defende, articulações duras e um campo de força; carrega o filhote nas costas e mata a presa na névoa. Era um desertor." });
  assert.deepEqual(s.tags.terrains, []);
  assert.ok(!s.tags.places.includes("costa-ilhas"));
  assert.deepEqual(s.tags.conditions, ["neblina"]);
});
test("water alone is weak evidence and never gives high confidence", () => {
  const s = suggestEcology({ id: "ag", type: "animal", challengeRating: 1, role: "solo", description: "Bebe água e caça à noite." });
  assert.deepEqual(s.tags.terrains, ["aquatico"]);
  assert.notEqual(s.confidence, "alta");
  const strong = suggestEcology({ id: "ag2", type: "animal", challengeRating: 1, role: "solo", description: "Vivem em pântanos e florestas, sempre perto da água." });
  assert.equal(strong.confidence, "alta");
});
test("subtype rules give base tags with a reason", () => {
  const u = suggestEcology({ id: "u", type: "undead", subtype: null, challengeRating: 2, role: "minion" });
  assert.deepEqual(u.tags.places, ["catacumbas"]); assert.deepEqual(u.tags.conditions, ["miasma"]);
  assert.equal(u.confidence, "media"); assert.equal(u.needsBook, true);
  assert.ok(u.reasons.some((r) => r.includes("regra de subtipo")));
  const k = suggestEcology({ id: "k", type: "construct", subtype: null, challengeRating: 2, role: "solo" });
  assert.deepEqual(k.tags.places, ["masmorra", "cavernas-profundas"]); assert.equal(k.confidence, "baixa");
  assert.deepEqual(suggestEcology({ id: "g", type: "humanoid", subtype: "goblin", challengeRating: 1, role: "minion" }).tags.terrains, ["floresta", "subterraneo"]);
  assert.deepEqual(suggestEcology({ id: "n", type: "humanoid", subtype: "nagah", challengeRating: 1, role: "minion" }).tags.terrains, ["pantano"]);
  assert.deepEqual(suggestEcology({ id: "l", type: "monster", subtype: "lefou", challengeRating: 1, role: "minion" }).tags.places, ["tormenta"]);
});
test("tags are deduplicated and in vocabulary order", () => {
  const s = suggestEcology({ id: "d", type: "humanoid", subtype: "goblin", challengeRating: 1, role: "minion",
    description: "Vivem em subterrâneos, cavernas, florestas e pântanos." });
  assert.deepEqual(s.tags.terrains, ["floresta", "pantano", "subterraneo"]);
});
test("rarity and group defaults", () => {
  assert.equal(suggestEcology({ id: "r1", name: "Dragão", type: "monster", subtype: "dragão", challengeRating: 3, role: "minion" }).tags.rarity, "rara");
  assert.equal(suggestEcology({ id: "r2", name: "Fera", type: "monster", challengeRating: 12, role: "solo" }).tags.rarity, "rara");
  assert.equal(suggestEcology({ id: "r3", name: "Fera", type: "monster", challengeRating: 4, role: "solo" }).tags.rarity, "incomum");
  assert.equal(suggestEcology({ id: "r4", name: "Rei dos Ratos", type: "animal", challengeRating: 1, role: "minion" }).tags.rarity, "rara");
  assert.equal(suggestEcology({ id: "r5", name: "Reishid", type: "monster", challengeRating: 1, role: "minion" }).tags.rarity, "comum");
  assert.equal(suggestEcology({ id: "g1", name: "X", type: "animal", challengeRating: 1, role: "minion" }).tags.group, "bando");
  assert.equal(suggestEcology({ id: "g2", name: "X", type: "animal", challengeRating: 1, role: "special" }).tags.group, "dupla");
  assert.equal(suggestEcology({ id: "g3", name: "Tropa de Choque", type: "humanoid", challengeRating: 1, role: "solo" }).tags.group, "horda");
});
test("avatars and aspects from Deuses de Arton are manual-only", () => {
  const book = { book: "Deuses de Arton" };
  assert.equal(suggestEcology({ id: "a", name: "Avatar de Nimb", type: "spirit", challengeRating: 5, role: "solo", source: book }).tags.manualOnly, true);
  assert.equal(suggestEcology({ id: "b", name: "Aspecto de Marah", type: "spirit", challengeRating: 5, role: "solo", source: book }).tags.manualOnly, true);
  assert.equal(suggestEcology({ id: "c", name: "Dríade", type: "spirit", challengeRating: 5, role: "solo", source: book }).tags.manualOnly, false);
});
test("csv round-trips quotes, separators, accents and line breaks", () => {
  const dir = mkdtempSync(join(tmpdir(), "eco-csv-"));
  try {
    const file = join(dir, "t.csv");
    const rows = [{ a: "Pântano, Floresta", b: 'diz "olá"; tchau', c: "linha1\nlinha2" }, { a: "", b: "x", c: "3" }];
    writeCsv(rows, file);
    assert.deepEqual(readCsv(file), rows);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});
test("figurative uses found in the catalog are not habitats", () => {
  const s = suggestEcology({ id: "fig", name: "Sargento", type: "humanoid", challengeRating: 3, role: "solo",
    description: "Treinado nos campos militares, lidera suas tropas e estuda magias de trevas." });
  assert.deepEqual(s.tags.terrains, []); assert.deepEqual(s.tags.conditions, []);
  assert.equal(s.tags.group, "solitaria");
  assert.deepEqual(suggestEcology({ id: "sel", type: "monster", challengeRating: 3, role: "solo", description: "Habita selvas profundas e charcos." }).tags.terrains, ["floresta", "pantano"]);
});
test("description may be an array of paragraphs; an empty array counts as no description", () => {
  const s = suggestEcology({ id: "arr", type: "animal", challengeRating: 1, role: "minion",
    description: ["Esse roedor vive em bandos.", "Pode ser encontrado em pântanos ermos e esgotos de metrópoles."] });
  assert.deepEqual(s.tags.terrains, ["pantano"]); assert.deepEqual(s.tags.places, ["urbano"]);
  assert.equal(s.tags.group, "bando"); assert.equal(s.confidence, "alta"); assert.equal(s.needsBook, false);
  const e = suggestEcology({ id: "emp", type: "animal", challengeRating: 1, role: "minion", description: [] });
  assert.equal(e.needsBook, true); assert.equal(e.confidence, "baixa");
});
test("habitat words inside hyphenated names are not habitats", () => {
  const s = suggestEcology({ id: "hy", type: "animal", challengeRating: 1, role: "minion", description: "Lobos-das-cavernas caçam como lobos comuns." });
  assert.deepEqual(s.tags.terrains, []);
});
const row = (id, livro, familia, precisa, extra = {}) => ({ familia, id, livro, precisa_livro: precisa, citacao: "", terrenos: "", ...extra });
test("split groups needs-book rows by book and family in batches of at most 40", () => {
  const rows = [row("a1", "B", "x", "sim"), row("n1", "A", "x", "não"), row("a2", "A", "y", "sim"), row("a3", "A", "x", "sim"), row("a4", "A", "y", "sim")];
  const batches = splitRows(rows);
  assert.deepEqual(batches.map((b) => b.map((r) => r.id)), [["a3", "a2", "a4"], ["a1"]]);
  const big = Array.from({ length: 95 }, (_, i) => row(`g${i}`, "A", "gigante", "sim"));
  assert.deepEqual(splitRows([...big, row("z", "A", "zz", "sim")]).map((b) => b.length), [40, 40, 16]);
  const fam = [...Array.from({ length: 25 }, (_, i) => row(`p${i}`, "A", "p", "sim")), ...Array.from({ length: 25 }, (_, i) => row(`q${i}`, "A", "q", "sim"))];
  assert.deepEqual(splitRows(fam).map((b) => b.length), [25, 25]);
});
test("split then merge without changes returns the draft identical", () => {
  const draft = Array.from({ length: 100 }, (_, i) => row(`id${i}`, i % 3 ? "A" : "B", `f${i % 7}`, i % 4 ? "sim" : "não"));
  const lists = splitRows(draft).map((b) => b.map((r) => ({ ...r })));
  assert.deepEqual(mergeRows(draft, lists), draft);
  assert.deepEqual(mergeRows(draft, []), draft);
});
test("merge replaces rows by id keeping the draft order and rejects bad batches", () => {
  const draft = [row("a", "A", "f", "sim"), row("b", "A", "f", "sim"), row("c", "A", "f", "não")];
  const merged = mergeRows(draft, [[{ ...draft[1], citacao: "trecho (PDF 3)" }]]);
  assert.deepEqual(merged.map((r) => r.id), ["a", "b", "c"]);
  assert.equal(merged[1].citacao, "trecho (PDF 3)"); assert.equal(merged[0].citacao, "");
  assert.throws(() => mergeRows(draft, [[row("zzz", "A", "f", "sim")]]), /fora do rascunho/);
  assert.throws(() => mergeRows(draft, [[draft[0]], [draft[0]]]), /duplicado/);
  assert.throws(() => mergeRows(draft, [[{ id: "a" }]]), /colunas/);
});

test("review sheet has one row per creature plus one header per family, in order", () => {
  const mk = (id, nome, familia, nd, extra = {}) => ({ familia, id, nome, livro: "L", pagina_pdf: "1", tipo: "monster", subtipo: "", nd, papel: "", terrenos: "Floresta", lugares: "", condicoes: "", grupo: "", raridade: "Comum", so_manual: "", confianca: "alta", precisa_livro: "nao", motivos: "", citacao: "", ...extra });
  const rows = [
    mk("g2", "Goblin B", "goblin", "1", { tipo: "humanoid", subtipo: "goblin" }),
    mk("g1", "Goblin A", "goblin", "0,25", { tipo: "humanoid", subtipo: "goblin" }),
    mk("g3", "Goblin X", "goblin", "?", { tipo: "humanoid", subtipo: "goblin" }),
    mk("lobo", "Lobo", "animal", "1", { tipo: "animal" }),
    mk("lobo-atroz", "Lobo Atroz", "lobo", "2", { tipo: "animal" }),
    mk("u1", "Zumbi", "undead", "1", { tipo: "undead" }),
    mk("r1", "Rival", "???", "?", { tipo: "???" })
  ];
  const sheet = buildReviewRows(rows);
  const headers = sheet.filter((r) => r.id === "");
  assert.equal(sheet.length, rows.length + headers.length);
  assert.deepEqual(headers.map((r) => r.agrupamento), ["== Animais (1) ==", "== Goblin (3) ==", "== Lobo (1) ==", "== Mortos-vivos (1) ==", "== Outros (1) =="]);
  assert.ok(headers.every((r) => Object.entries(r).every(([k, v]) => k === "agrupamento" || v === "")));
  const goblins = sheet.filter((r) => r.agrupamento === "Goblin").map((r) => r.nome);
  assert.deepEqual(goblins, ["Goblin A", "Goblin B", "Goblin X"]);
  assert.ok(sheet.every((r) => r.familia === ""));
  assert.ok(sheet.every((r) => Object.keys(r).join("|") === REVIEW_COLUMNS.join("|")));
  assert.deepEqual(REVIEW_COLUMNS, ["agrupamento", "familia", "nome", "nd", "terrenos", "terrenos_floresta", "lugares", "condicoes", "grupo", "raridade", "so_manual", "revisado", "confianca", "citacao", "id", "livro", "pagina_pdf"]);
  assert.ok(sheet.every((r) => r.revisado === ""));
});
test("vocabulary sheet has one column per category with the vocabulary labels", () => {
  const { names, rows } = buildVocabularyRows();
  assert.deepEqual(names, ["familia", "terrenos", "terrenos_floresta", "lugares", "condicoes", "grupo", "raridade", "so_manual", "revisado"]);
  assert.equal(rows[0].familia, "Abelhas-grifo");
  assert.ok(rows.some(row => row.terrenos_floresta === "nenhum"));
  assert.equal(rows[0].terrenos, "Aquático");
  assert.equal(rows.map((r) => r.lugares).filter(Boolean).length, 13);
});

// ---- Tarefa 5: aplicação da planilha ----
import { buildEcologyFromRows, applyEcologySheet } from "./ecology/apply.mjs";

test("csv round trip preserves quotes, commas and accents", () => {
  const dir = mkdtempSync(join(tmpdir(), "eco-"));
  try {
    const rows = [{ nome: 'Glop "grande"', citacao: "pântanos, rios; lagos", terrenos: "Pântano, Aquático" }];
    writeCsv(rows, join(dir, "a.csv")); assert.deepEqual(readCsv(join(dir, "a.csv")), rows);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});
test("apply rejects unknown tags with row and creature", () => {
  assert.throws(() => buildEcologyFromRows([{ id: "glop", nome: "Glop", terrenos: "Lava" }]), /linha 2.*glop.*Lava/i);
});
test("apply accepts labels without accents and extra spaces", () => {
  const eco = buildEcologyFromRows([{ id: "glop", nome: "Glop", terrenos: " pantano , Aquático", lugares: "", condicoes: "", grupo: "Bando", raridade: "comum", so_manual: "", revisado: "x" }]);
  assert.deepEqual(eco.glop.terrains, ["aquatico", "pantano"]);
  assert.equal(eco.glop.reviewed, true);
  assert.equal(eco.glop.manualOnly, false);
});
test("apply reads ecological families and the forest-only habitat", () => {
  const entries = buildEcologyFromRows([
    { id: "jiboia", familia: "Serpentes constritoras", terrenos_floresta: "Pântano, Aquático" },
    { id: "leoa-rainha", familia: "leoes", terrenos: "Montanha", terrenos_floresta: "nenhum" },
    { id: "lobo", familia: "lobos", terrenos: "Floresta" },
    { id: "glop" }
  ]);
  assert.equal(entries.jiboia.family, "serpentes-constritoras");
  assert.deepEqual(entries.jiboia.terrains, []);
  assert.deepEqual(entries.jiboia.forestTerrains, ["aquatico", "pantano"]);
  assert.deepEqual(entries["leoa-rainha"].forestTerrains, []);
  assert.deepEqual(entries["leoa-rainha"].terrains, ["montanha"]);
  assert.equal(entries.lobo.forestTerrains, undefined);
  assert.equal(entries.glop.family, null);
  assert.throws(() => buildEcologyFromRows([{ id: "a", familia: "Lava" }]), /linha 2.*a.*Lava.*familia/i);
  assert.throws(() => buildEcologyFromRows([{ id: "a", terrenos_floresta: "Lava" }]), /linha 2.*a.*Lava.*terrenos_floresta/i);
  assert.match(validateEcology({ ...NEUTRAL_ECOLOGY, family: "lava" }).join("\n"), /family/);
  assert.match(validateEcology({ ...NEUTRAL_ECOLOGY, forestTerrains: ["lava"] }).join("\n"), /forestTerrains/);
});
test("review separates ecological family from the visual group", () => {
  const rows = buildReviewRows([{ id: "lobo", nome: "Lobo", familia: "animal" }], new Map([
    ["lobo", { id: "lobo", name: "Lobo", ecology: { family: "lobos", forestTerrains: ["floresta"] } }]
  ]));
  assert.equal(rows[0].agrupamento, "== Animais (1) ==");
  assert.equal(rows[1].familia, "lobos");
  assert.equal(rows[1].terrenos_floresta, "floresta");
  assert.equal(buildEcologyFromRows(rows).lobo.family, "lobos");
});
test("apply still accepts the former review sheet's visual grouping", () => {
  const entries = buildEcologyFromRows([
    { id: "", familia: "== Goblin (1) ==" },
    { id: "goblin", familia: "Goblin", terrenos: "Floresta" }
  ]);
  assert.equal(entries.goblin.family, null);
  assert.deepEqual(entries.goblin.terrains, ["floresta"]);
});
test("apply preserves a reviewed output when the sheet cannot represent the forest data", () => {
  const dir = mkdtempSync(join(tmpdir(), "eco-"));
  try {
    const csv = join(dir, "s.csv"); const out = join(dir, "ecology.js");
    writeCsv([{ id: "sucuri", familia: "serpentes-constritoras", terrenos_floresta: "Aquático" }], csv);
    applyEcologySheet(csv, out);
    const reviewed = readFileSync(out, "utf8");

    const incompleteSheets = [
      [{ id: "", familia: "== Animais (1) ==" }, { id: "sucuri", familia: "Animais" }],
      [{ id: "sucuri", terrenos: "Floresta" }],
      [{ id: "sucuri", familia: "serpentes-constritoras" }],
      [{ id: "sucuri", terrenos_floresta: "Aquático" }],
      [{ id: "", familia: "== Serpentes constritoras (1) ==", terrenos_floresta: "" },
        { id: "sucuri", familia: "Serpentes constritoras", terrenos_floresta: "Floresta" }]
    ];
    for (const rows of incompleteSheets) {
      writeCsv(rows, csv);
      assert.throws(() => applyEcologySheet(csv, out), /familia.*terrenos_floresta/);
      assert.equal(readFileSync(out, "utf8"), reviewed);
    }

    writeCsv([{ id: "sucuri", familia: "serpentes-constritoras", terrenos_floresta: "Pântano" }], csv);
    assert.deepEqual(applyEcologySheet(csv, out).sucuri.forestTerrains, ["pantano"]);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});
test("apply can still generate an output from a legacy sheet without forest data", () => {
  const dir = mkdtempSync(join(tmpdir(), "eco-"));
  try {
    const csv = join(dir, "s.csv"); const out = join(dir, "ecology.js");
    writeCsv([{ id: "", familia: "== Animais (1) ==", terrenos: "" },
      { id: "sucuri", familia: "Animais", terrenos: "Aquático" }], csv);
    assert.deepEqual(applyEcologySheet(csv, out).sucuri.terrains, ["aquatico"]);
    writeCsv([{ id: "sucuri", terrenos: "Pântano" }], csv);
    assert.deepEqual(applyEcologySheet(csv, out).sucuri.terrains, ["pantano"]);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});
test("apply defaults, so_manual values, family headers and duplicates", () => {
  const base = { terrenos: "", lugares: "", condicoes: "", grupo: "", raridade: "", revisado: "" };
  const eco = buildEcologyFromRows([
    { ...base, id: "", familia: "== X (1) ==" },
    { ...base, id: "a", so_manual: "SIM" }, { ...base, id: "b", so_manual: "x" }, { ...base, id: "c", so_manual: "" },
  ]);
  assert.deepEqual([eco.a.manualOnly, eco.b.manualOnly, eco.c.manualOnly], [true, true, false]);
  assert.equal(eco.a.group, null); assert.equal(eco.a.rarity, "comum"); assert.equal(eco.a.reviewed, false);
  assert.throws(() => buildEcologyFromRows([{ ...base, id: "a" }, { ...base, id: "a" }]), /duplicado/);
  assert.throws(() => buildEcologyFromRows([{ ...base, id: "zzz" }], new Set(["a"])), /catálogo/);
});
test("apply is all-or-nothing", () => {
  const dir = mkdtempSync(join(tmpdir(), "eco-"));
  try {
    const csv = join(dir, "s.csv"); const out = join(dir, "ecology.js");
    const good = { terrenos: "", lugares: "", condicoes: "", grupo: "", raridade: "", so_manual: "", revisado: "" };
    const first = creatureCatalog[0].id; const second = creatureCatalog[1].id;
    writeFileSync(out, "// conteudo original\n");
    writeCsv([{ ...good, id: first }, { ...good, id: second, terrenos: "Lava" }], csv);
    assert.throws(() => applyEcologySheet(csv, out), /Lava/);
    assert.equal(readFileSync(out, "utf8"), "// conteudo original\n");
    writeCsv([{ ...good, id: second }, { ...good, id: first, terrenos: "Pântano" }], csv);
    applyEcologySheet(csv, out); const first1 = readFileSync(out, "utf8");
    applyEcologySheet(csv, out); assert.equal(readFileSync(out, "utf8"), first1);
    assert.ok(first1.indexOf(JSON.stringify(first)) < first1.indexOf(JSON.stringify(second)) === (first < second));
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test("apply accepts the same truthy set for so_manual and revisado, and rejects anything else", () => {
  const base = { terrenos: "", lugares: "", condicoes: "", grupo: "", raridade: "" };
  for (const word of ["sim", " S ", "X", "True"]) {
    const [e] = Object.values(buildEcologyFromRows([{ ...base, id: "a", so_manual: word, revisado: word }]));
    assert.equal(e.manualOnly, true, word); assert.equal(e.reviewed, true, word);
  }
  const [e] = Object.values(buildEcologyFromRows([{ ...base, id: "a", so_manual: "", revisado: " " }]));
  assert.equal(e.manualOnly, false); assert.equal(e.reviewed, false);
  assert.throws(() => buildEcologyFromRows([{ ...base, id: "a", so_manual: "talvez" }]), /linha 2.*a.*talvez/);
  assert.throws(() => buildEcologyFromRows([{ ...base, id: "a", revisado: "nao" }]), /linha 2.*a.*nao/);
});

test("catalogCreatureIds equals the creatureCatalog ids without importing ecology", () => {
  assert.deepEqual([...catalogCreatureIds()].sort(), creatureCatalog.map((c) => c.id).sort());
});

// Regras do PO: spec "Decisões do PO após a conferência (22/11/2026)".
test("applyPoRules gives dragons the open terrains only when terrain is empty", () => {
  const catalog = new Map([["d1", { type: "monster", subtype: "dragão" }], ["d2", { type: "monster", subtype: "Dragão" }], ["m", { type: "monster", subtype: "goblin" }]]);
  const rows = [
    { id: "d1", terrenos: "", lugares: "", condicoes: "", citacao: "" },
    { id: "d2", terrenos: "Montanha", lugares: "", condicoes: "", citacao: "p. 3" },
    { id: "m", terrenos: "", lugares: "", condicoes: "", citacao: "" },
    { id: "", terrenos: "", lugares: "", condicoes: "", citacao: "" },
  ];
  const out = applyPoRules(rows, catalog);
  assert.equal(out[0].terrenos, "Aquático, Ártico, Colina, Deserto, Floresta, Montanha, Pântano, Planície");
  assert.match(out[0].citacao, /^regra do PO: dragões/);
  assert.deepEqual(out[1], rows[1]);
  assert.deepEqual(out[2], rows[2]);
  assert.deepEqual(out[3], rows[3]);
  assert.equal(rows[0].terrenos, "", "não altera a entrada");
  assert.equal(applyPoRules([{ id: "d1", terrenos: "", citacao: "livro" }], catalog)[0].citacao, "livro | regra do PO: dragões em qualquer lugar aberto");
});
test("applyPoRules gives undead Pântano, catacumbas and miasma without duplicating", () => {
  const catalog = new Map([["z", { type: "undead", subtype: null }], ["z2", { type: "undead", subtype: null }]]);
  const out = applyPoRules([
    { id: "z", terrenos: "", lugares: "", condicoes: "", citacao: "" },
    { id: "z2", terrenos: "", lugares: "Catacumbas/necrópole, Ruínas", condicoes: "Miasma", citacao: "x" },
  ], catalog);
  assert.deepEqual([out[0].terrenos, out[0].lugares, out[0].condicoes], ["Pântano", "Catacumbas/necrópole", "Miasma"]);
  assert.deepEqual([out[1].terrenos, out[1].lugares, out[1].condicoes], ["Pântano", "Catacumbas/necrópole, Ruínas", "Miasma"]);
  assert.match(out[1].citacao, /^x \| regra do PO: mortos-vivos/);
  assert.equal(applyPoRules([{ id: "z", terrenos: "Deserto", lugares: "", condicoes: "" }], catalog)[0].lugares, "");
});
test("buildReviewRows applies the PO rules from the catalog", () => {
  const row = { familia: "undead", id: "z", nome: "Z", nd: "1", terrenos: "", lugares: "", condicoes: "", citacao: "" };
  const sheet = buildReviewRows([row], new Map([["z", { type: "undead" }]]));
  assert.equal(sheet.find((r) => r.id === "z").terrenos, "Pântano");
});
test("avatars and aspects of gods are manual-only in any book (PO, 22/11/2026)", () => {
  assert.equal(suggestEcology({ id: "ah", name: "Aspecto de Aharadak", type: "spirit", challengeRating: 10, role: "solo", source: { book: "Ameaças de Arton" } }).tags.manualOnly, true);
  const catalog = new Map([["ah", { type: "spirit", subtype: "lefeu", name: "Aspecto de Aharadak" }], ["dr", { type: "spirit", subtype: null, name: "Dríade" }]]);
  const out = applyPoRules([
    { id: "ah", terrenos: "Montanha", so_manual: "", citacao: "" },
    { id: "dr", terrenos: "Floresta", so_manual: "", citacao: "" },
  ], catalog);
  assert.equal(out[0].so_manual, "sim");
  assert.equal(out[0].terrenos, "Montanha");
  assert.equal(out[1].so_manual, "");
});

test("Bestiário de Arton has complete, unique sheets with ecology and PDF references", () => {
  const book = "Bestiário de Arton";
  const creatures = creatureCatalog.filter(creature => creature.source?.book === book);
  assert.equal(creatures.length, 181);
  assert.equal(new Set(creatureCatalog.map(creature => creature.id)).size, creatureCatalog.length);
  for (const creature of creatures) {
    assert.equal(creature.source.pdfPage, creature.source.bookPage + 4, creature.id);
    assert.ok(creature.source.pdfPage >= 23 && creature.source.pdfPage <= 177, creature.id);
    assert.ok(Number.isFinite(creature.stats.hitPoints) || creature.stats.hitPointsText === "—", creature.id);
    assert.ok(Object.hasOwn(ecologyByCreatureId, creature.id), creature.id);
    assert.equal(creature.roleSource, "pdf-review", creature.id);
  }
  assert.equal(getCreatureById("abelha-grifo").stats.hitPoints, 38);
  assert.equal(getCreatureById("anciao-das-rochas").challengeRating, 8);
  const aspects = creatures.filter(creature => creature.name.startsWith("Aspecto "));
  assert.ok(aspects.length > 0);
  assert.ok(aspects.every(creature => creature.ecology.manualOnly));
  assert.equal(getCreatureById("o-profano").ecology.manualOnly, true);
});

test("draft habitat confidence uses independent evidence from the same sentence", () => {
  const creature = { name: "Sentinela", type: "construct", challengeRating: 1, role: "solo" };
  assert.deepEqual(suggestEcology({
    ...creature, description: "Nunca foge. Vive em florestas."
  }).tags.terrains, ["floresta"]);
  assert.equal(suggestEcology({ ...creature, description: "Vive em florestas." }).confidence, "media");
  assert.equal(suggestEcology({ ...creature, description: "Vive em florestas e bebe água." }).confidence, "media");
});
