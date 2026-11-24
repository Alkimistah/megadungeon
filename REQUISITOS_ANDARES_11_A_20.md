# Requisitos e arquitetura dos andares 11–20

**Escopo fechado em 18/11/2026.** A referência publicada é o commit `75379a3`. Este documento descreve o comportamento entregue e os contratos que precisam ser preservados em manutenção. O histórico de decisões e evidências está no [planejamento](docs/historico/PLANEJAMENTO_ANDARES_11_A_20.md).

## Perfil e preparação da expedição

A Floresta da Masmorra de Práxis usa o modo `node-map`, perfil `forest-11-20`, para um grupo de referência de quatro personagens dos níveis **4–7**. O grafo representa a região percorrida. O mapa tático representa a cena local. O tema florestal fornece cores e ícones para as duas visualizações. [Configuração do perfil](src/floorProfiles/forest11to20.js) · [Progressão](PROGRESSAO_NIVEIS_GRUPO.md).

| Andar | Profundidade sugerida em etapas | CD base |
|---:|---:|---:|
| 11 | 3 | 20 |
| 12 | 4 | 20 |
| 13 | 4 | 21 |
| 14 | 5 | 21 |
| 15 | 5 | 21 |
| 16 | 6 | 22 |
| 17 | 6 | 22 |
| 18 | 7 | 22 |
| 19 | 8 | 23 |
| 20 | 8 | 23 |

Ao iniciar, o mestre escolhe o andar inicial e seleciona as missões oferecidas, com a opção de seguir sem missão. A preparação usa a seed para gerar os mapas do andar inicial ao 20, materializar as missões e preparar as cabeças do chefe. A profundidade e a CD informadas substituem as recomendações do andar inicial. Cada andar seguinte usa suas próprias recomendações. Uma configuração sem rota compatível é rejeitada e preserva a expedição anterior.

## Grafo, exploração e relógios

- **Grafo.** O mapa em taça tem mais nodos nas etapas intermediárias. As conexões dirigidas ligam etapas adjacentes, com bifurcações e convergências. Cada nodo é alcançável por pelo menos uma rota. Há pelo menos um tesouro quando existe posição elegível e a Quimera ocupa o final do andar 20.
- **Seleção e conclusão.** Escolher um nodo ativo registra a travessia, resolve seu conteúdo e fecha as demais escolhas daquela etapa. Nos mapas atuais, concluir a cena ou encontro libera as saídas conectadas. A saída do último nodo habilita o avanço de andar após a conclusão. Confirmar a derrota da Quimera encerra a faixa. Mapas legados seguem suas regras originais de liberação.
- **Visibilidade.** O modo **Caminhos desconhecidos** restringe a visibilidade a nodos ativos e percorridos e oculta detalhes de nodos ainda por descobrir. Nodos com conteúdo desconhecido nas expedições atuais revelam a cena quando a rota é escolhida, inclusive com o modo desligado. O mapa indica descoberta registrada, encontro pendente e conclusão.
- **Teste de descoberta.** A perícia depende do tipo de cena e a CD parte da CD base do andar, com os modificadores do gerador. Quando há teste antes da escolha, a modal mostra perícia, CD e os controles **Registrar sucesso (+15 min)** e **Registrar falha (+15 min)**. O sucesso revela os detalhes disponíveis e credita os 15 minutos se a rota for escolhida depois. A falha registra a tentativa, preserva os detalhes ocultos e cobra a travessia integral se o grupo seguir por ali. O mestre resolve a rolagem em mesa.
- **Tempo.** Em novas expedições, a travessia com teste parte de 30 minutos, soma 15 por evento climático relevante e 15 quando o ND do terreno é pelo menos 1, até 60 minutos. Nodos sem teste usam 30 minutos. A interface mostra o total da expedição e o tempo desde o último descanso. Descansar zera apenas o segundo relógio. O mestre decide a duração e os efeitos do descanso em mesa.

### Tipos e descansos

| Tipo | Peso inicial atual | Papel |
|---|---:|---|
| Normal | 47 | Encontro de referência da faixa |
| Elite | 11 | Combate mais difícil, com CD e ND maiores |
| Armadilha | 11 | Perigo principal do nodo |
| Desconhecido | 25 | Conteúdo revelado ao entrar |
| Tesouro | 6 | Achado cuja recompensa o mestre resolve pela tabela apropriada |

São pesos antes da aplicação de acampamentos, tesouro garantido e chefe. Cada quarta etapa interna tem acampamentos visíveis em seus nodos elegíveis, com chance de 2% de acampamentos extras nas demais etapas. Acampamentos verdadeiros protegem dos perigos ambientais e permitem registrar o descanso. O tesouro próprio de uma criatura e o achado de um nodo de tesouro são recompensas distintas.

Um nodo desconhecido pode revelar combate, armadilha, tesouro, acampamento seguro, obstáculo, exploração, descoberta ou descanso falso. Na tabela atual, acampamento seguro tem peso 8 e descanso falso tem peso 6. Diante de um abrigo revelado, o mestre pode seguir viagem ou iniciar o descanso. O descanso falso aparece como acampamento até a decisão. Iniciar o descanso ali revela uma emboscada com o orçamento de combate do nodo. A emboscada interrompe o descanso, preserva os relógios e exige confirmação de conclusão para liberar a rota. Em cenas externas, o app apresenta abordagem, sucesso e falha para resolução em mesa. [Tabela de cenas externas](src/forestUnknownScenes.js).

## Ambiente, ND e combate

Floresta, pântano, áreas aquáticas, colinas e planícies abertas têm características e efeitos próprios. Em novas expedições, a escolha do terreno considera todos os caminhos de entrada. O clima compartilha uma tendência de temperatura e precipitação por etapa e pode apresentar vento e névoa conforme o contexto. A geração de ambiente antecede o cálculo de ND, a resolução de encontros e o vínculo de missões. Mapas salvos mantêm seus ambientes.

| Andares | ND base normal, armadilha e tesouro | Acampamento | Elite |
|---|---:|---:|---:|
| 11–12 | 1 | ¼ | 3 |
| 13–14 | 2 | ¼ | 4 |
| 15–16 | 3 | ½ | 5 |
| 17–18 | 4 | ½ | 6 |
| 19–20 | 5 | ¾ | 7 |

O conteúdo real do desconhecido define sua regra de ND. O ND total incorpora encontro, clima e terreno, respeitando os limites do perfil. Uma armadilha incidental consome orçamento interno do encontro. A modal mostra o XP de referência multiplicando o ND por 1.000 e apresenta os valores com e sem ambiente. O perfil orienta a composição por terreno, tipo de criatura e orçamento de ND.

- **Armadilhas.** Os registros vêm do Livro Básico e de Ameaças de Arton. Em encontros elegíveis, a chance incidental é de 6% no normal e 10% no elite. A arena fixa da Quimera tem composição solo e zero armadilhas. Variações narrativas por terreno preservam a ficha de referência, o ND, a detecção, o desarme, a resistência, o dano e o mapa.
- **Rerrolagem.** Uma composição elegível pode ser trocada por outra compatível com as restrições do nodo e o mesmo ND real de criaturas. Uma armadilha principal ou incidental em um nodo escolhido e pendente pode ser trocada por outra das fontes permitidas com o mesmo ND. O resultado aceito fica no save. Vínculos de missão, cenas fixas, encontros concluídos ou contabilizados e ajustes de combate protegem a composição contra nova rerrolagem.
- **Reforços.** Os controles de iniciativa +2, ataque +1 e PV extras são ajustes do mestre. O reforço comum de PV soma o valor original ao máximo e ao atual, preservando o dano registrado. As anotações de dano e cura, o último lançamento e as unidades extras são temporários. Reforços salvos, ND e XP são preservados. O alvo de uma missão de extermínio ativa no nodo fica protegido contra adição manual.

## Missões, modal e mapa tático

As missões comuns têm destinos entre os andares 11 e 19. O perfil define contratantes, categorias, alvos, locais e ND de referência para recompensa. As categorias incluem extermínio, coleta, exploração, recuperação, investigação, resgate, entrega protegida, caçada especial, teste ou desafio e anômala.

Cada missão selecionada precisa de conteúdo realizável em uma rota compatível. Um nodo tem no máximo uma missão vinculada. Extermínios podem ocupar vários nodos para alcançar a quantidade exigida. A integração registra vínculo, progresso, conclusão e histórico. Um encontro creditado fica identificado para evitar contagem dupla. O andar 20 é reservado ao encontro final.

A modal ocupa a tela inteira. Cabeçalho e rodapé ficam fixos e o conteúdo central rola. Quando disponíveis, o rodapé alterna ambiente e combate e abre o mapa tático. A missão integrada mostra objetivo, progresso e ações, com pistas da própria missão, prova e consequências em detalhes recolhidos. O mesmo mapa tático do nodo apresenta os destaques de missão sobre o terreno e a composição. A cena local usa terreno, clima, posições iniciais, ameaças, obstáculos e zonas de risco coerentes com o encontro.

A grade tem **20 plantas reutilizáveis** selecionadas pelo tipo de terreno, pelas características do ambiente e pela seed do nodo. A mata pode aparecer com trilha, sem trilha ou com clareira. O pântano pode ter faixa firme, ilhas ou alagamento contínuo. Água rasa e profunda, correnteza e submersão definem as cenas aquáticas. Nas colinas, o desfiladeiro cruza a grade, podendo ter ponte ou duas travessias. O paredão pode terminar numa faixa de inclinação íngreme. A planície tem variantes com e sem trincheira.

Uma missão compatível pode selecionar uma cena com posições definidas. As primeiras são a investigação das cinzas na clareira, o desafio de cruzar terreno inundado, a recuperação no leito aquático e a recuperação do outro lado do desfiladeiro. A planta usa a armadilha já resolvida no encontro, com sua ficha original. Uma armadilha compatível com a travessia pode cobrir a ponte ou a passagem rasa. O grafo da expedição é independente dessas passagens locais.

O [gerador manual de encontros](src/manualEncounterDialog.js) continua disponível como apoio separado da rota.

## Quimera do andar 20

- **Encontro fixo.** Quimera solo de ND 8 e 8.000 XP, Defesa 33 e 333 PV base. A clareira de 20 × 14 tem posições iniciais fixas para quatro personagens e a Quimera Grande. Novas arenas incluem troncos como coberturas destrutíveis, resolvidas em mesa.
- **Cabeças.** Quatro das dez opções são sorteadas sem repetição na preparação do andar e numeradas de 1 a 4 para a rolagem do mestre. Cada cabeça recebe uma fraqueza dentre suas duas candidatas. A ficha mostra somente as cabeças sorteadas e suas habilidades. Consulte o [catálogo de dano](src/damageTypes.js) e a [tabela de fraquezas do encontro](src/chimeraCombat.js).
- **Dano e turno.** Corpo e cabeças compartilham PV. O corpo e acertos com outros tipos sofrem RD 5. A fraqueza da cabeça atingida ignora a RD e o primeiro acerto correspondente atordoa sua habilidade até o fim do próximo turno da Quimera. O mestre registra o fim do turno. Os demais ataques continuam disponíveis. O lançamento recebe um tipo de dano por vez, com tipos mistos adjudicados em mesa.
- **Sopro e reforços.** Se o Dragão foi sorteado, usar o sopro inicia a recarga e o mestre registra o gasto da ação de movimento para recarregar. Cabeça atordoada fica impedida de usar o sopro. A Quimera pode receber os bônus de iniciativa e ataque e um valor de PV extras escolhido pelo mestre.

## Persistência e compatibilidade

O autosave mantém a expedição atual no IndexedDB local. A retomada pelo ícone do app oferece a sessão salva. O TXT exporta o mesmo estado de exploração como código portátil `MD1.` seguido de JSON codificado em Base64 URL. A restauração usa a faixa e o andar do save.

| Dado | Contrato |
|---|---|
| Envelope da sessão | `v`, `mode`, `profile`, `floor`, `depth`, `baseDc`, `mapSeed`, `unknownPaths`, `state`, `missions` e, nas novas expedições da floresta, `forestExpedition` |
| Estado do andar | Tentativas, exploração, conclusão, descanso, rota por nível, encontros resolvidos e os dois relógios nas sessões atuais |
| Expedição armazenada | Versão do snapshot e da geração, seed, andar inicial, mapas dos andares e estados arquivados. Os links são exportados por ID de nodo e reconstruídos na importação |
| Quimera | Ordem, fraquezas, atordoamento, recarga e reforços persistem. Ao retomar, PV voltam ao máximo com os reforços salvos. Um snapshot anterior com arena fixa recebe as cabeças usando a seed do andar e preserva a arena |
| Ajustes em memória | Dano, cura, último lançamento e criaturas extras ficam na sessão aberta, inclusive ao fechar e reabrir a ficha. Retomar restaura a composição persistida e os PV máximos |
| Sessões anteriores | Snapshots usam o grafo salvo. Códigos sem snapshot usam o caminho legado pela seed. O relógio total pode ser reconstruído a partir do progresso registrado e exibe **parcial** quando falta histórico |

Alterações na ordem ou consumo do RNG, IDs, topologia ou vínculo de missões precisam de verificação com expedições novas e arquivos antigos. A versão do formato da sessão e a versão da geração são contratos distintos.

## Guia de manutenção

| Área | Código responsável |
|---|---|
| Configuração, transições entre andares e autosave | [main.js](src/main.js), [perfil](src/floorProfiles/forest11to20.js), [forestExpedition.js](src/forestExpedition.js), [sessionAutosave.js](src/sessionAutosave.js) e [sessionCode.js](src/sessionCode.js) |
| Grafo, ambiente e progressão | [generator.js](src/generator.js), [forestEnvironment.js](src/forestEnvironment.js), [appState.js](src/appState.js) e [mapRenderer.js](src/mapRenderer.js) |
| Orçamento, encontro, emboscada e armadilhas | [challenge.js](src/challenge.js), [encounterResolver.js](src/encounterResolver.js) e [forestTrapPresentation.js](src/forestTrapPresentation.js) |
| Missões | [missionGenerator.js](src/missions/missionGenerator.js), [forestMissionIntegration.js](src/missions/forestMissionIntegration.js), [forestMissionScenes.js](src/missions/forestMissionScenes.js) e [missionState.js](src/missions/missionState.js) |
| Fichas, controles e mapas táticos | [nodeDialog.js](src/nodeDialog.js), [encounterCreatureHealth.js](src/encounterCreatureHealth.js), [creatureReinforcement.js](src/creatureReinforcement.js), [nodeTacticalMap.js](src/nodeTacticalMap.js) e [tacticalMapRenderer.js](src/tacticalMapRenderer.js) |
| Chefe | [forestBossEncounter.js](src/forestBossEncounter.js), [chimeraCombat.js](src/chimeraCombat.js) e [chimeraCombatView.js](src/chimeraCombatView.js) |

### Verificação e limites do fechamento

- `npm run test:floors-11-20` cobre geração, rotas, missões, combates, chefe e compatibilidade. `npm run test:missions` cobre a geração de missões e códigos nos perfis. `npm run test:floors-1-10` verifica o perfil que compartilha parte da infraestrutura.
- `npm run build` seguido de `npm run qa:floors-11-20 -- --production`, com o preview em execução, cobre o fluxo no Chrome, casos mobile e a operação offline após cache. `QA_APP_URL` seleciona o endereço do servidor local.
- O mestre validou a Quimera, a importação e exportação por TXT e a retomada pelo ícone do app no tablet. As verificações pontuais em mesa, como a apresentação das armadilhas por terreno, ficam registradas como acompanhamento.
- Pistas de rota foram arquivadas. Continuidade detalhada de rios e elevações e simulação dos efeitos climáticos ao longo do percurso são possibilidades de evolução. Nenhum desses itens integra o escopo fechado.
