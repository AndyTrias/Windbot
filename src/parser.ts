import logger from './logger';

// Example input: "S8.09h" or "Su10.17H" -> day of current/next month and hour
export function parseWindGuruDate(dateString: string): Date {
    const match = dateString.match(/\d+/);

    if (!match) {
        logger.error(`Invalid date string format: ${dateString}`);
        throw new Error(`Invalid date string format: ${dateString}`);
    }
    const day = parseInt(match[0], 10);
    const hour = parseInt(dateString.substring(dateString.indexOf('.') + 1, dateString.length - 1), 10);
    
    let date = new Date();
    date.setDate(day);
    date.setHours(hour); 
    
    // It may be next month
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date < yesterday) {
        date.setMonth(date.getMonth() + 1);
    }

    return date;
}


export const extractTdTextContentFromTr = (tr: Element) => 
    Array.from(tr.querySelectorAll('td')).map(td => td.textContent || '');

export const extractWindDirectionFromSpan = (tr: Element) => 
    Array.from(tr.querySelectorAll('td'))
            .map(td => td.querySelector('span')?.getAttribute('title') || '');

export const extractWaveFromTr = (tr: Element) => 
    Array.from(tr.querySelectorAll('td')).map(td => td.textContent?.trim() || '0');


