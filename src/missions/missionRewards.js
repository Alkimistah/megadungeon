import { formatChallengeRating } from "../challenge.js";
import { getCrystalValueByChallenge } from "../economy/crystalValues.js";

export function calculateMissionReward({
  challenge,
  multiplier = 1,
  quantity = 1,
  turnInValue = null,
  bonus = null
}) {
  const unitValue = getCrystalValueByChallenge(challenge) || 0;
  const safeQuantity = Math.max(1, Number(quantity) || 1);
  const quantityFactor = Math.max(1, Math.log2(safeQuantity + 1) / 2);
  const resolvedTurnInValue = turnInValue ?? unitValue * safeQuantity;
  const effectiveMultiplier = Math.max(1, Number(multiplier) || 1);
  const completionBonus = Math.round(unitValue * quantityFactor * effectiveMultiplier);
  const totalPayout = resolvedTurnInValue + completionBonus;

  return {
    basis: resolvedTurnInValue > 0 ? "turn-in-value" : "challenge-value",
    bonus,
    challenge,
    completionBonus,
    effectiveMultiplier,
    multiplier,
    quantity: safeQuantity,
    quantityFactor: Number(quantityFactor.toFixed(2)),
    text: `T$ ${totalPayout} pela conclusão${resolvedTurnInValue > 0 ? " e entrega do objetivo" : ""}.`,
    totalPayout,
    turnInValue: resolvedTurnInValue,
    unitValue,
    challengeLabel: formatChallengeRating(challenge)
  };
}
