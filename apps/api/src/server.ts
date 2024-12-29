import { json, urlencoded } from 'body-parser';
import express, { type Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { trpcRouter } from './trpc';
import * as trpcExpress from '@trpc/server/adapters/express';

export const createServer = (): Express => {
  const app = express();
  app
    .disable('x-powered-by')
    .use(morgan('dev'))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    // .get('/message/:name', (req, res) => {
    //   return res.json({ message: `hello ${req.params.name}` });
    // })
    .get('/status', (_, res) => {
      return res.json({ ok: true });
    })
    .use('/trpc', trpcExpress.createExpressMiddleware({ router: trpcRouter }));

  return app;
};
