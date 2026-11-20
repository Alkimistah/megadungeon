# Auditoria do catálogo de criaturas

## Objetivo

Usar os quatro PDFs integrais em `tmp/livros/` como referência das fichas publicadas. A auditoria precisa indicar quais fichas de cada livro foram localizadas, a qual registro correspondem e quais diferenças exigem revisão.

## Progresso por livro

- **Livro Básico — Jogo do Ano.** Primeira rodada publicada com 80 fichas inventariadas e referências atualizadas. O plano acompanha as diferenças entre livros e as versões já publicadas. [Plano da primeira rodada](../plans/2026-11-18-auditoria-livro-basico.md)
- **Ameaças de Arton.** As 335 fichas de Ameaças do catálogo foram conferidas contra o PDF integral e publicadas. Os blocos de Reinos de Moreania a Trolls Nobres e 12 fichas de Uivantes não estão no catálogo e ficam anotados para cadastro futuro. Familiares fica fora do catálogo. [Relatório e cadastro futuro](../plans/2026-11-18-auditoria-orcs-ameacas.md#cadastro-futuro)
- **Deuses de Arton e Heróis de Arton.** PDFs disponíveis. As variantes de Deuses dos avatares de Aharadak e Kallyadranoch já foram conferidas. O inventário de cada livro segue pendente.

## Método

A unidade de cobertura é o livro e a unidade de validação é a ficha. Um inventário por livro permite conferir se alguma ficha foi pulada, inclusive quando ela tem o mesmo nome de outra fonte. Uma auditoria por tipo de criatura acompanha melhor a divisão dos arquivos do catálogo, mas exigiria reexaminar as mesmas seções dos PDFs para provar a cobertura. Os tipos servem como filtro no relatório.

1. Identificar edição ou versão, quando disponível, e localizar os blocos de ficha com página impressa e página do PDF integral, contada a partir de 1. Em Heróis de Arton, verificar primeiro quais blocos são fichas de criatura. Padronizar os rótulos tipográficos fragmentados, especialmente em Deuses de Arton.
2. Cruzar nomes e aliases com o catálogo, preservando IDs. Comparar ND, tipo, subtipo, tamanho, atributos, PV, Defesa, Iniciativa, Percepção e sentidos, resistências, deslocamentos, ataques, habilidades, perícias e demais campos quando aplicáveis. Distinguir diferenças semânticas de formatação ou transcrição. A revisão manual resolve correspondências ambíguas e campos em texto corrido.
3. Registrar, por ficha, o resultado da validação, as diferenças e a decisão. Distinguir ausências, variantes da mesma fonte, versões homônimas de outros livros e alterações próprias da campanha. As fichas ambíguas continuam pendentes até a confirmação. Ausência no relatório automatizado não comprova ausência no livro.

O inventário inclui ameaças, NPCs, avatares e criaturas invocáveis com ficha própria. Perigos, equipamentos e blocos parciais ficam fora do inventário de criaturas. Se a classificação for ambígua, registrar o caso no relatório.

## Referências e versões

- A referência de cada ficha publicada identifica livro, edição ou versão quando identificável, página impressa e página do PDF integral. Fichas que atravessam páginas registram o intervalo. As referências auditadas substituem os apontamentos aos PDFs recortados.
- Duas fichas homônimas de livros diferentes permanecem como registros separados. A versão que já existe conserva o ID. A nova recebe um ID distinto relacionado à fonte, com agrupamento explícito entre as versões para o sorteio. A lista de combate mostra livro ao lado do nome quando há homônimos. A ficha aberta mostra a referência completa.
- Criações e adaptações locais ficam identificadas como Masmorra de Práxis. Se houver uma criatura-base identificável, registrar essa relação sem confundir a adaptação com a ficha do livro.
- Os PDFs e os relatórios com dados extraídos ficam em `tmp/livros/`, já ignorado pelo Git. O fluxo é local.

## Seleção manual e geração automática

- A seleção manual oferece todas as versões pelo ID e identifica a fonte no seletor e no combate. A nova opção de escolha exata abre um encontro com a ficha selecionada e seu ND. O fluxo atual de geração manual por filtros continua disponível.
- Cada perfil usa uma versão por grupo de homônimos no sorteio automático. A ficha já usada é o padrão para os perfis existentes, salvo alteração explícita no perfil. A mesma restrição vale para rerrolagens e para fluxos automáticos que escolhem alvos do catálogo. Encontros curados, missões em andamento e sessões importadas que já apontem para um ID continuam resolvendo aquela ficha.
- A manutenção precisa revisar os consumidores do catálogo no resolvedor de encontros e no gerador de missões, além das listas de IDs por perfil. Manter o catálogo completo acessível por ID e limitar candidatos no momento do sorteio evita que a preferência do perfil interfira na consulta ou restauração de uma ficha.
- O sorteio seleciona a versão do perfil antes de aplicar as restrições de ND, terreno e tipo. Quando ela fica inelegível, o sorteio busca outra criatura elegível. Uma versão alternativa exige configuração explícita do perfil ou seleção manual.
- Separar as correções de referência das mudanças mecânicas no registro da auditoria. Um ID estável preserva o vínculo, mas um fluxo que consulte o catálogo ao reabrir a ficha pode passar a mostrar as estatísticas corrigidas. Revisar mudanças que afetem ND, agrupamento, mapas, objetivos ou conteúdo de saves antes de incorporá-las.

## Aceite da primeira rodada

- Cada ficha identificada no Livro Básico tem correspondência validada, proposta de inclusão ou pendência justificada, com fonte e localização rastreáveis.
- Um par homônimo, real ou de teste, comprova que a seleção manual mostra ambas as fontes e que cada perfil oferece uma só versão no sorteio automático, inclusive na rerrolagem.
- Um save anterior que referencia o ID original continua abrindo a ficha correta. Os encontros e objetivos fixos continuam resolvendo seus IDs.
- As referências confirmadas ficam atualizadas e as diferenças mecânicas ficam registradas para revisão. Os testes de missões e dos perfis que usam o catálogo continuam passando.
