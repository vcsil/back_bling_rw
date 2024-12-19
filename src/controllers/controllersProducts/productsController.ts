import { Request, Response } from "express";
import * as productsServices from "../../services/products-services/productsServices";
import { OrderKeyT } from "../../types/productsType";

async function sendAllCategories(_req: Request, res: Response) {
    const categories = await productsServices.getCategories();

    return res.send(categories);
}

async function getProductsQuantityPerDepositAndCategory(req: Request, res: Response) {
    const { idDeposit, idCategory } = req.params;
    const { page, take } = req.query;
    const { order } = req.query as unknown as { order: OrderKeyT };

    const products = await productsServices.getProductsQuantityPerDepositAndCategory({
        idDeposit: Number(idDeposit),
        idCategory: Number(idCategory),
        page: Number(page),
        takeUnits: Number(take),
        order,
    });

    return res.send(products);
}

async function sendTotalProducts(req: Request, res: Response) {
    const { idCategory } = req.query;

    const countPrducts = await productsServices.getProductsTotalQuantity(Number(idCategory));

    return res.send({ total: countPrducts });
}

async function getProductsBySearch(req: Request, res: Response) {
    const { idDeposit, idCategory } = req.params;
    const { page, take, text } = req.query as { page: string; take: string; text: string };
    const { order } = req.query as unknown as { order: OrderKeyT };

    const products = await productsServices.searchingProducts({
        idDeposit: Number(idDeposit),
        idCategory: Number(idCategory),
        page: Number(page),
        takeUnits: Number(take),
        order,
        text,
    });

    return res.send(products);
}

export { sendAllCategories, getProductsQuantityPerDepositAndCategory, sendTotalProducts, getProductsBySearch };
