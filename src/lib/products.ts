// =============================================================
// 🖼️ IMAGENS DOS PRODUTOS
// -------------------------------------------------------------
// Para TROCAR a foto de um produto:
// 1) Coloque a nova imagem dentro da pasta: src/assets/
//    (ex.: src/assets/prod-racao.jpg)
// 2) Importe ela aqui embaixo (ou substitua o arquivo existente
//    com o mesmo nome para trocar em todos os produtos de uma vez).
// 3) Use o nome importado no campo `image:` do produto mais abaixo.
// =============================================================
import racao from "@/assets/prod-racao.jpg";          // 🐶 Foto padrão de RAÇÃO (cães)
import brinquedo from "@/assets/prod-brinquedo.jpg";  // 🎾 Foto padrão de BRINQUEDOS
import higiene from "@/assets/prod-higiene.jpg";      // 🧴 Foto padrão de HIGIENE
import acessorio from "@/assets/prod-acessorio.jpg";  // 🦴 Foto padrão de ACESSÓRIOS
import arranhador from "@/assets/prod-arranhador.jpg";// 🐱 Foto de ARRANHADOR
import racaoGato from "@/assets/prod-racao-gato.jpg"; // 🐱 Foto padrão de RAÇÃO de GATO
import cama from "@/assets/prod-cama.jpg";            // 🛏️ Foto padrão de CAMA / CAMINHA

export type Category = "Rações" | "Brinquedos" | "Higiene" | "Acessórios";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  image: string;
  description: string;
  featured?: boolean;
  bestSeller?: boolean;
}

export const categories: Category[] = ["Rações", "Brinquedos", "Higiene", "Acessórios"];

export const products: Product[] = [
  // =====================================================
  // 🐶 RAÇÕES  — para trocar a imagem, altere o campo `image:`
  // pelo nome de uma das variáveis importadas no topo do arquivo
  // (racao, racaoGato, brinquedo, higiene, acessorio, arranhador, cama)
  // =====================================================
  { id: "r1", name: "Ração Premium Cães Adultos 15kg", price: 189.9, category: "Rações", image: racao, /* 👈 imagem do produto (trocar aqui) */ description: "Nutrição completa e balanceada para cães adultos.", featured: true, bestSeller: true },
  { id: "r2", name: "Ração Premium Gatos 10kg", price: 159.9, category: "Rações", image: racaoGato, /* 👈 imagem do produto */ description: "Sabor irresistível com proteínas selecionadas.", featured: true },
  { id: "r3", name: "Ração Golden Special Adultos", price: 129.9, category: "Rações", image: racao, /* 👈 imagem do produto */ description: "Fórmula especial para cães adultos de todos os portes." },
  { id: "r4", name: "Ração Premier Fórmula", price: 149.9, category: "Rações", image: racao, /* 👈 imagem do produto */ description: "Alta digestibilidade e sabor incomparável.", bestSeller: true },
  { id: "r5", name: "Ração Pedigree Carne e Vegetais", price: 89.9, category: "Rações", image: racao, /* 👈 imagem do produto */ description: "Sabor de carne com vegetais selecionados." },
  { id: "r6", name: "Ração Whiskas Gatos Adultos", price: 79.9, category: "Rações", image: racaoGato, /* 👈 imagem do produto */ description: "Para gatos exigentes que amam variedade." },
  { id: "r7", name: "Ração Royal Canin Mini", price: 179.9, category: "Rações", image: racao, /* 👈 imagem do produto */ description: "Nutrição premium para cães de pequeno porte.", featured: true },

  // =====================================================
  // 🎾 BRINQUEDOS — campo `image:` define a foto exibida
  // =====================================================
  { id: "b1", name: "Kit Brinquedos Coloridos", price: 49.9, category: "Brinquedos", image: brinquedo, /* 👈 imagem do produto */ description: "Diversão garantida com bola e corda resistentes.", featured: true },
  { id: "b2", name: "Bolinha Borracha Resistente", price: 19.9, category: "Brinquedos", image: brinquedo, /* 👈 imagem do produto */ description: "Para horas de brincadeira sem desgaste." },
  { id: "b3", name: "Bola Interativa para Cachorro", price: 24.9, category: "Brinquedos", image: brinquedo, /* 👈 imagem do produto */ description: "Estimula a inteligência e brincadeira ativa.", bestSeller: true },
  { id: "b4", name: "Mordedor Resistente", price: 39.9, category: "Brinquedos", image: brinquedo, /* 👈 imagem do produto */ description: "Borracha atóxica resistente para mordidas fortes." },
  { id: "b5", name: "Arranhador para Gatos", price: 69.9, category: "Brinquedos", image: arranhador, /* 👈 imagem do produto */ description: "Sisal natural ideal para afiar as garrinhas." },
  { id: "b6", name: "Brinquedo de Corda", price: 19.9, category: "Brinquedos", image: brinquedo, /* 👈 imagem do produto */ description: "Perfeito para cabo de guerra e brincadeiras." },
  { id: "b7", name: "Pelúcia para Pets", price: 34.9, category: "Brinquedos", image: brinquedo, /* 👈 imagem do produto */ description: "Macia, com guizo interno para diversão." },

  // =====================================================
  // 🦴 ACESSÓRIOS — campo `image:` define a foto exibida
  // =====================================================
  { id: "a1", name: "Coleira Azul com Guia", price: 59.9, category: "Acessórios", image: acessorio, /* 👈 imagem do produto */ description: "Resistente, ajustável e estilosa.", featured: true },
  { id: "a2", name: "Arranhador Torre Premium", price: 249.9, category: "Acessórios", image: arranhador, /* 👈 imagem do produto */ description: "Estrutura robusta em madeira e sisal natural." },
  { id: "a3", name: "Cama Confort Pet", price: 129.9, category: "Acessórios", image: cama, /* 👈 imagem do produto */ description: "Maciez e aconchego para o descanso do seu pet.", featured: true, bestSeller: true },
  { id: "a4", name: "Coleira Premium", price: 49.9, category: "Acessórios", image: acessorio, /* 👈 imagem do produto */ description: "Couro sintético com fivela reforçada." },
  { id: "a5", name: "Guia Retrátil", price: 79.9, category: "Acessórios", image: acessorio, /* 👈 imagem do produto */ description: "Até 5 metros, trava de segurança e empunhadura ergonômica." },
  { id: "a6", name: "Caminha Pet Confort", price: 159.9, category: "Acessórios", image: cama, /* 👈 imagem do produto */ description: "Antiderrapante, lavável e super macia." },
  { id: "a7", name: "Comedouro Inox", price: 44.9, category: "Acessórios", image: acessorio, /* 👈 imagem do produto */ description: "Aço inox antiferrugem com base antiderrapante." },
  { id: "a8", name: "Roupinha Pet", price: 59.9, category: "Acessórios", image: acessorio, /* 👈 imagem do produto */ description: "Tecido confortável para passeios estilosos." },

  // =====================================================
  // 🧴 HIGIENE — campo `image:` define a foto exibida
  // =====================================================
  { id: "h1", name: "Shampoo Pet Suave 500ml", price: 34.9, category: "Higiene", image: higiene, /* 👈 imagem do produto */ description: "Limpeza delicada com pH neutro para pets." },
  { id: "h2", name: "Shampoo Pet Neutro", price: 29.9, category: "Higiene", image: higiene, /* 👈 imagem do produto */ description: "Fórmula suave para banhos diários." },
  { id: "h3", name: "Tapete Higiênico", price: 54.9, category: "Higiene", image: higiene, /* 👈 imagem do produto */ description: "Alta absorção, neutraliza odores.", bestSeller: true },
  { id: "h4", name: "Escova Dental Pet", price: 19.9, category: "Higiene", image: higiene, /* 👈 imagem do produto */ description: "Cerdas macias para uma higiene bucal completa." },
  { id: "h5", name: "Perfume Pet", price: 34.9, category: "Higiene", image: higiene, /* 👈 imagem do produto */ description: "Fragrância suave e duradoura." },
  { id: "h6", name: "Kit Higiene Completo", price: 89.9, category: "Higiene", image: higiene, /* 👈 imagem do produto */ description: "Shampoo, condicionador e perfume em um só kit.", featured: true },
];

export const formatBRL = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

// Serviços
export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
  popular?: boolean;
}

export const services: Service[] = [
  { id: "s1", name: "Banho", description: "Banho completo com produtos premium e secagem.", price: 49.9, icon: "🛁", popular: true },
  { id: "s2", name: "Tosa", description: "Tosa higiênica ou na máquina, do jeito que seu pet precisa.", price: 69.9, icon: "✂️" },
  { id: "s3", name: "Banho e Tosa", description: "Combo completo: banho, tosa, perfume e laço.", price: 99.9, icon: "🐩", popular: true },
  { id: "s4", name: "Higiene Dental", description: "Escovação profissional e remoção de tártaro leve.", price: 79.9, icon: "🦷" },
  { id: "s5", name: "Corte de Unhas", description: "Corte rápido e seguro com profissionais experientes.", price: 29.9, icon: "💅" },
  { id: "s6", name: "Hidratação dos Pelos", description: "Tratamento intensivo para pelos brilhantes e macios.", price: 59.9, icon: "✨", popular: true },
];
