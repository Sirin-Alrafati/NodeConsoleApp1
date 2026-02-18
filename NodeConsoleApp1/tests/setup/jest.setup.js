const fs = require("fs");
const path = require("path");

jest.setTimeout(30000);

beforeAll(() => {
  const reportsDir = path.resolve(process.cwd(), "reports");
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }
});
