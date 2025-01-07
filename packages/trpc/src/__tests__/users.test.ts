import { describe, expect, it } from '@jest/globals';
import { prismaMock } from './mocks/prisma.mock';
import { trpcRouter } from '..';

describe('@repo/trpc -> users', () => {
    describe('Sign Up', () => {
        it('should create a new user', async () => {
            const input = {
                first_name: 'John',
                last_name: 'Doe',
                email: 'test@google.com',
                password: '12345678',
                confirm_password: '12345678',
            };
            const expectedPrismaResponse = {
                id: '1',
                first_name: 'John',
                last_name: 'Doe',
                email: 'test@google.com',
                password_digest: 'egi8o-yrpnm-4y8n4-8y4n8-4y8n4',
                created_at: new Date(),
                updated_at: new Date(),
            };
            const expectedResult = {
                user: expectedPrismaResponse,
            }

            prismaMock.user.create.mockResolvedValue(expectedPrismaResponse);

            const result = await trpcRouter.createCaller({}).signUp(input);

            expect(result).toEqual(expectedResult);
        });
    });
});
