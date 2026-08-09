// Encontros finais curados dos andares 1 a 9.
// Especificação completa: ENCONTROS_FINAIS_ANDARES_1_A_9.md.
//
// Mapas preset 14x10 usam um caractere por célula:
//   # parede    . chão       P grupo      E inimigo     H inimigo oculto/em potencial
//   T armadilha X fosso/vão  W teia/casulo D terreno difícil
//   M mecanismo O objetivo   d porta      V vantagem/elevação
//   C obstáculo R entrada de reforço
// Toda cena tem entrada (porta à esquerda, grupo adjacente) e saída do andar.
// Bloqueios cobrem todas as rotas; vantagens elevadas nunca usam parede plena.

export const dungeon1to10FinalEncounters = {
  gimmicksByFloor: {
    1: {
      name: "Primeiros passos",
      detail: "Inimigos começam a 6+ células e o grupo se posiciona livremente no seu lado do mapa antes da iniciativa."
    },
    2: {
      name: "Alarme",
      detail: "Há um sino/corda de alarme na cena. Furtividade CD 13 (um teste do grupo) evita o disparo. Se disparar: inimigos alertas (sem surpresa contra eles, +2 em iniciativa) e o eco aumenta em +1 a CD do próximo teste de exploração. Sem reforços."
    },
    3: {
      name: "Mecanismos",
      detail: "A cena ganha 1 mecanismo sabotável adjacente à armadilha ou porta: Ladinagem ou Ofício CD 15 (ação padrão) desativa a armadilha da cena ou a dispara contra inimigos adjacentes (1 uso)."
    },
    4: {
      name: "Território orc",
      detail: "Humanoides lutam até 0 PV (sem moral, sem fuga). Cenas de negociação ganham a opção de duelo 1x1."
    },
    5: {
      name: "Bandos rivais",
      detail: "Com 2+ humanoides na cena, divida-os em dois bandos rivais: Diplomacia ou Enganação CD 16 (ação padrão, 1 tentativa) faz os bandos se atacarem por 1 rodada antes de mirarem o grupo."
    },
    6: {
      name: "Gosma viva",
      detail: "2 células de gosma (terreno difícil; quem parar nelas: Acrobacia CD 15 ou fica agarrado até gastar movimento). Se o ND da cena estiver abaixo de 2, a partir da 4ª rodada surge 1 Glop (ND 1/4) a cada 2 rodadas, máximo 2."
    },
    7: {
      name: "Primeiras teias",
      detail: "+1 zona de teia no mapa (regras da Rede) e presságio narrativo da Matriarca no texto da cena. Sem criaturas extras."
    },
    8: {
      name: "Caçada silenciosa",
      detail: "Inimigos começam escondidos (Furtividade deles contra Percepção do grupo; surpresa se não detectados); teias cobrem as rotas laterais como terreno difícil."
    },
    9: {
      name: "Véspera do covil",
      detail: "+2 zonas de teia no mapa e, ao resolver a cena, descreva a visão direta do covil como gancho para o andar 10."
    }
  },
  scenesByTier: {
    "floors-1-2": [
      {
        id: "guardiao-relutante",
        title: "Guardião Relutante",
        typeLabel: "Combate com gimmick",
        detail: "O guardião defende a posição de vantagem junto à saída e não persegue além de 2 células da porta; o animal fica 2 células à frente. Ao cair à metade dos PV, ele oferece passagem em troca da vida.",
        treasureNote: "Tesouro padrão pelo ND da cena, adicional aos cristais e equipamentos/tesouros das criaturas.",
        map: [
          "##############",
          "#......#.....#",
          "#......#..V..#",
          "dPP.......E..d",
          "dPP....#..E..d",
          "#......#.....#",
          "#..C.....C...#",
          "#............#",
          "#......#.....#",
          "##############"
        ],
        variants: [
          { floors: [1], challenge: 0.5, creatures: [{ id: "orc-enfraquecido", quantity: 1 }, { id: "rato-gigante", quantity: 1 }], traps: [] },
          { floors: [2], challenge: 0.75, creatures: [{ id: "bandido", quantity: 1 }, { id: "lobo", quantity: 1 }], traps: [] }
        ]
      },
      {
        id: "ninho-na-saida",
        title: "Ninho na Saída",
        typeLabel: "Combate com gimmick",
        detail: "Entulho (terreno difícil) cerca a saída. A cascavel é perigo oculto: Percepção CD 15 ao entrar na área; quem termina movimento adjacente sem a ter notado sofre o bote com surpresa. Sem reforços: o ninho inteiro já está em cena.",
        treasureNote: "Tesouro padrão pelo ND da cena, adicional aos cristais e equipamentos/tesouros das criaturas.",
        variants: [
          {
            floors: [1],
            challenge: 0.5,
            creatures: [{ id: "rato-gigante", quantity: 1 }, { id: "cascavel", quantity: 1 }],
            traps: [],
            map: [
              "##############",
              "#............#",
              "#........DD..#",
              "dPP.....DED..d",
              "dPP.....DHD..d",
              "#.........D..#",
              "#..C.....D...#",
              "#............#",
              "#............#",
              "##############"
            ]
          },
          {
            floors: [2],
            challenge: 1,
            creatures: [{ id: "rato-gigante", quantity: 3 }, { id: "cascavel", quantity: 1 }],
            traps: [],
            map: [
              "##############",
              "#............#",
              "#........DD..#",
              "dPP.....DEDD.d",
              "dPP.....DHED.d",
              "#.........DE.#",
              "#..C.....D...#",
              "#............#",
              "#............#",
              "##############"
            ]
          }
        ]
      },
      {
        id: "corredor-armado",
        title: "Corredor Armado",
        typeLabel: "Combate + armadilha",
        detail: "O arame farpado fecha toda a largura do corredor — não há avanço sem atravessá-lo ou desarmá-lo. Os goblins atiram por cima do arame e só aceitam corpo a corpo depois que alguém cruza.",
        treasureNote: "Tesouro padrão pelo ND da cena, adicional aos cristais e equipamentos/tesouros das criaturas.",
        variants: [
          {
            floors: [1],
            challenge: 0.5,
            creatures: [{ id: "goblin-salteador", quantity: 1 }],
            traps: ["arame-farpado"],
            map: [
              "##############",
              "##############",
              "##############",
              "dPP....T...E.d",
              "dPP....T.....d",
              "#......T.....#",
              "##############",
              "##############",
              "##############",
              "##############"
            ]
          },
          {
            floors: [2],
            challenge: 1,
            creatures: [{ id: "goblin-salteador", quantity: 3 }],
            traps: ["arame-farpado"],
            map: [
              "##############",
              "##############",
              "##############",
              "dPP....T...E.d",
              "dPP....T..E..d",
              "#......T...E.#",
              "##############",
              "##############",
              "##############",
              "##############"
            ]
          }
        ]
      },
      {
        id: "porta-emperrada",
        title: "Porta Emperrada",
        typeLabel: "Obstáculo",
        detail: "Sem criaturas. A saída está travada por entulho e mecanismo emperrado. Resolução: 2 sucessos entre Ladinagem CD 15, Atletismo CD 17 ou Ofício CD 15 (no andar 2, CDs +1). Cada falha derruba detritos: 1d6 de impacto (Reflexos CD 15 evita) em quem trabalha na porta; na 3ª falha acumulada, desabamento parcial: 2d6 em área de 2 células (Reflexos CD 15 reduz à metade).",
        treasureNote: "Tesouro padrão apenas com sucesso — achado no vão atrás da porta.",
        map: [
          "##############",
          "#............#",
          "#.......C....#",
          "dPP.......TM.d",
          "dPP.......TT.d",
          "#............#",
          "#...C...D....#",
          "#......D.....#",
          "#............#",
          "##############"
        ],
        variants: [
          { floors: [1, 2], challenge: 0.5, creatures: [], traps: [] }
        ]
      },
      {
        id: "pedagio-goblin",
        title: "Pedágio Goblin",
        typeLabel: "Negociação",
        detail: "A linha de barricadas fecha a sala; a única passagem é onde os goblins estão. Exigem 2 PO por pessoa, 1 objeto brilhante ou comida de um dia. Diplomacia CD 13 reduz o preço à metade; Enganação CD 15 passa sem pagar; Intimidação CD 13 abre passagem, mas o alerta se espalha (+1 na CD do primeiro teste do próximo andar). Recusa ou violência: combate contra os goblins presentes.",
        treasureNote: "Tesouro padrão apenas se o grupo passar sem pagar (combate ou enganação).",
        variants: [
          {
            floors: [1],
            challenge: 0.5,
            creatures: [{ id: "goblin-salteador", quantity: 2 }],
            traps: [],
            map: [
              "##############",
              "#.......C....#",
              "#.......C....#",
              "dPP.....H....d",
              "dPP.....H....d",
              "#.......C....#",
              "#.......C....#",
              "#.......C....#",
              "#.......C....#",
              "##############"
            ]
          },
          {
            floors: [2],
            challenge: 0.75,
            creatures: [{ id: "goblin-salteador", quantity: 3 }],
            traps: [],
            map: [
              "##############",
              "#.......C....#",
              "#.......C....#",
              "dPP.....H....d",
              "dPP.....H....d",
              "#.......H....#",
              "#.......C....#",
              "#.......C....#",
              "#.......C....#",
              "##############"
            ]
          }
        ]
      }
    ],
    "floors-3-4": [
      {
        id: "posto-de-guarda",
        title: "Posto de Guarda",
        typeLabel: "Combate com gimmick",
        detail: "Os três ocupam o único gargalo entre as salas em formação disciplinada: enquanto o Orc Combatente estiver de pé, nenhum deles pode ser flanqueado nem cede a empurrão. Quando ele cai, os goblins fogem ao chegar à metade dos PV.",
        treasureNote: "Tesouro padrão pelo ND da cena, adicional aos cristais e equipamentos/tesouros das criaturas.",
        map: [
          "##############",
          "#......#.....#",
          "#......#..V..#",
          "dPP....#.....#",
          "dPP....E.....d",
          "#......EE....d",
          "#......#.....#",
          "#......#..C..#",
          "#......#.....#",
          "##############"
        ],
        variants: [
          { floors: [3, 4], challenge: 1, creatures: [{ id: "orc-combatente", quantity: 1 }, { id: "goblin-salteador", quantity: 2 }], traps: [] }
        ]
      },
      {
        id: "torreta-goblin",
        title: "Torreta Goblin",
        typeLabel: "Combate + armadilha",
        detail: "Virote montado como torreta fixa na parede: dispara 1 virote por rodada (1d10+2, Reflexos CD 20) na linha do corredor enquanto houver goblin adjacente à manivela. Ladinagem CD 20 trava a manivela. Um goblin opera, dois defendem; o recuo lateral ao norte sai da linha de tiro.",
        treasureNote: "Tesouro padrão pelo ND da cena, adicional aos cristais e equipamentos/tesouros das criaturas.",
        map: [
          "##############",
          "####.....#####",
          "####.....#####",
          "dPP.......T..#",
          "dPP......MEE.d",
          "#.........E..d",
          "####.....#####",
          "####..C..#####",
          "####.....#####",
          "##############"
        ],
        variants: [
          { floors: [3, 4], challenge: 1, creatures: [{ id: "goblin-salteador", quantity: 3 }], traps: ["virote"] }
        ]
      },
      {
        id: "matilha-na-descida",
        title: "Matilha na Descida",
        typeLabel: "Combate com gimmick",
        detail: "Todos começam ocultos nas alcovas: Furtividade deles contra Percepção do grupo; surpresa na 1ª rodada se não detectados. Focam o personagem mais isolado.",
        treasureNote: "Tesouro padrão pelo ND da cena, adicional aos cristais e equipamentos/tesouros das criaturas.",
        variants: [
          {
            floors: [3],
            challenge: 1,
            creatures: [{ id: "goblin-salteador", quantity: 4 }],
            traps: [],
            map: [
              "##############",
              "#...#....#...#",
              "#...#.H..#.H.#",
              "dPP..........d",
              "dPP..........d",
              "#...#.H..#.H.#",
              "#...#..C.#...#",
              "#...#....#...#",
              "#............#",
              "##############"
            ]
          },
          {
            floors: [4],
            challenge: 1,
            creatures: [{ id: "lobo", quantity: 2 }],
            traps: [],
            map: [
              "##############",
              "#...#....#...#",
              "#...#.H..#...#",
              "dPP..........d",
              "dPP..........d",
              "#...#....#.H.#",
              "#...#..C.#...#",
              "#...#....#...#",
              "#............#",
              "##############"
            ]
          },
          {
            floors: [4],
            challenge: 1,
            creatures: [{ id: "gorlogg", quantity: 1 }],
            traps: [],
            map: [
              "##############",
              "#...#....#...#",
              "#...#....#...#",
              "dPP..........d",
              "dPP..........d",
              "#...#....#.H.#",
              "#...#..C.#...#",
              "#...#....#...#",
              "#............#",
              "##############"
            ]
          }
        ]
      },
      {
        id: "fosso-do-vigia",
        title: "Fosso do Vigia",
        typeLabel: "Combate + armadilha",
        detail: "O fosso camuflado cobre toda a largura da passagem — não há contorno. Atravessar exige saltar (Atletismo CD 20), descer e escalar pelo fundo (2 movimentos + Atletismo CD 20) ou travar a tampa (Ladinagem CD 20). Os vigias ficam na plataforma elevada com visão livre sobre o fosso (mureta como cobertura) e atiram em quem estiver na travessia.",
        treasureNote: "Tesouro padrão pelo ND da cena, adicional aos cristais e equipamentos/tesouros das criaturas.",
        map: [
          "##############",
          "#.......XX.VE#",
          "#.......XX.VE#",
          "dPP.....XX...d",
          "dPP.....XX...d",
          "#.......XX...#",
          "#.......XX...#",
          "#.......XX...#",
          "#.......XX...#",
          "##############"
        ],
        variants: [
          { floors: [3, 4], challenge: 1, creatures: [{ id: "goblin-salteador", quantity: 2 }], traps: ["fosso-profundo"] }
        ]
      },
      {
        id: "tributo-ao-chefe",
        title: "Tributo ao Chefe",
        typeLabel: "Negociação",
        detail: "O campeão orc exige 20 PO ou 1 arma do grupo. Diplomacia CD 15 reduz à metade; Intimidação CD 15 força recuo ressentido (passagem livre, sem tesouro). Duelo 1x1 contra o campeão: vitória dá passagem e o tesouro como tributo invertido; derrota custa o dobro, mas o grupo passa. Recusa: combate contra os três, todos já em cena.",
        treasureNote: "Tesouro padrão apenas via combate vencido ou duelo vencido.",
        map: [
          "##############",
          "#............#",
          "#........H...#",
          "dPP.....H....d",
          "dPP......H...d",
          "#..C......C..#",
          "#............#",
          "#............#",
          "#............#",
          "##############"
        ],
        variants: [
          { floors: [3, 4], challenge: 1, creatures: [{ id: "orc-combatente", quantity: 1 }, { id: "orc-enfraquecido", quantity: 2 }], traps: [] }
        ]
      }
    ],
    "floors-5-6": [
      {
        id: "chefe-de-guerra",
        title: "Chefe de Guerra",
        typeLabel: "Combate com gimmick",
        detail: "A muralha interna tem uma única passagem e o Orc Chefe a ocupa em posição de vantagem: só um personagem o ataca por vez em corpo a corpo. Empurrão, manobras ou ataques à distância abrem a luta. A escolta é narrativa e foge na 1ª rodada.",
        treasureNote: "Tesouro padrão pelo ND da cena, adicional aos cristais e equipamentos/tesouros das criaturas.",
        map: [
          "##############",
          "#........##..#",
          "#........##..#",
          "dPP.......EV.d",
          "dPP......##..d",
          "#........##..#",
          "#...C....##..#",
          "#........##..#",
          "#........##..#",
          "##############"
        ],
        variants: [
          { floors: [5, 6], challenge: 2, creatures: [{ id: "orc-chefe", quantity: 1 }], traps: [] }
        ]
      },
      {
        id: "colonia-de-gosma",
        title: "Colônia de Gosma",
        typeLabel: "Combate com gimmick",
        detail: "A criatura Grande (2x2 no mapa) bloqueia o caminho até a saída, cercada de gosma (terreno difícil). No andar 6, a geração de glops é habilidade da ficha da Mamãe Glop, não reforço externo.",
        treasureNote: "Tesouro padrão pelo ND da cena, adicional aos cristais e equipamentos/tesouros das criaturas.",
        map: [
          "##############",
          "#............#",
          "#.......DD...#",
          "dPP....DEE...d",
          "dPP....DEE...d",
          "#.......DD...#",
          "#..C.........#",
          "#............#",
          "#............#",
          "##############"
        ],
        variants: [
          { floors: [5], challenge: 2, creatures: [{ id: "glooop", quantity: 1 }], traps: [] },
          { floors: [6], challenge: 2, creatures: [{ id: "mamae-glop", quantity: 1 }], traps: [] }
        ]
      },
      {
        id: "guarita-das-laminas",
        title: "Guarita das Lâminas",
        typeLabel: "Combate + armadilha",
        detail: "As duas únicas passagens entre as salas têm lâminas na parede (2d6+5, Reflexos CD 20; Investigação CD 25; Ladinagem CD 20) — não há caminho limpo. O gnoll conhece os gatilhos, troca de passagem para flanquear e tenta empurrar personagens para as células armadas.",
        treasureNote: "Tesouro padrão pelo ND da cena, adicional aos cristais e equipamentos/tesouros das criaturas.",
        map: [
          "##############",
          "#.....#......#",
          "#.....#......#",
          "dPP...T...E..d",
          "dPP...#......d",
          "#.....#..C...#",
          "#.....#......#",
          "#.....T......#",
          "#.....#......#",
          "##############"
        ],
        variants: [
          { floors: [5, 6], challenge: 2, creatures: [{ id: "gnoll-saqueador", quantity: 1 }], traps: ["lamina-na-parede", "lamina-na-parede"] }
        ]
      },
      {
        id: "ponte-estreita",
        title: "Ponte Estreita",
        typeLabel: "Obstáculo",
        detail: "O vão corta a sala inteira; a única travessia é a ponte de 1 célula com Pêndulo de Teto no centro (1d12+10, Reflexos CD 25; Ladinagem CD 20 trava). Acrobacia CD 15 por rodada na ponte; falha por 5+ derruba no vão (queda de 6m, 4d6; Atletismo CD 20 para voltar).",
        treasureNote: "Tesouro padrão apenas com sucesso — corpo de um explorador pendurado sob a ponte (Atletismo CD 20 para alcançar).",
        map: [
          "##############",
          "#.....XXX....#",
          "#.....XXX....#",
          "dPP...XXX....d",
          "dPP....T.....d",
          "#.....XXX....#",
          "#.....XXX....#",
          "#.....XXX....#",
          "#.....XXX....#",
          "##############"
        ],
        variants: [
          { floors: [5, 6], challenge: 2, creatures: [], traps: ["pendulo-de-teto"] }
        ]
      },
      {
        id: "preco-dos-saqueadores",
        title: "Preço dos Saqueadores",
        typeLabel: "Negociação",
        detail: "Os gnolls vendem a passagem por 100 PO ou 1 item de qualidade, diante da pilha de saque. Diplomacia CD 18 reduz à metade; Enganação CD 20 passa sem pagar; Intimidação CD 18 força recuo, mas eles ficam hostis (se gnolls saírem no d100 ainda neste andar, começam em combate). Recusa: combate.",
        treasureNote: "Tesouro padrão apenas sem pagamento (combate ou enganação).",
        map: [
          "##############",
          "#............#",
          "#.......C....#",
          "dPP....H.....d",
          "dPP......H..Od",
          "#.......C....#",
          "#............#",
          "#............#",
          "#............#",
          "##############"
        ],
        variants: [
          { floors: [5, 6], challenge: 2, creatures: [{ id: "gnoll-saqueador", quantity: 2 }], traps: [] }
        ]
      }
    ],
    "floors-7-8": [
      {
        id: "teias-na-porta",
        title: "Teias na Porta",
        typeLabel: "Combate + armadilha",
        detail: "Uma barreira contínua de teia atravessa a sala e fecha todas as rotas até a saída (regras da Rede: Reflexos CD 20 ou agarrado; escapar com Acrobacia CD 20, ação completa; fogo destrói um trecho com 5 PV). O enxame fica atrás da barreira e ataca quem ficar agarrado. No andar 8 a barreira é mais espessa (3 zonas).",
        treasureNote: "Tesouro padrão pelo ND da cena, adicional aos cristais e equipamentos/tesouros das criaturas.",
        map: [
          "##############",
          "#........W...#",
          "#........W...#",
          "dPP......WE..d",
          "dPP......W...d",
          "#....C...W...#",
          "#........W...#",
          "#........W...#",
          "#........W...#",
          "##############"
        ],
        variants: [
          { floors: [7, 8], challenge: 1.5, creatures: [{ id: "aranhas-filhotes", quantity: 1 }], traps: [] }
        ]
      },
      {
        id: "cacadora-do-teto",
        title: "Caçadora do Teto",
        typeLabel: "Combate com gimmick",
        detail: "A Aranha Gigante começa camuflada no teto: Percepção do grupo contra a Furtividade dela; primeiro ataque com surpresa se não vista. Após atacar, gasta movimento para voltar ao teto/teias. Teias laterais são terreno difícil apenas para o grupo. Contramedidas: ataques à distância, ações preparadas, fogo nas teias.",
        treasureNote: "Tesouro padrão pelo ND da cena, adicional aos cristais e equipamentos/tesouros das criaturas.",
        map: [
          "##############",
          "#..W......W..#",
          "#.......H....#",
          "dPP..........d",
          "dPP..C....C..d",
          "#..W......W..#",
          "#............#",
          "#....C.......#",
          "#..W......W..#",
          "##############"
        ],
        variants: [
          { floors: [8], challenge: 2, creatures: [{ id: "aranha-gigante", quantity: 1 }], traps: [] }
        ]
      },
      {
        id: "porta-falsa",
        title: "Porta Falsa",
        typeLabel: "Combate com gimmick",
        detail: "O Mímico Menor está disfarçado de segunda porta, colado na saída real. Investigação CD 20, ou tocar com um objeto, revela o disfarce; caso contrário, o primeiro a interagir sofre ataque com surpresa + adesivo (agarrado).",
        treasureNote: "Tesouro padrão pelo ND da cena, adicional aos cristais e equipamentos/tesouros das criaturas.",
        map: [
          "##############",
          "#............#",
          "#.........C..#",
          "dPP.........Hd",
          "dPP..........d",
          "#............#",
          "#...C........#",
          "#............#",
          "#............#",
          "##############"
        ],
        variants: [
          { floors: [7, 8], challenge: 2, creatures: [{ id: "mimico-menor", quantity: 1 }], traps: [] }
        ]
      },
      {
        id: "casulos-bloqueando",
        title: "Casulos Bloqueando",
        typeLabel: "Obstáculo",
        detail: "3 casulos de teia fecham a única brecha da parede: 10 PV e RD 2 cada (dano de corte ignora a RD). Destruir/abrir 2 libera a rota. Um casulo (sorteado, oculto) contém as Aranhas Filhotes, que atacam ao ser aberto — Percepção CD 18 nota o casulo que se mexe. Outro contém uma vítima viva: resgatá-la concede informação sobre o próximo andar.",
        treasureNote: "Tesouro padrão (ND 1) apenas com o resgate da vítima.",
        map: [
          "##############",
          "#......#.....#",
          "#......#.....#",
          "dPP....W.....d",
          "dPP....W.....d",
          "#......W.....#",
          "#......#..C..#",
          "#......#.....#",
          "#......#.....#",
          "##############"
        ],
        variants: [
          { floors: [7, 8], challenge: 1, creatures: [{ id: "aranhas-filhotes", quantity: 1 }], traps: [] }
        ]
      },
      {
        id: "fugitivos-da-teia",
        title: "Fugitivos da Teia",
        typeLabel: "Negociação",
        detail: "Sobreviventes feridos (PV a 50%) fogem do covil — começam longe, armas baixadas, teias atrás deles. Diplomacia CD 15: contam o que viram (revele o gimmick do próximo andar ou conceda +2 no primeiro teste de exploração do próximo andar). Escoltá-los até a porta: entregam o que saquearam. Ataque: lutam encurralados, sem informação.",
        treasureNote: "Tesouro padrão (ND 1) apenas com a escolta concluída; em combate, apenas os cristais dos corpos.",
        map: [
          "##############",
          "#..........W.#",
          "#..........WW#",
          "dPP.....H..W.d",
          "dPP....H.H...d",
          "#..........W.#",
          "#............#",
          "#............#",
          "#............#",
          "##############"
        ],
        variants: [
          { floors: [7], challenge: 0.75, creatures: [{ id: "orc-enfraquecido", quantity: 3 }], traps: [] },
          { floors: [8], challenge: 1, creatures: [{ id: "orc-combatente", quantity: 1 }, { id: "orc-enfraquecido", quantity: 2 }], traps: [] }
        ]
      }
    ],
    "floor-9": [
      {
        id: "guardia-do-covil",
        title: "Guardiã do Covil",
        typeLabel: "Combate com gimmick",
        detail: "A cortina de teia fecha todas as rotas até a descida (terreno difícil só para o grupo). A Guardiã (2x2) defende a descida e não a abandona; o enxame de filhotes assedia quem ficar preso nas teias.",
        treasureNote: "Tesouro padrão pelo ND da cena, adicional aos cristais e equipamentos/tesouros das criaturas.",
        map: [
          "##############",
          "#......W.....#",
          "#......W.....#",
          "dPP....W.EE..d",
          "dPP....W.EE..d",
          "#......WW.E..#",
          "#.......W....#",
          "#......W.....#",
          "#......W.....#",
          "##############"
        ],
        variants: [
          { floors: [9], challenge: 3, creatures: [{ id: "aranha-gigante", quantity: 1 }, { id: "aranhas-filhotes", quantity: 1 }], traps: [] }
        ]
      },
      {
        id: "travessia-dos-casulos",
        title: "Travessia dos Casulos",
        typeLabel: "Combate + armadilha",
        detail: "Um campo de teia corta a sala de ponta a ponta, com os enxames dentro dele. Objetivo explícito: levar todos os personagens à descida — a cena termina quando o último cruzar. Exterminar não é necessário; os filhotes não perseguem além das teias.",
        treasureNote: "Tesouro padrão pelo ND da cena, adicional aos cristais e equipamentos/tesouros das criaturas.",
        map: [
          "##############",
          "#.....WW.....#",
          "#.....WEW....#",
          "dPP..WWWW....d",
          "dPP...WEW....d",
          "#.....WWW....#",
          "#.....WW.....#",
          "#.....WWW....#",
          "#.....WW.....#",
          "##############"
        ],
        variants: [
          { floors: [9], challenge: 3, creatures: [{ id: "aranhas-filhotes", quantity: 2 }], traps: [] }
        ]
      },
      {
        id: "alianca-desesperada",
        title: "Aliança Desesperada",
        typeLabel: "Negociação / cena mista",
        detail: "Orc Chefe e Hobgoblin Soldado, feridos (PV a 75%), encurralados pelas teias junto à descida. Diplomacia CD 18: aliança temporária — descem juntos e lutam contra a Matriarca (o mestre os controla; fogem se ela cair a 50% dos PV ou se um deles cair). Recusa educada: pedem passagem e somem. Ataque: combate ND 4, o único uso do teto do andar.",
        treasureNote: "Tesouro padrão (ND 3) apenas com a aliança firmada ou o combate vencido.",
        map: [
          "##############",
          "#..........W.#",
          "#.........W..#",
          "dPP......WH..d",
          "dPP.......HW.d",
          "#..........W.#",
          "#....C.......#",
          "#............#",
          "#............#",
          "##############"
        ],
        variants: [
          { floors: [9], challenge: 4, creatures: [{ id: "orc-chefe", quantity: 1 }, { id: "hobgoblin-soldado", quantity: 1 }], traps: [] }
        ]
      },
      {
        id: "selo-de-teia",
        title: "Selo de Teia",
        typeLabel: "Obstáculo",
        detail: "A teia-mestra cobre a própria descida: 20 PV, RD 5 (fogo ignora a RD); Misticismo CD 20 enfraquece o selo (remove a RD por 1 rodada). Uma Runa de Proteção guarda a aproximação (6d6 de fogo em 3m, Reflexos CD 20 reduz à metade; anulável com Dissipar Magia). Reforço único: na 3ª rodada de barulho, o enxame de filhotes desce do ponto marcado.",
        treasureNote: "Tesouro padrão (ND 3) apenas com o selo rompido — restos presos na teia.",
        map: [
          "##############",
          "#.........R..#",
          "#............#",
          "dPP.....T...Wd",
          "dPP.....T...Wd",
          "#............#",
          "#....C.......#",
          "#............#",
          "#............#",
          "##############"
        ],
        variants: [
          { floors: [9], challenge: 3, creatures: [{ id: "aranhas-filhotes", quantity: 1 }], traps: ["runa-de-protecao"] }
        ]
      },
      {
        id: "sentinela-da-dungeon",
        title: "Sentinela da Dungeon",
        typeLabel: "Combate com gimmick",
        detail: "A dungeon testa o grupo uma última vez: o Mímico Menor está plantado como baú diante da descida, parecendo o tesouro do andar. Investigação CD 20 revela; caso contrário, surpresa + adesivo. Os filhotes à espreita entram na 2ª rodada pelo ponto de reforço (única entrada da cena).",
        treasureNote: "Tesouro padrão pelo ND da cena, adicional aos cristais e equipamentos/tesouros das criaturas.",
        map: [
          "##############",
          "#.........R..#",
          "#.........C..#",
          "dPP........H.d",
          "dPP..........d",
          "#..C.........#",
          "#............#",
          "#............#",
          "#............#",
          "##############"
        ],
        variants: [
          { floors: [9], challenge: 3, creatures: [{ id: "mimico-menor", quantity: 1 }, { id: "aranhas-filhotes", quantity: 1 }], traps: [] }
        ]
      }
    ]
  }
};
