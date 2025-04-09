import type { RegisterUseCase } from '@dental/features';
import type { ApiSuccessResponse } from '@dental/features/src/common/api-responste.type.js';
import type { RequestHandler, Request, Response } from 'express';

const registerUserHandler =
  ({ register }: { register: RegisterUseCase }): RequestHandler =>
  async (req: Request, res: Response<ApiSuccessResponse>) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    await register({ firstName, lastName, email, password, confirmPassword });
    res
      .status(201)
      .json({ success: true, message: 'Successfully registration.' });
  };

export { registerUserHandler };
