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
        ["Marcar o desembarque", "exploração", "Faça Sobrevivência para ler as marcas da maré e Atletismo para fincar estacas acima da água."],
        ["Recuperar os cabos", "recuperação", "Use Percepção para localizar os cabos soterrados e Ladinagem para soltá-los sem romper as pontas."],
        ["Defender a amarração", "combate", "Criaturas descem da encosta para tomar a praia. Proteja o poste de amarração até encerrar o confronto."]
      ]
    },
    {
      direction: "NL", name: "Ponte de basalto",
      tasks: [
        ["Firmar a travessia", "exploração", "Use Ofício para testar as juntas do basalto e Atletismo para passar um cabo pelo lado firme."],
        ["Ler as rachaduras", "investigação", "Faça Percepção para achar as fissuras novas e Sobrevivência para traçar uma passagem que as evite."],
        ["Tomar a cabeceira", "combate", "As criaturas guardam a cabeceira da ponte. Vença o encontro para garantir a passagem sobre a lava."]
      ]
    },
    {
      direction: "O", name: "Campo de fumarolas",
      tasks: [
        ["Cruzar entre os jatos", "exploração", "Use Sobrevivência para identificar a ordem dos jatos e Acrobacia para cruzar no intervalo."],
        ["Desviar o vapor", "ritual", "Use Misticismo para ler os selos de ventilação e Ofício para realinhar as comportas."],
        ["Disputar o respiradouro", "combate", "A coluna de vapor corta a visibilidade. Afaste as criaturas e retome o controle do respiradouro."]
      ]
    },
    {
      direction: "L", name: "Galeria de obsidiana",
      tasks: [
        ["Ler os reflexos", "investigação", "Faça Percepção para identificar a saída refletida nas placas e Investigação para achar o marco junto dela."],
        ["Desobstruir a galeria", "recuperação", "Use Ofício para distinguir os painéis que sustentam o teto e Atletismo para mover os fragmentos soltos."],
        ["Limpar a galeria", "combate", "Criaturas se escondem atrás das placas de obsidiana. Supere o encontro para alcançar o marco da saída."]
      ]
    },
    {
      direction: "SO", name: "Terraço da forja",
      defaultGuardianBuff: "defense",
      tasks: [
        ["Resfriar a forja", "exploração", "Faça Ofício para abrir o canal de resfriamento e Atletismo para erguer a comporta emperrada."],
        ["Quebrar o selo da brasa", "ritual", "Use Misticismo para identificar o selo que alimenta a forja e Religião para interromper o vínculo."],
        ["Retomar a forja", "combate", "As criaturas cercam a bigorna. Vença o encontro para tomar o controle do terraço."]
      ]
    },
    {
      direction: "SL", name: "Borda da caldeira",
      defaultGuardianBuff: "hp",
      tasks: [
        ["Marcar a subida", "exploração", "Faça Sobrevivência para prever onde a encosta cederá e Atletismo para instalar a linha de segurança."],
        ["Acalmar o veio arcano", "ritual", "Use Misticismo para acompanhar os pulsos do veio e Religião para firmar as pedras que o contêm."],
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
      briefing: "O gigante se levanta atrás de uma coluna de basalto e toma posição na plataforma central.",
      creatures: [{ id: "gigante-das-rochas", quantity: 1 }]
    },
    {
      id: "corte-das-brasas", name: "Regente das Brasas",
      briefing: "A regente salamandra espera junto ao fragmento com sua guarda de lança em punho.",
      creatures: [{ id: "salamandra-nobre", quantity: 1 }, { id: "salamandra-guerreira", quantity: 1 }]
    }
  ]
};
