import { formatChallengeRating } from "./challenge.js";
import { pickWeighted } from "./random.js";

export const TRAP_SOURCES = {
  livroBasico: {
    id: "livroBasico",
    book: "Livro Básico",
    pdfFile: "armadilhas.pdf"
  },
  ameacasArton: {
    id: "ameacasArton",
    book: "Ameaças de Arton",
    pdfFile: "armadilhas ameaças de arton.pdf"
  }
};

export const TRAP_ROLE_TYPES = {
  primary: {
    id: "primary",
    label: "Principal",
    description: "A armadilha ocupa a maior parte ou todo o orçamento base do encontro."
  },
  incidental: {
    id: "incidental",
    label: "Incidental",
    description: "A armadilha consome parte menor do orçamento base e acompanha criaturas ou outro desafio."
  }
};

function source(sourceId, pdfPage, bookPage) {
  return { ...TRAP_SOURCES[sourceId], pdfPage, bookPage };
}

function trap({
  id,
  name,
  challengeRating,
  effect,
  category = "mechanical",
  damageTypes = [],
  area = null,
  save = null,
  detection = null,
  disable = null,
  source: trapSource,
  tags = []
}) {
  return {
    id,
    name,
    challengeRating,
    challengeLabel: formatChallengeRating(challengeRating),
    category,
    damageTypes,
    area,
    effect,
    save,
    detection,
    disable,
    source: trapSource,
    tags
  };
}

export const BASIC_BOOK_TRAPS = [
  trap({
    id: "agulha-envenenada",
    name: "Agulha Envenenada",
    challengeRating: 0.25,
    effect: "Causa perfuração leve e perda de PV por veneno.",
    damageTypes: ["piercing"],
    save: { ability: "Reflexos", dc: 20, effect: "evita" },
    detection: { skill: "Investigação", dc: 25 },
    disable: { skill: "Ladinagem", dc: 20 },
    source: source("livroBasico", 1, 317),
    tags: ["veneno"]
  }),
  trap({
    id: "arame-farpado",
    name: "Arame Farpado",
    challengeRating: 0.25,
    effect: "Conta como terreno difícil e causa dano de corte em quem atravessa.",
    damageTypes: ["slashing"],
    detection: { skill: "Investigação", dc: 10 },
    disable: { skill: "Ladinagem", dc: 20 },
    source: source("livroBasico", 1, 317)
  }),
  trap({
    id: "fosso-camuflado",
    name: "Fosso Camuflado",
    challengeRating: 0.25,
    effect: "Queda de 3m causa dano de impacto; exige Atletismo para escalar de volta.",
    damageTypes: ["bludgeoning"],
    save: { ability: "Reflexos", dc: 20, effect: "evita" },
    detection: { skill: "Investigação", dc: 20 },
    disable: { skill: "Ladinagem", dc: 20 },
    source: source("livroBasico", 1, 317),
    tags: ["fosso"]
  }),
  trap({
    id: "rede",
    name: "Rede",
    challengeRating: 0.25,
    effect: "A criatura fica agarrada até escapar com ação completa e Acrobacia.",
    category: "control",
    save: { ability: "Reflexos", dc: 20, effect: "evita" },
    detection: { skill: "Investigação", dc: 20 },
    disable: { skill: "Ladinagem", dc: 20 },
    source: source("livroBasico", 1, 317),
    tags: ["agarrado"]
  }),
  trap({
    id: "virote",
    name: "Virote",
    challengeRating: 0.25,
    effect: "Dispara um virote que causa dano de perfuração.",
    damageTypes: ["piercing"],
    save: { ability: "Reflexos", dc: 20, effect: "evita" },
    detection: { skill: "Investigação", dc: 25 },
    disable: { skill: "Ladinagem", dc: 20 },
    source: source("livroBasico", 1, 317)
  }),
  trap({
    id: "fosso-profundo",
    name: "Fosso Profundo",
    challengeRating: 0.5,
    effect: "Queda de 6m causa dano de impacto; exige Atletismo para escalar de volta.",
    damageTypes: ["bludgeoning"],
    save: { ability: "Reflexos", dc: 20, effect: "evita" },
    detection: { skill: "Investigação", dc: 20 },
    disable: { skill: "Ladinagem", dc: 20 },
    source: source("livroBasico", 1, 317),
    tags: ["fosso"]
  }),
  trap({
    id: "lamina-na-parede",
    name: "Lâmina na Parede",
    challengeRating: 0.5,
    effect: "Lâmina oculta causa dano de corte.",
    damageTypes: ["slashing"],
    save: { ability: "Reflexos", dc: 20, effect: "evita" },
    detection: { skill: "Investigação", dc: 25 },
    disable: { skill: "Ladinagem", dc: 20 },
    source: source("livroBasico", 1, 317)
  }),
  trap({
    id: "bloco-de-pedra",
    name: "Bloco de Pedra",
    challengeRating: 1,
    effect: "Bloco pesado cai ou se desloca, causando dano de impacto.",
    damageTypes: ["bludgeoning"],
    save: { ability: "Reflexos", dc: 20, effect: "evita" },
    detection: { skill: "Investigação", dc: 20 },
    disable: { skill: "Ladinagem", dc: 20 },
    source: source("livroBasico", 1, 317)
  }),
  trap({
    id: "pendulo-de-teto",
    name: "Pêndulo de Teto",
    challengeRating: 1,
    effect: "Pêndulo cortante atinge a vítima.",
    damageTypes: ["slashing"],
    save: { ability: "Reflexos", dc: 25, effect: "evita" },
    detection: { skill: "Investigação", dc: 25 },
    disable: { skill: "Ladinagem", dc: 20 },
    source: source("livroBasico", 1, 317)
  }),
  trap({
    id: "fosso-com-estacas",
    name: "Fosso com Estacas",
    challengeRating: 2,
    effect: "Queda em fosso causa dano de impacto e estacas causam perfuração.",
    damageTypes: ["bludgeoning", "piercing"],
    save: { ability: "Reflexos", dc: 20, effect: "evita" },
    detection: { skill: "Investigação", dc: 20 },
    disable: { skill: "Ladinagem", dc: 20 },
    source: source("livroBasico", 1, 317),
    tags: ["fosso"]
  }),
  trap({
    id: "runa-de-protecao",
    name: "Runa de Proteção",
    challengeRating: 2,
    effect: "Explode em energia numa área curta ao redor da ativação.",
    category: "magical",
    damageTypes: ["fire", "acid", "electricity", "cold", "light", "darkness"],
    area: "3m",
    save: { ability: "Reflexos", dc: 20, effect: "reduz à metade" },
    detection: { skill: "Investigação", dc: 25 },
    disable: { skill: "Ladinagem", dc: 25 },
    source: source("livroBasico", 1, 317),
    tags: ["runa", "area"]
  }),
  trap({
    id: "simbolo-do-medo",
    name: "Símbolo do Medo",
    challengeRating: 2,
    effect: "Criaturas em alcance curto ficam abaladas até o fim da cena.",
    category: "magical",
    save: { ability: "Vontade", dc: 20, effect: "evita" },
    detection: { skill: "Investigação", dc: 25 },
    disable: { skill: "Ladinagem", dc: 25 },
    source: source("livroBasico", 1, 317),
    tags: ["símbolo", "medo"]
  }),
  trap({
    id: "estatua-executora",
    name: "Estátua Executora",
    challengeRating: 3,
    effect: "Executa dois golpes de corte contra a vítima.",
    damageTypes: ["slashing"],
    save: { ability: "Reflexos", dc: 25, effect: "cada teste evita um dano" },
    detection: { skill: "Investigação", dc: 20 },
    disable: { skill: "Ladinagem", dc: 20 },
    source: source("livroBasico", 2, 318)
  }),
  trap({
    id: "gas-venenoso",
    name: "Gás Venenoso",
    challengeRating: 3,
    effect: "Causa perda de PV por veneno durante algumas rodadas.",
    category: "gas",
    save: { ability: "Fortitude", dc: 20, effect: "reduz à metade" },
    detection: { skill: "Investigação", dc: 25 },
    disable: { skill: "Ladinagem", dc: 25 },
    source: source("livroBasico", 2, 318),
    tags: ["veneno"]
  }),
  trap({
    id: "simbolo-do-sono",
    name: "Símbolo do Sono",
    challengeRating: 3,
    effect: "Criaturas em alcance curto com poucos níveis caem inconscientes.",
    category: "magical",
    save: { ability: "Vontade", dc: 20, effect: "evita" },
    detection: { skill: "Investigação", dc: 25 },
    disable: { skill: "Ladinagem", dc: 25 },
    source: source("livroBasico", 2, 318),
    tags: ["símbolo", "sono"]
  }),
  trap({
    id: "parede-instavel",
    name: "Parede Instável",
    challengeRating: 4,
    effect: "Parede desaba causando dano de impacto em área.",
    damageTypes: ["bludgeoning"],
    area: "quadrado de 3m",
    save: { ability: "Reflexos", dc: 25, effect: "reduz à metade" },
    detection: { skill: "Investigação", dc: 20 },
    disable: { skill: "Ladinagem", dc: 20 },
    source: source("livroBasico", 2, 318),
    tags: ["area"]
  }),
  trap({
    id: "simbolo-da-dor",
    name: "Símbolo da Dor",
    challengeRating: 4,
    effect: "Criaturas em alcance curto sofrem penalidade em testes até o fim da cena.",
    category: "magical",
    save: { ability: "Fortitude", dc: 25, effect: "evita" },
    detection: { skill: "Investigação", dc: 30 },
    disable: { skill: "Ladinagem", dc: 30 },
    source: source("livroBasico", 2, 318),
    tags: ["símbolo"]
  }),
  trap({
    id: "bruma-da-insanidade",
    name: "Bruma da Insanidade",
    challengeRating: 5,
    effect: "Criaturas em uma área ficam confusas até o fim da cena.",
    category: "magical",
    area: "cubo de 6m",
    save: { ability: "Fortitude", dc: 20, effect: "evita" },
    detection: { skill: "Investigação", dc: 25 },
    disable: { skill: "Ladinagem", dc: 25 },
    source: source("livroBasico", 2, 318),
    tags: ["area", "confusão"]
  }),
  trap({
    id: "simbolo-do-atordoamento",
    name: "Símbolo do Atordoamento",
    challengeRating: 5,
    effect: "Criaturas em alcance curto ficam atordoadas por algumas rodadas.",
    category: "magical",
    save: { ability: "Fortitude", dc: 25, effect: "evita" },
    detection: { skill: "Investigação", dc: 30 },
    disable: { skill: "Ladinagem", dc: 30 },
    source: source("livroBasico", 2, 318),
    tags: ["símbolo", "atordoado"]
  }),
  trap({
    id: "desabamento-do-teto",
    name: "Desabamento do Teto",
    challengeRating: 6,
    effect: "Teto desaba causando dano de impacto em área grande.",
    damageTypes: ["bludgeoning"],
    area: "quadrado de 6m",
    save: { ability: "Reflexos", dc: 30, effect: "reduz à metade" },
    detection: { skill: "Investigação", dc: 25 },
    disable: { skill: "Ladinagem", dc: 25 },
    source: source("livroBasico", 2, 318),
    tags: ["area"]
  }),
  trap({
    id: "simbolo-da-insanidade",
    name: "Símbolo da Insanidade",
    challengeRating: 6,
    effect: "Criaturas em alcance curto ficam confusas permanentemente.",
    category: "magical",
    save: { ability: "Vontade", dc: 25, effect: "evita" },
    detection: { skill: "Investigação", dc: 30 },
    disable: { skill: "Ladinagem", dc: 30 },
    source: source("livroBasico", 2, 318),
    tags: ["símbolo", "confusão"]
  }),
  trap({
    id: "abismo-da-morte",
    name: "Abismo da Morte",
    challengeRating: 8,
    effect: "O chão se abre para uma queda longa sobre estacas.",
    damageTypes: ["bludgeoning", "piercing"],
    area: "quadrado de 6m",
    save: { ability: "Reflexos", dc: 30, effect: "evita" },
    detection: { skill: "Investigação", dc: 30 },
    disable: { skill: "Ladinagem", dc: 30 },
    source: source("livroBasico", 2, 318),
    tags: ["fosso", "area"]
  }),
  trap({
    id: "simbolo-da-morte",
    name: "Símbolo da Morte",
    challengeRating: 8,
    effect: "Criaturas em alcance curto são reduzidas a PV negativo ou sofrem dano de trevas.",
    category: "magical",
    damageTypes: ["darkness"],
    save: { ability: "Fortitude", dc: 30, effect: "reduz para dano de trevas" },
    detection: { skill: "Investigação", dc: 30 },
    disable: { skill: "Ladinagem", dc: 30 },
    source: source("livroBasico", 2, 318),
    tags: ["símbolo", "morte"]
  })
];

export const AMEACAS_ARTON_TRAPS = [
  trap({
    id: "armadilha-de-gaiola",
    name: "Armadilha de Gaiola",
    challengeRating: 0.5,
    effect: "Barras cercam um quadrado e prendem uma criatura; a gaiola pode ser aberta ou quebrada.",
    category: "control",
    area: "quadrado de 1,5m",
    detection: { skill: "Investigação", dc: 20 },
    disable: { skill: "Ladinagem", dc: 25 },
    source: source("ameacasArton", 1, 358),
    tags: ["prisão"]
  }),
  trap({
    id: "runa-de-aceleracao",
    name: "Runa de Aceleração",
    challengeRating: 1,
    effect: "Arremessa uma criatura; se ela atingir obstáculo, sofre dano de impacto pela distância percorrida.",
    category: "magical",
    damageTypes: ["bludgeoning"],
    save: { ability: "Fortitude", dc: 20, effect: "reduz a distância à metade" },
    detection: { skill: "Investigação", dc: 20 },
    disable: { skill: "Ladinagem", dc: 20 },
    source: source("ameacasArton", 1, 358),
    tags: ["runa", "movimento"]
  }),
  trap({
    id: "gas-putrido",
    name: "Gás Pútrido",
    challengeRating: 2,
    effect: "Criaturas em alcance curto ficam enjoadas por uma cena.",
    category: "gas",
    save: { ability: "Fortitude", dc: 20, effect: "reduz duração" },
    detection: { skill: "Investigação", dc: 25 },
    disable: { skill: "Ladinagem", dc: 25 },
    source: source("ameacasArton", 1, 358),
    tags: ["enjoado"]
  }),
  trap({
    id: "piso-eletrificado",
    name: "Piso Eletrificado",
    challengeRating: 2,
    effect: "Causa dano de eletricidade em área; criaturas molhadas ou com metal têm penalidade no teste.",
    damageTypes: ["electricity"],
    area: "quadrado de 3m",
    save: { ability: "Fortitude", dc: 20, effect: "reduz à metade" },
    detection: { skill: "Investigação", dc: 25 },
    disable: { skill: "Ladinagem", dc: 20 },
    source: source("ameacasArton", 1, 358),
    tags: ["area"]
  }),
  trap({
    id: "jato-de-chamas",
    name: "Jato de Chamas",
    challengeRating: 3,
    effect: "Causa dano de fogo em linha e deixa criaturas em chamas.",
    damageTypes: ["fire"],
    area: "linha de 6m",
    save: { ability: "Reflexos", dc: 25, effect: "reduz à metade e evita condição" },
    detection: { skill: "Investigação", dc: 25 },
    disable: { skill: "Ladinagem", dc: 25 },
    source: source("ameacasArton", 1, 358),
    tags: ["area", "em chamas"]
  }),
  trap({
    id: "extrato-de-oxxdon",
    name: "Extrato de Oxxdon",
    challengeRating: 5,
    effect: "Oxida objetos de metal e prejudica construtos de metal.",
    category: "alchemy",
    area: "nuvem de 3m de raio",
    save: { ability: "Reflexos/Fortitude", dc: 25, effect: "evita itens ou reduz efeito em construtos" },
    detection: { skill: "Investigação", dc: 20 },
    disable: { skill: "Ladinagem", dc: 20 },
    source: source("ameacasArton", 1, 358),
    tags: ["metal", "construto"]
  }),
  trap({
    id: "mina-terrestre",
    name: "Mina Terrestre",
    challengeRating: 5,
    effect: "Explode causando dano de impacto em uma esfera.",
    damageTypes: ["bludgeoning"],
    area: "esfera de 3m",
    save: { ability: "Reflexos", dc: 25, effect: "evita" },
    detection: { skill: "Investigação", dc: 25 },
    disable: { skill: "Ladinagem", dc: 25 },
    source: source("ameacasArton", 1, 358),
    tags: ["area", "explosão"]
  }),
  trap({
    id: "runa-de-teletransporte",
    name: "Runa de Teletransporte",
    challengeRating: 5,
    effect: "Transporta uma criatura próxima para uma superfície desocupada em alcance médio, geralmente prisão ou outra armadilha.",
    category: "magical",
    save: { ability: "Vontade", dc: 20, effect: "evita" },
    detection: { skill: "Investigação", dc: 25 },
    disable: { skill: "Ladinagem", dc: 20 },
    source: source("ameacasArton", 1, 358),
    tags: ["runa", "teletransporte"]
  }),
  trap({
    id: "simbolo-da-anulacao",
    name: "Símbolo da Anulação",
    challengeRating: 5,
    effect: "Dissipa magias em alcance curto e torna itens mágicos mundanos temporariamente.",
    category: "magical",
    save: { ability: "Vontade", dc: 25, effect: "evita" },
    detection: { skill: "Investigação", dc: 25 },
    disable: { skill: "Ladinagem", dc: 20 },
    source: source("ameacasArton", 2, 359),
    tags: ["símbolo", "antimagia"]
  }),
  trap({
    id: "estatua-de-gorgona",
    name: "Estátua de Górgona",
    challengeRating: 9,
    effect: "Petrifica criaturas em um cone à frente da estátua.",
    category: "magical",
    area: "cone de 9m",
    save: { ability: "Reflexos", dc: 25, effect: "evita" },
    detection: { skill: "Investigação", dc: 25 },
    disable: { skill: "Ladinagem", dc: 25 },
    source: source("ameacasArton", 2, 359),
    tags: ["petrificação"]
  }),
  trap({
    id: "runa-de-desintegracao",
    name: "Runa de Desintegração",
    challengeRating: 10,
    effect: "Causa dano de essência alto e pode desintegrar a vítima reduzida a 0 PV.",
    category: "magical",
    damageTypes: ["essence"],
    save: { ability: "Fortitude", dc: 30, effect: "reduz dano" },
    detection: { skill: "Investigação", dc: 30 },
    disable: { skill: "Ladinagem", dc: 30 },
    source: source("ameacasArton", 2, 359),
    tags: ["runa", "desintegração"]
  }),
  trap({
    id: "sussurro-de-sszzaas",
    name: "Sussurro de Sszzaas",
    challengeRating: 13,
    effect: "Manipula a mente de uma criatura para agir hostilmente contra aliados.",
    category: "magical",
    save: { ability: "Vontade", dc: 30, effect: "evita ou encerra no fim da rodada" },
    detection: { skill: "Investigação", dc: 30 },
    disable: { skill: "Ladinagem", dc: 30 },
    source: source("ameacasArton", 2, 359),
    tags: ["encantamento", "mente"]
  })
];

export const trapCatalog = [...BASIC_BOOK_TRAPS, ...AMEACAS_ARTON_TRAPS];

const NON_TRAP_ROOM_TYPES = new Set(["camp", "treasure"]);
const NON_TRAP_UNKNOWN_LABELS = new Set(["Acampamento", "Tesouro"]);
const CREATURE_ROOM_TYPES = new Set(["normal", "elite", "boss"]);

function roundToQuarter(value) {
  return Math.round(value * 4) / 4;
}

function getTrapRules(profile) {
  return profile.trapRules || {};
}

function isTrapNode(node) {
  return node.type === "trap" || (node.type === "unknown" && node.revealedLabel === "Armadilha");
}

function canHaveIncidentalTrap(node) {
  if (NON_TRAP_ROOM_TYPES.has(node.type)) return false;
  if (node.type === "unknown" && NON_TRAP_UNKNOWN_LABELS.has(node.revealedLabel)) return false;
  if (node.type === "unknown") return node.revealedLabel === "Encontro normal" || node.revealedLabel === "Encontro elite";

  return CREATURE_ROOM_TYPES.has(node.type);
}

function getIncidentalChance(node, rules) {
  const chanceByRoomType = rules.incidentalChanceByRoomType || {};

  if (node.type === "unknown") {
    if (node.revealedLabel === "Encontro elite") return chanceByRoomType.elite ?? 0;
    if (node.revealedLabel === "Encontro normal") return chanceByRoomType.normal ?? 0;
  }

  return chanceByRoomType[node.type] ?? rules.incidentalChance ?? 0;
}

function getTrapChallenge(node, role, rules) {
  const encounter = node.challenge?.encounter ?? 0;

  if (role === "primary") return encounter;

  const offset = rules.incidentalChallengeOffset ?? 1;
  const minimum = rules.minimumChallenge ?? 0.25;
  return Math.max(minimum, roundToQuarter(encounter - offset));
}

function getTrapWeight(trapEntry, targetChallenge) {
  const distance = Math.abs(trapEntry.challengeRating - targetChallenge);
  if (distance === 0) return 12;
  if (distance <= 0.5) return 8;
  if (distance <= 1) return 4;
  return 1;
}

function pickTrapForChallenge(targetChallenge, rules, rng) {
  const allowedSources = rules.sources || Object.keys(TRAP_SOURCES);
  const maximumChallenge = rules.maximumChallenge ?? targetChallenge;
  const candidates = trapCatalog.filter((trapEntry) =>
    trapEntry.challengeRating <= maximumChallenge &&
    trapEntry.challengeRating <= targetChallenge &&
    allowedSources.includes(trapEntry.source.id)
  );
  const fallbackCandidates = trapCatalog.filter((trapEntry) =>
    trapEntry.challengeRating <= maximumChallenge &&
    allowedSources.includes(trapEntry.source.id)
  );
  const options = (candidates.length > 0 ? candidates : fallbackCandidates)
    .map((trapEntry) => ({
      trap: trapEntry,
      weight: getTrapWeight(trapEntry, targetChallenge)
    }));

  return options.length > 0 ? pickWeighted(rng, options).trap : null;
}

export function getTrapById(id) {
  return trapCatalog.find((trapEntry) => trapEntry.id === id) || null;
}

export function getTrapsByChallengeRating(challengeRating) {
  return trapCatalog.filter((trapEntry) => trapEntry.challengeRating === challengeRating);
}

export function getTrapsBySource(sourceId) {
  return trapCatalog.filter((trapEntry) => trapEntry.source.id === sourceId);
}

export function assignTrapProfile(node, profile, rng) {
  const rules = getTrapRules(profile);
  let role = null;

  if (isTrapNode(node)) {
    role = "primary";
  } else if (canHaveIncidentalTrap(node) && rng() < getIncidentalChance(node, rules)) {
    role = "incidental";
  }

  if (!role) {
    node.trap = null;
    node.challenge.trap = 0;
    node.challenge.creatures = node.challenge.encounter;
    node.challenge.encounterBudgetLabel = `ND ${formatChallengeRating(node.challenge.encounter)} para criaturas`;
    return;
  }

  const targetChallenge = getTrapChallenge(node, role, rules);
  const selectedTrap = pickTrapForChallenge(targetChallenge, rules, rng);
  const trapChallenge = selectedTrap?.challengeRating ?? targetChallenge;
  const remainingCreatureChallenge = role === "primary"
    ? 0
    : Math.max(0, roundToQuarter(node.challenge.encounter - trapChallenge));

  node.trap = {
    ...selectedTrap,
    role,
    roleLabel: TRAP_ROLE_TYPES[role].label,
    roleDescription: TRAP_ROLE_TYPES[role].description,
    targetChallenge,
    targetChallengeLabel: formatChallengeRating(targetChallenge)
  };
  node.challenge.trap = roundToQuarter(trapChallenge);
  node.challenge.creatures = roundToQuarter(remainingCreatureChallenge);
  node.challenge.encounterBudgetLabel = role === "primary"
    ? `ND ${formatChallengeRating(node.challenge.trap)} em armadilha principal`
    : `ND ${formatChallengeRating(node.challenge.creatures)} em criaturas + ND ${formatChallengeRating(node.challenge.trap)} em armadilha`;
}
