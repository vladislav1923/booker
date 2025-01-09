import { json, urlencoded } from 'body-parser';
import express, { type Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { trpcRouter } from '@repo/trpc';
import passport from './middlewares/passport';
import * as trpcExpress from '@trpc/server/adapters/express';
import { renderTrpcPanel } from 'trpc-panel';
import { createContext } from './context';

export const createServer = (): Express => {
    const app = express();
    app.disable('x-powered-by')
        .use(morgan('dev'))
        .use(urlencoded({ extended: true }))
        .use(json())
        .use(cookieParser())
        .use(cors())
        .use(passport)
        .get('/status', (_, res) => {
            return res.json({ ok: true });
        })
        .use(
            '/trpc',
            trpcExpress.createExpressMiddleware({
                router: trpcRouter,
                createContext,
            })
        )
        .use('/panel', (_, res) => {
            return res.send(
                renderTrpcPanel(trpcRouter, {
                    url: 'http://localhost:3001/trpc',
                })
            );
        });

    return app;
};
