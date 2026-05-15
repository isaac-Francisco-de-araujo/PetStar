import { Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { PawPrint, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (mode === "register" && name.trim().length < 2) e.name = "Informe seu nome";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "E-mail inválido";
    if (password.length < 6) e.password = "Mínimo de 6 caracteres";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      if (mode === "login") await login(email, password);
      else await register(name, email, password);
      toast.success(mode === "login" ? "Bem-vindo de volta!" : "Conta criada com sucesso!");
      navigate({ to: "/" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao autenticar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md flex-col justify-center px-4 py-10">
      <div className="rounded-3xl border border-border bg-card p-8 shadow-card">
        <div className="flex flex-col items-center text-center">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-hero text-white shadow-soft">
            <PawPrint className="h-6 w-6" />
          </span>
          <h1 className="mt-4 text-2xl font-extrabold">
            {mode === "login" ? "Entrar" : "Criar conta"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {mode === "login" ? "Acesse sua conta PetShop" : "Comece a cuidar do seu pet"}
          </p>
        </div>

        <form onSubmit={onSubmit} className="mt-7 space-y-4">
          {mode === "register" && (
            <Field label="Nome" error={errors.name}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="auth-input"
                placeholder="Seu nome"
              />
            </Field>
          )}
          <Field label="E-mail" error={errors.email}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
              placeholder="voce@email.com"
            />
          </Field>
          <Field label="Senha" error={errors.password}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input"
              placeholder="••••••••"
            />
          </Field>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-hero py-3 text-sm font-semibold text-white shadow-soft transition hover:shadow-glow disabled:opacity-60"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {mode === "login" ? "Entrar" : "Criar conta"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {mode === "login" ? (
            <>
              Não tem conta?{" "}
              <Link to="/cadastro" className="font-semibold text-primary hover:underline">
                Cadastre-se
              </Link>
            </>
          ) : (
            <>
              Já tem conta?{" "}
              <Link to="/login" className="font-semibold text-primary hover:underline">
                Entrar
              </Link>
            </>
          )}
        </p>
      </div>

      <style>{`
        .auth-input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid var(--border);
          background: var(--secondary);
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          outline: none;
          transition: all 0.15s;
        }
        .auth-input:focus {
          border-color: var(--primary);
          background: var(--background);
          box-shadow: 0 0 0 3px color-mix(in oklab, var(--primary) 20%, transparent);
        }
      `}</style>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-foreground/80">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
