import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { User, Mail, PawPrint, LogOut, Heart, ShoppingBag, MessageCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { usePets } from "@/contexts/PetContext";

export const Route = createFileRoute("/perfil")({
  component: Perfil,
  head: () => ({ meta: [{ title: "Meu Perfil — PetStar" }] }),
});

function Perfil() {
  const { user, logout } = useAuth();
  const { pets, services } = usePets();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate({ to: "/login" });
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="overflow-hidden rounded-3xl bg-gradient-hero p-1 shadow-card">
        <div className="rounded-[calc(1.5rem-2px)] bg-card p-6 md:p-8">
          <div className="flex flex-col items-center gap-5 md:flex-row md:items-center">
            <div className="grid h-20 w-20 place-items-center rounded-full bg-gradient-hero text-2xl font-extrabold text-white shadow-soft">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-extrabold md:text-3xl">{user.name}</h1>
              <p className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground md:justify-start">
                <Mail className="h-3.5 w-3.5" /> {user.email}
              </p>
            </div>
            <button
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground/80 transition hover:border-destructive hover:text-destructive"
            >
              <LogOut className="h-4 w-4" /> Sair
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Stat icon={<PawPrint className="h-5 w-5" />} value={pets.length} label="Pets cadastrados" />
        <Stat icon={<Heart className="h-5 w-5" />} value={services.filter((s) => s.status === "concluido").length} label="Serviços concluídos" />
        <Stat icon={<ShoppingBag className="h-5 w-5" />} value={services.filter((s) => s.status === "agendado").length} label="Agendamentos" />
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <ActionCard to="/meu-pet" icon={<PawPrint className="h-5 w-5" />} title="Meu Pet" desc="Veja informações e histórico" />
        <ActionCard to="/chat" icon={<MessageCircle className="h-5 w-5" />} title="Chat com atendimento" desc="Fale com nosso time" />
      </div>

      <h2 className="mt-10 mb-3 text-lg font-extrabold">Meus pets</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {pets.map((p) => (
          <Link key={p.id} to="/meu-pet" className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-card transition hover:-translate-y-0.5 hover:shadow-glow">
            <img src={p.photo} alt={p.name} className="h-16 w-16 rounded-xl object-cover" />
            <div className="min-w-0">
              <p className="truncate font-bold">{p.name}</p>
              <p className="text-xs text-muted-foreground">{p.breed} · {p.age}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: number; label: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-card">
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">{icon}</span>
      <div>
        <div className="text-2xl font-extrabold">{value}</div>
        <div className="text-xs text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}

function ActionCard({ to, icon, title, desc }: { to: "/meu-pet" | "/chat"; icon: React.ReactNode; title: string; desc: string }) {
  return (
    <Link to={to} className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-card transition hover:-translate-y-0.5 hover:border-primary hover:shadow-glow">
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-hero text-white shadow-soft">{icon}</span>
      <div className="flex-1">
        <p className="font-bold group-hover:text-primary">{title}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
      <User className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary" />
    </Link>
  );
}
