"use client";

import Link from "next/link";
import { CircleUserRound, Search, X } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const patients = [
  { id: 1, name: "Aldemir", age: 54 },
  { id: 2, name: "Paciente 2", age: 20 },
  { id: 3, name: "Paciente 3", age: 11 },
];

/**
 * Renderiza a busca de pacientes e filtra a lista conforme o texto digitado.
 *
 * Entrada:
 * - nao recebe parametros.
 *
 * Variaveis usadas:
 * - query: texto digitado no campo de busca.
 * - patients: lista base de pacientes.
 * - filteredPatients: pacientes que correspondem ao filtro atual.
 *
 * Saida:
 * - tela com campo de busca e cards dos pacientes encontrados.
 */
export default function BuscaPage() {
  const [query, setQuery] = useState("");

  const filteredPatients = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return patients;
    return patients.filter((patient) => patient.name.toLowerCase().includes(term));
  }, [query]);

  return (
    <main className="page-shell">
      <section className="page-header">
        <h1 className="page-title">Buscar paciente</h1>
      </section>

      <section className="mx-auto flex max-w-2xl flex-col items-center gap-5">
        <div className="flex w-full items-center gap-2 rounded-full bg-white px-4 py-2 shadow-soft">
          <Search className="size-5 shrink-0 text-slate-500" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar..."
            className="border-0 bg-transparent text-base shadow-none focus-visible:ring-0"
          />
          <Button
            variant="ghost"
            size="icon"
            aria-label="Limpar busca"
            onClick={() => setQuery("")}
          >
            <X />
          </Button>
        </div>

        <div className="flex w-full flex-col gap-3">
          {filteredPatients.map((patient) => (
            <Card
              key={patient.id}
              className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center"
            >
              <CircleUserRound className="size-10 shrink-0 text-slate-700" />
              <div className="min-w-0 flex-1">
                <h2 className="truncate text-lg font-semibold">{patient.name}</h2>
                <p className="text-sm text-slate-600">Idade: {patient.age}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button asChild size="sm" variant="secondary">
                  <Link href="/registro">Ver Registro</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/plano">Ver Plano</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
