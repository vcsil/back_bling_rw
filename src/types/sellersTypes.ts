export interface ActiveSellersDB {
    id_bling: bigint;
    contatos: {
        nome: string;
        sobrenome: string;
        fantasia: string | null;
    };
}
