import { assetUrl } from "../assetUrl.js";

export const forest11to20Profile = {
  id: "forest-11-20",
  label: "Andares de 11 a 20",
  floors: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  hiddenNodeIcon: assetUrl("/assets/icons/hidden-forest.svg"),
  recommendations: {
    encountersByFloor: {
      11: 3,
      12: 4,
      13: 4,
      14: 5,
      15: 5,
      16: 6,
      17: 6,
      18: 7,
      19: 8,
      20: 8
    },
    baseDcByFloor: {
      11: 15,
      12: 15,
      13: 20,
      14: 20,
      15: 20,
      16: 25,
      17: 25,
      18: 25,
      19: 30,
      20: 30
    }
  },
  encounterRules: {
    boss: { enabled: true, finalFloorOnly: true },
    roomTypes: [
      { type: "normal", label: "Encontro normal", short: "N", weight: 62 },
      { type: "elite", label: "Encontro elite", short: "E", weight: 11 },
      { type: "trap", label: "Armadilha", short: "A", weight: 16 },
      { type: "unknown", label: "Desconhecido", short: "?", weight: 5 },
      { type: "treasure", label: "Tesouro", short: "T", weight: 6 }
    ],
    timeRule: { incrementMinutes: 15, maxMinutes: 60, noCheckMinutes: 30 }
  },
  trapRules: {
    sources: ["livroBasico", "ameacasArton"],
    minimumChallenge: 0.25,
    incidentalChallengeOffset: 1,
    incidentalChanceByRoomType: {
      normal: 0.06,
      elite: 0.1,
      boss: 0.08
    }
  },
  creatureRules: {
    defaultPartySize: 4,
    challengeSource: "creatures",
    bossCreatureId: "quimera",
    defaultTypeWeights: [
      { type: "animal", weight: 30 },
      { type: "construct", weight: 4 },
      { type: "spirit", weight: 8 },
      { type: "humanoid", weight: 18 },
      { type: "monster", weight: 32 },
      { type: "undead", weight: 8 }
    ],
    typeWeightsByTerrain: {
      "Floresta": [
        { type: "animal", weight: 38 },
        { type: "construct", weight: 2 },
        { type: "spirit", weight: 9 },
        { type: "humanoid", weight: 15 },
        { type: "monster", weight: 31 },
        { type: "undead", weight: 5 }
      ],
      "Pântano": [
        { type: "animal", weight: 26 },
        { type: "construct", weight: 2 },
        { type: "spirit", weight: 10 },
        { type: "humanoid", weight: 8 },
        { type: "monster", weight: 39 },
        { type: "undead", weight: 15 }
      ],
      "Aquático": [
        { type: "animal", weight: 34 },
        { type: "construct", weight: 1 },
        { type: "spirit", weight: 14 },
        { type: "humanoid", weight: 6 },
        { type: "monster", weight: 40 },
        { type: "undead", weight: 5 }
      ],
      "Colinas": [
        { type: "animal", weight: 28 },
        { type: "construct", weight: 5 },
        { type: "spirit", weight: 8 },
        { type: "humanoid", weight: 28 },
        { type: "monster", weight: 26 },
        { type: "undead", weight: 5 }
      ],
      "Planície aberta": [
        { type: "animal", weight: 22 },
        { type: "construct", weight: 6 },
        { type: "spirit", weight: 6 },
        { type: "humanoid", weight: 40 },
        { type: "monster", weight: 20 },
        { type: "undead", weight: 6 }
      ]
    },
    groupGuidance: [
      "O ND-alvo considera uma criatura ou encontro justo para quatro personagens.",
      "Use este ND como alvo da criatura principal; clima e terreno continuam ajustando o ND total do encontro.",
      "Ajuste o ND em 1 ou 2 pontos para grupos maiores, menores, veteranos, desgastados ou em circunstâncias muito favoráveis."
    ]
  },
  challengeRules: {
    minimum: 0.25,
    maximum: 8,
    defaultBoss: 8,
    bossByFloor: {
      20: 8
    },
    floorBands: [
      { floors: [11, 12], byType: { normal: 1, trap: 1, treasure: 1, unknown: 1, camp: 0.25, elite: 3 } },
      { floors: [13, 14], byType: { normal: 2, trap: 2, treasure: 2, unknown: 2, camp: 0.25, elite: 4 } },
      { floors: [15, 16], byType: { normal: 3, trap: 3, treasure: 3, unknown: 3, camp: 0.5, elite: 5 } },
      { floors: [17, 18], byType: { normal: 4, trap: 4, treasure: 4, unknown: 4, camp: 0.5, elite: 6 } },
      { floors: [19, 20], byType: { normal: 5, trap: 5, treasure: 5, unknown: 5, camp: 0.75, elite: 7 } }
    ],
    climateWeights: {
      "Clima normal": 0,
      "Calor": 0.5,
      "Calor extremo": 1,
      "Frio": 0.5,
      "Frio extremo": 1,
      "Neblina": 0.25,
      "Chuva": 0.25,
      "Granizo": 0.75,
      "Neve": 0.5,
      "Tempestade": 2,
      "Vento forte": 0.25,
      "Vendaval": 0.5,
      "Furacão": 2,
      "Tornado": 3
    },
    terrainWeights: {
      "Floresta": 0.25,
      "Pântano": 0.5,
      "Aquático": 0.75,
      "Colinas": 0.25,
      "Planície aberta": 0
    },
    terrainFeatureWeights: {
      "Árvores": 0.25,
      "Folhagens": 0.25,
      "Vegetação rasteira": 0.25,
      "Inclinação suave": 0.25,
      "Inclinação íngreme": 0.5,
      "Penhasco": 0.75,
      "Clareira": 0,
      "Lodaçal": 0.5,
      "Vegetação alagada": 0.5,
      "Água parada": 0.25,
      "Árvores retorcidas": 0.25,
      "Água corrente": 0.75,
      "Personagens submersos": 0.5,
      "Trincheira": 0.25,
      "Solo encharcado": 0.25
    }
  },
  theme: {
    page: "#111a13",
    header: "#1d3424",
    headerBorder: "#4f7a57",
    surface: "#101810",
    surfaceAlt: "#152216",
    panel: "rgba(16, 24, 16, 0.96)",
    border: "#5f8a66",
    borderSoft: "#31563a",
    action: "#2f6b44",
    actionHover: "#3f8154",
    scrollbarTrack: "#162117",
    scrollbarThumb: "#5f8a66",
    mapGlow: "rgba(64, 122, 74, 0.14)",
    columnColors: [
      "#9fc88e",
      "#7fb678",
      "#5fa66a",
      "#c3d7a0",
      "#6f9461",
      "#93b86f",
      "#4f7f57"
    ]
  },
  environmentRules: {
    climate: {
      variationCountOptions: [
        { weight: 68, value: 0 },
        { weight: 24, value: 1 },
        { weight: 7, value: 2 },
        { weight: 1, value: 3 }
      ],
      variationKindOptions: [
        { weight: 18, value: "temperature" },
        { weight: 18, value: "fog" },
        { weight: 38, value: "precipitation" },
        { weight: 26, value: "wind" }
      ],
      temperatureOptions: [
        { weight: 43, value: { name: "Calor", effect: "Acima de 50 ºC. Teste de Fortitude por dia (CD 15 + 1 por teste anterior). Falha: sofre 1d6 de dano de fogo e não consegue recuperar PV/PM por descanso até sair do clima quente." } },
        { weight: 18, value: { name: "Calor extremo", effect: "Acima de 60 ºC. Teste de Fortitude por minuto (CD 15 + 1 por teste anterior). Falha: sofre 1d6 de dano de fogo e não consegue recuperar PV/PM por descanso até sair do clima quente." } },
        { weight: 29, value: { name: "Frio", effect: "Abaixo de -10 ºC. Teste de Fortitude por dia (CD 15 + 1 por teste anterior). Falha: sofre 1d6 de dano de frio e não consegue recuperar PV/PM por descanso até sair do clima frio." } },
        { weight: 10, value: { name: "Frio extremo", effect: "Abaixo de -20 ºC. Teste de Fortitude por minuto (CD 15 + 1 por teste anterior). Falha: sofre 1d6 de dano de frio e não consegue recuperar PV/PM por descanso até sair do clima frio." } }
      ],
      precipitationOptions: [
        { weight: 58, value: { name: "Chuva", effect: "-5 em testes de Percepção. Também aplica os efeitos de vento forte." } },
        { weight: 12, value: { name: "Granizo", effect: "Aplica chuva: -5 em testes de Percepção e efeitos de vento forte (-2 em ataques à distância; 50% de chance por rodada de apagar chamas ou dissipar névoas). Além disso, no início de cada rodada, todas as criaturas sofrem 1 ponto de dano de impacto." } },
        { weight: 8, value: { name: "Neve", effect: "Aplica chuva: -5 em testes de Percepção e efeitos de vento forte (-2 em ataques à distância; 50% de chance por rodada de apagar chamas ou dissipar névoas). Além disso, cria terreno difícil." } },
        { weight: 22, value: { name: "Tempestade", effect: "-10 em testes de Percepção. Aplica vendaval: -5 em ataques à distância, apaga chamas e dissipa névoas. No início de cada rodada, há 10% de chance de uma criatura aleatória ser atingida por um raio, sofrendo 8d10 de dano de eletricidade." } }
      ],
      windOptions: [
        { weight: 68, value: { name: "Vento forte", effect: "-2 em testes de ataque à distância. A cada rodada, 50% de chance de apagar chamas ou dissipar névoas." } },
        { weight: 23, value: { name: "Vendaval", effect: "-5 em testes de ataque à distância. Apaga chamas e dissipa névoas." } },
        { weight: 7, value: { name: "Furacão", effect: "Ataques à distância são impossíveis. Apaga chamas e dissipa névoas. No início de cada rodada, criaturas Médias ou menores fazem Fortitude CD 15; se falharem, são arrastadas 1d4 x 1,5 m e sofrem 1d6 de dano de impacto para cada 1,5 m." } },
        { weight: 2, value: { name: "Tornado", effect: "Ataques à distância são impossíveis. Apaga chamas e dissipa névoas. No início de cada rodada, criaturas Grandes ou menores fazem Fortitude CD 25; se falharem, são arrastadas 1d12 x 1,5 m em direção aleatória e sofrem 1d6 de dano de impacto para cada 1,5 m." } }
      ],
      fog: {
        name: "Neblina",
        effect: "Fornece camuflagem. Neblina espessa fornece camuflagem leve a criaturas a 1,5 m e camuflagem total a criaturas a mais de 1,5 m."
      },
      heatClimateNames: ["Calor", "Calor extremo"],
      coldPrecipitationNames: ["Granizo", "Neve"],
      damagingClimateNames: [
        "Calor",
        "Calor extremo",
        "Frio",
        "Frio extremo",
        "Granizo",
        "Tempestade",
        "Furacão",
        "Tornado"
      ]
    },
    terrain: {
      terrainOptions: [
        {
          weight: 60,
          value: {
            name: "Floresta",
            effect: "Floresta fechada ou aberta. Normalmente há árvores, folhagens e vegetação rasteira; cobertura, camuflagem e terreno difícil são comuns.",
            featureOptions: [
              { weight: 26, value: { name: "Árvores", effect: "Árvores estreitas têm menos de 1,5 m de largura; árvores largas têm mais de 1,5 m. Árvore estreita concede cobertura leve; árvore larga tem RD 5 e 500 PV. Subir exige Atletismo CD 15; permanecer no topo exige Equilíbrio CD 15, exceto em árvore larga, que concede cobertura leve contra criaturas no solo." } },
              { weight: 24, value: { name: "Folhagens", effect: "Mato e arbustos contam como terreno difícil e fornecem camuflagem leve para criaturas dentro deles." } },
              { weight: 24, value: { name: "Vegetação rasteira", effect: "Raízes, vinhas e outros tipos de vegetação rasteira contam como terreno difícil. Também impõem -2 em testes de Furtividade pelas folhas secas e galhos caídos." } },
              { weight: 10, value: { name: "Inclinação suave", effect: "Não afeta o movimento. Personagens no lado superior recebem bônus por terreno elevado contra personagens no lado inferior." } },
              { weight: 8, value: { name: "Inclinação íngreme", effect: "Conta como terreno difícil para subir. Descer correndo ou fazendo investida exige Acrobacia CD 10; em falha, cai no chão, rola 1d4 x 1,5 m para frente e sofre 1d6 de dano de impacto para cada 1,5 m." } },
              { weight: 4, value: { name: "Penhasco", effect: "Rochedo alto e escarpado. Escalar exige Atletismo CD 15. Cair de um penhasco causa 1d6 de dano para cada 3 m de altura." } },
              { weight: 4, value: { name: "Clareira", effect: "Área aberta dentro da mata. Reduz cobertura e camuflagem naturais, deixando linhas de visão e ataques à distância mais fáceis." } }
            ]
          }
        },
        {
          weight: 24,
          value: {
            name: "Pântano",
            effect: "Brejos, charcos, mangues e lama. Possui muita vegetação rasteira, folhagens, árvores, água parada e lodaçais.",
            featureOptions: [
              { weight: 38, value: { name: "Lodaçal", effect: "Poça com mistura de água e lama. Conta como terreno difícil e impõe a condição vulnerável a qualquer personagem dentro dele." } },
              { weight: 32, value: { name: "Vegetação alagada", effect: "Vegetação rasteira, folhagens e árvores em área alagada. Em geral conta como terreno difícil e pode fornecer camuflagem leve conforme a cobertura." } },
              { weight: 18, value: { name: "Água parada", effect: "Água parada exige testes de Atletismo para nadar, sem modificador adicional." } },
              { weight: 12, value: { name: "Árvores retorcidas", effect: "Árvores em terreno alagado podem conceder cobertura leve; deslocar-se entre raízes e lama normalmente conta como terreno difícil." } }
            ]
          }
        },
        {
          weight: 8,
          value: {
            name: "Aquático",
            effect: "Áreas com água corrente, como rios, ou água parada, como lagos e pântanos. Pode envolver natação, correnteza e criaturas submersas.",
            featureOptions: [
              { weight: 40, value: { name: "Água corrente", effect: "Corrente típica arrasta 1d6 x 3 m por rodada. No fim de cada rodada, todos na água são arrastados nessa velocidade. Nadar contra a corrente exige Atletismo CD 15 para corrente normal ou CD 20 para corrente rápida. Sair exige chegar à margem ou ponto de apoio e passar em Atletismo CD 20 para agarrar algo; em falha, segue sendo arrastado." } },
              { weight: 35, value: { name: "Água parada", effect: "Água parada exige testes de Atletismo para nadar, sem modificador adicional." } },
              { weight: 25, value: { name: "Personagens submersos", effect: "Criaturas submersas sofrem -2 em ataques e -5 em Percepção. Deslocamento de natação ignora essas penalidades. Armas à distância não podem ser usadas, exceto arremesso de perfuração, bestas e redes. Armas de corte e impacto causam metade do dano debaixo d’água. Criaturas submersas recebem camuflagem e cobertura leves contra personagens fora d’água." } }
            ]
          }
        },
        {
          weight: 6,
          value: {
            name: "Colinas",
            effect: "Ondulações suaves ou íngremes e eventuais penhascos. Em florestas destes andares, podem aparecer como elevações, ribanceiras e rochedos cobertos por vegetação.",
            featureOptions: [
              { weight: 45, value: { name: "Inclinação suave", effect: "Não afeta o movimento. Personagens no lado superior recebem bônus por terreno elevado contra personagens no lado inferior." } },
              { weight: 35, value: { name: "Inclinação íngreme", effect: "Conta como terreno difícil para subir. Descer correndo ou fazendo investida exige Acrobacia CD 10; em falha, cai no chão, rola 1d4 x 1,5 m para frente e sofre 1d6 de dano de impacto para cada 1,5 m." } },
              { weight: 20, value: { name: "Penhasco", effect: "Rochedo alto e escarpado. Escalar exige Atletismo CD 15. Cair de um penhasco causa 1d6 de dano para cada 3 m de altura." } }
            ]
          }
        },
        {
          weight: 2,
          value: {
            name: "Planície aberta",
            effect: "Clareira, estrada, pasto ou campo aberto dentro do andar florestal. Normalmente não há elementos associados a planícies, exceto trincheiras ou valas ocasionais.",
            featureOptions: [
              { weight: 100, value: { name: "Trincheira", effect: "Vala escavada no solo para proteção. Quem está dentro recebe cobertura leve contra ataques à distância. Sair exige movimento e conta como terreno difícil. Também pode representar valas, leitos de rio secos e acidentes geográficos similares." } }
            ]
          }
        }
      ],
      forestAquaticFeatureChance: 12,
      wetSoilChance: 8,
      wetSoilFeature: {
        name: "Solo encharcado",
        effect: "Trechos baixos e encharcados contam como terreno difícil."
      }
    }
  }
};
