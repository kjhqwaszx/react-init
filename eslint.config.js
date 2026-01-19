import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import prettier from 'eslint-config-prettier'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  /* ==============================
   * Global ignores
   * ============================== */
  globalIgnores(['dist', 'node_modules', 'coverage']),

  /* ==============================
   * Base JS / TS / React rules
   * ============================== */
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      react.configs.flat.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      prettier,
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // React 17+ (및 React 19)에서는
      // JSX를 사용할 때 React를 import 할 필요가 없음
      // → 불필요한 에러 방지
      'react/react-in-jsx-scope': 'off',

      // 사용하지 않는 변수에 대한 경고
      // 단, 변수명이 "_"로 시작하면
      // "의도적으로 사용하지 않음"으로 판단하여 허용
      // 예: (_event, _index)
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],

      // 명시적인 any 사용을 허용
      '@typescript-eslint/no-explicit-any': 'off',

      // Hooks 사용 규칙 강제
      // - 조건문 안에서 Hooks 호출 금지
      // - 반복문 안에서 Hooks 호출 금지
      // React의 동작 원리를 깨는 경우이므로 error 레벨
      'react-hooks/rules-of-hooks': 'error',
    },
  },
])
