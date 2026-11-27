import assert from "node:assert/strict";
import test from "node:test";
import { archipelago21to30Profile as profile } from "../src/floorProfiles/archipelago21to30.js";
import { getAutomaticCreatureCatalog, getCreatureById } from "../src/creatureCatalog/index.js";
import { getThreatParameters } from "../src/threatCreationRules.js";

// Versões de guardião: ficha base elevada pela tabela solo do livro, como o Corgann das Duas Marés.
const versions = [
  ["lula-rainha-do-recife", "lula-gigante", 8],
  ["senhora-das-estatuas", "gorgona", 9],
  ["o-sineiro", "fantasma", 8],
  ["capitao-dos-ossos", "amalgama-esqueleto", 8],
  ["primeiro-naufrago", "afogado", 8],
  ["capitao-do-leilao", "capitao-do-conclave-pirata", 9],
  ["ogro-da-quilha", "ogro-das-sanguinarias", 9],
  ["regente-das-brasas", "salamandra-nobre", 9]
];

const counts = { duas: 2, dois: 2, três: 3, quatro: 4 };

function attackBonuses(actions) {
  return actions.flatMap(({ text }) => [...text.matchAll(/\+(\d+)(?: x\d+)? \(/g)].map(match => Number(match[1])));
}

// Dano médio por rodada de uma linha de ação (soma dos ataques e dos dados extras).
function averageRoundDamage(text) {
  let total = 0;
  for (const [, prefix, suffix, damage] of text.matchAll(/([^()]*?)\+\d+(?: x(\d+))? \(([^)]*)\)/g)) {
    const word = prefix.trim().split(/\s+/)[0]?.toLowerCase();
    const times = Number(suffix ?? prefix.match(/x(\d+)\s*$/)?.[1] ?? counts[word] ?? 1);
    const average = [...damage.matchAll(/(\d+)d(\d+)(?:\+(\d+))?/g)]
      .reduce((sum, [, dice, sides, bonus]) => sum + Number(dice) * (Number(sides) + 1) / 2 + Number(bonus ?? 0), 0);
    total += times * average;
  }
  return total;
}

const withDc = (text, dc) => text.replace(/CD (\d+)/g, (match, value) => `CD ${Math.max(Number(value), dc)}`);

test("as versões de guardião sobem até a tabela solo e mantêm a ficha base", () => {
  for (const [id, baseId, challengeRating] of versions) {
    const version = getCreatureById(id);
    const base = getCreatureById(baseId);
    const table = getThreatParameters("solo", challengeRating);
    assert.ok(version, id);
    assert.equal(version.challengeRating, challengeRating, id);
    assert.equal(version.role, "solo", id);
    assert.equal(version.roleSource, "adaptacao-nd", id);
    assert.equal(version.regionalVariantOf, baseId, id);
    assert.equal(version.source.book, "Masmorra de Práxis", id);
    assert.equal(version.type, base.type, id);
    assert.equal(version.size, base.size, id);
    const credit = version.description.join(" ");
    assert.ok(credit.includes(`Adaptação de ${base.name}, ${base.source.book} p. ${base.source.bookPage}`), id);

    const { hitPoints, defense, fortitude, reflex, will } = version.stats;
    assert.ok(hitPoints >= table.hitPoints && hitPoints >= base.stats.hitPoints, `${id}: PV ${hitPoints}`);
    assert.ok(defense >= table.defense && defense >= base.stats.defense, `${id}: Defesa ${defense}`);
    for (const save of ["fortitude", "reflex", "will"]) assert.ok(version.stats[save] >= base.stats[save], `${id}: ${save}`);
    const [strong, medium, weak] = [fortitude, reflex, will].sort((a, b) => b - a);
    assert.ok(strong >= table.saves.strong && medium >= table.saves.medium && weak >= table.saves.weak, `${id}: resistências`);
    assert.deepEqual({ ...version.stats, hitPoints: 0, defense: 0, fortitude: 0, reflex: 0, will: 0 },
      { ...base.stats, hitPoints: 0, defense: 0, fortitude: 0, reflex: 0, will: 0 }, id);

    assert.deepEqual(version.actions.map(({ name }) => name), base.actions.map(({ name }) => name), id);
    const bonuses = attackBonuses(version.actions);
    assert.equal(bonuses.length, attackBonuses(base.actions).length, id);
    assert.ok(bonuses.every(bonus => bonus >= table.attack), `${id}: ataque ${bonuses}`);
    const damage = Math.max(...version.actions.map(({ text }) => averageRoundDamage(text)));
    const baseDamage = Math.max(...base.actions.map(({ text }) => averageRoundDamage(text)));
    assert.ok(damage >= table.averageDamage && damage >= baseDamage, `${id}: dano médio ${damage}`);

    assert.equal(version.abilities.length, base.abilities.length, id);
    for (const ability of base.abilities) {
      const adapted = version.abilities.find(({ name }) => name === ability.name);
      assert.deepEqual(adapted, { ...ability, text: withDc(ability.text, table.abilityDc) }, `${id}: ${ability.name}`);
    }
  }
});

test("as versões de guardião ficam fora do sorteio global", () => {
  const globalIds = new Set(getAutomaticCreatureCatalog().map(creature => creature.id));
  const ecologyIds = new Set(getAutomaticCreatureCatalog(profile).map(creature => creature.id));
  for (const [id, baseId] of versions) {
    assert.ok(getCreatureById(id), id);
    assert.ok(globalIds.has(baseId) || ecologyIds.has(baseId), baseId);
    assert.ok(!globalIds.has(id), id);
    assert.ok(!ecologyIds.has(id), id);
  }
});
