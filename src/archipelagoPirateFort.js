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
        ["Sondar o atracadouro", "exploração", "Use Sobrevivência para identificar a face abrigada do cais e Atletismo para alcançar a escada sem depender da ponte principal."],
        ["Recuperar o manifesto", "recuperação", "Use Percepção para localizar o manifesto entre as caixas de carga e Ladinagem para soltar o fecho impermeável."],
        ["Romper o bloqueio do cais", "combate", "A patrulha pirata fecha o acesso pelo cais. Tome a rampa de carga para abrir caminho até o fortim."]
      ]
    },
    {
      direction: "NL", name: "Passarela da paliçada",
      tasks: [
        ["Inspecionar a paliçada", "investigação", "Use Percepção para achar o trecho remendado e Investigação para identificar o caminho entre os pontos de vigia."],
        ["Cruzar pela viga externa", "exploração", "Use Atletismo para alcançar a viga e Acrobacia para atravessá-la até a passarela."],
        ["Disputar a passarela", "combate", "A guarda se protege atrás dos parapeitos. Tome o patamar que liga a passarela ao pátio."]
      ]
    },
    {
      direction: "O", name: "Armazém de saque",
      tasks: [
        ["Rastrear a carga do leilão", "investigação", "Use Investigação para cruzar os rótulos com o inventário e Percepção para identificar qual carga seguiu ao pátio."],
        ["Retirar o livro de contas", "recuperação", "Use Ladinagem para abrir o armário trancado e Investigação para encontrar o registro do comprador do fragmento."],
        ["Tomar o corredor de carga", "combate", "Os piratas saem por entre as pilhas de caixas. Vença o confronto para liberar a passagem de serviço ao pátio."]
      ]
    },
    {
      direction: "L", name: "Torre de vigia",
      tasks: [
        ["Decifrar as bandeiras", "investigação", "Use Percepção para ler a sequência de bandeiras e Investigação para relacioná-la com os horários da guarda."],
        ["Subir pelo lado cego", "exploração", "Use Atletismo para alcançar o patamar externo e Furtividade para atravessar entre as janelas."],
        ["Tomar a torre", "combate", "A vigia bloqueia os degraus com barricas. Vença o encontro para alcançar a plataforma de sinais."]
      ]
    },
    {
      direction: "SO", name: "Capela da quilha",
      defaultGuardianBuff: "defense",
      tasks: [
        ["Desatar o juramento", "ritual", "Use Religião para reconhecer o juramento gravado na quilha e Misticismo para interromper o vínculo com o guardião."],
        ["Retirar o amuleto", "recuperação", "Use Percepção para localizar o amuleto pendurado entre as oferendas e Ladinagem para soltá-lo sem derrubar as velas."],
        ["Disputar o altar", "combate", "A guarda protege a quilha consagrada. Tome o altar para interromper um dos bônus do guardião."]
      ]
    },
    {
      direction: "SL", name: "Casa do contramestre",
      defaultGuardianBuff: "hp",
      tasks: [
        ["Examinar o cofre de bordo", "investigação", "Use Investigação para identificar o compartimento falso e Ladinagem para recuperar o talismã guardado ali."],
        ["Cortar o vínculo do talismã", "ritual", "Use Misticismo para seguir o vínculo até o pátio e Religião para desfazê-lo."],
        ["Vencer a guarda do cofre", "combate", "A guarda do contramestre protege o talismã. Controle a sala para interromper sua proteção sobre o guardião."]
      ]
    }
  ],
  guardians: [
    {
      id: "capitao-do-leilao", name: "Capitão do Leilão",
      briefing: "No convés do galeão, o capitão cobre o fragmento com um pano e chama o bando que vigiava a prancha de embarque.",
      creatures: [{ id: "capitao-do-conclave-pirata", quantity: 1 }, { id: "bando-pirata", quantity: 1 }]
    },
    {
      id: "dono-do-fortim", name: "Dono do Fortim",
      briefing: "O capitão se coloca entre o grupo e a mesa do leilão, montada no convés. Seu mercenário ogro fecha a passagem pela amurada.",
      creatures: [{ id: "capitao-pirata", quantity: 1 }, { id: "ogro-cacador", quantity: 1 }]
    },
    {
      id: "ogro-da-quilha", name: "Ogro da Quilha",
      briefing: "O ogro agarra o relicário do fragmento. Um capanga galokk bloqueia a passagem para a popa.",
      creatures: [{ id: "ogro-das-sanguinarias", quantity: 1 }, { id: "galokk-capanga", quantity: 1 }]
    }
  ]
};
