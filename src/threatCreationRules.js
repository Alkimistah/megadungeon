export const THREAT_RULE_SOURCE = {
  book: "Criação e Modificação de Ameaças",
  pdfFile: "criação e modificação de ameaças.pdf",
  pdfPages: {
    philosophy: [1, 2],
    movement: 3,
    challengeAndCombatStats: [4, 6, 7, 8],
    abilities: [6, 7, 8],
    secondaryStats: [8, 9],
    equipmentAndTreasure: 9,
    modifyingCreatures: [11, 12],
    bands: [12, 13]
  }
};

export const THREAT_ROLES = {
  solo: {
    id: "solo",
    label: "Solo",
    aliases: ["solo"],
    icon: "solo",
    description: "Criatura construída para enfrentar os personagens sozinha. Possui estatísticas equilibradas e muitos pontos de vida.",
    encounterUse: "Use principalmente para grandes monstros, vilões ou líderes que precisam sustentar um combate inteiro.",
    abilitiesPerTier: [1, 2]
  },
  minion: {
    id: "minion",
    label: "Lacaio",
    aliases: ["lacaio", "minion"],
    icon: "lacaio",
    description: "Criatura construída para enfrentar os personagens em grande quantidade. Causa ameaça real, mas tem PV e defesas menores.",
    encounterUse: "Use em bandos ou como tropa de apoio, normalmente com ND menor que o nível do grupo.",
    abilitiesPerTier: [1, 2]
  },
  special: {
    id: "special",
    label: "Especial",
    aliases: ["especial", "special"],
    icon: "especial",
    description: "Criatura com várias habilidades especiais ou feita para situações que não sejam combate direto.",
    encounterUse: "Use para conjuradores, trapaceiros, líderes de suporte e criaturas que exigem leitura cuidadosa da ficha.",
    abilitiesPerTier: [2, 3]
  }
};

export const THREAT_FUNCTIONS = {
  combatant: {
    id: "combatant",
    label: "Combatente",
    suggestedRole: "solo",
    description: "Ameaça focada em causar e resistir dano."
  },
  caster: {
    id: "caster",
    label: "Conjurador",
    suggestedRole: "special",
    description: "Ameaça centrada em magias, efeitos especiais, condições ou controle de terreno."
  },
  trickster: {
    id: "trickster",
    label: "Trapaceiro",
    suggestedRole: "special",
    description: "Ameaça que confunde, prejudica ou explora o ambiente."
  },
  henchman: {
    id: "henchman",
    label: "Assecla",
    suggestedRole: "minion",
    description: "Ameaça simples, feita para ser usada em quantidade."
  },
  boss: {
    id: "boss",
    label: "Chefão",
    suggestedRole: "solo",
    description: "Ameaça de destaque, geralmente usada sozinha ou como líder."
  }
};

export const THREAT_ROLE_INFERENCE_RULES = {
  source: "inferred",
  notes: [
    "Use apenas quando o ícone original da ficha não estiver disponível no cadastro.",
    "A inferência compara PV, Defesa e quantidade de habilidades com as tabelas de criação de ameaças.",
    "Cadastros podem sobrescrever o resultado com role e roleSource: \"explicit\"."
  ]
};

export const THREAT_TIERS = [
  { id: "beginner", label: "Iniciante", min: 0.25, max: 4, order: 1 },
  { id: "veteran", label: "Veterano", min: 5, max: 10, order: 2 },
  { id: "champion", label: "Campeão", min: 11, max: 16, order: 3 },
  { id: "legend", label: "Lenda", min: 17, max: 20, order: 4 },
  { id: "legendPlus", label: "L+", min: 22, max: 25, order: 5 }
];

export const THREAT_CHALLENGE_ORDER = [
  0.25,
  0.5,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  22,
  25
];

function row(challengeRating, attack, averageDamage, defense, strongSave, mediumSave, weakSave, hitPoints, abilityDc) {
  return {
    abilityDc,
    attack,
    averageDamage,
    challengeRating,
    defense,
    hitPoints,
    saves: {
      strong: strongSave,
      medium: mediumSave,
      weak: weakSave
    },
    tier: getThreatTier(challengeRating).id
  };
}

export const THREAT_PARAMETERS = {
  solo: [
    row(0.25, 3, 8, 11, 6, 0, -2, 7, 12),
    row(0.5, 6, 10, 14, 7, 3, -1, 15, 13),
    row(1, 11, 15, 16, 9, 5, 0, 35, 14),
    row(2, 13, 18, 19, 12, 7, 2, 70, 16),
    row(3, 15, 21, 21, 14, 9, 3, 105, 17),
    row(4, 16, 24, 23, 16, 10, 4, 140, 18),
    row(5, 17, 40, 24, 17, 11, 5, 200, 20),
    row(6, 18, 56, 27, 20, 12, 6, 240, 22),
    row(7, 20, 62, 31, 24, 14, 7, 280, 24),
    row(8, 21, 68, 33, 26, 15, 8, 320, 26),
    row(9, 21, 74, 34, 27, 15, 9, 360, 28),
    row(10, 22, 80, 36, 29, 16, 10, 400, 30),
    row(11, 24, 130, 41, 34, 18, 11, 550, 31),
    row(12, 26, 144, 43, 36, 20, 12, 600, 33),
    row(13, 26, 158, 44, 37, 20, 13, 650, 35),
    row(14, 28, 172, 46, 39, 22, 14, 700, 38),
    row(15, 28, 186, 50, 43, 22, 15, 750, 40),
    row(16, 30, 200, 53, 46, 24, 16, 800, 42),
    row(17, 30, 270, 54, 47, 24, 17, 1020, 44),
    row(18, 32, 288, 56, 49, 26, 18, 1080, 47),
    row(19, 32, 306, 59, 52, 26, 19, 1140, 47),
    row(20, 34, 324, 61, 54, 28, 20, 1200, 49),
    row(22, 36, 360, 65, 58, 30, 22, 2500, 51),
    row(25, 38, 500, 70, 65, 33, 25, 4000, 55)
  ],
  minion: [
    row(0.25, 7, 10, 9, 7, 0, -1, 4, 12),
    row(0.5, 9, 13, 11, 9, 3, 0, 6, 13),
    row(1, 11, 15, 10, 11, 5, 1, 9, 14),
    row(2, 14, 18, 12, 14, 7, 3, 14, 16),
    row(3, 16, 20, 14, 16, 9, 4, 21, 17),
    row(4, 17, 22, 15, 17, 10, 5, 28, 18),
    row(5, 20, 23, 16, 20, 11, 6, 40, 20),
    row(6, 24, 26, 17, 24, 12, 7, 48, 22),
    row(7, 26, 30, 19, 26, 14, 8, 56, 24),
    row(8, 27, 32, 20, 27, 15, 9, 64, 26),
    row(9, 29, 33, 20, 29, 15, 10, 72, 28),
    row(10, 34, 35, 21, 34, 16, 11, 80, 30),
    row(11, 36, 40, 23, 36, 18, 12, 110, 31),
    row(12, 37, 42, 25, 37, 20, 13, 120, 33),
    row(13, 39, 43, 25, 39, 20, 14, 130, 35),
    row(14, 43, 45, 27, 43, 22, 15, 140, 38),
    row(15, 46, 49, 27, 46, 22, 16, 150, 40),
    row(16, 47, 52, 29, 47, 24, 17, 160, 42),
    row(17, 49, 53, 29, 49, 24, 18, 204, 44),
    row(18, 52, 55, 31, 52, 26, 19, 216, 47),
    row(19, 54, 58, 31, 54, 26, 20, 228, 47),
    row(20, 56, 60, 33, 56, 28, 21, 240, 49),
    row(22, 60, 64, 35, 60, 30, 23, 500, 51),
    row(25, 67, 69, 37, 67, 33, 26, 800, 55)
  ],
  special: [
    row(0.25, 3, 8, 11, 4, 0, -2, 5, 14),
    row(0.5, 6, 10, 12, 5, 3, -1, 11, 15),
    row(1, 11, 15, 14, 7, 5, 0, 25, 16),
    row(2, 13, 18, 17, 10, 7, 2, 49, 18),
    row(3, 15, 21, 19, 12, 9, 3, 74, 19),
    row(4, 16, 24, 21, 14, 10, 4, 98, 20),
    row(5, 17, 40, 22, 15, 11, 5, 140, 22),
    row(6, 18, 56, 25, 18, 12, 6, 168, 24),
    row(7, 20, 62, 29, 22, 14, 7, 196, 26),
    row(8, 21, 68, 31, 24, 15, 8, 224, 28),
    row(9, 21, 74, 32, 25, 15, 9, 252, 30),
    row(10, 22, 80, 34, 27, 16, 10, 280, 32),
    row(11, 24, 130, 39, 32, 18, 11, 385, 33),
    row(12, 26, 144, 41, 34, 20, 12, 420, 35),
    row(13, 26, 158, 42, 35, 20, 13, 455, 37),
    row(14, 28, 172, 44, 37, 22, 14, 490, 40),
    row(15, 28, 186, 48, 41, 22, 15, 525, 42),
    row(16, 30, 200, 51, 44, 24, 16, 560, 44),
    row(17, 30, 270, 52, 45, 24, 17, 714, 46),
    row(18, 32, 288, 54, 47, 26, 18, 756, 49),
    row(19, 32, 306, 57, 50, 26, 19, 798, 49),
    row(20, 34, 324, 59, 52, 28, 20, 840, 51),
    row(22, 36, 360, 63, 55, 30, 22, 1750, 55),
    row(25, 38, 500, 67, 60, 33, 25, 2800, 60)
  ]
};

export const MOVEMENT_RECOMMENDATIONS = {
  terrestrial: {
    bipedSmallOrSmaller: { label: "Bípede (Pequeno ou menor)", slow: "4,5m", normal: "6m", fast: "9m" },
    bipedMedium: { label: "Bípede (Médio)", slow: "6m", normal: "9m", fast: "12m" },
    bipedLargeOrLarger: { label: "Bípede (Grande ou maior)", slow: "9m", normal: "12m", fast: "15m" },
    quadrupedSmallOrSmaller: { label: "Quadrúpede (Pequeno ou menor)", slow: "6m", normal: "9m", fast: "12m" },
    quadrupedMedium: { label: "Quadrúpede (Médio)", slow: "9m", normal: "12m", fast: "15m" },
    quadrupedLargeOrLarger: { label: "Quadrúpede (Grande ou maior)", slow: "12m", normal: "15m", fast: "18m" }
  },
  other: {
    flyingSmallOrSmaller: { label: "Voador (Pequeno ou menor)", slow: "12m", normal: "15m", fast: "18m" },
    flyingMedium: { label: "Voador (Médio)", slow: "15m", normal: "18m", fast: "24m" },
    flyingLargeOrLarger: { label: "Voador (Grande ou maior)", slow: "18m", normal: "24m", fast: "36m" },
    climbing: { label: "Escalador", slow: "4,5m", normal: "9m", fast: "12m" },
    burrowing: { label: "Escavador", slow: "4,5m", normal: "6m", fast: "9m" },
    swimming: { label: "Nadador", slow: "9m", normal: "15m", fast: "24m" }
  }
};

export const CREATURE_MODIFICATION_STEPS = [
  "Defina o novo conceito da criatura modificada.",
  "Escolha o novo ND.",
  "Compare as estatísticas atuais com a linha do papel e ND original, anote diferenças e aplique essas diferenças ao novo ND.",
  "Ajuste dano, CDs e habilidades; adicione ou remova habilidades principalmente quando o novo ND mudar de patamar.",
  "Mantenha atributos quando o conceito permitir; ajuste perícias em metade da mudança de ND.",
  "Ajuste equipamento e tesouro para o novo conceito."
];

export const BAND_CREATION_RULES = {
  challengeIncrease: {
    smallBand: [2, 4],
    largeBand: [6, 8]
  },
  notes: [
    "A composição do bando é descritiva e ajuda a definir ND e tamanho.",
    "O ND do bando deve ficar acima do ND da criatura-base.",
    "Um bando pequeno costuma ficar 2 a 4 pontos de ND acima da criatura-base.",
    "Um bando com dezenas ou centenas de indivíduos costuma ficar 6 a 8 pontos de ND acima.",
    "O tesouro mantém a categoria da criatura-base, mas usa a linha apropriada ao ND do bando; recursos especiais podem ter quantidade e CD ajustadas."
  ]
};

function normalizeRole(role) {
  const aliases = {
    especial: "special",
    lacaio: "minion",
    minion: "minion",
    solo: "solo",
    special: "special"
  };

  return aliases[role] || role;
}

export function getThreatRole(role) {
  const normalizedRole = normalizeRole(role);
  return THREAT_ROLES[normalizedRole] || null;
}

function getChallengeIndex(challengeRating) {
  return THREAT_CHALLENGE_ORDER.indexOf(challengeRating);
}

export function getThreatTier(challengeRating) {
  return THREAT_TIERS.find((tier) => challengeRating >= tier.min && challengeRating <= tier.max) ||
    THREAT_TIERS[THREAT_TIERS.length - 1];
}

export function getThreatParameters(role, challengeRating) {
  const normalizedRole = normalizeRole(role);
  const table = THREAT_PARAMETERS[normalizedRole];

  if (!table) {
    throw new Error(`Papel de ameaça desconhecido: ${role}`);
  }

  const parameters = table.find((entry) => entry.challengeRating === challengeRating);

  if (!parameters) {
    throw new Error(`ND sem parâmetros cadastrados: ${challengeRating}`);
  }

  return parameters;
}

function getCreatureAttackBonus(creature) {
  const attack = creature.actions?.find((action) => typeof action.bonus === "number");
  return attack?.bonus ?? null;
}

function getAbilityCount(creature) {
  return Array.isArray(creature.abilities) ? creature.abilities.length : 0;
}

function getRoleDistance(creature, role) {
  const stats = creature.stats || {};
  const parameters = getThreatParameters(role, creature.challengeRating);
  const attackBonus = getCreatureAttackBonus(creature);
  const abilityCount = getAbilityCount(creature);
  const defenseDistance = typeof stats.defense === "number"
    ? Math.abs(stats.defense - parameters.defense) / Math.max(parameters.defense, 1)
    : 0.35;
  const hpDistance = typeof stats.hitPoints === "number"
    ? Math.abs(stats.hitPoints - parameters.hitPoints) / Math.max(parameters.hitPoints, 1)
    : 0.35;
  const attackDistance = typeof attackBonus === "number"
    ? Math.abs(attackBonus - parameters.attack) / Math.max(Math.abs(parameters.attack), 1)
    : 0.2;
  const abilityGuidance = getAbilityCountRecommendation(role, creature.challengeRating);
  const abilityDistance = abilityCount > abilityGuidance.max ? 0.15 : 0;

  return defenseDistance + hpDistance + attackDistance + abilityDistance;
}

function inferRoleReason(creature, role) {
  const stats = creature.stats || {};
  const abilities = getAbilityCount(creature);
  const attackBonus = getCreatureAttackBonus(creature);
  const roleLabel = THREAT_ROLES[role].label;

  return `${roleLabel} inferido por comparação de ND ${creature.challengeRating}, PV ${stats.hitPoints ?? "?"}, Defesa ${stats.defense ?? "?"}, ataque ${attackBonus ?? "?"} e ${abilities} habilidade(s).`;
}

export function inferThreatRole(creature) {
  const explicitRole = getThreatRole(creature?.role);

  if (explicitRole) {
    return {
      confidence: "explicit",
      reason: "Papel informado diretamente no cadastro da criatura.",
      role: explicitRole.id,
      source: creature.roleSource || "explicit"
    };
  }

  if (!creature || typeof creature.challengeRating !== "number") {
    return {
      confidence: "unknown",
      reason: "Criatura sem ND numérico suficiente para inferência.",
      role: null,
      source: THREAT_ROLE_INFERENCE_RULES.source
    };
  }

  const ranked = Object.keys(THREAT_ROLES)
    .map((role) => ({ distance: getRoleDistance(creature, role), role }))
    .sort((a, b) => a.distance - b.distance);
  const best = ranked[0];
  const runnerUp = ranked[1];

  return {
    confidence: runnerUp && runnerUp.distance - best.distance < 0.2 ? "low" : "medium",
    reason: inferRoleReason(creature, best.role),
    role: best.role,
    source: THREAT_ROLE_INFERENCE_RULES.source
  };
}

export function getThreatParametersWithOffsets(role, challengeRating, challengeOffsets = {}) {
  const normalizedRole = normalizeRole(role);
  const baseIndex = getChallengeIndex(challengeRating);

  if (baseIndex < 0) {
    throw new Error(`ND sem parâmetros cadastrados: ${challengeRating}`);
  }

  const base = getThreatParameters(normalizedRole, challengeRating);

  return Object.fromEntries(
    Object.entries(base).map(([key, value]) => {
      if (key === "saves") {
        return [key, Object.fromEntries(
          Object.entries(value).map(([saveKey, saveValue]) => [
            saveKey,
            getOffsetValue(normalizedRole, baseIndex, challengeOffsets[`saves.${saveKey}`], (entry) => entry.saves[saveKey]) ?? saveValue
          ])
        )];
      }

      return [
        key,
        getOffsetValue(normalizedRole, baseIndex, challengeOffsets[key], (entry) => entry[key]) ?? value
      ];
    })
  );
}

function getOffsetValue(role, baseIndex, offset = 0, selector) {
  if (!offset) return null;

  const targetIndex = Math.min(Math.max(baseIndex + offset, 0), THREAT_CHALLENGE_ORDER.length - 1);
  const targetChallenge = THREAT_CHALLENGE_ORDER[targetIndex];

  return selector(getThreatParameters(role, targetChallenge));
}

export function getAbilityCountRecommendation(role, challengeRating) {
  const normalizedRole = normalizeRole(role);
  const tier = getThreatTier(challengeRating);
  const [minPerTier, maxPerTier] = THREAT_ROLES[normalizedRole].abilitiesPerTier;

  return {
    max: maxPerTier * tier.order,
    min: minPerTier * tier.order,
    tier: tier.id,
    tierLabel: tier.label
  };
}

export function getMovementRecommendation(movementGroup, movementKind, pace = "normal") {
  const group = MOVEMENT_RECOMMENDATIONS[movementGroup];
  const movement = group?.[movementKind];

  if (!movement) {
    throw new Error(`Deslocamento desconhecido: ${movementGroup}.${movementKind}`);
  }

  return movement[pace] || movement.normal;
}

export function createThreatSkeleton({
  challengeRating,
  name,
  role = "solo",
  size,
  type,
  subtype = null
}) {
  const normalizedRole = normalizeRole(role);
  const parameters = getThreatParameters(normalizedRole, challengeRating);
  const roleMetadata = getThreatRole(normalizedRole);

  return {
    abilities: [],
    abilityGuidance: getAbilityCountRecommendation(normalizedRole, challengeRating),
    actions: [
      {
        averageDamageBudget: parameters.averageDamage,
        bonus: parameters.attack,
        kind: "Ataque principal"
      }
    ],
    challengeRating,
    name,
    role: normalizedRole,
    roleMetadata,
    roleSource: "explicit",
    size,
    sourceRules: THREAT_RULE_SOURCE,
    stats: {
      defense: parameters.defense,
      hitPoints: parameters.hitPoints,
      saves: { ...parameters.saves }
    },
    subtype,
    type
  };
}

function getCombatStatDeltas(creature, baseParameters) {
  const stats = creature.stats || {};

  return {
    defense: typeof stats.defense === "number" ? stats.defense - baseParameters.defense : 0,
    hitPoints: typeof stats.hitPoints === "number" ? stats.hitPoints - baseParameters.hitPoints : 0,
    saves: {
      fortitude: typeof stats.fortitude === "number" ? stats.fortitude : null,
      reflex: typeof stats.reflex === "number" ? stats.reflex : null,
      will: typeof stats.will === "number" ? stats.will : null
    }
  };
}

export function createModificationPlan(creature, {
  baseRole = "solo",
  targetChallengeRating,
  targetRole = baseRole
}) {
  const baseParameters = getThreatParameters(baseRole, creature.challengeRating);
  const targetParameters = getThreatParameters(targetRole, targetChallengeRating);
  const deltas = getCombatStatDeltas(creature, baseParameters);
  const challengeDelta = targetChallengeRating - creature.challengeRating;
  const originalTier = getThreatTier(creature.challengeRating);
  const targetTier = getThreatTier(targetChallengeRating);

  return {
    challengeDelta,
    deltas,
    keepAbilityCountUnlessTierChanges: originalTier.id === targetTier.id,
    skillAdjustment: challengeDelta / 2,
    target: {
      challengeRating: targetChallengeRating,
      role: normalizeRole(targetRole),
      stats: {
        defense: targetParameters.defense + deltas.defense,
        hitPoints: targetParameters.hitPoints + deltas.hitPoints,
        saves: { ...targetParameters.saves }
      }
    },
    targetAbilityGuidance: getAbilityCountRecommendation(targetRole, targetChallengeRating)
  };
}

export function createBandTemplate(baseCreature, {
  composition,
  targetChallengeRating,
  targetRole = "minion",
  targetSize
}) {
  const template = createThreatSkeleton({
    challengeRating: targetChallengeRating,
    name: `Bando de ${baseCreature.name}`,
    role: targetRole,
    size: targetSize || baseCreature.size,
    subtype: baseCreature.subtype ? `bando, ${baseCreature.subtype}` : "bando",
    type: baseCreature.type
  });

  return {
    ...template,
    baseCreatureId: baseCreature.id,
    composition,
    notes: BAND_CREATION_RULES.notes,
    treasureCategory: baseCreature.treasure || null
  };
}

