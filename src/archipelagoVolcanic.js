import { islandGuardianBuffs } from "./archipelagoGuardianBuffs.js";

export const volcanicExploration = {
  pilot: "volcanic-sectors",
  combatChallenge: 7,
  guardianBuffs: islandGuardianBuffs,
  terrain: {
    name: "Caldeira vulcânica",
    effect: "O calor distorce o ar. As correntes de lava são intransitáveis.",
    features: [{ name: "Cinzas soltas", effect: "Terreno difícil onde indicado no mapa." }]
  },
  sectors: [
    {
      direction: "NO", name: "Praia de cinzas",
      tasks: [
        ["Marcar o desembarque", "exploração", "Obtenha 3 sucessos antes de 2 falhas. Leia a maré com Sobrevivência, encontre os cabos com Percepção e finque as estacas com Atletismo. Cada etapa exige um sucesso. Na segunda falha, a água cobre o ponto de desembarque."],
        ["Recuperar os cabos", "combate", "Até o fim da quarta rodada, gaste uma ação padrão junto aos cabos para soltá-los antes que a água os arraste. Registre sucesso se o grupo conseguir soltar os cabos e vencer o combate."],
        ["Defender a amarração", "combate", "Criaturas descem da encosta para tomar a praia. Proteja o poste de amarração até encerrar o confronto."]
      ]
    },
    {
      direction: "NL", name: "Ponte de basalto",
      tasks: [
        ["Ler as rachaduras", "exploração", "Obtenha 3 sucessos antes de 2 falhas. Ache as fissuras com Percepção, examine o basalto com Ofício e trace uma passagem com Sobrevivência. Cada etapa exige um sucesso. Na segunda falha, a rota fica comprometida e o grupo recua."],
        ["Firmar a travessia", "combate", "Até o fim da quarta rodada, gaste duas ações padrão junto à ancoragem, em rodadas diferentes, para instalar a linha de segurança. Registre sucesso se o grupo conseguir firmar a linha e vencer o combate."],
        ["Tomar a cabeceira", "combate", "As criaturas guardam a cabeceira da ponte. Vença o encontro para garantir a passagem sobre a lava."]
      ]
    },
    {
      direction: "O", name: "Campo de fumarolas",
      tasks: [
        ["Cruzar entre os jatos", "exploração", "Obtenha 3 sucessos antes de 2 falhas. Leia os selos com Misticismo, identifique a ordem dos jatos com Sobrevivência e cruze no intervalo com Acrobacia. Cada etapa exige um sucesso. Na segunda falha, o vapor fecha a rota e o grupo recua."],
        ["Desviar o vapor", "combate", "Até o fim da quarta rodada, gaste uma ação padrão junto à comporta para desviar o vapor. Registre sucesso se o grupo conseguir desviar o vapor e vencer o combate."],
        ["Disputar o respiradouro", "combate", "A coluna de vapor corta a visibilidade. Afaste as criaturas e retome o controle do respiradouro."]
      ]
    },
    {
      direction: "L", name: "Galeria de obsidiana",
      tasks: [
        ["Ler os reflexos", "exploração", "Obtenha 3 sucessos antes de 2 falhas. Identifique a saída refletida com Percepção, localize o marco com Investigação e reconheça os painéis de sustentação com Ofício. Cada etapa exige um sucesso. Na segunda falha, o grupo perde o caminho entre os reflexos."],
        ["Desobstruir a galeria", "combate", "Até o fim da quarta rodada, gaste duas ações padrão junto à placa caída, em rodadas diferentes, para soltá-la. Registre sucesso se o grupo conseguir liberar a saída e vencer o combate."],
        ["Limpar a galeria", "combate", "Criaturas se escondem atrás das placas de obsidiana. Supere o encontro para alcançar o marco da saída."]
      ]
    },
    {
      direction: "SO", name: "Terraço da forja",
      defaultGuardianBuff: "defense",
      tasks: [
        ["Quebrar o selo da brasa", "ritual", "Obtenha 3 sucessos antes de 2 falhas. Identifique o selo com Misticismo, prepare o canal com Ofício e rompa o vínculo da brasa com Religião. Cada etapa exige um sucesso. Na segunda falha, o selo volta a aquecer a forja."],
        ["Resfriar a forja", "combate", "Até o fim da quarta rodada, gaste uma ação padrão junto à válvula para abrir o canal de resfriamento. Registre sucesso se o grupo conseguir abrir o canal e vencer o combate."],
        ["Retomar a forja", "combate", "As criaturas cercam a bigorna. Vença o encontro para tomar o controle do terraço."]
      ]
    },
    {
      direction: "SL", name: "Borda da caldeira",
      defaultGuardianBuff: "hp",
      tasks: [
        ["Marcar a subida", "exploração", "Obtenha 3 sucessos antes de 2 falhas. Preveja onde a encosta cederá com Sobrevivência, acompanhe os pulsos do veio com Misticismo e instale a linha de segurança com Atletismo. Cada etapa exige um sucesso. Na segunda falha, a encosta cede e o grupo recua."],
        ["Acalmar o veio arcano", "combate", "Até o fim da quarta rodada, gaste duas ações padrão junto às pedras do selo, em rodadas diferentes, para firmá-las. Registre sucesso se o grupo conseguir conter a fissura e vencer o combate."],
        ["Garantir a subida", "combate", "As criaturas defendem a última plataforma antes da caldeira. Vença o confronto para firmar a rota."]
      ]
    }
  ],
  guardians: [
    {
      id: "fornalha-de-bronze", name: "Fornalha de Bronze",
      briefing: "O golem desprende os pés da rocha e se ergue diante do pedestal do fragmento.",
      creatures: [{ id: "golem-de-bronze", quantity: 1 }]
    },
    {
      id: "sentinela-da-caldeira", name: "Sentinela da Caldeira",
      briefing: "A crosta de basalto se rompe junto ao pedestal. Um ber-baram emerge da fenda e baixa os chifres, deixando veios de lava à mostra.",
      creatures: [{ id: "ber-baram-da-caldeira", quantity: 1 }]
    },
    {
      id: "corte-das-brasas", name: "Regente das Brasas",
      briefing: "A regente salamandra espera junto ao fragmento com sua guarda de lança em punho.",
      creatures: [{ id: "salamandra-nobre", quantity: 1 }, { id: "salamandra-guerreira", quantity: 1 }]
    }
  ]
};
