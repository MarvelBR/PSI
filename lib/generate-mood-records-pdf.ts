import jsPDF from "jspdf";

import type { MoodRecord } from "@/lib/local-database";

const PAGE_MARGIN = 15;
const PAGE_WIDTH = 210;
const PAGE_HEIGHT = 297;
const CONTENT_WIDTH = PAGE_WIDTH - PAGE_MARGIN * 2;

const FIELD_LABELS: Array<{ key: keyof MoodRecord; label: string }> = [
  { key: "positiveEmotions", label: "Emoções Positivas" },
  { key: "negativeEmotions", label: "Emoções Negativas" },
  { key: "situation", label: "Situação" },
  { key: "thoughts", label: "Pensamentos" },
  { key: "reaction", label: "Reação" },
];

/**
 * Gera um PDF com o histórico de registros de mudança de humor.
 *
 * Entrada:
 * - records: lista de registros recuperados do banco local (IndexedDB),
 *   já ordenada do mais recente para o mais antigo.
 *
 * Variáveis usadas:
 * - doc: instância do jsPDF usada para desenhar texto e controlar páginas.
 * - cursorY: posição vertical atual de escrita no PDF.
 *
 * Saída:
 * - nenhum retorno; aciona o download do arquivo "registro-de-humor.pdf".
 */
export function generateMoodRecordsPdf(records: MoodRecord[]) {
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
    doc.text("Registro de Mudança de Humor", PAGE_MARGIN, cursorY);
    cursorY += 8;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139);
    doc.text(
      `Gerado em ${new Date().toLocaleString("pt-BR")} — ${records.length} registro(s)`,
      PAGE_MARGIN,
      cursorY,
    );
    cursorY += 10;
  }

  function writeRecordDate(record: MoodRecord) {
    ensureSpace(10);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(30, 41, 59);
    const formattedDate = record.date
      ? new Date(`${record.date}T00:00:00`).toLocaleDateString("pt-BR")
      : "Data não informada";
    doc.text(formattedDate, PAGE_MARGIN, cursorY);
    cursorY += 7;
  }

  function writeField(label: string, value: string) {
    if (!value.trim()) return;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(51, 65, 85);
    ensureSpace(6);
    doc.text(`${label}:`, PAGE_MARGIN, cursorY);
    cursorY += 5.5;

    doc.setFont("helvetica", "normal");
    doc.setTextColor(71, 85, 105);
    const wrapped = doc.splitTextToSize(value, CONTENT_WIDTH);
    ensureSpace(wrapped.length * 5.5);
    doc.text(wrapped, PAGE_MARGIN, cursorY);
    cursorY += wrapped.length * 5.5 + 2;
  }

  function writeDivider() {
    ensureSpace(6);
    doc.setDrawColor(226, 232, 240);
    doc.line(PAGE_MARGIN, cursorY, PAGE_WIDTH - PAGE_MARGIN, cursorY);
    cursorY += 8;
  }

  writeHeader();

  if (records.length === 0) {
    doc.setFont("helvetica", "italic");
    doc.setFontSize(11);
    doc.setTextColor(148, 163, 184);
    doc.text("Nenhum registro salvo até o momento.", PAGE_MARGIN, cursorY);
  }

  records.forEach((record, index) => {
    writeRecordDate(record);

    for (const field of FIELD_LABELS) {
      const value = record[field.key];
      writeField(field.label, typeof value === "string" ? value : "");
    }

    if (index < records.length - 1) writeDivider();
  });

  doc.save("registro-de-humor.pdf");
}