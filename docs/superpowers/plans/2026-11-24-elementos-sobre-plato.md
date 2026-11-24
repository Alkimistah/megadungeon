# Elementos sobre o platô e porta do Farol — Plano de implementação

> **Para agentes:** SUB-SKILL OBRIGATÓRIA: superpowers:subagent-driven-development, conforme `docs/superpowers/processo-de-trabalho.md`. Os passos usam caixas (`- [ ]`).

**Objetivo:** um obstáculo, terreno difícil, árvore ou mato pintado sobre vantagem ou inclinação passa a ser desenhado como parte daquela área. O piso de base aparece embaixo, a borda do grupo segue contínua e o elemento fica por cima, com fundo transparente. A entrada da torre do Farol dos Náufragos ganha porta dupla.

**Arquitetura:**
- Em `buildEnvironmentScene` (`src/nodeTacticalMap.js`), ao aplicar as zonas da planta, a cena passa a registrar `terrainBase`: um array do tamanho da grade, com `null` ou o tipo de base (`advantage`, `slope`, `gentle-slope`, `steep-slope`).
- O renderer desenha a casa com a aparência da base, com as classes de contorno calculadas sobre "base ou terreno", e acrescenta `has-item item-<tipo>`. O CSS desenha o elemento num `::before`, usando o sprite transparente de feature do atlas.
- O terreno de jogo (`scene.terrain`) não muda.

**Tecnologias:** JavaScript ES Modules, CSS e Vite. Testes com `node --test` e QA com Playwright.

**Spec:** ajuste visual aprovado pelo PO na prévia `tmp/previas/elevacao/nivel.html`. O bloco CSS `/* ===== Proposta 2: elemento sobre o platô ===== */` e a função `build(…, withBase)` dessa página são a referência.

## Restrições globais

- `scene.terrain` e todo o comportamento de jogo ficam iguais: ocupação, movimento, posições iniciais e testes. A única mudança de dado é a porta da torre do Farol.
- O atlas não muda. As legendas continuam iguais.
- Mapas sem elemento sobre base não mudam em nada.
- Commits em `main`, em português, terminando com `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Sem push.

## Foco da revisão

1. **Base que se perde.** Uma zona que não é de elemento (água, parede, tábuas, buraco etc.) pintada por cima de uma casa com base precisa limpar a base. Teste na Tarefa 1.
2. **Contorno do grupo.** Um platô com um obstáculo no meio não pode ganhar borda em volta do obstáculo, mas um obstáculo no chão, ao lado do platô, continua do lado de fora da borda. Teste na Tarefa 1.
3. **Mapas sem planta.** Os mapas gerados por `applyTerrain` (sem `tacticalLayout`) têm `terrainBase` todo `null` ou ausente, e o renderer aceita a ausência. Teste na Tarefa 1.
4. **Cena serializada.** Se a cena tática for copiada, salva ou restaurada (`createTacticalScene`, `readLegacyTacticalScene` e a sessão de encontro), `terrainBase` precisa chegar ao renderer ou ser recalculado, sem quebrar cenas antigas que não têm o campo. Verifique o caminho e cubra o que for necessário.
5. **Porta do Farol.** As casas (12,6) e (12,7) viram `door`, em pé (`door-v`) e unidas. O marco da lente, os testes de ND, os marcos e a área inimiga dos Náufragos continuam passando.

---

### Task 1: Base sob o elemento e porta dupla do Farol

**Modelo:** `sonnet`. Revisão: `sonnet`.

**Arquivos:**
- Modificar: `src/nodeTacticalMap.js`: `buildEnvironmentScene` registra `terrainBase` e o repassa para a cena.
- Modificar: `src/tacticalScene.js`, se a cena tiver uma forma controlada: aceitar e preservar `terrainBase`, que é opcional.
- Modificar: `src/tacticalTerrain.js`: `getTerrainTileClasses(terrain, width, index, terrainBase = null)`.
- Modificar: `src/tacticalMapRenderer.js`: usar a base na classe visual da casa e acrescentar `has-item item-<tipo>`.
- Modificar: `src/tacticalTerrain.css`: as regras do `::before` do elemento, copiadas da prévia com prefixo de especificidade igual ao das regras de autotile.
- Modificar: `src/archipelagoTacticalMap.js`: no `center` dos Náufragos, a zona `["door", 12, 6, 1, 2]` entra no fim da lista.
- Modificar: os testes em `scripts/tacticalScene.test.mjs`, `scripts/archipelagoShipwrecked.test.mjs` e no teste de mapa por planta mais próximo de `buildEnvironmentScene`.

**Interfaces:**
- Constantes em `src/tacticalTerrain.js`:
  - `TERRAIN_ITEM_TYPES = ["obstacle", "difficult", "tree", "foliage"]`;
  - `TERRAIN_BASE_TYPES = ["advantage", "slope", "gentle-slope", "steep-slope"]`.
- Regra de `terrainBase` ao aplicar uma zona sobre a casa `k`:
  - se o tipo final da zona está em `TERRAIN_ITEM_TYPES` e a casa tinha terreno em `TERRAIN_BASE_TYPES` ou já tinha base, então `terrainBase[k] = terrainBase[k] ?? terrenoAnterior`;
  - em qualquer outra pintura de terreno, `terrainBase[k] = null`;
  - zonas que só criam feature, sem trocar o terreno, não mexem na base.
- `getTerrainTileClasses(terrain, width, index, terrainBase)` olha para `terrainBase?.[i] ?? terrain[i]`, tanto na própria casa quanto nos vizinhos, para decidir `is-auto` e `edge-*`. A orientação da porta continua usando `terrain` puro.
- O renderer usa `is-${terrainBase?.[index] ?? type}` como classe de aparência. Quando há base, acrescenta `has-item` e `item-${type}`. O `title` continua com o rótulo do terreno real.
- Posições dos sprites de feature no CSS: `item-obstacle` 85%, `item-difficult` 90% (pedregulho), `item-tree` 82.5%, `item-foliage` 87.5%.

#### Passos

- [ ] **Passo 1: testes que falham.**
  - `test("elemento sobre o platô guarda a base")`: numa planta com `["advantage", 2, 2, 5, 4]` e depois `["obstacle", 4, 3, 1, 1]`, a cena tem `terrain[3*20+4] === "obstacle"` e `terrainBase[3*20+4] === "advantage"`. Com `["water", 4, 3, 1, 1]` por cima disso, a base volta a `null`. Um `["difficult", 10, 10, 2, 2]` fora do platô fica com base `null`.
  - `test("contorno ignora o elemento sobre a base")`: num platô 5×4 com um obstáculo no meio e `terrainBase` preenchido, `getTerrainTileClasses` das casas vizinhas ao obstáculo não traz `edge-*` voltado para ele. O obstáculo recebe `is-auto` com as bordas do contorno do platô. Sem `terrainBase`, o comportamento é o de antes.
  - `test("entrada do farol tem porta dupla")`: no mapa do Centro dos Náufragos, as casas (12,6) e (12,7) são `door`, e `getTerrainTileClasses` dá `door-v`, com `join-bottom` na de cima e `join-top` na de baixo.
- [ ] **Passo 2: rodar e ver falhar.**
- [ ] **Passo 3: implementar**, seguindo as interfaces acima.
- [ ] **Passo 4: rodar.**
  - Os testes: `node --test scripts/tacticalScene.test.mjs scripts/tacticalEncounterSession.test.mjs scripts/extendedTacticalMap.test.mjs scripts/dungeonTacticalLayouts.test.mjs scripts/forestTacticalLayouts.test.mjs`, `npm run test:archipelago`, `npm run test:archipelago-missions`, `npm run test:ranges` e `npm run build`. Tudo verde.
  - O QA: `node scripts/qaTacticalScene.mjs`, com o dev server em http://localhost:5173/megadungeon/ já rodando.
  - A conferência visual: renderize o Centro dos Náufragos com os módulos reais do app, numa página descartável em `tmp/`, e tire uma captura no scratchpad. Confira que as pedras e as cinzas aparecem sobre o platô, sem buraco, e que a porta dupla aparece em pé na entrada. Apague a página depois.
- [ ] **Passo 5: commit.** `feat: elementos sobre o platô no mesmo nível e porta dupla no Farol`

---

### Fechamento (gerente)

- Revisão final com `opus`.
- Validação do PO no app. Depois, apagar `tmp/previas/elevacao/` e `tmp/previas/ilha-naufragos/`.
