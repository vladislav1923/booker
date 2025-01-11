import { createBookTRPCRoute } from './createBook';
import { deleteBookTRPCRoute } from './deleteBook';
import { getBookTRPCRoute } from './getBook';
import { getBooksByUserTRPCRoute } from './getBooksByUser';
import { updateBookTRPCRoute } from './updateBook';

const booksRoutes = {
    createBook: createBookTRPCRoute,
    getBook: getBookTRPCRoute,
    getBooksByUser: getBooksByUserTRPCRoute,
    updateBook: updateBookTRPCRoute,
    deleteBook: deleteBookTRPCRoute,
};

export default booksRoutes;
