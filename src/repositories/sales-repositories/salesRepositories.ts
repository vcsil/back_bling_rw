import prisma from "../../database/database";

async function getSaleSituationById(idSaleSituation: number): Promise<{ id_bling: bigint } | null> {
    return prisma.situacoes.findFirst({
        where: {
            id_bling: idSaleSituation,
            id_modulo: 98310,
        },
        select: {
            id_bling: true,
        },
    });
}

export { getSaleSituationById };
