import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

const eslintConfig = [
  ...compat.config({
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint", "import"],
    extends: [
      "next/core-web-vitals",
      "plugin:prettier/recommended",
      "prettier",
      "plugin:@typescript-eslint/recommended",
    ],
    rules: {
      "import/order": [
        "error",
        {
          groups: ["external", "internal"],
          pathGroups: [
            {
              pattern: "@/**",
              group: "internal",
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: ["external"],
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
          "newlines-between": "always",
        },
      ],
    },
    ignorePatterns: ["node_modules/", "out/", ".next/"],
  }),
];

export default eslintConfig;
