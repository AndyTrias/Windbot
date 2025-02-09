export interface WeatherData {
    temperature: string;
    windSpeed: string;
    windGust: string;
    wave: string;
    windDirection: string;
    date: Date;
}

export interface ApiError {
    error: string;
    details: string;
}