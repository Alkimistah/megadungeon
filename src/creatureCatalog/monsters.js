import { divineAspects } from "./divineAspects.js";

export const glop = {
    "id": "glop",
    "name": "Glop",
    "type": "monster",
    "subtype": null,
    "size": "Pequeno",
    "challengeRating": 0.25,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 203,
        "bookPage": 201
    },
    "stats": {
        "initiative": 0,
        "perception": 0,
        "defense": 10,
        "fortitude": 0,
        "reflex": 2,
        "will": -5,
        "hitPoints": 10,
        "speedText": "9m (6q)",
        "senses": "percepção às cegas",
        "defensesText": "imunidade a ácido",
        "attributes": {
            "str": 0,
            "dex": 0,
            "con": 0,
            "int": null,
            "wis": -5,
            "cha": -5
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Pancada +7 (1d4 mais 1d4 ácido)."
        }
    ],
    "abilities": [],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": null
};

export const glooop = {
    "id": "glooop",
    "name": "Glooop",
    "type": "monster",
    "subtype": null,
    "size": "Grande",
    "challengeRating": 2,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 204,
        "bookPage": 202
    },
    "stats": {
        "initiative": 0,
        "perception": -5,
        "defense": 19,
        "fortitude": 13,
        "reflex": 7,
        "will": 2,
        "hitPoints": 68,
        "speedText": "9m (6q)",
        "senses": "percepção às cegas",
        "defensesText": "imunidade a ácido",
        "attributes": {
            "str": 3,
            "dex": -1,
            "con": 2,
            "int": null,
            "wis": -5,
            "cha": -5
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Pancada +12 (2d6+3 mais 2d6 ácido)."
        }
    ],
    "abilities": [
        {
            "name": "Agarrar Aprimorado",
            "timing": "livre",
            "text": "Pancada (teste +14)."
        },
        {
            "name": "Engolir",
            "timing": "padrão",
            "text": "No início de cada um dos turnos do glooop, a criatura engolida sofre 2d6+3 pontos de dano de impacto mais 2d6 pontos de dano de ácido. Ela pode escapar causando um total de 10 pontos de dano a ele (Defesa 10)."
        }
    ],
    "equipment": null,
    "treasure": "Padrão.",
    "skillsText": null
};

export const mamaeGlop = {
    "id": "mamae-glop",
    "name": "Mamãe Glop",
    "type": "monster",
    "subtype": null,
    "size": "Grande",
    "challengeRating": 2,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 204,
        "bookPage": 202
    },
    "stats": {
        "initiative": 2,
        "perception": -1,
        "defense": 17,
        "fortitude": 13,
        "reflex": 7,
        "will": 2,
        "hitPoints": 70,
        "speedText": "9m (6q)",
        "senses": "percepção às cegas",
        "defensesText": "imunidade a ácido",
        "attributes": {
            "str": 2,
            "dex": -1,
            "con": 2,
            "int": null,
            "wis": -3,
            "cha": -3
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Pancada +12 (2d6+2 mais 2d6 ácido)."
        }
    ],
    "abilities": [
        {
            "name": "Glops Filhinhos",
            "timing": null,
            "text": "A mamãe glop está sempre acompanhada por 1d4 glops, que a protegem instintivamente. Esses glops, assim como aqueles gerados pela Meiose Glópica, não rendem pontos de experiência."
        },
        {
            "name": "Meiose Glópica",
            "timing": "livre",
            "text": "Quando ameaçada, a mamãe pode gerar outros glops filhinhos para protegê-la. No início de cada turno da mamãe, role um dado. Em um resultado par, um glop surge num espaço adjacente a ela. Ele age normalmente, no turno da mamãe, a partir da próxima rodada."
        }
    ],
    "equipment": null,
    "treasure": "Padrão.",
    "skillsText": null
};

export const cockatrice = {
    "id": "cocatriz",
    "name": "Cocatriz",
    "type": "monster",
    "subtype": null,
    "size": "Pequeno",
    "challengeRating": 3,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 201,
        "bookPage": 199
    },
    "stats": {
        "initiative": 10,
        "perception": 4,
        "defense": 22,
        "fortitude": 9,
        "reflex": 13,
        "will": 5,
        "hitPoints": 98,
        "speedText": "6m (4q), voo 12m (8q)",
        "senses": "visão no escuro",
        "defensesText": "evasão",
        "attributes": {
            "str": 0,
            "dex": 5,
            "con": 1,
            "int": -5,
            "wis": 1,
            "cha": -2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Bicada +14 (2d4+8 perfuração)."
        }
    ],
    "abilities": [
        {
            "name": "Bicada Petrificante",
            "timing": null,
            "text": "Uma criatura que sofra dano da bicada da cocatriz fica lenta (Fort CD 19 evita). Se já estiver lenta, fica petrificada permanentemente. Efeitos que removem paralisia revertem a petrificação."
        },
        {
            "name": "Voo de Galinha",
            "timing": null,
            "text": "A cocatriz só consegue percorrer curtas distâncias voando; ela sempre termina seu movimento sobre o chão ou outra superfície firme."
        }
    ],
    "equipment": null,
    "treasure": "1d4-1 ovos de cocatriz (cada ovo permite preparar uma refeição coc-au-triz).",
    "skillsText": null
};

export const basilisk = {
    id: "basilisco",
    name: "Basilisco",
    type: "monster",
    subtype: null,
    size: "Médio",
    challengeRating: 4,
    description: [
        "Lagartos venenosos com dois metros de comprimento, basiliscos possuem o terrível poder de transformar seres vivos em pedra com o olhar. Criaturas solitárias, vivem tanto em terra firme quanto na água."
    ],
    source: {
        "book": "Livro Básico",
        "pdfPage": 8,
        "bookPage": null
    },
    stats: {
        "initiative": 6,
        "perception": 5,
        "defense": 23,
        "fortitude": 10,
        "reflex": 9,
        "will": 9,
        "hitPoints": 145,
        "speedText": "9m (6q), natação 9m (6q)",
        "senses": "visão no escuro",
        "defensesText": "redução de dano 5",
        "attributes": {
            "str": 4,
            "dex": 2,
            "con": 4,
            "int": -4,
            "wis": 1,
            "cha": 0
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +16 (2d8+12 mais veneno)."
        }
    ],
    abilities: [
        {
            "name": "Olhar Petrificante",
            "timing": null,
            "text": "No início de seu turno, cada personagem em alcance curto do basilisco deve fazer um teste de Reflexos (CD 18). Se passar, desvia o olhar. Se falhar, fica lento. Se já estiver lento, fica petrificado permanentemente. Um personagem pode fechar os olhos como uma reação para ficar imune a esta habilidade, mas sofrerá os efeitos de estar cego por uma rodada. Efeitos que removem paralisia revertem a petrificação. Metamorfose."
        },
        {
            "name": "Veneno",
            "timing": null,
            "text": "Peçonha concentrada (perde 1d12 pontos de vida por rodada durante 3 rodadas, Fortitude CD 18 reduz a duração para uma rodada)."
        }
    ],
    equipment: null,
    treasure: "1d4 doses de peçonha concentrada (CD 19 para extrair), couro de basilisco (CD 19 para extrair, conta como T$ 1.000 como matéria-prima para fabricar uma armadura superior).",
    skillsText: null
};

export const bulette = {
    "id": "bulette",
    "name": "Bulette",
    "type": "monster",
    "subtype": null,
    "size": "Grande",
    "challengeRating": 7,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 105,
        "bookPage": 103
    },
    "stats": {
        "initiative": 9,
        "perception": 8,
        "defense": 32,
        "fortitude": 20,
        "reflex": 9,
        "will": 12,
        "hitPoints": 310,
        "speedText": "9m (6q), escavação 12m (8q)",
        "senses": "percepção às cegas (longo)",
        "defensesText": "redução de dano 5/adamante; redução de ácido e fogo 10",
        "attributes": {
            "str": 8,
            "dex": 2,
            "con": 5,
            "int": -4,
            "wis": 1,
            "cha": -3
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +23 (3d8+24 mais 4d6 ácido)."
        }
    ],
    "abilities": [
        {
            "name": "Agarrar Aprimorado",
            "timing": "livre",
            "text": "Mordida (teste +25)."
        },
        {
            "name": "Aura Cáustica",
            "timing": null,
            "text": "No início de cada turno do bulette, todas as criaturas adjacentes sofrem 4d6 pontos de dano de ácido."
        },
        {
            "name": "Engolir",
            "timing": "padrão",
            "text": "No início de cada um dos turnos do bulette, a criatura engolida sofre 2d8+12 pontos de dano de impacto mais 4d6 pontos de dano de ácido. Ela pode escapar causando um total de 20 pontos de dano a ele (Defesa 10, redução de dano 0)."
        },
        {
            "name": "Espreitador das Dunas",
            "timing": null,
            "text": "Enquanto o bulette estiver “nadando” no solo, é muito difícil percebê-lo. Em vez do normal, a CD de Percepção para ouvir o bulette é 40, ou +20 em seu teste de Furtividade, o que for maior."
        }
    ],
    "equipment": null,
    "treasure": "Duas peças de couro de bulette (CD 22 para extrair).",
    "skillsText": null
};

export const tendriculo = {
    "id": "tendriculo",
    "name": "Tendrículo",
    "type": "monster",
    "subtype": null,
    "size": "Grande",
    "challengeRating": 6,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 113,
        "bookPage": 111
    },
    "stats": {
        "initiative": 9,
        "perception": 6,
        "defense": 25,
        "fortitude": 16,
        "reflex": 8,
        "will": 12,
        "hitPoints": 210,
        "speedText": "6m (4q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a sangramento e veneno; natureza vegetal",
        "attributes": {
            "str": 3,
            "dex": 2,
            "con": 2,
            "int": -2,
            "wis": 3,
            "cha": -4
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +20 (2d6+10 mais veneno) e dois tentáculos +24 (4d4+5)."
        }
    ],
    "abilities": [
        {
            "name": "Agarrar Aprimorado",
            "timing": "livre",
            "text": "Tentáculo (teste +24)."
        },
        {
            "name": "Engolir",
            "timing": "padrão",
            "text": "No início de cada um dos turnos do tendrículo, a criatura engolida sofre 2d10+5 pontos de dano de impacto mais 2d10+5 pontos de dano de ácido. Ela pode escapar causando um total de 20 pontos de dano a ele (Defesa 10). Enquanto tiver uma criatura engolida, o tendrículo ganha cura acelerada 20."
        },
        {
            "name": "Veneno",
            "timing": null,
            "text": "Essência de sombra (debilitado, Fort CD 22 reduz para fraco)."
        }
    ],
    "equipment": null,
    "treasure": "1d4 doses de essência de sombra (CD 21 para extrair).",
    "skillsText": "Furtividade +10 (+12 em florestas)"
};

export const aranhaGigante = {
    id: "aranha-gigante",
    name: "Aranha Gigante",
    type: "monster",
    subtype: null,
    size: "Grande",
    challengeRating: 2,
    description: [
        "Grandes como cavalos, estas aranhas capturam suas vítimas com teia, disparando-a ou tecendo uma armadilha em alguma passagem, para então paralisá-las com a picada venenosa."
    ],
    source: {
        "book": "Livro Básico",
        "pdfPage": 2,
        "bookPage": null
    },
    stats: {
        "initiative": 7,
        "perception": 3,
        "defense": 19,
        "fortitude": 8,
        "reflex": 11,
        "will": 3,
        "hitPoints": 77,
        "speedText": "12m (8q), escalar 12m (8q)",
        "senses": "visão no escuro",
        "defensesText": null,
        "attributes": {
            "str": 5,
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
            "text": "Mordida +12 (2d6+8 mais veneno)."
        }
    ],
    abilities: [
        {
            "name": "Teia",
            "timing": "padrão",
            "text": "A aranha gigante dispara teia em um quadrado de 3m de lado em alcance curto. Criaturas na área ficam enredadas (Reflexos CD 18 evita). Uma criatura enredada pode se soltar com uma ação completa e um teste de Força ou Acrobacia (CD 20) ou cortando a teia (cada espaço de 1,5m de teia tem 5 PV e RD 5). Fogo queima a teia em duas rodadas (e liberta as criaturas), mas causa 1d6 pontos de dano de fogo por rodada a todas as criaturas nela. A aranha gigante também pode usar a teia para cobrir uma área quadrada com 6m de lado. Por sua semitransparência, a teia é difícil de ver (Percepção CD 20) até ser tarde demais. Uma criatura que entre na área fica enredada. A aranha pode andar na própria teia sem se enredar. Ela percebe automaticamente (como se tivesse percepção às cegas) qualquer criatura na teia."
        },
        {
            "name": "Veneno",
            "timing": null,
            "text": "Condição fraco (Fort CD 18 evita)."
        }
    ],
    equipment: null,
    treasure: "1d4 doses de veneno de aranha gigante (CD 17 para extrair, T$ 45 cada dose).",
    skillsText: "Furtividade +9"
};

export const aranhaMatriarca = {
    id: "aranha-matriarca",
    name: "Aranha Matriarca",
    type: "monster",
    subtype: "aranha",
    size: "Grande",
    challengeRating: 4,
    description: [
        "No coração de uma câmara tomada por seda grossa, casulos antigos e fios que tremem ao menor passo, a matriarca observa sua presa sem pressa.",
        "Maior, mais velha e mais astuta que uma aranha gigante comum, ela usa o próprio covil como extensão do corpo, isolando aventureiros antes de afundar as presas."
    ],
    role: "solo",
    roleSource: "custom",
    source: { book: "Masmorra de Práxis", pdfFile: "aranha_matriarca_tormenta20_v2", pdfPage: null, bookPage: null },
    stats: {
        initiative: 10, perception: 8, defense: 23, fortitude: 16, reflex: 10, will: 4,
        hitPoints: 140,
        speedText: "12m (8q), escalar 12m (8q)",
        senses: "visão no escuro",
        defensesText: null,
        attributes: { str: 5, dex: 4, con: 4, int: -4, wis: 1, cha: -4 }
    },
    actions: [
        { name: "Corpo a Corpo", text: "2 mordidas +16 (2d8+3 mais veneno)." }
    ],
    abilities: [
        { name: "Teia da Matriarca", timing: "padrão", text: "A aranha matriarca dispara uma massa de teias em um quadrado de 3m de lado em alcance curto. Criaturas na área ficam enredadas (Reflexos CD 18 evita). Uma criatura enredada pode se soltar com uma ação completa e um teste de Força ou Acrobacia (CD 20), ou cortando a teia (cada espaço de 1,5m tem 10 PV e RD 5). Fogo queima a teia em duas rodadas, mas causa 1d6 pontos de dano de fogo por rodada a todas as criaturas nela." },
        { name: "Ninhada Voraz", timing: "movimento", text: "Uma vez por turno, a matriarca pode rasgar um casulo preso às teias da sala e convocar um enxame de aranhas filhotes em um espaço livre em alcance curto. O enxame age no fim da rodada da matriarca. Se o enxame for destruído, a matriarca não pode convocá-lo novamente nesta cena." },
        { name: "Covil Teioso", timing: "passiva", text: "A sala da matriarca é coberta por fios espessos. Para outras criaturas, áreas de teia contam como terreno difícil. A matriarca ignora esse terreno, pode escalar nas próprias teias sem teste e percebe automaticamente qualquer criatura tocando uma teia, como se tivesse percepção às cegas." },
        { name: "Arrastar para o Ninho", timing: "movimento", text: "Uma vez por rodada, a matriarca escolhe uma criatura enredada em alcance curto. A criatura é puxada 6m em direção à matriarca; Reflexos CD 18 evita. Se terminar adjacente à matriarca, fica desprevenida até o início de seu próximo turno." },
        { name: "Veneno", timing: "passiva", text: "Condição fraco (Fortitude CD 18 evita). Se a criatura já estiver fraca e falhar no teste, fica debilitada por 1 rodada." },
        { name: "Salto Aracnídeo", timing: "completa", text: "A aranha matriarca usa os fios do covil para dar um salto habilidoso, deslocando-se até duas vezes seu deslocamento para uma área de teia. Esse movimento não provoca reações. Ao fim do deslocamento, ela faz um ataque de mordida contra uma criatura dentro de seu alcance." },
        { name: "Última Postura", timing: "passiva", text: "Quando é reduzida a 70 PV ou menos pela primeira vez na cena, a matriarca remove uma condição que esteja sofrendo e usa Teia da Matriarca como ação livre. Até o fim da cena, seus ataques de mordida têm margem de ameaça 19." },
        { name: "Uso sugerido", timing: null, text: "Mantenha várias áreas de teia já desenhadas na sala. A matriarca deve dividir o grupo com Teia da Matriarca, puxar alvos isolados com Arrastar para o Ninho e usar o enxame para travar conjuradores ou alvos isolados." }
    ],
    equipment: null,
    treasure: "1d4 doses de veneno de aranha matriarca (CD 18 para extrair, T$ 80 cada dose), seda alva endurecida (T$ 200). Padrão.",
    skillsText: "Furtividade +12 (+17 em áreas de teia)"
};

export const manticora = {
    id: "manticora",
    name: "Mantícora",
    type: "monster",
    subtype: null,
    size: "Grande",
    challengeRating: 6,
    description: [
        "Monstro com corpo de leão, asas de dragão e rosto humano envelhecido, a mantícora está entre as criaturas mais perigosas em uma masmorra — muitas vezes adotando tais lugares como seu covil, ou encarregadas de sua proteção por um mestre ainda mais poderoso."
    ],
    source: {
        "book": "Livro Básico",
        "pdfPage": 2,
        "bookPage": null
    },
    stats: {
        "initiative": 7,
        "perception": 8,
        "defense": 26,
        "fortitude": 18,
        "reflex": 7,
        "will": 12,
        "hitPoints": 240,
        "speedText": "9m (6q), voo 15m (10q)",
        "senses": "faro, visão no escuro",
        "defensesText": null,
        "attributes": {
            "str": 7,
            "dex": 2,
            "con": 5,
            "int": -2,
            "wis": 1,
            "cha": -1
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +18 (1d10+12) e duas garras +18 (1d8+12)."
        }
    ],
    abilities: [
        {
            "name": "Espinhos",
            "timing": "movimento",
            "text": "A mantícora dispara 1d4 espinhos de sua cauda. Cada espinho atinge uma criatura em alcance médio, causando 1d8+7 pontos de dano de perfuração (Ref CD 22 reduz à metade). Recarga (movimento)."
        }
    ],
    equipment: null,
    treasure: "Padrão mais espinhos (CD 21 para extrair). Os espinhos contam como T$ 150 em matéria-prima para fabricar flechas superiores.",
    skillsText: null
};

export const centopeiasDragao = {
    id: "centopeia-dragao",
    name: "Centopeia-dragão",
    type: "monster",
    subtype: null,
    size: "Enorme",
    challengeRating: 7,
    description: [
        "Com dez metros de comprimento, estes monstros incandescentes avançam devorando tudo que encontram. Embora também sejam encontrados em áreas abertas, são mais perigosos em masmorras, onde preenchem túneis estreitos com a bocarra imensa."
    ],
    source: {
        "book": "Livro Básico",
        "pdfPage": 2,
        "bookPage": null
    },
    stats: {
        "initiative": 10,
        "perception": 8,
        "defense": 27,
        "fortitude": 20,
        "reflex": 14,
        "will": 9,
        "hitPoints": 275,
        "speedText": "15m (10q), escavar 6m (4q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a condição caído, redução de fogo 10",
        "attributes": {
            "str": 11,
            "dex": 3,
            "con": 9,
            "int": -4,
            "wis": 1,
            "cha": 0
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +24 (2d8+18 mais 2d6 de fogo)."
        }
    ],
    abilities: [
        {
            "name": "Agarrar Aprimorado",
            "timing": "livre",
            "text": "Quando a centopeia-dragão acerta um ataque de mordida, pode usar a manobra agarrar (teste +29)."
        },
        {
            "name": "Aura de Calor",
            "timing": null,
            "text": "Quando enfurecida, esta criatura emana um calor intenso. No início de cada turno da centopeia-dragão, todas as criaturas em alcance curto sofrem 4d6+9 pontos de dano de fogo."
        },
        {
            "name": "Engolir",
            "timing": "padrão",
            "text": "Se a centopeia-dragão começar seu turno agarrando uma criatura Média ou menor, poderá fazer um teste de agarrar contra ela. Se vencer, engole a criatura. Uma criatura engolida continua agarrada e sofre 2d6+18 pontos de dano de impacto, mais 4d6+9 pontos de dano de fogo, no início de cada turno da centopeia-dragão. A centopeia-dragão só pode manter uma criatura engolida por vez. Uma criatura engolida pode escapar causando 20 pontos de dano ao estômago da centopeia-dragão (Defesa 10). Isso faz com que a criatura seja regurgitada e fique caída na frente do monstro."
        }
    ],
    equipment: null,
    treasure: "2d4 doses de essência abissal (CD 22 para extrair).",
    skillsText: null
};

const escorpiaoDeCristal = {
    id: "escorpiao-de-cristal",
    name: "Escorpião de Cristal",
    type: "monster",
    subtype: null,
    size: "Grande",
    challengeRating: 4,
    role: "solo",
    roleSource: "adaptacao-nd",
    source: { book: "Masmorra de Práxis" },
    description: [
        "Predador das galerias da Ilha de Cristal. Suas pinças são de quartzo leitoso e sua carapaça translúcida toma a cor do veio onde se abriga.",
        "Adaptação do Escorpião-de-Megalon, do Bestiário de Arton."
    ],
    stats: {
        initiative: 5, perception: 6, defense: 23, fortitude: 16, reflex: 10, will: 4,
        hitPoints: 140,
        speedText: "12m (8q), escalada 12m (8q)",
        senses: "visão no escuro",
        attributes: { str: 6, dex: 2, con: 4, int: -5, wis: 1, cha: -2 }
    },
    actions: [
        { name: "Corpo a Corpo", text: "Pinças +16 (2d6+6) e ferrão +16 (1d10+5)." }
    ],
    abilities: [
        { name: "Agarrar Aprimorado", timing: null, text: "Pinças (teste +18)." },
        { name: "Ferrão Farpado", timing: null, text: "Ao acertar com o ferrão, deixa uma farpa. O alvo fica lento até o fim do próximo turno dele (Fortitude CD 18 evita)." },
        { name: "Carapaça Cristalina", timing: null, text: "Redução de dano 5 contra todos os tipos de dano, exceto impacto." },
        { name: "Feito de Cristal", timing: null, text: "Sofre 1 ponto de dano adicional por dado de dano de impacto." }
    ],
    treasure: "Riquezas Menores. O Escorpião de Cristal possui 1d4 gemas em seu corpo."
};

const centopeiaSolar = {
    id: "centopeia-solar",
    name: "Centopeia Solar",
    type: "monster",
    subtype: null,
    size: "Enorme",
    challengeRating: 9,
    role: "solo",
    roleSource: "adaptacao-nd",
    source: { book: "Masmorra de Práxis" },
    description: [
        "Uma fileira de segmentos âmbar se acende sob o piso translúcido. A centopeia percorre as galerias rasas do Prisma da Maré e irrompe por uma fenda com as mandíbulas brilhando de calor.",
        "Adaptação da Centopeia-dragão, do Livro Básico."
    ],
    stats: {
        initiative: 10, perception: 8, defense: 34, fortitude: 21, reflex: 15, will: 9,
        hitPoints: 360,
        speedText: "15m (10q), escavar 6m (4q)",
        senses: "visão no escuro",
        defensesText: "imunidade a fogo e à condição caído",
        attributes: { str: 11, dex: 3, con: 9, int: -4, wis: 1, cha: 0 }
    },
    actions: [
        { name: "Corpo a Corpo", text: "Mordida +27 (2d10+26 mais 2d6 de fogo)." }
    ],
    abilities: [
        { name: "Agarrar Aprimorado", timing: "livre", text: "Quando acerta com a mordida, pode tentar agarrar o alvo (teste +32)." },
        { name: "Aura de Calor", timing: null, text: "Enquanto estiver em uma zona iluminada pelo sol, o corpo inteiro da centopeia irradia calor intenso. No início de cada turno dela, todas as criaturas em alcance curto sofrem 6d6+9 pontos de dano de fogo (Reflexos CD 28 reduz à metade)." },
        { name: "Engolir", timing: "padrão", text: "Se começar o turno agarrando uma criatura Média ou menor, pode fazer um novo teste de agarrar para engoli-la. A criatura engolida permanece agarrada e sofre 2d10+26 de impacto mais 2d6 de fogo no início de cada turno da centopeia. Para escapar, deve causar 20 pontos de dano ao estômago (Defesa 10). Nesse caso, é regurgitada e fica caída. A centopeia só pode manter uma criatura engolida por vez." }
    ],
    treasure: "Padrão."
};

export const grifo = {
    id: "grifo",
    name: "Grifo",
    type: "monster",
    subtype: null,
    size: "Grande",
    challengeRating: 3,
    description: [
        "Grifos têm corpo e patas traseiras de leão, mas patas dianteiras, asas e cabeça de águia. Com 2,5 m de comprimento e envergadura de 7,5m, estão entre as criaturas mais majestosas de Arton. Também são alguns dos voadores mais rápidos que existem, superando até mesmo alguns dragões. Como as águias, habitam lugares altos, de onde mergulham guinchando para atacar suas presas. Em seu habitat natural, grifos vivem em bandos de um macho mais seu harém de 1d6 fêmeas. Quando criados desde filhotes, os grifos podem ser domesticados, servindo de montaria. Muitas tribos bárbaras das Montanhas Sanguinárias criam e cavalgam grifos. Um grifo domesticado será sempre fiel a seu tratador. Entretanto, eles adoram carne de cavalo, o que pode ser um problema quando são misturados com essas montarias mais comuns."
    ],
    source: {
        "book": "Livro Básico",
        "pdfPage": 7,
        "bookPage": null
    },
    stats: {
        "initiative": 9,
        "perception": 7,
        "defense": 19,
        "fortitude": 9,
        "reflex": 15,
        "will": 4,
        "hitPoints": 110,
        "speedText": "12m, voo 24m",
        "senses": "visão no escuro",
        "defensesText": "imunidade a medo",
        "attributes": {
            "str": 5,
            "dex": 4,
            "con": 3,
            "int": -4,
            "wis": 2,
            "cha": -1
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +14 (2d6+5) e duas garras +14 (1d6+5)."
        }
    ],
    abilities: [
        {
            "name": "Bote",
            "timing": "completa",
            "text": "O grifo faz uma investida e ataca com sua mordida e suas duas garras. Os três ataques recebem o bônus de +2 da investida, mas devem ser feitos contra o mesmo alvo."
        }
    ],
    equipment: null,
    treasure: "Um ninho de grifo tem 25% de chance de conter 1d4 ovos no valor de T$ 2.500 cada.",
    skillsText: null
};

export const ursoCoruja = {
    id: "urso-coruja",
    name: "Urso-Coruja",
    type: "monster",
    subtype: null,
    size: "Grande",
    challengeRating: 4,
    description: [
        "Este estranho ser lembra um grande urso, mas coberto de penas e com a cabeça de uma enorme coruja. A cor varia do castanho ao marrom, com bico em tom marfim fosco. A teoria mais aceita entre os estudiosos do Reinado diz que foram criados por um mago insano. Após matar seu criador, teriam fugido da torre dele e se espalhado pelos ermos. Ursos-coruja habitam os ermos de Arton, fazendo de florestas e cavernas seus covis. São criaturas agressivas, atacando qualquer coisa que se mova. Rasgam e bicam, tentando agarrar a vítima e fazê-la em pedaços, para então devorá-la. Quem sobrevive a encontros com a fera pode atestar a selvageria em seus olhos vermelhos."
    ],
    source: {
        "book": "Livro Básico",
        "pdfPage": 8,
        "bookPage": null
    },
    stats: {
        "initiative": 7,
        "perception": 5,
        "defense": 23,
        "fortitude": 16,
        "reflex": 10,
        "will": 5,
        "hitPoints": 145,
        "speedText": "12m (8q)",
        "senses": "faro, visão no escuro",
        "defensesText": null,
        "attributes": {
            "str": 7,
            "dex": 3,
            "con": 5,
            "int": -4,
            "wis": 1,
            "cha": -2
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +16 (1d8+5) e duas garras +15 (1d6+5)."
        }
    ],
    abilities: [
        {
            "name": "Agarrar Aprimorado",
            "timing": "livre",
            "text": "Se o urso-coruja acerta um ataque de garra, pode fazer a manobra agarrar (teste +18)."
        }
    ],
    equipment: null,
    treasure: "Nenhum.",
    skillsText: null
};

export const serpe = {
    id: "serpe",
    name: "Serpe",
    type: "monster",
    subtype: "serpente",
    size: "Grande",
    challengeRating: 5,
    description: [
        "Muitas vezes confundidos com dragões, estes monstros reptilianos alados são apenas feras com pouca inteligência e sem poderes mágicos. Ao contrário de dragões, não possuem braços — apenas as patas traseiras e asas, como pássaros. Ainda assim, são muito perigosos e agressivos, uma ameaça constante aos viajantes do Reinado e além. A ponta da longa cauda esconde um ferrão, contendo um dos venenos mais poderosos de que se tem notícia."
    ],
    source: {
        "book": "Livro Básico",
        "pdfPage": 8,
        "bookPage": null
    },
    stats: {
        "initiative": 5,
        "perception": 7,
        "defense": 24,
        "fortitude": 10,
        "reflex": 16,
        "will": 5,
        "hitPoints": 200,
        "speedText": "9m (6q), voo 18m (12q)",
        "senses": "faro, visão no escuro",
        "defensesText": "imunidade a paralisia",
        "attributes": {
            "str": 6,
            "dex": 1,
            "con": 6,
            "int": -2,
            "wis": 1,
            "cha": -1
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +17 (2d6+12) e ferrão +17 (1d8+12 mais veneno)."
        }
    ],
    abilities: [
        {
            "name": "Agarrar Aprimorado",
            "timing": "livre",
            "text": "Se a serpe acerta um ataque de mordida, pode fazer a manobra agarrar (teste +19)."
        },
        {
            "name": "Veneno",
            "timing": null,
            "text": "Peçonha concentrada (perde 1d12 pontos de vida por rodada durante 3 rodadas, Fortitude CD 20 reduz a duração para uma rodada)."
        }
    ],
    equipment: null,
    treasure: "1d4 doses de peçonha concentrada (CD 20 para extrair).",
    skillsText: null
};

export const hidra = {
    id: "hidra",
    name: "Hidra",
    type: "monster",
    subtype: null,
    size: "Enorme",
    challengeRating: 11,
    description: [
        "Esta monstruosidade reptiliana tem a aparência de um lagarto imenso e obeso, coberto de escamas verdes ou marrons, com cinco cabeças encimando pescoços longos e flexíveis como serpentes. Hidras são criaturas solitárias e normalmente habitam pântanos, onde se escondem imersas em água ou lama, esperando por uma presa. Porém, às vezes são capturadas por sszzaazitas, sendo usadas como guardiãs de lugares importantes ou armas de guerra. Seja como for, a hidra é um monstro voraz, agressivo e difícil de matar; quando uma de suas cabeças é cortada, outras duas nascem no lugar!"
    ],
    source: {
        "book": "Livro Básico",
        "pdfPage": 21,
        "bookPage": null
    },
    stats: {
        "initiative": 9,
        "perception": 9,
        "defense": 35,
        "fortitude": 24,
        "reflex": 18,
        "will": 9,
        "hitPoints": 550,
        "speedText": "9m (6q), natação 9m (6q)",
        "senses": "faro, visão no escuro",
        "defensesText": "cura acelerada 100",
        "attributes": {
            "str": 10,
            "dex": 0,
            "con": 10,
            "int": -4,
            "wis": 0,
            "cha": -1
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Cinco mordidas +34 (3d6+16)."
        }
    ],
    abilities: [
        {
            "name": "Cortar Cabeças",
            "timing": null,
            "text": "As cabeças da hidra são seu ponto fraco e é possível atacá-las diretamente. Atacar uma cabeça impõe uma penalidade de –2 no teste de ataque. Se o ataque acertar e causar pelo menos 25 pontos de dano de corte, a cabeça é decepada e a hidra perde um ataque de mordida. Entretanto, 1d4 rodadas após a cabeça ser decepada, duas novas nascem em seu lugar (a hidra pode ter até dez cabeças). Para impedir o nascimento de novas cabeças é necessário cauterizar o pescoço. Isso exige causar 25 pontos de dano de ácido ou fogo na hidra. Se todas as cabeças da hidra forem decepadas e todos seus pescoços forem cauterizados, ela morre."
        }
    ],
    equipment: null,
    treasure: "Padrão.",
    skillsText: "Furtividade +4 (+14 em pântanos)"
};

export const lagash = {
    id: "lagash",
    name: "Lagash",
    type: "monster",
    subtype: null,
    size: "Enorme",
    challengeRating: 13,
    description: [
        "Esta serpente gigantesca é considerada sagrada pelos sszzaazitas — embora isso não impeça cultistas do Deus da Traição de usarem-na para proteger tesouros valiosos. O corpo de um lagash é coberto de escamas negras, seus olhos brilham amarelos e a bocarra verte veneno... e cobras! Lagash são pouco conhecidos no Reinado — além de habitar apenas selvas profundas e subterrâneos, quem encontra um desses monstros normalmente não sobrevive para contar a história."
    ],
    source: {
        "book": "Livro Básico",
        "pdfPage": 21,
        "bookPage": null
    },
    stats: {
        "initiative": 19,
        "perception": 11,
        "defense": 41,
        "fortitude": 26,
        "reflex": 20,
        "will": 13,
        "hitPoints": 660,
        "speedText": "12m (8q), escalar 12m (8q), natação 12m (8q)",
        "senses": "faro, visão no escuro",
        "defensesText": "imunidade a efeitos de movimento e veneno",
        "attributes": {
            "str": 11,
            "dex": 4,
            "con": 9,
            "int": -3,
            "wis": 2,
            "cha": -2
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +37 (4d12+28 mais veneno)."
        }
    ],
    abilities: [
        {
            "name": "Agarrar Aprimorado",
            "timing": "livre",
            "text": "Se o lagash acerta um ataque de mordida, pode fazer a manobra agarrar (teste +42)."
        },
        {
            "name": "Constrição",
            "timing": "livre",
            "text": "No início de cada um de seus turnos, o lagash causa 6d12+28 pontos de dano de impacto na criatura que estiver agarrando."
        },
        {
            "name": "Crias de Sszzaas",
            "timing": "movimento",
            "text": "O lagash cospe 2d6 serpentes em alcance curto. As serpentes agem a partir da próxima rodada do lagash. Elas têm deslocamento 9m (normal, de escalada e de natação) e podem gastar uma ação padrão para causar 1d6 pontos de dano de perfuração em uma criatura adjacente. As serpentes possuem For –1, Des 2 e todos os outros atributos nulos; elas têm 1 PV e não têm valor de Defesa ou testes de resistência (qualquer efeito as acerta automaticamente). Recarga (movimento)."
        },
        {
            "name": "Cuspe Venenoso",
            "timing": "padrão",
            "text": "O lagash cospe veneno em um cone de 9m. Criaturas na área perdem 6d12 pontos de vida e ficam cegas por 1d4 rodadas (Fortitude CD 35 reduz à metade e evita a cegueira)."
        },
        {
            "name": "Veneno",
            "timing": null,
            "text": "Perde 4d12 pontos de vida por rodada durante 5 rodadas (Fort CD 35 reduz para uma rodada)."
        }
    ],
    equipment: null,
    treasure: "Padrão.",
    skillsText: "Furtividade +17"
};

export const ganchador = {
    id: "ganchador",
    name: "Ganchador",
    type: "monster",
    subtype: null,
    size: "Grande",
    challengeRating: 5,
    description: [
        "Esta criatura parece um besouro humanoide com quase três metros de altura. A cabeça lembra a de um urubu com um bico grande e é a única parte da criatura não coberta por um exoesqueleto duro e repleto de pontas afiadas. Mas são os braços que dão nome à criatura, pois terminam em ganchos pontudos de aparência cruel. Ganchadores vivem nos subterrâneos de Arton e estão entre as criaturas escravizadas pelos finntroll."
    ],
    source: {
        "book": "Livro Básico",
        "pdfPage": 23,
        "bookPage": null
    },
    stats: {
        "initiative": 7,
        "perception": 5,
        "defense": 26,
        "fortitude": 15,
        "reflex": 11,
        "will": 7,
        "hitPoints": 210,
        "speedText": "9m (6q), escalar 9m (6q)",
        "senses": "percepção às cegas",
        "defensesText": null,
        "attributes": {
            "str": 6,
            "dex": 3,
            "con": 5,
            "int": -2,
            "wis": 1,
            "cha": -2
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +17 (2d6+8) e duas garras +17 (1d8+8, 19/x3)."
        }
    ],
    abilities: [
        {
            "name": "Dilacerar",
            "timing": null,
            "text": "Se o ganchador acerta os dois ataques de garra em uma mesma criatura na mesma rodada, causa mais 2d8+8 pontos de dano."
        },
        {
            "name": "Quebrar Tudo!",
            "timing": null,
            "text": "O ganchador recebe +2 em testes de ataque para quebrar (teste total +21) e causa +1d8 pontos de dano contra objetos."
        },
        {
            "name": "Sensibilidade a Luz",
            "timing": null,
            "text": "Quando exposto à luz do sol ou similar, o ganchador fica ofuscado."
        }
    ],
    equipment: null,
    treasure: "Metade mais duas garras (CD 20 para extrair; cada garra conta como T$ 500 em matéria-prima para fabricar armas de corte superiores).",
    skillsText: null
};

export const troll = {
    id: "troll",
    name: "Troll",
    type: "monster",
    subtype: "troll",
    size: "Grande",
    challengeRating: 5,
    description: [
        "Um troll é um monstro feito de matéria vegetal. Alto e magro como uma árvore, possui pele verde e verruguenta e braços longos que terminam em garras afiadas. Estes monstros vorazes não apenas servem aos finntroll como guardas e soldados, mas também são encontrados em diversos pontos de Arton, uma ameaça constante a viajantes e aventureiros. Alguns dizem que são uma versão primitiva dos finntroll, enquanto outros presumem que foram criados pelos trolls nobres através de experimentos perversos que envolvem transformar criaturas indefesas. Um troll pode regenerar quase qualquer ferimento, até mesmo membros decepados. Essa capacidade exige quantidades fantásticas de comida, fazendo com que o monstro esteja sempre faminto — um troll vai tentar devorar qualquer coisa que se mova. Apenas dano causado por fogo ou ácido impede sua regeneração. As estatísticas a seguir representam a espécie de troll mais comum, que habita pântanos e charcos, mas existem outras. Independentemente da espécie, trolls procuram viver em tocas ou ruínas próximas a trilhas ou estradas, onde têm constante acesso a presas. Seu apetite contínuo e macabro os leva a capturar todo tipo de criaturas — especialmente humanoides, cujo sabor apreciam — e usá-las como ingredientes em numerosas “receitas” diabólicas."
    ],
    source: {
        "book": "Livro Básico",
        "pdfPage": 23,
        "bookPage": null
    },
    stats: {
        "initiative": 4,
        "perception": 3,
        "defense": 23,
        "fortitude": 14,
        "reflex": 10,
        "will": 6,
        "hitPoints": 165,
        "speedText": "9m (6q)",
        "senses": "visão no escuro",
        "defensesText": "cura acelerada 15/ ácido ou fogo",
        "attributes": {
            "str": 6,
            "dex": 2,
            "con": 6,
            "int": -2,
            "wis": -1,
            "cha": -2
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +17 (1d8+6) e duas garras +17 (1d6+6)."
        }
    ],
    abilities: [
        {
            "name": "Dilacerar",
            "timing": null,
            "text": "Se o troll acerta os dois ataques de garra em uma mesma criatura na mesma rodada, causa mais 2d6+6 pontos de dano."
        }
    ],
    equipment: null,
    treasure: "Padrão.",
    skillsText: null
};

export const trollDasCavernas = {
    id: "troll-das-cavernas",
    name: "Troll das Cavernas",
    type: "monster",
    subtype: "troll",
    size: "Enorme",
    challengeRating: 9,
    description: [
        "Maiores e mais poderosos que trolls comuns, são empregados pelos finntrolls como armas pesadas. Possuem ombros imensos, braços largos como troncos de árvore e cabeça redonda e abrutalhada. Suas pernas poderosas terminam em pés sem dedos e sua pele cinzenta é tão áspera — e dura — quanto a rocha. Um grupo destas gigantescas criaturas pode desafiar até os mais poderosos heróis do Reinado!"
    ],
    source: {
        "book": "Livro Básico",
        "pdfPage": 24,
        "bookPage": null
    },
    stats: {
        "initiative": 7,
        "perception": 14,
        "defense": 29,
        "fortitude": 21,
        "reflex": 15,
        "will": 9,
        "hitPoints": 345,
        "speedText": "12m (8q), escalar 9m (6q)",
        "senses": "faro, visão no escuro",
        "defensesText": "cura acelerada 20/ ácido ou fogo",
        "attributes": {
            "str": 9,
            "dex": 0,
            "con": 11,
            "int": -2,
            "wis": -1,
            "cha": -2
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Tacape +26 (3d6+27) e mordida +26 (2d6+27)."
        }
    ],
    abilities: [
        {
            "name": "Golpe Avassalador",
            "timing": "livre",
            "text": "Quando acerta um ataque de tacape, o troll das cavernas arremessa a vítima 1d6 x 1,5m em uma direção à escolha dele (Fortitude CD 28 evita). A vítima fica caída e, se atingir algum obstáculo, sofre 1d6 pontos de dano de impacto para cada 1,5m que foi arremessada."
        },
        {
            "name": "Varrer",
            "timing": "livre",
            "text": "Uma vez por rodada, quando o troll das cavernas faz um ataque corpo a corpo e reduz os pontos de vida do alvo para 0 ou menos, pode realizar um ataque adicional contra outra criatura dentro do seu alcance."
        }
    ],
    equipment: "Tacape gigante",
    treasure: "Metade.",
    skillsText: null
};

export const dragaoFilhote = {
    id: "dragao-filhote",
    name: "Dragão Filhote",
    type: "monster",
    subtype: "dragão",
    size: "Médio",
    challengeRating: 3,
    description: [],
    source: {
        "book": "Livro Básico",
        "pdfPage": 25,
        "bookPage": null
    },
    stats: {
        "initiative": 8,
        "perception": 5,
        "defense": 22,
        "fortitude": 15,
        "reflex": 3,
        "will": 9,
        "hitPoints": 140,
        "speedText": "12m (8q), voo 18m (12q)",
        "senses": "percepção às cegas, visão no escuro",
        "defensesText": "imunidade a fogo, resistência a magia +1, vulnerabilidade a frio; imunidade a atordoamento, cansaço, metamorfose e paralisia",
        "attributes": {
            "str": 4,
            "dex": 3,
            "con": 3,
            "int": 0,
            "wis": 0,
            "cha": 0
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +15 (2d6+5) e duas garras +15 (1d6+5)."
        }
    ],
    abilities: [
        {
            "name": "Sopro",
            "timing": "padrão",
            "text": "Todas as criaturas em um cone de 6m sofrem 2d12 pontos de dano de fogo e ficam em chamas (Ref CD 18 reduz o dano à metade e evita a condição). Recarga (movimento)."
        },
        {
            "name": "Imunidades Dracônicas",
            "timing": null,
            "text": "Dragões são imunes a efeitos de atordoamento, cansaço, dano do tipo de seu sopro, metamorfose e paralisia."
        }
    ],
    equipment: null,
    treasure: "Padrão.",
    skillsText: null
};

export const dragaoJovem = {
    id: "dragao-jovem",
    name: "Dragão Jovem",
    type: "monster",
    subtype: "dragão",
    size: "Grande",
    challengeRating: 7,
    description: [],
    source: {
        "book": "Livro Básico",
        "pdfPage": 25,
        "bookPage": null
    },
    stats: {
        "initiative": 11,
        "perception": 11,
        "defense": 32,
        "fortitude": 20,
        "reflex": 9,
        "will": 12,
        "hitPoints": 320,
        "manaPoints": 15,
        "speedText": "12m (8q), voo 18m (12q)",
        "senses": "percepção às cegas, visão no escuro",
        "defensesText": "imunidade a fogo, redução de dano 5, resistência a magia +2, vulnerabilidade a frio; imunidade a atordoamento, cansaço, metamorfose e paralisia",
        "attributes": {
            "str": 7,
            "dex": 2,
            "con": 6,
            "int": 2,
            "wis": 2,
            "cha": 2
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +25 (2d6+14, 19) e duas garras +25 (1d8+14, 19)."
        }
    ],
    abilities: [
        {
            "name": "Sopro",
            "timing": "padrão",
            "text": "Todas as criaturas em um cone de 9m sofrem 6d12 pontos de dano de fogo e ficam em chamas (Ref CD 25 reduz o dano à metade e evita a condição). Recarga (movimento)."
        },
        {
            "name": "Varrer",
            "timing": "livre",
            "text": "Uma vez por rodada, quando o dragão faz um ataque corpo a corpo e reduz os pontos de vida do alvo para 0 ou menos, pode realizar um ataque adicional contra outra criatura dentro do seu alcance."
        },
        {
            "name": "Imunidades Dracônicas",
            "timing": null,
            "text": "Dragões são imunes a efeitos de atordoamento, cansaço, dano do tipo de seu sopro, metamorfose e paralisia."
        },
        {
            "name": "Metamorfose Dracônica",
            "timing": "completa",
            "text": "Dragões jovens ou mais velhos podem se transformar em outras criaturas, como a magia Metamorfose (mas sem limitação para tamanhos menores que o seu). Eles costumam usar esta habilidade para se infiltrar em sociedades humanoides, aprender sobre seus costumes ou apenas quando não querem ser reconhecidos. Um dragão morto reverte à sua forma original.",
            "magical": true
        }
    ],
    equipment: null,
    treasure: "Dobro e 2 peças de couro de dragão (CD 22 para extrair, veja o quadro na página 312).",
    skillsText: "Intimidação +11"
};

export const dragaoAdulto = {
    id: "dragao-adulto",
    name: "Dragão Adulto",
    type: "monster",
    subtype: "dragão",
    size: "Enorme",
    challengeRating: 11,
    description: [],
    source: {
        "book": "Livro Básico",
        "pdfPage": 26,
        "bookPage": null
    },
    stats: {
        "initiative": 12,
        "perception": 15,
        "defense": 42,
        "fortitude": 24,
        "reflex": 11,
        "will": 18,
        "hitPoints": 600,
        "manaPoints": 70,
        "speedText": "12m (8q), voo 24m (16q)",
        "senses": "percepção às cegas, visão no escuro",
        "defensesText": "imunidade a fogo, redução de dano 10, resistência a magia +3, vulnerabilidade a frio; imunidade a atordoamento, cansaço, metamorfose e paralisia",
        "attributes": {
            "str": 11,
            "dex": 1,
            "con": 8,
            "int": 4,
            "wis": 4,
            "cha": 4
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +35 (4d10+25, 18) e duas garras +35 (3d10+25, 18)."
        }
    ],
    abilities: [
        {
            "name": "Aura Aterradora",
            "timing": null,
            "text": "A simples visão de um dragão adulto ou mais velho amedronta o mais valente dos aventureiros. Uma criatura que comece seu turno em alcance longo do dragão fica apavorada (se tiver 4 níveis ou menos) ou abalada (se tiver 5 níveis ou mais) até o fim da cena. Uma criatura que passe no teste de resistência fica imune a esta habilidade por um dia. Vontade CD 21 evita."
        },
        {
            "name": "Magia",
            "timing": null,
            "text": "O dragão adulto lança magias como um conjurador de 11º nível (CD 32)."
        },
        {
            "name": "Campo de Força",
            "timing": "reação",
            "text": "Quando sofre dano, o dragão recebe redução de dano 30 contra este dano.",
            "cost": "4 PM"
        },
        {
            "name": "Curar Ferimentos",
            "timing": "padrão",
            "text": "Uma criatura adjacente cura 12d8+12 PV.",
            "cost": "11 PM"
        },
        {
            "name": "Dissipar Magia",
            "timing": "padrão",
            "text": "O dragão escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias no alvo escolhido com CD menor que o resultado do teste são dissipadas.",
            "cost": "3 PM"
        },
        {
            "name": "Enfeitiçar",
            "timing": "padrão",
            "text": "Um humanoide em alcance curto fica enfeitiçado até o final da cena (Vontade evita).",
            "cost": "1 PM"
        },
        {
            "name": "Globo de Invulnerabilidade",
            "timing": "padrão",
            "text": "O dragão é envolto por uma esfera mágica com 3m de raio que detém qualquer magia de 2º círculo ou menor.",
            "cost": "6 PM"
        },
        {
            "name": "Velocidade",
            "timing": "padrão",
            "text": "O dragão pode executar uma ação padrão adicional por turno, que não pode ser usada para lançar magias.",
            "cost": "3 PM"
        },
        {
            "name": "Sopro",
            "timing": "padrão",
            "text": "Todas as criaturas em um cone de 12m sofrem 12d12 pontos de dano de fogo e ficam em chamas (Ref CD 32 reduz o dano à metade e evita a condição). Recarga (movimento)."
        },
        {
            "name": "Varrer",
            "timing": "livre",
            "text": "Uma vez por rodada, quando o dragão faz um ataque corpo a corpo e reduz os pontos de vida do alvo para 0 ou menos, pode realizar um ataque adicional contra outra criatura dentro do seu alcance."
        },
        {
            "name": "Imunidades Dracônicas",
            "timing": null,
            "text": "Dragões são imunes a efeitos de atordoamento, cansaço, dano do tipo de seu sopro, metamorfose e paralisia."
        },
        {
            "name": "Metamorfose Dracônica",
            "timing": "completa",
            "text": "Dragões jovens ou mais velhos podem se transformar em outras criaturas, como a magia Metamorfose (mas sem limitação para tamanhos menores que o seu). Eles costumam usar esta habilidade para se infiltrar em sociedades humanoides, aprender sobre seus costumes ou apenas quando não querem ser reconhecidos. Um dragão morto reverte à sua forma original."
        },
        {
            "name": "Magia Dracônica",
            "timing": null,
            "text": "Dragões adultos ou mais velhos podem lançar magias sem palavras mágicas, gestos ou concentração."
        }
    ],
    equipment: null,
    treasure: "Dobro e 4 peças de couro de dragão (CD 26 para extrair, veja o quadro na página 312).",
    skillsText: "Enganação +15, Intimidação +15, Misticismo +15"
};

export const dragaoVeneravel = {
    id: "dragao-veneravel",
    name: "Dragão Venerável",
    type: "monster",
    subtype: "dragão",
    size: "Enorme",
    challengeRating: 15,
    description: [],
    source: {
        "book": "Livro Básico",
        "pdfPage": 26,
        "bookPage": null
    },
    stats: {
        "initiative": 16,
        "perception": 22,
        "defense": 52,
        "fortitude": 28,
        "reflex": 15,
        "will": 22,
        "hitPoints": 800,
        "manaPoints": 97,
        "speedText": "12m (8q), voo 24m (16q)",
        "senses": "percepção às cegas, visão no escuro",
        "defensesText": "imunidade a fogo, redução de dano 15, resistência a magia +4, vulnerabilidade a frio; imunidade a atordoamento, cansaço, metamorfose e paralisia",
        "attributes": {
            "str": 13,
            "dex": 1,
            "con": 10,
            "int": 6,
            "wis": 6,
            "cha": 6
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +44 (4d12+40, 17) e duas garras +44 (3d12+40, 17)."
        }
    ],
    abilities: [
        {
            "name": "Aura Aterradora",
            "timing": null,
            "text": "A simples visão de um dragão adulto ou mais velho amedronta o mais valente dos aventureiros. Uma criatura que comece seu turno em alcance longo do dragão fica apavorada (se tiver 4 níveis ou menos) ou abalada (se tiver 5 níveis ou mais) até o fim da cena. Uma criatura que passe no teste de resistência fica imune a esta habilidade por um dia. Vontade CD 40 evita."
        },
        {
            "name": "Fluxo de Mana",
            "timing": null,
            "text": "O dragão venerável pode manter duas magias sustentadas simultaneamente com apenas uma ação livre (mas pagando o custo de cada uma)."
        },
        {
            "name": "Magia Acelerada",
            "timing": "livre",
            "text": "Uma vez por rodada, quando lança uma magia com execução de ação completa ou menor, o dragão muda a execução dela para livre.",
            "cost": "4 PM"
        },
        {
            "name": "Magia",
            "timing": null,
            "text": "O dragão venerável lança magias como um conjurador de 15º nível (CD 40)."
        },
        {
            "name": "Campo de Força",
            "timing": "reação",
            "text": "Quando sofre dano, o dragão recebe redução de dano 50 contra este dano.",
            "cost": "7 PM"
        },
        {
            "name": "Controlar a Gravidade",
            "timing": "padrão",
            "text": "O dragão controla os efeitos da gravidade em um cubo de 12m de lado em alcance médio (veja página 186).",
            "cost": "10 PM"
        },
        {
            "name": "Curar Ferimentos",
            "timing": "padrão",
            "text": "Uma criatura adjacente cura 16d8+16 PV.",
            "cost": "15 PM"
        },
        {
            "name": "Dissipar Magia",
            "timing": "padrão",
            "text": "O dragão escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias no alvo escolhido com CD menor que o resultado do teste são dissipadas.",
            "cost": "3 PM"
        },
        {
            "name": "Enfeitiçar",
            "timing": "padrão",
            "text": "Um humanoide em alcance curto fica enfeitiçado até o final da cena (Vontade evita).",
            "cost": "1 PM"
        },
        {
            "name": "Globo de Invulnerabilidade",
            "timing": "padrão",
            "text": "O dragão é envolto por uma esfera mágica com 3m de raio que detém qualquer magia de 3º círculo ou menor.",
            "cost": "10 PM"
        },
        {
            "name": "Velocidade",
            "timing": "padrão",
            "text": "O dragão pode executar uma ação padrão adicional por turno, que não pode ser usada para lançar magias.",
            "cost": "3 PM"
        },
        {
            "name": "Sopro",
            "timing": "padrão",
            "text": "Todas as criaturas em um cone de 15m sofrem 16d12 pontos de dano de fogo e ficam em chamas (Ref CD 40 reduz o dano à metade e evita a condição). Recarga (movimento)."
        },
        {
            "name": "Varrer",
            "timing": "livre",
            "text": "Uma vez por rodada, quando o dragão faz um ataque corpo a corpo e reduz os pontos de vida do alvo para 0 ou menos, pode realizar um ataque adicional contra outra criatura dentro do seu alcance."
        },
        {
            "name": "Imunidades Dracônicas",
            "timing": null,
            "text": "Dragões são imunes a efeitos de atordoamento, cansaço, dano do tipo de seu sopro, metamorfose e paralisia."
        },
        {
            "name": "Metamorfose Dracônica",
            "timing": "completa",
            "text": "Dragões jovens ou mais velhos podem se transformar em outras criaturas, como a magia Metamorfose (mas sem limitação para tamanhos menores que o seu). Eles costumam usar esta habilidade para se infiltrar em sociedades humanoides, aprender sobre seus costumes ou apenas quando não querem ser reconhecidos. Um dragão morto reverte à sua forma original."
        },
        {
            "name": "Magia Dracônica",
            "timing": null,
            "text": "Dragões adultos ou mais velhos podem lançar magias sem palavras mágicas, gestos ou concentração."
        }
    ],
    equipment: null,
    treasure: "Dobro e 4 peças de couro de dragão (CD 30 para extrair, veja o quadro ao lado).",
    skillsText: "Enganação +22, Intimidação +22, Intuição +22, Misticismo +22"
};

export const dragaoRei = {
    id: "dragao-rei",
    name: "Dragão Rei",
    type: "monster",
    subtype: "dragão",
    size: "Colossal",
    challengeRating: 20,
    description: [],
    source: {
        "book": "Livro Básico",
        "pdfPage": 27,
        "bookPage": null
    },
    stats: {
        "initiative": 19,
        "perception": 27,
        "defense": 62,
        "fortitude": 34,
        "reflex": 20,
        "will": 28,
        "hitPoints": 1400,
        "manaPoints": 128,
        "speedText": "12m (8q), voo 36m (24q)",
        "senses": "percepção às cegas, visão no escuro",
        "defensesText": "imunidade a fogo, redução de dano 20, resistência a magia +5, vulnerabilidade a frio; imunidade a atordoamento, cansaço, metamorfose e paralisia",
        "attributes": {
            "str": 17,
            "dex": 0,
            "con": 12,
            "int": 7,
            "wis": 7,
            "cha": 7
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +55 (6d20+50, 16) e duas garras +50 (6d20+50, 16)."
        }
    ],
    abilities: [
        {
            "name": "Aura Aterradora",
            "timing": null,
            "text": "A simples visão de um dragão adulto ou mais velho amedronta o mais valente dos aventureiros. Uma criatura que comece seu turno em alcance longo do dragão fica apavorada (se tiver 4 níveis ou menos) ou abalada (se tiver 5 níveis ou mais) até o fim da cena. Uma criatura que passe no teste de resistência fica imune a esta habilidade por um dia. Vontade CD 50 evita."
        },
        {
            "name": "Escamas Supremas",
            "timing": null,
            "text": "O dragão rei sofre apenas metade do dano de fontes mundanas."
        },
        {
            "name": "Fluxo de Mana",
            "timing": null,
            "text": "O dragão rei pode manter duas magias sustentadas simultaneamente com apenas uma ação livre (mas pagando o custo de cada uma)."
        },
        {
            "name": "Magia Acelerada",
            "timing": "livre",
            "text": "Uma vez por rodada, quando lança uma magia com execução de ação completa ou menor, o dragão muda a execução dela para livre.",
            "cost": "4 PM"
        },
        {
            "name": "Magia",
            "timing": null,
            "text": "O dragão rei lança magias como um conjurador de 20º nível (CD 50)."
        },
        {
            "name": "Campo de Força",
            "timing": "reação",
            "text": "Quando sofre dano, o dragão recebe redução de dano 50 contra este dano.",
            "cost": "7 PM"
        },
        {
            "name": "Controlar a Gravidade",
            "timing": "padrão",
            "text": "O dragão controla os efeitos da gravidade em um cubo de 12m de lado em alcance médio (veja página 186).",
            "cost": "10 PM"
        },
        {
            "name": "Controlar o Tempo",
            "timing": "padrão",
            "text": "O dragão controla o tempo ao seu redor (veja página 187).",
            "cost": "15 PM"
        },
        {
            "name": "Dissipar Magia",
            "timing": "padrão",
            "text": "O dragão escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias no alvo escolhido com CD menor que o resultado do teste são dissipadas.",
            "cost": "3 PM"
        },
        {
            "name": "Enfeitiçar",
            "timing": "padrão",
            "text": "Um humanoide em alcance curto fica enfeitiçado até o final da cena (Vontade evita).",
            "cost": "1 PM"
        },
        {
            "name": "Globo de Invulnerabilidade",
            "timing": "padrão",
            "text": "O dragão é envolto por uma esfera mágica com 3m de raio que detém qualquer magia de 4º círculo ou menor.",
            "cost": "15 PM"
        },
        {
            "name": "Segunda Chance",
            "timing": "padrão",
            "text": "Uma criatura adjacente cura 300 PV e condições (veja a página 205).",
            "cost": "20 PM"
        },
        {
            "name": "Velocidade",
            "timing": "padrão",
            "text": "O dragão pode executar uma ação padrão adicional por turno.",
            "cost": "10 PM"
        },
        {
            "name": "Sopro",
            "timing": "padrão",
            "text": "Todas as criaturas em um cone de 18m sofrem 20d12 pontos de dano de fogo e ficam em chamas (Ref CD 50 reduz o dano à metade e evita a condição). Recarga (movimento)."
        },
        {
            "name": "Varrer",
            "timing": "livre",
            "text": "Uma vez por rodada, quando o dragão faz um ataque corpo a corpo e reduz os pontos de vida do alvo para 0 ou menos, pode realizar um ataque adicional contra outra criatura dentro do seu alcance."
        },
        {
            "name": "Imunidades Dracônicas",
            "timing": null,
            "text": "Dragões são imunes a efeitos de atordoamento, cansaço, dano do tipo de seu sopro, metamorfose e paralisia."
        },
        {
            "name": "Metamorfose Dracônica",
            "timing": "completa",
            "text": "Dragões jovens ou mais velhos podem se transformar em outras criaturas, como a magia Metamorfose (mas sem limitação para tamanhos menores que o seu). Eles costumam usar esta habilidade para se infiltrar em sociedades humanoides, aprender sobre seus costumes ou apenas quando não querem ser reconhecidos. Um dragão morto reverte à sua forma original."
        },
        {
            "name": "Magia Dracônica",
            "timing": null,
            "text": "Dragões adultos ou mais velhos podem lançar magias sem palavras mágicas, gestos ou concentração."
        }
    ],
    equipment: null,
    treasure: "Dobro e 6 peças couro de dragão (CD 26 para extrair, veja o quadro na página 312).",
    skillsText: "Enganação +26, Intimidação +26, Intuição +26, Misticismo +26"
};

export const uktril = {
    id: "uktril",
    name: "Uktril",
    type: "monster",
    subtype: "lefeu",
    size: "Médio",
    challengeRating: 3,
    description: [
        "Mesmo o lefeu mais comum e mais fraco é uma abominação perversa, uma combinação impossível de humano e formiga, com garras cruéis que gotejam muco. Estes monstros rondam as fronteiras das áreas de Tormenta em pequenos grupos, não raras vezes infestando masmorras e regiões vizinhas. Também podem ser conjurados por magias profanas ou oferecidos por Aharadak como servos para cultistas."
    ],
    source: {
        "book": "Livro Básico",
        "pdfPage": 29,
        "bookPage": null
    },
    stats: {
        "initiative": 9,
        "perception": 10,
        "defense": 22,
        "fortitude": 12,
        "reflex": 11,
        "will": 6,
        "hitPoints": 45,
        "speedText": "9m (6q)",
        "senses": "visão no escuro",
        "defensesText": "redução de dano 10; imunidade a acertos críticos, ácido, cansaço, eletricidade, fogo, frio, luz, paralisia, metabolismo, metamorfose, trevas e veneno",
        "attributes": {
            "str": 5,
            "dex": 4,
            "con": 2,
            "int": -1,
            "wis": 2,
            "cha": -4
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Pinça +16 (2d6+6, 19) e garra +16 (1d6+6)."
        }
    ],
    abilities: [
        {
            "name": "Insanidade da Tormenta",
            "timing": null,
            "text": "Uma criatura que veja um ou mais lefeu deve fazer um teste de Vontade contra o lefeu de maior ND. Se falhar, perde os PM indicados (+1 PM para cada lefeu além do primeiro). Se for reduzida a 0 PM, fica confusa. Uma criatura só é afetada por esta habilidade uma vez por dia. Nesta ficha: 1d6 PM (Vontade CD 17 evita)."
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
    equipment: null,
    treasure: "Nenhum.",
    skillsText: null
};

export const geraktril = {
    id: "geraktril",
    name: "Geraktril",
    type: "monster",
    subtype: "lefeu",
    size: "Médio",
    challengeRating: 6,
    description: [
        "Versão maior e mais avançada dos uktril, são abominações de três braços com pinças capazes de cortar homens ao meio. Podem ser encontrados liderando bandos uktril ou em pequenos grupos próprios. São também emissários sagrados de Aharadak, às vezes manifestando-se em cerimônias profanas para abater vítimas oferecidas em sacrifício."
    ],
    source: {
        "book": "Livro Básico",
        "pdfPage": 29,
        "bookPage": null
    },
    stats: {
        "initiative": 13,
        "perception": 16,
        "defense": 30,
        "fortitude": 18,
        "reflex": 15,
        "will": 6,
        "hitPoints": 240,
        "speedText": "9m (6q)",
        "senses": "visão no escuro",
        "defensesText": "redução de dano 10; imunidade a acertos críticos, ácido, cansaço, eletricidade, fogo, frio, luz, paralisia, metabolismo, metamorfose, trevas e veneno",
        "attributes": {
            "str": 7,
            "dex": 5,
            "con": 3,
            "int": 1,
            "wis": 3,
            "cha": -1
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Duas pinças +23 (3d6+10, 19) e garra +23 (1d8+10)."
        }
    ],
    abilities: [
        {
            "name": "Insanidade da Tormenta",
            "timing": null,
            "text": "Uma criatura que veja um ou mais lefeu deve fazer um teste de Vontade contra o lefeu de maior ND. Se falhar, perde os PM indicados (+1 PM para cada lefeu além do primeiro). Se for reduzida a 0 PM, fica confusa. Uma criatura só é afetada por esta habilidade uma vez por dia. Nesta ficha: 2d4 PM (Vontade CD 22 evita)."
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
    equipment: null,
    treasure: "Nenhum.",
    skillsText: null
};

export const reishid = {
    "id": "reishid",
    "name": "Reishid",
    "type": "monster",
    "subtype": "lefeu",
    "size": "Médio",
    "challengeRating": 8,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 58,
        "bookPage": 56
    },
    "stats": {
        "initiative": 17,
        "perception": 19,
        "defense": 37,
        "fortitude": 19,
        "reflex": 21,
        "will": 10,
        "hitPoints": 295,
        "speedText": "9m (6q), escalada 9m (6q), voo 15m (10q)",
        "senses": "visão no escuro",
        "defensesText": "redução de dano 10",
        "attributes": {
            "str": 4,
            "dex": 7,
            "con": 4,
            "int": 4,
            "wis": 4,
            "cha": 1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Adaga da Tormenta +30 (1d4+18, 19, mais 1d8 trevas), garra +30 (1d6+18) e mordida +30 (1d6+18 mais veneno)."
        }
    ],
    "abilities": [
        {
            "name": "Ataque em Movimento",
            "timing": null,
            "text": "O reishid pode se mover antes e depois de executar a ação agredir, desde que a distância total percorrida não seja maior que seu deslocamento."
        },
        {
            "name": "Ataque Reflexo",
            "timing": "reação",
            "text": "Uma vez por rodada, o reishid pode fazer um ataque corpo a corpo contra um alvo em seu alcance natural que esteja desprevenido ou que se mova voluntariamente para fora desse alcance."
        },
        {
            "name": "Insanidade da Tormenta",
            "timing": null,
            "text": "2d6 PM (Von CD 26 evita)."
        },
        {
            "name": "Sombra Rubra",
            "timing": null,
            "text": "Quando faz um teste de Iniciativa ou Furtividade, o reishid rola dois dados e usa o melhor resultado."
        },
        {
            "name": "Veneno",
            "timing": null,
            "text": "Paralisado por 1d6 horas (Fort CD 26 reduz para lento por 1d6 rodadas)."
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
    "equipment": null,
    "treasure": "Padrão mais adaga da Tormenta. Esta é uma arma mágica específica que conta como uma adaga formidável tumular. Sua lâmina é longa e ondulada e seu cabo lembra uma carapaça. A adaga secreta muco adesivo pelo cabo, que mantém a arma firme na mão, fornecendo +5 em testes contra desarmar. Soltar uma adaga da Tormenta gasta uma ação de movimento.",
    "skillsText": "Furtividade +20"
};

const reishidBasic = {
    ...reishid,
    id: "reishid-livro-basico",
    variantOf: reishid.id,
    source: undefined,
    abilities: reishid.abilities.map(ability => ability.name === "Ataque Reflexo"
        ? {
            ...ability,
            text: "Uma vez por rodada, o reishid pode fazer um ataque corpo a corpo contra um alvo adjacente que esteja desprevenido ou que se mova para fora de seu alcance."
        }
        : ability)
};

export const otyugh = {
    id: "otyugh",
    name: "Otyugh",
    type: "monster",
    subtype: null,
    size: "Grande",
    challengeRating: 5,
    description: [
        "Este monstro disforme e repugnante surge em lugares maculados pela Tormenta — especialmente pântanos, esgotos e masmorras — sendo fruto da corrupção aberrante. O corpo pustulento de um otyugh possui três patas, bocarra descomunal e tentáculos espinhosos. Até onde se sabe, seu único propósito é devorar tudo em seu caminho."
    ],
    source: {
        "book": "Livro Básico",
        "pdfPage": 30,
        "bookPage": null
    },
    stats: {
        "initiative": 3,
        "perception": 10,
        "defense": 24,
        "fortitude": 17,
        "reflex": 11,
        "will": 5,
        "hitPoints": 213,
        "speedText": "6m (4q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a doenças e venenos, redução de dano 5",
        "attributes": {
            "str": 5,
            "dex": -1,
            "con": 4,
            "int": -2,
            "wis": 1,
            "cha": -2
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Dois tentáculos +17 (1d8+9, alcance 4,5m) e mordida +17 (1d6+9 mais doença)."
        }
    ],
    abilities: [
        {
            "name": "Agarrar Aprimorado",
            "timing": "livre",
            "text": "Se o otyugh acerta um ataque de tentáculo, pode fazer a manobra agarrar (teste +19)."
        },
        {
            "name": "Constrição",
            "timing": "livre",
            "text": "No início de cada um de seus turnos, o otyugh causa 1d8+9 pontos de dano de impacto em qualquer criatura que esteja agarrando."
        },
        {
            "name": "Doença",
            "timing": null,
            "text": "Uma criatura mordida por um otyugh é exposta a doença infecção do esgoto (veja a página 318)."
        }
    ],
    equipment: null,
    treasure: "Padrão.",
    skillsText: "Furtividade +3 (+13 em seu refúgio)"
};

export const carrascoDeLeena = {
    "id": "carrasco-de-lena",
    "name": "Carrasco de Lena",
    "type": "monster",
    "subtype": null,
    "size": "Grande",
    "challengeRating": 6,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 106,
        "bookPage": 104
    },
    "stats": {
        "initiative": 6,
        "perception": 6,
        "defense": 27,
        "fortitude": 16,
        "reflex": 12,
        "will": 8,
        "hitPoints": 180,
        "speedText": "9m (6q)",
        "senses": "visão no escuro",
        "defensesText": null,
        "attributes": {
            "str": 5,
            "dex": 1,
            "con": 4,
            "int": -4,
            "wis": 1,
            "cha": -2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Tentáculo +20 (2d6+10 corte) e mordida +20 (2d8+20)."
        }
    ],
    "abilities": [
        {
            "name": "Açoite Circular",
            "timing": "padrão",
            "text": "O carrasco de Lena agita seu tentáculo, causando 2d6+10 pontos de dano de corte em todas as criaturas a até 3m (Ref CD 22 reduz à metade)."
        },
        {
            "name": "Inversão de Dano",
            "timing": null,
            "text": "O carrasco converte qualquer dano recebido em cura. Caso ele já esteja com PV máximos, recebe PV temporários com um limite igual aos seus PV máximos (ou seja, pode acumular até 180 PV temporários)."
        },
        {
            "name": "Vulnerabilidade a Cura",
            "timing": null,
            "text": "Efeitos de cura causam dano ao carrasco (em vez de curar PV). Itens alquímicos e poções de cura podem ser usados como granadas contra o carrasco; a criatura reduz o dano à metade caso passe em um teste de Reflexos contra a CD do item."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": null,
    "role": "special",
    "roleSource": "pdf-review"
};

export const ente = {
    "id": "ente",
    "name": "Ente",
    "type": "monster",
    "subtype": null,
    "size": "Enorme",
    "challengeRating": 8,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 108,
        "bookPage": 106,
        "pdfPageEnd": 109,
        "bookPageEnd": 107
    },
    "stats": {
        "initiative": 7,
        "perception": 11,
        "defense": 34,
        "fortitude": 21,
        "reflex": 8,
        "will": 15,
        "hitPoints": 310,
        "speedText": "9m (6q)",
        "senses": "visão no escuro",
        "defensesText": "fortificação 25%; imunidade a sangramento; natureza vegetal; redução de dano 10/corte; vulnerabilidade a fogo",
        "attributes": {
            "str": 9,
            "dex": -1,
            "con": 5,
            "int": 1,
            "wis": 3,
            "cha": 1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Duas pancadas +26 (4d8+16)."
        }
    ],
    "abilities": [
        {
            "name": "Árvore Ancestral",
            "timing": null,
            "text": "Cada ente possui uma habilidade entre Carvalho, Jasmim, Nogueira, Salgueiro e Sequoia, representando sua origem."
        },
        {
            "name": "Carvalho",
            "timing": null,
            "text": "Os ataques do ente causam 50% a mais de dano contra construtos e objetos."
        },
        {
            "name": "Jasmim",
            "timing": null,
            "text": "O ente emana uma nuvem de perfume em uma esfera de 9m ao seu redor. Qualquer criatura nessa área que tente fazer uma ação hostil contra o ente deve fazer um teste de Vontade (CD 26). Se falhar, perde sua ação. Se passar, fica imune a esta habilidade por uma cena. Metabolismo."
        },
        {
            "name": "Nogueira",
            "timing": "movimento",
            "text": "O ente arremessa uma noz em uma criatura em alcance curto. O alvo sofre 2d6+8 pontos de dano de impacto (Ref CD 26 evita). Recarga (movimento)."
        },
        {
            "name": "Salgueiro",
            "timing": null,
            "text": "Quando acerta um ataque de pancada, o ente pode usar a manobra agarrar (teste +31) como uma ação livre. Uma criatura agarrada dessa forma é erguida 4,5m e cai dessa altura caso se solte."
        },
        {
            "name": "Sequoia",
            "timing": null,
            "text": "O dano da habilidade Atropelamento do ente aumenta para 4d8+8, e a CD para resistir a ela se torna 29."
        },
        {
            "name": "Atropelamento",
            "timing": "completa",
            "text": "O ente percorre até o dobro do seu deslocamento. Ele pode passar pelo espaço ocupado de quaisquer inimigos menores que ele, mas não pode passar duas vezes pelo mesmo espaço. Criaturas atropeladas desta forma sofrem 2d8+8 pontos de dano de impacto e ficam caídas (Ref CD 26 reduz à metade e evita a condição). Recarga (movimento)."
        },
        {
            "name": "Pastor de Árvores",
            "timing": "completa",
            "text": "Uma vez por dia, o ente anima até duas árvores em alcance curto, que se desenraízam e lutam com as mesmas estatísticas de um ente, mas com deslocamento 3m, Inteligência –4 e sem esta habilidade. Depois de um dia as árvores voltam ao normal, enraizando-se onde estiverem."
        }
    ],
    "equipment": null,
    "treasure": "Padrão mais lasca de ente (CD 23 para extrair, vale T$ 70 para fabricar um dedo de ente).",
    "skillsText": "Furtividade +2 (+12 em florestas), Intuição +11, Sobrevivência +16"
};

export const estirge = {
    "id": "estirge",
    "name": "Estirge",
    "type": "monster",
    "subtype": null,
    "size": "Minúsculo",
    "challengeRating": 1,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 109,
        "bookPage": 107,
        "pdfPageEnd": 110,
        "bookPageEnd": 108
    },
    "stats": {
        "initiative": 7,
        "perception": 2,
        "defense": 16,
        "fortitude": 1,
        "reflex": 10,
        "will": 5,
        "hitPoints": 9,
        "speedText": "voo 12m (8q)",
        "senses": "faro, visão no escuro",
        "defensesText": null,
        "attributes": {
            "str": -4,
            "dex": 5,
            "con": -1,
            "int": -5,
            "wis": 0,
            "cha": -2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Probóscide +11 (1 perfuração)."
        }
    ],
    "abilities": [
        {
            "name": "Agarrar Aprimorado",
            "timing": "livre",
            "text": "Probóscide (teste +21)."
        },
        {
            "name": "Chupar Sangue",
            "timing": "livre",
            "text": "Quando agarra uma criatura, e no início de cada um de seus turnos enquanto permanecer agarrando, o estirge drena sangue como um efeito metabólico; a vítima perde 3d6 pontos de vida e ele ganha a mesma quantidade de PV temporários. Após drenar 10 pontos de vida ou mais, o estirge se solta e tenta fugir."
        },
        {
            "name": "Sangrar",
            "timing": null,
            "text": "Quando o estirge solta uma criatura de quem estava drenando sangue (por vontade própria ou não), a vítima fica sangrando."
        }
    ],
    "equipment": null,
    "treasure": "Ova de estirge.",
    "skillsText": null
};

export const enxameEstirge = {
    "id": "enxame-estirge",
    "name": "Enxame Estirge",
    "type": "monster",
    "subtype": null,
    "size": "Médio",
    "challengeRating": 5,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 110,
        "bookPage": 108
    },
    "stats": {
        "initiative": 9,
        "perception": 4,
        "defense": 23,
        "fortitude": 6,
        "reflex": 16,
        "will": 11,
        "hitPoints": 40,
        "speedText": "voo 12m (8q)",
        "senses": "faro, visão no escuro",
        "defensesText": null,
        "attributes": {
            "str": -3,
            "dex": 5,
            "con": -1,
            "int": -5,
            "wis": 0,
            "cha": -2
        }
    },
    "actions": [
        {
            "name": "Enxame",
            "text": "1d6 pontos de dano de perfuração. Para cada ponto de dano sofrido dessa forma, uma criatura perde 1d6 pontos de vida como um efeito metabólico."
        }
    ],
    "abilities": [
        {
            "name": "Chupar Sangue",
            "timing": null,
            "text": "Para cada ponto de vida que o enxame fizer uma criatura perder, ele ganha 1 PV temporário."
        },
        {
            "name": "Sangrar",
            "timing": null,
            "text": "Uma criatura que perca pontos de vida para o enxame estirge fica sangrando (Fort CD 20 evita)."
        }
    ],
    "equipment": null,
    "treasure": "Ova de estirge.",
    "skillsText": null
};

export const nuvemDeEstirges = {
    "id": "nuvem-de-estirges",
    "name": "Nuvem de Estirges",
    "type": "monster",
    "subtype": null,
    "size": "Enorme",
    "challengeRating": 16,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 110,
        "bookPage": 108
    },
    "stats": {
        "initiative": 19,
        "perception": 14,
        "defense": 51,
        "fortitude": 17,
        "reflex": 29,
        "will": 24,
        "hitPoints": 180,
        "speedText": "voo 12m (8q)",
        "senses": "faro, visão no escuro",
        "defensesText": null,
        "attributes": {
            "str": -2,
            "dex": 5,
            "con": -1,
            "int": -5,
            "wis": 0,
            "cha": -2
        }
    },
    "actions": [
        {
            "name": "Enxame",
            "text": "10d6 pontos de dano de perfuração. Para cada ponto de dano sofrido dessa forma, uma criatura perde 1d6 pontos de vida como um efeito metabólico."
        }
    ],
    "abilities": [
        {
            "name": "Chupar Sangue",
            "timing": null,
            "text": "Para cada ponto de vida que o enxame fizer uma criatura perder, ele ganha 1 PV temporário."
        },
        {
            "name": "Sangrar",
            "timing": null,
            "text": "Uma criatura que perca pontos de vida para o enxame estirge fica sangrando (Fort CD 40 evita)."
        },
        {
            "name": "Zumbido Atordoante",
            "timing": null,
            "text": "Criaturas dentro da nuvem de estirges ficam ofuscadas e surdas."
        }
    ],
    "equipment": null,
    "treasure": "Ova de estirge.",
    "skillsText": null
};

export const feraVassalo = {
    "id": "fera-vassalo",
    "name": "Fera-Vassalo",
    "type": "monster",
    "subtype": null,
    "size": "Médio",
    "challengeRating": 3,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 110,
        "bookPage": 108,
        "pdfPageEnd": 111,
        "bookPageEnd": 109
    },
    "stats": {
        "initiative": 3,
        "perception": 3,
        "defense": 21,
        "fortitude": 10,
        "reflex": 13,
        "will": 4,
        "hitPoints": 22,
        "speedText": "9m (6q)",
        "senses": null,
        "defensesText": "natureza vegetal; vulnerabilidade a frio",
        "attributes": {
            "str": 4,
            "dex": 0,
            "con": 3,
            "int": -2,
            "wis": 0,
            "cha": -3
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Duas garras +15 (2d6+6)."
        },
        {
            "name": "À Distância",
            "text": "Dois espinhos +15 (2d6+3 perfuração, alcance curto)."
        }
    ],
    "abilities": [
        {
            "name": "Agarrar Aprimorado",
            "timing": "livre",
            "text": "Garra (teste +15)."
        },
        {
            "name": "Corpo Espinhoso",
            "timing": null,
            "text": "Qualquer criatura que erre um ataque corpo a corpo adjacente, desarmado ou com uma arma natural, contra a fera-vassalo sofre 2d4+3 pontos de dano de perfuração (Ref CD 17 evita)."
        },
        {
            "name": "Drenar Sangue",
            "timing": "completa",
            "text": "Se a fera-vassalo iniciar seu turno agarrando uma criatura, pode drenar o sangue dela. A vítima perde 2d4+3 pontos de vida e a fera recupera a mesma quantidade de PV."
        }
    ],
    "equipment": null,
    "treasure": "Espinhos (CD 18 para extrair, valem T$ 50 para fabricar flechas superiores).",
    "skillsText": null
};

export const feraLider = {
    "id": "fera-lider",
    "name": "Fera-Líder",
    "type": "monster",
    "subtype": null,
    "size": "Médio",
    "challengeRating": 5,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 111,
        "bookPage": 109
    },
    "stats": {
        "initiative": 4,
        "perception": 4,
        "defense": 25,
        "fortitude": 12,
        "reflex": 16,
        "will": 5,
        "hitPoints": 195,
        "speedText": "9m (6q)",
        "senses": null,
        "defensesText": "natureza vegetal; vulnerabilidade a frio",
        "attributes": {
            "str": 5,
            "dex": 0,
            "con": 4,
            "int": -2,
            "wis": 0,
            "cha": -2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Duas garras +16 (2d6+12)."
        },
        {
            "name": "À Distância",
            "text": "Dois espinhos +16 (2d6+6 perfuração, alcance curto)."
        }
    ],
    "abilities": [
        {
            "name": "Agarrar Aprimorado",
            "timing": "livre",
            "text": "Garra (teste +16)."
        },
        {
            "name": "Corpo Espinhoso",
            "timing": null,
            "text": "Qualquer criatura que erre um ataque corpo a corpo contra a fera-líder sofre 2d4+6 pontos de dano de perfuração (Ref CD 20 evita)."
        },
        {
            "name": "Drenar Sangue",
            "timing": "completa",
            "text": "Se a fera-líder iniciar seu turno agarrando uma criatura, pode drenar o sangue dessa criatura. A fera causa 2d6+4 pontos de dano na vítima e recupera a mesma quantidade de pontos de vida."
        }
    ],
    "equipment": null,
    "treasure": "Espinhos (CD 20 para extrair, valem T$ 150 para fabricar flechas superiores).",
    "skillsText": null
};

export const feraMae = {
    "id": "fera-mae",
    "name": "Fera-Mãe",
    "type": "monster",
    "subtype": null,
    "size": "Enorme",
    "challengeRating": 13,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 111,
        "bookPage": 109
    },
    "stats": {
        "initiative": 7,
        "perception": 24,
        "defense": 45,
        "fortitude": 28,
        "reflex": 8,
        "will": 23,
        "hitPoints": 685,
        "speedText": "0m (0q)",
        "senses": null,
        "defensesText": "natureza vegetal; redução de dano 15/corte mágico; vulnerabilidade a frio",
        "attributes": {
            "str": 8,
            "dex": -3,
            "con": 8,
            "int": 2,
            "wis": 4,
            "cha": -2
        }
    },
    "actions": [],
    "abilities": [
        {
            "name": "Corpo Espinhoso",
            "timing": null,
            "text": "Qualquer criatura que erre um ataque corpo a corpo contra a fera-mãe sofre 2d8+10 pontos de dano de perfuração mais veneno (Ref CD 35 evita)."
        },
        {
            "name": "Saraivada de Espinhos",
            "timing": "padrão",
            "text": "A fera-mãe dispara espinhos em criaturas a sua escolha em alcance médio. Cada criatura sofre 12d12+24 pontos de dano de perfuração mais veneno (Ref CD 35 reduz à metade)."
        },
        {
            "name": "Veneno",
            "timing": null,
            "text": "Peçonha potente (perde 2d12 PV por rodada durante 3 rodadas, Fort CD 35 reduz a duração para 1 rodada)."
        }
    ],
    "equipment": null,
    "treasure": "1d4+1 doses de peçonha potente (CD 28 para extrair) e espinhos (CD 28 para extrair, valem T$ 1.000 para fabricar flechas superiores).",
    "skillsText": null
};

export const enxameLarval = {
    "id": "enxame-larval",
    "name": "Enxame Larval",
    "type": "monster",
    "subtype": "kobold",
    "size": "Médio",
    "challengeRating": 1,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 182,
        "bookPage": 180
    },
    "stats": {
        "initiative": 7,
        "perception": 3,
        "defense": 16,
        "fortitude": 5,
        "reflex": 11,
        "will": 0,
        "hitPoints": 30,
        "speedText": "6m (4q), escavação 6m (4q)",
        "senses": "sensibilidade a luz, visão no escuro",
        "defensesText": "imunidade a corte e perfuração",
        "attributes": {
            "str": -1,
            "dex": 2,
            "con": 0,
            "int": -4,
            "wis": -1,
            "cha": -3
        }
    },
    "actions": [
        {
            "name": "Enxame",
            "text": "3d4 perfuração."
        }
    ],
    "abilities": [
        {
            "name": "Distração",
            "timing": null,
            "text": "Uma criatura que comece seu turno dentro do espaço do enxame não pode fazer ações que exijam concentração, como lançar magias, e sofre –2 em perícias (Fort CD 15 evita ambos). Estes efeitos duram até ela sair da área do enxame e se livrar dos kobolds."
        },
        {
            "name": "Entrar nas Roupas",
            "timing": null,
            "text": "Quando uma criatura sai do espaço do enxame, algumas larvas ficam dentro de suas roupas. Se falhou no teste de resistência, a criatura continua sofrendo os efeitos de Distração até gastar uma ação padrão para se livrar das larvas."
        },
        {
            "name": "Detonação Final (opcional)",
            "timing": null,
            "text": "Variante opcional (Qualquer Kobold Pode Explodir, p. 185). Se o mestre usar a versão explosiva desta ficha, o ND aumenta em +1 apenas para efeitos de experiência. Quando o enxame é reduzido a 0 PV, role 1d6: com um resultado 1 ou 2, ocorre uma explosão. Todas as criaturas a até 3m sofrem 4d6 pontos de dano de impacto (Ref CD 14 reduz à metade)."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": null,
    "role": "minion",
    "roleSource": "pdf-review"
};

export const koboldPatrulheiro = {
    "id": "kobold-patrulheiro",
    "name": "Kobold Patrulheiro",
    "type": "monster",
    "subtype": "kobold",
    "size": "Pequeno",
    "challengeRating": 0.5,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 183,
        "bookPage": 181
    },
    "stats": {
        "initiative": 4,
        "perception": 0,
        "defense": 14,
        "fortitude": 3,
        "reflex": 5,
        "will": 0,
        "hitPoints": 6,
        "speedText": "9m (6q)",
        "senses": "sensibilidade a luz, visão no escuro",
        "defensesText": null,
        "attributes": {
            "str": 1,
            "dex": 2,
            "con": 0,
            "int": -1,
            "wis": 0,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Lança +9 (1d6+1)."
        },
        {
            "name": "À Distância",
            "text": "Funda +9 (1d4+6)."
        }
    ],
    "abilities": [
        {
            "name": "Peste Oportunista",
            "timing": null,
            "text": "Os ataques do kobold patrulheiro causam +1d4 pontos de dano contra inimigos que já sofreram dano na rodada."
        },
        {
            "name": "Detonação Final (opcional)",
            "timing": null,
            "text": "Variante opcional (Qualquer Kobold Pode Explodir, p. 185). Se o mestre usar a versão explosiva desta ficha, o ND aumenta em +1 apenas para efeitos de experiência. Quando o kobold é reduzido a 0 PV, role 1d6: com um resultado 1 ou 2, ocorre uma explosão. Todas as criaturas a até 3m sofrem 4d6 pontos de dano de impacto (Ref CD 13 reduz à metade)."
        }
    ],
    "equipment": "Funda, lança, pedras x20",
    "treasure": "Metade.",
    "skillsText": "Furtividade +8",
    "role": "minion",
    "roleSource": "pdf-review"
};

export const koboldVeterano = {
    "id": "kobold-veterano",
    "name": "Kobold Veterano",
    "type": "monster",
    "subtype": "kobold",
    "size": "Pequeno",
    "challengeRating": 2,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 183,
        "bookPage": 181
    },
    "stats": {
        "initiative": 5,
        "perception": 1,
        "defense": 19,
        "fortitude": 7,
        "reflex": 12,
        "will": 3,
        "hitPoints": 13,
        "speedText": "9m (6q)",
        "senses": "sensibilidade a luz, visão no escuro",
        "defensesText": null,
        "attributes": {
            "str": 1,
            "dex": 2,
            "con": 0,
            "int": -1,
            "wis": 0,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Lança +14 x2 (1d6+6)."
        },
        {
            "name": "À Distância",
            "text": "Funda +14 (2d4+12)."
        }
    ],
    "abilities": [
        {
            "name": "Muito Já Apanhei",
            "timing": null,
            "text": "O kobold veterano ignora todo o dano do primeiro ataque que sofre em cada cena."
        },
        {
            "name": "Peste Oportunista",
            "timing": null,
            "text": "Os ataques do kobold causam +1d4 pontos de dano contra inimigos que já sofreram dano na rodada."
        },
        {
            "name": "Detonação Final (opcional)",
            "timing": null,
            "text": "Variante opcional (Qualquer Kobold Pode Explodir, p. 185). Se o mestre usar a versão explosiva desta ficha, o ND aumenta em +1 apenas para efeitos de experiência. Quando o kobold é reduzido a 0 PV, role 1d6: com um resultado 1 ou 2, ocorre uma explosão. Todas as criaturas a até 3m sofrem 4d6 pontos de dano de impacto (Ref CD 16 reduz à metade)."
        }
    ],
    "equipment": "Armadura de couro, funda, lança, pedras x20",
    "treasure": "Metade.",
    "skillsText": "Furtividade +9",
    "role": "minion",
    "roleSource": "pdf-review"
};

export const patrulhaKobold = {
    "id": "patrulha-kobold",
    "name": "Patrulha Kobold",
    "type": "monster",
    "subtype": "kobold",
    "size": "Médio",
    "challengeRating": 4,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 183,
        "bookPage": 181
    },
    "stats": {
        "initiative": 6,
        "perception": 2,
        "defense": 23,
        "fortitude": 10,
        "reflex": 15,
        "will": 5,
        "hitPoints": 30,
        "speedText": "9m (6q)",
        "senses": "sensibilidade a luz, visão no escuro",
        "defensesText": null,
        "attributes": {
            "str": 1,
            "dex": 2,
            "con": 0,
            "int": -1,
            "wis": 0,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "[Bando] Lança +17 (1d6+1)."
        },
        {
            "name": "À Distância",
            "text": "[Bando] Funda +17 (1d4+6)."
        }
    ],
    "abilities": [
        {
            "name": "Peste Oportunista",
            "timing": null,
            "text": "Os ataques da patrulha kobold causam +1d4 pontos de dano contra inimigos que já sofreram dano na rodada."
        },
        {
            "name": "Detonação Final (opcional)",
            "timing": null,
            "text": "Variante opcional (Qualquer Kobold Pode Explodir, p. 185). Se o mestre usar a versão explosiva desta ficha, o ND aumenta em +1 apenas para efeitos de experiência. Quando a patrulha é reduzida a 0 PV, role 1d6: com um resultado 1 ou 2, ocorre uma explosão. Todas as criaturas a até 3m sofrem 4d6 pontos de dano de impacto (Ref CD 18 reduz à metade)."
        }
    ],
    "equipment": "Funda, lança, pedras x20 (1d8 de cada)",
    "treasure": "Metade.",
    "skillsText": "Furtividade +8",
    "role": "minion",
    "roleSource": "pdf-review"
};

export const koboldExplosivo = {
    "id": "kobold-explosivo",
    "name": "Kobold Explosivo",
    "type": "monster",
    "subtype": "kobold",
    "size": "Pequeno",
    "challengeRating": 1,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 187,
        "bookPage": 185
    },
    "stats": {
        "initiative": 4,
        "perception": 0,
        "defense": 15,
        "fortitude": 5,
        "reflex": 10,
        "will": 1,
        "hitPoints": 9,
        "speedText": "9m (6q)",
        "senses": "sensibilidade a luz, visão no escuro",
        "defensesText": null,
        "attributes": {
            "str": 1,
            "dex": 2,
            "con": 0,
            "int": -1,
            "wis": 0,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Lança +11 (1d6+9)."
        },
        {
            "name": "À Distância",
            "text": "Funda +11 (1d4+9)."
        }
    ],
    "abilities": [
        {
            "name": "Detonação Final",
            "timing": null,
            "text": "Quando o kobold é reduzido a 0 PV, role 1d6: com um resultado 1 ou 2, ocorre uma explosão. Todas as criaturas a até 3m sofrem 4d6 pontos de dano de impacto (Ref CD 14 reduz à metade)."
        },
        {
            "name": "Peste Oportunista",
            "timing": null,
            "text": "Os ataques do kobold explosivo causam +1d4 pontos de dano contra inimigos que já sofreram dano na rodada."
        }
    ],
    "equipment": "Funda, lança, pedras x20",
    "treasure": "Metade.",
    "skillsText": null,
    "role": "minion",
    "roleSource": "pdf-review"
};

export const koboldXama = {
    "id": "kobold-xama",
    "name": "Kobold Xamã",
    "type": "monster",
    "subtype": "kobold",
    "size": "Pequeno",
    "challengeRating": 3,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 188,
        "bookPage": 186
    },
    "stats": {
        "initiative": 5,
        "perception": 6,
        "defense": 20,
        "fortitude": 3,
        "reflex": 9,
        "will": 15,
        "hitPoints": 69,
        "manaPoints": 15,
        "speedText": "9m (6q)",
        "senses": "sensibilidade a luz, visão no escuro",
        "defensesText": "resistência a magia +1",
        "attributes": {
            "str": 0,
            "dex": 2,
            "con": 1,
            "int": -1,
            "wis": 3,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Gadanho +12 (2d4+3, x4) e mordida +12 (1d4+3)."
        },
        {
            "name": "À Distância",
            "text": "Funda +12 (1d6+3)."
        }
    ],
    "abilities": [
        {
            "name": "Aura de Medo",
            "magical": true,
            "timing": "livre",
            "cost": "2 PM",
            "text": "O xamã gera uma aura de medo de 9m de raio e duração cena. Todos os inimigos que entram na aura ficam abalados até o fim da cena (Von CD 19 evita) e a criatura não pode mais ser abalada por esta habilidade por um dia."
        },
        {
            "name": "Peste Oportunista",
            "timing": null,
            "text": "Os ataques do xamã causam +1d4 pontos de dano contra inimigos que já sofreram dano na rodada."
        },
        {
            "name": "Símbolo Sagrado Energizado",
            "magical": true,
            "timing": "movimento",
            "cost": "1 PM",
            "text": "O xamã energiza seu símbolo sagrado. Até o fim da cena, ele emite uma luz avermelhada que ilumina como uma tocha e, enquanto estiver sendo empunhado pelo xamã, reduz o custo de magias divinas em –1 PM."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como um clérigo de Kallyadranoch de 3º nível (CD 19)."
        },
        {
            "name": "Curar Ferimentos",
            "timing": "padrão",
            "cost": "3 PM",
            "text": "Uma criatura adjacente cura 4d8+4 PV."
        },
        {
            "name": "Escudo da Fé",
            "timing": "reação",
            "cost": "1 PM",
            "text": "Quando o xamã ou um aliado em alcance curto sofre um ataque, o alvo recebe +2 na Defesa até seu próximo turno."
        },
        {
            "name": "Perdição",
            "timing": "padrão",
            "cost": "1 PM",
            "text": "Criaturas escolhidas em alcance curto sofrem –1 em testes de ataque e rolagens de dano até o fim da cena."
        },
        {
            "name": "Detonação Final (opcional)",
            "timing": null,
            "text": "Variante opcional (Qualquer Kobold Pode Explodir, p. 185). Se o mestre usar a versão explosiva desta ficha, o ND aumenta em +1 apenas para efeitos de experiência. Quando o xamã é reduzido a 0 PV, role 1d6: com um resultado 1 ou 2, ocorre uma explosão. Todas as criaturas a até 3m sofrem 4d6 pontos de dano de impacto (Ref CD 19 reduz à metade)."
        }
    ],
    "equipment": "Andrajos, bálsamo restaurador, funda, gadanho, pedras x20, símbolo sagrado de Kallyadranoch",
    "treasure": "Metade.",
    "skillsText": "Cura +6, Furtividade +9, Misticismo +2, Religião +6",
    "role": "special",
    "roleSource": "pdf-review"
};

export const cocatrizReal = {
    "id": "cocatriz-real",
    "name": "Cocatriz-Real",
    "type": "monster",
    "subtype": null,
    "size": "Grande",
    "challengeRating": 7,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 202,
        "bookPage": 200
    },
    "stats": {
        "initiative": 17,
        "perception": 8,
        "defense": 32,
        "fortitude": 20,
        "reflex": 12,
        "will": 7,
        "hitPoints": 250,
        "speedText": "6m (4q), voo 12m (8q)",
        "senses": "visão no escuro",
        "defensesText": "evasão",
        "attributes": {
            "str": 2,
            "dex": 7,
            "con": 3,
            "int": -5,
            "wis": 1,
            "cha": -2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Bicada +24 (2d8+12 perfuração) e cauda de serpente +20 (1d8+10 impacto)."
        }
    ],
    "abilities": [
        {
            "name": "Bicada Petrificante",
            "timing": null,
            "text": "Uma criatura que sofra dano da bicada da cocatriz-real fica lenta (Fort CD 26 evita). Se já estiver lenta, fica petrificada permanentemente. Efeitos que removem paralisia revertem a petrificação."
        },
        {
            "name": "Voo de Galinha",
            "timing": null,
            "text": "A cocatriz só consegue percorrer curtas distâncias voando; ela sempre termina seu movimento sobre o chão ou outra superfície firme."
        }
    ],
    "equipment": null,
    "treasure": "1 dose de lágrima pétrea (CD 22 para extrair) e 1d4 ovos de cocatriz (cada ovo permite preparar uma refeição coc-au-triz).",
    "skillsText": null
};

export const harpiaSaqueadora = {
    "id": "harpia-saqueadora",
    "name": "Harpia Saqueadora",
    "type": "monster",
    "subtype": "harpia",
    "size": "Médio",
    "challengeRating": 4,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 202,
        "bookPage": 200,
        "pdfPageEnd": 203,
        "bookPageEnd": 201
    },
    "stats": {
        "initiative": 13,
        "perception": 7,
        "defense": 18,
        "fortitude": 10,
        "reflex": 15,
        "will": 5,
        "hitPoints": 32,
        "speedText": "9m (6q), voo 12m (8q)",
        "senses": "visão no escuro",
        "defensesText": null,
        "attributes": {
            "str": 1,
            "dex": 4,
            "con": 2,
            "int": -1,
            "wis": 3,
            "cha": 2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Maça +20 (1d8+11) e garra +20 (1d6+11) ou duas garras +20 (1d6+11)."
        }
    ],
    "abilities": [
        {
            "name": "Grito Aterrorizante",
            "timing": "padrão",
            "text": "A harpia saqueadora emite um grito estridente e apavorante. Criaturas em alcance curto ficam abaladas (Von CD 18 evita e a criatura não pode mais ser abalada por esta habilidade até o fim da cena)."
        },
        {
            "name": "Rasante",
            "timing": "completa",
            "text": "A harpia faz uma investida e ataca com sua maça e uma garra (ou com as duas garras, se estiver desarmada). Os dois ataques recebem o bônus de +2 da investida, mas devem ser feitos contra o mesmo alvo. Após o ataque, a harpia pode continuar seu movimento, até o limite de seu deslocamento."
        }
    ],
    "equipment": "Maça",
    "treasure": "Nenhum.",
    "skillsText": "Intimidação +8, Sobrevivência +9"
};

export const mantor = {
    "id": "mantor",
    "name": "Mantor",
    "type": "monster",
    "subtype": null,
    "size": "Grande",
    "challengeRating": 5,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 205,
        "bookPage": 203
    },
    "stats": {
        "initiative": 11,
        "perception": 8,
        "defense": 24,
        "fortitude": 11,
        "reflex": 17,
        "will": 5,
        "hitPoints": 200,
        "speedText": "voo 18m (12q)",
        "senses": "percepção às cegas, visão no escuro",
        "defensesText": "redução de trevas 5",
        "attributes": {
            "str": 4,
            "dex": 5,
            "con": 2,
            "int": -1,
            "wis": 2,
            "cha": 0
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Aguilhão +17 (1d10+8 perfuração, x3, alcance 4,5m) e mordida +17 (1d10+8)."
        }
    ],
    "abilities": [
        {
            "name": "Emantar",
            "timing": "padrão",
            "text": "O mantor se joga sobre uma criatura adjacente Enorme ou menor e usa a manobra agarrar (teste +22). Enquanto estiver agarrada, a criatura fica cega, sofre metade de todo dano sofrido pelo mantor e, no início de cada turno do mantor, sofre 2d10+8 pontos de dano de perfuração. O mantor só pode manter uma criatura agarrada por vez e não pode usar sua mordida nesta situação."
        },
        {
            "name": "Imobilidade",
            "timing": null,
            "text": "Um mantor pode permanecer completamente imóvel. Se ele estiver assim, um personagem deve passar num teste de Percepção (CD 35) para perceber que ele é uma criatura e não um pedaço de tecido."
        },
        {
            "name": "Manto de Tenebra",
            "timing": null,
            "text": "Em escuridão total, o mantor recebe camuflagem total, mesmo contra criaturas que vejam no escuro."
        }
    ],
    "equipment": null,
    "treasure": "Metade, mais couro de mantor (CD 20 para extrair, vale T$ 150 para fabricar um manto do mantor).",
    "skillsText": "Furtividade +11 (+21 no escuro)"
};

export const quimera = {
    "id": "quimera",
    "name": "Quimera",
    "type": "monster",
    "subtype": null,
    "size": "Grande",
    "challengeRating": 8,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 206,
        "bookPage": 204,
        "pdfPageEnd": 207,
        "bookPageEnd": 205
    },
    "stats": {
        "initiative": 7,
        "perception": 10,
        "defense": 33,
        "fortitude": 21,
        "reflex": 15,
        "will": 8,
        "hitPoints": 333,
        "speedText": "9m (6q), voo 12m (8q)",
        "senses": "faro, visão no escuro",
        "defensesText": null,
        "attributes": {
            "str": 6,
            "dex": 3,
            "con": 4,
            "int": 0,
            "wis": 1,
            "cha": -2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Três mordidas +26 (3d8+7) e duas garras +24 (2d6+10)."
        }
    ],
    "abilities": [
        {
            "name": "Mente Tripla",
            "timing": null,
            "text": "Quando faz um teste de Percepção ou Vontade, a quimera joga três dados e usa o melhor resultado."
        },
        {
            "name": "Três Cabeças",
            "timing": null,
            "text": "Uma quimera tem três cabeças distintas que concedem habilidades especiais, escolhidas entre as opções a seguir."
        },
        {
            "name": "Águia",
            "timing": null,
            "text": "Quando faz uma investida, a quimera pode atacar com esta cabeça e suas duas garras. Os três ataques recebem o bônus de +2 da investida, mas devem ser feitos contra o mesmo alvo."
        },
        {
            "name": "Bode",
            "timing": null,
            "text": "Uma das mordidas da quimera muda para marrada e causa dano de impacto. Quando faz uma investida com esta cabeça e acerta o ataque, a quimera arremessa a vítima 1d6 x 1,5m em uma direção à escolha dela (Fort CD 26 evita). A vítima fica caída e, se atingir algum obstáculo, sofre 1d6 pontos de dano de impacto para cada 1,5m que foi arremessada."
        },
        {
            "name": "Dragão",
            "timing": "padrão",
            "text": "A quimera pode cuspir fogo em um cone de 6m. Criaturas na área sofrem 10d6+20 pontos de dano de fogo (Ref CD 26 reduz à metade). Recarga (movimento)."
        },
        {
            "name": "Gorlogg",
            "timing": null,
            "text": "Se acertar um ataque de mordida com esta cabeça, a quimera pode usar a manobra derrubar como ação livre (teste +28)."
        },
        {
            "name": "Hidra",
            "timing": null,
            "text": "A quimera ganha cura acelerada 20/ácido ou fogo."
        },
        {
            "name": "Leão",
            "timing": null,
            "text": "Quando acerta um ataque de mordida com esta cabeça, a quimera pode usar a manobra agarrar como ação livre (teste +28)."
        },
        {
            "name": "Javali",
            "timing": null,
            "text": "Se sofrer dano, a quimera recebe +5 em testes de ataque e rolagens de dano até o fim de seu próximo turno."
        },
        {
            "name": "Serpente",
            "timing": null,
            "text": "Uma criatura atingida por uma mordida desta cabeça perde 2d12 pontos de vida durante 3 rodadas (Fort CD 26 reduz para 1 rodada). Veneno."
        },
        {
            "name": "Tigre",
            "timing": null,
            "text": "Se acertar os dois ataques de garra em uma mesma criatura na mesma rodada, a quimera causa mais 4d6+20 pontos de dano."
        },
        {
            "name": "Tubarão",
            "timing": null,
            "text": "A quimera ganha deslocamento de natação 9m. Além disso, uma criatura atingida por uma mordida desta cabeça fica sangrando (Fort CD 26 evita)."
        }
    ],
    "equipment": null,
    "treasure": "Coração de quimera (CD 23 para extrair, vale T$ 300 para fabricar três doses de elixir quimérico).",
    "skillsText": null
};

export const mimico = {
    "id": "mimico",
    "name": "Mímico",
    "type": "monster",
    "subtype": null,
    "size": "Médio",
    "challengeRating": 6,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 206,
        "bookPage": 204
    },
    "stats": {
        "initiative": 9,
        "perception": 8,
        "defense": 26,
        "fortitude": 18,
        "reflex": 12,
        "will": 6,
        "hitPoints": 220,
        "speedText": "6m (4q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a ácido; redução de dano 5/frio",
        "attributes": {
            "str": 2,
            "dex": 4,
            "con": 3,
            "int": -2,
            "wis": 3,
            "cha": 0
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Dois tentáculos +20 (2d8+15)."
        }
    ],
    "abilities": [
        {
            "name": "Abocanhar",
            "timing": "livre",
            "text": "Se o mímico começar seu turno agarrando uma criatura Média ou menor, poderá fazer um teste de agarrar contra ela. Se vencer, abocanha a criatura. Uma criatura abocanhada continua agarrada e sofre 4d8+25 pontos de dano de corte no início de cada turno do mímico. O mímico pode manter uma criatura abocanhada por vez, e pode atacar com seus tentáculos normalmente enquanto faz isso. Uma criatura abocanhada pode escapar vencendo uma manobra agarrar contra o mímico."
        },
        {
            "name": "Agarrar Aprimorado",
            "timing": "livre",
            "text": "Tentáculo (teste +20)."
        },
        {
            "name": "Ataque Furtivo",
            "timing": null,
            "text": "+3d6."
        },
        {
            "name": "Cuspe Material",
            "timing": "padrão",
            "text": "O mímico cospe parte de seu conteúdo, como moedas e outros objetos diminutos, em um cone de 6m. Criaturas nessa área sofrem 6d4+6 pontos de perfuração (Ref CD 22 reduz à metade; uma criatura abocanhada falha automaticamente nesse teste)."
        },
        {
            "name": "Imobilidade",
            "timing": null,
            "text": "Um mímico pode permanecer completamente imóvel. Se ele estiver assim, um personagem deve passar num teste de Percepção (CD 40) para perceber que ele é uma criatura e não um objeto."
        }
    ],
    "equipment": null,
    "treasure": "Padrão.",
    "skillsText": "Enganação +15, Furtividade +2"
};

export const mimicoMenor = {
    id: "mimico-menor",
    name: "Mímico Menor",
    type: "monster",
    subtype: null,
    size: "Médio",
    challengeRating: 2,
    description: [
        "Uma cria ou exemplar subnutrido de mímico, adaptado à escassez dos primeiros andares da masmorra. Imita baús, portas e móveis simples para atrair exploradores isolados."
    ],
    role: "solo",
    roleSource: "adaptacao-nd",
    source: { book: "Masmorra de Práxis" },
    stats: {
        initiative: 5, perception: 5, defense: 18, fortitude: 10, reflex: 7, will: 3,
        hitPoints: 80,
        speedText: "6m (4q)",
        senses: "visão no escuro",
        defensesText: "imunidade a ácido, redução de dano 2/frio",
        attributes: { str: 1, dex: 3, con: 2, int: -3, wis: 2, cha: -1 }
    },
    actions: [
        { name: "Corpo a Corpo", text: "Dois tentáculos +12 (1d8+7)." },
        { name: "Cuspe Material", text: "Cone de 6m; criaturas na área sofrem 3d4+3 pontos de perfuração (Ref CD 16 reduz à metade; uma criatura abocanhada falha automaticamente)." }
    ],
    abilities: [
        { name: "Abocanhar", timing: "livre", text: "Se começar seu turno agarrando uma criatura Média ou menor, pode fazer um teste de agarrar contra ela. Se vencer, abocanha a criatura. Uma criatura abocanhada continua agarrada e sofre 2d8+10 pontos de dano de corte no início de cada turno do mímico menor. O mímico menor pode manter uma criatura abocanhada por vez e pode atacar com seus tentáculos normalmente enquanto faz isso. Uma criatura abocanhada pode escapar vencendo uma manobra agarrar contra o mímico menor." },
        { name: "Agarrar Aprimorado", timing: "livre", text: "Tentáculo (teste +12)." },
        { name: "Ataque Furtivo", timing: "passiva", text: "+1d6." },
        { name: "Imobilidade", timing: "passiva", text: "Um mímico menor pode permanecer completamente imóvel. Se ele estiver assim, um personagem deve passar num teste de Percepção (CD 30) para perceber que ele é uma criatura e não um objeto." }
    ],
    equipment: null,
    treasure: "Padrão.",
    skillsText: "Enganação +10, Furtividade +2"
};

export const thuwarokk = {
    id: "thuwarokk",
    name: "Thuwarokk",
    type: "monster",
    subtype: "lefeu",
    size: "Colossal",
    challengeRating: 16,
    description: [
        "Este gigantesco lefeu lembra um besouro blindado, mas é quase tão grande quanto um castelo! Além de quatro pares de patas, possui três pares de “braços” menores e ágeis. Sua carapaça é espessa como uma muralha, recobrindo o dorso e mostrando poucas juntas vulneráveis. Lembrando mais imensas máquinas de guerra que seres vivos, os thuwarokk eram conhecidos como “colossos da Tormenta” — e são exatamente isso: feras colossais, monstros de destruição total, capazes de dizimar exércitos."
    ],
    source: {
        "book": "Livro Básico",
        "pdfPage": 30,
        "bookPage": null
    },
    stats: {
        "initiative": 11,
        "perception": 12,
        "defense": 50,
        "fortitude": 30,
        "reflex": 24,
        "will": 16,
        "hitPoints": 900,
        "speedText": "12m (8q)",
        "senses": "visão no escuro",
        "defensesText": "redução de dano 10; imunidade a acertos críticos, ácido, cansaço, eletricidade, fogo, frio, luz, paralisia, metabolismo, metamorfose, trevas e veneno",
        "attributes": {
            "str": 17,
            "dex": -1,
            "con": 10,
            "int": -3,
            "wis": 0,
            "cha": -4
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Quatro pancadas +48 (4d12+24)."
        }
    ],
    abilities: [
        {
            "name": "Carapaça",
            "timing": null,
            "text": "A carapaça do thuwarokk reduz todo dano de corte, impacto e perfuração que ele sofre pela metade. Se o thuwarokk passar num teste de resistência contra magia que o tem como alvo, ela é revertida contra o conjurador. Apesar de resistente, a caparaça de um thuwarokk possui pontos fracos, que podem ser encontrados com uma ação de movimento e um teste de Percepção (CD 25). Um personagem que encontre um ponto fraco pode atacar a criatura com –5 no teste de ataque, mas, se acertar, ignora as proteções da carapaça."
        },
        {
            "name": "Insanidade da Tormenta",
            "timing": null,
            "text": "Uma criatura que veja um ou mais lefeu deve fazer um teste de Vontade contra o lefeu de maior ND. Se falhar, perde os PM indicados (+1 PM para cada lefeu além do primeiro). Se for reduzida a 0 PM, fica confusa. Uma criatura só é afetada por esta habilidade uma vez por dia. Nesta ficha: 2d12 PM (Vontade CD 42 evita)."
        },
        {
            "name": "Jato de Ácido",
            "timing": "movimento",
            "text": "O thuwarokk dispara um jato corrosivo que atinge um cone de 30m. Criaturas na área sofrem 10d8+20 pontos de dano de ácido (Ref CD 42 reduz à metade). Recarga (movimento)."
        },
        {
            "name": "Passar por Cima",
            "timing": "completa",
            "text": "O thuwarokk percorre até o dobro do seu deslocamento, passando por qualquer criatura Enorme ou menor. Uma criatura atropelada sofre 10d12+50 pontos de dano (Ref CD 42 reduz à metade)."
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
    equipment: null,
    treasure: "Nenhum.",
    skillsText: null
};

export const arquibruxoDaTormenta = {
    id: "arquibruxo-da-tormenta",
    name: "Arquibruxo da Tormenta",
    type: "monster",
    subtype: "lefou",
    size: "Médio",
    challengeRating: 14,
    description: [],
    source: {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 22,
        "bookPage": 20,
        "pdfPageEnd": 23,
        "bookPageEnd": 21
    },
    stats: {
        "initiative": 13,
        "perception": 16,
        "defense": 45,
        "fortitude": 14,
        "reflex": 22,
        "will": 28,
        "hitPoints": 486,
        "manaPoints": 105,
        "speedText": "9m (6q), voo 12m (8q)",
        "senses": "visão no escuro",
        "defensesText": "resistência a magia +2",
        "attributes": {
            "str": -1,
            "dex": 2,
            "con": 5,
            "int": 7,
            "wis": 0,
            "cha": -2
        }
    },
    actions: [],
    abilities: [
        {
            "name": "Abominar a Realidade",
            "timing": null,
            "text": "O arquibruxo está sempre no limiar da realidade. Ele ignora terreno difícil e efeitos que o tenham como alvo possuem 50% de chance de falha."
        },
        {
            "name": "Arcano de Batalha",
            "timing": null,
            "text": "O arquibruxo soma sua Inteligência nas rolagens de dano quando lança magias ou usa seu Raio Arcano (já contabilizado)."
        },
        {
            "name": "Insanidade da Tormenta",
            "timing": null,
            "text": "2d10 PM (Von CD 40 evita)."
        },
        {
            "name": "Magia Acelerada",
            "magical": true,
            "timing": "livre",
            "cost": "+4 PM",
            "text": "Uma vez por rodada, quando usa Raio Arcano ou lança uma magia com execução de ação completa ou menor, o arquibruxo muda a execução desta ação para livre."
        },
        {
            "name": "Mente Aberrante",
            "timing": "reação",
            "text": "Quando faz um teste de Vontade para resistir a um efeito, o bruxo causa 12d6 pontos de dano psíquico na criatura que gerou o efeito."
        },
        {
            "name": "Raio Arcano",
            "magical": true,
            "timing": "padrão",
            "cost": "1 PM",
            "text": "Uma criatura em alcance médio sofre 4d12+7 pontos de dano de trevas e não pode recuperar PV por 1 rodada (Ref CD 40 reduz à metade e evita a restrição de cura)."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como um bruxo de 14º nível (CD 40). Seu foco é seu cajado arcano."
        },
        {
            "name": "Desintegrar",
            "timing": "padrão",
            "cost": "14 PM",
            "text": "Uma criatura ou objeto em alcance médio sofre 12d12+7 pontos de dano de essência (Fort reduz para 3d12). Se reduzido a 0 PV, o alvo vira pó."
        },
        {
            "name": "Dissipar Magia",
            "timing": "padrão",
            "cost": "3 PM",
            "text": "O arquibruxo escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias nesse alvo com CD igual ou menor que o resultado do teste são dissipadas."
        },
        {
            "name": "Momento de Tormenta",
            "timing": "completa",
            "cost": "3 PM",
            "text": "Sustentada. Uma nuvem rubra surge em um cubo de 30m acima do arquibruxo. Uma vez por turno, ele pode gastar uma ação de movimento para fazer a nuvem manifestar um dos seguintes fenômenos: chuva ácida (criaturas na área sofrem 6d4 dano de ácido); neblina venenosa (criaturas na área perdem 2d12 PV, Fort evita); raios escarlates (até 6 inimigos aleatórios na área sofrem 6d8 dano de eletricidade, Ref reduz à metade); pesadelos reais (criaturas na área sofrem 4d6 dano psíquico e perdem 1d4 PM, Von reduz o dano à metade e evita a perda de PM)."
        },
        {
            "name": "Seta Infalível de Talude",
            "timing": "padrão",
            "cost": "12 PM",
            "text": "O arquibruxo projeta 10 lanças de energia distribuídas em até 10 criaturas em alcance médio. Cada lança causa 1d8+1 pontos de dano de essência (uma delas recebe +7 na rolagem de dano)."
        },
        {
            "name": "Sussurros Insanos",
            "timing": "padrão",
            "cost": "10 PM",
            "text": "Até 3 criaturas em alcance curto ficam confusas (Von anula)."
        },
        {
            "name": "Velocidade",
            "timing": "padrão",
            "cost": "3 PM",
            "text": "Até o fim da cena, o arquibruxo pode executar uma ação de movimento adicional por turno, que não pode ser usada para lançar magias."
        }
    ],
    equipment: "Anel da energia, cajado arcano de matéria vermelha",
    treasure: "Nenhum.",
    skillsText: "Conhecimento +20, Intimidação +19, Misticismo +28"
};

export const enxameInfernal = {
    id: "enxame-infernal",
    name: "Enxame Infernal",
    type: "monster",
    subtype: "lefeu",
    size: "Grande",
    challengeRating: 8,
    description: [
        "Um enxame de minúsculos horrores lefeu, com formas humanoides distorcidas, vários pares de asas e rostos contorcidos. Pode surgir de maneira imprevisível em locais ligados à Tormenta."
    ],
    source: {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 24,
        "bookPage": 22
    },
    stats: {
        "initiative": 8,
        "perception": 7,
        "defense": 33,
        "fortitude": 15,
        "reflex": 23,
        "will": 8,
        "hitPoints": 350,
        "speedText": "3m (2q), voo 15m (10q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a acertos críticos, ácido, cansaço, eletricidade, fogo, frio, luz, paralisia, metabolismo, metamorfose, trevas e veneno",
        "attributes": {
            "str": -3,
            "dex": 3,
            "con": 2,
            "int": -1,
            "wis": 1,
            "cha": -1
        }
    },
    actions: [
        {
            "name": "Enxame",
            "text": "5d12 pontos de dano de perfuração."
        }
    ],
    abilities: [
        {
            "name": "Drenar Existência",
            "timing": null,
            "text": "O dano causado pelo enxame infernal só pode ser curado após 24 horas ou após o enxame ser destruído."
        },
        {
            "name": "Insanidade da Tormenta",
            "timing": null,
            "text": "Uma criatura que veja um ou mais lefeu deve fazer um teste de Vontade contra o lefeu de maior ND. Se falhar, perde os PM indicados (+1 PM para cada lefeu além do primeiro). Se for reduzida a 0 PM, fica confusa. Uma criatura só é afetada por esta habilidade uma vez por dia. Nesta ficha: 2d6 PM (Von CD 26 evita)."
        },
        {
            "name": "Zumbido Repugnante",
            "timing": null,
            "text": "Uma criatura que comece seu turno em alcance curto do enxame infernal fica alquebrada e surda (Fort CD 26 evita)."
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
    equipment: null,
    treasure: "Nenhum.",
    skillsText: "Furtividade +9"
};

export const gatzvalithLordeDaTormenta = {
    id: "gatzvalith-lorde-da-tormenta",
    name: "Gatzvalith, Lorde da Tormenta",
    type: "monster",
    subtype: "lekael",
    size: "Grande",
    challengeRating: "S+",
    description: [
        "Gatzvalith é um lekael, um Lorde da Tormenta, e governa o foco de Trebuck. Age como estrategista e conquistador, utilizando a Tormenta como instrumento de guerra e tentando corromper grandes campeões com promessas de poder."
    ],
    source: {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 31,
        "bookPage": 29
    },
    stats: {
        "initiative": 28,
        "perception": 39,
        "defense": 69,
        "fortitude": 34,
        "reflex": 36,
        "will": 24,
        "hitPoints": 3700,
        "speedText": "15m (10q), voo 36m (24q)",
        "senses": "percepção perfeita",
        "defensesText": "cura acelerada 50; imunidade a medo; maior que a morte; redução de dano 25; resistência a magia +10; imunidade a efeitos mentais; imunidade a acertos críticos, ácido, cansaço, eletricidade, fogo, frio, luz, paralisia, metabolismo, metamorfose, trevas e veneno",
        "attributes": {
            "str": 18,
            "dex": 12,
            "con": 19,
            "int": 15,
            "wis": 8,
            "cha": 14
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Rompedor da Realidade x4 +64 (4d12+31, x3, mais 2d8 contra não lefeu)."
        }
    ],
    abilities: [
        {
            "name": "Coração da Tormenta",
            "timing": null,
            "text": "Um lekael só pode ser verdadeiramente destruído se o coração de sua área de Tormenta também for. Caso não seja, ele retorna à vida em uma semana."
        },
        {
            "name": "Domínio Sobre o Tempo",
            "timing": null,
            "text": "Um lekael pode fazer duas ações padrão e duas ações de movimento a cada turno."
        },
        {
            "name": "Invocar Lefeu",
            "timing": "completa",
            "text": "Uma vez por cena, o lekael invoca um ou mais lefeu a sua escolha, cujo ND total somado seja igual ao seu. Eles surgem em alcance curto e agem a partir da próxima rodada, em suas iniciativas."
        },
        {
            "name": "Maior que a Morte",
            "timing": null,
            "text": "Enquanto tiver pelo menos metade dos PV, Gatzvalith é imune a efeitos de morte instantânea, inclusive os que aprisionam ou destroem seu corpo ou alma. Dano ou perda de PV ainda pode reduzi-lo a 0 PV ou menos. Como criatura de ND S+, ele conta como ND 20 para estatísticas ausentes da ficha e como ND superior a 20 para habilidades de outras criaturas."
        },
        {
            "name": "Percepção Perfeita",
            "timing": null,
            "text": "Um lekael está sempre sob efeito de Visão da Verdade, com todos os aprimoramentos."
        },
        {
            "name": "Poder sobre a Realidade",
            "timing": null,
            "text": "Um lekael pode lançar qualquer magia simulada de até 4º círculo como um conjurador de 20º nível (CD 55, limite de PM 20) sem gastar PM."
        },
        {
            "name": "Telepatia",
            "timing": null,
            "text": "O lekael pode se comunicar com qualquer criatura inteligente (Int –3 ou mais) dentro de sua área de Tormenta ou a 1km de distância fora dela. Além disso, é imune a efeitos mentais."
        },
        {
            "name": "Carapaça Suprema",
            "timing": null,
            "text": "Gatzvalith sofre apenas metade do dano de fontes mundanas, exceto de aço-rubi."
        },
        {
            "name": "Estrategista Perfeito",
            "timing": null,
            "text": "Quando faz um ataque, Gatzvalith joga dois dados e usa o melhor resultado. Todos os lefeu em alcance longo também recebem este benefício."
        },
        {
            "name": "Insanidade da Tormenta",
            "timing": null,
            "text": "Uma criatura que veja um ou mais lefeu deve fazer um teste de Vontade contra o lefeu de maior ND. Se falhar, perde os PM indicados (+1 PM para cada lefeu além do primeiro). Se for reduzida a 0 PM, fica confusa. Uma criatura só é afetada por esta habilidade uma vez por dia. Nesta ficha: 2d20 PM (Von CD 55 evita). Esta habilidade pode afetar mesmo criaturas que já foram afetadas pela Insanidade da Tormenta de outras criaturas neste dia."
        },
        {
            "name": "Raio da Anticriação",
            "timing": "padrão",
            "text": "Gatzvalith dispara um raio rubro em uma criatura em alcance médio. O alvo sofre 18d12 pontos de dano de essência (Fort CD 55 reduz à metade). Uma criatura reduzida a 0 PV ou menos por esta habilidade morre automaticamente e não pode ser ressuscitada (nem mesmo por Dom da Ressureição)."
        },
        {
            "name": "Reescrever a Realidade",
            "timing": "completa",
            "text": "Uma vez por cena, Gatzvalith pode reorganizar uma parte da realidade em uma esfera de 15m ao seu redor. Efeitos mágicos na área são automaticamente dissipados (como se afetados por Dissipar Magia) e habilidades mundanas com duração maior que instantânea se encerram. Por fim, inimigos na área ficam alquebrados por 1d4 rodadas."
        },
        {
            "name": "Sedução",
            "timing": "movimento",
            "text": "Uma criatura a até 1km de Gatzvalith perde 1d10 PM, fica pasma por 1 rodada e vulnerável (Von CD 55 evita). Falhas consecutivas na mesma cena se acumulam: na segunda, perde mais 1d10 PM e fica esmorecida; na terceira, perde 1d10 PM permanentemente e fica atordoada por 1 rodada; na quarta, suas ações físicas nesta rodada ficam sob controle de Gatzvalith; na quinta falha, a vítima se transforma em uma criatura do tipo monstro (lefeu) e vira um NPC sob controle do mestre."
        },
        {
            "name": "Varrer",
            "timing": "livre",
            "text": "Uma vez por rodada, quando Gatzvalith faz um ataque corpo a corpo e reduz os pontos de vida do alvo para 0 ou menos, pode realizar um ataque adicional contra outra criatura dentro do seu alcance."
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
    equipment: "Rompedor da Realidade",
    treasure: "Dobro.",
    skillsText: "Conhecimento +36, Diplomacia +35, Enganação +35, Guerra +41, Intimidação +40, Intuição +34, Misticismo +31"
};

export const lefeuBurodron = {
    id: "lefeu-burodron",
    name: "Lefeu, Burodron",
    type: "monster",
    subtype: "lefeu",
    size: "Enorme",
    challengeRating: 11,
    description: [
        "Grandes lefeu de aparência simiesca, com braços longos recobertos por carapaça e garras poderosas. São escavadores e mestres de emboscada, emergindo do solo para atacar alvos vulneráveis."
    ],
    source: {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 28,
        "bookPage": 26
    },
    stats: {
        "initiative": 9,
        "perception": 15,
        "defense": 42,
        "fortitude": 24,
        "reflex": 19,
        "will": 12,
        "hitPoints": 550,
        "speedText": "15m (10q), escalada 15m (10q), escavação 15m (10q)",
        "senses": "percepção às cegas (médio), visão no escuro",
        "defensesText": "redução de dano 10; imunidade a acertos críticos, ácido, cansaço, eletricidade, fogo, frio, luz, paralisia, metabolismo, metamorfose, trevas e veneno",
        "attributes": {
            "str": 10,
            "dex": 0,
            "con": 6,
            "int": -1,
            "wis": 1,
            "cha": -3
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Duas garras +35 (3d8+23) e mordida +35 (2d8+14)."
        }
    ],
    abilities: [
        {
            "name": "Dilacerar",
            "timing": null,
            "text": "Se o burodron acerta os dois ataques de garra em uma mesma criatura no mesmo turno, causa mais 8d6+8 pontos de dano."
        },
        {
            "name": "Insanidade da Tormenta",
            "timing": null,
            "text": "Uma criatura que veja um ou mais lefeu deve fazer um teste de Vontade contra o lefeu de maior ND. Se falhar, perde os PM indicados (+1 PM para cada lefeu além do primeiro). Se for reduzida a 0 PM, fica confusa. Uma criatura só é afetada por esta habilidade uma vez por dia. Nesta ficha: 2d8 PM (Von CD 31 evita)."
        },
        {
            "name": "Morte que Vem da Terra",
            "timing": "completa",
            "text": "O burodron mergulha no solo e emerge violentamente em um ponto em alcance médio. Criaturas adjacentes a ele sofrem 8d8+32 pontos de dano de impacto e ficam caídas (Ref CD 31 reduz à metade e evita a condição)."
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
    equipment: null,
    treasure: "Nenhum.",
    skillsText: "Atletismo +19, Furtividade +9 (+19 quando enterrado)"
};

export const lefeuEzzayn = {
    id: "lefeu-ezzayn",
    name: "Lefeu, Ezzayn",
    type: "monster",
    subtype: "lefeu",
    size: "Enorme",
    challengeRating: 17,
    description: [
        "Um ezzayn é formado por numerosos lefeu menores emaranhados, em número instável e difícil de estimar. Sua composição pode incluir diferentes espécies lefeu e variar de acordo com a missão."
    ],
    source: {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 29,
        "bookPage": 27
    },
    stats: {
        "initiative": 15,
        "perception": 18,
        "defense": 46,
        "fortitude": 27,
        "reflex": 25,
        "will": 16,
        "hitPoints": 650,
        "speedText": "9m (6q)",
        "senses": "visão no escuro",
        "defensesText": "redução de dano 10; imunidade a acertos críticos, ácido, cansaço, eletricidade, fogo, frio, luz, paralisia, metabolismo, metamorfose, trevas e veneno",
        "attributes": {
            "str": 12,
            "dex": 5,
            "con": 3,
            "int": 0,
            "wis": 3,
            "cha": -3
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "[Bando] Garra +49 (4d8+29, 19)."
        },
        {
            "name": "Enxame",
            "text": "14d8 pontos de dano de corte."
        }
    ],
    abilities: [
        {
            "name": "Anarquia Lacerante",
            "timing": "padrão",
            "text": "O ezzayn faz um ataque de garra como um bando, contra cada criatura adjacente ou em um quadrado ocupado por ele. Ele faz um único teste de ataque e compara o resultado com a Defesa de cada alvo."
        },
        {
            "name": "Distorção Temporal",
            "timing": null,
            "text": "O ezzayn pode realizar uma ação padrão ou de movimento adicional por turno."
        },
        {
            "name": "Insanidade da Tormenta",
            "timing": null,
            "text": "Uma criatura que veja um ou mais lefeu deve fazer um teste de Vontade contra o lefeu de maior ND. Se falhar, perde os PM indicados (+1 PM para cada lefeu além do primeiro). Se for reduzida a 0 PM, fica confusa. Uma criatura só é afetada por esta habilidade uma vez por dia. Nesta ficha: 4d6 PM (Von CD 44 evita)."
        },
        {
            "name": "Subjugar",
            "timing": "livre",
            "text": "No fim de cada um de seus turnos, o ezzayn usa a manobra derrubar (teste +54) contra cada criatura em seu espaço. Ele faz um único teste e compara o resultado com o teste de cada criatura na área. Criaturas que perderem o teste de manobra por 5 ou mais ainda sofrem 8d8 pontos de dano de corte."
        },
        {
            "name": "Ezzayn Especiais",
            "timing": null,
            "text": "Um ezzayn especial tem ND 18. Batalhão Burodron: +5 em testes de ataque e rolagens de dano com garras; Emboscada Subterrânea (Completa): escava até uma criatura em alcance curto, tenta agarrar (teste +54), puxando-a 3m para baixo, causando 4d8+23 corte e deixando-a agarrada; a vítima pode tentar sair com ação padrão e Atletismo CD 44, sofrendo o dano novamente se falhar. Cavalaria Hurobakk: +100 PV, +5 em Fortitude; Carga Terrível (Padrão): quadrado de 6m à frente sofre 4d10+19 impacto e fica caído (Fort CD 44 reduz à metade e evita); falha por 5 ou mais avaria a armadura ou causa +2d8 se não houver armadura. Esquadrão Veridak: +5 em Iniciativa e Reflexos, voo 18m (12q); Ataque Rasante (Padrão): quadrado de 6m à frente sofre 4d6+31 corte (Ref CD 44 reduz à metade); quem falha faz teste de agarrar CD 44 e, se falhar, é erguido e largado de 12m."
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
    equipment: null,
    treasure: "Nenhum.",
    skillsText: null
};

export const lefeuHurobakk = {
    id: "lefeu-hurobakk",
    name: "Lefeu, Hurobakk",
    type: "monster",
    subtype: "lefeu",
    size: "Grande",
    challengeRating: 9,
    description: [
        "Lefeu quadrúpede com segundo tronco ereto, quatro braços adicionais e grandes pinças. Guerreiro de elite que funciona como cavalaria pesada e força de choque."
    ],
    source: {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 27,
        "bookPage": 25
    },
    stats: {
        "initiative": 16,
        "perception": 14,
        "defense": 35,
        "fortitude": 21,
        "reflex": 16,
        "will": 9,
        "hitPoints": 380,
        "speedText": "15m (10q)",
        "senses": "visão no escuro",
        "defensesText": "redução de dano 10; imunidade a acertos críticos, ácido, cansaço, eletricidade, fogo, frio, luz, paralisia, metabolismo, metamorfose, trevas e veneno",
        "attributes": {
            "str": 8,
            "dex": 3,
            "con": 5,
            "int": 1,
            "wis": 2,
            "cha": -2
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Duas pinças +28 (2d8+13, 19) e duas garras +28 (1d8+13)."
        }
    ],
    abilities: [
        {
            "name": "Insanidade da Tormenta",
            "timing": null,
            "text": "Uma criatura que veja um ou mais lefeu deve fazer um teste de Vontade contra o lefeu de maior ND. Se falhar, perde os PM indicados (+1 PM para cada lefeu além do primeiro). Se for reduzida a 0 PM, fica confusa. Uma criatura só é afetada por esta habilidade uma vez por dia. Nesta ficha: 2d8 PM (Von CD 28 evita)."
        },
        {
            "name": "Investida Rubra",
            "timing": "completa",
            "text": "O hurobakk faz uma investida e ataca com suas duas pinças. Ele recebe +4d8 nas rolagens de dano com cada pinça e pode continuar se movendo após os ataques, até o limite de seu deslocamento."
        },
        {
            "name": "Passar por Cima",
            "timing": "completa",
            "text": "O hurobakk percorre até o dobro do seu deslocamento, passando por qualquer criatura Média ou menor. Uma criatura atropelada dessa forma sofre 6d8+30 pontos de dano de impacto e fica caída (Ref CD 28 reduz à metade e evita a condição)."
        },
        {
            "name": "Pinças Destruidoras",
            "timing": null,
            "text": "Uma criatura atingida pela pinça do hurobakk tem sua armadura ou escudo (a sua escolha) avariado. Se não estiver usando armadura ou empunhando um escudo, sofre +2d8 pontos de dano (em ambos os casos, Ref CD 28 evita)."
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
    equipment: null,
    treasure: "Nenhum.",
    skillsText: null
};

export const lefeuMorgadrel = {
    id: "lefeu-morgadrel",
    name: "Lefeu, Morgadrel",
    type: "monster",
    subtype: "lefeu",
    size: "Enorme",
    challengeRating: 13,
    description: [
        "Imensos lefeu semelhantes a caranguejos, com carapaça grossa, dez patas, dois pares de pinças e espinhos. Costumam permanecer submersos e ocultos, atacando de emboscada com pinças, espinhos e ácido."
    ],
    source: {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 28,
        "bookPage": 26
    },
    stats: {
        "initiative": 10,
        "perception": 18,
        "defense": 47,
        "fortitude": 18,
        "reflex": 13,
        "will": 26,
        "hitPoints": 670,
        "speedText": "15m (10q), natação 15m (10q)",
        "senses": "visão no escuro",
        "defensesText": "redução de dano 10; imunidade a acertos críticos, ácido, cansaço, eletricidade, fogo, frio, luz, paralisia, metabolismo, metamorfose, trevas e veneno",
        "attributes": {
            "str": 10,
            "dex": 0,
            "con": 7,
            "int": 1,
            "wis": 3,
            "cha": -1
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Duas pinças x2 +40 (4d10+19, 19)."
        }
    ],
    abilities: [
        {
            "name": "Disparar Espinhos",
            "timing": "padrão",
            "text": "Criaturas em uma esfera de 9m ao redor do morgadrel sofrem 12d8+24 pontos de dano de perfuração e ficam fatigadas por veneno (cumulativo; Ref CD 35 reduz à metade e evita a condição). Recarga (movimento)."
        },
        {
            "name": "Insanidade da Tormenta",
            "timing": null,
            "text": "Uma criatura que veja um ou mais lefeu deve fazer um teste de Vontade contra o lefeu de maior ND. Se falhar, perde os PM indicados (+1 PM para cada lefeu além do primeiro). Se for reduzida a 0 PM, fica confusa. Uma criatura só é afetada por esta habilidade uma vez por dia. Nesta ficha: 2d10 PM (Von CD 35 evita)."
        },
        {
            "name": "Investida Surpresa",
            "timing": null,
            "text": "Quando faz uma investida contra um inimigo surpreendido, o morgadrel pode desferir todos seus ataques de pinça contra essa criatura."
        },
        {
            "name": "Jato de Ácido",
            "timing": "padrão",
            "text": "Criaturas em uma linha de 15m sofrem 8d12 pontos de dano de ácido e ficam cobertas por muco, sofrendo 3d12 pontos de dano de ácido no início de seus próximos 2 turnos (Ref CD 35 reduz à metade e evita o muco). Recarga (movimento)."
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
    equipment: null,
    treasure: "Nenhum.",
    skillsText: "Furtividade +10 (+20 submerso)"
};

export const lefeuVeridak = {
    id: "lefeu-veridak",
    name: "Lefeu, Veridak",
    type: "monster",
    subtype: "lefeu",
    size: "Grande",
    challengeRating: 8,
    description: [
        "Grandes lefeu semelhantes a louva-a-deus bípedes, com dois pares de braços, garras nos membros inferiores, lâminas nos superiores e dois pares de asas extremamente velozes.",
        "Atuam como batedores e caçadores aéreos, preferindo ataques rasantes e táticas de guerrilha."
    ],
    source: {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 26,
        "bookPage": 24
    },
    stats: {
        "initiative": 12,
        "perception": 15,
        "defense": 34,
        "fortitude": 9,
        "reflex": 22,
        "will": 15,
        "hitPoints": 64,
        "speedText": "9m (6q), voo 36m (24q)",
        "senses": "visão no escuro",
        "defensesText": "redução de dano 5; imunidade a acertos críticos, ácido, cansaço, eletricidade, fogo, frio, luz, paralisia, metabolismo, metamorfose, trevas e veneno",
        "attributes": {
            "str": 6,
            "dex": 4,
            "con": 3,
            "int": -1,
            "wis": 2,
            "cha": -3
        }
    },
    actions: [
        {
            "name": "Corpo a Corpo",
            "text": "Duas lâminas +29 (2d6+13 corte, 18/x3) e duas garras +29 (1d6+13)."
        }
    ],
    abilities: [
        {
            "name": "Agarrar Aprimorado",
            "timing": "livre",
            "text": "Garra (teste +31)."
        },
        {
            "name": "Insanidade da Tormenta",
            "timing": null,
            "text": "Uma criatura que veja um ou mais lefeu deve fazer um teste de Vontade contra o lefeu de maior ND. Se falhar, perde os PM indicados (+1 PM para cada lefeu além do primeiro). Se for reduzida a 0 PM, fica confusa. Uma criatura só é afetada por esta habilidade uma vez por dia. Nesta ficha: 2d6 PM (Von CD 26 evita)."
        },
        {
            "name": "Relâmpago Rubro",
            "timing": "completa",
            "text": "O veridak faz uma investida e ataca com suas duas lâminas e suas duas garras. Os quatro ataques recebem o bônus de +2 da investida, mas devem ser feitos contra o mesmo alvo. O veridak pode continuar se movendo após os ataques, até o limite de seu deslocamento."
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
    equipment: null,
    treasure: "Nenhum.",
    skillsText: null
};

export const sapoAtroz = {
    "id": "sapo-atroz",
    "name": "Sapo Atroz",
    "type": "monster",
    "subtype": null,
    "size": "Grande",
    "challengeRating": 2,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 38,
        "bookPage": 36
    },
    "stats": {
        "initiative": 6,
        "perception": 3,
        "defense": 16,
        "fortitude": 15,
        "reflex": 7,
        "will": 0,
        "hitPoints": 95,
        "speedText": "12m (8q), natação 9m (6q)",
        "senses": "visão na penumbra",
        "defensesText": null,
        "attributes": {
            "str": 6,
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
            "text": "Língua +12 (1d6+6 impacto mais veneno, alcance 3m)."
        }
    ],
    "abilities": [
        {
            "name": "Agarrar Aprimorado",
            "timing": "livre",
            "text": "Língua (teste +16)."
        },
        {
            "name": "Boca de Sapo",
            "timing": "livre",
            "text": "No início de cada um de seus turnos, o sapo atroz causa 2d6+8 pontos de dano de impacto, mais veneno, na criatura que estiver agarrando com sua língua."
        },
        {
            "name": "Salto Esmagador",
            "timing": "padrão",
            "text": "O sapo pula e cai sobre um oponente menor que ele em alcance curto. O alvo fica caído e sofre 2d6+12 pontos de dano de impacto (Ref CD 17 reduz à metade e evita a condição)."
        },
        {
            "name": "Veneno",
            "timing": null,
            "text": "Perde 1d12 PV e fica paralisado por 1 rodada; Fort CD 18 evita a paralisia e reduz a perda de vida para 1d6."
        }
    ],
    "equipment": null,
    "treasure": "1d4 doses de veneno batráquio (CD 17 para extrair) e pedaço de língua (CD 17 para extrair).",
    "skillsText": "Atletismo +10 (+20 para saltar), Furtividade +7"
};

export const trogAnaoBruto = {
    "id": "trog-anao-bruto",
    "name": "Trog Anão Bruto",
    "type": "monster",
    "subtype": "trog",
    "size": "Médio",
    "challengeRating": 1,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 41,
        "bookPage": 39
    },
    "stats": {
        "initiative": 1,
        "perception": 5,
        "defense": 19,
        "fortitude": 11,
        "reflex": 0,
        "will": 5,
        "hitPoints": 35,
        "speedText": "6m (4q)",
        "senses": "visão no escuro",
        "defensesText": null,
        "attributes": {
            "str": 3,
            "dex": 0,
            "con": 4,
            "int": -2,
            "wis": 0,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Machado de guerra +9 (1d12+3, x3) e mordida +9 (1d6+3)."
        }
    ],
    "abilities": [
        {
            "name": "Mau Cheiro",
            "timing": "padrão",
            "text": "O trog expele um gás fétido. Todas as criaturas (exceto trogs) em alcance curto ficam enjoadas por 1d6 rodadas (Fortitude CD 14 evita). Uma criatura que passe no teste de resistência fica imune a esta habilidade por um dia. Veneno."
        },
        {
            "name": "Sangue Frio",
            "timing": null,
            "text": "O trog sofre 1 ponto de dano adicional por dado de dano de frio."
        },
        {
            "name": "Sobrevivente",
            "timing": null,
            "text": "Quando faz um teste de resistência, o trog anão bruto rola dois dados e usa o melhor resultado."
        }
    ],
    "equipment": "Loriga segmentada, machado de guerra",
    "treasure": "Metade.",
    "skillsText": "Sobrevivência +7"
};

export const trogAnaoEremita = {
    "id": "trog-anao-eremita",
    "name": "Trog Anão Eremita",
    "type": "monster",
    "subtype": "trog",
    "size": "Médio",
    "challengeRating": 8,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 41,
        "bookPage": 39
    },
    "stats": {
        "initiative": 7,
        "perception": 18,
        "defense": 33,
        "fortitude": 22,
        "reflex": 6,
        "will": 16,
        "hitPoints": 330,
        "speedText": "6m (4q)",
        "senses": "visão no escuro",
        "defensesText": null,
        "attributes": {
            "str": 7,
            "dex": -1,
            "con": 6,
            "int": 0,
            "wis": 2,
            "cha": -2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Machado de guerra +26 (3d6+20, x3) e mordida +26 (2d6+18)."
        }
    ],
    "abilities": [
        {
            "name": "Armadura Fúngica",
            "timing": "reação",
            "text": "Quando o trog anão eremita sofre dano, todas as criaturas adjacentes perdem 2d12 pontos de vida. Veneno."
        },
        {
            "name": "Gosto por Tripas",
            "timing": null,
            "text": "O trog recebe +2 em rolagens de dano contra criaturas em que já tenha causado dano na cena."
        },
        {
            "name": "Mau Cheiro",
            "timing": "padrão",
            "text": "O trog expele um gás fétido. Todas as criaturas (exceto trogs) em alcance curto ficam enjoadas por 1d6 rodadas (Fortitude CD 26 evita). Uma criatura que passe no teste de resistência fica imune a esta habilidade por um dia. Veneno."
        },
        {
            "name": "Sangue Frio",
            "timing": null,
            "text": "O trog sofre 1 ponto de dano adicional por dado de dano de frio."
        },
        {
            "name": "Sobrevivente",
            "timing": null,
            "text": "Quando faz um teste de resistência, o trog rola dois dados e usa o melhor resultado."
        }
    ],
    "equipment": "Machado de guerra atroz",
    "treasure": "Metade.",
    "skillsText": "Sobrevivência +20"
};

export const trogCacador = {
    "id": "trog-cacador",
    "name": "Trog Caçador",
    "type": "monster",
    "subtype": "trog",
    "size": "Médio",
    "challengeRating": 2,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 40,
        "bookPage": 38
    },
    "stats": {
        "initiative": 6,
        "perception": 5,
        "defense": 18,
        "fortitude": 7,
        "reflex": 12,
        "will": 3,
        "hitPoints": 14,
        "speedText": "9m (6q)",
        "senses": "visão no escuro",
        "defensesText": null,
        "attributes": {
            "str": 2,
            "dex": 3,
            "con": 3,
            "int": -1,
            "wis": 2,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +11 (1d6+7)."
        },
        {
            "name": "À Distância",
            "text": "Arco longo +14 (1d8+12, x3)."
        }
    ],
    "abilities": [
        {
            "name": "Marca da Presa",
            "timing": "movimento",
            "text": "O trog caçador analisa uma criatura em alcance curto. Até o fim da cena, ele recebe +1d8 em rolagens de dano contra essa criatura."
        },
        {
            "name": "Mau Cheiro",
            "timing": "padrão",
            "text": "O trog expele um gás fétido. Todas as criaturas (exceto trogs) em alcance curto ficam enjoadas por 1d6 rodadas (Fortitude CD 16 evita). Uma criatura que passe no teste de resistência fica imune a esta habilidade por um dia. Veneno."
        },
        {
            "name": "Sangue Frio",
            "timing": null,
            "text": "O trog sofre 1 ponto de dano adicional por dado de dano de frio."
        }
    ],
    "equipment": "Arco longo, flechas x20",
    "treasure": "Metade.",
    "skillsText": "Furtividade +13, Sobrevivência +7"
};

export const trogCombatente = {
    "id": "trog-combatente",
    "name": "Trog Combatente",
    "type": "monster",
    "subtype": "trog",
    "size": "Médio",
    "challengeRating": 1,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 40,
        "bookPage": 38
    },
    "stats": {
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
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Lança +11 (1d6+5) e mordida +11 (1d6+5)."
        },
        {
            "name": "À Distância",
            "text": "Azagaia +9 (1d6+5)."
        }
    ],
    "abilities": [
        {
            "name": "Mau Cheiro",
            "timing": "padrão",
            "text": "O trog expele um gás fétido. Todas as criaturas (exceto trogs) em alcance curto ficam enjoadas por 1d6 rodadas (Fortitude CD 15 evita). Uma criatura que passe no teste de resistência fica imune a esta habilidade por um dia. Veneno."
        },
        {
            "name": "Sangue Frio",
            "timing": null,
            "text": "O trog sofre 1 ponto de dano adicional por dado de dano de frio."
        }
    ],
    "equipment": "Azagaias x2, lança",
    "treasure": "Metade.",
    "skillsText": "Furtividade +7"
};

export const trogReiDosTuneis = {
    "id": "trog-rei-dos-tuneis",
    "name": "Trog Rei dos Túneis",
    "type": "monster",
    "subtype": "trog",
    "size": "Grande",
    "challengeRating": 5,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 40,
        "bookPage": 38,
        "pdfPageEnd": 41,
        "bookPageEnd": 39
    },
    "stats": {
        "initiative": 5,
        "perception": 4,
        "defense": 25,
        "fortitude": 17,
        "reflex": 11,
        "will": 4,
        "hitPoints": 226,
        "speedText": "9m (6q), escavação 6m (4q)",
        "senses": "visão no escuro",
        "defensesText": null,
        "attributes": {
            "str": 5,
            "dex": 1,
            "con": 5,
            "int": -2,
            "wis": 0,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Duas garras +17 (1d8+6) e mordida +17 (1d8+6)."
        }
    ],
    "abilities": [
        {
            "name": "Dilacerar",
            "timing": null,
            "text": "Se o trog rei dos túneis acerta os dois ataques de garra em uma mesma criatura no mesmo turno, causa mais 2d8+6 pontos de dano."
        },
        {
            "name": "Gosto por Tripas",
            "timing": null,
            "text": "O rei recebe +2 em rolagens de dano contra criaturas em que já tenha causado dano nesta cena."
        },
        {
            "name": "Mau Cheiro",
            "timing": "padrão",
            "text": "O trog expele um gás fétido. Todas as criaturas (exceto trogs) em alcance curto ficam enjoadas por 1d6 rodadas (Fortitude CD 20 evita). Uma criatura que passe no teste de resistência fica imune a esta habilidade por um dia. Veneno."
        },
        {
            "name": "Terror dos Túneis",
            "timing": null,
            "text": "Uma criatura que comece seu turno em alcance curto do rei dos túneis fica apavorada por 1 rodada e então abalada (Von CD 20 muda para abalada por 1 rodada e a criatura não pode mais ser afetada por esta habilidade até o fim da cena)."
        },
        {
            "name": "Sangue Frio",
            "timing": null,
            "text": "O trog sofre 1 ponto de dano adicional por dado de dano de frio."
        }
    ],
    "equipment": null,
    "treasure": "Metade.",
    "skillsText": "Furtividade +7, Intimidação +7"
};

export const aspectoDeAharadak = {
    "id": "aspecto-de-aharadak",
    "name": "Aspecto de Aharadak",
    "type": "monster",
    "subtype": "lefeu",
    "size": "Grande",
    "challengeRating": 10,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 56,
        "bookPage": 54
    },
    "stats": {
        "initiative": 10,
        "perception": 25,
        "defense": 38,
        "fortitude": 22,
        "reflex": 10,
        "will": 20,
        "hitPoints": 472,
        "speedText": "9m (6q), voo 9m (6q)",
        "senses": "percepção às cegas",
        "defensesText": "redução de dano 10",
        "attributes": {
            "str": 10,
            "dex": 1,
            "con": 7,
            "int": 2,
            "wis": 5,
            "cha": -4
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +30 (4d8+22, 19) e duas garras +30 (3d8+22, 19)."
        }
    ],
    "abilities": [
        {
            "name": "Agarrar Aprimorado",
            "timing": "livre",
            "text": "Mordida (teste +32)."
        },
        {
            "name": "Cuspir Enxame",
            "timing": "completa",
            "text": "Sustentada. Um enxame de insetos rubros Grande surge em um ponto em alcance curto. No fim de cada um dos seus turnos, ele causa 4d12 pontos de dano de ácido a qualquer criatura em seu espaço. O aspecto pode gastar uma ação de movimento para mover o enxame com deslocamento de voo 12m e não gasta PM para sustentá-lo.",
            "magical": true
        },
        {
            "name": "Engolir",
            "timing": "padrão",
            "text": "No início de cada um dos turnos do aspecto, a criatura engolida sofre 4d6+11 pontos de dano de impacto mais 4d6+11 pontos de dano de ácido. Ela pode escapar causando um total de 25 pontos de dano a ele (Defesa 15, redução de dano 0)."
        },
        {
            "name": "Insanidade da Tormenta",
            "timing": null,
            "text": "2d12 PM (Von CD 30 evita)."
        },
        {
            "name": "Sangue Ácido",
            "timing": null,
            "text": "Quando o aspecto sofre dano por um ataque corpo a corpo adjacente, o atacante sofre 10 pontos de dano de ácido."
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
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": null
};

export const avatarDeAharadak = {
    "id": "avatar-de-aharadak",
    "name": "Avatar de Aharadak",
    "type": "monster",
    "subtype": "lefeu",
    "size": "Colossal",
    "challengeRating": "S",
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 64,
        "bookPage": 62
    },
    "stats": {
        "initiative": 18,
        "perception": 30,
        "defense": 70,
        "fortitude": 36,
        "reflex": 31,
        "will": 31,
        "hitPoints": 2804,
        "speedText": "voo 18m (12q)",
        "senses": "percepção às cegas (longo)",
        "defensesText": "redução de dano 20; maior que a morte",
        "attributes": {
            "str": 20,
            "dex": -2,
            "con": 12,
            "int": 4,
            "wis": 10,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Quatro tentáculos +58 (4d12+47) e mordida +58 (6d12+47)."
        }
    ],
    "abilities": [
        {
            "name": "Maior que a Morte",
            "timing": null,
            "text": "Enquanto tiver pelo menos metade dos PV, o Avatar de Aharadak é imune a efeitos de morte instantânea, inclusive os que aprisionam ou destroem seu corpo ou alma. Dano ou perda de PV ainda pode reduzi-lo a 0 PV ou menos. Como criatura de ND S, ele conta como ND 20 para estatísticas ausentes da ficha e como ND superior a 20 para habilidades de outras criaturas."
        },
        {
            "name": "Agarrar Aprimorado",
            "timing": "livre",
            "text": "Tentáculo (teste +68). O avatar de Aharadak pode manter até 4 criaturas Enormes ou menores agarradas ao mesmo tempo."
        },
        {
            "name": "Centelha Divina",
            "timing": null,
            "text": "O avatar pode lançar qualquer magia divina como um clérigo de 20º nível sem gastar PM (CD 52, limite de PM 20)."
        },
        {
            "name": "Devorar a Existência",
            "timing": null,
            "text": "Uma criatura atingida por um ataque corpo a corpo do avatar perde 1d4 PM. Se não tiver PM suficientes, a criatura fica fascinada."
        },
        {
            "name": "Engolir",
            "timing": "padrão",
            "text": "No início de cada um dos turnos do avatar, em vez de sofrer dano, a criatura engolida deve fazer um teste de Vontade (CD 52). Se passar, aparece em um local aleatório em alcance médio, debilitada e confusa por 1d4 rodadas. Se falhar, perde todos os seus pontos de mana ou, se não tiver mais PM, é transportada para o Reino de Aharadak. Ela pode escapar causando um total de 250 pontos de dano a ele (Defesa 30, redução de dano 5)."
        },
        {
            "name": "Insanidade da Tormenta",
            "timing": null,
            "text": "2d20 PM (Von CD 52 evita). Esta habilidade pode afetar mesmo criaturas que já foram afetadas pela Insanidade da Tormenta de outras criaturas neste dia."
        },
        {
            "name": "Presença da Tormenta",
            "timing": null,
            "text": "O avatar emana uma aura com 30m de raio. Cada criatura que comece seu turno nessa área fica esmorecida (CD 25 +2 por turno consecutivo evita). Além disso, nessa área o custo em PM de habilidades aumenta em +2 e cada item encantado perde um encanto (à escolha do portador). No início de cada turno do avatar, role 1d6 para determinar um efeito: 1) Definhamento: criaturas na área perdem 10d8 PV e ficam debilitadas (Fort CD 52 evita). 2) Tempestade Elétrica: cada criatura rola 1d20; em resultado ímpar, sofre 5d8 eletricidade e 5d8 trevas. 3) Chuva Ácida: criaturas na área sofrem 4d8 ácido. 4) Labaredas Infernais: cada criatura rola 1d20; em resultado ímpar, entra em combustão, sofrendo 5d8 fogo e 5d8 trevas (Ref CD 52 reduz à metade). 5) Pesadelos Reais: cada criatura faz Vontade CD 52; se falhar, fica apavorada. Enquanto estiver assim, repete o teste no início de seus turnos; falha causa 6d8 dano psíquico e perda de 1d8 PM. O efeito termina após dois sucessos consecutivos. 6) Magia Caótica: o avatar anula todas as magias na área; para lançar magia, é preciso Vontade CD 52. Em falha, a magia não tem efeito mas os PM são gastos; em falha por 5 ou mais, o conjurador sofre 4d8 dano de essência."
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
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": null
};

const avatarDeAharadakDivine = {
    id: "avatar-de-aharadak-deuses-de-arton",
    name: "Avatar de Aharadak",
    variantOf: avatarDeAharadak.id,
    type: "monster",
    subtype: "lekael",
    size: "Colossal",
    challengeRating: "S",
    role: "solo",
    roleSource: "pdf-review",
    description: [],
    source: {
        book: "Deuses de Arton",
        edition: "1ª edição, maio de 2025 (v1.1)",
        pdfFile: "T20 Deuses de Arton.pdf",
        pdfPage: 153,
        bookPage: 151
    },
    stats: {
        initiative: 22,
        perception: 31,
        defense: 73,
        fortitude: 37,
        reflex: 27,
        will: 31,
        hitPoints: 2477,
        speedText: "3m (2q), voo 12m (8q)",
        senses: "percepção às cegas (longo)",
        defensesText: "imunidade a efeitos mentais e medo, maior que a morte, redução de dano 20",
        attributes: {
            str: 18,
            dex: 6,
            con: 12,
            int: 16,
            wis: 10,
            cha: 5
        }
    },
    actions: [
        {
            name: "Corpo a Corpo",
            text: "Sete garras +67 (4d10+31, 19)."
        }
    ],
    abilities: [
        {
            name: "Carapaça Suprema",
            timing: null,
            text: "Reduz à metade o dano de fontes mundanas, exceto o de aço-rubi."
        },
        {
            name: "Domínio sobre o Tempo",
            timing: null,
            text: "Pode fazer duas ações padrão e duas ações de movimento a cada turno."
        },
        {
            name: "Insanidade da Tormenta",
            timing: null,
            text: "2d20 PM (Von CD 51 evita). Pode afetar criaturas que já sofreram Insanidade da Tormenta de outras criaturas no mesmo dia."
        },
        {
            name: "Invocar Lefeu",
            timing: "completa",
            text: "Uma vez por cena, invoca um ou mais lefeu à sua escolha, com ND total 20. Eles surgem em alcance curto e agem a partir da rodada seguinte, em suas iniciativas."
        },
        {
            name: "Poder sobre a Realidade",
            timing: null,
            text: "Pode lançar qualquer magia simulada de até 4º círculo como um conjurador de 20º nível, sem gastar PM (CD 51, limite de PM 20). Uma vez por rodada, pode lançar Momento de Tormenta como ação livre."
        },
        {
            name: "Percepção Perfeita",
            timing: null,
            text: "Está sempre sob efeito de Visão da Verdade com todos os aprimoramentos.",
            magical: true
        },
        {
            name: "Presentes Rubros",
            timing: "completa",
            text: "Uma criatura voluntária em alcance curto recebe dois poderes da Tormenta à escolha dela. Com o suplemento Ameaças de Arton, pode receber um simbionte da p. 61 no lugar dos poderes. Cada criatura pode receber esta bênção uma vez. Ao morrer, ela vai para o mundo de Aharadak e não pode ser revivida."
        },
        {
            name: "Telepatia",
            timing: null,
            text: "Pode se comunicar com qualquer criatura de Int –3 ou maior em uma área de Tormenta ou a até 1km dela."
        },
        {
            name: "Terror Absoluto",
            timing: null,
            text: "Emana uma aura de medo de 30m de raio. Criaturas à escolha do Avatar que entram na aura ou começam o turno nela ficam abaladas (CD 51 evita). Se já estiverem abaladas, ficam apavoradas. Criaturas sob esse efeito de pavor sofrem os efeitos de falhar no teste contra a Insanidade da Tormenta do Avatar, mesmo se já afetadas nesse dia. Criaturas imunes a medo ainda são afetadas e recebem +5 nos testes de resistência contra a aura. Medo."
        }
    ],
    equipment: null,
    treasure: "2d6 peças rubras (CD 35 para extrair, cada peça vale T$ 1.500 para fabricar itens de matéria vermelha).",
    skillsText: "Atletismo +34, Conhecimento +34, Diplomacia +36, Enganação +36, Intimidação +36, Intuição +36, Misticismo +34, Religião +28"
};

export const fanaticoLefou = {
    "id": "fanatico-lefou",
    "name": "Fanático Lefou",
    "type": "monster",
    "subtype": "lefou",
    "size": "Médio",
    "challengeRating": 5,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 57,
        "bookPage": 55
    },
    "stats": {
        "initiative": 5,
        "perception": 4,
        "defense": 23,
        "fortitude": 16,
        "reflex": 11,
        "will": 6,
        "hitPoints": 55,
        "speedText": "9m (6q)",
        "senses": null,
        "defensesText": "resistência a efeitos mentais +3; resistência a efeitos lefeu e da Tormenta +5",
        "attributes": {
            "str": 5,
            "dex": 1,
            "con": 2,
            "int": -1,
            "wis": 0,
            "cha": -2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Duas garras +22 (2d6+10) e mordida +22 (1d6+10)."
        }
    ],
    "abilities": [
        {
            "name": "Frenesi Insano",
            "timing": null,
            "text": "Quando causa ou sofre dano, o fanático lefou recebe um bônus cumulativo de +2 em testes de ataque e rolagens de dano até o fim da cena."
        },
        {
            "name": "Mente Aberrante",
            "timing": null,
            "text": "Quando faz um teste de Vontade para resistir a um efeito, o fanático causa 3d6 pontos de dano psíquico na criatura que gerou o efeito.",
            "magical": true
        },
        {
            "name": "Sangue Ácido",
            "timing": null,
            "text": "Quando o fanático sofre dano por um ataque corpo a corpo adjacente, o atacante sofre 5 pontos de dano de ácido."
        }
    ],
    "equipment": null,
    "treasure": "Metade.",
    "skillsText": null
};

export const liderFanaticoLefou = {
    "id": "lider-fanatico-lefou",
    "name": "Líder Fanático Lefou",
    "type": "monster",
    "subtype": "lefou",
    "size": "Médio",
    "challengeRating": 8,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 57,
        "bookPage": 55
    },
    "stats": {
        "initiative": 9,
        "perception": 8,
        "defense": 33,
        "fortitude": 20,
        "reflex": 15,
        "will": 9,
        "hitPoints": 90,
        "speedText": "9m (6q), voo 21m (14q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a acertos críticos; resistência a efeitos lefeu, da Tormenta e mentais +5",
        "attributes": {
            "str": 5,
            "dex": 1,
            "con": 2,
            "int": -1,
            "wis": 0,
            "cha": -2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Tacape +27 (3d10+20), mordida +27 (1d4+10) e duas patas insetoides +27 (1d4+10 corte)."
        }
    ],
    "abilities": [
        {
            "name": "Frenesi Insano",
            "timing": null,
            "text": "Quando causa ou sofre dano, o fanático lefou recebe um bônus cumulativo de +2 em testes de ataque e rolagens de dano até o fim da cena."
        },
        {
            "name": "Mente Aberrante",
            "timing": null,
            "text": "Quando faz um teste de Vontade para resistir a um efeito, o fanático causa 5d6 pontos de dano psíquico na criatura que gerou o efeito.",
            "magical": true
        },
        {
            "name": "Sangue Ácido",
            "timing": null,
            "text": "Quando o fanático sofre dano por um ataque corpo a corpo adjacente, o atacante sofre 9 pontos de dano de ácido."
        }
    ],
    "equipment": "Tacape",
    "treasure": "Padrão.",
    "skillsText": "Intimidação +11"
};

export const reishidLiderDeCulto = {
    "id": "reishid-lider-de-culto",
    "name": "Reishid Líder de Culto",
    "type": "monster",
    "subtype": "lefeu",
    "size": "Médio",
    "challengeRating": 12,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 58,
        "bookPage": 56
    },
    "stats": {
        "initiative": 19,
        "perception": 23,
        "defense": 47,
        "fortitude": 20,
        "reflex": 27,
        "will": 13,
        "hitPoints": 483,
        "manaPoints": 66,
        "speedText": "9m (6q), escalada 9m (6q), voo 15m (10q)",
        "senses": "visão no escuro",
        "defensesText": "redução de dano 10",
        "attributes": {
            "str": 4,
            "dex": 7,
            "con": 5,
            "int": 4,
            "wis": 6,
            "cha": 1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Adaga da Tormenta +40 (1d4+21, 19, mais 1d8 trevas), garra +40 (2d6+21) e mordida +40 (2d6+21 mais veneno)."
        }
    ],
    "abilities": [
        {
            "name": "Ataque em Movimento",
            "timing": null,
            "text": "O reishid líder de culto pode se mover antes e depois de executar a ação agredir, desde que a distância total percorrida não seja maior que seu deslocamento."
        },
        {
            "name": "Insanidade da Tormenta",
            "timing": null,
            "text": "3d6 PM (Von CD 35 evita)."
        },
        {
            "name": "Magia Acelerada",
            "timing": "livre",
            "cost": "+4 PM",
            "text": "Uma vez por rodada, quando lança uma magia com execução de ação completa ou menor, o reishid muda a execução dela para livre."
        },
        {
            "name": "Sombra Rubra",
            "timing": null,
            "text": "Quando faz um teste de Iniciativa ou Furtividade, o reishid rola dois dados e usa o melhor resultado."
        },
        {
            "name": "Veneno",
            "timing": null,
            "text": "Paralisado por 1d6 horas (Fort CD 35 reduz para lento por 1d6 rodadas)."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como um clérigo de Aharadak de 12º nível (CD 35)."
        },
        {
            "name": "Anular a Luz",
            "timing": "padrão",
            "cost": "6 PM",
            "text": "O reishid emana escuridão em uma esfera de 6m ao seu redor e faz um teste de Religião. Magias de 3º círculo ou inferior na área com CD igual ou menor que o teste são dissipadas, aliados na área recebem +4 na Defesa até o fim da cena e inimigos ficam enjoados por 1d4 rodadas (apenas uma vez por cena)."
        },
        {
            "name": "Comando",
            "timing": "padrão",
            "cost": "4 PM",
            "text": "No início do seu próximo turno, duas criaturas em alcance curto largam os itens que estão segurando e não podem pegá-los novamente até o início de seu turno seguinte (Von evita)."
        },
        {
            "name": "Marca da Obediência",
            "timing": "padrão",
            "cost": "6 PM",
            "text": "O reishid ordena que uma criatura adjacente não ataque a ele ou a seus aliados até o fim da cena (Von evita). A criatura pode repetir o teste de Vontade em cada um de seus turnos subsequentes mas, se falhar, sofre 3d6 pontos de dano psíquico."
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
    "equipment": null,
    "treasure": "Padrão mais adaga da Tormenta (veja Reishid).",
    "skillsText": "Furtividade +27, Intimidação +11, Religião +21"
};

export const senhorDoGiganteRubroFormaFinal = {
    "id": "senhor-do-gigante-rubro-forma-final",
    "name": "Senhor do Gigante Rubro Forma Final",
    "type": "monster",
    "subtype": "lefeu",
    "size": "Grande",
    "challengeRating": 16,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 60,
        "bookPage": 58,
        "pdfPageEnd": 61,
        "bookPageEnd": 59
    },
    "stats": {
        "initiative": 20,
        "perception": 21,
        "defense": 55,
        "fortitude": 30,
        "reflex": 26,
        "will": 16,
        "hitPoints": 850,
        "speedText": "12m (8q), escalada 9m (6q)",
        "senses": "percepção às cegas; não pode ser flanqueado",
        "defensesText": "imunidade a acertos críticos, cansaço, efeitos de metabolismo, paralisia e veneno; redução de dano 15; resistência a magia +5",
        "attributes": {
            "str": 14,
            "dex": 4,
            "con": 11,
            "int": -2,
            "wis": 2,
            "cha": -4
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Quatro garras +43 (1d12+18 mais 1d6 matéria vermelha, 19/x3, sangramento) e dois tentáculos +43 (1d12+18 mais 1d6 matéria vermelha)."
        }
    ],
    "abilities": [
        {
            "name": "Agarrar Aprimorado",
            "timing": "livre",
            "text": "Tentáculo (teste +45)."
        },
        {
            "name": "Armamento Rubro",
            "timing": null,
            "text": "As armas do gigante rubro são mágicas e de matéria vermelha. Criaturas atingidas pelas garras ficam sangrando e criaturas atingidas pelos tentáculos ficam fracas (ou debilitadas, se já estiverem fracas)."
        },
        {
            "name": "Carapaça Espinhosa",
            "timing": null,
            "text": "Quando agarra uma criatura ou é agarrado, e no início de cada turno em que estiver agarrando ou agarrado, o gigante rubro causa 14 pontos de dano de perfuração nesta criatura."
        },
        {
            "name": "Dilacerar",
            "timing": null,
            "text": "Para cada dois ataques de garra que o gigante rubro acertar em uma mesma criatura no mesmo turno, ele causa mais 6d8+18 pontos de dano."
        },
        {
            "name": "Insanidade da Tormenta",
            "timing": null,
            "text": "2d12 PM (Von CD 42 evita)."
        },
        {
            "name": "Morte dos Céus",
            "timing": "movimento",
            "text": "O gigante rubro salta para um espaço desocupado em alcance médio. Se aterrissar adjacente a uma criatura, seu primeiro ataque contra ela neste turno recebe +2 no teste de ataque e causa +2d8 pontos de dano."
        },
        {
            "name": "Teia Corrosiva",
            "timing": "movimento",
            "text": "O gigante rubro dispara muco adesivo em uma criatura em alcance curto. A vítima sofre 8d6 pontos de dano de ácido e fica imóvel (Ref CD 42 reduz à metade e evita a condição). Enquanto estiver imóvel desta forma, sofre 3d6 pontos de dano de ácido no início de cada um de seus turnos. Pode tentar se libertar com uma ação padrão e um teste de Acrobacia ou Atletismo (CD 42)."
        },
        {
            "name": "Varrer",
            "timing": "livre",
            "text": "Uma vez por rodada, quando o gigante rubro faz um ataque corpo a corpo e reduz os pontos de vida do alvo para 0 ou menos, pode realizar um ataque adicional contra outra criatura dentro do seu alcance."
        },
        {
            "name": "Dolorosa Separação",
            "timing": null,
            "text": "Separar um piloto de um gigante rubro em sua forma final é impossível; neste estágio, ambos se tornam um único lefeu."
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
    "equipment": null,
    "treasure": "1d4 sementes rubras (CD 31 para extrair). Cada semente rubra cura 10d8+10 PV e remove enjoado, envenenado, exausto, fatigado e fraco; depois deixa o consumidor debilitado até o fim de seu próximo turno. Pode alcançar preço de até T$ 3.600.",
    "skillsText": null
};

export const senhorDoGiganteRubroFormaInicial = {
    "id": "senhor-do-gigante-rubro-forma-inicial",
    "name": "Senhor do Gigante Rubro Forma Inicial",
    "type": "monster",
    "subtype": null,
    "size": "Grande",
    "challengeRating": 9,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 60,
        "bookPage": 58,
        "pdfPageEnd": 61,
        "bookPageEnd": 59
    },
    "stats": {
        "initiative": 13,
        "perception": 15,
        "defense": 34,
        "fortitude": 21,
        "reflex": 15,
        "will": 9,
        "hitPoints": 340,
        "speedText": "12m (8q), escalada 9m (6q)",
        "senses": "percepção às cegas; não pode ser flanqueado",
        "defensesText": "imunidade a acertos críticos, cansaço, efeitos de metabolismo, paralisia e veneno; redução de ácido, eletricidade, fogo, frio, luz e trevas 10; resistência a magia +5",
        "attributes": {
            "str": 11,
            "dex": 3,
            "con": 9,
            "int": -1,
            "wis": 2,
            "cha": -2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Quatro garras +28 (1d8+11, 19/x3)."
        }
    ],
    "abilities": [
        {
            "name": "Carapaça Espinhosa",
            "timing": null,
            "text": "Quando agarra uma criatura ou é agarrado, e no início de cada turno em que estiver agarrando ou agarrado, o gigante rubro causa 11 pontos de dano de perfuração nesta criatura."
        },
        {
            "name": "Desembarcar",
            "timing": "completa",
            "text": "O senhor do gigante rubro pode sair de seu simbionte por curtos períodos. Isso o deixa fraco e, a cada hora de afastamento, o torna fatigado, exausto, inconsciente e por fim morto. Voltar ao interior da armadura é uma ação completa e remove essas condições no início da rodada seguinte. Geralmente, o piloto é um iniciado da agonia. Se o piloto for morto fora da armadura, ela se desintegra automaticamente."
        },
        {
            "name": "Evoluções",
            "timing": null,
            "text": "Cada gigante rubro possui duas habilidades, escolhidas entre Dilacerar, Morte dos Céus, Teia Corrosiva, Tentáculo e Zunido Enlouquecedor."
        },
        {
            "name": "Dilacerar",
            "timing": null,
            "text": "Para cada dois ataques de garra que o gigante rubro acertar em uma mesma criatura no mesmo turno, ele causa mais 2d8+10 pontos de dano."
        },
        {
            "name": "Morte dos Céus",
            "timing": "movimento",
            "text": "O gigante rubro salta para um espaço desocupado em alcance médio. Se aterrissar adjacente a uma criatura, seu primeiro ataque contra ela neste turno recebe +2 no teste de ataque e causa +1d8 pontos de dano."
        },
        {
            "name": "Teia Corrosiva",
            "timing": "movimento",
            "text": "O gigante rubro dispara muco adesivo em uma criatura em alcance curto. A vítima sofre 3d6 pontos de dano de ácido e fica imóvel (Ref CD 28 reduz à metade e evita a condição). Enquanto estiver imóvel desta forma, sofre 3d6 pontos de dano de ácido no início de cada um de seus turnos. Pode se libertar com uma ação padrão e um teste de Acrobacia ou Atletismo (CD 28)."
        },
        {
            "name": "Tentáculo",
            "timing": null,
            "text": "O gigante rubro possui um ataque adicional de tentáculo (como as garras, mas causa dano de impacto). Se acertar um ataque de tentáculo, pode fazer a manobra agarrar como uma ação livre (teste +30)."
        },
        {
            "name": "Zunido Enlouquecedor",
            "timing": "reação",
            "text": "A cada 100 PV que perde, o gigante rubro emite um zunido em uma esfera de 30m ao seu redor. Criaturas nessa área perdem 2d8 PM (Von CD 28 evita)."
        },
        {
            "name": "Dolorosa Separação",
            "timing": null,
            "text": "É possível remover um piloto inconsciente de um gigante rubro com um teste de Cura (CD 20) que exige uma hora de trabalho. Para prevenir as condições do afastamento, é necessário fazer um teste de Cura (CD 20) a cada hora, ou usar Purificação. Separar a conexão mental exige um teste estendido de Misticismo (CD 20), com 5 sucessos e um teste por dia; em caso de falha, o processo pode ser recomeçado com penalidade cumulativa de –5. Se ambas as etapas forem bem-sucedidas, o piloto fica livre da dependência; se voltar a embarcar, o processo precisa ser refeito do zero."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": null
};

export const zyrrinaz = {
    "id": "zyrrinaz",
    "name": "Zyrrinaz",
    "type": "monster",
    "subtype": "lefeu",
    "size": "Médio",
    "challengeRating": 5,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 61,
        "bookPage": 59
    },
    "stats": {
        "initiative": 10,
        "perception": 13,
        "defense": 24,
        "fortitude": 11,
        "reflex": 19,
        "will": 7,
        "hitPoints": 41,
        "speedText": "12m (8q), escalada 12m (8q)",
        "senses": "visão no escuro",
        "defensesText": "redução de dano 5",
        "attributes": {
            "str": 2,
            "dex": 6,
            "con": 2,
            "int": -1,
            "wis": 4,
            "cha": -3
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Garra +19 (2d6+13)."
        },
        {
            "name": "À Distância",
            "text": "Arco longo +23 (1d12+19, x3, mais 1d6 matéria vermelha)."
        }
    ],
    "abilities": [
        {
            "name": "Flechas da Anticriação",
            "timing": null,
            "text": "O zyrrinaz é capaz de disparar por ângulos impossíveis, inutilizando as defesas de seus alvos. Seus ataques de arco ignoram cobertura, camuflagem, redução de dano e habilidades que evitam ou reduzem dano (como Durão ou Rolamento Defensivo). Além disso, quando ataca com seu arco, ele rola dois dados e usa o melhor resultado."
        },
        {
            "name": "Insanidade da Tormenta",
            "timing": null,
            "text": "2d4 PM (Von CD 20 evita)."
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
    "equipment": "Arco longo, flechas de matéria vermelha x20",
    "treasure": "Nenhum.",
    "skillsText": "Acrobacia +10, Furtividade +10"
};

export const dragaoAdultoDaTirania = {
    "id": "dragao-adulto-da-tirania",
    "name": "Dragão Adulto da Tirania",
    "type": "monster",
    "subtype": "dragão",
    "size": "Enorme",
    "challengeRating": 11,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 70,
        "bookPage": 68,
        "pdfPageEnd": 71,
        "bookPageEnd": 69
    },
    "stats": {
        "initiative": 12,
        "perception": 15,
        "defense": 42,
        "fortitude": 24,
        "reflex": 11,
        "will": 20,
        "hitPoints": 614,
        "manaPoints": 77,
        "speedText": "12m (8q), voo 24m (16q)",
        "senses": "percepção às cegas, visão no escuro",
        "defensesText": "imunidade a dano de luz; redução de dano 10; resistência a magia +3; vulnerabilidade a trevas; imunidade a atordoamento, cansaço, metamorfose e paralisia",
        "attributes": {
            "str": 11,
            "dex": 1,
            "con": 8,
            "int": 4,
            "wis": 4,
            "cha": 4
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +34 (4d10+25, 18) e duas garras +34 (3d10+25, 18)."
        }
    ],
    "abilities": [
        {
            "name": "Aura Aterradora",
            "timing": null,
            "text": "A simples visão de um dragão adulto ou mais velho amedronta o mais valente dos aventureiros. Uma criatura que comece seu turno em alcance longo do dragão fica apavorada (se tiver 4 níveis ou menos) ou abalada (se tiver 5 níveis ou mais) até o fim da cena. Uma criatura que passe no teste de resistência fica imune a esta habilidade por um dia. Vontade CD 32 evita."
        },
        {
            "name": "Imposição Avassaladora",
            "timing": "livre",
            "text": "Uma vez por rodada, quando o dragão da tirania reduz os pontos de vida de um inimigo para 0 ou menos, os outros inimigos em alcance médio sofrem 4d12 pontos de dano psíquico (Von CD 32 reduz à metade). Medo."
        },
        {
            "name": "Sopro",
            "timing": "padrão",
            "text": "Criaturas em uma linha de 18m sofrem 12d12 pontos de dano de luz e ficam cegas por 1d4 rodadas (Ref CD 32 reduz à metade e evita a condição). Uma criatura só pode ficar cega por esta habilidade uma vez por cena. Recarga (movimento)."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como um conjurador arcano de 11º nível (CD 32)."
        },
        {
            "name": "Campo de Força",
            "timing": "reação",
            "cost": "4 PM",
            "text": "Quando sofre dano, o dragão recebe redução de dano 30 contra este dano."
        },
        {
            "name": "Desespero Esmagador",
            "timing": "padrão",
            "cost": "11 PM",
            "text": "Criaturas em um cone de 6m ficam debilitadas e esmorecidas até o fim da cena e pasmas por 1 rodada (Von evita a condição pasmo e reduz as demais para 1 rodada)."
        },
        {
            "name": "Dissipar Magia",
            "timing": "padrão",
            "cost": "3 PM",
            "text": "O dragão escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias nesse alvo com CD igual ou menor que o resultado do teste são dissipadas."
        },
        {
            "name": "Enfeitiçar",
            "timing": "padrão",
            "cost": "1 PM",
            "text": "Um humanoide em alcance curto fica enfeitiçado (Von anula)."
        },
        {
            "name": "Luz",
            "timing": "padrão",
            "cost": "1 PM",
            "text": "Uma criatura fica ofuscada pela cena (Von anula)."
        },
        {
            "name": "Tempestade Divina",
            "timing": "completa",
            "cost": "9 PM",
            "text": "Sustentada. Só pode ser lançada em ambientes abertos. Um vendaval com chuva preenche um cilindro de 90m de raio e 90m de altura. Nessa área, criaturas invisíveis têm sua silhueta revelada, criaturas Médias ou menores ficam lentas e criaturas voadoras precisam passar num teste de Atletismo por rodada ou caem no solo."
        },
        {
            "name": "Imunidades Dracônicas",
            "timing": null,
            "text": "Dragões são imunes a efeitos de atordoamento, cansaço, dano do tipo de seu sopro, metamorfose e paralisia."
        },
        {
            "name": "Metamorfose Dracônica",
            "timing": "completa",
            "text": "Dragões jovens ou mais velhos podem se transformar em outras criaturas, como a magia Metamorfose (mas sem limitação para tamanhos menores que o seu). Eles costumam usar esta habilidade para se infiltrar em sociedades humanoides, aprender sobre seus costumes ou apenas quando não querem ser reconhecidos. Um dragão morto reverte à sua forma original."
        },
        {
            "name": "Magia Dracônica",
            "timing": null,
            "text": "Dragões adultos ou mais velhos podem lançar magias sem palavras mágicas, gestos ou concentração."
        }
    ],
    "equipment": null,
    "treasure": "Dobro e 4 peças de couro de dragão (CD 26 para extrair).",
    "skillsText": "Atletismo +32, Intimidação +15, Misticismo +15"
};

export const dragaoAdultoDosSegredos = {
    "id": "dragao-adulto-dos-segredos",
    "name": "Dragão Adulto dos Segredos",
    "type": "monster",
    "subtype": "dragão",
    "size": "Enorme",
    "challengeRating": 11,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 71,
        "bookPage": 69
    },
    "stats": {
        "initiative": 14,
        "perception": 17,
        "defense": 40,
        "fortitude": 13,
        "reflex": 17,
        "will": 25,
        "hitPoints": 522,
        "manaPoints": 90,
        "speedText": "12m (8q), voo 24m (16q)",
        "senses": "percepção às cegas, visão no escuro",
        "defensesText": "imunidade a trevas; redução de dano 10; resistência a magia +3; vulnerabilidade a luz; imunidade a atordoamento, cansaço, metamorfose e paralisia",
        "attributes": {
            "str": 7,
            "dex": 1,
            "con": 6,
            "int": 8,
            "wis": 6,
            "cha": 6
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +33 (3d12+20, 18) e duas garras +35 (2d12+20, 18)."
        }
    ],
    "abilities": [
        {
            "name": "Aura Aterradora",
            "timing": null,
            "text": "A simples visão de um dragão adulto ou mais velho amedronta o mais valente dos aventureiros. Uma criatura que comece seu turno em alcance longo do dragão fica apavorada (se tiver 4 níveis ou menos) ou abalada (se tiver 5 níveis ou mais) até o fim da cena. Uma criatura que passe no teste de resistência fica imune a esta habilidade por um dia. Vontade CD 32 evita."
        },
        {
            "name": "Enxergar as Farsas",
            "timing": null,
            "text": "O dragão adulto dos segredos está permanentemente sob o efeito básico da magia Visão da Verdade."
        },
        {
            "name": "Esmiuçar a Alma",
            "timing": null,
            "text": "Quando uma criatura fica abalada pelo dragão, ele enxerga seus segredos mais profundos. Além de obter quaisquer informações que o mestre julgue adequadas, até o fim da cena o dragão recebe +2 em testes de perícia contra aquela criatura e passa automaticamente em testes de Intuição contra ela."
        },
        {
            "name": "Magia Ampliada",
            "timing": "livre",
            "cost": "+2 PM",
            "text": "Quando lança uma magia, o dragão aumenta seu alcance em um passo (de curto para médio, de médio para longo) ou dobra sua área de efeito."
        },
        {
            "name": "Sopro",
            "timing": "padrão",
            "text": "Criaturas numa esfera de 9m em alcance médio do dragão sofrem 12d12 pontos de dano de trevas e ficam enjoadas por 1d4 rodadas (Ref CD 38 reduz à metade e evita a condição). Uma criatura só pode ficar enjoada por esta habilidade uma vez por cena. Recarga (movimento)."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como um conjurador arcano de 11º nível (CD 35)."
        },
        {
            "name": "Campo de Força",
            "timing": "reação",
            "cost": "7 PM",
            "text": "Quando sofre dano, o dragão recebe redução de dano 50 contra este dano."
        },
        {
            "name": "Compreensão",
            "timing": "padrão",
            "cost": "4 PM",
            "text": "O dragão vasculha os pensamentos de um alvo em alcance curto para extrair informações (Von anula)."
        },
        {
            "name": "Criar Ilusão",
            "timing": "padrão",
            "cost": "9 PM",
            "text": "O dragão pode criar ilusões com imagens e sons combinados em alcance médio. As ilusões podem ocupar até 9 cubos de 1,5m e também podem criar sensações táteis, como texturas. Criaturas que não saibam que essas são ilusões não conseguem atravessá-las. As ilusões ainda são incapazes de causar e sofrer dano (Von desacredita e permite atravessar as ilusões)."
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
            "text": "O dragão escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias nesse alvo com CD igual ou menor que o resultado do teste são dissipadas."
        },
        {
            "name": "Escuridão",
            "timing": "padrão",
            "cost": "3 PM",
            "text": "Uma criatura em alcance curto fica cega pela cena (Fort reduz para 1 rodada)."
        },
        {
            "name": "Marca da Obediência",
            "timing": "padrão",
            "cost": "6 PM",
            "text": "O dragão ordena que uma criatura adjacente não ataque a ele ou a seus aliados até o fim da cena (Von evita). A criatura pode repetir o teste de Vontade em cada um de seus turnos subsequentes mas, se falhar, sofre 3d6 pontos de dano psíquico."
        },
        {
            "name": "Imunidades Dracônicas",
            "timing": null,
            "text": "Dragões são imunes a efeitos de atordoamento, cansaço, dano do tipo de seu sopro, metamorfose e paralisia."
        },
        {
            "name": "Metamorfose Dracônica",
            "timing": "completa",
            "text": "Dragões jovens ou mais velhos podem se transformar em outras criaturas, como a magia Metamorfose (mas sem limitação para tamanhos menores que o seu). Eles costumam usar esta habilidade para se infiltrar em sociedades humanoides, aprender sobre seus costumes ou apenas quando não querem ser reconhecidos. Um dragão morto reverte à sua forma original."
        },
        {
            "name": "Magia Dracônica",
            "timing": null,
            "text": "Dragões adultos ou mais velhos podem lançar magias sem palavras mágicas, gestos ou concentração."
        }
    ],
    "equipment": null,
    "treasure": "Dobro e 4 peças de couro de dragão (CD 26 para extrair).",
    "skillsText": "Conhecimento +19, Enganação +17, Intimidação +17, Intuição +25, Misticismo +19"
};

export const dragaoBicefalo = {
    "id": "dragao-bicefalo",
    "name": "Dragão Bicéfalo",
    "type": "monster",
    "subtype": "dragão",
    "size": "Enorme",
    "challengeRating": 12,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 76,
        "bookPage": 74
    },
    "stats": {
        "initiative": 13,
        "perception": 17,
        "defense": 44,
        "fortitude": 26,
        "reflex": 12,
        "will": 20,
        "hitPoints": 650,
        "speedText": "12m (8q), voo 24m (16q)",
        "senses": "percepção às cegas, não pode ser flanqueado, visão no escuro",
        "defensesText": "imunidade a ácido e eletricidade; redução de dano 10; resistência a magia +3; imunidade a atordoamento, cansaço, metamorfose e paralisia",
        "attributes": {
            "str": 11,
            "dex": 1,
            "con": 8,
            "int": 3,
            "wis": 5,
            "cha": 4
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +36 (4d10+26, 18) e garra +36 (3d10+26, 18)."
        }
    ],
    "abilities": [
        {
            "name": "Aura Aterradora",
            "timing": null,
            "text": "A simples visão de um dragão adulto ou mais velho amedronta o mais valente dos aventureiros. Uma criatura que comece seu turno em alcance longo do dragão fica apavorada (se tiver 4 níveis ou menos) ou abalada (se tiver 5 níveis ou mais) até o fim da cena. Uma criatura que passe no teste de resistência fica imune a esta habilidade por um dia. Vontade CD 33 evita."
        },
        {
            "name": "Duas Mentes",
            "timing": null,
            "text": "O dragão bicéfalo faz uma ação padrão adicional por rodada. Além disso, quando faz um teste de Vontade, rola dois dados e escolhe o melhor resultado."
        },
        {
            "name": "Sopro",
            "timing": "padrão",
            "text": "O dragão usa um dos sopros abaixo."
        },
        {
            "name": "Esfera Elétrica",
            "timing": null,
            "text": "O dragão dispara raios em uma esfera de 9m em alcance médio. Criaturas nessa área sofrem 12d12 pontos de dano de eletricidade e ficam ofuscadas por 1d4 rodadas (Ref CD 33 reduz à metade e evita a condição). Recarga (movimento)."
        },
        {
            "name": "Nuvem Cáustica",
            "timing": null,
            "text": "Uma nuvem de ácido cobre um cubo de 9m por 2 rodadas. Criaturas que comecem seus turnos na área sofrem 12d6 pontos de dano de ácido e ficam vulneráveis por 1d4 rodadas (Fort CD 33 reduz à metade e evita a condição). Recarga (movimento)."
        },
        {
            "name": "Imunidades Dracônicas",
            "timing": null,
            "text": "Dragões são imunes a efeitos de atordoamento, cansaço, dano do tipo de seu sopro, metamorfose e paralisia."
        },
        {
            "name": "Metamorfose Dracônica",
            "timing": "completa",
            "text": "Dragões jovens ou mais velhos podem se transformar em outras criaturas, como a magia Metamorfose (mas sem limitação para tamanhos menores que o seu). Eles costumam usar esta habilidade para se infiltrar em sociedades humanoides, aprender sobre seus costumes ou apenas quando não querem ser reconhecidos. Um dragão morto reverte à sua forma original."
        }
    ],
    "equipment": null,
    "treasure": "Dobro e 4 peças de couro de dragão (2 de dragão de ácido, 2 de dragão elétrico; CD 27 para extrair).",
    "skillsText": "Enganação +16, Intimidação +16, Misticismo +15"
};

export const dragaoFeral = {
    "id": "dragao-feral",
    "name": "Dragão Feral",
    "type": "monster",
    "subtype": "dragão",
    "size": "Enorme",
    "challengeRating": 10,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 74,
        "bookPage": 72
    },
    "stats": {
        "initiative": 13,
        "perception": 12,
        "defense": 38,
        "fortitude": 22,
        "reflex": 10,
        "will": 14,
        "hitPoints": 495,
        "speedText": "12m (8q), voo 24m (16q)",
        "senses": "faro, percepção às cegas, visão no escuro",
        "defensesText": "imunidade a frio; redução de dano 10; resistência a magia +3; vulnerabilidade a fogo; imunidade a atordoamento, cansaço, metamorfose e paralisia",
        "attributes": {
            "str": 13,
            "dex": 3,
            "con": 10,
            "int": -3,
            "wis": 2,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +30 (3d12+14, 18) e duas garras +30 (2d10+14, 18)."
        }
    ],
    "abilities": [
        {
            "name": "Amadurecimento Primitivo",
            "timing": null,
            "text": "O dragão feral conta como um dragão adulto, mas não possui as habilidades Magia Dracônica e Metamorfose Dracônica."
        },
        {
            "name": "Aura Aterradora",
            "timing": null,
            "text": "A simples visão de um dragão adulto ou mais velho amedronta o mais valente dos aventureiros. Uma criatura que comece seu turno em alcance longo do dragão fica apavorada (se tiver 4 níveis ou menos) ou abalada (se tiver 5 níveis ou mais) até o fim da cena. Uma criatura que passe no teste de resistência fica imune a esta habilidade por um dia. Vontade CD 30 evita."
        },
        {
            "name": "Dilacerar",
            "timing": null,
            "text": "Se o dragão acerta os dois ataques de garra em uma mesma criatura no mesmo turno, causa mais 3d10+14 pontos de dano."
        },
        {
            "name": "Investida Imparável",
            "timing": "completa",
            "text": "O dragão se move até o dobro do seu deslocamento, passando por qualquer criatura Grande ou menor. Criaturas em seu caminho sofrem 7d8+14 pontos de dano de corte, são empurradas até o fim do deslocamento do dragão e ficam caídas na frente dele (Ref CD 30 reduz à metade e evita o empurrão, mas não a condição caído). Recarga (movimento)."
        },
        {
            "name": "Sopro",
            "timing": "padrão",
            "text": "Todas as criaturas em um cone de 12m sofrem 12d12 pontos de dano de frio e ficam lentas (Ref CD 30 reduz à metade e evita a condição). Recarga (movimento)."
        },
        {
            "name": "Varrer",
            "timing": "livre",
            "text": "Uma vez por rodada, quando o dragão faz um ataque corpo a corpo e reduz os pontos de vida do alvo para 0 ou menos, pode realizar um ataque adicional contra outra criatura dentro do seu alcance."
        },
        {
            "name": "Imunidades Dracônicas",
            "timing": null,
            "text": "Dragões são imunes a efeitos de atordoamento, cansaço, dano do tipo de seu sopro, metamorfose e paralisia."
        }
    ],
    "equipment": null,
    "treasure": "Padrão e 2 peças de couro de dragão (CD 25 para extrair).",
    "skillsText": null
};

export const dragaoFilhoteDoBosque = {
    "id": "dragao-filhote-do-bosque",
    "name": "Dragão Filhote do Bosque",
    "type": "monster",
    "subtype": "dragão",
    "size": "Médio",
    "challengeRating": 3,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 66,
        "bookPage": 64
    },
    "stats": {
        "initiative": 8,
        "perception": 6,
        "defense": 21,
        "fortitude": 14,
        "reflex": 3,
        "will": 10,
        "hitPoints": 120,
        "speedText": "12m (8q), voo 18m (12q)",
        "senses": "percepção às cegas, visão no escuro",
        "defensesText": "imunidade a ácido; resistência a magia +1; vulnerabilidade a eletricidade; imunidade a atordoamento, cansaço, metamorfose e paralisia",
        "attributes": {
            "str": 3,
            "dex": 3,
            "con": 2,
            "int": -1,
            "wis": 1,
            "cha": 0
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +14 (2d6+4) e duas garras +14 (1d6+4)."
        }
    ],
    "abilities": [
        {
            "name": "Bote",
            "timing": "completa",
            "text": "O dragão filhote do bosque faz uma investida e ataca com sua mordida e suas duas garras. Os três ataques recebem o bônus de +2 da investida, mas devem ser feitos contra o mesmo alvo."
        },
        {
            "name": "Sopro",
            "timing": "padrão",
            "text": "Todas as criaturas numa esfera de 3m em alcance curto sofrem 2d12 pontos de dano de ácido e ficam vulneráveis por 1d4 rodadas (Ref CD 18 reduz à metade e evita a condição). Recarga (movimento)."
        },
        {
            "name": "Imunidades Dracônicas",
            "timing": null,
            "text": "Dragões são imunes a efeitos de atordoamento, cansaço, dano do tipo de seu sopro, metamorfose e paralisia."
        }
    ],
    "equipment": null,
    "treasure": "Padrão.",
    "skillsText": "Furtividade +7"
};

export const dragaoFilhoteDosRios = {
    "id": "dragao-filhote-dos-rios",
    "name": "Dragão Filhote dos Rios",
    "type": "monster",
    "subtype": "dragão",
    "size": "Grande",
    "challengeRating": 3,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 66,
        "bookPage": 64,
        "pdfPageEnd": 67,
        "bookPageEnd": 65
    },
    "stats": {
        "initiative": 9,
        "perception": 6,
        "defense": 22,
        "fortitude": 12,
        "reflex": 6,
        "will": 10,
        "hitPoints": 120,
        "speedText": "12m (8q), natação 18m (12q)",
        "senses": "percepção às cegas, visão no escuro",
        "defensesText": "imunidade a eletricidade; resistência a magia +1; vulnerabilidade a ácido; imunidade a atordoamento, cansaço, metamorfose e paralisia",
        "attributes": {
            "str": 3,
            "dex": 4,
            "con": 3,
            "int": 0,
            "wis": 0,
            "cha": 0
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +13 (2d6+4) e duas garras +13 (1d6+4)."
        }
    ],
    "abilities": [
        {
            "name": "Sopro",
            "timing": "completa",
            "text": "Todas as criaturas em um cone de 6m sofrem 2d12 pontos de dano de eletricidade e ficam ofuscadas por 1d4 rodadas (Ref CD 18 reduz à metade e evita a condição). Recarga (movimento)."
        },
        {
            "name": "Imunidades Dracônicas",
            "timing": null,
            "text": "Dragões são imunes a efeitos de atordoamento, cansaço, dano do tipo de seu sopro, metamorfose e paralisia."
        }
    ],
    "equipment": null,
    "treasure": "Padrão.",
    "skillsText": null
};

export const dragaoJovemDaProtecao = {
    "id": "dragao-jovem-da-protecao",
    "name": "Dragão Jovem da Proteção",
    "type": "monster",
    "subtype": "dragão",
    "size": "Grande",
    "challengeRating": 7,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 68,
        "bookPage": 66
    },
    "stats": {
        "initiative": 11,
        "perception": 11,
        "defense": 32,
        "fortitude": 20,
        "reflex": 9,
        "will": 12,
        "hitPoints": 320,
        "speedText": "12m (8q), voo 18m (12q)",
        "senses": "percepção às cegas, visão no escuro",
        "defensesText": "fortificação 25%; imunidade a eletricidade; redução de dano 5; resistência a magia +2; vulnerabilidade a ácido; imunidade a atordoamento, cansaço, metamorfose e paralisia",
        "attributes": {
            "str": 7,
            "dex": 2,
            "con": 6,
            "int": 2,
            "wis": 2,
            "cha": 2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +25 (2d6+14, 19) e duas garras +25 (1d8+14, 19)."
        }
    ],
    "abilities": [
        {
            "name": "Asas Guardiãs",
            "timing": "movimento",
            "text": "Todos os aliados adjacentes ao dragão recebem redução de dano 5 até o fim da cena."
        },
        {
            "name": "Sopro",
            "timing": "padrão",
            "text": "Todas as criaturas em uma linha de 12m sofrem 6d12 pontos de dano de eletricidade e ficam ofuscadas por 1d4 rodadas (Ref CD 25 reduz à metade e evita a condição). Cada vez que rolar o valor máximo em um dado do sopro, role um dado extra e some ao dano total do sopro. Recarga (movimento)."
        },
        {
            "name": "Imunidades Dracônicas",
            "timing": null,
            "text": "Dragões são imunes a efeitos de atordoamento, cansaço, dano do tipo de seu sopro, metamorfose e paralisia."
        },
        {
            "name": "Metamorfose Dracônica",
            "timing": "completa",
            "text": "Dragões jovens ou mais velhos podem se transformar em outras criaturas, como a magia Metamorfose (mas sem limitação para tamanhos menores que o seu). Eles costumam usar esta habilidade para se infiltrar em sociedades humanoides, aprender sobre seus costumes ou apenas quando não querem ser reconhecidos. Um dragão morto reverte à sua forma original."
        }
    ],
    "equipment": null,
    "treasure": "Dobro e 2 peças de couro de dragão (CD 22 para extrair).",
    "skillsText": "Diplomacia +11"
};

export const dragaoJovemDoOcaso = {
    "id": "dragao-jovem-do-ocaso",
    "name": "Dragão Jovem do Ocaso",
    "type": "monster",
    "subtype": "dragão",
    "size": "Grande",
    "challengeRating": 7,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 68,
        "bookPage": 66,
        "pdfPageEnd": 69,
        "bookPageEnd": 67
    },
    "stats": {
        "initiative": 11,
        "perception": 12,
        "defense": 31,
        "fortitude": 20,
        "reflex": 9,
        "will": 15,
        "hitPoints": 320,
        "speedText": "12m (8q), voo 18m (12q)",
        "senses": "percepção às cegas, visão no escuro",
        "defensesText": "imunidade a frio; redução de dano 5; resistência a magia +2; vulnerabilidade a fogo; imunidade a atordoamento, cansaço, metamorfose e paralisia",
        "attributes": {
            "str": 5,
            "dex": 3,
            "con": 5,
            "int": 3,
            "wis": 3,
            "cha": 2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +24 (2d6+14, 19) e duas garras +24 (1d8+14, 19)."
        }
    ],
    "abilities": [
        {
            "name": "Mordida Definhante",
            "timing": null,
            "text": "Uma criatura atingida pela mordida do dragão jovem do ocaso fica alquebrada (Von CD 25 evita e a criatura não pode mais ser afetada por esta habilidade até o fim da cena)."
        },
        {
            "name": "Sopro",
            "timing": "padrão",
            "text": "Todas as criaturas em um cone de 9m sofrem 6d12 pontos de dano de frio e ficam lentas por 1d4 rodadas (Ref CD 25 reduz à metade e evita a condição). Recarga (movimento)."
        },
        {
            "name": "Ver o Fim",
            "timing": null,
            "text": "O dragão percebe automaticamente a presença, posição e status de criaturas em alcance médio, como o efeito básico da magia Condição."
        },
        {
            "name": "Imunidades Dracônicas",
            "timing": null,
            "text": "Dragões são imunes a efeitos de atordoamento, cansaço, dano do tipo de seu sopro, metamorfose e paralisia."
        },
        {
            "name": "Metamorfose Dracônica",
            "timing": "completa",
            "text": "Dragões jovens ou mais velhos podem se transformar em outras criaturas, como a magia Metamorfose (mas sem limitação para tamanhos menores que o seu). Eles costumam usar esta habilidade para se infiltrar em sociedades humanoides, aprender sobre seus costumes ou apenas quando não querem ser reconhecidos. Um dragão morto reverte à sua forma original."
        }
    ],
    "equipment": null,
    "treasure": "Dobro e 2 peças de couro de dragão (CD 22 para extrair).",
    "skillsText": "Intimidação +11"
};

export const dragaoVeneravelDaEquidade = {
    "id": "dragao-veneravel-da-equidade",
    "name": "Dragão Venerável da Equidade",
    "type": "monster",
    "subtype": "dragão",
    "size": "Enorme",
    "challengeRating": 15,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 73,
        "bookPage": 71
    },
    "stats": {
        "initiative": 16,
        "perception": 22,
        "defense": 52,
        "fortitude": 28,
        "reflex": 15,
        "will": 22,
        "hitPoints": 800,
        "manaPoints": 97,
        "speedText": "12m (8q), voo 24m (16q)",
        "senses": "percepção às cegas, visão no escuro",
        "defensesText": "imunidade a dano de luz; redução de dano 15; resistência a magia +4; vulnerabilidade a trevas; imunidade a atordoamento, cansaço, metamorfose e paralisia",
        "attributes": {
            "str": 13,
            "dex": 1,
            "con": 10,
            "int": 6,
            "wis": 6,
            "cha": 6
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +44 (4d12+40, 17) e duas garras +44 (3d12+40, 17)."
        }
    ],
    "abilities": [
        {
            "name": "Aura Aterradora",
            "timing": null,
            "text": "A simples visão de um dragão adulto ou mais velho amedronta o mais valente dos aventureiros. Uma criatura que comece seu turno em alcance longo do dragão fica apavorada (se tiver 4 níveis ou menos) ou abalada (se tiver 5 níveis ou mais) até o fim da cena. Uma criatura que passe no teste de resistência fica imune a esta habilidade por um dia. Vontade CD 40 evita."
        },
        {
            "name": "Equalizar",
            "timing": "reação",
            "cost": "3 PM",
            "text": "Quando uma criatura (incluindo o dragão) em alcance médio faz um teste, ela o refaz, escolhendo 10 em vez de rolar o dado (Von 32 evita)."
        },
        {
            "name": "Magia Acelerada",
            "timing": "livre",
            "cost": "+4 PM",
            "text": "Uma vez por rodada, quando lança uma magia com execução de ação completa ou menor, o dragão muda a execução dela para livre."
        },
        {
            "name": "Restabelecer a Igualdade",
            "timing": "reação",
            "text": "Uma vez por rodada, quando sofre um ataque ou uma magia de um inimigo, o dragão pode fazer um ataque ou lançar uma de suas magias (conforme a ação sofrida) contra esse inimigo."
        },
        {
            "name": "Sopro",
            "timing": "padrão",
            "text": "Todas as criaturas em um cone de 15m sofrem 16d12 pontos de dano de luz e ficam cegas por 1d4 rodadas (Ref CD 40 reduz à metade, evita a condição e a criatura não pode mais ficar cega por esta habilidade pela cena). Recarga (movimento)."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "O dragão venerável lança magias como um conjurador arcano de 15º nível (CD 40)."
        },
        {
            "name": "Círculo da Justiça",
            "timing": "completa",
            "cost": "6 PM",
            "text": "Criaturas numa esfera de 9m em alcance curto sofrem –20 em testes de Acrobacia, Enganação, Furtividade e Ladinagem, e não podem mentir deliberadamente (Von reduz a penalidade para –10 e permite mentir)."
        },
        {
            "name": "Curar Ferimentos",
            "timing": "padrão",
            "cost": "15 PM",
            "text": "Uma criatura adjacente cura 16d8+16 PV."
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
            "text": "O dragão escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias nesse alvo com CD igual ou menor que o resultado do teste são dissipadas."
        },
        {
            "name": "Missão Divina",
            "timing": "padrão",
            "cost": "8 PM e penalidade de –1 PM",
            "text": "Inscreve uma marca permanente na pele do alvo. Sempre que executar uma ação hostil, o alvo recebe uma penalidade cumulativa de –2 em todos os testes (Von evita). Uma magia que dissipe outras suprime a marca e suas penalidades por um dia; elas só podem ser totalmente removidas pelo dragão ou pela magia Purificação."
        },
        {
            "name": "Selo de Mana",
            "timing": "padrão",
            "cost": "6 PM",
            "text": "Um selo mágico se manifesta em uma criatura adjacente até o fim da cena. Sempre que ela fizer qualquer ação que gaste PM, deve fazer um teste de Vontade. Se passar, a ação funciona. Se falhar, a ação não tem efeito, mas os PM são gastos mesmo assim."
        },
        {
            "name": "Velocidade",
            "timing": "padrão",
            "cost": "10 PM, sustentada",
            "text": "O dragão pode executar uma ação padrão adicional por turno."
        },
        {
            "name": "Imunidades Dracônicas",
            "timing": null,
            "text": "Dragões são imunes a efeitos de atordoamento, cansaço, dano do tipo de seu sopro, metamorfose e paralisia."
        },
        {
            "name": "Metamorfose Dracônica",
            "timing": "completa",
            "text": "Dragões jovens ou mais velhos podem se transformar em outras criaturas, como a magia Metamorfose (mas sem limitação para tamanhos menores que o seu). Eles costumam usar esta habilidade para se infiltrar em sociedades humanoides, aprender sobre seus costumes ou apenas quando não querem ser reconhecidos. Um dragão morto reverte à sua forma original."
        },
        {
            "name": "Magia Dracônica",
            "timing": null,
            "text": "Dragões adultos ou mais velhos podem lançar magias sem palavras mágicas, gestos ou concentração."
        }
    ],
    "equipment": null,
    "treasure": "Dobro e 4 peças de couro de dragão (CD 30 para extrair).",
    "skillsText": "Enganação +22, Intimidação +22, Intuição +22, Misticismo +22"
};

export const dragaoVeneravelDosRecifes = {
    "id": "dragao-veneravel-dos-recifes",
    "name": "Dragão Venerável dos Recifes",
    "type": "monster",
    "subtype": "dragão",
    "size": "Enorme",
    "challengeRating": 15,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 73,
        "bookPage": 71
    },
    "stats": {
        "initiative": 19,
        "perception": 20,
        "defense": 48,
        "fortitude": 28,
        "reflex": 20,
        "will": 17,
        "hitPoints": 790,
        "manaPoints": 97,
        "speedText": "12m (8q), natação 24m (16q), voo 24m (16q)",
        "senses": "percepção às cegas, visão no escuro",
        "defensesText": "evasão aprimorada; imunidade a eletricidade; redução de dano 15; resistência a magia +4; vulnerabilidade a ácido; imunidade a atordoamento, cansaço, metamorfose e paralisia",
        "attributes": {
            "str": 12,
            "dex": 4,
            "con": 10,
            "int": 4,
            "wis": 4,
            "cha": 8
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +44 (4d12+30, 17), duas garras +44 (2d12+30, 17) e cauda +44 (2d12+30, 17)."
        }
    ],
    "abilities": [
        {
            "name": "Aura Aterradora",
            "timing": null,
            "text": "A simples visão de um dragão adulto ou mais velho amedronta o mais valente dos aventureiros. Uma criatura que comece seu turno em alcance longo do dragão fica apavorada (se tiver 4 níveis ou menos) ou abalada (se tiver 5 níveis ou mais) até o fim da cena. Uma criatura que passe no teste de resistência fica imune a esta habilidade por um dia. Vontade CD 40 evita."
        },
        {
            "name": "Fluxo de Mana",
            "timing": null,
            "text": "O dragão pode manter dois efeitos sustentados simultaneamente com apenas uma ação livre (mas pagando o custo de cada um)."
        },
        {
            "name": "Magia Acelerada",
            "timing": "livre",
            "cost": "+4 PM",
            "text": "Uma vez por rodada, quando lança uma magia com execução de ação completa ou menor, o dragão muda a execução para livre."
        },
        {
            "name": "Profunda Paixão",
            "timing": null,
            "text": "Quando faz um teste de uma perícia baseada em Carisma, o dragão rola dois dados e escolhe o melhor."
        },
        {
            "name": "Sopro",
            "timing": "padrão",
            "text": "Todas as criaturas em uma linha de 18m sofrem 16d12 pontos de dano de eletricidade e ficam ofuscadas por 1d4 rodadas (Ref CD 40 reduz à metade e evita a condição). Cada vez que um dado de dano do sopro rolar o valor máximo, role um dado extra e some ao total. Recarga (movimento)."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como um conjurador arcano de 15º nível (CD 40)."
        },
        {
            "name": "Campo de Força",
            "timing": "reação",
            "cost": "7 PM",
            "text": "Quando sofre dano, o dragão recebe redução de dano 50 contra esse dano."
        },
        {
            "name": "Controlar o Clima",
            "timing": "completa",
            "cost": "10 PM",
            "text": "Por 4d12 horas, o clima em uma esfera de 2km muda de acordo com a vontade do dragão, podendo criar qualquer condição climática."
        },
        {
            "name": "Curar Ferimentos",
            "timing": "padrão",
            "cost": "15 PM",
            "text": "Uma criatura adjacente cura 16d8+16 PV."
        },
        {
            "name": "Enfeitiçar",
            "timing": "padrão",
            "cost": "1 PM",
            "text": "Um humanoide em alcance curto fica enfeitiçado (Von evita)."
        },
        {
            "name": "Globo de Invulnerabilidade",
            "timing": "padrão",
            "cost": "10 PM, sustentada",
            "text": "O dragão é envolto por uma esfera mágica de 3m que detém qualquer magia de 3º círculo ou menor."
        },
        {
            "name": "Suporte Ambiental",
            "timing": "padrão",
            "cost": "5 PM",
            "text": "Por 1 dia, criaturas escolhidas em alcance curto ficam imunes a calor e frio extremos, podem respirar na água e não sufocam em fumaça densa."
        },
        {
            "name": "Velocidade",
            "timing": "padrão",
            "cost": "10 PM, sustentada",
            "text": "O dragão pode executar uma ação padrão adicional por turno."
        },
        {
            "name": "Imunidades Dracônicas",
            "timing": null,
            "text": "Dragões são imunes a efeitos de atordoamento, cansaço, dano do tipo de seu sopro, metamorfose e paralisia."
        },
        {
            "name": "Metamorfose Dracônica",
            "timing": "completa",
            "text": "Dragões jovens ou mais velhos podem se transformar em outras criaturas, como a magia Metamorfose (mas sem limitação para tamanhos menores que o seu). Eles costumam usar esta habilidade para se infiltrar em sociedades humanoides, aprender sobre seus costumes ou apenas quando não querem ser reconhecidos. Um dragão morto reverte à sua forma original."
        },
        {
            "name": "Magia Dracônica",
            "timing": null,
            "text": "Dragões adultos ou mais velhos podem lançar magias sem palavras mágicas, gestos ou concentração."
        }
    ],
    "equipment": null,
    "treasure": "Dobro e 4 peças de couro de dragão (CD 30 para extrair).",
    "skillsText": "Atletismo +25, Diplomacia +22, Enganação +22, Intimidação +22"
};

export const ninhadaDeDragoesFilhotes = {
    "id": "ninhada-de-dragoes-filhotes",
    "name": "Ninhada de Dragões Filhotes",
    "type": "monster",
    "subtype": "dragão",
    "size": "Grande",
    "challengeRating": 5,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 67,
        "bookPage": 65
    },
    "stats": {
        "initiative": 9,
        "perception": 7,
        "defense": 25,
        "fortitude": 14,
        "reflex": 8,
        "will": 12,
        "hitPoints": 240,
        "speedText": "12m (8q), voo 18m (12q)",
        "senses": "percepção às cegas, visão no escuro",
        "defensesText": "imunidade a fogo; resistência a magia +1; vulnerabilidade a frio; imunidade a atordoamento, cansaço, metamorfose e paralisia",
        "attributes": {
            "str": 4,
            "dex": 3,
            "con": 3,
            "int": 0,
            "wis": 0,
            "cha": 0
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "[Bando] Mordida +18 (4d6+8) e duas garras +18 (2d6+8)."
        }
    ],
    "abilities": [
        {
            "name": "Avalanche de Escamas",
            "timing": null,
            "text": "Se a ninhada de filhotes acertar os dois ataques de garra em uma mesma criatura Grande ou menor na mesma rodada, a vítima fica caída e agarrada. A ninhada pode manter uma criatura agarrada desta forma, e não perde o uso de nenhuma de suas armas naturais para isso."
        },
        {
            "name": "Sopro Duplo",
            "timing": "completa",
            "text": "A ninhada sopra dois cones de 6m em direções diferentes. Todas as criaturas nessas áreas sofrem 4d12 pontos de dano de fogo e ficam em chamas (Ref CD 21 reduz à metade e evita a condição). Recarga (movimento)."
        },
        {
            "name": "Imunidades Dracônicas",
            "timing": null,
            "text": "Dragões são imunes a efeitos de atordoamento, cansaço, dano do tipo de seu sopro, metamorfose e paralisia."
        }
    ],
    "equipment": null,
    "treasure": "Padrão.",
    "skillsText": null
};

export const sckharDragaoReiDoFogo = {
    "id": "sckhar-dragao-rei-do-fogo",
    "name": "Sckhar, Dragão-Rei do Fogo",
    "type": "monster",
    "subtype": "dragão",
    "size": "Colossal",
    "challengeRating": "S+",
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 79,
        "bookPage": 77
    },
    "stats": {
        "initiative": 23,
        "perception": 34,
        "defense": 71,
        "fortitude": 38,
        "reflex": 25,
        "will": 33,
        "hitPoints": 4000,
        "manaPoints": 287,
        "speedText": "12m (8q), voo 36m (24q)",
        "senses": "percepção às cegas (longo), visão no escuro",
        "defensesText": "imunidade a encantamento e fogo; redução de dano 20; resistência a magia +5; vulnerabilidade a frio; imunidade a atordoamento, cansaço, metamorfose e paralisia; maior que a morte",
        "attributes": {
            "str": 20,
            "dex": 2,
            "con": 15,
            "int": 12,
            "wis": 12,
            "cha": 12
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +66 (10d20+60, 16) e duas garras +61 (10d20+60, 16)."
        }
    ],
    "abilities": [
        {
            "name": "Maior que a Morte",
            "timing": null,
            "text": "Enquanto tiver pelo menos metade dos PV, Sckhar é imune a efeitos de morte instantânea, inclusive os que aprisionam ou destroem seu corpo ou alma. Dano ou perda de PV ainda pode reduzi-lo a 0 PV ou menos. Como criatura de ND S+, ele conta como ND 20 para estatísticas ausentes da ficha e como ND superior a 20 para habilidades de outras criaturas."
        },
        {
            "name": "Aqui Está, Aqui Pertence",
            "timing": null,
            "text": "Uma criatura em alcance longo que use habilidades de transporte planar (como Teletransporte) deve fazer um teste de Vontade (CD 55). Se falhar a habilidade não tem efeito, mas os PM são gastos mesmo assim."
        },
        {
            "name": "Aura Aterradora",
            "timing": null,
            "text": "A simples visão de um dragão adulto ou mais velho amedronta o mais valente dos aventureiros. Uma criatura que comece seu turno em alcance longo do dragão fica apavorada (se tiver 4 níveis ou menos) ou abalada (se tiver 5 níveis ou mais) até o fim da cena. Uma criatura que passe no teste de resistência fica imune a esta habilidade por um dia. Vontade CD 55 evita. Uma criatura que falhe no teste de Vontade contra a Aura Aterradora de Sckhar sofre 8d6 pontos de dano psíquico."
        },
        {
            "name": "Deus das Chamas",
            "timing": null,
            "text": "As magias de fogo de Sckhar estão sob efeito de Magia Ampliada e seus dados de dano aumentam, cada um, em dois passos (já contabilizado). Todo dano de fogo causado por Sckhar ignora redução de dano e, contra criaturas imunes a fogo, ainda causa metade do dano."
        },
        {
            "name": "Ego",
            "timing": "reação",
            "cost": "5 PM",
            "text": "Uma vez por rodada, quando Sckhar faz um teste de perícia (exceto de ataque), passa automaticamente nesse teste."
        },
        {
            "name": "Escamas Supremas",
            "timing": null,
            "text": "Sckhar sofre apenas metade do dano de fontes mundanas."
        },
        {
            "name": "Fluxo de Mana",
            "timing": null,
            "text": "Sckhar pode manter dois efeitos sustentados simultaneamente com apenas uma ação livre (mas pagando o custo de cada um)."
        },
        {
            "name": "Imposição Real",
            "timing": "completa",
            "text": "Sckhar altera a temperatura de uma área de qualquer tamanho em Sckharshantallas, variando de clima ameno até calor extremo, por uma cena."
        },
        {
            "name": "Magia Acelerada",
            "timing": "livre",
            "cost": "+4 PM",
            "text": "Uma vez por rodada, quando lança uma magia com execução de ação completa ou menor, Sckhar muda a execução dela para livre."
        },
        {
            "name": "Poder Incontestável",
            "timing": null,
            "text": "A primeira magia que Sckhar lança em cada rodada não pode ser alvo de contramágica."
        },
        {
            "name": "Sopro",
            "timing": "padrão",
            "text": "Todas as criaturas em um cone de 30m sofrem 30d12 pontos de dano de fogo e ficam em chamas (Ref CD 55 reduz o dano à metade e evita a condição). Cada vez que um dado de dano do sopro rolar o valor máximo, role um dado extra e some ao total. Recarga (movimento)."
        },
        {
            "name": "Varrer",
            "timing": "livre",
            "text": "Uma vez por rodada, quando Sckhar faz um ataque corpo a corpo e reduz os pontos de vida do alvo para 0 ou menos, pode realizar um ataque adicional contra outra criatura dentro do seu alcance."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como um conjurador arcano de 20º nível (CD 55, limite de PM 32)."
        },
        {
            "name": "Aprisionamento",
            "timing": "completa",
            "cost": "15 PM",
            "text": "Sckhar aprisiona uma criatura (Von anula)."
        },
        {
            "name": "Bola de Fogo",
            "timing": "padrão",
            "cost": "27 PM",
            "text": "Sckhar cria uma poderosa explosão em alcance médio que causa 18d10 pontos de dano de fogo em todas as criaturas em um raio de 12m (Ref reduz à metade)."
        },
        {
            "name": "Campo de Força",
            "timing": "reação",
            "cost": "11 PM",
            "text": "Quando sofre dano, Sckhar recebe redução de dano 70 contra este dano."
        },
        {
            "name": "Chuva de Meteoros",
            "timing": "completa",
            "cost": "15 PM",
            "text": "Meteoros caem em um quadrado de 36m em alcance longo. Criaturas na área sofrem 15d6 pontos de dano de impacto, 15d10 pontos de dano de fogo e ficam caídas e presas (agarradas) sob os escombros (Ref reduz o dano à metade e evita a condição)."
        },
        {
            "name": "Coluna de Chamas",
            "timing": "padrão",
            "cost": "16 PM",
            "text": "Um cilindro de fogo com 6m de raio e 30m de altura em alcance longo causa 16d10 pontos de dano de fogo e 6d6 pontos de dano de luz em criaturas e objetos livres na área. Ref reduz à metade."
        },
        {
            "name": "Controlar Fogo",
            "timing": "padrão",
            "cost": "3 PM",
            "text": "Sckhar cria, molda, move ou extingue chamas e emanações de calor em alcance médio."
        },
        {
            "name": "Dissipar Magia",
            "timing": "padrão",
            "cost": "3 PM",
            "text": "Sckhar escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias nesse alvo com CD igual ou menor que o resultado do teste são dissipadas."
        },
        {
            "name": "Globo de Invulnerabilidade",
            "timing": "padrão",
            "cost": "15 PM, sustentada",
            "text": "Sckhar é envolto por uma esfera mágica de 3m que detém qualquer magia de 4º círculo ou menor."
        },
        {
            "name": "Imobilizar",
            "timing": "padrão",
            "cost": "9 PM",
            "text": "Uma criatura em alcance curto fica paralisada (Von reduz para lenta). A cada rodada, a vítima pode gastar uma ação completa para fazer um novo teste de Vontade. Se passar, se liberta do efeito."
        },
        {
            "name": "Muralha Elemental",
            "timing": "padrão",
            "cost": "6 PM",
            "text": "Somente fogo. Uma muralha de fogo se eleva da terra. Pode ser um muro de até 30m de comprimento e 3m de altura (ou o contrário) ou uma cúpula de 6m de raio."
        },
        {
            "name": "Segunda Chance",
            "timing": "padrão",
            "cost": "25 PM",
            "text": "Uma criatura adjacente cura 400 PV e condições."
        },
        {
            "name": "Velocidade",
            "timing": "padrão",
            "cost": "10 PM, sustentada",
            "text": "Sckhar pode executar uma ação padrão adicional por turno."
        },
        {
            "name": "Imunidades Dracônicas",
            "timing": null,
            "text": "Dragões são imunes a efeitos de atordoamento, cansaço, dano do tipo de seu sopro, metamorfose e paralisia."
        },
        {
            "name": "Metamorfose Dracônica",
            "timing": "completa",
            "text": "Dragões jovens ou mais velhos podem se transformar em outras criaturas, como a magia Metamorfose (mas sem limitação para tamanhos menores que o seu). Eles costumam usar esta habilidade para se infiltrar em sociedades humanoides, aprender sobre seus costumes ou apenas quando não querem ser reconhecidos. Um dragão morto reverte à sua forma original."
        },
        {
            "name": "Magia Dracônica",
            "timing": null,
            "text": "Dragões adultos ou mais velhos podem lançar magias sem palavras mágicas, gestos ou concentração."
        }
    ],
    "equipment": null,
    "treasure": "10 peças de couro de dragão (CD 35 para extrair). A fortuna e os recursos materiais de Sckhar são praticamente incalculáveis. Um grupo de aventureiros que o derrote em seu reino terá acabado de conquistar riquezas além da imaginação, mas também terá que lidar com os súditos leais do Dragão-Rei e potenciais concorrentes ao trono. Se os personagens derrotarem Sckhar fora de Sckharshantallas, o mestre deverá definir que tesouros ele estaria portando (provavelmente algo equivalente a um tesouro triplo). Entretanto, lembre-se de que Sckhar é também um dos seres mais inteligentes de Arton; seus itens serão escolhidos especialmente para um propósito e ele saberá usá-los muito bem.",
    "skillsText": "Diplomacia +33, Enganação +33, Intimidação +33, Intuição +33, Misticismo +33, Nobreza +33"
};

export const altoClerigoDeKally = {
    "id": "alto-clerigo-de-kally",
    "name": "Alto Clérigo de Kally",
    "type": "monster",
    "subtype": "kallyanach",
    "size": "Médio",
    "challengeRating": 13,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 148,
        "pdfPageEnd": 149,
        "bookPage": 146,
        "bookPageEnd": 147
    },
    "stats": {
        "initiative": 10,
        "perception": 17,
        "defense": 40,
        "fortitude": 20,
        "reflex": 13,
        "will": 26,
        "hitPoints": 455,
        "manaPoints": 72,
        "speedText": "6m (4q), voo 6m (4q)",
        "senses": null,
        "defensesText": null,
        "attributes": {
            "str": 2,
            "dex": 0,
            "con": 3,
            "int": 1,
            "wis": 7,
            "cha": 3
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Lança x2 +35 (1d6+23, 19, mais 1d6 fogo)."
        },
        {
            "name": "À Distância",
            "text": "Lança +35 (1d6+23, 19, mais 1d6 fogo)."
        }
    ],
    "abilities": [
        {
            "name": "Aura de Medo",
            "magical": true,
            "timing": "livre",
            "cost": "2 PM",
            "text": "O alto clérigo de Kally gera uma aura de medo de 9m de raio que dura até o fim da cena. Todos os inimigos que entrem na aura ficam abalados até o fim da cena (Von CD 37 evita e a criatura fica imune a esta habilidade por um dia)."
        },
        {
            "name": "Magia Acelerada",
            "timing": "livre",
            "cost": "+4 PM",
            "text": "Uma vez por rodada, quando lança uma magia com execução de ação completa ou menor, o alto clérigo muda a execução dela para livre."
        },
        {
            "name": "Poder Ilimitado!",
            "timing": "livre",
            "cost": "3 PM",
            "text": "Quando lança uma magia sustentada, o alto clérigo muda a duração dela para cena."
        },
        {
            "name": "Servos do Dragão",
            "magical": true,
            "timing": "completa",
            "cost": "2 PM",
            "text": "O alto clérigo invoca 2d6+2 kobolds (veja Acólito de Kally)."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como um clérigo de Kallyadranoch de 13º nível (CD 37)."
        },
        {
            "name": "Coluna de Chamas",
            "timing": "padrão",
            "cost": "13 PM",
            "text": "Um cilindro de fogo sagrado com 3m de raio e 30m de altura desce dos céus em alcance longo, causando 13d6 pontos de dano de fogo mais 6d6 pontos de dano de luz nas criaturas e objetos livres na área (Ref reduz à metade)."
        },
        {
            "name": "Comando",
            "timing": "padrão",
            "cost": "8 PM",
            "text": "No início do seu próximo turno, quatro criaturas em alcance curto ficam caídas e não podem se levantar até o início do seu turno seguinte (Von evita)."
        },
        {
            "name": "Controlar Fogo",
            "timing": "padrão",
            "cost": "3 PM",
            "text": "O alto clérigo chameja qualquer número de armas e ataques desarmados escolhidos em alcance curto. Até o fim da cena, essas armas e ataques causam +1d6 pontos de dano de fogo."
        },
        {
            "name": "Escudo da Fé",
            "timing": "reação",
            "cost": "1 PM",
            "text": "Uma criatura em alcance curto recebe +2 na Defesa por 1 turno."
        },
        {
            "name": "Manto do Cruzado",
            "timing": "padrão",
            "cost": "10 PM, sustentada",
            "text": "Criaturas escolhidas em alcance curto sofrem 4d8 pontos de dano de trevas no início de cada um de seus turnos. O alto clérigo cura metade de todo dano causado pela magia."
        },
        {
            "name": "Oração",
            "timing": "padrão",
            "cost": "11 PM, sustentada",
            "text": "O alto clérigo e seus aliados em alcance curto recebem +4 em testes de perícia e rolagens de dano, e todos seus inimigos em alcance curto recebem –4 em testes de perícia e rolagens de dano. Esse efeito é cumulativo com outras magias."
        },
        {
            "name": "Potência Divina",
            "timing": "padrão",
            "cost": "6 PM, sustentada",
            "text": "O tamanho do alto clérigo aumenta uma categoria e ele recebe Força +4 e RD 10. Ele não pode lançar magias enquanto estiver sob efeito de Potência Divina."
        },
        {
            "name": "Proteção Divina",
            "timing": "reação",
            "cost": "3 PM",
            "text": "Uma criatura em alcance curto recebe +5 no próximo teste de resistência que fizer até o fim da cena."
        }
    ],
    "equipment": "Lança de arremesso, meia armadura, símbolo sagrado de Kallyadranoch",
    "treasure": "Padrão.",
    "skillsText": "Intimidação +15, Intuição +17, Misticismo +11, Religião +19"
};

export const avatarDeKallyadranoch = {
    "id": "avatar-de-kallyadranoch",
    "name": "Avatar de Kallyadranoch",
    "type": "monster",
    "subtype": "dragão",
    "size": "Colossal",
    "challengeRating": "S",
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 155,
        "bookPage": 153
    },
    "stats": {
        "initiative": 25,
        "perception": 32,
        "defense": 65,
        "fortitude": 36,
        "reflex": 22,
        "will": 30,
        "hitPoints": 2500,
        "speedText": "18m (12q), voo 42m (28q)",
        "senses": "percepção às cegas, visão no escuro",
        "defensesText": "imunidade a ácido, dano de luz, eletricidade, essência, fogo, frio, trevas e veneno; redução de dano 50; resistência a magia +5; maior que a morte",
        "attributes": {
            "str": 19,
            "dex": 0,
            "con": 15,
            "int": 9,
            "wis": 9,
            "cha": 9
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Duas garras +58 (5d20+70, 16) e mordida +58 (5d20+70, 16)."
        }
    ],
    "abilities": [
        {
            "name": "Maior que a Morte",
            "timing": null,
            "text": "Enquanto tiver pelo menos metade dos PV, o Avatar de Kallyadranoch é imune a efeitos de morte instantânea, inclusive os que aprisionam ou destroem seu corpo ou alma. Dano ou perda de PV ainda pode reduzi-lo a 0 PV ou menos. Como criatura de ND S, ele conta como ND 20 para estatísticas ausentes da ficha e como ND superior a 20 para habilidades de outras criaturas."
        },
        {
            "name": "Aura Aterradora",
            "timing": null,
            "text": "A simples visão de um dragão adulto ou mais velho amedronta o mais valente dos aventureiros. Uma criatura que comece seu turno em alcance longo do dragão fica apavorada (se tiver 4 níveis ou menos) ou abalada (se tiver 5 níveis ou mais) até o fim da cena. Uma criatura que passe no teste de resistência fica imune a esta habilidade por um dia. Vontade CD 51 evita."
        },
        {
            "name": "Centelha Divina",
            "timing": null,
            "text": "O Avatar de Kallyadranoch lança qualquer magia divina como um clérigo de 20º nível sem gastar PM (CD 51, limite 20 PM). Uma vez por cena, ele pode lançar uma dessas magias como uma ação livre."
        },
        {
            "name": "Dilacerar",
            "timing": null,
            "text": "Se o Avatar acerta os dois ataques de garra em uma mesma criatura no mesmo turno, causa mais 10d6+55 pontos de dano."
        },
        {
            "name": "Mergulho Mortal",
            "timing": "completa",
            "text": "Se estiver voando, o Avatar faz uma investida contra uma criatura no solo e ataca com suas duas garras e mordida. Os três ataques recebem o bônus de +2 da investida, mas devem ser feitos contra o mesmo personagem. Após os ataques, o avatar pousa adjacente ao alvo."
        },
        {
            "name": "Servos de Kally",
            "timing": "livre",
            "text": "Uma vez por cena, o Avatar invoca 6 dragões campeões (um de cada tipo entre ácido, eletricidade, fogo, frio, luz e trevas) que surgem em espaços desocupados em alcance longo. Eles agem no início da próxima rodada do Avatar, têm deslocamento de voo 18m e podem gastar uma ação padrão para emitir um sopro em um cone de 9m, que causa 6d12 pontos de dano de seu tipo de energia. Os dragões são Grandes, têm For 5, Des 1, 110 PV, Defesa 32, imunidades de dragão e a dano de seu tipo, usam os valores do Avatar com –5 para qualquer teste oposto ou de resistência e desaparecem quando mortos ou ao fim da cena."
        },
        {
            "name": "Sopro Supremo",
            "timing": "padrão",
            "text": "O Avatar exala uma combinação de energias em um cone de 30m. Criaturas nessa área sofrem 8d12 pontos de dano de cada tipo de energia entre ácido, eletricidade, fogo, frio, luz e trevas (48d12 no total; Ref CD 51 reduz à metade). Sempre que rolar um 12 em um dado de dano, o avatar causa +1d12 pontos de dano do mesmo tipo. O sopro ignora RD, e imunidade a esses tipos de dano apenas o reduz à metade. Recarga (movimento)."
        },
        {
            "name": "Varredura",
            "timing": "reação",
            "text": "Quando é flanqueado, o Avatar move sua cauda, varrendo um cone de 9m. Criaturas nessa área sofrem 16d6+30 pontos de dano e ficam caídas (Ref CD 51 reduz à metade e evita a condição)."
        },
        {
            "name": "Vendaval",
            "timing": "movimento",
            "text": "O Avatar causa um vendaval com suas asas. Criaturas em alcance curto são arremessadas 3m para cada categoria de tamanho abaixo do Avatar na direção oposta a ele e ficam lentas por 1 rodada (Fort CD 51 evita o arremesso)."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": "Enganação +30, Intimidação +30, Intuição +30, Misticismo +30, Religião +35"
};

export const corcelDeKally = {
    "id": "corcel-de-kally",
    "name": "Corcel de Kally",
    "type": "monster",
    "subtype": null,
    "size": "Grande",
    "challengeRating": 2,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 150,
        "bookPage": 148
    },
    "stats": {
        "initiative": 6,
        "perception": 5,
        "defense": 20,
        "fortitude": 11,
        "reflex": 9,
        "will": 2,
        "hitPoints": 72,
        "speedText": "12m (8q), voo 18m (12q)",
        "senses": "faro, visão no escuro",
        "defensesText": "imunidade a fogo",
        "attributes": {
            "str": 4,
            "dex": 2,
            "con": 3,
            "int": -3,
            "wis": 1,
            "cha": 0
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Duas garras +12 (1d6+4) e mordida +12 (1d6+4)."
        }
    ],
    "abilities": [
        {
            "name": "Natureza Dracônica",
            "timing": null,
            "text": "Um corcel de Kally conta como um dragão para efeitos que afetem dragões."
        },
        {
            "name": "Sopro",
            "timing": "padrão",
            "text": "Todas as criaturas em um cone de 6m sofrem 2d8 pontos de dano de fogo e ficam em chamas (Ref CD 16 reduz à metade e evita a condição). Recarga (movimento)."
        }
    ],
    "equipment": null,
    "treasure": "Peça de couro de dragão (CD 17 para extrair) e glândula incendiária (CD 17 para extrair, vale T$ 15 para fabricar fogo alquímico).",
    "skillsText": "Atletismo +7"
};

export const kallyanachBarbaro = {
    "id": "kallyanach-barbaro",
    "name": "Kallyanach Bárbaro",
    "type": "monster",
    "subtype": "kallyanach",
    "size": "Médio",
    "challengeRating": 6,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 152,
        "bookPage": 150
    },
    "stats": {
        "initiative": 8,
        "perception": 8,
        "defense": 24,
        "fortitude": 18,
        "reflex": 11,
        "will": 6,
        "hitPoints": 224,
        "speedText": "9m (6q), voo 9m (6q)",
        "senses": "faro, visão no escuro",
        "defensesText": "redução de dano 5; redução de fogo 5",
        "attributes": {
            "str": 4,
            "dex": 2,
            "con": 4,
            "int": 0,
            "wis": 2,
            "cha": 0
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Gadanho +20 (2d4+15, x4) e mordida +20 (1d6+14)."
        }
    ],
    "abilities": [
        {
            "name": "Fúria Elemental",
            "timing": "livre",
            "text": "Uma vez por cena, o kallyanach bárbaro entra em fúria. Ele recebe +4 em testes de ataque e seus ataques corpo a corpo causam +2d6 pontos de dano de fogo. Nesse estado ele não pode fazer nenhuma ação que exija calma e concentração (como usar Furtividade). A fúria termina se, ao fim da rodada, ele não tiver atacado nem sido alvo de um efeito hostil."
        }
    ],
    "equipment": "Couraça, gadanho",
    "treasure": "Metade.",
    "skillsText": "Atletismo +9, Sobrevivência +7"
};

export const kallyanachMorteGlacial = {
    "id": "kallyanach-morte-glacial",
    "name": "Kallyanach Morte Glacial",
    "type": "monster",
    "subtype": "kallyanach",
    "size": "Médio",
    "challengeRating": 9,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 152,
        "bookPage": 150
    },
    "stats": {
        "initiative": 14,
        "perception": 9,
        "defense": 32,
        "fortitude": 9,
        "reflex": 21,
        "will": 15,
        "hitPoints": 340,
        "speedText": "9m (6q), voo 9m (6q)",
        "senses": "faro, visão no escuro",
        "defensesText": "evasão; redução de frio 10",
        "attributes": {
            "str": 1,
            "dex": 4,
            "con": 3,
            "int": 1,
            "wis": 1,
            "cha": 1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Espada curta x2 +27 (1d6+12, 19) e mordida +27 (1d6+12)."
        }
    ],
    "abilities": [
        {
            "name": "Ataque Furtivo",
            "timing": null,
            "text": "+4d6."
        },
        {
            "name": "Finta Aprimorada",
            "timing": null,
            "text": "O kallyanach morte glacial pode fintar como uma ação de movimento."
        },
        {
            "name": "Sopro de Dragão",
            "timing": "padrão",
            "text": "Criaturas em um cone de 6m sofrem 3d12 pontos de dano de frio, ficam lentas por 1d4 rodadas e, se estiverem surpreendidas, sofrem dano adicional de ataque furtivo (Ref CD 28 reduz à metade e evita a condição). Recarga (movimento)."
        }
    ],
    "equipment": "Couro batido ajustado, espada curta x2, gazua",
    "treasure": "Padrão.",
    "skillsText": "Acrobacia +12, Atletismo +9, Enganação +11, Furtividade +14, Intimidação +9, Ladinagem +12"
};

export const kaijinBruto = {
    "id": "kaijin-bruto",
    "name": "Kaijin Bruto",
    "type": "monster",
    "subtype": "kaijin",
    "size": "Grande",
    "challengeRating": 11,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 159,
        "bookPage": 157
    },
    "stats": {
        "initiative": 7,
        "perception": 12,
        "defense": 42,
        "fortitude": 24,
        "reflex": 12,
        "will": 17,
        "hitPoints": 600,
        "speedText": "9m (6q)",
        "senses": null,
        "defensesText": "fortificação 50%; redução de dano 10; resistência a lefeu e Tormenta +5",
        "attributes": {
            "str": 8,
            "dex": 1,
            "con": 6,
            "int": -2,
            "wis": 1,
            "cha": -4
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Duas garras +32 (1d10+20, 19), pinça +32 (1d12+20, 18/x3) e tentáculo +32 (2d4+18)."
        }
    ],
    "abilities": [
        {
            "name": "Agarrar Aprimorado",
            "timing": "livre",
            "text": "Tentáculo (teste +34)."
        },
        {
            "name": "Dilacerar",
            "timing": null,
            "text": "Se o kaijin bruto acerta os dois ataques de garra em uma mesma criatura no mesmo turno, causa mais 2d10+20 pontos de dano."
        },
        {
            "name": "Mutação Rubra",
            "timing": null,
            "text": "O kaijin possui três mutações, escolhidas entre as seguintes."
        },
        {
            "name": "Asas de Inseto",
            "timing": null,
            "text": "O kaijin tem deslocamento de voo 9m (6q)."
        },
        {
            "name": "Carapaça Superior",
            "timing": "reação",
            "text": "Uma vez por rodada, quando sofre dano, o kaijin pode reduzir esse dano à metade."
        },
        {
            "name": "Deslocado",
            "timing": null,
            "text": "O kaijin tem camuflagem leve contra todos os ataques e ignora terreno difícil."
        },
        {
            "name": "Insanidade da Tormenta",
            "timing": null,
            "text": "Criaturas que vejam o kaijin perdem 1d10 PM (Von CD 32 evita). Uma criatura só pode ser afetada por essa habilidade uma vez por dia."
        },
        {
            "name": "Mãos Aderentes",
            "timing": null,
            "text": "O kaijin tem deslocamento de escalada 9m."
        },
        {
            "name": "Mente Alienígena",
            "timing": null,
            "text": "Quando faz um teste de Vontade, o kaijin rola dois dados e usa o melhor. Além disso, quando faz um teste de Vontade para resistir a um efeito, ele causa 6d6 pontos de dano psíquico na criatura que gerou o efeito."
        },
        {
            "name": "Sangue Corrosivo",
            "timing": "reação",
            "text": "Uma vez por rodada, quando o kaijin sofrer dano, todas as criaturas adjacentes a ele sofrem 4d6 pontos de dano de ácido."
        }
    ],
    "equipment": null,
    "treasure": "Metade.",
    "skillsText": "Atletismo +21, Intimidação +21"
};

export const kaijinCapanga = {
    "id": "kaijin-capanga",
    "name": "Kaijin Capanga",
    "type": "monster",
    "subtype": "kaijin",
    "size": "Médio",
    "challengeRating": 6,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 158,
        "bookPage": 156
    },
    "stats": {
        "initiative": 5,
        "perception": 8,
        "defense": 26,
        "fortitude": 17,
        "reflex": 12,
        "will": 7,
        "hitPoints": 60,
        "speedText": "9m (6q)",
        "senses": null,
        "defensesText": "fortificação 50%; redução de dano 5; resistência a lefeu e Tormenta +5",
        "attributes": {
            "str": 5,
            "dex": 2,
            "con": 4,
            "int": -1,
            "wis": 1,
            "cha": -3
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Duas garras +22 (2d6+15, 19)."
        }
    ],
    "abilities": [
        {
            "name": "Mutação Rubra",
            "timing": null,
            "text": "O kaijin capanga possui duas mutações, escolhidas entre as seguintes."
        },
        {
            "name": "Asas de Inseto",
            "timing": null,
            "text": "O kaijin tem deslocamento de voo 9m."
        },
        {
            "name": "Carapaça Superior",
            "timing": "reação",
            "text": "Uma vez por rodada, quando sofre dano, o kaijin pode reduzir esse dano à metade."
        },
        {
            "name": "Deslocado",
            "timing": null,
            "text": "O kaijin tem camuflagem leve contra todos os ataques e ignora terreno difícil."
        },
        {
            "name": "Insanidade da Tormenta",
            "timing": null,
            "text": "Criaturas que vejam o kaijin perdem 2d4 PM (Von CD 22 evita). Uma criatura só pode ser afetada por essa habilidade uma vez por dia."
        },
        {
            "name": "Mãos Aderentes",
            "timing": null,
            "text": "O kaijin tem deslocamento de escalada 9m."
        },
        {
            "name": "Mente Alienígena",
            "timing": null,
            "text": "Quando faz um teste de Vontade, o kaijin rola dois dados e usa o melhor. Além disso, quando faz um teste de Vontade para resistir a um efeito, ele causa 5d6 pontos de dano psíquico na criatura que gerou o efeito."
        },
        {
            "name": "Sangue Corrosivo",
            "timing": "reação",
            "text": "Uma vez por rodada, quando o kaijin sofre dano, todas as criaturas adjacentes a ele sofrem 3d6 pontos de dano de ácido."
        }
    ],
    "equipment": null,
    "treasure": "Metade.",
    "skillsText": "Intimidação +10"
};

export const kaijinNinja = {
    "id": "kaijin-ninja",
    "name": "Kaijin Ninja",
    "type": "monster",
    "subtype": "kaijin",
    "size": "Médio",
    "challengeRating": 13,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 159,
        "bookPage": 157,
        "pdfPageEnd": 160,
        "bookPageEnd": 158
    },
    "stats": {
        "initiative": 17,
        "perception": 12,
        "defense": 36,
        "fortitude": 20,
        "reflex": 26,
        "will": 12,
        "hitPoints": 450,
        "manaPoints": 48,
        "speedText": "12m (8q), escalada 9m (6q)",
        "senses": null,
        "defensesText": "evasão; redução de dano 5; resistência a lefeu e Tormenta +5",
        "attributes": {
            "str": 2,
            "dex": 7,
            "con": 4,
            "int": 3,
            "wis": 2,
            "cha": -2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Espada curta x3 +32 (2d6+20, 19)."
        },
        {
            "name": "À Distância",
            "text": "Zarabatana +34 (1d4+15, x3, mais veneno)."
        }
    ],
    "abilities": [
        {
            "name": "Ataque Furtivo",
            "timing": null,
            "text": "+6d6."
        },
        {
            "name": "Sangue Corrosivo",
            "timing": null,
            "text": "Uma vez por rodada, quando o kaijin ninja sofre dano, todas as criaturas adjacentes a ele sofrem 4d6 pontos de dano de ácido."
        },
        {
            "name": "Sombra",
            "timing": null,
            "text": "O kaijin não sofre penalidade em testes de Furtividade por se mover ao seu deslocamento normal e reduz a penalidade em Furtividade por atacar e fazer outras ações chamativas para –10."
        },
        {
            "name": "Truques Ninjas",
            "timing": null,
            "text": "O kaijin pode lançar as seguintes magias simuladas como um conjurador arcano de 12º nível (CD 37)."
        },
        {
            "name": "Imagem Espelhada",
            "timing": "padrão",
            "cost": "5 PM",
            "text": "O kaijin cria 4 cópias ilusórias de si mesmo que fornecem +8 na Defesa. Cada vez que um ataque contra ele erra, uma das imagens desaparece e o bônus na Defesa diminui em 2. Quando uma cópia é destruída, a criatura que a destruiu fica ofuscada por 1 rodada."
        },
        {
            "name": "Invisibilidade",
            "timing": "padrão",
            "cost": "6 PM",
            "text": "O kaijin fica invisível até o fim da cena, recebendo camuflagem total, +10 em Furtividade contra ouvir e deixando desprevenidas contra seus ataques criaturas que não possam vê-lo. A magia termina se o kaijin fizer uma ação hostil contra uma criatura."
        },
        {
            "name": "Névoa",
            "timing": "padrão",
            "cost": "8 PM",
            "text": "Forma uma nuvem que ocupa um cubo de 6m em alcance curto e dura até o fim da cena. Criaturas a até 1,5m têm camuflagem leve e criaturas a partir de 3m têm camuflagem total; o kaijin ignora essa camuflagem. Um vento forte dispersa a névoa em 4 rodadas e um vendaval em 1 rodada. Criaturas dentro da nuvem têm deslocamento reduzido para 3m e sofrem –2 em testes de ataque e rolagens de dano."
        },
        {
            "name": "Primor Atlético",
            "timing": "padrão",
            "cost": "4 PM",
            "text": "Até o fim da cena, o kaijin recebe deslocamento +9m, +10 em Atletismo e, quando faz um teste de uma perícia baseada em Força, Destreza e Constituição, exceto de ataque ou resistência, rola dois dados e escolhe o melhor."
        },
        {
            "name": "Teia",
            "timing": "padrão",
            "cost": "4 PM",
            "text": "O kaijin cria um cubo de terreno difícil de 6m em alcance curto. Criaturas na área, ou que comecem seu turno em seu interior, ficam enredadas e imóveis (Ref evita). Uma criatura pode se libertar com uma ação padrão e um teste de Acrobacia ou Atletismo."
        },
        {
            "name": "Veneno",
            "timing": null,
            "text": "Essência de sombra (debilitado, Fort CD 37 reduz para fraco)."
        }
    ],
    "equipment": "Dardos x20, espada curta certeira, essência de sombra x1d4, gazua, manto camuflado aprimorado, zarabatana certeira (todos adaptados)",
    "treasure": "Padrão.",
    "skillsText": "Acrobacia +17, Furtividade +27, Ladinagem +17"
};

export const caoDeKally = {
    "id": "cao-de-kally",
    "name": "Cão de Kally",
    "type": "monster",
    "subtype": null,
    "size": "Médio",
    "challengeRating": 2,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 181,
        "bookPage": 179
    },
    "stats": {
        "initiative": 5,
        "perception": 6,
        "defense": 18,
        "fortitude": 13,
        "reflex": 7,
        "will": 2,
        "hitPoints": 21,
        "speedText": "15m (10q)",
        "senses": "faro, visão no escuro",
        "defensesText": null,
        "attributes": {
            "str": 4,
            "dex": 2,
            "con": 5,
            "int": -3,
            "wis": 1,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +14 (1d6+8) e garras +14 (1d4+8)."
        }
    ],
    "abilities": [
        {
            "name": "Derrubar",
            "timing": "livre",
            "text": "Mordida (teste +14)."
        },
        {
            "name": "Sopro",
            "timing": "padrão",
            "text": "O cão de Kally cospe fogo em um cone de 9m. Criaturas na área sofrem 2d8+4 pontos de dano de fogo e ficam em chamas (Ref CD 15 reduz à metade e evita a condição). Recarga (movimento)."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": null
};

export const koboldBruto = {
    "id": "kobold-bruto",
    "name": "Kobold Bruto",
    "type": "monster",
    "subtype": "kobold",
    "size": "Grande",
    "challengeRating": 4,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 186,
        "bookPage": 184
    },
    "stats": {
        "initiative": 5,
        "perception": 2,
        "defense": 23,
        "fortitude": 16,
        "reflex": 10,
        "will": 2,
        "hitPoints": 120,
        "speedText": "9m (6q)",
        "senses": "sensibilidade a luz, visão no escuro",
        "defensesText": null,
        "attributes": {
            "str": 6,
            "dex": 1,
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
            "name": "Escamas de Kally",
            "timing": null,
            "text": "Todo dano que o kobold bruto sofre é reduzido à metade."
        },
        {
            "name": "Peste Oportunista",
            "timing": null,
            "text": "Os ataques do kobold causam +1d4 pontos de dano contra inimigos que já sofreram dano na rodada."
        },
        {
            "name": "Cabecinha",
            "timing": null,
            "text": "A habilidade Escamas de Kally não se aplica a acertos críticos e ataques contra a cabeça diminuta do kobold (Defesa 33)."
        },
        {
            "name": "Detonação Final (opcional)",
            "timing": null,
            "text": "Variante opcional (Qualquer Kobold Pode Explodir, p. 185). Se o mestre usar a versão explosiva desta ficha, o ND aumenta em +1 apenas para efeitos de experiência. Quando o kobold bruto é reduzido a 0 PV, role 1d6: com um resultado 1 ou 2, ocorre uma explosão. Todas as criaturas a até 3m sofrem 4d6 pontos de dano de impacto (Ref CD 18 reduz à metade)."
        }
    ],
    "equipment": "Tacape aumentado",
    "treasure": "Metade.",
    "skillsText": "Atletismo +10"
};

export const koboldMae = {
    "id": "kobold-mae",
    "name": "Kobold-Mãe",
    "type": "monster",
    "subtype": "kobold",
    "size": "Grande",
    "challengeRating": 12,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 189,
        "bookPage": 187
    },
    "stats": {
        "initiative": 9,
        "perception": 15,
        "defense": 41,
        "fortitude": 26,
        "reflex": 15,
        "will": 12,
        "hitPoints": 550,
        "speedText": "0m (0q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a efeitos de movimento",
        "attributes": {
            "str": 2,
            "dex": -3,
            "con": 7,
            "int": -2,
            "wis": 3,
            "cha": -1
        }
    },
    "actions": [],
    "abilities": [
        {
            "name": "Canção de Ninar",
            "timing": "padrão",
            "text": "Todos os kobolds em uma esfera de 30m ao redor da kobold-mãe perdem quaisquer condições de medo. Demais criaturas na área sofrem 12d6 pontos de dano psíquico e ficam atordoadas por 1 rodada (Von CD 35 reduz à metade, evita a condição e a criatura não pode mais ser atordoada por esta habilidade até o fim da cena). Recarga (usar Queridinho da Mamãe)."
        },
        {
            "name": "Mãe É Sagrado",
            "timing": null,
            "text": "Kobolds que estejam em alcance curto da kobold-mãe recebem +2 em testes de perícia e rolagens de dano. Cada vez que ela sofre um ataque ou é alvo de uma habilidade, esses bônus aumentam em +1 até o fim da cena."
        },
        {
            "name": "Ovos",
            "timing": "movimento",
            "text": "A kobold-mãe invoca 1d8+2 ninhadas de kobolds que surgem em espaços desocupados em alcance curto. Elas agem a partir da próxima rodada da mamãe, têm deslocamento 12m (normal e de escalada) e a habilidade enxame (3d6+15, perfuração). As ninhadas são Médias, têm For –1, Des 4, Defesa 35 e 1 PV, falham automaticamente em qualquer teste oposto ou de resistência e desaparecem quando mortas ou ao fim da cena. Recarga (movimento)."
        },
        {
            "name": "Protejam a Mamãe",
            "timing": "reação",
            "text": "Uma vez por rodada, quando a kobold-mãe sofre dano, um kobold em alcance curto se sacrifica por ela. O kobold morre, mas o dano que a mãe sofreria é reduzido a 0."
        },
        {
            "name": "Queridinho da Mamãe",
            "timing": "padrão",
            "text": "A kobold-mãe aponta para outro kobold em alcance curto. Por 1 rodada, esse kobold fica imune a efeitos de movimento e recebe +5 em testes de perícia e rolagens de dano."
        },
        {
            "name": "Detonação Final (opcional)",
            "timing": null,
            "text": "Variante opcional (Qualquer Kobold Pode Explodir, p. 185). Se o mestre usar a versão explosiva desta ficha, o ND aumenta em +1 apenas para efeitos de experiência. Quando a kobold-mãe é reduzida a 0 PV, role 1d6: com um resultado 1 ou 2, ocorre uma explosão. Todas as criaturas a até 3m sofrem 8d6 pontos de dano de impacto (Ref CD 35 reduz à metade)."
        }
    ],
    "equipment": null,
    "treasure": "Padrão.",
    "skillsText": null
};

export const corcelDoDeserto = {
    "id": "corcel-do-deserto",
    "name": "Corcel do Deserto",
    "type": "monster",
    "subtype": null,
    "size": "Grande",
    "challengeRating": 2,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 217,
        "bookPage": 215
    },
    "stats": {
        "initiative": 5,
        "perception": 7,
        "defense": 21,
        "fortitude": 13,
        "reflex": 7,
        "will": 2,
        "hitPoints": 55,
        "speedText": "15m (10q)",
        "senses": "percepção às cegas",
        "defensesText": "redução de fogo 5",
        "attributes": {
            "str": 2,
            "dex": 2,
            "con": 4,
            "int": -3,
            "wis": 1,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Cascos +12 (2d8+9)."
        }
    ],
    "abilities": [
        {
            "name": "Substância Urticante",
            "timing": null,
            "text": "A carapaça do corcel é coberta por uma substância que causa uma coceira debilitante. Uma criatura que acerte um ataque corpo a corpo no corcel é acometida por uma urticária terrível que a impede de fazer ações, exceto reações, por 1d4 rodadas (Fort CD 16 evita). Uma criatura só pode ser afetada por esta habilidade uma vez por cena."
        }
    ],
    "equipment": null,
    "treasure": "1d6 doses de ácido (CD 17 para extrair).",
    "skillsText": "Atletismo +8"
};

export const tatuMontanha = {
    "id": "tatu-montanha",
    "name": "Tatu-Montanha",
    "type": "monster",
    "subtype": null,
    "size": "Enorme",
    "challengeRating": 4,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 222,
        "bookPage": 220
    },
    "stats": {
        "initiative": 4,
        "perception": 7,
        "defense": 25,
        "fortitude": 16,
        "reflex": 10,
        "will": 4,
        "hitPoints": 125,
        "speedText": "9m (6q), natação 9m (6q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a ácido; redução de corte, impacto e perfuração 5",
        "attributes": {
            "str": 3,
            "dex": 0,
            "con": 4,
            "int": -3,
            "wis": 1,
            "cha": -2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Cauda +16 (2d6+18 perfuração, x3)."
        }
    ],
    "abilities": [
        {
            "name": "Retrair",
            "timing": "reação",
            "text": "Uma vez por rodada, quando sofre um ataque corpo a corpo, o tatu se retrai para sua concha. Ele recebe +5 na Defesa contra esse ataque e, se o ataque errar, o agressor sofre 1d6+9 pontos de dano de perfuração."
        },
        {
            "name": "Varrer Ameaças",
            "timing": "padrão",
            "text": "O tatu-montanha golpeia com sua cauda em um cone de 4,5m. Criaturas na área sofrem 2d6+9 pontos de dano de perfuração e ficam caídas (Ref CD 18 reduz à metade e evita a condição). Recarga (movimento)."
        }
    ],
    "equipment": null,
    "treasure": "Casco de tatu (CD 19 para extrair, vale T$ 100 para fabricar um escudo ou uma armadura superior).",
    "skillsText": null
};

export const tigreDeHyninn = {
    "id": "tigre-de-hyninn",
    "name": "Tigre-de-Hyninn",
    "type": "monster",
    "subtype": null,
    "size": "Grande",
    "challengeRating": 5,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 209,
        "bookPage": 207
    },
    "stats": {
        "initiative": 10,
        "perception": 7,
        "defense": 25,
        "fortitude": 8,
        "reflex": 20,
        "will": 5,
        "hitPoints": 165,
        "speedText": "12m (8q)",
        "senses": "faro, visão no escuro",
        "defensesText": "imunidade a confuso e metamorfose; resistência a devotos de Khalmyr +5",
        "attributes": {
            "str": 3,
            "dex": 4,
            "con": 2,
            "int": -1,
            "wis": 1,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Duas garras +17 (1d8+3), 1d3 mordidas +17 (1d6+3) e 1d4+1 tentáculos +17 (1d6+3)."
        }
    ],
    "abilities": [
        {
            "name": "Borrão",
            "timing": null,
            "text": "O tigre-de-Hyninn tem 25% de chance de ignorar ataques e efeitos (incluindo de área) contra ele. Esta habilidade permanece ativa mesmo que ele morra."
        },
        {
            "name": "Entre Planos",
            "magical": true,
            "timing": "movimento",
            "text": "Até o próximo turno do tigre, a chance de falha de seu Borrão aumenta para 50%."
        },
        {
            "name": "Profusão de Partes",
            "timing": null,
            "text": "Cada tigre tem 1d3 cabeças e 1d4+1 tentáculos. Isso determina quantos ataques de mordida (um por cabeça) e de tentáculos ele tem."
        }
    ],
    "equipment": null,
    "treasure": "Resíduos (CD 20 para extrair, valem T$ 150 para fabricar poções e pergaminhos contendo magias de ilusão).",
    "skillsText": "Furtividade +16"
};

export const tigreDeHyninnPrimordial = {
    "id": "tigre-de-hyninn-primordial",
    "name": "Tigre-de-Hyninn Primordial",
    "type": "monster",
    "subtype": null,
    "size": "Grande",
    "challengeRating": 11,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 209,
        "bookPage": 207
    },
    "stats": {
        "initiative": 17,
        "perception": 12,
        "defense": 42,
        "fortitude": 14,
        "reflex": 29,
        "will": 10,
        "hitPoints": 480,
        "speedText": "12m (8q)",
        "senses": "faro, visão no escuro",
        "defensesText": "imunidade a confuso e metamorfose; resistência a devotos de Khalmyr +5",
        "attributes": {
            "str": 4,
            "dex": 6,
            "con": 3,
            "int": -1,
            "wis": 1,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Duas garras +34 (2d8+12), 1d3 mordidas +34 (2d6+12) e 1d4+1 tentáculos +34 (2d6+12)."
        }
    ],
    "abilities": [
        {
            "name": "Borrão",
            "timing": null,
            "text": "O tigre-de-Hyninn tem 25% de chance de ignorar ataques e efeitos (incluindo de área) contra ele. Esta habilidade permanece ativa mesmo que ele morra."
        },
        {
            "name": "Entre Planos",
            "magical": true,
            "timing": "movimento",
            "text": "Até o próximo turno do tigre, a chance de falha de seu Borrão aumenta para 50%."
        },
        {
            "name": "Não Está Mais Aqui!",
            "timing": "padrão",
            "text": "Uma vez por cena, o tigre pode se teleportar para qualquer lugar a sua escolha a até 500m, desde que conheça o local de destino."
        },
        {
            "name": "Profusão de Partes",
            "timing": null,
            "text": "Cada tigre tem 1d3 cabeças e 1d4+1 tentáculos. Isso determina quantos ataques de mordida (um por cabeça) e de tentáculos ele tem."
        },
        {
            "name": "Sopro",
            "timing": "padrão",
            "text": "O tigre sopra energia caótica em um cone de 6m. Criaturas na área sofrem 6d8 pontos de dano mental e ficam confusas por 1d3 rodadas (Von CD 31 reduz à metade e evita a condição). Recarga (no início de cada rodada do tigre, jogue um dado; recarrega com um resultado par)."
        }
    ],
    "equipment": null,
    "treasure": "Resíduos (CD 26 para extrair, valem T$ 300 para fabricar poções e pergaminhos contendo magias de ilusão).",
    "skillsText": "Furtividade +25"
};

export const warg = {
    "id": "warg",
    "name": "Warg",
    "type": "monster",
    "subtype": null,
    "size": "Grande",
    "challengeRating": 3,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 227,
        "bookPage": 225
    },
    "stats": {
        "initiative": 6,
        "perception": 10,
        "defense": 21,
        "fortitude": 9,
        "reflex": 13,
        "will": 5,
        "hitPoints": 110,
        "speedText": "12m (8q)",
        "senses": "faro, visão no escuro",
        "defensesText": null,
        "attributes": {
            "str": 6,
            "dex": 3,
            "con": 4,
            "int": -2,
            "wis": 2,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +15 (2d6+12)."
        }
    ],
    "abilities": [
        {
            "name": "Ataque Furtivo",
            "timing": null,
            "text": "+2d6."
        },
        {
            "name": "Derrubar",
            "timing": "livre",
            "text": "Mordida (teste +17)."
        },
        {
            "name": "Predador Oculto",
            "timing": null,
            "text": "O warg pode se mover com seu deslocamento normal enquanto se esconde ou rastreia sem penalidades nos testes de Furtividade ou Sobrevivência. Além disso, sofre apenas –5 de penalidade em testes de Furtividade para esconder-se após atacar ou fazer uma ação chamativa (em vez de –20)."
        }
    ],
    "equipment": null,
    "treasure": "Metade.",
    "skillsText": "Furtividade +11 (+16 em ambientes escuros), Sobrevivência +10"
};

export const homemPiranhaCapitao = {
    "id": "homem-piranha-capitao",
    "name": "Homem-Piranha Capitão",
    "type": "monster",
    "subtype": "lefou",
    "size": "Médio",
    "challengeRating": 7,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 259,
        "bookPage": 257
    },
    "stats": {
        "initiative": 12,
        "perception": 8,
        "defense": 29,
        "fortitude": 19,
        "reflex": 14,
        "will": 9,
        "hitPoints": 290,
        "speedText": "9m (6q)",
        "senses": null,
        "defensesText": "fortificação 50%; imunidade a atordoado; redução de ácido, eletricidade, fogo, frio, luz e trevas 10; resistência a efeitos lefeu e da Tormenta +5",
        "attributes": {
            "str": 6,
            "dex": 3,
            "con": 4,
            "int": 0,
            "wis": 1,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Machado anão +25 (1d10+20, x4) e mordida do diabo +25 (1d4+20)."
        }
    ],
    "abilities": [
        {
            "name": "Dentes Afiados",
            "timing": "reação",
            "text": "Uma vez por rodada, quando uma criatura adjacente erra um ataque contra o homem-piranha capitão por 5 ou mais, sofre 1d4+8 pontos de dano de corte."
        },
        {
            "name": "Sequência do Rio",
            "timing": "livre",
            "text": "Quando o capitão acerta seus dois ataques em um mesmo oponente na mesma rodada, pode usar a manobra agarrar ou desarmar com a mordida do diabo (teste +25)."
        }
    ],
    "equipment": "Couraça selada, machado anão, mordida do diabo",
    "treasure": "Metade.",
    "skillsText": "Acrobacia +10, Atletismo +13, Pilotagem +10"
};

export const mercenarioDeAslothia = {
    "id": "mercenario-de-aslothia",
    "name": "Mercenário de Aslothia",
    "type": "monster",
    "subtype": "lefou",
    "size": "Médio",
    "challengeRating": 3,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "pdfPage": 290,
        "bookPage": 288
    },
    "stats": {
        "initiative": 1,
        "perception": 1,
        "defense": 20,
        "fortitude": 14,
        "reflex": 4,
        "will": 9,
        "hitPoints": 21,
        "speedText": "9m (6q)",
        "senses": null,
        "defensesText": "resistência a magia e medo +5",
        "attributes": {
            "str": 3,
            "dex": 0,
            "con": 2,
            "int": -1,
            "wis": 0,
            "cha": 0
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Maça +16 (1d8+12, x3)."
        }
    ],
    "abilities": [
        {
            "name": "Inescrupuloso",
            "timing": null,
            "text": "O mercenário recebe +2 em testes de ataque e +1d6 em rolagens de dano contra criaturas flanqueadas, sob efeito de alguma condição ou que sigam algum código de conduta (como Código de Honra ou Código do Herói)."
        }
    ],
    "equipment": "Gibão de peles, maça",
    "treasure": "Padrão.",
    "skillsText": "Atletismo +6, Intimidação +5"
};

const manticoraAmeacasDeArton = {
    "id": "manticora-ameacas-de-arton",
    "name": "Mantícora",
    "type": "monster",
    "subtype": null,
    "size": "Grande",
    "challengeRating": 6,
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "bookPage": 298,
        "pdfPage": 300
    },
    "stats": {
        "initiative": 7,
        "perception": 8,
        "defense": 26,
        "fortitude": 18,
        "reflex": 7,
        "will": 12,
        "hitPoints": 240,
        "speedText": "9m (6q), voo 15m (10q)",
        "senses": "faro, visão no escuro",
        "defensesText": null,
        "attributes": {
            "str": 7,
            "dex": 2,
            "con": 5,
            "int": -2,
            "wis": 1,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +18 (1d10+12) e duas garras +18 (1d8+12)."
        }
    ],
    "abilities": [
        {
            "name": "Espinhos",
            "timing": "movimento",
            "text": "Dispara 1d4 espinhos. Cada um atinge uma criatura em alcance médio e causa 1d8+7 de perfuração (Ref CD 22 reduz à metade). Recarga (movimento)."
        }
    ],
    "equipment": null,
    "treasure": "Padrão mais espinhos (CD 21 para extrair, valem T$ 150 para fabricar flechas superiores).",
    "skillsText": null,
    "role": "solo",
    "roleSource": "pdf-review",
    "variantOf": "manticora"
};

const manticoraPrimal = {
    "id": "manticora-primal",
    "name": "Mantícora Primal",
    "type": "monster",
    "subtype": null,
    "size": "Enorme",
    "challengeRating": 14,
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "bookPage": 298,
        "pdfPage": 300
    },
    "stats": {
        "initiative": 14,
        "perception": 16,
        "defense": 44,
        "fortitude": 28,
        "reflex": 14,
        "will": 22,
        "hitPoints": 655,
        "speedText": "9m (6q), voo 18m (12q)",
        "senses": "faro, visão no escuro",
        "defensesText": null,
        "attributes": {
            "str": 8,
            "dex": 3,
            "con": 5,
            "int": -3,
            "wis": 3,
            "cha": -3
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +40 (3d10+25) e duas garras +40 (2d8+25)."
        }
    ],
    "abilities": [
        {
            "name": "Crueldade",
            "timing": null,
            "text": "Se acertar as duas garras no mesmo turno, pode continuar atacando com garras até errar, com penalidade cumulativa de –5 por ataque adicional."
        },
        {
            "name": "Espinhos",
            "timing": "movimento",
            "text": "Dispara 2d4 espinhos. Cada um atinge uma criatura em alcance médio e causa 2d8+8 de perfuração (Ref CD 38 reduz à metade). Recarga (movimento)."
        },
        {
            "name": "Ressentimento",
            "timing": "movimento",
            "text": "Criaturas em alcance curto ficam imóveis por 1 rodada e sofrem 8d8 de dano psíquico (Von CD 38 reduz à metade e evita a condição). Cada criatura pode ser afetada pela mesma mantícora uma vez por cena."
        }
    ],
    "equipment": null,
    "treasure": "Padrão mais espinhos (CD 29 para extrair, valem T$ 300 para fabricar flechas superiores).",
    "skillsText": null,
    "role": "solo",
    "roleSource": "pdf-review"
};

const otyughAmeacasDeArton = {
    "id": "otyugh-ameacas-de-arton",
    "name": "Otyugh",
    "type": "monster",
    "subtype": null,
    "size": "Grande",
    "challengeRating": 5,
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "bookPage": 299,
        "pdfPage": 301
    },
    "stats": {
        "initiative": 3,
        "perception": 10,
        "defense": 24,
        "fortitude": 17,
        "reflex": 11,
        "will": 5,
        "hitPoints": 213,
        "speedText": "6m (4q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a doenças e veneno, redução de dano 5",
        "attributes": {
            "str": 5,
            "dex": -1,
            "con": 4,
            "int": -2,
            "wis": 1,
            "cha": -2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Dois tentáculos +17 (1d8+9, alcance 4,5m) e mordida +17 (1d6+9 mais doença)."
        }
    ],
    "abilities": [
        {
            "name": "Agarrar Aprimorado",
            "timing": "livre",
            "text": "Tentáculo (teste +19)."
        },
        {
            "name": "Constrição",
            "timing": "livre",
            "text": "No início de cada turno do otyugh, cada criatura agarrada por ele sofre 1d8+9 de impacto."
        },
        {
            "name": "Doença",
            "timing": null,
            "text": "A mordida expõe a vítima à infecção do esgoto (Livro Básico, p. 318)."
        }
    ],
    "equipment": null,
    "treasure": "Padrão.",
    "skillsText": "Furtividade +3 (+13 em seu refúgio).",
    "role": "solo",
    "roleSource": "pdf-review",
    "variantOf": "otyugh"
};

const hordaDeOtyughs = {
    "id": "horda-de-otyughs",
    "name": "Horda de Otyughs",
    "type": "monster",
    "subtype": null,
    "size": "Colossal",
    "challengeRating": 16,
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "bookPage": 299,
        "pdfPage": 301
    },
    "stats": {
        "initiative": 10,
        "perception": 14,
        "defense": 53,
        "fortitude": 30,
        "reflex": 24,
        "will": 16,
        "hitPoints": 800,
        "speedText": "12m (8q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a doenças e veneno, redução de dano 20",
        "attributes": {
            "str": 6,
            "dex": -1,
            "con": 4,
            "int": -2,
            "wis": 1,
            "cha": -3
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "[Bando] Dois tentáculos +44 (4d8+18, alcance 4,5m) e mordida +44 (4d6+18 mais doença)."
        }
    ],
    "abilities": [
        {
            "name": "Agarrar Aprimorado",
            "timing": "livre",
            "text": "Tentáculo (teste +54). Pode manter até cinco criaturas Grandes ou menores agarradas sem ocupar os tentáculos."
        },
        {
            "name": "Chuva de Tentáculos",
            "timing": "completa",
            "text": "Faz um ataque de tentáculo contra cada criatura em seu alcance."
        },
        {
            "name": "Constrição",
            "timing": "livre",
            "text": "No início de cada turno da horda, cada criatura agarrada por ela sofre 2d8+18 de impacto."
        },
        {
            "name": "Doença",
            "timing": null,
            "text": "Uma criatura mordida ou que comece o turno adjacente à horda é exposta à infecção do esgoto (Livro Básico, p. 318), com CD 42."
        },
        {
            "name": "Mar de Tentáculos",
            "timing": null,
            "text": "Criaturas a até 4,5m ficam enredadas."
        }
    ],
    "equipment": null,
    "treasure": "Padrão.",
    "skillsText": null,
    "role": "solo",
    "roleSource": "pdf-review"
};

const cerianthar = {
    "id": "cerianthar",
    "name": "Cerianthar",
    "type": "monster",
    "subtype": null,
    "size": "Médio",
    "challengeRating": 4,
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "bookPage": 307,
        "pdfPage": 309
    },
    "stats": {
        "initiative": 9,
        "perception": 5,
        "defense": 22,
        "fortitude": 15,
        "reflex": 5,
        "will": 10,
        "hitPoints": 140,
        "speedText": "9m (6q)",
        "senses": "percepção às cegas",
        "defensesText": null,
        "attributes": {
            "str": 3,
            "dex": 2,
            "con": 2,
            "int": -4,
            "wis": 1,
            "cha": 0
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Quatro tentáculos +16 (1d6+4, alcance 3m)."
        }
    ],
    "abilities": [
        {
            "name": "Agarrar Aprimorado",
            "timing": "livre",
            "text": "Tentáculo (teste +16)."
        },
        {
            "name": "Constrição",
            "timing": "livre",
            "text": "No início de cada turno, causa 2d6+4 de corte a cada criatura agarrada."
        },
        {
            "name": "Imobilidade",
            "timing": null,
            "text": "Pode ficar imóvel. Um personagem precisa passar em Percepção CD 35 para distingui-lo da paisagem."
        },
        {
            "name": "Muitos Tentáculos",
            "timing": null,
            "text": "Tem oito tentáculos. Usa no máximo quatro para atacar ao mesmo tempo e pode usar os outros para manter criaturas agarradas."
        },
        {
            "name": "Tentáculos Decepáveis",
            "timing": null,
            "text": "Cada tentáculo tem Defesa 24 e é cortado se sofrer 10 ou mais de corte em um único ataque direto. Uma criatura agarrada pelo tentáculo cortado é solta."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": "Furtividade +9.",
    "role": "solo",
    "roleSource": "pdf-review"
};

const grandeTachygloss = {
    "id": "grande-tachygloss",
    "name": "Grande Tachygloss",
    "type": "monster",
    "subtype": null,
    "size": "Grande",
    "challengeRating": 16,
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "bookPage": 308,
        "pdfPage": 310
    },
    "stats": {
        "initiative": 14,
        "perception": 16,
        "defense": 53,
        "fortitude": 30,
        "reflex": 24,
        "will": 16,
        "hitPoints": 800,
        "speedText": "12m (8q), escalada 12m (8q)",
        "senses": "visão no escuro",
        "defensesText": "redução de dano 20",
        "attributes": {
            "str": 7,
            "dex": 0,
            "con": 8,
            "int": -4,
            "wis": 2,
            "cha": -3
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Duas garras +43 (3d8+23 mais 6d6 perfuração) e cauda +43 (2d10+23, x3, mais 6d6 perfuração)."
        }
    ],
    "abilities": [
        {
            "name": "Acúleos",
            "timing": null,
            "text": "O dano de perfuração que causa ignora redução de dano."
        },
        {
            "name": "Armadura de Espinhos",
            "timing": null,
            "text": "Ao sofrer dano de um ataque corpo a corpo adjacente, causa 6d6 de perfuração ao atacante."
        }
    ],
    "equipment": null,
    "treasure": "Acúleos de tachygloss (CD 31 para extrair, valem T$ 1.000 para fabricar uma arma com a melhoria penetrante).",
    "skillsText": null,
    "role": "solo",
    "roleSource": "pdf-review"
};

const oxxdon = {
    "id": "oxxdon",
    "name": "Oxxdon",
    "type": "monster",
    "subtype": null,
    "size": "Médio",
    "challengeRating": 2,
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "bookPage": 308,
        "pdfPage": 310,
        "bookPageEnd": 309,
        "pdfPageEnd": 311
    },
    "stats": {
        "initiative": 7,
        "perception": 4,
        "defense": 20,
        "fortitude": 7,
        "reflex": 9,
        "will": 4,
        "hitPoints": 72,
        "speedText": "12m (8q)",
        "senses": "faro, visão no escuro",
        "defensesText": null,
        "attributes": {
            "str": 0,
            "dex": 4,
            "con": 2,
            "int": -4,
            "wis": 1,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Antena +12 (ferrugem) e mordida +12 (1d8+4)."
        }
    ],
    "abilities": [
        {
            "name": "Ferrugem",
            "timing": null,
            "text": "A antena destrói objetos de metal atingidos. Uma arma de metal que cause dano à criatura também é destruída. Itens mágicos podem fazer Fortitude CD 17 para evitar. Contra uma criatura de metal, a antena a deixa fatigada, então exausta, então paralisada, mesmo se imune (Fort CD 17 evita). Remover cada condição exige 1 hora, T$ 50 em materiais e Ofício (artesão) CD 20."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": null,
    "role": "solo",
    "roleSource": "pdf-review"
};

const oxxdonImenso = {
    "id": "oxxdon-imenso",
    "name": "Oxxdon Imenso",
    "type": "monster",
    "subtype": null,
    "size": "Enorme",
    "challengeRating": 10,
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "bookPage": 309,
        "pdfPage": 311
    },
    "stats": {
        "initiative": 18,
        "perception": 10,
        "defense": 36,
        "fortitude": 13,
        "reflex": 24,
        "will": 11,
        "hitPoints": 400,
        "speedText": "12m (8q)",
        "senses": "faro, visão no escuro",
        "defensesText": null,
        "attributes": {
            "str": 2,
            "dex": 6,
            "con": 3,
            "int": -4,
            "wis": 1,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Duas antenas +29 (1d8+10 mais ferrugem) e mordida +29 (3d8+10)."
        }
    ],
    "abilities": [
        {
            "name": "Aura Oxidante",
            "timing": null,
            "text": "Objetos soltos e criaturas que comecem o turno em um raio de 9m sofrem 4d6+10 de essência e ficam fatigados por 1 rodada."
        },
        {
            "name": "Ferrugem",
            "timing": null,
            "text": "A antena destrói objetos de metal atingidos. Uma arma de metal que cause dano à criatura também é destruída. Itens mágicos podem fazer Fortitude CD 30 para evitar. Contra uma criatura de metal, a antena a deixa fatigada, então exausta, então paralisada, mesmo se imune (Fort CD 30 evita). Remover cada condição exige 1 hora, T$ 50 em materiais e Ofício (artesão) CD 20."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": null,
    "role": "solo",
    "roleSource": "pdf-review"
};

const razzaKham = {
    "id": "razza-kham",
    "name": "Razza’Kham",
    "type": "monster",
    "subtype": null,
    "size": "Enorme",
    "challengeRating": 17,
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "bookPage": 309,
        "pdfPage": 311
    },
    "stats": {
        "initiative": 16,
        "perception": 21,
        "defense": 54,
        "fortitude": 30,
        "reflex": 24,
        "will": 17,
        "hitPoints": 1010,
        "speedText": "15m (10q)",
        "senses": "faro, percepção às cegas, visão no escuro",
        "defensesText": "redução de dano 15, redução de ácido, eletricidade, fogo e frio 20",
        "attributes": {
            "str": 14,
            "dex": 2,
            "con": 7,
            "int": -5,
            "wis": 2,
            "cha": 0
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Duas garras +47 (6d10+36, 18) e mordida +47 (10d10+36, x3)."
        }
    ],
    "abilities": [
        {
            "name": "Brutalidade Incontida",
            "timing": null,
            "text": "Para cada resultado máximo em um dado de dano, rola um dado extra de dano do mesmo tipo."
        },
        {
            "name": "Dilacerar",
            "timing": null,
            "text": "Se acertar as duas garras numa criatura no mesmo turno, causa mais 8d6 de dano."
        },
        {
            "name": "Varrer",
            "timing": "livre",
            "text": "Uma vez por rodada, ao reduzir um alvo a 0 PV ou menos com um ataque corpo a corpo, pode fazer um ataque adicional contra outra criatura em seu alcance."
        }
    ],
    "equipment": null,
    "treasure": "Três peças de quitina razza (CD 32 para extrair).",
    "skillsText": null,
    "role": "solo",
    "roleSource": "pdf-review"
};

const serpeAmeacasDeArton = {
    "id": "serpe-ameacas-de-arton",
    "name": "Serpe",
    "type": "monster",
    "subtype": null,
    "size": "Grande",
    "challengeRating": 5,
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "bookPage": 310,
        "pdfPage": 312
    },
    "stats": {
        "initiative": 5,
        "perception": 7,
        "defense": 24,
        "fortitude": 10,
        "reflex": 16,
        "will": 5,
        "hitPoints": 200,
        "speedText": "9m (6q), voo 18m (12q)",
        "senses": "faro, visão no escuro",
        "defensesText": "imunidade a paralisia",
        "attributes": {
            "str": 6,
            "dex": 1,
            "con": 6,
            "int": -2,
            "wis": 1,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +17 (2d6+12) e ferrão +17 (1d8+12 mais veneno)."
        }
    ],
    "abilities": [
        {
            "name": "Agarrar Aprimorado",
            "timing": "livre",
            "text": "Mordida (teste +19)."
        },
        {
            "name": "Veneno",
            "timing": null,
            "text": "Peçonha concentrada. Perde 1d12 PV por rodada durante 3 rodadas (Fort CD 20 reduz para 1 rodada)."
        }
    ],
    "equipment": null,
    "treasure": "1d4 doses de peçonha concentrada (CD 20 para extrair).",
    "skillsText": null,
    "role": "solo",
    "roleSource": "pdf-review",
    "variantOf": "serpe"
};

const serpeAncia = {
    "id": "serpe-ancia",
    "name": "Serpe Anciã",
    "type": "monster",
    "subtype": null,
    "size": "Enorme",
    "challengeRating": 8,
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "bookPage": 310,
        "pdfPage": 312,
        "bookPageEnd": 311,
        "pdfPageEnd": 313
    },
    "stats": {
        "initiative": 8,
        "perception": 7,
        "defense": 33,
        "fortitude": 15,
        "reflex": 21,
        "will": 8,
        "hitPoints": 320,
        "speedText": "9m (6q), voo 18m (12q)",
        "senses": "faro, visão no escuro",
        "defensesText": "imunidade a paralisia e veneno",
        "attributes": {
            "str": 7,
            "dex": 1,
            "con": 6,
            "int": -2,
            "wis": 1,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +26 (3d6+15) e ferrão +26 (2d12+15 mais veneno)."
        }
    ],
    "abilities": [
        {
            "name": "Agarrar Aprimorado",
            "timing": "livre",
            "text": "Mordida (teste +31)."
        },
        {
            "name": "Jato de Podridão",
            "timing": "padrão",
            "text": "Dispara veneno em uma linha de 18m, ignorando imunidade. Criaturas na área perdem 6d12 PV (Fort CD 26 reduz à metade). Recarga (movimento)."
        },
        {
            "name": "Veneno",
            "timing": null,
            "text": "Peçonha anciã. Perde 3d12 PV por rodada durante 3 rodadas, ignorando imunidade a veneno (Fort CD 26 reduz para 1 rodada)."
        }
    ],
    "equipment": null,
    "treasure": "1d4 doses de peçonha anciã (CD 23 para extrair).",
    "skillsText": null,
    "role": "solo",
    "roleSource": "pdf-review"
};

const uraghianJovem = {
    "id": "uraghian-jovem",
    "name": "Uraghian Jovem",
    "type": "monster",
    "subtype": null,
    "size": "Grande",
    "challengeRating": 5,
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "bookPage": 311,
        "pdfPage": 313
    },
    "stats": {
        "initiative": 3,
        "perception": 5,
        "defense": 24,
        "fortitude": 17,
        "reflex": 5,
        "will": 11,
        "hitPoints": 200,
        "speedText": "9m (6q)",
        "senses": "faro, visão na penumbra",
        "defensesText": "redução de fogo 20",
        "attributes": {
            "str": 6,
            "dex": -1,
            "con": 5,
            "int": -5,
            "wis": 1,
            "cha": -2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +17 (2d8+10 mais 6d6 fogo)."
        }
    ],
    "abilities": [
        {
            "name": "Couraça Cáustica",
            "timing": null,
            "text": "Quem causa dano ao uraghian com ataque corpo a corpo sofre 6d6 de fogo. Criaturas com alcance natural maior que 1,5m ficam isentas."
        },
        {
            "name": "Rajada Flamejante",
            "timing": "padrão",
            "text": "Cospe óleo flamejante em um cone de 12m. Criaturas na área sofrem 6d6+12 de fogo e ficam em chamas (Ref CD 20 reduz à metade e evita a condição). Recarga (movimento)."
        }
    ],
    "equipment": null,
    "treasure": "Óleo de besouro x1d4 (CD 20 para extrair).",
    "skillsText": null,
    "role": "solo",
    "roleSource": "pdf-review"
};

const uraghianAdulto = {
    "id": "uraghian-adulto",
    "name": "Uraghian Adulto",
    "type": "monster",
    "subtype": null,
    "size": "Enorme",
    "challengeRating": 8,
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "bookPage": 311,
        "pdfPage": 313
    },
    "stats": {
        "initiative": 7,
        "perception": 10,
        "defense": 33,
        "fortitude": 21,
        "reflex": 8,
        "will": 15,
        "hitPoints": 330,
        "speedText": "9m (6q)",
        "senses": "faro, visão na penumbra",
        "defensesText": "redução de fogo 20",
        "attributes": {
            "str": 8,
            "dex": -1,
            "con": 6,
            "int": -5,
            "wis": 2,
            "cha": -2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +26 (2d12+35 mais 6d6 fogo)."
        }
    ],
    "abilities": [
        {
            "name": "Couraça Cáustica",
            "timing": null,
            "text": "Quem causa dano ao uraghian com ataque corpo a corpo sofre 6d6 de fogo. Criaturas com alcance natural maior que 1,5m ficam isentas."
        },
        {
            "name": "Rajada Flamejante",
            "timing": "padrão",
            "text": "Cospe óleo flamejante em um cone de 18m. Criaturas na área sofrem 10d6+20 de fogo e ficam em chamas (Ref CD 26 reduz à metade e evita a condição). Recarga (movimento)."
        }
    ],
    "equipment": null,
    "treasure": "Óleo de besouro x1d6 (CD 23 para extrair) e casulos de seda x2d4 (CD 23 para extrair, cada casulo vale T$ 100 para fabricar um vestuário superior).",
    "skillsText": null,
    "role": "solo",
    "roleSource": "pdf-review"
};

const kaiju = {
    "id": "kaiju",
    "name": "Kaiju",
    "type": "monster",
    "subtype": "kaiju",
    "size": "Colossal",
    "challengeRating": 20,
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "bookPage": 313,
        "pdfPage": 315
    },
    "stats": {
        "initiative": 22,
        "perception": 16,
        "defense": 62,
        "fortitude": 34,
        "reflex": 28,
        "will": 20,
        "hitPoints": 1500,
        "speedText": "15m (10q), mais um entre escalada 9m (6q), natação 36m (24q) ou voo 36m (24q)",
        "senses": "faro, visão no escuro",
        "defensesText": "cura acelerada 50/kaiju, fortificação 75%, imunidade a efeitos de metabolismo e mentais, medo, metamorfose, paralisia e veneno, redução de dano 30",
        "attributes": {
            "str": 20,
            "dex": 0,
            "con": 15,
            "int": -3,
            "wis": 2,
            "cha": -3
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Duas garras +55 (2d20+50), mordida +55 (2d20+50) e cauda +55 (2d20+50)."
        }
    ],
    "abilities": [
        {
            "name": "Agarrar Aprimorado",
            "timing": "livre",
            "text": "Mordida (teste +60)."
        },
        {
            "name": "Arsenal Titânico",
            "timing": null,
            "text": "Escolha dois dos nove poderes titânicos a seguir para este kaiju."
        },
        {
            "name": "Arremessar Montanha",
            "timing": "padrão",
            "text": "Arremessa uma rocha contra uma criatura em alcance longo. O alvo e criaturas em alcance curto dele sofrem 10d12 de impacto e ficam soterrados (Ref CD 50 reduz à metade e evita o soterramento). Soterrados ficam imóveis e sofrem 2d12 de impacto no início de seus turnos. Libertar a si ou um aliado exige ação completa e Força CD 28, com ajuda permitida. Recarga (movimento)."
        },
        {
            "name": "Fúria Retalhadora",
            "timing": null,
            "text": "Uma vez por rodada, ao sofrer dano, recebe +5 nos ataques e +1d20 no dano até o fim do próximo turno."
        },
        {
            "name": "Ferrão Peçonhento",
            "timing": null,
            "text": "O ferrão substitui a cauda. Usa as mesmas estatísticas, com dano de perfuração mais veneno."
        },
        {
            "name": "Poeira dos Sonhos",
            "timing": "movimento",
            "text": "Criaturas em alcance médio ficam inconscientes e caídas. Em combate, ficam exaustas em vez disso (Von CD 50 muda para fatigada e dá imunidade à habilidade até o fim da cena). Recarga (movimento)."
        },
        {
            "name": "Rugido Aterrador",
            "timing": "padrão",
            "text": "Criaturas em alcance longo sofrem 16d12 de impacto e ficam apavoradas e surdas (Fort CD 50 reduz à metade, evita surdez e troca apavorada por abalada). Recarga (movimento)."
        },
        {
            "name": "Sopro Corrosivo",
            "timing": "padrão",
            "text": "Num cone de 12m, criaturas sofrem 12d20 de ácido e ficam vulneráveis (Ref CD 50 reduz à metade e evita a condição). Recarga (movimento)."
        },
        {
            "name": "Tempestade de Ferrões",
            "timing": "completa",
            "text": "Criaturas em alcance médio sofrem 6d12 de perfuração e são expostas à peçonha kaiju (Ref CD 50 reduz à metade e evita o veneno). Recarga (padrão)."
        },
        {
            "name": "Terremoto da Ira",
            "timing": "completa",
            "text": "Criaturas em alcance médio em contato com o solo sofrem 14d12 de dano e ficam caídas (Ref CD 50 reduz à metade e evita a condição). Recarga (ser reduzido a 800 PV)."
        },
        {
            "name": "Ventos Bravios",
            "timing": null,
            "text": "Ao voar, arremessa criaturas em alcance médio 15m para longe (Fort CD 50 evita). Quem é arremessado fica caído e, se bater em obstáculo, sofre 1d6 de impacto por 1,5m arremessado. Requer deslocamento de voo."
        },
        {
            "name": "Engolir",
            "timing": "livre",
            "text": "No início de cada turno do kaiju, cada vítima engolida sofre 2d20+50 de impacto e 2d20+50 de ácido. Pode escapar causando ao todo 200 de dano por dentro (Defesa 25, fortificação 25%, RD 0). Cabe uma criatura Enorme ou até dez Grandes ou menores."
        },
        {
            "name": "Maior que a Vida",
            "timing": null,
            "text": "Se falhar em resistência contra efeito com duração maior que instantânea, pode repetir o teste contra a CD original no início dos turnos até o fim do efeito. Ao voltar a 1 PV pela cura acelerada após cair a 0 PV ou menos, abandona a luta e volta à terra de origem."
        },
        {
            "name": "Titânico",
            "timing": null,
            "text": "Imune a manobras e a flanqueamento, sofre metade do dano de ataques de criaturas sem Titânico. Ao se mover pelo espaço de uma criatura ou objeto Enorme ou menor, causa 20d6 de impacto (Ref CD 50 reduz à metade, uma vez por rodada por criatura). Seus ataques ignoram RD e atingem todas as criaturas em um quadrado de 6m, usando uma só jogada de ataque por ataque."
        },
        {
            "name": "Veneno",
            "timing": null,
            "text": "Peçonha kaiju. Perde 5d12 PV por rodada durante 10 rodadas (Fort CD 50 reduz para 1 rodada)."
        }
    ],
    "equipment": null,
    "treasure": "Padrão mais 6 peças de couraça de kaiju (CD 35 para extrair).",
    "skillsText": "Atletismo +35, Intimidação +35.",
    "role": "solo",
    "roleSource": "pdf-review"
};

const canceronteDeGuerra = {
    "id": "canceronte-de-guerra",
    "name": "Canceronte de Guerra",
    "type": "monster",
    "subtype": null,
    "size": "Colossal",
    "challengeRating": 16,
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "bookPage": 315,
        "pdfPage": 317
    },
    "stats": {
        "initiative": 10,
        "perception": 11,
        "defense": 53,
        "fortitude": 30,
        "reflex": 24,
        "will": 16,
        "hitPoints": 825,
        "speedText": "12m (8q), natação 18m (12q)",
        "senses": "visão na penumbra",
        "defensesText": "fortificação 25%, imunidade a encantamento, redução de dano 15",
        "attributes": {
            "str": 10,
            "dex": 0,
            "con": 8,
            "int": -4,
            "wis": 0,
            "cha": -2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Quatro garras +45 (4d10+25)."
        }
    ],
    "abilities": [
        {
            "name": "Abordagem",
            "timing": null,
            "text": "Um personagem pode gastar uma ação de movimento e fazer um teste de Atletismo (CD 30) para escalar o canceronte de guerra. Se falhar por 5 ou mais, cai na frente do monstro e sofre 4d6 pontos de dano da queda. Se passar em três desses testes, chega na escotilha em sua barriga. Abrir a escotilha exige um teste de Ladinagem ou Força (CD 30). Cada canceronte possui uma equipe de cinco sahuagin (ataque +35, 3d6+25 pontos de dano de perfuração, Defesa 28, 60 PV e usa os testes de resistência do canceronte) em seu interior, para impedir que intrusos cheguem à concha de comando. Na concha de comando está o capitão (ataque +36, 3d8+25 pontos de dano de perfuração, Defesa 30, 100 PV e usa os testes de resistência do canceronte). Uma vez que o capitão seja morto, o canceronte para de lutar."
        },
        {
            "name": "Agarrar Aprimorado",
            "timing": "livre",
            "text": "Garra (teste +55)."
        },
        {
            "name": "Atropelamento",
            "timing": "completa",
            "text": "O canceronte percorre até o dobro de seu deslocamento. Ele pode passar pelo espaço ocupado de quaisquer inimigos menores que ele, mas não pode passar duas vezes pelo mesmo espaço. Criaturas atropeladas desta forma sofrem 10d10+50 pontos de dano de impacto e ficam caídas (Ref CD 42 reduz à metade e evita a condição). Recarga (movimento)."
        },
        {
            "name": "Autotomia",
            "timing": "livre",
            "text": "O canceronte pode sacrificar uma de suas garras para se livrar de um perigo maior. Quando faz isso, ele automaticamente passa em um teste para evitar uma condição de movimento (como um teste de ataque para se libertar de um agarramento), mas perde um de seus ataques de garra. Uma garra sacrificada desta forma se regenera em um mês."
        },
        {
            "name": "Guilhotinar",
            "timing": "padrão",
            "text": "Se o canceronte começar seu turno agarrando uma criatura menor que ele, poderá fazer um teste de agarrar contra ela. Se vencer, a criatura sofre 8d10+50 pontos de dano de impacto e fica debilitada (ou inconsciente, se já estiver debilitada)."
        },
        {
            "name": "Máquina de Cerco",
            "timing": null,
            "text": "O canceronte recebe +2 em testes de ataque para quebrar (teste total +57) e seus ataques ignoram redução de dano de objetos."
        }
    ],
    "equipment": null,
    "treasure": "Metade mais 2d4 postas de canceronte (CD 31 para extrair; cada posta vale T$ 12 para preparar um banquete de canceronte).",
    "skillsText": null,
    "role": "solo",
    "roleSource": "pdf-review"
};

const enguiaRainha = {
    "id": "enguia-rainha",
    "name": "Enguia Rainha",
    "type": "monster",
    "subtype": null,
    "size": "Colossal",
    "challengeRating": 19,
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "bookPage": 317,
        "pdfPage": 319,
        "bookPageEnd": 318,
        "pdfPageEnd": 320
    },
    "stats": {
        "initiative": 23,
        "perception": 19,
        "defense": 54,
        "fortitude": 32,
        "reflex": 26,
        "will": 19,
        "hitPoints": 1150,
        "speedText": "Natação 12m (8q)",
        "senses": "visão no escuro",
        "defensesText": "redução de dano 15",
        "attributes": {
            "str": 12,
            "dex": 4,
            "con": 11,
            "int": -4,
            "wis": 3,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +52 (4d12+46, 19) e cauda x2 +52 (3d12+32)."
        }
    ],
    "abilities": [
        {
            "name": "Agarrar Aprimorado",
            "timing": "livre",
            "text": "Mordida (teste +62)."
        },
        {
            "name": "Constrição",
            "timing": "livre",
            "text": "No início de cada um de seus turnos, a Enguia Rainha causa 6d12+32 pontos de dano de impacto em cada criatura que esteja agarrando."
        },
        {
            "name": "Engolir",
            "timing": "padrão",
            "text": "No início de cada um dos turnos da Enguia, a criatura engolida sofre 4d12+20 pontos de dano de impacto mais 4d12+20 pontos de dano de ácido. Ela pode escapar causando um total de 200 pontos de dano a ela (Defesa 25, redução de dano 5)."
        },
        {
            "name": "Majestade Elétrica",
            "timing": "padrão",
            "text": "A Enguia se cobre com eletricidade natural. Criaturas agarradas sofrem 10d8 pontos de dano de eletricidade (Fort CD 47 reduz à metade). Além disso, até a próxima rodada, qualquer criatura que faça um ataque corpo a corpo contra a Enguia sofre 6d8 pontos de dano de eletricidade."
        },
        {
            "name": "Sopro",
            "timing": "padrão",
            "text": "A Enguia sopra vapor fervente em um cone de 18m. Cada criatura nessa área sofre 12d12 pontos de dano, metade fogo e metade ácido, e é recoberta por uma substância corrosiva que causa 4d12 pontos de dano de ácido pelas próximas 1d4 rodadas (Ref CD 47 reduz o dano à metade e evita a substância). Recarga (movimento)."
        }
    ],
    "equipment": null,
    "treasure": "Padrão mais suco gástrico (CD 34 para extrair, vale T$ 2.000 para fabricar itens que causem dano de ácido).",
    "skillsText": null,
    "role": "solo",
    "roleSource": "pdf-review"
};

const kraken = {
    "id": "kraken",
    "name": "Kraken",
    "type": "monster",
    "subtype": null,
    "size": "Colossal",
    "challengeRating": 19,
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "bookPage": 325,
        "pdfPage": 327
    },
    "stats": {
        "initiative": 22,
        "perception": 20,
        "defense": 59,
        "fortitude": 32,
        "reflex": 19,
        "will": 26,
        "hitPoints": 1145,
        "speedText": "9m (6q), natação 24m (16q)",
        "senses": "visão no escuro",
        "defensesText": "redução de dano 20, resistência a magia +5",
        "attributes": {
            "str": 15,
            "dex": 5,
            "con": 12,
            "int": 10,
            "wis": 4,
            "cha": 7
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Oito tentáculos +50 (2d10+30) e mordida +50 (2d12+23)."
        }
    ],
    "abilities": [
        {
            "name": "Agarrar Aprimorado",
            "timing": "livre",
            "text": "Tentáculo +60."
        },
        {
            "name": "Chamado do Mar",
            "timing": "padrão",
            "text": "O kraken pode dominar até 10 criaturas em alcance longo, como o efeito básico da magia Legião (Von CD 47 evita). Esta habilidade não tem efeito sobre criaturas em terra firme (mas afeta alvos que estejam em embarcações ou outras superfícies sobre o mar). Uma criatura que passe no teste de Vontade se torna imune a esta habilidade até o fim da cena.",
            "magical": true
        },
        {
            "name": "Constrição",
            "timing": "livre",
            "text": "No início de cada um de seus turnos, o kraken causa 4d10+30 pontos de dano de impacto em cada criatura que estiver agarrando."
        },
        {
            "name": "Dominar as Marés",
            "timing": "completa",
            "text": "O kraken pode alterar o clima em uma esfera de 2km ao seu redor (como o efeito básico da magia Controlar o Clima). Esta habilidade não afeta o clima sobre terra firme.",
            "magical": true
        },
        {
            "name": "Nuvem de Tinta",
            "timing": "movimento",
            "text": "O kraken expele uma nuvem de tinta num cone de 30m. Criaturas a até 1,5m têm camuflagem leve e criaturas a partir de 3m têm camuflagem total. Dentro da nuvem, criaturas têm seu deslocamento reduzido para 3m (independente de seu deslocamento normal) e sofrem –5 em testes de ataque e rolagens de dano. O kraken é imune aos efeitos da nuvem."
        },
        {
            "name": "Terror do Mar Profundo",
            "timing": null,
            "text": "O kraken começa o combate submerso, usando apenas quatro tentáculos para atacar. Cada tentáculo conta como uma criatura separada, com 115 PV, Defesa 54, imunidade a efeitos mentais e medo e demais características iguais às do kraken. Enquanto está submerso, o kraken não pode ser afetado por nenhum efeito, habilidade ou ataque. Quando os quatro tentáculos são destruídos, o kraken perde esta habilidade e emerge. Ele continua atacando usando seus outros quatro tentáculos e sua mordida."
        }
    ],
    "equipment": null,
    "treasure": "Dobro, 1d6 peças de pena de kraken (CD 34 para extrair) e 2d4 postas de kraken (CD 34 para extrair, cada posta vale T$ 20 para preparar um sashimi de kraken).",
    "skillsText": "Atletismo +35, Diplomacia +27, Enganação +27, Intimidação +27.",
    "role": "solo",
    "roleSource": "pdf-review"
};

const iniciadaDeSszzaas = {
    "id": "iniciada-de-sszzaas",
    "name": "Iniciada de Sszzaas",
    "type": "monster",
    "subtype": "medusa",
    "size": "Médio",
    "challengeRating": 3,
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "bookPage": 326,
        "pdfPage": 328,
        "bookPageEnd": 327,
        "pdfPageEnd": 329
    },
    "stats": {
        "initiative": 7,
        "perception": 7,
        "defense": 19,
        "fortitude": 3,
        "reflex": 9,
        "will": 15,
        "hitPoints": 69,
        "speedText": "9m (6q)",
        "senses": "visão no escuro",
        "defensesText": "resistência a veneno +5",
        "attributes": {
            "str": 0,
            "dex": 2,
            "con": 0,
            "int": 4,
            "wis": 3,
            "cha": 4
        },
        "manaPoints": 19
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Adaga +12 (1d4+3, 19, mais veneno)."
        }
    ],
    "abilities": [
        {
            "name": "Ataque Furtivo",
            "timing": null,
            "text": "+2d6."
        },
        {
            "name": "Falso Amigo",
            "timing": null,
            "text": "Médico iniciante. Sob essa identidade, pode atuar como o parceiro indicado e recebe +10 em Enganação para manter o disfarce e em Vontade contra efeitos que possam revelar sua identidade. Veja Ameaças de Arton, p. 327."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como uma clériga de Sszzaas de 3º nível (CD 19)."
        },
        {
            "name": "Arma Mágica",
            "timing": "padrão",
            "text": "Até o fim da cena, uma arma adjacente se torna mágica, fornecendo +1 nos testes de ataque e rolagens de dano e +1d6 pontos de dano de fogo. A iniciada usa Sabedoria em vez de Força nos testes de ataque com ela (ataque total +16).",
            "cost": "3 PM"
        },
        {
            "name": "Comando",
            "timing": "padrão",
            "text": "No início do seu próximo turno, uma criatura em alcance curto fica pasma por 1 rodada (Von evita). Este efeito só pode ser usado uma vez por cena contra uma mesma criatura.",
            "cost": "2 PM"
        },
        {
            "name": "Curar Ferimentos",
            "timing": "padrão",
            "text": "Uma criatura adjacente cura 4d8+4 PV.",
            "cost": "3 PM"
        },
        {
            "name": "Escuridão",
            "timing": "padrão",
            "text": "Até o fim da cena, um objeto em alcance curto emana escuridão total em um raio de 6m, bloqueando a visão na área e através dela.",
            "cost": "3 PM"
        },
        {
            "name": "Olhar Atordoante",
            "timing": "movimento",
            "text": "Uma criatura em alcance curto fica atordoada por 1 rodada (apenas uma vez por cena; Fort CD 19 evita)."
        },
        {
            "name": "Veneno",
            "timing": null,
            "text": "Perde 1d12 pontos de vida."
        }
    ],
    "equipment": "Adaga, couro batido, símbolo sagrado de Sszzaas.",
    "treasure": "Padrão.",
    "skillsText": "Enganação +20, Intuição +20, Religião +17.",
    "role": "special",
    "roleSource": "pdf-review"
};

const cultistaDeSszzaasAmeacasDeArton = {
    "variantOf": "cultista-de-sszzaas",
    "id": "cultista-de-sszzaas-ameacas-de-arton",
    "name": "Cultista de Sszzaas",
    "type": "monster",
    "subtype": "medusa",
    "size": "Médio",
    "challengeRating": 7,
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "bookPage": 327,
        "pdfPage": 329
    },
    "stats": {
        "initiative": 11,
        "perception": 12,
        "defense": 29,
        "fortitude": 7,
        "reflex": 14,
        "will": 20,
        "hitPoints": 160,
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
        },
        "manaPoints": 40
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Adaga +22 (1d4+4, 19, mais veneno)."
        }
    ],
    "abilities": [
        {
            "name": "Ataque Furtivo",
            "timing": null,
            "text": "+5d6."
        },
        {
            "name": "Falso Amigo",
            "timing": null,
            "text": "Médico veterano. Sob essa identidade, pode atuar como o parceiro indicado e recebe +10 em Enganação para manter o disfarce e em Vontade contra efeitos que possam revelar sua identidade. Veja Ameaças de Arton, p. 327."
        },
        {
            "name": "Olhar Atordoante",
            "timing": "movimento",
            "text": "Uma criatura em alcance curto fica atordoada por 1 rodada (apenas uma vez por cena; Fort CD 26 evita)."
        },
        {
            "name": "Veneno",
            "timing": null,
            "text": "Perde 2d12 pontos de vida durante 3 rodadas (Fort CD 26 reduz para 1 rodada)."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como uma clériga de Sszzaas de 7º nível (CD 26)."
        },
        {
            "name": "Arma Mágica",
            "timing": "padrão",
            "text": "Até o fim da cena, uma arma adjacente se torna mágica, fornecendo +2 nos testes de ataque e rolagens de dano e +1d6 pontos de dano de fogo. A cultista usa Sabedoria em vez de Força nos testes de ataque com ela (ataque total +28).",
            "cost": "5 PM"
        },
        {
            "name": "Comando",
            "timing": "padrão",
            "text": "No início do seu próximo turno, três criatura em alcance curto ficam pasmas por 1 rodada (Von evita). Este efeito só pode ser usado uma vez por cena contra uma mesma criatura.",
            "cost": "6 PM"
        },
        {
            "name": "Curar Ferimentos",
            "timing": "padrão",
            "text": "Uma criatura adjacente cura 8d8+8 PV.",
            "cost": "7 PM"
        },
        {
            "name": "Escuridão",
            "timing": "padrão",
            "text": "Até o fim da cena, um objeto em alcance curto emana escuridão total em um raio de 6m, bloqueando a visão na área e através dela.",
            "cost": "5 PM"
        },
        {
            "name": "Enxame de Pestes",
            "timing": "completa",
            "text": "Um enxame de pequenos animais surge em alcance médio e ocupa um quadrado de 1,5m. No fim de cada um dos turnos da cultista, o enxame causa 4d12 pontos de dano de corte a qualquer criatura em seu espaço (Fort reduz à metade). A cultista pode gastar uma ação de movimento para mover o enxame 12m.",
            "cost": "7 PM, sustentada"
        },
        {
            "name": "Miasma Mefítico",
            "timing": "padrão",
            "text": "Cria uma nuvem com 6m de raio; criaturas na área sofrem 7d6 pontos de dano de ácido e ficam enjoadas por 1 rodada (Fort reduz à metade e evita a condição).",
            "cost": "7 PM"
        }
    ],
    "equipment": "Adaga certeira, couraça, escudo leve, símbolo sagrado de Sszzaas.",
    "treasure": "Padrão.",
    "skillsText": "Enganação +20, Intuição +20, Religião +17.",
    "role": "special",
    "roleSource": "pdf-review"
};

const gorgona = {
    "id": "gorgona",
    "name": "Górgona",
    "type": "monster",
    "subtype": "medusa",
    "size": "Médio",
    "challengeRating": 6,
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "bookPage": 329,
        "pdfPage": 331,
        "bookPageEnd": 330,
        "pdfPageEnd": 332
    },
    "stats": {
        "initiative": 16,
        "perception": 9,
        "defense": 26,
        "fortitude": 13,
        "reflex": 19,
        "will": 8,
        "hitPoints": 231,
        "speedText": "9m (6q)",
        "senses": "visão no escuro",
        "defensesText": "resistência a veneno +5",
        "attributes": {
            "str": 0,
            "dex": 4,
            "con": 1,
            "int": 1,
            "wis": 2,
            "cha": 3
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Espada curta +20 (1d6+15, 19, mais veneno)."
        },
        {
            "name": "À Distância",
            "text": "Arco longo +20 x2 (1d12+15, x3, mais veneno)."
        }
    ],
    "abilities": [
        {
            "name": "Disparo Preciso",
            "timing": null,
            "text": "A górgona pode fazer ataques à distância contra oponentes envolvidos em combate corpo a corpo sem sofrer a penalidade de –5 no teste de ataque."
        },
        {
            "name": "Olhar Petrificante",
            "timing": null,
            "text": "No início de seu turno, cada personagem em alcance curto da górgona deve fazer um teste de Reflexos (CD 22). Se passar, desvia o olhar. Se falhar, fica lento. Se já estiver lento, fica petrificado permanentemente. Um personagem pode fechar os olhos como uma reação para ficar imune a esta habilidade, mas sofrerá os efeitos de estar cego por 1 rodada. Efeitos que removem paralisia revertem a petrificação. Metamorfose."
        },
        {
            "name": "Veneno",
            "timing": null,
            "text": "Peçonha concentrada (perde 1d12 pontos de vida por rodada durante 3 rodadas, Fort CD 22 reduz para 1 rodada)."
        }
    ],
    "equipment": "Arco longo certeiro, espada curta, flechas x20.",
    "treasure": "Padrão mais 1d4 doses de peçonha concentrada.",
    "skillsText": "Enganação +13, Furtividade +14.",
    "role": "solo",
    "roleSource": "pdf-review"
};

const gorgonaMatriarca = {
    "id": "gorgona-matriarca",
    "name": "Górgona Matriarca",
    "type": "monster",
    "subtype": "medusa",
    "size": "Médio",
    "challengeRating": 14,
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "bookPage": 330,
        "pdfPage": 332
    },
    "stats": {
        "initiative": 22,
        "perception": 19,
        "defense": 43,
        "fortitude": 14,
        "reflex": 25,
        "will": 25,
        "hitPoints": 498,
        "speedText": "9m (6q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade às condições atordoada e enfeitiçada, resistência a magia +2, resistência a veneno +5",
        "attributes": {
            "str": 0,
            "dex": 4,
            "con": 3,
            "int": 2,
            "wis": 6,
            "cha": 4
        },
        "manaPoints": 89
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Espada curta +36 (1d6+20, 19, mais veneno)."
        }
    ],
    "abilities": [
        {
            "name": "Magia Acelerada",
            "timing": "livre",
            "text": "Uma vez por rodada, quando lança uma magia com execução de ação completa ou menor, a górgona matriarca muda a execução dela para livre.",
            "cost": "+4 PM"
        },
        {
            "name": "Olhar Petrificante",
            "timing": null,
            "text": "Como a górgona (veja acima), mas com CD 38."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como uma clériga de Sszzaas de 14º nível (CD 38)."
        },
        {
            "name": "Miasma Mefítico",
            "timing": "padrão",
            "text": "Criaturas em um raio de 6m em alcance médio sofrem 8d6 pontos de dano de ácido e ficam enjoadas por 1 rodada (Fort reduz o dano à metade e evita a condição).",
            "cost": "9 PM"
        },
        {
            "name": "Rogar Maldição",
            "timing": "padrão",
            "text": "A matriarca amaldiçoa uma criatura em alcance curto. O alvo fica esmorecido e não pode se comunicar ou lançar magias permanentemente (Fort reduz para 1 rodada).",
            "cost": "10 PM"
        },
        {
            "name": "Toque Vampírico",
            "timing": "padrão",
            "text": "A matriarca faz um ataque corpo a corpo. Se acertar, além do dano normal, causa 14d6 pontos de dano de trevas e recupera pontos de vida iguais à metade desse dano de trevas.",
            "cost": "13 PM"
        },
        {
            "name": "Visão da Verdade",
            "timing": "padrão",
            "text": "Até o fim da cena, a matriarca pode ver através de camuflagem e escuridão (normais e mágicas) e de efeitos de ilusão e transmutação (enxergando a verdade como formas translúcidas ou sobrepostas) e recebe +10 em testes de Intuição e Percepção.",
            "cost": "9 PM"
        },
        {
            "name": "Veneno",
            "timing": null,
            "text": "Beladona (paralisado por 3 rodadas, Fort CD 43 reduz para lento por 3 rodadas)."
        }
    ],
    "equipment": "Espada curta certeira.",
    "treasure": "Padrão mais 1d4 doses de beladona.",
    "skillsText": "Enganação +20, Furtividade +20, Intuição +19, Misticismo +15, Religião +19.",
    "role": "special",
    "roleSource": "pdf-review"
};

const arcanistaFinntroll = {
    "id": "arcanista-finntroll",
    "name": "Arcanista Finntroll",
    "type": "monster",
    "subtype": "finntroll",
    "size": "Médio",
    "challengeRating": 14,
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "bookPage": 338,
        "pdfPage": 340,
        "bookPageEnd": 339,
        "pdfPageEnd": 341
    },
    "stats": {
        "initiative": 17,
        "perception": 13,
        "defense": 43,
        "fortitude": 24,
        "reflex": 16,
        "will": 30,
        "hitPoints": 423,
        "speedText": "9m (6q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a ofuscado",
        "attributes": {
            "str": -2,
            "dex": 4,
            "con": 3,
            "int": 8,
            "wis": 2,
            "cha": 3
        },
        "manaPoints": 90
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Açoite finntroll +35 (1d8+2)."
        }
    ],
    "abilities": [
        {
            "name": "Conjurar Trolloides",
            "timing": "padrão",
            "text": "O arcanista finntroll invoca 2d4+1 trolloides em espaços desocupados em alcance curto. Os trolloides agem a partir da próxima rodada do arcanista e têm deslocamento 9m, For 5, Des 2, Defesa 25, 1 PV, são imunes a dano, exceto de ácido ou fogo, e falham automaticamente em qualquer teste de resistência ou oposto. O arcanista pode gastar uma ação de movimento para dar um dos seguintes comandos a qualquer número de trolloides. Eles desaparecem quando morrem ou no fim da cena e não agem sem receber uma ordem. Recarga (todos os trolloides foram destruídos). • Andar. Cada trolloide se move até 9m (6q). • Canalizar. A próxima magia que o arcanista lança tem como ponto de origem um trolloide a sua escolha, que é destruído após a magia ser lançada. • Esmagar. Cada trolloide causa 6d12 pontos de dano de impacto a uma criatura adjacente (Ref CD 40 reduz à metade). • Proteger. Cada trolloide adjacente ao arcanista fornece +2 nos testes de resistência e de manobras de combate dele neste turno.",
            "cost": "5 PM"
        },
        {
            "name": "Contramágica Nobre",
            "timing": "reação",
            "text": "Uma vez por rodada, quando vê uma magia ser conjurada, o arcanista faz uma contramágica. Se usar Dissipar Magia para isso, ele rola dois dados e usa o melhor resultado."
        },
        {
            "name": "Servidão Arcana",
            "timing": null,
            "text": "Quando o arcanista lança uma magia, todas as criaturas em alcance médio sofrem dano de essência igual ao dobro dos pontos de mana gastos na magia (Fort CD 40 reduz à metade). Para cada criatura que falhar neste teste, o arcanista recupera 3 PM (limitado ao custo da magia)."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como um mago de 17º nível (CD 40, limite de PM 25)."
        },
        {
            "name": "Campo de Força",
            "timing": "reação",
            "text": "Quando sofre dano, o arcanista recebe RD 50 contra esse dano.",
            "cost": "7 PM"
        },
        {
            "name": "Controlar a Gravidade",
            "timing": "padrão",
            "text": "O arcanista controla os efeitos da gravidade em um cubo de 12m em alcance médio (veja Tormenta20, p. 186).",
            "cost": "10 PM, sustentada"
        },
        {
            "name": "Dissipar Magia",
            "timing": "padrão",
            "text": "O arcanista escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias nesse alvo com CD igual ou menor que o resultado do teste são dissipadas.",
            "cost": "3 PM"
        },
        {
            "name": "Marionete",
            "timing": "padrão",
            "text": "O arcanista controla as ações físicas de uma criatura em alcance médio. Ao sofrer a magia, e no início de cada um de seus turnos, a vítima faz um teste de Fortitude. Se passar, a magia é anulada.",
            "cost": "10 PM, sustentada"
        },
        {
            "name": "Raio do Enfraquecimento",
            "timing": "padrão",
            "text": "Criaturas escolhidas em alcance curto ficam exaustas (Fort muda para fatigado).",
            "cost": "8 PM"
        },
        {
            "name": "Pele de Pedra",
            "timing": "padrão",
            "text": "Uma criatura adjacente é transformada em uma estátua de pedra sem consciência por 1d4 rodadas (Fort evita).",
            "cost": "10 PM"
        },
        {
            "name": "Toque da Morte",
            "timing": "padrão",
            "text": "Uma criatura em alcance curto sofre 10d8+10 pontos de dano de trevas. Se estiver com menos da metade de seus PV, em vez disso ela deve fazer um teste de Fortitude; se passar sofre o dano normal, caso contrário seus PV são reduzidos a –10.",
            "cost": "17 PM"
        },
        {
            "name": "Corpo Vegetal",
            "timing": null,
            "text": "O finntroll possui visão no escuro, cura acelerada 5/ácido ou fogo e natureza vegetal."
        },
        {
            "name": "Presença Arcana",
            "timing": null,
            "text": "O finntroll recebe +2 em Misticismo (já contabilizado) e resistência a magia +2."
        },
        {
            "name": "Intolerância a Luz",
            "timing": null,
            "text": "O finntroll possui sensibilidade a luz e perde acesso à cura acelerada quando exposto à luz do sol ou similar."
        }
    ],
    "equipment": "Açoite finntroll, bolsa de pó poderosa canalizadora, essência de mana x4, manto pesado, robe do arquimago.",
    "treasure": "Dobro.",
    "skillsText": "Conhecimento +19, Intimidação +14, Misticismo +21.",
    "role": "special",
    "roleSource": "pdf-review"
};

const defeituoso = {
    "id": "defeituoso",
    "name": "Defeituoso",
    "type": "monster",
    "subtype": null,
    "size": "Médio",
    "challengeRating": 6,
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "bookPage": 340,
        "pdfPage": 342
    },
    "stats": {
        "initiative": 8,
        "perception": 3,
        "defense": 26,
        "fortitude": 18,
        "reflex": 12,
        "will": 6,
        "hitPoints": 235,
        "speedText": "6m (4q)",
        "senses": "visão no escuro",
        "defensesText": "cura acelerada 15/especial",
        "attributes": {
            "str": 5,
            "dex": 3,
            "con": 2,
            "int": -3,
            "wis": 0,
            "cha": -2
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +19 (3d6+16)."
        }
    ],
    "abilities": [
        {
            "name": "Enxertos",
            "timing": null,
            "text": "Cada defeituoso possui três enxertos, modificações resultantes de experimentos. Para cada enxerto, role 1d6 na tabela abaixo (enxertos iguais são cumulativos). 1) Cabeça Extra. O defeituoso recebe um ataque de mordida extra e +5 em Percepção e Vontade. 2) Carapaça. O defeituoso recebe RD 5 e +2 na Defesa. 3) Garra. O defeituoso recebe um ataque de garra (ataque +19, dano 2d10+12). Se receber um segundo ataque de garra, recebe também Dilacerar (se acerta os dois ataques de garra em uma mesma criatura no mesmo turno, causa mais 1d10+6 pontos de dano). 4) Músculos Enxertados. O defeituoso recebe +2 em testes de ataque e rolagens de dano. 5) Pólipos (Movimento). Uma vez por cena, o defeituoso expele uma nuvem de pólipos venenosos. Criaturas em um raio de 9m ao redor dele perdem 4d12 PV e ficam enjoadas por veneno por 1 rodada (Fort CD 22 reduz a perda de vida à metade e evita a condição). Cada enxerto adicional permite usar esta habilidade mais uma vez na mesma cena. 6) Sumidouro Místico. O defeituoso recebe resistência a magia +2 e, sempre que ele acerta um ataque corpo a corpo, a vítima perde 2 PM."
        },
        {
            "name": "Recordações de Dor",
            "timing": "reação",
            "text": "Quando sofre dano pela primeira vez em cada rodada, o defeituoso faz um ataque de mordida contra um oponente adjacente."
        },
        {
            "name": "Regeneração Experimental",
            "timing": null,
            "text": "Cada defeituoso é suscetível a um tipo específico de energia, contra a qual sua cura acelerada não funciona. Role 1d6 para determinar essa energia: 1) ácido; 2) eletricidade; 3) fogo; 4) frio; 5) luz; 6) trevas. A cada enxerto de cabeça extra, role um tipo de energia adicional."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": "Sobrevivência +6.",
    "role": "solo",
    "roleSource": "pdf-review"
};

const mycotannLabutador = {
    "id": "mycotann-labutador",
    "name": "Mycotann Labutador",
    "type": "monster",
    "subtype": "mycotann",
    "size": "Médio",
    "challengeRating": 2,
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "bookPage": 341,
        "pdfPage": 343
    },
    "stats": {
        "initiative": 2,
        "perception": 7,
        "defense": 17,
        "fortitude": 13,
        "reflex": 7,
        "will": 2,
        "hitPoints": 15,
        "speedText": "6m (4q)",
        "senses": "visão no escuro",
        "defensesText": "natureza vegetal",
        "attributes": {
            "str": 1,
            "dex": 0,
            "con": 3,
            "int": 0,
            "wis": -1,
            "cha": 1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Duas pancadas +12 (1d6+6)."
        }
    ],
    "abilities": [
        {
            "name": "Esporos",
            "timing": "padrão",
            "text": "O mycotann labutador dispara uma nuvem de esporos em uma criatura em alcance curto. O alvo fica enredado ou, se já estiver enredado por este efeito, fica paralisado por 1 rodada (Fort CD 16 evita)."
        },
        {
            "name": "Telepatia",
            "timing": null,
            "text": "O mycotann pode se comunicar telepaticamente com qualquer criatura viva em alcance médio."
        }
    ],
    "equipment": null,
    "treasure": "1d4 doses de esporos de cogumelo (CD 17 para extrair).",
    "skillsText": null,
    "role": "minion",
    "roleSource": "pdf-review"
};

const mycotannDruida = {
    "id": "mycotann-druida",
    "name": "Mycotann Druida",
    "type": "monster",
    "subtype": "mycotann",
    "size": "Médio",
    "challengeRating": 5,
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "bookPage": 341,
        "pdfPage": 343
    },
    "stats": {
        "initiative": 10,
        "perception": 15,
        "defense": 22,
        "fortitude": 11,
        "reflex": 5,
        "will": 17,
        "hitPoints": 143,
        "speedText": "6m (4q)",
        "senses": "visão no escuro",
        "defensesText": "natureza vegetal",
        "attributes": {
            "str": 1,
            "dex": 0,
            "con": 3,
            "int": 0,
            "wis": 4,
            "cha": 1
        },
        "manaPoints": 28
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Duas pancadas +15 (1d6+8)."
        }
    ],
    "abilities": [
        {
            "name": "Esporos",
            "timing": "padrão",
            "text": "O mycotann druida dispara uma nuvem de esporos que atinge uma criatura em alcance curto. O alvo fica enredado ou, se já estiver enredado por este efeito, em vez disso fica paralisado (Fort CD 22 evita). Veneno."
        },
        {
            "name": "Telepatia",
            "timing": null,
            "text": "O mycotann pode se comunicar telepaticamente com qualquer criatura viva em alcance médio."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como um druida de Allihanna de 5º nível (CD 22), sem precisar falar."
        },
        {
            "name": "Controlar Plantas",
            "timing": "padrão",
            "text": "Um quadrado de 9m de vegetação em alcance curto se torna terreno difícil. Criaturas na área quando a magia é lançada ou no início de seus próprios turnos ficam enredadas e imóveis (Fort evita). Uma vítima pode se libertar com uma ação padrão e um teste de Acrobacia ou Atletismo.",
            "cost": "2 PM"
        },
        {
            "name": "Curar Ferimentos",
            "timing": "padrão",
            "text": "Uma criatura adjacente cura 6d8+6 PV.",
            "cost": "5 PM"
        },
        {
            "name": "Raio Solar",
            "timing": "padrão",
            "text": "Criaturas em uma linha de 30m sofrem 5d8 pontos de dano de luz (ou 5d12, se forem mortos-vivos) e ficam ofuscadas por 1 rodada (Ref reduz à metade e evita a condição).",
            "cost": "5 PM"
        }
    ],
    "equipment": "Símbolo sagrado de Allihanna.",
    "treasure": "Metade mais 1d4 doses de esporos de cogumelo (CD 20 para extrair).",
    "skillsText": "Religião +8, Sobrevivência +10.",
    "role": "special",
    "roleSource": "pdf-review"
};

const hordaMycotann = {
    "id": "horda-mycotann",
    "name": "Horda Mycotann",
    "type": "monster",
    "subtype": "mycotann",
    "size": "Enorme",
    "challengeRating": 12,
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "bookPage": 341,
        "pdfPage": 343
    },
    "stats": {
        "initiative": 14,
        "perception": 17,
        "defense": 33,
        "fortitude": 23,
        "reflex": 14,
        "will": 13,
        "hitPoints": 612,
        "speedText": "6m (4q)",
        "senses": "visão no escuro",
        "defensesText": "natureza vegetal",
        "attributes": {
            "str": 2,
            "dex": -1,
            "con": 3,
            "int": 1,
            "wis": 0,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Enxame",
            "text": "8d12 pontos de dano de impacto."
        }
    ],
    "abilities": [
        {
            "name": "Esporos",
            "timing": "padrão",
            "text": "A horda dispara esporos em uma nuvem de 3m de raio em alcance médio. Criaturas na área ficam paralisadas por 1d4 rodadas (apenas uma vez por cena) e perdem 6d6 PV (Fort CD 32 reduz à metade e evita a condição)."
        },
        {
            "name": "Telepatia",
            "timing": null,
            "text": "A horda pode se comunicar telepaticamente com qualquer criatura viva em alcance médio."
        },
        {
            "name": "Véu de Esporos",
            "timing": null,
            "text": "Uma criatura que comece seu turno dentro do espaço ocupado pela horda fica enjoada e enredada (Fort CD 32 evita). Veneno."
        }
    ],
    "equipment": null,
    "treasure": "2d4 doses de esporos de cogumelo (CD 27 para extrair).",
    "skillsText": "Atletismo +15.",
    "role": "solo",
    "roleSource": "pdf-review"
};

const finntrollCacadorAmeacasDeArton = {
    "variantOf": "finntroll-cacador",
    "id": "finntroll-cacador-ameacas-de-arton",
    "name": "Finntroll Caçador",
    "type": "monster",
    "subtype": "finntroll",
    "size": "Médio",
    "challengeRating": 2,
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "bookPage": 342,
        "pdfPage": 344
    },
    "stats": {
        "initiative": 7,
        "perception": 7,
        "defense": 19,
        "fortitude": 6,
        "reflex": 12,
        "will": 4,
        "hitPoints": 65,
        "speedText": "9m (6q)",
        "senses": "visão no escuro",
        "defensesText": null,
        "attributes": {
            "str": 2,
            "dex": 3,
            "con": 3,
            "int": 2,
            "wis": 2,
            "cha": -1
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Duas cimitarras +12 (1d6+5, 18)."
        },
        {
            "name": "À Distância",
            "text": "Besta pesada +12 (1d12+4, 19) ou rede +12 (agarrar)."
        }
    ],
    "abilities": [
        {
            "name": "Marca da Presa",
            "timing": "movimento",
            "text": "O finntroll caçador analisa uma criatura em alcance curto. Até o fim da cena, recebe +1d8 em rolagens de dano contra essa criatura (esse bônus é dobrado se a criatura for um anão, elfo ou humano)."
        },
        {
            "name": "Corpo Vegetal",
            "timing": null,
            "text": "O finntroll possui visão no escuro, cura acelerada 5/ácido ou fogo e natureza vegetal."
        },
        {
            "name": "Presença Arcana",
            "timing": null,
            "text": "O finntroll recebe +2 em Misticismo (já contabilizado) e resistência a magia +2."
        },
        {
            "name": "Intolerância a Luz",
            "timing": null,
            "text": "O finntroll possui sensibilidade a luz e perde acesso à cura acelerada quando exposto à luz do sol ou similar."
        }
    ],
    "equipment": "Besta pesada, cimitarra x2, rede, virotes x20.",
    "treasure": "Padrão.",
    "skillsText": "Furtividade +8, Sobrevivência +7.",
    "role": "solo",
    "roleSource": "pdf-review"
};

const finntrollFeitorAmeacasDeArton = {
    "variantOf": "finntroll-feitor",
    "id": "finntroll-feitor-ameacas-de-arton",
    "name": "Finntroll Feitor",
    "type": "monster",
    "subtype": "finntroll",
    "size": "Médio",
    "challengeRating": 6,
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "bookPage": 342,
        "pdfPage": 344
    },
    "stats": {
        "initiative": 9,
        "perception": 5,
        "defense": 20,
        "fortitude": 8,
        "reflex": 12,
        "will": 16,
        "hitPoints": 155,
        "speedText": "9m (6q)",
        "senses": "visão no escuro",
        "defensesText": null,
        "attributes": {
            "str": 0,
            "dex": 3,
            "con": 3,
            "int": 4,
            "wis": 0,
            "cha": 2
        },
        "manaPoints": 35
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Chicote +18 (1d3+10, 19)."
        }
    ],
    "abilities": [
        {
            "name": "Açoitar",
            "timing": "padrão",
            "text": "No próximo turno de cada aliado do finntroll em alcance médio, esse aliado recebe uma ação de movimento extra e +2 em testes de ataque e rolagens de dano."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como um mago de 6º nível (CD 26, 28 para encantamento*, limite de PM 6)."
        },
        {
            "name": "Adaga Mental*",
            "timing": "padrão",
            "text": "Uma criatura em alcance curto sofre 4d6 pontos de dano psíquico e fica atordoada por 1 rodada (Von reduz o dano à metade e evita a condição). Uma criatura só pode ser atordoada por esta magia uma vez por cena.",
            "cost": "5 PM"
        },
        {
            "name": "Armadura Arcana",
            "timing": "padrão",
            "text": "O finntroll recebe +5 na Defesa por um dia.",
            "cost": "3 PM"
        },
        {
            "name": "Armadura Arcana",
            "timing": "reação",
            "text": "Quando sofre um ataque, o finntroll recebe +5 na Defesa contra este ataque.",
            "cost": "2 PM"
        },
        {
            "name": "Desespero Esmagador*",
            "timing": "padrão",
            "text": "O finntroll projeta uma onda de desespero em um cone de 6m. Criaturas na área ficam fracas e frustradas até o fim da cena (Von reduz para 1 rodada).",
            "cost": "6 PM"
        },
        {
            "name": "Enfeitiçar*",
            "timing": "padrão",
            "text": "Cada humanoide em alcance curto fica enfeitiçado pelo finntroll, ou até o finntroll ou um de seus aliados tomar uma ação hostil contra a criatura.",
            "cost": "6 PM"
        },
        {
            "name": "Marca da Obediência*",
            "timing": "padrão",
            "text": "O finntroll ordena que uma criatura adjacente não ataque a ele ou a seus aliados até o fim da cena (Von evita). A criatura pode repetir o teste de Vontade em cada um de seus turnos subsequentes.",
            "cost": "3 PM"
        },
        {
            "name": "Relâmpago",
            "timing": "padrão",
            "text": "O finntroll causa 8d6 pontos de dano de eletricidade em todas as criaturas em uma linha de 30m (Ref reduz à metade).",
            "cost": "5 PM"
        },
        {
            "name": "Corpo Vegetal",
            "timing": null,
            "text": "O finntroll possui visão no escuro, cura acelerada 5/ácido ou fogo e natureza vegetal."
        },
        {
            "name": "Presença Arcana",
            "timing": null,
            "text": "O finntroll recebe +2 em Misticismo (já contabilizado) e resistência a magia +2."
        },
        {
            "name": "Intolerância a Luz",
            "timing": null,
            "text": "O finntroll possui sensibilidade a luz e perde acesso à cura acelerada quando exposto à luz do sol ou similar."
        }
    ],
    "equipment": "Chicote cruel.",
    "treasure": "Dobro.",
    "skillsText": "Intimidação +9, Misticismo +11.",
    "role": "special",
    "roleSource": "pdf-review"
};

const finntrollSenhorDeEstabulo = {
    "id": "finntroll-senhor-de-estabulo",
    "name": "Finntroll Senhor de Estábulo",
    "type": "monster",
    "subtype": "finntroll",
    "size": "Médio",
    "challengeRating": 12,
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "bookPage": 342,
        "pdfPage": 344,
        "bookPageEnd": 343,
        "pdfPageEnd": 345
    },
    "stats": {
        "initiative": 12,
        "perception": 10,
        "defense": 39,
        "fortitude": 20,
        "reflex": 14,
        "will": 24,
        "hitPoints": 380,
        "speedText": "9m (6q)",
        "senses": "visão no escuro",
        "defensesText": null,
        "attributes": {
            "str": 0,
            "dex": 2,
            "con": 3,
            "int": 5,
            "wis": 0,
            "cha": 4
        },
        "manaPoints": 68
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Açoite finntroll +33 (1d8+12, 19)."
        }
    ],
    "abilities": [
        {
            "name": "Abrir os Viveiros",
            "timing": "completa",
            "text": "O finntroll senhor de estábulo convoca 1d3+1 trolls (veja Tormenta20, p. 308), que surgem em espaços desocupados em alcance curto. Os trolls estão sob controle do finntroll, agem no turno dele a partir da rodada seguinte e não rendem recompensas se forem derrotados.",
            "magical": true
        },
        {
            "name": "Aura de Superioridade",
            "timing": "reação",
            "text": "Sempre que uma criatura inteligente tentar uma ação hostil contra o finntroll, deve fazer um teste de Vontade (CD 35). Caso falhe, a criatura perde a ação. O finntroll só pode usar esta habilidade uma vez por cena contra cada criatura."
        },
        {
            "name": "Palavras de Humilhação",
            "timing": "movimento",
            "text": "O finntroll faz um teste de Intimidação oposto ao teste de Vontade de uma criatura que ele tenha atingido com seu açoite neste turno. Se vencer, causa 8d6 pontos de dano psíquico não letal à criatura."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como um mago de 9º nível (CD 35)."
        },
        {
            "name": "Concentração de Combate",
            "timing": "padrão",
            "text": "Até o fim da cena, sempre que faz um ataque, o finntroll rola dois dados e usa o melhor resultado.",
            "cost": "3 PM"
        },
        {
            "name": "Dissipar Magia",
            "timing": "padrão",
            "text": "O finntroll escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias nesse alvo com CD igual ou menor que o resultado do teste são dissipadas.",
            "cost": "3 PM"
        },
        {
            "name": "Enfeitiçar*",
            "timing": "padrão",
            "text": "Cada humanoide em alcance curto fica enfeitiçado pelo finntroll até o fim da cena, ou até o finntroll ou um de seus aliados tomar uma ação hostil contra a criatura.",
            "cost": "6 PM"
        },
        {
            "name": "Pele de Pedra",
            "timing": "padrão",
            "text": "O finntroll recebe redução de dano 5 até o fim da cena.",
            "cost": "6 PM"
        },
        {
            "name": "Toque Chocante",
            "timing": "padrão",
            "text": "O finntroll faz um ataque corpo a corpo. Se acertar, além do dano normal, causa 8d8+8 pontos de dano de eletricidade.",
            "cost": "9 PM"
        },
        {
            "name": "Velocidade",
            "timing": "padrão",
            "text": "O finntroll pode executar uma ação padrão adicional por turno, que não pode ser usada para lançar magias.",
            "cost": "3 PM, sustentada"
        },
        {
            "name": "Corpo Vegetal",
            "timing": null,
            "text": "O finntroll possui visão no escuro, cura acelerada 5/ácido ou fogo e natureza vegetal."
        },
        {
            "name": "Presença Arcana",
            "timing": null,
            "text": "O finntroll recebe +2 em Misticismo (já contabilizado) e resistência a magia +2."
        },
        {
            "name": "Intolerância a Luz",
            "timing": null,
            "text": "O finntroll possui sensibilidade a luz e perde acesso à cura acelerada quando exposto à luz do sol ou similar."
        }
    ],
    "equipment": "Açoite finntroll macabro, manto pesado.",
    "treasure": "Dobro.",
    "skillsText": "Intimidação +18, Intuição +12, Misticismo +17.",
    "role": "special",
    "roleSource": "pdf-review"
};

const cavaleiroFinntroll = {
    "id": "cavaleiro-finntroll",
    "name": "Cavaleiro Finntroll",
    "type": "monster",
    "subtype": "finntroll",
    "size": "Médio",
    "challengeRating": 7,
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "bookPage": 345,
        "pdfPage": 347
    },
    "stats": {
        "initiative": 9,
        "perception": 7,
        "defense": 30,
        "fortitude": 14,
        "reflex": 7,
        "will": 20,
        "hitPoints": 252,
        "speedText": "9m (6q)",
        "senses": "visão no escuro",
        "defensesText": null,
        "attributes": {
            "str": 1,
            "dex": 2,
            "con": 3,
            "int": 4,
            "wis": 0,
            "cha": 2
        },
        "manaPoints": 39
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Açoite finntroll +22 (4d4+12, 19)."
        }
    ],
    "abilities": [
        {
            "name": "Corcel Troll",
            "timing": null,
            "text": "O cavaleiro finntroll cavalga um troll treinado, um parceiro montaria Grande. Enquanto estiver montado, seu deslocamento se torna 12m, ele recebe uma ação de movimento extra (apenas para se deslocar), os seguintes ataques (em adição ao seu açoite) e Dilacerar. • Corpo a Corpo. Mordida +22 (1d8+12) e duas garras +22 (2d6+12). • Dilacerar. Se o cavaleiro acerta os dois ataques de garra em uma mesma criatura no mesmo turno, causa mais 4d6+12 pontos de dano."
        },
        {
            "name": "Investida Atroz",
            "timing": "completa",
            "text": "O cavaleiro faz uma investida e ataca com seu açoite e todos os ataques de sua montaria. Todos os ataques recebem o bônus de +2 da investida, mas devem ser feitos contra o mesmo personagem."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como um mago de 7º nível (CD 26). Ele pode lançar magias enquanto montado sem precisar de testes de concentração."
        },
        {
            "name": "Amedrontar",
            "timing": "padrão",
            "text": "Um animal ou humanoide em alcance curto fica apavorado por 1d4+1 rodadas e depois abalado (Von reduz para abalado por 1d4 rodadas).",
            "cost": "3 PM"
        },
        {
            "name": "Concentração de Combate",
            "timing": "padrão",
            "text": "Até o fim da cena, sempre que faz um ataque, o cavaleiro rola dois dados e usa o melhor resultado.",
            "cost": "3 PM"
        },
        {
            "name": "Desespero Esmagador",
            "timing": "padrão",
            "text": "Criaturas num cone de 6m ficam fracas e frustradas (Von reduz para 1 rodada).",
            "cost": "6 PM"
        },
        {
            "name": "Primor Atlético",
            "timing": "movimento",
            "text": "O cavaleiro salta e pousa em alcance corpo a corpo de uma criatura em alcance curto. Se fizer um ataque corpo a corpo contra essa criatura no mesmo turno, recebe os benefícios e penalidades de uma investida e causa um dado extra de dano do mesmo tipo com este ataque.",
            "cost": "2 PM"
        },
        {
            "name": "Corpo Vegetal",
            "timing": null,
            "text": "O finntroll possui visão no escuro, cura acelerada 5/ácido ou fogo e natureza vegetal."
        },
        {
            "name": "Presença Arcana",
            "timing": null,
            "text": "O finntroll recebe +2 em Misticismo (já contabilizado) e resistência a magia +2."
        },
        {
            "name": "Intolerância a Luz",
            "timing": null,
            "text": "O finntroll possui sensibilidade a luz e perde acesso à cura acelerada quando exposto à luz do sol ou similar."
        }
    ],
    "equipment": "Açoite finntroll cruel, couraça, essência de mana x2, sela aprimorada.",
    "treasure": "Padrão.",
    "skillsText": "Cavalgar +12, Intimidação +11, Misticismo +13.",
    "role": "special",
    "roleSource": "pdf-review"
};

const sacerdoteFinntroll = {
    "id": "sacerdote-finntroll",
    "name": "Sacerdote Finntroll",
    "type": "monster",
    "subtype": "finntroll",
    "size": "Médio",
    "challengeRating": 6,
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "bookPage": 347,
        "pdfPage": 349
    },
    "stats": {
        "initiative": 9,
        "perception": 9,
        "defense": 25,
        "fortitude": 13,
        "reflex": 8,
        "will": 19,
        "hitPoints": 162,
        "speedText": "6m (6q)",
        "senses": "visão no escuro",
        "defensesText": null,
        "attributes": {
            "str": -1,
            "dex": 2,
            "con": 5,
            "int": 2,
            "wis": 4,
            "cha": 1
        },
        "manaPoints": 49
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Açoite finntroll +18 (1d8+6)."
        }
    ],
    "abilities": [
        {
            "name": "Urro Divino",
            "timing": "livre",
            "text": "Quando faz um ataque ou lança uma magia, o sacerdote finntroll soma sua Constituição à rolagem de dano desse ataque ou magia.",
            "cost": "1 PM"
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como um clérigo de Megalokk de 9º nível (CD 24, limite de PM 9)."
        },
        {
            "name": "Curar Ferimentos",
            "timing": "padrão",
            "text": "Uma criatura adjacente cura 10d8+10 PV ou criaturas escolhidas em alcance curto curam 5d8+5.",
            "cost": "9 PM"
        },
        {
            "name": "Comando",
            "timing": "padrão",
            "text": "No início do seu próximo turno, duas criaturas em alcance curto largam os itens que estão segurando e não podem pegá-los novamente até o início de seu turno seguinte (Von evita).",
            "cost": "4 PM"
        },
        {
            "name": "Enxame de Pestes",
            "timing": "completa",
            "text": "Dois enxames de ratos surgem em alcance médio e ocupam um quadrado de 1,5m cada. No fim de cada um dos turnos do sacerdote, cada enxame causa 2d12 pontos de dano de corte a qualquer criatura em seu espaço (Fort reduz à metade). O sacerdote pode gastar uma ação de movimento para mover cada enxame 12m.",
            "cost": "8 PM, sustentada"
        },
        {
            "name": "Miasma Mefítico",
            "timing": "padrão",
            "text": "Uma nuvem de 6m de raio se forma em alcance médio. Criaturas na área sofrem 6d6 pontos de dano de ácido e ficam enjoadas por 1 rodada (Fort reduz o dano à metade e evita a condição).",
            "cost": "5 PM"
        },
        {
            "name": "Perdição",
            "timing": "padrão",
            "text": "Criaturas escolhidas em alcance curto sofrem –3 em testes de ataque e rolagens de dano até o fim da cena.",
            "cost": "5 PM"
        },
        {
            "name": "Profanar",
            "timing": "padrão",
            "text": "Uma esfera de 9m em alcance longo se enche com energia negativa por 1 dia. Dentro dela, todo dano de trevas é maximizado.",
            "cost": "1 PM"
        },
        {
            "name": "Corpo Vegetal",
            "timing": null,
            "text": "O finntroll possui visão no escuro, cura acelerada 5/ácido ou fogo e natureza vegetal."
        },
        {
            "name": "Presença Arcana",
            "timing": null,
            "text": "O finntroll recebe +2 em Misticismo (já contabilizado) e resistência a magia +2."
        },
        {
            "name": "Intolerância a Luz",
            "timing": null,
            "text": "O finntroll possui sensibilidade a luz e perde acesso à cura acelerada quando exposto à luz do sol ou similar."
        }
    ],
    "equipment": "Açoite finntroll, manto pesado, meia armadura, símbolo sagrado de Megalokk.",
    "treasure": "Padrão.",
    "skillsText": "Atletismo +4, Intimidação +11, Religião +11.",
    "role": "special",
    "roleSource": "pdf-review"
};

const altoSacerdoteFinntroll = {
    "id": "alto-sacerdote-finntroll",
    "name": "Alto Sacerdote Finntroll",
    "type": "monster",
    "subtype": "finntroll",
    "size": "Médio",
    "challengeRating": 12,
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "bookPage": 347,
        "pdfPage": 349
    },
    "stats": {
        "initiative": 18,
        "perception": 17,
        "defense": 39,
        "fortitude": 19,
        "reflex": 11,
        "will": 27,
        "hitPoints": 413,
        "speedText": "6m (6q)",
        "senses": "visão no escuro",
        "defensesText": "imunidade a magia de adivinhação e encantamento, redução de dano 5",
        "attributes": {
            "str": -1,
            "dex": 3,
            "con": 6,
            "int": 2,
            "wis": 5,
            "cha": 1
        },
        "manaPoints": 77
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Adaga +27 (1d4+6)."
        }
    ],
    "abilities": [
        {
            "name": "Arrogância Divina",
            "timing": null,
            "text": "O alto sacerdote finntroll se considera a representação suprema da maior obra dos deuses. Criaturas que falhem em testes de resistência contra suas magias ficam frustradas."
        },
        {
            "name": "Magia Acelerada",
            "timing": "livre",
            "text": "Uma vez por rodada, quando lança uma magia com execução de ação completa ou menor, o alto sacerdote muda a execução dela para livre.",
            "cost": "+4 PM"
        },
        {
            "name": "Trevas Insidiosas",
            "timing": null,
            "text": "O alto sacerdote soma sua Sabedoria em suas rolagens de dano de magias de trevas (já contabilizado)."
        },
        {
            "name": "Magias",
            "timing": null,
            "text": "Como um clérigo de Tenebra de 15º nível (CD 35, limite de PM 15, –1 PM no custo de Toque Vampírico)."
        },
        {
            "name": "Curar Ferimentos",
            "timing": "padrão",
            "text": "Uma criatura adjacente cura 11d8+11 PV.",
            "cost": "10 PM"
        },
        {
            "name": "Ligação Sombria",
            "timing": "padrão",
            "text": "O alto sacerdote escolhe um alvo em alcance longo e cria uma conexão entre seu corpo e o desse alvo, deixando uma marca idêntica na pele de ambos. Enquanto a magia durar, sempre que ele sofrer qualquer dano ou condição, o alvo desta magia deve fazer um teste de Fortitude; se falhar, sofre o mesmo dano que o sacerdote ou recebe a mesma condição. A magia termina se o alvo chegar a 0 PV.",
            "cost": "10 PM"
        },
        {
            "name": "Pele de Pedra",
            "timing": "padrão",
            "text": "Uma criatura adjacente é transformada em uma estátua de pedra sem consciência por 1d4 rodadas (Fort evita).",
            "cost": "10 PM"
        },
        {
            "name": "Perdição",
            "timing": "padrão",
            "text": "Criaturas escolhidas em alcance curto sofrem –4 em testes de ataque e rolagens de dano.",
            "cost": "7 PM"
        },
        {
            "name": "Profanar",
            "timing": "padrão",
            "text": "Uma esfera de 9m em alcance longo se enche com energia negativa por 1 dia. Dentro dela, todo dano de trevas é maximizado.",
            "cost": "1 PM"
        },
        {
            "name": "Resistência a Energia",
            "timing": "padrão",
            "text": "Criaturas escolhidas em alcance curto recebem redução de ácido ou fogo 10 até o fim da cena.",
            "cost": "6 PM"
        },
        {
            "name": "Toque Vampírico",
            "timing": "padrão",
            "text": "O alto sacerdote faz um ataque corpo a corpo. Se acertar, além do dano normal, causa 8d6+5 pontos de dano de trevas (Fort reduz à metade) e recupera pontos de vida iguais à metade do dano de trevas causado.",
            "cost": "6 PM"
        },
        {
            "name": "Corpo Vegetal",
            "timing": null,
            "text": "O finntroll possui visão no escuro, cura acelerada 5/ácido ou fogo e natureza vegetal."
        },
        {
            "name": "Presença Arcana",
            "timing": null,
            "text": "O finntroll recebe +2 em Misticismo (já contabilizado) e resistência a magia +2."
        },
        {
            "name": "Intolerância a Luz",
            "timing": null,
            "text": "O finntroll possui sensibilidade a luz e perde acesso à cura acelerada quando exposto à luz do sol ou similar."
        }
    ],
    "equipment": "Adaga precisa, anel do escudo mental, manto pesado, meia armadura, símbolo sagrado de Tenebra.",
    "treasure": "Padrão.",
    "skillsText": "Conhecimento +17, Intimidação +16, Misticismo +17, Religião +20.",
    "role": "special",
    "roleSource": "pdf-review"
};

const vermeDoGeloLarva = {
    "id": "verme-do-gelo-larva",
    "name": "Verme do Gelo Larva",
    "type": "monster",
    "subtype": null,
    "size": "Enorme",
    "challengeRating": 10,
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "bookPage": 357,
        "pdfPage": 359
    },
    "stats": {
        "initiative": 10,
        "perception": 13,
        "defense": 36,
        "fortitude": 22,
        "reflex": 16,
        "will": 10,
        "hitPoints": 400,
        "speedText": "12m (8q), escavação 15m (10q)",
        "senses": "faro, percepção às cegas, visão no escuro",
        "defensesText": "imunidade a frio, redução de dano 5, vulnerabilidade a fogo",
        "attributes": {
            "str": 6,
            "dex": 1,
            "con": 4,
            "int": -5,
            "wis": 2,
            "cha": -3
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +29 (4d8+52 mais 4d6 frio)."
        }
    ],
    "abilities": [
        {
            "name": "Agarrar Aprimorado",
            "timing": "livre",
            "text": "Mordida (teste +34)."
        },
        {
            "name": "Engolir",
            "timing": "padrão",
            "text": "No início de cada um dos turnos do verme do gelo larva, a criatura engolida sofre 2d6+20 pontos de dano de impacto mais 4d6+10 pontos de dano de frio. Ela pode escapar causando um total de 25 pontos de dano a ele (Defesa 15, redução de dano 0)."
        },
        {
            "name": "Espasmo Mortal",
            "timing": null,
            "text": "Quando o verme é morto, seu corpo explode, fazendo com que estacas de gelo se projetem do chão em um raio de 6m. Criaturas nessa área sofrem 4d6 pontos de dano de corte mais 4d6 pontos de dano de frio e ficam caídas (Ref CD 30 evita). A área afetada se torna terreno difícil e concede cobertura leve para criaturas dentro dela. Causar dano de fogo mágico a qualquer parte dessa área destrói as estacas nos espaços correspondentes."
        },
        {
            "name": "Sopro Glacial",
            "timing": "padrão",
            "text": "Todas as criaturas em um cone de 12m sofrem 8d10 pontos de dano de frio e ficam lentas (Ref CD 30 reduz o dano à metade e evita a condição). Recarga (movimento)."
        }
    ],
    "equipment": null,
    "treasure": "2d4 doses de gelo extremo (CD 25 para extrair).",
    "skillsText": "Furtividade +5 (+20 no gelo).",
    "role": "solo",
    "roleSource": "pdf-review"
};

const vermeDoGeloAdulto = {
    "id": "verme-do-gelo-adulto",
    "name": "Verme do Gelo Adulto",
    "type": "monster",
    "subtype": null,
    "size": "Colossal",
    "challengeRating": 18,
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "bookPage": 357,
        "pdfPage": 359
    },
    "stats": {
        "initiative": 22,
        "perception": 19,
        "defense": 56,
        "fortitude": 32,
        "reflex": 26,
        "will": 18,
        "hitPoints": 1100,
        "speedText": "15m (10q), escavação 18m (12q)",
        "senses": "faro, percepção às cegas, visão no escuro",
        "defensesText": "imunidade a caído, encantamento e frio, redução de dano 10, vulnerabilidade a fogo",
        "attributes": {
            "str": 7,
            "dex": 3,
            "con": 5,
            "int": -5,
            "wis": 3,
            "cha": -4
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida +49 (10d12+100 mais 10d8 frio)."
        }
    ],
    "abilities": [
        {
            "name": "Agarrar Aprimorado",
            "timing": "livre",
            "text": "Mordida (teste +59)."
        },
        {
            "name": "Engolir",
            "timing": "padrão",
            "text": "No início de cada um dos turnos do verme de gelo adulto, a criatura engolida sofre 6d6+30 pontos de dano de impacto mais 4d6+40 pontos de dano de frio. Ela pode escapar causando um total de 200 pontos de dano a ele (Defesa 25, redução de dano 0)."
        },
        {
            "name": "Espasmo Mortal",
            "timing": null,
            "text": "Quando o verme é morto, seu corpo explode, fazendo com que estacas de gelo se projetem do chão em um raio de 6m. Criaturas nessa área sofrem 10d8 pontos de dano de corte mais 10d8 pontos de dano de frio e ficam caídas (Ref CD 47 evita). A área afetada se torna terreno difícil e concede cobertura leve para criaturas dentro dela. Causar dano de fogo mágico a qualquer parte dessa área destrói as estacas nos espaços correspondentes."
        },
        {
            "name": "Frio Extremo",
            "timing": null,
            "text": "O verme projeta uma aura de frio extremo que enfraquece todas as chamas em um raio de 9m. Nessa área, habilidades de fogo custam +1 PM para ser usadas e causam –1 ponto de dano por dado."
        },
        {
            "name": "Sopro Glacial",
            "timing": "padrão",
            "text": "Todas as criaturas em um cone de 12m sofrem 10d12 pontos de dano de frio e ficam lentas (Ref CD 47 reduz o dano à metade e evita a condição). Recarga (movimento)."
        }
    ],
    "equipment": null,
    "treasure": "Padrão mais 2d6 doses de gelo extremo (CD 33 para extrair).",
    "skillsText": "Furtividade +22 (+32 no gelo).",
    "role": "solo",
    "roleSource": "pdf-review"
};

const avatarDeMegalokkDeusesDeArton = {
    "id": "avatar-de-megalokk-deuses-de-arton",
    "name": "Avatar de Megalokk",
    "type": "monster",
    "subtype": "kaiju",
    "size": "Colossal",
    "challengeRating": 20,
    "source": {
        "book": "Deuses de Arton",
        "edition": "1ª edição, maio de 2025 (v1.1)",
        "pdfFile": "T20 Deuses de Arton.pdf",
        "bookPage": 191,
        "pdfPage": 193
    },
    "stats": {
        "initiative": 26,
        "perception": 27,
        "defense": 57,
        "fortitude": 40,
        "reflex": 29,
        "will": 18,
        "hitPoints": 1800,
        "speedText": "18m (12q), voo 12m (8q)",
        "senses": "visão no escuro, faro",
        "defensesText": "cura acelerada 100/kaiju, imunidade a efeitos de metabolismo e mentais, medo, metamorfose, paralisia e veneno, maior que a morte, redução de dano 50",
        "attributes": {
            "str": 18,
            "dex": 8,
            "con": 20,
            "int": 3,
            "wis": 6,
            "cha": 6
        }
    },
    "actions": [
        {
            "name": "Corpo a Corpo",
            "text": "Mordida x4 +54 (4d20+20, 17/x3) e duas garras +54 (2d20+20, 19/x3)."
        }
    ],
    "abilities": [
        {
            "name": "Agarrar Aprimorado",
            "timing": "livre",
            "text": "Mordida (teste +64)."
        },
        {
            "name": "Engolir",
            "timing": null,
            "text": "Se o Avatar de Megalokk começar seu turno agarrando uma criatura menor que ele, pode fazer um teste de agarrar contra ela. Se vencer, engole a criatura. Uma criatura engolida continua agarrada, fica cega, tem cobertura total contra efeitos vindos do lado de fora do Avatar (e vice-versa) e sofre 6d12+20 pontos de dano de impacto no início de cada turno do Avatar. O Avatar pode manter quantas criaturas engolidas quiser. Uma criatura engolida pode escapar causando 100 pontos de dano ao estômago do Avatar (Defesa 30). Isso faz com que ela seja regurgitada e fique caída na frente do monstro."
        },
        {
            "name": "Incontível",
            "timing": null,
            "text": "Sempre que falha em um teste de resistência contra um efeito com duração maior que instantânea, o Avatar pode fazer um novo teste contra esse efeito no início do seu próximo turno. A cada novo teste de resistência contra o mesmo efeito, o Avatar recebe um bônus cumulativo de +5 no teste."
        },
        {
            "name": "Presas Monstruosas",
            "timing": null,
            "text": "Cada vez que o Avatar acerta um ataque com suas Presas Monstruosas, ele gera um dos efeitos abaixo, definido aleatoriamente. 1) Basilisco A criatura atingida fica lenta (Fort CD 48 reduz a duração para 1 rodada). Caso uma criatura lenta dessa forma seja atingida novamente e falhe no teste de Fortitude, fica petrificada. 2) Dragão A criatura atingida sofre 4d12 pontos de dano fogo e sua armadura ou escudo (à escolha dela) fica avariado (Ref CD 48 reduz à metade e evita a condição). 3) Lobo Atroz A criatura atingida fica sangrando (Ref CD 48 evita). Esse sangramento causa a perda de 2d6 PV, em vez do normal. 4) Serpe O ataque inocula veneno de serpe divina."
        },
        {
            "name": "Presença Selvagem",
            "timing": null,
            "text": "O Avatar emana uma aura de violência de 30m de raio. No início de seus turnos, cada criatura nessa área deve fazer um teste de Vontade (CD 48). Se falhar, fica esmorecida. Se já estiver esmorecida, em vez disso entra em um frenesi selvagem por 1 rodada; em seu próximo turno, ela deve atacar a criatura mais próxima, mesmo que seja um aliado.",
            "magical": true
        },
        {
            "name": "Rasgar Montanhas",
            "timing": "completa",
            "text": "O Avatar desfere um golpe concentrado que atinge todas as criaturas em um cubo de 15m de lado adjacente a ele. Criaturas nessa área sofrem 10d20+70 pontos de dano de corte e ficam caídas (Ref CD 48 reduz à metade e evita a condição). Recarga (movimento)."
        },
        {
            "name": "Titânico",
            "timing": null,
            "text": "O Avatar é imune a manobras de combate, não pode ser flanqueado e sofre metade do dano de de efeitos que não sejam de outra criatura Titânica. Quando se move, pisoteia qualquer criatura ou objeto Enorme ou menor em seu caminho (atravessando seu espaço), causando 20d6 pontos de dano de impacto (uma vez por rodada por criatura, Ref CD 48 reduz à metade). Além disso, ele ignora redução de dano e seus ataques atingem todas as criaturas em um quadrado de 6m (para cada ataque, ele faz um único teste de ataque e compara o resultado com a Defesa de cada inimigo na área)."
        },
        {
            "name": "Veneno",
            "timing": null,
            "text": "Peçonha de Serpe Divina (fica fraco e perde 4d12 pontos de vida por rodada durante 10 rodadas, Fort CD 48 reduz para 1 rodada). Este veneno ignora qualquer imunidade a venenos."
        },
        {
            "name": "Maior que a Morte",
            "timing": null,
            "text": "Enquanto tiver pelo menos metade dos PV, o avatar é imune a efeitos de morte instantânea, inclusive os que aprisionam ou destroem seu corpo ou alma. Dano ou perda de PV ainda pode reduzi-lo a 0 PV ou menos."
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": "Atletismo +39, Intimidação +32, Sobrevivência +32.",
    "role": "solo",
    "roleSource": "pdf-review"
};

const rivalEspelho = {
    "id": "rival-espelho",
    "name": "Rival Espelho",
    "type": "???",
    "subtype": null,
    "size": null,
    "challengeRating": "?",
    "source": {
        "book": "Ameaças de Arton",
        "edition": "1ª edição, novembro de 2023",
        "pdfFile": "T20 Ameacas de Arton.pdf",
        "bookPage": 335,
        "pdfPage": 337
    },
    "stats": {
        "initiative": null,
        "perception": null,
        "defense": null,
        "fortitude": null,
        "reflex": null,
        "will": null,
        "hitPoints": null,
        "speedText": null,
        "senses": null,
        "defensesText": null,
        "attributes": null
    },
    "actions": [],
    "abilities": [
        {
            "name": "???",
            "timing": null,
            "text": "Um rival espelho possui as características e o ND do personagem que está copiando."
        },
        {
            "name": "Transferir Dor",
            "timing": null,
            "text": "Todo dano que o rival espelho sofre, bem como efeitos adicionais desse dano, é aplicado ao personagem que ele está copiando e não ao rival. Se o personagem copiado for reduzido a 0 PV ou menos, o rival desaparece após 1 rodada.",
            "magical": true
        }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": null,
    "role": null,
    "roleSource": "pdf-review"
};

// Versão de guardião das Ruínas Ciclópicas, elevada pela tabela solo do livro.
const senhoraDasEstatuas = {
    ...gorgona,
    id: "senhora-das-estatuas",
    name: "Senhora das Estátuas",
    regionalVariantOf: gorgona.id,
    challengeRating: 9,
    role: "solo",
    roleSource: "adaptacao-nd",
    source: { book: "Masmorra de Práxis" },
    description: [
        "A górgona vive entre as estátuas do trono há séculos. Cada guardião de pedra das ruínas foi, um dia, um visitante.",
        "Adaptação de Górgona, Ameaças de Arton p. 329–330: ND 9, PV 360, Defesa 34, Fortitude 15, Reflexos 21, Vontade 9, ataques +27, dano +31 e CD 28."
    ],
    stats: { ...gorgona.stats, hitPoints: 360, defense: 34, fortitude: 15, reflex: 21, will: 9 },
    actions: [
        { name: "Corpo a Corpo", text: "Espada curta +27 (1d6+31, 19, mais veneno)." },
        { name: "À Distância", text: "Arco longo +27 x2 (1d12+31, x3, mais veneno)." }
    ],
    abilities: gorgona.abilities.map(ability => ({ ...ability, text: ability.text.replaceAll("CD 22", "CD 28") }))
};

export const monsterCreatures = [
    rivalEspelho,
    avatarDeMegalokkDeusesDeArton,
    ...divineAspects.filter(aspect => aspect.type === "monster"),
    vermeDoGeloLarva, vermeDoGeloAdulto,
    arcanistaFinntroll, defeituoso, mycotannLabutador, mycotannDruida, hordaMycotann, finntrollCacadorAmeacasDeArton, finntrollFeitorAmeacasDeArton, finntrollSenhorDeEstabulo, cavaleiroFinntroll, sacerdoteFinntroll, altoSacerdoteFinntroll,
    iniciadaDeSszzaas, cultistaDeSszzaasAmeacasDeArton, gorgona, gorgonaMatriarca,
    canceronteDeGuerra, enguiaRainha, kraken,
    cerianthar, grandeTachygloss, oxxdon, oxxdonImenso, razzaKham, serpeAmeacasDeArton, serpeAncia, uraghianJovem, uraghianAdulto, kaiju,
    manticoraAmeacasDeArton, manticoraPrimal, otyughAmeacasDeArton, hordaDeOtyughs,
    // Manuais, Livro Básico e Ameaças de Arton
    glop, glooop, mamaeGlop, cockatrice,
    basilisk, bulette, tendriculo, aranhaGigante,
    aranhaMatriarca, manticora, centopeiasDragao, grifo,
    ursoCoruja, serpe, hidra, lagash,
    ganchador, troll, trollDasCavernas, dragaoFilhote,
    dragaoJovem, dragaoAdulto, dragaoVeneravel, dragaoRei,
    uktril, geraktril, reishid, reishidBasic, otyugh,
    thuwarokk, caoDeKally, koboldBruto, koboldMae,
    kaijinBruto, kaijinCapanga, kaijinNinja, altoClerigoDeKally,
    avatarDeKallyadranoch, corcelDeKally, kallyanachBarbaro, kallyanachMorteGlacial,
    dragaoAdultoDaTirania, dragaoAdultoDosSegredos, dragaoBicefalo, dragaoFeral,
    dragaoFilhoteDoBosque, dragaoFilhoteDosRios, dragaoJovemDaProtecao, dragaoJovemDoOcaso,
    dragaoVeneravelDaEquidade, dragaoVeneravelDosRecifes, ninhadaDeDragoesFilhotes, sckharDragaoReiDoFogo,
    aspectoDeAharadak, avatarDeAharadak, avatarDeAharadakDivine, fanaticoLefou, liderFanaticoLefou,
    reishidLiderDeCulto, senhorDoGiganteRubroFormaFinal, senhorDoGiganteRubroFormaInicial, zyrrinaz,
    sapoAtroz, trogAnaoBruto, trogAnaoEremita, trogCacador,
    trogCombatente, trogReiDosTuneis, arquibruxoDaTormenta, enxameInfernal,
    gatzvalithLordeDaTormenta, lefeuBurodron, lefeuEzzayn, lefeuHurobakk,
    lefeuMorgadrel, lefeuVeridak, carrascoDeLeena, ente,
    estirge, enxameEstirge, nuvemDeEstirges, feraVassalo,
    feraLider, feraMae, enxameLarval, koboldPatrulheiro,
    koboldVeterano, patrulhaKobold, koboldExplosivo, koboldXama,
    cocatrizReal, harpiaSaqueadora, mantor, quimera,
    mimico, mimicoMenor, corcelDoDeserto, tatuMontanha,
    tigreDeHyninn, tigreDeHyninnPrimordial, warg, homemPiranhaCapitao,
    mercenarioDeAslothia, escorpiaoDeCristal, centopeiaSolar, senhoraDasEstatuas
];
