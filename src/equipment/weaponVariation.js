import weapons from "./weapons.json" with { type: "json" };
import { pick } from "../random.js";

const WEAPON_VARIATION_VERSION = 1;

const SKIPPED_WEAPON_TERMS = [
  "aberrante",
  "atroz",
  "aumentad",
  "certeir",
  "cruel",
  "gigante",
  "maciç",
  "mitral",
  "pungente",
  "titânic"
];

const ACTION_PATTERN = /^(?<prefix>\[Bando\]\s*)?(?<attackLabel>.+?)\s+(?<attackBonus>(?:x\d+\s*)?[+-]\d+(?:\s*x\d+)?)\s*\((?<damageText>[^)]*)\)(?<tail>.*)$/i;

function slugify(value) {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function normalize(value) {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export const weaponCatalog = weapons.map((weapon) => ({
  id: slugify(weapon.nome),
  name: weapon.nome,
  category: weapon.categoria,
  types: weapon.tipo ?? [],
  grips: weapon.empunhadura ?? [],
  damage: weapon.dano,
  critical: weapon.critico,
  range: weapon.alcance,
  damageTypes: weapon.tipoDano ?? [],
  description: weapon.descricao,
  notes: weapon.observacoes,
  tags: weapon.tags ?? [],
  normalizedName: normalize(weapon.nome)
}));

const weaponsByNameLength = [...weaponCatalog].sort((a, b) => b.name.length - a.name.length);

function isWeaponAction(action) {
  const name = normalize(action?.name ?? "");
  return name === "corpo a corpo" || name === "a distancia";
}

function isVariableCreature(creature) {
  if (!creature?.equipment || !creature?.actions?.length) return false;
  if (!["Pequeno", "Médio"].includes(creature.size)) return false;

  return ["construct", "humanoid", "monster", "spirit", "undead"].includes(creature.type);
}

function findWeaponInLabel(label) {
  const normalizedLabel = normalize(label);
  return weaponsByNameLength.find((weapon) => normalizedLabel.includes(weapon.normalizedName)) ?? null;
}

function getActionMode(action, originalWeapon) {
  if (normalize(action.name) === "a distancia") return "ranged";
  if (originalWeapon?.types.includes("distância")) return "ranged";
  if (originalWeapon?.types.includes("arremesso") && !originalWeapon.types.includes("corpo a corpo")) return "ranged";
  return "melee";
}

function hasSkippedTerm(...values) {
  const normalized = normalize(values.filter(Boolean).join(" "));
  return SKIPPED_WEAPON_TERMS.some((term) => normalized.includes(term));
}

function getCompatibleWeapons(originalWeapon, mode) {
  if (!originalWeapon?.damage) return [];

  return weaponCatalog.filter((weapon) => {
    if (!weapon.damage) return false;
    if (mode === "ranged" && !weapon.types.some((type) => type === "distância" || type === "arremesso")) return false;
    if (mode === "melee" && !weapon.types.includes("corpo a corpo")) return false;
    if (!weapon.grips.some((grip) => originalWeapon.grips.includes(grip))) return false;
    if (weapon.category === "exótica" && originalWeapon.category !== "exótica") return false;

    return true;
  });
}

function splitDamageModifiers(damageText) {
  const firstPart = damageText.split(",")[0].trim();
  const match = firstPart.match(/^\d+d\d+(?<modifier>[+-]\d+)?(?<suffix>.*)$/i);

  return {
    modifier: match?.groups?.modifier ?? "",
    suffix: match?.groups?.suffix ?? ""
  };
}

function formatCritical(weapon) {
  if (!weapon.critical || weapon.critical === "x2") return "";
  return `, ${weapon.critical}`;
}

function formatDamageTypes(weapon) {
  return weapon.damageTypes.length === 1 ? ` ${weapon.damageTypes[0]}` : "";
}

function replaceWeaponAction(action, rng) {
  if (!isWeaponAction(action) || !action.text) return null;

  const match = action.text.match(ACTION_PATTERN);
  if (!match?.groups) return null;

  const originalWeapon = findWeaponInLabel(match.groups.attackLabel);
  if (!originalWeapon) return null;
  if (hasSkippedTerm(match.groups.attackLabel)) return null;

  const mode = getActionMode(action, originalWeapon);
  const candidates = getCompatibleWeapons(originalWeapon, mode).filter((weapon) => weapon.id !== originalWeapon.id);
  if (candidates.length === 0) return null;

  const weapon = pick(rng, candidates);
  const { modifier, suffix } = splitDamageModifiers(match.groups.damageText);
  const damageTypes = formatDamageTypes(weapon);
  const critical = formatCritical(weapon);
  const prefix = match.groups.prefix ?? "";
  const tail = match.groups.tail ?? "";
  const replacementText = `${prefix}${weapon.name} ${match.groups.attackBonus} (${weapon.damage}${modifier}${suffix}${damageTypes}${critical})${tail}`;

  return {
    action: {
      ...action,
      text: replacementText,
      originalText: action.originalText ?? action.text
    },
    variation: {
      from: originalWeapon.name,
      to: weapon.name,
      mode,
      version: WEAPON_VARIATION_VERSION
    }
  };
}

export function applyWeaponVariation(creature, rng) {
  if (!isVariableCreature(creature)) return creature;

  const replacements = [];
  const actions = creature.actions.map((action) => {
    const result = replaceWeaponAction(action, rng);
    if (!result) return action;

    replacements.push(result.variation);
    return result.action;
  });

  if (replacements.length === 0) return creature;

  const weaponNames = [...new Set(replacements.map((replacement) => replacement.to))];

  return {
    ...creature,
    actions,
    equipment: `Equipamento desta cena: ${weaponNames.join(", ")}. Base: ${creature.equipment}`,
    weaponVariation: {
      version: WEAPON_VARIATION_VERSION,
      replacements
    }
  };
}

export function getWeaponVariationLabel(creature) {
  const replacements = creature?.weaponVariation?.replacements ?? [];
  if (replacements.length === 0) return null;

  return replacements
    .map((replacement) => `${replacement.from} -> ${replacement.to}`)
    .join("; ");
}
