import { createFileRoute } from "@tanstack/react-router";
import { AuthForm } from "@/components/AuthForm";

export const Route = createFileRoute("/login")({
  component: () => <AuthForm mode="login" />,
  head: () => ({ meta: [{ title: "Entrar — PetShop" }] }),
});
