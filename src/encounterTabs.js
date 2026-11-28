// Modelo puro das abas do encontro: quais abas existem, a ordem, os rótulos e o texto do botão de rerrolar.

export function isTrapNode(node) {
  return (node.contentType || node.type) === "trap";
}

export function getEncounterTabs(node) {
  const items = node.resolvedEncounter?.items || [];
  const creatures = items.filter(item => item.kind === "creature").length;
  const traps = items.filter(item => item.kind === "trap").length;
  const trapNode = isTrapNode(node);

  const tabs = [];
  const creatureTab = { kind: "creature", label: trapNode ? "Escolta" : "Inimigos", count: creatures };
  const trapTab = { kind: "trap", label: traps > 1 ? "Armadilhas" : "Armadilha", count: traps };

  if (trapNode) {
    if (traps) tabs.push(trapTab);
    if (creatures) tabs.push(creatureTab);
  } else {
    if (creatures) tabs.push(creatureTab);
    if (traps) tabs.push(trapTab);
  }
  return tabs;
}

export function getEncounterRerollLabel(node, kind) {
  if (kind === "trap") return "Rerrolar armadilha";
  return isTrapNode(node) ? "Rerrolar escolta" : "Rerrolar inimigos";
}
