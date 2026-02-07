package de.ait.javaproglessonspro.service;

import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;

import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AiChatService {

    private final OpenAiChatModel chatModel;

    public String ask(String message) {
        ChatResponse response = chatModel.call(new Prompt(message));
        return response.getResult().getOutput().getText();
    }
}







