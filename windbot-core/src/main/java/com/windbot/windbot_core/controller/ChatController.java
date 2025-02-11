package com.windbot.windbot_core.controller;

import com.windbot.windbot_core.model.dto.WhatsappMessage;
import com.windbot.windbot_core.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ChatController {

    private final ChatService chatService;

    @Autowired
    public ChatController(ChatService chatService) {
        this.chatService = chatService;

    }

    @PostMapping("/chat")
    public ResponseEntity<String> chat(@RequestBody WhatsappMessage whatsappMessage) {
        return ResponseEntity.ok(chatService.processMessage(whatsappMessage));
    }
}
