/* eslint-disable */

const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')
const {
  addCucumberPreprocessorPlugin,
} = require('@badeball/cypress-cucumber-preprocessor')
const {
  createEsbuildPlugin,
} = require('@badeball/cypress-cucumber-preprocessor/esbuild')
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  env: {
    codeCoverage: {
      exclude: 'cypress/**/*.*',
    },
  },
  e2e: {
    async setupNodeEvents(on, config) {
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      })
      on('file:preprocessor', bundler)

      await addCucumberPreprocessorPlugin(on, config)

      return config
    },
    specPattern: [
      'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
      'cypress/e2e/**/*.feature',
    ],
    baseUrl: 'http://localhost:5173',
  },

  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config)

      return config
    },
    specPattern: 'cypress/component/**/*.{js,ts,jsx,tsx}',
  },
})
