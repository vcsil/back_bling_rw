import { Router } from "express";

import * as productsController from "../controllers/productsController";

import validateSchema from "../middlewares/schemaValidationMiddleware";
import { productBalanceParamsSchema } from "../schemas/productsSchema";
import validateProductsBalance from "../middlewares/products/productsBalanceMiddleware";

const productsRouter = Router();

productsRouter.get(
    "/balance/:idDeposit/:codeProduct",
    validateSchema(productBalanceParamsSchema, "params"),
    validateProductsBalance,
    productsController.productsBalance,
);

export default productsRouter;
