import { Status } from '@prisma/client';

const IN_PROGRESS_STATUS: Status = {
    id: 'in_progress',
    name: 'In Progress',
    createdAt: new Date(),
    updatedAt: new Date(),
};

export { IN_PROGRESS_STATUS };
