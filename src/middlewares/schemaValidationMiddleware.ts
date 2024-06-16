import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { MyCustomError, wrongSchemaError } from "../utils/errorUtils";

type ReqHTTPTypes = "headers" | "body" | "query" | "params";

type ParameterHeaderTypes = "x-api-key" | "authorization";

export default function validateSchema(schema: ObjectSchema, reqHTTP: ReqHTTPTypes, parameterHeader?: ParameterHeaderTypes) {
    return async (req: Request, _res: Response, next: NextFunction) => {
        let objectHTTP;

        if (parameterHeader) {
            objectHTTP = req[reqHTTP][parameterHeader || ""];
        } else {
            objectHTTP = req[reqHTTP];
        }

        const { error } = schema.validate(objectHTTP, { abortEarly: false });

        if (error) {
            const errorMessages = error.details.map((detail) => detail.message);
            throw new MyCustomError(wrongSchemaError(errorMessages.join(", ")));
        }

        next();
    };
}
