export const gargoyle = {
  id: "gargula",
  name: "Gárgula",
  type: "construct",
  subtype: null,
  size: "Médio",
  challengeRating: 2,
  description: [
    "Esses predadores furtivos se mantêm imóveis no alto de ruínas, castelos, catedrais e outros prédios, fingindo ser estátuas.",
    "Quando surge uma oportunidade de atacar, mergulham com suas garras."
  ],
  senses: ["visão no escuro"],
  stats: {
    initiative: 3,
    perception: 3,
    defense: 19,
    fortitude: 13,
    reflex: 7,
    will: 2,
    hitPoints: 65,
    speed: [
      { type: "terrestre", value: "12m", squares: 8 },
      { type: "voo", value: "18m", squares: 12 }
    ],
    attributes: { str: 6, dex: 2, con: 4, int: -2, wis: 1, cha: -2 }
  },
  defenses: {
    immunities: ["condição petrificado"],
    damageReduction: 5
  },
  actions: [
    { name: "Duas garras", kind: "Corpo a Corpo", bonus: 12, damage: "1d6+6" }
  ],
  abilities: [
    {
      name: "Imobilidade",
      timing: "passiva",
      text: "Uma gárgula pode permanecer completamente imóvel. Se ela estiver assim, um personagem deve passar em um teste de Percepção CD 35 para perceber que ela é uma criatura e não uma estátua."
    }
  ],
  treasure: "Padrão."
};

export const constructCreatures = [gargoyle];

