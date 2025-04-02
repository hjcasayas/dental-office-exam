export const userRoles = {
  admin: 'admin',
  dentist: 'dentist',
  patient: 'patient',
} as const;

export type UserRole = keyof typeof userRoles;
