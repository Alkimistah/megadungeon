import { createRng } from "./random.js";
import { rollBatch } from "./treasure/treasureBatch.js";

export function asIslandTreasureEvent(objective, challenge) {
  return {
    ...objective,
    type: "tesouro",
    title: "Tesouro escondido",
    description: "Uma marca antiga aponta para um esconderijo. O grupo pode recuperar o tesouro e seguir para o próximo setor.",
    challenge
  };
}

export function rollIslandSectorTreasure(challenge, seed) {
  const rng = createRng(seed);
  const rows = [{ challengeRating: challenge, quantity: 1, mode: "padrão", columns: "both" }];
  let gains;
  do {
    const [{ treasures: [treasure] }] = rollBatch(rows, rng);
    gains = treasure.states.flatMap(state => state.gains);
  } while (!gains.length);
  return { challenge, gains };
}
