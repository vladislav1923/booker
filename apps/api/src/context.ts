import * as trpcExpress from '@trpc/server/adapters/express';
import { prisma } from '@repo/database';
import { log } from '@repo/logger';

export const createContext = ({
    req,
    res,
}: trpcExpress.CreateExpressContextOptions) => {
    return {
        prisma,
        log,
        authorized: false,
        user: null,
    };
};
