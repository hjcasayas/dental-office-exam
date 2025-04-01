import express, { type Response } from 'express';

const server = express();

server.get('/', (_req, res: Response) => {
  res.status(200).json({ message: 'express-app works' });
});

export { server };
