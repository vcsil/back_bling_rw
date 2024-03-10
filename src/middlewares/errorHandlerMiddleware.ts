import { NextFunction, Request, Response } from "express";
import { errorTypeToStatusCode, MyCustomError } from "../utils/errorUtils";

export default function errorHandlerMiddleware(err: MyCustomError | Error, _req: Request, res: Response, _next: NextFunction) {
    if (err instanceof MyCustomError) {
        const statusCode = errorTypeToStatusCode(err.type);
        return res.status(statusCode).json({ error: err.message, type: err.type });
    }

    return res.status(500).json({ error: "Erro interno do servidor" });
}
