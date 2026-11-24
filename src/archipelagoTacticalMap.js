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
    zones: zones.map(([tile, left, top, width, height, metadata]) => ({ tile, x: left, y: top, width, height, ...metadata }))
  };
}

const layoutsByTheme = {
  dinosaurs: {
    N: layout("Passagem da manada", "O Rei Tirano apoia a pata neste trecho ao seguir a manada.", 12, 6, [
      ["obstacle", 8, 3, 2, 5], ["obstacle", 14, 7, 2, 3], ["difficult", 10, 4, 4, 4], ["tree", 0, 0, 5, 5]
    ]),
    L: layout("Círculo da escarpa", "O círculo de pedras e ossos fortalece as resistências do Rei Tirano.", 14, 5, [
      ["slope", 8, 5, 5, 5], ["advantage", 13, 3, 6, 5], ["pit", 8, 0, 4, 4, { terrainType: "cliff" }], ["obstacle", 16, 9, 2, 2]
    ]),
    S: layout("Lajes de ressonância", "As lajes prolongam o rugido do Rei Tirano pelo vale.", 12, 7, [
      ["water", 8, 0, 4, 14], ["difficult", 8, 6, 4, 3], ["wet", 12, 3, 3, 7], ["tree", 15, 9, 4, 4]
    ]),
    O: layout("Trilha dos reforços", "A trilha entre os fetos leva a ninhada ao Vale da Ossada.", 12, 6, [
      ["foliage", 5, 3, 5, 6], ["foliage", 13, 8, 6, 4], ["obstacle", 10, 5, 3, 1], ["tree", 14, 1, 4, 3]
    ]),
    center: {
      ...layout("Ossada do vale", "As costelas elevadas dão cobertura perto da margem alta.", 11, 6, [
        ["tree", 1, 1, 4, 4], ["tree", 15, 9, 5, 5], ["water", 0, 6, 9, 2],
        ["difficult", 4, 8, 5, 2], ["obstacle", 10, 5, 3, 3],
        ["advantage", 13, 2, 5, 4], ["obstacle", 16, 7, 2, 2], ["slope", 13, 6, 3, 2]
      ]),
      enemyArea: { minX: 14, maxX: 17, minY: 2, maxY: 5 }
    }
  },
  storm: {
    NO: layout("Cabo do desembarque", "O cabo passa entre as tábuas que a ressaca trouxe.", 8, 9, [
      ["water", 0, 0, 20, 4], ["current", 7, 3, 10, 3], ["obstacle", 11, 8, 3, 2], ["wet", 4, 7, 5, 2]
    ]),
    N: layout("Abrigo da garganta", "A reentrância oferece abrigo entre dois corredores de vento.", 15, 5, [
      ["wall", 6, 1, 2, 7], ["wind", 8, 3, 6, 7], ["obstacle", 16, 7, 2, 3]
    ]),
    NL: layout("Marco da passagem rasa", "O marco indica a parte da várzea em que a corrente perde força.", 12, 7, [
      ["current", 7, 0, 5, 14], ["difficult", 7, 6, 5, 2], ["wet", 14, 3, 4, 6]
    ]),
    O: layout("Estrado do sinalizador", "A plataforma fica acima das pedras, com o vento pela lateral.", 14, 5, [
      ["concealment", 5, 3, 6, 4], ["wind", 12, 1, 7, 3], ["advantage", 12, 4, 5, 4], ["wet", 9, 8, 4, 3]
    ]),
    L: layout("Base das agulhas", "A caixa de ligação fica entre as agulhas de cobre.", 14, 6, [
      ["wind", 7, 2, 5, 7], ["obstacle", 13, 2, 1, 2], ["obstacle", 16, 8, 1, 2], ["wet", 13, 4, 5, 4]
    ]),
    SO: layout("Alavanca de desvio", "A alavanca fica na plataforma que separa os dois canais.", 13, 7, [
      ["current", 7, 0, 4, 6], ["current", 7, 8, 4, 6], ["deck", 7, 6, 6, 2], ["wall", 15, 1, 1, 5]
    ]),
    S: layout("Sino do altar", "O sino preso ao altar ressoa em cada rajada.", 14, 6, [
      ["wind", 6, 4, 6, 4], ["wall", 7, 0, 1, 3], ["obstacle", 12, 3, 2, 1], ["advantage", 13, 5, 4, 4]
    ]),
    SL: layout("Lente do farol", "A lente domina a plataforma exposta no topo da escada.", 15, 4, [
      ["wind", 11, 1, 8, 4], ["slope", 8, 7, 5, 3], ["advantage", 13, 4, 6, 4], ["wet", 12, 8, 5, 3]
    ]),
    center: layout("Marco do olho da tormenta", "O fragmento está no centro da área abrigada, cercada por chuva e vento.", 15, 6, [
      ["wind", 7, 0, 4, 9], ["current", 10, 9, 10, 3], ["wet", 11, 2, 8, 2], ["advantage", 13, 4, 5, 5]
    ])
  },
  floating: {
    NO: layout("Amarra de desembarque", "O gancho fixa a linha que leva à primeira ilhota.", 8, 9, [
      ["pit", 0, 0, 6, 6], ["pit", 11, 9, 9, 5], ["wind", 9, 3, 6, 4]
    ]),
    N: layout("Cabeceira da ponte", "Um trecho estreito de ponte liga as duas pontas da rocha.", 13, 7, [
      ["pit", 7, 0, 5, 6], ["pit", 7, 8, 5, 6], ["deck", 7, 6, 5, 2]
    ]),
    NL: layout("Marco dos ninhos", "A rocha mais alta oferece visão sobre os ninhos.", 15, 5, [
      ["pit", 12, 0, 8, 2], ["pit", 9, 10, 11, 4], ["advantage", 13, 3, 5, 5], ["obstacle", 9, 3, 2, 2]
    ]),
    O: layout("Marco da cascata", "O marco está preso no trecho de rocha por trás da água.", 12, 8, [
      ["pit", 0, 0, 7, 6], ["pit", 16, 8, 4, 6], ["current", 8, 3, 4, 4], ["wet", 8, 7, 7, 3]
    ]),
    L: layout("Freio do rotor", "A alavanca trava o eixo do moinho.", 14, 6, [
      ["pit", 11, 9, 9, 5], ["wind", 7, 2, 6, 5], ["advantage", 13, 3, 6, 5]
    ]),
    SO: layout("Contrapeso de órbita", "A trava prende o contrapeso à pedra maior.", 14, 7, [
      ["pit", 7, 0, 4, 5], ["pit", 7, 8, 4, 6], ["pit", 15, 9, 5, 5], ["wind", 7, 5, 4, 3]
    ]),
    S: layout("Pedestal das raízes", "Raízes grossas ligam as faixas de terra aos pés do pedestal.", 14, 8, [
      ["pit", 8, 0, 3, 5], ["pit", 8, 9, 3, 5], ["tree", 13, 4, 2, 2], ["difficult", 8, 5, 5, 3]
    ]),
    SL: layout("Lente do farol", "A lente está em uma plataforma acima da escada.", 15, 4, [
      ["pit", 0, 0, 7, 5], ["pit", 13, 10, 7, 4], ["slope", 9, 7, 4, 3], ["advantage", 13, 2, 6, 6]
    ]),
    center: layout("Pedestal do cume", "O fragmento repousa no ponto mais alto da ilha, entre dois vãos cobertos de nuvens.", 15, 6, [
      ["pit", 8, 0, 4, 5], ["pit", 8, 9, 4, 5], ["advantage", 13, 3, 6, 6],
      ["obstacle", 13, 3, 1, 2], ["obstacle", 17, 7, 1, 2]
    ])
  },
  "pirate-held": {
    NO: {
      ...layout("Rampa de carga", "A rampa liga o cais de madeira ao pátio.", 12, 8, [
        ["water", 0, 0, 20, 7], ["deck", 9, 2, 5, 8], ["obstacle", 14, 8, 2, 2]
      ]),
      enemyTiles: ["deck", "floor"]
    },
    NL: layout("Patamar da paliçada", "O patamar elevado leva ao lado interno do fortim.", 14, 4, [
      ["wall", 7, 0, 1, 6], ["wall", 7, 8, 1, 6], ["advantage", 10, 2, 7, 4], ["slope", 9, 5, 3, 3]
    ]),
    O: layout("Mesa do inventário", "Os registros de carga estão no corredor entre os engradados.", 13, 7, [
      ["obstacle", 6, 3, 2, 5], ["obstacle", 10, 7, 2, 5], ["obstacle", 15, 2, 3, 4],
      ["difficult", 8, 7, 2, 3]
    ]),
    L: layout("Estrado de sinais", "A torre domina a trilha que sobe desde a praia.", 14, 5, [
      ["wall", 9, 0, 1, 6], ["slope", 8, 7, 4, 3], ["advantage", 11, 2, 7, 5], ["obstacle", 14, 8, 2, 2]
    ]),
    SO: layout("Altar da quilha", "A ponta da quilha sustenta o amuleto do juramento.", 14, 6, [
      ["wall", 7, 0, 1, 7], ["obstacle", 10, 4, 3, 1], ["obstacle", 10, 8, 3, 1], ["advantage", 14, 4, 4, 5]
    ]),
    SL: layout("Cofre de bordo", "A guarda mantém o cofre atrás do balcão de madeira.", 15, 7, [
      ["wall", 9, 0, 1, 4], ["wall", 9, 9, 1, 5], ["obstacle", 11, 6, 3, 1], ["deck", 14, 3, 5, 7]
    ]),
    center: layout("Mesa do leilão", "A mesa do leilão fica no convés do Galeão da Caveira, entre duas fileiras de barricas.", 14, 5, [
      ["advantage", 12, 3, 5, 5], ["obstacle", 9, 4, 1, 3], ["obstacle", 17, 4, 1, 3],
      ["wall", 7, 0, 1, 4], ["difficult", 8, 8, 4, 2]
    ])
  },
  "sea-caves": {
    NO: layout("Cabo do desembarque", "A linha permite encontrar o caminho de volta na vazante.", 8, 9, [
      ["water", 0, 0, 20, 6], ["current", 8, 2, 6, 4], ["difficult", 4, 6, 12, 2]
    ]),
    NL: layout("Marca da bifurcação", "As marcas de giz distinguem dois túneis de eco semelhante.", 13, 5, [
      ["wall", 8, 2, 2, 5], ["wall", 11, 7, 2, 4], ["water", 15, 3, 5, 7]
    ]),
    O: layout("Plataforma de ar", "A rocha elevada mantém uma área respirável acima do nível da água.", 12, 7, [
      ["water", 6, 0, 14, 10], ["advantage", 9, 5, 6, 4], ["obstacle", 6, 10, 2, 2]
    ]),
    L: layout("Ancoragem do cabo", "O cabo-guia atravessa a parte mais estreita da corrente.", 13, 7, [
      ["current", 8, 0, 5, 14], ["wall", 5, 0, 2, 4], ["wall", 14, 10, 5, 2]
    ]),
    SO: layout("Roda da comporta", "A comporta regula o fluxo que chega ao Centro.", 13, 6, [
      ["wall", 8, 0, 1, 5], ["wall", 8, 8, 1, 6], ["current", 9, 5, 4, 3], ["water", 14, 0, 6, 10]
    ]),
    SL: layout("Guincho do poço", "O mecanismo suspende o contrapeso acima da água.", 13, 8, [
      ["water", 8, 1, 11, 6], ["trench", 10, 2, 7, 3], ["advantage", 11, 7, 6, 3]
    ]),
    center: {
      ...layout("Pedestal da câmara de maré", "A plataforma do fragmento emerge entre dois canais.", 15, 6, [
        ["current", 7, 0, 5, 14], ["water", 12, 1, 8, 11], ["advantage", 12, 4, 6, 5],
        ["difficult", 7, 6, 5, 2], ["obstacle", 13, 3, 2, 1]
      ]),
      enemyTiles: ["water", "current"]
    }
  },
  volcanic: {
    NO: layout("Poste de amarração", "O grupo pode prender aqui os cabos do desembarque.", 6, 9, [
      ["water", 0, 0, 20, 3], ["difficult", 4, 5, 12, 3], ["obstacle", 10, 9, 2, 2]
    ]),
    NL: layout("Cabeceira da ponte", "A faixa de basalto cruza o rio entre duas correntes de lava.", 12, 7, [
      ["lava", 8, 0, 4, 6], ["lava", 8, 8, 4, 6], ["slope", 13, 4, 3, 5]
    ]),
    O: layout("Respiradouro", "Os jatos de vapor reduzem a visibilidade nas áreas indicadas.", 11, 6, [
      ["concealment", 5, 3, 6, 5], ["concealment", 12, 7, 5, 4], ["lava", 15, 0, 4, 3]
    ]),
    L: layout("Marco de obsidiana", "Placas negras oferecem cobertura ao longo da galeria.", 15, 7, [
      ["obstacle", 6, 0, 2, 8], ["obstacle", 10, 6, 2, 8], ["obstacle", 15, 2, 2, 3]
    ]),
    SO: layout("Bigorna da forja", "A plataforma elevada é cercada por canais de resfriamento.", 12, 5, [
      ["advantage", 11, 3, 5, 5], ["lava", 9, 1, 2, 7], ["lava", 11, 9, 7, 2]
    ]),
    SL: layout("Linha de segurança", "O ponto de ancoragem marca a passagem entre encostas íngremes.", 10, 7, [
      ["slope", 5, 5, 5, 6], ["pit", 10, 1, 3, 5], ["difficult", 13, 8, 5, 4]
    ]),
    center: layout("Pedestal do fragmento", "O fragmento repousa numa plataforma de basalto com dois acessos.", 15, 6, [
      ["lava", 9, 0, 3, 4], ["lava", 9, 9, 3, 5], ["advantage", 12, 4, 6, 5],
      ["obstacle", 14, 3, 2, 1], ["obstacle", 17, 9, 1, 2]
    ])
  },
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
      ["water", 7, 2, 12, 7], ["water", 13, 4, 5, 4, { terrainType: "deep-water" }], ["wet", 6, 8, 5, 2]
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
      ["water", 4, 3, 10, 9, { terrainType: "deep-water" }], ["wall", 7, 2, 10, 1], ["wall", 14, 8, 4, 1], ["clearing", 14, 3, 4, 4]
    ]),
    O: layout("Altar das pérolas", "O pedestal controla a passagem do pátio para o altar. As conchas do santuário ficam no fundo.", 14, 5, [
      ["water", 4, 2, 15, 9, { terrainType: "deep-water" }], ["obstacle", 8, 3, 1, 3], ["obstacle", 8, 8, 1, 2], ["advantage", 13, 4, 4, 3]
    ]),
    center: layout("Nicho do fragmento", "O nicho fica sob um arco de coral entre a borda rasa e o canal fundo.", 15, 5, [
      ["water", 5, 2, 14, 9],
      ["water", 9, 2, 10, 9, { terrainType: "deep-water" }],
      ["wet", 4, 8, 7, 2], ["obstacle", 10, 3, 1, 3], ["advantage", 13, 4, 4, 3]
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
  const landmark = {
    ...base.landmark,
    id: `${themeId}:${objective?.direction ?? "center"}:landmark`,
    ...(taskLandmark ? { name: taskLandmark[0], effect: taskLandmark[1] } : {})
  };
  const terrain = scene.environment.terrain;
  const leader = objective == null ? scene.resolvedEncounter?.items.find(item => item.kind === "creature") : null;
  return {
    ...scene,
    ...(leader ? { bossCreatureId: scene.bossCreatureId ?? leader.creatureId } : {}),
    tacticalLayout: {
      ...base,
      landmark,
      zones: themeId === "floating"
        ? base.zones.map(zone => zone.tile === "pit" ? { ...zone, terrainType: "abyss" } : zone)
        : base.zones
    },
    environment: {
      ...scene.environment,
      terrain: { ...terrain, features: [...terrain.features, landmark] }
    }
  };
}
