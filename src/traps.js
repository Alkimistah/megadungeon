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
  additionalTests = [],
  notes = [],
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
    additionalTests,
    notes,
    source: trapSource,
    tags
  };
}

export const BASIC_BOOK_TRAPS = [
  trap({
    id: "agulha-envenenada",
    name: "Agulha Envenenada",
    challengeRating: 0.25,
    effect: "Causa 1 ponto de dano de perfuração e a vítima perde 1d12 PV por veneno.",
    damageTypes: ["piercing"],
    area: "criatura que disparou a armadilha",
    save: { ability: "Reflexos", dc: 20, effect: "evita" },
    detection: { skill: "Investigação", dc: 25 },
    disable: { skill: "Ladinagem", dc: 20 },
    source: source("livroBasico", 1, 317),
    tags: ["dano", "perfuração", "veneno"]
  }),
  trap({
    id: "arame-farpado",
    name: "Arame Farpado",
    challengeRating: 0.25,
    effect: "Conta como terreno difícil e causa 1d6+2 pontos de dano de corte em quem atravessá-lo.",
    damageTypes: ["slashing"],
    area: "área ocupada pelo arame",
    detection: { skill: "Investigação", dc: 10 },
    disable: { skill: "Ladinagem", dc: 20 },
    notes: ["O dano é causado em quem atravessa o arame."],
    source: source("livroBasico", 1, 317),
    tags: ["dano", "corte", "terreno difícil"]
  }),
  trap({
    id: "fosso-camuflado",
    name: "Fosso Camuflado",
    challengeRating: 0.25,
    effect: "Queda de 3m causa 2d6 pontos de dano de impacto.",
    damageTypes: ["bludgeoning"],
    area: "criatura que disparou a armadilha",
    save: { ability: "Reflexos", dc: 20, effect: "evita" },
    detection: { skill: "Investigação", dc: 20 },
    disable: { skill: "Ladinagem", dc: 20 },
    additionalTests: [
      { test: "Atletismo", dc: 20, purpose: "escalar de volta" }
    ],
    source: source("livroBasico", 1, 317),
    tags: ["fosso", "queda", "dano", "impacto"]
  }),
  trap({
    id: "rede",
    name: "Rede",
    challengeRating: 0.25,
    effect: "A criatura fica agarrada.",
    category: "control",
    area: "criatura que disparou a armadilha",
    save: { ability: "Reflexos", dc: 20, effect: "evita" },
    detection: { skill: "Investigação", dc: 20 },
    disable: { skill: "Ladinagem", dc: 20 },
    additionalTests: [
      { test: "Acrobacia", dc: 20, action: "ação completa", purpose: "escapar" }
    ],
    source: source("livroBasico", 1, 317),
    tags: ["controle", "agarrado", "rede"]
  }),
  trap({
    id: "virote",
    name: "Virote",
    challengeRating: 0.25,
    effect: "Causa 1d10+2 pontos de dano de perfuração.",
    damageTypes: ["piercing"],
    area: "criatura que disparou a armadilha",
    save: { ability: "Reflexos", dc: 20, effect: "evita" },
    detection: { skill: "Investigação", dc: 25 },
    disable: { skill: "Ladinagem", dc: 20 },
    source: source("livroBasico", 1, 317),
    tags: ["dano", "perfuração", "projétil"]
  }),
  trap({
    id: "fosso-profundo",
    name: "Fosso Profundo",
    challengeRating: 0.5,
    effect: "Queda de 6m causa 4d6 pontos de dano de impacto.",
    damageTypes: ["bludgeoning"],
    area: "criatura que disparou a armadilha",
    save: { ability: "Reflexos", dc: 20, effect: "evita" },
    detection: { skill: "Investigação", dc: 20 },
    disable: { skill: "Ladinagem", dc: 20 },
    additionalTests: [
      { test: "Atletismo", dc: 20, purpose: "escalar de volta" }
    ],
    source: source("livroBasico", 1, 317),
    tags: ["fosso", "queda", "dano", "impacto"]
  }),
  trap({
    id: "lamina-na-parede",
    name: "Lâmina na Parede",
    challengeRating: 0.5,
    effect: "Causa 2d6+5 pontos de dano de corte.",
    damageTypes: ["slashing"],
    area: "criatura que disparou a armadilha",
    save: { ability: "Reflexos", dc: 20, effect: "evita" },
    detection: { skill: "Investigação", dc: 25 },
    disable: { skill: "Ladinagem", dc: 20 },
    source: source("livroBasico", 1, 317),
    tags: ["dano", "corte", "lâmina"]
  }),
  trap({
    id: "bloco-de-pedra",
    name: "Bloco de Pedra",
    challengeRating: 1,
    effect: "Causa 6d6 pontos de dano de impacto.",
    damageTypes: ["bludgeoning"],
    area: "criatura que disparou a armadilha",
    save: { ability: "Reflexos", dc: 20, effect: "evita" },
    detection: { skill: "Investigação", dc: 20 },
    disable: { skill: "Ladinagem", dc: 20 },
    source: source("livroBasico", 1, 317),
    tags: ["dano", "impacto", "bloco"]
  }),
  trap({
    id: "pendulo-de-teto",
    name: "Pêndulo de Teto",
    challengeRating: 1,
    effect: "Causa 1d12+10 pontos de dano de corte.",
    damageTypes: ["slashing"],
    area: "criatura que disparou a armadilha",
    save: { ability: "Reflexos", dc: 25, effect: "evita" },
    detection: { skill: "Investigação", dc: 25 },
    disable: { skill: "Ladinagem", dc: 20 },
    source: source("livroBasico", 1, 317),
    tags: ["dano", "corte", "pêndulo"]
  }),
  trap({
    id: "fosso-com-estacas",
    name: "Fosso com Estacas",
    challengeRating: 2,
    effect: "Queda de 9m causa 6d6 pontos de dano de impacto, e as estacas causam 2d4+5 pontos de dano de perfuração.",
    damageTypes: ["bludgeoning", "piercing"],
    area: "criatura que disparou a armadilha",
    save: { ability: "Reflexos", dc: 20, effect: "evita" },
    detection: { skill: "Investigação", dc: 20 },
    disable: { skill: "Ladinagem", dc: 20 },
    additionalTests: [
      { test: "Atletismo", dc: 20, purpose: "escalar de volta" }
    ],
    source: source("livroBasico", 1, 317),
    tags: ["fosso", "queda", "dano", "impacto", "perfuração", "estacas"]
  }),
  trap({
    id: "runa-de-protecao",
    name: "Runa de Proteção",
    challengeRating: 2,
    effect: "Causa 6d6 pontos de dano de fogo (ou ácido, eletricidade, frio, luz ou trevas) em todas as criaturas a até 3m.",
    category: "magical",
    damageTypes: ["fire", "acid", "electricity", "cold", "light", "darkness"],
    area: "todas as criaturas a até 3m",
    save: { ability: "Reflexos", dc: 20, effect: "reduz à metade" },
    detection: { skill: "Investigação", dc: 25 },
    disable: { skill: "Ladinagem", dc: 25 },
    notes: ["A criatura que ativou a runa não tem direito ao teste de Reflexos.", "Por ser mágica, pode ser anulada com Dissipar Magia."],
    source: source("livroBasico", 1, 317),
    tags: ["mágica", "área", "dano", "fogo", "ácido", "eletricidade", "frio", "luz", "trevas"]
  }),
  trap({
    id: "simbolo-do-medo",
    name: "Símbolo do Medo",
    challengeRating: 2,
    effect: "Criaturas em alcance curto ficam abaladas até o fim da cena.",
    category: "magical",
    area: "alcance curto",
    save: { ability: "Vontade", dc: 20, effect: "evita" },
    detection: { skill: "Investigação", dc: 25 },
    disable: { skill: "Ladinagem", dc: 25 },
    notes: ["Por ser mágica, pode ser anulada com Dissipar Magia."],
    source: source("livroBasico", 1, 317),
    tags: ["mágica", "área", "medo", "abalado"]
  }),
  trap({
    id: "estatua-executora",
    name: "Estátua Executora",
    challengeRating: 3,
    effect: "Causa dois danos de 1d12+10 pontos de corte.",
    damageTypes: ["slashing"],
    area: "criatura que disparou a armadilha",
    save: { ability: "Reflexos", dc: 25, effect: "cada teste evita um dos danos" },
    detection: { skill: "Investigação", dc: 20 },
    disable: { skill: "Ladinagem", dc: 20 },
    notes: ["São feitos dois testes de Reflexos, um para cada dano."],
    source: source("livroBasico", 2, 318),
    tags: ["dano", "corte", "múltiplos ataques"]
  }),
  trap({
    id: "gas-venenoso",
    name: "Gás Venenoso",
    challengeRating: 3,
    effect: "A vítima perde 1d12 PV por veneno por rodada durante 2d4 rodadas.",
    category: "gas",
    area: "criatura que disparou a armadilha",
    save: { ability: "Fortitude", dc: 20, effect: "reduz à metade" },
    detection: { skill: "Investigação", dc: 25 },
    disable: { skill: "Ladinagem", dc: 25 },
    source: source("livroBasico", 2, 318),
    tags: ["veneno", "perda de PV", "dano contínuo"]
  }),
  trap({
    id: "simbolo-do-sono",
    name: "Símbolo do Sono",
    challengeRating: 3,
    effect: "Criaturas em alcance curto com 8 níveis ou menos caem inconscientes, como na magia Sono.",
    category: "magical",
    area: "alcance curto",
    save: { ability: "Vontade", dc: 20, effect: "evita" },
    detection: { skill: "Investigação", dc: 25 },
    disable: { skill: "Ladinagem", dc: 25 },
    notes: ["Funciona como a magia Sono.", "Por ser mágica, pode ser anulada com Dissipar Magia."],
    source: source("livroBasico", 2, 318),
    tags: ["mágica", "área", "sono", "inconsciente"]
  }),
  trap({
    id: "parede-instavel",
    name: "Parede Instável",
    challengeRating: 4,
    effect: "Causa 8d6 pontos de dano de impacto num quadrado de 3m de lado.",
    damageTypes: ["bludgeoning"],
    area: "quadrado de 3m de lado",
    save: { ability: "Reflexos", dc: 25, effect: "reduz à metade" },
    detection: { skill: "Investigação", dc: 20 },
    disable: { skill: "Ladinagem", dc: 20 },
    source: source("livroBasico", 2, 318),
    tags: ["área", "dano", "impacto"]
  }),
  trap({
    id: "simbolo-da-dor",
    name: "Símbolo da Dor",
    challengeRating: 4,
    effect: "Criaturas em alcance curto sofrem dores terríveis, que impõem –5 em todos os testes até o fim da cena.",
    category: "magical",
    area: "alcance curto",
    save: { ability: "Fortitude", dc: 25, effect: "evita" },
    detection: { skill: "Investigação", dc: 30 },
    disable: { skill: "Ladinagem", dc: 30 },
    notes: ["Por ser mágica, pode ser anulada com Dissipar Magia."],
    source: source("livroBasico", 2, 318),
    tags: ["mágica", "área", "penalidade", "dor"]
  }),
  trap({
    id: "bruma-da-insanidade",
    name: "Bruma da Insanidade",
    challengeRating: 5,
    effect: "Criaturas em um cubo de 6m de lado ficam confusas até o fim da cena.",
    category: "magical",
    area: "cubo de 6m de lado",
    save: { ability: "Fortitude", dc: 20, effect: "evita" },
    detection: { skill: "Investigação", dc: 25 },
    disable: { skill: "Ladinagem", dc: 25 },
    source: source("livroBasico", 2, 318),
    tags: ["área", "confuso", "insanidade"]
  }),
  trap({
    id: "simbolo-do-atordoamento",
    name: "Símbolo do Atordoamento",
    challengeRating: 5,
    effect: "Criaturas em alcance curto ficam atordoadas por 1d6 rodadas.",
    category: "magical",
    area: "alcance curto",
    save: { ability: "Fortitude", dc: 25, effect: "evita" },
    detection: { skill: "Investigação", dc: 30 },
    disable: { skill: "Ladinagem", dc: 30 },
    notes: ["Por ser mágica, pode ser anulada com Dissipar Magia."],
    source: source("livroBasico", 2, 318),
    tags: ["mágica", "área", "atordoado"]
  }),
  trap({
    id: "desabamento-do-teto",
    name: "Desabamento do Teto",
    challengeRating: 6,
    effect: "Causa 15d6 pontos de dano de impacto em todas as criaturas num quadrado de 6m de lado.",
    damageTypes: ["bludgeoning"],
    area: "todas as criaturas num quadrado de 6m de lado",
    save: { ability: "Reflexos", dc: 30, effect: "reduz à metade" },
    detection: { skill: "Investigação", dc: 25 },
    disable: { skill: "Ladinagem", dc: 25 },
    source: source("livroBasico", 2, 318),
    tags: ["área", "dano", "impacto", "desabamento"]
  }),
  trap({
    id: "simbolo-da-insanidade",
    name: "Símbolo da Insanidade",
    challengeRating: 6,
    effect: "Criaturas em alcance curto ficam confusas permanentemente.",
    category: "magical",
    area: "alcance curto",
    save: { ability: "Vontade", dc: 25, effect: "evita" },
    detection: { skill: "Investigação", dc: 30 },
    disable: { skill: "Ladinagem", dc: 30 },
    notes: ["Por ser mágica, pode ser anulada com Dissipar Magia."],
    source: source("livroBasico", 2, 318),
    tags: ["mágica", "área", "confuso", "permanente", "insanidade"]
  }),
  trap({
    id: "abismo-da-morte",
    name: "Abismo da Morte",
    challengeRating: 8,
    effect: "Um quadrado de 6m de lado no chão se abre para uma queda de 30m sobre estacas, causando 20d6 pontos de dano de impacto e 2d8+10 pontos de dano de perfuração.",
    damageTypes: ["bludgeoning", "piercing"],
    area: "quadrado de 6m de lado",
    save: { ability: "Reflexos", dc: 30, effect: "evita" },
    detection: { skill: "Investigação", dc: 30 },
    disable: { skill: "Ladinagem", dc: 30 },
    additionalTests: [
      { test: "Atletismo", dc: 25, purpose: "escalar de volta" }
    ],
    source: source("livroBasico", 2, 318),
    tags: ["fosso", "área", "queda", "dano", "impacto", "perfuração", "estacas"]
  }),
  trap({
    id: "simbolo-da-morte",
    name: "Símbolo da Morte",
    challengeRating: 8,
    effect: "Criaturas em alcance curto são reduzidas a –1 PV.",
    category: "magical",
    area: "alcance curto",
    save: { ability: "Fortitude", dc: 30, effect: "em vez de ser reduzida a –1 PV, sofre 10d6 pontos de dano de trevas" },
    detection: { skill: "Investigação", dc: 30 },
    disable: { skill: "Ladinagem", dc: 30 },
    notes: ["Por ser mágica, pode ser anulada com Dissipar Magia."],
    source: source("livroBasico", 2, 318),
    tags: ["mágica", "área", "morte", "trevas", "redução de PV"]
  })
];

export const AMEACAS_ARTON_TRAPS = [
  trap({
    id: "armadilha-de-gaiola",
    name: "Armadilha de Gaiola",
    challengeRating: 0.5,
    effect: "Barras de ferro cercam um quadrado de 1,5m, prendendo uma criatura em seu interior.",
    category: "control",
    area: "quadrado de 1,5m",
    detection: { skill: "Investigação", dc: 20 },
    disable: { skill: "Ladinagem", dc: 25 },
    additionalTests: [
      { test: "Força/Ladinagem", dc: 25, purpose: "abrir a gaiola" }
    ],
    notes: ["As grades têm RD 10 e 60 PV."],
    source: source("ameacasArton", 1, 358),
    tags: ["gaiola", "aprisionamento", "barreira", "metal"]
  }),
  trap({
    id: "runa-de-aceleracao",
    name: "Runa de Aceleração",
    challengeRating: 1,
    effect: "Uma criatura em alcance curto é arremessada 9m na direção em que estava se movendo. Se atingir uma parede ou outro objeto sólido, sofre 1d6 pontos de dano de impacto para cada 1,5m que percorreu.",
    category: "magical",
    damageTypes: ["bludgeoning"],
    area: "uma criatura em alcance curto",
    save: { ability: "Fortitude", dc: 20, effect: "reduz a distância do arremesso à metade" },
    detection: { skill: "Investigação", dc: 20 },
    disable: { skill: "Ladinagem", dc: 20 },
    notes: ["Armadilha mágica; pode ser anulada com Dissipar Magia conforme as regras gerais de armadilhas."],
    source: source("ameacasArton", 1, 358),
    tags: ["mágica", "runa", "movimento forçado", "dano", "impacto"]
  }),
  trap({
    id: "gas-putrido",
    name: "Gás Pútrido",
    challengeRating: 2,
    effect: "Criaturas em alcance curto ficam enjoadas por uma cena.",
    category: "gas",
    area: "criaturas em alcance curto",
    save: { ability: "Fortitude", dc: 20, effect: "reduz a duração para 1d4 rodadas" },
    detection: { skill: "Investigação", dc: 25 },
    disable: { skill: "Ladinagem", dc: 25 },
    source: source("ameacasArton", 1, 358),
    tags: ["gás", "área", "enjoado", "condição"]
  }),
  trap({
    id: "piso-eletrificado",
    name: "Piso Eletrificado",
    challengeRating: 2,
    effect: "Causa 6d6 pontos de dano de eletricidade em todas as criaturas em um quadrado de 3m.",
    damageTypes: ["electricity"],
    area: "todas as criaturas em um quadrado de 3m",
    save: { ability: "Fortitude", dc: 20, effect: "reduz o dano à metade" },
    detection: { skill: "Investigação", dc: 25 },
    disable: { skill: "Ladinagem", dc: 20 },
    notes: ["Criaturas molhadas ou usando armaduras de metal sofrem –5 no teste de Fortitude."],
    source: source("ameacasArton", 1, 358),
    tags: ["área", "dano", "eletricidade", "piso", "metal", "molhado"]
  }),
  trap({
    id: "jato-de-chamas",
    name: "Jato de Chamas",
    challengeRating: 3,
    effect: "Causa 6d6 pontos de dano de fogo e deixa em chamas todas as criaturas em uma linha de 6m.",
    damageTypes: ["fire"],
    area: "linha de 6m",
    save: { ability: "Reflexos", dc: 25, effect: "reduz o dano à metade e evita a condição em chamas" },
    detection: { skill: "Investigação", dc: 25 },
    disable: { skill: "Ladinagem", dc: 25 },
    source: source("ameacasArton", 1, 358),
    tags: ["área", "linha", "dano", "fogo", "em chamas"]
  }),
  trap({
    id: "extrato-de-oxxdon",
    name: "Extrato de Oxxdon",
    challengeRating: 5,
    effect: "Objetos de metal em uma nuvem de 3m de raio oxidam e são destruídos. Construtos de metal perdem 4d12 PV e ficam exaustos até serem reparados.",
    category: "alchemy",
    area: "nuvem de 3m de raio",
    save: [
      { ability: "Reflexos", dc: 25, effect: "evita que os itens sejam destruídos" },
      { ability: "Fortitude", dc: 25, effect: "reduz a perda de PV à metade e a condição de exausto para fatigado" }
    ],
    detection: { skill: "Investigação", dc: 20 },
    disable: { skill: "Ladinagem", dc: 20 },
    notes: ["Construtos de metal ficam exaustos mesmo que sejam imunes à condição.", "O efeito remete à habilidade Ferrugem."],
    source: source("ameacasArton", 1, 358),
    tags: ["área", "nuvem", "metal", "ferrugem", "destruição de itens", "construto", "exausto", "fatigado"]
  }),
  trap({
    id: "mina-terrestre",
    name: "Mina Terrestre",
    challengeRating: 5,
    effect: "Causa 12d6 pontos de dano de impacto em todas as criaturas em uma esfera de 3m.",
    damageTypes: ["bludgeoning"],
    area: "esfera de 3m",
    save: { ability: "Reflexos", dc: 25, effect: "evita" },
    detection: { skill: "Investigação", dc: 25 },
    disable: { skill: "Ladinagem", dc: 25 },
    source: source("ameacasArton", 1, 358),
    tags: ["área", "esfera", "dano", "impacto", "explosão", "mina"]
  }),
  trap({
    id: "runa-de-teletransporte",
    name: "Runa de Teletransporte",
    challengeRating: 5,
    effect: "Uma criatura em até 3m é transportada para uma superfície sólida desocupada em alcance médio, geralmente uma prisão ou armadilha.",
    category: "magical",
    area: "uma criatura em até 3m",
    save: { ability: "Vontade", dc: 20, effect: "evita" },
    detection: { skill: "Investigação", dc: 25 },
    disable: { skill: "Ladinagem", dc: 20 },
    notes: ["O destino geralmente é uma prisão ou outra armadilha.", "Armadilha mágica; pode ser anulada com Dissipar Magia conforme as regras gerais de armadilhas."],
    source: source("ameacasArton", 1, 358),
    tags: ["mágica", "runa", "teletransporte", "controle"]
  }),
  trap({
    id: "simbolo-da-anulacao",
    name: "Símbolo da Anulação",
    challengeRating: 5,
    effect: "Magias em alcance curto são dissipadas e itens mágicos nesse alcance se tornam mundanos por 1d6 rodadas.",
    category: "magical",
    area: "alcance curto",
    save: { ability: "Vontade", dc: 25, effect: "evita" },
    detection: { skill: "Investigação", dc: 25 },
    disable: { skill: "Ladinagem", dc: 20 },
    notes: ["Armadilha mágica; pode ser anulada com Dissipar Magia conforme as regras gerais de armadilhas."],
    source: source("ameacasArton", 2, 359),
    tags: ["mágica", "símbolo", "área", "dissipação", "supressão mágica", "item mágico"]
  }),
  trap({
    id: "estatua-de-gorgona",
    name: "Estátua de Górgona",
    challengeRating: 9,
    effect: "Criaturas em um cone de 9m à frente da estátua são petrificadas.",
    category: "magical",
    area: "cone de 9m à frente da estátua",
    save: { ability: "Reflexos", dc: 25, effect: "evita" },
    detection: { skill: "Investigação", dc: 25 },
    disable: { skill: "Ladinagem", dc: 25 },
    source: source("ameacasArton", 2, 359),
    tags: ["área", "cone", "petrificado", "estátua"]
  }),
  trap({
    id: "runa-de-desintegracao",
    name: "Runa de Desintegração",
    challengeRating: 10,
    effect: "Uma criatura em alcance curto sofre 10d12 pontos de dano de essência. Se seus PV forem reduzidos a 0 ou menos, ela é completamente desintegrada.",
    category: "magical",
    damageTypes: ["essence"],
    area: "uma criatura em alcance curto",
    save: { ability: "Fortitude", dc: 30, effect: "reduz o dano para 2d12" },
    detection: { skill: "Investigação", dc: 30 },
    disable: { skill: "Ladinagem", dc: 30 },
    notes: ["A desintegração ocorre independentemente do resultado do teste de Fortitude se os PV forem reduzidos a 0 ou menos.", "Armadilha mágica; pode ser anulada com Dissipar Magia conforme as regras gerais de armadilhas."],
    source: source("ameacasArton", 2, 359),
    tags: ["mágica", "runa", "dano", "essência", "desintegração"]
  }),
  trap({
    id: "sussurro-de-sszzaas",
    name: "Sussurro de Sszzaas",
    challengeRating: 13,
    effect: "Uma criatura em alcance curto tem a mente manipulada, passa a ver todos como inimigos e deve gastar suas ações realizando ações hostis contra seus aliados.",
    category: "magical",
    area: "uma criatura em alcance curto",
    save: { ability: "Vontade", dc: 30, effect: "evita" },
    detection: { skill: "Investigação", dc: 30 },
    disable: { skill: "Ladinagem", dc: 30 },
    additionalTests: [
      { test: "Vontade", dc: 30, purpose: "encerrar o efeito" }
    ],
    notes: ["Encantamento.", "A vítima pode refazer o teste de Vontade no fim de cada rodada; se passar, o efeito se encerra.", "Armadilha mágica; pode ser anulada com Dissipar Magia conforme as regras gerais de armadilhas."],
    source: source("ameacasArton", 2, 359),
    tags: ["mágica", "encantamento", "controle mental", "ações hostis", "Sszzaas"]
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
