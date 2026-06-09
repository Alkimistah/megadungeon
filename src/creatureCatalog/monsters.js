export const glop = {
  id: "glop",
  name: "Glop",
  type: "monster",
  subtype: null,
  size: "Pequeno",
  challengeRating: 0.25,
  senses: ["percepção às cegas"],
  stats: {
    initiative: 0,
    perception: 0,
    defense: 10,
    fortitude: 0,
    reflex: 2,
    will: -5,
    hitPoints: 10,
    speed: [{ type: "terrestre", value: "9m", squares: 6 }],
    attributes: { str: 0, dex: 0, con: 0, int: -5, wis: -5, cha: -5 }
  },
  defenses: {
    immunities: ["ácido"]
  },
  actions: [
    { name: "Pancada", kind: "Corpo a Corpo", bonus: 7, damage: "1d4+1", extraDamage: "1d4 ácido" }
  ],
  treasure: "Nenhum."
};

export const glooop = {
  id: "glooop",
  name: "Glooop",
  type: "monster",
  subtype: null,
  size: "Grande",
  challengeRating: 2,
  senses: ["percepção às cegas"],
  stats: {
    initiative: 0,
    perception: -5,
    defense: 19,
    fortitude: 13,
    reflex: 7,
    will: 2,
    hitPoints: 68,
    speed: [{ type: "terrestre", value: "9m", squares: 6 }],
    attributes: { str: 3, dex: -1, con: 2, int: -5, wis: -5, cha: -5 }
  },
  defenses: {
    immunities: ["ácido"]
  },
  actions: [
    { name: "Pancada", kind: "Corpo a Corpo", bonus: 12, damage: "2d6+3", extraDamage: "2d6 ácido" }
  ],
  abilities: [
    {
      name: "Agarrar Aprimorado",
      timing: "livre",
      text: "Após acertar Pancada, faz teste +14 para agarrar."
    },
    {
      name: "Engolir",
      timing: "padrão",
      text: "No início de cada um dos turnos do glooop, a criatura engolida sofre 2d6+3 pontos de dano de impacto mais 2d6 pontos de dano de ácido. Ela pode escapar causando um total de 10 pontos de dano a ele."
    }
  ],
  treasure: "Padrão."
};

export const mamaeGlop = {
  id: "mamae-glop",
  name: "Mamãe Glop",
  type: "monster",
  subtype: null,
  size: "Grande",
  challengeRating: 2,
  senses: ["percepção às cegas"],
  stats: {
    initiative: 2,
    perception: -1,
    defense: 17,
    fortitude: 13,
    reflex: 7,
    will: 2,
    hitPoints: 70,
    speed: [{ type: "terrestre", value: "9m", squares: 6 }],
    attributes: { str: 2, dex: -1, con: 2, int: -5, wis: -5, cha: -3 }
  },
  defenses: {
    immunities: ["ácido"]
  },
  actions: [
    { name: "Pancada", kind: "Corpo a Corpo", bonus: 12, damage: "2d6+2", extraDamage: "2d6 ácido" }
  ],
  abilities: [
    {
      name: "Glops Filhinhos",
      timing: "passiva",
      text: "A mamãe glop está sempre acompanhada por 1d4 glops, que a protegem instintivamente. Esses glops, assim como aqueles gerados pela Meiose Glópica, não rendem pontos de experiência."
    },
    {
      name: "Meiose Glópica",
      timing: "livre",
      text: "Quando ameaçada, a mamãe pode gerar outros glops filhinhos para protegê-la. No início de cada turno da mamãe, role um dado. Em resultado par, um glop surge em um espaço adjacente a ela. Ele age normalmente, no turno da mamãe, a partir da próxima rodada."
    }
  ],
  treasure: "Padrão."
};

export const cockatrice = {
  id: "cocatriz",
  name: "Cocatriz",
  type: "monster",
  subtype: null,
  size: "Pequeno",
  challengeRating: 3,
  senses: ["visão no escuro"],
  stats: {
    initiative: 10,
    perception: 4,
    defense: 22,
    fortitude: 9,
    reflex: 13,
    will: 5,
    hitPoints: 98,
    speed: [
      { type: "terrestre", value: "6m", squares: 4 },
      { type: "voo", value: "12m", squares: 8 }
    ],
    attributes: { str: 0, dex: 5, con: 1, int: -5, wis: 1, cha: -2 }
  },
  defenses: {
    evasion: true
  },
  actions: [
    { name: "Bicada", kind: "Corpo a Corpo", bonus: 14, damage: "2d4+8", damageType: "perfuração" }
  ],
  abilities: [
    {
      name: "Bicada Petrificante",
      timing: "passiva",
      text: "Uma criatura que sofra dano da bicada da cocatriz fica lenta (Fort CD 19 evita). Se já estiver lenta, fica petrificada permanentemente. Efeitos que removem paralisia revertem a petrificação."
    },
    {
      name: "Voo de Galinha",
      timing: "passiva",
      text: "A cocatriz só consegue percorrer curtas distâncias voando; ela sempre termina seu movimento sobre o chão ou outra superfície firme."
    },
    {
      name: "Parceiro",
      timing: "passiva",
      text: "A cocatriz é um parceiro especial adepto que fornece o benefício a seguir. Iniciante: suas habilidades mágicas que causam condições de movimento têm seu custo reduzido em -1 PM. Veterano: a CD para resistir a essas habilidades aumenta em +2. Mestre: a redução de custo se torna cumulativa com outras reduções."
    }
  ],
  treasure: "1d4-1 ovos de cocatriz; cada ovo permite preparar uma refeição coc-au-triz."
};

export const basilisk = {
  id: "basilisco",
  name: "Basilisco",
  type: "monster",
  subtype: null,
  size: "Médio",
  challengeRating: 4,
  description: [
    "Lagartos venenosos com dois metros de comprimento, basiliscos possuem o terrível poder de transformar seres vivos em pedra com o olhar.",
    "Criaturas solitárias, vivem tanto em terra firme quanto na água."
  ],
  senses: ["visão no escuro"],
  stats: {
    initiative: 6,
    perception: 5,
    defense: 23,
    fortitude: 10,
    reflex: 9,
    will: 9,
    hitPoints: 145,
    speed: [
      { type: "terrestre", value: "9m", squares: 6 },
      { type: "natação", value: "9m", squares: 6 }
    ],
    attributes: { str: 4, dex: 2, con: 4, int: -4, wis: 1, cha: 0 }
  },
  defenses: {
    damageReduction: 5
  },
  actions: [
    { name: "Mordida", kind: "Corpo a Corpo", bonus: 16, damage: "2d8+12", extraDamage: "veneno" }
  ],
  abilities: [
    {
      name: "Olhar Petrificante",
      timing: "passiva",
      text: "No início de seu turno, cada personagem em alcance curto do basilisco deve fazer um teste de Reflexos CD 18. Se passar, desvia o olhar. Se falhar, fica lento. Se já estiver lento, fica petrificado permanentemente. Um personagem pode fechar os olhos como reação para ficar imune a esta habilidade, mas sofrerá os efeitos de estar cego por uma rodada. Efeitos que removem paralisia revertem a petrificação."
    },
    {
      name: "Veneno",
      timing: "passiva",
      text: "Peçonha concentrada: perde 1d12 pontos de vida por rodada durante 3 rodadas, Fortitude CD 18 reduz a duração para uma rodada."
    }
  ],
  treasure: "1d4 doses de peçonha concentrada (CD 19 para extrair), couro de basilisco (CD 19 para extrair, conta como TS 1.000 como matéria-prima para fabricar uma armadura superior)."
};

export const bulette = {
  id: "bulette",
  name: "Bulette",
  type: "monster",
  subtype: null,
  size: "Grande",
  challengeRating: 7,
  senses: ["percepção às cegas (longo)"],
  stats: {
    initiative: 9,
    perception: 8,
    defense: 32,
    fortitude: 20,
    reflex: 9,
    will: 12,
    hitPoints: 310,
    speed: [
      { type: "terrestre", value: "9m", squares: 6 },
      { type: "escavação", value: "12m", squares: 8 }
    ],
    attributes: { str: 8, dex: 2, con: 5, int: -4, wis: 1, cha: -3 }
  },
  defenses: {
    damageReduction: 5
  },
  actions: [
    { name: "Mordida", kind: "Corpo a Corpo", bonus: 23, damage: "3d8+24", extraDamage: "4d6 ácido" }
  ],
  abilities: [
    {
      name: "Agarrar Aprimorado",
      timing: "livre",
      text: "Após acertar Mordida, faz teste +25 para agarrar."
    },
    {
      name: "Aura Cáustica",
      timing: "passiva",
      text: "No início de cada turno do bulette, todas as criaturas adjacentes sofrem 4d6 pontos de dano de ácido."
    },
    {
      name: "Engolir",
      timing: "padrão",
      text: "No início de cada um dos turnos do bulette, a criatura engolida sofre 2d8+12 pontos de dano de impacto mais 4d6 pontos de dano de ácido. Ela pode escapar causando 20 pontos de dano a ele."
    },
    {
      name: "Espreitador das Dunas",
      timing: "passiva",
      text: "Enquanto o bulette estiver nadando no solo, é muito difícil percebê-lo. Em vez do normal, a CD de Percepção para ouvir um bulette é 40, ou +20 em seu teste de Furtividade, o que for maior."
    },
    {
      name: "Parceiro",
      timing: "passiva",
      text: "O bulette é um parceiro montaria Grande. Iniciante: seu deslocamento muda para 9m (escavação 6m) e, uma vez por rodada, você recebe +1d6 em uma rolagem de dano corpo a corpo. Veterano: o bônus em rolagens de dano muda para +1d10. Mestre: o deslocamento de escavação muda para 12m e o bônus em rolagens de dano muda para +2d8."
    }
  ],
  treasure: "Duas peças de couro de bulette (CD 22 para extrair)."
};

export const tendriculo = {
  id: "tendriculo",
  name: "Tendrículo",
  type: "monster",
  subtype: null,
  size: "Grande",
  challengeRating: 6,
  senses: ["visão no escuro"],
  stats: {
    initiative: 9,
    perception: 6,
    defense: 25,
    fortitude: 16,
    reflex: 8,
    will: 12,
    hitPoints: 210,
    speed: [{ type: "terrestre", value: "6m", squares: 4 }],
    attributes: { str: 3, dex: 2, con: 2, int: -2, wis: 3, cha: -4 }
  },
  defenses: {
    immunities: ["sangramento", "veneno"],
    nature: "natureza vegetal"
  },
  actions: [
    { name: "Mordida", kind: "Corpo a Corpo", bonus: 20, damage: "2d6+10", extraDamage: "veneno" },
    { name: "Dois tentáculos", kind: "Corpo a Corpo", bonus: 24, damage: "4d4+5" }
  ],
  abilities: [
    {
      name: "Agarrar Aprimorado",
      timing: "livre",
      text: "Após acertar Tentáculo, faz teste +24 para agarrar."
    },
    {
      name: "Engolir",
      timing: "padrão",
      text: "No início de cada um dos turnos do tendrículo, a criatura engolida sofre 2d10+5 pontos de dano de impacto mais 2d10+5 pontos de dano de ácido. Ela pode escapar causando um total de 20 pontos de dano a ele. Enquanto tiver uma criatura engolida, o tendrículo ganha cura acelerada 20."
    },
    {
      name: "Veneno",
      timing: "passiva",
      text: "Essência de sombra: debilitado, Fort CD 22 reduz para fraco."
    }
  ],
  skills: [{ name: "Furtividade", bonus: 10, situationalBonus: "+12 em florestas" }],
  treasure: "1d4 doses de essência de sombra (CD 21 para extrair)."
};

export const monsterCreatures = [glop, glooop, mamaeGlop, cockatrice, basilisk, bulette, tendriculo];

