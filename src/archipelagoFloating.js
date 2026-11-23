import { islandGuardianBuffs } from "./archipelagoGuardianBuffs.js";

export const floatingExploration = {
  pilot: "floating-sectors",
  combatChallenge: 8,
  guardianBuffs: islandGuardianBuffs,
  terrain: {
    name: "Plataformas suspensas",
    effect: "O vazio separa as plataformas. As pontes e passarelas marcadas no mapa ligam as ilhotas.",
    features: [{ name: "Vento de altitude", effect: "As áreas de vento forte estão indicadas no mapa." }]
  },
  sectors: [
    {
      direction: "NO", name: "Ilhota de chegada",
      tasks: [
        ["Preparar o desembarque", "exploração", "Use Sobrevivência para prever a aproximação da ilhota e Atletismo para prender a linha de desembarque."],
        ["Recuperar a âncora", "recuperação", "Use Percepção para localizar o gancho entre as raízes e Ladinagem para liberar sua trava."],
        ["Defender a chegada", "combate", "Criaturas circulam a primeira ilhota. Proteja o ponto de desembarque até controlar sua plataforma."]
      ]
    },
    {
      direction: "N", name: "Ponte quebrada",
      tasks: [
        ["Restaurar a passagem", "exploração", "Use Ofício para escolher as vigas firmes e Atletismo para prender um cabo entre as duas pontas."],
        ["Mapear as pedras soltas", "investigação", "Use Percepção para identificar os apoios que se movem e Sobrevivência para traçar uma sequência de travessia."],
        ["Tomar a cabeceira", "combate", "Os inimigos defendem a extremidade da ponte. Vença o confronto para chegar à pedra maior."]
      ]
    },
    {
      direction: "NL", name: "Mirante dos ninhos",
      tasks: [
        ["Ler as rotas de voo", "investigação", "Use Percepção para seguir as sombras e Sobrevivência para marcar uma passagem entre os ninhos."],
        ["Cruzar pela saliência", "exploração", "Use Atletismo para alcançar a borda inferior e Acrobacia para subir do outro lado."],
        ["Liberar o mirante", "combate", "Criaturas saem dos ninhos quando o grupo alcança o mirante. Vença o confronto e tome a passagem."]
      ]
    },
    {
      direction: "O", name: "Queda-d’água",
      tasks: [
        ["Cruzar atrás da cascata", "exploração", "Use Percepção para localizar a trilha atrás da água e Acrobacia para atravessar a pedra molhada."],
        ["Recolher o marco", "recuperação", "Use Sobrevivência para encontrar a plataforma a jusante e Atletismo para içar o marco de rota."],
        ["Tomar a plataforma molhada", "combate", "Uma patrulha guarda a passagem por trás da queda-d’água. Vença o encontro para firmar a rota."]
      ]
    },
    {
      direction: "L", name: "Moinho dos ventos",
      defaultGuardianBuff: "defense",
      tasks: [
        ["Travar as pás", "exploração", "Use Ofício para identificar o freio e Atletismo para segurá-lo enquanto a trava se fecha."],
        ["Apagar a runa de impulso", "ritual", "Use Misticismo para encontrar a runa sob o eixo e Religião para cortar o vínculo com o Centro."],
        ["Conquistar o moinho", "combate", "Os protetores do moinho ocupam a plataforma do rotor. Vença o encontro para desligar a proteção."]
      ]
    },
    {
      direction: "SO", name: "Pedras em órbita",
      defaultGuardianBuff: "hp",
      tasks: [
        ["Sincronizar a travessia", "exploração", "Use Sobrevivência para prever o alinhamento das pedras e Acrobacia para alcançar a maior delas."],
        ["Soltar o contrapeso", "ritual", "Use Misticismo para marcar a pedra que sustenta o vínculo e Ofício para soltar sua trava."],
        ["Tomar a pedra maior", "combate", "Criaturas defendem o contrapeso na pedra maior. Vença o confronto para cortá-lo do Centro."]
      ]
    },
    {
      direction: "S", name: "Jardim das raízes",
      defaultGuardianBuff: "reinforced-rd",
      tasks: [
        ["Abrir a trilha suspensa", "exploração", "Use Sobrevivência para escolher as raízes firmes e Atletismo para cruzá-las até o pedestal."],
        ["Separar a raiz encantada", "ritual", "Use Misticismo para achar a raiz ligada ao Centro e Religião para desfazer seu vínculo."],
        ["Disputar o pedestal", "combate", "As criaturas se protegem entre as raízes expostas. Libere o pedestal para cortar a proteção que ele sustenta."]
      ]
    },
    {
      direction: "SL", name: "Farol suspenso",
      defaultGuardianBuff: "rd-eletricidade",
      tasks: [
        ["Recolher a lente", "recuperação", "Use Percepção para encontrar a lente de foco e Ofício para desmontar sua moldura."],
        ["Desviar o feixe", "ritual", "Use Misticismo para seguir o feixe até o Centro e Ofício para girar a base do farol."],
        ["Tomar o farol", "combate", "Os guardas ocupam as escadas do farol. Vença o encontro para interromper o feixe."]
      ]
    }
  ],
  guardians: [
    {
      id: "custodio-do-ceu", name: "Custódio do Céu",
      briefing: "O dragão celestial atravessa as nuvens e pousa entre o fragmento e a rampa do cume.",
      creatures: [{ id: "dragao-celestial-jovem", quantity: 1 }]
    },
    {
      id: "predador-do-vazio", name: "Predador do Vazio",
      briefing: "O dragão feral sobe pela encosta suspensa e agarra a borda do cume com as garras.",
      creatures: [{ id: "dragao-feral", quantity: 1 }]
    },
    {
      id: "vigia-dos-arcos", name: "Vigia dos Arcos",
      briefing: "Uma serpe se enrola num arco de pedra no cume enquanto um grifo celestial patrulha acima das nuvens.",
      creatures: [{ id: "serpe-ancia", quantity: 1 }, { id: "grifo-celestial", quantity: 1 }]
    }
  ]
};
