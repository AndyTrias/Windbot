package com.windbot.windbot_core.api.wind;

import java.time.LocalDate;

public record WeatherData(
        String temperature,
        String windSpeed,
        String windGust,
        String wave,
        String windDirection,
        LocalDate date
) {
}
