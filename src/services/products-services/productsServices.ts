import * as productsRepositorie from "../../repositories/products-repositories/productsRepositories";
import {
    CategoryWSonT,
    GetManyProductsProps,
    OrderModesT,
    ProductsListT,
    ProductsQuantityPerDepositT,
    SortOptionsT,
} from "../../types/productsType";

const sortOptions: SortOptionsT = {
    oldest: { id_bling: "asc" },
    latest: { id_bling: "desc" },
    lowestPrice: { preco: "asc" },
    highestPrice: { preco: "desc" },
};

function productListStructure(product: ProductsQuantityPerDepositT): ProductsListT {
    return {
        id_produto: product.id_bling,
        codigo: product.codigo,
        nome: product.nome,
        saldo: product.produtos_estoques[0]?.saldo_fisico || 0,
        preco: product.preco,
        dir_image: product.produtos_midias?.diretorio_local || "",
        filhos: product.other_produtos
            .map((productSon) => ({
                id_produto: productSon.id_bling,
                codigo: productSon.codigo,
                nome: productSon.nome,
                saldo: productSon.produtos_estoques[0].saldo_fisico,
                preco: productSon.preco,
                dir_image: productSon.produtos_midias?.diretorio_local || "",
            }))
            .sort((a, b) => a.nome.localeCompare(b.nome)),
    };
}

async function getCategories(): Promise<CategoryWSonT[]> {
    const categories = await productsRepositorie.getAllCategories();

    const mapaCategorias: { [id: number]: CategoryWSonT } = {};
    // Adicionar todas as categorias ao mapa com a estrutura inicial
    categories.forEach((categoria) => {
        mapaCategorias[categoria.id_categoria] = { ...categoria, filhos: [] };
    });

    // Organizar em uma árvore
    const raiz: CategoryWSonT[] = [];
    categories.forEach((categoria) => {
        if (categoria.id_categoria_pai) {
            // Adicionar como filho do pai correspondente
            mapaCategorias[categoria.id_categoria_pai]?.filhos.push(mapaCategorias[categoria.id_categoria]);
        } else {
            // Categoria sem pai vai para a raiz
            raiz.push(mapaCategorias[categoria.id_categoria]);
        }
    });

    return raiz;
}

async function getProductsQuantityPerDepositAndCategory({
    idDeposit,
    idCategory,
    page,
    takeUnits,
    order,
}: GetManyProductsProps): Promise<ProductsListT[]> {
    const sortBy: OrderModesT = sortOptions[order];

    const allProducts = await productsRepositorie.getAllProductsQuantityPerDepositAndCategory({
        idDeposit,
        idCategory,
        takeUnits,
        page,
        order: sortBy,
    });

    const productsList = allProducts.map((product) => productListStructure(product));

    return productsList;
}

async function getProductsTotalQuantity(idCategory: number | undefined, text: string) {
    const countProductTotal = await productsRepositorie.getProductsTotalQuantity(idCategory, text || "");

    return countProductTotal;
}

async function searchingProducts({
    idDeposit,
    idCategory,
    page,
    takeUnits,
    order,
    text,
}: GetManyProductsProps & { text: string }): Promise<ProductsListT[]> {
    const sortBy: OrderModesT = sortOptions[order];

    const allProducts = await productsRepositorie.getProductsBySearch({
        idDeposit,
        idCategory,
        page,
        takeUnits,
        order: sortBy,
        text,
    });

    const productsList = allProducts.map((product) => productListStructure(product));

    return productsList;
}

async function getProductsForCatalogPerDepositAndCategory({
    idDeposit,
    idCategory,
    page,
    takeUnits,
    order,
}: GetManyProductsProps): Promise<ProductsListT[]> {
    const sortBy: OrderModesT = sortOptions[order];

    const allProducts = await productsRepositorie.getAllProductsForCatalogPerDepositAndCategory({
        idDeposit,
        idCategory,
        takeUnits,
        page,
        order: sortBy,
    });

    const productsList = allProducts.map((product) => productListStructure(product));

    return productsList;
}

async function getProductsCatalogTotalQuantity(idCategory: number | undefined, idDeposit: number, text: string) {
    const countProductTotal = await productsRepositorie.getProductsCatalogTotalQuantity(idCategory, idDeposit, text);

    return countProductTotal;
}

async function searchingCatalogProducts({
    idDeposit,
    idCategory,
    page,
    takeUnits,
    order,
    text,
}: GetManyProductsProps & { text: string }): Promise<ProductsListT[]> {
    const sortBy: OrderModesT = sortOptions[order];

    const allProducts = await productsRepositorie.getCatalogProductsBySearch({
        idDeposit,
        idCategory,
        page,
        takeUnits,
        order: sortBy,
        text,
    });

    const productsList = allProducts.map((product) => productListStructure(product));

    return productsList;
}

export {
    getCategories,
    getProductsQuantityPerDepositAndCategory,
    getProductsTotalQuantity,
    searchingProducts,
    getProductsForCatalogPerDepositAndCategory,
    getProductsCatalogTotalQuantity,
    searchingCatalogProducts,
};
