import type { LogLevel } from './log.levels.js';

type LoggerService = (level: LogLevel, message: string) => void;

export { type LoggerService };
