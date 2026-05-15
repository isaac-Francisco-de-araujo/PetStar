import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { formatBRL, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-glow">
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={640}
          height={640}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary backdrop-blur">
          {product.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug">{product.name}</h3>
        <p className="line-clamp-2 text-xs text-muted-foreground">{product.description}</p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <span className="text-lg font-bold text-foreground">{formatBRL(product.price)}</span>
          <button
            onClick={() => add(product)}
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-hero px-3.5 py-2 text-xs font-semibold text-white shadow-soft transition hover:shadow-glow active:scale-95"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            Comprar
          </button>
        </div>
      </div>
    </article>
  );
}
