import prisma from "../../database/database";
import { LastUpdateTime } from "../../types/dashboardTypes";

async function getLastUpdateTime(): Promise<LastUpdateTime | null> {
    return prisma.atualizacoes_modulos.findFirst({
        orderBy: {
            id: "desc",
        },
    });
}

export { getLastUpdateTime };
