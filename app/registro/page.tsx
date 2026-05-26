// Página para registrar mudanças de humor.

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Bolt,
  Brain,
  Calendar,
  Frown,
  Info,
  MapPin,
  Save,
  Smile,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

const initialForm = {
  date: "",
  positiveEmotions: "",
  negativeEmotions: "",
  situation: "",
  thoughts: "",
  reaction: "",
};

/**
 * Renderiza o formulario de registro de mudanca de humor.
 *
 * Entrada:
 * - nao recebe parametros externos.
 *
 * Variaveis usadas:
 * - form: valores atuais dos campos do formulario.
 * - saved: controla a mensagem de sucesso.
 * - router: permite voltar para a pagina anterior.
 *
 * Saida:
 * - pagina com campos de data, emocoes, situacao, pensamentos e reacao.
 */
export default function RegistroPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    ...initialForm,
    date: new Date().toISOString().slice(0, 10),
  });
  const [saved, setSaved] = useState(false);

  /**
   * Atualiza um campo especifico do formulario sem alterar os outros.
   *
   * Entrada:
   * - name: nome do campo que sera atualizado.
   * - value: novo texto digitado pelo usuario.
   *
   * Variaveis usadas:
   * - form/current: estado atual do formulario.
   *
   * Saida:
   * - novo estado form com o campo escolhido atualizado.
   */
  function updateField(name: keyof typeof initialForm, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  /**
   * Salva o registro de humor no localStorage e limpa o formulario.
   *
   * Entrada:
   * - usa os valores atuais da variavel form.
   *
   * Variaveis usadas:
   * - moodData: copia do formulario com timestamp.
   * - records: registros antigos lidos de localStorage.
   * - saved: estado que exibe a confirmacao na tela.
   *
   * Saida:
   * - localStorage atualizado e formulario reiniciado.
   */
  function submitMoodForm() {
    const moodData = { ...form, timestamp: Date.now() };
    const records = JSON.parse(localStorage.getItem("moodRecords") || "[]");
    localStorage.setItem("moodRecords", JSON.stringify([moodData, ...records]));
    setSaved(true);
    setForm((current) => ({ ...initialForm, date: current.date }));
    window.setTimeout(() => setSaved(false), 3000);
  }

  return (
    <main className="page-shell">
      <section className="page-header">
        <h1 className="page-title">
          <Save className="size-8 text-primary" />
          Registro de Mudança de Humor
        </h1>
        <p className="page-subtitle">Anote como o paciente está se sentindo</p>
      </section>

      {saved && (
        <div className="mb-4 rounded-md bg-emerald-600 p-4 text-center text-white">
          Registro de humor salvo com sucesso!
        </div>
      )}

      <section className="form-panel">
        <form className="space-y-6">
          <div className="field-group">
            <Label htmlFor="date" className="flex items-center gap-2">
              <Calendar className="size-4" />
              Data
            </Label>
            <Input
              id="date"
              type="date"
              value={form.date}
              onChange={(event) => updateField("date", event.target.value)}
              required
            />
          </div>

          <TextAreaField
            id="positiveEmotions"
            label="Emoções Positivas"
            icon={<Smile className="size-4" />}
            value={form.positiveEmotions}
            placeholder="Descreva as emoções positivas que o paciente sentiu hoje..."
            onChange={(value) => updateField("positiveEmotions", value)}
          />
          <TextAreaField
            id="negativeEmotions"
            label="Emoções Negativas"
            icon={<Frown className="size-4" />}
            value={form.negativeEmotions}
            placeholder="Descreva as emoções negativas que o paciente sentiu hoje..."
            onChange={(value) => updateField("negativeEmotions", value)}
          />
          <TextAreaField
            id="situation"
            label="Situação"
            icon={<MapPin className="size-4" />}
            value={form.situation}
            placeholder="Descreva a situação ou contexto que influenciou o humor do paciente..."
            onChange={(value) => updateField("situation", value)}
          />
          <TextAreaField
            id="thoughts"
            label="Pensamentos"
            icon={<Brain className="size-4" />}
            value={form.thoughts}
            placeholder="Quais pensamentos passaram pela mente do paciente?"
            onChange={(value) => updateField("thoughts", value)}
          />
          <TextAreaField
            id="reaction"
            label="Reação"
            icon={<Bolt className="size-4" />}
            value={form.reaction}
            placeholder="Como o paciente reagiu à situação?"
            onChange={(value) => updateField("reaction", value)}
          />

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button type="button" variant="secondary" onClick={() => router.back()}>
              <ArrowLeft />
              Cancelar
            </Button>
            <Button type="button" onClick={submitMoodForm}>
              <Save />
              Confirmar
            </Button>
          </div>
        </form>
      </section>

      <section className="mt-6 rounded-lg bg-gradient-to-br from-secondary to-emerald-600 p-6 text-white shadow-soft">
        <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
          <Info className="size-5" />
          Instruções
        </h2>
        <p className="font-semibold">
          Preencha os campos com o máximo de informação possível.
        </p>
        <ul className="mt-3 list-inside list-disc space-y-1">
          <li>
            Se o motivo do atendimento for proteção a crise suicida, faça um plano
            de segurança.
          </li>
          <li>Para mudanças de humor sem risco suicida, use este registro.</li>
        </ul>
      </section>
    </main>
  );
}

type TextAreaFieldProps = {
  id: keyof typeof initialForm;
  label: string;
  icon: React.ReactNode;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
};

/**
 * Renderiza um campo de texto grande reutilizavel no formulario.
 *
 * Entrada:
 * - id: chave do campo no objeto initialForm.
 * - label: texto visivel do campo.
 * - icon: icone exibido ao lado do label.
 * - value: valor atual do textarea.
 * - placeholder: texto de ajuda.
 * - onChange: funcao chamada com o novo valor digitado.
 *
 * Saida:
 * - bloco com Label e Textarea controlado pelo estado da pagina.
 */
function TextAreaField({
  id,
  label,
  icon,
  value,
  placeholder,
  onChange,
}: TextAreaFieldProps) {
  return (
    <div className="field-group">
      <Label htmlFor={id} className="flex items-center gap-2">
        {icon}
        {label}
      </Label>
      <Textarea
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
