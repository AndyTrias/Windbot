export interface WeatherData {
    temperature: string;
    windSpeed: string;
    windGust: string;
    wave: string;
    windDirection: string;
    date: Date;
}

export interface WeatherStation {
    id: number;
    stationName: string;
    weather: WeatherData[];
}

export interface ApiError {
    error: string;
    details: string;
}