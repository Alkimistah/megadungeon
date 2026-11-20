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

// Falha cedo se a transcrição ficar inconsistente.
for (const table of Object.values(BASIC_BOOK_TABLES)) {
  const errors = validateTable(table);
  if (errors.length) throw new Error(errors.join("; "));
}
