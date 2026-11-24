# Terrenos agrupados na grade tática — Plano de implementação

> **Para agentes:** SUB-SKILL OBRIGATÓRIA: superpowers:subagent-driven-development, conforme `docs/superpowers/processo-de-trabalho.md`. Os passos usam caixas (`- [ ]`).

**Objetivo:** fazer os terrenos que formam áreas parecerem uma peça só na grade tática. O miolo da área fica liso, e borda, face e sombra aparecem só no contorno. A porta passa a ser desenhada sobre o chão, e o toldo fica acima das peças, com transparência.

**Arquitetura:**
- Um helper puro em `src/tacticalTerrain.js` calcula, para cada casa, as classes de contorno (`edge-top/right/bottom/left`) e, nas portas, a orientação e as junções.
- `src/tacticalMapRenderer.js` aplica essas classes nas casas, do mesmo jeito que já faz com a margem da água (`shore-*`).
- O desenho fica em CSS (`src/tacticalTerrain.css`), sem mexer no atlas.
- As casas do toldo (feature `canopy`) passam a ser desenhadas numa camada própria, por cima das peças, com `pointer-events: none`.

**Tecnologias:** JavaScript ES Modules, CSS e Vite. Testes com `node --test` e QA com Playwright.

**Spec:** este é um ajuste visual aprovado pelo PO na prévia `tmp/previas/elevacao/index.html`. Os seletores e as cores do bloco `/* ===== Proposta: autotile ===== */` dessa página são a referência e devem ser copiados. Na prévia, as classes são `is-auto` e `edge-*`.

**Pedidos do PO na aprovação:**
1. O toldo da liburna fica **por cima das peças**, inclusive dos jogadores, mas as peças continuam selecionáveis.
2. O toldo ganha **obstáculos no meio**, que funcionam como o mastro de apoio.

## Restrições globais

- O atlas `public/assets/tactical-terrain.png` não muda. As legendas (`tactical-swatch`) continuam com o sprite atual.
- O comportamento de jogo não muda: movimento, ocupação, alcance e testes de terreno ficam iguais. Isso vale para tudo, exceto os obstáculos novos do toldo (pedido 2).
- Água, água funda, correnteza, lava, gelo, pântano, área molhada, parede, tábuas, árvore, pedra, mato, teia e vento continuam como estão.
- Commits em `main`, em português, terminando com `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Sem push.

## Foco da revisão

1. **Especificidade do CSS.** A regra do sprite (`.tactical-sprite[class*="is-"]:not(.tactical-marker-sprite)`) não pode vencer a do autotile, senão o degrau antigo volta por baixo. Verificação no QA visual da Tarefa 1.
2. **Bordas da grade.** Casas na borda do mapa contam como contorno (`edge-*`). Teste na Tarefa 1.
3. **Peças sob o toldo.** Uma peça embaixo do toldo continua clicável e arrastável, e o toldo não bloqueia o clique. QA na Tarefa 2.
4. **Porta sem paredes vizinhas.** Uma porta solta no chão fica deitada por padrão e não quebra. Teste na Tarefa 1.
5. **Sessões de mapa já abertas.** O estado salvo das peças e dos mapas (`tacticalEncounterSession`) não depende das classes novas, porque elas são só de renderização. A suíte `tacticalEncounterSession.test.mjs` continua verde nas duas tarefas.

---

### Task 1: Contorno dos terrenos agrupados e porta sobre o chão

**Modelo:** `sonnet`. Revisão: `sonnet`.

**Arquivos:**
- Modificar: `src/tacticalTerrain.js`: constantes e helper.
- Modificar: `src/tacticalMapRenderer.js`: em `renderTacticalGrid`, aplicar as classes ao criar cada `tactical-cell`.
- Modificar: `src/tacticalTerrain.css`: as regras do autotile e da porta, copiadas da prévia com os seletores adaptados.
- Modificar: `scripts/tacticalScene.test.mjs`: testes do helper.

**Interfaces:**
- Produz `export const TERRAIN_AUTOTILE_JOINS`, com o mapa de tipos que se ligam sem borda (o mesmo `JOINS` da prévia):

  | Tipo | Liga com |
  |---|---|
  | `advantage` | `advantage`, `slope`, `gentle-slope`, `steep-slope` |
  | `slope` | `slope`, `advantage` |
  | `gentle-slope` | `gentle-slope`, `advantage` |
  | `steep-slope` | `steep-slope`, `advantage` |
  | `pit` | `pit` |
  | `abyss` | `abyss` |
  | `trench` | `trench` |
  | `cliff` | `cliff`, `escarpment` |
  | `escarpment` | `escarpment`, `cliff` |
  | `canopy` | `canopy` |

- Produz `export function getTerrainTileClasses(terrain: string[], width: number, index: number): string[]`:
  - Para tipos em `TERRAIN_AUTOTILE_JOINS`, devolve `["is-auto", ...edge-<lado>]`. Cada lado tem borda quando o vizinho daquele lado está fora da grade ou não está na lista de ligação.
  - Para `door`, devolve `["is-auto", "door-v" | "door-h", ...join-<lado>]`:
    - **`door-v`** quando há `wall` ou `door` acima ou abaixo **e** não há `wall` à esquerda nem à direita;
    - **`door-h`** nos outros casos, inclusive a porta solta;
    - **`join-<lado>`** para cada vizinho que também é `door`.
  - Para os demais tipos, devolve `[]`.

#### Passos

- [ ] **Passo 1: testes que falham** em `scripts/tacticalScene.test.mjs`:
  - `test("terrenos agrupados só têm borda no contorno")`:
    - Numa grade 5×4 com um bloco `advantage` de 3×2 em (1,1), a casa (2,1) tem `edge-top` e não tem `edge-bottom`, `edge-left` nem `edge-right`.
    - A casa (1,2) tem `edge-bottom` e `edge-left`.
    - Uma casa `advantage` isolada tem as 4 bordas.
    - Uma casa `advantage` acima de uma `slope` não tem `edge-bottom`.
    - Uma casa `pit` no canto (0,0) da grade tem `edge-top` e `edge-left`.
    - `floor` devolve `[]`.
  - `test("porta fica deitada ou em pé conforme as paredes")`:
    - Uma porta entre `wall` à esquerda e à direita gera `door-h`.
    - Uma porta entre `wall` acima e abaixo gera `door-v`.
    - Duas portas empilhadas numa parede vertical geram `door-v`, a de cima com `join-bottom` e a de baixo com `join-top`.
    - Uma porta solta gera `door-h` sem `join-*`.
- [ ] **Passo 2: rodar e ver falhar.** `node --test scripts/tacticalScene.test.mjs`.
- [ ] **Passo 3: implementar** o helper e aplicá-lo no renderer, acrescentando as classes à `tactical-cell`. Copie o CSS da prévia para `src/tacticalTerrain.css`:
  - Use o seletor `.tactical-cell.tactical-sprite.is-auto…` (ou mais específico), para vencer a regra do sprite.
  - A porta mantém o sprite do chão por baixo (`--tactical-sprite-x: 0%`) e é desenhada num `::before`.
  - Não use o `::before` das outras casas, porque `shore-*` já usa esse pseudo-elemento na água. O contorno vai no `::after`.
  - Inclua as variantes de vantagem, inclinação, inclinação suave e íngreme, buraco, abismo, fosso, penhasco, paredão, toldo e porta.
- [ ] **Passo 4: rodar.**
  - Os testes: `npm run test:ranges`, `node --test scripts/tacticalScene.test.mjs scripts/tacticalEncounterSession.test.mjs scripts/extendedTacticalMap.test.mjs scripts/dungeonTacticalLayouts.test.mjs scripts/forestTacticalLayouts.test.mjs`, `npm run test:archipelago` e `npm run build`. Tudo verde.
  - O QA visual: com `npm run dev`, abra um mapa com vantagem agrupada (por exemplo o Centro dos Náufragos ou o Observatório da Tropical) e tire uma captura. Confira que o platô aparece liso, sem os degraus do sprite. Grave a captura no relatório, não no repositório.
- [ ] **Passo 5: commit.** `feat: terrenos agrupados com contorno único e porta sobre o chão na grade tática`

---

### Task 2: Toldo por cima das peças e mastro de apoio na liburna

**Modelo:** `sonnet`. Revisão: `sonnet`.

**Arquivos:**
- Modificar: `src/tacticalMapRenderer.js`. As features `canopy` deixam de ir para dentro da casa (`addOverlay`). Elas passam a ser desenhadas numa camada `tactical-canopy-layer`, anexada ao grid **depois** de `tactical-piece-layer`. Essa camada é uma grade absoluta com as mesmas colunas e linhas, e cada casa de toldo recebe `is-canopy`, `is-auto` e as classes `edge-*`, calculadas sobre os índices da feature com a mesma regra de `TERRAIN_AUTOTILE_JOINS.canopy`.
- Modificar: `src/tacticalTerrain.css`: `.tactical-canopy-layer` com `position: absolute; inset: 0; pointer-events: none; display: grid` e as mesmas colunas e linhas da grade, `z-index` acima das peças, e as casas do toldo com o visual de lona da prévia e `opacity: 0.7`.
- Modificar: `src/archipelagoBoatAmbush.js`: duas zonas de obstáculo sob o toldo. Use `{ x: 16, y: 6, width: 1, height: 2, tile: "obstacle", featureType: "obstacle", id: "stern-canopy-mast", label: "Mastro do toldo" }`, numa feature `{ id: "stern-canopy-mast", name: "Mastro do toldo", effect: "O mastro de apoio sustenta a lona no meio da popa." }` incluída em `deck.features`.
- Modificar: os testes da liburna, em `scripts/archipelagoState.test.mjs` ou no teste que já cobre `applyLiburnaLayout`.
- Modificar: `scripts/qaTacticalScene.mjs` ou `scripts/qaTacticalSceneFlows.mjs`, para incluir uma checagem do toldo.

**Interfaces:**
- Consome: `getTerrainTileClasses` e `TERRAIN_AUTOTILE_JOINS` da Tarefa 1. Se precisar, extraia `getAutotileEdges(isSameGroup, width, height, index)` para reutilizar no toldo, que trabalha com índices da feature e não com o array de terreno.

#### Passos

- [ ] **Passo 1: testes que falham.**
  - **Teste da liburna:** o mapa da emboscada no convés tem as casas (16,6) e (16,7) como obstáculo com o rótulo "Mastro do toldo", e nenhuma peça inicial ocupa essas casas.
  - **QA:** no mapa da liburna, o elemento `.tactical-canopy-layer` existe depois de `.tactical-piece-layer` e tem `pointer-events` igual a `none`. Um clique numa peça sob o toldo seleciona a peça. Se não houver peça sob o toldo no início, mova uma para lá pelo estado da sessão ou pelo teclado, como os fluxos de QA existentes já fazem.
- [ ] **Passo 2: rodar e ver falhar.**
- [ ] **Passo 3: implementar** a camada, o CSS e os obstáculos.
- [ ] **Passo 4: rodar.** As suítes da Tarefa 1 mais o QA do toldo: tudo verde. Tire uma captura da liburna com uma peça sob o toldo e grave-a no relatório.
- [ ] **Passo 5: commit.** `feat: toldo da liburna por cima das peças e mastro de apoio`

---

### Fechamento (gerente)

- Revisão final com `opus`.
- Validação do PO no app: Farol e Observatório (vantagem), Ilha Flutuante (abismo), uma masmorra com portas, a liburna com o toldo e uma peça embaixo dele.
- Depois da validação, apagar `tmp/previas/elevacao/` e `tmp/previas/ilha-naufragos/`.
