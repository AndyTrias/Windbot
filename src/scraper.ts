import logger from './logger';
import puppeteer, { Page } from 'puppeteer';
import { WeatherData } from './types';
import { parseWindGuruDate, extractTdTextContent, extractWindDirection, extractWave } from './parser';

const SELECTORS = {
    windSpeed: '#tabid_0_0_WINDSPD',
    temperature: '#tabid_0_0_TMPE',
    windGust: '#tabid_0_0_GUST',
    windDirection: '#tabid_0_0_SMER',
    wave: '#tabid_0_0_HTSGW',
    date: '#tabid_0_0_dates'
} as const;



async function extractWeatherData(page: Page): Promise<WeatherData[]> {
    logger.info('Scraping weather data from Windguru');

    const [windSpeeds, temperatures, windGusts, wave, windDirection, dates] = await Promise.all([
        page.$eval(SELECTORS.windSpeed, extractTdTextContent),
        page.$eval(SELECTORS.temperature, extractTdTextContent),
        page.$eval(SELECTORS.windGust, extractTdTextContent),
        page.$eval(SELECTORS.wave, extractWave),
        page.$eval(SELECTORS.windDirection, extractWindDirection),
        page.$eval(SELECTORS.date, extractTdTextContent)
    ]);

    const weatherData: WeatherData[] = [];
    for (let i = 0; i < windSpeeds.length; i++) {
        weatherData.push({
            temperature : temperatures[i] || '',
            windSpeed: windSpeeds[i] || '',
            windGust: windGusts[i] || '',
            wave: wave[i] || '0',
            windDirection: windDirection[i] || '',
            date: parseWindGuruDate(dates[i] || '')
        });

    }

    return weatherData;
}

export async function scrapeWindguru(stationId: number): Promise<WeatherData[]> {

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    try {
        logger.info(`Navigating to Windguru station page for ID: ${stationId}`);
        await page.goto(`https://www.windguru.cz/${stationId}`);
        await waitForSelectors(page);
        
        return await extractWeatherData(page);
    } finally {
        await browser.close();
    }
}

async function waitForSelectors(page: Page): Promise<void> {
    logger.info('Waiting for Windguru selectors to load');
    await Promise.all(
        Object.values(SELECTORS).map(selector => page.waitForSelector(selector))
    );
}