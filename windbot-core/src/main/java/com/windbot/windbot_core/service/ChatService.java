package com.windbot.windbot_core.service;

import com.windbot.windbot_core.model.dto.WhatsappMessage;
import com.windbot.windbot_core.service.ai.Assistant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatService {

    private final Assistant assistant;

    @Autowired
    public ChatService(Assistant assistant) {
        this.assistant = assistant;
    }

    public String processMessage(WhatsappMessage whatsappMessage) {
        return "TODO";
    }
}
