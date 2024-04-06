import prisma from "../../database/database";

import { LastUpdateTime, BlingStatus } from "../../types/dashboardTypes";
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

export { getLastUpdateTime, getBlingStatus };
