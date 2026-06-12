// ─── Humanoides manuais ───────────────────────────────────────────────────────

export const orcCombatant = {
    id: "orc-combatente",
    name: "Orc Combatente",
    type: "humanoid",
    subtype: "orc",
    size: "Médio",
    challengeRating: 0.5,
    description: [],
    source: null,
    stats: {
        initiative: 4, perception: 1, defense: 14, fortitude: 5, reflex: 3, will: 0,
        hitPoints: 8,
        speedText: "9m (6q)",
        senses: "visão no escuro",
        defensesText: null,
        attributes: { str: 4, dex: 1, con: 2, int: -1, wis: 1, cha: -1 }
    },
    actions: [
        { name: "Corpo a corpo", text: "Maça +9 (1d8+7)." }
    ],
    abilities: [
        { name: "Sensibilidade a Luz", timing: "passiva", text: "Quando exposto a luz do sol ou similar, o orc fica ofuscado." }
    ],
    equipment: "Couro batido, maça.",
    treasure: "Metade.",
    skillsText: null
};

export const orcChief = {
    id: "orc-chefe",
    name: "Orc Chefe",
    type: "humanoid",
    subtype: "orc",
    size: "Médio",
    challengeRating: 2,
    description: [],
    source: null,
    stats: {
        initiative: 5, perception: 3, defense: 19, fortitude: 13, reflex: 7, will: 2,
        hitPoints: 66,
        speedText: "9m (6q)",
        senses: "visão no escuro",
        defensesText: null,
        attributes: { str: 5, dex: 2, con: 4, int: 0, wis: 0, cha: 0 }
    },
    actions: [
        { name: "Machado de batalha", text: "Corpo a Corpo Machado de batalha +11 (1d8+12, x3)." }
    ],
    abilities: [
        { name: "Urro Selvagem", timing: "movimento", text: "O orc chefe recebe +2 em testes de ataque e rolagens de dano corpo a corpo até o final da cena, mas não pode fazer nenhuma ação que exija calma e concentração." },
        { name: "Sensibilidade a Luz", timing: "passiva", text: "Quando exposto a luz do sol ou similar, o orc fica ofuscado." }
    ],
    equipment: "Gibão de peles, machado de batalha.",
    treasure: "Padrão.",
    skillsText: "Intimidação +4, Sobrevivência +5 (+7 em subterrâneos)"
};

export const ogre = {
    id: "ogro",
    name: "Ogro",
    type: "humanoid",
    subtype: "gigante",
    size: "Grande",
    challengeRating: 4,
    description: [
        "Estes gigantes primitivos são solitários e mal-humorados, quase nunca encontrados em bandos.",
        "Por sua estupidez, são frequentemente convencidos a acompanhar bandidos e gnolls em troca de diversão ou guloseimas.",
        "Também é comum encontrá-los servindo a bruxos ou cultistas. Enganar um ogro não é tarefa difícil, sendo muito mais recomendado que tentar vencê-lo pela força bruta."
    ],
    source: null,
    stats: {
        initiative: 3, perception: 1, defense: 23, fortitude: 16, reflex: 10, will: 0,
        hitPoints: 130,
        speedText: "9m (6q)",
        senses: "visão na penumbra",
        defensesText: null,
        attributes: { str: 7, dex: 0, con: 4, int: -3, wis: -2, cha: -2 }
    },
    actions: [
        { name: "Tacape", text: "Corpo a Corpo Tacape +16 (1d12+18)." }
    ],
    abilities: [
        { name: "Burro Demais...", timing: "passiva", text: "O ogro sofre -5 em testes de Intuição e Vontade, já contabilizados na ficha." },
        { name: "...Para Morrer!", timing: "passiva", text: "Todo dano de corte, impacto e perfuração que o ogro sofre é reduzido à metade." }
    ],
    equipment: "Tacape aumentado.",
    treasure: "Padrão.",
    skillsText: "Atletismo +12, Intuição -5"
};

export const gnollMarauder = {
    id: "gnoll-saqueador",
    name: "Gnoll Saqueador",
    type: "humanoid",
    subtype: "gnoll",
    size: "Médio",
    challengeRating: 1,
    description: [],
    source: null,
    stats: {
        initiative: 5, perception: 4, defense: 15, fortitude: 7, reflex: 7, will: 1,
        hitPoints: 15,
        speedText: "9m (6q)",
        senses: "faro",
        defensesText: null,
        attributes: { str: 3, dex: 2, con: 3, int: -2, wis: 1, cha: -1 }
    },
    actions: [
        { name: "Lança", text: "Corpo a Corpo Lança +10 (1d6+4)." },
        { name: "Mordida", text: "Corpo a Corpo Mordida +10 (1d6+4)." },
        { name: "Arco curto", text: "À Distância Arco curto +9 (1d6+3, x3)." }
    ],
    abilities: [],
    equipment: "Arco curto, flechas x20, lança.",
    treasure: "Metade.",
    skillsText: null
};

export const gnollFilibuster = {
    id: "gnoll-filibusteiro",
    name: "Gnoll Filibusteiro",
    type: "humanoid",
    subtype: "gnoll",
    size: "Médio",
    challengeRating: 2,
    description: [],
    source: null,
    stats: {
        initiative: 9, perception: 4, defense: 19, fortitude: 7, reflex: 11, will: 4,
        hitPoints: 60,
        speedText: "9m (6q)",
        senses: "faro",
        defensesText: null,
        attributes: { str: 3, dex: 4, con: 3, int: -1, wis: 2, cha: -1 }
    },
    actions: [
        { name: "Espada curta", text: "Corpo a Corpo Espada curta +11 (1d6+4, 19)." },
        { name: "Mordida", text: "Corpo a Corpo Mordida +11 (1d6+4)." },
        { name: "Mosquete", text: "À Distância Mosquete +12 (2d8+9, 19/x3)." }
    ],
    abilities: [
        { name: "Recarga Rápida", timing: "passiva", text: "O gnoll filibusteiro pode recarregar seu mosquete como uma ação de movimento." }
    ],
    equipment: "Bolas x10, espada curta, mosquete.",
    treasure: "Padrão.",
    skillsText: null
};

// ─── Humanoides do Livro Básico ───────────────────────────────────────────────

export const orcMutante = {
    id: "orc-mutante", name: "Orc Mutante", type: "humanoid", subtype: "orc", size: "Médio", challengeRating: 5,
    description: [], source: { book: "Livro Básico", pdfPage: 1, bookPage: null },
    stats: { initiative: 8, perception: 5, defense: 22, fortitude: 15, reflex: 11, will: 7, hitPoints: 55, speedText: "9m (6q)", senses: null, defensesText: null, attributes: { str: 6, dex: 2, con: 4, int: -2, wis: -2, cha: -2 } },
    actions: [{ name: null, text: "Corpo a Corpo Machado de guerra +11 (1d12+18, x3) e." }],
    abilities: [], equipment: "Machado de guerra.", treasure: "Padrão.", skillsText: null
};

export const bandido = {
    id: "bandido", name: "Bandido", type: "humanoid", subtype: "humano", size: "Médio", challengeRating: 0.25,
    description: [], source: { book: "Livro Básico", pdfPage: 4, bookPage: null },
    stats: { initiative: 4, perception: 1, defense: 13, fortitude: 1, reflex: 3, will: -1, hitPoints: 6, speedText: "9m (6q)", senses: null, defensesText: null, attributes: null },
    actions: [{ name: null, text: "Corpo a Corpo Clava +7 (1d6+3)." }],
    abilities: [], equipment: "Clava.", treasure: "Metade.", skillsText: null
};

export const chefeBandido = {
    id: "chefe-bandido", name: "Chefe Bandido", type: "humanoid", subtype: "humano", size: "Médio", challengeRating: 1,
    description: [], source: { book: "Livro Básico", pdfPage: 4, bookPage: null },
    stats: { initiative: 4, perception: 2, defense: 16, fortitude: 5, reflex: 8, will: 3, hitPoints: 30, speedText: "9m", senses: null, defensesText: null, attributes: { str: 3, dex: 2, con: 2, int: 0, wis: 0, cha: 1 } },
    actions: [
        { name: null, text: "Corpo a Corpo Espada curta +9 (1d6+5, 19)." },
        { name: null, text: "À Distância Adaga +7 (1d4+3, 19)." }
    ],
    abilities: [], equipment: "Adaga, espada curta.", treasure: "Padrão.", skillsText: null
};

export const guardaDeCidade = {
    id: "guarda-de-cidade", name: "Guarda de Cidade", type: "humanoid", subtype: "humano", size: "Médio", challengeRating: 0.5,
    description: [], source: { book: "Livro Básico", pdfPage: 4, bookPage: null },
    stats: { initiative: 4, perception: 3, defense: 15, fortitude: 5, reflex: 2, will: 1, hitPoints: 8, speedText: "9m (6q)", senses: null, defensesText: null, attributes: { str: 2, dex: 1, con: 2, int: 0, wis: 0, cha: 0 } },
    actions: [{ name: null, text: "Corpo a Corpo Maça +7 (1d8+5)." }],
    abilities: [], equipment: "Apito, couro batido, maça.", treasure: "Nenhum.", skillsText: null
};

export const sargentoDaGuarda = {
    id: "sargento-da-guarda", name: "Sargento da Guarda", type: "humanoid", subtype: "humano", size: "Médio", challengeRating: 1,
    description: [], source: { book: "Livro Básico", pdfPage: 4, bookPage: null },
    stats: { initiative: 5, perception: 4, defense: 17, fortitude: 9, reflex: 4, will: 3, hitPoints: 28, speedText: "6m (4q)", senses: null, defensesText: null, attributes: { str: 3, dex: 1, con: 2, int: 0, wis: 0, cha: 1 } },
    actions: [
        { name: null, text: "Corpo a Corpo Maça +10 (1d8+10)." },
        { name: null, text: "À Distância Besta leve +9 (1d8+5, 19)." }
    ],
    abilities: [], equipment: "Apito, besta leve, cota de malha, maça, virotes x10.", treasure: "Metade.", skillsText: null
};

export const centauroCombatente = {
    id: "centauro-combatente", name: "Centauro Combatente", type: "humanoid", subtype: "centauro", size: "Grande", challengeRating: 1,
    description: [], source: { book: "Livro Básico", pdfPage: 5, bookPage: null },
    stats: { initiative: 3, perception: 3, defense: 16, fortitude: 9, reflex: 2, will: 5, hitPoints: 35, speedText: "12m (8q)", senses: null, defensesText: null, attributes: { str: 5, dex: 2, con: 3, int: -2, wis: 1, cha: -2 } },
    actions: [
        { name: null, text: "Corpo a Corpo Tacape +9 (1d12+5) e cascos +9 (1d8+5)." },
        { name: null, text: "À Distância Arco longo +7 (1d10+5, x3)." }
    ],
    abilities: [], equipment: "Arco longo aumentado, flechas x20, tacape aumentado.", treasure: "Metade.", skillsText: null
};

export const centauroXama = {
    id: "centauro-xama", name: "Centauro Xamã", type: "humanoid", subtype: "centauro", size: "Grande", challengeRating: 3,
    description: [], source: { book: "Livro Básico", pdfPage: 5, bookPage: null },
    stats: { initiative: 4, perception: 8, defense: 21, fortitude: 9, reflex: 4, will: 15, hitPoints: 35, speedText: "12m (8q)", senses: null, defensesText: null, attributes: { str: 4, dex: 1, con: 3, int: -1, wis: 4, cha: 0 } },
    actions: [{ name: null, text: "Corpo a Corpo Bordão +11 (1d8+4) e cascos +11 (1d8+4)." }],
    abilities: [], equipment: "Bordão aumentado, símbolo de Allihanna.", treasure: "Metade.", skillsText: null
};

export const trog = {
    id: "trog", name: "Trog", type: "humanoid", subtype: "trog", size: "Médio", challengeRating: 1,
    description: [], source: { book: "Livro Básico", pdfPage: 6, bookPage: null },
    stats: { initiative: 3, perception: 0, defense: 16, fortitude: 10, reflex: 5, will: 1, hitPoints: 11, speedText: "9m (6q)", senses: null, defensesText: null, attributes: { str: 3, dex: 1, con: 3, int: -2, wis: 0, cha: -1 } },
    actions: [
        { name: null, text: "Corpo a Corpo Lança +11 (1d6+5) e mordida +11 (1d6+5)." },
        { name: null, text: "À Distância Azagaia +9 (1d6+5)." }
    ],
    abilities: [], equipment: "Azagaias x2, lança.", treasure: "Metade.", skillsText: null
};

export const recrutaPurista = {
    id: "recruta-purista", name: "Recruta Purista", type: "humanoid", subtype: "humano", size: "Médio", challengeRating: 0.5,
    description: [], source: { book: "Livro Básico", pdfPage: 9, bookPage: null },
    stats: { initiative: 3, perception: 0, defense: 16, fortitude: 6, reflex: 2, will: 0, hitPoints: 10, speedText: "6m (4q)", senses: null, defensesText: null, attributes: { str: 2, dex: 1, con: 2, int: -1, wis: -1, cha: 0 } },
    actions: [{ name: null, text: "Corpo a Corpo Alabarda +8 (1d10+5, x3)." }],
    abilities: [], equipment: "Alabarda, cota de malha.", treasure: "Nenhum.", skillsText: null
};

export const soldadoPurista = {
    id: "soldado-purista", name: "Soldado Purista", type: "humanoid", subtype: "humano", size: "Médio", challengeRating: 1,
    description: [], source: { book: "Livro Básico", pdfPage: 9, bookPage: null },
    stats: { initiative: 4, perception: 1, defense: 20, fortitude: 10, reflex: 4, will: 1, hitPoints: 20, speedText: "6m (4q)", senses: null, defensesText: null, attributes: { str: 3, dex: 1, con: 3, int: 0, wis: -1, cha: 0 } },
    actions: [
        { name: null, text: "Corpo a Corpo Espada bastarda +9 (1d10+9, 19)." },
        { name: null, text: "À Distância Besta pesada +7 (1d12+4, 19)." }
    ],
    abilities: [], equipment: "Besta pesada, escudo pesado, espada bastarda, meia armadura, virotes x10.", treasure: "Metade.", skillsText: null
};

export const sargentoMor = {
    id: "sargento-mor", name: "Sargento-mor", type: "humanoid", subtype: "humano", size: "Médio", challengeRating: 3,
    description: [], source: { book: "Livro Básico", pdfPage: 9, bookPage: null },
    stats: { initiative: 4, perception: 3, defense: 24, fortitude: 14, reflex: 9, will: 5, hitPoints: 105, speedText: "6m (4q)", senses: null, defensesText: null, attributes: { str: 4, dex: 1, con: 4, int: 0, wis: 0, cha: 0 } },
    actions: [
        { name: null, text: "Corpo a Corpo Espada bastarda +14 (1d12+15, 19)." },
        { name: null, text: "À Distância Besta pesada +12 (1d12+10, 19)." }
    ],
    abilities: [], equipment: "Armadura completa, besta pesada, escudo pesado, espada bastarda aumentada certeira, virotes x10.", treasure: "Padrão.", skillsText: null
};

export const capelaoDeGuerra = {
    id: "capelao-de-guerra", name: "Capelão de Guerra", type: "humanoid", subtype: "humano", size: "Médio", challengeRating: 4,
    description: [], source: { book: "Livro Básico", pdfPage: 10, bookPage: null },
    stats: { initiative: 4, perception: 7, defense: 21, fortitude: 10, reflex: 5, will: 16, hitPoints: 105, speedText: "6m (4q)", senses: null, defensesText: null, attributes: { str: 4, dex: 0, con: 4, int: 1, wis: 3, cha: -1 } },
    actions: [{ name: null, text: "Corpo a Corpo Martelo de guerra +14 (1d8+15, x3)." }],
    abilities: [], equipment: "Armadura completa, escudo leve, martelo de guerra certeiro, símbolo sagrado.", treasure: "Padrão.", skillsText: null
};

export const capitaoBaluarte = {
    id: "capitao-baluarte", name: "Capitão-Baluarte", type: "humanoid", subtype: "humano", size: "Médio", challengeRating: 5,
    description: [], source: { book: "Livro Básico", pdfPage: 10, bookPage: null },
    stats: { initiative: 4, perception: 5, defense: 33, fortitude: 15, reflex: 5, will: 13, hitPoints: 115, speedText: "6m (4q)", senses: null, defensesText: null, attributes: { str: 3, dex: 0, con: 4, int: 3, wis: 1, cha: 4 } },
    actions: [{ name: null, text: "Corpo a Corpo Espada longa +17 (1d8+8, 19)." }],
    abilities: [], equipment: "Armadura completa reforçada, escudo pesado reforçado, espada longa certeira.", treasure: "Dobro.", skillsText: null
};

export const cavaleiroDeLeopardoSangrento = {
    id: "cavaleiro-do-leopardo-sangrento", name: "Cavaleiro do Leopardo Sangrento", type: "humanoid", subtype: "humano", size: "Médio", challengeRating: 9,
    description: [], source: { book: "Livro Básico", pdfPage: 10, bookPage: null },
    stats: { initiative: 17, perception: 15, defense: 36, fortitude: 21, reflex: 11, will: 17, hitPoints: 270, speedText: "9m (6q)", senses: null, defensesText: null, attributes: { str: 5, dex: 2, con: 4, int: 4, wis: 0, cha: 2 } },
    actions: [{ name: null, text: "Corpo a Corpo Espada bastarda +28 (3d6+15, 19)." }],
    abilities: [], equipment: "Armadura completa reforçada, espada bastarda aumentada pungente de adamante.", treasure: "Padrão.", skillsText: null
};

export const necromante = {
    id: "necromante", name: "Necromante", type: "humanoid", subtype: "elfo", size: "Médio", challengeRating: 7,
    description: [], source: { book: "Livro Básico", pdfPage: 13, bookPage: null },
    stats: { initiative: 9, perception: 9, defense: 23, fortitude: 7, reflex: 14, will: 20, hitPoints: 180, speedText: "12m (8q)", senses: null, defensesText: null, attributes: { str: 0, dex: 2, con: 1, int: 5, wis: 0, cha: 0 } },
    actions: [{ name: null, text: "Corpo a Corpo Adaga +22 (1d4 mais 1d8 de trevas, 19)." }],
    abilities: [], equipment: null, treasure: "Dobro.", skillsText: null
};

export const goblinSalteador = {
    id: "goblin-salteador", name: "Goblin Salteador", type: "humanoid", subtype: "goblin", size: "Pequeno", challengeRating: 0.25,
    description: [], source: { book: "Livro Básico", pdfPage: 15, bookPage: null },
    stats: { initiative: 5, perception: 1, defense: 13, fortitude: 2, reflex: 3, will: -1, hitPoints: 4, speedText: "9m (6q), escalada 9m (6q)", senses: null, defensesText: null, attributes: { str: 0, dex: 3, con: 0, int: 0, wis: -1, cha: -1 } },
    actions: [{ name: null, text: "Corpo a Corpo Duas adagas +7 (1d4, 19)." }],
    abilities: [], equipment: "Adagas x2.", treasure: "Padrão.", skillsText: null
};

export const hobgoblinSoldado = {
    id: "hobgoblin-soldado", name: "Hobgoblin Soldado", type: "humanoid", subtype: "hobgoblin", size: "Médio", challengeRating: 2,
    description: [], source: { book: "Livro Básico", pdfPage: 15, bookPage: null },
    stats: { initiative: 4, perception: 1, defense: 19, fortitude: 12, reflex: 7, will: 3, hitPoints: 18, speedText: "6m (4q)", senses: null, defensesText: null, attributes: { str: 4, dex: 2, con: 1, int: 0, wis: 0, cha: -1 } },
    actions: [
        { name: null, text: "Corpo a Corpo Espada longa +15 (1d8+15, 19)." },
        { name: null, text: "À Distância Arco longo +11 (1d8+6, x3)." }
    ],
    abilities: [], equipment: "Arco longo, cota de malha, escudo pesado, espada longa, flechas x20.", treasure: "Padrão.", skillsText: null
};

export const goblinEngenhoqueiro = {
    id: "goblin-engenhoqueiro", name: "Goblin Engenhoqueiro", type: "humanoid", subtype: "goblin", size: "Pequeno", challengeRating: 3,
    description: [], source: { book: "Livro Básico", pdfPage: 15, bookPage: null },
    stats: { initiative: 5, perception: 2, defense: 19, fortitude: 3, reflex: 15, will: 9, hitPoints: 74, speedText: "9m (6q), escalada 9m (6q)", senses: null, defensesText: null, attributes: { str: 0, dex: 2, con: 2, int: 3, wis: -1, cha: 0 } },
    actions: [
        { name: null, text: "Corpo a Corpo Adaga +8 (1d4+3, 19)." },
        { name: null, text: "À Distância Besta leve +9 (1d8+3, 19)." }
    ],
    abilities: [], equipment: "Adaga, besta leve, instrumentos de Ofício (engenhoqueiro), virotes x10.", treasure: "Padrão.", skillsText: null
};

export const arautoDeThwor = {
    id: "arauto-de-thwor", name: "Arauto de Thwor", type: "humanoid", subtype: "humano", size: "Médio", challengeRating: 4,
    description: [], source: { book: "Livro Básico", pdfPage: 16, bookPage: null },
    stats: { initiative: 5, perception: 8, defense: 23, fortitude: 10, reflex: 4, will: 16, hitPoints: 135, speedText: "6m (4q)", senses: null, defensesText: null, attributes: { str: 3, dex: 1, con: 3, int: 0, wis: 4, cha: 0 } },
    actions: [{ name: null, text: "Corpo a Corpo Machado de guerra +16 (3d6+12, x3)." }],
    abilities: [], equipment: "Machado de guerra, símbolo de Thwor.", treasure: "Padrão.", skillsText: null
};

export const hobgoblinMagoDeBatalha = {
    id: "hobgoblin-mago-de-batalha", name: "Hobgoblin Mago de Batalha", type: "humanoid", subtype: "hobgoblin", size: "Médio", challengeRating: 5,
    description: [], source: { book: "Livro Básico", pdfPage: 16, bookPage: null },
    stats: { initiative: 5, perception: 4, defense: 17, fortitude: 11, reflex: 5, will: 17, hitPoints: 120, speedText: "9m (6q)", senses: null, defensesText: null, attributes: { str: 3, dex: 1, con: 3, int: 4, wis: 0, cha: -1 } },
    actions: [{ name: null, text: "Corpo a Corpo Espada longa +14 (1d8+3, 19)." }],
    abilities: [], equipment: "Espada longa, essência de mana.", treasure: "Padrão.", skillsText: null
};

export const devoradorDeMedos = {
    id: "devorador-de-medos", name: "Devorador de Medos", type: "humanoid", subtype: "bugbear", size: "Médio", challengeRating: 8,
    description: [], source: { book: "Livro Básico", pdfPage: 18, bookPage: null },
    stats: { initiative: 11, perception: 9, defense: 31, fortitude: 21, reflex: 15, will: 8, hitPoints: 325, speedText: "9m (6q)", senses: null, defensesText: null, attributes: { str: 5, dex: 3, con: 3, int: 0, wis: 1, cha: 0 } },
    actions: [{ name: null, text: "Corpo a Corpo Machado de guerra x2 +26 (1d12+20, x3)." }],
    abilities: [], equipment: "Machado de guerra cruel.", treasure: "Metade.", skillsText: null
};

export const sombraDeThwor = {
    id: "sombra-de-thwor", name: "Sombra de Thwor", type: "humanoid", subtype: "hobgoblin", size: "Médio", challengeRating: 9,
    description: [], source: { book: "Livro Básico", pdfPage: 18, bookPage: null },
    stats: { initiative: 17, perception: 10, defense: 33, fortitude: 15, reflex: 21, will: 9, hitPoints: 295, speedText: "9m (6q)", senses: null, defensesText: null, attributes: { str: 5, dex: 5, con: 5, int: 2, wis: 2, cha: 0 } },
    actions: [
        { name: null, text: "Corpo a Corpo Duas machadinhas +27 (1d6+12 mais)." },
        { name: null, text: "À Distância Duas machadinhas +27 (1d6+12 mais 2d12)." }
    ],
    abilities: [], equipment: "Couro batido ajustado, machadinhas atrozes x4, peçonha potente x1d4.", treasure: "Padrão.", skillsText: null
};

export const nagahGuardiao = {
    id: "nagah-guardiao", name: "Nagah Guardião", type: "humanoid", subtype: "nagah", size: "Médio", challengeRating: 3,
    description: [], source: { book: "Livro Básico", pdfPage: 20, bookPage: null },
    stats: { initiative: 6, perception: 3, defense: 21, fortitude: 6, reflex: 11, will: 9, hitPoints: 45, speedText: "9m (6q)", senses: null, defensesText: null, attributes: { str: 4, dex: 3, con: 2, int: 0, wis: 0, cha: 0 } },
    actions: [{ name: null, text: "Corpo a Corpo Duas cimitarras +14 (1d6+6, 18) e cauda." }],
    abilities: [], equipment: "Cimitarras x2.", treasure: "Padrão.", skillsText: null
};

export const nagahMistica = {
    id: "nagah-mistica", name: "Nagah Mística", type: "humanoid", subtype: "nagah", size: "Médio", challengeRating: 6,
    description: [], source: { book: "Livro Básico", pdfPage: 20, bookPage: null },
    stats: { initiative: 8, perception: 6, defense: 20, fortitude: 6, reflex: 12, will: 18, hitPoints: 160, speedText: "9m (6q)", senses: null, defensesText: null, attributes: { str: 1, dex: 3, con: 2, int: 4, wis: 2, cha: 2 } },
    actions: [{ name: null, text: "Corpo a Corpo Adaga +18 (1d6+6, 19) e cauda +18 (1d6+6)." }],
    abilities: [], equipment: "Adaga, essência de mana.", treasure: "Padrão.", skillsText: null
};

export const cultistaDeSSzzaas = {
    id: "cultista-de-sszzaas", name: "Cultista de Sszzaas", type: "humanoid", subtype: "medusa", size: "Médio", challengeRating: 7,
    description: [], source: { book: "Livro Básico", pdfPage: 21, bookPage: null },
    stats: { initiative: 11, perception: 12, defense: 29, fortitude: 7, reflex: 14, will: 20, hitPoints: 160, speedText: "9m (6q)", senses: null, defensesText: null, attributes: { str: 0, dex: 2, con: 0, int: 4, wis: 4, cha: 5 } },
    actions: [{ name: null, text: "Corpo a Corpo Adaga +22 (1d4+4 mais veneno, 19)." }],
    abilities: [], equipment: "Adaga certeira, couraça, escudo leve, símbolo de Sszzaas.", treasure: "Padrão.", skillsText: null
};

export const finntrollCacador = {
    id: "finntroll-cacador", name: "Finntroll Caçador", type: "humanoid", subtype: "finntroll", size: "Médio", challengeRating: 2,
    description: [], source: { book: "Livro Básico", pdfPage: 22, bookPage: null },
    stats: { initiative: 7, perception: 7, defense: 19, fortitude: 6, reflex: 12, will: 4, hitPoints: 65, speedText: "9m (6q)", senses: null, defensesText: null, attributes: { str: 2, dex: 3, con: 3, int: 2, wis: 2, cha: -1 } },
    actions: [
        { name: null, text: "Corpo a Corpo Duas cimitarras +12 (1d6+5, 18)." },
        { name: null, text: "À Distância Besta pesada +12 (1d12+4, 19) ou rede +12." }
    ],
    abilities: [], equipment: "Besta pesada, cimitarra x2, rede, virotes x20.", treasure: "Padrão.", skillsText: null
};

export const finntrollFeitor = {
    id: "finntroll-feitor", name: "Finntroll Feitor", type: "humanoid", subtype: "finntroll", size: "Médio", challengeRating: 6,
    description: [], source: { book: "Livro Básico", pdfPage: 22, bookPage: null },
    stats: { initiative: 9, perception: 5, defense: 20, fortitude: 8, reflex: 12, will: 16, hitPoints: 155, speedText: "9m (6q)", senses: null, defensesText: null, attributes: { str: 0, dex: 3, con: 3, int: 4, wis: 0, cha: 2 } },
    actions: [{ name: null, text: "Corpo a Corpo Chicote +18 (1d3+10, 19)." }],
    abilities: [], equipment: "Chicote cruel.", treasure: "Dobro.", skillsText: null
};

export const tiranoDoTerceiro = {
    id: "tirano-do-terceiro", name: "Tirano do Terceiro", type: "humanoid", subtype: "humano", size: "Médio", challengeRating: 10,
    description: [], source: { book: "Livro Básico", pdfPage: 28, bookPage: null },
    stats: { initiative: 9, perception: 10, defense: 37, fortitude: 22, reflex: 10, will: 16, hitPoints: 370, speedText: "6m (4q)", senses: null, defensesText: null, attributes: { str: 6, dex: 0, con: 6, int: 2, wis: 1, cha: 4 } },
    actions: [{ name: null, text: "Corpo a Corpo Machado de batalha x2 +29 (2d8+14, x3) e." }],
    abilities: [], equipment: "Armadura completa de adamante, machado de batalha de adamante atroz.", treasure: "Dobro.", skillsText: null
};

export const maniacoLefou = {
    id: "maniaco-lefou", name: "Maníaco Lefou", type: "humanoid", subtype: "lefou", size: "Médio", challengeRating: 2,
    description: [], source: { book: "Livro Básico", pdfPage: 29, bookPage: null },
    stats: { initiative: 4, perception: 2, defense: 18, fortitude: 12, reflex: 7, will: 3, hitPoints: 25, speedText: "9m (6q)", senses: null, defensesText: null, attributes: { str: 5, dex: 1, con: 1, int: -1, wis: -1, cha: -2 } },
    actions: [{ name: null, text: "Corpo a Corpo Machado de guerra +16 (1d12+15, x3)." }],
    abilities: [], equipment: "Machado de guerra.", treasure: "Metade.", skillsText: null
};

export const sacerdoteDeAharadak = {
    id: "sacerdote-de-aharadak", name: "Sacerdote de Aharadak", type: "humanoid", subtype: "humano", size: "Médio", challengeRating: 10,
    description: [], source: { book: "Livro Básico", pdfPage: 31, bookPage: null },
    stats: { initiative: 17, perception: 15, defense: 38, fortitude: 16, reflex: 10, will: 22, hitPoints: 315, speedText: "9m (6q), voo 15m (10q)", senses: null, defensesText: null, attributes: { str: 4, dex: 2, con: 4, int: 2, wis: 5, cha: -1 } },
    actions: [{ name: null, text: "Corpo a Corpo Duas correntes de espinhos aberrantes +30." }],
    abilities: [], equipment: "Símbolo sagrado de Aharadak.", treasure: "Padrão.", skillsText: null
};

// ─── Humanoides de Ameaças de Arton ───────────────────────────────────────────

export const centauroChefe = {
    id: "centauro-chefe",
    name: "Centauro Chefe",
    type: "humanoid",
    subtype: "centauro",
    size: "Grande",
    challengeRating: 8,
    description: [],
    role: "solo",
    roleSource: "pdf-review",
    source: { book: "Ameaças de Arton", pdfFile: "elementais e ermos.pdf", pdfPage: 18, bookPage: 105 },
    stats: {
        initiative: 10, perception: 10, defense: 33, fortitude: 21, reflex: 15, will: 8,
        hitPoints: 320, speedText: "12m (8q)", senses: null, defensesText: null,
        attributes: { str: 5, dex: 2, con: 4, int: -1, wis: 2, cha: 1 }
    },
    actions: [{ name: null, text: "Corpo a Corpo Machado de guerra x2 +26 (3d6+18, x4) e." }],
    abilities: [], equipment: "Machado de guerra aumentado maciço, gibão de peles.", treasure: "Padrão.",
    skillsText: "Atletismo +13, Intimidação +9"
};

export const xamaDeMegalokk = {
    id: "xama-de-megalokk",
    name: "Xamã de Megalokk",
    type: "humanoid",
    subtype: "centauro",
    size: "Grande",
    challengeRating: 10,
    description: [],
    role: "special",
    roleSource: "pdf-review",
    source: { book: "Ameaças de Arton", pdfFile: "elementais e ermos.pdf", pdfPage: 18, bookPage: 105 },
    stats: {
        initiative: 12, perception: 16, defense: 31, fortitude: 16, reflex: 10, will: 22,
        hitPoints: 260, speedText: "12m (8q)", senses: null, defensesText: null,
        attributes: { str: 3, dex: 2, con: 4, int: -1, wis: 6, cha: 1 }
    },
    actions: [{ name: null, text: "Corpo a Corpo Clava +24 (1d8+15), mordida +24 (1d6+15) e." }],
    abilities: [], equipment: "Clava macabra aumentada, farrapos de ermitão, símbolo sagrado de Megalokk.", treasure: "Metade.",
    skillsText: "Adestramento +10, Intimidação +10, Religião +15"
};

export const nezumiBrutamontes = {
    id: "nezumi-brutamontes",
    name: "Nezumi Brutamontes",
    type: "humanoid",
    subtype: "nezumi",
    size: "Pequeno",
    challengeRating: 4,
    description: [],
    role: "solo",
    roleSource: "pdf-review",
    source: { book: "Ameaças de Arton", pdfFile: "ameacas de arton variadas.pdf", pdfPage: 3, bookPage: 162 },
    stats: {
        initiative: 5, perception: 4, defense: 23, fortitude: 16, reflex: 10, will: 4,
        hitPoints: 140, speedText: "9m (6q)", senses: null, defensesText: null,
        attributes: { str: 3, dex: 1, con: 3, int: -1, wis: 0, cha: -1 }
    },
    actions: [{ name: null, text: "Corpo a Corpo Marreta +16 (3d8+6) e mordida +16 (1d6+3, 19)." }],
    abilities: [], equipment: "Gibão de peles, marreta aumentada.", treasure: "Metade.",
    skillsText: "Atletismo +7, Intimidação +5"
};

// ─── Exportação principal ─────────────────────────────────────────────────────

export const humanoidCreatures = [
    // Manuais
    orcCombatant, orcChief, ogre, gnollMarauder, gnollFilibuster,
    // Livro Básico
    orcMutante, bandido, chefeBandido, guardaDeCidade, sargentoDaGuarda,
    centauroCombatente, centauroXama, trog, recrutaPurista, soldadoPurista,
    sargentoMor, capelaoDeGuerra, capitaoBaluarte, cavaleiroDeLeopardoSangrento,
    necromante, goblinSalteador, hobgoblinSoldado, goblinEngenhoqueiro,
    arautoDeThwor, hobgoblinMagoDeBatalha, devoradorDeMedos, sombraDeThwor,
    nagahGuardiao, nagahMistica, cultistaDeSSzzaas, finntrollCacador, finntrollFeitor,
    tiranoDoTerceiro, maniacoLefou, sacerdoteDeAharadak,
    // Ameaças de Arton
    centauroChefe, xamaDeMegalokk, nezumiBrutamontes
];
