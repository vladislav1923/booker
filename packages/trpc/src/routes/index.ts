import authorsRoutes from './authors';
import usersRoutes from './users';

const routes = {
    ...authorsRoutes,
    ...usersRoutes,
};

export default routes;
