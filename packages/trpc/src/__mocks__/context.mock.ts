import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

import { JWT_TOKEN, PASSWORD_DIGEST } from '../__fixtures__/users.fixture';
import { Context } from '../context';

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
