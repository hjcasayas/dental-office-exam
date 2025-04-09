import type { GenerateAuthTokenService, Token } from '@dental/features';
import jwt from 'jsonwebtoken';

export function jwtGenerate(
  secret: string,
  extraPayloads: { issuedAt: number; expirationDate: Date; tokenType: Token }
): GenerateAuthTokenService {
  return ({ userId }) => {
    const token = jwt.sign({ subject: { userId, ...extraPayloads } }, secret);
    return { token };
  };
}
