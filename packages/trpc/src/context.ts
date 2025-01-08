import { PrismaClient, User } from '@prisma/client';

export type Context = {
    prisma: PrismaClient;
    log: (str: string) => void;
    authorized: boolean;
    user: User | null;
};
