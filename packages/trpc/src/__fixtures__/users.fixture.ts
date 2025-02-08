import { User } from '@prisma/client';
import { cloneDeep, pick } from 'lodash';

const JWT_TOKEN = 'G4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ';

const PASSWORD = '$tr0ng_0ne_pa$$w0rd';

const WRONG_PASSWORD = 'Wr0nG_0ne_pa$$w0rd';

const PASSWORD_DIGEST =
    'dd712114fb283417de4da3512e17486adbda004060d0d1646508c8a2740d29b4';

const WRONG_PASSWORD_DIGEST =
    '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92';

const USER: User = {
    id: 'cm5me5qdw0000vld0ilpdh2uq',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@gmail.com',
    passwordDigest: PASSWORD_DIGEST,
    marketingAccept: true,
    createdAt: new Date(),
    updatedAt: new Date(),
};

const USER_RESPONSE = pick(
    cloneDeep(USER),
    'id',
    'firstName',
    'lastName',
    'email'
);

export {
    JWT_TOKEN,
    PASSWORD,
    PASSWORD_DIGEST,
    USER,
    USER_RESPONSE,
    WRONG_PASSWORD,
    WRONG_PASSWORD_DIGEST,
};
