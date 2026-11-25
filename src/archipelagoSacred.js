import { islandGuardianBuffs } from "./archipelagoGuardianBuffs.js";

export const sacredExploration = {
  pilot: "sacred-sectors",
  combatChallenge: 7,
  guardianBuffs: islandGuardianBuffs,
  terrain: {
    name: "Ilha dividida",
    effect: "A oeste, pilares antigos e bosques que os espíritos guardam. A leste, muralhas de madeira e estandartes da Supremacia Purista. Uma trilha de pedras brancas separa as duas metades.",
    features: [{ name: "Chão consagrado", effect: "Terreno difícil onde indicado no mapa." }]
  },
  sectors: [
    {
      direction: "NO", name: "Bosque dos tabus",
      tasks: [
        ["Cumprir o tabu do bosque", "ritual", "Obtenha 3 sucessos antes de 2 falhas. Descubra com Religião qual oferenda o bosque aceita, atravesse sem quebrar galho vivo com Sobrevivência e peça passagem com Diplomacia diante do pilar dos espíritos. Cada etapa exige um sucesso. Na segunda falha, o bosque se fecha e os espíritos não falam mais com o grupo."],
        ["Passar pela prova do guardião", "combate", "Um espírito do bosque exige que o grupo prove que não veio profanar. Vença o combate sem atacar o pilar dos espíritos. Registre sucesso se o grupo vencer e nenhuma personagem tiver causado dano ao pilar.", "spirit"],
        ["Defender o unicórnio ferido", "combate", "Um clã caçador da Supremacia encurralou um unicórnio ferido entre as árvores. Vença o combate. Se um adversário terminar o turno adjacente ao unicórnio, ele o abate. Registre sucesso se o grupo vencer com o unicórnio vivo.", "humanoid"]
      ]
    },
    {
      direction: "NL", name: "Muralha da Pureza",
      tasks: [
        ["Passar pela muralha", "infiltração", "Obtenha 3 sucessos antes de 2 falhas. Ache com Percepção o portão menos vigiado, convença a sentinela com Enganação de que o grupo veio servir à cruzada e atravesse o pátio com Furtividade. Cada etapa exige um sucesso. Na segunda falha, o sino da muralha toca e a cruzada fecha os portões."],
        ["Derrubar o estandarte da pureza", "combate", "O estandarte de Valkaria com as armas de Arsenal anima os soldados da muralha. Vença o combate. Até o fim da quarta rodada, uma personagem adjacente ao mastro gasta uma ação padrão em duas rodadas diferentes para derrubá-lo. Registre sucesso se o grupo vencer e derrubar o estandarte.", "humanoid"],
        ["Abrir as gaiolas dos espíritos", "combate", "Os puristas prenderam espíritos da ilha em gaiolas de ferro frio, e os que já escaparam atacam qualquer um, de tão feridos e furiosos. Vença o combate. Até o fim da quarta rodada, uma personagem adjacente à gaiola grande gasta uma ação padrão em duas rodadas diferentes para abri-la. Registre sucesso se o grupo vencer e abrir a gaiola.", "spirit"]
      ]
    },
    {
      direction: "O", name: "Fonte das aves",
      tasks: [
        ["Ouvir a ninfa da fonte", "exploração", "Obtenha 3 sucessos antes de 2 falhas. Ganhe a atenção da ninfa com Diplomacia, perceba com Intuição o que ela não diz sobre os puristas e responda à pergunta dela com Conhecimento. Cada etapa exige um sucesso. Na segunda falha, a ninfa some na água e a fonte fica em silêncio."],
        ["Lavar a fonte profanada", "combate", "Os puristas jogaram sal e cinzas na fonte, e os espíritos dela atacam qualquer um que chegue perto. Vença o combate. Até o fim da quarta rodada, uma personagem adjacente à fonte gasta uma ação padrão em duas rodadas diferentes para lavar a pedra. Registre sucesso se o grupo vencer e lavar a fonte.", "spirit"],
        ["Devolver o ovo ao ninho", "combate", "Um ovo sagrado foi roubado pelos puristas e largado no caminho. As aves da fonte atacam quem estiver perto dele. Escolha uma personagem para carregar o ovo. Ela gasta uma ação padrão adjacente ao ninho para devolvê-lo. Registre sucesso se o ovo voltar ao ninho até o fim da quarta rodada.", "monster"]
      ]
    },
    {
      direction: "L", name: "Acampamento da cruzada",
      tasks: [
        ["Sabotar as correntes de prata", "engenho", "Obtenha 2 sucessos antes de 2 falhas. Ache com Investigação o baú das correntes de prata que prendem os espíritos e enfraqueça os elos com Ofício (ferreiro) ou Ladinagem. Na segunda falha, um guarda vê o baú aberto e as correntes são trocadas."],
        ["Interromper a missa de guerra", "combate", "Um capelão reza a missa de guerra no meio do acampamento. Escolha a criatura de maior ND para ser o capelão. Ele gasta uma ação padrão em três rodadas diferentes junto ao altar de campanha para terminar a missa. Registre sucesso se o grupo vencer antes de ele terminar.", "humanoid"],
        ["Libertar os prisioneiros não humanos", "combate", "A cruzada acorrentou prisioneiros não humanos para a purificação do amanhecer. Vença o combate. Até o fim da quarta rodada, uma personagem adjacente ao tronco dos prisioneiros gasta uma ação padrão em duas rodadas diferentes para soltar as correntes. Registre sucesso se o grupo vencer e soltar os prisioneiros.", "humanoid"]
      ]
    },
    {
      direction: "SO", name: "Escadaria das penas",
      defaultGuardianBuff: "defense",
      tasks: [
        ["Subir sem pisar nas penas", "travessia", "Obtenha 3 sucessos antes de 2 falhas. Leia com Religião o desenho das penas nos degraus, suba pelos espaços certos com Acrobacia e aguente o vento do alto com Atletismo. Cada etapa exige um sucesso. Na segunda falha, alguém pisa numa pena e a escadaria toda se cobre de névoa."],
        ["Vencer a prova do protetor", "combate", "O protetor da escadaria desafia o grupo no patamar. No centro há um círculo de penas que ninguém pode pisar. Vença o combate. Registre sucesso se o grupo vencer sem que nenhuma personagem entre no círculo.", "spirit"],
        ["Espantar os grifos da escadaria", "combate", "Grifos fazem ninho no alto da escadaria e atacam quem sobe. Vença o combate. Até o fim da quarta rodada, uma personagem adjacente ao braseiro de penas gasta uma ação padrão em duas rodadas diferentes para acendê-lo. A fumaça acalma as aves. Registre sucesso se o grupo vencer e acender o braseiro.", "monster"]
      ]
    },
    {
      direction: "SL", name: "Altar dividido",
      defaultGuardianBuff: "hp",
      tasks: [
        ["Reconsagrar o altar", "ritual", "Obtenha 3 sucessos antes de 2 falhas. Raspe com Ofício (pedreiro) os símbolos puristas gravados por cima dos antigos, reconheça com Misticismo os traços originais e reconsagre a pedra com Religião. Cada etapa exige um sucesso. Na segunda falha, o altar racha e os dois lados da ilha sentem."],
        ["Impedir a profanação do altar", "combate", "Soldados da cruzada vêm quebrar o altar antigo com marretas. Vença o combate. Se um adversário terminar o turno adjacente ao altar, ele dá um golpe. No terceiro golpe, o altar se parte. Registre sucesso se o grupo vencer antes do terceiro golpe.", "humanoid"],
        ["Romper o selo do espírito do altar", "combate", "Um selo purista prende o espírito do altar e o deixa louco de dor. Vença o combate. Até o fim da quarta rodada, uma personagem adjacente ao selo gasta uma ação padrão em duas rodadas diferentes para rompê-lo. Registre sucesso se o grupo vencer e romper o selo.", "spirit"]
      ]
    }
  ],
  guardians: [
    { id: "protetor-da-ilha", name: "O Protetor da Ilha", briefing: "No centro da ilha, onde as duas metades se encontram, o protetor desce das nuvens com as asas abertas. O guardião eiradaan sai de trás do pilar maior. Para os dois, o grupo é só mais um bando de invasores.", creatures: [{ id: "protetor", quantity: 1 }, { id: "eiradaan-guardiao", quantity: 1 }] },
    { id: "companhia-blindada", name: "A Companhia Blindada", briefing: "A tropa de elite da cruzada fecha a trilha branca em formação, com os escudos colados e as lanças abaixadas. Ninguém fala. Eles avançam passo a passo na direção do grupo.", creatures: [{ id: "companhia-blindada-de-elite", quantity: 1 }] },
    { id: "forjador-liturgico", name: "O Forjador Litúrgico", briefing: "Junto à pedra do meio, um devoto de Arsenal de elmo fechado espera ao lado de uma bigorna. Foi ele quem forjou as armas da estátua de Valkaria da cruzada. Ele ergue uma arma recém-forjada e a oferece a quem conseguir tomá-la dele.", creatures: [{ id: "forjador-liturgico", quantity: 1 }] }
  ]
};
