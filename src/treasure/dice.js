// Expressões de dados das tabelas de tesouro: "d%", "1d6", "2d6+1", "1d3+1".
import { randomInt } from "../random.js";

const PATTERN = /^(\d*)d(\d+|%)([+-]\d+)?$/;

export function parseDice(expr) {
  const match = typeof expr === "string" ? expr.trim().match(PATTERN) : null;
  if (!match) throw new Error(`Expressão de dados inválida: ${expr}`);
  const count = match[1] === "" ? 1 : Number(match[1]);
  const sides = match[2] === "%" ? 100 : Number(match[2]);
  const bonus = match[3] ? Number(match[3]) : 0;
  if (count < 1 || sides < 1) throw new Error(`Expressão de dados inválida: ${expr}`);
  return { count, sides, bonus };
}

export function rollDice(expr, rng) {
  const { count, sides, bonus } = parseDice(expr);
  const rolls = [];
  let total = bonus;
  for (let i = 0; i < count; i++) {
    const roll = randomInt(rng, 1, sides);
    rolls.push(roll);
    total += roll;
  }
  return { total, rolls };
}

export function dieRange(die) {
  const { count, sides, bonus } = parseDice(die);
  return [count + bonus, count * sides + bonus];
}
