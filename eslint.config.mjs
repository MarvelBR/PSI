import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  {
    ignores: [".next/**", "node_modules/**", "legacy-html/**"],
  },
  ...nextVitals,
];

export default eslintConfig;
