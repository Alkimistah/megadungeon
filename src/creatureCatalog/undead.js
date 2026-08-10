export const zombie = {
    id: "zumbi",
    name: "Zumbi",
    type: "undead",
    subtype: null,
    size: "Médio",
    challengeRating: 0.25,
    description: [],
    source: {
        "book": "Livro Básico",
        "pdfPage": 12,
        "bookPage": null
    },
    stats: {
        "initiative": -1,
        "perception": -1,
        "defense": 11,
        "fortitude": 3,
        "reflex": -1,
        "will": -1,
        "hitPoints": 20,
        "speedText": "6m (4q)",
        "senses": "visão no escuro",
        "defensesText": null,
        "attributes": {
            "str": 3,
            "dex": -1,
            "con": 2,
            "int": null,
            "wis": -1,
            "cha": 0
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +7 (1d6+6)."
        }
    ],
    abilities: [
        {
            "name": "Fraqueza Zumbi",
            "timing": null,
            "text": "O zumbi sofre o dobro de dano de acertos críticos ou de ataques feitos contra seu cérebro (Defesa 21)."
        }
    ],
    equipment: null,
    treasure: "Nenhum.",
    skillsText: null
};

export const skeleton = {
    id: "esqueleto",
    name: "Esqueleto",
    type: "undead",
    subtype: "esqueleto",
    size: "Médio",
    challengeRating: 2,
    description: [],
    source: {
        "book": "Livro Básico",
        "pdfPage": 12,
        "bookPage": null
    },
    stats: {
        "initiative": 7,
        "perception": 3,
        "defense": 19,
        "fortitude": 3,
        "reflex": 7,
        "will": 12,
        "hitPoints": 14,
        "speedText": "9m (6q)",
        "senses": "visão no escuro",
        "defensesText": "redução de corte, frio e perfuração 5",
        "attributes": {
            "str": 5,
            "dex": 3,
            "con": 0,
            "int": null,
            "wis": 0,
            "cha": -5
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Espada longa +14 (2d8+12, 19)."
        }
    ],
    abilities: [],
    equipment: "Escudo pesado, espada longa",
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
    source: {
        "book": "Livro Básico",
        "pdfPage": 12,
        "bookPage": null
    },
    stats: {
        "initiative": 1,
        "perception": 1,
        "defense": 11,
        "fortitude": 5,
        "reflex": 1,
        "will": 1,
        "hitPoints": 100,
        "speedText": "6m (4q)",
        "senses": "visão no escuro",
        "defensesText": null,
        "attributes": {
            "str": 3,
            "dex": -1,
            "con": 3,
            "int": null,
            "wis": -1,
            "cha": 0
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +17 (2d6+12)"
        }
    ],
    abilities: [
        {
            "name": "Ataque em Bando",
            "timing": null,
            "text": "Se um ataque da turba zumbi exceder a Defesa do inimigo por 10 ou mais, ela causa o dobro do dano. Se um ataque da turba errar, ela ainda assim causa metade do dano."
        },
        {
            "name": "Fraqueza Zumbi",
            "timing": null,
            "text": "A turba zumbi sofre o dobro de dano de acertos críticos ou de ataques feitos contra seus cérebros (Defesa 21)."
        },
        {
            "name": "Forma Coletiva",
            "timing": null,
            "text": "A turba zumbi é imune a efeitos que afetam apenas uma criatura e não causam dano, como a magia Raio do Enfraquecimento, mas sofre 50% a mais de dano de efeitos de área, como Bola de Fogo. Um personagem com o poder Trespassar que acerte a turba pode usá-lo para fazer um ataque adicional contra ela (mas apenas uma vez por turno)."
        }
    ],
    equipment: null,
    treasure: "Nenhum.",
    skillsText: null
};

export const esqueletodeElite = {
    id: "esqueleto-de-elite",
    name: "Esqueleto de Elite",
    type: "undead",
    subtype: "esqueleto",
    size: "Médio",
    challengeRating: 4,
    description: [],
    source: {
        "book": "Livro Básico",
        "pdfPage": 12,
        "bookPage": null
    },
    stats: {
        "initiative": 10,
        "perception": 4,
        "defense": 25,
        "fortitude": 4,
        "reflex": 10,
        "will": 16,
        "hitPoints": 60,
        "speedText": "6m (4q)",
        "senses": "visão no escuro",
        "defensesText": "redução de corte, frio e perfuração 5",
        "attributes": {
            "str": 6,
            "dex": 4,
            "con": 2,
            "int": null,
            "wis": 0,
            "cha": -5
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Espada longa +18 (2d8+15 mais 2d8 de trevas, 19)."
        }
    ],
    abilities: [],
    equipment: "Escudo pesado, espada longa, meia armadura. Tesouro Nenhum",
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
    source: {
        "book": "Livro Básico",
        "pdfPage": 13,
        "bookPage": null
    },
    stats: {
        "initiative": 12,
        "perception": 6,
        "defense": 25,
        "fortitude": 6,
        "reflex": 12,
        "will": 18,
        "hitPoints": 300,
        "speedText": "6m",
        "senses": "visão no escuro",
        "defensesText": "redução de corte, frio e perfuração 5",
        "attributes": {
            "str": 6,
            "dex": 4,
            "con": 2,
            "int": null,
            "wis": 0,
            "cha": -5
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Espada longa +28 (4d8+30 mais 4d8 de trevas, 19)."
        }
    ],
    abilities: [
        {
            "name": "Ataque em Bando",
            "timing": null,
            "text": "Se um ataque da falange exceder a Defesa do inimigo por 10 ou mais, ela causa o dobro do dano. Se um ataque da falange errar, ela ainda assim causa metade do dano."
        },
        {
            "name": "Forma Coletiva",
            "timing": null,
            "text": "A falange é imune a efeitos que afetam apenas uma criatura e não causam dano, como a magia Raio do Enfraquecimento, mas sofre 50% a mais de dano de efeitos de área, como Bola de Fogo. Um personagem com o poder Trespassar que acerte a falange pode usá-lo para fazer um ataque adicional contra ela (mas apenas uma vez por turno)."
        }
    ],
    equipment: ". Escudo pesado, espada longa, meia armadura. Tesouro Nenhum",
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
    description: [
        "Vistas à distância, estas criaturas feitas de pura sombra lembram vultos usando mantos esvoaçantes. Dizem que são sombras separadas de seus antigos “donos”, agora odiando os vivos e a própria luz. Apesar de sua extrema furtividade na escuridão, podem ser detectadas por animais e crianças. Em combate, usam o toque sombrio para drenar a vida de seus oponentes, concentrando-se em uma vítima por vez."
    ],
    source: {
        "book": "Livro Básico",
        "pdfPage": 13,
        "bookPage": null
    },
    stats: {
        "initiative": 10,
        "perception": 6,
        "defense": 23,
        "fortitude": 5,
        "reflex": 17,
        "will": 11,
        "hitPoints": 110,
        "speedText": "Voo 18m (12q)",
        "senses": "visão no escuro",
        "defensesText": "incorpóreo",
        "attributes": {
            "str": null,
            "dex": 6,
            "con": 0,
            "int": 0,
            "wis": 2,
            "cha": 2
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Toque drenante +18 (3d8+6 de trevas). Uma criatura viva atingida deve fazer um teste de Fortitude (CD 21). Se falhar, fica fraca e a aparição recebe 20 PV temporários cumulativos."
        }
    ],
    abilities: [
        {
            "name": "Vulnerabilidade à Luz do Dia",
            "timing": null,
            "text": "Uma aparição exposta a luz solar natural fica debilitada."
        }
    ],
    equipment: null,
    treasure: "Nenhum.",
    skillsText: "Furtividade +15"
};

export const vampiro = {
    id: "vampiro",
    name: "Vampiro",
    type: "undead",
    subtype: null,
    size: "Médio",
    challengeRating: 12,
    description: [
        "Tornar-se vampiro costuma ser o objetivo de muitos necromantes em busca de mais poder ou clérigos de Tenebra que querem melhor servir à deusa. Essa “dádiva” pode ser alcançada através de pactos, rituais ou maldições. Cada vampiro é único, mas todos partilham duas fraquezas principais: são vulneráveis à luz do sol e dependentes de sangue. Ainda que sejam temidos em todo o Reinado e além, muitos vampiros compõem a alta sociedade de Aslothia, onde são membros da nobreza (e cometem atrocidades impunemente)."
    ],
    source: {
        "book": "Livro Básico",
        "pdfPage": 14,
        "bookPage": null
    },
    stats: {
        "initiative": 15,
        "perception": 13,
        "defense": 45,
        "fortitude": 12,
        "reflex": 26,
        "will": 20,
        "hitPoints": 550,
        "speedText": "18m (12q), escalar 18m (12q)",
        "senses": "visão no escuro",
        "defensesText": "cura acelerada 10, redução de dano 10/luz",
        "attributes": {
            "str": 6,
            "dex": 5,
            "con": 5,
            "int": 3,
            "wis": 3,
            "cha": 6
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Espada longa x2 +25 (2d8+25 mais 2d10 de trevas, 17) e garra +36 (2d6+25 mais 2d10 de trevas)."
        }
    ],
    abilities: [
        {
            "name": "Dominação Vampírica",
            "timing": "padrão",
            "text": "O vampiro sussurra palavras de controle para um humanoide em alcance curto. A vítima fica confusa, enfeitiçada ou fascinada até o final da cena ou perde suas memórias da última hora, a escolha do vampiro (Von CD 29 evita). Uma criatura só pode ser alvo desta habilidade uma vez por cena. e"
        },
        {
            "name": "Drenar Sangue",
            "timing": "padrão",
            "text": "O vampiro drena sangue de uma criatura viva que esteja agarrando; ele causa 6d6 pontos de dano de perfuração e recupera a mesma quantidade de PV. Uma criatura morta pelo vampiro desta forma se erguerá como um vampiro na próxima noite e deverá vencer um teste de Vontade oposto contra o vampiro ou ficará sob o controle dele até que ele a liberte ou seja destruído."
        },
        {
            "name": "Forma de Morcego",
            "timing": "padrão",
            "text": "O vampiro se transforma em um morcego. Ele se torna Minúsculo (+5 em Furtividade e –5 em testes de manobra) e recebe deslocamento de voo 12m. Seu equipamento é absorvido (retornando quando ele volta ao normal) e suas outras estatísticas não são alteradas. A transformação dura quanto tempo ele desejar, mas termina caso faça um ataque, lance uma magia ou sofra dano. e"
        },
        {
            "name": "Presença Majestosa",
            "timing": "reação",
            "text": "Quando uma criatura ataca o vampiro, deve passar em um teste de Vontade (CD 29) ou não conseguirá machucá-lo e perderá a ação. Uma criatura que passe no teste de Vontade não é mais afetada por esta habilidade até o fim da cena."
        },
        {
            "name": "Sensibilidade ao Sol",
            "timing": null,
            "text": "Quando exposto a luz solar direta, o vampiro fica ofuscado e perde 6d6 PV por rodada."
        }
    ],
    equipment: "Armadura completa delicada de mitral, espada longa precisa de mitral. Tesouro Dobro",
    treasure: "Dobro.",
    skillsText: "Diplomacia +16, Enganação +16, Furtividade +25, Nobreza +13"
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
    "id": "carnical",
    "name": "Carniçal",
    "type": "undead",
    "subtype": null,
    "size": "Médio",
    "challengeRating": 1,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p230 ate 253.pdf",
        "pdfPage": 2,
        "bookPage": 229
    },
    "stats": {
        "initiative": 6,
        "perception": 1,
        "defense": 15,
        "fortitude": 1,
        "reflex": 5,
        "will": 10,
        "hitPoints": 33,
        "speedText": "9m (6q)",
        "senses": "faro, visão no escuro",
        "defensesText": null,
        "attributes": {
            "str": 2,
            "dex": 3,
            "con": 0,
            "int": -2,
            "wis": 1,
            "cha": 0
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +9 (1d6+3 mais doença) e duas garras +9 (1d4+3)."
        }
    ],
    "abilities": [
        {
            "name": "Doença",
            "timing": null,
            "text": "Uma criatura mordida por um carniçal é exposta à doença febre do carniçal (veja a página 359)."
        },
        {
            "name": "Paralisia",
            "timing": null,
            "text": "Uma criatura atingida pela mordida do carniçal fica paralisada por 1d4 rodadas (Fort CD 16 evita e a criatura não pode mais ser paralisada por esta habilidade até o fim da cena)."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": "Atletismo +6, Furtividade +7"
};

export const lacedon = {
    "id": "lacedon",
    "name": "Lacedon",
    "type": "undead",
    "subtype": null,
    "size": "Médio",
    "challengeRating": 2,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p230 ate 253.pdf",
        "pdfPage": 2,
        "bookPage": 229
    },
    "stats": {
        "initiative": 6,
        "perception": 2,
        "defense": 18,
        "fortitude": 3,
        "reflex": 7,
        "will": 12,
        "hitPoints": 65,
        "speedText": "9m (6q), natação 9m (6q)",
        "senses": "faro, visão no escuro",
        "defensesText": null,
        "attributes": {
            "str": 2,
            "dex": 3,
            "con": 0,
            "int": -2,
            "wis": 1,
            "cha": 0
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +12 (1d6+4 mais doença) e duas garras +12 (1d4+4)."
        }
    ],
    "abilities": [
        {
            "name": "Doença",
            "timing": null,
            "text": "Uma criatura mordida por um lacedon é exposta à doença febre do carniçal (veja p. 359)."
        },
        {
            "name": "Lamento dos Afogados",
            "timing": "reação",
            "text": "Quando morre, o lacedon emite um último lamento. Criaturas em alcance médio perdem 1 PM (Von CD 17 evita)."
        },
        {
            "name": "Paralisia",
            "timing": null,
            "text": "Uma criatura atingida pela mordida do lacedon fica paralisada por 1d4 rodadas (Fort CD 17 evita e a criatura não pode mais ser paralisada por esta habilidade até o fim da cena)."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": "Atletismo +7, Furtividade +8"
};

export const ogroEsqueleto = {
    "id": "ogro-esqueleto",
    "name": "Ogro Esqueleto",
    "type": "undead",
    "subtype": null,
    "size": "Grande",
    "challengeRating": 3,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p230 ate 253.pdf",
        "pdfPage": 2,
        "bookPage": 229
    },
    "stats": {
        "initiative": 3,
        "perception": 0,
        "defense": 19,
        "fortitude": 15,
        "reflex": 3,
        "will": 4,
        "hitPoints": 99,
        "speedText": "9m (6q)",
        "senses": "visão no escuro",
        "defensesText": "redução de corte, frio e perfuração 5",
        "attributes": {
            "str": 4,
            "dex": 1,
            "con": 3,
            "int": null,
            "wis": -1,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Tacape +14 (1d12+15)."
        }
    ],
    "abilities": [
        {
            "name": "Morto Demais…",
            "timing": "movimento",
            "text": "Uma vez por cena, se for desarmado, o ogro esqueleto retira um de seus próprios ossos para utilizar de arma, com as mesmas estatísticas de seu tacape."
        },
        {
            "name": "…Para Morrer Novamente!",
            "timing": null,
            "text": "Todo dano de corte, frio e perfuração que o ogro sofre é reduzido à metade (antes de aplicar a redução de dano)."
        }
    ],
    "equipment": "Tacape aumentado",
    "treasure": "Nenhum.",
    "skillsText": null
};

export const ursoPardoEsqueleto = {
    "id": "urso-pardo-esqueleto",
    "name": "Urso Pardo Esqueleto",
    "type": "undead",
    "subtype": null,
    "size": "Grande",
    "challengeRating": 4,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p230 ate 253.pdf",
        "pdfPage": 3,
        "bookPage": 230
    },
    "stats": {
        "initiative": 4,
        "perception": 3,
        "defense": 20,
        "fortitude": 4,
        "reflex": 16,
        "will": 10,
        "hitPoints": 180,
        "speedText": "9m (6q)",
        "senses": "visão no escuro",
        "defensesText": "redução de corte, frio e perfuração 5",
        "attributes": {
            "str": 5,
            "dex": -1,
            "con": 4,
            "int": -4,
            "wis": -1,
            "cha": -3
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +15 (1d8+4) e duas garras +15 (1d6+4)."
        }
    ],
    "abilities": [
        {
            "name": "Agarrar Aprimorado",
            "timing": "livre",
            "text": "Mordida (teste +17)."
        },
        {
            "name": "Garras Destruidoras",
            "timing": null,
            "text": "Quando causa dano com suas garras, o urso pardo esqueleto pode rolar novamente qualquer resultado 1 ou 2 na rolagem de dano."
        },
        {
            "name": "Ossos Pontiagudos",
            "timing": null,
            "text": "No início de cada um de seus turnos, o urso causa 2d6+7 pontos de dano de perfuração em uma criatura Média ou menor que esteja agarrando. Se a criatura sofrer dano desta forma, ela fica sangrando (Fort CD 18 evita o sangramento)."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": "Atletismo +9"
};

export const gigantEsqueleto = {
    "id": "gigante-esqueleto",
    "name": "Gigante Esqueleto",
    "type": "undead",
    "subtype": null,
    "size": "Enorme",
    "challengeRating": 5,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p230 ate 253.pdf",
        "pdfPage": 3,
        "bookPage": 230
    },
    "stats": {
        "initiative": 4,
        "perception": 4,
        "defense": 24,
        "fortitude": 17,
        "reflex": 5,
        "will": 11,
        "hitPoints": 210,
        "speedText": "12m (8q)",
        "senses": "visão no escuro",
        "defensesText": "redução de corte, frio e perfuração 5",
        "attributes": {
            "str": 6,
            "dex": -1,
            "con": 4,
            "int": -2,
            "wis": 0,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Tacape x2 +17 (2d6+14, x3)."
        }
    ],
    "abilities": [
        {
            "name": "Arremessar Rochas",
            "timing": "completa",
            "text": "O gigante esqueleto arremessa rochas em um quadrado de 3m em alcance curto. Criaturas nessa área sofrem 2d6+14 pontos de dano (Ref CD 20 reduz à metade)."
        },
        {
            "name": "Monte de Ossos",
            "timing": null,
            "text": "Quando sofre um acerto crítico, o gigante se desfaz em uma pilha de ossos. Ele fica caído e vulnerável, falha automaticamente em testes de Reflexos e precisa gastar uma ação de movimento para se remontar e encerrar estes efeitos."
        }
    ],
    "equipment": "Tacape aumentado",
    "treasure": "Nenhum.",
    "skillsText": null
};

export const fantasma = {
    "id": "fantasma",
    "name": "Fantasma",
    "type": "undead",
    "subtype": null,
    "size": "Médio",
    "challengeRating": 7,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p230 ate 253.pdf",
        "pdfPage": 5,
        "bookPage": 232
    },
    "stats": {
        "initiative": 10,
        "perception": 9,
        "defense": 29,
        "fortitude": 7,
        "reflex": 14,
        "will": 20,
        "hitPoints": 190,
        "speedText": "voo 12m (8q)",
        "senses": "visão no escuro",
        "defensesText": "incorpóreo",
        "attributes": {
            "str": null,
            "dex": 3,
            "con": 0,
            "int": 1,
            "wis": 2,
            "cha": 4
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Toque drenante +23 (6d8+20 trevas)."
        }
    ],
    "abilities": [
        {
            "name": "Assustar",
            "timing": "livre",
            "text": "O fantasma se revela subitamente, saindo de um esconderijo ou de dentro de um objeto, como um armário ou parede. Ele só pode usar esta habilidade se estiver escondido, e apenas uma vez por cena. Cada criatura em alcance curto capaz de ver o fantasma fica abalada (Von CD 24 evita). Se falhar no teste de Vontade por 5 ou mais, a criatura fica apavorada e, se falhar por 10 ou mais, também envelhece 2d4 anos. Medo."
        },
        {
            "name": "Drenar Vida",
            "timing": null,
            "text": "Uma criatura atingida pelo toque drenante do fantasma tem seus PV máximos reduzidos em 10 por 1 dia, cumulativamente (Fort CD 24 evita). Caso os PV máximos da criatura sejam reduzidos a 0 desta forma, ela fica inconsciente até que eles sejam restabelecidos."
        },
        {
            "name": "Memento",
            "timing": null,
            "text": "Um fantasma reduzido a 0 PV desaparece e ressurge 1d4 dias depois. Para derrotá-lo permanentemente é necessário confrontá-lo com aquilo que ainda o prende a este mundo. Quando isso acontece, o fantasma pode ser destruído normalmente."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": "Furtividade +15, Intimidação +13"
};

export const garraZumbi = {
    "id": "garra-zumbi",
    "name": "Garra-Zumbi",
    "type": "undead",
    "subtype": null,
    "size": "Minúsculo",
    "challengeRating": 0.25,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p230 ate 253.pdf",
        "pdfPage": 7,
        "bookPage": 234
    },
    "stats": {
        "initiative": 4,
        "perception": 1,
        "defense": 10,
        "fortitude": 0,
        "reflex": 2,
        "will": -1,
        "hitPoints": 5,
        "speedText": "6m (4q), voo 9m (6q)",
        "senses": "percepção às cegas",
        "defensesText": "imunidade a efeitos de sentidos",
        "attributes": {
            "str": 1,
            "dex": 2,
            "con": 1,
            "int": null,
            "wis": -1,
            "cha": null
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Pancada +7 (1d6+5)."
        }
    ],
    "abilities": [
        {
            "name": "Agarrar Aprimorado",
            "timing": "livre",
            "text": "Pancada (criatura Média ou menor, teste +12)."
        },
        {
            "name": "Estrangular",
            "timing": "livre",
            "text": "No início de cada um de seus turnos, a garra-zumbi causa 2d6+2 pontos de dano de impacto na criatura que estiver agarrando. Uma criatura agarrada desta forma não pode falar."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": "Furtividade +11"
};

export const garraZumbiOgro = {
    "id": "garra-zumbi-ogro",
    "name": "Garra-Zumbi Ogro",
    "type": "undead",
    "subtype": null,
    "size": "Médio",
    "challengeRating": 2,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p230 ate 253.pdf",
        "pdfPage": 7,
        "bookPage": 234
    },
    "stats": {
        "initiative": 4,
        "perception": -3,
        "defense": 16,
        "fortitude": 0,
        "reflex": 2,
        "will": -3,
        "hitPoints": 35,
        "speedText": "9m (6q), voo 12m (8q)",
        "senses": "percepção às cegas",
        "defensesText": "imunidade a efeitos de sentidos",
        "attributes": {
            "str": 5,
            "dex": 1,
            "con": 3,
            "int": null,
            "wis": -3,
            "cha": null
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Pancada +14 (2d6+10)."
        }
    ],
    "abilities": [
        {
            "name": "Agarrar Aprimorado",
            "timing": "livre",
            "text": "Pancada (criatura Grande ou menor, teste +19)."
        },
        {
            "name": "Forte Demais...",
            "timing": "livre",
            "text": "No início de cada um de seus turnos, a garra-zumbi ogro causa 4d6+10 pontos de dano de impacto na criatura que estiver agarrando. Uma criatura agarrada desta forma não pode falar."
        },
        {
            "name": "…Para Morrer de Novo!",
            "timing": null,
            "text": "Todo dano de corte, impacto e perfuração que a garra-zumbi sofre é reduzido à metade."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": null
};

export const garraZumbiEnxame = {
    "id": "garra-zumbi-enxame",
    "name": "Garra-Zumbi Enxame",
    "type": "undead",
    "subtype": null,
    "size": "Grande",
    "challengeRating": 3,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p230 ate 253.pdf",
        "pdfPage": 7,
        "bookPage": 234
    },
    "stats": {
        "initiative": 6,
        "perception": 1,
        "defense": 19,
        "fortitude": 9,
        "reflex": 14,
        "will": 4,
        "hitPoints": 40,
        "speedText": "6m (4q), voo 9m (6q)",
        "senses": "percepção às cegas",
        "defensesText": "imunidade a efeitos de sentidos",
        "attributes": {
            "str": 3,
            "dex": 4,
            "con": 3,
            "int": null,
            "wis": -3,
            "cha": null
        }
    },
    "actions": [
        {
            "name": "Enxame",
            "text": "6d6 pontos de dano de impacto (ou 8d6 contra criaturas agarradas)."
        }
    ],
    "abilities": [
        {
            "name": "Maré Estranguladora",
            "timing": "livre",
            "text": "No fim do seu turno, o enxame faz uma manobra agarrar contra todas as criaturas em seu espaço (teste +16). Enquanto estiver agarrada dessa forma, uma criatura fica caída e não pode falar."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": null
};

export const garraZumbiGigante = {
    "id": "garra-zumbi-gigante",
    "name": "Garra-Zumbi Gigante",
    "type": "undead",
    "subtype": null,
    "size": "Grande",
    "challengeRating": 5,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p230 ate 253.pdf",
        "pdfPage": 7,
        "bookPage": 234
    },
    "stats": {
        "initiative": 4,
        "perception": -3,
        "defense": 25,
        "fortitude": 17,
        "reflex": 11,
        "will": 5,
        "hitPoints": 200,
        "speedText": "9m (6q), voo 12m (8q)",
        "senses": "percepção às cegas",
        "defensesText": "imunidade a efeitos de sentidos",
        "attributes": {
            "str": 8,
            "dex": 0,
            "con": 5,
            "int": null,
            "wis": -3,
            "cha": null
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Pancada +17 (2d8+18)."
        }
    ],
    "abilities": [
        {
            "name": "Agarrar Aprimorado",
            "timing": "livre",
            "text": "Pancada (criatura Enorme ou menor, teste +24)."
        },
        {
            "name": "Estrangular",
            "timing": "livre",
            "text": "No início de cada um de seus turnos, a garra-zumbi gigante causa 4d8+12 pontos de dano de impacto na criatura que estiver agarrando. Uma criatura agarrada desta forma não pode falar."
        },
        {
            "name": "Mestre de Manobras",
            "timing": null,
            "text": "A garra-zumbi recebe +5 em testes de manobras (já contabilizado)."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": null
};

export const almaAcorrentada = {
    id: "alma-acorrentada",
    name: "Alma Acorrentada",
    type: "undead",
    subtype: null,
    size: "Médio",
    challengeRating: 7,
    description: [
        "Aparições translúcidas e avermelhadas, envoltas em névoa sangrenta e presas a correntes sobrenaturais ligadas ao domínio de um Lorde da Tormenta.",
        "Atacam tentando agarrar vítimas e mantê-las dentro de sua aura corrosiva. Se uma vítima agarrada for morta, a alma acorrentada e a vítima desaparecem."
    ],
    source: {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p20 ate 31.pdf",
        "pdfPage": 1,
        "bookPage": 18
    },
    stats: {
        "initiative": 14,
        "perception": 9,
        "defense": 26,
        "fortitude": 14,
        "reflex": 19,
        "will": 8,
        "hitPoints": 56,
        "speedText": "voo 9m (6q)",
        "senses": "visão no escuro",
        "defensesText": "incorpóreo",
        "attributes": {
            "str": null,
            "dex": 7,
            "con": 2,
            "int": 1,
            "wis": 0,
            "cha": -2
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Toque cáustico +26 (2d6+10 ácido)."
        }
    ],
    abilities: [
        {
            "name": "Agarrar Oportunista",
            "timing": "livre",
            "text": "Quando a alma acorrentada acerta um ataque, pode usar a manobra agarrar (teste +28). Contra uma criatura agarrada, a alma é considerada corpórea. Se a alma matar uma criatura que esteja agarrando, ambas desaparecerão."
        },
        {
            "name": "Aura Cáustica",
            "timing": null,
            "text": "No início de cada turno da alma, todas as criaturas adjacentes à alma acorrentada sofrem 6d6 pontos de dano de ácido. Uma criatura que morra dentro da aura cáustica não pode ser trazida de volta à vida."
        },
        {
            "name": "Invisibilidade Rubra",
            "timing": null,
            "text": "A alma tem camuflagem total em áreas de Tormenta. Quando ela ataca, essa camuflagem muda para leve até o início de seu próximo turno."
        }
    ],
    equipment: null,
    treasure: "Nenhum.",
    skillsText: "Furtividade +15 (+25 em áreas de Tormenta)"
};

export const infecto = {
    id: "infecto",
    name: "Infecto",
    type: "undead",
    subtype: null,
    size: "Médio",
    challengeRating: 3,
    description: [
        "Mortos-vivos inchados e repletos de parasitas, encontrados sobretudo em áreas de Tormenta e regiões vizinhas. Seus vermes podem contaminar outros seres e transformá-los em novos infectos."
    ],
    source: {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p20 ate 31.pdf",
        "pdfPage": 6,
        "bookPage": 23
    },
    stats: {
        "initiative": 4,
        "perception": 4,
        "defense": 20,
        "fortitude": 14,
        "reflex": 4,
        "will": 4,
        "hitPoints": 30,
        "speedText": "9m (6q)",
        "senses": "visão no escuro",
        "defensesText": "redução de dano 5/corte",
        "attributes": {
            "str": 4,
            "dex": 1,
            "con": 3,
            "int": null,
            "wis": 1,
            "cha": -3
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +16 (1d8+9 mais doença)."
        }
    ],
    abilities: [
        {
            "name": "Doença",
            "timing": null,
            "text": "Uma criatura mordida por um infecto é exposta à doença infecção escarlate."
        },
        {
            "name": "Parasitas Famintos",
            "timing": null,
            "text": "Uma criatura que comece seu turno adjacente ao infecto ou faça um ataque corpo a corpo contra ele é exposta à doença infecção escarlate (Ref CD 17 evita)."
        }
    ],
    equipment: null,
    treasure: "Nenhum.",
    skillsText: null
};

export const turbaDeInfectos = {
    id: "turba-de-infectos",
    name: "Turba de infectos",
    type: "undead",
    subtype: null,
    size: "Grande",
    challengeRating: 7,
    description: [],
    source: {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p20 ate 31.pdf",
        "pdfPage": 6,
        "bookPage": 23
    },
    stats: {
        "initiative": 6,
        "perception": 6,
        "defense": 30,
        "fortitude": 16,
        "reflex": 6,
        "will": 6,
        "hitPoints": 80,
        "speedText": "9m (6q)",
        "senses": "visão no escuro",
        "defensesText": "redução de dano 5/corte",
        "attributes": {
            "str": 4,
            "dex": 1,
            "con": 3,
            "int": null,
            "wis": 1,
            "cha": -3
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "[Bando] Mordida +26 (2d8+26 mais doença)."
        }
    ],
    abilities: [
        {
            "name": "Doença",
            "timing": null,
            "text": "Uma criatura mordida por uma turba de infectos é exposta à doença infecção escarlate."
        },
        {
            "name": "Parasitas Famintos",
            "timing": null,
            "text": "Uma criatura que comece o turno adjacente à turba ou faça um ataque corpo a corpo contra ela é exposta à doença infecção escarlate (Ref CD 24 evita)."
        }
    ],
    equipment: null,
    treasure: "Nenhum.",
    skillsText: null
};

export const guerreiroPerpetuo = {
    "id": "guerreiro-perpetuo",
    "name": "Guerreiro Perpétuo",
    "type": "undead",
    "subtype": null,
    "size": "Médio",
    "challengeRating": 7,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p126 ate 145.pdf",
        "pdfPage": 13,
        "bookPage": 139
    },
    "stats": {
        "initiative": 9,
        "perception": 13,
        "defense": 33,
        "fortitude": 20,
        "reflex": 14,
        "will": 7,
        "hitPoints": 265,
        "speedText": "voo 9m (6q)",
        "senses": "visão no escuro",
        "defensesText": "incorpóreo; redução de dano 5",
        "attributes": {
            "str": null,
            "dex": 6,
            "con": 0,
            "int": 0,
            "wis": 4,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Martelo de guerra x2 +25 (4d6+19, x3)."
        }
    ],
    "abilities": [
        {
            "name": "Sempre Armado",
            "timing": null,
            "text": "Se o guerreiro perpétuo for desarmado por um inimigo, sua arma retornará a ele no fim da rodada. Quando isso ocorre, ela causa 3d12+13 pontos de dano de impacto às criaturas adjacentes ao guerreiro."
        },
        {
            "name": "Casca Vazia",
            "timing": null,
            "text": "O guerreiro pode manipular seu próprio equipamento, mas não pode atravessar objetos sólidos."
        }
    ],
    "equipment": "Escudo pesado, grilhão de descrença, martelo de guerra",
    "treasure": "Nenhum.",
    "skillsText": null
};

export const estouroDeFuriasDeTauron = {
    "id": "estouro-de-furias-de-tauron",
    "name": "Estouro de Fúrias de Tauron",
    "type": "undead",
    "subtype": null,
    "size": "Médio",
    "challengeRating": 8,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p170 ate 191.pdf",
        "pdfPage": 4,
        "bookPage": 171
    },
    "stats": {
        "initiative": 16,
        "perception": 7,
        "defense": 30,
        "fortitude": 15,
        "reflex": 19,
        "will": 10,
        "hitPoints": 76,
        "speedText": "voo 12m (8q)",
        "senses": "visão no escuro",
        "defensesText": "incorpóreo; vulnerabilidade a frio",
        "attributes": {
            "str": null,
            "dex": 5,
            "con": 2,
            "int": -1,
            "wis": 1,
            "cha": 3
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "[Bando] Chifres espectrais +27 (4d8+14 fogo mais 4d8+14 trevas)."
        }
    ],
    "abilities": [
        {
            "name": "Chamas Espectrais",
            "timing": null,
            "text": "Os chifres espectrais do estouro de fúrias de Tauron contam como uma arma mágica. Além disso, uma criatura viva atingida pelos chifres fica desprevenida por 1 rodada e em chamas (Fort CD 28 evita)."
        },
        {
            "name": "Debandada Flamejante",
            "timing": "completa",
            "text": "O estouro percorre até o dobro do seu deslocamento em linha reta, golpeando todas as criaturas em seu caminho. Ele faz um único teste de ataque de seus chifres espectrais e compara com a Defesa de cada criatura nos espaços por onde passou."
        },
        {
            "name": "Apagar a Chama",
            "timing": null,
            "text": "Quando sofre dano de frio, o estouro fica debilitado e lento por 1 rodada."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": null
};

export const furiaDeTauron = {
    "id": "furia-de-tauron",
    "name": "Fúria de Tauron",
    "type": "undead",
    "subtype": null,
    "size": "Pequeno",
    "challengeRating": 4,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p170 ate 191.pdf",
        "pdfPage": 3,
        "bookPage": 170
    },
    "stats": {
        "initiative": 14,
        "perception": 5,
        "defense": 20,
        "fortitude": 8,
        "reflex": 15,
        "will": 4,
        "hitPoints": 30,
        "speedText": "voo 12m (8q)",
        "senses": "visão no escuro",
        "defensesText": "incorpóreo; vulnerabilidade a frio",
        "attributes": {
            "str": null,
            "dex": 5,
            "con": 2,
            "int": -1,
            "wis": 1,
            "cha": 3
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Chifres espectrais +15 (2d8+7 fogo mais 2d8+7 trevas)."
        }
    ],
    "abilities": [
        {
            "name": "Chamas Espectrais",
            "timing": null,
            "text": "Os chifres espectrais da fúria de Tauron contam como uma arma mágica. Além disso, uma criatura viva atingida pelos chifres fica desprevenida por 1 rodada e em chamas (Fort CD 20 evita)."
        },
        {
            "name": "Debandada Flamejante",
            "timing": "completa",
            "text": "A fúria percorre até o dobro do seu deslocamento em linha reta, golpeando todas as criaturas em seu caminho. Ela faz um único teste de ataque de seus chifres espectrais e compara com a Defesa de cada criatura nos espaços por onde passou."
        },
        {
            "name": "Apagar a Chama",
            "timing": null,
            "text": "Quando sofre dano de frio, a fúria fica debilitada e lenta por 1 rodada."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": null
};

export const cavaloEsqueleto = {
    "id": "cavalo-esqueleto",
    "name": "Cavalo Esqueleto",
    "type": "undead",
    "subtype": null,
    "size": "Grande",
    "challengeRating": 1,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p230 ate 253.pdf",
        "pdfPage": 2,
        "bookPage": 229
    },
    "stats": {
        "initiative": 3,
        "perception": 5,
        "defense": 16,
        "fortitude": 11,
        "reflex": 5,
        "will": 0,
        "hitPoints": 30,
        "speedText": "15m (10q)",
        "senses": "visão no escuro",
        "defensesText": "redução de corte, frio e perfuração 5",
        "attributes": {
            "str": 5,
            "dex": 1,
            "con": 0,
            "int": null,
            "wis": 1,
            "cha": -5
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Cascos +9 (2d6+5)."
        }
    ],
    "abilities": [
        {
            "name": "Pavor Equestre",
            "timing": null,
            "text": "Uma criatura que comece seu turno vendo um cavalo esqueleto fica abalada por 1d4 rodadas (Von CD 14 evita e a criatura não pode mais ser abalada por esta habilidade até o fim da cena)."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": "Atletismo +9"
};

export const fantasmaAncestral = {
    "id": "fantasma-ancestral",
    "name": "Fantasma Ancestral",
    "type": "undead",
    "subtype": null,
    "size": "Médio",
    "challengeRating": 14,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p230 ate 253.pdf",
        "pdfPage": 5,
        "bookPage": 232
    },
    "stats": {
        "initiative": 18,
        "perception": 15,
        "defense": 40,
        "fortitude": 12,
        "reflex": 18,
        "will": 23,
        "hitPoints": 410,
        "speedText": "voo 15m (10q)",
        "senses": "visão no escuro",
        "defensesText": "incorpóreo",
        "attributes": {
            "str": null,
            "dex": 5,
            "con": 0,
            "int": 1,
            "wis": 2,
            "cha": 6
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Toque drenante x2 +33 (6d8+41 trevas)."
        }
    ],
    "abilities": [
        {
            "name": "Assustar",
            "timing": "livre",
            "text": "O fantasma ancestral se revela subitamente, saindo de um esconderijo ou de dentro de um objeto, como um armário ou parede. Ele só pode usar esta habilidade se estiver escondido, e apenas uma vez por cena. Cada criatura em alcance curto capaz de ver o fantasma fica abalada (Von CD 33 evita). Se falhar no teste de Vontade por 5 ou mais, a criatura fica apavorada e, se falhar por 10 ou mais, também envelhece 2d4 anos. Medo."
        },
        {
            "name": "Drenar Vida",
            "timing": null,
            "text": "Uma criatura atingida pelo toque drenante do fantasma tem seus PV máximos reduzidos em 20 por 1 dia, cumulativamente (Fort CD 33 evita). Caso os PV máximos da criatura sejam reduzidos a 0 desta forma, ela fica inconsciente até que eles sejam restabelecidos."
        },
        {
            "name": "Face Sombria da Morte",
            "timing": null,
            "text": "Criaturas imunes a dano de trevas sofrem metade do dano de trevas do fantasma, e mortos-vivos não recuperam pontos de vida com esse dano."
        },
        {
            "name": "Lamento dos Mortos",
            "timing": "reação",
            "text": "Quando os pontos de vida do fantasma são reduzidos a 205 ou menos, ele passa a emitir uma violenta aura de energia negativa com 9m de raio. Cada criatura que comece seu turno nesta área sofre 20d6 pontos de dano de trevas e fica debilitada e esmorecida (Von CD 38 reduz para fraca e frustrada)."
        },
        {
            "name": "Memento",
            "timing": null,
            "text": "Um fantasma reduzido a 0 PV desaparece e ressurge 1d4 dias depois. Para derrotá-lo permanentemente é necessário confrontá-lo com aquilo que ainda o prende a este mundo. Quando isso acontece, o fantasma perde sua habilidade Face Sombria da Morte e pode ser destruído normalmente."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": "Furtividade +22, Intimidação +19"
};

export const hidraEsqueleto = {
    "id": "hidra-esqueleto",
    "name": "Hidra Esqueleto",
    "type": "undead",
    "subtype": null,
    "size": "Enorme",
    "challengeRating": 11,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p230 ate 253.pdf",
        "pdfPage": 4,
        "bookPage": 231
    },
    "stats": {
        "initiative": 9,
        "perception": 9,
        "defense": 39,
        "fortitude": 24,
        "reflex": 18,
        "will": 9,
        "hitPoints": 550,
        "speedText": "9m (6q), natação 9m (6q)",
        "senses": "visão no escuro",
        "defensesText": "cura acelerada 100; redução de corte, frio e perfuração 10",
        "attributes": {
            "str": 10,
            "dex": 0,
            "con": 10,
            "int": null,
            "wis": -1,
            "cha": -5
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Cinco mordidas +34 (3d6+16)."
        }
    ],
    "abilities": [
        {
            "name": "Quebra-Ossos",
            "timing": null,
            "text": "As cabeças da hidra são seu ponto fraco e é possível atacá-las diretamente (Defesa 41). Se o ataque acertar e causar pelo menos 25 pontos de dano de impacto, a cabeça é decepada e a hidra perde um ataque de mordida. Entretanto, 1d4 rodadas após a cabeça ser decepada, duas novas nascem em seu lugar (a hidra pode ter até dez cabeças). Para impedir o nascimento de novas cabeças é necessário purificar o pescoço. Isso exige causar 25 pontos de dano de luz. Se todas as cabeças da hidra forem decepadas e todos seus pescoços forem purificados, ela morre."
        }
    ],
    "equipment": null,
    "treasure": "Padrão.",
    "skillsText": "Furtividade +4 (+14 em pântanos)"
};

export const livido = {
    "id": "livido",
    "name": "Lívido",
    "type": "undead",
    "subtype": null,
    "size": "Médio",
    "challengeRating": 3,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p230 ate 253.pdf",
        "pdfPage": 8,
        "bookPage": 235
    },
    "stats": {
        "initiative": 3,
        "perception": 4,
        "defense": 19,
        "fortitude": 3,
        "reflex": 9,
        "will": 15,
        "hitPoints": 70,
        "speedText": "9m (6q)",
        "senses": "faro, visão no escuro",
        "defensesText": "vulnerabilidade a luz",
        "attributes": {
            "str": 2,
            "dex": 3,
            "con": 0,
            "int": 1,
            "wis": 1,
            "cha": 0
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +12 (1d6+6 mais doença) e duas garras +12 (1d4+3)."
        }
    ],
    "abilities": [
        {
            "name": "Doença",
            "timing": null,
            "text": "Uma criatura mordida por um lívido é exposta à doença febre do carniçal (veja a página 359)."
        },
        {
            "name": "Odor Pungente",
            "timing": null,
            "text": "Criaturas que comecem seus turnos em alcance curto do lívido ficam enjoadas por 1 rodada e perdem 1d6 PV (Fort CD 20 evita). Veneno."
        },
        {
            "name": "Paralisia",
            "timing": null,
            "text": "Uma criatura atingida pela mordida do lívido fica paralisada por 1d4 rodadas (Fort CD 20 evita e a criatura não pode mais ser paralisada por esta habilidade até o fim da cena)."
        },
        {
            "name": "Trapaceiro do Além",
            "timing": "padrão",
            "text": "O lívido arremessa uma isca putrefata que contamina uma criatura em alcance médio (Ref CD 20 evita). Até o fim da cena, todos os mortos-vivos recebem +1d6 em suas rolagens de dano contra a criatura contaminada e seus ataques contra ela causam sangramento. Recarga (movimento)."
        }
    ],
    "equipment": null,
    "treasure": "1d4-1 doses de isca putrefata (CD 18 para extrair).",
    "skillsText": "Enganação +8, Furtividade +8"
};

export const mamuteEsqueleto = {
    "id": "mamute-esqueleto",
    "name": "Mamute Esqueleto",
    "type": "undead",
    "subtype": null,
    "size": "Enorme",
    "challengeRating": 8,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p230 ate 253.pdf",
        "pdfPage": 3,
        "bookPage": 230
    },
    "stats": {
        "initiative": 10,
        "perception": 9,
        "defense": 33,
        "fortitude": 21,
        "reflex": 8,
        "will": 15,
        "hitPoints": 340,
        "speedText": "12m (8q)",
        "senses": "visão no escuro",
        "defensesText": "redução de corte, frio e perfuração 5",
        "attributes": {
            "str": 6,
            "dex": 0,
            "con": 4,
            "int": -4,
            "wis": 1,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Presas +26 (2d8+26, 19) e duas pancadas +26 (1d6+19)."
        }
    ],
    "abilities": [
        {
            "name": "Atropelamento",
            "timing": "completa",
            "text": "O mamute esqueleto percorre até o dobro de seu deslocamento. Ele pode passar pelo espaço ocupado de quaisquer inimigos menores que ele, mas não pode passar duas vezes pelo mesmo espaço. Criaturas atropeladas desta forma sofrem 2d8+26 pontos de dano de impacto e ficam caídas (Ref CD 26 reduz à metade e evita a condição). Recarga (movimento)."
        },
        {
            "name": "Monte de Ossos",
            "timing": null,
            "text": "Quando sofre um acerto crítico, o mamute se desfaz em uma pilha de ossos. Ele fica caído e vulnerável, falha automaticamente em testes de Reflexos e precisa gastar uma ação de movimento para se remontar e encerrar estes efeitos."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": null
};

export const mortalha = {
    "id": "mortalha",
    "name": "Mortalha",
    "type": "undead",
    "subtype": null,
    "size": "Médio",
    "challengeRating": 11,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p230 ate 253.pdf",
        "pdfPage": 9,
        "bookPage": 236
    },
    "stats": {
        "initiative": 19,
        "perception": 13,
        "defense": 38,
        "fortitude": 11,
        "reflex": 24,
        "will": 18,
        "hitPoints": 475,
        "speedText": "voo 18m (12q)",
        "senses": "visão no escuro",
        "defensesText": "incorpóreo",
        "attributes": {
            "str": null,
            "dex": 8,
            "con": 0,
            "int": 3,
            "wis": 2,
            "cha": 3
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Toque drenante 2x +34 (3d10+24 trevas)."
        }
    ],
    "abilities": [
        {
            "name": "Cria Tumular",
            "timing": null,
            "text": "Uma criatura viva reduzida a 0 PV ou menos pelo toque drenante da mortalha ressurge no início da próxima rodada como uma aparição (veja Tormenta20, p. 298) e não pode mais ser revivida. Quando a mortalha é destruída, as aparições que ela criou se desfazem e suas almas retornam aos corpos originais (caso ainda estejam vivos), que despertam com 1 PV."
        },
        {
            "name": "Drenar Vitalidade",
            "timing": null,
            "text": "Uma criatura viva atingida pelo toque drenante da mortalha deve fazer um teste de Fortitude (CD 31). Se falhar, fica fraca e a mortalha recebe 30 PV temporários cumulativos."
        },
        {
            "name": "Maldição Mortuária",
            "timing": "padrão",
            "text": "A mortalha profere uma maldição mortuária contra uma criatura em alcance médio (Fort CD 31 evita)."
        },
        {
            "name": "Fraqueza Solar",
            "timing": null,
            "text": "Enquanto estiver exposta à luz solar natural, a mortalha fica debilitada."
        }
    ],
    "equipment": null,
    "treasure": "Manto da mortalha (CD 26 para extrair, vale T$ 6.000 e 1 PM para fabricar um item com os encantos fantasmagórico ou tumular).",
    "skillsText": "Furtividade +22"
};

export const mumia = {
    "id": "mumia",
    "name": "Múmia",
    "type": "undead",
    "subtype": null,
    "size": "Médio",
    "challengeRating": 5,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p230 ate 253.pdf",
        "pdfPage": 9,
        "bookPage": 236
    },
    "stats": {
        "initiative": 3,
        "perception": 8,
        "defense": 22,
        "fortitude": 11,
        "reflex": 5,
        "will": 17,
        "hitPoints": 192,
        "speedText": "6m (4q)",
        "senses": "visão no escuro",
        "defensesText": "redução de dano 5; vulnerabilidade a fogo",
        "attributes": {
            "str": 3,
            "dex": 1,
            "con": 2,
            "int": 0,
            "wis": 3,
            "cha": 2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Duas pancadas +17 (2d10+10 mais doença)."
        }
    ],
    "abilities": [
        {
            "name": "Desespero",
            "timing": null,
            "text": "Uma criatura que comece seu turno vendo uma múmia fica apavorada (Von CD 20 evita e a criatura não pode mais ser apavorada por esta habilidade até o fim da cena)."
        },
        {
            "name": "Doença",
            "timing": null,
            "text": "Uma criatura atingida por uma pancada da múmia é exposta à doença podridão da múmia."
        }
    ],
    "equipment": null,
    "treasure": "Padrão.",
    "skillsText": "Furtividade +10"
};

export const necrodracoEsqueleto = {
    "id": "necrodraco-esqueleto",
    "name": "Necrodraco Esqueleto",
    "type": "undead",
    "subtype": "dragão",
    "size": "Enorme",
    "challengeRating": 12,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p230 ate 253.pdf",
        "pdfPage": 11,
        "bookPage": 238
    },
    "stats": {
        "initiative": 13,
        "perception": 18,
        "defense": 44,
        "fortitude": 24,
        "reflex": 11,
        "will": 18,
        "hitPoints": 610,
        "speedText": "12m (8q), voo 24m (16q)",
        "senses": "percepção às cegas, visão no escuro",
        "defensesText": "imunidade a atordoado, metamorfose e paralisia; redução de corte, frio e perfuração 10; redução de dano 10/luz",
        "attributes": {
            "str": 10,
            "dex": 1,
            "con": 8,
            "int": 5,
            "wis": 6,
            "cha": 0
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +36 (4d10+30, 18) e duas garras +36 (3d10+30, 18)."
        }
    ],
    "abilities": [
        {
            "name": "Sopro",
            "timing": "padrão",
            "text": "Criaturas em um cone de 15m sofrem 12d12 pontos de dano de trevas e não podem recuperar pontos de vida por 1 rodada (Ref CD 34 reduz à metade e evita a restrição de cura). Recarga (movimento)."
        },
        {
            "name": "Varrer",
            "timing": "livre",
            "text": "Uma vez por rodada, quando o necrodraco esqueleto faz um ataque corpo a corpo e reduz os pontos de vida do alvo a 0 ou menos, pode realizar um ataque adicional contra outra criatura dentro do seu alcance."
        }
    ],
    "equipment": null,
    "treasure": "Padrão e 1d6 doses de terra de cemitério (CD 27 para extrair).",
    "skillsText": "Atletismo +20"
};

export const necrodracoLich = {
    "id": "necrodraco-lich",
    "name": "Necrodraco Lich",
    "type": "undead",
    "subtype": "dragão",
    "size": "Colossal",
    "challengeRating": 20,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p230 ate 253.pdf",
        "pdfPage": 12,
        "bookPage": 239
    },
    "stats": {
        "initiative": 16,
        "perception": 20,
        "defense": 63,
        "fortitude": 34,
        "reflex": 24,
        "will": 30,
        "hitPoints": 1400,
        "manaPoints": 133,
        "speedText": "12m (8q), voo 36m (24q)",
        "senses": "percepção às cegas (médio), visão no escuro",
        "defensesText": "imunidade a atordoado, metamorfose e paralisia; redução de dano 20/luz; resistência a magia +5; vulnerabilidade a luz",
        "attributes": {
            "str": 12,
            "dex": 0,
            "con": 8,
            "int": 12,
            "wis": 4,
            "cha": 5
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +55 (4d20+50, 16, mais 1d20 trevas) e duas garras +50 (4d20+50, 16, mais 1d20 trevas)."
        }
    ],
    "abilities": [
        {
            "name": "Aura Aterradora",
            "timing": null,
            "text": "Vontade CD 53 evita."
        },
        {
            "name": "Couro Necromântico",
            "timing": null,
            "text": "O couro do necrodraco reduz todo dano de corte, impacto e perfuração que ele sofre à metade. Se ele passar num teste de resistência contra uma magia que o tenha como alvo, ela é revertida contra o conjurador."
        },
        {
            "name": "Filactério",
            "timing": null,
            "text": "Caso o necrodraco seja morto, ele retorna completamente recuperado em 1d10 dias. A única forma de derrotá-lo permanentemente é destruir seu filactério (veja a página 292)."
        },
        {
            "name": "Fluxo de Mana",
            "timing": null,
            "text": "O necrodraco pode manter dois efeitos sustentados simultaneamente com apenas uma ação livre (mas pagando o custo de cada um)."
        },
        {
            "name": "Magia Acelerada",
            "timing": "livre",
            "cost": "+4 PM",
            "text": "Uma vez por rodada, quando lança uma magia com execução de ação completa ou menor, o necrodraco muda a execução dela para livre."
        },
        {
            "name": "Sopro Tenebroso",
            "timing": "padrão",
            "text": "Todas as criaturas em um cone de 18m sofrem 20d12 pontos de dano de trevas e, por 1 rodada, não podem recuperar pontos de vida de nenhuma forma (Fort CD 53 reduz à metade e evita a restrição de cura). O necrodraco recupera PV igual à metade do dano do sopro. Recarga (movimento)."
        },
        {
            "name": "Varrer",
            "timing": "livre",
            "text": "Uma vez por rodada, quando o necrodraco faz um ataque corpo a corpo e reduz os pontos de vida do alvo a 0 ou menos, pode realizar um ataque adicional contra outra criatura dentro do seu alcance."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como um conjurador arcano de 20º nível (CD 53, limite de PM 25)."
        },
        {
            "name": "Campo de Força",
            "timing": "reação",
            "cost": "11 PM",
            "text": "Quando sofre dano, o necrodraco recebe redução de dano 70 contra esse dano."
        },
        {
            "name": "Controlar o Tempo",
            "timing": "padrão",
            "cost": "15 PM",
            "text": "O necrodraco controla o tempo ao seu redor (veja Tormenta20, p. 187)."
        },
        {
            "name": "Dissipar Magia",
            "timing": "padrão",
            "cost": "3 PM",
            "text": "O necrodraco escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias nesse alvo com CD igual ou menor que o resultado do teste são dissipadas."
        },
        {
            "name": "Enfeitiçar",
            "timing": "padrão",
            "cost": "1 PM",
            "text": "Um humanoide em alcance curto fica enfeitiçado (Von evita)."
        },
        {
            "name": "Tentáculos de Trevas",
            "timing": "padrão",
            "cost": "18 PM",
            "text": "Até o fim da cena, tentáculos surgem em uma esfera de 12m em alcance médio. Ao lançar a magia e no início de cada um de seus turnos, o necrodraco faz um teste da manobra agarrar (usando Misticismo) contra cada criatura na área. Se ele passar, a criatura é agarrada; se a vítima já está agarrada, é esmagada, sofrendo 12d6 pontos de dano de trevas. A área conta como terreno difícil. Os tentáculos são imunes a dano."
        },
        {
            "name": "Toque da Morte",
            "timing": "padrão",
            "cost": "25 PM",
            "text": "Inimigos em alcance curto sofrem 10d8+18 pontos de dano de trevas. Um inimigo com menos da metade de seus PV em vez disso deve fazer um teste de Fortitude. Se passar, sofre o dano normal. Se falhar, seus PV são reduzidos a –10."
        },
        {
            "name": "Toque Vampírico",
            "timing": "padrão",
            "cost": "19 PM",
            "text": "O necrodraco faz um ataque corpo a corpo. Se acertar, além do dano normal, causa 20d6 pontos de dano de trevas e recupera pontos de vida em valor igual à metade desse dano de trevas."
        },
        {
            "name": "Velocidade",
            "timing": "padrão",
            "cost": "10 PM, sustentada",
            "text": "O necrodraco pode executar uma ação padrão adicional por turno."
        }
    ],
    "equipment": null,
    "treasure": "Dobro e fragmento de filactério.",
    "skillsText": "Conhecimento +28, Cura +20, Enganação +21, Intimidação +21, Intuição +20, Misticismo +28, Ofício (alquimista) +28, Religião +20"
};

export const necrodracoZumbi = {
    "id": "necrodraco-zumbi",
    "name": "Necrodraco Zumbi",
    "type": "undead",
    "subtype": "dragão",
    "size": "Enorme",
    "challengeRating": 14,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p230 ate 253.pdf",
        "pdfPage": 11,
        "bookPage": 238
    },
    "stats": {
        "initiative": 14,
        "perception": 19,
        "defense": 47,
        "fortitude": 28,
        "reflex": 13,
        "will": 22,
        "hitPoints": 720,
        "speedText": "12m (8q), voo 24m (16q)",
        "senses": "percepção às cegas, visão no escuro",
        "defensesText": "imunidade a atordoado, metamorfose e paralisia; redução de dano 15/luz",
        "attributes": {
            "str": 12,
            "dex": 1,
            "con": 9,
            "int": 6,
            "wis": 6,
            "cha": 0
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +36 (4d12+35, 17) e duas garras +36 (3d12+35, 17)."
        }
    ],
    "abilities": [
        {
            "name": "Aura de Podridão",
            "timing": null,
            "text": "Uma criatura que comece seu turno em um raio de 30m do necrodraco zumbi é exposta à doença calafrio diabólico (veja Tormenta20, p. 318). Devido à virulência do necrodraco, a CD para resistir a essa doença é 38."
        },
        {
            "name": "Sopro",
            "timing": "padrão",
            "text": "Cada criatura em um cone de 15m sofre 15d12 pontos de dano de trevas e fica debilitada e esmorecida (Ref CD 38 reduz à metade e diminui para fraca e frustrada). Recarga (movimento)."
        },
        {
            "name": "Varrer",
            "timing": "livre",
            "text": "Uma vez por rodada, quando o necrodraco faz um ataque corpo a corpo e reduz os pontos de vida do alvo a 0 ou menos, pode realizar um ataque adicional contra outra criatura dentro do seu alcance."
        },
        {
            "name": "Fraqueza Zumbi",
            "timing": null,
            "text": "O necrodraco sofre o dobro de dano de acertos críticos ou de ataques feitos contra seu cérebro (Defesa 57)."
        }
    ],
    "equipment": null,
    "treasure": "Padrão e 2d4 doses de terra de cemitério (CD 29 para extrair).",
    "skillsText": "Atletismo +23"
};

export const reiTiranoEsqueleto = {
    "id": "rei-tirano-esqueleto",
    "name": "Rei-Tirano Esqueleto",
    "type": "undead",
    "subtype": null,
    "size": "Enorme",
    "challengeRating": 12,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p230 ate 253.pdf",
        "pdfPage": 4,
        "bookPage": 231
    },
    "stats": {
        "initiative": 10,
        "perception": 9,
        "defense": 43,
        "fortitude": 26,
        "reflex": 20,
        "will": 12,
        "hitPoints": 625,
        "speedText": "12m (8q)",
        "senses": "visão no escuro",
        "defensesText": "redução de corte, frio e perfuração 10",
        "attributes": {
            "str": 10,
            "dex": 0,
            "con": 4,
            "int": null,
            "wis": -1,
            "cha": -4
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +37 (6d10+31) e cauda +37 (6d6+26)."
        }
    ],
    "abilities": [
        {
            "name": "Agarrar Aprimorado",
            "timing": "livre",
            "text": "Mordida (teste +42)."
        },
        {
            "name": "Cauda Avassaladora",
            "timing": "livre",
            "text": "Quando acerta um ataque de cauda, o rei-tirano esqueleto arremessa a vítima 1d8 x 1,5m em uma direção à escolha dele (Fort CD 35 evita). A vítima fica caída e, se atingir algum obstáculo, sofre 1d8 pontos de dano de impacto para cada 1,5m que foi arremessada."
        },
        {
            "name": "Engolir",
            "timing": "padrão",
            "text": "No início de cada um dos turnos do rei-tirano, a criatura engolida sofre 6d6+16 pontos de dano de corte mais 6d6+16 pontos de dano de trevas. Ela pode escapar causando um total de 50 pontos de dano a ele (Defesa 15) ou, se for Minúscula, gastando uma ação de movimento. A criatura engolida não fica cega nem tem cobertura contra efeitos do lado de fora (e vice-versa)."
        },
        {
            "name": "Monte de Ossos",
            "timing": null,
            "text": "Quando sofre um acerto crítico, o rei-tirano se desfaz em uma pilha de ossos. Ele fica caído e vulnerável, falha automaticamente em testes de Reflexos e precisa gastar uma ação de movimento para se remontar e encerrar estes efeitos."
        },
        {
            "name": "Visão Baseada em Movimento",
            "timing": null,
            "text": "O rei-tirano sofre –10 em testes de Percepção para encontrar criaturas que não estejam se movendo (em termos de jogo, criaturas que tenham feito apenas ações mentais em seu turno anterior)."
        }
    ],
    "equipment": null,
    "treasure": "Dentes do rei-tirano (CD 27 para extrair, valem T$ 1.500 para fabricar armas superiores).",
    "skillsText": null
};

export const senhorDasMumias = {
    "id": "senhor-das-mumias",
    "name": "Senhor das Múmias",
    "type": "undead",
    "subtype": null,
    "size": "Médio",
    "challengeRating": 15,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p230 ate 253.pdf",
        "pdfPage": 10,
        "bookPage": 237
    },
    "stats": {
        "initiative": 14,
        "perception": 20,
        "defense": 48,
        "fortitude": 22,
        "reflex": 15,
        "will": 28,
        "hitPoints": 532,
        "manaPoints": 95,
        "speedText": "9m (6q)",
        "senses": "visão no escuro",
        "defensesText": "redução de dano 10; resistência a efeitos divinos +5",
        "attributes": {
            "str": 4,
            "dex": 2,
            "con": 3,
            "int": 2,
            "wis": 5,
            "cha": 7
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Ankh solar +41 (1d6+25, 19) e pancada +41 (3d10+25 mais doença)."
        }
    ],
    "abilities": [
        {
            "name": "Desespero Superior",
            "timing": null,
            "text": "Uma criatura que comece seu turno vendo uma múmia fica apavorada (Von CD 42 evita e a criatura não pode mais ser apavorada por esta habilidade até o fim da cena)."
        },
        {
            "name": "Doença",
            "timing": null,
            "text": "Uma criatura atingida por uma pancada do senhor das múmias é exposta à doença podridão da múmia. A força da maldição do senhor das múmias faz com que a CD para resistir a essa doença seja 42."
        },
        {
            "name": "Maldição da Múmia",
            "timing": null,
            "text": "Uma criatura que falhe em um teste de resistência contra uma magia do senhor das múmias não pode recuperar pontos de vida por 1 rodada."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como um clérigo de 15º nível (CD 42)."
        },
        {
            "name": "Disfarce Ilusório",
            "timing": "padrão",
            "cost": "3 PM",
            "text": "Até o fim da cena, o senhor das múmias muda a própria aparência, incluindo seu equipamento, e ainda os odores e as sensações que transmite. Isso afeta altura, peso, tom de pele, cor de cabelo, timbre de voz etc. Ele recebe +20 em testes de Enganação para disfarce (Von desacredita)."
        },
        {
            "name": "Enxame de Pestes",
            "timing": "completa",
            "cost": "15 PM, sustentada",
            "text": "Dois enxames de gafanhotos de fogo surgem em alcance médio e ocupam um quadrado de 1,5m cada. No fim de cada um dos turnos do senhor das múmias, cada enxame causa 5d12 pontos de dano de fogo a qualquer criatura em seu espaço (Ref reduz à metade). O senhor das múmias pode gastar uma ação de movimento para mover cada enxame 12m."
        },
        {
            "name": "Infligir Ferimentos",
            "timing": "padrão",
            "cost": "10 PM",
            "text": "Como parte da execução da magia, o senhor das múmias faz um ataque corpo a corpo. Se acertar, além do dano normal, causa 5d8+5 pontos de dano de trevas e deixa o alvo fraco até o fim da cena."
        },
        {
            "name": "Perdição",
            "timing": "padrão",
            "cost": "7 PM",
            "text": "Criaturas escolhidas em alcance curto sofrem –4 em testes de ataque e rolagens de dano até o fim da cena."
        },
        {
            "name": "Poeira da Podridão",
            "timing": "padrão",
            "cost": "14 PM",
            "text": "Criaturas em uma nuvem de 6m de raio em alcance médio começam a definhar e apodrecer. Quando a magia é lançada, e no início de seus turnos até o fim da cena, criaturas na área sofrem 6d8+24 pontos de dano de trevas e não podem recuperar PV por uma rodada (Fort reduz à metade e evita a restrição de cura)."
        }
    ],
    "equipment": "Ankh solar harmonizado, símbolo sagrado, traje de seda banhado a ouro",
    "treasure": "Padrão.",
    "skillsText": "Diplomacia +22, Enganação +20, Furtividade +15, Intuição +18"
};

export const tarsoDragaoReiDosMortos = {
    "id": "tarso-dragao-rei-dos-mortos",
    "name": "Tarso, Dragão-Rei dos Mortos",
    "type": "undead",
    "subtype": "dragão",
    "size": "Colossal",
    "challengeRating": "S+",
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p230 ate 253.pdf",
        "pdfPage": 14,
        "bookPage": 241
    },
    "stats": {
        "initiative": 23,
        "perception": 25,
        "defense": 70,
        "fortitude": 38,
        "reflex": 25,
        "will": 33,
        "hitPoints": 3800,
        "speedText": "24m (16q), voo 45m (30q)",
        "senses": "percepção às cegas (longo), visão no escuro",
        "defensesText": "imunidade a medo; redução de dano 30/luz; resistência a magia +10; vulnerabilidade a luz; maior que a morte",
        "attributes": {
            "str": 15,
            "dex": 5,
            "con": 10,
            "int": 18,
            "wis": 7,
            "cha": 8
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +65 (5d20+50, 16, mais 1d20 trevas) e duas garras +65 (5d20+50, 16, mais 1d20 trevas)."
        }
    ],
    "abilities": [
        {
            "name": "Arcano de Batalha",
            "timing": null,
            "text": "Tarso soma sua Inteligência nas rolagens de dano quando lança magias (já contabilizado)."
        },
        {
            "name": "Aura Aterradora",
            "timing": null,
            "text": "Vontade CD 55 evita (se falhar por 10 ou mais, a criatura morre automaticamente). A aura afeta apenas criaturas escolhidas. Medo."
        },
        {
            "name": "Conjuração Cadavérica",
            "timing": null,
            "text": "Uma criatura que falhe na resistência contra uma das magias de Tarso sofre 2d20 pontos de dano de trevas e fica enjoada."
        },
        {
            "name": "Couro Necromântico",
            "timing": null,
            "text": "O dano de fontes mundanas que Tarso sofre é reduzido à metade. Se ele passar num teste de resistência contra uma magia que o tem como alvo, ela é revertida contra o conjurador."
        },
        {
            "name": "Dilacerar",
            "timing": null,
            "text": "Se Tarso acertar dois ataques de garra em uma mesma criatura no mesmo turno, causa mais 5d20+50 pontos de dano."
        },
        {
            "name": "Filactério",
            "timing": null,
            "text": "Caso Tarso seja morto, ele retorna completamente recuperado em 1d10 dias. A única forma de derrotá-lo permanentemente é destruir seu filactério (veja a p. 292)."
        },
        {
            "name": "Fluxo de Mana",
            "timing": null,
            "text": "Tarso pode manter dois efeitos sustentados simultaneamente com apenas uma ação livre (mas pagando o custo de cada um)."
        },
        {
            "name": "Metamorfose Dracônica",
            "timing": "completa",
            "text": "Tarso costuma assumir a forma de um pequeno esqueleto de aparência amigável."
        },
        {
            "name": "Necromante Ancestral",
            "timing": null,
            "text": "Tarso lança qualquer magia, arcana ou divina, como um conjurador arcano de 20º nível sem gastar PM (CD 55, 57 para necromancia, limite 38 PM). Uma vez por rodada, ele pode lançar uma dessas magias como ação livre."
        },
        {
            "name": "Sopro Tenebroso",
            "timing": "padrão",
            "text": "Criaturas em um cone de 30m sofrem 30d12 pontos de dano de ácido, frio ou trevas, à escolha de Tarso, e, por 1 rodada, não podem recuperar PV de nenhuma forma (Fort CD 55 reduz o dano à metade e evita a restrição de cura). Tarso recupera PV igual à metade do dano total do sopro. Recarga (movimento)."
        },
        {
            "name": "Protegido Indefeso",
            "timing": null,
            "text": "Tarso pode escolher até uma criatura como seu protegido por vez. Ele sempre sabe a localização e condição exatas do protegido, e pode usar a magia Teletransporte para a localização dele como uma ação livre, sem necessidade de teste de Misticismo."
        },
        {
            "name": "Trevas Profundas",
            "timing": null,
            "text": "Todo dano de trevas causado por Tarso ignora redução de dano e, contra criaturas imunes a trevas, ainda causa metade do dano."
        },
        {
            "name": "Varrer",
            "timing": "livre",
            "text": "Uma vez por rodada, quando Tarso faz um ataque corpo a corpo e reduz os PV do alvo a 0 ou menos, pode realizar um ataque adicional contra outra criatura dentro do seu alcance."
        },
        {
            "name": "Maior que a Morte",
            "timing": null,
            "text": "Criaturas de ND S e S+ possuem um status especial. Para estatísticas não listadas em suas fichas, são consideradas criaturas de ND 20; para habilidades de outras criaturas, seu ND é maior que 20, impedindo efeitos limitados pelo nível do alvo."
        }
    ],
    "equipment": null,
    "treasure": "Padrão, fragmento de filactério e um sorvete.",
    "skillsText": "Conhecimento +36, Cura +25, Diplomacia +26, Enganação +26, Intimidação +26, Intuição +25, Misticismo +36, Nobreza +36, Ofício (alquimista) +36, Religião +25"
};

export const afogado = {
    "id": "afogado",
    "name": "Afogado",
    "type": "undead",
    "subtype": null,
    "size": "Médio",
    "challengeRating": 7,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p254 ate 272.pdf",
        "pdfPage": 2,
        "bookPage": 253
    },
    "stats": {
        "initiative": 9,
        "perception": 6,
        "defense": 29,
        "fortitude": 19,
        "reflex": 14,
        "will": 8,
        "hitPoints": 60,
        "speedText": "6m (4q), natação 9m (6q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a atordoado e medo",
        "attributes": {
            "str": 3,
            "dex": 2,
            "con": 3,
            "int": -1,
            "wis": -1,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Duas pancadas +26 (2d6+18 mais 2d8 ácido)."
        }
    ],
    "abilities": [
        {
            "name": "Aura de Afogamento",
            "timing": null,
            "text": "No início de cada turno do afogado, cada criatura em um raio de 9m que não seja capaz de respirar na água deve fazer um teste de Fortitude (CD 24, +1 por teste anterior). Se falhar, a criatura se afoga. Uma criatura afogada desta forma fica inconsciente e perde 1d6 pontos de vida por rodada até sair da área."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": null
};

export const capitaoAfogado = {
    "id": "capitao-afogado",
    "name": "Capitão Afogado",
    "type": "undead",
    "subtype": null,
    "size": "Médio",
    "challengeRating": 10,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p254 ate 272.pdf",
        "pdfPage": 2,
        "bookPage": 253
    },
    "stats": {
        "initiative": 11,
        "perception": 8,
        "defense": 35,
        "fortitude": 21,
        "reflex": 10,
        "will": 15,
        "hitPoints": 380,
        "speedText": "6m (4q), natação 9m (6q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a atordoado e medo; redução de dano 5",
        "attributes": {
            "str": 4,
            "dex": 2,
            "con": 3,
            "int": -1,
            "wis": -1,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Duas pancadas +29 (2d6+24 mais 2d8 ácido)."
        }
    ],
    "abilities": [
        {
            "name": "Aura de Afogamento",
            "timing": null,
            "text": "No início de cada turno do afogado, cada criatura em um raio de 9m que não seja capaz de respirar na água deve fazer um teste de Fortitude (CD 25, +1 por teste anterior). Se falhar, a criatura se afoga. Uma criatura afogada desta forma fica inconsciente e perde 1d6 pontos de vida por rodada até sair da área."
        },
        {
            "name": "Recrutas Sufocados",
            "timing": "movimento",
            "text": "Uma vez por cena, o capitão afogado invoca 1d4+1 grumetes afogados em espaços desocupados em alcance curto. Eles agem a partir da próxima rodada do capitão, têm deslocamento 6m (normal e de natação) e podem gastar uma ação padrão para causar 1d8+4 pontos de dano de impacto em uma criatura adjacente. Os grumetes afogados têm For 2, Des 1, Defesa 18 e 1 PV, falham automaticamente em qualquer teste oposto ou de resistência e desaparecem quando mortos ou ao fim da cena. Uma criatura adjacente a um ou mais grumetes afogados sofre –2 em Fortitude."
        }
    ],
    "equipment": null,
    "treasure": "Padrão mais papagaio zumbi (um personagem com a habilidade Familiar pode transformar o papagaio zumbi em um familiar que aumenta em +1 a CD dos testes para resistir a suas magias de necromancia e concede +2 em Pilotagem).",
    "skillsText": null
};

export const capitaoPirata = {
    "id": "capitao-pirata",
    "name": "Capitão Pirata",
    "type": "undead",
    "subtype": "osteon",
    "size": "Médio",
    "challengeRating": 7,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p254 ate 272.pdf",
        "pdfPage": 8,
        "bookPage": 259
    },
    "stats": {
        "initiative": 16,
        "perception": 8,
        "defense": 31,
        "fortitude": 8,
        "reflex": 19,
        "will": 14,
        "hitPoints": 265,
        "speedText": "9m (6q)",
        "senses": "visão no escuro",
        "defensesText": "evasão; imunidade a medo; redução de corte, frio e perfuração 5",
        "attributes": {
            "str": 1,
            "dex": 5,
            "con": 2,
            "int": 1,
            "wis": 1,
            "cha": 3
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Cimitarra x2 +24 (1d6+12, 17, mais 2d12 ácido)."
        },
        {
            "name": "À Distância",
            "text": "Pistola +24 (2d6+12, 19/x3)."
        }
    ],
    "abilities": [
        {
            "name": "Correr pelo Cordame",
            "timing": "completa",
            "text": "O pirata percorre até seu deslocamento, ignorando terreno difícil, e faz um ataque corpo a corpo com +2 no teste de ataque e +1d6 na rolagem de dano."
        },
        {
            "name": "Pernas do Mar",
            "timing": null,
            "text": "Quando está se equilibrando ou escalando, o pirata não fica desprevenido e seu deslocamento não é reduzido à metade."
        },
        {
            "name": "Salmoura",
            "timing": null,
            "text": "Uma criatura que sofra dano de ácido de um ataque do capitão pirata sofre –2 em testes de perícia por 1 rodada."
        },
        {
            "name": "Saque Rápido",
            "timing": null,
            "text": "O capitão pirata pode sacar ou guardar itens como uma ação livre e recarregar sua pistola como uma ação de movimento."
        },
        {
            "name": "Terror dos Mares",
            "timing": "movimento",
            "text": "Criaturas em alcance médio ficam abaladas (Von CD 24 reduz a duração para 1 rodada e a criatura não pode mais ser abalada por esta habilidade até o fim da cena). Recarga (movimento)."
        }
    ],
    "equipment": "Balas x20, bandana, cimitarra, pistola",
    "treasure": "Dobro mais bandeira pirata. Uma bandeira pirata pode ser instalada em um veículo sem custos, e oferece os benefícios da melhoria macabra.",
    "skillsText": "Acrobacia +14, Atletismo +10, Intimidação +13, Pilotagem +14"
};

export const imediato = {
    "id": "imediato",
    "name": "Imediato",
    "type": "undead",
    "subtype": "osteon",
    "size": "Médio",
    "challengeRating": 4,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p254 ate 272.pdf",
        "pdfPage": 8,
        "bookPage": 259
    },
    "stats": {
        "initiative": 10,
        "perception": 5,
        "defense": 23,
        "fortitude": 8,
        "reflex": 16,
        "will": 6,
        "hitPoints": 120,
        "speedText": "9m (6q)",
        "senses": "visão no escuro",
        "defensesText": "redução de corte, frio e perfuração 5",
        "attributes": {
            "str": 1,
            "dex": 4,
            "con": 0,
            "int": 0,
            "wis": 1,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Cimitarra +17 (2d6+8, 18, mais 2d6 ácido)."
        }
    ],
    "abilities": [
        {
            "name": "Correr pelo Cordame",
            "timing": "completa",
            "text": "O pirata percorre até seu deslocamento, ignorando terreno difícil, e faz um ataque corpo a corpo com +2 no teste de ataque e +1d6 na rolagem de dano."
        },
        {
            "name": "Pernas do Mar",
            "timing": null,
            "text": "Quando está se equilibrando ou escalando, o pirata não fica desprevenido e seu deslocamento não é reduzido à metade."
        },
        {
            "name": "Salmoura",
            "timing": null,
            "text": "Uma criatura que sofra dano de ácido de um ataque do imediato sofre –2 em testes de perícia por 1 rodada."
        }
    ],
    "equipment": "Cimitarra",
    "treasure": "Padrão.",
    "skillsText": "Acrobacia +10, Atletismo +7, Intimidação +5, Pilotagem +8"
};

export const alzeras = {
    "id": "alzeras",
    "name": "Alzeras",
    "type": "undead",
    "subtype": null,
    "size": "Médio",
    "challengeRating": 11,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p 286 ate 297.pdf",
        "pdfPage": 1,
        "bookPage": 284
    },
    "stats": {
        "initiative": 18,
        "perception": 16,
        "defense": 29,
        "fortitude": 11,
        "reflex": 18,
        "will": 24,
        "hitPoints": 385,
        "manaPoints": 130,
        "speedText": "voo 12m (8q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a atordoado e medo; incorpóreo; resistência a magia +5",
        "attributes": {
            "str": null,
            "dex": 4,
            "con": 2,
            "int": 6,
            "wis": 2,
            "cha": 3
        }
    },
    "actions": [],
    "abilities": [
        {
            "name": "Contramágica Aprimorada",
            "timing": "reação",
            "text": "Uma vez por rodada, o alzeras faz uma contramágica."
        },
        {
            "name": "Conjuração Odiosa",
            "timing": "livre",
            "cost": "2 PM",
            "text": "Quando lança uma magia, o alzeras pode impregná-la com ódio. Criaturas que falhem na resistência contra a magia sofrem 4d8+4 pontos de dano de corte, impacto ou perfuração (à escolha do alzeras)."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como um mago de 13º nível (CD 33)."
        },
        {
            "name": "Amarras Etéreas",
            "timing": "padrão",
            "cost": "6 PM",
            "text": "Três laços de energia surgem e se enroscam em uma criatura em alcance médio, deixando-a agarrada (Ref evita). A vítima pode tentar se livrar, gastando uma ação padrão para fazer um teste de Atletismo. Se passar, destrói um laço, mais um laço adicional para cada 5 pontos pelos quais superou a CD. Cada laço também pode ser atacado e destruído (Defesa 10, 10 PV, RD 5 e imunidade a dano mágico). Um laço destruído causa 1d8+1 pontos de dano de essência na criatura amarrada. Se todos os laços forem destruídos, a magia é dissipada. Os laços afetam criaturas incorpóreas."
        },
        {
            "name": "Armadura Arcana",
            "timing": "reação",
            "cost": "10 PM",
            "text": "Quando sofre um ataque, o alzeras recebe +9 na Defesa contra esse ataque."
        },
        {
            "name": "Dissipar Magia",
            "timing": "padrão",
            "cost": "3 PM",
            "text": "O alzeras escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias nesse alvo com CD igual ou menor que o resultado do teste são dissipadas."
        },
        {
            "name": "Imobilizar",
            "timing": "padrão",
            "cost": "6 PM",
            "text": "Até duas criaturas em alcance curto ficam paralisadas (Von muda para lenta). A cada rodada, a vítima pode gastar uma ação completa para fazer um novo teste de Vontade. Se passar, liberta-se do efeito."
        },
        {
            "name": "Leque Cromático",
            "timing": "padrão",
            "cost": "6 PM",
            "text": "Criaturas em um cone de 4,5m ficam atordoadas por 1 rodada (apenas uma vez por cena, Von anula) e ofuscadas."
        },
        {
            "name": "Marionete",
            "timing": "padrão",
            "cost": "10 PM, sustentada",
            "text": "O alzeras controla as ações físicas de uma criatura em alcance médio. Ao sofrer a magia, e no início de cada um de seus turnos, a vítima faz um teste de Fortitude. Se passar, a magia é anulada."
        },
        {
            "name": "Raio do Enfraquecimento",
            "timing": "padrão",
            "cost": "8 PM",
            "text": "Criaturas escolhidas em alcance curto do alzeras ficam exaustas (Fort muda para fatigado)."
        },
        {
            "name": "Selo de Mana",
            "timing": "padrão",
            "cost": "6 PM",
            "text": "Um selo mágico se manifesta em uma criatura adjacente até o fim da cena. Sempre que ela fizer qualquer ação que gaste PM, deve fazer um teste de Vontade. Se passar, a ação funciona. Se falhar, a ação não tem efeito, mas os PM são gastos mesmo assim."
        },
        {
            "name": "Sussurros Insanos",
            "timing": "padrão",
            "cost": "3 PM",
            "text": "Um humanoide em alcance curto fica confuso (Von anula)."
        },
        {
            "name": "Teia",
            "timing": "padrão",
            "cost": "2 PM",
            "text": "O alzeras cria um cubo de terreno difícil de 6m em alcance curto. Criaturas na área, ou que comecem seu turno em seu interior, ficam enredadas e imóveis (Ref evita). Uma criatura pode se libertar com uma ação padrão e um teste de Acrobacia ou Atletismo."
        }
    ],
    "equipment": null,
    "treasure": "Tomo do rancor.",
    "skillsText": "Furtividade +18, Intuição +11, Misticismo +25"
};

export const arquilichFerrenAsloth = {
    "id": "arquilich-ferren-asloth",
    "name": "Arquilich Ferren Asloth",
    "type": "undead",
    "subtype": null,
    "size": "Médio",
    "challengeRating": "S",
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p 286 ate 297.pdf",
        "pdfPage": 11,
        "bookPage": 294
    },
    "stats": {
        "initiative": 27,
        "perception": 22,
        "defense": 66,
        "fortitude": 31,
        "reflex": 27,
        "will": 39,
        "hitPoints": 2418,
        "manaPoints": 255,
        "speedText": "9m (6q), teleporte 30m (20q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a adivinhação, efeitos mentais, eletricidade, frio e metamorfose; redução de dano 20/mágico; resistência a magia +5; maior que a morte",
        "attributes": {
            "str": 1,
            "dex": 6,
            "con": 4,
            "int": 15,
            "wis": 4,
            "cha": 7
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Cajado da destruição +57 (2d6+16 mais 10d6+10 frio) ou toque gélido +55 (10d6+10 frio)."
        }
    ],
    "abilities": [
        {
            "name": "Arcano de Batalha",
            "timing": null,
            "text": "O Arquilich Ferren Asloth soma sua Inteligência nas rolagens de dano quando lança magias (já contabilizado)."
        },
        {
            "name": "Aura de Medo",
            "timing": null,
            "text": "Criaturas em um raio de 30m de Ferren ficam abaladas (Von CD 55 evita e a criatura não pode mais ser abalada por esta habilidade até o fim da cena)."
        },
        {
            "name": "Conhecimento Sequestrado",
            "timing": "reação",
            "cost": "3 PM",
            "text": "Uma vez por rodada, quando vê outra criatura lançando uma magia em alcance médio, Ferren pode tomar essa magia. A criatura deve fazer um teste de Vontade (CD 55); se falhar, não pode mais lançar essa magia até o fim da cena, e durante esse período ela se torna uma magia conhecida para Ferren."
        },
        {
            "name": "Contramágica Superior",
            "timing": "reação",
            "text": "Uma vez por rodada, quando vê uma magia ser conjurada, Ferren faz uma contramágica. Se usar Dissipar Magia para isso, ele rola dois dados e usa o melhor resultado."
        },
        {
            "name": "Dança da Morte",
            "timing": "livre",
            "text": "No início de seu turno, Ferren refaz os testes de resistência de cada condição que o esteja afetando. Se ele passar, o efeito se encerra."
        },
        {
            "name": "Despertar dos Mortos",
            "timing": "completa",
            "cost": "10 PM",
            "text": "Ferren conjura um morto-vivo à escolha dele, feito de energia negativa e de até ND 19. A criatura surge em um espaço desocupado em alcance curto, obedece aos comandos de Ferren e age na mesma iniciativa dele. O morto-vivo permanece até ser destruído, até o fim da cena ou até ser dispensado por Ferren (uma ação livre). O Arquilich só pode manter um morto-vivo conjurado por esta habilidade por vez."
        },
        {
            "name": "Drenar Vida",
            "timing": "livre",
            "cost": "1 PM",
            "text": "Quando lança uma magia que causa dano, Ferren muda o tipo desse dano para trevas. Para cada criatura que falhar no teste de resistência contra essa magia, Ferren recupera uma quantidade de PV igual à metade do dano causado."
        },
        {
            "name": "Fluxo de Mana",
            "timing": null,
            "text": "Ferren pode manter dois efeitos sustentados simultaneamente com apenas uma ação livre (mas pagando o custo de cada um)."
        },
        {
            "name": "Magia Acelerada",
            "timing": "livre",
            "cost": "+4 PM",
            "text": "Uma vez por rodada, quando lança uma magia com execução de ação completa ou menor, Ferren muda a execução dela para livre."
        },
        {
            "name": "Magia Discreta",
            "timing": "livre",
            "cost": "+2 PM",
            "text": "Quando lança uma magia, Ferren não precisa gesticular ou falar, e pode lançá-la com as mãos presas, amordaçado etc. Perceber que ele lançou uma magia exige passar em um teste de Misticismo (CD 30)."
        },
        {
            "name": "Presença Opressora",
            "timing": "reação",
            "text": "Quando uma criatura ataca Ferren, deve passar em um teste de Vontade (CD 55) ou não conseguirá machucá-lo, perderá a ação e sofrerá 12d6 pontos de dano psíquico. Se passar, a criatura não é mais afetada por esta habilidade até o fim da cena."
        },
        {
            "name": "Regente Sombrio",
            "timing": null,
            "text": "Ferren tem controle total sobre seus domínios. Uma vez por rodada, ele pode mudar o clima de qualquer região de Aslothia como se tivesse lançado Controlar o Clima. Além disso, pode manipular suas terras, impedindo que criaturas ou efeitos cruzem suas fronteiras, e é capaz de saber a localização exata de qualquer criatura que conheça e que esteja dentro de Aslothia."
        },
        {
            "name": "Rigor Mortis",
            "timing": null,
            "text": "Uma criatura que falhe na resistência contra uma magia de Ferren perde sua próxima ação de movimento."
        },
        {
            "name": "Sacrificar Servo",
            "timing": "reação",
            "text": "Uma vez por rodada, quando sofre dano, Ferren sacrifica uma de suas criaturas invocadas para reduzir esse dano a 0."
        },
        {
            "name": "Toque Paralisante",
            "timing": null,
            "text": "Os ataques corpo a corpo de Ferren causam 10d6+10 pontos de dano de frio extras (já contabilizados). Uma criatura que sofra esse dano de frio fica paralisada por 1d6 rodadas (Fort CD 55 evita)."
        },
        {
            "name": "Visão Tumular",
            "timing": null,
            "text": "Ferren está permanentemente sob efeito da magia Visão Mística com o aprimoramento que permite enxergar criaturas e objetos invisíveis."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como um mago de 20º nível (CD 57, limite de PM 35). Além das magias listadas, ele pode lançar qualquer magia de abjuração, convocação ou necromancia, arcana ou divina."
        },
        {
            "name": "Desespero Esmagador",
            "timing": "padrão",
            "cost": "8 PM",
            "text": "Criaturas num cone de 6m ficam debilitadas e esmorecidas pela cena (Von reduz para 1 rodada)."
        },
        {
            "name": "Dissipar Magia",
            "timing": "padrão",
            "cost": "3 PM",
            "text": "Ferren escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias nesse alvo com CD igual ou menor que o resultado do teste são dissipadas."
        },
        {
            "name": "Ferver Sangue",
            "timing": "padrão",
            "cost": "35 PM, sustentada",
            "text": "O sangue de criaturas escolhidas em alcance curto começa a ferver. Quando a magia é lançada, e no início de cada um de seus turnos, cada criatura sofre 14d8+29 pontos de dano de fogo e fica enjoada por 1 rodada (Fort reduz o dano à metade e evita a condição). Se uma criatura passar em dois testes de Fortitude seguidos, dissipa a magia sobre si. Se um alvo for reduzido a 0 PV pelo dano desta magia, seu corpo explode, matando-o e causando 6d6+21 pontos de dano de fogo em todas as criaturas a até 3m (Ref reduz à metade). Esta magia não afeta criaturas sem sangue, como construtos ou mortos-vivos."
        },
        {
            "name": "Legião",
            "timing": "padrão",
            "cost": "15 PM, sustentada",
            "text": "Até 10 alvos em alcance médio obedecem cegamente aos comandos de Ferren, exceto ordens claramente suicidas. Um alvo tem direito a um teste de Vontade no fim de cada um de seus turnos para se livrar do efeito. Alvos que passem no teste ficam abalados por 1 rodada enquanto recuperam a consciência."
        },
        {
            "name": "Marionete",
            "timing": "padrão",
            "cost": "10 PM, sustentada",
            "text": "Ferren controla as ações físicas de uma criatura em alcance médio. Ao sofrer a magia, e no início de cada um de seus turnos, a vítima faz um teste de Fortitude. Se passar, a magia é anulada."
        },
        {
            "name": "Rogar Maldição",
            "timing": "padrão",
            "cost": "10 PM",
            "text": "Uma criatura em alcance curto fica esmorecida e não pode se comunicar ou lançar magias permanentemente (Fort anula)."
        },
        {
            "name": "Tentáculos de Trevas",
            "timing": "padrão",
            "cost": "10 PM",
            "text": "Até o fim da cena, tentáculos surgem em uma esfera de 6m em alcance médio e tentam agarrar todas as criaturas na área. Ao lançar a magia e no início de cada um de seus turnos, Ferren faz um teste da manobra agarrar (usando Misticismo) contra cada criatura na área. Se ele passar, a criatura é agarrada; se a vítima já está agarrada, é esmagada, sofrendo 8d6+8 pontos de dano de trevas (cada tentáculo recebe +15 em sua primeira rolagem de dano). A área conta como terreno difícil e os tentáculos são imunes a dano."
        },
        {
            "name": "Toque da Morte",
            "timing": "padrão",
            "cost": "25 PM",
            "text": "Criaturas em alcance curto sofrem 10d8+35 pontos de dano de trevas. Um inimigo com menos da metade de seus PV em vez disso deve fazer um teste de Fortitude. Se passar, sofre o dano normal. Se falhar, seus PV são reduzidos a –10."
        },
        {
            "name": "Toque Vampírico",
            "timing": "padrão",
            "cost": "35 PM",
            "text": "Ferren faz um ataque corpo a corpo. Se acertar, além do dano normal, causa 36d6+51 pontos de dano de trevas e recupera metade desse dano de trevas em pontos de vida."
        },
        {
            "name": "Velocidade",
            "timing": "padrão",
            "cost": "10 PM, sustentada",
            "text": "Ferren pode executar uma ação padrão adicional por turno."
        },
        {
            "name": "Maior que a Morte",
            "timing": null,
            "text": "Criaturas de ND S e S+ possuem um status especial. Para estatísticas não listadas em suas fichas, são consideradas criaturas de ND 20; para habilidades de outras criaturas, seu ND é maior que 20, impedindo efeitos limitados pelo nível do alvo."
        }
    ],
    "equipment": "Amuleto do Abutre, cajado da destruição, robe do arquimago",
    "treasure": "Triplo.",
    "skillsText": "Conhecimento +36, Diplomacia +25, Enganação +25, Intimidação +25, Intuição +25, Investigação +31, Misticismo +36, Nobreza +31, Ofício (alquimia) +31, Religião +20"
};

export const cemiterioVivo = {
    "id": "cemiterio-vivo",
    "name": "Cemitério Vivo",
    "type": "undead",
    "subtype": null,
    "size": "Colossal",
    "challengeRating": 17,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p 286 ate 297.pdf",
        "pdfPage": 3,
        "bookPage": 286
    },
    "stats": {
        "initiative": 13,
        "perception": 14,
        "defense": 54,
        "fortitude": 35,
        "reflex": 12,
        "will": 24,
        "hitPoints": 1125,
        "speedText": "12m (8q)",
        "senses": "percepção às cegas (médio), visão no escuro",
        "defensesText": "imunidade a atordoado e medo; redução de dano 10; resistência a magia +5",
        "attributes": {
            "str": 13,
            "dex": -1,
            "con": 10,
            "int": null,
            "wis": 1,
            "cha": 2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Quatro pancadas +49 (4d10+40 mais 2d8 trevas)."
        }
    ],
    "abilities": [
        {
            "name": "Adquirir Cadáver",
            "timing": "movimento",
            "text": "O cemitério vivo agarra um humanoide inconsciente ou morto ao seu alcance."
        },
        {
            "name": "Aura de Profanação",
            "timing": null,
            "text": "O cemitério exala uma aura de poeira carregada de energia negativa. Qualquer criatura viva que entre em um raio de 9m do cemitério, ou inicie seu turno nesta área, sofre 5d8+20 pontos de dano de trevas e recebe imunidade a cura mágica por 1 rodada (Fort CD 44 reduz à metade e evita a imunidade a cura)."
        },
        {
            "name": "Finalmente Livres",
            "timing": null,
            "text": "Quando o cemitério é destruído, ele se desmancha em um amontoado de terra, tumbas e corpos. Todas as criaturas absorvidas há menos de uma semana retornam à vida, mas os espíritos dos corpos consumidos há mais tempo se levantam como mortos-vivos amargurados e furiosos, gerando 1d4+1 falanges (Tormenta20, p. 298). Essas falanges agem normalmente a partir da rodada seguinte, na iniciativa original do cemitério."
        },
        {
            "name": "Herança Profana",
            "timing": null,
            "text": "Quando o cemitério é destruído, uma esfera de 500m ao redor do espaço onde ele foi derrotado se torna corrompida por um ano. Enquanto a área estiver corrompida, criaturas vivas dentro dela não recuperam pontos de vida por efeitos mágicos e sofrem 2d8+2 pontos de dano de trevas por rodada. Uma magia Consagrar com o aprimoramento permanente remove essa corrupção."
        },
        {
            "name": "Tumba Viva",
            "timing": "movimento",
            "text": "Se começar seu turno agarrando um humanoide Grande ou menor, inconsciente ou morto, o cemitério abre um espaço em seu peito e coloca a criatura em seu interior, absorvendo-a. Ao fazer isso, ele ganha 20 PV temporários por nível da criatura. Uma criatura absorvida dessa forma só pode ser libertada com a destruição do cemitério."
        }
    ],
    "equipment": null,
    "treasure": "Dobro.",
    "skillsText": null
};

export const chacalZumbi = {
    "id": "chacal-zumbi",
    "name": "Chacal-Zumbi",
    "type": "undead",
    "subtype": null,
    "size": "Médio",
    "challengeRating": 2,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p 286 ate 297.pdf",
        "pdfPage": 4,
        "bookPage": 287
    },
    "stats": {
        "initiative": 6,
        "perception": 5,
        "defense": 19,
        "fortitude": 7,
        "reflex": 13,
        "will": 2,
        "hitPoints": 35,
        "speedText": "9m (6q)",
        "senses": "faro, visão no escuro",
        "defensesText": null,
        "attributes": {
            "str": 2,
            "dex": 3,
            "con": 3,
            "int": null,
            "wis": 0,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +14 (1d6+8, 19, mais doença)."
        }
    ],
    "abilities": [
        {
            "name": "Doença",
            "timing": null,
            "text": "Uma criatura mordida por um chacal é exposta à doença febre necrótica (Fort CD 16 evita)."
        },
        {
            "name": "Matilha Zumbi",
            "timing": null,
            "text": "O chacal-zumbi recebe +1 em testes de perícia para cada outro morto-vivo aliado em alcance curto."
        },
        {
            "name": "Fraqueza Zumbi",
            "timing": null,
            "text": "O chacal-zumbi sofre o dobro de dano de acertos críticos ou de ataques feitos contra seu cérebro (Defesa 29)."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": "Furtividade +6, Sobrevivência +8"
};

export const lich = {
    "id": "lich",
    "name": "Lich",
    "type": "undead",
    "subtype": null,
    "size": "Médio",
    "challengeRating": 15,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p 286 ate 297.pdf",
        "pdfPage": 8,
        "bookPage": 291
    },
    "stats": {
        "initiative": 14,
        "perception": 18,
        "defense": 48,
        "fortitude": 27,
        "reflex": 20,
        "will": 33,
        "hitPoints": 560,
        "manaPoints": 170,
        "speedText": "6m (4q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a eletricidade, frio e metamorfose; redução de dano 20/mágico; resistência a magia +5",
        "attributes": {
            "str": -2,
            "dex": 1,
            "con": 3,
            "int": 9,
            "wis": 3,
            "cha": 2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Toque gélido +41 (6d6+6 frio)."
        }
    ],
    "abilities": [
        {
            "name": "Arcano de Batalha",
            "timing": null,
            "text": "O lich soma sua Inteligência nas rolagens de dano quando lança magias (já contabilizado)."
        },
        {
            "name": "Aura de Medo",
            "timing": null,
            "text": "Criaturas em um raio de 30m do lich ficam abaladas (Von CD 42 evita e a criatura não pode mais ser abalada por esta habilidade até o fim da cena)."
        },
        {
            "name": "Drenar Vida",
            "timing": "livre",
            "cost": "1 PM",
            "text": "Quando lança uma magia que causa dano, o lich muda o tipo desse dano para trevas. Para cada criatura que falhar no teste de resistência contra essa magia, o lich recupera uma quantidade de PV igual à metade do dano causado."
        },
        {
            "name": "Fluxo de Mana",
            "timing": null,
            "text": "O lich pode manter dois efeitos sustentados simultaneamente com apenas uma ação livre (mas pagando o custo de cada um)."
        },
        {
            "name": "Magia Acelerada",
            "timing": "livre",
            "cost": "+4 PM",
            "text": "Uma vez por rodada, quando lança uma magia com execução de ação completa ou menor, o lich muda a execução dela para livre."
        },
        {
            "name": "Sacrificar Servo",
            "timing": "reação",
            "text": "Uma vez por rodada, quando sofre dano, o lich sacrifica uma de suas criaturas invocadas para reduzir esse dano a 0."
        },
        {
            "name": "Toque Paralisante",
            "timing": null,
            "text": "Uma criatura que sofra dano do toque gélido do lich fica paralisada por 1d6 rodadas (Fort CD 42 evita)."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como um mago de 17º nível (CD 42, limite de PM 26)."
        },
        {
            "name": "Conjurar Monstro",
            "timing": "completa",
            "cost": "23 PM, sustentada",
            "text": "O lich conjura um zumbi Enorme em um espaço desocupado em alcance curto. Ele é um morto-vivo com Defesa 48, imunidade a corte, fogo e efeitos que pedem testes de Fortitude ou Vontade, tem For 11, Des 1, 110 PV, deslocamento 15m e pode fazer uma ação de movimento por rodada. O lich pode gastar uma ação padrão para que ele se desloque o dobro nessa rodada ou cause 4d8+15 pontos de dano de impacto em uma criatura adjacente, ou pode gastar uma ação padrão e 1 PM para que ele cause 8d8+30 pontos de dano de trevas num cone de 6m."
        },
        {
            "name": "Conjurar Mortos-Vivos",
            "timing": "completa",
            "cost": "10 PM, sustentada",
            "text": "O lich conjura seis sombras Médias em espaços desocupados em alcance curto. Ele pode gastar uma ação de movimento para fazer elas andarem (deslocamento 9m) ou uma ação padrão para fazer cada uma causar 2d10 pontos de dano de trevas a uma criatura adjacente (criaturas vivas atingidas perdem 1d4 PM; Fort evita). As sombras são mortos-vivos incorpóreos com Des 4, Defesa 35 e todos os outros atributos nulos; elas têm 1 PV e falham automaticamente em qualquer teste de resistência ou oposto, mas têm imunidade a atordoado, dano não letal, encantamento, frio e paralisia. Elas perdem a habilidade incorpóreo quando expostas à luz do sol, desaparecem quando são reduzidas a 0 PV ou no fim da cena e não agem sem receber uma ordem."
        },
        {
            "name": "Profanar",
            "timing": "padrão",
            "cost": "1 PM",
            "text": "Uma esfera de 9m em alcance longo se enche com energia negativa por 1 dia. Dentro dela, todo dano de trevas é maximizado."
        },
        {
            "name": "Raio Polar",
            "timing": "padrão",
            "cost": "16 PM",
            "text": "Uma criatura em alcance médio sofre 14d8+9 pontos de dano de frio e fica paralisada em um bloco de gelo (Fort reduz o dano à metade e muda a condição para lento). É possível quebrar o gelo, que tem 20 PV, RD 10 e vulnerabilidade a fogo, para libertar a criatura presa."
        },
        {
            "name": "Relâmpago",
            "timing": "padrão",
            "cost": "14 PM",
            "text": "O lich causa 14d8+9 pontos de dano de eletricidade em criaturas a sua escolha em alcance médio (Ref reduz à metade)."
        },
        {
            "name": "Toque da Morte",
            "timing": "padrão",
            "cost": "25 PM",
            "text": "Criaturas em alcance curto sofrem 10d8+19 pontos de dano de trevas. Um inimigo com menos da metade de seus PV em vez disso deve fazer um teste de Fortitude. Se passar, sofre o dano normal. Se falhar, seus PV são reduzidos a –10."
        },
        {
            "name": "Toque Vampírico",
            "timing": "padrão",
            "cost": "19 PM",
            "text": "O lich faz um ataque de toque gélido. Se acertar, além do dano normal, causa 20d6+9 pontos de dano de trevas e recupera metade desse dano de trevas em pontos de vida."
        },
        {
            "name": "Filactério",
            "timing": null,
            "text": "Um lich morto retorna completamente recuperado em 1d10 dias. A única forma de derrotá-lo permanentemente é destruir seu filactério. Um filactério típico é um item mágico maior com Defesa 20, RD 40, 50 PV e uma aura mágica poderosa. O lich sempre sabe onde está seu filactério e quem está de posse dele. Um filactério destruído pode ser transformado em um fragmento de filactério."
        }
    ],
    "equipment": "Essência de mana x5, robe do arquimago, terra de cemitério x2",
    "treasure": "Dobro e fragmento de filactério.",
    "skillsText": "Conhecimento +24, Cura +16, Furtividade +14, Intimidação +15, Misticismo +27, Ofício (alquimista) +27, Religião +16"
};

export const lichDeAslothia = {
    "id": "lich-de-aslothia",
    "name": "Lich de Aslothia",
    "type": "undead",
    "subtype": null,
    "size": "Médio",
    "challengeRating": 18,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p 286 ate 297.pdf",
        "pdfPage": 9,
        "bookPage": 292
    },
    "stats": {
        "initiative": 21,
        "perception": 17,
        "defense": 52,
        "fortitude": 29,
        "reflex": 22,
        "will": 35,
        "hitPoints": 800,
        "manaPoints": 180,
        "speedText": "9m (6q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a eletricidade, frio e metamorfose; redução de dano 20/mágico; resistência a magia +5",
        "attributes": {
            "str": -1,
            "dex": 4,
            "con": 2,
            "int": 12,
            "wis": 2,
            "cha": 7
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Toque gélido +47 (9d6+9 frio)."
        }
    ],
    "abilities": [
        {
            "name": "Arcano de Batalha",
            "timing": null,
            "text": "O lich de Aslothia soma sua Inteligência nas rolagens de dano quando lança magias (já contabilizado)."
        },
        {
            "name": "Aura de Medo",
            "timing": null,
            "text": "Criaturas em um raio de 30m do lich ficam abaladas (Von CD 46 evita e a criatura não pode mais ser abalada por esta habilidade até o fim da cena)."
        },
        {
            "name": "Contramágica Superior",
            "timing": "reação",
            "text": "Uma vez por rodada, quando vê uma magia ser conjurada, o lich faz uma contramágica. Se usar Dissipar Magia para isso, ele rola dois dados e usa o melhor resultado."
        },
        {
            "name": "Drenar Vida",
            "timing": "livre",
            "cost": "1 PM",
            "text": "Quando lança uma magia que causa dano, o lich muda o tipo desse dano para trevas. Para cada criatura que falhar no teste de resistência contra essa magia, o lich recupera uma quantidade de PV igual à metade do dano causado."
        },
        {
            "name": "Fluxo de Mana",
            "timing": null,
            "text": "O lich pode manter dois efeitos sustentados simultaneamente com apenas uma ação livre (mas pagando o custo de cada um)."
        },
        {
            "name": "Magia Acelerada",
            "timing": "livre",
            "cost": "+4 PM",
            "text": "Uma vez por rodada, quando lança uma magia com execução de ação completa ou menor, o lich muda a execução dela para livre."
        },
        {
            "name": "Magia Discreta",
            "timing": "livre",
            "cost": "+2 PM",
            "text": "Quando lança uma magia, o lich não precisa gesticular ou falar, e pode lançar a magia com as mãos presas, amordaçado etc. Perceber que ele lançou uma magia exige passar em um teste de Misticismo (CD 20)."
        },
        {
            "name": "Presença Majestosa",
            "timing": "reação",
            "text": "Quando uma criatura ataca o lich, deve passar em um teste de Vontade (CD 46) ou não conseguirá machucá-lo e perderá a ação. Uma criatura que passe no teste de Vontade não é mais afetada por esta habilidade até o fim da cena."
        },
        {
            "name": "Rigor Mortis",
            "timing": null,
            "text": "Uma criatura que falhe na resistência contra uma das magias do lich perde sua próxima ação de movimento."
        },
        {
            "name": "Sacrificar Servo",
            "timing": "reação",
            "text": "Uma vez por rodada, quando sofre dano, o lich sacrifica uma de suas criaturas invocadas para reduzir esse dano a 0."
        },
        {
            "name": "Toque Paralisante",
            "timing": null,
            "text": "Uma criatura que sofra dano do toque gélido do lich fica paralisada por 1d6 rodadas (Fort CD 46 evita)."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como um mago de 18º nível (CD 46, limite de PM 30)."
        },
        {
            "name": "Conjurar Mortos-Vivos",
            "timing": "completa",
            "cost": "20 PM, sustentada",
            "text": "O lich conjura onze sombras Médias em espaços desocupados em alcance curto. Ele pode gastar uma ação de movimento para fazer elas andarem (deslocamento 9m) ou uma ação padrão para fazer cada uma causar 2d10 pontos de dano de trevas a uma criatura adjacente (criaturas vivas atingidas perdem 1d4 PM; Fort evita). As sombras são mortos-vivos incorpóreos com Des 4, Defesa 35 e todos os outros atributos nulos; elas têm 1 PV e falham automaticamente em qualquer teste de resistência ou oposto, mas têm imunidade a atordoado, dano não letal, encantamento, frio e paralisia. Elas perdem a habilidade incorpóreo quando expostas à luz do sol, desaparecem quando são reduzidas a 0 PV ou no fim da cena e não agem sem receber uma ordem."
        },
        {
            "name": "Desespero Esmagador",
            "timing": "padrão",
            "cost": "8 PM",
            "text": "Criaturas num cone de 6m ficam debilitadas e esmorecidas (Von reduz para 1 rodada)."
        },
        {
            "name": "Dissipar Magia",
            "timing": "padrão",
            "cost": "3 PM",
            "text": "O lich escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias nesse alvo com CD igual ou menor que o resultado do teste são dissipadas."
        },
        {
            "name": "Legião",
            "timing": "padrão",
            "cost": "15 PM, sustentada",
            "text": "Até 10 criaturas em alcance médio obedecem cegamente aos comandos do lich, exceto ordens claramente suicidas. Uma criatura tem direito a um teste de Vontade no fim de cada um de seus turnos para se livrar do efeito. Criaturas que passem no teste ficam abaladas por 1 rodada enquanto recuperam a consciência."
        },
        {
            "name": "Marionete",
            "timing": "padrão",
            "cost": "10 PM, sustentada",
            "text": "O lich controla as ações físicas de uma criatura em alcance médio. Ao sofrer a magia, e no início de cada um de seus turnos, a vítima faz um teste de Fortitude. Se passar, a magia é anulada."
        },
        {
            "name": "Rogar Maldição",
            "timing": "padrão",
            "cost": "10 PM",
            "text": "Uma criatura em alcance curto fica esmorecida e não pode se comunicar ou lançar magias permanentemente (Fort anula)."
        },
        {
            "name": "Toque da Morte",
            "timing": "padrão",
            "cost": "25 PM",
            "text": "Criaturas em alcance curto sofrem 10d8+22 pontos de dano de trevas. Um inimigo com menos da metade de seus PV em vez disso deve fazer um teste de Fortitude. Se passar, sofre o dano normal. Se falhar, seus PV são reduzidos a –10."
        },
        {
            "name": "Toque Vampírico",
            "timing": "padrão",
            "cost": "29 PM",
            "text": "O lich faz um ataque de toque gélido. Se acertar, além do dano normal, causa 30d6+12 pontos de dano de trevas e recupera metade desse dano de trevas em pontos de vida."
        },
        {
            "name": "Velocidade",
            "timing": "padrão",
            "cost": "10 PM, sustentada",
            "text": "O lich pode executar uma ação padrão adicional por turno."
        },
        {
            "name": "Filactério",
            "timing": null,
            "text": "Um lich morto retorna completamente recuperado em 1d10 dias. A única forma de derrotá-lo permanentemente é destruir seu filactério. Um filactério típico é um item mágico maior com Defesa 20, RD 40, 50 PV e uma aura mágica poderosa. O lich sempre sabe onde está seu filactério e quem está de posse dele. Um filactério destruído pode ser transformado em um fragmento de filactério."
        }
    ],
    "equipment": "Coroa majestosa, essência de mana x5, robe do arquimago",
    "treasure": "Dobro e fragmento de filactério.",
    "skillsText": "Conhecimento +29, Cura +17, Diplomacia +22, Intimidação +22, Intuição +17, Misticismo +32, Nobreza +29, Ofício (alquimista) +29"
};

export const morgueRaz = {
    "id": "morgue-raz",
    "name": "Morgue’raz",
    "type": "undead",
    "subtype": null,
    "size": "Grande",
    "challengeRating": 9,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p 286 ate 297.pdf",
        "pdfPage": 6,
        "bookPage": 289
    },
    "stats": {
        "initiative": 11,
        "perception": 8,
        "defense": 34,
        "fortitude": 21,
        "reflex": 15,
        "will": 9,
        "hitPoints": 378,
        "speedText": "9m (6q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a medo",
        "attributes": {
            "str": 8,
            "dex": 3,
            "con": 4,
            "int": -1,
            "wis": 0,
            "cha": 0
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Duas garras +27 (1d8+18, 19) e tripas-tentáculos +27 (1d6+18 perfuração, 19)."
        }
    ],
    "abilities": [
        {
            "name": "Agarrar Aprimorado",
            "timing": "livre",
            "text": "Tripas-tentáculos (teste +29)."
        },
        {
            "name": "Aura de Fedor",
            "timing": null,
            "text": "Qualquer criatura que entre em um raio de 9m do morgue’raz, ou inicie seu turno nesta área, fica enjoada por 1d4 rodadas (Fort CD 26 evita)."
        },
        {
            "name": "Criar Lacaios",
            "timing": null,
            "text": "Criaturas mortas por um morgue’raz se erguem uma semana depois da morte como carniçais (veja p. 228). Os carniçais obedecem instintivamente ao morgue’raz, a menos que ele já tenha sido destruído ou esteja a mais de 10 quilômetros."
        },
        {
            "name": "Devorar por Dentro",
            "timing": "padrão",
            "text": "Se o morgue’raz iniciar seu turno agarrando uma criatura, tripas-vermes se alojam na vítima, causando o dano da tripa-tentáculo. Além disso, a vítima fica fraca até o fim do dia (Fort CD 26 evita). Sempre que deixar um alvo fraco dessa forma, o morgue’raz recupera uma quantidade de PV igual à metade do dano causado por esta habilidade."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": "Furtividade +11"
};

export const wisphago = {
    "id": "wisphago",
    "name": "Wisphago",
    "type": "undead",
    "subtype": null,
    "size": "Grande",
    "challengeRating": 8,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p 286 ate 297.pdf",
        "pdfPage": 7,
        "bookPage": 290
    },
    "stats": {
        "initiative": 12,
        "perception": 11,
        "defense": 33,
        "fortitude": 21,
        "reflex": 8,
        "will": 15,
        "hitPoints": 344,
        "speedText": "15m (10q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a confusão; resistência a magia +5",
        "attributes": {
            "str": 6,
            "dex": 4,
            "con": 5,
            "int": -2,
            "wis": 3,
            "cha": 1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Duas mordidas +26 (1d8+12, 19)."
        }
    ],
    "abilities": [
        {
            "name": "Devorar Magia",
            "timing": null,
            "text": "Quando o wisphago passa em um teste de resistência contra uma magia arcana por 5 ou mais, devora essa magia; ela é anulada e ele recebe uma quantidade de PV temporários cumulativos igual ao total de PM gastos na magia."
        },
        {
            "name": "Faro para Magos",
            "timing": null,
            "text": "O wisphago recebe um bônus de +10 em testes de Sobrevivência para rastrear criaturas que tenham lançado uma magia arcana na última semana."
        },
        {
            "name": "Fome de Mana",
            "timing": null,
            "text": "Uma criatura atingida pela mordida do wisphago perde 1d4 PM."
        },
        {
            "name": "Vomitar Magia",
            "timing": "padrão",
            "text": "O wisphago lança uma magia que tenha devorado durante o último mês com Devorar Magia (CD 24). Ele não precisa pagar nenhum custo da magia e pode aplicar seus aprimoramentos (limitado a 10 PM de custo total da magia). Ele só pode lançar cada magia devorada uma vez. O wisphago começa o encontro com 1d6 magias arcanas de 1º círculo e 1d4 magias arcanas de 2º círculo."
        }
    ],
    "equipment": null,
    "treasure": "1d6+2 dentes de wisphago (CD 23 para extrair).",
    "skillsText": "Atletismo +14, Sobrevivência +16"
};

export const undeadCreatures = [
    // Manuais, Livro Básico e Ameaças de Arton
    zombie, skeleton, turbaZumbi, esqueletodeElite,
    falange, aparicao, vampiro, estouroDeFuriasDeTauron,
    furiaDeTauron, guerreiroPerpetuo, almaAcorrentada, infecto,
    turbaDeInfectos, soterradoVagante, carnical, lacedon,
    ogroEsqueleto, ursoPardoEsqueleto, gigantEsqueleto, fantasma,
    garraZumbi, garraZumbiOgro, garraZumbiEnxame, garraZumbiGigante,
    cavaloEsqueleto, fantasmaAncestral, hidraEsqueleto, livido,
    mamuteEsqueleto, mortalha, mumia, necrodracoEsqueleto,
    necrodracoLich, necrodracoZumbi, reiTiranoEsqueleto, senhorDasMumias,
    tarsoDragaoReiDosMortos, afogado, capitaoAfogado, capitaoPirata,
    imediato, alzeras, arquilichFerrenAsloth, cemiterioVivo, chacalZumbi,
    lich, lichDeAslothia, morgueRaz, wisphago
];
