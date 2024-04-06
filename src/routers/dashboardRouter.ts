import { Router } from "express";

import validateSchema from "../middlewares/schemaValidationMiddleware";
import { dateRangesMainCompareSchema, dateRangeSchema, dateRangeSituationsSalesSchema } from "../schemas/dashboardSchemas";
import { mainCards, orderSituations, lastUpdateTime, orderStatus, orderSalesInPeriod } from "../controllers/dashboardController";

const dashboardRouter = Router();

dashboardRouter.get("/last-update-time", lastUpdateTime);
dashboardRouter.get("/main-cards", validateSchema(dateRangesMainCompareSchema, "query"), mainCards);
dashboardRouter.get("/situations", orderSituations);
dashboardRouter.get("/order-status", validateSchema(dateRangeSchema, "query"), orderStatus);
dashboardRouter.get("/order-per-day", validateSchema(dateRangeSituationsSalesSchema, "query"), orderSalesInPeriod);

export default dashboardRouter;
