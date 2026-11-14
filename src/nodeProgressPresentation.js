/** Apresentação derivada: não altera permissões nem o estado salvo. */
export function getNodeProgressPresentation(node, view) {
  if (!view.visible) return { kind: "hidden", label: "Caminho oculto", marker: null };
  if (view.completed) return { kind: "completed", label: "Encontro concluído", marker: "✓" };
  if (view.chosen && node.requiresCompletion) return { kind: "pending", label: "Encontro pendente", marker: "…" };
  if (view.chosen) return { kind: "chosen", label: "Rota percorrida", marker: null };
  if (view.explored) return { kind: "explored", label: "Exploração registrada", marker: null };
  if (view.attempted) return { kind: "attempted", label: "Tentativa registrada", marker: null };
  if (view.active) return { kind: "available", label: "Nodo disponível", marker: null };
  return { kind: "locked", label: "Nodo bloqueado", marker: null };
}

export function getNodeMapGuidance(levels, state, hasNextFloor, mapMatchesSelection = true) {
  if (!levels.length) return "";
  if (!mapMatchesSelection) return "Gere o mapa do andar selecionado para continuar.";
  const pending = levels.flat().some(node => node.requiresCompletion && state.isNodeChosen(node) && !state.isNodeCompleted(node));
  if (pending) return "Conclua o encontro escolhido para liberar a próxima rota.";
  const finished = levels.at(-1).some(node => state.isNodeChosen(node) && (!node.requiresCompletion || state.isNodeCompleted(node)));
  if (finished) return hasNextFloor ? "Andar concluído. Você já pode avançar." : "Etapa concluída.";
  return "Escolha um nodo disponível para continuar.";
}
