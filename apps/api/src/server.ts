import { json, urlencoded } from 'body-parser';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { trpcRouter } from '@repo/trpc';
import * as trpcExpress from '@trpc/server/adapters/express';

export const createServer = () => {
    const app = express();
    app.disable('x-powered-by')
        .use(morgan('dev'))
        .use(urlencoded({ extended: true }))
        .use(json())
        .use(cors())
        .get('/status', (_, res) => {
            return res.json({ ok: true });
        })
        .use(
            '/trpc',
            trpcExpress.createExpressMiddleware({ router: trpcRouter })
        );

    return app;
};
