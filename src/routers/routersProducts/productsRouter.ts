import { Router } from "express";

import balanceRouter from "./balanceRouter";

const productsRouter = Router();

productsRouter.use("/balance", balanceRouter);

export default productsRouter;
