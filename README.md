# Mega Dungeon

Gerador procedural de exploração e encontros para Tormenta20. Os andares 1 a 10 usam exploração estendida, com eventos d100 e encontros finais curados. Os andares 11 a 20 usam um mapa em grafo com rotas ramificadas. Os andares 21 a 30 usam um mapa de arquipélago, com as quatro ilhas iniciais jogáveis do desembarque à conquista do fragmento.

## O que o app faz

- Para os andares 1 a 10, conduz um teste estendido por andar: ações de perícia acumulam sucessos, falhas geram eventos d100, presságios, vantagens, anomalias, encontros e mapas táticos.
- Para os andares 1 a 10, apresenta encontros finais por tier, sala especial da Aranha Matriarca no andar 10 e conclusão da etapa ao vencer o chefe.
- Para os andares 11 a 20, gera um mapa de nós com múltiplos níveis e caminhos ramificados.
- Cada nó do mapa 11 a 20 tem tipo de sala (normal, elite, armadilha, tesouro, boss, acampamento), perícia de descoberta, DC, ND calculado, ambiente (clima + terreno) e perfil de criatura quando aplicável.
- O jogador navega pelo mapa escolhendo rotas, marcando encontros como explorados ou tentados, e descansando em acampamentos.
- No arquipélago, distribui nove ilhas em três fileiras, quatro iniciais, três intermediárias e duas avançadas, e a ilha final do Rei Tirano. As iniciais têm quatro setores, as intermediárias seis e as avançadas oito, com mapas táticos e um guardião no Centro. Cada uma das nove pode ter uma missão própria, ligada ao seu tema.
- No descanso na liburna, pode abrir uma emboscada com chance e ND definidos pela quantidade de fragmentos. O descanso termina depois que o mestre encerra o encontro.
- Os mapas táticos das três faixas têm terreno e efeitos em camadas, tokens móveis e contador de deslocamento. É possível ajustar a formação dos jogadores, adicionar invocações aliadas ou inimigas e remover peças durante o encontro.
- O estado da exploração é exportado como um código de sessão que pode ser copiado e restaurado a qualquer momento, sem conta e sem backend.
- Funciona offline e pode ser instalado como PWA.

## Desenvolvimento local

Instale as dependências:

```bash
npm install
```

Rode o servidor local:

```bash
npm run dev
```

Crie uma versão de produção:

```bash
npm run build
```

A pasta `dist/` gerada pelo build pode ser servida por qualquer host estático (GitHub Pages, Netlify, Vercel, Cloudflare Pages).

## Estrutura resumida

```
src/
├── main.js           # Entrada; bindings de UI e orquestração
├── generator.js      # Algoritmo de geração do mapa
├── appState.js       # Estado de exploração do mapa em nodos
├── extendedExplorationState.js # Estado dos andares 1 a 10
├── extendedExplorationRenderer.js # UI dos andares 1 a 10
├── mapRenderer.js    # Renderização SVG
├── nodeDialog.js     # Modal de detalhes do nó
├── encounterResolver.js # Resolve encontros com criatura, armadilha e mapa tático
├── manualEncounterDialog.js # Gerador manual de encontro
├── challenge.js      # Cálculo de ND
├── creatures.js      # Tipos de criatura e perfil de encontro
├── creatureCatalog/  # Fichas por tipo, fonte e papel; inclui Livro Básico e Ameaças de Arton
├── damageTypes.js    # Tipos de dano para ameaças, perigos e armadilhas
├── generalCreatureAbilities.js # Habilidades gerais reutilizáveis de criaturas
├── traps.js          # Catálogo e orçamento de armadilhas
├── threatCreationRules.js # Criação, modificação, papéis e bandos de ameaças
├── environment.js    # Geração de clima e terreno
├── tables.js         # Tabelas de perícias por tipo de sala
├── floorRanges.js    # Gerenciamento de perfis de andar
├── floorProfiles/    # Perfis dos andares 1–10, 11–20 e 21–30
├── random.js         # RNG com seed (cyrb128 + sfc32)
└── sessionCode.js    # Codificação/decodificação do código de sessão
```

Toda a documentação técnica detalhada — arquitetura, sistemas, estrutura de dados, fluxo da aplicação e pontos de extensão — está em [`ARCHITECTURE.md`](ARCHITECTURE.md).

Documentos de requisitos por etapa:

- [Planejamento e prioridades dos andares 11–20 (histórico)](docs/historico/PLANEJAMENTO_ANDARES_11_A_20.md) — revisão de missões e corte de escopo para o próximo uso.
- [Progressão de níveis do grupo](PROGRESSAO_NIVEIS_GRUPO.md) — referência oficial de campanha por faixa de andares.

- [`REQUISITOS_ANDARES_1_A_10.md`](REQUISITOS_ANDARES_1_A_10.md)
- [`REQUISITOS_ANDARES_11_A_20.md`](REQUISITOS_ANDARES_11_A_20.md)
- [`REQUISITOS_ANDARES_21_A_30.md`](REQUISITOS_ANDARES_21_A_30.md)

## Perfis de andar

Os perfis atuais são:

- `dungeon1to10`: exploração estendida dos andares 1 a 10, com ações por andar, tabela d100, efeitos mecânicos, mapas táticos, encontros finais e chefe do andar 10.
- `forest11to20`: mapa em nodos dos andares 11 a 20, usado como representação de uma área maior com rotas pré-geradas.
- `archipelago-21-30`: arquipélago com dez ilhas e progressão por fragmentos. As nove ilhas e a ilha final têm exploração completa, e as nove têm missões por tema. Outros 8 temas estão desligados até receberem setores e pacote de missões.

Para adicionar uma nova faixa de andares:

1. Criar `src/floorProfiles/meuPerfil.js` seguindo a estrutura do perfil mais próximo.
2. Exportar o novo perfil em `src/floorProfiles/index.js`.
3. Definir o modo de exploração, tema, regras de ND e regras específicas do perfil.

## Melhorias possíveis

- Criar uma mecânica especial para a Quimera; o MVP usa o chefe sozinho em arena fixa simples.
- Ampliar os desconhecidos e evoluir a continuidade de clima/terreno e as pistas de rota dos andares 11–20.
- As três ilhas intermediárias têm seis setores cada. As duas avançadas têm oito setores cada. A expedição começa com quatro ilhas abertas e zero fragmentos. Concluir as iniciais libera as intermediárias. Concluir as intermediárias libera as avançadas. Nove fragmentos abrem a rota até o Rei Tirano ND 11. Com Caminhos desconhecidos, cada fileira aparece ao ser liberada e as ilhas só revelam o tema no desembarque. O ícone do barco marca a última ilha explorada, e o botão Retornar ao barco fica disponível no mapa durante a visita. As missões já seguem o tema de cada ilha, com mapa próprio, acesso no centro do rodapé da ficha e CD pela tabela de ND do Ameaças de Arton. Os 8 temas fora do sorteio voltam um a um como ilhas completas. O próximo trabalho é revisar a grade tática compartilhada. A validação em mesa fica por último, depois que tudo estiver pronto. [Ordem de implementação](REQUISITOS_ANDARES_21_A_30.md#por-onde-retomar)

## MVP dos andares 11–20

Novas expedições incluem missões efetivamente presentes nos nodos, extermínio distribuído com contador, objetivos temáticos sem combate, CDs de 20 a 23 e conclusão de cada cena antes de avançar. A Quimera tem composição e mapa fixos. O código de sessão salva os mapas preparados e o progresso; códigos anteriores continuam restauráveis pelo fluxo legado.

Verificações locais:

```bash
npm run test:floors-11-20
npm run test:missions
npm run test:floors-1-10
npm run build
```

Com o servidor local ativo, `npm run qa:floors-11-20` e `npm run qa:floors-1-10` executam os fluxos no Chrome. Defina `QA_CHROME` se o executável não estiver em `/usr/bin/google-chrome`. Para testar o build e o cache offline, execute `npm run preview -- --port 4173` e `node scripts/qaForestMvp.mjs --production`.

Detalhes de entrega, evidências e pendências estão no [planejamento](docs/historico/PLANEJAMENTO_ANDARES_11_A_20.md).

### Desempenho do bundle

O build de produção atual gera um alerta por possuir um chunk JavaScript acima de 500 kB: aproximadamente 1.008 kB minificado e 240 kB após gzip. Isso não é um bloqueio funcional, mas deve ser reavaliado se o primeiro carregamento ficar perceptivelmente lento nos tablets usados nas sessões, se o app passar a depender de conexões lentas ou se o bundle continuar crescendo.

Soluções possíveis, a aplicar somente após medir o impacto no dispositivo-alvo:

- carregar sob demanda, com `import()`, módulos que não são necessários na tela inicial, como perfis de andares superiores, missões e partes dos mapas táticos;
- configurar `build.rollupOptions.output.manualChunks` para separar módulos estáveis e áreas independentes da aplicação;
- inspecionar a composição do bundle com um visualizador antes de escolher os pontos de divisão;
- estabelecer um orçamento de desempenho e acompanhar tamanho transferido, tempo de carregamento e tempo de execução do JavaScript em um tablet representativo.
