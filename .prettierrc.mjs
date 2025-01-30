/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  plugins: ['prettier-plugin-tailwindcss'],
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 80,
  /**
   * TailwindCSS
   * https://www.npmjs.com/package/prettier-plugin-tailwindcss#sorting-classes-in-function-calls
   */
  tailwindFunctions: ['cn'],
};

export default config;
