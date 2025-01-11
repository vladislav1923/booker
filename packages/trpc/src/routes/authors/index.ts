import { getAuthorTRPCRoute } from './getAuthor';
import { createAuthorTRPCRoute } from './createAuthor';
import { updateAuthorTRPCRoute } from './updateAuthor';
import { deleteAuthorTRPCRoute } from './deleteAuthor';
import { getAuthorsByUserIdTRPCRoute } from './getAuthorsByUserId';

const authorsRoutes = {
    getAuthor: getAuthorTRPCRoute,
    getAuthorsByUserId: getAuthorsByUserIdTRPCRoute,
    createAuthor: createAuthorTRPCRoute,
    updateAuthor: updateAuthorTRPCRoute,
    deleteAuthor: deleteAuthorTRPCRoute,
};

export default authorsRoutes;
