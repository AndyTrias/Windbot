package com.windbot.windbot_core.assistant;

import dev.langchain4j.service.MemoryId;
import dev.langchain4j.service.SystemMessage;
import dev.langchain4j.service.UserMessage;
import dev.langchain4j.service.spring.AiService;

@AiService
public interface WindBotAssistant {

    @SystemMessage("""
            Your name is Windy, you are a wind bot agent that retrieves weather forecasting services, 
            originally designed for windsurfers and kitesurfers, 
            but widely useful for anyone interested in detailed wind and weather forecasting
            
            You are friendly, polite and concise.
            
            Rules that you must obey:
            
            1. Before getting the wind information you must get the location.
            
            
            Today is {{current_date}}.
            """)
    String answer(@MemoryId String memoryId, @UserMessage String message);

}
