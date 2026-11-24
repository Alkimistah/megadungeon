export const giantKelpExploration = {
  pilot: "giant-kelp-sectors",
  terrain: {
    name: "Floresta de algas",
    effect: "As frondes gigantes sobem do fundo e cobrem a água rasa. Os canais abertos são estreitos.",
    features: [{ name: "Frondes densas", effect: "Terreno difícil e camuflagem leve onde indicado no mapa." }]
  },
  sharedTasks: true,
  sectors: [
    {
      direction: "N", name: "Muralha das frondes",
      tasks: [
        ["Abrir o canal entre as frondes", "exploração", "Obtenha 3 sucessos antes de 2 falhas. Ache com Sobrevivência o trecho de frondes mais fino, corte-o com Atletismo e conduza o bote pelo canal com Pilotagem. Cada etapa exige um sucesso. Na segunda falha, as algas fecham o canal atrás do grupo."],
        ["Romper a emboscada nas frondes", "combate", "Algo escondido nas frondes arrasta quem passa pelo canal. Vença o combate. Até o fim da quarta rodada, uma personagem adjacente à proa do bote gasta uma ação padrão em duas rodadas diferentes para cortar as gavinhas presas ao casco.", "monster"],
        ["Cortar as redes dos sahuagin", "combate", "Os saqueadores estenderam uma rede entre duas estacas para prender barcos no canal. Vença o combate. Uma personagem adjacente à rede gasta uma ação padrão para cortá-la. Registre sucesso se a rede for cortada até o fim da quarta rodada.", "humanoid"]
      ]
    },
    {
      direction: "S", name: "Viveiro dos pastores",
      tasks: [
        ["Negociar com os pastores de algas", "exploração", "Obtenha 3 sucessos antes de 2 falhas. Fale com o guardião do viveiro com Diplomacia, acalme os selakos de guarda com Adestramento e mostre respeito aos costumes do mar com Conhecimento. Cada etapa exige um sucesso. Na segunda falha, os pastores expulsam o grupo do viveiro."],
        ["Romper a guarda do viveiro", "combate", "Os defensores do viveiro não deixam estranhos passar. Vença o combate. Se algum adversário terminar o turno adjacente à concha de alarme, o viveiro inteiro desperta. Registre sucesso se nenhum adversário alcançar a concha.", "humanoid"],
        ["Impedir o roubo dos ovos", "combate", "Saqueadores tentam levar os ovos de selako do ninhal. Escolha uma criatura que carrega os ovos. Se ela ainda puder escapar ao fim da terceira rodada, foge com eles. Registre sucesso se o grupo impedir a fuga e vencer.", "humanoid"]
      ]
    },
    {
      direction: "L", name: "Banco das gavinhas",
      tasks: [
        ["Recolher a seiva das frondes", "recuperação", "Obtenha 2 sucessos antes de 2 falhas. Ache com Sobrevivência a fronde madura e recolha a seiva com Ofício (alquimista) sem rasgar a casca. Na segunda falha, a seiva coagula e perde o efeito."],
        ["Amarrar o bote no banco", "travessia", "Obtenha 2 sucessos antes de 2 falhas. Leve o cabo até a rocha do banco com Atletismo e firme a amarra com Ofício (carpinteiro) antes que a maré vire. Na segunda falha, a correnteza arrasta o bote para dentro das algas."],
        ["Soltar o pescador das gavinhas", "combate", "Gavinhas prenderam um pescador elfo na areia do banco. Vença o combate. Até o fim da quarta rodada, uma personagem adjacente ao pescador gasta uma ação padrão em duas rodadas diferentes para soltá-lo.", "monster"]
      ]
    },
    {
      direction: "O", name: "Cascos engolidos",
      tasks: [
        ["Resgatar a carga presa nas frondes", "recuperação", "Obtenha 2 sucessos antes de 2 falhas. Localize a caixa com Percepção e solte-a das frondes com Atletismo. Na segunda falha, a caixa afunda entre as algas."],
        ["Desenroscar o leme do casco", "engenho", "Obtenha 2 sucessos antes de 2 falhas. Ache com Investigação onde a alga travou o leme e solte o eixo com Ofício (carpinteiro). Na segunda falha, o leme se parte."],
        ["Enfrentar os predadores do casco", "combate", "Predadores fizeram ninho num casco engolido. Vença o combate. Até o fim da quarta rodada, uma personagem dentro do casco gasta uma ação padrão em duas rodadas diferentes para abrir a escotilha do porão.", "animal"]
      ]
    }
  ],
  guardians: [
    { id: "isca-do-coracao", name: "A Isca do Coração", briefing: "Uma luz suave pisca entre as frondes, como um náufrago pedindo ajuda. Quando o grupo se aproxima, a água se fecha em volta da pedra do fragmento, e vultos que pareciam algas abrem os olhos.", creatures: [{ id: "alghari", quantity: 2 }, { id: "irukanjin", quantity: 2 }] },
    { id: "mare-urticante", name: "A Maré Urticante", briefing: "A água do centro brilha em azul. Um enxame de águas-vivas sobe das frondes, e um peixe-recife enorme se solta da pedra onde estava preso.", creatures: [{ id: "enxame-de-aguas-vivas", quantity: 1 }, { id: "peixe-recife", quantity: 1 }] },
    { id: "pastor-das-frondes", name: "O Pastor das Frondes", briefing: "O chefe dos pastores de algas espera na pedra do fragmento, com a lança erguida. Atrás dele, a planta que a tribo alimenta há gerações abre a boca entre as frondes.", creatures: [{ id: "elfo-do-mar-chefe", quantity: 1 }, { id: "tendriculo", quantity: 1 }] }
  ]
};
