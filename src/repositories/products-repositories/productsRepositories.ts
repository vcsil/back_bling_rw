import prisma from "../../database/database";
import {
    AllProductsWDivergencesT,
    DBProductBalanceStructureT,
    DifferencesProductsQuantitiesT,
    GetAllBalancePerDayDepositT,
    ProductCompareT,
    ProductsBalance,
    ProductsFromCountT,
    QuantityAllProductsT,
} from "../../types/productsTypes";

async function productsForCount(idDeposit: number, codeProduct: string): Promise<ProductsBalance> {
    return prisma.produtos.findFirstOrThrow({
        where: {
            codigo: codeProduct,
            situacao_produto: "Ativo",
        },
        select: {
            id_bling: true,
            nome: true,
            codigo: true,
            preco: true,
            produtos_midias: {
                select: {
                    url: true,
                    diretorio_local: true,
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

async function getProductsFromCount(id_produto: number): Promise<ProductsFromCountT | null> {
    return prisma.contagem_estoque.findFirst({
        where: {
            id_produto,
        },
    });
}

async function createProductsCount(product: ProductCompareT): Promise<ProductsFromCountT> {
    return prisma.contagem_estoque.create({
        data: {
            id_produto: product.id_produto,
            quantidade_lida: product.quantityRead,
            codigo: product.codigo,
        },
    });
}

async function updateProductsCount(product: ProductCompareT): Promise<ProductsFromCountT> {
    return prisma.contagem_estoque.update({
        where: {
            id_produto: product.id_produto,
        },
        data: {
            quantidade_lida: product.quantityRead,
        },
    });
}

async function getQuantitiesAndReadsAllProducts(idDeposit: number): Promise<QuantityAllProductsT[] | null> {
    return prisma.produtos_estoques.findMany({
        where: {
            id_deposito: idDeposit,
            produtos: {
                situacao_produto: "Ativo",
            },
        },
        select: {
            id_produto: true,
            saldo_fisico: true,
            produtos: {
                select: {
                    contagem_estoque: {
                        select: {
                            quantidade_lida: true,
                        },
                    },
                },
            },
        },
    });
}

async function createDifferencesProductsQuantities(differencesProductsQuantities: DifferencesProductsQuantitiesT[]) {
    return prisma.registros_de_comparacao_balanco.createMany({
        data: differencesProductsQuantities,
    });
}

async function getProductBalanceStructure(idDeposit: number): Promise<DBProductBalanceStructureT[]> {
    return prisma.produtos.findMany({
        select: {
            id_bling: true,
            codigo: true,
            gtin: true,
            nome: true,
            produtos_estoques: {
                where: {
                    produtos_depositos: {
                        id_bling: idDeposit,
                    },
                },
                select: {
                    produtos_depositos: {
                        select: {
                            descricao: true,
                        },
                    },
                },
            },
            produto_fornecedor: {
                select: {
                    preco_compra: true,
                    preco_custo: true,
                },
                where: {
                    padrao: true,
                },
            },
            contagem_estoque: {
                select: {
                    quantidade_lida: true,
                },
            },
        },
        where: {
            situacao_produto: "Ativo",
            produto_fornecedor: {
                some: {
                    padrao: true,
                },
            },
            produtos_estoques: {
                some: {
                    produtos_depositos: {
                        id_bling: idDeposit,
                    },
                },
            },
        },
        orderBy: {
            id_bling: "asc",
        },
    });
}

async function getAllBalancePerDayDeposit(): Promise<GetAllBalancePerDayDepositT[]> {
    return prisma.registros_de_comparacao_balanco.findMany({
        distinct: ["id_deposito", "date"],
        select: {
            id_deposito: true,
            produtos_depositos: {
                select: {
                    descricao: true,
                },
            },
            date: true,
        },
        orderBy: {
            date: "desc",
        },
    });
}

async function getAllProductsWDivergences(idDeposit: number, date: Date): Promise<AllProductsWDivergencesT[]> {
    return prisma.registros_de_comparacao_balanco.findMany({
        select: {
            id_produto: true,
            produtos: {
                select: {
                    codigo: true,
                    nome: true,
                    produtos_midias: {
                        select: {
                            diretorio_local: true,
                        },
                    },
                },
            },
            saldo_antes: true,
            saldo_depois: true,
        },
        where: {
            id_deposito: idDeposit,
            date,
        },
    });
}

async function deleteAllCountsStock() {
    return prisma.contagem_estoque.deleteMany();
}

export {
    productsForCount,
    getProductByCode,
    getProductsFromCount,
    createProductsCount,
    updateProductsCount,
    getQuantitiesAndReadsAllProducts,
    createDifferencesProductsQuantities,
    getProductBalanceStructure,
    getAllBalancePerDayDeposit,
    getAllProductsWDivergences,
    deleteAllCountsStock,
};
