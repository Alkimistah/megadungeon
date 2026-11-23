import { islandGuardianBuffs } from "./archipelagoGuardianBuffs.js";

export const stormExploration = {
  pilot: "storm-sectors",
  combatChallenge: 8,
  guardianBuffs: islandGuardianBuffs,
  terrain: {
    name: "Costa sob tempestade",
    effect: "A chuva cobre a ilha, o vento varre as áreas expostas e a enxurrada corre pelas partes baixas.",
    features: [{ name: "Pedra encharcada", effect: "Os trechos escorregadios e de vento forte estão indicados no mapa." }]
  },
  sectors: [
    {
      direction: "NO", name: "Praia dos destroços",
      tasks: [
        ["Marcar o trecho seco", "exploração", "Use Sobrevivência para reconhecer o alcance das ondas e Atletismo para firmar um cabo nos destroços."],
        ["Recuperar a boia de sinal", "recuperação", "Use Percepção para localizar a boia entre os mastros e Ladinagem para soltar sua presilha."],
        ["Garantir o desembarque", "combate", "Criaturas saem dos destroços trazidos pela ressaca. Proteja a linha que liga o barco à praia."]
      ]
    },
    {
      direction: "N", name: "Garganta das rajadas",
      tasks: [
        ["Medir o intervalo do vento", "investigação", "Use Percepção para notar a pausa entre as rajadas e Sobrevivência para escolher o abrigo seguinte."],
        ["Cruzar pela parede", "exploração", "Use Atletismo para alcançar os apoios na parede e Acrobacia para passar entre as saliências."],
        ["Abrir a garganta", "combate", "A patrulha guarda o trecho que afunila o vento. Tome a passagem entre as paredes."]
      ]
    },
    {
      direction: "NL", name: "Várzea da enxurrada",
      tasks: [
        ["Encontrar o leito firme", "exploração", "Use Sobrevivência para ler a direção da enxurrada e Atletismo para levar a corda ao outro lado."],
        ["Localizar os marcos submersos", "investigação", "Use Percepção para encontrar os marcos e Investigação para reconstruir a rota entre eles."],
        ["Segurar a passagem rasa", "combate", "A enxurrada cerca os bancos de terra. Vença o encontro para alcançar a saída da várzea."]
      ]
    },
    {
      direction: "O", name: "Mirante da chuva",
      tasks: [
        ["Traçar uma rota por abrigo", "investigação", "Use Percepção para ver as silhuetas dos abrigos e Sobrevivência para ligar as posições em uma rota."],
        ["Recuperar o sinalizador", "recuperação", "Use Percepção para encontrar o sinalizador preso na cornija e Atletismo para içá-lo."],
        ["Tomar o mirante", "combate", "A chuva esconde criaturas entre as pedras. Vença o encontro para tomar a plataforma de observação."]
      ]
    },
    {
      direction: "L", name: "Agulhas de cobre",
      defaultGuardianBuff: "defense",
      tasks: [
        ["Desligar a agulha", "ritual", "Use Misticismo para seguir a carga até a agulha principal e Ofício para separar seu encaixe do círculo."],
        ["Abrir a caixa de ligação", "recuperação", "Use Ladinagem para abrir a caixa selada e Ofício para remover o conector do circuito."],
        ["Tomar a plataforma de cobre", "combate", "As criaturas defendem a base das agulhas. Tome a plataforma para cortar uma proteção do guardião."]
      ]
    },
    {
      direction: "SO", name: "Comporta do dilúvio",
      defaultGuardianBuff: "hp",
      tasks: [
        ["Aliviar a pressão na comporta", "exploração", "Use Ofício para localizar o desvio lateral e Atletismo para mover a alavanca contra a corrente."],
        ["Romper o selo de pressão", "ritual", "Use Misticismo para seguir as inscrições entre os canais e Religião para desfazer sua ligação com o Centro."],
        ["Conquistar a comporta", "combate", "A guarda mantém a alavanca fora de alcance. Vença o encontro para soltar a proteção que ela alimenta."]
      ]
    },
    {
      direction: "S", name: "Santuário do trovão",
      defaultGuardianBuff: "reinforced-rd",
      tasks: [
        ["Calar o altar sonoro", "ritual", "Use Religião para reconhecer a ordem dos sinos e Misticismo para encerrar a ressonância que sustenta o guardião."],
        ["Retirar o badalo", "recuperação", "Use Atletismo para sustentar o badalo e Ladinagem para liberar a trava que o prende."],
        ["Tomar o altar do trovão", "combate", "Criaturas se abrigam entre os sinos. Tome o altar para interromper a ressonância ligada ao Centro."]
      ]
    },
    {
      direction: "SL", name: "Farol da tormenta",
      defaultGuardianBuff: "rd-eletricidade",
      tasks: [
        ["Reorientar a lente", "ritual", "Use Misticismo para identificar o foco ligado ao guardião e Ofício para travar a lente fora desse alinhamento."],
        ["Subir pela escada interna", "exploração", "Use Percepção para achar os degraus soltos e Atletismo para alcançar a caixa do mecanismo."],
        ["Conquistar o farol da tormenta", "combate", "A guarda resiste na plataforma do farol. Vença o confronto para desviar seu feixe do Centro."]
      ]
    }
  ],
  guardians: [
    {
      id: "capitao-da-ressaca", name: "Capitão da Ressaca",
      briefing: "O capitão afogado sobe ao círculo com a água escorrendo do casaco e ocupa a passagem até o fragmento.",
      creatures: [{ id: "capitao-afogado", quantity: 1 }]
    },
    {
      id: "vigia-da-escarpa", name: "Vigia da Escarpa",
      briefing: "A coruja druida aguarda no marco de pedra e abre as asas quando o grupo entra no olho da tormenta.",
      creatures: [{ id: "coruja-druida", quantity: 1 }]
    },
    {
      id: "sentinela-dos-para-raios", name: "Sentinela dos Para-Raios",
      briefing: "O golem de ferro se solta do pedestal quando o grupo cruza a linha dos condutores.",
      creatures: [{ id: "golem-de-ferro", quantity: 1 }]
    }
  ]
};
