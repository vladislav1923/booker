import { PrismaClient } from '@prisma/client';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { Context } from '../context';
import { JWT_TOKEN, PASSWORD_DIGEST } from '../__fixtures__/users.fixture';

type CookieFunction = (
    name: string,
    value: string,
    options: { expires: Date }
) => {};

export type MockContext = Context & {
    prisma: DeepMockProxy<PrismaClient>;
    res: DeepMockProxy<{
        cookie: DeepMockProxy<CookieFunction>;
    }>;
};

export const createMockContext = (): MockContext => {
    return {
        res: mockDeep<{
            cookie: CookieFunction;
        }>(),
        req: {},
        prisma: mockDeep<PrismaClient>(),
        log: (log: string) => log,
        signJWT: (userId: string) => JWT_TOKEN,
        generatePasswordDigest: (password: string) => PASSWORD_DIGEST,
        user: null,
        authorized: false,
    };
};
