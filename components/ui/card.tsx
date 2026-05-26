import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Container visual padrao para agrupar conteudos em formato de card.
 *
 * Entrada:
 * - className: classes extras.
 * - props: atributos HTML repassados ao div.
 * - ref: referencia encaminhada ao div.
 *
 * Saida:
 * - div com borda, fundo e sombra padronizados.
 */
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-soft",
      className,
    )}
    {...props}
  />
));
Card.displayName = "Card";

/**
 * Area superior do card usada para titulo e descricao.
 *
 * Entrada:
 * - className, props e ref do elemento div.
 *
 * Saida:
 * - div com espacamento vertical de cabecalho.
 */
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
));
CardHeader.displayName = "CardHeader";

/**
 * Titulo padrao dentro de um card.
 *
 * Entrada:
 * - className, props e ref do elemento h3.
 *
 * Saida:
 * - h3 com tipografia de titulo.
 */
const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-xl font-semibold leading-none tracking-normal", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

/**
 * Texto auxiliar ou descricao dentro de um card.
 *
 * Entrada:
 * - className, props e ref do paragrafo.
 *
 * Saida:
 * - p com estilo de texto secundario.
 */
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
CardDescription.displayName = "CardDescription";

/**
 * Area principal de conteudo do card.
 *
 * Entrada:
 * - className, props e ref do elemento div.
 *
 * Saida:
 * - div com padding padrao para conteudo.
 */
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

/**
 * Area inferior do card, normalmente usada para acoes.
 *
 * Entrada:
 * - className, props e ref do elemento div.
 *
 * Saida:
 * - div alinhada e com espacamento de rodape.
 */
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
