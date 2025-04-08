import { z } from 'zod';

export const strongPasswordSchema = (message?: string) =>
  z.string().refine((password) => {
    return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
      password
    );
  }, message ?? 'Password must have a minimum 8 characters in length, at least one uppercase English letter, at least one lowercase English letter, at least one digit and at least one special character');
