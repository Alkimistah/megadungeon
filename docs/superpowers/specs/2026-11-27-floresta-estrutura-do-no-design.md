# Floresta (11–20): estrutura do nó

Situação: design aprovado pelo PO com ajuste no texto de XP. A abordagem A foi escolhida em 27/11/2026. O plano está em [Estrutura dos nós da floresta](../plans/2026-11-27-floresta-estrutura-do-no.md).

## Escopo

Este é o primeiro dos quatro trabalhos da floresta. A ordem aprovada é estrutura do nó, harmonia dos animais, cenas de tesouro e outros tipos de criatura. O objetivo desta etapa é dar a cada tipo de nó uma composição previsível para o mestre e tornar visível de onde vêm seu ND e seu XP. As cenas escritas e os encontros fixos mantêm sua composição. A seleção ecológica vigente continua valendo.

## Decisões do PO (27/11/2026)
- **Três fontes de ND/XP separadas no cabeçalho do nó: ambiente (terreno e clima), criaturas e armadilha.** Hoje o cabeçalho mostra duas. O ambiente não consome o orçamento das criaturas. Ele dá XP a mais quando pesou no desafio.
- **Elite** = ND do andar +2, como no livro (chega a ND 7 nos andares 19–20). Ele é montado com **uma criatura forte**, que consome quase todo o ND, e **auxiliares ou uma armadilha** com o que sobra.
- **Armadilhas têm modo.** Algumas funcionam **sozinhas**: dano ou terreno, como fosso, bloco ou jato. Outras **precisam de alguém**, porque prendem ou incapacitam, como a rede, a gaiola, o sono e o gás pútrido. Essas nunca aparecem sozinhas num nó de armadilha. As 35 armadilhas são classificadas pelo gerente e revistas pelo PO em cartões, com decisão por regra.
- **Nó de armadilha:** a armadilha é o foco. Inimigos podem vir junto, com **ND abaixo do da armadilha** (por exemplo, armadilha ND 3 com inimigos ND 1). Os inimigos são, normalmente, **humanoides**, porque quem arma é inteligente.
- **Combate normal com armadilha:** acontece em alguns combates, perto de 1 em 5 (proposta do gerente; hoje é 6%). A armadilha tem ND reduzido e **não consome** o ND das criaturas. Qualquer criatura pode estar na cena, porque o caçador pode ter deixado a armadilha e ido embora, ou o chão da toca cede.
- Aprovado o fim da subtração linear (encontro − armadilha) que gerava os ND fracionários.

## Abordagem

A abordagem A, escolhida pelo PO, evolui a geração atual. O perfil da floresta fornece as regras por tipo de nó, o gerador atribui os orçamentos e o resolvedor materializa a composição. Uma variante nova do fluxo de armadilhas elimina o desconto linear. A alternativa B criaria uma camada de receitas da floresta, com implementação e integração mais amplas.

As regras abaixo que detalham valores, alternativas de sorteio e apresentação são propostas do design.

## Regras por tipo de nó

| Tipo efetivo | Criaturas | Armadilha |
|---|---|---|
| Combate normal | Alvo integral do andar, de ND 1 a 5. Usa a composição de grupo atual. | 20% de chance de tentar o sorteio em cada nó de combate normal. Usa armadilha compatível de ND até `máx(¼, ND do andar − 1)`. |
| Armadilha | Escolta humanoide por padrão. Uma armadilha que dependa de inimigos exige escolta. Uma autônoma pode vir só ou com escolta. | Foco do nó. Sorteia dentro do ND de armadilha do andar, com preferência pela mais próxima do alvo. |
| Elite | Alvo de ND do andar +2, de 3 a 7. Uma criatura principal e auxiliares quando essa for a composição escolhida. | Pode ocupar o lugar dos auxiliares dentro do alvo do elite. |
| Guardião, tesouro, acampamento e cena escrita | Seguem as regras e composições próprias. | Seguem as regras e composições próprias. |

Um nó desconhecido usa o tipo efetivo revelado para aplicar a tabela. A apresentação segue as regras atuais de ocultação até a descoberta. Os pesos do ambiente continuam vindo do perfil da floresta. O abrigo do acampamento e a regra de ambiente dos guardiões são preservados.

### Catálogo e escolta

Cada uma das 35 entradas recebe um modo baseado no efeito descrito na ficha. O modo autônomo cobre efeitos capazes de produzir dano ou criar um obstáculo relevante por si, como fosso, bloco e jato. O modo com escolta cobre efeitos cujo perigo depende de alguém aproveitar a restrição ou incapacidade, como rede, gaiola, sono e gás pútrido. Cada cartão de revisão mostra nome, fonte, ND, regra decisiva, modo proposto e justificativa. Casos mistos seguem o efeito que sustenta o desafio. O PO revisa os cartões antes de o catálogo classificado entrar na geração.

Para a escolta, usar o ND **real** da armadilha sorteada como limite. Proposta de progressão: mirar ND ¼ para armadilha ND ½ ou ¾, ND ½ para armadilha ND 1, ND 1 para armadilha ND 2 ou 3, ND 2 para armadilha ND 4 e ND 3 para armadilha ND 5. O ND de grupo da escolta, calculado pela regra do livro, fica sempre abaixo do ND da armadilha. ND ¼ é o menor ND disponível para a escolta. Uma armadilha ND ¼ que exige escolta, como a rede, fica elegível como incidental em combate normal, onde ela já encontra criaturas. Nesta etapa, apenas humanoides entram no sorteio de escolta. A geração mantém a compatibilidade ecológica e a capacidade do mapa. Para armadilhas autônomas, a proposta é tentar escolta em 25% dos casos elegíveis. Se a escolta obrigatória não couber ou não houver candidato, sortear novamente entre armadilhas elegíveis, com preferência por uma autônoma como saída garantida. Se a escolta opcional falhar, a armadilha permanece sozinha.

O combate normal usa o mesmo filtro de ND e fonte, com os dois modos disponíveis porque já existe combate. Se o catálogo filtrado estiver vazio, a cena fica sem armadilha. A ordenação e a apresentação tática distinguem armadilha principal de incidental.

### Elite

Para um elite de alvo E, priorizar a criatura principal de ND E−1. Com auxiliares, a composição precisa fechar E por `calculateCombatND` e ter uma única criatura de maior ND individual. Por exemplo, para alvo 7, uma principal ND 6 com um auxiliar ND 5 fecha o grupo em ND 7. Com armadilha, a proposta é uma principal ND E−1 e uma armadilha autônoma ND 1. Esse cenário tem alvo 7 com criatura ND 6 e armadilha ND 1, cada uma com seu próprio XP. Proposta de sorteio: tentar a variante com armadilha em 10% dos elites.

O resolvedor tenta a outra variante quando a primeira não tem composição compatível. A saída final é uma criatura única de ND E, com compatibilidade ecológica e tática. Validar a cobertura dessas saídas por faixa e ambiente antes de ativar a versão. Se houver lacunas, usar a composição de elite de maior ND viável abaixo do alvo, mantendo a ecologia e o encaixe. Se nenhuma composição de elite for viável no nó, gerar um combate normal com o alvo do andar e apresentar esse tipo ao mestre.

### Cabeçalho e XP

Mostrar três parcelas com nome, ND e XP no cabeçalho do nó revelado. O modo de jogo continua mostrando os dados de descoberta e exploração. Exemplo para um combate normal do andar 15:

- Ambiente · ND ½ · 500 XP
- Criaturas · ND 3 · 3.000 XP
- Armadilha · ND 1 · 1.000 XP

A proposta mantém a conversão atual de 1.000 XP por ND e mostra zero nas parcelas ausentes. A parcela de ambiente soma terreno e clima, com os pesos vigentes. O mestre decide na mesa se ela se aplica. Cada parcela mostra apenas o valor de XP, no formato atual, ao lado do ND. O cabeçalho também dispensa o total automático de XP. O valor agregado usado pelo mapa e por outros consumidores soma ambiente, criaturas e armadilhas e segue os limites atuais do perfil, de ND ¼ a 8. Ele funciona como indicador do nó. Para cenas com ND próprio, preservar o cálculo específico da cena.

A parcela das criaturas usa o alvo antes da resolução e o ND do grupo encontrado depois. A parcela da armadilha usa a ficha selecionada. Em encontros fixos com mais de uma armadilha, soma as parcelas das fichas fixas. Se uma cena escrita tiver ND próprio e nenhuma dessas três fontes o representar, usar a indicação própria da cena, inclusive no falso descanso até a emboscada ser resolvida.

## Integração

- Ativar com a versão 5 da geração para novas expedições da floresta. Guardar a identificação da regra no próprio nó para reabertura, revelação e rerrolagem. Restaurar os mapas serializados com suas regras originais e preservar os caminhos usados por códigos antigos.
- Preservar `challenge.climate` e `challenge.terrain` para os consumidores existentes e registrar o ambiente agregado, o alvo das criaturas e o ND da armadilha. Centralizar a leitura das parcelas efetivas para o cabeçalho e aproveitar os itens resolvidos, inclusive os de guardiões e missões. Separar o alvo de composição do valor exibido após a resolução.
- Reutilizar as regras de ecologia e a checagem de encaixe da grade ao compor auxiliares e escoltas. Selecionar os componentes dependentes juntos quando a legalidade de um depender do outro. Derivar os sorteios da semente e manter a resolução reproduzível.
- Usar o orçamento de criaturas para aferir a capacidade dos nós destinados a missões de combate. A composição fixa da missão continua substituindo a composição procedural, e o cabeçalho acompanha o que a missão deixou no nó.
- Manter a rerrolagem de criaturas dentro da receita do nó e do orçamento original. A troca de uma armadilha mantém papel e ND. No elite e no nó de armadilha principal sem escolta, a troca só aceita armadilhas autônomas. Conferir o encaixe conjunto das criaturas e da nova armadilha no mapa antes de aceitar a troca. Quando faltar uma alternativa válida, conservar a composição e usar o feedback vigente.
- Deixar os pontos de entrada de encontro manual, exploração estendida e demais faixas sob as regras atuais. A versão nova também preserva os eventos de mapa, as missões e os mapas fixos.

## Verificação prevista

- Conferir em sementes fixas os cinco alvos normais e de elite, sem desconto do ND das criaturas no combate normal.
- Medir a frequência incidental em uma amostra ampla de nós normais procedurais, incluindo os revelados de um desconhecido. Excluir as substituições por missões da amostra.
- Conferir os 35 modos aprovados e cobrir o caso em que a única armadilha candidata exige escolta. Verificar que a escolta cabe no mapa e tem ND de grupo menor, inclusive nos alvos mais baixos.
- Exercitar as duas variantes de elite, a saída de criatura única e a rerrolagem de cada lado. Verificar a apresentação da composição real e a ausência de vazamento antes da descoberta.
- Reabrir uma expedição anterior à versão 5, restaurar uma expedição nova com rerrolagem salva e rodar o QA dos andares 11 a 20 com missões e guardiões.

## Contexto medido (27/11/2026)
- **ND fracionários:** vinham da armadilha incidental subtraída das criaturas, e não do clima.
- **Pesos de clima e terreno:** são regra da casa. O livro só diz que o ambiente "pode afetar".
- **Nos andares 11–14,** só cerca de 6% dos combates têm armadilha.
- **Criaturas melhoradas** (qualificador no nome): 0 em 4.632 encontros. O catálogo largo sempre acha um "zoológico". Isso fica para o trabalho 2: o ecossistema vira barreira, os aquáticos dependem de água no mapa, as famílias de animais são flexíveis, o limite é de 2 a 3 fichas e a melhoria acontece dentro da família.
