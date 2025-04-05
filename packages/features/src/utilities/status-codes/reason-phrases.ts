export type ReasonPhraseType = keyof typeof ReasonPhrases;

export const ReasonPhrases = {
  OK: 'OK',
  CREATED: 'Created',
  BAD_REQUEST: 'Bad Request',
  UNAUTHORIZED: 'Unauthorized',
  FORBIDDEN: 'Forbidden',
  NOT_FOUND: 'Not Found',
  TOO_MANY_REQUESTS: 'Too Many Requests',
  INTERNAL_SERVER_ERROR: 'Internal Server Error',
} as const;
