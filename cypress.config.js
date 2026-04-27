const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  env: {
    dev: { 
      username: 'standard_user', 
      password: 'secret_sauce' 
    },

    staging: { username: 'stage_user', 
      password: 'stage_pass' 
    }
  },

  e2e: {
    baseUrl: "https://www.saucedemo.com/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});