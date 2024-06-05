import prisma from "../../database/database";

import { DateRangeT } from "../../types/utilsTypes";

async function getTotalGiftsInPeriod(rangeDate: DateRangeT): Promise<{ costGifts: number }[]> {
    return prisma.$queryRaw<{ costGifts: number }[]>`
        SELECT
                CAST(SUM(vip.quantidade * pf.preco_custo) AS INTEGER) AS "costGifts"
        FROM vendas AS v
        LEFT JOIN
            vendas_itens_produtos AS vip ON vip.id_venda = v.id_bling
        LEFT JOIN
            produto_fornecedor AS pf ON pf.id_produto = vip.id_produto
        WHERE 
            v.data BETWEEN ${rangeDate.from} AND ${rangeDate.to}
            AND v.id_situacao in (73113, 86735, 86733)
    `;
}

async function getTotalStoreExpenses(rangeDate: DateRangeT): Promise<{ storeExpenses: number }[]> {
    return prisma.$queryRaw<{ storeExpenses: number }[]>`
        SELECT
                CAST(SUM(p.valor_pago) AS INTEGER) AS "storeExpenses"
        FROM borderos AS b
        LEFT JOIN
            pagamentos AS "p" ON "p".id_bordero = b.id_bling
        WHERE
            b.data BETWEEN ${rangeDate.from} AND ${rangeDate.to}
            AND b.id_categoria_receita_despesa IN (
                SELECT 
                        crd.id_bling
                FROM categorias_receitas_despesas AS crd
                WHERE
                    crd.id_tipo = 1
                    AND crd.id_bling NOT IN (
                        SELECT 
                                id_categoria_filho
                        FROM categorias_receitas_despesas_relacao
                        WHERE id_categoria_pai=14628585886
                    )
                )
    `;
}

async function getTotalRevenues(rangeDate: DateRangeT): Promise<{ revenueGross: number }[]> {
    return prisma.$queryRaw<{ revenueGross: number }[]>`
        SELECT
                CAST(SUM(p.valor_pago) AS INTEGER) AS "revenueGross"
        FROM borderos AS b
        LEFT JOIN
            pagamentos AS "p" ON "p".id_bordero = b.id_bling
        WHERE
            b.data BETWEEN ${rangeDate.from} AND ${rangeDate.to}
            AND b.id_categoria_receita_despesa IN (
                SELECT 
                        crd.id_bling
                FROM categorias_receitas_despesas AS crd
                WHERE
                    crd.id_tipo = 2
                    AND crd.id_bling NOT IN (14627099725) --Frete de cliente
                )
    `;
}

async function getTotalPersonalExpenses(rangeDate: DateRangeT): Promise<{ personalExpenses: number }[]> {
    return prisma.$queryRaw<{ personalExpenses: number }[]>`
        SELECT
                CAST(SUM(p.valor_pago) AS INTEGER) AS "personalExpenses"
        FROM borderos AS b
        LEFT JOIN
            pagamentos AS "p" ON "p".id_bordero = b.id_bling
        LEFT JOIN
            categorias_receitas_despesas AS categ ON categ.id_bling = b.id_categoria_receita_despesa
        WHERE
            b.data BETWEEN ${rangeDate.from} AND ${rangeDate.to}
            AND b.id_categoria_receita_despesa IN (
                SELECT 
                        id_categoria_filho
                FROM categorias_receitas_despesas_relacao
                WHERE id_categoria_pai=14628585886
            )
    `;
}

export { getTotalGiftsInPeriod, getTotalPersonalExpenses, getTotalRevenues, getTotalStoreExpenses };
