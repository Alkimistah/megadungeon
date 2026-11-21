// Restrições de material e de melhoria dos itens superiores (Livro Básico, Capítulo 3, p. 164–167).
// Cada conferência devolve null quando a combinação vale, ou { cause, text } com a causa curta
// (mostrada no passo recusado) e a explicação (mostrada no pedido da nova rolagem).
// `base` = { name, category, armor? } do item-base (linha da 8-4 ou item da lista de outro livro).
import { normalizeName, armorWeight } from "./tables/prices.js";

const nameSet = (names) => new Set(names.map(normalizeName));

// Armas de madeira (p. 167: arcos, bordões, clavas, lanças, piques e tacapes), lista conferida nos
// livros com o PO. Ameaças: Porrete (p. 393), Tetsubo (p. 394) e Zarabatana. Heróis: Bastão lúdico,
// Malho (p. 221), Clava-grão, Lança de justa, Lança de falange, Arco montado e Arco de guerra.
// Ficam de fora Lança de fogo e Martelo longo.
const WOODEN_WEAPONS = nameSet([
  "Arco curto", "Arco longo", "Bordão", "Clava", "Lança", "Lança montada", "Pique", "Tacape",
  "Porrete", "Tetsubo", "Zarabatana",
  "Bastão lúdico", "Malho", "Clava-grão", "Lança de justa", "Lança de falange", "Arco montado", "Arco de guerra",
]);

export function isWoodenWeapon(name) {
  return WOODEN_WEAPONS.has(normalizeName(name));
}

// Armas de disparo: disparam um projétil (Livro Básico p. 143). Livro Básico, Tabela 3-3 (p. 144–145):
// besta leve, funda, arco curto, arco longo, besta pesada, pistola e mosquete (a munição não é arma).
// Ameaças de Arton, Tabela 3-1 (p. 394): zarabatana (dispara dardos), as armas de fogo (traque, arcabuz,
// bacamarte) e as híbridas com modo de arma de fogo (pistola-punhal, lança de fogo).
// Heróis de Arton, Tabela 3-1 (p. 218–219): besta de mão, tai-tai (dispara pedras), arco montado,
// besta dupla, arco de guerra, balestra, besta de repetição e as armas de fogo (garrucha, canhão
// portátil, sifão cáustico).
const FIRING_WEAPONS = new Set([
  "Besta leve", "Funda", "Arco curto", "Arco longo", "Besta pesada", "Pistola", "Mosquete",
  "Zarabatana", "Traque", "Arcabuz", "Bacamarte", "Pistola-punhal", "Lança de fogo",
  "Besta de mão", "Tai-tai", "Arco montado", "Besta dupla", "Arco de guerra", "Balestra", "Besta de repetição",
  "Garrucha", "Canhão portátil", "Sifão cáustico",
].map(normalizeName));
const SLING = normalizeName("Funda");

// Mira telescópica: armas de disparo, exceto fundas (p. 165).
export function isFiringWeapon(name) {
  const key = normalizeName(name);
  return key !== SLING && FIRING_WEAPONS.has(key);
}

const TOLLON = normalizeName("madeira Tollon");
// Escudos leves (decisão do gerente): Escudo leve, Broquel (Heróis p. 225–226) e Escudo de couro
// (Ameaças p. 395). As listas dos outros livros não marcam escudos como leves.
const LIGHT_SHIELDS = nameSet(["Escudo leve", "Broquel", "Escudo de couro"]);

function tollonFits({ name, category }) {
  if (category === "arma") return isWoodenWeapon(name);
  if (category === "escudo") return LIGHT_SHIELDS.has(normalizeName(name));
  return category === "esotérico";
}

function whyNotTollon({ name, category }) {
  if (category === "arma") return `${name} não é de madeira`;
  if (category === "escudo") return `${name} não é escudo leve`;
  return `${name} é ${category}`;
}

// Material sorteado na sub-rolagem de "Material especial". Os outros materiais do Livro Básico e os
// de Ameaças de Arton não têm restrição de tipo de item.
export function materialProblem(material, base) {
  if (normalizeName(material) !== TOLLON || tollonFits(base)) return null;
  return { cause: "material inválido",
    text: `madeira Tollon só em armas de madeira, escudos leves e esotéricos; ${whyNotTollon(base)}` };
}

const SCOPE = normalizeName("Mira telescópica");
const DELICATE = normalizeName("Delicada");
const SPECIAL_MATERIAL = normalizeName("Material especial");

// Itens que não aceitam material especial: Presa de serpente (Ameaças p. 393–394), Veste de teia de
// aranha (Ameaças p. 395) e Armadura de pedra (Heróis p. 225).
const NO_MATERIAL = nameSet(["Presa de serpente", "Veste de teia de aranha", "Armadura de pedra"]);

// Pares proibidos (p. 164–165); a melhoria que chega por último é recusada.
const EXCLUSIVE_PAIRS = [
  { pair: ["reforçada", "delicada"], cause: "reforçada e delicada", rule: "um item não pode ser reforçado e delicado" },
  { pair: ["maciça", "precisa"], cause: "maciça e precisa", rule: "uma arma não pode ser maciça e precisa" },
];

function describeKind(base) {
  const weight = armorWeight(base);
  return weight ? `armadura ${weight}` : base.category;
}

// Melhoria `name` no item `base` ({ name, category, armor? }) que já tem as melhorias aceitas `taken` (nomes).
export function improvementProblem(name, base, taken) {
  const key = normalizeName(name);
  if (key === SCOPE && !isFiringWeapon(base.name)) {
    const why = normalizeName(base.name) === SLING ? `${base.name} é funda` : `${base.name} não é arma de disparo`;
    return { cause: "só armas de disparo", text: `Mira telescópica só em armas de disparo (exceto fundas); ${why}` };
  }
  if (key === DELICATE && armorWeight(base) !== "pesada") {
    return { cause: "só armaduras pesadas", text: `Delicada só em armaduras pesadas; ${base.name} é ${describeKind(base)}` };
  }
  if (key === SPECIAL_MATERIAL && NO_MATERIAL.has(normalizeName(base.name))) {
    return { cause: "não aceita material", text: `${base.name} não aceita material especial` };
  }
  const takenKeys = taken.map(normalizeName);
  for (const { pair, cause, rule } of EXCLUSIVE_PAIRS) {
    const at = pair.map(normalizeName).indexOf(key);
    if (at < 0) continue;
    const other = pair[1 - at];
    if (takenKeys.includes(normalizeName(other))) return { cause, text: `${rule}; ${base.name} já é ${other}` };
  }
  return null;
}
