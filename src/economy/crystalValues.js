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
  [10, 1200]
]);

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
