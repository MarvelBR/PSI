// menu superior.

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState, useSyncExternalStore } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Início" },
  { href: "/registro", label: "Registro" },
  { href: "/plano", label: "Plano" },
  { href: "/ajuda", label: "Instruções" },
];

const themeChangeEvent = "themechange";

function subscribeToThemeChange(callback: () => void) {
  window.addEventListener(themeChangeEvent, callback);
  return () => window.removeEventListener(themeChangeEvent, callback);
}

function getThemeSnapshot() {
  return window.localStorage.getItem("theme") === "dark";
}

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
  const isDark = useSyncExternalStore(
    subscribeToThemeChange,
    getThemeSnapshot,
    () => false,
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  function toggleTheme() {
    const nextThemeIsDark = !isDark;

    window.localStorage.setItem("theme", nextThemeIsDark ? "dark" : "light");
    window.dispatchEvent(new Event(themeChangeEvent));
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-white/95 shadow-sm backdrop-blur dark:bg-card/95">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-semibold text-primary">
          Meu PSI - Plano de Segurança Individual
        </Link>

        <div className="flex items-center gap-1 md:order-last">
          <Button
            variant="ghost"
            size="icon"
            className="text-slate-700 hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-muted dark:hover:text-white"
            aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
            title={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
            onClick={toggleTheme}
          >
            {isDark ? <Sun /> : <Moon />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-slate-700 hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-muted dark:hover:text-white md:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>

        <div
          className={cn(
            "absolute left-0 top-16 hidden w-full flex-col gap-1 border-b border-border bg-white px-4 py-4 shadow-sm dark:bg-card md:static md:order-none md:flex md:w-auto md:flex-row md:border-0 md:bg-transparent md:p-0 md:shadow-none",
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
                  "rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition hover:text-primary dark:text-slate-200",
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
