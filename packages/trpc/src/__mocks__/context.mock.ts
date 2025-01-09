import { PrismaClient } from '@prisma/client';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { Context } from '../context';
import { JWT_TOKEN, PASSWORD_DIGEST } from '../__fixtures__/users.fixture';

type CookieFunction = (
    name: string,
    value: string,
    options: { expires: Date }
) => void;

type ClearCookieFunction = (name: string) => void;

export type MockContext = Context & {
    prisma: DeepMockProxy<PrismaClient>;
    res: DeepMockProxy<{
        cookie: DeepMockProxy<CookieFunction>;
        clearCookie: DeepMockProxy<ClearCookieFunction>;
    }>;
};

export const createMockContext = (): MockContext => {
    return {
        res: mockDeep<{
            cookie: CookieFunction;
            clearCookie: ClearCookieFunction;
        }>(),
        req: {},
        prisma: mockDeep<PrismaClient>(),
        log: (log: string) => log,
        signJWT: () => JWT_TOKEN,
        generatePasswordDigest: () => PASSWORD_DIGEST,
        user: null,
        authorized: false,
    };
};
