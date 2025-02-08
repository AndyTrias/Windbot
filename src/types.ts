export interface WeatherData {
    temperature: string;
    windSpeed: string;
    windGusts: string;
    wave: string;
    windDirection: string;
    dates: Date;
}

export interface ApiError {
    error: string;
    details: string;
}