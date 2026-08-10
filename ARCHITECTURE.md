# Arquitetura — Mega Dungeon

Guia técnico para desenvolvedores. Descreve estrutura de arquivos, sistemas principais, fluxo de dados e pontos de extensão do projeto.

---

## Estrutura de diretórios

```
Mega Dungeon/
├── src/
│   ├── main.js              # Entrada da aplicação; bindings de UI e orquestração
│   ├── appState.js          # Estado da exploração por mapa em nodos
│   ├── extendedExplorationState.js    # Estado dos andares 1 a 10
│   ├── extendedExplorationRenderer.js # UI dos andares 1 a 10
│   ├── generator.js         # Algoritmo de geração procedural do mapa em nodos
│   ├── mapRenderer.js       # Renderização SVG do mapa em nodos
│   ├── nodeDialog.js        # Controlador do modal de detalhes do nó
│   ├── manualEncounterDialog.js # Gerador manual de encontro
│   ├── encounterResolver.js # Composição de encontros e armadilhas
│   ├── nodeTacticalMap.js   # Mapas táticos abertos para nodos 11-20
│   ├── tacticalMapRenderer.js # Renderização compartilhada de mapas táticos
│   ├── challenge.js         # Cálculo de Nível de Desafio (ND)
│   ├── environment.js       # Geração de clima e terreno
│   ├── tables.js            # Tabelas de perícias e tipos de sala
│   ├── floorRanges.js       # Gerenciamento de perfis de andar
│   ├── floorProfiles/
│   │   ├── index.js         # Re-exporta todos os perfis
│   │   ├── dungeon1to10.js  # Perfil: labirinto, andares 1-10
│   │   ├── dungeon1to10FinalEncounters.js # Encontros finais 1-9 e chefe 10
│   │   └── forest11to20.js  # Perfil: Floresta, andares 11-20
│   ├── creatureCatalog/     # Fichas de criaturas por tipo e fonte
│   ├── equipment/           # Variações e dados de equipamento
│   ├── random.js            # RNG com seed (cyrb128 + sfc32)
│   ├── sessionCode.js       # Codificação/decodificação de sessão
│   ├── format.js            # Formatação de tempo decorrido
│   └── styles.css           # Estilos globais com variáveis CSS para temas
├── public/
│   ├── assets/icons/        # Ícones de tipos de sala e UI
│   ├── manifest.webmanifest # Manifesto PWA
│   └── sw.js                # Service Worker para suporte offline
├── index.html               # Ponto de entrada HTML
└── package.json             # Dependências (apenas Vite como devDependency)
```

---

## Stack tecnológica

| Camada | Tecnologia |
|---|---|
| Frontend | JavaScript vanilla com ES Modules |
| Build | Vite 6 |
| Estilo | CSS puro com variáveis CSS para temas dinâmicos |
| Renderização de mapa | SVG gerado dinamicamente via DOM |
| Persistência | Código de sessão Base64-URL (sem backend, sem localStorage) |
| PWA | Service Worker + Web Manifest |

Não há frameworks de UI (sem React, Vue, etc.). Toda a lógica é modular via ES Modules.

---

## Fluxo geral da aplicação

```
Usuário configura parâmetros
        │
        ▼
main.js → seleciona perfil
        │
        ├── mode: extended-exploration
        │       ├── extendedExplorationState.js    → inicializa andar, sucessos, falhas e log
        │       └── extendedExplorationRenderer.js → renderiza painel, cenas e mapas táticos
        │
        └── mode: node-map
                ├── generator.js    → gera estrutura de nós e links
                ├── appState.js     → inicializa rota, visibilidade e tempo
                └── mapRenderer.js  → renderiza SVG na tela
```

Os andares 1 a 10 usam o modo `extended-exploration`: o labirinto é abstrato, o progresso é medido por sucessos/falhas, e cenas táticas surgem dinamicamente a partir de falhas d100, encontros finais e sala de chefe.

Os andares 11 a 20 usam o modo `node-map`: o mapa em grafo é a representação principal de uma região maior, com rotas e salas pré-geradas. Esse modo deve permanecer como base para essa faixa; uma melhoria possível é adicionar mapas táticos aos encontros abertos pelos nodos, sem substituir o grafo.

---

## Sistemas principais

### 1. Geração de mapas em nodos (`generator.js`)

O mapa em nodos é usado pelos andares 11 a 20. Ele é um grafo dirigido acíclico com layout em "taça" (cup layout): os níveis do meio têm mais nós que as extremidades, seguindo uma curva senoidal.

**Funções principais:**

| Função | O que faz |
|---|---|
| `generateMapData(depth, baseDC, profile, floor, rng)` | Orquestrador principal; retorna o array `levels` completo |
| `createCupLevels(depth, profile, rng)` | Cria os níveis com quantidade de nós variável por template de coluna |
| `connectCupLevels(levels, rng)` | Liga nós entre níveis garantindo acessibilidade |
| `addFinalBoss(levels, profile, floor)` | Substitui o último nível por sala de boss se o perfil permitir |
| `convertMergedPathsToUnknown(levels)` | Nós com 3+ entradas viram "desconhecido" |

**Estrutura de um nó:**

```javascript
{
  id, level, column,
  type: "normal" | "elite" | "trap" | "treasure" | "boss" | "camp" | "unknown",
  label, short,           // nome descritivo e abreviação
  x, y,                   // coordenadas SVG calculadas pelo renderer
  links: [targetNode],    // referências diretas aos nós filhos
  skill, dc,              // perícia e DC do teste de descoberta
  investigationMinutes,   // tempo gasto ao explorar
  environment: {
    climate: [...],       // 0-3 variações climáticas
    terrain: { type, features: [...] }
  },
  challenge: {
    encounter, climate, terrain, total  // componentes do ND
  },
  revealedLabel           // nome real de nós "desconhecido"
}
```

**Regras de conexão:**
- Cada nó do nível N se conecta ao nó mais próximo e menos utilizado do nível N+1.
- Todo nó do próximo nível recebe ao menos uma conexão (garantia de acessibilidade).
- 18% de chance de conexão secundária para nós próximos.
- Acampamentos são inseridos conforme `encounterRules.camps`; por padrão, um nodo é convertido a cada 4 níveis, enquanto o perfil 11-20 converte o nível inteiro a cada 4 níveis e permite nodos raros de acampamento fora desses níveis.

---

### 2. Estado de exploração em nodos (`appState.js`)

Gerencia o que o jogador já viu, tentou e escolheu no modo `node-map`. Toda a lógica de progressão de rota está aqui.

**Estado interno:**

```javascript
{
  attempted: Set<nodeId>,
  explored: Set<nodeId>,
  rested: Set<nodeId>,
  chosenByLevel: Map<level, nodeId>,
  elapsedMinutes: number
}
```

**Funções principais:**

| Função | O que faz |
|---|---|
| `setLevels(levels)` | Inicializa o estado a partir do mapa gerado |
| `chooseRoute(node)` | Marca nó como escolhido, desbloqueia seus filhos, avança o tempo |
| `markExplored(node)` | Marca nó como explorado (encontro concluído) |
| `markAttempted(node)` | Marca tentativa (falhou, mas foi visitado) |
| `restAtNode(node)` | Descansa no acampamento, zerando o tempo decorrido |
| `getNodeViewState(node)` | Retorna `{active, chosen, explored, attempted, locked, revealed, visible}` |
| `getLinkViewState(source, target)` | Retorna estado visual do link (rota/opaco/oculto) |

**Visibilidade de nós** (modo "caminhos desconhecidos"):
- `locked`: nó não atingível pela rota atual — oculto se o modo estiver ativo.
- `active`: nó atingível mas ainda não escolhido.
- `chosen`: nó já selecionado como parte da rota.

---

### 3. Exploração estendida (`extendedExplorationState.js`, `extendedExplorationRenderer.js`)

Controla o fluxo dos andares 1 a 10. Em vez de exibir um grafo pré-gerado, cada andar funciona como um teste estendido: o grupo escolhe ações de perícia, o mestre informa o resultado, sucessos aproximam a saída e falhas geram consequências pela tabela d100.

**Estado principal:**

```javascript
{
  floor,
  successes,
  failures,
  usedApproachIds,
  log,
  currentScene,
  finalEncounter,
  pendingEffects,
  status
}
```

**Características do fluxo:**
- Ações são independentes no formato `Perícia: Ação`; depois de usadas no andar, ficam bloqueadas até mudança/reset do andar.
- A CD vem da regra do andar, com modificadores de ação e efeitos pendentes.
- Falhas geram eventos d100: encontro, obstáculo, tesouro, anomalia, presságio ou vantagem.
- Presságios, vantagens, eventos e anomalias podem alterar sucessos/falhas, criar modificadores de próximo teste ou alterar posicionamento na próxima cena.
- Cenas relevantes podem abrir modal com ficha de encontro, mapa tático, legenda e ações de resolução.
- Ao completar sucessos dos andares 1 a 9, o app sorteia encontro final do tier. O andar 10 usa a sala fixa da Aranha Matriarca.
- Após resolver a Matriarca, a etapa 1-10 entra em estado `completed`.

### 4. Renderização SVG (`mapRenderer.js`)

Gera e atualiza o mapa diretamente no DOM como SVG.

**Funções principais:**

| Função | O que faz |
|---|---|
| `drawMap(levels, columnColors)` | Renderização inicial: cria todos os elementos SVG |
| `updateDisplay(levels, state)` | Atualiza classes CSS e visibilidade conforme o estado |
| `positionNodes(levels)` | Calcula coordenadas XY de cada nó baseado em grid |

O SVG é responsivo: escala com a largura do viewport. Nós são grupos `<g>` com `<circle>` e `<image>` para o ícone. Links são `<line>` com classes que refletem o estado.

**Classes CSS dinâmicas nos nós:**
- `node--chosen`, `node--explored`, `node--attempted`: estado de progressão
- `node--active`: disponível para seleção
- `node--locked`, `node--hidden`: restrito ou oculto

---

### 5. Modal de nó (`nodeDialog.js`)

Controla o `<dialog>` HTML que aparece ao clicar em um nó ativo.

Renderiza:
- Tipo e nome da sala.
- Perícia e DC do teste.
- ND do encontro (com breakdown: base + clima + terreno).
- Perfil de criatura quando aplicável (tipo predominante, ND da criatura e orientação de ajuste).
- Clima gerado (temperatura, precipitação, vento, névoa).
- Terreno (tipo + características).
- Botões de ação: explorar, tentar, descansar (acampamento), escolher rota.

---

### 6. Nível de Desafio (`challenge.js`)

Calcula o ND de cada nó combinando três componentes:

```
ND total = ND base do encontro + modificador de clima + modificador de terreno
```

- **ND base**: definido por faixa de andar e tipo de sala no perfil (ex: andares 11-12, sala normal → ND 1).
- **Clima e terreno**: adicionam ND conforme tabelas de peso no perfil. Múltiplas características se somam.
- Resultado clampado entre 0.25 e 8 (configurável por perfil).

---

### 7. Criaturas (`creatures.js`)

Define os tipos gerais de criatura de Tormenta20 e atribui um perfil de criatura a nós que representam encontro.

Tipos cadastrados:
- Animais
- Construtos
- Espíritos
- Humanoides
- Monstros
- Mortos-vivos

A seleção usa pesos por terreno definidos em `creatureRules.typeWeightsByTerrain` no perfil de andar. Assim, um perfil florestal pode favorecer Animais e Monstros em Floresta/Pântano, enquanto Colinas e Planície aberta podem aumentar Humanoides.

O ND da criatura inicial vem de `creatureRules.challengeSource`:
- `creatures`: usa o orçamento restante para criaturas depois de reservar ND para armadilhas.
- `encounter`: usa apenas o ND base do tipo de sala.
- `total`: usa o ND total do encontro, incluindo clima e terreno.

O app separa o ND em camadas: `challenge.encounter` é o orçamento base do encontro; `challenge.trap` consome parte desse orçamento; `challenge.creatures` é o orçamento restante para criatura ou grupo; `challenge.climate` e `challenge.terrain` são modificadores externos. Assim, o total segue a regra `total = encounter + climate + terrain`, enquanto a composição interna segue `encounter = creatures + trap` quando uma armadilha incidental existe.

O diretório `creatureCatalog/` armazena fichas de criaturas específicas por tipo (`animals.js`, `constructs.js`, `humanoids.js`, `monsters.js`, `spirits.js`, `undead.js`). Cada ficha é um objeto exportado com identidade, ND, sentidos, estatísticas, ações, habilidades, perícias, equipamento e tesouro. O índice `creatureCatalog/index.js` agrega tudo e expõe buscas por id, tipo, ND e papel de ameaça.

Além do tipo da criatura, o catálogo enriquece cada ficha com papel de ameaça (`role`): `solo`, `minion`/`lacaio` ou `special`/`especial`. Esse campo representa o ícone mecânico da ficha, não a espécie ou origem da criatura. Quando o papel não está explícito no cadastro, `inferThreatRole` compara PV, Defesa, ataque e quantidade de habilidades com as tabelas de criação de ameaças e marca o resultado com `roleSource: "inferred"` e `roleConfidence`; fichas cadastradas com papel explícito usam `roleSource: "explicit"`.

A subpasta `creatureCatalog/bookBasic/` contém cadastros importados do PDF textual do Livro Básico. Esses registros ficam separados por tipo, têm `source: { book: "Livro Básico", pdfPage, bookPage }` e enriquecem criaturas manuais já existentes com a mesma fonte sem duplicar ids.

A subpasta `creatureCatalog/ameacasArton/` contém cadastros importados dos PDFs textuais de Ameaças de Arton. Duplicatas já presentes no catálogo principal não são recadastradas; em vez disso, entram como fonte adicional em `sources`. O perfil atual usa `creatureRules.bossCreatureId: "quimera"`, fazendo a Quimera de Ameaças de Arton ser a criatura específica do boss do andar 20.

`damageTypes.js` centraliza os tipos de dano (`acid`, `slashing`, `electricity`, `essence`, `fire`, `cold`, `bludgeoning`, `light`, `piercing`, `psychic`, `darkness`) com rótulos em português, aliases e categorias. Esse catálogo é usado como referência comum por ameaças, armadilhas, perigos ambientais e habilidades.

`generalCreatureAbilities.js` centraliza habilidades gerais de ameaças vindas do PDF textual de habilidades gerais, como Agarrar Aprimorado, Bando, Enxame, Evasão, Magias, Redução de Dano, Vulnerabilidade e sentidos especiais. Cada registro é um resumo estruturado com categoria, parâmetros esperados e fonte por página, para servir como base de seleção e composição em variantes de criaturas.

`traps.js` centraliza o catálogo de armadilhas do Livro Básico e de Ameaças de Arton e as regras de atribuição aos nodos. Nodos do tipo `trap` ou desconhecidos revelados como Armadilha recebem armadilha principal; encontros normais, elites e boss podem receber armadilha incidental conforme `trapRules.incidentalChanceByRoomType`. Armadilhas incidentais não aumentam `challenge.total`; elas consomem parte de `challenge.encounter` e reduzem `challenge.creatures`. Armadilhas principais definem o ND base efetivo do encontro antes da soma de clima e terreno.

`nodeTacticalMap.js` gera mapas táticos 20x14 para encontros resolvidos dos andares 11 a 20. O mapa é aberto, sem paredes por padrão, e deriva água, cobertura, terreno difícil, elevação, visibilidade e zonas de risco de `node.environment`, `node.trap` e `node.resolvedEncounter`. `tacticalMapRenderer.js` compartilha a grade, legenda e modal fullscreen entre esses mapas e a exploração estendida.

### 8. Criação e Modificação de Ameaças (`threatCreationRules.js`)

Modela as regras do PDF de criação e modificação de ameaças como dados e helpers puros. O módulo contém:
- Funções narrativas sugeridas (`combatant`, `caster`, `trickster`, `henchman`, `boss`) e seus papéis prováveis.
- Papéis mecânicos (`solo`, `minion`/`lacaio`, `special`/`especial`) com metadados de ícone, descrição e uso em encontro.
- Patamares de ND e recomendação de quantidade de habilidades por patamar.
- Tabela de deslocamentos por forma corporal/tipo de movimento.
- Parâmetros de combate por papel e ND: ataque, dano médio, Defesa, resistências forte/média/fraca, PV e CD de habilidade.
- Helpers para criar uma ficha-base, aplicar ajustes de estatística por ND, planejar modificação de uma criatura existente e criar um template de bando.

O módulo não altera o mapa nem escolhe monstros automaticamente; ele fornece a camada de regras para criação de encontros e variantes quando outro módulo precisar compor ameaças.

---

### 9. Ambiente (`environment.js`)

Gera clima e terreno proceduralmente para cada nó.

**Clima** — seleciona 0-3 variações de:
- Temperatura (frio intenso, quente, abafado...)
- Precipitação (chuva leve, tempestade, neve...)
- Vento (rajadas, vendaval...)
- Névoa (névoa leve, espessa...)

Regras de incompatibilidade: vento forte cancela névoa.

**Terreno** — seleciona tipo primário (floresta, pântano, aquático, colinas, planícies) e 1-3 características únicas (ex: vegetação densa, terreno movediço, penhascos).

Pesos de seleção são definidos por `environmentRules` no perfil do andar.

---

### 10. Perfis de andar (`floorProfiles/`)

Cada arquivo de perfil define o comportamento completo de uma faixa de andares. É o principal ponto de extensão do projeto.

Perfis atuais:
- `dungeon1to10.js`: andares 1 a 10, modo `extended-exploration`, regras de progresso, ações por andar, tabelas d100, efeitos mecânicos, tema e encontros finais.
- `forest11to20.js`: andares 11 a 20, modo `node-map`, regras de grafo, ambiente, criaturas, armadilhas e boss do andar 20.

**Estrutura de um perfil:**

```javascript
{
  id: "forest-11-20",
  label: "Floresta (11-20)",
  mode: "node-map",
  floors: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],

  encounterRules: {
    roomWeights: { normal, elite, trap, treasure },  // pesos para tipo de sala
    timeMultiplier,           // multiplicador de tempo de exploração
    bossCondition(floor),     // retorna true se deve gerar boss
  },

  challengeRules: {
    floorBands: [             // faixas de 2 andares com ND por tipo
      { floors: [11, 12], normal: 1, elite: 3, trap: 1, treasure: 1 },
      ...
    ],
    climateWeights: [...],    // peso de cada variação climática no ND
    terrainWeights: [...],    // peso de cada terreno no ND
    maxCR: 8,
  },

  theme: {                    // variáveis CSS injetadas dinamicamente
    "--color-page-bg": "#1a1a2e",
    "--color-column-1": "#4a9eff",
    // ...12 variáveis de cor + 7 cores de colunas
  },

  environmentRules: {         // pesos de geração de ambiente
    climate: { temperature, precipitation, wind, fog },
    terrain: { types, features },
  },
}
```

Para adicionar um novo perfil:
1. Criar `src/floorProfiles/meuPerfil.js` seguindo a estrutura acima.
2. Exportá-lo em `src/floorProfiles/index.js`.
3. Ele aparece automaticamente no seletor de faixa de andares.

---

### 11. RNG com seed (`random.js`)

Usa os algoritmos **cyrb128** (hash de string para 4 inteiros de 32 bits) e **sfc32** (gerador de números pseudoaleatórios).

```javascript
const seed = cyrb128("ABC123XY");   // hash da string de seed
const rng = sfc32(...seed);          // função rng() → float [0, 1)
```

Toda geração de mapa usa um único `rng` derivado do seed. O mesmo seed + mesmos parâmetros produz o mesmo mapa.

**Funções utilitárias:**

| Função | O que faz |
|---|---|
| `generateSeed(length)` | Gera string aleatória (ex: "ABC123XY") para novos mapas |
| `weightedRandom(items, rng)` | Seleciona item de array com base em campo `weight` |
| `shuffle(array, rng)` | Embaralha array in-place com Fisher-Yates |

---

### 12. Código de sessão (`sessionCode.js`)

Permite salvar e restaurar o estado completo da exploração como uma string portátil. O payload inclui o `mode` para distinguir a exploração estendida do mapa em nodos.

**Formato codificado:**

```javascript
// Prefixo "MD1." + JSON Base64-URL
"MD1.eyJ2IjoxLCJwcm9maWxlIjoiZm9yZXN0LTExLTIwIiwiZmxvb3IiOjExLCJkZXB0aCI6NiwiYm..."
```

**Payload JSON:**

```javascript
{
  v: 1,                      // versão do formato
  mode: "node-map",
  profile: "forest-11-20",
  floor: 11,
  depth: 6,
  baseDc: 15,
  unknownPaths: false,
  mapSeed: "ABC123XY",       // seed para regenerar o mapa
  state: {
    attempted: [nodeIds],
    explored: [nodeIds],
    chosenByLevel: [[level, nodeId], ...],
    rested: [nodeIds],
    elapsedMinutes: 120
  }
}
```

Para os andares 1 a 10, o payload salva `extendedState`, incluindo andar atual, sucessos, falhas, ações usadas, efeitos pendentes, cenas e log recente. Para os andares 11 a 20, o mapa é regenerado deterministicamente a partir do `mapSeed`; o payload salva a rota e o progresso do mapa em nodos.

---

## Tabelas de perícias (`tables.js`)

Define pesos de perícias por tipo de sala para o sistema Tormenta20:

| Tipo | Perícias com maior peso |
|---|---|
| Normal | Percepção, Sobrevivência, Conhecimento |
| Elite | Percepção, Sobrevivência, Misticismo |
| Armadilha | Furtividade, Ladinagem, Reflexos |
| Tesouro | Investigação, Misticismo, Percepção |
| Acampamento | Medicina, Sobrevivência |

---

## Temas visuais

O tema é aplicado injetando variáveis CSS no `:root` ao selecionar um perfil:

```javascript
// floorRanges.js
function applyTheme(profile) {
  const root = document.documentElement;
  for (const [key, value] of Object.entries(profile.theme)) {
    root.style.setProperty(key, value);
  }
}
```

Variáveis controladas: cor de fundo, painéis, header, ações, scrollbar, e 7 cores de colunas para diferenciar caminhos verticais no mapa.

---

## PWA

O app funciona offline via Service Worker (`public/sw.js`) com cache de todos os assets estáticos. O `manifest.webmanifest` permite instalação como app standalone em desktop e mobile.

---

## Pontos de extensão

| O que adicionar | Onde mexer |
|---|---|
| Nova faixa de andares | Novo arquivo em `src/floorProfiles/`, exportar em `index.js` |
| Novo tipo de sala | `tables.js` (pesos de perícia) + `generator.js` (lógica de inserção) + ícone em `public/assets/icons/` |
| Nova variação climática | `environment.js` (definição) + `challengeRules.climateWeights` no perfil |
| Novo terreno | `environment.js` + `challengeRules.terrainWeights` no perfil |
| Novo efeito dos andares 1-10 | Tabelas e resolvedores em `dungeon1to10.js` + aplicação em `extendedExplorationState.js` |
| Novo encontro final dos andares 1-10 | `dungeon1to10FinalEncounters.js`, usando fichas do catálogo e mapa tático coerente |
| Mapa tático para encontros 11-20 | Integrar `encounterResolver.js` ao modal de nó sem substituir o grafo de `forest11to20.js` |
| Internacionalização | Strings de label estão em `tables.js` e nos perfis |
