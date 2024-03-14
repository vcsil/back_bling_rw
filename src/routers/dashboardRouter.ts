import { Router } from "express";

import validateSchema from "../middlewares/schemaValidationMiddleware";
import dateRangesMainCompareSchema from "../schemas/dashboardSchemas";
import { mainCards, orderSituations } from "../controllers/dashboardController";

const dashboardRouter = Router();

dashboardRouter.get("/main-cards", validateSchema(dateRangesMainCompareSchema, "body"), mainCards);
dashboardRouter.get("/situations", orderSituations);

export default dashboardRouter;
