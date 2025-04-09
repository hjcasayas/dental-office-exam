import type { Token } from '@dental/features';
import dayjs from 'dayjs';

export interface JwtExtraPayloads {
  issuedAt: number;
  expirationDate: number;
  tokenType: Token;
}

export const getJwtExtraPayloads = ({
  tokenExpirationInMinutes,
  tokenType,
}: {
  tokenExpirationInMinutes: number;
  tokenType: Token;
}): JwtExtraPayloads => ({
  issuedAt: dayjs().unix(),
  expirationDate: dayjs().add(tokenExpirationInMinutes, 'minutes').unix(),
  tokenType,
});
