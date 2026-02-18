const fs = require("fs");
const path = require("path");
const { createLogger, format, transports } = require("winston");
const { logLevel } = require("../config/env");

const logsDir = path.resolve(process.cwd(), "logs");

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const logger = createLogger({
  level: logLevel,
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.printf(({ timestamp, level, message }) => `${timestamp} [${level}] ${message}`)
  ),
  transports: [
    new transports.Console({ silent: process.env.SILENT_LOGS === "true" }),
    new transports.File({ filename: path.join(logsDir, "automation.log") })
  ]
});

module.exports = logger;
