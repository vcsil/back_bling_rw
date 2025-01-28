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
    const { text } = req.query as { text: string };

    const countPrducts = await productsServices.getProductsTotalQuantity(Number(idCategory), text);

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

async function getProductsForCatalogPerDepositAndCategory(req: Request, res: Response) {
    const { idDeposit, idCategory } = req.params;
    const { page, take } = req.query;
    const { order } = req.query as unknown as { order: OrderKeyT };

    const products = await productsServices.getProductsForCatalogPerDepositAndCategory({
        idDeposit: Number(idDeposit),
        idCategory: Number(idCategory),
        page: Number(page),
        takeUnits: Number(take),
        order,
    });

    return res.send(products);
}

async function sendTotalProductsCatalog(req: Request, res: Response) {
    const { idDeposit } = req.params;
    const { idCategory } = req.query;
    const { text } = req.query as { text: string };

    const countPrducts = await productsServices.getProductsCatalogTotalQuantity(Number(idCategory), Number(idDeposit), text);

    return res.send({ total: countPrducts });
}

async function getCatalogProductsBySearch(req: Request, res: Response) {
    const { idDeposit, idCategory } = req.params;
    const { page, take, text } = req.query as { page: string; take: string; text: string };
    const { order } = req.query as unknown as { order: OrderKeyT };

    const products = await productsServices.searchingCatalogProducts({
        idDeposit: Number(idDeposit),
        idCategory: Number(idCategory),
        page: Number(page),
        takeUnits: Number(take),
        order,
        text,
    });

    return res.send(products);
}

export {
    sendAllCategories,
    getProductsQuantityPerDepositAndCategory,
    sendTotalProducts,
    getProductsBySearch,
    getProductsForCatalogPerDepositAndCategory,
    sendTotalProductsCatalog,
    getCatalogProductsBySearch,
};
