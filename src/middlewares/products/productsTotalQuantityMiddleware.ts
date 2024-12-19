/* eslint-disable no-plusplus */
import { Request, Response, NextFunction } from "express";
import { MyCustomError, badRequestError } from "../../utils/errorUtils";
import { getCategoryById } from "../../repositories/products-repositories/productsRepositories";

export default async function validateProductCategory(req: Request, _res: Response, next: NextFunction) {
    const { idCategory } = req.query as unknown as { idCategory?: string };

    if (idCategory) {
        const existsCategory = await getCategoryById(Number(idCategory));
        if (!existsCategory) throw new MyCustomError(badRequestError("Invalid category id"));
    }

    return next();
}
