import { z } from 'zod';

export const emailSchema = (message?: string) =>
  z.string().trim().toLowerCase().email(message);
