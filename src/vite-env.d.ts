interface ImportMetaEnv {
  readonly VITE_ENV: 'development' | 'production' | 'test';
  readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}