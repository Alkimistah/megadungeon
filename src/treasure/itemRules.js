// Restrições de material e de melhoria dos itens superiores (Livro Básico, Capítulo 3, p. 164–167).
// Cada conferência devolve null quando a combinação vale, ou { cause, text } com a causa curta
// (mostrada no passo recusado) e a explicação (mostrada no pedido da nova rolagem).
// `base` = { name, category, armor? } do item-base (linha da 8-4 ou item da lista de outro livro).
import { normalizeName } from "./tables/prices.js";

// Armas de madeira (p. 167): arcos, bordões, clavas, lanças, piques e tacapes. Nas listas dos outros
// livros, valem as armas cujo nome começa por uma dessas palavras (decisão do gerente).
const WOODEN_PREFIX = /^(arco|bordao|clava|lanca|pique|tacape)(?=$|[\s-])/;

export function isWoodenWeapon(name) {
  return WOODEN_PREFIX.test(normalizeName(name));
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
const LIGHT_SHIELD = normalizeName("Escudo leve");

function tollonFits({ name, category, armor }) {
  if (category === "arma") return isWoodenWeapon(name);
  if (category === "escudo") return normalizeName(name) === LIGHT_SHIELD || armor === "leve";
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
const OPPOSITES = { [normalizeName("Reforçada")]: "delicada", [normalizeName("Delicada")]: "reforçada" };

// Melhoria `name` no item `base` que já tem as melhorias aceitas `taken` (nomes).
export function improvementProblem(name, base, taken) {
  const key = normalizeName(name);
  if (key === SCOPE && !isFiringWeapon(base.name)) {
    const why = normalizeName(base.name) === SLING ? `${base.name} é funda` : `${base.name} não é arma de disparo`;
    return { cause: "só armas de disparo", text: `Mira telescópica só em armas de disparo (exceto fundas); ${why}` };
  }
  const opposite = OPPOSITES[key];
  if (opposite && taken.some((t) => normalizeName(t) === normalizeName(opposite))) {
    return { cause: "reforçada e delicada", text: `um item não pode ser reforçado e delicado; ${base.name} já é ${opposite}` };
  }
  return null;
}
