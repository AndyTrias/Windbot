import logger from './logger';
import puppeteer, { Page } from 'puppeteer';
import { WeatherData, WeatherStation } from './types';
import { parseWindGuruDate, extractTdTextContent, extractWindDirection, extractWave } from './parser';
import { config } from './config';

const SELECTORS = {
    windSpeed: '#tabid_0_0_WINDSPD',
    temperature: '#tabid_0_0_TMPE',
    windGust: '#tabid_0_0_GUST',
    windDirection: '#tabid_0_0_SMER',
    wave: '#tabid_0_0_HTSGW',
    date: '#tabid_0_0_dates',
    stationName: '.spot-name.wg-guide'  
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
            temperature: temperatures[i] || '',
            windSpeed: windSpeeds[i] || '',
            windGust: windGusts[i] || '',
            wave: wave[i] || '0',
            windDirection: windDirection[i] || '',
            date: parseWindGuruDate(dates[i] || '')
        });
    }
    return weatherData;
}
type NavigationFunction = (page: Page) => Promise<void>;
export async function scrapeWindguru(navigationFn: NavigationFunction): Promise<WeatherStation> {
    const browser = await puppeteer.launch(config.puppeteerOptions);
    const page = await browser.newPage();

    try {
        await navigationFn(page);
        
        return {
            id: await extractStationId(page),
            stationName: await extractStationName(page),
            weather: await extractWeatherData(page)
        };
    } finally {
        await browser.close();
    }
}

export function navigateById(stationId: number): NavigationFunction {
    return async (page: Page) => {
        logger.info(`Navigating to Windguru station page for ID: ${stationId}`);
        await page.goto(`${config.baseUrl}/${stationId}`);
        await waitForSelectors(page);
    };
}

export function navigateByName(stationName: string): NavigationFunction {
    return async (page: Page) => {
        logger.info(`Navigating to Windguru station page for name: ${stationName}`);
        await page.setViewport({width: 1080, height: 1024});
        await page.goto(`${config.baseUrl}`);

        await new Promise(resolve => setTimeout(resolve, 5000)); 
        await page.type("#searchspot", stationName);
        await new Promise(resolve => setTimeout(resolve, 5000));  
        await page.keyboard.press('Enter'); 
        await new Promise(resolve => setTimeout(resolve, 5000)); 

        await waitForSelectors(page);
    };
}

async function waitForSelectors(page: Page): Promise<void> {
    logger.info('Waiting for Windguru selectors to load');
    await Promise.all(
        Object.values(SELECTORS).map(selector => page.waitForSelector(selector))
    );
}

async function extractStationName(page: Page): Promise<string> {
    return await page.$eval(SELECTORS.stationName, (el) => el.textContent || '').then(text => text.trim()); 
}

async function extractStationId(page: Page): Promise<number> {
    const url = page.url(); 
    const match = url.match(/\/(\d+)$/); 
    return match ? parseInt(match[1]!, 10) : 0;
}