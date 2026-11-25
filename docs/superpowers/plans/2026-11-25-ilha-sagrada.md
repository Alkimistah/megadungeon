# Ilha Sagrada — Plano de implementação (etapa 6 de 13)

> **Para agentes:** SUB-SKILL OBRIGATÓRIA: superpowers:subagent-driven-development, conforme `docs/superpowers/processo-de-trabalho.md`. Os passos usam caixas (`- [ ]`).

**Objetivo:** colocar a Ilha Sagrada (`sacred`) no sorteio das ilhas intermediárias como ilha completa, no formato das intermediárias novas:
- 6 setores, cada um com 2 combates e 1 teste;
- combates ND 7;
- SO e SL removem um bônus do guardião;
- 3 guardiões ND 9.

O PO escolheu o conceito de **ilha dividida**. A oeste (NO, O e SO) ficam os espíritos antigos; a leste (NL, L e SL), uma cruzada da Supremacia Purista. É uma releitura do Atlas de Arton, pp. 172–187.

**Arquitetura:** só dados, no molde de `src/archipelagoCyclopeanRuins.js` e `scripts/archipelagoCyclopeanRuins.test.mjs`:
- `src/archipelagoSacred.js`, registrado em `SECTOR_ISLANDS` depois de `"cyclopean-ruins"`;
- `islandCreatures.sacred` **no fim**;
- `layoutsByTheme.sacred`;
- o pacote de missões;
- `arenaName`;
- as **etiquetas de ecologia novas**;
- a ativação.

O motor não muda.

**Spec:** `docs/superpowers/specs/2026-11-24-ilhas-novas-design.md`. O PO aprovou o conteúdo na prévia `tmp/previas/ilha-sagrada/index.html` em 25/11/2026:
- o Centro "Altar da Trilha Branca";
- os guardiões Protetor da Ilha, Companhia Blindada (solo) e Forjador Litúrgico (solo);
- a ecologia: floresta e colina, costa e ilhas, ruínas.

## Restrições globais

- Uma expedição salva antes desta etapa restaura igual depois dela.
- Só criaturas já existentes no catálogo. A lista entra no **fim** de `islandCreatures`, e as criaturas compartilhadas mantêm a origem anterior.
- Os testes antigos com seed fixa continuam exercitando todos os temas que já cobriam (agora são cinco intermediárias para três vagas). Os testes que dependem do sorteio exato da fileira intermediária usam `archipelagoBaseIntermediateRow`, que passa a filtrar também `sacred`. Não apague nenhuma verificação.
- Textos em português, transcritos literalmente deste plano.
- Só terrenos que a grade já tem. Nenhuma mudança no motor.
- Commits em `main`, em português, terminando com `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Sem push.

## Foco da revisão

1. **Sessão salva antes da etapa.** Tarefa 1.
2. **Origem das criaturas compartilhadas.** grifo (`floating`), coruja-gigante (`storm`) e capitao-baluarte (`pirate-held`) mantêm a origem anterior. As outras 15 passam a ter origem `sacred`. Tarefa 1.
3. **ND exato.** Os 12 combates fecham ND 7, e os guardiões ND 9 pelo orçamento e por `calculateCombatND`. Tarefa 1.
4. **Formato intermediário e ecologia.** Tarefa 1.
5. **Inimigo colado ao marco** (tabela). Tarefa 1.
6. **Testes antigos.** Tarefa 2.

---

### Task 1: Dados da Ilha Sagrada

**Modelo:** `sonnet`. Revisão: `sonnet`.

**Arquivos:**
- Criar: `src/archipelagoSacred.js`.
- Modificar:
  - `src/archipelagoPilot.js`;
  - `src/archipelagoCreatureRules.js`;
  - `src/archipelagoTacticalMap.js`;
  - `src/floorProfiles/archipelago21to30.js`.
- Criar: `scripts/fixtures/archipelago-sessao-antes-sagrada.json` e `scripts/archipelagoSacred.test.mjs`.
- Modificar: `package.json`, incluindo o arquivo novo em `test:archipelago`.

Em `src/floorProfiles/archipelago21to30.js`:
- acrescente `arenaName: "Altar da Trilha Branca"` ao tema `sacred`;
- acrescente a ecologia em `archipelagoEcologyContexts.byTheme`, logo depois de `"cyclopean-ruins"`: `sacred: { ...island, terrains: ["floresta", "colina"], places: ["costa-ilhas", "ruinas"] },`;
- **não** ative o tema.

#### Conteúdo aprovado (transcrever literalmente)

**`src/archipelagoSacred.js`** (arquivo completo):

```js
import { islandGuardianBuffs } from "./archipelagoGuardianBuffs.js";

export const sacredExploration = {
  pilot: "sacred-sectors",
  combatChallenge: 7,
  guardianBuffs: islandGuardianBuffs,
  terrain: {
    name: "Ilha dividida",
    effect: "A oeste, pilares antigos e bosques que os espíritos guardam. A leste, muralhas de madeira e estandartes da Supremacia Purista. Uma trilha de pedras brancas separa as duas metades.",
    features: [{ name: "Chão consagrado", effect: "Terreno difícil onde indicado no mapa." }]
  },
  sectors: [
    {
      direction: "NO", name: "Bosque dos tabus",
      tasks: [
        ["Cumprir o tabu do bosque", "ritual", "Obtenha 3 sucessos antes de 2 falhas. Descubra com Religião qual oferenda o bosque aceita, atravesse sem quebrar galho vivo com Sobrevivência e peça passagem com Diplomacia diante do pilar dos espíritos. Cada etapa exige um sucesso. Na segunda falha, o bosque se fecha e os espíritos não falam mais com o grupo."],
        ["Passar pela prova do guardião", "combate", "Um espírito do bosque exige que o grupo prove que não veio profanar. Vença o combate sem atacar o pilar dos espíritos. Registre sucesso se o grupo vencer e nenhuma personagem tiver causado dano ao pilar.", "spirit"],
        ["Defender o unicórnio ferido", "combate", "Um clã caçador da Supremacia encurralou um unicórnio ferido entre as árvores. Vença o combate. Se um adversário terminar o turno adjacente ao unicórnio, ele o abate. Registre sucesso se o grupo vencer com o unicórnio vivo.", "humanoid"]
      ]
    },
    {
      direction: "NL", name: "Muralha da Pureza",
      tasks: [
        ["Passar pela muralha", "infiltração", "Obtenha 3 sucessos antes de 2 falhas. Ache com Percepção o portão menos vigiado, convença a sentinela com Enganação de que o grupo veio servir à cruzada e atravesse o pátio com Furtividade. Cada etapa exige um sucesso. Na segunda falha, o sino da muralha toca e a cruzada fecha os portões."],
        ["Derrubar o estandarte da pureza", "combate", "O estandarte de Valkaria com as armas de Arsenal anima os soldados da muralha. Vença o combate. Até o fim da quarta rodada, uma personagem adjacente ao mastro gasta uma ação padrão em duas rodadas diferentes para derrubá-lo. Registre sucesso se o grupo vencer e derrubar o estandarte.", "humanoid"],
        ["Abrir as gaiolas dos espíritos", "combate", "Os puristas prenderam espíritos da ilha em gaiolas de ferro frio, e os que já escaparam atacam qualquer um, de tão feridos e furiosos. Vença o combate. Até o fim da quarta rodada, uma personagem adjacente à gaiola grande gasta uma ação padrão em duas rodadas diferentes para abri-la. Registre sucesso se o grupo vencer e abrir a gaiola.", "spirit"]
      ]
    },
    {
      direction: "O", name: "Fonte das aves",
      tasks: [
        ["Ouvir a ninfa da fonte", "exploração", "Obtenha 3 sucessos antes de 2 falhas. Ganhe a atenção da ninfa com Diplomacia, perceba com Intuição o que ela não diz sobre os puristas e responda à pergunta dela com Conhecimento. Cada etapa exige um sucesso. Na segunda falha, a ninfa some na água e a fonte fica em silêncio."],
        ["Lavar a fonte profanada", "combate", "Os puristas jogaram sal e cinzas na fonte, e os espíritos dela atacam qualquer um que chegue perto. Vença o combate. Até o fim da quarta rodada, uma personagem adjacente à fonte gasta uma ação padrão em duas rodadas diferentes para lavar a pedra. Registre sucesso se o grupo vencer e lavar a fonte.", "spirit"],
        ["Devolver o ovo ao ninho", "combate", "Um ovo sagrado foi roubado pelos puristas e largado no caminho. As aves da fonte atacam quem estiver perto dele. Escolha uma personagem para carregar o ovo. Ela gasta uma ação padrão adjacente ao ninho para devolvê-lo. Registre sucesso se o ovo voltar ao ninho até o fim da quarta rodada.", "monster"]
      ]
    },
    {
      direction: "L", name: "Acampamento da cruzada",
      tasks: [
        ["Sabotar as correntes de prata", "engenho", "Obtenha 2 sucessos antes de 2 falhas. Ache com Investigação o baú das correntes de prata que prendem os espíritos e enfraqueça os elos com Ofício (ferreiro) ou Ladinagem. Na segunda falha, um guarda vê o baú aberto e as correntes são trocadas."],
        ["Interromper a missa de guerra", "combate", "Um capelão reza a missa de guerra no meio do acampamento. Escolha a criatura de maior ND para ser o capelão. Ele gasta uma ação padrão em três rodadas diferentes junto ao altar de campanha para terminar a missa. Registre sucesso se o grupo vencer antes de ele terminar.", "humanoid"],
        ["Libertar os prisioneiros não humanos", "combate", "A cruzada acorrentou prisioneiros não humanos para a purificação do amanhecer. Vença o combate. Até o fim da quarta rodada, uma personagem adjacente ao tronco dos prisioneiros gasta uma ação padrão em duas rodadas diferentes para soltar as correntes. Registre sucesso se o grupo vencer e soltar os prisioneiros.", "humanoid"]
      ]
    },
    {
      direction: "SO", name: "Escadaria das penas",
      defaultGuardianBuff: "defense",
      tasks: [
        ["Subir sem pisar nas penas", "travessia", "Obtenha 3 sucessos antes de 2 falhas. Leia com Religião o desenho das penas nos degraus, suba pelos espaços certos com Acrobacia e aguente o vento do alto com Atletismo. Cada etapa exige um sucesso. Na segunda falha, alguém pisa numa pena e a escadaria toda se cobre de névoa."],
        ["Vencer a prova do protetor", "combate", "O protetor da escadaria desafia o grupo no patamar. No centro há um círculo de penas que ninguém pode pisar. Vença o combate. Registre sucesso se o grupo vencer sem que nenhuma personagem entre no círculo.", "spirit"],
        ["Espantar os grifos da escadaria", "combate", "Grifos fazem ninho no alto da escadaria e atacam quem sobe. Vença o combate. Até o fim da quarta rodada, uma personagem adjacente ao braseiro de penas gasta uma ação padrão em duas rodadas diferentes para acendê-lo. A fumaça acalma as aves. Registre sucesso se o grupo vencer e acender o braseiro.", "monster"]
      ]
    },
    {
      direction: "SL", name: "Altar dividido",
      defaultGuardianBuff: "hp",
      tasks: [
        ["Reconsagrar o altar", "ritual", "Obtenha 3 sucessos antes de 2 falhas. Raspe com Ofício (pedreiro) os símbolos puristas gravados por cima dos antigos, reconheça com Misticismo os traços originais e reconsagre a pedra com Religião. Cada etapa exige um sucesso. Na segunda falha, o altar racha e os dois lados da ilha sentem."],
        ["Impedir a profanação do altar", "combate", "Soldados da cruzada vêm quebrar o altar antigo com marretas. Vença o combate. Se um adversário terminar o turno adjacente ao altar, ele dá um golpe. No terceiro golpe, o altar se parte. Registre sucesso se o grupo vencer antes do terceiro golpe.", "humanoid"],
        ["Romper o selo do espírito do altar", "combate", "Um selo purista prende o espírito do altar e o deixa louco de dor. Vença o combate. Até o fim da quarta rodada, uma personagem adjacente ao selo gasta uma ação padrão em duas rodadas diferentes para rompê-lo. Registre sucesso se o grupo vencer e romper o selo.", "spirit"]
      ]
    }
  ],
  guardians: [
    { id: "protetor-da-ilha", name: "O Protetor da Ilha", briefing: "No centro da ilha, onde as duas metades se encontram, o protetor desce das nuvens com as asas abertas. O guardião eiradaan sai de trás do pilar maior. Para os dois, o grupo é só mais um bando de invasores.", creatures: [{ id: "protetor", quantity: 1 }, { id: "eiradaan-guardiao", quantity: 1 }] },
    { id: "companhia-blindada", name: "A Companhia Blindada", briefing: "A tropa de elite da cruzada fecha a trilha branca em formação, com os escudos colados e as lanças abaixadas. Ninguém fala. Eles avançam passo a passo na direção do grupo.", creatures: [{ id: "companhia-blindada-de-elite", quantity: 1 }] },
    { id: "forjador-liturgico", name: "O Forjador Litúrgico", briefing: "Junto à pedra do meio, um devoto de Arsenal de elmo fechado espera ao lado de uma bigorna. Foi ele quem forjou as armas da estátua de Valkaria da cruzada. Ele ergue uma arma recém-forjada e a oferece a quem conseguir tomá-la dele.", creatures: [{ id: "forjador-liturgico", quantity: 1 }] }
  ]
};
```

**Criaturas** (`islandCreatures`, no fim do objeto, depois de `"cyclopean-ruins"`, com a mesma indentação das vizinhas):

```js
sacred: [
  "pegaso", "unicornio", "dragonete", "ninfa", "protetor", "eiradaan-guardiao",
  "hipogrifo", "grifo", "coruja-gigante",
  "recruta-purista", "soldado-purista", "purificado", "sargento-mor", "capelao-de-guerra",
  "arcano-de-guerra-adepto", "capitao-baluarte", "cacador-de-impuros", "bispo-de-guerra"
]
```

**Plantas** (`layoutsByTheme`, depois de `"cyclopean-ruins"`):

```js
sacred: {
    NO: { ...layout("Pilar dos espíritos", "Um pilar antigo coberto de oferendas. Os espíritos do bosque falam por ele.", 12, 5, [["clearing", 8, 2, 9, 8], ["foliage", 0, 0, 6, 4], ["foliage", 13, 10, 7, 4], ["tree", 2, 2, 2, 2], ["tree", 5, 6, 1, 1], ["tree", 16, 1, 2, 2], ["tree", 17, 9, 2, 2], ["tree", 9, 11, 2, 2], ["difficult", 6, 8, 2, 2]]), enemyArea: { minX: 15, maxX: 19, minY: 0, maxY: 12 } },
    NL: layout("Mastro do estandarte", "O estandarte de Valkaria com as armas de Arsenal, no meio do pátio da muralha.", 12, 5, [["clearing", 7, 2, 12, 9], ["wall", 6, 0, 1, 4], ["wall", 6, 7, 1, 7], ["obstacle", 15, 2, 3, 1], ["obstacle", 15, 9, 3, 2], ["advantage", 17, 4, 3, 3], ["difficult", 9, 9, 3, 2]]),
    O: { ...layout("Pedra da fonte", "A pedra de onde a água brota, na borda leste da fonte.", 13, 6, [["clearing", 5, 3, 11, 9], ["water", 8, 4, 5, 5], ["deep-water", 9, 5, 3, 3], ["tree", 3, 2, 2, 2], ["tree", 16, 2, 2, 2], ["tree", 16, 10, 2, 2], ["wet", 7, 9, 7, 2]]), enemyArea: { minX: 15, maxX: 19, minY: 0, maxY: 13 } },
    L: layout("Altar de campanha", "Uma mesa de madeira com os símbolos de Valkaria e Arsenal, no meio do acampamento.", 12, 6, [["clearing", 6, 2, 13, 10], ["obstacle", 7, 2, 3, 2], ["obstacle", 15, 2, 3, 2], ["obstacle", 7, 9, 3, 2], ["obstacle", 15, 9, 3, 2], ["difficult", 10, 8, 4, 1]]),
    SO: { ...layout("Círculo de penas", "O círculo de penas ocupa os quadrados de terreno difícil em volta deste ponto. Ninguém do grupo pode pisar nele.", 11, 6, [["advantage", 7, 2, 10, 9], ["slope", 3, 6, 4, 4], ["difficult", 10, 5, 3, 3], ["obstacle", 8, 3, 1, 1], ["obstacle", 15, 3, 1, 1], ["obstacle", 8, 9, 1, 1], ["obstacle", 15, 9, 1, 1]]), enemyArea: { minX: 14, maxX: 19, minY: 0, maxY: 12 } },
    SL: { ...layout("Altar antigo", "O altar dos espíritos, com os símbolos puristas gravados por cima.", 14, 6, [["clearing", 6, 4, 13, 8], ["advantage", 12, 5, 5, 4], ["obstacle", 11, 5, 1, 1], ["obstacle", 17, 5, 1, 1], ["obstacle", 11, 8, 1, 1], ["obstacle", 17, 8, 1, 1], ["difficult", 4, 1, 6, 2]]), enemyArea: { minX: 8, maxX: 19, minY: 0, maxY: 3 } },
    center: { ...layout("Pedra do meio", "A pedra branca onde as duas metades da ilha se encontram.", 18, 6, [["foliage", 0, 0, 6, 4], ["tree", 2, 1, 1, 1], ["tree", 4, 9, 1, 1], ["clearing", 9, 0, 2, 14], ["wall", 16, 0, 1, 4], ["wall", 16, 9, 1, 5], ["advantage", 14, 4, 5, 5]]), enemyArea: { minX: 11, maxX: 14, minY: 3, maxY: 8 } },
    byTask: {
      "Defender o unicórnio ferido": { ...layout("Unicórnio ferido", "Caído entre as árvores, sem forças para fugir.", 8, 4, [["foliage", 0, 0, 20, 3], ["clearing", 5, 3, 6, 5], ["tree", 6, 2, 1, 1], ["tree", 10, 3, 1, 1], ["tree", 7, 6, 1, 1], ["foliage", 14, 5, 6, 5], ["difficult", 3, 8, 3, 2], ["tree", 16, 11, 1, 1]]), enemyArea: { minX: 13, maxX: 19, minY: 0, maxY: 12 } },
      "Abrir as gaiolas dos espíritos": { ...layout("Gaiola grande", "A maior gaiola de ferro frio, com a porta presa por correntes.", 13, 6, [["wall", 0, 0, 20, 1], ["clearing", 8, 2, 11, 10], ["obstacle", 9, 3, 1, 1], ["obstacle", 9, 9, 1, 1], ["obstacle", 16, 3, 1, 1], ["obstacle", 16, 9, 1, 1], ["obstacle", 14, 5, 2, 3], ["difficult", 4, 5, 3, 3]]), enemyArea: { minX: 16, maxX: 19, minY: 1, maxY: 12 } },
      "Devolver o ovo ao ninho": { ...layout("Ninho das aves", "No alto da rocha da fonte. A personagem que carrega o ovo o devolve daqui.", 16, 3, [["advantage", 14, 1, 5, 4], ["slope", 12, 2, 2, 3], ["tree", 4, 3, 1, 1], ["tree", 9, 7, 1, 1], ["water", 3, 6, 4, 3], ["difficult", 8, 10, 4, 2]]), enemyArea: { minX: 10, maxX: 19, minY: 6, maxY: 12 } },
      "Libertar os prisioneiros não humanos": layout("Tronco dos prisioneiros", "Os prisioneiros estão acorrentados ao tronco no fundo do acampamento.", 14, 7, [["wall", 8, 1, 11, 1], ["clearing", 8, 3, 11, 9], ["obstacle", 15, 6, 1, 3], ["obstacle", 10, 4, 2, 1], ["obstacle", 10, 10, 2, 1], ["difficult", 5, 6, 3, 3]]),
      "Espantar os grifos da escadaria": layout("Braseiro de penas", "Um braseiro de pedra na lateral da escadaria. A fumaça acalma as aves.", 6, 4, [["wall", 0, 0, 4, 4], ["advantage", 10, 0, 10, 5], ["slope", 4, 5, 12, 3], ["obstacle", 13, 1, 2, 1], ["obstacle", 17, 3, 2, 1], ["difficult", 9, 9, 3, 2]]),
      "Romper o selo do espírito do altar": layout("Selo purista", "Um selo de ferro cravado ao lado do altar.", 9, 6, [["clearing", 5, 2, 11, 10], ["advantage", 8, 4, 4, 4], ["obstacle", 10, 5, 1, 1], ["difficult", 14, 3, 3, 3], ["obstacle", 4, 3, 1, 1], ["obstacle", 16, 9, 1, 1]])
    }
  }
```

#### Passos

- [ ] **Passo 1: capturar a fixture com o código atual**, antes de qualquer mudança, como em `scripts/fixtures/archipelago-sessao-antes-ruinas.json`. Use as seeds `"regressao-sagrada-1"` a `"regressao-sagrada-3"` e inclua as visitas aos andares 21 e 25.
- [ ] **Passo 2: testes** em `scripts/archipelagoSacred.test.mjs`, espelhando `scripts/archipelagoCyclopeanRuins.test.mjs`, com o andar 25 e `baseChallenge: 9`:
  - a regressão;
  - os 6 setores com 2 combates e 1 teste cada;
  - os bônus em SO (`defense`) e SL (`hp`);
  - o ND 7 de cada combate em três seeds, só com o elenco;
  - os marcos (tabela) e as zonas diferentes dentro de cada setor;
  - os guardiões com ND 9, `briefing`, sem `rule`, e a criatura principal (`protetor`, `companhia-blindada-de-elite` e `forjador-liturgico`, nessa ordem) com pelo menos 4 penalidades;
  - o terreno ("Ilha dividida"), o `arenaName` e a **ecologia**, que é exatamente a do texto acima;
  - as origens;
  - as distâncias em 50 seeds, com peças de vários quadrados.

  | Combate | Marco | Distância mínima |
  |---|---|---|
  | Passar pela prova do guardião | Pilar dos espíritos | 2 |
  | Defender o unicórnio ferido | Unicórnio ferido | 2 |
  | Derrubar o estandarte da pureza | Mastro do estandarte | — |
  | Abrir as gaiolas dos espíritos | Gaiola grande | 2 |
  | Lavar a fonte profanada | Pedra da fonte | 2 |
  | Devolver o ovo ao ninho | Ninho das aves | 2 |
  | Interromper a missa de guerra | Altar de campanha | — |
  | Libertar os prisioneiros não humanos | Tronco dos prisioneiros | — |
  | Vencer a prova do protetor | Círculo de penas | 2 |
  | Espantar os grifos da escadaria | Braseiro de penas | — |
  | Impedir a profanação do altar | Altar antigo | 2 |
  | Romper o selo do espírito do altar | Selo purista | — |

- [ ] **Passo 3: rodar e ver falhar.**
- [ ] **Passo 4: implementar.**
- [ ] **Passo 5: rodar e ver passar.** Se algum combate não fechar ND 7, ou alguma distância falhar, **pare e informe o gerente**. Depois rode `npm run test:archipelago`, `npm run test:archipelago-missions` e `npm run test:ecology`. Se algum teste de ecologia listar os temas sem etiquetas, tire `sacred` da lista sem apagar a verificação.
- [ ] **Passo 6: commit.** `feat: adiciona os dados da Ilha Sagrada`

---

### Task 2: Pacote de missões, ativação e documentação

**Modelo:** `sonnet`. Revisão: `sonnet`.

#### Pacote de missões aprovado (transcrever literalmente)

```js
sacred: {
  pools: {
    locations: ["um bosque de pilares cobertos de oferendas", "o pátio de uma muralha com estandartes puristas", "uma fonte onde as aves bebem em silêncio", "um altar com dois símbolos gravados um por cima do outro"],
    materials: ["penas brancas caídas na escadaria", "água da fonte recolhida antes do amanhecer", "sal consagrado pelos capelães", "lascas de prata das correntes puristas"],
    objects: ["um estandarte de Valkaria com as armas de Arsenal", "uma gaiola de ferro frio vazia", "um livro de preces do Templo da Pureza Divina", "uma oferenda de mel deixada no pilar", "um apito de caça de um clã purista"],
    mementos: ["o colar de um prisioneiro não humano", "uma pena de unicórnio presa num galho", "a carta de um soldado purista com dúvidas sobre a fé", "uma fita de oração amarrada num pilar"],
    clues: ["oferendas pisadas no caminho", "marcas de corrente nas árvores do bosque", "aves que voam sempre para o oeste", "estandartes rasgados por garras"],
    challenges: ["cumprir os tabus sem ofender os espíritos", "atravessar o lado purista sem ser descoberto", "escolher a quem a ilha vai pertencer", "desfazer o que os capelães consagraram"],
    phenomena: ["aves que circulam sem pousar", "um silêncio que cai quando alguém mente", "estandartes que se viram contra o vento", "pedras brancas que brilham à noite"]
  },
  featured: {
    category: "trial",
    title: "A prova das duas metades",
    targetName: "o favor dos espíritos da ilha",
    lead: "Conquiste o favor dos espíritos antigos",
    condition: "Cumprir um tabu do bosque, libertar um espírito preso pelos puristas e voltar à fonte sem derramar sangue no chão consagrado",
    proofType: "Uma pena branca entregue pela ninfa da fonte."
  },
  map: {
    markers: ["tree", "clearing", "wall", "advantage"],
    landmark: { name: "Pedras brancas", effect: "As pedras brancas que separam as duas metades da ilha. Ponto de referência da missão." }
  }
}
```

#### Passos

- [ ] **Passo 1: teste da ilha sorteada**, com as seeds `"sagrada-0"` a `"sagrada-199"`, como o das Ruínas:
  - a ilha está entre os andares 25 e 27;
  - há 6 objetivos;
  - há 4 `penaltyId` distintos e os setores 5 e 6 têm `guardianBuffId`;
  - `arenaName === "Altar da Trilha Branca"`;
  - a composição do guardião é uma de `"protetor-da-ilha"`, `"companhia-blindada"` ou `"forjador-liturgico"`;
  - o tema de missões existe.
- [ ] **Passo 2: rodar e ver falhar.**
- [ ] **Passo 3: implementar** o pacote e a ativação, com `"sacred"` em `enabledThemeIds` depois de `"cyclopean-ruins"`.
- [ ] **Passo 4: ajustar os testes antigos.**
  - O teste de sorteio passa a "dezesseis temas ativos" (`length === 16`, `includes("sacred")`), e a fileira intermediária continua com 3 ids distintos.
  - `archipelagoBaseIntermediateRow` também filtra `"sacred"`.
  - Ajuste qualquer outro teste que deixe de achar a sua ilha pelo mesmo caminho, sem apagar nenhuma verificação.
- [ ] **Passo 5: rodar tudo.** `npm run test:archipelago`, `npm run test:archipelago-missions`, `npm run test:ecology`, `npm run test:ranges` e `npm run build`.
- [ ] **Passo 6: documentação.**
  - Em `REQUISITOS_ANDARES_21_A_30.md`, acrescente um parágrafo depois do das Ruínas, no mesmo estilo. Cubra a ilha dividida, os espíritos a oeste, a cruzada purista a leste como releitura do Atlas de Arton, os guardiões e o Centro.
  - Atualize quinze para dezesseis temas e a linha Intermediária: cinco temas, três sorteados.
  - Passe de 8 para 7 temas fora do sorteio.
  - Se o REQUISITOS ou o README citarem a Ilha Sagrada entre os temas sem ecologia, atualize a frase.
  - No README, troque 8 por 7 (duas ocorrências).
- [ ] **Passo 7: commit.** `feat: coloca a Ilha Sagrada no sorteio das ilhas intermediárias`

---

## Execução

| Tarefa | Implementador | Revisor |
|---|---|---|
| 1. Dados | `sonnet` | `sonnet` |
| 2. Missões, ativação e docs | `sonnet` | `sonnet` |
| Revisão final | — | `opus` |

### Fechamento (gerente)

- Revisão final com `opus`.
- Validação pelo PO no app, com uma sessão que tenha a Sagrada num andar intermediário liberado.
- Atualizar a spec e apagar `tmp/previas/ilha-sagrada/`.
