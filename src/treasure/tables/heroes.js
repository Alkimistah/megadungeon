import { listTable } from "./schema.js";

// Heróis de Arton, Capítulo 3. Transcrito das páginas renderizadas do PDF (página impressa = PDF − 2).
// Cada linha é um item, na ordem impressa: "Nome|preço". As linhas de munição que o livro imprime
// sob uma arma (ex.: "Flechas (20)") viram itens próprios, na posição em que aparecem.
// Os itens mágicos específicos trazem a coluna "Categoria" (Média no livro = "médio" no motor).
const base = { book: "Heróis de Arton" };
const shield = (name) => (/^(Escudo|Broquel|Sagna)/.test(name) ? "escudo" : "armadura");

// Tabela 3-1, PDF 220 e 221 (continuação).
const TABLE_3_1 = `
Bastão lúdico|5
Besta de mão|30
Virotes (20)|2
Adaga oposta|12
Agulha de Ahlen|10
Cinquedea|18
Dirk|15
Martelo leve|2
Espada larga|8
Espadim|300
Maça-estrela|20
Serrilheira|25
Bico de corvo|15
Desmontador|20
Espada de execução|75
Lança de justa|3
Malho|8
Martelo longo|12
Tan-korak|40
Tai-tai|60
Arco montado|45
Flechas (20)|1
Besta dupla|125
Virotes (20)|2
Kimbata|12
Clava-grão|90
Espada canora|50
Espada-gadanho|40
Khopesh|20
Lança de falange|15
Machado de haste|40
Rapieira|50
Marrão|50
Montante cinético|3.000
Boleadeira|12
Chakram|15
Arco de guerra|200
Flechas (20)|1
Balestra|180
Virotes (20)|2
Besta de repetição|250
Virotes (20)|2
Garrucha|250
Balas (20)|20
Canhão portátil|3.000
Bola de ferro (1)|5
Sifão cáustico|600`;

// Tabela 3-2, PDF 225.
const TABLE_3_2 = `
Bola de ferro (1)|5
Flechas assobiadoras (20)|20
Flechas de caça (20)|10
Flechas pesadas (20)|10
Virotes pesados (20)|20`;

// Tabela 3-3, PDF 226.
const TABLE_3_3 = `
Armadura sensual|55
Armadura de folhas|75
Armadura de engenhoqueiro goblin|85
Cota de moedas|350
Colete fora da lei|750
Brigantina|75
Armadura de chumbo|750
Armadura de justa|1.200
Armadura de hussardo alado|4.500
Armadura de pedra|5.500
Broquel|25
Escudo de vime|15
Escudo torre|45
Sagna|20`;

// Tabela 3-4, PDF 230 (coluna da esquerda e depois a da direita) e 231 (continuação).
// "Mercenário (por cena)" é só um título no livro: os quatro itens abaixo dele levam o título no nome.
// Erros de impressão: "R$ 60" no Gás moroso (lido como T$ 60) e "Análgésico" (mantido como impresso).
const TABLE_3_4 = `
Ábaco|45
Ampulheta|45
Aparelho de chá|30
Astrolábio|90
Armação para mochila|50
Asas do texugo|200
Bainha adornada|100
Bússola|45
Cinto de utilidades|50
Condecoração militar|—
Dente falso|300
Diagrama anatômico|75
Espelho refletor|45
Estetoscópio|60
Estrepes (bolsa para 3m)|5
Favor da pessoa amada|—
Lampião de foco|15
Leque|3
Livro de métodos anti-Nimb|100
Lupa|30
Mapa|30
Mecanismo de mola|25
Mochila discreta|20
Prancheta|5
Sinete|50
Apito de caça|6
Baralho marcado|15
Espelho cirúrgico|12
Estandarte|15
Estandarte portátil|20
Molde pré-fabricado|500
Clarim deheoni|150
Cítara heptatônica|250
Cornamusa de Doherimm|750
Flauta sar-allan|150
Gaita de foles|500
Lira de casco de tartaruga|300
Marionetes|90
Pandeiro das estradas|200
Tamborete marcial|80
Trombeta tapistana|300
Violino soprano|300
Avental de forja|75
Camisolão|12
Capa com dragonas|50
Casaca de apetrechos|75
Chapéu emplumado|50
Elmo leve|15
Elmo pesado|200
Jaqueta de couro|15
Luva de falcoaria|15
Luva magnética|20
Máscara bucal|3
Máscara completa|15
Máscara de baile|25
Máscara de soldador|50
Monóculo|50
Óculos de aeronauta|15
Palmar|12
Peruca|20
Rondel|150
Roupão elegante|150
Rufo|25
Sapatos confortáveis|6
Sapatos de salto alto|18
Veste acolchoada|60
Compasso místico|600
Flauta convocadora|300
Mandala onírica|300
Varinha armamentista|600
Ácido concentrado|60
Análgésico|60
Estalinho Gury|30
Extrato de gelo eterno|60
Extrato de oxxdon|180
Frasco abissal|300
Pó de cinza|5
Pó do aparecimento|30
Visco persistente|25
Cristal reflexivo|30
Essência fantasmal|30
Noz saltadora|90
Presa de Hyninn|45
Bolor hemorrágico|60
Fumaça onírica|150
Gás moroso|60
Seiva necrótica|120
Captador de luz|450
Comutador|300
Conversor-alimentador|300
Engenho de automação|600
Espera para melhorias|150
Estabilizador|900
Estimulador de sobrecarga|750
Gatilho de corda|1.500
Giroscópio|450
Ligação de convergência|300
Remontagem de portabilidade|300
Sequenciador de ativação|600
Sistema de refrigeração|900
Supressor de segurança|300
Transformador místico|600
Baga celeste cozida|15
Cozido de pimenta|10
Manjar de sombras|20
Baba de troll|30
Barba queimada|45
Cerveja deheoni|15
Dilínio|600
Grogue negro|15
Grogue rubro|45
Hidromel uivante|21
Licor feérico|450
Sidra ahleniense|45
Vinho Pruss|60
Vinho élfico|90
Armadura de montaria leve|600
Armadura de montaria pesada|3.000
Arreios namalkahnianos|50
Caparazão|75
Estribos|60
Ornamento|50
Barcaça|3.000
Biga de guerra|250
Dirigível goblin|1.200
Jangada|60
Veleiro|10.000
Banho quente|10
Bigode encerado|20
Instrução marcial|300
Maquiagem profissional|30
Mercenário (por cena): parceiro iniciante|30
Mercenário (por cena): parceiro veterano|150
Mercenário (por cena): capangas iniciantes|90
Mercenário (por cena): capangas veteranos|300
Ópera|200
Sarau informativo|150`;

// Tabela 3-9, PDF 259.
const TABLE_3_9 = {
  médio: `
Adaga da bruma|27.000
Arco das sombras|27.000
Arco do crepúsculo|22.500
Florete do vendaval|27.000
Machado da natureza|22.500
Martelo do titã|22.500`,
  maior: `
Azagaia fantasma|30.000
Besta estelar|30.000
Clava de lava|45.000
Espada da tempestade|45.000
Espada do guardião|54.000
Espada solar|45.000
Lança da fênix|100.000
Machado do abismo|36.000
Machado do vulcão|54.000
Martelo da terra|33.000
Punhal das profundezas|36.000`,
};

// Tabela 3-10, PDF 261.
const TABLE_3_10 = {
  médio: `
Cota da serpente marinha|27.000
Escudo da luz estelar|27.000
Escudo da natureza viva|27.000
Escudo do grifo|27.000`,
  maior: `
Armadura das sombras profundas|40.500
Armadura do dragão ancião|100.000
Armadura do inverno perene|40.500
Couraça do guardião celeste|54.000
Escudo da ira vulcânica|54.000
Escudo do trovão|54.000`,
};

// Tabela 3-11, PDF 264.
const TABLE_3_11 = {
  médio: `
Cajado das marés|27.000`,
  maior: `
Cálice sagrado|150.000
Relógio do arcanista|60.000
Varinha milenar|200.000`,
};

// Tabela 3-12, PDF 267 (coluna da esquerda e depois a da direita).
const TABLE_3_12 = {
  menor: `
Algibeira mordedora|1.000
Algibeira provedora|6.000
Amuleto da visão etérea|3.000
Anel da proteção mental|9.000
Berço das fadas|9.000
Chapéu dos truques infinitos|9.000
Cinto da leveza graciosa|9.000
Cinturão do trobo|3.000
Corda da resignação|7.500
Cristal da voz silenciosa|9.000
Cristal do tempo célere|9.000
Elixir da eternidade|3.000
Elixir da mente dividida|1.500
Gaiola dos arcanos|6.000
Lâmpada da ilusão impecável|6.000
Monóculo da franqueza|4.500
Ocarina da melodia distante|9.000
Olhos do corvo|9.000
Papiro das estrelas|1.500
Pena da criação|6.000
Pergaminho da verdade cósmica|9.000
Pérola da nulificação|3.000
Saco dos ventos silenciosos|3.000`,
  médio: `
Ampulheta da harmonia temporal|10.500
Amuleto do amparo|10.500
Anel da beleza ilusória|21.000
Anel do pacto oneroso|15.000
Bastão da grande harmonia|25.500
Bastão do sonhador|21.000
Botas do andarilho das sombras|15.000
Bracelete do coração vivaz|27.000
Caixa dos ecos perdidos|10.500
Cálice das marés|15.000
Capa nebulosa|16.500
Cinto dos caminhos cruzados|15.000
Colar da fúria monstruosa|21.000
Colar da perseverança|10.500
Colar do tirano|10.500
Colar das bolas de fogo|12.000
Coroa da floresta sussurrante|21.000
Coroa da majestade distorcida|25.500
Espelho da verdade|21.000
Espelho do outro lado|18.000
Frigideira do chef anão|24.000
Gema da purificação|18.000
Gema da santificação|24.000
Instrumentos da celeridade|22.500
Máscara da raposa|18.000
Máscara do predador|22.500
Óculos da revelação|10.500
Pedra da passagem|15.000
Pingente da dor partilhada|15.000
Sandálias de Valkaria|12.000`,
  maior: `
Anel da chama dançante|30.000
Braçadeiras da força do colosso|120.000
Braceletes da amizade intensa|36.000
Chapéu pensador|30.000
Chave dos planos|60.000
Cinto da desmaterialização|60.000
Cinto da flecha veloz|30.000
Coração do inverno|45.000
Gema da profanação|30.000
Tomo da técnica definitiva|30.000
Tomo dos companheiros|45.000`,
};

const PLURAL = { menor: "menores", médio: "médios", maior: "maiores" };
const SLUG = { menor: "menor", médio: "medio", maior: "maior" };

// Uma lista por categoria (tier) de uma tabela de itens mágicos específicos.
function perTier(slug, table, name, labelName, category, bookPage, pdfPage, text, plural = PLURAL) {
  return Object.entries(text).map(([tier, lines]) => listTable({
    ...base, id: `herois/${slug}/${SLUG[tier]}`, tier, category, bookPage, pdfPage, text: lines,
    title: `Heróis, Tabela ${table}: ${name} (${plural[tier]})`,
    label: `Heróis · ${labelName} (${plural[tier]})`,
  }));
}

// Tabela 3-5, PDF 242 (p. 240). Não traz notas de rodapé: nenhuma melhoria "conta como duas" nem pede material.
// Seções impressas: armas; armaduras e escudos; esotéricos; ferramentas e vestuário; qualquer das categorias acima.
const TABLE_3_5 = `
Farpada
Fósforo
Guarda
Incendiária
Pressurizada
Balístico
Injetora
Prudente
Potencializador
Brasonado
Usado
Deslumbrante`;
const ALL_KINDS = ["arma", "armadura", "esotérico", "ferramenta", "vestuário"];
const TABLE_3_5_APPLIES = {
  Farpada: ["arma"], Fósforo: ["arma"], Guarda: ["arma"], Incendiária: ["arma"], Pressurizada: ["arma"],
  Balístico: ["armadura"], Injetora: ["armadura"], Prudente: ["armadura"],
  Potencializador: ["esotérico"],
  Brasonado: ["ferramenta", "vestuário"], Usado: ["ferramenta", "vestuário"],
  Deslumbrante: ALL_KINDS,
};

export const HEROES_LISTS = [
  listTable({ ...base, id: "herois/armas", title: "Heróis, Tabela 3-1: Armas", label: "Heróis · Armas",
    bookPage: 218, pdfPage: 220, category: "arma", text: TABLE_3_1 }),
  listTable({ ...base, id: "herois/municoes", title: "Heróis, Tabela 3-2: Munições", label: "Heróis · Munições",
    bookPage: 223, pdfPage: 225, category: "arma", text: TABLE_3_2 }),
  listTable({ ...base, id: "herois/armaduras", title: "Heróis, Tabela 3-3: Armaduras & Escudos", label: "Heróis · Armaduras e escudos",
    bookPage: 224, pdfPage: 226, category: shield, text: TABLE_3_3 }),
  listTable({ ...base, id: "herois/itens-gerais", title: "Heróis, Tabela 3-4: Itens Gerais", label: "Heróis · Itens gerais",
    bookPage: 228, pdfPage: 230, category: "item geral", text: TABLE_3_4 }),
  listTable({ ...base, id: "herois/melhorias", title: "Heróis, Tabela 3-5: Novas Melhorias", label: "Heróis · Novas melhorias",
    bookPage: 240, pdfPage: 242, category: "melhoria", text: TABLE_3_5, appliesTo: TABLE_3_5_APPLIES }),
  ...perTier("armas-especificas", "3-9", "Armas Específicas", "Armas específicas", "arma", 257, 259, TABLE_3_9),
  ...perTier("armaduras-especificas", "3-10", "Armaduras & Escudos Específicos", "Armaduras e escudos específicos", shield, 259, 261, TABLE_3_10),
  ...perTier("esotericos", "3-11", "Esotéricos Específicos", "Esotéricos específicos", "esotérico", 262, 264, TABLE_3_11),
  ...perTier("acessorios", "3-12", "Acessórios Específicos", "Acessórios específicos", "acessório", 265, 267, TABLE_3_12),
];
