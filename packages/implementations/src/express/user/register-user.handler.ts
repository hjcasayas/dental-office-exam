import type { RegisterUseCase } from '@dental/features';
import type { RequestHandler, Request, Response } from 'express';

const registerUserHandler =
  ({ register }: { register: RegisterUseCase }): RequestHandler =>
  async (req: Request, res: Response) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    await register({ firstName, lastName, email, password, confirmPassword });
    res.status(201).json({ message: 'Successfully Created User' });
  };

export { registerUserHandler };
