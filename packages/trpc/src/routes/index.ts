import authorsRoutes from './authors';
import booksRoutes from './books';
import usersRoutes from './users';

const routes = {
    ...authorsRoutes,
    ...booksRoutes,
    ...usersRoutes,
};

export default routes;
