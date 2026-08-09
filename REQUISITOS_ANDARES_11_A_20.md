# Requisitos — Andares 11 a 20

Documento de análise para manter e evoluir os andares 11 a 20 da Masmorra de Práxis no app Mega Dungeon.

## Contexto

Os andares 11 a 20 representam uma etapa maior e mais aberta que os andares 1 a 10. A visualização principal deve continuar sendo o mapa em nodos, porque essa faixa funciona melhor como uma região ampla com rotas, bifurcações, escolhas de caminho, salas descobertas e progressão por nós.

Essa lógica é diferente da exploração estendida dos andares 1 a 10. Nos andares 1 a 10, o labirinto é abstrato e o progresso acontece por sucessos/falhas dentro de cada andar. Nos andares 11 a 20, o mapa gerado já é a representação jogável da exploração: o grupo escolhe rotas, abre nodos, resolve encontros e avança pela estrutura da região.

O perfil atual desses andares é `forest11to20`, com tema de floresta, pântano, áreas aquáticas, colinas e clareiras. O perfil cobre os andares 11 a 20 e usa o modo `node-map`.

## Objetivo

Preservar o modelo de exploração em nodos dos andares 11 a 20, garantindo que ele continue oferecendo uma experiência clara de navegação, descoberta e resolução de encontros, com ND, clima, terreno, criaturas, armadilhas, tesouros, acampamentos e boss final integrados aos sistemas existentes.

Como melhoria possível, adicionar mapas táticos aos encontros abertos por nodos, sem substituir o mapa em grafo como representação principal da faixa.

## Princípios de Design

- A unidade principal da exploração é o nodo do mapa.
- O mapa em grafo representa uma região maior, não uma sala tática.
- O grupo deve escolher rotas e lidar com consequências de caminhos ramificados.
- O mestre deve manter controle sobre a resolução das cenas.
- O app deve apresentar ND, teste, clima, terreno, criatura, armadilha e recompensa de forma consultável.
- Clima e terreno fazem parte da identidade dos andares 11 a 20 e podem alterar o ND total.
- Acampamentos são pontos de respiro dentro da rota e devem permanecer integrados à progressão.
- O modo de nodos deve coexistir com a exploração estendida dos andares 1 a 10.
- Mapas táticos, quando adicionados, devem representar apenas a cena do nodo aberto, não substituir a estrutura global de exploração.

## Fluxo Geral

### 1. Início da Faixa

Ao selecionar a faixa "Andares de 11 a 20", o app deve carregar:

- perfil `forest11to20`;
- modo `node-map`;
- andar inicial escolhido;
- profundidade do mapa;
- CD base sugerida para o andar;
- seed do mapa;
- opção de caminhos desconhecidos;
- tema visual do perfil;
- regras de sala, ND, clima, terreno, criaturas e armadilhas.

Recomendações atuais por andar:

| Andar | Encontros sugeridos | CD base |
|---|---:|---:|
| 11 | 3 | 15 |
| 12 | 4 | 15 |
| 13 | 4 | 20 |
| 14 | 5 | 20 |
| 15 | 5 | 20 |
| 16 | 6 | 25 |
| 17 | 6 | 25 |
| 18 | 7 | 25 |
| 19 | 8 | 30 |
| 20 | 8 | 30 |

### 2. Geração do Mapa

O app deve gerar um grafo dirigido acíclico com layout em "taça":

- níveis iniciais e finais com menos nodos;
- níveis centrais com mais nodos;
- conexões entre níveis adjacentes;
- garantia de que todo nodo do próximo nível seja alcançável;
- chance de conexão secundária para criar escolhas reais;
- nodos com 3 ou mais entradas podem virar caminhos desconhecidos;
- acampamentos podem aparecer em níveis divisíveis por 4;
- ao menos um tesouro deve existir no mapa quando possível;
- no andar 20, o último nível deve conter o boss final quando a regra do perfil permitir.

Tipos de sala atuais:

| Tipo | Peso | Função |
|---|---:|---|
| Encontro normal | 62 | Cena padrão de criatura, risco ou combate |
| Encontro elite | 11 | Cena mais perigosa, com CD e ND maiores |
| Armadilha | 16 | Cena focada em perigo ou mecanismo |
| Desconhecido | 5 | Nodo revelado depois de escolhido |
| Tesouro | 6 | Recompensa, achado ou sala de valor |

### 3. Escolha de Rota

O usuário deve poder clicar em nodos ativos para abrir a modal da sala.

O app deve:

- destacar nodos disponíveis;
- ocultar ou reduzir informação de nodos bloqueados conforme o modo de caminhos desconhecidos;
- permitir escolher uma rota ativa;
- marcar o nodo como escolhido;
- desbloquear os próximos nodos conectados;
- registrar tempo de exploração;
- resolver dados mecânicos do encontro quando a rota for escolhida.

O usuário deve poder marcar um nodo como:

- tentado;
- explorado;
- descansado, quando for acampamento.

### 4. Teste de Descoberta

Nodos com teste devem exibir:

- perícia;
- CD;
- tempo de exploração;
- ND total;
- tipo de sala.

Nodos sem teste, como boss, acampamento ou caminho desconhecido ainda não revelado, devem indicar que não há CD cadastrada.

A CD deve partir da CD base do andar, com variação aleatória e modificadores por tipo de sala. Encontros elite podem aumentar a CD.

### 5. Tempo de Exploração

O tempo de exploração usa a regra do perfil:

- incremento base de 15 minutos;
- máximo de 60 minutos;
- nodos sem teste usam 30 minutos;
- eventos climáticos relevantes podem aumentar o tempo até o máximo.

O tempo total da sessão deve ser exibido e preservado no código de sessão.

### 6. Clima e Terreno

Cada nodo deve receber contexto ambiental:

- clima;
- terreno;
- características do terreno;
- efeitos de regra;
- modificadores de ND.

Climas possíveis incluem temperatura, névoa, precipitação e vento. O gerador deve respeitar incompatibilidades, como vento forte cancelando névoa quando aplicável.

Terrenos principais:

- Floresta;
- Pântano;
- Aquático;
- Colinas;
- Planície aberta.

Características incluem árvores, folhagens, vegetação rasteira, lodaçal, vegetação alagada, água corrente, personagens submersos, inclinações, penhascos, clareiras, trincheiras e solo encharcado.

Clima e terreno devem aparecer na modal do nodo quando a informação estiver disponível ao grupo.

### 7. ND e Orçamento do Encontro

O ND total do nodo deve combinar:

```text
ND total = ND base do encontro + modificador de clima + modificador de terreno
```

Faixas atuais de ND base:

| Andares | Normal | Armadilha | Tesouro | Desconhecido | Acampamento | Elite |
|---|---:|---:|---:|---:|---:|---:|
| 11-12 | 1 | 1 | 1 | 1 | 1/4 | 3 |
| 13-14 | 2 | 2 | 2 | 2 | 1/4 | 4 |
| 15-16 | 3 | 3 | 3 | 3 | 1/2 | 5 |
| 17-18 | 4 | 4 | 4 | 4 | 1/2 | 6 |
| 19-20 | 5 | 5 | 5 | 5 | 3/4 | 7 |

O ND máximo atual do perfil é 8. O boss do andar 20 usa ND 8.

O app separa o orçamento interno do encontro:

- `challenge.encounter`: orçamento base;
- `challenge.creatures`: orçamento disponível para criatura ou grupo;
- `challenge.trap`: orçamento consumido por armadilha;
- `challenge.climate`: modificador externo de clima;
- `challenge.terrain`: modificador externo de terreno;
- `challenge.total`: soma final apresentada ao mestre.

Armadilhas incidentais não devem aumentar o ND total; elas consomem parte do orçamento do encontro.

### 8. Criaturas

O perfil deve selecionar criaturas conforme:

- tipo de terreno;
- ND disponível para criaturas;
- pesos de tipo por terreno;
- regra de grupo para quatro personagens;
- catálogo global de criaturas.

Tipos gerais usados:

- Animal;
- Construto;
- Espírito;
- Humanoide;
- Monstro;
- Morto-vivo.

Pesos por terreno devem favorecer a identidade da região. Por exemplo, Floresta favorece Animais e Monstros; Pântano favorece Monstros, Animais e Mortos-vivos; Planície aberta favorece Humanoides.

O app deve apresentar:

- tipo predominante;
- ND alvo;
- criatura selecionada, quando resolvida;
- papel da criatura, quando disponível;
- orientação de ajuste para o mestre;
- ficha e fonte quando houver cadastro no catálogo.

### 9. Armadilhas

Armadilhas podem aparecer como:

- nodo principal de armadilha;
- armadilha incidental em encontros normais, elite ou boss.

Regras atuais:

- fontes: Livro Básico e Ameaças de Arton;
- ND mínimo: 1/4;
- armadilha incidental consome orçamento do encontro;
- chance incidental por tipo:
  - normal: 6%;
  - elite: 10%;
  - boss: 8%.

A modal deve mostrar dados relevantes da armadilha:

- nome;
- ND;
- detecção;
- desarme;
- teste de resistência;
- dano;
- tipos de dano;
- testes adicionais;
- efeito.

### 10. Tesouros

Nodos de tesouro representam recompensa ou achado relevante dentro da rota.

O app deve:

- garantir ao menos um tesouro no mapa quando possível;
- exibir ND do nodo para orientar rolagem na tabela de tesouros;
- deixar o mestre resolver a recompensa conforme a tabela apropriada;
- manter tesouro integrado ao progresso da rota.

Quando um encontro tiver criaturas com tesouro próprio, esse tesouro pertence às criaturas e não substitui automaticamente a recompensa de um nodo de tesouro.

### 11. Acampamentos

Acampamentos devem funcionar como pontos de descanso.

O app deve:

- inserir acampamentos em níveis elegíveis;
- permitir marcar descanso;
- zerar o tempo decorrido ao descansar;
- exibir estado visual do acampamento descansado;
- evitar clima danoso direto em acampamentos quando a geração permitir.

### 12. Caminhos Desconhecidos

Quando a opção de caminhos desconhecidos estiver ativa:

- nodos bloqueados devem permanecer ocultos;
- nodos desconhecidos devem mostrar informação reduzida até serem escolhidos ou explorados;
- a modal deve esconder clima e terreno quando essa informação ainda não estiver disponível;
- ao escolher a rota, o tipo real do nodo desconhecido deve ser revelado.

### 13. Boss do Andar 20

O andar 20 deve conter o boss final da faixa quando a regra estiver ativa.

Estado atual:

- boss habilitado apenas no andar final;
- criatura específica: Quimera;
- ND do boss: 8;
- fonte da criatura: Ameaças de Arton, quando disponível no catálogo.

O boss deve aparecer como nodo final do mapa, preservando a lógica de rota até chegar nele.

### 14. Mapa Tático de Encontro

O mapa em nodos continua sendo a representação principal dos andares 11 a 20. Ainda assim, uma melhoria possível é gerar mapa tático para cenas abertas por nodos.

Esse mapa tático deve representar apenas a cena atual:

- clareira;
- trilha estreita;
- pântano;
- margem de rio;
- ponte natural;
- ruína tomada por vegetação;
- acampamento hostil;
- câmara do boss.

Elementos mínimos desejados:

- posição inicial do grupo;
- inimigos;
- armadilhas ou perigos;
- terreno difícil;
- cobertura;
- elevação, água ou gargalo quando o terreno pedir;
- portas, passagens ou bordas do campo de batalha quando fizer sentido.

Regras de validade:

- o mapa não deve contrariar o terreno do nodo;
- a quantidade de inimigos deve refletir a composição do encontro;
- armadilhas devem aparecer em posição relevante;
- clima e terreno podem influenciar zonas de risco ou visibilidade;
- o grupo não deve começar adjacente à ameaça, exceto quando a cena pedir emboscada;
- deve existir rota navegável entre grupo e ameaça.

Essa melhoria deve ser integrada ao modal do nodo, preferencialmente como uma seção expandível ou ação de "ver mapa tático", sem tornar o fluxo mais pesado.

## Layout Ideal

### Estrutura da Tela

A tela dos andares 11 a 20 deve manter três áreas principais.

#### 1. Cabeçalho e Configuração

Exibe:

- faixa de andares;
- andar atual;
- profundidade;
- CD base;
- seed;
- opção de caminhos desconhecidos;
- botão para gerar mapa;
- código de sessão.

#### 2. Mapa em Nodos

Representa a exploração principal:

- níveis verticais;
- nodos por coluna;
- links entre nodos;
- estados visuais de bloqueado, ativo, escolhido, tentado e explorado;
- ocultação de nodos quando caminhos desconhecidos estiver ativo;
- ícones por tipo de sala.

#### 3. Modal de Nodo

Ao abrir um nodo, a modal deve exibir:

- título e tipo da sala;
- teste de descoberta;
- tempo de exploração;
- ND total;
- decomposição de ND;
- criatura ou perfil de encontro;
- armadilha, se houver;
- clima;
- terreno;
- botões de ação da exploração;
- no futuro, mapa tático da cena quando aplicável.

## Tema Visual

O tema dos andares 11 a 20 é floresta perigosa e região selvagem.

Direção visual:

- fundo escuro esverdeado;
- painéis com tons de floresta e sombra;
- colunas do mapa com verdes e amarelos dessaturados;
- ícones legíveis para sala, armadilha, tesouro, acampamento e boss;
- clima e terreno devem parecer parte da cena, mas sem comprometer a leitura do mapa.

O visual deve continuar funcional para mesa: o mestre precisa identificar rota, estado do nodo e informações mecânicas rapidamente.

## Modelo de Estado Sugerido

```js
{
  mode: "node-map",
  profile: "forest-11-20",
  floor: 15,
  depth: 5,
  baseDc: 20,
  unknownPaths: true,
  mapSeed: "ABC123XY",
  state: {
    attempted: [nodeIds],
    explored: [nodeIds],
    rested: [nodeIds],
    chosenByLevel: [[level, nodeId]],
    elapsedMinutes: 90
  }
}
```

Cada nodo pode conter:

```js
{
  id,
  level,
  column,
  type,
  label,
  short,
  links,
  skill,
  dc,
  investigationMinutes,
  environment,
  challenge,
  creature,
  trap,
  resolvedEncounter,
  revealedLabel
}
```

## Dados Estruturados Necessários

O perfil dos andares 11 a 20 deve conter:

- lista de andares;
- recomendações de encontros por andar;
- recomendações de CD base por andar;
- tipos de sala e pesos;
- regras de boss;
- regras de tempo;
- regras de armadilha;
- pesos de criatura por terreno;
- orientação de grupo;
- faixas de ND por andar e tipo de sala;
- modificadores de clima;
- modificadores de terreno;
- tema visual;
- regras de clima;
- regras de terreno.

Para a melhoria de mapas táticos, também será necessário definir:

- layouts táticos por terreno;
- tags de terreno que influenciem o mapa;
- representação de água, lodo, vegetação, árvores, elevação e penhascos;
- integração entre composição do encontro e marcadores do mapa;
- regras específicas para boss do andar 20.

## Integração com Sistemas Existentes

Reaproveitar:

- geração de mapa em `generator.js`;
- estado de exploração em `appState.js`;
- renderização SVG em `mapRenderer.js`;
- modal de nodo em `nodeDialog.js`;
- cálculo e formatação de ND;
- geração de clima e terreno;
- catálogo de criaturas;
- catálogo de armadilhas;
- resolvedor de encontros;
- código de sessão;
- tema por perfil.

Criar ou evoluir apenas se necessário:

- mapas táticos para cenas de nodo;
- templates de mapa por terreno externo;
- seção de mapa tático na modal de nodo;
- testes de validade para mapas táticos 11-20.

## Critérios de Aceite

- O usuário consegue selecionar a faixa "Andares de 11 a 20".
- O app apresenta mapa em nodos, não exploração estendida.
- O app gera mapa com níveis, colunas e rotas ramificadas.
- Todo nodo gerado é alcançável por ao menos uma rota válida.
- O mapa contém variedade de tipos de sala conforme os pesos do perfil.
- O mapa garante ao menos um tesouro quando possível.
- Acampamentos aparecem em níveis elegíveis e podem ser usados para descanso.
- Nodos ativos podem ser escolhidos e desbloqueiam os próximos nodos conectados.
- O app registra nodos tentados, explorados, escolhidos e descansados.
- O tempo de exploração é atualizado e preservado.
- O modo de caminhos desconhecidos oculta informação até o momento adequado.
- A modal de nodo apresenta teste, tempo, ND, criatura, armadilha, clima e terreno quando aplicável.
- O ND total combina encontro, clima e terreno.
- Armadilhas incidentais consomem orçamento do encontro em vez de aumentar o ND total.
- Criaturas respeitam pesos por terreno e orçamento de ND.
- O andar 20 possui boss final com Quimera ND 8.
- O código de sessão restaura mapa, progresso, rota, tempo e estado de nodos.
- O modo 11-20 continua separado do modo 1-10.

Critérios adicionais para a melhoria de mapas táticos:

- Encontros de criatura, armadilha ou boss podem exibir mapa tático.
- O mapa tático respeita terreno, clima e composição do nodo.
- O mapa tático não substitui a navegação em grafo.
- O mestre pode ignorar ou regerar o mapa tático sem alterar a rota.

## Status da Implementação Atual

### Implementado

- Perfil `forest11to20` cobrindo os andares 11 a 20.
- Modo `node-map` para essa faixa.
- Recomendações de encontros por andar e CD base.
- Geração de mapa em grafo com layout em "taça".
- Rotas ramificadas com garantia de acessibilidade.
- Conexões secundárias entre nodos próximos.
- Caminhos desconhecidos baseados em convergência de rotas.
- Tipos de sala com pesos: normal, elite, armadilha, desconhecido e tesouro.
- Garantia de ao menos um tesouro quando possível.
- Acampamentos em níveis elegíveis.
- Estado de exploração com nodos escolhidos, tentados, explorados e descansados.
- Controle de tempo de exploração.
- Código de sessão para salvar e restaurar a exploração em nodos.
- Tema visual próprio dos andares 11 a 20.
- Geração de clima e terreno por nodo.
- Modificadores de ND por clima, terreno e características.
- Seleção de criaturas por tipo e terreno.
- Catálogo de criaturas integrado à modal.
- Armadilhas principais e incidentais.
- Decomposição de ND entre encontro, criatura, armadilha, clima e terreno.
- Boss final do andar 20 com Quimera ND 8.
- Modal de nodo com teste, exploração, desafio, ambiente, criatura, armadilha e ações de estado.
- Gerador manual de encontros como apoio separado.

### Melhorias Possíveis

- Adicionar mapa tático aos encontros dos andares 11 a 20.
- Criar layouts táticos por terreno externo, como floresta, pântano, margem de rio, colina, clareira e ruína.
- Fazer o mapa tático refletir quantidade real de inimigos, armadilhas incidentais e elementos de terreno.
- Exibir mapa tático dentro da modal do nodo, preferencialmente recolhido ou em visualização expandida.
- Adicionar testes automatizados para validade dos mapas táticos 11-20 quando essa melhoria for implementada.

## Decisões e Pontos de Atenção

### Decisões Fechadas

- Os andares 11 a 20 devem continuar usando exploração em nodos.
- O mapa em nodos representa uma região maior, não uma sala individual.
- A exploração estendida dos andares 1 a 10 não deve substituir o fluxo 11-20.
- Mapas táticos para 11-20 são melhoria possível, não requisito para considerar a faixa funcional.
- O boss final do andar 20 é a Quimera no perfil atual.
- Clima e terreno fazem parte do ND total e devem continuar aparecendo para o mestre.
- Armadilhas incidentais consomem orçamento do encontro, sem aumentar o ND total.
- O mestre continua responsável por resolver recompensas finais conforme as tabelas apropriadas.

### Pontos de Atenção

- O perfil 11-20 usa uma identidade de floresta/região selvagem; novos subtemas devem ser tratados como evolução consciente do perfil, não como expansão automática.
- A adição de mapas táticos não deve deixar a modal de nodo pesada demais para uso em mesa.
- Mapas táticos de ambiente externo precisam representar cobertura, terreno difícil, água e elevação melhor do que os mapas internos dos andares 1 a 10.
- O código de sessão deve preservar o fluxo em nodos mesmo se mapas táticos forem adicionados.
- Qualquer mudança em criatura, armadilha ou ND deve respeitar a separação entre orçamento interno do encontro e modificadores externos de clima/terreno.

## Decisão Arquitetural Recomendada

Manter os andares 11 a 20 como perfil `node-map`.

O mapa em nodos é a representação correta para essa etapa porque comunica escala, escolhas de rota e exploração de uma região maior. A evolução natural dessa faixa não é trocar o modelo por exploração estendida, mas enriquecer as cenas dos nodos.

A melhoria mais coerente é integrar mapas táticos opcionais aos encontros dos nodos, reaproveitando `encounterResolver.js` e os sistemas já criados para mapas táticos, mas criando layouts específicos para terreno externo.
