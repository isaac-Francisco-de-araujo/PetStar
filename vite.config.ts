// vite.config.ts — configuração para deploy na Vercel
//
// IMPORTANTE: Este arquivo substitui o uso do @lovable.dev/vite-tanstack-config
// que força o build para Cloudflare Workers (incompatível com Vercel).
// Aqui usamos o @tanstack/router-plugin diretamente com preset "static" (SPA).

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tsConfigPaths from "vite-tsconfig-paths";

// Detecta se estamos no ambiente Vercel
const isVercel = process.env.VERCEL === "1" || process.env.VERCEL_ENV !== undefined;

export default defineConfig({
  plugins: [
    // TanStack Router file-based routing (sem SSR)
    TanStackRouterVite({
      routesDirectory: "./src/routes",
      generatedRouteTree: "./src/routeTree.gen.ts",
      autoCodeSplitting: true,
    }),
    react(),
    tailwindcss(),
    tsConfigPaths(),
  ],

  // Build para SPA estático — compatível com Vercel
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: "./index.html",
      },
      output: {
        // Code splitting para melhor performance
        manualChunks: {
          vendor: ["react", "react-dom"],
          router: ["@tanstack/react-router"],
          query: ["@tanstack/react-query"],
        },
      },
    },
    // Aumenta o limite de aviso de chunk
    chunkSizeWarningLimit: 1000,
  },

  resolve: {
    alias: {
      "@": "/src",
    },
  },

  // Configuração do servidor de desenvolvimento
  server: {
    port: 3000,
    host: true,
    strictPort: false,
  },

  // Otimizações
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "@tanstack/react-router",
      "@tanstack/react-query",
    ],
  },
});