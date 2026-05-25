import { cn } from "@/lib/utils";

type ProgressProps = {
  value: number;
  className?: string;
};

/**
 * Renderiza uma barra de progresso limitada entre 0% e 100%.
 *
 * Entrada:
 * - value: numero de progresso recebido pela etapa atual.
 * - className: classes CSS extras opcionais.
 *
 * Variaveis usadas:
 * - Math.min/Math.max: garantem que o valor nao passe dos limites.
 *
 * Saida:
 * - componente visual de progresso com largura proporcional ao valor.
 */
export function Progress({ value, className }: ProgressProps) {
  return (
    <div className={cn("h-2.5 w-full overflow-hidden rounded-full bg-slate-300", className)}>
      <div
        className="h-full rounded-full bg-primary transition-all"
        style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
      />
    </div>
  );
}
