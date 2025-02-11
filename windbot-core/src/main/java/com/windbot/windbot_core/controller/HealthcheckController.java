package com.windbot.windbot_core.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthcheckController {

    @GetMapping("/health-check")
    public ResponseEntity<String> healthcheck() {
        return ResponseEntity.ok("OK");
    }
}
