/** @type {import("eslint").Linter.Config} */
module.exports = {
    root: true,
    extends: ['@repo/eslint-config/next.js'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: true,
    },
    ignorePatterns: ['next.config.js', 'postcss.config.js'],
    rules: {
      "@next/next/no-img-element": "off",
    },
};
