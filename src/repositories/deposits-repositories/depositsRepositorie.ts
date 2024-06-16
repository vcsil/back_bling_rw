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

async function getDepositById(idDeposit: number): Promise<{ id_bling: bigint } | null> {
    return prisma.produtos_depositos.findUnique({
        where: {
            id_bling: idDeposit,
            situacao: true,
        },
        select: {
            id_bling: true,
        },
    });
}

export { getDepositsActive, getDepositById };
