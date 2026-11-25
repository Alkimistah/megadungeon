# Ilha de Névoa — Plano de implementação (etapa 3 de 13)

> **Para agentes:** SUB-SKILL OBRIGATÓRIA: superpowers:subagent-driven-development, conforme `docs/superpowers/processo-de-trabalho.md`. Os passos usam caixas (`- [ ]`).

**Objetivo:** colocar a Ilha de Névoa (`mist`) no sorteio das ilhas iniciais como ilha completa, no padrão de Náufragos e Algas Gigantes: uma planta por combate, ao menos dois combates sorteáveis por setor, pacote de missões e testes.

**Arquitetura:** a ilha é só dados e repete o desenho das Algas Gigantes:
- `src/archipelagoMist.js`, registrado em `SECTOR_ISLANDS` (`mist: mistExploration`, depois de `"giant-kelp"`);
- `islandCreatures.mist` **no fim** da lista;
- `layoutsByTheme.mist` com as plantas de direção e `byTask`;
- o pacote de missões em `archipelagoMissionThemes.js`;
- `arenaName` e a ativação no perfil.

O motor não muda.

**Tecnologias:** JavaScript ES Modules e Vite. Testes com `node --test`.

**Spec:** `docs/superpowers/specs/2026-11-24-ilhas-novas-design.md`. O PO aprovou o conteúdo na prévia `tmp/previas/ilha-nevoa/index.html` em 25/11/2026, que está transcrito abaixo. O PO vetou o Rival Espelho no lugar dos duplos: na megadungeon, a personagem que cai a 0 PV sai da masmorra. Os quatro duplos ficam.

## Restrições globais

- Uma expedição salva antes desta etapa restaura igual depois dela.
- Só criaturas já existentes no catálogo. `islandCreatures.mist` entra no **fim** de `islandCreatures`, e as criaturas compartilhadas mantêm a origem anterior.
- Os testes antigos com seed fixa continuam exercitando todos os temas que já cobriam (agora são sete iniciais para quatro vagas) e afirmam isso explicitamente.
- Textos em português, transcritos literalmente deste plano.
- Só terrenos que a grade já tem. Nenhuma mudança no motor.
- Commits em `main`, em português, terminando com `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Sem push.

## Foco da revisão

1. **Sessão salva antes da etapa.** Ela restaura igual. A fixture nova é capturada antes de qualquer mudança. Tarefa 1.
2. **Origem das criaturas compartilhadas.** Cada uma mantém `getCreatureOriginThemeId` anterior: lacedon (`storm`), zumbi-fantasmagorico (`shipwrecked`), aparicao (`mangrove`), imediato, capitao-pirata e pirata (`pirate-held`), come-sonhos (`tropical`), harpia-saqueadora e coruja-gigante (`storm`). Tarefa 1.
3. **ND exato.** Toda variante de combate fecha ND 6 com o tipo preferido, em três seeds. Cada guardião soma ND 8, inclusive as composições de quatro criaturas. Tarefa 1.
4. **Inimigo colado ao marco.** Nenhum inimigo começa a Chebyshev ≤ 1 do marco em "Manter o sino do cais tocando", "Desmascarar os falsos náufragos" e "Guardar a lanterna da vigília". Em "Interceptar a patrulha", a distância até a saída é ≥ 3. Tarefa 1.
5. **Testes antigos.** "As variantes das quatro ilhas…", a fileira-base de seeds fixas e o teste de sorteio continuam cobrindo todos os temas iniciais, agora com `mist`. Tarefa 2.

---

### Task 1: Dados da Ilha de Névoa

**Modelo:** `sonnet`. Revisão: `sonnet`.

**Arquivos:**
- Criar: `src/archipelagoMist.js` (molde: `src/archipelagoGiantKelp.js`).
- Modificar:
  - `src/archipelagoPilot.js`;
  - `src/archipelagoCreatureRules.js`;
  - `src/archipelagoTacticalMap.js`;
  - `src/floorProfiles/archipelago21to30.js`: `arenaName: "Campanário da Bruma"` no tema `mist`. A ecologia já existe. **Não** ative o tema ainda.
- Criar: `scripts/fixtures/archipelago-sessao-antes-nevoa.json` e `scripts/archipelagoMist.test.mjs`.
- Modificar: `package.json`, incluindo o arquivo novo em `test:archipelago`.

#### Conteúdo aprovado (transcrever literalmente)

**`src/archipelagoMist.js`** (arquivo completo):

```js
export const mistExploration = {
  pilot: "mist-sectors",
  terrain: {
    name: "Bruma fria",
    effect: "Uma névoa espessa e fria cobre a ilha. Os sons chegam de direções erradas, e as vozes se repetem um instante depois.",
    features: [{ name: "Bancos de bruma", effect: "Camuflagem leve para quem está dentro, onde indicado no mapa." }]
  },
  sharedTasks: true,
  sectors: [
    {
      direction: "N", name: "Cais das vozes",
      tasks: [
        ["Seguir a voz verdadeira", "exploração", "Obtenha 3 sucessos antes de 2 falhas. Separe com Percepção o pedido de socorro dos ecos que o repetem, perceba com Intuição qual das vozes mente e conduza o bote entre os pilares do cais com Pilotagem. Cada etapa exige um sucesso. Na segunda falha, o bote encalha num pilar e a voz se cala."],
        ["Manter o sino do cais tocando", "combate", "O sino do cais guia os barcos perdidos na bruma, e os mortos sobem pelas escadas para calá-lo. Vença o combate. Se ao fim de uma rodada houver um adversário adjacente ao sino e nenhuma personagem adjacente a ele, a corda é cortada. Registre sucesso se o grupo vencer com a corda inteira.", "undead"],
        ["Desmascarar os falsos náufragos", "combate", "Os náufragos que pedem ajuda no cais são impostores que imitam vozes conhecidas. O náufrago verdadeiro está amarrado sob as tábuas. Vença o combate. Uma personagem adjacente a ele gasta uma ação padrão para soltá-lo. Registre sucesso se ele for solto até o fim da terceira rodada.", "humanoid"]
      ]
    },
    {
      direction: "S", name: "Aldeia dos Ouvintes",
      tasks: [
        ["Ouvir os Ouvintes da Bruma", "exploração", "Obtenha 3 sucessos antes de 2 falhas. Ganhe a confiança da anciã com Diplomacia, perceba com Intuição o que os Ouvintes repetem sem entender e compare as profecias com Investigação. Cada etapa exige um sucesso. Na segunda falha, a aldeia bate o gongo e fecha as portas."],
        ["Guardar a lanterna da vigília", "combate", "Quando a bruma desce, criaturas pequenas e vultos rondam a aldeia para apagar a lanterna da vigília. Vença o combate. Se um adversário terminar o turno adjacente à lanterna, ela se apaga e a bruma engole a praça. Registre sucesso se o grupo vencer com a lanterna acesa.", "spirit"],
        ["Apagar o braseiro da escuta", "combate", "O vidente reúne os Ouvintes em volta do braseiro para ouvir a bruma. Vença o combate. Uma personagem adjacente ao braseiro gasta uma ação padrão para apagá-lo. Registre sucesso se o braseiro for apagado até o fim da quarta rodada e o grupo vencer.", "humanoid"]
      ]
    },
    {
      direction: "L", name: "Charco das luzes",
      tasks: [
        ["Atravessar sem seguir as luzes", "travessia", "Obtenha 2 sucessos antes de 2 falhas. Reconheça com Misticismo as luzes que enganam e ache o caminho firme com Sobrevivência. Na segunda falha, o grupo segue uma luz falsa e afunda no lodo."],
        ["Recuperar a bússola do capitão", "recuperação", "Obtenha 2 sucessos antes de 2 falhas. Ache com Percepção o brilho da bússola no lodo e puxe-a com Atletismo sem afundar. Na segunda falha, o lodo engole a bússola."],
        ["Calar as harpias do charco", "combate", "As harpias imitam vozes conhecidas para atrair o grupo ao lodo fundo. Vença o combate. Até o fim da quarta rodada, uma personagem adjacente ao ninho gasta uma ação padrão em duas rodadas diferentes para derrubá-lo. Registre sucesso se o grupo vencer e derrubar o ninho.", "monster"]
      ]
    },
    {
      direction: "O", name: "Cemitério dos que esperam",
      tasks: [
        ["Acalmar os que esperam", "ritual", "Obtenha 3 sucessos antes de 2 falhas. Leia com Investigação os nomes gastos nas lápides, reze pelos mortos com Religião e feche o círculo de sal com Misticismo. Cada etapa exige um sucesso. Na segunda falha, os mortos se agitam e o grupo foge do cemitério."],
        ["Achar a lápide trocada", "engenho", "Obtenha 2 sucessos antes de 2 falhas. Compare com Investigação as datas até achar a lápide que alguém trocou e abra o jazigo com Ladinagem sem quebrar o selo. Na segunda falha, o selo quebra e o que estava escrito vira pó."],
        ["Fechar a cripta aberta", "combate", "Os mortos saem por uma cripta aberta no meio do cemitério. Vença o combate. Até o fim da quarta rodada, uma personagem adjacente à porta da cripta gasta uma ação padrão em duas rodadas diferentes para fechá-la. Registre sucesso se o grupo vencer e fechar a cripta.", "undead"]
      ]
    }
  ],
  guardians: [
    { id: "sineiro", name: "O Sineiro", briefing: "O sino rachado do campanário bate sozinho. O sineiro que se afogou tentando guiar o último barco desce pela corda, e a sombra da mulher que o esperava no cais se ergue ao lado dele.", rule: "Memento do sineiro: o sino rachado é o que prende o fantasma a este mundo. Uma personagem adjacente ao sino gasta uma ação padrão em duas rodadas diferentes para tocá-lo. Depois da segunda badalada, o fantasma pode ser destruído normalmente. Se ele chegar a 0 PV antes disso, some e volta no início da rodada seguinte, adjacente ao sino, com todos os PV.", creatures: [{ id: "fantasma", quantity: 1 }, { id: "aparicao", quantity: 1 }] },
    { id: "rostos-emprestados", name: "Os Rostos Emprestados", briefing: "Quatro vultos saem da bruma com os rostos do grupo. Falam com as vozes de vocês e chamam cada um pelo nome.", creatures: [{ id: "duplo", quantity: 4 }] },
    { id: "mestre-dos-ouvintes", name: "O Mestre dos Ouvintes", briefing: "O homem que fala pela bruma espera no alto do campanário. Os três videntes que repetiam as palavras dele na aldeia fecham o círculo em volta do grupo.", creatures: [{ id: "necromante", quantity: 1 }, { id: "falso-vidente", quantity: 3 }] }
  ]
};
```

**Criaturas** (`islandCreatures.mist`, no fim do objeto, depois de `"giant-kelp"`):

```js
mist: [
  "lacedon", "livido", "zumbi-fantasmagorico", "aparicao", "imediato", "capitao-pirata", "fantasma", "alma-acorrentada",
  "come-sonhos", "silfide-travessa", "duende-menor", "duende-maior", "vestigio-da-encruzilhada", "mastim-das-sombras", "corcel-das-trevas",
  "duplo", "falso-vidente", "bruxo-rural", "necromante", "pirata",
  "harpia-saqueadora", "coruja-gigante", "estirge", "enxame-estirge"
]
```

**Plantas** (`layoutsByTheme.mist`, depois de `"giant-kelp"`):

```js
mist: {
    N: { ...layout("Sino do cais", "Pendurado num poste na ponta do cais. A corda desce até as tábuas.", 12, 8, [["water", 0, 0, 20, 9], ["deep-water", 17, 0, 3, 14], ["water", 8, 9, 9, 5], ["wet", 0, 9, 8, 5], ["deck", 4, 7, 12, 3], ["deck", 8, 2, 3, 5], ["obstacle", 6, 6, 1, 1], ["obstacle", 10, 10, 1, 1], ["obstacle", 14, 6, 1, 1], ["concealment", 15, 2, 5, 4], ["concealment", 14, 10, 5, 3]]), enemyArea: { minX: 15, maxX: 19, minY: 0, maxY: 13 } },
    S: { ...layout("Lanterna da vigília", "Num poste no meio da praça. A luz é a única coisa que a bruma não atravessa.", 10, 7, [["clearing", 5, 4, 10, 7], ["wall", 0, 0, 5, 4], ["wall", 14, 0, 6, 3], ["wall", 15, 10, 5, 4], ["wall", 6, 11, 5, 3], ["obstacle", 7, 5, 1, 1], ["obstacle", 12, 9, 2, 1], ["concealment", 15, 3, 5, 5], ["concealment", 0, 4, 3, 4], ["difficult", 11, 11, 4, 3]]), enemyArea: { minX: 14, maxX: 19, minY: 3, maxY: 9 } },
    L: layout("Ninho das harpias", "No alto de um tronco morto, no meio do lodo.", 13, 4, [["swamp", 0, 0, 20, 14], ["clearing", 0, 9, 6, 5], ["clearing", 5, 7, 5, 3], ["clearing", 9, 4, 3, 4], ["water", 12, 6, 4, 4], ["tree", 14, 2, 2, 2], ["tree", 4, 2, 1, 1], ["tree", 17, 11, 1, 1], ["concealment", 15, 8, 5, 4], ["concealment", 3, 1, 5, 3]]),
    O: layout("Porta da cripta", "A laje que fecha a cripta caiu ao lado da entrada.", 11, 6, [["wall", 12, 4, 4, 5], ["door", 12, 6, 1, 1], ["obstacle", 4, 3, 1, 1], ["obstacle", 7, 3, 1, 1], ["obstacle", 4, 6, 1, 1], ["obstacle", 7, 6, 1, 1], ["obstacle", 16, 2, 1, 1], ["obstacle", 18, 2, 1, 1], ["obstacle", 16, 11, 1, 1], ["obstacle", 18, 11, 1, 1], ["obstacle", 8, 10, 1, 1], ["obstacle", 12, 11, 1, 1], ["concealment", 16, 4, 4, 6], ["difficult", 5, 8, 3, 2], ["difficult", 9, 5, 2, 3]]),
    center: layout("Sino rachado", "O sino caiu do campanário e ainda bate sozinho dentro da capela em ruínas.", 12, 6, [["water", 0, 0, 20, 2], ["water", 18, 2, 2, 12], ["wall", 9, 3, 8, 1], ["wall", 9, 9, 8, 1], ["wall", 16, 4, 1, 5], ["wall", 9, 4, 1, 1], ["wall", 9, 8, 1, 1], ["advantage", 14, 4, 2, 2], ["concealment", 3, 2, 5, 4], ["concealment", 11, 10, 6, 3], ["obstacle", 6, 7, 1, 1], ["difficult", 4, 7, 4, 2], ["difficult", 12, 7, 2, 1]]),
    byTask: {
      "Desmascarar os falsos náufragos": { ...layout("Náufrago verdadeiro", "Amarrado sob as tábuas, na base do cais.", 9, 6, [["water", 0, 0, 20, 5], ["deep-water", 0, 0, 20, 2], ["wet", 0, 5, 20, 2], ["deck", 8, 0, 3, 6], ["obstacle", 3, 8, 2, 2], ["obstacle", 14, 8, 3, 2], ["concealment", 12, 2, 5, 3], ["difficult", 15, 11, 4, 2]]), enemyArea: { minX: 12, maxX: 19, minY: 3, maxY: 12 } },
      "Apagar o braseiro da escuta": layout("Braseiro da escuta", "Os Ouvintes se sentam em volta dele, de olhos fechados.", 13, 5, [["clearing", 9, 2, 9, 7], ["advantage", 11, 3, 5, 5], ["obstacle", 11, 2, 1, 1], ["obstacle", 15, 2, 1, 1], ["obstacle", 10, 5, 1, 1], ["obstacle", 16, 5, 1, 1], ["obstacle", 11, 8, 1, 1], ["obstacle", 15, 8, 1, 1], ["wall", 0, 0, 6, 3], ["wall", 3, 4, 3, 2], ["slope", 9, 9, 9, 2], ["concealment", 0, 6, 4, 3], ["difficult", 6, 12, 5, 2]]),
      "Interceptar a patrulha": { ...layout("Saída pela trilha da bruma", "A criatura escolhida que chegar aqui some na bruma.", 18, 1, [["swamp", 0, 0, 20, 14], ["clearing", 0, 8, 14, 4], ["clearing", 11, 3, 3, 6], ["clearing", 13, 1, 7, 3], ["concealment", 15, 4, 5, 5], ["concealment", 3, 2, 6, 4], ["water", 4, 5, 3, 2], ["tree", 8, 2, 2, 2]]), enemyArea: { minX: 7, maxX: 13, minY: 5, maxY: 11 } },
      "Defender a posição avançada": layout("Mausoléu do vigia", "A posição é preparada no degrau do mausoléu.", 8, 8, [["wall", 6, 5, 5, 2], ["advantage", 6, 7, 5, 3], ["slope", 11, 6, 2, 5], ["obstacle", 3, 3, 1, 1], ["obstacle", 15, 3, 1, 1], ["obstacle", 17, 6, 1, 1], ["obstacle", 4, 12, 1, 1], ["concealment", 14, 0, 6, 6], ["difficult", 14, 9, 5, 4]])
    }
  }
```

#### Passos

- [ ] **Passo 1: capturar a fixture com o código atual**, antes de qualquer mudança. Use a técnica de `scripts/fixtures/archipelago-sessao-antes-algas.json` (seeds `"regressao-nevoa-1"` a `"regressao-nevoa-3"`, com uma visita à ilha 21) e grave em `scripts/fixtures/archipelago-sessao-antes-nevoa.json`.
- [ ] **Passo 2: testes** em `scripts/archipelagoMist.test.mjs`, espelhando `scripts/archipelagoGiantKelp.test.mjs`:
  - a regressão com a fixture nova, que não contém `mist`;
  - os 4 setores com as 3 variantes próprias e a compartilhada, cada um com pelo menos 2 combates sorteáveis e pelo menos 1 teste;
  - o ND 6 de cada combate em três seeds, só com o elenco;
  - o marco de cada combate, conforme a tabela abaixo, e zonas diferentes entre os combates do mesmo setor;
  - os guardiões com ND 8, `briefing`, criatura principal (`fantasma`, `duplo`, `necromante`, nessa ordem) com pelo menos 4 penalidades elegíveis e a `rule` presente só no Sineiro;
  - o terreno ("Bruma fria"), a ecologia e o `arenaName`;
  - a origem das criaturas compartilhadas igual à anterior (veja o Foco da revisão, item 2) e a origem `mist` para as criaturas novas no arquipélago;
  - os inimigos longe do marco em 50 seeds. A distância mínima é 2 no sino, nos falsos náufragos e na lanterna, e 3 na patrulha.

  | Combate | Marco |
  |---|---|
  | Manter o sino do cais tocando | Sino do cais |
  | Desmascarar os falsos náufragos | Náufrago verdadeiro |
  | Guardar a lanterna da vigília | Lanterna da vigília |
  | Apagar o braseiro da escuta | Braseiro da escuta |
  | Calar as harpias do charco | Ninho das harpias |
  | Interceptar a patrulha | Saída pela trilha da bruma |
  | Fechar a cripta aberta | Porta da cripta |
  | Defender a posição avançada | Mausoléu do vigia |

- [ ] **Passo 3: rodar e ver falhar.** A regressão passa e o resto falha.
- [ ] **Passo 4: implementar** com o conteúdo acima.
- [ ] **Passo 5: rodar e ver passar.** Se algum combate não fechar ND 6 ou alguma criatura principal tiver menos de 4 penalidades, **pare e informe o gerente**, porque o conteúdo foi aprovado pelo PO. Depois rode `npm run test:archipelago`, `npm run test:archipelago-missions` e `npm run test:ecology`: tudo verde.
- [ ] **Passo 6: commit.** `feat: adiciona os dados da Ilha de Névoa`

---

### Task 2: Pacote de missões, ativação e documentação

**Modelo:** `sonnet`. Revisão: `sonnet`.

**Arquivos:**
- Modificar:
  - `src/missions/archipelagoMissionThemes.js`: a entrada `mist`;
  - `src/floorProfiles/archipelago21to30.js`: `"mist"` em `enabledThemeIds`, depois de `"giant-kelp"`;
  - `scripts/archipelagoState.test.mjs`: os testes que percorrem temas;
  - `scripts/archipelagoMist.test.mjs`;
  - `REQUISITOS_ANDARES_21_A_30.md` e `README.md`.

#### Pacote de missões aprovado (transcrever literalmente)

```js
mist: {
  pools: {
    locations: ["um cais de tábuas que some na bruma", "a praça de uma aldeia de portas fechadas", "um charco de luzes que se movem", "um cemitério de lápides sem data"],
    materials: ["orvalho recolhido da bruma ao amanhecer", "sal do círculo dos Ouvintes", "cera das velas da vigília", "musgo pálido das lápides"],
    objects: ["a bússola de um capitão desaparecido", "um sino de mão rachado", "uma lanterna de vigia com o vidro fumê", "o diário de bordo de um barco que nunca chegou", "uma corneta de nevoeiro de latão"],
    mementos: ["uma aliança presa num barbante", "um retrato com o rosto raspado", "uma carta que termina no meio da frase", "um lenço bordado com o nome de um barco"],
    clues: ["pegadas que andam em círculo", "uma voz que repete a última frase do grupo", "lápides com o mesmo nome e datas diferentes", "marcas de corda no poste do sino"],
    challenges: ["seguir a voz certa no meio dos ecos", "manter o grupo junto na bruma", "separar a profecia da mentira", "achar o caminho de volta ao bote"],
    phenomena: ["vozes conhecidas chamando de longe", "um sino que bate sem ninguém tocar", "a bruma se abrindo só em volta de uma lanterna", "passos que acompanham o grupo e param quando ele para"]
  },
  featured: {
    category: "investigation",
    title: "A verdade sob a bruma",
    targetName: "o que aconteceu com o último barco do sineiro",
    lead: "Descubra por que o sino do campanário ainda chama barcos que não existem",
    condition: "Reunir o diário de bordo, a lápide trocada e o relato do náufrago verdadeiro, e apontar quem mentiu",
    proofType: "Relatar o que houve com o último barco e entregar a página arrancada do diário."
  },
  map: {
    markers: ["concealment", "swamp", "wet", "obstacle"],
    landmark: { name: "Pedra dos ecos", effect: "Rocha alta onde as vozes da bruma chegam mais nítidas. Ponto de referência da missão." }
  }
}
```

#### Passos

- [ ] **Passo 1: teste da ilha sorteada** em `scripts/archipelagoMist.test.mjs`, como o das Algas:
  - seeds `"nevoa-0"` a `"nevoa-199"`;
  - a ilha está entre os andares 21 e 24;
  - `hasIslandSectors` é verdadeiro e os 4 `penaltyId` são distintos;
  - `arenaName === "Campanário da Bruma"`;
  - `guardianComposition` é um de `"sineiro"`, `"rostos-emprestados"` ou `"mestre-dos-ouvintes"`;
  - o tema de missões existe.
- [ ] **Passo 2: rodar e ver falhar.**
- [ ] **Passo 3: implementar** o pacote e a ativação.
- [ ] **Passo 4: ajustar os testes antigos** em `scripts/archipelagoState.test.mjs`. Não apague nenhuma verificação.
  - `objectiveCounts` passa a incluir `mist: [4, 4, 4, 4]` e continua afirmando que todas as chaves foram exercitadas.
  - `archipelagoBaseInitialRow` também filtra `"mist"`, para manter só os quatro temas originais.
  - O teste de sorteio passa a "treze temas ativos": `enabledThemeIds.length === 13`, `includes("mist")`, `islands.length === 10` e as fileiras exatas.
- [ ] **Passo 5: rodar tudo.** `npm run test:archipelago`, `npm run test:archipelago-missions`, `npm run test:ecology`, `npm run test:ranges` e `npm run build`: tudo verde.
- [ ] **Passo 6: documentação.**
  - Em `REQUISITOS_ANDARES_21_A_30.md`, acrescente um parágrafo da ilha logo depois do parágrafo das Algas Gigantes, no mesmo estilo. Cubra a ideia (ecos falsos e os Ouvintes da Bruma), os setores, os combates por planta, os guardiões (com a regra Memento do Sineiro) e o Centro.
  - Atualize "doze temas" para treze e a tabela "Temas da primeira versão" (linha Inicial: sete temas, quatro sorteados).
  - Em "Por onde retomar" e em "Pendências", passe de 11 para 10 temas fora do sorteio.
  - No `README.md`, troque "Os 11 temas fora do sorteio" por "Os 10 temas fora do sorteio".
- [ ] **Passo 7: commit.** `feat: coloca a Ilha de Névoa no sorteio das ilhas iniciais`

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
- Atualizar a tabela de etapas e "Onde paramos" na spec.
- Depois da validação, apagar `tmp/previas/ilha-nevoa/`.
