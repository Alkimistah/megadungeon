function partyFormation(x, y) {
  return [[x, y], [x + 1, y], [x, y + 1], [x + 1, y + 1]];
}

function shipLayout(name, effect, x, y, partyPositions, [minX, minY, maxX, maxY], zones) {
  return {
    landmark: { name, effect, x, y },
    partyPositions,
    enemyArea: { minX, minY, maxX, maxY },
    keepFootprintsInEnemyArea: true,
    zones: [
      { tile: "deck", x: 0, y: 0, width: 20, height: 14 },
      ...zones.map(([tile, left, top, width, height, label]) => ({
        tile, x: left, y: top, width, height, ...(label ? { label } : {})
      }))
    ]
  };
}

export const abandonedShipLayouts = {
  center: shipLayout("Caixão da carga", "O caixão se rompe no fim do combate e revela o fragmento.", 15, 4,
    [[2, 6], [3, 6], [4, 11], [5, 11]], [12, 6, 17, 10], [
      ["wall", 0, 0, 20, 2],
      ["wall", 0, 12, 4, 2],
      ["wall", 6, 12, 14, 2],
      ["wall", 0, 2, 2, 4],
      ["wall", 0, 9, 2, 3],
      ["wall", 18, 2, 2, 10],
      ["obstacle", 7, 4, 4, 5],
      ["obstacle", 15, 3, 2, 2],
      ["mechanism", 8, 7, 1, 1, "Ordem assinada (Memento)"]
    ]),
  byTask: {
    "Travar o badalo": shipLayout("Sino e badalo", "Trave o badalo antes que a badalada feche a escotilha.", 13, 5, partyFormation(3, 0), [7, 10, 14, 13], [
      ["wall", 0, 0, 2, 1],
      ["wall", 17, 0, 3, 1],
      ["obstacle", 5, 5, 2, 3],
      ["door", 12, 1, 3, 4]
    ]),
    "Manter a passagem da proa": shipLayout("Escotilha da proa", "Os inimigos procuram avançar por esta passagem.", 10, 5, partyFormation(1, 0), [10, 10, 16, 13], [
      ["wall", 15, 0, 5, 1],
      ["obstacle", 10, 1, 2, 4],
      ["obstacle", 2, 7, 3, 3],
      ["door", 7, 1, 3, 4]
    ]),
    "Baixar a corda": shipLayout("Amarra de subida", "Desate a amarra para baixar a corda entre os patamares.", 10, 5, partyFormation(1, 0), [12, 10, 19, 13], [
      ["wall", 7, 0, 5, 3],
      ["wall", 10, 7, 2, 3],
      ["bridge", 7, 3, 5, 2],
      ["bridge", 7, 5, 3, 2]
    ]),
    "Sustentar a ponte de cabos": shipLayout("Amarra da ponte", "A corda esticada mantém os dois patamares ligados.", 3, 7, partyFormation(6, 0), [0, 10, 6, 13], [
      ["wall", 15, 1, 5, 4],
      ["wall", 7, 8, 3, 4],
      ["bridge", 7, 3, 5, 4],
      ["bridge", 7, 7, 3, 1]
    ]),
    "Retirar a chave": shipLayout("Rede com a chave", "O nó da rede esconde a chave do marinheiro.", 15, 3, partyFormation(1, 0), [12, 10, 19, 13], [
      ["obstacle", 10, 0, 2, 7],
      ["obstacle", 2, 3, 5, 2],
      ["obstacle", 5, 8, 5, 2]
    ]),
    "Abrir a porta de serviço": shipLayout("Porta de serviço", "Uma porta estreita liga o alojamento ao corredor.", 10, 5, partyFormation(3, 0), [2, 10, 9, 13], [
      ["wall", 0, 0, 2, 1],
      ["obstacle", 10, 1, 5, 2],
      ["obstacle", 2, 3, 3, 4],
      ["obstacle", 12, 7, 5, 1],
      ["door", 7, 5, 3, 2]
    ]),
    "Salvar o registro": shipLayout("Registro do cirurgião", "O registro está sobre a mesa da enfermaria.", 15, 3, partyFormation(1, 0), [5, 10, 11, 13], [
      ["obstacle", 10, 0, 2, 5],
      ["obstacle", 5, 3, 2, 4],
      ["obstacle", 12, 7, 3, 3]
    ]),
    "Isolar a enfermaria": shipLayout("Porta interna", "A porta fecha a passagem para a enfermaria.", 10, 7, partyFormation(6, 0), [0, 10, 6, 13], [
      ["obstacle", 12, 1, 3, 4],
      ["obstacle", 2, 5, 5, 2],
      ["obstacle", 5, 8, 2, 2],
      ["door", 12, 7, 3, 1]
    ]),
    "Baixar a carga suspensa": shipLayout("Cabrestante da carga", "A manivela controla a carga suspensa.", 10, 5, partyFormation(1, 0), [12, 10, 19, 13], [
      ["obstacle", 10, 0, 5, 3],
      ["obstacle", 15, 5, 2, 3],
      ["water", 2, 3, 5, 7],
      ["water", 7, 8, 3, 2]
    ]),
    "Salvar o manifesto": shipLayout("Manifesto da carga", "O manifesto está no estrado, fora da água.", 15, 5, partyFormation(3, 0), [5, 10, 11, 13], [
      ["wall", 0, 0, 2, 1],
      ["obstacle", 15, 1, 2, 4],
      ["obstacle", 2, 5, 3, 3],
      ["water", 7, 1, 5, 7]
    ]),
    "Liberar o leme": shipLayout("Mecanismo do leme", "O leme está travado neste ponto.", 10, 5, partyFormation(6, 0), [0, 10, 6, 13], [
      ["wall", 15, 1, 5, 4],
      ["obstacle", 5, 3, 2, 4],
      ["obstacle", 12, 7, 3, 3]
    ]),
    "Recuperar a carta de navegação": shipLayout("Carta de navegação", "A carta está presa junto à amurada.", 13, 5, partyFormation(1, 0), [10, 10, 16, 13], [
      ["wall", 17, 0, 3, 1],
      ["obstacle", 12, 1, 3, 4],
      ["obstacle", 7, 8, 3, 2],
      ["water", 2, 3, 5, 4],
      ["water", 5, 7, 5, 1]
    ]),
  }
};
