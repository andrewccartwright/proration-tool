const getEndOfMonth = (): Date => {
    let now = new Date();
    let month = now.getMonth();
    let year = now.getFullYear();

    let endOfMonth = new Date(year, month + 1, 1);
    endOfMonth.setMinutes(endOfMonth.getMinutes() - endOfMonth.getTimezoneOffset());
    // endOfMonth.setMilliseconds(0);
    // endOfMonth.setSeconds(0);
    return endOfMonth;
}

const getStartOfMonth = (): Date => {
    let now = new Date();
    let month = now.getMonth();
    let year = now.getFullYear();

    let startOfMonth = new Date(year, month, 1);
    // startOfMonth.setMinutes(startOfMonth.getMinutes() - startOfMonth.getTimezoneOffset());
    startOfMonth.setMilliseconds(0);
    startOfMonth.setSeconds(0);
    return startOfMonth;
}

export {getEndOfMonth, getStartOfMonth}