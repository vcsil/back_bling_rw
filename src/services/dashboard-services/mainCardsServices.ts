import { DateRangeT, DateRangeStringT, DateRangesT } from "../../types/utilsTypes";
import * as mainCardsRepositories from "../../repositories/dashboardRepositories/mainCardsRepositories";
import { MainCardsReturn } from "../../types/dashboardTypes";

function checksDates(rangeDate: DateRangeStringT): DateRangeT {
    const newFrom = new Date(rangeDate.from);
    const newTo = new Date(rangeDate.to);

    newFrom.setUTCHours(0, 0, 0, 0);
    newTo.setUTCHours(23, 59, 59, 999);

    const dates = { from: newFrom, to: newTo };
    return dates;
}

async function salesOrdersInPeriod({ main: dateRangeMain, compare: dateRangeCompare }: DateRangesT): Promise<MainCardsReturn> {
    const totalMain = await mainCardsRepositories.numberSalesInPeriod(dateRangeMain);
    const totalCompare = await mainCardsRepositories.numberSalesInPeriod(dateRangeCompare);
    const percent = totalMain / totalCompare - 1;

    return { amount: totalMain, oldAmount: totalCompare, percent };
}

async function productsSoldInPeriod({ main: dateRangeMain, compare: dateRangeCompare }: DateRangesT): Promise<MainCardsReturn> {
    const totalMain = (await mainCardsRepositories.numberProductsSoldInPeriod(dateRangeMain)) ?? 0;
    const totalCompare = (await mainCardsRepositories.numberProductsSoldInPeriod(dateRangeCompare)) ?? 0;
    const percent = (totalMain ?? 0) / (totalCompare ?? 0) - 1;

    return { amount: totalMain, oldAmount: totalCompare, percent };
}

async function amountInvoicedInPeriod({ main: dateRangeMain, compare: dateRangeCompare }: DateRangesT): Promise<MainCardsReturn> {
    const totalMain = await mainCardsRepositories.totalAmountInvoicedInPeriod(dateRangeMain);
    const totalCompare = await mainCardsRepositories.totalAmountInvoicedInPeriod(dateRangeCompare);
    const percent = totalMain / totalCompare - 1;

    return { amount: totalMain, oldAmount: totalCompare, percent };
}

function avarageTicketInPeriod(salesOrdersQuantity: MainCardsReturn, amountInvoiced: MainCardsReturn): MainCardsReturn {
    const totalMain = Math.round(amountInvoiced.amount / salesOrdersQuantity.amount);
    const totalCompare = Math.round(amountInvoiced.oldAmount / salesOrdersQuantity.oldAmount);
    const percent = totalMain / totalCompare - 1;

    return { amount: totalMain, oldAmount: totalCompare, percent };
}

export { checksDates, salesOrdersInPeriod, productsSoldInPeriod, amountInvoicedInPeriod, avarageTicketInPeriod };
