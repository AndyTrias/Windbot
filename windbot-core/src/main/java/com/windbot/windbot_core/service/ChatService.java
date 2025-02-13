package com.windbot.windbot_core.service;

import com.windbot.windbot_core.model.dto.WhatsappMessage;
import com.windbot.windbot_core.assistant.WindBotAssistant;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ChatService {

    private WindBotAssistant windBotAssistant;
    public String processMessage(WhatsappMessage whatsappMessage) {
        return windBotAssistant.answer(whatsappMessage.sender(), whatsappMessage.message());
    }
}
