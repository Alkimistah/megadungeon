# Tela inicial, modais em tela cheia e barra de ferramentas

Pedidos e decisões do PO em 21/11/2026. As prévias visuais aprovadas estão em `.playwright-mcp/tela-inicial/v4-bronze-final-*` e `.playwright-mcp/modais/proposta-*`. Essa pasta não é versionada; as prévias servem como referência durante a execução.

## Intenção

A tela inicial é a primeira coisa que se vê no app, e hoje ela parece um formulário técnico: botões parecidos que fazem coisas diferentes, um campo de colar código que ninguém usa e as cores herdadas da faixa ativa. O PO a usa assim no tablet, sempre no mesmo aparelho:

- **O grupo terminou a sessão dentro da masmorra:** ele toca em **Continuar**.
- **O grupo saiu na sessão anterior:** ele começa uma **nova expedição** e escolhe a faixa.
- **Ele perdeu o “continuar”** (por exemplo, testou algo entre sessões): ele **importa o arquivo `.txt`**. É um caminho de recuperação, raro.

Também quer rolar tesouros ou gerar um encontro sem precisar entrar numa faixa. Além disso, quer que todas as modais se comportem como as de Nodo e Tesouros, em tela cheia, e que os botões da barra de baixo tenham nome, não só ícone.

**Objetivos:** deixar claro o que fazer ao abrir o app, dar identidade própria à tela inicial, padronizar as modais e deixar as ferramentas legíveis.

**Não objetivos:** guardar mais de uma expedição. O PO quer ocupar pouco espaço no aparelho. Também não fazem parte novas formas de “caminhos desconhecidos” para o arquipélago, que ficam para depois.

**Anti-objetivos:** perder uma expedição sem aviso, e uma tela inicial clara ou cheia de texto explicativo.

## 1. Tela inicial

### Identidade

- **Título:** “Mega Dungeon de Práxis”, com “de Práxis” na cor de destaque.
- **Subtítulo:** “Gerador de aventuras para Tormenta20”.
- **Paleta própria, sempre escura (modo noturno),** que não depende do tema de nenhuma faixa. É a paleta “bronze” da prévia:

| Uso | Valor |
|---|---|
| Fundo | `#13100d`, com um brilho radial leve no topo (`rgba(180,138,78,.10)`) |
| Fundo secundário | `#1b1611` |
| Cartão | `#211b15` |
| Borda | `#4b3c2b` |
| Destaque (bronze) | `#b48a4e` |
| Texto (pergaminho) | `#ecdfc4` |
| Texto secundário | `#a8977a` |

Ao entrar numa faixa, o app aplica o tema da faixa, como já faz hoje. A paleta da tela inicial fica restrita a ela.

### Estrutura (uma coluna, de cima para baixo)

1. **Cabeçalho:** título, subtítulo e o botão **Instalar app** no canto. Esse botão continua chamativo como hoje e só aparece quando o app ainda não está instalado.
2. **Continuar expedição.** Só aparece quando existe uma expedição salva válida. É um bloco largo com a borda em bronze. Mostra “Continuar expedição”, a linha “<Faixa> · Andares X–Y · parado no Andar N” e um botão “Continuar ›”.
3. **Nova expedição:**
   - **Três cartões de faixa, tocáveis, lado a lado.** Cada um tem um ícone, um nome, os andares e uma frase:

| Faixa | Ícone | Nome | Frase |
|---|---|---|---|
| 1–10 | `assets/icons/game-icons--dungeon-gate.svg` | Masmorra | Grande labirinto de corredores e salas |
| 11–20 | `assets/icons/game-icons--forest.svg` | Floresta | Exploração em florestas, pântanos e colinas |
| 21–30 | `assets/icons/game-icons--island.svg` | Arquipélago | Reúna os fragmentos e explore o arquipélago |

   - **O cartão escolhido** ganha a cor de ação da faixa (borda, fundo em degradê e um “✓”). O botão de iniciar acompanha essa cor e o nome, por exemplo “Iniciar floresta ›”. Um cartão vem escolhido de início: o da faixa da expedição salva ou, sem expedição salva, o da Masmorra.
   - **Caminhos desconhecidos** vira um interruptor com a explicação “A rota de cada andar se revela conforme o grupo avança.” Ele aparece só nas faixas que suportam a opção, hoje as de modo `node-map` (11–20), com a mesma regra de `syncInitialUnknownPathsVisibility`.
   - **Botão Iniciar.**
4. **Ferramentas rápidas:** dois botões largos com ícone e nome, **Rolar tesouros** e **Encontro avulso**. Eles abrem as modais de Tesouros e de Encontro manual sem entrar numa faixa. Ao fechar a modal, o usuário volta à tela inicial.
5. **Rodapé:** dois botões com borda, com aparência de botão e não de link: **Sobre o app** à esquerda e **Importar arquivo de sessão** à direita, no mesmo estilo.

### Modal “Sobre o app”

O botão **Sobre o app** abre uma modal em tela cheia, que segue o padrão da seção 2 e a paleta da tela inicial, por cima da tela inicial. O texto abaixo foi aprovado pelo PO. Os títulos são as seções da modal.

> **Para que serve**
> O Mega Dungeon de Práxis é um gerador de aventuras para Tormenta20 pensado para usar na mesa, no tablet do mestre. Ele conduz uma expedição pela Mega Dungeon, andar por andar: sorteia caminhos, cenas, encontros, missões e tesouros, e guarda o progresso para a próxima sessão. O mestre continua no controle; o app cuida das tabelas e da memória da expedição.
>
> **As faixas de andares**
> - **Masmorra (andares 1 a 10).** Um grande labirinto de corredores e salas. Cada andar é uma travessia: o grupo escolhe abordagens de perícia, acumula sucessos e falhas, e cada falha revela uma cena do d100 (encontros, obstáculos, presságios, vantagens). O andar 10 guarda o desafio final da faixa.
> - **Floresta (andares 11 a 20).** Exploração em florestas, pântanos e colinas, num mapa de nodos com rotas que se ramificam. Cada nodo é uma sala com encontro, armadilha, tesouro ou acampamento. Com **Caminhos desconhecidos**, a rota se revela conforme o grupo avança.
> - **Arquipélago (andares 21 a 30).** O grupo navega entre ilhas para reunir os fragmentos, administrando os dias de viagem e enfrentando o que cada ilha esconde.
>
> **O que cada opção faz**
> - **Continuar expedição:** retoma a expedição salva exatamente de onde o grupo parou.
> - **Nova expedição:** escolha a faixa e comece do primeiro andar dela. Se já houver uma expedição salva, o app pergunta antes de substituí-la.
> - **Rolar tesouros:** gera tesouros pelas tabelas do Livro Básico (e dos livros de apoio), com preços e páginas, sem precisar entrar numa expedição.
> - **Encontro avulso:** monta um encontro por orçamento de ND, terreno e tipo de criatura, para usar fora da expedição.
> - **Importar arquivo de sessão:** recupera uma expedição a partir do arquivo `.txt` exportado durante o jogo.
> - **Instalar app:** coloca o app na tela inicial do aparelho; depois de instalado, ele funciona sem internet.
>
> **Como usar na mesa**
> Durante a expedição, o progresso é salvo automaticamente no aparelho, e só existe uma expedição salva por vez. Ao fim de cada sessão, vale exportar o arquivo de sessão pelo botão no topo da tela, como garantia. Ao vencer o desafio final de uma faixa, o app oferece avançar para a próxima ou encerrar a expedição.
>
> **Sobre o projeto**
> O app nasceu para a Mega Dungeon de Práxis, a masmorra que se estende sob a cidade de Práxis, e acompanha as expedições dessa campanha. As faixas, porém, servem para qualquer aventura parecida: a Masmorra funciona para outras explorações de masmorras, e a Floresta e o Arquipélago para explorações nos ermos. Basta escolher a faixa de andares cujo nível e ambiente combinam com a exploração da sua mesa. Tormenta20 é um jogo da Jambô Editora; este app é um projeto de fã, sem vínculo oficial.

O texto foi revisado pelo PO: Práxis é a cidade onde fica a Mega Dungeon, e o crédito dos ícones fica só no `CREDITOS.md`.

### Remoções

- O campo **“Seed de sessão”** (`#seedInput`) e o seu tratamento em `main.js` saem. O arquivo `.txt` cobre a recuperação.
- O `<select>` de faixa (`#floorRangeInput`) é substituído pelos cartões. Os roteiros de QA que usam `selectOption` nele precisam ser ajustados. Pode ser mantido um valor interno equivalente, desde que acessível.

### Regras de expedição

- **Nova expedição com uma já salva:** antes de iniciar, o app pede confirmação: “A expedição em andamento (<Faixa>, Andar N) será substituída. Continuar?”. Cancelar volta para a tela inicial sem mudar nada. Não se guardam expedições anteriores.
- **Fim de faixa.** Ao derrotar o chefe do último andar da faixa, o app oferece duas opções:
  - **“Avançar para <próxima faixa>”**: começa a próxima faixa do zero. O Continuar passa a apontar para ela. Hoje a ordem é 1–10 → 11–20 → 21–30.
  - **“Encerrar expedição”**: apaga o salvamento automático, então o Continuar some da tela inicial, e volta à tela inicial.
  - **Na última faixa existente (21–30),** só aparece **Encerrar expedição**.
  - O ponto de conclusão de cada faixa já existe: `phase === "completed"` nos andares 1–10 e “Faixa concluída” no mapa de nodos. O builder localiza o equivalente no arquipélago.

## 2. Modais em tela cheia

- **Mesmo padrão.** Todas as modais seguem o de `#nodeDialog` e `#treasureDialog`: `100vw × 100vh`, sem cantos arredondados, `inset: 0` e `margin: 0`. Isso vale para:
  - a tela inicial (`#rangeDialog`);
  - Missões (`#missionDialog`, nos modos de seleção e de acompanhamento);
  - Encontro manual (`#manualEncounterDialog`);
  - a modal da ilha do arquipélago (`.archipelago-dialog`).
- **Conteúdo alinhado ao topo.** Em telas largas, o conteúdo pode ter uma largura máxima centralizada, de cerca de 1100 px, para não esticar os campos. Ele não pode ser distribuído pela altura (veja `proposta-encontro-tela-cheia-*`).
- **Fora do padrão:** o mapa tático em tela cheia (`.tactical-map-fullscreen`) já é tela cheia e não muda.
- **Ícone de fechar:** continua o mesmo. O PO o lê como “tirar da tela”.

## 3. Barra de ferramentas (rodapé fixo)

- **Rodapé fixo com espaço próprio.** A barra (`.floating-tools`) deixa de flutuar sobre o conteúdo. Ela fica ancorada no fundo da tela e não se move quando a página rola, como o rodapé da modal do nodo (Voltar, Mapa, Avançar). Tem fundo próprio e borda superior.
- **Espaço reservado.** A página ganha um espaço no fim igual à altura da barra, para o último bloco nunca ficar coberto.
- **Nomes nos botões.** Cada botão mostra o ícone e o nome: **Recarregar**, **Encontro**, **Missões** e **Tesouros**. O contador **Tempo de exploração** fica no mesmo rodapé, à direita.
- **Tamanhos de tela.** A barra precisa caber sem quebrar em 1024×768 e em 768×1024 (veja `proposta-barra-com-nomes-*`). Em telas estreitas, como um celular, os nomes podem ser omitidos e só o ícone fica, desde que o `aria-label` continue.

## 4. Créditos dos ícones

Os ícones do game-icons.net são CC BY 3.0, tanto os novos quanto os que o app já usava, como `game-icons--tied-scroll.svg`. O PO não quer o crédito na tela. Ele vai para um arquivo `CREDITOS.md` na raiz do repositório, que é público. O arquivo lista os ícones de terceiros, o autor (Lorc, Delapouite e outros, conforme o site), a licença e o link.

## Decisões do gerente (respostas à leitura do builder)

1. **Ferramentas rápidas não mexem na expedição salva.** Abertas a partir da tela inicial, as modais de Tesouros e de Encontro manual não gravam no salvamento automático nem mudam a faixa ativa. O Encontro avulso usa o contexto neutro que a modal já aceita (orçamento de ND e terreno escolhidos pelo usuário). Se alguma parte depender da faixa ativa, use a faixa do cartão escolhido sem iniciar uma sessão. Um teste garante que o Continuar segue igual depois de usar as ferramentas.
2. **Expedição salva válida** é a mesma conferência de `offerSavedExpedition`, e a confirmação de substituição usa esse mesmo critério. Se o Continuar falhar ao restaurar, a mensagem passa a ser “Não foi possível continuar a expedição salva. Você pode importar o arquivo de sessão.” **Importar um arquivo** com uma expedição salva também pede a mesma confirmação, porque o arquivo substitui o salvamento.
3. **Nenhuma chave nova de armazenamento.** A faixa inicial dos cartões vem da expedição salva.
4. **As ferramentas rápidas abrem por cima da tela inicial.** A tela inicial continua aberta embaixo. Ao fechar a ferramenta, o foco volta para o botão que a abriu. Esc fecha só a ferramenta.
5. **Fim de faixa.** O ponto de conclusão é:
   - nos andares 1–10, a fase `completed`;
   - nos andares 11–20, “Faixa concluída”;
   - nos andares 21–30, “Concluir boss” na ilha 30.
   
   As opções Avançar e Encerrar aparecem no próprio bloco de conclusão de cada modo, sem modal nova. **Avançar** segue o mesmo fluxo de uma expedição nova, incluindo a seleção de missões, mas sem a confirmação de substituição, porque a faixa anterior já terminou.
6. **Rodapé fixo e modais.** As modais em tela cheia ficam por cima do rodapé, e isso é intencional. A modal do nodo, por exemplo, tem o próprio rodapé. A tela inicial também cobre o rodapé, porque Recarregar e Missões dependem de uma sessão.
7. **QA.** Os roteiros passam a clicar nos cartões. Eles são botões com `data-range="<id do perfil>"` e o nome da faixa como rótulo acessível. Não fica `<select>` escondido.
8. **Prévias.** A tabela de cores e as medidas deste documento são a referência. As imagens em `.playwright-mcp/` ajudam, mas não são obrigatórias.

## Abordagens consideradas

- **Seleção de faixa:** foram mostrados cartões com arte (A), uma trilha de descida (B) e uma lista colorida (C). O PO escolheu A.
- **Paleta:** bronze ou couro. O PO escolheu bronze.
- **Layout:** uma ou duas colunas. O PO escolheu uma coluna.
- **Expedição sobrescrita:** confirmação (A), guardar a anterior (B) ou as duas (C). O PO escolheu A, para não ocupar espaço.

## Deixado ao builder

- Os nomes de classes, a estrutura do HTML e a organização do CSS, seguindo os padrões de `styles.css`.
- Como a paleta da tela inicial convive com `applyTheme`, por exemplo com variáveis de escopo em `#rangeDialog`.
- O texto exato do botão “Avançar para …”, que usa o nome da próxima faixa.
- O ajuste dos roteiros de QA que dependem de `#seedInput`, `#floorRangeInput` e da barra flutuante.
