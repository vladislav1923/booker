import { prisma } from './client';

import type { User } from '@prisma/client';

const DEFAULT_USERS = [
    {
        id: '1',
        first_name: 'Konstantin',
        last_name: 'Voznesenskiy',
        email: 'kon.voz@yandex.com',
        password_digest: 'password',
    },
] as Array<Partial<User>>;

(async () => {
    try {
        await Promise.all(
            DEFAULT_USERS.map((user) =>
                prisma.user.upsert({
                    where: {
                        email: user.email!,
                    },
                    update: {
                        ...user,
                    },
                    create: {
                        ...user,
                    },
                })
            )
        );
    } catch (error) {
        console.error(error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
})();
