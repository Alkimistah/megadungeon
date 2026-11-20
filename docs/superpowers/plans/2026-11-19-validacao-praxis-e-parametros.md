# Masmorra de Práxis e tabela de parâmetros

## Fichas da Masmorra de Práxis

As quatro fichas foram criadas para a campanha e não têm livro de referência. A validação compara cada uma com a Tabela 2-3 de Ameaças de Arton, Parâmetros de Criaturas, pp. 382–384 impressas, pp. 384–386 do PDF, lida nas páginas renderizadas, para o papel e o ND cadastrados. O dano médio considera a rotina completa de ataques.

| Ficha | Papel e ND | Ataque | Dano médio | Defesa | Resistências F/R/V | PV | CD |
|---|---|---|---|---|---|---|---|
| Aranha Matriarca | Solo, 4 | +16 (16) | 24 (24) | 23 (23) | 16/10/4 (16/10/4) | 140 (140) | 18 (18) |
| Mímico Menor | Especial, 2 | +12 (10) | 23 (18) | 18 (17) | 10/7/3 (13/7/2) | 80 (49) | 16 (18) |
| Aranhas Filhotes | Lacaio, 1 | enxame 3d4 | 7,5 automático (17) | 16 (15) | 5/11/0 (5/10/1) | 30 (9) | 14 (14) |
| Orc Enfraquecido | Solo, ¼ | +7 (6) | 9,5 (8) | 11 (11) | 3/–1/–1 (3/0/–2) | 20 (7) | — |

Entre parênteses, o valor da tabela.

- **Aranha Matriarca.** Coincide com a tabela em todos os parâmetros. As sete habilidades excedem a recomendação de uma a duas por patamar para um Solo iniciante, o que é coerente com o papel de chefe de andar.
- **Mímico Menor.** Os números ficam mais próximos de um Solo de ND 2 do que de um Especial: ataque 12, Defesa 19, PV 70 e CD 16 na tabela Solo. Como Especial, o ataque e o dano ficam acima, os PV ficam 63% acima e a CD fica 2 abaixo. A Fortitude +10 fica abaixo da resistência forte dos dois papéis, 13.
- **Aranhas Filhotes.** É o Enxame Larval de Kobolds, p. 180 impressa, adaptado, e o livro imprime aquele enxame como Solo. Os números coincidem com Solo de ND 1: Defesa 16, Reflexos 11, Fortitude 5, Vontade 0, CD 14 e PV próximos de 35. Como Lacaio, os PV ficam mais que três vezes acima da tabela. O dano automático de enxame fica abaixo dos dois papéis, como no Enxame Larval. A ficha registra que o enxame faz parte do desafio da matriarca e não rende XP próprio.
- **Orc Enfraquecido.** É uma cópia do Zumbi do Livro Básico, ND ¼ e PV 20, e herda o desvio de PV da ficha oficial. Nenhuma mudança é sugerida.

Nada foi alterado nas fichas. Papel e ND do Mímico Menor e das Aranhas Filhotes ficam para decisão do usuário.

## Divergência da tabela de parâmetros no código

`THREAT_PARAMETERS`, em `src/threatCreationRules.js`, deveria reproduzir a Tabela 2-3. A comparação célula a célula com o livro encontrou 182 divergências:

- **Solo e Especial.** As colunas Valor de Ataque e Resistência Forte estão trocadas em todas as linhas em que os valores diferem. No Solo de ND 1, o livro dá ataque 9 e Forte 11, e o código, ataque 11 e Forte 9.
- **Lacaio.** Dano médio, Defesa e Resistência Forte estão deslocados. O código guarda a Defesa do livro como dano médio, a Forte como Defesa e o ataque como Forte. O dano médio real do livro não aparece. No ND 5, o livro dá dano 56, Defesa 23 e Forte 16, e o código, dano 23, Defesa 16 e Forte 20.

As colunas PV, Resistências Média e Fraca e CD coincidem.

**Impacto.** A tabela alimenta a inferência de papel das fichas sem papel explícito. Com a tabela do livro, 35 dos 383 papéis inferidos mudariam, todos para Lacaio: Rato Gigante, Naja, Gali-Gali, Galhada Macho, Galhada Fêmea, Orc Combatente, Orc Mutante e sua versão do Básico, Guarda de Cidade, Trog, Goblin Salteador, Hobgoblin Soldado, Decúria, Legionário, Legionário Insano, Gnoll Capanga, Bugbear Sentinela, Iniciado da Agonia, Bandido Selvagem, Jagunço, Meio-Orc Capanga, Tabrachi Soldado, Ceratops Guerreiro, Goblin de Sombreiro, Pirata, Pteros Ceifador, Cão de Kally, Kaijin Capanga, Fanático Lefou, Líder Fanático Lefou, Trog Combatente, Lefeu Veridak, Nuvem de Estirges, Infecto e Turba de Infectos. A maior parte coincide com os papéis de Lacaio impressos que a auditoria de Ameaças registrou como divergentes.

A tabela também alimenta as variantes elite geradas em `createEliteVariant`, em `src/encounterResolver.js`. O ataque, o dano médio, a Defesa e as resistências dessas variantes vêm dela. Hoje, uma variante elite Solo ou Especial recebe a Resistência Forte da tabela como bônus de ataque, e uma variante elite Lacaio recebe a Defesa do livro como dano médio e a Resistência Forte como Defesa. O erro aparece na mesa sempre que um encontro gera uma variante elite.

A correção muda a geração de encontros e os papéis inferidos, por isso fica pendente de decisão. Ao aplicá-la, revisar os testes que fixam papéis atuais e as recomendações de criação e modificação de ameaças que leem a mesma tabela.
