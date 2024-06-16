import { Router } from "express";

import * as depositsController from "../controllers/depositsController";

const depositsRouter = Router();

depositsRouter.get("/", depositsController.getDeposits);

export default depositsRouter;
