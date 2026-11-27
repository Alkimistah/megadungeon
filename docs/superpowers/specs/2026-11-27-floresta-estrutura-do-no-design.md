# Floresta (11–20): estrutura do nó — rascunho

Situação: em brainstorming com o PO, ainda não aprovado. É o primeiro de quatro trabalhos da floresta, na ordem que o PO aprovou: (1) estrutura do nó, (2) harmonia dos animais, (3) cenas de tesouro, (4) outros tipos de criatura.

## Decisões do PO (27/11/2026)
- **Três fontes de ND/XP separadas no cabeçalho do nó: ambiente (terreno e clima), criaturas e armadilha.** Hoje o cabeçalho mostra duas. O ambiente não consome o orçamento das criaturas. Ele dá XP a mais quando pesou no desafio.
- **Elite** = ND do andar +2, como no livro (chega a ND 7 nos andares 19–20). Ele é montado com **uma criatura forte**, que consome quase todo o ND, e **auxiliares ou uma armadilha** com o que sobra.
- **Armadilhas têm modo.** Algumas funcionam **sozinhas**: dano ou terreno, como fosso, bloco ou jato. Outras **precisam de alguém**, porque prendem ou incapacitam, como a rede, a gaiola, o sono e o gás pútrido. Essas nunca aparecem sozinhas num nó de armadilha. As 35 armadilhas são classificadas pelo gerente e revistas pelo PO em cartões, com decisão por regra.
- **Nó de armadilha:** a armadilha é o foco. Inimigos podem vir junto, com **ND abaixo do da armadilha** (por exemplo, armadilha ND 3 com inimigos ND 1). Os inimigos são, normalmente, **humanoides**, porque quem arma é inteligente.
- **Combate normal com armadilha:** acontece em alguns combates, perto de 1 em 5 (proposta do gerente; hoje é 6%). A armadilha tem ND reduzido e **não consome** o ND das criaturas. Qualquer criatura pode estar na cena, porque o caçador pode ter deixado a armadilha e ido embora, ou o chão da toca cede.
- Aprovado o fim da subtração linear (encontro − armadilha) que gerava os ND fracionários.

## Abordagem proposta (aguarda escolha do PO)
**A (recomendada).** Evoluir o pipeline atual:
- `challenge` ganha três parcelas;
- `assignTrapProfile` deixa de subtrair;
- uma tabela de regras por tipo de nó entra no perfil da floresta;
- o campo `modo` entra nas armadilhas;
- o elite passa a usar "criatura forte + auxiliares";
- tudo fica atrás de uma nova versão de geração (`GENERATION_VERSION` em `src/forestExpedition.js`), e expedições salvas continuam como estão.

**B.** Uma camada nova de "receita do nó" só para a floresta. É mais limpa, porém com mais código e mais risco.

O PO perguntou se a A é simples. Resposta: é média, com umas 5 tarefas. Na próxima sessão, confirmar a abordagem, escrever o design completo e passar ao plano.

## Contexto medido (27/11/2026)
- **ND fracionários:** vinham da armadilha incidental subtraída das criaturas, e não do clima.
- **Pesos de clima e terreno:** são regra da casa. O livro só diz que o ambiente "pode afetar".
- **Nos andares 11–14,** só cerca de 6% dos combates têm armadilha.
- **Criaturas melhoradas** (qualificador no nome): 0 em 4.632 encontros. O catálogo largo sempre acha um "zoológico". Isso fica para o trabalho 2: o ecossistema vira barreira, os aquáticos dependem de água no mapa, as famílias de animais são flexíveis, o limite é de 2 a 3 fichas e a melhoria acontece dentro da família.
