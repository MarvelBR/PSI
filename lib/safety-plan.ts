import {
  CircleUserRound,
  HandHeart,
  Phone,
  ShieldAlert,
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
    label: "O que você pode fazer sozinho para se sentir melhor?",
    name: "copingStrategies",
    placeholder: "Ex: respirar fundo, ouvir música, fazer exercícios, meditar...",
    icon: Wrench,
    next: "/plano/3",
  },
  {
    slug: "3",
    number: 3,
    progress: 48,
    title: "Lugares e pessoas",
    label: "Quais lugares você gosta de visitar para se sentir melhor? Com quem?",
    name: "placesAndPeople",
    placeholder: "Ex: ir a um parque, passear com um pet, encontrar amigos...",
    icon: CircleUserRound,
    next: "/plano/4",
  },
  {
    slug: "4",
    number: 4,
    progress: 64,
    title: "Contatos de segurança",
    label: "Com quem posso contar para me ajudar quando preciso?",
    name: "safetyContacts",
    placeholder: "Ex: familiares, amigos, terapeuta, entre outros.",
    icon: Phone,
    next: "/plano/5",
  },
  {
    slug: "5",
    number: 5,
    progress: 80,
    title: "Ajuda profissional",
    label: "Preciso recorrer à ajuda profissional?",
    name: "professionalHelp",
    icon: HandHeart,
    next: "/plano/6",
    emergency: true,
  },
  {
    slug: "6",
    number: 6,
    progress: 95,
    title: "Seu ambiente",
    label: "O que posso fazer para meu ambiente ficar mais seguro?",
    name: "safeEnvironment",
    placeholder: "Ex: contar com a ajuda de amigos, familiares, entre outros.",
    icon: ShieldCheck,
    next: "/plano/sucesso",
    final: true,
  },
];

export const emergencyContacts = [
  {
    title: "CVV - Centro de Valorização da Vida",
    number: "188",
    description: "24 horas, gratuito",
    icon: Phone,
  },
  {
    title: "SAMU",
    number: "192",
    description: "Emergências médicas",
    icon: HandHeart,
  },
  {
    title: "Pronto Socorro",
    number: "193",
    description: "Bombeiros",
    icon: ShieldAlert,
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
