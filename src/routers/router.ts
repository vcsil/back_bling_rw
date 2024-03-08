import { Router } from "express";
import calculatorRouter from "./calculatorRouter";

const router = Router();

router.use("/calculator", calculatorRouter);

export default router;
