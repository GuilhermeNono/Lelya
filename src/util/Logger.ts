import { createLogger, transports, format } from "winston";

const { printf, combine, timestamp, colorize, errors} = format;

const colorizer = colorize();

export const Logger = createLogger({
  transports: [new transports.Console({})],
  format: combine(
    errors({stack: true}),
    timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
    printf((info) => {
      return colorizer.colorize(
        info.level,
        `[${info.timestamp}]: ${info.message}`
      );
    })
  ),
});
