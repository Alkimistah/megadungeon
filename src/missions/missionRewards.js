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
  const completionBonus = Math.round(unitValue * quantityFactor * multiplier);
  const totalPayout = resolvedTurnInValue + completionBonus;

  return {
    basis: resolvedTurnInValue > 0 ? "turn-in-value" : "challenge-value",
    bonus,
    challenge,
    completionBonus,
    multiplier,
    quantityFactor: Number(quantityFactor.toFixed(2)),
    text: `T$ ${totalPayout} pela conclusão${resolvedTurnInValue > 0 ? " e entrega da prova" : ""}.`,
    totalPayout,
    turnInValue: resolvedTurnInValue,
    unitValue,
    challengeLabel: formatChallengeRating(challenge)
  };
}
