import { type RequestLoggerService } from '@dental/features';
import { IncomingMessage, type ServerResponse } from 'http';
import morgan, { type Options } from 'morgan';

export const createMorganRequestLogger =
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
        return res.locals?.errorMessage || '';
      }
    );
    return morgan(format, options)(req, res, callback);
  };
