// @ts-nocheck
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs', '.eslintrc', 'dist', 'node_modules', '@generated'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      ecmaVersion: 5,
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    plugins: [
      '@typescript-eslint',
      'prettier',
      'simple-import-sort',
      'unused-imports',
      'import'
    ],
    rules: {
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
          singleQuote: true,
          trailingComma: 'none',
          tabWidth: 2,
          semi: false,
          printWidth: 70,
          jsxSingleQuote: true,
          bracketSpacing: true,
          bracketSameLine: false,
          arrowParens: 'avoid'
        }
      ],
      'space-before-function-paren': [
        'error',
        {
          anonymous: 'always',
          named: 'never',
          asyncArrow: 'always'
        }
      ],
      'no-useless-constructor': 'off',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^\\u0000'],
            ['^@nestjs(/.*|$)'],
            ['^@prisma(/.*|$)'],
            ['^@modules(/.*|$)'],
            ['^@generated(/.*|$)'],
            ['^@\\w'],
            ['^libs(/.*|$)'],
            ['^\\.']
          ]
        }
      ],
      'unused-imports/no-unused-imports': 'warn',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_'
        }
      ],
      'sort-imports': 'off',
      'import/order': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn'
    },
  },
);