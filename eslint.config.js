import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // Общие "чистые" правила кода
      'prefer-spread': 'warn',      // Предпочитать [...arr] вместо apply()
      'prefer-rest-params': 'warn', // Предпочитать ...args вместо arguments
      "object-curly-spacing": ["warn", "always"], // Пробелы внутри фигурных скобок в импортировании и деструктуризации
      'prefer-const': 'warn',       // Использовать const если переменная не меняется
      'prefer-arrow-callback': 'warn', // Предпочитать стрелочные функции в коллбеках
      'no-var': 'error',            // Запрещён var
      'no-eq-null': 'error',        // Запрещён == null (только === null)
      'no-else-return': ['error', { allowElseIf: false }], // После return не ставим else
      eqeqeq: 'error',              // Всегда использовать === вместо ==
      'dot-notation': 'error',      // obj.key вместо obj['key']
      'dot-location': ['error', 'property'], // Точка ставится перед свойством
      curly: 'error',               // Всегда использовать {}
      'no-inner-declarations': 'error', // Запрещено объявлять функции внутри блоков
      'no-extra-boolean-cast': 'error',  // !!true → лишнее
      'no-empty': 'error',          // Запрещены пустые блоки {}
      quotes: ['error', 'single'],  // Одинарные кавычки
      'no-nested-ternary': 'error', // Запрещены вложенные тернарники
      'no-console': 'warn',         // console.log разрешён, но предупреждение
      'no-debugger': 'warn',        // debugger разрешён, но предупреждение
    }
  },
])
