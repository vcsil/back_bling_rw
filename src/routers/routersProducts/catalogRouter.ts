import { Router } from "express";

import { productsFilterParamsSchema, productsPageSortingQuerySchema } from "../../schemas/products/productsListSchema";
import validateProductDeposityANDCategory from "../../middlewares/products/productsCheckCategoryMiddleware";
import validateProductCategory from "../../middlewares/products/productsTotalQuantityMiddleware";
import * as productsController from "../../controllers/controllersProducts/productsController";
import { productsSearchQuerySchema } from "../../schemas/products/productsSearchSchema";
import validateSchema from "../../middlewares/schemaValidationMiddleware";

const catalogRouter = Router();

// Pega os produtos para catálogo. Com saldo e foto
catalogRouter.get(
    "/list/:idDeposit",
    validateSchema(productsFilterParamsSchema, "params"),
    validateSchema(productsPageSortingQuerySchema, "query"),
    validateProductDeposityANDCategory,
    productsController.getProductsForCatalogPerDepositAndCategory,
);

// Pega os produtos para catálogo por categoria. Com saldo e foto
catalogRouter.get(
    "/list/:idDeposit/:idCategory",
    validateSchema(productsFilterParamsSchema, "params"),
    validateSchema(productsPageSortingQuerySchema, "query"),
    validateProductDeposityANDCategory,
    productsController.getProductsForCatalogPerDepositAndCategory,
);

// Pega a quantidade total de produtos para catálogo por categoria e texto de busca
catalogRouter.get("/total/:idDeposit", validateProductCategory, productsController.sendTotalProductsCatalog);

// Busca produtos do catalogo por por deposito
catalogRouter.get(
    "/search/:idDeposit",
    validateSchema(productsFilterParamsSchema, "params"),
    validateSchema(productsSearchQuerySchema, "query"),
    validateProductDeposityANDCategory,
    productsController.getCatalogProductsBySearch,
);

// Busca produtos do catalogo por por deposito e categoria
catalogRouter.get(
    "/search/:idDeposit/:idCategory",
    validateSchema(productsFilterParamsSchema, "params"),
    validateSchema(productsSearchQuerySchema, "query"),
    validateProductDeposityANDCategory,
    productsController.getCatalogProductsBySearch,
);

export default catalogRouter;
