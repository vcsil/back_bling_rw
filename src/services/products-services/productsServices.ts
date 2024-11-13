/* eslint-disable no-continue */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import * as productsRepositorie from "../../repositories/products-repositories/productsRepositories";
import {
    AllBalancePerDayDepositT,
    ConferenceProductsT,
    DifferencesProductsQuantitiesT,
    DivergentroductsT,
    ProductBalanceStructureT,
    ProductsBalance,
} from "../../types/productsTypes";
import { MyCustomError, badRequestError } from "../../utils/errorUtils";
import { jsonToCsv } from "../utils";

async function getProductsForCount(idDeposit: number, codeProduct: string): Promise<ProductsBalance> {
    const product = await productsRepositorie.productsForCount(idDeposit, codeProduct);

    if (!product.produtos_estoques.length) throw new MyCustomError(badRequestError("Product out of stock. Check the registration."));

    return product;
}

async function postProductsCount(conferenceProducts: ConferenceProductsT) {
    const arrayProducts = Object.entries(conferenceProducts).map(([id, product]) => ({
        id_produto: Number(id),
        codigo: product.code,
        quantityRead: product.quantity,
    }));

    for (const product of arrayProducts) {
        const existQuantityProduct = await productsRepositorie.getProductsFromCount(Number(product.id_produto));

        if (!existQuantityProduct) {
            await productsRepositorie.createProductsCount(product);
            continue;
        }
        product.quantityRead += existQuantityProduct.quantidade_lida;
        await productsRepositorie.updateProductsCount(product);
    }
}

async function compareQuantitiesProducts(idDeposit: number): Promise<DifferencesProductsQuantitiesT[]> {
    const quantitiesOfProducts = await productsRepositorie.getQuantitiesAndReadsAllProducts(idDeposit);

    if (!quantitiesOfProducts) throw new MyCustomError(badRequestError("No product quantity values in the database."));

    const divergences: DifferencesProductsQuantitiesT[] = [];
    for (const product of quantitiesOfProducts) {
        const beforeBalanceQuantity = product.saldo_fisico;
        const afterBalanceQuantity = product.produtos.contagem_estoque?.quantidade_lida || 0;

        if (beforeBalanceQuantity !== afterBalanceQuantity) {
            divergences.push({
                id_produto: product.id_produto,
                id_deposito: idDeposit,
                saldo_antes: beforeBalanceQuantity,
                saldo_depois: afterBalanceQuantity,
            });
        }
    }

    productsRepositorie.createDifferencesProductsQuantities(divergences);

    return divergences;
}

async function createFinalBalanceFile(idDeposit: number): Promise<string> {
    const quantitiesAllProducts = await productsRepositorie.getProductBalanceStructure(idDeposit);

    const productsInCSVStructure: ProductBalanceStructureT[] = [];

    for (const product of quantitiesAllProducts) {
        const structure: ProductBalanceStructureT = {
            "ID Produto": product.id_bling,
            "Codigo produto": product.codigo,
            GTIN: product.gtin,
            "Descrição Produto": product.nome,
            Depósito: product.produtos_estoques[0].produtos_depositos.descricao,
            Balanço: product.contagem_estoque?.quantidade_lida || 0,
            "Preço Unitário": product.produto_fornecedor[0].preco_compra,
            "Preço de Custo": product.produto_fornecedor[0].preco_custo,
            Observação: "",
            Data: "",
        };
        productsInCSVStructure.push(structure);
    }

    const balanceCSV = jsonToCsv(productsInCSVStructure);

    return balanceCSV;
}

async function getBalancesInfos(): Promise<AllBalancePerDayDepositT[]> {
    const allBalances = await productsRepositorie.getAllBalancePerDayDeposit();

    const balancesRight = allBalances.map((balance) => ({
        id: balance.id_deposito,
        nome: balance.produtos_depositos.descricao,
        data: balance.date,
    }));

    return balancesRight;
}

async function getDivergentProducts(idDeposit: number, date: Date): Promise<DivergentroductsT[]> {
    const divergentProducts = await productsRepositorie.getAllProductsWDivergences(idDeposit, date);

    const divergentProductsRight = divergentProducts.map((product) => ({
        id_produto: product.id_produto,
        codigo: product.produtos.codigo,
        nome: product.produtos.nome,
        saldo_antes: product.saldo_antes,
        saldo_depois: product.saldo_depois,
        dir_image: product.produtos.produtos_midias?.diretorio_local,
    }));

    divergentProductsRight.sort((a, b) => {
        const aDiferenca = a.saldo_depois - a.saldo_antes;
        const bDiferenca = b.saldo_depois - b.saldo_antes;

        return aDiferenca - bDiferenca;
    });

    return divergentProductsRight;
}

async function deleteCountsProductsBalance() {
    const queryReponse = await productsRepositorie.deleteAllCountsStock();
    return queryReponse;
}

export {
    getProductsForCount,
    postProductsCount,
    compareQuantitiesProducts,
    createFinalBalanceFile,
    getBalancesInfos,
    getDivergentProducts,
    deleteCountsProductsBalance,
};
