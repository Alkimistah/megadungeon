import { listTable } from "./schema.js";

// Deuses de Arton, Capítulo 1. Transcrito das páginas renderizadas do PDF (página impressa = PDF − 2).
// Cada linha é um item, na ordem impressa: "Nome|preço".
const base = { book: "Deuses de Arton" };

// Tabela 1-3, PDF 52, coluna da esquerda e depois a da direita.
const TABLE_1_3 = `
Água benta concentrada|60
Amuleto de Khalmyr|30
Amuleto de Nimb|30
Apanhador de sonhos|40
Aspersório|50
Cajado de pastor|12
Cálice consagrado|300
Colar do suplicante|100
Emblema religioso|30
Férula|100
Panfleto de aforismos|60
Patuá|50
Texto sagrado|60
Trombeta do cruzado|100
Anel eclesiástico|50
Carcaça do predador primal|150
Garras do predador primal|300
Hábito monástico|30
Hábito sacerdotal|30
Manto de alto sacerdote|100
Penas do predador primal|100
Piercing de umbigo|50
Sandálias|9
Tonsura|3
Túnica do Virtuoso|25
Afiador solar|100
Báculo da retribuição|200
Contas de oração|500
Estola|150
Frasco purificador|100
Medalhão afiado|900
Ostensório santificado|750
Rede de almas|600
Turíbulo ungido|100
Granada redentora|60
Santa granada de mão|150
Incenso|12
Lucidílico|30
Água benta|10
Favo de mel|30
Fitilho consagrado|30
Flor de orlyn|30
Lantejoula|30
Frasco de luz|30
Pena de anjo|30
Pedra de sombras|30
Vela eclesiástica|60
Abraço da noite|3
Assado de entranhas|2
Bênção dos mares|4
Bolinho de jade|4
Bombas de saber|4
Caldo de Lena|3
Coragem de sangue|4
Deleite mágico|18
Frescor de Nimb|1
Joia do deserto|5
Justos de Khalmyr|2
Justos virtuosos|6
Manjar da paz|7
Ouro de dragão|6
Ovos de raposa|3
Pão de Thwor|1
Presente da terra|3
Renascer gentil|30
Suflê rubro|3
Tesouro de Valkaria|2
Casamento (por pessoa)|150
Cerimônia religiosa|20
Sacramento|50`;

// Tabela 1-4, PDF 56. A tabela traz só o efeito de cada melhoria, sem preço.
const TABLE_1_4 = `
Conduíte
Diligente
Inscrito
Canônico
Devotado`;

export const GODS_LISTS = [
  listTable({ ...base, id: "deuses/itens-gerais", title: "Deuses, Tabela 1-3: Itens Gerais", label: "Deuses · Itens gerais",
    bookPage: 50, pdfPage: 52, category: "item geral", text: TABLE_1_3 }),
  listTable({ ...base, id: "deuses/melhorias", title: "Deuses, Tabela 1-4: Melhorias", label: "Deuses · Melhorias",
    bookPage: 54, pdfPage: 56, category: "melhoria", text: TABLE_1_4 }),
];
