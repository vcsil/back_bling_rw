function addMinutes(date: Date, minutes: number): Date {
    const millisecondsPerMinutes = 60 * 1000; // Milissegundos por hora
    const time = date.getTime(); // Obtém o tempo em milissegundos
    const newTime = time + minutes * millisecondsPerMinutes; // Subtrai as horas
    return new Date(newTime); // Cria um novo objeto Date com o tempo ajustado
}

export { addMinutes };
