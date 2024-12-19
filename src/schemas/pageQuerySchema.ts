import joi from "joi";

import { PageQueryParams } from "../types/utilsTypes";

const stringOfNumbeRegex = /^\d+$/;

const pageQuerySchema = joi.object<PageQueryParams>({
    page: joi.string().pattern(stringOfNumbeRegex, { name: "page" }).required(),
    take: joi.string().pattern(stringOfNumbeRegex, { name: "takeUnit" }).valid("6", "18", "48", "96").required(),
});

export { pageQuerySchema };
