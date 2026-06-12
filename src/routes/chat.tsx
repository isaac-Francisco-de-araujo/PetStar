import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Send, CheckCheck, Phone, MoreVertical } from "lucide-react";
import { usePets } from "@/contexts/PetContext";

export const Route = createFileRoute("/chat")({
  component: Chat,
  head: () => ({ meta: [{ title: "Chat — PetStar" }] }),
});

function Chat() {
  const { messages, sendMessage, markAllRead } = usePets();
  const [text, setText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { markAllRead(); }, [markAllRead]);
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    sendMessage(text.trim());
    setText("");
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 md:py-10">
      <div className="flex h-[calc(100vh-12rem)] flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-card">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-border bg-gradient-hero p-4 text-white">
          <div className="relative">
            <div className="grid h-11 w-11 place-items-center rounded-full bg-white/20 text-lg font-bold">PS</div>
            <span className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full bg-green-400 ring-2 ring-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold">PetStar · Atendimento</div>
            <div className="text-xs opacity-90">● online agora</div>
          </div>
          <button className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/10"><Phone className="h-4 w-4" /></button>
          <button className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/10"><MoreVertical className="h-4 w-4" /></button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 space-y-2 overflow-y-auto bg-[linear-gradient(180deg,oklch(0.97_0.01_240),oklch(0.95_0.01_240))] p-4">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[78%] rounded-2xl px-3.5 py-2 text-sm shadow-sm ${
                m.from === "user"
                  ? "rounded-br-sm bg-primary text-primary-foreground"
                  : "rounded-bl-sm bg-white text-foreground"
              }`}>
                <p className="whitespace-pre-wrap">{m.text}</p>
                <div className={`mt-1 flex items-center justify-end gap-1 text-[10px] ${
                  m.from === "user" ? "text-white/70" : "text-muted-foreground"
                }`}>
                  {m.time}
                  {m.from === "user" && <CheckCheck className="h-3 w-3" />}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Composer */}
        <form onSubmit={submit} className="flex items-center gap-2 border-t border-border bg-card p-3">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Digite uma mensagem..."
            className="flex-1 rounded-full border border-border bg-secondary px-4 py-2.5 text-sm outline-none focus:border-primary focus:bg-background"
          />
          <button
            type="submit" aria-label="Enviar"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-hero text-white shadow-soft transition hover:shadow-glow disabled:opacity-50"
            disabled={!text.trim()}
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
