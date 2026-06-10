export const DAMAGE_TYPE_SOURCE = {
  book: "Livro Básico",
  section: "Tipos de Dano"
};

export const DAMAGE_TYPES = {
  acid: {
    id: "acid",
    label: "Ácido",
    aliases: ["acido", "ácido"],
    category: "energy",
    linkedElement: "terra",
    description: "Dano causado por certos monstros, perigos naturais e itens alquímicos."
  },
  slashing: {
    id: "slashing",
    label: "Corte",
    aliases: ["corte"],
    category: "physical",
    description: "Dano causado por armas afiadas e garras."
  },
  electricity: {
    id: "electricity",
    label: "Eletricidade",
    aliases: ["eletricidade", "eletrico", "elétrico"],
    category: "energy",
    linkedElement: "ar",
    description: "Dano causado por relâmpagos, perigos naturais e algumas magias."
  },
  essence: {
    id: "essence",
    label: "Essência",
    aliases: ["essencia", "essência"],
    category: "magical",
    description: "Dano de energia mágica pura."
  },
  fire: {
    id: "fire",
    label: "Fogo",
    aliases: ["fogo"],
    category: "energy",
    linkedElement: "fogo",
    description: "Dano causado por calor, chamas naturais e magias."
  },
  cold: {
    id: "cold",
    label: "Frio",
    aliases: ["frio"],
    category: "energy",
    linkedElement: "água",
    description: "Dano causado por gelo, clima severo e algumas magias."
  },
  bludgeoning: {
    id: "bludgeoning",
    label: "Impacto",
    aliases: ["impacto"],
    category: "physical",
    description: "Dano causado por armas de contusão, ondas de choque, explosões, ataques sônicos e quedas."
  },
  light: {
    id: "light",
    label: "Luz",
    aliases: ["luz"],
    category: "divine",
    description: "Dano causado por magias e efeitos ligados a divindades bondosas."
  },
  piercing: {
    id: "piercing",
    label: "Perfuração",
    aliases: ["perfuracao", "perfuração"],
    category: "physical",
    description: "Dano causado por armas pontudas, mordidas e ataques similares."
  },
  psychic: {
    id: "psychic",
    label: "Psíquico",
    aliases: ["psiquico", "psíquico"],
    category: "mental",
    description: "Dano causado por ataques mentais e magias que afetam a mente."
  },
  darkness: {
    id: "darkness",
    label: "Trevas",
    aliases: ["trevas"],
    category: "divine",
    description: "Dano causado por efeitos necromânticos e ligados a divindades malignas."
  }
};

export const damageTypeCatalog = Object.values(DAMAGE_TYPES);

export function getDamageType(idOrAlias) {
  const normalized = String(idOrAlias || "").toLowerCase();

  return damageTypeCatalog.find((damageType) =>
    damageType.id === normalized ||
    damageType.label.toLowerCase() === normalized ||
    damageType.aliases.includes(normalized)
  ) || null;
}

export function isDamageType(idOrAlias) {
  return Boolean(getDamageType(idOrAlias));
}
