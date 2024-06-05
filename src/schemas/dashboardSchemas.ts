import joi from "joi";

import { DateRangeT, MainCardsQueryParams, OrderSalesInPeriodQueryParams } from "../types/utilsTypes";

const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;

const dateSchema = joi.string().pattern(dateFormatRegex, { name: "dateSchema" });

const datesRangesSituationsSchema = joi.object<MainCardsQueryParams>({
    mainDateFrom: dateSchema.required(),
    mainDateTo: dateSchema.required(),
    compareDateFrom: dateSchema.required(),
    compareDateTo: dateSchema.required(),
    situationsSales: joi.array().items(joi.string()).required(),
});

const dateRangeSchema = joi.object<DateRangeT>({
    from: dateSchema.required(),
    to: dateSchema.required(),
});

const dateRangeSituationsSalesSchema = joi.object<OrderSalesInPeriodQueryParams>({
    from: dateSchema.required(),
    to: dateSchema.required(),
    situationsSales: joi.array().items(joi.string()).required(),
});

const datesRangesSchema = joi.object<MainCardsQueryParams>({
    mainDateFrom: dateSchema.required(),
    mainDateTo: dateSchema.required(),
    compareDateFrom: dateSchema.required(),
    compareDateTo: dateSchema.required(),
});

export { datesRangesSituationsSchema, dateRangeSchema, dateRangeSituationsSalesSchema, datesRangesSchema };
