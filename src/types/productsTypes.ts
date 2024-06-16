type ProductsBalance = {
    id_bling: bigint;
    nome: string;
    codigo: string;
    preco: number;
    produtos_midias: {
        url: string | null;
    } | null;
    produtos_estoques: {
        saldo_fisico: number;
    }[];
};

export { ProductsBalance };
