# Fichas sem ND numérico Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Cadastrar Luminar e Rival Espelho como fichas de consulta com ND “–” e “?”, abertas só pela escolha exata de ficha.

**Architecture:** `challenge.js` reconhece “–” e “?” como ND especiais. A ficha de combate em `nodeDialog.js` exibe “—” para valores ausentes e omite linhas vazias. As duas fichas entram nos arquivos de catálogo do seu tipo.

**Tech Stack:** JavaScript ES modules, `node:test`, Vite.

**Spec:** `docs/superpowers/specs/2026-11-20-fichas-sem-nd-design.md`

## Global Constraints

- ND gravado exatamente como impresso: `"–"` (traço meia-risca, U+2013) no Luminar e `"?"` no Rival Espelho.
- Referências: Luminar `T20 Deuses de Arton.pdf`, `bookPage` 275, `pdfPage` 277. Rival Espelho `T20 Ameacas de Arton.pdf`, `bookPage` 335, `pdfPage` 337.
- Blocos de Parceiro ficam fora das fichas.

## Review Focus

- Encontro com uma ficha de ND “–” ou “?”: o rótulo de ND do encontro mostra o valor impresso, sem `NaN`.
- Sorteio automático, rerrolagem e missões nunca escolhem as duas fichas.
- Ficha sem PV numérico: sem controle de PV nem de reforço e sem erro de JavaScript.
- Rival Espelho sem `size`: o subtítulo não mostra “undefined”.
- Vagalhão Kobold continua exibindo suas linhas, agora com “—”.

---

### Task 1: ND especial “–” e “?”

**Files:**
- Modify: `src/challenge.js:8-16`
- Test: `scripts/validateForestMvp.test.mjs`

**Interfaces:**
- Produces: `isSpecialChallengeRating(value)` verdadeiro para `"S"`, `"S+"`, `"–"` e `"?"`. `getChallengeRatingForStatistics(value)` devolve 20 só para S e S+, e `null` para “–” e “?”.

- [ ] **Step 1: Teste** `"unrated ND sheets are special and never drawn"`: `calculateCombatND([{ challengeRating: "?", quantity: 1 }]) === "?"`, o mesmo para `"–"`, e `getAutomaticCreatureCatalog()` não contém `luminar-deuses-de-arton` nem `rival-espelho`. A parte do catálogo passa a valer depois da Task 3.
- [ ] **Step 2: Implementar** os dois novos valores no conjunto e o retorno `null` em `getChallengeRatingForStatistics`.
- [ ] **Step 3: Rodar** `npm run -s test:floors-11-20` e confirmar que só falham as asserções do catálogo.

### Task 2: Valores ausentes na ficha de combate

**Files:**
- Modify: `src/nodeDialog.js:144-147` (`formatModifier`) e `:590-635` (`createCreatureDetail`)
- Test: `scripts/validateForestMvp.test.mjs`, teste da ficha renderizada (`sheetText`)

- [ ] **Step 1: Teste** com `sheetText`: `luminar-deuses-de-arton` casa com `/DEFESA\s+—, FORT —, REF —, VON —, imunidade a dano/` e com `/PONTOS DE VIDA\s+—/`. `rival-espelho` não casa com `/INICIATIVA|DEFESA|PONTOS DE VIDA/` e casa com `/Transferir Dor.*Mágica/`. `vagalhao-kobold` casa com `/FORT —/`.
- [ ] **Step 2: Implementar.** `formatModifier(null)` devolve `"—"`. A Defesa nula também aparece como `"—"`. As linhas de Iniciativa e Percepção, de Defesa e de PV são omitidas quando todos os seus valores e textos são nulos, e o mesmo vale para a linha de atributos. O subtítulo não imprime tamanho ausente.
- [ ] **Step 3: Rodar** `npm run -s test:floors-11-20`.

### Task 3: Cadastro das duas fichas

**Files:**
- Modify: `src/creatureCatalog/spirits.js` (Luminar, depois de `pilly`), `src/creatureCatalog/monsters.js` (Rival Espelho)
- Test: `scripts/validateForestMvp.test.mjs`

- [ ] **Step 1: Teste** `"Luminar and Rival Espelho keep their printed ND and references"`. Luminar: `challengeRating "–"`, `role "special"`, `type "spirit"`, `subtype "celestial"`, `size "Minúsculo"`, `stats.hitPoints null`, `stats.hitPointsText "—"`, `stats.initiative 12`, `stats.perception 8`, Abençoar e Aliviar com `magical`. Rival: `challengeRating "?"`, `role null`, `type "???"`, `size null`, “Transferir Dor” com `magical`, `treasure "Nenhum."`.
- [ ] **Step 2: Cadastrar** a partir das páginas conferidas. Luminar: atributos For null, Des 5, Con null, Int –2, Sab 1, Car 1. Perícias Diplomacia +8, Intuição +8. Rival: `stats` com campos nulos. A Task 2 omite as linhas.
- [ ] **Step 3: Rodar** as quatro validações: `test:floors-1-10`, `test:missions`, `test:floors-11-20` e `build`.
- [ ] **Step 4: Documentar.** Atualizar o plano de Deuses, o cadastro futuro de Ameaças e o ponto de retomada do spec da auditoria. Depois fazer o commit.
