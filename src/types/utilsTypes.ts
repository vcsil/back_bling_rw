export type DateRangeT = {
    from: Date;
    to: Date;
};

export type DateRangesSituationsT = {
    main: DateRangeT;
    compare: DateRangeT;
    situationsSales: number[];
};

export type MainCardsQueryParams = {
    mainDateFrom: string;
    mainDateTo: string;
    compareDateFrom: string;
    compareDateTo: string;
    situationsSales: string[];
};

export type DateRangeStringT = {
    from: string;
    to: string;
};

export type OrderSalesInPeriodQueryParams = {
    from: string;
    to: string;
    situationsSales: string[];
};

export type RevenueQueryParams = {
    mainDateFrom: string;
    mainDateTo: string;
    compareDateFrom: string;
    compareDateTo: string;
};
