import validator from 'validator';
import { z } from 'zod';

export const nameSchema = (message?: string) =>
  z
    .string()
    .trim()
    .refine((name) => {
      return validator.isAlpha(name, 'en-US', { ignore: ' -' });
    }, message);
