import express, { type Response, type Request } from 'express';

import {
  NotFoundError,
  type LoggerService,
  type LoginUseCase,
  type RegisterUseCase,
  type RequestLoggerService,
} from '@dental/features';

import { registerUserHandler } from './user/register-user.handler.js';
import { getUserByIdHandler } from './user/get-user-by-id.handler.js';
import { getAllUsersHandler } from './user/get-all-users.handler.js';
import { addUserHandler } from './user/add-user.handler.js';
import { errorhandler } from './error/error.handler.js';
import { loginUserHandler } from './user/login-user.handler.js';

interface Dependencies {
  register: RegisterUseCase;
  successRequestLogger: RequestLoggerService;
  errorRequestLogger: RequestLoggerService;
  logger: LoggerService;
  login: LoginUseCase;
}

const server = ({
  register,
  successRequestLogger,
  errorRequestLogger,
  logger,
  login,
}: Dependencies) => {
  const app = express();

  app.use(successRequestLogger);
  app.use(errorRequestLogger);
  app.use(express.json());
  app.use(express.urlencoded());

  app.get('/', (_req: Request, res: Response) => {
    res.status(200).json({ message: 'express-app works' });
  });

  // Register Routes
  app.post('/api/v1/register', registerUserHandler({ register }));

  // Login Routes
  app.post('/api/v1/login', loginUserHandler({ login }));

  // User Routes
  app.get('/api/v1/users', getAllUsersHandler());
  app.get('/api/v1/users/:id', getUserByIdHandler());
  app.post('/api/v1/users', addUserHandler());

  app.use(() => {
    throw new NotFoundError([{ message: 'Route not supported' }]);
  });

  // Error Handler
  app.use(errorhandler({ logger }));

  return app;
};

export { server };
