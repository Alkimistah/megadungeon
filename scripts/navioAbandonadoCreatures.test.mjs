import assert from "node:assert/strict";
import test from "node:test";
import { getAutomaticCreatureCatalog, getCreatureById } from "../src/creatureCatalog/index.js";

test("Passageiro da Última Viagem usa a ficha regional de guardião ND 9", () => {
  const base = getCreatureById("vampiro-fidalgo");
  const passenger = getCreatureById("vampiro-passageiro-da-ultima-viagem");

  assert.ok(passenger);
  assert.equal(passenger.source.book, "Masmorra de Práxis");
  assert.equal(passenger.regionalVariantOf, base.id);
  assert.equal(passenger.challengeRating, 9);
  assert.equal(passenger.role, "solo");
  assert.equal(passenger.size, "Médio");
  const { defense, hitPoints, fortitude, reflex, will } = passenger.stats;
  assert.deepEqual({ defense, hitPoints, fortitude, reflex, will }, {
    defense: 34, hitPoints: 360, fortitude: 9, reflex: 21, will: 15
  });
  assert.equal(passenger.actions[0].text, "Espada longa +27 (1d8+20, 18, mais 2d10 trevas) e garra +27 (1d8+20 mais 2d10 trevas).");

  for (const original of base.abilities) {
    const adaptation = passenger.abilities.find(ability => ability.name === original.name);
    assert.deepEqual(adaptation, { ...original, text: original.text.replace("CD 26", "CD 28") });
  }
  assert.equal(passenger.ecology.manualOnly, true);
  assert.ok(!getAutomaticCreatureCatalog().includes(passenger));
  assert.ok(!getAutomaticCreatureCatalog({}, [passenger]).includes(passenger));
});
