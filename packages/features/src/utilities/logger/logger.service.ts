import type { LogLevel } from './log.levels.js';

type LoggerService = { log: (level: LogLevel, message: string) => void };

export { type LoggerService };
