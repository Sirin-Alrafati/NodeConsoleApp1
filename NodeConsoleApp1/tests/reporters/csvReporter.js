const fs = require("fs");
const path = require("path");

function csvEscape(value) {
  const raw = String(value ?? "");
  if (raw.includes(",") || raw.includes("\"") || raw.includes("\n")) {
    return `"${raw.replace(/"/g, "\"\"")}"`;
  }
  return raw;
}

class CsvReporter {
  constructor(globalConfig, options = {}) {
    this.outputPath = options.outputPath || "./reports/results.csv";
  }

  onRunComplete(contexts, results) {
    const lines = ["suite,test,status,durationMs,failureMessage"];

    results.testResults.forEach((suiteResult) => {
      const suiteName = path.basename(suiteResult.testFilePath);

      suiteResult.testResults.forEach((testResult) => {
        const row = [
          csvEscape(suiteName),
          csvEscape(testResult.fullName),
          csvEscape(testResult.status),
          csvEscape(testResult.duration ?? ""),
          csvEscape((testResult.failureMessages || []).join(" | "))
        ];
        lines.push(row.join(","));
      });
    });

    const absoluteOutputPath = path.resolve(process.cwd(), this.outputPath);
    fs.mkdirSync(path.dirname(absoluteOutputPath), { recursive: true });
    fs.writeFileSync(absoluteOutputPath, lines.join("\n"), "utf8");
  }
}

module.exports = CsvReporter;
