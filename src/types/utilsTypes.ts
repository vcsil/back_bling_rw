export type DateRangeT = {
    from: Date;
    to: Date;
};

export type DateRangesT = {
    main: DateRangeT;
    compare: DateRangeT;
};

export type DateRangesStringT = {
    mainDateFrom: string;
    mainDateTo: string;
    compareDateFrom: string;
    compareDateTo: string;
};

export type DateRangeStringT = {
    from: string;
    to: string;
};
