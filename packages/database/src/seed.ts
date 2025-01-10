import { prisma } from './client';

import type { User, Language } from '@prisma/client';

const DEFAULT_USERS = [
    {
        id: 'cm5qlh0f0000010wo5qmxafez',
        firstName: 'Vladislav',
        lastName: 'Kozak',
        email: '1923@bk.ru',
        passwordDigest: 'dd712114fb283417de4da3512e17486adbda004060d0d1646508c8a2740d29b4', // 123451
        createdAt: new Date(),
        updatedAt: new Date(),
    }
] as Array<User>;
const DEFAULT_LANGUAGES = [
    {
        id: 'en',
        name: 'English',
        emoji: '🇺🇸',
        primary: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 'ru',
        name: 'Русский',
        emoji: '🇷🇺',
        primary: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 'de',
        name: 'Deutsch',
        emoji: '🇩🇪',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 'fr',
        name: 'Français',
        emoji: '🇫🇷',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 'es',
        name: 'Español',
        emoji: '🇪🇸',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 'it',
        name: 'Italiano',
        emoji: '🇮🇹',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 'jp',
        name: '日本語',
        emoji: '🇯🇵',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
] as Array<Language>;

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
        await Promise.all(
            DEFAULT_LANGUAGES.map((language) =>
                prisma.language.upsert({
                    where: {
                        id: language.id!,
                    },
                    update: {
                        ...language,
                    },
                    create: {
                        ...language,
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
