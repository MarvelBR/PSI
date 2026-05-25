"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Início" },
  { href: "/registro", label: "Registro" },
  { href: "/plano", label: "Plano" },
  { href: "/ajuda", label: "Instruções" },
];

/**
 * Renderiza a barra de navegacao responsiva da aplicacao.
 *
 * Entrada:
 * - nao recebe parametros.
 *
 * Variaveis usadas:
 * - pathname/currentPath: rota atual usada para destacar o link ativo.
 * - open: controla se o menu mobile esta aberto.
 * - navItems: lista de links do menu.
 *
 * Saida:
 * - header fixo com links e botao de abrir/fechar no mobile.
 */
export function Navbar() {
  const pathname = usePathname();
  const currentPath = pathname ?? "/";
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b bg-white/95 shadow-sm backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-semibold text-primary">
          TerapiApp
        </Link>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </Button>

        <div
          className={cn(
            "absolute left-0 top-16 hidden w-full flex-col gap-1 border-b bg-white px-4 py-4 shadow-sm md:static md:flex md:w-auto md:flex-row md:border-0 md:bg-transparent md:p-0 md:shadow-none",
            open && "flex",
          )}
        >
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? currentPath === "/"
                : currentPath.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition hover:text-primary",
                  active && "bg-primary/10 text-primary",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
