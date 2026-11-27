import { islandGuardianBuffs } from "./archipelagoGuardianBuffs.js";

export const pirateFortExploration = {
  pilot: "pirate-fort-sectors",
  combatChallenge: 7,
  guardianBuffs: islandGuardianBuffs,
  terrain: {
    name: "Fortim costeiro",
    effect: "Paliçadas e passarelas ligam o fortim ao galeão atracado onde os piratas pretendem vender o fragmento.",
    features: [{ name: "Barricas e engradados", effect: "Os obstáculos indicados no mapa oferecem cobertura." }]
  },
  sectors: [
    {
      direction: "NO", name: "Cais dos contrabandistas",
      tasks: [
        ["Sondar o atracadouro", "exploração", "Obtenha 3 sucessos antes de 2 falhas. Ache a face abrigada com Sobrevivência, localize a escada com Percepção e alcance o cais com Atletismo. Cada etapa exige um sucesso. Na segunda falha, a patrulha ilumina a escada e o grupo recua."],
        ["Recuperar o manifesto", "combate", "Até o fim da quarta rodada, gaste uma ação padrão junto ao estojo impermeável para soltar o manifesto. Registre sucesso se o grupo conseguir recuperar o manifesto e vencer o combate."],
        ["Romper o bloqueio do cais", "combate", "A patrulha pirata fecha o acesso pelo cais. Tome a rampa de carga para abrir caminho até o fortim."]
      ]
    },
    {
      direction: "NL", name: "Passarela da paliçada",
      tasks: [
        ["Inspecionar a paliçada", "exploração", "Obtenha 3 sucessos antes de 2 falhas. Ache o remendo com Percepção, reconheça a rota entre os vigias com Investigação e cruze a viga com Acrobacia. Cada etapa exige um sucesso. Na segunda falha, a guarda bloqueia o trecho remendado."],
        ["Cruzar pela viga externa", "combate", "Até o fim da quarta rodada, leve uma personagem até o patamar marcado do outro lado da paliçada. Registre sucesso se o grupo conseguir alcançar o patamar e vencer o combate."],
        ["Disputar a passarela", "combate", "A guarda se protege atrás dos parapeitos. Tome o patamar que liga a passarela ao pátio."]
      ]
    },
    {
      direction: "O", name: "Armazém de saque",
      tasks: [
        ["Rastrear a carga do leilão", "exploração", "Obtenha 3 sucessos antes de 2 falhas. Compare os rótulos com Investigação, encontre a fileira certa com Percepção e passe pela ronda com Furtividade. Cada etapa exige um sucesso. Na segunda falha, os carregadores levam a carga para fora do armazém."],
        ["Retirar o livro de contas", "combate", "Até o fim da quarta rodada, gaste duas ações padrão junto ao armário, em rodadas diferentes, para abri-lo e pegar o livro. Registre sucesso se o grupo conseguir recolher o livro e vencer o combate."],
        ["Tomar o corredor de carga", "combate", "Os piratas saem por entre as pilhas de caixas. Vença o confronto para liberar a passagem de serviço ao pátio."]
      ]
    },
    {
      direction: "L", name: "Torre de vigia",
      tasks: [
        ["Decifrar as bandeiras", "exploração", "Obtenha 3 sucessos antes de 2 falhas. Leia os sinais com Percepção, relacione a sequência aos horários com Investigação e avance entre as janelas com Furtividade. Cada etapa exige um sucesso. Na segunda falha, o vigia muda o sinal e reforça a ronda."],
        ["Subir pelo lado cego", "combate", "Até o fim da quarta rodada, leve uma personagem até o patamar externo marcado ao pé da escada da torre. Registre sucesso se o grupo conseguir alcançar o patamar e vencer o combate."],
        ["Tomar a torre", "combate", "A vigia bloqueia os degraus com barricas. Vença o encontro para alcançar a plataforma de sinais."]
      ]
    },
    {
      direction: "SO", name: "Capela da quilha",
      defaultGuardianBuff: "defense",
      tasks: [
        ["Desatar o juramento", "ritual", "Obtenha 3 sucessos antes de 2 falhas. Reconheça o juramento com Religião, localize a oferenda com Percepção e rompa o vínculo com Misticismo. Cada etapa exige um sucesso. Na segunda falha, o amuleto volta a alimentar o juramento."],
        ["Retirar o amuleto", "combate", "Até o fim da quarta rodada, gaste uma ação padrão junto ao suporte de oferendas para soltar o amuleto. Registre sucesso se o grupo conseguir retirar o amuleto e vencer o combate."],
        ["Disputar o altar", "combate", "A guarda protege a quilha consagrada. Tome o altar para interromper um dos bônus do guardião."]
      ]
    },
    {
      direction: "SL", name: "Casa do contramestre",
      defaultGuardianBuff: "hp",
      tasks: [
        ["Examinar o cofre de bordo", "exploração", "Obtenha 3 sucessos antes de 2 falhas. Identifique o fundo falso com Investigação, solte a trava com Ladinagem e reconheça o vínculo com Misticismo. Cada etapa exige um sucesso. Na segunda falha, a trava fecha e sela o compartimento."],
        ["Cortar o vínculo do talismã", "combate", "Até o fim da quarta rodada, gaste duas ações padrão junto ao suporte do talismã, em rodadas diferentes, para cortar o vínculo. Registre sucesso se o grupo conseguir romper o vínculo e vencer o combate."],
        ["Vencer a guarda do cofre", "combate", "A guarda do contramestre protege o talismã. Controle a sala para interromper sua proteção sobre o guardião."]
      ]
    }
  ],
  guardians: [
    {
      id: "capitao-do-leilao", name: "Capitão do Leilão",
      briefing: "No convés, o capitão cobre o fragmento com um pano. Ele saca a pistola e anuncia o último lance da noite.",
      creatures: [{ id: "capitao-do-leilao", quantity: 1 }]
    },
    {
      id: "dono-do-fortim", name: "Dono do Fortim",
      briefing: "O capitão se coloca entre o grupo e a mesa do leilão, montada no convés. Seu mercenário ogro fecha a passagem pela amurada.",
      creatures: [{ id: "capitao-pirata", quantity: 1 }, { id: "ogro-cacador", quantity: 1 }]
    },
    {
      id: "ogro-da-quilha", name: "Ogro da Quilha",
      briefing: "O ogro agarra o relicário do fragmento. Ele rosna e ergue o machado sobre a amurada.",
      creatures: [{ id: "ogro-da-quilha", quantity: 1 }]
    }
  ]
};
