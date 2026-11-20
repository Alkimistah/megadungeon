import { listTable } from "./schema.js";

// Ameaças de Arton, Capítulo 3. Transcrito das páginas renderizadas do PDF (página impressa = PDF − 2).
// Cada linha é um item, na ordem impressa: "Nome|preço".
const BOOK = "Ameaças de Arton";
const base = { book: BOOK };
const shield = (name) => (/^Escudo/.test(name) ? "escudo" : "armadura");

// Tabela 3-1, PDF 396 (Armas Simples, Marciais, de Fogo e Exóticas).
const TABLE_3_1 = `
Porrete|2
Zarabatana|5
Neko-te|10
Gládio|12
Tetsubo|20
Traque|75
Arcabuz|800
Bacamarte|450
Açoite finntroll|30
Espada vespa|75
Pistola-punhal|300
Mordida do diabo|30
Presa de serpente|1.000
Lança de fogo|1.000
Shuriken|1
Arpão|30`;

// Tabela 3-2, PDF 397.
const TABLE_3_2 = `
Armadura de ossos|120
Veste de teia de aranha|3.000
Armadura de quitina|350
Escudo de couro|3`;

// Tabela 3-3, PDF 400, coluna da esquerda e depois a da direita.
const TABLE_3_3 = `
Algravia|3
Banquete de canceronte|36
Coc-au-triz|54
Cozido de serpe|12
Gorlogg ensopado|6
Omelete monstruosa|3
Sashimi de kraken|60
Bulette|500
Capivara|60
Corcel do deserto|150
Dromedário|75
Elefante|1.500
Hiena|220
Leão|800
Rinoceronte|600
Urso pardo|300
Caixa de voz|50
Corda de teia|100
Dente de wisphago|100
Ankh solar|450
Tomo de guerra|300
Tomo do rancor|750
Bálsamo de drogadora|60
Bomba de fumaça|15
Elixir quimérico|120
Éter elemental|60
Isca putrefata|60
Lágrima pétrea|30
Óleo de baleia|30
Óleo de besouro|50
Pó azul|150
Corrosivo mineral|150
Gelo extremo|150
Pedaço de língua|30
Raio cristalizado|150
Esporos de cogumelo|75
Peçonha anciã|1.800
Peçonha irritante|10
Veneno batráquio|30
Garra feroz|60
Manto do mantor|450
Manto pesado|10
Sombreiro|10
Traje selako|90`;

// Tabela 3-4, PDF 402. Cada preço é um acréscimo por tipo de item, e o livro imprime as cinco colunas.
const TABLE_3_4 = `
Casco de monstro|Arma +T$ 750; Armadura leve +T$ 750; Armadura pesada +T$ 6.000; Escudo +T$ 750; Esotérico +T$ 6.000
Lanajuste|Arma +T$ 600; Armadura leve +T$ 1.500; Armadura pesada +T$ 3.000; Escudo +T$ 1.500; Esotérico +T$ 3.000
Prata|Arma +T$ 600; Armadura leve +T$ 1.500; Armadura pesada +T$ 3.000; Escudo +T$ 1.500; Esotérico +T$ 400`;

export const THREATS_LISTS = [
  listTable({ ...base, id: "ameacas/armas", title: "Ameaças, Tabela 3-1: Novas Armas", label: "Ameaças · Novas armas",
    bookPage: 394, pdfPage: 396, category: "arma", text: TABLE_3_1 }),
  listTable({ ...base, id: "ameacas/armaduras", title: "Ameaças, Tabela 3-2: Novas Armaduras e Escudos", label: "Ameaças · Novas armaduras e escudos",
    bookPage: 395, pdfPage: 397, category: shield, text: TABLE_3_2 }),
  listTable({ ...base, id: "ameacas/itens-gerais", title: "Ameaças, Tabela 3-3: Novos Itens Gerais", label: "Ameaças · Novos itens gerais",
    bookPage: 398, pdfPage: 400, category: "item geral", text: TABLE_3_3 }),
  listTable({ ...base, id: "ameacas/materiais", title: "Ameaças, Tabela 3-4: Novos Materiais Especiais", label: "Ameaças · Novos materiais especiais",
    bookPage: 400, pdfPage: 402, category: "material", text: TABLE_3_4 }),
];
