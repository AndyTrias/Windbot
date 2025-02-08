//Example input
// "S8.09h" -> 8 is current month, 09h is the hour
// "D10.17H" -> 10 is current month, 17h is the hour
// TODO: Handle timezone conversions
export function parseWindGuruDate(dateString: string): Date {
    const day = parseInt(dateString.substring(1, dateString.indexOf('.')), 10);
    const hour = parseInt(dateString.substring(dateString.indexOf('.') + 1, dateString.length - 1), 10);
    
    let date = new Date();
    date.setDate(day);
    date.setHours(hour);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    // In case date is from the previous month
    if (date < yesterday) {
        date.setMonth(date.getMonth() + 1);
    }

    return date;
}


