# Plano do Módulo de Missões

## Status deste documento

Este arquivo descreve o plano funcional e técnico do módulo de missões. Ele não representa uma implementação já existente.

O arquivo `gerador_missoes_praxis.txt` foi tratado como fonte de categorias, tabelas e exemplos. As decisões de produto descritas pelo usuário e a coerência com os perfis atuais do app têm prioridade sobre qualquer sugestão presente no TXT.

## Objetivo

Adicionar um módulo global de missões que:

- esteja disponível em qualquer perfil de andares;
- seja aberto por um botão ao lado do gerador manual de encontros;
- use uma modal com o título `Missões`;
- gere um quadro com sete ofertas coerentes com a faixa ativa;
- permita selecionar de zero a três dessas ofertas antes de iniciar a faixa;
- apresente, no mínimo, categoria, título, descrição e recompensa;
- descarte as ofertas não selecionadas quando a escolha for confirmada;
- faça as missões selecionadas influenciarem o conteúdo gerado pelo perfil;
- mantenha as missões selecionadas consultáveis e validáveis durante a exploração.

O módulo deve ser compartilhado, mas o conteúdo não pode ser apenas uma troca de nomes. Cada perfil precisa declarar alvos, locais, recompensas e integrações que realmente façam sentido para seu modo de jogo.

## Situação atual relevante

O app possui três modos com estruturas diferentes:

| Perfil | Modo | Contexto útil para missões |
|---|---|---|
| Andares 1 a 10 | `extended-exploration` | andar atual, criaturas permitidas por andar, tiers, anomalias, eventos e cenas táticas |
| Andares 11 a 20 | `node-map` | andar selecionado, ND por faixa, terreno, clima, criaturas, armadilhas e nodos ainda não explorados |
| Andares 21 a 30 | `archipelago` | ilhas geradas, tema de cada ilha, dificuldade, disponibilidade, objetivos e progresso dos fragmentos |

Todos os perfis expõem a lista de andares e recomendações, mas ainda não existe um contrato comum para missões. O código de sessão também não armazena missões atualmente.

O controlador do gerador manual já recebe o perfil ativo e serve como referência de integração para um controlador de modal independente.

## Escopo funcional recomendado

### Fluxo da primeira versão

A seleção de missões faz parte do carregamento da faixa:

1. O mestre escolhe a faixa de andares na configuração inicial.
2. O app define a seed e prepara o contexto necessário do perfil.
3. Antes de mostrar o mapa ou iniciar o andar, abre a etapa `Missões` com sete ofertas.
4. Cada oferta mostra categoria, título, descrição, andar ou destino, prova de conclusão e recompensa.
5. O mestre seleciona de zero a três ofertas.
6. O mestre confirma qualquer escolha entre zero e três missões.
7. As ofertas não selecionadas são descartadas.
8. O perfil é gerado ou ajustado usando somente as missões selecionadas.
9. Durante a exploração, o botão global `Missões` mostra apenas as selecionadas e seus estados.
10. Cenas, nodos e objetivos vinculados mostram que uma missão pode ser realizada ali.
11. O mestre decide quando a missão foi cumprida e a marca como concluída na modal `Missões`.

Confirmar zero missões mantém o app funcionando exatamente como funciona hoje.

Clicar em `Iniciar andar`, `Gerar mapa` ou `Gerar arquipélago` dentro da faixa carregada não limpa as missões selecionadas. Para obter um quadro novo, o mestre retorna à configuração inicial pelo botão existente e carrega novamente uma faixa.

Não é necessário persistir as ofertas descartadas. As missões selecionadas e seus vínculos com o conteúdo gerado devem ser persistidos.

### Materialização por modo

Uma missão selecionada deve influenciar o perfil de forma compatível com sua categoria e seu escopo:

- 1 a 10: influenciar ou substituir uma cena d100 ou um encontro final compatível do andar indicado;
- 11 a 20: influenciar ou substituir o conteúdo de um nodo compatível, preservando o grafo;
- 21 a 30: influenciar ou substituir um objetivo da ilha correspondente, preservando a progressão global.

Nem toda missão possui um único andar. Extermínio, coleta e teste ou desafio podem valer para toda a faixa, exigir progresso em vários andares ou marcar vários conteúdos compatíveis. Nesses casos, a missão pode ter múltiplos vínculos e não precisa substituir uma única cena.

O gerador só deve permitir confirmar um conjunto de missões que possa ser materializado. Sem um ponto compatível, a oferta deve ser rejeitada durante a geração ou a combinação deve ser impedida antes da confirmação.

### Decisão de fluxo atual

Para reduzir impacto sobre os mapas e encontros existentes, a primeira materialização prática deve ser contextual, não destrutiva:

- ao chegar no andar, nodo ou ilha vinculada, a tela mostra um botão `Realizar missão`;
- esse botão abre a missão selecionada como um encontro próprio, sem marcar conclusão automaticamente;
- o encontro de missão oferece um mapa tático opcional com grupo, inimigos quando a categoria envolver combate, pontos de interesse, zonas de risco e CD de referência;
- o mestre continua decidindo se a missão foi resolvida na modal `Missões`;
- uma versão futura ainda pode substituir ou alterar nodos, cenas finais e objetivos obrigatórios, mas isso deve ser feito por categoria e por perfil, quando houver regras suficientes para evitar conflito estrutural.

## Experiência da modal

### Acesso

- Adicionar um botão de ícone ao lado de `manualEncounterButton`.
- Usar `aria-label="Ver missões selecionadas"` e tooltip `Missões`.
- Manter o botão disponível nos três modos.
- Agrupar visualmente os botões flutuantes para que não dependam de posições absolutas individuais conforme novas ferramentas forem adicionadas.
- Usar a etapa inicial para escolher missões; o botão flutuante não gera nem troca ofertas durante uma faixa carregada.

### Conteúdo

A etapa inicial de seleção deve ter:

- cabeçalho `Missões`;
- identificação da faixa ativa;
- seção `Quadro de missões`, com sete ofertas;
- contador `0/3`, `1/3`, `2/3` ou `3/3`;
- um único comando de confirmação, habilitado também com zero selecionadas;
- texto `Continuar sem missões` quando o contador estiver em `0/3`;
- texto `Confirmar 1 missão`, `Confirmar 2 missões` ou `Confirmar 3 missões` nos demais estados.

A modal aberta pelo botão flutuante deve ter:

- somente as missões selecionadas;
- estado e destino de cada missão;
- ação manual `Marcar como concluída` em cada missão pendente;
- estado vazio `Nenhuma missão selecionada` quando a faixa tiver sido iniciada sem missões.

Cada missão deve exibir:

- categoria;
- título;
- destino, andar ou faixa;
- texto completo da missão;
- complicação, quando houver;
- prova de conclusão;
- recompensa;
- controle de seleção na etapa inicial;
- estado `Pendente` ou `Concluída` durante a exploração.

Cenas, nodos e objetivos vinculados devem mostrar um indicador de missão, com acesso ao título relacionado. Esse indicador informa onde a missão pode avançar, mas nunca a conclui automaticamente.

Para leitura em tablet, a descrição e a recompensa devem permanecer visíveis sem abrir uma segunda modal. Detalhes técnicos de geração e rolagens não devem aparecer na interface normal.

## Categorias

A primeira versão deve usar o conjunto mais completo do TXT:

- Extermínio;
- Coleta;
- Exploração;
- Recuperação;
- Investigação;
- Resgate;
- Escolta;
- Caçada especial;
- Teste ou desafio;
- Anômala.

Os pesos podem partir da tabela avançada, mas cada perfil deve poder remover uma categoria ou alterar seu peso. O gerador deve evitar categorias repetidas no mesmo conjunto quando existirem pelo menos três categorias válidas.

Não é necessário oferecer na UI uma escolha entre gerador básico e avançado no MVP. A geração pode usar internamente as tabelas avançadas e recorrer a modelos mais simples quando um perfil ainda tiver pouco conteúdo curado.

## Contexto de geração

O gerador não deve receber apenas o perfil. Ele deve receber um contexto normalizado:

```js
{
  profileId,
  mode,
  profileFloors,
  missionFloors,
  currentSeed,
  worldDraft
}
```

`missionFloors` contém todos os andares da faixa que podem receber missões, independentemente do andar atual. Em todos os perfis, andares múltiplos de 10 são reservados ao chefe e ficam fora dessa lista.

`worldDraft` é opcional e contém somente dados preparados antes da seleção que ajudem a produzir ofertas coerentes. No arquipélago, por exemplo, pode conter os temas de ilha sorteados pela seed. Depois da confirmação, as missões selecionadas são materializadas no rascunho antes da primeira renderização.

## Contrato por perfil

Cada perfil deve receber uma seção `missionRules`, seguindo o padrão já usado por `creatureRules`, `trapRules` e `challengeRules`:

```js
missionRules: {
  enabled: true,
  offerCount: 7,
  missionFloors,
  allowedScopeKinds: [],
  allowedCategories: [],
  categoryWeights: {},
  targetPools: {},
  locationPools: {},
  issuerWeights: {},
  rewardBands: [],
  rewardChallengeByFloor: {},
  proofTypes: [],
  complications: [],
  materializationCapabilities: []
}
```

Responsabilidades:

- as tabelas globais definem a estrutura de uma categoria;
- `missionRules` fornece o vocabulário e as restrições do perfil;
- o adaptador do modo informa quais pontos do conteúdo podem ser influenciados ou substituídos;
- o validador rejeita combinações impossíveis antes de produzir o texto final.

Dados de conteúdo devem permanecer declarativos sempre que possível. Regras de integração com estados ficam em adaptadores próprios, sem colocar lógica de UI nos arquivos de perfil.

## Modelo de dados

```js
{
  id,
  seed,
  profileId,
  status: "offered" | "selected" | "materialized" | "completed",
  category,
  issuer,
  title,
  description,
  destination: {
    kind: "floor" | "node" | "island" | "range" | "profile",
    floorMin,
    floorMax,
    floor,
    targetId,
    label
  },
  objective: {
    kind,
    targetType,
    targetId,
    targetName,
    quantity,
    condition,
    progressMode: "single" | "aggregate" | "manual"
  },
  complication,
  difficulty,
  proofType,
  reward: {
    basis,
    challenge,
    multiplier,
    unitValue,
    quantityFactor,
    turnInValue,
    completionBonus,
    totalPayout,
    bonus,
    text
  },
  integration: {
    capability,
    eventType,
    eventPayload,
    bindings: [],
    state: "pending" | "materialized" | "resolved"
  }
}
```

`title` e `description` são saídas prontas para leitura. Os campos estruturados continuam sendo a fonte de verdade para persistência, validação e materialização no perfil.

## Pipeline de geração

1. Ler o perfil, a seed e o rascunho do mundo quando houver.
2. Obter as categorias válidas e os pontos de materialização disponíveis.
3. Sortear sete ofertas, variando categorias, valores e tipos de tarefa.
4. Sortear um escopo: andar, conjunto de andares ou toda a faixa.
5. Montar alvo, condição, escala, origem, complicação e prova compatíveis com a categoria.
6. Resolver dificuldade e recompensa com a banda do perfil.
7. Gerar título e descrição a partir dos dados estruturados.
8. Validar a missão completa.
9. Rerrolar somente a parte incompatível, com limite de tentativas.
10. Mostrar o quadro e permitir a seleção de zero a três ofertas.
11. Validar a combinação selecionada, inclusive conflitos pelo mesmo ponto de materialização.
12. Descartar as demais ofertas ao confirmar.
13. Materializar as selecionadas antes da primeira renderização do perfil.

A geração deve usar um RNG com seed. As ofertas descartadas não precisam ser reproduzidas por uma sessão salva, mas as missões selecionadas devem ser armazenadas por completo; salvar apenas a seed não é suficiente.

## Regras de coerência

O validador deve garantir que:

- a categoria aceita o tipo de alvo e a condição;
- destinos específicos pertencem aos andares permitidos da faixa;
- uma criatura nomeada existe e é adequada ao andar ou ND;
- quantidades fazem sentido para o alvo;
- recuperação usa um objeto, resgate usa uma pessoa ou grupo e exploração usa um local ou fenômeno;
- a prova de conclusão pode ser obtida na própria missão;
- a recompensa tem uma base definida pelo perfil;
- existe ao menos um ponto ou regra de geração compatível para materializar a missão selecionada;
- a combinação de até três missões não disputa o mesmo ponto estrutural sem uma regra de composição;
- substituições preservam conectividade, quantidade de objetivos e condições de progressão do modo;
- missões agregadas podem possuir vários vínculos sem exigir contagem automática;
- chefes exclusivamente reservados não são substituídos;
- o texto final não contém placeholders, IDs internos ou contradições.

Missões anômalas podem quebrar a coerência narrativa, mas não podem quebrar invariantes do app ou pedir uma ação impossível de registrar.

## Adaptação por perfil

### Andares 1 a 10

Este será o pacote inicial mais completo, pois o TXT e os dados atuais já favorecem esse ambiente.

- Usar `allowedCreatureIdsByFloor` para extermínio e caçada.
- Usar tiers, anomalias, eventos, armadilhas e tesouros existentes para alvos e dificuldade.
- Permitir qualquer destino entre os andares 1 e 9, independentemente do andar atual.
- Excluir o andar 10, pois ele é reservado à Matriarca e não funciona como andar explorável.
- Usar cristais, partes de criaturas, objetos, registros e pulseira como provas quando forem coerentes.
- Reservar antecipadamente um gatilho no andar da missão.
- Permitir que a missão influencie ou substitua uma cena d100 ou o encontro final daquele andar, conforme a categoria.
- Garantir que a missão continue aparecendo mesmo se nenhuma falha aleatória produzir naturalmente a categoria esperada.
- Para missões de faixa, favorecer ou marcar encontros compatíveis ao longo dos andares 1 a 9.
- Mostrar o indicador de missão na cena, deixando a conclusão para o mestre.

### Andares 11 a 20

O texto precisa assumir floresta, pântano, regiões aquáticas, colinas e planícies, em vez de corredores fechados como padrão.

- Permitir destinos em toda a faixa de andares autorizada para missões e usar as bandas de ND do perfil.
- Derivar alvos de criatura por tipo, ND e terreno, evitando nomes que não possam ser resolvidos pelo catálogo.
- Incluir coleta de flora, fungos, minerais, venenos e amostras de fenômenos climáticos.
- Adaptar exploração para trilhas, clareiras, ruínas, cursos d'água, acampamentos e rotas.
- Durante a geração do mapa, vincular a missão a um nodo que tenha tipo, ND e ambiente compatíveis.
- A missão pode substituir o conteúdo do nodo, mas não suas conexões nem sua posição no grafo.
- Missões agregadas podem marcar vários nodos compatíveis sem alterar a rota.
- Mostrar o indicador de missão nos nodos vinculados, deixando a conclusão para o mestre.
- Acampamentos e o andar 20 continuam protegidos.

### Andares 21 a 30

As missões devem usar as ilhas realmente geradas na sessão, não uma lista genérica de corredores da dungeon.

- Preparar os temas de ilha pela seed antes do quadro e permitir destinos nas ilhas autorizadas da faixa.
- Usar `themeId`, narrativa, dificuldade e objetivo sorteados para montar o texto.
- Favorecer exploração, recuperação, investigação, resgate, escolta e coleta.
- Evitar caçadas com criatura nomeada enquanto o perfil não tiver um catálogo de criaturas por ilha.
- Adaptar provas para mapas náuticos, registros, amostras, objetos recuperados e confirmação da pulseira.
- Substituir um objetivo compatível da ilha sem alterar a quantidade total de objetivos exigidos.
- Um objetivo materializado continua contando normalmente para a conclusão da ilha.
- Mostrar o indicador de missão no objetivo, deixando a conclusão para o mestre.
- O andar 30 permanece reservado ao Rei Tirano e fora dos destinos de missão.

## Recompensas

O valor da missão deve partir do valor econômico dos itens que o grupo precisa entregar, especialmente cristais de criaturas. Completar a missão e entregar a prova sempre deve pagar mais do que simplesmente vender esses itens.

### Valores de cristais fornecidos

| ND | Valor em T$ |
|---:|---:|
| 1/4 | 5 |
| 1/2 | 10 |
| 1 | 20 |
| 2 | 40 |
| 3 | 75 |
| 4 | 120 |
| 5 | 200 |
| 6 | 300 |
| 7 | 450 |
| 8 | 650 |
| 9 | 900 |
| 10 | 1.200 |

A busca atual no repositório não localizou essa tabela em um arquivo de dados. Na implementação, ela deve ser criada ou conectada a uma fonte econômica já existente, sem manter cópias divergentes dentro do gerador de missões.

### Base econômica

```text
valorDeEntrega = soma dos cristais + materiais + objetos exigidos
valorUnitário = valor do cristal do ND representativo da missão
fatorDeQuantidade = max(1, log2(quantidade + 1) / 2)
bônusDeMissão = valorUnitário x fatorDeQuantidade x multiplicador de dificuldade
pagamentoTotal = valorDeEntrega + bônusDeMissão + benefício especial
```

Essa curva usa o valor integral das entregas em `valorDeEntrega`, mas aplica o multiplicador apenas a uma base unitária com crescimento logarítmico. A quantidade aumenta a recompensa com retorno decrescente, evitando que missões contra muitos inimigos cresçam linear ou exponencialmente.

Os multiplicadores `0,75`, `1`, `1,25`, `1,5` e `2` do TXT continuam sendo multiplicadores do bônus. O pagamento total permanece superior à venda direta porque devolve o valor econômico das entregas e acrescenta o bônus calculado.

Exemplo de referência para validar a curva:

```text
Missão: eliminar 3 glops ND 1/4 e entregar os cristais
Venda direta: 3 x 5 = 15
Valor unitário do ND 1/4: 5
Fator de quantidade: max(1, log2(3 + 1) / 2) = 1
Multiplicador padrão: 1
Bônus de missão: 5 x 1 x 1 = 5
Pagamento total: 15 + 5 = 20

Com multiplicador 2:
Bônus de missão: 5 x 1 x 2 = 10
Pagamento total: 15 + 10 = 25
```

Para missões sem item vendável, cada perfil deve declarar `rewardChallengeByFloor`. O andar ou a faixa da tarefa determina um ND representativo, e o valor do cristal desse ND funciona como `valorUnitário`. Categoria, complicação e dificuldade alteram o multiplicador; a quantidade ou escala continua usando a curva logarítmica.

Quando a missão possui um alvo concreto, o ND do alvo prevalece. Quando envolve vários alvos diferentes ou uma tarefa abstrata, o gerador usa o ND representativo definido pelo perfil para o andar ou faixa.

Materiais e objetos com preço próprio entram pelo valor concreto apenas quando precisam ser entregues. Itens que o grupo pode conservar não devem ser descontados nem somados ao pagamento.

O modelo deve registrar o cálculo:

```js
reward: {
  basis: "turn-in-value",
  challenge: 0.25,
  multiplier: 1,
  unitValue: 5,
  quantityFactor: 1,
  turnInValue: 15,
  completionBonus: 5,
  totalPayout: 20,
  bonus: null,
  text: "T$ 20 pela conclusão e entrega dos três cristais."
}
```

O pagamento deve ser arredondado para T$ inteiro após o cálculo do bônus. A curva e os valores de `rewardChallengeByFloor` devem ser validados por amostragem antes de fechar o balanceamento.

## Materialização no perfil

A integração deve seguir um ciclo explícito:

```text
oferecida -> selecionada -> materializada -> concluída
```

Uma missão selecionada precisa ter materialização garantida antes do perfil ser mostrado. Se uma combinação não puder ser aplicada sem violar o modo, o app deve impedir sua confirmação e explicar o conflito.

Cada adaptador de modo deve expor operações equivalentes a:

```js
prepareMissionContext()
canMaterializeMission(mission)
materializeMissions(missions, worldDraft)
markMissionCompleted(missionId)
```

O gerador cria missões; os adaptadores sabem como cada mundo pode realizá-las. Essa separação evita dependências diretas entre `missionGenerator.js` e os três estados de exploração.

Os adaptadores também aplicam indicadores aos vínculos, mas não concluem missões. Somente `markMissionCompleted`, acionado pelo mestre na modal, altera o estado final.

## Persistência

Adicionar ao estado de sessão:

```js
missions: {
  profileId,
  selectionLocked,
  selected: [],
  history: []
}
```

O campo deve ser opcional na restauração para manter compatibilidade com códigos `MD1` antigos.

As ofertas não selecionadas não precisam entrar no código de sessão. As selecionadas precisam guardar texto, recompensa, estado e referência ao conteúdo substituído ou influenciado.

Retornar à configuração inicial encerra o conjunto atual e permite gerar outro quadro. Reiniciar um andar ou regenerar o conteúdo dentro da faixa carregada preserva as missões selecionadas e deve reaplicar seus vínculos de modo determinístico.

## Organização de arquivos proposta

```text
src/
├── economy/
│   └── crystalValues.js
├── missions/
│   ├── missionTables.js
│   ├── missionGenerator.js
│   ├── missionValidator.js
│   ├── missionState.js
│   ├── missionDialog.js
│   └── missionProfileAdapters.js
├── floorProfiles/
│   ├── dungeon1to10.js
│   ├── forest11to20.js
│   └── archipelago21to30.js
├── main.js
└── styles.css
index.html
```

Não é necessário criar um arquivo por categoria no início. A divisão deve ocorrer apenas se as tabelas e os modelos crescerem a ponto de prejudicar leitura e teste.

## Etapas de implementação

### Etapa 1 — Fundação compartilhada

- Transcrever as tabelas globais do TXT para dados estruturados.
- Registrar a tabela de valor dos cristais em uma única fonte econômica.
- Implementar modelo, RNG, geração e validação.
- Adicionar `missionRules` mínimos aos três perfis.
- Criar estado de seleção, missões ativas e histórico.
- Incluir missões na sessão com restauração retrocompatível.

### Etapa 2 — Interface

- Inserir a seleção de missões entre a escolha da faixa e o carregamento do perfil.
- Criar botão ao lado do gerador manual para consultar as selecionadas.
- Criar a modal `Missões` nos estados de seleção e consulta.
- Implementar seleção de zero a três, confirmação e validação.
- Revisar comportamento em tablet e telas pequenas.

### Etapa 3 — Conteúdo por perfil

- Completar primeiro o pacote 1 a 10.
- Criar vocabulário de floresta e ambiente aberto para 11 a 20.
- Criar modelos orientados pelos temas reais das ilhas para 21 a 30.
- Adicionar testes de amostragem para evitar textos repetitivos ou incompatíveis.

### Etapa 4 — Materialização

- Implementar influência ou substituição de cenas em 1 a 10.
- Implementar substituição segura de conteúdo de nodos em 11 a 20.
- Implementar substituição de objetivos de ilha em 21 a 30.
- Persistir os vínculos e resoluções.

## Testes e critérios de aceite

### Testes automáticos

- Cobertura integral das faixas d100/d20/d12/d10 transcritas.
- Geração determinística para a mesma seed e contexto.
- Sete ofertas válidas por quadro e no máximo três selecionadas.
- Nenhum destino fora dos andares permitidos da faixa.
- Nenhuma criatura fora das restrições do andar quando houver whitelist.
- Nenhuma categoria com alvo ou condição incompatível.
- Nenhuma recompensa sem base resolvida.
- Pagamento total sempre superior ao valor de venda dos itens entregues.
- Toda missão selecionada possui ao menos um vínculo ou regra agregada de materialização.
- Missões com múltiplos vínculos não criam substituições conflitantes.
- Substituições preservam os invariantes de cada modo.
- Resolver conteúdo vinculado não conclui automaticamente a missão.
- Persistência e restauração das selecionadas, estados e vínculos.
- Compatibilidade com sessões antigas sem o campo `missions`.
- Testes de propriedade com milhares de gerações para cada perfil.

### Verificação de interface

- Botão disponível e sem sobreposição nos três modos.
- Modal utilizável por teclado e fechável pelo botão, `Esc` e clique no backdrop.
- Textos longos sem estourar cards ou botões.
- Fluxo confortável em tablet e celular.
- Contador de seleção nunca ultrapassa três.
- Confirmar zero mantém o comportamento atual do perfil.
- Ofertas não selecionadas só somem após confirmação.
- Cenas, nodos e objetivos vinculados exibem indicador de missão.
- Somente a ação do mestre na modal marca uma missão como concluída.

### Critério mínimo para o MVP

O MVP está pronto quando, ao carregar qualquer faixa, o mestre recebe sete ofertas variadas, seleciona de zero a três missões, inicia o perfil com essas missões materializadas, identifica seus vínculos nas cenas, nodos ou objetivos, consulta e conclui as missões manualmente pelo botão global e recupera tudo por um código de sessão. Sem missões selecionadas, o perfil deve permanecer funcionalmente idêntico ao atual.

## Decisões fechadas

1. **Alcance:** usar qualquer andar permitido da faixa ativa, não apenas destinos atualmente alcançáveis.
2. **Chefes:** em todos os perfis, andares múltiplos de 10 são reservados ao chefe e excluídos dos destinos de missão.
3. **Economia:** os valores de cristal são expressos em T$. O pagamento devolve o valor concreto das entregas e acrescenta um bônus com multiplicador de dificuldade.
4. **Escala econômica:** quantidades usam crescimento logarítmico, baseado no valor unitário do ND representativo, para evitar crescimento linear ou exponencial.
5. **ND de recompensa:** alvos concretos usam seu ND; tarefas abstratas usam um ND relacionado ao andar ou faixa, declarado pelo perfil.
6. **Quadro:** gerar sete ofertas variadas e permitir selecionar de zero a três. Ao confirmar, as não selecionadas são perdidas.
7. **Confirmação:** o mesmo comando confirma qualquer quantidade entre zero e três; com zero, funciona como `Continuar sem missões`.
8. **Renovação:** gerar o quadro ao carregar uma faixa. `Iniciar andar` e ações equivalentes não renovam as ofertas nem limpam as selecionadas. Um quadro novo exige retorno à configuração inicial.
9. **Materialização:** missões selecionadas podem influenciar ou substituir cenas, encontros finais, conteúdo de nodos e objetivos, conforme o perfil. Selecionar zero mantém o comportamento atual.
10. **Escopo:** uma missão pode indicar um andar, vários andares ou toda a faixa. Mais de uma missão pode usar o mesmo andar quando não houver conflito estrutural.
11. **Conclusão:** conteúdos vinculados exibem um indicador de missão, mas somente o mestre marca a missão como concluída pela modal.
12. **Botão global:** a seleção ocorre durante o carregamento da faixa; depois disso, o botão ao lado do gerador manual serve para consultar e concluir as missões selecionadas.

## Pontos a validar na implementação

- Definir `rewardChallengeByFloor` de cada perfil usando as bandas de ND já existentes como base.
- Amostrar recompensas de várias quantidades e NDs para ajustar a curva logarítmica sem quebrar o exemplo dos três glops.
- Definir como cada categoria de missão agrega vários vínculos sem transformar o app em contador automático de progresso.
