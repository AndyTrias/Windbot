import logger from './logger';
import puppeteer, { Page }  from 'puppeteer';
import { WeatherData } from './types';
import { parseWindGuruDate, extractTdTextContentFromTr, extractWindDirectionFromSpan, extractWaveFromTr } from './parser';


const SELECTORS: { [key: string]: string } = {
    windSpeed: '#tabid_0_0_WINDSPD',
    temperature: '#tabid_0_0_TMPE',
    windGusts: '#tabid_0_0_GUST',
    windDirection: '#tabid_0_0_SMER',
    wave: '#tabid_0_0_HTSGW',
    dates: '#tabid_0_0_dates'
};

async function waitForSelector(page: Page): Promise<void> {
    logger.info('Waiting for Windguru selectors to load');
    await Promise.all(Object.values(SELECTORS).map((selector: string) => page.waitForSelector(selector)));
}

export async function scrapeWindguru(stationId: number): Promise<WeatherData[]> {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],

    });
    const page = await browser.newPage();

    try {
        logger.info(`Navigating to Windguru station page for ID: ${stationId}`);
        await page.goto(`https://www.windguru.cz/${stationId}`);

        await waitForSelector(page);
    

        return await extractWeatherData(page);
        }
    catch (error) {
        logger.error('Failed to scrape Windguru', error);
        throw error;
    } finally {
        await browser.close();
    }
}

async function extractWeatherData(page: Page) {
    logger.info('Scraping wind speed and temperature data from Windguru');

    const [windSpeeds, temperatures, windGusts, wave, windDirection, dates] = await Promise.all([
        page.$eval(SELECTORS.windSpeed!, extractTdTextContentFromTr),
        page.$eval(SELECTORS.temperature!, extractTdTextContentFromTr),
        page.$eval(SELECTORS.windGusts!, extractTdTextContentFromTr),
        page.$eval(SELECTORS.wave!, extractWaveFromTr),
        page.$eval(SELECTORS.windDirection!, extractWindDirectionFromSpan),
        page.$eval(SELECTORS.dates!, extractTdTextContentFromTr)
    ]);

    const weatherData: WeatherData[] = [];
    for (let i = 0; i < windSpeeds.length; i++) {
        weatherData.push({
            temperature : temperatures[i] || '',
            windSpeed: windSpeeds[i] || '',
            windGusts: windGusts[i] || '',
            wave: wave[i] || '0',
            windDirection: windDirection[i] || '',
            dates: parseWindGuruDate(dates[i] || '')
        });

    }

    return weatherData;
}


