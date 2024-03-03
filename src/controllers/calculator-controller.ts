import { Request, Response } from "express";

function convertCLTToPJ(req: Request, res: Response) {
    const {salary} = req.query

    const newSalary = Number(salary) + (Number(salary) * 0.3)
    
    return (
        res.send(`Seu salario dever ser: ${newSalary}`)
    )
}

export {
    convertCLTToPJ
}