import express, { type Response, type Request } from 'express';

import { NotFoundError, type RegisterUseCase } from '@/features';

import { registerUserHandler } from './user/register-user.handler.js';
import { getUserByIdHandler } from './user/get-user-by-id.handler.js';
import { getAllUsersHandler } from './user/get-all-users.handler.js';
import { addUserHandler } from './user/add-user.handler.js';
import { errorhandler } from './error/error.handler.js';

interface Dependencies {
  register: RegisterUseCase;
}

const server = ({ register }: Dependencies) => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded());

  app.get('/', (_req: Request, res: Response) => {
    res.status(200).json({ message: 'express-app works' });
  });

  // User Routes
  app.get('/api/v1/users', getAllUsersHandler());
  app.get('/api/v1/users/:id', getUserByIdHandler());
  app.post('/api/v1/users', addUserHandler());

  // Register Routes
  app.post('/api/v1/register', registerUserHandler({ register }));

  app.use(() => {
    throw new NotFoundError();
  });

  // Error Handler
  app.use(errorhandler());

  return app;
};

export { server };
