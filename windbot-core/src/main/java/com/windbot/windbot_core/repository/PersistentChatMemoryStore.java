package com.windbot.windbot_core.repository;

import dev.langchain4j.data.message.ChatMessage;
import dev.langchain4j.store.memory.chat.ChatMemoryStore;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PersistentChatMemoryStore implements ChatMemoryStore {

    @Override
    public List<ChatMessage> getMessages(Object memoryId) {
        // TODO: Implement getting all messages from the persistent store by memory ID.
        // ChatMessageDeserializer.messageFromJson(String) and
        // ChatMessageDeserializer.messagesFromJson(String) helper methods can be used to
        // easily deserialize chat messages from JSON.
        return null;
    }

    @Override
    public void updateMessages(Object memoryId, List<ChatMessage> messages) {
        // TODO: Implement updating all messages in the persistent store by memory ID.
        // ChatMessageSerializer.messageToJson(ChatMessage) and
        // ChatMessageSerializer.messagesToJson(List<ChatMessage>) helper methods can be used to
        // easily serialize chat messages into JSON.
    }

    @Override
    public void deleteMessages(Object memoryId) {
        // TODO: Implement deleting all messages in the persistent store by memory ID.
    }
}
