import type { RequestHandler, Request, Response } from 'express';

const getAllUsersHandler =
  (): RequestHandler => (req: Request, res: Response) => {
    res.status(200).json({ message: 'getAllUsersHandler works!' });
  };

export { getAllUsersHandler };
