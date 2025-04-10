import type { Token, TokenEntity } from '@dental/features';
import dayjs from 'dayjs';

export type JwtPayload = Pick<
  TokenEntity,
  'expires' | 'blacklisted' | 'issuedAt' | 'type'
>;

export const createJwtPayload = ({
  tokenExpirationInMinutes,
  tokenType,
}: {
  tokenExpirationInMinutes: number;
  tokenType: Token;
}): JwtPayload => ({
  issuedAt: dayjs().unix(),
  expires: dayjs().add(tokenExpirationInMinutes, 'minutes').toDate(),
  blacklisted: false,
  type: tokenType,
});
