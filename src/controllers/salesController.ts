import { Request, Response } from "express";
import * as salesServices from "../services/sales-services/salesServices";
import { checksDates, formatQueryArray } from "../services/utils";
import { DateRangeT, OrderSalesInPeriodQueryParams } from "../types/utilsTypes";

async function getSaleSituations(_req: Request, res: Response) {
    const allSituations = await salesServices.getAllSaleSituations();

    return res.send(allSituations);
}

async function getSaleSituationById(req: Request, res: Response) {
    const { idSaleSituation } = req.params;

    const situation = await salesServices.getSaleSituationById(Number(idSaleSituation));

    return res.send(situation);
}

async function getSalesSituationsPerSeller(req: Request, res: Response) {
    const { from, to } = req.query as unknown as { from: string; to: string };
    const { idSeller } = req.params as { idSeller: string };

    const rangeDate: DateRangeT = checksDates({ from, to });
    const situationsCount = await salesServices.getSalesSituationsPerSeller(rangeDate, Number(idSeller));

    res.send(situationsCount);
}

async function getSalesPerDayANDSeller(req: Request, res: Response) {
    const { from, to, situationsSales } = req.query as OrderSalesInPeriodQueryParams;
    const { idSeller } = req.params as { idSeller: string };

    const rangeDate: DateRangeT = checksDates({ from, to });
    const situationSalesNumber = formatQueryArray(situationsSales);

    const salesCount = await salesServices.getSalesCountPerSeller(rangeDate, Number(idSeller), situationSalesNumber);

    res.send(salesCount);
}

async function getTotalPerDayANDSeller(req: Request, res: Response) {
    const { date, situationsSales } = req.query as unknown as { date: string; situationsSales: string[] };
    const { idSeller } = req.params as { idSeller: string };

    const rangeDate: DateRangeT = checksDates({ from: date, to: date });
    const situationSalesNumber = formatQueryArray(situationsSales);

    const salesCount = await salesServices.getTotalPerDayANDSeller(rangeDate.from, Number(idSeller), situationSalesNumber);

    res.send(salesCount);
}
export { getSaleSituations, getSaleSituationById, getSalesSituationsPerSeller, getSalesPerDayANDSeller, getTotalPerDayANDSeller };
