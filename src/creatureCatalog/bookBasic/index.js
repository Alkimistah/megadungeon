import { bookBasicAnimalCreatures } from "./animals.js";
import { bookBasicConstructCreatures } from "./constructs.js";
import { bookBasicHumanoidCreatures } from "./humanoids.js";
import { bookBasicMonsterCreatures } from "./monsters.js";
import { bookBasicSpiritCreatures } from "./spirits.js";
import { bookBasicUndeadCreatures } from "./undead.js";

export { livroBasicoSourceByCreatureId } from "./sources.js";

export const bookBasicCreaturesByType = {
  animal: bookBasicAnimalCreatures,
  construct: bookBasicConstructCreatures,
  spirit: bookBasicSpiritCreatures,
  humanoid: bookBasicHumanoidCreatures,
  monster: bookBasicMonsterCreatures,
  undead: bookBasicUndeadCreatures
};

export const bookBasicCreatureCatalog = Object.values(bookBasicCreaturesByType).flat();
