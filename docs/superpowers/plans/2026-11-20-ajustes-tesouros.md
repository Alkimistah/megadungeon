# Ajustes de tesouros Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Aplicar os ajustes do PO após o uso no tablet: preços de todos os itens, pesos entre livros com a origem de cada componente, abas renomeadas, os dois modos da aba Rolar com o livro e os totais do rodapé.

**Architecture:** Os dados de preço ficam em `src/treasure/tables/prices.js`. O peso entre livros vive em `src/treasure/bookWeights.js` e é consultado só por `resolveWithDice`. O `Gain` de item ganha `details.components` e `price` calculado. A UI continua em `treasureDialog.js` e `treasureFormat.js`.

**Tech Stack:** JavaScript ES Modules, `node:test`, Playwright.

**Spec:** `docs/superpowers/specs/2026-11-20-ajustes-tesouros-design.md`, que complementa `docs/superpowers/specs/2026-11-20-rolagem-de-tesouros-design.md`.

## Execução

O processo segue `docs/superpowers/processo-de-trabalho.md`.

| Tarefa | Implementador | Revisor |
|---|---|---|
| 1. Preços do Livro Básico e cálculo de preço | sonnet | sonnet |
| 2. Novas Melhorias de Heróis e aplicabilidade das melhorias | sonnet | sonnet |
| 3. Pesos entre livros e componentes com origem | opus | opus |
| 4. Abas, campo Rolar, totais e rodapé | sonnet | sonnet |
| 5. Modos da aba Rolar com o livro | sonnet | sonnet |
| 6. Documentação e validação | haiku | sonnet |
| Revisão final | — | opus |

## Global Constraints

- **Regras de transcrição e de motor do plano anterior.** Continuam valendo: faixas impressas sem renumeração, motor puro, RNG injetado e lote temporário.
- **Peso entre livros.** São 70% para a tabela do Livro Básico e 30% para os outros livros, divididos na proporção do número de itens elegíveis de cada lista. Vale só em `resolveWithDice`. `applyRoll`, quando chamado pela aba Rolar com o livro, nunca sorteia livro.
- **Preços em T$.** Os valores impressos como texto (“—”, “+T$ …”) continuam texto e não entram em somas.
- **Textos da interface:**
  - abas “Gerar tesouros” e “Rolar com o livro”;
  - campo “Rolar”, com as opções “Itens e dinheiro”, “Só itens” e “Só dinheiro”;
  - “Total em riquezas”;
  - “Valor total (dinheiro + riquezas)”;
  - opção “Rolagem completa do livro (Tabela 8-1)”.

## Review Focus

- **Repetição entre livros.** Uma melhoria de outro livro com o mesmo nome de uma do Livro Básico conta como repetida no mesmo item.
- **Categorias sem lista.** Numa categoria sem lista de outro livro, o peso não sorteia nada, e a rolagem fica 100% no Livro Básico.
- **Soma com preço em texto.** Se um item tem preço em texto, o rodapé mostra o texto e não soma esse item.
- **Desempenho.** Um lote de 99 tesouros com Dobro em ND 20 continua abaixo de 500 ms com os pesos.
- **Consulta avulsa de melhoria.** Mostra a melhoria sozinha, sem item base.

---

### Task 1: Preços do Livro Básico e cálculo de preço

**Files:** Create `src/treasure/tables/prices.js`. Modify `src/treasure/treasureEngine.js` (`buildItemGain`, `itemGainFrom`). Test `scripts/treasure.test.mjs`.

**Interfaces:**
- Produces:
  - `BASE_PRICES: Map<string, number|string>`, com os nomes das Tabelas 3-3 (PDF 150–151), 3-5 (159) e 3-6 (162–163) normalizados em minúsculas e sem acento;
  - `IMPROVEMENT_PRICES = {1:300, 2:3000, 3:9000, 4:18000}` (Tabela 3-7, PDF 170);
  - `MATERIAL_PRICES`: Tabela 3-9 (PDF 173), por material e por tipo de item, conforme as colunas impressas;
  - `priceOf(details, base) -> number|string|undefined`.
- **Regra de preço.** Preço base + melhorias (pelo número aceito) + material (pela coluna do tipo do item) + encantos (`ENCHANTMENT_PRICES` da Tabela 8-7). Um item específico usa só o preço da tabela dele.

- [ ] **Step 1. Testes:**
  - todo item de 8-3 e 8-4 encontra um preço base. Um nome sem correspondência faz o teste falhar e mostra o nome;
  - uma espada longa com 2 melhorias custa base + 3000;
  - uma espada longa mágica média custa base + 36000;
  - uma espada com material adamante soma a coluna de arma da Tabela 3-9;
  - uma poção mantém o preço da 8-12.
- [ ] **Step 2.** Rodar e ver falhar.
- [ ] **Step 3.** Transcrever as tabelas conferindo cada linha na imagem renderizada e implementar `priceOf`.
- [ ] **Step 4.** Rodar e ver passar.
- [ ] **Step 5.** Commit `feat: calcula o preço de todos os itens de tesouro`.

### Task 2: Novas Melhorias de Heróis e aplicabilidade das melhorias

**Files:** Modify `src/treasure/tables/heroes.js` e `src/treasure/tables/gods.js`. Test `scripts/treasure.test.mjs`.

**Interfaces:**
- Produces:
  - lista `herois/melhorias` (Tabela 3-5, PDF 242, mais as continuações);
  - em cada melhoria de Heróis e de Deuses, o campo `appliesTo: ("arma"|"armadura"|"esotérico")[]`, lido do texto impresso (seção ou coluna de tipo);
  - os campos `special` e `subroll` sempre que o livro imprimir regra equivalente a “conta como duas” ou material.

- [ ] **Step 1. Testes:** contagem fixada pela página; toda melhoria tem `appliesTo` não vazio; amostras de nome e tipo.
- [ ] **Step 2.** Rodar e ver falhar.
- [ ] **Step 3.** Transcrever.
- [ ] **Step 4.** Rodar e ver passar.
- [ ] **Step 5.** Commit `feat: transcreve as novas melhorias de Heróis e a aplicabilidade das melhorias`.

### Task 3: Pesos entre livros e componentes com origem

**Files:** Create `src/treasure/bookWeights.js`. Modify `src/treasure/treasureEngine.js`. Test `scripts/treasure.test.mjs`.

**Interfaces:**
- Consumes: as Tasks 1–2, `ALL_TABLES` e a tabela de categorias do spec.
- Produces:
  - `WEIGHTED_POOLS`, por id de tabela do Livro Básico (`8-3`, `8-4/arma`, `8-4/armadura`, `8-5/<tipo>`, `material`, `8-9/<tier>`, `8-11/<tier>`, `8-13`, `8-14`, `8-15`), com `{ basicShare: 0.7, others: [{ tableId, filter? }] }`;
  - `pickSource(poolKey, context, rng) -> { tableId, share }`;
  - o `Step` ganha `sourceBook`, `sourceTableId` e `share`;
  - o `Gain` de item ganha `details.components` e `price`.
- **Comportamento.** `resolveWithDice` sorteia a fonte antes de rolar. Uma fonte de outro livro rola de 1 a n na lista elegível, com o filtro de `appliesTo` e de categoria. A aba Rolar com o livro (`applyRoll`) continua sem sorteio de livro.

- [ ] **Step 1. Testes:**
  - com RNG fixo, a fonte é Livro Básico quando o sorteio dá menos de 0,7 e outro livro quando dá 0,7 ou mais;
  - em 10.000 sorteios, a parcela do Livro Básico fica entre 67% e 73%;
  - a divisão entre outros livros é proporcional ao número de itens;
  - repetição por nome entre livros;
  - categoria sem lista → 100% Livro Básico;
  - o item tem `components` com livro e página de cada parte;
  - desempenho: 396 cadeias abaixo de 500 ms;
  - `applyRoll` nunca grava `sourceBook` diferente do Livro Básico.
- [ ] **Step 2.** Rodar e ver falhar.
- [ ] **Step 3.** Implementar.
- [ ] **Step 4.** Rodar e ver passar.
- [ ] **Step 5.** Commit `feat: aplica pesos entre livros na geração de tesouros`.

### Task 4: Abas, campo Rolar, totais e rodapé

**Files:** Modify `src/treasure/treasureDialog.js`, `src/treasure/treasureFormat.js`, `src/treasure/treasureSummary.js`, `src/treasure/treasureBatch.js` e `src/styles.css`. Test `scripts/treasure.test.mjs` e `scripts/qaTreasure.mjs`.

**Comportamento:**
- **Abas.** Visual de fichário: abas presas à borda superior do painel, com a aba ativa unida ao painel, sem aparência de botão. Usam as variáveis do tema. Nomes: “Gerar tesouros” e “Rolar com o livro”.
- **Sem faixa fixa** de totais.
- **Campo “Rolar”.** Opções “Itens e dinheiro”, “Só itens” e “Só dinheiro”, com a dica “Dinheiro: moedas e riquezas”. Os cabeçalhos dos grupos usam os novos rótulos.
- **Totais.** Linha “Total em riquezas: T$ X” abaixo das riquezas e linha “Valor total (dinheiro + riquezas): T$ Y” no rodapé. `summarizeGains` ganha `wealthTotal` e `grandTotal`.
- **Itens com preço.** Cada item mostra o preço calculado e a lista de componentes, um por linha, com livro e página, por exemplo:
  - “Espada longa — Livro Básico p. 144”
  - “· Melhoria X — Heróis de Arton p. 240”
- **Cascata.** Mostra “Livro sorteado: <livro> (<%>)” nos passos com peso.

- [ ] **Step 1. Testes:**
  - unitários: `wealthTotal`, `grandTotal` e o formatador de componentes;
  - QA: ausência da faixa, rótulos novos, nomes das abas, totais visíveis e ao menos um item com componentes.
- [ ] **Step 2.** Rodar e ver falhar.
- [ ] **Step 3.** Implementar.
- [ ] **Step 4.** Rodar e ver passar. Gravar screenshots nos três temas.
- [ ] **Step 5.** Commit `feat: ajusta abas, totais e rodapé da modal de tesouros`.

### Task 5: Modos da aba Rolar com o livro

**Files:** Modify `src/treasure/treasureDialog.js`, `src/treasure/treasureFormat.js` e `src/styles.css`. Test `scripts/qaTreasure.mjs`.

**Comportamento:**
- **Seletor de tabela inicial.** A primeira opção é “Rolagem completa do livro (Tabela 8-1)”, que pede ND e Padrão ou Metade. As demais opções são pesquisas avulsas.
- **Rolagem completa.** A cada passo, mostra a tabela daquele passo, com as faixas de d% ou de 1d6 e o resultado de cada faixa, como no livro. A linha obtida fica destacada depois de informado o valor. Ao fim, mostra o quadro completo. Numa expressão (por exemplo, 2d4×100), mostra a expressão, sem tabela.
- **Pesquisa avulsa.** Mostra só o resultado rolado: item, melhoria, encanto, riqueza ou lista de outro livro, com preço, livro e página. Não mostra o quadro de dinheiro, riquezas e itens.

- [ ] **Step 1. Testes (QA):**
  - na rolagem completa de ND 3, a tabela do passo aparece com as faixas da 8-1, e a linha escolhida fica destacada;
  - a pesquisa avulsa em `8-12` com valor 50 mostra só a poção, sem o quadro.
- [ ] **Step 2.** Rodar e ver falhar.
- [ ] **Step 3.** Implementar.
- [ ] **Step 4.** Rodar e ver passar. Gravar screenshots.
- [ ] **Step 5.** Commit `feat: separa a rolagem completa do livro da pesquisa avulsa`.

### Task 6: Documentação e validação

- [ ] **Step 1.** Atualizar a seção “Rolagem de tesouros” do `ARCHITECTURE.md` (abas, pesos, preços) e tirar das pendências do plano anterior o que foi feito.
- [ ] **Step 2.** Rodar `test:floors-1-10`, `test:missions`, `test:floors-11-20`, `test:treasure`, `qa:treasure`, `qa:treasure-offline` e `build`.
- [ ] **Step 3.** Commit `docs: registra os ajustes da rolagem de tesouros`.
