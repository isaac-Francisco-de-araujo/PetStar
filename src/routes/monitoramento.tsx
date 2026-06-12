import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Video, Wifi, Maximize2 } from "lucide-react";
import camBanho from "@/assets/cam-banho.jpg";
import camTosa from "@/assets/cam-tosa.jpg";
import camRecreacao from "@/assets/cam-recreacao.jpg";
import camDescanso from "@/assets/cam-descanso.jpg";
import { usePets } from "@/contexts/PetContext";

export const Route = createFileRoute("/monitoramento")({
  component: Monitoramento,
  head: () => ({ meta: [{ title: "Central de Monitoramento — PetStar" }] }),
});

const cams = [
  { id: "cam01", area: "Área de Banho", img: camBanho, status: "Em banho", color: "bg-blue-500" },
  { id: "cam02", area: "Sala de Tosa", img: camTosa, status: "Tosa em andamento", color: "bg-accent" },
  { id: "cam03", area: "Recreação", img: camRecreacao, status: "Brincando", color: "bg-green-500" },
  { id: "cam04", area: "Descanso", img: camDescanso, status: "Descansando", color: "bg-purple-500" },
];

function useClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTime(d.toLocaleTimeString("pt-BR"));
    };
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);
  return time;
}

function Monitoramento() {
  const { pets } = usePets();
  const pet = pets[0];
  const time = useClock();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-red-500/10 px-3 py-1 text-xs font-bold text-red-600">
            <span className="grid h-2 w-2 animate-pulse rounded-full bg-red-500" /> AO VIVO
          </div>
          <h1 className="mt-2 text-3xl font-extrabold md:text-4xl">Central de Monitoramento</h1>
          <p className="text-sm text-muted-foreground">
            Acompanhe {pet?.name ?? "seu pet"} em tempo real durante o atendimento.
          </p>
        </div>
        <div className="flex items-center gap-4 rounded-2xl border border-border bg-card px-4 py-3 shadow-card">
          <Wifi className="h-5 w-5 text-green-500" />
          <div>
            <div className="text-xs text-muted-foreground">Conexão</div>
            <div className="font-mono text-sm font-bold">{time}</div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {cams.map((c) => (
          <div key={c.id} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-card transition hover:shadow-glow">
            <div className="relative aspect-video overflow-hidden bg-black">
              <img
                src={c.img} alt={c.area} loading="lazy"
                className="h-full w-full object-cover transition group-hover:scale-105"
              />
              <div className="absolute left-3 top-3 flex items-center gap-2 rounded-md bg-black/70 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                <span className="grid h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
                REC · {c.id}
              </div>
              <div className="absolute right-3 top-3 rounded-md bg-black/70 px-2 py-1 font-mono text-[10px] text-white">
                {time}
              </div>
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/80 to-transparent p-3 text-white">
                <div>
                  <div className="text-xs opacity-80">{c.area}</div>
                  <div className="text-sm font-bold">{pet?.name ?? "Pet"} · {c.status}</div>
                </div>
                <span className={`inline-flex items-center gap-1 rounded-full ${c.color} px-2 py-1 text-[10px] font-bold`}>
                  <Video className="h-3 w-3" /> HD
                </span>
              </div>
              <button className="absolute right-3 bottom-14 grid h-8 w-8 place-items-center rounded-full bg-white/20 text-white opacity-0 backdrop-blur transition group-hover:opacity-100">
                <Maximize2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-8 text-center text-xs text-muted-foreground">
        🔒 Transmissão segura e privada · Apenas você tem acesso às câmeras do seu pet.
      </p>
    </div>
  );
}
