import { TRPCError } from '@trpc/server';

export enum Errors {
    UserAlreadyExists,
    PasswordsDoNotMatch,
    IncorrectEmailOrPassword,
    NotAuthorized,
    NotFound,
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

export class NotFoundError extends TRPCError {
    public status: Errors;

    constructor(status: Errors, message?: string) {
        super({ code: 'NOT_FOUND', message });
        this.status = status;
    }
}
