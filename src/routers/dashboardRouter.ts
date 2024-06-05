import { Router } from "express";

import validateSchema from "../middlewares/schemaValidationMiddleware";
import {
    datesRangesSituationsSchema,
    dateRangeSchema,
    dateRangeSituationsSalesSchema,
    datesRangesSchema,
} from "../schemas/dashboardSchemas";
import {
    mainCards,
    orderSituations,
    lastUpdateTime,
    orderStatus,
    orderSalesInPeriod,
    revenueCards,
} from "../controllers/dashboardController";

const dashboardRouter = Router();

dashboardRouter.get("/last-update-time", lastUpdateTime);
dashboardRouter.get("/main-cards", validateSchema(datesRangesSituationsSchema, "query"), mainCards);
dashboardRouter.get("/situations", orderSituations);
dashboardRouter.get("/order-status", validateSchema(dateRangeSchema, "query"), orderStatus);
dashboardRouter.get("/order-per-day", validateSchema(dateRangeSituationsSalesSchema, "query"), orderSalesInPeriod);
dashboardRouter.get("/revenue-cards", validateSchema(datesRangesSchema, "query"), revenueCards);

export default dashboardRouter;
