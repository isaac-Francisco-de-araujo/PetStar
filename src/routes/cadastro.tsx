import { createFileRoute } from "@tanstack/react-router";
import { AuthForm } from "@/components/AuthForm";

export const Route = createFileRoute("/cadastro")({
  component: () => <AuthForm mode="register" />,
  head: () => ({ meta: [{ title: "Cadastro — PetShop" }] }),
});
