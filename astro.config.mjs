import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import node from "@astrojs/node";

// https://astro.build/config
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte(), tailwind(), mdx()],
  outDir: "./dist",
  output: "server",
  adapter: node({
    mode: "middleware"
  }),
	server: {
		port: 3000
	}
});