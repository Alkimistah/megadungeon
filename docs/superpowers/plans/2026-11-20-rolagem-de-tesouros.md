# Rolagem de tesouros Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Criar a modal Tesouros, com as abas Rolar (lote) e Consultar (cadeia guiada pelos dados físicos), a partir das Tabelas 8-1 a 8-15 do Livro Básico e das listas de itens de Ameaças, Heróis e Deuses.

**Architecture:** As tabelas são dados puros em `src/treasure/tables/`. Um motor de passos puro (`treasureEngine.js`) resolve cadeias pedindo cada valor a uma fonte: o RNG na aba Rolar e o valor digitado na aba Consultar. `treasureSummary.js` agrega os ganhos. A modal (`treasureDialog.js`) é carregada com `import()`.

**Tech Stack:** JavaScript ES Modules, Vite, `node:test`, Playwright com Chrome do sistema.

**Spec:** `docs/superpowers/specs/2026-11-20-rolagem-de-tesouros-design.md`

## Execução

O processo segue `docs/superpowers/processo-de-trabalho.md`. Os níveis de modelo por tarefa são:

| Tarefa | Implementador | Revisor |
|---|---|---|
| 1. Tabelas 8-1 e 8-2 | sonnet | sonnet |
| 2. Tabelas de itens | sonnet | sonnet |
| 3. Tabelas mágicas | sonnet | sonnet |
| 4. Motor: dinheiro e riquezas | opus | opus |
| 5. Motor: itens e regras especiais | opus | opus |
| 6. Agregação | haiku | sonnet |
| 7. Botão, modal e carregamento | sonnet | sonnet |
| 8. Aba Rolar | sonnet | sonnet |
| 9. Aba Consultar | sonnet | sonnet |
| 10. Listas dos outros livros | sonnet | sonnet |
| 11. Documentação e validação | haiku | sonnet |
| Revisão final do branch | — | opus |

## Global Constraints

- Sem dependências novas e sem framework.
- Faixas d% das tabelas idênticas às impressas. Nenhuma renumeração.
- ND da Tabela 8-1: `0.25`, `0.5`, `1` a `20`. Não existe linha 3/4.
- Moedas: TC = T$ 0,1 e TO = T$ 10 (Livro Básico, p. 140).
- +%: soma 20 ao d% seguinte de tipo de riqueza ou poção, com máximo de 100.
- 2D na aba Rolar: rolar 2d6. Se os dados forem iguais, usar esse valor; se forem diferentes, sortear um dos dois com chance igual. O passo guarda os dois dados e o escolhido.
- Encanto ou melhoria repetidos no mesmo item: rolar de novo.
- Metade: dividir o valor final de cada resultado de Dinheiro, moedas e riquezas, sem mudar a quantidade de riquezas. Frações descem para a moeda menor, e o que ficar abaixo de 1 TC é descartado.
- Lote temporário: nada vai para o código de sessão nem para o storage.
- Referência de cada tabela e lista: livro, página impressa e página do PDF integral em `tmp/livros/`. Livro Básico: PDF = impressa + 6.
- Textos de interface em português, como as modais existentes.

## Review Focus

- Rolagem d% com +% acima de 100 limitada a 100: um 95+20 em tabela de poção cai na última faixa.
- Item menor que rola encanto que “conta como dois”: rola de novo e não entra em laço infinito, porque existem faixas válidas.
- Lote com Quantidade 99 e Dobro em ND 20: a modal continua responsiva. O teste mede o tempo de `resolveWithDice` para 198 cadeias, abaixo de 500 ms.
- Consultar com valor fora do dado, como 0, 101 ou texto: o passo recusa e mantém o estado.
- Modal aberta offline antes do primeiro uso: funciona porque o chunk é pré-carregado em idle depois da carga do app.

---

### Task 1: Esquema das tabelas, validador e Tabelas 8-1 e 8-2

**Files:**
- Create: `src/treasure/tables/schema.js`, `src/treasure/tables/basicBook.js`
- Create: `scripts/treasure.test.mjs`
- Modify: `package.json` (script `"test:treasure": "node scripts/treasure.test.mjs"`)

**Interfaces:**
- Produces: `BASIC_BOOK_TABLES: Record<string, TreasureTable>`, com
  `TreasureTable = { id, title, book, bookPage, pdfPage, die: "d%"|"1d6", rows: Row[] }` e
  `Row = { min, max, result, flags?: { bonus20?: true, twoDice?: true }, constraint?: Constraint }`.
  A 8-1 usa os ids `"8-1/<nd>/money"` e `"8-1/<nd>/items"`, com nd em `"0.25"`, `"0.5"` e `"1"` a `"20"`. A 8-2 usa `"8-2/menor"`, `"8-2/média"` e `"8-2/maior"`.
- Produces: `validateTable(table) -> string[]` (lista de erros) em `schema.js`, e `RESULT_KINDS`, conforme a tabela de `kind` do spec.

- [ ] **Step 1: Testes.** `"every basic book table covers its die without gaps"`: para cada tabela, `validateTable` devolve `[]`. As faixas cobrem de 1 a 100 (d%) ou de 1 a 6, sem lacuna nem sobreposição, e as faixas `"—"` da 8-2 são omitidas. `"table 8-1 matches printed rows"`: `8-1/7/money` tem 4 linhas, a de 61–90 é `{ kind: "money", dice: "2d12", multiplier: 10, currency: "TO" }`. `8-1/12/money`, linha 11–45, é `{ kind: "wealth", count: 1, tier: "média" }` com `flags.bonus20`. `8-1/20/items`, linha 51–100, é `{ kind: "magic", tier: "maior" }` com `flags.twoDice`. `"table 8-2 values"`: `8-2/menor`, linha 01–25, é `{ kind: "wealthValue", dice: "4d4", multiplier: 1, average: 10 }`. `8-2/maior`, linha 96–100, tem `dice: "4d12", multiplier: 10000`.
- [ ] **Step 2: Rodar** `npm run -s test:treasure` e confirmar a falha por módulo ausente.
- [ ] **Step 3: Transcrever** a 8-1 (PDF 334–335) e a 8-2 (PDF 336) das páginas renderizadas. Use o texto extraído com `pdfjs-dist` como rascunho e confira cada linha na imagem. Os exemplos da 8-2 vão em `examples`. As marcas sobrescritas `+%` e `2D` aparecem só na imagem.
- [ ] **Step 4: Rodar** `npm run -s test:treasure` e ver passar.
- [ ] **Step 5: Commit** `feat: transcreve as tabelas 8-1 e 8-2 de tesouro`.

### Task 2: Tabelas de itens 8-3, 8-4, 8-5 e 8-12

**Files:**
- Modify: `src/treasure/tables/basicBook.js`
- Test: `scripts/treasure.test.mjs`

**Interfaces:**
- Produces: `"8-3"`, `"8-4/arma"`, `"8-4/armadura"`, `"8-4/esotérico"`, `"8-5/arma"`, `"8-5/armadura"`, `"8-5/esotérico"` e `"8-12"`. Itens finais: `{ kind: "item", name, price, category }`. Melhorias: `{ kind: "improvement", name, special?, subroll? }`, com `special: "counts-as-two"` para “Conta como duas melhorias. Se o item só possuir uma, role novamente.”. `subroll: { die: "1d6", options: [...] }` serve para o material.
- Produces: `TYPE_ROLLS = { equipment: [[1,3,"arma"],[4,5,"armadura"],[6,6,"esotérico"]], magic: [[1,2,"arma"],[3,3,"armadura"],[4,6,"acessório"]] }`, conforme o Livro Básico, p. 330.

- [ ] **Step 1: Testes.** O validador passa em todas as tabelas novas. A contagem de linhas de cada tabela é fixada no teste, com o número conferido na página renderizada. Ao menos uma linha por tabela é conferida em detalhe, sendo uma delas a que tem `subroll` de material. `TYPE_ROLLS` está como acima.
- [ ] **Step 2: Rodar** e ver falhar.
- [ ] **Step 3: Transcrever** PDF 337 (8-3, 8-4), 338 (8-5) e 347 (8-12), com as notas de rodapé.
- [ ] **Step 4: Rodar** e ver passar.
- [ ] **Step 5: Commit** `feat: transcreve as tabelas de itens diversos, equipamento, superiores e poções`.

### Task 3: Tabelas mágicas 8-7 a 8-11 e 8-13 a 8-15

**Files:**
- Modify: `src/treasure/tables/basicBook.js`
- Test: `scripts/treasure.test.mjs`

**Interfaces:**
- Produces: `"8-8"` (encantos de arma), `"8-9"` (armas específicas), `"8-10"` (encantos de armadura e escudo), `"8-11"` (armaduras e escudos específicos), `"8-13"`, `"8-14"` e `"8-15"` (acessórios menores, médios e maiores), e `ENCHANTMENT_COUNT = { menor: 1, médio: 2, maior: 3 }`.
- Encantos: `{ kind: "enchantment", name, special? }`, com os valores de `special`:
  - `"specific"`: a linha de arma ou armadura específica.
  - `"counts-as-two"`: “Conta como dois encantos. Para itens menores, role novamente.”
  - `"shield-only"`: “Apenas escudos. Para armaduras, role novamente.”
- Encantos com `subroll`: Anticriatura (1d6 de tipo de criatura).

- [ ] **Step 1: Testes.** O validador passa nas tabelas novas. A linha 91–100 da 8-8 tem `special: "specific"`. Existe ao menos uma linha `counts-as-two` na 8-8 e uma `shield-only` na 8-10. A contagem de linhas de cada tabela é fixada.
- [ ] **Step 2: Rodar** e ver falhar.
- [ ] **Step 3: Transcrever** PDF 342–349.
- [ ] **Step 4: Rodar** e ver passar.
- [ ] **Step 5: Commit** `feat: transcreve as tabelas de itens mágicos`.

### Task 4: Motor de passos, com dinheiro, riquezas, Metade, Dobro e +%

**Files:**
- Create: `src/treasure/dice.js`, `src/treasure/treasureEngine.js`
- Test: `scripts/treasure.test.mjs`

**Interfaces:**
- Produces, em `dice.js`: `parseDice("2d6+1") -> { count, sides, bonus }`, `rollDice(expr, rng) -> { total, rolls }` e `dieRange(die) -> [min, max]`.
- Produces, em `treasureEngine.js`:
  - `startTreasure({ challengeRating, column: "money"|"items", mode: "padrão"|"metade"|"dobro" }) -> State[]`. Devolve dois estados em Dobro.
  - `startTable(tableId, { tier? }) -> State`.
  - `nextStep(state) -> Request | null`, com `Request = { id, tableId, die, bonus, reason, kind: "table"|"expression"|"twoDice" }`.
  - `applyRoll(state, value, extra?) -> State`. `extra` serve para `{ dice: [a, b] }` no 2D. Um valor inválido dispara `RangeError` e não altera o estado.
  - `resolveWithDice(state, rng) -> State`.
  - `State = { steps: Step[], gains: Gain[], pending: Request[] }`, com `Gain = { kind: "money", amount, currency } | { kind: "wealth", value, examples } | { kind: "item", name, category, price, details }`.

- [ ] **Step 1: Testes** com uma fonte fixa (lista de valores):
  - `8-1/7/money` com d% 70 e 2d12 = 15 dá `gains = [{ money, amount: 150, currency: "TO" }]`.
  - Metade do mesmo resultado dá 75 TO.
  - Metade de uma riqueza menor de 4d4 com total 11 dá 5,5 T$, guardado como `amount: 5.5, currency: "T$"`. Valores em T$ mantêm uma casa decimal (TC), e o que ficar abaixo de 0,1 T$ é descartado.
  - Dobro gera dois estados.
  - `8-1/12/money` com d% 20, depois o d% da 8-2 informado como 85: aplica +20, limitado a 100, e consulta a linha 100 de `8-2/média`.
  - `1d3+1 riquezas menores` com contagem 3 gera três consultas à 8-2.
  - `applyRoll` com 0 ou 101 em d% dispara `RangeError`.
  - Teste de desempenho: 198 cadeias de ND 20 em Dobro resolvidas em menos de 500 ms.
- [ ] **Step 2: Rodar** e ver falhar.
- [ ] **Step 3: Implementar.** O +% vive no `Request.bonus` do passo seguinte. Metade é aplicada ao registrar o `Gain` de dinheiro. O arredondamento segue as Global Constraints.
- [ ] **Step 4: Rodar** e ver passar.
- [ ] **Step 5: Commit** `feat: cria o motor de tesouros com dinheiro e riquezas`.

### Task 5: Motor de itens, com equipamento, superior, poções, mágicos, 2D, restrições e repetições

**Files:**
- Modify: `src/treasure/treasureEngine.js`
- Test: `scripts/treasure.test.mjs`

**Interfaces:**
- Consumes: Tasks 2–4.
- Produces: o `Gain` de item com `details = { enchantments?: string[], improvements?: string[], material?, specific?: true }` e `name` completo, por exemplo `"Espada longa (ameaçadora)"`.

- [ ] **Step 1: Testes:**
  - Equipamento: tipo 2, arma, mais o d% da 8-4 dá o item da linha.
  - Superior com 2 melhorias: duas consultas à 8-5 do tipo certo. Uma melhoria repetida gera nova rolagem registrada com `reason: "repetida"`. `counts-as-two` num item de 1 melhoria gera nova rolagem com `reason: "conta como duas"`.
  - Poções: `1d3+1` com +% aplica +20 a cada d% da 8-12.
  - Mágico menor, arma: 1 encanto. O resultado `specific` troca pela 8-9 e descarta os encantos. `counts-as-two` em item menor rola de novo. `shield-only` em armadura rola de novo.
  - Acessório médio: consulta a 8-14.
  - 2D com `rng` determinístico e dados 3 e 3: vale 3, sem sorteio. Dados 2 e 6: escolhe um dos dois, e o passo guarda `{ dice: [2, 6], chosen }`. Em 1.000 sorteios, cada lado fica entre 40% e 60%.
  - Sub-rolagem de material registrada como passo.
- [ ] **Step 2: Rodar** e ver falhar.
- [ ] **Step 3: Implementar.** As restrições e as repetições são verificadas em `applyRoll`, que enfileira o mesmo `Request` com o novo `reason`.
- [ ] **Step 4: Rodar** e ver passar.
- [ ] **Step 5: Commit** `feat: resolve itens, encantos e regras especiais no motor de tesouros`.

### Task 6: Agregação do lote

**Files:**
- Create: `src/treasure/treasureSummary.js`
- Test: `scripts/treasure.test.mjs`

**Interfaces:**
- Produces: `summarizeGains(gains) -> { coins: { TC, "T$", TO }, totalTibars, wealth: [{ value, examples }], items: [{ name, category, price, quantity }] }`. `totalTibars` é igual a `TC / 10 + T$ + TO * 10`, e os itens são agrupados por `name`.

- [ ] **Step 1: Teste:** 35 TC, 200 T$, 3 TO, duas riquezas e dois itens iguais dão `totalTibars` 233,5 e o item com `quantity: 2`.
- [ ] **Step 2:** Rodar e ver falhar. **Step 3:** Implementar. **Step 4:** Rodar e ver passar.
- [ ] **Step 5: Commit** `feat: agrega os ganhos do lote de tesouros`.

### Task 7: Botão, modal e carregamento sob demanda

**Files:**
- Modify: `index.html` (botão `#treasureButton` em `.floating-tools`, depois de `#missionButton`, com o ícone `streamline-cyber--treasure-chest-open.svg` e `aria-label="Rolar tesouros"`; `<dialog id="treasureDialog">` com abas `Rolar` e `Consultar`)
- Modify: `src/main.js` (no clique, `import("./treasure/treasureDialog.js")` e `openTreasureDialog(dialogElement)`; em `requestIdleCallback`, ou `setTimeout` como alternativa, pré-carregar o módulo)
- Create: `src/treasure/treasureDialog.js`
- Modify: CSS das modais (arquivo usado por `manualEncounterDialog`)
- Delete: `public/assets/icons/streamline-freehand--role-playing-games-icon-weapon-equipment-crate-chest.svg`, o ícone não escolhido, só se você confirmar.

**Interfaces:**
- Produces: `openTreasureDialog(dialog: HTMLDialogElement): void`. Fecha com o botão padrão de fechar e alterna as abas por botões com `aria-selected`.

- [ ] **Step 1: QA.** `scripts/qaTreasure.mjs` abre o app no dev server, clica em `#treasureButton` e confere a modal aberta e as duas abas, sem `pageerror`. O roteiro trata o diálogo de missões que abre na carga, como em `qaForestMvp.mjs`.
- [ ] **Step 2:** Rodar e ver falhar. **Step 3:** Implementar. **Step 4:** Rodar, ver passar e rodar `npm run -s build`. O build precisa gerar um chunk separado para `treasureDialog`.
- [ ] **Step 5: Commit** `feat: adiciona o botão e a modal de tesouros`.

### Task 8: Aba Rolar

**Files:**
- Modify: `src/treasure/treasureDialog.js`
- Test: `scripts/qaTreasure.mjs`, `scripts/treasure.test.mjs`

**Interfaces:**
- Consumes: `startTreasure`, `startTable`, `resolveWithDice` e `summarizeGains`.
- Produces: `buildBatch(rows) -> BatchRow[]`, uma função pura testada em Node. Cada `row` tem `{ challengeRating, quantity, mode, columns: "both"|"items"|"money" }` ou `{ tableId, quantity }`.

- [ ] **Step 1: Testes.** `buildBatch` para o lote do spec (ND 1/4: 3 Padrão e 5 Metade; ND 3: 2 Padrão e 1 Só Item) gera 11 tesouros e 21 cadeias. Metade em linha `items` é rejeitada. No QA, o roteiro monta esse lote, clica em “Rolar tudo” e confere 11 linhas numeradas, o rodapé visível e o T$ igual à soma das células.
- [ ] **Step 2:** Rodar e ver falhar. **Step 3:** Implementar as linhas com ND (de `0.25` a `20`), Quantidade (1–99), Tipo, Colunas e Tabela específica, os botões “+ Adicionar rolagem”, “✕” e “Rolar tudo”, os resultados agrupados com a cascata e o rodapé. **Step 4:** Rodar e ver passar.
- [ ] **Step 5: Commit** `feat: implementa a aba Rolar de tesouros`.

### Task 9: Aba Consultar

**Files:**
- Modify: `src/treasure/treasureDialog.js`
- Test: `scripts/qaTreasure.mjs`

**Interfaces:**
- Consumes: `startTreasure`, `startTable`, `nextStep`, `applyRoll` e `rollDice`.

- [ ] **Step 1: QA.** Escolher 8-1, ND 7, Itens. Digitar valores que levem a Equipamento, depois tipo 2 e depois um d% da 8-4: o item aparece e a cadeia termina. Digitar 101 mostra erro e mantém o passo. Num passo de expressão, “rolar” preenche um total válido. Um passo 2D mostra o aviso.
- [ ] **Step 2:** Rodar e ver falhar. **Step 3:** Implementar o seletor inicial (qualquer tabela; a 8-1 pede ND e coluna), um passo por linha com campo e motivo, o resultado final e o botão “Nova consulta”. **Step 4:** Rodar e ver passar.
- [ ] **Step 5: Commit** `feat: implementa a aba Consultar de tesouros`.

### Task 10: Listas dos outros livros

**Files:**
- Create: `src/treasure/tables/threats.js`, `src/treasure/tables/heroes.js`, `src/treasure/tables/gods.js`, `src/treasure/tables/index.js`
- Modify: `src/treasure/treasureEngine.js` (aceitar `ListTable`), `src/treasure/treasureDialog.js` (listar no seletor de tabela das duas abas)
- Test: `scripts/treasure.test.mjs`

**Interfaces:**
- Produces: `ListTable = { id, title, book, bookPage, pdfPage, kind: "list", category, tier?, items: [{ name, price, category, tier? }] }`. O `id` segue o padrão `"ameacas/armas"` ou `"herois/acessorios/menor"`. `ALL_TABLES` reúne o Livro Básico e as listas. `listDie(n)` devolve `"1d<n>"`, e a consulta aceita de 1 a n.
- Fontes, com página impressa e do PDF registradas em cada tabela:
  - **Ameaças:** Tabelas 3-1 a 3-4 (PDF 396–402).
  - **Heróis:** Tabelas 3-1 a 3-4 e 3-9 a 3-12 (PDF 220–231 e 259–267), divididas por `tier` nos itens mágicos.
  - **Deuses:** Tabelas 1-3 e 1-4 (PDF 52 e 56).

- [ ] **Step 1: Testes.** Cada lista tem a contagem de itens fixada a partir da página renderizada e nenhum preço nulo, exceto onde o livro imprime “—”. `startTable("herois/acessorios/menor")` com valor 1 devolve o primeiro item. `listDie` de uma lista de 23 itens dá `"1d23"`.
- [ ] **Step 2:** Rodar e ver falhar. **Step 3:** Transcrever e integrar. **Step 4:** Rodar e ver passar.
- [ ] **Step 5: Commit** `feat: adiciona as listas de itens de Ameaças, Heróis e Deuses`.

### Task 11: Documentação e validação final

**Files:**
- Modify: `ARCHITECTURE.md` (seção “Rolagem de tesouros”: entregue, módulos, ponderação futura)
- Modify: `package.json` (script `"qa:treasure"`)

- [ ] **Step 1:** Rodar `test:floors-1-10`, `test:missions`, `test:floors-11-20`, `test:treasure`, `qa:treasure` e `build`.
- [ ] **Step 2:** Abrir a modal offline, depois da carga com o chunk pré-carregado, num roteiro com `context.setOffline(true)`.
- [ ] **Step 3: Commit** `docs: registra a rolagem de tesouros`.

## Resultado da execução

Todas as onze tarefas foram concluídas. A revisão final do conjunto pediu uma correção obrigatória: mostrar a categoria e a página do livro de cada item. Ela foi aplicada em `320c79b`, junto com ajustes menores: “00” vale 100 no d%, o rótulo “Total em dinheiro”, a coluna escolhida no cabeçalho dos grupos, o foco após “Nova consulta”, o aviso de falha de carregamento e o QA dos três temas e da rolagem offline.

Decisões do PO durante a execução: a modal ocupa a tela inteira, como a do nodo, e as cores seguem o tema do perfil de andares.

### Pendências adiadas

- Pré-cache dos arquivos no `install` do `public/sw.js`, para o app funcionar offline já na primeira visita. Esta é uma melhoria geral do app.
- Página do livro também na cascata, que hoje aparece só no rodapé.
- Na aba Rolar, o rodapé fica vazio quando a linha é uma consulta avulsa às Tabelas 8-5, 8-8 ou 8-10.
- `renderStep` duplicado entre as duas abas.
- Navegação por setas nas abas.
- Quantidade inválida mantém o lote anterior na tela.
- Ponderação entre livros, preços do Capítulo 3 e `schema.js` no `ARCHITECTURE.md` foram feitos nos ajustes em [docs/superpowers/plans/2026-11-20-ajustes-tesouros.md](2026-11-20-ajustes-tesouros.md).

