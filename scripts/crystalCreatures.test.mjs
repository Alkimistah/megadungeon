import assert from "node:assert/strict";
import test from "node:test";
import { archipelago21to30Profile as profile } from "../src/floorProfiles/archipelago21to30.js";
import { getAutomaticCreatureCatalog, getCreatureById } from "../src/creatureCatalog/index.js";

test("Escorpião de Cristal tem ficha própria e tesouro de gemas", () => {
  const creature = getCreatureById("escorpiao-de-cristal");

  assert.ok(creature);
  assert.equal(creature.source.book, "Masmorra de Práxis");
  assert.equal(creature.role, "solo");
  assert.equal(creature.challengeRating, 4);
  assert.equal(creature.stats.hitPoints, 140);
  assert.match(creature.actions[0].text, /Pinças \+16 \(2d6\+6\) e ferrão \+16 \(1d10\+5\)/);
  assert.match(creature.abilities.find(ability => ability.name === "Ferrão Farpado").text, /lento.*Fortitude CD 18/);
  assert.match(creature.abilities.find(ability => ability.name === "Carapaça Cristalina").text, /5.*exceto impacto/);
  assert.match(creature.abilities.find(ability => ability.name === "Feito de Cristal").text, /1 ponto de dano adicional por dado de dano de impacto/);
  assert.equal(creature.treasure, "Riquezas Menores. O Escorpião de Cristal possui 1d4 gemas em seu corpo.");
});

test("Centopeia Solar tem ficha própria, imunidade a fogo e aura condicionada à luz", () => {
  const creature = getCreatureById("centopeia-solar");

  assert.ok(creature);
  assert.equal(creature.source.book, "Masmorra de Práxis");
  assert.equal(creature.role, "solo");
  assert.equal(creature.challengeRating, 9);
  assert.equal(creature.stats.hitPoints, 360);
  assert.match(creature.stats.defensesText, /imunidade a fogo/);
  assert.match(creature.actions[0].text, /\+27 \(2d10\+26 mais 2d6 de fogo\)/);
  const aura = creature.abilities.find(ability => ability.name === "Aura de Calor");
  assert.match(aura.text, /Enquanto estiver em uma zona iluminada pelo sol/);
  assert.match(aura.text, /início de cada turno dela, todas as criaturas em alcance curto sofrem 6d6\+9.*Reflexos CD 28 reduz à metade/);
  assert.match(creature.abilities.find(ability => ability.name === "Engolir").text, /2d10\+26.*2d6 de fogo.*20 pontos de dano/);
  assert.equal(creature.treasure, "Padrão.");
});

test("sete variantes de Práxis conservam os parâmetros de combate de suas bases", () => {
  const globalIds = new Set(getAutomaticCreatureCatalog().map(({ id }) => id));
  const praxisOnlyIds = new Set(getAutomaticCreatureCatalog({
    ...profile, disabledCreatureBooks: ["Livro Básico", "Ameaças de Arton", "Bestiário de Arton"]
  }).map(({ id }) => id));
  for (const [id, baseId] of [
    ["besouros-facetados", "horda-de-ko-kabuto"],
    ["caranguejo-de-quartzo", "canceronte"],
    ["cocatriz-de-vidro", "cocatriz"],
    ["ganchador-das-fendas", "ganchador"],
    ["zangao-prismatico", "zangao-do-pesadelo"],
    ["bulette-de-geodo", "bulette"],
    ["geodo-vivo", "carrasco-oco"]
  ]) {
    const variant = getCreatureById(id);
    const base = getCreatureById(baseId);
    assert.ok(variant, id);
    assert.equal(variant.source.book, "Masmorra de Práxis");
    assert.equal(variant.regionalVariantOf, baseId);
    assert.ok(globalIds.has(baseId));
    assert.ok(!globalIds.has(id));
    assert.ok(!praxisOnlyIds.has(id));
    assert.equal(getAutomaticCreatureCatalog(profile, [variant])[0]?.id, id);
    assert.equal(variant.challengeRating, base.challengeRating);
    assert.equal(variant.role, base.role);
    assert.deepEqual(variant.stats, base.stats);
    assert.ok(!variant.abilities.some(({ name }) => name === "Feito de Cristal"));
  }
  assert.match(getCreatureById("cocatriz-de-vidro").abilities[0].text, /lenta por esta habilidade/);
  assert.match(getCreatureById("zangao-prismatico").abilities[0].text, /2d6\+8 de perfuração/);
  assert.match(getCreatureById("bulette-de-geodo").abilities[1].text, /4d6 pontos de dano de corte/);
});
