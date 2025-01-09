import { PrismaClient, User } from '@prisma/client';

export type Context = {
    res: {
        cookie: (
            name: string,
            value: string,
            options: { expires: Date }
        ) => void;
        clearCookie: (name: string) => void;
    };
    req: unknown;
    prisma: PrismaClient;
    log: (log: string) => void;
    authorized: boolean;
    user: User | null;
    generatePasswordDigest: (password: string) => string;
    signJWT: (userId: string) => string;
};
