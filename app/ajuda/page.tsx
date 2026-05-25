import {
  Compass,
  FileText,
  Heart,
  Hospital,
  Info,
  Pill,
  Puzzle,
  Scale,
  Trash2,
} from "lucide-react";

const instructions = [
  {
    icon: Info,
    text: "Preencha os campos com o máximo de informação possível. Se o motivo do atendimento for proteção a crise suicida, faça um plano de segurança e forneça ao paciente. Para mudanças de humor e comportamentos sem risco suicida, use o registro de mudança de humor.",
  },
  {
    icon: Puzzle,
    text: "Dê preferência a informações personalizadas, com as soluções evocadas pelo próprio paciente primeiro.",
  },
  {
    icon: Compass,
    text: "Na primeira consulta você pode coletar informação de qual etapa ele tem preferência por recorrer para alívio. Incentive o paciente a realizar as etapas de 1 a 6 nesta ordem, para promover autonomia na resolução da crise.",
  },
  {
    icon: Scale,
    text: "Verifique se, havendo ideação suicida, ela necessita de resolução de problemas ou preferência por distração em situações que requerem tempo, espera ou aceitação.",
  },
  {
    icon: FileText,
    text: "Peça para que o paciente traga nos retornos seu plano de segurança. É importante revisar como utilizou e como se sentiu após fazê-lo.",
  },
  {
    icon: Heart,
    text: "Motivos para viver podem ser registrados e impressos ao paciente também. Você pode evocá-los em cada consulta de retorno e encorajar a lembrar deles no dia a dia.",
  },
  {
    icon: Pill,
    text: "Caso o paciente esteja em uso de medicamentos, avalie na etapa 6 o risco e benefício de manter o uso ou fornecer acesso a este tipo de método.",
  },
  {
    icon: Trash2,
    text: "Na etapa 6, pode ser descrito qualquer tipo de método se o paciente verbalizar um plano ou tiver tentativa recente de autolesão. Faça um plano para se desfazer destes.",
  },
  {
    icon: Hospital,
    text: "Se a identificação de risco for alta, através da avaliação do profissional, sugere-se encaminhamento ao Pronto Atendimento de referência.",
  },
];

/**
 * Renderiza as instrucoes de uso do TerapiApp.
 *
 * Entrada:
 * - nao recebe parametros.
 *
 * Variaveis usadas:
 * - instructions: lista de textos e icones exibidos na pagina.
 *
 * Saida:
 * - pagina com orientacoes numeradas para o profissional de saude.
 */
export default function AjudaPage() {
  return (
    <main className="page-shell">
      <section className="page-header">
        <h1 className="page-title">Instruções de Uso</h1>
      </section>

      <section className="form-panel space-y-4">
        {instructions.map((instruction, index) => {
          const Icon = instruction.icon;
          return (
            <article key={instruction.text} className="field-group">
              <h2 className="flex items-center gap-2 font-semibold text-slate-800">
                <Icon className="size-5 text-primary" />
                {index + 1}.
              </h2>
              <p className="rounded-md border bg-background p-3 text-sm leading-6 text-slate-700">
                {instruction.text}
              </p>
            </article>
          );
        })}
      </section>
    </main>
  );
}
