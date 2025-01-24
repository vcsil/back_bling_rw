import prisma from "../../database/database";

import { CategoryT, DBCategoryT, GetManyProductsQueryProps, ProductsQuantityPerDepositT } from "../../types/productsType";

async function getCategoryById(idCategory: number): Promise<DBCategoryT> {
    return prisma.produtos_categorias.findUnique({
        where: {
            id_bling: idCategory,
        },
    });
}

async function getAllCategories(): Promise<CategoryT[]> {
    const categories = prisma.$queryRaw<CategoryT[]>`
            WITH RECURSIVE categorias_hierarquia AS (
            -- Consulta inicial: Seleciona as categorias principais (que não são filhos de outra categoria)
            SELECT 
                pc.id_bling AS id_categoria,
                pc.nome AS nome_categoria,
                NULL::BIGINT AS id_categoria_pai,  -- Casting explícito de NULL para BIGINT
                pc.nome::VARCHAR AS caminho_categoria  -- Casting explícito de nome para VARCHAR
            FROM 
                produtos_categorias pc
            WHERE 
                pc.id_bling NOT IN (SELECT id_categoria_filho FROM produtos_categorias_relacao)

            UNION ALL

            -- Consulta recursiva: Relaciona categorias pai e filho
            SELECT 
                pcr.id_categoria_filho AS id_categoria,
                pc.nome AS nome_categoria,
                pcr.id_categoria_pai,
                ch.caminho_categoria || ' > ' || pc.nome AS caminho_categoria
            FROM 
                produtos_categorias_relacao pcr
            INNER JOIN 
                produtos_categorias pc ON pc.id_bling = pcr.id_categoria_filho
            INNER JOIN 
                categorias_hierarquia ch ON ch.id_categoria = pcr.id_categoria_pai
        )
        -- Seleciona e organiza os resultados
        SELECT 
            id_categoria::INTEGER,
            nome_categoria,
            id_categoria_pai::INTEGER,
            caminho_categoria
        FROM 
            categorias_hierarquia
        ORDER BY 
            caminho_categoria;
    `;
    return categories;
}

async function getAllProductsQuantityPerDepositAndCategory({
    idDeposit,
    idCategory,
    page,
    takeUnits,
    order,
}: GetManyProductsQueryProps): Promise<ProductsQuantityPerDepositT[]> {
    return prisma.produtos.findMany({
        select: {
            id_bling: true,
            codigo: true,
            nome: true,
            preco: true,
            produtos_estoques: {
                select: {
                    saldo_fisico: true,
                },
                where: {
                    id_deposito: idDeposit,
                },
            },
            produtos_midias: {
                select: {
                    diretorio_local: true,
                },
            },
            other_produtos: {
                select: {
                    id_bling: true,
                    codigo: true,
                    nome: true,
                    preco: true,
                    produtos_estoques: {
                        select: {
                            saldo_fisico: true,
                        },
                        where: {
                            id_deposito: idDeposit,
                        },
                    },
                    produtos_midias: {
                        select: {
                            diretorio_local: true,
                        },
                    },
                },
            },
        },
        where: {
            id_produto_pai: null,
            id_categoria_produto: idCategory || { not: undefined },
            situacao_produto: "Ativo",
        },
        orderBy: order,
        take: takeUnits,
        skip: takeUnits * page,
    });
}

async function getProductsTotalQuantity(idCategory: number | undefined, text: string): Promise<number> {
    return prisma.produtos.count({
        where: {
            OR: [
                {
                    nome: {
                        contains: text,
                        mode: "insensitive",
                    },
                },
                {
                    codigo: {
                        contains: text,
                        mode: "insensitive",
                    },
                },
                {
                    other_produtos: {
                        some: {
                            nome: {
                                contains: text,
                                mode: "insensitive",
                            },
                        },
                    },
                },
                {
                    other_produtos: {
                        some: {
                            codigo: {
                                contains: text,
                                mode: "insensitive",
                            },
                        },
                    },
                },
                {
                    id_bling: {
                        equals: parseInt(text, 10) || 0,
                    },
                },
            ],
            id_produto_pai: null,
            id_categoria_produto: idCategory || { not: undefined },
            situacao_produto: "Ativo",
        },
    });
}

async function getProductsBySearch({
    idDeposit,
    idCategory,
    page,
    takeUnits,
    order,
    text,
}: GetManyProductsQueryProps & { text: string }): Promise<ProductsQuantityPerDepositT[]> {
    return prisma.produtos.findMany({
        select: {
            id_bling: true,
            codigo: true,
            nome: true,
            preco: true,
            produtos_estoques: {
                select: {
                    saldo_fisico: true,
                },
                where: {
                    id_deposito: idDeposit,
                },
            },
            produtos_midias: {
                select: {
                    diretorio_local: true,
                },
            },
            other_produtos: {
                select: {
                    id_bling: true,
                    codigo: true,
                    nome: true,
                    preco: true,
                    produtos_estoques: {
                        select: {
                            saldo_fisico: true,
                        },
                        where: {
                            id_deposito: idDeposit,
                        },
                    },
                    produtos_midias: {
                        select: {
                            diretorio_local: true,
                        },
                    },
                },
            },
        },
        where: {
            OR: [
                {
                    nome: {
                        contains: text,
                        mode: "insensitive",
                    },
                },
                {
                    codigo: {
                        contains: text,
                        mode: "insensitive",
                    },
                },
                {
                    other_produtos: {
                        some: {
                            nome: {
                                contains: text,
                                mode: "insensitive",
                            },
                        },
                    },
                },
                {
                    other_produtos: {
                        some: {
                            codigo: {
                                contains: text,
                                mode: "insensitive",
                            },
                        },
                    },
                },
                {
                    id_bling: {
                        equals: parseInt(text, 10) || 0,
                    },
                },
            ],
            id_produto_pai: null,
            situacao_produto: "Ativo",
            id_categoria_produto: idCategory || { not: undefined },
        },
        orderBy: order,
        take: takeUnits,
        skip: takeUnits * page,
    });
}

export { getCategoryById, getAllCategories, getAllProductsQuantityPerDepositAndCategory, getProductsTotalQuantity, getProductsBySearch };
