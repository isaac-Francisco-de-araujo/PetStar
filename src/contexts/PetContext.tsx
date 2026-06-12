import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import petAvatar from "@/assets/pet-avatar.jpg";

export interface Pet {
  id: string;
  name: string;
  breed: string;
  age: string;
  weight: string;
  photo: string;
}

export interface ServiceRecord {
  id: string;
  petId: string;
  service: string;
  date: string;
  status: "concluido" | "em-andamento" | "agendado";
  price: number;
}

export interface ChatMessage {
  id: string;
  from: "user" | "admin";
  text: string;
  time: string;
  read: boolean;
}

interface PetContextValue {
  pets: Pet[];
  services: ServiceRecord[];
  messages: ChatMessage[];
  unreadCount: number;
  addPet: (p: Omit<Pet, "id">) => void;
  sendMessage: (text: string) => void;
  markAllRead: () => void;
}

const PetContext = createContext<PetContextValue | null>(null);
const KEY = "petshop_pets_v1";
const MSG_KEY = "petshop_chat_v1";

const defaultPets: Pet[] = [
  { id: "p1", name: "Thor", breed: "Golden Retriever", age: "3 anos", weight: "28kg", photo: petAvatar },
];

const defaultServices: ServiceRecord[] = [
  { id: "s1", petId: "p1", service: "Banho & Tosa", date: "Hoje, 10:30", status: "em-andamento", price: 89.9 },
  { id: "s2", petId: "p1", service: "Banho Completo", date: "12/05/2026", status: "concluido", price: 59.9 },
  { id: "s3", petId: "p1", service: "Consulta Veterinária", date: "28/04/2026", status: "concluido", price: 150 },
  { id: "s4", petId: "p1", service: "Tosa Higiênica", date: "20/06/2026", status: "agendado", price: 45 },
];

const defaultMessages: ChatMessage[] = [
  { id: "m1", from: "admin", text: "Olá! Bem-vindo à PetStar 🐾 Como podemos ajudar?", time: "09:00", read: false },
  { id: "m2", from: "admin", text: "Seu pet acabou de chegar e já começou o banho! ✨", time: "10:32", read: false },
];

export function PetProvider({ children }: { children: ReactNode }) {
  const [pets, setPets] = useState<Pet[]>(defaultPets);
  const [services] = useState<ServiceRecord[]>(defaultServices);
  const [messages, setMessages] = useState<ChatMessage[]>(defaultMessages);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const p = localStorage.getItem(KEY);
      if (p) setPets(JSON.parse(p));
      const m = localStorage.getItem(MSG_KEY);
      if (m) setMessages(JSON.parse(m));
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(pets)); } catch { /* ignore */ }
  }, [pets]);
  useEffect(() => {
    try { localStorage.setItem(MSG_KEY, JSON.stringify(messages)); } catch { /* ignore */ }
  }, [messages]);

  const addPet: PetContextValue["addPet"] = (p) =>
    setPets((curr) => [...curr, { ...p, id: `p${Date.now()}` }]);

  const sendMessage: PetContextValue["sendMessage"] = (text) => {
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    const userMsg: ChatMessage = { id: `m${Date.now()}`, from: "user", text, time, read: true };
    setMessages((curr) => [...curr, userMsg]);
    setTimeout(() => {
      const replies = [
        "Recebido! Vou verificar e já te respondo 🐶",
        "Tudo certo por aqui, seu pet está sendo muito bem cuidado! 💙",
        "Obrigado pelo contato! Em instantes envio uma atualização.",
      ];
      const reply: ChatMessage = {
        id: `m${Date.now() + 1}`,
        from: "admin",
        text: replies[Math.floor(Math.random() * replies.length)],
        time,
        read: false,
      };
      setMessages((curr) => [...curr, reply]);
    }, 1200);
  };

  const markAllRead = () =>
    setMessages((curr) => curr.map((m) => ({ ...m, read: true })));

  const value = useMemo<PetContextValue>(() => ({
    pets, services, messages,
    unreadCount: messages.filter((m) => m.from === "admin" && !m.read).length,
    addPet, sendMessage, markAllRead,
  }), [pets, services, messages]);

  return <PetContext.Provider value={value}>{children}</PetContext.Provider>;
}

export function usePets() {
  const ctx = useContext(PetContext);
  if (!ctx) throw new Error("usePets must be used within PetProvider");
  return ctx;
}
