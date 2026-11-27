import { crystalLayouts } from "./archipelagoCrystalLayouts.js";
import { abandonedShipLayouts } from "./archipelagoAbandonedShipLayouts.js";

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
  shipwrecked: {
    N: layout("Bote de resgate", "O bote está encalhado acima da arrebentação. A maré sobe pela direita.", 14, 5, [
      ["water", 15, 0, 5, 14], ["wet", 12, 0, 3, 14], ["obstacle", 9, 3, 3, 2], ["obstacle", 13, 9, 2, 2],
      ["difficult", 6, 6, 5, 3], ["difficult", 10, 11, 3, 2]
    ]),
    S: { ...layout("Porta da barraca dos feridos", "Se um adversário terminar a terceira rodada adjacente à barraca, leva um sobrevivente.", 11, 8, [["clearing", 7, 4, 9, 6], ["wall", 5, 0, 13, 1], ["wall", 18, 0, 1, 6], ["wall", 18, 10, 1, 4], ["difficult", 17, 6, 3, 4], ["obstacle", 6, 2, 2, 2], ["obstacle", 10, 1, 2, 2], ["obstacle", 14, 2, 2, 2], ["obstacle", 5, 6, 2, 2], ["obstacle", 15, 6, 2, 2], ["obstacle", 7, 11, 2, 2], ["obstacle", 12, 11, 2, 2], ["obstacle", 16, 11, 2, 2], ["obstacle", 10, 5, 3, 3]]), enemyArea: { minX: 14, maxX: 19, minY: 0, maxY: 13 } },
    L: layout("Margem dos odres", "O único ponto de acesso firme à água. É aqui que se enchem os odres.", 11, 7, [["clearing", 4, 8, 7, 2], ["wall", 13, 0, 7, 2], ["slope", 13, 2, 7, 2], ["water", 15, 2, 1, 2], ["water", 12, 4, 5, 4], ["obstacle", 11, 4, 1, 2], ["obstacle", 17, 5, 1, 2], ["obstacle", 13, 8, 2, 1], ["water", 12, 8, 1, 3], ["water", 11, 11, 1, 3], ["concealment", 17, 8, 3, 3], ["tree", 18, 11, 2, 2], ["tree", 6, 1, 2, 2], ["concealment", 5, 4, 3, 2]]),
    O: layout("Parede das rotas", "As rotas riscadas cobrem o fundo seco da gruta. A água entra pela boca.", 16, 6, [
      ["wall", 0, 0, 20, 1], ["wall", 0, 13, 20, 1], ["wall", 8, 1, 2, 4], ["wall", 8, 10, 2, 3],
      ["water", 4, 4, 5, 6], ["wet", 9, 5, 4, 4], ["advantage", 15, 4, 4, 5]
    ]),
    center: layout("Lente do farol", "O espelho de cristal concentra a pouca luz que atravessa as nuvens e a joga sobre o mar.", 15, 6, [["water", 0, 0, 20, 2], ["water", 18, 2, 2, 12], ["advantage", 11, 2, 7, 10], ["deck", 5, 9, 5, 2], ["slope", 9, 7, 3, 3], ["wall", 12, 4, 6, 1], ["wall", 12, 9, 6, 1], ["wall", 17, 5, 1, 4], ["wall", 12, 5, 1, 1], ["wall", 12, 8, 1, 1], ["deck", 13, 5, 4, 4], ["obstacle", 16, 2, 2, 1], ["obstacle", 17, 10, 1, 2], ["obstacle", 11, 3, 1, 1], ["obstacle", 10, 4, 1, 1], ["difficult", 13, 10, 3, 2], ["door", 12, 6, 1, 2]]),
    byTask: {
      "Conter os afogados da arrebentação": { ...layout("Casco virado", "Os sobreviventes se abrigam sob o casco. Nenhuma criatura pode alcançá-lo.", 10, 6, [["water", 15, 0, 5, 14], ["wet", 12, 0, 3, 14], ["obstacle", 6, 5, 4, 3], ["difficult", 11, 2, 3, 3], ["obstacle", 13, 10, 2, 2], ["difficult", 5, 10, 4, 2]]), enemyArea: { minX: 13, maxX: 19, minY: 0, maxY: 13 } },
      "Libertar os cativos da paliçada": layout("Portão da paliçada", "Os cativos estão acorrentados nos postes do lado de dentro.", 12, 6, [["clearing", 12, 3, 6, 7], ["wall", 11, 2, 8, 1], ["wall", 11, 10, 8, 1], ["wall", 18, 3, 1, 7], ["wall", 11, 3, 1, 3], ["wall", 11, 8, 1, 2], ["obstacle", 16, 5, 1, 1], ["obstacle", 16, 8, 1, 1], ["advantage", 17, 3, 1, 2], ["obstacle", 6, 3, 2, 2], ["obstacle", 8, 7, 2, 2], ["difficult", 5, 8, 3, 2]]),
      "Interceptar a patrulha": { ...layout("Saída da trilha", "Se a criatura escolhida chegar aqui, escapa para o farol.", 18, 1, [["slope", 12, 0, 8, 5], ["clearing", 4, 8, 8, 2], ["clearing", 10, 4, 3, 5], ["clearing", 13, 1, 5, 2], ["tree", 6, 3, 2, 2], ["tree", 15, 8, 2, 2], ["concealment", 14, 5, 3, 2], ["concealment", 8, 11, 4, 2], ["water", 11, 10, 3, 2]]), enemyArea: { minX: 10, maxX: 15, minY: 4, maxY: 9 } },
      "Defender a posição avançada": layout("Barricada da boca", "A posição é preparada atrás da barricada, na entrada da gruta.", 10, 7, [["wall", 0, 0, 20, 1], ["wall", 0, 13, 20, 1], ["wall", 12, 1, 2, 4], ["wall", 12, 9, 2, 4], ["obstacle", 11, 6, 1, 2], ["water", 15, 2, 5, 10], ["wet", 13, 5, 2, 4], ["difficult", 4, 3, 4, 3]])
    }
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
  },
  "giant-kelp": {
    N: layout("Proa do bote", "As gavinhas presas ao casco são cortadas daqui.", 9, 7, [["foliage", 4, 0, 16, 6], ["deep-water", 0, 6, 20, 3], ["foliage", 6, 9, 14, 5], ["concealment", 10, 1, 6, 4], ["concealment", 12, 10, 5, 3], ["deck", 7, 7, 3, 1], ["wet", 0, 9, 6, 5]]),
    S: { ...layout("Concha de alarme", "Pendurada no meio do viveiro.", 13, 5, [["water", 0, 0, 20, 14], ["foliage", 0, 0, 6, 7], ["foliage", 16, 0, 4, 14], ["deck", 6, 3, 10, 7], ["deck", 2, 9, 5, 2], ["clearing", 0, 10, 4, 4], ["obstacle", 8, 4, 2, 1], ["obstacle", 11, 8, 2, 1], ["obstacle", 14, 6, 1, 2]]), enemyArea: { minX: 16, maxX: 19, minY: 0, maxY: 13 } },
    L: layout("Pescador preso", "Enrolado nas gavinhas no meio do banco.", 14, 6, [["water", 0, 0, 20, 14], ["clearing", 2, 3, 15, 9], ["foliage", 12, 2, 6, 3], ["foliage", 5, 8, 3, 3], ["obstacle", 10, 5, 1, 1], ["difficult", 7, 3, 3, 2], ["wet", 1, 11, 12, 3], ["concealment", 16, 6, 3, 4]]),
    O: layout("Escotilha do porão", "Dentro do casco engolido.", 14, 7, [["water", 0, 0, 20, 14], ["foliage", 0, 0, 8, 4], ["foliage", 17, 0, 3, 14], ["deck", 8, 4, 9, 6], ["obstacle", 8, 4, 9, 1], ["obstacle", 8, 9, 9, 1], ["foliage", 9, 11, 8, 3], ["concealment", 4, 5, 4, 4]]),
    center: layout("Pedra do fragmento", "A rocha no meio do poço aberto entre as frondes.", 12, 6, [["water", 0, 0, 20, 14], ["foliage", 0, 0, 20, 3], ["foliage", 17, 3, 3, 11], ["foliage", 4, 12, 16, 2], ["deep-water", 6, 3, 11, 8], ["advantage", 11, 6, 3, 2], ["deck", 3, 7, 8, 1], ["concealment", 7, 3, 9, 2], ["wet", 0, 8, 3, 4]]),
    byTask: {
      "Cortar as redes dos sahuagin": layout("Rede do canal", "Estendida entre duas estacas no canal.", 12, 6, [["water", 0, 0, 20, 14], ["current", 11, 0, 3, 14], ["foliage", 4, 0, 6, 7], ["foliage", 15, 0, 5, 6], ["foliage", 15, 10, 5, 4], ["obstacle", 12, 4, 1, 1], ["obstacle", 12, 9, 1, 1], ["clearing", 0, 8, 7, 6]]),
      "Impedir o roubo dos ovos": layout("Ninhal dos ovos", "A plataforma onde os ovos de selako ficam presos às frondes.", 8, 5, [["water", 0, 0, 20, 14], ["deck", 3, 7, 15, 2], ["deck", 7, 2, 3, 5], ["foliage", 12, 0, 8, 5], ["foliage", 12, 10, 8, 4], ["obstacle", 8, 3, 1, 1], ["clearing", 0, 9, 5, 5], ["deck", 4, 9, 1, 1]]),
      "Interceptar a patrulha": { ...layout("Saída pelo canal fundo", "A criatura escolhida que chegar aqui escapa.", 17, 2, [["water", 0, 0, 20, 14], ["deep-water", 15, 0, 5, 14], ["clearing", 1, 6, 14, 6], ["foliage", 4, 1, 8, 4], ["foliage", 8, 12, 6, 2], ["wet", 13, 5, 2, 7]]), enemyArea: { minX: 6, maxX: 13, minY: 6, maxY: 11 } },
      "Defender a posição avançada": layout("Jangada de frondes", "A posição é preparada sobre a jangada.", 9, 7, [["water", 0, 0, 20, 14], ["foliage", 0, 0, 20, 3], ["foliage", 15, 3, 5, 11], ["deep-water", 12, 4, 3, 7], ["deck", 7, 6, 5, 3], ["obstacle", 7, 5, 1, 1], ["foliage", 0, 12, 9, 2]])
    }
  },
  mist: {
    N: { ...layout("Sino do cais", "Pendurado num poste na ponta do cais. A corda desce até as tábuas.", 12, 8, [["water", 0, 0, 20, 9], ["deep-water", 17, 0, 3, 14], ["water", 8, 9, 9, 5], ["wet", 0, 9, 8, 5], ["deck", 4, 7, 12, 3], ["deck", 8, 2, 3, 5], ["obstacle", 6, 6, 1, 1], ["obstacle", 10, 10, 1, 1], ["obstacle", 14, 6, 1, 1], ["concealment", 15, 2, 5, 4], ["concealment", 14, 10, 5, 3]]), enemyArea: { minX: 15, maxX: 19, minY: 0, maxY: 13 } },
    S: { ...layout("Lanterna da vigília", "Num poste no meio da praça. A luz é a única coisa que a bruma não atravessa.", 10, 7, [["clearing", 5, 4, 10, 7], ["wall", 0, 0, 5, 4], ["wall", 14, 0, 6, 3], ["wall", 15, 10, 5, 4], ["wall", 6, 11, 5, 3], ["obstacle", 7, 5, 1, 1], ["obstacle", 12, 9, 2, 1], ["concealment", 15, 3, 5, 5], ["concealment", 0, 4, 3, 4], ["difficult", 11, 11, 4, 3]]), enemyArea: { minX: 14, maxX: 19, minY: 3, maxY: 9 } },
    L: layout("Ninho das harpias", "No alto de um tronco morto, no meio do lodo.", 13, 4, [["swamp", 0, 0, 20, 14], ["clearing", 0, 9, 6, 5], ["clearing", 5, 7, 5, 3], ["clearing", 9, 4, 3, 4], ["water", 12, 6, 4, 4], ["tree", 14, 2, 2, 2], ["tree", 4, 2, 1, 1], ["tree", 17, 11, 1, 1], ["concealment", 15, 8, 5, 4], ["concealment", 3, 1, 5, 3]]),
    O: layout("Porta da cripta", "A laje que fecha a cripta caiu ao lado da entrada.", 11, 6, [["wall", 12, 4, 4, 5], ["door", 12, 6, 1, 1], ["obstacle", 4, 3, 1, 1], ["obstacle", 7, 3, 1, 1], ["obstacle", 4, 6, 1, 1], ["obstacle", 7, 6, 1, 1], ["obstacle", 16, 2, 1, 1], ["obstacle", 18, 2, 1, 1], ["obstacle", 16, 11, 1, 1], ["obstacle", 18, 11, 1, 1], ["obstacle", 8, 10, 1, 1], ["obstacle", 12, 11, 1, 1], ["concealment", 16, 4, 4, 6], ["difficult", 5, 8, 3, 2], ["difficult", 9, 5, 2, 3]]),
    center: layout("Sino rachado", "O sino caiu do campanário e ainda bate sozinho dentro da capela em ruínas.", 12, 6, [["water", 0, 0, 20, 2], ["water", 18, 2, 2, 12], ["wall", 9, 3, 8, 1], ["wall", 9, 9, 8, 1], ["wall", 16, 4, 1, 5], ["wall", 9, 4, 1, 1], ["wall", 9, 8, 1, 1], ["advantage", 14, 4, 2, 2], ["concealment", 3, 2, 5, 4], ["concealment", 11, 10, 6, 3], ["obstacle", 6, 7, 1, 1], ["difficult", 4, 7, 4, 2], ["difficult", 12, 7, 2, 1]]),
    byTask: {
      "Desmascarar os falsos náufragos": { ...layout("Náufrago verdadeiro", "Amarrado sob as tábuas, na base do cais.", 9, 6, [["water", 0, 0, 20, 5], ["deep-water", 0, 0, 20, 2], ["wet", 0, 5, 20, 2], ["deck", 8, 0, 3, 6], ["obstacle", 3, 8, 2, 2], ["obstacle", 14, 8, 3, 2], ["concealment", 12, 2, 5, 3], ["difficult", 15, 11, 4, 2]]), enemyArea: { minX: 12, maxX: 19, minY: 3, maxY: 12 } },
      "Apagar o braseiro da escuta": layout("Braseiro da escuta", "Os Ouvintes se sentam em volta dele, de olhos fechados.", 13, 5, [["clearing", 9, 2, 9, 7], ["advantage", 11, 3, 5, 5], ["obstacle", 11, 2, 1, 1], ["obstacle", 15, 2, 1, 1], ["obstacle", 10, 5, 1, 1], ["obstacle", 16, 5, 1, 1], ["obstacle", 11, 8, 1, 1], ["obstacle", 15, 8, 1, 1], ["wall", 0, 0, 6, 3], ["wall", 3, 4, 3, 2], ["slope", 9, 9, 9, 2], ["concealment", 0, 6, 4, 3], ["difficult", 6, 12, 5, 2]]),
      "Interceptar a patrulha": { ...layout("Saída pela trilha da bruma", "A criatura escolhida que chegar aqui some na bruma.", 18, 1, [["swamp", 0, 0, 20, 14], ["clearing", 0, 8, 14, 4], ["clearing", 11, 3, 3, 6], ["clearing", 13, 1, 7, 3], ["concealment", 15, 4, 5, 5], ["concealment", 3, 2, 6, 4], ["water", 4, 5, 3, 2], ["tree", 8, 2, 2, 2]]), enemyArea: { minX: 7, maxX: 13, minY: 5, maxY: 11 } },
      "Defender a posição avançada": layout("Mausoléu do vigia", "A posição é preparada no degrau do mausoléu.", 8, 8, [["wall", 6, 5, 5, 2], ["advantage", 6, 7, 5, 3], ["slope", 11, 6, 2, 5], ["obstacle", 3, 3, 1, 1], ["obstacle", 15, 3, 1, 1], ["obstacle", 17, 6, 1, 1], ["obstacle", 4, 12, 1, 1], ["concealment", 14, 0, 6, 6], ["difficult", 14, 9, 5, 4]])
    }
  },
  "ship-graveyard": {
    N: { ...layout("Ponta da prancha", "A prancha liga os dois cascos. Esta ponta está apoiada na amurada do casco maior.", 11, 7, [["water", 0, 0, 20, 14], ["deck", 0, 6, 8, 8], ["deck", 12, 0, 8, 10], ["bridge", 8, 7, 4, 1], ["difficult", 3, 8, 2, 2], ["obstacle", 15, 3, 1, 2], ["obstacle", 5, 11, 2, 1], ["difficult", 16, 6, 3, 2]]), enemyArea: { minX: 14, maxX: 19, minY: 0, maxY: 9 }, enemyTiles: ["deck"] },
    S: { ...layout("Rombo do casco", "Um buraco no costado, abaixo da linha d'água. A maré entra por ele.", 18, 7, [["wall", 0, 0, 20, 1], ["wall", 0, 13, 20, 1], ["wall", 18, 1, 1, 6], ["wall", 18, 8, 1, 5], ["deep-water", 19, 1, 1, 12], ["water", 9, 1, 9, 12], ["wet", 5, 1, 4, 12], ["obstacle", 4, 3, 2, 2], ["obstacle", 11, 10, 2, 2], ["obstacle", 13, 3, 1, 1], ["difficult", 7, 6, 3, 2]]), enemyArea: { minX: 10, maxX: 17, minY: 1, maxY: 12 } },
    L: { ...layout("Manivela do guindaste", "O freio do guindaste fica junto à manivela.", 12, 8, [["water", 0, 0, 20, 3], ["deck", 0, 3, 20, 11], ["obstacle", 13, 7, 2, 2], ["obstacle", 13, 3, 1, 4], ["pit", 4, 5, 3, 2], ["obstacle", 7, 11, 2, 1], ["canopy", 16, 9, 4, 5], ["difficult", 9, 4, 3, 2]]), enemyTiles: ["deck", "difficult"] },
    O: { ...layout("Escotilha do porão", "Aberta no meio do convés. Os mortos sobem por ela.", 10, 6, [["water", 0, 0, 20, 2], ["deck", 0, 2, 20, 12], ["wall", 0, 2, 20, 1], ["obstacle", 4, 4, 1, 1], ["obstacle", 15, 4, 1, 1], ["advantage", 16, 3, 4, 4], ["canopy", 14, 9, 6, 5], ["difficult", 6, 9, 3, 2], ["obstacle", 11, 11, 2, 1]]), enemyTiles: ["deck", "advantage"] },
    center: { ...layout("Leme da nau", "O leme da nau capitânia, no alto do tombadilho.", 15, 7, [["water", 0, 0, 20, 2], ["water", 0, 12, 20, 2], ["deck", 0, 2, 20, 10], ["advantage", 13, 4, 6, 6], ["slope", 11, 6, 2, 2], ["obstacle", 6, 6, 1, 2], ["pit", 3, 4, 2, 2], ["obstacle", 17, 4, 1, 1], ["obstacle", 17, 9, 1, 1], ["difficult", 7, 10, 4, 1]]), enemyTiles: ["deck", "advantage", "slope"] },
    byTask: {
      "Limpar o ninho do cordame": { ...layout("Casulo do marinheiro", "Pendurado na teia entre os dois mastros caídos.", 13, 4, [["water", 0, 0, 20, 14], ["deck", 0, 7, 9, 7], ["deck", 9, 0, 11, 13], ["obstacle", 10, 2, 1, 6], ["obstacle", 16, 4, 1, 6], ["web", 11, 3, 5, 5], ["difficult", 4, 9, 3, 2]]), enemyArea: { minX: 16, maxX: 19, minY: 0, maxY: 12 }, enemyTiles: ["deck", "web"] },
      "Tirar o grumete da sentina": { ...layout("Grumete preso", "Preso sob uma viga caída no fundo da sentina.", 14, 9, [["wall", 0, 0, 20, 1], ["wall", 0, 13, 20, 1], ["swamp", 9, 5, 11, 8], ["slope", 6, 5, 3, 8], ["obstacle", 13, 8, 3, 1], ["obstacle", 4, 2, 2, 2], ["difficult", 11, 1, 5, 3], ["obstacle", 17, 2, 1, 1]]), enemyArea: { minX: 10, maxX: 19, minY: 1, maxY: 6 } },
      "Interceptar a patrulha": { ...layout("Corda do bote", "A criatura escolhida que chegar aqui desce pela corda até um bote e foge.", 18, 1, [["water", 0, 0, 20, 14], ["deck", 0, 6, 10, 8], ["bridge", 10, 8, 4, 1], ["deck", 14, 0, 6, 11], ["difficult", 15, 4, 3, 2], ["obstacle", 16, 8, 2, 1]]), enemyArea: { minX: 10, maxX: 15, minY: 6, maxY: 10 } },
      "Defender a posição avançada": { ...layout("Barricada de barris", "A posição é preparada atrás dos barris, junto à carranca.", 8, 8, [["water", 0, 0, 20, 14], ["deck", 0, 4, 14, 10], ["wall", 0, 3, 14, 1], ["deck", 14, 5, 4, 4], ["advantage", 14, 5, 4, 4], ["obstacle", 18, 6, 1, 2], ["obstacle", 9, 6, 1, 1], ["obstacle", 9, 10, 1, 1], ["difficult", 3, 6, 3, 2]]), enemyTiles: ["deck", "advantage"] }
    }
  },
  "cyclopean-ruins": {
    NO: { ...layout("Cabrestante", "Preso no degrau mais baixo. A corda desce até o bote na água.", 10, 5, [["water", 0, 0, 20, 4], ["deep-water", 0, 0, 20, 2], ["slope", 4, 4, 12, 2], ["advantage", 4, 6, 12, 3], ["wall", 16, 4, 4, 6], ["obstacle", 7, 7, 2, 2], ["wet", 0, 9, 20, 5], ["difficult", 12, 10, 4, 2]]), enemyArea: { minX: 0, maxX: 19, minY: 0, maxY: 3 }, enemyTiles: ["water"] },
    NL: layout("Espelho de bronze", "Um espelho do tamanho de uma porta, preso a um eixo de pedra.", 6, 4, [["clearing", 3, 2, 14, 10], ["obstacle", 4, 7, 1, 1], ["obstacle", 8, 6, 1, 1], ["obstacle", 11, 4, 1, 1], ["obstacle", 14, 7, 1, 1], ["obstacle", 16, 3, 1, 1], ["obstacle", 12, 10, 1, 1], ["obstacle", 6, 11, 1, 1], ["difficult", 9, 8, 3, 2], ["wall", 0, 0, 20, 1]]),
    O: { ...layout("Selo do poço", "Riscado na borda do poço, onde as pedras ainda encaixam.", 10, 3, [["deep-water", 8, 5, 5, 5], ["difficult", 6, 3, 9, 1], ["obstacle", 4, 2, 2, 2], ["obstacle", 16, 9, 2, 2], ["advantage", 15, 2, 4, 3], ["wet", 7, 10, 7, 1]]), enemyArea: { minX: 6, maxX: 14, minY: 5, maxY: 11 } },
    L: { ...layout("Poste do guia", "O guia está amarrado ao poste no meio do acampamento.", 13, 5, [["clearing", 8, 3, 11, 8], ["obstacle", 10, 1, 3, 2], ["obstacle", 16, 2, 3, 2], ["obstacle", 15, 9, 3, 2], ["obstacle", 12, 8, 1, 1], ["wall", 0, 0, 6, 3], ["difficult", 5, 9, 3, 3]]), enemyArea: { minX: 15, maxX: 19, minY: 3, maxY: 12 } },
    SO: { ...layout("Mercenário pendurado", "Agarrado à borda partida do arco, sobre o mar.", 9, 8, [["water", 0, 0, 20, 14], ["clearing", 0, 8, 10, 6], ["clearing", 13, 0, 7, 9], ["difficult", 5, 9, 3, 2], ["obstacle", 15, 3, 2, 2]]), enemyArea: { minX: 13, maxX: 19, minY: 0, maxY: 8 } },
    SL: { ...layout("Comporta do trono", "Uma laje de pedra na parede leste da sala alagada.", 19, 7, [["wall", 0, 0, 20, 1], ["wall", 0, 13, 20, 1], ["wall", 19, 1, 1, 6], ["wall", 19, 8, 1, 5], ["water", 6, 1, 13, 12], ["obstacle", 9, 3, 1, 1], ["obstacle", 9, 10, 1, 1], ["obstacle", 14, 3, 1, 1], ["obstacle", 14, 10, 1, 1], ["wet", 4, 1, 2, 12]]), enemyArea: { minX: 6, maxX: 15, minY: 1, maxY: 12 } },
    center: { ...layout("Trono do centro", "O trono de pedra fica no fundo do estrado, de frente para o mar.", 18, 6, [["water", 0, 0, 20, 2], ["advantage", 14, 3, 5, 7], ["slope", 12, 4, 2, 5], ["obstacle", 4, 3, 2, 2], ["obstacle", 4, 9, 2, 2], ["obstacle", 9, 3, 2, 2], ["obstacle", 9, 9, 2, 2], ["difficult", 6, 6, 3, 2], ["wall", 19, 2, 1, 10]]), enemyArea: { minX: 11, maxX: 15, minY: 2, maxY: 9 } },
    byTask: {
      "Apagar a runa do patamar": layout("Runa do patamar", "Gravada no chão do patamar, entre dois pedestais vazios.", 12, 3, [["advantage", 9, 1, 8, 5], ["slope", 9, 6, 8, 2], ["wall", 0, 0, 7, 4], ["obstacle", 10, 2, 1, 1], ["obstacle", 15, 2, 1, 1], ["water", 17, 8, 3, 6], ["difficult", 3, 7, 4, 2]]),
      "Impedir o saque das estátuas": { ...layout("Trilha do acampamento", "A criatura escolhida que chegar aqui foge com a cabeça de pedra.", 19, 7, [["clearing", 15, 5, 5, 5], ["wall", 15, 0, 5, 4], ["wall", 15, 11, 5, 3], ["obstacle", 6, 4, 1, 1], ["obstacle", 9, 7, 1, 1], ["obstacle", 12, 3, 1, 1], ["obstacle", 11, 10, 1, 1], ["difficult", 4, 6, 2, 2]]), enemyArea: { minX: 9, maxX: 14, minY: 4, maxY: 11 } },
      "Travar a engrenagem do olho": { ...layout("Alavanca da engrenagem", "A alavanca de pedra trava a engrenagem gigante.", 14, 6, [["obstacle", 15, 3, 3, 3], ["slope", 5, 4, 4, 6], ["advantage", 0, 0, 5, 4], ["difficult", 9, 8, 3, 2], ["obstacle", 8, 2, 2, 2], ["wet", 10, 11, 10, 3]]), enemyArea: { minX: 10, maxX: 19, minY: 9, maxY: 13 } },
      "Arrancar o cristal de comando": layout("Pilar do cristal", "O cristal de comando está preso no alto de um pilar das ruínas.", 11, 6, [["clearing", 6, 3, 12, 8], ["obstacle", 12, 5, 2, 3], ["advantage", 15, 2, 4, 4], ["obstacle", 7, 2, 1, 1], ["obstacle", 16, 10, 1, 1], ["difficult", 3, 6, 3, 3]]),
      "Proteger a leitura da inscrição": layout("Inscrição do arco", "Entalhada na mureta do arco, em letras do tamanho de um braço.", 6, 6, [["water", 0, 0, 20, 14], ["clearing", 0, 5, 20, 6], ["wet", 0, 11, 20, 3], ["wall", 3, 5, 7, 1], ["obstacle", 11, 7, 2, 2], ["difficult", 15, 6, 3, 2]]),
      "Render o capitão dos mercenários": { ...layout("Degrau do trono", "O primeiro degrau do estrado. O capitão não pode chegar aqui.", 17, 7, [["wall", 0, 0, 20, 1], ["wall", 0, 13, 20, 1], ["advantage", 18, 4, 2, 7], ["slope", 16, 5, 2, 5], ["water", 4, 1, 8, 4], ["obstacle", 8, 6, 1, 1], ["obstacle", 8, 9, 1, 1], ["obstacle", 12, 3, 1, 1], ["obstacle", 12, 10, 1, 1]]), enemyArea: { minX: 6, maxX: 12, minY: 1, maxY: 12 } }
    }
  },
  crystal: crystalLayouts,
  "abandoned-ship": abandonedShipLayouts,
  sacred: {
    NO: { ...layout("Pilar dos espíritos", "Um pilar antigo coberto de oferendas. Os espíritos do bosque falam por ele.", 12, 5, [["clearing", 8, 2, 9, 8], ["foliage", 0, 0, 6, 4], ["foliage", 13, 10, 7, 4], ["tree", 2, 2, 2, 2], ["tree", 5, 6, 1, 1], ["tree", 16, 1, 2, 2], ["tree", 17, 9, 2, 2], ["tree", 9, 11, 2, 2], ["difficult", 6, 8, 2, 2]]), enemyArea: { minX: 15, maxX: 19, minY: 0, maxY: 12 } },
    NL: layout("Mastro do estandarte", "O estandarte de Valkaria com as armas de Arsenal, no meio do pátio da muralha.", 12, 5, [["clearing", 7, 2, 12, 9], ["wall", 6, 0, 1, 4], ["wall", 6, 7, 1, 7], ["obstacle", 15, 2, 3, 1], ["obstacle", 15, 9, 3, 2], ["advantage", 17, 4, 3, 3], ["difficult", 9, 9, 3, 2]]),
    O: { ...layout("Pedra da fonte", "A pedra de onde a água brota, na borda leste da fonte.", 13, 6, [["clearing", 5, 3, 11, 9], ["water", 8, 4, 5, 5], ["deep-water", 9, 5, 3, 3], ["tree", 3, 2, 2, 2], ["tree", 16, 2, 2, 2], ["tree", 16, 10, 2, 2], ["wet", 7, 9, 7, 2]]), enemyArea: { minX: 15, maxX: 19, minY: 0, maxY: 13 } },
    L: layout("Altar de campanha", "Uma mesa de madeira com os símbolos de Valkaria e Arsenal, no meio do acampamento.", 12, 6, [["clearing", 6, 2, 13, 10], ["obstacle", 7, 2, 3, 2], ["obstacle", 15, 2, 3, 2], ["obstacle", 7, 9, 3, 2], ["obstacle", 15, 9, 3, 2], ["difficult", 10, 8, 4, 1]]),
    SO: { ...layout("Círculo de penas", "O círculo de penas ocupa os quadrados de terreno difícil em volta deste ponto. Ninguém do grupo pode pisar nele.", 11, 6, [["advantage", 7, 2, 10, 9], ["slope", 3, 6, 4, 4], ["difficult", 10, 5, 3, 3], ["obstacle", 8, 3, 1, 1], ["obstacle", 15, 3, 1, 1], ["obstacle", 8, 9, 1, 1], ["obstacle", 15, 9, 1, 1]]), enemyArea: { minX: 14, maxX: 19, minY: 0, maxY: 12 } },
    SL: { ...layout("Altar antigo", "O altar dos espíritos, com os símbolos puristas gravados por cima.", 14, 6, [["clearing", 6, 4, 13, 8], ["advantage", 12, 5, 5, 4], ["obstacle", 11, 5, 1, 1], ["obstacle", 17, 5, 1, 1], ["obstacle", 11, 8, 1, 1], ["obstacle", 17, 8, 1, 1], ["difficult", 4, 1, 6, 2]]), enemyArea: { minX: 8, maxX: 19, minY: 0, maxY: 3 } },
    center: { ...layout("Pedra do meio", "A pedra branca onde as duas metades da ilha se encontram.", 18, 6, [["foliage", 0, 0, 6, 4], ["tree", 2, 1, 1, 1], ["tree", 4, 9, 1, 1], ["clearing", 9, 0, 2, 14], ["wall", 16, 0, 1, 4], ["wall", 16, 9, 1, 5], ["advantage", 14, 4, 5, 5]]), enemyArea: { minX: 11, maxX: 14, minY: 3, maxY: 8 } },
    byTask: {
      "Defender o unicórnio ferido": { ...layout("Unicórnio ferido", "Caído entre as árvores, sem forças para fugir.", 8, 4, [["foliage", 0, 0, 20, 3], ["clearing", 5, 3, 6, 5], ["tree", 6, 2, 1, 1], ["tree", 10, 3, 1, 1], ["tree", 7, 6, 1, 1], ["foliage", 14, 5, 6, 5], ["difficult", 3, 8, 3, 2], ["tree", 16, 11, 1, 1]]), enemyArea: { minX: 13, maxX: 19, minY: 0, maxY: 12 } },
      "Abrir as gaiolas dos espíritos": { ...layout("Gaiola grande", "A maior gaiola de ferro frio, com a porta presa por correntes.", 13, 6, [["wall", 0, 0, 20, 1], ["clearing", 8, 2, 11, 10], ["obstacle", 9, 3, 1, 1], ["obstacle", 9, 9, 1, 1], ["obstacle", 16, 3, 1, 1], ["obstacle", 16, 9, 1, 1], ["obstacle", 14, 5, 2, 3], ["difficult", 4, 5, 3, 3]]), enemyArea: { minX: 16, maxX: 19, minY: 1, maxY: 12 } },
      "Devolver o ovo ao ninho": { ...layout("Ninho das aves", "No alto da rocha da fonte. A personagem que carrega o ovo o devolve daqui.", 16, 3, [["advantage", 14, 1, 5, 4], ["slope", 12, 2, 2, 3], ["tree", 4, 3, 1, 1], ["tree", 9, 7, 1, 1], ["water", 3, 6, 4, 3], ["difficult", 8, 10, 4, 2]]), enemyArea: { minX: 10, maxX: 19, minY: 6, maxY: 12 } },
      "Libertar os prisioneiros não humanos": layout("Tronco dos prisioneiros", "Os prisioneiros estão acorrentados ao tronco no fundo do acampamento.", 14, 7, [["wall", 8, 1, 11, 1], ["clearing", 8, 3, 11, 9], ["obstacle", 15, 6, 1, 3], ["obstacle", 10, 4, 2, 1], ["obstacle", 10, 10, 2, 1], ["difficult", 5, 6, 3, 3]]),
      "Espantar os grifos da escadaria": layout("Braseiro de penas", "Um braseiro de pedra na lateral da escadaria. A fumaça acalma as aves.", 6, 4, [["wall", 0, 0, 4, 4], ["advantage", 10, 0, 10, 5], ["slope", 4, 5, 12, 3], ["obstacle", 13, 1, 2, 1], ["obstacle", 17, 3, 2, 1], ["difficult", 9, 9, 3, 2]]),
      "Romper o selo do espírito do altar": layout("Selo purista", "Um selo de ferro cravado ao lado do altar.", 9, 6, [["clearing", 5, 2, 11, 10], ["advantage", 8, 4, 4, 4], ["obstacle", 10, 5, 1, 1], ["difficult", 14, 3, 3, 3], ["obstacle", 4, 3, 1, 1], ["obstacle", 16, 9, 1, 1]])
    }
  }
};

const landmarksByTask = {
  "Silenciar o alarme": ["Concha de alarme", "A concha está pendurada no posto de vigia."],
  "Proteger o círculo de ruptura": ["Círculo de ruptura", "O círculo ritual está traçado em volta do altar."],
  "Tomar o pátio submerso": ["Pedestal da passagem", "O pedestal destrava a passagem para o santuário."],
  "Manter a ancoragem": ["Ancoragem da descida", "A linha está presa à borda da parede e precisa ser firmada antes que a corrente a solte."],
  "Defender o sino de mergulho": ["Sino de mergulho", "O sino está preso a uma roldana na borda do poço."],
  "Proteger o cartógrafo": ["Cartógrafo", "O velho cartógrafo trabalha junto à parede riscada."]
};

export function withIslandTacticalLayout(scene, themeId, objective) {
  const theme = layoutsByTheme[themeId];
  const byTask = theme?.byTask?.[objective?.title];
  const base = byTask ?? theme?.[objective?.direction ?? "center"];
  if (!scene || !base) return scene;
  const taskLandmark = byTask ? null : landmarksByTask[objective?.title];
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
