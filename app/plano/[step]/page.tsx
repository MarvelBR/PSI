import { notFound } from "next/navigation";

import { SafetyStepPage } from "@/components/safety-step-page";
import { getSafetyStep, safetySteps } from "@/lib/safety-plan";

export function generateStaticParams() {
  return safetySteps
    .filter((step) => step.slug !== "plano")
    .map((step) => ({ step: step.slug }));
}

/**
 * Renderiza uma etapa dinamica do plano de seguranca conforme a URL.
 *
 * Entrada:
 * - params: Promise com o parametro step vindo da rota /plano/[step].
 *
 * Variaveis usadas:
 * - stepSlug: slug recebido da URL.
 * - step: dados encontrados em getSafetyStep.
 *
 * Saida:
 * - SafetyStepPage da etapa encontrada ou pagina 404 quando a etapa e invalida.
 */
export default async function PlanoStepPage({
  params,
}: {
  params: Promise<{ step: string }>;
}) {
  const { step: stepSlug } = await params;
  const step = getSafetyStep(stepSlug);

  if (!step || stepSlug === "plano") {
    notFound();
  }

  return <SafetyStepPage stepSlug={step.slug} />;
}
