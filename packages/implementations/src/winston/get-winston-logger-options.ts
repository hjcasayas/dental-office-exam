import { format, transports, type LoggerOptions } from 'winston';

import { environments, type Environment } from '@dental/features';

export function getWinstonLoggerServiceOptions(
  environment: Environment
): LoggerOptions {
  const winstonFormat = format.printf(
    ({ level, message, stack, timestamp }) => {
      return `${timestamp}: ${level}: ${stack ?? message}`;
    }
  );

  const transportsOptions: (
    | transports.FileTransportInstance
    | transports.ConsoleTransportInstance
  )[] = [
    new transports.File({
      dirname: 'logs',
      filename: 'error.log',
      level: 'error',
    }),
    new transports.File({ dirname: 'logs', filename: 'combined.log' }),
  ];

  if (environment === environments.dev) {
    transportsOptions.push(new transports.Console());
  }

  return {
    level: environment === environments.prod ? 'info' : 'debug',
    format: format.combine(
      environment === environments.prod
        ? format.uncolorize()
        : format.colorize(),
      format.timestamp(),
      winstonFormat
    ),
    transports: transportsOptions,
  };
}
