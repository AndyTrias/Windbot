package com.windbot.windbot_core.tools;

import com.windbot.windbot_core.api.wind.WeatherStation;
import com.windbot.windbot_core.integration.WindApiIntegrationService;
import dev.langchain4j.agent.tool.P;
import dev.langchain4j.agent.tool.Tool;
import org.springframework.stereotype.Component;

@Component
public class WindTools {

    private final WindApiIntegrationService windApiIntegrationService;

    public WindTools(WindApiIntegrationService windApiIntegrationService) {
        this.windApiIntegrationService = windApiIntegrationService;
    }

    @Tool
    WeatherStation getWindInformation(@P("Location for the weather") String location) {
        return windApiIntegrationService.getWindInformation(location);
    }
}
