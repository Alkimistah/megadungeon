const CRYSTAL_VALUES_BY_CHALLENGE = new Map([
  [0.25, 5],
  [0.5, 10],
  [1, 20],
  [2, 40],
  [3, 75],
  [4, 120],
  [5, 200],
  [6, 300],
  [7, 450],
  [8, 650],
  [9, 900],
  [10, 1200],
  [11, 1600],
  [12, 2000],
  [13, 2600],
  [14, 3400],
  [15, 4400],
  [16, 5700],
  [17, 7400],
  [18, 9600],
  [19, 12500],
  [20, 16000]
]);

// Cor do cristal: azul (comum), verde (raro, chefes) e irregular (estimativa, depende da negociação).
export const CRYSTAL_COLORS = {
  azul: { label: "Azul", multiplier: 1 },
  verde: { label: "Verde", multiplier: 5 },
  irregular: { label: "Irregular", multiplier: 10 }
};

function normalizeChallenge(challenge) {
  if (challenge === "1/4") return 0.25;
  if (challenge === "1/2") return 0.5;

  const numeric = Number(challenge);
  if (!Number.isFinite(numeric)) return null;

  return numeric;
}

export function getCrystalValueByChallenge(challenge) {
  const normalized = normalizeChallenge(challenge);

  if (normalized === null) return null;
  if (CRYSTAL_VALUES_BY_CHALLENGE.has(normalized)) {
    return CRYSTAL_VALUES_BY_CHALLENGE.get(normalized);
  }

  const available = [...CRYSTAL_VALUES_BY_CHALLENGE.keys()].sort((a, b) => a - b);
  const closest = available.find((value) => value >= normalized) || available[available.length - 1];

  return CRYSTAL_VALUES_BY_CHALLENGE.get(closest);
}

export function getCrystalValueTable() {
  return [...CRYSTAL_VALUES_BY_CHALLENGE.entries()].map(([challenge, value]) => ({
    challenge,
    value
  }));
}

// Linha de cristais: quantidade × valor do ND × multiplicador da cor. Irregular é só estimativa.
export function crystalLine({ challenge, color, quantity }) {
  const entry = CRYSTAL_COLORS[color];
  if (!entry) throw new RangeError(`Cor de cristal inválida: ${color}`);
  const base = getCrystalValueByChallenge(challenge);
  if (base === null) throw new RangeError(`ND inválido: ${challenge}`);
  const unitValue = base * entry.multiplier;
  return { challenge, color, quantity, unitValue, total: unitValue * quantity, estimate: color === "irregular" };
}
