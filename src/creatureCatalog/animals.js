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
    source: null,
    stats: {
        initiative: 5, perception: 4, defense: 12, fortitude: 0, reflex: 3, will: -2,
        hitPoints: 3,
        speedText: "12m (8q), escalar 6m (4q)",
        senses: "faro, visão na penumbra",
        defensesText: null,
        attributes: { str: 0, dex: 2, con: 1, int: -4, wis: 1, cha: -3 }
    },
    actions: [
        { name: "Corpo a corpo", text: "Mordida +7 (1d4+3 mais doença)." }
    ],
    abilities: [
        { name: "Doença", timing: "passiva", text: "Uma criatura mordida por um rato gigante é exposta a doença infecção do esgoto (veja a página 318)." }
    ],
    equipment: null,
    treasure: "Nenhum.",
    skillsText: null
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
    source: null,
    stats: {
        initiative: 5, perception: 6, defense: 14, fortitude: 6, reflex: 3, will: 1,
        hitPoints: 14,
        speedText: "15m (10q)",
        senses: "faro, visão na penumbra",
        defensesText: null,
        attributes: { str: 3, dex: 3, con: 3, int: -4, wis: 2, cha: -2 }
    },
    actions: [
        { name: "Corpo a Corpo", text: "Mordida +7 (1d6+5)." }
    ],
    abilities: [
        { name: "Derrubar", timing: "livre", text: "Se o lobo acerta um ataque de mordida, pode fazer a manobra derrubar com teste +7." },
        { name: "Táticas de Alcatéia", timing: "passiva", text: "Quando flanqueia um inimigo, o lobo recebe +2 no teste de ataque e na rolagem de dano, além do bônus normal por flanquear, para um total de +4 no ataque e +2 no dano." }
    ],
    equipment: null,
    treasure: "Nenhum.",
    skillsText: "Sobrevivência +6"
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
    source: null,
    stats: {
        initiative: 5, perception: 7, defense: 19, fortitude: 11, reflex: 7, will: 6,
        hitPoints: 73,
        speedText: "15m (10q)",
        senses: "faro, visão na penumbra",
        defensesText: null,
        attributes: { str: 6, dex: 2, con: 5, int: -4, wis: 2, cha: -2 }
    },
    actions: [
        { name: "Corpo a Corpo", text: "Mordida +13 (2d6+10)." }
    ],
    abilities: [
        { name: "Derrubar", timing: "livre", text: "Se o lobo-das-cavernas acerta um ataque de mordida, pode fazer a manobra derrubar com teste +15." },
        { name: "Táticas de Alcateia", timing: "passiva", text: "Quando flanqueia um inimigo, o lobo-das-cavernas recebe +2 no teste de ataque e na rolagem de dano, além do bônus normal por flanquear, para um total de +4 no ataque e +2 no dano." }
    ],
    equipment: null,
    treasure: "Nenhum.",
    skillsText: "Sobrevivência +11"
};

export const gorlogg = {
    id: "gorlogg",
    name: "Gorlogg",
    type: "animal",
    subtype: null,
    size: "Grande",
    challengeRating: 1,
    description: [],
    source: { book: "Livro Básico", pdfPage: 6, bookPage: null },
    stats: {
        initiative: 4, perception: 3, defense: 16, fortitude: 8, reflex: 5, will: 3,
        hitPoints: 36,
        speedText: "12m (8q)",
        senses: null,
        defensesText: null,
        attributes: { str: 5, dex: 2, con: 5, int: -4, wis: 1, cha: -2 }
    },
    actions: [
        { name: "Corpo a Corpo", text: "Mordida +9 (2d6+8, x3)." }
    ],
    abilities: [],
    equipment: null,
    treasure: "Nenhum.",
    skillsText: null
};

export const cascavel = {
    id: "cascavel",
    name: "Cascavel",
    type: "animal",
    subtype: null,
    size: "Minúsculo",
    challengeRating: 0.25,
    description: [],
    source: { book: "Livro Básico", pdfPage: 19, bookPage: null },
    stats: {
        initiative: 5, perception: 3, defense: 13, fortitude: 2, reflex: 5, will: -1,
        hitPoints: 2,
        speedText: "6m (4q), escalar 6m (4q), natação 9m (6q)",
        senses: null,
        defensesText: null,
        attributes: { str: -2, dex: 3, con: 0, int: -5, wis: 0, cha: -4 }
    },
    actions: [
        { name: "Corpo a Corpo", text: "Mordida +7 (1d4 mais veneno)." }
    ],
    abilities: [],
    equipment: null,
    treasure: "1 dose de peçonha comum (CD 15 para extrair).",
    skillsText: null
};

export const jiboia = {
    id: "jiboia",
    name: "Jiboia",
    type: "animal",
    subtype: null,
    size: "Médio",
    challengeRating: 0.5,
    description: [],
    source: { book: "Livro Básico", pdfPage: 19, bookPage: null },
    stats: {
        initiative: 5, perception: 3, defense: 14, fortitude: 3, reflex: 5, will: 0,
        hitPoints: 14,
        speedText: "6m (4q), escalar 6m (4q), natação 9m (6q)",
        senses: null,
        defensesText: null,
        attributes: { str: 2, dex: 3, con: 1, int: -5, wis: 1, cha: -4 }
    },
    actions: [
        { name: "Corpo a Corpo", text: "Mordida +9 (1d6+4)." }
    ],
    abilities: [],
    equipment: null,
    treasure: "Nenhum.",
    skillsText: null
};

export const naja = {
    id: "naja",
    name: "Naja",
    type: "animal",
    subtype: null,
    size: "Pequeno",
    challengeRating: 1,
    description: [],
    source: { book: "Livro Básico", pdfPage: 19, bookPage: null },
    stats: {
        initiative: 8, perception: 3, defense: 17, fortitude: 5, reflex: 10, will: 1,
        hitPoints: 13,
        speedText: "6m (4q), escalar 6m (4q), natação 6m (4q)",
        senses: null,
        defensesText: null,
        attributes: { str: -1, dex: 4, con: 1, int: -5, wis: 0, cha: -4 }
    },
    actions: [
        { name: "Corpo a Corpo", text: "Mordida +12 (1d4 mais veneno)." }
    ],
    abilities: [],
    equipment: null,
    treasure: "1 dose de peçonha concentrada (CD 16 para extrair).",
    skillsText: null
};

export const sucuri = {
    id: "sucuri",
    name: "Sucuri",
    type: "animal",
    subtype: null,
    size: "Grande",
    challengeRating: 3,
    description: [],
    source: { book: "Livro Básico", pdfPage: 19, bookPage: null },
    stats: {
        initiative: 5, perception: 4, defense: 19, fortitude: 9, reflex: 15, will: 3,
        hitPoints: 88,
        speedText: "6m (4q), escalar 9m (6q), natação 9m (6q)",
        senses: null,
        defensesText: null,
        attributes: { str: 6, dex: 2, con: 4, int: -5, wis: 1, cha: -4 }
    },
    actions: [
        { name: "Corpo a Corpo", text: "Mordida +18 (2d6+14)." }
    ],
    abilities: [],
    equipment: null,
    treasure: "Nenhum.",
    skillsText: null
};

export const lagartoPerceguidor = {
    id: "lagarto-perseguidor",
    name: "Lagarto Perseguidor",
    type: "animal",
    subtype: null,
    size: "Médio",
    challengeRating: 2,
    description: [],
    role: "minion",
    source: { book: "Ameaças de Arton", pdfFile: "elementais e ermos.pdf", pdfPage: 23, bookPage: null },
    stats: {
        initiative: 7, perception: 5, defense: 18, fortitude: 7, reflex: 12, will: 3,
        hitPoints: 16,
        speedText: "9m (6q), natação 9m (6q)",
        senses: "faro, visão na penumbra",
        defensesText: null,
        attributes: { str: 3, dex: 2, con: 3, int: -5, wis: 0, cha: -4 }
    },
    actions: [
        { name: "Corpo a Corpo", text: "Mordida +14 (2d4+14)." }
    ],
    abilities: [],
    equipment: null,
    treasure: "Nenhum.",
    skillsText: "Atletismo +11, Furtividade +7"
};

export const chibiKabuto = {
    id: "chibi-kabuto",
    name: "Chibi-Kabuto",
    type: "animal",
    subtype: null,
    size: "Minúsculo",
    challengeRating: 0.25,
    description: [],
    role: "minion",
    roleSource: "pdf-review",
    source: { book: "Ameaças de Arton", pdfFile: "ameacas de arton variadas.pdf", pdfPage: 1, bookPage: 154 },
    stats: {
        initiative: 4, perception: 6, defense: 13, fortitude: 2, reflex: 3, will: -2,
        hitPoints: 8,
        speedText: "6m (4q), voo 3m (2q)",
        senses: null,
        defensesText: null,
        attributes: { str: -2, dex: 2, con: 0, int: -4, wis: 1, cha: -3 }
    },
    actions: [
        { name: "Corpo a Corpo", text: "Galhada +4 (1d6+2 perfuração)." }
    ],
    abilities: [],
    equipment: null,
    treasure: "Nenhum.",
    skillsText: null
};

export const koKabuto = {
    id: "ko-kabuto",
    name: "Ko-Kabuto",
    type: "animal",
    subtype: null,
    size: "Pequeno",
    challengeRating: 0.25,
    description: [],
    role: "minion",
    roleSource: "pdf-review",
    source: { book: "Ameaças de Arton", pdfFile: "ameacas de arton variadas.pdf", pdfPage: 1, bookPage: 154 },
    stats: {
        initiative: 4, perception: 6, defense: 17, fortitude: 7, reflex: 11, will: 0,
        hitPoints: 38,
        speedText: "6m (4q), voo 3m (2q)",
        senses: null,
        defensesText: null,
        attributes: { str: 0, dex: 2, con: 1, int: -4, wis: 1, cha: -3 }
    },
    actions: [
        { name: "Corpo a Corpo", text: "Galhada +8 (1d8+9 perfuração)." }
    ],
    abilities: [],
    equipment: null,
    treasure: "Nenhum.",
    skillsText: null
};

export const hordaDeKoKabuto = {
    id: "horda-de-ko-kabuto",
    name: "Horda de Ko-Kabuto",
    type: "animal",
    subtype: null,
    size: "Médio",
    challengeRating: 3,
    description: [],
    role: "minion",
    roleSource: "pdf-review",
    source: { book: "Ameaças de Arton", pdfFile: "ameacas de arton variadas.pdf", pdfPage: 2, bookPage: 155 },
    stats: {
        initiative: 5, perception: 7, defense: 22, fortitude: 11, reflex: 13, will: 3,
        hitPoints: 112,
        speedText: "6m (4q), voo 3m (2q)",
        senses: null,
        defensesText: null,
        attributes: { str: 1, dex: 2, con: 1, int: -4, wis: 1, cha: -3 }
    },
    actions: [
        { name: "Corpo a Corpo", text: "[Bando] Galhada +12 (2d6+10)." }
    ],
    abilities: [],
    equipment: null,
    treasure: "Nenhum.",
    skillsText: null
};

export const daiKabuto = {
    id: "dai-kabuto",
    name: "Dai-Kabuto",
    type: "animal",
    subtype: null,
    size: "Grande",
    challengeRating: 4,
    description: [],
    role: "solo",
    roleSource: "pdf-review",
    source: { book: "Ameaças de Arton", pdfFile: "ameacas de arton variadas.pdf", pdfPage: 2, bookPage: 155 },
    stats: {
        initiative: 5, perception: 8, defense: 25, fortitude: 16, reflex: 10, will: 4,
        hitPoints: 155,
        speedText: "9m (6q), voo 6m (4q)",
        senses: null,
        defensesText: null,
        attributes: { str: 3, dex: 1, con: 2, int: -4, wis: 1, cha: -3 }
    },
    actions: [
        { name: "Corpo a Corpo", text: "Galhada +16 (2d8+12 perfuração, x3)." }
    ],
    abilities: [],
    equipment: null,
    treasure: "Nenhum.",
    skillsText: null
};

export const asaAssassina = {
    id: "asa-assassina",
    name: "Asa-Assassina",
    type: "animal",
    subtype: null,
    size: "Minúsculo",
    challengeRating: 1,
    description: [],
    role: "special",
    roleSource: "pdf-review",
    source: { book: "Ameaças de Arton", pdfFile: "ameacas de arton variadas.pdf", pdfPage: 8, bookPage: 198 },
    stats: {
        initiative: 8, perception: 4, defense: 15, fortitude: 3, reflex: 10, will: 3,
        hitPoints: 10,
        speedText: "3m (2q), voo 12m (8q)",
        senses: null,
        defensesText: null,
        attributes: { str: -3, dex: 4, con: 1, int: -4, wis: 2, cha: -4 }
    },
    actions: [
        { name: "Corpo a Corpo", text: "Asa afiada +10 (2d4+6 corte, 17/x3)." }
    ],
    abilities: [],
    equipment: null,
    treasure: "Asas afiadas (CD 16 para extrair, vale T$ 100 para fabricar uma arma de corte superior).",
    skillsText: null
};

export const animalCreatures = [
    // Manuais
    giantRat, wolf, caveWolf,
    // Livro Básico
    gorlogg, cascavel, jiboia, naja, sucuri,
    // Ameaças de Arton
    lagartoPerceguidor, chibiKabuto, koKabuto, hordaDeKoKabuto, daiKabuto, asaAssassina
];
