export enum AppErrorTypesEnum {
    BAD_REQUEST = "bad_request",
    UNAUTHORIZED = "unauthorized",
    FORBIDDEN = "forbidden",
    NOT_FOUND = "not_found",
    CONFLICT = "conflict",
    WRONG_SCHEMA = "wrong_schema",
    INTERNAL_SERVER_ERROR = "internal_server_error",
}

type AppErrorTypes = "conflict" | "not_found" | "unauthorized" | "wrong_schema" | "bad_request" | "forbidden" | "internal_server_error";

export interface AppError {
    type: AppErrorTypes;
    message: string;
}

// Create new error constructor with JavaScript class
export class MyCustomError extends Error {
    type: AppErrorTypes;

    constructor(public readonly objError: AppError) {
        super(objError.message);
        // Set your custom error name
        this.type = objError.type;
        this.message = objError.message;
    }
}

export function errorTypeToStatusCode(type: AppErrorTypes): number {
    switch (type) {
        case AppErrorTypesEnum.BAD_REQUEST:
            return 400;
        case AppErrorTypesEnum.UNAUTHORIZED:
            return 401;
        case AppErrorTypesEnum.FORBIDDEN:
            return 403;
        case AppErrorTypesEnum.NOT_FOUND:
            return 404;
        case AppErrorTypesEnum.CONFLICT:
            return 409;
        case AppErrorTypesEnum.WRONG_SCHEMA:
            return 422;
        case AppErrorTypesEnum.INTERNAL_SERVER_ERROR:
            return 500;
        default:
            return 500;
    }
}

function createAppError(type: AppErrorTypes, message?: string): AppError {
    return { type, message: message ?? "" };
}

export const badRequestError = (message?: string) => createAppError(AppErrorTypesEnum.BAD_REQUEST, message);
export const unauthorizedError = (message?: string) => createAppError(AppErrorTypesEnum.UNAUTHORIZED, message);
export const forbiddenError = (message?: string) => createAppError(AppErrorTypesEnum.FORBIDDEN, message);
export const notFoundError = (message?: string) => createAppError(AppErrorTypesEnum.NOT_FOUND, message);
export const conflictError = (message?: string) => createAppError(AppErrorTypesEnum.CONFLICT, message);
export const wrongSchemaError = (message?: string) => createAppError(AppErrorTypesEnum.WRONG_SCHEMA, message);
export const internalServerError = (message?: string) => createAppError(AppErrorTypesEnum.INTERNAL_SERVER_ERROR, message);
