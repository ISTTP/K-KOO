import { json, urlencoded } from 'body-parser';
import express, { type Express } from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';

export const createServer = (): Express => {
  const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
  };

  const app = express();
  app
    .disable('x-powered-by')
    .use(morgan('dev'))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors(corsOptions))
    .use(cookieParser())
    .options('*', cors(corsOptions))
    .get('/message/:name', (req, res) => {
      return res.json({ message: `hello ${req.params.name}` });
    })
    .get('/status', (_, res) => {
      return res.json({ ok: true });
    });

  return app;
};
