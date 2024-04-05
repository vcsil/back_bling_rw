import { Request, Response } from "express";

import * as orderSituationsService from "../services/dashboard-services/orderSituationsServices";
import * as mainCardsService from "../services/dashboard-services/mainCardsServices";
import * as dashboardService from "../services/dashboard-services/dashboardServices";
import { MainCardsQueryParams } from "../types/utilsTypes";

export async function orderSituations(_req: Request, res: Response) {
    const situations = await orderSituationsService.getOrderSituations();

    res.send(situations);
}

export async function mainCards(req: Request, res: Response) {
    const { mainDateFrom, mainDateTo, compareDateFrom, compareDateTo, situationsSales } = req.query as MainCardsQueryParams;

    const mainDates = mainCardsService.checksDates({ from: mainDateFrom, to: mainDateTo });
    const compareDates = mainCardsService.checksDates({ from: compareDateFrom, to: compareDateTo });
    const situationsSalesNumber = mainCardsService.formatSituationsArray(situationsSales);

    const serviceProps = {
        main: mainDates,
        compare: compareDates,
        situationsSales: situationsSalesNumber,
    };
    const salesOrdersQuantity = await mainCardsService.salesOrdersInPeriod(serviceProps);
    const productsSoldQuantity = await mainCardsService.productsSoldInPeriod(serviceProps);
    const amountInvoiced = await mainCardsService.amountInvoicedInPeriod(serviceProps);
    const averageTicket = mainCardsService.avarageTicketInPeriod(salesOrdersQuantity, amountInvoiced);

    res.send({ salesOrdersQuantity, productsSoldQuantity, amountInvoiced, averageTicket });
}

export async function lastUpdateTime(_req: Request, res: Response) {
    const lastTime = await dashboardService.lastUpdateTime();

    res.send(lastTime);
}
