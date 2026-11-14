# MVP dos andares 11–20 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Entregar exploração 11–20 com missões realmente presentes nos nodos, persistência estável e regras essenciais verificadas.

**Architecture:** Manter o grafo e os modos existentes. Preparar mapas e missões da expedição de floresta juntos; serializar nodos e links sem ciclos para preservar conteúdo. Composição obrigatória substitui o encontro aleatório do nodo dentro de seu orçamento. Códigos antigos continuam no caminho legado.

**Tech Stack:** JavaScript ES Modules, Vite, Node test runner, Playwright.

**Spec:** `PLANEJAMENTO_ANDARES_11_A_20.md`, `PROGRESSAO_NIVEIS_GRUPO.md` e respostas do usuário em 14/11/2026.

## Global Constraints

- Implementação na pasta e branch atuais autorizada pelo usuário.
- Personagens de níveis 4–7; CDs 20,20,21,21,21,22,22,22,23,23; variação comum −3/+3 e elite +2/+5.
- Extermínio continua distribuído pelos nodos/andares da faixa, com contador.
- Quimera ND 8 sozinha, arena fixa simples sem perigos ou mecânicas extras. Mecânica especial futura é pendência importante.
- Descanso verdadeiro seguro; não criar descanso falso incidentalmente.
- Não implementar P2–P4 neste MVP. Não mudar regras não definidas de duração/recuperação do descanso.
- Preservar 1–10, 21–30, códigos anteriores e base `/megadungeon/`.
- Nenhuma publicação ou push faz parte desta execução.

## Review Focus

- Missões em mapas futuros e IDs de nodo repetidos entre andares não devem abrir a cena de outro andar.
- Extermínio precisa de quantidade suficiente em rota possível sem contar o mesmo encontro duas vezes.
- Missões não combativas precisam de objetivo concreto e contexto ambiental compatível.
- Salvar/restaurar e avançar devem preservar conteúdo, vínculos, progresso e conclusão.
- O caminho legado de sessão não pode reinterpretar nodos antigos como mapas novos.

## Task 1 — geração e regras essenciais

**Files:** `src/generator.js`, `src/forestBossEncounter.js` (novo), `src/floorProfiles/forest11to20.js`, `src/nodeTacticalMap.js`, `scripts/validateForestMvp.test.mjs` (novo).

**Interfaces:** `generateMapData(..., rng, { version = 1 } = {})`; versão 2 resolve mecânica pelo tipo real, preservando apresentação desconhecida e versão 1. `createForestBossEncounter(node)` define cena fixa. `createNodeTacticalMap(node, { mission })` mantém terreno/posições da mesma cena.

- [x] Escrever e observar falha: elite desconhecida usa ND de elite; acampamento desconhecido é protegido; Quimera e arena não variam; abrir missão não rearranja mapa.
- [x] Implementar versão 2 sem alterar a geração legada.
- [x] Executar `node scripts/validateForestMvp.test.mjs`; esperado: testes desta tarefa passam.

## Task 2 — composição e posicionamento de missões

**Files:** `src/missions/forestMissionIntegration.js` (novo), `src/missions/forestMissionScenes.js` (novo), teste da tarefa 1.

**Interfaces:** `materializeForestFloorMissions({ floor, levels, missions }) -> missions`; vínculos `{kind:'node',floor,nodeId,quantity,context}`. Objetivos concretos em `node.missionObjectives`; combate obrigatório via `node.fixedComposition` e ND real validado.

- [x] Escrever e observar falha: caçada contém alvo; extermínio acumula quantidades; missões compartilham rota possível; ambiente é compatível; mapa sem espaço não é declarado válido.
- [x] Escolher rota com programação dinâmica; colocar objetivos compatíveis e no máximo uma composição obrigatória por nodo.
- [x] Preservar vínculos de outros andares e histórico concluído. Distribuir extermínio apenas até completar quantidade reservada.
- [x] Executar teste; esperado: cenários acima passam e ND não ultrapassa orçamento.

## Task 3 — expedição e persistência

**Files:** `src/forestExpedition.js` (novo), `src/main.js`, teste da tarefa 1.

**Interfaces:** `prepareForestExpedition({ seed, profile, missions, startFloor, depth, baseDc }) -> { floors, missions, ... }`; `serializeForestExpedition(expedition)` e `restoreForestExpedition(snapshot)`; links serializados por ID no contexto do andar.

- [x] Escrever e observar falha: todas as categorias são materializadas, quantidade total de extermínio é suficiente, snapshot restaura encontros e vínculos sem ciclos, orçamento e rota permanecem válidos em amostragem.
- [x] Preparar mapas determinísticos com novas tentativas limitadas quando falta posição válida; falhar com mensagem explícita se a seleção não couber.
- [x] Integrar seleção, avanço, consulta e restauração; não rematerializar snapshots já preparados.
- [x] Executar teste e `npm run test:missions`; esperado: contratos novos e existentes passam.

## Task 4 — progresso, conclusão e interface

**Files:** `src/appState.js`, `src/nodeDialog.js`, `src/missions/missionState.js`, `missionEncounterIntegration.js`, `missionDialog.js`, `src/main.js`, teste da tarefa 1.

**Interfaces:** `state.completeNode(node)` / `isNodeCompleted(node)`; `missionState.recordEncounterProgress(missionId, eventKey, quantity)` idempotente; consultas consideram andar e nodo e distinguem destino futuro/objetivo deixado para trás.

- [x] Escrever e observar falha: escolha não conclui cena nova; conclusão libera saída; descanso seguro exige nodo escolhido; mesmo evento não soma de novo após restaurar.
- [x] Implementar controles claros de conclusão, progresso e objetivo local; manter correção manual do mestre.
- [x] Executar teste, `npm run test:missions` e `npm run test:floors-1-10`; esperado: nenhuma regressão.

## Task 5 — QA e entrega

**Files:** `scripts/qaForestMvp.mjs` (novo), `package.json`, documentação de andamento.

- [x] Testar no navegador seleção, alvo obrigatório, objetivo sem combate, contador sem duplicação, conclusão, descanso, avanço, salvar/restaurar, boss e viewport de tablet/mobile.
- [x] Executar todos os testes, build e QA do modo 1–10; verificar console e versão de produção offline.
- [x] Revisar diff completo e corrigir problemas importantes com regressões reproduzíveis.
- [x] Atualizar documentos com o que foi entregue e o que permanece pendente.

## Registro de execução

- Baseline: `npm run test:missions` passou (3 perfis × 250 seeds); `npm run test:floors-1-10` passou (13.500 encontros e 32 composições finais).
- Decisões de regras acima confirmadas pelo usuário; sem decisão pendente para começar.
- Alterações anteriores de documentação serão preservadas. Não incluir arquivos alheios à entrega.

### Resultado da execução

- Tasks 1–5 concluídas na pasta e branch autorizadas, com desenvolvimento orientado a regressões RED→GREEN.
- Suíte final: 18/18 testes do MVP, testes de missões (3 perfis × 250 seeds) e 13.500 encontros dos andares 1–10 passaram.
- QA dos dois modos passou no Chrome instalado; o script antigo de QA 1–10 foi promovido a script reutilizável com executável configurável.
- QA do build de produção passou, incluindo legado, IDs repetidos entre andares, erro de configuração sem perda de estado e operação offline após cache.
- Amostragem adicional: 1.500 expedições / 3.926 missões, sem falha de preparação.
- Revisão independente: lacuna importante em cenas de investigação/desafio corrigida; regressões específicas observaram ausência de evidências/abordagens antes e passaram depois. Nenhum outro problema mecânico confirmado na revisão.
- Verificação adicional: Escape não fecha o encontro subjacente, desconhecidos não revelam a CD antes da escolha, e acampamento explicita proteção contra riscos do terreno externo.
- Decisão técnica: preparar e salvar os mapas futuros junto da seleção torna os vínculos reais e evita depender de regeneração. Códigos antigos continuam no caminho legado; não recebem mudança retroativa de encontros.
- Nenhuma regra nova de dano, penalidade ou duração de descanso foi criada. Calibragem, extermínio distribuído e arena simples seguem respostas explícitas do usuário.
- Mecânica especial futura da Quimera registrada como pendência importante.
- Publicação, push e teste no tablet físico não foram realizados. Build está disponível em `dist/`; servidores locais de desenvolvimento e preview foram usados na validação.
