import express, { Request, Response, NextFunction } from 'express';
import logger from './logger';
import { scrapeWindguru } from './scraper';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/api/weather/:station_id', async (req: Request, res: Response) => {
    logger.info(`GET /api/weather/${req.params.station_id}`);
    const station_id = parseInt(req.params.station_id || '0', 10);

    if (isNaN(station_id)) {
        return res.status(400).json({
            error: 'Invalid station ID. It must be a number.'
        });
    }

    try {
        const weatherData = await scrapeWindguru(station_id);
        
        if (!weatherData) {
            return res.status(404).json({
                error: 'Weather data not found for the given station ID.'
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

app.listen(port, () => {
    console.log(`Weather scraper API running on port ${port}`);
});