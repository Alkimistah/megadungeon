function withInvocation(aspect) {
  const ritual = {
    name: "Invocando Aspectos",
    timing: null,
    text: [
      `Um devoto da divindade, treinado em Religião e com Celebrar Ritual, gasta 1 hora, 10 PM e T$ 3.000 em materiais litúrgicos e faz um teste de Religião CD ${25 + aspect.challengeRating}.`,
      "Até três auxiliares podem ajudar com testes de Religião. Cada auxiliar devoto da mesma divindade reduz o custo em 1 PM.",
      "Em caso de sucesso, o mestre define a atitude inicial do aspecto, e o tempo de permanência depende de o celebrante persuadi-lo a ajudar.",
      "Em caso de falha, os recursos são gastos. Um 1 natural pode ofender a divindade ou invocar um aspecto hostil. O mestre pode estabelecer custos adicionais apropriados à divindade.",
      "Deuses de Arton, p. 267."
    ].join(" ")
  };
  return { ...aspect, abilities: [...aspect.abilities, ritual] };
}

export const divineAspects = [
  {
    "id": "aspecto-de-allihanna",
    "name": "Aspecto de Allihanna",
    "type": "animal",
    "subtype": null,
    "size": "Grande",
    "challengeRating": 5,
    "source": {
      "book": "Deuses de Arton",
      "edition": "1ª edição, maio de 2025 (v1.1)",
      "pdfFile": "T20 Deuses de Arton.pdf",
      "bookPage": 265,
      "pdfPage": 267
    },
    "stats": {
      "initiative": 6,
      "perception": 6,
      "defense": 24,
      "fortitude": 17,
      "reflex": 11,
      "will": 5,
      "hitPoints": 200,
      "speedText": "12m (8q), sem redução por terreno difícil natural",
      "senses": "faro, visão na penumbra",
      "defensesText": null,
      "attributes": {
        "str": 4,
        "dex": 2,
        "con": 4,
        "int": -4,
        "wis": 2,
        "cha": 0
      }
    },
    "actions": [
      {
        "name": "Corpo a Corpo",
        "text": "Galhada +17 (1d8+9, x3) e duas garras +17 (1d8+9, 18)."
      }
    ],
    "abilities": [
      {
        "name": "Rugido de Centenas",
        "timing": "padrão",
        "text": "O aspecto de Allihanna emite um poderoso rugido. Todas as criaturas em um raio de 9m ficam paralisadas por 1 rodada e abaladas (Von CD 20 evita). Uma criatura só pode ser paralisada por esta habilidade uma vez por cena. Medo. Recarga (padrão)."
      }
    ],
    "equipment": null,
    "treasure": "3d4 rações de viagem (CD 20 para extrair).",
    "skillsText": "Atletismo +8, Sobrevivência +10.",
    "role": "solo",
    "roleSource": "pdf-review"
  },
  {
    "id": "aspecto-de-kallyadranoch",
    "name": "Aspecto de Kallyadranoch",
    "type": "monster",
    "subtype": "dragão",
    "size": "Grande",
    "challengeRating": 6,
    "source": {
      "book": "Deuses de Arton",
      "edition": "1ª edição, maio de 2025 (v1.1)",
      "pdfFile": "T20 Deuses de Arton.pdf",
      "bookPage": 267,
      "pdfPage": 269
    },
    "stats": {
      "initiative": 10,
      "perception": 9,
      "defense": 28,
      "fortitude": 18,
      "reflex": 6,
      "will": 12,
      "hitPoints": 280,
      "speedText": "12m (8q), voo 18m (16q)",
      "senses": "percepção às cegas, visão no escuro",
      "defensesText": "redução de dano 5, resistência a magia +2",
      "attributes": {
        "str": 8,
        "dex": 3,
        "con": 6,
        "int": 2,
        "wis": 2,
        "cha": 4
      }
    },
    "actions": [
      {
        "name": "Corpo a Corpo",
        "text": "Mordida +21 (2d6+14, 19) e duas garras +21 (1d8+14, 19)."
      }
    ],
    "abilities": [
      {
        "name": "Aura Aterradora",
        "timing": null,
        "text": "Uma criatura que comece o turno em alcance longo do aspecto fica apavorada se tiver até 4 níveis, ou abalada se tiver 5 ou mais, até o fim da cena (Vontade CD 23 evita e concede imunidade por um dia). Veja Livro Básico, p. 311."
      },
      {
        "name": "Escamas Multicor",
        "timing": null,
        "text": "A essência dracônica do aspecto de Kallyadranoch muda constantemente. No início de cada rodada role 1d6 para determinar seu elemento. O aspecto é imune a dano do tipo de sua essência atual. 1) Ácido (vulnerável por 1d4 rodadas). 2) Eletricidade (ofuscado por 1d4 rodadas). 3) Fogo (em chamas). 4) Frio (lento por 1d4 rodadas). 5) Luz (cego por 1d4 rodadas). 6) Trevas (enjoado por 1d4 rodadas)."
      },
      {
        "name": "Sopro",
        "timing": "padrão",
        "text": "O aspecto usa um dos sopros abaixo; o dano e a condição causada pelo sopro são determinados pela essência dracônica atual do aspecto (Ref CD 23 reduz à metade e evita a condição). Recarga (movimento). • Cone. Todas as criaturas em um cone de 9m sofrem 6d12 pontos de dano e a condição correspondente. • Explosão. Criaturas em uma esfera de 6m de raio em alcance médio sofrem 6d12 pontos de dano e a condição correspondente. • Linha. Criaturas em uma linha de 12m sofrem 6d12 pontos de dano e a condição correspondente. Cada vez que um dado de dano do sopro rola o valor máximo, role um dado extra e some ao total. • Nuvem. Uma nuvem cobre um cubo de 6m de lado por 2 rodadas. Criaturas que comecem seus turnos na área sofrem 6d6 pontos de dano e a condição correspondente."
      },
      {
        "name": "Varrer",
        "timing": "livre",
        "text": "Uma vez por rodada, quando o aspecto faz um ataque corpo a corpo e reduz os pontos de vida do alvo para 0 ou menos, pode realizar um ataque adicional contra outra criatura dentro do seu alcance."
      }
    ],
    "equipment": null,
    "treasure": "Dobro e 3 peças de couro de dragão de tipos definidos aleatoriamente (CD 21 para extrair, veja Tormenta20, p. 312).",
    "skillsText": "Atletismo +13, Intimidação +11, Misticismo +9.",
    "role": "solo",
    "roleSource": "pdf-review"
  },
  {
    "id": "aspecto-de-khalmyr",
    "name": "Aspecto de Khalmyr",
    "type": "humanoid",
    "subtype": "anão",
    "size": "Médio",
    "challengeRating": 5,
    "source": {
      "book": "Deuses de Arton",
      "edition": "1ª edição, maio de 2025 (v1.1)",
      "pdfFile": "T20 Deuses de Arton.pdf",
      "bookPage": 269,
      "pdfPage": 271
    },
    "stats": {
      "initiative": 4,
      "perception": 6,
      "defense": 24,
      "fortitude": 11,
      "reflex": 5,
      "will": 17,
      "hitPoints": 200,
      "speedText": "6m (4q)",
      "senses": "(+8 em subterrâneo), visão no escuro",
      "defensesText": "imunidade a acertos críticos e medo, redução de dano 5",
      "attributes": {
        "str": 5,
        "dex": 0,
        "con": 5,
        "int": 0,
        "wis": 2,
        "cha": 5
      }
    },
    "actions": [
      {
        "name": "Corpo a Corpo",
        "text": "Espada-calibre +17 x2 (15, 19)."
      },
      {
        "name": "À Distância",
        "text": "Espada-calibre +17 (7, 19/x3)."
      }
    ],
    "abilities": [
      {
        "name": "Cura pelas Mãos",
        "timing": "movimento",
        "text": "O aspecto de Khalmyr cura 5 pontos de vida por luz de uma criatura adjacente.",
        "magical": true
      },
      {
        "name": "Destruir o Crime",
        "timing": "livre",
        "text": "Uma vez por rodada, quando o aspecto ataca em corpo a corpo um devoto que, a critério do mestre, seja culpado de um crime, ele recebe +5 no teste de ataque e +9 na rolagem de dano.",
        "magical": true
      },
      {
        "name": "Espada-Calibre",
        "timing": "livre",
        "text": "Quando ataca em corpo a corpo com sua espada-calibre, o aspecto pode disparar sua bala para causar +7 pontos de dano de perfuração. Recarga (movimento)."
      },
      {
        "name": "Ordenar Sorte",
        "timing": null,
        "text": "Uma vez por rodada, o aspecto pode escolher 10 em um teste qualquer."
      }
    ],
    "equipment": "Armadura completa, balas x20, escudo pesado, espada-calibre.",
    "treasure": "Padrão.",
    "skillsText": "Atletismo +9, Diplomacia +11, Intuição +11, Nobreza +6, Religião +11.",
    "role": "solo",
    "roleSource": "pdf-review"
  },
  {
    "id": "aspecto-de-lin-wu",
    "name": "Aspecto de Lin-Wu",
    "type": "spirit",
    "subtype": null,
    "size": "Grande",
    "challengeRating": 4,
    "source": {
      "book": "Deuses de Arton",
      "edition": "1ª edição, maio de 2025 (v1.1)",
      "pdfFile": "T20 Deuses de Arton.pdf",
      "bookPage": 269,
      "pdfPage": 271,
      "bookPageEnd": 270,
      "pdfPageEnd": 272
    },
    "stats": {
      "initiative": 6,
      "perception": 12,
      "defense": 22,
      "fortitude": 12,
      "reflex": 4,
      "will": 16,
      "hitPoints": 158,
      "speedText": "12m (8q), voo 24m (16q)",
      "senses": "percepção às cegas, visão no escuro",
      "defensesText": "imunidade a efeitos de atordoamento, eletricidade, medo, metabolismo, metamorfose e paralisia, redução de dano 5, resistência a magia +2, vulnerabilidade a ácido",
      "attributes": {
        "str": 7,
        "dex": 2,
        "con": 6,
        "int": 4,
        "wis": 6,
        "cha": 5
      },
      "manaPoints": 36
    },
    "actions": [
      {
        "name": "Corpo a Corpo",
        "text": "Mordida +14 (1d8+7, 18) e duas garras +14 (1d6+5, 18)."
      }
    ],
    "abilities": [
      {
        "name": "Conduta Honrosa",
        "timing": null,
        "text": "O aspecto de Lin-Wu emana uma aura de honra de 9m de raio. Criaturas à escolha do aspecto nessa área recebem +2 em testes de perícia, desde que ajam de forma exemplar (em termos de jogo, devem obedecer ao Código de Honra do cavaleiro, Código do Herói do paladino e às Obrigações & Restrições de Lin-Wu). Uma criatura que viole qualquer um desses códigos perde o bônus da aura e só pode voltar a recebê-lo (de qualquer aspecto de Lin-Wu) se realizar um rito (veja Religião em Tormenta20, p. 122) em nome de Lin-Wu."
      },
      {
        "name": "Dragão Divino",
        "timing": null,
        "text": "O aspecto tem as habilidades dos dragões celestiais (p. 270). Magia Celestial permite lançar magias sem palavras mágicas, gestos, concentração ou componentes materiais. Metamorfose Celestial (Completa) funciona como Metamorfose, sem limitação para formas menores, e a forma original retorna na morte. Presença Celestial se aplica a dragões celestiais adultos ou mais velhos: no início do turno em alcance longo, a criatura fica apavorada se tiver até 4 níveis ou abalada se tiver 5 ou mais, até o fim da cena. Criaturas com código de conduta e devotos de Khalmyr ou Lin-Wu ficam fascinados no lugar disso. Vontade evita e concede imunidade por um dia."
      },
      {
        "name": "Magias",
        "timing": null,
        "text": "Como um clérigo de 6º nível (CD 20)."
      },
      {
        "name": "Arma Mágica",
        "timing": "padrão",
        "text": "Até o fim da cena, uma arma adjacente se torna mágica, fornecendo +1 nos testes de ataque e rolagens de dano, e causando +1d6 pontos de dano de eletricidade.",
        "cost": "5 PM"
      },
      {
        "name": "Bênção",
        "timing": "padrão",
        "text": "Aliados em alcance curto recebem +2 em testes de ataque e rolagens de dano até o fim da cena.",
        "cost": "3 PM"
      },
      {
        "name": "Curar Ferimentos",
        "timing": "padrão",
        "text": "Uma criatura adjacente cura 6d8+6 PV.",
        "cost": "5 PM"
      },
      {
        "name": "Oração",
        "timing": "padrão",
        "text": "O aspecto e seus aliados em alcance curto recebem +2 em testes de perícias e rolagens de dano, e todos os inimigos em alcance curto recebem –2 em testes de perícias e rolagens de dano.",
        "cost": "3 PM, sustentada"
      },
      {
        "name": "Orientação",
        "timing": "padrão",
        "text": "Uma criatura em alcance curto pode rolar dois dados e ficar com o melhor resultado no próximo teste de perícia que fizer.",
        "cost": "1 PM"
      }
    ],
    "equipment": null,
    "treasure": "Nenhum.",
    "skillsText": "Conhecimento +10, Diplomacia +11, Intuição +12, Misticismo +10, Religião +12.",
    "role": "solo",
    "roleSource": "pdf-review"
  },
  {
    "id": "aspecto-de-marah",
    "name": "Aspecto de Marah",
    "type": "spirit",
    "subtype": "aggelus",
    "size": "Médio",
    "challengeRating": 4,
    "source": {
      "book": "Deuses de Arton",
      "edition": "1ª edição, maio de 2025 (v1.1)",
      "pdfFile": "T20 Deuses de Arton.pdf",
      "bookPage": 271,
      "pdfPage": 273,
      "bookPageEnd": 272,
      "pdfPageEnd": 274
    },
    "stats": {
      "initiative": 6,
      "perception": 13,
      "defense": 21,
      "fortitude": 5,
      "reflex": 12,
      "will": 17,
      "hitPoints": 132,
      "speedText": "9m (6q)",
      "senses": "visão no escuro",
      "defensesText": "evasão",
      "attributes": {
        "str": 0,
        "dex": 2,
        "con": 1,
        "int": 2,
        "wis": 3,
        "cha": 5
      },
      "manaPoints": 25
    },
    "actions": [],
    "abilities": [
      {
        "name": "Aura de Marah",
        "timing": null,
        "text": "O aspecto de Marah emana uma aura de calmaria de 9m de raio. Criaturas nessa área sofrem –5 em testes de ataque e em rolagens de dano."
      },
      {
        "name": "Eclético",
        "timing": "reação",
        "text": "Quando vai fazer um teste de perícia, o aspecto recebe os benefícios de ser treinado nessa perícia para esse teste.",
        "cost": "1 PM"
      },
      {
        "name": "Presença Divina",
        "timing": null,
        "text": "No início de seu turno, cada personagem em alcance curto do aspecto deve fazer um teste de Reflexos (CD 20). Se passar, desvia o olhar. Se falhar, fica fascinado. Se já estiver fascinado, fica enfeitiçado. Um personagem pode fechar os olhos como uma reação para ficar imune a esta habilidade, mas sofrerá os efeitos de estar cego por uma rodada."
      },
      {
        "name": "Magias",
        "timing": null,
        "text": "Como uma barda de 5º nível (CD 22). O custo de Luz é reduzido em –1 PM (já contabilizado)."
      },
      {
        "name": "Criar Ilusão",
        "timing": "padrão",
        "text": "O aspecto pode criar ilusões com imagens e sons combinados em alcance médio. As ilusões podem ocupar até 6 cubos de 1,5m e também podem criar sensações táteis, como texturas. Criaturas que não saibam que essas são ilusões não conseguem atravessá-las. As ilusões ainda são incapazes de causar e sofrer dano (Von desacredita e permite atravessar as ilusões).",
        "cost": "5 PM"
      },
      {
        "name": "Curar Ferimentos",
        "timing": "padrão",
        "text": "Uma criatura adjacente cura 5d8+5 PV.",
        "cost": "4 PM"
      },
      {
        "name": "Luz",
        "timing": "padrão",
        "text": "Uma criatura adjacente é envolta por um halo de luz e recebe +10 em testes de Diplomacia e redução de trevas 10 até o fim da cena.",
        "cost": "5 PM"
      },
      {
        "name": "Tranquilidade",
        "timing": "padrão",
        "text": "Até três criaturas em alcance curto têm sua atitude mudada para indiferente e não podem atacar ou realizar qualquer ação hostil (Von reduz para penalidade de –2 em testes de ataque) até o fim da cena. Ações hostis contra um alvo dissipam a magia.",
        "cost": "4 PM"
      }
    ],
    "equipment": "Camisa bufante aprimorada, capa esvoaçante aprimorada, instrumento musical (varia por aspecto) aprimorado, sapatos de camurça aprimorados.",
    "treasure": "Padrão.",
    "skillsText": "Acrobacia +12, Atuação +16, Conhecimento +6, Diplomacia +13, Enganação +11, Intuição +9, Misticismo +6.",
    "role": "solo",
    "roleSource": "pdf-review"
  },
  {
    "id": "aspecto-de-valkaria",
    "name": "Aspecto de Valkaria",
    "type": "humanoid",
    "subtype": "humana",
    "size": "Média",
    "challengeRating": 5,
    "source": {
      "book": "Deuses de Arton",
      "edition": "1ª edição, maio de 2025 (v1.1)",
      "pdfFile": "T20 Deuses de Arton.pdf",
      "bookPage": 273,
      "pdfPage": 275
    },
    "stats": {
      "initiative": 12,
      "perception": 4,
      "defense": 24,
      "fortitude": 11,
      "reflex": 17,
      "will": 5,
      "hitPoints": 180,
      "speedText": "12m (8q), sem redução por terreno difícil",
      "senses": null,
      "defensesText": "evasão, imunidade a efeitos de movimento e medo, redução de dano 5, resistência a magia +2",
      "attributes": {
        "str": 2,
        "dex": 6,
        "con": 4,
        "int": 2,
        "wis": 0,
        "cha": 3
      }
    },
    "actions": [
      {
        "name": "Corpo a Corpo",
        "text": "Florete x2 +18 (1d6+8, 15/x3)."
      }
    ],
    "abilities": [
      {
        "name": "Almejar o Impossível",
        "timing": null,
        "text": "Quando o aspecto de Valkaria faz um teste de perícia, um resultado de 19 ou mais no dado sempre é um sucesso, não importando o valor a ser alcançado."
      },
      {
        "name": "Arrumar Encrenca",
        "timing": null,
        "text": "O aspecto pode passar por espaços ocupados por inimigos sem redução em seu deslocamento e sem necessidade de testes de Acrobacia."
      },
      {
        "name": "Bloqueio Contundente",
        "timing": "reação",
        "text": "Uma vez por rodada, quando é atingido por um ataque corpo a corpo, o aspecto pode fazer um teste de ataque. Se o resultado do teste for maior que o do oponente, evita o ataque e causa 2d6 pontos de dano de perfuração a ele."
      },
      {
        "name": "Esgrima Acrobática",
        "timing": "movimento",
        "text": "O aspecto percorre até metade de seu deslocamento e, até o final do turno, recebe +5 em testes de ataque, em rolagens de dano e na margem de ameaça."
      },
      {
        "name": "Estocada Oportunista",
        "timing": "livre",
        "text": "Uma vez por rodada, quando passa por um espaço ocupado por um inimigo, o aspecto pode fazer um ataque corpo a corpo contra ele."
      }
    ],
    "equipment": "Couraça sob medida, florete certeiro preciso, sapato de camurça aprimorado.",
    "treasure": "Nenhum.",
    "skillsText": "Acrobacia +12, Atletismo +8.",
    "role": "solo",
    "roleSource": "pdf-review"
  }
].map(withInvocation);
