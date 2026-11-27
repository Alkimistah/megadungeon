import { islandGuardianBuffs } from "./archipelagoGuardianBuffs.js";

const tideRule = "No fim do turno de uma criatura em um corredor ativo, mova-a 1 quadrado na direção indicada se a casa de destino estiver livre e transitável para ela. Na primeira rodada, a corrente segue para o poço. Na segunda, ela se inverte. A terceira é de calmaria. Repita o ciclo a partir da quarta rodada. O banco central e as saídas permanecem acessíveis nas três fases.";

export const impossibleTideExploration = {
  pilot: "impossible-tide-sectors",
  combatChallenge: 7,
  guardianBuffs: islandGuardianBuffs,
  terrain: {
    name: "Costa de maré impossível",
    effect: "Na vazante, canais sobem pelas encostas. Na enchente, bancos de areia reaparecem onde a água deveria cobri-los.",
    features: [
      { name: "Fase da maré", effect: "A tarefa indica a fase e a planta mostra os caminhos disponíveis." },
      { name: "Água funda", effect: "As zonas azuis são água funda; use as passagens em terra firme para contorná-las." }
    ]
  },
  sectors: [
    {
      direction: "NO", name: "Cais ao Contrário",
      tasks: [
        ["Firmar as amarras", "exploração", "Obtenha 3 sucessos antes de 2 falhas. Escolha um cabeço firme com Percepção, confira as amarras com Ofício (marinheiro) e tensione as cordas com Atletismo. Cada etapa exige um sucesso. Na segunda falha, a maré se inverte e o grupo precisa recuar."],
        ["Defender o cabo", "combate", "Vazante. Defenda o cabo no poste enquanto a corrente corre para o alto do cais."],
        ["Retomar o bote", "combate", "Enchente. Vença o encontro para alcançar o bote encalhado no banco seco."]
      ]
    },
    {
      direction: "NL", name: "Canal Suspenso",
      tasks: [
        ["Ler o contrafluxo", "exploração", "Obtenha 3 sucessos antes de 2 falhas. Leia as marcas com Sobrevivência, identifique a inversão com Misticismo e confirme a passagem com Percepção. Cada etapa exige um sucesso. Na segunda falha, a maré se inverte e o grupo precisa recuar."],
        ["Abrir a passagem", "combate", "Vazante. Vença o encontro para liberar a escada onde o canal sobe pela parede."],
        ["Proteger a comporta", "combate", "Enchente. Controle a plataforma da alavanca com a água cruzando a galeria."]
      ]
    },
    {
      direction: "O", name: "Bancos Errantes",
      tasks: [
        ["Recuperar as sondas", "exploração", "Obtenha 3 sucessos antes de 2 falhas. Encontre as sondas com Percepção, solte os nós com Ladinagem e recolha a linha com Atletismo. Cada etapa exige um sucesso. Na segunda falha, a maré se inverte e o grupo precisa recuar."],
        ["Tomar o banco", "combate", "Vazante. Atravesse dois bancos expostos e vença o encontro no marco entre eles."],
        ["Resgatar a boia", "combate", "Enchente. Lute na margem enquanto a boia fica presa numa bolsa de água parada."]
      ]
    },
    {
      direction: "L", name: "Gruta do Refluxo",
      tasks: [
        ["Mapear a gruta", "exploração", "Obtenha 3 sucessos antes de 2 falhas. Ligue as marcas de água com Investigação, siga a ventilação com Sobrevivência e confirme a saída com Percepção. Cada etapa exige um sucesso. Na segunda falha, a maré se inverte e o grupo precisa recuar."],
        ["Limpar a saída", "combate", "Vazante. O corredor lateral está seco. Vença o encontro antes de seguir pela abertura marcada."],
        ["Guardar o respiradouro", "combate", "Enchente. O respiradouro é o acesso seco mais curto entre as duas margens."]
      ]
    },
    {
      direction: "SO", name: "Casa das Comportas", defaultGuardianBuff: "defense",
      tasks: [
        ["Travar as engrenagens", "exploração", "Obtenha 3 sucessos antes de 2 falhas. Identifique a peça sob tensão com Investigação, desligue a alimentação com Ofício e trave as engrenagens com Ladinagem. Cada etapa exige um sucesso. Na segunda falha, a maré se inverte e o grupo precisa recuar."],
        ["Destravar o volante", "combate", "Vazante. Vença o encontro para abrir acesso ao volante entre duas valas."],
        ["Retomar a válvula", "combate", "Enchente. Alcance a válvula no lado seco do canal alagado."]
      ]
    },
    {
      direction: "SL", name: "Espigão da Maré", defaultGuardianBuff: "hp",
      tasks: [
        ["Recalibrar a baliza", "exploração", "Obtenha 3 sucessos antes de 2 falhas. Reconheça o ciclo com Misticismo, alcance a baliza com Atletismo e alinhe os indicadores com Ofício. Cada etapa exige um sucesso. Na segunda falha, a maré se inverte e o grupo precisa recuar."],
        ["Tomar a crista", "combate", "Vazante. A crista seca permite contornar a água para chegar à baliza."],
        ["Defender a baliza", "combate", "Enchente. As duas rampas ainda permitem chegar à baliza pelo banco central."]
      ]
    }
  ],
  guardians: [
    {
      id: "gigante-dos-mares",
      briefing: "O Gigante dos Mares toma posição no banco central e guarda o pedestal enquanto a corrente se inverte.",
      rule: tideRule,
      creatures: [{ id: "gigante-dos-mares", quantity: 1 }]
    },
    {
      id: "cardume-de-selakos",
      briefing: "O Cardume de Selakos começa no trecho fundo ligado aos corredores. A rota seca contorna a água, mas passa perto do pedestal.",
      rule: tideRule,
      creatures: [{ id: "cardume-de-selakos", quantity: 1 }]
    },
    {
      id: "corgann-das-duas-mares",
      briefing: "O Corgann guarda sozinho a boca do poço. Ele muda de margem com Salto Aquático e ameaça a travessia com Jato Pressurizado.",
      rule: tideRule,
      creatures: [{ id: "corgann-das-duas-mares", quantity: 1 }]
    }
  ]
};
