import prisma from "../../database/database";
import { DepositT } from "../../types/depositsTypes";

async function getDepositsActive(): Promise<DepositT[]> {
    return prisma.produtos_depositos.findMany({
        select: {
            id_bling: true,
            descricao: true,
        },
        where: {
            situacao: true,
        },
    });
}

export { getDepositsActive };
