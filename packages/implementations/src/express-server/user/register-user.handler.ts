import type { RegisterUseCase } from '@dental/features';
import type { RequestHandler, Request, Response } from 'express';

const registerUserHandler =
  ({ registerUseCase }: { registerUseCase: RegisterUseCase }): RequestHandler =>
  async (req: Request, res: Response) => {
    const { firstName, lastName, email } = req.body;
    await registerUseCase({ firstName, lastName, email });
    res.status(201).json({ message: 'Successfully Created User' });
  };

export { registerUserHandler };
