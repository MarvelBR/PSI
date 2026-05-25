"use client";

import Link from "next/link";
import { CheckCircle, Home, Printer, ShieldCheck } from "lucide-react";

import { SafetyTips } from "@/components/safety-tips";
import { Button } from "@/components/ui/button";

export default function PlanoSucessoPage() {
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
      </section>

      <section className="form-panel text-center">
        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-emerald-600 text-white">
          <CheckCircle className="size-8" />
        </div>
        <h2 className="text-2xl font-semibold text-slate-800">
          Plano salvo com sucesso!
        </h2>

        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild variant="secondary">
            <Link href="/">
              <Home />
              Voltar à tela inicial
            </Link>
          </Button>
          <Button variant="success" onClick={() => window.print()}>
            <Printer />
            Imprimir Plano
          </Button>
        </div>
      </section>

      <SafetyTips />
    </main>
  );
}
