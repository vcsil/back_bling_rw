import * as productsRepositorie from "../../repositories/products-repositories/productsRepositories";

async function getProductsForBalance(idDeposit: number, codeProduct: string) {
    return productsRepositorie.productsForBalance(idDeposit, codeProduct);
}

export { getProductsForBalance };
