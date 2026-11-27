import { islandGuardianBuffs } from "./archipelagoGuardianBuffs.js";

const prismRule = "Focos do Prisma da Maré. No início de cada rodada, o foco solar avança na ordem A → B → C → A, começando em A na primeira rodada. A próxima zona brilha de leve. Para abrir a passagem à sombra, gaste uma ação padrão adjacente à passagem em duas rodadas diferentes e vença o combate.";

export const crystalExploration = {
  pilot: "crystal-sectors",
  combatChallenge: 7,
  guardianBuffs: islandGuardianBuffs,
  terrain: {
    name: "Recife translúcido",
    effect: "A luz atravessa veios de âmbar, azul e violeta. Ao apresentar as criaturas, descreva as amebas como massas quase transparentes, as centopeias com placas brilhantes e as gárgulas e górgonas com carapaças facetadas.",
    features: [
      { name: "Placas polidas", effect: "Para se mover sobre as placas, faça um teste de Acrobacia CD 10 (Equilíbrio) a cada ação de movimento. Se passar, avance até metade do deslocamento. Se falhar, deslize 1 quadrado na direção do movimento se o espaço estiver livre, então encerre o movimento. Se falhar por 5 ou mais, fique caído após o deslize." },
      { name: "Campos de farpas", effect: "Na primeira vez em cada turno que uma criatura entra nas farpas, ela sofre 1d6 pontos de dano de corte, mesmo se entrar deslizando." },
      { name: "Focos solares", effect: "Uma criatura que começar seu turno em um foco solar ativo sofre 2d6 pontos de dano de fogo. No Centro, o foco ativo muda a cada rodada." }
    ]
  },
  sectors: [
    {
      direction: "NO", name: "Galerias sob o Piso",
      tasks: [
        ["Atravessar pelas nervuras", "exploração", "Obtenha 3 sucessos antes de 2 falhas. Encontre uma faixa firme com Percepção, passe entre as placas com Acrobacia e reconheça com Sobrevivência as vibrações de uma galeria ocupada. Cada etapa exige um sucesso. Na segunda falha, o piso cede e a passagem fica bloqueada."],
        ["Firmar a saída da galeria", "combate", "Abra a saída com uma ação padrão junto à fenda até o fim da quarta rodada e vença o combate."],
        ["Resgatar na rachadura", "combate", "Gaste duas ações padrão junto à rachadura até o fim da quarta rodada para retirar a pessoa presa e vença o combate."]
      ]
    },
    {
      direction: "NL", name: "Jardim de Farpas",
      tasks: [
        ["Seguir os besouros", "exploração", "Obtenha 3 sucessos antes de 2 falhas. Ache a trilha dos besouros com Sobrevivência, identifique as agulhas soltas com Percepção e passe por elas com Acrobacia. Cada etapa exige um sucesso. Na segunda falha, uma placa inclinada quebra e cobre a trilha de farpas."],
        ["Defender a passagem", "combate", "Vença antes que os adversários terminem três turnos, somados, junto à passagem marcada no mapa."],
        ["Abrir caminho entre as farpas", "combate", "Gaste duas ações padrão no marco até o fim da quarta rodada para abrir a trilha e vença o combate."]
      ]
    },
    {
      direction: "O", name: "Espelho Inclinado",
      tasks: [
        ["Descer pelas saliências", "exploração", "Obtenha 3 sucessos antes de 2 falhas. Identifique onde frear com Percepção, desça com Acrobacia e use Atletismo para auxiliar a próxima pessoa da fila. Cada etapa exige um sucesso. Na segunda falha, o grupo escorrega até um patamar sem saída."],
        ["Segurar a faixa firme", "combate", "Vença o combate com pelo menos uma personagem junto ao marco ao fim da quarta rodada."],
        ["Recuperar a mochila", "combate", "Recolha a mochila com uma ação padrão no marco até o fim da terceira rodada e vença o combate."]
      ]
    },
    {
      direction: "L", name: "Bacias Solares",
      tasks: [
        ["Cruzar pelas sombras", "exploração", "Obtenha 3 sucessos antes de 2 falhas. Identifique os focos mais quentes com Percepção, encontre uma rota pela sombra com Sobrevivência e atravesse o trecho exposto com Atletismo. Cada etapa exige um sucesso. Na segunda falha, a rota fica toda exposta ao sol e o grupo recua."],
        ["Disputar a rota sombreada", "combate", "Vença o combate com pelo menos uma personagem no marco ao fim da quarta rodada."],
        ["Retirar o explorador da bacia", "combate", "Gaste uma ação padrão no marco até o fim da quarta rodada para alcançar o explorador e vença o combate."]
      ]
    },
    {
      direction: "SO", name: "Colunata Violeta", defaultGuardianBuff: "defense",
      tasks: [
        ["Ler os reflexos", "exploração", "Obtenha 3 sucessos antes de 2 falhas. Distinga os vultos com Percepção, reconheça as faces repetidas com Investigação e marque a rota com Sobrevivência. Cada etapa exige um sucesso. Na segunda falha, o grupo sai por onde entrou e perde a passagem."],
        ["Defender a saída", "combate", "Vença antes que os adversários terminem três turnos, somados, junto à saída marcada no mapa."],
        ["Romper a lâmina", "combate", "Gaste duas ações padrão junto à lâmina até o fim da quarta rodada para quebrá-la e vença o combate."]
      ]
    },
    {
      direction: "SL", name: "Poço das Sete Cores", defaultGuardianBuff: "hp",
      tasks: [
        ["Descer pela borda opaca", "exploração", "Obtenha 3 sucessos antes de 2 falhas. Ache a borda firme com Percepção, ancore a descida com Atletismo e chegue ao fundo com Acrobacia. Cada etapa exige um sucesso. Na segunda falha, uma borda racha e obriga o grupo a voltar."],
        ["Recolher o fragmento", "combate", "Recolha o fragmento no marco com uma ação padrão até o fim da quarta rodada e vença o combate."],
        ["Tomar os pontos de apoio", "combate", "Vença o combate com pelo menos uma personagem junto ao marco ao fim da quarta rodada."]
      ]
    }
  ],
  guardians: [
    {
      id: "golem-de-espelhos",
      name: "Golem de Espelhos",
      briefing: "As placas translúcidas ao redor do prisma se erguem e tomam forma. As faces do golem refletem os movimentos do grupo.",
      rule: prismRule,
      creatures: [{ id: "golem-de-espelhos", quantity: 1 }]
    },
    {
      id: "amebas-do-prisma",
      name: "Amebas do Prisma",
      briefing: "Duas amebas gigantes quase transparentes avançam pelos lados da passagem. As cores do chão mudam de forma e denunciam o movimento delas.",
      rule: prismRule,
      creatures: [{ id: "ameba-gigante", quantity: 2 }]
    },
    {
      id: "centopeia-solar",
      name: "Centopeia Solar",
      briefing: "Uma fileira de placas âmbar acende sob a arena. A centopeia irrompe por uma fenda com as mandíbulas brilhando de calor.",
      rule: prismRule,
      creatures: [{ id: "centopeia-solar", quantity: 1 }]
    }
  ]
};
