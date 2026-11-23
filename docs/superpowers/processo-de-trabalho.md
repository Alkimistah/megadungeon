# Processo de trabalho

Este acordo vale para a execução de planos em `docs/superpowers/plans/`, salvo outra decisão do PO.

## Papéis

- **PO, o dono do projeto.** Define o que se quer, aprova o design e o plano e decide as dúvidas que mudam o resultado na mesa. Também autoriza push e remoções.
- **Gerente, a sessão principal do Claude.** Divide o plano em tarefas, despacha um subagente implementador e um revisor por tarefa, toma as decisões técnicas e mantém o ledger. Só leva ao PO o que muda o comportamento do app ou o escopo, uma pergunta por vez, com opções e uma recomendação.
- **Implementadores e revisores, os subagentes.** Cada um recebe só a sua tarefa, extraída do plano. Não despacham outros agentes.

## Fluxo por tarefa

1. O gerente extrai o texto da tarefa e despacha o implementador com o modelo da tabela de níveis.
2. O implementador escreve o teste primeiro, vê falhar, implementa, vê passar, faz o commit e grava um relatório.
3. O gerente gera o pacote de revisão (diff da tarefa) e despacha o revisor, que dá dois vereditos: aderência ao spec e qualidade.
4. Achados Críticos ou Importantes entram no ciclo de correção com o mesmo implementador, seguido de uma re-revisão focada.
5. Com a revisão limpa, o gerente registra a conclusão no ledger.

No fim do plano, um revisor do nível mais alto lê o branch inteiro. Depois, o gerente faz uma única rodada de correções.

## Níveis de modelo

| Tipo de trabalho | Modelo |
|---|---|
| Transcrição conferida em página renderizada, UI e integração entre arquivos | `sonnet` |
| Regras com muitos casos, desenho de motor e depuração difícil | `opus` |
| Função pequena, isolada e com teste já definido, documentação e ajuste de um arquivo | `haiku` |
| Revisão por tarefa | `sonnet` (piso), ou `opus` quando a tarefa for de regras |
| Revisão final do branch | `opus` |
| Correção que travou depois de 3 rodadas | um nível acima do implementador |

O plano indica o nível de cada tarefa na seção “Execução”.

## Registro e retomada

- **Ledger:** `.superpowers/sdd/<nome-do-plano>/progress.md`, ignorado pelo Git. A primeira linha nomeia o plano. Cada tarefa concluída grava uma linha com a faixa de commits, e cada decisão do gerente vira uma linha `Ruling:` com o motivo e o custo se estiver errada.
- **Retomada:** leia o ledger e o `git log`, e retome na primeira tarefa sem linha de conclusão. Não refaça o que o ledger marca como concluído.
- **Ferramentas de PDF:** ficam em `tools/pdf/` (veja o README da pasta). Rode `npm install` nela na primeira vez. Ela tem `find.mjs`, que busca um termo, `text.mjs`, que extrai o texto por coluna, e `render.mjs`, que gera PNG das páginas. Os PDFs ficam em `recursos/livros/` e os CSVs das auditorias em `recursos/auditorias/`, pasta ignorada pelo Git.
- **Pastas fora do Git:** `tmp/` guarda o que é temporário (prévias em `tmp/previas/<assunto>/`, saídas de QA, rascunhos) e pode ser esvaziada a qualquer momento. `recursos/` guarda o que precisa durar (livros, auditorias, planilhas conferidas). Antes de apagar algo fora de `tmp/`, listar para o PO o que cada pasta contém.

## Commits e publicação

- Os commits ficam em `main`, um ou mais por tarefa, com mensagens em português no estilo `feat:` / `fix:` / `docs:`.
- O push e a publicação só acontecem quando o PO pede. Depois do push, o gerente acompanha o deploy e roda o QA de produção.

## Ritmo

- Em um plano novo, o gerente executa primeiro uma tarefa e mostra o resultado ao PO, para validar o fluxo.
- Depois disso, as tarefas seguem sem pausas. O gerente só para em ação irreversível, em questão de segurança, em push ou publicação, ou se o plano estiver quebrado a ponto de qualquer caminho ser um palpite.
