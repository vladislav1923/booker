import { Author } from '@prisma/client';
import { USER } from './users.fixture';

const AUTHOR: Author = {
    id: 'bulgakov',
    firstName: 'Михаил',
    lastName: 'Булгаков',
    userId: USER.id,
    createdAt: new Date(),
    updatedAt: new Date(),
};

export { AUTHOR };
