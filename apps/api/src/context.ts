import * as trpcExpress from '@trpc/server/adapters/express';
import { prisma } from '@repo/database';
import { log } from '@repo/logger';
import { generatePasswordDigest, signJWT } from '@repo/auth';

export const createContext = ({
    req,
    res,
}: trpcExpress.CreateExpressContextOptions) => {
    return {
        req,
        res,
        prisma,
        log,
        generatePasswordDigest,
        signJWT,
        authorized: false,
        user: null,
    };
};
