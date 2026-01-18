/**
 * ❗ 환경변수는 이 파일에서만 직접 접근한다
 * 다른 곳에서는 ENV 객체만 사용
 */

const env = import.meta.env;

export const ENV = {
  MODE: env.MODE, // vite 기본값 (development | production)
  APP_ENV: env.VITE_ENV,
  API_BASE_URL: env.VITE_API_BASE_URL,

  isDev: env.MODE === 'development',
  isProd: env.MODE === 'production',
} as const;
