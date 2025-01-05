import { PrismaClient } from '@prisma/client';

// @ts-ignore
export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
    // @ts-ignore
    global.prisma = prisma;
};

export * from '@prisma/client';
