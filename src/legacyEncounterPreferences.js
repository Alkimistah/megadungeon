const TERRAIN_AFFINITIES = {
  "Colinas": {
    ids: ["centauro-combatente", "centauro-chefe", "centauro-xama"],
    subtypes: ["centauro"]
  },
  "Floresta": {
    ids: ["lobo", "espada-da-floresta", "galhada-macho", "galhada-femea"],
    subtypes: ["orc", "goblin"]
  },
  "Pântano": {
    ids: ["glop", "glooop", "mamae-glop", "basilisco", "tendriculo"],
    subtypes: []
  },
  "Aquático": {
    ids: ["aquinne", "lacedon"],
    subtypes: ["elemental"]
  },
  "Planície aberta": {
    ids: ["orc-combatente", "gnoll-saqueador", "gnoll-filibusteiro"],
    subtypes: ["orc", "gnoll"]
  }
};

export const SUPPORT_CREATURE_IDS_BY_TYPE = {
  animal: ["rato-gigante", "lobo"],
  construct: ["soldado-mecanico", "galhada-macho", "galhada-femea"],
  spirit: ["terrier", "aquinne", "stagh"],
  humanoid: ["orc-combatente", "bandido", "gnoll-saqueador"],
  monster: ["glop", "glooop", "cocatriz"],
  undead: ["zumbi", "garra-zumbi", "carnical"]
};

function hasTerrainAffinity(creature, terrainName) {
  const affinity = TERRAIN_AFFINITIES[terrainName];

  if (!affinity) return false;
  if (affinity.ids.includes(creature.id)) return true;

  return creature.subtype && affinity.subtypes.includes(creature.subtype);
}

export function getLegacyCandidateWeight(creature, weight, targetChallenge, terrainName, preferredIds, preferredSubtype) {

  if (hasTerrainAffinity(creature, terrainName)) weight += 30;
  if (preferredIds.includes(creature.id)) weight += 18;
  if (creature.role === "minion" && targetChallenge <= 2) weight += 3;
  if (preferredSubtype !== null && creature.subtype === preferredSubtype) weight += 25;

  return weight;
}
