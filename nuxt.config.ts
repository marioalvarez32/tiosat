// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['vuetify-nuxt-module', '@pinia/nuxt', '@nuxtjs/supabase'],
  css: ['@mdi/font/css/materialdesignicons.css'],
  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: './vuetify.config.ts' // <== you can omit it
  }, 
  runtimeConfig: {
    // Keys in here are ONLY available on the server-side.
    // Use this for secret keys like the Supabase service_role key.
    supabaseServiceKey: process.env.SUPABASE_SERVICE_KEY,

    // Keys in the 'public' object are exposed to the client-side.
    // Use this for public keys like the Supabase URL and anon key.
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
    }
  }
})