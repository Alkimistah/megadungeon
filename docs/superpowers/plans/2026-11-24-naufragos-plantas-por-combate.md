# Náufragos: uma planta por combate e a lente do farol — Plano de implementação

> **Para agentes:** SUB-SKILL OBRIGATÓRIA: superpowers:subagent-driven-development, conforme `docs/superpowers/processo-de-trabalho.md`. Os passos usam caixas (`- [ ]`).

**Objetivo:** cada variante de combate da Ilha dos Náufragos ganha uma planta tática própria. O acampamento ganha um segundo combate, o Farol ganha uma planta detalhada, e o guardião Primeiro Náufrago ganha a mecânica da lente do farol.

**Arquitetura:**
- `withIslandTacticalLayout` passa a procurar primeiro uma planta pela tarefa (`layoutsByTheme[themeId].byTask[objective.title]`) e só depois a planta da direção. As ilhas sem `byTask` não mudam.
- Uma composição de guardião pode ter `rule`. `createIslandGuardian` copia esse campo para `scene.rule`, e o renderer mostra a regra logo abaixo do texto de abertura.
- O resto é dado.

**Tecnologias:** JavaScript ES Modules e Vite. Testes com `node --test`.

**Spec:** `docs/superpowers/specs/2026-11-24-ilhas-novas-design.md`, em especial as decisões "Uma planta por combate", "Mecânica própria de guardião" e "Equilíbrio dos setores". Conteúdo aprovado pelo PO na prévia `tmp/previas/ilha-naufragos/mapas.html` (versão 2) e transcrito abaixo.

## Restrições globais

- As 10 ilhas antigas não mudam de comportamento: mesma planta, mesmo ponto de interação e mesmos textos.
- O mapa usa só tipos de terreno que a grade já tem.
- Textos em português, transcritos literalmente deste plano.
- Commits em `main`, em português, terminando com `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Sem push.
- Temas novos entram no fim das listas, como já registrado no design.

## Foco da revisão

1. **Tarefas compartilhadas.** "Interceptar a patrulha" e "Defender a posição avançada" existem em várias ilhas. A planta por tarefa dos Náufragos não pode vazar para Atol, Costa do Coral ou Tropical. Teste na Tarefa 1.
2. **Precedência do marco.** `landmarksByTask` é global por título. Uma planta por tarefa traz o próprio marco, e um título igual em `landmarksByTask` não pode sobrescrevê-lo. As entradas dos Náufragos que ficam redundantes saem. Teste na Tarefa 1.
3. **Variante que virou combate.** "Libertar os cativos da paliçada" precisa fechar ND 6 com humanoides da ilha e ter o marco "Portão da paliçada" no mapa. Teste na Tarefa 1.
4. **Regra do guardião só onde deve.** Só o Primeiro Náufrago tem `rule`. Os outros dois guardiões e as ilhas antigas não mostram nada a mais. Teste na Tarefa 2.
5. **Guardião já salvo sem `rule`.** Uma cena salva antes da mudança não tem `rule`, e o renderer não pode quebrar nem mostrar parágrafo vazio. Teste na Tarefa 2.

---

### Task 1: Plantas por combate e o segundo combate do acampamento

**Modelo:** `sonnet`. Revisão: `sonnet`.

**Arquivos:**
- Modificar: `src/archipelagoTacticalMap.js`: `withIslandTacticalLayout` com `byTask`, as plantas dos Náufragos e a remoção de entradas em `landmarksByTask`.
- Modificar: `src/archipelagoShipwrecked.js`: a variante S3 vira combate.
- Modificar: `scripts/archipelagoShipwrecked.test.mjs`.

**Interfaces:**
- Produz: `layoutsByTheme.shipwrecked.byTask`, um objeto `{ [títuloDaTarefa]: layout(...) }`. `withIslandTacticalLayout(scene, themeId, objective)` usa `byTask[objective.title]` quando existe e, senão, `[objective.direction ?? "center"]`. `landmarksByTask` só se aplica quando a planta veio da direção, não de `byTask`.

#### Conteúdo aprovado

**Variante S3** (substitui a tupla atual de "Libertar os cativos da paliçada"):
`["Libertar os cativos da paliçada", "combate", "Os vigias da paliçada guardam os cativos acorrentados. Vença o combate e, até o fim da quarta rodada, uma personagem adjacente ao portão gasta uma ação padrão em duas rodadas diferentes para soltar as correntes. Registre sucesso se o grupo vencer e soltar os cativos.", "humanoid"]`

**Plantas da direção** (substituem as atuais de S, L e `center`. N e O ficam como estão):
- `S: layout("Porta da barraca dos feridos", "Se um adversário terminar a terceira rodada adjacente à barraca, leva um sobrevivente.", 11, 8, [["clearing", 7, 4, 9, 6], ["wall", 5, 0, 13, 1], ["wall", 18, 0, 1, 6], ["wall", 18, 10, 1, 4], ["difficult", 17, 6, 3, 4], ["obstacle", 6, 2, 2, 2], ["obstacle", 10, 1, 2, 2], ["obstacle", 14, 2, 2, 2], ["obstacle", 5, 6, 2, 2], ["obstacle", 15, 6, 2, 2], ["obstacle", 7, 11, 2, 2], ["obstacle", 12, 11, 2, 2], ["obstacle", 16, 11, 2, 2], ["obstacle", 10, 5, 3, 3]])`
- `L: layout("Margem dos odres", "O único ponto de acesso firme à água. É aqui que se enchem os odres.", 11, 7, [["clearing", 4, 8, 7, 2], ["wall", 13, 0, 7, 2], ["slope", 13, 2, 7, 2], ["water", 15, 2, 1, 2], ["water", 12, 4, 5, 4], ["obstacle", 11, 4, 1, 2], ["obstacle", 17, 5, 1, 2], ["obstacle", 13, 8, 2, 1], ["water", 12, 8, 1, 3], ["water", 11, 11, 1, 3], ["concealment", 17, 8, 3, 3], ["tree", 18, 11, 2, 2], ["tree", 6, 1, 2, 2], ["concealment", 5, 4, 3, 2]])`
- `center: layout("Lente do farol", "O espelho de cristal concentra a pouca luz que atravessa as nuvens e a joga sobre o mar.", 15, 6, [["water", 0, 0, 20, 2], ["water", 18, 2, 2, 12], ["advantage", 11, 2, 7, 10], ["deck", 5, 9, 5, 2], ["slope", 9, 7, 3, 3], ["wall", 12, 4, 6, 1], ["wall", 12, 9, 6, 1], ["wall", 17, 5, 1, 4], ["wall", 12, 5, 1, 1], ["wall", 12, 8, 1, 1], ["deck", 13, 5, 4, 4], ["obstacle", 16, 2, 2, 1], ["obstacle", 17, 10, 1, 2], ["obstacle", 11, 3, 1, 1], ["obstacle", 10, 4, 1, 1], ["difficult", 13, 10, 3, 2]])`

**Plantas por tarefa** (`byTask`):
- `"Conter os afogados da arrebentação": layout("Casco virado", "Os sobreviventes se abrigam sob o casco. Nenhuma criatura pode alcançá-lo.", 10, 6, [["water", 15, 0, 5, 14], ["wet", 12, 0, 3, 14], ["obstacle", 6, 5, 4, 3], ["difficult", 11, 2, 3, 3], ["obstacle", 13, 10, 2, 2], ["difficult", 5, 10, 4, 2]])`
- `"Libertar os cativos da paliçada": layout("Portão da paliçada", "Os cativos estão acorrentados nos postes do lado de dentro.", 12, 6, [["clearing", 12, 3, 6, 7], ["wall", 11, 2, 8, 1], ["wall", 11, 10, 8, 1], ["wall", 18, 3, 1, 7], ["wall", 11, 3, 1, 3], ["wall", 11, 8, 1, 2], ["obstacle", 16, 5, 1, 1], ["obstacle", 16, 8, 1, 1], ["advantage", 17, 3, 1, 2], ["obstacle", 6, 3, 2, 2], ["obstacle", 8, 7, 2, 2], ["difficult", 5, 8, 3, 2]])`
- `"Interceptar a patrulha": layout("Saída da trilha", "Se a criatura escolhida chegar aqui, escapa para o farol.", 18, 1, [["slope", 12, 0, 8, 5], ["clearing", 4, 8, 8, 2], ["clearing", 10, 4, 3, 5], ["clearing", 13, 1, 5, 2], ["tree", 6, 3, 2, 2], ["tree", 15, 8, 2, 2], ["concealment", 14, 5, 3, 2], ["concealment", 8, 11, 4, 2], ["water", 11, 10, 3, 2]])`
- `"Defender a posição avançada": layout("Barricada da boca", "A posição é preparada atrás da barricada, na entrada da gruta.", 10, 7, [["wall", 0, 0, 20, 1], ["wall", 0, 13, 20, 1], ["wall", 12, 1, 2, 4], ["wall", 12, 9, 2, 4], ["obstacle", 11, 6, 1, 2], ["water", 15, 2, 5, 10], ["wet", 13, 5, 2, 4], ["difficult", 4, 3, 4, 3]])`

**`landmarksByTask`:** remova `"Conter os afogados da arrebentação"`, `"Libertar os cativos da paliçada"` e `"Desviar o cano do farol"` (este é teste e não abre mapa). Mantenha `"Proteger o cartógrafo"`.

#### Passos

- [ ] **Passo 1: testes que falham**, em `scripts/archipelagoShipwrecked.test.mjs`:
  - `test("cada combate dos náufragos abre a planta da própria cena")`: para cada par de setor e variante de combate (0 a 3), monte a cena como no teste de ND 6 existente e gere o mapa. Confira que `map.cells[map.landmark.index] === "mechanism"` e que o nome do marco é o esperado:

    | Variante | Marco esperado |
    |---|---|
    | Afastar os carniceiros da praia | Bote de resgate |
    | Conter os afogados da arrebentação | Casco virado |
    | Romper o cerco às barracas | Porta da barraca dos feridos |
    | Libertar os cativos da paliçada | Portão da paliçada |
    | Disputar a bacia | Margem dos odres |
    | Interceptar a patrulha | Saída da trilha |
    | Proteger o cartógrafo | Cartógrafo |
    | Defender a posição avançada | Barricada da boca |

    Leia o nome em `scene.environment.terrain.features` ou em `tacticalLayout.landmark.name`. O teste também confere que, no mesmo setor, duas variantes de combate têm zonas diferentes (`JSON.stringify` das `tacticalLayout.zones`).
  - `test("plantas por tarefa dos náufragos não vazam para outras ilhas")`: `withIslandTacticalLayout(cena, "atoll", { direction: "O", title: "Interceptar a patrulha" }).tacticalLayout` é igual (`deepEqual`) ao resultado obtido no commit base com o mesmo argumento. Na prática, a planta O do Atol com o marco "Borda do poço". O mesmo vale para `"coral-coast"` com `"Defender a posição avançada"`.
  - `test("o acampamento tem dois combates")`: as variantes de S do tipo `"combate"` são exatamente "Romper o cerco às barracas" e "Libertar os cativos da paliçada".
  - O teste de ND 6 já existente passa a cobrir a variante nova sem mudança.
- [ ] **Passo 2: rodar e ver falhar.** `node --test scripts/archipelagoShipwrecked.test.mjs`.
- [ ] **Passo 3: implementar** `byTask`, as plantas e a variante S3, com os valores acima.
- [ ] **Passo 4: rodar e ver passar.** `npm run test:archipelago`, `npm run test:archipelago-missions` e `npm run build`: tudo verde e saída limpa.
- [ ] **Passo 5: commit.** `feat: uma planta tática por combate na Ilha dos Náufragos`

---

### Task 2: Mecânica da lente do farol e documentação

**Modelo:** `sonnet`. Revisão: `sonnet`.

**Arquivos:**
- Modificar: `src/archipelagoPilot.js`: em `createIslandGuardian`, `if (composition.rule) scene.rule = composition.rule;` junto do `briefing`.
- Modificar: `src/archipelagoRenderer.js`: em `renderGuardian`, depois do parágrafo do `briefing`, um `<p class="archipelago-encounter-briefing archipelago-guardian-rule">` com `scene.rule`, só quando ele existe.
- Modificar: `src/archipelagoShipwrecked.js`: o guardião `primeiro-naufrago` com novo `briefing` e `rule`.
- Modificar: `scripts/archipelagoShipwrecked.test.mjs`.
- Modificar: `REQUISITOS_ANDARES_21_A_30.md`: o parágrafo dos Náufragos.

**Interfaces:**
- Consome: `createIslandGuardian(island, selection, profile, mapSeed)`.
- Produz: `scene.rule` (string, opcional) nas cenas de guardião.

#### Conteúdo aprovado

- `briefing` do `primeiro-naufrago`: `"O céu está encoberto, e a fogueira do farol se apaga num sopro frio. O primeiro náufrago da ilha sobe pela rocha molhada, e uma aparição pálida se ergue das cinzas ao lado dele."`
- `rule` do `primeiro-naufrago`: `"Lente do farol: uma personagem adjacente à lente pode gastar uma ação padrão para apontar o facho para a aparição, se ela estiver em linha de visão. Até o fim do próximo turno da aparição, ela conta como exposta à luz do dia e fica debilitada (Vulnerabilidade à Luz do Dia). A ação pode ser repetida nas rodadas seguintes."`

#### Passos

- [ ] **Passo 1: testes que falham**, em `scripts/archipelagoShipwrecked.test.mjs`:
  - `test("só o Primeiro Náufrago traz a regra da lente")`:
    - `createIslandGuardian(ilha, "primeiro-naufrago", …).rule` é igual ao texto aprovado e o `briefing` começa com "O céu está encoberto".
    - Para `"ultimo-legionario"` e `"senhor-dos-acendedores"`, `rule` é `undefined`.
    - Para um guardião do Atol (índice 0), `rule` é `undefined`.
  - `test("guardião salvo sem regra continua igual")`: uma cena de guardião criada como `{ ...cena, rule: undefined }` não gera texto `"undefined"`. Se o renderer não puder ser testado em Node sem DOM, deixe isso a cargo da validação em mesa e registre no relatório.
- [ ] **Passo 2: rodar e ver falhar.**
- [ ] **Passo 3: implementar** o pilot, o renderer e os dados.
- [ ] **Passo 4: documentação.** No parágrafo dos Náufragos em `REQUISITOS_ANDARES_21_A_30.md`, registre:
  - cada combate tem planta própria;
  - o acampamento tem dois combates;
  - o Farol é uma torre com a lente no centro;
  - a regra da lente vale só para o Primeiro Náufrago e aparece na ficha.
- [ ] **Passo 5: rodar tudo.** `npm run test:archipelago`, `npm run test:archipelago-missions`, `npm run test:ecology` e `npm run build`: tudo verde.
- [ ] **Passo 6: commit.** `feat: lente do farol contra a aparição no guardião dos Náufragos`

---

### Fechamento (gerente)

- Revisão final do conjunto com `opus`.
- Validação pelo PO no app: plantas dos combates, Farol e a regra no Primeiro Náufrago.
- Depois da validação, apagar `tmp/previas/ilha-naufragos/`.
