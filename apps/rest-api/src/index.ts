import { dirname } from 'node:path';
import { createWriteStream, existsSync, WriteStream } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import {
  createServer,
  IncomingMessage,
  Server,
  ServerResponse,
} from 'node:http';

import {
  environments,
  registerUseCase,
  ValidationError,
  type Environment,
  type LoggerService,
  type RegisterUseCase,
} from '@dental/features';

import {
  envConfigSchema,
  parseSchemaZodService,
} from '@dental/implementations/zod';
import {
  createWinstonLoggerService,
  getWinstonLoggerServiceOptions,
} from '@dental/implementations/winston';
import { server as expressServer } from '@dental/implementations/express';
import { registerUseCaseParamsSchema } from '@dental/implementations/zod';
import { bcryptHashPasswordService } from '@dental/implementations/bcrypt';
import {
  createMongoConnection,
  mongoAddUserService,
  mongoGetUserByEmailService,
} from '@dental/implementations/mongo';

import {
  createMorganRequestLoggerService,
  getMorganLogsFormat,
} from '@dental/implementations/morgan';
import type { EnvConfig } from './config.type.js';

let server: Server<
  typeof IncomingMessage,
  typeof ServerResponse<InstanceType<typeof IncomingMessage>>
> | null = null;

process.on(
  'uncaughtException',
  exitHandler as NodeJS.UncaughtExceptionListener
);

process.on(
  'unhandledRejection',
  exitHandler as NodeJS.UncaughtExceptionListener
);

process.on('SIGTERM', sigtermHandler as NodeJS.SignalsListener);

const { data: config, error } = getEnvConfig();

if (config == null) {
  throw error ?? new ValidationError();
}

const { nodeEnv, port, mongoConnectionString, mongoDB } = config;

if (nodeEnv != null && nodeEnv === environments.dev) {
  console.table({
    env: nodeEnv,
    connectionsString: mongoConnectionString,
    db: mongoDB,
  });
}

const environment: Environment = nodeEnv as Environment;

const winstonLoggerService: LoggerService = createWinstonLoggerService({
  options: getWinstonLoggerServiceOptions(environment),
});

await createMongoConnection(`${mongoConnectionString}/${mongoDB}`);

const register: RegisterUseCase = registerUseCase({
  parseParamsSchema: parseSchemaZodService(registerUseCaseParamsSchema),
  getUserByEmail: mongoGetUserByEmailService(),
  hashPassword: bcryptHashPasswordService(),
  addUser: mongoAddUserService(),
  logger: winstonLoggerService,
});

const accessLogStream = await createWritableStream('logs/access.log');

server = createServer(
  expressServer({
    register,
    successRequestLogger: createMorganRequestLoggerService({
      format: getMorganLogsFormat(environment),
      options: {
        stream: accessLogStream,
        skip: (req, res) => res.statusCode >= 400,
      },
    }),
    errorRequestLogger: createMorganRequestLoggerService({
      format: getMorganLogsFormat(environment),
      options: {
        stream: accessLogStream,
        skip: (req, res) => res.statusCode < 400,
      },
    }),
    logger: winstonLoggerService,
  })
);

server.listen(port, () => {
  winstonLoggerService.log('info', `Server is listening on port ${port}.`);
});

function getEnvConfig() {
  const parseEnvConfig = parseSchemaZodService<EnvConfig>(envConfigSchema);

  return parseEnvConfig({
    nodeEnv: process.env.NODE_ENV,
    port: Number(process.env.PORT),
    mongoUsername: process.env.MONGO_USERNAME!,
    mongoPassword: process.env.MONGO_PASSWORD!,
    mongoConnectionString: process.env.MONGO_CONNECTION_STRING!,
    mongoDB: process.env.MONGO_DB!,
  });
}

function exitHandler(error: Error, origin: NodeJS.UncaughtExceptionOrigin) {
  winstonLoggerService.log('error', `${error?.message ?? origin}.`);
  if (server != null) {
    server.close(() => {
      winstonLoggerService.log('info', 'Server is closed.');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
}

function sigtermHandler(signal: NodeJS.Signals) {
  winstonLoggerService.log('error', `${signal}.`);
  if (server != null) {
    server.close(() => {
      winstonLoggerService.log('info', 'Server is closed.');
      process.exit(1);
    });
  }
}

async function createDirForFile(filePath: string): Promise<void> {
  if (!existsSync(dirname(filePath))) {
    await mkdir(dirname(filePath));
  }
}

async function createWritableStream(filePath: string): Promise<WriteStream> {
  await createDirForFile(filePath);
  return createWriteStream(filePath, { flags: 'a' });
}
