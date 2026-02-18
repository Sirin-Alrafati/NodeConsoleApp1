const dotenv = require("dotenv");

dotenv.config({ quiet: true });

module.exports = {
  baseUrl: process.env.BASE_URL || "https://fakestoreapi.com",
  timeoutMs: Number(process.env.REQUEST_TIMEOUT_MS || 15000),
  logLevel: process.env.LOG_LEVEL || "info"
};
