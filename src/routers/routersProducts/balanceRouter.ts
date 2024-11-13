import { Router } from "express";

import * as balanceController from "../../controllers/controllersProducts/balanceController";

import validateSchema from "../../middlewares/schemaValidationMiddleware";
import { productBalanceParamsSchema } from "../../schemas/productsSchema";
import validateProductsBalance from "../../middlewares/products/productsBalanceMiddleware";

const balanceRouter = Router();

// Devolve informações do produto e quantidade para inserir no balanço
balanceRouter.get(
    "/product/:idDeposit/:codeProduct",
    validateSchema(productBalanceParamsSchema, "params"),
    validateProductsBalance,
    balanceController.productsBalance,
);

// Salva as contagens no banco de dados
balanceRouter.post("/save", balanceController.saveStock);

// Compara as quantidades e salva divergencia na tabela de registro de comparacao
balanceRouter.post("/compare/:idDeposit", balanceController.compareQuantities);

// Gera um arquvio semelhante ao saldos de estoque
balanceRouter.get("/download/:idDeposit", balanceController.saveBalanceOnBling);

// Pega os depósito separados por dia e deposito
balanceRouter.get("/balances", balanceController.getAllBalancePerDayAndDeposit);

// Pega os produtos com divergencias de saldos
balanceRouter.get("/divergences/:idDeposit/:dateBalance", balanceController.getDivergentProducts);

export default balanceRouter;
