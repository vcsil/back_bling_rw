import { Request, Response } from "express";
import * as structureServices from "../services/products-services/productsServices";

async function productsBalance(req: Request, res: Response) {
    const { idDeposit, codeProduct } = req.params;

    const produtct = await structureServices.getProductsForBalance(Number(idDeposit), codeProduct);

    return res.send(produtct);
}

export { productsBalance };
