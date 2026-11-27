export function getVolcanicVariant(base) {
  if (base.id !== "ber-baram") return null;

  const source = { book: "Masmorra de Práxis" };
  return {
    ...base,
    id: "ber-baram-da-caldeira",
    name: "Ber-baram da Caldeira",
    challengeRating: 9,
    regionalVariantOf: base.id,
    source,
    sources: [source],
    roleSource: "explicit",
    description: [
      "Placas de basalto cobrem o dorso deste elemental. A cada passada, a lava escorre pelas juntas da crosta.",
      "Adaptação do Ber-baram, de Ameaças de Arton."
    ],
    stats: { ...base.stats, defense: 31, hitPoints: 360, will: 8 },
    actions: [{ name: "Corpo a Corpo", text: "Marrada +27 (2d10+15 mais 3d6 fogo)." }],
    abilities: base.abilities.map(ability => ({ ...ability, text: ability.text.replace("CD 26", "CD 28") }))
  };
}
