import { SafetyStepPage } from "@/components/safety-step-page";

/**
 * Abre a primeira etapa do plano de seguranca.
 *
 * Entrada:
 * - nao recebe parametros.
 *
 * Variaveis usadas:
 * - stepSlug: valor fixo "plano", que identifica a etapa inicial.
 *
 * Saida:
 * - componente SafetyStepPage configurado para a primeira etapa.
 */
export default function PlanoPage() {
  return <SafetyStepPage stepSlug="plano" />;
}
