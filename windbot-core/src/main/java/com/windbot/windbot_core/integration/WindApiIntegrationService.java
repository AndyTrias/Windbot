package com.windbot.windbot_core.integration;

import com.windbot.windbot_core.client.WeatherApiClient;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class WindApiIntegrationService {

    private final WeatherApiClient weatherApiClient;

    public WindApiIntegrationService(WeatherApiClient weatherApiClient) {
        this.weatherApiClient = weatherApiClient;
    }

    public String getWindInformation(String location) {
        Optional<Long> station_id = Optional.empty();

        return weatherApiClient.fetchWeatherData(Optional.ofNullable(location), station_id).toString();
    }
}
