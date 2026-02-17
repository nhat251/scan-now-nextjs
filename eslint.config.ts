import importPlugin from "eslint-plugin-import";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tailwindcss from "eslint-plugin-tailwindcss";
import tseslint from "typescript-eslint";

import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";

export default tseslint.config(
  {
    ignores: [
      "**/node_modules/**",
      ".next/**",
      "**/.next/**",
      "out/**",
      "public/**",
      ".gitignore",
      ".husky",
      "**/dist/**",
      "**/build/**",
      ".agent/**",
    ],
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2020,
      },
    },
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      prettierRecommended,
      tailwindcss.configs["flat/recommended"],
    ],
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      "react-hooks": reactHooks,
      "@next/next": nextPlugin,
      "simple-import-sort": simpleImportSort,
      import: importPlugin,
      react: reactPlugin,
      tailwindcss,
    },
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
        },
      },
      tailwindcss: {
        callees: ["clsx", "cn"],
        config: false,
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      "prettier/prettier": "off",
      "no-console": "warn",
      "require-await": "error",
      // React rules
      "react/jsx-key": "error",
      // TypeScript rules
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      // Simple Import Sort rules
      "simple-import-sort/exports": "error",
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^react$", "^next", "^[a-z]"],
            ["^@"],
            ["^~"],
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            ["^.+\\.s?css$"],
            ["^\\u0000"],
          ],
        },
      ],
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-duplicates": "error",
      "import/no-default-export": "error",
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["../*"],
              message: "Use the '@/' alias instead of parent relative imports.",
            },
          ],
        },
      ],
      // Tailwind CSS v4 rules
      "tailwindcss/classnames-order": "warn",
      "tailwindcss/enforces-negative-arbitrary-values": "warn",
      "tailwindcss/enforces-shorthand": "warn",
      "tailwindcss/migration-from-tailwind-2": "off", // Not needed for v4
      "tailwindcss/no-arbitrary-value": "off",
      "tailwindcss/no-contradicting-classname": "error",
      "tailwindcss/no-custom-classname": "off",
      "tailwindcss/no-unnecessary-arbitrary-value": "warn",
    },
  },
  // Allow default export in Next.js convention files
  {
    files: [
      "**/page.{js,jsx,ts,tsx}",
      "**/layout.{js,jsx,ts,tsx}",
      "**/loading.{js,jsx,ts,tsx}",
      "**/error.{js,jsx,ts,tsx}",
      "**/not-found.{js,jsx,ts,tsx}",
      "**/template.{js,jsx,ts,tsx}",
      "**/default.{js,jsx,ts,tsx}",
      "**/route.{js,ts}",
    ],
    rules: {
      "import/no-default-export": "off",
    },
  },
  // Allow default export in config files
  {
    files: [
      "**/*.config.{js,ts,mjs,cjs}",
      "eslint.config.{js,ts,mjs}",
      "next.config.{js,ts,mjs}",
      "postcss.config.{js,ts,mjs}",
      "tailwind.config.{js,ts,mjs}",
      "**/i18n/request.{js,ts}",
    ],
    rules: {
      "import/no-default-export": "off",
    },
  }
);
