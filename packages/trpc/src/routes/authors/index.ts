import { createAuthorTRPCRoute } from './createAuthor';
import { deleteAuthorTRPCRoute } from './deleteAuthor';
import { getAuthorTRPCRoute } from './getAuthor';
import { getAuthorsByUserTRPCRoute } from './getAuthorsByUser';
import { updateAuthorTRPCRoute } from './updateAuthor';

const authorsRoutes = {
    getAuthor: getAuthorTRPCRoute,
    getAuthorsByUser: getAuthorsByUserTRPCRoute,
    createAuthor: createAuthorTRPCRoute,
    updateAuthor: updateAuthorTRPCRoute,
    deleteAuthor: deleteAuthorTRPCRoute,
};

export default authorsRoutes;
