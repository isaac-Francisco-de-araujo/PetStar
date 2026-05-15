import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Mail, Phone } from "lucide-react";
import logo from "@/assets/logo-petshop.png";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-gradient-soft">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-4 md:px-6">
        <div>
          <Link to="/" className="inline-flex items-center" aria-label="PetShop">
            <img src={logo} alt="PetShop" className="h-16 w-auto" />
          </Link>
          <p className="mt-3 text-sm text-muted-foreground">
            Tudo que seu pet precisa, com carinho e qualidade.
          </p>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold">Loja</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/produtos" className="hover:text-primary">
                Todos os produtos
              </Link>
            </li>
            <li>
              <Link
                to="/produtos"
                search={{ cat: "Rações", q: undefined }}
                className="hover:text-primary"
              >
                Rações
              </Link>
            </li>
            <li>
              <Link
                to="/produtos"
                search={{ cat: "Brinquedos", q: undefined }}
                className="hover:text-primary"
              >
                Brinquedos
              </Link>
            </li>
            <li>
              <Link
                to="/produtos"
                search={{ cat: "Higiene", q: undefined }}
                className="hover:text-primary"
              >
                Higiene
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold">Conta</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/login" className="hover:text-primary">
                Entrar
              </Link>
            </li>
            <li>
              <Link to="/cadastro" className="hover:text-primary">
                Cadastrar
              </Link>
            </li>
            <li>
              <Link to="/carrinho" className="hover:text-primary">
                Carrinho
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold">Contato</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>contato@petshop.com</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>(11) 99999-0000</span>
            </li>
          </ul>
          <div className="mt-3 flex gap-2">
            <a
              href="#"
              aria-label="Instagram"
              className="grid h-9 w-9 place-items-center rounded-full bg-background shadow-card transition hover:bg-primary hover:text-primary-foreground"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="grid h-9 w-9 place-items-center rounded-full bg-background shadow-card transition hover:bg-primary hover:text-primary-foreground"
            >
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} PetShop. Todos os direitos reservados.
      </div>
    </footer>
  );
}
