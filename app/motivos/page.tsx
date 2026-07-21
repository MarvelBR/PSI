// Página para cadastrar os motivos para viver do paciente.

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ClipboardPenLine, Save } from "lucide-react";

import { getReasonsToLive, saveReasonsToLive } from "@/lib/local-database";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { VoiceInputButton } from "@/components/voice-input-button";

/**
 * Renderiza o formulário de cadastro de motivos para viver.
 *
 * Entrada:
 * - não recebe parâmetros externos.
 *
 * Variáveis usadas:
 * - content: texto com os motivos para viver do paciente.
 * - saved: controla a mensagem de sucesso.
 * - saveError: controla a mensagem de erro.
 *
 * Saída:
 * - página com campo de texto e botão para salvar.
 */
export default function MotivosPage() {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState(false);

  useEffect(() => {
    getReasonsToLive()
      .then((record) => {
        if (record) setContent(record.content);
      })
      .catch(() => setSaveError(true));
  }, []);

  async function handleSave() {
    try {
      await saveReasonsToLive(content);
      setSaveError(false);
      setSaved(true);
      window.setTimeout(() => setSaved(false), 3000);
    } catch {
      setSaveError(true);
    }
  }

  return (
    <main className="page-shell">
      <section className="page-header">
        <h1 className="page-title">
          <ClipboardPenLine className="size-8 text-primary" />
          Motivos para Viver
        </h1>
        <p className="page-subtitle">
          Encontre e registre as motivações de vida do paciente
        </p>
      </section>

      {saved && (
        <div className="mb-4 rounded-md bg-emerald-600 p-4 text-center text-white">
          Motivos para viver salvos com sucesso!
        </div>
      )}
      {saveError && (
        <div className="mb-4 rounded-md bg-red-600 p-4 text-center text-white">
          Não foi possível salvar os dados no banco local.
        </div>
      )}

      <section className="form-panel">
        <div className="field-group">
          <Label
            htmlFor="reasonsToLive"
            className="flex items-center justify-between gap-2"
          >
            <span className="flex items-center gap-2">
              <ClipboardPenLine className="size-4" />
              Motivos para Viver
            </span>
            <VoiceInputButton
              onTranscript={(text) =>
                setContent((current) =>
                  current ? `${current} ${text}` : text,
                )
              }
            />
          </Label>
          <Textarea
            id="reasonsToLive"
            value={content}
            placeholder="Encontre as motivações de vida do paciente"
            onChange={(event) => setContent(event.target.value)}
            className="min-h-48"
          />
        </div>

        <div className="flex flex-col justify-center gap-3 sm:flex-row pt-4">
          <Button type="button" variant="secondary" onClick={() => router.back()}>
            <ArrowLeft />
            Cancelar
          </Button>
          <Button type="button" onClick={handleSave}>
            <Save />
            Salvar
          </Button>
        </div>
      </section>
    </main>
  );
}