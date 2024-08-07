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
      EMAILJS_PUBLIC_KEY: string;
      EMAILJS_SERVICE_ID: string;
      EMAILJS_TEMPLATE_ID: string;
      EMAILJS_PRIVATE_KEY: string;
      EMAILJS_PWD_TEMPLATE_ID: string;
      PASSWORD_SALT: string;
      ENVIRONMENT: 'development' | 'production';
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
