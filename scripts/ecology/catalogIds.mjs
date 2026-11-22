// Ids das fichas lidos direto dos módulos por tipo, sem importar ecology.js
// (index.js valida ecology.js ao ser importado, e um ecology.js quebrado não pode travar o apply).

import { animalCreatures } from "../../src/creatureCatalog/animals.js";
import { constructCreatures } from "../../src/creatureCatalog/constructs.js";
import { humanoidCreatures } from "../../src/creatureCatalog/humanoids.js";
import { monsterCreatures } from "../../src/creatureCatalog/monsters.js";
import { spiritCreatures } from "../../src/creatureCatalog/spirits.js";
import { undeadCreatures } from "../../src/creatureCatalog/undead.js";
import { eventCreatures } from "../../src/creatureCatalog/events.js";
import { bestiaryCreatures } from "../../src/creatureCatalog/bestiary.js";

// As fichas existentes precedem as inclusões do Bestiário.
export function rawCreatures() {
  const seen = new Map();
  for (const list of [animalCreatures, constructCreatures, spiritCreatures, humanoidCreatures, monsterCreatures, undeadCreatures, eventCreatures, bestiaryCreatures]) {
    for (const creature of list) if (!seen.has(creature.id)) seen.set(creature.id, creature);
  }
  return seen;
}

export const catalogCreatureIds = () => new Set(rawCreatures().keys());
