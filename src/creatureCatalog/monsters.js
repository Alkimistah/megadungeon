// ─── Monstros manuais ─────────────────────────────────────────────────────────

export const glop = {
    id: "glop",
    name: "Glop",
    type: "monster",
    subtype: null,
    size: "Pequeno",
    challengeRating: 0.25,
    description: [],
    source: null,
    stats: {
        initiative: 0, perception: 0, defense: 10, fortitude: 0, reflex: 2, will: -5,
        hitPoints: 10,
        speedText: "9m (6q)",
        senses: "percepção às cegas",
        defensesText: "imunidade a ácido",
        attributes: { str: 0, dex: 0, con: 0, int: null, wis: -5, cha: -5 }
    },
    actions: [
        { name: "Corpo a Corpo", text: "Pancada +7 (1d4 mais 1d4 ácido)." }
    ],
    abilities: [],
    equipment: null,
    treasure: "Nenhum.",
    skillsText: null
};

export const glooop = {
    id: "glooop",
    name: "Glooop",
    type: "monster",
    subtype: null,
    size: "Grande",
    challengeRating: 2,
    description: [],
    source: null,
    stats: {
        initiative: 0, perception: -5, defense: 19, fortitude: 13, reflex: 7, will: 2,
        hitPoints: 68,
        speedText: "9m (6q)",
        senses: "percepção às cegas",
        defensesText: "imunidade a ácido",
        attributes: { str: 3, dex: -1, con: 2, int: -5, wis: -5, cha: -5 }
    },
    actions: [
        { name: "Pancada", text: "Corpo a Corpo Pancada +12 (2d6+3 mais 2d6 ácido)." }
    ],
    abilities: [
        { name: "Agarrar Aprimorado", timing: "livre", text: "Após acertar Pancada, faz teste +14 para agarrar." },
        { name: "Engolir", timing: "padrão", text: "No início de cada um dos turnos do glooop, a criatura engolida sofre 2d6+3 pontos de dano de impacto mais 2d6 pontos de dano de ácido. Ela pode escapar causando um total de 10 pontos de dano a ele." }
    ],
    equipment: null,
    treasure: "Padrão.",
    skillsText: null
};

export const mamaeGlop = {
    id: "mamae-glop",
    name: "Mamãe Glop",
    type: "monster",
    subtype: null,
    size: "Grande",
    challengeRating: 2,
    description: [],
    source: null,
    stats: {
        initiative: 2, perception: -1, defense: 17, fortitude: 13, reflex: 7, will: 2,
        hitPoints: 70,
        speedText: "9m (6q)",
        senses: "percepção às cegas",
        defensesText: "imunidade a ácido",
        attributes: { str: 2, dex: -1, con: 2, int: -5, wis: -5, cha: -3 }
    },
    actions: [
        { name: "Pancada", text: "Corpo a Corpo Pancada +12 (2d6+2 mais 2d6 ácido)." }
    ],
    abilities: [
        { name: "Glops Filhinhos", timing: "passiva", text: "A mamãe glop está sempre acompanhada por 1d4 glops, que a protegem instintivamente. Esses glops, assim como aqueles gerados pela Meiose Glópica, não rendem pontos de experiência." },
        { name: "Meiose Glópica", timing: "livre", text: "Quando ameaçada, a mamãe pode gerar outros glops filhinhos para protegê-la. No início de cada turno da mamãe, role um dado. Em resultado par, um glop surge em um espaço adjacente a ela. Ele age normalmente, no turno da mamãe, a partir da próxima rodada." }
    ],
    equipment: null,
    treasure: "Padrão.",
    skillsText: null
};

export const cockatrice = {
    id: "cocatriz",
    name: "Cocatriz",
    type: "monster",
    subtype: null,
    size: "Pequeno",
    challengeRating: 3,
    description: [],
    source: null,
    stats: {
        initiative: 10, perception: 4, defense: 22, fortitude: 9, reflex: 13, will: 5,
        hitPoints: 98,
        speedText: "6m (4q), voo 12m (8q)",
        senses: "visão no escuro",
        defensesText: "evasão",
        attributes: { str: 0, dex: 5, con: 1, int: -5, wis: 1, cha: -2 }
    },
    actions: [
        { name: "Bicada", text: "Corpo a Corpo Bicada +14 (2d4+8 perfuração)." }
    ],
    abilities: [
        { name: "Bicada Petrificante", timing: "passiva", text: "Uma criatura que sofra dano da bicada da cocatriz fica lenta (Fort CD 19 evita). Se já estiver lenta, fica petrificada permanentemente. Efeitos que removem paralisia revertem a petrificação." },
        { name: "Voo de Galinha", timing: "passiva", text: "A cocatriz só consegue percorrer curtas distâncias voando; ela sempre termina seu movimento sobre o chão ou outra superfície firme." },
        { name: "Parceiro", timing: "passiva", text: "A cocatriz é um parceiro especial adepto que fornece o benefício a seguir. Iniciante: suas habilidades mágicas que causam condições de movimento têm seu custo reduzido em -1 PM. Veterano: a CD para resistir a essas habilidades aumenta em +2. Mestre: a redução de custo se torna cumulativa com outras reduções." }
    ],
    equipment: null,
    treasure: "1d4-1 ovos de cocatriz; cada ovo permite preparar uma refeição coc-au-triz.",
    skillsText: null
};

export const basilisk = {
    id: "basilisco",
    name: "Basilisco",
    type: "monster",
    subtype: null,
    size: "Médio",
    challengeRating: 4,
    description: [
        "Lagartos venenosos com dois metros de comprimento, basiliscos possuem o terrível poder de transformar seres vivos em pedra com o olhar.",
        "Criaturas solitárias, vivem tanto em terra firme quanto na água."
    ],
    source: null,
    stats: {
        initiative: 6, perception: 5, defense: 23, fortitude: 10, reflex: 9, will: 9,
        hitPoints: 145,
        speedText: "9m (6q), natação 9m (6q)",
        senses: "visão no escuro",
        defensesText: "redução de dano 5",
        attributes: { str: 4, dex: 2, con: 4, int: -4, wis: 1, cha: 0 }
    },
    actions: [
        { name: "Mordida", text: "Corpo a Corpo Mordida +16 (2d8+12 mais veneno)." }
    ],
    abilities: [
        { name: "Olhar Petrificante", timing: "passiva", text: "No início de seu turno, cada personagem em alcance curto do basilisco deve fazer um teste de Reflexos CD 18. Se passar, desvia o olhar. Se falhar, fica lento. Se já estiver lento, fica petrificado permanentemente. Um personagem pode fechar os olhos como reação para ficar imune a esta habilidade, mas sofrerá os efeitos de estar cego por uma rodada. Efeitos que removem paralisia revertem a petrificação." },
        { name: "Veneno", timing: "passiva", text: "Peçonha concentrada: perde 1d12 pontos de vida por rodada durante 3 rodadas, Fortitude CD 18 reduz a duração para uma rodada." }
    ],
    equipment: null,
    treasure: "1d4 doses de peçonha concentrada (CD 19 para extrair), couro de basilisco (CD 19 para extrair, conta como TS 1.000 como matéria-prima para fabricar uma armadura superior).",
    skillsText: null
};

export const bulette = {
    id: "bulette",
    name: "Bulette",
    type: "monster",
    subtype: null,
    size: "Grande",
    challengeRating: 7,
    description: [],
    source: null,
    stats: {
        initiative: 9, perception: 8, defense: 32, fortitude: 20, reflex: 9, will: 12,
        hitPoints: 310,
        speedText: "9m (6q), escavação 12m (8q)",
        senses: "percepção às cegas (longo)",
        defensesText: "redução de dano 5",
        attributes: { str: 8, dex: 2, con: 5, int: -4, wis: 1, cha: -3 }
    },
    actions: [
        { name: "Mordida", text: "Corpo a Corpo Mordida +23 (3d8+24 mais 4d6 ácido)." }
    ],
    abilities: [
        { name: "Agarrar Aprimorado", timing: "livre", text: "Após acertar Mordida, faz teste +25 para agarrar." },
        { name: "Aura Cáustica", timing: "passiva", text: "No início de cada turno do bulette, todas as criaturas adjacentes sofrem 4d6 pontos de dano de ácido." },
        { name: "Engolir", timing: "padrão", text: "No início de cada um dos turnos do bulette, a criatura engolida sofre 2d8+12 pontos de dano de impacto mais 4d6 pontos de dano de ácido. Ela pode escapar causando 20 pontos de dano a ele." },
        { name: "Espreitador das Dunas", timing: "passiva", text: "Enquanto o bulette estiver nadando no solo, é muito difícil percebê-lo. Em vez do normal, a CD de Percepção para ouvir um bulette é 40, ou +20 em seu teste de Furtividade, o que for maior." },
        { name: "Parceiro", timing: "passiva", text: "O bulette é um parceiro montaria Grande. Iniciante: seu deslocamento muda para 9m (escavação 6m) e, uma vez por rodada, você recebe +1d6 em uma rolagem de dano corpo a corpo. Veterano: o bônus em rolagens de dano muda para +1d10. Mestre: o deslocamento de escavação muda para 12m e o bônus em rolagens de dano muda para +2d8." }
    ],
    equipment: null,
    treasure: "Duas peças de couro de bulette (CD 22 para extrair).",
    skillsText: null
};

export const tendriculo = {
    id: "tendriculo",
    name: "Tendrículo",
    type: "monster",
    subtype: null,
    size: "Grande",
    challengeRating: 6,
    description: [],
    source: null,
    stats: {
        initiative: 9, perception: 6, defense: 25, fortitude: 16, reflex: 8, will: 12,
        hitPoints: 210,
        speedText: "6m (4q)",
        senses: "visão no escuro",
        defensesText: "imunidade a sangramento e veneno, natureza vegetal",
        attributes: { str: 3, dex: 2, con: 2, int: -2, wis: 3, cha: -4 }
    },
    actions: [
        { name: "Mordida", text: "Corpo a Corpo Mordida +20 (2d6+10 mais veneno)." },
        { name: "Dois tentáculos", text: "Corpo a Corpo Dois tentáculos +24 (4d4+5)." }
    ],
    abilities: [
        { name: "Agarrar Aprimorado", timing: "livre", text: "Após acertar Tentáculo, faz teste +24 para agarrar." },
        { name: "Engolir", timing: "padrão", text: "No início de cada um dos turnos do tendrículo, a criatura engolida sofre 2d10+5 pontos de dano de impacto mais 2d10+5 pontos de dano de ácido. Ela pode escapar causando um total de 20 pontos de dano a ele. Enquanto tiver uma criatura engolida, o tendrículo ganha cura acelerada 20." },
        { name: "Veneno", timing: "passiva", text: "Essência de sombra: debilitado, Fort CD 22 reduz para fraco." }
    ],
    equipment: null,
    treasure: "1d4 doses de essência de sombra (CD 21 para extrair).",
    skillsText: "Furtividade +10 (+12 em florestas)"
};

// ─── Monstros do Livro Básico ─────────────────────────────────────────────────

export const aranhaGigante = {
    id: "aranha-gigante", name: "Aranha Gigante", type: "monster", subtype: null, size: "Grande", challengeRating: 2,
    description: [], source: { book: "Livro Básico", pdfPage: 2, bookPage: null },
    stats: { initiative: 7, perception: 3, defense: 19, fortitude: 8, reflex: 11, will: 3, hitPoints: 77, speedText: "12m (8q), escalar 12m (8q)", senses: null, defensesText: null, attributes: { str: 5, dex: 4, con: 1, int: -5, wis: 0, cha: -4 } },
    actions: [{ name: "Corpo a Corpo", text: "Mordida +12 (2d6+8 mais veneno)." }],
    abilities: [{ name: "Teia", timing: "padrão", text: " A aranha gigante dispara teia em um quadrado de 3m de lado em alcance curto. Criaturas na área ficam enredadas (Reflexos CD 18 evita). Uma criatura enredada pode se soltar com uma ação completa e um teste de Força ou Acrobacia (CD 20) ou cortando a teia (cada espaço de 1,5m de teia tem 5 PV e RD 5). Fogo queima a teia em duas rodadas (e liberta as criaturas), mas causa 1d6 pontos de dano de fogo por rodada a todas as criaturas nela. A aranha gigante também pode usar a teia para cobrir uma área quadrada com 6m de lado. Por sua semitransparência, a teia é difícil de ver (Percepção CD 20) até ser tarde demais. Uma criatura que entre na área fica enredada. A aranha pode andar na própria teia sem se enredar. Ela percebe automaticamente (como se tivesse percepção às cegas) qualquer criatura na teia" },
        {name:"Veneno",timing:null,text:"Condição fraco (Fort CD 18 evita)"}],
    equipment: null, treasure: "1d4 doses de veneno de aranha gigante (CD 17 para extrair, T$ 45 cada dose).", skillsText: null
};

export const manticora = {
    id: "manticora", name: "Mantícora", type: "monster", subtype: null, size: "Grande", challengeRating: 6,
    description: [], source: { book: "Livro Básico", pdfPage: 2, bookPage: null },
    stats: { initiative: 7, perception: 8, defense: 26, fortitude: 18, reflex: 7, will: 12, hitPoints: 240, speedText: "9m (6q), voo 15m (10q)", senses: null, defensesText: null, attributes: { str: 7, dex: 2, con: 5, int: -2, wis: 1, cha: -1 } },
    actions: [{ name: "Corpo a Corpo", text: "Mordida +18 (1d10+12) e duas garras +18 (1d8+12)." }],
    abilities: [], equipment: null, treasure: "Padrão mais espinhos (CD 21 para extrair). Os espinhos contam como T$ 150 em matéria-prima para fabricar flechas superiores.", skillsText: null
};

export const centopeiasDragao = {
    id: "centopeia-dragao", name: "Centopeia-dragão", type: "monster", subtype: null, size: "Enorme", challengeRating: 7,
    description: [], source: { book: "Livro Básico", pdfPage: 2, bookPage: null },
    stats: { initiative: 10, perception: 8, defense: 27, fortitude: 20, reflex: 14, will: 9, hitPoints: 275, speedText: "15m (10q), escavar 6m (4q)", senses: null, defensesText: null, attributes: { str: 11, dex: 3, con: 9, int: -4, wis: 1, cha: 0 } },
    actions: [{ name: "Corpo a Corpo", text: "Mordida +24 (2d8+18 mais 2d6 de fogo)." }],
    abilities: [], equipment: null, treasure: "2d4 doses de essência abissal (CD 22 para extrair).", skillsText: null
};

export const grifo = {
    id: "grifo", name: "Grifo", type: "monster", subtype: null, size: "Grande", challengeRating: 3,
    description: [], source: { book: "Livro Básico", pdfPage: 7, bookPage: null },
    stats: { initiative: 9, perception: 7, defense: 19, fortitude: 9, reflex: 15, will: 4, hitPoints: 110, speedText: "12m, voo 24m", senses: null, defensesText: null, attributes: { str: 5, dex: 4, con: 3, int: -4, wis: 2, cha: -1 } },
    actions: [{ name: "Corpo a Corpo", text: "Mordida +14 (2d6+5) e duas garras +14." }],
    abilities: [], equipment: null, treasure: "Um ninho de grifo tem 25% de chance de conter 1d4 ovos no valor de T$ 2.500 cada.", skillsText: null
};

export const ursoCoruja = {
    id: "urso-coruja", name: "Urso-Coruja", type: "monster", subtype: null, size: "Grande", challengeRating: 4,
    description: [], source: { book: "Livro Básico", pdfPage: 8, bookPage: null },
    stats: { initiative: 7, perception: 5, defense: 23, fortitude: 16, reflex: 10, will: 5, hitPoints: 145, speedText: "12m (8q)", senses: null, defensesText: null, attributes: { str: 7, dex: 3, con: 5, int: -4, wis: 1, cha: -2 } },
    actions: [{ name: "Corpo a Corpo", text: "Mordida +16 (1d8+5) e duas garras +15." }],
    abilities: [], equipment: null, treasure: "Nenhum.", skillsText: null
};

export const serpe = {
    id: "serpe", name: "Serpe", type: "monster", subtype: null, size: "Grande", challengeRating: 5,
    description: [], source: { book: "Livro Básico", pdfPage: 8, bookPage: null },
    stats: { initiative: 5, perception: 7, defense: 24, fortitude: 10, reflex: 16, will: 5, hitPoints: 200, speedText: "9m (6q), voo 18m (12q)", senses: null, defensesText: null, attributes: { str: 6, dex: 1, con: 6, int: -2, wis: 1, cha: -1 } },
    actions: [{ name: "Corpo a Corpo", text: "Mordida +17 (2d6+12) e ferrão +17 (1d8+12)." }],
    abilities: [], equipment: null, treasure: "1d4 doses de peçonha concentrada (CD 20 para extrair).", skillsText: null
};

export const hidra = {
    id: "hidra", name: "Hidra", type: "monster", subtype: null, size: "Enorme", challengeRating: 11,
    description: [], source: { book: "Livro Básico", pdfPage: 21, bookPage: null },
    stats: { initiative: 9, perception: 9, defense: 35, fortitude: 24, reflex: 18, will: 9, hitPoints: 550, speedText: "9m (6q), natação 9m (6q)", senses: null, defensesText: null, attributes: { str: 10, dex: 0, con: 10, int: -4, wis: 0, cha: -1 } },
    actions: [{ name: "Corpo a Corpo", text: "Cinco mordidas +34 (3d6+16)." }],
    abilities: [], equipment: null, treasure: "Padrão.", skillsText: null
};

export const lagash = {
    id: "lagash", name: "Lagash", type: "monster", subtype: null, size: "Enorme", challengeRating: 13,
    description: [], source: { book: "Livro Básico", pdfPage: 21, bookPage: null },
    stats: { initiative: 19, perception: 11, defense: 41, fortitude: 26, reflex: 20, will: 13, hitPoints: 660, speedText: "12m (8q), escalar 12m (8q), natação 12m (8q)", senses: null, defensesText: null, attributes: { str: 11, dex: 4, con: 9, int: -3, wis: 2, cha: -2 } },
    actions: [{ name: null, text: "Corpo a Corpo Mordida +37 (4d12+28 mais veneno)." }],
    abilities: [], equipment: null, treasure: "Padrão.", skillsText: null
};

export const ganchador = {
    id: "ganchador", name: "Ganchador", type: "monster", subtype: null, size: "Grande", challengeRating: 5,
    description: [], source: { book: "Livro Básico", pdfPage: 23, bookPage: null },
    stats: { initiative: 7, perception: 5, defense: 26, fortitude: 15, reflex: 11, will: 7, hitPoints: 210, speedText: "9m (6q), escalar 9m (6q)", senses: null, defensesText: null, attributes: { str: 6, dex: 3, con: 5, int: -2, wis: 1, cha: -2 } },
    actions: [{ name: null, text: "Corpo a Corpo Mordida +17 (2d6+8) e duas garras +17." }],
    abilities: [], equipment: null, treasure: "Metade mais duas garras (CD 20 para extrair; cada garra conta como T$ 500 em matéria-prima para fabricar armas de corte superiores).", skillsText: null
};

export const troll = {
    id: "troll", name: "Troll", type: "monster", subtype: null, size: "Grande", challengeRating: 5,
    description: [], source: { book: "Livro Básico", pdfPage: 23, bookPage: null },
    stats: { initiative: 4, perception: 3, defense: 23, fortitude: 14, reflex: 10, will: 6, hitPoints: 165, speedText: "9m (6q)", senses: null, defensesText: null, attributes: { str: 6, dex: 2, con: 6, int: -2, wis: -1, cha: -2 } },
    actions: [{ name: null, text: "Corpo a Corpo Mordida +17 (1d8+6) e duas garras +17." }],
    abilities: [], equipment: null, treasure: "Padrão.", skillsText: null
};

export const trollDasCavernas = {
    id: "troll-das-cavernas", name: "Troll das Cavernas", type: "monster", subtype: null, size: "Enorme", challengeRating: 9,
    description: [], source: { book: "Livro Básico", pdfPage: 24, bookPage: null },
    stats: { initiative: 7, perception: 14, defense: 29, fortitude: 21, reflex: 15, will: 9, hitPoints: 345, speedText: "12m (8q), escalar 9m (6q)", senses: null, defensesText: null, attributes: { str: 9, dex: 0, con: 11, int: -2, wis: -1, cha: -2 } },
    actions: [{ name: null, text: "Corpo a Corpo Tacape +26 (3d6+27) e mordida +26." }],
    abilities: [], equipment: "Tacape gigante.", treasure: "Metade.", skillsText: null
};

export const dragaoFilhote = {
    id: "dragao-filhote", name: "Dragão Filhote", type: "monster", subtype: "dragão", size: "Médio", challengeRating: 3,
    description: [], source: { book: "Livro Básico", pdfPage: 25, bookPage: null },
    stats: { initiative: 8, perception: 5, defense: 22, fortitude: 15, reflex: 3, will: 9, hitPoints: 140, speedText: "12m (8q), voo 18m (12q)", senses: null, defensesText: null, attributes: { str: 4, dex: 3, con: 3, int: 0, wis: 0, cha: 0 } },
    actions: [{ name: null, text: "Corpo a Corpo Mordida +15 (2d6+5) e duas garras +15." }],
    abilities: [], equipment: null, treasure: "Padrão.", skillsText: null
};

export const dragaoJovem = {
    id: "dragao-jovem", name: "Dragão Jovem", type: "monster", subtype: "dragão", size: "Grande", challengeRating: 7,
    description: [], source: { book: "Livro Básico", pdfPage: 25, bookPage: null },
    stats: { initiative: 11, perception: 11, defense: 32, fortitude: 20, reflex: 9, will: 12, hitPoints: 320, speedText: "12m (8q), voo 18m (12q)", senses: null, defensesText: null, attributes: { str: 7, dex: 2, con: 6, int: 2, wis: 2, cha: 2 } },
    actions: [{ name: null, text: "Corpo a Corpo Mordida +25 (2d6+14, 19) e duas garras." }],
    abilities: [], equipment: null, treasure: "Dobro e 2 peças de couro de dragão (CD 22 para extrair, veja o quadro na página 312).", skillsText: null
};

export const dragaoAdulto = {
    id: "dragao-adulto", name: "Dragão Adulto", type: "monster", subtype: "dragão", size: "Enorme", challengeRating: 11,
    description: [], source: { book: "Livro Básico", pdfPage: 26, bookPage: null },
    stats: { initiative: 12, perception: 15, defense: 42, fortitude: 24, reflex: 11, will: 18, hitPoints: 600, speedText: "12m (8q), voo 24m (16q)", senses: null, defensesText: null, attributes: { str: 11, dex: 1, con: 8, int: 4, wis: 4, cha: 4 } },
    actions: [{ name: null, text: "Corpo a Corpo Mordida +35 (4d10+25, 18) e duas garras." }],
    abilities: [], equipment: null, treasure: "Dobro e 4 peças de couro de dragão (CD 26 para extrair, veja o quadro na página 312).", skillsText: null
};

export const dragaoVeneravel = {
    id: "dragao-veneravel", name: "Dragão Venerável", type: "monster", subtype: "dragão", size: "Enorme", challengeRating: 15,
    description: [], source: { book: "Livro Básico", pdfPage: 26, bookPage: null },
    stats: { initiative: 16, perception: 22, defense: 52, fortitude: 28, reflex: 15, will: 22, hitPoints: 800, speedText: "12m (8q), voo 24m (16q)", senses: null, defensesText: null, attributes: { str: 13, dex: 1, con: 10, int: 6, wis: 6, cha: 6 } },
    actions: [{ name: null, text: "Corpo a Corpo Mordida +44 (4d12+40, 17) e duas garras." }],
    abilities: [], equipment: null, treasure: "Dobro e 4 peças de couro de dragão (CD 30 para extrair, veja o quadro ao lado).", skillsText: null
};

export const dragaoRei = {
    id: "dragao-rei", name: "Dragão Rei", type: "monster", subtype: "dragão", size: "Colossal", challengeRating: 20,
    description: [], source: { book: "Livro Básico", pdfPage: 27, bookPage: null },
    stats: { initiative: 19, perception: 27, defense: 62, fortitude: 34, reflex: 20, will: 28, hitPoints: 1400, speedText: "12m (8q), voo 36m (24q)", senses: null, defensesText: null, attributes: { str: 17, dex: 0, con: 12, int: 7, wis: 7, cha: 7 } },
    actions: [{ name: null, text: "Corpo a Corpo Mordida +55 (6d20+50, 16) e duas garras." }],
    abilities: [], equipment: null, treasure: "Dobro e 6 peças couro de dragão (CD 26 para extrair, veja o quadro na página 312).", skillsText: null
};

export const uktril = {
    id: "uktril", name: "Uktril", type: "monster", subtype: "lefeu", size: "Médio", challengeRating: 3,
    description: [], source: { book: "Livro Básico", pdfPage: 29, bookPage: null },
    stats: { initiative: 9, perception: 10, defense: 22, fortitude: 12, reflex: 11, will: 6, hitPoints: 45, speedText: "9m (6q)", senses: null, defensesText: null, attributes: { str: 5, dex: 4, con: 2, int: -1, wis: 2, cha: -4 } },
    actions: [{ name: null, text: "Corpo a Corpo Pinça +16 (2d6+6, 19) e garra +16 (1d6+6)." }],
    abilities: [], equipment: null, treasure: "Nenhum.", skillsText: null
};

export const geraktril = {
    id: "geraktril", name: "Geraktril", type: "monster", subtype: "lefeu", size: "Médio", challengeRating: 6,
    description: [], source: { book: "Livro Básico", pdfPage: 29, bookPage: null },
    stats: { initiative: 13, perception: 16, defense: 30, fortitude: 18, reflex: 15, will: 6, hitPoints: 240, speedText: "9m (6q)", senses: null, defensesText: null, attributes: { str: 7, dex: 5, con: 3, int: 1, wis: 3, cha: -1 } },
    actions: [{ name: null, text: "Corpo a Corpo Duas pinças +23 (3d6+10, 19) e garra +23." }],
    abilities: [], equipment: null, treasure: "Nenhum.", skillsText: null
};

export const reishid = {
    id: "reishid", name: "Reishid", type: "monster", subtype: "lefeu", size: "Médio", challengeRating: 8,
    description: [], source: { book: "Livro Básico", pdfPage: 29, bookPage: null },
    stats: {
        initiative: null, perception: null, defense: null, fortitude: null, reflex: null, will: null, hitPoints: null,
        speedText: null, senses: null, defensesText: null,
        attributes: { str: 17, dex: -1, con: 10, int: -3, wis: 0, cha: -4 }
    },
    actions: [], abilities: [], equipment: null, treasure: "Nenhum.", skillsText: null
};

export const otyugh = {
    id: "otyugh", name: "Otyugh", type: "monster", subtype: null, size: "Grande", challengeRating: 5,
    description: [], source: { book: "Livro Básico", pdfPage: 30, bookPage: null },
    stats: { initiative: 3, perception: 10, defense: 24, fortitude: 17, reflex: 11, will: 5, hitPoints: 213, speedText: "6m (4q)", senses: null, defensesText: null, attributes: { str: 4, dex: 7, con: 4, int: 4, wis: 4, cha: 1 } },
    actions: [
        { name: null, text: "Corpo a Corpo Dois tentáculos +17 (1d8+9, alcance 4,5m)." },
        { name: null, text: "Corpo a Corpo Adaga da Tormenta +30 (1d4+18 mais)." },
        { name: null, text: "Corpo a Corpo Quatro pancadas +48 (4d12+24)." }
    ],
    abilities: [], equipment: null, treasure: "Padrão.", skillsText: null
};

// ─── Monstros de Ameaças de Arton ─────────────────────────────────────────────

export const carrascoDeLeena = {
    id: "carrasco-de-lena", name: "Carrasco de Lena", type: "monster", subtype: null, size: "Grande", challengeRating: 6,
    description: [], role: "special", roleSource: "pdf-review",
    source: { book: "Ameaças de Arton", pdfFile: "elementais e ermos.pdf", pdfPage: 17, bookPage: 104 },
    stats: { initiative: 6, perception: 6, defense: 27, fortitude: 16, reflex: 12, will: 8, hitPoints: 180, speedText: "9m (6q)", senses: null, defensesText: null, attributes: { str: 5, dex: 1, con: 4, int: -4, wis: 1, cha: -2 } },
    actions: [{ name: null, text: "Corpo a Corpo Tentáculo +20 (2d6+10 corte) e mordida +20." }],
    abilities: [], equipment: null, treasure: "Nenhum.", skillsText: null
};

export const ente = {
    id: "ente", name: "Ente", type: "monster", subtype: null, size: "Enorme", challengeRating: 8,
    description: [], role: "solo", roleSource: "pdf-review",
    source: { book: "Ameaças de Arton", pdfFile: "elementais e ermos.pdf", pdfPage: 19, bookPage: 106 },
    stats: { initiative: 7, perception: 11, defense: 34, fortitude: 21, reflex: 8, will: 15, hitPoints: 310, speedText: "9m (6q)", senses: null, defensesText: null, attributes: { str: 9, dex: -1, con: 5, int: 1, wis: 3, cha: 1 } },
    actions: [{ name: null, text: "Corpo a Corpo Duas pancadas +26 (4d8+16)." }],
    abilities: [], equipment: null, treasure: "Padrão mais lasca de ente (CD 23 para extrair, vale T$ 70 para fabricar um dedo de ente).",
    skillsText: "Furtividade +2 (+12 em florestas), Intuição +11, Sobrevivência +16"
};

export const estirge = {
    id: "estirge", name: "Estirge", type: "monster", subtype: null, size: "Minúsculo", challengeRating: 1,
    description: [], role: "minion", roleSource: "pdf-review",
    source: { book: "Ameaças de Arton", pdfFile: "elementais e ermos.pdf", pdfPage: 20, bookPage: 107 },
    stats: { initiative: 7, perception: 2, defense: 16, fortitude: 1, reflex: 10, will: 5, hitPoints: 9, speedText: "voo 12m (8q)", senses: null, defensesText: null, attributes: { str: -4, dex: 5, con: -1, int: -5, wis: 0, cha: -2 } },
    actions: [{ name: null, text: "Corpo a Corpo Probóscide +11 (1 perfuração)." }],
    abilities: [], equipment: null, treasure: "Ova de estirge.", skillsText: null
};

export const enxameEstirge = {
    id: "enxame-estirge", name: "Enxame Estirge", type: "monster", subtype: null, size: "Médio", challengeRating: 5,
    description: [], role: "minion", roleSource: "pdf-review",
    source: { book: "Ameaças de Arton", pdfFile: "elementais e ermos.pdf", pdfPage: 21, bookPage: 108 },
    stats: { initiative: 9, perception: 4, defense: 23, fortitude: 6, reflex: 16, will: 11, hitPoints: 40, speedText: "voo 12m (8q)", senses: null, defensesText: null, attributes: { str: -3, dex: 5, con: -1, int: -5, wis: 0, cha: -2 } },
    actions: [{ name: null, text: "Enxame 1d6 pontos de dano de perfuração. Para cada ponto." }],
    abilities: [], equipment: null, treasure: "Ova de estirge.", skillsText: null
};

export const nuvemDeEstirges = {
    id: "nuvem-de-estirges", name: "Nuvem de Estirges", type: "monster", subtype: null, size: "Enorme", challengeRating: 5,
    description: [], role: "minion", roleSource: "pdf-review",
    source: { book: "Ameaças de Arton", pdfFile: "elementais e ermos.pdf", pdfPage: 21, bookPage: 108 },
    stats: { initiative: 19, perception: 14, defense: 51, fortitude: 17, reflex: 29, will: 24, hitPoints: 180, speedText: "voo 12m (8q)", senses: null, defensesText: null, attributes: { str: -2, dex: 5, con: -1, int: -5, wis: 0, cha: -2 } },
    actions: [{ name: null, text: "Enxame 10d6 pontos de dano de perfuração. Para cada ponto." }],
    abilities: [], equipment: null, treasure: "Ova de estirge.", skillsText: null
};

export const feraVassalo = {
    id: "fera-vassalo", name: "Fera-Vassalo", type: "monster", subtype: null, size: "Médio", challengeRating: 3,
    description: [], role: "minion", roleSource: "pdf-review",
    source: { book: "Ameaças de Arton", pdfFile: "elementais e ermos.pdf", pdfPage: 21, bookPage: 108 },
    stats: { initiative: 3, perception: 3, defense: 21, fortitude: 10, reflex: 13, will: 4, hitPoints: 22, speedText: "9m (6q)", senses: null, defensesText: null, attributes: { str: 4, dex: 0, con: 3, int: -2, wis: 0, cha: -3 } },
    actions: [
        { name: null, text: "Corpo a Corpo Duas garras +15 (2d6+6)." },
        { name: null, text: "À Distância Dois espinhos +15 (2d6+3 perfuração, alcance)." }
    ],
    abilities: [], equipment: null, treasure: "Espinhos (CD 18 para extrair, valem T$ 50 para fabricar flechas superiores).", skillsText: null
};

export const feraLider = {
    id: "fera-lider", name: "Fera-Líder", type: "monster", subtype: null, size: "Médio", challengeRating: 5,
    description: [], role: "special", roleSource: "pdf-review",
    source: { book: "Ameaças de Arton", pdfFile: "elementais e ermos.pdf", pdfPage: 22, bookPage: 109 },
    stats: { initiative: 4, perception: 4, defense: 25, fortitude: 12, reflex: 16, will: 5, hitPoints: 195, speedText: "9m (6q)", senses: null, defensesText: null, attributes: { str: 5, dex: 0, con: 4, int: -2, wis: 0, cha: -2 } },
    actions: [
        { name: null, text: "Corpo a Corpo Duas garras +16 (2d6+12)." },
        { name: null, text: "À Distância Dois espinhos +16 (2d6+6 perfuração, alcance)." }
    ],
    abilities: [], equipment: null, treasure: "Espinhos (CD 20 para extrair, valem T$ 150 para fabricar flechas superiores).", skillsText: null
};

export const feraMae = {
    id: "fera-mae", name: "Fera-Mãe", type: "monster", subtype: null, size: "Enorme", challengeRating: 13,
    description: [], role: "solo", roleSource: "pdf-review",
    source: { book: "Ameaças de Arton", pdfFile: "elementais e ermos.pdf", pdfPage: 22, bookPage: 109 },
    stats: { initiative: 7, perception: 24, defense: 45, fortitude: 28, reflex: 8, will: 23, hitPoints: 685, speedText: "0m (0q)", senses: null, defensesText: null, attributes: { str: 8, dex: -3, con: 8, int: 2, wis: 4, cha: -2 } },
    actions: [], abilities: [], equipment: null,
    treasure: "1d4+1 doses de peçonha potente (CD 28 para extrair) e espinhos (CD 28 para extrair, valem T$ 1.000 para fabricar flechas superiores).",
    skillsText: null
};

export const enxameLarval = {
    id: "enxame-larval", name: "Enxame Larval", type: "monster", subtype: "kobold", size: "Médio", challengeRating: 1,
    description: [], role: "minion", roleSource: "pdf-review",
    source: { book: "Ameaças de Arton", pdfFile: "ameacas de arton variadas.pdf", pdfPage: 4, bookPage: 180 },
    stats: { initiative: 7, perception: 3, defense: 16, fortitude: 5, reflex: 11, will: 0, hitPoints: 30, speedText: "6m (4q), escavação 6m (4q)", senses: null, defensesText: null, attributes: { str: -1, dex: 2, con: 0, int: -4, wis: -1, cha: -3 } },
    actions: [{ name: null, text: "Enxame 3d4 perfuração." }],
    abilities: [], equipment: null, treasure: "Nenhum.", skillsText: null
};

export const koboldPatrulheiro = {
    id: "kobold-patrulheiro", name: "Kobold Patrulheiro", type: "monster", subtype: "kobold", size: "Pequeno", challengeRating: 0.5,
    description: [], role: "minion", roleSource: "pdf-review",
    source: { book: "Ameaças de Arton", pdfFile: "ameacas de arton variadas.pdf", pdfPage: 5, bookPage: 181 },
    stats: { initiative: 4, perception: 0, defense: 14, fortitude: 3, reflex: 5, will: 0, hitPoints: 6, speedText: "9m (6q)", senses: null, defensesText: null, attributes: { str: 1, dex: 2, con: 0, int: -1, wis: 0, cha: -1 } },
    actions: [
        { name: null, text: "Corpo a Corpo Lança +9 (1d6+1)." },
        { name: null, text: "À Distância Funda +9 (1d4+6)." }
    ],
    abilities: [], equipment: "Funda, lança, pedras x20.", treasure: "Metade.", skillsText: "Furtividade +8"
};

export const koboldVeterano = {
    id: "kobold-veterano", name: "Kobold Veterano", type: "monster", subtype: "kobold", size: "Pequeno", challengeRating: 0.5,
    description: [], role: "minion", roleSource: "pdf-review",
    source: { book: "Ameaças de Arton", pdfFile: "ameacas de arton variadas.pdf", pdfPage: 5, bookPage: 181 },
    stats: { initiative: 5, perception: 1, defense: 19, fortitude: 7, reflex: 12, will: 3, hitPoints: 13, speedText: "9m (6q)", senses: null, defensesText: null, attributes: { str: 1, dex: 2, con: 0, int: -1, wis: 0, cha: -1 } },
    actions: [
        { name: null, text: "Corpo a Corpo Lança +14 x2 (1d6+6)." },
        { name: null, text: "À Distância Funda +14 (2d4+12)." }
    ],
    abilities: [], equipment: "Armadura de couro, funda, lança, pedras x20.", treasure: "Metade.", skillsText: "Furtividade +9"
};

export const patrulhaKobold = {
    id: "patrulha-kobold", name: "Patrulha Kobold", type: "monster", subtype: "kobold", size: "Médio", challengeRating: 0.5,
    description: [], role: "minion", roleSource: "pdf-review",
    source: { book: "Ameaças de Arton", pdfFile: "ameacas de arton variadas.pdf", pdfPage: 5, bookPage: 181 },
    stats: { initiative: 6, perception: 2, defense: 23, fortitude: 10, reflex: 15, will: 5, hitPoints: 30, speedText: "9m (6q)", senses: null, defensesText: null, attributes: { str: 1, dex: 2, con: 0, int: -1, wis: 0, cha: -1 } },
    actions: [
        { name: null, text: "Corpo a Corpo [Bando] Lança +17 (1d6+1)." },
        { name: null, text: "À Distância [Bando] Funda +17 (1d4+6)." }
    ],
    abilities: [], equipment: "Funda, lança, pedras x20.", treasure: "Metade.", skillsText: "Furtividade +8"
};

export const koboldExplosivo = {
    id: "kobold-explosivo", name: "Kobold Explosivo", type: "monster", subtype: "kobold", size: "Pequeno", challengeRating: 1,
    description: [], role: "minion", roleSource: "pdf-review",
    source: { book: "Ameaças de Arton", pdfFile: "ameacas de arton variadas.pdf", pdfPage: 6, bookPage: 185 },
    stats: { initiative: 4, perception: 0, defense: 15, fortitude: 5, reflex: 10, will: 1, hitPoints: 9, speedText: "9m (6q)", senses: null, defensesText: null, attributes: { str: 1, dex: 2, con: 0, int: -1, wis: 0, cha: -1 } },
    actions: [
        { name: null, text: "Corpo a Corpo Lança +11 (1d6+9)." },
        { name: null, text: "À Distância Funda +11 (1d4+9)." }
    ],
    abilities: [], equipment: "Funda, lança, pedras x20.", treasure: "Metade.", skillsText: null
};

export const koboldXama = {
    id: "kobold-xama", name: "Kobold Xamã", type: "monster", subtype: "kobold", size: "Pequeno", challengeRating: 3,
    description: [], role: "special", roleSource: "pdf-review",
    source: { book: "Ameaças de Arton", pdfFile: "ameacas de arton variadas.pdf", pdfPage: 7, bookPage: 186 },
    stats: { initiative: 5, perception: 6, defense: 20, fortitude: 3, reflex: 9, will: 15, hitPoints: 69, speedText: "9m (6q)", senses: null, defensesText: null, attributes: { str: 0, dex: 2, con: 1, int: -1, wis: 3, cha: -1 } },
    actions: [
        { name: null, text: "Corpo a Corpo Gadanho +12 (2d4+3, x4) e mordida +12 (1d4+3)." },
        { name: null, text: "À Distância Funda +12 (1d6+3)." }
    ],
    abilities: [], equipment: "Andrajos, bálsamo restaurador, funda, gadanho, pedras x20, símbolo sagrado de Kallyadra.", treasure: "Padrão.",
    skillsText: "Cura +6, Furtividade +9, Misticismo +2, Religião +6"
};

export const cocatrizReal = {
    id: "cocatriz-real", name: "Cocatriz-Real", type: "monster", subtype: null, size: "Grande", challengeRating: 7,
    description: [], role: "solo", roleSource: "pdf-review",
    source: { book: "Ameaças de Arton", pdfFile: "ameacas de arton variadas.pdf", pdfPage: 10, bookPage: 200 },
    stats: { initiative: 17, perception: 8, defense: 32, fortitude: 20, reflex: 12, will: 7, hitPoints: 250, speedText: "6m (4q), voo 12m (8q)", senses: null, defensesText: null, attributes: { str: 2, dex: 7, con: 3, int: -5, wis: 1, cha: -2 } },
    actions: [{ name: null, text: "Corpo a Corpo Bicada +24 (2d8+12 perfuração) e cauda de." }],
    abilities: [], equipment: null, treasure: "1 dose de lágrima pétrea (CD 22 para extrair) e 1d4 ovos de cocatriz.", skillsText: null
};

export const harpiaSaqueadora = {
    id: "harpia-saqueadora", name: "Harpia saqueadora", type: "monster", subtype: "harpia", size: "Médio", challengeRating: 4,
    description: [], role: "special", roleSource: "pdf-review",
    source: { book: "Ameaças de Arton", pdfFile: "ameacas de arton variadas.pdf", pdfPage: 10, bookPage: 200 },
    stats: { initiative: 13, perception: 7, defense: 18, fortitude: 10, reflex: 15, will: 5, hitPoints: 32, speedText: "9m (6q), voo 12m (8q)", senses: null, defensesText: null, attributes: { str: 1, dex: 4, con: 2, int: -1, wis: 3, cha: 2 } },
    actions: [{ name: null, text: "Corpo a Corpo Maça +20 (1d8+11) e garra +20 (1d6+11) ou." }],
    abilities: [], equipment: "Maça.", treasure: "Nenhum.", skillsText: "Intimidação +8, Sobrevivência +9"
};

export const mantor = {
    id: "mantor", name: "Mantor", type: "monster", subtype: null, size: "Grande", challengeRating: 5,
    description: [], role: "special", roleSource: "pdf-review",
    source: { book: "Ameaças de Arton", pdfFile: "ameacas de arton variadas.pdf", pdfPage: 12, bookPage: 203 },
    stats: { initiative: 11, perception: 8, defense: 24, fortitude: 11, reflex: 17, will: 5, hitPoints: 200, speedText: "voo 18m (12q)", senses: null, defensesText: null, attributes: { str: 4, dex: 5, con: 2, int: -1, wis: 2, cha: 0 } },
    actions: [{ name: null, text: "Corpo a Corpo Aguilhão +17 (1d10+8 perfuração, x3, alcance)." }],
    abilities: [], equipment: null, treasure: "Metade, mais couro de mantor (CD 20 para extrair, vale T$ 150 para fabricar um manto do mantor).",
    skillsText: "Furtividade +11 (+21 no escuro)"
};

export const quimera = {
    id: "quimera",
    name: "Quimera",
    type: "monster",
    subtype: null,
    size: "Grande",
    challengeRating: 8,
    description: [],
    role: "solo",
    roleSource: "pdf-review",
    source: { book: "Ameaças de Arton", pdfFile: "ameacas de arton variadas.pdf", pdfPage: 13, bookPage: 204 },
    stats: {
        initiative: 7, perception: 10, defense: 33, fortitude: 21, reflex: 15, will: 8,
        hitPoints: 333,
        speedText: "9m (6q), voo 12m (8q)",
        senses: "faro, visão no escuro",
        defensesText: null,
        attributes: { str: 6, dex: 3, con: 4, int: 0, wis: 1, cha: -2 }
    },
    actions: [
        { name: "Três mordidas", text: "Corpo a Corpo Três mordidas +26 (3d8+7)." },
        { name: "Duas garras", text: "Corpo a Corpo Duas garras +24 (2d6+10)." }
    ],
    abilities: [
        { name: "Mente Tripla", timing: "passiva", text: "Quando faz um teste de Percepção ou Vontade, a quimera joga três dados e usa o melhor resultado." },
        { name: "Três Cabeças", timing: "passiva", text: "A quimera tem três cabeças distintas que concedem habilidades especiais escolhidas entre Águia, Bode, Dragão, Gorlogg, Hidra, Leão, Javali, Serpente, Tigre e Tubarão." },
        { name: "Cabeça de Águia", timing: "passiva", text: "Quando faz uma investida, pode atacar com esta cabeça e suas duas garras. Os três ataques recebem +2 da investida e devem ser contra o mesmo alvo." },
        { name: "Cabeça de Bode", timing: "passiva", text: "Uma mordida muda para marrada e causa impacto. Em investida, se acerta esta cabeça, arremessa a vítima 1d6 x 1,5m (Fort CD 26 evita); a vítima cai e sofre 1d6 impacto por 1,5m se atingir obstáculo." },
        { name: "Cabeça de Dragão", timing: "padrão", text: "Cospe fogo em cone de 6m. Criaturas na área sofrem 10d6+20 fogo (Ref CD 26 reduz à metade). Recarga como movimento." },
        { name: "Cabeça de Gorlogg", timing: "livre", text: "Se acerta mordida com esta cabeça, pode fazer a manobra derrubar como ação livre (teste +28)." },
        { name: "Cabeça de Hidra", timing: "passiva", text: "Ganha cura acelerada 20/ácido ou fogo." },
        { name: "Cabeça de Leão", timing: "livre", text: "Quando acerta mordida com esta cabeça, pode fazer a manobra agarrar como ação livre (teste +28)." },
        { name: "Cabeça de Javali", timing: "reação", text: "Se sofrer dano, recebe +5 em testes de ataque e rolagens de dano até o fim de seu próximo turno." },
        { name: "Cabeça de Serpente", timing: "passiva", text: "Uma criatura atingida por mordida desta cabeça perde 2d12 PV durante 3 rodadas (Fort CD 26 reduz para 1 rodada). Veneno." },
        { name: "Cabeça de Tigre", timing: "passiva", text: "Se acerta os dois ataques de garra na mesma criatura na mesma rodada, causa +4d6+20 pontos de dano." },
        { name: "Cabeça de Tubarão", timing: "passiva", text: "Ganha deslocamento de natação 9m. Além disso, criatura atingida por mordida desta cabeça fica sangrando (Fort CD 26 evita)." }
    ],
    equipment: null,
    treasure: "Coração de quimera (CD 23 para extrair, vale T$ 300 para fabricar três doses de elixir quimérico). Padrão.",
    skillsText: null
};

export const mimico = {
    id: "mimico", name: "Mímico", type: "monster", subtype: null, size: "Médio", challengeRating: 6,
    description: [], role: "special", roleSource: "pdf-review",
    source: { book: "Ameaças de Arton", pdfFile: "ameacas de arton variadas.pdf", pdfPage: 13, bookPage: 204 },
    stats: { initiative: 9, perception: 8, defense: 26, fortitude: 18, reflex: 12, will: 6, hitPoints: 220, speedText: "6m (4q)", senses: null, defensesText: null, attributes: { str: 2, dex: 4, con: 3, int: -2, wis: 3, cha: 0 } },
    actions: [{ name: null, text: "Corpo a Corpo Dois tentáculos +20 (2d8+15)." }],
    abilities: [], equipment: null, treasure: "Padrão.", skillsText: "Enganação +15, Furtividade +2"
};

// ─── Exportação principal ─────────────────────────────────────────────────────

export const monsterCreatures = [
    // Manuais
    glop, glooop, mamaeGlop, cockatrice, basilisk, bulette, tendriculo,
    // Livro Básico
    aranhaGigante, manticora, centopeiasDragao, grifo, ursoCoruja, serpe,
    hidra, lagash, ganchador, troll, trollDasCavernas,
    dragaoFilhote, dragaoJovem, dragaoAdulto, dragaoVeneravel, dragaoRei,
    uktril, geraktril, reishid, otyugh,
    // Ameaças de Arton
    carrascoDeLeena, ente, estirge, enxameEstirge, nuvemDeEstirges,
    feraVassalo, feraLider, feraMae,
    enxameLarval, koboldPatrulheiro, koboldVeterano, patrulhaKobold, koboldExplosivo, koboldXama,
    cocatrizReal, harpiaSaqueadora, mantor, quimera, mimico
];
