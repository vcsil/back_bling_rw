import { Request, Response } from "express";
import * as sellersServices from "../services/sellers-services/sellersServices";

async function getActiveSellers(_req: Request, res: Response) {
    const allActiveDeposits = await sellersServices.getAllActiveSellers();

    return res.send(allActiveDeposits);
}

async function getSellerById(req: Request, res: Response) {
    const { idSeller } = req.params;

    const seller = await sellersServices.getSellerById(Number(idSeller));

    return res.send(seller);
}

export { getActiveSellers, getSellerById };
