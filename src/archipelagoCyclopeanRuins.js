import { islandGuardianBuffs } from "./archipelagoGuardianBuffs.js";

export const cyclopeanRuinsExploration = {
  pilot: "cyclopean-ruins-sectors",
  combatChallenge: 7,
  guardianBuffs: islandGuardianBuffs,
  terrain: {
    name: "Ruínas ciclópicas",
    effect: "Blocos de pedra do tamanho de casas saem da água, cobertos de musgo e sal. Os degraus foram feitos para pés de gigante.",
    features: [{ name: "Blocos tombados", effect: "Terreno difícil onde indicado no mapa." }]
  },
  sectors: [
    {
      direction: "NO", name: "Escadaria afundada",
      tasks: [
        ["Subir os degraus dos gigantes", "travessia", "Obtenha 3 sucessos antes de 2 falhas. Ache com Percepção os blocos que não se movem, escale cada degrau com Atletismo e prenda a linha de segurança com Ofício (carpinteiro). Cada etapa exige um sucesso. Na segunda falha, um degrau desliza e o grupo volta à água."],
        ["Erguer o bote acima da maré", "combate", "A maré cheia sobe pelos degraus e traz predadores com ela. Vença o combate. Até o fim da quarta rodada, uma personagem adjacente ao cabrestante gasta uma ação padrão em duas rodadas diferentes para içar o bote. Registre sucesso se o grupo vencer e içar o bote.", "animal"],
        ["Apagar a runa do patamar", "combate", "Quando alguém pisa no patamar, a runa acende e as sentinelas de pedra despertam. Vença o combate. Uma personagem adjacente à runa gasta uma ação padrão para apagá-la. Registre sucesso se a runa for apagada até o fim da terceira rodada e o grupo vencer.", "construct"]
      ]
    },
    {
      direction: "NL", name: "Jardim das estátuas",
      tasks: [
        ["Ler os rostos de pedra", "exploração", "Obtenha 3 sucessos antes de 2 falhas. Ache com Investigação a estátua mais recente, descubra com Cura se ainda há vida sob a pedra e reconheça com Misticismo o que a petrificou. Cada etapa exige um sucesso. Na segunda falha, o grupo confunde uma estátua viva com pedra comum."],
        ["Virar o espelho de bronze", "combate", "Algo transforma em pedra quem atravessa o jardim. Vença o combate. Até o fim da quarta rodada, uma personagem adjacente ao espelho de bronze gasta uma ação padrão em duas rodadas diferentes para virá-lo para a entrada. Registre sucesso se o grupo vencer e virar o espelho.", "monster"],
        ["Impedir o saque das estátuas", "combate", "Mercenários de Aslothia serram as estátuas para vender as cabeças de pedra. Escolha uma criatura para carregar a cabeça de um explorador petrificado. Se ele ainda puder escapar ao fim da terceira rodada, foge com ela. Registre sucesso se o grupo impedir a fuga e vencer.", "humanoid"]
      ]
    },
    {
      direction: "O", name: "Poço do olho",
      tasks: [
        ["Despertar o olho de pedra", "ritual", "Obtenha 3 sucessos antes de 2 falhas. Reconheça com Conhecimento os símbolos da borda, desenhe com Misticismo o círculo que o olho espera e entoe com Religião a oração dos construtores. Cada etapa exige um sucesso. Na segunda falha, o olho se fecha até a próxima maré."],
        ["Refazer o selo do poço", "combate", "Os ossos de um gigante afogado se erguem no fundo do poço e sobem pelas paredes. Vença o combate. Até o fim da quarta rodada, uma personagem adjacente ao selo gasta uma ação padrão em duas rodadas diferentes para refazê-lo. Registre sucesso se o grupo vencer e refizer o selo.", "undead"],
        ["Travar a engrenagem do olho", "combate", "Os guardiões de pedra fazem a engrenagem girar, e o fundo do poço começa a se abrir. Vença o combate. Se ao fim de uma rodada houver um adversário adjacente à alavanca e nenhuma personagem adjacente a ela, o fundo se abre mais um passo. Registre sucesso se o grupo vencer antes do terceiro passo.", "construct"]
      ]
    },
    {
      direction: "L", name: "Acampamento de Aslothia",
      tasks: [
        ["Espionar o acampamento", "infiltração", "Obtenha 3 sucessos antes de 2 falhas. Aproxime-se sem ser visto com Furtividade, conte as sentinelas com Percepção e leia os planos dos mercenários com Investigação. Cada etapa exige um sucesso. Na segunda falha, um cão de guarda late e o acampamento inteiro acorda."],
        ["Libertar o guia capturado", "combate", "Os mercenários prenderam a um poste o guia que conhece as ruínas. Vença o combate. Uma personagem adjacente ao poste gasta uma ação padrão para soltá-lo. Registre sucesso se ele for solto até o fim da terceira rodada e o grupo vencer.", "humanoid"],
        ["Arrancar o cristal de comando", "combate", "Os mercenários religaram um construto das ruínas com um cristal de comando preso a um pilar. Vença o combate. Até o fim da quarta rodada, uma personagem adjacente ao pilar gasta uma ação padrão em duas rodadas diferentes para arrancar o cristal. Registre sucesso se o grupo vencer e arrancar o cristal.", "construct"]
      ]
    },
    {
      direction: "SO", name: "Arco partido",
      defaultGuardianBuff: "defense",
      tasks: [
        ["Atravessar o arco partido", "travessia", "Obtenha 3 sucessos antes de 2 falhas. Ache com Percepção a fenda que ainda aguenta peso, salte o vão com Atletismo e equilibre-se na pedra molhada com Acrobacia. Cada etapa exige um sucesso. Na segunda falha, o grupo recua e procura outro caminho pela água."],
        ["Salvar o mercenário pendurado", "combate", "Um mercenário ferido está pendurado na borda do arco, e as feras do alto disputam a presa. Vença o combate. Se um adversário terminar o turno adjacente ao mercenário, ele cai no mar. Registre sucesso se o grupo vencer com o mercenário ainda pendurado.", "monster"],
        ["Proteger a leitura da inscrição", "combate", "O guia lê a inscrição que mostra a passagem pelo arco enquanto os mortos sobem da água. Ele gasta uma ação padrão em três rodadas. Se sofrer dano numa rodada, perde o progresso dela. Registre sucesso quando ele terminar e o grupo vencer.", "undead"]
      ]
    },
    {
      direction: "SL", name: "Trono afundado",
      defaultGuardianBuff: "hp",
      tasks: [
        ["Drenar a sala do trono", "engenho", "Obtenha 2 sucessos antes de 2 falhas. Ache com Investigação a passagem de água sob o trono e abra a comporta de pedra com Ofício (pedreiro) ou Atletismo. Na segunda falha, a comporta trava e a sala continua cheia."],
        ["Segurar a comporta do trono", "combate", "Predadores entram pela comporta aberta e tentam voltar ao mar aberto com ela. Vença o combate. Se um adversário terminar o turno adjacente à comporta, ela se fecha e a sala enche de novo. Registre sucesso se o grupo vencer com a comporta aberta.", "animal"],
        ["Render o capitão dos mercenários", "combate", "O capitão dos mercenários quer o trono antes do grupo. Vença o combate. Escolha a criatura de maior ND para ser o capitão. Registre sucesso se o grupo vencer sem que o capitão chegue ao degrau do trono.", "humanoid"]
      ]
    }
  ],
  guardians: [
    { id: "gigante-do-trono", name: "O Gigante do Trono", briefing: "Sentado no trono do centro, um gigante dos mares bebe de um barril do tamanho de um bote. Ele se levanta devagar, irritado com a visita, e a água escorre da barba até os joelhos.", creatures: [{ id: "gigante-dos-mares", quantity: 1 }] },
    { id: "senhora-das-estatuas", name: "A Senhora das Estátuas", briefing: "As estátuas do centro olham todas para o mesmo ponto. Uma górgona sai de trás do trono, e o maior dos guardiões de pedra dá o primeiro passo em séculos.", creatures: [{ id: "gorgona", quantity: 1 }, { id: "defensor-rochoso", quantity: 1 }] },
    { id: "golem-religado", name: "O Golem Religado", briefing: "Os mercenários de Aslothia chegaram primeiro. O líder ergue o cristal de comando, e um golem de bronze das ruínas range e marcha na direção do grupo.", creatures: [{ id: "golem-de-bronze", quantity: 1 }, { id: "lider-mercenario-de-aslothia", quantity: 1 }] }
  ]
};
