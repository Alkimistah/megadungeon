import assert from "node:assert/strict";
import test from "node:test";
import { generateMapData } from "../src/generator.js";
import { forest11to20Profile as profile } from "../src/floorProfiles/forest11to20.js";
import { createRng } from "../src/random.js";
import { canRerollNodeCreatures, rerollNodeCreatures, resolveForestAmbush, resolveNodeEncounter } from "../src/encounterResolver.js";
import { creatureCatalog, getCreatureById, getAutomaticCreatureCatalog, formatCreatureCatalogName } from "../src/creatureCatalog/index.js";
import { createNodeTacticalMap } from "../src/nodeTacticalMap.js";
import { calculateCombatND } from "../src/challenge.js";
import { createMissionGenerationContext, generateMissionOffers } from "../src/missions/missionGenerator.js";
import { createExplorationState } from "../src/appState.js";
import { createMissionState } from "../src/missions/missionState.js";
import { getEncounterMissionMatches } from "../src/missions/missionEncounterIntegration.js";
import { decodeSessionCode, encodeSessionCode } from "../src/sessionCode.js";
import { getForestTrapPresentation } from "../src/forestTrapPresentation.js";
import { isDamageType } from "../src/damageTypes.js";
import { withChimeraBreath, withChimeraDamage, withChimeraHealthUndone, withChimeraTurnEnded } from "../src/chimeraCombat.js";
import { getCreatureReinforcement, withCreatureReinforcement } from "../src/creatureReinforcement.js";
import { canAddEncounterCreature, getCreatureUnits, getEncounterForSave, hasEncounterAdjustments, withCreatureAdded, withCreatureHealthChange, withLastHealthChangeUndone } from "../src/encounterCreatureHealth.js";

const integration = await import("../src/missions/forestMissionIntegration.js").catch(() => ({}));
const expeditionModule = await import("../src/forestExpedition.js").catch(() => ({}));
const presentation = await import("../src/nodeProgressPresentation.js").catch(() => ({}));

test("Ameaças dragons cite the full PDF and show the complete Aura Aterradora", () => {
  const pages = {
    "dragao-filhote-do-bosque": [66, 64],
    "dragao-filhote-dos-rios": [66, 64, 67, 65],
    "ninhada-de-dragoes-filhotes": [67, 65],
    "dragao-jovem-da-protecao": [68, 66],
    "dragao-jovem-do-ocaso": [68, 66, 69, 67],
    "dragao-adulto-da-tirania": [70, 68, 71, 69],
    "dragao-adulto-dos-segredos": [71, 69],
    "dragao-veneravel-da-equidade": [73, 71],
    "dragao-veneravel-dos-recifes": [73, 71],
    "dragao-feral": [74, 72],
    "dragao-bicefalo": [76, 74],
    "sckhar-dragao-rei-do-fogo": [79, 77]
  };
  for (const [id, [pdfPage, bookPage, pdfPageEnd, bookPageEnd]] of Object.entries(pages)) {
    const [source] = getCreatureById(id).sources;
    assert.equal(source.pdfFile, "T20 Ameacas de Arton.pdf", id);
    assert.deepEqual(
      [source.pdfPage, source.bookPage, source.pdfPageEnd, source.bookPageEnd],
      [pdfPage, bookPage, pdfPageEnd, bookPageEnd],
      id
    );
  }

  const auraDcs = {
    "dragao-adulto-da-tirania": 32,
    "dragao-adulto-dos-segredos": 32,
    "dragao-feral": 30,
    "dragao-bicefalo": 33,
    "dragao-veneravel-da-equidade": 40,
    "dragao-veneravel-dos-recifes": 40,
    "sckhar-dragao-rei-do-fogo": 55
  };
  for (const [id, dc] of Object.entries(auraDcs)) {
    const aura = getCreatureById(id).abilities.find(ability => ability.name === "Aura Aterradora").text;
    assert.match(aura, /alcance longo do dragão fica apavorada .* ou abalada .* imune a esta habilidade por um dia/, id);
    assert.match(aura, new RegExp(`Vontade CD ${dc} evita\\.`), id);
  }
  assert.match(
    getCreatureById("sckhar-dragao-rei-do-fogo").abilities.find(ability => ability.name === "Aura Aterradora").text,
    /sofre 8d6 pontos de dano psíquico\.$/
  );
});

test("Duyshidakk sheets cite the full Ameaças PDF", () => {
  const pages = {
    "bugbear-sentinela": [81, 79],
    "bugbear-guarda-costas": [81, 79],
    "bruxa-goblin": [81, 79, 82, 80],
    "gangue-goblin": [82, 80, 83, 81],
    "horda-goblin": [83, 81],
    "goblin-bomba": [84, 82],
    "goblin-de-ferro": [84, 82, 85, 83],
    "goblin-de-ferro-mark-ii": [85, 83],
    "hobgoblin-atirador": [86, 84],
    "hobgoblin-comandante-tatico": [87, 85],
    "hobgoblin-gladiador": [87, 85],
    "sangue-do-ayrrak": [89, 87]
  };
  for (const [id, [pdfPage, bookPage, pdfPageEnd, bookPageEnd]] of Object.entries(pages)) {
    const [source] = getCreatureById(id).sources;
    assert.equal(source.pdfFile, "T20 Ameacas de Arton.pdf", id);
    assert.equal(source.edition, "1ª edição, novembro de 2023", id);
    assert.deepEqual(
      [source.pdfPage, source.bookPage, source.pdfPageEnd, source.bookPageEnd],
      [pdfPage, bookPage, pdfPageEnd, bookPageEnd],
      id
    );
  }
});

test("Ameaças elemental sheets cite the full PDF without redundant excerpts", () => {
  const pages = {
    aquinne: [91, 89],
    corgann: [91, 89, 92, 90],
    namasqall: [93, 91],
    "t-peel": [94, 92],
    rarvnaak: [94, 92, 95, 93],
    "hallus-tir": [96, 94],
    pakk: [96, 94, 97, 95],
    "ber-baram": [97, 95],
    serpentaar: [98, 96],
    terrier: [99, 97],
    pamgra: [100, 98],
    "bando-de-pamgras": [100, 98],
    tanaloom: [101, 99],
    "elemental-corrompido": [103, 101]
  };
  for (const [id, [pdfPage, bookPage, pdfPageEnd, bookPageEnd]] of Object.entries(pages)) {
    assert.deepEqual(getCreatureById(id).sources, [{
      book: "Ameaças de Arton",
      edition: "1ª edição, novembro de 2023",
      pdfFile: "T20 Ameacas de Arton.pdf",
      pdfPage,
      bookPage,
      ...(pdfPageEnd ? { pdfPageEnd, bookPageEnd } : {})
    }], id);
  }
});

test("Ameaças wilderness sheets cite the full PDF without redundant excerpts", () => {
  const pages = {
    bulette: [105, 103],
    "carrasco-de-lena": [106, 104],
    "centauro-chefe": [107, 105],
    "xama-de-megalokk": [107, 105, 108, 106],
    ente: [108, 106, 109, 107],
    estirge: [109, 107, 110, 108],
    "enxame-estirge": [110, 108],
    "nuvem-de-estirges": [110, 108],
    "fera-vassalo": [110, 108, 111, 109],
    "fera-lider": [111, 109],
    "fera-mae": [111, 109],
    "lagarto-perseguidor": [112, 110],
    tendriculo: [113, 111],
    rhandomm: [115, 113]
  };
  for (const [id, [pdfPage, bookPage, pdfPageEnd, bookPageEnd]] of Object.entries(pages)) {
    assert.deepEqual(getCreatureById(id).sources, [{
      book: "Ameaças de Arton",
      edition: "1ª edição, novembro de 2023",
      pdfFile: "T20 Ameacas de Arton.pdf",
      pdfPage,
      bookPage,
      ...(pdfPageEnd ? { pdfPageEnd, bookPageEnd } : {})
    }], id);
  }
});

test("Ameaças gnoll sheets cite the full PDF without redundant excerpts", () => {
  const pages = {
    "gnoll-cacador-de-cabecas": [116, 114, 117, 115],
    "gnoll-capanga": [117, 115, 118, 116],
    "gnoll-saqueador": [118, 116],
    "gnoll-filibusteiro": [118, 116],
    "gnoll-lider-de-alcateia": [119, 117],
    "gnoll-xama-de-allihanna": [120, 118],
    "gnoll-xama-de-megalokk": [121, 119],
    "gnoll-xama-de-marah": [121, 119],
    hiena: [122, 120],
    "hiena-rainha": [122, 120],
    hienodonte: [122, 120],
    "matrona-gnoll": [123, 121],
    "gnoll-vuul-rak": [124, 122]
  };
  for (const [id, [pdfPage, bookPage, pdfPageEnd, bookPageEnd]] of Object.entries(pages)) {
    assert.deepEqual(getCreatureById(id).sources, [{
      book: "Ameaças de Arton",
      edition: "1ª edição, novembro de 2023",
      pdfFile: "T20 Ameacas de Arton.pdf",
      pdfPage,
      bookPage,
      ...(pdfPageEnd ? { pdfPageEnd, bookPageEnd } : {})
    }], id);
  }
});

test("Gnoll Saqueador keeps its original default and has a distinct Livro Básico sheet", () => {
  const original = getCreatureById("gnoll-saqueador");
  const variant = getCreatureById("gnoll-saqueador-livro-basico");
  assert.ok(variant);
  assert.equal(variant.variantOf, original.id);
  assert.deepEqual(variant.stats, original.stats);
  assert.deepEqual(variant.actions, original.actions);
  assert.equal(variant.equipment, original.equipment);
  assert.deepEqual(variant.sources, [{
    book: "Livro Básico",
    edition: "Jogo do Ano · 2ª edição, setembro de 2022",
    pdfFile: "T20 - Livro Básico - Jogo do Ano.pdf",
    bookPage: 290,
    pdfPage: 296
  }]);
  assert.equal(formatCreatureCatalogName(original), "Gnoll Saqueador · Ameaças de Arton");
  assert.equal(formatCreatureCatalogName(variant), "Gnoll Saqueador · Livro Básico");
  const matchingIds = selectedProfile => getAutomaticCreatureCatalog(selectedProfile)
    .filter(creature => creature.id === original.id || creature.variantOf === original.id)
    .map(creature => creature.id);
  assert.deepEqual(matchingIds(profile), [original.id]);
  assert.deepEqual(matchingIds({
    ...profile,
    creatureRules: { ...profile.creatureRules, preferredCreatureIdsByFamily: { [original.id]: variant.id } }
  }), [variant.id]);
});

test("Ameaças golem sheets cite the full PDF without redundant excerpts", () => {
  const pages = {
    gargula: 127,
    "gargula-assassina": 127,
    "golem-de-barro": 128,
    "golem-de-bronze": 129,
    "golem-de-carne": 129,
    "golem-de-espelhos": 130,
    "golem-de-ferro": 132,
    "golem-de-ferro-superior": 132,
    "golem-de-materia-vermelha": 133,
    "golem-de-pedra": 134,
    "soldado-mecanico": 135,
    "instrumento-divino": 135
  };
  for (const [id, pdfPage] of Object.entries(pages)) {
    assert.deepEqual(getCreatureById(id).sources, [{
      book: "Ameaças de Arton",
      edition: "1ª edição, novembro de 2023",
      pdfFile: "T20 Ameacas de Arton.pdf",
      pdfPage,
      bookPage: pdfPage - 2
    }], id);
  }
});

test("Gárgula and Golem de Ferro keep their original defaults and separate Livro Básico versions", () => {
  const variants = [["gargula", 287], ["golem-de-ferro", 288]];
  for (const [id, bookPage] of variants) {
    const original = getCreatureById(id);
    const variant = getCreatureById(`${id}-livro-basico`);
    assert.ok(variant, id);
    assert.equal(variant.variantOf, id);
    assert.equal(variant.challengeRating, original.challengeRating);
    assert.deepEqual(variant.actions, original.actions);
    assert.deepEqual(variant.stats.attributes, original.stats.attributes);
    assert.deepEqual(variant.sources, [{
      book: "Livro Básico",
      edition: "Jogo do Ano · 2ª edição, setembro de 2022",
      pdfFile: "T20 - Livro Básico - Jogo do Ano.pdf",
      bookPage,
      pdfPage: bookPage + 6
    }]);
    assert.equal(formatCreatureCatalogName(original), `${original.name} · Ameaças de Arton`);
    assert.equal(formatCreatureCatalogName(variant), `${original.name} · Livro Básico`);
    const matchingIds = selectedProfile => getAutomaticCreatureCatalog(selectedProfile)
      .filter(creature => creature.id === id || creature.variantOf === id)
      .map(creature => creature.id);
    assert.deepEqual(matchingIds(profile), [id]);
    assert.deepEqual(matchingIds({
      ...profile,
      creatureRules: { ...profile.creatureRules, preferredCreatureIdsByFamily: { [id]: variant.id } }
    }), [variant.id]);
  }
  assert.match(getCreatureById("gargula-livro-basico").stats.defensesText, /condição petrificado/);
  const basicIronGolem = getCreatureById("golem-de-ferro-livro-basico");
  assert.match(basicIronGolem.abilities.find(ability => ability.name === "Sopro").text, /cubo de 3m de lado/);
});

test("Ameaças Arsenal sheets cite the full PDF and their complete page ranges", () => {
  const pages = [
    ["coletor-de-arsenal", 139], ["forjador-liturgico", 139],
    ["concilio-forjador", 140], ["guerreiro-perpetuo", 141],
    ["kishin", 142], ["capelao-de-guerra", 143], ["bispo-de-guerra", 143],
    ["kishinauros", 144, 145]
  ];
  for (const [id, pdfPage, pdfPageEnd] of pages) {
    assert.deepEqual(getCreatureById(id).sources, [{
      book: "Ameaças de Arton",
      edition: "1ª edição, novembro de 2023",
      pdfFile: "T20 Ameacas de Arton.pdf",
      pdfPage,
      bookPage: pdfPage - 2,
      ...(pdfPageEnd ? { pdfPageEnd, bookPageEnd: pdfPageEnd - 2 } : {})
    }], id);
  }
});

test("Capelão de Guerra versions preserve source-specific abilities and the automatic default", () => {
  const original = getCreatureById("capelao-de-guerra");
  const basic = getCreatureById("capelao-de-guerra-livro-basico");
  assert.ok(basic);
  assert.equal(basic.variantOf, original.id);
  assert.equal(basic.challengeRating, original.challengeRating);
  assert.deepEqual(basic.stats, original.stats);
  assert.deepEqual(basic.actions, original.actions);
  assert.deepEqual(basic.sources, [{
    book: "Livro Básico",
    edition: "Jogo do Ano · 2ª edição, setembro de 2022",
    pdfFile: "T20 - Livro Básico - Jogo do Ano.pdf",
    bookPage: 295,
    pdfPage: 301
  }]);
  assert.equal(formatCreatureCatalogName(original), "Capelão de Guerra · Ameaças de Arton");
  assert.equal(formatCreatureCatalogName(basic), "Capelão de Guerra · Livro Básico");
  const ability = (creature, name) => creature.abilities.find(item => item.name === name);
  assert.ok(ability(original, "Ódio Puro"));
  assert.equal(ability(basic, "Ódio Puro"), undefined);
  assert.match(ability(original, "Magias").text, /de Arsenal.*limite de PM 5/);
  assert.match(ability(basic, "Magias").text, /clérigo de 5º nível \(CD 18\)\./);
  assert.match(ability(original, "Arma Mágica").text, /Até o fim da cena, uma arma adjacente/);
  assert.match(ability(basic, "Arma Mágica").text, /Uma arma do capelão/);
  assert.match(ability(original, "Soco de Arsenal").text, /5d6\+4/);
  assert.match(ability(basic, "Soco de Arsenal").text, /5d6\+5/);
  const familyIds = selectedProfile => getAutomaticCreatureCatalog(selectedProfile)
    .filter(creature => creature.id === original.id || creature.variantOf === original.id)
    .map(creature => creature.id);
  assert.deepEqual(familyIds(profile), [original.id]);
  assert.deepEqual(familyIds({
    ...profile,
    creatureRules: { ...profile.creatureRules, preferredCreatureIdsByFamily: { [original.id]: basic.id } }
  }), [basic.id]);
});

test("Kishinauros includes the death immunity threshold and the space crossed by its trample", () => {
  const { abilities } = getCreatureById("kishinauros");
  const text = name => abilities.find(ability => ability.name === name).text;
  assert.match(text("Maior que a Morte"), /pelo menos metade dos PV.*imune a efeitos de morte instantânea/);
  assert.match(text("Maior que a Morte"), /perda de PV.*0 PV/);
  assert.match(text("Titânico"), /atravessando seu espaço/);
});

test("Ameaças Kallyadranoch sheets cite the full PDF and their complete page ranges", () => {
  const pages = [
    ["cavaleiro-de-kally", 146, 147],
    ["acolito-de-kally", 148], ["clerigo-de-kally", 148], ["alto-clerigo-de-kally", 148, 149],
    ["corcel-de-kally", 150],
    ["dracomante", 151], ["dracomante-superior", 151],
    ["kallyanach-barbaro", 152], ["kallyanach-morte-glacial", 152],
    ["avatar-de-kallyadranoch", 155]
  ];
  for (const [id, pdfPage, pdfPageEnd] of pages) {
    assert.deepEqual(getCreatureById(id).sources, [{
      book: "Ameaças de Arton",
      edition: "1ª edição, novembro de 2023",
      pdfFile: "T20 Ameacas de Arton.pdf",
      pdfPage,
      bookPage: pdfPage - 2,
      ...(pdfPageEnd ? { pdfPageEnd, bookPageEnd: pdfPageEnd - 2 } : {})
    }], id);
  }
});

test("Ameaças Avatar de Kallyadranoch shows the complete dragon aura and death immunity", () => {
  const avatar = getCreatureById("avatar-de-kallyadranoch");
  const { text: aura } = avatar.abilities.find(ability => ability.name === "Aura Aterradora");
  assert.match(aura, /comece seu turno em alcance longo.*apavorada.*4 níveis ou menos.*abalada.*5 níveis ou mais.*fim da cena/);
  assert.match(aura, /imune a esta habilidade por um dia/);
  assert.match(aura, /Vontade CD 51 evita/);
  const { text: greaterThanDeath } = avatar.abilities.find(ability => ability.name === "Maior que a Morte");
  assert.match(greaterThanDeath, /pelo menos metade dos PV.*imune a efeitos de morte instantânea/);
  assert.match(greaterThanDeath, /perda de PV.*0 PV/);
});

test("Ameaças Império de Jade sheets cite the full PDF and their complete page ranges", () => {
  const pages = [
    ["chibi-kabuto", 156], ["ko-kabuto", 156, 157], ["horda-de-ko-kabuto", 157], ["dai-kabuto", 157],
    ["kaijin-capanga", 158], ["kaijin-bruto", 159], ["kaijin-ninja", 159, 160],
    ["kappa-brigao", 161], ["kappa-yokozuna", 161],
    ["mashin-monge", 162], ["mashin-samurai", 162],
    ["nezumi-capanga", 163], ["nezumi-ninja", 163], ["nezumi-brutamontes", 164],
    ["oni", 164], ["aka-oni", 165],
    ["tengu-bandoleiro", 166], ["daitengu", 166, 167],
    ["dragao-celestial-jovem", 167], ["dragao-celestial-adulto", 168], ["dragao-celestial-veneravel", 168, 169]
  ];
  for (const [id, pdfPage, pdfPageEnd] of pages) {
    assert.deepEqual(getCreatureById(id).sources, [{
      book: "Ameaças de Arton",
      edition: "1ª edição, novembro de 2023",
      pdfFile: "T20 Ameacas de Arton.pdf",
      pdfPage,
      bookPage: pdfPage - 2,
      ...(pdfPageEnd ? { pdfPageEnd, bookPageEnd: pdfPageEnd - 2 } : {})
    }], id);
  }
});

test("Ameaças Império de Tauron sheets cite the full PDF", () => {
  const pages = [
    ["arqueiro-escravo", 170],
    ["centuriao", 172], ["centuriao-de-elite", 172], ["furia-de-tauron", 172], ["estouro-de-furias-de-tauron", 173],
    ["gladiador-taurico", 174], ["legionario", 175], ["decuria", 175], ["legionario-insano", 176],
    ["minauro-arcanista", 177], ["minauro-ladino", 177], ["governador-corrupto", 179]
  ];
  for (const [id, pdfPage] of pages) {
    assert.deepEqual(getCreatureById(id).sources, [{
      book: "Ameaças de Arton",
      edition: "1ª edição, novembro de 2023",
      pdfFile: "T20 Ameacas de Arton.pdf",
      pdfPage,
      bookPage: pdfPage - 2
    }], id);
  }
});

test("Ameaças kobold sheets cite the full PDF", () => {
  const pages = [
    ["cao-de-kally", 181], ["enxame-larval", 182],
    ["kobold-patrulheiro", 183], ["kobold-veterano", 183], ["patrulha-kobold", 183],
    ["kobold-bruto", 186], ["kobold-explosivo", 187], ["kobold-xama", 188], ["kobold-mae", 189],
    ["vagalhao-kobold", 191]
  ];
  for (const [id, pdfPage] of pages) {
    assert.deepEqual(getCreatureById(id).sources, [{
      book: "Ameaças de Arton",
      edition: "1ª edição, novembro de 2023",
      pdfFile: "T20 Ameacas de Arton.pdf",
      pdfPage,
      bookPage: pdfPage - 2
    }], id);
  }
});

test("kobold sheets show the optional explosive variant", () => {
  const explosive = {
    "kobold-patrulheiro": ["4d6", 13], "enxame-larval": ["4d6", 14], "kobold-veterano": ["4d6", 16],
    "kobold-xama": ["4d6", 19], "kobold-bruto": ["4d6", 18], "patrulha-kobold": ["4d6", 18], "kobold-mae": ["8d6", 35]
  };
  for (const [id, [damage, dc]] of Object.entries(explosive)) {
    const { text } = getCreatureById(id).abilities.find(ability => ability.name === "Detonação Final (opcional)") ?? {};
    assert.ok(text, id);
    assert.match(text, /Qualquer Kobold Pode Explodir, p\. 185/, id);
    assert.match(text, /ND aumenta em \+1 apenas para efeitos de experiência/, id);
    assert.match(text, new RegExp(`sofrem ${damage} pontos de dano de impacto \\(Ref CD ${dc} reduz à metade\\)`), id);
  }
  assert.equal(getCreatureById("kobold-explosivo").abilities.filter(ability => /^Detonação Final/.test(ability.name)).length, 1);
  assert.equal(getCreatureById("kobold-bruto").role, "solo");
  assert.equal(getCreatureById("kobold-mae").role, "special");
});

test("Ameaças dungeon sheets cite the full PDF and use their printed roles", () => {
  const pages = [
    ["asa-assassina", 200, 201, "minion"], ["cocatriz", 201, null, "solo"], ["cocatriz-real", 202, null, "solo"],
    ["harpia-saqueadora", 202, 203, "minion"], ["glop", 203, null, "minion"], ["glooop", 204, null, "solo"],
    ["mamae-glop", 204, null, "solo"], ["mantor", 205, null, "solo"], ["mimico", 206, null, "solo"],
    ["quimera", 206, 207, "solo"], ["slark", 208, null, "minion"], ["tigre-de-hyninn", 209, null, "solo"],
    ["tigre-de-hyninn-primordial", 209, null, "solo"], ["brawar", 210, null, "solo"]
  ];
  const basicBookPages = { glop: 292 };
  for (const [id, pdfPage, pdfPageEnd, role] of pages) {
    const creature = getCreatureById(id);
    assert.deepEqual(creature.sources[0], {
      book: "Ameaças de Arton",
      edition: "1ª edição, novembro de 2023",
      pdfFile: "T20 Ameacas de Arton.pdf",
      pdfPage,
      bookPage: pdfPage - 2,
      ...(pdfPageEnd ? { pdfPageEnd, bookPageEnd: pdfPageEnd - 2 } : {})
    }, id);
    assert.deepEqual(creature.sources.slice(1).map(source => [source.book, source.pdfPage]),
      basicBookPages[id] ? [["Livro Básico", basicBookPages[id]]] : [], id);
    assert.equal(creature.role, role, id);
  }
});

test("creature sheets leave out player-side partner and familiar rules", () => {
  for (const creature of creatureCatalog) {
    const names = (creature.abilities ?? []).map(ability => ability.name);
    assert.equal(names.some(name => /^(Parceiro|Familiar)\b/.test(name)), false, creature.id);
  }
  const roles = {
    hiena: "minion", hienodonte: "minion", "chibi-kabuto": "solo", "ko-kabuto": "solo", "dai-kabuto": "solo",
    "asa-assassina": "minion", aquinne: "minion", terrier: "solo", "t-peel": "minion", pakk: "minion", stagh: "minion",
    cocatriz: "solo", bulette: "solo", "cao-de-kally": "minion", "kobold-bruto": "solo", "corcel-de-kally": "solo",
    "sapo-atroz": "solo", estirge: "minion", "kobold-patrulheiro": "minion", "kobold-veterano": "minion",
    "kobold-explosivo": "minion", "kobold-xama": "special", "cocatriz-real": "solo", tigre: "solo"
  };
  for (const [id, role] of Object.entries(roles)) assert.equal(getCreatureById(id).role, role, id);
  assert.match(getCreatureById("pteros-ceifador").abilities.find(ability => ability.name === "Companheiros de Voo").text, /flanqueando/);
  assert.match(getCreatureById("cavaleiro-de-kally").abilities.find(ability => ability.name === "Ginete de Corcel de Kally").text, /corcel de Kally/);
});

test("Ameaças mount sheets cite the full PDF", () => {
  const pages = [
    ["baleote", 213], ["capivara", 213], ["cavalo-de-carga", 214], ["cavalo-de-montaria", 214], ["cavalo-de-guerra", 214, 215],
    ["cavalo-de-namalkah", 215], ["cavalo-glacial", 216], ["corcel-do-deserto", 217], ["dromedario", 217], ["elefante", 218],
    ["gorlogg", 219], ["gorlogg-alfa", 219], ["leao", 220], ["pantera", 220], ["tigre", 220],
    ["rinoceronte", 221], ["rinoceronte-lanoso", 221], ["brontoterio", 221], ["tatu-montanha", 222], ["trobo", 223],
    ["tumarkhan", 224], ["urso-panda", 225], ["urso-pardo", 225], ["urso-das-cavernas", 226], ["warg", 227], ["unicornio", 229]
  ];
  for (const [id, pdfPage, pdfPageEnd] of pages) {
    assert.deepEqual(getCreatureById(id).sources, [{
      book: "Ameaças de Arton",
      edition: "1ª edição, novembro de 2023",
      pdfFile: "T20 Ameacas de Arton.pdf",
      pdfPage,
      bookPage: pdfPage - 2,
      ...(pdfPageEnd ? { pdfPageEnd, bookPageEnd: pdfPageEnd - 2 } : {})
    }], id);
  }
});

test("Gorlogg keeps the Ameaças default and has a distinct Livro Básico sheet", () => {
  const original = getCreatureById("gorlogg");
  const variant = getCreatureById("gorlogg-livro-basico");
  assert.equal(variant.variantOf, "gorlogg");
  assert.equal(original.stats.attributes.cha, -4);
  assert.equal(variant.stats.attributes.cha, -2);
  assert.deepEqual({ ...variant.stats.attributes, cha: -4 }, original.stats.attributes);
  assert.deepEqual(variant.actions, original.actions);
  assert.match(variant.abilities.find(ability => ability.name === "Agarrar Aprimorado").text, /Se o gorlogg acerta um ataque de mordida, pode usar a manobra agarrar \(teste \+13\)/);
  assert.deepEqual(variant.sources, [{
    book: "Livro Básico",
    edition: "Jogo do Ano · 2ª edição, setembro de 2022",
    pdfFile: "T20 - Livro Básico - Jogo do Ano.pdf",
    bookPage: 291,
    pdfPage: 297
  }]);
  assert.equal(formatCreatureCatalogName(original), "Gorlogg · Ameaças de Arton");
  assert.equal(formatCreatureCatalogName(variant), "Gorlogg · Livro Básico");
  const matchingIds = selectedProfile => getAutomaticCreatureCatalog(selectedProfile)
    .filter(creature => creature.id === "gorlogg" || creature.variantOf === "gorlogg")
    .map(creature => creature.id);
  assert.deepEqual(matchingIds(profile), ["gorlogg"]);
  assert.deepEqual(matchingIds({
    ...profile,
    creatureRules: { ...profile.creatureRules, preferredCreatureIdsByFamily: { gorlogg: variant.id } }
  }), [variant.id]);
});

test("Ameaças undead sheets cite the full PDF", () => {
  const pages = [
    ["carnical", 231], ["lacedon", 231], ["cavalo-esqueleto", 231], ["ogro-esqueleto", 231],
    ["urso-pardo-esqueleto", 232], ["gigante-esqueleto", 232], ["mamute-esqueleto", 232],
    ["hidra-esqueleto", 233], ["rei-tirano-esqueleto", 233], ["fantasma", 234], ["fantasma-ancestral", 234],
    ["garra-zumbi", 236], ["garra-zumbi-ogro", 236], ["garra-zumbi-enxame", 236], ["garra-zumbi-gigante", 236],
    ["livido", 237], ["mortalha", 238], ["mumia", 238], ["senhor-das-mumias", 239, 240],
    ["necrodraco-esqueleto", 240], ["necrodraco-zumbi", 240, 241], ["necrodraco-lich", 241], ["tarso-dragao-rei-dos-mortos", 243]
  ];
  for (const [id, pdfPage, pdfPageEnd] of pages) {
    assert.deepEqual(getCreatureById(id).sources, [{
      book: "Ameaças de Arton",
      edition: "1ª edição, novembro de 2023",
      pdfFile: "T20 Ameacas de Arton.pdf",
      pdfPage,
      bookPage: pdfPage - 2,
      ...(pdfPageEnd ? { pdfPageEnd, bookPageEnd: pdfPageEnd - 2 } : {})
    }], id);
  }
});

test("Necrodraco Lich and Tarso show the complete dragon aura and Tarso the death immunity threshold", () => {
  const ability = (id, name) => getCreatureById(id).abilities.find(entry => entry.name === name).text;
  for (const [id, dc] of [["necrodraco-lich", 53], ["tarso-dragao-rei-dos-mortos", 55]]) {
    const aura = ability(id, "Aura Aterradora");
    assert.match(aura, /comece seu turno em alcance longo do dragão fica apavorada .* ou abalada .* até o fim da cena/, id);
    assert.match(aura, /imune a esta habilidade por um dia/, id);
    assert.match(aura, new RegExp(`Vontade CD ${dc} evita`), id);
  }
  assert.match(ability("tarso-dragao-rei-dos-mortos", "Aura Aterradora"), /falhar por 10 ou mais, a criatura morre automaticamente.*apenas criaturas escolhidas/);
  const death = ability("tarso-dragao-rei-dos-mortos", "Maior que a Morte");
  assert.match(death, /pelo menos metade dos PV.*imune a efeitos de morte instantânea/);
  assert.match(death, /perda de PV.*0 PV/);
});

test("Ameaças lost world sheets cite the full PDF", () => {
  const pages = [
    ["arvore-matilha", 244], ["burafonte", 245], ["armento-de-burafontes", 245], ["deinonico", 246],
    ["bando-de-deinonicos", 247], ["espada-da-floresta", 248], ["galhada-macho", 248], ["galhada-femea", 248],
    ["gali-gali", 249], ["enxame-de-gali-gali", 249], ["grande-battham", 250], ["raagoran", 251], ["tuntram", 251], ["rei-tirano", 253]
  ];
  for (const [id, pdfPage] of pages) {
    assert.deepEqual(getCreatureById(id).sources, [{
      book: "Ameaças de Arton",
      edition: "1ª edição, novembro de 2023",
      pdfFile: "T20 Ameacas de Arton.pdf",
      pdfPage,
      bookPage: pdfPage - 2
    }], id);
  }
});

test("Ameaças pirate and gunslinger sheets cite the full PDF", () => {
  const pages = [
    ["afogado", 255], ["capitao-afogado", 255], ["armeiro-de-tenebra-devoto", 255, 256], ["armeiro-de-tenebra-clerigo", 256],
    ["demonio-da-polvora", 257], ["goblin-de-sombreiro", 258], ["lider-goblin-de-sombreiro", 258],
    ["homem-piranha", 259], ["homem-piranha-imediato", 259], ["homem-piranha-capitao", 259],
    ["pirata", 261], ["imediato", 261], ["bando-pirata", 261], ["capitao-pirata", 261], ["capitao-do-conclave-pirata", 261],
    ["capitao-da-frota-aurea", 262], ["pistoleiro", 262], ["lider-pistoleiro", 262],
    ["sahuagin-predador", 263], ["sahuagin-metamorfo", 263], ["chapeu-preto", 264], ["lobo-do-mar", 265]
  ];
  for (const [id, pdfPage, pdfPageEnd] of pages) {
    assert.deepEqual(getCreatureById(id).sources, [{
      book: "Ameaças de Arton",
      edition: "1ª edição, novembro de 2023",
      pdfFile: "T20 Ameacas de Arton.pdf",
      pdfPage,
      bookPage: pdfPage - 2,
      ...(pdfPageEnd ? { pdfPageEnd, bookPageEnd: pdfPageEnd - 2 } : {})
    }], id);
  }
});

test("Ameaças thunder people sheets cite the full PDF", () => {
  const pages = [
    ["ceratops-guerreiro", 266], ["ceratops-chefe-da-tribo", 267], ["pteros-ceifador", 268], ["pteros-do-ceu-infinito", 268, 269],
    ["velocis-cacador", 270], ["xama-de-sarana", 270, 271], ["voracis-cacadora", 271], ["voracis-rainha", 272],
    ["totem-de-sarana-aspecto-de-marah", 273], ["totem-da-divina-serpente-aspecto-de-allihanna", 274],
    ["totem-do-rei-tirano-aspecto-de-megalokk", 275], ["totem-do-pai-de-tudo-aspecto-de-azgher", 275]
  ];
  for (const [id, pdfPage, pdfPageEnd] of pages) {
    assert.deepEqual(getCreatureById(id).sources, [{
      book: "Ameaças de Arton",
      edition: "1ª edição, novembro de 2023",
      pdfFile: "T20 Ameacas de Arton.pdf",
      pdfPage,
      bookPage: pdfPage - 2,
      ...(pdfPageEnd ? { pdfPageEnd, bookPageEnd: pdfPageEnd - 2 } : {})
    }], id);
  }
});

test("Ameaças purist sheets cite the full PDF", () => {
  const pages = [
    ["arcano-de-guerra-adepto", 276], ["arcano-de-guerra-veterano", 277], ["cacador-de-impuros", 278],
    ["corcel-de-comando", 279], ["carruagem-de-comando", 280], ["dancarino-de-guerra", 281], ["dancarino-de-guerra-veterano", 281],
    ["purificado", 282], ["soldado-blindado", 282, 283], ["companhia-blindada-de-elite", 283], ["soldado-superior", 285]
  ];
  for (const [id, pdfPage, pdfPageEnd] of pages) {
    assert.deepEqual(getCreatureById(id).sources, [{
      book: "Ameaças de Arton",
      edition: "1ª edição, novembro de 2023",
      pdfFile: "T20 Ameacas de Arton.pdf",
      pdfPage,
      bookPage: pdfPage - 2,
      ...(pdfPageEnd ? { pdfPageEnd, bookPageEnd: pdfPageEnd - 2 } : {})
    }], id);
  }
});

test("Ameaças realm of the dead sheets cite the full PDF and the Arquilich death immunity threshold", () => {
  const pages = [
    ["alzeras", 286, 287], ["cemiterio-vivo", 288], ["chacal-zumbi", 289], ["mercenario-de-aslothia", 290],
    ["lider-mercenario-de-aslothia", 290, 291], ["morgue-raz", 291], ["wisphago", 292, 293], ["lich", 293, 294],
    ["lich-de-aslothia", 294, 295], ["arquilich-ferren-asloth", 296, 297]
  ];
  for (const [id, pdfPage, pdfPageEnd] of pages) {
    assert.deepEqual(getCreatureById(id).sources, [{
      book: "Ameaças de Arton",
      edition: "1ª edição, novembro de 2023",
      pdfFile: "T20 Ameacas de Arton.pdf",
      pdfPage,
      bookPage: pdfPage - 2,
      ...(pdfPageEnd ? { pdfPageEnd, bookPageEnd: pdfPageEnd - 2 } : {})
    }], id);
  }
  const death = getCreatureById("arquilich-ferren-asloth").abilities.find(ability => ability.name === "Maior que a Morte").text;
  assert.match(death, /pelo menos metade dos PV.*imune a efeitos de morte instantânea/);
  assert.match(death, /perda de PV.*0 PV/);
});

test("Uivantes sheets from screenshots cite the full PDF and use the standard sheet layout", () => {
  const pages = [["golem-de-nor-medio", 351, "solo"], ["soterrado-vagante", 355, "minion"], ["stagh", 356, "minion"]];
  for (const [id, pdfPage, role] of pages) {
    const creature = getCreatureById(id);
    assert.deepEqual(creature.sources, [{
      book: "Ameaças de Arton",
      edition: "1ª edição, novembro de 2023",
      pdfFile: "T20 Ameacas de Arton.pdf",
      pdfPage,
      bookPage: pdfPage - 2
    }], id);
    assert.equal(creature.role, role, id);
    assert.deepEqual(creature.actions.map(action => action.name), ["Corpo a Corpo"], id);
    for (const ability of creature.abilities) {
      assert.ok([null, "livre", "padrão", "movimento", "completa", "reação"].includes(ability.timing), `${id} ${ability.name}`);
      assert.ok(!ability.text.startsWith(ability.name), `${id} ${ability.name}`);
    }
  }
  const ability = (id, name) => getCreatureById(id).abilities.find(entry => entry.name === name);
  assert.equal(getCreatureById("golem-de-nor-medio").subtype, null);
  assert.equal(ability("golem-de-nor-medio", "Aura Congelante").timing, "padrão");
  assert.equal(ability("soterrado-vagante", "Agarrar Aprimorado").timing, "livre");
  assert.equal(ability("soterrado-vagante", "Constrição Congelante").timing, "padrão");
  assert.match(ability("soterrado-vagante", "Constrição Congelante").text, /aumenta em \+1d6 para cada rodada consecutiva/);
});

test("Ameaças Tormenta area sheets cite the full PDF", () => {
  const pages = [
    ["alma-acorrentada", 20], ["bruxo-da-tormenta", 22], ["arquibruxo-da-tormenta", 22, 23], ["enxame-infernal", 24],
    ["esmagador-coletivo", 24], ["infecto", 25], ["turba-de-infectos", 25], ["lefeu-veridak", 26], ["lefeu-hurobakk", 27],
    ["lefeu-burodron", 28], ["lefeu-morgadrel", 28], ["lefeu-ezzayn", 29], ["gatzvalith-lorde-da-tormenta", 31]
  ];
  for (const [id, pdfPage, pdfPageEnd] of pages) {
    assert.deepEqual(getCreatureById(id).sources, [{
      book: "Ameaças de Arton",
      edition: "1ª edição, novembro de 2023",
      pdfFile: "T20 Ameacas de Arton.pdf",
      pdfPage,
      bookPage: pdfPage - 2,
      ...(pdfPageEnd ? { pdfPageEnd, bookPageEnd: pdfPageEnd - 2 } : {})
    }], id);
  }
});

test("every ND S and S+ sheet with Maior que a Morte states the death immunity threshold", () => {
  const sheets = creatureCatalog.filter(creature => ["S", "S+"].includes(creature.challengeRating));
  let checked = 0;
  for (const creature of sheets) {
    const ability = creature.abilities.find(entry => entry.name === "Maior que a Morte");
    if (!ability) continue;
    checked += 1;
    assert.match(ability.text, /pelo menos metade dos PV.*imune a efeitos de morte instantânea/, creature.id);
    assert.match(ability.text, /perda de PV.*0 PV/, creature.id);
    assert.doesNotMatch(ability.text, /possuem um status especial/, creature.id);
  }
  assert.equal(checked, 15);
});

test("threat parameters reproduce Ameaças de Arton Table 2-3", async () => {
  const { getThreatParameters } = await import("../src/threatCreationRules.js");
  // ND, ataque, dano médio, Defesa, Forte, Média, Fraca, PV, CD — Ameaças pp. 382–384
  const rows = {
    solo: [[0.25, 6, 8, 11, 3, 0, -2, 7, 12], [1, 9, 15, 16, 11, 5, 0, 35, 14], [4, 16, 24, 23, 16, 10, 4, 140, 18],
      [7, 24, 62, 31, 20, 14, 7, 280, 24], [12, 36, 144, 43, 26, 20, 12, 600, 33], [20, 54, 324, 61, 34, 28, 20, 1200, 49]],
    minion: [[0.25, 7, 9, 10, 2, 0, -1, 4, 12], [1, 11, 17, 15, 10, 5, 1, 9, 14], [5, 20, 56, 23, 16, 11, 6, 40, 20],
      [10, 34, 105, 35, 21, 16, 11, 80, 30], [16, 47, 235, 52, 29, 24, 17, 160, 42], [20, 56, 344, 60, 33, 28, 21, 240, 49]],
    special: [[0.25, 4, 8, 11, 3, 0, -2, 5, 14], [2, 10, 18, 17, 13, 7, 2, 49, 18], [6, 18, 56, 25, 18, 12, 6, 168, 24],
      [11, 32, 130, 39, 24, 18, 11, 385, 33], [15, 41, 186, 48, 28, 22, 15, 525, 42], [20, 52, 324, 59, 34, 28, 20, 840, 51]]
  };
  for (const [role, entries] of Object.entries(rows)) {
    for (const [nd, attack, averageDamage, defense, strong, medium, weak, hitPoints, abilityDc] of entries) {
      const parameters = getThreatParameters(role, nd);
      assert.deepEqual(
        [parameters.attack, parameters.averageDamage, parameters.defense, parameters.saves.strong, parameters.saves.medium, parameters.saves.weak, parameters.hitPoints, parameters.abilityDc],
        [attack, averageDamage, defense, strong, medium, weak, hitPoints, abilityDc],
        `${role} ND ${nd}`
      );
    }
  }
});

test("Masmorra de Práxis sheets use the roles that match their numbers", () => {
  assert.equal(getCreatureById("mimico-menor").role, "solo");
  assert.equal(getCreatureById("aranhas-filhotes").role, "solo");
  assert.equal(getCreatureById("aranha-matriarca").role, "solo");
  assert.equal(getCreatureById("orc-enfraquecido").role, "solo");
});

test("Dragão Celestial Venerável keeps the undead clause of Intervenção Divina", () => {
  const { abilities } = getCreatureById("dragao-celestial-veneravel");
  const { text } = abilities.find(ability => ability.name === "Intervenção Divina");
  assert.match(text, /cura mortos-vivos, em vez de causar dano/);
});

test("Avatar de Kallyadranoch variants preserve distinct sheets, encounters and profile defaults", () => {
  const original = getCreatureById("avatar-de-kallyadranoch");
  const divine = getCreatureById("avatar-de-kallyadranoch-deuses-de-arton");
  assert.ok(divine);
  assert.equal(divine.variantOf, original.id);
  assert.deepEqual(divine.sources, [{
    book: "Deuses de Arton",
    edition: "1ª edição, maio de 2025 (v1.1)",
    pdfFile: "T20 Deuses de Arton.pdf",
    pdfPage: 173,
    bookPage: 171
  }]);
  assert.equal(formatCreatureCatalogName(original), "Avatar de Kallyadranoch · Ameaças de Arton");
  assert.equal(formatCreatureCatalogName(divine), "Avatar de Kallyadranoch · Deuses de Arton");
  assert.equal(original.challengeRating, "S");
  assert.equal(original.stats.hitPoints, 2500);
  assert.equal(divine.challengeRating, 20);
  assert.equal(divine.stats.hitPoints, 1405);
  assert.equal(divine.type, "spirit");
  assert.equal(divine.role, "solo");
  assert.match(divine.actions[0].text, /Mordida \+52.*garras \+50/);
  const ability = name => divine.abilities.find(item => item.name === name);
  assert.match(ability("Aura Aterradora").text, /comece seu turno em alcance longo.*Vontade CD 50 evita/);
  assert.match(ability("Centelha Divina").text, /magia arcana.*CD 50.*imunidade a medo/);
  assert.match(ability("Sopro Supremo").text, /42d12 no total.*CD 50.*Recarga \(movimento\)/);
  assert.equal(ability("Maior que a Morte"), undefined);
  const familyIds = selectedProfile => getAutomaticCreatureCatalog(selectedProfile)
    .filter(creature => creature.id === original.id || creature.variantOf === original.id)
    .map(creature => creature.id);
  const alternate = {
    ...profile,
    creatureRules: { ...profile.creatureRules, preferredCreatureIdsByFamily: { [original.id]: divine.id } }
  };
  assert.deepEqual(familyIds(profile), [original.id]);
  assert.deepEqual(familyIds(alternate), [divine.id]);
  for (const [creature, selectedProfile] of [[original, alternate], [divine, profile]]) {
    const encounter = resolveNodeEncounter({
      id: creature.id,
      type: "normal",
      challenge: { total: creature.challengeRating },
      fixedComposition: { creatures: [{ id: creature.id, quantity: 1 }], useWeaponVariation: false }
    }, { profile: selectedProfile });
    assert.deepEqual(encounter.items.map(item => item.creatureId), [creature.id]);
    assert.equal(encounter.budget.creatures, creature.challengeRating);
  }
});

test("an exact encounter with a single special creature preserves its challenge rating", () => {
  for (const id of ["avatar-de-aharadak", "sckhar-dragao-rei-do-fogo", "kishinauros"]) {
    const creature = getCreatureById(id);
    assert.ok(creature);
    assert.match(creature.challengeRating, /^S\+?$/);
    const node = {
      id,
      type: "normal",
      challenge: { total: creature.challengeRating },
      fixedComposition: { creatures: [{ id, quantity: 1 }], useWeaponVariation: false }
    };
    const encounter = resolveNodeEncounter(node);
    assert.deepEqual(encounter.items.map(item => item.creatureId), [id]);
    assert.equal(encounter.budget.creatures, creature.challengeRating);
    assert.equal(encounter.budget.creaturesLabel, creature.challengeRating);
    assert.equal(encounter.budget.totalLabel, creature.challengeRating);
  }
});

test("cult book variants keep the original encounter IDs and profile defaults", () => {
  const pairs = [
    ["reishid", "reishid-livro-basico", "Livro Básico"],
    ["avatar-de-aharadak", "avatar-de-aharadak-deuses-de-arton", "Deuses de Arton"]
  ];
  for (const [originalId, variantId, variantBook] of pairs) {
    const original = getCreatureById(originalId);
    const variant = getCreatureById(variantId);
    assert.deepEqual(original.sources.map(source => source.book), ["Ameaças de Arton"]);
    assert.deepEqual(variant?.sources.map(source => source.book), [variantBook]);
    assert.equal(variant.challengeRating, original.challengeRating);

    const familyIds = new Set([originalId, variantId]);
    const availableIds = selectedProfile => getAutomaticCreatureCatalog(selectedProfile)
      .map(creature => creature.id)
      .filter(id => familyIds.has(id));
    assert.deepEqual(availableIds(profile), [originalId]);
    const alternate = {
      ...profile,
      creatureRules: { ...profile.creatureRules, preferredCreatureIdsByFamily: { [originalId]: variantId } }
    };
    assert.deepEqual(availableIds(alternate), [variantId]);

    const nodeFor = id => ({
      id,
      type: "normal",
      challenge: { total: original.challengeRating },
      fixedComposition: { creatures: [{ id, quantity: 1 }], useWeaponVariation: false }
    });
    assert.equal(resolveNodeEncounter(nodeFor(originalId), { profile: alternate }).items[0].creatureId, originalId);
    assert.equal(resolveNodeEncounter(nodeFor(variantId), { profile }).items[0].creatureId, variantId);
  }
  const reflexText = id => getCreatureById(id).abilities.find(ability => ability.name === "Ataque Reflexo")?.text;
  assert.match(reflexText("reishid"), /alcance natural.*voluntariamente/);
  assert.match(reflexText("reishid-livro-basico"), /alvo adjacente.*se mova para fora/);
  assert.equal(getCreatureById("avatar-de-aharadak").stats.hitPoints, 2804);
  const divineAvatar = getCreatureById("avatar-de-aharadak-deuses-de-arton");
  assert.equal(divineAvatar.stats.hitPoints, 2477);
  assert.equal(divineAvatar.role, "solo");
});

test("the two Gnoll Filibusteiro sources preserve old encounter and mission IDs", () => {
  const originalId = "gnoll-filibusteiro";
  const basicId = "gnoll-filibusteiro-livro-basico";
  const original = getCreatureById(originalId);
  const basic = getCreatureById(basicId);
  assert.ok(basic);
  assert.equal(original.source.book, "Ameaças de Arton");
  assert.equal(original.stats.reflex, 7);
  assert.match(original.equipment, /x20/);
  assert.equal(basic.source.book, "Livro Básico");
  assert.equal(basic.source.bookPage, 291);
  assert.equal(basic.source.pdfPage, 297);
  assert.equal(basic.stats.reflex, 11);
  assert.match(basic.equipment, /x10/);
  assert.deepEqual(original.sources.map(source => source.book), ["Ameaças de Arton"]);

  const encounter = resolveNodeEncounter({
    id: "gnoll-legacy", fixedComposition: { creatures: [{ id: originalId, quantity: 1 }] }, challenge: { total: 2 }
  });
  const { state } = decodeSessionCode(encodeSessionCode({
    v: 1, mode: "node-map", profile: profile.id, floor: 14, depth: 3, baseDc: 21, mapSeed: "gnoll-legacy",
    state: { resolvedEncounters: [[0, encounter]] }
  }));
  const [[, restored]] = state.resolvedEncounters;
  const [item] = restored.items;
  assert.equal(item.creatureId, originalId);
  const missions = [{
    id: "gnoll-hunt", status: "materialized", category: "extermination",
    objective: { targetType: "creature", targetId: originalId, quantity: 1 }
  }];
  assert.equal(getEncounterMissionMatches(item, missions)[0].count, 1);
  assert.equal(getEncounterMissionMatches({ ...item, creatureId: basicId }, missions).length, 0);
});

test("automatic resolution and reroll select one Gnoll version for each profile", () => {
  const originalId = "gnoll-filibusteiro";
  const basicId = "gnoll-filibusteiro-livro-basico";
  const alternateProfile = {
    ...profile, creatureRules: { ...profile.creatureRules, preferredCreatureIdsByFamily: { [originalId]: basicId } }
  };
  const makeNode = allowedCreatureIds => ({
    id: "gnoll-variants", encounterSeed: "gnoll-variants", type: "normal",
    challenge: { creatures: 2, total: 2 },
    creature: { type: "humanoid", targetChallenge: 2, allowedCreatureIds }
  });
  const standard = makeNode([originalId, basicId]);
  assert.deepEqual(resolveNodeEncounter(standard, { profile }).items.map(item => item.creatureId), [originalId]);
  assert.equal(rerollNodeCreatures(standard, profile), null);
  const alternative = makeNode([originalId, basicId]);
  assert.deepEqual(resolveNodeEncounter(alternative, { profile: alternateProfile }).items.map(item => item.creatureId), [basicId]);
  assert.equal(rerollNodeCreatures(alternative, alternateProfile), null);
  alternative.creature.allowedCreatureIds.push("orc-chefe");
  assert.deepEqual(rerollNodeCreatures(alternative, alternateProfile).items.map(item => item.creatureId), ["orc-chefe"]);
  assert.equal(resolveNodeEncounter(makeNode([basicId]), { profile }), null);

  for (const [activeProfile, expectedId] of [[profile, originalId], [alternateProfile, basicId]]) {
    const missionProfile = {
      ...activeProfile,
      missionRules: {
        ...activeProfile.missionRules,
        missionFloors: [14],
        allowedCategories: ["extermination"],
        creatureTargetIds: [originalId, basicId],
        exterminationTargetIds: [originalId, basicId],
        offerCountMin: 1,
        offerCountMax: 1
      }
    };
    const offers = generateMissionOffers(createMissionGenerationContext({ currentSeed: "gnoll-pilot", profile: missionProfile }));
    assert.deepEqual(offers.map(offer => offer.objective.targetId), [expectedId]);
  }
});

test("Orc Mutante book variants preserve the original ID and use the preferred sheet in automatic encounters", () => {
  const originalId = "orc-mutante";
  const basicId = "orc-mutante-livro-basico";
  const original = getCreatureById(originalId);
  const basic = getCreatureById(basicId);
  assert.ok(basic);
  assert.deepEqual(original.sources.map(source => source.book), ["Ameaças de Arton"]);
  assert.equal(original.source.pdfPage, 36);
  assert.match(original.actions[0].text, /Machado de guerra \+20/);
  assert.deepEqual(basic.sources.map(source => source.book), ["Livro Básico"]);
  assert.equal(basic.source.bookPage, 286);
  assert.equal(basic.source.pdfPage, 292);
  assert.equal(basic.challengeRating, 5);
  assert.equal(basic.stats.hitPoints, 55);
  assert.match(basic.actions[0].text, /Machado de guerra \+11.*mordida \+20/);
  assert.match(basic.abilities.find(ability => ability.name === "Sensibilidade à Luz")?.text || "", /ofuscado/);

  const alternateProfile = {
    ...profile,
    creatureRules: { ...profile.creatureRules, preferredCreatureIdsByFamily: { [originalId]: basicId } }
  };
  function makeNode() {
    return {
      id: "orc-mutante-variants", encounterSeed: "orc-mutante-variants", type: "normal",
      challenge: { creatures: 5, total: 5 },
      creature: { type: "humanoid", targetChallenge: 5, allowedCreatureIds: [originalId, basicId] }
    };
  }

  const originalEncounter = resolveNodeEncounter(makeNode(), { profile });
  assert.deepEqual(originalEncounter.items.map(item => item.creatureId), [originalId]);
  const alternateNode = makeNode();
  const alternateEncounter = resolveNodeEncounter(alternateNode, { profile: alternateProfile });
  assert.deepEqual(alternateEncounter.items.map(item => item.creatureId), [basicId]);
  assert.equal(rerollNodeCreatures(alternateNode, alternateProfile), null);
  assert.equal(resolveNodeEncounter({ ...makeNode(), resolvedEncounter: originalEncounter }, {
    profile: alternateProfile
  }), originalEncounter);
});

test("outdoor trap presentations use the terrain and repeat after restoring the encounter", () => {
  const node = {
    encounterSeed: "14:N2",
    environment: { terrain: { name: "Pântano" } },
    resolvedEncounter: { seed: "BADNZX7EM1:14:N2:encounter-v9" }
  };
  const item = { kind: "trap", trapId: "pendulo-de-teto", name: "Pêndulo de Teto", challengeRating: 1 };
  const saved = structuredClone({ node, item });
  const variation = getForestTrapPresentation(profile.id, node, item);
  assert.match(variation.name, /lâmina|laminado/i);
  assert.match(variation.description, /pântano|alagad[ao]/i);
  assert.deepEqual(getForestTrapPresentation(profile.id, saved.node, saved.item), variation);
  assert.deepEqual({ node, item }, saved);
  assert.deepEqual(Object.keys(variation).sort(), ["description", "name"]);

  node.environment.terrain.name = "Floresta";
  assert.notEqual(getForestTrapPresentation(profile.id, node, item).name, variation.name);
  const forestNames = new Set(Array.from({ length: 20 }, (_, index) =>
    getForestTrapPresentation(profile.id, { ...node, resolvedEncounter: { seed: `node-${index}` } }, item).name
  ));
  assert.ok(forestNames.size > 1);
  assert.equal(getForestTrapPresentation("dungeon-1-10", node, item), null);
  assert.equal(getForestTrapPresentation(profile.id, node, { ...item, trapId: "runa-de-protecao" }), null);
  node.environment.terrain.name = "Urbano";
  assert.equal(getForestTrapPresentation(profile.id, node, item), null);
});

function mission(category, { floor = 15, targetId = "sucuri", targetName = "Sucuri", quantity = 1, ...extra } = {}) {
  return {
    id: `m-${category}`, profileId: profile.id, category, categoryLabel: category, title: category,
    status: "selected", description: targetName,
    destination: category === "extermination" ? { kind: "progress", floor: null, floorMin: 11, floorMax: 19 } : { kind: "floor", floor },
    objective: { targetId, targetName, targetType: ["specialHunt", "extermination"].includes(category) ? "creature" : "material", quantity, condition: "cumprir objetivo" },
    integration: { bindings: [], state: "pending" }, ...extra
  };
}

function chain(budgets = [3, 3, 3]) {
  const nodes = budgets.map((budget, i) => ({
    id: i, level: i + 1, column: 3, type: "normal", contentType: "normal", label: "Encontro normal", links: [],
    skill: "Sobrevivência", dc: 21, investigationMinutes: 15, encounterSeed: `fixture-${i}`,
    challenge: { encounter: budget, creatures: budget, total: budget + 0.25, terrain: 0.25, climate: 0, trap: 0 },
    environment: { climate: [{ name: "Clima normal" }], terrain: { name: "Floresta", features: [] } },
    creature: { type: "animal", targetChallenge: budget }, trap: null
  }));
  nodes.forEach((node, i) => { node.links = nodes[i + 1] ? [nodes[i + 1]] : []; });
  return nodes.map(n => [n]);
}

function materialize(args) {
  assert.equal(typeof integration.materializeForestFloorMissions, "function", "forest mission materializer must exist");
  return integration.materializeForestFloorMissions(args);
}

function map(floor, seed = "forest-mvp", depth = 8) {
  return generateMapData(depth, profile.recommendations.baseDcByFloor[floor], profile, floor, createRng(seed), { version: 2 });
}

function rerollFixture() {
  const allowed = creatureCatalog.filter(item => item.type === "animal" && item.challengeRating === 1).slice(0, 2);
  assert.equal(allowed.length, 2);
  const trap = { kind: "trap", trapId: "lamina-na-parede", challengeRating: 0.5, quantity: 1 };
  const node = {
    type: "unknown", contentType: "normal",
    environment: { terrain: { name: "Floresta" } },
    creature: { type: "animal", targetChallenge: 1, allowedCreatureIds: allowed.map(item => item.id) },
    challenge: { creatures: 1, total: 2.5, trap: 0.5 },
    resolvedEncounter: {
      seed: "saved:14:N1", version: 9, budget: { creatures: 1, total: 2.5, trap: 0.5 },
      items: [{ kind: "creature", creatureId: allowed[0].id, challengeRating: 1, quantity: 1 }, trap]
    }
  };
  return { node, trap, allowed };
}

test("reroll swaps creatures inside the node's restrictions and preserves the saved encounter identity", () => {
  const { node, trap, allowed } = rerollFixture();
  const before = structuredClone(node);
  const next = rerollNodeCreatures(node);
  assert.ok(next);
  assert.deepEqual(node, before);
  assert.equal(next.seed, before.resolvedEncounter.seed);
  assert.deepEqual(next.budget, before.resolvedEncounter.budget);
  const creatures = next.items.filter(item => item.kind === "creature");
  assert.deepEqual(creatures.map(item => item.creatureId), [allowed[1].id]);
  assert.equal(calculateCombatND(creatures), 1);
  assert.deepEqual(next.items.filter(item => item.kind === "trap"), [trap]);
  const restored = JSON.parse(JSON.stringify({ ...node, resolvedEncounter: next }));
  assert.deepEqual(resolveNodeEncounter(restored), restored.resolvedEncounter);
});

test("reroll protects mission and fixed encounters and preserves a group with no alternative", () => {
  const { node, allowed } = rerollFixture();
  const protectedNodes = [
    { ...node, missionBindings: [{ id: "mission" }] },
    { ...node, fixedComposition: {} },
    { ...node, contentType: "boss" },
    { ...node, creature: { ...node.creature, creatureId: allowed[0].id } }
  ];
  for (const protectedNode of protectedNodes) {
    assert.equal(canRerollNodeCreatures(protectedNode), false);
    assert.equal(rerollNodeCreatures(protectedNode), null);
  }
  node.creature.allowedCreatureIds = [allowed[0].id];
  const before = structuredClone(node);
  assert.equal(rerollNodeCreatures(node), null);
  assert.deepEqual(node, before);
});

test("creature reinforcements toggle independently and survive save without changing ND or other items", () => {
  const { node } = rerollFixture();
  const encounter = node.resolvedEncounter;
  const [creature, trap] = encounter.items;
  assert.deepEqual(getCreatureReinforcement(creature), { initiative: 0, attack: 0, hitPoints: 0 });
  const initiative = withCreatureReinforcement(encounter, creature, "initiative", true);
  const both = withCreatureReinforcement(initiative, initiative.items[0], "attack", true);
  assert.deepEqual(getCreatureReinforcement(both.items[0]), { initiative: 2, attack: 1, hitPoints: 0 });
  const all = withCreatureReinforcement(both, both.items[0], "hitPoints", true);
  assert.deepEqual(getCreatureReinforcement(all.items[0], 30), { initiative: 2, attack: 1, hitPoints: 30 });
  assert.equal(withCreatureReinforcement(all, all.items[0], "hitPoints", true), all);
  assert.deepEqual(all.budget, encounter.budget);
  assert.equal(withCreatureReinforcement(both, both.items[0], "attack", true), both);
  assert.deepEqual(both.budget, encounter.budget);
  assert.equal(both.seed, encounter.seed);
  assert.equal(both.items[0].challengeRating, creature.challengeRating);
  assert.equal(both.items[1], trap);
  assert.equal(withCreatureReinforcement(encounter, trap, "attack", true), encounter);
  assert.equal(withCreatureReinforcement(encounter, creature, "damage", true), encounter);

  const restored = JSON.parse(JSON.stringify({ ...node, resolvedEncounter: all }));
  const restoredEncounter = resolveNodeEncounter(restored);
  assert.deepEqual(getCreatureReinforcement(restoredEncounter.items[0], 30), { initiative: 2, attack: 1, hitPoints: 30 });
  const withoutInitiative = withCreatureReinforcement(restoredEncounter, restoredEncounter.items[0], "initiative", false);
  const onlyAttack = withCreatureReinforcement(withoutInitiative, withoutInitiative.items[0], "hitPoints", false);
  assert.deepEqual(getCreatureReinforcement(onlyAttack.items[0], 30), { initiative: 0, attack: 1, hitPoints: 0 });
  const original = withCreatureReinforcement(onlyAttack, onlyAttack.items[0], "attack", false);
  assert.deepEqual(original, { ...encounter, adjusted: true });
  assert.ok(hasEncounterAdjustments(original));
  assert.equal(rerollNodeCreatures({ ...node, resolvedEncounter: original }), null);
});

test("individual damage, healing and undo preserve repeated creatures in the current combat", () => {
  const { node } = rerollFixture();
  const original = node.resolvedEncounter;
  const group = { ...original.items[0], quantity: 2, creatureData: { stats: { hitPoints: 30 } } };
  const encounter = { ...original, items: [group, original.items[1]] };
  const display = state => getCreatureUnits(state.items[0]).map(unit => unit.current);
  const damaged = withCreatureHealthChange(encounter, group, 0, 20);
  assert.deepEqual(display(damaged), [10, 30]);
  assert.equal(canRerollNodeCreatures({ ...node, resolvedEncounter: damaged }), false);
  assert.equal(canRerollNodeCreatures({ ...node, resolvedEncounter: withLastHealthChangeUndone(damaged) }), false);
  const cured = withCreatureHealthChange(damaged, damaged.items[0], 0, -7);
  assert.deepEqual(display(cured), [17, 30]);
  const undone = withLastHealthChangeUndone(cured);
  assert.deepEqual(display(undone), [10, 30]);
  assert.equal(withLastHealthChangeUndone(undone), undone);
  const reinforced = withCreatureReinforcement(undone, undone.items[0], "hitPoints", true);
  assert.deepEqual(display(reinforced), [40, 60]);
  const originalHealth = withCreatureReinforcement(reinforced, reinforced.items[0], "hitPoints", false);
  assert.deepEqual(display(originalHealth), [10, 30]);
  assert.deepEqual(display(encounter), [30, 30]);
});

test("adding a creature preserves damaged units and blocks an active extermination target", () => {
  const { node } = rerollFixture();
  const encounter = node.resolvedEncounter;
  const zombie = { ...encounter.items[0], creatureId: "zumbi", quantity: 2, creatureData: { stats: { hitPoints: 30 } },
    reinforcement: { hitPoints: true }, unitDamage: { 0: 20 } };
  const rat = { kind: "creature", creatureId: "rato", challengeRating: 0.25, quantity: 1, creatureData: { stats: { hitPoints: 5 } } };
  const mixed = { ...encounter, items: [zombie, rat] };
  const missions = [mission("extermination", { targetId: "zumbi" })];
  assert.equal(canAddEncounterCreature(zombie, missions), false);
  assert.equal(withCreatureAdded(mixed, zombie, missions), mixed);
  const extraRat = withCreatureAdded(mixed, rat, missions);
  assert.equal(extraRat.items[0], zombie);
  assert.deepEqual(getCreatureUnits(extraRat.items[1]).map(unit => unit.current), [5, 5]);
  const extraZombie = withCreatureAdded(mixed, zombie);
  assert.deepEqual(getCreatureUnits(extraZombie.items[0]).map(unit => unit.current), [40, 60, 60]);
  assert.deepEqual(extraZombie.budget, mixed.budget);
  assert.ok(hasEncounterAdjustments(extraZombie));
});

test("save preserves the original encounter, progress and reinforcement without temporary PV or additional creatures", () => {
  const fixture = rerollFixture();
  const levels = chain();
  const [node] = levels[0];
  const original = { ...fixture.node.resolvedEncounter, bossSetup: { heads: ["hidra", "bode"] } };
  node.resolvedEncounter = original;
  const state = createExplorationState();
  state.setLevels(levels);
  state.chooseRoute(node);
  const damaged = withCreatureHealthChange(original, original.items[0], 0, 1);
  const added = withCreatureAdded(damaged, damaged.items[0]);
  node.resolvedEncounter = added;

  assert.deepEqual(state.exportSessionState().resolvedEncounters, [[node.id, original]]);
  assert.deepEqual(state.exportSessionState().chosenByLevel, [[node.level, node.id]]);
  assert.ok(hasEncounterAdjustments(added));
  assert.equal(added.items[0].quantity, original.items[0].quantity + 1);
  assert.equal(added.items[0].unitDamage[0], 1);
  const expedition = { profileId: profile.id, seed: "recorded", startFloor: 11, floors: [{ floor: 11, levels }] };
  const snapshot = expeditionModule.serializeForestExpedition(expedition);
  assert.deepEqual(snapshot.floors[0].levels[0][0].resolvedEncounter, original);
  assert.ok(!hasEncounterAdjustments(snapshot.floors[0].levels[0][0].resolvedEncounter));

  node.resolvedEncounter = withCreatureReinforcement(added, added.items[0], "initiative", true);
  const saved = new Map(state.exportSessionState().resolvedEncounters).get(node.id);
  assert.deepEqual(saved.items[0], { ...original.items[0], reinforcement: { initiative: true } });
  assert.equal(saved.adjusted, true);
});

test("unknown elite receives elite budget and discovery check", () => {
  let checked = 0;
  for (let i = 0; i < 30; i++) {
    for (const node of map(11, `unknown-${i}`).flat()) {
      if (node.type !== "unknown" || node.revealedLabel !== "Encontro elite") continue;
      assert.equal(node.challenge.encounter, 3);
      assert.ok(node.skill && node.dc >= 22 && node.dc <= 25);
      checked++;
    }
  }
  assert.ok(checked > 0);
});

test("unknown true camps do not receive damaging climate", () => {
  let checked = 0;
  for (let i = 0; i < 50; i++) {
    for (const node of map(15, `camp-${i}`).flat()) {
      if (node.type !== "unknown" || node.revealedLabel !== "Acampamento") continue;
      assert.equal(node.creature, null);
      assert.equal(node.trap, null);
      assert.equal(node.dc, null);
      assert.ok(node.environment.climate.every(c => !profile.environmentRules.climate.damagingClimateNames.includes(c.name)));
      checked++;
    }
  }
  assert.ok(checked > 0);
});

test("new forest maps reduce hidden camps and keep the existing visible camps and legacy maps", () => {
  const previousProfile = { ...profile, encounterRules: { ...profile.encounterRules } };
  delete previousProfile.encounterRules.unknownCampChance;
  let unknownCount = 0;
  let currentCamps = 0;
  let previousCamps = 0;

  for (let index = 0; index < 240; index++) {
    const floor = 11 + index % 10;
    const seed = `camp-frequency-${index}`;
    const depth = profile.recommendations.encountersByFloor[floor];
    const dc = profile.recommendations.baseDcByFloor[floor];
    const current = generateMapData(depth, dc, profile, floor, createRng(seed), { version: 2 }).flat();
    const previous = generateMapData(depth, dc, previousProfile, floor, createRng(seed), { version: 2 }).flat();
    const visibleCamps = nodes => nodes.filter(node => node.type === "camp").map(node => node.id);
    assert.deepEqual(visibleCamps(current), visibleCamps(previous));
    unknownCount += current.filter(node => node.type === "unknown").length;
    currentCamps += current.filter(node => node.type === "unknown" && node.contentType === "camp").length;
    previousCamps += previous.filter(node => node.type === "unknown" && node.contentType === "camp").length;

    if (index < 10) {
      const legacyReveals = mapProfile =>
        generateMapData(depth, dc, mapProfile, floor, createRng(seed)).flat().map(node => node.revealedLabel);
      assert.deepEqual(legacyReveals(profile), legacyReveals(previousProfile));
    }
  }

  assert.ok(unknownCount > 500);
  assert.ok(currentCamps / unknownCount >= 0.05 && currentCamps / unknownCount <= 0.10);
  assert.ok(currentCamps < previousCamps);
});

test("new expeditions reveal outdoor scenes only after choosing the route", () => {
  const kinds = new Set();
  let sampled = 0;
  let unknown = 0;
  for (let index = 0; index < 160; index++) {
    const levels = generateMapData(6, 21, profile, 15, createRng(`forest-scenes-${index}`), { version: 3 });
    sampled += levels.flat().length;
    unknown += levels.flat().filter(node => node.type === "unknown").length;
    for (const node of levels.flat().filter(node => node.scene)) {
      kinds.add(node.scene.kind);
      assert.equal(node.type, "unknown");
      assert.equal(node.contentType, "scene");
      assert.equal(node.revealedLabel, node.scene.title);
      assert.equal(node.creature, null);
      assert.equal(node.trap, null);
      assert.equal(node.challenge.creatures, 0);
      assert.ok(node.scene.approach && node.scene.success && node.scene.failure);
    }
  }
  assert.ok(unknown / sampled > 0.15);
  assert.deepEqual([...kinds].sort(), ["discovery", "exploration", "falseRest", "obstacle"]);

  const expedition = expeditionModule.prepareForestExpedition({ seed: "scene-round-trip", profile, missions: [] });
  const sceneFloor = expedition.floors.find(floor => floor.levels.flat().some(node => node.scene?.kind === "falseRest"));
  assert.ok(sceneFloor);
  const state = createExplorationState();
  state.setLevels(sceneFloor.levels);
  const scene = sceneFloor.levels.flat().find(node => node.scene?.kind === "falseRest");
  assert.equal(state.isNodeRevealed(scene), false);
  state.importSessionState({ chosenByLevel: [[scene.level, scene.id]] });
  assert.equal(state.isNodeRevealed(scene), true);
  assert.equal(state.canRestAtNode(scene), false);
  const snapshot = expeditionModule.serializeForestExpedition(expedition);
  const restored = expeditionModule.restoreForestExpedition(snapshot);
  assert.deepEqual(restored.floors.find(floor => floor.floor === sceneFloor.floor).levels.flat().find(node => node.id === scene.id).scene, scene.scene);
});

test("false rest generates one ambush with the scene's combat budget and preserves the total ND", () => {
  let checked = 0;
  for (let index = 0; index < 80; index++) {
    const seed = `ambush-${index}`;
    const levels = generateMapData(6, 21, profile, 15, createRng(seed), { version: 3 });
    for (const node of levels.flat()) {
      if (node.scene?.kind !== "falseRest") continue;
      const ambush = resolveForestAmbush(node, profile, { mapSeed: seed });
      assert.ok(ambush?.items.length);
      assert.ok(ambush.items.every(item => item.kind === "creature"));
      assert.equal(calculateCombatND(ambush.items), node.challenge.encounter);
      assert.equal(ambush.budget.creatures, node.challenge.encounter);
      assert.equal(ambush.budget.total, node.challenge.total);
      assert.equal(node.resolvedEncounter, null);
      assert.deepEqual(resolveForestAmbush(node, profile, { mapSeed: seed }), ambush);
      assert.equal(resolveForestAmbush({ ...node, resolvedEncounter: ambush }, profile, { mapSeed: seed }), null);
      checked++;
    }
  }
  assert.ok(checked > 20);
});

test("an unrevealed rest stop looks the same for real and false camps", () => {
  const { getNodeContentPresentation } = presentation;
  const safe = { type: "unknown", contentType: "camp", requiresCompletion: true, revealedLabel: "Acampamento" };
  const fake = {
    type: "unknown", contentType: "scene", requiresCompletion: true, revealedLabel: "Abrigo no leito de cheia",
    scene: { kind: "falseRest" }
  };
  const view = { chosen: true, revealed: true, rested: false };
  assert.deepEqual(getNodeContentPresentation(fake, view), getNodeContentPresentation(safe, view));
  assert.equal(getNodeContentPresentation(fake, view).label, "Acampamento");
  assert.equal(getNodeContentPresentation(fake, view).campUndecided, true);
  assert.equal(getNodeContentPresentation(safe, { ...view, rested: true }).campUndecided, false);
  const ambushed = { ...fake, resolvedEncounter: { items: [{ kind: "creature" }] } };
  assert.equal(getNodeContentPresentation(ambushed, view).label, "Emboscada");
  assert.equal(getNodeContentPresentation(ambushed, view).iconType, "normal");
});

test("forest continuity keeps terrain across more links and shares gradual weather by stage", () => {
  let repeatedBefore = 0;
  let repeatedAfter = 0;
  let plainWithoutFeatures = 0;
  let regionalRain = 0;
  let sheltered = 0;
  const precipitation = ["Chuva", "Tempestade"];
  const temperature = ["Frio extremo", "Frio", null, "Calor", "Calor extremo"];
  const regionalIndex = (node, names) => names.indexOf(names.find(name =>
    node.environment.climate.some(climate => climate.name === name)
  ) ?? null);

  for (let index = 0; index < 200; index++) {
    const seed = `continuity-${index}`;
    const generate = version => generateMapData(7, 22, profile, 17, createRng(seed), { version });
    const previous = generate(3);
    const current = generate(4);
    const footprint = levels => levels.map(row => row.map(node => [node.id, node.type, node.links.map(next => next.id)]));
    assert.deepEqual(footprint(current), footprint(previous));
    const matchingLinks = levels => levels.flat().reduce((total, node) =>
      total + node.links.filter(next => node.environment.terrain.name === next.environment.terrain.name).length, 0);
    repeatedBefore += matchingLinks(previous);
    repeatedAfter += matchingLinks(current);

    let lastWeather;
    let lastTemperature;
    for (const row of current) {
      const exposed = row.filter(node => node.contentType !== "camp");
      if (exposed.length) {
        const rain = regionalIndex(exposed[0], precipitation);
        const heat = regionalIndex(exposed[0], temperature);
        assert.ok(exposed.every(node => regionalIndex(node, precipitation) === rain && regionalIndex(node, temperature) === heat));
        if (lastWeather !== undefined) assert.ok(Math.abs(rain - lastWeather) <= 1);
        if (lastTemperature !== undefined) assert.ok(Math.abs(heat - lastTemperature) <= 1);
        lastWeather = rain;
        lastTemperature = heat;
        if (rain >= 0) regionalRain++;
      } else {
        lastWeather = undefined;
        lastTemperature = undefined;
      }
    }
    for (const node of current.flat()) {
      const { terrain, climate } = node.environment;
      if (terrain.name === "Planície aberta" && !terrain.features.length) plainWithoutFeatures++;
      if (node.contentType === "camp") {
        assert.ok(climate.every(event => !profile.environmentRules.climate.damagingClimateNames.includes(event.name)));
        sheltered++;
      }
    }
    if (index === 0) {
      assert.deepEqual(current.flat().map(node => node.environment), generate(4).flat().map(node => node.environment));
    }
  }
  assert.ok(repeatedAfter > repeatedBefore * 1.12);
  assert.ok(regionalRain > 0 && plainWithoutFeatures > 0 && sheltered > 0);
});

test("new forest maps spend 30 to 60 minutes per traversal according to weather and terrain", () => {
  const durations = new Set();
  let compared = 0;
  for (let index = 0; index < 40; index++) {
    const seed = `travel-time-${index}`;
    const levels = map(15, seed);
    for (const node of levels.flat()) {
      if (!node.skill || !node.dc) {
        assert.equal(node.investigationMinutes, 30);
        continue;
      }
      const climate = node.environment.climate.filter(event => event.name !== "Clima normal").length;
      const extra = climate + Number(node.challenge.terrain >= 1);
      assert.equal(node.investigationMinutes, Math.min(30 + 15 * extra, 60));
      durations.add(node.investigationMinutes);
    }
    const legacy = generateMapData(8, 22, profile, 15, createRng(seed)).flat();
    compared += legacy.filter(node => node.skill && node.investigationMinutes === 15).length;
  }
  assert.deepEqual([...durations].sort(), [30, 45, 60]);
  assert.ok(compared > 0);
});

test("the forest clocks survive rest, floor changes and save restore", () => {
  const levels = chain();
  levels[0][0].investigationMinutes = 45;
  levels[1][0].investigationMinutes = 30;
  levels[1][0].contentType = "camp";
  const state = createExplorationState();
  state.setLevels(levels);
  state.markExplored(levels[0][0]);
  state.chooseRoute(levels[0][0]);
  state.completeNode(levels[0][0]);
  state.chooseRoute(levels[1][0]);
  assert.equal(state.getElapsedMinutes(), 75);
  assert.ok(state.restAtNode(levels[1][0]));
  assert.equal(state.getElapsedMinutes(), 0);
  assert.equal(state.getExplorationTime().totalElapsedMinutes, 75);

  const freshFloor = chain();
  state.setLevels(freshFloor);
  state.chooseRoute(freshFloor[0][0]);
  const restored = createExplorationState();
  restored.setLevels(freshFloor);
  restored.importSessionState(JSON.parse(JSON.stringify(state.exportSessionState())));
  assert.equal(restored.getElapsedMinutes(), 15);
  assert.equal(restored.getExplorationTime().totalElapsedMinutes, 90);
  restored.setLevels(chain(), { resetTime: true });
  assert.equal(restored.getElapsedMinutes(), 0);
  assert.equal(restored.getExplorationTime().totalElapsedMinutes, 0);
});

test("legacy forest saves reconstruct known travel and indicate missing floor history", () => {
  const { withForestExplorationTime } = expeditionModule;
  const levels = chain();
  const current = { chosenByLevel: [[1, 0]], explored: [0, 1], attempted: [2], elapsedMinutes: 0 };
  const earlier = { chosenByLevel: [[1, 0], [2, 1]], elapsedMinutes: 30 };
  const expedition = {
    floors: [{ floor: 11, levels, state: earlier }, { floor: 12, levels }, { floor: 13, levels }]
  };
  const migrated = withForestExplorationTime(expedition, 13, current);
  assert.equal(migrated.totalElapsedMinutes, 75);
  assert.equal(migrated.totalElapsedPartial, true);
  assert.equal(migrated.elapsedMinutes, 0);
  expedition.floors[1].state = earlier;
  const complete = withForestExplorationTime(expedition, 13, current);
  assert.equal(complete.totalElapsedMinutes, 105);
  assert.equal(complete.totalElapsedPartial, false);
  assert.equal(withForestExplorationTime(expedition, 13, migrated), migrated);
});

test("Quimera is alone in the same simple arena for every seed", () => {
  let first;
  for (let i = 0; i < 30; i++) {
    const boss = map(20, `boss-${i}`).at(-1)[0];
    const encounter = resolveNodeEncounter(boss, { mapSeed: `boss-${i}` });
    assert.deepEqual(encounter.items.map(({ creatureId, quantity, kind }) => ({ creatureId, quantity, kind })), [
      { creatureId: "quimera", quantity: 1, kind: "creature" }
    ]);
    assert.equal(boss.trap, null);
    assert.equal(boss.challenge.total, 8);
    const tactical = createNodeTacticalMap(boss);
    assert.equal(tactical.cells.filter(c => c === "party").length, 4);
    assert.equal(tactical.cells.filter(c => c === "boss").length, 4);
    assert.ok(tactical.cells.includes("obstacle"));
    assert.ok(tactical.cells.every(c => ["floor", "party", "boss", "obstacle"].includes(c)));
    if (first) assert.deepEqual({ environment: boss.environment, tactical }, first);
    first = { environment: boss.environment, tactical };
  }
});

test("Quimera heads are prepared and preserved, including migration of older expeditions", () => {
  const { prepareForestExpedition, serializeForestExpedition, restoreForestExpedition } = expeditionModule;
  const prepare = seed => prepareForestExpedition({ seed, profile, missions: [], startFloor: 20 });
  const getBoss = expedition => expedition.floors[0].levels.flat().find(node => node.type === "boss");
  const original = prepare("heads");
  const heads = getBoss(original).chimeraHeads;
  assert.equal(heads.length, 4);
  assert.equal(new Set(heads.map(head => head.name)).size, 4);
  assert.ok(heads.every(head => isDamageType(head.weakness)));
  assert.deepEqual(getBoss(prepare("heads")).chimeraHeads, heads);
  assert.ok(new Set(Array.from({ length: 12 }, (_, i) => JSON.stringify(getBoss(prepare(`heads-${i}`)).chimeraHeads))).size > 1);
  const saved = serializeForestExpedition(original);
  assert.deepEqual(getBoss(restoreForestExpedition(saved)).chimeraHeads, heads);
  const oldBoss = getBoss(saved);
  delete oldBoss.chimeraHeads;
  oldBoss.fixedTacticalMap.cells = oldBoss.fixedTacticalMap.cells.map(cell => cell === "obstacle" ? "floor" : cell);
  const migrated = getBoss(restoreForestExpedition(saved));
  assert.deepEqual(migrated.chimeraHeads, heads);
  assert.deepEqual(migrated.fixedTacticalMap, oldBoss.fixedTacticalMap);
});

test("Quimera shares HP, stuns a head once and tracks breath independently of turns", () => {
  const boss = map(20).at(-1)[0];
  const original = resolveNodeEncounter(boss);
  const dragon = { name: "Dragão", weakness: "cold" };
  let encounter = withChimeraDamage(original, original.items[0], null, "cold", 4);
  assert.equal(encounter.lastChimeraHit.lost, 0);
  encounter = withChimeraDamage(encounter, encounter.items[0], dragon, "fire", 18);
  assert.equal(getCreatureUnits(encounter.items[0])[0].current, 320);
  assert.equal(encounter.chimera, undefined);
  encounter = withChimeraDamage(encounter, encounter.items[0], dragon, "cold", 10);
  assert.equal(encounter.chimera.stuns.Dragão, "stunned");
  assert.equal(getCreatureUnits(encounter.items[0])[0].current, 310);
  assert.equal(withChimeraBreath(encounter, [dragon], false), encounter);
  assert.equal(withChimeraHealthUndone(encounter).chimera.stuns.Dragão, undefined);
  encounter = withChimeraTurnEnded(encounter);
  assert.equal(encounter.chimera.stuns.Dragão, "used");
  encounter = withChimeraBreath(encounter, [dragon], false);
  encounter = withChimeraDamage(encounter, encounter.items[0], dragon, "cold", 10);
  assert.equal(encounter.chimera.stuns.Dragão, "used");
  assert.equal(encounter.lastChimeraHit.lost, 10);
  assert.equal(withChimeraTurnEnded(encounter).chimera.breathReady, false);
  assert.equal(withChimeraBreath(encounter, [dragon], true).chimera.breathReady, true);
  encounter = withCreatureReinforcement(encounter, encounter.items[0], "hitPoints", 25);
  assert.deepEqual(getCreatureUnits(encounter.items[0])[0], { index: 0, current: 325, max: 358 });
  const saved = getEncounterForSave(encounter);
  assert.equal(saved.chimera.breathReady, false);
  assert.equal(saved.chimera.stuns.Dragão, "used");
  assert.equal(saved.lastChimeraHit, undefined);
  assert.deepEqual(getCreatureUnits(saved.items[0])[0], { index: 0, current: 358, max: 358 });
  assert.deepEqual(saved.budget, original.budget);
});

test("mission objectives mark the node map without replacing terrain or combat markers", () => {
  const node = map(15).flat().find(n => n.type === "normal");
  resolveNodeEncounter(node, { mapSeed: "same-scene" });
  const base = createNodeTacticalMap(node);
  node.missionObjectives = [{ missionId: "test-mission", targetType: "object", targetName: "Relicário" }];
  const withMission = createNodeTacticalMap(node);
  assert.equal(withMission.objectiveCount, 1);
  assert.deepEqual(withMission.cells, base.cells);
  const [target] = node.resolvedEncounter.items.filter(item => item.kind === "creature");
  assert.ok(target);
  node.missionObjectives = [{ missionId: "hunt", targetType: "creature", targetId: target.creatureId, targetName: target.name }];
  const hunt = createNodeTacticalMap(node);
  assert.deepEqual(hunt.cells, base.cells);
  assert.ok(hunt.objectiveMarkers.length > 0);
  assert.ok(hunt.objectiveMarkers.every(marker => hunt.cells[marker.index] === "enemy"));
});

test("special hunt places the promised creature inside the node encounter budget", () => {
  const levels = chain();
  const [out] = materialize({ floor: 15, levels, missions: [mission("specialHunt")] });
  const binding = out.integration.bindings[0];
  const node = levels.flat().find(n => n.id === binding.nodeId);
  const encounter = resolveNodeEncounter(node, { mapSeed: "hunt" });
  assert.equal(binding.floor, 15);
  assert.deepEqual(encounter.items.map(i => [i.creatureId, i.quantity]), [["sucuri", 1]]);
  assert.equal(encounter.budget.creatures, 3);
  assert.ok(calculateCombatND(encounter.items) <= 3);
});

test("extermination reserves eight real enemies across nodes without exceeding ND 3", () => {
  const levels = chain();
  const [out] = materialize({ floor: 15, levels, missions: [mission("extermination", { targetId: "naja", targetName: "Naja", quantity: 8 })] });
  const bindings = out.integration.bindings;
  assert.equal(bindings.reduce((sum, b) => sum + b.quantity, 0), 8);
  for (const binding of bindings) {
    const node = levels.flat().find(n => n.id === binding.nodeId);
    const encounter = resolveNodeEncounter(node, { mapSeed: "extermination" });
    assert.equal(encounter.items[0].creatureId, "naja");
    assert.ok(calculateCombatND(encounter.items) <= 3);
  }
});

test("mission allocation rejects incompatible branches instead of reporting false success", () => {
  const left = chain([3])[0][0];
  const right = { ...structuredClone(left), id: 1, column: 5 };
  right.environment = { climate: [{ name: "Neblina" }], terrain: { name: "Aquático", features: [{ name: "Água corrente" }] } };
  const levels = [[left, right]];
  const missions = [
    mission("collection", { targetName: "sementes de vegetação agressiva" }),
    mission("anomalous", { targetName: "neblina que apaga sons próximos" })
  ];
  assert.throws(() => materialize({ floor: 15, levels, missions }), /rota|compatível/i);
  assert.ok(levels.flat().every(n => !n.missionBindings));
});

test("noncombat mission adds the exact objective to a compatible scene", () => {
  const levels = chain();
  const [out] = materialize({ floor: 15, levels, missions: [mission("collection", { targetName: "sementes de vegetação agressiva", quantity: 4 })] });
  const node = levels.flat().find(n => n.id === out.integration.bindings[0].nodeId);
  assert.equal(node.missionObjectives[0].targetName, "sementes de vegetação agressiva");
  assert.equal(node.missionObjectives[0].quantity, 4);
  assert.ok(node.missionObjectives[0].description.includes("sementes de vegetação agressiva"));
  assert.equal(node.environment.terrain.name, "Floresta");
});

test("a prepared expedition has actual mission content and enough extermination targets", () => {
  assert.equal(typeof expeditionModule.prepareForestExpedition, "function");
  const seen = new Set();
  for (let i = 0; i < 80; i++) {
    const seed = `expedition-${i}`;
    const offers = generateMissionOffers(createMissionGenerationContext({ currentSeed: seed, profile }));
    const expedition = expeditionModule.prepareForestExpedition({ seed, profile, missions: offers.slice(0, 3) });
    for (const entry of expedition.floors) {
      assert.ok(entry.levels.flat().every(n => (n.missionBindings?.length || 0) <= 1), `${seed}: missions sharing a node`);
    }
    for (const m of expedition.missions) {
      seen.add(m.category);
      const bindings = m.integration.bindings;
      assert.ok(bindings.length > 0, `${seed}: ${m.category} without nodes`);
      if (m.category === "extermination") assert.equal(bindings.reduce((n, b) => n + b.quantity, 0), m.objective.quantity);
      for (const b of bindings) {
        const entry = expedition.floors.find(f => f.floor === b.floor);
        const node = entry.levels.flat().find(n => n.id === b.nodeId);
        assert.ok(node.missionObjectives.some(o => o.missionId === m.id));
        assert.ok(!["camp", "boss"].includes(node.contentType));
        if (m.objective.targetType === "creature") {
          const encounter = resolveNodeEncounter(node, { mapSeed: entry.mapSeed });
          assert.ok(encounter.items.some(item => item.creatureId === m.objective.targetId && item.quantity === b.quantity));
        }
      }
    }
  }
  assert.equal(seen.size, 10);
});

test("expedition snapshot restores graph links, fixed encounters and mission bindings", () => {
  assert.equal(typeof expeditionModule.prepareForestExpedition, "function");
  const original = expeditionModule.prepareForestExpedition({ seed: "snapshot", profile, missions: [mission("specialHunt")] });
  const entry = original.floors.find(f => f.floor === 15);
  const binding = original.missions[0].integration.bindings[0];
  const node = entry.levels.flat().find(n => n.id === binding.nodeId);
  resolveNodeEncounter(node, { mapSeed: entry.mapSeed });
  const saved = JSON.parse(JSON.stringify(expeditionModule.serializeForestExpedition(original)));
  const restored = expeditionModule.restoreForestExpedition(saved);
  const restoredNode = restored.floors.find(f => f.floor === 15).levels.flat().find(n => n.id === binding.nodeId);
  assert.deepEqual(restoredNode.resolvedEncounter, JSON.parse(JSON.stringify(node.resolvedEncounter)));
  assert.deepEqual(restoredNode.missionObjectives, node.missionObjectives);
  assert.deepEqual(expeditionModule.serializeForestExpedition(restored), saved);
  for (const f of restored.floors) {
    const all = new Set(f.levels.flat());
    assert.ok(f.levels.flat().every(n => n.links.every(next => all.has(next) && next.level === n.level + 1)));
  }
});

test("choosing a new scene does not unlock the next node before completion", () => {
  const levels = chain();
  levels.flat().forEach(n => { n.requiresCompletion = true; });
  const state = createExplorationState();
  state.setLevels(levels);
  assert.equal(state.chooseRoute(levels[0][0]), true);
  assert.equal(state.getNodeViewState(levels[1][0]).active, false);
  assert.equal(state.completeNode(levels[0][0]), true);
  assert.equal(state.getNodeViewState(levels[1][0]).active, true);
  const saved = state.exportSessionState();
  const restored = createExplorationState();
  restored.setLevels(levels);
  restored.importSessionState(saved);
  assert.equal(restored.isNodeCompleted(levels[0][0]), true);
  assert.equal(restored.getNodeViewState(levels[1][0]).active, true);
});

test("true rest requires the chosen camp and cannot be used from an old camp", () => {
  const levels = chain();
  levels[0][0].type = "camp";
  levels[0][0].contentType = "camp";
  levels.flat().forEach(n => { n.requiresCompletion = true; });
  const state = createExplorationState();
  state.setLevels(levels);
  assert.equal(state.restAtNode(levels[0][0]), false);
  state.chooseRoute(levels[0][0]);
  assert.equal(state.restAtNode(levels[0][0]), true);
  assert.equal(state.restAtNode(levels[0][0]), false);
  assert.equal(state.restAtNode(levels[1][0]), false);
});

test("the same defeated enemies cannot be credited twice, including after restoring", () => {
  const state = createMissionState();
  state.startBoard(profile.id, [mission("extermination", { quantity: 8 })]);
  state.confirmSelection(["m-extermination"]);
  assert.equal(typeof state.recordEncounterProgress, "function");
  assert.equal(state.recordEncounterProgress("m-extermination", "floor-15:node-2:sucuri", 2), true);
  assert.equal(state.recordEncounterProgress("m-extermination", "floor-15:node-2:sucuri", 2), false);
  assert.equal(state.getSelected()[0].progress.current, 2);
  const restored = createMissionState();
  restored.importSessionState(JSON.parse(JSON.stringify(state.exportSessionState())));
  assert.equal(restored.recordEncounterProgress("m-extermination", "floor-15:node-2:sucuri", 2), false);
  assert.equal(restored.recordEncounterProgress("m-extermination", "floor-16:node-2:sucuri", 2), true);
  assert.equal(restored.getSelected()[0].progress.current, 4);
});

test("unknown contents stay concealed until that route is chosen", () => {
  const node = chain([3])[0][0];
  Object.assign(node, { type: "unknown", contentType: "elite", revealedLabel: "Encontro elite", requiresCompletion: true });
  const state = createExplorationState();
  state.setLevels([[node]]);
  assert.equal(state.isNodeRevealed(node), false);
  state.chooseRoute(node);
  assert.equal(state.isNodeRevealed(node), true);
});

test("legacy generation retains the original route and unknown semantics", () => {
  const legacy = generateMapData(8, 15, profile, 11, createRng("unknown-0"));
  assert.ok(legacy.flat().every(n => !n.requiresCompletion && !n.contentType));
  const state = createExplorationState();
  state.setLevels(legacy);
  state.chooseRoute(legacy[0][0]);
  assert.ok(legacy[0][0].links.every(n => state.getNodeViewState(n).active));
});

test("investigation contains evidence and an answer, rather than only a mission label", () => {
  const levels = chain();
  materialize({ floor: 15, levels, missions: [mission("investigation", {
    targetName: "ossos marcados por ferramenta", targetId: "ossos", quantity: 1
  })] });
  const objective = levels.flat().find(n => n.missionObjectives)?.missionObjectives[0];
  assert.ok(objective.question?.includes("marcas"));
  assert.ok(objective.evidence?.length >= 2);
  assert.ok(objective.answer?.includes("ferramenta"));
  assert.ok(objective.onSuccess && objective.onFailure);
});

test("a mission trial defines approaches and success/failure using the existing terrain rules", () => {
  const levels = chain();
  levels.flat().forEach(n => { n.environment.terrain = { name: "Aquático", features: [{ name: "Água corrente", effect: "Atletismo CD 15 para nadar contra a corrente." }] }; });
  materialize({ floor: 15, levels, missions: [mission("trial", { targetName: "cruzar terreno inundado", targetId: "travessia" })] });
  const objective = levels.flat().find(n => n.missionObjectives)?.missionObjectives[0];
  assert.ok(objective.approaches?.some(a => a.includes("Atletismo")));
  assert.ok(objective.onSuccess?.includes("margem"));
  assert.ok(objective.onFailure?.includes("regra"));
});

test("a true camp explicitly shelters the group from surrounding water and terrain hazards", () => {
  const aquatic = profile.environmentRules.terrain.terrainOptions.find(option => option.value.name === "Aquático");
  const forced = { ...profile, environmentRules: { ...profile.environmentRules, terrain: {
    ...profile.environmentRules.terrain, terrainOptions: [aquatic]
  } } };
  const levels = generateMapData(4, 20, forced, 11, createRng("safe-riverside"), { version: 2 });
  for (const node of levels[3]) {
    assert.equal(node.contentType, "camp");
    assert.equal(node.environment.terrain.name, "Aquático");
    assert.ok(node.safeRest?.protectedFrom.includes("terrain"));
    assert.ok(node.safeRest?.description.includes("abrigo"));
  }
});

test("two missions for floor 15 occupy different nodes of the same route", () => {
  const levels = chain();
  const selected = [
    mission("collection", { id: "coleta-15", targetName: "sementes de vegetação agressiva" }),
    mission("recovery", { id: "recuperacao-15", targetName: "uma bússola desregulada" })
  ];
  const results = materialize({ floor: 15, levels, missions: selected });
  const ids = results.map(m => m.integration.bindings[0].nodeId);
  assert.equal(new Set(ids).size, 2);
  assert.ok(levels.flat().every(n => (n.missionBindings?.length || 0) <= 1));
});

test("combat and noncombat missions do not share a node with extermination", () => {
  const levels = chain([3, 3, 3, 3]);
  const results = materialize({ floor: 15, levels, missions: [
    mission("specialHunt"),
    mission("collection", { targetName: "sementes de vegetação agressiva" }),
    mission("extermination", { targetId: "naja", targetName: "Naja", quantity: 4 })
  ] });
  assert.equal(results.length, 3);
  assert.ok(levels.flat().every(n => (n.missionBindings?.length || 0) <= 1));
  assert.equal(results.find(m => m.category === "extermination").integration.bindings.reduce((n, b) => n + b.quantity, 0), 4);
});

test("a route with only one eligible node cannot accept two similar missions", () => {
  const levels = chain([3]);
  const selected = [
    mission("collection", { id: "coleta-a", targetName: "sementes de vegetação agressiva" }),
    mission("collection", { id: "coleta-b", targetName: "fungos luminescentes" })
  ];
  assert.throws(() => materialize({ floor: 15, levels, missions: selected }), /rota compatível/i);
  assert.ok(levels.flat().every(n => !n.missionBindings && !n.missionObjectives));
});

test("visual progress distinguishes exploration, pending scene and completed scene after restore", () => {
  const levels = chain();
  levels.flat().forEach(n => { n.requiresCompletion = true; });
  const state = createExplorationState();
  state.setLevels(levels);
  const node = levels[0][0];
  assert.equal(state.getNodeViewState(node).completed, false);
  assert.equal(typeof presentation.getNodeProgressPresentation, "function");
  assert.equal(presentation.getNodeProgressPresentation(node, state.getNodeViewState(node)).kind, "available");
  state.markExplored(node);
  assert.equal(presentation.getNodeProgressPresentation(node, state.getNodeViewState(node)).kind, "explored");
  state.chooseRoute(node);
  assert.equal(presentation.getNodeProgressPresentation(node, state.getNodeViewState(node)).kind, "pending");
  state.completeNode(node);
  assert.equal(presentation.getNodeProgressPresentation(node, state.getNodeViewState(node)).marker, "✓");
  const restored = createExplorationState();
  restored.setLevels(levels);
  restored.importSessionState(state.exportSessionState());
  assert.equal(presentation.getNodeProgressPresentation(node, restored.getNodeViewState(node)).kind, "completed");
  assert.equal(restored.canOpenNode(node), true);
});

test("a legacy chosen node is not presented as a pending or won encounter", () => {
  const levels = chain();
  const state = createExplorationState();
  state.setLevels(levels);
  state.chooseRoute(levels[0][0]);
  assert.equal(typeof presentation.getNodeProgressPresentation, "function");
  const status = presentation.getNodeProgressPresentation(levels[0][0], state.getNodeViewState(levels[0][0]));
  assert.equal(status.kind, "chosen");
  assert.equal(status.marker, null);
});

test("guidance follows the existing choice, completion and floor advance permissions", () => {
  const levels = chain([3, 3]);
  levels.flat().forEach(n => { n.requiresCompletion = true; });
  const state = createExplorationState();
  state.setLevels(levels);
  assert.equal(typeof presentation.getNodeMapGuidance, "function");
  assert.match(presentation.getNodeMapGuidance(levels, state, true), /Escolha um nodo/);
  state.chooseRoute(levels[0][0]);
  assert.match(presentation.getNodeMapGuidance(levels, state, true), /Conclua o encontro/);
  state.completeNode(levels[0][0]);
  assert.match(presentation.getNodeMapGuidance(levels, state, true), /Escolha um nodo/);
  state.chooseRoute(levels[1][0]);
  state.completeNode(levels[1][0]);
  assert.match(presentation.getNodeMapGuidance(levels, state, true), /Andar concluído/);
  assert.equal(presentation.getNodeMapGuidance(levels, state, false), "Etapa concluída.");
  assert.match(presentation.getNodeMapGuidance(levels, state, true, false), /Gere o mapa do andar selecionado/);
});

test("audited core-book roles and the new Ameaças variants reach the catalog", () => {
  assert.equal(getCreatureById("turba-zumbi").role, "minion");
  assert.equal(getCreatureById("enxame-kobold").role, "solo");
  assert.equal(getCreatureById("reishid-livro-basico").role, "special");
  const pages = {
    "bufalo-de-guerra": 297, hippossauro: 297, "manticora-ameacas-de-arton": 298,
    "manticora-primal": 298, "otyugh-ameacas-de-arton": 299, "horda-de-otyughs": 299,
    "yidishan-bugbear": 300, "raposa-bucaneira": 301,
    "bufalo-paladino-de-bullton": 302, "coruja-druida": 302,
    cerianthar: 307, "grande-tachygloss": 308, oxxdon: 308, "oxxdon-imenso": 309,
    "razza-kham": 309, "serpe-ameacas-de-arton": 310, "serpe-ancia": 310,
    "uraghian-jovem": 311, "uraghian-adulto": 311, kaiju: 313,
    canceronte: 315, "canceronte-de-guerra": 315, "elfo-do-mar-pescador": 316, "elfo-do-mar-chefe": 316,
    "elfo-do-mar-druida": 317, "enguia-rainha": 317, irukanjin: 319, "agua-viva": 319,
    "enxame-de-aguas-vivas": 319, "agua-viva-gigante": 319, nereida: 320, "peixe-recife": 321,
    platan: 322, selako: 322, "selako-tigre": 323, "cardume-de-selakos": 323, "mega-selako": 323,
    pliorex: 325, "pliorex-abissal": 325, kraken: 325,
    "iniciada-de-sszzaas": 326, "cultista-de-sszzaas-ameacas-de-arton": 327,
    "elemental-do-veneno-pequeno": 328, "elemental-do-veneno-medio": 328, "elemental-do-veneno-grande": 329,
    gorgona: 329, "gorgona-matriarca": 330, "nagah-mistica-ameacas-de-arton": 331, "nagah-encantadora": 331,
    "nagah-dormente": 332, "hynne-dormente": 332, "nagah-defensor": 332, "nagah-retalhador": 333,
    "nagah-sacerdotisa": 334, "zumbi-peconha": 335, nastarrath: 336, "sszzaazita-celebrante": 337,
    "arcanista-finntroll": 338, defeituoso: 340, "mycotann-labutador": 341, "mycotann-druida": 341,
    "horda-mycotann": 341, "finntroll-cacador-ameacas-de-arton": 342, "finntroll-feitor-ameacas-de-arton": 342,
    "finntroll-senhor-de-estabulo": 342, "perdigueiro-troll": 343, "protetor-refem": 344,
    "cavaleiro-finntroll": 345, "sacerdote-finntroll": 347, "alto-sacerdote-finntroll": 347,
    carcaju: 348, "golem-de-nor-grande": 349, "golem-de-nor-enorme": 349, mamute: 350,
    lyuba: 351, "minotauro-da-manada": 352, "minotauro-chefe-da-manada": 352, "ogro-furioso": 353,
    keylor: 353, "urso-das-neves": 355, "verme-do-gelo-larva": 357, "verme-do-gelo-adulto": 357
  };
  for (const [id, page] of Object.entries(pages)) {
    const creature = getCreatureById(id);
    assert.ok(creature, id);
    assert.equal(creature.source.pdfPage, page + 2, id);
    assert.equal(creature.source.bookPage, page, id);
    assert.equal(creature.roleSource, "pdf-review", id);
  }
  for (const id of ["manticora", "otyugh", "serpe", "nagah-mistica", "cultista-de-sszzaas", "finntroll-cacador", "finntroll-feitor"]) {
    const variant = getCreatureById(`${id}-ameacas-de-arton`);
    assert.equal(variant.variantOf, id);
    assert.match(formatCreatureCatalogName(variant), / · Ameaças de Arton$/);
    assert.ok(getAutomaticCreatureCatalog(profile).some(creature => creature.id === id));
    assert.ok(!getAutomaticCreatureCatalog(profile).includes(variant));
  }
});

test("the creature sheet shows published group rules and confirmed magical abilities", async () => {
  const { createCreatureDetail } = await import("../src/nodeDialog.js");
  const previousDocument = globalThis.document;
  globalThis.document = {
    createElement() {
      return {
        children: [],
        appendChild(child) { this.children.push(child); }
      };
    }
  };
  try {
    function sheetText(id) {
      const creature = getCreatureById(id);
      const sheet = createCreatureDetail({
        creatureId: id,
        name: creature.name,
        typeLabel: creature.type,
        roleLabel: "Papel salvo anteriormente",
        challengeLabel: creature.challengeRating,
        quantity: 1
      });
      function read(element) {
        return [element.textContent, ...element.children.map(read)].join(" ");
      }
      return read(sheet);
    }
    assert.match(sheetText("horda-de-otyughs"), /Bando.*Defesa por 10/);
    assert.match(sheetText("enxame-kobold"), /Enxame.*condição ruim para lançar magias/);
    assert.match(sheetText("coruja-druida"), /Chamado da Dama Altiva \(Padrão\) · Mágica/);
    assert.match(sheetText("coruja-druida"), /Comunhão com a Natureza \(Completa, 6 PM\)/);
    assert.match(sheetText("turba-zumbi"), /Lacaio/);
    assert.match(sheetText("bruxa-goblin"), /Raio Conspurcado.*Mágica/);
    assert.match(sheetText("bruxa-goblin"), /Tentáculos de Trevas\*/);
    assert.match(sheetText("gigante-maximo"), /PONTOS DE VIDA\s+Especial \(veja Grande Demais\)/);
    assert.match(sheetText("vagalhao-kobold"), /FORT —, REF —, VON —/);
    assert.match(sheetText("luminar-deuses-de-arton"), /DEFESA\s+—, FORT —, REF —, VON —, imunidade a dano/);
    assert.match(sheetText("luminar-deuses-de-arton"), /PONTOS DE VIDA\s+—/);
    const rival = sheetText("rival-espelho");
    assert.doesNotMatch(rival, /INICIATIVA|DEFESA|PONTOS DE VIDA|undefined/);
    assert.match(rival, /Transferir Dor.*Mágica/);
  } finally {
    globalThis.document = previousDocument;
  }
});

test("divine abyssal sheets preserve references, printed roles and special ND", () => {
  const sheets = {
    aucharai: [253, 253, 6, "solo"], "trio-de-carvarel": [253, 253, 8, "solo"],
    diabrete: [254, 254, 2, "minion"], "diabrete-negociante": [254, 254, 4, "special"],
    jhumariel: [255, 256, 10, "solo"], margharon: [256, 256, 14, "special"],
    rhayrivel: [258, 258, 7, "solo"], sucubo: [259, 259, 5, "special"],
    abahddon: [260, 261, "S", "solo"], lamashtu: [263, 263, "S", "solo"]
  };
  for (const [id, [page, end, nd, role]] of Object.entries(sheets)) {
    const creature = getCreatureById(id);
    assert.ok(creature, id);
    assert.equal(creature.source.pdfFile, "T20 Deuses de Arton.pdf", id);
    assert.equal(creature.source.pdfPage, page + 2, id);
    assert.equal(creature.source.pdfPageEnd ?? creature.source.pdfPage, end + 2, id);
    assert.equal(creature.challengeRating, nd, id);
    assert.equal(creature.role, role, id);
    assert.equal(creature.roleSource, "pdf-review", id);
  }
  assert.ok(getCreatureById("aucharai").abilities.find(a => a.name === "Escurecer Olhos").magical);
  assert.equal(getCreatureById("lamashtu").stats.hitPoints, 2500);
  assert.equal(getCreatureById("abahddon").stats.manaPoints, 156);
});

test("Deuses aspects show the printed sheets and their shared invocation ritual", () => {
  const sheets = {
    "aspecto-de-allihanna": [265, 265, 5, "animal"],
    "aspecto-de-kallyadranoch": [267, 267, 6, "monster"],
    "aspecto-de-khalmyr": [269, 269, 5, "humanoid"],
    "aspecto-de-lin-wu": [269, 270, 4, "spirit"],
    "aspecto-de-marah": [271, 272, 4, "spirit"],
    "aspecto-de-valkaria": [273, 273, 5, "humanoid"]
  };
  for (const [id, [page, end, nd, type]] of Object.entries(sheets)) {
    const creature = getCreatureById(id);
    assert.ok(creature, id);
    assert.equal(creature.source.book, "Deuses de Arton", id);
    assert.equal(creature.source.pdfPage, page + 2, id);
    assert.equal(creature.source.pdfPageEnd ?? creature.source.pdfPage, end + 2, id);
    assert.equal(creature.challengeRating, nd, id);
    assert.equal(creature.type, type, id);
    assert.equal(creature.role, "solo", id);
    const ritual = creature.abilities.find(ability => ability.name === "Invocando Aspectos");
    assert.match(ritual?.text ?? "", new RegExp(`Religião CD ${25 + nd}`), id);
    assert.match(ritual.text, /Celebrar Ritual.*1 hora.*10 PM.*T\$ 3\.000/, id);
  }
  assert.equal(getCreatureById("aspecto-de-marah").actions.length, 0);
  assert.equal(getCreatureById("aspecto-de-lin-wu").stats.manaPoints, 36);
  assert.ok(getCreatureById("aspecto-de-khalmyr").abilities.find(ability => ability.name === "Cura pelas Mãos").magical);
});

test("celestial and inevitable sheets retain printed roles, page spans and common rules", () => {
  const sheets = {
    pilly: [274, 275, 3, "minion"], protetor: [276, 276, 7, "solo"], shiradi: [277, 277, 7, "solo"],
    pegaso: [280, 280, 3, "solo"], "pegaso-de-khalmyr": [280, 280, 15, "solo"],
    muhir: [282, 282, 15, "solo"], orel: [283, 283, 16, "special"], "furia-extrema": [284, 284, 20, "solo"],
    fado: [279, 279, 8, "solo"], probo: [279, 279, 11, "special"], parcus: [279, 279, 14, "solo"]
  };
  for (const [id, [page, end, nd, role]] of Object.entries(sheets)) {
    const creature = getCreatureById(id);
    assert.ok(creature, id);
    assert.equal(creature.source.pdfFile, "T20 Deuses de Arton.pdf", id);
    assert.equal(creature.source.pdfPage, page + 2, id);
    assert.equal(creature.source.pdfPageEnd ?? creature.source.pdfPage, end + 2, id);
    assert.equal(creature.challengeRating, nd, id);
    assert.equal(creature.role, role, id);
    assert.equal(creature.roleSource, "pdf-review", id);
  }
  for (const id of ["fado", "probo", "parcus"]) {
    const { abilities } = getCreatureById(id);
    assert.ok(abilities.find(ability => ability.name === "Encontrar o Culpado")?.magical, id);
    assert.match(abilities.find(ability => ability.name === "Investir a Culpa")?.text ?? "", /\+2d6.*luz/, id);
    assert.match(abilities.find(ability => ability.name === "Visão da Justiça")?.text ?? "", /Visão da Verdade/, id);
  }
  assert.equal(getCreatureById("probo").abilities.find(ability => ability.name === "Negar Recurso").cost, "3 PM");
});

test("Deuses fey sheets retain printed roles, references and supernatural abilities", () => {
  const sheets = {
    driade: [286, 287, 4], "duende-menor": [288, 288, 1], "duende-maior": [288, 288, 5],
    dragonete: [289, 289, 4], naiade: [290, 290, 3], ninfa: [291, 291, 6],
    "satiro-arqueiro": [292, 293, 2], "silfide-travessa": [293, 294, 1],
    "silfide-encantadora": [294, 294, 8], "velha-bruxa": [294, 295, 9],
    "eiradaan-guardiao": [296, 296, 7], "eiradaan-nobre": [296, 297, 13]
  };
  for (const [id, [page, end, nd]] of Object.entries(sheets)) {
    const creature = getCreatureById(id);
    assert.ok(creature, id);
    assert.equal(creature.type, "spirit", id);
    assert.equal(creature.source.pdfFile, "T20 Deuses de Arton.pdf", id);
    assert.equal(creature.source.pdfPage, page + 2, id);
    assert.equal(creature.source.pdfPageEnd ?? creature.source.pdfPage, end + 2, id);
    assert.equal(creature.challengeRating, nd, id);
    assert.equal(creature.role, id === "satiro-arqueiro" ? "minion" : "special", id);
    assert.equal(creature.roleSource, "pdf-review", id);
  }
  const getAbility = (id, name) => getCreatureById(id).abilities.find(ability => ability.name === name);
  assert.ok(getAbility("dragonete", "Ladrão de Magias").magical);
  assert.equal(getAbility("silfide-encantadora", "Enganadora Nata").cost, "3 PM");
  assert.match(getAbility("satiro-arqueiro", "Flautista Mágico").text, /sem gastar PM/);
  assert.match(getAbility("eiradaan-nobre", "Montaria Celestial").text, /15m/);
});

test("Deuses genie sheets include their printed stats and shared pact rules", () => {
  const sheets = {
    yazzu: [299, 299, 10, 72], jairuan: [300, 300, 6, 41], gizzehi: [301, 302, 12, 85],
    allaraz: [302, 303, 14, 113], kemooz: [304, 304, 9, 57], dabbus: [304, 305, 15, 98]
  };
  for (const [id, [page, end, nd, mana]] of Object.entries(sheets)) {
    const creature = getCreatureById(id);
    assert.ok(creature, id);
    assert.equal(creature.source.pdfFile, "T20 Deuses de Arton.pdf", id);
    assert.equal(creature.source.pdfPage, page + 2, id);
    assert.equal(creature.source.pdfPageEnd ?? creature.source.pdfPage, end + 2, id);
    assert.equal(creature.challengeRating, nd, id);
    assert.equal(creature.role, "special", id);
    assert.equal(creature.stats.manaPoints, mana, id);
    const ability = name => creature.abilities.find(entry => entry.name === name);
    assert.match(ability("Dentro de uma Lampadazinha")?.text ?? "", /1 PM.*pacto/);
    assert.equal(ability("Poderes Cósmicos Fenomenais")?.timing, "completa");
    assert.match(ability("Servo dos Deuses")?.text ?? "", /Viagem Planar.*sem componente material.*apenas em si/);
  }
  const protect = getCreatureById("allaraz").abilities.find(ability => ability.name === "Proteger Criação");
  assert.equal(protect.cost, "10 PM");
  assert.ok(protect.magical);
});

test("Deuses giants retain printed roles, references and special hit points", () => {
  const sheets = {
    "galokk-capanga": [307, 307, 6, "minion"], "galokk-guarda-costas": [307, 307, 10, "minion"],
    "gigante-bicefalo": [308, 308, 13, "solo"], "gigante-das-colinas": [309, 309, 7, "solo"],
    "gigante-do-fogo": [310, 310, 11, "special"], "gigante-das-rochas": [311, 311, 9, "solo"],
    "gigante-do-gelo": [311, 312, 9, "solo"], "gigante-dos-mares": [312, 312, 9, "solo"],
    "gigante-real": [313, 313, 19, "solo"], "gigante-maximo": [314, 315, "S+", "solo"]
  };
  for (const [id, [page, end, nd, role]] of Object.entries(sheets)) {
    const creature = getCreatureById(id);
    assert.ok(creature, id);
    assert.equal(creature.source.pdfFile, "T20 Deuses de Arton.pdf", id);
    assert.equal(creature.source.pdfPage, page + 2, id);
    assert.equal(creature.source.pdfPageEnd ?? creature.source.pdfPage, end + 2, id);
    assert.equal(creature.challengeRating, nd, id);
    assert.equal(creature.role, role, id);
  }
  const max = getCreatureById("gigante-maximo");
  assert.equal(max.stats.hitPoints, null);
  assert.equal(max.stats.hitPointsText, "Especial (veja Grande Demais)");
  assert.match(max.abilities.find(a => a.name === "Grande Demais").text, /3\.000 PV/);
  for (const id of ["gigante-das-rochas", "gigante-do-gelo", "gigante-dos-mares"]) {
    assert.match(getCreatureById(id).abilities.find(a => a.name.startsWith("Barril Gigante")).text, /Aguardente.*Sidra.*Vinho/, id);
  }
});

test("Deuses avatars retain their printed roles, ND and full PDF references", () => {
  const sheets = {
    "avatar-de-allihanna-deuses-de-arton": [155, 20, "solo", 1200],
    "avatar-de-arsenal-deuses-de-arton": [159, 18, "solo", 1080],
    "avatar-de-azgher-deuses-de-arton": [163, "S", "solo", 2752],
    "avatar-de-hyninn-deuses-de-arton": [167, 19, "special", 798],
    "avatar-de-khalmyr-deuses-de-arton": [175, "S", "solo", 2500],
    "avatar-de-lena-deuses-de-arton": [179, 20, "special", 900],
    "avatar-de-lin-wu-deuses-de-arton": [183, 19, "solo", 1284],
    "avatar-de-marah-deuses-de-arton": [187, 19, "special", 789],
    "avatar-de-megalokk-deuses-de-arton": [191, 20, "solo", 1800],
    "avatar-do-oceano-deuses-de-arton": [199, "S", "solo", 2500],
    "avatar-de-sszzaas-deuses-de-arton": [203, 19, "solo", 1007],
    "avatar-de-tanna-toh-deuses-de-arton": [207, 20, "special", 953],
    "avatar-de-tenebra-deuses-de-arton": [211, "S", "special", 1750],
    "avatar-de-nimb-deuses-de-arton": [195, "S+", "solo", 4777],
    "avatar-de-thwor-deuses-de-arton": [215, 18, "solo", 1100],
    "avatar-de-thyatis-deuses-de-arton": [219, 19, "solo", 1140],
    "avatar-de-valkaria-deuses-de-arton": [223, "S+", "solo", 3800],
    "avatar-de-wynna-deuses-de-arton": [227, "S", "special", 1800]
  };
  for (const [id, [page, nd, role, pv]] of Object.entries(sheets)) {
    const creature = getCreatureById(id);
    assert.ok(creature, id);
    assert.equal(creature.source.pdfFile, "T20 Deuses de Arton.pdf", id);
    assert.equal(creature.source.pdfPage, page + 2, id);
    assert.equal(creature.challengeRating, nd, id);
    assert.equal(creature.role, role, id);
    assert.equal(creature.stats.hitPoints, pv, id);
    if (creature.stats.defensesText.includes("maior que a morte")) {
      assert.match(creature.abilities.find(a => a.name === "Maior que a Morte")?.text ?? "", /metade dos PV/);
    }
  }
  const avatar = getCreatureById("avatar-de-allihanna-deuses-de-arton");
  assert.match(avatar.abilities.find(a => a.name === "Arsenal Natural").text, /Cauda.*Tentáculo/);
  assert.ok(avatar.abilities.find(a => a.name === "Forma Natural").magical);
  const nimb = getCreatureById("avatar-de-nimb-deuses-de-arton");
  assert.equal(nimb.stats.perception, "1d20+21");
  assert.equal(nimb.stats.attributes.wis, "1d20");
  const thwor = getCreatureById("avatar-de-thwor-deuses-de-arton");
  assert.match(thwor.abilities.find(a => a.name === "Encarnação do Mundo Como Deve Ser").text, /Início \(Padrão\).*Habilidade mágica.*Vida\. O Avatar recebe cura acelerada 20\. Habilidade mágica\./);
  const wynna = getCreatureById("avatar-de-wynna-deuses-de-arton");
  assert.equal(wynna.abilities.filter(a => a.magical).length, 5);
});

test("unrated ND sheets are special and never drawn", async () => {
  const { isSpecialChallengeRating, getChallengeRatingForStatistics } = await import("../src/challenge.js");
  for (const nd of ["–", "?"]) {
    assert.equal(isSpecialChallengeRating(nd), true, nd);
    assert.equal(calculateCombatND([{ challengeRating: nd, quantity: 1 }]), nd);
    assert.equal(getChallengeRatingForStatistics(nd), null, nd);
  }
  assert.equal(getChallengeRatingForStatistics("S+"), 20);
  const unrated = ["luminar-deuses-de-arton", "rival-espelho"];
  for (const id of unrated) assert.ok(getCreatureById(id), id);
  const drawn = new Set();
  for (let floor = 11; floor <= 20; floor++) {
    for (let index = 0; index < 5; index++) {
      const seed = `unrated-${floor}-${index}`;
      for (const node of map(floor, seed).flat()) {
        resolveNodeEncounter(node, { mapSeed: seed, profile });
        for (const item of node.resolvedEncounter?.items ?? []) drawn.add(item.creatureId);
      }
    }
  }
  assert.ok(drawn.size > 20);
  for (const id of unrated) assert.equal(drawn.has(id), false, id);
});

test("Luminar and Rival Espelho keep their printed ND and references", () => {
  const luminar = getCreatureById("luminar-deuses-de-arton");
  assert.deepEqual([luminar.challengeRating, luminar.role, luminar.type, luminar.subtype, luminar.size], ["–", "special", "spirit", "celestial", "Minúsculo"]);
  assert.deepEqual([luminar.source.pdfFile, luminar.source.bookPage, luminar.source.pdfPage], ["T20 Deuses de Arton.pdf", 275, 277]);
  assert.deepEqual([luminar.stats.hitPoints, luminar.stats.hitPointsText, luminar.stats.initiative, luminar.stats.perception], [null, "—", 12, 8]);
  assert.deepEqual(luminar.abilities.filter(a => a.magical).map(a => a.name), ["Abençoar", "Aliviar"]);
  const rival = getCreatureById("rival-espelho");
  assert.deepEqual([rival.challengeRating, rival.role, rival.type, rival.size, rival.treasure], ["?", null, "???", null, "Nenhum."]);
  assert.deepEqual([rival.source.pdfFile, rival.source.bookPage, rival.source.pdfPage], ["T20 Ameacas de Arton.pdf", 335, 337]);
  assert.ok(rival.abilities.find(a => a.name === "Transferir Dor").magical);
});

test("combat ND with several special or unrated sheets never becomes NaN", () => {
  const nd = items => calculateCombatND(items.map(([challengeRating, quantity = 1]) => ({ challengeRating, quantity })));
  assert.equal(nd([["S", 2]]), "S");
  assert.equal(nd([["S"], [3]]), "S");
  assert.equal(nd([["S"], ["S+"]]), "S+");
  assert.equal(nd([["–", 2]]), "–");
  assert.equal(nd([["?"], ["S+"]]), "?");
  assert.equal(nd([["–"], [5]]), "?");
  assert.equal(nd([[3], [3]]), 5);
});
