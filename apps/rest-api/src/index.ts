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
  type RegisterUseCase,
} from '@dental/features';
import {
  envConfigSchema,
  parseSchemaZodService,
} from '@dental/implementations/zod';

import {
  loggerServiceImpl as winstonLoggerService,
  createWinstonLogger,
} from '@dental/implementations/winston';

import { server as expressServer } from '@dental/implementations/express';

import { registerUseCaseParamsSchema } from '@dental/implementations/zod';
import { bcryptHashPasswordService } from '@dental/implementations/bcrypt';

import type { EnvConfig } from './config.type.js';
import {
  inMemoryGetUserByEmailService,
  inMemoryDB,
  inMemoryAddUserService,
} from '@dental/implementations/in-memory';
import {
  createMorganRequestLogger,
  getMorganLogsFormat,
} from '@dental/implementations/morgan';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createWriteStream, existsSync, WriteStream } from 'node:fs';
import { mkdir } from 'node:fs/promises';

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

const { nodeEnv, port } = config;

if (nodeEnv != null && nodeEnv === environments.dev) {
  console.table({
    env: process.env.NODE_ENV,
    connectionsString: process.env.MONGO_CONNECTION_STRING,
    db: process.env.MONGO_DB,
  });
}

const environment: Environment = nodeEnv as Environment;

const log = winstonLoggerService(
  createWinstonLogger({
    environment,
  })
);

const register: RegisterUseCase = registerUseCase({
  parseParamsSchema: parseSchemaZodService(registerUseCaseParamsSchema),
  getUserByEmail: inMemoryGetUserByEmailService(inMemoryDB),
  hashPassword: bcryptHashPasswordService(),
  addUser: inMemoryAddUserService(inMemoryDB),
  log,
});

const successStream = await createWritableStream('success.log');
const errorStream = await createWritableStream('error.log');

server = createServer(
  expressServer({
    register,
    successRequestLogger: createMorganRequestLogger({
      format: getMorganLogsFormat(environment),
      options: {
        stream: successStream,
        skip: (req, res) => res.statusCode >= 400,
      },
    }),
    errorRequestLogger: createMorganRequestLogger({
      format: getMorganLogsFormat(environment),
      options: {
        stream: errorStream,
        skip: (req, res) => res.statusCode < 400,
      },
    }),
  })
);

server.listen(port, () => {
  log('info', `Server is listening on port ${port}`);
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
  log('error', error?.message ?? origin);
  if (server != null) {
    server.close(() => {
      log('info', 'Server is closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
}

function sigtermHandler(signal: NodeJS.Signals) {
  log('error', signal);
  if (server != null) {
    server.close(() => {
      log('info', 'Server is closed');
      process.exit(1);
    });
  }
}

async function createDirForFile(filePath: string): Promise<void> {
  if (!existsSync(dirname(filePath))) {
    await mkdir(dirname(filePath));
  }
}

function createLogPath(fileName: string): string {
  return path.resolve(
    fileURLToPath(import.meta.url),
    '../../',
    `logs/${fileName}`
  );
}

async function createWritableStream(fileName: string): Promise<WriteStream> {
  const filePath = createLogPath(fileName);
  await createDirForFile(filePath);
  return createWriteStream(filePath, { flags: 'a' });
}
