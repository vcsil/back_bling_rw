import * as dashboardRepositories from "../../repositories/dashboardRepositories/dashboardRepositories";

async function lastUpdateTime() {
    const datetimeFromDB = await dashboardRepositories.getLastUpdateTime();

    const updateTime = datetimeFromDB ? datetimeFromDB.datetime : new Date();

    return updateTime;
}

export { lastUpdateTime };
