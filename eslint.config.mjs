import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

const eslintConfig = [
  ...compat.config({
    extends: [
      "next/core-web-vitals",
      "plugin:prettier/recommended",
      "prettier",
    ],
  }),
];

export default eslintConfig;
