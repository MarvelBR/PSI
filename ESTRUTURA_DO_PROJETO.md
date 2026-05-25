# Estrutura do projeto

Este arquivo explica a funcao de cada pasta principal do projeto para facilitar a leitura do codigo.

## app/

Contem as rotas principais do Next.js da aplicacao da raiz.

- `app/page.tsx`: tela inicial do TerapiApp.
- `app/layout.tsx`: estrutura global com menu, conteudo e rodape.
- `app/busca/`: pagina para buscar pacientes.
- `app/registro/`: pagina para registrar mudancas de humor.
- `app/ajuda/`: pagina com instrucoes de uso.
- `app/plano/`: fluxo do plano de seguranca, incluindo etapas e tela de sucesso.
- `app/globals.css`: estilos globais usados pelo app.

## components/

Guarda componentes reutilizaveis da aplicacao da raiz.

- `components/navbar.tsx`: menu superior.
- `components/footer.tsx`: rodape.
- `components/safety-step-page.tsx`: tela reutilizada pelas etapas do plano de seguranca.
- `components/safety-tips.tsx`: bloco de dicas importantes.
- `components/ui/`: componentes basicos de interface, como botao, card, input, label, progresso e textarea.

## lib/

Guarda funcoes utilitarias e dados compartilhados.

- `lib/utils.ts`: funcao `cn`, usada para combinar classes CSS.
- `lib/safety-plan.ts`: dados das etapas do plano de seguranca, dicas e contatos de emergencia.

## public/

Contem arquivos estaticos servidos diretamente pelo Next.js.

- `public/medico.png`: imagem usada na tela inicial.

## legacy-html/

Mantem a versao antiga em HTML, CSS e JavaScript puro.

- `legacy-html/*.html`: paginas HTML antigas.
- `legacy-html/styles/`: estilos CSS da versao antiga.
- `legacy-html/scripts/`: JavaScript da versao antiga, incluindo manipulacao de DOM e localStorage.
- `legacy-html/assets/`: imagens usadas pela versao antiga.

## mvp-ihc/

Contem uma segunda versao do projeto Next.js, mais completa e separada da raiz.

- `mvp-ihc/app/`: rotas dessa versao.
- `mvp-ihc/components/`: componentes dessa versao.
- `mvp-ihc/components/terapi/`: componentes especificos do TerapiApp, como AppShell, UI e etapas do plano.
- `mvp-ihc/lib/`: utilitarios dessa versao.
- `mvp-ihc/public/`: arquivos estaticos dessa versao.
- `mvp-ihc/app/_legacy-pages/`: copia das paginas HTML antigas dentro dessa versao.

## Arquivos de configuracao da raiz

- `package.json`: scripts e dependencias do projeto da raiz.
- `package-lock.json`: versoes travadas das dependencias instaladas.
- `next.config.ts`: configuracao do Next.js.
- `tailwind.config.ts`: configuracao do Tailwind CSS.
- `postcss.config.mjs`: configuracao do PostCSS.
- `eslint.config.mjs`: configuracao do ESLint.
- `tsconfig.json`: configuracao do TypeScript.
- `components.json`: configuracao dos componentes de UI.

## Pastas geradas

Estas pastas nao devem ser editadas manualmente.

- `.next/`: build/cache gerado pelo Next.js.
- `node_modules/`: dependencias instaladas pelo npm.
