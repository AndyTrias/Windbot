package com.windbot.windbot_core.client;

import com.windbot.windbot_core.api.wind.WeatherStation;
import com.windbot.windbot_core.configuration.WeatherApiConfig;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.Optional;

@Component
@Slf4j
public class WeatherApiClient {
    private final RestClient restClient;

    private final String URL = "/weather";

    public WeatherApiClient(WeatherApiConfig config) {
        this.restClient = RestClient.builder()
                .baseUrl(config.getBaseUrl())
                .build();
    }

    public WeatherStation fetchWeatherData(Optional<String> stationName, Optional<Long> id) {
        log.info("Fetching weather data for station: {}, id: {}", stationName, id);

        return restClient.get()
                    .uri(buildUri(stationName, id))
                    .retrieve()
                    .body(WeatherStation.class);
    }

    private URI buildUri(Optional<String> stationName, Optional<Long> id) {
        return UriComponentsBuilder.fromUriString(URL)
                .queryParam("station", stationName.orElse(null))
                .queryParam("id", id.orElse(null))
                .build()
                .toUri();
    }
}