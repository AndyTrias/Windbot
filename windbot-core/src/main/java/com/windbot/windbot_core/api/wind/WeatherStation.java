package com.windbot.windbot_core.api.wind;

import java.util.List;

public record WeatherStation(
       Long number,
       String stationName,
       List<WeatherData> weatherList
){}
