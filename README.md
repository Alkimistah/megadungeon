# Mega Dungeon

Gerador procedural de exploração e encontros para Tormenta20. O app tem dois modos de jogo implementados: exploração estendida para os andares 1 a 10, representando um labirinto abstrato com eventos d100 e encontros finais curados; e mapa em grafo para os andares 11 a 20, representando uma região maior com nodos, rotas ramificadas e encontros por sala. Os andares 21 a 30 estão em planejamento como um arquipélago aberto.

## O que o app faz

- Para os andares 1 a 10, conduz um teste estendido por andar: ações de perícia acumulam sucessos, falhas geram eventos d100, presságios, vantagens, anomalias, encontros e mapas táticos.
- Para os andares 1 a 10, apresenta encontros finais por tier, sala especial da Aranha Matriarca no andar 10 e conclusão da etapa ao vencer o chefe.
- Para os andares 11 a 20, gera um mapa de nós com múltiplos níveis e caminhos ramificados.
- Cada nó do mapa 11 a 20 tem tipo de sala (normal, elite, armadilha, tesouro, boss, acampamento), perícia de descoberta, DC, ND calculado, ambiente (clima + terreno) e perfil de criatura quando aplicável.
- O jogador navega pelo mapa escolhendo rotas, marcando encontros como explorados ou tentados, e descansando em acampamentos.
- O estado completo da exploração é exportado como um código de sessão que pode ser copiado e restaurado a qualquer momento, sem conta e sem backend.
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
├── floorProfiles/    # Perfis dungeon1to10 e forest11to20
├── random.js         # RNG com seed (cyrb128 + sfc32)
└── sessionCode.js    # Codificação/decodificação do código de sessão
```

Toda a documentação técnica detalhada — arquitetura, sistemas, estrutura de dados, fluxo da aplicação e pontos de extensão — está em [`ARCHITECTURE.md`](ARCHITECTURE.md).

Documentos de requisitos por etapa:

- [`REQUISITOS_ANDARES_1_A_10.md`](REQUISITOS_ANDARES_1_A_10.md)
- [`REQUISITOS_ANDARES_11_A_20.md`](REQUISITOS_ANDARES_11_A_20.md)
- [`REQUISITOS_ANDARES_21_A_30.md`](REQUISITOS_ANDARES_21_A_30.md)

## Perfis de andar

Os perfis atuais são:

- `dungeon1to10`: exploração estendida dos andares 1 a 10, com ações por andar, tabela d100, efeitos mecânicos, mapas táticos, encontros finais e chefe do andar 10.
- `forest11to20`: mapa em nodos dos andares 11 a 20, usado como representação de uma área maior com rotas pré-geradas.

Para adicionar uma nova faixa de andares:

1. Criar `src/floorProfiles/meuPerfil.js` seguindo a estrutura do perfil mais próximo.
2. Exportar o novo perfil em `src/floorProfiles/index.js`.
3. Definir o modo de exploração, tema, regras de ND e regras específicas do perfil.

## Melhorias possíveis

- Adicionar mapas táticos aos encontros dos andares 11 a 20, mantendo o mapa em nodos como representação principal dessa faixa.
- Evoluir os andares 21 a 30 como arquipélago aberto com 10 ilhas e ilha final de boss bloqueada por progresso.

### Desempenho do bundle

O build de produção atual gera um alerta por possuir um chunk JavaScript acima de 500 kB: aproximadamente 1.008 kB minificado e 240 kB após gzip. Isso não é um bloqueio funcional, mas deve ser reavaliado se o primeiro carregamento ficar perceptivelmente lento nos tablets usados nas sessões, se o app passar a depender de conexões lentas ou se o bundle continuar crescendo.

Soluções possíveis, a aplicar somente após medir o impacto no dispositivo-alvo:

- carregar sob demanda, com `import()`, módulos que não são necessários na tela inicial, como perfis de andares superiores, missões e partes dos mapas táticos;
- configurar `build.rollupOptions.output.manualChunks` para separar módulos estáveis e áreas independentes da aplicação;
- inspecionar a composição do bundle com um visualizador antes de escolher os pontos de divisão;
- estabelecer um orçamento de desempenho e acompanhar tamanho transferido, tempo de carregamento e tempo de execução do JavaScript em um tablet representativo.
