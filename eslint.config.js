import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactPlugin from 'eslint-plugin-react';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { globalIgnores } from 'eslint/config';
import stylistic from '@stylistic/eslint-plugin';

export default tseslint.config([
  globalIgnores(['build']),
  {
    files: ['**/*.{ts,tsx,js}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    },

    plugins: {
      '@stylistic': stylistic,
      'react': reactPlugin
    },
    rules: {
      // Общие "чистые" правила кода
      'prefer-spread': 'warn', // Предпочитать [...arr] вместо apply()
      'prefer-rest-params': 'warn', // Предпочитать ...args вместо arguments
      'object-curly-spacing': ['warn', 'always'], // Пробелы внутри фигурных скобок в импортировании и деструктуризации
      'prefer-const': 'warn', // Использовать const если переменная не меняется
      'prefer-arrow-callback': 'warn', // Предпочитать стрелочные функции в коллбеках
      'no-var': 'error', // Запрещён var
      'no-eq-null': 'error', // Запрещён == null (только === null)
      'no-else-return': ['error', { allowElseIf: false }], // После return не ставим else
      eqeqeq: 'error', // Всегда использовать === вместо ==
      'dot-notation': 'error', // obj.key вместо obj['key']
      'dot-location': ['error', 'property'], // Точка ставится перед свойством
      curly: 'error', // Всегда использовать {}
      'no-inner-declarations': 'error', // Запрещено объявлять функции внутри блоков
      'no-extra-boolean-cast': 'error', // !!true → лишнее
      'no-empty': 'error', // Запрещены пустые блоки {}
      quotes: ['error', 'single'], // Одинарные кавычки
      'no-console': 'warn', // console.log разрешён, но предупреждение
      'no-debugger': 'warn', // debugger разрешён, но предупреждение
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'max-len': ['error', 140],

      // Правила для пробелов и отступов
      'no-multi-spaces': 'error', // Запрещает множественные пробелы
      'no-trailing-spaces': 'error', // Запрещает пробелы в конце строк
      'no-whitespace-before-property': 'error', // Запрещает пробелы перед точкой в свойствах
      'space-in-parens': ['error', 'never'], // Нет пробелов внутри скобок
      'array-bracket-spacing': ['error', 'never'], // Нет пробелов внутри квадратных скобок
      'block-spacing': ['error', 'always'], // Пробелы внутри блоков
      'comma-spacing': ['error', { 'before': false, 'after': true }], // Пробелы после запятых
      'keyword-spacing': ['error', { 'before': true, 'after': true }], // Пробелы вокруг ключевых слов
      'func-call-spacing': ['error', 'never'], // Нет пробелов при вызове функций
      'space-before-blocks': 'error', // Пробел перед блоком
      'space-before-function-paren': ['error', {
        'anonymous': 'never',
        'named': 'never',
        'asyncArrow': 'always'
      }], // Пробелы перед скобками функций
      'spaced-comment': ['error', 'always'], // Пробелы в комментариях
      'indent': ['error', 2], // Отступы в 2 пробела
      'semi-spacing': ['error', { 'before': false, 'after': true }], // Пробелы вокруг точек с запятой
      'arrow-spacing': ['error', { 'before': true, 'after': true }], // Пробелы вокруг стрелки
      'template-tag-spacing': ['error', 'never'], // Пробелы в теговых шаблонах
      'space-infix-ops': 'error', // Пробелы вокруг операторов
      'key-spacing': ['error', {
        'beforeColon': false,
        'afterColon': true
      }], // Пробелы в свойствах объектов
      'rest-spread-spacing': ['error', 'never'], // Пробелы в spread операторе
      'no-mixed-spaces-and-tabs': 'error', // Запрещает смешивание пробелов и табов
      '@stylistic/jsx-curly-brace-presence': ['error', { props: 'never' }], // пример: size={'xs'} => size="xs"
      'react/jsx-max-props-per-line':
        ['error', { when: 'multiline' }], // каждый пропс на новой строке, если компонент занимает больше одной строки.
      'react/jsx-first-prop-new-line': ['error', 'multiline'], // если тег многострочный, первый пропс уходит на новую строку
      'react/jsx-indent-props': ['error', 2], // отступ для пропсов
      'react/jsx-closing-bracket-location': ['error', 'line-aligned'] // Закрывающая скобка /> будет выровнена под первой строкой тега
    }
  }
]);
