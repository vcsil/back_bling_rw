import joi from "joi";

import { MainCardsQueryParams } from "../types/utilsTypes";

const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
const arrayRegex = /^\[(["]\d+["](?:,\s*["]\d+["])*)?\]$/;

const dateSchema = joi.string().pattern(dateFormatRegex, { name: "dateSchema" });

const dateRangesMainCompareSchema = joi.object<MainCardsQueryParams>({
    mainDateFrom: dateSchema.required(),
    mainDateTo: dateSchema.required(),
    compareDateFrom: dateSchema.required(),
    compareDateTo: dateSchema.required(),
    situationsSales: joi.string().pattern(arrayRegex, { name: "arrayRegex" }).required(),
});

export default dateRangesMainCompareSchema;
