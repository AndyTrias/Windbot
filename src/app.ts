import express, { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import logger from './logger';
import { scrapeWindguruById, scrapeWindguruByName } from './scraper';
import { config } from './config';

const app = express();

const limiter = rateLimit(config.rateLimit);
app.use(limiter); 

app.use(express.json());

app.get('/api/weather/id/:station_id', async (req: Request, res: Response) => {
    const station_id = parseInt(req.params.station_id!, 10);

    logger.info(`GET /api/weather/id - station_id: ${station_id}`);

    if (isNaN(station_id)) {
        return res.status(400).json({
            error: 'Invalid station ID format. Please provide a valid number.'
        });
    }

    try {
        const weatherData = await scrapeWindguruById(station_id);
        
        if (!weatherData) {
            return res.status(404).json({
                error: 'Weather data not found for the provided station ID'
            });
        }

        res.json(weatherData);
    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch weather data',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

app.get('/api/weather/name', async (req: Request, res: Response) => {
    const station_name = typeof req.query.station === 'string' ? req.query.station : '';

    logger.info(`GET /api/weather/name - station_name: ${station_name}`);

    if (!station_name) {
        return res.status(400).json({
            error: 'Please provide a station name in the query parameters'
        });
    }

    try {
        const weatherData = await scrapeWindguruByName(station_name);
        
        if (!weatherData) {
            return res.status(404).json({
                error: 'Weather data not found for the provided station name'
            });
        }

        res.json(weatherData);
    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch weather data',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something broke!',
        details: err.message
    });
});

app.listen(config.port, () => {
    logger.info(`Weather scraper API running on port ${config.port} in ${config.nodeEnv} mode`);
});