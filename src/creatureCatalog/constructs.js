export const gargoyle = {
    "id": "gargula",
    "name": "Gárgula",
    "type": "construct",
    "subtype": null,
    "size": "Médio",
    "challengeRating": 2,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p126 ate 145.pdf",
        "pdfPage": 2,
        "bookPage": 125
    },
    "stats": {
        "initiative": 3,
        "perception": 3,
        "defense": 19,
        "fortitude": 13,
        "reflex": 7,
        "will": 2,
        "hitPoints": 65,
        "speedText": "12m (8q), voo 18m (12q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a petrificado; redução de dano 5",
        "attributes": {
            "str": 6,
            "dex": 2,
            "con": 4,
            "int": -2,
            "wis": 1,
            "cha": -2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Duas garras +12 (1d6+6)."
        }
    ],
    "abilities": [
        {
            "name": "Imobilidade",
            "timing": null,
            "text": "Uma gárgula pode permanecer completamente imóvel. Se ela estiver assim, um personagem deve passar num teste de Percepção (CD 35) para perceber que ela é uma criatura e não uma estátua."
        }
    ],
    "equipment": null,
    "treasure": "Padrão.",
    "skillsText": null
};

export const golemDeHierro = {
    "id": "golem-de-ferro",
    "name": "Golem de Ferro",
    "type": "construct",
    "subtype": null,
    "size": "Grande",
    "challengeRating": 10,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p126 ate 145.pdf",
        "pdfPage": 7,
        "bookPage": 130
    },
    "stats": {
        "initiative": 4,
        "perception": 9,
        "defense": 36,
        "fortitude": 24,
        "reflex": 14,
        "will": 11,
        "hitPoints": 400,
        "speedText": "9m (6q)",
        "senses": "visão no escuro",
        "defensesText": "redução de dano 10",
        "attributes": {
            "str": 12,
            "dex": -1,
            "con": 10,
            "int": null,
            "wis": 0,
            "cha": -5
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Duas pancadas +30 (2d10+25)."
        }
    ],
    "abilities": [
        {
            "name": "Imunidade a Magia",
            "timing": null,
            "text": "O golem de ferro é imune a efeitos mágicos, com as seguintes exceções. Efeitos mágicos de eletricidade deixam o golem de ferro lento por 1d6 rodadas. Efeitos mágicos de fogo removem a condição lento e curam 1 PV para cada 3 pontos de dano que causariam."
        },
        {
            "name": "Sopro",
            "timing": "movimento",
            "text": "O golem expele uma nuvem de gás venenoso que preenche um cubo de 3m. Criaturas dentro da área perdem 6d12 pontos de vida e ficam enjoadas (Fort CD 30 reduz à metade e evita a condição). Recarga (movimento). Veneno."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": null
};

export const colossoSupremo = {
    id: "colosso-supremo",
    name: "Colosso Supremo",
    type: "construct",
    subtype: null,
    size: "Colossal",
    challengeRating: 14,
    description: [
        "Grandes como moinhos de vento, feitos de pedra e metal, estes engenhos infernais são forjados com técnicas que combinam magia e tecnologia goblin. Plataformas em seus ombros abrigam soldados operando balistas, bem como oficiais que supervisionam e comandam as tropas no solo. Em seu interior, escravos goblins são responsáveis pela operação e reparos em tempo real. Além de sua espada titânica e canhões que disparam jatos de chamas, o colosso possui chaminés que expelem uma fumaça escura e venenosa; os tripulantes humanos usam máscaras protetoras, enquanto os goblins são resistentes ao veneno (e também fáceis de substituir)."
    ],
    source: {
        "book": "Livro Básico",
        "pdfPage": 11,
        "bookPage": null
    },
    stats: {
        "initiative": 8,
        "perception": 9,
        "defense": 46,
        "fortitude": 31,
        "reflex": 19,
        "will": 20,
        "hitPoints": 675,
        "speedText": "12m (8q)",
        "senses": "visão no escuro",
        "defensesText": "cura acelerada 20, redução de dano 10, resistência a magia +5",
        "attributes": {
            "str": 15,
            "dex": -1,
            "con": 10,
            "int": null,
            "wis": -5,
            "cha": -5
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Espada titânica +39 (4d12+30, 19)."
        }
    ],
    abilities: [
        {
            "name": "Balistas",
            "timing": "livre",
            "text": "O colosso possui duas balistas, uma em cada ombro. Cada balista é tripulada por soldados que a carregam e a disparam em rodadas alternadas (bônus de ataque +39, 6d8 pontos de dano de perfuração, crítico 19, alcance médio). É possível atacar as tripulações para impedir os disparos. Cada tripulação possui Defesa 26, 50 PV e usa os testes de resistência do colosso."
        },
        {
            "name": "Fumos Tóxicos",
            "timing": null,
            "text": "Uma criatura que comece seu turno em alcance curto do colosso perde 4d6 PV e fica enjoada (Fortitude CD 38 evita). Veneno."
        },
        {
            "name": "Goblins Consertadores",
            "timing": null,
            "text": "Goblins especialmente pequenos rastejam por dentro dos dutos do colosso fazendo reparos, sendo a fonte da cura acelerada do construto. Por estarem dentro do colosso, os goblins são imunes a dano, mas ainda podem ser afetados por efeitos mentais. Eles possuem Vontade +3 (mas recebem a resistência a magia do colosso) e, se forem afetados por qualquer condição, a cura acelerada deixa de funcionar."
        },
        {
            "name": "Jato de Chamas",
            "timing": "movimento",
            "text": "O colosso dispara um jato de chamas que atinge um cone de 12m. Criaturas na área sofrem 8d8+10 pontos de dano de fogo (Ref CD 38 reduz à metade)."
        },
        {
            "name": "Passar por Cima",
            "timing": "completa",
            "text": "O colosso percorre até o dobro do seu deslocamento, passando por qualquer criatura Grande ou menor. Uma criatura atropelada sofre 6d8+15 pontos de dano de impacto (Reflexos CD 38 reduz à metade)."
        },
        {
            "name": "Varrer",
            "timing": "livre",
            "text": "Uma vez por rodada, quando o colosso supremo faz um ataque corpo a corpo e reduz os pontos de vida do alvo para 0 ou menos, pode realizar um ataque adicional contra outra criatura dentro do seu alcance."
        }
    ],
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
    description: [
        "Elevando a capacidade mecânica e inventiva dos goblins a novos patamares, o engenho de guerra goblin é uma geringonça de terror e imprevisibilidade. Polias, roldanas, engrenagens, fumaça e uma pitada de magia se misturam sob as mãos questionavelmente hábeis de engenhoqueiros goblins para produzir uma máquina de guerra capaz de mudar os rumos de uma batalha. Ou explodir tentando... Um engenho de guerra parece uma enorme carroça de madeira e ferro sem cavalos, com três pares de grandes rodas. Uma cúpula de metal na parte superior do veículo abriga o artilheiro que opera sua arma principal, um poderoso canhão de raios. Outras armas menores se projetam de suas laterais, operadas freneticamente pela tripulação goblin, que se reveza entre pilotar o aparelho e efetuar reparos. Um engenho de guerra pode ser um trunfo no campo de batalha ou apenas uma grande fonte de barulho e fumaça."
    ],
    source: {
        "book": "Livro Básico",
        "pdfPage": 16,
        "bookPage": null
    },
    stats: {
        "initiative": 3,
        "perception": 5,
        "defense": 25,
        "fortitude": 18,
        "reflex": 6,
        "will": 12,
        "hitPoints": 246,
        "speedText": "12m (8q)",
        "senses": "visão no escuro",
        "defensesText": "redução de dano 10",
        "attributes": {
            "str": 10,
            "dex": 0,
            "con": 7,
            "int": null,
            "wis": 0,
            "cha": -5
        }
    },
    actions: [],
    abilities: [
        {
            "name": "Arsenal de Engenhocas",
            "timing": "padrão",
            "text": "O engenho de guerra possui várias engenhocas operadas por sua frenética tripulação. Sempre que esta habilidade é usada, role 1d6 quatro vezes. O resultado de cada dado indica qual engenhoca é ativada. Resultados repetidos são desperdiçados — isso significa que mais de um goblin tentou usar uma mesma engenhoca, perdendo sua ação. 1) Canhão elétrico. O engenho dispara um raio em uma linha com alcance médio. Criaturas na área sofrem 8d8 pontos de dano de eletricidade (Reflexos CD 22 reduz à metade). 2) Balestra ácida. O engenho dispara um virote de ácido em uma criatura em alcance médio. O alvo sofre 8d6 pontos de dano de ácido, mais 4d6 pontos de dano de ácido no início de seu próximo turno (Reflexos CD 22 reduz à metade e evita o dano subsequente). 3) Foles. O engenho dispara labaredas em um cone de alcance curto. Criaturas na área sofrem 6d6 pontos de dano de fogo e ficam em chamas (Reflexos CD 23 reduz à metade e evita as chamas). 4) Lâmina giratória. O engenho faz um ataque corpo a corpo em cada criatura adjacente (ataque +20, dano 4d6+10 corte, 19, corte). 5) Poça de óleo. O engenho vaza óleo escorregadio e inflamável. Todas as criaturas em alcance curto ficam vulneráveis a fogo até se limparem (o que exige uma ação completa) e caem no chão. Um teste de Reflexos contra CD 22 evita ambos os efeitos. 6) Reparos emergenciais. O engenho recupera 20 PV."
        },
        {
            "name": "Tripulação",
            "timing": null,
            "text": "Se o engenho de guerra for destruído, 1d6 goblins salteadores escapam de seus escombros e surgem no início da rodada seguinte."
        }
    ],
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
    "id": "gargula-assassina",
    "name": "Gárgula Assassina",
    "type": "construct",
    "subtype": null,
    "size": "Médio",
    "challengeRating": 4,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p126 ate 145.pdf",
        "pdfPage": 2,
        "bookPage": 125
    },
    "stats": {
        "initiative": 6,
        "perception": 5,
        "defense": 25,
        "fortitude": 16,
        "reflex": 10,
        "will": 4,
        "hitPoints": 140,
        "speedText": "12m (8q), voo 18m (12q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a petrificado; redução de dano 5",
        "attributes": {
            "str": 6,
            "dex": 2,
            "con": 4,
            "int": -2,
            "wis": 1,
            "cha": -2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Duas garras +17 (2d6+10)."
        }
    ],
    "abilities": [
        {
            "name": "Ataque Furtivo",
            "timing": null,
            "text": "+2d6."
        },
        {
            "name": "Imobilidade",
            "timing": null,
            "text": "Uma gárgula pode permanecer completamente imóvel. Se ela estiver assim, um personagem deve passar num teste de Percepção (CD 35) para perceber que ela é uma criatura e não uma estátua."
        }
    ],
    "equipment": null,
    "treasure": "Padrão.",
    "skillsText": null
};

export const golemDeCarne = {
    "id": "golem-de-carne",
    "name": "Golem de Carne",
    "type": "construct",
    "subtype": null,
    "size": "Grande",
    "challengeRating": 7,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p126 ate 145.pdf",
        "pdfPage": 4,
        "bookPage": 127
    },
    "stats": {
        "initiative": 6,
        "perception": 7,
        "defense": 31,
        "fortitude": 18,
        "reflex": 6,
        "will": 14,
        "hitPoints": 300,
        "speedText": "9m (6q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a metamorfose e trevas; redução de dano 5",
        "attributes": {
            "str": 5,
            "dex": -1,
            "con": 4,
            "int": null,
            "wis": 0,
            "cha": -5
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Duas pancadas +25 (2d10+18)."
        }
    ],
    "abilities": [
        {
            "name": "Fúria Homicida",
            "timing": null,
            "text": "Se estiver com a metade de seus PV, o golem de carne entra em um estado de fúria homicida. Ele recebe +4 em testes de ataque e rolagens de dano e, quando causa dano, deixa a vítima sangrando. Entretanto, sempre deve atacar a criatura mais próxima."
        },
        {
            "name": "Imunidade a Magia",
            "timing": null,
            "text": "O golem é imune a efeitos mágicos, com as seguintes exceções. Magias de fogo e frio deixam o golem lento por 1d6 rodadas. Efeitos mágicos de eletricidade removem a condição lento e curam PV em quantidade igual à metade do dano que causariam."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": null
};

export const soldadoMecanico = {
    "id": "soldado-mecanico",
    "name": "Soldado Mecânico",
    "type": "construct",
    "subtype": null,
    "size": "Médio",
    "challengeRating": 3,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p126 ate 145.pdf",
        "pdfPage": 10,
        "bookPage": 133
    },
    "stats": {
        "initiative": 2,
        "perception": 5,
        "defense": 20,
        "fortitude": 14,
        "reflex": 9,
        "will": 4,
        "hitPoints": 23,
        "speedText": "6m (4q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a fogo",
        "attributes": {
            "str": 4,
            "dex": -1,
            "con": 3,
            "int": null,
            "wis": 0,
            "cha": -5
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Lança x2 +16 (1d8+8)."
        },
        {
            "name": "À Distância",
            "text": "Besta pesada +11 (1d12+10, 19)."
        }
    ],
    "abilities": [
        {
            "name": "Sopro",
            "timing": "padrão",
            "text": "O soldado sopra uma nuvem de vapor escaldante em um cone de 6m. Criaturas na área sofrem 4d6 pontos de dano de fogo (Ref CD 17 reduz à metade). Recarga (movimento)."
        },
        {
            "name": "Movido a Vapor",
            "timing": null,
            "text": "Se o soldado fosse sofrer dano de fogo, em vez disso seu deslocamento aumenta em 3m por 1 rodada. Se ele sofrer dano de frio, fica lento por 1 rodada."
        }
    ],
    "equipment": "Besta pesada, lança, virotes x20",
    "treasure": "Pilha de sucata (vale T$ 100 para fabricar engenhocas).",
    "skillsText": null
};

export const espadaDaFloresta = {
    "id": "espada-da-floresta",
    "name": "Espada-da-Floresta",
    "type": "construct",
    "subtype": null,
    "size": "Médio",
    "challengeRating": 3,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p230 ate 253.pdf",
        "pdfPage": 19,
        "bookPage": 246
    },
    "stats": {
        "initiative": 8,
        "perception": 7,
        "defense": 22,
        "fortitude": 8,
        "reflex": 11,
        "will": 8,
        "hitPoints": 108,
        "speedText": "9m (6q)",
        "senses": "visão no escuro",
        "defensesText": "natureza vegetal; vulnerabilidade a fogo",
        "attributes": {
            "str": 6,
            "dex": 3,
            "con": 4,
            "int": -2,
            "wis": 2,
            "cha": 0
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Espada espinhenta +14 (1d12+15 corte, 19)."
        }
    ],
    "abilities": [
        {
            "name": "Adaptado ao Ambiente",
            "timing": null,
            "text": "Quando em florestas, o espada-da-floresta recebe camuflagem leve contra ataques à distância e ignora terreno difícil natural."
        },
        {
            "name": "Dínamo Vegetal",
            "timing": null,
            "text": "Quando sofre dano de eletricidade, em vez disso o espada-da-floresta cura PV em quantidade igual a metade do dano que seria causado."
        },
        {
            "name": "Riposte Natural",
            "timing": "reação",
            "text": "Uma vez por rodada, quando é alvo de um ataque corpo a corpo, o espada-da-floresta pode fazer um teste de ataque e subtrair seu resultado do dano causado pelo ataque."
        }
    ],
    "equipment": null,
    "treasure": "Espada espinhenta (CD 18 para extrair) e 50% de chance de 1d4 frutos da espada-mãe (CD 18 para extrair).",
    "skillsText": "Furtividade +4 (+9 em florestas)"
};

export const galhadaMacho = {
    "id": "galhada-macho",
    "name": "Galhada Macho",
    "type": "construct",
    "subtype": null,
    "size": "Grande",
    "challengeRating": 2,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p230 ate 253.pdf",
        "pdfPage": 19,
        "bookPage": 246
    },
    "stats": {
        "initiative": 4,
        "perception": 7,
        "defense": 19,
        "fortitude": 4,
        "reflex": 11,
        "will": 7,
        "hitPoints": 17,
        "speedText": "12m (8q)",
        "senses": "visão no escuro",
        "defensesText": "natureza vegetal; redução de dano 2; resistência a magia +2; vulnerabilidade a fogo",
        "attributes": {
            "str": 2,
            "dex": 3,
            "con": 1,
            "int": -4,
            "wis": 1,
            "cha": 0
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Chifres +12 (1d6+7) e cascos +12 (1d6+7)."
        }
    ],
    "abilities": [
        {
            "name": "Galhada de Allihanna",
            "timing": null,
            "text": "Os chifres do galhada macho são abençoados por Allihanna; eles são armas mágicas que causam o dobro de dano contra mortos-vivos."
        }
    ],
    "equipment": null,
    "treasure": "Galhada abençoada (CD 17 para extrair, vale T$ 50 para fabricar um dedo de ente ou uma arma de perfuração superior).",
    "skillsText": null
};

export const galhadaFemea = {
    "id": "galhada-femea",
    "name": "Galhada Fêmea",
    "type": "construct",
    "subtype": null,
    "size": "Grande",
    "challengeRating": 2,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p230 ate 253.pdf",
        "pdfPage": 19,
        "bookPage": 246
    },
    "stats": {
        "initiative": 4,
        "perception": 7,
        "defense": 19,
        "fortitude": 4,
        "reflex": 11,
        "will": 7,
        "hitPoints": 17,
        "speedText": "12m (8q)",
        "senses": "visão no escuro",
        "defensesText": "natureza vegetal; redução de dano 2; resistência a magia +2; vulnerabilidade a fogo",
        "attributes": {
            "str": 2,
            "dex": 3,
            "con": 1,
            "int": -4,
            "wis": 1,
            "cha": 0
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Cascos +14 (2d6+10)."
        }
    ],
    "abilities": [],
    "equipment": null,
    "treasure": "1d4 doses de seiva-galhada (CD 17 para extrair, cada dose conta como um bálsamo restaurador). Como alternativa, se a galhada tiver uma atitude indiferente ou melhor, um personagem pode usar uma ação completa para fazer um teste de Adestramento (CD 16) com ela. Se passar, consegue extrair a seiva de forma amistosa. A galhada produz seiva apenas uma vez por dia.",
    "skillsText": null
};

export const esmagadorColetivo = {
    id: "esmagador-coletivo",
    name: "Esmagador Coletivo",
    type: "construct",
    subtype: null,
    size: "Enorme",
    challengeRating: 15,
    description: [
        "Um gigante brutal feito de matéria vermelha e humanoides vivos fundidos em uma única forma. Golpeia, agarra e pode absorver vítimas para incorporar novos corpos à sua massa."
    ],
    source: {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p20 ate 31.pdf",
        "pdfPage": 5,
        "bookPage": 22
    },
    stats: {
        "initiative": 12,
        "perception": 13,
        "defense": 46,
        "fortitude": 28,
        "reflex": 22,
        "will": 14,
        "hitPoints": 800,
        "speedText": "9m (6q)",
        "senses": "visão no escuro",
        "defensesText": "não pode ser flanqueado; imunidade a acertos críticos, efeitos de metabolismo, metamorfose e paralisia; redução de dano 15",
        "attributes": {
            "str": 14,
            "dex": -1,
            "con": 15,
            "int": null,
            "wis": 0,
            "cha": null
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Três pancadas +39 (4d10+28)."
        }
    ],
    abilities: [
        {
            "name": "Absorver",
            "timing": "completa",
            "text": "O esmagador coletivo absorve uma criatura Média ou menor que ele esteja agarrando há 3 rodadas consecutivas. A criatura morre instantaneamente e, para cada nível que ela tinha, o esmagador recebe 20 PV temporários."
        },
        {
            "name": "Agarrar Aprimorado",
            "timing": "livre",
            "text": "Pancada (teste +44)."
        },
        {
            "name": "Arranhar",
            "timing": "livre",
            "text": "No início de seus turnos, o esmagador causa 4d10+28 pontos de dano de corte em qualquer criatura que esteja agarrando."
        },
        {
            "name": "Arremessar Corpos",
            "timing": "padrão",
            "text": "O esmagador arremessa 1d4+2 corpos humanoides, distribuídos entre criaturas em alcance longo. Cada corpo causa 4d8+15 pontos de dano de impacto (Ref CD 40 evita)."
        },
        {
            "name": "Forma Horrenda",
            "timing": null,
            "text": "Uma criatura que inicie seu turno em alcance médio do esmagador fica apavorada por 1d4 rodadas e depois abalada (Von CD 40 muda para abalada por 1d4 rodadas e a criatura não pode ser afetada por esta habilidade até o fim da cena)."
        },
        {
            "name": "Pancada Estonteante",
            "timing": null,
            "text": "Uma criatura atingida pela pancada do esmagador fica atordoada por 1 rodada (Fort CD 40 evita). Uma criatura só pode ser atordoada por essa habilidade uma vez por cena."
        }
    ],
    equipment: null,
    treasure: "Nenhum.",
    skillsText: null
};

export const golemDeBarro = {
    "id": "golem-de-barro",
    "name": "Golem de Barro",
    "type": "construct",
    "subtype": null,
    "size": "Grande",
    "challengeRating": 10,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p126 ate 145.pdf",
        "pdfPage": 3,
        "bookPage": 126
    },
    "stats": {
        "initiative": 9,
        "perception": 9,
        "defense": 36,
        "fortitude": 22,
        "reflex": 10,
        "will": 16,
        "hitPoints": 400,
        "speedText": "9m (6q)",
        "senses": "visão no escuro",
        "defensesText": "redução de dano 20/fogo",
        "attributes": {
            "str": 4,
            "dex": 0,
            "con": 6,
            "int": null,
            "wis": 0,
            "cha": -5
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Duas pancadas +29 (2d10+25)."
        },
        {
            "name": "À Distância",
            "text": "Tiro de lama x4 +26 (2d6+11 impacto, alcance médio)."
        }
    ],
    "abilities": [
        {
            "name": "Corpo Barroso",
            "timing": null,
            "text": "Em seu estado natural, o corpo do golem é maleável e feito de uma lama gosmenta. Nesse estado, ele pode passar por espaços apertados sem necessidade de testes de Acrobacia."
        },
        {
            "name": "Imunidade a Magia",
            "timing": null,
            "text": "O golem de barro é imune a efeitos mágicos, com a seguinte exceção. A magia Controlar Terra usada com o efeito de solidificar desativa os benefícios da habilidade Corpo Barroso; se usada com o efeito de amolecer, recupera esses benefícios. O golem pode fazer um teste de Fortitude para resistir a qualquer um desses efeitos."
        },
        {
            "name": "Lama",
            "timing": null,
            "text": "Uma criatura atingida por um ataque do golem sofre uma penalidade cumulativa de –1 em todas as perícias. Remover a lama (e a penalidade) exige uma ação completa."
        },
        {
            "name": "Ressecamento",
            "timing": null,
            "text": "Caso sofra 100 pontos de dano de fogo, o corpo do golem resseca e endurece. Quando isso acontece, ele perde seus ataques à distância, sua redução de dano e as habilidades Corpo Barroso e Lama. Entretanto, o dano de suas pancadas se torna 2d10+30, x4. O golem volta ao seu estado natural se passar uma semana imerso em água."
        }
    ],
    "equipment": null,
    "treasure": "1d4 doses de corrosivo mineral (CD 25 para extrair).",
    "skillsText": "Furtividade +19 (+4 quando ressecado)"
};

export const golemDeBronze = {
    "id": "golem-de-bronze",
    "name": "Golem de Bronze",
    "type": "construct",
    "subtype": null,
    "size": "Grande",
    "challengeRating": 9,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p126 ate 145.pdf",
        "pdfPage": 4,
        "bookPage": 127
    },
    "stats": {
        "initiative": 4,
        "perception": 10,
        "defense": 34,
        "fortitude": 21,
        "reflex": 10,
        "will": 15,
        "hitPoints": 350,
        "speedText": "9m (6q)",
        "senses": "visão no escuro",
        "defensesText": "redução de dano 10",
        "attributes": {
            "str": 7,
            "dex": 0,
            "con": 5,
            "int": null,
            "wis": 0,
            "cha": -5
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Duas pancadas +27 (2d10+23)."
        }
    ],
    "abilities": [
        {
            "name": "Imunidade a Magia",
            "timing": null,
            "text": "O golem de bronze é imune a efeitos mágicos, com as seguintes exceções. Efeitos mágicos de eletricidade o deixam lento por 1d6 rodadas. Efeitos mágicos de fogo removem a condição lento e curam PV em quantidade igual à metade do dano que causariam."
        },
        {
            "name": "Soar os Sinos",
            "timing": "padrão",
            "text": "O golem bate em seu peito e emite um som alto e retumbante. Todas as criaturas em alcance curto perdem 6d6+10 pontos de vida, ficam surdas por 1d4 rodadas e atordoadas por 1 rodada (Fort CD 28 reduz a perda à metade e evita as condições). Uma criatura só pode ser atordoada por esta habilidade uma vez por cena. Recarga (movimento)."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": null
};

export const golemDeEspelhos = {
    "id": "golem-de-espelhos",
    "name": "Golem de Espelhos",
    "type": "construct",
    "subtype": null,
    "size": "Grande",
    "challengeRating": 9,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p126 ate 145.pdf",
        "pdfPage": 5,
        "bookPage": 128
    },
    "stats": {
        "initiative": 9,
        "perception": 9,
        "defense": 32,
        "fortitude": 21,
        "reflex": 9,
        "will": 15,
        "hitPoints": 350,
        "speedText": "9m (6q)",
        "senses": "visão no escuro",
        "defensesText": null,
        "attributes": {
            "str": 6,
            "dex": 0,
            "con": 5,
            "int": null,
            "wis": 0,
            "cha": -5
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Espada bastarda x2 +28 (2d10+24, 18)."
        }
    ],
    "abilities": [
        {
            "name": "Copiar",
            "timing": "movimento",
            "text": "O golem copia uma habilidade (exceto a habilidade Magias) ou uma magia de uma criatura em alcance curto que possa ver, até o fim da cena. Ele pode ter até 5 habilidades e/ou magias copiadas ao mesmo tempo, e pode usá-las com suas próprias características (nível, CD etc.)."
        },
        {
            "name": "Imunidade a Magia",
            "timing": null,
            "text": "O golem é imune a efeitos mágicos, com as seguintes exceções. A magia Despedaçar causa 50% a mais de dano no golem. Efeitos mágicos de escuridão deixam o golem lento enquanto ele estiver na área afetada."
        },
        {
            "name": "Refletir",
            "timing": "reação",
            "text": "Uma vez por rodada, quando é alvo de um efeito que permite um teste de resistência e passa nesse teste, o golem pode refletir todo o efeito para uma criatura a sua escolha em alcance curto (o golem não sofre nenhuma parte do efeito). A criatura escolhida se torna o novo alvo do efeito, que é resolvido normalmente, mas o golem faz qualquer escolha necessária."
        }
    ],
    "equipment": "Espada bastarda aumentada precisa",
    "treasure": "Fragmento refletor (CD 24 para extrair, reduz em 1 PM o custo para fabricar um item com o encanto refletor).",
    "skillsText": null
};

export const golemDeFerroSuperior = {
    "id": "golem-de-ferro-superior",
    "name": "Golem de Ferro Superior",
    "type": "construct",
    "subtype": null,
    "size": "Grande",
    "challengeRating": 15,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p126 ate 145.pdf",
        "pdfPage": 7,
        "bookPage": 130
    },
    "stats": {
        "initiative": 8,
        "perception": 11,
        "defense": 55,
        "fortitude": 28,
        "reflex": 22,
        "will": 15,
        "hitPoints": 760,
        "speedText": "9m (6q)",
        "senses": "visão no escuro",
        "defensesText": "redução de dano 15",
        "attributes": {
            "str": 15,
            "dex": -1,
            "con": 10,
            "int": null,
            "wis": 0,
            "cha": -5
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Duas pancadas +43 (4d10+40, x3)."
        }
    ],
    "abilities": [
        {
            "name": "Imunidade a Magia",
            "timing": null,
            "text": "O golem de ferro superior é imune a efeitos mágicos, com as seguintes exceções. Efeitos mágicos de eletricidade deixam o golem de ferro lento por 1d6 rodadas. Efeitos mágicos de fogo removem a condição lento e curam 1 PV para cada 3 pontos de dano que causariam."
        },
        {
            "name": "Sopro",
            "timing": "movimento",
            "text": "O golem expele uma nuvem de gás venenoso que preenche um cubo de 3m. Criaturas dentro da área perdem 10d12 pontos de vida e ficam enjoadas (Fort CD 40 reduz à metade e evita a condição). Recarga (movimento). Veneno."
        },
        {
            "name": "Marcha de Ferro",
            "timing": "completa",
            "text": "O golem percorre até o dobro do seu deslocamento em linha reta, passando por qualquer criatura Média ou menor. Uma criatura atropelada sofre 10d12+35 pontos de dano e fica caída (Ref CD 40 reduz à metade e evita a condição)."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": null
};

export const golemDeMateriaVermelha = {
    "id": "golem-de-materia-vermelha",
    "name": "Golem de Matéria Vermelha",
    "type": "construct",
    "subtype": "lefeu",
    "size": "Enorme",
    "challengeRating": 18,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p126 ate 145.pdf",
        "pdfPage": 8,
        "bookPage": 131
    },
    "stats": {
        "initiative": 15,
        "perception": 20,
        "defense": 50,
        "fortitude": 32,
        "reflex": 26,
        "will": 18,
        "hitPoints": 900,
        "speedText": "9m (6q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a magia; redução de dano 20",
        "attributes": {
            "str": 15,
            "dex": 0,
            "con": 13,
            "int": null,
            "wis": 0,
            "cha": -5
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Duas pancadas +50 (3d10+30, x3, mais 2d6 matéria vermelha)."
        }
    ],
    "abilities": [
        {
            "name": "Abraço Corrosivo",
            "timing": "livre",
            "text": "O golem de matéria vermelha cobre de ácido uma criatura que esteja agarrando. Enquanto estiver agarrada, e por 1 rodada após se soltar, a criatura sofre 10d10 pontos de dano de ácido no início de cada turno do golem."
        },
        {
            "name": "Agarrar Aprimorado",
            "timing": "livre",
            "text": "Pancada (teste +55)."
        },
        {
            "name": "Distorção Temporal",
            "timing": null,
            "text": "O golem realiza uma ação padrão ou de movimento adicional por turno."
        },
        {
            "name": "Insanidade da Tormenta",
            "timing": null,
            "text": "3d10 (Von CD 47 evita)."
        },
        {
            "name": "Sangue Ácido",
            "timing": null,
            "text": "Quando o golem sofre dano por um ataque corpo a corpo adjacente, o atacante sofre 4d10 pontos de dano de ácido."
        }
    ],
    "equipment": null,
    "treasure": "Retalhos rubros (CD 33 para extrair, valem T$ 8.000 para fabricar itens de matéria vermelha).",
    "skillsText": null
};

export const golemDePedra = {
    "id": "golem-de-pedra",
    "name": "Golem de Pedra",
    "type": "construct",
    "subtype": null,
    "size": "Grande",
    "challengeRating": 12,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p126 ate 145.pdf",
        "pdfPage": 9,
        "bookPage": 132
    },
    "stats": {
        "initiative": 4,
        "perception": 10,
        "defense": 43,
        "fortitude": 26,
        "reflex": 12,
        "will": 20,
        "hitPoints": 575,
        "speedText": "4,5m (3q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a atordoado; redução de dano 20",
        "attributes": {
            "str": 9,
            "dex": -2,
            "con": 6,
            "int": null,
            "wis": 0,
            "cha": -5
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Duas pancadas +36 (4d10+51)."
        }
    ],
    "abilities": [
        {
            "name": "Imobilidade",
            "timing": null,
            "text": "Um golem de pedra pode permanecer completamente imóvel. Se ele estiver assim, um personagem deve passar num teste de Percepção (CD 40) para perceber que ele é uma criatura e não uma estátua."
        },
        {
            "name": "Imunidade a Magia",
            "timing": null,
            "text": "O golem de pedra é imune a efeitos mágicos, com exceção da magia Despedaçar."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": null
};

export const instrumentoDivino = {
    "id": "instrumento-divino",
    "name": "Instrumento Divino",
    "type": "construct",
    "subtype": null,
    "size": "Médio",
    "challengeRating": 7,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p126 ate 145.pdf",
        "pdfPage": 10,
        "bookPage": 133
    },
    "stats": {
        "initiative": 8,
        "perception": 9,
        "defense": 33,
        "fortitude": 21,
        "reflex": 8,
        "will": 15,
        "hitPoints": 266,
        "speedText": "6m (4q)",
        "senses": "visão no escuro",
        "defensesText": "redução de trevas 10",
        "attributes": {
            "str": 4,
            "dex": 1,
            "con": 3,
            "int": null,
            "wis": 0,
            "cha": -5
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Espada longa +24 (2d8+26, 19, mais 4d8 luz mágica)."
        }
    ],
    "abilities": [
        {
            "name": "Aura de Arrependimento",
            "timing": "movimento",
            "text": "O instrumento divino emite uma aura que afeta todas as criaturas em um raio de 9m. Até o próximo turno do instrumento, quando uma criatura ataca ele ou seus aliados, fica atordoada após o ataque (Von CD 24 evita). Uma criatura só pode ficar atordoada por esta habilidade uma vez por cena."
        },
        {
            "name": "Fulgor Divino",
            "timing": null,
            "text": "Sempre que o instrumento divino usa a ação agredir, criaturas em alcance curto ficam ofuscadas por 1 rodada."
        },
        {
            "name": "Quebrar Superior",
            "timing": "livre",
            "text": "Quando o instrumento divino acerta um ataque, pode usar a manobra quebrar contra um objeto visível da vítima (teste +28). Ele ignora 10 pontos da RD de objetos."
        }
    ],
    "equipment": "Escudo pesado de mitral, espada longa certeira, símbolo sagrado",
    "treasure": "Metade.",
    "skillsText": "Diplomacia +10, Religião +12"
};

export const kishin = {
    "id": "kishin",
    "name": "Kishin",
    "type": "construct",
    "subtype": null,
    "size": "Enorme",
    "challengeRating": 13,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p126 ate 145.pdf",
        "pdfPage": 14,
        "bookPage": 140
    },
    "stats": {
        "initiative": 16,
        "perception": 9,
        "defense": 46,
        "fortitude": 26,
        "reflex": 13,
        "will": 20,
        "hitPoints": 617,
        "speedText": "12m (8q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a medo; redução de dano 15; resistência a magia +2",
        "attributes": {
            "str": 12,
            "dex": 6,
            "con": 10,
            "int": null,
            "wis": 3,
            "cha": -3
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Armamento adaptativo x2 +39 (veja Armamento Adaptativo)."
        }
    ],
    "abilities": [
        {
            "name": "Armamento Adaptativo",
            "timing": null,
            "text": "O kishin é uma máquina de combate com armas mágicas acopladas a seu corpo. A cada rodada, ele pode escolher Uivante, Finitude ou Método para seus ataques."
        },
        {
            "name": "Uivante",
            "timing": null,
            "text": "Montante, 2d6+66, 19, mais 2d6 frio. Quando usa a ação agredir, o kishin pode aumentar sua sobrecarga em 1 nível. Se fizer isso, as criaturas atingidas pelo Uivante neste turno ficam enredadas por 1 rodada (Ref CD 35 evita)."
        },
        {
            "name": "Finitude",
            "timing": null,
            "text": "Lança montada, 3d8+51, 18/x3. Quando faz uma investida, o kishin pode aumentar sua sobrecarga em 1 nível; se acertar o ataque, causa +4d8 pontos de dano e recupera uma quantidade de PV igual a esse dano adicional."
        },
        {
            "name": "Método",
            "timing": null,
            "text": "Martelo de guerra, 4d12+55, 19/x3. Quando derruba um inimigo, o kishin pode aumentar sua sobrecarga em 1 nível para fazer um ataque adicional contra essa criatura."
        },
        {
            "name": "Sobrecarga",
            "timing": null,
            "text": "A sobrecarga do kishin inflama e fortalece seus mecanismos. Para cada nível de sobrecarga, ele recebe +2 em testes de perícia e rolagens de dano, mas sofre 5 pontos de dano de fogo (sua RD se aplica normalmente) no início de cada um de seus turnos. A sobrecarga volta a zero ao fim da cena."
        },
        {
            "name": "Zona de Perigo",
            "timing": "movimento",
            "text": "O kishin aumenta sua sobrecarga em 1 nível."
        }
    ],
    "equipment": null,
    "treasure": "1d4 lascas adaptativas (CD 28 para extrair, cada lasca vale T$ 1.000 para fabricar armas superiores).",
    "skillsText": null
};

export const kishinauros = {
    "id": "kishinauros",
    "name": "Kishinauros",
    "type": "construct",
    "subtype": null,
    "size": "Colossal",
    "challengeRating": "S",
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p126 ate 145.pdf",
        "pdfPage": 16,
        "bookPage": 142
    },
    "stats": {
        "initiative": 25,
        "perception": 15,
        "defense": 61,
        "fortitude": 36,
        "reflex": 22,
        "will": 30,
        "hitPoints": 2450,
        "speedText": "15m (10q), voo 12m (8q)",
        "senses": "percepção às cegas (longo)",
        "defensesText": "imunidade a efeitos de movimento e medo; redução de dano 30; resistência a magia +5; maior que a morte",
        "attributes": {
            "str": 16,
            "dex": 8,
            "con": 12,
            "int": null,
            "wis": 5,
            "cha": -3
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Armamento adaptativo x3 +59."
        },
        {
            "name": "À Distância",
            "text": "Balística Avançada +59."
        }
    ],
    "abilities": [
        {
            "name": "Maior que a Morte",
            "timing": null,
            "text": "Criaturas de ND S e S+ possuem um status especial. Para estatísticas não listadas em suas fichas, são consideradas criaturas de ND 20; para habilidades de outras criaturas, seu ND é maior que 20, impedindo efeitos limitados pelo nível do alvo."
        },
        {
            "name": "Armamento Adaptativo",
            "timing": null,
            "text": "A cada rodada, o Kishinauros escolhe uma das seguintes armas mágicas para seus ataques corpo a corpo. Quando usa a ação agredir, ele pode aumentar sua sobrecarga em 1 para energizar a arma por um turno."
        },
        {
            "name": "Malho Relampejante",
            "timing": null,
            "text": "Martelo de guerra, 6d6+44, x3. Se foi energizado, criaturas atingidas ficam atordoadas por 1 rodada (Fort CD 51 evita; só podem ser atordoadas uma vez por cena)."
        },
        {
            "name": "Perfuratriz Sibilante",
            "timing": null,
            "text": "Alabarda, 4d10+42, x4. Se foi energizado, seus ataques ignoram redução de dano e imunidade a acertos críticos."
        },
        {
            "name": "Vingadora e Impérvio",
            "timing": null,
            "text": "Espada bastarda e escudo pesado, 6d8+38, 19. O Kishinauros recebe +2 na Defesa. Se foi energizado, uma vez na rodada, quando é alvo de uma magia, pode refleti-la de volta ao conjurador. As características da magia se mantêm, mas o conjurador se torna seu novo alvo e o Kishinauros faz quaisquer escolhas exigidas."
        },
        {
            "name": "Balística Avançada",
            "timing": null,
            "text": "A cada rodada, o Kishinauros escolhe uma das seguintes armas para seus ataques à distância: Balista Explosiva, Canhão Final ou Morteiro Elemental."
        },
        {
            "name": "Balista Explosiva",
            "timing": null,
            "text": "Besta pesada, 4d12+17, 19. Criaturas na área atingida pelo virote sofrem 12d6 pontos de dano de fogo (Ref CD 51 reduz à metade). Recarga (movimento)."
        },
        {
            "name": "Canhão Final",
            "timing": null,
            "text": "Mosquete, 4d12+38 essência, 19/x4. Em um resultado 1 no teste de ataque, a sobrecarga do Kishinauros aumenta em 1 e o Canhão Final explode. Criaturas em alcance curto, incluindo o Kishinauros, sofrem 16d12+60 pontos de dano, metade fogo e metade essência, e ficam em chamas (Ref CD 51 reduz à metade). Recarga (padrão)."
        },
        {
            "name": "Morteiro Elemental",
            "timing": null,
            "text": "x4 (6d6, x2, alcance longo). Cada ataque do morteiro causa dano de um tipo diferente entre ácido, eletricidade, fogo e frio. Recarga (movimento, apenas com sobrecarga 0)."
        },
        {
            "name": "Células de Resfriamento",
            "timing": "movimento",
            "text": "O Kishinauros expele calor acumulado na forma de gás venenoso. Sua sobrecarga é reduzida a 0, e criaturas em alcance curto ficam enjoadas e perdem 10 PV por ponto de sobrecarga expelido (Fort CD 51 reduz a perda à metade e evita a condição). Veneno."
        },
        {
            "name": "Disparo Automático",
            "timing": "livre",
            "text": "Uma vez por rodada, o Kishinauros faz um ataque à distância."
        },
        {
            "name": "Protocolos de Emergência",
            "timing": "reação",
            "text": "O Kishinauros aumenta sua sobrecarga em 1 e lança uma das magias a seguir, em reação a uma condição específica, como um clérigo de Arsenal de 20º nível (CD 51, limite de PM 20) sem pagar PM."
        },
        {
            "name": "Deflagração de Mana",
            "timing": null,
            "text": "Quando o Kishinauros é reduzido a 200 PV ou menos, todas as outras criaturas numa esfera de 15m ao redor dele sofrem 200 pontos de dano de essência e todos os itens mágicos (exceto artefatos) tornam-se mundanos permanentemente (Fort reduz à metade e itens recuperam sua magia após 1 dia)."
        },
        {
            "name": "Fúria do Panteão",
            "timing": null,
            "text": "Quando reduzido a 700 PV ou menos, o Kishinauros cria uma nuvem de tempestade num cubo de 90m em alcance longo até o fim da cena. Os ventos tornam ataques à distância impossíveis e a área conta como condição terrível para lançar magia. Além disso, inimigos na área têm visibilidade reduzida, como a magia Névoa. Uma vez por turno, até 6 inimigos sofrem 10d8 pontos de dano de eletricidade (Ref reduz à metade)."
        },
        {
            "name": "Soco de Arsenal",
            "timing": null,
            "text": "Quando desarmado, o Kishinauros causa 12d6+16 pontos de dano de impacto em uma criatura em alcance médio e a empurra até 3m na direção oposta (Fort reduz à metade e evita o empurrão)."
        },
        {
            "name": "Terremoto",
            "timing": null,
            "text": "Uma vez por rodada, quando o Kishinauros erra um ataque corpo a corpo, tremores rasgam o solo em alcance médio. Cada criatura na área fica atordoada (apenas uma vez por cena) e precisa rolar um dado; com resultado ímpar, uma fenda se abre, a criatura cai dentro (Ref evita) e é considerada agarrada; pode se soltar e sair gastando uma ação completa e passando em um teste de Atletismo (CD 51). No início de cada turno da criatura agarrada, ela sofre 8d8 pontos de dano de impacto."
        },
        {
            "name": "Titânico",
            "timing": null,
            "text": "O Kishinauros é imune a manobras de combate, não pode ser flanqueado e sofre metade do dano de ataques que não sejam de outra criatura Titânica. Quando se move, pisoteia qualquer criatura ou objeto Enorme ou menor em seu caminho, causando 20d6 pontos de dano de impacto (uma vez por rodada por criatura, Ref CD 51 reduz à metade). Além disso, seus ataques ignoram redução de dano e atingem todas as criaturas em um quadrado de 6m; para cada ataque, ele faz um único teste de ataque e compara o resultado com a Defesa de cada inimigo na área."
        },
        {
            "name": "Sobrecarga",
            "timing": null,
            "text": "A sobrecarga do Kishinauros fortalece seus mecanismos. Para cada ponto de sobrecarga, recebe +5 em testes de perícia e rolagens de dano, mas sofre 5 pontos de dano de fogo (sua RD se aplica) no início de cada um de seus turnos."
        },
        {
            "name": "Zona de Perigo",
            "timing": "movimento",
            "text": "O Kishinauros aumenta sua sobrecarga em 1."
        }
    ],
    "equipment": null,
    "treasure": "Núcleo místico. Alimentado por incontáveis itens mágicos, o núcleo do Kishinauros pode ser usado para encantar outras armas. O núcleo tem três cargas, cada uma pode conceder um encanto a uma arma, que não conta no limite de encantos. Cada item só pode receber um encanto desta forma, e deve cumprir seus requisitos.",
    "skillsText": null
};

export const mashinMonge = {
    "id": "mashin-monge",
    "name": "Mashin Monge",
    "type": "construct",
    "subtype": "golem",
    "size": "Médio",
    "challengeRating": 3,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p156 ate 169.pdf",
        "pdfPage": 7,
        "bookPage": 160
    },
    "stats": {
        "initiative": 7,
        "perception": 3,
        "defense": 22,
        "fortitude": 4,
        "reflex": 15,
        "will": 10,
        "hitPoints": 135,
        "speedText": "12m (8q)",
        "senses": "visão no escuro",
        "defensesText": "evasão; imunidade a frio",
        "attributes": {
            "str": 3,
            "dex": 4,
            "con": 3,
            "int": 0,
            "wis": 3,
            "cha": 0
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Ataque desarmado x3 +15 (1d6+4)."
        },
        {
            "name": "À Distância",
            "text": "Adaga +13 (1d4+4, 19)."
        }
    ],
    "abilities": [
        {
            "name": "Arma Elemental",
            "timing": "movimento",
            "text": "Até o fim da rodada, o mashin monge causa +1d6 pontos de dano de frio com seus ataques."
        },
        {
            "name": "Ataque de Chi",
            "timing": null,
            "text": "Os ataques desarmados do monge ignoram 5 pontos de redução de dano."
        }
    ],
    "equipment": "Adaga x3",
    "treasure": "Nenhum.",
    "skillsText": "Acrobacia +7, Atletismo +6, Cura +6, Religião +6"
};

export const mashinSamurai = {
    "id": "mashin-samurai",
    "name": "Mashin Samurai",
    "type": "construct",
    "subtype": "golem",
    "size": "Médio",
    "challengeRating": 5,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p156 ate 169.pdf",
        "pdfPage": 7,
        "bookPage": 160
    },
    "stats": {
        "initiative": 12,
        "perception": 3,
        "defense": 25,
        "fortitude": 17,
        "reflex": 7,
        "will": 13,
        "hitPoints": 221,
        "speedText": "6m (4q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a fogo",
        "attributes": {
            "str": 4,
            "dex": 2,
            "con": 3,
            "int": 1,
            "wis": 1,
            "cha": 0
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Katana x2 +18 (1d10+10, 19, mais 1d6 fogo)."
        }
    ],
    "abilities": [
        {
            "name": "Arma Acoplada",
            "timing": null,
            "text": "A katana do mashin samurai é acoplada ao seu braço. Ela não pode ser desarmada e ele pode sacá-la como uma ação livre."
        },
        {
            "name": "Kiai Divino",
            "timing": null,
            "text": "Quando faz um ataque, o mashin causa dano máximo, sem a necessidade de rolar dados. Recarga (padrão)."
        },
        {
            "name": "Lâmina da Alma em Chamas",
            "timing": "reação",
            "text": "Uma vez por rodada, quando faz um ataque com sua katana, o mashin pode disparar uma esfera flamejante contra uma criatura em alcance médio. O alvo sofre 6d6 pontos de dano de fogo (Ref CD 20 reduz à metade)."
        }
    ],
    "equipment": "Katana certeira, meia armadura",
    "treasure": "Metade.",
    "skillsText": "Atletismo +8, Nobreza +5, Religião +5"
};

export const brawar = {
    "id": "brawar",
    "name": "Brawar",
    "type": "construct",
    "subtype": null,
    "size": "Enorme",
    "challengeRating": 14,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p200 ate 229.pdf",
        "pdfPage": 11,
        "bookPage": 208
    },
    "stats": {
        "initiative": 6,
        "perception": 14,
        "defense": 46,
        "fortitude": 28,
        "reflex": 22,
        "will": 14,
        "hitPoints": 700,
        "speedText": "6m (4q)",
        "senses": "visão no escuro",
        "defensesText": "redução de dano 25",
        "attributes": {
            "str": 14,
            "dex": -1,
            "con": 12,
            "int": null,
            "wis": 1,
            "cha": -5
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Picareta +40 x2 (2d12+30, 19/x4)."
        }
    ],
    "abilities": [
        {
            "name": "Fale Amigo e Passe",
            "timing": null,
            "text": "Um anão pode gastar uma ação padrão para fazer um teste de Diplomacia (CD 38) contra o brawar. Se passar, deixa-o pasmo por 1 rodada; se falhar, o brawar não pode mais ser pasmo desta forma nesta cena. Se o brawar estiver pasmo desta forma, um anão pode gastar uma ação padrão para fazer um teste de Conhecimento ou Nobreza (CD 38). Se passar nesse segundo teste, o brawar para de lutar."
        },
        {
            "name": "Imunidade a Magia",
            "timing": null,
            "text": "O brawar é imune a efeitos mágicos, com a seguinte exceção. Efeitos mágicos de fogo concedem a ele uma ação padrão adicional em seu próximo turno e curam PV em quantidade igual à metade do dano que causariam."
        },
        {
            "name": "Picareta Destruidora",
            "timing": null,
            "text": "Os ataques de picareta do brawar ignoram 10 pontos da RD de objetos."
        },
        {
            "name": "Pisotear",
            "timing": "movimento",
            "text": "O brawar pisoteia o chão, gerando uma onda de choque em uma área de 9m ao seu redor. Criaturas nessa área sofrem 15d10 pontos de dano de impacto e ficam caídas (Ref CD 38 reduz o dano à metade e evita a condição)."
        }
    ],
    "equipment": "Picareta aumentada maciça de adamante",
    "treasure": "Padrão.",
    "skillsText": null
};

export const arvoreMatilha = {
    "id": "arvore-matilha",
    "name": "Árvore-Matilha",
    "type": "construct",
    "subtype": null,
    "size": "Enorme",
    "challengeRating": 13,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p230 ate 253.pdf",
        "pdfPage": 15,
        "bookPage": 242
    },
    "stats": {
        "initiative": 7,
        "perception": 15,
        "defense": 44,
        "fortitude": 26,
        "reflex": 20,
        "will": 13,
        "hitPoints": 700,
        "speedText": "12m (8q)",
        "senses": "faro, visão no escuro",
        "defensesText": "imunidade a efeitos de sentidos; natureza vegetal; redução de dano 10; resistência a magia +5; vulnerabilidade a fogo",
        "attributes": {
            "str": 9,
            "dex": 1,
            "con": 3,
            "int": null,
            "wis": 0,
            "cha": -2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Seis mordidas +37 (2d6+20)."
        }
    ],
    "abilities": [
        {
            "name": "Descarregar Raiva",
            "timing": "reação",
            "text": "Uma vez por rodada, se os PV da árvore-matilha forem reduzidos abaixo de um valor múltiplo de 100 (600, 500 etc.), ela libera sua raiva atacando tudo ao seu redor. Ela faz um ataque de mordida e compara o resultado com a Defesa de cada criatura ao seu alcance. Mesmo que erre uma criatura, ainda assim ela causa metade do dano a ela."
        },
        {
            "name": "Uivo Aterrador",
            "timing": "padrão",
            "text": "Criaturas em alcance médio ficam apavoradas (Von CD 35 reduz para abalado e a criatura não pode ser apavorada por esta habilidade nesta cena)."
        }
    ],
    "equipment": null,
    "treasure": "Padrão.",
    "skillsText": "Furtividade +6 (+16 em florestas)"
};

export const carruagemDeComando = {
    "id": "carruagem-de-comando",
    "name": "Carruagem de Comando",
    "type": "construct",
    "subtype": null,
    "size": "Enorme",
    "challengeRating": 5,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p273 ate 285.pdf",
        "pdfPage": 8,
        "bookPage": 278
    },
    "stats": {
        "initiative": 6,
        "perception": 4,
        "defense": 22,
        "fortitude": 15,
        "reflex": 11,
        "will": 7,
        "hitPoints": 190,
        "speedText": "15m (10q), sem redução por terreno difícil",
        "senses": "visão no escuro",
        "defensesText": "redução de corte, impacto e perfuração 5",
        "attributes": {
            "str": 6,
            "dex": 2,
            "con": 6,
            "int": null,
            "wis": 0,
            "cha": -5
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Duas pancadas +15 (2d8+10)."
        }
    ],
    "abilities": [
        {
            "name": "Cúpula de Proteção",
            "timing": null,
            "text": "O piloto da carruagem de comando está protegido por uma cúpula protetora (como o efeito básico da magia Campo de Força). Se o campo for destruído, a carruagem usa sua próxima ação de movimento para refazê-lo."
        },
        {
            "name": "Encantos de Comando",
            "timing": null,
            "text": "Encantos fazem com que a voz do piloto possa ser ouvida a até 300m e, caso ele possua alguma habilidade baseada em voz ou som, o alcance dessa habilidade se torna longo."
        },
        {
            "name": "Evacuação de Emergência",
            "timing": "completa",
            "text": "Se a carruagem inicia seu turno com 20 PV ou menos, o piloto é alvo da magia Teletransporte com o aprimoramento de santuário, sem custo em PM. Em seguida, a carruagem começa a emitir um alarme agudo e fica imóvel por 2 turnos — no fim do segundo turno, ela explode, causando 6d6 pontos de dano de fogo e 6d6 pontos de dano de perfuração em todas as criaturas em alcance curto (Ref CD 24 reduz à metade). Uma palavra de comando pode impedir a explosão."
        },
        {
            "name": "Pernas Mecânicas",
            "timing": null,
            "text": "A carruagem recebe +5 em testes para resistir às manobras derrubar e empurrar."
        },
        {
            "name": "Piloto",
            "timing": null,
            "text": "Uma carruagem é mais eficiente quando controlada por um piloto, como um arcano de guerra. Pilotar exige uma ação de movimento do piloto a cada rodada e permite que a carruagem use os valores de Iniciativa, Reflexos e ataque do piloto ou os seus, os que forem maiores. O piloto é considerado uma ameaça adicional para efeitos de ND."
        }
    ],
    "equipment": null,
    "treasure": "Caixa de voz e gema de força (CD 20 para extrair).",
    "skillsText": "Atletismo +14"
};

export const corcelDeComando = {
    "id": "corcel-de-comando",
    "name": "Corcel de Comando",
    "type": "construct",
    "subtype": null,
    "size": "Grande",
    "challengeRating": 3,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p273 ate 285.pdf",
        "pdfPage": 7,
        "bookPage": 277
    },
    "stats": {
        "initiative": 5,
        "perception": 3,
        "defense": 19,
        "fortitude": 13,
        "reflex": 9,
        "will": 5,
        "hitPoints": 82,
        "speedText": "15m (10q), sem redução por terreno difícil",
        "senses": "visão no escuro",
        "defensesText": "redução de corte, impacto e perfuração 5",
        "attributes": {
            "str": 5,
            "dex": 2,
            "con": 5,
            "int": null,
            "wis": 0,
            "cha": -5
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Duas pancadas +12 (1d10+5)."
        }
    ],
    "abilities": [
        {
            "name": "Cúpula de Proteção",
            "timing": null,
            "text": "O piloto do corcel de comando está protegido por uma cúpula protetora (como o efeito básico da magia Campo de Força). Se o campo for destruído, o corcel usa sua próxima ação de movimento para refazê-lo."
        },
        {
            "name": "Encantos de Comando",
            "timing": null,
            "text": "Encantos fazem com que a voz do piloto possa ser ouvida a até 300m e, caso ele possua alguma habilidade baseada em voz ou som, o alcance dessa habilidade se torna longo."
        },
        {
            "name": "Evacuação de Emergência",
            "timing": "completa",
            "text": "Se o corcel inicia seu turno com 20 PV ou menos, o piloto é alvo da magia Teletransporte com o aprimoramento de santuário, sem custo em PM. Em seguida, o corcel começa a emitir um alarme agudo e fica imóvel por 2 turnos — no fim do segundo turno, ele explode, causando 4d6 pontos de dano de fogo e 4d6 pontos de dano de perfuração em todas as criaturas em alcance curto (Ref CD 19 reduz à metade). Uma palavra de comando pode impedir a explosão."
        },
        {
            "name": "Piloto",
            "timing": null,
            "text": "O corcel é mais eficiente quando controlado por um piloto, como um arcano de guerra. Pilotar exige uma ação de movimento do piloto a cada rodada e permite que o corcel use os valores de Iniciativa, Reflexos e ataque do piloto ou os seus, os que forem maiores. O piloto é considerado uma ameaça adicional para efeitos de ND."
        }
    ],
    "equipment": null,
    "treasure": "Caixa de voz (CD 18 para extrair) e gema de força (CD 18 para extrair).",
    "skillsText": "Atletismo +13"
};

export const constructCreatures = [
    // Manuais, Livro Básico e Ameaças de Arton
    gargoyle, golemDeHierro, colossoSupremo, engenhoDeGuerraGoblin,
    mashinMonge, mashinSamurai, golemDeBarro, golemDeBronze,
    golemDeEspelhos, golemDeFerroSuperior, golemDeMateriaVermelha, golemDePedra,
    instrumentoDivino, kishin, kishinauros, esmagadorColetivo,
    golemDeNorMedio, gargulaAssassina, golemDeCarne, soldadoMecanico,
    espadaDaFloresta, galhadaMacho, galhadaFemea, brawar,
    arvoreMatilha, carruagemDeComando, corcelDeComando
];
