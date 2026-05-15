import { createFileRoute, Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { categories, products, type Category } from "@/lib/products";

interface ProductSearch {
  q?: string;
  cat?: Category;
}

export const Route = createFileRoute("/produtos")({
  validateSearch: (search: Record<string, unknown>): ProductSearch => ({
    q: typeof search.q === "string" ? search.q : undefined,
    cat: categories.includes(search.cat as Category) ? (search.cat as Category) : undefined,
  }),
  component: ProductsPage,
  head: () => ({
    meta: [
      { title: "Produtos — PetShop" },
      { name: "description", content: "Catálogo completo de produtos para pets: rações, brinquedos, higiene e acessórios." },
    ],
  }),
});

function ProductsPage() {
  const { q, cat } = Route.useSearch();
  const navigate = Route.useNavigate();

  const filtered = products.filter((p) => {
    const matchCat = !cat || p.category === cat;
    const matchQ = !q || p.name.toLowerCase().includes(q.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold md:text-4xl">Nossos produtos</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? "item encontrado" : "itens encontrados"}
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative max-w-md flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q ?? ""}
            onChange={(e) =>
              navigate({ search: (s: ProductSearch) => ({ ...s, q: e.target.value || undefined }) })
            }
            placeholder="Buscar produto..."
            className="w-full rounded-full border border-border bg-secondary/60 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            to="/produtos"
            search={{ cat: undefined, q }}
            className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition ${
              !cat ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"
            }`}
          >
            Todos
          </Link>
          {categories.map((c) => (
            <Link
              key={c}
              to="/produtos"
              search={{ cat: c, q }}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition ${
                cat === c ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"
              }`}
            >
              {c}
            </Link>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card py-20 text-center">
          <p className="text-lg font-semibold">Nenhum produto encontrado</p>
          <p className="mt-1 text-sm text-muted-foreground">Tente ajustar sua busca ou categoria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
