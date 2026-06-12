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
    source: null,
    stats: {
        initiative: 6,
        perception: 4,
        defense: 21,
        fortitude: 11,
        reflex: 9,
        will: 7,
        hitPoints: 95,
        speedText: "12m (8q)",
        senses: "faro, visão no escuro",
        defensesText: "imunidade a fogo, redução de dano mágico 10, vulnerabilidade a frio",
        attributes: { str: 6, dex: 3, con: 4, int: -2, wis: 1, cha: -2 }
    },
    actions: [
        { name: "Mordida", text: "Corpo a Corpo Mordida +14 (2d6+6 mais 2d6 fogo)." }
    ],
    abilities: [
        {
            name: "Sopro",
            timing: "padrão",
            text: "O cão do inferno cospe fogo em um cone de 6m. Criaturas na área sofrem 4d6+4 pontos de dano de fogo (Ref CD 17 reduz à metade). Recarrega como movimento."
        }
    ],
    equipment: null,
    treasure: "1d4 doses de essência abissal (CD 18 para extrair).",
    skillsText: "Atletismo +9"
};

export const aquinne = {
    id: "aquinne",
    name: "Aquin'ne",
    type: "spirit",
    subtype: "elemental",
    size: "Pequeno",
    challengeRating: 2,
    description: [],
    source: null,
    stats: {
        initiative: 4,
        perception: 4,
        defense: 18,
        fortitude: 10,
        reflex: 7,
        will: 3,
        hitPoints: 21,
        speedText: "9m (6q), natação 15m (10q)",
        senses: "visão no escuro",
        defensesText: "imunidade a acertos críticos, atordoado, cansaço, efeitos de metabolismo, frio e paralisia, redução de fogo 5, vulnerabilidade a eletricidade",
        attributes: { str: 4, dex: 2, con: 2, int: -2, wis: 2, cha: -2 }
    },
    actions: [
        { name: "Tentáculo hídrico", text: "Corpo a Corpo Tentáculo hídrico +13 (2d4+6 corte)." }
    ],
    abilities: [
        {
            name: "Afogar",
            timing: "passiva",
            text: "Uma criatura agarrada pelo aquin'ne é considerada submersa até se soltar."
        },
        {
            name: "Agarrar Aprimorado",
            timing: "livre",
            text: "Após acertar Tentáculo hídrico, faz teste +13 para agarrar."
        },
        {
            name: "Redemoinho de Maresia",
            timing: "padrão",
            text: "O aquin'ne toca um objeto adjacente, que perde 5 PV (Ref CD 16 evita)."
        },
        {
            name: "Familiar Umariquim",
            timing: "passiva",
            text: "Aquin'ne familiar concede deslocamento de natação 9m e permite lançar magias e respirar debaixo d'água."
        }
    ],
    equipment: null,
    treasure: "1 dose de éter elemental frio (CD 17 para extrair).",
    skillsText: "Atletismo +6 (+14 para nadar), Furtividade +4 (+14 na água)"
};

export const terrier = {
    id: "terrier",
    name: "Terrier",
    type: "spirit",
    subtype: "elemental",
    size: "Pequeno",
    challengeRating: 1,
    description: [],
    source: null,
    stats: {
        initiative: 0,
        perception: 3,
        defense: 16,
        fortitude: 11,
        reflex: 0,
        will: 5,
        hitPoints: 35,
        speedText: "6m (4q)",
        senses: "visão no escuro",
        defensesText: "imunidade a acertos críticos, ácido, atordoado, cansaço, efeitos de metabolismo e paralisia, redução de impacto 5, vulnerabilidade a eletricidade",
        attributes: { str: 3, dex: 0, con: 3, int: -3, wis: 1, cha: 1 }
    },
    actions: [
        { name: "Pancada", text: "Corpo a Corpo Pancada +9 (2d6+8)." }
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
    equipment: null,
    treasure: "1 dose de éter elemental ácido (CD 16 para extrair).",
    skillsText: null
};

export const pamgra = {
    id: "pamgra",
    name: "Pamgra",
    type: "spirit",
    subtype: "elemental",
    size: "Médio",
    challengeRating: 7,
    description: [],
    source: null,
    stats: {
        initiative: 7,
        perception: 6,
        defense: 31,
        fortitude: 20,
        reflex: 14,
        will: 7,
        hitPoints: 280,
        speedText: "9m (6q), escalar 6m (4q)",
        senses: "visão no escuro",
        defensesText: "imunidade a acertos críticos, ácido, atordoado, cansaço, efeitos de metabolismo e paralisia, redução de impacto 10, vulnerabilidade a eletricidade",
        attributes: { str: 8, dex: 0, con: 4, int: -3, wis: -1, cha: -1 }
    },
    actions: [
        { name: "Duas pancadas", text: "Corpo a Corpo Duas pancadas +24 (2d10+15, 19)." }
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
    equipment: null,
    treasure: "1d4 doses de éter elemental ácido (CD 22 para extrair).",
    skillsText: null
};

// ─── Espíritos do Livro Básico ────────────────────────────────────────────────

export const guerreiroDeCHifres = {
    id: "guerreiro-de-chifres",
    name: "Guerreiro de Chifres",
    type: "spirit",
    subtype: "demônio",
    size: "Médio",
    challengeRating: 3,
    description: [],
    source: { book: "Livro Básico", pdfPage: 2, bookPage: null },
    stats: {
        initiative: 6, perception: 3, defense: 21, fortitude: 13, reflex: 11, will: 9,
        hitPoints: 100, speedText: "9m (6q)",
        senses: null, defensesText: null,
        attributes: { str: 5, dex: 3, con: 4, int: -2, wis: 1, cha: -1 }
    },
    actions: [{ name: null, text: "Corpo a Corpo Machado de guerra +14 (1d12+16, x3) ou lança +14 (1d6+7)." }],
    abilities: [],
    equipment: "Machado de guerra cruel.",
    treasure: "Padrão.",
    skillsText: null
};

// ─── Espíritos de Ameaças de Arton ────────────────────────────────────────────

export const corgann = {
    id: "corgann",
    name: "Corgann",
    type: "spirit",
    subtype: "elemental",
    size: "Médio",
    challengeRating: 8,
    description: [],
    source: { book: "Ameaças de Arton", pdfFile: "elementais e ermos.pdf", pdfPage: 2, bookPage: 89 },
    role: "minion",
    roleSource: "pdf-review",
    stats: {
        initiative: 14, perception: 10, defense: 30, fortitude: 15, reflex: 20, will: 9,
        hitPoints: 61, speedText: "9m (6q), natação 15m",
        senses: null, defensesText: null,
        attributes: { str: 2, dex: 6, con: 3, int: -2, wis: 2, cha: -1 }
    },
    actions: [{ name: "Jato d'água", text: "À Distância Jato d'água x2 +27 (2d8+29)." }],
    abilities: [],
    equipment: null,
    treasure: "1d4 doses de éter elemental (frio) (CD 23 para extrair).",
    skillsText: "Furtividade +14 (+24 na água)"
};

export const namasqall = {
    id: "namasqall",
    name: "Namasqall",
    type: "spirit",
    subtype: "elemental",
    size: "Colossal",
    challengeRating: 14,
    description: [],
    source: { book: "Ameaças de Arton", pdfFile: "elementais e ermos.pdf", pdfPage: 4, bookPage: 91 },
    role: "solo",
    roleSource: "pdf-review",
    stats: {
        initiative: 18, perception: 13, defense: 42, fortitude: 28, reflex: 22, will: 13,
        hitPoints: 700, speedText: "12m (8q), natação 18m (12q)",
        senses: null, defensesText: null,
        attributes: { str: 10, dex: 4, con: 10, int: -3, wis: -1, cha: -1 }
    },
    actions: [{ name: "Tentáculos d'água", text: "Corpo a Corpo Quatro tentáculos d'água +39 (2d10+30)." }],
    abilities: [],
    equipment: null,
    treasure: "1d4+2 doses de éter elemental (frio) (CD 29 para extrair).",
    skillsText: null
};

export const tPeel = {
    id: "t-peel",
    name: "T'Peel",
    type: "spirit",
    subtype: "elemental",
    size: "Minúsculo",
    challengeRating: 1,
    description: [],
    source: { book: "Ameaças de Arton", pdfFile: "elementais e ermos.pdf", pdfPage: 5, bookPage: 92 },
    role: "minion",
    roleSource: "pdf-review",
    stats: {
        initiative: 5, perception: 1, defense: 10, fortitude: 5, reflex: 10, will: 1,
        hitPoints: 12, speedText: "voo 9m (6q)",
        senses: null, defensesText: null,
        attributes: { str: 0, dex: 4, con: 2, int: -2, wis: 0, cha: -1 }
    },
    actions: [
        { name: "Brisa agressiva", text: "Corpo a Corpo Brisa agressiva +11 (2d4+9 corte)." },
        { name: "Lufada cortante", text: "À Distância Lufada cortante +11 (2d4+9 corte, alcance curto)." }
    ],
    abilities: [],
    equipment: null,
    treasure: "Metade (role novamente qualquer item que ocupe mais de 2 espaços) e 1 dose de éter elemental (eletricidade) (CD 16 para extrair).",
    skillsText: "Ladinagem +7"
};

export const rarvnaak = {
    id: "rarvnaak",
    name: "Rarvnaak",
    type: "spirit",
    subtype: "elemental",
    size: "Médio",
    challengeRating: 7,
    description: [],
    source: { book: "Ameaças de Arton", pdfFile: "elementais e ermos.pdf", pdfPage: 5, bookPage: 92 },
    role: "special",
    roleSource: "pdf-review",
    stats: {
        initiative: 14, perception: 10, defense: 29, fortitude: 12, reflex: 21, will: 5,
        hitPoints: 280, speedText: "voo 12m (8q)",
        senses: null, defensesText: null,
        attributes: { str: 1, dex: 7, con: 4, int: 0, wis: -1, cha: -2 }
    },
    actions: [{ name: "Socos pneumáticos", text: "Corpo a Corpo Dois socos pneumáticos +20 (1d8+16)." }],
    abilities: [],
    equipment: null,
    treasure: "1d4 doses de éter elemental (eletricidade) (CD 22 para extrair).",
    skillsText: "Furtividade +29"
};

export const hallusTir = {
    id: "hallus-tir",
    name: "Hallus'tir",
    type: "spirit",
    subtype: "elemental",
    size: "Colossal",
    challengeRating: 15,
    description: [],
    source: { book: "Ameaças de Arton", pdfFile: "elementais e ermos.pdf", pdfPage: 7, bookPage: 94 },
    role: "solo",
    roleSource: "pdf-review",
    stats: {
        initiative: 29, perception: 15, defense: 49, fortitude: 20, reflex: 28, will: 15,
        hitPoints: 718, speedText: "12m (8q)",
        senses: null, defensesText: null,
        attributes: { str: 6, dex: 14, con: 8, int: -3, wis: 0, cha: -2 }
    },
    actions: [
        { name: "Punho", text: "Corpo a Corpo Punho x3 +44 (2d12+23 impacto)." },
        { name: "Escombros", text: "À Distância Dois escombros +37 (4d6+31 impacto, x3, alcance médio)." }
    ],
    abilities: [],
    equipment: null,
    treasure: "1d4+2 doses de éter elemental (eletricidade) (CD 30 para extrair).",
    skillsText: null
};

export const pakk = {
    id: "pakk",
    name: "Pakk",
    type: "spirit",
    subtype: "elemental",
    size: "Minúsculo",
    challengeRating: 1,
    description: [],
    source: { book: "Ameaças de Arton", pdfFile: "elementais e ermos.pdf", pdfPage: 7, bookPage: 94 },
    role: "minion",
    roleSource: "pdf-review",
    stats: {
        initiative: 7, perception: 2, defense: 15, fortitude: 5, reflex: 10, will: 1,
        hitPoints: 9, speedText: "voo 12m",
        senses: null, defensesText: null,
        attributes: { str: 0, dex: 5, con: 1, int: -1, wis: 2, cha: 3 }
    },
    actions: [{ name: "Queima", text: "Corpo a Corpo Queima (consultar livro)." }],
    abilities: [],
    equipment: null,
    treasure: "1 dose de éter elemental (fogo) (CD 16 para extrair).",
    skillsText: null
};

export const berBaram = {
    id: "ber-baram",
    name: "Ber-baram",
    type: "spirit",
    subtype: "elemental",
    size: "Grande",
    challengeRating: 8,
    description: [],
    source: { book: "Ameaças de Arton", pdfFile: "elementais e ermos.pdf", pdfPage: 8, bookPage: 95 },
    role: "solo",
    roleSource: "pdf-review",
    stats: {
        initiative: 9, perception: 10, defense: 30, fortitude: 20, reflex: 17, will: 7,
        hitPoints: 320, speedText: "15m (10q)",
        senses: null, defensesText: null,
        attributes: { str: 8, dex: 5, con: 5, int: -2, wis: 2, cha: 2 }
    },
    actions: [{ name: "Marrada", text: "Corpo a Corpo Marrada +26 (2d10+12 mais 3d6 fogo)." }],
    abilities: [],
    equipment: null,
    treasure: "1d4 doses de éter elemental (fogo) (CD 23 para extrair).",
    skillsText: null
};

export const serpentaar = {
    id: "serpentaar",
    name: "Serpentaar",
    type: "spirit",
    subtype: "elemental",
    size: "Enorme",
    challengeRating: 14,
    description: [],
    source: { book: "Ameaças de Arton", pdfFile: "elementais e ermos.pdf", pdfPage: 9, bookPage: 96 },
    role: "solo",
    roleSource: "pdf-review",
    stats: {
        initiative: 9, perception: 14, defense: 47, fortitude: 30, reflex: 22, will: 14,
        hitPoints: 700, speedText: "6m (4q), escavação 9m (6q)",
        senses: null, defensesText: null,
        attributes: { str: 4, dex: 2, con: 4, int: -2, wis: 3, cha: 2 }
    },
    actions: [{ name: "Mordida", text: "Corpo a Corpo Mordida x2 +39 (2d10+7 mais 6d6+31 fogo)." }],
    abilities: [],
    equipment: null,
    treasure: "1d4+2 doses de éter elemental (fogo) (CD 29 para extrair).",
    skillsText: null
};

export const bandoDePamgras = {
    id: "bando-de-pamgras",
    name: "Bando de Pamgras",
    type: "spirit",
    subtype: "elemental",
    size: "Grande",
    challengeRating: 11,
    description: [],
    source: { book: "Ameaças de Arton", pdfFile: "elementais e ermos.pdf", pdfPage: 11, bookPage: 98 },
    role: "minion",
    roleSource: "pdf-review",
    stats: {
        initiative: 9, perception: 8, defense: 41, fortitude: 24, reflex: 18, will: 11,
        hitPoints: 550, speedText: "9m (6q), escalar 6m (4q)",
        senses: null, defensesText: null,
        attributes: { str: 8, dex: 0, con: 4, int: -3, wis: -1, cha: -1 }
    },
    actions: [{ name: "Duas pancadas", text: "Corpo a Corpo [Bando] Duas pancadas +34 (4d10+30, 19)." }],
    abilities: [],
    equipment: null,
    treasure: "1d6 doses de éter elemental (ácido) (CD 26 para extrair).",
    skillsText: null
};

export const tanaloom = {
    id: "tanaloom",
    name: "Tanaloom",
    type: "spirit",
    subtype: "elemental",
    size: "Enorme",
    challengeRating: 13,
    description: [],
    source: { book: "Ameaças de Arton", pdfFile: "elementais e ermos.pdf", pdfPage: 12, bookPage: 99 },
    role: "solo",
    roleSource: "pdf-review",
    stats: {
        initiative: 10, perception: 12, defense: 44, fortitude: 26, reflex: 20, will: 13,
        hitPoints: 650, speedText: "15m (10q), escalar 15m (10q)",
        senses: null, defensesText: null,
        attributes: { str: 12, dex: 0, con: 9, int: -2, wis: 2, cha: -1 }
    },
    actions: [
        { name: "Duas pancadas", text: "Corpo a Corpo Duas pancadas +37 (4d12+49)." },
        { name: "Flechas ácidas", text: "À Distância Flechas ácidas x6 +34 (3d6+10 ácido, x3, alcance médio)." }
    ],
    abilities: [],
    equipment: null,
    treasure: "2d4 doses de éter elemental (ácido) (CD 28 para extrair).",
    skillsText: null
};

export const elementalCorrompido = {
    id: "elemental-corrompido",
    name: "Elemental Corrompido",
    type: "spirit",
    subtype: "elemental",
    size: "Colossal",
    challengeRating: 16,
    description: [],
    source: { book: "Ameaças de Arton", pdfFile: "elementais e ermos.pdf", pdfPage: 14, bookPage: 101 },
    role: "solo",
    roleSource: "pdf-review",
    stats: {
        initiative: 19, perception: 14, defense: 53, fortitude: 30, reflex: 24, will: 16,
        hitPoints: 800, speedText: "15m (10q), natação 15m (10q)",
        senses: null, defensesText: null,
        attributes: { str: 12, dex: 5, con: 13, int: -1, wis: 0, cha: 0 }
    },
    actions: [{ name: "Mordida", text: "Corpo a Corpo Mordida +46 (3d12+15 mais 4d6 ácido)." }],
    abilities: [],
    equipment: null,
    treasure: "Nenhum.",
    skillsText: null
};

export const oni = {
    id: "oni",
    name: "Oni",
    type: "spirit",
    subtype: null,
    size: "Médio",
    challengeRating: 5,
    description: [],
    source: { book: "Ameaças de Arton", pdfFile: "ameacas de arton variadas.pdf", pdfPage: 3, bookPage: 162 },
    role: "solo",
    roleSource: "pdf-review",
    stats: {
        initiative: 5, perception: 3, defense: 24, fortitude: 17, reflex: 11, will: 5,
        hitPoints: 200, speedText: "9m (6q)",
        senses: null, defensesText: null,
        attributes: { str: 5, dex: 1, con: 3, int: 0, wis: -1, cha: -2 }
    },
    actions: [{ name: "Machado de guerra", text: "Corpo a Corpo Machado de guerra +17 (1d12+16, x3)." }],
    abilities: [],
    equipment: "Machado de guerra.",
    treasure: "Padrão.",
    skillsText: "Atletismo +9, Intimidação +7"
};

// ─── Espíritos de Ameaças de Arton (suplemento de screenshots) ────────────────

export const stagh = {
    id: "stagh",
    name: "Stagh",
    type: "spirit",
    subtype: "elemental",
    size: "Pequeno",
    challengeRating: 3,
    description: [],
    source: { book: "Ameaças de Arton", pdfFile: "prints enviados pelo usuário", pdfPage: null, bookPage: null },
    role: "minion",
    roleSource: "screenshot-review",
    stats: {
        initiative: 6, perception: 4, defense: 22, fortitude: 7, reflex: 12, will: 4,
        hitPoints: 35, speedText: "9m (6q), escalada 9m (6q)",
        senses: "visão no escuro",
        defensesText: "imunidade a acertos críticos, atordoado, cansaço, efeitos de metabolismo, frio e paralisia, vulnerabilidade a fogo",
        attributes: { str: 2, dex: 3, con: 3, int: -4, wis: 1, cha: -1 }
    },
    actions: [
        { name: "Duas garras", text: "Corpo a Corpo Duas garras +16 (1d6+4 mais 1d6 frio)." }
    ],
    abilities: [
        { name: "Aura de Frio", timing: "passiva", text: "No início de cada turno do stagh, todas as criaturas em um raio de 9m sofrem 1d6+3 pontos de dano de frio (Fort CD 17 reduz à metade)." },
        { name: "Familiar", timing: "passiva", text: "Um stagh concede +1 na CD de suas magias de frio." }
    ],
    equipment: null,
    treasure: "1 dose de éter elemental (frio) (CD 18 para extrair).",
    skillsText: null
};

// ─── Exportação principal ─────────────────────────────────────────────────────

export const spiritCreatures = [
    // Manuais
    hellHound, aquinne, terrier, pamgra,
    // Livro Básico
    guerreiroDeCHifres,
    // Ameaças de Arton
    corgann, namasqall, tPeel, rarvnaak, hallusTir, pakk, berBaram, serpentaar,
    bandoDePamgras, tanaloom, elementalCorrompido, oni,
    // Ameaças de Arton (suplemento)
    stagh
];
