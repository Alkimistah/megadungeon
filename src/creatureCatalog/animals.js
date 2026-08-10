export const giantRat = {
    id: "rato-gigante",
    name: "Rato Gigante",
    type: "animal",
    subtype: null,
    size: "Pequeno",
    challengeRating: 0.25,
    description: [
        "Esse roedor de pelagem grossa, olhos vermelhos e presas amareladas atinge até um metro de comprimento. Ratos gigantes vivem em bandos e podem ser encontrados em quase qualquer lugar — pântanos ermos, esgotos de metrópoles e porões de tavernas não muito recomendadas..."
    ],
    source: {
        "book": "Livro Básico",
        "pdfPage": 1,
        "bookPage": null
    },
    stats: {
        "initiative": 5,
        "perception": 4,
        "defense": 12,
        "fortitude": 0,
        "reflex": 3,
        "will": -2,
        "hitPoints": 3,
        "speedText": "12m (8q), escalar 6m (4q)",
        "senses": "faro, visão na penumbra",
        "defensesText": null,
        "attributes": {
            "str": 0,
            "dex": 2,
            "con": 1,
            "int": -4,
            "wis": 1,
            "cha": -3
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +7 (1d4+3 mais doença)."
        }
    ],
    abilities: [
        {
            "name": "Doença",
            "timing": null,
            "text": "Uma criatura mordida por um rato gigante é exposta a doença infecção do esgoto (veja a página 318)."
        }
    ],
    equipment: null,
    treasure: "Nenhum.",
    skillsText: null
};

export const wolf = {
    id: "lobo",
    name: "Lobo",
    type: "animal",
    subtype: "lobo",
    size: "Médio",
    challengeRating: 0.5,
    description: [
        "Predadores primordiais, lobos vivem em alcateias lideradas pelo macho mais forte — o alfa, que conduz o bando nas caçadas. Podem ser encontrados em quase qualquer ambiente, especialmente planícies, florestas e regiões montanhosas. Lobos atacam mordendo as pernas da vítima para derrubá-la. Sua tática favorita é enviar alguns indivíduos para atacar pela frente, enquanto o resto circula e ataca por trás."
    ],
    source: {
        "book": "Livro Básico",
        "pdfPage": 5,
        "bookPage": null
    },
    stats: {
        "initiative": 5,
        "perception": 6,
        "defense": 14,
        "fortitude": 6,
        "reflex": 3,
        "will": 1,
        "hitPoints": 14,
        "speedText": "15m (10q)",
        "senses": "faro, visão na penumbra",
        "defensesText": null,
        "attributes": {
            "str": 3,
            "dex": 3,
            "con": 3,
            "int": -4,
            "wis": 2,
            "cha": -2
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +7 (1d6+5)."
        }
    ],
    abilities: [
        {
            "name": "Derrubar",
            "timing": "livre",
            "text": "Se o lobo acerta um ataque de mordida, pode fazer a manobra derrubar (teste +7)."
        },
        {
            "name": "Táticas de Alcateia",
            "timing": null,
            "text": "Quando flanqueia um inimigo, o lobo recebe +2 no teste de ataque e na rolagem de dano (além do bônus normal por flanquear, para um total de +4 no ataque e +2 no dano)."
        }
    ],
    equipment: null,
    treasure: "Nenhum.",
    skillsText: "Sobrevivência +6"
};

export const caveWolf = {
    id: "lobo-das-cavernas",
    name: "Lobo-das-Cavernas",
    type: "animal",
    subtype: "lobo",
    size: "Grande",
    challengeRating: 2,
    description: [
        "Um ancestral pré-histórico do lobo comum, mas muito maior e com uma coluna de placas ósseas ao longo do dorso. Podem ser encontrados em vários pontos de Arton, sobretudo em Lamnor, onde são usados por goblinoides como bestas de guarda e montaria. As placas dorsais não são armas — estudiosos acreditam que sejam atrativo sexual (apenas os machos as possuem). Lobos-das-cavernas caçam como lobos comuns: quando em alcateia, parte do bando ataca pela frente, enquanto os demais circulam e atacam por trás com a poderosa mordida."
    ],
    source: {
        "book": "Livro Básico",
        "pdfPage": 7,
        "bookPage": null
    },
    stats: {
        "initiative": 5,
        "perception": 7,
        "defense": 19,
        "fortitude": 11,
        "reflex": 7,
        "will": 6,
        "hitPoints": 73,
        "speedText": "15m (10q)",
        "senses": "faro, visão na penumbra",
        "defensesText": null,
        "attributes": {
            "str": 6,
            "dex": 2,
            "con": 5,
            "int": -4,
            "wis": 2,
            "cha": -2
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +13 (2d6+10)."
        }
    ],
    abilities: [
        {
            "name": "Derrubar",
            "timing": "livre",
            "text": "Se o lobo-das-cavernas acerta um ataque de mordida, pode fazer a manobra derrubar (teste +15)."
        },
        {
            "name": "Táticas de Alcateia",
            "timing": null,
            "text": "Quando flanqueia um inimigo, o lobo-das-cavernas recebe +2 no teste de ataque e na rolagem de dano (além do bônus normal por flanquear, para um total de +4 no ataque e +2 no dano)."
        }
    ],
    equipment: null,
    treasure: "Nenhum.",
    skillsText: "Sobrevivência +11"
};

export const gorlogg = {
    "id": "gorlogg",
    "name": "Gorlogg",
    "type": "animal",
    "subtype": null,
    "size": "Grande",
    "challengeRating": 1,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p200 ate 229.pdf",
        "pdfPage": 20,
        "bookPage": 217
    },
    "stats": {
        "initiative": 4,
        "perception": 3,
        "defense": 16,
        "fortitude": 8,
        "reflex": 5,
        "will": 3,
        "hitPoints": 36,
        "speedText": "12m (8q)",
        "senses": "visão na penumbra",
        "defensesText": null,
        "attributes": {
            "str": 5,
            "dex": 2,
            "con": 5,
            "int": -4,
            "wis": 1,
            "cha": -4
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +9 (2d6+8, x3)."
        }
    ],
    "abilities": [
        {
            "name": "Agarrar Aprimorado",
            "timing": "livre",
            "text": "Mordida (teste +13)."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": "Atletismo +9"
};

export const cascavel = {
    id: "cascavel",
    name: "Cascavel",
    type: "animal",
    subtype: "serpente",
    size: "Minúsculo",
    challengeRating: 0.25,
    description: [],
    source: {
        "book": "Livro Básico",
        "pdfPage": 19,
        "bookPage": null
    },
    stats: {
        "initiative": 5,
        "perception": 3,
        "defense": 13,
        "fortitude": 2,
        "reflex": 5,
        "will": -1,
        "hitPoints": 2,
        "speedText": "6m (4q), escalar 6m (4q), natação 9m (6q)",
        "senses": "faro, visão na penumbra",
        "defensesText": null,
        "attributes": {
            "str": -2,
            "dex": 3,
            "con": 0,
            "int": -5,
            "wis": 0,
            "cha": -4
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +7 (1d4 mais veneno)."
        }
    ],
    abilities: [
        {
            "name": "Veneno",
            "timing": null,
            "text": "Perde 1d12 pontos de vida (Fort CD 16 evita)."
        }
    ],
    equipment: null,
    treasure: "1 dose de peçonha comum (CD 15 para extrair).",
    skillsText: "Furtividade +12"
};

export const jiboia = {
    id: "jiboia",
    name: "Jiboia",
    type: "animal",
    subtype: "serpente",
    size: "Médio",
    challengeRating: 0.5,
    description: [],
    source: {
        "book": "Livro Básico",
        "pdfPage": 19,
        "bookPage": null
    },
    stats: {
        "initiative": 5,
        "perception": 3,
        "defense": 14,
        "fortitude": 3,
        "reflex": 5,
        "will": 0,
        "hitPoints": 14,
        "speedText": "6m (4q), escalar 6m (4q), natação 9m (6q)",
        "senses": "faro, visão na penumbra",
        "defensesText": null,
        "attributes": {
            "str": 2,
            "dex": 3,
            "con": 1,
            "int": -5,
            "wis": 1,
            "cha": -4
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +9 (1d6+4)."
        }
    ],
    abilities: [
        {
            "name": "Agarrar Aprimorado",
            "timing": "livre",
            "text": "Se a jiboia acerta um ataque de mordida, pode fazer a manobra agarrar (teste +9)."
        },
        {
            "name": "Constrição",
            "timing": "livre",
            "text": "No início de cada um de seus turnos, a jiboia causa 2d6+4 pontos de dano de impacto na criatura que estiver agarrando."
        }
    ],
    equipment: null,
    treasure: "Nenhum.",
    skillsText: "Furtividade +7"
};

export const naja = {
    id: "naja",
    name: "Naja",
    type: "animal",
    subtype: "serpente",
    size: "Pequeno",
    challengeRating: 1,
    description: [],
    source: {
        "book": "Livro Básico",
        "pdfPage": 19,
        "bookPage": null
    },
    stats: {
        "initiative": 8,
        "perception": 3,
        "defense": 17,
        "fortitude": 5,
        "reflex": 10,
        "will": 1,
        "hitPoints": 13,
        "speedText": "6m (4q), escalar 6m (4q), natação 6m (4q)",
        "senses": "faro, visão na penumbra",
        "defensesText": null,
        "attributes": {
            "str": -1,
            "dex": 4,
            "con": 1,
            "int": -5,
            "wis": 0,
            "cha": -4
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +12 (1d4 mais veneno)."
        }
    ],
    abilities: [
        {
            "name": "Veneno",
            "timing": null,
            "text": "Perde 1d12 pontos de vida durante 3 rodadas (Fortitude CD 18 reduz para uma rodada)."
        }
    ],
    equipment: null,
    treasure: "1 dose de peçonha concentrada (CD 16 para extrair).",
    skillsText: "Furtividade +10"
};

export const sucuri = {
    id: "sucuri",
    name: "Sucuri",
    type: "animal",
    subtype: "serpente",
    size: "Grande",
    challengeRating: 3,
    description: [],
    source: {
        "book": "Livro Básico",
        "pdfPage": 19,
        "bookPage": null
    },
    stats: {
        "initiative": 5,
        "perception": 4,
        "defense": 19,
        "fortitude": 9,
        "reflex": 15,
        "will": 3,
        "hitPoints": 88,
        "speedText": "6m (4q), escalar 9m (6q), natação 9m (6q)",
        "senses": "faro, visão na penumbra",
        "defensesText": null,
        "attributes": {
            "str": 6,
            "dex": 2,
            "con": 4,
            "int": -5,
            "wis": 1,
            "cha": -4
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +18 (2d6+14)."
        }
    ],
    abilities: [
        {
            "name": "Agarrar Aprimorado",
            "timing": "livre",
            "text": "Se a sucuri acerta um ataque de mordida, pode fazer a manobra agarrar (teste +20)."
        },
        {
            "name": "Constrição",
            "timing": "livre",
            "text": "No início de cada um de seus turnos, a sucuri causa 4d6+14 pontos de dano de impacto na criatura que estiver agarrando."
        }
    ],
    equipment: null,
    treasure: "Nenhum.",
    skillsText: "Furtividade +8"
};

export const lagartoPerceguidor = {
    "id": "lagarto-perseguidor",
    "name": "Lagarto Perseguidor",
    "type": "animal",
    "subtype": null,
    "size": "Médio",
    "challengeRating": 2,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p104 ate 124.pdf",
        "pdfPage": 9,
        "bookPage": 110
    },
    "stats": {
        "initiative": 7,
        "perception": 5,
        "defense": 18,
        "fortitude": 7,
        "reflex": 12,
        "will": 3,
        "hitPoints": 16,
        "speedText": "9m (6q), natação 9m (6q)",
        "senses": "faro, visão na penumbra",
        "defensesText": "redução de fogo 5; vulnerabilidade a frio",
        "attributes": {
            "str": 3,
            "dex": 2,
            "con": 3,
            "int": -5,
            "wis": 0,
            "cha": -4
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +14 (2d4+14)."
        }
    ],
    "abilities": [
        {
            "name": "Mordida Infecciosa",
            "timing": null,
            "text": "Uma criatura mordida pelo lagarto perseguidor deve fazer um teste de Fortitude (CD 16) no início de cada um de seus turnos. Se falhar, perde 1d6 pontos de vida. Se passar, encerra este efeito. Metabolismo."
        },
        {
            "name": "Mordida Surpresa",
            "timing": null,
            "text": "A primeira criatura a ser atacada pelo lagarto perseguidor em cada combate fica desprevenida contra este ataque."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": "Atletismo +11, Furtividade +7",
    "role": "minion"
};

export const chibiKabuto = {
    "id": "chibi-kabuto",
    "name": "Chibi-Kabuto",
    "type": "animal",
    "subtype": null,
    "size": "Minúsculo",
    "challengeRating": 0.25,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p156 ate 169.pdf",
        "pdfPage": 1,
        "bookPage": 154
    },
    "stats": {
        "initiative": 4,
        "perception": 6,
        "defense": 13,
        "fortitude": 2,
        "reflex": 3,
        "will": -2,
        "hitPoints": 8,
        "speedText": "6m (4q), voo 3m (2q)",
        "senses": "faro, visão na penumbra",
        "defensesText": null,
        "attributes": {
            "str": -2,
            "dex": 2,
            "con": 0,
            "int": -4,
            "wis": 1,
            "cha": -3
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Galhada +4 (1d6+2 perfuração)."
        }
    ],
    "abilities": [
        {
            "name": "Familiar",
            "timing": null,
            "text": "Um chibi-kabuto familiar aumenta em +1 o bônus na Defesa que você recebe por suas magias."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": null,
    "role": "minion",
    "roleSource": "pdf-review"
};

export const koKabuto = {
    "id": "ko-kabuto",
    "name": "Ko-Kabuto",
    "type": "animal",
    "subtype": null,
    "size": "Pequeno",
    "challengeRating": 1,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p156 ate 169.pdf",
        "pdfPage": 1,
        "bookPage": 154
    },
    "stats": {
        "initiative": 4,
        "perception": 6,
        "defense": 17,
        "fortitude": 7,
        "reflex": 11,
        "will": 0,
        "hitPoints": 38,
        "speedText": "6m (4q), voo 3m (2q)",
        "senses": "faro, visão na penumbra",
        "defensesText": null,
        "attributes": {
            "str": 0,
            "dex": 2,
            "con": 1,
            "int": -4,
            "wis": 1,
            "cha": -3
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Galhada +8 (1d8+9 perfuração)."
        }
    ],
    "abilities": [
        {
            "name": "Agarralhada",
            "timing": null,
            "text": "O ko-kabuto recebe +2 em testes para agarrar e derrubar."
        },
        {
            "name": "Parceiro",
            "timing": null,
            "text": "O ko-kabuto é um parceiro especial (guardião). Iniciante: você recebe visão na penumbra e +1 na Defesa. Veterano: uma vez por rodada, você recebe +1d8 em uma rolagem de dano corpo a corpo. Mestre: o bônus na Defesa muda para +2 e o bônus em rolagens de dano muda para +1d10. Alternativamente, um ko-kabuto pode ser uma montaria Pequena, adequada a criaturas Minúsculas, com as estatísticas de um dai-kabuto."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": null,
    "role": "minion",
    "roleSource": "pdf-review"
};

export const hordaDeKoKabuto = {
    "id": "horda-de-ko-kabuto",
    "name": "Horda de Ko-Kabuto",
    "type": "animal",
    "subtype": null,
    "size": "Médio",
    "challengeRating": 3,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p156 ate 169.pdf",
        "pdfPage": 2,
        "bookPage": 155
    },
    "stats": {
        "initiative": 5,
        "perception": 7,
        "defense": 22,
        "fortitude": 11,
        "reflex": 13,
        "will": 3,
        "hitPoints": 112,
        "speedText": "6m (4q), voo 3m (2q)",
        "senses": "faro, visão na penumbra",
        "defensesText": null,
        "attributes": {
            "str": 1,
            "dex": 2,
            "con": 1,
            "int": -4,
            "wis": 1,
            "cha": -3
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "[Bando] Galhada +12 (2d6+10 perfuração)."
        }
    ],
    "abilities": [
        {
            "name": "Agarralhada",
            "timing": null,
            "text": "A horda de ko-kabuto recebe +2 em testes para agarrar e derrubar."
        },
        {
            "name": "Formação Defensiva",
            "timing": "movimento",
            "text": "A horda recebe +2 na Defesa até seu próximo turno."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": null,
    "role": "minion",
    "roleSource": "pdf-review"
};

export const daiKabuto = {
    "id": "dai-kabuto",
    "name": "Dai-Kabuto",
    "type": "animal",
    "subtype": null,
    "size": "Grande",
    "challengeRating": 4,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p156 ate 169.pdf",
        "pdfPage": 2,
        "bookPage": 155
    },
    "stats": {
        "initiative": 5,
        "perception": 8,
        "defense": 25,
        "fortitude": 16,
        "reflex": 10,
        "will": 4,
        "hitPoints": 155,
        "speedText": "9m (6q), voo 6m (4q)",
        "senses": "faro, visão na penumbra",
        "defensesText": "redução de dano 2",
        "attributes": {
            "str": 3,
            "dex": 1,
            "con": 2,
            "int": -4,
            "wis": 1,
            "cha": -3
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Galhada +16 (2d8+12 perfuração, x3)."
        }
    ],
    "abilities": [
        {
            "name": "Agarralhada",
            "timing": null,
            "text": "O dai-kabuto recebe +2 em testes para agarrar e derrubar."
        },
        {
            "name": "Agarrar Aprimorado",
            "timing": "livre",
            "text": "Galhada (teste +20)."
        },
        {
            "name": "Parceiro",
            "timing": null,
            "text": "O dai-kabuto é um parceiro montaria (Grande). Iniciante: seu deslocamento muda para 9m e você recebe +2 em testes de agarrar e derrubar e uma ação de movimento extra por turno, apenas para se deslocar. Veterano: você recebe deslocamento de voo 6m. Mestre: o bônus em agarrar se aplica a todas as manobras e você recebe +2 na Defesa."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": null,
    "role": "solo",
    "roleSource": "pdf-review"
};

export const asaAssassina = {
    "id": "asa-assassina",
    "name": "Asa-Assassina",
    "type": "animal",
    "subtype": null,
    "size": "Minúsculo",
    "challengeRating": 1,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p200 ate 229.pdf",
        "pdfPage": 1,
        "bookPage": 198
    },
    "stats": {
        "initiative": 8,
        "perception": 4,
        "defense": 15,
        "fortitude": 3,
        "reflex": 10,
        "will": 3,
        "hitPoints": 10,
        "speedText": "3m (2q), voo 12m (8q)",
        "senses": "visão na penumbra",
        "defensesText": null,
        "attributes": {
            "str": -3,
            "dex": 4,
            "con": 1,
            "int": -4,
            "wis": 2,
            "cha": -4
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Asa afiada +10 (2d4+6 corte, 17/x3)."
        }
    ],
    "abilities": [
        {
            "name": "Asas Mortais",
            "timing": null,
            "text": "Quando faz um acerto crítico em uma criatura, a asa-assassina tenta decepar a cabeça dela. A vítima fica inconsciente e sangrando (Fort CD 16 evita ambos). Este sangramento é cumulativo com aquele causado por ser reduzido a 0 PV ou menos; trate cada um separadamente. A critério do mestre, algumas criaturas, como certos construtos, mortos-vivos ou monstros com nenhuma ou várias cabeças, podem ser imunes a esta habilidade."
        },
        {
            "name": "Mergulho",
            "timing": null,
            "text": "Quando faz uma investida alada, a asa-assassina pode continuar se movendo depois do ataque. Ela deve se mover em linha reta e seu movimento máximo ainda é o dobro do seu deslocamento."
        }
    ],
    "equipment": null,
    "treasure": "Asas afiadas (CD 16 para extrair, vale T$ 100 para fabricar uma arma de corte superior).",
    "skillsText": null
};

export const aranhasFilhotes = {
    id: "aranhas-filhotes",
    name: "Aranhas Filhotes",
    type: "animal",
    subtype: "aranha",
    size: "Enxame Minúsculo",
    challengeRating: 1,
    description: [
        "Quando os casulos da matriarca se rompem, dezenas de aranhas recém-nascidas se espalham pelo chão, pelas paredes e por baixo das armaduras.",
        "Sozinhas são frágeis; juntas, viram uma massa de picadas, distração e pânico."
    ],
    role: "minion",
    roleSource: "custom",
    source: { book: "Masmorra de Práxis", pdfFile: "aranha_matriarca_tormenta20_v2", pdfPage: null, bookPage: null },
    stats: {
        initiative: 7, perception: 3, defense: 16, fortitude: 5, reflex: 11, will: 0,
        hitPoints: 30,
        speedText: "9m (6q), escalar 9m (6q)",
        senses: "visão no escuro",
        defensesText: "imunidade a corte e perfuração",
        attributes: { str: -4, dex: 5, con: 1, int: -5, wis: 0, cha: -5 }
    },
    actions: [
        { name: "Enxame", text: "3d4 perfuração." }
    ],
    abilities: [
        { name: "Distração", timing: "passiva", text: "Uma criatura que comece seu turno dentro do espaço do enxame não pode fazer ações que exijam concentração, como lançar magias, e sofre -2 em perícias (Fortitude CD 14 evita ambos). Estes efeitos duram até ela sair da área do enxame e se livrar das aranhas." },
        { name: "Entrar nas Roupas", timing: "passiva", text: "Quando uma criatura sai do espaço do enxame, algumas aranhas ficam dentro de suas roupas, armadura ou equipamento. Se falhou no teste de resistência contra Distração, a criatura continua sofrendo os efeitos de Distração até gastar uma ação padrão para se livrar das aranhas." },
        { name: "Teias Nativas", timing: "passiva", text: "O enxame ignora terreno difícil causado por teias. Enquanto estiver em uma área de teia, recebe +2 em Defesa e Reflexos." },
        { name: "Veneno", timing: "passiva", text: "Condição fraco por 1 rodada; Fortitude CD 14 evita." },
        { name: "Regra de Criação do Enxame", timing: null, text: "O enxame de aranhas filhotes é uma ameaça ND 1 criada para funcionar como extensão da Aranha Matriarca, não como encontro independente. Se convocado por Ninhada Voraz, não conceda XP separado pelo enxame; ele já faz parte do desafio da matriarca." },
        { name: "Ajuste Rápido", timing: null, text: "Para deixar a luta mais leve, remova Veneno. Para deixá-la mais difícil, faça o enxame surgir automaticamente quando a matriarca cair a 70 PV ou menos, além do uso normal de Ninhada Voraz." }
    ],
    equipment: null,
    treasure: "Nenhum.",
    skillsText: "Furtividade +9"
};

export const hiena = {
    "id": "hiena",
    "name": "Hiena",
    "type": "animal",
    "subtype": null,
    "size": "Médio",
    "challengeRating": 1,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p104 ate 124.pdf",
        "pdfPage": 19,
        "bookPage": 120
    },
    "stats": {
        "initiative": 5,
        "perception": 6,
        "defense": 14,
        "fortitude": 9,
        "reflex": 6,
        "will": 1,
        "hitPoints": 17,
        "speedText": "15m (10q)",
        "senses": "faro, visão na penumbra",
        "defensesText": null,
        "attributes": {
            "str": 3,
            "dex": 3,
            "con": 3,
            "int": -4,
            "wis": 2,
            "cha": -2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +9 (1d6+7, x3)."
        }
    ],
    "abilities": [
        {
            "name": "Derrubar",
            "timing": "livre",
            "text": "Mordida (teste +9)."
        },
        {
            "name": "Oportunista",
            "timing": null,
            "text": "A hiena recebe +2 em rolagens de dano contra inimigos que tenham sofrido dano nesta rodada."
        },
        {
            "name": "Parceiro",
            "timing": null,
            "text": "A hiena é um parceiro especial (perseguidor). Iniciante: +2 em Furtividade e Sobrevivência. Veterano: você pode usar Oportunismo; se possuir esse poder, em vez disso seu custo diminui em –1 PM. Mestre: você pode usar Sentidos Aguçados. Alternativamente, uma hiena pode ser uma montaria Média com as estatísticas de um hienodonte."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": "Furtividade +5 (+10 em colinas e planícies), Sobrevivência +6"
};

export const hienaRainha = {
    "id": "hiena-rainha",
    "name": "Hiena Rainha",
    "type": "animal",
    "subtype": null,
    "size": "Médio",
    "challengeRating": 2,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p104 ate 124.pdf",
        "pdfPage": 19,
        "bookPage": 120
    },
    "stats": {
        "initiative": 6,
        "perception": 7,
        "defense": 18,
        "fortitude": 12,
        "reflex": 7,
        "will": 3,
        "hitPoints": 68,
        "speedText": "15m (10q)",
        "senses": "faro, visão na penumbra",
        "defensesText": "resistência a medo +5",
        "attributes": {
            "str": 3,
            "dex": 3,
            "con": 3,
            "int": -4,
            "wis": 2,
            "cha": -2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +12 (2d6+12, x3)."
        }
    ],
    "abilities": [
        {
            "name": "Derrubar",
            "timing": "livre",
            "text": "Mordida (teste +12)."
        },
        {
            "name": "Gargalhada Perturbadora",
            "timing": "movimento",
            "text": "Todos os inimigos da hiena em alcance médio ficam abalados (Von CD 16 evita e torna a criatura imune a esta habilidade até o fim da cena) e todas as hienas e gnolls em alcance médio recebem +5 em Vontade até o fim da cena."
        },
        {
            "name": "Oportunista",
            "timing": null,
            "text": "A hiena recebe +2 em rolagens de dano contra inimigos que tenham sofrido dano nesta rodada."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": "Furtividade +6 (+11 em colinas e planícies), Sobrevivência +7"
};

export const hienodonte = {
    "id": "hienodonte",
    "name": "Hienodonte",
    "type": "animal",
    "subtype": null,
    "size": "Grande",
    "challengeRating": 3,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p104 ate 124.pdf",
        "pdfPage": 19,
        "bookPage": 120
    },
    "stats": {
        "initiative": 5,
        "perception": 6,
        "defense": 20,
        "fortitude": 14,
        "reflex": 9,
        "will": 4,
        "hitPoints": 38,
        "speedText": "12m (8q)",
        "senses": "faro, visão na penumbra",
        "defensesText": null,
        "attributes": {
            "str": 6,
            "dex": 2,
            "con": 4,
            "int": -4,
            "wis": 1,
            "cha": -2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +16 (2d8+15, x3)."
        }
    ],
    "abilities": [
        {
            "name": "Derrubar",
            "timing": "livre",
            "text": "Mordida (teste +18)."
        },
        {
            "name": "Oportunista",
            "timing": null,
            "text": "O hienodonte recebe +2 em rolagens de dano contra inimigos que tenham sofrido dano nesta rodada."
        },
        {
            "name": "Parceiro",
            "timing": null,
            "text": "O hienodonte é um parceiro montaria (Grande). Iniciante: seu deslocamento muda para 12m e você recebe uma ação de movimento extra por turno (apenas para se deslocar). Veterano: você pode usar Oportunismo; se possuir esse poder, em vez disso seu custo diminui em –1 PM. Mestre: quando acerta um ataque corpo a corpo, você pode fazer a manobra derrubar como uma ação livre."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": "Furtividade +3 (+8 em colinas e planícies), Sobrevivência +6"
};

export const baleote = {
    "id": "baleote",
    "name": "Baleote",
    "type": "animal",
    "subtype": null,
    "size": "Grande",
    "challengeRating": 3,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p200 ate 229.pdf",
        "pdfPage": 14,
        "bookPage": 211
    },
    "stats": {
        "initiative": 3,
        "perception": 7,
        "defense": 21,
        "fortitude": 13,
        "reflex": 9,
        "will": 5,
        "hitPoints": 110,
        "speedText": "9m (6q), voo 15m (10q)",
        "senses": "visão na penumbra",
        "defensesText": "imunidade a eletricidade",
        "attributes": {
            "str": 3,
            "dex": 0,
            "con": 3,
            "int": -4,
            "wis": 1,
            "cha": 1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Cauda +14 (2d8+12)."
        }
    ],
    "abilities": [
        {
            "name": "Descarga Elétrica",
            "timing": "padrão",
            "text": "O baleote projeta um raio elétrico que atinge uma linha de 9m. Criaturas nessa área sofrem 3d6 pontos de dano de eletricidade (Ref CD 17 reduz à metade). Recarga (movimento)."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": null
};

export const brontoterio = {
    "id": "brontoterio",
    "name": "Brontotério",
    "type": "animal",
    "subtype": null,
    "size": "Enorme",
    "challengeRating": 8,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p200 ate 229.pdf",
        "pdfPage": 22,
        "bookPage": 219
    },
    "stats": {
        "initiative": 8,
        "perception": 10,
        "defense": 34,
        "fortitude": 20,
        "reflex": 7,
        "will": 15,
        "hitPoints": 310,
        "speedText": "12m (8q)",
        "senses": "faro, visão na penumbra",
        "defensesText": "redução de dano 5",
        "attributes": {
            "str": 8,
            "dex": 0,
            "con": 5,
            "int": -4,
            "wis": 1,
            "cha": -3
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Chifre +26 (4d8+25)."
        }
    ],
    "abilities": [
        {
            "name": "Besta Trovão",
            "timing": "movimento",
            "text": "O brontotério bate suas patas dianteiras no chão, fazendo o barulho de um trovão. Todas as criaturas em alcance curto ficam surdas por 1d4 rodadas (Fort CD 26 evita). Recarga (movimento)."
        },
        {
            "name": "Bloqueio com Chifre",
            "timing": "reação",
            "text": "Uma vez por rodada, quando é atingido por um ataque corpo a corpo, o brontotério pode fazer um teste de ataque de chifre e subtrair o resultado desta rolagem do dano causado pelo ataque."
        },
        {
            "name": "Investida Avassaladora",
            "timing": "completa",
            "text": "O brontotério faz uma investida com seu chifre. Se acertar o ataque, causa +4d8 pontos de dano e a vítima é arremessada 1d6 x 1,5m na direção oposta."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": "Atletismo +18"
};

export const capivara = {
    "id": "capivara",
    "name": "Capivara",
    "type": "animal",
    "subtype": null,
    "size": "Médio",
    "challengeRating": 1,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p200 ate 229.pdf",
        "pdfPage": 14,
        "bookPage": 211
    },
    "stats": {
        "initiative": 1,
        "perception": 5,
        "defense": 16,
        "fortitude": 11,
        "reflex": 5,
        "will": 0,
        "hitPoints": 35,
        "speedText": "9m (6q), natação 12m (8q)",
        "senses": "faro, visão na penumbra",
        "defensesText": null,
        "attributes": {
            "str": 3,
            "dex": 1,
            "con": 3,
            "int": -3,
            "wis": 1,
            "cha": 5
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +11 (1d8+12)."
        }
    ],
    "abilities": [
        {
            "name": "Aparência Inofensiva",
            "timing": null,
            "text": "A primeira criatura inteligente (Int –3 ou maior) que atacar a capivara em uma cena deve fazer um teste de Vontade (CD 14). Se falhar, perderá sua ação."
        },
        {
            "name": "Fedorentina",
            "timing": "padrão",
            "text": "Uma vez por cena, a capivara secreta um odor fétido. Criaturas em alcance curto ficam enjoadas por 1d4 rodadas (Fort CD 14 evita)."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": null
};

export const cavaloDeCarga = {
    "id": "cavalo-de-carga",
    "name": "Cavalo de Carga",
    "type": "animal",
    "subtype": null,
    "size": "Grande",
    "challengeRating": 0.5,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p200 ate 229.pdf",
        "pdfPage": 15,
        "bookPage": 212
    },
    "stats": {
        "initiative": 2,
        "perception": 5,
        "defense": 12,
        "fortitude": 6,
        "reflex": 0,
        "will": 3,
        "hitPoints": 27,
        "speedText": "9m (6q)",
        "senses": "faro, visão na penumbra",
        "defensesText": null,
        "attributes": {
            "str": 5,
            "dex": 0,
            "con": 3,
            "int": -4,
            "wis": 1,
            "cha": -2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Cascos +7 (2d4+5)."
        }
    ],
    "abilities": [],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": "Atletismo +9"
};

export const cavaloDeGuerra = {
    "id": "cavalo-de-guerra",
    "name": "Cavalo de Guerra",
    "type": "animal",
    "subtype": null,
    "size": "Grande",
    "challengeRating": 1,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p200 ate 229.pdf",
        "pdfPage": 15,
        "bookPage": 212
    },
    "stats": {
        "initiative": 3,
        "perception": 5,
        "defense": 14,
        "fortitude": 6,
        "reflex": 5,
        "will": 3,
        "hitPoints": 33,
        "speedText": "15m (10q)",
        "senses": "faro, visão na penumbra",
        "defensesText": null,
        "attributes": {
            "str": 5,
            "dex": 1,
            "con": 2,
            "int": -4,
            "wis": 1,
            "cha": -2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Cascos +9 (2d6+5)."
        }
    ],
    "abilities": [],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": "Atletismo +9"
};

export const cavaloDeMontaria = {
    "id": "cavalo-de-montaria",
    "name": "Cavalo de Montaria",
    "type": "animal",
    "subtype": null,
    "size": "Grande",
    "challengeRating": 0.5,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p200 ate 229.pdf",
        "pdfPage": 15,
        "bookPage": 212
    },
    "stats": {
        "initiative": 3,
        "perception": 5,
        "defense": 13,
        "fortitude": 6,
        "reflex": 3,
        "will": 0,
        "hitPoints": 25,
        "speedText": "15m (10q)",
        "senses": "faro, visão na penumbra",
        "defensesText": null,
        "attributes": {
            "str": 5,
            "dex": 1,
            "con": 2,
            "int": -4,
            "wis": 1,
            "cha": -2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Cascos +7 (2d4+5)."
        }
    ],
    "abilities": [],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": "Atletismo +9"
};

export const cavaloDeNamalkah = {
    "id": "cavalo-de-namalkah",
    "name": "Cavalo de Namalkah",
    "type": "animal",
    "subtype": null,
    "size": "Grande",
    "challengeRating": 2,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p200 ate 229.pdf",
        "pdfPage": 16,
        "bookPage": 213
    },
    "stats": {
        "initiative": 7,
        "perception": 6,
        "defense": 18,
        "fortitude": 11,
        "reflex": 7,
        "will": 4,
        "hitPoints": 60,
        "speedText": "15m (10q)",
        "senses": "faro, visão na penumbra",
        "defensesText": "resistência a medo +2",
        "attributes": {
            "str": 6,
            "dex": 2,
            "con": 3,
            "int": -4,
            "wis": 1,
            "cha": 0
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Cascos +9 (2d8+6)."
        }
    ],
    "abilities": [],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": "Atletismo +11"
};

export const cavaloGlacial = {
    "id": "cavalo-glacial",
    "name": "Cavalo Glacial",
    "type": "animal",
    "subtype": null,
    "size": "Grande",
    "challengeRating": 2,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p200 ate 229.pdf",
        "pdfPage": 17,
        "bookPage": 214
    },
    "stats": {
        "initiative": 4,
        "perception": 6,
        "defense": 19,
        "fortitude": 14,
        "reflex": 7,
        "will": 2,
        "hitPoints": 60,
        "speedText": "9m (6q), natação 12m (8q)",
        "senses": "percepção às cegas, visão na penumbra",
        "defensesText": "redução de frio 5",
        "attributes": {
            "str": 2,
            "dex": 1,
            "con": 3,
            "int": -4,
            "wis": 1,
            "cha": -2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +12 (1d8+9)."
        }
    ],
    "abilities": [
        {
            "name": "Esguicho",
            "timing": "padrão",
            "text": "O cavalo glacial dispara um jato de água gelada pelo respiro em sua cabeça. Criaturas num cone de 6m sofrem 4d6 pontos de dano de frio e ficam lentas por 1d4 rodadas (Fort CD 16 reduz à metade e evita a condição). Recarga (passar 1 rodada submerso em água)."
        }
    ],
    "equipment": null,
    "treasure": "1 dose de éter elemental (frio) (CD 17 para extrair).",
    "skillsText": "Atletismo +7"
};

export const dromedario = {
    "id": "dromedario",
    "name": "Dromedário",
    "type": "animal",
    "subtype": null,
    "size": "Grande",
    "challengeRating": 1,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p200 ate 229.pdf",
        "pdfPage": 18,
        "bookPage": 215
    },
    "stats": {
        "initiative": 7,
        "perception": 2,
        "defense": 15,
        "fortitude": 11,
        "reflex": 5,
        "will": 1,
        "hitPoints": 36,
        "speedText": "12m (8q)",
        "senses": "faro, visão na penumbra",
        "defensesText": "resistência a efeitos metabólicos e de clima +5",
        "attributes": {
            "str": 3,
            "dex": 1,
            "con": 4,
            "int": -2,
            "wis": 2,
            "cha": 0
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +9 (2d4+7)."
        }
    ],
    "abilities": [
        {
            "name": "Cusparada",
            "timing": "padrão",
            "text": "Uma criatura em alcance curto sofre 1d4+3 pontos de dano de impacto e fica enjoada pela rodada (Ref CD 14 evita o dano e a condição)."
        },
        {
            "name": "Patas do Deserto",
            "timing": null,
            "text": "O deslocamento do dromedário não é reduzido por terreno difícil natural em desertos e superfícies similares."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": null
};

export const elefante = {
    "id": "elefante",
    "name": "Elefante",
    "type": "animal",
    "subtype": null,
    "size": "Enorme",
    "challengeRating": 7,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p200 ate 229.pdf",
        "pdfPage": 19,
        "bookPage": 216
    },
    "stats": {
        "initiative": 6,
        "perception": 10,
        "defense": 32,
        "fortitude": 23,
        "reflex": 7,
        "will": 11,
        "hitPoints": 260,
        "speedText": "12m (8q)",
        "senses": "faro, visão na penumbra",
        "defensesText": "redução de dano 5",
        "attributes": {
            "str": 4,
            "dex": -1,
            "con": 4,
            "int": -4,
            "wis": 1,
            "cha": 0
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Presas +24 (2d8+26, x3) e tromba +24 (2d6+22 impacto)."
        }
    ],
    "abilities": [
        {
            "name": "Arremessar",
            "timing": "movimento",
            "text": "Se começar seu turno agarrando uma criatura Média ou menor, o elefante arremessa a vítima 1d6 x 1,5m em uma direção à escolha dele. A vítima sofre 2d6 pontos de dano de impacto, fica caída e, se atingir algum obstáculo, sofre +2d6 pontos de dano (Reflexo CD 24 reduz à metade e evita a condição caído)."
        },
        {
            "name": "Atropelamento",
            "timing": "completa",
            "text": "O elefante percorre até o dobro de seu deslocamento. Ele pode passar pelo espaço ocupado de quaisquer inimigos menores que ele, mas não pode passar duas vezes pelo mesmo espaço. Criaturas atropeladas desta forma sofrem 2d8+26 pontos de dano de impacto e ficam caídas (Ref CD 24 reduz à metade e evita a condição). Recarga (movimento)."
        },
        {
            "name": "Pisotear",
            "timing": "padrão",
            "text": "Uma criatura que o elefante esteja agarrando, ou que esteja caída adjacente a ele, sofre 4d8+52 pontos de dano de impacto e fica fraca por 1 rodada (Fort CD 24 reduz à metade e evita a condição)."
        },
        {
            "name": "Prender",
            "timing": "livre",
            "text": "Se o elefante acerta um ataque de tromba, pode fazer a manobra agarrar ou derrubar (teste +29)."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": null
};

export const gorloggAlfa = {
    "id": "gorlogg-alfa",
    "name": "Gorlogg Alfa",
    "type": "animal",
    "subtype": null,
    "size": "Grande",
    "challengeRating": 5,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p200 ate 229.pdf",
        "pdfPage": 20,
        "bookPage": 217
    },
    "stats": {
        "initiative": 5,
        "perception": 4,
        "defense": 24,
        "fortitude": 13,
        "reflex": 9,
        "will": 6,
        "hitPoints": 206,
        "speedText": "12m (8q)",
        "senses": "visão na penumbra",
        "defensesText": null,
        "attributes": {
            "str": 6,
            "dex": 5,
            "con": 6,
            "int": -4,
            "wis": 1,
            "cha": -2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +18 (4d8+16, x4)."
        }
    ],
    "abilities": [
        {
            "name": "Agarrar Aprimorado",
            "timing": "livre",
            "text": "Mordida (teste +22)."
        },
        {
            "name": "Mordida Dilaceradora",
            "timing": null,
            "text": "Se um ataque do gorlogg alfa exceder a Defesa do inimigo por 5 ou mais, a vítima fica sangrando."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": "Atletismo +12"
};

export const leao = {
    "id": "leao",
    "name": "Leão",
    "type": "animal",
    "subtype": null,
    "size": "Grande",
    "challengeRating": 2,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p200 ate 229.pdf",
        "pdfPage": 21,
        "bookPage": 218
    },
    "stats": {
        "initiative": 8,
        "perception": 9,
        "defense": 17,
        "fortitude": 9,
        "reflex": 10,
        "will": 4,
        "hitPoints": 68,
        "speedText": "15m (10q)",
        "senses": "faro, visão na penumbra",
        "defensesText": null,
        "attributes": {
            "str": 5,
            "dex": 3,
            "con": 3,
            "int": -4,
            "wis": 1,
            "cha": -2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +12 (1d8+5) e duas garras +12 (1d6+5)."
        }
    ],
    "abilities": [
        {
            "name": "Agarrar Aprimorado",
            "timing": "livre",
            "text": "Mordida (teste +14)."
        },
        {
            "name": "Bote",
            "timing": "completa",
            "text": "O leão faz uma investida e ataca com sua mordida e suas garras. Os três ataques recebem o bônus de +2 da investida, mas devem ser feitos contra a mesma criatura."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": "Atletismo +10, Furtividade +8"
};

export const pantera = {
    "id": "pantera",
    "name": "Pantera",
    "type": "animal",
    "subtype": null,
    "size": "Médio",
    "challengeRating": 2,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p200 ate 229.pdf",
        "pdfPage": 21,
        "bookPage": 218
    },
    "stats": {
        "initiative": 7,
        "perception": 4,
        "defense": 16,
        "fortitude": 5,
        "reflex": 11,
        "will": 0,
        "hitPoints": 55,
        "speedText": "18m (12q), escalada 9m (6q)",
        "senses": "faro, visão na penumbra",
        "defensesText": null,
        "attributes": {
            "str": 2,
            "dex": 6,
            "con": 3,
            "int": -3,
            "wis": 1,
            "cha": -2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +12 (1d8+4) e duas garras +12 (1d6+4)."
        }
    ],
    "abilities": [
        {
            "name": "Agarrar Aprimorado",
            "timing": "livre",
            "text": "Mordida (teste +14)."
        },
        {
            "name": "Sufocar",
            "timing": "livre",
            "text": "No início de cada um de seus turnos, a pantera causa 1d8+4 pontos de dano de perfuração na criatura que estiver agarrando. Enquanto estiver agarrada desta forma, a criatura não poderá falar nem respirar (veja “Sufocamento”, em Tormenta20, p. 319)."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": "Atletismo +7, Furtividade +11"
};

export const rinoceronte = {
    "id": "rinoceronte",
    "name": "Rinoceronte",
    "type": "animal",
    "subtype": null,
    "size": "Grande",
    "challengeRating": 4,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p200 ate 229.pdf",
        "pdfPage": 22,
        "bookPage": 219
    },
    "stats": {
        "initiative": 4,
        "perception": 5,
        "defense": 23,
        "fortitude": 16,
        "reflex": 4,
        "will": 10,
        "hitPoints": 130,
        "speedText": "12m (8q)",
        "senses": "faro, visão na penumbra",
        "defensesText": "redução de dano 5",
        "attributes": {
            "str": 6,
            "dex": 0,
            "con": 4,
            "int": -4,
            "wis": 1,
            "cha": -3
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Chifre +16 (1d8+10)."
        }
    ],
    "abilities": [
        {
            "name": "Investida Avassaladora",
            "timing": "completa",
            "text": "O rinoceronte faz uma investida e ataca com seu chifre. Se acertar o ataque, causa +2d8 pontos de dano e a vítima é arremessada 1d6 x 1,5m na direção oposta."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": "Atletismo +10"
};

export const rinoceronteLanoso = {
    "id": "rinoceronte-lanoso",
    "name": "Rinoceronte Lanoso",
    "type": "animal",
    "subtype": null,
    "size": "Grande",
    "challengeRating": 6,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p200 ate 229.pdf",
        "pdfPage": 22,
        "bookPage": 219
    },
    "stats": {
        "initiative": 6,
        "perception": 8,
        "defense": 24,
        "fortitude": 18,
        "reflex": 6,
        "will": 12,
        "hitPoints": 260,
        "speedText": "12m (8q)",
        "senses": "faro, visão na penumbra",
        "defensesText": "redução de dano 5; redução de frio 5",
        "attributes": {
            "str": 7,
            "dex": 0,
            "con": 4,
            "int": -4,
            "wis": 1,
            "cha": -3
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Chifre +20 (2d8+25)."
        }
    ],
    "abilities": [
        {
            "name": "Habitante da Tundra",
            "timing": null,
            "text": "O deslocamento do rinoceronte lanoso não é afetado por gelo ou neve."
        },
        {
            "name": "Investida Avassaladora",
            "timing": "completa",
            "text": "O rinoceronte faz uma investida com seu chifre. Se acertar o ataque, causa +3d8 pontos de dano e a vítima é arremessada 1d6 x 1,5m na direção oposta."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": "Atletismo +12"
};

export const tigre = {
    "id": "tigre",
    "name": "Tigre",
    "type": "animal",
    "subtype": null,
    "size": "Grande",
    "challengeRating": 3,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p200 ate 229.pdf",
        "pdfPage": 21,
        "bookPage": 218
    },
    "stats": {
        "initiative": 12,
        "perception": 9,
        "defense": 18,
        "fortitude": 10,
        "reflex": 16,
        "will": 4,
        "hitPoints": 95,
        "speedText": "15m (10q)",
        "senses": "faro, visão na penumbra",
        "defensesText": null,
        "attributes": {
            "str": 5,
            "dex": 4,
            "con": 3,
            "int": -4,
            "wis": 1,
            "cha": -2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +14 (1d8+6) e duas garras +14 (1d6+6)."
        }
    ],
    "abilities": [
        {
            "name": "Bote",
            "timing": "completa",
            "text": "O tigre faz uma investida e ataca com sua mordida e suas garras. Os três ataques recebem o bônus de +2 da investida, mas devem ser feitos contra a mesma criatura."
        },
        {
            "name": "Ímpeto Destrutivo",
            "timing": null,
            "text": "O tigre recebe +2 em testes de ataque e rolagens de dano em seu primeiro turno de combate."
        },
        {
            "name": "Rugido Paralisante",
            "timing": "movimento",
            "text": "Criaturas em alcance curto ficam imóveis por 1 rodada (Fort CD 17 evita). Uma criatura só pode ser alvo desta habilidade uma vez por cena."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": "Atletismo +10, Furtividade +9 (+14 em florestas)"
};

export const trobo = {
    "id": "trobo",
    "name": "Trobo",
    "type": "animal",
    "subtype": null,
    "size": "Grande",
    "challengeRating": 1,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p200 ate 229.pdf",
        "pdfPage": 24,
        "bookPage": 221
    },
    "stats": {
        "initiative": 4,
        "perception": 5,
        "defense": 14,
        "fortitude": 5,
        "reflex": 8,
        "will": 3,
        "hitPoints": 15,
        "speedText": "15m (10q)",
        "senses": "visão na penumbra",
        "defensesText": "resistência a magia +5",
        "attributes": {
            "str": 4,
            "dex": 2,
            "con": 1,
            "int": -4,
            "wis": 1,
            "cha": -2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +11 (2d4+8)."
        }
    ],
    "abilities": [],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": null
};

export const tumarkhan = {
    "id": "tumarkhan",
    "name": "Tumarkhân",
    "type": "animal",
    "subtype": null,
    "size": "Enorme",
    "challengeRating": 4,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p200 ate 229.pdf",
        "pdfPage": 25,
        "bookPage": 222
    },
    "stats": {
        "initiative": 2,
        "perception": 5,
        "defense": 25,
        "fortitude": 16,
        "reflex": 10,
        "will": 2,
        "hitPoints": 130,
        "speedText": "12m (8q)",
        "senses": "visão na penumbra",
        "defensesText": null,
        "attributes": {
            "str": 10,
            "dex": 0,
            "con": 5,
            "int": -5,
            "wis": 1,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +15 (2d10+12)."
        }
    ],
    "abilities": [
        {
            "name": "Atropelamento",
            "timing": "completa",
            "text": "O tumarkhân percorre até o dobro de seu deslocamento. Ele pode passar pelo espaço ocupado de quaisquer inimigos menores que ele, mas não pode passar duas vezes pelo mesmo espaço. Criaturas atropeladas desta forma sofrem 2d10+12 pontos de dano de impacto e ficam caídas (Ref CD 18 reduz à metade e evita a condição). Recarga (movimento)."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": "Atletismo +14"
};

export const ursoDasCavernas = {
    "id": "urso-das-cavernas",
    "name": "Urso das Cavernas",
    "type": "animal",
    "subtype": null,
    "size": "Enorme",
    "challengeRating": 8,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p200 ate 229.pdf",
        "pdfPage": 27,
        "bookPage": 224
    },
    "stats": {
        "initiative": 9,
        "perception": 10,
        "defense": 31,
        "fortitude": 20,
        "reflex": 15,
        "will": 9,
        "hitPoints": 300,
        "speedText": "12m (8q)",
        "senses": "faro, visão na penumbra",
        "defensesText": "redução de dano 5",
        "attributes": {
            "str": 7,
            "dex": 1,
            "con": 6,
            "int": -4,
            "wis": 2,
            "cha": -2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +27 (2d10+15) e duas garras +27 (2d8+15, 19)."
        }
    ],
    "abilities": [
        {
            "name": "Abraço de Urso",
            "timing": "livre",
            "text": "No início de cada um de seus turnos, o urso das cavernas causa 3d8+15 pontos de dano de impacto em uma criatura Grande ou menor que esteja agarrando."
        },
        {
            "name": "Agarrar Aprimorado",
            "timing": "livre",
            "text": "Mordida (teste +32)."
        },
        {
            "name": "Garras Destruidoras",
            "timing": null,
            "text": "Quando causa dano com suas garras, o urso pode rolar novamente qualquer resultado 1 ou 2 na rolagem de dano."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": "Atletismo +15"
};

export const ursoPanda = {
    "id": "urso-panda",
    "name": "Urso Panda",
    "type": "animal",
    "subtype": null,
    "size": "Médio",
    "challengeRating": 1,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p200 ate 229.pdf",
        "pdfPage": 26,
        "bookPage": 223
    },
    "stats": {
        "initiative": 3,
        "perception": 3,
        "defense": 15,
        "fortitude": 9,
        "reflex": 5,
        "will": 2,
        "hitPoints": 28,
        "speedText": "9m (6q)",
        "senses": "faro, visão na penumbra",
        "defensesText": null,
        "attributes": {
            "str": 4,
            "dex": 3,
            "con": 3,
            "int": -4,
            "wis": 1,
            "cha": 1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +9 (1d6+4) e garras +9 (2d4+4)."
        }
    ],
    "abilities": [
        {
            "name": "Rolamento Defensivo",
            "timing": "reação",
            "text": "Uma vez por rodada, quando sofre dano, o urso panda reduz esse dano à metade e fica caído."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": "Atletismo +6"
};

export const ursoPardo = {
    "id": "urso-pardo",
    "name": "Urso Pardo",
    "type": "animal",
    "subtype": null,
    "size": "Grande",
    "challengeRating": 3,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p200 ate 229.pdf",
        "pdfPage": 26,
        "bookPage": 223
    },
    "stats": {
        "initiative": 4,
        "perception": 7,
        "defense": 19,
        "fortitude": 13,
        "reflex": 10,
        "will": 4,
        "hitPoints": 95,
        "speedText": "12m (8q)",
        "senses": "faro, visão na penumbra",
        "defensesText": null,
        "attributes": {
            "str": 6,
            "dex": 1,
            "con": 5,
            "int": -4,
            "wis": 1,
            "cha": -2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +14 (1d8+4) e duas garras +14 (1d6+4)."
        }
    ],
    "abilities": [
        {
            "name": "Agarrar Aprimorado",
            "timing": "livre",
            "text": "Mordida (teste +16)."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": "Atletismo +11"
};

export const armentoDeBurafontes = {
    "id": "armento-de-burafontes",
    "name": "Armento de Burafontes",
    "type": "animal",
    "subtype": null,
    "size": "Colossal",
    "challengeRating": 8,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p230 ate 253.pdf",
        "pdfPage": 16,
        "bookPage": 243
    },
    "stats": {
        "initiative": 5,
        "perception": 6,
        "defense": 35,
        "fortitude": 21,
        "reflex": 15,
        "will": 8,
        "hitPoints": 310,
        "speedText": "9m (6q)",
        "senses": "faro, visão na penumbra",
        "defensesText": null,
        "attributes": {
            "str": 8,
            "dex": 1,
            "con": 4,
            "int": -4,
            "wis": -2,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "[Bando] Cauda +26 (2d10+24, x3)."
        }
    ],
    "abilities": [
        {
            "name": "Cauda Espinhosa",
            "timing": null,
            "text": "Quando faz um acerto crítico em uma criatura com sua cauda, o armento de burafontes deixa a vítima sangrando."
        },
        {
            "name": "Postura Protetora",
            "timing": "movimento",
            "text": "O armento forma um círculo para proteger seus filhotes, mantendo suas caudas voltadas para fora. Enquanto essa postura estiver ativa, o armento não pode se deslocar, mas pode golpear todas as criaturas ao seu redor. Ele faz um único ataque de cauda e compara o resultado com a Defesa de cada criatura ao seu alcance."
        }
    ],
    "equipment": null,
    "treasure": "2d4 protuberâncias ósseas (CD 23 para extrair, cada protuberância vale T$ 100 para fabricar armas corpo a corpo superiores).",
    "skillsText": null
};

export const bandoDeDeinonicos = {
    "id": "bando-de-deinonicos",
    "name": "Bando de Deinonicos",
    "type": "animal",
    "subtype": null,
    "size": "Enorme",
    "challengeRating": 8,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p230 ate 253.pdf",
        "pdfPage": 18,
        "bookPage": 245
    },
    "stats": {
        "initiative": 9,
        "perception": 8,
        "defense": 23,
        "fortitude": 18,
        "reflex": 12,
        "will": 7,
        "hitPoints": 700,
        "speedText": "15m (10q)",
        "senses": "faro, visão na penumbra",
        "defensesText": null,
        "attributes": {
            "str": 4,
            "dex": 3,
            "con": 4,
            "int": -4,
            "wis": 2,
            "cha": 0
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "[Bando] Mordida +26 (4d4+8) e duas garras +26 (2d6+8, 18)."
        }
    ],
    "abilities": [
        {
            "name": "Caçada Primal",
            "timing": "completa",
            "text": "Os deinonicos avançam correndo e saltando, e atacam todas as criaturas em seu caminho. O bando percorre até o dobro de seu deslocamento; ele pode passar por espaços ocupados por criaturas Médias ou menores, mas não pode passar duas vezes pelo mesmo espaço. Ao final do movimento ele faz dois ataques com garras e compara o resultado de cada ataque com a Defesa de todas as criaturas nos espaços por onde passou, causando dano normal de garras em cada acerto. Os deinonicos não podem utilizar esta habilidade se estiverem flanqueados. Recarga (movimento)."
        }
    ],
    "equipment": null,
    "treasure": "Garras terríveis x2d4 (CD 23 para extrair, cada garra vale T$ 100 para fabricar uma arma de corte superior leve ou de uma mão).",
    "skillsText": null
};

export const burafonte = {
    "id": "burafonte",
    "name": "Burafonte",
    "type": "animal",
    "subtype": null,
    "size": "Enorme",
    "challengeRating": 4,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p230 ate 253.pdf",
        "pdfPage": 16,
        "bookPage": 243
    },
    "stats": {
        "initiative": 3,
        "perception": 4,
        "defense": 25,
        "fortitude": 18,
        "reflex": 8,
        "will": 4,
        "hitPoints": 120,
        "speedText": "9m (6q)",
        "senses": "faro, visão na penumbra",
        "defensesText": null,
        "attributes": {
            "str": 8,
            "dex": 1,
            "con": 4,
            "int": -4,
            "wis": -2,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Cauda +13 (1d10+12, x3)."
        }
    ],
    "abilities": [
        {
            "name": "Cauda Espinhosa",
            "timing": null,
            "text": "Quando faz um acerto crítico em uma criatura com sua cauda, o burafonte deixa a vítima sangrando."
        }
    ],
    "equipment": null,
    "treasure": "Protuberâncias ósseas (CD 19 para extrair, valem T$ 100 para fabricar armas corpo a corpo superiores).",
    "skillsText": null
};

export const deinonico = {
    "id": "deinonico",
    "name": "Deinonico",
    "type": "animal",
    "subtype": null,
    "size": "Médio",
    "challengeRating": 4,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p230 ate 253.pdf",
        "pdfPage": 17,
        "bookPage": 244
    },
    "stats": {
        "initiative": 7,
        "perception": 6,
        "defense": 23,
        "fortitude": 16,
        "reflex": 10,
        "will": 5,
        "hitPoints": 140,
        "speedText": "15m (10q)",
        "senses": "faro, visão na penumbra",
        "defensesText": null,
        "attributes": {
            "str": 4,
            "dex": 3,
            "con": 3,
            "int": -4,
            "wis": 2,
            "cha": 0
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +16 (2d4+4) e duas garras +16 (1d6+8, 18)."
        }
    ],
    "abilities": [
        {
            "name": "Investida Terrível",
            "timing": "completa",
            "text": "O deinonico faz uma investida e ataca com sua mordida e suas garras. Os três ataques recebem o bônus de +2 da investida, mas devem ser feitos contra o mesmo alvo, e os dois ataques de garra recebem +2 na margem de ameaça e no multiplicador de crítico."
        }
    ],
    "equipment": null,
    "treasure": "Duas garras terríveis (CD 19 para extrair, cada garra vale T$ 100 para fabricar uma arma de corte superior leve ou de uma mão).",
    "skillsText": "Atletismo +7 (+12 para saltar)"
};

export const enxameDeGaliGali = {
    "id": "enxame-de-gali-gali",
    "name": "Enxame de Gali-Gali",
    "type": "animal",
    "subtype": null,
    "size": "Médio",
    "challengeRating": 1,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p230 ate 253.pdf",
        "pdfPage": 20,
        "bookPage": 247
    },
    "stats": {
        "initiative": 3,
        "perception": 3,
        "defense": 15,
        "fortitude": 5,
        "reflex": 11,
        "will": 0,
        "hitPoints": 30,
        "speedText": "12m (8q), escalada 6m (4q)",
        "senses": "faro, visão na penumbra",
        "defensesText": null,
        "attributes": {
            "str": 1,
            "dex": 1,
            "con": 0,
            "int": -4,
            "wis": 1,
            "cha": -2
        }
    },
    "actions": [
        {
            "name": "Enxame",
            "text": "4d4+6 pontos de dano de corte."
        }
    ],
    "abilities": [
        {
            "name": "Grudar nas Costas",
            "timing": null,
            "text": "Quando uma criatura sai do espaço do enxame, alguns gali-gali ficam presos em suas costas. A criatura continua sofrendo metade do dano de Enxame até gastar uma ação de movimento para se livrar deles."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": null
};

export const galiGali = {
    "id": "gali-gali",
    "name": "Gali-Gali",
    "type": "animal",
    "subtype": null,
    "size": "Minúsculo",
    "challengeRating": 0.25,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p230 ate 253.pdf",
        "pdfPage": 20,
        "bookPage": 247
    },
    "stats": {
        "initiative": 3,
        "perception": 3,
        "defense": 11,
        "fortitude": 0,
        "reflex": 2,
        "will": -1,
        "hitPoints": 4,
        "speedText": "9m (6q), escalada 6m (4q)",
        "senses": "faro, visão na penumbra",
        "defensesText": null,
        "attributes": {
            "str": 0,
            "dex": 1,
            "con": 0,
            "int": -4,
            "wis": 1,
            "cha": -2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +7 (1d4+4)."
        }
    ],
    "abilities": [],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": null
};

export const grandeBattham = {
    "id": "grande-battham",
    "name": "Grande Battham",
    "type": "animal",
    "subtype": null,
    "size": "Colossal",
    "challengeRating": 12,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p230 ate 253.pdf",
        "pdfPage": 21,
        "bookPage": 248
    },
    "stats": {
        "initiative": 9,
        "perception": 17,
        "defense": 38,
        "fortitude": 26,
        "reflex": 20,
        "will": 12,
        "hitPoints": 800,
        "speedText": "12m (8q)",
        "senses": "faro, visão na penumbra",
        "defensesText": "imunidade a manobras de combate",
        "attributes": {
            "str": 15,
            "dex": -1,
            "con": 10,
            "int": -5,
            "wis": 2,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Cauda +36 (3d6+45, alcance médio) ou pisão +36 (4d12+45)."
        }
    ],
    "abilities": [
        {
            "name": "Quase Titânico",
            "timing": null,
            "text": "Quando se move, o battham pisoteia qualquer criatura ou estrutura Grande ou menor em seu caminho, causando 12d6 pontos de dano de impacto (uma vez por rodada por criatura, Ref CD 33 reduz à metade). Além disso, seus ataques atingem todas as criaturas em um quadrado de 3m (para cada ataque, ele faz um único teste de ataque e compara o resultado com a Defesa de cada inimigo na área)."
        }
    ],
    "equipment": null,
    "treasure": "Fígado de lagarto-trovão (CD 27 para extrair).",
    "skillsText": null
};

export const raagoran = {
    "id": "raagoran",
    "name": "Raagoran",
    "type": "animal",
    "subtype": null,
    "size": "Grande",
    "challengeRating": 8,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p230 ate 253.pdf",
        "pdfPage": 22,
        "bookPage": 249
    },
    "stats": {
        "initiative": 7,
        "perception": 9,
        "defense": 33,
        "fortitude": 21,
        "reflex": 15,
        "will": 8,
        "hitPoints": 320,
        "speedText": "9m (6q)",
        "senses": "faro, visão na penumbra",
        "defensesText": "redução de dano 10",
        "attributes": {
            "str": 5,
            "dex": 0,
            "con": 4,
            "int": -4,
            "wis": 0,
            "cha": -3
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Duas garras +26 (2d8+18, 19) e mordida +26 (2d6+12, x3)."
        }
    ],
    "abilities": [
        {
            "name": "Agarrar Aprimorado",
            "timing": "livre",
            "text": "Mordida (teste +28)."
        },
        {
            "name": "Dilacerar",
            "timing": null,
            "text": "Se o raagoran acerta os dois ataques de garra em uma mesma criatura no mesmo turno, causa mais 2d8+12 pontos de dano."
        },
        {
            "name": "Engolir",
            "timing": "padrão",
            "text": "No início de cada um dos turnos do raagoran, a criatura engolida sofre 2d10+8 pontos de dano de impacto mais 2d10+8 pontos de dano de ácido. Ela pode escapar causando um total de 20 pontos de dano a ele (Defesa 10, redução de dano 0)."
        },
        {
            "name": "Carapaça de Lodo",
            "timing": null,
            "text": "Se o raagoran passar pelo menos 1 rodada completamente imerso em água (ou coberto por uma quantidade equivalente de água) sua carapaça de lodo se desfaz e ele perde sua redução de dano."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": null
};

export const reiTirano = {
    "id": "rei-tirano",
    "name": "Rei-Tirano",
    "type": "animal",
    "subtype": null,
    "size": "Enorme",
    "challengeRating": 14,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p230 ate 253.pdf",
        "pdfPage": 24,
        "bookPage": 251
    },
    "stats": {
        "initiative": 12,
        "perception": 12,
        "defense": 46,
        "fortitude": 28,
        "reflex": 22,
        "will": 14,
        "hitPoints": 725,
        "speedText": "12m (8q)",
        "senses": "faro, visão no escuro",
        "defensesText": "redução de dano 5",
        "attributes": {
            "str": 11,
            "dex": 1,
            "con": 6,
            "int": -4,
            "wis": 1,
            "cha": -2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +40 (6d10+36, x4) e cauda +37 (6d6+31)."
        }
    ],
    "abilities": [
        {
            "name": "Agarrar Aprimorado",
            "timing": "livre",
            "text": "Mordida (teste +45)."
        },
        {
            "name": "Cauda Avassaladora",
            "timing": "livre",
            "text": "Quando acerta um ataque de cauda, o rei-tirano arremessa a vítima 1d10 x 1,5m em uma direção à escolha dele (Fort CD 38 evita). A vítima fica caída e, se atingir algum obstáculo, sofre 1d8 pontos de dano de impacto para cada 1,5m que foi arremessada."
        },
        {
            "name": "Engolir",
            "timing": "padrão",
            "text": "No início de cada um dos turnos do rei-tirano, a criatura engolida sofre 4d12+20 pontos de dano de impacto mais 4d12+20 pontos de dano de ácido. Ela pode escapar causando um total de 75 pontos de dano a ele (Defesa 20, redução de dano 0)."
        },
        {
            "name": "Visão Baseada em Movimento",
            "timing": null,
            "text": "O rei-tirano sofre –10 em testes de Percepção para encontrar criaturas que não estejam se movendo (em termos de jogo, criaturas que tenham feito apenas ações mentais em seu turno anterior)."
        }
    ],
    "equipment": null,
    "treasure": "Dentes do rei-tirano (CD 29 para extrair, valem T$ 1.500 para fabricar armas superiores).",
    "skillsText": null
};

export const tuntram = {
    "id": "tuntram",
    "name": "Tuntram",
    "type": "animal",
    "subtype": null,
    "size": "Enorme",
    "challengeRating": 10,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p230 ate 253.pdf",
        "pdfPage": 22,
        "bookPage": 249
    },
    "stats": {
        "initiative": 9,
        "perception": 12,
        "defense": 36,
        "fortitude": 24,
        "reflex": 9,
        "will": 15,
        "hitPoints": 450,
        "speedText": "9m (6q)",
        "senses": "faro, visão na penumbra",
        "defensesText": "redução de dano 5",
        "attributes": {
            "str": 9,
            "dex": 0,
            "con": 8,
            "int": -4,
            "wis": 2,
            "cha": -2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Chifres +30 (3d12+33, x3)."
        }
    ],
    "abilities": [
        {
            "name": "Amontoar",
            "timing": "completa",
            "text": "O tuntram se move em linha reta até o dobro do seu deslocamento, passando por qualquer criatura Grande ou menor. Criaturas em seu caminho sofrem 9d6+12 pontos de dano de perfuração, são empurradas até o fim do deslocamento do tuntram e ficam caídas na frente dele (Ref CD 30 reduz à metade e evita o empurrão, mas não a condição caído). Recarga (movimento)."
        },
        {
            "name": "Investida Pesada",
            "timing": null,
            "text": "Quando faz uma investida, o tuntram recebe +4 no teste de ataque (para um total de +6) e causa +6d6 pontos de dano."
        }
    ],
    "equipment": null,
    "treasure": "Folho de tuntram (CD 25 para extrair, vale T$ 1.000 para fabricar armaduras e escudos superiores).",
    "skillsText": null
};

export const animalCreatures = [
    // Manuais, Livro Básico e Ameaças de Arton
    giantRat, wolf, caveWolf, aranhasFilhotes,
    gorlogg, cascavel, jiboia, naja,
    sucuri, hiena, hienaRainha, hienodonte,
    lagartoPerceguidor, chibiKabuto, koKabuto, hordaDeKoKabuto,
    daiKabuto, asaAssassina, baleote, brontoterio,
    capivara, cavaloDeCarga, cavaloDeGuerra, cavaloDeMontaria,
    cavaloDeNamalkah, cavaloGlacial, dromedario, elefante,
    gorloggAlfa, leao, pantera, rinoceronte,
    rinoceronteLanoso, tigre, trobo, tumarkhan,
    ursoDasCavernas, ursoPanda, ursoPardo, armentoDeBurafontes,
    bandoDeDeinonicos, burafonte, deinonico, enxameDeGaliGali,
    galiGali, grandeBattham, raagoran, reiTirano,
    tuntram
];
