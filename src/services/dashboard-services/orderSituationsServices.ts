import * as orderSituationsRepositores from "../../repositories/dashboardRepositories/orderSituationsRepositories";
import { OrderSituationsT } from "../../types/dashboardTypes";

async function getOrderSituations(): Promise<OrderSituationsT[]> {
    return orderSituationsRepositores.getAllOrderSituations();
}

export { getOrderSituations };
