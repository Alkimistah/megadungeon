const sectorEnemyArea = { minX: 11, minY: 0, maxX: 19, maxY: 13 };

function coastLayout(name, effect, x, y, [partyX, partyY], zones) {
  return {
    landmark: { name, effect, x, y },
    partyPositions: [[partyX, partyY], [partyX + 1, partyY], [partyX, partyY + 1], [partyX + 1, partyY + 1]],
    enemyArea: sectorEnemyArea,
    keepFootprintsInEnemyArea: true,
    zones: zones.map(([tile, x, y, width, height, label]) => ({ tile, x, y, width, height, label }))
  };
}

const center = {
  ...coastLayout("Pedestal do fragmento", "O fragmento prende as correntes. O banco central e as passagens nas extremidades ficam secos.", 12, 6, [1, 6], [
    ["deep-water", 15, 2, 5, 10, "Poço"],
    ["current", 4, 3, 11, 2, "Corredor norte · rodada 1 → · rodada 2 ←"],
    ["current", 4, 9, 11, 2, "Corredor sul · rodada 1 → · rodada 2 ←"],
    ["advantage", 10, 5, 4, 4, "Banco central"]
  ]),
  enemyArea: { minX: 10, minY: 5, maxX: 14, maxY: 8 }
};

export const impossibleTideLayouts = {
  center,
  byGuardian: {
    "cardume-de-selakos": {
      ...center,
      enemyArea: { minX: 15, minY: 2, maxX: 19, maxY: 11 },
      enemyTiles: ["deep-water"]
    }
  },
  byTask: {
    "Defender o cabo": coastLayout("Poste de amarração", "Na vazante, o cabo segura a embarcação contra o fluxo que sobe o cais.", 9, 7, [1, 7], [
      ["deep-water", 0, 0, 10, 3], ["current", 4, 3, 6, 3], ["obstacle", 5, 10, 4, 2]
    ]),
    "Retomar o bote": coastLayout("Bote encalhado", "Na enchente, a água contorna o banco seco onde o bote ficou preso.", 10, 8, [1, 8], [
      ["deep-water", 0, 0, 11, 4], ["current", 3, 4, 6, 3], ["obstacle", 7, 7, 2, 3]
    ]),
    "Abrir a passagem": coastLayout("Escada do canal", "A vazante sobe pela parede. A calçada ao sul permite alcançar a escada.", 10, 9, [1, 2], [
      ["current", 4, 0, 2, 8], ["deep-water", 6, 0, 3, 8], ["obstacle", 8, 3, 3, 3]
    ]),
    "Proteger a comporta": coastLayout("Plataforma da alavanca", "Na enchente, a água corta a galeria. Use as pontas da plataforma para contorná-la.", 9, 7, [1, 1], [
      ["current", 3, 4, 14, 2], ["deep-water", 6, 9, 5, 3], ["obstacle", 8, 0, 3, 3]
    ]),
    "Tomar o banco": coastLayout("Marco entre bancos", "Com a vazante, dois bancos secos flanqueiam a corrente.", 7, 6, [1, 2], [
      ["deep-water", 0, 7, 6, 4], ["deep-water", 8, 0, 5, 3], ["current", 8, 3, 3, 8]
    ]),
    "Resgatar a boia": coastLayout("Boia", "A boia está na água parada, ao alcance da margem seca.", 8, 8, [1, 1], [
      ["deep-water", 6, 5, 5, 3], ["deep-water", 7, 8, 1, 2], ["deep-water", 9, 8, 2, 2], ["obstacle", 3, 3, 3, 3]
    ]),
    "Limpar a saída": coastLayout("Saída lateral", "O refluxo deixa seco o corredor junto à abertura.", 10, 7, [1, 1], [
      ["obstacle", 7, 0, 2, 6], ["deep-water", 3, 4, 2, 6], ["current", 4, 10, 8, 2]
    ]),
    "Guardar o respiradouro": coastLayout("Respiradouro", "Na enchente, a passagem seca mais curta fica junto ao respiradouro.", 9, 7, [1, 4], [
      ["deep-water", 9, 0, 4, 5], ["obstacle", 3, 3, 2, 4], ["current", 4, 10, 12, 2]
    ]),
    "Destravar o volante": coastLayout("Volante", "Na vazante, o volante fica acessível entre o fosso e a vala de descarga.", 10, 7, [1, 3], [
      ["deep-water", 6, 0, 3, 7], ["deep-water", 6, 9, 3, 5], ["current", 9, 10, 6, 2]
    ]),
    "Retomar a válvula": coastLayout("Válvula da comporta", "A válvula fica na borda seca ao norte do canal alagado.", 10, 4, [1, 5], [
      ["current", 6, 0, 3, 4], ["deep-water", 7, 7, 5, 7], ["obstacle", 3, 8, 2, 4]
    ]),
    "Tomar a crista": coastLayout("Baliza da crista", "Na vazante, a crista seca permite contornar o espigão pelo norte.", 10, 2, [1, 1], [
      ["deep-water", 3, 4, 7, 7], ["current", 5, 6, 4, 2, "Corrente sobre o trecho baixo"]
    ]),
    "Defender a baliza": coastLayout("Baliza entre rampas", "Na enchente, duas rampas ligam o banco central às margens.", 9, 7, [1, 5], [
      ["current", 6, 0, 5, 4], ["deep-water", 7, 9, 7, 5], ["slope", 5, 5, 3, 2], ["slope", 10, 7, 3, 2]
    ])
  }
};
