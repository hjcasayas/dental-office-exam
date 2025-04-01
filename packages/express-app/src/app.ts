import express, { type Response } from 'express';

const app = express();

app.get('/', (_req, res: Response) => {
  res.status(200).json({ message: 'express-app works' });
});

export { app };
