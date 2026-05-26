/**
 * Renderiza o rodape padrao da aplicacao.
 *
 * Entrada:
 * - nao recebe parametros.
 *
 * Saida:
 * - elemento footer com texto de direitos/identidade do TerapiApp.
 */
export function Footer() {
  return (
    <footer className="bg-slate-800 py-6 text-center text-sm text-white">
      <p>&copy; 2025 TerapiApp - Cuidando da sua saúde mental</p>
    </footer>
  );
}
