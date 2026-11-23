export const atollExploration = {
  pilot: "atoll-sectors",
  terrain: {
    name: "Atol",
    effect: "Na vazante, os bancos de areia aparecem entre canais de corrente forte.",
    features: [{ name: "Canal da maré", effect: "Terreno difícil para quem atravessa a vau." }]
  },
  sharedTasks: true,
  sectors: [
    {
      direction: "N", name: "Banco da vazante",
      tasks: [
        ["Balizar o banco móvel", "exploração", "Obtenha 3 sucessos antes de 2 falhas. Use Percepção para identificar a mudança da corrente, Sobrevivência para escolher a rota e Atletismo para fincar a última baliza. Cada etapa exige um sucesso. Na segunda falha, a maré cobre as marcas."],
        ["Proteger a linha de boias", "combate", "Vença o encontro e mantenha a passagem marcada. Uma personagem deve gastar uma ação padrão para prender uma boia em duas rodadas diferentes antes do fim da quarta rodada.", "animal"],
        ["Atrair os predadores ao baixio", "combate", "Os predadores rondam a borda do banco de areia. Registre sucesso se o grupo vencer ou atraí-los para o lado de fora do banco e alcançar a outra margem.", "animal"]
      ]
    },
    {
      direction: "S", name: "Canal da enchente",
      tasks: [
        ["Lançar um cabo entre as margens", "travessia", "Obtenha 2 sucessos antes de 2 falhas. Use Atletismo ou Pilotagem para levar o cabo à outra margem e Ofício (carpinteiro) ou Ladinagem para firmá-lo antes que a corrente aumente. Na segunda falha, o cabo se perde."],
        ["Tomar a passagem estreita", "combate", "A água sobe pelo canal enquanto os adversários disputam a passagem. No início de cada rodada, o mestre indica um trecho de margem tomado pela corrente. Registre sucesso se o grupo controlar a travessia.", "humanoid"],
        ["Ler a virada da corrente", "exploração", "Obtenha 3 sucessos antes de 2 falhas. Compare as linhas de espuma com Percepção, estime a virada com Sobrevivência e conduza a travessia com Pilotagem ou Atletismo. Cada etapa exige um sucesso. Na segunda falha, a corrente arrasta o marcador para fora do canal."]
      ]
    },
    {
      direction: "L", name: "Destroço na areia",
      tasks: [
        ["Recuperar a carta da lagoa", "recuperação", "Obtenha 2 sucessos antes de 2 falhas. Use Investigação para achar o compartimento e Ladinagem ou Atletismo para abri-lo antes que a água chegue. Na segunda falha, a carta se desfaz."],
        ["Disputar o casco encalhado", "combate", "O casco se inclina com a maré. Enquanto o grupo enfrenta os saqueadores, uma personagem adjacente à escotilha deve gastar uma ação padrão para retirar a caixa de cartas até o fim da terceira rodada.", "humanoid"],
        ["Escorar o convés", "engenho", "Obtenha 2 sucessos antes de 2 falhas. Use Investigação para identificar a viga que sustenta o convés e Ofício (carpinteiro) ou Atletismo para escorá-la. Na segunda falha, o convés desaba e cobre o acesso."]
      ]
    },
    {
      direction: "O", name: "Poço da lagoa",
      tasks: [
        ["Alinhar os marcos da lagoa", "ritual", "Obtenha 3 sucessos antes de 2 falhas. Identifique os marcos com Conhecimento ou Misticismo, alcance a pedra submersa com Atletismo e alinhe os sinais com Investigação. Cada etapa exige um sucesso. Na segunda falha, a água turva esconde as marcas."],
        ["Conter o ataque na borda do poço", "combate", "A corda se solta à medida que a água agita o poço. Vença o combate e, até o fim da terceira rodada, gaste uma ação padrão junto à borda para firmar a corda."],
        ["Defender o sino de mergulho", "combate", "Proteja a personagem que opera o sino. Ela deve gastar uma ação padrão em três rodadas para baixar o sino até alinhar a abertura do sino com a passagem para o Centro.", "animal"]
      ]
    }
  ],
  legacyGuardians: { 2: { creatures: [{ id: "armento-de-burafontes", quantity: 1 }] } },
  guardians: [
    { briefing: "A sombra que atravessa a lagoa sobe à superfície. Tentáculos translúcidos se espalham pelo canal entre o banco de areia e o fragmento.", creatures: [{ id: "agua-viva-gigante", quantity: 1 }] },
    { briefing: "O capitão já está na pedra do fragmento. Com o bote amarrado na margem, ele desembainha a arma e toma o caminho estreito pela areia.", creatures: [{ id: "capitao-do-conclave-pirata", quantity: 1 }] },
    { id: "predadores-da-lagoa", briefing: "Uma barbatana corta o canal. Do outro lado, um peixe-recife se desprende da pedra e fecha a passagem.", creatures: [{ id: "selako-tigre", quantity: 1 }, { id: "peixe-recife", quantity: 1 }] }
  ]
};
