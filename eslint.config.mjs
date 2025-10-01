import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

const eslintConfig = [
  ...compat.config({
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    extends: [
      "next/core-web-vitals",
      "plugin:prettier/recommended",
      "prettier",
      "plugin:@typescript-eslint/recommended",
    ],
  }),
];

export default eslintConfig;
