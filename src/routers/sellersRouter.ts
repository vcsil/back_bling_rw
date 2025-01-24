import { Router } from "express";

import * as sellersController from "../controllers/sellersController";

const sellerRouter = Router();

sellerRouter.get("/", sellersController.getActiveSellers);

sellerRouter.get("/:idSeller", sellersController.getSellerById);

export default sellerRouter;
