# Ecologia — Fase 2: gerador por etiquetas

> **For agentic workers:** Use superpowers:subagent-driven-development to execute each task.

**Spec:** [Ecologia das criaturas e encontros](../specs/2026-11-21-ecologia-e-encontros-design.md)

**Objetivo:** Aplicar etiquetas aos encontros automáticos dos andares 11–30 mantendo o cálculo de ND e a curadoria dos andares 1–10.

## Contratos

- Perfis habilitam a ecologia via `creatureRules.ecology`. Em perfis legados, manter a composição para as mesmas sementes, incluindo as afinidades e apoios antigos restritos a esse fluxo.
- Ordenar elegibilidade antes da ponderação. Em sorteios ecológicos, excluir fichas com `manualOnly`, tipo `event`, ND inválido e livros desativados. Representar uma família pela variante preferida elegível, com substituição pela base ou por outra variante elegível. Manter escolhas curadas e explícitas.
- Ambiente ausente e etiqueta vazia têm multiplicador 1. Para contexto conhecido, pesos de terreno, lugar e condição compatíveis são 3, 2 e 2. Cada categoria não compatível vale 0,75. Comum/incomum/rara multiplicam por 1/0,65/0,25. Combinar com preferência tipológica, ND, agrupamento e parentesco. Usar os fallbacks de ND existentes. Nunca reintroduzir exclusões.
- Preservar encontros já resolvidos, ajustes de vida e rerrolagem determinística. A alteração de livros afeta futuros sorteios.
- Usar as etiquetas da fase 1 no estado entregue pelo PO. Raridade reduz a frequência dos raros em sucessivos sorteios independentes.

## Tarefas

1. **Motor e catálogo.** Criar `src/encounterEcology.js`, ajustar elegibilidade em `src/creatureCatalog/index.js`, isolar preferências legadas e ligar a ponderação às escolhas de tamanho, líder, apoio, ajuste, rerrolagem e emboscada em `src/encounterResolver.js`. Usar agrupamento como preferência para quantidades viáveis, com tamanho 1 para solitária/enxame, 2 para dupla, 3–4 para bando e 4–6 para horda. Um enxame representa uma ficha coletiva. Exportar o contexto e os pesos para testes. Testar com amostragem determinística e regressão de ND.
2. **Configuração e fluxos.** Declarar mapas de terreno, lugares, condições e preferências por tipo/subtipo nos perfis. Ligar o contexto da floresta aos nomes do terreno e clima reais. Declarar contextos reutilizáveis do arquipélago para mar aberto e costa/ilhas. O fluxo atual do arquipélago tem objetivos, sem entrada de combate. Manter encontros temáticos explícitos. Validar os contextos e entradas usadas pelo app.
3. **Livros.** Expor a lista de livros do catálogo e sua seleção na interface usando as preferências persistidas do app. Estado anterior habilita todos. Passar os livros desativados aos sorteios ecológicos novos e rerrolagens. Cobrir recuperação com preferências antigas, família com variante elegível e conjunto vazio.
4. **Verificação.** Revisar o conjunto, executar testes de ecologia, faixas 1–10 e 11–20, arquipélago e build. Fazer QA das entradas alteradas. Atualizar o registro da arquitetura com a fórmula e o estado da fase.

## Interfaces entre tarefas

- Tarefas 1 e 2 compartilham o contrato de `creatureRules.ecology` e a normalização do contexto. Concluir o contrato antes de ligar os perfis.
- Tarefas 1 e 3 compartilham o filtro de livros. O motor recebe `disabledCreatureBooks` no perfil de sorteio, com padrão vazio.
- Tarefas 2 e 3 compartilham os pontos de entrada de sorteio. Conferir os caminhos gerados pela floresta e pelo arquipélago após integrar ambos.
