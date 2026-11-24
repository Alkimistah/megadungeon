# Revisão da grade tática

## Escopo

Migrar as grades existentes dos andares 1–10, 11–20 e 21–30, incluindo encontros, setores, arenas, convés da liburna e mapas de missão. Aproveitar os geradores e layouts atuais e corrigir as divergências entre a ficha e a grade na migração.

Depois da migração, construir mapas-base por ambiente, começando com poucas variações para os andares 1–10. A partir dos andares 11–20, ampliar o repertório e reaproveitar layouts em andares futuros quando forem compatíveis com o cenário definido.

## Modelo de cena

- O terreno usa uma grade de células com sprites originais em pixel art. Água rasa, água profunda e correnteza têm aparência própria, assim como penhasco e fosso.
- Efeitos locais e marcadores são sobrepostos ao terreno. Teia, vento e visibilidade reduzida podem coexistir com qualquer terreno previsto pelo cenário. Clima de cena inteira aparece no cabeçalho. Objetivos, armadilhas, reforços e ameaças ocultas têm marcadores próprios.
- Cada peça tem identidade, nome, lado, posição e dimensões em células. Criaturas do encontro apontam para a respectiva ficha. Minúsculas, Pequenas e Médias ocupam 1×1, Grandes 2×2, Enormes 3×3 e Colossais 6×6 (9 m de lado no Livro Básico, p. 107). O token é redondo e o contorno de seleção mostra sua área quadrada.
- Nomes compactos aparecem na peça. Rei Tirano usa RT e dois Deinonicos usam D1 e D2. Peças adicionadas recebem uma abreviação do nome, com numeração quando a abreviação se repete no mesmo lado. O nome completo aparece ao selecionar.
- Um objetivo de localização fica nas coordenadas da cena. Quando o objetivo marca uma criatura, ele acompanha a identidade da peça correspondente.

## Uso em mesa

- Arrastar com mouse ou toque encaixa a peça na grade. Setas também movem a peça selecionada. O mestre pode sobrepor peças e colocá-las sobre água, lava ou obstáculos. A proposta, testada na prévia, é manter a peça inteira dentro do tabuleiro.
- A quantidade de jogadores configura somente a formação inicial. A localização proposta para esse ajuste é a configuração da fase. O mestre pode adicionar e remover peças temporárias durante o encontro, informando nome, porte e lado aliado ou inimigo. Isso cobre, por exemplo, invocações de ambos os lados.
- Posições movidas e peças temporárias ficam em memória enquanto o mesmo encontro estiver aberto. Recolher o mapa, consultar fichas e atualizar PV conserva a disposição. Abrir outro encontro encerra esse estado temporário. Ao recarregar o app ou importar um arquivo, a grade começa pela formação inicial. A proposta é reconstruir posições iniciais a partir dos dados de cena já salvos e incluir posições na exportação só se a cena não puder ser reconstruída dessa forma. Importações antigas aproveitam posições iniciais válidas e aplicam as correções entre ficha e grade ao reconstruir a apresentação.

## Coerência entre ficha e grade

A definição do cenário é a referência para o conteúdo tático. Cada obstáculo, perigo, área ou efeito com regra que aparece na grade deve estar previsto na ficha. Cada elemento localizado previsto na ficha deve ocupar uma posição ou área identificável no mapa e ter representação explicada na legenda. Efeitos globais permanecem visíveis no cabeçalho. Detalhes decorativos de sprites podem variar sem adicionar regras.

Durante a migração, corrigir os pontos em que o gerador introduz efeitos sem previsão, como símbolos de armadilha derivados de tempestade em cenas sem armadilha. Quando o cenário distingue dois tipos, como borda rasa e canal fundo, usar os dois no mapa. Conferir a representação de áreas e marcadores sem encobrir o terreno.

## Abordagens

- **HTML/CSS com eventos nativos.** Reaproveita a base atual, com elementos HTML para peças e acesso pelo teclado. A prévia demonstrou encaixe e arraste por mouse e toque. É a proposta para a implementação.
- **HTML/CSS com interact.js.** Acrescentaria encaixe e gestos via dependência. Continua como opção caso os testes no app revelem uma necessidade concreta.
- **Canvas com Konva.** Oferece camadas e arraste, com maior mudança de renderização. Fica como alternativa se o uso futuro pedir navegação e composição visual mais elaboradas.

## Validação

Conferir exemplos de cada contexto, incluindo os mapas predefinidos dos primeiros andares e encontros de floresta, arenas, convés e missão por ilha. Comparar ficha, mapa e legenda. Testar peças 1×1 a 6×6, arraste por mouse e toque, sobreposição, alternância de painel, troca de encontro, configuração de grupo, invocações e exportação sem estado temporário.

## Submersão e repertório de terrenos

Quando o cenário define **Personagens submersos** como condição da cena, a água profunda é a base da área de combate e cobre a formação inicial. Uma floresta submersa com chuva tem água profunda em todo o fundo, com árvores e outros elementos previstos sobre ela. Chuva permanece no cabeçalho. Margens rasas, terra firme e obstáculos entram onde a definição do cenário os prevê. Uma zona de submersão explicitamente localizada afeta somente a área indicada.

O Livro Básico de Tormenta20, edição Jogo do Ano, páginas impressas 268–269 (PDF 274–275), é a referência para a distinção entre elementos e efeitos. Essas páginas descrevem inclinação suave, inclinação íngreme, penhasco, dunas, abismo, paredão, seixos, gelo, rio congelado e combate submerso. A grade deve representar suave e íngreme de forma distinta. O paredão é uma escarpa vertical, o abismo é uma fenda, seixos modificam uma inclinação íngreme e dunas seguem uma variante da inclinação em areia. Gelo e rio congelado têm representações distintas, pois o rio pode romper e expor água abaixo. A migração oferece representação para esses casos. Cada cenário determina quais entram na geração.

## Acabamento validado em navegador

O rodapé do painel de ambiente concentra a identificação da peça selecionada e os controles de adicionar e remover. A janela de inclusão fecha após adicionar. O mestre pode remover qualquer peça do encontro, e a remoção é temporária como o arraste. O contador soma o custo em quadrados dos trechos enquanto a peça permanece selecionada. O X vermelho marca a área inicial durante o gesto. O cálculo usa a regra de diagonais e terreno difícil do Livro Básico, pp. 238 e 268.
