# Ecologia — Fase 3: encontro manual

> **For agentic workers:** Use superpowers:subagent-driven-development para executar e revisar as tarefas.

**Design:** [Ecologia das criaturas e encontros por etiquetas](../specs/2026-11-21-ecologia-e-encontros-design.md)

O mestre pesquisa e combina filtros para escolher fichas do catálogo inteiro ou gerar pelo orçamento. O mesmo diálogo atende a expedição e o atalho de ferramentas da tela inicial.

## Contratos

- Busca pelo nome sem diferença de acentos ou maiúsculas. Filtros combináveis por terreno, lugar, condição, tipo, ND da ficha, papel e livro. As listas ecológicas vêm do vocabulário completo e livros incluem todas as fontes da ficha.
- Fichas só manuais e variantes podem ser escolhidas explicitamente. A geração pelo orçamento respeita a elegibilidade do sorteio e o conjunto filtrado. Sem candidatas, informe o estado e preserve o resultado anterior ou mostre um estado vazio.
- A escolha exata permite uma ficha solitária, um grupo da mesma ficha com quantidade indicada, ou uma ficha coletiva de enxame. O ND é calculado pelo resolvedor existente. O ND do filtro do catálogo é independente do orçamento.
- Preserve armadilhas, ajustes de PV, integração de missões e tema bronze do atalho inicial.

## Tarefas

- [x] Implementar a função de catálogo e verificar filtros combinados, fontes compartilhadas, fichas só manuais e ND especial.
- [x] Ligar busca, filtros e composição ao diálogo existente e garantir que orçamento e escolha de ficha permaneçam operáveis.
- [x] Executar testes, build e QA pelo navegador a partir de uma sessão e pelo atalho inicial. Revisar as mudanças e registrar o fluxo na arquitetura.

A interface consome `filterManualEncounterCreatures` de `src/manualEncounterCatalog.js`. O módulo recebe filtros por ID (ND numérico ou especial e livro pelo rótulo da fonte) e retorna fichas sem alterar o catálogo.
