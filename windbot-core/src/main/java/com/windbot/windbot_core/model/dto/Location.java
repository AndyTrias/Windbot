package com.windbot.windbot_core.model.dto;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class Location extends PersitentEntity {
    private String location;
    private Long stationId;
}
