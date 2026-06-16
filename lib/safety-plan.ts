// Dados das etapas do plano de segurança, dicas e contatos de emergência.

import {
  CircleUserRound,
  HandHeart,
  Hospital,
  Phone,
  ShieldCheck,
  TriangleAlert,
  Wrench,
} from "lucide-react";

export const safetyTips = [
  "Revise seu plano regularmente com seu terapeuta",
  "Compartilhe este plano com pessoas de confiança",
  "Mantenha os contatos sempre atualizados",
  "Lembre-se: pedir ajuda é um sinal de força",
];

export const safetySteps = [
  {
    slug: "plano",
    number: 1,
    progress: 16,
    title: "Sinais de Alerta",
    label: "Identifique seus sinais de alerta",
    name: "warningSignals",
    placeholder: "Ex: pensamentos negativos, isolamento, mudanças no sono...",
    icon: TriangleAlert,
    next: "/plano/2",
  },
  {
    slug: "2",
    number: 2,
    progress: 32,
    title: "Estratégias de Enfrentamento",
    label: "Incentive estratégias pessoais e imediatas de enfrentamento para aliviar o sofrimento e atravessar o momento de crise.",
    name: "copingStrategies",
    placeholder: "Ex: respirar fundo, ouvir música, fazer exercícios, meditar...",
    suggestions: [
      "Respirar fundo por alguns minutos",
      "Ouvir uma música tranquila",
      "Tomar um banho relaxante",
      "Fazer uma caminhada curta",
      "Escrever o que estou sentindo",
      "Praticar meditação ou atenção plena",
    ],
    icon: Wrench,
    next: "/plano/3",
  },
  {
    slug: "3",
    number: 3,
    progress: 48,
    title: "Lugares",
    label: "Quais lugares te ajudam a se conectar com você?",
    name: "places",
    placeholder: "Ex: ir a um parque, passear com um pet, encontrar amigos...",
    suggestions: [
      "Parque ou praça tranquila",
      "Casa de um familiar",
      "Casa de um amigo de confiança",
      "Clube, academia ou espaço de atividade física",
      "Biblioteca, cinema ou centro cultural",
      "Local religioso ou espiritual",
    ],
    icon: CircleUserRound,
    next: "/plano/4",
  },
  {
    slug: "4",
    number: 4,
    progress: 48,
    title: "Pessoas",
    label: "Tem alguma pessoa com quem poderia te fazer companhia nesse momento?",
    name: "people",
    placeholder: "Ex: meu melhor amigo, minha mãe, meu terapeuta, entre outros.",
    suggestions: [
      "Melhor amigo ou amiga",
      "Mãe, pai ou responsável",
      "Irmão, irmã ou outro familiar",
      "Parceiro ou parceira",
      "Colega de trabalho ou estudo",
      "Líder religioso ou pessoa da comunidade",
    ],
    icon: CircleUserRound,
    next: "/plano/5",
  },
  {
    slug: "5",
    number: 5,
    progress: 64,
    title: "Contatos de segurança",
    label: "Com quem posso contar para me ajudar quando preciso?",
    name: "safetyContacts",
    placeholder: "Ex: familiares, amigos, terapeuta, entre outros.",
    icon: Phone,
    next: "/plano/6",
  },
  {
    slug: "6",
    number: 6,
    progress: 80,
    title: "Ajuda profissional",
    label: "Preciso recorrer à ajuda profissional?",
    name: "professionalHelp",
    icon: HandHeart,
    next: "/plano/7",
    emergency: true,
  },
  {
    slug: "7",
    number: 7,
    progress: 95,
    title: "Seu ambiente",
    label: "Identifique os riscos e planeje formas de tornar o ambiente seguro (o que restringir, como e com o apoio de quem)",
    name: "safeEnvironment",
    placeholder: "Ex: contar com a ajuda de amigos, familiares, entre outros.",
    icon: ShieldCheck,
    next: "/plano/sucesso",
    final: true,
  },
];

export const emergencyContacts = [
  {
    title: "Meu local de tratamento",
    description: "Nome e telefone (preencher)",
    icon: Hospital,
  },
  {
    title: "CAPS",
    description: "CAPS III Cidade Exemplo",
    number: "(XX) XXXX-XXXX",
    icon: HandHeart,
  },
  {
    title: "SAMU",
    number: "192",
    description: "Emergências médicas",
    icon: Phone,
  },
];

/**
 * Busca os dados de uma etapa do plano de seguranca pelo slug da URL.
 *
 * Entrada:
 * - slug: identificador da etapa, por exemplo "2" ou "plano".
 *
 * Variaveis usadas:
 * - safetySteps: lista com todas as etapas disponiveis.
 *
 * Saida:
 * - objeto da etapa encontrada ou undefined quando o slug nao existe.
 */
export function getSafetyStep(slug: string) {
  return safetySteps.find((step) => step.slug === slug);
}
