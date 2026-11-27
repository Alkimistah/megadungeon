import { islandGuardianBuffs } from "./archipelagoGuardianBuffs.js";

const eternalNight = "A noite eterna impede a entrada de luz solar durante o combate, mesmo com a portinhola aberta.";
const cabinRule = `${eternalNight} Para a missão A Última Entrada, uma personagem adjacente à mesa pode gastar uma ação padrão para recolher o diário.`;

export const abandonedShipExploration = {
  pilot: "abandoned-ship-sectors",
  combatChallenge: 7,
  guardianBuffs: islandGuardianBuffs,
  terrain: {
    name: "Navio sob noite eterna",
    effect: "O navio avança contra o vento. Um caixão cheio de terra viajava no porão como carga comum. Quando os marinheiros começaram a desaparecer, os sobreviventes levaram o caixão à cabine. A última ordem do capitão foi fechar as escotilhas e manter o rumo. Durante os testes e as cenas sem combate, os reflexos da tripulação no bronze, na água e no vidro podem indicar o caminho.",
    features: [
      { name: "Noite eterna", effect: eternalNight },
      { name: "Sino e escotilhas", effect: "Quando a tarefa indicar uma escotilha que fecha ao toque do sino, use a passagem alternativa marcada no mapa." },
      { name: "Água e cordame", effect: "A água do porão é terreno difícil. As cordas ligam os patamares e podem ser baixadas nas tarefas que oferecem essa opção." }
    ]
  },
  sectors: [
    {
      direction: "NO", name: "Proa e sino",
      tasks: [
        ["Ouvir o vigia", "exploração", "Obtenha 3 sucessos antes de 2 falhas. Encontre o reflexo no bronze com Percepção, separe a lembrança do presente com Intuição e descubra com Investigação a direção que o vigia aponta. Cada etapa exige um sucesso. Na segunda falha, o sino toca e o reflexo se apaga."],
        ["Travar o badalo", "combate", "Gaste uma ação padrão junto ao sino até o fim da terceira rodada e vença o combate. No início da segunda rodada, uma badalada fecha a escotilha marcada se o badalo ainda estiver livre. A passagem alternativa permanece aberta."],
        ["Manter a passagem da proa", "combate", "Vença antes que os adversários terminem três turnos, somados, adjacentes à escotilha da proa."]
      ]
    },
    {
      direction: "NL", name: "Mastros e cordame",
      tasks: [
        ["Seguir a corda cortada", "exploração", "Obtenha 3 sucessos antes de 2 falhas. Ache o corte com Percepção, suba ao patamar com Atletismo e atravesse com Acrobacia pelo cabo firme indicado pelo reflexo. Cada etapa exige um sucesso. Na segunda falha, o cabo se solta e o grupo recua."],
        ["Baixar a corda", "combate", "Gaste duas ações padrão junto à amarra até o fim da quarta rodada e vença o combate. A corda baixada liga os dois patamares."],
        ["Sustentar a ponte de cabos", "combate", "Vença o combate com pelo menos uma personagem junto à amarra ao fim da quarta rodada."]
      ]
    },
    {
      direction: "O", name: "Alojamento da tripulação",
      tasks: [
        ["Encontrar a chave das redes", "exploração", "Obtenha 3 sucessos antes de 2 falhas. Identifique a rede do marinheiro com Investigação, entenda o gesto da alma com Intuição e solte a chave presa ao nó com Ladinagem. Cada etapa exige um sucesso. Na segunda falha, a rede despenca e a chave some entre as tábuas."],
        ["Retirar a chave", "combate", "Gaste uma ação padrão junto à rede marcada até o fim da quarta rodada para retirar a chave e vença o combate."],
        ["Abrir a porta de serviço", "combate", "Gaste duas ações padrão junto à porta até o fim da quarta rodada para abri-la e vença o combate."]
      ]
    },
    {
      direction: "L", name: "Enfermaria",
      tasks: [
        ["Ler o reflexo na bacia", "exploração", "Obtenha 3 sucessos antes de 2 falhas. Interprete os ferimentos com Cura, acompanhe o reflexo com Percepção e localize com Investigação o registro que o cirurgião escondeu. Cada etapa exige um sucesso. Na segunda falha, a bacia tomba e o reflexo desaparece."],
        ["Salvar o registro", "combate", "Recolha o registro com uma ação padrão junto à mesa até o fim da terceira rodada e vença o combate."],
        ["Isolar a enfermaria", "combate", "Feche a porta interna com uma ação padrão junto ao marco até o fim da quarta rodada e vença o combate."]
      ]
    },
    {
      direction: "SO", name: "Porão da carga", defaultGuardianBuff: "defense",
      tasks: [
        ["Reconstituir o embarque", "exploração", "Obtenha 3 sucessos antes de 2 falhas. Leia o manifesto com Investigação, identifique o caixão no reflexo da água com Percepção e siga as marcas de corda com Ofício (marinheiro). Cada etapa exige um sucesso. Na segunda falha, a água sobe e leva as páginas soltas do manifesto."],
        ["Baixar a carga suspensa", "combate", "Gaste duas ações padrão junto ao cabrestante até o fim da quarta rodada para abrir a rota e vença o combate."],
        ["Salvar o manifesto", "combate", "Recolha o manifesto do estrado com uma ação padrão junto ao marco até o fim da terceira rodada e vença o combate."]
      ]
    },
    {
      direction: "SL", name: "Popa e leme", defaultGuardianBuff: "hp",
      tasks: [
        ["Escutar a última ordem", "exploração", "Obtenha 3 sucessos antes de 2 falhas. Siga a voz pelo tubo com Percepção, separe a ordem do eco com Intuição e reconheça o sinal de chegada com Ofício (marinheiro). Cada etapa exige um sucesso. Na segunda falha, a ordem se desfaz entre os ruídos do leme."],
        ["Liberar o leme", "combate", "Gaste duas ações padrão junto ao mecanismo até o fim da quarta rodada para liberar o leme e vença o combate."],
        ["Recuperar a carta de navegação", "combate", "Recolha a carta junto à amurada com uma ação padrão até o fim da terceira rodada e vença o combate."]
      ]
    }
  ],
  guardians: [
    {
      id: "passageiro-da-ultima-viagem",
      name: "O Passageiro da Última Viagem",
      briefing: "O passageiro espera junto ao caixão carregado de terra. Ele desembainha a espada e acompanha os movimentos do grupo pelo outro lado da mesa de cartas.",
      rule: cabinRule,
      creatures: [{ id: "vampiro-passageiro-da-ultima-viagem", quantity: 1 }]
    },
    {
      id: "capitao-e-vigia",
      name: "O Capitão e o Vigia",
      briefing: "O Capitão surge por trás da mesa de cartas, onde a última ordem ainda traz a assinatura dele. O Vigia sai do vidro escuro da portinhola, arrastando correntes.",
      rule: `${cabinRule} Memento do Fantasma. A ordem assinada sobre a mesa é o que o prende ao navio. Uma personagem adjacente à mesa pode gastar uma ação padrão para rasgá-la. Se for reduzido a 0 PV antes disso, ele desaparece e retorna conforme o Memento da ficha.`,
      creatures: [{ id: "fantasma", quantity: 1 }, { id: "alma-acorrentada", quantity: 1 }]
    },
    {
      id: "sombra-do-caixao",
      name: "A Sombra do Caixão",
      briefing: "A sombra do caixão sobe pelas vigas e toma a forma de um Entessombra Broto. A cada passo dele, mãos da tripulação ameaçam brotar do assoalho.",
      rule: cabinRule,
      creatures: [{ id: "entessombra-broto", quantity: 1 }]
    }
  ]
};
