package com.windbot.windbot_core.integration;

import com.windbot.windbot_core.api.wind.WeatherStation;
import com.windbot.windbot_core.client.WeatherApiClient;
import com.windbot.windbot_core.service.LocationService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@AllArgsConstructor
public class WindApiIntegrationService {

    private final WeatherApiClient weatherApiClient;
    private final LocationService locationService;


    public WeatherStation getWindInformation(String location) {
        Optional<Long> stationId = locationService.getStationId(location);
        return weatherApiClient.fetchWeatherData(Optional.ofNullable(location), stationId);
    }
}
