// MVP deliberadamente sem perigos adicionais. A mecânica própria da arena é
// uma evolução importante registrada no planejamento, não uma rolagem incidental.
export function createForestBossEncounter(node) {
  node.contentType = "boss";
  node.encounterSeed = "forest-quimera-fixed-v1";
  node.fixedComposition = { creatures: [{ id: "quimera", quantity: 1 }], traps: [] };
  node.trap = null;
  node.resolvedEncounter = null;
  node.environment = {
    climate: [{ name: "Clima normal", effect: "Sem modificadores climáticos neste encontro." }],
    terrain: {
      name: "Floresta",
      effect: "Clareira ampla e plana. Nesta versão, a arena não possui perigos ou mecânicas especiais.",
      features: [{ name: "Clareira", effect: "Espaço aberto, sem cobertura, terreno difícil ou obstáculos na arena." }]
    }
  };
  node.challenge = { encounter: 8, creatures: 8, trap: 0, climate: 0, terrain: 0, total: 8 };
  const cells = Array(20 * 14).fill("floor");
  for (const [x, y] of [[2, 6], [2, 7], [3, 6], [3, 7]]) cells[y * 20 + x] = "party";
  for (const [x, y] of [[14, 6], [15, 6], [14, 7], [15, 7]]) cells[y * 20 + x] = "boss";
  node.fixedTacticalMap = {
    cells, width: 20, height: 14, enemyCount: 1, trapCount: 0, objectiveCount: 0,
    template: "forest-quimera-fixed-v1", climate: node.environment.climate, terrain: node.environment.terrain
  };
  return node;
}
