/* eslint-disable no-plusplus */
import { Request, Response, NextFunction } from "express";
import { MyCustomError, badRequestError } from "../../utils/errorUtils";
import { getCategoryById } from "../../repositories/products-repositories/productsRepositories";
import { getDepositById } from "../../repositories/deposits-repositories/depositsRepositorie";

export default async function validateProductDeposityANDCategory(req: Request, _res: Response, next: NextFunction) {
    const { idDeposit, idCategory } = req.params as unknown as { idDeposit: string; idCategory?: string };

    const existsDeposits = await getDepositById(Number(idDeposit));
    if (!existsDeposits) throw new MyCustomError(badRequestError("Invalid deposity id"));

    if (idCategory) {
        const existsCategory = await getCategoryById(Number(idCategory));
        if (!existsCategory) throw new MyCustomError(badRequestError("Invalid category id"));
    }

    return next();
}
