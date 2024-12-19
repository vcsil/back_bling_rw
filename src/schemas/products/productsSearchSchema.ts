import joi from "joi";

import { productsPageSortingQuerySchema } from "./productsListSchema";

const productsSearchQuerySchema = productsPageSortingQuerySchema.concat(
    joi.object({
        text: joi.string().required(),
    }),
);

export { productsSearchQuerySchema };
