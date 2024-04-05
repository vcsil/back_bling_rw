import { Router } from "express";

import validateSchema from "../middlewares/schemaValidationMiddleware";
import dateRangesMainCompareSchema from "../schemas/dashboardSchemas";
import { mainCards, orderSituations, lastUpdateTime } from "../controllers/dashboardController";

const dashboardRouter = Router();

dashboardRouter.get("/last-update-time", lastUpdateTime);
dashboardRouter.get("/main-cards", validateSchema(dateRangesMainCompareSchema, "query"), mainCards);
dashboardRouter.get("/situations", orderSituations);

export default dashboardRouter;
