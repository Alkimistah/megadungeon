# Missões por ilha no arquipélago (andares 21–29)

## Intenção

No arquipélago, a missão é uma cena própria da ilha. O objetivo, o texto e o mapa tático combinam com o tema e o terreno dela. A missão não depende de como os setores terminaram. Na ficha da ilha, o acesso à missão fica compacto e os setores continuam sendo o destaque.

Hoje as missões da faixa usam uma lista única de alvos ("amostras de coral vivo", "superar um tabu local"…). Por isso surgem pedidos fora de lugar, como coral na Ilha Vulcânica ou tabu no fortim pirata. Além disso, cada missão se prende ao setor que "combina melhor", e o setor ganha um selo "Missão". A ficha mostra um painel largo com o botão "Realizar missão" acima da ilustração.

## Objetivos

- Toda missão sorteada para uma ilha usa conteúdo coerente com o tema dela.
- Cada tema ativo tem listas temáticas próprias e uma missão escrita à mão como destaque.
- A missão tem um mapa tático próprio, com o terreno da ilha.
- No máximo uma missão por ilha. O quadro continua oferecendo de 1 a 8 missões.
- O acesso fica no rodapé da ficha, junto de "Retornar ao barco".
- Reativar um tema no futuro exige preencher o pacote de missões dele, e um teste cobra isso.

## Fora do escopo

- Os 13 temas desativados (Náufragos, Algas Gigantes, Névoa, Cemitério de Navios, Navio Abandonado, Ruínas Ciclópicas, Ilha Sagrada, Maré Impossível, Cristal, Iceberg, Ilha Viva, Sal e Ossos, Elemental). Eles vão voltar aos poucos em trabalhos futuros, cada um com o seu pacote.
- O andar 30 (Ilha dos Dinossauros / Rei Tirano), que não tem missão.
- Recompensa, aceite (até três missões ativas) e conclusão manual pelo mestre. Tudo isso continua como está.
- Mudanças nos setores, no guardião, nas emboscadas e na grade tática compartilhada.
- A campanha em mesa.

## O que seria um fracasso, mesmo funcionando

- Uma missão que cita algo que não existe na ilha, como coral num vulcão.
- O acesso à missão disputando atenção com os setores.
- A missão voltar a depender de um setor, seja por selo, vínculo ou conclusão automática.
- Um tema reativado entrar no sorteio sem missões próprias e sem nenhum aviso.

## Restrições

- Temas ativos com missão (9): `tropical`, `mangrove`, `atoll`, `coral-coast`, `volcanic`, `sea-caves`, `pirate-held`, `floating`, `storm`. A lista vem de `enabledThemeIds` em `src/floorProfiles/archipelago21to30.js`, sem `dinosaurs`.
- O sorteio de missões já conhece o tema de cada andar por `worldDraft.islands[].themeId` (`missionGenerator.js:183`).
- Os terrenos das ilhas já estão cadastrados: em `SECTOR_ISLANDS[themeId].terrain` (`src/archipelagoPilot.js`) e nos módulos de cada ilha (`archipelagoVolcanic.js` etc.). Os layouts dos setores ficam em `src/archipelagoTacticalMap.js`. A missão reaproveita o terreno, mas não copia o layout dos setores.
- As missões não criam dano ou CD próprios. Elas usam as regras já cadastradas, como a floresta faz em `forestMissionScenes.js`.
- O conteúdo é revisado pelo PO em páginas de cartões visuais, não em CSV.

## Abordagens consideradas

1. **Um arquivo de missões do arquipélago organizado por tema (escolhida).** Cria-se `src/missions/archipelagoMissionThemes.js` com uma entrada por `themeId`. O gerador e o mapa tático consultam essa entrada, e um teste cobra a entrada de todo tema ativo.
2. **Conteúdo da missão dentro do módulo de cada ilha.** Setores e missão ficariam juntos, mas Tropical e Manguezal não têm módulo próprio, então a estrutura ficaria desigual e a revisão do conjunto, espalhada.
3. **Etiquetas de ambiente, como na floresta.** Um tema reativado herdaria conteúdo de graça, mas o texto sairia genérico, que é o problema a resolver, e não haveria lugar para a missão escrita à mão.

O PO escolheu a 1: tudo num lugar só, a revisão fica fácil e o teste guia a reativação dos 13 temas.

## Decisões do PO

- **Missão temática desde a oferta.** O texto já nasce com o tema, mesmo que isso revele a ilha.
- **Caminhos desconhecidos:** o destino da missão mostra só "Ilha N", sem o nome da ilha, que hoje aparece. O spoiler pelo conteúdo é aceito porque muitos temas são parecidos.
- **Conteúdo misto (C):** listas temáticas para cada tema ativo, mais uma missão escrita à mão por tema. As genéricas continuam, mas só com alvos que servem para qualquer ilha.
- **Uma missão por ilha, no máximo.** De 1 a 8 ofertas por carregamento da faixa, todas em ilhas diferentes.
- **Missão independente dos setores.** Sai o vínculo de setor e sai o selo "Missão" dos setores.
- **Acesso no rodapé (opção C da prévia).** Um botão com ícone de pergaminho e o texto "Missão: <título>", entre o contador de setores e "Retornar ao barco". O painel largo "Missão disponível" sai. Captura de referência: `.playwright-mcp/missoes-arquipelago/c-rodape.png`.

## Desenho

### Conteúdo por tema (`archipelagoMissionThemes.js`)

Cada entrada por `themeId` contém:

- **Listas temáticas** com as mesmas chaves de `targetPools` do perfil: `locations`, `materials`, `objects`, `mementos`, `clues`, `challenges`, `phenomena`. São de 4 a 6 itens por lista, todos coerentes com o tema.
- **Uma missão em destaque**, escrita à mão, com categoria, título, alvo, texto de abertura e objetivo. Pode ter um ajuste de mapa (elemento central e risco) e precisa respeitar as regras de categoria e validação já existentes.
- **Elementos do mapa:** obstáculos e riscos característicos do tema (rachaduras de lava e calor na Vulcânica, canais rasos e lama no Manguezal, poças de maré e banco de areia no Atol…), escritos com os tipos que o mapa tático já usa.

As listas genéricas de `targetPools` no perfil perdem os itens ligados a um tema, como coral e recifes, que passam para os temas costeiros. Ficam só alvos neutros: diário de bordo, sextante, caixa lacrada, mapa na garrafa.

### Sorteio

- O número de ofertas continua de 1 a 8 (`getOfferCount`).
- Cada oferta ocupa um andar ainda livre entre 21 e 29, sem repetir ilha.
- Para a ilha sorteada, o alvo sai da **lista temática do tema unida à lista genérica**.
- A missão em destaque do tema entra como **uma possibilidade a mais** para aquela ilha, sem ser obrigatória. O peso fica a cargo do implementador; sugestão: cerca de 1 chance em 3 quando a ilha é sorteada. Ela também respeita a regra de não repetir categoria quando isso for possível.
- Com Caminhos desconhecidos ligado, o destino é rotulado "Ilha N". Essa regra vale em todos os textos da oferta: título do destino, descrição e cartão.
- `materializeMissionsForCurrentContent` deixa de vincular a missão a um objetivo da ilha no modo `archipelago`. A missão segue apenas com `destination.kind = "island"`.

### Mapa tático da missão

- `createMissionTacticalMap` recebe o tema e o terreno da ilha de destino.
- Nome, efeito e características do terreno vêm do cadastro da ilha. Os obstáculos e riscos vêm dos elementos do mapa do tema. A categoria da missão continua decidindo onde ficam o objetivo, os inimigos e o risco.
- A missão em destaque pode fixar o elemento central do mapa.
- O mapa é determinístico por missão, como já é hoje.

### Ficha da ilha (`archipelagoRenderer.js`)

- Sai o painel `mission-context-panel` acima da ilustração.
- Sai o indicador `mission-inline-indicator` dos setores.
- O rodapé `archipelago-island-footer` ganha o botão da missão, no mesmo estilo de pílula da prévia, entre o contador e "Retornar ao barco". Ele aparece nas mesmas condições do botão atual: ilha visitada ou em exploração, com missão ativa para aquele andar.
- O selo "Missão" no mapa de ilhas continua.
- Em telas estreitas, o botão pode quebrar linha ou encurtar o título com reticências, mas não esconde "Retornar ao barco".

### Progresso e sessão

O aceite, o ajuste de progresso, a conclusão manual e a recompensa continuam como estão. Missões salvas com vínculo de setor de versões anteriores devem abrir normalmente; o vínculo antigo é ignorado.

### Teste de cobertura dos temas

Um teste percorre `enabledThemeIds` (menos `dinosaurs`) e falha se algum tema não tiver entrada completa em `archipelagoMissionThemes.js`: as listas preenchidas, a missão em destaque válida e os elementos do mapa. Esse é o checklist para reativar os 13 temas.

## Revisão do conteúdo pelo PO

Os textos das 9 entradas (listas e missões em destaque) são apresentados em uma página de cartões, com um cartão por tema, antes de entrar no código final. Os ajustes pedidos voltam ao arquivo. As prévias ficam em `.playwright-mcp/missoes-arquipelago/` e são apagadas depois da validação.

## Esclarecimentos da revisão (decisões do gerente)

- **Alvos de criatura:** o arquipélago não tem categorias com criatura como alvo. `allowedCategories` traz só coleta, exploração, recuperação, investigação, resgate, entrega, desafio e anomalia; caça especial e extermínio ficam fora. Não há lista de criaturas por tema neste trabalho.
- **Vínculo de setor:** desliga-se só no modo `archipelago`. O campo `integration.bindings` continua no modelo, porque a floresta usa vínculos de nodo; nas missões do arquipélago, qualquer vínculo `kind: "objective"` salvo antes é ignorado. Não há conclusão automática da missão por setor.
- **Botão do rodapé:** encontra a missão por `destination.kind = "island"` e `destination.floor` da ilha aberta, como `getMissionsForFloor` faz hoje.
- **Rótulo "Ilha N":** é calculado na exibição a partir de `destination.floor` e do estado de Caminhos desconhecidos, e não fica gravado no rótulo. Assim valida também as missões já salvas. O título da missão, inclusive o da missão em destaque, aparece normalmente, porque o PO aceitou o spoiler pelo conteúdo.
- **Tema no mapa tático:** vem de `destination.targetId` (o `themeId` gravado na oferta). O terreno é buscado no cadastro da ilha por esse `themeId`. A semente continua sendo o `mission.id`. Uma missão sem `targetId`, por ser antiga, usa o mapa genérico atual.
- **Tipos de célula:** o mapa usa só os tipos que `tacticalMapRenderer.js` já conhece (`water`, `current`, `lava`, `deck`, `swamp`, `wet`, `slope`, `wind`, `difficult`, `concealment`, `tree`, `foliage`…). Os riscos usam "Armadilha" e "Mecanismo", como hoje. Não se criam tipos novos neste trabalho.
- **Tema sem entrada em tempo de execução:** a ilha usa só as listas genéricas e o mapa genérico, sem erro. O teste de cobertura é a proteção contra reativar um tema sem pacote.

## Fica a cargo do implementador

- O formato exato dos dados em `archipelagoMissionThemes.js` e a forma de passar o tema ao gerador e ao mapa.
- O peso exato da missão em destaque no sorteio.
- O estilo final do botão do rodapé, desde que siga a prévia e o visual da modal.
- O que fazer quando restarem menos ilhas livres do que ofertas. Não deve acontecer, porque são 9 ilhas para no máximo 8 ofertas.
