import { Passport } from 'passport';
import { NextFunction, Request, Response } from 'express';
import { Strategy as JWTStrategy } from 'passport-jwt';
import { prisma } from '@repo/database';
import { tokenExtractor } from '../utlis/authorization';

const passport = new Passport();

passport.use(
    new JWTStrategy(
        {
            jwtFromRequest: tokenExtractor,
            secretOrKey: process.env.SECRET_KEY as string,
        },
        async (payload: { userId: string }, done) => {
            try {
                const user = await prisma.user.findUnique({
                    where: { id: payload.userId },
                });

                if (!user) {
                    return done(null, false);
                }

                return done(null, user);
            } catch (e) {
                return done(e, false);
            }
        }
    )
);

passport.initialize();

export default (req: Request, res: Response, next: NextFunction) => {
    const token = tokenExtractor(req);

    if (!token) {
        return next();
    }

    passport.authenticate('jwt', { session: false })(req, res, next);
};
