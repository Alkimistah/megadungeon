export const GENERAL_CREATURE_ABILITY_SOURCE = {
  book: "Livro Básico",
  pdfFile: "habilidades gerais.pdf",
  pdfPages: [1, 2, 3, 4],
  bookPages: [14, 15, 16, 17]
};

export const GENERAL_CREATURE_ABILITIES = {
  improvedGrab: {
    id: "improvedGrab",
    label: "Agarrar Aprimorado",
    category: "combatManeuver",
    parameters: ["naturalWeapon", "targetLimit", "extraEffect"],
    summary: "Após acertar uma arma natural indicada, a criatura pode tentar agarrar com essa arma como ação livre.",
    notes: ["Enquanto usa a arma natural para agarrar, não pode usá-la para outros ataques."],
    source: { ...GENERAL_CREATURE_ABILITY_SOURCE, pdfPage: 1, bookPage: 14 }
  },
  sneakAttack: {
    id: "sneakAttack",
    label: "Ataque Furtivo",
    category: "damage",
    parameters: ["extraDamage", "extraEffect"],
    summary: "Uma vez por rodada, causa dano adicional contra alvo desprevenido ou flanqueado em corpo a corpo ou à distância curta.",
    source: { ...GENERAL_CREATURE_ABILITY_SOURCE, pdfPage: 1, bookPage: 14 }
  },
  band: {
    id: "band",
    label: "Bando",
    category: "group",
    icon: "bando",
    summary: "Representa vários indivíduos agindo como uma única ameaça, com dano parcial mesmo quando erra e dano dobrado em acertos muito altos.",
    notes: [
      "Imune a manobras e a efeitos sem dano que afetem apenas uma criatura.",
      "Tem vulnerabilidade a dano de área."
    ],
    source: { ...GENERAL_CREATURE_ABILITY_SOURCE, pdfPage: 1, bookPage: 14 }
  },
  fastHealing: {
    id: "fastHealing",
    label: "Cura Acelerada",
    category: "recovery",
    parameters: ["value", "blockedByDamageType"],
    summary: "No início do turno, recupera PV igual ao valor indicado.",
    notes: ["Tipos de dano listados após barra impedem essa recuperação.", "Não recupera perda de PV."],
    source: { ...GENERAL_CREATURE_ABILITY_SOURCE, pdfPage: 1, bookPage: 14 }
  },
  trip: {
    id: "trip",
    label: "Derrubar",
    category: "combatManeuver",
    parameters: ["weapon", "targetLimit", "extraEffect"],
    summary: "Após acertar uma arma indicada, a criatura pode tentar derrubar com essa arma como ação livre.",
    source: { ...GENERAL_CREATURE_ABILITY_SOURCE, pdfPage: 1, bookPage: 14 }
  },
  specialMovement: {
    id: "specialMovement",
    label: "Deslocamento Especial",
    category: "movement",
    parameters: ["movementModes"],
    summary: "A criatura possui modos de deslocamento além do deslocamento básico, como escalada, escavação, natação ou voo.",
    modes: {
      climbing: "Pode se mover por superfícies verticais ou invertidas, respeitando características da superfície.",
      burrowing: "Pode se mover sob terreno granular, como terra e areia, mas não rocha sólida.",
      swimming: "Pode se deslocar na água sem testes normais de Atletismo e ignora penalidades usuais de submersão.",
      flying: "Pode voar e encerrar deslocamento no ar; perde altitude se ficar sem voo ou ações."
    },
    source: { ...GENERAL_CREATURE_ABILITY_SOURCE, pdfPage: 2, bookPage: 15 }
  },
  disease: {
    id: "disease",
    label: "Doença",
    category: "condition",
    parameters: ["attack", "fortitudeDc", "disease"],
    summary: "Um ataque transmite doença; quem sofre dano faz Fortitude ou é contaminado.",
    source: { ...GENERAL_CREATURE_ABILITY_SOURCE, pdfPage: 2, bookPage: 15 }
  },
  swallow: {
    id: "swallow",
    label: "Engolir",
    category: "control",
    parameters: ["grabBonus", "internalDamage", "escapeDamage", "targetSizeLimit"],
    summary: "Se começar o turno agarrando uma criatura menor, pode engoli-la; a vítima fica agarrada, cega, protegida contra efeitos externos e sofre dano interno.",
    notes: ["A vítima pode escapar com teste apropriado ou causando dano interno suficiente."],
    source: { ...GENERAL_CREATURE_ABILITY_SOURCE, pdfPage: 2, bookPage: 15 }
  },
  swarm: {
    id: "swarm",
    label: "Enxame",
    category: "group",
    icon: "enxame",
    summary: "Aglomerado de seres menores que pode ocupar o espaço de personagens e aplicar efeito automático no fim do turno.",
    notes: [
      "Imune a manobras e a efeitos sem dano que afetem apenas uma criatura.",
      "Tem vulnerabilidade a dano de área e sofre metade do dano de ataques com armas.",
      "Estar dentro de um enxame conta como condição ruim para lançar magias."
    ],
    source: { ...GENERAL_CREATURE_ABILITY_SOURCE, pdfPage: 2, bookPage: 15 }
  },
  evasion: {
    id: "evasion",
    label: "Evasão",
    category: "defense",
    summary: "Quando passa em Reflexos contra efeito que reduziria dano à metade, não sofre dano.",
    notes: ["Exige liberdade de movimentos."],
    source: { ...GENERAL_CREATURE_ABILITY_SOURCE, pdfPage: 2, bookPage: 15 }
  },
  improvedEvasion: {
    id: "improvedEvasion",
    label: "Evasão Aprimorada",
    category: "defense",
    summary: "Funciona como Evasão; se falhar no Reflexos, sofre apenas metade do dano.",
    source: { ...GENERAL_CREATURE_ABILITY_SOURCE, pdfPage: 2, bookPage: 15 }
  },
  familiar: {
    id: "familiar",
    label: "Familiar",
    category: "companion",
    summary: "A criatura pode ser invocada como familiar.",
    source: { ...GENERAL_CREATURE_ABILITY_SOURCE, pdfPage: 3, bookPage: 16 }
  },
  scent: {
    id: "scent",
    label: "Faro",
    category: "sense",
    summary: "Contra inimigos que não possa ver, não fica desprevenida e sofre apenas 20% de chance de falha por camuflagem total em alcance curto.",
    source: { ...GENERAL_CREATURE_ABILITY_SOURCE, pdfPage: 3, bookPage: 16 }
  },
  fortification: {
    id: "fortification",
    label: "Fortificação",
    category: "defense",
    parameters: ["percent"],
    summary: "Chance percentual de ignorar dano adicional de acertos críticos e ataques furtivos.",
    source: { ...GENERAL_CREATURE_ABILITY_SOURCE, pdfPage: 3, bookPage: 16 }
  },
  immunity: {
    id: "immunity",
    label: "Imunidade",
    category: "defense",
    parameters: ["effect"],
    summary: "A criatura não sofre consequências diretas do efeito, condição, habilidade ou tipo de dano indicado.",
    source: { ...GENERAL_CREATURE_ABILITY_SOURCE, pdfPage: 3, bookPage: 16 }
  },
  incorporeal: {
    id: "incorporeal",
    label: "Incorpóreo",
    category: "body",
    summary: "Não tem corpo físico; só é afetada por armas e efeitos mágicos ou por outras criaturas incorpóreas, atravessa objetos sólidos e tem Força nula.",
    source: { ...GENERAL_CREATURE_ABILITY_SOURCE, pdfPage: 3, bookPage: 16 }
  },
  spellcasting: {
    id: "spellcasting",
    label: "Magias",
    category: "magic",
    parameters: ["casterLevel", "casterClass", "spellDc", "pmLimit", "spellList"],
    summary: "A criatura lança magias com nível, classe ou tipo de conjurador, CD, limite de PM e lista indicada na ficha.",
    source: { ...GENERAL_CREATURE_ABILITY_SOURCE, pdfPage: 3, bookPage: 16 }
  },
  greaterThanDeath: {
    id: "greaterThanDeath",
    label: "Maior que a Morte",
    category: "defense",
    summary: "Enquanto tiver pelo menos metade dos PV, é imune a efeitos de morte instantânea.",
    source: { ...GENERAL_CREATURE_ABILITY_SOURCE, pdfPage: 4, bookPage: 17 }
  },
  plantNature: {
    id: "plantNature",
    label: "Natureza Vegetal",
    category: "body",
    summary: "A criatura tem fisiologia vegetal; é imune a atordoamento e metamorfose, mas interage com efeitos voltados a plantas monstruosas.",
    source: { ...GENERAL_CREATURE_ABILITY_SOURCE, pdfPage: 4, bookPage: 17 }
  },
  partner: {
    id: "partner",
    label: "Parceiro",
    category: "companion",
    summary: "A criatura pode ser empregada como parceiro.",
    source: { ...GENERAL_CREATURE_ABILITY_SOURCE, pdfPage: 4, bookPage: 17 }
  },
  blindsight: {
    id: "blindsight",
    label: "Percepção às Cegas",
    category: "sense",
    parameters: ["range"],
    summary: "Usa sentidos não visuais; efeitos ligados à visão não a afetam e pode perceber por esses sentidos.",
    source: { ...GENERAL_CREATURE_ABILITY_SOURCE, pdfPage: 4, bookPage: 17 }
  },
  damageReduction: {
    id: "damageReduction",
    label: "Redução de Dano (RD)",
    category: "defense",
    parameters: ["value", "appliesTo", "bypass"],
    summary: "Ignora parte do dano sofrido; pode se aplicar ou deixar de se aplicar conforme tipos de dano ou características indicadas.",
    source: { ...GENERAL_CREATURE_ABILITY_SOURCE, pdfPage: 4, bookPage: 17 }
  },
  resistance: {
    id: "resistance",
    label: "Resistência a <Efeito>",
    category: "defense",
    parameters: ["effect", "bonus"],
    summary: "Recebe bônus em testes de resistência contra o tipo de efeito especificado.",
    source: { ...GENERAL_CREATURE_ABILITY_SOURCE, pdfPage: 4, bookPage: 17 }
  },
  lightSensitivity: {
    id: "lightSensitivity",
    label: "Sensibilidade a Luz",
    category: "weakness",
    summary: "Quando exposta à luz do sol ou similar, fica ofuscada.",
    source: { ...GENERAL_CREATURE_ABILITY_SOURCE, pdfPage: 4, bookPage: 17 }
  },
  lowLightVision: {
    id: "lowLightVision",
    label: "Visão na Penumbra",
    category: "sense",
    summary: "Enxerga em escuridão leve em alcance curto e ignora camuflagem leve causada por esse tipo de escuridão.",
    source: { ...GENERAL_CREATURE_ABILITY_SOURCE, pdfPage: 4, bookPage: 17 }
  },
  darkvision: {
    id: "darkvision",
    label: "Visão no Escuro",
    category: "sense",
    summary: "Enxerga em escuridão total em alcance curto e ignora camuflagem total causada por esse tipo de escuridão.",
    source: { ...GENERAL_CREATURE_ABILITY_SOURCE, pdfPage: 4, bookPage: 17 }
  },
  vulnerability: {
    id: "vulnerability",
    label: "Vulnerabilidade a <Efeito>",
    category: "weakness",
    parameters: ["effect"],
    summary: "Sofre 50% a mais de dano ou perda de vida do efeito ou característica especificada.",
    source: { ...GENERAL_CREATURE_ABILITY_SOURCE, pdfPage: 4, bookPage: 17 }
  }
};

export const generalCreatureAbilityCatalog = Object.values(GENERAL_CREATURE_ABILITIES);

export function getGeneralCreatureAbility(id) {
  return GENERAL_CREATURE_ABILITIES[id] ||
    generalCreatureAbilityCatalog.find((ability) => ability.label.toLowerCase() === String(id || "").toLowerCase()) ||
    null;
}

export function getGeneralCreatureAbilitiesByCategory(category) {
  return generalCreatureAbilityCatalog.filter((ability) => ability.category === category);
}
