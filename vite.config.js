import { defineConfig } from "vite";
import { swPrecachePlugin } from "./build/swPrecache.js";

export default defineConfig({
  base: "/megadungeon/",
  plugins: [swPrecachePlugin()],
  server: {
    watch: {
      // O dev server roda no WSL sobre /mnt/c; inotify não recebe eventos do
      // filesystem do Windows, então sem polling o HMR serve módulos velhos.
      usePolling: true
    }
  }
});
