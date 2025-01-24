/* eslint-disable no-underscore-dangle */
import * as salesRepositorie from "../../repositories/sales-repositories/salesRepositories";
import { DateRangeT } from "../../types/utilsTypes";
import { createDateRangeList } from "../utils";

async function getAllSaleSituations() {
    const situations = await salesRepositorie.getSalesSituation();

    return situations;
}

async function getSaleSituationById(idSaleSituation: number) {
    const situation = await salesRepositorie.getSaleSituationById(idSaleSituation);

    return situation;
}

async function getSalesSituationsPerSeller(rangeDate: DateRangeT, idSeller: number) {
    const situationsPerSeller = await salesRepositorie.getSalesSituationsByDateANDSeller(rangeDate, idSeller);

    const situationsPerSellerGT0 = situationsPerSeller
        .filter((situation) => situation._count.vendas > 0)
        .map((situation) => ({
            id_bling: situation.id_bling,
            nome: situation.nome,
            count: situation._count.vendas,
        }));
    situationsPerSellerGT0.sort((a, b) => b.count - a.count);

    return situationsPerSellerGT0;
}

async function getSalesCountPerSeller(rangeDate: DateRangeT, idSeller: number, idSituations: number[]) {
    const salesCount = await salesRepositorie.getSalesPerDayANDSeller(rangeDate, idSeller, idSituations);
    const salesCountDict = salesCount.reduce(
        (acc, salesOfDay) => {
            acc[salesOfDay.data.getTime()] = salesOfDay._count.id_bling;
            return acc;
        },
        {} as Record<number, number>,
    );

    const rangeDateList = createDateRangeList(rangeDate);
    const salesCountPerDay = rangeDateList.map((date) => ({
        date,
        value: salesCountDict[date.getTime()] || 0,
    }));

    return salesCountPerDay;
}

async function getTotalPerDayANDSeller(date: Date, idSeller: number, idSituations: number[]) {
    const total = salesRepositorie.getTotalPerDayANDSeller(date, idSeller, idSituations);

    return total;
}

export { getAllSaleSituations, getSaleSituationById, getSalesSituationsPerSeller, getSalesCountPerSeller, getTotalPerDayANDSeller };
