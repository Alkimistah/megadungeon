import { quimera } from "./creatureCatalog/monsters.js";
import { getDamageType } from "./damageTypes.js";
import { getCreatureUnits, withCreatureHealthChange, withLastHealthChangeUndone } from "./encounterCreatureHealth.js";
import { createRng, pick, randomInt } from "./random.js";

export const CHIMERA_DAMAGE_REDUCTION = 5;

const weaknesses = {
  "Águia": ["bludgeoning", "electricity"],
  Bode: ["bludgeoning", "piercing"],
  Dragão: ["cold", "electricity"],
  Gorlogg: ["bludgeoning", "psychic"],
  Hidra: ["fire", "acid"],
  Javali: ["piercing", "psychic"],
  Leão: ["bludgeoning", "slashing"],
  Serpente: ["slashing", "cold"],
  Tigre: ["piercing", "electricity"],
  Tubarão: ["electricity", "slashing"]
};

export function prepareChimeraHeads(levels, mapSeed) {
  const boss = levels.flat().find(node => node.type === "boss" && node.fixedComposition?.creatures?.[0]?.id === quimera.id);
  if (!boss || boss.chimeraHeads) return;
  const rng = createRng(`${mapSeed}:chimera-heads-v1`);
  const available = Object.keys(weaknesses);
  boss.chimeraHeads = Array.from({ length: 4 }, () => {
    const [name] = available.splice(randomInt(rng, 0, available.length - 1), 1);
    return { name, weakness: pick(rng, weaknesses[name]) };
  });
}

export function getChimeraHeadAbility(name) {
  return quimera.abilities.find(ability => ability.name === name);
}

export function withChimeraDamage(encounter, item, head, damageType, amount) {
  const type = getDamageType(damageType);
  if (!type || !Number.isSafeInteger(amount) || amount < 1) return encounter;
  const [unit] = getCreatureUnits(item);
  if (!unit?.current) return encounter;
  const weakness = head?.weakness === type.id;
  const reduction = weakness ? 0 : Math.min(amount, CHIMERA_DAMAGE_REDUCTION);
  const lost = Math.min(unit.current, amount - reduction);
  const next = withCreatureHealthChange(encounter, item, 0, lost);
  const name = head?.name;
  const stunned = weakness && !encounter.chimera?.stuns?.[name];
  return {
    ...next,
    ...(stunned ? {
      chimera: { ...next.chimera, stuns: { ...next.chimera?.stuns, [name]: "stunned" } },
      lastHealthEdit: { ...next.lastHealthEdit, chimeraStun: name }
    } : {}),
    temporaryAdjustments: true,
    lastChimeraHit: { target: name || "Corpo", type: type.label, amount, reduction, lost }
  };
}

export function withChimeraHealthUndone(encounter) {
  const next = withLastHealthChangeUndone(encounter);
  if (next === encounter) return encounter;
  const { lastChimeraHit, ...restored } = next;
  const name = encounter.lastHealthEdit.chimeraStun;
  if (!name) return restored;
  const stuns = { ...restored.chimera.stuns };
  delete stuns[name];
  return { ...restored, chimera: { ...restored.chimera, stuns } };
}

export function withChimeraTurnEnded(encounter) {
  const stuns = encounter.chimera?.stuns;
  if (!Object.values(stuns || {}).includes("stunned")) return encounter;
  const { lastHealthEdit, ...next } = encounter;
  return {
    ...next,
    ...(!lastHealthEdit?.chimeraStun && lastHealthEdit ? { lastHealthEdit } : {}),
    chimera: {
      ...encounter.chimera,
      stuns: Object.fromEntries(Object.keys(stuns).map(name => [name, "used"]))
    }
  };
}

export function withChimeraBreath(encounter, heads, ready) {
  if (!heads.some(head => head.name === "Dragão")) return encounter;
  if ((encounter.chimera?.breathReady !== false) === ready) return encounter;
  if (!ready && encounter.chimera?.stuns?.Dragão === "stunned") return encounter;
  return { ...encounter, chimera: { ...encounter.chimera, breathReady: ready } };
}
