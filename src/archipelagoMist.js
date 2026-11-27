export const mistExploration = {
  pilot: "mist-sectors",
  terrain: {
    name: "Bruma fria",
    effect: "Uma névoa espessa e fria cobre a ilha. Os sons chegam de direções erradas, e as vozes se repetem um instante depois.",
    features: [{ name: "Bancos de bruma", effect: "Camuflagem leve para quem está dentro, onde indicado no mapa." }]
  },
  sharedTasks: true,
  sectors: [
    {
      direction: "N", name: "Cais das vozes",
      tasks: [
        ["Seguir a voz verdadeira", "exploração", "Obtenha 3 sucessos antes de 2 falhas. Separe com Percepção o pedido de socorro dos ecos que o repetem, perceba com Intuição qual das vozes mente e conduza o bote entre os pilares do cais com Pilotagem. Cada etapa exige um sucesso. Na segunda falha, o bote encalha num pilar e a voz se cala."],
        ["Manter o sino do cais tocando", "combate", "O sino do cais guia os barcos perdidos na bruma, e os mortos sobem pelas escadas para calá-lo. Vença o combate. Se ao fim de uma rodada houver um adversário adjacente ao sino e nenhuma personagem adjacente a ele, a corda é cortada. Registre sucesso se o grupo vencer com a corda inteira.", "undead"],
        ["Desmascarar os falsos náufragos", "combate", "Os náufragos que pedem ajuda no cais são impostores que imitam vozes conhecidas. O náufrago verdadeiro está amarrado sob as tábuas. Vença o combate. Uma personagem adjacente a ele gasta uma ação padrão para soltá-lo. Registre sucesso se ele for solto até o fim da terceira rodada.", "humanoid"]
      ]
    },
    {
      direction: "S", name: "Aldeia dos Ouvintes",
      tasks: [
        ["Ouvir os Ouvintes da Bruma", "exploração", "Obtenha 3 sucessos antes de 2 falhas. Ganhe a confiança da anciã com Diplomacia, perceba com Intuição o que os Ouvintes repetem sem entender e compare as profecias com Investigação. Cada etapa exige um sucesso. Na segunda falha, a aldeia bate o gongo e fecha as portas."],
        ["Guardar a lanterna da vigília", "combate", "Quando a bruma desce, criaturas pequenas e vultos rondam a aldeia para apagar a lanterna da vigília. Vença o combate. Se um adversário terminar o turno adjacente à lanterna, ela se apaga e a bruma engole a praça. Registre sucesso se o grupo vencer com a lanterna acesa.", "spirit"],
        ["Apagar o braseiro da escuta", "combate", "O vidente reúne os Ouvintes em volta do braseiro para ouvir a bruma. Vença o combate. Uma personagem adjacente ao braseiro gasta uma ação padrão para apagá-lo. Registre sucesso se o braseiro for apagado até o fim da quarta rodada e o grupo vencer.", "humanoid"]
      ]
    },
    {
      direction: "L", name: "Charco das luzes",
      tasks: [
        ["Atravessar sem seguir as luzes", "travessia", "Obtenha 2 sucessos antes de 2 falhas. Reconheça com Misticismo as luzes que enganam e ache o caminho firme com Sobrevivência. Na segunda falha, o grupo segue uma luz falsa e afunda no lodo."],
        ["Recuperar a bússola do capitão", "recuperação", "Obtenha 2 sucessos antes de 2 falhas. Ache com Percepção o brilho da bússola no lodo e puxe-a com Atletismo sem afundar. Na segunda falha, o lodo engole a bússola."],
        ["Calar as harpias do charco", "combate", "As harpias imitam vozes conhecidas para atrair o grupo ao lodo fundo. Vença o combate. Até o fim da quarta rodada, uma personagem adjacente ao ninho gasta uma ação padrão em duas rodadas diferentes para derrubá-lo. Registre sucesso se o grupo vencer e derrubar o ninho.", "monster"]
      ]
    },
    {
      direction: "O", name: "Cemitério dos que esperam",
      tasks: [
        ["Acalmar os que esperam", "ritual", "Obtenha 3 sucessos antes de 2 falhas. Leia com Investigação os nomes gastos nas lápides, reze pelos mortos com Religião e feche o círculo de sal com Misticismo. Cada etapa exige um sucesso. Na segunda falha, os mortos se agitam e o grupo foge do cemitério."],
        ["Achar a lápide trocada", "engenho", "Obtenha 2 sucessos antes de 2 falhas. Compare com Investigação as datas até achar a lápide que alguém trocou e abra o jazigo com Ladinagem sem quebrar o selo. Na segunda falha, o selo quebra e o que estava escrito vira pó."],
        ["Fechar a cripta aberta", "combate", "Os mortos saem por uma cripta aberta no meio do cemitério. Vença o combate. Até o fim da quarta rodada, uma personagem adjacente à porta da cripta gasta uma ação padrão em duas rodadas diferentes para fechá-la. Registre sucesso se o grupo vencer e fechar a cripta.", "undead"]
      ]
    }
  ],
  guardians: [
    { id: "sineiro", name: "O Sineiro", briefing: "O sino rachado bate sozinho. O sineiro que se afogou tentando guiar o último barco desce pela corda e para entre o grupo e o sino.", rule: "Memento do sineiro: o sino rachado é o que prende o fantasma a este mundo. Uma personagem adjacente ao sino gasta uma ação padrão em duas rodadas diferentes para tocá-lo. Depois da segunda badalada, o fantasma pode ser destruído normalmente. Se ele chegar a 0 PV antes disso, some e volta no início da rodada seguinte, adjacente ao sino, com todos os PV.", creatures: [{ id: "o-sineiro", quantity: 1 }] },
    { id: "rostos-emprestados", name: "Os Rostos Emprestados", briefing: "Quatro vultos saem da bruma com os rostos do grupo. Falam com as vozes de vocês e chamam cada um pelo nome.", creatures: [{ id: "duplo", quantity: 4 }] },
    { id: "mestre-dos-ouvintes", name: "O Mestre dos Ouvintes", briefing: "O homem que fala pela bruma espera no alto da torre. Os três videntes da aldeia fecham o círculo. Dois mortos que ele ergueu sobem a escada atrás do grupo.", creatures: [{ id: "necromante", quantity: 1 }, { id: "falso-vidente", quantity: 3 }, { id: "zumbi-fantasmagorico", quantity: 2 }] }
  ]
};
