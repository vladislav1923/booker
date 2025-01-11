import { prisma, User } from '@repo/database';
import { log } from '@repo/logger';
import * as trpcExpress from '@trpc/server/adapters/express';

import { generatePasswordDigest, signJWT } from './utlis/authorization';

type ExtendedRequest = trpcExpress.CreateExpressContextOptions['req'] & {
    user: User | undefined;
};

export const createContext = ({
    req,
    res,
}: trpcExpress.CreateExpressContextOptions) => {
    const user = (req as ExtendedRequest).user;

    return {
        req,
        res,
        prisma,
        log,
        generatePasswordDigest,
        signJWT,
        authorized: user !== undefined,
        user: user ?? null,
    };
};

export type Context = ReturnType<typeof createContext>;
