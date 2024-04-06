type MainCardsReturnT = {
    amount: number;
    oldAmount: number;
    percent: number;
};

type OrderSituationsT = {
    id: bigint;
    nome: string;
};

type LastUpdateTime = {
    id: number;
    datetime: Date;
};

type BlingStatus = {
    nome: string;
    cor: string;
    total: string;
};

export { MainCardsReturnT, OrderSituationsT, LastUpdateTime, BlingStatus };
