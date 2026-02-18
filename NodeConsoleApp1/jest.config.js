module.exports = {
  testEnvironment: "node",
  roots: ["<rootDir>/tests/specs"],
  setupFilesAfterEnv: ["<rootDir>/tests/setup/jest.setup.js"],
  testMatch: ["**/*.spec.js"],
  reporters: [
    "default",
    [
      "jest-html-reporters",
      {
        publicPath: "./reports/html",
        filename: "report.html",
        expand: true,
        pageTitle: "Fake Store API Automation Report"
      }
    ],
    ["<rootDir>/tests/reporters/csvReporter.js", { outputPath: "./reports/results.csv" }]
  ],
  collectCoverageFrom: [
    "src/**/*.js",
    "!src/**/index.js"
  ],
  coverageDirectory: "reports/coverage"
};
