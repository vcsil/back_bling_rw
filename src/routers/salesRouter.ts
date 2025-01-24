import { Router } from "express";

import * as salesController from "../controllers/salesController";

const salesRouter = Router();

salesRouter.get("/situations", salesController.getSaleSituations);

salesRouter.get("/situations/:idSaleSituation", salesController.getSaleSituationById);

salesRouter.get("/situations-seller/:idSeller", salesController.getSalesSituationsPerSeller);

salesRouter.get("/day-seller/:idSeller", salesController.getSalesPerDayANDSeller);

salesRouter.get("/totals/:idSeller", salesController.getTotalPerDayANDSeller);

export default salesRouter;
