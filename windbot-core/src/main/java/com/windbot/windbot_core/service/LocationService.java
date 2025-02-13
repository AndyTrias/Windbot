package com.windbot.windbot_core.service;

import com.windbot.windbot_core.assistant.LocationAssistant;
import com.windbot.windbot_core.model.dto.Location;
import com.windbot.windbot_core.repository.LocationRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@AllArgsConstructor
@Service
public class LocationService {

    private final LocationRepository locationRepository;
    private final LocationAssistant locationAssistant;

    public Optional<Long> getStationId(String location) {
        return locationRepository.findByLocation(location)
                .map(Location::getStationId)
                .or(() -> getStationIdByAssistant(location));
    }

    public Optional<Long> getStationIdByAssistant(String location) {
        String stationId = locationAssistant.getStationId(location);
        if (stationId.equals("UNKNOWN")) {
            return Optional.empty();
        }
        return Optional.of(Long.parseLong(stationId));

    }
}
