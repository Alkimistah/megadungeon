# Harmonia dos animais da floresta

Segundo dos quatro trabalhos da floresta (andares 11–20). A ordem aprovada é estrutura do nó (concluída e publicada), harmonia dos animais, cenas de tesouro e outros tipos de criatura.

## Intenção

Trazer para o jogo a exploração dos ermos do Livro Básico. Os animais que os jogadores enfrentam num nó precisam fazer sentido juntos e com o lugar, como parte de um ecossistema. O sucesso é o jogador pensar "faz sentido estarmos lutando contra isso aqui".

Hoje a floresta parece um zoológico. Numa amostra de 1.156 combates normais e de elite (8 expedições), saíram misturas como "Naja + Urso Panda" e "Sapo Atroz + Sílfide Travessa". Também apareceram 131 combates com criatura só aquática, parte deles fora da água. Nenhuma versão melhorada apareceu, porque o catálogo largo sempre acha uma ficha que fecha o ND sozinha.

A floresta é explorada nó a nó e o tema de cada trecho é fluido. Num mesmo andar, o grupo pode passar por floresta, pântano, colinas e floresta de novo.

## Referências do livro

- Livro Básico, pp. 268–270 (PDF 274–276), "Ermos". Lista os terrenos com suas regras (colinas, desertos, florestas, montanhas, pântanos, planícies, árticos e aquáticos), além de perigos ambientais, covil, ruína, santuário e viagens. Não traz tabela de encontros por terreno. O ecossistema é regra da casa inspirada nesse capítulo.
- Criação e Modificação de Ameaças, pp. 11–12, "Modificando criaturas". É a base da versão melhorada que o app já gera em `createEliteVariant` (`src/encounterResolver.js`), com os adjetivos de animal "Enfurecido", "Raivoso" e "Feroz".

## Objetivos

1. **O terreno é barreira para animais.** Num combate procedural da floresta, um animal só entra se pertencer a uma comunidade do terreno do nó. Isso substitui o peso de terreno atual, que só torna o animal mais ou menos provável.
2. **Comunidades por terreno.** Para cada terreno da floresta (Floresta, Pântano, Aquático, Colinas e Planície aberta), há comunidades escritas à mão. Cada comunidade é uma lista de famílias de animais que dividem aquele terreno e caçam juntas ou se toleram. Exemplo do PO: crocodilianos e sanguessugas gigantes no pântano.
3. **De 1 a 3 fichas, conforme o sentido.** Um combate de animais pode ter uma ficha só. Mais fichas entram apenas quando a comunidade sorteada justifica, até no máximo três fichas diferentes. Três é limite, não alvo.
4. **Melhoria dentro da família.** Quando as fichas da comunidade não fecham o ND do nó, o gerador usa a versão melhorada (`createEliteVariant`) de uma ficha da mesma família, em vez de buscar outra família.
5. **Aquáticos dependem de água.** Animais só aquáticos aparecem apenas em comunidades de terrenos com água (Aquático e, quando a comunidade disser, Pântano).
6. **Variedade entre os nós.** Cada nó sorteia sua comunidade livremente. Nada amarra o que apareceu num nó ao que aparece no próximo.

## Fora do escopo

- Monstros, espíritos, mortos-vivos, construtos e humanoides. Ficam para o trabalho 4, e a seleção deles continua como hoje.
- A escolta humanoide dos nós de armadilha, que continua como está.
- Cenas de tesouro (trabalho 3).
- Arquipélago, andares 1–10, guardiões, mapas fixos, cenas escritas, missões com composição fixa e encontro manual.
- Mudar os alvos de ND, as regras de elite e armadilha da versão 5 e o cálculo `calculateCombatND`.

## Não deve acontecer

- **Zoológico:** animais de famílias que não convivem no mesmo combate.
- **Animal fora do lugar:** animal fora do terreno, ou aquático sem água.
- **Elenco por andar:** o PO recusou explicitamente, porque repetiria a mesma família em todos os terrenos.
- **Encontros fixos:** as comunidades são listas de onde se sorteia, nunca grupos prontos (memória do projeto: variedade sem encontros fixos).
- **Terreno sem animais:** pântano e colinas não podem ficar praticamente sem combates de animais por falta de ficha.

## Restrições

- **Versão de geração:** a regra vale para novas expedições da floresta, sob uma nova versão de geração. Expedições salvas mantêm a geração e os encontros já resolvidos.
- **Determinismo:** o mesmo resultado para a mesma semente, inclusive na rerrolagem.
- **Rerrolagem de inimigos:** respeita a comunidade do nó. A troca sai da mesma comunidade e mantém o orçamento.
- **Elite com animal principal:** a coesão dos auxiliares passa a ser a comunidade, e não só o tipo. Elites cujo principal não é animal seguem a regra atual.
- **Mapa tático:** o grupo continua tendo de caber no mapa.

## Situação dos dados (27–28/11)

| Terreno | Animais com a etiqueta |
|---|---|
| Floresta | 14 |
| Planície | 9 |
| Aquático | 21 |
| Colinas | 3 |
| Pântano | 2 |
| Sem terreno | 31 |

São 87 animais no catálogo da floresta. Com os dados de hoje, a barreira esvaziaria o pântano e as colinas. Por isso o trabalho começa pela revisão de dados.

## Abordagens consideradas

| Abordagem | Troca | Decisão |
|---|---|---|
| A. Fauna do terreno do nó, com sorteio livre por nó | Cada combate faz sentido; variedade entre nós | Escolhida pelo PO |
| B. Elenco de moradores por andar | Reconhecimento da fauna, mas repete famílias em todos os terrenos | Recusada pelo PO |
| 1. Comunidades por terreno escritas à mão | Sentido explícito e revisável; custo de manter as listas | Escolhida pelo PO |
| 2. Afinidades entre pares de famílias | Mais combinações, mas revisão em tabela e trios estranhos | Descartada |
| 3. Papéis automáticos (predador, presa, carniceiro) | Sem escrita, mas não garante o sentido | Descartada |

## Como foi decidido

### Etapa de dados, revisada pelo PO

- **Família:** cada um dos 87 animais ganha uma família ecológica, como canídeos, felinos, ursídeos, aracnídeos, insetos, répteis, crocodilianos, anfíbios, aves de rapina, peixes e cetáceos, e grandes herbívoros. A lista final sai da revisão. Essa família é diferente de `variantOf`, que agrupa versões de uma mesma ficha.
- **Terrenos:** cada animal tem suas etiquetas de terreno revistas. Um animal pode viver em mais de um terreno.
- **Comunidades:** o gerente propõe as comunidades de cada terreno da floresta. Cada uma tem um nome curto, as famílias que convivem e um peso.
- **Forma da revisão:** o PO revisa tudo em páginas de cartões por terreno, com decisões por regra, sem planilha longa (memória do projeto: revisão visual, não CSV). As prévias ficam em `tmp/previas/harmonia-animais/`.

### Gerador

- **Comunidade:** quando o tipo sorteado do nó é animal, o gerador sorteia uma comunidade do terreno do nó, pelos pesos.
- **Fichas:** monta de 1 a 3 fichas diferentes, só de famílias da comunidade, fechando o alvo do nó por `calculateCombatND`. Os tamanhos de grupo da ecologia (`solitaria`, `dupla`, `bando`, `horda`) continuam valendo para a quantidade de cada ficha.
- **Melhoria:** se nenhuma composição da comunidade fechar o alvo, tenta a versão melhorada de uma ficha da comunidade.

### Decisões do gerente após a leitura do construtor

- **Quem pode entrar.** O animal entra quando a família dele está na comunidade sorteada e ele tem a etiqueta do terreno do nó. Os 87 animais passam pela revisão. O animal que sair dela sem terreno da floresta fica fora dos combates procedurais da floresta.
- **Terreno do nó.** Cada nó já tem um único terreno (`node.environment.terrain.name`). Aquático é um terreno próprio. O tipo do nó é sorteado antes, pela regra atual. A comunidade só entra quando o tipo é animal, e os outros tipos mantêm os pesos de hoje.
- **Versão de geração.** A nova versão (6) herda tudo da versão 5. As checagens `=== 5` passam a `>= 5`, e o comportamento novo fica atrás de `>= 6`. Expedições v5 continuam com a seleção antiga de animais.
- **Quantas fichas.** Cada comunidade tem um máximo de fichas, de 1 a 3, decidido pelo PO na revisão dos cartões. O gerador pode usar um subconjunto das famílias da comunidade. A ordem de tentativa é:
  1. uma ficha;
  2. mais fichas até o máximo da comunidade, com sorteio que favorece grupos menores;
  3. outra comunidade do mesmo terreno;
  4. versão melhorada.
- **Versão melhorada.** Conta como uma das fichas e segue os tamanhos de grupo da ecologia. No elite da versão 5, a principal também pode ser uma versão melhorada de um animal da comunidade, e os auxiliares saem da mesma comunidade.
- **Rerrolagem sem alternativa.** Mantém o encontro atual e mostra a mensagem de falha vigente.
- **Saída para outro tipo.** Acontece no resolvedor, só na escolha das criaturas, e é determinística. O resto do nó (armadilha, escolta, tesouro e cabeçalho) não muda.
- **Ordem do trabalho.** A etapa de dados vem primeiro e só termina com a aprovação do PO nos cartões. As tarefas do gerador usam dados de teste e só são ativadas depois que os dados aprovados entram.

## Para o construtor

- **Formato dos dados:** onde guardar família e comunidades (perto de `src/creatureCatalog/ecology.js` ou no perfil da floresta) e o formato exato. Sugestão do gerente: a família como campo da ecologia da criatura e as comunidades no perfil `forest11to20`.
- **Quantidade de comunidades:** sugestão do gerente, de 3 a 6 por terreno, a confirmar na revisão.
- **Quando a comunidade não fecha o ND:** decisão do gerente, a confirmar na revisão do PO. Primeiro tenta outra comunidade do mesmo terreno, depois a versão melhorada. Se nada fechar, o nó deixa de ser de animal e sorteia outro tipo pela regra atual, sem misturar animal fora de comunidade.
- **Verificação em amostra fixa:**
  - nenhum combate de animais com família fora da comunidade sorteada;
  - nenhum animal fora do terreno;
  - versões melhoradas aparecendo;
  - distribuição de 1, 2 e 3 fichas;
  - proporção de combates de animais por terreno, sem pântano ou colinas zerados;
  - expedições salvas antes da mudança preservadas.
