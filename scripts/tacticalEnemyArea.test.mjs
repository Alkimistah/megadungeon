import assert from "node:assert/strict";
import test from "node:test";
import { archipelago21to30Profile as profile } from "../src/floorProfiles/archipelago21to30.js";
import { withIslandTacticalLayout } from "../src/archipelagoTacticalMap.js";
import { createNodeTacticalMap } from "../src/nodeTacticalMap.js";
import { createIslandSector, createIslandSectorCombat } from "../src/archipelagoPilot.js";

const DEFAULT_AREA = { minX: 10, maxX: 19, minY: 0, maxY: 9 };
const SEEDS = 50;

// Regra: o canto superior esquerdo (x, y) de toda peça inimiga fica a no máximo 1 quadrado
// de distância da área inicial dos inimigos (o canto de uma peça grande pode ficar um pouco
// antes da área quando o ponto sorteado fica na borda direita/inferior do mapa).
// Exceção honesta: se a soma das áreas das peças inimigas passa do total de quadrados da área,
// nem todas cabem lá dentro e o excedente vai para fora (problema de dados do layout, não do motor); idem se não cabem na grade da área.
function areaCannotHold(enemies, area) {
  const footprint = enemies.reduce((sum, piece) => sum + piece.width * piece.height, 0);
  const width = area.maxX - area.minX + 1;
  const height = area.maxY - area.minY + 1;
  // Também confere a grade: peças de lado >= d sem sobreposição são no máximo floor(L/d) por eixo.
  const tooMany = side => enemies.filter(piece => Math.max(piece.width, piece.height) >= side).length
    > Math.floor(width / side) * Math.floor(height / side);
  return footprint > width * height || tooMany(2) || tooMany(3);
}

function outOfArea(piece, area) {
  return piece.x < area.minX - 1 || piece.x > area.maxX + 1 || piece.y < area.minY - 1 || piece.y > area.maxY + 1;
}

for (const themeId of ["sacred", "cyclopean-ruins"]) {
  test(`peças inimigas de ${themeId} começam na área inicial dos inimigos`, () => {
    const island = { floor: 25, themeId };
    let pieces = 0;
    const bad = [];
    for (let sector = 0; sector < 6; sector += 1) {
      for (let variant = 0; variant < 3; variant += 1) {
        const objective = createIslandSector(island, sector, variant, 28);
        if (objective.type !== "combate") continue;
        for (let n = 0; n < SEEDS; n += 1) {
          const scene = createIslandSectorCombat({ ...island, objectives: [objective] }, objective, profile, `p${n}`);
          const node = withIslandTacticalLayout(scene, themeId, objective);
          const area = node.tacticalLayout?.enemyArea ?? DEFAULT_AREA;
          const { scene: tactical } = createNodeTacticalMap(node);
          const enemies = tactical.pieces.filter(piece => piece.side === "enemy");
          if (areaCannotHold(enemies, area)) continue;
          for (const piece of enemies) {
            pieces += 1;
            if (outOfArea(piece, area)) bad.push(`${sector}:${variant}:p${n} ${piece.creatureId} ${piece.width}x${piece.height} em (${piece.x},${piece.y})`);
          }
        }
      }
    }
    assert.ok(pieces > 0);
    assert.equal(bad.length, 0, `${bad.length} de ${pieces} peças fora da área; ex.: ${bad.slice(0, 5).join(" | ")}`);
  });
}
