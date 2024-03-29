import prisma from "../../database/database";
import { DateRangeT } from "../../types/utilsTypes";

async function numberSalesInPeriod(rangeDate: DateRangeT, situationsSales: number[]): Promise<number> {
    return prisma.vendas.count({
        where: {
            data: {
                gte: rangeDate.from,
                lte: rangeDate.to,
            },
            id_situacao: {
                in: situationsSales,
            },
        },
    });
}

async function numberProductsSoldInPeriod(rangeDate: DateRangeT, situationsSales: number[]): Promise<number | null> {
    const { _sum: totalProducts } = await prisma.vendas_itens_produtos.aggregate({
        _sum: {
            quantidade: true,
        },
        where: {
            vendas: {
                data: {
                    gte: rangeDate.from,
                    lte: rangeDate.to,
                },
                id_situacao: {
                    in: situationsSales,
                },
            },
        },
    });

    return totalProducts.quantidade;
}

async function totalAmountInvoicedInPeriod(rangeDate: DateRangeT, situationsSales: number[]): Promise<number> {
    const valueQuantities = await prisma.$queryRaw<{ soma_total: number }[]>`
        SELECT 
        (
            SELECT COALESCE(SUM(vip.valor * vip.quantidade), 0) AS total_produtos
            FROM vendas_itens_produtos AS vip
            JOIN 
                vendas AS v ON vip.id_venda = v.id_bling
            WHERE 
                v.data BETWEEN ${rangeDate.from} AND ${rangeDate.to}
            AND v.id_situacao = ANY(${situationsSales})
        )
        -
        (
            SELECT COALESCE((SUM(vendas.desconto)), 0) AS desconto_real
            FROM vendas 
            JOIN vendedores ON vendedores.id_bling = vendas.id_vendedor
            JOIN contatos ON contatos.id_bling = vendedores.id_contato
            WHERE data BETWEEN ${rangeDate.from} AND ${rangeDate.to}
                AND vendas.id_situacao = ANY(${situationsSales})
                AND vendas.desconto_unidade = 'REAL'
        ) 
        - 
        (
            SELECT COALESCE(SUM((subquery.total_produto * subquery.desconto) / 10000), 0) AS desconto_percentual
            FROM (
                SELECT
                    SUM(valor * quantidade) AS total_produto,
                    v.desconto AS desconto
                FROM vendas_itens_produtos AS vip
                JOIN vendas AS v ON vip.id_venda = v.id_bling
                WHERE v.data BETWEEN ${rangeDate.from} AND ${rangeDate.to}
                    AND v.desconto_unidade = 'PERCENTUAL'
                    AND v.desconto > 0
                    AND v.id_situacao = ANY(${situationsSales})
                GROUP BY v.desconto
            ) AS subquery
        )
        +
        (
            SELECT COALESCE(SUM(outras_despesas) , 0) AS outros_custos
            FROM vendas
            WHERE vendas.data BETWEEN ${rangeDate.from} AND ${rangeDate.to}
            AND vendas.id_situacao = ANY(${situationsSales})
        )
        AS soma_total;
        `;

    return Number(valueQuantities[0].soma_total);
}

export { numberSalesInPeriod, numberProductsSoldInPeriod, totalAmountInvoicedInPeriod };
