// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import stylistic from '@stylistic/eslint-plugin'
import pluginVue from 'eslint-plugin-vue'

export default withNuxt(
  {
    plugins: {
      stylistic,
      pluginVue,
    },
    rules: {
      'stylistic/indent': ['error', 2],
      'vue/html-indent': ['error', 2],
      "vue/max-attributes-per-line": ["error", {
        "singleline": {
          "max": 4
        },
        "multiline": {
          "max": 4
        }
      }],
      "vue/first-attribute-linebreak": ["error", {
        "singleline": "beside",
        "multiline": "beside"
      }]
    },
  }
)
