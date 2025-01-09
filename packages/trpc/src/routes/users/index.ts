import { signUpTRPCRoute } from './signUp';
import { loginTRPCRoute } from './login';
import { getCurrentUserTRPCRoute } from './getCurrentUser';
import { logoutTRPCRoute } from './logout';

const userRoutes = {
    signUp: signUpTRPCRoute,
    login: loginTRPCRoute,
    logout: logoutTRPCRoute,
    getCurrentUser: getCurrentUserTRPCRoute,
};

export default userRoutes;
