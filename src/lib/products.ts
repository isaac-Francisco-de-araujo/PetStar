import racao from "@/assets/prod-racao.jpg";
import brinquedo from "@/assets/prod-brinquedo.jpg";
import higiene from "@/assets/prod-higiene.jpg";
import acessorio from "@/assets/prod-acessorio.jpg";
import arranhador from "@/assets/prod-arranhador.jpg";
import racaoGato from "@/assets/prod-racao-gato.jpg";
import cama from "@/assets/prod-cama.jpg";

export type Category = "Rações" | "Brinquedos" | "Higiene" | "Acessórios";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  image: string;
  description: string;
  featured?: boolean;
}

export const categories: Category[] = ["Rações", "Brinquedos", "Higiene", "Acessórios"];

export const products: Product[] = [
  { id: "p1", name: "Ração Premium Cães Adultos 15kg", price: 189.9, category: "Rações", image: racao, description: "Nutrição completa e balanceada para cães adultos.", featured: true },
  { id: "p2", name: "Ração Premium Gatos 10kg", price: 159.9, category: "Rações", image: racaoGato, description: "Sabor irresistível com proteínas selecionadas.", featured: true },
  { id: "p3", name: "Kit Brinquedos Coloridos", price: 49.9, category: "Brinquedos", image: brinquedo, description: "Diversão garantida com bola e corda resistentes.", featured: true },
  { id: "p4", name: "Shampoo Pet Suave 500ml", price: 34.9, category: "Higiene", image: higiene, description: "Limpeza delicada com pH neutro para pets." },
  { id: "p5", name: "Coleira Azul com Guia", price: 59.9, category: "Acessórios", image: acessorio, description: "Resistente, ajustável e estilosa.", featured: true },
  { id: "p6", name: "Arranhador Torre Premium", price: 249.9, category: "Acessórios", image: arranhador, description: "Estrutura robusta em madeira e sisal natural." },
  { id: "p7", name: "Cama Confort Pet", price: 129.9, category: "Acessórios", image: cama, description: "Maciez e aconchego para o descanso do seu pet.", featured: true },
  { id: "p8", name: "Bolinha Borracha Resistente", price: 19.9, category: "Brinquedos", image: brinquedo, description: "Para horas de brincadeira sem desgaste." },
];

export const formatBRL = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
