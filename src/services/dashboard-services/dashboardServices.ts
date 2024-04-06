import * as dashboardRepositories from "../../repositories/dashboardRepositories/dashboardRepositories";
import { DateRangeT } from "../../types/utilsTypes";

async function lastUpdateTime() {
    const datetimeFromDB = await dashboardRepositories.getLastUpdateTime();

    const updateTime = datetimeFromDB ? datetimeFromDB.datetime : new Date();

    return updateTime;
}

async function blingOrderStatusPerPeriod(rangeDate: DateRangeT) {
    const blingOrderStatus = await dashboardRepositories.getBlingStatus(rangeDate);
    const totalOrders = blingOrderStatus.reduce((total, item) => total + Number(item.total), 0);

    return { blingOrderStatus, total: totalOrders };
}

export { lastUpdateTime, blingOrderStatusPerPeriod };
