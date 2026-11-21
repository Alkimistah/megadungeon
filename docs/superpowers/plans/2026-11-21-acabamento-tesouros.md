# Acabamento da modal de tesouros Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remover a legenda do campo Rolar, renomear a segunda aba para “Rolar na mesa”, trocar as abas por um seletor segmentado, mostrar a página do livro em cada passo da cascata com um `renderStep` comum e fazer o pré-cache offline já na primeira visita.

**Architecture:** As mudanças de UI ficam em `index.html`, `src/styles.css` e `src/treasure/treasureDialog.js`. O texto da referência de cada passo é uma função pura em `src/treasure/treasureFormat.js`. O pré-cache é uma função pura em `build/swPrecache.js`, chamada por um plugin do Vite no fim do build, que reescreve `dist/sw.js`.

**Tech Stack:** JavaScript ES Modules, Vite 6, `node:test`, Playwright.

**Spec:** `docs/superpowers/specs/2026-11-21-acabamento-tesouros-design.md`

## Execução

O processo segue `docs/superpowers/processo-de-trabalho.md`.

| Tarefa | Implementador | Revisor |
|---|---|---|
| 1. Legenda e nome “Rolar na mesa” | haiku | sonnet |
| 2. Seletor segmentado | sonnet | sonnet |
| 3. `renderStep` comum e página na cascata | sonnet | sonnet |
| 4. Pré-cache offline na primeira visita | sonnet | opus |
| 5. Documentação e screenshots para o PO | haiku | sonnet |
| Revisão final | — | opus |

## Global Constraints

- **Textos da interface.** As abas são “Gerar tesouros” e “Rolar na mesa”. O campo “Rolar” mantém as opções “Itens e dinheiro”, “Só itens” e “Só dinheiro”, sem legenda.
- **Referência de página.** Tabela do Livro Básico: `p. N`. Tabela de outro livro: `<Livro> p. N`. O texto aparece entre parênteses, junto ao nome da tabela.
- **Abas.** O papel `tab`, o `aria-selected`, a navegação por teclado (setas, Home, End) e a troca de painéis não mudam.
- **Service worker.** A estratégia do `fetch` (rede primeiro, cache como reserva) não muda. O `vite dev` continua servindo `public/sw.js` sem lista de pré-cache.
- **Sem dependências novas.**
- **Specs antigos.** Os specs e planos anteriores mantêm o nome “Rolar com o livro”, como registro histórico.

## Review Focus

- **Tema claro de perfil.** A opção ativa do seletor, preenchida com `--action`, precisa ter texto legível nos temas de todos os perfis de andares, não só no escuro. Coberto pelos screenshots da Tarefa 2 em dois perfis.
- **Tablet estreito (768px).** O seletor não pode quebrar a linha nem estourar a largura. Coberto pela Tarefa 2 no QA em 768px.
- **Passo de lista de outro livro na aba Gerar tesouros.** O passo mostra a página da lista sorteada, e não a da tabela do Livro Básico. Coberto pelo teste `stepReference uses the drawn source table` da Tarefa 3.
- **Build sem marcadores.** Se alguém editar `public/sw.js` e apagar os marcadores, o build precisa falhar em vez de publicar um service worker sem pré-cache. Coberto pelo teste `injectPrecache throws when markers are missing` da Tarefa 4.
- **Atualização de versão.** Um build novo precisa apagar o cache do build anterior no `activate`. Coberto pelo teste `cache name changes when content changes` da Tarefa 4, já que o `activate` atual apaga todo cache com outro nome.

---

### Task 1: Legenda e nome “Rolar na mesa”

**Files:**
- Modify: `src/treasure/treasureDialog.js:170-173`, onde a legenda é criada, e o comentário da linha 1 e o da 222
- Modify: `index.html:256`, o texto da aba
- Modify: `src/styles.css:3202-3206`, para remover `.treasure-hint` se ficar sem uso
- Modify: os comentários com o nome antigo em `src/treasure/bookWeights.js:6` e `src/treasure/treasureEngine.js:26`
- Test: `scripts/qaTreasure.mjs:39` e `scripts/qaTreasure.mjs:80-87`

**Interfaces:**
- Produces: aba `#treasureTabLookup` com o texto “Rolar na mesa”. Os ids não mudam.

- [ ] **Step 1: Ajustar o QA.** Em `scripts/qaTreasure.mjs`, a linha 39 passa a esperar `["Gerar tesouros", "Rolar na mesa"]`. As asserções de `.treasure-hint`, `hintIds`, `aria-describedby` e `/Dinheiro: moedas e riquezas/` dão lugar a `assert.equal(await page.locator("#treasureDialog .treasure-hint").count(), 0)` e `assert.doesNotMatch(await rowField.innerText(), /moedas e riquezas/)`.
- [ ] **Step 2: Rodar e ver falhar.** Com `npm run dev` ativo, rode `QA_APP_URL=http://localhost:5173/megadungeon/ npm run qa:treasure`. Deve falhar na lista de abas.
- [ ] **Step 3: Implementar.** Remova a legenda, o `hintId` e o `aria-describedby` que aponta para ela. Troque o texto da aba e os comentários.
- [ ] **Step 4: Rodar e ver passar.** Rode o mesmo comando do Step 2 e também `npm run test:treasure`. Os dois devem passar.
- [ ] **Step 5: Commit.** `fix: remove a legenda do campo Rolar e renomeia a aba para Rolar na mesa`

### Task 2: Seletor segmentado

**Files:**
- Modify: `src/styles.css:2448-2511`, de `.treasure-dialog` até `.treasure-panel[hidden]`
- Test: `scripts/qaTreasure.mjs`

**Interfaces:**
- Consumes: aba “Rolar na mesa” (Tarefa 1).
- Produces: nenhuma interface JS. Só CSS.

- [ ] **Step 1: Escrever o QA do visual.** Use o viewport de 1024×768 e também o de 768×1024. Asserções:
  - `.treasure-tabs` tem borda e `border-radius` maior que 0;
  - largura de `.treasure-tabs` menor que a de `.treasure-panel`, ou seja, o controle não ocupa a linha inteira;
  - as duas abas ficam na mesma linha (mesmo `top` no `boundingBox`);
  - a aba ativa tem `background-color` diferente da inativa;
  - `.treasure-panel` tem os quatro cantos arredondados (`border-radius` sem valor 0);
  - ArrowRight na aba ativa seleciona “Rolar na mesa” e mostra `#treasurePanelLookup`.
- [ ] **Step 2: Rodar e ver falhar.** Rode `npm run qa:treasure`. Deve falhar na largura ou nos cantos.
- [ ] **Step 3: Implementar o CSS.** Use como referência o protótipo do spec, que foi injetado no navegador:

```css
.treasure-tabs{justify-self:start;padding:3px;gap:0;border:1px solid var(--border);border-radius:8px;background:var(--page)}
.treasure-tab{border:none;border-radius:6px;background:transparent;padding:7px 18px}
.treasure-tab[aria-selected=true]{background:var(--action);color:<cor legível sobre --action>}
.treasure-panel{border-radius:6px}
```

  Remova os resíduos do visual de fichário: `margin-bottom: -1px`, `top`, `z-index` e `border-bottom-color`, além do comentário “Abas de fichário”. Mantenha `:focus-visible` e o hover da inativa. Para a cor do texto da ativa, use a variável de texto sobre ação que o app já usa nos botões primários. Procure `var(--action)` em `styles.css`.
- [ ] **Step 4: Rodar e ver passar.** Rode `npm run qa:treasure`. Depois, tire screenshots da modal em 1024×768 em dois perfis de andares (1–10 e 11–20) e confira que o texto da opção ativa está legível nos dois.
- [ ] **Step 5: Commit.** `feat: abas de tesouros como seletor segmentado`

### Task 3: `renderStep` comum e página na cascata

**Files:**
- Modify: `src/treasure/treasureFormat.js`, perto de `bookReference` (linha 102)
- Modify: `src/treasure/treasureDialog.js:80-96` (`renderChain`) e `:236-250` (`renderHistory`)
- Test: `scripts/treasure.test.mjs` e `scripts/qaTreasure.mjs`

**Interfaces:**
- Produces: `stepReference(step) -> string` em `treasureFormat.js`. Usa a tabela `step.sourceTableId ?? step.tableId` e devolve `"p. N"` quando `table.book === "Livro Básico"`, `"<book> p. N"` para outro livro e `""` sem livro.
- Produces: `renderStep(step, { note, draw } = {}) -> HTMLLIElement` em `treasureDialog.js`, privada. Ela monta a linha com profundidade, nome da tabela, referência `(…)` em um `span.treasure-step-ref`, valor rolado, resultado e, depois, `draw` em `em.treasure-book-draw` e `note` em `em.treasure-note`, quando existirem.

- [ ] **Step 1: Escrever os testes.**

```js
test("stepReference shows only the page for basic book tables", () => {
  assert.equal(stepReference({ tableId: "8-1/1/money" }), "p. 328");
});
test("stepReference uses the drawn source table", () => {
  const id = Object.keys(ALL_TABLES).find((k) => ALL_TABLES[k].book && ALL_TABLES[k].book !== "Livro Básico");
  const t = ALL_TABLES[id];
  assert.equal(stepReference({ tableId: "8-3", sourceTableId: id }), `${t.book} p. ${t.bookPage}`);
});
test("stepReference is empty for unknown tables", () => {
  assert.equal(stepReference({ tableId: "nao-existe" }), "");
});
```

- [ ] **Step 2: Rodar e ver falhar.** Rode `npm run test:treasure`. Deve falhar com “stepReference is not a function” ou erro de import.
- [ ] **Step 3: Implementar.** Escreva `stepReference`. Depois, troque o laço de `renderChain` e o de `renderHistory` por `renderStep`: na aba Gerar tesouros com `{ draw: formatBookDraw(step) }`, e na aba Rolar na mesa com `{ note: notes.get(prefix + step.id) }`. A aba Rolar na mesa passa a usar o nome de tabela de `step.sourceTableId ?? step.tableId`, que dá o mesmo resultado lá, porque `applyRoll` não grava `sourceTableId`. Dê ao `.treasure-step-ref` um estilo discreto, menor e com a cor de `.treasure-hint` antes da remoção (`#d8c8b7`, 12px).
- [ ] **Step 4: Rodar e ver passar.** Rode `npm run test:treasure`. No QA, acrescente: depois de “Rolar tudo”, o primeiro `.treasure-step-ref` da cascata casa com `/^\(p\. \d+\)$/`; na aba Rolar na mesa, depois do primeiro valor digitado, a linha do histórico também tem `.treasure-step-ref`. Rode `npm run qa:treasure`.
- [ ] **Step 5: Commit.** `feat: página do livro em cada passo da cascata`

### Task 4: Pré-cache offline na primeira visita

**Files:**
- Create: `build/swPrecache.js`
- Modify: `vite.config.js`, para registrar o plugin
- Modify: `public/sw.js`, para ganhar marcadores e o pré-cache no `install`
- Create: `scripts/swPrecache.test.mjs`
- Modify: `package.json`, com o script `"test:sw": "node --test scripts/swPrecache.test.mjs"`
- Modify: `scripts/qaTreasureOffline.mjs`

**Interfaces:**
- Produces: `public/sw.js` com as linhas exatas `const BUILD_ID = "dev";` e `const PRECACHE = [];`. O nome do cache passa a ser `` `mega-dungeon-${BUILD_ID}` ``. O `install` faz `cache.addAll([...ASSETS, ...PRECACHE.map((p) => BASE_URL + p)])`.
- Produces: `injectPrecache(swSource: string, files: string[], buildId: string) -> string` em `build/swPrecache.js`. Ela troca as duas linhas acima por `const BUILD_ID = "<buildId>";` e `const PRECACHE = <JSON dos files>;` e lança `Error` se alguma das duas não existir.
- Produces: `buildIdOf(entries: {path: string, content: Buffer}[]) -> string`, com os 10 primeiros caracteres hex do SHA-256 dos caminhos e conteúdos em ordem de caminho.
- Produces: `listDistFiles(dir: string) -> string[]`, com os caminhos relativos e separador `/` de todos os arquivos de `dist`, exceto `sw.js`, `*.map`, `index.html` e `manifest.webmanifest` (os três últimos já estão em `ASSETS`).
- Produces: `swPrecachePlugin()`, plugin do Vite com `apply: "build"` e hook `closeBundle`. Ele lê `dist`, calcula a lista e o id, reescreve `dist/sw.js` e informa no log quantos arquivos entraram na lista.

- [ ] **Step 1: Escrever os testes.**

```js
test("injectPrecache writes the list and the build id", () => {
  const out = injectPrecache(src, ["assets/a.js", "assets/icons/x.svg"], "abc123");
  assert.match(out, /const BUILD_ID = "abc123";/);
  assert.match(out, /const PRECACHE = \["assets\/a\.js","assets\/icons\/x\.svg"\];/);
});
test("injectPrecache throws when markers are missing", () => {
  assert.throws(() => injectPrecache("const X = 1;", [], "id"));
});
test("cache name changes when content changes", () => {
  const a = buildIdOf([{ path: "a.js", content: Buffer.from("1") }]);
  const b = buildIdOf([{ path: "a.js", content: Buffer.from("2") }]);
  assert.notEqual(a, b);
  assert.match(a, /^[0-9a-f]{10}$/);
});
test("public sw.js carries both markers", () => {
  assert.doesNotThrow(() => injectPrecache(readFileSync("public/sw.js", "utf8"), [], "x"));
});
```

  Aqui, `src` é o conteúdo real de `public/sw.js`, lido com `readFileSync`.
- [ ] **Step 2: Rodar e ver falhar.** Rode `npm run test:sw`. Deve falhar no import de `build/swPrecache.js`.
- [ ] **Step 3: Implementar** `build/swPrecache.js`, as mudanças em `public/sw.js` e o registro do plugin em `vite.config.js`.
- [ ] **Step 4: Rodar e ver passar.** Rode `npm run test:sw` e depois `npm run build`. Confira que `dist/sw.js` tem `BUILD_ID` diferente de `"dev"` e que `PRECACHE` inclui um arquivo que casa com `/treasureDialog.*\.js/` e outro sob `assets/icons/`.
- [ ] **Step 5: QA de primeira visita.** Em `scripts/qaTreasureOffline.mjs`:
  - troque o nome fixo `"mega-dungeon-v3"` por uma busca em `caches.keys()` pelo nome que começa com `mega-dungeon-`;
  - acrescente um segundo contexto de navegador, novo, que faz `goto`, passa o diálogo de faixa, espera `navigator.serviceWorker.controller` (recarregando uma vez, se necessário, para o SW assumir), desliga a rede **sem a recarga online do fluxo antigo**, recarrega e abre a modal de tesouros com as abas visíveis.

  Rode `npm run build`, depois `npx vite preview --port 4174` e então `npm run qa:treasure-offline`. Os dois cenários devem passar.
- [ ] **Step 6: Commit.** `feat: pré-cache offline do app na primeira visita`

### Task 5: Documentação e screenshots para o PO

**Files:**
- Modify: `ARCHITECTURE.md:510-548`, na seção Rolagem de tesouros

- [ ] **Step 1: Atualizar o `ARCHITECTURE.md`.**
  - Abas: “Seletor segmentado: **Gerar tesouros** e **Rolar na mesa**”.
  - Tire a legenda da descrição do campo Rolar.
  - Diga que a cascata mostra a página de cada passo.
  - Cite `test:sw` e o pré-cache gerado no build.
  - Acrescente o link para o spec `2026-11-21-acabamento-tesouros-design.md`.
  - Tire os cinco itens resolvidos dos “Próximos passos”. Se a lista ficar vazia, remova a seção.
- [ ] **Step 2: Verificar.** Rode `npm run test:treasure` e `npm run test:sw`, e confira com `grep -n "Rolar com o livro" ARCHITECTURE.md` que não sobrou nada.
- [ ] **Step 3: Screenshots.** Salve em `.playwright-mcp/` a modal com o seletor em 1024×768 nos dois perfis e em 768×1024, mais uma cascata com páginas. São para o PO conferir.
- [ ] **Step 4: Commit.** `docs: registra o acabamento da modal de tesouros`
