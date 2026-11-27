export const coralCoastExploration = {
  pilot: "coral-coast-sectors",
  terrain: {
    name: "Recife de coral",
    effect: "Paredes de coral separam os baixios das galerias submersas.",
    features: [{ name: "Cristas de coral", effect: "Terreno difícil para quem avança pelo fundo." }]
  },
  sharedTasks: true,
  sectors: [
    {
      direction: "N", name: "Jardim de corais",
      tasks: [
        ["Marcar uma trilha pela água rasa", "exploração", "Obtenha 3 sucessos antes de 2 falhas. Use Percepção para localizar as cristas, Sobrevivência para traçar o caminho e Atletismo para ancorar a linha na saída. Cada etapa exige um sucesso. Na segunda falha, a linha se rompe."],
        ["Proteger o recife vivo", "combate", "A corrente estica uma rede presa nas pontas do coral. Contenha as criaturas enquanto uma personagem junto à rede gasta uma ação padrão em duas rodadas diferentes para soltá-la.", "animal"],
        ["Afastar as criaturas dos baixios", "combate", "As criaturas acossam quem tenta cruzar a água rasa. Registre sucesso se o grupo vencer ou conseguir atraí-las para um canal lateral e cruzar enquanto a passagem estiver livre.", "animal"]
      ]
    },
    {
      direction: "S", name: "Parede do recife",
      tasks: [
        ["Cruzar a parede pelas fendas", "travessia", "Obtenha 2 sucessos antes de 2 falhas. Use Percepção para achar apoios e Atletismo para cruzar sem tocar nas cristas. Na segunda falha, a corrente obriga o grupo a voltar."],
        ["Manter a ancoragem", "combate", "Vença o encontro e preserve a linha de descida. Ao fim da terceira rodada, a ancoragem se solta se nenhuma personagem junto a ela tiver gasto uma ação padrão para firmá-la."],
        ["Abrir a rota atrás da parede", "exploração", "Obtenha 3 sucessos antes de 2 falhas. Identifique a abertura com Investigação, alcance-a com Atletismo e marque a saída com Sobrevivência. Cada etapa exige um sucesso. Na segunda falha, sedimentos fecham a visibilidade."]
      ]
    },
    {
      direction: "L", name: "Grutas inundadas",
      tasks: [
        ["Ligar os bolsões de ar", "exploração", "Obtenha 3 sucessos antes de 2 falhas. Use Percepção para achar as bolhas que indicam um bolsão, Atletismo para alcançá-lo e Sobrevivência para fixar a corda de retorno. Cada etapa exige um sucesso. Na segunda falha, o grupo precisa voltar pelo caminho de entrada."],
        ["Defender a câmara de ar", "combate", "O túnel inundado termina numa câmara onde ainda se pode respirar. Vença o combate e gaste uma ação padrão junto à borda para prender um cabo que marque o caminho de volta.", "animal"],
        ["Recuperar a placa do túnel", "recuperação", "Obtenha 2 sucessos antes de 2 falhas. Localize a placa de rota com Investigação e solte-a com Ladinagem ou Atletismo. Na segunda falha, a placa afunda na fenda."]
      ]
    },
    {
      direction: "O", name: "Santuário das pérolas",
      tasks: [
        ["Reabrir a concha do altar", "ritual", "Uma concha de pedra veda a passagem no altar. Obtenha 3 sucessos antes de 2 falhas. Leia as marcas com Religião ou Conhecimento, encontre a pérola de contrapeso com Investigação e solte o fecho com Ladinagem ou Misticismo. Na segunda falha, o fecho emperra."],
        ["Tomar o pátio submerso", "combate", "Vença o encontro e mantenha aberta a passagem do santuário. Uma personagem precisa gastar uma ação padrão junto ao pedestal para destravar a passagem antes do fim da terceira rodada.", "humanoid"],
        ["Proteger o alinhamento das pérolas", "combate", "Uma personagem deve gastar uma ação padrão em três rodadas junto ao altar para alinhar as pérolas. O mestre pode registrar sucesso assim que o alinhamento ficar pronto."]
      ]
    }
  ],
  guardians: [
    { briefing: "O chefe dos elfos-do-mar faz guarda sob o arco de coral. Ao assobio dele, um selako-tigre emerge de trás da parede do recife.", creatures: [{ id: "elfo-do-mar-chefe", quantity: 1 }, { id: "selako-tigre", quantity: 1 }] },
    { briefing: "A lula-rainha enrola os tentáculos nas colunas do recife e varre a água à procura do grupo.", creatures: [{ id: "lula-rainha-do-recife", quantity: 1 }] },
    { name: "Reishid do Recife", briefing: "O coral junto ao nicho tem manchas rubras. Um reishid se agarra ao arco acima da água e acompanha a aproximação do grupo.", creatures: [{ id: "reishid", quantity: 1 }] }
  ]
};
