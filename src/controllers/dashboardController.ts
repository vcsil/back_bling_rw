import { Request, Response } from "express";

import { DateRangesStringT } from "../types/utilsTypes";
import * as mainCardsService from "../services/dashboard-services/mainCardsServices";

export default async function mainCards(req: Request, res: Response) {
    const { main, compare } = req.body as DateRangesStringT;

    const mainDates = mainCardsService.checksDates(main);
    const compareDates = mainCardsService.checksDates(compare);

    const salesOrdersQuantity = await mainCardsService.salesOrdersInPeriod({ main: mainDates, compare: compareDates });
    const productsSoldQuantity = await mainCardsService.productsSoldInPeriod({ main: mainDates, compare: compareDates });
    const amountInvoiced = await mainCardsService.amountInvoicedInPeriod({ main: mainDates, compare: compareDates });
    const averageTicket = mainCardsService.avarageTicketInPeriod(salesOrdersQuantity, amountInvoiced);

    res.send({ salesOrdersQuantity, productsSoldQuantity, amountInvoiced, averageTicket });
}
