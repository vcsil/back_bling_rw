import { Request, Response } from "express";

import * as orderSituationsService from "../services/dashboard-services/orderSituationsServices";
import * as mainCardsService from "../services/dashboard-services/mainCardsServices";
import * as dashboardService from "../services/dashboard-services/dashboardServices";
import * as revenueCardsService from "../services/dashboard-services/revenueCardsServices";
import { MainCardsQueryParams, DateRangeT, OrderSalesInPeriodQueryParams, RevenueQueryParams } from "../types/utilsTypes";
import { checksDates, formatQueryArray } from "../services/utils";

export async function orderSituations(_req: Request, res: Response) {
    const situations = await orderSituationsService.getOrderSituations();

    res.send(situations);
}

export async function mainCards(req: Request, res: Response) {
    const { mainDateFrom, mainDateTo, compareDateFrom, compareDateTo, situationsSales } = req.query as MainCardsQueryParams;

    const mainDates = checksDates({ from: mainDateFrom, to: mainDateTo });
    const compareDates = checksDates({ from: compareDateFrom, to: compareDateTo });
    const situationsSalesNumber = formatQueryArray(situationsSales);

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

export async function orderStatus(req: Request, res: Response) {
    const { from, to } = req.query as unknown as { from: string; to: string };

    const rangeDate: DateRangeT = checksDates({ from, to });
    const blingOrderStatus = await dashboardService.blingOrderStatusPerPeriod(rangeDate);

    res.send(blingOrderStatus);
}

export async function orderSalesInPeriod(req: Request, res: Response) {
    const { from, to, situationsSales } = req.query as OrderSalesInPeriodQueryParams;

    const rangeDate: DateRangeT = checksDates({ from, to });
    const situationsSalesNumber = formatQueryArray(situationsSales);

    const blingOrderStatus = await dashboardService.salesPerDayInPeriod(rangeDate, situationsSalesNumber);

    res.send(blingOrderStatus);
}

export async function revenueCards(req: Request, res: Response) {
    const { mainDateFrom, mainDateTo, compareDateFrom, compareDateTo } = req.query as RevenueQueryParams;

    const mainDates = checksDates({ from: mainDateFrom, to: mainDateTo });
    const compareDates = checksDates({ from: compareDateFrom, to: compareDateTo });

    const totalGifts = await revenueCardsService.giftPieces(mainDates, compareDates);
    const totalStoreExpenses = await revenueCardsService.storeExpenses(mainDates, compareDates);
    const totalGrossRevenue = await revenueCardsService.grossRevenue(mainDates, compareDates);
    const markup = revenueCardsService.calculateMarkup(totalGifts, totalStoreExpenses, totalGrossRevenue);
    const totalPersonalExpenses = await revenueCardsService.personalExpenses(mainDates, compareDates);

    const revenueMetrics = [totalGifts, totalStoreExpenses, totalGrossRevenue, markup, totalPersonalExpenses];

    res.send(revenueMetrics);
}
