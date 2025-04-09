import { compare } from 'bcrypt';

export function bcryptComparePasswordService() {
  return async ({
    password,
    hashedPassword,
  }: {
    password: string;
    hashedPassword: string;
  }): Promise<boolean> => {
    return await compare(password, hashedPassword);
  };
}
