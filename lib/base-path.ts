/**
 * Prefixo de rota usado quando o site é publicado no GitHub Pages
 * (ex: marvelbr.github.io/PSI). Deve bater com o basePath do next.config.ts.
 * Em desenvolvimento local fica vazio, para não quebrar o npm run dev.
 */
export const basePath = process.env.NODE_ENV === "production" ? "/PSI" : "";