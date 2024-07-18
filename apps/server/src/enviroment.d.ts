/* eslint-disable @typescript-eslint/naming-convention */
export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SERVER_PORT: number;
      CLIENT_URL: string;
      KAKAO_CLIENT_ID: string;
      KAKAO_REDIRECT_URI: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      GOOGLE_REDIRECT_URI: string;
      OPENAI_API_KEY: string;
    }
  }
}

export declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}
