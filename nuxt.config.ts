// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    'vuetify-nuxt-module'
  ],
  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: {
      /* vuetify options */
    }
  },
  app: {
    head: {
      title: 'SystemSE ~ Calculadora de intervalos de confianza',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1'
    }
  },
  build: {
    transpile: ['js-stats']
  }
})
