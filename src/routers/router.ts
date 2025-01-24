import { Router } from "express";
import productsRouter from "./routersProducts/productsRouter";
import calculatorRouter from "./calculatorRouter";
import dashboardRouter from "./dashboardRouter";
import depositsRouter from "./depositsRouter";
import sellerRouter from "./sellersRouter";
import salesRouter from "./salesRouter";

const router = Router();

router.use("/calculator", calculatorRouter);
router.use("/dashboard", dashboardRouter);
router.use("/deposits", depositsRouter);
router.use("/products", productsRouter);
router.use("/sellers", sellerRouter);
router.use("/sales", salesRouter);

export default router;
