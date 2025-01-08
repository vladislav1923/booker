import { signUpTRPCRoute } from './signUp';
import { loginTRPCRoute } from './login';

const userRoutes = {
    signUp: signUpTRPCRoute,
    login: loginTRPCRoute,
};

export default userRoutes;
