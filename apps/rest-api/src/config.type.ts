export interface EnvConfig {
  mongoConnectionString: string;
  mongoPassword: string;
  mongoUsername: string;
  nodeEnv?: string;
  mongoDB: string;
  port: number;
  jwtAccessExpirationInMinutes: number;
  jwtRefreshExpirationInDays: number;
  jwtSecret: string;
}
