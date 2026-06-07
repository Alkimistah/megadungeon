export const encountersByFloor = {
  11: 3,
  12: 4,
  13: 4,
  14: 5,
  15: 5,
  16: 6,
  17: 6,
  18: 7,
  19: 8,
  20: 8
};

export const baseDcByFloor = {
  11: 15,
  12: 15,
  13: 20,
  14: 20,
  15: 20,
  16: 25,
  17: 25,
  18: 25,
  19: 30,
  20: 30
};

export const roomTypes = [
  { type: "normal", label: "Encontro normal", short: "N", weight: 62 },
  { type: "elite", label: "Encontro elite", short: "E", weight: 11 },
  { type: "trap", label: "Armadilha", short: "A", weight: 16 },
  { type: "unknown", label: "Desconhecido", short: "?", weight: 5 },
  { type: "treasure", label: "Tesouro", short: "T", weight: 6 }
];

export const unknownRoom = {
  type: "unknown",
  label: "Desconhecido",
  short: "?"
};

export const treasureRoom = {
  type: "treasure",
  label: "Tesouro",
  short: "T"
};

export const campRoom = {
  type: "camp",
  label: "Acampamento",
  short: "C"
};

export const skillOptionsByRoomType = {
  normal: [
    { skill: "Percepção", weight: 28 },
    { skill: "Sobrevivência", weight: 28 },
    { skill: "Conhecimento", weight: 14 },
    { skill: "Intuição", weight: 8 },
    { skill: "Investigação", weight: 7 },
    { skill: "Atletismo", weight: 5 },
    { skill: "Misticismo", weight: 4 },
    { skill: "Furtividade", weight: 3 },
    { skill: "Adestramento", weight: 3 }
  ],

  elite: [
    { skill: "Percepção", weight: 30 },
    { skill: "Sobrevivência", weight: 26 },
    { skill: "Conhecimento", weight: 16 },
    { skill: "Intuição", weight: 8 },
    { skill: "Misticismo", weight: 7 },
    { skill: "Investigação", weight: 5 },
    { skill: "Guerra", weight: 4 },
    { skill: "Fortitude", weight: 2 },
    { skill: "Reflexos", weight: 2 }
  ],

  trap: [
    { skill: "Percepção", weight: 30 },
    { skill: "Sobrevivência", weight: 22 },
    { skill: "Ladinagem", weight: 20 },
    { skill: "Investigação", weight: 8 },
    { skill: "Reflexos", weight: 6 },
    { skill: "Atletismo", weight: 5 },
    { skill: "Acrobacia", weight: 4 },
    { skill: "Conhecimento", weight: 3 },
    { skill: "Misticismo", weight: 2 }
  ],

  treasure: [
    { skill: "Percepção", weight: 26 },
    { skill: "Sobrevivência", weight: 24 },
    { skill: "Investigação", weight: 18 },
    { skill: "Conhecimento", weight: 10 },
    { skill: "Misticismo", weight: 8 },
    { skill: "Ladinagem", weight: 6 },
    { skill: "Ofício", weight: 4 },
    { skill: "Nobreza", weight: 2 },
    { skill: "Intuição", weight: 2 }
  ]
};
