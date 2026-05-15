import { Link, useNavigate } from "@tanstack/react-router";
import { ShoppingCart, Search, User, LogOut, Menu, X } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import logo from "@/assets/logo-petshop.png";

export function Header() {
  const { count } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    setOpen(false);
    navigate({ to: "/produtos", search: { q: q || undefined, cat: undefined } });
  };

  const navLinkCls =
    "rounded-md px-3 py-2 text-sm font-semibold text-foreground/80 transition hover:text-primary hover:-translate-y-0.5";

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center gap-4 px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2 shrink-0" aria-label="PetShop">
          <img
            src={logo}
            alt="PetShop"
            className="h-14 w-auto md:h-16 drop-shadow-sm transition hover:scale-105"
          />
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

        <nav className="ml-auto hidden items-center gap-1 md:flex">
          <Link
            to="/"
            className={navLinkCls}
            activeProps={{ className: "text-primary" }}
            activeOptions={{ exact: true }}
          >
            Início
          </Link>
          <Link to="/produtos" className={navLinkCls} activeProps={{ className: "text-primary" }}>
            Produtos
          </Link>
          <Link to="/servicos" className={navLinkCls} activeProps={{ className: "text-primary" }}>
            Serviços
          </Link>

          {user ? (
            <div className="flex items-center gap-2">
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
              className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-semibold text-foreground/80 transition hover:text-primary"
            >
              <User className="h-4 w-4" /> Login
            </Link>
          )}

          <Link
            to="/carrinho"
            aria-label="Carrinho"
            className="relative ml-1 grid h-10 w-10 place-items-center rounded-full bg-secondary text-foreground transition hover:scale-105 hover:bg-primary hover:text-primary-foreground"
          >
            <ShoppingCart className="h-4 w-4" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid min-w-5 h-5 place-items-center rounded-full bg-[var(--accent)] px-1 text-[10px] font-bold text-white shadow-soft">
                {count}
              </span>
            )}
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-2 md:hidden">
          <Link
            to="/carrinho"
            aria-label="Carrinho"
            className="relative grid h-10 w-10 place-items-center rounded-full bg-secondary text-foreground"
          >
            <ShoppingCart className="h-4 w-4" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid min-w-5 h-5 place-items-center rounded-full bg-[var(--accent)] px-1 text-[10px] font-bold text-white shadow-soft">
                {count}
              </span>
            )}
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="grid h-10 w-10 place-items-center rounded-full bg-secondary"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <form onSubmit={onSearch} className="relative px-4 py-3">
            <Search className="pointer-events-none absolute left-7 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar produtos..."
              className="w-full rounded-full border border-border bg-secondary/60 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary focus:bg-background"
            />
          </form>
          <nav className="flex flex-col gap-1 px-3 pb-4">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-semibold hover:bg-secondary"
            >
              Início
            </Link>
            <Link
              to="/produtos"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-semibold hover:bg-secondary"
            >
              Produtos
            </Link>
            <Link
              to="/servicos"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-semibold hover:bg-secondary"
            >
              Serviços
            </Link>
            <Link
              to="/carrinho"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-semibold hover:bg-secondary"
            >
              Carrinho
            </Link>
            {user ? (
              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="rounded-lg px-3 py-2.5 text-left text-sm font-semibold hover:bg-secondary"
              >
                Sair
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-semibold hover:bg-secondary"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
