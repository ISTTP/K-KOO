/* eslint-disable @typescript-eslint/naming-convention */
export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SERVER_URL: string;
      FIREBASE_VAPID_KEY: string;
      API_KEY: string;
      AUTH_DOMAIN: string;
      PROJECT_ID: string;
      STORAGE_BUCKET: string;
      MESSAGING_SENDER_ID: string;
      APP_ID: string;
      MEASUREMENT_ID: string;
    }
  }
}
