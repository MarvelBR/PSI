// Estrutura global com menu, conteúdo e rodape.

import type { Metadata } from "next";
import "./globals.css";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "SUISAFE",
  description: "Ferramentas para motivos para viver e plano de segurança.",
};

/**
 * Define a estrutura global de todas as paginas da aplicacao.
 *
 * Entrada:
 * - children: conteudo da pagina atual renderizado pelo Next.js.
 *
 * Variaveis usadas:
 * - Navbar: menu fixo superior.
 * - Footer: rodape padrao.
 *
 * Saida:
 * - HTML base com idioma pt-BR, menu, conteudo da pagina e rodape.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
