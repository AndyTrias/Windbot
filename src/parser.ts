import logger from './logger';
import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz'; 

// Example input: "S8.09h" or "Su10.17H" -> day of current/next month and hour
export function parseWindGuruDate(dateString: string, sourceTimezone: string = 'America/New_York', targetTimezone: string = 'UTC'): Date {
    const match = dateString.match(/\d+/);

    if (!match) {
        logger.error(`Invalid date string format: ${dateString}`);
        throw new Error(`Invalid date string format: ${dateString}`);
    }

    const day = parseInt(match[0], 10);
    const hour = parseInt(dateString.substring(dateString.indexOf('.') + 1, dateString.length - 1), 10);
    
    // Create date in source timezone
    const date = new Date();
    date.setDate(day);
    date.setHours(hour, 0, 0, 0);
    
    // Convert to UTC from source timezone
    const utcDate = zonedTimeToUtc(date, sourceTimezone);
    
    // Convert from UTC to target timezone
    const targetDate = utcToZonedTime(utcDate, targetTimezone);
    
    // It may be next month 
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (targetDate < yesterday) {
        targetDate.setMonth(targetDate.getMonth() + 1);
    }

    return targetDate;
}

export const extractTdTextContent = (tr: Element): string[] => 
    Array.from(tr.querySelectorAll('td')).map(td => td.textContent || '');

export const extractWindDirection = (tr: Element): string[] => 
    Array.from(tr.querySelectorAll('td'))
        .map(td => td.querySelector('span')?.getAttribute('title') || '');

export const extractWave = (tr: Element): string[] => 
   Array.from(tr.querySelectorAll('td'))
        .map(td => td.textContent?.trim() || '0')