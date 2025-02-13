package com.windbot.windbot_core;

import dev.langchain4j.memory.chat.ChatMemoryProvider;
import dev.langchain4j.memory.chat.MessageWindowChatMemory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class WindbotCoreApplication {

	public static void main(String[] args) {
		SpringApplication.run(WindbotCoreApplication.class, args);
	}
	ChatMemoryProvider chatMemoryProvider = memoryId -> MessageWindowChatMemory.builder()
			.id(memoryId)
			.maxMessages(10)
			.build();

}
