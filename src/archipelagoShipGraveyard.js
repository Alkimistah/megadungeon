export const shipGraveyardExploration = {
  pilot: "ship-graveyard-sectors",
  terrain: {
    name: "Cascos encalhados",
    effect: "Cascos podres se apoiam uns nos outros acima da água. Pranchas e cordas ligam um convés ao outro.",
    features: [{ name: "Tábuas podres", effect: "Terreno difícil onde indicado no mapa." }]
  },
  sharedTasks: true,
  sectors: [
    {
      direction: "N", name: "Proas encalhadas",
      tasks: [
        ["Achar a entrada pelos cascos", "exploração", "Obtenha 3 sucessos antes de 2 falhas. Ache com Percepção o casco que ainda aguenta peso, suba pelo costado com Atletismo e teste as tábuas com Ofício (carpinteiro) antes de pisar. Cada etapa exige um sucesso. Na segunda falha, o costado cede e o grupo volta ao bote."],
        ["Segurar a prancha entre os cascos", "combate", "Os Desmanchadores querem derrubar a prancha que liga dois cascos para isolar o grupo. Vença o combate. Se ao fim de uma rodada houver um adversário adjacente à ponta da prancha e nenhuma personagem adjacente a ela, a prancha cai no mar. Registre sucesso se o grupo vencer com a prancha no lugar.", "humanoid"],
        ["Limpar o ninho do cordame", "combate", "Aranhas juntaram o cordame de dois mastros caídos numa teia só. Um marinheiro dos Desmanchadores pende num casulo. Vença o combate. Até o fim da quarta rodada, uma personagem adjacente ao casulo gasta uma ação padrão em duas rodadas diferentes para cortá-lo. Registre sucesso se o grupo vencer e soltar o marinheiro.", "monster"]
      ]
    },
    {
      direction: "S", name: "Porões alagados",
      tasks: [
        ["Resgatar a carga do porão", "recuperação", "Obtenha 2 sucessos antes de 2 falhas. Ache com Percepção a caixa lacrada entre os destroços e puxe-a pela escotilha com Atletismo antes que a maré encha o porão. Na segunda falha, a água cobre a caixa."],
        ["Fechar o rombo do casco", "combate", "A maré entra por um rombo no porão, e os predadores entram com ela. Vença o combate. Até o fim da quarta rodada, uma personagem adjacente ao rombo gasta uma ação padrão em duas rodadas diferentes para pregar as tábuas. Registre sucesso se o grupo vencer e fechar o rombo.", "animal"],
        ["Tirar o grumete da sentina", "combate", "Um grumete dos Desmanchadores caiu na sentina, onde algo vive no lixo do fundo. Ele está preso sob uma viga. Vença o combate. Uma personagem adjacente ao grumete gasta uma ação padrão para erguer a viga. Registre sucesso se ele for solto até o fim da terceira rodada e o grupo vencer.", "monster"]
      ]
    },
    {
      direction: "L", name: "Convés dos Desmanchadores",
      tasks: [
        ["Negociar com os Desmanchadores", "exploração", "Obtenha 3 sucessos antes de 2 falhas. Fale com a contramestra dos gnolls com Diplomacia, perceba com Intuição o que eles escondem sobre a nau capitânia e ofereça uma troca justa com Ofício ou Nobreza. Cada etapa exige um sucesso. Na segunda falha, os Desmanchadores expulsam o grupo do convés."],
        ["Soltar a âncora presa", "engenho", "Obtenha 2 sucessos antes de 2 falhas. Ache com Investigação onde a corrente da âncora prendeu entre os cascos e solte o elo com Ofício (ferreiro) ou Atletismo. Na segunda falha, a corrente se parte e o casco escorrega para o fundo."],
        ["Travar o guindaste dos Desmanchadores", "combate", "Os Desmanchadores içam um casco inteiro para desmontá-lo, e com ele vai o caminho até o centro. Vença o combate. Até o fim da quarta rodada, uma personagem adjacente à manivela do guindaste gasta uma ação padrão em duas rodadas diferentes para travar o freio. Registre sucesso se o grupo vencer e travar o freio.", "humanoid"]
      ]
    },
    {
      direction: "O", name: "Casco da carranca",
      tasks: [
        ["Abrir o cofre do almirante", "engenho", "Obtenha 2 sucessos antes de 2 falhas. Ache com Investigação a fechadura falsa e abra a verdadeira com Ladinagem. Na segunda falha, o cofre trava de vez."],
        ["Apaziguar a carranca", "ritual", "Obtenha 3 sucessos antes de 2 falhas. Reconheça com Conhecimento a deusa entalhada na proa, ofereça o sal do mar com Religião e apague as runas da maldição com Misticismo. Cada etapa exige um sucesso. Na segunda falha, a carranca range e os cascos tremem até o centro."],
        ["Fechar a escotilha da tripulação", "combate", "Os mortos da tripulação sobem do porão pela escotilha. Vença o combate. Uma personagem adjacente à escotilha gasta uma ação padrão para fechá-la. Registre sucesso se a escotilha for fechada até o fim da terceira rodada e o grupo vencer.", "undead"]
      ]
    }
  ],
  guardians: [
    { id: "capitao-dos-ossos", name: "O Capitão dos Ossos", briefing: "O capitão e a tripulação se fundiram num só monte de ossos. A voz dele ainda grita ordens de dentro da massa, e o monte avança pelo convés.", creatures: [{ id: "capitao-dos-ossos", quantity: 1 }] },
    { id: "tesouro-que-morde", name: "O Tesouro que Morde", briefing: "A cabine do almirante está cheia de ouro velho e de dois baús ainda trancados. Quando o grupo se aproxima, as tampas se abrem sozinhas e mostram dentes.", creatures: [{ id: "mimico", quantity: 2 }] },
    { id: "cacador-de-cabecas", name: "O Caçador de Cabeças", briefing: "O chefe dos Desmanchadores espera sozinho no convés mais alto. Os troféus pendurados no mastro batem ao vento.", creatures: [{ id: "gnoll-cacador-de-cabecas", quantity: 1 }] }
  ]
};
