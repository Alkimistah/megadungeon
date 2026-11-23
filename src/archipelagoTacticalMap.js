const tropicalLayouts = {
  N: {
    zones: [
      { x: 7, y: 1, width: 4, height: 12, tile: "current" },
      { x: 7, y: 6, width: 4, height: 2, tile: "floor" }
    ],
    landmark: { x: 12, y: 6, name: "Comporta", effect: "A calçada atravessa o canal e dá acesso à manivela da comporta." }
  },
  S: {
    zones: [
      { x: 6, y: 2, width: 5, height: 3, tile: "foliage" },
      { x: 7, y: 7, width: 6, height: 2, tile: "slope" },
      { x: 14, y: 3, width: 4, height: 5, tile: "difficult" }
    ],
    landmark: { x: 14, y: 8, name: "Contrapeso de jade", effect: "O contrapeso está preso na canaleta ao pé do terraço." }
  },
  L: {
    zones: [
      { x: 6, y: 3, width: 1, height: 3, tile: "obstacle" },
      { x: 6, y: 8, width: 1, height: 3, tile: "obstacle" },
      { x: 9, y: 5, width: 4, height: 3, tile: "trap" }
    ],
    landmark: { x: 14, y: 6, name: "Pedestal do alarme", effect: "As placas de pressão ligam as máscaras ao alarme; o pedestal controla o disparador." }
  },
  O: {
    zones: [
      { x: 6, y: 8, width: 4, height: 2, tile: "slope" },
      { x: 10, y: 4, width: 7, height: 5, tile: "advantage" },
      { x: 9, y: 4, width: 1, height: 4, tile: "pit" }
    ],
    landmark: { x: 15, y: 6, name: "Roda de trava", effect: "A escadaria dá acesso à plataforma elevada. A roda trava a plataforma e fecha o feixe do altar." }
  }
};

function layout(name, effect, x, y, zones) {
  return {
    landmark: { name, effect, x, y },
    zones: zones.map(([tile, left, top, width, height]) => ({ tile, x: left, y: top, width, height }))
  };
}

const layoutsByTheme = {
  tropical: {
    ...tropicalLayouts,
    center: layout("Altar do templo", "O fragmento repousa entre as pedras do altar.", 15, 4, [
      ["slope", 6, 7, 4, 3], ["advantage", 10, 3, 7, 6],
      ["obstacle", 6, 3, 1, 2], ["obstacle", 17, 8, 1, 3]
    ])
  },
  mangrove: {
    N: layout("Margem do canal", "Raízes grossas permitem cruzar o canal onde a corrente é mais fraca.", 12, 7, [
      ["current", 7, 1, 4, 12], ["difficult", 7, 6, 4, 2], ["tree", 5, 3, 1, 3], ["swamp", 13, 8, 5, 3]
    ]),
    S: layout("Comporta do lodaçal", "A comporta drena o lamaçal que cobre a entrada do covil.", 13, 7, [
      ["swamp", 6, 3, 7, 5], ["current", 11, 8, 3, 5], ["tree", 5, 4, 1, 3], ["tree", 15, 2, 2, 2]
    ]),
    L: layout("Posto da vazante", "O caminho seco sobe até o posto de vigia. Os baixios ainda estão alagados.", 14, 5, [
      ["water", 6, 2, 5, 4], ["swamp", 9, 8, 7, 3], ["advantage", 12, 3, 4, 3], ["tree", 6, 7, 1, 3]
    ]),
    O: layout("Altar das oferendas", "O altar e seu círculo ritual ficam numa faixa de terra firme cercada de lama.", 14, 6, [
      ["swamp", 5, 4, 6, 5], ["water", 10, 2, 8, 2], ["advantage", 12, 5, 5, 3], ["tree", 17, 8, 2, 2]
    ]),
    center: layout("Altar do covil", "O altar fica num banco de lama acima da água; as raízes dão cobertura nas margens.", 14, 5, [
      ["swamp", 6, 4, 6, 5], ["water", 10, 8, 7, 3], ["advantage", 12, 3, 5, 4], ["tree", 6, 2, 1, 2]
    ])
  },
  atoll: {
    N: layout("Linha de boias", "O banco de areia corta a lagoa rasa. As boias marcam o caminho da vazante.", 13, 5, [
      ["water", 4, 2, 14, 5], ["clearing", 4, 5, 11, 2], ["water", 11, 8, 7, 3]
    ]),
    S: layout("Amarra do canal", "Os bancos de areia nas margens servem de apoio para o cabo.", 12, 7, [
      ["current", 7, 1, 4, 12], ["wet", 6, 3, 1, 7], ["wet", 11, 3, 1, 7]
    ]),
    L: layout("Escotilha do destroço", "O casco encalhado dá cobertura. A escotilha leva ao compartimento das cartas.", 14, 5, [
      ["obstacle", 8, 4, 8, 1], ["obstacle", 8, 5, 1, 4], ["advantage", 9, 5, 7, 3], ["water", 13, 9, 6, 3]
    ]),
    O: layout("Borda do poço", "A corda e o sino de mergulho ficam junto à borda, onde a lagoa aprofunda.", 12, 6, [
      ["water", 7, 2, 12, 7], ["pit", 13, 4, 5, 4], ["wet", 6, 8, 5, 2]
    ]),
    center: layout("Pedra do fragmento", "Um banco de areia ladeia o canal da lagoa e dá acesso ao fragmento.", 14, 6, [
      ["water", 5, 2, 14, 9], ["clearing", 5, 7, 12, 2], ["advantage", 13, 6, 4, 2], ["wet", 5, 9, 7, 2]
    ])
  },
  "coral-coast": {
    N: layout("Rede presa nos corais", "A rede está enroscada numa crista. Nos baixios, a água cobre os tornozelos.", 14, 6, [
      ["water", 4, 2, 15, 8], ["difficult", 8, 4, 4, 2], ["obstacle", 12, 4, 2, 2], ["wet", 4, 8, 6, 2]
    ]),
    S: layout("Ancoragem da descida", "A linha de descida está presa à borda da parede do recife.", 12, 7, [
      ["water", 4, 2, 15, 9], ["obstacle", 9, 1, 2, 4], ["obstacle", 9, 8, 2, 4], ["difficult", 8, 5, 4, 3]
    ]),
    L: layout("Câmara de ar", "A câmara tem uma borda firme para prender o cabo; as galerias ao redor estão inundadas.", 15, 5, [
      ["water", 4, 3, 10, 9], ["wall", 7, 2, 10, 1], ["wall", 14, 8, 4, 1], ["clearing", 14, 3, 4, 4]
    ]),
    O: layout("Altar das pérolas", "O pedestal controla a passagem do pátio para o altar. As conchas do santuário ficam no fundo.", 14, 5, [
      ["water", 4, 2, 15, 9], ["obstacle", 8, 3, 1, 3], ["obstacle", 8, 8, 1, 2], ["advantage", 13, 4, 4, 3]
    ]),
    center: layout("Nicho do fragmento", "O nicho fica sob um arco de coral entre a borda rasa e o canal fundo.", 15, 5, [
      ["water", 5, 2, 14, 9], ["wet", 4, 8, 7, 2], ["obstacle", 10, 3, 1, 3], ["advantage", 13, 4, 4, 3]
    ])
  }
};

const landmarksByTask = {
  "Silenciar o alarme": ["Concha de alarme", "A concha está pendurada no posto de vigia."],
  "Proteger o círculo de ruptura": ["Círculo de ruptura", "O círculo ritual está traçado em volta do altar."],
  "Tomar o pátio submerso": ["Pedestal da passagem", "O pedestal destrava a passagem para o santuário."],
  "Manter a ancoragem": ["Ancoragem da descida", "A linha está presa à borda da parede e precisa ser firmada antes que a corrente a solte."],
  "Defender o sino de mergulho": ["Sino de mergulho", "O sino está preso a uma roldana na borda do poço."]
};

export function withIslandTacticalLayout(scene, themeId, objective) {
  const base = layoutsByTheme[themeId]?.[objective?.direction ?? "center"];
  if (!scene || !base) return scene;
  const taskLandmark = landmarksByTask[objective?.title];
  const landmark = taskLandmark
    ? { ...base.landmark, name: taskLandmark[0], effect: taskLandmark[1] }
    : base.landmark;
  const terrain = scene.environment.terrain;
  return {
    ...scene,
    tacticalLayout: { ...base, landmark },
    environment: {
      ...scene.environment,
      terrain: { ...terrain, features: [...terrain.features, landmark] }
    }
  };
}
