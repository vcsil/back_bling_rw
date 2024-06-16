import * as depositRepositorie from "../../repositories/deposits-repositories/depositsRepositorie";

async function getAllDeposits() {
    const deposits = await depositRepositorie.getDepositsActive();

    const renamedDeposits = deposits.map((obj) => ({
        id: obj.id_bling,
        nome: obj.descricao,
    }));
    return renamedDeposits;
}

export { getAllDeposits };
