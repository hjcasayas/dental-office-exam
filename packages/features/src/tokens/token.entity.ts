import type { Token } from './tokens.js';

export interface TokenEntity {
  issuedAt: number;
  userId: string;
  expires: Date;
  token: string;
  type: Token;
  blacklisted?: boolean;
}
