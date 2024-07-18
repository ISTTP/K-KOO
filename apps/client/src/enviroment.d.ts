/* eslint-disable @typescript-eslint/naming-convention */
export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SERVER_URL: string;
      KAKAO_JAVASCRIPT_KEY: string;
    }
  }
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Kakao: any;
  }
}
