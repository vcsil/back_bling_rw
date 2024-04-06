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

type SalesPerDayInPeriodT = {
    dia: Date;
    total_vendas: number;
};

export { MainCardsReturnT, OrderSituationsT, LastUpdateTime, BlingStatus, SalesPerDayInPeriodT };
