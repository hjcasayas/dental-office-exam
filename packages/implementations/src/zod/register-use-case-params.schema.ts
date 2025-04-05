import { z } from 'zod';

export const registerUseCaseParamsSchema = z
  .object({
    firstName: z.string().refine((firstName) => {
      return /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(firstName);
    }, 'Invalid first name.'),
    lastName: z.string().refine((lastName) => {
      return /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(lastName);
    }, 'Invalid last name.'),
    password: z.string().refine((password) => {
      return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
        password
      );
    }, 'Password must have a minimum 8 characters in length, at least one uppercase English letter, at least one lowercase English letter, at least one digit and at least one special character.'),
    email: z.string().email(),
    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['confirmPassword'],
        message: 'Password does not match.',
      });
    }
  });
