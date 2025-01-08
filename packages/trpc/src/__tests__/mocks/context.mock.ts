import { PrismaClient } from '@prisma/client';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { Context } from '../../context';

export type MockContext = Context & {
    prisma: DeepMockProxy<PrismaClient>;
};

export const createMockContext = (): MockContext => {
    return {
        prisma: mockDeep<PrismaClient>(),
        log: (log: string) => log,
        signJWT: (userId: string) => userId,
        generatePasswordDigest: (password: string) => password,
        user: null,
        authorized: false,
    };
};
