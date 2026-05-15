import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import type { Product } from "@/lib/products";

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  add: (p: Product) => void;
  remove: (id: string) => void;
  setQuantity: (id: string, q: number) => void;
  clear: () => void;
  count: number;
  total: number;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "petshop_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items]);

  const add = (p: Product) => {
    setItems((curr) => {
      const found = curr.find((i) => i.id === p.id);
      if (found) {
        return curr.map((i) => (i.id === p.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...curr, { ...p, quantity: 1 }];
    });
    toast.success(`${p.name} adicionado ao carrinho`);
  };

  const remove = (id: string) => {
    setItems((curr) => curr.filter((i) => i.id !== id));
  };

  const setQuantity = (id: string, q: number) => {
    if (q <= 0) return remove(id);
    setItems((curr) => curr.map((i) => (i.id === id ? { ...i, quantity: q } : i)));
  };

  const clear = () => setItems([]);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((s, i) => s + i.quantity, 0);
    const total = items.reduce((s, i) => s + i.quantity * i.price, 0);
    return { items, add, remove, setQuantity, clear, count, total };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
