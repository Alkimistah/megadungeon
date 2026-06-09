export const giantRat = {
  id: "rato-gigante",
  name: "Rato Gigante",
  type: "animal",
  subtype: null,
  size: "Pequeno",
  challengeRating: 0.25,
  description: [
    "Esse roedor de pelagem grossa, olhos vermelhos e presas amareladas atinge até um metro de comprimento.",
    "Ratos gigantes vivem em bandos e podem ser encontrados em quase qualquer lugar: pântanos ermos, esgotos de metrópoles e porões de tavernas não muito recomendadas..."
  ],
  senses: ["faro", "visão na penumbra"],
  stats: {
    initiative: 5,
    perception: 4,
    defense: 12,
    fortitude: 0,
    reflex: 3,
    will: -2,
    hitPoints: 3,
    speed: [
      { type: "terrestre", value: "12m", squares: 8 },
      { type: "escalar", value: "6m", squares: 4 }
    ],
    attributes: { str: 0, dex: 2, con: 1, int: -4, wis: 1, cha: -3 }
  },
  actions: [
    { name: "Mordida", kind: "Corpo a Corpo", bonus: 7, damage: "1d4+3", tags: ["doença"] }
  ],
  abilities: [
    {
      name: "Doença",
      timing: "passiva",
      text: "Uma criatura mordida por um rato gigante é exposta a doença infecção do esgoto."
    }
  ],
  treasure: "Nenhum."
};

export const wolf = {
  id: "lobo",
  name: "Lobo",
  type: "animal",
  subtype: null,
  size: "Médio",
  challengeRating: 0.5,
  description: [
    "Predadores primordiais, lobos vivem em alcateias lideradas pelo macho mais forte ou a alfa, que conduz o bando nas caçadas.",
    "Podem ser encontrados em quase qualquer ambiente, especialmente planícies, florestas e regiões montanhosas.",
    "Lobos atacam mordendo as pernas da vítima para derrubá-la. Sua tática favorita é enviar alguns indivíduos para atacar pela frente, enquanto o resto circula e ataca por trás."
  ],
  senses: ["faro", "visão na penumbra"],
  stats: {
    initiative: 5,
    perception: 6,
    defense: 14,
    fortitude: 6,
    reflex: 3,
    will: 1,
    hitPoints: 14,
    speed: [{ type: "terrestre", value: "15m", squares: 10 }],
    attributes: { str: 3, dex: 3, con: 3, int: -4, wis: 2, cha: -2 }
  },
  actions: [
    { name: "Mordida", kind: "Corpo a Corpo", bonus: 7, damage: "1d6+5" }
  ],
  abilities: [
    {
      name: "Derrubar",
      timing: "livre",
      text: "Se o lobo acerta um ataque de mordida, pode fazer a manobra derrubar com teste +7."
    },
    {
      name: "Táticas de Alcateia",
      timing: "passiva",
      text: "Quando flanqueia um inimigo, o lobo recebe +2 no teste de ataque e na rolagem de dano, além do bônus normal por flanquear, para um total de +4 no ataque e +2 no dano."
    }
  ],
  skills: [{ name: "Sobrevivência", bonus: 6 }],
  treasure: "Nenhum."
};

export const caveWolf = {
  id: "lobo-das-cavernas",
  name: "Lobo-das-Cavernas",
  type: "animal",
  subtype: null,
  size: "Grande",
  challengeRating: 2,
  description: [
    "Um ancestral pré-histórico do lobo comum, mas muito maior e com uma coluna de placas ósseas ao longo do dorso.",
    "Podem ser encontrados em vários pontos de Arton, sobretudo em Lamnor, onde são usados por goblinoides como bestas de guarda e montaria.",
    "As placas dorsais não são armas; estudiosos acreditam que sejam atrativo sexual, como as caudas de pavões.",
    "Lobos-das-cavernas caçam como lobos comuns: em alcateia, parte do bando ataca pela frente enquanto os demais circulam e atacam por trás com a poderosa mordida."
  ],
  senses: ["faro", "visão na penumbra"],
  stats: {
    initiative: 5,
    perception: 7,
    defense: 19,
    fortitude: 11,
    reflex: 7,
    will: 6,
    hitPoints: 73,
    speed: [{ type: "terrestre", value: "15m", squares: 10 }],
    attributes: { str: 6, dex: 2, con: 5, int: -4, wis: 2, cha: -2 }
  },
  actions: [
    { name: "Mordida", kind: "Corpo a Corpo", bonus: 13, damage: "2d6+10" }
  ],
  abilities: [
    {
      name: "Derrubar",
      timing: "livre",
      text: "Se o lobo-das-cavernas acerta um ataque de mordida, pode fazer a manobra derrubar com teste +15."
    },
    {
      name: "Táticas de Alcateia",
      timing: "passiva",
      text: "Quando flanqueia um inimigo, o lobo-das-cavernas recebe +2 no teste de ataque e na rolagem de dano, além do bônus normal por flanquear, para um total de +4 no ataque e +2 no dano."
    }
  ],
  skills: [{ name: "Sobrevivência", bonus: 11 }],
  treasure: "Nenhum."
};

export const animalCreatures = [giantRat, wolf, caveWolf];

