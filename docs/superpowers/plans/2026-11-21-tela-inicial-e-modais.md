# Tela inicial e modais Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refazer a tela inicial com identidade própria, cartões de faixa, Continuar, ferramentas rápidas e importação por arquivo. O plano também padroniza as modais em tela cheia, transforma a barra de ferramentas num rodapé fixo com nomes e oferece Avançar ou Encerrar no fim de cada faixa.

**Architecture:**
- A tela inicial continua sendo `#rangeDialog` em `index.html`, com a lógica em `src/main.js`.
- Os metadados dos cartões (ícone, nome, frase) ficam nos perfis em `src/floorProfiles/`.
- A paleta da tela inicial são variáveis de escopo em `#rangeDialog`, em `src/styles.css`, e não passa por `applyTheme`.
- O fim de faixa usa um helper puro, `getNextFloorRange`, e `clearAutosave` em `src/sessionAutosave.js`.

**Tech Stack:** JavaScript ES Modules, Vite 6, `node:test`, Playwright (QA).

**Spec:** `docs/superpowers/specs/2026-11-21-tela-inicial-e-modais-design.md`

## Execução

O processo segue `docs/superpowers/processo-de-trabalho.md`.

| Tarefa | Implementador | Revisor |
|---|---|---|
| 1. Rodapé fixo com nomes | sonnet | sonnet |
| 2. Modais em tela cheia | sonnet | sonnet |
| 3. Tela inicial: estrutura, paleta e cartões | sonnet | sonnet |
| 4. Tela inicial: confirmações e ferramentas rápidas | sonnet | opus |
| 5. Fim de faixa: Avançar ou Encerrar | sonnet | opus |
| 5b. Modal Sobre o app | haiku | sonnet |
| 6. Créditos e documentação | haiku | sonnet |
| Revisão final | — | opus |

## Global Constraints

- **Textos:**
  - título “Mega Dungeon de Práxis”;
  - subtítulo “Gerador de aventuras para Tormenta20”;
  - botões do rodapé: “Recarregar”, “Encontro”, “Missões”, “Tesouros”;
  - ferramentas rápidas: “Rolar tesouros” e “Encontro avulso”;
  - botão “Importar arquivo de sessão”, sem texto auxiliar;
  - “Continuar expedição”;
  - confirmação: “A expedição em andamento (<Faixa>, Andar N) será substituída. Continuar?”;
  - fim de faixa: “Avançar para <próxima faixa>” e “Encerrar expedição”.
- **Paleta da tela inicial,** em modo noturno, sempre:

| Uso | Valor |
|---|---|
| Fundo | `#13100d` |
| Fundo secundário | `#1b1611` |
| Cartão | `#211b15` |
| Borda | `#4b3c2b` |
| Destaque | `#b48a4e` |
| Texto | `#ecdfc4` |
| Texto secundário | `#a8977a` |
| Brilho no topo | `rgba(180,138,78,.10)` |

- **Cartões:** os ícones são `game-icons--dungeon-gate.svg`, `game-icons--forest.svg` e `game-icons--island.svg`, com as frases da tabela do spec. Os cartões são botões com `data-range="<id do perfil>"`.
- **Modais em tela cheia:** `100vw × 100vh`, `border-radius: 0`, `inset: 0`, `margin: 0`. O conteúdo fica alinhado ao topo e, em telas largas, tem largura máxima de cerca de 1100 px.
- **Armazenamento:** uma única expedição salva e nenhuma chave nova.
- **Ícone de fechar:** não muda.
- **Sem dependências novas.**

## Review Focus

- **Ferramentas rápidas com uma expedição salva:** depois de rolar um tesouro ou gerar um encontro pela tela inicial, o Continuar mostra a mesma faixa e o mesmo andar. Teste na Tarefa 4.
- **Rodapé cobrindo conteúdo:** o último bloco da página precisa ficar visível acima do rodapé em 1024×768 e em 768×1024. Teste na Tarefa 1.
- **Avançar no fim de faixa:** a expedição salva passa a ser a da faixa nova, e não a concluída. Teste na Tarefa 5.
- **Encerrar:** depois de recarregar, a tela inicial não mostra o Continuar. Teste na Tarefa 5.
- **Importar com expedição salva e cancelar:** nada muda, e o Continuar permanece. Teste na Tarefa 4.

---

### Task 1: Rodapé fixo com nomes

**Files:**
- Modify: `index.html:61-71` (`.floating-tools` e `#timeTracker`)
- Modify: `src/styles.css:195-260` (`.floating-tools`, `.reload-button`, `.time-tracker`)
- Test: `scripts/qaFloors1to10.mjs` (ou um roteiro novo `scripts/qaLayout.mjs` com `npm run qa:layout`)

**Interfaces:**
- Produces: o rodapé `.floating-tools`, que contém os quatro botões (cada um com `<span>` do nome) e o `#timeTracker`. Os `id`s atuais dos botões não mudam.

- [ ] **Step 1: Teste de QA.** Faça o teste em 1024×768 e em 768×1024, depois de iniciar a faixa 1–10. Ele confere que:
  - os quatro botões mostram “Recarregar”, “Encontro”, “Missões” e “Tesouros”;
  - o rodapé tem `position: fixed`, `bottom: 0` e largura igual à viewport;
  - depois de rolar até o fim, o `bottom` do último bloco de conteúdo de `main` fica menor ou igual ao `top` do rodapé;
  - as quatro caixas dos botões e a do contador de tempo estão na mesma linha (mesmo `top`, com tolerância de 2 px).
- [ ] **Step 2:** rode o teste e veja que falha.
- [ ] **Step 3: Implemente.**
  - O rodapé é fixo, com fundo próprio (`var(--panel)`) e borda superior (`var(--border)`).
  - O corpo ganha `padding-bottom` igual à altura do rodapé. Use uma variável CSS `--toolbar-height`.
  - Abaixo de 560 px de largura, os nomes somem e os `aria-label` continuam.
- [ ] **Step 4:** rode o teste e veja que passa. Rode também `npm run qa:floors-1-10` e `npm run qa:floors-11-20` contra o dev server.
- [ ] **Step 5: Commit.** `feat: rodapé fixo de ferramentas com nomes`

### Task 2: Modais em tela cheia

**Files:**
- Modify: `src/styles.css`:
  - `:1794-1824` (`#missionDialog`, `#manualEncounterDialog`)
  - `:584-600` (`.archipelago-dialog`)
  - `:2418` (`.manual-encounter-dialog`)
  - `:2509-2540` (`.mission-dialog`)
- Test: o roteiro de layout da Tarefa 1

**Interfaces:**
- Consumes: nenhuma interface das outras tarefas.

- [ ] **Step 1: Teste de QA.** Em 1024×768, abra Missões (quadro de seleção e acompanhamento), Encontro manual e a modal de uma ilha da faixa 21–30. Para cada uma, confira:
  - `getBoundingClientRect()` do `dialog` igual a 0, 0, `innerWidth` e `innerHeight`, com tolerância de 1 px;
  - `border-radius` igual a `0px`;
  - o primeiro campo do formulário com `top` < 200 px, ou seja, o conteúdo está alinhado ao topo.
- [ ] **Step 2:** rode o teste e veja que falha.
- [ ] **Step 3: Implemente.** Aplique a regra de tela cheia de `#nodeDialog` e `#treasureDialog` às três modais, com o conteúdo alinhado ao topo e largura máxima de cerca de 1100 px centralizada. A rolagem interna continua funcionando. Use o mesmo padrão de `grid-template-rows` de `.node-dialog`.
- [ ] **Step 4:** rode o teste e veja que passa. Rode os QAs `qa:floors-1-10`, `qa:floors-11-20` e `qa:treasure`. Salve screenshots das três modais em `.playwright-mcp/modais/final-*.png`.
- [ ] **Step 5: Commit.** `feat: modais de missões, encontro e ilha em tela cheia`

### Task 3: Tela inicial — estrutura, paleta e cartões

**Files:**
- Modify: `index.html:147-178` (`#rangeDialog`)
- Modify: os perfis em `src/floorProfiles/dungeon1to10.js`, `forest11to20.js` e `archipelago21to30.js`, que ganham `card: { icon, name, tagline }`
- Modify: `src/main.js`:
  - `populateFloorRangeSelect` (:807) dá lugar a `renderRangeCards`;
  - `syncInitialUnknownPathsVisibility` (:1179);
  - os blocos de `#seedInput` (:1120-1160);
  - `offerSavedExpedition` (:565).
- Modify: `src/styles.css:2989+` (`.range-dialog`)
- Test: `scripts/qaFloors1to10.mjs`, `scripts/qaForestMvp.mjs`, `scripts/qaMissionFlows.mjs`, `scripts/qaTreasure.mjs` e `scripts/qaTreasureOffline.mjs`. Todos passam a escolher a faixa pelo cartão.

**Interfaces:**
- Produces: cartões `button.range-card[data-range="<id>"]` com `aria-pressed`, e uma função `getSelectedRangeId()` em `main.js`. O botão de iniciar continua com `id="rangeConfirm"`. `#resumeExpedition`, `#importSessionFile` e `#installButton` mantêm os `id`s. O interruptor mantém `#initialUnknownPathsInput`. `#seedInput` e `#floorRangeInput` deixam de existir.
- Produces: `#quickTreasure` e `#quickEncounter`, os botões das ferramentas rápidas, só com a marcação. O comportamento vem na Tarefa 4.

- [ ] **Step 1: QA primeiro.** Troque `selectOption` em `#floorRangeInput` por um clique em `[data-range="<id>"]` em todos os roteiros. Acrescente um roteiro da tela inicial que confere:
  - o título e o subtítulo exatos;
  - três cartões com os nomes, os andares e as frases do spec;
  - o cartão escolhido com `aria-pressed="true"`, o botão de iniciar com o texto “Iniciar <nome em minúsculas> ›” e a cor de fundo igual ao `theme.action` da faixa;
  - o interruptor visível só com a Floresta escolhida;
  - `#seedInput` ausente;
  - o fundo de `#rangeDialog` em `rgb(19, 16, 13)` com qualquer faixa ativa, mesmo depois de usar a 11–20 e recarregar;
  - sem expedição salva, o Continuar oculto e a Masmorra escolhida;
  - com expedição salva, o Continuar mostra “<Faixa> · Andares X–Y · parado no Andar N” e o cartão escolhido é o da faixa salva.
- [ ] **Step 2:** rode e veja falhar.
- [ ] **Step 3: Implemente** seguindo o spec, seção 1, e a prévia `v4-bronze-final-*`. A paleta vive como variáveis em `#rangeDialog`, sem `applyTheme`. Remova o campo de seed e o seu tratamento. Ao iniciar, o fluxo continua chamando `applyFloorRange(getSelectedRangeId())`.
- [ ] **Step 4:** rode e veja passar. Rode todos os QAs com o dev server e salve screenshots em `.playwright-mcp/tela-inicial/final-*.png` (paisagem e retrato, com e sem Continuar).
- [ ] **Step 5: Commit.** `feat: tela inicial com cartões de faixa e paleta própria`

### Task 4: Tela inicial — confirmações e ferramentas rápidas

**Files:**
- Modify: `src/main.js`, nos manipuladores de `#rangeConfirm`, `importSessionFile` (:762), `#resumeExpedition`, `#quickTreasure` e `#quickEncounter`
- Possivelmente modify: `src/manualEncounterDialog.js`, se ele depender da sessão ativa
- Test: o roteiro da tela inicial (Tarefa 3)

**Interfaces:**
- Consumes: `getSelectedRangeId()`, `#quickTreasure`, `#quickEncounter` (Tarefa 3) e `savedExpedition` / `offerSavedExpedition`.
- Produces: `confirmReplaceExpedition(): boolean` em `main.js`. Ela devolve `true` quando não há expedição salva, ou quando o usuário confirma com `window.confirm` e o texto exato do spec.

- [ ] **Step 1: QA primeiro.**
  - Com expedição salva, “Iniciar” mostra o `confirm` com o texto exato. Use `page.on("dialog")` para ler o texto e cancelar. Depois de cancelar, a tela inicial continua aberta e o Continuar mostra a mesma linha.
  - Com expedição salva, importar um arquivo pede o mesmo `confirm`. Cancelar não muda nada.
  - Sem expedição salva, não aparece `confirm`.
  - “Rolar tesouros” abre `#treasureDialog` por cima de `#rangeDialog`, que continua `open`. Role um lote e feche. O foco volta a `#quickTreasure`, e o Continuar mostra a mesma linha.
  - Faça o mesmo com “Encontro avulso” e `#manualEncounterDialog`. Gerar um encontro não altera a expedição salva: compare o resultado de `loadAutosave()` antes e depois.
  - Se o Continuar falhar ao restaurar, o status mostra “Não foi possível continuar a expedição salva. Você pode importar o arquivo de sessão.”
- [ ] **Step 2:** rode e veja falhar.
- [ ] **Step 3: Implemente.**
  - As ferramentas rápidas não chamam `applyFloorRange` nem `saveCurrentExpedition`.
  - Se a modal de encontro exigir um contexto de faixa, passe o do cartão escolhido sem iniciar uma sessão nem ligar `autosaveActive`.
- [ ] **Step 4:** rode e veja passar. Rode os QAs completos.
- [ ] **Step 5: Commit.** `feat: confirmação de substituição e ferramentas rápidas na tela inicial`

### Task 5: Fim de faixa — Avançar ou Encerrar

**Files:**
- Modify: `src/floorProfiles/index.js`, que passa a exportar `getNextFloorRange(id)`
- Modify: `src/sessionAutosave.js`, que passa a exportar `clearAutosave()`
- Modify: o bloco de conclusão de cada modo:
  - `src/extendedExplorationRenderer.js:808` (`phase === "completed"`, faixa 1–10);
  - `src/main.js:207-218` (“Faixa concluída”, faixa 11–20);
  - `src/archipelagoRenderer.js:268-272` e `src/main.js:436` (“Concluir boss”, ilha 30).
- Test: `scripts/floorRanges.test.mjs` (novo, com `npm run test:ranges`) e QA

**Interfaces:**
- Produces: `getNextFloorRange(id: string) -> profile | null`, na ordem de `FLOOR_PROFILES`.
- Produces: `clearAutosave(): Promise<void>`, que apaga a chave `current`.
- Produces: `finishExpedition()` e `advanceToNextRange()` em `main.js`.

- [ ] **Step 1: Testes.**

```js
test("getNextFloorRange follows the profile order and ends at the last range", () => {
  assert.equal(getNextFloorRange("dungeon-1-10").id, "forest-11-20");
  assert.equal(getNextFloorRange("forest-11-20").id, "archipelago-21-30");
  assert.equal(getNextFloorRange("archipelago-21-30"), null);
});
```

  **QA:** nos andares 1–10, carregue uma sessão no andar 10 com a fase `completed` (use os helpers de sessão de `qaFloors1to10.mjs`) e confira:
  - os botões “Avançar para Floresta” e “Encerrar expedição” aparecem;
  - **Avançar** abre o fluxo de expedição nova da 11–20, com a seleção de missões e sem `confirm`, e a expedição salva passa a ser a da 11–20;
  - **Encerrar** volta à tela inicial, e depois de recarregar não aparece o Continuar.
  
  Na faixa 21–30, depois de “Concluir boss” na ilha 30, aparece só “Encerrar expedição”.
- [ ] **Step 2:** rode e veja falhar.
- [ ] **Step 3: Implemente** nos três modos, seguindo o spec (“Regras de expedição” e decisão 5). O nome em “Avançar para <nome>” vem de `card.name` da próxima faixa.
- [ ] **Step 4:** rode e veja passar. Rode `test:ranges`, `test:floors-1-10`, `test:floors-11-20`, `test:archipelago` e todos os QAs.
- [ ] **Step 5: Commit.** `feat: avançar ou encerrar a expedição no fim de cada faixa`

### Task 5b: Modal “Sobre o app”

**Files:**
- Modify: `index.html`, com o botão `#aboutButton` no rodapé de `#rangeDialog` à esquerda e um `<dialog id="aboutDialog">`
- Modify: `src/main.js`, para abrir e fechar a modal
- Modify: `src/styles.css`
- Test: o roteiro da tela inicial

- [ ] **Step 1: QA.** Confira:
  - `#aboutButton` fica à esquerda e `#importSessionFile` à direita, na mesma linha;
  - clicar abre `#aboutDialog` em tela cheia, por cima de `#rangeDialog`, que continua `open`;
  - a modal tem os cinco títulos de seção do spec;
  - o fundo é `rgb(19, 16, 13)`;
  - fechar devolve o foco a `#aboutButton`.
- [ ] **Step 2:** rode e veja falhar.
- [ ] **Step 3: Implemente** com o texto do spec, seção “Modal ‘Sobre o app’”, palavra por palavra, já com a versão revisada pelo PO.
- [ ] **Step 4:** rode e veja passar. Salve screenshots em `.playwright-mcp/tela-inicial/final-sobre-*.png`.
- [ ] **Step 5: Commit.** `feat: modal Sobre o app na tela inicial`

### Task 6: Créditos e documentação

**Files:**
- Create: `CREDITOS.md`
- Modify: `ARCHITECTURE.md`, nas seções da tela inicial e da interface

- [ ] **Step 1: Crie `CREDITOS.md`.** Liste cada ícone `game-icons--*.svg` de `public/assets/icons/`, com o autor indicado no game-icons.net. Inclua o ícone `streamline-cyber--treasure-chest-open.svg` com a licença dele. Coloque a licença (CC BY 3.0 e o link) e o link para o site. Se não conseguir confirmar o autor de um ícone, escreva “game-icons.net” e registre isso no relatório.
- [ ] **Step 2: Atualize o `ARCHITECTURE.md`.**
  - Descreva a tela inicial (cartões, Continuar, ferramentas rápidas, importar), as modais em tela cheia, o rodapé fixo e o fim de faixa.
  - Remova as menções ao campo de seed.
  - Acrescente o link para o spec.
- [ ] **Step 3:** rode `grep -n "seedInput\|Seed de sessão" ARCHITECTURE.md index.html src/`. Não deve haver resultados.
- [ ] **Step 4: Commit.** `docs: créditos dos ícones e registro da tela inicial`
