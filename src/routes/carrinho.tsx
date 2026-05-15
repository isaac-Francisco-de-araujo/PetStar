import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { formatBRL } from "@/lib/products";

export const Route = createFileRoute("/carrinho")({
  component: CartPage,
  head: () => ({ meta: [{ title: "Carrinho — PetShop" }] }),
});

function CartPage() {
  const { items, setQuantity, remove, total, clear } = useCart();
  const { user } = useAuth();

  const checkout = () => {
    if (!user) {
      toast.error("Entre na sua conta para finalizar a compra");
      return;
    }
    toast.success("Pedido realizado com sucesso!");
    clear();
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center md:px-6">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-soft">
          <ShoppingBag className="h-10 w-10 text-primary" />
        </div>
        <h1 className="mt-6 text-3xl font-extrabold">Seu carrinho está vazio</h1>
        <p className="mt-2 text-muted-foreground">Que tal adicionar alguns mimos para o seu pet?</p>
        <Link
          to="/produtos"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-hero px-6 py-3 text-sm font-semibold text-white shadow-soft hover:shadow-glow"
        >
          Explorar produtos <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
      <h1 className="text-3xl font-extrabold md:text-4xl">Carrinho</h1>
      <p className="mt-1 text-sm text-muted-foreground">{items.length} {items.length === 1 ? "produto" : "produtos"}</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <ul className="space-y-4">
          {items.map((it) => (
            <li
              key={it.id}
              className="flex gap-4 rounded-2xl border border-border bg-card p-4 shadow-card transition hover:shadow-glow"
            >
              <img src={it.image} alt={it.name} loading="lazy" className="h-24 w-24 shrink-0 rounded-xl object-cover" />
              <div className="flex flex-1 flex-col gap-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-primary">{it.category}</p>
                    <h3 className="text-sm font-semibold leading-snug">{it.name}</h3>
                  </div>
                  <button
                    onClick={() => remove(it.id)}
                    aria-label="Remover"
                    className="rounded-full p-2 text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <div className="inline-flex items-center rounded-full border border-border">
                    <button onClick={() => setQuantity(it.id, it.quantity - 1)} className="grid h-8 w-8 place-items-center rounded-l-full hover:bg-secondary" aria-label="Diminuir">
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold">{it.quantity}</span>
                    <button onClick={() => setQuantity(it.id, it.quantity + 1)} className="grid h-8 w-8 place-items-center rounded-r-full hover:bg-secondary" aria-label="Aumentar">
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <span className="text-base font-bold">{formatBRL(it.price * it.quantity)}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-2xl border border-border bg-card p-6 shadow-card lg:sticky lg:top-24">
          <h2 className="text-lg font-bold">Resumo</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span><span>{formatBRL(total)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Frete</span><span className="text-primary">Grátis</span>
            </div>
            <div className="my-3 h-px bg-border" />
            <div className="flex justify-between text-base font-bold">
              <span>Total</span><span>{formatBRL(total)}</span>
            </div>
          </div>
          <button
            onClick={checkout}
            className="mt-5 w-full rounded-full bg-gradient-hero py-3 text-sm font-semibold text-white shadow-soft transition hover:shadow-glow active:scale-95"
          >
            Finalizar compra
          </button>
          <button onClick={clear} className="mt-2 w-full rounded-full border border-border py-2.5 text-xs font-medium text-muted-foreground hover:text-destructive">
            Limpar carrinho
          </button>
        </aside>
      </div>
    </div>
  );
}
