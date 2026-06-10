const screenshotSource = {
  book: "Ameaças de Arton",
  pdfFile: "prints enviados pelo usuário",
  pdfPage: null,
  bookPage: null
};

function creature(data) {
  return {
    roleSource: "screenshot-review",
    source: screenshotSource,
    ...data
  };
}

export const ameacasArtonSupplementalConstructCreatures = [
  creature({
    id: "golem-de-nor-medio",
    name: "Golem de Nor Médio",
    type: "construct",
    subtype: "nor",
    size: "Médio",
    challengeRating: 1,
    role: "solo",
    stats: {
      initiative: 3,
      perception: 6,
      defense: 17,
      fortitude: 11,
      reflex: -1,
      will: 5,
      hitPoints: 35,
      speedText: "6m (4q)",
      senses: "visão no escuro",
      defensesText: "imunidade a frio, redução de fogo 10",
      attributes: { str: 3, dex: 0, con: 3, int: null, wis: 0, cha: -5 }
    },
    actions: [
      {
        name: "Espada longa +9",
        text: "Corpo a Corpo Espada longa +9 (1d8+9, 19).",
        bonus: 9
      },
      {
        name: "Aura Congelante",
        text: "Aura Congelante (Padrão) Uma vez por cena, o golem de Nor recebe 25 PV temporários. Se uma criatura acertar um ataque corpo a corpo contra o golem enquanto ele tem estes PV temporários, fica enredada (Fort CD 14 evita)."
      }
    ],
    equipment: "Escudo pesado, espada longa.",
    treasure: "Nenhum."
  }),
  creature({
    id: "gargula-assassina",
    name: "Gárgula Assassina",
    type: "construct",
    size: "Médio",
    challengeRating: 4,
    role: "solo",
    stats: {
      initiative: 6,
      perception: 5,
      defense: 25,
      fortitude: 16,
      reflex: 10,
      will: 4,
      hitPoints: 140,
      speedText: "12m (8q), voo 18m (12q)",
      senses: "visão no escuro",
      defensesText: "imunidade a petrificado, redução de dano 5",
      attributes: { str: 6, dex: 2, con: 4, int: -2, wis: 1, cha: -2 }
    },
    actions: [
      {
        name: "Duas garras +17",
        text: "Corpo a Corpo Duas garras +17 (2d6+10).",
        bonus: 17
      },
      {
        name: "Ataque Furtivo",
        text: "Ataque Furtivo +2d6."
      },
      {
        name: "Imobilidade",
        text: "Imobilidade Uma gárgula pode permanecer completamente imóvel. Se ela estiver assim, um personagem deve passar num teste de Percepção (CD 35) para perceber que ela é uma criatura e não uma estátua."
      }
    ],
    treasure: "Padrão."
  }),
  creature({
    id: "golem-de-carne",
    name: "Golem de Carne",
    type: "construct",
    size: "Grande",
    challengeRating: 7,
    role: "solo",
    stats: {
      initiative: 6,
      perception: 7,
      defense: 31,
      fortitude: 18,
      reflex: 6,
      will: 14,
      hitPoints: 300,
      speedText: "9m (6q)",
      senses: "visão no escuro",
      defensesText: "imunidade a metamorfose e trevas, redução de dano 5",
      attributes: { str: 5, dex: -1, con: 4, int: null, wis: 0, cha: -5 }
    },
    actions: [
      {
        name: "Duas pancadas +25",
        text: "Corpo a Corpo Duas pancadas +25 (2d10+18).",
        bonus: 25
      },
      {
        name: "Fúria Homicida",
        text: "Fúria Homicida Se estiver com a metade de seus PV, o golem de carne entra em um estado de fúria homicida. Ele recebe +4 em testes de ataque e rolagens de dano e, quando causa dano, deixa a vítima sangrando. Entretanto, sempre deve atacar a criatura mais próxima."
      },
      {
        name: "Imunidade a Magia",
        text: "Imunidade a Magia O golem é imune a efeitos mágicos, com as seguintes exceções. Magias de fogo e frio deixam o golem lento por 1d6 rodadas. Efeitos mágicos de eletricidade removem a condição lento e curam PV em quantidade igual à metade do dano que causariam."
      }
    ],
    treasure: "Nenhum."
  }),
  creature({
    id: "soldado-mecanico",
    name: "Soldado Mecânico",
    type: "construct",
    size: "Médio",
    challengeRating: 3,
    role: "minion",
    stats: {
      initiative: 2,
      perception: 5,
      defense: 20,
      fortitude: 14,
      reflex: 9,
      will: 4,
      hitPoints: 23,
      speedText: "6m (4q)",
      senses: "visão no escuro",
      defensesText: "imunidade a fogo",
      attributes: { str: 4, dex: -1, con: 3, int: null, wis: 0, cha: -5 }
    },
    actions: [
      {
        name: "Lança x2 +16",
        text: "Corpo a Corpo Lança x2 +16 (1d8+8).",
        bonus: 16
      },
      {
        name: "Besta pesada +11",
        text: "À Distância Besta pesada +11 (1d12+10, 19).",
        bonus: 11
      },
      {
        name: "Sopro",
        text: "Sopro (Padrão) O soldado sopra uma nuvem de vapor escaldante em um cone de 6m. Criaturas na área sofrem 4d6 pontos de dano de fogo (Ref CD 17 reduz à metade). Recarga (movimento)."
      },
      {
        name: "Movido a Vapor",
        text: "Movido a Vapor Se o soldado fosse sofrer dano de fogo, em vez disso seu deslocamento aumenta em 3m por 1 rodada. Se ele sofrer dano de frio, fica lento por 1 rodada."
      }
    ],
    equipment: "Besta pesada, lança, virotes x20.",
    treasure: "Pilha de sucata (vale T$ 100 para fabricar engenhocas)."
  }),
  creature({
    id: "espada-da-floresta",
    name: "Espada-da-Floresta",
    type: "construct",
    size: "Médio",
    challengeRating: 3,
    role: "solo",
    stats: {
      initiative: 8,
      perception: 7,
      defense: 22,
      fortitude: 8,
      reflex: 11,
      will: 8,
      hitPoints: 108,
      speedText: "9m (6q)",
      senses: "visão no escuro",
      defensesText: "natureza vegetal, vulnerabilidade a fogo",
      attributes: { str: 6, dex: 3, con: 4, int: -2, wis: 2, cha: 0 }
    },
    actions: [
      {
        name: "Espada espinhenta +14",
        text: "Corpo a Corpo Espada espinhenta +14 (1d12+15 corte, 19).",
        bonus: 14
      },
      {
        name: "Adaptado ao Ambiente",
        text: "Adaptado ao Ambiente Quando em florestas, o espada-da-floresta recebe camuflagem leve contra ataques à distância e ignora terreno difícil natural."
      },
      {
        name: "Dínamo Vegetal",
        text: "Dínamo Vegetal Quando sofre dano de eletricidade, em vez disso o espada-da-floresta cura PV em quantidade igual a metade do dano que seria causado."
      },
      {
        name: "Riposte Natural",
        text: "Riposte Natural (Reação) Uma vez por rodada, quando é alvo de um ataque corpo a corpo, o espada-da-floresta pode fazer um teste de ataque e subtrair seu resultado do dano causado pelo ataque."
      }
    ],
    skillsText: "Perícias Furtividade +4 (+9 em florestas).",
    treasure: "Espada espinhenta (CD 18 para extrair) e 50% de chance de 1d4 frutos da espada-mãe (CD 18 para extrair)."
  }),
  creature({
    id: "galhada-macho",
    name: "Galhada Macho",
    type: "construct",
    size: "Grande",
    challengeRating: 2,
    role: "minion",
    stats: {
      initiative: 4,
      perception: 7,
      defense: 19,
      fortitude: 4,
      reflex: 11,
      will: 7,
      hitPoints: 17,
      speedText: "12m (8q)",
      senses: "visão no escuro",
      defensesText: "natureza vegetal, redução de dano 2, resistência a magia +2, vulnerabilidade a fogo",
      attributes: { str: 2, dex: 3, con: 1, int: -4, wis: 1, cha: 0 }
    },
    actions: [
      {
        name: "Chifres e cascos +12",
        text: "Corpo a Corpo Chifres +12 (1d6+7) e cascos +12 (1d6+7).",
        bonus: 12
      },
      {
        name: "Galhada de Allihanna",
        text: "Galhada de Allihanna Os chifres do galhada macho são abençoados por Allihanna; eles são armas mágicas que causam o dobro de dano contra mortos-vivos."
      },
      {
        name: "Parceiro",
        text: "Parceiro O galhada macho é um parceiro montaria (Grande). Iniciante: seu deslocamento muda para 12m e você recebe +2 em Sobrevivência. Veterano: seus ataques corpo a corpo são considerados mágicos e, uma vez por turno, você recebe +1d8 em uma rolagem de dano corpo a corpo; esse bônus é dobrado contra mortos-vivos. Mestre: o bônus em rolagens de dano muda para +1d10 e você recebe uma ação de movimento extra por turno, apenas para se deslocar."
      }
    ],
    treasure: "Galhada abençoada (CD 17 para extrair, vale T$ 50 para fabricar um dedo de ente ou uma arma de perfuração superior)."
  }),
  creature({
    id: "galhada-femea",
    name: "Galhada Fêmea",
    type: "construct",
    size: "Grande",
    challengeRating: 2,
    role: "minion",
    stats: {
      initiative: 4,
      perception: 7,
      defense: 19,
      fortitude: 4,
      reflex: 11,
      will: 7,
      hitPoints: 17,
      speedText: "12m (8q)",
      senses: "visão no escuro",
      defensesText: "natureza vegetal, redução de dano 2, resistência a magia +2, vulnerabilidade a fogo",
      attributes: { str: 2, dex: 3, con: 1, int: -4, wis: 1, cha: 0 }
    },
    actions: [
      {
        name: "Cascos +14",
        text: "Corpo a Corpo Cascos +14 (2d6+10).",
        bonus: 14
      },
      {
        name: "Parceiro",
        text: "Parceiro A galhada fêmea é um parceiro montaria (Grande). Iniciante: seu deslocamento muda para 12m e você pode gastar uma ação padrão e 1 PM para curar 1d8+1 PV. Veterano: você também pode gastar uma ação padrão e 3 PM para curar 3d8+3 PV ou remover uma condição de doença, fadiga, paralisia ou veneno que o esteja afetando. Mestre: você recebe uma ação de movimento extra por turno, apenas para se deslocar, e pode também gastar uma ação padrão e 5 PM para curar 6d8+6 PV."
      }
    ],
    treasure: "1d4 doses de seiva-galhada (CD 17 para extrair; cada dose conta como um bálsamo restaurador). Como alternativa, se a galhada tiver uma atitude indiferente ou melhor, um personagem pode usar uma ação completa para fazer um teste de Adestramento (CD 16) com ela. Se passar, consegue extrair a seiva de forma amistosa. A galhada produz seiva apenas uma vez por dia."
  })
];

export const ameacasArtonSupplementalSpiritCreatures = [
  creature({
    id: "stagh",
    name: "Stagh",
    type: "spirit",
    subtype: "elemental",
    size: "Pequeno",
    challengeRating: 3,
    role: "minion",
    stats: {
      initiative: 6,
      perception: 4,
      defense: 22,
      fortitude: 7,
      reflex: 12,
      will: 4,
      hitPoints: 35,
      speedText: "9m (6q), escalada 9m (6q)",
      senses: "visão no escuro",
      defensesText: "imunidade a acertos críticos, atordoado, cansaço, efeitos de metabolismo, frio e paralisia, vulnerabilidade a fogo",
      attributes: { str: 2, dex: 3, con: 3, int: -4, wis: 1, cha: -1 }
    },
    actions: [
      {
        name: "Duas garras +16",
        text: "Corpo a Corpo Duas garras +16 (1d6+4 mais 1d6 frio).",
        bonus: 16
      },
      {
        name: "Aura de Frio",
        text: "Aura de Frio No início de cada turno do stagh, todas as criaturas em um raio de 9m sofrem 1d6+3 pontos de dano de frio (Fort CD 17 reduz à metade)."
      },
      {
        name: "Familiar",
        text: "Familiar Um stagh concede +1 na CD de suas magias de frio."
      }
    ],
    treasure: "1 dose de éter elemental (frio) (CD 18 para extrair)."
  })
];

export const ameacasArtonSupplementalUndeadCreatures = [
  creature({
    id: "soterrado-vagante",
    name: "Soterrado Vagante",
    type: "undead",
    size: "Médio",
    challengeRating: 2,
    role: "minion",
    stats: {
      initiative: 2,
      perception: 3,
      defense: 20,
      fortitude: 1,
      reflex: 5,
      will: 10,
      hitPoints: 21,
      speedText: "6m (4q)",
      senses: "visão no escuro",
      defensesText: "redução de corte e perfuração 5, redução de frio 10",
      attributes: { str: 5, dex: -1, con: 0, int: null, wis: 2, cha: -1 }
    },
    actions: [
      {
        name: "Dois punhos +14",
        text: "Corpo a Corpo Dois punhos +14 (2d6+6 mais 2 frio).",
        bonus: 14
      },
      {
        name: "Agarrar Aprimorado",
        text: "Agarrar Aprimorado (Livre) Punho (teste +16)."
      },
      {
        name: "Constrição Congelante",
        text: "Constrição Congelante (Padrão) No início de cada um de seus turnos, o soterrado vagante causa 4d6 pontos de dano de frio em cada criatura que estiver agarrando. Esse dano aumenta em +1d6 para cada rodada consecutiva que o soterrado estiver agarrando essa criatura."
      },
      {
        name: "Esquife de Gelo",
        text: "Esquife de Gelo O soterrado sofre 1 ponto de dano adicional por dado de dano de fogo."
      }
    ],
    skillsText: "Perícias Furtividade +2 (+7 em terrenos nevados).",
    treasure: "Nenhum."
  }),
  creature({
    id: "carnical",
    name: "Carniçal",
    type: "undead",
    size: "Médio",
    challengeRating: 1,
    role: "solo",
    stats: {
      initiative: 6,
      perception: 1,
      defense: 15,
      fortitude: 1,
      reflex: 5,
      will: 10,
      hitPoints: 33,
      speedText: "9m (6q)",
      senses: "faro, visão no escuro",
      attributes: { str: 2, dex: 3, con: 0, int: -2, wis: 1, cha: 0 }
    },
    actions: [
      {
        name: "Mordida e garras +9",
        text: "Corpo a Corpo Mordida +9 (1d6+3 mais doença) e duas garras +9 (1d4+3).",
        bonus: 9
      },
      {
        name: "Doença",
        text: "Doença Uma criatura mordida por um carniçal é exposta à doença febre do carniçal (veja a página 359)."
      },
      {
        name: "Paralisia",
        text: "Paralisia Uma criatura atingida pela mordida do carniçal fica paralisada por 1d4 rodadas (Fort CD 16 evita e a criatura não pode mais ser paralisada por esta habilidade até o fim da cena)."
      }
    ],
    skillsText: "Perícias Atletismo +6, Furtividade +7.",
    treasure: "Nenhum."
  }),
  creature({
    id: "lacedon",
    name: "Lacedon",
    type: "undead",
    size: "Médio",
    challengeRating: 2,
    role: "solo",
    stats: {
      initiative: 6,
      perception: 2,
      defense: 18,
      fortitude: 3,
      reflex: 7,
      will: 12,
      hitPoints: 65,
      speedText: "9m (6q), natação 9m (6q)",
      senses: "faro, visão no escuro",
      attributes: { str: 2, dex: 3, con: 0, int: -2, wis: 1, cha: 0 }
    },
    actions: [
      {
        name: "Mordida e garras +12",
        text: "Corpo a Corpo Mordida +12 (1d6+4 mais doença) e duas garras +12 (1d4+4).",
        bonus: 12
      },
      {
        name: "Doença",
        text: "Doença Uma criatura mordida por um lacedon é exposta à doença febre do carniçal (veja a página 359)."
      },
      {
        name: "Lamento dos Afogados",
        text: "Lamento dos Afogados (Reação) Quando morre, o lacedon emite um último lamento. Criaturas em alcance médio perdem 1 PM (Von CD 17 evita)."
      },
      {
        name: "Paralisia",
        text: "Paralisia Uma criatura atingida pela mordida do lacedon fica paralisada por 1d4 rodadas (Fort CD 17 evita e a criatura não pode mais ser paralisada por esta habilidade até o fim da cena)."
      }
    ],
    skillsText: "Perícias Atletismo +7, Furtividade +8.",
    treasure: "Nenhum."
  }),
  creature({
    id: "ogro-esqueleto",
    name: "Ogro Esqueleto",
    type: "undead",
    size: "Grande",
    challengeRating: 3,
    role: "solo",
    stats: {
      initiative: 3,
      perception: 0,
      defense: 19,
      fortitude: 15,
      reflex: 3,
      will: 4,
      hitPoints: 99,
      speedText: "9m (6q)",
      senses: "visão no escuro",
      defensesText: "redução de corte, frio e perfuração 5",
      attributes: { str: 4, dex: 1, con: 3, int: null, wis: -1, cha: -1 }
    },
    actions: [
      {
        name: "Tacape +14",
        text: "Corpo a Corpo Tacape +14 (1d12+15).",
        bonus: 14
      },
      {
        name: "Morto Demais...",
        text: "Morto Demais... (Movimento) Uma vez por cena, se for desarmado, o ogro esqueleto retira um de seus próprios ossos para utilizar de arma, com as mesmas estatísticas de seu tacape."
      },
      {
        name: "...Para Morrer Novamente!",
        text: "...Para Morrer Novamente! Todo dano de corte, frio e perfuração que o ogro sofre é reduzido à metade (antes de aplicar a redução de dano)."
      }
    ],
    equipment: "Tacape aumentado.",
    treasure: "Nenhum."
  }),
  creature({
    id: "urso-pardo-esqueleto",
    name: "Urso Pardo Esqueleto",
    type: "undead",
    size: "Grande",
    challengeRating: 4,
    role: "solo",
    stats: {
      initiative: 4,
      perception: 3,
      defense: 20,
      fortitude: 4,
      reflex: 16,
      will: 10,
      hitPoints: 180,
      speedText: "9m (6q)",
      senses: "visão no escuro",
      defensesText: "redução de corte, frio e perfuração 5",
      attributes: { str: 5, dex: -1, con: 4, int: -4, wis: -1, cha: -3 }
    },
    actions: [
      {
        name: "Mordida e garras +15",
        text: "Corpo a Corpo Mordida +15 (1d8+4) e duas garras +15 (1d6+4).",
        bonus: 15
      },
      {
        name: "Agarrar Aprimorado",
        text: "Agarrar Aprimorado (Livre) Mordida (teste +17)."
      },
      {
        name: "Garras Destruidoras",
        text: "Garras Destruidoras Quando causa dano com suas garras, o urso pardo esqueleto pode rolar novamente qualquer resultado 1 ou 2 na rolagem de dano."
      },
      {
        name: "Ossos Pontiagudos",
        text: "Ossos Pontiagudos No início de cada um de seus turnos, o urso causa 2d6+7 pontos de dano de perfuração em uma criatura Média ou menor que esteja agarrando. Se a criatura sofrer dano desta forma, ela fica sangrando (Fort CD 18 evita o sangramento)."
      }
    ],
    skillsText: "Perícias Atletismo +9.",
    treasure: "Nenhum."
  }),
  creature({
    id: "gigante-esqueleto",
    name: "Gigante Esqueleto",
    type: "undead",
    size: "Enorme",
    challengeRating: 5,
    role: "solo",
    stats: {
      initiative: 4,
      perception: 4,
      defense: 24,
      fortitude: 17,
      reflex: 5,
      will: 11,
      hitPoints: 210,
      speedText: "12m (8q)",
      senses: "visão no escuro",
      defensesText: "redução de corte, frio e perfuração 5",
      attributes: { str: 6, dex: -1, con: 4, int: -2, wis: 0, cha: -1 }
    },
    actions: [
      {
        name: "Tacape x2 +17",
        text: "Corpo a Corpo Tacape x2 +17 (2d6+14, x3).",
        bonus: 17
      },
      {
        name: "Arremessar Rochas",
        text: "Arremessar Rochas (Completa) O gigante esqueleto arremessa rochas em um quadrado de 3m em alcance curto. Criaturas nessa área sofrem 2d6+14 pontos de dano de impacto (Ref CD 20 reduz à metade)."
      },
      {
        name: "Monte de Ossos",
        text: "Monte de Ossos Quando sofre um acerto crítico, o gigante se desfaz em uma pilha de ossos. Ele fica caído e vulnerável, falha automaticamente em testes de Reflexos e precisa gastar uma ação de movimento para se remontar e encerrar estes efeitos."
      }
    ],
    equipment: "Tacape aumentado.",
    treasure: "Nenhum."
  }),
  creature({
    id: "fantasma",
    name: "Fantasma",
    type: "undead",
    size: "Médio",
    challengeRating: 7,
    role: "special",
    stats: {
      initiative: 10,
      perception: 9,
      defense: 29,
      fortitude: 7,
      reflex: 14,
      will: 20,
      hitPoints: 190,
      speedText: "voo 12m (8q)",
      senses: "visão no escuro",
      defensesText: "incorpóreo",
      attributes: { str: null, dex: 3, con: 0, int: 1, wis: 2, cha: 4 }
    },
    actions: [
      {
        name: "Toque drenante +23",
        text: "Corpo a Corpo Toque drenante +23 (6d8+20 trevas).",
        bonus: 23
      },
      {
        name: "Assustar",
        text: "Assustar (Livre) O fantasma se revela subitamente, saindo de um esconderijo ou de dentro de um objeto, como um armário ou parede. Ele só pode usar esta habilidade se estiver escondido, e apenas uma vez por cena. Cada criatura em alcance curto capaz de ver o fantasma fica abalada (Von CD 24 evita). Se falhar no teste de Vontade por 5 ou mais, a criatura fica apavorada, e se falhar por 10 ou mais, também envelhece 2d4 anos. Medo."
      },
      {
        name: "Drenar Vida",
        text: "Drenar Vida Uma criatura atingida pelo toque drenante do fantasma tem seus PV máximos reduzidos em 10 por 1 dia, cumulativamente (Fort CD 24 evita). Caso os PV máximos da criatura sejam reduzidos a 0 desta forma, ela fica inconsciente até que eles sejam restabelecidos."
      },
      {
        name: "Memento",
        text: "Memento Um fantasma reduzido a 0 PV desaparece e ressurge 1d4 dias depois. Para derrotá-lo permanentemente é necessário confrontá-lo com aquilo que ainda o prende a este mundo. Quando isso acontece, o fantasma pode ser destruído normalmente."
      }
    ],
    skillsText: "Perícias Furtividade +15, Intimidação +13.",
    treasure: "Nenhum."
  }),
  creature({
    id: "garra-zumbi",
    name: "Garra-Zumbi",
    type: "undead",
    size: "Minúsculo",
    challengeRating: 0.25,
    role: "minion",
    stats: {
      initiative: 4,
      perception: 1,
      defense: 10,
      fortitude: 0,
      reflex: 2,
      will: -1,
      hitPoints: 5,
      speedText: "6m (4q), voo 9m (6q)",
      senses: "percepção às cegas",
      defensesText: "imunidade a efeitos de sentidos",
      attributes: { str: 1, dex: 2, con: 1, int: null, wis: -1, cha: null }
    },
    actions: [
      {
        name: "Pancada +7",
        text: "Corpo a Corpo Pancada +7 (1d6+5).",
        bonus: 7
      },
      {
        name: "Agarrar Aprimorado",
        text: "Agarrar Aprimorado (Livre) Pancada (criatura Média ou menor, teste +12)."
      },
      {
        name: "Estrangular",
        text: "Estrangular (Livre) No início de cada um de seus turnos, a garra-zumbi causa 2d6+2 pontos de dano de impacto na criatura que estiver agarrando. Uma criatura agarrada desta forma não pode falar."
      }
    ],
    skillsText: "Perícias Furtividade +11.",
    treasure: "Nenhum."
  }),
  creature({
    id: "garra-zumbi-ogro",
    name: "Garra-Zumbi Ogro",
    type: "undead",
    size: "Médio",
    challengeRating: 2,
    role: "minion",
    stats: {
      initiative: 4,
      perception: -3,
      defense: 16,
      fortitude: 0,
      reflex: 2,
      will: -3,
      hitPoints: 35,
      speedText: "9m (6q), voo 12m (8q)",
      senses: "percepção às cegas",
      defensesText: "imunidade a efeitos de sentidos",
      attributes: { str: 5, dex: 1, con: 3, int: null, wis: -3, cha: null }
    },
    actions: [
      {
        name: "Pancada +14",
        text: "Corpo a Corpo Pancada +14 (2d6+10).",
        bonus: 14
      },
      {
        name: "Agarrar Aprimorado",
        text: "Agarrar Aprimorado (Livre) Pancada (criatura Grande ou menor, teste +19)."
      },
      {
        name: "Forte Demais...",
        text: "Forte Demais... (Livre) No início de cada um de seus turnos, a garra-zumbi ogro causa 4d6+10 pontos de dano de impacto na criatura que estiver agarrando. Uma criatura agarrada desta forma não pode falar."
      },
      {
        name: "...Para Morrer de Novo!",
        text: "...Para Morrer de Novo! Todo dano de corte, impacto e perfuração que a garra-zumbi sofre é reduzido à metade."
      }
    ],
    treasure: "Nenhum."
  }),
  creature({
    id: "garra-zumbi-enxame",
    name: "Garra-Zumbi Enxame",
    type: "undead",
    tags: ["enxame"],
    size: "Grande",
    challengeRating: 3,
    role: "minion",
    stats: {
      initiative: 6,
      perception: 1,
      defense: 19,
      fortitude: 9,
      reflex: 14,
      will: 4,
      hitPoints: 40,
      speedText: "6m (4q), voo 9m (6q)",
      senses: "percepção às cegas",
      defensesText: "imunidade a efeitos de sentidos",
      attributes: { str: 3, dex: 4, con: 3, int: null, wis: -3, cha: null }
    },
    actions: [
      {
        name: "Enxame",
        text: "Enxame 6d6 pontos de dano de impacto (ou 8d6 contra criaturas agarradas)."
      },
      {
        name: "Maré Estranguladora",
        text: "Maré Estranguladora (Livre) No fim do seu turno, o enxame faz uma manobra agarrar contra todas as criaturas em seu espaço (teste +16). Enquanto estiver agarrada dessa forma, uma criatura fica caída e não pode falar."
      }
    ],
    treasure: "Nenhum."
  }),
  creature({
    id: "garra-zumbi-gigante",
    name: "Garra-Zumbi Gigante",
    type: "undead",
    size: "Grande",
    challengeRating: 5,
    role: "solo",
    stats: {
      initiative: 4,
      perception: -3,
      defense: 25,
      fortitude: 17,
      reflex: 11,
      will: 5,
      hitPoints: 200,
      speedText: "9m (6q), voo 12m (8q)",
      senses: "percepção às cegas",
      defensesText: "imunidade a efeitos de sentidos",
      attributes: { str: 8, dex: 0, con: 5, int: null, wis: -3, cha: null }
    },
    actions: [
      {
        name: "Pancada +17",
        text: "Corpo a Corpo Pancada +17 (2d8+18).",
        bonus: 17
      },
      {
        name: "Agarrar Aprimorado",
        text: "Agarrar Aprimorado (Livre) Pancada (criatura Enorme ou menor, teste +24)."
      },
      {
        name: "Estrangular",
        text: "Estrangular (Livre) No início de cada um de seus turnos, a garra-zumbi gigante causa 4d8+12 pontos de dano de impacto na criatura que estiver agarrando. Uma criatura agarrada desta forma não pode falar."
      },
      {
        name: "Mestre de Manobras",
        text: "Mestre de Manobras A garra-zumbi recebe +5 em testes de manobras (já contabilizado)."
      }
    ],
    treasure: "Nenhum."
  })
];

export const ameacasArtonSupplementalCreaturesByType = {
  animal: [],
  construct: ameacasArtonSupplementalConstructCreatures,
  spirit: ameacasArtonSupplementalSpiritCreatures,
  humanoid: [],
  monster: [],
  undead: ameacasArtonSupplementalUndeadCreatures
};

export const ameacasArtonSupplementalCreatureCatalog = Object.values(ameacasArtonSupplementalCreaturesByType).flat();

