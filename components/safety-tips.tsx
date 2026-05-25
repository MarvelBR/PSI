import { CheckCircle, Lightbulb } from "lucide-react";

import { safetyTips } from "@/lib/safety-plan";

export function SafetyTips() {
  return (
    <section className="mt-8">
      <h2 className="mb-4 flex items-center justify-center gap-2 text-2xl font-light text-slate-800">
        <Lightbulb className="size-6 text-primary" />
        Dicas Importantes
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {safetyTips.map((tip) => (
          <div
            key={tip}
            className="flex items-center gap-3 rounded-lg border bg-white p-4 shadow-soft"
          >
            <CheckCircle className="size-5 shrink-0 text-emerald-600" />
            <p className="text-sm text-slate-700">{tip}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
