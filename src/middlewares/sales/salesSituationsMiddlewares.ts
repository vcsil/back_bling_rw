/* eslint-disable no-plusplus */
import { Request, Response, NextFunction } from "express";
import { MyCustomError, badRequestError } from "../../utils/errorUtils";
import { getSaleSituationById } from "../../repositories/sales-repositories/salesRepositories";

export default async function validateSituationsSales(req: Request, _res: Response, next: NextFunction) {
    const { situationsSales } = req.query as unknown as { situationsSales: string[] };

    const existsSituations = await Promise.all(situationsSales.map(async (situation) => getSaleSituationById(Number(situation))));

    if (!existsSituations.every(Boolean)) throw new MyCustomError(badRequestError("Invalid sales situations"));

    return next();
}
