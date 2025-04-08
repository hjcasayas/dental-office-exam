export const environments = {
  stage: 'staging',
  prod: 'production',
  dev: 'development',
} as const;

export type Environments = typeof environments;

export type EnvironmentKeys = keyof Environments;

export type Environment = Environments[EnvironmentKeys];
