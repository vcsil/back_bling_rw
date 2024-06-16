import { Request, Response } from "express";
import * as depositsServices from "../services/deposits-services/depositsServices";

async function getDeposits(_req: Request, res: Response) {
    const allActiveDeposits = await depositsServices.getAllDeposits();

    return res.send(allActiveDeposits);
}

export { getDeposits };
