export const gargoyle = {
    id: "gargula",
    name: "Gárgula",
    type: "construct",
    subtype: "gargula",
    size: "Médio",
    challengeRating: 2,
    description: [
        "Esses predadores furtivos se mantêm imóveis no alto de ruínas, castelos, catedrais e outros prédios, fingindo ser estátuas.",
        "Quando surge uma oportunidade de atacar, mergulham com suas garras."
    ],
    source: null,
    stats: {
        initiative: 3, perception: 3, defense: 19, fortitude: 13, reflex: 7, will: 2,
        hitPoints: 65,
        speedText: "12m (8q), voo 18m (12q)",
        senses: "visão no escuro",
        defensesText: "imunidade a petrificado, redução de dano 5",
        attributes: { str: 6, dex: 2, con: 4, int: -2, wis: 1, cha: -2 }
    },
    actions: [
        { name: "Corpo a Corpo", text: "Duas garras +12 (1d6+6)." }
    ],
    abilities: [
        { name: "Imobilidade", timing: "passiva", text: "Uma gárgula pode permanecer completamente imóvel. Se ela estiver assim, um personagem deve passar em um teste de Percepção CD 35 para perceber que ela é uma criatura e não uma estátua." }
    ],
    equipment: null,
    treasure: "Padrão.",
    skillsText: null
};

export const golemDeHierro = {
    id: "golem-de-ferro",
    name: "Golem de Ferro",
    type: "construct",
    subtype: null,
    size: "Grande",
    challengeRating: 10,
    description: [],
    source: { book: "Livro Básico", pdfPage: 3, bookPage: null },
    stats: {
        initiative: 4, perception: 9, defense: 36, fortitude: 24, reflex: 14, will: 11,
        hitPoints: 400,
        speedText: "9m (6q)",
        senses: null,
        defensesText: null,
        attributes: { str: 12, dex: -1, con: 10, int: null, wis: 0, cha: -5 }
    },
    actions: [
        { name: "Corpo a Corpo", text: "Duas pancadas +30 (2d10+25)." }
    ],
    abilities: [],
    equipment: null,
    treasure: "Nenhum.",
    skillsText: null
};

export const colossoSupremo = {
    id: "colosso-supremo",
    name: "Colosso Supremo",
    type: "construct",
    subtype: null,
    size: "Colossal",
    challengeRating: 14,
    description: [],
    source: { book: "Livro Básico", pdfPage: 11, bookPage: null },
    stats: {
        initiative: 8, perception: 9, defense: 46, fortitude: 31, reflex: 19, will: 20,
        hitPoints: 675,
        speedText: "12m (8q)",
        senses: null,
        defensesText: null,
        attributes: { str: 15, dex: -1, con: 10, int: null, wis: -5, cha: -5 }
    },
    actions: [
        { name: "Corpo a Corpo", text: "Espada titânica +39 (4d12+30, 19)." }
    ],
    abilities: [],
    equipment: null,
    treasure: "1d6 engrenagens (CD 29 para extrair; cada engrenagem conta como T$ 1.000 em matéria-prima para fabricar engenhocas).",
    skillsText: null
};

export const engenhoDeGuerraGoblin = {
    id: "engenho-de-guerra-goblin",
    name: "Engenho de Guerra Goblin",
    type: "construct",
    subtype: null,
    size: "Enorme",
    challengeRating: 6,
    description: [],
    source: { book: "Livro Básico", pdfPage: 16, bookPage: null },
    stats: {
        initiative: 3, perception: 5, defense: 25, fortitude: 18, reflex: 6, will: 12,
        hitPoints: 246,
        speedText: "12m (8q)",
        senses: null,
        defensesText: null,
        attributes: { str: 10, dex: 0, con: 7, int: null, wis: 0, cha: -5 }
    },
    actions: [],
    abilities: [],
    equipment: null,
    treasure: "Padrão.",
    skillsText: null
};

const ameacasArtonSupplementalSource = {
    book: "Ameaças de Arton",
    pdfFile: "prints enviados pelo usuário",
    pdfPage: null,
    bookPage: null
};

export const golemDeNorMedio = {
    id: "golem-de-nor-medio",
    name: "Golem de Nor Médio",
    type: "construct",
    subtype: "nor",
    size: "Médio",
    challengeRating: 1,
    description: [],
    role: "solo",
    roleSource: "screenshot-review",
    source: { book: "Ameaças de Arton", pdfFile: "prints enviados pelo usuário", pdfPage: null, bookPage: null },
    stats: {
        initiative: 3, perception: 6, defense: 17, fortitude: 11, reflex: -1, will: 5,
        hitPoints: 35,
        speedText: "6m (4q)",
        senses: "visão no escuro",
        defensesText: "imunidade a frio, redução de fogo 10",
        attributes: { str: 3, dex: 0, con: 3, int: null, wis: 0, cha: -5 }
    },
    actions: [
        { name: "Corpo a Corpo", text: "Espada longa +9 (1d8+9, 19)." },
        { name: "Aura Congelante", text: "Aura Congelante (Padrão) Uma vez por cena, o golem de Nor recebe 25 PV temporários. Se uma criatura acertar um ataque corpo a corpo contra o golem enquanto ele tem estes PV temporários, fica enredada (Fort CD 14 evita)." }
    ],
    abilities: [],
    equipment: "Escudo pesado, espada longa.",
    treasure: "Nenhum.",
    skillsText: null
};

export const gargulaAssassina = {
    id: "gargula-assassina",
    name: "Gárgula Assassina",
    type: "construct",
    subtype: "gargula",
    size: "Médio",
    challengeRating: 4,
    description: [],
    role: "solo",
    roleSource: "screenshot-review",
    source: { book: "Ameaças de Arton", pdfFile: "prints enviados pelo usuário", pdfPage: null, bookPage: null },
    stats: {
        initiative: 6, perception: 5, defense: 25, fortitude: 16, reflex: 10, will: 4,
        hitPoints: 140,
        speedText: "12m (8q), voo 18m (12q)",
        senses: "visão no escuro",
        defensesText: "imunidade a petrificado, redução de dano 5",
        attributes: { str: 6, dex: 2, con: 4, int: -2, wis: 1, cha: -2 }
    },
    actions: [
        { name: "Corpo a Corpo", text: "Duas garras +17 (2d6+10)." },
        { name: "Ataque Furtivo", text: "Ataque Furtivo +2d6." }
    ],
    abilities: [
        { name: "Imobilidade", timing: "passiva", text: "Uma gárgula pode permanecer completamente imóvel. Se ela estiver assim, um personagem deve passar num teste de Percepção (CD 35) para perceber que ela é uma criatura e não uma estátua." }
    ],
    equipment: null,
    treasure: "Padrão.",
    skillsText: null
};

export const golemDeCarne = {
    id: "golem-de-carne",
    name: "Golem de Carne",
    type: "construct",
    subtype: null,
    size: "Grande",
    challengeRating: 7,
    description: [],
    role: "solo",
    roleSource: "screenshot-review",
    source: { book: "Ameaças de Arton", pdfFile: "prints enviados pelo usuário", pdfPage: null, bookPage: null },
    stats: {
        initiative: 6, perception: 7, defense: 31, fortitude: 18, reflex: 6, will: 14,
        hitPoints: 300,
        speedText: "9m (6q)",
        senses: "visão no escuro",
        defensesText: "imunidade a metamorfose e trevas, redução de dano 5",
        attributes: { str: 5, dex: -1, con: 4, int: null, wis: 0, cha: -5 }
    },
    actions: [
        { name: "Corpo a Corpo", text: "Duas pancadas +25 (2d10+18)." }
    ],
    abilities: [
        { name: "Fúria Homicida", timing: "passiva", text: "Se estiver com a metade de seus PV, o golem de carne entra em um estado de fúria homicida. Ele recebe +4 em testes de ataque e rolagens de dano e, quando causa dano, deixa a vítima sangrando. Entretanto, sempre deve atacar a criatura mais próxima." },
        { name: "Imunidade a Magia", timing: "passiva", text: "O golem é imune a efeitos mágicos, com as seguintes exceções. Magias de fogo e frio deixam o golem lento por 1d6 rodadas. Efeitos mágicos de eletricidade removem a condição lento e curam PV em quantidade igual à metade do dano que causariam." }
    ],
    equipment: null,
    treasure: "Nenhum.",
    skillsText: null
};

export const soldadoMecanico = {
    id: "soldado-mecanico",
    name: "Soldado Mecânico",
    type: "construct",
    subtype: null,
    size: "Médio",
    challengeRating: 3,
    description: [],
    role: "minion",
    roleSource: "screenshot-review",
    source: { book: "Ameaças de Arton", pdfFile: "prints enviados pelo usuário", pdfPage: null, bookPage: null },
    stats: {
        initiative: 2, perception: 5, defense: 20, fortitude: 14, reflex: 9, will: 4,
        hitPoints: 23,
        speedText: "6m (4q)",
        senses: "visão no escuro",
        defensesText: "imunidade a fogo",
        attributes: { str: 4, dex: -1, con: 3, int: null, wis: 0, cha: -5 }
    },
    actions: [
        { name: "Corpo a Corpo", text: "Lança x2 +16 (1d8+8)." },
        { name: "À Distância", text: "Besta pesada +11 (1d12+10, 19)." },
        { name: "Sopro", text: "Sopro (Padrão) O soldado sopra uma nuvem de vapor escaldante em um cone de 6m. Criaturas na área sofrem 4d6 pontos de dano de fogo (Ref CD 17 reduz à metade). Recarga (movimento)." }
    ],
    abilities: [
        { name: "Movido a Vapor", timing: "passiva", text: "Se o soldado fosse sofrer dano de fogo, em vez disso seu deslocamento aumenta em 3m por 1 rodada. Se ele sofrer dano de frio, fica lento por 1 rodada." }
    ],
    equipment: "Besta pesada, lança, virotes x20.",
    treasure: "Pilha de sucata (vale T$ 100 para fabricar engenhocas).",
    skillsText: null
};

export const espadaDaFloresta = {
    id: "espada-da-floresta",
    name: "Espada-da-Floresta",
    type: "construct",
    subtype: null,
    size: "Médio",
    challengeRating: 3,
    description: [],
    role: "solo",
    roleSource: "screenshot-review",
    source: { book: "Ameaças de Arton", pdfFile: "prints enviados pelo usuário", pdfPage: null, bookPage: null },
    stats: {
        initiative: 8, perception: 7, defense: 22, fortitude: 8, reflex: 11, will: 8,
        hitPoints: 108,
        speedText: "9m (6q)",
        senses: "visão no escuro",
        defensesText: "natureza vegetal, vulnerabilidade a fogo",
        attributes: { str: 6, dex: 3, con: 4, int: -2, wis: 2, cha: 0 }
    },
    actions: [
        { name: "Corpo a Corpo", text: "Espada espinhenta +14 (1d12+15 corte, 19)." }
    ],
    abilities: [
        { name: "Adaptado ao Ambiente", timing: "passiva", text: "Quando em florestas, o espada-da-floresta recebe camuflagem leve contra ataques à distância e ignora terreno difícil natural." },
        { name: "Dínamo Vegetal", timing: "passiva", text: "Quando sofre dano de eletricidade, em vez disso o espada-da-floresta cura PV em quantidade igual a metade do dano que seria causado." },
        { name: "Riposte Natural", timing: "reação", text: "Uma vez por rodada, quando é alvo de um ataque corpo a corpo, o espada-da-floresta pode fazer um teste de ataque e subtrair seu resultado do dano causado pelo ataque." }
    ],
    equipment: null,
    treasure: "Espada espinhenta (CD 18 para extrair) e 50% de chance de 1d4 frutos da espada-mãe (CD 18 para extrair).",
    skillsText: "Furtividade +4 (+9 em florestas)"
};

export const galhadaMacho = {
    id: "galhada-macho",
    name: "Galhada Macho",
    type: "construct",
    subtype: "galhada",
    size: "Grande",
    challengeRating: 2,
    description: [],
    role: "minion",
    roleSource: "screenshot-review",
    source: { book: "Ameaças de Arton", pdfFile: "prints enviados pelo usuário", pdfPage: null, bookPage: null },
    stats: {
        initiative: 4, perception: 7, defense: 19, fortitude: 4, reflex: 11, will: 7,
        hitPoints: 17,
        speedText: "12m (8q)",
        senses: "visão no escuro",
        defensesText: "natureza vegetal, redução de dano 2, resistência a magia +2, vulnerabilidade a fogo",
        attributes: { str: 2, dex: 3, con: 1, int: -4, wis: 1, cha: 0 }
    },
    actions: [
        { name: "Corpo a Corpo", text: "Chifres +12 (1d6+7) e cascos +12 (1d6+7)." }
    ],
    abilities: [
        { name: "Galhada de Allihanna", timing: "passiva", text: "Os chifres do galhada macho são abençoados por Allihanna; eles são armas mágicas que causam o dobro de dano contra mortos-vivos." },
        { name: "Parceiro", timing: "passiva", text: "O galhada macho é um parceiro montaria (Grande). Iniciante: seu deslocamento muda para 12m e você recebe +2 em Sobrevivência. Veterano: seus ataques corpo a corpo são considerados mágicos e, uma vez por turno, você recebe +1d8 em uma rolagem de dano corpo a corpo; esse bônus é dobrado contra mortos-vivos. Mestre: o bônus em rolagens de dano muda para +1d10 e você recebe uma ação de movimento extra por turno, apenas para se deslocar." }
    ],
    equipment: null,
    treasure: "Galhada abençoada (CD 17 para extrair, vale T$ 50 para fabricar um dedo de ente ou uma arma de perfuração superior).",
    skillsText: null
};

export const galhadaFemea = {
    id: "galhada-femea",
    name: "Galhada Fêmea",
    type: "construct",
    subtype: "galhada",
    size: "Grande",
    challengeRating: 2,
    description: [],
    role: "minion",
    roleSource: "screenshot-review",
    source: { book: "Ameaças de Arton", pdfFile: "prints enviados pelo usuário", pdfPage: null, bookPage: null },
    stats: {
        initiative: 4, perception: 7, defense: 19, fortitude: 4, reflex: 11, will: 7,
        hitPoints: 17,
        speedText: "12m (8q)",
        senses: "visão no escuro",
        defensesText: "natureza vegetal, redução de dano 2, resistência a magia +2, vulnerabilidade a fogo",
        attributes: { str: 2, dex: 3, con: 1, int: -4, wis: 1, cha: 0 }
    },
    actions: [
        { name: "Corpo a Corpo", text: "Cascos +14 (2d6+10)." }
    ],
    abilities: [
        { name: "Parceiro", timing: "passiva", text: "A galhada fêmea é um parceiro montaria (Grande). Iniciante: seu deslocamento muda para 12m e você pode gastar uma ação padrão e 1 PM para curar 1d8+1 PV. Veterano: você também pode gastar uma ação padrão e 3 PM para curar 3d8+3 PV ou remover uma condição de doença, fadiga, paralisia ou veneno que o esteja afetando. Mestre: você recebe uma ação de movimento extra por turno, apenas para se deslocar, e pode também gastar uma ação padrão e 5 PM para curar 6d8+6 PV." }
    ],
    equipment: null,
    treasure: "1d4 doses de seiva-galhada (CD 17 para extrair; cada dose conta como um bálsamo restaurador). Como alternativa, se a galhada tiver uma atitude indiferente ou melhor, um personagem pode usar uma ação completa para fazer um teste de Adestramento (CD 16) com ela. Se passar, consegue extrair a seiva de forma amistosa. A galhada produz seiva apenas uma vez por dia.",
    skillsText: null
};

export const constructCreatures = [
    // Manuais
    gargoyle,
    // Livro Básico
    golemDeHierro, colossoSupremo, engenhoDeGuerraGoblin,
    // Ameaças de Arton
    golemDeNorMedio, gargulaAssassina, golemDeCarne, soldadoMecanico, espadaDaFloresta, galhadaMacho, galhadaFemea
];
