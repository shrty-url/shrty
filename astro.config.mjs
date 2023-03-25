import { defineConfig } from "astro/config";

import svelte from "@astrojs/svelte";

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte(), tailwind()],
  outDir: "./dist",
  output: "server",
  adapter: node({
    mode: "standalone"
  })
});