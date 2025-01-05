import react from "@eslint-react/eslint-plugin";
import eslint from "@eslint/js";
import next from "@next/eslint-plugin-next";
import query from "@tanstack/eslint-plugin-query";
import configPrettier from "eslint-config-prettier";
import drizzle from "eslint-plugin-drizzle";
import importX from "eslint-plugin-import-x";
import reactCompiler from "eslint-plugin-react-compiler";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      ".next",
      "node_modules",
      "**.config.js",
      "**.config.cjs",
      "**.d.ts",
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
  react.configs["all"],
  ...query.configs["flat/recommended"],
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    linterOptions: {
      reportUnusedDisableDirectives: "error",
    },
  },
  {
    plugins: {
      drizzle,
      "react-hooks": reactHooks,
      "@next/next": next,
      "react-compiler": reactCompiler,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...next.configs.recommended.rules,
      ...next.configs["core-web-vitals"].rules,
      eqeqeq: "error",
      "no-lonely-if": "warn",
      "no-nested-ternary": "warn",
      "no-useless-rename": "warn",
      "prefer-template": "error",
      "@typescript-eslint/naming-convention": [
        "error",
        {
          format: ["camelCase", "UPPER_CASE", "PascalCase"],
          selector: ["function", "variable", "interface"],
        },
      ],
      camelcase: ["warn", { properties: "never", allow: ["^unstable_"] }],
      "import-x/consistent-type-specifier-style": ["error", "prefer-inline"],
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@eslint-react/hooks-extra/no-direct-set-state-in-use-effect": "error",
      "@eslint-react/hooks-extra/no-direct-set-state-in-use-layout-effect":
        "error",
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-misused-promises": "off",
      "@eslint-react/dom/no-children-in-void-dom-elements": "off",
      "drizzle/enforce-delete-with-where": [
        "error",
        {
          drizzleObjectName: ["db", "ctx.db"],
        },
      ],
      "drizzle/enforce-update-with-where": [
        "error",
        {
          drizzleObjectName: ["db", "ctx.db"],
        },
      ],
      "@next/next/no-duplicate-head": "off",
      "@next/next/no-img-element": "off",
      "react-compiler/react-compiler": "error",
      "@eslint-react/naming-convention/filename": "off",
      "require-atomic-updates": "warn",
      "no-return-await": "warn",
      "no-param-reassign": "warn",
      "@typescript-eslint/no-shadow": "warn",
      "@eslint-react/prefer-destructuring-assignment": "off",
      "@eslint-react/avoid-shorthand-boolean": "off",
      "@eslint-react/avoid-shorthand-fragment": "off",
      "@eslint-react/no-complex-conditional-rendering": "off",
      "@eslint-react/naming-convention/filename-extension": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "no-await-in-loop": "error",
      "@eslint-react/dom/no-unknown-property": "off",
    },
  },
  {
    ignores: [
      "**/page.tsx",
      "**/loading.tsx",
      "**/layout.tsx",
      "**/error.tsx",
      "**/not-found.tsx",
      "src/middleware.ts",
      "src/server/email/templates/**",
      "**.config.ts",
    ],
    rules: {
      "import-x/no-default-export": "error",
    },
  },
  configPrettier,
);
