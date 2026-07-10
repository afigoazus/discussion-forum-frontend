import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'
import { FlatCompat } from '@eslint/eslintrc'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

export default defineConfig([
  // Ignore directories and configuration files we don't want to lint with Airbnb rules
  globalIgnores([
    'dist',
    'node_modules',
    'eslint.config.js',
    'vite.config.ts',
  ]),
  ...compat.extends('eslint-config-airbnb'),
  {
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: ['./tsconfig.json', './tsconfig.app.json', './tsconfig.node.json'],
          tsconfigRootDir: __dirname,
        },
        node: true,
      },
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        project: ['./tsconfig.app.json', './tsconfig.node.json'],
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off', // Not needed in React 17+ / Vite
      'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
      'react/require-default-props': 'off', // TypeScript handles optional values natively
      'react/jsx-props-no-spreading': 'off', // Allowed for generic custom UI wrapper components
      'import/no-unresolved': 'off', // TypeScript compiler (tsc) already checks this
      'import/extensions': 'off', // TypeScript handles file extensions automatically
    },
  },
])
