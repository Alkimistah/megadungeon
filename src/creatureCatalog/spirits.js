export const hellHound = {
  id: "cao-do-inferno",
  name: "Cão do Inferno",
  type: "spirit",
  subtype: null,
  size: "Grande",
  challengeRating: 3,
  description: [
    "Estas feras agressivas são enormes, fortes e musculosas, com pelagem castanho-avermelhada como ferrugem, presas, garras e língua negras como carvão, e olhos de um vermelho ameaçador.",
    "Cães do inferno são oriundos de planos divinos e trazidos com frequência para Arton por conjuradores malignos."
  ],
  senses: ["faro", "visão no escuro"],
  stats: {
    initiative: 6,
    perception: 4,
    defense: 21,
    fortitude: 11,
    reflex: 9,
    will: 7,
    hitPoints: 95,
    speed: [{ type: "terrestre", value: "12m", squares: 8 }],
    attributes: { str: 6, dex: 3, con: 4, int: -2, wis: 1, cha: -2 }
  },
  defenses: {
    immunities: ["fogo"],
    damageReduction: [{ type: "mágico", value: 10 }],
    vulnerabilities: ["frio"]
  },
  actions: [
    { name: "Mordida", kind: "Corpo a Corpo", bonus: 14, damage: "2d6+6", extraDamage: "2d6 fogo" }
  ],
  abilities: [
    {
      name: "Sopro",
      timing: "padrão",
      text: "O cão do inferno cospe fogo em um cone de 6m. Criaturas na área sofrem 4d6+4 pontos de dano de fogo (Ref CD 17 reduz à metade). Recarrega como movimento."
    }
  ],
  skills: [{ name: "Atletismo", bonus: 9 }],
  treasure: "1d4 doses de essência abissal (CD 18 para extrair)."
};

export const aquinne = {
  id: "aquinne",
  name: "Aquin’ne",
  type: "spirit",
  subtype: "elemental",
  size: "Pequeno",
  challengeRating: 2,
  senses: ["visão no escuro"],
  stats: {
    initiative: 4,
    perception: 4,
    defense: 18,
    fortitude: 10,
    reflex: 7,
    will: 3,
    hitPoints: 21,
    speed: [
      { type: "terrestre", value: "9m", squares: 6 },
      { type: "natação", value: "15m", squares: 10 }
    ],
    attributes: { str: 4, dex: 2, con: 2, int: -2, wis: 2, cha: -2 }
  },
  defenses: {
    immunities: ["acertos críticos", "atordoado", "cansaço", "efeitos de metabolismo", "frio", "paralisia"],
    damageReduction: [{ type: "fogo", value: 5 }],
    vulnerabilities: ["eletricidade"]
  },
  actions: [
    { name: "Tentáculo hídrico", kind: "Corpo a Corpo", bonus: 13, damage: "2d4+6", damageType: "corte" }
  ],
  abilities: [
    {
      name: "Afogar",
      timing: "passiva",
      text: "Uma criatura agarrada pelo aquin’ne é considerada submersa até se soltar."
    },
    {
      name: "Agarrar Aprimorado",
      timing: "livre",
      text: "Após acertar Tentáculo hídrico, faz teste +13 para agarrar."
    },
    {
      name: "Redemoinho de Maresia",
      timing: "padrão",
      text: "O aquin’ne toca um objeto adjacente, que perde 5 PV (Ref CD 16 evita)."
    },
    {
      name: "Familiar Umariquim",
      timing: "passiva",
      text: "Aquin’ne familiar concede deslocamento de natação 9m e permite lançar magias e respirar debaixo d’água."
    }
  ],
  skills: [
    { name: "Atletismo", bonus: 6, situationalBonus: "+14 para nadar" },
    { name: "Furtividade", bonus: 4, situationalBonus: "+14 na água" }
  ],
  treasure: "1 dose de éter elemental frio (CD 17 para extrair)."
};

export const terrier = {
  id: "terrier",
  name: "Terrier",
  type: "spirit",
  subtype: "elemental",
  size: "Pequeno",
  challengeRating: 1,
  senses: ["visão no escuro"],
  stats: {
    initiative: 0,
    perception: 3,
    defense: 16,
    fortitude: 11,
    reflex: 0,
    will: 5,
    hitPoints: 35,
    speed: [{ type: "terrestre", value: "6m", squares: 4 }],
    attributes: { str: 3, dex: 0, con: 3, int: -3, wis: 1, cha: 1 }
  },
  defenses: {
    immunities: ["acertos críticos", "ácido", "atordoado", "cansaço", "efeitos de metabolismo", "paralisia"],
    damageReduction: [{ type: "impacto", value: 5 }],
    vulnerabilities: ["eletricidade"]
  },
  actions: [
    { name: "Pancada", kind: "Corpo a Corpo", bonus: 9, damage: "2d6+8" }
  ],
  abilities: [
    {
      name: "Pedra-Punho",
      timing: "padrão",
      text: "O terrier dispara pedras do tamanho de um punho humano em criaturas a sua escolha em alcance curto. Cada criatura sofre 1d6+4 pontos de dano de impacto e fica atordoada por 1 rodada (Fort CD 16 reduz à metade e evita a condição). Uma criatura que passe no teste de resistência não pode mais ser atordoada por esta habilidade até o fim da cena. Recarrega como movimento."
    },
    {
      name: "Pedregoso",
      timing: "passiva",
      text: "Um terrier pode permanecer completamente imóvel. Se ele estiver assim, um personagem deve passar em um teste de Percepção CD 30 para perceber que ele é uma criatura e não um monte de pedras."
    },
    {
      name: "Familiar Granito",
      timing: "passiva",
      text: "Um terrier familiar concede redução de dano 2/impacto."
    }
  ],
  treasure: "1 dose de éter elemental ácido (CD 16 para extrair)."
};

export const pamgra = {
  id: "pamgra",
  name: "Pamgra",
  type: "spirit",
  subtype: "elemental",
  size: "Médio",
  challengeRating: 7,
  senses: ["visão no escuro"],
  stats: {
    initiative: 7,
    perception: 6,
    defense: 31,
    fortitude: 20,
    reflex: 14,
    will: 7,
    hitPoints: 280,
    speed: [
      { type: "terrestre", value: "9m", squares: 6 },
      { type: "escalar", value: "6m", squares: 4 }
    ],
    attributes: { str: 8, dex: 0, con: 4, int: -3, wis: -1, cha: -1 }
  },
  defenses: {
    immunities: ["acertos críticos", "ácido", "atordoado", "cansaço", "efeitos de metabolismo", "paralisia"],
    damageReduction: [{ type: "impacto", value: 10 }],
    vulnerabilities: ["eletricidade"]
  },
  actions: [
    { name: "Duas pancadas", kind: "Corpo a Corpo", bonus: 24, damage: "2d10+15", critical: "19" }
  ],
  abilities: [
    {
      name: "Cristalário",
      timing: "passiva",
      text: "Os cristais afiados do corpo do pamgra ferem profundamente suas vítimas. Criaturas atingidas por ataques do pamgra ficam sangrando (Fort CD 26 evita)."
    },
    {
      name: "Golpe Avassalador",
      timing: "livre",
      text: "Quando acerta um ataque de pancada, o pamgra arremessa a vítima 1d6 x 1,5m em uma direção à escolha dele (Fort CD 24 evita). A vítima fica caída e, se atingir algum obstáculo, sofre 1d6 pontos de dano de impacto para cada 1,5m que foi arremessada."
    }
  ],
  treasure: "1d4 doses de éter elemental ácido (CD 22 para extrair)."
};

export const spiritCreatures = [hellHound, aquinne, terrier, pamgra];
