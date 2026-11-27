import { islandGuardianBuffs } from "./archipelagoGuardianBuffs.js";

export const seaCavesExploration = {
  pilot: "sea-cave-sectors",
  combatChallenge: 7,
  guardianBuffs: islandGuardianBuffs.filter(buff => buff.id !== "rd-fogo"),
  terrain: {
    name: "Cavernas marinhas",
    effect: "A maré corre pelos túneis. As plataformas de pedra oferecem terreno firme entre os canais.",
    features: [{ name: "Rocha molhada", effect: "Terreno difícil onde indicado no mapa." }]
  },
  sectors: [
    {
      direction: "NO", name: "Boca da maré",
      tasks: [
        ["Ler a vazante", "exploração", "Obtenha 3 sucessos antes de 2 falhas. Preveja a vazante com Sobrevivência, localize as boias com Percepção e estenda o cabo com Atletismo. Cada etapa exige um sucesso. Na segunda falha, a entrada alaga e o grupo volta ao barco."],
        ["Recuperar as boias", "combate", "Até o fim da quarta rodada, gaste uma ação padrão junto às boias encalhadas para soltar seus cabos. Registre sucesso se o grupo conseguir soltar as boias e vencer o combate."],
        ["Defender o desembarque", "combate", "A corrente empurra criaturas para a entrada. Proteja o cabo que marca a volta ao barco."]
      ]
    },
    {
      direction: "NL", name: "Galeria dos ecos",
      tasks: [
        ["Cartografar os ecos", "exploração", "Obtenha 3 sucessos antes de 2 falhas. Separe os ecos com Percepção, registre as bifurcações com Investigação e reconheça o vão seco com Sobrevivência. Cada etapa exige um sucesso. Na segunda falha, os ecos levam o grupo de volta à bifurcação."],
        ["Passar pelo vão seco", "combate", "Até o fim da quarta rodada, faça pelo menos uma personagem atravessar o vão até a marca do outro lado. Registre sucesso se o grupo conseguir cruzar o vão e vencer o combate."],
        ["Desocupar a galeria", "combate", "Criaturas espreitam entre as colunas. Libere a passagem e marque a bifurcação."]
      ]
    },
    {
      direction: "O", name: "Bolsão de ar",
      tasks: [
        ["Testar o ar", "exploração", "Obtenha 3 sucessos antes de 2 falhas. Reconheça a corrente de ar com Sobrevivência, encontre uma saída com Percepção e alcance a saliência com Atletismo. Cada etapa exige um sucesso. Na segunda falha, o grupo perde a saída e retorna pelo túnel."],
        ["Instalar a linha de retorno", "combate", "Até o fim da quarta rodada, gaste duas ações padrão junto à saliência, em rodadas diferentes, para fixar a linha de retorno. Registre sucesso se o grupo conseguir fixar a linha e vencer o combate."],
        ["Garantir o refúgio", "combate", "O bolsão é a única parada com ar entre dois túneis. Afaste as criaturas que bloqueiam a plataforma."]
      ]
    },
    {
      direction: "L", name: "Túnel da corrente",
      tasks: [
        ["Medir o refluxo", "exploração", "Obtenha 3 sucessos antes de 2 falhas. Marque o intervalo da corrente com Percepção, preveja o refluxo com Sobrevivência e confira a tensão do cabo com Ofício. Cada etapa exige um sucesso. Na segunda falha, a corrente leva o cabo e o grupo recua."],
        ["Atravessar o refluxo", "combate", "Até o fim da quarta rodada, leve uma personagem até o marco no outro lado pelo banco lateral que aparece durante o refluxo. Registre sucesso se o grupo conseguir alcançar o marco e vencer o combate."],
        ["Proteger o cabo-guia", "combate", "A corrente arrasta o cabo-guia. Vença o encontro para firmar a linha na ancoragem."]
      ]
    },
    {
      direction: "SO", name: "Comporta submersa",
      defaultGuardianBuff: "defense",
      tasks: [
        ["Interromper o selo da maré", "ritual", "Obtenha 3 sucessos antes de 2 falhas. Limpe a engrenagem com Ofício, siga o traçado do selo com Misticismo e corte o vínculo com Religião. Cada etapa exige um sucesso. Na segunda falha, o selo volta a alimentar a corrente."],
        ["Fechar o desvio", "combate", "Até o fim da quarta rodada, gaste duas ações padrão junto à roda auxiliar, em rodadas diferentes, para fechar o desvio. Registre sucesso se o grupo conseguir fechar o desvio e vencer o combate."],
        ["Tomar a plataforma da comporta", "combate", "Criaturas defendem a roda da comporta. Afaste-as para interromper o fluxo que protege o guardião."]
      ]
    },
    {
      direction: "SL", name: "Poço dos contrapesos",
      defaultGuardianBuff: "hp",
      tasks: [
        ["Desligar o foco de pressão", "ritual", "Obtenha 3 sucessos antes de 2 falhas. Encontre o foco com Misticismo, inspecione a trava com Ofício e desfaça o vínculo com Religião. Cada etapa exige um sucesso. Na segunda falha, a pressão volta a erguer o contrapeso."],
        ["Baixar o contrapeso", "combate", "Até o fim da quarta rodada, gaste duas ações padrão junto à trava, em rodadas diferentes, para baixar o contrapeso. Registre sucesso se o grupo conseguir baixar o contrapeso e vencer o combate."],
        ["Controlar o guincho", "combate", "As criaturas cercam o guincho do poço. Vença o confronto e solte o mecanismo que sustenta a proteção do Centro."]
      ]
    }
  ],
  guardians: [
    {
      id: "cardume-do-labirinto", name: "Cardume do Labirinto",
      briefing: "As barbatanas somem atrás dos pilares e reaparecem dos dois lados da plataforma.",
      creatures: [{ id: "cardume-de-selakos", quantity: 1 }]
    },
    {
      id: "vigia-do-sifao", name: "Vigia do Sifão",
      briefing: "O gigante dos mares emerge do sifão e bloqueia com o corpo a passagem até o fragmento.",
      creatures: [{ id: "gigante-dos-mares", quantity: 1 }]
    },
    {
      id: "capitao-do-poco", name: "Capitão do Poço",
      briefing: "O capitão homem-piranha chama a lula que espreita sob a plataforma do fragmento.",
      creatures: [{ id: "homem-piranha-capitao", quantity: 1 }, { id: "lula-gigante", quantity: 1 }]
    }
  ]
};
