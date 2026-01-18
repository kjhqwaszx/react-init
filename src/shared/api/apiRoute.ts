import { ENV } from '@/shared/config/env';

export function apiEnvPath(path: string) {

  return `${ENV.API_BASE_URL}${path}`;
}
