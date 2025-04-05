import {
  createServer,
  IncomingMessage,
  Server,
  ServerResponse,
} from 'node:http';
import { ValidationError } from '@dental/features';
import {
  envConfigSchema,
  parseSchemaZodService,
} from '@dental/implementations/zod';

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

const { nodeEnv, port } = config;

if (nodeEnv != null && nodeEnv === 'development') {
  console.table({
    env: process.env.NODE_ENV,
    connectionsString: process.env.MONGO_CONNECTION_STRING,
    db: process.env.MONGO_DB,
  });
}

server = createServer();

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
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
  console.table({ error, origin });
  if (server != null) {
    server.close(() => {
      console.log('Server is closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
}

function sigtermHandler(signal: NodeJS.Signals) {
  console.log(signal);
  if (server != null) {
    server.close(() => {
      console.log('Server is closed');
      process.exit(1);
    });
  }
}
