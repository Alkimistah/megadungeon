export const orcCombatant = {
    "id": "orc-combatente",
    "name": "Orc Combatente",
    "type": "humanoid",
    "subtype": "orc",
    "size": "Médio",
    "challengeRating": 0.5,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p32 ate 43.pdf",
        "pdfPage": 4,
        "bookPage": 33
    },
    "stats": {
        "initiative": 4,
        "perception": 1,
        "defense": 14,
        "fortitude": 5,
        "reflex": 3,
        "will": 0,
        "hitPoints": 8,
        "speedText": "9m (6q)",
        "senses": "visão no escuro",
        "defensesText": "sensibilidade a luz",
        "attributes": {
            "str": 4,
            "dex": 1,
            "con": 2,
            "int": -1,
            "wis": -1,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Maça +9 (1d8+7)."
        }
    ],
    "abilities": [],
    "equipment": "Couro batido, maça",
    "treasure": "Metade.",
    "skillsText": null
};

export const orcEnfraquecido = {
    id: "orc-enfraquecido",
    name: "Orc Enfraquecido",
    type: "humanoid",
    subtype: "orc",
    size: "Médio",
    challengeRating: 0.25,
    description: [
        "Um orc faminto, doente ou drenado pela masmorra, ainda perigoso em combate direto, mas sem a disciplina ou vigor de um combatente pleno."
    ],
    source: { book: "Masmorra de Práxis", pdfFile: "reskin-zumbi", pdfPage: null, bookPage: null },
    stats: {
        initiative: -1, perception: -1, defense: 11, fortitude: 3, reflex: -1, will: -1,
        hitPoints: 20,
        speedText: "6m (4q)",
        senses: "visão no escuro",
        defensesText: null,
        attributes: { str: 3, dex: -1, con: 2, int: -5, wis: -1, cha: 0 }
    },
    actions: [
        { name: "Corpo a Corpo", text: "Pancada +7 (1d6+6)." }
    ],
    abilities: [
        { name: "Debilitado", timing: "passiva", text: "O orc enfraquecido sofre o dobro de dano de acertos críticos ou de ataques precisos contra pontos vitais." }
    ],
    equipment: null,
    treasure: "Nenhum.",
    skillsText: null
};

export const orcChief = {
    "id": "orc-chefe",
    "name": "Orc Chefe",
    "type": "humanoid",
    "subtype": "orc",
    "size": "Médio",
    "challengeRating": 2,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p32 ate 43.pdf",
        "pdfPage": 4,
        "bookPage": 33
    },
    "stats": {
        "initiative": 5,
        "perception": 3,
        "defense": 19,
        "fortitude": 13,
        "reflex": 7,
        "will": 2,
        "hitPoints": 66,
        "speedText": "9m (6q)",
        "senses": "visão no escuro",
        "defensesText": "sensibilidade a luz",
        "attributes": {
            "str": 5,
            "dex": 2,
            "con": 4,
            "int": 0,
            "wis": 0,
            "cha": 0
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Machado de batalha +11 (1d8+12, x3)."
        }
    ],
    "abilities": [
        {
            "name": "Urro Selvagem",
            "timing": "movimento",
            "text": "O orc chefe recebe +2 em testes de ataque e rolagens de dano corpo a corpo até o fim da cena, mas não pode fazer nenhuma ação que exija calma e concentração."
        }
    ],
    "equipment": "Gibão de peles, machado de batalha",
    "treasure": "Padrão.",
    "skillsText": "Intimidação +4, Sobrevivência +5 (+7 em subterrâneo)"
};

export const ogre = {
    "id": "ogro",
    "name": "Ogro",
    "type": "humanoid",
    "subtype": "gigante",
    "size": "Grande",
    "challengeRating": 4,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p32 ate 43.pdf",
        "pdfPage": 12,
        "bookPage": 41
    },
    "stats": {
        "initiative": 3,
        "perception": 1,
        "defense": 23,
        "fortitude": 16,
        "reflex": 10,
        "will": 0,
        "hitPoints": 130,
        "speedText": "9m (6q)",
        "senses": "visão na penumbra",
        "defensesText": null,
        "attributes": {
            "str": 7,
            "dex": 0,
            "con": 4,
            "int": -3,
            "wis": -2,
            "cha": -2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Tacape +16 (1d12+18)."
        }
    ],
    "abilities": [
        {
            "name": "Burro Demais…",
            "timing": null,
            "text": "O ogro sofre –5 em testes de Intuição e Vontade (já contabilizados)."
        },
        {
            "name": "…Para Morrer!",
            "timing": null,
            "text": "Todo o dano de corte, impacto e perfuração que o ogro sofre é reduzido à metade."
        }
    ],
    "equipment": "Tacape aumentado",
    "treasure": "Padrão.",
    "skillsText": "Atletismo +12, Intuição –5"
};

export const gnollMarauder = {
    "id": "gnoll-saqueador",
    "name": "Gnoll Saqueador",
    "type": "humanoid",
    "subtype": "gnoll",
    "size": "Médio",
    "challengeRating": 1,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p104 ate 124.pdf",
        "pdfPage": 15,
        "bookPage": 116
    },
    "stats": {
        "initiative": 5,
        "perception": 4,
        "defense": 15,
        "fortitude": 7,
        "reflex": 7,
        "will": 1,
        "hitPoints": 15,
        "speedText": "9m (6q)",
        "senses": "faro",
        "defensesText": null,
        "attributes": {
            "str": 3,
            "dex": 2,
            "con": 3,
            "int": -2,
            "wis": 1,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Lança +10 (1d6+4) e mordida +10 (1d6+4)."
        },
        {
            "name": "À Distância",
            "text": "Arco curto +9 (1d6+3, x3)."
        }
    ],
    "abilities": [],
    "equipment": "Arco curto, flechas x20, lança",
    "treasure": "Metade.",
    "skillsText": null
};

export const gnollFilibuster = {
    "id": "gnoll-filibusteiro",
    "name": "Gnoll Filibusteiro",
    "type": "humanoid",
    "subtype": "gnoll",
    "size": "Médio",
    "challengeRating": 2,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p104 ate 124.pdf",
        "pdfPage": 15,
        "bookPage": 116
    },
    "stats": {
        "initiative": 9,
        "perception": 4,
        "defense": 19,
        "fortitude": 7,
        "reflex": 7,
        "will": 4,
        "hitPoints": 60,
        "speedText": "9m (6q)",
        "senses": "faro",
        "defensesText": null,
        "attributes": {
            "str": 3,
            "dex": 4,
            "con": 3,
            "int": -1,
            "wis": 2,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Espada curta +11 (1d6+4, 19) e mordida +11 (1d6+4)."
        },
        {
            "name": "À Distância",
            "text": "Mosquete +12 (2d8+9, 19/x3)."
        }
    ],
    "abilities": [
        {
            "name": "Recarga Rápida",
            "timing": null,
            "text": "O gnoll filibusteiro pode recarregar seu mosquete como uma ação de movimento."
        }
    ],
    "equipment": "Balas x20, espada curta, mosquete",
    "treasure": "Padrão.",
    "skillsText": null
};

export const orcMutante = {
    "id": "orc-mutante",
    "name": "Orc Mutante",
    "type": "humanoid",
    "subtype": "orc",
    "size": "Médio",
    "challengeRating": 5,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p32 ate 43.pdf",
        "pdfPage": 5,
        "bookPage": 34
    },
    "stats": {
        "initiative": 8,
        "perception": 5,
        "defense": 22,
        "fortitude": 15,
        "reflex": 11,
        "will": 7,
        "hitPoints": 55,
        "speedText": "9m (6q)",
        "senses": "visão no escuro",
        "defensesText": "sensibilidade a luz",
        "attributes": {
            "str": 6,
            "dex": 2,
            "con": 4,
            "int": -2,
            "wis": -2,
            "cha": -2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Machado de guerra +20 (1d12+18, x3) e mordida +20 (1d6+18)."
        }
    ],
    "abilities": [
        {
            "name": "Terceiro Braço",
            "timing": "livre",
            "text": "Se o orc mutante acerta o ataque de machado de guerra e o ataque de mordida em uma mesma criatura na mesma rodada, ele rasga a vítima com seu terceiro braço degenerado, causando mais 1d6+9 pontos de dano de corte."
        }
    ],
    "equipment": "Machado de guerra",
    "treasure": "Padrão.",
    "skillsText": null
};

export const bandido = {
    "id": "bandido",
    "name": "Bandido Comum",
    "type": "humanoid",
    "subtype": "humano",
    "size": "Médio",
    "challengeRating": 0.25,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p44 ate 52.pdf",
        "pdfPage": 2,
        "bookPage": 43
    },
    "stats": {
        "initiative": 4,
        "perception": 1,
        "defense": 13,
        "fortitude": 1,
        "reflex": 3,
        "will": -1,
        "hitPoints": 6,
        "speedText": "9m (6q)",
        "senses": null,
        "defensesText": null,
        "attributes": {
            "str": 1,
            "dex": 2,
            "con": 1,
            "int": 0,
            "wis": -1,
            "cha": 0
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Clava +7 (1d6+3)."
        }
    ],
    "abilities": [],
    "equipment": "Clava",
    "treasure": "Metade.",
    "skillsText": "Furtividade +5"
};

export const chefeBandido = {
    "id": "chefe-bandido",
    "name": "Chefe Bandido",
    "type": "humanoid",
    "subtype": "humano",
    "size": "Médio",
    "challengeRating": 1,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p44 ate 52.pdf",
        "pdfPage": 4,
        "bookPage": 45
    },
    "stats": {
        "initiative": 4,
        "perception": 2,
        "defense": 16,
        "fortitude": 5,
        "reflex": 8,
        "will": 3,
        "hitPoints": 30,
        "speedText": "9m (6q)",
        "senses": null,
        "defensesText": null,
        "attributes": {
            "str": 3,
            "dex": 2,
            "con": 2,
            "int": 0,
            "wis": 0,
            "cha": 1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Espada curta +9 (1d6+5, 19)."
        },
        {
            "name": "À Distância",
            "text": "Adaga +7 (1d4+3, 19)."
        }
    ],
    "abilities": [
        {
            "name": "Ataque Furtivo",
            "timing": null,
            "text": "+2d6."
        }
    ],
    "equipment": "Adaga, espada curta",
    "treasure": "Padrão.",
    "skillsText": "Furtividade +7, Intimidação +6"
};

export const guardaDeCidade = {
    id: "guarda-de-cidade",
    name: "Guarda de Cidade",
    type: "humanoid",
    subtype: "humano",
    size: "Médio",
    challengeRating: 0.5,
    description: [],
    source: {
        "book": "Livro Básico",
        "pdfPage": 4,
        "bookPage": null
    },
    stats: {
        "initiative": 4,
        "perception": 3,
        "defense": 15,
        "fortitude": 5,
        "reflex": 2,
        "will": 1,
        "hitPoints": 8,
        "speedText": "9m (6q)",
        "senses": null,
        "defensesText": null,
        "attributes": {
            "str": 2,
            "dex": 1,
            "con": 2,
            "int": 0,
            "wis": 0,
            "cha": 0
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Maça +7 (1d8+5)."
        }
    ],
    abilities: [],
    equipment: "Apito, couro batido, maça",
    treasure: "Nenhum.",
    skillsText: "Atletismo +5"
};

export const sargentoDaGuarda = {
    id: "sargento-da-guarda",
    name: "Sargento da Guarda",
    type: "humanoid",
    subtype: "humano",
    size: "Médio",
    challengeRating: 1,
    description: [],
    source: {
        "book": "Livro Básico",
        "pdfPage": 4,
        "bookPage": null
    },
    stats: {
        "initiative": 5,
        "perception": 4,
        "defense": 17,
        "fortitude": 9,
        "reflex": 4,
        "will": 3,
        "hitPoints": 28,
        "speedText": "6m (4q)",
        "senses": null,
        "defensesText": null,
        "attributes": {
            "str": 3,
            "dex": 1,
            "con": 2,
            "int": 0,
            "wis": 0,
            "cha": 1
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Maça +10 (1d8+10)."
        },
        {
            "name": "À Distância",
            "text": "Besta leve +9 (1d8+5, 19)."
        }
    ],
    abilities: [
        {
            "name": "Ordens",
            "timing": "movimento",
            "text": "O sargento grita ordens para seus aliados em alcance médio. Eles recebem +2 em testes de perícia até o fim da cena."
        }
    ],
    equipment: "Apito, besta leve, cota de malha, maça, virotes x10. Tesouro Metade",
    treasure: "Metade.",
    skillsText: "Atletismo +7, Intuição +4"
};

export const centauroCombatente = {
    id: "centauro-combatente",
    name: "Centauro Combatente",
    type: "humanoid",
    subtype: "centauro",
    size: "Grande",
    challengeRating: 1,
    description: [],
    source: {
        "book": "Livro Básico",
        "pdfPage": 5,
        "bookPage": null
    },
    stats: {
        "initiative": 3,
        "perception": 3,
        "defense": 16,
        "fortitude": 9,
        "reflex": 2,
        "will": 5,
        "hitPoints": 35,
        "speedText": "12m (8q)",
        "senses": null,
        "defensesText": null,
        "attributes": {
            "str": 5,
            "dex": 2,
            "con": 3,
            "int": -2,
            "wis": 1,
            "cha": -2
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Tacape +9 (1d12+5) e cascos +9 (1d8+5)."
        },
        {
            "name": "À Distância",
            "text": "Arco longo +7 (1d10+5, x3)."
        }
    ],
    abilities: [
        {
            "name": "Investida Poderosa",
            "timing": null,
            "text": "Quando faz uma investida com seu tacape, o centauro causa +1d12 pontos de dano."
        },
        {
            "name": "Medo de Altura",
            "timing": null,
            "text": "Se estiver adjacente a uma queda de 3m ou mais de altura, o centauro fica abalado."
        }
    ],
    equipment: "Arco longo aumentado, flechas x20, tacape aumentado. Tesouro Metade",
    treasure: "Metade.",
    skillsText: "Sobrevivência +5"
};

export const centauroXama = {
    id: "centauro-xama",
    name: "Centauro Xamã",
    type: "humanoid",
    subtype: "centauro",
    size: "Grande",
    challengeRating: 3,
    description: [],
    source: {
        "book": "Livro Básico",
        "pdfPage": 5,
        "bookPage": null
    },
    stats: {
        "initiative": 4,
        "perception": 8,
        "defense": 21,
        "fortitude": 9,
        "reflex": 4,
        "will": 15,
        "hitPoints": 35,
        "manaPoints": 20,
        "speedText": "12m (8q)",
        "senses": null,
        "defensesText": null,
        "attributes": {
            "str": 4,
            "dex": 1,
            "con": 3,
            "int": -1,
            "wis": 4,
            "cha": 0
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Bordão +11 (1d8+4) e cascos +11 (1d8+4)."
        }
    ],
    abilities: [
        {
            "name": "Magias",
            "timing": null,
            "text": "O centauro xamã lança magias como um clérigo de 3º nível (CD 17)."
        },
        {
            "name": "Armamento da Natureza",
            "timing": "movimento",
            "text": "Uma das armas do xamã se torna mágica e seu dano aumenta em um passo (de 1d8 para 1d10).",
            "cost": "3 PM"
        },
        {
            "name": "Controlar Plantas",
            "timing": "padrão",
            "text": "Uma área quadrada de 9m de lado de vegetação em alcance curto se torna terreno difícil. Criaturas na área quando a magia é lançada ou no início de seus próprios turnos ficam enredadas e imóveis (Fortitude evita). Uma vítima pode se libertar com uma ação padrão e um teste de Acrobacia ou Atletismo.",
            "cost": "2 PM"
        },
        {
            "name": "Curar Ferimentos",
            "timing": "padrão",
            "text": "Uma criatura adjacente cura 4d8+4 PV.",
            "cost": "3 PM"
        },
        {
            "name": "Medo de Altura",
            "timing": null,
            "text": "Se estiver adjacente a uma queda de 3m ou mais de altura, o centauro fica abalado."
        },
        {
            "name": "Voz da Natureza",
            "timing": null,
            "text": "O centauro está sempre sob efeito da magia Voz Divina, apenas para falar com animais. e"
        }
    ],
    equipment: "Bordão aumentado, símbolo de Allihanna",
    treasure: "Metade.",
    skillsText: "Religião +8, Sobrevivência +10"
};

export const trog = {
    id: "trog",
    name: "Trog",
    type: "humanoid",
    subtype: "trog",
    size: "Médio",
    challengeRating: 1,
    description: [
        "Quando um destes homens-lagarto decide integrar um grupo de aventureiros, isso é exceção, não regra. Trogs são predadores cruéis, cheios de ódio por todos os outros seres, especialmente anões. Preferem atacar em bandos e agir na escuridão, à noite ou nos subterrâneos. Sua tática padrão é aguardar por vítimas em emboscadas, mantendo-se escondidos com seu poder camaleônico — então atacam à distância com azagaias antes de enfrentar os inimigos restantes corpo a corpo, enfraquecendo-os com seu gás fétido. São atraídos por armas e outros itens feitos de metal, que eles próprios não sabem forjar."
    ],
    source: {
        "book": "Livro Básico",
        "pdfPage": 6,
        "bookPage": null
    },
    stats: {
        "initiative": 3,
        "perception": 0,
        "defense": 16,
        "fortitude": 10,
        "reflex": 5,
        "will": 1,
        "hitPoints": 11,
        "speedText": "9m (6q)",
        "senses": "visão no escuro",
        "defensesText": null,
        "attributes": {
            "str": 3,
            "dex": 1,
            "con": 3,
            "int": -2,
            "wis": 0,
            "cha": -1
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Lança +11 (1d6+5) e mordida +11 (1d6+5)."
        },
        {
            "name": "À Distância",
            "text": "Azagaia +9 (1d6+5)."
        }
    ],
    abilities: [
        {
            "name": "Mau Cheiro",
            "timing": "padrão",
            "text": "O trog expele um gás fétido. Todas as criaturas (exceto trogs) em alcance curto ficam enjoadas por 1d6 rodadas (Fort CD 15 evita). Uma criatura que passe no teste de resistência fica imune a esta habilidade por um dia. Veneno."
        },
        {
            "name": "Sangue Frio",
            "timing": null,
            "text": "O trog sofre 1 ponto de dano adicional por dado de dano de frio."
        }
    ],
    equipment: "Azagaias x2, lança",
    treasure: "Metade.",
    skillsText: "Furtividade +7"
};

export const recrutaPurista = {
    id: "recruta-purista",
    name: "Recruta Purista",
    type: "humanoid",
    subtype: "humano",
    size: "Médio",
    challengeRating: 0.5,
    description: [
        "A ralé do exército purista. São recrutados entre filhos de camponeses — ou entre órfãos, criminosos e outros “indesejados”. Recebem treinamento militar e equipamento abaixo dos padrões da Supremacia, mas ainda superior ao da maior parte do Reinado. São usados em missões menos importantes, como atacar aldeias com poucas defesas, proteger lugares não estratégicos e patrulhar estradas secundárias."
    ],
    source: {
        "book": "Livro Básico",
        "pdfPage": 9,
        "bookPage": null
    },
    stats: {
        "initiative": 3,
        "perception": 0,
        "defense": 16,
        "fortitude": 6,
        "reflex": 2,
        "will": 0,
        "hitPoints": 10,
        "speedText": "6m (4q)",
        "senses": null,
        "defensesText": null,
        "attributes": {
            "str": 2,
            "dex": 1,
            "con": 2,
            "int": -1,
            "wis": -1,
            "cha": 0
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Alabarda +8 (1d10+5, x3)."
        }
    ],
    abilities: [
        {
            "name": "Lutar em Formação",
            "timing": null,
            "text": "Se o recruta estiver adjacente a um aliado que também possua este poder, recebe +2 em testes de ataque e Defesa."
        }
    ],
    equipment: "Alabarda, cota de malha",
    treasure: "Nenhum.",
    skillsText: null
};

export const soldadoPurista = {
    id: "soldado-purista",
    name: "Soldado Purista",
    type: "humanoid",
    subtype: "humano",
    size: "Médio",
    challengeRating: 1,
    description: [
        "A base dos batalhões puristas. São recrutados entre crianças da Supremacia (normalmente entre 10 a 12 anos) e enviados a um dos vários campos militares do reino. Lá aprendem a seguir ordens, a usar o equipamento dos batalhões e a seguir a doutrina purista. É um treino brutal e eficaz. Muitos morrem. Os que sobrevivem se tornam jovens fortes e enrijecidos, repletos de cicatrizes no corpo e na alma. Quando estão chegando à maioridade (15 a 17 anos), são enviados à cidade militar de Warton (ou a outro quartel) para concluir seu treinamento e serem alocados a um batalhão. A etapa final de sua formação é na verdade uma lavagem cerebral que transforma os futuros soldados em máquinas de matar, sem qualquer traço de compaixão ou remorso. Os soldados puristas, tragicamente, possuem pouco de sua tão aclamada humanidade."
    ],
    source: {
        "book": "Livro Básico",
        "pdfPage": 9,
        "bookPage": null
    },
    stats: {
        "initiative": 4,
        "perception": 1,
        "defense": 20,
        "fortitude": 10,
        "reflex": 4,
        "will": 1,
        "hitPoints": 20,
        "speedText": "6m (4q)",
        "senses": null,
        "defensesText": null,
        "attributes": {
            "str": 3,
            "dex": 1,
            "con": 3,
            "int": 0,
            "wis": -1,
            "cha": 0
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Espada bastarda +9 (1d10+9, 19)."
        },
        {
            "name": "À Distância",
            "text": "Besta pesada +7 (1d12+4, 19)."
        }
    ],
    abilities: [
        {
            "name": "Lutar em Formação",
            "timing": null,
            "text": "Se o soldado estiver adjacente a um aliado que também possua este poder, recebe +2 em testes de ataque e Defesa."
        }
    ],
    equipment: "Besta pesada, escudo pesado, espada bastarda, meia armadura, virotes x10. Tesouro Metade",
    treasure: "Metade.",
    skillsText: null
};

export const sargentoMor = {
    id: "sargento-mor",
    name: "Sargento-mor",
    type: "humanoid",
    subtype: "humano",
    size: "Médio",
    challengeRating: 3,
    description: [
        "Sargentos da Supremacia são soldados veteranos e embrutecidos. Por já terem provado seu valor em batalha, recebem o comando de um batalhão, formado por cem soldados. Apesar da promoção, ainda são mais guerreiros do que comandantes e lideram pelo exemplo, avançando à frente de suas tropas (para um oficial estrategista, veja Capitão-Baluarte, a seguir). Seja enfrentando tropas inimigas, seja enfrentando heróis aventureiros, sargentos nunca se abalam; confiam em seu treinamento, em sua experiência e em sua força bruta."
    ],
    source: {
        "book": "Livro Básico",
        "pdfPage": 9,
        "bookPage": null
    },
    stats: {
        "initiative": 4,
        "perception": 3,
        "defense": 24,
        "fortitude": 14,
        "reflex": 9,
        "will": 5,
        "hitPoints": 105,
        "speedText": "6m (4q)",
        "senses": null,
        "defensesText": null,
        "attributes": {
            "str": 4,
            "dex": 1,
            "con": 4,
            "int": 0,
            "wis": 0,
            "cha": 0
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Espada bastarda +14 (1d12+15, 19)."
        },
        {
            "name": "À Distância",
            "text": "Besta pesada +12 (1d12+10, 19)."
        }
    ],
    abilities: [
        {
            "name": "Lutar em Formação",
            "timing": null,
            "text": "Se o sargento-mor estiver adjacente a um aliado que também possua este poder, recebe +2 em testes de ataque e Defesa."
        },
        {
            "name": "Varrer",
            "timing": "livre",
            "text": "Uma vez por rodada, quando o sargento-mor faz um ataque corpo a corpo e reduz os pontos de vida do alvo para 0 ou menos, pode realizar um ataque adicional contra outra criatura dentro do seu alcance."
        }
    ],
    equipment: "Armadura completa, besta pesada, escudo pesado, espada bastarda aumentada certeira, virotes x10. Tesouro Padrão",
    treasure: "Padrão.",
    skillsText: null
};

export const capelaoDeGuerra = {
    "id": "capelao-de-guerra",
    "name": "Capelão de Guerra",
    "type": "humanoid",
    "subtype": "humano",
    "size": "Médio",
    "challengeRating": 4,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p126 ate 145.pdf",
        "pdfPage": 15,
        "bookPage": 141
    },
    "stats": {
        "initiative": 4,
        "perception": 7,
        "defense": 21,
        "fortitude": 10,
        "reflex": 5,
        "will": 16,
        "hitPoints": 105,
        "manaPoints": 25,
        "speedText": "6m (4q)",
        "senses": null,
        "defensesText": "imunidade a medo",
        "attributes": {
            "str": 4,
            "dex": 0,
            "con": 4,
            "int": 1,
            "wis": 3,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Martelo de guerra +14 (1d8+15, x3)."
        }
    ],
    "abilities": [
        {
            "name": "Ódio Puro",
            "timing": null,
            "text": "Como um purista, o capelão de guerra recebe +5 em testes de Vontade quando está seguindo ordens de um superior (qualquer purista com ND maior) e +2 em rolagens de dano contra humanoides não humanos."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como um clérigo de Arsenal de 5º nível (CD 18, limite de PM 5)."
        },
        {
            "name": "Arma Mágica",
            "timing": "padrão",
            "cost": "5 PM",
            "text": "Até o fim da cena, uma arma adjacente se torna mágica, fornecendo +2 nos testes de ataque e rolagens de dano e +1d6 pontos de dano de fogo."
        },
        {
            "name": "Bênção",
            "timing": "padrão",
            "cost": "3 PM",
            "text": "Aliados em alcance curto recebem +2 em testes de ataque e rolagens de dano até o fim da cena."
        },
        {
            "name": "Curar Ferimentos",
            "timing": "padrão",
            "cost": "5 PM",
            "text": "Uma criatura adjacente cura 6d8+6 PV."
        },
        {
            "name": "Soco de Arsenal",
            "timing": "padrão",
            "cost": "5 PM",
            "text": "Uma criatura em alcance médio sofre 5d6+4 pontos de dano de impacto e é empurrada 3m na direção oposta (Fort reduz à metade e evita o empurrão)."
        }
    ],
    "equipment": "Armadura completa, escudo leve, martelo de guerra certeiro, símbolo sagrado",
    "treasure": "Padrão.",
    "skillsText": "Misticismo +5, Religião +7"
};

export const capitaoBaluarte = {
    id: "capitao-baluarte",
    name: "Capitão-Baluarte",
    type: "humanoid",
    subtype: "humano",
    size: "Médio",
    challengeRating: 5,
    description: [
        "Esses oficiais de baixo escalão são escolhidos entre a jovem nobreza da Supremacia e treinados desde a infância para liderar. São combatentes hábeis, mas seu verdadeiro talento está em liderar as investidas de seus subordinados, não em atacar pessoalmente."
    ],
    source: {
        "book": "Livro Básico",
        "pdfPage": 10,
        "bookPage": null
    },
    stats: {
        "initiative": 4,
        "perception": 5,
        "defense": 33,
        "fortitude": 15,
        "reflex": 5,
        "will": 13,
        "hitPoints": 115,
        "speedText": "6m (4q)",
        "senses": null,
        "defensesText": null,
        "attributes": {
            "str": 3,
            "dex": 0,
            "con": 4,
            "int": 3,
            "wis": 1,
            "cha": 4
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Espada longa +17 (1d8+8, 19)."
        }
    ],
    abilities: [
        {
            "name": "Comandar",
            "timing": "padrão",
            "text": "Os aliados em alcance médio do capitão-baluarte recebem +4 em testes de ataque e rolagens de dano até o fim da rodada."
        },
        {
            "name": "Formação Invencível",
            "timing": null,
            "text": "Os aliados em alcance curto do capitão-baluarte recebem +2 na Defesa."
        }
    ],
    equipment: "Armadura completa reforçada, escudo pesado reforçado, espada longa certeira. Tesouro Dobro",
    treasure: "Dobro.",
    skillsText: "Cavalgar +4, Guerra +7, Nobreza +7"
};

export const cavaleiroDeLeopardoSangrento = {
    id: "cavaleiro-do-leopardo-sangrento",
    name: "Cavaleiro do Leopardo Sangrento",
    type: "humanoid",
    subtype: "humano",
    size: "Médio",
    challengeRating: 9,
    description: [
        "Considerados “puristas entre os puristas”, os cavaleiros da Ordem do Leopardo Sangrento são os mais fanáticos combatentes da Supremacia. A sinistra capa com o símbolo da ordem significa que passaram pelo terrível rito de iniciação — sacrificar um não humano com as próprias mãos. Além de atuar como guarda-costas para líderes puristas, os Leopardos também executam missões estratégicas de sabotagem e assassinato."
    ],
    source: {
        "book": "Livro Básico",
        "pdfPage": 10,
        "bookPage": null
    },
    stats: {
        "initiative": 17,
        "perception": 15,
        "defense": 36,
        "fortitude": 21,
        "reflex": 11,
        "will": 17,
        "hitPoints": 270,
        "manaPoints": 58,
        "speedText": "9m (6q)",
        "senses": null,
        "defensesText": "imunidade a medo",
        "attributes": {
            "str": 5,
            "dex": 2,
            "con": 4,
            "int": 4,
            "wis": 0,
            "cha": 2
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Espada bastarda +28 (3d6+15, 19)."
        }
    ],
    abilities: [
        {
            "name": "Cavaleiro Místico",
            "timing": null,
            "text": "O cavaleiro lança magias como um arcanista de 9º nível (CD 28). Ele pode lançar magias arcanas de armadura sem precisar de testes de Misticismo. Uma vez por rodada, quando usa a ação agredir para fazer ataques corpo a corpo, pode lançar uma magia como ação livre (pagando seu custo normal em PM)."
        },
        {
            "name": "Concentração de Combate",
            "timing": "padrão",
            "text": "Até o final da cena, sempre que faz um ataque, o cavaleiro rola dois dados e usa o melhor resultado.",
            "cost": "3 PM"
        },
        {
            "name": "Dissipar Magia",
            "timing": "padrão",
            "text": "O cavaleiro escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias no alvo escolhido com CD menor que o teste são dissipadas.",
            "cost": "3 PM"
        },
        {
            "name": "Pele de Pedra",
            "timing": "padrão",
            "text": "Recebe RD 5 até o final da cena.",
            "cost": "6 PM"
        },
        {
            "name": "Toque Chocante",
            "timing": "padrão",
            "text": "O cavaleiro faz um ataque corpo a corpo. Se acertar, além do dano normal, causa 8d8+8 pontos de dano de eletricidade.",
            "cost": "9 PM"
        },
        {
            "name": "Velocidade",
            "timing": "padrão",
            "text": "O cavaleiro pode executar uma ação padrão adicional por turno, que não pode ser usada para lançar magias.",
            "cost": "3 PM"
        }
    ],
    equipment: "Armadura completa reforçada, espada bastarda aumentada pungente de adamante. Tesouro Padrão",
    treasure: "Padrão.",
    skillsText: "Furtividade +8, Intimidação +17, Misticismo +19"
};

export const necromante = {
    id: "necromante",
    name: "Necromante",
    type: "humanoid",
    subtype: "elfo",
    size: "Médio",
    challengeRating: 7,
    description: [
        "Estes arcanistas especializados em magias de trevas e na conjuração de mortos-vivos nem sempre são vilões. Alguns, bem-intencionados, acreditam firmemente que os mortos são uma força de trabalho valiosa, deixando os vivos livres para se dedicar a disciplinas mentais. Outros, no entanto, utilizam esqueletos e zumbis apenas como recursos para atingir objetivos perversos. Muitos são figuras de autoridade em Aslothia. Um necromante raramente comete a imprudência de ser encontrado sozinho — quase sempre estará acompanhado por esqueletos. Em combate, tentará se manter protegido por seus servos, enquanto usa magias para fortificá-los e incapacitar oponentes."
    ],
    source: {
        "book": "Livro Básico",
        "pdfPage": 13,
        "bookPage": null
    },
    stats: {
        "initiative": 9,
        "perception": 9,
        "defense": 23,
        "fortitude": 7,
        "reflex": 14,
        "will": 20,
        "hitPoints": 180,
        "manaPoints": 55,
        "speedText": "12m (8q)",
        "senses": "visão na penumbra",
        "defensesText": null,
        "attributes": {
            "str": 0,
            "dex": 2,
            "con": 1,
            "int": 5,
            "wis": 0,
            "cha": 0
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Adaga +22 (1d4 mais 1d8 de trevas, 19)."
        }
    ],
    abilities: [
        {
            "name": "Ergam-se!",
            "timing": "completa",
            "text": "O necromante conjura seis mortos-vivos feitos de sombra em espaços desocupados em alcance curto. No turno do necromante, cada morto-vivo pode andar (deslocamento 9m) e causar dano a uma criatura adjacente (2d8 pontos de dano de trevas). Os mortos-vivos têm For 3, Des 3, Defesa 25 e todos os outros atributos nulos; eles têm 1 PV e falham automaticamente em qualquer teste de resistência ou oposto, mas são imunes a atordoamento, dano não letal, doença, encantamento, fadiga, frio, ilusão, paralisia, sono e veneno. e",
            "cost": "5 PM"
        },
        {
            "name": "Sacrificar Servo",
            "timing": "reação",
            "text": "Uma vez por rodada, quando sofre dano, o necromante sacrifica um de seus esqueletos conjurados para reduzir esse dano a 0."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "O necromante lança magias como um arcanista de 7º nível (CD 26, 28 para necromancia*)."
        },
        {
            "name": "Amedrontar*",
            "timing": "padrão",
            "text": "Animais e humanoides a escolha do necromante em alcance curto ficam apavorados por 1d4+1 rodadas e depois abalados (Vontade reduz para abalado).",
            "cost": "7 PM"
        },
        {
            "name": "Armadura Arcana",
            "timing": "padrão",
            "text": "O necromante recebe +7 na Defesa por um dia.",
            "cost": "7 PM"
        },
        {
            "name": "Crânio Voador*",
            "timing": "padrão",
            "text": "Um crânio de energia negativa causa 6d8+6 pontos de dano de trevas em uma criatura em alcance médio e deixa todas as criaturas a 3m do alvo abaladas (Fortitude reduz à metade e evita a condição).",
            "cost": "6 PM"
        },
        {
            "name": "Toque Vampírico*",
            "timing": "padrão",
            "text": "O necromante toca em uma criatura e causa 10d6 pontos de dano de trevas (Fortitude reduz à metade) e recupera pontos de vida iguais à metade do dano causado.",
            "cost": "6 PM"
        }
    ],
    equipment: "",
    treasure: "Dobro.",
    skillsText: "Conhecimento +14, Misticismo +16. Equipamento Adaga, essência de mana. Tesouro Dobro"
};

export const goblinSalteador = {
    id: "goblin-salteador",
    name: "Goblin Salteador",
    type: "humanoid",
    subtype: "goblin",
    size: "Pequeno",
    challengeRating: 0.25,
    description: [
        "Quase sempre subestimados e considerados “fracos”, estes goblins possuem uma ferocidade caótica, sendo máquinas insanas de esfaquear e estripar. Um pequeno bando pode chacinar um povoado humano ou sobrepujar aventureiros novatos; em grandes números, atacando por todos os lados, conseguem derrubar até mesmo heróis experientes."
    ],
    source: {
        "book": "Livro Básico",
        "pdfPage": 15,
        "bookPage": null
    },
    stats: {
        "initiative": 5,
        "perception": 1,
        "defense": 13,
        "fortitude": 2,
        "reflex": 3,
        "will": -1,
        "hitPoints": 4,
        "speedText": "9m (6q), escalada 9m (6q)",
        "senses": "visão no escuro",
        "defensesText": null,
        "attributes": {
            "str": 0,
            "dex": 3,
            "con": 0,
            "int": 0,
            "wis": -1,
            "cha": -1
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Duas adagas +7 (1d4, 19)."
        }
    ],
    abilities: [
        {
            "name": "Frenesi",
            "timing": null,
            "text": "O goblin salteador recebe +2 em testes de ataque e rolagens de dano para cada outro goblin salteador adjacente ao seu alvo."
        }
    ],
    equipment: "Adagas x2",
    treasure: "Padrão.",
    skillsText: null
};

export const hobgoblinSoldado = {
    id: "hobgoblin-soldado",
    name: "Hobgoblin Soldado",
    type: "humanoid",
    subtype: "hobgoblin",
    size: "Médio",
    challengeRating: 2,
    description: [
        "De estatura similar a humanos robustos, hobgoblins são os mais militaristas entre os duyshidakk. Contrariando o que se espera de “humanoides monstruosos”, suas armas e armaduras são de extrema qualidade, assim como suas estratégias de combate. Lutam de forma inteligente e organizada, dividindo suas forças entre infantaria na linha de frente (lutadores corpo a corpo em armaduras pesadas) e artilharia com arcos, bestas ou armas de pólvora dando apoio na retaguarda."
    ],
    source: {
        "book": "Livro Básico",
        "pdfPage": 15,
        "bookPage": null
    },
    stats: {
        "initiative": 4,
        "perception": 1,
        "defense": 19,
        "fortitude": 12,
        "reflex": 7,
        "will": 3,
        "hitPoints": 18,
        "speedText": "6m (4q)",
        "senses": "visão no escuro",
        "defensesText": null,
        "attributes": {
            "str": 4,
            "dex": 2,
            "con": 1,
            "int": 0,
            "wis": 0,
            "cha": -1
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Espada longa +15 (1d8+15, 19)."
        },
        {
            "name": "À Distância",
            "text": "Arco longo +11 (1d8+6, x3)."
        }
    ],
    abilities: [],
    equipment: "Arco longo, cota de malha, escudo pesado, espada longa, flechas x20. Tesouro Padrão",
    treasure: "Padrão.",
    skillsText: "Ofício (armeiro) +2"
};

export const goblinEngenhoqueiro = {
    id: "goblin-engenhoqueiro",
    name: "Goblin Engenhoqueiro",
    type: "humanoid",
    subtype: "goblin",
    size: "Pequeno",
    challengeRating: 3,
    description: [
        "Tidos por muitos como pragas inúteis, os goblins cultivam uma longa “tradição” de transformar sucata em mecanismos e engenhocas de certa utilidade. Ainda que imprevisíveis, estes aparatos se tornaram a marca registrada da raça e encontraram um espaço entre as lanças e escudos das hordas goblinoides."
    ],
    source: {
        "book": "Livro Básico",
        "pdfPage": 15,
        "bookPage": null
    },
    stats: {
        "initiative": 5,
        "perception": 2,
        "defense": 19,
        "fortitude": 3,
        "reflex": 15,
        "will": 9,
        "hitPoints": 74,
        "speedText": "9m (6q), escalada 9m (6q)",
        "senses": "visão no escuro",
        "defensesText": null,
        "attributes": {
            "str": 0,
            "dex": 2,
            "con": 2,
            "int": 3,
            "wis": -1,
            "cha": 0
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Adaga +8 (1d4+3, 19)."
        },
        {
            "name": "À Distância",
            "text": "Besta leve +9 (1d8+3, 19)."
        }
    ],
    abilities: [
        {
            "name": "Engenhocas",
            "timing": "padrão",
            "text": "O goblin engenhoqueiro faz um teste de Ofício (engenhoqueiro) contra CD 15 para ativar uma de suas engenhocas. Para cada engenhoca, a CD aumenta em +5 a cada nova ativação no mesmo dia. Se passar no teste, a engenhoca é ativada. Se falhar, ela enguiça e não pode mais ser usada nesta cena."
        },
        {
            "name": "Asa de Bambu",
            "timing": null,
            "text": "O engenhoqueiro recebe deslocamento de voo 12m até o fim da cena."
        },
        {
            "name": "Cospe-chamas",
            "timing": null,
            "text": "Produz um cone de chamas de 9m. Criaturas na área sofrem 6d6 pontos de dano de fogo e ficam em chamas (Reflexos CD 19 reduz o dano à metade e evita a condição)."
        },
        {
            "name": "Gritador",
            "timing": null,
            "text": "Produz um ruído ensurdecedor. Todas as criaturas em alcance curto escolhidas pelo goblin engenhoqueiro sofrem −2 em testes de ataque e rolagens de dano até o fim da cena."
        }
    ],
    equipment: "Adaga, besta leve, instrumentos de Ofício (engenhoqueiro), virotes x10. Tesouro Padrão",
    treasure: "Padrão.",
    skillsText: "Furtividade +7, Ofício (engenhoqueiro) +10"
};

export const arautoDeThwor = {
    id: "arauto-de-thwor",
    name: "Arauto de Thwor",
    type: "humanoid",
    subtype: "humano",
    size: "Médio",
    challengeRating: 4,
    description: [
        "Após conhecer a história de sofrimento e opressão dos duyshidakk, não é espantoso que outros povos experimentem afinidade com sua causa. Hoje Thwor não é servido apenas por goblinoides, mas também por humanos e outras raças! Aceitos como irmãos pelos duyshidakk e abraçando suas tradições, estes clérigos assumem a missão sagrada de criar O Mundo Como Deve Ser e transformar Arton na utopia selvagem pregada por seu deus."
    ],
    source: {
        "book": "Livro Básico",
        "pdfPage": 16,
        "bookPage": null
    },
    stats: {
        "initiative": 5,
        "perception": 8,
        "defense": 23,
        "fortitude": 10,
        "reflex": 4,
        "will": 16,
        "hitPoints": 135,
        "manaPoints": 26,
        "speedText": "6m (4q)",
        "senses": null,
        "defensesText": null,
        "attributes": {
            "str": 3,
            "dex": 1,
            "con": 3,
            "int": 0,
            "wis": 4,
            "cha": 0
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Machado de guerra +16 (3d6+12, x3)."
        }
    ],
    abilities: [
        {
            "name": "O Mundo como Ele É",
            "timing": "reação",
            "text": "Quando erra um ataque, o arauto de Thwor pode repetir o teste de ataque. Ele pode usar esta habilidade uma vez contra cada oponente a cada cena."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "O arauto de Thwor lança magias como um clérigo de 4º nível (CD 18)."
        },
        {
            "name": "Amedrontar",
            "timing": "padrão",
            "text": "Um animal ou humanoide em alcance curto fica apavorado por 1d4+1 rodadas e depois abalado (Vontade reduz para abalado apenas).",
            "cost": "3 PM"
        },
        {
            "name": "Curar Ferimentos",
            "timing": "padrão",
            "text": "O arauto cura 5d8+5 PV de uma criatura adjacente.",
            "cost": "4 PM"
        },
        {
            "name": "Perdição",
            "timing": "padrão",
            "text": "Criaturas escolhidas em alcance curto sofrem –1 em testes de ataque e rolagens de dano até o fim da cena.",
            "cost": "1 PM"
        }
    ],
    equipment: "Machado de guerra, símbolo de Thwor",
    treasure: "Padrão.",
    skillsText: "Intimidação +9, Religião +8"
};

export const hobgoblinMagoDeBatalha = {
    id: "hobgoblin-mago-de-batalha",
    name: "Hobgoblin Mago de Batalha",
    type: "humanoid",
    subtype: "hobgoblin",
    size: "Médio",
    challengeRating: 5,
    description: [
        "No passado remoto, durante a Infinita Guerra contra os elfos, todos os hobgoblins odiavam e desprezavam magia — justamente por ser “coisa de elfo”. Mais tarde, no entanto, integrar a Aliança Negra e derrotar Lenórienn trouxe uma atitude mais pragmática. Após pilharem os tomos arcanos élficos, muitos hobgoblins passariam a dominar conjurações com efeitos destrutivos."
    ],
    source: {
        "book": "Livro Básico",
        "pdfPage": 16,
        "bookPage": null
    },
    stats: {
        "initiative": 5,
        "perception": 4,
        "defense": 17,
        "fortitude": 11,
        "reflex": 5,
        "will": 17,
        "hitPoints": 120,
        "manaPoints": 35,
        "speedText": "9m (6q)",
        "senses": "visão no escuro",
        "defensesText": null,
        "attributes": {
            "str": 3,
            "dex": 1,
            "con": 3,
            "int": 4,
            "wis": 0,
            "cha": -1
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Espada longa +14 (1d8+3, 19)."
        }
    ],
    abilities: [
        {
            "name": "Arcano de Batalha",
            "timing": null,
            "text": "O hobgoblin mago de batalha soma sua Inteligência (+4) nas rolagens de dano com magias."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "O hobgoblin mago de batalha lança magias como um mago de 5º nível (CD 22)."
        },
        {
            "name": "Amedrontar",
            "timing": "padrão",
            "text": "Um animal ou humanoide em alcance curto fica apavorado por 1d4+1 rodadas e depois abalado (Vontade reduz para abalado apenas).",
            "cost": "3 PM"
        },
        {
            "name": "Armadura Arcana",
            "timing": "padrão",
            "text": "O hobgoblin recebe +6 na Defesa por um dia.",
            "cost": "5 PM"
        },
        {
            "name": "Bola de Fogo",
            "timing": "padrão",
            "text": "O hobgoblin cria uma poderosa explosão em alcance médio que causa 8d6+5 pontos de dano de fogo em todas as criaturas em um raio de 6m (Reflexos reduz à metade).",
            "cost": "5 PM"
        },
        {
            "name": "Concentração de Combate",
            "timing": "livre",
            "text": "Quando faz um ataque, o hobgoblin rola dois dados e usa o melhor resultado.",
            "cost": "1 PM"
        },
        {
            "name": "Toque Vampírico",
            "timing": "padrão",
            "text": "O hobgoblin faz um ataque com sua espada longa. Se acertar, além do dano da arma ele causa 6d6+5 pontos de dano de trevas e recupera pontos de vida iguais à metade desse dano de trevas.",
            "cost": "5 PM"
        }
    ],
    equipment: "Espada longa, essência de mana",
    treasure: "Padrão.",
    skillsText: "Guerra +9, Misticismo +9, Ofício (armeiro) +11"
};

export const devoradorDeMedos = {
    id: "devorador-de-medos",
    name: "Devorador de Medos",
    type: "humanoid",
    subtype: "bugbear",
    size: "Médio",
    challengeRating: 8,
    description: [
        "Bugbears são crueldade e violência em forma de carne. Para estas criaturas, o maior prazer é aterrorizar e o segundo maior é matar (após aterrorizar). Entre estes seres assustadores, os mestres absolutos do pavor são os devoradores de medos. Devoradores de medos podem literalmente farejar o medo, algo tão intoxicante para eles quanto o álcool é para humanos. Isso os leva a acuar vítimas apavoradas, até o momento em que decidem desferir o golpe mortal. Não há prazer em golpear o guarda de milícia pelas costas, antes que ele perceba qualquer perigo; o devorador de medos prefere abalar a coragem da vítima aos poucos, rosnando ameaças nas sombras, fazendo-a procurar inutilmente em volta, até fugir em pânico. Então ele ataca. E mata."
    ],
    source: {
        "book": "Livro Básico",
        "pdfPage": 18,
        "bookPage": null
    },
    stats: {
        "initiative": 11,
        "perception": 9,
        "defense": 31,
        "fortitude": 21,
        "reflex": 15,
        "will": 8,
        "hitPoints": 325,
        "speedText": "9m (6q)",
        "senses": "faro, visão no escuro",
        "defensesText": "imunidade a medo",
        "attributes": {
            "str": 5,
            "dex": 3,
            "con": 3,
            "int": 0,
            "wis": 1,
            "cha": 0
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Machado de guerra x2 +26 (1d12+20, x3)."
        }
    ],
    abilities: [
        {
            "name": "Apavorar",
            "timing": "movimento",
            "text": "O devorador de medos faz um teste de Intimidação oposto pela Vontade de todas as criaturas a sua escolha em alcance médio. Criaturas que falhem ficam abaladas pela cena; criaturas que falhem por 10 ou mais ficam apavoradas por 1d4 rodadas e abaladas pela cena. O devorador de medos não pode usar esta habilidade mais de uma vez na mesma criatura na mesma cena."
        },
        {
            "name": "Artesão do Medo",
            "timing": null,
            "text": "Quando faz um teste de Intimidação, o devorador de medos rola dois dados e usa o melhor resultado."
        },
        {
            "name": "Medo Inebriante",
            "timing": null,
            "text": "O devorador de medos sofre metade do dano de ataques e efeitos de criaturas abaladas ou apavoradas. Além disso, enquanto estiver em alcance médio de uma criatura abalada ou apavorada, ele recebe um bônus em testes de perícia e rolagens de dano corpo a corpo igual à penalidade causada pela condição. Quando acerta um ataque corpo a corpo em uma dessas criaturas, o devorador recebe uma quantidade de PV temporários igual a essa penalidade."
        }
    ],
    equipment: "Machado de guerra cruel",
    treasure: "Metade.",
    skillsText: "Furtividade +13, Intimidação +14"
};

export const sombraDeThwor = {
    id: "sombra-de-thwor",
    name: "Sombra de Thwor",
    type: "humanoid",
    subtype: "hobgoblin",
    size: "Médio",
    challengeRating: 9,
    description: [
        "Muitas vezes lembrados por sua força física e aparência brutal, hobgoblins são também humanoides ágeis e furtivos, capazes de agir confortavelmente nas sombras. Dentre estes, os sombras de Thwor são os mais habilidosos espiões e assassinos. Seja no comando astuto de forças goblinoides, seja em missões solo para eliminar alguma figura de destaque, eles seguem enganando e confundindo os humanos, que esperam enfrentar um monstro rosnador — e acabam apunhalados por um matador silencioso."
    ],
    source: {
        "book": "Livro Básico",
        "pdfPage": 18,
        "bookPage": null
    },
    stats: {
        "initiative": 17,
        "perception": 10,
        "defense": 33,
        "fortitude": 15,
        "reflex": 21,
        "will": 9,
        "hitPoints": 295,
        "speedText": "9m (6q)",
        "senses": "visão no escuro",
        "defensesText": null,
        "attributes": {
            "str": 5,
            "dex": 5,
            "con": 5,
            "int": 2,
            "wis": 2,
            "cha": 0
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Duas machadinhas +27 (1d6+12 mais veneno, x3)."
        },
        {
            "name": "À Distância",
            "text": "Duas machadinhas +27 (1d6+12 mais 2d12 veneno, x3)."
        }
    ],
    abilities: [
        {
            "name": "Assassinar",
            "timing": "movimento",
            "text": "O sombra de Thwor analisa uma criatura em alcance curto. Em seu primeiro Ataque Furtivo que causar dano a ela até o fim do seu próximo turno, ele dobra os dados de dano do Ataque Furtivo."
        },
        {
            "name": "Ataque Furtivo",
            "timing": null,
            "text": "Uma vez por rodada, o sombra de Thwor causa +7d6 pontos de dano com ataques corpo a corpo, ou à distância em alcance curto, contra alvos desprevenidos ou que ele esteja flanqueando."
        },
        {
            "name": "Evasão Aprimorada",
            "timing": null,
            "text": "Quando sofre um efeito que permite um teste de Reflexos para reduzir o dano à metade, o sombra de Thwor não sofre dano algum se passar e sofre apenas metade do dano se falhar."
        },
        {
            "name": "Um com as Sombras",
            "timing": null,
            "text": "O sombra de Thwor nunca fica surpreendido ou flanqueado e não sofre penalidades por se mover com seu deslocamento normal enquanto usa Furtividade."
        },
        {
            "name": "Veneno",
            "timing": null,
            "text": "Perde 2d12 pontos de vida por rodada durante 3 rodadas (Fort CD 26 reduz para uma rodada)."
        }
    ],
    equipment: "Couro batido ajustado, machadinhas atrozes x4, peçonha potente x1d4. Tesouro Padrão",
    treasure: "Padrão.",
    skillsText: "Acrobacia +15, Atletismo +13, Furtividade +18, Intimidação +9, Ladinagem +15, Ofício (armeiro) +12"
};

export const nagahGuardiao = {
    id: "nagah-guardiao",
    name: "Nagah Guardião",
    type: "humanoid",
    subtype: "nagah",
    size: "Médio",
    challengeRating: 3,
    description: [],
    source: {
        "book": "Livro Básico",
        "pdfPage": 20,
        "bookPage": null
    },
    stats: {
        "initiative": 6,
        "perception": 3,
        "defense": 21,
        "fortitude": 6,
        "reflex": 11,
        "will": 9,
        "hitPoints": 45,
        "speedText": "9m (6q)",
        "senses": null,
        "defensesText": "resistência a veneno +5",
        "attributes": {
            "str": 4,
            "dex": 3,
            "con": 2,
            "int": 0,
            "wis": 0,
            "cha": 0
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Duas cimitarras +14 (1d6+6, 18) e cauda +14 (1d6+6)."
        }
    ],
    abilities: [
        {
            "name": "Fraquezas Ofídias",
            "timing": null,
            "text": "O nagah guardião sofre 1 ponto de dano adicional para cada dado de dano de frio e –5 em testes de resistência contra Músicas de Bardo."
        }
    ],
    equipment: "Cimitarras x2",
    treasure: "Padrão.",
    skillsText: "Enganação +4, Furtividade +6"
};

export const nagahMistica = {
    id: "nagah-mistica",
    name: "Nagah Mística",
    type: "humanoid",
    subtype: "nagah",
    size: "Médio",
    challengeRating: 6,
    description: [],
    source: {
        "book": "Livro Básico",
        "pdfPage": 20,
        "bookPage": null
    },
    stats: {
        "initiative": 8,
        "perception": 6,
        "defense": 20,
        "fortitude": 6,
        "reflex": 12,
        "will": 18,
        "hitPoints": 160,
        "manaPoints": 35,
        "speedText": "9m (6q)",
        "senses": null,
        "defensesText": "resistência a veneno +5",
        "attributes": {
            "str": 1,
            "dex": 3,
            "con": 2,
            "int": 4,
            "wis": 2,
            "cha": 2
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Adaga +18 (1d6+6, 19) e cauda +18 (1d6+6)."
        }
    ],
    abilities: [
        {
            "name": "Magia Acelerada",
            "timing": "livre",
            "text": "Uma vez por rodada, quando lança uma magia com execução de ação completa ou menor, a nagah mística muda a execução dela para livre.",
            "cost": "4 PM"
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "A nagah mística lança magias como uma maga de 8º nível (CD 24)."
        },
        {
            "name": "Imagem Espelhada",
            "timing": "padrão",
            "text": "Cinco cópias ilusórias da nagah surgem ao seu redor, concedendo a ela +10 na Defesa. Cada vez que um ataque erra a nagah, uma das cópias desaparece e o bônus na Defesa diminui em 2.",
            "cost": "5 PM"
        },
        {
            "name": "Relâmpago",
            "timing": "padrão",
            "text": "A nagah causa 8d6 pontos de dano de eletricidade em todas as criaturas em uma linha com alcance médio (Reflexos reduz à metade).",
            "cost": "5 PM"
        },
        {
            "name": "Velocidade",
            "timing": "padrão",
            "text": "A nagah pode executar uma ação padrão adicional por turno, que não pode ser usada para lançar magias.",
            "cost": "3 PM"
        },
        {
            "name": "Fraquezas Ofídias",
            "timing": null,
            "text": "Como o nagah guardião."
        }
    ],
    equipment: "Adaga, essência de mana",
    treasure: "Padrão.",
    skillsText: "Conhecimento +10, Enganação +9, Furtividade +10, Intuição +9, Misticismo +10"
};

export const cultistaDeSSzzaas = {
    id: "cultista-de-sszzaas",
    name: "Cultista de Sszzaas",
    type: "humanoid",
    subtype: "medusa",
    size: "Médio",
    challengeRating: 7,
    description: [
        "Mesmo com sua religião sendo proibida no Reinado, todos já ouviram falar de algum grupo sszzaazita escondido nas sombras de mansões sinistras ou tavernas discretas, tecendo planos dentro de planos, cometendo crimes para seu patrono maléfico. Encabeçando tais cabalas sombrias, quase sempre haverá um devoto de Sszzaas, manipulando seus asseclas, prometendo poder e riquezas, quando na verdade apenas executa os ditames do Grande Corruptor."
    ],
    source: {
        "book": "Livro Básico",
        "pdfPage": 21,
        "bookPage": null
    },
    stats: {
        "initiative": 11,
        "perception": 12,
        "defense": 29,
        "fortitude": 7,
        "reflex": 14,
        "will": 20,
        "hitPoints": 160,
        "manaPoints": 40,
        "speedText": "9m (6q)",
        "senses": "visão no escuro",
        "defensesText": "resistência a veneno +5",
        "attributes": {
            "str": 0,
            "dex": 2,
            "con": 0,
            "int": 4,
            "wis": 4,
            "cha": 5
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Adaga +22 (1d4+4 mais veneno, 19)"
        }
    ],
    abilities: [
        {
            "name": "Ataque Furtivo",
            "timing": null,
            "text": "Uma vez por rodada, a cultista de Sszzaas causa +5d6 pontos de dano com ataques corpo a corpo, ou à distância em alcance curto, contra alvos desprevenidos ou que ela esteja flanqueando."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "A cultista de Sszzaas lança magias como uma clériga de 7º nível (CD 22). 1º — Arma Mágica, Comando, Curar Ferimentos, Escuridão; 2º — Enxame de Pestes, Miasma Mefítico."
        },
        {
            "name": "Olhar Atordoante",
            "timing": "movimento",
            "text": "Uma criatura em alcance curto fica atordoada por uma rodada (apenas uma vez por cena; Fort CD 22 evita)."
        },
        {
            "name": "Veneno",
            "timing": null,
            "text": "Perde 2d12 pontos de vida durante 3 rodadas (Fort CD 22 reduz para uma rodada)."
        }
    ],
    equipment: "Adaga certeira, couraça, escudo leve, símbolo de Sszzaas. Tesouro Padrão",
    treasure: "Padrão.",
    skillsText: "Enganação +20, Intuição +20, Religião +17"
};

export const finntrollCacador = {
    id: "finntroll-cacador",
    name: "Finntroll Caçador",
    type: "humanoid",
    subtype: "finntroll",
    size: "Médio",
    challengeRating: 2,
    description: [],
    source: {
        "book": "Livro Básico",
        "pdfPage": 22,
        "bookPage": null
    },
    stats: {
        "initiative": 7,
        "perception": 7,
        "defense": 19,
        "fortitude": 6,
        "reflex": 12,
        "will": 4,
        "hitPoints": 65,
        "speedText": "9m (6q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a atordoamento e metamorfose, resistência a magia +2",
        "attributes": {
            "str": 2,
            "dex": 3,
            "con": 3,
            "int": 2,
            "wis": 2,
            "cha": -1
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Duas cimitarras +12 (1d6+5, 18)."
        },
        {
            "name": "À Distância",
            "text": "Besta pesada +12 (1d12+4, 19) ou rede +12 (agarrar)."
        }
    ],
    abilities: [
        {
            "name": "Marca da Presa",
            "timing": "movimento",
            "text": "O finntroll analisa uma criatura em alcance curto. Até o final da cena, recebe +1d8 em rolagens de dano contra essa criatura (ou +2d8, se a criatura for um anão, elfo ou humano)."
        },
        {
            "name": "Natureza Vegetal",
            "timing": null,
            "text": "O finntroll é afetado por habilidades e magias que afetam plantas."
        },
        {
            "name": "Regeneração Vegetal",
            "timing": "movimento",
            "text": "O finntroll recupera 5 PV. Esta habilidade não cura dano de ácido e fogo e não pode ser usada quando o finntroll está exposto à luz do sol ou similar."
        },
        {
            "name": "Sensibilidade a Luz",
            "timing": null,
            "text": "Quando exposto à luz do sol ou similar, o finntroll fica ofuscado."
        }
    ],
    equipment: "Besta pesada, cimitarra x2, rede, virotes x20",
    treasure: "Padrão.",
    skillsText: "Furtividade +8, Sobrevivência +7"
};

export const finntrollFeitor = {
    id: "finntroll-feitor",
    name: "Finntroll Feitor",
    type: "humanoid",
    subtype: "finntroll",
    size: "Médio",
    challengeRating: 6,
    description: [],
    source: {
        "book": "Livro Básico",
        "pdfPage": 22,
        "bookPage": null
    },
    stats: {
        "initiative": 9,
        "perception": 5,
        "defense": 20,
        "fortitude": 8,
        "reflex": 12,
        "will": 16,
        "hitPoints": 155,
        "manaPoints": 35,
        "speedText": "9m (6q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a atordoamento e metamorfose, resistência a magia +2",
        "attributes": {
            "str": 0,
            "dex": 3,
            "con": 3,
            "int": 4,
            "wis": 0,
            "cha": 2
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Chicote +18 (1d3+10, 19)."
        }
    ],
    abilities: [
        {
            "name": "Açoitar",
            "timing": "padrão",
            "text": "O finntroll usa de coerção e dor para motivar seus subalternos. No próximo turno de cada aliado do finntroll em alcance médio, esse aliado recebe uma ação de movimento extra e +2 em testes de ataque e rolagens de dano."
        },
        {
            "name": "Especialista em Encantamento",
            "timing": null,
            "text": "A CD para resistir às magias de encantamento do feitor aumenta em +2."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "O finntroll feitor lança magias como um mago de 7º nível (CD 26). 1º — Adaga Mental, Armadura Arcana, Enfeitiçar; 2º — Desespero Esmagador, Marca da Obediência, Relâmpago. CD 21 (23 para encantamento)."
        },
        {
            "name": "Natureza Vegetal",
            "timing": null,
            "text": "O finntroll é afetado por habilidades e magias que afetam plantas."
        },
        {
            "name": "Regeneração Vegetal",
            "timing": "movimento",
            "text": "O finntroll recupera 5 PV. Esta habilidade não cura dano de ácido e fogo e não pode ser usada quando o finntroll está exposto à luz do sol ou similar."
        },
        {
            "name": "Sensibilidade a Luz",
            "timing": null,
            "text": "Quando exposto à luz do sol ou similar, o finntroll fica ofuscado."
        }
    ],
    equipment: "Chicote cruel",
    treasure: "Dobro.",
    skillsText: "Intimidação +9, Misticismo +11"
};

export const tiranoDoTerceiro = {
    id: "tirano-do-terceiro",
    name: "Tirano do Terceiro",
    type: "humanoid",
    subtype: "humano",
    size: "Médio",
    challengeRating: 10,
    description: [
        "Poderosos servos de Kallyadranoch, os tiranos são verdadeiros exércitos de uma só pessoa, cavalgando dragões e aterrorizando o mundo com seu poderio. Ambiciosos e cruéis como as feras que adoram, estão entre os maiores vilões de Arton."
    ],
    source: {
        "book": "Livro Básico",
        "pdfPage": 28,
        "bookPage": null
    },
    stats: {
        "initiative": 9,
        "perception": 10,
        "defense": 37,
        "fortitude": 22,
        "reflex": 10,
        "will": 16,
        "hitPoints": 370,
        "manaPoints": 62,
        "speedText": "6m (4q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a atordoamento e medo, redução de dano 5, resistência a magia +2",
        "attributes": {
            "str": 6,
            "dex": 0,
            "con": 6,
            "int": 2,
            "wis": 1,
            "cha": 4
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Machado de batalha x2 +29 (2d8+14, x3) e garra +29 (1d8+14)."
        }
    ],
    abilities: [
        {
            "name": "Dádiva Dracônica",
            "timing": null,
            "text": "O tirano do terceiro pode lançar magias arcanas cavalgando e/ou de armadura sem precisar de testes de Misticismo."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "O tirano do terceiro lança magias como um mago de 10º nível (CD 30)."
        },
        {
            "name": "Bola de Fogo",
            "timing": "padrão",
            "text": "O tirano cria uma poderosa explosão em alcance médio que causa 12d6+5 pontos de dano de fogo em todas as criaturas em um raio de 6m (Reflexos reduz à metade).",
            "cost": "9 PM"
        },
        {
            "name": "Concentração de Combate",
            "timing": "padrão",
            "text": "Até o fim da cena, quando faz um ataque, o tirano rola dois dados e usa o melhor resultado, e quando um oponente ataca o tirano, rola dois dados e usa o pior resultado.",
            "cost": "8 PM"
        },
        {
            "name": "Velocidade",
            "timing": "padrão",
            "text": "O tirano pode executar uma ação padrão adicional por turno, que não pode ser usada para lançar magias.",
            "cost": "3 PM"
        }
    ],
    equipment: "Armadura completa de adamante, machado de batalha de adamante atroz. Tesouro Dobro",
    treasure: "Dobro.",
    skillsText: "Cavalgar +9, Intimidação +13, Misticismo +11"
};

export const maniacoLefou = {
    id: "maniaco-lefou",
    name: "Maníaco Lefou",
    type: "humanoid",
    subtype: "lefou",
    size: "Médio",
    challengeRating: 2,
    description: [
        "Poucos meios-demônios da Tormenta têm a sorte de integrar um grupo de aventureiros. Temidos e hostilizados por todas as outras raças, quase todos abraçam a violência e a loucura. Tornam-se selvagens ensandecidos, solitários ou em pequenos grupos, atacando tudo que encontram. Mais de uma aldeia foi chacinada por maníacos lefou, buscando apenas um fim para o pesadelo sangrento que é sua existência."
    ],
    source: {
        "book": "Livro Básico",
        "pdfPage": 29,
        "bookPage": null
    },
    stats: {
        "initiative": 4,
        "perception": 2,
        "defense": 18,
        "fortitude": 12,
        "reflex": 7,
        "will": 3,
        "hitPoints": 25,
        "speedText": "9m (6q)",
        "senses": null,
        "defensesText": null,
        "attributes": {
            "str": 5,
            "dex": 1,
            "con": 1,
            "int": -1,
            "wis": -1,
            "cha": -2
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Machado de guerra +16 (1d12+15, x3)."
        }
    ],
    abilities: [
        {
            "name": "Frenesi Insano",
            "timing": null,
            "text": "Sempre que causa ou sofre dano, o maníaco lefou recebe um bônus cumulativo de +2 em testes de ataque e rolagens de dano até o fim da cena."
        }
    ],
    equipment: "Machado de guerra",
    treasure: "Metade.",
    skillsText: null
};

export const sacerdoteDeAharadak = {
    id: "sacerdote-de-aharadak",
    name: "Sacerdote de Aharadak",
    type: "humanoid",
    subtype: "humano",
    size: "Médio",
    challengeRating: 10,
    description: [
        "Esses macabros devotos do Deus da Tormenta promovem a insanidade, a devassidão e a deturpação de tudo que é vivo. Desistindo da humanidade, esperando ser recompensados com poderes ainda maiores, cultistas perpetram os crimes mais horrendos para agradar seu patrono."
    ],
    source: {
        "book": "Livro Básico",
        "pdfPage": 31,
        "bookPage": null
    },
    stats: {
        "initiative": 17,
        "perception": 15,
        "defense": 38,
        "fortitude": 16,
        "reflex": 10,
        "will": 22,
        "hitPoints": 315,
        "manaPoints": 56,
        "speedText": "9m (6q), voo 15m (10q)",
        "senses": null,
        "defensesText": "imunidade a confusão, redução de ácido, eletricidade, fogo, frio, luz e trevas 10, resistência a magia divina +5",
        "attributes": {
            "str": 4,
            "dex": 2,
            "con": 4,
            "int": 2,
            "wis": 5,
            "cha": -1
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Duas correntes de espinhos aberrantes +30 (4d6+12 mais 1d6 de ácido) e mordida +30 (1d6+12)."
        }
    ],
    abilities: [
        {
            "name": "Magia Acelerada",
            "timing": "livre",
            "text": "Uma vez por rodada, quando lança uma magia com execução de ação completa ou menor, o sacerdote de Aharadak muda a execução dela para livre.",
            "cost": "4 PM"
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "O sacerdote de Aharadak lança magias como um clérigo de 10º nível (CD 30)."
        },
        {
            "name": "Curar Ferimentos",
            "timing": "padrão",
            "text": "Uma criatura adjacente cura 11d8+11 PV.",
            "cost": "10 PM"
        },
        {
            "name": "Perdição",
            "timing": "padrão",
            "text": "Criaturas escolhidas em alcance curto sofrem –3 em testes de ataque e rolagens de dano até o fim da cena.",
            "cost": "5 PM"
        },
        {
            "name": "Potência Divina",
            "timing": "padrão",
            "text": "O sacerdote se transforma em uma criatura Grande. Ele recebe Força +5, redução de dano 10 e os dados de dano de seus ataques se tornam d8, mas ele não pode lançar magias.",
            "cost": "10 PM"
        },
        {
            "name": "Silêncio",
            "timing": "padrão",
            "text": "O sacerdote cria uma esfera com 3m de raio ao seu redor. Criaturas nessa área ficam surdas e não podem lançar magias.",
            "cost": "4 PM"
        },
        {
            "name": "Sangue Ácido",
            "timing": null,
            "text": "Quando o sacerdote de Aharadak sofre dano por um ataque corpo a corpo, o atacante sofre 10 pontos de dano de ácido."
        }
    ],
    equipment: "Símbolo sagrado de Aharadak",
    treasure: "Padrão.",
    skillsText: "Intimidação +9, Religião +16"
};

export const centauroChefe = {
    "id": "centauro-chefe",
    "name": "Centauro Chefe",
    "type": "humanoid",
    "subtype": "centauro",
    "size": "Grande",
    "challengeRating": 8,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p104 ate 124.pdf",
        "pdfPage": 4,
        "bookPage": 105
    },
    "stats": {
        "initiative": 10,
        "perception": 10,
        "defense": 33,
        "fortitude": 21,
        "reflex": 15,
        "will": 8,
        "hitPoints": 320,
        "speedText": "12m (8q)",
        "senses": null,
        "defensesText": "resistência a efeitos mentais, medo e veneno +5",
        "attributes": {
            "str": 5,
            "dex": 2,
            "con": 4,
            "int": -1,
            "wis": 2,
            "cha": 1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Machado de guerra x2 +26 (3d6+18, x4) e cascos +26 (1d8+18)."
        }
    ],
    "abilities": [
        {
            "name": "Coice Oportuno",
            "timing": "reação",
            "text": "Uma vez por rodada, quando uma criatura erra um ataque corpo a corpo contra o centauro chefe por 5 ou mais, ele faz um ataque de cascos contra essa criatura."
        },
        {
            "name": "Investida Galopante",
            "timing": "completa",
            "text": "O centauro faz uma investida. Ele pode passar pelo espaço ocupado por criaturas menores que ele, pode continuar se movendo depois do ataque e, se acertar, causa +4d8 pontos de dano. Criaturas no caminho percorrido pelo chefe sofrem 1d8+9 pontos de dano de impacto e ficam caídas (Ref CD 26 evita)."
        },
        {
            "name": "Medo de Altura",
            "timing": null,
            "text": "Se estiver adjacente a uma queda de 3m ou mais de altura, o centauro fica abalado."
        }
    ],
    "equipment": "Machado de guerra aumentado maciço, gibão de peles",
    "treasure": "Padrão.",
    "skillsText": "Atletismo +13, Intimidação +9"
};

export const xamaDeMegalokk = {
    "id": "xama-de-megalokk",
    "name": "Centauro Xamã de Megalokk",
    "type": "humanoid",
    "subtype": "centauro",
    "size": "Grande",
    "challengeRating": 10,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p104 ate 124.pdf",
        "pdfPage": 4,
        "bookPage": 105
    },
    "stats": {
        "initiative": 12,
        "perception": 16,
        "defense": 31,
        "fortitude": 16,
        "reflex": 10,
        "will": 22,
        "hitPoints": 260,
        "manaPoints": 70,
        "speedText": "12m (8q)",
        "senses": null,
        "defensesText": null,
        "attributes": {
            "str": 3,
            "dex": 2,
            "con": 4,
            "int": -1,
            "wis": 6,
            "cha": 1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Clava +24 (1d8+15), mordida +24 (1d6+15) e cascos +24 (1d8+15)."
        }
    ],
    "abilities": [
        {
            "name": "Ira Coletiva",
            "timing": "padrão",
            "cost": "10 PM, sustentada",
            "text": "O centauro xamã de Megalokk causa um frenesi em aliados em alcance curto. Essas criaturas recebem +5 em testes de ataque e rolagens de dano corpo a corpo e redução de dano 10, mas ficam esmorecidas e não podem fazer nenhuma ação que exija calma e concentração (como usar a perícia Furtividade ou lançar magias)."
        },
        {
            "name": "Voz dos Monstros",
            "timing": null,
            "text": "O centauro está sempre sob efeito da magia Voz Divina, apenas para falar com monstros."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como um clérigo de Megalokk de 10º nível (CD 32)."
        },
        {
            "name": "Amedrontar",
            "timing": "padrão",
            "cost": "10 PM",
            "text": "Criaturas à escolha do xamã em alcance curto ficam apavoradas por 1d4+1 rodadas e depois abaladas (Von reduz para abalada por 1d4 rodadas)."
        },
        {
            "name": "Armamento da Natureza",
            "timing": "movimento",
            "cost": "8 PM",
            "text": "Uma das armas do xamã se torna mágica e seu dano aumenta em dois passos (de 1d6 para 1d10 ou de 1d8 para 1d12) até o fim da cena."
        },
        {
            "name": "Pele de Pedra",
            "timing": "padrão",
            "cost": "6 PM",
            "text": "O xamã recebe redução de dano 5 até o fim da cena."
        },
        {
            "name": "Perdição",
            "timing": "padrão",
            "cost": "5 PM",
            "text": "Criaturas escolhidas em alcance curto sofrem –3 em testes de ataque e rolagens de dano até o fim da cena."
        },
        {
            "name": "Poeira da Podridão",
            "timing": "padrão",
            "cost": "10 PM",
            "text": "Criaturas em uma nuvem de 6m de raio em alcance médio começam a definhar e apodrecer. Quando a magia é lançada, e no início de seus turnos até o fim da cena, criaturas na área sofrem 4d8+16 pontos de dano de trevas e não podem recuperar PV por uma rodada (Fort reduz à metade e evita a restrição de cura)."
        },
        {
            "name": "Medo de Altura",
            "timing": null,
            "text": "Se estiver adjacente a uma queda de 3m ou mais de altura, o centauro fica abalado."
        }
    ],
    "equipment": "Clava macabra aumentada, farrapos de ermitão, símbolo sagrado de Megalokk",
    "treasure": "Metade.",
    "skillsText": "Adestramento +10, Intimidação +10, Religião +15",
    "role": "special",
    "roleSource": "pdf-review"
};

export const nezumiBrutamontes = {
    "id": "nezumi-brutamontes",
    "name": "Nezumi Brutamontes",
    "type": "humanoid",
    "subtype": "nezumi",
    "size": "Pequeno",
    "challengeRating": 4,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p156 ate 169.pdf",
        "pdfPage": 9,
        "bookPage": 162
    },
    "stats": {
        "initiative": 5,
        "perception": 4,
        "defense": 23,
        "fortitude": 16,
        "reflex": 10,
        "will": 4,
        "hitPoints": 140,
        "speedText": "9m (6q)",
        "senses": "faro, visão na penumbra",
        "defensesText": "resistência a medo de criaturas maiores +5",
        "attributes": {
            "str": 3,
            "dex": 1,
            "con": 3,
            "int": -1,
            "wis": 0,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Marreta +16 (3d8+6) e mordida +16 (1d6+3, 19)."
        }
    ],
    "abilities": [
        {
            "name": "Estocada Invertida",
            "timing": "reação",
            "text": "Uma vez por rodada, se acertar um ataque com sua marreta, o nezumi brutamontes pode fazer um ataque em outra criatura usando a ponta do cabo da arma (ataque +16, dano 2d8+6, impacto)."
        },
        {
            "name": "Roedor",
            "timing": null,
            "text": "Quando o nezumi brutamontes faz um acerto crítico com sua mordida, deixa a armadura da vítima avariada ou, se ela estiver sem armadura, aumenta em +1 o multiplicador desse crítico."
        }
    ],
    "equipment": "Gibão de peles, marreta aumentada",
    "treasure": "Metade.",
    "skillsText": "Atletismo +7, Intimidação +5",
    "role": "solo",
    "roleSource": "pdf-review"
};

export const enxameKobold = {
    id: "enxame-kobold",
    name: "Enxame Kobold",
    type: "humanoid",
    subtype: "kobold",
    size: "Médio",
    challengeRating: 2,
    description: [
        "Esses pequenos humanoides reptilianos são considerados uma praga — o que realmente são! Medindo 75cm de altura, parecem caricaturas de dragões, com cabeças grandes e desproporcionais, orelhas caninas e pequenos chifres, corpo magro e cauda fina, curta. Embora possam se reproduzir como seres normais, kobolds às vezes surgem espontaneamente onde existe ou existiu um dragão; diz-se que a própria energia dracônica faz seus ovos brotarem como fungos. Um kobold sozinho dificilmente representa ameaça. Infelizmente, eles normalmente surgem em grandes quantidades, atacando como enxames."
    ],
    source: {
        "book": "Livro Básico",
        "pdfPage": 25,
        "bookPage": null
    },
    stats: {
        "initiative": 6,
        "perception": 1,
        "defense": 17,
        "fortitude": 7,
        "reflex": 13,
        "will": 2,
        "hitPoints": 60,
        "speedText": "9m (6q)",
        "senses": "visão no escuro",
        "defensesText": null,
        "attributes": {
            "str": 0,
            "dex": 3,
            "con": 0,
            "int": -1,
            "wis": 0,
            "cha": -1
        }
    },
    actions: [],
    abilities: [
        {
            "name": "Caixa com Pregos",
            "timing": "padrão",
            "text": "Os kobolds arremessam uma caixa com pregos (ou outra coisa perigosa, como insetos peçonhentos) em uma criatura em alcance curto. A vítima sofre 2d6 pontos de dano de perfuração e fica atordoada por uma rodada (Ref CD 16 reduz o dano à metade e evita a condição atordoado)."
        },
        {
            "name": "Enxame",
            "timing": null,
            "text": "Um enxame é uma aglomeração de criaturas que agem em conjunto. Em termos de regras, pode entrar no espaço ocupado por um personagem. No fim de seu turno, o enxame causa 2d6 pontos de dano de perfuração a qualquer personagem em seu espaço, automaticamente. Um enxame é imune a manobras de combate e efeitos que afetam apenas uma criatura e não causam dano, e sofre apenas metade do dano de ataques com armas. Porém, sofre 50% a mais de dano por efeitos de área."
        },
        {
            "name": "Unidos Venceremos",
            "timing": null,
            "text": "No início de cada rodada, novos kobolds se juntam ao enxame. O enxame ganha +10 PV (até um limite máximo de 100 PV). O enxame recebe +1 em rolagens de dano para cada 10 PV que possui."
        }
    ],
    equipment: null,
    treasure: "Metade.",
    skillsText: null
};

export const bruxoDaTormenta = {
    id: "bruxo-da-tormenta",
    name: "Bruxo da Tormenta",
    type: "humanoid",
    subtype: "humano",
    size: "Médio",
    challengeRating: 6,
    description: [
        "Arcanistas corrompidos pelo estudo da Tormenta, tomados pela loucura e por experimentos aberrantes. Os mais poderosos usam criaturas da Tormenta como guardas e soldados."
    ],
    source: {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p20 ate 31.pdf",
        "pdfPage": 3,
        "bookPage": 20
    },
    stats: {
        "initiative": 5,
        "perception": 6,
        "defense": 27,
        "fortitude": 6,
        "reflex": 12,
        "will": 18,
        "hitPoints": 142,
        "manaPoints": 41,
        "speedText": "9m (6q)",
        "senses": null,
        "defensesText": null,
        "attributes": {
            "str": -1,
            "dex": 0,
            "con": 2,
            "int": 5,
            "wis": 1,
            "cha": -2
        }
    },
    actions: [],
    abilities: [
        {
            "name": "Cuspir Enxame",
            "timing": "completa",
            "cost": "2 PM",
            "text": "Sustentada. Um enxame de insetos rubros Médio surge em um ponto em alcance curto. No fim de cada um dos seus turnos, ele causa 4d6 pontos de dano de ácido a qualquer criatura em seu espaço. O bruxo pode gastar uma ação de movimento para mover o enxame com deslocamento de 9m."
        },
        {
            "name": "Mente Aberrante",
            "timing": "reação",
            "text": "Quando faz um teste de Vontade para resistir a um efeito, o bruxo causa 5d6 pontos de dano psíquico na criatura que gerou o efeito."
        },
        {
            "name": "Raio Arcano",
            "timing": "padrão",
            "cost": "1 PM",
            "text": "Uma criatura em alcance médio sofre 2d12 pontos de dano de trevas e não pode curar PV por 1 rodada (Ref CD 24 reduz à metade e evita a restrição de cura)."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como um bruxo de 6º nível (CD 24). Seu foco é seu cajado arcano."
        },
        {
            "name": "Névoa",
            "timing": "padrão",
            "cost": "3 PM",
            "text": "Forma uma nuvem que ocupa um cubo de 6m em alcance curto e dura até o fim da cena. Criaturas a até 1,5m têm camuflagem leve e criaturas a partir de 3m têm camuflagem total. Um vento forte dispersa a névoa em 4 rodadas e um vendaval a dispersa em 1 rodada. No início dos seus turnos, criaturas dentro da nuvem e criaturas com faro em alcance curto ficam enjoadas por 1 rodada (Fort evita)."
        },
        {
            "name": "Raio do Enfraquecimento",
            "timing": "padrão",
            "cost": "3 PM",
            "text": "Uma criatura em alcance curto fica exausta (Fort reduz para fatigada)."
        },
        {
            "name": "Sussurros Insanos",
            "timing": "padrão",
            "cost": "5 PM",
            "text": "Até 2 humanoides em alcance curto ficam confusos (Von evita)."
        },
        {
            "name": "Velocidade",
            "timing": "padrão",
            "cost": "3 PM",
            "text": "Até o fim da cena, o bruxo pode executar uma ação de movimento adicional por turno, que não pode ser usada para lançar magias."
        }
    ],
    equipment: "Cajado arcano de matéria vermelha",
    treasure: "Padrão.",
    skillsText: "Conhecimento +12, Misticismo +15"
};

export const meioOrcBandoleiro = {
    "id": "meio-orc-bandoleiro",
    "name": "Meio-Orc Bandoleiro",
    "type": "humanoid",
    "subtype": "meio-orc",
    "size": "Médio",
    "challengeRating": 1,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p32 ate 43.pdf",
        "pdfPage": 2,
        "bookPage": 31
    },
    "stats": {
        "initiative": 5,
        "perception": 1,
        "defense": 15,
        "fortitude": 10,
        "reflex": 5,
        "will": 1,
        "hitPoints": 15,
        "speedText": "9m (6q)",
        "senses": "visão no escuro",
        "defensesText": null,
        "attributes": {
            "str": 3,
            "dex": 1,
            "con": 2,
            "int": 0,
            "wis": -1,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Espada curta +11 (1d6+13, 19)."
        },
        {
            "name": "À Distância",
            "text": "Adaga +9 (1d4+7, 19)."
        }
    ],
    "abilities": [
        {
            "name": "Ataque Furtivo",
            "timing": null,
            "text": "+2d6."
        }
    ],
    "equipment": "Adaga x2, armadura de couro, espada curta",
    "treasure": "Metade.",
    "skillsText": null
};

export const meioOrcCapanga = {
    "id": "meio-orc-capanga",
    "name": "Meio-Orc Capanga",
    "type": "humanoid",
    "subtype": "meio-orc",
    "size": "Médio",
    "challengeRating": 1,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p32 ate 43.pdf",
        "pdfPage": 2,
        "bookPage": 31
    },
    "stats": {
        "initiative": 6,
        "perception": 3,
        "defense": 16,
        "fortitude": 11,
        "reflex": 4,
        "will": 2,
        "hitPoints": 12,
        "speedText": "9m (6q)",
        "senses": "visão no escuro",
        "defensesText": null,
        "attributes": {
            "str": 3,
            "dex": 1,
            "con": 2,
            "int": 0,
            "wis": -1,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Maça +11 (1d8+12)."
        }
    ],
    "abilities": [
        {
            "name": "Ímpeto Agressor",
            "timing": null,
            "text": "O meio-orc capanga recebe +1d10 na rolagem de dano de seu primeiro ataque na cena."
        }
    ],
    "equipment": "Couro batido, maça",
    "treasure": "Metade.",
    "skillsText": null
};

export const meioOrcChefe = {
    "id": "meio-orc-chefe",
    "name": "Meio-Orc Chefe",
    "type": "humanoid",
    "subtype": "meio-orc",
    "size": "Médio",
    "challengeRating": 5,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p32 ate 43.pdf",
        "pdfPage": 2,
        "bookPage": 31
    },
    "stats": {
        "initiative": 6,
        "perception": 4,
        "defense": 24,
        "fortitude": 17,
        "reflex": 11,
        "will": 6,
        "hitPoints": 190,
        "speedText": "9m (6q)",
        "senses": "visão no escuro",
        "defensesText": null,
        "attributes": {
            "str": 5,
            "dex": 2,
            "con": 4,
            "int": 1,
            "wis": 0,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Machado de batalha +18 (2d8+30, x3)."
        }
    ],
    "abilities": [
        {
            "name": "Ataque Furtivo",
            "timing": null,
            "text": "+3d6."
        },
        {
            "name": "Ordens",
            "timing": "movimento",
            "text": "O meio-orc chefe grita ordens para seus aliados em alcance médio. Eles recebem +2 em testes de perícia até o fim da cena."
        },
        {
            "name": "Urro Selvagem",
            "timing": "movimento",
            "text": "O chefe recebe +2 em testes de ataque e rolagens de dano corpo a corpo até o fim da cena, mas não pode fazer nenhuma ação que exige calma e concentração."
        }
    ],
    "equipment": "Gibão de peles, machado de batalha",
    "treasure": "Padrão.",
    "skillsText": "Intimidação +7, Sobrevivência +6 (+8 em subterrâneo)"
};

export const ogroCacador = {
    "id": "ogro-cacador",
    "name": "Ogro Caçador",
    "type": "humanoid",
    "subtype": "gigante",
    "size": "Grande",
    "challengeRating": 7,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p32 ate 43.pdf",
        "pdfPage": 12,
        "bookPage": 41
    },
    "stats": {
        "initiative": 7,
        "perception": 2,
        "defense": 29,
        "fortitude": 20,
        "reflex": 14,
        "will": 4,
        "hitPoints": 265,
        "speedText": "9m (6q)",
        "senses": "visão na penumbra",
        "defensesText": null,
        "attributes": {
            "str": 9,
            "dex": 0,
            "con": 5,
            "int": -3,
            "wis": -1,
            "cha": -2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Tacape x2 +24 (3d6+21)."
        }
    ],
    "abilities": [
        {
            "name": "Grande Demais…",
            "timing": null,
            "text": "Todo dano de corte, impacto e perfuração que o ogro caçador sofre é reduzido à metade e ele pode se deslocar normalmente ao agarrar (e arrastar) um alvo."
        },
        {
            "name": "…Para se Importar!",
            "timing": null,
            "text": "O ogro sofre –5 em Intuição e Vontade (já contabilizados). Porém, efeitos negativos não permanentes que ele sofra que durem mais que 2 rodadas têm a duração reduzida para 2 rodadas."
        }
    ],
    "equipment": "Tacape aumentado",
    "treasure": "Metade.",
    "skillsText": "Atletismo +16, Intuição –3"
};

export const ogroCapanga = {
    "id": "ogro-capanga",
    "name": "Ogro Capanga",
    "type": "humanoid",
    "subtype": "gigante",
    "size": "Grande",
    "challengeRating": 11,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p32 ate 43.pdf",
        "pdfPage": 12,
        "bookPage": 41
    },
    "stats": {
        "initiative": 9,
        "perception": 4,
        "defense": 36,
        "fortitude": 23,
        "reflex": 18,
        "will": 8,
        "hitPoints": 111,
        "speedText": "9m (6q)",
        "senses": "visão na penumbra",
        "defensesText": "imunidade a enfeitiçado",
        "attributes": {
            "str": 11,
            "dex": 0,
            "con": 6,
            "int": -3,
            "wis": -1,
            "cha": -2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Marreta x2 +36 (3d6+49)."
        }
    ],
    "abilities": [
        {
            "name": "Cruel Demais…",
            "timing": null,
            "text": "Cada ataque de marreta do ogro capanga atinge todas as criaturas ao seu redor. Para cada ataque, ele faz um único teste e compara seu resultado com a Defesa de cada criatura em seu alcance."
        },
        {
            "name": "…Para Sentir!",
            "timing": null,
            "text": "O ogro sofre –5 em Intuição e Vontade (já contabilizados). Porém, efeitos negativos não permanentes que ele sofra que durem mais que 2 rodadas têm a duração reduzida para 2 rodadas e as penalidades numéricas de quaisquer condições que ele sofra são reduzidas à metade."
        }
    ],
    "equipment": "Marreta aumentada cruel",
    "treasure": "Metade.",
    "skillsText": "Atletismo +20, Intuição +4"
};

export const orcMutanteSuperior = {
    "id": "orc-mutante-superior",
    "name": "Orc Mutante Superior",
    "type": "humanoid",
    "subtype": "orc",
    "size": "Médio",
    "challengeRating": 10,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p32 ate 43.pdf",
        "pdfPage": 5,
        "bookPage": 34
    },
    "stats": {
        "initiative": 9,
        "perception": 8,
        "defense": 34,
        "fortitude": 22,
        "reflex": 15,
        "will": 9,
        "hitPoints": 372,
        "speedText": "9m (6q)",
        "senses": "visão no escuro",
        "defensesText": "sensibilidade a luz",
        "attributes": {
            "str": 9,
            "dex": 2,
            "con": 4,
            "int": -2,
            "wis": 0,
            "cha": -3
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Tacape +29 (1d12+18), pancada +27 (1d8+18) e mordida +27 (1d6+18)."
        }
    ],
    "abilities": [
        {
            "name": "Mutações",
            "timing": null,
            "text": "Cada orc mutante superior possui três mutações, escolhidas entre as seguintes."
        },
        {
            "name": "Cabeça Adicional",
            "timing": null,
            "text": "Quando faz um teste de Percepção ou Vontade, o orc rola dois dados e usa o melhor resultado."
        },
        {
            "name": "Braço Direito Extra",
            "timing": "livre",
            "text": "Se o orc acerta um ataque de pancada, pode usar a manobra agarrar (teste +29)."
        },
        {
            "name": "Braço Esquerdo Extra",
            "timing": "livre",
            "text": "Se o orc acerta o ataque de tacape e o ataque de mordida em uma mesma criatura na mesma rodada, ele rasga a vítima com seu terceiro braço degenerado, causando 1d8+12 pontos de dano de corte."
        },
        {
            "name": "Braços Longos",
            "timing": null,
            "text": "O alcance natural do orc aumenta em 3m."
        },
        {
            "name": "Mutação Constante",
            "timing": null,
            "text": "O orc recebe cura acelerada 10."
        },
        {
            "name": "Pernas Fortes",
            "timing": null,
            "text": "O deslocamento do orc aumenta em +6m e ele ignora terreno difícil."
        },
        {
            "name": "Uivo de Melancolia",
            "timing": "completa",
            "text": "O orc emite um uivo de sofrimento que deixa todas as criaturas em alcance curto alquebradas (Von CD 26 evita)."
        }
    ],
    "equipment": "Tacape macabro",
    "treasure": "Padrão.",
    "skillsText": "Atletismo +20, Intimidação +8"
};

export const orcRei = {
    "id": "orc-rei",
    "name": "Orc Rei",
    "type": "humanoid",
    "subtype": "orc",
    "size": "Médio",
    "challengeRating": 5,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p32 ate 43.pdf",
        "pdfPage": 4,
        "bookPage": 33
    },
    "stats": {
        "initiative": 7,
        "perception": 4,
        "defense": 25,
        "fortitude": 15,
        "reflex": 11,
        "will": 7,
        "hitPoints": 210,
        "speedText": "9m (6q)",
        "senses": "visão no escuro",
        "defensesText": "sensibilidade a luz; imunidade a atordoado e cansaço",
        "attributes": {
            "str": 5,
            "dex": 1,
            "con": 4,
            "int": 0,
            "wis": 0,
            "cha": 1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Lança +18 x2 (2d8+12, x3)."
        }
    ],
    "abilities": [
        {
            "name": "Aura de Fúria",
            "timing": null,
            "text": "Outros orcs sob comando do orc rei em um raio de 30m recebem +2 na Defesa, em testes de perícia e em rolagens de dano."
        },
        {
            "name": "Estocada Atroz",
            "timing": null,
            "text": "Uma criatura atingida por um ataque de lança do rei fica sangrando (Fort CD 20 evita)."
        }
    ],
    "equipment": "Couro batido, escudo pesado, lança",
    "treasure": "Dobro.",
    "skillsText": null
};

export const orcVeterano = {
    "id": "orc-veterano",
    "name": "Orc Veterano",
    "type": "humanoid",
    "subtype": "orc",
    "size": "Médio",
    "challengeRating": 1,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p32 ate 43.pdf",
        "pdfPage": 4,
        "bookPage": 33
    },
    "stats": {
        "initiative": 4,
        "perception": 1,
        "defense": 16,
        "fortitude": 10,
        "reflex": 5,
        "will": 1,
        "hitPoints": 14,
        "speedText": "9m (6q)",
        "senses": "visão no escuro",
        "defensesText": "sensibilidade a luz",
        "attributes": {
            "str": 4,
            "dex": 1,
            "con": 3,
            "int": -1,
            "wis": -1,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Marreta +11 (3d4+9)."
        }
    ],
    "abilities": [],
    "equipment": "Couro batido, marreta",
    "treasure": "Metade.",
    "skillsText": null
};

export const orcXama = {
    "id": "orc-xama",
    "name": "Orc Xamã",
    "type": "humanoid",
    "subtype": "orc",
    "size": "Médio",
    "challengeRating": 7,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p32 ate 43.pdf",
        "pdfPage": 6,
        "bookPage": 35
    },
    "stats": {
        "initiative": 4,
        "perception": 13,
        "defense": 29,
        "fortitude": 14,
        "reflex": 7,
        "will": 20,
        "hitPoints": 196,
        "manaPoints": 41,
        "speedText": "9m (6q)",
        "senses": "visão no escuro",
        "defensesText": "sensibilidade a luz; resistência a veneno +5",
        "attributes": {
            "str": 3,
            "dex": 1,
            "con": 2,
            "int": -1,
            "wis": 6,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Adaga x2 +29 (2d4+20, 19)."
        }
    ],
    "abilities": [
        {
            "name": "Urro Divino",
            "timing": "livre",
            "cost": "1 PM",
            "text": "Quando faz um ataque ou lança uma magia, o orc xamã soma sua Constituição à rolagem de dano desse ataque ou magia."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como um clérigo de Megalokk de 7º nível (CD 26)."
        },
        {
            "name": "Arma Espiritual",
            "timing": "padrão",
            "cost": "5 PM",
            "text": "Sustentada. Uma vez por rodada, como uma ação livre, o xamã causa 3d6 pontos de dano de impacto automaticamente a uma criatura adjacente. Se não fizer isso e sofrer um ataque corpo a corpo nesta rodada, ele pode usar uma reação para causar este dano ao atacante."
        },
        {
            "name": "Despedaçar",
            "timing": "padrão",
            "cost": "7 PM",
            "text": "Um alvo em alcance curto sofre 4d8+8 pontos de dano de impacto se for uma criatura, ou o dobro disso sem aplicar RD se for um construto ou um objeto mundano Pequeno, e fica atordoado (Fort reduz à metade e evita a condição). Uma criatura só pode ficar atordoada por esta magia uma vez por cena."
        },
        {
            "name": "Físico Divino",
            "timing": "padrão",
            "cost": "3 PM",
            "text": "Uma criatura adjacente recebe +2 em Força, Destreza ou Constituição até o fim da cena. Esse aumento não fornece PV ou PM adicionais."
        },
        {
            "name": "Soco de Arsenal",
            "timing": "padrão",
            "cost": "7 PM",
            "text": "Uma criatura em alcance médio sofre 6d6+3 pontos de dano de impacto e é empurrada 3m na direção oposta ao xamã (Fort reduz à metade e evita o empurrão)."
        }
    ],
    "equipment": "Adaga, ossos de monstro x1d4, símbolo sagrado de Megalokk",
    "treasure": "Padrão.",
    "skillsText": "Intimidação +9, Religião +13"
};

export const tabrachiCampeao = {
    "id": "tabrachi-campeao",
    "name": "Tabrachi Campeão",
    "type": "humanoid",
    "subtype": "tabrachi",
    "size": "Médio",
    "challengeRating": 3,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p32 ate 43.pdf",
        "pdfPage": 8,
        "bookPage": 37
    },
    "stats": {
        "initiative": 7,
        "perception": 4,
        "defense": 21,
        "fortitude": 9,
        "reflex": 15,
        "will": 3,
        "hitPoints": 105,
        "speedText": "9m (6q), natação 9m (6q)",
        "senses": "visão na penumbra",
        "defensesText": null,
        "attributes": {
            "str": 3,
            "dex": 2,
            "con": 4,
            "int": -1,
            "wis": -1,
            "cha": -2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Lança +14 (1d6+3 mais veneno) e língua +14 (1d4+3 impacto mais veneno, alcance 3m)."
        },
        {
            "name": "À Distância",
            "text": "Azagaia +11 (1d6+3 mais veneno)."
        }
    ],
    "abilities": [
        {
            "name": "Linguarudo",
            "timing": null,
            "text": "O tabrachi campeão recebe +2 em testes para desarmar ou derrubar com a língua."
        },
        {
            "name": "Veneno",
            "timing": null,
            "text": "Peçonha comum (perde 1d12 PV, Fort CD 16 evita)."
        }
    ],
    "equipment": "Azagaia x2, escudo pesado, gibão de peles, lança, 1d4 doses de peçonha comum",
    "treasure": "Padrão.",
    "skillsText": "Atletismo +13 (+23 para saltar), Cavalgar +5, Furtividade +6"
};

export const tabrachiSoldado = {
    "id": "tabrachi-soldado",
    "name": "Tabrachi Soldado",
    "type": "humanoid",
    "subtype": "tabrachi",
    "size": "Médio",
    "challengeRating": 1,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p32 ate 43.pdf",
        "pdfPage": 8,
        "bookPage": 37
    },
    "stats": {
        "initiative": 5,
        "perception": 2,
        "defense": 16,
        "fortitude": 5,
        "reflex": 10,
        "will": 1,
        "hitPoints": 12,
        "speedText": "9m (6q), natação 9m (6q)",
        "senses": "visão na penumbra",
        "defensesText": null,
        "attributes": {
            "str": 2,
            "dex": 2,
            "con": 3,
            "int": -1,
            "wis": -1,
            "cha": -2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Lança +11 (1d6+5) e língua +11 (1d4+5 impacto, alcance 3m)."
        },
        {
            "name": "À Distância",
            "text": "Azagaia +7 (1d6+5)."
        }
    ],
    "abilities": [
        {
            "name": "Linguarudo",
            "timing": null,
            "text": "O tabrachi soldado recebe +2 em testes para desarmar ou derrubar com a língua."
        }
    ],
    "equipment": "Azagaia x2, couro batido, escudo leve, lança",
    "treasure": "Nenhum.",
    "skillsText": "Atletismo +8 (+18 para saltar), Furtividade +4"
};

export const altoSacerdoteDeHyninn = {
    "id": "alto-sacerdote-de-hyninn",
    "name": "Alto Sacerdote de Hyninn",
    "type": "humanoid",
    "subtype": "humano",
    "size": "Médio",
    "challengeRating": 8,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p44 ate 52.pdf",
        "pdfPage": 6,
        "bookPage": 47
    },
    "stats": {
        "initiative": 13,
        "perception": 13,
        "defense": 30,
        "fortitude": 10,
        "reflex": 15,
        "will": 19,
        "hitPoints": 175,
        "manaPoints": 60,
        "speedText": "9m (6q)",
        "senses": null,
        "defensesText": "imunidade a efeitos mentais",
        "attributes": {
            "str": 0,
            "dex": 3,
            "con": 1,
            "int": 1,
            "wis": 5,
            "cha": 4
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Adaga x2 +24 (1d4+12, 19)."
        }
    ],
    "abilities": [
        {
            "name": "Bênção do Gatuno",
            "timing": "livre",
            "text": "Uma vez por cena, o alto sacerdote de Hyninn lança uma magia como uma ação livre, pagando seu custo normal."
        },
        {
            "name": "Fé na Sorte",
            "timing": "reação",
            "text": "Uma vez por rodada, quando sofre dano, o alto sacerdote reduz esse dano à metade."
        },
        {
            "name": "Forma de Macaco",
            "timing": "completa",
            "cost": "2 PM",
            "text": "O alto sacerdote se transforma em um macaco. Ele adquire tamanho Minúsculo (+5 em Furtividade e –5 em testes de manobra) e recebe deslocamento de escalada 9m. Seu equipamento desaparece (e ele perde seus benefícios) até voltar ao normal, mas suas outras estatísticas não são alteradas. A transformação dura indefinidamente, mas termina caso ele faça um ataque, lance uma magia ou sofra dano."
        },
        {
            "name": "Malandragem Divina",
            "timing": "livre",
            "cost": "1 PM",
            "text": "Quando faz um teste de perícia, o alto sacerdote usa Enganação no lugar da perícia original."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como um clérigo de Hyninn de 8º nível (CD 28)."
        },
        {
            "name": "Arma Espiritual",
            "timing": "padrão",
            "cost": "6 PM",
            "text": "Até o fim da cena, o alto sacerdote recebe +2 na Defesa e, uma vez por rodada, quando sofre um ataque corpo a corpo, pode usar uma reação para causar 3d6 pontos de dano de corte no atacante."
        },
        {
            "name": "Curar Ferimentos",
            "timing": "padrão",
            "cost": "8 PM",
            "text": "Uma criatura adjacente cura 9d8+9 PV."
        },
        {
            "name": "Despedaçar",
            "timing": "padrão",
            "cost": "7 PM",
            "text": "Um alvo em alcance curto sofre 4d8+8 pontos de dano de impacto se for uma criatura, ou o dobro disso sem aplicar RD se for um construto ou um objeto mundano Pequeno, e fica atordoado (Fort reduz à metade e evita a condição). Uma criatura só pode ficar atordoada por esta magia uma vez por cena."
        },
        {
            "name": "Enxame de Pestes",
            "timing": "completa",
            "cost": "7 PM",
            "text": "Sustentada. Um enxame de palhaços em miniatura surge em alcance médio e ocupa um quadrado de 1,5m. No fim de cada um dos turnos do alto sacerdote, o enxame causa 4d12 pontos de dano de corte a qualquer criatura em seu espaço (Fort reduz à metade). O alto sacerdote pode gastar uma ação de movimento para mover o enxame 12m."
        }
    ],
    "equipment": "Adaga, capa esvoaçante aprimorada, gazua, manto eclesiástico, símbolo sagrado de Hyninn",
    "treasure": "Padrão.",
    "skillsText": "Enganação +16, Furtividade +13, Ladinagem +14, Religião +14"
};

export const bandidoLigeiro = {
    "id": "bandido-ligeiro",
    "name": "Bandido Ligeiro",
    "type": "humanoid",
    "subtype": "humano",
    "size": "Médio",
    "challengeRating": 0.5,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p44 ate 52.pdf",
        "pdfPage": 2,
        "bookPage": 43
    },
    "stats": {
        "initiative": 4,
        "perception": 1,
        "defense": 15,
        "fortitude": 3,
        "reflex": 5,
        "will": 0,
        "hitPoints": 9,
        "speedText": "9m (6q)",
        "senses": null,
        "defensesText": null,
        "attributes": {
            "str": 1,
            "dex": 2,
            "con": 1,
            "int": 0,
            "wis": -1,
            "cha": 0
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Clava +9 (1d6+5)."
        },
        {
            "name": "À Distância",
            "text": "Funda +9 (1d6+1)."
        }
    ],
    "abilities": [],
    "equipment": "Clava, funda, pedras x20",
    "treasure": "Metade.",
    "skillsText": "Furtividade +6"
};

export const bandidoSelvagem = {
    "id": "bandido-selvagem",
    "name": "Bandido Selvagem",
    "type": "humanoid",
    "subtype": "humano",
    "size": "Médio",
    "challengeRating": 1,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p44 ate 52.pdf",
        "pdfPage": 2,
        "bookPage": 43
    },
    "stats": {
        "initiative": 4,
        "perception": 3,
        "defense": 16,
        "fortitude": 8,
        "reflex": 6,
        "will": 2,
        "hitPoints": 12,
        "speedText": "9m (6q)",
        "senses": null,
        "defensesText": null,
        "attributes": {
            "str": 2,
            "dex": 1,
            "con": 1,
            "int": 0,
            "wis": 0,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Lança x2 +11 (1d6+5)."
        },
        {
            "name": "À Distância",
            "text": "Azagaia +11 (1d6+5)."
        }
    ],
    "abilities": [
        {
            "name": "Arremesso de Emboscada",
            "timing": "livre",
            "text": "Uma única vez em seu primeiro turno de combate, o bandido selvagem saca uma azagaia e faz um ataque à distância com ela."
        }
    ],
    "equipment": "Azagaia x3, escudo leve, lança",
    "treasure": "Metade.",
    "skillsText": "Furtividade +7, Sobrevivência +2"
};

export const capanga = {
    "id": "capanga",
    "name": "Capanga",
    "type": "humanoid",
    "subtype": "humano",
    "size": "Médio",
    "challengeRating": 0.5,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p44 ate 52.pdf",
        "pdfPage": 2,
        "bookPage": 43
    },
    "stats": {
        "initiative": 3,
        "perception": 2,
        "defense": 13,
        "fortitude": 5,
        "reflex": 3,
        "will": 0,
        "hitPoints": 7,
        "speedText": "9m (6q)",
        "senses": null,
        "defensesText": null,
        "attributes": {
            "str": 3,
            "dex": 1,
            "con": 1,
            "int": -1,
            "wis": 0,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Tacape +10 (1d10+5)."
        }
    ],
    "abilities": [
        {
            "name": "Ímpeto Agressor",
            "timing": null,
            "text": "O capanga recebe +1d10 na rolagem de dano de seu primeiro ataque na cena."
        }
    ],
    "equipment": "Tacape",
    "treasure": "Metade.",
    "skillsText": null
};

export const capangaMinotauro = {
    "id": "capanga-minotauro",
    "name": "Capanga Minotauro",
    "type": "humanoid",
    "subtype": "minotauro",
    "size": "Médio",
    "challengeRating": 3,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p44 ate 52.pdf",
        "pdfPage": 3,
        "bookPage": 44
    },
    "stats": {
        "initiative": 3,
        "perception": 2,
        "defense": 22,
        "fortitude": 15,
        "reflex": 5,
        "will": 10,
        "hitPoints": 35,
        "speedText": "6m (4q)",
        "senses": "faro",
        "defensesText": null,
        "attributes": {
            "str": 5,
            "dex": 0,
            "con": 3,
            "int": -1,
            "wis": 0,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Machado de batalha +17 (2d6+15, x3) e chifres +17 (1d6+15)."
        },
        {
            "name": "À Distância",
            "text": "Azagaia +17 (1d6+10)."
        }
    ],
    "abilities": [
        {
            "name": "Medo de Altura",
            "timing": null,
            "text": "Se estiver adjacente a uma queda de 3m ou mais de altura (como um buraco ou penhasco), o capanga minotauro fica abalado."
        }
    ],
    "equipment": "Azagaia x3, cota de malha, escudo pesado, machado de batalha",
    "treasure": "Metade.",
    "skillsText": null
};

export const chefeDeGangue = {
    "id": "chefe-de-gangue",
    "name": "Chefe de Gangue",
    "type": "humanoid",
    "subtype": "humano",
    "size": "Médio",
    "challengeRating": 2,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p44 ate 52.pdf",
        "pdfPage": 4,
        "bookPage": 45
    },
    "stats": {
        "initiative": 6,
        "perception": 6,
        "defense": 19,
        "fortitude": 11,
        "reflex": 7,
        "will": 4,
        "hitPoints": 63,
        "speedText": "9m (6q)",
        "senses": null,
        "defensesText": "resistência a medo +5",
        "attributes": {
            "str": 3,
            "dex": 2,
            "con": 2,
            "int": 1,
            "wis": 0,
            "cha": 1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Espada longa +12 (1d8+5, 19) e espada curta +12 (1d6+5, 19)."
        }
    ],
    "abilities": [
        {
            "name": "Ataque Furtivo",
            "timing": null,
            "text": "+2d6."
        },
        {
            "name": "Ordens",
            "timing": "movimento",
            "text": "O chefe grita ordens para seus aliados em alcance médio. Eles recebem +2 em testes de perícia até o fim da cena."
        }
    ],
    "equipment": "Couro batido, espada curta, espada longa",
    "treasure": "Padrão.",
    "skillsText": "Furtividade +7, Intimidação +7"
};

export const chefeDeQuadrilha = {
    "id": "chefe-de-quadrilha",
    "name": "Chefe de Quadrilha",
    "type": "humanoid",
    "subtype": "humano",
    "size": "Médio",
    "challengeRating": 4,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p44 ate 52.pdf",
        "pdfPage": 4,
        "bookPage": 45
    },
    "stats": {
        "initiative": 8,
        "perception": 5,
        "defense": 22,
        "fortitude": 14,
        "reflex": 11,
        "will": 5,
        "hitPoints": 120,
        "speedText": "9m (6q)",
        "senses": null,
        "defensesText": "resistência a medo +5",
        "attributes": {
            "str": 3,
            "dex": 3,
            "con": 2,
            "int": 1,
            "wis": 0,
            "cha": 1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Espada longa +16 (1d8+6, 19) e espada curta +16 (1d6+6, 19)."
        }
    ],
    "abilities": [
        {
            "name": "Ataque Furtivo",
            "timing": null,
            "text": "+3d6."
        },
        {
            "name": "Ordens",
            "timing": "movimento",
            "text": "O chefe grita ordens para seus aliados em alcance médio. Eles recebem +2 em testes de perícia até o fim da cena."
        },
        {
            "name": "Tropas Dispensáveis",
            "timing": "reação",
            "text": "Uma vez por rodada, quando é afetado por um ataque ou efeito, o chefe faz com que um aliado adjacente sofra todos os efeitos em seu lugar."
        }
    ],
    "equipment": "Bandana, couro batido, espada curta certeira, espada longa",
    "treasure": "Padrão.",
    "skillsText": "Furtividade +8, Intimidação +8"
};

export const devotoDeHyninnManhoso = {
    "id": "devoto-de-hyninn-manhoso",
    "name": "Devoto de Hyninn Manhoso",
    "type": "humanoid",
    "subtype": "humano",
    "size": "Médio",
    "challengeRating": 0.5,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p44 ate 52.pdf",
        "pdfPage": 6,
        "bookPage": 47
    },
    "stats": {
        "initiative": 5,
        "perception": 3,
        "defense": 13,
        "fortitude": -1,
        "reflex": 6,
        "will": 3,
        "hitPoints": 12,
        "speedText": "9m (6q)",
        "senses": null,
        "defensesText": "imunidade a efeitos de movimento",
        "attributes": {
            "str": -1,
            "dex": 2,
            "con": 0,
            "int": 1,
            "wis": 0,
            "cha": 2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Adaga +6 (2d4+5, 19)."
        }
    ],
    "abilities": [
        {
            "name": "No Bolso Dói Mais",
            "timing": null,
            "text": "Quando acerta um ataque em corpo a corpo, para cada 1 ponto de dano causado, o devoto de Hyninn manhoso rouba T$ 1 da vítima. Mesmo que o devoto de Hyninn seja derrotado, há 50% de chance de que esses tibares tenham desaparecido para sempre, pela graça de Hyninn."
        },
        {
            "name": "Truque de Espelhos",
            "timing": "reação",
            "text": "Uma vez por rodada, quando é atacado, o devoto pode enganar o atacante com uma distração, como um reflexo em uma janela, fazendo com que o ataque erre automaticamente (Von CD 15 evita). O devoto só pode usar esta habilidade uma vez por cena contra cada criatura."
        }
    ],
    "equipment": "Adaga, gazua",
    "treasure": "Metade.",
    "skillsText": "Enganação +6, Furtividade +6, Ladinagem +6"
};

export const devotoDeHyninnSimao = {
    "id": "devoto-de-hyninn-simao",
    "name": "Devoto de Hyninn Simão",
    "type": "humanoid",
    "subtype": "humano",
    "size": "Médio",
    "challengeRating": 1,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p44 ate 52.pdf",
        "pdfPage": 6,
        "bookPage": 47
    },
    "stats": {
        "initiative": 6,
        "perception": 3,
        "defense": 15,
        "fortitude": 0,
        "reflex": 11,
        "will": 5,
        "hitPoints": 26,
        "speedText": "9m (6q)",
        "senses": null,
        "defensesText": "imunidade a efeitos de movimento",
        "attributes": {
            "str": -1,
            "dex": 3,
            "con": 0,
            "int": 1,
            "wis": 0,
            "cha": 2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Adaga +8 (2d4+10, 19)."
        }
    ],
    "abilities": [
        {
            "name": "No Bolso Dói Mais",
            "timing": null,
            "text": "Quando acerta um ataque em corpo a corpo, para cada 1 ponto de dano causado, o devoto de Hyninn simão rouba T$ 1 da vítima. Mesmo que o devoto de Hyninn seja derrotado, há 75% de chance de que esses tibares tenham desaparecido para sempre, louvado seja Hyninn."
        },
        {
            "name": "Truque de Espelhos",
            "timing": "reação",
            "text": "Uma vez por rodada, quando é atacado, o devoto pode enganar o atacante com uma distração, como um reflexo em uma janela, fazendo com que o ataque erre automaticamente (Von CD 16 evita). O devoto só pode usar esta habilidade uma vez por cena contra cada criatura."
        }
    ],
    "equipment": "Adaga, gazua",
    "treasure": "Metade.",
    "skillsText": "Enganação +6, Furtividade +7, Ladinagem +7"
};

export const devotoDeHyninnVelhaco = {
    "id": "devoto-de-hyninn-velhaco",
    "name": "Devoto de Hyninn Velhaco",
    "type": "humanoid",
    "subtype": "humano",
    "size": "Médio",
    "challengeRating": 4,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p44 ate 52.pdf",
        "pdfPage": 7,
        "bookPage": 48
    },
    "stats": {
        "initiative": 9,
        "perception": 5,
        "defense": 22,
        "fortitude": 4,
        "reflex": 16,
        "will": 10,
        "hitPoints": 88,
        "speedText": "9m (6q)",
        "senses": null,
        "defensesText": "imunidade a efeitos de movimento e surpreendido",
        "attributes": {
            "str": 0,
            "dex": 4,
            "con": 0,
            "int": 1,
            "wis": 0,
            "cha": 3
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Adaga x2 +15 (1d4+8, 18)."
        }
    ],
    "abilities": [
        {
            "name": "Malandríssimo",
            "timing": null,
            "text": "Quando o devoto de Hyninn velhaco passa em um teste de resistência contra um efeito de um inimigo, esse inimigo perde 3 PM."
        },
        {
            "name": "No Bolso Dói Mais",
            "timing": null,
            "text": "Quando acerta um ataque em corpo a corpo, para cada 1 ponto de dano causado, o devoto rouba T$ 1 da vítima. Mesmo que o devoto seja derrotado, há 90% de chance de que esses tibares tenham desaparecido para sempre, pois é grande a mão de Hyninn."
        },
        {
            "name": "Truque de Espelhos",
            "timing": "reação",
            "text": "Uma vez por rodada, quando é atacado, o devoto pode enganar o atacante com uma distração, como um reflexo em uma janela, fazendo com que o ataque erre automaticamente (Von CD 20 evita). O devoto só pode usar esta habilidade uma vez por cena contra cada criatura."
        }
    ],
    "equipment": "Adaga precisa, capa esvoaçante, gazua",
    "treasure": "Metade.",
    "skillsText": "Enganação +10, Furtividade +10, Ladinagem +10"
};

export const duplo = {
    "id": "duplo",
    "name": "Duplo",
    "type": "humanoid",
    "subtype": "duplo",
    "size": "Médio",
    "challengeRating": 4,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p44 ate 52.pdf",
        "pdfPage": 9,
        "bookPage": 50
    },
    "stats": {
        "initiative": 9,
        "perception": 6,
        "defense": 21,
        "fortitude": 5,
        "reflex": 15,
        "will": 10,
        "hitPoints": 143,
        "speedText": "9m (6q)",
        "senses": null,
        "defensesText": "cura acelerada 5; imunidade a adivinhação e efeitos mentais",
        "attributes": {
            "str": 2,
            "dex": 5,
            "con": 2,
            "int": 2,
            "wis": 2,
            "cha": 4
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Garra x2 +14 (1d6+7)."
        }
    ],
    "abilities": [
        {
            "name": "Ataque Furtivo",
            "timing": null,
            "text": "+3d6."
        },
        {
            "name": "Detectar Pensamentos",
            "timing": null,
            "text": "O duplo detecta constantemente os pensamentos superficiais de todas as criaturas inteligentes em alcance curto. Ele não pode ser surpreendido por criaturas cujos pensamentos esteja detectando dessa forma, e recebe +2 na Defesa e em testes de perícia contra elas. Uma criatura ciente desta habilidade pode gastar uma ação de movimento e fazer um teste de Vontade (CD 20). Se passar, esconde seus pensamentos até o fim da cena."
        },
        {
            "name": "Mudar Forma",
            "timing": "padrão",
            "text": "O duplo assume a forma de qualquer humanoide de tamanho Pequeno a Grande, como no efeito da magia Metamorfose. Ele pode permanecer na forma escolhida por tempo indeterminado, mas, se morrer, reverte à forma natural."
        }
    ],
    "equipment": "Duplos geralmente não usam equipamento, mas podem portar armas, ferramentas e roupas adequadas ao seu disfarce atual",
    "treasure": "Padrão.",
    "skillsText": "Enganação +14, Furtividade +11, Intuição +10"
};

export const gatuno = {
    "id": "gatuno",
    "name": "Gatuno",
    "type": "humanoid",
    "subtype": "humano",
    "size": "Médio",
    "challengeRating": 1,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p44 ate 52.pdf",
        "pdfPage": 8,
        "bookPage": 49
    },
    "stats": {
        "initiative": 7,
        "perception": 2,
        "defense": 14,
        "fortitude": 0,
        "reflex": 11,
        "will": 5,
        "hitPoints": 25,
        "speedText": "9m (6q), escalada 6m (4q)",
        "senses": null,
        "defensesText": null,
        "attributes": {
            "str": 0,
            "dex": 3,
            "con": 1,
            "int": 1,
            "wis": 0,
            "cha": 0
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Porrete +9 (1d6+5 não letal)."
        }
    ],
    "abilities": [
        {
            "name": "Ataque Furtivo",
            "timing": null,
            "text": "+2d6."
        },
        {
            "name": "Pancada na Cabeça",
            "timing": null,
            "text": "Uma criatura atingida por um ataque furtivo do gatuno fica inconsciente e caída ou, se estiver envolvida em combate ou outra situação perigosa, fica exausta por 1 rodada, depois fatigada (em ambos os casos, Fort CD 16 reduz para fatigada por 1d4 rodadas)."
        },
        {
            "name": "Sombra",
            "timing": null,
            "text": "O gatuno não sofre penalidade em testes de Furtividade por se mover ao seu deslocamento normal e reduz a penalidade por atacar e fazer outras ações chamativas para –10."
        }
    ],
    "equipment": "Armadura de couro, gazua, porrete",
    "treasure": "Padrão.",
    "skillsText": "Acrobacia +7, Furtividade +10, Ladinagem +7"
};

export const gatunoMestre = {
    "id": "gatuno-mestre",
    "name": "Gatuno Mestre",
    "type": "humanoid",
    "subtype": "humano",
    "size": "Médio",
    "challengeRating": 3,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p44 ate 52.pdf",
        "pdfPage": 8,
        "bookPage": 49
    },
    "stats": {
        "initiative": 8,
        "perception": 3,
        "defense": 19,
        "fortitude": 3,
        "reflex": 15,
        "will": 9,
        "hitPoints": 68,
        "speedText": "9m (6q), escalada 6m (4q)",
        "senses": null,
        "defensesText": "evasão; resistência a efeitos de movimento +3",
        "attributes": {
            "str": 0,
            "dex": 4,
            "con": 1,
            "int": 1,
            "wis": 0,
            "cha": 0
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Porrete +14 (1d6+7 não letal)."
        }
    ],
    "abilities": [
        {
            "name": "Ataque Furtivo",
            "timing": null,
            "text": "+3d6."
        },
        {
            "name": "Bomba de Fumaça",
            "timing": "padrão",
            "text": "O gatuno mestre prepara e arremessa uma bomba de fumaça em um ponto em alcance curto. A bomba libera uma fumaça espessa em um raio de 6m a partir do impacto; a fumaça obscurece toda a visão, fornece camuflagem para criaturas a até 1,5m e camuflagem total para criaturas a partir de 3m e dura até o fim da cena."
        },
        {
            "name": "Pancada na Cabeça",
            "timing": null,
            "text": "Uma criatura atingida por um ataque furtivo do gatuno mestre fica inconsciente e caída ou, se estiver envolvida em combate ou outra situação perigosa, fica exausta por 1 rodada, depois fatigada (em ambos os casos, Fort CD 19 reduz para fatigada por 1d4 rodadas)."
        },
        {
            "name": "Sombra",
            "timing": null,
            "text": "O gatuno mestre não sofre penalidade em testes de Furtividade por se mover ao seu deslocamento normal e reduz a penalidade por atacar e fazer outras ações chamativas para –10."
        }
    ],
    "equipment": "Armadura de couro, bomba de fumaça x3, gazua aprimorada, porrete",
    "treasure": "Padrão.",
    "skillsText": "Acrobacia +9, Furtividade +12, Ladinagem +10"
};

export const jagunco = {
    "id": "jagunco",
    "name": "Jagunço",
    "type": "humanoid",
    "subtype": "humano",
    "size": "Médio",
    "challengeRating": 2,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p44 ate 52.pdf",
        "pdfPage": 2,
        "bookPage": 43
    },
    "stats": {
        "initiative": 7,
        "perception": 3,
        "defense": 18,
        "fortitude": 8,
        "reflex": 9,
        "will": 5,
        "hitPoints": 21,
        "speedText": "9m (6q)",
        "senses": null,
        "defensesText": "imunidade a medo",
        "attributes": {
            "str": 2,
            "dex": 3,
            "con": 2,
            "int": -1,
            "wis": 0,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Espada longa x2 +14 (1d8+6, 19)."
        },
        {
            "name": "À Distância",
            "text": "Pistola +14 (2d6+6, 19/x3)."
        }
    ],
    "abilities": [
        {
            "name": "Saque Rápido",
            "timing": null,
            "text": "O jagunço pode sacar ou guardar itens como uma ação livre e recarregar sua pistola como uma ação de movimento."
        }
    ],
    "equipment": "Balas x20, couro batido, espada longa, pistola",
    "treasure": "Metade.",
    "skillsText": "Intimidação +6, Sobrevivência +5"
};

export const sacerdoteDeHyninn = {
    "id": "sacerdote-de-hyninn",
    "name": "Sacerdote de Hyninn",
    "type": "humanoid",
    "subtype": "goblin",
    "size": "Pequeno",
    "challengeRating": 2,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p44 ate 52.pdf",
        "pdfPage": 5,
        "bookPage": 46
    },
    "stats": {
        "initiative": 6,
        "perception": 6,
        "defense": 17,
        "fortitude": 5,
        "reflex": 7,
        "will": 12,
        "hitPoints": 49,
        "manaPoints": 28,
        "speedText": "9m (6q), escalada 9m (6q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a efeitos mentais",
        "attributes": {
            "str": -1,
            "dex": 3,
            "con": 1,
            "int": 0,
            "wis": 3,
            "cha": 2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Adaga x2 +10 (1d4+5, 19)."
        }
    ],
    "abilities": [
        {
            "name": "Bênção do Gatuno",
            "timing": "livre",
            "text": "Uma vez por cena, o sacerdote de Hyninn lança uma magia como uma ação livre, pagando seu custo normal."
        },
        {
            "name": "Forma de Macaco",
            "timing": "completa",
            "cost": "2 PM",
            "text": "O sacerdote se transforma em um macaco. Ele adquire tamanho Minúsculo (+5 em Furtividade e –5 em testes de manobra). Seu equipamento desaparece (e ele perde seus benefícios) até voltar ao normal, mas suas outras estatísticas não são alteradas. A transformação dura indefinidamente, mas termina caso ele faça um ataque, lance uma magia ou sofra dano."
        },
        {
            "name": "Malandragem Divina",
            "timing": "livre",
            "cost": "1 PM",
            "text": "Quando faz um teste de perícia, o sacerdote usa Enganação no lugar da perícia original."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como um clérigo de Hyninn de 2º nível (CD 18)."
        },
        {
            "name": "Arma Espiritual",
            "timing": "padrão",
            "cost": "2 PM",
            "text": "Até o fim da cena, o sacerdote recebe +1 na Defesa e, uma vez por rodada, quando sofre um ataque corpo a corpo, pode usar uma reação para causar 2d6 pontos de dano de corte no atacante."
        },
        {
            "name": "Curar Ferimentos",
            "timing": "padrão",
            "cost": "2 PM",
            "text": "Uma criatura adjacente cura 3d8+3 PV."
        },
        {
            "name": "Despedaçar",
            "timing": "padrão",
            "cost": "1 PM",
            "text": "Um alvo em alcance curto sofre 1d8+2 pontos de dano de impacto se for uma criatura, ou o dobro disso sem aplicar RD se for um construto ou um objeto mundano Pequeno, e fica atordoado (Fort reduz à metade e evita a condição). Uma criatura só pode ficar atordoada por esta magia uma vez por cena."
        }
    ],
    "equipment": "Adaga, gazua, símbolo sagrado de Hyninn",
    "treasure": "Padrão.",
    "skillsText": "Enganação +7, Ladinagem +10, Religião +6"
};

export const iniciadoDaAgonia = {
    "id": "iniciado-da-agonia",
    "name": "Iniciado da Agonia",
    "type": "humanoid",
    "subtype": "humano",
    "size": "Médio",
    "challengeRating": 3,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p54 ate 64.pdf",
        "pdfPage": 1,
        "bookPage": 52
    },
    "stats": {
        "initiative": 8,
        "perception": 8,
        "defense": 20,
        "fortitude": 5,
        "reflex": 8,
        "will": 13,
        "hitPoints": 28,
        "manaPoints": 28,
        "speedText": "9m (6q)",
        "senses": null,
        "defensesText": "imunidade a efeitos mentais e medo; resistência a magia divina +5",
        "attributes": {
            "str": 1,
            "dex": 3,
            "con": 2,
            "int": -1,
            "wis": 3,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Adaga +16 (1d4+7, 19)."
        }
    ],
    "abilities": [
        {
            "name": "Júbilo na Dor",
            "timing": null,
            "text": "Quando causa ou sofre dano, o acólito da agonia recebe redução de dano 2 e recupera 1d4 pontos de mana. A redução de dano é cumulativa, até um máximo de RD 10, mas volta a zero se o acólito passar 1 rodada sem causar ou sofrer dano."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como um clérigo de Aharadak de 5º nível (CD 17, limite de 5 PM)."
        },
        {
            "name": "Arma Espiritual",
            "timing": "padrão",
            "cost": "4 PM",
            "text": "Até o fim da cena, o acólito recebe +2 na Defesa e, uma vez por rodada, quando sofre um ataque corpo a corpo, pode usar uma reação para causar 2d6 pontos de dano de corte no atacante."
        },
        {
            "name": "Infligir Ferimentos",
            "timing": "padrão",
            "cost": "5 PM",
            "text": "Uma criatura adjacente sofre 4d8+4 pontos de dano de trevas (Fort reduz à metade)."
        },
        {
            "name": "Perdição",
            "timing": "padrão",
            "cost": "3 PM",
            "text": "Criaturas escolhidas em alcance curto sofrem –2 em testes de ataque e rolagens de dano até o fim da cena."
        }
    ],
    "equipment": "Adaga, gibão de peles e símbolo sagrado de Aharadak",
    "treasure": "Metade.",
    "skillsText": "Intimidação +7, Religião +6"
};

export const sacerdoteDaAgonia = {
    "id": "sacerdote-da-agonia",
    "name": "Sacerdote da Agonia",
    "type": "humanoid",
    "subtype": "humano",
    "size": "Médio",
    "challengeRating": 9,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p54 ate 64.pdf",
        "pdfPage": 1,
        "bookPage": 52
    },
    "stats": {
        "initiative": 15,
        "perception": 19,
        "defense": 32,
        "fortitude": 9,
        "reflex": 15,
        "will": 21,
        "hitPoints": 192,
        "manaPoints": 61,
        "speedText": "9m (6q)",
        "senses": "não pode ser flanqueado",
        "defensesText": "fortificação 25%; imunidade a efeitos mentais e medo; resistência a magia divina +5",
        "attributes": {
            "str": 1,
            "dex": 3,
            "con": 3,
            "int": -1,
            "wis": 6,
            "cha": 0
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Adaga da Tormenta x2 +22 (1d4+16, 19, mais 1d8 de trevas)."
        }
    ],
    "abilities": [
        {
            "name": "Apetite por Destruição",
            "timing": "completa",
            "cost": "10 PM",
            "text": "O sacerdote da agonia suga a energia vital de todos os seres em uma esfera de 6m ao seu redor. Criaturas vivas na área sofrem 6d10 pontos de dano de trevas e o sacerdote recebe PV temporários iguais ao dano total causado."
        },
        {
            "name": "Júbilo na Dor",
            "timing": null,
            "text": "Quando causa ou sofre dano, o acólito da agonia recebe redução de dano 2 e recupera 2d4 pontos de mana. A redução de dano é cumulativa, até um máximo de RD 20, mas volta a zero se o acólito passar 1 rodada sem causar ou sofrer dano."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como um clérigo de Aharadak de 9º nível (CD 32, limite de 10 PM)."
        },
        {
            "name": "Arma Espiritual",
            "timing": "padrão",
            "cost": "10 PM",
            "text": "Até o fim da cena, duas vezes por rodada, quando sofre um ataque corpo a corpo, o sacerdote pode usar uma reação para causar 4d6 pontos de corte no atacante."
        },
        {
            "name": "Enxame Rubro de Ichabod",
            "timing": "padrão",
            "cost": "8 PM",
            "text": "Sustentada. Um enxame de pequenas criaturas da Tormenta surge em alcance médio e ocupa uma área de 3m. No fim de cada turno do sacerdote, o enxame causa 5d12 pontos de dano de ácido a qualquer criatura em seu espaço (Ref reduz à metade). O sacerdote pode gastar uma ação de movimento para mover o enxame com deslocamento de 12m."
        },
        {
            "name": "Infligir Ferimentos",
            "timing": "padrão",
            "cost": "7 PM",
            "text": "Uma criatura adjacente ao sacerdote sofre 5d8+5 pontos de dano de trevas (Fort reduz à metade)."
        },
        {
            "name": "Miasma Mefítico",
            "timing": "padrão",
            "cost": "7 PM",
            "text": "Uma nuvem de 6m de raio se forma em alcance médio. Criaturas na área sofrem 7d6 pontos de dano de ácido e ficam enjoadas por 1 rodada (Fort reduz à metade e evita a condição)."
        },
        {
            "name": "Perdição",
            "timing": "padrão",
            "cost": "5 PM",
            "text": "Criaturas escolhidas em alcance curto sofrem –3 em testes de ataque e rolagens de dano até o fim da cena."
        }
    ],
    "equipment": "Gibão de peles espinhoso de matéria vermelha, símbolo sagrado de Aharadak",
    "treasure": "Metade mais adaga da Tormenta (veja Reishid).",
    "skillsText": "Intimidação +11, Religião +15"
};

export const bruxaGoblin = {
    "id": "bruxa-goblin",
    "name": "Bruxa Goblin",
    "type": "humanoid",
    "subtype": "goblin",
    "size": "Pequeno",
    "challengeRating": 11,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p80 ate 90.pdf",
        "pdfPage": 2,
        "bookPage": 79
    },
    "stats": {
        "initiative": 11,
        "perception": 11,
        "defense": 37,
        "fortitude": 12,
        "reflex": 17,
        "will": 24,
        "hitPoints": 370,
        "manaPoints": 98,
        "speedText": "9m (6q), escalada 9m (6q), voo 18m (12q)",
        "senses": "visão no escuro",
        "defensesText": "resistência a magia +2",
        "attributes": {
            "str": -1,
            "dex": 2,
            "con": 3,
            "int": 7,
            "wis": 2,
            "cha": 1
        }
    },
    "actions": [],
    "abilities": [
        {
            "name": "Autofagia",
            "timing": "completa",
            "text": "A bruxa lança uma magia divina qualquer de encantamento ou necromancia de até 3º círculo pagando um custo em PV igual ao custo em PM da magia."
        },
        {
            "name": "Raio Conspurcado",
            "timing": "padrão",
            "cost": "1 PM",
            "text": "A bruxa dispara um raio em uma criatura em alcance médio. A vítima sofre 4d12 pontos de dano de trevas e fica abalada (Von CD 33 reduz à metade e evita a condição)."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como uma bruxa de 13º nível (CD 33). Seu foco arcano é seu pilão conspurcado (–1 no custo e +2 na CD de encantamento e necromancia)."
        },
        {
            "name": "Amedrontar",
            "timing": "padrão",
            "cost": "9 PM",
            "text": "Criaturas à escolha da bruxa em alcance curto ficam apavoradas por 1d4+1 rodadas e depois abaladas (Von reduz para abalada por 1d4 rodadas)."
        },
        {
            "name": "Crânio Voador de Vladislav",
            "timing": "padrão",
            "cost": "10 PM",
            "text": "Um crânio de energia negativa causa 8d8+8 pontos de dano de trevas em uma criatura em alcance médio e deixa o alvo e todas as criaturas a 3m dele abaladas (Fort reduz à metade e evita a condição)."
        },
        {
            "name": "Ferver Sangue",
            "timing": "padrão",
            "cost": "11 PM",
            "text": "Sustentada. A bruxa faz o sangue de uma criatura em alcance curto aquecer até entrar em ebulição. Quando a magia é lançada, e no início de cada um de seus turnos, o alvo sofre 7d8 pontos de dano de fogo e fica enjoado por 1 rodada (Fort reduz à metade e evita a condição). Se o alvo passar em dois testes de Fortitude seguidos, dissipa a magia. Se o alvo for reduzido a 0 PV pelo dano desta magia, seu corpo explode, matando-o e causando 6d6 pontos de dano de fogo em todas as criaturas a até 3m (Ref reduz à metade). Não afeta criaturas sem sangue, como construtos ou mortos-vivos."
        },
        {
            "name": "Marionete",
            "timing": "padrão",
            "cost": "9 PM",
            "text": "Sustentada. A bruxa controla as ações físicas de uma criatura em alcance médio. Ao sofrer a magia, e no início de cada um de seus turnos, a vítima faz um teste de Fortitude. Se passar, a magia é anulada."
        },
        {
            "name": "Raio do Enfraquecimento",
            "timing": "padrão",
            "cost": "7 PM",
            "text": "Criaturas à escolha da bruxa em alcance curto ficam exaustas (Fort reduz para fatigada)."
        },
        {
            "name": "Sussurros Insanos",
            "timing": "padrão",
            "cost": "3 PM",
            "text": "Palavras desconexas proferidas pela bruxa deixam um humanoide em alcance curto confuso (Von anula)."
        },
        {
            "name": "Tentáculos de Trevas",
            "timing": "padrão",
            "cost": "6 PM",
            "text": "Até o fim da cena, tentáculos surgem em uma esfera de 6m em alcance médio e tentam agarrar todas as criaturas na área. Ao lançar a magia e no início de cada um de seus turnos, a bruxa faz um teste da manobra agarrar (usando Misticismo) contra cada criatura na área. Se ela passar, a criatura é agarrada; se a vítima já está agarrada, é esmagada, sofrendo 4d6 pontos de dano de trevas. A área conta como terreno difícil e os tentáculos são imunes a dano."
        }
    ],
    "equipment": "Pilão conspurcado, vassoura voadora",
    "treasure": "Padrão.",
    "skillsText": "Conhecimento +16, Cura +11, Misticismo +21, Religião +16"
};

export const bugbearGuardaCostas = {
    "id": "bugbear-guarda-costas",
    "name": "Bugbear Guarda-Costas",
    "type": "humanoid",
    "subtype": "bugbear",
    "size": "Médio",
    "challengeRating": 6,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p80 ate 90.pdf",
        "pdfPage": 2,
        "bookPage": 79
    },
    "stats": {
        "initiative": 8,
        "perception": 5,
        "defense": 26,
        "fortitude": 14,
        "reflex": 15,
        "will": 7,
        "hitPoints": 48,
        "speedText": "9m (6q)",
        "senses": "faro, visão no escuro",
        "defensesText": "resistência a medo +2",
        "attributes": {
            "str": 6,
            "dex": 3,
            "con": 3,
            "int": 1,
            "wis": 0,
            "cha": -2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Machado de guerra x2 +24 (3d6+20, x3)."
        }
    ],
    "abilities": [
        {
            "name": "Êxtase no Medo",
            "timing": null,
            "text": "O bugbear guarda-costas sofre metade do dano de criaturas sob algum efeito de medo."
        },
        {
            "name": "Quebrar Armas",
            "timing": "livre",
            "text": "Uma vez por rodada, quando acerta um ataque corpo a corpo, o guarda-costas pode usar a manobra quebrar (teste +26)."
        }
    ],
    "equipment": "Gibão de peles, machado de guerra aumentado cruel",
    "treasure": "Metade.",
    "skillsText": "Atletismo +11, Furtividade +8, Intimidação +11"
};

export const bugbearSentinela = {
    "id": "bugbear-sentinela",
    "name": "Bugbear Sentinela",
    "type": "humanoid",
    "subtype": "bugbear",
    "size": "Médio",
    "challengeRating": 2,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p80 ate 90.pdf",
        "pdfPage": 2,
        "bookPage": 79
    },
    "stats": {
        "initiative": 6,
        "perception": 5,
        "defense": 17,
        "fortitude": 8,
        "reflex": 10,
        "will": 3,
        "hitPoints": 18,
        "speedText": "9m (6q)",
        "senses": "faro, visão no escuro",
        "defensesText": "resistência a medo +2",
        "attributes": {
            "str": 5,
            "dex": 3,
            "con": 2,
            "int": -1,
            "wis": 0,
            "cha": -2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Machado de guerra +14 (3d6+10, x3)."
        }
    ],
    "abilities": [
        {
            "name": "Êxtase no Medo",
            "timing": null,
            "text": "O bugbear sentinela sofre metade do dano de criaturas sob algum efeito de medo."
        }
    ],
    "equipment": "Apito, gibão de peles, machado de guerra aumentado",
    "treasure": "Metade.",
    "skillsText": "Atletismo +8, Furtividade +6, Intimidação +8"
};

export const gangueGoblin = {
    "id": "gangue-goblin",
    "name": "Gangue Goblin",
    "type": "humanoid",
    "subtype": "goblin",
    "size": "Grande",
    "challengeRating": 5,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p80 ate 90.pdf",
        "pdfPage": 3,
        "bookPage": 80
    },
    "stats": {
        "initiative": 5,
        "perception": 10,
        "defense": 20,
        "fortitude": 14,
        "reflex": 10,
        "will": 6,
        "hitPoints": 171,
        "speedText": "9m (6q), escalada 9m (6q)",
        "senses": "visão no escuro",
        "defensesText": null,
        "attributes": {
            "str": 1,
            "dex": 3,
            "con": 1,
            "int": -1,
            "wis": -1,
            "cha": -2
        }
    },
    "actions": [
        {
            "name": "Enxame",
            "text": "5d6 pontos de dano de perfuração."
        }
    ],
    "abilities": [
        {
            "name": "Frenesi Incontrolável",
            "timing": null,
            "text": "Para cada 20 pontos de dano que a gangue goblin sofre, seu dano aumenta em +1d6 até o fim da cena."
        },
        {
            "name": "Cada Um por Si!",
            "timing": null,
            "text": "Quando é reduzida a 0 PV ou menos, a gangue se dispersa, deixando apenas os mais fracos para trás. Ela se transforma em 1d4+2 goblins salteadores."
        }
    ],
    "equipment": null,
    "treasure": "Metade.",
    "skillsText": null
};

export const goblinBomba = {
    "id": "goblin-bomba",
    "name": "Goblin-Bomba",
    "type": "humanoid",
    "subtype": "goblin",
    "size": "Pequeno",
    "challengeRating": 3,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p80 ate 90.pdf",
        "pdfPage": 5,
        "bookPage": 82
    },
    "stats": {
        "initiative": 9,
        "perception": 2,
        "defense": 19,
        "fortitude": 9,
        "reflex": 15,
        "will": 3,
        "hitPoints": 74,
        "speedText": "9m (6q), escalada 9m (6q)",
        "senses": "visão no escuro",
        "defensesText": "redução de ácido e fogo 5; resistência a veneno +5",
        "attributes": {
            "str": 0,
            "dex": 4,
            "con": 2,
            "int": 3,
            "wis": -1,
            "cha": 0
        }
    },
    "actions": [],
    "abilities": [
        {
            "name": "Granadas a Granel",
            "timing": "padrão",
            "text": "O goblin-bomba arremessa uma granada em alcance médio. Quando acerta uma granada em um alvo, role 1d4: 1) O alvo e criaturas adjacentes sofrem 3d6+8 pontos de dano de fogo e ficam em chamas (Ref CD 18 reduz à metade e evita a condição). 2) O alvo e criaturas adjacentes sofrem 2d4+10 pontos de dano de ácido, mais 2d4 na rodada seguinte (Ref CD 18 reduz à metade e evita o dano secundário). 3) O alvo perde 1d12 pontos de vida por veneno e fica fraco (Fort CD 18 reduz a perda à metade e evita a condição). 4) Gera um efeito semelhante ao da magia Névoa, centrada no alvo, com o aprimoramento de cheiro horrível (Fort CD 18 evita)."
        },
        {
            "name": "Grand Finale",
            "timing": "reação",
            "text": "Quando o goblin-bomba chegar a 0 PV, role 1d6: um resultado 1 ou 2 significa que todas as granadas explodem; o goblin e seu equipamento são destruídos e todas as criaturas a 3m sofrem 2d6 pontos de dano de fogo, de ácido e de veneno (para um total de 6d6) e ficam atordoadas por 1 rodada (Ref CD 18 reduz à metade e evita a condição)."
        }
    ],
    "equipment": "Bandoleira de poções, couro batido",
    "treasure": "Padrão mais insumos (valem T$ 50 para fabricar itens alquímicos).",
    "skillsText": "Furtividade +7, Ofício (alquimista) +9"
};

export const goblinDeFerro = {
    "id": "goblin-de-ferro",
    "name": "Goblin de Ferro",
    "type": "humanoid",
    "subtype": "goblin",
    "size": "Médio",
    "challengeRating": 5,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p80 ate 90.pdf",
        "pdfPage": 5,
        "bookPage": 82
    },
    "stats": {
        "initiative": 11,
        "perception": 2,
        "defense": 28,
        "fortitude": 17,
        "reflex": 11,
        "will": 5,
        "hitPoints": 150,
        "speedText": "12m (8q), escalada 12m (8q)",
        "senses": "visão no escuro",
        "defensesText": "redução de corte, impacto e perfuração 10",
        "attributes": {
            "str": 3,
            "dex": 3,
            "con": 2,
            "int": 5,
            "wis": -1,
            "cha": 0
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Pancada +16 (2d8+22)."
        }
    ],
    "abilities": [
        {
            "name": "Armadura Blindada",
            "timing": null,
            "text": "A veste mecânica do goblin de ferro fornece +10 na Defesa e redução de corte, impacto e perfuração 10 (já contabilizados)."
        },
        {
            "name": "Engenhocas de Combate",
            "timing": "padrão",
            "text": "O goblin de ferro ativa uma das engenhocas de sua armadura, escolhida aleatoriamente (role 1d6). Isso exige um teste de Ofício (engenhoqueiro) com CD 20. Em caso de falha, a engenhoca pifa e não pode mais ser usada. Se uma engenhoca pifada for selecionada novamente, explode, causando 4d6 pontos de dano de fogo em todas as criaturas (inclusive o goblin) em alcance curto (Ref CD 21 reduz à metade). A CD para resistir às engenhocas do goblin de ferro é 21. 1) Garra eletrificada: como Toque Chocante. 2) Lança-chamas: como Explosão de Chamas. 3) Disparador de rede: como Teia. 4) Foguetes teleguiados: como Seta Infalível, mas com dano de fogo. 5) Campo de força: como Campo de Força. 6) Míssil explosivo: como Bola de Fogo."
        }
    ],
    "equipment": "Instrumentos de ofício (engenhoqueiro)",
    "treasure": "Padrão mais peças sobressalentes (valem T$ 500 para fabricar engenhocas).",
    "skillsText": "Atletismo +11, Ofício (engenhoqueiro) +16"
};

export const goblinDeFerroMarkII = {
    "id": "goblin-de-ferro-mark-ii",
    "name": "Goblin de Ferro Mark II",
    "type": "humanoid",
    "subtype": "goblin",
    "size": "Grande",
    "challengeRating": 8,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p80 ate 90.pdf",
        "pdfPage": 6,
        "bookPage": 83
    },
    "stats": {
        "initiative": 17,
        "perception": 6,
        "defense": 36,
        "fortitude": 15,
        "reflex": 21,
        "will": 7,
        "hitPoints": 300,
        "speedText": "12m (8q), escalada 12m (8q), voo 18m (12q)",
        "senses": "visão no escuro",
        "defensesText": "redução de corte, impacto e perfuração 20",
        "attributes": {
            "str": 4,
            "dex": 4,
            "con": 2,
            "int": 8,
            "wis": -1,
            "cha": 0
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Duas garras +24 (3d6+26, alcance 3m)."
        }
    ],
    "abilities": [
        {
            "name": "Arco Voltaico",
            "timing": "movimento",
            "text": "Uma vez por rodada, o goblin de ferro mark II causa 4d8+4 pontos de dano de eletricidade em dois alvos a até 3m (Ref CD 25 reduz à metade). Se o alvo usa armadura de metal (ou carrega muito metal, a critério do mestre), sofre –5 no teste de resistência. Alvos agarrados não têm direito ao teste de Reflexos."
        },
        {
            "name": "Armadura Blindada",
            "timing": null,
            "text": "A veste mecânica do goblin de ferro fornece +15 na Defesa e redução de corte, impacto e perfuração 20 (já contabilizados)."
        },
        {
            "name": "Canhão Congelante",
            "timing": "padrão",
            "text": "Uma vez por rodada, o goblin de ferro dispara um raio que aprisiona uma criatura em alcance médio em um bloco de gelo. O alvo sofre 6d8 pontos de dano de frio e fica paralisado (Fort CD 25 reduz à metade e muda a condição para lento por 1 rodada). É possível quebrar o gelo para libertar a criatura: o bloco tem 10 PV, redução de dano 8 e vulnerabilidade a fogo. Uma criatura presa pode usar uma ação completa para fazer um teste de Força (CD 18) e tentar se libertar do gelo."
        },
        {
            "name": "Foguete Explosivo",
            "timing": "livre",
            "text": "Uma vez por rodada, o goblin de ferro dispara um projétil em uma criatura em alcance médio. O alvo sofre 4d6 pontos de dano de fogo e fica em chamas; criaturas adjacentes ao alvo sofrem metade do dano e também ficam em chamas (Ref CD 25 reduz à metade e evita a condição)."
        },
        {
            "name": "Garra-Gancho",
            "timing": "padrão",
            "text": "O goblin de ferro faz a manobra agarrar (teste +19) contra uma criatura Média ou menor em alcance curto. Se agarrar a criatura, pode puxá-la para qualquer espaço adjacente como parte desta ação. No início do seu turno, o goblin causa 3d10+8 pontos de dano de impacto em cada criatura que estiver agarrando (ele pode agarrar até duas criaturas, uma com cada garra)."
        }
    ],
    "equipment": "Instrumentos de Ofício (engenhoqueiro) aprimorados",
    "treasure": "Padrão mais peças sobressalentes (valem T$ 2.000 para fabricar engenhocas).",
    "skillsText": "Atletismo +14, Ofício (engenhoqueiro) +26"
};

export const hobgoblinAtirador = {
    "id": "hobgoblin-atirador",
    "name": "Hobgoblin Atirador",
    "type": "humanoid",
    "subtype": "hobgoblin",
    "size": "Médio",
    "challengeRating": 5,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p80 ate 90.pdf",
        "pdfPage": 7,
        "bookPage": 84
    },
    "stats": {
        "initiative": 13,
        "perception": 6,
        "defense": 22,
        "fortitude": 11,
        "reflex": 16,
        "will": 6,
        "hitPoints": 38,
        "speedText": "9m (6q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a ofuscado",
        "attributes": {
            "str": 1,
            "dex": 5,
            "con": 2,
            "int": 1,
            "wis": 2,
            "cha": -2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Lança de fogo +17 (1d10+6, 19/x3)."
        },
        {
            "name": "À Distância",
            "text": "Lança de fogo +20 (3d8+20, 18/x3)."
        }
    ],
    "abilities": [
        {
            "name": "Fuzileiro",
            "timing": null,
            "text": "O hobgoblin atirador não sofre a penalidade padrão de –5 em ataques por disparar contra oponentes envolvidos em combate corpo a corpo, e pode recarregar suas armas de fogo como uma ação livre."
        },
        {
            "name": "Lança de Fogo",
            "timing": null,
            "text": "Quando acerta um ataque à distância em um alvo adjacente, o atirador causa +1d8 pontos de dano. Quando acerta um ataque corpo a corpo, ele pode disparar sua arma para causar +2d8 pontos de dano."
        },
        {
            "name": "Mira Apurada",
            "timing": "movimento",
            "text": "O atirador recebe +2 em testes de ataque e na margem de ameaça com ataques à distância até o fim do turno."
        }
    ],
    "equipment": "Balas x20, couraça, lança de fogo, instrumentos de Ofício (armeiro)",
    "treasure": "Metade.",
    "skillsText": "Acrobacia +5, Furtividade +7, Ofício (armeiro) +7"
};

export const hobgoblinComandanteTatico = {
    "id": "hobgoblin-comandante-tatico",
    "name": "Hobgoblin Comandante Tático",
    "type": "humanoid",
    "subtype": "hobgoblin",
    "size": "Médio",
    "challengeRating": 11,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p80 ate 90.pdf",
        "pdfPage": 8,
        "bookPage": 85
    },
    "stats": {
        "initiative": 27,
        "perception": 13,
        "defense": 40,
        "fortitude": 22,
        "reflex": 14,
        "will": 17,
        "hitPoints": 425,
        "speedText": "6m (4q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a confusão; redução de dano 5",
        "attributes": {
            "str": 6,
            "dex": 2,
            "con": 4,
            "int": 4,
            "wis": 2,
            "cha": 1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Lança montada x2 +32 (2d8+27, x4) ou espada longa x2 +32 (1d8+25, 17)."
        }
    ],
    "abilities": [
        {
            "name": "Carga Odiosa",
            "timing": null,
            "text": "Quando faz uma investida montada, o hobgoblin comandante tático pode fazer dois ataques corpo a corpo contra o mesmo alvo, e ambos recebem +6d8 nas rolagens de dano."
        },
        {
            "name": "Corcel Duyshidakk",
            "timing": null,
            "text": "O comandante cavalga um fiel warg. Enquanto o comandante estiver montado, seu deslocamento se torna 12m e ele recebe +2d6 em rolagens de dano corpo a corpo."
        },
        {
            "name": "Estandarte de Thwor",
            "timing": null,
            "text": "Aliados em alcance médio recebem +2 na Defesa e em testes de perícia."
        },
        {
            "name": "Manobras Evasivas",
            "timing": "reação",
            "text": "Uma vez por rodada, quando faz um teste de resistência, o comandante substitui esse teste por um teste de Guerra. Se ele passar, todos os aliados em alcance curto que fizerem este teste de resistência nesta rodada também passarão."
        },
        {
            "name": "Ordens de Ataque",
            "timing": "livre",
            "text": "Uma vez por rodada, o comandante ordena um aliado em alcance médio a fazer uma ação agredir como uma reação, imediatamente."
        }
    ],
    "equipment": "Armadura completa reforçada, escudo pesado, espada longa precisa, lança montada, poção de Curar Ferimentos (10d8+10)",
    "treasure": "Padrão.",
    "skillsText": "Cavalgar +27, Guerra +29, Intimidação +26"
};

export const hobgoblinGladiador = {
    "id": "hobgoblin-gladiador",
    "name": "Hobgoblin Gladiador",
    "type": "humanoid",
    "subtype": "hobgoblin",
    "size": "Médio",
    "challengeRating": 16,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p80 ate 90.pdf",
        "pdfPage": 8,
        "bookPage": 85
    },
    "stats": {
        "initiative": 25,
        "perception": 18,
        "defense": 46,
        "fortitude": 24,
        "reflex": 32,
        "will": 16,
        "hitPoints": 1000,
        "speedText": "9m (6q)",
        "senses": "faro, visão no escuro",
        "defensesText": "imunidade a medo; resistência a magia +5",
        "attributes": {
            "str": 8,
            "dex": 6,
            "con": 5,
            "int": 0,
            "wis": 2,
            "cha": 4
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Corrente de espinhos x4 +42 (2d4+25, 16)."
        }
    ],
    "abilities": [
        {
            "name": "Agraciado por Thwor",
            "timing": null,
            "text": "Os ataques do hobgoblin gladiador ignoram 5 pontos da RD dos alvos e são considerados lancinantes, e ele recebe +5 em testes de ataque contra oponentes caídos, desprevenidos, flanqueados ou indefesos."
        },
        {
            "name": "Campeão Bestial",
            "timing": "movimento",
            "text": "Combinando ferocidade e treinamento, o gladiador se torna Grande até o fim da cena. Nesta forma, ele recebe redução de dano 10 e +4 em Força (ataque +46, dano 1d10+29, 16)."
        },
        {
            "name": "Lento Demais!",
            "timing": "reação",
            "text": "Uma vez por rodada, quando é alvo de um ataque corpo a corpo, o gladiador pode fazer um teste de ataque oposto ao resultado desse ataque. Se vencer, ele evita o dano e pode fazer um ataque corpo a corpo contra o atacante."
        },
        {
            "name": "Não Tão Rápido!",
            "timing": "reação",
            "text": "Uma vez por rodada, quando uma criatura no alcance natural do gladiador fica desprevenida ou se move voluntariamente para fora desse alcance, ele faz um ataque corpo a corpo contra ela."
        },
        {
            "name": "Venha Aqui e Lute!",
            "timing": "completa",
            "text": "O gladiador faz uma manobra agarrar (teste +44, ou +50 se estiver Grande) com sua corrente contra um alvo em alcance curto. Se vencer, pode puxar o alvo para dentro de seu alcance natural e causa o dano de um ataque corpo a corpo contra esse alvo."
        }
    ],
    "equipment": "Corrente de espinhos de mitral ameaçadora, couraça reforçada abascanta, poção de Físico Divino (aprimoramento para os três atributos)",
    "treasure": "Metade.",
    "skillsText": "Atletismo +28, Furtividade +25, Intimidação +20"
};

export const hordaGoblin = {
    "id": "horda-goblin",
    "name": "Horda Goblin",
    "type": "humanoid",
    "subtype": "goblin",
    "size": "Colossal",
    "challengeRating": 14,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p80 ate 90.pdf",
        "pdfPage": 4,
        "bookPage": 81
    },
    "stats": {
        "initiative": 14,
        "perception": 23,
        "defense": 42,
        "fortitude": 28,
        "reflex": 23,
        "will": 16,
        "hitPoints": 666,
        "speedText": "9m (6q), escalada 9m (6q)",
        "senses": "visão no escuro",
        "defensesText": null,
        "attributes": {
            "str": 3,
            "dex": 3,
            "con": 1,
            "int": 0,
            "wis": -1,
            "cha": -2
        }
    },
    "actions": [
        {
            "name": "Enxame",
            "text": "14d6 pontos de dano de perfuração."
        }
    ],
    "abilities": [
        {
            "name": "Pilhar e Devorar",
            "timing": null,
            "text": "A horda saqueia e consome tudo à sua volta em uma velocidade assustadora. Quando causa dano, a horda recupera uma quantidade de pontos de vida igual à metade do resultado de sua rolagem de dano (independente de quantas criaturas sofreram dano). Cada vez que uma criatura sofre dano da horda, um de seus itens à sua escolha entre armadura, escudo e arma empunhada é avariado (Ref CD 35 evita)."
        },
        {
            "name": "Sobrepujar",
            "timing": "livre",
            "text": "No início do seu turno, a horda faz a manobra agarrar (teste +49) contra todas as criaturas de tamanho Grande ou menor em seu espaço."
        }
    ],
    "equipment": null,
    "treasure": "Metade.",
    "skillsText": null
};

export const sangueDoAyrrak = {
    "id": "sangue-do-ayrrak",
    "name": "Sangue do Ayrrak",
    "type": "humanoid",
    "subtype": "bugbear",
    "size": "Médio",
    "challengeRating": 19,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p80 ate 90.pdf",
        "pdfPage": 10,
        "bookPage": 87
    },
    "stats": {
        "initiative": 21,
        "perception": 17,
        "defense": 59,
        "fortitude": 32,
        "reflex": 19,
        "will": 26,
        "hitPoints": 1364,
        "manaPoints": 57,
        "speedText": "9m (6q)",
        "senses": "faro, visão no escuro",
        "defensesText": "imunidade a efeitos mentais e medo",
        "attributes": {
            "str": 9,
            "dex": 7,
            "con": 7,
            "int": 3,
            "wis": 3,
            "cha": 4
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Uyzrrak Da’ukthra +52 x4 (4d12+31 corte, x3, mais 2d8 trevas em criaturas não duyshidakk)."
        }
    ],
    "abilities": [
        {
            "name": "O Mundo Como Deve Ser",
            "timing": null,
            "text": "Os descendentes de Thwor manifestam poderes baseados na vertente da filosofia de seu pai com que mais se identificam. Cada Sangue do Ayrrak recebe três das habilidades abaixo, escolhidas entre habilidades adjacentes entre si na Roda do Akzath."
        },
        {
            "name": "Vida",
            "timing": null,
            "text": "Recebe cura acelerada 15, imunidade a efeitos de metabolismo e veneno e pode lançar as magias Curar Ferimentos e Sopro da Salvação (CD 47)."
        },
        {
            "name": "Ignorância",
            "timing": "livre",
            "text": "O Sangue renega toda a racionalidade e entra num estado de fúria avassaladora. Até o fim da cena, ele recebe +10 em testes de ataque e rolagens de dano corpo a corpo, +1 no multiplicador de crítico desses ataques e RD 10. Nesse estado ele não pode fazer nenhuma ação que exige calma e concentração, mas ainda pode usar outros poderes da Roda."
        },
        {
            "name": "Mudança",
            "timing": null,
            "text": "Pode lançar a magia Metamorfose (CD 47)."
        },
        {
            "name": "Fim",
            "timing": "livre",
            "cost": "5 PM",
            "text": "O Sangue encerra um efeito sobre uma criatura adjacente (incluindo ele mesmo)."
        },
        {
            "name": "Morte",
            "timing": null,
            "text": "Pode lançar as magias Assassino Fantasmagórico, Poeira da Podridão e Toque da Morte (CD 47)."
        },
        {
            "name": "Conhecimento",
            "timing": null,
            "text": "Recebe resistência a magia +8."
        },
        {
            "name": "Continuidade",
            "timing": null,
            "text": "Uma vez por cena, quando é reduzido a 0 PV ou menos, em vez disso o Sangue fica com 500 PV."
        },
        {
            "name": "Início",
            "timing": "padrão",
            "cost": "10 PM",
            "text": "O Sangue, e todas as criaturas em alcance longo, voltam ao início do turno anterior do Sangue. Todas as ações a partir daquele ponto são desfeitas (isso inclui as consequências destas ações, como perda de PV e PM, exceto o gasto de PM para ativar esta habilidade). Com exceção do Sangue, nenhuma outra criatura sabe o que vai acontecer, e todas devem executar as mesmas ações que realizaram originalmente (mas quaisquer dados devem ser rolados novamente)."
        }
    ],
    "equipment": "Couraça guardiã, Uyzrrak Da’ukthra",
    "treasure": "Dobro.",
    "skillsText": "Atletismo +24, Diplomacia +19, Guerra +18, Intimidação +24, Religião +18"
};

export const gnollCacadorDeCabecas = {
    "id": "gnoll-cacador-de-cabecas",
    "name": "Gnoll Caçador de Cabeças",
    "type": "humanoid",
    "subtype": "gnoll",
    "size": "Médio",
    "challengeRating": 8,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p104 ate 124.pdf",
        "pdfPage": 13,
        "bookPage": 114
    },
    "stats": {
        "initiative": 12,
        "perception": 10,
        "defense": 33,
        "fortitude": 15,
        "reflex": 20,
        "will": 9,
        "hitPoints": 320,
        "speedText": "12m (8q)",
        "senses": "faro",
        "defensesText": "imunidade a medo",
        "attributes": {
            "str": 1,
            "dex": 4,
            "con": 2,
            "int": 1,
            "wis": 1,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Espada longa x2 +26 (1d8+15, 19) e mordida +26 (1d6+15)."
        },
        {
            "name": "À Distância",
            "text": "Besta leve x2 +27 (2d8+30, 19/x3)."
        }
    ],
    "abilities": [
        {
            "name": "Caminhos Selvagens",
            "timing": null,
            "text": "O caçador de cabeças pode atravessar terrenos naturais difíceis sem sofrer redução em seu deslocamento."
        },
        {
            "name": "Disparo Preciso",
            "timing": null,
            "text": "O caçador pode fazer ataques à distância contra oponentes envolvidos em combate corpo a corpo sem sofrer a penalidade de –5 no teste de ataque."
        },
        {
            "name": "Emboscar",
            "timing": null,
            "text": "Na primeira rodada de combate, o caçador pode realizar uma ação padrão adicional."
        },
        {
            "name": "Marca da Presa",
            "timing": "movimento",
            "text": "O caçador analisa uma criatura em alcance médio. Até o fim da cena, ele recebe +1d8 em rolagens de dano contra essa criatura; esse bônus é dobrado se a criatura for humanoide."
        }
    ],
    "equipment": "Bálsamo restaurador x3, besta leve precisa, couro batido, espada longa, virotes x20",
    "treasure": "Padrão.",
    "skillsText": "Atletismo +9, Furtividade +14, Sobrevivência +11"
};

export const gnollCapanga = {
    "id": "gnoll-capanga",
    "name": "Gnoll Capanga",
    "type": "humanoid",
    "subtype": "gnoll",
    "size": "Médio",
    "challengeRating": 0.5,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p104 ate 124.pdf",
        "pdfPage": 14,
        "bookPage": 115
    },
    "stats": {
        "initiative": 3,
        "perception": 3,
        "defense": 14,
        "fortitude": 5,
        "reflex": 3,
        "will": 0,
        "hitPoints": 8,
        "speedText": "9m (6q)",
        "senses": "faro",
        "defensesText": null,
        "attributes": {
            "str": 3,
            "dex": 1,
            "con": 3,
            "int": -1,
            "wis": 1,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Espada curta +9 (1d6+3, 19) e mordida +9 (1d6+3)."
        }
    ],
    "abilities": [
        {
            "name": "Bote",
            "timing": "completa",
            "text": "O gnoll faz uma investida e ataca com sua espada curta e sua mordida. Os dois ataques recebem o bônus de +2 da investida, mas devem ser feitos contra a mesma criatura."
        }
    ],
    "equipment": "Armadura de couro, escudo leve, espada curta",
    "treasure": "Metade.",
    "skillsText": "Sobrevivência +5"
};

export const gnollLiderDeAlcateia = {
    "id": "gnoll-lider-de-alcateia",
    "name": "Gnoll Líder de Alcateia",
    "type": "humanoid",
    "subtype": "gnoll",
    "size": "Médio",
    "challengeRating": 5,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p104 ate 124.pdf",
        "pdfPage": 16,
        "bookPage": 117
    },
    "stats": {
        "initiative": 8,
        "perception": 5,
        "defense": 24,
        "fortitude": 17,
        "reflex": 11,
        "will": 5,
        "hitPoints": 200,
        "speedText": "9m (6q)",
        "senses": "faro",
        "defensesText": null,
        "attributes": {
            "str": 3,
            "dex": 1,
            "con": 2,
            "int": 0,
            "wis": 1,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Machado de batalha +17 (1d8+12, x3) e mordida +17 (1d6+12)."
        },
        {
            "name": "À Distância",
            "text": "Azagaia +17 (1d6+12)."
        }
    ],
    "abilities": [
        {
            "name": "Líder da Alcateia",
            "timing": null,
            "text": "Para cada aliado adjacente, o líder recebe +2 em suas rolagens de dano."
        },
        {
            "name": "Ordens",
            "timing": "movimento",
            "text": "O líder grita ordens para seus aliados em alcance médio. Eles recebem +2 em testes de perícia até o fim da cena."
        }
    ],
    "equipment": "Azagaia x2, couro batido, machado de batalha",
    "treasure": "Padrão.",
    "skillsText": "Cavalgar +5, Intimidação +7, Sobrevivência +7"
};

export const gnollVuulRak = {
    "id": "gnoll-vuul-rak",
    "name": "Gnoll Vuul’rak",
    "type": "humanoid",
    "subtype": "gnoll",
    "size": "Grande",
    "challengeRating": 16,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p104 ate 124.pdf",
        "pdfPage": 21,
        "bookPage": 122
    },
    "stats": {
        "initiative": 14,
        "perception": 15,
        "defense": 51,
        "fortitude": 29,
        "reflex": 25,
        "will": 17,
        "hitPoints": 900,
        "speedText": "12m (8q)",
        "senses": "faro",
        "defensesText": "imunidade a efeitos mentais; redução de dano 10",
        "attributes": {
            "str": 8,
            "dex": 0,
            "con": 10,
            "int": -4,
            "wis": 1,
            "cha": -2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Três mordidas +44 (2d6+30) e dois tacapes +44 (2d10+30)."
        }
    ],
    "abilities": [
        {
            "name": "Descarregar Raiva",
            "timing": "reação",
            "text": "Uma vez por rodada, se os PV do Vuul’rak forem reduzidos abaixo de um valor múltiplo de 100 (800, 700 etc.), ele libera sua raiva atacando tudo ao seu redor. Ele faz um ataque de tacape e compara o resultado com a Defesa de cada criatura ao seu alcance. Mesmo que erre uma criatura, ainda assim ele causa metade do dano a ela."
        },
        {
            "name": "Golpe Avassalador",
            "timing": "livre",
            "text": "Quando acerta um ataque de tacape, o Vuul’rak arremessa a vítima 1d6 x 1,5m em uma direção à escolha dele (Fort CD 42 evita). A vítima fica caída e, se atingir algum obstáculo, sofre 1d6 pontos de dano de impacto para cada 1,5m que foi arremessada."
        },
        {
            "name": "Ódio Inexplicável",
            "timing": null,
            "text": "O Vuul’rak recebe +5 em testes de ataque e rolagens de dano contra elfos e ataca esses seres sempre que possível."
        }
    ],
    "equipment": "Tacape aumentado x2",
    "treasure": "Padrão.",
    "skillsText": null
};

export const gnollXamaDeAllihanna = {
    "id": "gnoll-xama-de-allihanna",
    "name": "Gnoll Xamã de Allihanna",
    "type": "humanoid",
    "subtype": "gnoll",
    "size": "Médio",
    "challengeRating": 2,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p104 ate 124.pdf",
        "pdfPage": 17,
        "bookPage": 118
    },
    "stats": {
        "initiative": 2,
        "perception": 6,
        "defense": 17,
        "fortitude": 7,
        "reflex": 2,
        "will": 13,
        "hitPoints": 50,
        "manaPoints": 12,
        "speedText": "9m (6q)",
        "senses": "faro",
        "defensesText": null,
        "attributes": {
            "str": 1,
            "dex": 1,
            "con": 2,
            "int": 0,
            "wis": 3,
            "cha": 0
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Clava +9 (1d6+6) e mordida +9 (1d6+6)."
        }
    ],
    "abilities": [
        {
            "name": "Caminhos Selvagens",
            "timing": null,
            "text": "O xamã pode atravessar terrenos difíceis sem sofrer redução em seu deslocamento."
        },
        {
            "name": "Medicina Primal",
            "timing": "completa",
            "text": "O xamã faz um teste de Cura (CD 15). Se passar, cura 2d6+3 PV de uma criatura adjacente com 0 PV ou menos."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como um clérigo de Allihanna de 2º nível (CD 18)."
        },
        {
            "name": "Armamento da Natureza",
            "timing": "padrão",
            "cost": "2 PM",
            "text": "Uma das armas do xamã se torna mágica até o fim da cena; ela fornece +1 em testes de ataque e seu dano aumenta em um passo (de 1d6 para 1d8)."
        },
        {
            "name": "Controlar Plantas",
            "timing": "padrão",
            "cost": "2 PM",
            "text": "Um quadrado de 9m de vegetação em alcance curto se torna terreno difícil. Criaturas na área quando a magia é lançada ou no início de seus próprios turnos ficam enredadas e imóveis (Ref evita). Uma vítima pode se libertar com uma ação padrão e um teste de Acrobacia ou Atletismo."
        },
        {
            "name": "Curar Ferimentos",
            "timing": "padrão",
            "cost": "2 PM",
            "text": "Uma criatura adjacente cura 3d8+3 PV."
        }
    ],
    "equipment": "Armadura de couro, clava, símbolo sagrado de Allihanna",
    "treasure": "Padrão.",
    "skillsText": "Cura +6, Intuição +6, Religião +6, Sobrevivência +8"
};

export const gnollXamaDeMarah = {
    "id": "gnoll-xama-de-marah",
    "name": "Gnoll Xamã de Marah",
    "type": "humanoid",
    "subtype": "gnoll",
    "size": "Médio",
    "challengeRating": 6,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p104 ate 124.pdf",
        "pdfPage": 18,
        "bookPage": 119
    },
    "stats": {
        "initiative": 6,
        "perception": 9,
        "defense": 25,
        "fortitude": 9,
        "reflex": 5,
        "will": 19,
        "hitPoints": 180,
        "manaPoints": 34,
        "speedText": "9m (6q)",
        "senses": "faro",
        "defensesText": "imunidade às condições alquebrado, esmorecido e frustrado",
        "attributes": {
            "str": 0,
            "dex": 1,
            "con": 2,
            "int": 2,
            "wis": 4,
            "cha": 1
        }
    },
    "actions": [],
    "abilities": [
        {
            "name": "Aura de Paz",
            "timing": "livre",
            "cost": "2 PM",
            "text": "O xamã gera uma aura de paz com 9m de raio e duração cena. Qualquer inimigo dentro da aura que tente fazer uma ação hostil contra ele deve passar em um teste de Vontade (CD 24) ou perde a ação. Se passar, fica imune a esta habilidade por um dia."
        },
        {
            "name": "Símbolo Sagrado Energizado",
            "timing": "movimento",
            "cost": "1 PM",
            "text": "O xamã energiza seu símbolo sagrado. Até o fim da cena, ele emite uma luz prateada que ilumina como uma tocha e, enquanto estiver sendo empunhado pelo xamã, reduz o custo de magias divinas em –1 PM."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como um clérigo de Marah de 6º nível (CD 24)."
        },
        {
            "name": "Curar Ferimentos",
            "timing": "padrão",
            "cost": "6 PM",
            "text": "Uma criatura adjacente cura 7d8+7 PM."
        },
        {
            "name": "Dissipar Magia",
            "timing": "padrão",
            "cost": "3 PM",
            "text": "O xamã escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias nesse alvo com CD igual ou menor que o resultado do teste são dissipadas."
        },
        {
            "name": "Enfeitiçar",
            "timing": "padrão",
            "cost": "1 PM",
            "text": "Um humanoide em alcance curto fica enfeitiçado (Von evita)."
        },
        {
            "name": "Santuário",
            "timing": "padrão",
            "cost": "1 PM",
            "text": "O xamã toca uma criatura. Até o fim da cena, ou até que essa criatura faça uma ação hostil, qualquer criatura que tente fazer uma ação hostil contra ela perde a ação (Von evita)."
        }
    ],
    "equipment": "Bálsamo restaurador x4, couro batido, símbolo sagrado de Marah",
    "treasure": "Padrão.",
    "skillsText": "Cura +11, Diplomacia +8, Intuição +9, Misticismo +7, Religião +9"
};

export const gnollXamaDeMegalokk = {
    "id": "gnoll-xama-de-megalokk",
    "name": "Gnoll Xamã de Megalokk",
    "type": "humanoid",
    "subtype": "gnoll",
    "size": "Médio",
    "challengeRating": 5,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p104 ate 124.pdf",
        "pdfPage": 18,
        "bookPage": 119
    },
    "stats": {
        "initiative": 7,
        "perception": 9,
        "defense": 24,
        "fortitude": 11,
        "reflex": 8,
        "will": 14,
        "hitPoints": 170,
        "manaPoints": 25,
        "speedText": "9m (6q)",
        "senses": "faro",
        "defensesText": "imunidade a medo",
        "attributes": {
            "str": 2,
            "dex": 1,
            "con": 3,
            "int": 0,
            "wis": 3,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Tacape +17 (1d10+16, 19/x3) e mordida +17 (1d6+16)."
        }
    ],
    "abilities": [
        {
            "name": "Urro Divino",
            "timing": null,
            "cost": "1 PM",
            "text": "Quando faz um ataque ou lança uma magia, o xamã soma sua Constituição à rolagem de dano desse ataque ou magia."
        },
        {
            "name": "Voz dos Monstros",
            "timing": null,
            "text": "O xamã pode se comunicar livremente com monstros não inteligentes (Int –4 ou menor), como se estivesse sob efeito da magia Voz Divina."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como um clérigo de Megalokk de 5º nível (CD 20)."
        },
        {
            "name": "Amedrontar",
            "timing": "padrão",
            "cost": "3 PM",
            "text": "Um animal ou humanoide em alcance curto fica apavorado por 1d4+1 rodadas e depois abalado (Von reduz para abalado por 1d4 rodadas)."
        },
        {
            "name": "Armamento da Natureza",
            "timing": "padrão",
            "cost": "2 PM",
            "text": "Uma das armas do xamã se torna mágica até o fim da cena; ela fornece +1 em testes de ataque e seu dano aumenta em um passo (de 1d10 para 1d12 ou de 1d6 para 1d8)."
        },
        {
            "name": "Físico Divino",
            "timing": "padrão",
            "cost": "3 PM",
            "text": "O xamã recebe +2 em Força até o fim da cena."
        },
        {
            "name": "Perdição",
            "timing": "padrão",
            "cost": "3 PM",
            "text": "Criaturas escolhidas em alcance curto sofrem –2 em testes de ataque e rolagens de dano até o fim da cena."
        }
    ],
    "equipment": "Couro batido, símbolo sagrado de Megalokk, tacape",
    "treasure": "Padrão.",
    "skillsText": "Atletismo +6, Intimidação +8, Religião +7"
};

export const matronaGnoll = {
    "id": "matrona-gnoll",
    "name": "Matrona Gnoll",
    "type": "humanoid",
    "subtype": "gnoll",
    "size": "Médio",
    "challengeRating": 11,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p104 ate 124.pdf",
        "pdfPage": 20,
        "bookPage": 121
    },
    "stats": {
        "initiative": 11,
        "perception": 15,
        "defense": 39,
        "fortitude": 25,
        "reflex": 11,
        "will": 18,
        "hitPoints": 390,
        "speedText": "9m (6q)",
        "senses": "faro",
        "defensesText": "imunidade a medo; redução de dano 5",
        "attributes": {
            "str": 4,
            "dex": 1,
            "con": 5,
            "int": 0,
            "wis": 2,
            "cha": 3
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Machado de guerra x2 +32 (3d6+26, x3) e mordida +32 (1d6+26)."
        }
    ],
    "abilities": [
        {
            "name": "Latido Enervante",
            "timing": "movimento",
            "text": "A matrona gnoll emite latidos-risadas. Todos os inimigos em alcance curto perdem sua ação de movimento no próximo turno (Von CD 33 evita). Recarga (acertar um ataque de mordida)."
        },
        {
            "name": "Matrona da Alcateia",
            "timing": null,
            "text": "Gnolls aliados em alcance médio recebem imunidade a medo e +2 em testes de perícias e rolagens de dano."
        },
        {
            "name": "Pega!",
            "timing": "completa",
            "text": "A matrona ordena que todos os gnolls em alcance curto façam um ataque como uma reação imediatamente. Recarga (movimento)."
        },
        {
            "name": "Quebra-Pescoço",
            "timing": "reação",
            "text": "Se um ataque de mordida da matrona exceder a Defesa do inimigo por 5 ou mais, ela sacode violentamente sua presa. A vítima perde 6d6 pontos de vida e fica atordoada por 1 rodada (Fort CD 33 reduz a perda de vida à metade e evita a condição)."
        }
    ],
    "equipment": "Couraça macabra, machado de guerra cruel",
    "treasure": "Padrão.",
    "skillsText": "Intimidação +19, Sobrevivência +13"
};

export const bispoDeGuerra = {
    "id": "bispo-de-guerra",
    "name": "Bispo de Guerra",
    "type": "humanoid",
    "subtype": "humano",
    "size": "Médio",
    "challengeRating": 8,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p126 ate 145.pdf",
        "pdfPage": 15,
        "bookPage": 141
    },
    "stats": {
        "initiative": 8,
        "perception": 14,
        "defense": 28,
        "fortitude": 15,
        "reflex": 8,
        "will": 26,
        "hitPoints": 230,
        "manaPoints": 66,
        "speedText": "6m (4q)",
        "senses": null,
        "defensesText": "imunidade a medo; redução de dano 5",
        "attributes": {
            "str": 3,
            "dex": 0,
            "con": 4,
            "int": 2,
            "wis": 6,
            "cha": 1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Martelo de guerra x2 +24 (1d8+10, x3)."
        }
    ],
    "abilities": [
        {
            "name": "Ódio Puro",
            "timing": null,
            "text": "Como um purista, o bispo de guerra recebe +5 em testes de Vontade quando está seguindo ordens de um superior (qualquer purista com ND maior) e +2 em rolagens de dano contra humanoides não humanos."
        },
        {
            "name": "Prece de Combate",
            "timing": "livre",
            "cost": "+2 PM",
            "text": "Quando lança uma magia divina com tempo de conjuração de uma ação padrão em si mesmo, o bispo pode lançá-la como uma ação de movimento."
        },
        {
            "name": "Símbolo Sagrado Energizado",
            "timing": "movimento",
            "cost": "1 PM",
            "text": "O bispo energiza seu símbolo sagrado. Até o fim da cena, ele emite uma luz avermelhada que ilumina como uma tocha e, enquanto estiver sendo empunhado pelo bispo, reduz o custo de magias divinas em –1 PM."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como um clérigo de Arsenal de 9º nível (CD 28, limite de PM 9)."
        },
        {
            "name": "Curar Ferimentos",
            "timing": "padrão",
            "cost": "8 PM",
            "text": "Uma criatura adjacente cura 9d8+9 PV."
        },
        {
            "name": "Dissipar Magia",
            "timing": "padrão",
            "cost": "3 PM",
            "text": "O bispo escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias nesse alvo com CD igual ou menor que o resultado do teste são dissipadas."
        },
        {
            "name": "Escudo da Fé",
            "timing": "reação",
            "cost": "3 PM",
            "text": "Quando sofre um ataque, o bispo recebe +3 na Defesa até seu próximo turno."
        },
        {
            "name": "Oração",
            "timing": "padrão",
            "cost": "7 PM, sustentada",
            "text": "O bispo e seus aliados em alcance curto recebem +4 em testes de perícia e rolagens de dano, e todos os inimigos em alcance curto recebem –4 em testes de perícia e rolagens de dano."
        },
        {
            "name": "Soco de Arsenal",
            "timing": "padrão",
            "cost": "7 PM",
            "text": "Uma criatura em alcance médio sofre 6d6+3 pontos de dano de impacto e é empurrada 3m na direção oposta (Fort reduz à metade e evita o empurrão)."
        },
        {
            "name": "Sopro da Salvação",
            "timing": "padrão",
            "cost": "8 PM",
            "text": "O bispo sopra um cone de 9m que cura 3d8+3 PV e remove uma das seguintes condições dos aliados na área: abalado, atordoado, apavorado, alquebrado, cego, confuso, debilitado, enfeitiçado, enjoado, esmorecido, exausto, fascinado, fatigado, fraco, frustrado, lento, paralisado, pasmo e surdo."
        }
    ],
    "equipment": "Armadura completa ajustada reforçada, escudo leve reforçado, martelo de guerra, símbolo sagrado de Arsenal, poção de Velocidade",
    "treasure": "Padrão.",
    "skillsText": "Guerra +16, Misticismo +12, Religião +16"
};

export const coletorDeArsenal = {
    "id": "coletor-de-arsenal",
    "name": "Coletor de Arsenal",
    "type": "humanoid",
    "subtype": "humano",
    "size": "Médio",
    "challengeRating": 10,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p126 ate 145.pdf",
        "pdfPage": 11,
        "bookPage": 137
    },
    "stats": {
        "initiative": 15,
        "perception": 13,
        "defense": 32,
        "fortitude": 22,
        "reflex": 10,
        "will": 18,
        "hitPoints": 280,
        "manaPoints": 54,
        "speedText": "6m (4q)",
        "senses": null,
        "defensesText": "imunidade a medo; resistência a magia +5",
        "attributes": {
            "str": 5,
            "dex": 1,
            "con": 3,
            "int": 2,
            "wis": 4,
            "cha": 0
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Martelo de guerra +27 (2d8+30, x3) e chicote +27 (1d4+25, alcance 4,5m)."
        }
    ],
    "abilities": [
        {
            "name": "Chicote de Aço",
            "timing": null,
            "text": "Especialmente fixado a sua armadura, o chicote do coletor deixa a mão livre e não pode ser desarmado."
        },
        {
            "name": "Desarmar Superior",
            "timing": "reação",
            "text": "Quando desarma um oponente usando seu chicote, o coletor puxa a arma para sua mão livre."
        },
        {
            "name": "Marca da Oferenda",
            "timing": null,
            "text": "Quando o coletor é derrotado, todo seu equipamento, incluindo armas que ele esteja empunhando, é teletransportado para um templo de Arsenal."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como um clérigo de Arsenal de 10º nível (CD 32)."
        },
        {
            "name": "Arma Espiritual",
            "timing": "padrão",
            "cost": "5 PM",
            "text": "Até o fim da cena, uma vez por rodada, quando sofre um ataque corpo a corpo, o coletor pode usar uma reação para causar 4d6 pontos de dano de impacto no atacante."
        },
        {
            "name": "Físico Divino",
            "timing": "padrão",
            "cost": "3 PM",
            "text": "O coletor recebe +2 em Força, Destreza ou Constituição, a sua escolha. Esse aumento não oferece PV ou PM adicionais."
        },
        {
            "name": "Lendas e Histórias",
            "timing": "padrão",
            "cost": "6 PM, sustentada",
            "text": "O coletor descobre informações sobre uma criatura, objeto ou local que esteja tocando. A cada rodada que mantiver a magia, ele descobre um dos seguintes: todas as informações sobre o alvo (como se tivesse passado em todos os testes de Conhecimento para tal); todas as habilidades do alvo (incluindo estatísticas de jogo), e se o alvo está sob influência de alguma magia, incluindo informações sobre elas."
        },
        {
            "name": "Soco de Arsenal",
            "timing": "padrão",
            "cost": "9 PM",
            "text": "O coletor causa 7d6+5 pontos de dano de impacto em uma criatura em alcance médio, que é empurrada 3m na direção oposta (Fort reduz à metade e evita o empurrão)."
        },
        {
            "name": "Visão Mística",
            "timing": "padrão",
            "cost": "3 PM",
            "text": "Durante 1 dia, o coletor detecta todas as auras mágicas em alcance médio e recebe todas as informações sobre elas sem gastar ações. Além disso, ele pode gastar uma ação de movimento para descobrir se uma criatura que possa perceber em alcance médio é capaz de lançar magias e qual a aura gerada pelas magias de círculo mais alto que ela pode lançar."
        }
    ],
    "equipment": "Armadura completa abascanta, chicote, martelo de guerra formidável, símbolo sagrado de Arsenal",
    "treasure": "Padrão.",
    "skillsText": "Guerra +15, Misticismo +16, Religião +18"
};

export const concilioForjador = {
    "id": "concilio-forjador",
    "name": "Concílio Forjador",
    "type": "humanoid",
    "subtype": "humano",
    "size": "Grande",
    "challengeRating": 13,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p126 ate 145.pdf",
        "pdfPage": 12,
        "bookPage": 138
    },
    "stats": {
        "initiative": 11,
        "perception": 14,
        "defense": 41,
        "fortitude": 20,
        "reflex": 13,
        "will": 26,
        "hitPoints": 430,
        "speedText": "6m (4q)",
        "senses": null,
        "defensesText": "imunidade a medo; redução de dano 5",
        "attributes": {
            "str": 2,
            "dex": 1,
            "con": 3,
            "int": 3,
            "wis": 4,
            "cha": 1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo/À Distância",
            "text": "[Bando] Armamento sagrado x2 +35 (4d12+40, 19/x3)."
        }
    ],
    "abilities": [
        {
            "name": "Armamento Sagrado",
            "timing": null,
            "text": "O líder de cada concílio porta uma arma mágica a ser oferecida ao seu oponente. Escolha um tipo de arma e dois encantos adequados, ou determine-os aleatoriamente usando as tabelas de tesouros. O concílio empunha essa arma em corpo a corpo ou à distância, conforme apropriado. Independentemente do tipo de arma, nas mãos do concílio ela possui as estatísticas indicadas em seu ataque, modificadas por seus encantos. Se o encanto escolhido tiver um custo em PM, ele pode usá-lo sem gastar PM."
        },
        {
            "name": "Desprezo pelo Ordinário",
            "timing": null,
            "text": "O concílio sofre apenas metade do dano de armas mundanas sem melhorias."
        }
    ],
    "equipment": "Arma superior com 1 melhoria a sua escolha, instrumentos de Ofício (armeiro) aprimorados, meia armadura (1d4 de cada), armamento sagrado",
    "treasure": "Nenhum.",
    "skillsText": "Guerra +15, Misticismo +15, Ofício (armeiro) +16, Religião +16"
};

export const forjadorLiturgico = {
    "id": "forjador-liturgico",
    "name": "Forjador Litúrgico",
    "type": "humanoid",
    "subtype": "humano",
    "size": "Médio",
    "challengeRating": 9,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p126 ate 145.pdf",
        "pdfPage": 11,
        "bookPage": 137
    },
    "stats": {
        "initiative": 9,
        "perception": 12,
        "defense": 32,
        "fortitude": 15,
        "reflex": 9,
        "will": 21,
        "hitPoints": 230,
        "speedText": "6m (4q)",
        "senses": null,
        "defensesText": "imunidade a medo; redução de dano 5",
        "attributes": {
            "str": 2,
            "dex": 1,
            "con": 3,
            "int": 3,
            "wis": 4,
            "cha": 1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo/À Distância",
            "text": "Armamento sagrado x2 +25 (2d12+20, 19/x3)."
        }
    ],
    "abilities": [
        {
            "name": "Armamento Sagrado",
            "timing": null,
            "text": "O forjador litúrgico porta uma arma mágica a ser oferecida ao seu oponente. Escolha um tipo de arma e um encanto adequado, ou determine-os aleatoriamente usando as tabelas de tesouros. Independente do tipo de arma, nas mãos do forjador ela possui as estatísticas indicadas em seu ataque, modificadas por seu encanto. Se o encanto escolhido tiver um custo em PM, ele pode usá-lo sem gastar PM."
        },
        {
            "name": "Desprezo pelo Ordinário",
            "timing": null,
            "text": "O forjador sofre apenas metade do dano de armas mundanas sem melhorias."
        }
    ],
    "equipment": "Armamento sagrado, instrumentos de Ofício (armeiro) aprimorados, meia armadura",
    "treasure": "Nenhum.",
    "skillsText": "Guerra +13, Misticismo +13, Ofício (armeiro) +14, Religião +14"
};

export const acolitoDeKally = {
    "id": "acolito-de-kally",
    "name": "Acólito de Kally",
    "type": "humanoid",
    "subtype": "humano",
    "size": "Médio",
    "challengeRating": 3,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p146 ate 155.pdf",
        "pdfPage": 3,
        "bookPage": 146
    },
    "stats": {
        "initiative": 4,
        "perception": 7,
        "defense": 19,
        "fortitude": 10,
        "reflex": 3,
        "will": 14,
        "hitPoints": 60,
        "manaPoints": 29,
        "speedText": "9m (6q)",
        "senses": null,
        "defensesText": null,
        "attributes": {
            "str": 1,
            "dex": 1,
            "con": 2,
            "int": 1,
            "wis": 4,
            "cha": 4
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Maça +13 (1d8+13)."
        }
    ],
    "abilities": [
        {
            "name": "Aura de Medo",
            "timing": "livre",
            "cost": "2 PM",
            "text": "O acólito de Kally gera uma aura de medo de 9m de raio que dura até o fim da cena. Todos os inimigos que entrem na aura ficam abalados até o fim da cena (Von CD 19 evita e a criatura fica imune a esta habilidade por um dia)."
        },
        {
            "name": "Servos do Dragão",
            "timing": "completa",
            "cost": "2 PM",
            "text": "O acólito invoca 2d4+1 kobolds em espaços desocupados em alcance curto. Eles agem a partir da próxima rodada do acólito, têm deslocamento 9m e podem gastar uma ação padrão para causar 1d6-1 pontos de dano de corte em uma criatura adjacente. Os kobolds têm For –1, Des 4, Defesa 12 e 1 PV, falham automaticamente em qualquer teste oposto ou de resistência e desaparecem quando mortos ou ao fim da cena."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como um clérigo de Kallyadranoch de 5º nível (CD 19)."
        },
        {
            "name": "Comando",
            "timing": "padrão",
            "cost": "2 PM",
            "text": "No início do seu próximo turno, uma criatura em alcance curto fica caída e não pode se levantar até o início do seu turno seguinte (Von evita)."
        },
        {
            "name": "Controlar Fogo",
            "timing": "padrão",
            "cost": "3 PM",
            "text": "O acólito chameja qualquer número de armas e ataques desarmados escolhidos em alcance curto. Até o fim da cena, essas armas causam +1d6 pontos de dano de fogo."
        },
        {
            "name": "Escudo da Fé",
            "timing": "reação",
            "cost": "1 PM",
            "text": "Uma criatura em alcance curto recebe +2 na Defesa por 1 turno."
        },
        {
            "name": "Perdição",
            "timing": "padrão",
            "cost": "3 PM",
            "text": "Criaturas escolhidas em alcance curto recebem –2 em testes de ataque e rolagens de dano até o fim da cena."
        }
    ],
    "equipment": "Gibão de peles, maça, símbolo sagrado de Kallyadranoch",
    "treasure": "Padrão.",
    "skillsText": "Intimidação +9, Misticismo +4, Religião +9"
};

export const cavaleiroDeKally = {
    "id": "cavaleiro-de-kally",
    "name": "Cavaleiro de Kally",
    "type": "humanoid",
    "subtype": "humano",
    "size": "Médio",
    "challengeRating": 8,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p146 ate 155.pdf",
        "pdfPage": 1,
        "bookPage": 144
    },
    "stats": {
        "initiative": 12,
        "perception": 8,
        "defense": 35,
        "fortitude": 19,
        "reflex": 17,
        "will": 8,
        "hitPoints": 250,
        "speedText": "6m (4q)",
        "senses": null,
        "defensesText": "redução de fogo 20; redução de dano 5; resistência a magia +5",
        "attributes": {
            "str": 5,
            "dex": 2,
            "con": 3,
            "int": 0,
            "wis": 0,
            "cha": 3
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Lança montada x2 +26 (1d12+15, x3) ou espada bastarda x2 +26 (1d12+15, 19)."
        }
    ],
    "abilities": [
        {
            "name": "Agarrar Aprimorado",
            "timing": "livre",
            "text": "Lança montada ou espada bastarda (teste +28). O cavaleiro de Kally só pode usar esta habilidade se estiver montado, pode manter uma criatura agarrada por vez e não ocupa sua arma para isso."
        },
        {
            "name": "Cavaleiro Dracônico",
            "timing": "reação",
            "text": "Uma vez por rodada, quando é alvo de um ataque corpo a corpo, o cavaleiro pode fazer um teste de Cavalgar oposto à Luta do atacante. Se vencer, ele evita o dano e pode fazer um ataque corpo a corpo contra o atacante."
        },
        {
            "name": "Despertar o Poder",
            "timing": "movimento",
            "text": "Se o cavaleiro não estiver montado, invoca uma fúria terrível que fornece +5 em testes de ataque e rolagens de dano, redução de dano 5 e resistência a magia +2 até o fim da cena."
        },
        {
            "name": "Ginete de Corcel de Kally",
            "timing": null,
            "text": "O cavaleiro possui um corcel de Kally, um parceiro montaria Grande. Enquanto estiver montado, seu deslocamento muda para 12m, ele recebe deslocamento de voo 12m e +1d8 em rolagens de dano corpo a corpo."
        },
        {
            "name": "Investida Aérea",
            "timing": null,
            "text": "Quando faz uma investida montada, o cavaleiro causa +6d8 pontos de dano e pode continuar se movendo após o ataque, até o limite de seu deslocamento."
        }
    ],
    "equipment": "Armadura completa de couro de dragão, espada bastarda, lança montada",
    "treasure": "Metade.",
    "skillsText": "Atletismo +13, Cavalgar +20, Intimidação +11"
};

export const clerigoDeKally = {
    "id": "clerigo-de-kally",
    "name": "Clérigo de Kally",
    "type": "humanoid",
    "subtype": "humano",
    "size": "Médio",
    "challengeRating": 8,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p146 ate 155.pdf",
        "pdfPage": 3,
        "bookPage": 146
    },
    "stats": {
        "initiative": 9,
        "perception": 14,
        "defense": 29,
        "fortitude": 15,
        "reflex": 8,
        "will": 21,
        "hitPoints": 224,
        "manaPoints": 51,
        "speedText": "9m (6q)",
        "senses": null,
        "defensesText": null,
        "attributes": {
            "str": 1,
            "dex": 1,
            "con": 3,
            "int": 1,
            "wis": 6,
            "cha": 4
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Maça x2 +24 (1d8+17)."
        },
        {
            "name": "À Distância",
            "text": "Azagaia +24 (1d6+17)."
        }
    ],
    "abilities": [
        {
            "name": "Aura de Medo",
            "timing": "livre",
            "cost": "2 PM",
            "text": "O clérigo de Kally gera uma aura de medo de 9m de raio que dura até o fim da cena. Todos os inimigos que entrem na aura ficam abalados até o fim da cena (Von CD 28 evita e a criatura fica imune a esta habilidade por um dia)."
        },
        {
            "name": "Magia Acelerada",
            "timing": "livre",
            "cost": "+4 PM",
            "text": "Uma vez por rodada, quando lança uma magia com execução de ação completa ou menor, o clérigo muda a execução dela para livre."
        },
        {
            "name": "Servos do Dragão",
            "timing": "completa",
            "cost": "2 PM",
            "text": "O clérigo invoca 2d4+1 kobolds (veja Acólito de Kally)."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como um clérigo de Kallyadranoch de 9º nível (CD 28, limite de PM 9)."
        },
        {
            "name": "Coluna de Chamas",
            "timing": "padrão",
            "cost": "9 PM",
            "text": "Um cilindro de fogo sagrado com 3m de raio e 30m de altura desce dos céus em alcance longo, causando 9d6 pontos de dano de fogo mais 6d6 pontos de dano de luz nas criaturas e objetos livres na área."
        },
        {
            "name": "Comando",
            "timing": "padrão",
            "cost": "4 PM",
            "text": "No início do seu próximo turno, duas criaturas em alcance curto ficam caídas e não podem levantar-se até o início do seu turno seguinte (Von evita)."
        },
        {
            "name": "Controlar Fogo",
            "timing": "padrão",
            "cost": "3 PM",
            "text": "O clérigo chameja qualquer número de armas e ataques desarmados escolhidos em alcance curto. Até o fim da cena, essas armas causam +1d6 pontos de dano de fogo."
        },
        {
            "name": "Escudo da Fé",
            "timing": "reação",
            "cost": "1 PM",
            "text": "Uma criatura em alcance curto recebe +2 na Defesa por 1 turno."
        },
        {
            "name": "Oração",
            "timing": "padrão",
            "cost": "7 PM, sustentada",
            "text": "O clérigo e seus aliados em alcance curto recebem +3 em testes de perícia e rolagens de dano, e todos seus inimigos em alcance curto sofrem –3 em testes de perícia e rolagens de dano. Esse efeito é cumulativo com outras magias."
        },
        {
            "name": "Proteção Divina",
            "timing": "reação",
            "cost": "3 PM",
            "text": "Por uma rodada, uma criatura em alcance curto recebe +5 no próximo teste de resistência que fizer."
        }
    ],
    "equipment": "Azagaia x2, couraça, maça, símbolo sagrado de Kallyadranoch",
    "treasure": "Padrão.",
    "skillsText": "Intimidação +12, Misticismo +9, Religião +16"
};

export const dracomante = {
    "id": "dracomante",
    "name": "Dracomante",
    "type": "humanoid",
    "subtype": "humano",
    "size": "Médio",
    "challengeRating": 5,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p146 ate 155.pdf",
        "pdfPage": 6,
        "bookPage": 149
    },
    "stats": {
        "initiative": 8,
        "perception": 5,
        "defense": 18,
        "fortitude": 5,
        "reflex": 11,
        "will": 17,
        "hitPoints": 112,
        "manaPoints": 40,
        "speedText": "9m (6q)",
        "senses": null,
        "defensesText": "redução de fogo 10",
        "attributes": {
            "str": -1,
            "dex": 3,
            "con": 2,
            "int": 6,
            "wis": 2,
            "cha": 3
        }
    },
    "actions": [],
    "abilities": [
        {
            "name": "Arcano de Batalha",
            "timing": null,
            "text": "O dracomante soma sua Inteligência nas rolagens de dano quando lança magias ou usa seu raio arcano (já contabilizado)."
        },
        {
            "name": "Dracomancia",
            "timing": null,
            "text": "Quando lança uma magia ou usa Raio Arcano, o dracomante recebe redução de dano 5 e resistência a magia +5 até o início de seu próximo turno."
        },
        {
            "name": "Presença Aterradora",
            "timing": "padrão",
            "cost": "1 PM",
            "text": "O dracomante faz um teste de Intimidação oposto à Vontade de criaturas em alcance curto. Aquelas que falharem no teste ficam abaladas até o fim da cena; se falharem por 10 ou mais também ficam apavoradas por 1 rodada."
        },
        {
            "name": "Raio Arcano",
            "timing": "padrão",
            "cost": "1 PM",
            "text": "Uma criatura em alcance médio sofre 2d12+6 pontos de dano de fogo e fica em chamas (Ref CD 22 reduz à metade e evita a condição)."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como um mago de 5º nível (CD 22)."
        },
        {
            "name": "Armadura Arcana",
            "timing": "padrão",
            "cost": "3 PM",
            "text": "O dracomante recebe +5 na Defesa por um dia."
        },
        {
            "name": "Bola de Fogo",
            "timing": "padrão",
            "cost": "5 PM",
            "text": "O dracomante causa 8d6+6 pontos de dano de fogo em todas as criaturas e objetos livres numa esfera de 6m em alcance médio (Ref reduz à metade)."
        },
        {
            "name": "Campo de Força",
            "timing": "reação",
            "cost": "4 PM",
            "text": "Quando sofre dano, o dracomante recebe redução de dano 30 contra este dano."
        },
        {
            "name": "Explosão de Chamas",
            "timing": "padrão",
            "cost": "4 PM",
            "text": "O dracomante causa 5d6+6 pontos de dano de fogo a criaturas em um cone de 6m (Ref reduz à metade)."
        },
        {
            "name": "Dracomancia Elemental",
            "timing": null,
            "text": "Os dracomantes descritos aqui são especializados em fogo, mas podem ser adaptados para outros elementos. Substitua a redução de dano e o tipo de dano do sopro e de Raio Elemental pelo elemento escolhido e substitua Bola de Fogo e Explosão de Chamas pelas magias correspondentes: Ácido — Flecha Ácida e Jato Corrosivo; Elétrico — Relâmpago e Toque Chocante; Frio — Dardo Gélido e Sopro das Uivantes."
        }
    ],
    "equipment": "Pergaminho de armadura arcana, pergaminho de explosão de chamas, pergaminho de bola de fogo x2",
    "treasure": "Metade.",
    "skillsText": "Conhecimento +12, Intimidação +8, Misticismo +12"
};

export const dracomanteSuperior = {
    "id": "dracomante-superior",
    "name": "Dracomante Superior",
    "type": "humanoid",
    "subtype": "elfo",
    "size": "Médio",
    "challengeRating": 14,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p146 ate 155.pdf",
        "pdfPage": 6,
        "bookPage": 149
    },
    "stats": {
        "initiative": 18,
        "perception": 16,
        "defense": 33,
        "fortitude": 12,
        "reflex": 20,
        "will": 28,
        "hitPoints": 500,
        "manaPoints": 112,
        "speedText": "12m (8q)",
        "senses": "visão na penumbra",
        "defensesText": "redução de fogo 15",
        "attributes": {
            "str": -1,
            "dex": 4,
            "con": 4,
            "int": 8,
            "wis": 2,
            "cha": 5
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Adaga +30 (1d4+15, 19)."
        }
    ],
    "abilities": [
        {
            "name": "Arcano de Batalha",
            "timing": null,
            "text": "O dracomante superior soma sua Inteligência nas rolagens de dano quando lança magias ou usa seu raio arcano (já contabilizado)."
        },
        {
            "name": "Dracomancia",
            "timing": null,
            "text": "Quando lança uma magia ou usa Raio Arcano, o dracomante recebe redução de dano 5 e resistência a magia +5 até o início de seu próximo turno."
        },
        {
            "name": "Magia Acelerada",
            "timing": "livre",
            "cost": "+4 PM",
            "text": "Uma vez por rodada, quando usa seu Raio Arcano ou lança uma magia com execução de ação completa ou menor, o dracomante superior muda a execução dela para livre."
        },
        {
            "name": "Presença Aterradora",
            "timing": "padrão",
            "cost": "1 PM",
            "text": "O dracomante faz um teste de Intimidação oposto à Vontade de criaturas em alcance curto. Aquelas que falharem no teste ficam abaladas até o fim da cena; se falharem por 10 ou mais também ficam apavoradas por 1 rodada."
        },
        {
            "name": "PRESENCIEM O VERDADEIRO PODER!",
            "timing": "reação",
            "cost": "23 PM",
            "text": "Quando é reduzido a 300 PV ou menos, o dracomante lança a magia Transformação em Dragão."
        },
        {
            "name": "Raio Arcano",
            "timing": "padrão",
            "cost": "1 PM",
            "text": "Uma criatura em alcance médio sofre 4d12+8 pontos de dano de fogo e fica em chamas (Ref CD 38 reduz à metade e evita a condição)."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como um mago de 14º nível (CD 38, limite de PM 23)."
        },
        {
            "name": "Armadura Arcana",
            "timing": "padrão",
            "cost": "15 PM",
            "text": "O dracomante recebe +11 na Defesa por um dia."
        },
        {
            "name": "Bola de Fogo",
            "timing": "padrão",
            "cost": "11 PM",
            "text": "O dracomante causa 15d6+23 pontos de dano de fogo em todas as criaturas e objetos livres numa esfera de 6m em alcance médio (Ref reduz à metade)."
        },
        {
            "name": "Campo de Força",
            "timing": "reação",
            "cost": "7 PM",
            "text": "Quando sofre dano, o dracomante recebe redução de dano 50 contra este dano."
        },
        {
            "name": "Talho Invisível de Edauros",
            "timing": "padrão",
            "cost": "10 PM",
            "text": "Criaturas em um cone de 9m sofrem 10d8+8 pontos de dano de corte e ficam sangrando (Fort reduz à metade e evita a condição)."
        },
        {
            "name": "Transformação em Dragão",
            "timing": "completa",
            "cost": "23 PM",
            "text": "O dracomante recebe +2 em Força, Constituição, Inteligência e Carisma, +5 na Defesa, redução de fogo 30, deslocamento de voo 18m e um ataque de mordida (ataque +30, dano 1d6+15, 19/x3) que pode ser usado com sua adaga. Além disso, uma vez por rodada, ele pode gastar uma ação padrão para soprar fogo, causando 10d6+10 pontos de dano de fogo em um cone de 9m (Ref reduz à metade)."
        },
        {
            "name": "Velocidade",
            "timing": "padrão",
            "cost": "10 PM, sustentada",
            "text": "O dracomante pode executar uma ação padrão adicional por turno."
        },
        {
            "name": "Dracomancia Elemental",
            "timing": null,
            "text": "Os dracomantes descritos aqui são especializados em fogo, mas podem ser adaptados para outros elementos. Substitua a redução de dano e o tipo de dano do sopro e de Raio Elemental pelo elemento escolhido e substitua Bola de Fogo e Explosão de Chamas pelas magias correspondentes: Ácido — Flecha Ácida e Jato Corrosivo; Elétrico — Relâmpago e Toque Chocante; Frio — Dardo Gélido e Sopro das Uivantes."
        }
    ],
    "equipment": "Adaga, cetro elemental de couro de dragão (fogo), pergaminho de Transformação em Dragão",
    "treasure": "Nenhum.",
    "skillsText": "Conhecimento +22, Intimidação +19, Misticismo +24"
};

export const nezumiCapanga = {
    "id": "nezumi-capanga",
    "name": "Nezumi Capanga",
    "type": "humanoid",
    "subtype": "nezumi",
    "size": "Pequeno",
    "challengeRating": 1,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p156 ate 169.pdf",
        "pdfPage": 8,
        "bookPage": 161
    },
    "stats": {
        "initiative": 4,
        "perception": 4,
        "defense": 15,
        "fortitude": 10,
        "reflex": 5,
        "will": 1,
        "hitPoints": 9,
        "speedText": "9m (6q)",
        "senses": "faro, visão na penumbra",
        "defensesText": "resistência a medo de criaturas maiores +5",
        "attributes": {
            "str": 0,
            "dex": 2,
            "con": 2,
            "int": -1,
            "wis": 0,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Dois neko-te +11 (1d4+3, 19) e mordida +11 (1d6+3, 19)."
        },
        {
            "name": "À Distância",
            "text": "Azagaia +9 (1d6)."
        }
    ],
    "abilities": [
        {
            "name": "Roedor",
            "timing": null,
            "text": "Quando o nezumi capanga faz um acerto crítico com sua mordida, deixa a armadura da vítima avariada ou, se ela estiver sem armadura, aumenta em +1 o multiplicador desse crítico."
        }
    ],
    "equipment": "Azagaia, neko-te x2",
    "treasure": "Metade.",
    "skillsText": "Atletismo +4 (+6 para escalar), Intimidação +3"
};

export const nezumiNinja = {
    "id": "nezumi-ninja",
    "name": "Nezumi Ninja",
    "type": "humanoid",
    "subtype": "nezumi",
    "size": "Pequeno",
    "challengeRating": 3,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p156 ate 169.pdf",
        "pdfPage": 8,
        "bookPage": 161
    },
    "stats": {
        "initiative": 7,
        "perception": 3,
        "defense": 19,
        "fortitude": 9,
        "reflex": 15,
        "will": 3,
        "hitPoints": 74,
        "speedText": "9m (6q), escalada 9m (6q)",
        "senses": "faro, visão na penumbra",
        "defensesText": "evasão; resistência a medo de criaturas maiores +5",
        "attributes": {
            "str": 0,
            "dex": 4,
            "con": 2,
            "int": 1,
            "wis": 0,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Duas espadas curtas +12 (1d6+4, 19) e mordida +12 (1d6+4, 19)."
        },
        {
            "name": "À Distância",
            "text": "Duas shuriken +12 (1d4+4, 19)."
        }
    ],
    "abilities": [
        {
            "name": "Ataque Furtivo",
            "timing": null,
            "text": "+2d6."
        },
        {
            "name": "Bomba de Fumaça",
            "timing": "padrão",
            "text": "O nezumi ninja prepara e arremessa uma bomba de fumaça em um ponto em alcance curto. A bomba libera uma fumaça espessa em um raio de 6m a partir do impacto; a fumaça obscurece toda visão, fornece camuflagem para criaturas a até 1,5m e camuflagem total para criaturas a partir de 3m e dura até o fim da cena."
        },
        {
            "name": "Roedor",
            "timing": null,
            "text": "Quando o nezumi faz um acerto crítico com sua mordida, deixa a armadura da vítima avariada ou, se ela estiver sem armadura, aumenta em +1 o multiplicador desse crítico."
        }
    ],
    "equipment": "Bomba de fumaça x3, espada curta x2, shuriken x6",
    "treasure": "Metade.",
    "skillsText": "Acrobacia +7, Furtividade +12, Intimidação +4"
};

export const arqueiroEscravo = {
    "id": "arqueiro-escravo",
    "name": "Arqueiro Escravo",
    "type": "humanoid",
    "subtype": "elfo",
    "size": "Médio",
    "challengeRating": 5,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p170 ate 191.pdf",
        "pdfPage": 1,
        "bookPage": 168
    },
    "stats": {
        "initiative": 12,
        "perception": 7,
        "defense": 24,
        "fortitude": 6,
        "reflex": 16,
        "will": 11,
        "hitPoints": 36,
        "speedText": "12m (8q)",
        "senses": "visão na penumbra",
        "defensesText": null,
        "attributes": {
            "str": -1,
            "dex": 5,
            "con": 1,
            "int": 2,
            "wis": 0,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "À Distância",
            "text": "Arco longo x2 +21 (2d6+15, x3)."
        }
    ],
    "abilities": [
        {
            "name": "Disparo Preciso",
            "timing": null,
            "text": "O arqueiro escravo faz ataques à distância contra oponentes envolvidos em combate corpo a corpo sem sofrer a penalidade de –5 no teste de ataque."
        },
        {
            "name": "Flecha Amiga",
            "timing": "reação",
            "text": "Uma vez por rodada, quando um aliado em alcance médio ataca um inimigo, o arqueiro escravo faz um ataque de arco longo contra esse mesmo inimigo."
        },
        {
            "name": "Minha Vida Pela Legião",
            "timing": "reação",
            "text": "Uma vez por rodada, quando um aliado adjacente ao arqueiro escravo é atingido por um efeito que causa dano, o arqueiro sofre esse dano no lugar do aliado."
        }
    ],
    "equipment": "Arco longo, couraça, flechas x20",
    "treasure": "Nenhum.",
    "skillsText": null
};

export const centuriao = {
    "id": "centuriao",
    "name": "Centurião",
    "type": "humanoid",
    "subtype": "minotauro",
    "size": "Médio",
    "challengeRating": 3,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p170 ate 191.pdf",
        "pdfPage": 3,
        "bookPage": 170
    },
    "stats": {
        "initiative": 4,
        "perception": 2,
        "defense": 23,
        "fortitude": 15,
        "reflex": 4,
        "will": 8,
        "hitPoints": 100,
        "speedText": "6m (4q)",
        "senses": "faro",
        "defensesText": null,
        "attributes": {
            "str": 5,
            "dex": 0,
            "con": 4,
            "int": 2,
            "wis": 0,
            "cha": 0
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Gládio +14 (1d6+5, 19/x3) e chifres +14 (1d6+5)."
        },
        {
            "name": "À Distância",
            "text": "Azagaia +10 (1d6+5)."
        }
    ],
    "abilities": [
        {
            "name": "Coordenar Ataque",
            "timing": "movimento",
            "text": "O centurião coordena os ataques de uma falange da qual esteja participando. Até o próximo turno do centurião, sempre que um participante da falange fizer um ataque, pode rolar dois dados e usar o melhor resultado."
        },
        {
            "name": "Falange",
            "timing": "movimento",
            "text": "Se o centurião estiver usando um escudo e adjacente a um aliado com esta habilidade, pode formar uma falange com esse aliado. Enquanto estiverem adjacentes um ao outro, os participantes da falange recebem +2 na Defesa e em testes de resistência."
        },
        {
            "name": "Ordens",
            "timing": "movimento",
            "text": "O centurião grita ordens para seus aliados em alcance médio. Eles recebem +2 em testes de perícia até o fim da cena."
        },
        {
            "name": "Medo de Altura",
            "timing": null,
            "text": "Se estiver adjacente a uma queda de 3m ou mais de altura (como um buraco ou penhasco), o minotauro fica abalado."
        }
    ],
    "equipment": "Azagaia x3, escudo pesado, gládio certeiro, loriga segmentada",
    "treasure": "Padrão.",
    "skillsText": "Atletismo +10, Guerra +7"
};

export const centuriaoDeElite = {
    "id": "centuriao-de-elite",
    "name": "Centurião de Elite",
    "type": "humanoid",
    "subtype": "minotauro",
    "size": "Médio",
    "challengeRating": 7,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p170 ate 191.pdf",
        "pdfPage": 3,
        "bookPage": 170
    },
    "stats": {
        "initiative": 9,
        "perception": 9,
        "defense": 32,
        "fortitude": 20,
        "reflex": 8,
        "will": 13,
        "hitPoints": 250,
        "speedText": "6m (4q)",
        "senses": "faro",
        "defensesText": "imunidade a encantamento; redução de dano 5",
        "attributes": {
            "str": 6,
            "dex": 0,
            "con": 5,
            "int": 3,
            "wis": 0,
            "cha": 1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Gládio +23 (2d8+16, 19/x3) e chifres +23 (2d6+16)."
        },
        {
            "name": "À Distância",
            "text": "Azagaia +23 (1d6+14)."
        }
    ],
    "abilities": [
        {
            "name": "Coordenar Ataque",
            "timing": "movimento",
            "text": "O centurião de elite coordena os ataques de uma falange da qual esteja participando. Até o próximo turno do centurião, sempre que um participante da falange fizer um ataque, pode rolar dois dados e usar o melhor resultado."
        },
        {
            "name": "É Proibido Morrer",
            "timing": null,
            "text": "Aliados em alcance médio do centurião recebem RD 5."
        },
        {
            "name": "Falange",
            "timing": "movimento",
            "text": "Se o centurião estiver usando um escudo e adjacente a um aliado com esta habilidade, pode formar uma falange com esse aliado. Enquanto estiverem adjacentes um ao outro, os participantes da falange recebem +2 na Defesa e em testes de resistência."
        },
        {
            "name": "Ordens",
            "timing": "movimento",
            "text": "O centurião grita ordens para seus aliados em alcance médio. Eles recebem +2 em testes de perícia até o fim da cena."
        },
        {
            "name": "Medo de Altura",
            "timing": null,
            "text": "Se estiver adjacente a uma queda de 3m ou mais de altura (como um buraco ou penhasco), o minotauro fica abalado."
        }
    ],
    "equipment": "Azagaia x3, escudo pesado, gládio certeiro, loriga segmentada reforçada",
    "treasure": "Dobro.",
    "skillsText": "Atletismo +15, Guerra +12"
};

export const decuria = {
    "id": "decuria",
    "name": "Decúria",
    "type": "humanoid",
    "subtype": "minotauro",
    "size": "Grande",
    "challengeRating": 5,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p170 ate 191.pdf",
        "pdfPage": 6,
        "bookPage": 173
    },
    "stats": {
        "initiative": 5,
        "perception": 3,
        "defense": 22,
        "fortitude": 12,
        "reflex": 4,
        "will": 6,
        "hitPoints": 60,
        "speedText": "6m (4q)",
        "senses": "faro",
        "defensesText": null,
        "attributes": {
            "str": 4,
            "dex": 0,
            "con": 3,
            "int": 1,
            "wis": -1,
            "cha": 0
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "[Bando] Gládio +20 (2d6+10, 19/x3) e chifres +20 (2d6+10)."
        },
        {
            "name": "À Distância",
            "text": "[Bando] Azagaia +20 (2d6+10)."
        }
    ],
    "abilities": [
        {
            "name": "Disciplina Militar",
            "timing": null,
            "text": "Quando usa a ação agredir sob efeito da habilidade Ordens (veja Centurião), a decúria pode fazer um ataque adicional de gládio."
        },
        {
            "name": "Falange",
            "timing": "movimento",
            "text": "A decúria assume uma formação defensiva. Enquanto tiver pelo menos metade de seus PV, ela recebe +2 na Defesa e em testes de resistência."
        },
        {
            "name": "Medo de Altura",
            "timing": null,
            "text": "Se estiver adjacente a uma queda de 3m ou mais de altura (como um buraco ou penhasco), o minotauro fica abalado."
        }
    ],
    "equipment": "Azagaia x3, escudo pesado, gládio, loriga segmentada (1d10 de cada)",
    "treasure": "Metade.",
    "skillsText": null
};

export const gladiadorTaurico = {
    "id": "gladiador-taurico",
    "name": "Gladiador Táurico",
    "type": "humanoid",
    "subtype": "minotauro",
    "size": "Médio",
    "challengeRating": 10,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p170 ate 191.pdf",
        "pdfPage": 5,
        "bookPage": 172
    },
    "stats": {
        "initiative": 12,
        "perception": 9,
        "defense": 34,
        "fortitude": 20,
        "reflex": 16,
        "will": 12,
        "hitPoints": 390,
        "speedText": "9m (6q)",
        "senses": "faro",
        "defensesText": "imunidade a medo; redução de dano 5",
        "attributes": {
            "str": 4,
            "dex": 1,
            "con": 3,
            "int": 0,
            "wis": 0,
            "cha": 4
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Tridente +29 (2d8+18), chifres +29 (2d6+18)."
        },
        {
            "name": "À Distância",
            "text": "Rede +29 (enredar, veja Tormenta20, p. 150)."
        }
    ],
    "abilities": [
        {
            "name": "Agitar a Torcida",
            "timing": "movimento",
            "text": "O gladiador táurico faz um teste de Atuação e recebe uma quantidade de PV temporários igual ao resultado. Recarga (usar Estilo Espetacular e Sangue e Areia contra o mesmo inimigo)."
        },
        {
            "name": "Estilo Espetacular",
            "timing": "completa",
            "text": "O gladiador ataca uma criatura com o tridente, o chifre e a rede. Se acertar o ataque de rede e enredar o alvo, pode fazer um ataque adicional de tridente contra ele."
        },
        {
            "name": "Sangue e Areia",
            "timing": null,
            "text": "Quando acerta um ataque de tridente em um inimigo enredado por sua rede, o gladiador deixa a vítima sangrando."
        },
        {
            "name": "Medo de Altura",
            "timing": null,
            "text": "Se estiver adjacente a uma queda de 3m ou mais de altura (como um buraco ou penhasco), o minotauro fica abalado."
        }
    ],
    "equipment": "Couraça, rede, tridente cruel e equilibrado",
    "treasure": "Padrão.",
    "skillsText": "Atletismo +15, Atuação +15, Intimidação +15"
};

export const governadorCorrupto = {
    "id": "governador-corrupto",
    "name": "Governador Corrupto",
    "type": "humanoid",
    "subtype": "minotauro",
    "size": "Médio",
    "challengeRating": 6,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p170 ate 191.pdf",
        "pdfPage": 10,
        "bookPage": 177
    },
    "stats": {
        "initiative": 5,
        "perception": 7,
        "defense": 18,
        "fortitude": 12,
        "reflex": 6,
        "will": 18,
        "hitPoints": 122,
        "speedText": "9m (6q)",
        "senses": "faro",
        "defensesText": null,
        "attributes": {
            "str": 1,
            "dex": 0,
            "con": 3,
            "int": 3,
            "wis": 2,
            "cha": 5
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Adaga +19 (1d4+12, 19) e chifres +18 (1d6+12)."
        }
    ],
    "abilities": [
        {
            "name": "Como Ousa?",
            "timing": "reação",
            "text": "Uma vez por rodada, quando um inimigo tenta usar uma ação hostil contra o governador corrupto, o governador faz um teste de Intimidação oposto à Vontade do agressor. Se o governador vencer o teste oposto, o inimigo perde a ação."
        },
        {
            "name": "Deliberação Desnorteante",
            "timing": "completa",
            "text": "Uma vez por cena, o governador faz um discurso elaborado que deixa todos os inimigos em alcance curto pasmos por 1 rodada e desprevenidos pela cena (Von CD 24 anula)."
        },
        {
            "name": "Guarda Pessoal",
            "timing": null,
            "text": "O governador está sempre acompanhado de quatro legionários, que não contam para o cálculo de XP e tesouro do encontro."
        },
        {
            "name": "Incitar",
            "timing": "padrão",
            "text": "O governador ordena, xinga ou chicoteia seus subordinados para que sejam mais cruéis e eficazes. Todos os aliados do governador em alcance médio recebem +5 em testes de perícia e +1d10 em rolagens de dano por 1 rodada."
        },
        {
            "name": "Proteja-me!",
            "timing": "reação",
            "text": "Uma vez por rodada, quando sofre um ataque, o governador corrupto escolhe um aliado adjacente para se tornar o alvo desse ataque."
        },
        {
            "name": "Medo de Altura",
            "timing": null,
            "text": "Se estiver adjacente a uma queda de 3m ou mais de altura (como um buraco ou penhasco), o minotauro fica abalado."
        }
    ],
    "equipment": "Adaga certeira, tabardo aprimorado, traje da corte",
    "treasure": "Dobro.",
    "skillsText": "Conhecimento +8, Diplomacia +14, Guerra +8, Intimidação +17, Intuição +9, Nobreza +18"
};

export const legionario = {
    "id": "legionario",
    "name": "Legionário",
    "type": "humanoid",
    "subtype": "minotauro",
    "size": "Médio",
    "challengeRating": 1,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p170 ate 191.pdf",
        "pdfPage": 6,
        "bookPage": 173
    },
    "stats": {
        "initiative": 3,
        "perception": 1,
        "defense": 19,
        "fortitude": 10,
        "reflex": 2,
        "will": 4,
        "hitPoints": 12,
        "speedText": "6m (4q)",
        "senses": "faro",
        "defensesText": null,
        "attributes": {
            "str": 4,
            "dex": 0,
            "con": 3,
            "int": 1,
            "wis": -1,
            "cha": 0
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Gládio +10 (1d6+5, 19/x3) e chifres +10 (1d6+5)."
        },
        {
            "name": "À Distância",
            "text": "Azagaia +10 (1d6+5)."
        }
    ],
    "abilities": [
        {
            "name": "Falange",
            "timing": "movimento",
            "text": "Se o legionário estiver usando um escudo e adjacente a um aliado com esta habilidade, pode formar uma falange com esse aliado. Enquanto estiverem adjacentes um ao outro, os participantes da falange recebem +2 na Defesa e em testes de resistência."
        },
        {
            "name": "Medo de Altura",
            "timing": null,
            "text": "Se estiver adjacente a uma queda de 3m ou mais de altura (como um buraco ou penhasco), o minotauro fica abalado."
        }
    ],
    "equipment": "Azagaia x3, escudo pesado, gládio, loriga segmentada",
    "treasure": "Metade.",
    "skillsText": null
};

export const legionarioInsano = {
    "id": "legionario-insano",
    "name": "Legionário Insano",
    "type": "humanoid",
    "subtype": "minotauro",
    "size": "Médio",
    "challengeRating": 8,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p170 ate 191.pdf",
        "pdfPage": 7,
        "bookPage": 174
    },
    "stats": {
        "initiative": 10,
        "perception": 7,
        "defense": 30,
        "fortitude": 20,
        "reflex": 16,
        "will": 7,
        "hitPoints": 80,
        "speedText": "6m (4q)",
        "senses": "faro",
        "defensesText": "imunidade a medo; resistência a magia +5",
        "attributes": {
            "str": 7,
            "dex": 2,
            "con": 6,
            "int": -1,
            "wis": -1,
            "cha": -3
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Gládio x2 +27 (1d8+16, 19/x3) e chifres +27 (1d6+14)."
        }
    ],
    "abilities": [
        {
            "name": "Desapego à Vida",
            "timing": null,
            "text": "O legionário insano não fica inconsciente quando é reduzido a 0 PV ou menos e só morre quando é reduzido a –40 PV."
        },
        {
            "name": "Olhar Desesperador",
            "timing": "livre",
            "text": "Uma vez por rodada, o legionário encara um inimigo em alcance curto, que fica apavorado por 1 rodada e então abalado (Von CD 26 reduz para abalado por 1 rodada e o alvo fica imune a esta habilidade até o fim da cena)."
        },
        {
            "name": "Retribuição Ensandecida",
            "timing": "reação",
            "text": "Uma vez por rodada, quando sofre dano de um inimigo adjacente, o legionário pode usar uma ação agredir contra essa criatura."
        },
        {
            "name": "Medo de Altura",
            "timing": null,
            "text": "Se estiver adjacente a uma queda de 3m ou mais de altura (como um buraco ou penhasco), o minotauro fica abalado."
        }
    ],
    "equipment": "Gládio, loriga segmentada",
    "treasure": "Metade.",
    "skillsText": null
};

export const minauroArcanista = {
    "id": "minauro-arcanista",
    "name": "Minauro Arcanista",
    "type": "humanoid",
    "subtype": "minauro",
    "size": "Médio",
    "challengeRating": 3,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p170 ate 191.pdf",
        "pdfPage": 8,
        "bookPage": 175
    },
    "stats": {
        "initiative": 5,
        "perception": 6,
        "defense": 17,
        "fortitude": 9,
        "reflex": 4,
        "will": 15,
        "hitPoints": 64,
        "manaPoints": 34,
        "speedText": "9m (6q)",
        "senses": "faro",
        "defensesText": null,
        "attributes": {
            "str": 2,
            "dex": 0,
            "con": 2,
            "int": 4,
            "wis": 1,
            "cha": 0
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Espada curta +7 (1d6+2, 19)."
        }
    ],
    "abilities": [
        {
            "name": "Magias",
            "timing": null,
            "text": "Como um mago de 5º nível (CD 20, limite de PM 5)."
        },
        {
            "name": "Armadura Arcana",
            "timing": "reação",
            "cost": "2 PM",
            "text": "O minauro recebe +5 na Defesa contra o próximo ataque que sofrer."
        },
        {
            "name": "Bola de Fogo",
            "timing": "padrão",
            "cost": "5 PM",
            "text": "O minauro causa 8d6 pontos de dano de fogo em todas as criaturas em um raio de 6m em alcance médio (Ref reduz à metade)."
        },
        {
            "name": "Explosão de Chamas",
            "timing": "padrão",
            "cost": "3 PM",
            "text": "Criaturas em um cone de 6m sofrem 3d6 pontos de dano de fogo e ficam em chamas (Ref reduz dano à metade e evita a condição)."
        },
        {
            "name": "Primor Atlético",
            "timing": "padrão",
            "cost": "4 PM",
            "text": "Até o fim da cena, o deslocamento do minauro muda para 18m, ele recebe +10 em Atletismo e, quando faz testes de perícias baseadas em Força, Destreza e Constituição, exceto testes de ataque e resistência, rola dois dados e usa o melhor."
        }
    ],
    "equipment": "Essência de mana, espada curta, varinha arcana",
    "treasure": "Padrão.",
    "skillsText": "Atletismo +5, Conhecimento +9, Diplomacia +5, Investigação +11, Misticismo +9"
};

export const minauroLadino = {
    "id": "minauro-ladino",
    "name": "Minauro Ladino",
    "type": "humanoid",
    "subtype": "minauro",
    "size": "Médio",
    "challengeRating": 6,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p170 ate 191.pdf",
        "pdfPage": 8,
        "bookPage": 175
    },
    "stats": {
        "initiative": 11,
        "perception": 5,
        "defense": 25,
        "fortitude": 8,
        "reflex": 18,
        "will": 10,
        "hitPoints": 147,
        "speedText": "9m (6q)",
        "senses": "faro",
        "defensesText": "evasão aprimorada",
        "attributes": {
            "str": 2,
            "dex": 4,
            "con": 2,
            "int": 3,
            "wis": 0,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Espada curta 2x +18 (2d6+15, 19)."
        }
    ],
    "abilities": [
        {
            "name": "Ataque Furtivo",
            "timing": null,
            "text": "+3d6."
        },
        {
            "name": "Bombardeiro Veloz",
            "timing": "padrão",
            "text": "O minauro ladino saca uma de suas bombas e a arremessa em alcance curto. Uma bomba de fumaça gera fumaça espessa em um raio de 6m até o fim da cena e uma bomba causa 6d6 pontos de dano de impacto em todas as criaturas em um raio de 3m (Ref CD 24 reduz à metade)."
        },
        {
            "name": "Fuga Formidável",
            "timing": "completa",
            "text": "Até o fim da cena, o minauro ladino recebe +3m em seu deslocamento, +5 em Acrobacia e Atletismo e ignora penalidades em movimento por terreno difícil. Ele perde esses benefícios se fizer uma ação que não seja diretamente relacionada a fugir."
        },
        {
            "name": "Mãos Leves",
            "timing": null,
            "text": "O minauro ladino faz testes de Ladinagem como uma ação livre. Além disso, não sofre penalidade em testes de Furtividade por se mover ao seu deslocamento normal e reduz a penalidade por atacar e fazer outras ações chamativas para –10."
        },
        {
            "name": "Pirueta Defensiva",
            "timing": "reação",
            "text": "Uma vez por rodada, quando sofre dano de um ataque, o minauro reduz esse dano à metade."
        }
    ],
    "equipment": "Bomba x3, bomba de fumaça x3, espada curta, gazua",
    "treasure": "Padrão.",
    "skillsText": "Acrobacia +11, Atletismo +7, Diplomacia +6, Furtividade +11, Investigação +10, Jogatina +6, Ladinagem +11"
};

export const slark = {
    "id": "slark",
    "name": "Slark",
    "type": "humanoid",
    "subtype": "slark",
    "size": "Médio",
    "challengeRating": 1,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p200 ate 229.pdf",
        "pdfPage": 9,
        "bookPage": 206
    },
    "stats": {
        "initiative": 7,
        "perception": 4,
        "defense": 12,
        "fortitude": 8,
        "reflex": 1,
        "will": 4,
        "hitPoints": 15,
        "speedText": "6m (4q), escalada 6m (4q)",
        "senses": "sensibilidade a luz, visão no escuro",
        "defensesText": "redução de ácido 5",
        "attributes": {
            "str": -1,
            "dex": 3,
            "con": 2,
            "int": -1,
            "wis": 1,
            "cha": -2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Garras +10 (1d6+9, 19/x3)."
        }
    ],
    "abilities": [
        {
            "name": "Queda Livre",
            "timing": "completa",
            "text": "Se estiver em terreno elevado, o slark cai sobre uma criatura e faz um ataque de garras. Ele recebe o bônus por terreno elevado (+2 no teste de ataque) e, se a criatura estiver surpreendida, causa +2d6 pontos de dano."
        },
        {
            "name": "Saliva",
            "timing": "padrão",
            "text": "O slark cospe em uma criatura em alcance curto. A criatura fica cega por 1 rodada e qualquer fonte de iluminação mundana que esteja empunhando se apaga (Ref CD 14 evita ambos os efeitos)."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": "Furtividade +8"
};

export const armeiroDeTenebraClerigo = {
    "id": "armeiro-de-tenebra-clerigo",
    "name": "Armeiro de Tenebra Clérigo",
    "type": "humanoid",
    "subtype": "anão",
    "size": "Médio",
    "challengeRating": 8,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p254 ate 272.pdf",
        "pdfPage": 3,
        "bookPage": 254
    },
    "stats": {
        "initiative": 10,
        "perception": 13,
        "defense": 31,
        "fortitude": 15,
        "reflex": 8,
        "will": 21,
        "hitPoints": 210,
        "manaPoints": 45,
        "speedText": "6m (4q)",
        "senses": "visão no escuro; Percepção +15 em subterrâneo",
        "defensesText": "imunidade a trevas",
        "attributes": {
            "str": 1,
            "dex": 0,
            "con": 5,
            "int": 1,
            "wis": 5,
            "cha": -2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Machado de batalha +24 (1d8+1, x3)."
        },
        {
            "name": "À Distância",
            "text": "Mosquete +24 (2d8+16, 18/x3, mais 8d6 trevas)."
        }
    ],
    "abilities": [
        {
            "name": "Disparo Preciso",
            "timing": null,
            "text": "O armeiro de Tenebra clérigo pode fazer ataques à distância contra oponentes envolvidos em combate corpo a corpo sem a penalidade padrão de –5 no teste de ataque."
        },
        {
            "name": "Pacto da Pólvora",
            "timing": null,
            "text": "Quando causa dano de trevas com seu mosquete, o armeiro recupera uma quantidade de PV igual à metade do dano de trevas causado."
        },
        {
            "name": "Saque Rápido",
            "timing": null,
            "text": "O armeiro pode sacar ou guardar itens como uma ação livre e recarregar seu mosquete como uma ação de movimento."
        },
        {
            "name": "Visão nas Trevas",
            "timing": null,
            "text": "O armeiro enxerga no escuro mesmo em magias de escuridão."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como um clérigo de Tenebra de 8º nível (CD 28)."
        },
        {
            "name": "Arma Mágica",
            "timing": "padrão",
            "cost": "8 PM",
            "text": "Até o fim da cena, uma arma adjacente se torna mágica, fornecendo +2 nos testes de ataque e rolagens de dano e +2d6 pontos de dano de frio."
        },
        {
            "name": "Curar Ferimentos",
            "timing": "padrão",
            "cost": "8 PM",
            "text": "Uma criatura adjacente cura 9d8+9 PV."
        },
        {
            "name": "Escudo da Fé",
            "timing": "reação",
            "cost": "8 PM",
            "text": "Quando sofre um ataque, o armeiro recebe camuflagem contra ataques à distância e +5 na Defesa até seu próximo turno."
        },
        {
            "name": "Miasma Mefítico",
            "timing": "padrão",
            "cost": "7 PM",
            "text": "Uma nuvem de 6m de raio se forma em alcance médio. Criaturas na área sofrem 7d6 pontos de dano de ácido e ficam enjoadas por 1 rodada (Fort reduz à metade e evita a condição)."
        }
    ],
    "equipment": "Balas x20, capa pesada, cota de malha, machado de batalha, mosquete certeiro, símbolo sagrado de Tenebra",
    "treasure": "Padrão.",
    "skillsText": "Misticismo +9, Ofício (armeiro) +11, Religião +13"
};

export const armeiroDeTenebraDevoto = {
    "id": "armeiro-de-tenebra-devoto",
    "name": "Armeiro de Tenebra Devoto",
    "type": "humanoid",
    "subtype": "anão",
    "size": "Médio",
    "challengeRating": 6,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p254 ate 272.pdf",
        "pdfPage": 2,
        "bookPage": 253
    },
    "stats": {
        "initiative": 7,
        "perception": 8,
        "defense": 26,
        "fortitude": 12,
        "reflex": 6,
        "will": 18,
        "hitPoints": 220,
        "speedText": "6m (4q)",
        "senses": "visão no escuro; Percepção +10 em subterrâneo",
        "defensesText": "imunidade a trevas",
        "attributes": {
            "str": 0,
            "dex": 0,
            "con": 5,
            "int": 1,
            "wis": 3,
            "cha": -2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Machado de batalha +20 (1d8, x3)."
        },
        {
            "name": "À Distância",
            "text": "Mosquete +20 (2d8+12, 18/x3, mais 6d6 trevas)."
        }
    ],
    "abilities": [
        {
            "name": "Disparo Preciso",
            "timing": null,
            "text": "O armeiro de Tenebra devoto pode fazer ataques à distância contra oponentes envolvidos em combate corpo a corpo sem a penalidade padrão de –5 no teste de ataque."
        },
        {
            "name": "Manto da Penumbra",
            "timing": "padrão",
            "text": "Uma vez por cena, o armeiro pode gerar uma área de sombras como o efeito básico da magia Escuridão (CD 22)."
        },
        {
            "name": "Mira Apurada",
            "timing": "movimento",
            "text": "O armeiro recebe +2 em testes de ataque e na margem de ameaça com ataques à distância até o fim do turno."
        },
        {
            "name": "Pacto da Pólvora",
            "timing": null,
            "text": "Quando causa dano de trevas com seu mosquete, o armeiro recupera uma quantidade de pontos de vida igual à metade do dano de trevas causado."
        },
        {
            "name": "Saque Rápido",
            "timing": null,
            "text": "O armeiro pode sacar ou guardar itens como uma ação livre e recarregar seu mosquete como uma ação de movimento."
        }
    ],
    "equipment": "Armadura de couro, balas x20, machado de batalha, mosquete certeiro, símbolo sagrado de Tenebra",
    "treasure": "Padrão.",
    "skillsText": "Ofício (armeiro) +9"
};

export const bandoPirata = {
    "id": "bando-pirata",
    "name": "Bando Pirata",
    "type": "humanoid",
    "subtype": "humano",
    "size": "Grande",
    "challengeRating": 6,
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
        "defense": 27,
        "fortitude": 10,
        "reflex": 17,
        "will": 9,
        "hitPoints": 54,
        "speedText": "9m (6q)",
        "senses": null,
        "defensesText": null,
        "attributes": {
            "str": 0,
            "dex": 1,
            "con": 1,
            "int": 0,
            "wis": 1,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "[Bando] Cimitarra +24 (2d6+12, 18) e adaga +24 (2d4+12, 19)."
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
        }
    ],
    "equipment": "Adaga, cimitarra (1d8 cada)",
    "treasure": "Metade.",
    "skillsText": "Acrobacia +10, Atletismo +7"
};

export const capitaoDaFrotaAurea = {
    "id": "capitao-da-frota-aurea",
    "name": "Capitão da Frota Áurea",
    "type": "humanoid",
    "subtype": "humano",
    "size": "Médio",
    "challengeRating": 10,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p254 ate 272.pdf",
        "pdfPage": 9,
        "bookPage": 260
    },
    "stats": {
        "initiative": 18,
        "perception": 10,
        "defense": 36,
        "fortitude": 12,
        "reflex": 20,
        "will": 16,
        "hitPoints": 360,
        "speedText": "9m (6q)",
        "senses": null,
        "defensesText": "evasão aprimorada; imunidade a medo; redução de dano 5",
        "attributes": {
            "str": 2,
            "dex": 7,
            "con": 2,
            "int": 1,
            "wis": 1,
            "cha": 4
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Florete x2 +29 (2d6+22, 14/x3)."
        },
        {
            "name": "À Distância",
            "text": "Pistola +29 (2d6+12, 18/x3)."
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
            "name": "Bloqueio Resistente",
            "timing": "reação",
            "text": "Uma vez por rodada, quando é atingido por um ataque, o capitão da Frota Áurea pode fazer um teste de ataque com seu florete. O dano desse ataque é reduzido em um valor igual ao resultado do teste de ataque do capitão."
        },
        {
            "name": "Nadador Blindado",
            "timing": null,
            "text": "O capitão não sofre penalidade por armadura em testes de Atletismo para nadar."
        },
        {
            "name": "Saque Rápido",
            "timing": null,
            "text": "O capitão pode sacar ou guardar itens como uma ação livre e recarregar sua pistola como uma ação de movimento."
        },
        {
            "name": "Vendaval do Mar",
            "timing": "movimento",
            "text": "Quando se move 6m ou mais, o capitão recebe +5 nas rolagens de dano e na margem de ameaça com seu florete até o início de seu próximo turno."
        }
    ],
    "equipment": "Balas x20, couraça reforçada, florete maciço, pistola",
    "treasure": "Dobro.",
    "skillsText": "Acrobacia +18, Atletismo +13, Diplomacia +13, Pilotagem +18"
};

export const capitaoDoConclavePirata = {
    "id": "capitao-do-conclave-pirata",
    "name": "Capitão do Conclave Pirata",
    "type": "humanoid",
    "subtype": "humano",
    "size": "Médio",
    "challengeRating": 8,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p254 ate 272.pdf",
        "pdfPage": 8,
        "bookPage": 259
    },
    "stats": {
        "initiative": 16,
        "perception": 9,
        "defense": 33,
        "fortitude": 10,
        "reflex": 19,
        "will": 15,
        "hitPoints": 290,
        "speedText": "9m (6q)",
        "senses": null,
        "defensesText": "evasão; imunidade a medo",
        "attributes": {
            "str": 1,
            "dex": 6,
            "con": 2,
            "int": 1,
            "wis": 1,
            "cha": 4
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Cimitarra x2 +26 (2d6+12, 14/x3)."
        },
        {
            "name": "À Distância",
            "text": "Pistola +26 (2d6+10, 19/x3)."
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
            "name": "Disparo Covarde",
            "timing": "livre",
            "text": "O capitão do Conclave Pirata só pode usar esta habilidade no seu primeiro turno de combate. Ele faz um ataque de pistola; o alvo desse ataque é considerado desprevenido."
        },
        {
            "name": "Sangria",
            "timing": null,
            "text": "Sempre que rola um 6 em um dado de dano com sua cimitarra, o capitão rola +1d6 e soma o resultado ao dano causado (repetindo o processo para cada novo resultado 6)."
        },
        {
            "name": "Saque Rápido",
            "timing": null,
            "text": "O capitão pode sacar ou guardar itens como uma ação livre e recarregar sua pistola como uma ação de movimento."
        },
        {
            "name": "Saraivada",
            "timing": "padrão",
            "text": "O capitão comanda uma saraivada de canhões que atinge uma esfera de 6m em alcance médio. Criaturas na área sofrem 8d12 pontos de dano de impacto e ficam caídas (Ref CD 26 reduz à metade e evita a condição). O capitão só pode usar esta habilidade uma vez por cena, e apenas se estiver em alcance longo de seu navio."
        },
        {
            "name": "Todos a Postos",
            "timing": "movimento",
            "text": "Uma vez por cena, o capitão invoca 1d4+1 marujos piratas em espaços desocupados em alcance curto. Eles agem a partir da próxima rodada do capitão, têm deslocamento 9m e podem gastar uma ação padrão para causar 1d6+4 pontos de dano de corte em uma criatura adjacente. Os marujos piratas têm For 1, Des 3, Defesa 16 e 1 PV e falham automaticamente em qualquer teste oposto ou de resistência."
        }
    ],
    "equipment": "Balas x20, cimitarra precisa, couraça ajustada, pistola",
    "treasure": "Dobro.",
    "skillsText": "Acrobacia +16, Atletismo +11, Intimidação +14, Pilotagem +16"
};

export const ceratopsChefeDaTribo = {
    "id": "ceratops-chefe-da-tribo",
    "name": "Ceratops Chefe da Tribo",
    "type": "humanoid",
    "subtype": "ceratops",
    "size": "Grande",
    "challengeRating": 7,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p254 ate 272.pdf",
        "pdfPage": 14,
        "bookPage": 265
    },
    "stats": {
        "initiative": 7,
        "perception": 9,
        "defense": 32,
        "fortitude": 21,
        "reflex": 7,
        "will": 14,
        "hitPoints": 280,
        "speedText": "9m (6q)",
        "senses": null,
        "defensesText": "redução de dano 5",
        "attributes": {
            "str": 6,
            "dex": 0,
            "con": 6,
            "int": -1,
            "wis": 2,
            "cha": 0
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Tacape +24 (3d8+22) e chifres +24 (1d8+22)."
        }
    ],
    "abilities": [
        {
            "name": "Atropelamento",
            "timing": "completa",
            "text": "O ceratops chefe da tribo percorre até o dobro de seu deslocamento. Ele pode passar pelo espaço ocupado de quaisquer inimigos menores que ele, mas não pode passar duas vezes pelo mesmo espaço. Criaturas atropeladas desta forma sofrem 12d8+12 pontos de dano de impacto e ficam caídas (Ref CD 24 reduz à metade e evita a condição). Recarga (movimento)."
        },
        {
            "name": "Determinação Primal",
            "timing": "reação",
            "text": "Quando o ceratops é reduzido a 80 PV ou menos, seus instintos de proteção da família despertam. Todas as condições e efeitos negativos afetando o ceratops se encerram e ele recebe resistência a magia +5 até o fim da cena."
        },
        {
            "name": "Medo de Altura",
            "timing": null,
            "text": "Se estiver adjacente a uma queda de 3m ou mais de altura (como um buraco ou penhasco), o ceratops fica abalado."
        }
    ],
    "equipment": "Tacape aumentado, gibão de peles",
    "treasure": "Padrão.",
    "skillsText": "Atletismo +13, Diplomacia +7, Intimidação +13, Sobrevivência +9"
};

export const ceratopsGuerreiro = {
    "id": "ceratops-guerreiro",
    "name": "Ceratops Guerreiro",
    "type": "humanoid",
    "subtype": "ceratops",
    "size": "Grande",
    "challengeRating": 3,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p254 ate 272.pdf",
        "pdfPage": 13,
        "bookPage": 264
    },
    "stats": {
        "initiative": 0,
        "perception": 3,
        "defense": 21,
        "fortitude": 14,
        "reflex": 4,
        "will": 9,
        "hitPoints": 33,
        "speedText": "9m (6q)",
        "senses": null,
        "defensesText": "redução de dano 2",
        "attributes": {
            "str": 5,
            "dex": -1,
            "con": 4,
            "int": -1,
            "wis": 0,
            "cha": 0
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Tacape +14 (1d12+6) e chifres +14 (1d8+6)."
        }
    ],
    "abilities": [
        {
            "name": "Atropelamento",
            "timing": "completa",
            "text": "O ceratops guerreiro percorre até o dobro de seu deslocamento. Ele pode passar pelo espaço ocupado de quaisquer inimigos menores que ele, mas não pode passar duas vezes pelo mesmo espaço. Criaturas atropeladas desta forma sofrem 4d8+4 pontos de dano de impacto e ficam caídas (Ref CD 17 reduz à metade e evita a condição). Recarga (movimento)."
        },
        {
            "name": "Medo de Altura",
            "timing": null,
            "text": "Se estiver adjacente a uma queda de 3m ou mais de altura (como um buraco ou penhasco), o ceratops fica abalado."
        }
    ],
    "equipment": "Tacape aumentado",
    "treasure": "Metade.",
    "skillsText": "Atletismo +8, Intimidação +8, Sobrevivência +3"
};

export const chapeuPreto = {
    "id": "chapeu-preto",
    "name": "Chapéu-Preto",
    "type": "humanoid",
    "subtype": "meio-orc",
    "size": "Médio",
    "challengeRating": 12,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p254 ate 272.pdf",
        "pdfPage": 11,
        "bookPage": 262
    },
    "stats": {
        "initiative": 20,
        "perception": 12,
        "defense": 42,
        "fortitude": 20,
        "reflex": 26,
        "will": 12,
        "hitPoints": 480,
        "speedText": "9m (6q)",
        "senses": "visão no escuro; Percepção +14 em subterrâneo",
        "defensesText": "evasão aprimorada; imunidade a medo",
        "attributes": {
            "str": 2,
            "dex": 6,
            "con": 3,
            "int": 0,
            "wis": 2,
            "cha": 3
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Adaga +32 (1d4+6, 19)."
        },
        {
            "name": "À Distância",
            "text": "Pistola +36 (6d6+50, 17/x3)."
        }
    ],
    "abilities": [
        {
            "name": "Bala nas Costas",
            "timing": null,
            "text": "O chapéu-preto recebe +10 na margem de ameaça do primeiro ataque que fizer contra cada oponente na cena."
        },
        {
            "name": "Duro como o Inferno",
            "timing": null,
            "text": "Todo dano de corte, impacto e perfuração que o chapéu-preto sofre é reduzido à metade."
        },
        {
            "name": "Mão Firme",
            "timing": null,
            "text": "O chapéu-preto pode fazer ataques de pistola contra oponentes envolvidos em combate corpo a corpo sem sofrer a penalidade padrão de –5 no teste de ataque e, quando faz um ataque de pistola, rola dois dados e usa o melhor resultado."
        },
        {
            "name": "Reputação",
            "timing": null,
            "text": "Uma criatura que comece seu turno em alcance médio do chapéu-preto fica abalada (Von CD 33 evita e a criatura não pode mais ser abalada por esta habilidade até o fim da cena)."
        },
        {
            "name": "Saque Rápido",
            "timing": null,
            "text": "O chapéu-preto pode sacar ou guardar itens como uma ação livre e recarregar sua pistola como uma ação de movimento."
        },
        {
            "name": "Tiro à Traição",
            "timing": null,
            "text": "Quando faz um ataque de pistola contra um oponente desprevenido, o chapéu-preto recebe +5 na margem de ameaça e causa +6d6 pontos de dano."
        }
    ],
    "equipment": "Adaga, balas x20, pistola formidável",
    "treasure": "Padrão.",
    "skillsText": "Cavalgar +16, Intimidação +20, Jogatina +13, Sobrevivência +12 (+14 em subterrâneo)"
};

export const goblinDeSombreiro = {
    "id": "goblin-de-sombreiro",
    "name": "Goblin de Sombreiro",
    "type": "humanoid",
    "subtype": "goblin",
    "size": "Pequeno",
    "challengeRating": 2,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p254 ate 272.pdf",
        "pdfPage": 5,
        "bookPage": 256
    },
    "stats": {
        "initiative": 9,
        "perception": 3,
        "defense": 18,
        "fortitude": 9,
        "reflex": 11,
        "will": 4,
        "hitPoints": 16,
        "speedText": "9m (6q), escalada 9m (6q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a fascinado e ofuscado; resistência a condições de sentidos +2",
        "attributes": {
            "str": -1,
            "dex": 4,
            "con": 2,
            "int": 0,
            "wis": 0,
            "cha": 0
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Duas adagas +14 (1d4+4, 19)."
        },
        {
            "name": "À Distância",
            "text": "Traque +14 (2d6+4, 19/x3)."
        }
    ],
    "abilities": [
        {
            "name": "Ataque Furtivo",
            "timing": null,
            "text": "+1d6."
        },
        {
            "name": "Sombreiro",
            "timing": null,
            "text": "Quando o goblin de sombreiro ataca pela primeira vez em um combate, sua vítima é considerada desprevenida contra esse ataque."
        },
        {
            "name": "Valentão",
            "timing": null,
            "text": "O goblin recebe +2 em testes de ataque e rolagens de dano contra oponentes caídos, desprevenidos, enredados, flanqueados ou indefesos."
        }
    ],
    "equipment": "Adaga x2, balas x20, traque",
    "treasure": "Metade mais sombreiro.",
    "skillsText": "Enganação +5, Furtividade +10"
};

export const homemPiranha = {
    "id": "homem-piranha",
    "name": "Homem-Piranha",
    "type": "humanoid",
    "subtype": "humano",
    "size": "Médio",
    "challengeRating": 2,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p254 ate 272.pdf",
        "pdfPage": 6,
        "bookPage": 257
    },
    "stats": {
        "initiative": 5,
        "perception": 3,
        "defense": 17,
        "fortitude": 4,
        "reflex": 11,
        "will": 7,
        "hitPoints": 68,
        "speedText": "9m (6q)",
        "senses": null,
        "defensesText": null,
        "attributes": {
            "str": 2,
            "dex": 2,
            "con": 2,
            "int": -1,
            "wis": 0,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Duas adagas +13 (1d4+7, 19)."
        }
    ],
    "abilities": [
        {
            "name": "Dentes Afiados",
            "timing": "reação",
            "text": "Uma vez por rodada, quando uma criatura adjacente erra um ataque contra o homem-piranha por 5 ou mais, sofre 1d4+4 pontos de dano de corte."
        }
    ],
    "equipment": "Adaga x2",
    "treasure": "Metade.",
    "skillsText": "Acrobacia +5, Atletismo +7"
};

export const homemPiranhaImediato = {
    "id": "homem-piranha-imediato",
    "name": "Homem-Piranha Imediato",
    "type": "humanoid",
    "subtype": "humano",
    "size": "Médio",
    "challengeRating": 4,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p254 ate 272.pdf",
        "pdfPage": 6,
        "bookPage": 257
    },
    "stats": {
        "initiative": 5,
        "perception": 8,
        "defense": 20,
        "fortitude": 6,
        "reflex": 14,
        "will": 10,
        "hitPoints": 98,
        "manaPoints": 24,
        "speedText": "9m (6q)",
        "senses": null,
        "defensesText": null,
        "attributes": {
            "str": 3,
            "dex": 1,
            "con": 3,
            "int": -1,
            "wis": 4,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Clava +15 (2d6+14)."
        }
    ],
    "abilities": [
        {
            "name": "Dentes Afiados",
            "timing": "reação",
            "text": "Uma vez por rodada, quando uma criatura adjacente erra um ataque contra o homem-piranha imediato por 5 ou mais, sofre 1d4+6 pontos de dano de corte."
        },
        {
            "name": "Urro Divino",
            "timing": "livre",
            "cost": "1 PM",
            "text": "Quando faz um ataque ou lança uma magia, o imediato soma sua Constituição à rolagem de dano desse ataque ou magia."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como um druida de Megalokk de 4º nível (CD 20)."
        },
        {
            "name": "Amedrontar",
            "timing": "padrão",
            "cost": "3 PM",
            "text": "Um animal ou humanoide em alcance curto fica apavorado por 1d4+1 rodadas e depois abalado (Von reduz para abalado por 1d4 rodadas)."
        },
        {
            "name": "Armamento da Natureza",
            "timing": "movimento",
            "cost": "4 PM",
            "text": "A clava do imediato se torna mágica; ela fornece +1 em testes de ataque e rolagens de dano e seu dano aumenta +1d6."
        },
        {
            "name": "Curar Ferimentos",
            "timing": "padrão",
            "cost": "4 PM",
            "text": "Uma criatura adjacente cura 5d8+5 PV."
        },
        {
            "name": "Escudo da Fé",
            "timing": "reação",
            "cost": "3 PM",
            "text": "Quando sofre um ataque, o imediato recebe +3 na Defesa até seu próximo turno."
        }
    ],
    "equipment": "Clava, escudo leve, símbolo sagrado de Megalokk",
    "treasure": "Metade.",
    "skillsText": "Acrobacia +5, Atletismo +9, Religião +8, Sobrevivência +8"
};

export const liderGoblinDeSombreiro = {
    "id": "lider-goblin-de-sombreiro",
    "name": "Líder Goblin de Sombreiro",
    "type": "humanoid",
    "subtype": "goblin",
    "size": "Pequeno",
    "challengeRating": 6,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p254 ate 272.pdf",
        "pdfPage": 5,
        "bookPage": 256
    },
    "stats": {
        "initiative": 12,
        "perception": 5,
        "defense": 28,
        "fortitude": 13,
        "reflex": 18,
        "will": 7,
        "hitPoints": 190,
        "speedText": "9m (6q), escalada 9m (6q)",
        "senses": "visão no escuro",
        "defensesText": "evasão; imunidade a fascinado e ofuscado; resistência a condições de sentidos +2",
        "attributes": {
            "str": -1,
            "dex": 5,
            "con": 2,
            "int": 0,
            "wis": 0,
            "cha": 0
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Duas adagas +20 (2d4+8, 19)."
        },
        {
            "name": "À Distância",
            "text": "Bacamarte +20 (4d6+8, 19/x3). O líder goblin de sombreiro faz um teste de ataque e compara o resultado com a Defesa de cada criatura em um cone de 6m. Quando ataca, ele é empurrado 3m na direção oposta ao disparo."
        }
    ],
    "abilities": [
        {
            "name": "Ataque Furtivo",
            "timing": null,
            "text": "+3d6."
        },
        {
            "name": "Poncho",
            "timing": "reação",
            "text": "O poncho esvoaçante do líder faz mais do que protegê-lo do clima. Uma vez por cena, o líder pode usá-lo para evitar um ataque recém-sofrido."
        },
        {
            "name": "Sombreiro",
            "timing": null,
            "text": "Quando o líder ataca pela primeira vez em um combate, sua vítima é considerada desprevenida contra este ataque."
        },
        {
            "name": "Valentão",
            "timing": null,
            "text": "O líder recebe +2 em testes de ataque e rolagens de dano contra oponentes caídos, desprevenidos, enredados, flanqueados ou indefesos."
        }
    ],
    "equipment": "Adaga x2, balas x20, bacamarte",
    "treasure": "Metade mais sombreiro.",
    "skillsText": "Enganação +7, Furtividade +13"
};

export const liderPistoleiro = {
    "id": "lider-pistoleiro",
    "name": "Líder Pistoleiro",
    "type": "humanoid",
    "subtype": "humano",
    "size": "Médio",
    "challengeRating": 4,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p254 ate 272.pdf",
        "pdfPage": 9,
        "bookPage": 260
    },
    "stats": {
        "initiative": 10,
        "perception": 5,
        "defense": 22,
        "fortitude": 9,
        "reflex": 15,
        "will": 6,
        "hitPoints": 120,
        "speedText": "9m (6q)",
        "senses": null,
        "defensesText": "imunidade a medo",
        "attributes": {
            "str": 0,
            "dex": 4,
            "con": 2,
            "int": 0,
            "wis": 1,
            "cha": 1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Adaga +16 (1d4+7, 19)."
        },
        {
            "name": "À Distância",
            "text": "Pistola +16 (2d6+15, 19/x3)."
        }
    ],
    "abilities": [
        {
            "name": "Dedo no Gatilho",
            "timing": null,
            "text": "Quando faz um ataque de pistola contra um oponente desprevenido, o líder pistoleiro recebe +5 na rolagem de dano e na margem de ameaça."
        },
        {
            "name": "Disparo Preciso",
            "timing": null,
            "text": "O líder pode fazer ataques à distância contra oponentes envolvidos em combate corpo a corpo sem a penalidade padrão de –5 no teste de ataque."
        },
        {
            "name": "Saque Rápido",
            "timing": null,
            "text": "O líder pode sacar ou guardar itens como uma ação livre e recarregar sua pistola como uma ação de movimento."
        },
        {
            "name": "Tibar Furado",
            "timing": null,
            "text": "O líder carrega um amuleto da sorte, como um tibar ou uma garrafinha de metal, que já salvou sua vida mais de uma vez. Uma vez por cena, quando sofre dano que o levaria a 0 PV ou menos, o líder ignora esse dano."
        }
    ],
    "equipment": "Adaga, balas x20, pistola",
    "treasure": "Metade.",
    "skillsText": "Cavalgar +10, Jogatina +7"
};

export const loboDoMar = {
    "id": "lobo-do-mar",
    "name": "Lobo do Mar",
    "type": "humanoid",
    "subtype": "humano",
    "size": "Médio",
    "challengeRating": 16,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p254 ate 272.pdf",
        "pdfPage": 12,
        "bookPage": 263
    },
    "stats": {
        "initiative": 23,
        "perception": 16,
        "defense": 54,
        "fortitude": 24,
        "reflex": 30,
        "will": 16,
        "hitPoints": 690,
        "speedText": "9m (6q)",
        "senses": null,
        "defensesText": "evasão aprimorada; imunidade a medo; resistência a efeitos mentais e de movimento e magia +5",
        "attributes": {
            "str": 1,
            "dex": 7,
            "con": 3,
            "int": 2,
            "wis": 2,
            "cha": 4
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Florete x2 +46 (2d6+40, 15) e adaga x2 +46 (2d4+40, 15)."
        },
        {
            "name": "À Distância",
            "text": "Adaga +46 (2d4+40, 15)."
        }
    ],
    "abilities": [
        {
            "name": "Ataque Furtivo",
            "timing": null,
            "text": "+8d6."
        },
        {
            "name": "Bloqueio Resistente",
            "timing": "reação",
            "text": "Uma vez por rodada, quando é atingido por um ataque, o lobo do mar pode fazer um teste de ataque com seu florete. O dano desse ataque é reduzido em um valor igual ao resultado do teste de ataque do capitão."
        },
        {
            "name": "Pirata",
            "timing": null,
            "text": "O lobo do mar recebe todas as habilidades de piratas."
        },
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
            "name": "Todos a Postos",
            "timing": "movimento",
            "text": "Uma vez por cena, o lobo do mar invoca 2d4+1 marujos piratas em espaços desocupados em alcance curto. Eles agem a partir da próxima rodada do lobo do mar, têm deslocamento 9m e podem gastar uma ação padrão para causar 2d4+4 pontos de dano de corte em uma criatura adjacente. Os marujos piratas têm For 1, Des 3, Defesa 25 e 1 PV e falham automaticamente em qualquer teste oposto ou de resistência."
        },
        {
            "name": "Truque do Convés",
            "timing": "movimento",
            "text": "Uma criatura adjacente ao lobo do mar fica desprevenida contra seu próximo ataque nesta rodada (Von CD 42 evita). Esta habilidade só pode ser usada uma vez contra cada criatura na mesma cena."
        }
    ],
    "equipment": "Adaga precisa x3, bandana, florete formidável preciso",
    "treasure": "Dobro.",
    "skillsText": "Acrobacia +23, Atletismo +17, Intimidação +21, Jogatina +20, Pilotagem +23"
};

export const pirata = {
    "id": "pirata",
    "name": "Pirata",
    "type": "humanoid",
    "subtype": "humano",
    "size": "Médio",
    "challengeRating": 0.5,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p254 ate 272.pdf",
        "pdfPage": 8,
        "bookPage": 259
    },
    "stats": {
        "initiative": 6,
        "perception": 2,
        "defense": 14,
        "fortitude": 2,
        "reflex": 5,
        "will": 1,
        "hitPoints": 8,
        "speedText": "9m (6q)",
        "senses": null,
        "defensesText": null,
        "attributes": {
            "str": 0,
            "dex": 0,
            "con": 1,
            "int": 0,
            "wis": 1,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Cimitarra +9 (1d6+6, 18)."
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
        }
    ],
    "equipment": "Cimitarra",
    "treasure": "Metade.",
    "skillsText": "Acrobacia +6, Atletismo +4"
};

export const pistoleiro = {
    "id": "pistoleiro",
    "name": "Pistoleiro",
    "type": "humanoid",
    "subtype": "humano",
    "size": "Médio",
    "challengeRating": 2,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p254 ate 272.pdf",
        "pdfPage": 9,
        "bookPage": 260
    },
    "stats": {
        "initiative": 8,
        "perception": 4,
        "defense": 18,
        "fortitude": 6,
        "reflex": 12,
        "will": 4,
        "hitPoints": 63,
        "speedText": "9m (6q)",
        "senses": null,
        "defensesText": null,
        "attributes": {
            "str": 0,
            "dex": 3,
            "con": 2,
            "int": 0,
            "wis": 1,
            "cha": 0
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Adaga +12 (1d4+5, 19)."
        },
        {
            "name": "À Distância",
            "text": "Pistola +12 (2d6+10, 19/x3)."
        }
    ],
    "abilities": [
        {
            "name": "Disparo Preciso",
            "timing": null,
            "text": "O pistoleiro pode fazer ataques à distância contra oponentes envolvidos em combate corpo a corpo sem a penalidade padrão de –5 no teste de ataque."
        },
        {
            "name": "Saque Rápido",
            "timing": null,
            "text": "O pistoleiro pode sacar ou guardar itens como uma ação livre e recarregar sua pistola como uma ação de movimento."
        }
    ],
    "equipment": "Adaga, balas x20, pistola",
    "treasure": "Metade.",
    "skillsText": "Cavalgar +8, Jogatina +5"
};

export const pterosCeifador = {
    "id": "pteros-ceifador",
    "name": "Pteros Ceifador",
    "type": "humanoid",
    "subtype": "pteros",
    "size": "Médio",
    "challengeRating": 2,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p254 ate 272.pdf",
        "pdfPage": 15,
        "bookPage": 266
    },
    "stats": {
        "initiative": 6,
        "perception": 9,
        "defense": 16,
        "fortitude": 4,
        "reflex": 9,
        "will": 14,
        "hitPoints": 21,
        "speedText": "9m (6q), voo 12m (8q)",
        "senses": "visão na penumbra",
        "defensesText": "evasão",
        "attributes": {
            "str": 1,
            "dex": 3,
            "con": 0,
            "int": -1,
            "wis": 4,
            "cha": 0
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Duas garras +12 (1d6+5)."
        }
    ],
    "abilities": [
        {
            "name": "Companheiros de Voo",
            "timing": null,
            "text": "Pteros ceifadores caçam em pares com seus companheiros. Se estiver flanqueando um inimigo com seu companheiro, o pteros recebe +2 em testes de ataque, em rolagens de dano e na Defesa contra esse inimigo. Quando um dos pteros morre, o choque deixa seu companheiro atordoado por 1 rodada e então esmorecido."
        },
        {
            "name": "Rasante",
            "timing": "completa",
            "text": "O pteros faz uma investida e ataca com suas duas garras. Os dois ataques recebem o bônus de +2 da investida, mas devem ser feitos contra o mesmo alvo. Após o ataque, o pteros ceifador pode continuar seu movimento, até o limite de seu deslocamento."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": "Atletismo +6, Sobrevivência +7"
};

export const pterosDoCeuInfinito = {
    "id": "pteros-do-ceu-infinito",
    "name": "Pteros do Céu Infinito",
    "type": "humanoid",
    "subtype": "pteros",
    "size": "Médio",
    "challengeRating": 5,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p254 ate 272.pdf",
        "pdfPage": 15,
        "bookPage": 266
    },
    "stats": {
        "initiative": 7,
        "perception": 11,
        "defense": 20,
        "fortitude": 5,
        "reflex": 11,
        "will": 17,
        "hitPoints": 140,
        "manaPoints": 33,
        "speedText": "9m (6q), voo 12m (8q)",
        "senses": "visão na penumbra",
        "defensesText": null,
        "attributes": {
            "str": 0,
            "dex": 3,
            "con": 0,
            "int": -1,
            "wis": 5,
            "cha": 0
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Duas garras +15 (1d6+3)."
        }
    ],
    "abilities": [
        {
            "name": "Bênção de Anikka",
            "timing": null,
            "text": "Por ser um devoto de Anikka do Céu Infinito (um aspecto de Wynna), o pteros do céu infinito lança magias arcanas como se fossem divinas. Além disso, quando lança uma magia, ele recebe +2 na Defesa por 1 rodada."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como um clérigo de Wynna de 5º nível (CD 22)."
        },
        {
            "name": "Curar Ferimentos",
            "timing": "padrão",
            "cost": "5 PM",
            "text": "Uma criatura adjacente cura 6d8+6 PV."
        },
        {
            "name": "Controlar Plantas",
            "timing": "padrão",
            "cost": "2 PM",
            "text": "Um quadrado de 9m de vegetação em alcance curto se torna terreno difícil. Criaturas na área quando a magia é lançada ou no início de seus próprios turnos ficam enredadas e imóveis (Fort evita). Uma vítima pode se libertar com uma ação padrão e um teste de Acrobacia ou Atletismo."
        },
        {
            "name": "Toque Chocante",
            "timing": "padrão",
            "cost": "5 PM",
            "text": "O pteros dispara raios que atingem todas as criaturas em uma esfera de 6m ao seu redor, causando 4d8+4 pontos de dano de eletricidade (Fort reduz à metade)."
        },
        {
            "name": "Tempestade Divina",
            "timing": "padrão",
            "cost": "4 PM, sustentada",
            "text": "Só pode ser lançada em ambientes abertos. Um vendaval preenche um cilindro de 15m de raio e 15m de altura. Uma vez por rodada, o pteros pode gastar uma ação padrão para causar 3d8 pontos de dano de eletricidade em uma criatura na área (Ref reduz à metade)."
        }
    ],
    "equipment": "Pó azul x2, ramo verdejante x1d3, símbolo sagrado de Anikka (Wynna)",
    "treasure": "Padrão.",
    "skillsText": "Atletismo +5, Cura +9, Religião +9, Sobrevivência +9"
};

export const sahuaginMetamorfo = {
    "id": "sahuagin-metamorfo",
    "name": "Sahuagin Metamorfo",
    "type": "humanoid",
    "subtype": "sahuagin",
    "size": "Médio",
    "challengeRating": 3,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p254 ate 272.pdf",
        "pdfPage": 10,
        "bookPage": 261
    },
    "stats": {
        "initiative": 7,
        "perception": 4,
        "defense": 20,
        "fortitude": 10,
        "reflex": 13,
        "will": 4,
        "hitPoints": 108,
        "speedText": "9m (6q), natação 15m (10q)",
        "senses": "visão no escuro",
        "defensesText": "sensibilidade a luz",
        "attributes": {
            "str": 2,
            "dex": 1,
            "con": 1,
            "int": 0,
            "wis": 1,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Tridente +16 (1d8+6) e mordida +14 (1d4+4)."
        }
    ],
    "abilities": [
        {
            "name": "Afinidade com Tubarões",
            "timing": null,
            "text": "O sahuagin pode se comunicar telepaticamente com tubarões em alcance médio."
        },
        {
            "name": "Corpo Salino",
            "timing": null,
            "text": "Se for totalmente submerso em água doce, o sahuagin fica fatigado (Fort CD 15 evita)."
        },
        {
            "name": "Derrubar",
            "timing": "livre",
            "text": "Tridente (teste +18)."
        },
        {
            "name": "Forma de Tubarão",
            "timing": "completa",
            "text": "O sahuagin adquire uma forma híbrida de tubarão. Ele se torna Grande, recebe faro e +2 em Força e na Defesa, e seus ataques se tornam tridente +18 (1d8+8) e mordida +16 (1d6+6). Nessa forma, ele sempre ataca o oponente atualmente com a maior quantidade de dano sofrido."
        },
        {
            "name": "Frenesi",
            "timing": "livre",
            "text": "Quando acerta um ataque de mordida, o sahuagin entra em frenesi até o fim da cena. Neste estado, ele recebe +2 em testes de ataque e rolagens de dano."
        }
    ],
    "equipment": "Tridente",
    "treasure": "Padrão.",
    "skillsText": "Adestramento +2, Atletismo +5"
};

export const sahuaginPredador = {
    "id": "sahuagin-predador",
    "name": "Sahuagin Predador",
    "type": "humanoid",
    "subtype": "sahuagin",
    "size": "Médio",
    "challengeRating": 1,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p254 ate 272.pdf",
        "pdfPage": 10,
        "bookPage": 261
    },
    "stats": {
        "initiative": 5,
        "perception": 3,
        "defense": 14,
        "fortitude": 4,
        "reflex": 10,
        "will": 1,
        "hitPoints": 15,
        "speedText": "9m (6q), natação 12m (8q)",
        "senses": "visão no escuro",
        "defensesText": "sensibilidade a luz",
        "attributes": {
            "str": 2,
            "dex": 1,
            "con": 1,
            "int": 0,
            "wis": 1,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Espada curta +11 (1d6+3, 19) e mordida +9 (1d4+3)."
        }
    ],
    "abilities": [
        {
            "name": "Afinidade com Tubarões",
            "timing": null,
            "text": "O sahuagin pode se comunicar telepaticamente com tubarões em alcance médio."
        },
        {
            "name": "Corpo Salino",
            "timing": null,
            "text": "Se for totalmente submerso em água doce, o sahuagin fica fatigado (Fort CD 15 evita)."
        },
        {
            "name": "Frenesi",
            "timing": "livre",
            "text": "Quando acerta um ataque de mordida, o sahuagin entra em frenesi até o fim da cena. Neste estado, ele recebe +2 em testes de ataque e rolagens de dano."
        }
    ],
    "equipment": "Espada curta",
    "treasure": "Nenhum.",
    "skillsText": "Adestramento +1, Atletismo +4"
};

export const velocisCacador = {
    "id": "velocis-cacador",
    "name": "Velocis Caçador",
    "type": "humanoid",
    "subtype": "velocis",
    "size": "Médio",
    "challengeRating": 4,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p254 ate 272.pdf",
        "pdfPage": 17,
        "bookPage": 268
    },
    "stats": {
        "initiative": 7,
        "perception": 8,
        "defense": 21,
        "fortitude": 6,
        "reflex": 15,
        "will": 9,
        "hitPoints": 25,
        "speedText": "12m (8q), sem redução por terreno difícil natural",
        "senses": "faro, visão na penumbra",
        "defensesText": "Defesa 23 contra ataques à distância; redução a corte e perfuração 2",
        "attributes": {
            "str": 1,
            "dex": 3,
            "con": 1,
            "int": -1,
            "wis": 2,
            "cha": 0
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Lança +17 (1d6+9 mais veneno)."
        },
        {
            "name": "À Distância",
            "text": "Azagaia +17 (1d6+11 mais veneno)."
        }
    ],
    "abilities": [
        {
            "name": "Ataque em Movimento",
            "timing": null,
            "text": "O velocis caçador pode se mover antes e depois de executar a ação agredir, desde que a distância total percorrida não seja maior que seu deslocamento."
        },
        {
            "name": "Covardia Defensiva",
            "timing": "reação",
            "text": "Uma vez por rodada, quando sofre dano de um ataque corpo a corpo, o velocis se move até metade de seu deslocamento em direção contrária ao atacante e recebe +2 na Defesa por 1 rodada."
        },
        {
            "name": "Estilo de Arremesso",
            "timing": null,
            "text": "O velocis saca armas de arremesso como uma ação livre."
        },
        {
            "name": "Velocista da Planície",
            "timing": null,
            "text": "Quando faz testes de Atletismo para correr ou saltar, o velocis rola dois dados e usa o melhor resultado."
        },
        {
            "name": "Veneno",
            "timing": null,
            "text": "Peçonha concentrada (perde 1d12 pontos de vida durante 3 rodadas, Fort CD 18 reduz a duração para 1 rodada)."
        }
    ],
    "equipment": "Azagaia x3, escudo de couro, lança, peçonha concentrada x4",
    "treasure": "Metade.",
    "skillsText": "Atletismo +7, Furtividade +6, Sobrevivência +8"
};

export const voracisCacadora = {
    "id": "voracis-cacadora",
    "name": "Voracis Caçadora",
    "type": "humanoid",
    "subtype": "voracis",
    "size": "Médio",
    "challengeRating": 8,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p254 ate 272.pdf",
        "pdfPage": 18,
        "bookPage": 269
    },
    "stats": {
        "initiative": 15,
        "perception": 8,
        "defense": 30,
        "fortitude": 16,
        "reflex": 20,
        "will": 8,
        "hitPoints": 64,
        "speedText": "9m (6q), escalada 9m (6q)",
        "senses": "faro, visão na penumbra",
        "defensesText": null,
        "attributes": {
            "str": 3,
            "dex": 5,
            "con": 3,
            "int": -1,
            "wis": 0,
            "cha": 0
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Espada vespa +27 (2d4+22, 18) e garra +27 (1d6+22, x3)."
        },
        {
            "name": "À Distância",
            "text": "Azagaia +24 (1d6+22, 19) ou rede +24 (enredar)."
        }
    ],
    "abilities": [
        {
            "name": "Corta-Passos",
            "timing": "livre",
            "text": "Uma vez por rodada, quando faz um ataque corpo a corpo, a voracis caçadora pode sofrer uma penalidade de –2 nesse teste de ataque. Se fizer isso e acertar o ataque, o alvo fica lento (Fort CD 26 evita)."
        },
        {
            "name": "Marca da Presa",
            "timing": "movimento",
            "text": "A caçadora analisa uma criatura em alcance médio. Até o fim da cena, ela recebe +2d12 em rolagens de dano contra essa criatura."
        }
    ],
    "equipment": "Armadura de couro, azagaia x3, espada vespa atroz, garra feroz maciça, rede",
    "treasure": "Metade.",
    "skillsText": "Atletismo +13, Acrobacia +13, Intimidação +8, Sobrevivência +10"
};

export const voracisRainha = {
    "id": "voracis-rainha",
    "name": "Voracis Rainha",
    "type": "humanoid",
    "subtype": "voracis",
    "size": "Médio",
    "challengeRating": 11,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p254 ate 272.pdf",
        "pdfPage": 19,
        "bookPage": 270
    },
    "stats": {
        "initiative": 16,
        "perception": 11,
        "defense": 41,
        "fortitude": 18,
        "reflex": 24,
        "will": 11,
        "hitPoints": 530,
        "speedText": "9m (6q), escalada 9m (6q)",
        "senses": "faro, visão na penumbra",
        "defensesText": "evasão; imunidade a medo; redução de dano 5",
        "attributes": {
            "str": 3,
            "dex": 7,
            "con": 3,
            "int": -1,
            "wis": 2,
            "cha": 1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Presa de serpente x2 +30 (1d8+27, 17) e garra +30 (1d6+27, x3)."
        },
        {
            "name": "À Distância",
            "text": "Azagaia +28 (1d6+25) ou rede +28 (enredar)."
        }
    ],
    "abilities": [
        {
            "name": "Caça em Bando",
            "timing": "movimento",
            "text": "Uma vez por cena, a voracis rainha invoca 1d6+2 voracis em espaços desocupados em alcance curto. Eles agem a partir da próxima rodada da rainha, têm deslocamento 9m (normal e escalada) e podem gastar uma ação padrão para causar 2d4+4 pontos de dano de corte em uma criatura adjacente. As voracis têm For 1, Des 4, Defesa 26 e 1 PV e falham automaticamente em qualquer teste oposto ou de resistência."
        },
        {
            "name": "Eviscerar",
            "timing": null,
            "text": "Quando acerta um ataque de garra, a rainha rasga a carne da vítima, que fica desprevenida e sangrando (Fort CD 31 evita). Essas condições persistem até que a vítima receba cura mágica ou primeiros socorros. Criaturas imunes a acertos críticos e/ou sangramentos ou usando armaduras pesadas são imunes a esta habilidade. Metabolismo."
        },
        {
            "name": "Fúria Primeva",
            "timing": "livre",
            "text": "A rainha entra em um estado de frenesi. Ela ganha 50 PV temporários e todas as criaturas em alcance médio ficam abaladas (Von CD 31 evita). Além disso, enquanto esta habilidade estiver ativa, a rainha recebe +4 em testes de ataque e rolagens de dano, mas não pode realizar ações que exigem calma e concentração. A fúria termina se, ao fim da rodada, a rainha não tiver atacado nem for alvo de um efeito hostil. Recarga (matar uma criatura)."
        }
    ],
    "equipment": "Azagaia x3, bálsamo da drogadora x2, garra feroz maciça, presa de serpente, rede",
    "treasure": "Dobro.",
    "skillsText": "Atletismo +12, Furtividade +16, Intimidação +10, Sobrevivência +13"
};

export const xamaDeSarana = {
    "id": "xama-de-sarana",
    "name": "Xamã de Sarana",
    "type": "humanoid",
    "subtype": "velocis",
    "size": "Médio",
    "challengeRating": 6,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p254 ate 272.pdf",
        "pdfPage": 17,
        "bookPage": 268
    },
    "stats": {
        "initiative": 7,
        "perception": 9,
        "defense": 25,
        "fortitude": 6,
        "reflex": 12,
        "will": 18,
        "hitPoints": 168,
        "manaPoints": 34,
        "speedText": "12m (8q), sem redução por terreno difícil natural",
        "senses": "faro, visão na penumbra",
        "defensesText": "imunidade a alquebrado, esmorecido e frustrado; redução a corte e perfuração 2",
        "attributes": {
            "str": -1,
            "dex": 2,
            "con": 0,
            "int": -1,
            "wis": 4,
            "cha": 3
        }
    },
    "actions": [],
    "abilities": [
        {
            "name": "Aura de Paz",
            "timing": "livre",
            "cost": "2 PM",
            "text": "A xamã de Sarana gera uma aura de paz com um raio de 9m e duração cena. Qualquer inimigo dentro da aura que tente fazer uma ação hostil contra ela deve passar em um teste de Vontade (CD 24) ou perde a ação. Se passar, fica imune a esta habilidade por um dia."
        },
        {
            "name": "Magia em Movimento",
            "timing": null,
            "text": "Quando se move e lança uma magia na mesma rodada, a xamã pode se mover antes e depois da magia, desde que a distância total percorrida não seja maior que seu deslocamento."
        },
        {
            "name": "Velocista da Planície",
            "timing": null,
            "text": "Quando faz testes de Atletismo para correr ou saltar, a xamã rola dois dados e usa o melhor resultado."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como uma clériga de Marah de 6º nível (CD 24)."
        },
        {
            "name": "Caminhos da Natureza",
            "timing": "padrão",
            "cost": "3 PM",
            "text": "Criaturas escolhidas em alcance curto recebem deslocamento +3m e ignoram penalidades por terreno difícil em terrenos naturais."
        },
        {
            "name": "Curar Ferimentos",
            "timing": "padrão",
            "cost": "3 PM",
            "text": "Uma criatura adjacente cura 4d8+8 PV."
        },
        {
            "name": "Escudo da Fé",
            "timing": "reação",
            "cost": "1 PM",
            "text": "Quando uma criatura em alcance curto sofre um ataque, ela recebe +2 na Defesa por 1 turno."
        },
        {
            "name": "Purificação",
            "timing": "padrão",
            "cost": "3 PM",
            "text": "Remove uma condição entre abalado, apavorado, alquebrado, atordoado, cego, confuso, debilitado, enjoado, envenenado, esmorecido, exausto, fascinado, fatigado, fraco, frustrado, lento, ofuscado, paralisado, pasmo ou surdo de uma criatura adjacente."
        },
        {
            "name": "Tranquilidade",
            "timing": "padrão",
            "cost": "2 PM",
            "text": "Até o fim da cena, uma criatura em alcance curto tem sua atitude mudada para indiferente e não pode atacar ou realizar qualquer ação hostil (Von reduz para penalidade de –2 em testes de ataque). Ações hostis contra o alvo dissipam a magia."
        }
    ],
    "equipment": "Bálsamo restaurador x3, ramo verdejante x4, símbolo sagrado de Sarana (Marah)",
    "treasure": "Padrão.",
    "skillsText": "Atletismo +7, Cura +9, Diplomacia +13, Sobrevivência +11, Religião +9"
};

export const arcanoDeGuerraAdepto = {
    "id": "arcano-de-guerra-adepto",
    "name": "Arcano de Guerra Adepto",
    "type": "humanoid",
    "subtype": "humano",
    "size": "Médio",
    "challengeRating": 4,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p273 ate 285.pdf",
        "pdfPage": 4,
        "bookPage": 274
    },
    "stats": {
        "initiative": 7,
        "perception": 5,
        "defense": 22,
        "fortitude": 6,
        "reflex": 11,
        "will": 16,
        "hitPoints": 82,
        "manaPoints": 36,
        "speedText": "6m (4q)",
        "senses": null,
        "defensesText": "resistência a magia +2",
        "attributes": {
            "str": 2,
            "dex": 3,
            "con": 2,
            "int": 6,
            "wis": 1,
            "cha": 0
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Adaga +13 (1d4+2, 19)."
        }
    ],
    "abilities": [
        {
            "name": "Conjurador Magibélico",
            "timing": null,
            "text": "O arcano de guerra adepto pode lançar magias vestindo armaduras pesadas sem precisar de testes de Misticismo. Além disso, sempre que faz um teste de Misticismo, ele pode rolar dois dados e escolher o melhor resultado."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como um mago de 5º nível (CD 20, limite de PM 11)."
        },
        {
            "name": "Explosão de Chamas",
            "timing": "padrão",
            "cost": "3 PM",
            "text": "Criaturas em um cone de 6m sofrem 4d6 pontos de dano de fogo (Ref reduz à metade)."
        },
        {
            "name": "Sopro das Uivantes",
            "timing": "padrão",
            "cost": "6 PM",
            "text": "Criaturas em um cone de 9m sofrem 8d6 pontos de dano de frio e, se forem Médias ou menores, ficam caídas e são empurradas 6m na direção oposta. Se houver uma parede ou outro objeto sólido (mas não uma criatura) no caminho, a criatura para de se mover, mas sofre +2d6 pontos de dano de impacto (Fort reduz à metade e evita a condição e o empurrão)."
        },
        {
            "name": "Névoa",
            "timing": "padrão",
            "cost": "11 PM",
            "text": "Forma uma nuvem quase sólida que ocupa um cubo de 6m em alcance curto e dura até o fim da cena. Criaturas a até 1,5m têm camuflagem leve e criaturas a partir de 3m têm camuflagem total. Criaturas dentro da nuvem têm seu deslocamento reduzido para 3m e sofrem –2 em testes de ataque rolagens de dano e, no início de cada um de seus turnos, sofrem 4d4 pontos de dano de ácido."
        },
        {
            "name": "Toque Chocante",
            "timing": "padrão",
            "cost": "3 PM",
            "text": "Uma criatura adjacente sofre 4d8+4 pontos de dano de eletricidade (Fort reduz à metade)."
        },
        {
            "name": "Salto Dimensional",
            "timing": "reação",
            "cost": "5 PM",
            "text": "O arcano recebe +5 na Defesa e em testes de Reflexos contra um ataque ou efeito que esteja prestes a atingi-lo. Após a resolução do efeito, ele salta para um espaço adjacente desocupado."
        },
        {
            "name": "Ódio Puro",
            "timing": null,
            "text": "O purista recebe +5 em testes de Vontade quando está seguindo ordens de um superior (qualquer purista com ND maior) e +2 em rolagens de dano contra humanoides não humanos."
        }
    ],
    "equipment": "Adaga, armadura completa, tomo de guerra",
    "treasure": "Padrão.",
    "skillsText": "Conhecimento +12, Guerra +14, Misticismo +12"
};

export const arcanoDeGuerraVeterano = {
    "id": "arcano-de-guerra-veterano",
    "name": "Arcano de Guerra Veterano",
    "type": "humanoid",
    "subtype": "humano",
    "size": "Médio",
    "challengeRating": 11,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p273 ate 285.pdf",
        "pdfPage": 5,
        "bookPage": 275
    },
    "stats": {
        "initiative": 14,
        "perception": 9,
        "defense": 41,
        "fortitude": 11,
        "reflex": 24,
        "will": 18,
        "hitPoints": 360,
        "manaPoints": 85,
        "speedText": "6m (4q)",
        "senses": null,
        "defensesText": "resistência a magia +5",
        "attributes": {
            "str": 2,
            "dex": 3,
            "con": 3,
            "int": 7,
            "wis": 2,
            "cha": 0
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Adaga +31 (1d4+2, 19)."
        }
    ],
    "abilities": [
        {
            "name": "Conjurador Magibélico",
            "timing": null,
            "text": "O arcano de guerra veterano pode lançar magias vestindo armaduras pesadas sem precisar de testes de Misticismo. Além disso, sempre que faz um teste de Misticismo, ele pode rolar dois dados e escolher o melhor resultado."
        },
        {
            "name": "Magia Acelerada",
            "timing": "livre",
            "cost": "+4 PM",
            "text": "Uma vez por rodada, quando lança uma magia com execução de ação completa ou menor, o arcano muda a execução dela para livre."
        },
        {
            "name": "Magias Devastadoras",
            "timing": null,
            "text": "As magias do arcano que causam dano têm cada um de seus dados de dano aumentados em um passo (já contabilizado) e ignoram até 10 pontos de redução de dano."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como um mago de 9º nível (CD 33)."
        },
        {
            "name": "Açoite Flamejante",
            "timing": "movimento",
            "cost": "7 PM, sustentada",
            "text": "Um açoite de fogo surge na mão do arcano. Ele pode gastar uma ação padrão para açoitar uma criatura em alcance curto, que sofre 6d8 pontos de dano de fogo e fica em chamas e enredada enquanto estiver em chamas (Ref reduz à metade e evita as condições)."
        },
        {
            "name": "Campo de Força",
            "timing": "reação",
            "cost": "4 PM",
            "text": "Quando sofre dano, o arcano de guerra recebe redução de dano 30 contra esse dano."
        },
        {
            "name": "Muralha Elemental",
            "timing": "padrão",
            "cost": "9 PM",
            "text": "Uma muralha de fogo de até 30m de comprimento e 3m de altura se eleva da terra em alcance médio. Um lado da muralha emite ondas de calor, que causam 2d8 pontos de dano de fogo em criaturas a até 6m quando a magia é lançada e no início dos turnos do arcano. Atravessar a muralha causa 12d8 pontos de dano de fogo."
        },
        {
            "name": "Relâmpago",
            "timing": "padrão",
            "cost": "7 PM",
            "text": "O arcano lança um relâmpago em cada criatura escolhida em alcance médio, causando 8d8 pontos de dano de eletricidade (Ref reduz à metade)."
        },
        {
            "name": "Sopro das Uivantes",
            "timing": "padrão",
            "cost": "6 PM",
            "text": "Criaturas em um cone de 9m sofrem 8d8 pontos de dano de frio e, se forem Médias ou menores, ficam caídas e são empurradas 6m na direção oposta. Se houver uma parede ou outro objeto sólido (mas não uma criatura) no caminho, a criatura para de se mover, mas sofre +2d6 pontos de dano de impacto (Fort reduz à metade e evita a condição e o empurrão)."
        },
        {
            "name": "Velocidade",
            "timing": "padrão",
            "cost": "3 PM, sustentada",
            "text": "O arcano pode executar uma ação padrão adicional por turno, que não pode ser usada para lançar magias."
        },
        {
            "name": "Ódio Puro",
            "timing": null,
            "text": "O purista recebe +5 em testes de Vontade quando está seguindo ordens de um superior (qualquer purista com ND maior) e +2 em rolagens de dano contra humanoides não humanos."
        }
    ],
    "equipment": "Adaga, armadura completa reforçada, tomo de guerra",
    "treasure": "Padrão.",
    "skillsText": "Conhecimento +16, Guerra +16, Misticismo +18"
};

export const cacadorDeImpuros = {
    "id": "cacador-de-impuros",
    "name": "Caçador de Impuros",
    "type": "humanoid",
    "subtype": "humano",
    "size": "Médio",
    "challengeRating": 8,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p273 ate 285.pdf",
        "pdfPage": 6,
        "bookPage": 276
    },
    "stats": {
        "initiative": 18,
        "perception": 14,
        "defense": 34,
        "fortitude": 4,
        "reflex": 17,
        "will": 9,
        "hitPoints": 290,
        "speedText": "9m (6q)",
        "senses": null,
        "defensesText": null,
        "attributes": {
            "str": 2,
            "dex": 4,
            "con": 3,
            "int": 2,
            "wis": 2,
            "cha": 3
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Cimitarra x2 +23 (1d6+10, 18/x3)."
        },
        {
            "name": "À Distância",
            "text": "Besta leve x2 +23 (1d8+10, 19)."
        }
    ],
    "abilities": [
        {
            "name": "Espião Infiltrado",
            "timing": "padrão",
            "text": "O caçador de impuros faz um teste de Enganação contra a Diplomacia de um alvo não humano, para apontá-lo como culpado de algum crime que não cometeu. Se vencer, criaturas inteligentes (Int –3 ou maior) em alcance médio mudam a atitude com o alvo para hostil até o fim da cena."
        },
        {
            "name": "Espreitador Astuto",
            "timing": null,
            "text": "O caçador pode executar uma ação padrão adicional em seu primeiro turno de combate. Além disso, quando se move 6m ou mais, ele recebe +1d12 nas rolagens de dano de ataques corpo a corpo e à distância em alcance curto até o início do seu próximo turno."
        },
        {
            "name": "Inimigo de Todos",
            "timing": "movimento",
            "text": "O caçador analisa uma criatura humanoide não humana em alcance longo. Até o fim da cena, ou até usar esta habilidade em outra criatura, ele recebe +6 em testes de perícia e +2d12 nas rolagens de dano contra essa criatura, e seus ataques contra o alvo recebem +2 na margem de ameaça."
        },
        {
            "name": "Munição Estilhaçadora",
            "timing": null,
            "text": "O caçador pode executar as manobras desarmar e quebrar com ataques à distância. Adicionalmente, por serem de aço-rubi, seus virotes ignoram 10 pontos da redução de dano do alvo."
        },
        {
            "name": "Saque Rápido",
            "timing": null,
            "text": "O caçador pode sacar ou guardar itens e recarregar sua besta leve como uma ação livre."
        },
        {
            "name": "Ódio Puro",
            "timing": null,
            "text": "O purista recebe +5 em testes de Vontade quando está seguindo ordens de um superior (qualquer purista com ND maior) e +2 em rolagens de dano contra humanoides não humanos."
        }
    ],
    "equipment": "Besta leve, cimitarra, couraça sob medida, virotes de aço rubi x20",
    "treasure": "Padrão.",
    "skillsText": "Atletismo +10, Enganação +11 (+21 para disfarce), Furtividade +14, Investigação +10, Sobrevivência +10"
};

export const companhiaBlindadaDeElite = {
    "id": "companhia-blindada-de-elite",
    "name": "Companhia Blindada de Elite",
    "type": "humanoid",
    "subtype": "humano",
    "size": "Grande",
    "challengeRating": 9,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p273 ate 285.pdf",
        "pdfPage": 11,
        "bookPage": 281
    },
    "stats": {
        "initiative": 7,
        "perception": 9,
        "defense": 41,
        "fortitude": 17,
        "reflex": 8,
        "will": 16,
        "hitPoints": 275,
        "speedText": "6m (4q)",
        "senses": null,
        "defensesText": "redução de dano 5/mágico",
        "attributes": {
            "str": 3,
            "dex": 1,
            "con": 4,
            "int": 1,
            "wis": 1,
            "cha": 0
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "[Bando] Martelo de guerra +27 (2d8+12, x3)."
        }
    ],
    "abilities": [
        {
            "name": "Empurrão",
            "timing": "movimento",
            "text": "A companhia blindada de elite usa a manobra empurrar (teste +32) contra um alvo adjacente, mas não pode se mover junto com ele e sofre –5 na Defesa até o início de seu próximo turno."
        },
        {
            "name": "Prontidão",
            "timing": "reação",
            "text": "Sempre que um inimigo entra ou sai por conta própria do alcance pessoal da companhia, ela pode fazer um ataque adicional contra essa criatura. Se acertar, além de causar dano, deixa o alvo imóvel até o início de seu próximo turno."
        },
        {
            "name": "Ódio Puro",
            "timing": null,
            "text": "O purista recebe +5 em testes de Vontade quando está seguindo ordens de um superior (qualquer purista com ND maior) e +2 em rolagens de dano contra humanoides não humanos."
        }
    ],
    "equipment": "Armadura completa, escudo pesado reforçado, martelo de guerra pungente (1d6 de cada), poção de Curar Ferimentos (2d8+2) x2d6",
    "treasure": "Padrão.",
    "skillsText": null
};

export const dancarinoDeGuerra = {
    "id": "dancarino-de-guerra",
    "name": "Dançarino de Guerra",
    "type": "humanoid",
    "subtype": "humano",
    "size": "Médio",
    "challengeRating": 4,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p273 ate 285.pdf",
        "pdfPage": 9,
        "bookPage": 279
    },
    "stats": {
        "initiative": 11,
        "perception": 3,
        "defense": 24,
        "fortitude": 10,
        "reflex": 14,
        "will": 6,
        "hitPoints": 110,
        "speedText": "9m (6q)",
        "senses": null,
        "defensesText": "evasão; imunidade a medo; resistência a efeitos de movimento +2",
        "attributes": {
            "str": 4,
            "dex": 5,
            "con": 4,
            "int": 1,
            "wis": -1,
            "cha": 2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Dois machados de batalha +16 (2d8+5, 19/x3)."
        }
    ],
    "abilities": [
        {
            "name": "A Vida Não É Suficiente para Mim",
            "timing": null,
            "text": "Quando um dançarino de guerra morre em combate, cada um de seus aliados em alcance médio é tomado por um frenesi equivalente ao efeito básico da magia Velocidade, até o fim da cena."
        },
        {
            "name": "Matar É Viver",
            "timing": "movimento",
            "text": "O dançarino entra em um estado de frenesi de combate, durante o qual pode fazer um ataque adicional sempre que executa a ação agredir. O transe termina se, ao fim da rodada, ele não tiver sido atacado nem sido alvo de um efeito hostil. Recarga (realizar uma investida)."
        },
        {
            "name": "Viver É Lutar",
            "timing": "reação",
            "text": "Uma vez por rodada, quando é alvo de um ataque corpo a corpo, o dançarino pode fazer um teste de Acrobacia. Ele reduz desse ataque em um valor igual ao resultado de seu teste e, se reduzir o dano a 0, pode fazer um ataque corpo a corpo contra o atacante."
        },
        {
            "name": "Ódio Puro",
            "timing": null,
            "text": "O purista recebe +5 em testes de Vontade quando está seguindo ordens de um superior (qualquer purista com ND maior) e +2 em rolagens de dano contra humanoides não humanos."
        }
    ],
    "equipment": "Machado de batalha x2, sapatos de camurça",
    "treasure": "Padrão.",
    "skillsText": "Acrobacia +12, Atletismo +8"
};

export const dancarinoDeGuerraVeterano = {
    "id": "dancarino-de-guerra-veterano",
    "name": "Dançarino de Guerra Veterano",
    "type": "humanoid",
    "subtype": "humano",
    "size": "Médio",
    "challengeRating": 6,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p273 ate 285.pdf",
        "pdfPage": 9,
        "bookPage": 279
    },
    "stats": {
        "initiative": 13,
        "perception": 4,
        "defense": 28,
        "fortitude": 12,
        "reflex": 16,
        "will": 8,
        "hitPoints": 175,
        "speedText": "9m (6q)",
        "senses": null,
        "defensesText": "evasão; imunidade a medo; resistência a efeitos de movimento +5",
        "attributes": {
            "str": 4,
            "dex": 5,
            "con": 4,
            "int": 1,
            "wis": -1,
            "cha": 2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Dois machados de batalha +20 (3d8+15, 19/x3)."
        }
    ],
    "abilities": [
        {
            "name": "A Morte Não É Suficiente para Meus Inimigos",
            "timing": "reação",
            "text": "Uma vez por rodada, quando um dançarino de guerra veterano reduz os PV de um inimigo a 0 ou menos com um ataque corpo a corpo, pode executar um ataque adicional contra outra criatura dentro do seu alcance. O dançarino recebe +5 nesse teste de ataque e na rolagem de dano."
        },
        {
            "name": "A Vida Não É Suficiente para Mim",
            "timing": null,
            "text": "Quando um dançarino morre em combate, cada um de seus aliados em alcance médio é tomado por um frenesi equivalente ao efeito básico da magia Velocidade, até o fim da cena."
        },
        {
            "name": "Matar É Viver",
            "timing": "padrão",
            "text": "O dançarino entra em um estado de frenesi de combate, durante o qual pode fazer um ataque adicional sempre que executa a ação agredir. O transe termina se, ao fim da rodada, ele não tiver sido atacado nem sido alvo de um efeito hostil. Recarga (realizar uma investida)."
        },
        {
            "name": "Viver É Lutar",
            "timing": "reação",
            "text": "Uma vez por rodada, quando é alvo de um ataque corpo a corpo, o dançarino pode fazer um teste de Acrobacia. Ele reduz desse ataque em um valor igual ao resultado de seu teste e, se reduzir o dano a 0, pode fazer um ataque corpo a corpo contra o atacante."
        },
        {
            "name": "Ódio Puro",
            "timing": null,
            "text": "O purista recebe +5 em testes de Vontade quando está seguindo ordens de um superior (qualquer purista com ND maior) e +2 em rolagens de dano contra humanoides não humanos."
        }
    ],
    "equipment": "Machado de batalha x2, sapatos de camurça aprimorados",
    "treasure": "Padrão.",
    "skillsText": "Acrobacia +16, Atletismo +9"
};

export const purificado = {
    "id": "purificado",
    "name": "Purificado",
    "type": "humanoid",
    "subtype": "hynne",
    "size": "Pequeno",
    "challengeRating": 2,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p273 ate 285.pdf",
        "pdfPage": 10,
        "bookPage": 280
    },
    "stats": {
        "initiative": 5,
        "perception": 2,
        "defense": 10,
        "fortitude": 3,
        "reflex": 4,
        "will": 0,
        "hitPoints": 9,
        "speedText": "6m (4q)",
        "senses": null,
        "defensesText": "imunidade a efeitos mentais",
        "attributes": {
            "str": 0,
            "dex": 2,
            "con": 1,
            "int": 0,
            "wis": -1,
            "cha": 2
        }
    },
    "actions": [],
    "abilities": [
        {
            "name": "Cicatrizes Amordaçantes",
            "timing": null,
            "text": "Por mais que tente, o purificado não consegue alertar outras pessoas de sua condição. Qualquer tentativa do purificado de fazer isso requer que o interlocutor passe em um teste de Intuição (CD 25). Se falhar, ele não entende o que o purificado tentou comunicar durante a rodada."
        },
        {
            "name": "Gema da Purificação",
            "timing": null,
            "text": "Quando o purificado chega a 3m ou menos de um não humano, a gema começa a brilhar e zunir durante 3 turnos. Ao fim do terceiro turno ela explode, matando o purificado e causando 6d6 pontos de dano de essência em todas as criaturas em alcance curto. A gema pode ser desativada com uma ação completa e um teste de Ladinagem ou Misticismo (CD 20), mas uma falha a detona imediatamente. Caso outra gema esteja no alcance da explosão, ela também se ativa e explode no próximo turno do seu purificado."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": "Diplomacia +7, Enganação +7"
};

export const soldadoBlindado = {
    "id": "soldado-blindado",
    "name": "Soldado Blindado",
    "type": "humanoid",
    "subtype": "humano",
    "size": "Médio",
    "challengeRating": 5,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p273 ate 285.pdf",
        "pdfPage": 10,
        "bookPage": 280
    },
    "stats": {
        "initiative": 5,
        "perception": 7,
        "defense": 32,
        "fortitude": 15,
        "reflex": 6,
        "will": 14,
        "hitPoints": 135,
        "speedText": "6m (4q)",
        "senses": null,
        "defensesText": "redução de dano 5/mágico",
        "attributes": {
            "str": 3,
            "dex": 1,
            "con": 4,
            "int": 1,
            "wis": 1,
            "cha": 0
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Martelo de guerra +16 (2d8+12, x3)."
        }
    ],
    "abilities": [
        {
            "name": "Empurrão",
            "timing": "movimento",
            "text": "O soldado blindado faz uma manobra empurrar (teste +16) contra um alvo adjacente, mas não pode se mover junto com o alvo e sofre –5 na Defesa até o início de seu próximo turno."
        },
        {
            "name": "Prontidão",
            "timing": "reação",
            "text": "Sempre que um inimigo entra ou sai por conta própria do alcance pessoal do soldado, o soldado pode fazer um ataque adicional contra essa criatura. Se acertar, além de causar dano, deixa o alvo imóvel até o início de seu próximo turno."
        },
        {
            "name": "Ódio Puro",
            "timing": null,
            "text": "O purista recebe +5 em testes de Vontade quando está seguindo ordens de um superior (qualquer purista com ND maior) e +2 em rolagens de dano contra humanoides não humanos."
        }
    ],
    "equipment": "Armadura completa, escudo pesado reforçado, martelo de guerra pungente, poção de Curar Ferimentos (2d8+2) x2",
    "treasure": "Padrão.",
    "skillsText": null
};

export const soldadoSuperior = {
    "id": "soldado-superior",
    "name": "Soldado Superior",
    "type": "humanoid",
    "subtype": "humano",
    "size": "Médio",
    "challengeRating": 17,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p273 ate 285.pdf",
        "pdfPage": 13,
        "bookPage": 283
    },
    "stats": {
        "initiative": 26,
        "perception": 18,
        "defense": 50,
        "fortitude": 28,
        "reflex": 28,
        "will": 20,
        "hitPoints": 1080,
        "speedText": "12m (8q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a doenças, efeitos mentais, medo e veneno; redução de corte, impacto e perfuração 15",
        "attributes": {
            "str": 7,
            "dex": 7,
            "con": 7,
            "int": 3,
            "wis": 2,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Ataque desarmado x4 +47 (2d12+30, 17/x3)."
        }
    ],
    "abilities": [
        {
            "name": "Golpes Penetrantes",
            "timing": null,
            "text": "Os ataques desarmados do soldado superior podem causar dano letal ou não letal e ignoram 10 pontos de redução de dano do alvo."
        },
        {
            "name": "Mestre de Manobras",
            "timing": null,
            "text": "O soldado recebe +10 em testes de manobras. Além disso, uma vez por rodada, quando acerta um ataque desarmado, o soldado pode fazer uma manobra de combate (teste +57) contra a criatura atingida como uma ação livre."
        },
        {
            "name": "Super Soldado",
            "timing": null,
            "text": "Quando o soldado é reduzido a 570 PV ou menos, entra em um frenesi de combate. Seus ataques mudam para ataque desarmado x4 +57 (3d12+30, 17/x3), sua Defesa se torna 60, seu deslocamento aumenta para 18m e ele passa a poder executar uma ação padrão adicional por turno. Entretanto, ele se torna vulnerável a todos os tipos de dano e sofre –5 em Vontade."
        },
        {
            "name": "Soro Supremo",
            "timing": null,
            "text": "Um personagem de posse do corpo de um soldado superior pode tentar extrair uma fração do soro que concede a ele seu poder. Isso é um teste estendido de Ofício (alquimista) com CD 40 em que o personagem precisa obter 5 sucessos antes de 3 falhas. Cada teste representa um dia de trabalho. Se passar, o personagem obtém uma dose de soro supremo. Se falhar, arruína a amostra e não pode mais tentar com este corpo. Ingerir uma dose do soro supremo aumenta permanentemente Força, Destreza ou Constituição (escolhido na fabricação do soro) em +1. Um personagem só pode se beneficiar de uma dose de soro supremo. O soro supremo é um composto extremamente volátil, preparado para um indivíduo específico, e não é encontrado à venda."
        },
        {
            "name": "Ódio Puro",
            "timing": null,
            "text": "O purista recebe +5 em testes de Vontade quando está seguindo ordens de um superior (qualquer purista com ND maior) e +2 em rolagens de dano contra humanoides não humanos."
        }
    ],
    "equipment": "Cinto do campeão, faixas do pugilista, manoplas de adamante",
    "treasure": "Padrão, mais ingredientes para uma dose de soro supremo.",
    "skillsText": "Acrobacia +26, Atletismo +26"
};

export const liderMercenarioDeAslothia = {
    "id": "lider-mercenario-de-aslothia",
    "name": "Líder Mercenário de Aslothia",
    "type": "humanoid",
    "subtype": "humano",
    "size": "Médio",
    "challengeRating": 5,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p 286 ate 297.pdf",
        "pdfPage": 5,
        "bookPage": 288
    },
    "stats": {
        "initiative": 5,
        "perception": 3,
        "defense": 24,
        "fortitude": 17,
        "reflex": 5,
        "will": 11,
        "hitPoints": 200,
        "speedText": "6m (4q)",
        "senses": null,
        "defensesText": "imunidade a medo; resistência a magia +5",
        "attributes": {
            "str": 4,
            "dex": 1,
            "con": 3,
            "int": 0,
            "wis": 1,
            "cha": 1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Alabarda +17 (1d10+26, x3) ou espada curta x2 +17 (1d6+16, 19)."
        }
    ],
    "abilities": [
        {
            "name": "Capangas Descartáveis",
            "timing": "reação",
            "text": "Uma vez por rodada, o líder mercenário pode fazer com que um aliado adjacente sofra dano de um ataque ou habilidade em vez dele próprio. Se a criatura morrer com esse dano, o líder pode fazer um ataque corpo a corpo contra o agressor. O alvo desse ataque é considerado desprevenido."
        },
        {
            "name": "Inescrupuloso",
            "timing": null,
            "text": "O mercenário recebe +2 em testes de ataque e +1d6 em rolagens de dano contra criaturas flanqueadas, sob efeito de alguma condição ou que sigam algum código de conduta (como Código de Honra ou Código do Herói)."
        }
    ],
    "equipment": "Alabarda cruel, brunea, escudo leve, espada curta",
    "treasure": "Padrão.",
    "skillsText": "Atletismo +8, Intimidação +7"
};

export const humanoidCreatures = [
    // Manuais, Livro Básico e Ameaças de Arton
    orcCombatant, orcEnfraquecido, orcChief, ogre,
    gnollMarauder, gnollFilibuster, orcMutante, bandido,
    chefeBandido, guardaDeCidade, sargentoDaGuarda, centauroCombatente,
    centauroXama, trog, recrutaPurista, soldadoPurista,
    sargentoMor, capelaoDeGuerra, capitaoBaluarte, cavaleiroDeLeopardoSangrento,
    necromante, goblinSalteador, hobgoblinSoldado, goblinEngenhoqueiro,
    arautoDeThwor, hobgoblinMagoDeBatalha, devoradorDeMedos, sombraDeThwor,
    nagahGuardiao, nagahMistica, cultistaDeSSzzaas, finntrollCacador,
    finntrollFeitor, tiranoDoTerceiro, maniacoLefou, sacerdoteDeAharadak,
    enxameKobold, arqueiroEscravo, centuriao, centuriaoDeElite,
    decuria, gladiadorTaurico, governadorCorrupto, legionario,
    legionarioInsano, minauroArcanista, minauroLadino, nezumiCapanga,
    nezumiNinja, acolitoDeKally, cavaleiroDeKally, clerigoDeKally,
    dracomante, dracomanteSuperior, bispoDeGuerra, coletorDeArsenal,
    concilioForjador, forjadorLiturgico, gnollCacadorDeCabecas, gnollCapanga,
    gnollLiderDeAlcateia, gnollVuulRak, gnollXamaDeAllihanna, gnollXamaDeMarah,
    gnollXamaDeMegalokk, matronaGnoll, bruxaGoblin, bugbearGuardaCostas,
    bugbearSentinela, gangueGoblin, goblinBomba, goblinDeFerro,
    goblinDeFerroMarkII, hobgoblinAtirador, hobgoblinComandanteTatico, hobgoblinGladiador,
    hordaGoblin, sangueDoAyrrak, iniciadoDaAgonia, sacerdoteDaAgonia,
    altoSacerdoteDeHyninn, bandidoLigeiro, bandidoSelvagem, capanga,
    capangaMinotauro, chefeDeGangue, chefeDeQuadrilha, devotoDeHyninnManhoso,
    devotoDeHyninnSimao, devotoDeHyninnVelhaco, duplo, gatuno,
    gatunoMestre, jagunco, sacerdoteDeHyninn, meioOrcBandoleiro,
    meioOrcCapanga, meioOrcChefe, ogroCacador, ogroCapanga,
    orcMutanteSuperior, orcRei, orcVeterano, orcXama,
    tabrachiCampeao, tabrachiSoldado, bruxoDaTormenta, centauroChefe,
    xamaDeMegalokk, nezumiBrutamontes, slark, armeiroDeTenebraClerigo,
    armeiroDeTenebraDevoto, bandoPirata, capitaoDaFrotaAurea, capitaoDoConclavePirata,
    ceratopsChefeDaTribo, ceratopsGuerreiro, chapeuPreto, goblinDeSombreiro,
    homemPiranha, homemPiranhaImediato, liderGoblinDeSombreiro, liderPistoleiro,
    loboDoMar, pirata, pistoleiro, pterosCeifador,
    pterosDoCeuInfinito, sahuaginMetamorfo, sahuaginPredador, velocisCacador,
    xamaDeSarana, voracisCacadora, voracisRainha, arcanoDeGuerraAdepto,
    arcanoDeGuerraVeterano, cacadorDeImpuros, companhiaBlindadaDeElite, dancarinoDeGuerra,
    dancarinoDeGuerraVeterano, purificado, soldadoBlindado, soldadoSuperior,
    liderMercenarioDeAslothia
];
