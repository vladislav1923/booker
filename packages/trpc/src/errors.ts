import { TRPCError } from '@trpc/server';

export enum Errors {
    UserAlreadyExists,
    PasswordsDoNotMatch,
    UserNotFound,
    IncorrectEmailOrPassword,
}

export class BadRequestError extends TRPCError {
    public status: Errors;

    constructor(status: Errors, message?: string) {
        super({code: 'BAD_REQUEST', message});
        this.status = status;
    }
}
