import prisma from "../../database/database";

import { LastUpdateTime, BlingStatus, SalesPerDayInPeriodT } from "../../types/dashboardTypes";
import { DateRangeT } from "../../types/utilsTypes";

async function getLastUpdateTime(): Promise<LastUpdateTime | null> {
    return prisma.atualizacoes_modulos.findFirst({
        orderBy: {
            id: "desc",
        },
    });
}

async function getBlingStatus(rangeDate: DateRangeT): Promise<BlingStatus[]> {
    const blingOrderStatus = prisma.$queryRaw<BlingStatus[]>`
        SELECT
                sit.nome
            ,	sit.cor
            ,   COUNT(*) AS total
        FROM 
            vendas AS V
        JOIN situacoes AS sit ON sit.id_bling = v.id_situacao
        WHERE v.data BETWEEN ${rangeDate.from} AND ${rangeDate.to}
        GROUP BY sit.nome, sit.cor
        ORDER BY total DESC
    `;
    return blingOrderStatus;
}

async function getSalesPerDayInPeriod(rangeDate: DateRangeT, situationsSales: number[]): Promise<SalesPerDayInPeriodT[]> {
    const selesPerDay = prisma.$queryRaw<SalesPerDayInPeriodT[]>`
        SELECT
            calendar.day AS "date",
            COUNT(vendas.id_bling) AS "value"
        FROM 
            (
                SELECT generate_series(
                    ${rangeDate.from}::date, ${rangeDate.to}::date, '1 day'
                ) AS day
            ) calendar
        LEFT JOIN 
            vendas ON DATE_TRUNC('day', vendas.data) = calendar.day
        WHERE vendas.id_situacao = ANY(${situationsSales})
        GROUP BY 
            calendar.day
        ORDER BY 
            calendar.day;

    `;
    return selesPerDay;
}

export { getLastUpdateTime, getBlingStatus, getSalesPerDayInPeriod };
