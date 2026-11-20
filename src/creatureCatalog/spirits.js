import { divineAspects } from "./divineAspects.js";

export const hellHound = {
    id: "cao-do-inferno",
    name: "Cão do Inferno",
    type: "spirit",
    subtype: null,
    size: "Grande",
    challengeRating: 3,
    description: [
        "Estas feras agressivas são enormes, fortes e musculosas, com pelagem castanho-avermelhada como ferrugem, presas, garras e língua negras como carvão, e olhos de um vermelho ameaçador. Cães do inferno são oriundos de planos divinos e trazidos com frequência para Arton por conjuradores malignos."
    ],
    source: {
        "book": "Livro Básico",
        "pdfPage": 7,
        "bookPage": null
    },
    stats: {
        "initiative": 6,
        "perception": 4,
        "defense": 21,
        "fortitude": 11,
        "reflex": 9,
        "will": 7,
        "hitPoints": 95,
        "speedText": "12m (8q)",
        "senses": "faro, visão no escuro",
        "defensesText": "imunidade a fogo, redução de dano 10/mágico, vulnerabilidade a frio",
        "attributes": {
            "str": 6,
            "dex": 3,
            "con": 4,
            "int": -2,
            "wis": 1,
            "cha": -2
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +14 (2d6+6 mais 2d6 de fogo)."
        }
    ],
    abilities: [
        {
            "name": "Sopro",
            "timing": "padrão",
            "text": "O cão do inferno cospe fogo em um cone de 6m. Criaturas na área sofrem 4d6+4 pontos de dano de fogo (Ref CD 17 reduz à metade). Recarga (movimento)."
        }
    ],
    equipment: null,
    treasure: "1d4 doses de essência abissal (CD 18 para extrair).",
    skillsText: "Atletismo +9"
};

export const aquinne = {
    "id": "aquinne",
    "name": "Aquin’ne",
    "type": "spirit",
    "subtype": "elemental",
    "size": "Pequeno",
    "challengeRating": 2,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 91,
        "bookPage": 89
    },
    "stats": {
        "initiative": 4,
        "perception": 4,
        "defense": 18,
        "fortitude": 10,
        "reflex": 7,
        "will": 3,
        "hitPoints": 21,
        "speedText": "9m (6q), natação 15m (10q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a acertos críticos, atordoado, cansaço, efeitos de metabolismo, frio e paralisia; vulnerabilidade a fogo",
        "attributes": {
            "str": 4,
            "dex": 2,
            "con": 2,
            "int": -2,
            "wis": 2,
            "cha": -2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Tentáculo hídrico x2 +13 (2d4+6 corte)."
        }
    ],
    "abilities": [
        {
            "name": "Afogar",
            "timing": null,
            "text": "Uma criatura agarrada pelo aquin’ne é considerada submersa até se soltar."
        },
        {
            "name": "Agarrar Aprimorado",
            "timing": "livre",
            "text": "Tentáculo hídrico (teste +13)."
        },
        {
            "name": "Redemoinho de Maresia",
            "timing": "padrão",
            "text": "O aquin’ne toca um objeto adjacente, que perde 5 PV (Ref CD 16 evita)."
        }
    ],
    "equipment": null,
    "treasure": "1 dose de éter elemental (frio) (CD 17 para extrair).",
    "skillsText": "Atletismo +6 (+14 para nadar), Furtividade +4 (+14 na água)"
};

export const terrier = {
    "id": "terrier",
    "name": "Terrier",
    "type": "spirit",
    "subtype": "elemental",
    "size": "Pequeno",
    "challengeRating": 1,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 99,
        "bookPage": 97
    },
    "stats": {
        "initiative": 0,
        "perception": 3,
        "defense": 16,
        "fortitude": 11,
        "reflex": 0,
        "will": 5,
        "hitPoints": 35,
        "speedText": "6m (4q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a acertos críticos, ácido, atordoado, cansaço, efeitos de metabolismo e paralisia; redução de dano 5/impacto; vulnerabilidade a eletricidade",
        "attributes": {
            "str": 3,
            "dex": 0,
            "con": 3,
            "int": -3,
            "wis": 1,
            "cha": 1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Pancada +9 (2d6+8)."
        }
    ],
    "abilities": [
        {
            "name": "Pedra-Punho",
            "timing": "padrão",
            "text": "O terrier dispara pedras do tamanho de um punho humano em criaturas a sua escolha em alcance curto. Cada criatura sofre 1d6+4 pontos de dano de impacto e fica atordoada por 1 rodada (Fort CD 16 reduz à metade e evita a condição). Uma criatura que passe no teste de resistência não pode mais ser atordoada por esta habilidade até o fim da cena. Recarga (movimento)."
        },
        {
            "name": "Pedregoso",
            "timing": null,
            "text": "Um terrier pode permanecer completamente imóvel. Se ele estiver assim, um personagem deve passar num teste de Percepção (CD 30) para perceber que ele é uma criatura e não um monte de pedras."
        }
    ],
    "equipment": null,
    "treasure": "1 dose de éter elemental (ácido) (CD 16 para extrair).",
    "skillsText": null
};

export const pamgra = {
    "id": "pamgra",
    "name": "Pamgra",
    "type": "spirit",
    "subtype": "elemental",
    "size": "Médio",
    "challengeRating": 7,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 100,
        "bookPage": 98
    },
    "stats": {
        "initiative": 7,
        "perception": 6,
        "defense": 31,
        "fortitude": 20,
        "reflex": 14,
        "will": 7,
        "hitPoints": 280,
        "speedText": "9m (6q), escalar 6m (4q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a acertos críticos, ácido, atordoado, cansaço, efeitos de metabolismo e paralisia; redução de dano 10/impacto; vulnerabilidade a eletricidade",
        "attributes": {
            "str": 8,
            "dex": 0,
            "con": 4,
            "int": -3,
            "wis": -1,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Duas pancadas +24 (2d10+15, 19)."
        }
    ],
    "abilities": [
        {
            "name": "Cristalário",
            "timing": null,
            "text": "Os cristais afiados do corpo do pamgra ferem profundamente suas vítimas. Criaturas atingidas por ataques do pamgra ficam sangrando (Fort CD 26 evita)."
        },
        {
            "name": "Golpe Avassalador",
            "timing": "livre",
            "text": "Quando acerta um ataque de pancada, o pamgra arremessa a vítima 1d6 x 1,5m em uma direção à escolha dele (Fort CD 24 evita). A vítima fica caída e, se atingir algum obstáculo, sofre 1d6 pontos de dano de impacto para cada 1,5m que foi arremessada."
        }
    ],
    "equipment": null,
    "treasure": "1d4 doses de éter elemental (ácido) (CD 22 para extrair).",
    "skillsText": null
};

export const guerreiroDeCHifres = {
    id: "guerreiro-de-chifres",
    name: "Guerreiro de Chifres",
    type: "spirit",
    subtype: "demônio",
    size: "Médio",
    challengeRating: 3,
    description: [
        "Numerosas entidades malignas invadem Arton para corromper, torturar ou destruir os mortais. De corpo humanoide e cabeça de bode, guerreiros de chifres estão entre os demônios mais fracos, mas ainda assim são inimigos perigosos. Podem ser encontrados vagando em masmorras, sozinhos ou em pequenos bandos — às vezes sob comando de um arcanista, responsável por sua convocação a este mundo."
    ],
    source: {
        "book": "Livro Básico",
        "pdfPage": 2,
        "bookPage": null
    },
    stats: {
        "initiative": 6,
        "perception": 3,
        "defense": 21,
        "fortitude": 13,
        "reflex": 11,
        "will": 9,
        "hitPoints": 100,
        "speedText": "9m (6q)",
        "senses": "faro, visão no escuro",
        "defensesText": "imunidade a ácido e venenos, redução de dano 5, redução de fogo e frio 10",
        "attributes": {
            "str": 5,
            "dex": 3,
            "con": 4,
            "int": -2,
            "wis": 1,
            "cha": -1
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Machado de guerra +14 (1d12+16, x3) ou chifres +14 (2d6+10 impacto)."
        }
    ],
    abilities: [
        {
            "name": "Marrada",
            "timing": "completa",
            "text": "O guerreiro de chifres faz uma investida e ataca com seu machado de guerra e seus chifres. Os dois ataques recebem o bônus de +2 da investida, mas devem ser feitos contra o mesmo alvo."
        }
    ],
    equipment: "Machado de guerra cruel",
    treasure: "Padrão.",
    skillsText: "Atletismo +8, Intimidação +4"
};

export const corgann = {
    "id": "corgann",
    "name": "Corgann",
    "type": "spirit",
    "subtype": "elemental",
    "size": "Médio",
    "challengeRating": 8,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 91,
        "bookPage": 89,
        "pdfPageEnd": 92,
        "bookPageEnd": 90
    },
    "stats": {
        "initiative": 14,
        "perception": 10,
        "defense": 30,
        "fortitude": 15,
        "reflex": 20,
        "will": 9,
        "hitPoints": 61,
        "speedText": "9m (6q), natação 15m (10q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a acertos críticos, atordoado, cansaço, efeitos de metabolismo, frio e paralisia; vulnerabilidade a fogo",
        "attributes": {
            "str": 2,
            "dex": 6,
            "con": 3,
            "int": -2,
            "wis": 2,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "À Distância",
            "text": "Jato d’água x2 +27 (2d8+29 perfuração, 19/x3, alcance médio)."
        }
    ],
    "abilities": [
        {
            "name": "Jato Pressurizado",
            "timing": "padrão",
            "text": "O corgann dispara água pressurizada numa linha de 30m. Ele faz um teste de ataque de jato d’água e compara o resultado com a Defesa de cada criatura nessa área. Então faz uma rolagem de dano com um bônus cumulativo de +2d8 para cada acerto e aplica-a em cada criatura atingida. Recarga (movimento)."
        },
        {
            "name": "Navegar em Terra Firme",
            "timing": "completa",
            "text": "O corgann inunda uma esfera de 6m em alcance curto. Ela se torna um corpo de água que conta como terreno difícil para criaturas sem deslocamento de natação. Dentro dessa área o corgann pode fazer testes de Furtividade para se esconder sem precisar de cobertura."
        },
        {
            "name": "Salto Aquático",
            "timing": "movimento",
            "text": "O corgann salta para um ponto em um corpo d’água em alcance médio."
        }
    ],
    "equipment": null,
    "treasure": "1d4 doses de éter elemental (frio) (CD 23 para extrair).",
    "skillsText": "Furtividade +14 (+24 na água)",
    "role": "minion",
    "roleSource": "pdf-review"
};

export const namasqall = {
    "id": "namasqall",
    "name": "Namasqall",
    "type": "spirit",
    "subtype": "elemental",
    "size": "Colossal",
    "challengeRating": 14,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 93,
        "bookPage": 91
    },
    "stats": {
        "initiative": 18,
        "perception": 13,
        "defense": 42,
        "fortitude": 28,
        "reflex": 22,
        "will": 13,
        "hitPoints": 700,
        "speedText": "12m (8q), natação 18m (12q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a acertos críticos, atordoado, cansaço, efeitos de metabolismo, frio e paralisia; vulnerabilidade a fogo",
        "attributes": {
            "str": 10,
            "dex": 4,
            "con": 10,
            "int": -3,
            "wis": -1,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Quatro tentáculos d’água +39 (2d10+30 impacto)."
        }
    ],
    "abilities": [
        {
            "name": "Agarrar Aprimorado",
            "timing": "livre",
            "text": "Tentáculo d’água (teste +49), apenas criaturas Grandes ou menores."
        },
        {
            "name": "Constrição",
            "timing": "livre",
            "text": "No início de cada um de seus turnos, o namasqall causa 4d10+30 pontos de dano de impacto em cada criatura que esteja agarrando."
        },
        {
            "name": "Corpo Torrencial",
            "timing": null,
            "text": "O clima em uma esfera de 90m ao redor do namasqall é de tempestade constante (sem chance de queda de raios) e, em uma esfera de 500m, é de chuva. Estes climas não podem ser alterados."
        },
        {
            "name": "Maremoto",
            "timing": "padrão",
            "text": "O namasqall cria uma onda que varre um cone de 12m. Criaturas na área sofrem 12d6+40 de dano, metade frio e metade impacto, e são empurradas 6m (Ref CD 36 reduz à metade e evita o empurrão)."
        },
        {
            "name": "Olho da Tempestade",
            "timing": null,
            "text": "Se estiver na área de um efeito mágico que altera o clima, o namasqall fica atordoado por 1 rodada (Fort CD do efeito, se houver, evita). Ele só pode ser atordoado dessa forma uma vez por cena."
        }
    ],
    "equipment": null,
    "treasure": "1d4+2 doses de éter elemental (frio) (CD 29 para extrair).",
    "skillsText": null,
    "role": "solo",
    "roleSource": "pdf-review"
};

export const tPeel = {
    "id": "t-peel",
    "name": "T’Peel",
    "type": "spirit",
    "subtype": "elemental",
    "size": "Minúsculo",
    "challengeRating": 1,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 94,
        "bookPage": 92
    },
    "stats": {
        "initiative": 5,
        "perception": 1,
        "defense": 10,
        "fortitude": 5,
        "reflex": 10,
        "will": 1,
        "hitPoints": 12,
        "speedText": "voo 9m (6q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a acertos críticos, atordoado, caído, cansaço, efeitos de metabolismo, eletricidade e paralisia; vulnerabilidade a ácido",
        "attributes": {
            "str": 0,
            "dex": 4,
            "con": 2,
            "int": -2,
            "wis": 0,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Brisa agressiva +11 (2d4+9 corte)."
        },
        {
            "name": "À Distância",
            "text": "Lufada cortante +11 (2d4+9 corte, alcance curto)."
        }
    ],
    "abilities": [
        {
            "name": "Corpo Eólico",
            "timing": null,
            "text": "O t’peel pode atravessar qualquer fresta por onde o ar passaria, e só pode ser afetado por armas e efeitos mágicos."
        },
        {
            "name": "…E o Vento Levou",
            "timing": "livre",
            "text": "Quando acerta um ataque de brisa agressiva, o t’peel usa a manobra desarmar (teste +11). Se desarmar a vítima, ele prende a arma em seu redemoinho. Recuperar a arma exige vencer um teste de desarmar contra o t’peel."
        }
    ],
    "equipment": null,
    "treasure": "Metade (role novamente qualquer item que ocupe mais de 2 espaços) e 1 dose de éter elemental (eletricidade) (CD 16 para extrair).",
    "skillsText": "Ladinagem +7",
    "role": "minion",
    "roleSource": "pdf-review"
};

export const rarvnaak = {
    "id": "rarvnaak",
    "name": "Rarvnaak",
    "type": "spirit",
    "subtype": "elemental",
    "size": "Médio",
    "challengeRating": 7,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 94,
        "bookPage": 92,
        "pdfPageEnd": 95,
        "bookPageEnd": 93
    },
    "stats": {
        "initiative": 14,
        "perception": 10,
        "defense": 29,
        "fortitude": 12,
        "reflex": 21,
        "will": 5,
        "hitPoints": 280,
        "speedText": "voo 12m (8q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a acertos críticos, atordoado, caído, cansaço, efeitos de metabolismo, eletricidade e paralisia; vulnerabilidade a ácido",
        "attributes": {
            "str": 1,
            "dex": 7,
            "con": 4,
            "int": 0,
            "wis": -1,
            "cha": -2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Dois socos pneumáticos +20 (1d8+16 impacto, x3)."
        }
    ],
    "abilities": [
        {
            "name": "Ataque Furtivo",
            "timing": null,
            "text": "+4d6."
        },
        {
            "name": "Caçada Implacável",
            "timing": "padrão",
            "text": "O rarvnaak marca um alvo conhecido (uma descrição fornecida por alguém é suficiente). Ele recebe +5 em testes de ataque e rolagens de dano contra este alvo e, enquanto ambos estiverem no mesmo Plano, sabe sua distância e direção. O rarvnaak só pode ter um alvo marcado por vez."
        },
        {
            "name": "Corpo Eólico",
            "timing": null,
            "text": "O rarvnaak pode atravessar qualquer fresta por onde o ar passaria, e só pode ser afetado por armas e efeitos mágicos."
        },
        {
            "name": "Invisibilidade Natural",
            "timing": null,
            "text": "O rarvnaak está sempre invisível. Ele recebe camuflagem total e +10 em Furtividade (já contabilizado), e criaturas que não possam percebê-lo ficam desprevenidas."
        }
    ],
    "equipment": null,
    "treasure": "1d4 doses de éter elemental (eletricidade) (CD 22 para extrair).",
    "skillsText": "Furtividade +29",
    "role": "special",
    "roleSource": "pdf-review"
};

export const hallusTir = {
    "id": "hallus-tir",
    "name": "Hallus’tir",
    "type": "spirit",
    "subtype": "elemental",
    "size": "Colossal",
    "challengeRating": 15,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 96,
        "bookPage": 94
    },
    "stats": {
        "initiative": 29,
        "perception": 15,
        "defense": 49,
        "fortitude": 20,
        "reflex": 28,
        "will": 15,
        "hitPoints": 718,
        "speedText": "12m (8q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a acertos críticos, atordoado, caído, cansaço, efeitos de metabolismo, eletricidade e paralisia; vulnerabilidade a ácido",
        "attributes": {
            "str": 6,
            "dex": 14,
            "con": 8,
            "int": -3,
            "wis": 0,
            "cha": -2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Punho x3 +44 (2d12+23 impacto)."
        },
        {
            "name": "À Distância",
            "text": "Dois escombros +37 (4d6+31 impacto, x3, alcance médio)."
        }
    ],
    "abilities": [
        {
            "name": "Corpo Eólico",
            "timing": null,
            "text": "O hallus’tir pode atravessar qualquer fresta por onde o ar passaria, e só pode ser afetado por armas e efeitos mágicos."
        },
        {
            "name": "Relâmpago Selvagem",
            "timing": "livre",
            "text": "Uma vez por rodada, o hallus’tir causa 6d10 pontos de dano de eletricidade em uma criatura em alcance médio (Ref CD 40 reduz à metade)."
        },
        {
            "name": "Tornado Vivo",
            "timing": null,
            "text": "No início de cada turno do hallus’tir, todas as criaturas Enormes ou menores em alcance longo ficam caídas e são puxadas 1d12 x 1,5m na direção dele (Fort CD 40 evita; criaturas voadoras sofrem –5 nesse teste). Uma criatura puxada sofre 1d6 pontos de dano de impacto para cada 1,5m que foi arrastada e, se for arrastada até o espaço ocupado pelo hallus’tir, é sugada para dentro dele e fica agarrada. Uma criatura agarrada desta forma pode gastar uma ação padrão para fazer um teste de Atletismo (CD 40). Se passar, solta-se e fica em um espaço adjacente ao hallus’tir."
        },
        {
            "name": "Turbilhão de Escombros",
            "timing": null,
            "text": "No início de cada turno do hallus’tir, todas as criaturas dentro dele sofrem 7d6 pontos de dano de impacto (Ref CD 40 reduz à metade)."
        },
        {
            "name": "Ventos da Matança",
            "timing": null,
            "text": "O clima em uma esfera de 90m ao redor do hallus’tir é de tempestade constante (sem chance de queda de raios) e, em uma esfera de 500m, é de vento forte. Estes climas não podem ser alterados."
        },
        {
            "name": "Olho da Tempestade",
            "timing": null,
            "text": "Se estiver na área de um efeito mágico que altera o clima, o hallus’tir fica atordoado por 1 rodada (Fort CD do efeito, se houver, evita). Ele só pode ser atordoado dessa forma uma vez por cena."
        }
    ],
    "equipment": null,
    "treasure": "1d4+2 doses de éter elemental (eletricidade) (CD 30 para extrair) e 1d4+2 doses de raio cristalizado (CD 30 para extrair).",
    "skillsText": null,
    "role": "solo",
    "roleSource": "pdf-review"
};

export const pakk = {
    "id": "pakk",
    "name": "Pakk",
    "type": "spirit",
    "subtype": "elemental",
    "size": "Minúsculo",
    "challengeRating": 1,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 96,
        "bookPage": 94,
        "pdfPageEnd": 97,
        "bookPageEnd": 95
    },
    "stats": {
        "initiative": 7,
        "perception": 2,
        "defense": 15,
        "fortitude": 5,
        "reflex": 10,
        "will": 1,
        "hitPoints": 9,
        "speedText": "voo 12m (8q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a acertos críticos, atordoado, cansaço, efeitos de metabolismo, fogo e paralisia; vulnerabilidade a frio",
        "attributes": {
            "str": 0,
            "dex": 5,
            "con": 1,
            "int": -1,
            "wis": 2,
            "cha": 3
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Queimadura +11 (4d6 fogo)."
        }
    ],
    "abilities": [
        {
            "name": "Arco de Chamas",
            "timing": "padrão",
            "text": "O pakk projeta chamas em um cone de 6m. Criaturas nessa área sofrem 3d6 pontos de dano de fogo (Ref CD 14 reduz à metade). Recarga (movimento)."
        },
        {
            "name": "Labareda Viva",
            "timing": null,
            "text": "No início de cada turno do pakk, todas as criaturas em alcance curto sofrem 1d4 pontos de dano de fogo."
        }
    ],
    "equipment": null,
    "treasure": "1 dose de éter elemental (fogo) (CD 16 para extrair).",
    "skillsText": null,
    "role": "minion",
    "roleSource": "pdf-review"
};

export const berBaram = {
    "id": "ber-baram",
    "name": "Ber-baram",
    "type": "spirit",
    "subtype": "elemental",
    "size": "Grande",
    "challengeRating": 8,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 97,
        "bookPage": 95
    },
    "stats": {
        "initiative": 9,
        "perception": 10,
        "defense": 30,
        "fortitude": 20,
        "reflex": 17,
        "will": 7,
        "hitPoints": 320,
        "speedText": "15m (10q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a acertos críticos, atordoado, cansaço, efeitos de metabolismo, fogo e paralisia; vulnerabilidade a frio",
        "attributes": {
            "str": 8,
            "dex": 5,
            "con": 5,
            "int": -2,
            "wis": 2,
            "cha": 2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Marrada +26 (2d10+12 mais 3d6 fogo)."
        }
    ],
    "abilities": [
        {
            "name": "Baforada Flamejante",
            "timing": "movimento",
            "text": "O ber-baram sopra fogo num cone de 9m. Criaturas na área sofrem 7d6 pontos de dano de fogo (Ref CD 26 reduz à metade). Recarga (movimento)."
        },
        {
            "name": "Marrada Explosiva",
            "timing": "livre",
            "text": "Quando acerta um ataque de marrada em investida, o ber-baram causa uma explosão de chamas em um raio de 6m do alvo da marrada. Todas as criaturas na área sofrem 6d6 pontos de dano de fogo (Ref CD 26 reduz à metade). Recarga (movimento)."
        },
        {
            "name": "Sangue de Lava",
            "timing": null,
            "text": "Quando o ber-baram sofre dano de corte ou perfuração, criaturas adjacentes a ele sofrem 4d6 pontos de dano de fogo e ficam em chamas (Ref CD 26 reduz à metade e evita as chamas)."
        }
    ],
    "equipment": null,
    "treasure": "1d4 doses de éter elemental (fogo) (CD 23 para extrair).",
    "skillsText": null,
    "role": "solo",
    "roleSource": "pdf-review"
};

export const serpentaar = {
    "id": "serpentaar",
    "name": "Serpentaar",
    "type": "spirit",
    "subtype": "elemental",
    "size": "Enorme",
    "challengeRating": 14,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 98,
        "bookPage": 96
    },
    "stats": {
        "initiative": 9,
        "perception": 14,
        "defense": 47,
        "fortitude": 30,
        "reflex": 22,
        "will": 14,
        "hitPoints": 700,
        "speedText": "6m (4q), escavação 9m (6q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a acertos críticos, atordoado, cansaço, efeitos de metabolismo, fogo e paralisia; vulnerabilidade a frio",
        "attributes": {
            "str": 4,
            "dex": 2,
            "con": 4,
            "int": -2,
            "wis": 3,
            "cha": 2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida x2 +39 (2d10+7 mais 6d6+31 fogo)."
        }
    ],
    "abilities": [
        {
            "name": "Aura de Calor",
            "timing": null,
            "text": "No início de cada turno do serpentaar, todas as criaturas em um raio de 9m sofrem 10d6+30 pontos de dano de fogo."
        },
        {
            "name": "Corpo Ígneo",
            "timing": null,
            "text": "Criaturas e objetos que iniciem seus turnos adjacentes ao serpentaar, ou que façam um ataque corpo a corpo contra ele, sofrem 4d12 pontos de dano de fogo (Ref CD 38 evita)."
        },
        {
            "name": "Irromper",
            "timing": "completa",
            "text": "O serpentaar cria quatro esferas flamejantes em alcance médio. Cada uma dessas esferas dura 2 rodadas, tem 1,5m de raio e causa 12d8 pontos de dano de fogo a criaturas que iniciem seu turno em sua área (Ref CD 28 reduz à metade). Recarga (movimento)."
        },
        {
            "name": "Resfriamento Forçado",
            "timing": null,
            "text": "Quando sofre 70 pontos de dano de frio ou mais de um único efeito, o corpo do serpentaar resfria, desativando sua habilidade Corpo Ígneo por 2 rodadas."
        }
    ],
    "equipment": null,
    "treasure": "1d4+2 doses de éter elemental (fogo) (CD 29 para extrair).",
    "skillsText": null,
    "role": "solo",
    "roleSource": "pdf-review"
};

export const bandoDePamgras = {
    "id": "bando-de-pamgras",
    "name": "Bando de Pamgras",
    "type": "spirit",
    "subtype": "elemental",
    "size": "Grande",
    "challengeRating": 11,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 100,
        "bookPage": 98
    },
    "stats": {
        "initiative": 9,
        "perception": 8,
        "defense": 41,
        "fortitude": 24,
        "reflex": 18,
        "will": 11,
        "hitPoints": 550,
        "speedText": "9m (6q), escalar 6m (4q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a acertos críticos, ácido, atordoado, cansaço, efeitos de metabolismo e paralisia; redução de dano 10/impacto; vulnerabilidade a eletricidade",
        "attributes": {
            "str": 8,
            "dex": 0,
            "con": 4,
            "int": -3,
            "wis": -1,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "[Bando] Duas pancadas +34 (4d10+30, 19)."
        }
    ],
    "abilities": [
        {
            "name": "Abalo Sísmico",
            "timing": "completa",
            "text": "O bando de pamgras golpeia o solo repetidamente, abrindo fendas no chão em pontos aleatórios em um círculo de 30m de raio ao seu redor. Cada criatura na área precisa rolar um dado; com um resultado ímpar, uma fenda se abre sob seus pés e a criatura cai dentro dela (Ref CD 31 evita a queda). Dentro da fenda, a criatura é considerada agarrada; ela pode se soltar e sair da fenda gastando uma ação completa e passando em um teste de Atletismo (CD 31). No início de cada turno da criatura agarrada, ela sofre 4d8 pontos de dano de impacto pelo esmagamento das rochas. Recarga (movimento)."
        },
        {
            "name": "Cristalário",
            "timing": null,
            "text": "Os cristais afiados do corpo do bando ferem profundamente suas vítimas. Criaturas atingidas por ataques do bando ficam sangrando (Fort CD 31 evita)."
        },
        {
            "name": "Golpe Avassalador",
            "timing": "livre",
            "text": "Quando acerta um ataque de pancada, o bando arremessa a vítima 2d6 x 1,5m em uma direção à escolha dele (Fort CD 31 evita). A vítima fica caída e, se atingir algum obstáculo, sofre 2d6 pontos de dano de impacto para cada 1,5m que foi arremessada."
        }
    ],
    "equipment": null,
    "treasure": "1d6 doses de éter elemental (ácido) (CD 26 para extrair).",
    "skillsText": null,
    "role": "minion",
    "roleSource": "pdf-review"
};

export const tanaloom = {
    "id": "tanaloom",
    "name": "Tanaloom",
    "type": "spirit",
    "subtype": "elemental",
    "size": "Enorme",
    "challengeRating": 13,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 101,
        "bookPage": 99
    },
    "stats": {
        "initiative": 10,
        "perception": 12,
        "defense": 44,
        "fortitude": 26,
        "reflex": 20,
        "will": 13,
        "hitPoints": 650,
        "speedText": "15m (10q), escalar 15m (10q)",
        "senses": "não pode ser flanqueado, percepção às cegas, visão no escuro",
        "defensesText": "imunidade a acertos críticos, ácido, atordoado, caído, cansaço, efeitos de metabolismo e paralisia; redução de dano 15/impacto; vulnerabilidade a eletricidade",
        "attributes": {
            "str": 12,
            "dex": 0,
            "con": 9,
            "int": -2,
            "wis": 2,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Duas pancadas +37 (4d12+49)."
        },
        {
            "name": "À Distância",
            "text": "Flechas ácidas x6 +34 (3d6+10 ácido, x3, alcance médio)."
        }
    ],
    "abilities": [
        {
            "name": "Golpe Esmagador",
            "timing": "livre",
            "text": "Quando o tanaloom acerta um ataque de pancada, pode usar a manobra derrubar (teste +42). Criaturas derrubadas dessa forma precisam gastar uma ação padrão em vez de movimento para se levantar e não podem usar Acrobacia para se levantar como ação livre, pois ficam presas ao chão."
        },
        {
            "name": "Metamorfismo Rochoso",
            "timing": "movimento",
            "text": "O tanaloom deforma seu corpo para passar por espaços estreitos, suficientes para criaturas Médias ou maiores, percorrendo até metade do seu deslocamento."
        },
        {
            "name": "Monólito",
            "timing": null,
            "text": "Um tanaloom pode permanecer completamente imóvel. Se estiver assim, um personagem deve passar num teste de Percepção (CD 40) para perceber que ele é uma criatura e não parte de uma construção."
        },
        {
            "name": "Rolo Compressor",
            "timing": null,
            "text": "O tanaloom pode passar por espaços ocupados por criaturas Grandes ou menores. Se fizer isso, causa 2d10 pontos de dano de impacto em cada criatura nos espaços que atravessar. Uma criatura só pode sofrer dano dessa habilidade uma vez por rodada."
        }
    ],
    "equipment": null,
    "treasure": "2d4 doses de éter elemental (ácido) (CD 28 para extrair).",
    "skillsText": null,
    "role": "solo",
    "roleSource": "pdf-review"
};

export const elementalCorrompido = {
    "id": "elemental-corrompido",
    "name": "Elemental Corrompido",
    "type": "spirit",
    "subtype": "elemental",
    "size": "Colossal",
    "challengeRating": 16,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 103,
        "bookPage": 101
    },
    "stats": {
        "initiative": 19,
        "perception": 14,
        "defense": 53,
        "fortitude": 30,
        "reflex": 24,
        "will": 16,
        "hitPoints": 800,
        "speedText": "15m (10q), natação 15m (10q)",
        "senses": "percepção às cegas, visão no escuro",
        "defensesText": "imunidade a acertos críticos, ácido, atordoado, cansaço, dano de luz, efeitos de metabolismo, eletricidade, paralisia e trevas",
        "attributes": {
            "str": 12,
            "dex": 5,
            "con": 13,
            "int": -1,
            "wis": 0,
            "cha": 0
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +46 (3d12+15 mais 4d6 ácido) e duas pancadas +46 (3d8+15 mais 4d6 ácido)."
        }
    ],
    "abilities": [
        {
            "name": "Agarrar Aprimorado",
            "timing": "livre",
            "text": "Mordida (teste +56)."
        },
        {
            "name": "Corpo Volátil",
            "timing": null,
            "text": "Caso o elemental corrompido fosse sofrer 20 ou mais pontos de dano de eletricidade ou fogo mágicos, a água em seu corpo evapora, criando uma nuvem corrosiva em uma esfera de 6m ao redor dele. Criaturas que iniciem seus turnos nessa área sofrem 10d6 pontos de dano de ácido e ficam enjoadas (Fort CD 42 reduz o dano à metade e evita a condição). Dentro da nuvem, criaturas têm seu deslocamento reduzido para 3m, sofrem –2 em testes de ataque e rolagens de dano, e recebem camuflagem leve contra criaturas a até 1,5m e camuflagem total contra criaturas a mais de 1,5m."
        },
        {
            "name": "Engolfar",
            "timing": "livre",
            "text": "Se o elemental começar seu turno agarrando uma criatura Grande ou menor, poderá fazer um teste de agarrar contra ela. Se vencer, engolfa a criatura. Uma criatura engolfada continua agarrada e fica submersa no elemental; ela começa a sufocar e sofre 10d6 pontos de dano de ácido no início de cada rodada do elemental. A criatura pode fazer um teste de Atletismo para natação (CD 42) para se libertar. Isso faz com que ela escape para um espaço livre adjacente ao elemental, a sua escolha."
        },
        {
            "name": "Reabastecer",
            "timing": null,
            "text": "Se estiver em contato com um corpo d’água Médio ou maior, o elemental recebe cura acelerada 50. Além disso, se fosse sofrer dano mágico de frio, em vez disso ele cura PV em quantidade igual à metade do dano que sofreria."
        },
        {
            "name": "Torrente Cáustica",
            "timing": "movimento",
            "text": "O elemental cospe uma torrente de água cáustica em uma criatura em alcance médio. O alvo sofre 5d6 pontos de dano de ácido e 5d6 pontos de dano de impacto, e fica caído (Ref CD 42 reduz o dano à metade e evita a condição). Se falhar por 10 ou mais no teste de Reflexos, a vítima é empurrada 6m na direção oposta ao elemental e, se estiver usando armadura e/ou escudo, o item é avariado. Recarga (movimento)."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": null,
    "role": "solo",
    "roleSource": "pdf-review"
};

export const oni = {
    "id": "oni",
    "name": "Oni",
    "type": "spirit",
    "subtype": null,
    "size": "Médio",
    "challengeRating": 5,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 164,
        "bookPage": 162
    },
    "stats": {
        "initiative": 5,
        "perception": 3,
        "defense": 24,
        "fortitude": 17,
        "reflex": 11,
        "will": 5,
        "hitPoints": 200,
        "speedText": "9m (6q)",
        "senses": "faro, visão na penumbra",
        "defensesText": "imunidade a doenças, fogo e veneno; redução de dano 5",
        "attributes": {
            "str": 5,
            "dex": 1,
            "con": 3,
            "int": 0,
            "wis": -1,
            "cha": -2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Machado de guerra +17 (1d12+16, x3) e chifres +17 (1d6+10 mais doença)."
        }
    ],
    "abilities": [
        {
            "name": "Ataque Pesado",
            "timing": "livre",
            "text": "Quando acerta um ataque de machado de guerra, o oni faz a manobra derrubar ou empurrar contra o alvo (teste +19)."
        },
        {
            "name": "Avesso à Honra",
            "timing": null,
            "text": "Os ataques do oni causam +1d10 pontos de dano de trevas contra devotos de Lin-Wu e personagens que sigam algum código de conduta, como Código de Honra ou Código do Herói."
        },
        {
            "name": "Doença",
            "timing": null,
            "text": "Uma criatura atingida pelos chifres do oni é exposta à doença calafrio diabólico."
        }
    ],
    "equipment": "Machado de guerra",
    "treasure": "Padrão.",
    "skillsText": "Atletismo +9, Intimidação +7",
    "role": "solo",
    "roleSource": "pdf-review"
};

export const stagh = {
    id: "stagh",
    name: "Stagh",
    type: "spirit",
    subtype: "elemental",
    size: "Pequeno",
    challengeRating: 3,
    description: [],
    role: "minion",
    roleSource: "screenshot-review",
    source: { book: "Ameaças de Arton", edition: "1ª edição, novembro de 2023", pdfFile: "T20 Ameacas de Arton.pdf", pdfPage: 356, bookPage: 354 },
    stats: {
        initiative: 6, perception: 4, defense: 22, fortitude: 7, reflex: 12, will: 4,
        hitPoints: 35,
        speedText: "9m (6q), escalada 9m (6q)",
        senses: "visão no escuro",
        defensesText: "imunidade a acertos críticos, atordoado, cansaço, efeitos de metabolismo, frio e paralisia, vulnerabilidade a fogo",
        attributes: { str: 2, dex: 3, con: 3, int: -4, wis: 1, cha: -1 }
    },
    actions: [
        { name: "Corpo a Corpo", text: "Duas garras +16 (1d6+4 mais 1d6 frio)." }
    ],
    abilities: [
        { name: "Aura de Frio", timing: null, text: "No início de cada turno do stagh, todas as criaturas em um raio de 9m sofrem 1d6+3 pontos de dano de frio (Fort CD 17 reduz à metade)." }
    ],
    equipment: null,
    treasure: "1 dose de éter elemental (frio) (CD 18 para extrair).",
    skillsText: null
};

export const rhandomm = {
    "id": "rhandomm",
    "name": "Rhandomm",
    "type": "spirit",
    "subtype": null,
    "size": "Colossal",
    "challengeRating": 20,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 115,
        "bookPage": 113
    },
    "stats": {
        "initiative": 20,
        "perception": 26,
        "defense": 63,
        "fortitude": 34,
        "reflex": 20,
        "will": 28,
        "hitPoints": 1300,
        "speedText": "15m (10q)",
        "senses": "faro, visão no escuro",
        "defensesText": "cura acelerada 100; imunidade a adivinhação, atordoado, cansaço, efeitos mentais, de metabolismo e mágicos de movimento, dano, medo, metamorfose, paralisia e veneno; resistência a magia +10",
        "attributes": {
            "str": 19,
            "dex": 4,
            "con": 17,
            "int": -4,
            "wis": 0,
            "cha": 0
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Duas pancadas +55 (4d12+40, x4)."
        },
        {
            "name": "À Distância",
            "text": "Rocha +50 (6d10+40 impacto, alcance longo)."
        }
    ],
    "abilities": [
        {
            "name": "Aura Caótica",
            "timing": null,
            "text": "No início do turno do Rhandomm, cada criatura em uma esfera de 30m perde 6d6 pontos de vida, à medida que seus corpos se distorcem pelo puro poder do Caos. Sempre que o Rhandomm rola um 6 num desses dados de dano, soma esse valor e rola o dado novamente."
        },
        {
            "name": "Golpe Avassalador",
            "timing": "livre",
            "text": "Quando acerta um ataque de pancada, o Rhandomm arremessa a vítima 1d6 x 1,5m em uma direção à escolha dele (Fort CD 50 evita). A vítima fica caída e, se atingir algum obstáculo, sofre 1d6 pontos de dano de impacto para cada 1,5m que foi arremessada."
        },
        {
            "name": "Punhos Caóticos",
            "timing": null,
            "text": "Uma criatura atingida por uma pancada do Rhandomm perde 6d6 pontos de vida. Sempre que o Rhandomm rola um 6 num dos dados desse dano, soma esse valor e rola o dado novamente."
        },
        {
            "name": "Salto Prodigioso",
            "timing": "movimento",
            "text": "O Rhandomm salta 60m para um espaço desocupado em qualquer direção."
        },
        {
            "name": "Sentidos Titânicos",
            "timing": null,
            "text": "O Rhandomm está permanentemente sob o efeito básico de Visão da Verdade como uma magia simulada."
        },
        {
            "name": "Titânico",
            "timing": null,
            "text": "O Rhandomm é imune a manobras de combate e não pode ser flanqueado. Quando se move, pisoteia qualquer criatura ou objeto Enorme ou menor em seu caminho, causando 20d6 pontos de dano de impacto (uma vez por rodada por criatura, Ref CD 50 reduz à metade). Além disso, seus ataques ignoram redução de dano e atingem todas as criaturas em um quadrado de 6m; para cada ataque, ele faz um único teste de ataque e compara o resultado com a Defesa de cada inimigo na área."
        },
        {
            "name": "Varrer",
            "timing": "livre",
            "text": "Uma vez por rodada, quando o Rhandomm faz um ataque corpo a corpo e reduz os pontos de vida do alvo para 0 ou menos, pode realizar um ataque adicional contra outra criatura dentro do seu alcance."
        },
        {
            "name": "Fraqueza Variável",
            "timing": null,
            "text": "O Rhandomm é suscetível a um tipo de dano, que muda sempre que ele desperta de sua hibernação. Role 1d10: 1 ácido; 2 corte; 3 eletricidade; 4 essência; 5 fogo; 6 frio; 7 impacto; 8 luz; 9 perfuração; 10 trevas. Efeitos que causem esse tipo de dano ignoram a imunidade a dano do Rhandomm."
        },
        {
            "name": "Montanha Viva",
            "timing": null,
            "text": "Um personagem pode gastar uma ação padrão e fazer um teste de Atletismo (CD 30) para escalar o Rhandomm. Se falhar por 5 ou mais, cai na frente do monstro e sofre 8d6 pontos de dano da queda. Se passar em três desses testes, chega nos ombros do monstro. Um personagem nos ombros do Rhandomm recebe camuflagem leve contra os ataques da criatura e faz ataques como se o Rhandomm estivesse desprevenido."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": null
};

export const akaOni = {
    "id": "aka-oni",
    "name": "Aka Oni",
    "type": "spirit",
    "subtype": "lefeu",
    "size": "Médio",
    "challengeRating": 9,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 165,
        "bookPage": 163
    },
    "stats": {
        "initiative": 9,
        "perception": 14,
        "defense": 35,
        "fortitude": 21,
        "reflex": 16,
        "will": 9,
        "hitPoints": 360,
        "speedText": "9m (6q)",
        "senses": "faro, visão na penumbra",
        "defensesText": "redução de dano 10; imunidades de lefeu",
        "attributes": {
            "str": 7,
            "dex": 1,
            "con": 3,
            "int": -1,
            "wis": 1,
            "cha": -4
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Tetsubo +28 (1d12+18, x3 mais 1d6 matéria vermelha), duas pinças +28 (1d4+13) e chifres +28 (1d6+13 mais doença)."
        }
    ],
    "abilities": [
        {
            "name": "Ataque Pesado",
            "timing": "livre",
            "text": "Quando acerta um ataque de tetsubo, o aka oni faz a manobra derrubar ou empurrar contra o alvo (teste +30)."
        },
        {
            "name": "Avesso à Honra",
            "timing": null,
            "text": "Os ataques do oni causam +1d10 pontos de dano de trevas contra devotos de Lin-Wu e personagens que sigam algum código de conduta, como Código de Honra ou Código do Herói."
        },
        {
            "name": "Doença",
            "timing": null,
            "text": "Uma criatura atingida pelos chifres do oni é exposta à doença infecção escarlate."
        },
        {
            "name": "Insanidade da Tormenta",
            "timing": null,
            "text": "2d6 PM (Von CD 28 evita)."
        },
        {
            "name": "Imunidades Lefeu",
            "timing": null,
            "text": "Lefeu são imunes a acertos críticos, ácido, cansaço, eletricidade, fogo, frio, luz, paralisia, metabolismo, metamorfose, trevas e veneno."
        },
        {
            "name": "Percepção Temporal",
            "timing": null,
            "text": "Um lefeu soma sua Sabedoria em testes de ataque, Defesa e Reflexos (já contabilizado na ficha)."
        },
        {
            "name": "Visão Ampla",
            "timing": null,
            "text": "Um lefeu recebe +5 em Percepção e não pode ser flanqueado."
        }
    ],
    "equipment": "Gibão de peles, tetsubo aumentado de matéria vermelha",
    "treasure": "Nenhum.",
    "skillsText": "Atletismo +15, Intimidação +11"
};

export const daitengu = {
    "id": "daitengu",
    "name": "Daitengu",
    "type": "spirit",
    "subtype": "tengu",
    "size": "Médio",
    "challengeRating": 8,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 166,
        "bookPage": 164,
        "pdfPageEnd": 167,
        "bookPageEnd": 165
    },
    "stats": {
        "initiative": 14,
        "perception": 11,
        "defense": 32,
        "fortitude": 8,
        "reflex": 21,
        "will": 15,
        "hitPoints": 222,
        "manaPoints": 64,
        "speedText": "9m (6q), voo 12m (8q)",
        "senses": "visão no escuro",
        "defensesText": null,
        "attributes": {
            "str": 2,
            "dex": 6,
            "con": 2,
            "int": 4,
            "wis": 1,
            "cha": 0
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Duas katanas +26 (2d10+24, 19)."
        }
    ],
    "abilities": [
        {
            "name": "Asas Desorientadoras",
            "timing": null,
            "text": "Se não estiver usando suas asas para voar, o daitengu pode fintar como ação de movimento."
        },
        {
            "name": "Ataque Reflexo",
            "timing": "reação",
            "text": "Uma vez por rodada, o daitengu pode fazer um ataque corpo a corpo contra um alvo em seu alcance natural que esteja desprevenido ou que se mova voluntariamente para fora desse alcance."
        },
        {
            "name": "Imprevisível como o Vento",
            "timing": null,
            "text": "Uma vez por rodada, quando não está voando e faz um ataque ou uma finta, o daitengu pode rolar dois dados e usar o melhor resultado."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como um bruxo de 8º nível (CD 28). Seu foco arcano é sua katana."
        },
        {
            "name": "Primor Atlético",
            "timing": "movimento",
            "cost": "2 PM",
            "text": "O daitengu salta e pousa em alcance corpo a corpo de uma criatura em alcance curto. Se fizer um ataque corpo a corpo contra essa criatura neste turno, ele recebe os benefícios e penalidades de uma investida e causa um dado extra de dano do mesmo tipo com este ataque."
        },
        {
            "name": "Resistência a Energia",
            "timing": "padrão",
            "cost": "6 PM",
            "text": "Até o fim da cena, criaturas escolhidas em alcance curto recebem redução de dano 10 contra ácido, eletricidade, fogo, frio, luz ou trevas, à escolha do daitengu."
        },
        {
            "name": "Soco de Arsenal",
            "timing": "padrão",
            "cost": "4 PM",
            "text": "O alcance natural do daitengu aumenta para 4,5m até o fim da cena."
        },
        {
            "name": "Velocidade",
            "timing": "padrão",
            "cost": "3 PM, sustentada",
            "text": "O daitengu pode executar uma ação padrão adicional por turno, que não pode ser usada para lançar magias."
        }
    ],
    "equipment": "Katana x2",
    "treasure": "Padrão.",
    "skillsText": "Acrobacia +14, Enganação +10, Misticismo +14, Sobrevivência +9"
};

export const dragaoCelestialAdulto = {
    "id": "dragao-celestial-adulto",
    "name": "Dragão Celestial Adulto",
    "type": "spirit",
    "subtype": null,
    "size": "Enorme",
    "challengeRating": 15,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 168,
        "bookPage": 166
    },
    "stats": {
        "initiative": 16,
        "perception": 24,
        "defense": 50,
        "fortitude": 24,
        "reflex": 15,
        "will": 28,
        "hitPoints": 825,
        "manaPoints": 108,
        "speedText": "12m (8q), voo 36m (24q)",
        "senses": "percepção às cegas (médio), visão no escuro",
        "defensesText": "imunidade a eletricidade, atordoamento, medo, metabolismo, metamorfose e paralisia; redução de dano 10; resistência a magia +3; vulnerabilidade a ácido",
        "attributes": {
            "str": 12,
            "dex": 2,
            "con": 8,
            "int": 6,
            "wis": 7,
            "cha": 6
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +42 (4d10+30, 18) e duas garras +42 (3d10+30, 18)."
        }
    ],
    "abilities": [
        {
            "name": "Magia Acelerada",
            "timing": "livre",
            "cost": "+4 PM",
            "text": "Uma vez por rodada, quando lança uma magia com execução de ação completa ou menor, o dragão celestial muda a execução dela para livre."
        },
        {
            "name": "Presença Celestial",
            "timing": null,
            "text": "A mera visão de um dragão celestial adulto ou mais velho pode fascinar ou amedrontar. Uma criatura que comece seu turno em alcance longo do dragão fica apavorada (se tiver 4 níveis ou menos) ou abalada (se tiver 5 níveis ou mais) até o fim da cena. Criaturas com um código de conduta ou devotos de Khalmyr ou Lin-Wu em vez disso ficam fascinadas, independente de seu nível (Von CD 42 evita em todos os casos). Uma criatura que passe no teste de resistência fica imune a esta habilidade por um dia."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como um clérigo de Lin-Wu de 15º nível (CD 42, limite de PM 23)."
        },
        {
            "name": "Coluna de Chamas",
            "timing": "padrão",
            "cost": "18 PM",
            "text": "Um cilindro com 3m de raio desce dos céus em um ponto em alcance longo, causando 12d6 pontos de dano de fogo mais 12d6 pontos de dano de luz (Ref reduz à metade)."
        },
        {
            "name": "Curar Ferimentos",
            "timing": "padrão",
            "cost": "15 PM",
            "text": "Uma criatura adjacente cura 16d8+16 PV ou criaturas escolhidas em alcance curto curam 11d8+11."
        },
        {
            "name": "Dissipar Magia",
            "timing": "padrão",
            "cost": "3 PM",
            "text": "O dragão escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias nesse alvo com CD igual ou menor que o resultado do teste são dissipadas."
        },
        {
            "name": "Escudo da Fé",
            "timing": "padrão",
            "cost": "17 PM",
            "text": "O dragão recebe camuflagem leve contra ataques à distância e +8 na Defesa por 1 dia."
        },
        {
            "name": "Santuário",
            "timing": "padrão",
            "cost": "10 PM",
            "text": "O dragão toca uma criatura. Até o fim da cena, ou até que essa criatura faça uma ação hostil, qualquer criatura que tente fazer uma ação hostil contra ela, ou contra uma área que a inclui, perde a ação (Von evita)."
        },
        {
            "name": "Viagem Planar",
            "timing": "padrão",
            "cost": "12 PM",
            "text": "O dragão e até 5 criaturas voluntárias que ele esteja tocando viajam para outro Plano."
        },
        {
            "name": "Imunidades",
            "timing": null,
            "text": "Dragões celestiais são imunes a efeitos de atordoamento, medo, metabolismo, metamorfose e paralisia."
        },
        {
            "name": "Magia Celestial",
            "timing": null,
            "text": "Dragões celestiais podem lançar magias sem palavras mágicas, gestos, concentração ou componentes materiais."
        },
        {
            "name": "Metamorfose Celestial",
            "timing": "completa",
            "text": "Dragões celestiais podem se transformar em outras criaturas, como a magia Metamorfose, mas sem limitação para tamanhos menores que o seu. Um dragão morto reverte à sua forma original."
        }
    ],
    "equipment": null,
    "treasure": "Dobro.",
    "skillsText": "Conhecimento +22, Diplomacia +22, Intuição +23, Misticismo +22, Religião +23"
};

export const dragaoCelestialJovem = {
    "id": "dragao-celestial-jovem",
    "name": "Dragão Celestial Jovem",
    "type": "spirit",
    "subtype": null,
    "size": "Grande",
    "challengeRating": 10,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 167,
        "bookPage": 165
    },
    "stats": {
        "initiative": 12,
        "perception": 16,
        "defense": 35,
        "fortitude": 18,
        "reflex": 10,
        "will": 22,
        "hitPoints": 450,
        "manaPoints": 75,
        "speedText": "12m (8q), voo 36m (24q)",
        "senses": "percepção às cegas, visão no escuro",
        "defensesText": "imunidade a eletricidade, atordoamento, medo, metabolismo, metamorfose e paralisia; redução de dano 5; resistência a magia +2; vulnerabilidade a ácido",
        "attributes": {
            "str": 9,
            "dex": 2,
            "con": 8,
            "int": 4,
            "wis": 5,
            "cha": 4
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +29 (4d10+20, 18) e duas garras +29 (3d10+20, 18)."
        }
    ],
    "abilities": [
        {
            "name": "Magias",
            "timing": null,
            "text": "Como um clérigo de Lin-Wu de 10º nível (CD 32)."
        },
        {
            "name": "Coluna de Chamas",
            "timing": "padrão",
            "cost": "10 PM",
            "text": "Um cilindro com 3m de raio e 30m de altura desce dos céus em um ponto em alcance longo, causando 8d6 pontos de dano de fogo mais 8d6 pontos de dano de luz nas criaturas e objetos livres na área (Ref reduz à metade)."
        },
        {
            "name": "Curar Ferimentos",
            "timing": "padrão",
            "cost": "10 PM",
            "text": "Uma criatura adjacente cura 11d8+11 PV ou criaturas escolhidas em alcance curto curam 6d8+6."
        },
        {
            "name": "Dissipar Magia",
            "timing": "padrão",
            "cost": "3 PM",
            "text": "O dragão escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias nesse alvo com CD igual ou menor que o resultado do teste são dissipadas."
        },
        {
            "name": "Escudo da Fé",
            "timing": "reação",
            "cost": "8 PM",
            "text": "Quando sofre um ataque, o dragão recebe camuflagem leve contra ataques à distância e +5 na Defesa por 1 turno."
        },
        {
            "name": "Santuário",
            "timing": "padrão",
            "cost": "10 PM",
            "text": "O dragão toca uma criatura. Até o fim da cena, ou até que essa criatura faça uma ação hostil, qualquer criatura que tente fazer uma ação hostil contra ela, ou contra uma área que a inclui, perde a ação (Von evita)."
        },
        {
            "name": "Imunidades",
            "timing": null,
            "text": "Dragões celestiais são imunes a efeitos de atordoamento, medo, metabolismo, metamorfose e paralisia."
        },
        {
            "name": "Magia Celestial",
            "timing": null,
            "text": "Dragões celestiais podem lançar magias sem palavras mágicas, gestos, concentração ou componentes materiais."
        },
        {
            "name": "Metamorfose Celestial",
            "timing": "completa",
            "text": "Dragões celestiais podem se transformar em outras criaturas, como a magia Metamorfose, mas sem limitação para tamanhos menores que o seu. Um dragão morto reverte à sua forma original."
        }
    ],
    "equipment": null,
    "treasure": "Dobro.",
    "skillsText": "Conhecimento +15, Diplomacia +15, Intuição +16, Misticismo +15, Religião +16"
};

export const dragaoCelestialVeneravel = {
    "id": "dragao-celestial-veneravel",
    "name": "Dragão Celestial Venerável",
    "type": "spirit",
    "subtype": null,
    "size": "Enorme",
    "challengeRating": 20,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 168,
        "bookPage": 166,
        "pdfPageEnd": 169,
        "bookPageEnd": 167
    },
    "stats": {
        "initiative": 20,
        "perception": 28,
        "defense": 60,
        "fortitude": 28,
        "reflex": 21,
        "will": 34,
        "hitPoints": 1300,
        "manaPoints": 143,
        "speedText": "12m (8q), voo 48m (32q)",
        "senses": "percepção às cegas (longo), visão no escuro",
        "defensesText": "imunidade a eletricidade, atordoamento, medo, metabolismo, metamorfose e paralisia; redução de dano 20; resistência a magia +4; vulnerabilidade a ácido",
        "attributes": {
            "str": 15,
            "dex": 2,
            "con": 10,
            "int": 6,
            "wis": 10,
            "cha": 7
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +52 (8d12+45, 18) e duas garras +52 (8d12+45, 18)."
        }
    ],
    "abilities": [
        {
            "name": "Bombardeio Celestial",
            "timing": "completa",
            "text": "O dragão celestial cria 6 esferas de essência que ficam flutuando ao seu redor até o fim da cena. Uma vez por rodada, ele pode gastar uma ação de movimento para disparar uma dessas esferas em uma criatura em alcance longo; o alvo sofre 12d6 pontos de dano de essência e é empurrado 6m na direção oposta (Fort CD 49 evita o empurrão). Uma vez por rodada, quando é alvo de um ataque ou habilidade, o dragão pode disparar uma dessas esferas contra o atacante."
        },
        {
            "name": "Magia Acelerada",
            "timing": "livre",
            "cost": "+4 PM",
            "text": "Uma vez por rodada, quando lança uma magia com execução de ação completa ou menor, o dragão celestial muda a execução dela para livre."
        },
        {
            "name": "Presença Celestial",
            "timing": null,
            "text": "A mera visão de um dragão celestial adulto ou mais velho pode fascinar ou amedrontar. Uma criatura que comece seu turno em alcance longo do dragão fica apavorada (se tiver 4 níveis ou menos) ou abalada (se tiver 5 níveis ou mais) até o fim da cena. Criaturas com um código de conduta ou devotos de Khalmyr ou Lin-Wu em vez disso ficam fascinadas, independente de seu nível (Von CD 49 evita em todos os casos). Uma criatura que passe no teste de resistência fica imune a esta habilidade por um dia."
        },
        {
            "name": "Sopro",
            "timing": "padrão",
            "text": "Todas as criaturas em um cone de 18m sofrem 20d12 pontos de dano de eletricidade e ficam ofuscadas por 1d4 rodadas (Ref CD 49 reduz à metade e evita a condição). Recarga (movimento)."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como um clérigo de Lin-Wu de 20º nível (CD 49, limite de PM 30)."
        },
        {
            "name": "Aura Divina",
            "timing": "padrão",
            "cost": "19 PM",
            "text": "O dragão celestial emana uma aura brilhante com 9m de raio até o fim da cena. O dragão e aliados devotos de Lin-Wu na área ficam imunes a encantamento e recebem +12 na Defesa e em testes de resistência; para aliados não devotos de Lin-Wu esse bônus é +7. Inimigos que entrem na área devem fazer um teste de Vontade; em caso de falha, recebem uma condição entre esmorecido, debilitado ou lento até o fim da cena. Esse teste deve ser repetido cada vez que a criatura entra novamente na área."
        },
        {
            "name": "Curar Ferimentos",
            "timing": "padrão",
            "cost": "15 PM",
            "text": "Uma criatura adjacente cura 16d8+16 PV ou criaturas escolhidas em alcance curto curam 11d8+11."
        },
        {
            "name": "Dissipar Magia",
            "timing": "padrão",
            "cost": "3 PM",
            "text": "O dragão escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias nesse alvo com CD igual ou menor que o resultado do teste são dissipadas."
        },
        {
            "name": "Escudo da Fé",
            "timing": "padrão",
            "cost": "25 PM",
            "text": "O dragão recebe camuflagem leve contra ataques à distância e +12 na Defesa por 1 dia."
        },
        {
            "name": "Intervenção Divina",
            "timing": "padrão",
            "cost": "15 PM",
            "text": "O dragão pede para Lin-Wu interceder diretamente. Pode curar todos os PV e condições de até 10 criaturas em alcance longo (este efeito cura mortos-vivos, em vez de causar dano), dissipar os efeitos de qualquer magia de 4º círculo ou menor ou produzir algo ainda mais poderoso; nesse último caso, exige o sacrifício de 2 PM."
        },
        {
            "name": "Katana Celestial",
            "timing": "padrão",
            "cost": "24 PM",
            "text": "O dragão projeta quatro linhas de 30m cada em direções opostas, formando um X a partir dele. Criaturas nessas áreas sofrem 14d8 pontos de dano de luz, ou 14d12 se forem mortos-vivos, e ficam cegas e surdas até o fim da cena (Ref reduz à metade e evita as condições)."
        },
        {
            "name": "Missão Divina",
            "timing": "padrão",
            "cost": "8 PM e penalidade de –1 PM",
            "text": "O dragão inscreve uma marca permanente em uma criatura adjacente. Sempre que o alvo fizer uma ação contrária às obrigações e restrições de Lin-Wu, recebe uma penalidade cumulativa de –2 em todos os testes (Von evita). Uma magia que dissipe outras suprime a marca e suas penalidades por um dia; elas só podem ser totalmente removidas pelo dragão ou pela magia Purificação."
        },
        {
            "name": "Santuário",
            "timing": "padrão",
            "cost": "10 PM",
            "text": "O dragão toca uma criatura. Até o fim da cena, ou até que essa criatura faça uma ação hostil, qualquer criatura que tente fazer uma ação hostil contra ela, ou contra uma área que a inclui, perde a ação (Von evita)."
        },
        {
            "name": "Viagem Planar",
            "timing": "padrão",
            "cost": "12 PM",
            "text": "O dragão e até 5 criaturas voluntárias que ele esteja tocando viajam para outro Plano."
        },
        {
            "name": "Imunidades",
            "timing": null,
            "text": "Dragões celestiais são imunes a efeitos de atordoamento, medo, metabolismo, metamorfose e paralisia."
        },
        {
            "name": "Magia Celestial",
            "timing": null,
            "text": "Dragões celestiais podem lançar magias sem palavras mágicas, gestos, concentração ou componentes materiais."
        },
        {
            "name": "Metamorfose Celestial",
            "timing": "completa",
            "text": "Dragões celestiais podem se transformar em outras criaturas, como a magia Metamorfose, mas sem limitação para tamanhos menores que o seu. Um dragão morto reverte à sua forma original."
        }
    ],
    "equipment": null,
    "treasure": "Dobro.",
    "skillsText": "Conhecimento +25, Diplomacia +27, Intuição +29, Misticismo +25, Religião +29"
};

export const kappaBrigao = {
    "id": "kappa-brigao",
    "name": "Kappa Brigão",
    "type": "spirit",
    "subtype": "kappa",
    "size": "Médio",
    "challengeRating": 1,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 161,
        "bookPage": 159
    },
    "stats": {
        "initiative": 5,
        "perception": 0,
        "defense": 18,
        "fortitude": 5,
        "reflex": 11,
        "will": 0,
        "hitPoints": 30,
        "speedText": "9m (6q), natação 9m (6q)",
        "senses": null,
        "defensesText": "não pode ser flanqueado",
        "attributes": {
            "str": 1,
            "dex": 3,
            "con": 2,
            "int": 0,
            "wis": 0,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Ataque desarmado x2 +9 (1d6+4)."
        }
    ],
    "abilities": [
        {
            "name": "Agarrar Aprimorado",
            "timing": "livre",
            "text": "Ataque desarmado (teste +9)."
        },
        {
            "name": "Carapaça Kappa",
            "timing": null,
            "text": "O kappa brigão recebe cobertura leve quando está caído ou submerso."
        },
        {
            "name": "Cura das Águas",
            "timing": "padrão",
            "text": "Uma vez por cena, o kappa pode lançar Curar Ferimentos para curar 2d8+2 PV de uma criatura. Ele não pode usar esta habilidade se a água de sua cabeça estiver derramada."
        },
        {
            "name": "Tigela D’água",
            "timing": null,
            "text": "Quando falha por 5 ou mais em um teste para evitar ser agarrado, derrubado ou empurrado, o kappa derrama a água de sua cabeça. Ele fica enjoado até encher a tigela novamente, o que exige uma fonte de água e uma ação padrão."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": null
};

export const kappaYokozuna = {
    "id": "kappa-yokozuna",
    "name": "Kappa Yokozuna",
    "type": "spirit",
    "subtype": "kappa",
    "size": "Médio",
    "challengeRating": 3,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 161,
        "bookPage": 159
    },
    "stats": {
        "initiative": 6,
        "perception": 2,
        "defense": 23,
        "fortitude": 9,
        "reflex": 15,
        "will": 3,
        "hitPoints": 105,
        "speedText": "9m (6q), natação 9m (6q)",
        "senses": null,
        "defensesText": "não pode ser flanqueado",
        "attributes": {
            "str": 2,
            "dex": 3,
            "con": 3,
            "int": 0,
            "wis": 1,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Ataque desarmado x2 +14 (1d6+7)."
        }
    ],
    "abilities": [
        {
            "name": "Agarrar Aprimorado",
            "timing": "livre",
            "text": "Ataque desarmado (teste +16). Quando agarra uma criatura, o kappa yokozuna a derruba automaticamente."
        },
        {
            "name": "Carapaça Kappa",
            "timing": null,
            "text": "O kappa recebe cobertura leve quando está caído ou submerso."
        },
        {
            "name": "Cura das Águas",
            "timing": "padrão",
            "text": "Uma vez por cena, o kappa pode lançar Curar Ferimentos para curar 4d8+4 PV de uma criatura. Ele não pode usar esta habilidade se a água de sua cabeça estiver derramada."
        },
        {
            "name": "Golpe Impactante",
            "timing": "livre",
            "text": "Uma criatura atingida por um ataque desarmado do kappa é empurrada 1,5m para cada 5 pontos de dano que sofrer (Fort CD 17 evita)."
        },
        {
            "name": "Tigela D’água",
            "timing": null,
            "text": "Quando falha por 5 ou mais em um teste para evitar ser agarrado, derrubado ou empurrado, o kappa derrama a água de sua cabeça. Ele fica enjoado até encher a tigela novamente, o que exige uma fonte de água e uma ação padrão."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": null
};

export const tenguBandoleiro = {
    "id": "tengu-bandoleiro",
    "name": "Tengu Bandoleiro",
    "type": "spirit",
    "subtype": "tengu",
    "size": "Médio",
    "challengeRating": 6,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 166,
        "bookPage": 164
    },
    "stats": {
        "initiative": 9,
        "perception": 7,
        "defense": 25,
        "fortitude": 12,
        "reflex": 19,
        "will": 5,
        "hitPoints": 51,
        "speedText": "9m (6q), voo 12m (8q)",
        "senses": "visão no escuro",
        "defensesText": null,
        "attributes": {
            "str": 2,
            "dex": 4,
            "con": 1,
            "int": 2,
            "wis": 0,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Katana x2 +25 (2d10+21, 19)."
        }
    ],
    "abilities": [
        {
            "name": "Asas Desorientadoras",
            "timing": null,
            "text": "Se não estiver usando suas asas para voar, o tengu bandoleiro pode fintar como ação de movimento."
        },
        {
            "name": "Ataque Reflexo",
            "timing": "reação",
            "text": "Uma vez por rodada, o tengu pode fazer um ataque corpo a corpo contra um alvo em seu alcance natural que esteja desprevenido ou que se mova voluntariamente para fora desse alcance."
        },
        {
            "name": "Imprevisível como o Vento",
            "timing": null,
            "text": "Uma vez por rodada, quando não está voando e faz um ataque ou uma finta, o tengu pode rolar dois dados e usar o melhor resultado."
        }
    ],
    "equipment": "Katana",
    "treasure": "Padrão.",
    "skillsText": "Acrobacia +9, Enganação +6, Sobrevivência +5"
};

export const unicornio = {
    "id": "unicornio",
    "name": "Unicórnio",
    "type": "spirit",
    "subtype": null,
    "size": "Grande",
    "challengeRating": 4,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 229,
        "bookPage": 227
    },
    "stats": {
        "initiative": 12,
        "perception": 15,
        "defense": 21,
        "fortitude": 4,
        "reflex": 10,
        "will": 16,
        "hitPoints": 99,
        "speedText": "15m (10q)",
        "senses": "faro, visão no escuro",
        "defensesText": "imunidade a encantamento",
        "attributes": {
            "str": 2,
            "dex": 3,
            "con": 4,
            "int": -2,
            "wis": 6,
            "cha": 3
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Chifre +14 (1d8+6, x3) e cascos +14 (2d8+6)."
        }
    ],
    "abilities": [
        {
            "name": "Chifre Mágico",
            "timing": "padrão",
            "text": "O unicórnio toca uma criatura adjacente com seu chifre e usa um dos efeitos a seguir: Curar — a criatura recupera 8d8+8 pontos de vida; Purificar — uma condição negativa ou maldição da criatura é removida; Reviver — a criatura é revivida, desde que tenha morrido há no máximo uma semana.",
            "magical": true
        },
        {
            "name": "Paz Encarnada",
            "timing": null,
            "text": "Um espírito de bondade e pureza, o unicórnio nunca ataca outros seres. Ele pode, entretanto, fazer testes de ataque para se defender de manobras de combate. Se atacar, ele perde sua essência e se torna um espírito amaldiçoado."
        },
        {
            "name": "Presciência",
            "timing": "reação",
            "text": "O unicórnio pressente automaticamente perigos nas proximidades. Quando está em alcance médio de uma criatura hostil ou de uma armadilha, ele faz um teste de Intuição (CD 20). Se passar, conhece a direção e a distância do perigo, além de saber se é uma criatura ou uma armadilha. Se falhar, sabe apenas que existe um perigo na área."
        },
        {
            "name": "Sumir",
            "timing": "padrão",
            "text": "O unicórnio se teletransporta para um ponto qualquer em alcance médio. Ele não precisa ver o destino para usar essa habilidade.",
            "magical": true
        }
    ],
    "equipment": null,
    "treasure": "Chifre de unicórnio (CD 19 para extrair).",
    "skillsText": "Intuição +15"
};

export const demonioDaPolvora = {
    "id": "demonio-da-polvora",
    "name": "Demônio da Pólvora",
    "type": "spirit",
    "subtype": "demônio",
    "size": "Médio",
    "challengeRating": 12,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 257,
        "bookPage": 255
    },
    "stats": {
        "initiative": 23,
        "perception": 12,
        "defense": 42,
        "fortitude": 12,
        "reflex": 26,
        "will": 20,
        "hitPoints": 580,
        "speedText": "9m (6q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a ácido, armas de fogo, frio, fogo, ofuscado e veneno; redução de dano 10",
        "attributes": {
            "str": 3,
            "dex": 9,
            "con": 6,
            "int": 4,
            "wis": 2,
            "cha": 2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +33 (3d4+8)."
        },
        {
            "name": "À Distância",
            "text": "Pistola demoníaca x2 +36 (4d6+30, 15/x3, mais 2d8 contra devotos de deuses que canalizam apenas energia positiva e criaturas que, a critério do mestre, sejam bondosas)."
        }
    ],
    "abilities": [
        {
            "name": "Mestre da Pólvora",
            "timing": null,
            "text": "Quando ataca com uma arma de fogo, o demônio da pólvora ignora cobertura e camuflagem, não sofre a penalidade padrão de –5 em testes de ataque contra oponentes envolvidos em combate corpo a corpo e, quando dispara contra um alvo envolvido na manobra agarrar, sempre ataca o alvo escolhido."
        },
        {
            "name": "Munição Explosiva",
            "timing": null,
            "text": "Na rodada seguinte após atingir um alvo, a munição da pistola demoníaca explode. A vítima perde 6d6 pontos de vida e fica sangrando (Fort CD 33 reduz à metade e evita a condição)."
        }
    ],
    "equipment": "Pistola demoníaca",
    "treasure": "Nenhum.",
    "skillsText": "Enganação +17, Misticismo +14, Ofício (alquimista) +19, Ofício (armeiro) +19, Religião +12"
};

export const totemDaDivinaSerpenteAspectoDeAllihanna = {
    "id": "totem-da-divina-serpente-aspecto-de-allihanna",
    "name": "Totem da Divina Serpente (Aspecto de Allihanna)",
    "type": "spirit",
    "subtype": null,
    "size": "Enorme",
    "challengeRating": 14,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 274,
        "bookPage": 272
    },
    "stats": {
        "initiative": 20,
        "perception": 24,
        "defense": 42,
        "fortitude": 27,
        "reflex": 20,
        "will": 15,
        "hitPoints": 700,
        "manaPoints": 83,
        "speedText": "12m (8q), escalada 9m (6q), natação 9m (6q)",
        "senses": "faro, visão no escuro",
        "defensesText": "imunidade a fogo e veneno; redução de dano 15; resistência a magia +2",
        "attributes": {
            "str": 16,
            "dex": 4,
            "con": 10,
            "int": 2,
            "wis": 8,
            "cha": 8
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Presa de serpente +38 (2d6+23 corte, 16/x3, mais 2d8 fogo), garra +38 (1d10+23, 19, mais 2d8 fogo) e cauda +38 (1d12+23 mais 2d8 fogo)."
        }
    ],
    "abilities": [
        {
            "name": "Agarrar Aprimorado",
            "timing": "livre",
            "text": "Cauda (teste +43)."
        },
        {
            "name": "Aura de Calor",
            "timing": null,
            "text": "O totem da Divina Serpente emana um calor intenso. No início de cada turno do totem, todas as criaturas em um raio de 9m sofrem 4d6+15 pontos de dano de fogo."
        },
        {
            "name": "Chama Divina",
            "timing": null,
            "text": "Cada dado de dano de fogo causado pelo totem aumenta em um passo (já contabilizado)."
        },
        {
            "name": "Constrição",
            "timing": "livre",
            "text": "No início de cada um de seus turnos, o totem causa 4d6+19 pontos de dano de impacto em qualquer criatura que esteja agarrando."
        },
        {
            "name": "Tempestade de Chamas",
            "timing": null,
            "text": "Uma vez por rodada, quando faz um acerto crítico com sua presa de serpente, o totem pode lançar uma magia como uma ação livre."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como um clérigo de Allihanna de 14º nível (CD 40)."
        },
        {
            "name": "Bola de Fogo",
            "timing": "padrão",
            "cost": "9 PM",
            "text": "Uma explosão causa 12d8 pontos de dano de fogo em todas as criaturas e objetos livres numa esfera de 6m em alcance médio (Ref reduz à metade)."
        },
        {
            "name": "Controlar Fogo",
            "timing": "padrão",
            "cost": "3 PM",
            "text": "O totem cria, molda, move ou extingue chamas e emanações de calor."
        },
        {
            "name": "Coluna de Chamas",
            "timing": "padrão",
            "cost": "6 PM",
            "text": "Um pilar de fogo sagrado causa 6d8 pontos de dano de fogo mais 6d6 pontos de dano de luz nas criaturas e objetos livres num cilindro de 3m de raio e 30m de altura em alcance longo (Ref reduz à metade)."
        },
        {
            "name": "Lança Ígnea de Aleph",
            "timing": "padrão",
            "cost": "6 PM",
            "text": "O totem dispara um projétil de magma contra um alvo em alcance médio, que sofre 4d8 pontos de dano de fogo e 4d6 pontos de dano de perfuração e fica em chamas. As chamas causam 2d8 pontos de dano por rodada, em vez do dano normal (Ref reduz à metade e evita a condição)."
        },
        {
            "name": "Muralha Elemental",
            "timing": "padrão",
            "cost": "6 PM, somente fogo",
            "text": "Uma muralha de fogo se eleva da terra. Ela pode ser um muro de até 30m de comprimento e 3m de altura (ou o contrário) ou uma cúpula de 3m de raio."
        }
    ],
    "equipment": "Presa de serpente aumentada",
    "treasure": "Nenhum.",
    "skillsText": "Misticismo +15, Religião +24, Sobrevivência +24"
};

export const totemDeSaranaAspectoDeMarah = {
    "id": "totem-de-sarana-aspecto-de-marah",
    "name": "Totem de Sarana (Aspecto de Marah)",
    "type": "spirit",
    "subtype": null,
    "size": "Grande",
    "challengeRating": 10,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 273,
        "bookPage": 271
    },
    "stats": {
        "initiative": 21,
        "perception": 17,
        "defense": 34,
        "fortitude": 10,
        "reflex": 16,
        "will": 24,
        "hitPoints": 420,
        "manaPoints": 40,
        "speedText": "18m (12q)",
        "senses": "faro, visão no escuro",
        "defensesText": "cura acelerada 10/trevas; imunidade a alquebrado, esmorecido, frustrado e paralisia; redução de dano 10; resistência a magia +2",
        "attributes": {
            "str": 0,
            "dex": 7,
            "con": 5,
            "int": 2,
            "wis": 6,
            "cha": 6
        }
    },
    "actions": [],
    "abilities": [
        {
            "name": "Aura de Sacrifício",
            "timing": "reação",
            "cost": "2 PM",
            "text": "Quando um aliado em um raio de 9m sofre dano, o totem de Sarana sofre esse dano no lugar dele."
        },
        {
            "name": "Chuva Purificadora",
            "timing": "padrão",
            "cost": "3 PM, sustentada",
            "text": "O totem evoca uma chuva que cobre um raio de 9m ao seu redor. No início de cada turno do totem, cada aliado na área recupera 20 PV e perde todas as condições negativas."
        },
        {
            "name": "Placidez",
            "magical": true,
            "timing": null,
            "text": "O totem gera uma aura de paz em um raio de 30m. Qualquer outra criatura dentro da aura que tente realizar uma ação hostil deve fazer um teste de Vontade (CD 32). Se falhar, perde a ação. Se passar, pode agir normalmente, mas perde 1d4 PM ao fim de seu turno. Caso os PM da criatura sejam reduzidos a 0 por esta habilidade, ela fica enfeitiçada e perde a vontade de lutar por um dia."
        },
        {
            "name": "Toque Gentil",
            "timing": "padrão",
            "text": "O totem toca uma criatura adjacente, que perde 2d4 PM (Ref CD 32 evita)."
        },
        {
            "name": "Veloz Como o Vento",
            "timing": null,
            "text": "O totem pode fazer duas ações padrão em cada um de seus turnos. Além disso, quando corre, ele não precisa percorrer uma linha reta, desde que não passe pelo mesmo espaço mais de uma vez."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": "Atletismo +26, Cura +17, Diplomacia +17, Religião +20"
};

export const totemDoPaiDeTudoAspectoDeAzgher = {
    "id": "totem-do-pai-de-tudo-aspecto-de-azgher",
    "name": "Totem do Pai-de-Tudo (Aspecto de Azgher)",
    "type": "spirit",
    "subtype": null,
    "size": "Enorme",
    "challengeRating": 12,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 275,
        "bookPage": 273
    },
    "stats": {
        "initiative": 16,
        "perception": 21,
        "defense": 41,
        "fortitude": 26,
        "reflex": 10,
        "will": 22,
        "hitPoints": 700,
        "speedText": "12m (8q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a cansaço, dano de luz, fogo e trevas; redução de dano 10; resistência a magia +2",
        "attributes": {
            "str": 10,
            "dex": 4,
            "con": 6,
            "int": 1,
            "wis": 6,
            "cha": 6
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Chifre solar x3 +36 (1d12+18 perfuração, 18/x3, mais 1d12 luz e 1d12 fogo)."
        }
    ],
    "abilities": [
        {
            "name": "Força Solar",
            "timing": "reação",
            "text": "Uma vez por rodada, quando o totem do Pai-de-Tudo é alvo de um ataque corpo a corpo, uma de suas estrelas detona e causa 8d6 pontos de dano de luz em um raio de 6m ao seu redor (Ref CD 33 reduz à metade). O totem recupera uma quantidade de PV igual à metade do dano total causado pela explosão."
        },
        {
            "name": "Manto de Estrelas",
            "timing": null,
            "text": "Para cada 100 PV que o totem perde, uma estrela surge ao seu redor, até um máximo de três estrelas. Para cada estrela, o totem recebe +2 em testes de ataque e seus ataques com chifre solar causam +1d8 pontos de dano de luz."
        },
        {
            "name": "Tudo que o Sol Toca",
            "timing": null,
            "text": "O totem emana uma aura de luz e clima ensolarado em um raio de 90m. Dentro desta área, efeitos que alterem o clima são automaticamente anulados ou, se já estiverem ativos, são dissipados. Uma criatura que comece seu turno nessa área fica fatigada ou, se já estiver fatigada, fica exausta (a condição máxima causada por esta habilidade; Fort CD 33 evita)."
        },
        {
            "name": "Vigilância do Pai",
            "timing": null,
            "text": "Enquanto estiver sob a luz do sol, o totem está sob o efeito básico da magia Visão da Verdade."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": "Atletismo +20, Diplomacia +21, Intuição +21, Religião +21"
};

export const totemDoReiTiranoAspectoDeMegalokk = {
    "id": "totem-do-rei-tirano-aspecto-de-megalokk",
    "name": "Totem do Rei-Tirano (Aspecto de Megalokk)",
    "type": "spirit",
    "subtype": null,
    "size": "Colossal",
    "challengeRating": 15,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 275,
        "bookPage": 273
    },
    "stats": {
        "initiative": 16,
        "perception": 17,
        "defense": 50,
        "fortitude": 28,
        "reflex": 22,
        "will": 15,
        "hitPoints": 750,
        "speedText": "15m (10q)",
        "senses": "faro, visão no escuro",
        "defensesText": "cura acelerada 15; imunidade a cansaço; redução de dano 15; resistência a veneno +5",
        "attributes": {
            "str": 16,
            "dex": 1,
            "con": 12,
            "int": -4,
            "wis": 2,
            "cha": -2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +40 (4d20+20, 18) e pisão +40 (4d20+20 impacto, x3)."
        }
    ],
    "abilities": [
        {
            "name": "Agarrar Aprimorado",
            "timing": "livre",
            "text": "Mordida (teste +50)."
        },
        {
            "name": "Engolir",
            "timing": "padrão",
            "text": "No início de cada um dos turnos do totem do Rei-Tirano, a criatura engolida sofre 4d8+8 pontos de dano de impacto mais 4d8+8 pontos de dano de ácido. Ela pode escapar causando um total de 100 pontos de dano a ele (Defesa 20, redução de dano 0)."
        },
        {
            "name": "Pisotear",
            "timing": null,
            "text": "Quando o totem se move, pisoteia qualquer criatura ou estrutura Grande ou menor em seu caminho, causando 4d12+19 pontos de dano de impacto (Ref CD 40 reduz à metade)."
        },
        {
            "name": "Sede de Sangue",
            "timing": null,
            "text": "O totem recebe +5 em testes de ataque e rolagens de dano contra criaturas que tenham sofrido dano na última rodada."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": "Atletismo +30, Intimidação +30"
};

const avatarDeKallyadranochDivine = {
    id: "avatar-de-kallyadranoch-deuses-de-arton",
    name: "Avatar de Kallyadranoch",
    variantOf: "avatar-de-kallyadranoch",
    type: "spirit",
    subtype: "dragão",
    size: "Médio",
    challengeRating: 20,
    role: "solo",
    roleSource: "pdf-review",
    description: [],
    source: {
        book: "Deuses de Arton",
        edition: "1ª edição, maio de 2025 (v1.1)",
        pdfFile: "T20 Deuses de Arton.pdf",
        pdfPage: 173,
        bookPage: 171
    },
    stats: {
        initiative: 20,
        perception: 18,
        defense: 50,
        fortitude: 20,
        reflex: 28,
        will: 35,
        hitPoints: 1405,
        speedText: "9m (6q), voo 18m (16q)",
        senses: "percepção às cegas, visão no escuro",
        defensesText: "imunidade a ácido, atordoamento, cansaço, dano de luz, eletricidade, essência, fogo, frio, metamorfose, paralisia, trevas e veneno, redução de dano 50, resistência a magia +5",
        attributes: {
            str: 13,
            dex: 8,
            con: 12,
            int: 14,
            wis: 6,
            cha: 19
        }
    },
    actions: [
        {
            name: "Corpo a Corpo",
            text: "Mordida +52 (5d12+50, 17/x3) e duas garras +50 (4d10+35, 19/x2)."
        }
    ],
    abilities: [
        {
            name: "Ajoelhem-se Perante Mim",
            "magical": true,
            timing: "padrão",
            text: "Criaturas escolhidas pelo Avatar em alcance curto ficam caídas e não podem agir de forma hostil contra ele por 1 rodada. Com sucesso em Fortitude CD 50, elas sofrem apenas –5 em testes contra o Avatar por 1 rodada."
        },
        {
            name: "Aura Aterradora",
            timing: null,
            text: "Uma criatura que comece seu turno em alcance longo do Avatar fica apavorada (se tiver 4 níveis ou menos) ou abalada (se tiver 5 níveis ou mais) até o fim da cena. Vontade CD 50 evita. Quem passa no teste fica imune a esta habilidade por um dia."
        },
        {
            name: "Cálice",
            timing: "livre",
            text: "Uma vez por rodada, o Avatar ignora todas as penalidades e restrições de uma condição ou efeito."
        },
        {
            name: "Centelha Divina",
            timing: null,
            text: "O Avatar pode lançar qualquer magia arcana como um mago de 20º nível (CD 50, limite de PM 20), sem gastar PM. Uma criatura que falhe na resistência a uma magia dele fica abalada. A condição se acumula e ignora imunidade a medo."
        },
        {
            name: "Majestade Altiva",
            timing: null,
            text: "No início de cada turno do Avatar, todas as criaturas apavoradas em alcance médio ficam fascinadas. Vontade CD 50 evita e deixa a criatura imune a esta habilidade até o fim do dia."
        },
        {
            name: "Metamorfose Dracônica",
            "magical": true,
            timing: "completa",
            text: "O Avatar assume a forma de outra criatura como na magia Metamorfose, sem limitação para tamanhos menores que o seu. Se morrer, volta à forma original."
        },
        {
            name: "Servos de Kallyadranoch",
            "magical": true,
            timing: "livre",
            text: "Uma vez por cena, o Avatar invoca seis capangas dragões campeões em espaços livres em alcance longo, um por tipo de dano entre ácido, eletricidade, fogo, frio, luz e trevas. Eles agem no início da rodada seguinte do Avatar e voam 18m. Com uma ação padrão, cada um pode soprar em um cone de 9m e causar 6d12 pontos de dano de seu tipo. São Grandes, têm For 5, Des 1, 110 PV, Defesa 32, imunidades de dragão e ao dano de seu tipo. Usam os valores do Avatar com –5 em testes opostos e de resistência e desaparecem quando mortos ou ao fim da cena."
        },
        {
            name: "Sopro Supremo",
            timing: "padrão",
            text: "Criaturas em um cone de 30m sofrem 7d12 pontos de dano de cada tipo entre ácido, eletricidade, fogo, frio, luz e trevas (42d12 no total, Ref CD 50 reduz à metade). Cada 12 em um dado de dano acrescenta 1d12 do mesmo tipo. O sopro ignora RD e a imunidade ao tipo de dano o reduz à metade. Recarga (movimento)."
        },
        {
            name: "Tomar Poder",
            "magical": true,
            timing: "padrão",
            text: "O Avatar faz um teste de Misticismo e dissipa magias com CD igual ou inferior ao resultado numa área de 9m de raio em alcance médio. Ele recebe os benefícios das magias que escolher entre as dissipadas por 1d4+1 rodadas."
        }
    ],
    equipment: null,
    treasure: "Triplo.",
    skillsText: "Conhecimento +35, Diplomacia +37, Enganação +37, Intimidação +40, Misticismo +40, Nobreza +40, Ofício (escriba) +35, Religião +27"
};

const nereida = {
    "id": "nereida",
    "name": "Nereida",
    "type": "spirit",
    "subtype": null,
    "size": "Médio",
    "challengeRating": 12,
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "bookPage": 320,
        "pdfPage": 322,
        "bookPageEnd": 321,
        "pdfPageEnd": 323
    },
    "stats": {
        "initiative": 13,
        "perception": 9,
        "defense": 41,
        "fortitude": 20,
        "reflex": 12,
        "will": 26,
        "hitPoints": 412,
        "speedText": "9m (6q), natação 18m (12q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a frio",
        "attributes": {
            "str": 4,
            "dex": 3,
            "con": 2,
            "int": 1,
            "wis": -1,
            "cha": 7
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Duas garras +32 (2d6+12 mais 4d6 frio)."
        }
    ],
    "abilities": [
        {
            "name": "Convocação Marinha",
            "timing": "movimento",
            "text": "A nereida convoca 2d6 redemoinhos em alcance curto. Os redemoinhos agem a partir da próxima rodada dela. Eles têm deslocamento 9m (normal e de natação) e podem gastar uma ação padrão para causar 2d6 pontos de dano de frio em uma criatura adjacente. Os redemoinhos têm For –1, Des 2, Defesa 26, 1 PV e falham automaticamente em qualquer teste de resistência ou oposto. Eles desaparecem quando morrem ou no fim da cena. Recarga (movimento)."
        },
        {
            "name": "Elencar",
            "timing": "movimento",
            "text": "Uma criatura em alcance curto “recebe um papel” entre os listados abaixo. A nereida só pode conceder um papel por criatura e seus efeitos duram 1d4+1 rodadas (Von CD 35 reduz para 1 rodada.) • Coadjuvante. Todo dano causado pela criatura é reduzido à metade. • Par Romântico. A criatura fica enfeitiçada e, sempre que estiver adjacente à nereida, a nereida recebe +5 em testes de perícia e rolagens de dano contra outras criaturas. • Vilão. A criatura sofre +2d6 pontos de dano de frio dos ataques da nereida."
        },
        {
            "name": "Presença Majestosa",
            "timing": null,
            "text": "Qualquer criatura que tente atacar a nereida deve fazer um teste de Vontade (CD 35). Se falhar, não consegue atacá-la e perde a ação. Uma criatura que passe no teste de Vontade não é mais afetada por esta habilidade até o fim da cena."
        },
        {
            "name": "Terror Blindado",
            "timing": "completa",
            "text": "A nereida assume sua forma guerreira até o fim da cena. Ela recebe imunidade a acertos críticos e às condições atordoado, cego, debilitado, enjoado, envenenado, exausto, fatigado, fraco, lento, ofuscado e paralisado. Além disso, no início de cada um de seus turnos, ela causa 4d8 pontos de dano de frio em todas as criaturas adjacentes e cura uma quantidade de PV igual à metade de todo esse dano."
        }
    ],
    "equipment": null,
    "treasure": "2d6 doses de éter elemental (frio) (CD 27 para extrair).",
    "skillsText": "Atuação +19, Diplomacia +19, Intimidação +19.",
    "role": "special",
    "roleSource": "pdf-review"
};

const elementalDoVenenoPequeno = {
    "id": "elemental-do-veneno-pequeno",
    "name": "Elemental do Veneno Pequeno",
    "type": "spirit",
    "subtype": "elemental",
    "size": "Pequeno",
    "challengeRating": 2,
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "bookPage": 328,
        "pdfPage": 330
    },
    "stats": {
        "initiative": 3,
        "perception": 5,
        "defense": 17,
        "fortitude": 13,
        "reflex": 2,
        "will": 7,
        "hitPoints": 49,
        "speedText": "voo 6m (4q)",
        "senses": "percepção às cegas",
        "defensesText": "imunidade a acertos críticos, atordoado, caído, efeitos de metabolismo, paralisia e veneno",
        "attributes": {
            "str": -3,
            "dex": 0,
            "con": 2,
            "int": -3,
            "wis": 2,
            "cha": -4
        }
    },
    "actions": [
        {
            "name": "À Distância",
            "text": "Pústula asquerosa +12 (enjoado por 1d4 rodadas, alcance médio)."
        }
    ],
    "abilities": [
        {
            "name": "Corpo Nocivo",
            "timing": null,
            "text": "Quando o elemental do veneno pequeno sofre dano por um ataque corpo a corpo, o atacante perde 1d6 pontos de vida por veneno, a menos que esteja usando uma arma alongada."
        },
        {
            "name": "Existência Insalubre",
            "timing": null,
            "text": "O elemental ignora imunidade a veneno."
        },
        {
            "name": "Fumos Tóxicos",
            "timing": "livre",
            "text": "Uma vez por rodada, o elemental emite uma nuvem de veneno corrosivo. Criaturas em um raio de 9m ao redor dele perdem 1d12 pontos de vida por veneno e ficam vulneráveis (Fort CD 18 reduz a perda de vida à metade e evita a condição)."
        }
    ],
    "equipment": null,
    "treasure": "1d4 doses de peçonha irritante (CD 17 para extrair).",
    "skillsText": null,
    "role": "solo",
    "roleSource": "pdf-review"
};

const elementalDoVenenoMedio = {
    "id": "elemental-do-veneno-medio",
    "name": "Elemental do Veneno Médio",
    "type": "spirit",
    "subtype": "elemental",
    "size": "Médio",
    "challengeRating": 8,
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "bookPage": 328,
        "pdfPage": 330,
        "bookPageEnd": 329,
        "pdfPageEnd": 331
    },
    "stats": {
        "initiative": 5,
        "perception": 9,
        "defense": 31,
        "fortitude": 21,
        "reflex": 8,
        "will": 15,
        "hitPoints": 280,
        "speedText": "voo 9m (6q)",
        "senses": "percepção às cegas",
        "defensesText": "imunidade a acertos críticos, atordoado, caído, efeitos de metabolismo, paralisia e veneno",
        "attributes": {
            "str": -3,
            "dex": 1,
            "con": 0,
            "int": -2,
            "wis": 1,
            "cha": -4
        }
    },
    "actions": [
        {
            "name": "À Distância",
            "text": "Pústula virulenta +26 (3d6+25 impacto mais veneno)."
        }
    ],
    "abilities": [
        {
            "name": "Corpo Nocivo",
            "timing": null,
            "text": "Quando o elemental do veneno médio sofre dano por um ataque corpo a corpo adjacente, o atacante perde 3d6 pontos de vida por veneno."
        },
        {
            "name": "Existência Insalubre",
            "timing": null,
            "text": "O elemental ignora imunidade a veneno."
        },
        {
            "name": "Veneno",
            "timing": null,
            "text": "Perde 4d12 pontos de vida durante 3 rodadas (Fort CD 28 reduz para 1 rodada)."
        }
    ],
    "equipment": null,
    "treasure": "1d6 doses de peçonha concentrada (CD 23 para extrair).",
    "skillsText": null,
    "role": "solo",
    "roleSource": "pdf-review"
};

const elementalDoVenenoGrande = {
    "id": "elemental-do-veneno-grande",
    "name": "Elemental do Veneno Grande",
    "type": "spirit",
    "subtype": "elemental",
    "size": "Grande",
    "challengeRating": 12,
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "bookPage": 329,
        "pdfPage": 331
    },
    "stats": {
        "initiative": 8,
        "perception": 13,
        "defense": 43,
        "fortitude": 26,
        "reflex": 12,
        "will": 20,
        "hitPoints": 550,
        "speedText": "voo 18m (12q)",
        "senses": "percepção às cegas",
        "defensesText": "incorpóreo, imunidade a acertos críticos, atordoado, caído, efeitos de metabolismo, paralisia e veneno",
        "attributes": {
            "str": -3,
            "dex": 2,
            "con": 0,
            "int": -2,
            "wis": 3,
            "cha": -4
        }
    },
    "actions": [],
    "abilities": [
        {
            "name": "Corpo Nocivo",
            "timing": null,
            "text": "Quando o elemental do veneno grande sofre dano por um ataque corpo a corpo, o atacante perde 6d6 pontos de vida por veneno, a menos que esteja usando uma arma alongada."
        },
        {
            "name": "Existência Insalubre",
            "timing": null,
            "text": "O elemental ignora imunidade a veneno."
        },
        {
            "name": "Morte Gasosa",
            "timing": null,
            "text": "O elemental pode entrar no espaço ocupado por outras criaturas. No fim de cada turno do elemental, quaisquer criaturas em seu espaço perdem 10d12 pontos de vida e ficam exaustas. Veneno."
        },
        {
            "name": "Pústula Explosiva",
            "timing": "reação",
            "text": "Se sofrer 200 pontos de dano ou mais em uma única rodada, o elemental explode numa nuvem de gás de 9m de raio ao seu redor. Criaturas na área perdem 8d12 pontos de vida por veneno durante 5 rodadas (Fort CD 35 reduz a perda à metade). Na rodada seguinte, dois elementais do veneno médios surgem em espaços desocupados na área da explosão (eles não contam para as recompensas do encontro)."
        }
    ],
    "equipment": null,
    "treasure": "1d6 doses de peçonha potente (CD 27 para extrair), 1d6 doses de pó de lich (CD 27 para extrair).",
    "skillsText": null,
    "role": "solo",
    "roleSource": "pdf-review"
};

const aucharai = {
    "id": "aucharai",
    "name": "Aucharai",
    "type": "spirit",
    "subtype": "abissal",
    "size": "Médio",
    "challengeRating": 6,
    "source": {
        "book": "Deuses de Arton",
        "edition": "1ª edição, maio de 2025 (v1.1)",
        "pdfFile": "T20 Deuses de Arton.pdf",
        "bookPage": 253,
        "pdfPage": 255
    },
    "stats": {
        "initiative": 10,
        "perception": 6,
        "defense": 26,
        "fortitude": 8,
        "reflex": 18,
        "will": 10,
        "hitPoints": 240,
        "speedText": "12m (8q)",
        "senses": "visão no escuro",
        "defensesText": "evasão, imunidade a ácido e veneno, redução de dano 5",
        "attributes": {
            "str": 4,
            "dex": 5,
            "con": 2,
            "int": 3,
            "wis": 1,
            "cha": 1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Duas espadas curtas +20 (2d6+18, 19)."
        }
    ],
    "abilities": [
        {
            "name": "Ataque Furtivo",
            "timing": null,
            "text": "+2d6."
        },
        {
            "name": "Detectar Pensamentos",
            "timing": null,
            "text": "O aucharai detecta constantemente os pensamentos superficiais de todas as criaturas inteligentes em alcance curto. Ele não pode ser surpreendido por criaturas cujos pensamentos esteja detectando dessa forma e recebe +2 na Defesa e em testes de perícia contra elas. Uma criatura ciente desta habilidade pode gastar uma ação de movimento e fazer um teste de Vontade (CD 24). Se passar, esconde seus pensamentos até o fim da cena.",
            "magical": true
        },
        {
            "name": "Escurecer Olhos",
            "timing": "padrão",
            "text": "O aucharai invoca uma sombra mística sobre os olhos de uma criatura em alcance curto. A vítima fica cega (Fort CD 24 reduz para 1 rodada). Recarga (movimento).",
            "magical": true
        },
        {
            "name": "Protegido pela Escuridão",
            "timing": null,
            "text": "Se estiver em uma condição de pouca iluminação que forneça camuflagem leve, em vez disso o aucharai recebe camuflagem total."
        },
        {
            "name": "Visão Abissal",
            "timing": null,
            "text": "O aucharai está permanentemente sob efeito da magia Visão Mística com o aprimoramento que permite enxergar criaturas e objetos invisíveis.",
            "magical": true
        }
    ],
    "equipment": null,
    "treasure": "Padrão.",
    "skillsText": "Acrobacia +10, Atletismo +9, Furtividade +15, Ladinagem +8.",
    "role": "solo",
    "roleSource": "pdf-review"
};

const trioDeCarvarel = {
    "id": "trio-de-carvarel",
    "name": "Trio de Carvarel",
    "type": "spirit",
    "subtype": "abissal",
    "size": "Grande",
    "challengeRating": 8,
    "source": {
        "book": "Deuses de Arton",
        "edition": "1ª edição, maio de 2025 (v1.1)",
        "pdfFile": "T20 Deuses de Arton.pdf",
        "bookPage": 253,
        "pdfPage": 255
    },
    "stats": {
        "initiative": 6,
        "perception": 3,
        "defense": 33,
        "fortitude": 19,
        "reflex": 16,
        "will": 15,
        "hitPoints": 305,
        "speedText": "9m (6q)",
        "senses": "faro, visão no escuro",
        "defensesText": "imunidade a ácido e venenos, redução de dano 5, redução de fogo e frio 10",
        "attributes": {
            "str": 5,
            "dex": 3,
            "con": 4,
            "int": -2,
            "wis": 1,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "[Bando] Machado de guerra x2 +26 (1d12+16, x3) ou chifres x2 +26 (2d6+10 impacto)."
        }
    ],
    "abilities": [
        {
            "name": "Marrada Infernal",
            "timing": "completa",
            "text": "O trio de carvarel faz uma investida e desfere todos os seus ataques de machado de guerra e de chifres contra quaisquer criaturas em alcance. Todos os ataques recebem o bônus de +2 da investida, mas o trio não pode fazer mais de dois ataques contra a mesma criatura."
        }
    ],
    "equipment": "Machado de guerra cruel x3.",
    "treasure": "Padrão.",
    "skillsText": "Atletismo +13, Intimidação +9.",
    "role": "solo",
    "roleSource": "pdf-review"
};

const diabrete = {
    "id": "diabrete",
    "name": "Diabrete",
    "type": "spirit",
    "subtype": "abissal",
    "size": "Minúsculo",
    "challengeRating": 2,
    "source": {
        "book": "Deuses de Arton",
        "edition": "1ª edição, maio de 2025 (v1.1)",
        "pdfFile": "T20 Deuses de Arton.pdf",
        "bookPage": 254,
        "pdfPage": 256
    },
    "stats": {
        "initiative": 5,
        "perception": 4,
        "defense": 17,
        "fortitude": 6,
        "reflex": 12,
        "will": 4,
        "hitPoints": 20,
        "speedText": "6m (4q), voo 12m (8q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a ácido e veneno",
        "attributes": {
            "str": -2,
            "dex": 2,
            "con": 0,
            "int": 2,
            "wis": 1,
            "cha": 1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Ferrão +14 (1d6+8 mais veneno)."
        }
    ],
    "abilities": [
        {
            "name": "Peste Invisível",
            "timing": "padrão",
            "text": "O diabrete se torna invisível (como na magia Invisibilidade) até o fim da cena ou até fazer um ataque."
        },
        {
            "name": "Veneno",
            "timing": null,
            "text": "Peçonha comum (perde 1d12 pontos de vida, Fort CD 16 evita)."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": "Furtividade +10, Misticismo +7.",
    "role": "minion",
    "roleSource": "pdf-review"
};

const diabreteNegociante = {
    "id": "diabrete-negociante",
    "name": "Diabrete Negociante",
    "type": "spirit",
    "subtype": "abissal",
    "size": "Pequeno",
    "challengeRating": 4,
    "source": {
        "book": "Deuses de Arton",
        "edition": "1ª edição, maio de 2025 (v1.1)",
        "pdfFile": "T20 Deuses de Arton.pdf",
        "bookPage": 254,
        "pdfPage": 256
    },
    "stats": {
        "initiative": 7,
        "perception": 6,
        "defense": 21,
        "fortitude": 4,
        "reflex": 15,
        "will": 11,
        "hitPoints": 120,
        "speedText": "6m (4q), voo 12m (8q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a ácido e veneno, redução de fogo e frio 5",
        "attributes": {
            "str": 0,
            "dex": 3,
            "con": 0,
            "int": 6,
            "wis": 2,
            "cha": 5
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Martelo de forja +15 (1d8+8, x3) e mordida +15 (1d6+8)."
        }
    ],
    "abilities": [
        {
            "name": "Barganha",
            "timing": null,
            "text": "O diabrete negociante pode conceder um Desejo a uma criatura. Em troca, a criatura dá algo muito importante e imaterial. A lista a seguir contém alguns exemplos de pagamentos, mas o mestre é livre para criar outros (veja o quadro). • Amor. Um dos parceiros do personagem o abandona, e seu limite de parceiros diminui em –1. • Coragem. O personagem falha automaticamente em testes de resistência contra medo e sofre –5 em Iniciativa. • Felicidade. O personagem perde o prazer pela vida; ele não recebe benefícios de itens de alimentação e, independentemente de suas condições de descanso, sua recuperação nunca é melhor que normal. • Juventude. O personagem perde 1 ponto de Constituição e falha automaticamente em testes contra efeitos de cansaço. Alternativamente, se você tiver o suplemento Heróis de Arton, a criatura envelhece uma categoria de idade (veja Capítulo 4: Regras Opcionais), mas não recebe nenhum dos benefícios da nova categoria. As penalidades da troca não podem ser evitadas por outros efeitos, e recuperar o item fabricado a partir do pagamento não desfaz o acordo. Veja o quadro Barganhas, p. 255."
        },
        {
            "name": "Confundir",
            "timing": "padrão",
            "text": "Uma criatura em alcance curto fica confusa (Von CD 18 evita e a criatura fica imune a esta habilidade por um dia). Recarga (movimento)."
        },
        {
            "name": "Risada Enervante",
            "timing": null,
            "text": "Criaturas a até 9m do diabrete sofrem –2 em Intuição e Vontade."
        }
    ],
    "equipment": "Instrumentos de Ofício (armeiro, artesão) aprimorados.",
    "treasure": "Padrão e 1d4-1 itens feitos dos sentimentos de alguém.",
    "skillsText": "Enganação +14, Intuição +11, Ofício (armeiro) +13, Ofício (artesão) +13.",
    "role": "special",
    "roleSource": "pdf-review"
};

const jhumariel = {
    "id": "jhumariel",
    "name": "Jhumariel",
    "type": "spirit",
    "subtype": "abissal",
    "size": "Grande",
    "challengeRating": 10,
    "source": {
        "book": "Deuses de Arton",
        "edition": "1ª edição, maio de 2025 (v1.1)",
        "pdfFile": "T20 Deuses de Arton.pdf",
        "bookPage": 255,
        "pdfPage": 257,
        "bookPageEnd": 256,
        "pdfPageEnd": 258
    },
    "stats": {
        "initiative": 7,
        "perception": 8,
        "defense": 36,
        "fortitude": 22,
        "reflex": 14,
        "will": 12,
        "hitPoints": 400,
        "speedText": "12m (8q)",
        "senses": "faro, visão no escuro",
        "defensesText": "imunidade a ácido, fogo e veneno, redução de dano 10",
        "attributes": {
            "str": 6,
            "dex": 2,
            "con": 6,
            "int": 2,
            "wis": 1,
            "cha": -2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Duas garras +29 (2d8+20, 19) e mordida ácida +29 (2d6+14 mais 2d6 ácido)."
        }
    ],
    "abilities": [
        {
            "name": "Cuspe",
            "timing": "padrão",
            "text": "O jhumariel cospe saliva ácida em uma criatura em alcance curto. A vítima sofre 8d8 pontos de dano de ácido e fica coberta por muco corrosivo que causa 4d8 pontos de dano de ácido no início de cada um dos seus dois próximos turnos (Ref CD 30 reduz à metade e evita o muco). Recarga (movimento)."
        },
        {
            "name": "Dilacerar",
            "timing": null,
            "text": "Se o jhumariel acerta os dois ataques de garra em uma mesma criatura no mesmo turno, causa mais 4d6+4 pontos de dano."
        },
        {
            "name": "Invocar Carvarel",
            "timing": "completa",
            "text": "Uma vez por cena, o jhumariel invoca 1d3+1 carvarel (veja guerreiro de chifres, em Tormenta20, p. 287). Eles surgem em alcance curto e agem a partir da próxima rodada, em suas iniciativas."
        },
        {
            "name": "Mau Cheiro",
            "timing": "padrão",
            "text": "O jhumariel expele um gás fétido. Todas as criaturas em alcance curto ficam enjoadas por 1d6 rodadas (Fort CD 30 evita). Uma criatura que passe no teste de resistência fica imune a esta habilidade por um dia. Veneno."
        }
    ],
    "equipment": null,
    "treasure": "Padrão mais 1d4 doses de saliva ácida (CD 30 para extrair, veja quadro).",
    "skillsText": "Atletismo +15 (+25 para saltar), Intimidação +15.",
    "role": "solo",
    "roleSource": "pdf-review"
};

const margharon = {
    "id": "margharon",
    "name": "Margharon",
    "type": "spirit",
    "subtype": "abissal",
    "size": "Enorme",
    "challengeRating": 14,
    "source": {
        "book": "Deuses de Arton",
        "edition": "1ª edição, maio de 2025 (v1.1)",
        "pdfFile": "T20 Deuses de Arton.pdf",
        "bookPage": 256,
        "pdfPage": 258
    },
    "stats": {
        "initiative": 9,
        "perception": 12,
        "defense": 44,
        "fortitude": 28,
        "reflex": 14,
        "will": 22,
        "hitPoints": 490,
        "speedText": "9m (6q)",
        "senses": "visão no escuro",
        "defensesText": "fortificação 50%, imunidade a ácido, atordoamento, eletricidade e veneno, redução de dano 20, resistência a magia +4",
        "attributes": {
            "str": 5,
            "dex": 0,
            "con": 4,
            "int": 6,
            "wis": 3,
            "cha": 6
        },
        "manaPoints": 70
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Quatro tentáculos +37 (2d8+28) e mordida +37 (2d6+22)."
        }
    ],
    "abilities": [
        {
            "name": "Agarrar Aprimorado",
            "timing": null,
            "text": "Tentáculo (teste +39)."
        },
        {
            "name": "Magia Acelerada",
            "timing": "livre",
            "text": "Uma vez por rodada, quando lança uma magia com execução de ação completa ou menor, o margharon muda a execução dela para livre.",
            "cost": "+4 PM"
        },
        {
            "name": "Mudar Forma",
            "timing": "padrão",
            "text": "O margharon assume a forma de qualquer humanoide de tamanho Pequeno a Enorme, como o efeito da magia Metamorfose. Ele pode permanecer na forma escolhida por tempo indeterminado, mas, se morrer, reverte à forma natural.",
            "magical": true
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como um feiticeiro de 14º nível (CD 40)."
        },
        {
            "name": "Dissipar Magia",
            "timing": "padrão",
            "text": "O margharon escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias nesse alvo com CD igual ou menor que o resultado do teste são dissipadas.",
            "cost": "3 PM"
        },
        {
            "name": "Muralha Elemental",
            "timing": "padrão",
            "text": "Uma muralha de fogo de até 30m de comprimento e 3m de altura se eleva da terra, em alcance médio. Um lado da muralha emite ondas de calor, que causam 2d8 pontos de dano de fogo em criaturas a até 6m quando a magia é lançada e no início dos turnos do margharon. Atravessar a muralha causa 16d6 pontos de dano de fogo.",
            "cost": "14 PM"
        },
        {
            "name": "Relâmpago",
            "timing": "padrão",
            "text": "O margharon lança um relâmpago em cada criatura escolhida em alcance médio, causando 12d6 pontos de dano de eletricidade (Ref reduz à metade).",
            "cost": "12 PM"
        },
        {
            "name": "Teletransporte",
            "timing": "padrão",
            "text": "O margharon se teleporta para um lugar a sua escolha a até 1.000 km. Ele precisa passar em um teste de Misticismo (CD 20 para lugares que visita com frequência, CD 30 para lugares em que ele já esteve ao menos uma vez ou CD 40 para lugares onde nunca esteve). Se falhar no teste, surge a 1d10 x 10 km afastado em qualquer direção e, se rolar 1 natural, fica atordoado por 1d4 rodadas.",
            "cost": "6 PM"
        },
        {
            "name": "Contrato Infernal",
            "timing": null,
            "text": "Quem assina o contrato sofre a Maldição da Mortalidade. Dano físico deixa a vítima sangrando, e o sangramento só acaba após recuperar pelo menos 30 PV por cura mágica. Se a vítima morrer, sua alma fica sob controle do margharon. Destruir o margharon é o único meio de remover a maldição ou libertar a alma. Um teste de Intuição CD 40 antes de assinar revela a armadilha (p. 257)."
        }
    ],
    "equipment": null,
    "treasure": "Padrão.",
    "skillsText": "Diplomacia +17, Enganação +22, Misticismo +19, Intimidação +17, Intuição +16, Investigação +17.",
    "role": "special",
    "roleSource": "pdf-review"
};

const rhayrivel = {
    "id": "rhayrivel",
    "name": "Rhayrivel",
    "type": "spirit",
    "subtype": "abissal",
    "size": "Médio",
    "challengeRating": 7,
    "source": {
        "book": "Deuses de Arton",
        "edition": "1ª edição, maio de 2025 (v1.1)",
        "pdfFile": "T20 Deuses de Arton.pdf",
        "bookPage": 258,
        "pdfPage": 260
    },
    "stats": {
        "initiative": 9,
        "perception": 7,
        "defense": 31,
        "fortitude": 19,
        "reflex": 15,
        "will": 7,
        "hitPoints": 280,
        "speedText": "9m (6q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a ácido e veneno, redução de dano 5, redução de fogo e frio 10",
        "attributes": {
            "str": 6,
            "dex": 2,
            "con": 4,
            "int": 1,
            "wis": 0,
            "cha": -2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Duas cimitarras +24 (2d8+20, 18)."
        }
    ],
    "abilities": [
        {
            "name": "Correntes Farpadas",
            "timing": "padrão",
            "text": "O rhayrivel projeta suas correntes contra uma criatura em alcance curto. A vítima sofre 3d6+26 pontos de dano de corte e é acometida por uma dor profunda, que causa uma penalidade de –5 em testes de perícia até o fim da cena (Fort CD 24 reduz à metade e evita a dor e a penalidade). Um efeito capaz de remover uma condição de fadiga remove a dor e a penalidade."
        },
        {
            "name": "Sadismo",
            "timing": null,
            "text": "O rhayrivel recebe +5 em testes de ataque e rolagens de dano contra criaturas que estejam sangrando."
        },
        {
            "name": "Talho Atroz",
            "timing": null,
            "text": "Uma criatura atingida por um ataque de cimitarra do rhayrivel fica sangrando (Fort CD 24 evita)."
        }
    ],
    "equipment": null,
    "treasure": "Padrão.",
    "skillsText": "Intimidação +14.",
    "role": "solo",
    "roleSource": "pdf-review"
};

const sucubo = {
    "id": "sucubo",
    "name": "Súcubo",
    "type": "spirit",
    "subtype": "abissal",
    "size": "Médio",
    "challengeRating": 5,
    "source": {
        "book": "Deuses de Arton",
        "edition": "1ª edição, maio de 2025 (v1.1)",
        "pdfFile": "T20 Deuses de Arton.pdf",
        "bookPage": 259,
        "pdfPage": 261
    },
    "stats": {
        "initiative": 7,
        "perception": 6,
        "defense": 21,
        "fortitude": 5,
        "reflex": 11,
        "will": 17,
        "hitPoints": 140,
        "speedText": "9m (6q), voo 15m (10q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a ácido, encantamento e veneno, redução de fogo, frio e trevas 10, vulnerabilidade a luz",
        "attributes": {
            "str": -1,
            "dex": 3,
            "con": 2,
            "int": 3,
            "wis": 2,
            "cha": 10
        },
        "manaPoints": 30
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Duas garras +15 (2d4+10, 19)."
        }
    ],
    "abilities": [
        {
            "name": "Beijo Drenante",
            "timing": "padrão",
            "text": "O súcubo beija uma criatura adjacente, que fica enfeitiçada e frustrada (Von CD 22 evita). Falhas consecutivas na mesma cena se acumulam: na segunda, a criatura fica esmorecida; na terceira, fica inconsciente. Por fim, na quarta falha, a vítima morre e o súcubo recupera 6d6 PM."
        },
        {
            "name": "Desejo Encarnado",
            "timing": null,
            "text": "Quando faz um teste de uma perícia baseada em Carisma, o súcubo rola dois dados e usa o melhor resultado."
        },
        {
            "name": "Mudar Forma",
            "timing": "padrão",
            "text": "O súcubo assume a forma de qualquer humanoide de tamanho Pequeno a Grande, como o efeito da magia Metamorfose. Ele pode permanecer na forma escolhida por tempo indeterminado, mas, se morrer, reverte à forma natural.",
            "magical": true
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como um feiticeiro de 7º nível (CD 22, 24 para encantamento*)."
        },
        {
            "name": "Enfeitiçar*",
            "timing": "padrão",
            "text": "Um espírito, humanoide ou monstro em alcance curto fica enfeitiçado (Von evita).",
            "cost": "6 PM"
        },
        {
            "name": "Imagem Espelhada",
            "timing": "padrão",
            "text": "O súcubo cria cinco cópias ilusórias de si mesmo que fornecem +10 na Defesa. Cada vez que um ataque erra o súcubo, uma das imagens desaparece e o bônus na Defesa diminui em 2.",
            "cost": "5 PM"
        },
        {
            "name": "Marca da Obediência*",
            "timing": "padrão",
            "text": "O súcubo ordena que uma criatura adjacente não ataque-o ou seus aliados até o fim da cena (Von evita). A criatura pode repetir o teste de Vontade em cada um de seus turnos subsequentes.",
            "cost": "3 PM"
        },
        {
            "name": "Sono*",
            "timing": "padrão",
            "text": "Uma criatura em alcance curto fica exausta por 1d4+1 rodadas, depois fatigada (Von muda para fatigado por 1d4 rodadas).",
            "cost": "1 PM"
        }
    ],
    "equipment": "Nenhum.",
    "treasure": "Padrão.",
    "skillsText": "Atuação +19, Diplomacia +19, Enganação +19, Intuição +6.",
    "role": "special",
    "roleSource": "pdf-review"
};

const abahddon = {
    "id": "abahddon",
    "name": "Abahddon",
    "type": "spirit",
    "subtype": "abissal",
    "size": "Grande",
    "challengeRating": "S",
    "source": {
        "book": "Deuses de Arton",
        "edition": "1ª edição, maio de 2025 (v1.1)",
        "pdfFile": "T20 Deuses de Arton.pdf",
        "bookPage": 260,
        "pdfPage": 262,
        "bookPageEnd": 261,
        "pdfPageEnd": 263
    },
    "stats": {
        "initiative": 19,
        "perception": 22,
        "defense": 64,
        "fortitude": 29,
        "reflex": 21,
        "will": 36,
        "hitPoints": 2555,
        "speedText": "12m (8q), voo 18m (12q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a ácido, adivinhação, efeitos mentais, fogo e veneno, maior que a morte, redução de dano 20/luz, resistência a magia +5",
        "attributes": {
            "str": 8,
            "dex": 3,
            "con": 5,
            "int": 16,
            "wis": 6,
            "cha": 12
        },
        "manaPoints": 156
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Kazidhaan +64 (6d12+92, 19, mais 2d8 contra devotos de deuses que canalizam apenas energia positiva e criaturas que, a critério do mestre, sejam bondosas), mordida +58 (8d6+44) e cauda +58 (8d8+36 corte)."
        }
    ],
    "abilities": [
        {
            "name": "Agarrar Aprimorado",
            "timing": "livre",
            "text": "Cauda (teste + 60)."
        },
        {
            "name": "Concentração Abissal",
            "timing": null,
            "text": "Abahddon pode lançar magias mesmo com as mãos presas ou amordaçado (como se estivesse sob efeito do poder Magia Discreta) e, quando faz um teste de Vontade para concentração, rola dois dados e usa o melhor resultado."
        },
        {
            "name": "Constrição",
            "timing": "livre",
            "text": "No início de cada um de seus turnos, Abahddon causa 8d8+36 pontos de dano de impacto em qualquer criatura que esteja agarrando."
        },
        {
            "name": "Dádiva Abissal",
            "timing": "completa",
            "text": "Abahddon transfere uma fração de seu poder para outra criatura em alcance curto. Essa criatura pode escolher um dos benefícios a seguir. Uma mesma criatura só pode receber uma dádiva de Abahddon. • A criatura aprende e pode lançar uma magia de até 3º círculo (atributo-chave Carisma). • Um atributo da criatura, à escolha dela, aumenta em +1. • A criatura recebe um poder qualquer (exceto concedido ou da Tormenta), cujos pré-requisitos cumpra."
        },
        {
            "name": "Pacto Maculado",
            "timing": "movimento",
            "text": "Uma criatura em alcance médio ouve “conselhos” de uma voz suave; comandos simples como “vá até aquele lugar”, “solte esse item” etc. A cada vez que segue um desses conselhos, a criatura recebe +2 em rolagens de dano por 1 rodada e 2 PM temporários."
        },
        {
            "name": "Por Trás das Cortinas",
            "timing": null,
            "text": "Quando faz um teste de Diplomacia, Enganação, Intimidação, Intuição ou Percepção, Abahddon rola dois dados e usa o melhor resultado."
        },
        {
            "name": "Preço do Pacto",
            "timing": null,
            "text": "Quando Abahddon usa Desejo, Dádiva Abissal ou Pacto Maculado para conceder um efeito benéfico a uma criatura, essa criatura sofre uma penalidade cumulativa de –5 em testes de perícia e rolagens de dano contra Abahddon. A penalidade tem a mesma duração que o efeito benéfico correspondente."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como um conjurador arcano de 20º nível (CD 51, limite de PM 36)."
        },
        {
            "name": "Chuva de Meteoros",
            "timing": "completa",
            "text": "Meteoros caem em um quadrado de 36m em alcance longo. Criaturas na área sofrem 15d6 pontos de dano de impacto, 15d6 pontos de dano de fogo e ficam caídas e presas (agarradas) sob os escombros (Ref reduz o dano à metade e evita a condição; veja Tormenta20, p. 183).",
            "cost": "15 PM"
        },
        {
            "name": "Desejo",
            "timing": "padrão",
            "text": "Abahddon molda a realidade a sua vontade. Ele pode dissipar os efeitos de qualquer magia de 4º círculo ou menor, transportar até 10 criaturas voluntárias em alcance longo para qualquer outro plano ou fazer algo ainda mais poderoso (nesse caso, exige o sacrifício de 2 PM).",
            "cost": "15 PM"
        },
        {
            "name": "Desespero Esmagador",
            "timing": "padrão",
            "text": "Criaturas num cone de 6m ficam debilitadas e esmorecidas (Von reduz para 1 rodada).",
            "cost": "8 PM"
        },
        {
            "name": "Dissipar Magia",
            "timing": "padrão",
            "text": "Abahddon escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias nesse alvo com CD igual ou menor que o resultado do teste são dissipadas.",
            "cost": "3 PM"
        },
        {
            "name": "Legião",
            "timing": "padrão",
            "text": "Até 10 criaturas em alcance médio obedecem cegamente aos comandos de Abahddon, exceto ordens claramente suicidas. Uma criatura tem direito a um teste de Vontade no fim de cada um de seus turnos para se livrar do efeito. Criaturas que passem no teste ficam abaladas por 1 rodada enquanto recuperam a consciência.",
            "cost": "15 PM, sustentada"
        },
        {
            "name": "Marionete",
            "timing": "padrão",
            "text": "Abahddon controla as ações físicas de uma criatura em alcance médio. Ao sofrer a magia, e no início de cada um de seus turnos, a vítima faz um teste de Fortitude. Se passar, a magia é anulada.",
            "cost": "10 PM, sustentada"
        },
        {
            "name": "Rogar Maldição",
            "timing": "padrão",
            "text": "Uma criatura em alcance curto fica esmorecida e não pode se comunicar ou lançar magias permanentemente (Fort evita).",
            "cost": "10 PM"
        },
        {
            "name": "Maior que a Morte",
            "timing": null,
            "text": "Enquanto tiver pelo menos metade dos PV, é imune a efeitos de morte instantânea, inclusive os que aprisionam ou destroem seu corpo ou alma. Dano ou perda de PV ainda pode reduzi-lo a 0 PV ou menos."
        }
    ],
    "equipment": "Kazidhaan.",
    "treasure": "Triplo.",
    "skillsText": "Atletismo +24, Diplomacia +33, Enganação +38, Intimidação +33, Intuição +27, Misticismo +32.",
    "role": "solo",
    "roleSource": "pdf-review"
};

const lamashtu = {
    "id": "lamashtu",
    "name": "Lamashtu",
    "type": "spirit",
    "subtype": "abissal",
    "size": "Grande",
    "challengeRating": "S",
    "source": {
        "book": "Deuses de Arton",
        "edition": "1ª edição, maio de 2025 (v1.1)",
        "pdfFile": "T20 Deuses de Arton.pdf",
        "bookPage": 263,
        "pdfPage": 265
    },
    "stats": {
        "initiative": 23,
        "perception": 21,
        "defense": 65,
        "fortitude": 36,
        "reflex": 28,
        "will": 24,
        "hitPoints": 2500,
        "speedText": "12m (8q)",
        "senses": "visão no escuro",
        "defensesText": "evasão aprimorada, imunidade a ácido, fogo e medo, maior que a morte, redução de dano 30",
        "attributes": {
            "str": 18,
            "dex": 6,
            "con": 16,
            "int": 6,
            "wis": 4,
            "cha": 10
        },
        "manaPoints": 126
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Cimitarra energética +58 (6d6+62, 18/x3), martelo de guerra lancinante +58 (3d8+52, x3), mangual magnífico +58 (4d8+48), espada longa anticriatura +58 (3d8+52, 19), tridente venenoso +58 (3d6+55) e espada bastarda sanguinária +58 (3d10+48, 19)."
        }
    ],
    "abilities": [
        {
            "name": "Arsenal Demoníaco",
            "timing": null,
            "text": "Lamashtu possui uma variedade de armas encantadas. Atualmente, ela usa os itens descritos acima (encantos não contabilizados), mas eles podem ser substituídos por quaisquer outras armas mágicas, a critério do mestre."
        },
        {
            "name": "Ataque Mágico",
            "timing": "livre",
            "text": "Uma vez por rodada, quando usa a ação agredir, Lamashtu lança uma magia com tempo de execução de ação padrão ou menor no lugar de um de seus ataques corpo a corpo."
        },
        {
            "name": "Furacão de Lâminas",
            "timing": "reação",
            "text": "Quando erra um ataque corpo a corpo, Lamashtu pode repetir esse ataque contra outra criatura ao seu alcance. Recarga (movimento)."
        },
        {
            "name": "Investida Implacável",
            "timing": null,
            "text": "Quando faz uma investida, Lamashtu causa +1d10 pontos de dano de fogo e pode continuar se movimentando depois do ataque."
        },
        {
            "name": "Invocar Jhumariel",
            "timing": "completa",
            "text": "Uma vez por cena, Lamashtu invoca 1d6+1 jhumariel. Eles surgem em espaços vazios em alcance curto e agem a partir da próxima rodada, em suas iniciativas."
        },
        {
            "name": "Superioridade em Batalha",
            "timing": null,
            "text": "Lamashtu é imune a manobras de combate e não pode ser flanqueada. Além disso, seus ataques ignoram redução de dano."
        },
        {
            "name": "Tenacidade Sulfúrica",
            "timing": null,
            "text": "Quando faz um ataque corpo a corpo que reduz os pontos de vida de um alvo a 0 ou menos, Lamashtu recupera uma quantidade de PV igual ao dano causado."
        },
        {
            "name": "Visão Perfeita",
            "timing": null,
            "text": "Lamashtu está sempre sob efeito de Visão da Verdade, com todos os aprimoramentos.",
            "magical": true
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como uma conjuradora arcana de 20º nível (CD 51)."
        },
        {
            "name": "Assassino Fantasmagórico",
            "timing": "padrão",
            "text": "Um espectro surge adjacente a Lamashtu, e um alvo em alcance médio deve fazer um teste de Vontade. Se ele passar, o espectro é dissipado. Se falhar, ele acredita na existência do espectro, que se move 18m por rodada ao final do seu turno, em direção à vítima. Se o espectro terminar seu turno adjacente à vítima, ela deve fazer um teste de Fortitude. Se passar, sofre 6d6 pontos de dano de trevas (esse dano não pode reduzir o alvo a menos de 0 PV e não o deixa sangrando). Se falhar, sofre um colapso, ficando imediatamente com –1 PV e sangrando.",
            "cost": "10 PM"
        },
        {
            "name": "Bola de Fogo",
            "timing": "padrão",
            "text": "Uma explosão causa 22d6 pontos de dano de fogo em todas as criaturas e objetos livres numa esfera de 6m em alcance médio (Ref reduz à metade).",
            "cost": "19 PM"
        },
        {
            "name": "Ferver Sangue",
            "timing": "padrão",
            "text": "Lamashtu faz o sangue de criaturas escolhidas em alcance curto aquecer até entrar em ebulição. Quando a magia é lançada, e no início de cada um de seus turnos, os alvos sofrem 7d8 pontos de dano de fogo e ficam enjoados por 1 rodada (Fort reduz à metade e evita a condição). Se um alvo passar em dois testes de Fortitude seguidos, dissipa a magia. Se um alvo for reduzido a 0 PV pelo dano desta magia, seu corpo explode, matando-o e causando 6d6 pontos de dano de fogo em todas as criaturas a até 3m (Ref reduz à metade). Não afeta criaturas sem sangue, como construtos ou mortos-vivos.",
            "cost": "20 PM, sustentada"
        },
        {
            "name": "Perdição",
            "timing": "padrão",
            "text": "Criaturas escolhidas em alcance curto sofrem –5 em testes de ataque e rolagens de dano até o fim da cena.",
            "cost": "9 PM"
        },
        {
            "name": "Teletransporte",
            "timing": "padrão",
            "text": "Lamashtu se teleporta para um lugar a sua escolha a até 1.000 km. Ela precisa passar em um teste de Misticismo (CD 20 para lugares que visita com frequência, CD 30 para lugares em que ele já esteve ao menos uma vez ou CD 40 para lugares onde nunca esteve). Se falhar no teste, surge 1d10 x 10 km afastada em qualquer direção e, se rolar 1 natural, fica atordoada por 1d4 rodadas.",
            "cost": "6 PM"
        },
        {
            "name": "Toque da Morte",
            "timing": "padrão",
            "text": "Uma criatura em alcance curto sofre 10d8+10 pontos de dano de trevas. Se estiver com menos da metade de seus PV, em vez disso, deve fazer um teste de Fortitude. Se passar, sofre o dano normal. Se falhar, seus PV são reduzidos a –10.",
            "cost": "17 PM"
        },
        {
            "name": "Maior que a Morte",
            "timing": null,
            "text": "Enquanto tiver pelo menos metade dos PV, é imune a efeitos de morte instantânea, inclusive os que aprisionam ou destroem seu corpo ou alma. Dano ou perda de PV ainda pode reduzi-lo a 0 PV ou menos."
        }
    ],
    "equipment": "Cimitarra energética, espada bastarda sanguinária, espada longa anticriatura, mangual magnífico, martelo de guerra lancinante, tridente venenoso.",
    "treasure": "Triplo.",
    "skillsText": "Acrobacia +22, Enganação +28, Guerra +27, Intimidação +28, Intuição +22, Misticismo +24.",
    "role": "solo",
    "roleSource": "pdf-review"
};

const pilly = {
    "id": "pilly",
    "name": "Pilly",
    "type": "spirit",
    "subtype": "celestial",
    "size": "Minúsculo",
    "challengeRating": 3,
    "source": {
        "book": "Deuses de Arton",
        "edition": "1ª edição, maio de 2025 (v1.1)",
        "pdfFile": "T20 Deuses de Arton.pdf",
        "bookPage": 274,
        "pdfPage": 276,
        "bookPageEnd": 275,
        "pdfPageEnd": 277
    },
    "stats": {
        "initiative": 7,
        "perception": 3,
        "defense": 18,
        "fortitude": 8,
        "reflex": 14,
        "will": 5,
        "hitPoints": 22,
        "speedText": "Voo 18m (12q)",
        "senses": "visão no escuro",
        "defensesText": null,
        "attributes": {
            "str": -3,
            "dex": 4,
            "con": -1,
            "int": 1,
            "wis": 0,
            "cha": 3
        }
    },
    "actions": [],
    "abilities": [
        {
            "name": "Raio Iridescente",
            "timing": "padrão",
            "text": "O pilly dispara um raio colorido em criaturas em alcance médio a sua escolha. Cada criatura sofre 2d4+6 pontos de dano de eletricidade (Ref CD 18 reduz à metade)."
        },
        {
            "name": "Sono Tranquilo",
            "timing": "padrão",
            "text": "O pilly emana um pó fino de suas asas, que cobre um raio de 9m. Criaturas à escolha dele nessa área ficam inconscientes e caídas (Fort CD 18 reduz para exaustas por 1d4 rodadas). Cansaço."
        },
        {
            "name": "Velocidade Celestial",
            "timing": "livre",
            "text": "O pilly aumenta seu deslocamento para 24m por 1 rodada, mas nesse turno só pode executar ações de movimento. Ele só pode usar esta habilidade no início do seu turno."
        }
    ],
    "equipment": null,
    "treasure": "Metade.",
    "skillsText": "Acrobacia +9, Conhecimento +6, Diplomacia +8.",
    "role": "minion",
    "roleSource": "pdf-review"
};

const protetor = {
    "id": "protetor",
    "name": "Protetor",
    "type": "spirit",
    "subtype": "celestial",
    "size": "Médio",
    "challengeRating": 7,
    "source": {
        "book": "Deuses de Arton",
        "edition": "1ª edição, maio de 2025 (v1.1)",
        "pdfFile": "T20 Deuses de Arton.pdf",
        "bookPage": 276,
        "pdfPage": 278
    },
    "stats": {
        "initiative": 9,
        "perception": 10,
        "defense": 32,
        "fortitude": 18,
        "reflex": 9,
        "will": 14,
        "hitPoints": 280,
        "speedText": "9m (6q), voo 18m (12q)",
        "senses": "visão no escuro",
        "defensesText": "redução de dano 10, resistência a magia +3",
        "attributes": {
            "str": 5,
            "dex": 2,
            "con": 4,
            "int": 1,
            "wis": 3,
            "cha": 4
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Maça +24 (2d8+20, 19, mais 4d6+10 luz)."
        }
    ],
    "abilities": [
        {
            "name": "Aura Protetora",
            "timing": "movimento",
            "text": "Aliados do protetor em alcance curto recebem +2 na Defesa e em testes de resistência até o fim da cena.",
            "magical": true
        },
        {
            "name": "Rasante",
            "timing": null,
            "text": "Quando um protetor executa uma investida voando contra um inimigo no solo, seu ataque causa +4d6 pontos de dano de luz."
        },
        {
            "name": "Voo em Formação",
            "timing": null,
            "text": "Se dois ou mais protetores estiverem voando e adjacentes entre si, cada um deles recebe +2 em testes de ataque e na Defesa e não pode ser flanqueado."
        }
    ],
    "equipment": "Escudo pesado, maça banhada a ouro.",
    "treasure": "Padrão.",
    "skillsText": "Diplomacia +13, Intuição +12, Religião +12.",
    "role": "solo",
    "roleSource": "pdf-review"
};

const shiradi = {
    "id": "shiradi",
    "name": "Shiradi",
    "type": "spirit",
    "subtype": "celestial",
    "size": "Grande",
    "challengeRating": 7,
    "source": {
        "book": "Deuses de Arton",
        "edition": "1ª edição, maio de 2025 (v1.1)",
        "pdfFile": "T20 Deuses de Arton.pdf",
        "bookPage": 277,
        "pdfPage": 279
    },
    "stats": {
        "initiative": 8,
        "perception": 10,
        "defense": 29,
        "fortitude": 14,
        "reflex": 19,
        "will": 7,
        "hitPoints": 299,
        "speedText": "9m (6q), voo 15m (10q)",
        "senses": "faro, visão no escuro",
        "defensesText": "evasão aprimorada, imunidade a efeitos de metabolismo e de movimento e surpreendido, redução de dano 10",
        "attributes": {
            "str": 4,
            "dex": 3,
            "con": 4,
            "int": 2,
            "wis": 1,
            "cha": 6
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Garras x2 +26 (2d12+18, 19)."
        }
    ],
    "abilities": [
        {
            "name": "Brincar com a Comida",
            "timing": "padrão",
            "text": "O shiradi faz dois ataques de garra contra uma criatura. Esses ataques causam dano não letal e, se ambos acertarem, a criatura é arremessada 6m em uma direção à escolha do shiradi e fica confusa por 1 rodada (Fort CD 24 reduz o arremesso para 3m e evita a condição)."
        },
        {
            "name": "Entrada Majestosa",
            "timing": null,
            "text": "Quando uma criatura vê o shiradi pela primeira vez na cena, fica fascinada por 1d4+1 rodadas (Von CD 24 reduz para 1 rodada)."
        },
        {
            "name": "Presença Libertadora",
            "timing": null,
            "text": "Criaturas em alcance curto do shiradi recebem +5 em testes contra efeitos de movimento."
        },
        {
            "name": "Rugido Divino",
            "timing": "padrão",
            "text": "Criaturas em alcance curto do shiradi ficam apavoradas por 1d4 rodadas e depois abaladas (Von CD 24 reduz para abaladas por 1d4+1 rodadas). Recarga (movimento)."
        }
    ],
    "equipment": "Símbolo sagrado de Valkaria.",
    "treasure": "Nenhum.",
    "skillsText": "Atuação +13 (+23 em locais elevados), Furtividade +12, Investigação +9, Intimidação +13.",
    "role": "solo",
    "roleSource": "pdf-review"
};

const pegaso = {
    "id": "pegaso",
    "name": "Pégaso",
    "type": "spirit",
    "subtype": null,
    "size": "Grande",
    "challengeRating": 3,
    "source": {
        "book": "Deuses de Arton",
        "edition": "1ª edição, maio de 2025 (v1.1)",
        "pdfFile": "T20 Deuses de Arton.pdf",
        "bookPage": 280,
        "pdfPage": 282
    },
    "stats": {
        "initiative": 5,
        "perception": 3,
        "defense": 21,
        "fortitude": 13,
        "reflex": 10,
        "will": 4,
        "hitPoints": 105,
        "speedText": "15m (10q), voo 24m (16q)",
        "senses": "faro, visão no escuro",
        "defensesText": "imunidade a encantamento e medo, resistência a magia arcana +5",
        "attributes": {
            "str": 6,
            "dex": 2,
            "con": 3,
            "int": 0,
            "wis": 2,
            "cha": 2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Cascos +14 (2d8+5)."
        }
    ],
    "abilities": [
        {
            "name": "Investida Aérea",
            "timing": null,
            "text": "Quando faz uma investida alada, o pégaso causa +2d8 pontos de dano com seus cascos e pode continuar se movendo depois do ataque. Ele deve se mover no mesmo sentido e seu movimento máximo ainda é o dobro do seu deslocamento."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": "Atletismo +11, Intuição +10.",
    "role": "solo",
    "roleSource": "pdf-review"
};

const pegasoDeKhalmyr = {
    "id": "pegaso-de-khalmyr",
    "name": "Pégaso de Khalmyr",
    "type": "spirit",
    "subtype": "celestial",
    "size": "Grande",
    "challengeRating": 15,
    "source": {
        "book": "Deuses de Arton",
        "edition": "1ª edição, maio de 2025 (v1.1)",
        "pdfFile": "T20 Deuses de Arton.pdf",
        "bookPage": 280,
        "pdfPage": 282
    },
    "stats": {
        "initiative": 16,
        "perception": 19,
        "defense": 50,
        "fortitude": 22,
        "reflex": 15,
        "will": 28,
        "hitPoints": 750,
        "speedText": "18m (12q), voo 36m (24q)",
        "senses": "faro, visão no escuro",
        "defensesText": "imunidade a encantamento e medo, resistência a magia arcana +15",
        "attributes": {
            "str": 8,
            "dex": 3,
            "con": 5,
            "int": 1,
            "wis": 3,
            "cha": 5
        },
        "manaPoints": 50
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Cascos x2 +39 (4d10+35)."
        }
    ],
    "abilities": [
        {
            "name": "Asas Guardiãs",
            "timing": null,
            "text": "As asas do Pégaso de Khalmyr funcionam como uma aura com 9m de raio. Aliados do pégaso nessa área recebem redução de dano 5."
        },
        {
            "name": "Aura de Ordem",
            "timing": null,
            "text": "O Pégaso emana uma aura de ordem com 30m de raio. Criaturas que comecem seu turno dentro da aura sofrem –20 em Acrobacia, Enganação, Furtividade e Ladinagem e não podem mentir deliberadamente enquanto estiverem na área. Além disso, seus efeitos de encantamento, ilusão e transmutação são dissipados (Von CD 40 reduz a penalidade para –10, permite mentir e não dissipa os efeitos).",
            "magical": true
        },
        {
            "name": "Cascos Sagrados",
            "timing": null,
            "text": "Os cascos do Pégaso são armas mágicas que causam +2d8 de dano contra devotos de deuses que canalizam apenas energia negativa e criaturas malignas (a critério do mestre)."
        },
        {
            "name": "Meteoro",
            "timing": "completa",
            "text": "O Pégaso faz uma investida alada contra uma criatura e ataca com seus dois ataques de cascos. Ambos os ataques recebem o bônus de +2 da investida e causam +4d10 pontos de dano cada, mas devem ser feitos contra o mesmo alvo."
        },
        {
            "name": "Ver Além das Mentiras",
            "timing": null,
            "text": "O Pégaso está permanentemente sob o efeito básico da magia Visão da Verdade."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como um clérigo de Khalmyr de 15º nível (CD 40)."
        },
        {
            "name": "Heroísmo",
            "timing": "padrão",
            "text": "Uma criatura adjacente fica imune a medo, recebe 40 PV temporários e +6 em testes de ataque e rolagens de dano contra o inimigo de maior ND na cena.",
            "cost": "12 PM"
        },
        {
            "name": "Sopro da Salvação",
            "timing": "padrão",
            "text": "O Pégaso sopra um cone de 9m que cura 4d8+4 PV e remove todas as seguintes condições dos aliados na área: abalado, atordoado, apavorado, alquebrado, cego, confuso, debilitado, enfeitiçado, enjoado, esmorecido, exausto, fascinado, fatigado, fraco, frustrado, lento, paralisado, pasmo e surdo.",
            "cost": "14 PM"
        },
        {
            "name": "Viagem Planar",
            "timing": "padrão",
            "text": "O Pégaso e até 5 criaturas voluntárias que ele esteja tocando viajam para outro Plano.",
            "cost": "12 PM"
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": "Atletismo +21, Diplomacia +18, Guerra +14, Intuição +21, Nobreza +14, Religião +16.",
    "role": "solo",
    "roleSource": "pdf-review"
};

const muhir = {
    "id": "muhir",
    "name": "Muhir",
    "type": "spirit",
    "subtype": "celestial",
    "size": "Médio",
    "challengeRating": 15,
    "source": {
        "book": "Deuses de Arton",
        "edition": "1ª edição, maio de 2025 (v1.1)",
        "pdfFile": "T20 Deuses de Arton.pdf",
        "bookPage": 282,
        "pdfPage": 284
    },
    "stats": {
        "initiative": 20,
        "perception": 9,
        "defense": 50,
        "fortitude": 22,
        "reflex": 28,
        "will": 15,
        "hitPoints": 750,
        "speedText": "12m (8q)",
        "senses": "visão no escuro",
        "defensesText": "evasão aprimorada, imunidade a eletricidade, encantamento, dano de luz e fogo, redução de dano 10, vulnerabilidade a trevas",
        "attributes": {
            "str": 7,
            "dex": 7,
            "con": 6,
            "int": 3,
            "wis": 2,
            "cha": 6
        },
        "manaPoints": 77
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Espada bastarda x2 +41 (4d8+25, 17, mais 1d6 fogo)."
        },
        {
            "name": "À Distância",
            "text": "Duas pistolas +39 (2d6+20, 18/x4, mais 1d6 fogo)."
        }
    ],
    "abilities": [
        {
            "name": "Armas Divinas",
            "timing": null,
            "text": "Qualquer arma empunhada pelo muhir causa +1d6 pontos de dano de fogo (já contabilizado) e se torna sagrada ( Tormenta20, p. 336)."
        },
        {
            "name": "Foco Momentâneo",
            "timing": "movimento",
            "text": "O muhir escolhe uma perícia. Até o fim da cena, ou até usar esta habilidade novamente, ele recebe +10 nessa perícia, mas sofre –5 em todas as demais perícias."
        },
        {
            "name": "Golpe Pessoal",
            "timing": "reação",
            "text": "Uma vez por rodada, quando acerta uma criatura com um ataque corpo a corpo, o muhir também causa 10d6 pontos de dano de eletricidade em criaturas a sua escolha em alcance médio da criatura atingida.",
            "cost": "3 PM",
            "magical": true
        },
        {
            "name": "Investida Surpreendente",
            "timing": "reação",
            "text": "Quando o muhir faz uma investida, a criatura que ele ataca fica surpreendida contra esse ataque. Uma criatura só é surpreendida por esta habilidade uma vez por cena."
        },
        {
            "name": "Não Tão Rápido!",
            "timing": "reação",
            "text": "Uma vez por rodada, quando uma criatura em alcance natural do muhir se move voluntariamente para fora desse alcance, ele faz um ataque à distância com uma de suas pistolas contra ela. O muhir não sofre a penalidade de –5 por fazer um ataque à distância contra um oponente envolvido em combate corpo a corpo nesse ataque."
        },
        {
            "name": "Saque Rápido",
            "timing": null,
            "text": "O muhir pode sacar ou guardar itens como uma ação livre e recarregar sua pistola como uma ação de movimento."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como um conjurador divino de 15º nível (CD 40)."
        },
        {
            "name": "Heroísmo",
            "timing": "padrão",
            "text": "Uma criatura adjacente fica imune a medo, recebe 40 PV temporários e +6 em testes de ataque e rolagens de dano contra o inimigo de maior ND na cena.",
            "cost": "12 PM"
        },
        {
            "name": "Libertação",
            "timing": "padrão",
            "text": "Cinco criaturas em alcance curto ficam imunes a efeitos de movimento, e ignoram qualquer efeito que impeça ou restrinja seu deslocamento.",
            "cost": "15 PM"
        },
        {
            "name": "Sopro da Salvação",
            "timing": "padrão",
            "text": "O muhir sopra um cone de 9m que cura 4d8+4 PV e remove todas as seguintes condições dos aliados na área: abalado, atordoado, apavorado, alquebrado, cego, confuso, debilitado, enfeitiçado, enjoado, esmorecido, exausto, fascinado, fatigado, fraco, frustrado, lento, paralisado, pasmo e surdo.",
            "cost": "14 PM"
        }
    ],
    "equipment": "Armadura dos Neladriel, balas x20, espada bastarda certeira precisa, pistola certeira maciça x2.",
    "treasure": "Metade.",
    "skillsText": "Atuação +19, Cura +15, Intimidação +19, Religião +15.",
    "role": "solo",
    "roleSource": "pdf-review"
};

const orel = {
    "id": "orel",
    "name": "Orel",
    "type": "spirit",
    "subtype": "celestial",
    "size": "Grande",
    "challengeRating": 16,
    "source": {
        "book": "Deuses de Arton",
        "edition": "1ª edição, maio de 2025 (v1.1)",
        "pdfFile": "T20 Deuses de Arton.pdf",
        "bookPage": 283,
        "pdfPage": 285
    },
    "stats": {
        "initiative": 8,
        "perception": 19,
        "defense": 51,
        "fortitude": 24,
        "reflex": 16,
        "will": 30,
        "hitPoints": 400,
        "speedText": "Voo 18m (12q)",
        "senses": "percepção às cegas (médio)",
        "defensesText": "imunidade a eletricidade e encantamento, redução de dano 20, resistência a magia +5",
        "attributes": {
            "str": 0,
            "dex": 0,
            "con": 1,
            "int": 5,
            "wis": 5,
            "cha": 4
        }
    },
    "actions": [
        {
            "name": "À Distância",
            "text": "Feixe luminoso x4 +44 (8d6+27 luz)."
        }
    ],
    "abilities": [
        {
            "name": "Aura de Bondade",
            "timing": null,
            "text": "O orel emana uma aura de bondade com 9m de raio. Aliados do orel dentro da aura recebem imunidade a encantamento e +5 na Defesa e em testes de resistência. Além disso, inimigos que comecem seus turnos na área ficam cegos (Von CD 44 evita)."
        },
        {
            "name": "Conjurador Angelical",
            "timing": null,
            "text": "O orel pode lançar e sustentar qualquer magia arcana de 4º círculo ou menor sem gastar PM como um mago de 16º nível (CD 44)."
        },
        {
            "name": "Geometria Divina",
            "timing": "completa",
            "text": "O orel lança duas magias com execução de ação padrão ou menor."
        },
        {
            "name": "Recomposição Divina",
            "timing": null,
            "text": "No início do seu turno, se não tiver sido reduzido a 0 PV ou menos, o orel volta a ter 400 PV."
        },
        {
            "name": "Sentidos Superiores",
            "timing": null,
            "text": "O orel está sempre sob o efeito básico da magia Visão da Verdade."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": "Conhecimento +19, Diplomacia +18, Intuição +19, Misticismo +19, Religião +21.",
    "role": "special",
    "roleSource": "pdf-review"
};

const furiaExtrema = {
    "id": "furia-extrema",
    "name": "Fúria Extrema",
    "type": "spirit",
    "subtype": "celestial",
    "size": "Colossal",
    "challengeRating": 20,
    "source": {
        "book": "Deuses de Arton",
        "edition": "1ª edição, maio de 2025 (v1.1)",
        "pdfFile": "T20 Deuses de Arton.pdf",
        "bookPage": 284,
        "pdfPage": 286
    },
    "stats": {
        "initiative": 20,
        "perception": 20,
        "defense": 61,
        "fortitude": 32,
        "reflex": 30,
        "will": 20,
        "hitPoints": 1200,
        "speedText": "12m (8q), voo 15m (10q)",
        "senses": "percepção às cegas (longo)",
        "defensesText": "imunidade a efeitos mentais, de metabolismo e de movimento e a medo, metamorfose e trevas, redução de dano 40",
        "attributes": {
            "str": 15,
            "dex": 10,
            "con": 15,
            "int": 0,
            "wis": 8,
            "cha": 10
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Duas lâminas flamejantes +54 (5d8+20 fogo mais 5d8+20 luz)."
        }
    ],
    "abilities": [
        {
            "name": "Celeridade Divina",
            "timing": null,
            "text": "O fúria extrema pode executar uma ação padrão adicional em cada um de seus turnos."
        },
        {
            "name": "Fogo Sagrado",
            "timing": null,
            "text": "O dano de fogo e o dano de luz causados pelo fúria extrema ignoram 30 pontos da redução de dano cada e, contra criaturas imunes a fogo ou luz, ainda causam metade do dano. Além disso, quando sofre dano de fogo ou luz, o fúria recupera pontos de vida em vez de perdê-los."
        },
        {
            "name": "Halo de Terror Absoluto",
            "timing": null,
            "text": "No início de cada turno do fúria, criaturas em um raio de 9m sofrem 6d8 pontos de dano de fogo e 6d8 pontos de dano de luz e ficam apavoradas (Von CD 49 reduz à metade e muda a condição para abalado). Uma criatura imune a medo ainda fica abalada se falhar na resistência, mas não se passar no teste."
        },
        {
            "name": "Liberar Essência Celestial",
            "timing": "reação",
            "text": "Caso o fúria seja reduzido a 0 PV ou menos, ele explode, causando 15d8 pontos de dano de fogo e 15d8 pontos de dano de luz em todas as criaturas em um raio de 30m (Ref CD 49 reduz à metade)."
        },
        {
            "name": "Olhar Fumegante",
            "timing": "padrão",
            "text": "Uma criatura em alcance longo sofre 15d8 pontos de dano de fogo e 15d8 pontos de dano de luz, fica ofuscada por 1 rodada e em chamas (Ref CD 49 reduz à metade e evita as condições). Recarga (movimento)."
        },
        {
            "name": "Retribuição",
            "timing": null,
            "text": "Quando uma criatura causa dano ao fúria, sofre a mesma quantidade de dano (Fort CD 49 reduz à metade)."
        },
        {
            "name": "Teletransporte",
            "timing": "movimento",
            "text": "O fúria se teletransporta para um espaço desocupado que ele possa perceber a até 30m."
        },
        {
            "name": "Ver Além da Mentira",
            "timing": null,
            "text": "O fúria extrema está permanentemente sob o efeito básico da magia Visão da Verdade.",
            "magical": true
        }
    ],
    "equipment": null,
    "treasure": "Lâmina flamejante (CD 35 para extrair, reduz em 1 PM o custo para fabricar uma vingadora sagrada).",
    "skillsText": null,
    "role": "solo",
    "roleSource": "pdf-review"
};

const driade = {
    "id": "driade",
    "name": "Dríade",
    "type": "spirit",
    "subtype": null,
    "size": "Médio",
    "challengeRating": 4,
    "source": {
        "book": "Deuses de Arton",
        "edition": "1ª edição, maio de 2025 (v1.1)",
        "pdfFile": "T20 Deuses de Arton.pdf",
        "bookPage": 286,
        "pdfPage": 288,
        "bookPageEnd": 287,
        "pdfPageEnd": 289
    },
    "stats": {
        "initiative": 7,
        "perception": 12,
        "defense": 21,
        "fortitude": 4,
        "reflex": 11,
        "will": 15,
        "hitPoints": 98,
        "speedText": "9m (6q), sem redução por terreno difícil natural",
        "senses": "visão no escuro",
        "defensesText": "imunidade a efeitos mentais, redução de dano 5/adamante",
        "attributes": {
            "str": -1,
            "dex": 3,
            "con": 0,
            "int": 1,
            "wis": 5,
            "cha": 6
        },
        "manaPoints": 24
    },
    "actions": [],
    "abilities": [
        {
            "name": "Caminhar em Árvores",
            "timing": "completa",
            "text": "A dríade entra em uma árvore adjacente que seja maior do que ela, e pode permanecer dentro da árvore livremente, percebendo os arredores de forma normal (mas sem poder executar outras ações). Também pode sair na mesma árvore ou em qualquer outra árvore em um raio de 1km como uma ação livre. Se estiver dentro de uma árvore que seja destruída, a dríade reaparece e perde 10d6 pontos de vida."
        },
        {
            "name": "Simbiose",
            "timing": null,
            "text": "A verdadeira forma de uma dríade é uma enorme árvore. Quando sua forma humanoide é destruída, outra surge em poucos dias nessa árvore. A forma humanoide de uma dríade não pode se afastar mais de 1km da floresta onde repousa sua árvore, ou perde 8d6 pontos de vida por hora. Essa perda de vida só pode ser curada após a dríade retornar para sua árvore. A única forma de matar uma dríade é destruir sua árvore."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como uma conjuradora de 4º nível (CD 20)."
        },
        {
            "name": "Comando",
            "timing": "padrão",
            "text": "No início do seu próximo turno, duas criaturas em alcance curto ficam pasmas por 1 rodada (Von evita; cada criatura só pode ficar pasma por esta magia uma vez por cena).",
            "cost": "4 PM"
        },
        {
            "name": "Controlar Plantas",
            "timing": "padrão",
            "text": "Um quadrado de 9m de vegetação em alcance curto se torna terreno difícil. Criaturas na área quando a magia é lançada ou no início de seus próprios turnos ficam enredadas e imóveis (Ref evita). Uma vítima pode se libertar com uma ação padrão e um teste de Acrobacia ou Atletismo.",
            "cost": "2 PM"
        },
        {
            "name": "Enfeitiçar",
            "timing": "padrão",
            "text": "Um humanoide em alcance curto fica enfeitiçado (Von anula). Ações hostis contra o alvo ou seus aliados dissipam a magia.",
            "cost": "1 PM"
        },
        {
            "name": "Tranquilidade",
            "timing": "padrão",
            "text": "Até o fim da cena, uma criatura em alcance curto tem sua atitude mudada para indiferente e não pode atacar ou realizar qualquer ação hostil (Von reduz para penalidade de –2 em testes de ataque). Ações hostis contra o alvo ou seus aliados dissipam a magia.",
            "cost": "2 PM"
        }
    ],
    "equipment": null,
    "treasure": "Padrão.",
    "skillsText": "Adestramento +12, Diplomacia +12, Intuição +9, Furtividade +9 (+14 em florestas), Misticismo +6, Sobrevivência +15.",
    "role": "special",
    "roleSource": "pdf-review"
};

const duendeMenor = {
    "id": "duende-menor",
    "name": "Duende Menor",
    "type": "spirit",
    "subtype": null,
    "size": "Pequeno",
    "challengeRating": 1,
    "source": {
        "book": "Deuses de Arton",
        "edition": "1ª edição, maio de 2025 (v1.1)",
        "pdfFile": "T20 Deuses de Arton.pdf",
        "bookPage": 288,
        "pdfPage": 290
    },
    "stats": {
        "initiative": 4,
        "perception": 6,
        "defense": 14,
        "fortitude": 1,
        "reflex": 6,
        "will": 10,
        "hitPoints": 22,
        "speedText": "9m (6q)",
        "senses": "visão no escuro",
        "defensesText": "evasão",
        "attributes": {
            "str": -1,
            "dex": 2,
            "con": -1,
            "int": 0,
            "wis": 2,
            "cha": 3
        },
        "manaPoints": 9
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Adaga +7 (1d4+4, 19)."
        }
    ],
    "abilities": [
        {
            "name": "Sortudo",
            "timing": "reação",
            "text": "Quando faz um teste, o duende menor o rola novamente.",
            "cost": "3 PM"
        },
        {
            "name": "Tabu",
            "timing": null,
            "text": "Todo duende possui um tabu, que pode ser descoberto com um teste de Conhecimento (CD 30) ou com um teste de Investigação (CD 20) para interrogar os plebeus da região — muitos tabus são conhecidos pelo folclore popular. Um personagem que conheça o tabu de um duende pode forçá-lo a ajudar em algo com um teste de Enganação oposto a um teste de Vontade. Quando impedido de cumprir seu tabu, um duende morre em 1d4+1 dias."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como um conjurador arcano de 1º nível (CD 16)."
        },
        {
            "name": "Enfeitiçar",
            "timing": "padrão",
            "text": "Um humanoide em alcance curto fica enfeitiçado (Vontade evita).",
            "cost": "1 PM"
        },
        {
            "name": "Criar Ilusão",
            "timing": "padrão",
            "text": "O duende cria uma ilusão com imagens em alcance médio, que ocupa até 4 cubos de 1,5m. Criaturas e objetos atravessam a ilusão sem sofrer dano (Von desacredita).",
            "cost": "1 PM"
        },
        {
            "name": "Sono",
            "timing": "padrão",
            "text": "Um humanoide em alcance curto fica inconsciente e caído ou, se estiver envolvido em uma situação perigosa, fica exausto por 1 rodada, depois fatigado (Von reduz para fatigado por 1d4 rodadas).",
            "cost": "1 PM"
        }
    ],
    "equipment": "Adaga.",
    "treasure": "Padrão.",
    "skillsText": "Conhecimento +2, Enganação +5, Furtividade +6.",
    "role": "special",
    "roleSource": "pdf-review"
};

const duendeMaior = {
    "id": "duende-maior",
    "name": "Duende Maior",
    "type": "spirit",
    "subtype": null,
    "size": "Médio",
    "challengeRating": 5,
    "source": {
        "book": "Deuses de Arton",
        "edition": "1ª edição, maio de 2025 (v1.1)",
        "pdfFile": "T20 Deuses de Arton.pdf",
        "bookPage": 288,
        "pdfPage": 290
    },
    "stats": {
        "initiative": 6,
        "perception": 8,
        "defense": 22,
        "fortitude": 6,
        "reflex": 12,
        "will": 16,
        "hitPoints": 127,
        "speedText": "9m (6q)",
        "senses": "visão no escuro",
        "defensesText": "evasão",
        "attributes": {
            "str": 1,
            "dex": 2,
            "con": 2,
            "int": 2,
            "wis": 2,
            "cha": 4
        },
        "manaPoints": 34
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Adaga +15 (1d4+8, 19)."
        }
    ],
    "abilities": [
        {
            "name": "Sortudo",
            "timing": "reação",
            "text": "Quando faz um teste, o duende maior o rola novamente.",
            "cost": "3 PM"
        },
        {
            "name": "Tabu",
            "timing": null,
            "text": "Todo duende possui um tabu, que pode ser descoberto com um teste de Conhecimento (CD 30) ou perguntando aos plebeus da região (Investigação CD 20) — muitos tabus são conhecidos pelo folclore popular. Um personagem que conheça o tabu de um duende pode forçá-lo a ajudar em algo com um teste de Enganação oposto a um teste de Vontade. Quando impedido de cumprir seu tabu, um duende morre em 1d4+1 dias."
        },
        {
            "name": "Magia Discreta",
            "timing": "livre",
            "text": "Quando lança uma magia, o duende não precisa gesticular ou falar e pode lançar a magia com as mãos presas, amordaçado etc. Perceber que ele lançou uma magia exige passar em um teste de Misticismo (CD 20).",
            "cost": "+2 PM"
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como um conjurador arcano de 5º nível (CD 22)."
        },
        {
            "name": "Enfeitiçar",
            "timing": "padrão",
            "text": "Um humanoide em alcance curto fica enfeitiçado (Vontade evita).",
            "cost": "1 PM"
        },
        {
            "name": "Dissipar Magia",
            "timing": "padrão",
            "text": "O duende escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias nesse alvo com CD igual ou menor que o resultado do teste são dissipadas.",
            "cost": "3 PM"
        },
        {
            "name": "Invisibilidade",
            "timing": "padrão",
            "text": "O duende fica invisível até o fim da cena ou até realizar uma ação hostil. Ele recebe camuflagem total e +10 em testes de Furtividade contra ouvir, e criaturas que não possam vê-lo ficam desprevenidas contra seus ataques.",
            "cost": "5 PM"
        },
        {
            "name": "Sussurros Insanos",
            "timing": "padrão",
            "text": "Um humanoide em alcance curto fica confuso (Von anula).",
            "cost": "3 PM"
        }
    ],
    "equipment": "Adaga.",
    "treasure": "Padrão.",
    "skillsText": "Conhecimento +8, Enganação +10, Furtividade +8, Misticismo +8.",
    "role": "special",
    "roleSource": "pdf-review"
};

const dragonete = {
    "id": "dragonete",
    "name": "Dragonete",
    "type": "spirit",
    "subtype": null,
    "size": "Pequeno",
    "challengeRating": 4,
    "source": {
        "book": "Deuses de Arton",
        "edition": "1ª edição, maio de 2025 (v1.1)",
        "pdfFile": "T20 Deuses de Arton.pdf",
        "bookPage": 289,
        "pdfPage": 291
    },
    "stats": {
        "initiative": 11,
        "perception": 6,
        "defense": 21,
        "fortitude": 6,
        "reflex": 14,
        "will": 10,
        "hitPoints": 100,
        "speedText": "9m (6q), voo 12m (8q)",
        "senses": "visão no escuro",
        "defensesText": "resistência a magia +2",
        "attributes": {
            "str": 0,
            "dex": 4,
            "con": 1,
            "int": -1,
            "wis": 2,
            "cha": 4
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Garras +14 (1d8+8) e mordida +14 (1d6+6)."
        }
    ],
    "abilities": [
        {
            "name": "Baforada Iridescente",
            "timing": "padrão",
            "text": "O dragonete sopra um pó iridescente. Criaturas em um cone de 4,5m ficam atordoadas por 1 rodada e ofuscadas (Von CD 20 evita). Uma criatura só pode ficar atordoada por esta habilidade uma vez por cena. Recarga (movimento)."
        },
        {
            "name": "Ladrão de Magias",
            "timing": "reação",
            "text": "Uma vez por rodada, quando uma criatura em alcance curto se torna o alvo de uma magia, o dragonete \"rouba\" seu efeito para si mesmo. A magia funciona normalmente, mas o dragonete se torna seu novo alvo.",
            "magical": true
        },
        {
            "name": "Sumiço",
            "timing": "padrão",
            "text": "O dragonete fica invisível como pela magia Invisibilidade.",
            "magical": true
        },
        {
            "name": "Visão Arcana",
            "timing": null,
            "text": "O dragonete está sempre sob o efeito básico de Visão Mística.",
            "magical": true
        }
    ],
    "equipment": null,
    "treasure": "Padrão.",
    "skillsText": "Furtividade +12, Intuição +8, Misticismo +5.",
    "role": "special",
    "roleSource": "pdf-review"
};

const naiade = {
    "id": "naiade",
    "name": "Náiade",
    "type": "spirit",
    "subtype": null,
    "size": "Médio",
    "challengeRating": 3,
    "source": {
        "book": "Deuses de Arton",
        "edition": "1ª edição, maio de 2025 (v1.1)",
        "pdfFile": "T20 Deuses de Arton.pdf",
        "bookPage": 290,
        "pdfPage": 292
    },
    "stats": {
        "initiative": 7,
        "perception": 7,
        "defense": 19,
        "fortitude": 7,
        "reflex": 13,
        "will": 9,
        "hitPoints": 74,
        "speedText": "9m (6q), natação 18m (12q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a encantamento e frio",
        "attributes": {
            "str": 0,
            "dex": 4,
            "con": 1,
            "int": 1,
            "wis": 3,
            "cha": 4
        },
        "manaPoints": 18
    },
    "actions": [],
    "abilities": [
        {
            "name": "Abraço das Águas",
            "timing": "movimento",
            "text": "A náiade faz um teste de Agarrar (bônus +12) oposto contra uma criatura adjacente. Uma criatura agarrada pela náiade deve fazer um teste de Fortitude por rodada (CD 19) para não se afogar. A cada falha, sofre 1 ponto de dano temporário de Constituição até morrer ou até respirar novamente. Uma criatura agarrada não percebe o que está acontecendo e se sente confortável no abraço da náiade. Para fazer qualquer ação em seu turno, deve ser bem-sucedida em um teste de Vontade (CD 19)."
        },
        {
            "name": "Linguagem Natural",
            "timing": null,
            "text": "A náiade pode falar com animais livremente."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como uma conjuradora arcana de 3º nível (CD 19)."
        },
        {
            "name": "Criar Ilusão",
            "timing": "padrão",
            "text": "A náiade cria uma ilusão com imagens em alcance médio, que ocupa até 4 cubos de 1,5m. Criaturas e objetos atravessam a ilusão sem sofrer dano (Von desacredita e permite atravessar as ilusões).",
            "cost": "1 PM"
        },
        {
            "name": "Dardo Gélido",
            "timing": "padrão",
            "text": "Uma criatura em alcance curto sofre 4d6 pontos de dano de frio e fica lenta por 1 rodada (Fort reduz à metade e evita a condição).",
            "cost": "3 PM"
        },
        {
            "name": "Imagem Espelhada",
            "timing": "padrão",
            "text": "Três cópias ilusórias da náiade surgem ao seu redor, concedendo +6 na Defesa. Cada vez que um ataque erra a náiade, uma das cópias desaparece e o bônus na Defesa diminui em 2.",
            "cost": "3 PM"
        }
    ],
    "equipment": null,
    "treasure": "Padrão.",
    "skillsText": "Conhecimento +6, Furtividade +9, Intuição +10, Sobrevivência +10.",
    "role": "special",
    "roleSource": "pdf-review"
};

const ninfa = {
    "id": "ninfa",
    "name": "Ninfa",
    "type": "spirit",
    "subtype": null,
    "size": "Médio",
    "challengeRating": 6,
    "source": {
        "book": "Deuses de Arton",
        "edition": "1ª edição, maio de 2025 (v1.1)",
        "pdfFile": "T20 Deuses de Arton.pdf",
        "bookPage": 291,
        "pdfPage": 293
    },
    "stats": {
        "initiative": 8,
        "perception": 6,
        "defense": 22,
        "fortitude": 6,
        "reflex": 12,
        "will": 18,
        "hitPoints": 144,
        "speedText": "9m (6q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a encantamento, redução de dano 5/adamante, resistência a magia +5",
        "attributes": {
            "str": 0,
            "dex": 4,
            "con": 1,
            "int": 3,
            "wis": 3,
            "cha": 7
        },
        "manaPoints": 42
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Pancada +18 (1d3+6)."
        }
    ],
    "abilities": [
        {
            "name": "Beleza Insuportável",
            "timing": null,
            "text": "No início de cada turno da ninfa, se ela estiver nua, cada criatura em alcance médio deve fazer um teste de Vontade (CD 24). Se passar, desvia o olhar. Se falhar, fica paralisada e esmorecida. Se já estiver esmorecida, perde 1 ponto cumulativo de Constituição permanentemente. Se falhar por 3 rodadas sucessivas, morre. Uma criatura pode fechar os olhos como uma reação para ficar imune a esta habilidade, mas sofrerá os efeitos de estar cega por 1 rodada.",
            "magical": true
        },
        {
            "name": "Coração Aprisionado",
            "timing": "padrão",
            "text": "A ninfa aprisiona o coração de uma criatura em alcance curto (Von CD 24 evita e a criatura não pode mais ser afetada por esta habilidade por um dia). Uma criatura cujo coração seja aprisionado recebe +2 em testes de perícia, mas é incapaz de contrariar as ordens da ninfa ou se afastar mais de 30m dela. O coração permanece aprisionado até que a ninfa o liberte ou seja morta.",
            "cost": "3 PM"
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como uma conjuradora arcana de 6º nível (CD 24)."
        },
        {
            "name": "Curar Ferimentos",
            "timing": "padrão",
            "text": "Uma criatura adjacente cura 6d8+6 PV.",
            "cost": "5 PM"
        },
        {
            "name": "Marca da Obediência",
            "timing": "padrão",
            "text": "A ninfa ordena que uma criatura adjacente não ataque ela ou seus aliados até o fim da cena (Von evita). A criatura pode repetir o teste de Vontade em cada um de seus turnos subsequentes mas, se falhar, sofre 3d6 pontos de dano psíquico.",
            "cost": "6 PM"
        },
        {
            "name": "Santuário",
            "timing": "padrão",
            "text": "A ninfa toca uma criatura. Até o fim da cena, ou até que essa criatura faça uma ação hostil, qualquer criatura que tente fazer uma ação hostil contra ela perde a ação (Von evita).",
            "cost": "1 PM"
        }
    ],
    "equipment": null,
    "treasure": "Padrão.",
    "skillsText": "Adestramento +17, Diplomacia +17, Enganação +17, Intuição +10, Sobrevivência +10.",
    "role": "special",
    "roleSource": "pdf-review"
};

const satiroArqueiro = {
    "id": "satiro-arqueiro",
    "name": "Sátiro Arqueiro",
    "type": "spirit",
    "subtype": "sátiro",
    "size": "Médio",
    "challengeRating": 2,
    "source": {
        "book": "Deuses de Arton",
        "edition": "1ª edição, maio de 2025 (v1.1)",
        "pdfFile": "T20 Deuses de Arton.pdf",
        "bookPage": 292,
        "pdfPage": 294,
        "bookPageEnd": 293,
        "pdfPageEnd": 295
    },
    "stats": {
        "initiative": 6,
        "perception": 2,
        "defense": 18,
        "fortitude": 7,
        "reflex": 12,
        "will": 3,
        "hitPoints": 13,
        "speedText": "12m (8q)",
        "senses": "visão na penumbra",
        "defensesText": null,
        "attributes": {
            "str": 1,
            "dex": 3,
            "con": 1,
            "int": 0,
            "wis": -1,
            "cha": 2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Chifres +9 (1d6+1)."
        },
        {
            "name": "À Distância",
            "text": "Arco curto +14 (1d6+3, x3)."
        }
    ],
    "abilities": [
        {
            "name": "Disparo Rápido",
            "timing": "completa",
            "text": "O sátiro arqueiro faz dois ataques de arco curto com uma penalidade de –2 em cada teste."
        },
        {
            "name": "Flautista Mágico",
            "timing": "padrão",
            "text": "O sátiro lança uma das seguintes magias como um bardo, com os efeitos descritos mas sem gastar PM (CD 16). Ele só pode usar esta habilidade se estiver empunhando sua flauta. • Amedrontar Um animal ou humanoide em alcance curto fica apavorado por 1 rodada e depois abalado (Von reduz para abalado por 1d4 rodadas). • Enfeitiçar Um animal ou humanoide em alcance curto fica enfeitiçado (Von anula). • Hipnotismo Um animal ou humanoide em alcance curto fica fascinado (Von anula e deixa imune por 1 dia). • Sono Um humanoide em alcance curto fica inconsciente e caído ou, se estiver em combate, exausto por 1 rodada e então fatigado (Von reduz para fatigado por 1d4 rodadas em ambos os casos)."
        }
    ],
    "equipment": "Arco curto, armadura de couro, flechas x10, instrumento musical (flauta).",
    "treasure": "Nenhum.",
    "skillsText": "Atletismo +6, Atuação +7.",
    "role": "minion",
    "roleSource": "pdf-review"
};

const silfideTravessa = {
    "id": "silfide-travessa",
    "name": "Sílfide Travessa",
    "type": "spirit",
    "subtype": "sílfide",
    "size": "Minúsculo",
    "challengeRating": 1,
    "source": {
        "book": "Deuses de Arton",
        "edition": "1ª edição, maio de 2025 (v1.1)",
        "pdfFile": "T20 Deuses de Arton.pdf",
        "bookPage": 293,
        "pdfPage": 295,
        "bookPageEnd": 294,
        "pdfPageEnd": 296
    },
    "stats": {
        "initiative": 3,
        "perception": 0,
        "defense": 10,
        "fortitude": 0,
        "reflex": 11,
        "will": 5,
        "hitPoints": 40,
        "speedText": "9m (6q), voo 12m (8q)",
        "senses": "visão no escuro",
        "defensesText": null,
        "attributes": {
            "str": -2,
            "dex": 2,
            "con": 0,
            "int": 1,
            "wis": -1,
            "cha": 3
        },
        "manaPoints": 18
    },
    "actions": [],
    "abilities": [
        {
            "name": "“Eu Não Acredito em Fadas.”",
            "timing": null,
            "text": "Quando um inimigo passa em um teste de Vontade contra a sílfide travessa, ela perde 5 PV."
        },
        {
            "name": "“Oi, Qual o Seu Nome?”",
            "timing": null,
            "text": "Uma criatura que de alguma forma revele seu nome verdadeiro à sílfide sofre –2 em testes de resistência contra ela."
        },
        {
            "name": "Raio Arcano",
            "timing": "padrão",
            "text": "Uma criatura em alcance curto sofre 2d12 pontos de dano de essência (Ref CD 16 reduz à metade)."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como uma feiticeira de 3º nível (CD 16, limite de PM 3)."
        },
        {
            "name": "Adaga Mental",
            "timing": "padrão",
            "text": "Uma criatura em alcance curto sofre 2d6 pontos de dano psíquico e fica atordoada por 1 rodada (Von reduz o dano à metade e evita a condição). Uma criatura só pode ser atordoada por esta magia uma vez por cena.",
            "cost": "1 PM"
        },
        {
            "name": "Criar Ilusão",
            "timing": "padrão",
            "text": "A sílfide cria uma ilusão com imagens em alcance médio, que ocupa até 4 cubos de 1,5m. Criaturas e objetos atravessam a ilusão sem sofrer dano (Von desacredita).",
            "cost": "1 PM"
        },
        {
            "name": "Disfarce Ilusório",
            "timing": "padrão",
            "text": "Até o fim da cena, a sílfide muda a própria aparência, incluindo seu equipamento, os odores e as sensações que ela transmite. Isso afeta altura, peso, tom de pele, cor de cabelo, timbre de voz etc. Ela recebe +20 em testes de Enganação para disfarce (Von desacredita).",
            "cost": "3 PM"
        },
        {
            "name": "Luz",
            "timing": "padrão",
            "text": "Uma criatura fica ofuscada pela cena (Von evita).",
            "cost": "1 PM"
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": "Diplomacia +7, Enganação +7, Furtividade +9.",
    "role": "special",
    "roleSource": "pdf-review"
};

const silfideEncantadora = {
    "id": "silfide-encantadora",
    "name": "Sílfide Encantadora",
    "type": "spirit",
    "subtype": "sílfide",
    "size": "Minúsculo",
    "challengeRating": 8,
    "source": {
        "book": "Deuses de Arton",
        "edition": "1ª edição, maio de 2025 (v1.1)",
        "pdfFile": "T20 Deuses de Arton.pdf",
        "bookPage": 294,
        "pdfPage": 296
    },
    "stats": {
        "initiative": 9,
        "perception": 5,
        "defense": 25,
        "fortitude": 7,
        "reflex": 21,
        "will": 15,
        "hitPoints": 211,
        "speedText": "Voo 12m (8q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a encantamento",
        "attributes": {
            "str": -2,
            "dex": 4,
            "con": 2,
            "int": 1,
            "wis": -1,
            "cha": 6
        },
        "manaPoints": 60
    },
    "actions": [],
    "abilities": [
        {
            "name": "Enganadora Nata",
            "timing": "reação",
            "text": "Quando é alvo de uma ação hostil, a sílfide encantadora muda o alvo da ação para uma criatura em alcance médio cujo nome ela conheça.",
            "cost": "3 PM",
            "magical": true
        },
        {
            "name": "“Eu Não Acredito em Fadas.”",
            "timing": null,
            "text": "Quando um inimigo passa em um teste de Vontade contra a sílfide, ela perde 5 PV."
        },
        {
            "name": "“Oi, Qual o Seu Nome?”",
            "timing": null,
            "text": "Uma criatura que de alguma forma revele seu nome verdadeiro à sílfide sofre –2 em testes de resistência contra ela."
        },
        {
            "name": "Onomancia Feérica",
            "timing": "livre",
            "text": "Uma vez por rodada, a sílfide dá uma ordem, como o efeito básico da magia Comando, a uma criatura em alcance médio que tenha revelado seu nome a ela em algum momento.",
            "magical": true
        },
        {
            "name": "Raio Arcano",
            "timing": "padrão",
            "text": "Uma criatura em alcance curto sofre 4d12+12 pontos de dano de essência (Ref CD 28 reduz à metade)."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como uma feiticeira de 9º nível (CD 28, limite de PM 9)."
        },
        {
            "name": "Adaga Mental",
            "timing": "padrão",
            "text": "Uma criatura em alcance curto sofre 4d6 pontos de dano psíquico e fica atordoada por 1 rodada (Von reduz à metade e evita a condição). Se falhar no teste de resistência, a criatura não percebe que a sílfide lançou a magia. Uma criatura só pode ser atordoada por esta magia uma vez por cena.",
            "cost": "6 PM"
        },
        {
            "name": "Criar Ilusão",
            "timing": "padrão",
            "text": "A sílfide cria uma ilusão com imagens e sons combinados em alcance médio, que ocupa até 6 cubos de 1,5m. Criaturas e objetos atravessam a ilusão sem sofrer dano (Von desacredita).",
            "cost": "4 PM, sustentada"
        },
        {
            "name": "Disfarce Ilusório",
            "timing": "padrão",
            "text": "Até o fim da cena, a sílfide muda a própria aparência, incluindo seu equipamento, e ainda os odores e as sensações que transmite. Isso afeta altura, peso, tom de pele, cor de cabelo, timbre de voz etc. Ela recebe +20 em testes de Enganação para disfarce (Von desacredita).",
            "cost": "3 PM"
        },
        {
            "name": "Imobilizar",
            "timing": "padrão",
            "text": "Um animal ou humanoide em alcance curto fica paralisado (Von reduz para lento). A cada rodada, a vítima pode gastar uma ação completa para fazer um novo teste de Vontade. Se passar, liberta-se do efeito.",
            "cost": "6 PM"
        },
        {
            "name": "Invisibilidade",
            "timing": "padrão",
            "text": "A sílfide fica invisível até o fim da cena ou até realizar uma ação hostil. Ela recebe camuflagem total e +10 em testes de Furtividade contra ouvir, e criaturas que não possam vê-la ficam desprevenidas contra seus ataques.",
            "cost": "4 PM"
        }
    ],
    "equipment": "Bolsa de pó canalizadora, gorro de ervas.",
    "treasure": "Padrão.",
    "skillsText": "Diplomacia +16, Enganação +16, Furtividade +17.",
    "role": "special",
    "roleSource": "pdf-review"
};

const velhaBruxa = {
    "id": "velha-bruxa",
    "name": "Velha Bruxa",
    "type": "spirit",
    "subtype": null,
    "size": "Médio",
    "challengeRating": 9,
    "source": {
        "book": "Deuses de Arton",
        "edition": "1ª edição, maio de 2025 (v1.1)",
        "pdfFile": "T20 Deuses de Arton.pdf",
        "bookPage": 294,
        "pdfPage": 296,
        "bookPageEnd": 295,
        "pdfPageEnd": 297
    },
    "stats": {
        "initiative": 7,
        "perception": 10,
        "defense": 31,
        "fortitude": 16,
        "reflex": 9,
        "will": 20,
        "hitPoints": 270,
        "speedText": "9m (6q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a doenças e encantamento, redução de dano 10/adamante",
        "attributes": {
            "str": 2,
            "dex": 1,
            "con": 2,
            "int": 4,
            "wis": 1,
            "cha": 3
        },
        "manaPoints": 63
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Duas garras +25 (2d6+16) e mordida +25 (1d6+14)."
        }
    ],
    "abilities": [
        {
            "name": "Careta Horripilante",
            "timing": "movimento",
            "text": "Criaturas em alcance curto ficam abaladas (Von CD 30 evita e a criatura fica imune a esta habilidade por um dia)."
        },
        {
            "name": "Dê um Trocado para Esta Bruxa",
            "timing": null,
            "text": "A velha bruxa para transeuntes pedindo algo: comida, dinheiro, objetos ou qualquer outra coisa. Quem se oferece para atender o pedido deve fazer um teste de Vontade (CD 30). Se falhar, fica enfeitiçado pela bruxa, seguindo-a aonde ela mandar (provavelmente para seu item voador, indo direto para a casa). Se passar, percebe a tramoia e fica imune a esta habilidade por um dia.",
            "magical": true
        },
        {
            "name": "Voar, Voar",
            "timing": null,
            "text": "A bruxa pode voar usando um pilão, vassoura ou outro tipo de instrumento. Esse instrumento concede deslocamento voo 18m (12q), mas apenas para a bruxa.",
            "magical": true
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como uma bruxa de 9º nível (CD 30). Seu foco arcano é o objeto que ela usa para voar (veja Voar, Voar)."
        },
        {
            "name": "Conjurar Monstro",
            "timing": "completa",
            "text": "A bruxa conjura um monstro Grande em um espaço desocupado em alcance curto. Ele tem Defesa 31, imunidade a efeitos que exigem testes de Fortitude ou Vontade, For 7, Des 2, 75 PV, deslocamento 12m e pode fazer uma ação de movimento por rodada. A bruxa pode gastar uma ação padrão para que ele se desloque o dobro nessa rodada ou cause 4d6+10 pontos de dano de impacto em uma criatura a até 3m.",
            "cost": "6 PM, sustentada"
        },
        {
            "name": "Muralha Elemental",
            "timing": "padrão",
            "text": "Uma muralha de fogo com até 30m de comprimento e 3m de altura se eleva da terra em alcance médio. Um lado da muralha emite ondas de calor, que causam 2d8 pontos de dano de fogo em criaturas a até 6m quando a magia é lançada e no início dos turnos da bruxa. Atravessar a muralha causa 12d8 pontos de dano de fogo.",
            "cost": "9 PM"
        },
        {
            "name": "Rogar Maldição",
            "timing": "padrão",
            "text": "A bruxa amaldiçoa uma criatura em alcance curto. O alvo fica debilitado, lento e esmorecido. Além disso, não pode se comunicar ou lançar magias (Fort evita).",
            "cost": "6 PM, sustentada"
        },
        {
            "name": "Vidência",
            "timing": "completa",
            "text": "A bruxa pode ver e ouvir uma criatura a sua escolha e seus arredores em alcance ilimitado (Von evita). O teste de resistência é modificado de acordo com a familiaridade da bruxa com o alvo da magia ( Tormenta20, p. 211).",
            "cost": "6 PM, sustentada"
        }
    ],
    "equipment": "Uma vassoura, pilão ou outro instrumento doméstico.",
    "treasure": "Padrão.",
    "skillsText": "Conhecimento +12, Enganação +13, Misticismo +14.",
    "role": "special",
    "roleSource": "pdf-review"
};

const eiradaanGuardiao = {
    "id": "eiradaan-guardiao",
    "name": "Eiradaan Guardião",
    "type": "spirit",
    "subtype": "eiradaan",
    "size": "Médio",
    "challengeRating": 7,
    "source": {
        "book": "Deuses de Arton",
        "edition": "1ª edição, maio de 2025 (v1.1)",
        "pdfFile": "T20 Deuses de Arton.pdf",
        "bookPage": 296,
        "pdfPage": 298
    },
    "stats": {
        "initiative": 12,
        "perception": 10,
        "defense": 28,
        "fortitude": 7,
        "reflex": 14,
        "will": 20,
        "hitPoints": 215,
        "speedText": "9m (6q)",
        "senses": "visão no escuro",
        "defensesText": "resistência a magia +2",
        "attributes": {
            "str": 2,
            "dex": 4,
            "con": 2,
            "int": 1,
            "wis": 3,
            "cha": 5
        },
        "manaPoints": 35
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Espada longa de mitral x2 +22 (3d8+20, 18)."
        }
    ],
    "abilities": [
        {
            "name": "Canção da Melancolia",
            "timing": null,
            "text": "Quando faz um teste de Vontade contra efeitos mentais, o eiradaan guardião rola dois dados e usa o pior resultado."
        },
        {
            "name": "Essência Feérica",
            "timing": null,
            "text": "O eiradaan pode falar com animais livremente."
        },
        {
            "name": "Magia Acelerada",
            "timing": "livre",
            "text": "Uma vez por rodada, quando lança uma magia com execução de ação completa ou menor, o eiradaan muda a execução dela para livre.",
            "cost": "+4 PM"
        },
        {
            "name": "Sentidos Místicos",
            "timing": null,
            "text": "O eiradaan está sempre sob o efeito básico de Visão Mística.",
            "magical": true
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como um feiticeiro de 7º nível (CD 26). O custo total dos aprimoramentos de suas magias diminui em –1 PM (já contabilizado)."
        },
        {
            "name": "Amarras Etéreas",
            "timing": "padrão",
            "text": "Três laços de energia surgem e se enroscam em uma criatura em alcance médio, deixando-a agarrada (Ref evita). A vítima pode tentar se livrar, gastando uma ação padrão para fazer um teste de Atletismo. Se passar, destrói um laço, mais um laço adicional para cada 5 pontos pelos quais superou a CD. Cada laço também pode ser atacado e destruído (Defesa 10, 10 PV, RD 5 e imunidade a dano mágico). Um laço destruído causa 1d8+1 pontos de dano de essência à criatura amarrada. Se todos os laços forem destruídos, a magia é dissipada. Os laços afetam criaturas incorpóreas.",
            "cost": "5 PM"
        },
        {
            "name": "Dissipar Magia",
            "timing": "padrão",
            "text": "O eiradaan escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias nesse alvo com CD igual ou menor que o resultado do teste são dissipadas.",
            "cost": "3 PM"
        },
        {
            "name": "Enfeitiçar",
            "timing": "padrão",
            "text": "Cada humanoide em alcance curto fica enfeitiçado pelo eiradaan até o fim da cena, ou até que ele ou um de seus aliados realize uma ação hostil contra a criatura (Von evita).",
            "cost": "5 PM"
        },
        {
            "name": "Relâmpago",
            "timing": "padrão",
            "text": "O eiradaan lança um relâmpago em cada criatura escolhida em alcance médio, causando 8d8 pontos de dano de eletricidade (Ref reduz à metade).",
            "cost": "6 PM"
        },
        {
            "name": "Velocidade",
            "timing": "padrão",
            "text": "O eiradaan pode executar uma ação padrão adicional por turno, que não pode ser usada para lançar magias.",
            "cost": "3 PM, sustentada"
        }
    ],
    "equipment": "Espada longa de mitral.",
    "treasure": "Padrão.",
    "skillsText": "Atletismo +9, Conhecimento +8, Diplomacia +12, Intuição +10, Misticismo +10, Sobrevivência +10.",
    "role": "special",
    "roleSource": "pdf-review"
};

const eiradaanNobre = {
    "id": "eiradaan-nobre",
    "name": "Eiradaan Nobre",
    "type": "spirit",
    "subtype": "eiradaan",
    "size": "Médio",
    "challengeRating": 13,
    "source": {
        "book": "Deuses de Arton",
        "edition": "1ª edição, maio de 2025 (v1.1)",
        "pdfFile": "T20 Deuses de Arton.pdf",
        "bookPage": 296,
        "pdfPage": 298,
        "bookPageEnd": 297,
        "pdfPageEnd": 299
    },
    "stats": {
        "initiative": 16,
        "perception": 14,
        "defense": 41,
        "fortitude": 14,
        "reflex": 19,
        "will": 26,
        "hitPoints": 470,
        "speedText": "12m (6q)",
        "senses": "visão no escuro",
        "defensesText": "resistência a magia +4, redução de dano 5",
        "attributes": {
            "str": 2,
            "dex": 4,
            "con": 3,
            "int": 2,
            "wis": 4,
            "cha": 6
        },
        "manaPoints": 65
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Espada longa de mitral x2 +35 (4d8+52, 18)."
        }
    ],
    "abilities": [
        {
            "name": "Canção da Melancolia",
            "timing": null,
            "text": "Quando faz um teste de Vontade contra efeitos mentais, o eiradaan nobre rola dois dados e usa o pior resultado."
        },
        {
            "name": "Código de Honra",
            "timing": null,
            "text": "O eiradaan não pode atacar um oponente pelas costas (em termos de jogo, não pode se beneficiar do bônus de flanquear), caído, desprevenido ou incapaz de lutar."
        },
        {
            "name": "Duelo",
            "timing": "livre",
            "text": "O eiradaan escolhe um oponente em alcance curto e recebe +2 em testes de ataque e rolagens de dano contra ele até o fim da cena ou até atacar outro oponente.",
            "cost": "2 PM"
        },
        {
            "name": "Montaria Celestial",
            "timing": null,
            "text": "O eiradaan cavalga um gamo celestial, um parceiro montaria Grande. Enquanto estiver montado, seu deslocamento se torna 15m e ele recebe uma ação de movimento extra (apenas para se deslocar)."
        },
        {
            "name": "Sentidos Místicos",
            "timing": null,
            "text": "O eiradaan está sempre sob o efeito básico de Visão Mística.",
            "magical": true
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como um feiticeiro de 13º nível (CD 37). Ele pode lançar magias montado sem precisar de testes de concentração e o custo total dos aprimoramentos de suas magias diminui em –1 PM (já contabilizado)."
        },
        {
            "name": "Concentração de Combate",
            "timing": "padrão",
            "text": "Até o fim da cena, quando faz um ataque, o eiradaan rola dois dados e usa o melhor resultado. Quando um oponente ataca o eiradaan nobre, rola dois dados e usa o pior resultado.",
            "cost": "7 PM"
        },
        {
            "name": "Libertação",
            "timing": "padrão",
            "text": "O eiradaan fica imune a efeitos de movimento e ignora qualquer efeito que impeça ou restrinja seu deslocamento.",
            "cost": "9 PM"
        },
        {
            "name": "Relâmpago",
            "timing": "padrão",
            "text": "O eiradaan lança um relâmpago em cada criatura escolhida em alcance médio, causando 16d8 pontos de dano de eletricidade (Ref reduz à metade).",
            "cost": "15 PM"
        },
        {
            "name": "Selo de Mana",
            "timing": "padrão",
            "text": "Um selo mágico se manifesta em uma criatura adjacente até o fim da cena. Sempre que ela fizer qualquer ação que gaste PM, deve fazer um teste de Vontade. Se passar, a ação funciona. Se falhar, a ação não tem efeito, mas os PM são gastos mesmo assim.",
            "cost": "6 PM"
        },
        {
            "name": "Velocidade",
            "timing": "padrão",
            "text": "O eiradaan pode executar uma ação padrão adicional por turno, que não pode ser usada para lançar magias.",
            "cost": "3 PM, sustentada"
        }
    ],
    "equipment": "Espada longa de mitral.",
    "treasure": "Padrão.",
    "skillsText": "Cavalgar +16, Conhecimento +14, Diplomacia +18, Intuição +14, Misticismo +14, Sobrevivência +14.",
    "role": "special",
    "roleSource": "pdf-review"
};

// Deuses de Arton, p. 299. Estas regras se aplicam aos seis gênios.
const genieAbilities = [
    {
        name: "Dentro de uma Lampadazinha",
        timing: null,
        text: "A cada dia sem um pacto ativo, o total de PM do gênio diminui em 1 PM. Ao chegar a 0 PM dessa forma, ele sofre um efeito debilitante definido pelo mestre, como ficar Minúsculo ou preso em um objeto. O efeito e a perda de PM são revertidos quando firma um pacto."
    },
    {
        name: "Poderes Cósmicos Fenomenais",
        timing: "completa",
        text: "O gênio firma um pacto com uma criatura voluntária em alcance curto com Int –3 ou maior. Ela se torna seu amo, e o gênio se torna seu parceiro iniciante. Enquanto o gênio estiver presente na cena, suas próprias habilidades mágicas custam 1 PM a menos. Só pode ter um amo por vez e pode encerrar o pacto com uma ação completa."
    },
    {
        name: "Servo dos Deuses",
        timing: null,
        text: "O gênio pode lançar Viagem Planar sem componente material, apenas em si mesmo."
    }
];

const yazzu = {
    "id": "yazzu",
    "name": "Yazzu",
    "type": "spirit",
    "subtype": "gênio",
    "size": "Grande",
    "challengeRating": 10,
    "source": {
        "book": "Deuses de Arton",
        "edition": "1ª edição, maio de 2025 (v1.1)",
        "pdfFile": "T20 Deuses de Arton.pdf",
        "bookPage": 299,
        "pdfPage": 301
    },
    "stats": {
        "initiative": 14,
        "perception": 5,
        "defense": 31,
        "fortitude": 23,
        "reflex": 18,
        "will": 10,
        "hitPoints": 292,
        "speedText": "9m (6q), natação 12m (8q), voo 12m (8q)",
        "senses": null,
        "defensesText": "imunidade a encantamento e frio",
        "attributes": {
            "str": 3,
            "dex": 5,
            "con": 2,
            "int": 1,
            "wis": 0,
            "cha": 3
        },
        "manaPoints": 72
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Tridente x2 +25 (1d10+18 mais 1d6 frio)."
        },
        {
            "name": "À Distância",
            "text": "Tridente +23 (1d10+18 mais 1d6 frio)."
        }
    ],
    "abilities": [
        ...genieAbilities,
        {
            "name": "Contracorrente",
            "timing": "reação",
            "text": "Quando faz um ataque à distância com seu tridente, o yazzu se teleporta para um espaço livre adjacente ao alvo.",
            "cost": "3 PM"
        },
        {
            "name": "Onda Poderosa",
            "timing": "padrão",
            "text": "O yazzu cria uma onda que ocupa um quadrado de 6m de lado em alcance médio. Criaturas na área são empurradas 6m em uma direção à escolha do yazzu e sofrem 8d10 pontos de dano de impacto (Fort CD 32 reduz à metade e evita o empurrão)."
        },
        {
            "name": "Turbilhão",
            "timing": "padrão",
            "text": "O yazzu faz uma manobra derrubar com seu tridente (teste +29) contra todas as criaturas adjacentes a ele."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como um feiticeiro de 12º nível (CD 32)."
        },
        {
            "name": "Área Escorregadia",
            "timing": "padrão",
            "text": "Criaturas numa área de 3m de lado em alcance curto devem passar em um teste de Reflexos (CD 32) para não cair. Nas rodadas seguintes, criaturas que tentem se movimentar pela área devem fazer testes de Acrobacia para equilíbrio (CD 15).",
            "cost": "1 PM"
        },
        {
            "name": "Controlar Água",
            "timing": "padrão",
            "text": "Até o fim da cena, o yazzu controla a água em uma esfera de 30m em alcance longo ( Tormenta20, p. 186).",
            "cost": "6 PM"
        },
        {
            "name": "Criar Elementos",
            "timing": "padrão",
            "text": "O yazzu preenche um espaço Colossal com água, ou cria um cubo Colossal de gelo. Alternativamente, ele pode criar objetos simples feitos de gelo.",
            "cost": "6 PM"
        },
        {
            "name": "Dardo Gélido",
            "timing": "padrão",
            "text": "Uma criatura em alcance curto sofre 8d6 pontos de dano de frio e fica lenta por 1 rodada (Fort reduz à metade e evita a condição).",
            "cost": "7 PM"
        },
        {
            "name": "Salto Dimensional",
            "timing": "reação",
            "text": "O yazzu recebe +5 na Defesa e em testes de Reflexos contra um ataque ou efeito que esteja prestes a atingi-lo. Após a resolução do efeito, ele salta para um espaço adjacente desocupado.",
            "cost": "5 PM"
        }
    ],
    "equipment": "Tridente aumentado banhado a ouro.",
    "treasure": "Padrão.",
    "skillsText": "Atletismo +12, Diplomacia +18, Furtividade +14, Ladinagem +14, Misticismo +12.",
    "role": "special",
    "roleSource": "pdf-review"
};

const jairuan = {
    "id": "jairuan",
    "name": "Jairuan",
    "type": "spirit",
    "subtype": "gênio",
    "size": "Grande",
    "challengeRating": 6,
    "source": {
        "book": "Deuses de Arton",
        "edition": "1ª edição, maio de 2025 (v1.1)",
        "pdfFile": "T20 Deuses de Arton.pdf",
        "bookPage": 300,
        "pdfPage": 302
    },
    "stats": {
        "initiative": 10,
        "perception": 5,
        "defense": 21,
        "fortitude": 12,
        "reflex": 16,
        "will": 8,
        "hitPoints": 158,
        "speedText": "9m (6q), voo 12m (8q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a encantamento e eletricidade",
        "attributes": {
            "str": 2,
            "dex": 5,
            "con": 3,
            "int": 2,
            "wis": 1,
            "cha": 4
        },
        "manaPoints": 41
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Cimitarra x2 +18 (1d8+10, 18)."
        }
    ],
    "abilities": [
        ...genieAbilities,
        {
            "name": "Vendaval",
            "timing": "movimento",
            "text": "Criaturas em uma área de 3m em alcance médio sofrem 4d8+25 pontos de dano de impacto (Ref CD 22 reduz à metade). Recarga (movimento)."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como um feiticeiro de 6º nível (CD 22)."
        },
        {
            "name": "Enfeitiçar",
            "timing": "padrão",
            "text": "Um humanoide em alcance curto fica enfeitiçado (Von evita).",
            "cost": "1 PM"
        },
        {
            "name": "Invisibilidade",
            "timing": "padrão",
            "text": "O jairuan fica invisível até o fim da cena ou até realizar uma ação hostil. Ele recebe camuflagem total e +10 em testes de Furtividade contra ouvir, e criaturas que não possam vê-lo ficam desprevenidas contra seus ataques.",
            "cost": "5 PM"
        },
        {
            "name": "Relâmpago",
            "timing": "padrão",
            "text": "O jairuan causa 8d6 pontos de dano de eletricidade em todas as criaturas em uma linha de 30m (Ref reduz à metade).",
            "cost": "5 PM"
        }
    ],
    "equipment": "Cimitarra.",
    "treasure": "Padrão.",
    "skillsText": "Atletismo +14, Intimidação +9, Misticismo +9.",
    "role": "special",
    "roleSource": "pdf-review"
};

const gizzehi = {
    "id": "gizzehi",
    "name": "Gizzehi",
    "type": "spirit",
    "subtype": "gênio",
    "size": "Grande",
    "challengeRating": 12,
    "source": {
        "book": "Deuses de Arton",
        "edition": "1ª edição, maio de 2025 (v1.1)",
        "pdfFile": "T20 Deuses de Arton.pdf",
        "bookPage": 301,
        "pdfPage": 303,
        "bookPageEnd": 302,
        "pdfPageEnd": 304
    },
    "stats": {
        "initiative": 13,
        "perception": 12,
        "defense": 39,
        "fortitude": 11,
        "reflex": 27,
        "will": 19,
        "hitPoints": 412,
        "speedText": "Voo 12m (8q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a encantamento e fogo",
        "attributes": {
            "str": -1,
            "dex": 3,
            "con": 2,
            "int": 2,
            "wis": 1,
            "cha": 7
        },
        "manaPoints": 85
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Pancada +27 (1d3+3 mais 8d6 fogo)."
        }
    ],
    "abilities": [
        ...genieAbilities,
        {
            "name": "Magias",
            "timing": null,
            "text": "Como um feiticeiro de 15º nível (CD 35)."
        },
        {
            "name": "Açoite Flamejante",
            "timing": "movimento",
            "text": "Um açoite de fogo surge na mão do gizzehi. Ele pode gastar uma ação padrão para açoitar uma criatura em alcance curto, que sofre 6d8 pontos de dano de fogo e fica em chamas e enredada enquanto estiver em chamas (Ref reduz à metade e evita as condições).",
            "cost": "7 PM, sustentada"
        },
        {
            "name": "Coluna de Chamas",
            "timing": "padrão",
            "text": "Um cilindro de fogo com 3m de raio e 30m de altura desce dos céus em alcance longo, causando 13d6 pontos de dano de fogo mais 6d6 pontos de dano de luz nas criaturas e objetos livres na área (Ref reduz à metade).",
            "cost": "13 PM"
        },
        {
            "name": "Controlar Fogo",
            "timing": "padrão",
            "text": "O gizzehi cria, molda, move ou extingue chamas e emanações de calor em alcance médio ( Tormenta20, p. 187).",
            "cost": "3 PM"
        },
        {
            "name": "Explosão Caleidoscópica",
            "timing": "padrão",
            "text": "Criaturas em um raio de 6m em alcance curto ficam atordoadas por 1 rodada e enjoadas por 1d4 rodadas (Fort muda para desprevenidas e enjoadas por 1 rodada). Uma criatura só pode ser atordoada por esta magia uma vez por cena. Criaturas com menos de 10 níveis sofrem efeitos variados ( Tormenta20, p. 193).",
            "cost": "10 PM"
        },
        {
            "name": "Marca da Obediência",
            "timing": "padrão",
            "text": "O gizzehi ordena que uma criatura adjacente não ataque ele ou seus aliados até o fim da cena (Von evita). A criatura pode repetir o teste de Vontade em cada um de seus turnos subsequentes mas, se falhar, sofre 3d6 pontos de dano psíquico.",
            "cost": "6 PM"
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": "Diplomacia +19, Enganação +22, Misticismo +14.",
    "role": "special",
    "roleSource": "pdf-review"
};

const allaraz = {
    "id": "allaraz",
    "name": "Allaraz",
    "type": "spirit",
    "subtype": "gênio",
    "size": "Grande",
    "challengeRating": 14,
    "source": {
        "book": "Deuses de Arton",
        "edition": "1ª edição, maio de 2025 (v1.1)",
        "pdfFile": "T20 Deuses de Arton.pdf",
        "bookPage": 302,
        "pdfPage": 304,
        "bookPageEnd": 303,
        "pdfPageEnd": 305
    },
    "stats": {
        "initiative": 17,
        "perception": 11,
        "defense": 44,
        "fortitude": 14,
        "reflex": 22,
        "will": 28,
        "hitPoints": 490,
        "speedText": "12m (8q), voo 15m (10q)",
        "senses": null,
        "defensesText": "imunidade a dano de luz, resistência a magia +5",
        "attributes": {
            "str": 4,
            "dex": 4,
            "con": 3,
            "int": 2,
            "wis": 4,
            "cha": 8
        },
        "manaPoints": 113
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Pancada x2 +37 (4d8+25, mais 2d6 luz)."
        }
    ],
    "abilities": [
        ...genieAbilities,
        {
            "name": "Contramágica Aprimorada",
            "timing": "reação",
            "text": "Uma vez por rodada, o allaraz faz uma contramágica.",
            "magical": true
        },
        {
            "name": "Proteger Criação",
            "timing": "reação",
            "text": "Uma vez por rodada, quando uma criatura em alcance curto do allaraz sofre dano, ele concede RD 50 a ela contra esse dano.",
            "cost": "10 PM",
            "magical": true
        },
        {
            "name": "Reverter Destruição",
            "timing": "completa",
            "text": "Criaturas em alcance curto à escolha do allaraz que tenham sofrido dano nessa cena recuperam 6d8+6 PV.",
            "cost": "5 PM",
            "magical": true
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como um feiticeiro de 14º nível (CD 40, limite de PM 22)."
        },
        {
            "name": "Dissipar Magia",
            "timing": "padrão",
            "text": "O allaraz escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias nesse alvo com CD igual ou menor que o resultado do teste são dissipadas.",
            "cost": "3 PM"
        },
        {
            "name": "Explosão Caleidoscópica",
            "timing": "padrão",
            "text": "Criaturas numa área de 6m de raio em alcance curto ficam atordoadas por 1 rodada e enjoadas por 1d4 rodadas (Fort muda para desprevenidas e enjoadas por 1 rodada). Criaturas com menos de 10 níveis sofrem efeitos variados ( Tormenta20, p. 193). Uma criatura só pode ser atordoada por esta magia uma vez por cena.",
            "cost": "10 PM"
        },
        {
            "name": "Flecha de Luz*",
            "timing": "padrão",
            "text": "Duas criaturas em alcance médio sofrem 6d8+6 pontos de dano de luz e ficam cegas por 1d4 rodadas, então ofuscadas.",
            "cost": "16 PM"
        },
        {
            "name": "Globo de Invulnerabilidade",
            "timing": "padrão",
            "text": "O allaraz é envolto por uma esfera mágica de 3m que detém qualquer magia de 3º círculo ou menor.",
            "cost": "10 PM, sustentada"
        },
        {
            "name": "Leque Cromático",
            "timing": "padrão",
            "text": "Criaturas em um cone de 4,5m ficam atordoadas por 1 rodada (apenas uma vez por cena, Von anula), ofuscadas e vulneráveis.",
            "cost": "8 PM"
        },
        {
            "name": "Raio Solar",
            "timing": "padrão",
            "text": "Criaturas em uma linha de 30m a partir do allaraz sofrem 10d8 (ou 10d12 se forem mortos-vivos) pontos de dano de luz, ficam cegas por 1d4 rodadas e ofuscadas por uma rodada (Ref reduz à metade e evita as condições).",
            "cost": "18 PM"
        },
        {
            "name": "Selo de Mana",
            "timing": "padrão",
            "text": "Um selo mágico se manifesta em criaturas escolhidas em alcance curto até o fim da cena. Sempre que elas fizerem qualquer ação que gaste PM, devem fazer um teste de Vontade. Se passarem, a ação funciona. Se falharem, a ação não tem efeito, mas os PM são gastos mesmo assim.",
            "cost": "10 PM"
        }
    ],
    "equipment": null,
    "treasure": "Padrão.",
    "skillsText": "Conhecimento +15, Diplomacia +20, Misticismo +20, Religião +17.",
    "role": "special",
    "roleSource": "pdf-review"
};

const kemooz = {
    "id": "kemooz",
    "name": "Kemooz",
    "type": "spirit",
    "subtype": "gênio",
    "size": "Grande",
    "challengeRating": 9,
    "source": {
        "book": "Deuses de Arton",
        "edition": "1ª edição, maio de 2025 (v1.1)",
        "pdfFile": "T20 Deuses de Arton.pdf",
        "bookPage": 304,
        "pdfPage": 306
    },
    "stats": {
        "initiative": 10,
        "perception": 14,
        "defense": 34,
        "fortitude": 21,
        "reflex": 6,
        "will": 15,
        "hitPoints": 280,
        "speedText": "9m (6q), escavação 9m (6q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a encantamento e ácido, redução de dano 10",
        "attributes": {
            "str": 4,
            "dex": 1,
            "con": 5,
            "int": 2,
            "wis": 3,
            "cha": 0
        },
        "manaPoints": 57
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Pancada +25 (2d8+42 mais 6d8 ácido)."
        }
    ],
    "abilities": [
        ...genieAbilities,
        {
            "name": "Terraformista",
            "timing": null,
            "text": "Se o kemooz estiver em contato com o solo, o custo de sua magia Controlar Terra é reduzido à metade (após aplicar aprimoramentos e quaisquer outros efeitos que reduzam seu custo)."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como um feiticeiro de 9º nível (CD 30)."
        },
        {
            "name": "Amarras Etéreas",
            "timing": "padrão",
            "text": "Três laços de energia surgem e se enroscam em uma criatura em alcance médio, deixando-a agarrada (Ref evita). A vítima pode tentar se livrar, gastando uma ação padrão para fazer um teste de Atletismo. Se passar, destrói um laço, mais um laço adicional para cada 5 pontos pelos quais superou a CD. Cada laço também pode ser atacado e destruído (Defesa 10, 10 PV, RD 5 e imunidade a dano mágico). Um laço destruído causa 1d8+1 pontos de dano de essência na criatura amarrada. Se todos os laços forem destruídos, a magia é dissipada. Os laços afetam criaturas incorpóreas.",
            "cost": "6 PM"
        },
        {
            "name": "Controlar Terra",
            "timing": "padrão",
            "text": "O kemooz transforma 9 cubos de terra com 1,5m de lado em alcance longo em uma parede (RD 8 e 50 PV) que fornece cobertura total. Ele pode aplicar outros efeitos aos cubos ( Tormenta20, p. 188).",
            "cost": "9 PM"
        },
        {
            "name": "Jato Corrosivo",
            "timing": "padrão",
            "text": "O kemooz projeta uma linha corrosiva de 9m. Criaturas nessa área sofrem 10d6 pontos de dano de ácido, enquanto construtos e objetos soltos sofrem 10d6+4 pontos de dano (Ref reduz à metade).",
            "cost": "9 PM"
        }
    ],
    "equipment": null,
    "treasure": "Padrão.",
    "skillsText": "Atletismo +14, Misticismo +12.",
    "role": "special",
    "roleSource": "pdf-review"
};

const dabbus = {
    "id": "dabbus",
    "name": "Dabbus",
    "type": "spirit",
    "subtype": "gênio",
    "size": "Grande",
    "challengeRating": 15,
    "source": {
        "book": "Deuses de Arton",
        "edition": "1ª edição, maio de 2025 (v1.1)",
        "pdfFile": "T20 Deuses de Arton.pdf",
        "bookPage": 304,
        "pdfPage": 306,
        "bookPageEnd": 305,
        "pdfPageEnd": 307
    },
    "stats": {
        "initiative": 18,
        "perception": 9,
        "defense": 48,
        "fortitude": 15,
        "reflex": 22,
        "will": 28,
        "hitPoints": 525,
        "speedText": "12m (8q), voo 15m (10q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a trevas, resistência a magia arcana +10",
        "attributes": {
            "str": 3,
            "dex": 5,
            "con": 4,
            "int": 2,
            "wis": 2,
            "cha": 8
        },
        "manaPoints": 98
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Pancada x2 +41 (3d10+25 mais 2d8 trevas)."
        }
    ],
    "abilities": [
        ...genieAbilities,
        {
            "name": "Conduta Dabbus",
            "timing": null,
            "text": "Um dabbus só aceita amos malignos (a critério do mestre) ou devotos de deuses que canalizam apenas energia negativa. Por aceitarem apenas os amos mais cruéis, normalmente não servem a personagens jogadores."
        },
        {
            "name": "Devorar Magia",
            "timing": "reação",
            "text": "Quando passa no teste de resistência contra uma magia da qual foi alvo, o dabbus não sofre nenhum efeito da magia e recupera uma quantidade de PM igual ao valor gasto nela."
        },
        {
            "name": "Magia Acelerada",
            "timing": "livre",
            "text": "Uma vez por rodada, quando lança uma magia com execução de ação completa ou menor, o dabbus muda a execução dela para livre.",
            "cost": "+4 PM"
        },
        {
            "name": "Ódio Ancestral",
            "timing": null,
            "text": "Quando o dabbus reduz os PV de um inimigo a 0 ou menos, recupera metade do dano que causou a esse inimigo."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como um feiticeiro de 15º nível (CD 42)."
        },
        {
            "name": "Crânio Voador de Vladislav",
            "timing": "padrão",
            "text": "Dois crânios de energia negativa causam 6d8+6 pontos de dano de trevas em duas criaturas em alcance médio e deixa os alvos e todas as criaturas a 3m deles abaladas (Fort reduz à metade e evita a condição).",
            "cost": "9 PM"
        },
        {
            "name": "Desintegrar",
            "timing": "padrão",
            "text": "Uma criatura ou objeto em alcance médio sofre 12d12 pontos de dano de essência (Fort reduz para 3d12). Se for reduzido a 0 PV, o alvo vira pó.",
            "cost": "14 PM"
        },
        {
            "name": "Manto das Trevas",
            "timing": "padrão",
            "text": "O dabbus se torna incorpóreo e pode gastar uma ação de movimento e 1 PM para entrar em uma sombra e se teletransportar para outra sombra em alcance médio. Se for exposto à luz solar, sofre 1 ponto de dano por rodada.",
            "cost": "6 PM, sustentada"
        },
        {
            "name": "Tentáculos de Trevas",
            "timing": "padrão",
            "text": "Até o fim da cena, tentáculos surgem em uma esfera de 6m em alcance médio e tentam agarrar todas as criaturas na área. Ao lançar a magia, e no início de cada um de seus turnos, o dabbus faz um teste da manobra agarrar (usando Misticismo) contra cada criatura na área. Se ele passar, a criatura é agarrada; se a vítima já está agarrada, é esmagada, sofrendo 8d6 pontos de dano de trevas (cada tentáculo recebe +15 em sua primeira rolagem de dano). A área conta como terreno difícil e os tentáculos são imunes a dano.",
            "cost": "10 PM"
        },
        {
            "name": "Toque Vampírico",
            "timing": "padrão",
            "text": "O dabbus faz um ataque corpo a corpo. Se acertar, além do dano normal, causa 15d6 pontos de dano de trevas e recupera pontos de vida iguais à metade desse dano de trevas.",
            "cost": "15 PM"
        },
        {
            "name": "Transformação de Guerra",
            "timing": "padrão",
            "text": "O dabbus recebe +6 na Defesa, em testes de ataque e em rolagens de dano corpo a corpo, e 30 PV temporários, mas não pode lançar outras magias.",
            "cost": "6 PM, sustentada"
        },
        {
            "name": "Velocidade",
            "timing": "padrão",
            "text": "O dabbus pode executar uma ação padrão adicional por turno.",
            "cost": "10 PM, sustentada"
        },
        {
            "name": "Vitalidade Fantasma",
            "timing": "padrão",
            "text": "Criaturas vivas em uma esfera com 6m de raio centrada no dabbus sofrem 3d10 pontos de dano de trevas (Fort reduz à metade). O dabbus recebe PV temporários iguais ao dano total causado.",
            "cost": "10 PM"
        }
    ],
    "equipment": null,
    "treasure": "Padrão.",
    "skillsText": "Enganação +21, Intimidação +21, Misticismo +17.",
    "role": "special",
    "roleSource": "pdf-review"
};

const avatarDeAllihannaDeusesDeArton = {
    "id": "avatar-de-allihanna-deuses-de-arton",
    "name": "Avatar de Allihanna",
    "type": "spirit",
    "subtype": null,
    "size": "Enorme",
    "challengeRating": 20,
    "source": {
        "book": "Deuses de Arton",
        "edition": "1ª edição, maio de 2025 (v1.1)",
        "pdfFile": "T20 Deuses de Arton.pdf",
        "bookPage": 155,
        "pdfPage": 157
    },
    "stats": {
        "initiative": 26,
        "perception": 32,
        "defense": 61,
        "fortitude": 20,
        "reflex": 34,
        "will": 28,
        "hitPoints": 1200,
        "speedText": "15m (10q), escalada 15m (6q), escavação 15m (10q), natação 15m (10q), voo 15m (10q), sem redução por terreno difícil natural",
        "senses": "faro, visão no escuro",
        "defensesText": "não pode ser flanqueado, maior que a morte, redução de dano 20, resistência a magia +5",
        "attributes": {
            "str": 8,
            "dex": 8,
            "con": 10,
            "int": 7,
            "wis": 14,
            "cha": 10
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Arsenal natural x4 +54 (especial)."
        }
    ],
    "abilities": [
        {
            "name": "Arsenal Natural",
            "timing": null,
            "text": "Quando faz cada um de seus ataques de Arsenal Natural, o Avatar de Allihanna escolhe uma das armas naturais a seguir. Ele pode escolher a mesma arma múltiplas vezes. • Cauda. Dano 8d12+29, alcance 6m. • Chifres. Dano 10d10+24, ignora 10 pontos de redução de dano do alvo. • Garra. Dano 6d12+31, 19, caso acerte dois ataques de garra em uma mesma criatura no mesmo turno, causa mais 4d12 pontos de dano. • Mordida. Dano 8d12+28, x3, caso acerte, pode fazer a manobra derrubar como uma ação livre (teste +59). • Tentáculo. Dano 6d10+39, caso acerte, pode fazer a manobra agarrar como uma ação livre (teste +59)."
        },
        {
            "name": "Centelha Divina",
            "timing": null,
            "text": "O Avatar pode lançar qualquer magia divina como um clérigo de 20º nível sem gastar PM (CD 49, limite de PM 20). Se estiver em terreno natural, o custo das magias do Avatar é reduzido em –4 PM e a CD para resistir a elas aumenta em +4."
        },
        {
            "name": "Deusa dos Animais",
            "timing": "padrão",
            "text": "Cada animal em alcance médio deve fazer um teste de Vontade (CD 49). Se falhar, fica sob controle do Avatar até o fim da cena. Se o animal for um parceiro, em vez disso o personagem que ele segue faz um teste de Adestramento (CD 40) para evitar o controle. Animais sob controle do Avatar funcionam como parceiros (se um animal não tiver um tipo de parceiro definido, o mestre escolhe o mais adequado), não contam em seu limite de parceiros e seus benefícios são cumulativos."
        },
        {
            "name": "Forma Natural",
            "timing": "completa",
            "text": "O Avatar assume a forma de um animal ou planta a sua escolha de tamanho entre Pequeno e Enorme. Ele recebe +10 em testes de Enganação para se passar por essa criatura, mas seu Arsenal Natural fica limitado às armas compatíveis com a forma escolhida. Suas demais estatísticas não mudam.",
            "magical": true
        },
        {
            "name": "Voz da Natureza",
            "timing": null,
            "text": "O Avatar pode falar com animais (como o efeito da magia Voz Divina).",
            "magical": true
        },
        {
            "name": "Maior que a Morte",
            "timing": null,
            "text": "Enquanto tiver pelo menos metade dos PV, o avatar é imune a efeitos de morte instantânea, inclusive os que aprisionam ou destroem seu corpo ou alma. Dano ou perda de PV ainda pode reduzi-lo a 0 PV ou menos."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": "Adestramento +41, Atletismo +26, Furtividade +26, Intimidação +28, Intuição +32, Misticismo +25, Religião +32, Sobrevivência +35.",
    "role": "solo",
    "roleSource": "pdf-review"
};

const avatarDeArsenalDeusesDeArton = {
    "id": "avatar-de-arsenal-deuses-de-arton",
    "name": "Avatar de Arsenal",
    "type": "spirit",
    "subtype": null,
    "size": "Médio",
    "challengeRating": 18,
    "source": {
        "book": "Deuses de Arton",
        "edition": "1ª edição, maio de 2025 (v1.1)",
        "pdfFile": "T20 Deuses de Arton.pdf",
        "bookPage": 159,
        "pdfPage": 161
    },
    "stats": {
        "initiative": 23,
        "perception": 25,
        "defense": 60,
        "fortitude": 32,
        "reflex": 17,
        "will": 30,
        "hitPoints": 1080,
        "speedText": "12m (8q), voo 12m (8q)",
        "senses": null,
        "defensesText": "cura acelerada 5, imunidade a efeitos mentais e medo, maior que a morte, redução de dano 10, resistência a aventureiros +5",
        "attributes": {
            "str": 14,
            "dex": 6,
            "con": 12,
            "int": 9,
            "wis": 8,
            "cha": 8
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Martelo dos Trovões +49 (8d8+36, 19/x3, mais 8d6 eletricidade), Holy Avenger x2 +49 (6d12+36, 18)."
        }
    ],
    "abilities": [
        {
            "name": "Acessar Arsenal",
            "timing": "padrão",
            "text": "O Avatar de Arsenal troca um dos itens equipados de sua Algibeira Infinita por outro item mágico qualquer (exceto itens únicos, como artefatos). Acessórios fornecem seus benefícios normalmente e surgem acoplados à armadura; eles não precisam ser vestidos ou empunhados. Armas e armaduras substituem as que o avatar estiver usando; substitua apenas os efeitos mágicos dos itens. Se um item tiver uma habilidade com custo em pontos de mana, o Avatar pode usá-la sem gastar PM (limite de PM 18).",
            "magical": true
        },
        {
            "name": "Algibeira Infinita",
            "timing": null,
            "text": "O Avatar tem acesso à imensa coleção de itens mágicos de Arsenal e começa cada cena equipado com um elmo do teletransporte, botas aladas e um anel do sustento ( Tormenta20, Capítulo 8).",
            "magical": true
        },
        {
            "name": "Centelha Divina",
            "timing": null,
            "text": "O Avatar pode lançar qualquer magia divina como um clérigo de 18º nível sem gastar PM (CD 47, limite de PM 18) e pode lançar a magia Soco de Arsenal como ação livre uma vez por rodada."
        },
        {
            "name": "Extinção",
            "timing": "padrão",
            "text": "Uma vez por cena, o Avatar faz um ataque com a Holy Avenger contra uma criatura. Se acertar, a criatura é completamente destruída."
        },
        {
            "name": "Plano de Contingência",
            "timing": "reação",
            "text": "Uma vez por rodada, quando é alvo de um acerto crítico, manobra de combate ou habilidade mágica, o Avatar recebe +10 nos testes para resistir a esse efeito e redução de dano 50 contra qualquer dano que ele cause."
        },
        {
            "name": "Varrer",
            "timing": "livre",
            "text": "Uma vez por rodada, quando o Avatar faz um ataque corpo a corpo e reduz os pontos de vida do alvo a 0 ou menos, pode realizar um ataque adicional contra outra criatura dentro do seu alcance."
        },
        {
            "name": "Maior que a Morte",
            "timing": null,
            "text": "Enquanto tiver pelo menos metade dos PV, o avatar é imune a efeitos de morte instantânea, inclusive os que aprisionam ou destroem seu corpo ou alma. Dano ou perda de PV ainda pode reduzi-lo a 0 PV ou menos."
        }
    ],
    "equipment": "Armadura de Arsenal, Holy Avenger (veja p. 247), Martelo dos Trovões.",
    "treasure": "Padrão, mais quaisquer itens equipados por Algibeira Infinita.",
    "skillsText": "Atletismo +31, Guerra +39, Intimidação +28, Misticismo +26, Pilotagem +23, Religião +25.",
    "role": "solo",
    "roleSource": "pdf-review"
};

const avatarDeAzgherDeusesDeArton = {
    "id": "avatar-de-azgher-deuses-de-arton",
    "name": "Avatar de Azgher",
    "type": "spirit",
    "subtype": null,
    "size": "Médio",
    "challengeRating": "S",
    "source": {
        "book": "Deuses de Arton",
        "edition": "1ª edição, maio de 2025 (v1.1)",
        "pdfFile": "T20 Deuses de Arton.pdf",
        "bookPage": 163,
        "pdfPage": 165
    },
    "stats": {
        "initiative": 25,
        "perception": 40,
        "defense": 58,
        "fortitude": 36,
        "reflex": 25,
        "will": 33,
        "hitPoints": 2752,
        "speedText": "18m (12q), sem redução por terreno difícil",
        "senses": "percepção às cegas (ilimitado)",
        "defensesText": "evasão aprimorada, imunidade a dano de luz, fogo e trevas, maior que a morte, redução de dano 20, resistência a magia +5",
        "attributes": {
            "str": 14,
            "dex": 7,
            "con": 10,
            "int": 10,
            "wis": 14,
            "cha": 10
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Labareda x2 +58 (3d6+38, 15/x3, mais 6d6 fogo) e Raio de Sol x2 +58 (4d8+38 mais 2d12 luz)."
        },
        {
            "name": "À Distância",
            "text": "Mensageiro do Deserto x2 +58 (4d12+45 mais 6d6 fogo em todas as criaturas a até 6m do alvo)."
        }
    ],
    "abilities": [
        {
            "name": "Aquele-que-Tudo-Vê",
            "timing": null,
            "text": "O Avatar de Azgher está sempre sob efeito de Visão da Verdade, com todos os aprimoramentos.",
            "magical": true
        },
        {
            "name": "Centelha Divina",
            "timing": null,
            "text": "O Avatar lança qualquer magia divina como um clérigo de 20º nível sem gastar PM (CD 52, limite de PM 20) e pode lançar Cólera de Azgher uma vez por rodada como uma ação livre."
        },
        {
            "name": "Escaramuça Vigilante",
            "timing": null,
            "text": "Quando se move 6m ou mais, o Avatar recebe +10 na Defesa e em Reflexos, e +3d8 nas rolagens de dano até o início do seu próximo turno. Além disso, pode fazer um ataque com Raio de Sol contra qualquer inimigo que saia do seu alcance."
        },
        {
            "name": "Presença Calorosa",
            "timing": null,
            "text": "No início do turno do Avatar, criaturas à escolha dele em um raio de 30m sofrem 3d6 pontos de dano de fogo. Esse dano só pode ser curado fora dessa área. Metabolismo."
        },
        {
            "name": "Tempestade Solar",
            "timing": "completa",
            "text": "Todas as criaturas em uma esfera de 6m em alcance médio sofrem 100 pontos de dano de essência, todas as magias na área são automaticamente dissipadas e todos os itens mágicos na área, exceto artefatos, viram itens mundanos até o fim da cena (Fort CD 55 reduz à metade e evita o efeito sobre suas magias e itens mágicos). Recarga (movimento).",
            "magical": true
        },
        {
            "name": "Todo Ouro Pertence a Azgher",
            "timing": "padrão",
            "text": "O Avatar absorve todo o ouro em um raio de 30m. Isso inclui tibares de ouro, itens banhados a ouro e quaisquer outros itens de ouro a critério do mestre (Ref CD 52 evita que seus itens sejam absorvidos, mas atrai a ira do Avatar).",
            "magical": true
        },
        {
            "name": "Maior que a Morte",
            "timing": null,
            "text": "Enquanto tiver pelo menos metade dos PV, o avatar é imune a efeitos de morte instantânea, inclusive os que aprisionam ou destroem seu corpo ou alma. Dano ou perda de PV ainda pode reduzi-lo a 0 PV ou menos."
        }
    ],
    "equipment": "Labareda, Mensageiro do Deserto e Raio de Sol.",
    "treasure": "Nenhum.",
    "skillsText": "Acrobacia +25, Diplomacia +31, Intimidação +31,Intuição +35, Misticismo +31, Religião +40, Sobrevivência +35.",
    "role": "solo",
    "roleSource": "pdf-review"
};

const avatarDeHyninnDeusesDeArton = {
    "id": "avatar-de-hyninn-deuses-de-arton",
    "name": "Avatar de Hyninn",
    "type": "spirit",
    "subtype": null,
    "size": "Médio",
    "challengeRating": 19,
    "source": {
        "book": "Deuses de Arton",
        "edition": "1ª edição, maio de 2025 (v1.1)",
        "pdfFile": "T20 Deuses de Arton.pdf",
        "bookPage": 167,
        "pdfPage": 169
    },
    "stats": {
        "initiative": 35,
        "perception": 23,
        "defense": 57,
        "fortitude": 19,
        "reflex": 32,
        "will": 26,
        "hitPoints": 798,
        "speedText": "9m (6q)",
        "senses": null,
        "defensesText": "evasão aprimorada, maior que a morte, não pode ser flanqueado ou surpreendido",
        "attributes": {
            "str": 6,
            "dex": 18,
            "con": 6,
            "int": 13,
            "wis": 6,
            "cha": 16
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Falso Amigo x2 +50 (1d4+30, 19)."
        },
        {
            "name": "À Distância",
            "text": "Falso Amigo +50 (1d4+30, 19)."
        }
    ],
    "abilities": [
        {
            "name": "Ataque Furtivo",
            "timing": null,
            "text": "+10d8."
        },
        {
            "name": "Centelha Divina",
            "timing": null,
            "text": "O Avatar de Hyninn pode lançar qualquer magia divina como um clérigo de 19º nível sem gastar PM (CD 49, limite de PM 19)."
        },
        {
            "name": "Ferramentas Ladinas",
            "timing": null,
            "text": "O Avatar conta como se sempre estivesse empunhando quaisquer ferramentas necessárias para usar suas perícias, como estojo de disfaces, gazuas etc."
        },
        {
            "name": "Forma de Macaco",
            "timing": "completa",
            "text": "O Avatar se transforma em um macaco. Ele adquire tamanho Minúsculo (+5 em Furtividade e –5 em testes de manobra) e recebe deslocamento de escalada 9m. Seu equipamento desaparece (e ele perde seus benefícios) até ele voltar ao normal, mas suas outras estatísticas não são alteradas. A transformação dura indefinidamente, mas termina caso ele faça um ataque, lance uma magia ou gaste uma ação livre para encerrá-la.",
            "magical": true
        },
        {
            "name": "Ladrão Divino",
            "timing": null,
            "text": "O Avatar não sofre penalidade em testes de Furtividade por se mover ao seu deslocamento normal ou por atacar e fazer outras ações chamativas, e pode fazer duas ações de movimento por turno."
        },
        {
            "name": "No Bolso Dói Mais",
            "timing": null,
            "text": "Quando acerta um ataque em corpo a corpo, para cada 1 ponto de dano causado, o Avatar rouba T$ 10 da vítima. Mesmo que o Avatar seja derrotado, há 90% de chance de que esses tibares tenham desaparecido para sempre, pela graça dele mesmo."
        },
        {
            "name": "Roubar Essência",
            "timing": "padrão",
            "text": "O Avatar faz um teste de Ladinagem oposto à Vontade de uma criatura adjacente que não possa percebê-lo. Se passar, rouba uma habilidade do alvo. A habilidade assume a forma de uma moeda. O alvo não pode usar a habilidade roubada até recuperar a moeda. O Avatar não pode roubar mais de uma habilidade por criatura por vez."
        },
        {
            "name": "Roubo Descarado",
            "timing": "reação",
            "text": "Uma vez por criatura por cena, quando uma criatura em alcance curto faz um teste de perícia, o Avatar pode roubar o resultado desse teste. Caso ele faça isso, o teste se torna uma falha e, até o fim da cena, o Avatar pode substituir o resultado do d20 de um dos seus próprios testes pelo resultado do teste roubado."
        },
        {
            "name": "O Deus Certo para o Trabalho",
            "timing": null,
            "text": "Uma vez por rodada, quando faz um ataque furtivo ou usa uma perícia da lista do ladino ( Tormenta20, p. 73), o Avatar recebe +20 nesse teste."
        },
        {
            "name": "Maior que a Morte",
            "timing": null,
            "text": "Enquanto tiver pelo menos metade dos PV, o avatar é imune a efeitos de morte instantânea, inclusive os que aprisionam ou destroem seu corpo ou alma. Dano ou perda de PV ainda pode reduzi-lo a 0 PV ou menos."
        }
    ],
    "equipment": "Falso Amigo.",
    "treasure": "Nenhum.",
    "skillsText": "Atletismo +35, Acrobacia +35, Diplomacia +31, Enganação +41, Furtividade +38, Intuição +21, Investigação +28, Jogatina +31, Ladinagem +38, Ofício (artesão) +33.",
    "role": "special",
    "roleSource": "pdf-review"
};

const avatarDeKhalmyrDeusesDeArton = {
    "id": "avatar-de-khalmyr-deuses-de-arton",
    "name": "Avatar de Khalmyr",
    "type": "spirit",
    "subtype": null,
    "size": "Médio",
    "challengeRating": "S",
    "source": {
        "book": "Deuses de Arton",
        "edition": "1ª edição, maio de 2025 (v1.1)",
        "pdfFile": "T20 Deuses de Arton.pdf",
        "bookPage": 175,
        "pdfPage": 177
    },
    "stats": {
        "initiative": 22,
        "perception": 32,
        "defense": 66,
        "fortitude": 30,
        "reflex": 22,
        "will": 38,
        "hitPoints": 2500,
        "speedText": "12m (8q)",
        "senses": null,
        "defensesText": "imunidade a acertos críticos, efeitos mentais e medo, redução de dano 20, resistência a magia +5, maior que a morte",
        "attributes": {
            "str": 14,
            "dex": 6,
            "con": 16,
            "int": 8,
            "wis": 16,
            "cha": 12
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Rhumnam x4 +58 (6d6+40, 18, mais 6d8 luz)."
        },
        {
            "name": "À Distância",
            "text": "Rhumnam +58 (6d6+40, x4, mais 6d8 luz, alcance médio)."
        }
    ],
    "abilities": [
        {
            "name": "Centelha Divina",
            "timing": null,
            "text": "O Avatar de Khalmyr pode lançar qualquer magia divina como um clérigo de 20º nível sem gastar PM (CD 52, limite de PM 20). Uma vez por rodada, ele pode lançar Círculo da Justiça como ação livre."
        },
        {
            "name": "Cura pelas Mãos",
            "timing": "movimento",
            "text": "O Avatar cura 10d6+10 pontos de vida por luz de uma criatura em alcance curto e remove dela as condições abalado, apavorado, atordoado, cego, doente, exausto, fatigado e surdo.",
            "magical": true
        },
        {
            "name": "“Eu Tenho o Tabuleiro.”",
            "timing": null,
            "text": "O Avatar emana uma aura de ordem de 30m de raio. Cada criatura que comece seu turno dentro da aura deve fazer um teste de Vontade (CD 52). Se falhar, até o fim do seu turno todas as suas rolagens de d20 para testes de perícia são automaticamente 10. Se passar no teste de Vontade, a criatura fica imune a esta habilidade pelo resto da cena."
        },
        {
            "name": "Julgamento dos Culpados",
            "timing": null,
            "text": "Uma criatura culpada de crimes graves ou maligna (a critério do mestre) que comece seu turno na aura de ordem do Avatar fica paralisada (Vont CD 52 muda para apavorada e a criatura não pode mais ser paralisada por esta habilidade pelo resto da cena). Esta habilidade afeta mesmo criaturas imunes a efeitos de medo e de movimento.",
            "magical": true
        },
        {
            "name": "Julgamento dos Inocentes",
            "timing": null,
            "text": "Uma criatura que, a critério do mestre, seja bondosa ou inocente que comece seu turno na aura de ordem do Avatar recebe +6 em testes de ataque e na Defesa, e redução de dano 10.",
            "magical": true
        },
        {
            "name": "Pilar da Criação",
            "timing": "livre",
            "text": "O Avatar recebe +6 na Defesa e redução de dano 30 até o fim da cena ou até encerrar esta habilidade (uma ação livre), mas seu deslocamento é reduzido à metade e ele não pode correr ou fazer investidas."
        },
        {
            "name": "Rhumnam",
            "timing": null,
            "text": "Quando o Avatar acerta um ataque com Rhumnam em uma criatura culpada de crimes graves ou maligna (a critério do mestre), a criatura é completamente destruída. Contra inocentes, os ataques do Avatar com Rhumnam não causam dano. Além disso, enquanto estiver empunhando Rhumnam, o Avatar recebe imunidade a magias arcanas."
        },
        {
            "name": "Ver Além da Mentira",
            "timing": null,
            "text": "O Avatar está permanentemente sob o efeito básico da magia Visão da Verdade.",
            "magical": true
        },
        {
            "name": "Maior que a Morte",
            "timing": null,
            "text": "Enquanto tiver pelo menos metade dos PV, o avatar é imune a efeitos de morte instantânea, inclusive os que aprisionam ou destroem seu corpo ou alma. Dano ou perda de PV ainda pode reduzi-lo a 0 PV ou menos."
        }
    ],
    "equipment": "Balas x20, baluarte anão, Rhumnam.",
    "treasure": "Nenhum.",
    "skillsText": "Cavalgar +24, Conhecimento +30, Diplomacia +38, Guerra +34, Intuição +40, Investigação +34, Nobreza +34, Religião +40.",
    "role": "solo",
    "roleSource": "pdf-review"
};

const avatarDeLenaDeusesDeArton = {
    "id": "avatar-de-lena-deuses-de-arton",
    "name": "Avatar de Lena",
    "type": "spirit",
    "subtype": null,
    "size": "Médio",
    "challengeRating": 20,
    "source": {
        "book": "Deuses de Arton",
        "edition": "1ª edição, maio de 2025 (v1.1)",
        "pdfFile": "T20 Deuses de Arton.pdf",
        "bookPage": 179,
        "pdfPage": 181
    },
    "stats": {
        "initiative": 22,
        "perception": 34,
        "defense": 59,
        "fortitude": 28,
        "reflex": 20,
        "will": 34,
        "hitPoints": 900,
        "speedText": "12m (8q)",
        "senses": "visão no escuro",
        "defensesText": "cura acelerada 20, imunidade a cansaço, efeitos de metabolismo, medo, necromancia e trevas, redução de dano 20",
        "attributes": {
            "str": 6,
            "dex": 6,
            "con": 12,
            "int": 8,
            "wis": 18,
            "cha": 14
        }
    },
    "actions": [],
    "abilities": [
        {
            "name": "Abençoar a Chegada",
            "timing": null,
            "text": "Se o Avatar de Lena estiver presente durante o nascimento de uma criatura, o parto transcorre sem nenhum problema. Além disso, ela chega a Arton sob as bênçãos de saúde e graça da deusa e recebe +1 em Constituição e Carisma.",
            "magical": true
        },
        {
            "name": "Aura de Vida",
            "timing": null,
            "text": "O Avatar emite uma aura de luz de 30m. No início de cada turno dele, todas as criaturas nessa área curam 50 PV."
        },
        {
            "name": "Centelha Divina",
            "timing": null,
            "text": "O Avatar lança qualquer magia divina como um clérigo de 20º nível sem gastar PM (CD 51, limite de PM 40). Ele jamais usa magias que causam dano ou perda de PV, nem magias que aumentem o dano letal de seus aliados."
        },
        {
            "name": "Transferir Vitalidade",
            "timing": "livre",
            "text": "Uma vez por rodada, o Avatar gasta qualquer quantidade dos seus pontos de vida para curar dano ou condições de criaturas em alcance curto, à taxa de 1 PV por 1 ponto de vida curado ou 3 PV por condição removida, entre abalado, apavorado, alquebrado, atordoado, cego, confuso, debilitado, enjoado, esmorecido, exausto, fascinado, fatigado, fraco, frustrado, ofuscado, pasmo, sangrando, surdo ou vulnerável.",
            "magical": true
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": "Cura +39, Diplomacia +35, Intuição +34, Misticismo +26, Religião +39.",
    "role": "special",
    "roleSource": "pdf-review"
};

const avatarDeLinWuDeusesDeArton = {
    "id": "avatar-de-lin-wu-deuses-de-arton",
    "name": "Avatar de Lin-Wu",
    "type": "spirit",
    "subtype": "dragão",
    "size": "Enorme",
    "challengeRating": 19,
    "source": {
        "book": "Deuses de Arton",
        "edition": "1ª edição, maio de 2025 (v1.1)",
        "pdfFile": "T20 Deuses de Arton.pdf",
        "bookPage": 183,
        "pdfPage": 185
    },
    "stats": {
        "initiative": 29,
        "perception": 35,
        "defense": 56,
        "fortitude": 19,
        "reflex": 27,
        "will": 33,
        "hitPoints": 1284,
        "speedText": "15m (10q), voo 30m (20q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a atordoamento, efeitos de metabolismo, eletricidade, ilusão, medo, metamorfose e paralisia, redução de dano 30, resistência a magia +5",
        "attributes": {
            "str": 12,
            "dex": 12,
            "con": 10,
            "int": 8,
            "wis": 18,
            "cha": 10
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Kaminari x2 +54 (36+36 corte, 17/x3, mais 30 eletricidade) e duas garras +52 (24+16, 18)."
        }
    ],
    "abilities": [
        {
            "name": "Centelha Divina",
            "timing": null,
            "text": "O Avatar de Lin-Wu lança qualquer magia divina como um clérigo de 19º nível sem gastar PM (CD 48, limite de PM 19). Uma vez por rodada, ele pode lançar Fúria do Panteão como uma ação livre. Alternativamente, se você tiver o suplemento Ameaças de Arton, em vez disso ele lança Katana Celestial (p. 404)."
        },
        {
            "name": "Dragão Divino",
            "timing": null,
            "text": "O avatar tem as habilidades dos dragões celestiais. Magia Celestial dispensa palavras mágicas, gestos, concentração e componentes materiais. Metamorfose Celestial (Completa) funciona como Metamorfose, sem limitação para formas menores; o dragão morto volta à forma original. Presença Celestial afeta criaturas que começam o turno em alcance longo de um dragão celestial adulto ou mais velho: apavoradas até o fim da cena se tiverem até 4 níveis, ou abaladas com 5 níveis ou mais. Criaturas com código de conduta, assim como devotos de Khalmyr ou Lin-Wu, ficam fascinadas. Vontade evita e concede imunidade por um dia. Veja o quadro Habilidades de Dragões Celestiais, p. 270."
        },
        {
            "name": "Explosão de Relâmpagos",
            "timing": null,
            "text": "Quando o Avatar acerta um ataque com Kaminari, outras criaturas a 6m do alvo desse ataque sofrem de 30 pontos de dano de eletricidade (Ref CD 49 reduz à metade).",
            "magical": true
        },
        {
            "name": "Kiai Celestial",
            "timing": null,
            "text": "O Avatar sempre causa dano máximo, sem necessidade de rolar dados (já contabilizado)."
        },
        {
            "name": "Mil Cortes",
            "timing": "completa",
            "text": "O Avatar faz um ataque com Kaminari em um cone de 30m. Ele faz um único ataque e compara o resultado com a Defesa de todas as criaturas na área. Então faz uma única rolagem de dano e aplica-a em cada inimigo atingido. Caso o ataque seja um acerto crítico, o Avatar pode usar esta habilidade uma segunda vez. Recarga (movimento)."
        },
        {
            "name": "Punir a Desonra",
            "timing": null,
            "text": "Quando ataca uma criatura que possui um código de conduta (como Código de Honra ou devoção a alguma divindade) e que, a critério do mestre, não esteja obedecendo a esse código, o Avatar rola dois dados e escolhe o melhor resultado."
        }
    ],
    "equipment": "Kaminari.",
    "treasure": "Nenhum.",
    "skillsText": "Atletismo +29, Conhecimento +28, Guerra +28, Intimidação +27, Intuição +35, Nobreza +33, Religião +38.",
    "role": "solo",
    "roleSource": "pdf-review"
};

const avatarDeMarahDeusesDeArton = {
    "id": "avatar-de-marah-deuses-de-arton",
    "name": "Avatar de Marah",
    "type": "spirit",
    "subtype": null,
    "size": "Médio",
    "challengeRating": 19,
    "source": {
        "book": "Deuses de Arton",
        "edition": "1ª edição, maio de 2025 (v1.1)",
        "pdfFile": "T20 Deuses de Arton.pdf",
        "bookPage": 187,
        "pdfPage": 189
    },
    "stats": {
        "initiative": 27,
        "perception": 29,
        "defense": 48,
        "fortitude": 29,
        "reflex": 36,
        "will": 42,
        "hitPoints": 789,
        "speedText": "9m (6q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a atordoamento, efeitos mentais e medo, maior que a morte, redução de dano 10, resistência a magia +5",
        "attributes": {
            "str": 6,
            "dex": 10,
            "con": 8,
            "int": 8,
            "wis": 12,
            "cha": 20
        }
    },
    "actions": [],
    "abilities": [
        {
            "name": "Bênção da Calmaria",
            "timing": null,
            "text": "O Avatar de Marah emana uma aura de calmaria de 30m. Qualquer criatura nessa área que tente executar uma ação hostil deve fazer um teste de Vontade (CD 53). Se falhar, perde a ação. Se passar, pode agir normalmente, mas perde 2d6 PM ao fim do seu turno. Caso os PM da criatura sejam reduzidos a 0 por esta habilidade, ela fica enfeitiçada e perde a vontade de lutar por 1 dia.",
            "magical": true
        },
        {
            "name": "Coração Gentil",
            "timing": null,
            "text": "Quando faz um teste de uma perícia baseada em Sabedoria ou Carisma, o Avatar rola dois dados e usa o melhor resultado."
        },
        {
            "name": "Centelha Divina",
            "timing": null,
            "text": "O Avatar pode lançar qualquer magia divina como um clérigo de 19º nível sem gastar PM (CD 49, 53 para encantamento e ilusão, limite de PM 20). Uma vez por rodada, ele pode lançar Enfeitiçar como ação livre."
        },
        {
            "name": "Faça Amor, Não Faça Guerra",
            "timing": null,
            "text": "Qualquer criatura dentro da Bênção da Calmaria do Avatar que aceitar encerrar um conflito de maneira pacífica recebe +3 PM por nível até o fim da aventura. Esses bônus desaparecem caso a criatura execute qualquer ação hostil."
        },
        {
            "name": "Incitar Paixão",
            "timing": "padrão",
            "text": "O Avatar e todos os seus aliados em alcance médio recebem +5 em testes de perícia e 40 PM temporários até o fim da cena. Qualquer criatura que executar uma ação hostil perde esses bônus.",
            "magical": true
        },
        {
            "name": "Música da Calmaria",
            "timing": null,
            "text": "O Avatar possui todos os poderes de Música de Bardo e pode usá-los sem gastar PM."
        },
        {
            "name": "Maior que a Morte",
            "timing": null,
            "text": "Enquanto tiver pelo menos metade dos PV, o avatar é imune a efeitos de morte instantânea, inclusive os que aprisionam ou destroem seu corpo ou alma. Dano ou perda de PV ainda pode reduzi-lo a 0 PV ou menos."
        }
    ],
    "equipment": "Pandeiro aprimorado, Véu do Desejo.",
    "treasure": "Nenhum.",
    "skillsText": "Acrobacia +27, Atuação +45, Conhecimento +25, Diplomacia +40, Enganação +35, Intuição +29, Misticismo +25, Religião +29.",
    "role": "special",
    "roleSource": "pdf-review"
};

const avatarDoOceanoDeusesDeArton = {
    "id": "avatar-do-oceano-deuses-de-arton",
    "name": "Avatar do Oceano",
    "type": "spirit",
    "subtype": null,
    "size": "Médio",
    "challengeRating": "S",
    "source": {
        "book": "Deuses de Arton",
        "edition": "1ª edição, maio de 2025 (v1.1)",
        "pdfFile": "T20 Deuses de Arton.pdf",
        "bookPage": 199,
        "pdfPage": 201
    },
    "stats": {
        "initiative": 34,
        "perception": 28,
        "defense": 65,
        "fortitude": 36,
        "reflex": 30,
        "will": 22,
        "hitPoints": 2500,
        "speedText": "12m (8q), natação 36m (24q)",
        "senses": "percepção às cegas (longo)",
        "defensesText": "imunidade a acertos críticos, fogo, frio, queda e precipitações ( Tormenta20, p. 267), redução de dano 20",
        "attributes": {
            "str": 12,
            "dex": 8,
            "con": 16,
            "int": 8,
            "wis": 12,
            "cha": 8
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Dente do Leviatã x4 +58 (4d8+50, mais 4d12 frio)."
        },
        {
            "name": "À Distância",
            "text": "Jato d’água x6 +58 (2d12+35 impacto mais 2d12 frio, alcance longo)."
        }
    ],
    "abilities": [
        {
            "name": "Caçador Submarino",
            "timing": null,
            "text": "Quando faz um teste de perícia em um ambiente aquático, o Avatar do Oceano rola dois dados e usa o melhor resultado."
        },
        {
            "name": "Centelha Divina",
            "timing": null,
            "text": "O Avatar pode lançar qualquer magia divina como um clérigo de 20º nível sem gastar PM (CD 51, limite de PM 20). Se estiver em terreno aquático, o custo de suas magias é reduzido em –4 PM e a CD para resistir a elas aumenta em +4."
        },
        {
            "name": "Dominar as Tempestades",
            "timing": "completa",
            "text": "O Avatar pode alterar o clima em uma esfera de 2 km ao seu redor (como o efeito básico da magia Controlar o Clima).",
            "magical": true
        },
        {
            "name": "Forma Animal",
            "timing": "completa",
            "text": "O Avatar adquire a forma de um monstro marinho gigantesco. Ele recebe +5 em Força e na Defesa, seu ataque corpo a corpo muda para mordida +58 (4d12+25) e pancada x8 +54 (4d12+20) e seu tamanho muda para Colossal. Nessa forma, ele não pode falar, mas pode lançar magias."
        },
        {
            "name": "Golpe Tempestuoso",
            "timing": "livre",
            "text": "Uma criatura atingida por um ataque corpo a corpo do Avatar é empurrada 1,5m para cada 5 pontos de dano que sofrer (Fort CD 51 evita)."
        },
        {
            "name": "Mar em Fúria",
            "timing": "completa",
            "text": "Se estiver no mar, o Avatar invoca um maremoto em uma esfera de 30 de raio. Criaturas nessa área sofrem 15d10 pontos de dano, metade frio e metade impacto, e são tragadas para dentro do mar (Fort CD 51 reduz à metade e evita ser tragado). Uma criatura tragada afunda 1,5m para cada 5 pontos de dano sofrido. Recarga (movimento)."
        },
        {
            "name": "Onda Colossal",
            "timing": "completa",
            "text": "O Avatar inunda uma esfera com 15m de raio em alcance médio de uma fonte de água salgada em alcance longo. A área se torna um corpo de água salgada que conta como terreno difícil para criaturas sem deslocamento de natação."
        },
        {
            "name": "Voz das Marés",
            "timing": null,
            "text": "O Avatar pode falar com animais, espíritos, humanoides e monstros marinhos (como o efeito da magia Voz Divina)."
        }
    ],
    "equipment": "Dente do Leviatã.",
    "treasure": "Dobro.",
    "skillsText": "Adestramento +34, Atletismo +33, Diplomacia +29, Intimidação +29, Religião +33, Sobrevivência +38.",
    "role": "solo",
    "roleSource": "pdf-review"
};

const avatarDeSszzaasDeusesDeArton = {
    "id": "avatar-de-sszzaas-deuses-de-arton",
    "name": "Avatar de Sszzaas",
    "type": "spirit",
    "subtype": null,
    "size": "Médio",
    "challengeRating": 19,
    "source": {
        "book": "Deuses de Arton",
        "edition": "1ª edição, maio de 2025 (v1.1)",
        "pdfFile": "T20 Deuses de Arton.pdf",
        "bookPage": 203,
        "pdfPage": 205
    },
    "stats": {
        "initiative": 34,
        "perception": 30,
        "defense": 59,
        "fortitude": 26,
        "reflex": 30,
        "will": 33,
        "hitPoints": 1007,
        "speedText": "12m (9q)",
        "senses": "visão no escuro",
        "defensesText": "evasão aprimorada, imunidade a veneno, maior que a morte, não pode ser flanqueado ou surpreendido, redução de dano 10",
        "attributes": {
            "str": 7,
            "dex": 14,
            "con": 6,
            "int": 20,
            "wis": 10,
            "cha": 17
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Inoculadora +52 (1d4+31, 15/x4, mais veneno)."
        }
    ],
    "abilities": [
        {
            "name": "Ataque Furtivo",
            "timing": null,
            "text": "+10d8."
        },
        {
            "name": "Centelha Divina",
            "timing": null,
            "text": "O Avatar de Sszzaas pode lançar qualquer magia divina, ou magia arcana de ilusão, como um clérigo de 19º nível sem gastar PM (CD 49, limite de PM 20) usando apenas concentração (veja Magia Discreta em Tormenta20, p. 131). Outros personagens só percebem que ele lançou uma magia se passarem num teste de Misticismo (CD 40)."
        },
        {
            "name": "Falso Amigo",
            "timing": null,
            "text": "Quando usa Disfarce Ilusório para mudar a própria aparência, o Avatar recebe um bônus adicional de +10 nos testes de Enganação. Alternativamente, se você tiver o suplemento Ameaças de Arton, ele pode agir como um falso amigo mestre de qualquer tipo (p. 327)."
        },
        {
            "name": "Manto do Traidor",
            "timing": null,
            "text": "O Avatar pode se esconder mesmo sem camuflagem ou cobertura disponíveis, não sofre penalidade em testes de Furtividade por se mover ao seu deslocamento normal e reduz a penalidade em Furtividade por atacar e fazer outras ações chamativas para –5."
        },
        {
            "name": "Reviravolta",
            "timing": null,
            "text": "O alvo do primeiro ataque do Avatar em cada cena é considerado desprevenido."
        },
        {
            "name": "Senhor da Intriga",
            "timing": null,
            "text": "Quando faz um teste de uma perícia baseada em Inteligência ou Carisma, o Avatar rola dois dados e usa o melhor resultado."
        },
        {
            "name": "Trocar de Pele",
            "timing": "reação",
            "text": "Uma vez por rodada, ao ser alvo de um efeito hostil, o Avatar pode trocar de lugar com uma criatura em alcance médio (Von CD 49 evita). A criatura trocada passa a ser o novo alvo da ação.",
            "magical": true
        },
        {
            "name": "Veneno",
            "timing": null,
            "text": "Peçonha anciã (perde 3d12 pontos de vida por rodada durante 3 rodadas, ignora imunidade a veneno, Fort CD 49 reduz a duração para 1 rodada)."
        },
        {
            "name": "Maior que a Morte",
            "timing": null,
            "text": "Enquanto tiver pelo menos metade dos PV, o avatar é imune a efeitos de morte instantânea, inclusive os que aprisionam ou destroem seu corpo ou alma. Dano ou perda de PV ainda pode reduzi-lo a 0 PV ou menos."
        }
    ],
    "equipment": "Inoculadora.",
    "treasure": "Nenhum.",
    "skillsText": "Acrobacia +31, Conhecimento +40, Diplomacia +34, Enganação +37, Furtividade +31, Intuição +30, Investigação +37, Ladinagem +31, Misticismo +37, Ofício (alquimista) +37.",
    "role": "solo",
    "roleSource": "pdf-review"
};

const avatarDeTannaTohDeusesDeArton = {
    "id": "avatar-de-tanna-toh-deuses-de-arton",
    "name": "Avatar de Tanna-Toh",
    "type": "spirit",
    "subtype": null,
    "size": "Médio",
    "challengeRating": 20,
    "source": {
        "book": "Deuses de Arton",
        "edition": "1ª edição, maio de 2025 (v1.1)",
        "pdfFile": "T20 Deuses de Arton.pdf",
        "bookPage": 207,
        "pdfPage": 209
    },
    "stats": {
        "initiative": 23,
        "perception": 35,
        "defense": 57,
        "fortitude": 27,
        "reflex": 35,
        "will": 41,
        "hitPoints": 953,
        "speedText": "6m (4q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a efeitos mentais e ilusão, maior que a morte, resistência a dano 10",
        "attributes": {
            "str": 6,
            "dex": 6,
            "con": 6,
            "int": 20,
            "wis": 14,
            "cha": 8
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Cajado do poder +54 (1d6+20)."
        }
    ],
    "abilities": [
        {
            "name": "Centelha Divina",
            "timing": null,
            "text": "O Avatar de Tanna-Toh pode lançar qualquer magia arcana ou divina como um conjurador de 19º nível sem gastar PM (CD 51, limite de PM 20). Uma vez por rodada, pode lançar a magia Comando como ação livre."
        },
        {
            "name": "Compartilhar Conhecimento",
            "timing": "movimento",
            "text": "Uma criatura em alcance curto se torna treinada em uma perícia em que não era treinada. Este efeito dura até o fim do dia."
        },
        {
            "name": "Golpe Semântico",
            "timing": null,
            "text": "O Avatar pode substituir testes de Diplomacia e Intimidação por testes de Conhecimento."
        },
        {
            "name": "Mestra da Verdade",
            "timing": null,
            "text": "O Avatar sempre sabe quando alguém está mentindo. Além disso, quando faz um teste de uma perícia baseada em Inteligência ou Sabedoria, ele rola dois dados e escolhe o melhor resultado."
        },
        {
            "name": "Plantar Curiosidade",
            "timing": "padrão",
            "text": "Uma criatura adjacente é infundida de imensa curiosidade e necessidade de cumprir uma tarefa à escolha do Avatar pela próxima semana. Enquanto está nessa missão, o alvo recebe +2 em testes de perícia. O Avatar não pode escolher missões suicidas ou que contrariem as Obrigações & Restrições de Tanna-Toh. A criatura pode recusar a missão — mas, no fim de cada dia em que não se esforçar para cumprir a tarefa, deve fazer um teste de Vontade (CD 51); se falhar, sofre uma penalidade cumulativa de –2 em todos os testes e rolagens.",
            "magical": true
        },
        {
            "name": "Poder das Histórias",
            "timing": "completa",
            "text": "O Avatar retira de sua bolsa um livro da Biblioteca de Tanna-Toh, com histórias tão poderosas que seus personagens escapam das páginas. O Avatar invoca uma ou mais criaturas em alcance curto, cujo ND total somado seja igual ao seu (o mestre pode escolher essas criaturas ou usar as tabelas de encontros aleatórios em Ameaças de Arton, gerando encontros até atingir o ND adequado). As criaturas surgem em alcance curto e agem a partir da próxima rodada, em suas iniciativas."
        },
        {
            "name": "Maior que a Morte",
            "timing": null,
            "text": "Enquanto tiver pelo menos metade dos PV, o avatar é imune a efeitos de morte instantânea, inclusive os que aprisionam ou destroem seu corpo ou alma. Dano ou perda de PV ainda pode reduzi-lo a 0 PV ou menos."
        }
    ],
    "equipment": "Cajado do poder, Robe Professoral.",
    "treasure": "Nenhum.",
    "skillsText": "Atuação +29, Conhecimento +41, Cura +32, Intuição +35, Misticismo +38, Nobreza +38, Religião +35.",
    "role": "special",
    "roleSource": "pdf-review"
};

const avatarDeNimbDeusesDeArton = {
    "id": "avatar-de-nimb-deuses-de-arton",
    "name": "Avatar de Nimb",
    "type": "spirit",
    "subtype": "Nimb",
    "size": "Médio",
    "challengeRating": "S+",
    "source": {
        "book": "Deuses de Arton",
        "edition": "1ª edição, maio de 2025 (v1.1)",
        "pdfFile": "T20 Deuses de Arton.pdf",
        "bookPage": 195,
        "pdfPage": 197
    },
    "stats": {
        "initiative": 31,
        "perception": "1d20+21",
        "defense": 61,
        "fortitude": 27,
        "reflex": 33,
        "will": 39,
        "hitPoints": 4777,
        "speedText": "sorrelfliflar 13,5m (9q; veja Sorrelfliflo Galunflante)",
        "senses": null,
        "defensesText": "imunidade a efeitos de adivinhação, encantamento, metamorfose e mentais, maior que a morte, redução de dano 21",
        "attributes": {
            "str": 9,
            "dex": 11,
            "con": 7,
            "int": 17,
            "wis": "1d20",
            "cha": 13
        }
    },
    "actions": [],
    "abilities": [
        {
            "name": "Aura Caótica Derradeira",
            "timing": null,
            "text": "O Avatar de Nimb emana uma aura de puro Caos capaz de distorcer a própria existência de seus inimigos. No início do turno do Avatar, cada criatura em um raio de 90m perde 8d6 pontos de vida. Cada vez que rolar o valor máximo em um dado de dano da aura, role um dado extra e some ao dano total desta habilidade."
        },
        {
            "name": "Centelha Divina",
            "timing": null,
            "text": "O Avatar pode lançar qualquer magia divina como um clérigo de 19,5º nível sem gastar PM (CD 55, limite de PM 21). Sempre que uma criatura obtém um resultado 1 no dado em um teste de resistência contra uma magia do Avatar, ela fica confusa."
        },
        {
            "name": "“Eu Movo as Peças!”",
            "timing": null,
            "text": "No começo da rodada, o Avatar rola 1d6 e move cada criatura a sua escolha em alcance médio um número de quadrados igual ao resultado, em uma direção a sua escolha."
        },
        {
            "name": "Mimsicais Dados Frumiosos",
            "timing": "padrão",
            "text": "O Avatar faz alguma coisa que gera um efeito inesperado. Role 1d7 e use o efeito correspondente entre os descritos a seguir. 1) Role novamente, escolha outro efeito desta tabela e role novamente. 2) Um guincho metálico ressoa freneticamente. Inimigos em alcance médio sofrem 10d12 pontos de dano de impacto e ficam surdos (Fort CD 55 reduz à metade e evita a condição). 3) O Avatar pega a linha de pensamento de alguém e desfere um golpe com ela. Inimigos em uma linha de 15m sofrem 12d10+10d8 pontos de dano psíquico e ficam confusos (Von CD 55 reduz à metade e evita a condição). 4) Um animal muito fofinho se materializa em pleno ar e abraça o Avatar. Ele (o Avatar, não o animal fofinho) recupera 20d10 PV e cura uma das condições que o esteja afetando. 5) Um dragão de duas cabeças sai de uma das mangas do Avatar e sopra tibares em um cone de 18m (se o Avatar não tinha mangas, uma roupa com mangas se materializa em sua forma… você, hein, se apegando a detalhes!). Cada criatura na área sofre 10d12 pontos de dano de fogo e 10d12 pontos de dano de impacto e recebe uma quantidade de tibares igual ao dano causado (Ref CD 55 reduz o dano e a quantidade de tibares à metade). 6) Todos os efeitos de 2 a 5 ocorrem ao mesmo tempo. 7) Todos os efeitos acima e o Avatar de Nimb ainda ganha um queijo."
        },
        {
            "name": "Ódio ao Previsível",
            "timing": null,
            "text": "O Avatar odeia previsibilidade e pune quem não guarda nenhuma surpresa. Sempre que uma criatura em alcance médio escolher 10 em um teste ou executar a mesma ação que executou em sua rodada anterior, o Avatar causa a ela 10d20 pontos de dano psíquico e a criatura não pode mais executar essa ação ou escolher 10 com essa perícia específica até o fim da cena (Von CD 55 reduz à metade e evita a restrição de ações)."
        },
        {
            "name": "Ou Não",
            "timing": "reação",
            "text": "Uma vez por cena, o Avatar desfaz uma série de acontecimentos recentes. Quando ele usa esta habilidade, todos os eventos da rodada atual são desfeitos (como se nunca tivessem ocorrido) e o presente retorna para o início da rodada anterior do Avatar. Esta habilidade afeta apenas os eventos da cena atual. O resto do mundo segue sua vida feliz mas, para evitar paradoxos incompreensíveis, o restante de Arton fica aguardando pacientemente até que essa rodada seja resolvida e todos retornem ao mesmo momento no tempo (que gentil da parte deles)."
        },
        {
            "name": "Sorrelfliflo Galunflante",
            "timing": null,
            "text": "O Avatar tem todos os deslocamentos que existem nos livros, que existiram em livros passados e que existirão em livros futuros, ou não."
        },
        {
            "name": "Sorte e Azar",
            "timing": null,
            "text": "No final de cada turno do Avatar, role 1d6. Em um valor ímpar, até o início do próximo turno do Avatar todos os sucessos em testes se tornam falhas e todas as falhas se tornam sucessos (para efeito de margens de ameaça e habilidades como Almejar o Impossível, considere que um resultado 1 no d20 equivale a um 20, um 2 equivale a um 19 e assim por diante)."
        },
        {
            "name": "Maior que a Morte",
            "timing": null,
            "text": "Enquanto tiver pelo menos metade dos PV, o avatar é imune a efeitos de morte instantânea, inclusive os que aprisionam ou destroem seu corpo ou alma. Dano ou perda de PV ainda pode reduzi-lo a 0 PV ou menos."
        }
    ],
    "equipment": "Olhe para três itens ao seu redor, que não sejam celulares, computadores ou coisas do tipo. O Avatar tem um de cada desses itens, cada um com três encantos à escolha dele ou com o efeito de um acessório mágico que talvez exista em algum lugar do livro, ou não. E ele tem um queijo.",
    "treasure": "Padrão.",
    "skillsText": "Diplomacia +31, Jogatina +43, mais 1d12 perícias em +13 cada.",
    "role": "solo",
    "roleSource": "pdf-review"
};

const avatarDeThyatisDeusesDeArton = {
    "id": "avatar-de-thyatis-deuses-de-arton",
    "name": "Avatar de Thyatis",
    "type": "spirit",
    "subtype": null,
    "size": "Enorme",
    "challengeRating": 19,
    "source": {
        "book": "Deuses de Arton",
        "edition": "1ª edição, maio de 2025 (v1.1)",
        "pdfFile": "T20 Deuses de Arton.pdf",
        "bookPage": 219,
        "pdfPage": 221
    },
    "stats": {
        "initiative": 25,
        "perception": 36,
        "defense": 59,
        "fortitude": 19,
        "reflex": 32,
        "will": 26,
        "hitPoints": 1140,
        "speedText": "voo 18m (12q)",
        "senses": "visão no escuro",
        "defensesText": "evasão, imunidade a doenças, fogo e medo, maior que a morte, redução de dano 10/trevas",
        "attributes": {
            "str": 12,
            "dex": 8,
            "con": 12,
            "int": 11,
            "wis": 16,
            "cha": 10
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +52 (5d10+30 mais 20d6+30 fogo) e duas garras +52 (5d8+30)."
        }
    ],
    "abilities": [
        {
            "name": "Armas Abençoadas",
            "timing": null,
            "text": "As armas naturais do Avatar de Thyatis são consideradas mágicas e sagradas; elas causam +4d8 pontos de dano contra devotos de deuses que canalizam apenas energia negativa e criaturas malignas (a critério do mestre)."
        },
        {
            "name": "Canto da Fênix",
            "timing": "reação",
            "text": "Quando o Avatar chega a 0 PV ou menos, seu corpo explode. Todas as criaturas em um raio de 30m sofrem 300 pontos de dano de fogo (Fort CD 47 reduz à metade)."
        },
        {
            "name": "Centelha Divina",
            "timing": null,
            "text": "O Avatar pode lançar qualquer magia divina como um clérigo de 19º nível sem gastar PM (CD 47, limite de PM 19). Uma vez por rodada, ele pode lançar Alterar Destino ou Segunda Chance como uma ação livre."
        },
        {
            "name": "Destino Reescrito",
            "timing": null,
            "text": "Uma criatura que morra na presença do Avatar é ressuscitada 1d6 rodadas após sua morte. Pelas próximas 24 horas essa criatura ficará inconsciente, imersa em um sono profundo permeado por visões enviadas por Thyatis. As visões revelam o motivo da presença do Avatar e carregam um comando que deve ser obedecido pela criatura (geralmente, uma missão em nome de Thyatis, definida pelo mestre). Até que a missão seja cumprida, a cada semana em que a criatura não estiver ativamente buscando cumprir a missão, ela recebe uma penalidade cumulativa de –2 em todos os testes."
        },
        {
            "name": "Fogo Purificador",
            "timing": null,
            "text": "Dano de fogo causado pelo Avatar ignora RD, e imunidade a fogo apenas o reduz à metade."
        },
        {
            "name": "Não Há Morte",
            "timing": null,
            "text": "Quando Avatar explode por sua habilidade Canto da Fênix, ressurge no mesmo local, 1d6 rodadas depois. Ele retorna completamente restaurado, mas com apenas metade dos seus pontos de vida iniciais. Ele não pode usar esta habilidade novamente até recuperar todos os seus PV."
        },
        {
            "name": "Telepatia Inata",
            "timing": null,
            "text": "O Avatar pode se comunicar telepaticamente com qualquer criatura em alcance longo."
        },
        {
            "name": "Visão Flamejante",
            "timing": null,
            "text": "O Avatar está permanentemente sob efeito das magias Visão Mística, com o aprimoramento que permite enxergar criaturas e objetos invisíveis, e Visão da Verdade.",
            "magical": true
        },
        {
            "name": "Maior que a Morte",
            "timing": null,
            "text": "Enquanto tiver pelo menos metade dos PV, o avatar é imune a efeitos de morte instantânea, inclusive os que aprisionam ou destroem seu corpo ou alma. Dano ou perda de PV ainda pode reduzi-lo a 0 PV ou menos."
        }
    ],
    "equipment": null,
    "treasure": "Pena flamejante (se o portador da pena morrer, ela é automaticamente consumida e ele é ressuscitado após 1d6 rodadas). Em raras ocasiões, o Avatar pode presentear um aliado com uma dessas penas.",
    "skillsText": "Conhecimento +31, Diplomacia +30, Intuição +36, Religião +33.",
    "role": "solo",
    "roleSource": "pdf-review"
};

const avatarDeValkariaDeusesDeArton = {
    "id": "avatar-de-valkaria-deuses-de-arton",
    "name": "Avatar de Valkaria",
    "type": "spirit",
    "subtype": "humano",
    "size": "Médio",
    "challengeRating": "S+",
    "source": {
        "book": "Deuses de Arton",
        "edition": "1ª edição, maio de 2025 (v1.1)",
        "pdfFile": "T20 Deuses de Arton.pdf",
        "bookPage": 223,
        "pdfPage": 225
    },
    "stats": {
        "initiative": 32,
        "perception": 24,
        "defense": 68,
        "fortitude": 33,
        "reflex": 25,
        "will": 38,
        "hitPoints": 3800,
        "speedText": "18m (12q), sem redução por terreno difícil",
        "senses": null,
        "defensesText": "imunidade a efeitos mentais e de movimento e a medo, maior que a morte, redução de dano 20, resistência a magia +5",
        "attributes": {
            "str": 14,
            "dex": 14,
            "con": 12,
            "int": 10,
            "wis": 6,
            "cha": 15
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Exploradora x4 +65 (8d8+35, 16, mais 6d8 luz)."
        }
    ],
    "abilities": [
        {
            "name": "Alcançar o Infinito",
            "timing": null,
            "text": "Quando o Avatar de Valkaria faz um teste de perícia, um resultado de 17 ou mais no dado sempre é um sucesso, não importando o valor a ser alcançado."
        },
        {
            "name": "Aventureira Mística",
            "timing": "livre",
            "text": "Uma vez por rodada, quando executa uma ação padrão, o Avatar lança uma de suas magias."
        },
        {
            "name": "Centelha Divina",
            "timing": null,
            "text": "O Avatar pode lançar qualquer magia divina como um clérigo de 20º nível sem gastar PM (CD 55, limite de PM 20)."
        },
        {
            "name": "Livre como a Ambição",
            "timing": null,
            "text": "O Avatar pode atravessar objetos sólidos, como paredes, como se fosse intangível."
        },
        {
            "name": "Passo Divino",
            "timing": "livre",
            "text": "Uma vez por rodada, o avatar se move 3m."
        },
        {
            "name": "Mudança Encarnada",
            "timing": null,
            "text": "O Avatar começa cada cena com três habilidades escolhidas entre as descritas a seguir. Ele pode gastar uma ação padrão para trocar uma de suas habilidades por outra que não tenha usado durante a cena, mas apenas se tiver usado cada uma de suas habilidades iniciais pelo menos uma vez na cena. • Aventureira Completa. O Avatar recebe +5 em testes de perícia. • Desafiante Sagrada (Livre, sustentada). O Avatar gera uma aura de 18m ao seu redor. Cada criatura na aura fica intoxicada pelo desejo de aventura e deve escolher entre combater ousadamente (em termos de regras, a criatura escolhe uma restrição como no poder Bravata Imprudente; Tormenta20, p. 48) ou sofrer –5 em testes de perícia e dano enquanto estiver dentro da aura. Se combater ousadamente, a criatura recebe 1 PM temporário cumulativo no início de cada turno em que estiver dentro da aura. • Intervenção Direta (Completa). Uma vez por cena, o Avatar lança até três de suas magias. Após usar esta habilidade, ele fica incapacitado de lançar magias pelas próximas 1d4 rodadas. • Mais Além! (Reação). Uma vez por rodada, quando rola 17 ou mais num d20, o Avatar recebe uma ação completa, mesmo que não seja seu turno. • Mestra Exploradora. Quando se move 12m ou mais, o Avatar recebe +5 na margem de ameaça e +2d10 de dano contra criaturas não humanas. • Realeza Divina (Reação). Uma vez por rodada, o Avatar rola novamente um teste recém-realizado. Ele escolhe qual dos resultados utilizar. • Resiliência Heroica (Reação). Uma vez por cena, quando sofre dano, o Avatar evita esse dano."
        },
        {
            "name": "Maior que a Morte",
            "timing": null,
            "text": "Enquanto tiver pelo menos metade dos PV, o avatar é imune a efeitos de morte instantânea, inclusive os que aprisionam ou destroem seu corpo ou alma. Dano ou perda de PV ainda pode reduzi-lo a 0 PV ou menos."
        }
    ],
    "equipment": "Valkaria costumava empregar como arma pessoal o Desbravador, um mangual mágico, descrito em detalhes na Jornada Heroica A Libertação de Valkaria. No entanto, esse poderoso artefato foi entregue como prêmio a seus Libertadores. Seu Avatar usa agora a Exploradora. Em suas mãos apenas, esta arma causa dano dobrado (já contabilizado). O Avatar de Valkaria também usa trajes mágicos com as mesmas propriedades de uma cota de malha fortificada guardiã que não reduz seu deslocamento e não tem penalidade de armadura.",
    "treasure": "Nenhum.",
    "skillsText": "Acrobacia +32, Atletismo +32, Atuação +33, Diplomacia +33, Intuição +27.",
    "role": "solo",
    "roleSource": "pdf-review"
};

const avatarDeWynnaDeusesDeArton = {
    "id": "avatar-de-wynna-deuses-de-arton",
    "name": "Avatar de Wynna",
    "type": "spirit",
    "subtype": null,
    "size": "Médio",
    "challengeRating": "S",
    "source": {
        "book": "Deuses de Arton",
        "edition": "1ª edição, maio de 2025 (v1.1)",
        "pdfFile": "T20 Deuses de Arton.pdf",
        "bookPage": 227,
        "pdfPage": 229
    },
    "stats": {
        "initiative": 26,
        "perception": 24,
        "defense": 63,
        "fortitude": 22,
        "reflex": 36,
        "will": 30,
        "hitPoints": 1800,
        "speedText": "9m (6q), voo 12m (9q)",
        "senses": null,
        "defensesText": "imunidade a efeitos mentais e itens mundanos, maior que a morte, redução de dano 10, resistência a magia +5",
        "attributes": {
            "str": 6,
            "dex": 8,
            "con": 6,
            "int": 15,
            "wis": 6,
            "cha": 19
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Belo Presente +54 (1d4+11)."
        }
    ],
    "abilities": [
        {
            "name": "Carícia Mágica",
            "timing": "padrão",
            "text": "O Avatar de Wynna pode abençoar uma criatura em alcance curto. A criatura aprende e pode lançar uma magia qualquer de 1º círculo, à escolha do Avatar (atributo-chave escolhido pela criatura entre Inteligência e Carisma).",
            "magical": true
        },
        {
            "name": "Centelha Divina",
            "timing": null,
            "text": "O Avatar pode lançar qualquer magia como um conjurador de 20º nível sem gastar PM (CD 55, limite de PM 30)."
        },
        {
            "name": "Conjuração Tríplice",
            "timing": "completa",
            "text": "O Avatar lança três magias de escolas e círculos diferentes que tenham tempo de conjuração de uma ação padrão ou menor."
        },
        {
            "name": "Metamagia Suprema",
            "timing": "reação",
            "text": "Uma vez por rodada, quando uma magia é lançada a partir de um ponto em alcance longo, o Avatar pode alterar algumas de suas características. Ele pode mudar o tipo de dano da magia, pode escolher se o dano será letal ou não letal e pode mudar o tipo de teste de resistência dela.",
            "magical": true
        },
        {
            "name": "Sem Atalhos",
            "timing": "completa",
            "text": "O Avatar dissipa todos os itens mágicos permanentes em alcance curto. Para cada item dissipado dessa forma, seu portador aprende uma magia de 1º círculo, arcana ou divina, à escolha do Avatar (atributo-chave escolhido pelo portador entre Inteligência e Carisma).",
            "magical": true
        },
        {
            "name": "Visão da Magia",
            "timing": null,
            "text": "O Avatar está sempre sob efeito de Visão Mística, com todos os aprimoramentos.",
            "magical": true
        },
        {
            "name": "Vivificar Magia",
            "timing": "reação",
            "text": "Uma vez por rodada, o Avatar pode anular uma magia lançada em alcance médio. No início do próximo turno do Avatar, essa magia se torna um capanga feitiço vivo que surge em um ponto à escolha do Avatar entre ele e a fonte da magia original. Um feitiço vivo tem Defesa 20, 1 PV, é imune a dano e falha automaticamente em qualquer teste de resistência ou oposto. O Avatar pode gastar uma ação de movimento para fazer todos os feitiços vivos andarem (eles têm deslocamento de voo 12m) ou para dissipá-los. Para cada feitiço vivo que se dissipa dessa forma, o Avatar lança a magia da qual o feitiço se originou (usando suas próprias características), tendo como ponto de origem o espaço onde o feitiço estava quando foi dissipado.",
            "magical": true
        },
        {
            "name": "Maior que a Morte",
            "timing": null,
            "text": "Enquanto tiver pelo menos metade dos PV, o avatar é imune a efeitos de morte instantânea, inclusive os que aprisionam ou destroem seu corpo ou alma. Dano ou perda de PV ainda pode reduzi-lo a 0 PV ou menos."
        }
    ],
    "equipment": "Belo Presente.",
    "treasure": "Nenhum.",
    "skillsText": "Atuação +37, Diplomacia +37, Misticismo +41.",
    "role": "special",
    "roleSource": "pdf-review"
};

const luminar = {
    "id": "luminar-deuses-de-arton",
    "name": "Luminar",
    "type": "spirit",
    "subtype": "celestial",
    "size": "Minúsculo",
    "challengeRating": "–",
    "source": {
        "book": "Deuses de Arton",
        "edition": "1ª edição, maio de 2025 (v1.1)",
        "pdfFile": "T20 Deuses de Arton.pdf",
        "bookPage": 275,
        "pdfPage": 277
    },
    "stats": {
        "initiative": 12,
        "perception": 8,
        "defense": null,
        "fortitude": null,
        "reflex": null,
        "will": null,
        "hitPoints": null,
        "hitPointsText": "—",
        "speedText": "voo 9m (6q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a dano (exceto trevas) e a efeitos de sentidos",
        "attributes": {
            "str": null,
            "dex": 5,
            "con": null,
            "int": -2,
            "wis": 1,
            "cha": 1
        }
    },
    "actions": [],
    "abilities": [
        {
            "name": "Abençoar",
            "timing": "padrão",
            "text": "Criaturas à escolha do luminar em alcance curto recebem +1 em testes de ataque e de resistência até o fim da cena.",
            "magical": true
        },
        {
            "name": "Aliviar",
            "timing": "padrão",
            "text": "O luminar emite uma luz suave que cura 2d8+2 PV de uma criatura em alcance curto.",
            "magical": true
        },
        {
            "name": "Sacrifício",
            "timing": "completa",
            "text": "O luminar se transforma em uma luz forte que aquece um raio de 9m. Criaturas escolhidas pelo luminar nessa área curam 6d8+6 pontos de vida. Após usar esta habilidade, o luminar desaparece para sempre."
        },
        {
            "name": "Ser de Luz",
            "timing": null,
            "text": "O luminar não tem corpo físico e sua manifestação no plano material é apenas uma luz que varia de intensidade, mas que ilumina um raio de 9m. Ele é imune a todos os tipos de dano, exceto trevas, e é destruído quando sofre dano desse tipo."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": "Diplomacia +8, Intuição +8.",
    "role": "special",
    "roleSource": "pdf-review"
};

export const spiritCreatures = [
    luminar,
    avatarDoOceanoDeusesDeArton, avatarDeSszzaasDeusesDeArton, avatarDeTannaTohDeusesDeArton,
    avatarDeNimbDeusesDeArton, avatarDeThyatisDeusesDeArton, avatarDeValkariaDeusesDeArton, avatarDeWynnaDeusesDeArton,
    avatarDeLenaDeusesDeArton, avatarDeLinWuDeusesDeArton, avatarDeMarahDeusesDeArton,
    avatarDeAllihannaDeusesDeArton, avatarDeArsenalDeusesDeArton, avatarDeAzgherDeusesDeArton, avatarDeHyninnDeusesDeArton, avatarDeKhalmyrDeusesDeArton,
    yazzu, jairuan, gizzehi, allaraz, kemooz, dabbus,
    driade, duendeMenor, duendeMaior, dragonete, naiade, ninfa, satiroArqueiro, silfideTravessa, silfideEncantadora, velhaBruxa, eiradaanGuardiao, eiradaanNobre,
    pilly, protetor, shiradi, pegaso, pegasoDeKhalmyr, muhir, orel, furiaExtrema,
    ...divineAspects.filter(aspect => aspect.type === "spirit"),
    aucharai, trioDeCarvarel, diabrete, diabreteNegociante, jhumariel, margharon, rhayrivel, sucubo, abahddon, lamashtu,
    elementalDoVenenoPequeno, elementalDoVenenoMedio, elementalDoVenenoGrande,
    nereida,
    // Manuais, Livro Básico e Ameaças de Arton
    hellHound, aquinne, terrier, pamgra,
    guerreiroDeCHifres, akaOni, daitengu, dragaoCelestialAdulto,
    dragaoCelestialJovem, dragaoCelestialVeneravel, kappaBrigao, kappaYokozuna,
    tenguBandoleiro, rhandomm, corgann, namasqall,
    tPeel, rarvnaak, hallusTir, pakk,
    berBaram, serpentaar, bandoDePamgras, tanaloom,
    elementalCorrompido, oni, stagh, unicornio,
    demonioDaPolvora, totemDaDivinaSerpenteAspectoDeAllihanna, totemDeSaranaAspectoDeMarah, totemDoPaiDeTudoAspectoDeAzgher,
    totemDoReiTiranoAspectoDeMegalokk, avatarDeKallyadranochDivine
];
