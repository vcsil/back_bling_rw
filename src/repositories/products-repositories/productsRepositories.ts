import prisma from "../../database/database";
import { ProductsBalance } from "../../types/productsTypes";

async function productsForBalance(idDeposit: number, codeProduct: string): Promise<ProductsBalance> {
    return prisma.produtos.findFirstOrThrow({
        where: {
            codigo: codeProduct,
        },
        select: {
            id_bling: true,
            nome: true,
            codigo: true,
            preco: true,
            produtos_midias: {
                select: {
                    url: true,
                },
            },
            produtos_estoques: {
                where: {
                    id_deposito: idDeposit,
                },
                select: {
                    saldo_fisico: true,
                },
            },
        },
    });
}

async function getProductByCode(codeProduct: string): Promise<{ id_bling: bigint } | null> {
    return prisma.produtos.findFirst({
        where: {
            codigo: codeProduct,
            situacao_produto: "Ativo",
        },
        select: {
            id_bling: true,
        },
    });
}

export { productsForBalance, getProductByCode };
