import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Junta classes CSS condicionais e resolve conflitos do Tailwind.
 *
 * Entrada:
 * - inputs: lista de classes, arrays ou objetos aceitos pelo clsx.
 *
 * Saida:
 * - string final com classes combinadas e sem conflitos de Tailwind.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
