import { createAuthorTRPCRoute } from './createAuthor';
import { deleteAuthorTRPCRoute } from './deleteAuthor';
import { getAuthorTRPCRoute } from './getAuthor';
import { getAuthorsByUserIdTRPCRoute } from './getAuthorsByUserId';
import { updateAuthorTRPCRoute } from './updateAuthor';

const authorsRoutes = {
    getAuthor: getAuthorTRPCRoute,
    getAuthorsByUserId: getAuthorsByUserIdTRPCRoute,
    createAuthor: createAuthorTRPCRoute,
    updateAuthor: updateAuthorTRPCRoute,
    deleteAuthor: deleteAuthorTRPCRoute,
};

export default authorsRoutes;
