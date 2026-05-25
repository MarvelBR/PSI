"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Save, ShieldCheck } from "lucide-react";

import { SafetyTips } from "@/components/safety-tips";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { emergencyContacts, safetySteps } from "@/lib/safety-plan";

type SafetyStep = (typeof safetySteps)[number];

type SafetyStepPageProps = {
  stepSlug: string;
};

export function SafetyStepPage({ stepSlug }: SafetyStepPageProps) {
  const router = useRouter();
  const step = safetySteps.find((item) => item.slug === stepSlug) as SafetyStep;
  const Icon = step.icon;
  const [value, setValue] = useState("");

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const savedPlan = JSON.parse(localStorage.getItem("safetyPlan") || "{}");
      setValue(savedPlan[step.name] || "");
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [step.name]);

  function saveAndContinue() {
    const savedPlan = JSON.parse(localStorage.getItem("safetyPlan") || "{}");
    localStorage.setItem(
      "safetyPlan",
      JSON.stringify({ ...savedPlan, [step.name]: value, updatedAt: Date.now() }),
    );
    router.push(step.next);
  }

  return (
    <main className="page-shell">
      <section className="page-header">
        <h1 className="page-title">
          <ShieldCheck className="size-8 text-primary" />
          Plano de Segurança
        </h1>
        <p className="page-subtitle">
          Ajude o paciente quando ele está com tendências suicidas.
        </p>
        <Progress value={step.progress} className="mt-5" />
      </section>

      <section className="form-panel">
        <div className="rounded-lg border-l-4 border-primary bg-white p-5">
          <h2 className="mb-4 flex items-center gap-3 text-xl font-semibold text-slate-800">
            <span className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
              {step.number}
            </span>
            {step.title}
          </h2>

          <div className="field-group">
            <Label htmlFor={step.name} className="flex items-center gap-2">
              <Icon className="size-4" />
              {step.label}
            </Label>

            {step.emergency ? (
              <EmergencyContacts />
            ) : (
              <Textarea
                id={step.name}
                value={value}
                placeholder={step.placeholder}
                onChange={(event) => setValue(event.target.value)}
              />
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Button type="button" variant="secondary" onClick={() => router.back()}>
            <ArrowLeft />
            Voltar
          </Button>
          <Button
            type="button"
            variant={step.final ? "success" : "default"}
            onClick={saveAndContinue}
          >
            {step.final ? <Save /> : <ArrowRight />}
            {step.final ? "Salvar Plano" : "Avançar"}
          </Button>
        </div>
      </section>

      <SafetyTips />
    </main>
  );
}

function EmergencyContacts() {
  return (
    <div className="rounded-lg bg-gradient-to-br from-cyan-500 to-red-500 p-5 text-white">
      <div className="grid gap-3 md:grid-cols-3">
        {emergencyContacts.map((contact) => {
          const Icon = contact.icon;
          return (
            <div
              key={contact.title}
              className="rounded-lg border border-white/25 bg-white/10 p-4 text-center"
            >
              <Icon className="mx-auto mb-2 size-7" />
              <h3 className="text-sm font-semibold">{contact.title}</h3>
              <p className="my-1 text-3xl font-bold">{contact.number}</p>
              <p className="text-sm opacity-90">{contact.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
