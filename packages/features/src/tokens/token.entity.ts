import type { Token } from './tokens.js';

export interface TokenEntity {
  token: string;
  userId: string;
  type: Token;
  expires: Date;
  blacklisted?: boolean;
}
