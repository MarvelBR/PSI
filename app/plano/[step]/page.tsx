import { notFound } from "next/navigation";

import { SafetyStepPage } from "@/components/safety-step-page";
import { getSafetyStep } from "@/lib/safety-plan";

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
