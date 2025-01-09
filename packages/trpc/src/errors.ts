import { TRPCError } from '@trpc/server';

export enum Errors {
    UserAlreadyExists,
    PasswordsDoNotMatch,
    UserNotFound,
    IncorrectEmailOrPassword,
    NotAuthorized,
}

export class BadRequestError extends TRPCError {
    public status: Errors;

    constructor(status: Errors, message?: string) {
        super({ code: 'BAD_REQUEST', message });
        this.status = status;
    }
}

export class ForbiddenError extends TRPCError {
    public status: Errors;

    constructor(status: Errors, message?: string) {
        super({ code: 'FORBIDDEN', message });
        this.status = status;
    }
}
