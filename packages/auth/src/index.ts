import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const generatePasswordDigest = (password: string): string => {
    return crypto.createHash('sha256').update(password).digest('hex');
};

const signJWT = (userId: string): string => {
    return jwt.sign({ userId }, 'some_string_to_sign_the_token');
}

export { generatePasswordDigest, signJWT };
