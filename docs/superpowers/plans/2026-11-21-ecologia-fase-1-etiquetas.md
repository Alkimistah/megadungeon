# Ecologia — Fase 1: etiquetas das criaturas Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Dar a cada uma das 574 fichas do catálogo etiquetas de ecologia validadas: terreno, lugar especial, condição, comportamento em grupo, raridade e só manual. O rascunho é automático, conferido com os livros e revisado pelo PO numa planilha, e um script transforma a planilha aprovada em `src/creatureCatalog/ecology.js`.

**Architecture:**
- O vocabulário fica em `src/creatureCatalog/ecologyVocabulary.js`.
- As etiquetas ficam em `src/creatureCatalog/ecology.js` (id → etiquetas), no padrão de `sources.js`. `src/creatureCatalog/index.js` anexa `creature.ecology` a cada ficha, com um padrão neutro quando a ficha não tem entrada.
- As regras de sugestão são funções puras em `scripts/ecology/draftRules.mjs`.
- O rascunho e a aplicação são scripts de linha de comando. A conferência com os livros usa `tools/pdf/`.
- Esta fase **não** muda o gerador de encontros. Isso fica para a fase 2.

**Tech Stack:** JavaScript ES Modules, `node:test`, `tools/pdf` (pdfjs-dist), CSV em UTF-8 com BOM para abrir no Excel ou no LibreOffice.

**Spec:** `docs/superpowers/specs/2026-11-21-ecologia-e-encontros-design.md`

## Execução

O processo segue `docs/superpowers/processo-de-trabalho.md`.

| Tarefa | Implementador | Revisor |
|---|---|---|
| 1. Vocabulário, `ecology.js` vazio e anexação ao catálogo | sonnet | sonnet |
| 2. Regras do rascunho e script que gera o CSV | opus | opus |
| 3. Conferência com os livros, em lotes | sonnet por lote | sonnet, por amostragem |
| 4. Planilha de revisão para o PO | haiku | gerente |
| — | **Pausa: o PO revisa a planilha** | — |
| 5. Aplicação da planilha revisada em `ecology.js` | sonnet | sonnet |
| 6. Documentação | haiku | sonnet |
| Revisão final | — | opus |

## Global Constraints

- **Vocabulário exato.** Os ids ficam em minúsculas e sem acento. Os rótulos têm acento.
  - **Terrenos:** `aquatico` “Aquático”, `artico` “Ártico”, `colina` “Colina”, `deserto` “Deserto”, `floresta` “Floresta”, `montanha` “Montanha”, `pantano` “Pântano”, `planicie` “Planície”, `subterraneo` “Subterrâneo”.
  - **Lugares:** `masmorra` “Masmorra construída”, `ruinas` “Ruínas”, `catacumbas` “Catacumbas/necrópole”, `cavernas-profundas` “Cavernas profundas/minas”, `colmeia` “Colmeia/ninho”, `urbano` “Urbano”, `alturas` “Alturas”, `vulcanico` “Vulcânico”, `costa-ilhas` “Costa e ilhas”, `mar-aberto` “Mar aberto”, `planos-elementais` “Planos elementais”, `infernal` “Infernal/abissal”, `tormenta` “Tormenta”.
  - **Condições:** `neblina` “Neblina”, `escuridao` “Escuridão”, `calor` “Calor extremo”, `frio` “Frio extremo”, `tempestade` “Tempestade”, `miasma` “Miasma”.
  - **Grupo:** `solitaria` “Solitária”, `dupla` “Dupla”, `bando` “Bando”, `enxame` “Enxame”, `horda` “Horda”.
  - **Raridade:** `comum` “Comum”, `incomum` “Incomum”, `rara` “Rara”.
- **Padrão neutro,** para ficha sem entrada: `{ terrains: [], places: [], conditions: [], group: null, rarity: "comum", manualOnly: false, reviewed: false }`.
- **As fichas do catálogo não são editadas.** Nenhum arquivo `creatureCatalog/<tipo>.js` muda nesta fase.
- **Toda etiqueta sugerida tem um motivo.** O motivo é uma regra de subtipo ou tipo, uma palavra-chave com o trecho que a contém, ou uma citação do livro com a página do PDF.
- **Os arquivos de trabalho ficam em `tmp/ecologia/`.** A pasta `tmp/` não é versionada. Só `ecology.js` e o vocabulário entram no Git.
- **A faixa 1–10 e o gerador de encontros não mudam.**
- **Sem dependências novas no app.** As ferramentas de PDF já existem em `tools/pdf/`.

## Review Focus

- **Criatura que mora em vários terrenos.** O Alghari, por exemplo, mora em pântanos, rios, florestas inundadas e lagos subterrâneos, e deve receber `pantano`, `aquatico`, `floresta` e `subterraneo`. Não pode ficar só com o primeiro terreno encontrado. Coberto pelo teste `draft keeps every habitat mentioned` da Tarefa 2.
- **Palavra-chave em contexto negativo ou comparativo.** Frases como “raramente vista fora de florestas” ou “ao contrário dos parentes do deserto” não podem virar etiqueta certa. Esses casos ficam com confiança baixa e vão para a conferência. Coberto pelo teste `negated or comparative mention lowers confidence` da Tarefa 2.
- **Planilha com vírgulas e aspas nas citações.** O CSV precisa abrir certo no Excel e no LibreOffice, e a ida e volta (gerar, editar e aplicar) não pode perder etiquetas. Coberto pelo teste `csv round trip preserves quotes, commas and accents` da Tarefa 5.
- **Etiqueta digitada errada pelo PO.** “pantano” sem acento, “Pântano” com acento e espaços extras têm que ser aceitos. Palavras desconhecidas são recusadas com a linha e a criatura apontadas, e nada é aplicado pela metade. Coberto pelo teste `apply rejects unknown tags with row and creature` da Tarefa 5.
- **Fichas sem ND numérico e do tipo `event`.** Elas saem como só manual no rascunho. Coberto pelo teste `non-numeric ND and events are manual-only` da Tarefa 2.

---

### Task 1: Vocabulário, `ecology.js` e anexação ao catálogo

**Files:**
- Create: `src/creatureCatalog/ecologyVocabulary.js`
- Create: `src/creatureCatalog/ecology.js`, com `export const ecologyByCreatureId = {};` e um comentário de cabeçalho dizendo que o arquivo é gerado por `scripts/ecology/apply.mjs` e não deve ser editado à mão
- Modify: `src/creatureCatalog/index.js` (`withThreatRoleMetadata` e o `map` de `creaturesByType`)
- Create: `scripts/ecology.test.mjs`
- Modify: `package.json`, com `"test:ecology": "node --test scripts/ecology.test.mjs"`

**Interfaces:**
- Produces: `TERRAINS`, `PLACES`, `CONDITIONS`, `GROUPS` e `RARITIES` como arrays congelados de `{ id, label }`, exatamente como em Global Constraints.
- Produces: `normalizeTag(category, text) -> id | null`. Aceita o id ou o rótulo, com ou sem acento e sem diferenciar maiúsculas, e remove espaços.
- Produces: `validateEcology(entry) -> string[]`, uma lista de erros que fica vazia quando a entrada é válida.
- Produces: `NEUTRAL_ECOLOGY`.
- Produces: `getCreatureEcology(id)`, em `index.js`. Devolve a entrada de `ecology.js` ou `NEUTRAL_ECOLOGY`.
- Produces: cada criatura de `creatureCatalog` ganha a propriedade `ecology`.

- [ ] **Step 1: Escrever os testes.**

```js
test("vocabulary matches the spec", () => {
  assert.deepEqual(TERRAINS.map((t) => t.id), ["aquatico","artico","colina","deserto","floresta","montanha","pantano","planicie","subterraneo"]);
  assert.equal(PLACES.length, 13); assert.equal(CONDITIONS.length, 6); assert.equal(GROUPS.length, 5); assert.equal(RARITIES.length, 3);
});
test("normalizeTag accepts ids, labels, accents and case", () => {
  assert.equal(normalizeTag("terrains", "Pântano"), "pantano");
  assert.equal(normalizeTag("terrains", " pantano "), "pantano");
  assert.equal(normalizeTag("places", "Costa e ilhas"), "costa-ilhas");
  assert.equal(normalizeTag("terrains", "lava"), null);
});
test("validateEcology flags unknown tags and bad shapes", () => {
  assert.deepEqual(validateEcology(NEUTRAL_ECOLOGY), []);
  assert.ok(validateEcology({ ...NEUTRAL_ECOLOGY, terrains: ["lava"] }).length > 0);
  assert.ok(validateEcology({ ...NEUTRAL_ECOLOGY, rarity: "lendaria" }).length > 0);
});
test("every ecology entry points to a catalog creature and is valid", () => {
  for (const [id, entry] of Object.entries(ecologyByCreatureId)) {
    assert.ok(getCreatureById(id), `ecologia sem ficha: ${id}`);
    assert.deepEqual(validateEcology(entry), [], id);
  }
});
test("creatures without entry get the neutral ecology", () => {
  const sample = creatureCatalog.find((c) => !ecologyByCreatureId[c.id]);
  assert.deepEqual(sample.ecology, NEUTRAL_ECOLOGY);
});
```

- [ ] **Step 2:** rode `npm run test:ecology`. Ele deve falhar, porque os módulos ainda não existem.
- [ ] **Step 3: Implementar.** As entradas de `ecology.js` são anexadas tal como estão, depois de validadas. Se o import encontrar uma entrada inválida, ele lança erro com o id da criatura.
- [ ] **Step 4:** rode `npm run test:ecology` e veja passar. Depois rode `test:floors-1-10`, `test:floors-11-20`, `test:archipelago` e `test:treasure`, que precisam continuar passando, porque o gerador ainda ignora `ecology`.
- [ ] **Step 5: Commit.** `feat: vocabulário de ecologia e anexação das etiquetas ao catálogo`

### Task 2: Regras do rascunho e script que gera o CSV

**Files:**
- Create: `scripts/ecology/draftRules.mjs`, com funções puras e sem I/O
- Create: `scripts/ecology/draft.mjs`, a linha de comando
- Create: `scripts/ecology/csv.mjs`, que lê e escreve CSV com aspas, BOM e `;` como separador (o padrão do Excel em pt-BR)
- Modify: `scripts/ecology.test.mjs`
- Modify: `package.json`, com `"ecology:draft": "node scripts/ecology/draft.mjs"`

**Interfaces:**
- Consumes: `creatureCatalog` e o vocabulário (Tarefa 1).
- Produces: `suggestEcology(creature) -> { tags: EcologyEntry, confidence: "alta"|"media"|"baixa", reasons: string[], needsBook: boolean }`.
- Produces: `writeCsv(rows, file)` e `readCsv(file) -> rows`, em `csv.mjs`. A Tarefa 5 também usa os dois.
- Produces: o arquivo `tmp/ecologia/rascunho.csv`. As colunas, nesta ordem: `familia`, `id`, `nome`, `livro`, `pagina_pdf`, `tipo`, `subtipo`, `nd`, `papel`, `terrenos`, `lugares`, `condicoes`, `grupo`, `raridade`, `so_manual`, `confianca`, `precisa_livro`, `motivos`, `citacao`. As listas usam `, ` como separador e rótulos com acento. `familia` é `variantOf ?? subtipo ?? tipo`.

**Regras, decididas pelo gerente:**
- **Tipo e subtipo.** A tabela `SUBTYPE_RULES` em `draftRules.mjs` dá etiquetas-base com o motivo “regra de subtipo”. Cada regra precisa de um comentário com a justificativa. Valores mínimos obrigatórios:
  - mortos-vivos (`undead`) recebem o lugar `catacumbas` e a condição `miasma`, com confiança média;
  - `spirit/elemental` recebe `planos-elementais`;
  - `spirit/abissal` recebe `infernal`;
  - os subtipos `lefeu` e `lefou` recebem `tormenta`;
  - `monster/dragão` recebe `alturas`;
  - `humanoid/nagah` recebe `pantano`;
  - goblinoides (`goblin`, `hobgoblin`, `bugbear`) recebem `subterraneo` e `floresta`;
  - `construct` recebe `masmorra` e `cavernas-profundas`, com confiança baixa.
- **Palavras-chave na descrição.** A tabela `KEYWORDS` liga radicais em português ao vocabulário, por exemplo:
  - `pântan` → `pantano`, `florest|bosque|mata` → `floresta`, `subterr|caverna|galeria` → `subterraneo`;
  - `rio|lago|mar|oceano|água|aquát` → `aquatico`, `geleira|neve|gelad|ártic` → `artico`;
  - `desert|duna` → `deserto`, `montanh|pico|cordilheira` → `montanha`, `colina` → `colina`;
  - `planície|campo|pradaria` → `planicie`, `cidade|esgoto|urban` → `urbano`;
  - `ruína` → `ruinas`, `cripta|cemitério|catacumba|necrópole` → `catacumbas`;
  - `vulc|lava|magma` → `vulcanico`, `costa|praia|ilha` → `costa-ilhas`;
  - `névoa|neblina|bruma` → `neblina`, `escurid|trevas|sem luz` → `escuridao`;
  - `enxame` → grupo `enxame`, `bando|matilha|alcateia` → `bando`, `horda|tropa|legião` → `horda`.
  
  Cada acerto guarda os cerca de 80 caracteres em volta como motivo.
- **Contexto negativo ou comparativo.** Se nos 30 caracteres antes da palavra houver “raramente”, “nunca”, “ao contrário”, “fora de”, “exceto” ou “longe de”, a palavra não vira etiqueta. Ela é registrada como motivo duvidoso, e a confiança cai para baixa.
- **Grupo.** O padrão vem do papel de ameaça: `minion` dá `bando`, `solo` dá `solitaria`, `special` dá `dupla`. Nome com “Enxame” ou “Tropa” vale mais que o papel.
- **Raridade.** O padrão é `comum`. Subtipo `dragão`, papel `solo` com ND ≥ 10 ou nome com “Ancião/Rainha/Rei/Lorde” dão `rara`. Papel `solo` com ND < 10 dá `incomum`.
- **Só manual.** É `true` para ND não numérico (`S`, `S+`, `–`, `?`), para o tipo `event` e para o tipo `???`. Também é `true` para as fichas de `divineAspects.js` (avatares e aspectos), que precisam ser identificadas pela origem.
- **Confiança.**
  - **alta:** a descrição tem pelo menos um terreno sem dúvida, e nenhuma regra conflita com ela;
  - **media:** só a regra de subtipo ou só uma palavra-chave;
  - **baixa:** não há descrição, só a regra de tipo, ou há um motivo duvidoso.
- **Precisa do livro.** `needsBook` é `true` quando a confiança é baixa ou a ficha não tem descrição.

- [ ] **Step 1: Escrever os testes.** Use fichas sintéticas, montadas no próprio teste.

```js
test("draft keeps every habitat mentioned", () => {
  const s = suggestEcology({ id: "x", type: "monster", subtype: null, challengeRating: 4, role: "solo",
    description: "Vivem perto de grandes corpos d'água em áreas sombrias, como pântanos, rios, florestas inundadas e até mesmo lagos subterrâneos." });
  for (const t of ["pantano", "aquatico", "floresta", "subterraneo"]) assert.ok(s.tags.terrains.includes(t), t);
});
test("negated or comparative mention lowers confidence", () => {
  const s = suggestEcology({ id: "y", type: "animal", challengeRating: 1, role: "minion", description: "Raramente vistas fora de florestas temperadas." });
  assert.equal(s.confidence, "baixa"); assert.ok(!s.tags.terrains.includes("floresta"));
});
test("non-numeric ND and events are manual-only", () => {
  assert.equal(suggestEcology({ id: "z", type: "spirit", challengeRating: "S", role: null }).tags.manualOnly, true);
  assert.equal(suggestEcology({ id: "w", type: "event", challengeRating: 2, role: null }).tags.manualOnly, true);
});
test("every suggested tag has a reason and passes validation", () => {
  for (const c of creatureCatalog) { const s = suggestEcology(c); assert.deepEqual(validateEcology(s.tags), [], c.id); if (s.tags.terrains.length || s.tags.places.length) assert.ok(s.reasons.length > 0, c.id); }
});
test("swarm name wins over role for group", () => {
  assert.equal(suggestEcology({ id: "e", name: "Enxame de mãos-garra", type: "undead", challengeRating: 3, role: "solo" }).tags.group, "enxame");
});
```

- [ ] **Step 2:** rode `npm run test:ecology` e veja falhar.
- [ ] **Step 3: Implementar** `draftRules.mjs`, `csv.mjs` e `draft.mjs`. O script grava `tmp/ecologia/rascunho.csv`, ordenado por `familia` e depois por `nd`, e imprime um resumo: quantas fichas há em cada nível de confiança e quantas precisam do livro.
- [ ] **Step 4:** rode `npm run test:ecology` e veja passar. Depois rode `npm run ecology:draft` e confira o resumo. As 574 fichas precisam estar no arquivo. As fichas do Alghari e das mãos-garra precisam ter terreno ou lugar coerente com o livro; procure-as no CSV.
- [ ] **Step 5: Commit.** `feat: rascunho automático de etiquetas de ecologia`. Os arquivos em `tmp/` não entram no commit.

### Task 3: Conferência com os livros, em lotes

**Files:**
- Read: `tmp/ecologia/rascunho.csv`
- Create: `tmp/ecologia/lotes/lote-NN.csv`, a entrada, e `tmp/ecologia/conferido/lote-NN.csv`, a saída. Nada disso é versionado.
- Create: `scripts/ecology/batches.mjs` (`npm run ecology:batches`), que divide e junta os lotes.

**Interfaces:**
- Consumes: `readCsv` e `writeCsv` (Tarefa 2) e `tools/pdf/text.mjs` e `render.mjs`.
- Produces: `node scripts/ecology/batches.mjs split`, que gera lotes de até 40 linhas com `precisa_livro = sim`, agrupados por livro e por família.
- Produces: `node scripts/ecology/batches.mjs merge`, que gera `tmp/ecologia/conferido.csv`. Esse arquivo é o rascunho completo, com as linhas conferidas substituídas.

**Contrato de cada lote, para o subagente:**
- Para cada linha, ler a página `pagina_pdf` do livro com `node tools/pdf/text.mjs "<livro>" <pág> <pág+1>`. Se a diagramação embaralhar o texto, usar `render.mjs` e ler a imagem.
- Ajustar `terrenos`, `lugares`, `condicoes`, `grupo` e `raridade` só com base no texto do livro. A coluna `citacao` recebe o trecho exato, de até 200 caracteres, seguido de “(PDF n)”.
- Se o livro não disser nada sobre onde a criatura vive, manter as etiquetas da regra, escrever “livro não informa habitat” em `citacao` e deixar `confianca = baixa`.
- Nunca inventar habitat. Mudar `confianca` para `alta` só com citação.
- Não editar arquivos do app nem do Git. Gravar só o arquivo de saída do lote.

- [ ] **Step 1:** implemente `batches.mjs`, com um teste de que `split` seguido de `merge`, sem alterações, devolve o rascunho idêntico. Faça o commit (`feat: lotes de conferência da ecologia`).
- [ ] **Step 2:** rode `split`. O gerente despacha um subagente sonnet por lote, sequencialmente, cada um com o contrato acima.
- [ ] **Step 3:** depois de cada lote, um revisor sonnet confere 5 linhas sorteadas contra o PDF: se a citação existe na página e se as etiquetas seguem a citação. Se mais de 1 das 5 estiver errada, o lote é refeito.
- [ ] **Step 4:** rode `merge` e confira o resumo. Toda linha com `precisa_livro = sim` precisa ter `citacao` preenchida.

### Task 4: Planilha de revisão para o PO

**Files:**
- Create: `tmp/ecologia/revisao.csv`, gerado por `node scripts/ecology/batches.mjs review`
- Create: `tmp/ecologia/LEIA-ME.md`, as instruções de revisão em português

**Formato da planilha:**
- Uma linha por criatura, agrupada por `familia`, e as famílias em ordem alfabética.
- Uma linha de cabeçalho de família, por exemplo `== Goblinoides (11) ==`, separa os grupos.
- Colunas, na ordem: `familia`, `nome`, `nd`, `terrenos`, `lugares`, `condicoes`, `grupo`, `raridade`, `so_manual`, `confianca`, `citacao`, `id`, `livro`, `pagina_pdf`. As colunas editáveis vêm primeiro, e as técnicas ficam no fim.
- A planilha também traz uma aba ou um arquivo `vocabulario.csv` com as palavras válidas de cada coluna, para o PO consultar.
- O `LEIA-ME.md` explica:
  - como abrir o arquivo com `;`;
  - quais colunas editar;
  - que a revisão pode ser feita só de algumas famílias, porque linhas não revisadas mantêm a sugestão;
  - a coluna `revisado`, que o PO marca com “x”.

- [ ] **Step 1:** implemente `review`, com um teste de que a planilha tem uma linha por ficha mais os cabeçalhos de família. Faça o commit (`feat: planilha de revisão da ecologia`).
- [ ] **Step 2: O gerente avisa o PO e PARA.** A execução só continua quando o PO disser que revisou, mesmo que parcialmente.

### Task 5: Aplicação da planilha revisada

**Files:**
- Create: `scripts/ecology/apply.mjs` (`npm run ecology:apply -- tmp/ecologia/revisao.csv`)
- Modify (gerado): `src/creatureCatalog/ecology.js`
- Modify: `scripts/ecology.test.mjs`

**Interfaces:**
- Consumes: `readCsv`, `normalizeTag` e `validateEcology`.
- Produces: `ecology.js`, gerado de forma determinística: entradas ordenadas por id, um objeto por linha, `reviewed: true` nas linhas com “x” em `revisado` e `false` nas demais.

- [ ] **Step 1: Escrever os testes.**

```js
test("csv round trip preserves quotes, commas and accents", () => {
  const rows = [{ nome: 'Glop "grande"', citacao: "pântanos, rios; lagos", terrenos: "Pântano, Aquático" }];
  writeCsv(rows, tmpFile); assert.deepEqual(readCsv(tmpFile), rows);
});
test("apply rejects unknown tags with row and creature", () => {
  assert.throws(() => buildEcologyFromRows([{ id: "glop", nome: "Glop", terrenos: "Lava" }]), /linha 2.*glop.*Lava/i);
});
test("apply accepts labels without accents and extra spaces", () => {
  const eco = buildEcologyFromRows([{ id: "glop", nome: "Glop", terrenos: " pantano , Aquático", lugares: "", condicoes: "", grupo: "Bando", raridade: "comum", so_manual: "", revisado: "x" }]);
  assert.deepEqual(eco.glop.terrains, ["aquatico", "pantano"]);
  assert.equal(eco.glop.reviewed, true);
});
test("apply is all-or-nothing", () => { /* com uma linha inválida, ecology.js não é reescrito */ });
```

  `buildEcologyFromRows` é exportado por `apply.mjs`. Ele ignora as linhas de cabeçalho de família e as linhas sem `id`.
- [ ] **Step 2:** rode e veja falhar.
- [ ] **Step 3: Implementar.** Valide tudo antes de escrever. Se houver qualquer erro, liste todos os erros (linha, id e valor) e não altere `ecology.js`.
- [ ] **Step 4:** rode `npm run ecology:apply -- tmp/ecologia/revisao.csv` e depois `npm run test:ecology`. O teste da Tarefa 1, “every ecology entry points to a catalog creature and is valid”, agora roda sobre os dados reais. Rode também `test:floors-1-10`, `test:floors-11-20`, `test:archipelago` e `qa:floors-11-20`.
- [ ] **Step 5: Commit.** `feat: etiquetas de ecologia das 574 fichas` (com `ecology.js` e o script).

### Task 6: Documentação

**Files:**
- Modify: `ARCHITECTURE.md`. Na seção “Criaturas” (`creatureCatalog/`), descreva:
  - a ecologia: vocabulário, `ecology.js`, padrão neutro e só manual;
  - o fluxo `ecology:draft` → `ecology:batches split/merge/review` → revisão do PO → `ecology:apply`;
  - que o cadastro de um livro novo deve vir acompanhado das etiquetas no mesmo fluxo.
  
  Acrescente o link para o spec. Em “Continuam abertos”, troque o item do encontro manual por um apontamento às fases 2 (gerador), 3 (encontro manual) e 4 (Bestiário).

- [ ] **Step 1:** atualize o `ARCHITECTURE.md`.
- [ ] **Step 2:** rode `npm run test:ecology`.
- [ ] **Step 3: Commit.** `docs: registra a ecologia das criaturas`

---

## Fases seguintes, que terão planos próprios depois desta

- **Fase 2, gerador por etiquetas.** Depende de `ecology.js` revisado, ao menos para as famílias das faixas 11–30.
- **Fase 3, encontro manual novo.** Depende da fase 2, pela função de candidatos filtrados.
- **Fase 4, Bestiário de Arton.** Pode começar em paralelo à fase 2, pelo cadastro das fichas. As etiquetas dessas fichas passam pelo mesmo fluxo desta fase, já com o livro aberto na mão.
