export const zombie = {
  id: "zumbi",
  name: "Zumbi",
  type: "undead",
  subtype: null,
  size: "Médio",
  challengeRating: 0.25,
  senses: ["visão no escuro"],
  stats: {
    initiative: -1,
    perception: -1,
    defense: 11,
    fortitude: 3,
    reflex: -1,
    will: -1,
    hitPoints: 20,
    speed: [{ type: "terrestre", value: "6m", squares: 4 }],
    attributes: { str: 3, dex: -1, con: 2, int: -5, wis: -1, cha: 0 }
  },
  actions: [
    { name: "Mordida", kind: "Corpo a Corpo", bonus: 7, damage: "1d6+6" }
  ],
  abilities: [
    {
      name: "Fraqueza Zumbi",
      timing: "passiva",
      text: "O zumbi sofre o dobro de dano de acertos críticos ou de ataques feitos contra seu cérebro."
    }
  ],
  treasure: "Nenhum."
};

export const skeleton = {
  id: "esqueleto",
  name: "Esqueleto",
  type: "undead",
  subtype: null,
  size: "Médio",
  challengeRating: 2,
  senses: ["visão no escuro"],
  stats: {
    initiative: 7,
    perception: 3,
    defense: 19,
    fortitude: 5,
    reflex: 7,
    will: 12,
    hitPoints: 45,
    speed: [{ type: "terrestre", value: "9m", squares: 6 }],
    attributes: { str: 5, dex: 3, con: 0, int: -5, wis: 0, cha: -5 }
  },
  defenses: {
    damageReduction: [{ type: "corte", value: 5 }, { type: "frio", value: 5 }]
  },
  actions: [
    { name: "Espada longa", kind: "Corpo a Corpo", bonus: 14, damage: "2d8+12", critical: "19" }
  ],
  equipment: "Escudo pesado, espada longa.",
  treasure: "Nenhum."
};

export const undeadCreatures = [zombie, skeleton];
