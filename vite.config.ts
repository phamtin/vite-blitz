import { defineConfig } from "vite";
import path from "node:path";
import viteReact from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig({
  plugins: [
    TanStackRouterVite({
      routesDirectory: "./routes",
      generatedRouteTree: "./routeTree.gen.ts",
    }),
    viteReact(),
  ],
  resolve: {
    alias: {
      api: path.resolve(__dirname, "./api"),
      components: path.resolve(__dirname, "./components"),
      constants: path.resolve(__dirname, "./constants"),
      hooks: path.resolve(__dirname, "./hooks"),
      layouts: path.resolve(__dirname, "./layouts"),
      modules: path.resolve(__dirname, "./modules"),
      public: path.resolve(__dirname, "./public"),
      routes: path.resolve(__dirname, "./routes"),
      store: path.resolve(__dirname, "./store"),
      styles: path.resolve(__dirname, "./styles"),
      types: path.resolve(__dirname, "./types"),
      utils: path.resolve(__dirname, "./utils"),
    },
  },
  build: {
    outDir: "build",
    lib: {
      entry: path.resolve(__dirname, "./index.html"),
      formats: ["es"],
      name: "blitz-frontend",
    },
  },
});
