import jsPDF from "jspdf";

import { emergencyContacts, safetySteps } from "@/lib/safety-plan";
import type { SafetyPlan } from "@/lib/local-database";

const PAGE_MARGIN = 15;
const PAGE_WIDTH = 210; // A4 em mm
const PAGE_HEIGHT = 297;
const CONTENT_WIDTH = PAGE_WIDTH - PAGE_MARGIN * 2;

/**
 * Gera um PDF com as respostas salvas do plano de segurança.
 *
 * Entrada:
 * - plan: dados do plano recuperados do banco local (IndexedDB).
 *
 * Variáveis usadas:
 * - doc: instância do jsPDF usada para desenhar texto e controlar páginas.
 * - cursorY: posição vertical atual de escrita no PDF.
 *
 * Saída:
 * - nenhum retorno; aciona o download do arquivo "plano-de-seguranca.pdf".
 */
export function generateSafetyPlanPdf(plan: SafetyPlan) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let cursorY = PAGE_MARGIN;

  function ensureSpace(height: number) {
    if (cursorY + height > PAGE_HEIGHT - PAGE_MARGIN) {
      doc.addPage();
      cursorY = PAGE_MARGIN;
    }
  }

  function writeHeader() {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(30, 41, 59);
    doc.text("Plano de Segurança", PAGE_MARGIN, cursorY);
    cursorY += 8;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139);
    const generatedAt = plan.updatedAt
      ? new Date(plan.updatedAt).toLocaleString("pt-BR")
      : new Date().toLocaleString("pt-BR");
    doc.text(`Atualizado em ${generatedAt}`, PAGE_MARGIN, cursorY);
    cursorY += 10;
  }

  function writeSectionTitle(number: number, title: string) {
    ensureSpace(10);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(30, 41, 59);
    doc.text(`${number}. ${title}`, PAGE_MARGIN, cursorY);
    cursorY += 7;
  }

  function writeBodyLines(lines: string[]) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(51, 65, 85);

    for (const line of lines) {
      const wrapped = doc.splitTextToSize(`• ${line}`, CONTENT_WIDTH);
      ensureSpace(wrapped.length * 5.5);
      doc.text(wrapped, PAGE_MARGIN, cursorY);
      cursorY += wrapped.length * 5.5;
    }
    cursorY += 4;
  }

  function writeEmptyNotice() {
    ensureSpace(6);
    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.setTextColor(148, 163, 184);
    doc.text("Nenhuma informação preenchida.", PAGE_MARGIN, cursorY);
    cursorY += 8;
  }

  writeHeader();

  for (const step of safetySteps) {
    writeSectionTitle(step.number, step.title);

    if (step.emergency) {
      const treatmentPlace = plan.treatmentPlace;
      const hasTreatmentPlace = treatmentPlace?.name || treatmentPlace?.phone;

      const lines: string[] = [];
      if (hasTreatmentPlace) {
        lines.push(
          `Local de tratamento: ${treatmentPlace?.name || "-"} — ${treatmentPlace?.phone || "-"}`,
        );
      }
      for (const contact of emergencyContacts) {
        if (contact.title === "Meu local de tratamento") continue;
        const number = "number" in contact ? contact.number : undefined;
        lines.push(`${contact.title}: ${number ?? contact.description}`);
      }
      writeBodyLines(lines);
      continue;
    }

    const rawValue = plan[step.name];
    const value = typeof rawValue === "string" ? rawValue : "";
    const others =
      step.name === "warningSignals" && typeof plan.warningSignalsOthers === "string"
        ? plan.warningSignalsOthers
        : "";

    const lines = value
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    if (others) lines.push(`Outros: ${others}`);

    if (lines.length === 0) {
      writeEmptyNotice();
      continue;
    }

    writeBodyLines(lines);
  }

  doc.save("plano-de-seguranca.pdf");
}