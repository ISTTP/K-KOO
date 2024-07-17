/* eslint-disable @typescript-eslint/naming-convention */
export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SERVER_URL: string;
    }
  }
}
