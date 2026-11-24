export const shipwreckedExploration = {
  pilot: "shipwrecked-sectors",
  terrain: {
    name: "Costa de destroços",
    effect: "Cascos partidos e cordame cobrem a areia entre as barracas do acampamento.",
    features: [{ name: "Destroços espalhados", effect: "Terreno difícil onde indicado no mapa." }]
  },
  sharedTasks: true,
  sectors: [
    {
      direction: "N", name: "Praia dos destroços",
      tasks: [
        ["Vasculhar a linha da maré", "recuperação", "Obtenha 2 sucessos antes de 2 falhas. Use Percepção para achar o baú de cartas entre os destroços e Atletismo ou Ladinagem para soltá-lo das ferragens antes que a maré suba. Na segunda falha, a onda arrasta o baú para o recife."],
        ["Afastar os carniceiros da praia", "combate", "Caranguejos e predadores disputam os destroços. Vença o combate e, até o fim da quarta rodada, uma personagem deve gastar uma ação padrão em duas rodadas diferentes para puxar o bote de resgate acima da linha d'água.", "animal"],
        ["Conter os afogados da arrebentação", "combate", "Os mortos do último naufrágio saem da água na direção do casco virado onde os sobreviventes se abrigam. Registre sucesso se o grupo vencer sem que nenhuma criatura alcance o casco.", "undead"]
      ]
    },
    {
      direction: "S", name: "Acampamento dos Remendados",
      tasks: [
        ["Ganhar a confiança dos sobreviventes", "exploração", "Obtenha 3 sucessos antes de 2 falhas. Ouça o porta-voz com Diplomacia, perceba quem mente sobre os Acendedores com Intuição e trate os feridos com Cura. Cada etapa exige um sucesso. Na segunda falha, os sobreviventes se fecham e escondem o que sabem."],
        ["Romper o cerco às barracas", "combate", "Os Acendedores cercam o acampamento para levar os sobreviventes. Vença o combate. Se ao fim da terceira rodada houver um adversário adjacente à barraca dos feridos, ele leva um sobrevivente. Registre sucesso apenas se ninguém for levado.", "humanoid"],
        ["Libertar os cativos da paliçada", "combate", "Os vigias da paliçada guardam os cativos acorrentados. Vença o combate e, até o fim da quarta rodada, uma personagem adjacente ao portão gasta uma ação padrão em duas rodadas diferentes para soltar as correntes. Registre sucesso se o grupo vencer e soltar os cativos.", "humanoid"]
      ]
    },
    {
      direction: "L", name: "Nascente da encosta",
      tasks: [
        ["Limpar a nascente", "engenho", "Obtenha 2 sucessos antes de 2 falhas. Ache com Sobrevivência as carcaças que os Acendedores jogaram na bacia e filtre a água com Cura ou Ofício (alquimista). Na segunda falha, a contaminação se espalha pela bacia."],
        ["Disputar a bacia", "combate", "Feras sedentas tomaram a nascente. Vença o combate e, até o fim da quarta rodada, uma personagem adjacente à bacia gasta uma ação padrão em duas rodadas diferentes para encher os odres do acampamento.", "animal"],
        ["Desviar o cano do farol", "exploração", "Os Acendedores canalizam a nascente até o farol por canos de bambu. Obtenha 3 sucessos antes de 2 falhas. Siga o cano com Percepção, alcance a junta na encosta com Atletismo e desvie o fluxo com Ofício (carpinteiro). Cada etapa exige um sucesso. Na segunda falha, a junta desaba e o cano se perde no mato."]
      ]
    },
    {
      direction: "O", name: "Gruta dos mapas",
      tasks: [
        ["Copiar as rotas da parede", "exploração", "Obtenha 3 sucessos antes de 2 falhas. Separe com Investigação as rotas verdadeiras das falsas, interprete as correntes com Conhecimento ou Sobrevivência e passe tudo a limpo com Ofício (escriba). Cada etapa exige um sucesso. Na segunda falha, a umidade apaga o trecho que faltava."],
        ["Proteger o cartógrafo", "combate", "O velho cartógrafo termina o último mapa enquanto as criaturas invadem a gruta. Ele gasta uma ação padrão em três rodadas. Se sofrer dano numa rodada, perde o progresso dela. Registre sucesso quando ele terminar e o grupo vencer.", "undead"],
        ["Selar a boca da gruta", "engenho", "Obtenha 2 sucessos antes de 2 falhas. Ache com Investigação a pedra que segura o desmoronamento antigo e escore a entrada com Atletismo ou Ofício (carpinteiro) antes da maré alta. Na segunda falha, a água invade e cobre as paredes riscadas."]
      ]
    }
  ],
  guardians: [
    { id: "ultimo-legionario", name: "O Último Legionário", briefing: "No alto do farol de destroços, um legionário de armadura enferrujada ainda monta guarda para uma legião que afundou há anos. Ele ergue o escudo e grita uma ordem que ninguém mais vai cumprir.", creatures: [{ id: "legionario-insano", quantity: 1 }] },
    { id: "senhor-dos-acendedores", name: "O Senhor dos Acendedores", briefing: "O homem que acende o farol desce pela escada de cordas com o brasão raspado do peito. Atrás dele, o bando dos Acendedores fecha o caminho de volta para a praia.", creatures: [{ id: "cavaleiro-desonrado", quantity: 1 }, { id: "bando-pirata", quantity: 1 }] },
    { id: "primeiro-naufrago", name: "O Primeiro Náufrago", briefing: "A fogueira do farol se apaga num sopro frio. O primeiro náufrago da ilha sobe pela rocha molhada, e uma aparição pálida se ergue das cinzas ao lado dele.", creatures: [{ id: "afogado", quantity: 1 }, { id: "aparicao", quantity: 1 }] }
  ]
};
