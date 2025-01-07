import crypto from 'crypto';

const generatePasswordDigest = (password: string) => {
    return crypto.createHash('sha256').update(password).digest('hex');
}

export { generatePasswordDigest };
