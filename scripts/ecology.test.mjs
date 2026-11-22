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
