const { defineConfig } = require('cypress')
const { configureAllureAdapterPlugins } = require('@mmisty/cypress-allure-adapter/plugins')




module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      configureAllureAdapterPlugins(on, config)
      return config
    },
    env: {
      allure: true,
      allureResultsPath: 'allure-results',
      allureReportLanguage: 'pt-BR'
    },
    baseUrl: process.env.CYPRESS_BASE_URL || 'https://amei-homolog.amorsaude.com.br',
    failOnStatusCode: false,
    video: false,
  },
})