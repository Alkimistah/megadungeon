import { createHash } from "node:crypto";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const BUILD_ID_LINE = /^const BUILD_ID = "[^"]*";$/m;
const PRECACHE_LINE = /^const PRECACHE = \[.*\];$/m;
const EXCLUDED = new Set(["sw.js", "index.html", "manifest.webmanifest"]);

export function injectPrecache(swSource, files, buildId) {
  if (!BUILD_ID_LINE.test(swSource) || !PRECACHE_LINE.test(swSource)) {
    throw new Error("sw.js sem as linhas BUILD_ID/PRECACHE");
  }
  return swSource
    .replace(BUILD_ID_LINE, () => `const BUILD_ID = "${buildId}";`)
    .replace(PRECACHE_LINE, () => `const PRECACHE = ${JSON.stringify(files)};`);
}

export function buildIdOf(entries) {
  const hash = createHash("sha256");
  for (const { path, content } of [...entries].sort((a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0))) {
    hash.update(path);
    hash.update("\0");
    hash.update(content);
    hash.update("\0");
  }
  return hash.digest("hex").slice(0, 10);
}

function walk(dir, prefix = "") {
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    return entry.isDirectory() ? walk(join(dir, entry.name), rel) : [rel];
  });
}

export function listDistFiles(dir) {
  return walk(dir)
    .filter(file => !EXCLUDED.has(file) && !file.endsWith(".map"))
    .sort();
}

export function swPrecachePlugin() {
  let outDir = "dist";
  return {
    name: "mega-dungeon-sw-precache",
    apply: "build",
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      const files = listDistFiles(outDir);
      const entries = [...files, "index.html", "manifest.webmanifest"].map(path => ({ path, content: readFileSync(join(outDir, path)) }));
      const buildId = buildIdOf(entries);
      const swPath = join(outDir, "sw.js");
      writeFileSync(swPath, injectPrecache(readFileSync(swPath, "utf8"), files, buildId));
      console.log(`sw precache: ${files.length} arquivos, build ${buildId}`);
    }
  };
}
