import prisma from "../../database/database";
import { SaleSituationT } from "../../types/salesTypes";
import { DateRangeT } from "../../types/utilsTypes";

async function getSalesSituation(): Promise<SaleSituationT[]> {
    return prisma.situacoes.findMany({
        select: {
            id_bling: true,
            nome: true,
            cor: true,
        },
        where: {
            id_modulo: 98310,
        },
    });
}

async function getSaleSituationById(idSaleSituation: number): Promise<SaleSituationT | null> {
    return prisma.situacoes.findFirst({
        where: {
            id_bling: idSaleSituation,
            id_modulo: 98310,
        },
        select: {
            id_bling: true,
            nome: true,
            cor: true,
        },
    });
}

async function getSalesSituationsByDateANDSeller(rangeDate: DateRangeT, idSeller: number) {
    return prisma.situacoes.findMany({
        select: {
            id_bling: true,
            nome: true,
            _count: {
                select: {
                    vendas: {
                        where: {
                            data: {
                                gte: rangeDate.from,
                                lte: rangeDate.to,
                            },
                            id_vendedor: idSeller,
                        },
                    },
                },
            },
        },
    });
}

async function getSalesPerDayANDSeller(rangeDate: DateRangeT, idSeller: number, idSituations: number[]) {
    return prisma.vendas.groupBy({
        by: ["data"],
        _count: {
            id_bling: true,
        },
        orderBy: {
            data: "asc",
        },
        where: {
            data: {
                gte: rangeDate.from,
                lte: rangeDate.to,
            },
            id_vendedor: idSeller,
            id_situacao: {
                in: idSituations,
            },
        },
    });
}

async function getTotalPerDayANDSeller(date: Date, idSeller: number, idSituations: number[]) {
    return prisma.vendas.findMany({
        where: {
            data: date,
            id_vendedor: idSeller,
            id_situacao: {
                in: idSituations,
            },
        },
    });
}

export { getSalesSituation, getSaleSituationById, getSalesSituationsByDateANDSeller, getSalesPerDayANDSeller, getTotalPerDayANDSeller };
