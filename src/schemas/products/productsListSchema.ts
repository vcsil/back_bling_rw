import joi from "joi";

import { PageQueryParams } from "../../types/utilsTypes";
import { ProductsListParams, OrderKeyT } from "../../types/productsType";

const stringOfNumbeRegex = /^\d+$/;

const productsFilterParamsSchema = joi.object<ProductsListParams>({
    idDeposit: joi.string().pattern(stringOfNumbeRegex, { name: "idDeposit" }).required(),
    idCategory: joi.string().pattern(stringOfNumbeRegex, { name: "idCategory" }),
});

const productsPageSortingQuerySchema = joi.object<PageQueryParams & { order: OrderKeyT }>({
    page: joi.string().pattern(stringOfNumbeRegex, { name: "page" }).required(),
    take: joi.string().pattern(stringOfNumbeRegex, { name: "takeUnit" }).valid("6", "18", "48", "96").required(),
    order: joi.string().valid("oldest", "latest", "lowestPrice", "highestPrice").required(),
});

export { productsFilterParamsSchema, productsPageSortingQuerySchema };
