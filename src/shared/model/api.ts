import type { Method } from 'axios'

export interface Api {
  url: string;
  method: Method;
}

export interface ApiMutateOptions {
  api: Api;
  params?: object;
  data?: object;
  isApiRoute?: boolean;
}

export interface ApiQueryOptions {
  queryKey: string[];
  api: Api;
  params?: object;
  options?: object;
  isApiRoute?: boolean;
}
