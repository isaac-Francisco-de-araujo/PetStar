import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface User {
  name: string;
  email: string;
}

interface AuthContextValue {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);
const TOKEN_KEY = "petshop_token";
const USER_KEY = "petshop_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const t = localStorage.getItem(TOKEN_KEY);
    const u = localStorage.getItem(USER_KEY);
    if (t) setToken(t);
    if (u) setUser(JSON.parse(u));
  }, []);

  const persist = (t: string, u: User) => {
    localStorage.setItem(TOKEN_KEY, t);
    localStorage.setItem(USER_KEY, JSON.stringify(u));
    setToken(t);
    setUser(u);
  };

  // Mock JWT-like token. Replace with real backend later.
  const login = async (email: string, password: string) => {
    if (!email || !password) throw new Error("Credenciais inválidas");
    await new Promise((r) => setTimeout(r, 500));
    const u: User = { name: email.split("@")[0], email };
    persist(`mock.${btoa(email)}.${Date.now()}`, u);
  };

  const register = async (name: string, email: string, password: string) => {
    if (!name || !email || !password) throw new Error("Preencha todos os campos");
    await new Promise((r) => setTimeout(r, 500));
    const u: User = { name, email };
    persist(`mock.${btoa(email)}.${Date.now()}`, u);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
