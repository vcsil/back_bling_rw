import { Router } from "express";

import * as productsController from "../controllers/productsController";

const productsRouter = Router();

productsRouter.get("/balance/:idDeposit/:codeProduct", productsController.productsBalance);

export default productsRouter;
