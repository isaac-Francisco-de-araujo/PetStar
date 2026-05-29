// src/main.tsx — Entry point para SPA (Vercel / modo estático)
// Substitui o entry point SSR do TanStack Start para deploy na Vercel

import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Importa a route tree gerada automaticamente pelo TanStack Router Vite plugin
import { routeTree } from "./routeTree.gen";

import "./index.css";

// Cria o QueryClient para TanStack Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutos
      retry: 1,
    },
  },
});

// Cria o router com a route tree gerada
const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
});

// Type safety para o router
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Renderiza a aplicação
const rootElement = document.getElementById("root")!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>
  );
}