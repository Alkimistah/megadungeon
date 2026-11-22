import test from "node:test";
import assert from "node:assert/strict";
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
  const sample = creatureCatalog.find((c) => !ecologyByCreatureId[c.id]);
  assert.deepEqual(sample.ecology, NEUTRAL_ECOLOGY);
  assert.deepEqual(getCreatureEcology("nao-existe"), NEUTRAL_ECOLOGY);
});

// ---- Tarefa 2: rascunho automático ----
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
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
