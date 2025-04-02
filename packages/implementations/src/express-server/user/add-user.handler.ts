import type { RequestHandler, Request, Response } from 'express';

const addUserHandler = (): RequestHandler => (req: Request, res: Response) => {
  res.status(201).json({ message: 'addUserHandler works!' });
};

export { addUserHandler };
