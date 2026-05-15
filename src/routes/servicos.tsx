import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, CalendarCheck } from "lucide-react";
import { toast } from "sonner";
import { services, formatBRL } from "@/lib/products";

export const Route = createFileRoute("/servicos")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: "Serviços Pet — PetShop" },
      { name: "description", content: "Banho, tosa, higiene dental e mais. Serviços completos para o seu pet com profissionais experientes." },
      { property: "og:title", content: "Serviços Pet — PetShop" },
      { property: "og:description", content: "Banho, tosa e cuidados completos para o seu pet." },
    ],
  }),
});

function ServicesPage() {
  const handleSchedule = (name: string) => {
    toast.success(`Agendamento de ${name} solicitado!`, {
      description: "Em breve nossa equipe entrará em contato.",
    });
  };

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-soft">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[var(--accent)]/15 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 text-center md:px-6 md:py-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold text-primary shadow-soft">
            <Sparkles className="h-3.5 w-3.5" /> Serviços Populares
          </span>
          <h1 className="mt-5 text-4xl font-extrabold md:text-5xl">
            Cuidado <span className="bg-gradient-hero bg-clip-text text-transparent">profissional</span> para seu pet
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
            Equipe treinada, ambiente seguro e produtos premium para o melhor cuidado.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <article
              key={s.id}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-glow"
            >
              {s.popular && (
                <span className="absolute right-4 top-4 rounded-full bg-[var(--accent)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-soft">
                  Popular
                </span>
              )}
              <span className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-soft text-4xl transition group-hover:scale-110">
                {s.icon}
              </span>
              <h3 className="mt-5 text-xl font-bold">{s.name}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.description}</p>
              <div className="mt-6 flex items-center justify-between gap-3 border-t border-border pt-4">
                <div>
                  <p className="text-xs text-muted-foreground">A partir de</p>
                  <p className="text-2xl font-extrabold text-foreground">{formatBRL(s.price)}</p>
                </div>
                <button
                  onClick={() => handleSchedule(s.name)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-gradient-hero px-4 py-2.5 text-xs font-semibold text-white shadow-soft transition hover:shadow-glow active:scale-95"
                >
                  <CalendarCheck className="h-4 w-4" />
                  Agendar
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
