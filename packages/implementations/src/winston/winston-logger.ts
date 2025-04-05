import { environments, type Environment } from '@dental/features';
import { createLogger, format, transports } from 'winston';

const winstonFormat = format.printf(({ level, message, stack, timestamp }) => {
  return `${timestamp}: ${level}: ${stack ?? message}`;
});

export const createWinstonLogger = ({
  environment,
}: {
  environment: Environment;
}) =>
  createLogger({
    level: environment === environments.prod ? 'info' : 'debug',
    format: format.combine(
      environment === environments.prod
        ? format.uncolorize()
        : format.colorize(),
      format.timestamp(),
      winstonFormat
    ),
    transports: [new transports.Console()],
  });
