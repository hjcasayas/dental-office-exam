export const tokens = { access: 'access', refresh: 'refresh' } as const;

export type Tokens = typeof tokens;
export type TokenKeys = keyof Tokens;
export type Token = Tokens[TokenKeys];
