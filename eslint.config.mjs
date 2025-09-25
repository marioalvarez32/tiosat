// @ts-check
import stylistic from '@stylistic/eslint-plugin';
import pluginVue from 'eslint-plugin-vue';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import vueParser from 'vue-eslint-parser';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    plugins: {
      stylistic,
      '@typescript-eslint': typescript,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      'semi': ['error'],
      'stylistic/indent': ['error', 2],
      'stylistic/member-delimiter-style': ['error', {
        multiline: {
          delimiter: 'semi',
          requireLast: true,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false,
        },
      }],
      'object-curly-spacing': ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
    },
  },
  {
    files: ['**/*.vue'],
    plugins: {
      vue: pluginVue,
      stylistic,
    },
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: typescriptParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      ...pluginVue.configs.recommended.rules,
      'semi': ['error'],
      'vue/html-indent': ['error', 2],
      'vue/max-attributes-per-line': ['error', {
        singleline: 4,
        multiline: {
          max: 1,
        },
      }],
      'vue/first-attribute-linebreak': ['error', {
        singleline: 'beside',
        multiline: 'beside',
      }],
      'vue/html-quotes': ['error', 'single'],
      'vue/script-indent': ['error', 2, { baseIndent: 1 }],
    },
  },
];
