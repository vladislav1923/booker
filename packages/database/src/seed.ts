import type { Author, Book, Language, Status, User } from '@prisma/client';

import { prisma } from './client';

const DEFAULT_USERS = [
    {
        id: 'cm5qlh0f0000010wo5qmxafez',
        firstName: 'Vladislav',
        lastName: 'Kozak',
        email: '1923@bk.ru',
        passwordDigest:
            'dd712114fb283417de4da3512e17486adbda004060d0d1646508c8a2740d29b4', // 123451
        createdAt: new Date(),
        updatedAt: new Date(),
    },
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
const DEFAULT_STATUSES = [
    {
        id: 'planned',
        name: 'Planned',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 'in_progress',
        name: 'In Progress',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 'on_hold',
        name: 'On Hold',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 'completed',
        name: 'Completed',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
] as Array<Status>;
const DEFAULT_AUTHORS = [
    {
        id: 'bulgakov',
        firstName: 'Михаил',
        lastName: 'Булгаков',
        userId: 'cm5qlh0f0000010wo5qmxafez',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 'vonnegut',
        firstName: 'Kurt',
        lastName: 'Vonnegut',
        userId: 'cm5qlh0f0000010wo5qmxafez',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
] as Array<Author>;
const DEFAULT_BOOKS = [
    {
        id: 'master_and_margarita',
        title: 'Мастер и Маргарита',
        description:
            'Многослойный роман, в котором переплетаются несколько сюжетных линий, включая визит сатаны и его свиты в Москву 1930-х годов, трагическую историю любви Мастера и Маргариты, а также библейскую хронику событий, связанных с Понтием Пилатом. Роман исследует вопросы добра и зла, власти, человеческой свободы и духовного поиска, одновременно облекая эти темы в магический реализм и сатиру на советскую действительность. Через образы волшебства и мистики Булгаков задает вопросы о смысле жизни, справедливости и любви, предлагая читателю разгадывать многозначные символы и философские аллюзии.',
        authorId: 'bulgakov',
        languageId: 'ru',
        statusId: 'completed',
        userId: 'cm5qlh0f0000010wo5qmxafez',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 'slaughterhouse_five',
        // prettier-ignore
        title: 'Slaughterhouse-Five, or, The Children\'s Crusade',
        description:
            'science fiction-infused anti-war novel that follows the life of Billy Pilgrim, an optometrist and soldier, who becomes "unstuck in time." Through a series of fragmented, non-linear events, Billy experiences moments from his life, including his time as a prisoner of war during the bombing of Dresden in World War II, his abduction by extraterrestrial Tralfamadorians, and his reflections on life, death, and fate. The novel explores the absurdity of war, the inevitability of death, and the idea of free will, using dark humor and a unique narrative structure to critique the horrors of violence and the human tendency to disassociate from the trauma it causes. Its famous refrain, "so it goes," reflects the novel\'s fatalistic view of life and death, highlighting the randomness and inevitability of suffering and loss.',
        authorId: 'vonnegut',
        languageId: 'en',
        statusId: 'in_progress',
        userId: 'cm5qlh0f0000010wo5qmxafez',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
] as Array<Book>;

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
        await Promise.all(
            DEFAULT_STATUSES.map((status) =>
                prisma.status.upsert({
                    where: {
                        id: status.id!,
                    },
                    update: {
                        ...status,
                    },
                    create: {
                        ...status,
                    },
                })
            )
        );
        await Promise.all(
            DEFAULT_AUTHORS.map((author) =>
                prisma.author.upsert({
                    where: {
                        id: author.id!,
                    },
                    update: {
                        ...author,
                    },
                    create: {
                        ...author,
                    },
                })
            )
        );
        await Promise.all(
            DEFAULT_BOOKS.map((book) =>
                prisma.book.upsert({
                    where: {
                        id: book.id!,
                    },
                    update: {
                        ...book,
                    },
                    create: {
                        ...book,
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
