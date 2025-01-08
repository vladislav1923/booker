import { PrismaClient, User } from '@prisma/client';

export type Context = {
    res: any;
    req: any;
    prisma: PrismaClient;
    log: (log: string) => void;
    authorized: boolean;
    user: User | null;
    generatePasswordDigest: (password: string) => string;
    signJWT: (userId: string) => string;
};
