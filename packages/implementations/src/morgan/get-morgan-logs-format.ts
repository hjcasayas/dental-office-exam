import { environments, type Environment } from '@dental/features';

export function getMorganLogsFormat(environment: Environment): string {
  return `${environment === environments.prod ? ':remote-addr - ' : ''} :method :url :status :response-time ms :user-agent :date :error-message`;
}
