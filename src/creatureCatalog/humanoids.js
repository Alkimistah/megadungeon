export const orcCombatant = {
  id: "orc-combatente",
  name: "Orc Combatente",
  type: "humanoid",
  subtype: "orc",
  size: "Médio",
  challengeRating: 0.5,
  senses: ["visão no escuro"],
  stats: {
    initiative: 4,
    perception: 1,
    defense: 14,
    fortitude: 5,
    reflex: 3,
    will: 0,
    hitPoints: 8,
    speed: [{ type: "terrestre", value: "9m", squares: 6 }],
    attributes: { str: 4, dex: 1, con: 2, int: -1, wis: 1, cha: -1 }
  },
  actions: [
    { name: "Maça", kind: "Corpo a Corpo", bonus: 9, damage: "1d8+7" }
  ],
  abilities: [
    {
      name: "Sensibilidade a Luz",
      timing: "passiva",
      text: "Quando exposto a luz do sol ou similar, o orc fica ofuscado."
    }
  ],
  equipment: "Couro batido, maça.",
  treasure: "Metade."
};

export const orcChief = {
  id: "orc-chefe",
  name: "Orc Chefe",
  type: "humanoid",
  subtype: "orc",
  size: "Médio",
  challengeRating: 2,
  senses: ["visão no escuro"],
  stats: {
    initiative: 5,
    perception: 3,
    defense: 19,
    fortitude: 13,
    reflex: 7,
    will: 2,
    hitPoints: 66,
    speed: [{ type: "terrestre", value: "9m", squares: 6 }],
    attributes: { str: 5, dex: 2, con: 4, int: 0, wis: 0, cha: 0 }
  },
  actions: [
    { name: "Machado de batalha", kind: "Corpo a Corpo", bonus: 11, damage: "1d8+12", critical: "x3" }
  ],
  abilities: [
    {
      name: "Urro Selvagem",
      timing: "movimento",
      text: "O orc chefe recebe +2 em testes de ataque e rolagens de dano corpo a corpo até o final da cena, mas não pode fazer nenhuma ação que exija calma e concentração."
    },
    {
      name: "Sensibilidade a Luz",
      timing: "passiva",
      text: "Quando exposto a luz do sol ou similar, o orc fica ofuscado."
    }
  ],
  skills: [
    { name: "Intimidação", bonus: 4 },
    { name: "Sobrevivência", bonus: 5, situationalBonus: "+7 em subterrâneos" }
  ],
  equipment: "Gibão de peles, machado de batalha.",
  treasure: "Padrão."
};

export const ogre = {
  id: "ogro",
  name: "Ogro",
  type: "humanoid",
  subtype: "gigante",
  size: "Grande",
  challengeRating: 4,
  description: [
    "Estes gigantes primitivos são solitários e mal-humorados, quase nunca encontrados em bandos.",
    "Por sua estupidez, são frequentemente convencidos a acompanhar bandidos e gnolls em troca de diversão ou guloseimas.",
    "Também é comum encontrá-los servindo a bruxos ou cultistas. Enganar um ogro não é tarefa difícil, sendo muito mais recomendado que tentar vencê-lo pela força bruta."
  ],
  senses: ["visão na penumbra"],
  stats: {
    initiative: 3,
    perception: 1,
    defense: 23,
    fortitude: 16,
    reflex: 10,
    will: 0,
    hitPoints: 130,
    speed: [{ type: "terrestre", value: "9m", squares: 6 }],
    attributes: { str: 7, dex: 0, con: 4, int: -3, wis: -2, cha: -2 }
  },
  actions: [
    { name: "Tacape", kind: "Corpo a Corpo", bonus: 16, damage: "1d12+18" }
  ],
  abilities: [
    {
      name: "Burro Demais...",
      timing: "passiva",
      text: "O ogro sofre -5 em testes de Intuição e Vontade, já contabilizados na ficha."
    },
    {
      name: "...Para Morrer!",
      timing: "passiva",
      text: "Todo dano de corte, impacto e perfuração que o ogro sofre é reduzido à metade."
    }
  ],
  skills: [
    { name: "Atletismo", bonus: 12 },
    { name: "Intuição", bonus: -5 }
  ],
  equipment: "Tacape aumentado.",
  treasure: "Padrão."
};

export const gnollMarauder = {
  id: "gnoll-saqueador",
  name: "Gnoll Saqueador",
  type: "humanoid",
  subtype: "gnoll",
  size: "Médio",
  challengeRating: 1,
  senses: ["faro"],
  stats: {
    initiative: 5,
    perception: 4,
    defense: 15,
    fortitude: 7,
    reflex: 7,
    will: 1,
    hitPoints: 15,
    speed: [{ type: "terrestre", value: "9m", squares: 6 }],
    attributes: { str: 3, dex: 2, con: 3, int: -2, wis: 1, cha: -1 }
  },
  actions: [
    { name: "Lança", kind: "Corpo a Corpo", bonus: 10, damage: "1d6+4" },
    { name: "Mordida", kind: "Corpo a Corpo", bonus: 10, damage: "1d6+4" },
    { name: "Arco curto", kind: "À Distância", bonus: 9, damage: "1d6+3", critical: "x3" }
  ],
  equipment: "Arco curto, flechas x20, lança.",
  treasure: "Metade."
};

export const gnollFilibuster = {
  id: "gnoll-filibusteiro",
  name: "Gnoll Filibusteiro",
  type: "humanoid",
  subtype: "gnoll",
  size: "Médio",
  challengeRating: 2,
  senses: ["faro"],
  stats: {
    initiative: 9,
    perception: 4,
    defense: 19,
    fortitude: 7,
    reflex: 11,
    will: 4,
    hitPoints: 60,
    speed: [{ type: "terrestre", value: "9m", squares: 6 }],
    attributes: { str: 3, dex: 4, con: 3, int: -1, wis: 2, cha: -1 }
  },
  actions: [
    { name: "Espada curta", kind: "Corpo a Corpo", bonus: 11, damage: "1d6+4", critical: "19" },
    { name: "Mordida", kind: "Corpo a Corpo", bonus: 11, damage: "1d6+4" },
    { name: "Mosquete", kind: "À Distância", bonus: 12, damage: "2d8+9", critical: "19/x3" }
  ],
  abilities: [
    {
      name: "Recarga Rápida",
      timing: "passiva",
      text: "O gnoll filibusteiro pode recarregar seu mosquete como uma ação de movimento."
    }
  ],
  equipment: "Bolas x10, espada curta, mosquete.",
  treasure: "Padrão."
};

export const humanoidCreatures = [orcCombatant, orcChief, ogre, gnollMarauder, gnollFilibuster];

