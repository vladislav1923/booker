import { Book } from '@prisma/client';

import { AUTHOR } from './authors.fixture';
import { ENGLISH_LANGUAGE } from './languages.fixture';
import { IN_PROGRESS_STATUS } from './statuses.fixture';
import { USER } from './users.fixture';

const BOOK: Book = {
    id: 'slaughterhouse_five',
    // prettier-ignore
    title: 'Slaughterhouse-Five, or, The Children\'s Crusade',
    description:
        'Science fiction-infused anti-war novel that follows the life of Billy Pilgrim, an optometrist and soldier, who becomes "unstuck in time." Through a series of fragmented, non-linear events, Billy experiences moments from his life, including his time as a prisoner of war during the bombing of Dresden in World War II, his abduction by extraterrestrial Tralfamadorians, and his reflections on life, death, and fate. The novel explores the absurdity of war, the inevitability of death, and the idea of free will, using dark humor and a unique narrative structure to critique the horrors of violence and the human tendency to disassociate from the trauma it causes. Its famous refrain, "so it goes," reflects the novel\'s fatalistic view of life and death, highlighting the randomness and inevitability of suffering and loss.',
    authorId: AUTHOR.id,
    languageId: ENGLISH_LANGUAGE.id,
    statusId: IN_PROGRESS_STATUS.id,
    userId: USER.id,
    createdAt: new Date(),
    updatedAt: new Date(),
};

export { BOOK };
