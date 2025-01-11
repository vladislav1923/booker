import { getCurrentUserTRPCRoute } from './getCurrentUser';
import { loginTRPCRoute } from './login';
import { logoutTRPCRoute } from './logout';
import { signUpTRPCRoute } from './signUp';

const userRoutes = {
    signUp: signUpTRPCRoute,
    login: loginTRPCRoute,
    logout: logoutTRPCRoute,
    getCurrentUser: getCurrentUserTRPCRoute,
};

export default userRoutes;
