type DBCategoryT = {
    id_bling: bigint;
    nome: string;
} | null;

type CategoryT = {
    id_categoria: number;
    nome_categoria: string;
    id_categoria_pai: number;
    caminho_categoria: string;
};

interface CategoryWSonT extends CategoryT {
    filhos: CategoryT[];
}

type ProductsListParams = {
    idDeposit: string;
    idCategory: string;
};

type OrderKeyT = "oldest" | "latest" | "lowestPrice" | "highestPrice";

type OrderModesT = { id_bling: "desc" } | { id_bling: "asc" } | { preco: "desc" } | { preco: "asc" };

type GetManyProductsProps = {
    idDeposit: number;
    idCategory: number | undefined;
    takeUnits: number;
    page: number;
    order: OrderKeyT;
};

type GetManyProductsQueryProps = {
    idDeposit: number;
    idCategory: number | undefined;
    takeUnits: number;
    page: number;
    order: OrderModesT;
};

type SortOptionsT = {
    oldest: { id_bling: "asc" };
    latest: { id_bling: "desc" };
    lowestPrice: { preco: "asc" };
    highestPrice: { preco: "desc" };
};

type ProductQuantityPerDepositT = {
    id_bling: bigint;
    nome: string;
    codigo: string;
    preco: number;
    produtos_estoques: {
        saldo_fisico: number;
    }[];
    produtos_midias: {
        diretorio_local: string | null;
    } | null;
};

type ProductsQuantityPerDepositT = ProductQuantityPerDepositT & { other_produtos: ProductQuantityPerDepositT[] };

type ProductListT = {
    id_produto: bigint;
    codigo: string;
    nome: string;
    saldo: number;
    preco: number;
    dir_image: string | null | undefined;
};

type ProductsListT = ProductListT & { filhos: ProductListT[] };

type ProductsSearchQueryT = {
    text: string;
};

export {
    DBCategoryT,
    CategoryT,
    CategoryWSonT,
    ProductsListParams,
    OrderKeyT,
    OrderModesT,
    GetManyProductsProps,
    GetManyProductsQueryProps,
    SortOptionsT,
    ProductQuantityPerDepositT,
    ProductsQuantityPerDepositT,
    ProductsListT,
    ProductsSearchQueryT,
};
