import joi from "joi";

import { DateRangeT, DateRangesT } from "../types/utilsTypes";

const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;

const dateSchema = joi.string().pattern(dateFormatRegex, { name: "dateSchema" });

const dateRangeSchema = joi.object<DateRangeT>({
    from: dateSchema.required(),
    to: dateSchema.required(),
});

const dateRangesMainCompareSchema = joi.object<DateRangesT>({
    main: dateRangeSchema.required(),
    compare: dateRangeSchema.required(),
});

export default dateRangesMainCompareSchema;
