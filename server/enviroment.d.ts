declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT?: string;
      DB_NAME: string;
      DB_PASSWORD: string;
      DB_USER: string;
    }
  }
}

export {};
