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

export { MainCardsReturnT, OrderSituationsT, LastUpdateTime };
