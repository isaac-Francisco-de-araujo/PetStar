import { createFileRoute, Link } from "@tanstack/react-router";
import { usePets } from "@/contexts/PetContext";
import { Video, Calendar, CheckCircle2, Clock3, Sparkles } from "lucide-react";

export const Route = createFileRoute("/meu-pet")({
  component: MeuPet,
  head: () => ({ meta: [{ title: "Meu Pet — PetStar" }] }),
});

function MeuPet() {
  const { pets, services } = usePets();
  const pet = pets[0];
  const petServices = services.filter((s) => s.petId === pet?.id);
  const ongoing = petServices.find((s) => s.status === "em-andamento");

  if (!pet) {
    return <div className="mx-auto max-w-4xl px-4 py-16 text-center">Nenhum pet cadastrado.</div>;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <div className="overflow-hidden rounded-3xl bg-gradient-hero p-1 shadow-card">
        <div className="rounded-[calc(1.5rem-2px)] bg-card p-6 md:p-8">
          <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
            <img
              src={pet.photo} alt={pet.name}
              className="h-32 w-32 rounded-2xl object-cover ring-4 ring-primary/20 md:h-40 md:w-40"
            />
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-extrabold md:text-4xl">{pet.name}</h1>
              <p className="text-muted-foreground">{pet.breed}</p>
              <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
                <Info label="Idade" value={pet.age} />
                <Info label="Peso" value={pet.weight} />
                <Info label="Raça" value={pet.breed} />
              </div>
            </div>
            {ongoing && (
              <Link
                to="/monitoramento"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-hero px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:shadow-glow"
              >
                <Video className="h-4 w-4" /> Ver ao vivo
              </Link>
            )}
          </div>
        </div>
      </div>

      {ongoing && (
        <div className="mt-6 flex items-center gap-3 rounded-2xl border border-accent/30 bg-accent/10 p-4">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-accent text-white">
            <Sparkles className="h-5 w-5" />
          </span>
          <div className="flex-1">
            <p className="text-sm font-semibold">{ongoing.service} em andamento</p>
            <p className="text-xs text-muted-foreground">{ongoing.date}</p>
          </div>
          <Link to="/monitoramento" className="text-sm font-semibold text-primary hover:underline">
            Acompanhar →
          </Link>
        </div>
      )}

      <h2 className="mt-10 text-xl font-extrabold">Histórico de serviços</h2>
      <div className="mt-4 grid gap-3">
        {petServices.map((s) => (
          <div key={s.id} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-card">
            <span className={`grid h-10 w-10 place-items-center rounded-full ${
              s.status === "concluido" ? "bg-green-100 text-green-600"
              : s.status === "em-andamento" ? "bg-accent/20 text-accent-brand"
              : "bg-primary/10 text-primary"
            }`}>
              {s.status === "concluido" ? <CheckCircle2 className="h-5 w-5" /> : <Clock3 className="h-5 w-5" />}
            </span>
            <div className="flex-1 min-w-0">
              <p className="truncate font-semibold">{s.service}</p>
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" /> {s.date}
              </p>
            </div>
            <div className="text-right">
              <p className="font-bold">R$ {s.price.toFixed(2)}</p>
              <span className="text-xs capitalize text-muted-foreground">{s.status.replace("-", " ")}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-secondary px-3 py-2">
      <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="font-semibold">{value}</div>
    </div>
  );
}
