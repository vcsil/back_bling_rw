import joi from "joi";

import { DateRangesStringT } from "../types/utilsTypes";

const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;

const dateSchema = joi.string().pattern(dateFormatRegex, { name: "dateSchema" });

const dateRangesMainCompareSchema = joi.object<DateRangesStringT>({
    mainDateFrom: dateSchema.required(),
    mainDateTo: dateSchema.required(),
    compareDateFrom: dateSchema.required(),
    compareDateTo: dateSchema.required(),
});

export default dateRangesMainCompareSchema;
