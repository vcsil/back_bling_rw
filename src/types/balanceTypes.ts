type ProductsBalance = {
    id_bling: bigint;
    nome: string;
    codigo: string;
    preco: number;
    produtos_midias: {
        url: string | null;
        diretorio_local: string | null;
    } | null;
    produtos_estoques: {
        saldo_fisico: number;
    }[];
};

type ProductsBalanceParams = {
    idDeposit: string;
    codeProduct: string;
};

type ConferenceProductsT = Record<string, { quantity: number; code: string; name: string }>;

type ProductCompareT = {
    id_produto: number;
    codigo: string;
    quantityRead: number;
};

type ProductsFromCountT = {
    id: number;
    id_produto: bigint;
    codigo: string;
    quantidade_lida: number;
    datetime: Date;
};

type QuantityAllProductsT = {
    id_produto: bigint;
    produtos: {
        contagem_estoque: {
            quantidade_lida: number;
        } | null;
    };
    saldo_fisico: number;
};

type DifferencesProductsQuantitiesT = {
    id_produto: bigint;
    id_deposito: number;
    saldo_antes: number;
    saldo_depois: number;
};

type DBProductBalanceStructureT = {
    id_bling: bigint;
    codigo: string;
    gtin: string | null;
    nome: string;
    contagem_estoque: {
        quantidade_lida: number;
    } | null;
    produtos_estoques: {
        produtos_depositos: {
            descricao: string;
        };
    }[];
    produto_fornecedor: {
        preco_custo: number;
        preco_compra: number;
    }[];
};

type ProductBalanceStructureT = {
    "ID Produto": bigint;
    "Codigo produto": string;
    GTIN: string | null;
    "Descrição Produto": string;
    Depósito: string;
    Balanço: number;
    "Preço Unitário": number;
    "Preço de Custo": number;
    Observação: string;
    Data: string;
};

type GetAllBalancePerDayDepositT = {
    id_deposito: bigint;
    date: Date;
    produtos_depositos: {
        descricao: string;
    };
};

type AllBalancePerDayDepositT = {
    id: bigint;
    nome: string;
    data: Date;
};

type AllProductsWDivergencesT = {
    id_produto: bigint;
    saldo_antes: number;
    saldo_depois: number;
    produtos: {
        nome: string;
        codigo: string;
        produtos_midias: {
            diretorio_local: string | null;
        } | null;
    };
};

type DivergentroductsT = {
    id_produto: bigint;
    codigo: string;
    nome: string;
    saldo_antes: number;
    saldo_depois: number;
    dir_image: string | null | undefined;
};

export {
    ProductsBalance,
    ProductsBalanceParams,
    ConferenceProductsT,
    ProductCompareT,
    ProductsFromCountT,
    QuantityAllProductsT,
    DifferencesProductsQuantitiesT,
    DBProductBalanceStructureT,
    ProductBalanceStructureT,
    GetAllBalancePerDayDepositT,
    AllBalancePerDayDepositT,
    AllProductsWDivergencesT,
    DivergentroductsT,
};
