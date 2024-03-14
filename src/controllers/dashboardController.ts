import { Request, Response } from "express";

import * as orderSituationsService from "../services/dashboard-services/orderSituationsServices";
import * as mainCardsService from "../services/dashboard-services/mainCardsServices";
import { DateRangesStringT } from "../types/utilsTypes";

export async function orderSituations(_req: Request, res: Response) {
    const situations = await orderSituationsService.getOrderSituations();

    res.send(situations);
}

export async function mainCards(req: Request, res: Response) {
    const { main, compare } = req.body as DateRangesStringT;

    const mainDates = mainCardsService.checksDates(main);
    const compareDates = mainCardsService.checksDates(compare);

    const salesOrdersQuantity = await mainCardsService.salesOrdersInPeriod({ main: mainDates, compare: compareDates });
    const productsSoldQuantity = await mainCardsService.productsSoldInPeriod({ main: mainDates, compare: compareDates });
    const amountInvoiced = await mainCardsService.amountInvoicedInPeriod({ main: mainDates, compare: compareDates });
    const averageTicket = mainCardsService.avarageTicketInPeriod(salesOrdersQuantity, amountInvoiced);

    res.send({ salesOrdersQuantity, productsSoldQuantity, amountInvoiced, averageTicket });
}
