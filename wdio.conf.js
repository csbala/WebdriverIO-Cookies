const { join } = require("path");

exports.config = {
  services: ["chromedriver"],
  runner: "local",
  path: "/",
  specs: [join(__dirname, "./test/*.test.js")],
  maxInstances: 1,
  capabilities: [
    {
      browserName: "chrome",
      "goog:chromeOptions": {
        args: [],
      },
    },
  ],
  logLevel: "info",
  bail: 0,
  baseUrl: "https://trello.com",
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: ["chromedriver"],
  framework: "mocha",
  reporters: ["spec"],
  mochaOpts: {
    ui: "bdd",
    timeout: 60000,
  },
};
