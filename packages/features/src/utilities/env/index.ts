export const environments = {
  stage: 'staging',
  prod: 'production',
  dev: 'development',
} as const;

export type Environment = (typeof environments)[keyof typeof environments];
