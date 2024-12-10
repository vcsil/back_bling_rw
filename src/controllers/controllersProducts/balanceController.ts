import { Request, Response } from "express";
import * as productsServices from "../../services/products-services/balanceServices";
import { ConferenceProductsT } from "../../types/balanceTypes";

async function productsBalance(req: Request, res: Response) {
    const { idDeposit, codeProduct } = req.params;

    const produtct = await productsServices.getProductsForCount(Number(idDeposit), codeProduct);

    return res.send(produtct);
}

async function saveStock(req: Request, res: Response) {
    const { body: conferenceProducts }: { body: ConferenceProductsT } = req;

    await productsServices.postProductsCount(conferenceProducts);

    return res.sendStatus(200);
}

async function compareQuantities(req: Request, res: Response) {
    const { idDeposit } = req.params;

    const divergences = await productsServices.compareQuantitiesProducts(Number(idDeposit));
    productsServices.deleteCountsProductsBalance();

    return res.send(divergences);
}

async function saveBalanceOnBling(req: Request, res: Response) {
    const { idDeposit } = req.params;

    const balanceCSV = await productsServices.createFinalBalanceFile(Number(idDeposit));

    return res.send(balanceCSV);
}

async function getAllBalancePerDayAndDeposit(_req: Request, res: Response) {
    const balancesDates = await productsServices.getBalancesInfos();

    return res.send(balancesDates);
}

async function getDivergentProducts(req: Request, res: Response) {
    const { idDeposit, dateBalance } = req.params;

    const divergentProducts = await productsServices.getDivergentProducts(Number(idDeposit), new Date(dateBalance));

    return res.send(divergentProducts);
}

export { productsBalance, saveStock, compareQuantities, saveBalanceOnBling, getAllBalancePerDayAndDeposit, getDivergentProducts };
