import { Router } from "express";
import calculatorRouter from "./calculatorRouter";
import dashboardRouter from "./dashboardRouter";

const router = Router();

router.use("/calculator", calculatorRouter);
router.use("/dashboard", dashboardRouter);

export default router;
