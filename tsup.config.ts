import path from "path"
import { defineConfig } from "tsup"

export default defineConfig({
  entry: {
    index: "src/index.ts",
    button: "src/components/button/index.ts",
    input: "src/components/input/index.ts",
  },
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: false,
  treeshake: true,
  external: ["react", "react-dom"],
  esbuildOptions(options) {
    options.alias = {
      "@": path.resolve(import.meta.dirname, "src"),
    }
  },
})
