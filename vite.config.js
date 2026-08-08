import { defineConfig } from "vite";

export default defineConfig({
  base: "/megadungeon/",
  server: {
    watch: {
      // O dev server roda no WSL sobre /mnt/c; inotify não recebe eventos do
      // filesystem do Windows, então sem polling o HMR serve módulos velhos.
      usePolling: true
    }
  }
});
