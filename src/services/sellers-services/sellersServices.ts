import * as sellerRepositorie from "../../repositories/sellers-repositories/sellersRepositories";
import { ActiveSellersDB } from "../../types/sellersTypes";

function formatSellerList(seller: ActiveSellersDB) {
    return {
        id_vendedor: seller.id_bling,
        nome: `${seller.contatos.nome} ${seller.contatos.sobrenome}`.trim(),
        fantasia: seller.contatos.fantasia || "",
    };
}

async function getAllActiveSellers() {
    const sellers = await sellerRepositorie.getActiveSellers();

    const sellersList = sellers.map((seller) => formatSellerList(seller));
    return sellersList;
}

async function getSellerById(idSeller: number) {
    const seller = await sellerRepositorie.getSellerById(idSeller);

    return seller ? formatSellerList(seller) : seller;
}

export { getAllActiveSellers, getSellerById };
