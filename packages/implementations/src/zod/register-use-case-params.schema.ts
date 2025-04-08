import { z } from 'zod';
import { nameSchema } from './shemas/name.schema.js';
import { strongPasswordSchema } from './shemas/strong-password.schema.js';
import { emailSchema } from './shemas/email.schema.js';
import validator from 'validator';

export const registerUseCaseParamsSchema = z
  .object({
    firstName: nameSchema(),
    lastName: nameSchema(),
    password: strongPasswordSchema(),
    email: emailSchema(),
    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    if (!validator.equals(data.password, data.confirmPassword)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['confirmPassword'],
        message: 'Password does not match',
      });
    }
  });
