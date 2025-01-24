import prisma from "../../database/database";
import { ActiveSellersDB } from "../../types/sellersTypes";

async function getActiveSellers(): Promise<ActiveSellersDB[]> {
    return prisma.vendedores.findMany({
        select: {
            id_bling: true,
            contatos: {
                select: {
                    nome: true,
                    sobrenome: true,
                    fantasia: true,
                },
            },
        },
        orderBy: {
            contatos: {
                contatos_situacao: {
                    nome: "desc",
                },
            },
        },
        where: {
            contatos: {
                contatos_situacao: {
                    id: 5,
                },
            },
        },
    });
}

async function getSellerById(idSeller: number): Promise<ActiveSellersDB | null> {
    return prisma.vendedores.findFirst({
        select: {
            id_bling: true,
            contatos: {
                select: {
                    nome: true,
                    sobrenome: true,
                    fantasia: true,
                },
            },
        },
        where: {
            id_bling: idSeller,
        },
    });
}

export { getActiveSellers, getSellerById };
