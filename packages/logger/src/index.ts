import path from "path";
import winston from "winston";

const LOG_DIR = path.resolve(__dirname, "../../../logs");

const myFormat = winston.format.printf((info) => {
  return `[${info.timestamp}] ${info.level} : ${info.message}`;
});

const baseFormat = winston.format.combine(winston.format.timestamp(), myFormat);

export const logger = winston.createLogger({
  level: "info",
  format: baseFormat,
  transports: [
    new winston.transports.File({
      filename: path.join(LOG_DIR, "combined.log"),
      format: baseFormat,
    }),
    new winston.transports.File({
      filename: path.join(LOG_DIR, "error.log"),
      level: "error",
      format: baseFormat,
    }),
  ],
});

// Console in dev
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: baseFormat,
    })
  );
}

export default logger;
