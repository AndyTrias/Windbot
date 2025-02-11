package com.windbot.windbot_core.configuration;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "weather.api")
@Data
public class WeatherApiConfig {
    private String baseUrl;
}
