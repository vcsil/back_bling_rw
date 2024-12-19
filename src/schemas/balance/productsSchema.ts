import joi from "joi";

import { ProductsBalanceParams } from "../../types/balanceTypes";

const stringOfNumbeRegex = /^\d+$/;

const productBalanceParamsSchema = joi.object<ProductsBalanceParams>({
    idDeposit: joi.string().pattern(stringOfNumbeRegex, { name: "idDeposit" }).required(),
    codeProduct: joi.string().required(),
});

export { productBalanceParamsSchema };
