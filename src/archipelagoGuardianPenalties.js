const legacyPenalties = [
  { id: "hp", label: "−15% dos PV máximos", apply: stats => { stats.hitPoints = Math.ceil(stats.hitPoints * 0.85); } },
  { id: "defense", label: "−2 na Defesa", apply: stats => { stats.defense -= 2; } },
  { id: "initiative", label: "−4 na Iniciativa", apply: stats => { stats.initiative -= 4; } },
  { id: "saves", label: "−1 em Fortitude, Reflexos e Vontade", apply: stats => {
    for (const save of ["fortitude", "reflex", "will"]) stats[save] -= 1;
  } }
];

const elementalPenalties = ["ácido", "eletricidade", "fogo", "frio"].map(element => ({
  id: element,
  label: `Vulnerabilidade a ${element} (+50% de dano desse tipo, antes da RD)`,
  eligible: defenses => !defenses.includes(`imunidade a ${element}`) && !defenses.includes(`vulnerabilidade a ${element}`)
}));

const reductionPenalty = {
  id: "reduction",
  label: "−5 na maior redução de dano da ficha (mínimo 0; em empate, o mestre escolhe uma)",
  eligible: defenses => /redução de (?!tempo)/i.test(defenses)
};

const conditionPenalties = ["abalado", "atordoado", "caído", "desprevenido", "lento", "ofuscado", "vulnerável"].map(condition => ({
  id: condition,
  label: `Começa ${condition} até o fim do primeiro turno do guardião`,
  eligible: defenses => !defenses.split(";").some(part => part.includes("imunidade") &&
    (part.includes(condition) || condition === "abalado" && part.includes("medo")))
}));

export const guardianPenalties = [...legacyPenalties, ...elementalPenalties, reductionPenalty, ...conditionPenalties];
const penaltiesById = new Map(guardianPenalties.map(penalty => [penalty.id, penalty]));

export function getGuardianPenalty(id, sectorIndex) {
  return penaltiesById.get(id) ?? legacyPenalties[sectorIndex];
}

export function updateSavedGuardianVulnerabilities(stats) {
  if (!stats?.defensesText) return;
  for (const { id, label } of elementalPenalties) {
    stats.defensesText = stats.defensesText
      .replace(`Fraqueza 5 a ${id} (+5 de dano desse tipo após redução)`, label)
      .replace(`Vulnerabilidade a ${id} (+50% de dano após redução)`, label);
  }
}

export function getEligibleGuardianPenalties(creature) {
  const defenses = creature.stats.defensesText?.toLowerCase() ?? "";
  return guardianPenalties.filter(penalty => !penalty.eligible || penalty.eligible(defenses));
}
