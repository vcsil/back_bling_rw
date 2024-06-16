import { Router } from "express";
import calculatorRouter from "./calculatorRouter";
import dashboardRouter from "./dashboardRouter";
import depositsRouter from "./depositsRouter";

const router = Router();

router.use("/calculator", calculatorRouter);
router.use("/dashboard", dashboardRouter);
router.use("/deposits", depositsRouter);

export default router;
