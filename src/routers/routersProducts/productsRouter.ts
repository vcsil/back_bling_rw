import { Router } from "express";

import { productsFilterParamsSchema, productsPageSortingQuerySchema } from "../../schemas/products/productsListSchema";
import validateProductDeposityANDCategory from "../../middlewares/products/productsCheckCategoryMiddleware";
import validateProductCategory from "../../middlewares/products/productsTotalQuantityMiddleware";
import * as productsController from "../../controllers/controllersProducts/productsController";
import { productsSearchQuerySchema } from "../../schemas/products/productsSearchSchema";
import validateSchema from "../../middlewares/schemaValidationMiddleware";
import balanceRouter from "./balanceRouter";

const productsRouter = Router();

productsRouter.use("/balance", balanceRouter);

// Pega todas as categorias de produtos
productsRouter.get("/categories", productsController.sendAllCategories);

// Pega os produtos e saldos por depositos
productsRouter.get(
    "/list/:idDeposit",
    validateSchema(productsFilterParamsSchema, "params"),
    validateSchema(productsPageSortingQuerySchema, "query"),
    validateProductDeposityANDCategory,
    productsController.getProductsQuantityPerDepositAndCategory,
);

// Pega os produtos e saldos por depositos e categoria
productsRouter.get(
    "/list/:idDeposit/:idCategory",
    validateSchema(productsFilterParamsSchema, "params"),
    validateSchema(productsPageSortingQuerySchema, "query"),
    validateProductDeposityANDCategory,
    productsController.getProductsQuantityPerDepositAndCategory,
);

// Pega a quantidade total de produtos por categoria e texto de busca
productsRouter.get("/total", validateProductCategory, productsController.sendTotalProducts);

// Busca produtos e saldo por deposito
productsRouter.get(
    "/search/:idDeposit",
    validateSchema(productsFilterParamsSchema, "params"),
    validateSchema(productsSearchQuerySchema, "query"),
    validateProductDeposityANDCategory,
    productsController.getProductsBySearch,
);

// Busca produtos e saldo por deposito e categoria
productsRouter.get(
    "/search/:idDeposit/:idCategory",
    validateSchema(productsFilterParamsSchema, "params"),
    validateSchema(productsSearchQuerySchema, "query"),
    validateProductDeposityANDCategory,
    productsController.getProductsBySearch,
);

export default productsRouter;
