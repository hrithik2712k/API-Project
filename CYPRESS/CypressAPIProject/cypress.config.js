
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    specPattern: "cypress/Integration/Example/*.js"
  },
});

//C:\Users\DELL\Desktop\CypressAPIProject\cypress\videos\CreateRepo.js.mp4