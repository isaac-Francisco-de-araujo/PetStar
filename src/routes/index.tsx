import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Truck, ShieldCheck, Heart, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero-pets.jpg";
import { ProductCard } from "@/components/ProductCard";
import { categories, products } from "@/lib/products";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "PetShop — Tudo que seu pet precisa" },
      { name: "description", content: "Rações, brinquedos, higiene e acessórios premium com entrega rápida para todo Brasil." },
    ],
  }),
});

const categoryIcons: Record<string, string> = {
  "Rações": "🥣",
  "Brinquedos": "🎾",
  "Higiene": "🧴",
  "Acessórios": "🦴",
};

function Home() {
  const featured = products.filter((p) => p.featured);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-soft">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[var(--accent)]/15 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />

        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:px-6 md:py-24">
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold text-primary shadow-soft">
              <Sparkles className="h-3.5 w-3.5" /> Frete grátis acima de R$ 199
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
              Tudo que seu <span className="bg-gradient-hero bg-clip-text text-transparent">pet</span> precisa
            </h1>
            <p className="mt-4 max-w-lg text-base text-muted-foreground md:text-lg">
              Rações premium, brinquedos divertidos, produtos de higiene e acessórios com a qualidade que seu melhor amigo merece.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/produtos"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-hero px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:shadow-glow active:scale-95"
              >
                Comprar agora <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/produtos"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold transition hover:border-primary hover:text-primary"
              >
                Ver categorias
              </Link>
            </div>

            <div className="mt-10 grid max-w-md grid-cols-3 gap-4">
              {[
                { icon: Truck, label: "Entrega rápida" },
                { icon: ShieldCheck, label: "Compra segura" },
                { icon: Heart, label: "Feito com amor" },
              ].map((f) => (
                <div key={f.label} className="flex flex-col items-center gap-1.5 rounded-xl bg-background/60 p-3 text-center text-xs font-medium shadow-soft">
                  <f.icon className="h-5 w-5 text-primary" />
                  {f.label}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-[3rem] bg-gradient-hero opacity-20 blur-3xl" />
            <img
              src={heroImg}
              alt="Cachorro e gato felizes"
              width={1280}
              height={960}
              className="rounded-[2.5rem] object-cover shadow-glow"
            />
          </div>
        </div>
      </section>

      {/* Categorias */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">Categorias</h2>
            <p className="mt-1 text-sm text-muted-foreground">Encontre tudo separado por tipo</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {categories.map((c) => (
            <Link
              key={c}
              to="/produtos"
              search={{ cat: c, q: undefined }}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 text-center shadow-card transition hover:-translate-y-1 hover:border-primary hover:shadow-glow"
            >
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-soft text-3xl transition group-hover:scale-110">
                {categoryIcons[c]}
              </span>
              <span className="font-semibold">{c}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Banner promocional */}
      <section className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-8 text-white shadow-glow md:p-12">
          <div className="pointer-events-none absolute -right-16 -top-16 h-60 w-60 rounded-full bg-white/15 blur-2xl" />
          <div className="relative max-w-xl">
            <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
              Promoção da semana
            </span>
            <h3 className="mt-3 text-3xl font-extrabold md:text-4xl">
              20% OFF em rações premium
            </h3>
            <p className="mt-2 text-white/90">
              Aproveite para abastecer a despensa do seu pet com economia.
            </p>
            <Link
              to="/produtos"
              search={{ cat: "Rações", q: undefined }}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-primary shadow-soft transition hover:scale-105"
            >
              Ver ofertas <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Produtos em destaque */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">Em destaque</h2>
            <p className="mt-1 text-sm text-muted-foreground">Os queridinhos da semana</p>
          </div>
          <Link to="/produtos" className="hidden items-center gap-1 text-sm font-semibold text-primary hover:underline md:inline-flex">
            Ver todos <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
