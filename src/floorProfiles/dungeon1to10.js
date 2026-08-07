import { assetUrl } from "../assetUrl.js";

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
        "Corredor troca de lugar: remove 1 sucesso ou revela atalho, conforme a cena.",
        "Porta aparece e some: pode levar a tesouro, rota curta ou sala sem saída.",
        "Vozes repetem frases do grupo: pode impor -1 no próximo teste mental/social.",
        "Sala se reconstrói sozinha: a dungeon apaga rastros e reduz a utilidade do mapa.",
        "Cristais falsos brilham: atraem o grupo para posição ruim ou revelam isca.",
        "Um corpo desaparece ao toque: indica que a dungeon recicla suas criaturas.",
        "Gravidade falha por instantes: Reflexos/Atletismo evita queda ou perda de item.",
        "Sombras agem com atraso: Intuição ou Vontade evita -1 no próximo teste.",
        "Parede respira lentamente: Fortitude ou Misticismo evita enjoo/tensão.",
        "A sala copia a última cena: repete risco já vencido em versão menor."
      ],
      explorationEvent: [
        "Sala vazia com marcas recentes: mostra sinais de outra exploração.",
        "Rota parcialmente bloqueada: próximo sucesso exige uma perícia diferente.",
        "Porta fecha atrás do grupo: se falharem de novo, role obstáculo.",
        "Corredor encurta: ganha 1 sucesso, mas deixa para trás item ou rota.",
        "Sala de descanso falsa: descansar exige Percepção/Ladinagem.",
        "Visão do andar seguinte: +2 no primeiro teste do próximo andar.",
        "Passagem estreita: falha coloca alguém isolado na próxima cena.",
        "Eco de combate distante: investigar, evitar ou acelerar o avanço.",
        "Marca de outro grupo: seguir dá pista, mas aumenta a próxima CD em +1.",
        "Rota circular evidente: remove 1 falha se o grupo mudar abordagem."
      ],
      omen: [
        "Pegadas recentes: revela se o próximo risco tende a criatura, armadilha ou anomalia.",
        "Cheiro de ácido, sangue ou ferrugem: +2 no próximo teste apropriado.",
        "Som de patrulha: permite emboscada, evasão ou escolha de posição.",
        "Cristal quebrado: indica combate recente e possível tipo de criatura.",
        "Teias, ossos ou marcas de lâmina: próximo risco fica menos surpreendente.",
        "Corrente de ar diferente: +2 em Sobrevivência ou Percepção para rota.",
        "Poeira interrompida: revela porta secreta, piso falso ou caminho usado.",
        "Sangue ainda fresco: próxima criatura pode estar ferida.",
        "Símbolo repetido na parede: Misticismo/Conhecimento prevê anomalia ou rota.",
        "Silêncio absoluto: próximo combate pode ser evitado com boa abordagem."
      ]
    },
    boss: {
      creatureId: "aranha-matriarca",
      supportCreatureId: "aranhas-filhotes",
      challengeOptions: [3, 4],
      reward: "Cristal verde"
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
      1: ["rato-gigante", "glop", "goblin-salteador", "orc-enfraquecido", "cascavel"],
      2: ["goblin-salteador", "bandido", "rato-gigante", "glop", "orc-enfraquecido", "lobo"],
      3: ["goblin-salteador", "hobgoblin-soldado", "goblin-engenhoqueiro", "orc-combatente", "glop"],
      4: ["orc-combatente", "orc-enfraquecido", "orc-chefe", "lobo", "gorlogg", "goblin-salteador"],
      5: ["orc-combatente", "orc-chefe", "hobgoblin-soldado", "goblin-engenhoqueiro", "gnoll-saqueador", "glop", "glooop"],
      6: ["glop", "glooop", "mamae-glop", "orc-enfraquecido", "orc-combatente", "goblin-engenhoqueiro"],
      7: ["aranhas-filhotes", "rato-gigante", "goblin-salteador", "orc-enfraquecido", "glop", "hobgoblin-soldado", "mimico-menor"],
      8: ["aranhas-filhotes", "aranha-gigante", "orc-combatente", "orc-chefe", "hobgoblin-soldado", "glooop", "mimico-menor"],
      9: ["aranhas-filhotes", "aranha-gigante", "orc-chefe", "hobgoblin-soldado", "goblin-engenhoqueiro", "glooop", "mamae-glop", "mimico-menor"]
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
  }
};
