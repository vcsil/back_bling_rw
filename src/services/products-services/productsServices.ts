import * as productsRepositorie from "../../repositories/products-repositories/productsRepositories";
import { MyCustomError, badRequestError } from "../../utils/errorUtils";

async function getProductsForBalance(idDeposit: number, codeProduct: string) {
    const product = await productsRepositorie.productsForBalance(idDeposit, codeProduct);

    if (!product?.produtos_estoques.length) throw new MyCustomError(badRequestError("Product out of stock. Check the registration."));

    return product;
}

export { getProductsForBalance };
