import { Link, useNavigate } from "@tanstack/react-router";
import { ShoppingCart, Search, User, PawPrint, LogOut } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

export function Header() {
  const { count } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    navigate({ to: "/produtos", search: { q: q || undefined, cat: undefined } });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg shrink-0">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-hero text-white shadow-soft">
            <PawPrint className="h-5 w-5" />
          </span>
          <span className="hidden sm:inline">PetShop</span>
        </Link>

        <form onSubmit={onSearch} className="relative hidden flex-1 max-w-xl md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar rações, brinquedos, acessórios..."
            className="w-full rounded-full border border-border bg-secondary/60 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/20"
          />
        </form>

        <nav className="ml-auto flex items-center gap-1 sm:gap-2">
          <Link to="/" className="hidden rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition hover:text-primary md:inline-block" activeProps={{ className: "text-primary" }} activeOptions={{ exact: true }}>
            Início
          </Link>
          <Link to="/produtos" className="hidden rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition hover:text-primary md:inline-block" activeProps={{ className: "text-primary" }}>
            Produtos
          </Link>

          {user ? (
            <div className="hidden items-center gap-2 md:flex">
              <span className="rounded-full bg-secondary px-3 py-1.5 text-xs font-medium">
                Olá, {user.name}
              </span>
              <button
                onClick={logout}
                aria-label="Sair"
                className="grid h-9 w-9 place-items-center rounded-full text-foreground/70 transition hover:bg-secondary hover:text-primary"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition hover:text-primary md:inline-flex"
            >
              <User className="h-4 w-4" /> Login
            </Link>
          )}

          <Link
            to="/carrinho"
            aria-label="Carrinho"
            className="relative grid h-10 w-10 place-items-center rounded-full bg-secondary text-foreground transition hover:scale-105 hover:bg-primary hover:text-primary-foreground"
          >
            <ShoppingCart className="h-4.5 w-4.5" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid min-w-5 h-5 place-items-center rounded-full bg-[var(--accent)] px-1 text-[10px] font-bold text-white shadow-soft">
                {count}
              </span>
            )}
          </Link>
        </nav>
      </div>

      <form onSubmit={onSearch} className="relative px-4 pb-3 md:hidden">
        <Search className="pointer-events-none absolute left-7 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar produtos..."
          className="w-full rounded-full border border-border bg-secondary/60 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary focus:bg-background"
        />
      </form>
    </header>
  );
}
