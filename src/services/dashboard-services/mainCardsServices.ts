import * as mainCardsRepositories from "../../repositories/dashboardRepositories/mainCardsRepositories";
import { DateRangesSituationsT } from "../../types/utilsTypes";
import { MainCardsReturnT } from "../../types/dashboardTypes";

async function salesOrdersInPeriod({
    main: dateRangeMain,
    compare: dateRangeCompare,
    situationsSales,
}: DateRangesSituationsT): Promise<MainCardsReturnT> {
    const totalMain = await mainCardsRepositories.numberSalesInPeriod(dateRangeMain, situationsSales);
    const totalCompare = await mainCardsRepositories.numberSalesInPeriod(dateRangeCompare, situationsSales);
    const percent = Math.round((totalMain / totalCompare - 1) * 10000);

    return { amount: totalMain, oldAmount: totalCompare, percent };
}

async function productsSoldInPeriod({
    main: dateRangeMain,
    compare: dateRangeCompare,
    situationsSales,
}: DateRangesSituationsT): Promise<MainCardsReturnT> {
    const totalMain = (await mainCardsRepositories.numberProductsSoldInPeriod(dateRangeMain, situationsSales)) ?? 0;
    const totalCompare = (await mainCardsRepositories.numberProductsSoldInPeriod(dateRangeCompare, situationsSales)) ?? 0;
    const percent = Math.round((totalMain / totalCompare - 1) * 10000);

    return { amount: totalMain, oldAmount: totalCompare, percent };
}

async function amountInvoicedInPeriod({
    main: dateRangeMain,
    compare: dateRangeCompare,
    situationsSales,
}: DateRangesSituationsT): Promise<MainCardsReturnT> {
    const totalMain = await mainCardsRepositories.totalAmountInvoicedInPeriod(dateRangeMain, situationsSales);
    const totalCompare = await mainCardsRepositories.totalAmountInvoicedInPeriod(dateRangeCompare, situationsSales);
    const percent = Math.round((totalMain / totalCompare - 1) * 10000);

    return { amount: totalMain, oldAmount: totalCompare, percent };
}

function avarageTicketInPeriod(salesOrdersQuantity: MainCardsReturnT, amountInvoiced: MainCardsReturnT): MainCardsReturnT {
    const totalMain = Math.round(amountInvoiced.amount / salesOrdersQuantity.amount);
    const totalCompare = Math.round(amountInvoiced.oldAmount / salesOrdersQuantity.oldAmount);
    const percent = Math.round((totalMain / totalCompare - 1) * 10000);

    return { amount: totalMain, oldAmount: totalCompare, percent };
}

export { salesOrdersInPeriod, productsSoldInPeriod, amountInvoicedInPeriod, avarageTicketInPeriod };
