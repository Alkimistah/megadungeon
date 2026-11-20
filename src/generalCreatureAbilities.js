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
    summary: "Quando o ataque excede a Defesa por 10 ou mais, causa o dobro do dano. Mesmo se errar, causa metade do dano.",
    notes: [
      "Imune a manobras e a efeitos sem dano que afetem apenas uma criatura.",
      "Tem vulnerabilidade a dano de área.",
      "Um personagem com Trespassar que acerte o bando pode usar o poder para fazer um ataque adicional contra ele, uma vez por turno."
    ],
    source: { book: "Ameaças de Arton", pdfFile: "T20 Ameacas de Arton.pdf", pdfPage: 16, bookPage: 14 }
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
    summary: "O enxame pode entrar no espaço de personagens. No fim de seu turno, aplica automaticamente o efeito indicado em sua ficha aos personagens em seu espaço.",
    notes: [
      "Imune a manobras e a efeitos sem dano que afetem apenas uma criatura.",
      "Tem vulnerabilidade a dano de área e sofre metade do dano de ataques com armas.",
      "Estar dentro de um enxame conta como condição ruim para lançar magias."
    ],
    source: { book: "Ameaças de Arton", pdfFile: "T20 Ameacas de Arton.pdf", pdfPage: 17, bookPage: 15 }
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

// Quadros de regras compartilhadas por subtipo, exibidos no fim da ficha.
export const SHARED_SUBTYPE_RULES = {
  lefeu: {
    id: "lefeu",
    label: "Habilidades Lefeu",
    category: "subtype",
    subtype: "lefeu",
    summary: "Todos os lefeu partilham as seguintes habilidades (já contabilizadas em suas fichas).",
    notes: [
      "Imunidades. Lefeu são imunes a acertos críticos, ácido, cansaço, eletricidade, fogo, frio, luz, paralisia, metabolismo, metamorfose, trevas e veneno.",
      "Insanidade da Tormenta. Uma criatura que veja um ou mais lefeu deve fazer um teste de Vontade contra o lefeu de maior ND. Se falhar, perde os PM indicados (+1 PM para cada lefeu além do primeiro). Se for reduzida a 0 PM, fica confusa. Uma criatura só é afetada por esta habilidade uma vez por dia.",
      "Percepção Temporal. Um lefeu soma sua Sabedoria em testes de ataque, Defesa e Reflexos (já contabilizado na ficha).",
      "Visão Ampla. Um lefeu recebe +5 em Percepção e não pode ser flanqueado."
    ],
    source: { book: "Livro Básico", pdfFile: "T20 - Livro Básico - Jogo do Ano.pdf", pdfPage: 321, bookPage: 315 }
  },
  draconic: {
    id: "draconic",
    label: "Habilidades Dracônicas",
    category: "subtype",
    subtype: "dragão",
    summary: "Todos os dragões partilham as seguintes habilidades.",
    notes: [
      "Aura Aterradora. Uma criatura que comece seu turno em alcance longo de um dragão adulto ou mais velho fica apavorada (se tiver 4 níveis ou menos) ou abalada (se tiver 5 níveis ou mais) até o fim da cena (Vontade evita). Uma criatura que passe no teste de resistência fica imune a esta habilidade por um dia.",
      "Imunidades. Dragões são imunes a efeitos de atordoamento, cansaço, dano do tipo de seu sopro, metamorfose e paralisia.",
      "Magia Dracônica. Dragões adultos ou mais velhos podem lançar magias sem palavras mágicas, gestos ou concentração.",
      "Metamorfose Dracônica (Completa). Dragões jovens ou mais velhos podem se transformar em outras criaturas, como a magia Metamorfose (mas sem limitação para tamanhos menores que o seu). Um dragão morto reverte à sua forma original. Habilidade mágica.",
      "Resistência a Magia. Dragões filhotes têm resistência a magia +1. Esse bônus aumenta em +1 para cada categoria de idade acima de filhote.",
      "Sopro (Padrão). O dragão cospe energia em uma área. A área do sopro, o tipo de energia e o dano dependem do dragão. Recarga (movimento)."
    ],
    source: { book: "Livro Básico", pdfFile: "T20 - Livro Básico - Jogo do Ano.pdf", pdfPage: 317, bookPage: 311 }
  }
};

export function getSharedSubtypeRules(creature) {
  const subtype = String(creature?.subtype ?? "").toLowerCase();
  return Object.values(SHARED_SUBTYPE_RULES).filter(rule => rule.subtype === subtype);
}

export const generalCreatureAbilityCatalog = Object.values(GENERAL_CREATURE_ABILITIES);

export function getGeneralCreatureAbility(id) {
  return GENERAL_CREATURE_ABILITIES[id] ||
    generalCreatureAbilityCatalog.find((ability) => ability.label.toLowerCase() === String(id || "").toLowerCase()) ||
    null;
}

export function getGeneralCreatureAbilitiesByCategory(category) {
  return generalCreatureAbilityCatalog.filter((ability) => ability.category === category);
}
