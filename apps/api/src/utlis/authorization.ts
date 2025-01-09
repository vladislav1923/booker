import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { Request } from 'express';

const generatePasswordDigest = (password: string): string => {
    return crypto.createHash('sha256').update(password).digest('hex');
};

const signJWT = (userId: string): string => {
    return jwt.sign({ userId }, process.env.SECRET_KEY as string);
};

const tokenExtractor = (req: Request) => {
    if (req && req.cookies) {
        return req.cookies.token;
    }
    return null;
};

export { generatePasswordDigest, signJWT, tokenExtractor };
