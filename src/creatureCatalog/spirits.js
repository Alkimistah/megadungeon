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
        "pdfFile": "ameacas de arton p90-103.pdf",
        "pdfPage": 2,
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
        },
        {
            "name": "Familiar",
            "timing": null,
            "text": "Um aquin’ne familiar concede deslocamento de natação 9m e permite lançar magias e respirar debaixo d’água."
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
        "pdfFile": "ameacas de arton p90-103.pdf",
        "pdfPage": 10,
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
        },
        {
            "name": "Familiar",
            "timing": null,
            "text": "Um terrier familiar concede redução de dano 2/impacto."
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
        "pdfFile": "ameacas de arton p90-103.pdf",
        "pdfPage": 11,
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
        "pdfFile": "ameacas de arton p90-103.pdf",
        "pdfPage": 2,
        "bookPage": 89
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
        "pdfFile": "ameacas de arton p90-103.pdf",
        "pdfPage": 4,
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
        "pdfFile": "ameacas de arton p90-103.pdf",
        "pdfPage": 5,
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
        },
        {
            "name": "Familiar",
            "timing": null,
            "text": "Um t’peel familiar pode carregar 2 espaços de itens e permite que você lance Queda Suave."
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
        "pdfFile": "ameacas de arton p90-103.pdf",
        "pdfPage": 5,
        "bookPage": 92
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
        "pdfFile": "ameacas de arton p90-103.pdf",
        "pdfPage": 7,
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
        "pdfFile": "ameacas de arton p90-103.pdf",
        "pdfPage": 7,
        "bookPage": 94
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
        },
        {
            "name": "Familiar",
            "timing": null,
            "text": "Um pakk familiar permite que você lance Explosão de Chamas. Caso aprenda novamente essa magia, seu custo diminui em –1 PM."
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
        "pdfFile": "ameacas de arton p90-103.pdf",
        "pdfPage": 8,
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
        "pdfFile": "ameacas de arton p90-103.pdf",
        "pdfPage": 9,
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
        "pdfFile": "ameacas de arton p90-103.pdf",
        "pdfPage": 11,
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
        "pdfFile": "ameacas de arton p90-103.pdf",
        "pdfPage": 12,
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
        "pdfFile": "ameacas de arton p90-103.pdf",
        "pdfPage": 14,
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
        "pdfFile": "ameacas de arton p156 ate 169.pdf",
        "pdfPage": 9,
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
    source: { book: "Ameaças de Arton", pdfFile: "prints enviados pelo usuário", pdfPage: null, bookPage: null },
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
        { name: "Aura de Frio", timing: "passiva", text: "No início de cada turno do stagh, todas as criaturas em um raio de 9m sofrem 1d6+3 pontos de dano de frio (Fort CD 17 reduz à metade)." },
        { name: "Familiar", timing: "passiva", text: "Um stagh concede +1 na CD de suas magias de frio." }
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
        "pdfFile": "ameacas de arton p104 ate 124.pdf",
        "pdfPage": 12,
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
        "pdfFile": "ameacas de arton p156 ate 169.pdf",
        "pdfPage": 10,
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
        "pdfFile": "ameacas de arton p156 ate 169.pdf",
        "pdfPage": 11,
        "bookPage": 164
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
        "pdfFile": "ameacas de arton p156 ate 169.pdf",
        "pdfPage": 13,
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
        "pdfFile": "ameacas de arton p156 ate 169.pdf",
        "pdfPage": 12,
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
        "pdfFile": "ameacas de arton p156 ate 169.pdf",
        "pdfPage": 13,
        "bookPage": 166
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
            "text": "O dragão pede para Lin-Wu interceder diretamente. Pode curar todos os PV e condições de até 10 criaturas em alcance longo, dissipar os efeitos de qualquer magia de 4º círculo ou menor ou produzir algo ainda mais poderoso; nesse último caso, exige o sacrifício de 2 PM."
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
        "pdfFile": "ameacas de arton p156 ate 169.pdf",
        "pdfPage": 6,
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
        "pdfFile": "ameacas de arton p156 ate 169.pdf",
        "pdfPage": 6,
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
        "pdfFile": "ameacas de arton p156 ate 169.pdf",
        "pdfPage": 11,
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
        "pdfFile": "ameacas de arton p200 ate 229.pdf",
        "pdfPage": 30,
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
            "text": "O unicórnio toca uma criatura adjacente com seu chifre e usa um dos efeitos a seguir: Curar — a criatura recupera 8d8+8 pontos de vida; Purificar — uma condição negativa ou maldição da criatura é removida; Reviver — a criatura é revivida, desde que tenha morrido há no máximo uma semana."
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
            "text": "O unicórnio se teletransporta para um ponto qualquer em alcance médio. Ele não precisa ver o destino para usar essa habilidade."
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
        "pdfFile": "ameacas de arton p254 ate 272.pdf",
        "pdfPage": 4,
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
        "pdfFile": "ameacas de arton p273 ate 285.pdf",
        "pdfPage": 2,
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
        "pdfFile": "ameacas de arton p273 ate 285.pdf",
        "pdfPage": 1,
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
        "pdfFile": "ameacas de arton p273 ate 285.pdf",
        "pdfPage": 3,
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
        "pdfFile": "ameacas de arton p273 ate 285.pdf",
        "pdfPage": 3,
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

export const spiritCreatures = [
    // Manuais, Livro Básico e Ameaças de Arton
    hellHound, aquinne, terrier, pamgra,
    guerreiroDeCHifres, akaOni, daitengu, dragaoCelestialAdulto,
    dragaoCelestialJovem, dragaoCelestialVeneravel, kappaBrigao, kappaYokozuna,
    tenguBandoleiro, rhandomm, corgann, namasqall,
    tPeel, rarvnaak, hallusTir, pakk,
    berBaram, serpentaar, bandoDePamgras, tanaloom,
    elementalCorrompido, oni, stagh, unicornio,
    demonioDaPolvora, totemDaDivinaSerpenteAspectoDeAllihanna, totemDeSaranaAspectoDeMarah, totemDoPaiDeTudoAspectoDeAzgher,
    totemDoReiTiranoAspectoDeMegalokk
];
