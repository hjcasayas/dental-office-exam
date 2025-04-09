import { z } from 'zod';

export const envConfigSchema = z.object({
  nodeEnv: z.string().optional(),
  port: z.number(),
  mongoUsername: z.string(),
  mongoPassword: z.string(),
  mongoConnectionString: z.string(),
  mongoDB: z.string(),
  jwtSecret: z.string(),
  jwtAccessExpirationInMinutes: z.number(),
});

export type EnvConfigSchemaOutput = z.infer<typeof envConfigSchema>;
