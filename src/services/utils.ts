import { DateRangeStringT, DateRangeT } from "../types/utilsTypes";
import { MyCustomError, badRequestError } from "../utils/errorUtils";

function addMinutes(date: Date, minutes: number): Date {
    const millisecondsPerMinutes = 60 * 1000; // Milissegundos por hora
    const time = date.getTime(); // Obtém o tempo em milissegundos
    const newTime = time + minutes * millisecondsPerMinutes; // Subtrai as horas
    return new Date(newTime); // Cria um novo objeto Date com o tempo ajustado
}

function checksDates(rangeDate: DateRangeStringT): DateRangeT {
    const newFrom = new Date(rangeDate.from);
    if (!newFrom.getTime()) throw new MyCustomError(badRequestError("Invalid date"));
    const newTo = new Date(rangeDate.to);
    if (!newTo.getTime()) throw new MyCustomError(badRequestError("Invalid date"));

    const timeZone = -3 * 60; // "America/Sao_Paulo";

    // Start of the day
    newFrom.setUTCHours(0, 0, 0, 0);
    const from = addMinutes(newFrom, -timeZone);

    // End of the day
    newTo.setUTCHours(23, 59, 59, 999);
    const to = addMinutes(newTo, -timeZone);

    const dates = { from, to };
    return dates;
}

export { addMinutes, checksDates };
