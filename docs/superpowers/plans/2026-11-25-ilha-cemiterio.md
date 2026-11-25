# Ilha-Cemitério de Navios — Plano de implementação (etapa 4 de 13)

> **Para agentes:** SUB-SKILL OBRIGATÓRIA: superpowers:subagent-driven-development, conforme `docs/superpowers/processo-de-trabalho.md`. Os passos usam caixas (`- [ ]`).

**Objetivo:** colocar a Ilha-Cemitério de Navios (`ship-graveyard`) no sorteio das ilhas iniciais como ilha completa, no padrão da Ilha de Névoa: uma planta por combate, ao menos dois combates sorteáveis por setor, pacote de missões e testes. É a última ilha inicial.

**Arquitetura:** a ilha é só dados e repete o desenho da Névoa:
- `src/archipelagoShipGraveyard.js`, registrado em `SECTOR_ISLANDS` (`"ship-graveyard": shipGraveyardExploration`, depois de `mist`);
- `islandCreatures["ship-graveyard"]` **no fim** da lista;
- `layoutsByTheme["ship-graveyard"]` com as plantas de direção e `byTask`;
- o pacote de missões em `archipelagoMissionThemes.js`;
- `arenaName` e a ativação no perfil.

O motor não muda.

**Spec:** `docs/superpowers/specs/2026-11-24-ilhas-novas-design.md`. O PO aprovou o conteúdo na prévia `tmp/previas/ilha-cemiterio/index.html` em 25/11/2026, que está transcrito abaixo. O PO também aprovou o Centro "Nau Capitânia" e a facção dos Desmanchadores, os gnolls filibusteiros.

## Restrições globais

- Uma expedição salva antes desta etapa restaura igual depois dela.
- Só criaturas já existentes no catálogo. `islandCreatures["ship-graveyard"]` entra no **fim** de `islandCreatures`, e as criaturas compartilhadas mantêm a origem anterior.
- Os testes antigos com seed fixa continuam exercitando todos os temas que já cobriam (agora são oito iniciais para quatro vagas) e afirmam isso explicitamente.
- Textos em português, transcritos literalmente deste plano.
- Só terrenos que a grade já tem. Nenhuma mudança no motor.
- Commits em `main`, em português, terminando com `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Sem push.

## Foco da revisão

1. **Sessão salva antes da etapa.** Ela restaura igual. A fixture nova é capturada antes de qualquer mudança. Tarefa 1.
2. **Origem das criaturas compartilhadas.** Cada uma mantém `getCreatureOriginThemeId` anterior: canceronte, selako e lula-gigante (`sea-caves`); crocodilo, otyugh, esqueleto e esqueleto-de-elite (`mangrove`); lacedon (`storm`); imediato e capitao-pirata (`pirate-held`). As outras 15 passam a ter origem `ship-graveyard`. Tarefa 1.
3. **ND exato.** Toda variante de combate fecha ND 6 com o tipo preferido, em três seeds. Cada guardião soma ND 8. Tarefa 1.
4. **Inimigo colado ao marco.** Nenhum inimigo começa a Chebyshev ≤ 1 do marco em "Segurar a prancha entre os cascos" e "Tirar o grumete da sentina". Em "Interceptar a patrulha", a distância até a saída é ≥ 3. Tarefa 1.
5. **Testes antigos.** "As variantes das quatro ilhas…", a fileira-base de seeds fixas e o teste de sorteio continuam cobrindo todos os temas iniciais, agora com `ship-graveyard`. Tarefa 2.

---

### Task 1: Dados da Ilha-Cemitério de Navios

**Modelo:** `sonnet`. Revisão: `sonnet`.

**Arquivos:**
- Criar: `src/archipelagoShipGraveyard.js` (molde: `src/archipelagoMist.js`).
- Modificar:
  - `src/archipelagoPilot.js`;
  - `src/archipelagoCreatureRules.js`;
  - `src/archipelagoTacticalMap.js`;
  - `src/floorProfiles/archipelago21to30.js`: `arenaName: "Nau Capitânia"` no tema `ship-graveyard`. A ecologia já existe. **Não** ative o tema ainda.
- Criar: `scripts/fixtures/archipelago-sessao-antes-cemiterio.json` e `scripts/archipelagoShipGraveyard.test.mjs`.
- Modificar: `package.json`, incluindo o arquivo novo em `test:archipelago`.

#### Conteúdo aprovado (transcrever literalmente)

**`src/archipelagoShipGraveyard.js`** (arquivo completo):

```js
export const shipGraveyardExploration = {
  pilot: "ship-graveyard-sectors",
  terrain: {
    name: "Cascos encalhados",
    effect: "Cascos podres se apoiam uns nos outros acima da água. Pranchas e cordas ligam um convés ao outro.",
    features: [{ name: "Tábuas podres", effect: "Terreno difícil onde indicado no mapa." }]
  },
  sharedTasks: true,
  sectors: [
    {
      direction: "N", name: "Proas encalhadas",
      tasks: [
        ["Achar a entrada pelos cascos", "exploração", "Obtenha 3 sucessos antes de 2 falhas. Ache com Percepção o casco que ainda aguenta peso, suba pelo costado com Atletismo e teste as tábuas com Ofício (carpinteiro) antes de pisar. Cada etapa exige um sucesso. Na segunda falha, o costado cede e o grupo volta ao bote."],
        ["Segurar a prancha entre os cascos", "combate", "Os Desmanchadores querem derrubar a prancha que liga dois cascos para isolar o grupo. Vença o combate. Se ao fim de uma rodada houver um adversário adjacente à ponta da prancha e nenhuma personagem adjacente a ela, a prancha cai no mar. Registre sucesso se o grupo vencer com a prancha no lugar.", "humanoid"],
        ["Limpar o ninho do cordame", "combate", "Aranhas juntaram o cordame de dois mastros caídos numa teia só. Um marinheiro dos Desmanchadores pende num casulo. Vença o combate. Até o fim da quarta rodada, uma personagem adjacente ao casulo gasta uma ação padrão em duas rodadas diferentes para cortá-lo. Registre sucesso se o grupo vencer e soltar o marinheiro.", "monster"]
      ]
    },
    {
      direction: "S", name: "Porões alagados",
      tasks: [
        ["Resgatar a carga do porão", "recuperação", "Obtenha 2 sucessos antes de 2 falhas. Ache com Percepção a caixa lacrada entre os destroços e puxe-a pela escotilha com Atletismo antes que a maré encha o porão. Na segunda falha, a água cobre a caixa."],
        ["Fechar o rombo do casco", "combate", "A maré entra por um rombo no porão, e os predadores entram com ela. Vença o combate. Até o fim da quarta rodada, uma personagem adjacente ao rombo gasta uma ação padrão em duas rodadas diferentes para pregar as tábuas. Registre sucesso se o grupo vencer e fechar o rombo.", "animal"],
        ["Tirar o grumete da sentina", "combate", "Um grumete dos Desmanchadores caiu na sentina, onde algo vive no lixo do fundo. Ele está preso sob uma viga. Vença o combate. Uma personagem adjacente ao grumete gasta uma ação padrão para erguer a viga. Registre sucesso se ele for solto até o fim da terceira rodada e o grupo vencer.", "monster"]
      ]
    },
    {
      direction: "L", name: "Convés dos Desmanchadores",
      tasks: [
        ["Negociar com os Desmanchadores", "exploração", "Obtenha 3 sucessos antes de 2 falhas. Fale com a contramestra dos gnolls com Diplomacia, perceba com Intuição o que eles escondem sobre a nau capitânia e ofereça uma troca justa com Ofício ou Nobreza. Cada etapa exige um sucesso. Na segunda falha, os Desmanchadores expulsam o grupo do convés."],
        ["Soltar a âncora presa", "engenho", "Obtenha 2 sucessos antes de 2 falhas. Ache com Investigação onde a corrente da âncora prendeu entre os cascos e solte o elo com Ofício (ferreiro) ou Atletismo. Na segunda falha, a corrente se parte e o casco escorrega para o fundo."],
        ["Travar o guindaste dos Desmanchadores", "combate", "Os Desmanchadores içam um casco inteiro para desmontá-lo, e com ele vai o caminho até o centro. Vença o combate. Até o fim da quarta rodada, uma personagem adjacente à manivela do guindaste gasta uma ação padrão em duas rodadas diferentes para travar o freio. Registre sucesso se o grupo vencer e travar o freio.", "humanoid"]
      ]
    },
    {
      direction: "O", name: "Casco da carranca",
      tasks: [
        ["Abrir o cofre do almirante", "engenho", "Obtenha 2 sucessos antes de 2 falhas. Ache com Investigação a fechadura falsa e abra a verdadeira com Ladinagem. Na segunda falha, o cofre trava de vez."],
        ["Apaziguar a carranca", "ritual", "Obtenha 3 sucessos antes de 2 falhas. Reconheça com Conhecimento a deusa entalhada na proa, ofereça o sal do mar com Religião e apague as runas da maldição com Misticismo. Cada etapa exige um sucesso. Na segunda falha, a carranca range e os cascos tremem até o centro."],
        ["Fechar a escotilha da tripulação", "combate", "Os mortos da tripulação sobem do porão pela escotilha. Vença o combate. Uma personagem adjacente à escotilha gasta uma ação padrão para fechá-la. Registre sucesso se a escotilha for fechada até o fim da terceira rodada e o grupo vencer.", "undead"]
      ]
    }
  ],
  guardians: [
    { id: "capitao-dos-ossos", name: "O Capitão dos Ossos", briefing: "No convés da nau capitânia, o capitão ainda dá ordens a uma tripulação de ossos. Os marinheiros mortos se fundiram num monte que anda, e o contramestre ergue o sabre ao lado dele.", creatures: [{ id: "capitao-pirata", quantity: 1 }, { id: "amalgama-esqueleto", quantity: 1 }, { id: "esqueleto-de-elite", quantity: 1 }] },
    { id: "tesouro-que-morde", name: "O Tesouro que Morde", briefing: "A cabine do almirante está cheia de ouro velho e de dois baús ainda trancados. Quando o grupo se aproxima, as tampas se abrem sozinhas e mostram dentes.", creatures: [{ id: "mimico", quantity: 2 }] },
    { id: "cacador-de-cabecas", name: "O Caçador de Cabeças", briefing: "O chefe dos Desmanchadores espera no convés mais alto, com os troféus pendurados no mastro. O líder da alcateia e a xamã de Megalokk fecham o caminho de volta.", creatures: [{ id: "gnoll-cacador-de-cabecas", quantity: 1 }, { id: "gnoll-lider-de-alcateia", quantity: 1 }, { id: "gnoll-xama-de-megalokk", quantity: 1 }] }
  ]
};
```

**Criaturas** (`islandCreatures`, no fim do objeto, depois de `mist`):

```js
"ship-graveyard": [
  "canceronte", "selako", "crocodilo", "rato-gigante", "lula-gigante", "aranhas-filhotes",
  "aranha-gigante", "aranha-matriarca", "mimico-menor", "mimico", "otyugh", "ameba-gigante", "ganchador",
  "gnoll-capanga", "gnoll-saqueador", "gnoll-filibusteiro", "gnoll-lider-de-alcateia", "gnoll-xama-de-megalokk", "gnoll-cacador-de-cabecas",
  "esqueleto", "esqueleto-de-elite", "lacedon", "imediato", "capitao-pirata", "amalgama-esqueleto"
]
```

**Plantas** (`layoutsByTheme`, depois de `mist`):

```js
"ship-graveyard": {
    N: { ...layout("Ponta da prancha", "A prancha liga os dois cascos. Esta ponta está apoiada na amurada do casco maior.", 11, 7, [["water", 0, 0, 20, 14], ["deck", 0, 6, 8, 8], ["deck", 12, 0, 8, 10], ["bridge", 8, 7, 4, 1], ["difficult", 3, 8, 2, 2], ["obstacle", 15, 3, 1, 2], ["obstacle", 5, 11, 2, 1], ["difficult", 16, 6, 3, 2]]), enemyArea: { minX: 14, maxX: 19, minY: 0, maxY: 9 }, enemyTiles: ["deck"] },
    S: { ...layout("Rombo do casco", "Um buraco no costado, abaixo da linha d'água. A maré entra por ele.", 18, 7, [["wall", 0, 0, 20, 1], ["wall", 0, 13, 20, 1], ["wall", 18, 1, 1, 6], ["wall", 18, 8, 1, 5], ["deep-water", 19, 1, 1, 12], ["water", 9, 1, 9, 12], ["wet", 5, 1, 4, 12], ["obstacle", 4, 3, 2, 2], ["obstacle", 11, 10, 2, 2], ["obstacle", 13, 3, 1, 1], ["difficult", 7, 6, 3, 2]]), enemyArea: { minX: 10, maxX: 17, minY: 1, maxY: 12 } },
    L: { ...layout("Manivela do guindaste", "O freio do guindaste fica junto à manivela.", 12, 8, [["water", 0, 0, 20, 3], ["deck", 0, 3, 20, 11], ["obstacle", 13, 7, 2, 2], ["obstacle", 13, 3, 1, 4], ["pit", 4, 5, 3, 2], ["obstacle", 7, 11, 2, 1], ["canopy", 16, 9, 4, 5], ["difficult", 9, 4, 3, 2]]), enemyTiles: ["deck", "difficult"] },
    O: { ...layout("Escotilha do porão", "Aberta no meio do convés. Os mortos sobem por ela.", 10, 6, [["water", 0, 0, 20, 2], ["deck", 0, 2, 20, 12], ["wall", 0, 2, 20, 1], ["obstacle", 4, 4, 1, 1], ["obstacle", 15, 4, 1, 1], ["advantage", 16, 3, 4, 4], ["canopy", 14, 9, 6, 5], ["difficult", 6, 9, 3, 2], ["obstacle", 11, 11, 2, 1]]), enemyTiles: ["deck", "advantage"] },
    center: { ...layout("Leme da nau", "O leme da nau capitânia, no alto do tombadilho.", 15, 7, [["water", 0, 0, 20, 2], ["water", 0, 12, 20, 2], ["deck", 0, 2, 20, 10], ["advantage", 13, 4, 6, 6], ["slope", 11, 6, 2, 2], ["obstacle", 6, 6, 1, 2], ["pit", 3, 4, 2, 2], ["obstacle", 17, 4, 1, 1], ["obstacle", 17, 9, 1, 1], ["difficult", 7, 10, 4, 1]]), enemyTiles: ["deck", "advantage", "slope"] },
    byTask: {
      "Limpar o ninho do cordame": { ...layout("Casulo do marinheiro", "Pendurado na teia entre os dois mastros caídos.", 13, 4, [["water", 0, 0, 20, 14], ["deck", 0, 7, 9, 7], ["deck", 9, 2, 11, 9], ["obstacle", 10, 2, 1, 6], ["obstacle", 16, 4, 1, 6], ["web", 11, 3, 5, 5], ["difficult", 4, 9, 3, 2]]), enemyArea: { minX: 9, maxX: 19, minY: 2, maxY: 10 }, enemyTiles: ["deck", "web"] },
      "Tirar o grumete da sentina": { ...layout("Grumete preso", "Preso sob uma viga caída no fundo da sentina.", 14, 9, [["wall", 0, 0, 20, 1], ["wall", 0, 13, 20, 1], ["swamp", 9, 5, 11, 8], ["slope", 6, 5, 3, 8], ["obstacle", 13, 8, 3, 1], ["obstacle", 4, 2, 2, 2], ["difficult", 11, 1, 5, 3], ["obstacle", 17, 2, 1, 1]]), enemyArea: { minX: 10, maxX: 19, minY: 1, maxY: 6 } },
      "Interceptar a patrulha": { ...layout("Corda do bote", "A criatura escolhida que chegar aqui desce pela corda até um bote e foge.", 18, 1, [["water", 0, 0, 20, 14], ["deck", 0, 6, 10, 8], ["bridge", 10, 8, 4, 1], ["deck", 14, 0, 6, 11], ["difficult", 15, 4, 3, 2], ["obstacle", 16, 8, 2, 1]]), enemyArea: { minX: 10, maxX: 15, minY: 6, maxY: 10 } },
      "Defender a posição avançada": { ...layout("Barricada de barris", "A posição é preparada atrás dos barris, junto à carranca.", 8, 8, [["water", 0, 0, 20, 14], ["deck", 0, 4, 14, 10], ["wall", 0, 3, 14, 1], ["deck", 14, 5, 4, 4], ["advantage", 14, 5, 4, 4], ["obstacle", 18, 6, 1, 2], ["obstacle", 9, 6, 1, 1], ["obstacle", 9, 10, 1, 1], ["difficult", 3, 6, 3, 2]]), enemyTiles: ["deck", "advantage"] }
    }
  }
```

#### Passos

- [ ] **Passo 1: capturar a fixture com o código atual**, antes de qualquer mudança. Use a técnica de `scripts/fixtures/archipelago-sessao-antes-nevoa.json` (seeds `"regressao-cemiterio-1"` a `"regressao-cemiterio-3"`, com uma visita à ilha 21) e grave em `scripts/fixtures/archipelago-sessao-antes-cemiterio.json`.
- [ ] **Passo 2: testes** em `scripts/archipelagoShipGraveyard.test.mjs`, espelhando `scripts/archipelagoMist.test.mjs`:
  - a regressão com a fixture nova, que não contém `ship-graveyard`;
  - os 4 setores com as 3 variantes próprias e a compartilhada, cada um com pelo menos 2 combates sorteáveis e pelo menos 1 teste;
  - o ND 6 de cada combate em três seeds, só com o elenco;
  - o marco de cada combate, conforme a tabela abaixo, e zonas diferentes entre os combates do mesmo setor;
  - os guardiões com ND 8 (`calculateCombatND` dos itens igual a 8, além do orçamento), `briefing` e criatura principal (`capitao-pirata`, `mimico`, `gnoll-cacador-de-cabecas`, nessa ordem) com pelo menos 4 penalidades elegíveis;
  - o terreno ("Cascos encalhados"), a ecologia e o `arenaName`;
  - a origem das criaturas compartilhadas igual à anterior (veja o Foco da revisão, item 2) e a origem `ship-graveyard` para as novas;
  - os inimigos longe do marco em 50 seeds. A distância mínima é 2 na prancha e no grumete, e 3 na patrulha.

  | Combate | Marco |
  |---|---|
  | Segurar a prancha entre os cascos | Ponta da prancha |
  | Limpar o ninho do cordame | Casulo do marinheiro |
  | Fechar o rombo do casco | Rombo do casco |
  | Tirar o grumete da sentina | Grumete preso |
  | Travar o guindaste dos Desmanchadores | Manivela do guindaste |
  | Interceptar a patrulha | Corda do bote |
  | Fechar a escotilha da tripulação | Escotilha do porão |
  | Defender a posição avançada | Barricada de barris |

- [ ] **Passo 3: rodar e ver falhar.** A regressão passa e o resto falha.
- [ ] **Passo 4: implementar** com o conteúdo acima.
- [ ] **Passo 5: rodar e ver passar.** Se algum combate não fechar ND 6 ou alguma criatura principal tiver menos de 4 penalidades, **pare e informe o gerente**, porque o conteúdo foi aprovado pelo PO. Depois rode `npm run test:archipelago`, `npm run test:archipelago-missions` e `npm run test:ecology`: tudo verde.
- [ ] **Passo 6: commit.** `feat: adiciona os dados da Ilha-Cemitério de Navios`

---

### Task 2: Pacote de missões, ativação e documentação

**Modelo:** `sonnet`. Revisão: `sonnet`.

**Arquivos:**
- Modificar:
  - `src/missions/archipelagoMissionThemes.js`: a entrada `"ship-graveyard"`;
  - `src/floorProfiles/archipelago21to30.js`: `"ship-graveyard"` em `enabledThemeIds`, depois de `"mist"`;
  - `scripts/archipelagoState.test.mjs`: os testes que percorrem temas;
  - `scripts/archipelagoShipGraveyard.test.mjs`;
  - `REQUISITOS_ANDARES_21_A_30.md` e `README.md`.

#### Pacote de missões aprovado (transcrever literalmente)

```js
"ship-graveyard": {
  pools: {
    locations: ["um convés inclinado entre dois cascos", "o porão alagado de uma galé antiga", "uma ponte de pranchas sobre a água", "a cabine trancada de um almirante"],
    materials: ["madeira de lei de um casco antigo", "pregos de bronze sem ferrugem", "breu de calafeto ainda mole", "lona de vela encerada"],
    objects: ["um sextante de latão amassado", "o sino de bordo de um navio sem nome", "uma luneta com a lente rachada", "um baú de soldo com o cadeado arrombado", "a bandeira de uma frota que não existe mais"],
    mementos: ["a carta de um marinheiro para a mãe", "um anel de noivado preso num prego", "um retrato pintado numa tampa de caixa", "um apito de contramestre"],
    clues: ["marcas de garras de gnoll nas amuradas", "cordas roídas", "um rastro de lodo que sobe do porão", "nomes de navios riscados num mastro"],
    challenges: ["atravessar de um casco a outro sem cair", "achar o porão certo entre dezenas iguais", "negociar com os Desmanchadores", "sair antes que o casco afunde"],
    phenomena: ["cascos que rangem como se ainda navegassem", "um sino de bordo que toca com a maré", "luzes de lanterna em conveses vazios", "o monte inteiro inclinando quando a maré vira"]
  },
  featured: {
    category: "recovery",
    title: "A bandeira da frota perdida",
    targetName: "a bandeira da frota do almirante",
    lead: "Recupere a bandeira da frota que afundou com o almirante",
    condition: "Achar a bandeira na nau capitânia e trazê-la inteira, antes que os Desmanchadores a vendam",
    proofType: "A bandeira dobrada, com o brasão do almirante."
  },
  map: {
    markers: ["deck", "water", "obstacle", "difficult"],
    landmark: { name: "Mastro dos nomes", effect: "Mastro onde os marinheiros riscaram os nomes dos navios. Ponto de referência da missão." }
  }
}
```

#### Passos

- [ ] **Passo 1: teste da ilha sorteada** em `scripts/archipelagoShipGraveyard.test.mjs`, como o da Névoa:
  - seeds `"cemiterio-0"` a `"cemiterio-199"`;
  - a ilha está entre os andares 21 e 24;
  - `hasIslandSectors` é verdadeiro e os 4 `penaltyId` são distintos;
  - `arenaName === "Nau Capitânia"`;
  - `guardianComposition` é um de `"capitao-dos-ossos"`, `"tesouro-que-morde"` ou `"cacador-de-cabecas"`;
  - o tema de missões existe.
- [ ] **Passo 2: rodar e ver falhar.**
- [ ] **Passo 3: implementar** o pacote e a ativação.
- [ ] **Passo 4: ajustar os testes antigos** em `scripts/archipelagoState.test.mjs`. Não apague nenhuma verificação.
  - `objectiveCounts` passa a incluir `"ship-graveyard": [4, 4, 4, 4]` e continua afirmando que todas as chaves foram exercitadas.
  - `archipelagoBaseInitialRow` também filtra `"ship-graveyard"`.
  - O teste de sorteio passa a "catorze temas ativos": `enabledThemeIds.length === 14`, `includes("ship-graveyard")`, `islands.length === 10` e as fileiras exatas.
- [ ] **Passo 5: rodar tudo.** `npm run test:archipelago`, `npm run test:archipelago-missions`, `npm run test:ecology`, `npm run test:ranges` e `npm run build`: tudo verde.
- [ ] **Passo 6: documentação.**
  - Em `REQUISITOS_ANDARES_21_A_30.md`, acrescente um parágrafo da ilha logo depois do parágrafo da Névoa, no mesmo estilo. Cubra a ideia (masmorra de cascos e os Desmanchadores), os setores, os combates por planta, os guardiões e o Centro "Nau Capitânia".
  - Atualize "treze temas" para catorze e a tabela "Temas da primeira versão" (linha Inicial: oito temas, quatro sorteados).
  - Em "Por onde retomar" e em "Pendências", passe de 10 para 9 temas fora do sorteio. Registre que a fileira inicial está completa.
  - No `README.md`, troque as duas ocorrências de 10 temas fora do sorteio por 9.
- [ ] **Passo 7: commit.** `feat: coloca a Ilha-Cemitério de Navios no sorteio das ilhas iniciais`

---

## Execução

| Tarefa | Implementador | Revisor |
|---|---|---|
| 1. Dados | `sonnet` | `sonnet` |
| 2. Missões, ativação e docs | `sonnet` | `sonnet` |
| Revisão final | — | `opus` |

### Fechamento (gerente)

- Revisão final com `opus`.
- Validação pelo PO no app.
- Atualizar a tabela de etapas e "Onde paramos" na spec, e preparar o ponto de controle das iniciais.
- Depois da validação, apagar `tmp/previas/ilha-cemiterio/`.
