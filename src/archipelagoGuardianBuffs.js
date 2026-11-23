export const islandGuardianBuffs = [
  {
    id: "defense", label: "+2 na Defesa",
    apply: stats => { stats.defense += 2; }
  },
  {
    id: "hp", label: "+15% dos PV máximos base",
    apply: (stats, base) => { stats.hitPoints += Math.ceil(base.hitPoints * 0.15); }
  },
  ...["ácido", "eletricidade", "fogo", "frio"].map(element => ({
    id: `rd-${element}`,
    label: `RD 5 contra ${element}`,
    eligible: defenses => !defenses.includes(`imunidade a ${element}`)
  })),
  {
    id: "reinforced-rd",
    label: "Aumenta em 5 a maior RD da ficha (em empate, o mestre escolhe uma)",
    eligible: defenses => /redução de (?!tempo)/.test(defenses)
  },
  ...[
    ["atordoado", "atordoamento"],
    ["lento", "lentidão"],
    ["ofuscado", "ofuscamento"]
  ].map(([penaltyId, condition]) => ({
    id: `immunity-${penaltyId}`,
    label: `Imunidade a ${condition} até o fim do segundo turno do guardião (2 turnos)`,
    incompatiblePenalty: penaltyId,
    eligible: defenses => !defenses.includes(`imunidade a ${condition}`) && !defenses.includes(`imunidade a ${penaltyId}`)
  }))
];
