import type { RequestHandler, Request, Response } from 'express';

const getUserByIdHandler =
  (): RequestHandler => (req: Request, res: Response) => {
    const { id } = req.params;
    console.log({ id });
    res.status(200).json({ message: 'getUserByIdHandler works!' });
  };

export { getUserByIdHandler };
