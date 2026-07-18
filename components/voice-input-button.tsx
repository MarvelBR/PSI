"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Mic, Square } from "lucide-react";

import { Button } from "@/components/ui/button";

type VoiceInputButtonProps = {
  onTranscript: (text: string) => void;
  className?: string;
};

function getSpeechRecognitionConstructor() {
  if (typeof window === "undefined") return null;
  return (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition || null;
}

// O suporte a reconhecimento de fala nao muda durante a execucao da pagina,
// entao a "subscricao" nao precisa escutar nada.
function subscribeToSpeechSupport() {
  return () => {};
}

function getSpeechSupportSnapshot() {
  return getSpeechRecognitionConstructor() !== null;
}

function getSpeechSupportServerSnapshot() {
  return false;
}

/**
 * Botão de microfone que transcreve a fala do usuário em texto.
 *
 * Entrada:
 * - onTranscript: função chamada com o texto reconhecido, para ser
 *   adicionado ao campo de escrita.
 *
 * Variáveis usadas:
 * - recognitionRef: instância da API de reconhecimento de fala do navegador.
 * - isRecording: controla o estado visual do botão (gravando ou não).
 * - isSupported: indica se o navegador atual oferece reconhecimento de fala,
 *   lido via useSyncExternalStore para evitar erro de hydration (o servidor
 *   sempre reporta "nao suportado", ja que window nao existe la).
 *
 * Saída:
 * - botão com ícone de microfone que inicia/para a gravação por voz, ou
 *   nada quando o navegador não suporta reconhecimento de fala.
 */
export function VoiceInputButton({ onTranscript, className }: VoiceInputButtonProps) {
  const [isRecording, setIsRecording] = useState(false);
  const isSupported = useSyncExternalStore(
    subscribeToSpeechSupport,
    getSpeechSupportSnapshot,
    getSpeechSupportServerSnapshot,
  );
  const recognitionRef = useRef<any>(null);
  const onTranscriptRef = useRef(onTranscript);

  useEffect(() => {
    onTranscriptRef.current = onTranscript;
  }, [onTranscript]);

  useEffect(() => {
    if (!isSupported) return;

    const SpeechRecognition = getSpeechRecognitionConstructor();
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = "pt-BR";
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      let finalText = "";
      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        if (event.results[i].isFinal) {
          finalText += event.results[i][0].transcript;
        }
      }
      if (finalText.trim()) {
        onTranscriptRef.current(finalText.trim());
      }
    };

    recognition.onerror = () => setIsRecording(false);
    recognition.onend = () => setIsRecording(false);

    recognitionRef.current = recognition;

    return () => recognition.stop();
  }, [isSupported]);

  function toggleRecording() {
    if (!recognitionRef.current) return;

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
      return;
    }

    recognitionRef.current.start();
    setIsRecording(true);
  }

  if (!isSupported) return null;

  return (
    <Button
      type="button"
      variant={isRecording ? "destructive" : "secondary"}
      size="icon"
      onClick={toggleRecording}
      aria-pressed={isRecording}
      aria-label={isRecording ? "Parar gravação" : "Gravar por voz"}
      className={className}
    >
      {isRecording ? <Square className="size-4" /> : <Mic className="size-4" />}
    </Button>
  );
}