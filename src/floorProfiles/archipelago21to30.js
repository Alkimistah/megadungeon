export const archipelago21to30Profile = {
  id: "archipelago-21-30",
  label: "Andares de 21 a 30",
  mode: "archipelago",
  floors: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
  recommendations: {
    encountersByFloor: {
      21: 3,
      22: 3,
      23: 5,
      24: 5,
      25: 7,
      26: 7,
      27: 9,
      28: 9,
      29: 11,
      30: 1
    },
    baseDcByFloor: {
      21: 22,
      22: 22,
      23: 23,
      24: 23,
      25: 24,
      26: 24,
      27: 25,
      28: 26,
      29: 26,
      30: 27
    }
  },
  archipelago: {
    explorationMinutes: 480,
    boatLabel: "Barco do grupo",
    boatIcon: "/assets/icons/archipelago-boat.svg",
    unlockRules: {
      initialFloors: [21, 22, 23, 24],
      intermediateRequires: [21, 22, 23, 24],
      advancedRequires: [25, 26, 27],
      bossRequiresFragments: 9
    },
    islandRows: [
      [30],
      [28, 29],
      [25, 26, 27],
      [21, 22, 23, 24]
    ],
    islandDifficultyByFloor: {
      21: "initial",
      22: "initial",
      23: "initial",
      24: "initial",
      25: "intermediate",
      26: "intermediate",
      27: "intermediate",
      28: "advanced",
      29: "advanced",
      30: "boss"
    },
    challengeByDifficulty: {
      initial: 8,
      intermediate: 9,
      advanced: 10,
      boss: 11
    },
    objectiveCountByFloor: {
      21: 3,
      22: 3,
      23: 5,
      24: 5,
      25: 7,
      26: 7,
      27: 9,
      28: 9,
      29: 11,
      30: 1
    },
    themePools: {
      initial: [
        { id: "tropical", name: "Ilha Tropical", icon: "/assets/icons/islands/ilha-tropical.svg", narrative: "É uma mancha verdejante no horizonte, cheia de palmeiras altas, praias claras e uma mata tão viva que parece observar o navio chegando.", objective: "Encontrar o fragmento entre trilhas, frutas venenosas e predadores menores." },
        { id: "mangrove", name: "Ilha Manguezal", icon: "/assets/icons/islands/ilha-manguezal.svg", narrative: "Parece mais um emaranhado de raízes saindo da água do que terra firme, com lama escura, canais tortos e silêncio pesado.", objective: "Atravessar canais rasos e raízes para alcançar um altar soterrado pela lama." },
        { id: "atoll", name: "Atol Circular", icon: "/assets/icons/islands/atol-circular.svg", narrative: "É um anel de areia branca cercando uma lagoa azul demais, bonito de longe, mas traiçoeiro quando a maré começa a mudar.", objective: "Explorar o anel de areia e a lagoa central antes que a maré feche a rota." },
        { id: "coral-coast", name: "Costa do Coral", icon: "/assets/icons/islands/costa-do-coral.svg", narrative: "Quase não há praia ali, só recifes coloridos, água rasa brilhando ao sol e sombras se movendo por baixo do casco.", objective: "Recuperar o fragmento em recifes vivos, trechos submersos e pouca terra firme." },
        { id: "shipwrecked", name: "Ilha dos Náufragos", icon: "/assets/icons/islands/ilha-dos-naufragos.svg", narrative: "Dá para ver mastros quebrados, fumaça de fogueira e barracas remendadas, como se o mar cuspisse gente ali há anos.", objective: "Resgatar sobreviventes ou recuperar mapas entre acampamentos improvisados." },
        { id: "giant-kelp", name: "Ilha de Algas Gigantes", icon: "/assets/icons/islands/ilha-de-algas-gigantes.svg", narrative: "O mar ao redor parece uma floresta submersa, com algas grossas agarrando as ondas como dedos verdes.", objective: "Abrir caminho por vegetação marinha e criaturas escondidas na arrebentação." },
        { id: "mist", name: "Ilha de Névoa", icon: "/assets/icons/islands/ilha-de-nevoa.svg", narrative: "Ela surge e some dentro de uma bruma fria, e as vozes que vêm de lá não acompanham o vento.", objective: "Localizar uma verdade escondida antes que ecos falsos confundam a expedição." },
        { id: "ship-graveyard", name: "Ilha-Cemitério de Navios", icon: "/assets/icons/islands/ilha-cemiterio-de-navios.svg", narrative: "Não é bem uma ilha, é um monte de cascos mortos encalhados uns nos outros, rangendo como se ainda navegassem.", objective: "Investigar cascos encalhados que formam uma dungeon sobre o mar." }
      ],
      intermediate: [
        { id: "volcanic", name: "Ilha Vulcânica", icon: "/assets/icons/islands/ilha-vulcanica.svg", narrative: "É uma montanha negra soltando fumaça, com rios vermelhos descendo pelas encostas e o ar tremendo de calor.", objective: "Sobreviver à instabilidade do vulcão e estabilizar a rota até o fragmento." },
        { id: "abandoned-ship", name: "Navio Abandonado", icon: "/assets/icons/islands/navio-abandonado.svg", narrative: "Há um navio enorme parado onde não deveria existir navio algum, velho, torto e silencioso demais para estar vazio.", objective: "Explorar um navio encalhado ou fantasma que substitui o terreno da ilha." },
        { id: "cyclopean-ruins", name: "Ilha das Ruínas Ciclópicas", icon: "/assets/icons/islands/ilha-das-ruinas-ciclopicas.svg", narrative: "Pedras gigantes se erguem da água como ossos de deuses afogados, todas cobertas de musgo e sal.", objective: "Ativar ou atravessar estruturas gigantescas semi-afundadas." },
        { id: "sea-caves", name: "Ilha-Labirinto de Cavernas Marinhas", icon: "/assets/icons/islands/ilha-labirinto-de-cavernas-marinhas.svg", narrative: "A costa é furada como queijo, cheia de bocas escuras onde a maré entra cantando baixo.", objective: "Navegar túneis inundados, bolsões de ar e passagens que somem com a maré." },
        { id: "pirate-held", name: "Ilha Tomada por Piratas", icon: "/assets/icons/islands/ilha-tomada-por-piratas.svg", narrative: "Dá para ver paliçadas, bandeiras rasgadas e gente armada nas pedras antes mesmo de ancorar.", objective: "Romper um fortim costeiro e recuperar o fragmento antes que ele seja vendido." },
        { id: "sacred", name: "Ilha Sagrada", icon: "/assets/icons/islands/ilha-sagrada.svg", narrative: "Ela parece calma demais, com pilares antigos, aves em círculo e uma sensação clara de que não fomos convidados.", objective: "Cumprir tabus, provações ou negociações com guardiões espirituais." },
        { id: "impossible-tide", name: "Ilha de Maré Impossível", icon: "/assets/icons/islands/ilha-de-mare-impossivel.svg", narrative: "A água sobe, desce e corre contra si mesma, revelando caminhos que somem antes da gente terminar de apontar.", objective: "Resolver o objetivo enquanto caminhos, armadilhas e salas mudam com o ciclo da maré." },
        { id: "crystal", name: "Ilha de Cristal", icon: "/assets/icons/islands/ilha-de-cristal.svg", narrative: "Brilha como uma joia quebrada no sol, cheia de torres translúcidas e reflexos que mostram coisas que não estão lá.", objective: "Atravessar cavernas brilhantes, ilusões naturais e formações cortantes." }
      ],
      advanced: [
        { id: "iceberg", name: "Iceberg", icon: "/assets/icons/islands/iceberg.svg", narrative: "É uma fortaleza de gelo à deriva, branca e azul, estalando alto como madeira prestes a partir.", objective: "Explorar uma ilha de gelo móvel com risco de fratura e frio extremo." },
        { id: "floating", name: "Ilha Flutuante", icon: "/assets/icons/islands/ilha-flutuante.svg", narrative: "Fica suspensa acima do mar, com cachoeiras caindo no vazio e pedras menores girando ao redor dela.", objective: "Alcançar plataformas suspensas e lidar com quedas, ventos e rotas quebradas." },
        { id: "storm", name: "Ilha de Tempestades Eternas", icon: "/assets/icons/islands/ilha-de-tempestades-eternas.svg", narrative: "Mesmo com céu limpo ao redor, aquela ilha vive debaixo de nuvens negras, raios e vento de arrancar vela.", objective: "Avançar sob chuva, raios e ventos que alteram cada cena." },
        { id: "living", name: "Ilha Viva", icon: "/assets/icons/islands/ilha-viva.svg", narrative: "A costa se mexe devagar, como se a própria terra respirasse antes de decidir se deixa alguém desembarcar.", objective: "Negociar ou resistir a um terreno semiconsciente que reage ao grupo." },
        { id: "salt-and-bones", name: "Ilha de Sal e Ossos", icon: "/assets/icons/islands/ilha-de-sal-e-ossos.svg", narrative: "É branca como osso velho, cercada de recifes afiados e carcaças grandes demais para serem de baleia.", objective: "Sobreviver a recifes cortantes, carcaças gigantes e necrófagos." },
        { id: "elemental", name: "Ilha Elemental", icon: "/assets/icons/islands/ilha-elemental.svg", narrative: "Cada pedaço dela parece pertencer a um mundo diferente, com fogo, gelo, pedra e vento brigando pela mesma praia.", objective: "Estabilizar regiões dominadas por forças elementais incompatíveis." }
      ],
      boss: [
        { id: "dinosaurs", name: "Ilha dos Dinossauros", icon: "/assets/icons/islands/ilha-dos-dinossauros.svg", narrative: "A selva ruge antes da âncora cair, e as árvores se abrem para pegadas maiores que um bote.", objective: "Enfrentar a versão ND 11 do Rei Tirano para concluir a etapa." }
      ]
    },
    boss: {
      creatureId: "rei-tirano-nd-11",
      plannedCreatureName: "Rei Tirano ND 11",
      status: "pending-catalog"
    }
  },
  missionRules: {
    enabled: true,
    offerCountMin: 1,
    offerCountMax: 8,
    missionFloors: [21, 22, 23, 24, 25, 26, 27, 28, 29],
    allowedCategories: [
      "collection",
      "exploration",
      "recovery",
      "investigation",
      "rescue",
      "escort",
      "trial",
      "anomalous"
    ],
    categoryWeights: {
      collection: 13,
      exploration: 17,
      recovery: 13,
      investigation: 14,
      rescue: 10,
      escort: 8,
      trial: 11,
      anomalous: 14
    },
    issuerWeights: [
      { id: "imediato-barco", label: "o imediato do barco", kind: "request", weight: 22 },
      { id: "cartografo-expedicao", label: "um cartógrafo da expedição", kind: "request", weight: 17, categories: ["collection", "exploration", "investigation", "anomalous"] },
      { id: "vigia-conves", label: "a vigia do convés", kind: "request", weight: 12, categories: ["exploration", "investigation", "specialHunt", "anomalous"] },
      { id: "patrono-anonimo-arquipelago", label: "um patrono anônimo", kind: "request", weight: 8 },
      { id: "pedido-quadro-navio", label: "um pedido preso ao quadro do navio", kind: "writtenRequest", weight: 12, categories: ["recovery", "rescue", "escort"] },
      { id: "diario-bordo-recuperado", label: "um diário de bordo recuperado", kind: "record", weight: 11, categories: ["exploration", "investigation", "recovery", "rescue"] },
      { id: "sinal-pulseira-arquipelago", label: "missão sem fornecedor", kind: "signal", weight: 8, categories: ["anomalous", "exploration", "trial"] }
    ],
    rewardChallengeByFloor: {
      21: 8,
      22: 8,
      23: 8,
      24: 8,
      25: 9,
      26: 9,
      27: 9,
      28: 10,
      29: 10
    },
    targetPools: {
      locations: [
        "uma rota de desembarque instável",
        "um marco visível apenas na maré certa",
        "um ponto alto da ilha",
        "uma passagem entre recifes",
        "uma ruína costeira"
      ],
      materials: [
        "amostras de coral vivo",
        "fragmentos de mapa náutico",
        "sal cristalizado incomum",
        "algas resistentes à magia",
        "areia marcada por energia planar"
      ],
      objects: [
        "um sextante quebrado",
        "um diário de bordo",
        "uma caixa lacrada",
        "um amuleto preso aos recifes",
        "uma vela com inscrições antigas"
      ],
      mementos: [
        "um diário de bordo de alguém que não voltou",
        "um medalhão preso a um destroço",
        "um mapa dobrado dentro de uma garrafa",
        "uma fita de família amarrada ao mastro",
        "um anel perdido entre recifes"
      ],
      clues: [
        "marcas no casco de um navio",
        "coordenadas gravadas em pedra",
        "pegadas que somem na água",
        "um sinal repetido por aves"
      ],
      challenges: [
        "atravessar a maré no tempo certo",
        "ancorar sem perder suprimentos",
        "estabilizar uma rota até o fragmento",
        "superar um tabu local"
      ],
      phenomena: [
        "maré correndo contra o vento",
        "bruma que duplica vozes",
        "recifes que mudam de posição",
        "um brilho sob a água que acompanha o grupo"
      ]
    }
  },
  theme: {
    page: "#0e1718",
    header: "#17363a",
    headerBorder: "#4a8a8f",
    surface: "#111b1d",
    surfaceAlt: "#162729",
    panel: "rgba(15, 27, 29, 0.96)",
    border: "#5e9696",
    borderSoft: "#315b5e",
    action: "#2f6f73",
    actionHover: "#3f8589",
    scrollbarTrack: "#102022",
    scrollbarThumb: "#5e9696",
    mapGlow: "rgba(72, 150, 164, 0.16)",
    tacticalColors: {
      wall: "#102024",
      floor: "#b7a87a",
      party: "#2d6fc5",
      enemy: "#b72f28",
      hidden: "#b9d3ce",
      trap: "#5a8f3e",
      water: "#2f7899",
      current: "#23627d",
      tree: "#2e5f43",
      foliage: "#4f8a55",
      swamp: "#4f5f3c",
      wet: "#5a8079",
      clearing: "#c6b56f",
      slope: "#8d8851",
      wind: "#c9d7c0",
      concealment: "#9ead94",
      pit: "#2d3027",
      difficult: "#587044",
      mechanism: "#d4b13f",
      objective: "#3fa7b8",
      door: "#7a4c24",
      advantage: "#c5b76f",
      obstacle: "#334a2f",
      reinforcement: "#c65a42"
    },
    columnColors: [
      "#7bc4ba",
      "#d7bd7a",
      "#5b9cc0",
      "#90b75f",
      "#cc725a",
      "#b7d4de",
      "#9a86c9"
    ]
  }
};
