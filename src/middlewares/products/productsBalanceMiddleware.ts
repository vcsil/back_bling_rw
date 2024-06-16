import { NextFunction, Request, Response } from "express";
import { getDepositById } from "../../repositories/deposits-repositories/depositsRepositorie";
import { MyCustomError, notFoundError } from "../../utils/errorUtils";
import { getProductByCode } from "../../repositories/products-repositories/productsRepositories";

async function validateIdDeposit(idDeposit: number) {
    return getDepositById(idDeposit);
}

async function validateCodeProduct(codeProduct: string) {
    return getProductByCode(codeProduct);
}

export default async function validateProductsBalance(req: Request, _res: Response, next: NextFunction) {
    const { idDeposit, codeProduct } = req.params;

    const deposit = await validateIdDeposit(Number(idDeposit));
    if (!deposit) throw new MyCustomError(notFoundError("Invalid deposit id"));

    const product = await validateCodeProduct(codeProduct);
    if (!product) throw new MyCustomError(notFoundError("Invalid product code"));

    return next();
}
