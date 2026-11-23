# Missões por ilha — plano de implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** As missões dos andares 21–29 passam a ser cenas da ilha, com conteúdo, combate e mapa coerentes com o tema. Cada ilha tem no máximo uma missão, e o acesso fica no rodapé da ficha.

**Architecture:** Um novo módulo de dados (`src/missions/archipelagoMissionThemes.js`) guarda, por `themeId`, as listas temáticas, a missão em destaque e os elementos do mapa. O gerador de missões, o mapa tático e um novo módulo de encontro de caçada leem esse módulo pelo `destination.targetId`. No modo `archipelago`, o vínculo com os setores deixa de existir.

**Tech Stack:** JavaScript ES modules, Vite, testes com `node --test` em `scripts/*.test.mjs`.

**Spec:** [docs/superpowers/specs/2026-11-23-missoes-por-ilha-design.md](../specs/2026-11-23-missoes-por-ilha-design.md)

## Global Constraints

- Temas com missão: `tropical`, `mangrove`, `atoll`, `coral-coast`, `volcanic`, `sea-caves`, `pirate-held`, `floating`, `storm`, ou seja, `enabledThemeIds` sem `dinosaurs`.
- De 1 a 8 ofertas (`offerCountMin` 1 / `offerCountMax` 8), no máximo uma por ilha (andares 21–29).
- Categorias do arquipélago: as 8 atuais mais `specialHunt`. `extermination` continua fora.
- Com Caminhos desconhecidos ligado, o destino aparece como "Ilha N", sem o nome da ilha, em todos os textos novos.
- As missões não criam dano nem CD próprios. Usam CD e armadilhas pelas regras existentes de `missionTacticalMap.js`.
- O mapa usa só tipos de célula já conhecidos por `tacticalMapRenderer.js`.
- Os textos do app ficam em português, no estilo das ilhas existentes.
- Os commits vão para `main` em português (`feat:`/`fix:`/`docs:`), terminando com `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Push só a pedido do PO.
- As prévias ficam em `.playwright-mcp/missoes-arquipelago/` e são apagadas depois da validação.

## Review Focus

1. **Sessão salva antes da mudança** (missão com vínculo `kind: "objective"`, rótulo "Ilha 21 - Atol Circular", sem `targetId`): carrega sem erro, o botão do rodapé aparece na ilha certa e o mapa usa o caminho genérico. Teste na Tarefa 5.
2. **Caminhos desconhecidos ligado:** o nome da ilha não aparece no cartão da oferta, na modal nem na descrição de missões novas. Teste na Tarefa 2 (descrição) e na Tarefa 5 (rótulo exibido).
3. **Caminhos desconhecidos alternado durante a expedição:** o rótulo exibido acompanha o estado atual, porque nada fica gravado. Teste na Tarefa 5.
4. **Caçada numa ilha cujo elenco não tem criatura perto do ND da faixa** (8–10): ainda sai um alvo válido, e o encontro nunca passa do ND da caçada. Teste na Tarefa 3.
5. **Sementes com 8 ofertas:** 8 andares diferentes, e nenhuma oferta inválida descartada deixa uma ilha repetida. Teste na Tarefa 2.

---

### Task 1: Conteúdo por tema e prévia em cartões

**Files:**
- Create: `src/missions/archipelagoMissionThemes.js`
- Create: `scripts/archipelagoMissions.test.mjs`
- Modify: `package.json` (script `test:archipelago-missions`: `node --test scripts/archipelagoMissions.test.mjs`)
- Modify: `src/tacticalMapRenderer.js:60` (exportar `TACTICAL_LEGEND_ORDER`)
- Create (prévia, sem commit): `.playwright-mcp/missoes-arquipelago/conteudo.html`

**Interfaces:**
- Produces:
  - `ARCHIPELAGO_MISSION_THEMES: Record<themeId, ThemeEntry>`
  - `getArchipelagoMissionTheme(themeId): ThemeEntry | null`
  - `ThemeEntry = { pools: { locations, materials, objects, mementos, clues, challenges, phenomena: string[] }, featured: FeaturedMission, map: { markers: string[], landmark: { name, effect } } }`
  - `FeaturedMission = { category, title, targetName, lead, condition, proofType, creatureId?, landmark?: { name, effect } }`. `creatureId` é obrigatório quando `category === "specialHunt"`. `lead` é a frase de abertura sem o nome da ilha.
  - `TACTICAL_LEGEND_ORDER` exportado de `tacticalMapRenderer.js`.

- [ ] **Passo 1: Escrever o teste de cobertura que falha**

```js
test("todo tema ativo do arquipélago tem pacote de missões completo", () => {
  const themes = archipelago21to30Profile.archipelago.enabledThemeIds.filter(id => id !== "dinosaurs");
  for (const id of themes) {
    const entry = getArchipelagoMissionTheme(id);
    assert.ok(entry, `${id} sem entrada`);
    for (const pool of ["locations","materials","objects","mementos","clues","challenges","phenomena"])
      assert.ok(entry.pools[pool].length >= 4 && entry.pools[pool].length <= 6, `${id}.${pool}`);
    assert.ok(MISSION_CATEGORIES[entry.featured.category], `${id} categoria`);
    assert.notEqual(entry.featured.category, "extermination");
    if (entry.featured.category === "specialHunt") assert.ok(getCreatureById(entry.featured.creatureId), `${id} criatura`);
    assert.ok(entry.map.markers.length >= 2);
    for (const marker of entry.map.markers) assert.ok(TACTICAL_LEGEND_ORDER.includes(marker), `${id} marcador ${marker}`);
  }
});
test("nenhum texto de missão por tema cita o nome de outra ilha", () => { /* para cada tema, nenhum string de pools/featured contém o `name` de outro tema do perfil */ });
```

Confira o caminho de `enabledThemeIds` no perfil antes de usá-lo, porque ele pode estar fora de `archipelago`.

- [ ] **Passo 2:** `npm run test:archipelago-missions`. Esperado: FAIL, porque o módulo ainda não existe.
- [ ] **Passo 3: Escrever `archipelagoMissionThemes.js` com os 9 temas**

Fontes de tom e de terreno: as narrativas e os objetivos de cada tema em `archipelago21to30.js:138-166`, o `terrain` dos módulos `src/archipelago<Tema>.js` e os setores de `archipelagoPilot.js` (Tropical, Manguezal). Regras do conteúdo:
- **Listas:** 4 a 6 itens por lista, só coisas que existem naquela ilha.
- **Missão em destaque:** uma por tema. Pelo menos 2 dos 9 temas têm a destaque como `specialHunt`, e pelo menos 1 dessas com um alvo fora do lugar escolhido de propósito (exemplo da spec: dinossauro na `floating`). O `creatureId` da caçada sai de `islandCreatures` em `src/archipelagoCreatureRules.js` ou das composições de `dinosaurExploration`, com ND entre 7 e 11.
- **Marcadores:** use os tipos de célula que combinam com o tema (`lava` na `volcanic`, `swamp`/`wet` na `mangrove`, `water`/`current` nos costeiros, `wind` na `storm` e na `floating`, `deck` na `pirate-held`…).
- **`profile.missionRules.targetPools`:** retire os itens ligados a um tema (coral, recifes, algas, areia planar) e deixe só alvos neutros, com 3 itens no mínimo por lista.

- [ ] **Passo 4:** `npm run test:archipelago-missions`. Esperado: PASS.
- [ ] **Passo 5: Gerar a prévia em cartões para o PO**

Crie `.playwright-mcp/missoes-arquipelago/conteudo.html`: uma página estática com um cartão por tema contendo o ícone da ilha (`icon` do perfil), a missão em destaque em destaque visual e as listas em blocos curtos. Não é uma planilha. O gerente mostra a página ao PO e só segue para a Tarefa 2 depois da aprovação ou dos ajustes no conteúdo.
- [ ] **Passo 6: Commit**

```bash
git add src/missions/archipelagoMissionThemes.js scripts/archipelagoMissions.test.mjs package.json src/tacticalMapRenderer.js src/floorProfiles/archipelago21to30.js
git commit -m "feat: adiciona o conteúdo de missões por tema do arquipélago"
```

### Task 2: Gerador, uma missão por ilha e fim do vínculo com setores

**Files:**
- Modify: `src/missions/missionGenerator.js` (`getDestination` ~183, `createObjective`, `createMissionOffer` ~503, `generateMissionOffers` ~596, `getCreatureTarget` ~106)
- Modify: `src/missions/missionProfileAdapters.js:234-260` (`materializeMissionsForCurrentContent`)
- Modify: `src/archipelagoCreatureRules.js` (exportar o elenco)
- Modify: `src/floorProfiles/archipelago21to30.js` (`allowedCategories` + `specialHunt`, `categoryWeights.specialHunt: 10`)
- Test: `scripts/archipelagoMissions.test.mjs`

**Interfaces:**
- Consumes: `getArchipelagoMissionTheme(themeId)` (Tarefa 1).
- Produces:
  - `getIslandCreatureIds(themeId): string[]` e `getOutOfPlaceCreatureIds(themeId): string[]` em `archipelagoCreatureRules.js`. A segunda junta os elencos dos outros temas de `islandCreatures` com os ids das composições de `dinosaurExploration`, sem os ids do tema atual.
  - Destino das missões de ilha: `{ kind: "island", floor, floorMin, floorMax, targetId: themeId, label: "Ilha N", islandName }`.
  - Campos novos da missão: `themeId`, `featured: boolean`, e em caçadas `objective.outOfPlace: boolean`.
  - O texto (`description`) de missões de ilha usa só "Ilha N".

- [ ] **Passo 1: Escrever os testes que falham**

```js
test("cada oferta ocupa uma ilha diferente", () => {
  for (let s = 0; s < 200; s++) {
    const offers = generateMissionOffers(createMissionGenerationContext({ currentSeed: `seed-${s}`, profile, worldDraft: draftFor(s) }));
    const floors = offers.map(o => o.destination.floor);
    assert.equal(new Set(floors).size, floors.length);
    assert.ok(offers.length >= 1 && offers.length <= 8);
  }
});
test("alvos de texto vêm do tema da ilha ou da lista genérica", () => { /* targetName ∈ pools do tema ∪ targetPools do perfil, ou é o targetName da destaque */ });
test("a missão em destaque aparece para o tema e usa o título dele", () => { /* em 200 sementes, cada tema tem ≥1 oferta featured; title === featured.title */ });
test("descrição e rótulo não trazem o nome da ilha", () => { /* !description.includes(islandName) && label === `Ilha ${floor}` */ });
test("caçada usa elenco da ilha e às vezes alvo fora do lugar", () => {
  /* em ofertas specialHunt não destacadas: targetId ∈ getIslandCreatureIds(theme) quando !outOfPlace,
     ∈ getOutOfPlaceCreatureIds(theme) quando outOfPlace; a proporção de outOfPlace fica entre 0,15 e 0,35 */
});
test("arquipélago não oferece extermínio", () => { /* nenhuma category === "extermination" */ });
test("missões de ilha não se vinculam a setores", () => {
  /* materializeMissionsForCurrentContent({ islands, missions }) devolve bindings vazios para kind "island",
     inclusive quando a missão de entrada já trazia um binding kind "objective" */
});
```

Para `draftFor(s)`, monte o `worldDraft` com `createArchipelagoState(profile, createRng(seed)).getSnapshot()`, seguindo o que `getMissionWorldDraft` faz em `src/main.js`.

- [ ] **Passo 2:** `npm run test:archipelago-missions`. Esperado: FAIL nos testes novos.
- [ ] **Passo 3: Implementar**
  - `generateMissionOffers`: o andar sai dos andares de `missionFloors` ainda não usados. A oferta inválida libera o andar de novo.
  - `createObjective`: quando o destino é uma ilha com tema, `getPoolValue` sorteia na união da lista do tema com a lista genérica.
  - **Destaque:** quando a ilha tem tema com entrada, com chance de 1/3 (`rng() < 1/3`) a oferta vira a missão em destaque. Ela usa `category`, `title`, `targetName`, `condition` e `proofType` da destaque, e a descrição é `lead` + "na Ilha N" + a frase de recompensa. Se a categoria da destaque já foi usada, a regra de não repetir categoria cede.
  - **Caçada não destacada:** o alvo sai de `getIslandCreatureIds(theme)` com a janela de ND de `getPreferredCreatureCandidates`. Com chance de 1/4 sai de `getOutOfPlaceCreatureIds(theme)`, e a descrição acrescenta que o alvo "está longe de onde deveria estar". Sem candidato, vale o fallback atual de `getCreatureTarget`.
  - `materializeMissionsForCurrentContent`: missões com `destination.kind === "island"` passam direto com `integration.bindings = []` e `state: "pending"`.
- [ ] **Passo 4:** `npm run test:archipelago-missions && npm run test:missions && npm run test:floors-11-20`. Esperado: PASS (a floresta continua igual).
- [ ] **Passo 5: Commit** `feat: gera missões temáticas com uma por ilha no arquipélago`

### Task 3: Encontro da caçada

**Files:**
- Create: `src/missions/archipelagoMissionEncounter.js`
- Modify: `src/missions/missionDialog.js:277-307` (renderizar o encontro)
- Test: `scripts/archipelagoMissions.test.mjs`

**Interfaces:**
- Consumes: `getIslandCreatureIds`, `getOutOfPlaceCreatureIds` (Tarefa 2) e `resolveNodeEncounter(node, { mapSeed, profile, creatureCandidates })` de `src/encounterResolver.js`.
- Produces: `createArchipelagoHuntEncounter(mission, profile): { challenge: number, items: Array<{ creatureId, name, quantity, challenge, isTarget }> } | null`. Devolve `null` quando a missão não é `specialHunt` de ilha.

- [ ] **Passo 1: Escrever os testes que falham**

```js
test("caçada gera encontro com exatamente um alvo e ND dentro do limite", () => {
  for (const mission of sampleHunts(300)) {
    const enc = createArchipelagoHuntEncounter(mission, profile);
    const targets = enc.items.filter(i => i.isTarget);
    assert.equal(targets.length, 1);
    assert.equal(targets[0].quantity, 1);
    assert.equal(targets[0].creatureId, mission.objective.targetId);
    assert.ok(calculateCombatND(enc.items.map(i => ({ challengeRating: i.challenge, quantity: i.quantity }))) <= profile.missionRules.rewardChallengeByFloor[mission.destination.floor] + 1);
  }
});
test("acompanhantes vêm do elenco da ilha, ou da origem quando o alvo está fora do lugar", () => { /* non-target ids ⊂ elenco correspondente */ });
test("encontro é determinístico pela missão", () => { /* deepEqual em duas chamadas */ });
test("caçada sem criatura viável ainda abre", () => { /* missão com targetId de ND baixo: items só com o alvo + acompanhantes válidos, sem lançar erro */ });
```

- [ ] **Passo 2:** rodar os testes. Esperado: FAIL.
- [ ] **Passo 3: Implementar `createArchipelagoHuntEncounter`**
  - Semente: `` `${mission.id}:cacada` ``.
  - **Elenco dos acompanhantes:** com `objective.outOfPlace`, o elenco do tema de origem do alvo, isto é, o primeiro tema de `islandCreatures` que contém o id (ou `dinosaurs`). Sem `outOfPlace`, o elenco da ilha.
  - **ND:** a caçada usa ND = `profile.missionRules.rewardChallengeByFloor[floor] + 1`, isto é, o ND do andar + 1 (o `reward.challenge` é o ND do alvo e não serve de limite). O alvo entra fixo com quantidade 1, e os acompanhantes completam até esse ND por meio de `resolveNodeEncounter`, com `creatureCandidates` restrito ao elenco e sem o alvo. Se o alvo sozinho já atinge o ND, não há acompanhantes.
  - **Na modal:** em missões de ilha `specialHunt`, `renderMissionCreatureDetails` mostra uma ficha por item do encontro (`createCreatureDetail`), com o alvo primeiro e o rótulo "Alvo marcado". O `enemyCount` do mapa passa a ser a soma das quantidades.
- [ ] **Passo 4:** `npm run test:archipelago-missions && npm run test:ecology`. Esperado: PASS.
- [ ] **Passo 5: Commit** `feat: monta o encontro das caçadas do arquipélago pela ecologia da ilha`

### Task 4: Mapa tático com o terreno da ilha

**Files:**
- Modify: `src/missions/missionTacticalMap.js` (`placeTerrain` ~185, `createMissionTacticalMap` ~304)
- Modify: `src/archipelagoPilot.js` (exportar o terreno por tema)
- Test: `scripts/archipelagoMissions.test.mjs`

**Interfaces:**
- Consumes: `getArchipelagoMissionTheme` (Tarefa 1) e `createArchipelagoHuntEncounter` (Tarefa 3) para `enemyCount`.
- Produces: `getIslandThemeTerrain(themeId): { name, effect, features } | null` em `archipelagoPilot.js`. Ela lê `SECTOR_ISLANDS[themeId].terrain` e devolve `MANGROVE_TERRAIN` para `mangrove`.

- [ ] **Passo 1: Escrever os testes que falham**

```js
test("mapa da missão de ilha usa terreno e marcadores do tema", () => {
  for (const theme of activeThemes) {
    const map = createMissionTacticalMap(sampleMission(theme), { profile });
    assert.equal(map.terrain.name, getIslandThemeTerrain(theme).name);
    const themed = new Set(getArchipelagoMissionTheme(theme).map.markers);
    assert.ok(map.cells.some(c => themed.has(c)));
    assert.ok(map.terrain.features.some(f => f.name === getArchipelagoMissionTheme(theme).map.landmark.name));
  }
});
test("missão sem targetId usa o mapa genérico de antes", () => { /* deepEqual com o resultado gravado antes da mudança para uma missão fixa */ });
test("destaque com landmark substitui o ponto de referência", () => { /* features inclui featured.landmark.name */ });
test("mapa da caçada posiciona um inimigo por criatura do encontro", () => { /* enemyCount === soma das quantidades */ });
```

- [ ] **Passo 2:** rodar os testes. Esperado: FAIL.
- [ ] **Passo 3: Implementar.** Quando `mission.destination.targetId` tem entrada:
  - `terrain.name`, `effect` e `features` vêm de `getIslandThemeTerrain`, seguidos das features de missão que já existem (categoria, riscos, objetivo) e do `landmark` do tema, ou do landmark da destaque quando houver.
  - `placeTerrain` usa `map.markers` do tema no lugar da lista fixa.
  - Sem tema, nada muda.
- [ ] **Passo 4:** `npm run test:archipelago-missions && npm run test:archipelago`. Esperado: PASS.
- [ ] **Passo 5: Commit** `feat: adapta o mapa tático da missão ao terreno da ilha`

### Task 5: Rodapé da ficha e rótulo "Ilha N"

**Files:**
- Modify: `src/archipelagoRenderer.js:351-365` (remover painel), `:414-430` (remover indicador), `~743` (rodapé)
- Modify: `src/missions/missionDialog.js` (`createMissionMeta` :18 e usos de `destination.label` :160, :168, :236)
- Modify: `src/main.js:417` (passar `getUnknownPaths` ao controlador da modal)
- Modify: `src/styles.css` (pílula do rodapé; remover regras órfãs de `.mission-context-panel` e `.mission-inline-indicator`)
- Create: `src/missions/missionDestinationLabel.js`
- Test: `scripts/archipelagoMissions.test.mjs`

**Interfaces:**
- Produces: `getMissionDestinationLabel(mission, { unknownPaths }): string`. Para `kind: "island"`, devolve `"Ilha N"` com Caminhos desconhecidos ligado e `"Ilha N - <nome>"` desligado, usando `islandName` ou, em missões antigas, o nome extraído do `label` gravado. Para os outros tipos, devolve `destination.label`.

- [ ] **Passo 1: Escrever os testes que falham**

```js
test("rótulo do destino segue Caminhos desconhecidos", () => {
  const m = { destination: { kind: "island", floor: 23, label: "Ilha 23", islandName: "Ilha Vulcânica" } };
  assert.equal(getMissionDestinationLabel(m, { unknownPaths: true }), "Ilha 23");
  assert.equal(getMissionDestinationLabel(m, { unknownPaths: false }), "Ilha 23 - Ilha Vulcânica");
});
test("missão salva antes da mudança mostra só o número com caminhos desconhecidos", () => {
  const legado = { destination: { kind: "island", floor: 21, label: "Ilha 21 - Atol Circular" } };
  assert.equal(getMissionDestinationLabel(legado, { unknownPaths: true }), "Ilha 21");
  assert.equal(getMissionDestinationLabel(legado, { unknownPaths: false }), "Ilha 21 - Atol Circular");
});
test("andares da floresta não mudam", () => { /* kind "floor" → destination.label */ });
```

- [ ] **Passo 2:** rodar os testes. Esperado: FAIL.
- [ ] **Passo 3: Implementar**
  - Crie o helper e use-o em todos os pontos de `missionDialog.js` que exibem `destination.label`.
  - No renderer, apague o painel `mission-context-panel` e o `mission-inline-indicator`.
  - No `archipelago-island-footer`, insira antes de "Retornar ao barco" um `button.archipelago-mission-access` com `assets/icons/game-icons--tied-scroll.svg` e o texto `Missão: <título>`, que chama `onOpenMission(mission.id)`. Ele aparece nas mesmas condições de antes (`canRunMissions`).
  - Estilo: a pílula da captura de referência. O contador fica à esquerda, e a missão e o barco à direita. Abaixo de 600px o título é truncado com reticências, e "Retornar ao barco" continua visível.
- [ ] **Passo 4:** `npm run test:archipelago-missions && npm run build`. Esperado: PASS e build sem erro.
- [ ] **Passo 5: QA visual.** Com Playwright no app real (`npm run dev`):
  - capture a ficha com missão em 1366×900 e em 390×844, depois de ir até a ficha;
  - abra a missão pelo botão do rodapé;
  - alterne Caminhos desconhecidos e confira o rótulo;
  - importe uma sessão antiga, salva antes da Tarefa 2 (gere-a pelo commit `96d3d41`), e confira que o botão abre a missão.

  Salve as capturas em `.playwright-mcp/missoes-arquipelago/` e mostre-as ao PO.
- [ ] **Passo 6: Commit** `feat: move o acesso à missão para o rodapé da ficha da ilha`

### Task 6: Verificação final e documentação

**Files:**
- Modify: `REQUISITOS_ANDARES_21_A_30.md` ("Por onde retomar", "Pendências", "Pontos de Revisão Futura")
- Modify: `README.md` (parágrafo dos andares 21–30)
- Modify: `ARCHITECTURE.md` (módulos novos)

- [ ] **Passo 1:** `npm run test:archipelago-missions && npm run test:archipelago && npm run test:missions && npm run test:floors-1-10 && npm run test:floors-11-20 && npm run test:ecology && npm run build`. Esperado: tudo PASS.
- [ ] **Passo 2: Atualizar os documentos.**
  - Item 1 de "Por onde retomar" marcado como concluído.
  - Novo item "Reativar os 13 temas, cada um com seu pacote em `archipelagoMissionThemes.js` (o teste de cobertura cobra)".
  - Registrar a caçada especial com o alvo fora do lugar.
- [ ] **Passo 3:** apagar as prévias validadas em `.playwright-mcp/missoes-arquipelago/`.
- [ ] **Passo 4: Commit** `docs: registra as missões por ilha do arquipélago`

## Execução

| Tarefa | Implementador | Revisor |
|---|---|---|
| 1. Conteúdo por tema | `sonnet` | `sonnet` |
| 2. Gerador | `opus` | `opus` |
| 3. Encontro da caçada | `opus` | `opus` |
| 4. Mapa tático | `sonnet` | `sonnet` |
| 5. Rodapé e rótulo | `sonnet` | `sonnet` |
| 6. Verificação e docs | `haiku` | `sonnet` |
| Revisão final do conjunto | — | `opus` |

A Tarefa 1 é a primeira a ser mostrada ao PO, por meio da página de cartões. A partir dela as tarefas seguem sem pausa, exceto pelas capturas da Tarefa 5.
