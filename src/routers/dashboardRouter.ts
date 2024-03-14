import { Router } from "express";

import validateSchema from "../middlewares/schemaValidationMiddleware";
import dateRangesMainCompareSchema from "../schemas/dashboardSchemas";
import mainCards from "../controllers/dashboardController";

const dashboardRouter = Router();

dashboardRouter.get("/main-cards", validateSchema(dateRangesMainCompareSchema, "body"), mainCards);

export default dashboardRouter;
