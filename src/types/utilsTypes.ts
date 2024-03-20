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
    situationsSales: string;
};

export type DateRangeStringT = {
    from: string;
    to: string;
};
