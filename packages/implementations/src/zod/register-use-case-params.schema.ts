import validator from 'validator';
import { z } from 'zod';

import { strongPasswordSchema } from './shemas/strong-password.schema.js';
import { emailSchema } from './shemas/email.schema.js';
import { nameSchema } from './shemas/name.schema.js';

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
