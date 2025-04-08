import { IncomingMessage, type ServerResponse } from 'node:http';

import morgan, { type Options } from 'morgan';

import { type RequestLoggerService } from '@dental/features';

export const createMorganRequestLoggerService =
  ({
    format,
    options,
  }: {
    format: string;
    options?: Options<IncomingMessage, ServerResponse>;
  }): RequestLoggerService =>
  (req, res, callback) => {
    morgan.token(
      'error-message',
      (req, res: { locals?: { errorMessage: string } } & ServerResponse) => {
        return res.locals?.errorMessage;
      }
    );
    return morgan(format, options)(req, res, callback);
  };
