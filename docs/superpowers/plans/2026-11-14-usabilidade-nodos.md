# Clareza dos nodos 11–20 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Facilitar a condução da sessão de 14/11 às 15h, distinguindo exploração, escolha de rota e conclusão da cena.

**Architecture:** Reaproveitar os estados existentes em `appState.js` e mudar apenas sua apresentação no mapa, na legenda e nas mensagens de orientação. Não criar estados persistidos novos nem mudar progressão, encontros ou regras.

**Tech Stack:** JavaScript ES Modules, SVG, CSS, testes Node e QA Playwright existentes.

**Spec:** `PLANEJAMENTO_ANDARES_11_A_20.md` e orientação do usuário de priorizar clareza visual, deixando salvamento automático fora desta entrega.

## Escopo e corte de horário

- Escopo autorizado: tarefas 1 e 2.
- Marcação de descanso excluída expressamente pelo usuário; não implementar nesta entrega.
- Até 14h25: concluir mudanças obrigatórias; não iniciar novas funcionalidades depois desse corte.
- 14h25–14h40: testes e correções de regressões.
- 14h40–14h50: commit, push e confirmação da publicação, quando a entrega estiver autorizada e validada.
- 14h50–15h: conferir a versão no dispositivo da sessão. Se houver problema importante, manter a versão estável publicada.
- Esses horários são limites de escopo; não justificam publicar com testes falhando.

## Global Constraints

- Não alterar ND, CDs, clima, terreno, geração, missões ou composição da Quimera.
- Não alterar custos de tempo, recuperação ou condições de descanso.
- Não implementar salvamento automático ou novo sistema de backup nesta entrega.
- Preservar os ícones dos tipos de encontro; os indicadores de progresso devem ser adicionais.
- Não depender apenas de cor ou de passar o mouse: ícone, legenda e texto na modal precisam funcionar no tablet.
- Não revelar conteúdo de nodos desconhecidos ou bloqueados.
- Sessões antigas permanecem compatíveis. Ausência de conclusão no legado não significa automaticamente encontro pendente ou vencido.

## Review Focus

- Um nodo escolhido também pode estar marcado como explorado: a apresentação deve respeitar a precedência dos estados.
- Explorado não é sinônimo de combate vencido ou cena concluída.
- Um nodo concluído continua consultável e seu tipo de encontro permanece identificável.
- Indicadores não podem cobrir o selo de missão, a CD ou áreas de toque.
- Restaurar a sessão deve recuperar a mesma apresentação a partir dos estados já salvos.

## Task 1 — estados visuais e legenda (obrigatória)

**Files:** `src/appState.js`, `src/mapRenderer.js`, `src/styles.css`, `index.html`, `scripts/validateForestMvp.test.mjs`.

**Interfaces:** acrescentar apenas `completed` ao retorno de `getNodeViewState(node)`, derivado de `isNodeCompleted(node)`. `nodeProgressPresentation.js` compartilha os rótulos e a orientação entre mapa e modal. Não alterar a serialização.

| Estado | Apresentação proposta | Significado |
|---|---|---|
| Disponível | Borda de disponibilidade distinta das rotas anteriores | Pode ser escolhido agora |
| Explorado, ainda sem rota escolhida | Contorno tracejado e identificação textual na modal/legenda | Exploração registrada; cena ainda não concluída |
| Rota escolhida, cena pendente | Borda de destaque e pequeno marcador de pendência | O grupo entrou na cena; falta concluí-la |
| Concluído | Pequeno selo de confirmação `✓`, com destaque mais discreto | A cena foi resolvida pelo mestre |
| Bloqueado/oculto | Manter a apresentação atual | Não pode ser escolhido agora |

Precedência: concluído → escolhido pendente → explorado → disponível. Manter a indicação existente de tentativa sem tratá-la como conclusão. No legado, aplicar pendência somente quando o nodo exigir conclusão explicitamente (`requiresCompletion`).

- [x] Escrever regressões para explorado versus escolhido versus concluído, inclusive após salvar/restaurar e em sessão legada; observar falha antes da implementação.
- [x] Expor os dois estados derivados e aplicar classes/selos no SVG, sem substituir o ícone do encontro.
- [x] Atualizar a legenda e o nome acessível do nodo com os estados visíveis ao usuário.
- [x] Conferir que selo de missão, CD, ícone e indicador de progresso não se sobrepõem.

## Task 2 — próxima ação explícita (obrigatória)

**Files:** `src/main.js`, `src/nodeDialog.js`, `index.html`, `src/styles.css`, `scripts/qaForestMvp.mjs`.

**Interfaces:** usar os estados atuais e a condição existente de avanço de andar. A mensagem apenas explica a situação; não libera nem bloqueia ações novas.

| Situação | Orientação |
|---|---|
| Nenhuma cena pendente e há nodos disponíveis | “Escolha um nodo disponível para continuar.” |
| Cena escolhida e não concluída | “Conclua o encontro escolhido para liberar a próxima rota.” |
| Última cena do andar concluída | “Andar concluído. Você já pode avançar.” |
| Quimera derrotada e faixa concluída | “Etapa concluída.” |

Mostrar uma orientação curta junto ao controle de avanço e o estado textual na modal. A escolha de um nodo apenas explorado deve continuar disponível conforme as regras atuais. Nos desconhecidos, explicar a próxima ação sem antecipar o conteúdo.

- [x] Cobrir no QA o caminho escolher → concluir → próxima rota → finalizar andar, verificando as mensagens e a disponibilidade existente dos botões.
- [x] Mostrar “Exploração registrada”, “Encontro pendente” ou “Encontro concluído” conforme o estado real, evitando transformar “Explorado” em “Resolvido”.
- [x] Verificar leitura e toque em 1024×768 e 390×844, sem animação contínua ou novo painel volumoso.

## Fora desta entrega

Marcação adicional de descanso removida a pedido do usuário. Salvamento automático, novas regras e mudanças de encontros permanecem fora do escopo.

## Aceite e publicação

- [x] A diferença entre explorar, entrar e concluir é identificável no mapa e na modal sem depender só de cor.
- [x] Os controles mantêm exatamente as permissões atuais.
- [x] Sessões novas e legadas restauram sem mudança de progresso ou conteúdo.
- [x] `npm run test:floors-11-20`, `npm run test:missions`, `npm run test:floors-1-10` e `npm run build` passam.
- [x] QA de 11–20 passa no build de produção, incluindo persistência, legado e layout em tablet/mobile.
- [x] Se houver alteração compartilhada de modal/mapa tático, conferir também o QA de 1–10.
- Publicar somente esta candidata validada. A confirmação do GitHub Pages será feita após o push, pelo workflow associado ao commit.

## Andamento

Implementação concluída e validada localmente em 14/11/2026. Não houve mudança de regras, estado persistido ou conteúdo dos encontros.

- 24 testes de 11–20 passaram, incluindo precedência dos estados, restauração e legado.
- Testes de missões (3 perfis × 250 seeds), validação dos 13.500 encontros de 1–10 e build passaram.
- QA de produção cobre mensagens, selos, ausência de sobreposição com ícone/CD/missão, restauração, legenda mobile e operação offline após cache.
- Revisão independente conferiu precedência, desconhecidos e legado. Apontou orientação incorreta ao selecionar outro andar em sessão antiga; a orientação passou a pedir geração do mapa selecionado. Regressão observada falhando antes da correção e passando depois.
- A serialização não ganhou campos; os estados visuais são derivados dos dados existentes.
- O selo de descanso não foi implementado, conforme decisão do usuário.
- A publicação e sua confirmação seguem o workflow do commit; o teste no tablet físico permanece a cargo do usuário.
