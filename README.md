# Meu PSI - Plano de Segurança Individual

O **Meu PSI** (Plano de Segurança Individual) é uma aplicação web desenvolvida com [Next.js](https://nextjs.org/) voltada para auxiliar profissionais de saúde e pacientes no mapeamento de estratégias de prevenção, motivos para viver e planos de ação para cuidado da saúde mental.

---

## Desenvolvimento e Colaboração

Este protótipo foi desenvolvido como parte de uma parceria acadêmica com a **UTFPR-CM** (Universidade Tecnológica Federal do Paraná - Câmpus Campo Mourão).

### Solicitante / Pesquisa
- **Drª. Georgia Cristine Salvadori Takizawa**: Mestranda idealizadora do projeto que solicitou o desenvolvimento do protótipo para suporte à sua pesquisa/trabalho.

### Desenvolvedores (Alunos da UTFPR-CM)
- Erick Molina Gehring
- Paulo Henrique Salvadori Junior
- João Pedro Novais Zanusso
- André Felipe Wonsik Alves
- Eber Felipe Barrotti Louback
- Gustavo Martins França

## Funcionalidades Principais

- **Busca de Pacientes**: Interface de pesquisa dinâmica para localizar registros e acessar de forma rápida o plano de segurança e o histórico de cada paciente.
- **Plano de Segurança Individual (PSI)**: Guia passo a passo interativo para criação e edição de planos de segurança personalizados.
- **Motivos para Viver**: Espaço para listar e relembrar âncoras emocionais e motivos para seguir em frente.
- **Instruções e Dicas**: Central de ajuda com orientações de uso para profissionais e pacientes.
- **Exportação de Relatórios**: Funcionalidade integrada para exportação de dados em PDF (utilizando `jspdf`).

---

## Tecnologias Utilizadas

- **Core**: [Next.js](https://nextjs.org/) (com TypeScript e App Router)
- **Interface**: [TailwindCSS](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/) e [Radix UI primitives](https://www.radix-ui.com/)
- **Ícones**: [Lucide React](https://lucide.dev/)
- **Geração de PDF**: [jsPDF](https://github.com/parallax/jsPDF)

---

## Instalação e Execução

Siga os passos abaixo para executar o projeto localmente:

### Pré-requisitos
Certifique-se de possuir o [Node.js](https://nodejs.org/) instalado em sua máquina.

### Passo 1: Instalar dependências
No diretório raiz do projeto, instale os pacotes necessários:
```bash
npm install
```

### Passo 2: Executar em ambiente de desenvolvimento
Inicie o servidor local:
```bash
npm run dev
```
O projeto estará disponível no endereço [http://localhost:3000](http://localhost:3000).

### Passo 3: Compilar para produção
Para gerar a versão otimizada para produção:
```bash
npm run build
```

E para iniciar o servidor de produção:
```bash
npm run start
```

