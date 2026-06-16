// Tela reutilizada pelas etapas do plano de segurança.

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Save, ShieldCheck } from "lucide-react";

import { SafetyTips } from "@/components/safety-tips";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { emergencyContacts, safetySteps } from "@/lib/safety-plan";

type SafetyStep = (typeof safetySteps)[number];

type SafetyStepPageProps = {
  stepSlug: string;
};

type SavedSafetyPlan = Record<string, unknown> & {
  treatmentPlace?: Partial<TreatmentPlace>;
};

function readSavedSafetyPlan(): SavedSafetyPlan {
  try {
    const parsed = JSON.parse(localStorage.getItem("safetyPlan") || "{}");

    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

/**
 * Renderiza uma etapa do plano de seguranca e salva a resposta do usuario.
 *
 * Entrada:
 * - stepSlug: slug da etapa que deve ser exibida.
 *
 * Variaveis usadas:
 * - step: configuracao da etapa encontrada em safetySteps.
 * - value: texto digitado no campo da etapa.
 * - router: navega para voltar ou avancar.
 *
 * Saida:
 * - pagina da etapa com progresso, campo de resposta e botoes de navegacao.
 */
export function SafetyStepPage({ stepSlug }: SafetyStepPageProps) {
  const router = useRouter();
  const step = safetySteps.find((item) => item.slug === stepSlug) as SafetyStep;
  const stepIndex = safetySteps.findIndex((item) => item.slug === stepSlug);
  const previousStep = safetySteps[stepIndex - 1];
  const previousHref = previousStep
    ? previousStep.slug === "plano"
      ? "/plano"
      : `/plano/${previousStep.slug}`
    : "/";
  const Icon = step.icon;
  const [value, setValue] = useState("");
  const [treatmentPlace, setTreatmentPlace] = useState({
    name: "",
    phone: "",
  });
  const suggestions = "suggestions" in step ? step.suggestions : undefined;
  const selectedSuggestions = new Set(
    value
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean),
  );

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const savedPlan = readSavedSafetyPlan();
      const savedValue = savedPlan[step.name];
      setValue(typeof savedValue === "string" ? savedValue : "");
      setTreatmentPlace({
        name: savedPlan.treatmentPlace?.name || "",
        phone: savedPlan.treatmentPlace?.phone || "",
      });
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [step.name]);

  /**
   * Persiste a resposta da etapa atual e navega para a proxima rota.
   *
   * Entrada:
   * - usa value e step.name para montar o campo salvo.
   *
   * Variaveis usadas:
   * - savedPlan: plano ja existente em localStorage.
   * - updatedAt: horario da ultima alteracao.
   *
   * Saida:
   * - localStorage safetyPlan atualizado e navegacao para step.next.
   */
  function saveAndContinue() {
    const savedPlan = readSavedSafetyPlan();
    // eslint-disable-next-line react-hooks/purity -- Timestamp is created only from the click handler when saving.
    const updatedAt = Date.now();

    localStorage.setItem(
      "safetyPlan",
      JSON.stringify({
        ...savedPlan,
        [step.name]: value,
        ...(step.emergency ? { treatmentPlace } : {}),
        updatedAt,
      }),
    );
    router.push(step.next);
  }

  function goToPreviousStep() {
    router.push(previousHref);
  }

  function toggleSuggestion(suggestion: string, checked: boolean) {
    const lines = value
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    if (checked) {
      setValue([...lines, suggestion].join("\n"));
      return;
    }

    setValue(lines.filter((line) => line !== suggestion).join("\n"));
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
              <EmergencyContacts
                treatmentPlace={treatmentPlace}
                onTreatmentPlaceChange={setTreatmentPlace}
              />
            ) : (
              <>
                {suggestions ? (
                  <div className="grid gap-2 rounded-lg border bg-slate-50 p-4 sm:grid-cols-2">
                    {suggestions.map((suggestion) => {
                      const checked = selectedSuggestions.has(suggestion);

                      return (
                        <label
                          key={suggestion}
                          className="flex min-h-11 items-start gap-3 rounded-md bg-white p-3 text-sm text-slate-700 shadow-sm"
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={(event) =>
                              toggleSuggestion(suggestion, event.target.checked)
                            }
                            className="mt-0.5 size-4 rounded border-slate-300 accent-primary"
                          />
                          <span>{suggestion}</span>
                        </label>
                      );
                    })}
                  </div>
                ) : null}

                <Textarea
                  id={step.name}
                  value={value}
                  placeholder={step.placeholder}
                  onChange={(event) => setValue(event.target.value)}
                />
              </>
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Button type="button" variant="secondary" onClick={goToPreviousStep}>
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

/**
 * Renderiza os contatos de emergencia usados na etapa profissional.
 *
 * Entrada:
 * - nao recebe parametros.
 *
 * Variaveis usadas:
 * - emergencyContacts: lista com titulo, descricao, icone e telefone quando houver.
 *
 * Saida:
 * - grade de cards com telefones de apoio.
 */
type TreatmentPlace = {
  name: string;
  phone: string;
};

type EmergencyContactsProps = {
  treatmentPlace: TreatmentPlace;
  onTreatmentPlaceChange: (treatmentPlace: TreatmentPlace) => void;
};

function EmergencyContacts({
  treatmentPlace,
  onTreatmentPlaceChange,
}: EmergencyContactsProps) {
  return (
    <div className="rounded-lg bg-gradient-to-br from-cyan-500 to-red-500 p-5 text-white">
      <div className="grid gap-3 md:grid-cols-3">
        {emergencyContacts.map((contact) => {
          const Icon = contact.icon;
          const isTreatmentPlace = contact.title === "Meu local de tratamento";

          return (
            <div
              key={contact.title}
              className="rounded-lg border border-white/25 bg-white/10 p-4 text-center"
            >
              <Icon className="mx-auto mb-2 size-7" />
              <h3 className="text-sm font-semibold">{contact.title}</h3>
              {isTreatmentPlace ? (
                <div className="mt-3 grid gap-2 text-left">
                  <Input
                    id="treatment-place-name"
                    value={treatmentPlace.name}
                    placeholder="Nome"
                    onChange={(event) =>
                      onTreatmentPlaceChange({
                        ...treatmentPlace,
                        name: event.target.value,
                      })
                    }
                    className="bg-white text-slate-900 placeholder:text-slate-500"
                  />
                  <Input
                    id="treatment-place-phone"
                    type="tel"
                    value={treatmentPlace.phone}
                    placeholder="Telefone"
                    onChange={(event) =>
                      onTreatmentPlaceChange({
                        ...treatmentPlace,
                        phone: event.target.value,
                      })
                    }
                    className="bg-white text-slate-900 placeholder:text-slate-500"
                  />
                </div>
              ) : "number" in contact ? (
                <p className="my-1 text-3xl font-bold">{contact.number}</p>
              ) : null}
              {isTreatmentPlace ? null : (
                <p className="text-sm opacity-90">{contact.description}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
