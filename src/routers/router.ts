import { Router } from "express";
import calculatorRouter from "./calculatorRouter";
import dashboardRouter from "./dashboardRouter";
import depositsRouter from "./depositsRouter";
import productsRouter from "./routersProducts/productsRouter";

const router = Router();

router.use("/calculator", calculatorRouter);
router.use("/dashboard", dashboardRouter);
router.use("/deposits", depositsRouter);
router.use("/products", productsRouter);

export default router;
