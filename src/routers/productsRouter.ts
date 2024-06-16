import { Router } from "express";

import * as productsController from "../controllers/productsController";

import validateSchema from "../middlewares/schemaValidationMiddleware";
import { productBalanceParamsSchema } from "../schemas/productsSchema";

const productsRouter = Router();

productsRouter.get(
    "/balance/:idDeposit/:codeProduct",
    validateSchema(productBalanceParamsSchema, "params"),
    productsController.productsBalance,
);

export default productsRouter;
