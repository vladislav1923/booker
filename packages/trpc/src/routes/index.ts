import usersRoutes from './users';
import authorsRoutes from './authors';

const routes = {
    ...authorsRoutes,
    ...usersRoutes,
};

export default routes;
