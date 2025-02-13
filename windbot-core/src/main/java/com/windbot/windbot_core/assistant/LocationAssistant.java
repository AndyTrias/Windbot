package com.windbot.windbot_core.assistant;

import dev.langchain4j.service.SystemMessage;
import dev.langchain4j.service.spring.AiService;

@AiService
public interface LocationAssistant {

    @SystemMessage("""
            Given a big list of locations, you must return the station id for the given location.\s
            Be aware some ortographic errors may occur, so you must return the station id for the most similar location name.
           \s
            If there is not a similar location, you must return UNKNOWN
         
            Just return the station id, no more information is needed.
           """)
    String getStationId(String location);
}
