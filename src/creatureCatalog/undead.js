export const zombie = {
    id: "zumbi",
    name: "Zumbi",
    type: "undead",
    subtype: null,
    size: "Médio",
    challengeRating: 0.25,
    description: [],
    source: null,
    stats: {
        initiative: -1, perception: -1, defense: 11, fortitude: 3, reflex: -1, will: -1,
        hitPoints: 20,
        speedText: "6m (4q)",
        senses: "visão no escuro",
        defensesText: null,
        attributes: { str: 3, dex: -1, con: 2, int: -5, wis: -1, cha: 0 }
    },
    actions: [
        { name: "Corpo a Corpo", text: "Mordida +7 (1d6+6)." }
    ],
    abilities: [
        { name: "Fraqueza Zumbi", timing: "passiva", text: "O zumbi sofre o dobro de dano de acertos críticos ou de ataques feitos contra seu cérebro." }
    ],
    equipment: null,
    treasure: "Nenhum.",
    skillsText: null
};

export const skeleton = {
    id: "esqueleto",
    name: "Esqueleto",
    type: "undead",
    subtype: null,
    size: "Médio",
    challengeRating: 2,
    description: [],
    source: null,
    stats: {
        initiative: 7, perception: 3, defense: 19, fortitude: 5, reflex: 7, will: 12,
        hitPoints: 45,
        speedText: "9m (6q)",
        senses: "visão no escuro",
        defensesText: "redução de corte 5, redução de frio 5",
        attributes: { str: 5, dex: 3, con: 0, int: -5, wis: 0, cha: -5 }
    },
    actions: [
        { name: "Corpo a Corpo", text: "Espada longa +14 (2d8+12, 19)." }
    ],
    abilities: [],
    equipment: "Escudo pesado, espada longa.",
    treasure: "Nenhum.",
    skillsText: null
};

export const turbaZumbi = {
    id: "turba-zumbi",
    name: "Turba Zumbi",
    type: "undead",
    subtype: "bando",
    size: "Grande",
    challengeRating: 2,
    description: [],
    source: { book: "Livro Básico", pdfPage: 12, bookPage: null },
    stats: {
        initiative: 1, perception: 1, defense: 11, fortitude: 5, reflex: 1, will: 1,
        hitPoints: 100,
        speedText: "6m (4q)",
        senses: null,
        defensesText: null,
        attributes: { str: 3, dex: -1, con: 3, int: null, wis: -1, cha: 0 }
    },
    actions: [
        { name: "Corpo a Corpo", text: "Mordida +17 (2d6+12)." }
    ],
    abilities: [],
    equipment: null,
    treasure: "Nenhum.",
    skillsText: null
};

export const esqueletodeElite = {
    id: "esqueleto-de-elite",
    name: "Esqueleto de Elite",
    type: "undead",
    subtype: null,
    size: "Médio",
    challengeRating: 4,
    description: [],
    source: { book: "Livro Básico", pdfPage: 12, bookPage: null },
    stats: {
        initiative: 10, perception: 4, defense: 25, fortitude: 4, reflex: 10, will: 16,
        hitPoints: 60,
        speedText: "6m (4q)",
        senses: null,
        defensesText: null,
        attributes: { str: 6, dex: 4, con: 2, int: null, wis: 0, cha: -5 }
    },
    actions: [
        { name: "Corpo a Corpo", text: "Espada longa +18 (2d8+15 mais 2d8 de trevas)." }
    ],
    abilities: [],
    equipment: "Escudo pesado, espada longa, meia armadura.",
    treasure: "Nenhum.",
    skillsText: null
};

export const falange = {
    id: "falange",
    name: "Falange",
    type: "undead",
    subtype: "bando",
    size: "Grande",
    challengeRating: 8,
    description: [],
    source: { book: "Livro Básico", pdfPage: 13, bookPage: null },
    stats: {
        initiative: 12, perception: 6, defense: 25, fortitude: 6, reflex: 12, will: 18,
        hitPoints: 300,
        speedText: "6m (4q)",
        senses: null,
        defensesText: null,
        attributes: { str: 6, dex: 4, con: 2, int: null, wis: 0, cha: -5 }
    },
    actions: [
        { name: "Corpo a Corpo", text: "Espada longa +28 (4d8+30 mais 4d8 de trevas)." }
    ],
    abilities: [],
    equipment: null,
    treasure: "Nenhum.",
    skillsText: null
};

export const aparicao = {
    id: "aparicao",
    name: "Aparição",
    type: "undead",
    subtype: null,
    size: "Médio",
    challengeRating: 5,
    description: [],
    source: { book: "Livro Básico", pdfPage: 13, bookPage: null },
    stats: {
        initiative: 10, perception: 6, defense: 23, fortitude: 5, reflex: 17, will: 11,
        hitPoints: 110,
        speedText: "voo 18m (12q)",
        senses: null,
        defensesText: null,
        attributes: { str: null, dex: 6, con: 0, int: 0, wis: 2, cha: 2 }
    },
    actions: [
        { name: "Corpo a Corpo", text: "Toque drenante +18 (3d8+6 de trevas)." }
    ],
    abilities: [],
    equipment: null,
    treasure: "Nenhum.",
    skillsText: null
};

export const vampiro = {
    id: "vampiro",
    name: "Vampiro",
    type: "undead",
    subtype: null,
    size: "Médio",
    challengeRating: 12,
    description: [],
    source: { book: "Livro Básico", pdfPage: 14, bookPage: null },
    stats: {
        initiative: 15, perception: 13, defense: 45, fortitude: 12, reflex: 26, will: 20,
        hitPoints: 550,
        speedText: "18m (12q), escalar 18m (12q)",
        senses: null,
        defensesText: null,
        attributes: { str: 6, dex: 5, con: 5, int: 3, wis: 3, cha: 6 }
    },
    actions: [
        { name: "Corpo a Corpo", text: "Espada longa x2 +25 (2d8+25 mais 2d10 de trevas)." }
    ],
    abilities: [],
    equipment: "Armadura completa delicada de mitral, espada longa precisa de mitral.",
    treasure: "Dobro.",
    skillsText: null
};

const ameacasArtonSupplementalSource = {
    book: "Ameaças de Arton",
    pdfFile: "prints enviados pelo usuário",
    pdfPage: null,
    bookPage: null
};

export const soterradoVagante = {
    id: "soterrado-vagante",
    name: "Soterrado Vagante",
    type: "undead",
    subtype: null,
    size: "Médio",
    challengeRating: 2,
    description: [],
    role: "minion",
    roleSource: "screenshot-review",
    source: { book: "Ameaças de Arton", pdfFile: "prints enviados pelo usuário", pdfPage: null, bookPage: null },
    stats: {
        initiative: 2, perception: 3, defense: 20, fortitude: 1, reflex: 5, will: 10,
        hitPoints: 21,
        speedText: "6m (4q)",
        senses: "visão no escuro",
        defensesText: "redução de corte e perfuração 5, redução de frio 10",
        attributes: { str: 5, dex: -1, con: 0, int: null, wis: 2, cha: -1 }
    },
    actions: [
        { name: "Corpo a Corpo", text: "Dois punhos +14 (2d6+6 mais 2 frio)." },
        { name: "Agarrar Aprimorado", text: "Agarrar Aprimorado (Livre) Punho (teste +16)." },
        { name: "Constrição Congelante", text: "Constrição Congelante (Padrão) No início de cada um de seus turnos, o soterrado vagante causa 4d6 pontos de dano de frio em cada criatura que estiver agarrando. Esse dano aumenta em +1d6 para cada rodada consecutiva que o soterrado estiver agarrando essa criatura." }
    ],
    abilities: [
        { name: "Esquife de Gelo", timing: "passiva", text: "O soterrado sofre 1 ponto de dano adicional por dado de dano de fogo." }
    ],
    equipment: null,
    treasure: "Nenhum.",
    skillsText: "Furtividade +2 (+7 em terrenos nevados)"
};

export const carnical = {
    id: "carnical",
    name: "Carniçal",
    type: "undead",
    subtype: null,
    size: "Médio",
    challengeRating: 1,
    description: [],
    role: "solo",
    roleSource: "screenshot-review",
    source: { book: "Ameaças de Arton", pdfFile: "prints enviados pelo usuário", pdfPage: null, bookPage: null },
    stats: {
        initiative: 6, perception: 1, defense: 15, fortitude: 1, reflex: 5, will: 10,
        hitPoints: 33,
        speedText: "9m (6q)",
        senses: "faro, visão no escuro",
        defensesText: null,
        attributes: { str: 2, dex: 3, con: 0, int: -2, wis: 1, cha: 0 }
    },
    actions: [
        { name: "Corpo a Corpo", text: "Mordida +9 (1d6+3 mais doença) e duas garras +9 (1d4+3)." }
    ],
    abilities: [
        { name: "Doença", timing: "passiva", text: "Uma criatura mordida por um carniçal é exposta à doença febre do carniçal." },
        { name: "Paralisia", timing: "passiva", text: "Uma criatura atingida pela mordida do carniçal fica paralisada por 1d4 rodadas (Fort CD 16 evita e a criatura não pode mais ser paralisada por esta habilidade até o fim da cena)." }
    ],
    equipment: null,
    treasure: "Nenhum.",
    skillsText: "Atletismo +6, Furtividade +7"
};

export const lacedon = {
    id: "lacedon",
    name: "Lacedon",
    type: "undead",
    subtype: null,
    size: "Médio",
    challengeRating: 2,
    description: [],
    role: "solo",
    roleSource: "screenshot-review",
    source: { book: "Ameaças de Arton", pdfFile: "prints enviados pelo usuário", pdfPage: null, bookPage: null },
    stats: {
        initiative: 6, perception: 2, defense: 18, fortitude: 3, reflex: 7, will: 12,
        hitPoints: 65,
        speedText: "9m (6q), natação 9m (6q)",
        senses: "faro, visão no escuro",
        defensesText: null,
        attributes: { str: 2, dex: 3, con: 0, int: -2, wis: 1, cha: 0 }
    },
    actions: [
        { name: "Corpo a Corpo", text: "Mordida +12 (1d6+4 mais doença) e duas garras +12 (1d4+4)." },
        { name: "Lamento dos Afogados", text: "Lamento dos Afogados (Reação) Quando morre, o lacedon emite um último lamento. Criaturas em alcance médio perdem 1 PM (Von CD 17 evita)." }
    ],
    abilities: [
        { name: "Doença", timing: "passiva", text: "Uma criatura mordida por um lacedon é exposta à doença febre do carniçal." },
        { name: "Paralisia", timing: "passiva", text: "Uma criatura atingida pela mordida do lacedon fica paralisada por 1d4 rodadas (Fort CD 17 evita e a criatura não pode mais ser paralisada por esta habilidade até o fim da cena)." }
    ],
    equipment: null,
    treasure: "Nenhum.",
    skillsText: "Atletismo +7, Furtividade +8"
};

export const ogroEsqueleto = {
    id: "ogro-esqueleto",
    name: "Ogro Esqueleto",
    type: "undead",
    subtype: null,
    size: "Grande",
    challengeRating: 3,
    description: [],
    role: "solo",
    roleSource: "screenshot-review",
    source: { book: "Ameaças de Arton", pdfFile: "prints enviados pelo usuário", pdfPage: null, bookPage: null },
    stats: {
        initiative: 3, perception: 0, defense: 19, fortitude: 15, reflex: 3, will: 4,
        hitPoints: 99,
        speedText: "9m (6q)",
        senses: "visão no escuro",
        defensesText: "redução de corte, frio e perfuração 5",
        attributes: { str: 4, dex: 1, con: 3, int: null, wis: -1, cha: -1 }
    },
    actions: [
        { name: "Corpo a Corpo", text: "Tacape +14 (1d12+15)." },
        { name: "Morto Demais...", text: "Morto Demais... (Movimento) Uma vez por cena, se for desarmado, o ogro esqueleto retira um de seus próprios ossos para utilizar de arma, com as mesmas estatísticas de seu tacape." }
    ],
    abilities: [
        { name: "...Para Morrer Novamente!", timing: "passiva", text: "Todo dano de corte, frio e perfuração que o ogro sofre é reduzido à metade (antes de aplicar a redução de dano)." }
    ],
    equipment: "Tacape aumentado.",
    treasure: "Nenhum.",
    skillsText: null
};

export const ursoPardoEsqueleto = {
    id: "urso-pardo-esqueleto",
    name: "Urso Pardo Esqueleto",
    type: "undead",
    subtype: null,
    size: "Grande",
    challengeRating: 4,
    description: [],
    role: "solo",
    roleSource: "screenshot-review",
    source: { book: "Ameaças de Arton", pdfFile: "prints enviados pelo usuário", pdfPage: null, bookPage: null },
    stats: {
        initiative: 4, perception: 3, defense: 20, fortitude: 4, reflex: 16, will: 10,
        hitPoints: 180,
        speedText: "9m (6q)",
        senses: "visão no escuro",
        defensesText: "redução de corte, frio e perfuração 5",
        attributes: { str: 5, dex: -1, con: 4, int: -4, wis: -1, cha: -3 }
    },
    actions: [
        { name: "Corpo a Corpo", text: "Mordida +15 (1d8+4) e duas garras +15 (1d6+4)." },
        { name: "Agarrar Aprimorado", text: "Agarrar Aprimorado (Livre) Mordida (teste +17)." }
    ],
    abilities: [
        { name: "Garras Destruidoras", timing: "passiva", text: "Quando causa dano com suas garras, o urso pardo esqueleto pode rolar novamente qualquer resultado 1 ou 2 na rolagem de dano." },
        { name: "Ossos Pontiagudos", timing: "passiva", text: "No início de cada um de seus turnos, o urso causa 2d6+7 pontos de dano de perfuração em uma criatura Média ou menor que esteja agarrando. Se a criatura sofrer dano desta forma, ela fica sangrando (Fort CD 18 evita o sangramento)." }
    ],
    equipment: null,
    treasure: "Nenhum.",
    skillsText: "Atletismo +9"
};

export const gigantEsqueleto = {
    id: "gigante-esqueleto",
    name: "Gigante Esqueleto",
    type: "undead",
    subtype: null,
    size: "Enorme",
    challengeRating: 5,
    description: [],
    role: "solo",
    roleSource: "screenshot-review",
    source: { book: "Ameaças de Arton", pdfFile: "prints enviados pelo usuário", pdfPage: null, bookPage: null },
    stats: {
        initiative: 4, perception: 4, defense: 24, fortitude: 17, reflex: 5, will: 11,
        hitPoints: 210,
        speedText: "12m (8q)",
        senses: "visão no escuro",
        defensesText: "redução de corte, frio e perfuração 5",
        attributes: { str: 6, dex: -1, con: 4, int: -2, wis: 0, cha: -1 }
    },
    actions: [
        { name: "Corpo a Corpo", text: "Tacape x2 +17 (2d6+14, x3)." },
        { name: "Arremessar Rochas", text: "Arremessar Rochas (Completa) O gigante esqueleto arremessa rochas em um quadrado de 3m em alcance curto. Criaturas nessa área sofrem 2d6+14 pontos de dano de impacto (Ref CD 20 reduz à metade)." }
    ],
    abilities: [
        { name: "Monte de Ossos", timing: "passiva", text: "Quando sofre um acerto crítico, o gigante se desfaz em uma pilha de ossos. Ele fica caído e vulnerável, falha automaticamente em testes de Reflexos e precisa gastar uma ação de movimento para se remontar e encerrar estes efeitos." }
    ],
    equipment: "Tacape aumentado.",
    treasure: "Nenhum.",
    skillsText: null
};

export const fantasma = {
    id: "fantasma",
    name: "Fantasma",
    type: "undead",
    subtype: null,
    size: "Médio",
    challengeRating: 7,
    description: [],
    role: "special",
    roleSource: "screenshot-review",
    source: { book: "Ameaças de Arton", pdfFile: "prints enviados pelo usuário", pdfPage: null, bookPage: null },
    stats: {
        initiative: 10, perception: 9, defense: 29, fortitude: 7, reflex: 14, will: 20,
        hitPoints: 190,
        speedText: "voo 12m (8q)",
        senses: "visão no escuro",
        defensesText: "incorpóreo",
        attributes: { str: null, dex: 3, con: 0, int: 1, wis: 2, cha: 4 }
    },
    actions: [
        { name: "Corpo a Corpo", text: "Toque drenante +23 (6d8+20 trevas)." },
        { name: "Assustar", text: "Assustar (Livre) O fantasma se revela subitamente, saindo de um esconderijo ou de dentro de um objeto. Ele só pode usar esta habilidade se estiver escondido, e apenas uma vez por cena. Cada criatura em alcance curto capaz de ver o fantasma fica abalada (Von CD 24 evita). Medo." }
    ],
    abilities: [
        { name: "Drenar Vida", timing: "passiva", text: "Uma criatura atingida pelo toque drenante do fantasma tem seus PV máximos reduzidos em 10 por 1 dia, cumulativamente (Fort CD 24 evita)." },
        { name: "Memento", timing: "passiva", text: "Um fantasma reduzido a 0 PV desaparece e ressurge 1d4 dias depois. Para derrotá-lo permanentemente é necessário confrontá-lo com aquilo que ainda o prende a este mundo." }
    ],
    equipment: null,
    treasure: "Nenhum.",
    skillsText: "Furtividade +15, Intimidação +13"
};

export const garraZumbi = {
    id: "garra-zumbi",
    name: "Garra-Zumbi",
    type: "undead",
    subtype: null,
    size: "Minúsculo",
    challengeRating: 0.25,
    description: [],
    role: "minion",
    roleSource: "screenshot-review",
    source: { book: "Ameaças de Arton", pdfFile: "prints enviados pelo usuário", pdfPage: null, bookPage: null },
    stats: {
        initiative: 4, perception: 1, defense: 10, fortitude: 0, reflex: 2, will: -1,
        hitPoints: 5,
        speedText: "6m (4q), voo 9m (6q)",
        senses: "percepção às cegas",
        defensesText: "imunidade a efeitos de sentidos",
        attributes: { str: 1, dex: 2, con: 1, int: null, wis: -1, cha: null }
    },
    actions: [
        { name: "Corpo a Corpo", text: "Pancada +7 (1d6+5)." },
        { name: "Agarrar Aprimorado", text: "Agarrar Aprimorado (Livre) Pancada (criatura Média ou menor, teste +12)." }
    ],
    abilities: [
        { name: "Estrangular", timing: "passiva", text: "No início de cada um de seus turnos, a garra-zumbi causa 2d6+2 pontos de dano de impacto na criatura que estiver agarrando. Uma criatura agarrada desta forma não pode falar." }
    ],
    equipment: null,
    treasure: "Nenhum.",
    skillsText: "Furtividade +11"
};

export const garraZumbiOgro = {
    id: "garra-zumbi-ogro",
    name: "Garra-Zumbi Ogro",
    type: "undead",
    subtype: null,
    size: "Médio",
    challengeRating: 2,
    description: [],
    role: "minion",
    roleSource: "screenshot-review",
    source: { book: "Ameaças de Arton", pdfFile: "prints enviados pelo usuário", pdfPage: null, bookPage: null },
    stats: {
        initiative: 4, perception: -3, defense: 16, fortitude: 0, reflex: 2, will: -3,
        hitPoints: 35,
        speedText: "9m (6q), voo 12m (8q)",
        senses: "percepção às cegas",
        defensesText: "imunidade a efeitos de sentidos",
        attributes: { str: 5, dex: 1, con: 3, int: null, wis: -3, cha: null }
    },
    actions: [
        { name: "Corpo a Corpo", text: "Pancada +14 (2d6+10)." },
        { name: "Agarrar Aprimorado", text: "Agarrar Aprimorado (Livre) Pancada (criatura Grande ou menor, teste +19)." },
        { name: "Forte Demais...", text: "Forte Demais... (Livre) No início de cada um de seus turnos, a garra-zumbi ogro causa 4d6+10 pontos de dano de impacto na criatura que estiver agarrando. Uma criatura agarrada desta forma não pode falar." }
    ],
    abilities: [
        { name: "...Para Morrer de Novo!", timing: "passiva", text: "Todo dano de corte, impacto e perfuração que a garra-zumbi sofre é reduzido à metade." }
    ],
    equipment: null,
    treasure: "Nenhum.",
    skillsText: null
};

export const garraZumbiEnxame = {
    id: "garra-zumbi-enxame",
    name: "Garra-Zumbi Enxame",
    type: "undead",
    subtype: "bando",
    size: "Grande",
    challengeRating: 3,
    description: [],
    role: "minion",
    roleSource: "screenshot-review",
    source: { book: "Ameaças de Arton", pdfFile: "prints enviados pelo usuário", pdfPage: null, bookPage: null },
    stats: {
        initiative: 6, perception: 1, defense: 19, fortitude: 9, reflex: 14, will: 4,
        hitPoints: 40,
        speedText: "6m (4q), voo 9m (6q)",
        senses: "percepção às cegas",
        defensesText: "imunidade a efeitos de sentidos",
        attributes: { str: 3, dex: 4, con: 3, int: null, wis: -3, cha: null }
    },
    actions: [
        { name: "Enxame", text: "6d6 pontos de dano de impacto (ou 8d6 contra criaturas agarradas)." }
    ],
    abilities: [
        { name: "Maré Estranguladora", timing: "livre", text: "No fim do seu turno, o enxame faz uma manobra agarrar contra todas as criaturas em seu espaço (teste +16). Enquanto estiver agarrada dessa forma, uma criatura fica caída e não pode falar." }
    ],
    equipment: null,
    treasure: "Nenhum.",
    skillsText: null
};

export const garraZumbiGigante = {
    id: "garra-zumbi-gigante",
    name: "Garra-Zumbi Gigante",
    type: "undead",
    subtype: null,
    size: "Grande",
    challengeRating: 5,
    description: [],
    role: "solo",
    roleSource: "screenshot-review",
    source: { book: "Ameaças de Arton", pdfFile: "prints enviados pelo usuário", pdfPage: null, bookPage: null },
    stats: {
        initiative: 4, perception: -3, defense: 25, fortitude: 17, reflex: 11, will: 5,
        hitPoints: 200,
        speedText: "9m (6q), voo 12m (8q)",
        senses: "percepção às cegas",
        defensesText: "imunidade a efeitos de sentidos",
        attributes: { str: 8, dex: 0, con: 5, int: null, wis: -3, cha: null }
    },
    actions: [
        { name: "Corpo a Corpo", text: "Pancada +17 (2d8+18)." },
        { name: "Agarrar Aprimorado", text: "Agarrar Aprimorado (Livre) Pancada (criatura Enorme ou menor, teste +24)." }
    ],
    abilities: [
        { name: "Estrangular", timing: "passiva", text: "No início de cada um de seus turnos, a garra-zumbi gigante causa 4d8+12 pontos de dano de impacto na criatura que estiver agarrando. Uma criatura agarrada desta forma não pode falar." },
        { name: "Mestre de Manobras", timing: "passiva", text: "A garra-zumbi recebe +5 em testes de manobras (já contabilizado)." }
    ],
    equipment: null,
    treasure: "Nenhum.",
    skillsText: null
};

export const undeadCreatures = [
    // Manuais
    zombie, skeleton,
    // Livro Básico
    turbaZumbi, esqueletodeElite, falange, aparicao, vampiro,
    // Ameaças de Arton
    soterradoVagante, carnical, lacedon, ogroEsqueleto, ursoPardoEsqueleto,
    gigantEsqueleto, fantasma, garraZumbi, garraZumbiOgro, garraZumbiEnxame, garraZumbiGigante
];
