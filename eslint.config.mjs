// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';
import stylistic from '@stylistic/eslint-plugin';
import pluginVue from 'eslint-plugin-vue';

export default withNuxt(
  {
    plugins: {
      stylistic,
      pluginVue,
    },
    rules: {
      'stylistic/indent': ['error', 2],
      'vue/html-indent': ['error', 2],
      'vue/max-attributes-per-line': ['error', {
        'singleline': 4,
        'multiline': {
          'max': 1,
        },
      }],
      'vue/first-attribute-linebreak': ['error', {
        'singleline': 'beside',
        'multiline': 'beside',
      }],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
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
      // Semis in objects
      'object-curly-spacing': ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
    },
  },
);
