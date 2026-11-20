import { validateTable } from "./schema.js";

// Livro Básico, Capítulo 8. Transcrito das páginas renderizadas do PDF.
// Marcas nos textos: "*" = +% (sobrescrito), "^" = 2D (sobrescrito).
const BOOK = "Livro Básico";
const TIERS = { menor: "menor", menores: "menor", média: "média", médias: "média", maior: "maior", maiores: "maior" };

function parseRange(text) {
  const [min, max] = text.split("-").map(Number);
  return { min, max: max ?? min };
}

function parseMoney(text) {
  const flags = {};
  let t = text.trim();
  if (t.endsWith("*")) { flags.bonus20 = true; t = t.slice(0, -1); }
  if (t === "—") return { result: { kind: "none" }, flags };
  let m = t.match(/^(\S+) riquezas? (menor|menores|média|médias|maior|maiores)$/);
  if (m) {
    const count = /^\d+$/.test(m[1]) ? Number(m[1]) : m[1];
    return { result: { kind: "wealth", count, tier: TIERS[m[2]] }, flags };
  }
  m = t.match(/^(\S+?)x([\d.]+) (TC|T\$|TO)$/);
  if (!m) throw new Error(`Dinheiro não reconhecido: ${text}`);
  return { result: { kind: "money", dice: m[1], multiplier: Number(m[2].replaceAll(".", "")), currency: m[3] }, flags };
}

function parseItem(text) {
  const flags = {};
  let t = text.trim();
  if (t.endsWith("*")) { flags.bonus20 = true; t = t.slice(0, -1); }
  if (t.endsWith("^")) { flags.twoDice = true; t = t.slice(0, -1); }
  let m;
  let result;
  if (t === "—") result = { kind: "none" };
  else if (t === "Diverso") result = { kind: "diverse" };
  else if (t === "Equipamento") result = { kind: "equipment" };
  else if ((m = t.match(/^(\S+) poç(?:ão|ões)$/))) result = { kind: "potion", count: /^\d+$/.test(m[1]) ? Number(m[1]) : m[1] };
  else if ((m = t.match(/^Superior \((\d) melhorias?\)$/))) result = { kind: "superior", improvements: Number(m[1]) };
  else if ((m = t.match(/^Mágico \((menor|médio|maior)\)$/))) result = { kind: "magic", tier: m[1] };
  else throw new Error(`Item não reconhecido: ${text}`);
  return { result, flags };
}

function buildRows(lines, parse) {
  return lines.map(([range, text]) => {
    const { result, flags } = parse(text);
    return { ...parseRange(range), result, ...(Object.keys(flags).length ? { flags } : {}) };
  });
}

// nd: [pdfPage, dinheiro[[faixa, texto]], itens[[faixa, texto]]]
const TABLE_8_1 = {
  "0.25": [334, [["01-30", "—"], ["31-70", "1d6x10 TC"], ["71-95", "1d4x100 TC"], ["96-100", "1d6x10 T$"]],
    [["01-50", "—"], ["51-75", "Diverso"], ["76-100", "Equipamento"]]],
  "0.5": [334, [["01-25", "—"], ["26-70", "2d6x10 TC"], ["71-95", "2d8x10 T$"], ["96-100", "1d4x100 T$"]],
    [["01-45", "—"], ["46-70", "Diverso"], ["71-100", "Equipamento"]]],
  "1": [334, [["01-20", "—"], ["21-70", "3d8x10 T$"], ["71-95", "4d12x10 T$"], ["96-100", "1 riqueza menor"]],
    [["01-40", "—"], ["41-65", "Diverso"], ["66-90", "Equipamento"], ["91-100", "1 poção"]]],
  "2": [334, [["01-15", "—"], ["16-55", "3d10x10 T$"], ["56-85", "2d4x100 T$"], ["86-95", "2d6+1x100 T$"], ["96-100", "1 riqueza menor"]],
    [["01-30", "—"], ["31-40", "Diverso"], ["41-70", "Equipamento"], ["71-90", "1 poção"], ["91-100", "Superior (1 melhoria)"]]],
  "3": [334, [["01-10", "—"], ["11-20", "4d12x10 T$"], ["21-60", "1d4x100 T$"], ["61-90", "1d8x10 TO"], ["91-100", "1d3 riquezas menores"]],
    [["01-25", "—"], ["26-35", "Diverso"], ["36-60", "Equipamento"], ["61-85", "1 poção"], ["86-100", "Superior (1 melhoria)"]]],
  "4": [334, [["01-10", "—"], ["11-50", "1d6x100 T$"], ["51-80", "1d12x100 T$"], ["81-90", "1 riqueza menor*"], ["91-100", "1d3 riquezas menores*"]],
    [["01-20", "—"], ["21-30", "Diverso"], ["31-55", "Equipamento^"], ["56-80", "1 poção*"], ["81-100", "Superior (1 melhoria)^"]]],
  "5": [334, [["01-15", "—"], ["16-65", "1d8x100 T$"], ["66-95", "3d4x10 TO"], ["96-100", "1 riqueza média"]],
    [["01-20", "—"], ["21-70", "1 poção"], ["71-90", "Superior (1 melhoria)"], ["91-100", "Superior (2 melhorias)"]]],
  "6": [334, [["01-15", "—"], ["16-60", "2d6x100 T$"], ["61-90", "2d10x100 T$"], ["91-100", "1d3+1 riquezas menores"]],
    [["01-20", "—"], ["21-65", "1 poção*"], ["66-95", "Superior (1 melhoria)"], ["96-100", "Superior (2 melhorias)^"]]],
  "7": [334, [["01-10", "—"], ["11-60", "2d8x100 T$"], ["61-90", "2d12x10 TO"], ["91-100", "1d4+1 riquezas menores"]],
    [["01-20", "—"], ["21-60", "1d3 poções"], ["61-90", "Superior (2 melhorias)"], ["91-100", "Superior (3 melhorias)"]]],
  "8": [334, [["01-10", "—"], ["11-55", "2d10x100 T$"], ["56-95", "1d4+1 riquezas menores"], ["96-100", "1 riqueza média*"]],
    [["01-20", "—"], ["21-75", "1d3 poções"], ["76-95", "Superior (2 melhorias)"], ["96-100", "Superior (3 melhorias)^"]]],
  "9": [334, [["01-10", "—"], ["11-35", "1 riqueza média"], ["36-85", "4d6x100 T$"], ["86-100", "1d3 riquezas médias"]],
    [["01-20", "—"], ["21-70", "1 poção*"], ["71-95", "Superior (3 melhorias)"], ["96-100", "Mágico (menor)"]]],
  "10": [335, [["01-10", "—"], ["11-30", "4d6x100 T$"], ["31-85", "4d10x10 TO"], ["86-100", "1d3+1 riquezas médias"]],
    [["01-50", "—"], ["51-75", "1d3+1 poções"], ["76-90", "Superior (3 melhorias)"], ["91-100", "Mágico (menor)"]]],
  "11": [335, [["01-10", "—"], ["11-45", "2d4x1.000 T$"], ["46-85", "1d3 riquezas médias"], ["86-100", "2d6x100 TO"]],
    [["01-45", "—"], ["46-70", "1d4+1 poções"], ["71-90", "Superior (3 melhorias)"], ["91-100", "Mágico (menor)^"]]],
  "12": [335, [["01-10", "—"], ["11-45", "1 riqueza média*"], ["46-80", "2d6x1.000 T$"], ["81-100", "1d4+1 riquezas médias"]],
    [["01-45", "—"], ["46-70", "1d3+1 poções*"], ["71-85", "Superior (4 melhorias)"], ["86-100", "Mágico (menor)"]]],
  "13": [335, [["01-10", "—"], ["11-45", "4d4x1.000 T$"], ["46-80", "1d3+1 riquezas médias"], ["81-100", "4d6x100 TO"]],
    [["01-40", "—"], ["41-65", "1d4+1 poções*"], ["66-95", "Superior (4 melhorias)"], ["96-100", "Mágico (médio)"]]],
  "14": [335, [["01-10", "—"], ["11-45", "1d3+1 riquezas médias"], ["46-80", "3d6x1.000 T$"], ["81-100", "1 riqueza maior"]],
    [["01-40", "—"], ["41-65", "1d4+1 poções*"], ["66-90", "Superior (4 melhorias)"], ["91-100", "Mágico (médio)"]]],
  "15": [335, [["01-10", "—"], ["11-45", "1 riqueza média*"], ["46-80", "2d10x1.000 T$"], ["81-100", "1d4x1.000 TO"]],
    [["01-35", "—"], ["36-45", "1d6+1 poções"], ["46-85", "Superior (4 melhorias)^"], ["86-100", "Mágico (médio)"]]],
  "16": [335, [["01-10", "—"], ["11-40", "3d6x1.000 T$"], ["41-75", "3d10x100 TO"], ["76-100", "1d3 riquezas maiores"]],
    [["01-35", "—"], ["36-45", "1d6+1 poções*"], ["46-80", "Superior (4 melhorias)^"], ["81-100", "Mágico (médio)"]]],
  "17": [335, [["01-05", "—"], ["06-40", "4d6x1.000 T$"], ["41-75", "1d3 riquezas médias*"], ["76-100", "2d4x1.000 TO"]],
    [["01-20", "—"], ["21-40", "Mágico (menor)"], ["41-80", "Mágico (médio)"], ["81-100", "Mágico (maior)"]]],
  "18": [335, [["01-05", "—"], ["06-40", "4d10x1.000 T$"], ["41-75", "1 riqueza maior"], ["76-100", "1d3+1 riquezas maiores"]],
    [["01-15", "—"], ["16-40", "Mágico (menor)^"], ["41-70", "Mágico (médio)"], ["71-100", "Mágico (maior)"]]],
  "19": [335, [["01-05", "—"], ["06-40", "4d12x1.000 T$"], ["41-75", "1 riqueza maior*"], ["76-100", "1d12x1.000 TO"]],
    [["01-10", "—"], ["11-40", "Mágico (menor)^"], ["41-60", "Mágico (médio)^"], ["61-100", "Mágico (maior)"]]],
  "20": [335, [["01-05", "—"], ["06-40", "2d4x1.000 TO"], ["41-75", "1d3 riquezas maiores"], ["76-100", "1d3+1 riquezas maiores*"]],
    [["01-05", "—"], ["06-40", "Mágico (menor)^"], ["41-50", "Mágico (médio)^"], ["51-100", "Mágico (maior)^"]]],
};

// Tabela 8-2: [menor, média, maior, dado, multiplicador, média, exemplos]
const TABLE_8_2 = [
  ["01-25", null, null, "4d4", 1, 10, "Ágata ou hematita (1/2); barril de farinha ou gaiola com galinhas (5)."],
  ["26-40", null, null, "1d4", 10, 25, "Quartzo rosa ou topázio (1/2); caixa de tabaco ou rolo de linho (1); jarro de especiarias, como canela, gorad, pimenta ou sal (2);"],
  ["41-55", "01-10", null, "2d4", 10, 50, "Bracelete de ouro finamente trabalhado (1/2); estatueta de osso ou marfim entalhado ou rolo de seda (1); vaso de prata (2)."],
  ["56-70", "11-30", null, "4d6", 10, 140, "Ametista ou pérola branca (1/2); lingote de prata ou cálice de prata com gemas de lápis-lazúli (1); tapeçaria grande e bem-feita de lã (5)."],
  ["71-85", "31-50", "01-05", "1d6", 100, 350, "Alexandrita ou pérola negra (1/2); espada cerimonial ornada com prata e gema negra no cabo ou pente de prata com pedras preciosas (1)."],
  ["86-95", "51-65", "06-15", "2d6", 100, 700, "Pente em forma de dragão com olhos de gema vermelha (1); harpa de madeira exótica com ornamentos de zircão e marfim (5)."],
  ["96-99", "66-80", "16-25", "2d8", 100, 900, "Opala negra ou tapa-olho com um olho falso de safira (1/2); luva bordada e adornada com gemas ou pingente de opala vermelha com corrente de ouro (1); lingote de ouro ou pintura antiga (2)."],
  ["100", "81-90", "26-40", "4d10", 100, 2200, "Esmeralda verde ou pingente de safira (1/2); caixinha de música de ouro ou tornozeleira com gemas (1); manto bordado em veludo e seda com inúmeras pedras preciosas (2)."],
  [null, "91-95", "41-60", "6d12", 100, 3900, "Anel de prata e safira ou correntinha com pequenas pérolas rosas, diamante branco (1/2); ídolo de ouro puro maciço (5)."],
  [null, "96-99", "61-75", "2d10", 1000, 11000, "Anel de ouro e rubi ou diamante vermelho (1/2); conjunto de taças de ouro decoradas com esmeraldas (2)."],
  [null, "100", "76-85", "6d8", 1000, 27000, "Coroa de ouro adornada com centenas de gemas, pertencente a um antigo monarca (1); baú de mitral com coleção de diamantes (2)."],
  [null, null, "86-95", "1d10", 10000, 55000, "Arca de madeira reforçada repleta de lingotes de prata e ouro, além de pedras preciosas de vários tipos (20)."],
  [null, null, "96-100", "4d12", 10000, 260000, "Uma sala forrada de moedas! Mover todo esse dinheiro exige trabalhadores e carroças (ou outra ideia por parte dos jogadores), além de atrair a atenção de bandidos, coletores de impostos e aproveitadores de vários tipos..."],
];

export const BASIC_BOOK_TABLES = {};

for (const [nd, [pdfPage, money, items]] of Object.entries(TABLE_8_1)) {
  const base = { book: BOOK, bookPage: pdfPage - 6, pdfPage, die: "d%" };
  const label = nd === "0.25" ? "1/4" : nd === "0.5" ? "1/2" : nd;
  BASIC_BOOK_TABLES[`8-1/${nd}/money`] = {
    id: `8-1/${nd}/money`, title: `Tabela 8-1: Tesouro por Nível de Desafio, ND ${label}, Dinheiro`, ...base,
    rows: buildRows(money, parseMoney),
  };
  BASIC_BOOK_TABLES[`8-1/${nd}/items`] = {
    id: `8-1/${nd}/items`, title: `Tabela 8-1: Tesouro por Nível de Desafio, ND ${label}, Itens`, ...base,
    rows: buildRows(items, parseItem),
  };
}

["menor", "média", "maior"].forEach((tier, col) => {
  const rows = [];
  for (const line of TABLE_8_2) {
    if (!line[col]) continue;
    rows.push({
      ...parseRange(line[col]),
      result: { kind: "wealthValue", dice: line[3], multiplier: line[4], average: line[5], examples: line[6] },
    });
  }
  BASIC_BOOK_TABLES[`8-2/${tier}`] = {
    id: `8-2/${tier}`, title: `Tabela 8-2: Riquezas, coluna ${tier}`, book: BOOK, bookPage: 330, pdfPage: 336, die: "d%", rows,
  };
});

export const TYPE_ROLLS = {
  equipment: [[1, 3, "arma"], [4, 5, "armadura"], [6, 6, "esotérico"]],
  magic: [[1, 2, "arma"], [3, 3, "armadura"], [4, 6, "acessório"]],
};

// Tabelas 8-3 e 8-4 (PDF 337) trazem só o nome do item: sem preço nem espaços impressos.
function itemRows(text, category) {
  return text.trim().split("\n").map((line) => {
    const [range, name] = line.trim().split("|");
    const cat = typeof category === "function" ? category(name) : category;
    return { ...parseRange(range), result: { kind: "item", name, category: cat } };
  });
}

const TABLE_8_3 = `
01-02|Ácido
03-04|Água benta
05|Alaúde élfico
06|Algemas
07-08|Baga-de-fogo
09-23|Bálsamo restaurador
24|Bandana
25|Bandoleira de poções
26-30|Bomba
31|Botas reforçadas
32|Camisa bufante
33|Capa esvoaçante
34|Capa pesada
35|Casaco longo
36|Chapéu arcano
37-38|Coleção de livros
39-40|Cosmético
41-42|Dente-de-dragão
43|Enfeite de elmo
44|Elixir do amor
45-46|Equipamento de viagem
47-56|Essência de mana
57|Estojo de disfarces
58|Farrapos de ermitão
59|Flauta mística
60-66|Fogo alquímico
67|Gorro de ervas
68-69|Líquen lilás
70|Luneta
71|Luva de pelica
72-73|Maleta de medicamentos
74|Manopla
75|Manto eclesiástico
76-78|Mochila de aventureiro
79-80|Musgo púrpura
81|Organizador de pergaminhos
82-83|Ossos de monstro
84-85|Pó de cristal
86-87|Pó de giz
88|Pó do desaparecimento
89|Robe místico
90-91|Saco de sal
92|Sapatos de camurça
93-94|Seixo de âmbar
95|Sela
96|Tabardo
97|Traje da corte
98-99|Terra de cemitério
100|Veste de seda`;

const TABLE_8_4_ARMA = `
01-03|Adaga
04-05|Alabarda
06-07|Alfange
08-10|Arco curto
11-13|Arco longo
14-15|Azagaia
16|Balas (20)
17-18|Besta leve
19-20|Besta pesada
21-23|Bordão
24|Chicote
25-27|Cimitarra
28-30|Clava
31|Corrente de espinhos
32-33|Espada bastarda
34-38|Espada curta
39-43|Espada longa
44-46|Flechas (20)
47-49|Florete
50-51|Foice
52-53|Funda
54-55|Gadanho
56|Katana
57-59|Lança
60|Lança montada
61-63|Maça
64-66|Machadinha
67|Machado anão
68-70|Machado de batalha
71-73|Machado de guerra
74|Machado táurico
75-76|Mangual
77|Marreta
78-80|Martelo de guerra
81-83|Montante
84|Mosquete
85|Pedras (20)
86-88|Picareta
89-90|Pique
91-92|Pistola
93|Rede
94-96|Tacape
97-98|Tridente
99-100|Virotes (20)`;

const TABLE_8_4_ARMADURA = `
01-05|Couro
06-10|Brunea
11-25|Completa
26-30|Cota de malha
31-45|Couraça
46-55|Couro batido
56-65|Escudo leve
66-80|Escudo pesado
81-85|Gibão de peles
86-90|Loriga segmentada
91-100|Meia armadura`;

const TABLE_8_4_ESOTERICO = `
01-10|Bolsa de pó
11-25|Cajado arcano
26-35|Cetro elemental
36-42|Costela de lich
43-50|Dedo de ente
51-55|Luva de ferro
56-65|Medalhão de prata
66-75|Orbe cristalina
76-85|Tomo hermético
86-100|Varinha arcana`;

// Tabela 8-5 (PDF 338). "¹" = conta como duas melhorias; "²" = role 1d6 para o material.
const MATERIALS = ["aço-rubi", "adamante", "gelo eterno", "madeira Tollon", "matéria vermelha", "mitral"];
function improvementRows(text) {
  return text.trim().split("\n").map((line) => {
    const [range, raw] = line.trim().split("|");
    const result = { kind: "improvement", name: raw.replace(/[¹²]$/, "") };
    if (raw.endsWith("¹")) result.special = "counts-as-two";
    if (raw.endsWith("²")) result.subroll = { die: "1d6", options: [...MATERIALS] };
    return { ...parseRange(range), result };
  });
}

const TABLE_8_5_ARMA = `
01-10|Atroz¹
11-13|Banhada a ouro
14-23|Certeira
24-26|Cravejada de gemas
27-36|Cruel
37-39|Discreta
40-44|Equilibrada
45-48|Harmonizada
49-53|Injeção alquímica
54-55|Macabra
56-65|Maciça
66-75|Material especial²
76-80|Mira telescópica
81-90|Precisa
91-100|Pungente¹`;

const TABLE_8_5_ARMADURA = `
01-15|Ajustada
16-19|Banhada a ouro
20-23|Cravejada de gemas
24-28|Delicada
29-32|Discreta
33-37|Espinhos
38-40|Macabra
41-50|Material especial²
51-55|Polida
56-80|Reforçada
81-90|Selada
91-100|Sob medida¹`;

const TABLE_8_5_ESOTERICO = `
01-04|Banhada a ouro
05-08|Cravejada de gemas
09-12|Discreto
13-27|Energético
28-42|Harmonizado
43-45|Macabro
46-54|Material especial²
55-70|Poderoso
71-85|Potencializador
86-100|Vigilante`;

// Tabela 8-12 (PDF 347): faixa|nome|preço em T$.
const TABLE_8_12 = `
01|Abençoar Alimentos (óleo)|30
02-03|Área Escorregadia (granada)|30
04-06|Arma Mágica (óleo)|30
07|Compreensão|30
08-15|Curar Ferimentos (2d8+2 PV)|30
16-18|Disfarce Ilusório|30
19-20|Escuridão (óleo)|30
21-22|Luz (óleo)|30
23-24|Névoa (granada)|30
25-26|Primor Atlético|30
27-28|Proteção Divina|30
29-30|Resistência a Energia|30
31-32|Sono|30
33|Suporte Ambiental|30
34|Tranca Arcana (óleo)|30
35|Visão Mística|30
36|Vitalidade Fantasma|30
37-38|Escudo da Fé (aprimoramento para duração cena)|120
39-40|Alterar Tamanho|270
41-42|Aparência Perfeita|270
43|Armamento da Natureza (óleo)|270
44-49|Bola de Fogo (granada)|270
50-51|Camuflagem Ilusória|270
52-53|Concentração de Combate (aprimoramento para duração cena)|270
54-62|Curar Ferimentos (4d8+4 PV)|270
63-66|Físico Divino|270
67-68|Mente Divina|270
69-70|Metamorfose|270
71-75|Purificação|270
76-77|Velocidade|270
78-79|Vestimenta da Fé (óleo)|270
80|Voz Divina|270
81-82|Arma Mágica (óleo; aprimoramento para bônus +3)|750
83-88|Curar Ferimentos (7d8+7 PV)|1080
89|Físico Divino (aprimoramento para três atributos)|1080
90-92|Invisibilidade (aprimoramento para duração cena)|1080
93-96|Bola de Fogo (granada; aprimoramento para 10d6 de dano)|1470
97-100|Curar Ferimentos (11d8+11 PV)|3000`;

const itemTable = (id, title, bookPage, rows) => {
  BASIC_BOOK_TABLES[id] = { id, title, book: BOOK, bookPage, pdfPage: bookPage + 6, die: "d%", rows };
};
const shield = (name) => (name.startsWith("Escudo") ? "escudo" : "armadura");

itemTable("8-3", "Tabela 8-3: Itens Diversos", 331, itemRows(TABLE_8_3, "diverso"));
itemTable("8-4/arma", "Tabela 8-4: Equipamento, Arma", 331, itemRows(TABLE_8_4_ARMA, "arma"));
itemTable("8-4/armadura", "Tabela 8-4: Equipamento, Armadura", 331, itemRows(TABLE_8_4_ARMADURA, shield));
itemTable("8-4/esotérico", "Tabela 8-4: Equipamento, Esotérico", 331, itemRows(TABLE_8_4_ESOTERICO, "esotérico"));
itemTable("8-5/arma", "Tabela 8-5: Itens Superiores, Armas", 332, improvementRows(TABLE_8_5_ARMA));
itemTable("8-5/armadura", "Tabela 8-5: Itens Superiores, Armaduras/Escudos", 332, improvementRows(TABLE_8_5_ARMADURA));
itemTable("8-5/esotérico", "Tabela 8-5: Itens Superiores, Esotéricos", 332, improvementRows(TABLE_8_5_ESOTERICO));
itemTable("8-12", "Tabela 8-12: Poções", 341, TABLE_8_12.trim().split("\n").map((line) => {
  const [range, name, price] = line.split("|");
  return { ...parseRange(range), result: { kind: "item", name, price: Number(price), category: "poção" } };
}));

// Falha cedo se a transcrição ficar inconsistente.
for (const table of Object.values(BASIC_BOOK_TABLES)) {
  const errors = validateTable(table);
  if (errors.length) throw new Error(errors.join("; "));
}
