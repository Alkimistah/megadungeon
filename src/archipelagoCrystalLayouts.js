function crystalLayout(name, effect, x, y, partyX, partyY, [minX, minY, maxX, maxY], zones) {
  return {
    landmark: { name, effect, x, y },
    partyPositions: [[partyX, partyY], [partyX + 1, partyY], [partyX, partyY + 1], [partyX + 1, partyY + 1]],
    enemyArea: { minX, minY, maxX, maxY },
    keepFootprintsInEnemyArea: true,
    zones: zones.map(([tile, left, top, width, height]) => ({ tile, x: left, y: top, width, height }))
  };
}

export const crystalLayouts = {
  center: crystalLayout("Passagem sob o prisma", "Faça as duas ações da tarefa adjacente à passagem. A luz percorre os focos A, B e C no início de cada rodada.", 10, 5, 3, 0, [5, 9, 19, 13], [
    ["obstacle", 17, 0, 3, 1],
    ["polished-crystal", 2, 3, 5, 3],
    ["solar-focus-a", 10, 1, 5, 3],
    ["solar-focus-b", 15, 4, 5, 3],
    ["solar-focus-c", 2, 6, 5, 3]
  ]),
  byTask: {
    "Firmar a saída da galeria": crystalLayout("Fenda de saída", "A abertura que dá acesso às nervuras de piso firme.", 17, 9, 6, 0, [5, 10, 11, 13], [
      ["obstacle", 0, 0, 5, 1],
      ["obstacle", 15, 0, 5, 1],
      ["polished-crystal", 5, 3, 5, 4],
      ["polished-crystal", 7, 7, 3, 1],
      ["crystal-shards", 10, 5, 5, 3]
    ]),
    "Resgatar na rachadura": crystalLayout("Rachadura", "Um explorador ficou preso por baixo das placas.", 14, 6, 3, 0, [7, 10, 14, 13], [
      ["obstacle", 0, 0, 2, 1],
      ["obstacle", 12, 1, 8, 2],
      ["obstacle", 17, 3, 3, 2],
      ["polished-crystal", 7, 3, 3, 7],
      ["crystal-shards", 2, 7, 5, 3]
    ]),
    "Defender a passagem": crystalLayout("Passagem entre as farpas", "Uma faixa firme leva para fora do jardim.", 14, 6, 6, 0, [12, 10, 19, 13], [
      ["obstacle", 0, 0, 5, 1],
      ["crystal-shards", 12, 1, 5, 2],
      ["crystal-shards", 5, 3, 5, 4],
      ["crystal-shards", 15, 3, 2, 2],
      ["crystal-shards", 2, 8, 8, 2]
    ]),
    "Abrir caminho entre as farpas": crystalLayout("Marco da trilha", "Desobstrua a passagem pelas farpas deste ponto.", 8, 4, 1, 0, [10, 10, 16, 13], [
      ["polished-crystal", 10, 8, 2, 2],
      ["crystal-shards", 12, 0, 8, 3],
      ["crystal-shards", 12, 5, 5, 3],
      ["crystal-shards", 2, 7, 5, 3]
    ]),
    "Segurar a faixa firme": crystalLayout("Faixa firme", "A nervura áspera é um ponto seguro na descida.", 3, 6, 3, 0, [7, 10, 14, 13], [
      ["obstacle", 0, 0, 2, 1],
      ["polished-crystal", 10, 1, 10, 6],
      ["crystal-shards", 15, 7, 5, 3]
    ]),
    "Recuperar a mochila": crystalLayout("Mochila", "A mochila está na borda do piso liso, a caminho das farpas.", 13, 7, 1, 0, [0, 10, 6, 13], [
      ["polished-crystal", 7, 1, 3, 7],
      ["polished-crystal", 10, 3, 2, 5],
      ["polished-crystal", 12, 5, 3, 2],
      ["crystal-shards", 15, 7, 2, 3],
      ["crystal-shards", 17, 8, 3, 2]
    ]),
    "Disputar a rota sombreada": crystalLayout("Faixa sombreada", "Uma face opaca do cristal protege do sol.", 3, 6, 1, 0, [12, 10, 19, 13], [
      ["obstacle", 15, 3, 5, 4],
      ["solar-focus", 7, 0, 5, 5],
      ["solar-focus", 7, 7, 8, 3]
    ]),
    "Retirar o explorador da bacia": crystalLayout("Explorador encurralado", "Ele espera ajuda entre as manchas de luz.", 13, 6, 6, 0, [0, 10, 6, 13], [
      ["solar-focus", 12, 1, 5, 4],
      ["solar-focus", 5, 3, 5, 2],
      ["solar-focus", 5, 5, 2, 3],
      ["solar-focus", 10, 8, 5, 4]
    ]),
    "Defender a saída": crystalLayout("Saída da colunata", "Uma abertura real entre as imagens repetidas.", 15, 4, 1, 0, [2, 10, 9, 13], [
      ["obstacle", 10, 0, 2, 3],
      ["obstacle", 5, 3, 2, 4],
      ["obstacle", 10, 7, 2, 3],
      ["obstacle", 15, 10, 2, 4]
    ]),
    "Romper a lâmina": crystalLayout("Lâmina violeta", "A placa separa as duas rotas pelas colunas.", 9, 6, 8, 0, [2, 10, 9, 13], [
      ["obstacle", 2, 1, 3, 4],
      ["obstacle", 12, 3, 3, 4],
      ["obstacle", 15, 8, 2, 4]
    ]),
    "Recolher o fragmento": crystalLayout("Fragmento prismático", "O fragmento está junto à borda do poço.", 3, 8, 3, 0, [10, 10, 16, 13], [
      ["obstacle", 0, 0, 2, 1],
      ["obstacle", 17, 0, 3, 1],
      ["obstacle", 7, 3, 5, 4],
      ["polished-crystal", 7, 7, 5, 3],
      ["solar-focus", 15, 1, 2, 4]
    ]),
    "Tomar os pontos de apoio": crystalLayout("Ponto de apoio", "Uma saliência firme na borda do poço.", 15, 8, 6, 0, [5, 10, 11, 13], [
      ["obstacle", 17, 0, 3, 5],
      ["obstacle", 15, 1, 2, 4],
      ["polished-crystal", 2, 3, 3, 5],
      ["crystal-shards", 2, 8, 5, 2],
      ["solar-focus", 10, 5, 5, 3]
    ]),
  }
};
