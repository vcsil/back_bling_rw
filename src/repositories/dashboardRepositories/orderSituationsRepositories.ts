import prisma from "../../database/database";
import { OrderSituationsT } from "../../types/dashboardTypes";

async function getAllOrderSituations(): Promise<OrderSituationsT[]> {
    return prisma.$queryRaw<OrderSituationsT[]>`
        SELECT 
            id_bling AS "id", 
            nome 
        FROM situacoes
        WHERE id_modulo=98310
    `;
}

export { getAllOrderSituations };
