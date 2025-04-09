import type { RequestHandler, Request, Response } from 'express';
import { type LoginUseCase, type LoginUseCaseResult } from '@dental/features';
import type { ApiSuccessResponse } from '@dental/features';

const loginUserHandler =
  ({ login }: { login: LoginUseCase }): RequestHandler =>
  async (
    req: Request,
    res: Response<ApiSuccessResponse<LoginUseCaseResult>>
  ) => {
    const { email, password } = req.body;
    const data = await login({ email, password });
    res.status(201).json({ success: true, message: 'Sussessful login.', data });
  };

export { loginUserHandler };
