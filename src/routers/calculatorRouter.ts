import { Router } from "express";

import * as calculatorController from "../controllers/calculator-controller";

const calculatorRouter = Router();

calculatorRouter.get("/", calculatorController.convertCLTToPJ);

export default calculatorRouter;
