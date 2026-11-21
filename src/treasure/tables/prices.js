// Preços do Livro Básico: Tabelas 3-3 (armas, PDF 150-151), 3-5 (armaduras e escudos, PDF 159),
// 3-6 (itens gerais, PDF 162-163), 3-7 (melhorias, PDF 170) e 3-9 (materiais, PDF 173).
// Valores impressos como "T$ 1.500" viram número (1500); "—" continua texto.
import { ENCHANTMENT_PRICES } from "./basicBook.js";
import { THREATS_LISTS } from "./threats.js";

export function normalizeName(name) {
  return String(name).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/\s+/g, " ").trim();
}

// nome|preço
const RAW = `
Adaga|2
Espada curta|10
Foice|4
Clava|—
Lança|2
Maça|12
Bordão|—
Pique|2
Tacape|—
Azagaia|1
Besta leve|35
Virotes (20)|2
Funda|—
Pedras (20)|0.5
Arco curto|30
Flechas (20)|1
Machadinha|6
Cimitarra|15
Espada longa|15
Florete|20
Machado de batalha|10
Mangual|8
Martelo de guerra|12
Picareta|8
Tridente|15
Alabarda|10
Alfange|75
Gadanho|18
Lança montada|10
Machado de guerra|20
Marreta|20
Montante|50
Arco longo|100
Besta pesada|50
Chicote|2
Espada bastarda|35
Katana|100
Machado anão|30
Corrente de espinhos|25
Machado táurico|50
Rede|20
Pistola|250
Balas (20)|20
Mosquete|500
Armadura acolchoada|5
Armadura de couro|20
Couro batido|35
Gibão de peles|25
Couraça|500
Brunea|50
Cota de malha|150
Loriga segmentada|250
Meia armadura|600
Armadura completa|3000
Escudo leve|5
Escudo pesado|15
Água benta|10
Algemas|15
Arpéu|5
Bandoleira de poções|20
Barraca|10
Corda|1
Espelho|10
Lampião|7
Mochila|2
Mochila de aventureiro|50
Óleo|0.1
Organizador de pergaminhos|25
Pé de cabra|2
Saco de dormir|1
Símbolo sagrado|5
Tocha|0.1
Vara de madeira (3m)|0.2
Alaúde élfico|300
Coleção de livros|75
Equipamento de viagem|10
Estojo de disfarces|50
Flauta mística|150
Gazua|5
Instrumentos de <ofício>|30
Instrumento musical|35
Luneta|100
Maleta de medicamentos|50
Sela|20
Tambor das profundezas|80
Andrajos de aldeão|1
Bandana|5
Botas reforçadas|20
Camisa bufante|25
Capa esvoaçante|25
Capa pesada|15
Casaco longo|20
Chapéu arcano|50
Enfeite de elmo|15
Farrapos de ermitão|1
Gorro de ervas|75
Luva de pelica|5
Manopla|10
Manto camuflado|12
Manto eclesiástico|20
Robe místico|50
Sapatos de camurça|8
Tabardo|10
Traje da corte|100
Traje de viajante|10
Veste de seda|25
Bolsa de pó|300
Cajado arcano|1000
Cetro elemental|750
Costela de lich|300
Dedo de ente|200
Luva de ferro|150
Medalhão de prata|750
Orbe cristalina|750
Tomo hermético|1500
Varinha arcana|100
Ácido|10
Bálsamo restaurador|10
Bomba|50
Cosmético|30
Elixir do amor|100
Essência de mana|50
Fogo alquímico|10
Pó do desaparecimento|100
Baga-de-fogo|30
Dente-de-dragão|45
Essência abissal|150
Líquen lilás|30
Musgo púrpura|45
Ossos de monstro|45
Pó de cristal|30
Pó de giz|30
Ramo verdejante|45
Saco de sal|45
Seixo de âmbar|30
Terra de cemitério|30
Beladona|1500
Bruma sonolenta|150
Cicuta|60
Essência de sombra|100
Névoa tóxica|30
Peçonha comum|15
Peçonha concentrada|90
Peçonha potente|600
Pó de lich|3000
Riso de Nimb|150`;

export const BASE_PRICES = new Map(RAW.trim().split("\n").map((line) => {
  const [name, price] = line.split("|");
  return [normalizeName(name), price === "—" ? price : Number(price)];
}));

// Nomes das Tabelas 8-3 e 8-4 que diferem da grafia do Capítulo 3.
export const NAME_ALIASES = Object.freeze({
  [normalizeName("Couro")]: normalizeName("Armadura de couro"),
  [normalizeName("Completa")]: normalizeName("Armadura completa"),
});

export function basePriceOf(name) {
  const key = normalizeName(name);
  return BASE_PRICES.get(key) ?? BASE_PRICES.get(NAME_ALIASES[key]);
}

// Tabela 3-7 (PDF 170).
export const IMPROVEMENT_PRICES = Object.freeze({ 1: 300, 2: 3000, 3: 9000, 4: 18000 });

// Tabela 3-9 (PDF 173): null = "—" (material indisponível para o tipo).
const COLUMNS = ["arma", "armadura leve", "armadura pesada", "escudo", "esotérico"];
const MATERIAL_ROWS = {
  "aço-rubi": [6000, 3000, 6000, 3000, 6000],
  adamante: [3000, 6000, 18000, 6000, 3000],
  "gelo eterno": [600, 1500, 3000, 1500, 3000],
  "madeira tollon": [1500, null, null, 1500, 1500],
  "matéria vermelha": [1500, 6000, 18000, 6000, 3000],
  mitral: [1500, 1500, 12000, 1500, 3000],
};
export const MATERIAL_PRICES = Object.freeze(Object.fromEntries(
  Object.entries(MATERIAL_ROWS).map(([m, vals]) => [m, Object.freeze(Object.fromEntries(COLUMNS.map((c, i) => [c, vals[i]])))]),
));

// Ameaças de Arton, Tabela 3-4: o preço de cada material vem impresso como um texto com as
// cinco colunas ("Arma +T$ 750; Armadura leve +T$ 750; ..."). Vira a mesma estrutura da 3-9.
const COLUMN_LABELS = ["Arma", "Armadura leve", "Armadura pesada", "Escudo", "Esotérico"];
export function parseMaterialPriceText(text) {
  const parts = String(text).split(";").map((p) => p.trim());
  if (parts.length !== COLUMNS.length) throw new Error(`Preço de material ilegível: ${text}`);
  return Object.fromEntries(parts.map((part, i) => {
    const match = part.match(/^(.+?) \+T\$ (\d{1,3}(?:\.\d{3})*)$/);
    if (!match || match[1] !== COLUMN_LABELS[i]) throw new Error(`Preço de material ilegível: ${text}`);
    return [COLUMNS[i], Number(match[2].replaceAll(".", ""))];
  }));
}

const OTHER_MATERIAL_PRICES = Object.fromEntries(THREATS_LISTS.find((l) => l.id === "ameacas/materiais").items
  .map((item) => [normalizeName(item.name), Object.freeze(parseMaterialPriceText(item.price))]));

const LIGHT_ARMOR = new Set(["armadura acolchoada", "armadura de couro", "couro batido", "gibao de peles", "couraca"].map(normalizeName));

// Preço adicional do material (Tabela 3-9 ou Ameaças 3-4) para o item-base `{ name, category }`.
export function materialPriceOf(material, base) {
  const key = normalizeName(material);
  const entry = Object.entries(MATERIAL_PRICES).find(([name]) => normalizeName(name) === key)?.[1]
    ?? OTHER_MATERIAL_PRICES[key];
  return entry?.[materialColumn(base)];
}

function materialColumn({ name, category }) {
  if (category === "arma") return "arma";
  if (category === "escudo") return "escudo";
  if (category === "esotérico") return "esotérico";
  if (category === "armadura") {
    const key = normalizeName(name);
    return LIGHT_ARMOR.has(NAME_ALIASES[key] ?? key) ? "armadura leve" : "armadura pesada";
  }
  return undefined;
}

// Preço de um item composto. `base` = { name, category, price? } do item-base (`price` = preço
// impresso na lista de outro livro; sem ele, vale o Capítulo 3 do Livro Básico); `details` como no Gain
// (improvements/enchantments/material); improvementCount/enchantmentCount substituem o tamanho
// das listas quando há melhoria ou encanto que conta como dois.
export function priceOf(details, base) {
  const basePrice = base.price !== undefined ? base.price : basePriceOf(base.name);
  if (basePrice === undefined) return undefined;
  const improvements = details?.improvementCount ?? details?.improvements?.length ?? 0;
  const enchantments = details?.enchantmentCount ?? details?.enchantments?.length ?? 0;
  // "—" é gratuito (Clava, Bordão...): sozinho continua "—"; com extras soma a partir de 0.
  if (typeof basePrice === "string" && (basePrice !== "—" || (!improvements && !details?.material && !enchantments))) return basePrice;
  let total = typeof basePrice === "number" ? basePrice : 0;
  if (improvements > 0) total += IMPROVEMENT_PRICES[Math.min(improvements, 4)];
  if (details?.material) {
    const extra = materialPriceOf(details.material, base);
    if (typeof extra === "number") total += extra;
  }
  if (enchantments > 0) total += ENCHANTMENT_PRICES[Math.min(enchantments, 3)].price;
  return total;
}
