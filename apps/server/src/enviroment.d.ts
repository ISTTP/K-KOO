export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string;
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
