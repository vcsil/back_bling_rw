import * as revenueCardsRepositorie from "../../repositories/dashboardRepositories/revenueCardsRepositories";
import { DateRangeT } from "../../types/utilsTypes";

type RevenueMetrics = {
    name: string;
    main: number;
    compare: number;
    percent: number;
};

async function giftPieces(mainDates: DateRangeT, compareDates: DateRangeT): Promise<RevenueMetrics> {
    const mainTotalGifts = (await revenueCardsRepositorie.getTotalGiftsInPeriod(mainDates))[0].costGifts;
    const compareTotalGifts = (await revenueCardsRepositorie.getTotalGiftsInPeriod(compareDates))[0].costGifts;

    const percent = Math.round((mainTotalGifts / compareTotalGifts - 1) * 10000);

    return { name: "Peças Marketing", main: mainTotalGifts, compare: compareTotalGifts, percent };
}

async function storeExpenses(mainDates: DateRangeT, compareDates: DateRangeT): Promise<RevenueMetrics> {
    const mainTotalStoreExpenses = (await revenueCardsRepositorie.getTotalStoreExpenses(mainDates))[0].storeExpenses;
    const compareTotalStoreExpenses = (await revenueCardsRepositorie.getTotalStoreExpenses(compareDates))[0].storeExpenses;

    const percent = Math.round((mainTotalStoreExpenses / compareTotalStoreExpenses - 1) * 10000);

    return { name: "Despesas Bruta", main: mainTotalStoreExpenses, compare: compareTotalStoreExpenses, percent };
}

async function grossRevenue(mainDates: DateRangeT, compareDates: DateRangeT): Promise<RevenueMetrics> {
    const mainTotalRevenuesGross = (await revenueCardsRepositorie.getTotalRevenues(mainDates))[0].revenueGross;
    const compareTotalRevenuesGross = (await revenueCardsRepositorie.getTotalRevenues(compareDates))[0].revenueGross;

    const percent = Math.round((mainTotalRevenuesGross / compareTotalRevenuesGross - 1) * 10000);

    return { name: "Receita Líquida", main: mainTotalRevenuesGross, compare: compareTotalRevenuesGross, percent };
}

function calculateMarkup(
    totalGiftsPieces: RevenueMetrics,
    totalStoreExpenses: RevenueMetrics,
    totalGrossRevenue: RevenueMetrics,
): RevenueMetrics {
    const mainProfit = totalGrossRevenue.main - totalStoreExpenses.main - totalGiftsPieces.main;
    const mainNetMargin = Math.round((mainProfit / totalGrossRevenue.main) * 10000);

    const compareProfit = totalGrossRevenue.compare - totalStoreExpenses.compare - totalGiftsPieces.compare;
    const compareNetMargin = Math.round((compareProfit / totalGrossRevenue.compare) * 10000);

    const percent = Math.round((mainProfit / compareProfit - 1) * 10000);

    return { name: "Margem Lucro", main: mainNetMargin, compare: compareNetMargin, percent };
}

async function personalExpenses(mainDates: DateRangeT, compareDates: DateRangeT): Promise<RevenueMetrics> {
    const mainTotalPersonalExpenses = (await revenueCardsRepositorie.getTotalPersonalExpenses(mainDates))[0].personalExpenses;
    const compareTotalPersonalExpenses = (await revenueCardsRepositorie.getTotalPersonalExpenses(compareDates))[0].personalExpenses;

    const percent = Math.round((mainTotalPersonalExpenses / compareTotalPersonalExpenses - 1) * 10000);

    return { name: "Despesas Pessoais", main: mainTotalPersonalExpenses, compare: compareTotalPersonalExpenses, percent };
}

export { giftPieces, personalExpenses, grossRevenue, calculateMarkup, storeExpenses };
