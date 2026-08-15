import { assetUrl } from "../assetUrl.js";
import { dungeon1to10FinalEncounters } from "./dungeon1to10FinalEncounters.js";

export const dungeon1to10Profile = {
  id: "dungeon-1-10",
  label: "Andares de 1 a 10",
  mode: "extended-exploration",
  floors: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  hiddenNodeIcon: assetUrl("/assets/icons/unknown.svg"),
  recommendations: {
    encountersByFloor: {
      1: 3,
      2: 3,
      3: 3,
      4: 4,
      5: 4,
      6: 4,
      7: 5,
      8: 5,
      9: 5,
      10: 1
    },
    baseDcByFloor: {
      1: 12,
      2: 13,
      3: 14,
      4: 15,
      5: 16,
      6: 17,
      7: 18,
      8: 19,
      9: 20,
      10: 20
    }
  },
  extendedExploration: {
    progressByFloor: {
      1: { successesRequired: 3, failureLimit: 5, baseDc: 12 },
      2: { successesRequired: 3, failureLimit: 5, baseDc: 13 },
      3: { successesRequired: 3, failureLimit: 4, baseDc: 14 },
      4: { successesRequired: 4, failureLimit: 4, baseDc: 15 },
      5: { successesRequired: 4, failureLimit: 4, baseDc: 16 },
      6: { successesRequired: 4, failureLimit: 3, baseDc: 17 },
      7: { successesRequired: 5, failureLimit: 3, baseDc: 18 },
      8: { successesRequired: 5, failureLimit: 3, baseDc: 19 },
      9: { successesRequired: 5, failureLimit: 2, baseDc: 20 }
    },
    approaches: [
      { id: "acrobatics-balance", label: "Acrobacia: Equilíbrio", skill: "Acrobacia", dcModifier: 1, timeMultiplier: 1.1 },
      { id: "acrobatics-escape", label: "Acrobacia: Escapar", skill: "Acrobacia", dcModifier: 2, timeMultiplier: 1.2 },
      { id: "acrobatics-tight-space", label: "Acrobacia: Espaço apertado", skill: "Acrobacia", dcModifier: 1, timeMultiplier: 1.2 },
      { id: "athletics-climb", label: "Atletismo: Escalar", skill: "Atletismo", dcModifier: 1, timeMultiplier: 1.3 },
      { id: "athletics-jump", label: "Atletismo: Saltar", skill: "Atletismo", dcModifier: 2, timeMultiplier: 1.2 },
      { id: "knowledge-languages", label: "Conhecimento: Idiomas", skill: "Conhecimento", dcModifier: 2, timeMultiplier: 1.3 },
      { id: "knowledge-information", label: "Conhecimento: Informação", skill: "Conhecimento", dcModifier: 1, timeMultiplier: 1.3 },
      { id: "healing-necropsy", label: "Cura: Necropsia", skill: "Cura", dcModifier: 3, timeMultiplier: 1.4 },
      { id: "fortitude-resist", label: "Fortitude: Resistir", skill: "Fortitude", dcModifier: 2, timeMultiplier: 1.2 },
      { id: "fortitude-breath", label: "Fortitude: Manter fôlego", skill: "Fortitude", dcModifier: 2, timeMultiplier: 1.2 },
      { id: "stealth-hide", label: "Furtividade: Esconder-se", skill: "Furtividade", dcModifier: 1, timeMultiplier: 1.4 },
      { id: "stealth-follow", label: "Furtividade: Seguir", skill: "Furtividade", dcModifier: 2, timeMultiplier: 1.5 },
      { id: "war-terrain", label: "Guerra: Analisar terreno", skill: "Guerra", dcModifier: 1, timeMultiplier: 1.2 },
      { id: "intuition-omen", label: "Intuição: Pressentimento", skill: "Intuição", dcModifier: 0, timeMultiplier: 1 },
      { id: "intuition-follow-hunch", label: "Intuição: Seguir pressentimento", skill: "Intuição", dcModifier: 2, timeMultiplier: 1.1 },
      { id: "investigation-search", label: "Investigação: Procurar", skill: "Investigação", dcModifier: 0, timeMultiplier: 1.3 },
      { id: "thievery-lock", label: "Ladinagem: Abrir fechadura", skill: "Ladinagem", dcModifier: 1, timeMultiplier: 1.2 },
      { id: "thievery-sabotage", label: "Ladinagem: Sabotar", skill: "Ladinagem", dcModifier: 2, timeMultiplier: 1.4 },
      { id: "mysticism-detect", label: "Misticismo: Detectar magia", skill: "Misticismo", dcModifier: 0, timeMultiplier: 1.1 },
      { id: "mysticism-creature", label: "Misticismo: Identificar criatura", skill: "Misticismo", dcModifier: 2, timeMultiplier: 1.2 },
      { id: "mysticism-spell", label: "Misticismo: Identificar magia", skill: "Misticismo", dcModifier: 3, timeMultiplier: 1.2 },
      { id: "mysticism-information", label: "Misticismo: Informação", skill: "Misticismo", dcModifier: 2, timeMultiplier: 1.3 },
      { id: "craft-repair", label: "Ofício: Consertar", skill: "Ofício", dcModifier: 3, timeMultiplier: 1.6 },
      { id: "craft-identify", label: "Ofício: Identificar", skill: "Ofício", dcModifier: 2, timeMultiplier: 1.3 },
      { id: "perception-observe", label: "Percepção: Observar", skill: "Percepção", dcModifier: 0, timeMultiplier: 1 },
      { id: "perception-listen", label: "Percepção: Ouvir", skill: "Percepção", dcModifier: 1, timeMultiplier: 1 },
      { id: "reflexes-react", label: "Reflexos: Reagir", skill: "Reflexos", dcModifier: 2, timeMultiplier: 1 },
      { id: "religion-creature", label: "Religião: Identificar criatura", skill: "Religião", dcModifier: 2, timeMultiplier: 1.2 },
      { id: "religion-information", label: "Religião: Informação", skill: "Religião", dcModifier: 2, timeMultiplier: 1.3 },
      { id: "religion-rite", label: "Religião: Rito", skill: "Religião", dcModifier: 3, timeMultiplier: 1.5 },
      { id: "survival-creature", label: "Sobrevivência: Identificar criatura", skill: "Sobrevivência", dcModifier: 1, timeMultiplier: 1.1 },
      { id: "survival-orient", label: "Sobrevivência: Orientar-se", skill: "Sobrevivência", dcModifier: 0, timeMultiplier: 1.1 },
      { id: "survival-track", label: "Sobrevivência: Rastrear", skill: "Sobrevivência", dcModifier: 1, timeMultiplier: 1.3 },
      { id: "will-focus", label: "Vontade: Focar-se", skill: "Vontade", dcModifier: 2, timeMultiplier: 1 },
      { id: "animal-handling-calm", label: "Adestramento: Acalmar animal", skill: "Adestramento", dcModifier: 3, timeMultiplier: 1.2 },
      { id: "animal-handling-command", label: "Adestramento: Manejar animal", skill: "Adestramento", dcModifier: 3, timeMultiplier: 1.2 },
      { id: "diplomacy-attitude", label: "Diplomacia: Mudar atitude", skill: "Diplomacia", dcModifier: 3, timeMultiplier: 1.3 },
      { id: "diplomacy-persuasion", label: "Diplomacia: Persuasão", skill: "Diplomacia", dcModifier: 3, timeMultiplier: 1.3 },
      { id: "deception-disguise", label: "Enganação: Disfarce", skill: "Enganação", dcModifier: 3, timeMultiplier: 1.4 },
      { id: "deception-lie", label: "Enganação: Mentir", skill: "Enganação", dcModifier: 3, timeMultiplier: 1.2 },
      { id: "intimidation-coerce", label: "Intimidação: Coagir", skill: "Intimidação", dcModifier: 3, timeMultiplier: 1.2 },
      { id: "intimidation-frighten", label: "Intimidação: Assustar", skill: "Intimidação", dcModifier: 3, timeMultiplier: 1.2 },
      { id: "nobility-education", label: "Nobreza: Educação", skill: "Nobreza", dcModifier: 2, timeMultiplier: 1.2 }
    ],
    approachIdsByFloor: {
      1: ["perception-observe", "survival-orient", "acrobatics-tight-space", "knowledge-information", "athletics-climb", "thievery-lock", "intuition-follow-hunch", "perception-listen", "acrobatics-balance", "survival-track"],
      2: ["investigation-search", "mysticism-detect", "perception-listen", "war-terrain", "survival-track", "reflexes-react", "nobility-education", "knowledge-information", "thievery-sabotage", "stealth-follow"],
      3: ["survival-orient", "intuition-omen", "acrobatics-balance", "thievery-lock", "mysticism-creature", "fortitude-resist", "religion-rite", "perception-observe", "survival-track", "will-focus"],
      4: ["perception-observe", "investigation-search", "knowledge-languages", "survival-creature", "athletics-jump", "craft-identify", "healing-necropsy", "acrobatics-balance", "thievery-sabotage", "mysticism-detect"],
      5: ["mysticism-detect", "survival-orient", "war-terrain", "perception-listen", "thievery-sabotage", "will-focus", "diplomacy-persuasion", "investigation-search", "mysticism-information", "nobility-education"],
      6: ["investigation-search", "intuition-omen", "acrobatics-escape", "religion-information", "mysticism-information", "reflexes-react", "craft-repair", "knowledge-information", "perception-observe", "thievery-lock"],
      7: ["perception-observe", "intuition-omen", "stealth-hide", "survival-track", "mysticism-creature", "thievery-sabotage", "animal-handling-calm", "acrobatics-tight-space", "survival-creature", "fortitude-breath"],
      8: ["mysticism-detect", "intuition-omen", "survival-creature", "acrobatics-tight-space", "religion-creature", "stealth-follow", "intimidation-frighten", "investigation-search", "survival-track", "reflexes-react"],
      9: ["investigation-search", "survival-orient", "perception-listen", "war-terrain", "mysticism-spell", "will-focus", "deception-disguise", "mysticism-detect", "thievery-sabotage", "religion-information"]
    },
    baseMinutesByFloor: {
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9
    },
    allowManualFloorBacktracking: false,
    tiers: [
      {
        id: "floors-1-2",
        label: "Andares 1-2",
        floors: [1, 2],
        treasureChallenge: 0.5,
        finalEncounterCategory: "medium",
        d100: [
          { min: 1, max: 20, category: "explorationEvent" },
          { min: 21, max: 35, category: "omen" },
          { min: 36, max: 50, category: "easy" },
          { min: 51, max: 62, category: "obstacle" },
          { min: 63, max: 77, category: "medium" },
          { min: 78, max: 87, category: "anomaly" },
          { min: 88, max: 96, category: "hard" },
          { min: 97, max: 100, category: "treasure" }
        ]
      },
      {
        id: "floors-3-4",
        label: "Andares 3-4",
        floors: [3, 4],
        treasureChallenge: 1,
        finalEncounterCategory: "medium",
        d100: [
          { min: 1, max: 15, category: "explorationEvent" },
          { min: 16, max: 28, category: "omen" },
          { min: 29, max: 44, category: "easy" },
          { min: 45, max: 58, category: "obstacle" },
          { min: 59, max: 76, category: "medium" },
          { min: 77, max: 86, category: "anomaly" },
          { min: 87, max: 95, category: "hard" },
          { min: 96, max: 100, category: "treasure" }
        ]
      },
      {
        id: "floors-5-6",
        label: "Andares 5-6",
        floors: [5, 6],
        treasureChallenge: 2,
        finalEncounterCategory: "hard",
        d100: [
          { min: 1, max: 12, category: "explorationEvent" },
          { min: 13, max: 23, category: "omen" },
          { min: 24, max: 38, category: "easy" },
          { min: 39, max: 53, category: "obstacle" },
          { min: 54, max: 73, category: "medium" },
          { min: 74, max: 83, category: "anomaly" },
          { min: 84, max: 94, category: "hard" },
          { min: 95, max: 100, category: "treasure" }
        ]
      },
      {
        id: "floors-7-8",
        label: "Andares 7-8",
        floors: [7, 8],
        treasureChallenge: 2,
        finalEncounterCategory: "hard",
        d100: [
          { min: 1, max: 8, category: "explorationEvent" },
          { min: 9, max: 16, category: "omen" },
          { min: 17, max: 29, category: "easy" },
          { min: 30, max: 45, category: "obstacle" },
          { min: 46, max: 67, category: "medium" },
          { min: 68, max: 78, category: "anomaly" },
          { min: 79, max: 92, category: "hard" },
          { min: 93, max: 100, category: "treasure" }
        ]
      },
      {
        id: "floor-9",
        label: "Andar 9",
        floors: [9],
        treasureChallenge: 3,
        finalEncounterCategory: "hard",
        d100: [
          { min: 1, max: 6, category: "explorationEvent" },
          { min: 7, max: 13, category: "omen" },
          { min: 14, max: 25, category: "easy" },
          { min: 26, max: 42, category: "obstacle" },
          { min: 43, max: 64, category: "medium" },
          { min: 65, max: 76, category: "anomaly" },
          { min: 77, max: 90, category: "hard" },
          { min: 91, max: 100, category: "treasure" }
        ]
      }
    ],
    categories: {
      anomaly: { label: "Anomalia da dungeon", challengeByTier: { default: 0 } },
      easy: { label: "Encontro fácil", challengeByTier: { "floors-1-2": 0.25, "floors-3-4": 0.5, "floors-5-6": 1, "floors-7-8": 1, "floor-9": 1 } },
      explorationEvent: { label: "Evento de exploração", challengeByTier: { default: 0 } },
      hard: { label: "Encontro difícil", challengeByTier: { "floors-1-2": 1, "floors-3-4": 1, "floors-5-6": 2, "floors-7-8": 2, "floor-9": 4 } },
      medium: { label: "Encontro médio", challengeByTier: { "floors-1-2": 0.5, "floors-3-4": 1, "floors-5-6": 1, "floors-7-8": 2, "floor-9": 2 } },
      obstacle: { label: "Obstáculo ou armadilha", challengeByTier: { "floors-1-2": 0.25, "floors-3-4": 0.5, "floors-5-6": 1, "floors-7-8": 2, "floor-9": 3 } },
      omen: { label: "Presságio ou vantagem", challengeByTier: { default: 0 } },
      treasure: { label: "Tesouro ou achado útil", challengeByTier: { "floors-1-2": 0.5, "floors-3-4": 1, "floors-5-6": 2, "floors-7-8": 2, "floor-9": 3 } }
    },
    commonTables: {
      anomaly: [
        "Corredor troca de lugar: as paredes deslizam sem ruído e a rota desenhada no mapa deixa de corresponder ao caminho real.",
        "Porta aparece e some: uma porta surge na pedra como lembrança mal formada, prometendo tesouro, atalho ou uma sala sem saída.",
        "Vozes repetem frases do grupo: a masmorra devolve palavras recentes com vozes familiares, fora de ordem e com intenções erradas.",
        "Sala se reconstrói sozinha: pedras giram, poeira sobe e marcas deixadas pelo grupo desaparecem como se nunca tivessem existido.",
        "Cristais falsos brilham: pontos de luz verde e azul chamam o olhar para uma posição ruim, como se a própria sala preparasse uma isca.",
        "Um corpo desaparece ao toque: restos antigos se desfazem em pó e são absorvidos pelo piso, como matéria reaproveitada pela dungeon.",
        "Gravidade falha por instantes: o chão perde peso, objetos flutuam por um segundo e depois tudo despenca de uma vez.",
        "Sombras agem com atraso: cada movimento deixa uma sombra para trás, e por um instante ela parece escolher outro caminho.",
        "Parede respira lentamente: a pedra infla e contrai em ritmo úmido, enchendo o corredor com um cheiro morno e sufocante.",
        "A sala copia a última cena: móveis, marcas e ameaças reaparecem em miniatura, como uma repetição incompleta do perigo recém-vencido."
      ],
      explorationEvent: [
        "Sala vazia com marcas recentes: pegadas, cinzas e riscos nas paredes mostram que alguém passou por aqui pouco antes.",
        "Rota parcialmente bloqueada: pedras caídas e ferragens tortas forçam o grupo a abandonar o método mais óbvio.",
        "Porta fecha atrás do grupo: uma porta pesada se encaixa na parede, apagando o caminho de volta com um som seco.",
        "Corredor encurta: uma sequência impossível de portas coloca o grupo mais perto da saída, mas algo fica para trás no trecho ignorado.",
        "Sala de descanso falsa: bancos gastos, água parada e silêncio demais tentam convencer o grupo de que este lugar é seguro.",
        "Visão do andar seguinte: por uma fresta impossível, o grupo vê por um segundo o formato de corredores que ainda não alcançou.",
        "Passagem estreita: a pedra aperta ombros e mochilas, obrigando o grupo a avançar em fila e sem espaço para recuar.",
        "Eco de combate distante: aço, gritos e algo pesado caindo chegam de longe, distorcidos por corredores que talvez nem existam.",
        "Marca de outro grupo: um símbolo riscado às pressas promete orientação, mas também pode levar o grupo pelo mesmo erro de outros exploradores.",
        "Rota circular evidente: riscos repetidos na parede revelam que o grupo está perto de entender o padrão do andar."
      ],
      omen: [
        "Pegadas recentes: marcas no pó indicam se o próximo risco parece criatura, armadilha ou anomalia da própria masmorra.",
        "Cheiro de ácido, sangue ou ferrugem: um odor forte atravessa a pedra e entrega pistas que olhos sozinhos não veriam.",
        "Som de patrulha: passos ritmados e vozes baixas dão tempo para escolher emboscada, evasão ou posição.",
        "Cristal quebrado: lascas brilhantes e sangue seco sugerem combate recente e indicam que tipo de criatura passou por aqui.",
        "Teias, ossos ou marcas de lâmina: sinais de violência no caminho tornam o próximo perigo menos inesperado.",
        "Corrente de ar diferente: um sopro frio atravessa frestas invisíveis e denuncia uma rota que ainda não apareceu.",
        "Poeira interrompida: uma linha limpa no chão revela porta secreta, piso falso ou passagem usada recentemente.",
        "Sangue ainda fresco: gotas quentes levam a uma criatura que talvez já esteja ferida antes do encontro começar.",
        "Símbolo repetido na parede: o mesmo sinal aparece em ângulos impossíveis, como aviso de anomalia ou indicação de rota.",
        "Silêncio absoluto: por alguns instantes, até a respiração parece alta demais; o próximo combate talvez possa ser evitado com cuidado."
      ]
    },
    finalEncounters: dungeon1to10FinalEncounters,
    boss: {
      creatureId: "aranha-matriarca",
      supportCreatureId: "aranhas-filhotes",
      challengeOptions: [4],
      reward: "Cristal verde",
      rewardDetail: "Tesouro sem efeito mecânico; vale como cristal multiplicador, definido em mesa como dobro ou quádruplo de um cristal azul de mesmo ND."
    }
  },
  theme: {
    page: "#111112",
    header: "#23201d",
    headerBorder: "#73614b",
    surface: "#151412",
    surfaceAlt: "#211f1b",
    panel: "rgba(18, 17, 15, 0.96)",
    border: "#7a6a56",
    borderSoft: "#3f372d",
    action: "#5b4732",
    actionHover: "#745c42",
    scrollbarTrack: "#171513",
    scrollbarThumb: "#74634f",
    mapGlow: "rgba(70, 96, 128, 0.13)",
    tacticalColors: {
      wall: "#050505",
      floor: "#b9b0a1",
      party: "#2d6fc5",
      enemy: "#b72f28",
      hidden: "#c65a42",
      trap: "#2e9f50",
      pit: "#24593c",
      web: "#8a68b0",
      difficult: "#c07a36",
      mechanism: "#d4b13f",
      objective: "#3fa7b8",
      door: "#7a4c24",
      advantage: "#ece3cb",
      obstacle: "#6b6760",
      reinforcement: "#c65a42"
    },
    columnColors: [
      "#d5c2a1",
      "#8ea6c8",
      "#b58b58",
      "#dad7cb",
      "#8f7460",
      "#7f9f92",
      "#c26c5d"
    ]
  },
  creatureRules: {
    defaultPartySize: 4,
    challengeSource: "encounter",
    allowedCreatureIdsByFloor: {
      1: ["rato-gigante", "glop", "goblin-salteador", "orc-enfraquecido", "cascavel", "capanga","jiboia"],
      2: ["goblin-salteador", "bandido", "rato-gigante", "glop", "orc-enfraquecido", "lobo", "capanga", "bandido-ligeiro", "kobold-patrulheiro", "jiboia"],
      3: ["goblin-salteador", "hobgoblin-soldado", "goblin-engenhoqueiro", "orc-combatente", "glop", "bandido-ligeiro", "kobold-patrulheiro", "gatuno", "naja", "jiboia", "trog", "asa-assassina"],
      4: ["orc-combatente", "orc-enfraquecido", "orc-chefe", "lobo", "gorlogg", "goblin-salteador", "gatuno", "naja", "trog", "meio-orc-capanga", "meio-orc-bandoleiro", "asa-assassina"],
      5: ["orc-combatente", "orc-chefe", "hobgoblin-soldado", "goblin-engenhoqueiro", "gnoll-saqueador", "glop", "glooop", "meio-orc-capanga", "meio-orc-bandoleiro", "trog", "estirge", "asa-assassina", "kobold-veterano", "trog-combatente", "trog-cacador", "esqueleto", "turba-zumbi"],
      6: ["glop", "glooop", "mamae-glop", "orc-enfraquecido", "orc-combatente", "goblin-engenhoqueiro", "estirge", "asa-assassina", "kobold-explosivo", "kobold-veterano", "gargula", "trog-combatente", "trog-cacador", "esqueleto", "turba-zumbi"],
      7: ["aranhas-filhotes", "rato-gigante", "goblin-salteador", "orc-enfraquecido", "glop", "hobgoblin-soldado", "mimico-menor", "estirge", "kobold-explosivo", "kobold-veterano", "gargula"],
      8: ["aranhas-filhotes", "aranha-gigante", "orc-combatente", "orc-chefe", "hobgoblin-soldado", "glooop", "mimico-menor", "kobold-explosivo", "gargula", "cocatriz", "ogro-esqueleto", "sucuri"],
      9: ["aranhas-filhotes", "aranha-gigante", "orc-chefe", "hobgoblin-soldado", "goblin-engenhoqueiro", "glooop", "mamae-glop", "mimico-menor", "cocatriz", "ogro-esqueleto", "sucuri"]
    },
    defaultTypeWeights: [
      { type: "animal", weight: 22 },
      { type: "construct", weight: 6 },
      { type: "spirit", weight: 6 },
      { type: "humanoid", weight: 32 },
      { type: "monster", weight: 24 }
    ],
    typeWeightsByTerrain: {
      "Labirinto": [
        { type: "animal", weight: 18 },
        { type: "construct", weight: 8 },
        { type: "spirit", weight: 6 },
        { type: "humanoid", weight: 34 },
        { type: "monster", weight: 24 }
      ],
      "Covil aracnídeo": [
        { type: "animal", weight: 38 },
        { type: "construct", weight: 2 },
        { type: "spirit", weight: 4 },
        { type: "humanoid", weight: 12 },
        { type: "monster", weight: 38 }
      ]
    },
    groupGuidance: [
      "Os andares 1 a 10 assumem personagens de níveis 1 a 4.",
      "Use os NDs do tier como orçamento máximo de cena; evite ameaças dos andares 11 a 20.",
      "A Matriarca Aracnídea e suas crias são a referência de chefe para o andar 10."
    ]
  },
  trapRules: {
    sources: ["livroBasico", "ameacasArton"],
    minimumChallenge: 0.25,
    incidentalChallengeOffset: 1,
    incidentalChanceByRoomType: {
      normal: 0.04,
      elite: 0.08,
      boss: 0.12
    }
  },
  missionRules: {
    enabled: true,
    offerCountMin: 1,
    offerCountMax: 8,
    missionFloors: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    allowedCategories: [
      "extermination",
      "collection",
      "exploration",
      "recovery",
      "investigation",
      "rescue",
      "escort",
      "specialHunt",
      "trial",
      "anomalous"
    ],
    categoryWeights: {
      extermination: 22,
      collection: 13,
      exploration: 10,
      recovery: 10,
      investigation: 10,
      rescue: 8,
      escort: 6,
      specialHunt: 12,
      trial: 9,
      anomalous: 10
    },
    issuerWeights: [
      { id: "responsavel-posto-dungeon", label: "um responsável pelo posto da guilda", kind: "request", weight: 24 },
      { id: "pesquisador-dungeon", label: "um pesquisador da guilda", kind: "request", weight: 16, categories: ["collection", "exploration", "investigation", "anomalous"] },
      { id: "equipe-contencao-dungeon", label: "a equipe de contenção da masmorra", kind: "request", weight: 18, categories: ["extermination", "specialHunt", "trial", "anomalous"] },
      { id: "patrono-anonimo-dungeon", label: "um patrono anônimo", kind: "request", weight: 10 },
      { id: "pedido-mural-dungeon", label: "um pedido deixado no mural do posto", kind: "writtenRequest", weight: 12, categories: ["recovery", "rescue", "escort"] },
      { id: "registro-recuperado-dungeon", label: "um registro recuperado da masmorra", kind: "record", weight: 10, categories: ["exploration", "investigation", "recovery", "rescue"] },
      { id: "sinal-pulseira-dungeon", label: "missão sem fornecedor", kind: "signal", weight: 8, categories: ["anomalous", "exploration", "specialHunt", "trial"] }
    ],
    rewardChallengeByFloor: {
      1: 0.25,
      2: 0.5,
      3: 1,
      4: 1,
      5: 2,
      6: 2,
      7: 2,
      8: 2,
      9: 3
    },
    targetPools: {
      locations: [
        "uma sala com marcas recentes",
        "um corredor que mudou de lugar",
        "uma porta instável",
        "um trecho tomado por cristais falsos",
        "uma sala de descanso suspeita"
      ],
      materials: [
        "lascas de cristal contaminado",
        "amostras de teia endurecida",
        "poeira de pedra reconfigurada",
        "fragmentos de armadilha quebrada",
        "resíduo de gosma"
      ],
      objects: [
        "uma pulseira danificada",
        "um mapa riscado por outro grupo",
        "uma chave marcada com runas",
        "uma bolsa de ferramentas perdida",
        "um diário rasgado"
      ],
      mementos: [
        "um medalhão de um explorador que ficou para trás",
        "um diário de campo com uma dedicatória",
        "uma aliança presa a restos de equipamento",
        "um retrato protegido por couro encerado",
        "uma ferramenta marcada com iniciais"
      ],
      clues: [
        "pegadas que terminam na parede",
        "um símbolo repetido em ângulos impossíveis",
        "vestígios frescos sem origem evidente",
        "um eco que responde com atraso"
      ],
      challenges: [
        "atravessar uma passagem estreita",
        "desativar uma fechadura instável",
        "resistir à pressão mental da masmorra",
        "reconstruir uma rota segura"
      ],
      phenomena: [
        "gravidade falhando por instantes",
        "sombras agindo com atraso",
        "paredes respirando lentamente",
        "portas surgindo e sumindo"
      ]
    }
  }
};
