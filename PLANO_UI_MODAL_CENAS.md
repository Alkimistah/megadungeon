# Plano — Resumo + Modal para "Cena atual" e "Encontro final do andar"

Plano de implementação autocontido. Siga os passos na ordem. Cada passo diz o arquivo, o local e o código de referência.

## Objetivo

Na tela de exploração estendida (andares 1 a 10), as seções **"Cena atual"** e **"Encontro final do andar"** continuam existindo, mas passam a mostrar apenas um **resumo** (título, ND, texto curto, efeitos) e um **botão** que abre uma **modal** com o conteúdo completo (mapa tático + fichas do encontro), no estilo do diálogo de nodos. Quando a falha +5 gerar duas rolagens d100, a modal tem **abas** ("Rolagem 1" / "Rolagem 2"). O botão "Expandir" do mapa tático continua funcionando dentro da modal.

Motivação: a renderização inteira na tela é ruim em tablets e telas menores.

## Restrições obrigatórias

1. Tocar **apenas** em `src/extendedExplorationRenderer.js` e `src/styles.css`. Nenhuma mudança em estado, dados ou outros arquivos.
2. **Não** usar os elementos `<dialog>` do index.html. Seguir o padrão já existente da função `openTacticalMapFullscreen` (overlay `div` + painel + botão Fechar + tecla Escape + clique no fundo fecha), que está em `src/extendedExplorationRenderer.js`.
3. A modal é anexada em `document.body`, fora do `container` do renderer. O `render()` principal faz `container.innerHTML = ""` — isso não destrói a modal, e é o comportamento desejado. Em contrapartida, interações internas da modal (selecionar criatura/armadilha na ficha) precisam reconstruir **apenas o corpo da modal**, nunca chamar o `render()` global.
4. Os objetos de cena (`snapshot.currentResults[i]`, `snapshot.finalEncounter`) são referências vivas do estado; guardar a referência na modal é seguro.

## Passo 1 — Helper `openSceneModal` em `src/extendedExplorationRenderer.js`

Adicionar após a função `openTacticalMapFullscreen` (use-a como referência de padrão):

```js
function openSceneModal({ title, tabs, initialTabIndex = 0 }) {
  const overlay = createElement("div", "tactical-fullscreen scene-modal");
  const panel = createElement("div", "tactical-fullscreen-panel scene-modal-panel");
  const header = createElement("div", "tactical-map-header");
  const tabBar = createElement("div", "scene-modal-tabs");
  const body = createElement("div", "scene-modal-body");
  let activeTabIndex = Math.min(initialTabIndex, tabs.length - 1);

  function close() {
    document.removeEventListener("keydown", onKeyDown);
    overlay.remove();
  }

  function onKeyDown(event) {
    if (event.key === "Escape") close();
  }

  function renderTabBar() {
    [...tabBar.children].forEach((child, index) => {
      child.classList.toggle("is-selected", index === activeTabIndex);
    });
  }

  function renderBody() {
    body.innerHTML = "";
    body.appendChild(tabs[activeTabIndex].renderContent(renderBody));
  }

  tabs.forEach((tab, index) => {
    tabBar.appendChild(createButton(tab.label, "extended-action is-compact", () => {
      activeTabIndex = index;
      renderTabBar();
      renderBody();
    }));
  });

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) close();
  });
  document.addEventListener("keydown", onKeyDown);

  header.appendChild(createElement("strong", null, title));
  header.appendChild(createButton("Fechar", "extended-action is-compact", close));
  panel.appendChild(header);
  if (tabs.length > 1) panel.appendChild(tabBar);
  panel.appendChild(body);
  overlay.appendChild(panel);
  document.body.appendChild(overlay);
  renderTabBar();
  renderBody();
}
```

Contrato: cada aba é `{ label, renderContent(refresh) }`. `renderContent` recebe `refresh` (reconstrói o corpo da modal) e retorna um elemento DOM.

## Passo 2 — Conteúdo da modal de uma cena

Adicionar um builder que monta o conteúdo completo de uma cena dentro da modal. Ele reutiliza `createResolvedEncounter` (que já monta efeitos + mapa tático + página de combate) e o `Map` `selectedEncounterItemByScene` que já existe no closure de `createExtendedExplorationRenderer` — por isso este builder deve ser definido **dentro** de `createExtendedExplorationRenderer`, ou receber o Map e o callback `onRerollTacticalMap` como parâmetros (recomendado: parâmetros, mantendo-o no escopo do módulo).

```js
function buildSceneModalContent(scene, rerollTarget, selectedEncounterItemByScene, onRerollTacticalMap, refresh) {
  const wrapper = createElement("div", "scene-modal-content");
  const sceneKey = getSceneKey(scene);

  if (scene.detail) wrapper.appendChild(createElement("p", "result-detail", scene.detail));

  const encounter = createResolvedEncounter(
    scene,
    selectedEncounterItemByScene.get(sceneKey),
    (nextKey) => {
      selectedEncounterItemByScene.set(sceneKey, nextKey);
      refresh();
    },
    () => {
      onRerollTacticalMap(rerollTarget);
      refresh();
    }
  );
  if (encounter) wrapper.appendChild(encounter);

  return wrapper;
}
```

Notas:
- `rerollTarget` é `scene.id` para cenas do d100 (é o que `rerollTacticalMap` do estado espera) e a string `"final"` para o encontro final.
- O botão "Expandir" do mapa continua funcionando: `openTacticalMapFullscreen` anexa outro overlay em `document.body` depois da modal, então aparece por cima. Nada a fazer.
- Mapas preset (encontro final) não mostram "Gerar outro mapa" — já tratado em `createTacticalMap`.

## Passo 3 — Resumir a seção "Cena atual"

Na função `createCurrentResult`:

1. Manter por cena: o parágrafo de título (`result-title`, com d100/categoria/ND), o parágrafo `result-detail` e os efeitos (`createSceneEffects(result)`) — os efeitos são curtos e importantes na tela.
2. **Remover** a chamada inline de `createResolvedEncounter` de dentro do loop.
3. Definir o critério de "cena abrível": `hasOpenableContent(scene)`:

```js
function hasOpenableContent(scene) {
  return Boolean(scene?.encounterNode?.resolvedEncounter?.items?.length || scene?.tacticalMap);
}
```

4. Depois do loop de resumos, se houver pelo menos uma cena abrível, adicionar um único botão "Abrir cena completa" (label "Abrir cenas" quando houver 2 rolagens) que chama:

```js
const openable = results.filter(hasOpenableContent);
openSceneModal({
  title: results.length > 1 ? "Cenas da falha atual" : "Cena atual",
  tabs: openable.map((result, index) => ({
    label: openable.length > 1 ? `Rolagem ${index + 1}` : "Cena",
    renderContent: (refresh) => buildSceneModalContent(
      result,
      result.id || "current",
      selectedEncounterItemByScene,
      onRerollTacticalMap,
      refresh
    )
  }))
});
```

Cenas puramente narrativas (evento de exploração, presságio, anomalia, tesouro) não têm encontro nem mapa: sem botão, resumo continua igual ao de hoje.

Atenção à assinatura: `createCurrentResult` hoje recebe `(snapshot, selectedEncounterItemByScene, onSelectItem, onRerollMap)`; o parâmetro `onSelectItem` deixa de ser usado na tela (a seleção passa a acontecer só na modal) — pode removê-lo da assinatura e do chamador em `render()`, ou ignorá-lo. O callback de reroll usado na modal deve ser o `onRerollTacticalMap` cru recebido pelo renderer (sem chamar `render()` dentro da modal).

## Passo 4 — Resumir a seção "Encontro final do andar"

Na função `createFinalEncounter`:

1. Manter na tela: heading, linha de título (`Título (ND X | Tipo)`), parágrafo do gimmick (`final-gimmick`) e o parágrafo de recompensa (`final-treasure`). **Mover** o `result-detail` (texto longo da cena) para dentro da modal.
2. **Remover** a chamada inline de `createResolvedEncounter`.
3. Adicionar botão "Abrir encontro completo" (apenas se `hasOpenableContent(snapshot.finalEncounter)`), que chama:

```js
openSceneModal({
  title: snapshot.finalEncounter.title,
  tabs: [{
    label: "Encontro",
    renderContent: (refresh) => buildSceneModalContent(
      snapshot.finalEncounter,
      "final",
      selectedEncounterItemByScene,
      onRerollTacticalMap,
      refresh
    )
  }]
});
```

4. Os botões de fase ("Marcar encontro resolvido", "Sortear outra cena", "Avançar para o próximo andar") **permanecem na tela**, fora da modal, exatamente como estão.

Cuidado: após "Sortear outra cena", o `render()` global roda; se uma modal estiver aberta com a cena antiga, ela mostra dados velhos. Solução simples e aceitável: nada — o usuário fecha e reabre. Não tentar sincronizar.

## Passo 5 — CSS em `src/styles.css`

Adicionar junto aos estilos de `.tactical-fullscreen*` (procure por essa classe):

```css
.scene-modal-panel {
  width: min(96vw, 880px);
  max-height: 92vh;
  overflow-y: auto;
  display: grid;
  gap: 12px;
}

.scene-modal-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.scene-modal-tabs .extended-action.is-selected {
  background: var(--action-hover);
  box-shadow: inset 0 0 0 1px var(--border);
}

.scene-modal-body,
.scene-modal-content {
  display: grid;
  gap: 12px;
}

@media (max-width: 700px) {
  .scene-modal-panel {
    width: 100vw;
    max-height: 100vh;
    border-radius: 0;
  }
}
```

## Passo 6 — Verificação

Ambiente: node existe apenas no WSL. Comandos:

- Build: `wsl.exe -e bash -lc "cd '/mnt/c/Users/Arthur/OneDrive/Documentos/Mega Dungeon' && npx vite build"`
- Dev server: já configurado em `.claude/launch.json` (nome `mega-dungeon-dev`, porta 5173).

Roteiro de teste no navegador (perfil "Andares de 1 a 10", andar 1):

1. Fechar o diálogo de configuração inicial ("Iniciar exploração") — ele intercepta cliques enquanto aberto.
2. Digitar `63, 63` no campo "d100 manual" e clicar "Falha +5" → 2 rolagens de encontro médio. A seção "Cena atual" deve mostrar 2 resumos + 1 botão; a modal deve abrir com abas "Rolagem 1"/"Rolagem 2", cada uma com mapa tático e fichas.
3. Dentro da modal: trocar a criatura/armadilha selecionada na ficha (o corpo da modal reconstrói), clicar "Gerar outro mapa" (mapa muda) e "Expandir" (overlay do mapa abre por cima).
4. Fechar e reabrir a modal: a seleção de ficha deve persistir (vem do `Map`).
5. Registrar falha com d100 `5` (evento de exploração): resumo sem botão.
6. Registrar 3 sucessos com abordagens diferentes → "Encontro final do andar" mostra resumo (título/ND/gimmick/recompensa) + botão; modal abre com detalhe completo, mapa fixo e fichas; "Marcar encontro resolvido" e "Sortear outra cena" continuam na tela.
7. Tela estreita (viewport ~375px): modal ocupa a tela inteira e rola verticalmente.

## Critérios de aceite

- "Cena atual" e "Encontro final" nunca renderizam mapa/fichas inline; apenas resumo + botão.
- Falha +5 gera modal única com 2 abas.
- Mapa tático expandível de dentro da modal.
- Seleção de item persiste entre aberturas da modal.
- Cenas narrativas não ganham botão.
- Botões de fase permanecem na tela principal.
- `npx vite build` sem erros.
