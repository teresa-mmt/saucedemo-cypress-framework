const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  reporter: "cypress-multi-reporters",

  reporterOptions: {
    reporterEnabled: "cypress-qase-reporter",

    cypressQaseReporterReporterOptions: {
      mode: "testops",
      debug: true,

      testops: {
        api: {
          token: "3cd620d89cc4d9ad36eeae559ab4deacda35603140fc58a65f2ac1eceb433185"
        },
        project: "SD",
        uploadAttachments: true,
        run: {
          complete: true
        },
        batch: {
          size: 1
        }
      },

      framework: {
        cypress: {
          screenshotsFolder: "cypress/screenshots"
        }
      }
    }
  },

  env: {
    dev: {
      username: "standard_user",
      password: "secret_sauce"
    },
    staging: {
      username: "stage_user",
      password: "stage_pass"
    }
  },

  video: false,

  e2e: {
    baseUrl: "https://www.saucedemo.com/",

    setupNodeEvents(on, config) {
      require("cypress-qase-reporter/plugin")(on, config);
      require("cypress-qase-reporter/metadata")(on);

      return config;
    }
  }
});