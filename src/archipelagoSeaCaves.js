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
        ["Ler a vazante", "exploração", "Use Sobrevivência para prever a vazante e Atletismo para estender um cabo na entrada."],
        ["Recuperar as boias", "recuperação", "Use Percepção para encontrar as boias encalhadas e Ladinagem para soltar seus cabos da rocha."],
        ["Defender o desembarque", "combate", "A corrente empurra criaturas para a entrada. Proteja o cabo que marca a volta ao barco."]
      ]
    },
    {
      direction: "NL", name: "Galeria dos ecos",
      tasks: [
        ["Cartografar os ecos", "investigação", "Use Percepção para distinguir os ecos e Investigação para registrar as bifurcações."],
        ["Passar pelo vão seco", "exploração", "Use Sobrevivência para encontrar a boca seca e Acrobacia para cruzar a passagem estreita."],
        ["Desocupar a galeria", "combate", "Criaturas espreitam entre as colunas. Libere a passagem e marque a bifurcação."]
      ]
    },
    {
      direction: "O", name: "Bolsão de ar",
      tasks: [
        ["Testar o ar", "investigação", "Use Sobrevivência para reconhecer a corrente de ar e Percepção para achar uma saída acima da água."],
        ["Instalar a linha de retorno", "exploração", "Use Atletismo para alcançar a saliência e Ofício para prender às rochas uma linha firme."],
        ["Garantir o refúgio", "combate", "O bolsão é a única parada com ar entre dois túneis. Afaste as criaturas que bloqueiam a plataforma."]
      ]
    },
    {
      direction: "L", name: "Túnel da corrente",
      tasks: [
        ["Medir o refluxo", "investigação", "Use Percepção para marcar o intervalo da corrente e Sobrevivência para escolher o momento de travessia."],
        ["Prender o cabo-guia", "exploração", "Use Atletismo para atravessar a corrente e Ofício para firmar o cabo no outro lado."],
        ["Proteger o cabo-guia", "combate", "A corrente arrasta o cabo-guia. Vença o encontro para firmar a linha na ancoragem."]
      ]
    },
    {
      direction: "SO", name: "Comporta submersa",
      defaultGuardianBuff: "defense",
      tasks: [
        ["Fechar o desvio", "exploração", "Use Ofício para remover as conchas da engrenagem e Atletismo para girar a roda contra a água."],
        ["Interromper o selo da maré", "ritual", "Use Misticismo para seguir o traçado do selo e Religião para cortar sua ligação com o Centro."],
        ["Tomar a plataforma da comporta", "combate", "Criaturas defendem a roda da comporta. Afaste-as para interromper o fluxo que protege o guardião."]
      ]
    },
    {
      direction: "SL", name: "Poço dos contrapesos",
      defaultGuardianBuff: "hp",
      tasks: [
        ["Baixar o contrapeso", "exploração", "Use Atletismo para segurar a corrente e Ofício para descer o contrapeso sem quebrar a trava."],
        ["Desligar o foco de pressão", "ritual", "Use Misticismo para encontrar o foco sob a água e Religião para desfazer o vínculo com o guardião."],
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
