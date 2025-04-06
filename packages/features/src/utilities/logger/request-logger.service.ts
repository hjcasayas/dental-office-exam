import type { IncomingMessage, ServerResponse } from 'node:http';

export interface RequestLoggerServiceParams {
  req: IncomingMessage;
  res: ServerResponse;
}
export type RequestLoggerService = (
  req: IncomingMessage,
  res: ServerResponse,
  callback: (err?: Error) => void
) => void;
